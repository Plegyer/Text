# Chat 6 — Palace Rich-Six Stage Contract v11

Status: **READY FOR LEADER ACCEPTANCE**  
Owner: Chat 6 / Palace Producer  
Branch: `chat6/palace-rich6-stage-contract-v11`

Authority:
- D29 on `main@69eaedb1950e3ea712119388e1734c526a93be21`
- accepted topology source: `chat6/palace-progression-topology-decision-v10@7a65f2dd88b53135c393be64f6e78ab46b9bcab8`
- frozen Prince packet: `chat6/palace-prince-confrontation-decision-v9@4de1a3925d499a6337a3c40c05b8b4aba9f3cc03`

Machine-readable contract:
`mindy-successor/prior-work/astra/prototype-m3.2/content/palace-rich6-stage-contract-v11.fixture.json`

Focused/static contract tests:
`mindy-successor/prior-work/astra/prototype-m3.2/tests/palace-rich6-stage-contract-v11.test.ts`

No production engine/UI implementation is included.

---

## 1. Stable Palace progression identity

Career/domain ID:

`palace`

Stable stages, in exact D29 order:

1. `entered-service`
2. `working-rhythm`
3. `trusted-service`
4. `palace-network`
5. `crossroads`
6. `outcome-ready`

There is no seventh Palace stage.

There is no `hardWork:palace`.

Palace progression is run-local, not Meta.

D23 remains the sole Palace entry authority:
permanent ordinary Hard Work 10/10 + active ordinary Hard Work package 10/10 -> deterministic Day-1 invitation -> `palace.access-granted`.

---

## 2. palaceDutyCount

Logical implementation/API name:

`palaceDutyCount`

Current schema-compatible serialized location:

`run.progression.careers['palace'].counters['palace-duty-count']`

Why the names differ:

the current schema ID regex is lowercase-only, so camelCase cannot be persisted as a counter key without a schema change. v11 therefore fixes:

- logical/accessor name: `palaceDutyCount`
- persisted counter key: `palace-duty-count`

Initial value:

`0`

Every successfully committed Palace duty action increments it by exactly:

`+1`

It never decreases.

These do **not** increment it:

- Palace Night;
- relationship scenes;
- romance;
- legacy-item capability use;
- outcome-preparation scenes;
- outcome-finalization scenes.

Optional variants cannot award extra duty credit.

---

## 3. Exact D29 stage transitions

Transitions are exact equality milestones, not `gte` catch-up thresholds.

| Count | Transition ID | From | To |
|---:|---|---|---|
| 2 | `duty-02-working-rhythm` | `entered-service` | `working-rhythm` |
| 5 | `duty-05-trusted-service` | `working-rhythm` | `trusted-service` |
| 8 | `duty-08-palace-network` | `trusted-service` | `palace-network` |
| 12 | `duty-12-crossroads` | `palace-network` | `crossroads` |
| 15 | `duty-15-outcome-ready` | `crossroads` | `outcome-ready` |

Each machine condition is:

```text
careerCounter:
  career = palace
  counter = palace-duty-count
  op = eq
  value = exact milestone
```

A Palace duty implementation must perform the counter increment first and then, in the same committed command, apply at most one matching transition for the current stage.

Counts above a milestone may not be used to skip an unresolved earlier stage.

There are no old production Palace runs requiring a catch-up migration in v11.

Exact Palace daily cadence remains open.

D26 is not inherited by Palace.

---

## 4. Exactly-once progression completion

Stable completion fact:

`palace.progression-complete`

There is exactly one writer in the six-stage contract:

`duty-15-outcome-ready`

That transition performs:

```json
{
  "kind": "addWorldFact",
  "fact": "palace.progression-complete"
}
```

No earlier transition writes it.

Later Palace duties after count 15 may still exist as optional work, but:

- stage remains `outcome-ready`;
- they never create another stage;
- they never re-emit progression completion;
- they never grant extra Palace Meta.

---

## 5. Milestone reaction barriers

Every structural stage transition has one stable blocking milestone event.

