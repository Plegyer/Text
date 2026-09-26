# PR20 Latest-Head Recheck v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
PR: #20 — Lead: activate School and Lumber production vertical slice  
Reviewed PR20 HEAD: `4cd0f62451899387f8f268f0893aadc33d7fb740`  
Base main: `ee9f8365aba5bfef3c90551082da7ba06f62873f`

## Executive result

PR20 has resolved the two source blockers identified in the previous Chat 4 live review:

1. School ending registration now occurs before the School Resolver boundary.
2. School Night-study tests now expect and verify the typed `night_study_sessions` counter.

The PR also now has an explicit activation workflow.

However PR20 is still **STILL_BLOCKING** because its latest workflow run fails the full test step.

Workflow:

- name: `Product Activation School Lumber Check`
- run: `36262624444`
- HEAD: `4cd0f62451899387f8f268f0893aadc33d7fb740`
- `npm ci`: PASS
- typecheck: PASS as part of `npm run check`
- validate: PASS
- build: PASS
- tests: **170 pass / 17 fail / 187 total**
- overall: FAIL

Validation evidence from the run:

`Content OK: 7 packs, 26 events, 26 actions, 9 endings.`

Build evidence:

`Built renderer, content catalog and desktop save validator.`

The remaining red suite is now mostly activation-driven test/fixture compatibility drift. It still blocks merge until deliberately resolved and a fresh full check is green.

---

# Previous blocker / not-yet-implemented recheck

| Previous issue | Latest status | Current evidence |
|---|---|---|
| semantic slash `pendingScene.presentationId` schema | **RESOLVED** | `src/core/schema.ts` uses semantic presentation grammar |
| pending scene semantic ID persistence | **RESOLVED** | `src/core/engine.ts` stores `presentationIdForEvent` |
| result UI ignored persisted `lastAction.presentationId` | **RESOLVED** | `src/ui/app.ts` prefers persisted value |
| old schema-4 missing School state | **RESOLVED in source** | `progression.school.default({tracks:{}})` |
| typed paid lesson counter | **RESOLVED** | `lessons_completed` typed School counter |
| typed Night-study counter | **RESOLVED** | `night_study_sessions` typed School counter |
| School command absent | **RESOLVED** | first-class `schoolLesson` command |
| School Resolver registration ordering | **RESOLVED** | `runtime.register?.(paid,cat)` now executes before `resolveReactions` |
| School Resolver ordering regression proof missing | **RESOLVED** | new `tests/school-activation-boundary.test.ts` |
| stale Night-study one-effect test | **RESOLVED** | test now expects stat + School counter effects |
| School UI not player-reachable | **RESOLVED** | eight course controls dispatch `schoolLesson` |
| Lumber target UI not player-reachable | **RESOLVED** | Work list uses `lumber.shift` |
| Activity UI not player-reachable | **RESOLVED** | `lumber.forest` entry + active controls |
| NightFlow UI not player-reachable | **RESOLVED** | explicit endDay/lodging/night-choice controls |
| target Lumber definitions not production | **RESOLVED** | production definitions contain target career/relationship/Activity/endings |
| recursive fixture pack activation risk | **RESOLVED by explicit promotion** | three named top-level production Lumber packs |
| absent target GIF path validation blocker | **RESOLVED by static fallback promotion** | promoted packs use shipped SVGs |
| synthetic `school.lumber-management` production leak | **RESOLVED** | absent from production actions |
| Hard Work gained extra prerequisite | **RESOLVED / unchanged** | only `completed_shifts >= 50` |
| Hard Work reward drift | **RESOLVED / unchanged** | exact `hardWork:lumber` |
| no activation CI workflow | **RESOLVED** | PR adds `.github/workflows/product-activation-school-lumber-check.yml` |
| full activation CI green | **STILL_BLOCKING** | current workflow fails 17 tests |

---

# Resolved: School Resolver ordering

Latest `src/core/engine.ts` passes the engine-local `register` function to School runtime:

```ts
executeSchoolLesson(s,command.id,cat,{applyEffects,register,resolveReactions})
```

Latest `src/core/school.ts` runs:

```text
apply full effects
-> build lastAction / journal
-> runtime.register(paid,cat)
-> build reaction facts
-> runtime.resolveReactions(...)
```

This matches the required integration ordering.

New regression:

`tests/school-activation-boundary.test.ts`

constructs a lesson that makes an ending eligible and asserts the same command boundary selects an `endingEligible` event.

**Status: RESOLVED.**

---

# Resolved: Night-study counter separation

Latest source emits:

- selected stat +2;
- `night_study_sessions +1`.

Latest:

`tests/school-night-study-adapter.test.ts`

now asserts both effects and separately verifies:

- `night_study_sessions=1`;
- `lessons_completed=0`;
- reload keeps the counter once.

**Status: RESOLVED.**

---

# New blocker group A — School isolated fixtures lag new production preconditions/state

## A1. Paid School reload fixture rejects `lastAction.id='school'`

Failing test:

`school-engine-adapter.test.ts -> save/reload after a paid lesson preserves the committed charge and semantic presentation identity`

Failure:

`Неизвестное последнее занятие.`

Cause seam:

- latest School helper persists `lastAction.id='school'`;
- `parseSave` requires lastAction ID to exist in the supplied catalog actions;
- this isolated School fixture catalog does not include compatibility action `school`.

Production definitions do include legacy `school`, so this is primarily a fixture/contract update problem, but it still blocks the full suite.

Required resolution must be deliberate:

- either make the isolated School fixture include the compatibility marker action required by the runtime contract;
- or alter the runtime/save identity contract consistently.

Do not weaken `parseSave` validation only to silence the fixture.

## A2. School target fixtures do not mark arrival complete

Failing examples:

- `School lesson rejects insufficient money atomically`;
- `School lesson rejects insufficient current-day Energy atomically`;
- `paid multi-stat lesson charges exactly once and Resolver observes the complete package`;
- `School result can trigger a free reactive career event without another Work action`;
- `save/reload after a paid lesson preserves the committed transaction without recharging`.

Failure:

`Finish the arrival before School.`

Latest School availability correctly requires:

`story.arrived`.

But `tests/school-target.test.ts -> schoolReady()` completes creation without setting arrival.

This is test-fixture drift introduced by the production UI/precondition activation.

Expected fix:

set the accepted arrival prerequisite in the test ready-state where the test is intended to exercise later School availability failures/successes.

Atomic insufficient-money and insufficient-Energy tests should reach those exact validations, not fail earlier on arrival.

---

# New blocker group B — typed-effects fixture replaces machines while retaining new target action

Multiple `typed-effects.test.ts` cases fail with:

`Неизвестная career state machine: lumber`

The test helper:

`typedDefinitions()`

starts from shared production `definitions`, then replaces:

`d.careers`

with a test-only `lumber.target` machine.

After PR20, production actions also contain:

`lumber.shift`

whose typed effect references career:

`lumber`.

Therefore the modified fixture contains a target action referring to a career machine the test deliberately removed.

Affected tests include typed condition/effect/transition/capability/save cases.

This is a test isolation regression, not evidence that production `lumber.shift` itself is invalid; production validation already passes.

Expected resolution:

make the typed-effects fixture internally closed again, for example by preserving required production machines or by constructing/filtering only the action/content surface that the synthetic test intends to validate.

Do not relax global reference validation.

---

# New blocker group C — legacy UI tests still click removed/changed controls

Two UI tests fail with:

`Cannot read properties of null (reading 'click')`.

## Legacy Work selector

Existing test still queries:

`[data-action="lumber"]`

The activated product UI intentionally exposes:

`lumber.shift`

as the target Work route.

The test must be migrated to the target workflow and its first-shift/Foreman behavior, rather than restoring legacy UI only to satisfy the test.

## Legacy Sleep selector

Existing test still queries:

`[data-sleep="outside"]`

The activated UI now starts explicit NightFlow and uses:

- `data-end-day`;
- `data-lodging`;
- `data-night-choice`.

The test must be updated to the new NightFlow UI contract.

These are direct activation test migrations and must remain executable after update.

---

# CI failure inventory

The latest run reports these 17 failures:

1. paid School reload / semantic presentation identity;
2. School insufficient money atomicity;
3. School insufficient Energy atomicity;
4. paid multi-stat School package;
5. School free reactive career event;
6. paid School reload without recharge;
7. School Night study separate Night-slot action;
8. typed conditions / virtual stages;
9. typed effect ordering;
10. invalid/wrong-stage transition atomicity;
11. quest/relationship named transitions;
12. typed pack capabilities;
13. meta read/no ordinary mutation;
14. next-day modifier once;
15. schema4 machine ID/stage validation;
16. legacy Work UI flow;
17. legacy Sleep UI flow.

The School Night-study adapter's dedicated new assertions pass; the separate failing School Night test belongs to an older broader fixture whose ready-state/catalog assumptions also need migration.

---

# What is already proven by the failing run

Do not discard the useful green evidence from the same exact HEAD:

- dependency install succeeded;
- typecheck succeeded;
- production validation succeeded;
- production catalog is structurally valid:
  - 7 packs;
  - 26 events;
  - 26 actions;
  - 9 endings;
- build succeeded;
- 170 tests passed;
- new School activation boundary test passed;
- updated dedicated Night-study counter tests passed.

This narrows the remaining merge gate to regression-suite compatibility and any defects exposed by those tests.

---

# Current PR20 disposition

**STILL_BLOCKING.**

The old source blockers are resolved, but PR20 cannot merge as QA-green while:

`npm run check`

ends with:

```text
# tests 187
# pass 170
# fail 17
```

Required next evidence:

- migrate/fix the failing test fixtures without weakening accepted runtime invariants;
- rerun the exact PR20 workflow;
- require zero failing tests;
- then run the shipped-dist and activation regression gates defined by the remaining Chat 4 queue.

No production file was modified by Chat 4.
