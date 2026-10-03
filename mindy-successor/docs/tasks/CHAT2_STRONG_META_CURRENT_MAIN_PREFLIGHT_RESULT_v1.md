# Chat 2 — Strong Meta current-main preflight result v1

Status: **COMPLETE — DOCS-ONLY PREFLIGHT**
Owner: Chat 2 / Integration + Assembly + Technical QA

Preflight branch:
`chat2/preflight-strong-meta-current-main-20261003-v1`

Requested base:
`528c6b225f5c2e1e8389577218dbad6048e32af0`

Base exact-main CI:
- workflow #1145 / run `37121518833`;
- **SUCCESS**;
- validate: 82 packs / 329 events / 39 actions / 22 endings;
- tests: **1030 / 1030 pass / 0 fail**.

Fresh-main drift observed while writing this result:
`528c6b225f5c2e1e8389577218dbad6048e32af0 -> ecaf2af5de0932b3c9bd4d87b62533c74ed1e61e`

That drift changes only:
`mindy-successor/docs/tasks/CURRENT_CHAT3_TASK_POINTER.md`

There is no `prototype-m3.2` drift, so this preflight remains valid for the current executable tree.

## Frozen producer authority

Frozen producer:
`chat4/strong-meta-runtime-producer-v7@6c3865aec1283055ab0713ca4b2873d379f3ddc6`

Exact dependency base:
`a579bd868d07a9fe10d504f6294ca7a7e3cea023`

First producer commit:
`3e211f39788f602111fa1f070ffa276d445cd72b`
(`Chat 4: add typed strong Meta runtime registry v7`)

The frozen producer is exactly **33 commits** ahead of that dependency base and is not behind it.

Original producer scope explicitly says:
- runtime/data layer only;
- final Strong Meta UI is out of scope;
- approved registry entries are exactly D24 cap-200 plus the three D30/D32 Secret Debt Keystones;
- no full CI on producer;
- freeze and hand to Chat 2.

## Exact producer delta

The accepted producer delta is exactly **12 files**.

### Production / runtime — 3 files

1. `src/core/engine.ts`
   - runtime integration;
   - ownership grant on ending completion;
   - selection commands;
   - current-run snapshot resolution;
   - D24 cap projection;
   - ordinary-work D30 seams;
   - start-day D30 seams;
   - save/migration integration;
   - current-Meta merge;
   - runtime/snapshot coherence validation.

2. `src/core/schema.ts`
   - Strong Meta reward kind in `metaRewardSchema`;
   - run-level `strongMetaSnapshot`;
   - run-level `strongMetaRuntime`;
   - permanent `meta.strongMeta`;
   - save schema v5 -> v6.

3. `src/core/strongMeta.ts` — new file
   - typed registry;
   - stable IDs;
   - ownership / knowledge / preferred selection schemas;
   - 0..1 Keystone + 0..2 Specialist validation;
   - resolved snapshot shape;
   - run-local counters;
   - D24/D30/D32 runtime helpers;
   - migration/reclassification helper;
   - registry validation.

Exact blobs:

| File | dependency-base blob | frozen producer blob | post-D31 main blob |
| --- | --- | --- | --- |
| `src/core/engine.ts` | `ab5be2731e30532eafc86ce31e21627a11166587` | `fd0db52ff0a427884484c54300b68d4e783129b1` | `75fc8ad177523c9da8ea784168032ac160d6ede9` |
| `src/core/schema.ts` | `1fc25c0fbcd8b68dfbfc5421084e2fd05c71a023` | `d2a3fcd2ae638352f41149c5a78e56d7ab773042` | `1fc25c0fbcd8b68dfbfc5421084e2fd05c71a023` |
| `src/core/strongMeta.ts` | absent | `29ae02f1b52784bb6c10112d3b2291c3a746e576` | absent |

Only `engine.ts` has a same-file current-main collision.

### Tests — 9 files

Producer-modified existing tests:
- `tests/ending-meta.test.ts`;
- `tests/engine.test.ts`;
- `tests/hard-work-meta-migration-v5.test.ts`;
- `tests/hard-work-stat-cap-d24.test.ts`;
- `tests/late-career-schema4-compat.test.ts`;
- `tests/migration.test.ts`.

Producer-added tests:
- `tests/strong-meta-d30-runtime-v7.test.ts`;
- `tests/strong-meta-engine-integration-v7.test.ts`;
- `tests/strong-meta-registry-v7.test.ts`.

