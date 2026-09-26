# Product Activation Fault-Injection Plan v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Baseline: post-PR20 main, activation merge milestone recorded on main

## Purpose

This plan defines failure injection around the product-activation transaction boundaries.

The objective is not merely “an error is shown.” The invariant is:

> a failed command/load/presentation resolution must either leave the authoritative caller state unchanged, or restore exactly the last already-committed checkpoint without replaying costs, rewards, RNG, or calendar movement.

Tests should compare normalized serialized state before and after a rejected operation.

## General harness rule

For command failures:

```ts
const before = JSON.stringify(save);
assert.throws(() => dispatch(save, command, catalog), expectedError);
assert.equal(JSON.stringify(save), before);
```

For reload failures, keep the original serialized string and assert the parser does not mutate a previously valid in-memory state.

For successfully committed checkpoints followed by failure, reload from the last serialized checkpoint and verify the committed transaction is present exactly once.

---

# 1. School payment faults

## 1A — insufficient tuition

### Injection

Use a real course with:

`money = tuition - 1`.

### Expected failure

School availability rejects before effects.

### Recovery invariant

Unchanged:

- money;
- current-day Energy;
- every stat;
- School track counters;
- actionCounts;
- lastAction;
- pending scene;
- RNG;
- journal.

No partial tuition or Energy charge.

## 1B — insufficient current-day Energy

### Injection

Use a valid post-arrival state with:

`energyCurrent=0`.

### Expected failure

Reject on Energy precheck.

### Recovery invariant

Same whole-state identity as before command.

In particular, tuition must not be deducted before Energy validation.

## 1C — Resolver failure after School effect batch

### Injection strategy

Use the injectable School runtime boundary or a deliberately throwing test adapter for `resolveReactions`.

The test must not alter production runtime.

### Expected behavior

The public input save remains unchanged because the transaction operates on cloned state and no successful result is returned.

If testing the lower-level `executeSchoolLesson` helper directly, preserve the original input and assert it is untouched even when the injected Resolver throws.

### Recovery expectation

Retrying from the unchanged input performs one normal School transaction:

- tuition once;
- Energy -1 once;
- stat package once;
- `lessons_completed +1` once.

Do not persist an intermediate “paid but Resolver failed” state unless the production command explicitly returns it.

## 1D — save immediately after successful lesson

This is the positive counterpart.

### Injection

Crash/close immediately after the command has returned and the successful save was persisted.

### Recovery invariant

Reload contains the complete transaction once:

- tuition;
- Energy;
- all stats;
- School counter;
- lastAction/presentation ID;
- pending Resolver scene if selected.

No replay on startup.

---

# 2. Night lodging faults

## 2A — insufficient lodging money

### Injection

At `LodgingResolution`, select a lodging whose cost exceeds current money.

### Expected failure

Command rejects.

### Recovery invariant

Unchanged:

- money;
- housing;
- `selectedLodgingId`;
- `lodgingPaymentCommitted=false`;
- next-day modifiers;
- Night phase;
- calendar.

## 2B — unavailable lodging condition

### Injection

Use a catalog/test lodging with a condition the state does not satisfy.

### Expected failure

Reject before payment.

### Recovery invariant

No money/housing/modifier mutation.

## 2C — crash immediately after committed payment

### Injection

Execute a valid paid `chooseLodging`, persist the resulting save, then simulate process termination before voluntary Night choice.

### Recovery invariant after reload

- exact paid money remains;
- `selectedLodgingId` remains;
- `lodgingPaymentCommitted=true`;
- queued next-day modifier appears once;
- no second payment;
- day has not advanced merely due to reload.

This is the critical exactly-once recovery boundary.

---

# 3. Save between Night phases

Fault-inject process termination/reload at every persisted phase that can be externally observed.

## Checkpoints

1. after `endDay`, before lodging;
2. after lodging payment;
3. after an after-lodging forced event becomes pending;
4. at `VoluntaryNightChoice`;
5. after selecting a School or Foreman Night choice when a blocking event is pending;
6. after Night choice effects are committed but before final StartDay completion, where such a stable serialized phase is reachable;
7. after calendar advance/start-day completion.

## Invariant per checkpoint

Reload resumes the same authoritative phase or the already-committed next stable phase.

Never duplicate:

- lodging payment;
- Night choice effect;
- School `night_study_sessions`;
- Foreman relationship counter;
- next-day stat effect;
- next-day Energy modifier;
- calendar advance.

## Corrupt Night state

Inject impossible persisted combinations, e.g.:

- payment committed but no selected lodging where schema/runtime requires one;
- unknown lodging/NightChoice ID;
- impossible phase/selected-choice combination.

Expected result:

`parseSave` rejects clearly.

Do not silently reset NightFlow to day state.

---

# 4. Activity checkpoint faults

## 4A — crash immediately after entry

### Injection

Enter `lumber.forest`, persist before any internal action, restart.

### Recovery invariant

- Activity envelope restored;
- 2-Energy entry cost remains charged once;
- `entryEnergyCommitted=true`;
- progress/endurance/steps unchanged;
- internal RNG unchanged;
- checkpoint unchanged.

UI must render the active Activity, not town.

