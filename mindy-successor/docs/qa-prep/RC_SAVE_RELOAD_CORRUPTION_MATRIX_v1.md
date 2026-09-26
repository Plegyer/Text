# RC Save/Reload Corruption Matrix v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Baseline: current merged main after PR22 / PR23 handoff

## Purpose

Define adversarial parser/runtime expectations for the exact release-candidate checkpoints used by the one-Save E2E path.

A malformed or stale save must either:

- be rejected explicitly by `parseSave`; or
- load into the last valid committed state without replaying costs, rewards, RNG or calendar movement.

Silent repair is acceptable only where the current schema explicitly defines a backward-compatibility default.

---

# Matrix

| Checkpoint | Corruption / stale variant | Expected behavior |
|---|---|---|
| pending Lumber milestone | unknown eventId | **REJECT** — `Неизвестная сцена сохранения.` |
| pending Lumber milestone | unknown variantId | **REJECT** |
| pending Lumber milestone | allowedChoiceIds contains unknown choice | **REJECT** — invalid pending snapshot |
| pending Lumber milestone | empty allowedChoiceIds snapshot | **REJECT** |
| pending Lumber milestone | presentationId absent in older save | **LOAD** if event/variant/choices are valid; UI may derive semantic presentation |
| pending Lumber milestone | malformed slash semantic presentationId | **SCHEMA REJECT** |
| pending Foreman scene | event/variant mismatch | **REJECT** |
| pending Foreman scene | allowed choice changed to choice not owned by event | **REJECT** |
| paid School result | lastAction id unknown non-School action | **REJECT** |
| paid School result | School track key != embedded trackId | **REJECT** |
| paid School result | unknown School track | **REJECT** |
| paid School result | missing School progression in old schema-4 | **LOAD WITH DEFAULT** `school.tracks={}` |
| Night after lodging | paymentCommitted=true but selectedLodgingId=null | **REJECT** |
| Night after lodging | unknown production lodging ID | **REJECT** |
| Night after lodging | phase passed lodging but payment not committed | **REJECT** unless lodging payment is explicitly suppressed |
| Night pending event | currentIntercept set outside NightEventResolution | **REJECT** |
| Night pending event | pending event night intercept disagrees with NightFlow intercept | **REJECT** |
| Night pending event | unknown night choice ID | **REJECT** |
| Activity before route | unknown activityId | **REJECT** |
| Activity before route | definitionVersion mismatch | **REJECT** |
| Activity before route | adapter mismatch | **REJECT** |
| Activity before route | resolving status persisted | **REJECT** |
| Activity before route | old pre-option save missing option fields | **LOAD** with `optionModelVersion=0`, legacy `advance/escape` |
| Activity after route | unknown route string injected directly | **REJECT at runtime behavior / invalid state should not be trusted**; route must come from authored option dispatch |
| Activity after route | duplicate resolved option IDs | **REJECT or normalize only if schema explicitly changes**; current QA gate should treat as corruption |
| Activity after route | used option removed from current definition | **STALE CONTENT — reject/explicit incompatibility expected**, not silent reroute |
| Activity after advance | progress already >= success threshold | **REJECT** — Activity should have finalized before save |
| Activity after advance | endurance <= failure threshold | **REJECT** |
| Activity after advance | endurance > initialEndurance | **REJECT** |
| Activity after advance | same_day Activity startedDay != current day | **REJECT** |
| Activity any active checkpoint | accumulatedRewards/emittedFacts already committed | **REJECT** |
| Activity any active checkpoint | coexists with NightFlow | **REJECT** |
| Activity any active checkpoint | coexists with global pending scene | **REJECT** |
| ending committed | status active + committed ending | **REJECT** |
| ending committed | status ending_committed but committed=null | **REJECT** |
| ending committed | ending_committed with RunResult already present | **REJECT** |
| ending committed | unknown committed ending ID | **REJECT** |
| ended RunResult | status ended but result missing | **COMPAT LOAD ONLY for legacy schema-4 path** if committed ending exists; deterministic result identity synthesized |
| ended RunResult | result.endingId != committed ending | **REJECT** |
| ended RunResult | transaction proof missing from Meta | **REJECT** |
| ended RunResult | duplicate Meta transaction proof | **REJECT** |
| ended RunResult | duplicate applied reward IDs | **REJECT** |
| ended RunResult | unknown ending ID | **REJECT** |

