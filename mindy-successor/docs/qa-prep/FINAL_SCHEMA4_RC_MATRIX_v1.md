# Final Schema-4 RC Matrix v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Baseline: current merged main after PR25

## Purpose

Classify the final schema-4 compatibility surface into:

- **EXECUTABLE_EVIDENCE** — current main has a runnable test proving the behavior;
- **SCHEMA_IMPLEMENTED / DOCUMENTED_EXPECTATION** — current schema/runtime supports the shape, but there is no dedicated direct regression for the exact legacy omission;
- **REJECT_ON_CORRUPTION** — malformed/stale state must fail explicitly.

This matrix is about compatibility and reload semantics, not product authoring.

---

# 1. Pre-School typed state

## Compatibility target

A schema-4 save created before typed School progression may omit:

`run.progression.school`.

Expected load result:

```text
progression.school.tracks = {}
```

No:

- lesson progress;
- Night-study progress;
- milestone;
- certificate;
- public fact

may be invented.

## Current implementation evidence

Current schema declares:

```ts
school: schoolProgressionStateSchema.default({tracks:{}})
```

inside `progressionStateSchema`.

Therefore omission is explicitly defaultable.

## Classification

**SCHEMA_IMPLEMENTED / DOCUMENTED_EXPECTATION**

There is no dedicated current-main test whose primary assertion deletes the entire `progression.school` property from a schema-4 save and parses it.

Recommended RC hardening:

add one direct regression that removes only the School property and asserts exact empty default.

---

# 2. Pre-presentationId save

## Compatibility target

Older schema-4 saves may have valid:

- pending eventId;
- pending variantId;
- lastAction identity/media

but no semantic:

`presentationId`.

Expected:

- parse succeeds;
- mechanical pending/action identity remains unchanged;
- presentation may be derived by current UI/runtime;
- no event/variant reroll;
- no mechanics replay.

## Current implementation evidence

Current schema makes semantic presentation ID optional in:

`pendingSceneSchema.presentationId`

and:

`lastActionSchema.presentationId`.

Presentation migration tests separately prove legacy mapping preserves pending event/variant identity.

## Classification

**SCHEMA_IMPLEMENTED / DOCUMENTED_EXPECTATION**

Current main does not have a direct parseSave regression whose core setup deletes a persisted semantic `presentationId` from a valid schema-4 pending/action save.

Recommended RC hardening:

add a small parser test for:

```text
valid pending scene
-> delete presentationId
-> parseSave
-> same eventId/variantId/choice snapshot
```

This is compatibility evidence, not a reason to restore legacy media IDs into gameplay state.

---

# 3. Pre-Activity-option active save

## Compatibility target

A schema-4 active Activity save from before PR22 may omit:

- `optionModelVersion`;
- `internalState.routeId`;
- `internalState.resolvedOptionIds`.

Expected:

- parse succeeds;
- `optionModelVersion=0`;
- `routeId=null`;
- `resolvedOptionIds=[]`;
- immediate legacy `advance`;
- immediate `escape`;
- no retroactive route selection.

## Executable evidence

Current main:

`tests/item-capability-activity-closure.test.ts`

contains:

`pre-option schema4 active Activity save preserves immediate legacy advance/escape behavior`.

PR25 also integrates:

`tests/qa-minimal-rc-acceptance-gate-v2.test.ts`

which independently deletes the same post-PR22 fields, reloads, and asserts:

- option-model 0;
- exact actions `advance`, `escape`;
- legacy advance progresses Activity.

## Classification

**EXECUTABLE_EVIDENCE — GREEN**

This is the strongest final schema-4 compatibility seam.

---

# 4. NightFlow checkpoints

## Compatibility target

Stable persisted Night checkpoints must reload without:

- charging lodging twice;
- reapplying Night effects;
- rerolling pending forced events;
- advancing the calendar twice.

Malformed Night state must reject.

## Executable evidence

Current main:

`tests/night-flow.test.ts`

covers:

- paid lodging survives reload and cannot be paid again;
- post-lodging forced event reload without second charge;
- probabilistic pending Night event reload without reroll;
- calendar advances exactly once;
- invalid persisted lodging reference rejects;
- lodgingPaymentCommitted without a lodging rejects;
- invalid Night policy references reject.

PR24/PR25 one-Save paths additionally cover real:

```text
lodging.normal
-> reload
-> lumber.foreman.night
-> pending event reload
-> calendar advance
```

## Classification

**EXECUTABLE_EVIDENCE — GREEN**

---

# 5. Pending School scene

## Compatibility target

A paid School lesson may commit its transaction and then open a blocking scene.

