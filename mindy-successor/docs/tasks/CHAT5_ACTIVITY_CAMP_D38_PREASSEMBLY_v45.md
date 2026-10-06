# CHAT 5 — Activity + Camp + D38 preassembly handoff v45

Status: **BUNDLE_COMPLETE — READY_FOR_CHAT2_ACTIVITY_ASSEMBLY_PREP**
Owner: Chat 5
Date: 2026-10-06
Branch: `chat5/activity-camp-d38-preassembly-v43`

This is the final Chat5 preassembly handoff for Activity + Camp + D38.

It is not a production candidate. No synthetic cumulative source tree was created. Frozen producer branches were not mutated. No full CI was run. `main` was not merged.

## Final live checkpoint

Latest live re-query during finalization:

- `main@1daf5735d2e6d30cc1e8d0404f1ec38814109ac9`;
- the movement from the earlier v45 checkpoint `99e52051845ce966a769939521d01687830a3240` is coordination/task/pointer documentation only;
- none of the Activity/Camp/D38 production collision surfaces changed in that move.

Chat 2 remains the sole current-main assembly/full-CI lane.

## Evidence

- v43 lineage/collision audit:
  `mindy-successor/docs/tasks/CHAT5_ACTIVITY_CAMP_D38_LINEAGE_COLLISION_AUDIT_v43.md`
- v44 exact-head QA:
  `mindy-successor/docs/tasks/CHAT5_ACTIVITY_CAMP_D38_EXACT_HEAD_QA_v44.md`

## Frozen authorities

Activity cumulative baseline:

`ab378d68765f7c9bbff43abf3b4b41e24df82e01`

D38 mechanics:

`3cf69d7cb3df1a58d68908159d0acc14736435c4`

D38 content/presentation:

`df9ef5c3d04cfd8eb582c24838d971854e984218`

D38 reachability evidence:

`7ae7a9b273f1806ac04b566c318896783bab6595`

Camp cumulative executable-repair authority:

`efde0a38bf71a8946194402a9fc47abb168f2aff`

## Cumulative / parallel lineage

Activity v15 is the cumulative four-region line:

`Forest v12 -> Trade v13 -> Anomalous v14 -> Restricted Sites v15 ab378d...`

D38 is a strict cumulative line on Activity v15:

`ab378d... -> 3cf69d... -> df9ef5... -> 7ae7a9...`

Camp is a separate strict cumulative line on Activity v15:

`ab378d... -> Camp v17 -> Camp v19 efde0a...`

D38 v18 and Camp v19 diverge after exact merge-base:

`ab378d68765f7c9bbff43abf3b4b41e24df82e01`

Their true authored deltas relative to that common ancestor have zero direct changed-path intersection.

That does not make whole-branch composition safe: each historical branch carries stale snapshots and current main has newer authority on shared runtime/content/UI files.

## Product invariants

Preserve exactly:

- Activity entry = **2 Energy**;
- Field Time = **6**;
- Camp max = **2 field nights**;
- Camp never suppresses an eligible Secret Debt forced Night;
- no universal Activity XP;
- canonical D38 endings:
  - `ending.activity.pathfinder`
  - `ending.activity.preservation`
  - `ending.activity.network`;
- canonical D38 Specialist rewards:
  - `specialist.activity.surveyors-atlas`
  - `specialist.activity.field-archive`
  - `specialist.activity.contact-network`;
- accepted D38 marked-anchor/reachability semantics;
- D51 floor2 only for the exact Street -1 + bound-Night -1 pair;
- Strong Meta Specialist capacity remains 2.

Exact frozen Activity definitions verify 2 Energy + 6 Field Time for all four D36 regions.

Exact frozen Camp schema/runtime verifies local `campStateVersion=1`, max two nights, exactly-once calendar/Field-Time commit bits, and forced `nightPhase(before_lodging)` interception before Camp calendar commit.

## Exact-head executable evidence

### Camp v19

