# Lumber Target Wage Fix QA Gate v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Reviewed PR: #40 — Lead: restore Lumber target wage and verify Work UI

## Final disposition

GREEN / MERGED.

PR40 head:
0d7dfeba5b1394b97e94096e70db280d41f3c8e6

Merge SHA:
c71898654ea8419799816d9642184c4dcf23b039

Exact-head CI:
- run 36317116265
- 288 tests
- 288 pass
- 0 fail
- validation: 16 packs, 43 events, 35 actions, 9 endings

Post-merge main CI:
- run 36317357460
- 288 tests
- 288 pass
- 0 fail
- validation: 16 packs, 43 events, 35 actions, 9 endings

## 1. Wage source provenance

PR40 does not invent a new Lumber wage formula.

Before PR40, current definitions already contained the legacy compatibility action:
lumber

with wage:
- base 13
- Strength weight 0.5
- Endurance weight 0.25

PR40 copies that exact wage contract onto:
lumber.shift

The legacy source remains unchanged.

PASS:
EXISTING_COMPATIBILITY_SOURCE_REUSED.

## 2. Target Work UI money gain

PR40 UI test executes the real target button:
lumber.shift

Starting from the normal test start state, it verifies:
- money increases;
- expected test-state increase is +16;
- journal reports earned money.

The +16 assertion is derived from the reused wage formula and current post-action stats in that test state; it is not a new Product wage lock.

PASS.

## 3. Energy cost

Current lumber.shift remains:
- money cost 0
- Energy cost 1

PR40 does not change the action cost.

Existing and updated tests keep the one-Energy invariant.

PASS.

## 4. Typed completed_shifts

Current lumber.shift still contains exactly one target progression effect:

incrementCareerCounter:
- career lumber
- counter completed_shifts
- amount 1

PR40 does not add a second counter effect.

UI/one-Save/RC tests verify the target shift continues to advance the target path.

PASS.

## 5. Hard Work invariant

PR40 does not modify the Lumber ending rule.

It remains:
careerCounter(lumber, completed_shifts) >= 50

Meta reward remains:
hardWork:lumber

No wage, money, season, Forest, relationship, or legacy action-count prerequisite was added.

PASS.

## 6. No legacy action-count migration

PR40 changed:
- definitions.json
- UI test
- three existing QA/E2E tests

It did not change:
- engine.ts
- schema.ts
- save migration logic.

The target progression owner remains typed:
run.progression.careers.lumber.counters.completed_shifts

The UI test also records the normal target action history under:
lumber.shift

PR40 does not migrate legacy actionCounts["lumber"] into target completed_shifts.

PASS.

## 7. Regression updates

The initial PR40 head was red because an old one-Save assertion still assumed money had not increased after repeated Lumber work.

That was a test expectation drift caused by the newly restored wage.

Final fix updated the assertion so repeated paid Lumber work may increase money while the rest of the one-Save invariants remain intact.

Final exact head:
288/288 PASS.

The red intermediate run is superseded by the final exact-head run.

## 8. Scope review

Production behavior change:
- adds existing compatibility wage contract to target lumber.shift.

No change to:
- seasonal stat matrix;
- first-shift milestone;
- Foreman;
- School;
- Night;
- Forest;
- ending/Meta;
- Save schema.

PASS.

## Final gate

- wage source is existing, not invented: PASS
- UI click earns money: PASS
- 1 Energy retained: PASS
- completed_shifts increments once: PASS
- Hard Work exact rule unchanged: PASS
- no legacy counter migration: PASS
- exact-head CI: 288/288 PASS
- post-merge CI: 288/288 PASS
- merged: YES

No production runtime/UI/content file was modified by Chat 4.