## 4B — crash after one internal advance

### Injection

Advance once, save, restart.

### Recovery invariant

Exact internal state survives.

Performing the next advance after reload must produce the same deterministic result as continuing without reload.

## 4C — incompatible definition/version

### Injection

In QA data, load an active envelope against a catalog whose Activity:

- is missing;
- has changed `definitionVersion`;
- has changed adapter.

### Expected failure

Parser/runtime rejects the incompatible envelope.

### Recovery invariant

No fallback to a fresh Activity.

No second entry charge.

No forced success/failure.

## 4D — failure during result resolution

Use an injected/invalid test catalog boundary where result continuation cannot resolve.

Expected caller-state behavior:

- rejected command must not mutate the caller input;
- retry from last valid Activity checkpoint must not contain half-applied result facts.

Do not weaken catalog validation in production to create this injection.

---

# 5. Ending commit faults

## 5A — commit ineligible ending

### Injection

Attempt:

`commitEnding('ending.lumber.hard-work')`

at 49 completed shifts.

### Expected failure

Reject as unavailable.

### Recovery invariant

Unchanged:

- run status;
- committed ending;
- RunResult;
- Meta;
- transaction proofs.

## 5B — commit while pending/Night/Activity

### Injection

Attempt commit at each incompatible active flow.

### Expected failure

Reject before commitment.

### Recovery invariant

The active flow remains intact and resumable.

## 5C — crash after successful commit, before completion

### Injection

Commit Hard Work, persist, terminate.

### Recovery invariant

Reload:

- `status='ending_committed'`;
- committed ID exact;
- RunResult null;
- `hardWork:lumber` not applied;
- no completed ending added by reload.

Retrying explicit completion performs the completion transaction once.

---

# 6. Ending completion faults

## 6A — complete without commitment

Expected rejection with caller state unchanged.

## 6B — complete while final pending scene exists

Expected rejection until pending scene resolves.

No reward before completion.

## 6C — crash immediately after completion persistence

After successful `completeEnding`, persist and terminate.

Reload must preserve:

- same `resultId`;
- same `transactionId`;
- same ending ID;
- same applied reward IDs;
- one completed ending;
- one `lumber` Hard Work progress entry;
- one applied result transaction.

## 6D — repeated completion/reload

Where API allows idempotent repeated completion state handling, it must not:

- generate a new transaction ID;
- append reward twice;
- increment `runsCompleted` twice;
- duplicate journal/meta effects.

---

# 7. Missing presentation media

Presentation failure must remain presentation-only.

## 7A — missing optional primary GIF

### Injection

Use a valid presentation override whose source format is accepted but whose packaged local file is unavailable in an acceptance-only/test context.

### Expected behavior

Resolver selects configured static/family fallback or text-only missing-art state.

### Mechanical invariant

Deep-equal game state before/after presentation resolution.

No changes to:

- Energy;
- money;
- stats;
- career/School/relationship state;
- pending scene identity;
- choices;
- RNG;
- rewards.

## 7B — broken image/video load in UI

Simulate media `onerror`/candidate failure.

Expected:

- advance to next presentation candidate;
- gameplay button/choice state remains based only on game state;
- no command is auto-dispatched;
- no event choice is auto-selected.

## 7C — unknown presentation ID

Expected:

- safe semantic fallback/text-only presentation;
- non-fatal UI;
- no mechanics mutation.

---

# 8. School presentation persistence fault

## Injection

Take a successful School result with persisted:

`lastAction.presentationId='school/arcana/lesson/default'`

then reload.

Expected:

- exact ID survives;
- UI uses persisted ID;
- media failure, if injected, falls back visually only;
- School transaction is not replayed.

This combines save-boundary and presentation failure recovery.

---

# 9. Fault-injection evidence table

Before release candidate approval, capture these cases:

| Fault | Required result |
|---|---|
| School insufficient money | atomic reject |
| School insufficient Energy | atomic reject |
| injected School Resolver throw | caller input unchanged |
| crash after School commit | transaction restored once |
| lodging insufficient money | atomic reject |
| crash after lodging payment | payment restored once |
| reload every Night stable phase | no phase transaction replay |
| corrupt Night persisted state | explicit reject, no silent reset |
| crash after Activity entry | entry cost once |
| crash after Activity checkpoint | deterministic resume |
| Activity definition mismatch | explicit reject |
| commit ending at 49 | atomic reject |
| crash after ending commit | committed/no reward |
| crash after completion | one RunResult/reward transaction |
| repeated reload/completion | no duplicate Meta |
| missing presentation media | fallback only, mechanics deep-equal |

---

# 10. Acceptance of recovery behavior

A fault-injection case passes only if both are true:

1. the expected error/fallback behavior occurs;
2. authoritative state satisfies the atomic recovery invariant.

“Throws an error” alone is insufficient.

Likewise, “UI still renders” is insufficient if a cost/reward was replayed.

---

# Current open limitation

The production Forest item/capability acquisition path remains open.

Fault injection may use the accepted QA capability adapter to exercise Activity transaction recovery, but that does not close Product Acceptance PA09/PA14/PA17.

No production file was modified by Chat 4.