**EXACT-HEAD GREEN.**

Run `37503918423`, job `112407617310`:

- exact SHA guard: PASS;
- `npm ci`: PASS;
- typecheck: PASS;
- validate: PASS;
- build: PASS;
- focused Activity/Camp/migration/reload/Night: **107/107 PASS**.

This reproduces earlier exact Camp green run `37206785081`.

### Activity v15

**NOT STANDALONE EXACT-HEAD GREEN.**

Run `37503918423`, job `112407617262`:

- exact SHA guard: PASS;
- `npm ci`: PASS;
- typecheck: FAIL.

Exact failure:

`tests/item-capability-activity-closure.test.ts(124,23): TS2345`

The historical synthetic `forest.route.unknown-capability` fixture omits required `effects`.

### D38 v18

**NOT STANDALONE EXACT-HEAD GREEN FOR THE SAME INHERITED FIXTURE.**

Run `37503918423`, job `112407616865`:

- exact SHA guard: PASS;
- `npm ci`: PASS;
- typecheck: FAIL at the same file/line/error.

D38 did not author this defect; the stale test fixture is inherited from Activity v15.

### Exact repair already present in Camp v19

The Camp frozen lineage repairs that exact synthetic option with:

`effects: []`

and then passes the full required gate.

Classification:

**STALE SHARED HISTORICAL TEST FIXTURE — ALREADY REPAIRED IN THE ACCEPTED CAMP CUMULATIVE LINEAGE.**

This is not a Product/runtime reason to reopen Activity or D38 producer code.

Supplementary diagnostic run `37504871830` completed and sharpened the classification:

- Activity v15: typecheck FAIL, validate FAIL, build PASS, focused 13/18 PASS;
- D38 v18: typecheck FAIL, validate FAIL, build PASS, focused 13/19 PASS;
- Camp v19: typecheck/validate/build PASS, focused 107/107 PASS.

Activity/D38 validate and focused failures are rooted in inherited Activity baseline catalog debt: the historical Forest pack lacks the typed-read declaration for `activity.forest-frontier.result.research-grade`, so affected focused files fail while loading the shared catalog. Camp v19 carries the accepted manifest repairs for that research-grade read and `forest.frontier.school-reflection-recorded`, plus the synthetic `effects: []` typing repair and later regional focused-fixture repairs.

Thus the exact lineage class is **historical Activity executable-baseline debt already repaired by Camp v19**, not a D38-specific runtime/content failure.

## Collision map

Never whole-file copy historical Activity snapshots over current main for:

- `content/definitions.json`;
- `src/core/engine.ts`;
- `src/core/schema.ts`;
- `src/ui/app.ts`.

Never whole-file copy historical D38 snapshots over current main for:

- `content/definitions.json`;
- `content/localization.json`;
- `content/presentation.json`;
- `src/ui/app.ts`.

Camp has high-risk current-main collision surfaces in:

- `src/core/engine.ts`;
- `src/core/schema.ts`.

Camp also owns selective changes in:

- `src/core/content.ts`;
- `content/packs/forest-frontier-production.json`;
- Camp persistence tests;
- repaired cumulative Activity test fixtures, including the exact `effects: []` fix above.

The D38/Camp collision is lineage/snapshot, not a same-path authored-delta collision.

## Recommended selective assembly order

Chat2 must assemble onto its then-current full current-main tree, not onto any historical producer branch.

1. **Activity cumulative semantic delta**
   - compose the accepted four-region v12-v15 behavior;
   - preserve current-main schema/runtime/UI around Activity-owned hunks;
   - verify 2 Energy, Field Time 6, all region/minigame/save contracts, no universal XP.

2. **Camp delta from `ab378d...` to `efde0a...`**
   - fold local Camp persistence into the current global save schema;
   - preserve current NightFlow and Secret Debt start-day activation;
   - preserve D51 Energy rules;
   - bring the Camp-repaired baseline tests, including `effects: []` in the stale item-capability fixture;
   - run Camp/save/reload/Night focused QA.