All nine producer test paths are byte-identical on current main to the producer dependency-base version where they existed; there is no post-base same-file collision in those tests.

### Fixtures / content / UI / docs

The frozen producer delta changes:
- **no content JSON**;
- **no localization**;
- **no UI file**;
- **no fixture file**;
- **no task/product doc**.

That absence is intentional for the runtime producer.

## Strong Meta frozen registry

Frozen v7 registry constants:

- Keystone capacity: **1**;
- Specialist capacity: **2**.

Approved runtime IDs:

1. `palace.true.cap-200`
   - class: Specialist;
   - D24;
   - effect: progression-stat cap 200.

2. `secret-debt.paid-freedom.earned-reserve-match`
   - class: Keystone;
   - D32;
   - 1:1 ordinary-wage match;
   - per-run cap 1000.

3. `secret-debt.bound-life.work-rhythm`
   - class: Keystone;
   - D32;
   - +1 Energy on an armed next day;
   - maximum 20 triggered bonus days.

4. `secret-debt.takeover.network-retainer`
   - class: Keystone;
   - D32;
   - 25 money per eligible early day;
   - 40-day window;
   - per-run cap 1000.

The registry validates those exact current runtime constants.

## State / loadout contract

Permanent Meta:

`meta.strongMeta`
- `ownership.ownedRewardIds`;
- `knowledge.inheritedKnowledgeIds`;
- `preferredSelection.keystoneId`;
- `preferredSelection.specialistIds`.

Current-run snapshot:

`run.strongMetaSnapshot`
- contract version;
- registry version;
- selected Keystone;
- selected Specialists;
- automatic knowledge IDs;
- Specialist capacity at start;
- fully resolved reward definitions/effects.

Run-local counters:

`run.strongMetaRuntime`
- Reserve Match total paid;
- Work Rhythm armed/applied days and count;
- Retainer last processed day, paid-day count and total.

The snapshot stores resolved effect parameters. A later catalog edit therefore does not rewrite an in-progress run.

## Save / migration contract

Producer changes current save schema from v5 to **v6**.

v5 -> v6 migration:
- creates empty permanent Strong Meta state;
- does **not** infer ownership from generic `ruleModifiers`, `activeLegacyPerks`, unlocks or other legacy scaffolding;
- creates an empty legacy current-run snapshot for already-completed creation;
- keeps incomplete creation without a snapshot;
- initializes empty run-local runtime counters;
- validates snapshot/runtime coherence after parse.

This is the correct non-retroactive direction:
- an old active life does not suddenly gain newly selected Strong Meta;
- a later new life can resolve Strong Meta through the normal New Start+ selection flow.

Existing stale permanent `palace` unlock stripping remains required.

## Collision matrix

