# LEADER 1 HANDOFF — 2026-10-08 — STAGE 3 ACTIVITY + CAMP + D38

Status: **AUTHORITATIVE NEXT-LEADER RECOVERY POINT**

This document supersedes older prose handoffs for active sequencing. Read this file, then `LEADER_STATE.md`, then re-query live GitHub before mutating anything.

## 1. Current project state

Broad burn-down: **3**

Closed:
- Stage 1
- Stage 2

Current:
- **Stage 3 — Activity + Camp + D38**

Remaining after Stage 3:
- Stage 4 — D46 + D47 + legacy ending retirement
- Stage 5 — final save/migration/UI/localization/presentation/regression closure

Current `main` at handoff creation:
`38e5d949f606fdc0c3060930c90457eeabfa7d5f`

Stage 2 production merge:
`e38273a09e44e39733eeb74f3e622cc2b6428884`

Stage 2 official exact-main run:
`37737669459` — SUCCESS — 1198/1198 tests PASS.

Do not reopen Stage 2 unless Stage 3 reveals a concrete regression.

## 2. Operating model — important process correction

Leader 1 owns:
- sequencing;
- static acceptance review;
- focused QA;
- full CI;
- exact-main CI;
- test-only compatibility repairs when product semantics do not change;
- the only production merge to `main`.

Workers receive **production work only**.

Do not send Chat2/other workers QA-only gates. Previous repeated handoffs for QA were inefficient and were explicitly corrected.

A worker pointer does not mean the worker is active. The user manually launches/resumes workers.

Current worker status at handoff:
- Chat2/Stage3 production assembly: finished / stands
- Chat3: stands
- Chat4: stands
- Chat5: stands
- Chat6: stands

## 3. Stage 3 production assembly — completed

Production assembly branch:
`chat2/assembly-activity-camp-d38-current-main-v103`

Base:
`38e5d949f606fdc0c3060930c90457eeabfa7d5f`

Exact production assembly head:
`0f7c4b6cbbba55cfc91a854e3d64baf933191a84`

Docs-only handoff branch head:
`e4fefda2c3cebc657eaee309c682c0316425e275`

Worker handoff:
`mindy-successor/docs/tasks/CHAT2_STAGE3_ACTIVITY_CAMP_D38_PRODUCTION_HANDOFF_v104.md`

Stop marker:
`STAGE3_ACTIVITY_CAMP_D38_PRODUCTION_READY_FOR_LEADER`

Do not use the docs-only head as the QA/product source. The exact product source is `0f7c4b6...`.

## 4. Stage 3 production scope assembled

The product source contains:
- four-region D36 Activity baseline:
  - `lumber.forest`
  - `trade.corridor`
  - `anomalous.reach`
  - `restricted.sites`
- Camp persistence/runtime union;
- D38 ending family;
- D38 Strong Meta specialists/runtime helpers;
- D38 authored tags;
- D38 localization/presentation;
- carried focused producer tests.

Shared semantic-union files changed:
- `content/definitions.json`
- `content/localization.json`
- `content/presentation.json`
- `src/core/content.ts`
- `src/core/engine.ts`
- `src/core/schema.ts`
- `src/core/strongMeta.ts`
- `src/ui/app.ts`

Direct-add files include:
- four Activity region packs;
- `src/core/activityD38.ts`;
- D38 fixtures;
- D38 missing-assets manifest;
- Activity/Camp/D38 focused tests.

## 5. Static acceptance already performed by previous Leader

Do not repeat this work unless source changes.

Against current `main`:
- no existing definition IDs were lost;
- no localization keys were lost;
- no presentation slots were lost;
- candidate is a semantic superset by IDs;
- exactly three D38 ending presentation slots are new.

Strong Meta on exact production source:
- registry version: **`strong-meta-v5`**
- contract remains 1;
- capacity remains **1 Keystone / 2 Specialists**
- D39 Palace reward IDs remain present;
- D38 IDs present:
  - `specialist.activity.surveyors-atlas`
  - `specialist.activity.field-archive`
  - `specialist.activity.contact-network`

Activity locks statically confirmed:
- all four regions entry Energy = 2;
- Field Time baseline = 6;
- all four remain `same_day`;
- no Camp policy was added to those v15 regions.

Authored D38 mappings statically confirmed:
- survey tag appears on the four expected survey options;
- contact tag appears on Trade/Anomalous/Restricted expected contact options, Forest none;
- secure eligibility is carried-result metadata with tag `activity-secure-eligible`;
- Forest secure result intentionally none.

D38 ending bindings statically confirmed:
- Pathfinder -> `specialist.activity.surveyors-atlas`
- Preservation -> `specialist.activity.field-archive`
- Network -> `specialist.activity.contact-network`
- canonical `metaRewards` use `kind:'strongMeta'`.

## 6. Stage 3 focused gate — CURRENT BLOCKER

Leader QA branch:
`qa-stage3-focused-v105`

Workflow wrapper commit:
`dcfe354b7aaec69cb263abe986ca4eedb4e1eb75`

Exact product source guarded by workflow:
`0f7c4b6cbbba55cfc91a854e3d64baf933191a84`

Run:
`37753332403`

Result:
**FAILURE at typecheck**

Passed before failure:
- checkout
- exact SHA guard
- setup Node
- npm ci

Failed:
- `npm run typecheck`

Skipped:
- validate
- build
- focused tests

Exact TypeScript error:
`tests/item-capability-activity-closure.test.ts(124,23) TS2345`

The manually inserted test fixture Activity option is missing the now-required fields:
- `tags`
- `carriedResults`