| Count | Event ID | Resolved career fact |
|---:|---|---|
| 2 | `palace.progression.milestone-02-working-rhythm` | `milestone-02-resolved` |
| 5 | `palace.progression.milestone-05-trusted-service` | `milestone-05-resolved` |
| 8 | `palace.progression.milestone-08-palace-network` | `milestone-08-resolved` |
| 12 | `palace.progression.milestone-12-crossroads` | `milestone-12-resolved` |
| 15 | `palace.progression.milestone-15-outcome-ready` | `milestone-15-resolved` |

Each milestone event contract is:

- trigger: `careerTransition`, career `palace`;
- `priorityClass: critical_progression`;
- priority: `100`;
- blocking: true;
- delivery: `latched`;
- `maxShows: 1`;
- no RNG;
- one functional continue choice;
- continue writes exactly one stage-local Palace career fact:
  `milestone-XX-resolved`.

Final authored text is not part of v11.

---

## 6. Exact duty -> transition -> event ordering

Required order:

1. Player commits a valid Palace duty.
2. Duty credit commits once.
3. `palaceDutyCount` increments by +1.
4. If the new count is 2, 5, 8, 12 or 15 for the current stage, the matching Palace career transition commits in the same command.
5. At count 15 only, the final transition also writes `palace.progression-complete`.
6. Resolver observes `careerCounterChanged` and `careerTransition` (and `worldFactAdded` at 15).
7. Exactly one matching milestone event becomes the critical latched blocking scene.
8. New stage/counter state is already serialized while that scene is pending.
9. Player resolves the milestone scene.
10. Its continue choice writes the corresponding `milestone-XX-resolved` Palace career fact.
11. Stage-specific optional content may become available only after that barrier fact exists.

This barrier prevents optional relationship/Night/outcome content from overtaking the visible stage milestone.

---

## 7. Final milestone ordering and Prince safety

At duty 15:

1. stage changes to `outcome-ready`;
2. `palace.progression-complete` is written;
3. `palace.progression.milestone-15-outcome-ready` becomes pending.

Therefore a save made during the final milestone already contains:

- stage = `outcome-ready`;
- duty count = 15;
- `palace.progression-complete`;
- pending milestone-15 scene.

This is safe because the blocking pending scene prevents the player from starting another normal action/Activity or committing an ending until the milestone is resolved.

No extra hidden Prince gate is needed merely to protect ordering.

---

## 8. Save/reload contract

For each milestone, save/reload behavior is fixed in three phases.

### Before

Example for count 8:

- stage = `trusted-service`;
- count = 7;
- no pending count-8 milestone;
- `milestone-08-resolved` absent.

### During

After the threshold duty commits but before milestone choice:

- stage = `palace-network`;
- count = 8;
- pending = `palace.progression.milestone-08-palace-network`;
- `milestone-08-resolved` absent.

Reload restores this exact pending state.

The duty is not replayed.

The transition is not replayed.

### After

After the milestone choice:

- stage = `palace-network`;
- count = 8;
- pending milestone cleared;
- `milestone-08-resolved` present.

The same before/during/after rule applies at 2, 5, 8, 12 and 15.

At count 15, `palace.progression-complete` is false before and true during/after.

---

## 9. Functional duty taxonomy

v11 fixes six functional duty families so 15 duties are not fifteen copies of one work click.

All six have the same progression weight:

`+1 Palace duty`

No optional support changes that weight.

### A. Service Rotation

ID:

`service-rotation`

Candidate action:

`palace.duty.service-rotation`

First available:

`entered-service`

Purpose:

baseline recurring service / operational continuity.

Mechanical shape:

- direct duty action;
- duty count +1 at action commit;
- stage-conditioned presentation only;
- no follow-up required.

This is the always-available baseline route.

### B. Logistics Support

ID:

`logistics-support`

Candidate action:

`palace.duty.logistics-support`

First available:

`entered-service`

Purpose:

handoff, access and routing work.

Optional variants can use:

- `official_guard_access`
- `guard_sealed_pass`
- `access_guest_rooms_staff`
- `cross_rough_route`

None is required.

### C. Records Review

ID:

`records-review`

Candidate action:

`palace.duty.records-review`

First available:

`working-rhythm`

Purpose:

records, verification and material-review context.

Optional variants:

- `merchant_verify_manifest`
- `merchant_handle_samples`
- `preserve_specimen`

No item is required for baseline completion.

### D. Coordination

ID:

`coordination`

Candidate action:

`palace.duty.coordination`

First available:

`trusted-service`

Purpose:

cross-role coordination / professional responsibility.

It may emit optional post-duty relationship content for:

- professional patron;
- rival;
- official contact.

Duty credit commits before any optional follow-up.

Declining or lacking that follow-up never removes the +1 duty.

### E. Formal Interface

ID:

`formal-interface`

Candidate action:

`palace.duty.formal-interface`

First available:

`palace-network`

Purpose:

formal/protocol-sensitive work.

Optional variants may use:

- `artist_formal_presence`
- `artist_handle_invitation`
- `official_guard_access`
- `guard_sealed_pass`

There is always a baseline route.

### F. Evidence Review

ID:

`evidence-review`

Candidate action:

`palace.duty.evidence-review`

First available:

`crossroads`

Purpose:

late-stage review/interpretation context.

Optional variants may use:

- `prostitute_handle_evidence`
- `preserve_specimen`
- `merchant_verify_manifest`

Optional follow-up may support Inner Truth preparation.

It does not give extra duty credit.

---

## 10. Anti-repetition rules

Implementation must preserve these rules:

- at least two baseline duty families exist from Entered Service;
- Working Rhythm unlocks Records Review;
- Trusted Service unlocks Coordination;
- Palace Network unlocks Formal Interface;
- Crossroads unlocks Evidence Review;
- duty families have distinct presentation/function;
- all duties remain +1 progression weight;
- no item/relationship/romance/Night is required;
- optional follow-up happens after duty credit;
- refusing optional content cannot invalidate already-earned duty credit;
- Night and outcome-prep scenes never increment duty count.

This gives stage growth without inventing a new minigame/combat subsystem.

---

## 11. Optional relationship attachment points

These are first-availability points, not progression requirements.

### Official Contact

First stage:

`working-rhythm`

Barrier:

`milestone-02-resolved`

### Professional Patron

First stage:

`trusted-service`

Barrier:

`milestone-05-resolved`

### Rival

First stage:

`trusted-service`

Barrier:

`milestone-05-resolved`

### Optional Romance

First stage:

`crossroads`

Barrier:

`milestone-12-resolved`

Romance is:

- optional;
- refusal-safe;
- not required for Palace progression;
- not required for any Palace ending.

---

## 12. Optional Palace Night attachment

### Work Review

`palace.night.work-review`

First available:

`working-rhythm`

Barrier:

`milestone-02-resolved`

Counts as Palace duty:

no.

### Social Conversation

`palace.night.social-conversation`

First available:

`trusted-service`

Barrier:

`milestone-05-resolved`

Counts as Palace duty:

no.

Neither owns forced Night.

---

## 13. Secret Debt precedence

Forced Secret Debt Night always wins over optional Palace Night.

If Secret Debt or another forced owner suppresses the voluntary Night menu:

- Palace Night choices are simply unavailable that Night;
- no Palace progression is lost;
- no Palace duty is required at Night;
- no non-True or True route may require Palace Night.

Palace duties/stages must never:

- clear debt;
- change Secret Debt bound state;
- suppress forced Secret Debt Night;
- suppress forced next-day Energy penalty;
- unlock ordinary careers;
- add ordinary Hard Work progress.

---

## 14. Non-True outcome preparation facts

All preparation state is run-local:

`run.progression.worldFacts`

### Service Life

Preparation fact:

`palace.prep.service-life`

Earliest stage:

`trusted-service`

Candidate prep event:

`palace.outcome-prep.service-life`

Final ready fact:

`palace.outcome.service-life-ready`

Candidate finalize event:

`palace.outcome-finalize.service-life`

### Court Power

Preparation fact:

`palace.prep.court-power`

Earliest stage:

`palace-network`

Candidate prep event:

`palace.outcome-prep.court-power`

Final ready fact:

`palace.outcome.court-power-ready`

Candidate finalize event:

`palace.outcome-finalize.court-power`

### Inner Truth

Preparation fact:

`palace.prep.inner-truth`

Earliest stage:

`crossroads`