| Authority | Collision | Required assembly treatment |
| --- | --- | --- |
| D21-D22 Hard Work Meta | No file collision in Hard Work modules. Strong Meta is a separate permanent/loadout layer. | Preserve arbitrary earned Hard Work subset independently of Keystone/Specialist capacity. Never count Hard Work packages against 0..1 / 0..2. |
| D23 Palace invitation | **Real `engine.ts` collision.** Current main adds `markPalaceCreationQualification` import and creation hook after the producer base. | Manual merge `engine.ts`. Preserve Palace hook after Strong Meta snapshot/cap resolution and Hard Work package freeze, after `creation.complete=true`, before register/resolver. Never restore permanent Palace unlock. |
| D24 cap-200 | Producer intentionally removes direct `freshSave(...,{progressionStatCap:200})` new-life bypass. | Cap 200 must come from selected `palace.true.cap-200` Specialist. It consumes one normal Specialist slot. Legacy in-progress cap-200 saves may retain their already-stored cap through migration. |
| D28 loadout capacity | Producer matches locked 0..1 Keystone + 0..2 Specialists. | Keep capacity exact. No hidden/free Palace Specialist slot. Snapshot selected loadout and resolved parameters at creation completion. |
| New Start+ Hard Work UI | No same-file collision. Runtime producer intentionally has no final Strong Meta UI. | Keep current Hard Work UI unchanged. Do not fold Hard Work cards into Specialist capacity. Strong Meta UI is a later binding consumer; absence of that UI does not block this runtime assembly. |
| D30/D32 Secret Debt rewards | Runtime helpers match exact D32 values and ordinary-work seams. | Preserve ordinary-wage-only Reserve Match and ordinary-shift-only Work Rhythm arming. No lender/repayment/passive/non-work matching. |
| Secret Debt Energy -1 | Producer start-day order computes Strong Meta bonus before queued next-day Energy delta. | Preserve this order so queued `-1` remains a real one-Energy relative loss on a Work Rhythm bonus day. |
| Secret Debt bound state | Current executable main has **no typed Secret-Debt bound flag/state** in schema, definitions or engine. Producer therefore exposes an explicit `secretDebtBound` seam; real NightFlow calls currently cannot derive it. | Do **not** invent a bound flag in this assembly. Preserve the typed seam and pure/runtime tests. D19 consumer must wire the canonical bound predicate when that runtime exists. Until then, no current executable Debt bound flow exists to integrate. |
| D35 housing/private space | Frozen registry contains no No-Rent/housing/safety reward. | No collision. Do not add housing Meta. No future housing/safety modifier may suppress forced Debt Night. |
| D36 Activity | Producer does not change Activity entry cost or Activity routing. | Preserve 2-Energy entry semantics. Work Rhythm may change available daily Energy but must not directly discount Activity entry. |
| D37/D42 Night | Producer adds start-day Strong Meta processing inside shared NightFlow completion. | Preserve one global calendar advance and shared NightFlow. Do not create a Strong-Meta-specific Night bypass. Forced Debt Night precedence remains authoritative. |
| D31 seasonal target map | No producer content-file overlap. D31 lives in current `definitions.json`. | Never copy producer content (there is none). Keep post-D31 `definitions.json` byte-for-byte except unrelated later authorized work. Re-run D31/natural-route QA because Strong Meta hooks execute around ordinary work/day flow. |
| D38 Activity ending rewards | Accepted Product authority now defines three future Activity Specialists, but frozen v7 runtime registry intentionally approves only four earlier IDs. | **Deferred registry extension required before D38 reward content lands.** Do not guess/implement D38 effects in this assembly. Current executable content does not reference those IDs, so this is not a current assembly blocker. |
| D39 Palace non-True rewards | Accepted Product authority defines two future Specialists plus automatic knowledge. Frozen v7 does not implement those reward IDs/effects. | Deferred registry/reward-pipeline extension required before D39 content lands. Do not add placeholder effects now. Preserve D23 and normal D28 capacity. |
| D40-D41 advanced ordinary endings | Accepted packets include future Specialists/automatic knowledge. Frozen approved-ID enum will reject unimplemented strong reward IDs. | Deferred registry/reward-pipeline extension required alongside those future ending consumers. Do not broaden the frozen registry speculatively in this assembly. |
| D43 Palace cadence | Current main only has D23 Palace invitation consumer; D43 duty runtime is not integrated here. | Future Palace duty implementation must keep max one structural duty/day even if Work Rhythm raises available Energy. Strong Meta must never convert extra Energy into a second Palace duty. |

## Current-main engine collision details

Producer-base -> current-main `engine.ts` is exactly two additions:

1. import:
`markPalaceCreationQualification` from `./palace.ts`;

2. creation hook:
`markPalaceCreationQualification(s);`

Therefore the frozen producer `engine.ts` must **not** be copied wholesale.

Whole-file copy would delete the current D23 consumer hook.

### Required creation order

Safe merged `finishCreation` order:

1. validate creation completion preconditions;
2. resolve Strong Meta snapshot from permanent selection;
3. freeze `run.strongMetaSnapshot`;
4. project cap-200 only through that snapshot;
5. apply Strong Meta start-day initialization;
6. apply selected Hard Work packages exactly once;
7. write resulting stats/Lust/package-applied state;
8. set `creation.complete=true`;
9. call `markPalaceCreationQualification(s)`;
10. register;
11. run the normal `creationCompleted` resolver boundary.

This preserves:
- Strong Meta snapshot freeze;
- D21-D22 package application;
- D23 qualification based only on permanent 10/10 + active 10/10;
- Day-1 invitation through the existing Palace consumer;
- no permanent Palace unlock.

## Current-main schema reconstruction

Current-main `schema.ts` is byte-identical to the producer dependency base, so there is no semantic same-file collision.

Still, do not copy the old-base whole file.

Reconstruct only these frozen producer hunks:

1. import Strong Meta schemas;
2. add `strongMeta` reward variant to `metaRewardSchema`;
3. add run `strongMetaSnapshot`;
4. add run `strongMetaRuntime`;
5. add permanent `meta.strongMeta`;
6. bump save schema literal 5 -> 6.

