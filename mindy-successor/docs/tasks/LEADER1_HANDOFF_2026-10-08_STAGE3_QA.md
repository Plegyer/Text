# LEADER 1 HANDOFF — 2026-10-08 — STAGE 3 ACTIVITY + CAMP + D38

Status: **AUTHORITATIVE NEXT-LEADER RECOVERY POINT**

This document supersedes older prose handoffs for active sequencing. Read this file, then `LEADER_STATE.md`, then re-query live GitHub before mutating anything.

## LIVE RECOVERY — 2026-10-08, latest verified state (READ FIRST)

**Stage 3 is NOT merged, NOT closed, and burn-down remains 3.** This block supersedes stale current-action text below; historical v105/v109 details below are context, not the next task.

- Current `main` before this handoff refresh: `767ca946ef7a05a2e1db022bec4c686e1f142fcd` — docs/control-plane only since Stage 2. Re-query live ref before acting.
- Stage 2 is CLOSED: production merge `e38273a09e44e39733eeb74f3e622cc2b6428884`; official exact-main run `37737669459` SUCCESS, 1198/1198.
- Worker Stage 3 production head: `0f7c4b6cbbba55cfc91a854e3d64baf933191a84`; docs-only worker handoff `e4fefda2c3cebc657eaee309c682c0316425e275` on `chat2/assembly-activity-camp-d38-current-main-v103`.
- Post-worker integrated focused-green source: `1a8c739fb66253991009d04ecb0a2e50764f6d5f` (includes narrow `strongMeta.ts` code repair plus focused-fixture repairs over worker production source).
- Focused v108 `37755454777` **SUCCESS** on exact `1a8c739...` (`qa-stage3-focused-v108@28ab56f384c4cbb1ca2ff0072f04975d01ba4104`).
- Full CI v109 `37755758953` on that focused source: **FAILURE, 1277/1287 PASS (10 failures)**. Typecheck, validate, build passed.
- v110 compatibility source `lead/stage3-full-compat-v110@c9b2805d60762221cbd89d9ad438982ea8d28531` differs from focused-green `1a8c739...` by **eight tests only; no production changes**.
- Latest full CI v111 `37760102503`: **COMPLETED FAILURE, 1285/1287 PASS, exactly 2 failing tests**. Wrapper `qa-stage3-full-v111@39bf4292cb1d56355984d277a8e2b3f8652758a4` checks out and guards **exact source `c9b2805...`**. npm ci, typecheck, validate, build passed; full test suite has the two failures listed below.

### Exactly two remaining v111 blockers

1. `tests/chat3-forest-authored-depth-v13.test.ts`, test `C3-133/C3-134/C3-135/C3-136 authored route and challenge pools are bilingual and use existing IDs`, at line ~73. Test still asserts whole `activity.adapterConfig` object equals four old fields. Actual schema adds canonical `fieldTimeSegments:6` and `advanceFieldTimeCost:1`. Fix only this stale test expectation (include/assert the two locked FT fields and preserve existing checks); do not remove Field Time from production.
2. `tests/merchant-production-presentation-reachability-c2-192.test.ts`, test `C2-192 Merchant registry preserves 68 frozen surfaces plus four Stage3 surfaces and stays static-safe`, at line ~184. New `relationship/merchant-supplier/trade-corridor-production-supplier-network/default` resolves `selected.source='catalog'`, but test currently universally expects `override-static` (except three D40 endings). `content/presentation.json` has **no explicit slot override** for that new Stage3 event. Inspect `resolvePresentation` to confirm usable project-owned static catalog fallback (`textOnly=false`, existing media asset, correct authored slot) and keep the original 68 frozen overrides strict. If fallback is valid, add **narrow ID-scoped** catalog expectation for this new D36 surface; do NOT relax every Merchant surface or add a new visual without authority. If fallback is invalid, treat as an actual production blocker and diagnose before repair.

### FIRST NEXT-LEADER ACTION (no worker needed)

- Read this block, then `LEADER_STATE.md`; re-query GitHub `main`, `lead/stage3-full-compat-v110`, Stage3 worker branch and Actions run `37760102503`.
- On a fresh Leader-only candidate based **exactly** on `c9b2805d60762221cbd89d9ad438982ea8d28531`, make only the two verified compatibility corrections; do not modify the original frozen worker handoff.
- Run the two affected tests (and typecheck/validate/build) on the new exact SHA, then full `npm run check` via one exact-source Actions gate. Avoid chains of duplicated diagnostic jobs. Preserve all product assertions.
- Only after full CI GREEN, merge that exact tested production+test candidate into the **latest** `main`, preserving docs-only `main` handoff/notebook updates; require the official exact-main CI green. Only then mark Stage 3 closed and reduce burn-down **3 -> 2**.
- All worker chats are parked. Chat2 is production assembly only; Leader owns QA/full CI/test-only fixes/merge/exact-main. User manually activates workers. Do not delegate QA-only steps.

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

## 6. Historical v105 focused gate (CLOSED — NOT CURRENT)

The original `37753332403` v105 run failed on a synthetic Activity option fixture's required `tags:[]` and `carriedResults:[]`. That blocker was repaired during subsequent Leader QA.

Focused v108 `37755454777` later PASSED on exact source `1a8c739fb66253991009d04ecb0a2e50764f6d5f`.

**Current blocker is the two remaining full-suite failures in v111 above**, not the old v105 typecheck or focused gate.

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

1. Start at **LIVE RECOVERY** at the top of this document, then `LEADER_STATE.md`.
2. Re-query live `main` and relevant candidate branches; never trust an old SHA as current automatically.
3. Read v111 full CI log `37760102503`: **1285/1287 PASS; only Forest adapterConfig and Merchant supplier-network presentation tests fail**.
4. Confirm Merchant's catalog fallback is a real, valid asset before test-only changes. Fix only the two narrow assertions.
5. Recheck these two tests, then exact-source full CI `npm run check`.
6. If green, merge the exact tested source into latest `main`, preserve documentation, and require official exact-main CI green.
7. Do not wake a worker for QA-only work. Burn-down remains 3 until exact-main green.
