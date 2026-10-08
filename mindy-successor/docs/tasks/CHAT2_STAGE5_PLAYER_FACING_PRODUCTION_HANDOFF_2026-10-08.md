# Chat2 — Stage 5 final player-facing selective production handoff — 2026-10-08

**Status: STAGE5_PLAYER_FACING_ASSEMBLY_READY_FOR_LEADER — production candidate, NOT QA-accepted.** Leader 1 still owns exact-source runnable gates, 23-case migration closure, full CI, merger, and official exact-main CI. Stage 5 is NOT closed; broad burn-down remains 1.

## Exact GitHub identifiers

- Repository: `Plegyer/Text`.
- Branch: `chat2/stage5-final-player-facing-selective-assembly-v1`.
- Live `main` re-queried and used as branch baseline: `281d938ab8cdf1a5b234834273ce975737e68c7e` (Leader's Stage5 two-key adjudication docs already present). Stage4 accepted release anchor `4e67da063716cde9c41aec3a6ae40cdfc96da962`; Stage4 exact-main run `37787726602` SUCCESS, 1312/1312 — historical Stage4 evidence, **not Stage5**.
- Production JSON assembly commit: `4fe01fcdfbeca80028d0d8837915ef82c6ffacb9`.
- Materialized final-target test fixture/validator and frozen contract commit: `9317175e4f31519126f13358789e725c65c1f78a`.
- Test-only D48 Palace filename-regex correction: `73cf480393f59dcf98e5f656f50282f75c0a3a25`.
- **Exact runnable production/test SHA**: `73cf480393f59dcf98e5f656f50282f75c0a3a25`. The commit adding this report is **docs-only**, has this runnable SHA as parent, and is the later final branch/PR head; use the live PR head SHA rather than assuming the runnable SHA is the final report SHA.
- Draft PR **#301**: https://github.com/Plegyer/Text/pull/301 (base `main`); authoritative handoff is this document on the Chat2 branch. No branch updates are authorized except a new explicit Leader repair assignment.
- Main re-checked before PR: unchanged from `281d938a...`.

## Source authorities and collision policy

- Frozen Chat6 player-facing Golden fixture: `tests/fixtures/final-player-facing-golden-v54.json` at source blob `bc8617be68825543ed7617e9dd5c7d915f6b0e14`, `chat6/final-player-facing-golden-manifest-v54`; 343 required RU/EN rows, 127 presentation slots, 17 forbidden localization rows, 9 retained Tavern compatibility rows, 7 Strong Meta/modal semantic hunks, 110/12 D42 Night.
- Entry audit: `LEADER1_STAGE5_GOLDEN_GAP_AUDIT_2026-10-08.json` (241 exact / 90 missing / 10 predecessor / 2 third, 34 exact / 93 missing presentation). We reclassified every key against live baseline; **no new third-value conflict**.
- Explicit Leader-only semantic ruling: `LEADER1_STAGE5_EXACT_KEY_DISPOSITION_2026-10-08.md`. The only two pre-known third values preserve Stage1 exact-main shipping labels and EN:
  - `unlock.secret-debt.paid-freedom.earned-reserve-match.label`: RU `Сопоставление заработанного резерва`, EN `Earned Reserve Match`.
  - `unlock.secret-debt.takeover.network-retainer.label`: RU `Сетевое содержание`, EN `Network Retainer`.
  **Neither production key was modified.** On an imported copy of the Golden fixture, exactly those two `localization.required[KEY].value.ru` expectations were reconciled (not the frozen original). The test-only `leaderAdjudication` root record cites the Leader decision and immutable source blob. No EN, operation, authority, tag, presentation or other required expectation changed. The cross-contract test reconstructs and checks the exact original frozen Git blob SHA after reversing precisely these two expectation values and deleting the new provenance record.
- Current Activity Network **v36** is final; v17 unconditional predecessor was replaced only at the exact predecessor key. No last-write-wins or wholesale producer snapshot.

## Exact production changes (no other production path)

1. `mindy-successor/prior-work/astra/prototype-m3.2/content/localization.json`:
   - 90 missing Golden RU/EN required keys added; 10 exact-predecessor RU/EN pairs replaced with final Golden values (9 Merchant text rows + Activity Network v36 epilogue).
   - 12 forbidden live locale keys removed: 6 historical Tavern ending presentation `alt/caption` keys, and 6 old `ending.merchant.hard-work.*` / `ending.artist-geisha.hard-work.*` aliases. Other 5 of the Golden's 17 forbidden keys (retired live Lumber/Vitality) were already absent. All 17 absent after assembly.
   - 6 additional missing **smoke-matrix-owned**, RU/EN-complete player-facing Secret Debt keys added, explicitly outside the Golden 343: `ui.secretDebt.statusLabel`, `ui.secretDebt.principalLabel`, `ui.condition.secretDebtStatus`, `secretDebt.status.bound`, `secretDebt.status.paid-freedom`, `secretDebt.status.takeover`. Source: byte-identical frozen Chat6 v60 UI/accessibility smoke matrix. No third values.
   - Final keyed diff versus baseline: **96 added, 10 modified, 12 deleted**; 3,778 total localization keys after assembly; the serializer preserved all `version`, `defaultLocale`, and all untouched values byte-semantically. Both adjudicated Stage1 RU labels retained exactly.
2. `mindy-successor/prior-work/astra/prototype-m3.2/content/presentation.json`:
   - Exactly **93** missing Golden slots added by key. 34 existing matching required slots were preserved; 0 presentation predecessors/third-values replaced; 0 deletions required because retired Lumber and three Tavern live slots were already absent.
   - Final presentation slots: **507** versus 414 baseline. Existing `texts`, `media`, `version`, and all pre-existing slots unchanged.
3. **No changes** to `src/ui/app.ts`, runtime/Save/schema, `definitions.json`, assets, Strong Meta registry, Night, Activity/Camp, D23 Palace, D48 media files or any gameplay ID. Current UI already contains all **7/7** required strong-meta/modal semantic hunks including localized accessible modal names and non-selectable automatic Source Method. Changes are selective content keyed operations, not wholesale overwrite.

## Exact tests/fixtures materialized for Leader's runnable gates

All files below are under `mindy-successor/prior-work/astra/prototype-m3.2/` unless specified:

- Imported `tests/fixtures/final-player-facing-golden-v54.json`: 2 scoped test-only RU expectation deviations + explicit `leaderAdjudication` metadata; all other 341 required localization and all 127 presentation expectations byte-semantically unchanged. Imported unchanged `tests/final-player-facing-golden-manifest-v55.test.ts` (strict final-target opt-in).
- Imported unchanged `tests/fixtures/final-ui-accessibility-smoke-v60.json` (source blob `62f1b14b1f6890b4641c2acb2cd26860c8b99ed8`); imported `tests/final-ui-accessibility-smoke-v61.test.ts` with **three narrow harness clarifications**: derive effective final expectation for only the 2 Leader-adjudicated RU keys while proving frozen matrix text unchanged; interpret four Strong Meta scalar fields (`maxKeystone`, `maxSpecialists`, `noAutoSelect`, `automaticKnowledgeSlotFree`) as invariants rather than nonexistent presentation slot IDs; correct the frozen regex `/^palace-.*\\.svg$/i` to `/^palace-.*\.svg$/i` so the Palace-only asset set is really checked. No relaxed scope, no skipped required UI surface.
- Imported unchanged `tests/fixtures/final-player-facing-cross-contract-v63.json` and adjusted `tests/final-player-facing-cross-contract-v64.test.ts` only to reconstruct **original** frozen v54 Golden SHA from the 2 scoped RU fixture differences; all other original SHA identity assertions for smoke/save/legacy operations/gate stay hard.
- Imported unchanged Chat3 `tests/fixtures/final-save-migration-golden-v57.json` (blob `6ad4ed97ec6058960f90c6b6b80edfda0b9a6279`), `tests/final-save-migration-golden-v57.test.ts`, `tests/final-historical-reconstruction-v55.ts`, `tests/final-historical-fixtures-v55.test.ts`, and historical F1/F2 JSON fixture files. F3/F4/F5 reconstruction recipes remain **authoritative test reconstructions, not genuine user saves**.
- Imported unchanged authoritative `mindy-successor/docs/tasks/CHAT4_D46_D47_LEGACY_GOLDEN_OPERATIONS_v53.json` (blob `17282cf11436d54d49915f44ed84de56a0eebf7c`) and `CHAT4_D46_D47_LEGACY_GOLDEN_GATE_v54.json` (blob `dae0b2bf197f66c1b1fe834e643caf541c6ef4c7`), used by the frozen v64 cross-contract validator. This is **32 mandatory assertions as data**, not 32 executed PASS cases.

**Outstanding migration implementation dependency:** the specifically named `tests/final-save-migration-closure-v21.test.ts` does **NOT EXIST** on accepted Stage4 main or the queried frozen Chat3 Golden/dry-run/release-evidence heads; no test is being invented or counted as executed 23-case closure. The **exact materialization target** is `mindy-successor/prior-work/astra/prototype-m3.2/tests/final-save-migration-closure-v21.test.ts`, implementing all 23 exact case names frozen in the imported `tests/final-save-migration-golden-v57.test.ts` and `tests/fixtures/final-save-migration-golden-v57.json`, using imported F1/F2 data, F3–F5 `final-historical-reconstruction-v55.ts`, the actual current `parseSave`/Save/Strong Meta/Activity/Camp/Palace/Secret Debt runtime, exactly-once checks, case-14 no-fabricated-duties disposition, and save-neutrality boundaries. **Leader 1 must arrange an actual executable 23-case closure gate before final Stage5 acceptance**; the imported Golden v57 contract tests only validate the manifest.

## Audits actually performed (GitHub connector static code, NOT Node executable QA)

- Programmatic baseline-vs-Golden keyed three-way classifier: **241 exact, 90 missing, 10 predecessor, 2 known Leader-adjudicated RU third values**, zero new third values; presentation **34 exact, 93 missing, zero third**.
- Programmatic selective JSON composition and asserted target: **PASS** (source-only), exactly 96/10/12 localization diff; 93/0/0 presentation diff; zero other prod paths; no forbidden or protected historical key deleted beyond contract.
- Frozen Golden release-target keyed comparison after the Leader's two permitted test-only RU adjustments: **343/343 required exact**, **17/17 forbidden absent**, **9/9 Tavern retained**, **127/127 required presentation exact**, 4/4 retired slots absent, **110/110 D42 localization** + **12/12 Night slots**, Activity Network v36, all Golden image alt+caption RU/EN pairs complete.
- Frozen v60 smoke matrix after approved two-key normalization: all localization/presentation expectations exact; 10 surfaces, 6 supplemental Secret Debt copy keys; UI 7/7 required semantic token hunks present, no forbidden modal raw-label tokens found.
- D48 assets from current main directory: exact four Palace SVG assets; 17 Golden approved Palace slots. Source-only preservation audit verifies unchanged `presentation.texts`, `presentation.media`, and localized history. Exact 32 mandatory legacy assertions present in imported gate JSON.
- Static keyed audit **PASS, issues=[]**. No `npm ci`, Node test, typecheck, validate, build, rendered UI test, full check, official exact-main CI or merge was executed by Chat2. **Do not interpret static success as executable green.**

## Leader 1 acceptance sequence — run on exact runnable SHA before updating it

Working directory: `mindy-successor/prior-work/astra/prototype-m3.2`, Node **22.18.0**. These commands are **proposed / NOT RUN**, with zero claimed run IDs.

```sh
npm ci
node --experimental-strip-types --test tests/final-historical-fixtures-v55.test.ts tests/final-save-migration-golden-v57.test.ts
FINAL_PLAYER_FACING_GOLDEN_TARGET=1 node --experimental-strip-types --test tests/final-player-facing-golden-manifest-v55.test.ts
FINAL_UI_ACCESSIBILITY_SMOKE_TARGET=1 node --experimental-strip-types --test tests/final-ui-accessibility-smoke-v61.test.ts
FINAL_PLAYER_FACING_CROSS_CONTRACT_TARGET=1 node --experimental-strip-types --test tests/final-player-facing-cross-contract-v64.test.ts
npm run typecheck
npm run validate
npm run build
# Once separately materialized as a real 23-case closure suite:
node --experimental-strip-types --test tests/final-save-migration-closure-v21.test.ts
# Independently execute all 32 mandatory Chat4 v54 legacy gate assertions.
# Rendered RU then EN UI/focus/ARIA/alt/caption validation against SAME exact candidate SHA.
# Follow with Leader-owned focused adjacency suites, npm run check full CI,
# production merge to main, and official exact-main CI before Stage5 closure.
```

**Focused regression roster (Leader-owned):** imported v55 final-target, v61 UI smoke, v64 cross-contract, v57 Golden 23-case contract, v55 historical fixture tests; current-main `tests/localization.test.ts`, `tests/presentation-source-integrity-v9.test.ts`, `tests/presentation-locale-accessibility-v9.test.ts`, `tests/presentation-ending-parity-v9.test.ts`, `tests/strong-meta-registry-v7.test.ts`, `tests/strong-meta-engine-integration-v7.test.ts`, `tests/secret-debt-full-route-v12.test.ts`, `tests/secret-debt-activity-energy-compat-v20.test.ts`, `tests/night-flow.test.ts`, `tests/activity.test.ts`, `tests/migration.test.ts`, `tests/lumber-stay-retirement-v17.test.ts`, `tests/economy-start-balance-v14.test.ts`, `tests/hard-work-bonus-mapping-v13.test.ts`, plus all newer main tests. If test expectations are stale, classify fixture debt vs product regression without weakening semantics.

## Explicit residual risks / STOP boundaries

- **Not yet executable closure:** 23 true migration cases absent; the static Golden v57 names/fixtures are only a prerequisite. Leader must obtain executable coverage. All final-stage evidence rows (Golden final-target Node, UI smoke Node, cross-contract Node, RU DOM, EN DOM, 23-case closure, 32 legacy assertions) are **NOT RUN** on this candidate.
- No unresolved source-owner third values in the production changes. Two Secret Debt RU conflicts are **resolved by named Leader authority** only; their untouched shipped prod copy and exact two test-only fixture deviations are auditable.
- Stop and return to Leader if a newer owner changes any source, an executable gate reports a genuine product collision, or any solution would alter schema, Save, existing Stage1–4 mechanics, stable IDs, non-Palace D48 surfaces, retirement fence, D42, Activity v36 or Strong Meta state.
- Do not merge, run full CI or decrement the burn-down in Chat2. Leader independently verifies against this exact production/test SHA and owns any QA/merge decision.

**STOP MARKER: `STAGE5_PLAYER_FACING_ASSEMBLY_READY_FOR_LEADER`.**