This minimizes future drift risk if main moves before assembly.

## Known stale / additional QA expectation repairs

### Required post-Palace repair

Current-main:
`tests/palace-d23-consumer-integration-v8.test.ts`

contains:
`freshSave({hardWorkProgress:all},{progressionStatCap:200})`

That is now stale because the frozen producer intentionally removes the direct new-life cap-200 setup path.

Repair the test only:
- grant ownership of `palace.true.cap-200`;
- select it as a Specialist through the typed Strong Meta state/API;
- finish creation normally;
- continue asserting that Palace qualification itself does not multiply stat values and does not substitute for D23.

Do not restore `NewLifeRuntimeSetup` or the second `freshSave` cap argument merely to keep this test unchanged.

### Producer schema expectations

Use the frozen producer versions of:
- `engine.test.ts`;
- `migration.test.ts`;
- `hard-work-meta-migration-v5.test.ts`;
- `late-career-schema4-compat.test.ts`;
- `hard-work-stat-cap-d24.test.ts`;
- `ending-meta.test.ts`.

Those producer test files have no post-base same-file main changes.

### D31 / natural-route preservation

D31 and its two repaired natural routes landed after the strong-Meta producer fork.

No D31 test should be copied from an older producer branch.

Keep current-main versions of:
- `ordinary-work-seasonal-negative-tradeoffs.test.ts`;
- Assassin/Artist/Guard/Hunter/Merchant/Tavern/Prostitute D31 exact-map tests;
- `tavern-natural-acceptance.test.ts`;
- `undead-farm-natural-acceptance.test.ts`;
- current Assassin natural acceptance.

## Manual-merge files

### Mandatory manual merge

`src/core/engine.ts`

Reason:
- only real same-file current-main production collision;
- must combine frozen Strong Meta runtime with current Palace D23 hook;
- must remove direct new-life cap-200 setup without losing current run-local Palace behavior.

### Additive hunk reconstruction

`src/core/schema.ts`

Reason:
- no current-main content conflict;
- reconstruct the six exact schema hunks rather than replacing the whole old-base file.

### Exact new file

`src/core/strongMeta.ts`

Use frozen producer blob:
`29ae02f1b52784bb6c10112d3b2291c3a746e576`

Do not expand the four-ID runtime registry in this assembly. D38-D41 reward implementations need their own typed extension when their producers exist.

### Test reconstruction

Reconstruct the nine frozen producer test files, then add only the current-main Palace cap-200 test repair described above.

No production content, localization, D31 definitions, New Start+ UI, Palace pack or Palace helper should be taken from the old producer branch.

## Focused QA gate before one full CI

Run all of the following on the future assembly branch.

### Static/build

1. `npm run typecheck`
2. `npm run validate`
3. `npm run build`

### Frozen Strong Meta producer acceptance

4. `tests/strong-meta-registry-v7.test.ts`
5. `tests/strong-meta-d30-runtime-v7.test.ts`
6. `tests/strong-meta-engine-integration-v7.test.ts`
7. `tests/ending-meta.test.ts`
8. `tests/engine.test.ts`
9. `tests/migration.test.ts`
10. `tests/hard-work-meta-migration-v5.test.ts`
11. `tests/late-career-schema4-compat.test.ts`
12. `tests/hard-work-stat-cap-d24.test.ts`

### D21-D24 / New Start+ preservation

13. `tests/all-ten-career-availability-smoke.test.ts`
14. `tests/hard-work-meta-infra-prep.test.ts`
15. `tests/hard-work-package-catalog-runtime.test.ts`
16. `tests/ordinary-hard-work-meta-production.test.ts`
17. `tests/hard-work-palace-meta-smoke.test.ts`
18. `tests/palace-derived-unlock.test.ts`
19. `tests/hard-work-newstart-presentation-v2.test.ts`
20. `tests/hard-work-newstart-ui-v2.test.ts`
21. `tests/ui.test.ts`

### Palace D23 preservation

22. repaired current-main `tests/palace-d23-consumer-integration-v8.test.ts`

Required assertions include:
- no `meta.unlocks['palace']`;
- no `ensurePalaceUnlock(s.meta)`;
- 10/10 permanent + 10/10 active remains the only invitation predicate;
- migrated completed saves receive no retroactive invitation;
- cap-200 selection does not substitute for Palace entry;
- Palace creation hook still runs after package/snapshot freeze.