Reload while that scene is pending must preserve:

- event ID;
- allowed choice snapshot;
- paid School transaction;
- typed School progress.

Resolving the scene must not:

- recharge tuition;
- spend Energy again;
- duplicate `lessons_completed`.

## Executable evidence

Merged PR24:

`tests/release-candidate-shipped-e2e.test.ts`

proves the real production sequence:

```text
school.course.arcana
-> base.school
-> reload
-> listen
```

with tuition/Energy/progress remaining committed exactly once.

Merged PR25:

`tests/school-blocking-scene-compat.test.ts`

adds a generic blocking-scene compatibility fixture and proves:

- NightFlow blocked while scene pending;
- reload preserves pending scene;
- scene resolution does not recharge;
- typed School progress remains single-commit.

## Classification

**EXECUTABLE_EVIDENCE — GREEN**

---

# 6. Committed ending

## Compatibility target

A valid schema-4 committed ending must persist as:

```text
run.status = ending_committed
run.endings.committed = <known ending>
run.endings.result = null
```

Reload must not:

- auto-complete;
- grant Meta;
- create RunResult;
- change the committed ending.

Malformed combinations must reject.

## Executable evidence

Current main:

`tests/ending-meta.test.ts`

covers:

- commit changes flow state but does not grant Meta;
- reload before completion;
- completion only after explicit command;
- final committed-ending scene handling.

`tests/qa-exactly-once-reload.test.ts`

also reloads the committed boundary and verifies reward is still absent.

PR24/PR25 one-Save tests repeat this on the real Hard Work ending.

Current parser rejects:

- active + committed/result;
- ending_committed without committed ID;
- ending_committed with result already present.

## Classification

**EXECUTABLE_EVIDENCE — GREEN**

---

# 7. Ended RunResult

## Compatibility target

Modern valid ended save:

```text
status = ended
committed ending exists
RunResult exists
Meta transaction proof exists
completed Meta contains ending
```

Reload must be idempotent.

For the narrow pre-A6 schema-4 compatibility case:

```text
status = ended
committed ending exists
RunResult absent
```

the parser may synthesize deterministic compatibility result identity without reapplying product reward.

## Executable evidence

Current main:

`tests/ending-meta.test.ts`

contains:

- completeEnding creates one RunResult and applies reward once;
- reload before/after completion cannot duplicate;
- pre-A6 ended schema4 save receives compatibility RunResult without reward duplication;
- later-run same ending does not reapply unique Hard Work reward.

`tests/qa-exactly-once-reload.test.ts`

also proves ending transaction and New Run idempotency.

PR24/PR25 real Hard Work path verifies:

- exact `hardWork:lumber`;
- reload/retry;
- New Run persistence.

Current parser rejects:

- RunResult ending mismatch;
- missing transaction proof;
- duplicate Meta transaction proof;
- duplicate reward IDs;
- unknown ending references.

## Classification

**EXECUTABLE_EVIDENCE — GREEN**

---

# 8. Pending Lumber / Foreman presentation compatibility

Although not a separate requested matrix row, this is relevant to schema-4 pending compatibility.

Current parser verifies:

- event exists;
- variant belongs to event;
- allowed choice snapshot is valid.

`presentationId` is optional.

PR24 one-Save test reloads:

- Lumber milestone pending;
- Foreman notice pending;

with current semantic identity intact.

## Classification

**EXECUTABLE for current semantic saves; DOCUMENTED_EXPECTATION for explicit missing-presentationId legacy omission**

---

# Final matrix

| Compatibility case | Status |
|---|---|
| pre-School typed state | **SCHEMA_IMPLEMENTED / DOCUMENTED_EXPECTATION** |
| pre-presentationId save | **SCHEMA_IMPLEMENTED / DOCUMENTED_EXPECTATION** |
| pre-Activity-option active save | **EXECUTABLE_EVIDENCE** |
| NightFlow checkpoints | **EXECUTABLE_EVIDENCE** |
| pending School scene | **EXECUTABLE_EVIDENCE** |
| committed ending | **EXECUTABLE_EVIDENCE** |
| ended RunResult | **EXECUTABLE_EVIDENCE** |

---

# Minimal remaining schema-4 QA gaps

Only two small direct legacy-omission tests are still missing from current main:

1. delete entire `progression.school` from a valid schema-4 save and assert empty typed default;
2. delete semantic `presentationId` from a valid pending/action schema-4 save and assert mechanical identity remains stable.

These are targeted regression gaps, not known runtime failures.

No production runtime/UI/content file was modified by Chat 4.