3. **D38 mechanics `ab378d... -> 3cf69d...`**
   - transplant canonical ending conditions/reward bindings/tests;
   - do not bring back the stale pre-Camp baseline fixture.

4. **D38 content/presentation `3cf69d... -> df9ef5...`**
   - key/record-level merge definitions/localization/presentation/UI into current main.

5. **D38 v18 reachability evidence**
   - no production patch;
   - use its pacing/marked-anchor conclusions as acceptance evidence.

6. **Current-main adjacency**
   - Activity + D51 bound Street floor;
   - Camp + forced Secret Debt Night;
   - Camp + current save/migration chain;
   - D38 + current Strong Meta registry;
   - D38 + ending completion lifecycle;
   - current UI/localization/presentation.

This order intentionally applies the accepted Camp cumulative baseline repair before D38 tests are treated as executable.

## Focused test roster

Before Chat2 full CI:

`npm ci`

`npm run typecheck`

`npm run validate`

`npm run build`

Then at minimum:

```text
node --experimental-strip-types --test
tests/activity.test.ts
tests/item-capability-activity-closure.test.ts
tests/forest-frontier-production-hardening-v12.test.ts
tests/trade-corridor-production-v13.test.ts
tests/anomalous-reach-production-v14.test.ts
tests/restricted-sites-production-v15.test.ts
tests/activity-camp-persistence-v17.test.ts
tests/migration.test.ts
tests/qa-activity-option-reload.test.ts
tests/qa-exactly-once-reload.test.ts
tests/night-flow.test.ts
tests/activity-ending-family-v16.test.ts
tests/activity-ending-content-presentation-v17.test.ts
```

Also execute the current-main tests for:

- D51 exact bound-Street floor2 pair;
- Secret Debt start-day activation after calendar advancement;
- Strong Meta Specialist capacity=2;
- ending permanent-reward exactly-once lifecycle;
- current save schema/profile merge.

If a historical test API is obsolete, preserve its assertion using the current API instead of restoring stale code.

## Save / migration stop conditions

Stop and classify rather than auto-repairing foreign production if:

1. Camp integration would downgrade or replace the current global schema chain;
2. Camp migration infers progress from calendar/checkpoint/route/Field Time/housing instead of neutral old-save defaults;
3. partial/unsupported Camp state is silently accepted;
4. Camp calendar advance can duplicate after reload;
5. Camp Field Time refresh can duplicate after reload;
6. a third field night is reachable;
7. Camp calendar advance skips current Secret Debt start-day activation;
8. forced Secret Debt Night can be suppressed/delayed/bypassed by Camp;
9. the exact D51 Street -1 + bound-Night -1 pair cannot still enter 2-Energy Activity;
10. D38 integration creates a third/free Specialist slot;
11. D38 eligibility auto-commits an ending;
12. canonical D38 ending/reward IDs collide with a newer current-main authority;
13. any proposed repair introduces universal Activity XP.

## Producer-repair disposition

No Product/runtime producer repair blocker was identified.

The standalone Activity v15 and D38 v18 snapshots are not executable-green because they predate the accepted Camp v19 cumulative baseline-repair series: synthetic option typing, Forest typed-read manifest closure, and cumulative regional test-fixture repairs. Camp v19 is exact-head green and must be preserved by Chat2's assembly order.

Therefore:

- do not mutate Activity or D38 frozen branches;
- do not manufacture a new historical cumulative producer;
- do not treat standalone Activity/D38 snapshots as executable-green;
- do use Camp v19 as the accepted cumulative baseline repair before D38 current-main QA.

## Chat2 handoff decision

The package is fully characterized for current-main selective assembly preparation.

No full CI belongs to this Chat5 branch.

**BUNDLE_COMPLETE — READY_FOR_CHAT2_ACTIVITY_ASSEMBLY_PREP**