### D31 / ordinary-work preservation

23. `tests/ordinary-work-seasonal-negative-tradeoffs.test.ts`
24. current D31 exact-map preservation tests for Assassin / Artist-Geisha / Guard / Hunter / Merchant / Tavern / Prostitute
25. `tests/tavern-natural-acceptance.test.ts`
26. `tests/undead-farm-natural-acceptance.test.ts`
27. `tests/assassin-natural-acceptance.test.ts`
28. `tests/prostitute-natural-acceptance.test.ts`

Required static proof:
- current `definitions.json` remains the post-D31 blob;
- exactly 20 ordinary negative effects;
- two per career;
- all `modifyStat -1`;
- zero Lust negatives;
- Strong Meta assembly does not alter D31 targets.

### Night / Energy / poverty preservation

29. `tests/night-flow.test.ts`
30. `tests/lumber-night-acceptance.test.ts`
31. `tests/school-night-study-adapter.test.ts`
32. `tests/school-generic-night-v7-parity.test.ts`
33. `tests/poverty-production-integration-bundle.test.ts`
34. `tests/poverty-pressure-production.test.ts`
35. `tests/poverty-street-reload.test.ts`
36. `tests/resolver.test.ts`
37. `tests/activity.test.ts`

Required ordering proof:
- Work Rhythm bonus is present in Energy maximum on its applied day;
- queued next-day Energy `-1` is applied after the selected modifier and remains a one-Energy relative loss;
- one completed Night advances calendar once;
- reload does not double-apply Work Rhythm or Retainer;
- no Strong Meta path suppresses forced-Night policy.

### Save/loadout snapshot assertions

38. schema-4 -> schema-6 and schema-5 -> schema-6 migration;
39. completed legacy run receives empty legacy snapshot, not inferred ownership;
40. incomplete creation has no snapshot;
41. newly finished creation gets one resolved snapshot;
42. later permanent selection/catalog changes do not rewrite that run snapshot;
43. malformed snapshot/runtime coherence is rejected;
44. ending reward ownership is granted exactly once on `completeEnding`, not on eligibility/commit;
45. owned reward is not auto-selected.

Mine all focused failures before consuming the full-CI lane.

## Safe assembly order

After re-reading fresh main and confirming no new `prototype-m3.2` collision:

1. create a new `chat2/assembly-strong-meta-current-main-*` branch from fresh main;
2. add frozen `strongMeta.ts` exact blob;
3. reconstruct the six schema v6/Strong-Meta hunks manually;
4. manually merge frozen Strong Meta `engine.ts` hunks into current engine;
5. preserve the current Palace import and creation hook;
6. remove the direct new-life cap-200 setup bypass;
7. reconstruct the nine producer tests;
8. repair only the stale current-main Palace cap-200 test to use the typed Specialist path;
9. verify no content/UI/D31/Palace-pack files changed;
10. run the focused gate above;
11. mine all failures;
12. only after focused green open one assembly PR and consume Chat 2's single full-CI slot;
13. if full CI is green, freeze exact SHA and report `READY_FOR_LEADER_MERGE`;
14. do not merge main.

## Blockers / deferred consumers

### Current assembly blockers

**None.**

The requested base is exact-main green (#1145, 1030/1030), and the only executable same-file collision is fully understood.

### Deferred, not blockers for this runtime assembly

1. **Final Strong Meta New Start+ UI**
   - intentionally excluded by the frozen producer contract;
   - current Hard Work UI must remain intact.

2. **Real D19 Secret-Debt bound wiring**
   - current executable has no typed bound state;
   - keep explicit `secretDebtBound` runtime seam;
   - do not invent a flag during this assembly.

3. **D38-D41 accepted future reward IDs/effects**
   - frozen v7 registry intentionally contains only four implemented runtime IDs;
   - future Activity/Palace/advanced-career Specialists and automatic knowledge require a later typed registry/reward-pipeline extension before their content lands;
   - do not add speculative placeholder effects now.

4. **D43 Palace duty runtime**
   - future consumer must enforce one structural duty/day regardless of extra available Energy.

## Verdict

The frozen v7 Strong Meta runtime can be reconstructed safely on fresh post-D31 main without reverting D21-D24, New Start+, Palace D23 or D31.

The assembly must be a selective current-main reconstruction, not a branch merge and not a wholesale old-base `engine.ts` / `schema.ts` copy.

READY_FOR_CURRENT_MAIN_ASSEMBLY