---

# 1. Pending Lumber milestone

Representative valid checkpoint:

`lumber.career-first-shift`

with:

- valid variant;
- valid allowed choice snapshot;
- optional semantic presentationId.

## Adversarial cases

### Unknown eventId

Mutate:

`pendingScene.eventId`

to an ID not present in catalog.

Expected:

`parseSave` rejects.

### Unknown variantId

Keep event valid, mutate variant.

Expected:

reject because the event does not own that variant.

### Unknown allowed choice

Inject a choice ID not present on the event.

Expected:

reject with invalid pending snapshot.

### Empty choice snapshot

Persist:

`allowedChoiceIds=[]`.

Expected:

reject.

The parser must not silently rebuild a different choice set because the snapshot is part of the committed pending-scene identity.

### Missing presentationId

For an older valid save, remove only:

`presentationId`.

Expected:

load remains valid.

Mechanical event/variant/choice identity is authoritative.

Presentation can be derived without reroll.

---

# 2. Pending Foreman scene

Representative:

`lumber.foreman-notice`.

Use the same event/variant/choice corruption cases.

Additional invariant:

relationship progression already earned before the pending scene must not be reset by a successful reload.

If the pending snapshot is corrupt, reject the save rather than discarding the Foreman scene and keeping later progression.

---

# 3. Paid School result

Representative:

`school.course.arcana`.

## Corruption: unknown lastAction

If `lastAction.id` is neither:

- a catalog action;
- the accepted School compatibility action ID;

expected:

reject.

## Corruption: School track key mismatch

Example:

map key:

`school.track.arcana`

but embedded:

`trackId='school.track.reason'`.

Expected:

reject.

## Corruption: unknown School track

Expected:

reject.

## Older schema-4 missing School state

Expected compatibility:

```text
progression.school.tracks = {}
```

No lesson counter, certificate, milestone or public fact is inferred.

This is a valid default, not silent fabricated progression.

## Exactly-once invariant

A valid paid School save reload must preserve:

- money charge once;
- Energy charge once;
- stat package once;
- typed `lessons_completed` once;
- any real pending scene selected after that transaction.

No paid lesson command is replayed by parse.

---

# 4. Night after lodging

Representative valid checkpoint:

- phase after lodging;
- known lodging;
- `lodgingPaymentCommitted=true`.

## payment committed with no lodging

Expected:

reject:

`NightFlow оплатил неизвестный ночлег.`

## unknown lodging ID

Expected:

reject unless it is an explicit accepted legacy lodging ID.

## post-lodging phase without payment

If the flow has progressed to:

- `PostLodgingForcedCheck`; or
- `VoluntaryNightChoice`

but payment is not committed and not explicitly suppressed:

expected:

reject.

Do not silently charge lodging on load.

---

# 5. Night pending event

Representative:

`lumber-night.foreman-professional`.

## Invalid intercept phase

If:

`currentIntercept != null`

outside:

`NightEventResolution`

expected:

reject.

## Pending event intercept mismatch

If the pending event's authored night intercept disagrees with persisted:

`currentIntercept`

expected:

reject.

## Unknown selected Night choice

Expected:

reject unless accepted legacy compatibility ID.

## Exactly-once invariant

A valid pending Night event reload must not:

- repay lodging;
- reapply Night choice effects;
- increment Foreman Night counter twice;
- queue next-day modifiers twice;
- advance day.

---

# 6. Activity before route

Representative current PR22 state:

```text
lumber.forest
optionModelVersion=1
routeId=null
resolvedOptionIds=[]
checkpoint=entry
```

## Unknown activity

Expected:

reject.

## definitionVersion mismatch

Expected:

reject.

## adapter mismatch

Expected:

reject.

## resolving status persisted

Expected:

reject.

A resolving envelope is not a stable reload boundary.

## Legacy pre-option compatibility

Delete:

- `optionModelVersion`;
- `routeId`;
- `resolvedOptionIds`

