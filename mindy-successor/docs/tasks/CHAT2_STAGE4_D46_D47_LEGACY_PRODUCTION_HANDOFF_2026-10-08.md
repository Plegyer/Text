# Chat 2 — Stage 4 D46 + D47 + Legacy Retirement production handoff

Status: **STAGE4_D46_D47_LEGACY_PRODUCTION_READY_FOR_LEADER — ASSEMBLY CANDIDATE, NOT QA-ACCEPTED**

Owner: Chat 2 / production assembly. Leader 1 owns focused regression, exact-source full CI, production merge to latest `main`, and official exact-main CI.

## Exact integration basis

- Live `main` re-queried on user activation: `8c376be749579077663e46e719747774c55b64be`.
- New Stage 4 branch: `chat2/stage4-d46-d47-legacy-assembly-v1`. **Not** based on archived Stage 3 Chat2 branch.
- Exact integrated **production/test source** before this handoff document: `f34b9585a7816d5b1235e1683160ce5423b767ba`.
- Authoritative operations: `CHAT4_D46_D47_LEGACY_GOLDEN_OPERATIONS_v53.json` and `CHAT4_D46_D47_LEGACY_GOLDEN_GATE_v54.json`.
- Frozen source references: D46 `a0c5f855b63d3bb85556f5b2780aaaabb58fbced`, D47 `252dc26c514e24f4ab0f0cc0da7694254282e4c4`, legacy verified `39912e7435c3707d98f96fe550d697c20ac0bedb`.

## Production semantic operations applied

1. D46: only fresh/new-life `character.lust` default `1 → 5`; migrated/stored Lust is not rewritten.
2. D46: the **ten exact** ordinary `*.shift` action wage bases changed: `lumber.shift = 35`, other nine `= 37`; existing stat weights retained.
3. D46: `ORDINARY_SHIFT_WAGE_CAP = 120` and `ordinaryShiftWage(action,preShiftState)` helper; call before spending/effects/seasonal changes. Only ten canonical ordinary shifts enter this path. Other actions (including Palace and Secret Debt) retain their original calculations.
4. D47: selection policy stays `arbitrary-earned-subset`, none/all allowed, whole earned package only. Exact ten package definitions retained, with four selective modifications: Satyr Maid `grooming → charm`, Tavern `sociability → wits`, Merchant `wits/charm -> reason/sociability`, Prostitute separate `lustBonus 3 → 5`. Total 75 progression points, Lust outside twelve progression stats. Existing exactly-once application at `finishCreation` and Strong Meta separation preserved.
5. Ten ordinary Hard Work endings still require `completed_shifts >= 50`, earning `hardWork:<career>` once. D23 Palace full-ten-package identity logic unchanged.
6. Legacy: removed only live ending `lumber-stay` and its live `vitality` reward acquisition. Added **exact** verified `src/core/lumberStayLegacy.ts` blob `e9484f9b6eaf834b656b3db9abfbc94c4a19fd58`.
7. Legacy: merged normalization into current `defaultMeta`, current schema-6 `parseSave` migration after D41 processing, and current profile merge. Historical evidence from completed `lumber-stay`, generic `vitality` or existing legacy perk dedupes to one `legacy.lumber-stay.vitality`. Generic `vitality` is removed from active unlock ownership; historical completed/run-result/transaction evidence is preserved. Eligible-only is dropped; committed-but-unfinished cancelled; ended pre-RunResult receives deterministic compatibility proof, no replay. Exactly +1 legacy Energy, once, additive to existing genuine sources.
8. Legacy display-only UI: historical completed card and inheritance label; archived endings render with neutral `job/lumber/result/default` fallback. No live retired-ending accept action.
9. Exact locale delta: delete only the five live keys `ending.lumber-stay.title`, `ending.lumber-stay.description`, `unlock.vitality.label`, `presentation.static.ending.lumber-stay.alt`, `presentation.static.ending.lumber-stay.caption`. Add only five historic keys `legacy.ending.lumber-stay.title`, `legacy.ending.lumber-stay.description`, `legacy.perk.lumber-stay-vitality.label`, `ui.legacy.historicalTitle`, `ui.ending.state.historical`. All other 3,689 localization keys unchanged.
10. Exact presentation delta: delete only slot `ending/lumber-stay`; synchronize its three obsolete entries in v9 presentation hardening source/ending parity manifest. All other slots unchanged.

## Changed files

Production:
- `content/definitions.json`
- `content/hard-work-package-catalog-v1.fixture.json`
- `content/localization.json`
- `content/presentation.json`
- `content/presentation-drafts/presentation-hardening-v9-manifest-v1.json`
- `src/core/engine.ts`
- `src/core/lumberStayLegacy.ts` (**new exact authority blob**)
- `src/ui/app.ts`