Candidate prep event:

`palace.outcome-prep.inner-truth`

Final ready fact:

`palace.outcome.inner-truth-ready`

Candidate finalize event:

`palace.outcome-finalize.inner-truth`

---

## 15. Non-exclusive route rule

Any subset of the three preparation facts may coexist.

All three may coexist.

At Outcome Ready, any earned prep fact may independently expose its corresponding finalize event.

All three final-ready facts may coexist too.

None of these facts:

- blocks another Palace branch;
- blocks Prince confrontation;
- blocks Return Home;
- is required for general Palace progression.

Exclusivity starts only when the player explicitly commits an ending.

---

## 16. Ending commit separation

Preparation never commits an ending.

Finalization never commits an ending.

Non-True ending eligibility consumes the corresponding final-ready fact, but the actual choice remains:

existing ending `commit/accept` lifecycle.

Therefore the run may simultaneously have several eligible Palace outcomes.

Only explicit player commit selects one.

Meta reward/application remains at the existing `completeEnding` transaction boundary.

---

## 17. Prince availability contract

Authority:

- D18;
- D29;
- frozen v9 confrontation packet.

Prince confrontation cannot be available unless all of these are true:

- `palace.access-granted`;
- Palace stage = `outcome-ready`;
- `palace.progression-complete`;
- strength >=91;
- endurance >=91;
- dexterity >=91;
- reason >=91;
- magic >=91;
- creativity >=91;
- wits >=91;
- charm >=91;
- sociability >=91;
- manners >=91;
- grooming >=91;
- sexuality >=91;
- `palace.prince-defeated` absent.

Lust is excluded.

cap-200 does not normalize the 91 threshold.

cap-200 does not skip Palace stages/duties.

No preparation fact is required.

No relationship is required.

No romance is required.

No Palace Night is required.

No item capability is required.

v11 does not choose among the frozen v9 confrontation models.

---

## 18. Prince defeat and Return Home separation

Frozen defeat signal:

`palace.prince-defeated`

After a successful confrontation, Return Home may become eligible only with:

- Palace access;
- stage `outcome-ready`;
- `palace.progression-complete`;
- all 12 progression stats >=91;
- `palace.prince-defeated` present.

Defeat does not automatically commit Return Home.

The player must still explicitly commit the ending.

---

## 19. Production implementation boundary

v11 does not choose how the duty action code dynamically applies the matching transition.

A future implementation may use:

- stage-specific action definitions;
- a Palace-local helper;
- another small existing-compatible pattern.

But the externally observable contract is fixed:

```text
duty commit
-> duty count +1
-> at exact threshold apply one matching stage transition
-> resolve one critical latched milestone
-> open post-milestone optional content
```

No generic combat/progression subsystem is requested by v11.

---

## 20. Acceptance coverage

The fixture contains V11-A01 through V11-A27.

Core acceptance:

- six exact stage IDs;
- logical `palaceDutyCount` + persisted `palace-duty-count`;
- +1 exactly once per duty;
- transitions exactly at 2/5/8/12/15;
- only final transition writes `palace.progression-complete`;
- one latched milestone per transition;
- reload-safe before/during/after states;
- milestone barrier prevents optional content overtaking stage transition;
- six distinct duty families with stage-specific unlocks;
- no hidden romance/item/Night/relationship progression gate;
- non-True prep starts at D29 stages and remains non-exclusive;
- endings stay uncommitted until explicit player commit;
- Prince gate is outcome-ready + progression-complete + 12x91;
- Lust excluded;
- cap-200 does not normalize 91;
- Secret Debt forced Night wins;
- Palace cannot clear debt or unlock ordinary careers;
- no `hardWork:palace`;
- no Palace daily cadence is invented;
- no Prince lore/mechanics are introduced.

---

## 21. Explicitly deferred

Still not decided/implemented by v11:

- exact Palace daily cadence;
- exact Palace wages;
- Palace stat gains/losses;
- final player-facing prose;
- final presentation/media;
- v9 confrontation model selection;
- Prince name/lore;
- production engine/UI code.

No full CI was requested from Chat 6.

Freeze exact SHA and report:

`READY_FOR_LEADER_ACCEPTANCE`