from a valid pre-PR22 active schema-4 Activity save.

Expected:

- parse succeeds;
- optionModelVersion defaults to 0;
- legacy immediate `advance`;
- legacy `escape`;
- no retroactive route requirement.

---

# 7. Activity after route

Representative:

`forest.route.logging-road`.

Expected valid persisted state:

- routeId `logging-road`;
- option ID present once in resolvedOptionIds.

## Direct unknown route mutation

A route must be established by authored option dispatch.

A corrupted save with a route string that cannot be traced to current authored option state must not be treated as a trustworthy natural route.

Release QA should require explicit rejection/validation rather than silent continuation.

If current schema does not yet reject this case, record it as a **coverage/runtime validation gap**, not as an acceptable silent repair.

## Duplicate resolved option ID

A one-shot option list with duplicates is invalid logical state.

Release gate expectation:

reject rather than allowing repeated semantics.

If current parser does not yet enforce uniqueness, this becomes a QA-discovered validation gap.

## Option removed by newer content

If a saved resolved option ID no longer exists in the current Activity definition:

expected behavior should be explicit incompatibility/rejection.

Do not silently map it to a different route.

---

# 8. Activity after advance

## progress already at/above success threshold

Expected:

reject:

the Activity should already have finalized success.

## endurance at/below fail threshold

Expected:

reject.

## endurance above authored initial value

Expected:

reject.

## startedDay mismatch for same_day Activity

Expected:

reject.

## accumulated result state in active envelope

If active envelope has:

- accumulatedRewards;
- emittedFacts;

expected:

reject.

A stable active checkpoint cannot contain already committed result state.

## coexisting outer flow

Active Activity cannot coexist with:

- NightFlow;
- global pending scene.

Expected:

reject.

---

# 9. Ending committed

Representative:

`ending.lumber.hard-work`.

## active status + committed ending

Expected:

reject.

## ending_committed without committed ID

Expected:

reject.

## ending_committed with RunResult already present

Expected:

reject.

## unknown committed ending

Expected:

reject.

## Valid reload invariant

A valid committed save must preserve:

- committed ending;
- status `ending_committed`;
- no RunResult;
- no `hardWork:lumber` Meta reward.

Parse must not auto-complete.

---

# 10. Ended RunResult

## Legacy ended schema-4 without result

Current parser has a narrow compatibility path:

```text
status=ended
committed ending exists
result absent
```

Expected:

- deterministic resultId/transactionId synthesized;
- transaction proof added if absent;
- no new product reward fabricated;
- second parse produces the same identity.

This is the intentional exception to “ended without result rejects”.

## result ending mismatch

Expected:

reject.

## missing Meta transaction proof

Expected:

reject.

## duplicate transaction proof

Expected:

reject.

## duplicate applied reward IDs

Expected:

reject.

## unknown ending

Expected:

reject.

---

# 11. Stale content vs malformed save

Release QA should distinguish:

## Malformed

Self-inconsistent data that was never a valid committed state.

Examples:

- duplicate transaction proof;
- impossible Night payment state;
- active Activity already over success threshold.

Expected:

reject.

## Stale

Save was valid under an earlier content/runtime definition, but current catalog changed.

Examples:

- Activity definitionVersion changed;
- route/option removed;
- event variant removed.

Expected:

explicit incompatibility/rejection unless there is a named migration path.

Do not silently reinterpret a stale gameplay transaction.

---

# 12. Required corruption test subset for RC

At minimum automate these before release:

1. pending unknown event;
2. pending invalid allowed choice;
3. old schema-4 missing School state;
4. Night payment committed without lodging;
5. Night intercept/phase mismatch;
6. pre-option Activity save legacy `advance/escape`;
7. Activity definitionVersion mismatch;
8. Activity progress already >= success threshold;
9. active + committed ending mismatch;
10. ended RunResult transaction proof missing;
11. duplicate Meta transaction proof;
12. legacy ended schema-4 deterministic compatibility result.

For route/option corruption cases, add explicit parser validation tests if current parser does not yet enforce logical route/option identity.

No production runtime/UI/content file was modified by Chat 4.