Relevant fixture currently pushes:
```ts
forest.options.push({
  id:'forest.route.unknown-capability',
  label:'Impossible route',
  category:'route',
  conditions:[{kind:'itemCapability',capability:'not_declared_anywhere',present:true}],
  progressDelta:0,
  enduranceCost:0,
  effects:[],
  setRoute:'unknown-route'
  ...
})
```

### First action for new Leader 1

Treat this as a **test-only compatibility repair unless inspection proves otherwise**.

Expected narrow repair:
- add `tags:[]`
- add `carriedResults:[]`
to that synthetic option fixture only.

Do not change production schema to make the fields optional merely to satisfy this fixture.

After the test-only repair:
1. create a new exact-source QA run;
2. run `npm ci`;
3. run typecheck;
4. validate;
5. build;
6. the Stage3 focused suite.

If new failures appear, diagnose exact failures before any broader changes.

## 7. Stage 3 focused suite used by previous Leader

The v105 focused gate included:
- `tests/activity.test.ts`
- `tests/item-capability-activity-closure.test.ts`
- Forest v12
- Trade v13
- Anomalous v14
- Restricted v15
- Camp v17
- D38 ending family v16
- D38 content/presentation v17
- D38 Strong Meta v26
- Activity reload
- migration
- NightFlow
- Secret Debt full route
- Secret Debt Activity/Energy compatibility
- Secret Debt separation
- Strong Meta registry/integration/runtime/UI
- ending-meta
- Palace D23 adjacency
- one-save-state drift sentinel

Do not shrink this suite just to get green.

## 8. What happens after focused green

Leader 1 should continue directly:

1. focused Stage 3 gate green;
2. full CI on exact accepted Stage 3 source using `npm run check`;
3. only test-only compatibility fixes may be applied directly if they do not alter product semantics;
4. if full CI exposes a real production defect, repair narrowly (Leader may do it if trivial and clearly localized; otherwise assign one production repair worker task);
5. once full CI is green, merge the exact verified product source to `main`;
6. use the official main-push workflow as exact-main evidence when available;
7. only after exact-main green:
   - mark Stage 3 closed;
   - decrement burn-down **3 -> 2**;
   - advance to Stage 4.

## 9. Frozen Stage 3 authorities

Activity cumulative v15:
`ab378d68765f7c9bbff43abf3b4b41e24df82e01`

Camp executable-green cumulative repair:
`efde0a38bf71a8946194402a9fc47abb168f2aff`

D38 ending mechanics:
`3cf69d7cb3df1a58d68908159d0acc14736435c4`

D38 final content/presentation:
`df9ef5c3d04cfd8eb582c24838d971854e984218`

D38 reachability:
`7ae7a9b273f1806ac04b566c318896783bab6595`

D38 Strong Meta producer:
`7770b6bf7f930e8af17331e8b22613523bb2e768`

D38 authored tags:
`3ab2800a7d586b5e37600c3ff11d1129ff823df0`

Preassembly authority:
`chat5/activity-camp-d38-preassembly-v43@4ce94aa27d4ca4d3b7c26279e4ce90ec50dfbac6`

Final integration guidance:
`chat3/activity-final-assembly-packet-v28@742661162991108d22138eec495657b0dcdece0f`

## 10. Stage 3 product locks

Activity:
- entry cost exactly 2 daily Energy, once;
- Field Time baseline 6;
- reload never repays entry cost;
- no universal Activity XP;
- Activity Field Time != global Energy;
- legacy hunter/assassin activities remain separate.

Camp:
- local to active Activity;
- campStateVersion 1;
- max 2 field nights;
- exactly one CalendarAdvance/night;
- exactly one Field Time refresh/night;
- never refresh daily Energy;
- cannot bypass forced Secret Debt Night;
- current four v15 regions remain same_day.

D38 endings:
- exactly three canonical ending IDs;
- eligibility non-terminal;
- explicit commit required;
- completeEnding grants exactly-once permanent ownership;
- no same-life activation.

Strong Meta:
- current Stage3 registry must remain v5;
- 1 Keystone / 2 Specialists;
- no free/third Specialist slot;
- D39 and D38 rewards coexist;
- current-run snapshot immutable.

D51:
- floor-to-2 remains only for Street -1 + bound Secret Debt Night -1 pair;
- Camp CalendarAdvance must still trigger Secret Debt StartDay activation.

## 11. Stage 2 locks that must survive

Do not regress:
- Palace v15-v19;
- D39 runtime/live consumers;
- Strong Meta UI;
- D48 media;
- Secret Debt/D51;
- schema6;
- NightFlow;
- ending transaction lifecycle.

Stage 2 exact-main proof:
- main production SHA `e38273a09e44e39733eeb74f3e622cc2b6428884`
- run `37737669459` SUCCESS
- 1198/1198 PASS.

## 12. Runner / CI notes

Self-hosted Windows runner works.

Typical project Node:
`22.18.0`

Runner warnings that are non-fatal:
- GitHub Actions Node 20 deprecation warning for checkout/setup-node v4;
- npm cache save may warn if `gzip` is unavailable.

Do not interpret those warnings as product failures.

## 13. Recovery procedure for the next Leader

1. Read this document.
2. Read `LEADER_STATE.md`.
3. Re-query live `main`.
4. Re-query Stage3 production branch.
5. Verify whether someone already repaired the fixture after this handoff.
6. Continue from the exact first unresolved item: **Stage 3 focused QA typecheck repair**.
7. Do not wake a worker for QA-only work.
8. Do not decrement burn-down until exact-main CI is green.