Focused tests:
- `tests/economy-start-balance-v14.test.ts` (new frozen D46 focused coverage)
- `tests/hard-work-bonus-mapping-v13.test.ts` (new frozen D47 focused coverage)
- `tests/lumber-stay-retirement-v17.test.ts` (new frozen verified retirement coverage)
- `tests/ordinary-hard-work-meta-production.test.ts` (only two D46-authoritative Lust 1 → 5 expectations; test invariants not weakened)

No `schema.ts`, `content.ts`, Strong Meta, Palace, Secret Debt, Night, Activity or other runtime files replaced from historical snapshots.

## ID / collision audit

- `definitions.json`: **zero** added/deleted action IDs, career IDs, quest IDs, relationship IDs, Activity IDs, lodging IDs, night-choice IDs. Only deleted ending ID `lumber-stay`, no added ending IDs.
- Remaining 52 live total ending IDs; exactly **40** canonical ordinary ending IDs, 10 Hard Work ending IDs.
- D46 wages 35/37 for exact ten IDs; untouched wage weights and all non-ordinary wage bases.
- D47 10 package identities, 75 progression-stat points and separate Prostitute Lust +5. Only the four named career packages changed relative to live base.
- `presentation.json`: exact one deleted slot, no modified/added other slot.
- `localization.json`: exactly five deletions + five historic additions, no edits to other rows.
- v9 manifest: exactly three obsolete lumber references removed.
- No third-value collisions observed on manifest-owned scalars. Current-main third values outside manifest remain authoritative/preserved.
- Source-only static checks completed; **not an executable gate**.

## Focused runnable QA roster for Leader 1

Run at exact handoff head: `npm ci`, `npm run typecheck`, `npm run validate`, `npm run build`, then focused:

**D46/D47:** `tests/economy-start-balance-v14.test.ts`, `tests/hard-work-bonus-mapping-v13.test.ts`, `tests/ordinary-hard-work-meta-production.test.ts`, `tests/ordinary-hard-work-lifecycle-parity.test.ts`, `tests/lumber-hard-work-invariant.test.ts`, `tests/hard-work-stat-cap-d24.test.ts`.

**Migration / ending:** `tests/hard-work-meta-migration-v5.test.ts`, `tests/migration.test.ts`, `tests/ending-meta.test.ts`, `tests/qa-exactly-once-reload.test.ts`, `tests/qa-one-save-state-drift-sentinel-v2.test.ts`.

**Legacy:** `tests/lumber-stay-retirement-v17.test.ts`, `tests/presentation-ending-parity-v9.test.ts`, `tests/advanced-endings-tranche-a-v11.test.ts`, `tests/d40-advanced-endings-tranche-b-v11.test.ts`.

**Strong Meta / Palace:** `tests/strong-meta-registry-v7.test.ts`, `tests/strong-meta-engine-integration-v7.test.ts`, `tests/hard-work-palace-meta-smoke.test.ts`, `tests/palace-d23-consumer-integration-v8.test.ts`.

**Secret Debt / Activity / Night:** `tests/secret-debt-full-route-v12.test.ts`, `tests/secret-debt-activity-energy-compat-v20.test.ts`, `tests/activity.test.ts`, `tests/school-night-study-adapter.test.ts`, `tests/night-flow.test.ts`, `tests/night-content-gap-v10.test.ts`, `tests/shared-night-ui-localization-production-v1.test.ts`.

**Localization / presentation:** `tests/localization.test.ts`, `tests/presentation-source-integrity-v9.test.ts`, `tests/presentation-locale-accessibility-v9.test.ts`, `tests/presentation-ending-parity-v9.test.ts`.

Run any newer current-main authoritative tests in addition to the v54 roster, and evaluate all **32** v54 assertions on exact SHA. If regressions appear, distinguish stale pre-D46 test expectations from product blockers; do not weaken invariants.

## Verification and limits

- **Static manifest / ID audits:** performed, no unowned deletions found in the audited ID sets.
- **Executable npm and focused test status:** **NOT RUN BY CHAT2** (connector lacks command runner). Zero test pass claims. This is **not** Stage 4 QA closure.
- **Full CI and official exact-main CI:** **NOT RUN** by Chat2; owned by Leader 1.
- **Merge to main:** **NOT DONE**.
- This candidate is submitted only for Leader 1's focused regression and merge decision.

**Stop marker: `STAGE4_D46_D47_LEGACY_PRODUCTION_READY_FOR_LEADER`.**
