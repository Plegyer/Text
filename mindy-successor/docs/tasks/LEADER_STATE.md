# LEADER STATE — ONE NOTEBOOK

This is the single current operational notebook for Leader 1.

Rule: read this file, then re-query live GitHub refs before acting. Exact source SHA + executable evidence outrank prose. Old handoffs/checkpoints remain archive only.

## Live Stage 3 execution update — 2026-10-08 (latest)

- **Stage 3 not closed. Broad burn-down remains 3.** Stage1 and Stage2 remain CLOSED.
- Current `main` before this doc update: `767ca946ef7a05a2e1db022bec4c686e1f142fcd`; docs-only/control-plane change since Stage2. Re-query.
- Worker production source `0f7c4b6cbbba55cfc91a854e3d64baf933191a84`, handoff `e4fefda2c3cebc657eaee309c682c0316425e275`.
- Focused-green candidate `1a8c739fb66253991009d04ecb0a2e50764f6d5f`; focused v108 `37755454777` SUCCESS.
- Full-suite compatibility candidate `lead/stage3-full-compat-v110@c9b2805d60762221cbd89d9ad438982ea8d28531` changes only eight test files relative to focused-green source.
- **Latest full CI v111 `37760102503`: COMPLETED FAILURE, 1285/1287 PASS.** Exact source guarded: `c9b2805...`; typecheck/validate/build PASS.
- Two remaining failures: stale Forest `adapterConfig` deep-equality (missing Field Time fields), Merchant Stage3 supplier-network resolution `catalog` vs generalized `override-static` expectation. See authoritative `LEADER1_HANDOFF_2026-10-08_STAGE3_QA.md` LIVE RECOVERY.
- **Next action:** Leader-only narrow test compatibility inspection/fix, then two focused tests, one exact-source full CI, Leader merge, official exact-main CI. Do not assign QA to Chat2. No merge or burn-down decrement before full/exact-main green.
- All workers parked.

## Human checklist

### Stage 1
- [x] Stage 1 production merged
- [x] exact-main CI green
  - production SHA: `ff1dfe3ec3554eaecf068de655e7473dd3387b63`
  - exact-main evidence: `STAGE1_EXACT_MAIN_CI_RESULT_v67.json`

### Stage 2 — CLOSED
- [x] Palace v15 -> v16 -> v18 composition
- [x] Chat4 Palace v18 narrow repair
- [x] Palace v19 prose/presentation
  - accepted source: `7031ebc99af5410a7f515429c3773c2e975f20d2`
  - run: `37644658481` SUCCESS
- [x] D39 runtime semantic union
  - accepted source: `68f762ae6e87083e37badc418f9c903f7617419a`
  - run: `37648362110` SUCCESS
- [x] D39 live consumers
  - accepted source: `c58ea7e64f1f1b08ca9d5e70384fe41a0d9dff38`
  - run: `37657002423` SUCCESS
- [x] Strong Meta UI composition
  - accepted source: `63081de1641362b7b2b06202b7a09e554caa8ecf`
  - run: `37658731567` SUCCESS
- [x] D48 Palace media overlay
  - accepted source: `05a9eb5b9b7293a029ce1d8962207aef3601d145`
  - run: `37734288135` SUCCESS
- [x] Stage 2 focused gate
  - exact source: `05a9eb5b9b7293a029ce1d8962207aef3601d145`
  - run: `37734972938` SUCCESS
  - focused tests: 194/194 PASS
  - evidence: `LEADER1_STAGE2_FOCUSED_GATE_RESULT_v97.json`
- [x] Stage 2 full CI
  - exact source: `3ec5d3eb4254a2723982825fce3f00d03e770d63`
  - run: `37736593878` SUCCESS
  - `npm run check`: PASS
  - evidence: `LEADER1_STAGE2_FULL_CI_RESULT_v101.json`
- [x] Leader production merge to `main`
  - production merge SHA: `e38273a09e44e39733eeb74f3e622cc2b6428884`
  - message: `merge(stage2): Palace, D39, Strong Meta UI, and D48`
- [x] exact-main CI
  - exact main SHA: `e38273a09e44e39733eeb74f3e622cc2b6428884`
  - official main push run: `37737669459` SUCCESS
  - full tests: 1198/1198 PASS
  - evidence: `LEADER1_STAGE2_EXACT_MAIN_CI_RESULT_v102.json`
- [x] broad burn-down decremented 4 -> 3

### Stage 3 — CURRENT
- [ ] **Activity + Camp + D38 — CURRENT ITEM**

### Remaining broad stages
- [ ] Stage 4 — D46 + D47 + legacy ending retirement
- [ ] Stage 5 — final save/migration/UI/localization/presentation/regression closure

Current broad burn-down: **3**

## Current execution model

Leader 1:
- owns sequencing and acceptance;
- runs focused QA, full CI, and exact-main CI directly;
- applies test-only compatibility fixes when they do not change product semantics;
- alone merges production to `main`.

Chat2:
- production assembly/integration lane only;
- receives work only when actual production changes are needed;
- is not used as a pass-through for QA-only gates;
- a pointer does not activate it; user manually launches/resumes it.

Current worker status:
- Chat2: stands
- Chat3: stands
- Chat4: stands
- Chat5: stands
- Chat6: stands

## Current item — Stage 3 Activity + Camp + D38

Production assembly complete. Worker source `0f7c4b6cbbba55cfc91a854e3d64baf933191a84`; docs-only worker handoff `e4fefda2c3cebc657eaee309c682c0316425e275`.

Focused-green source `1a8c739fb66253991009d04ecb0a2e50764f6d5f`, run `37755454777` SUCCESS.

Current full-suite candidate `c9b2805d60762221cbd89d9ad438982ea8d28531`, v111 run `37760102503` FAILURE 1285/1287. Two remaining test compatibility blockers detailed in `LEADER1_HANDOFF_2026-10-08_STAGE3_QA.md`.

Current first action: narrow Forest adapterConfig and Merchant supplier-network fallback investigation/test repair. Then exact-source full CI; only after green merge and exact-main CI.

## Governance that must not drift

- Leader 1 alone merges production to `main`.
- QA-only work stays with Leader 1.
- Workers receive production work only when production changes are actually required.
- Burn-down decrements only after Leader merge + exact-main CI green.
- Never fabricate green when executable evidence is unavailable.
- Semantic union shared owners; do not wholesale replace newer shared files from old producer branches.
- Preserve Stage1 Secret Debt/D51, Stage2 Palace v15-v19/D39/Strong Meta UI/D48, Night/Activity, and all already accepted current-main behavior.
- Do not wake peripheral workers unless the current critical-path step has a concrete need.

## Palace product locks

- D23 entry: all 10 ordinary Hard Work permanent + all 10 current-life packages
- explicit invitation acceptance
- exactly 15 structural duties
- max 1 structural duty/day, cost 1 Energy
- support max 1/day
- Prince gate: all 12 progression stats >=91, Lust excluded
- confrontation: 0 money / 0 Energy, deterministic 4 phases, retryable, no RNG
- only phase 4 writes `palace.prince-defeated`
- no automatic ending
- Return Home is explicit
- successor world is real
- original displacement cause remains unknown

## D39 / Strong Meta product locks

- Strong Meta: max 1 Keystone, max 2 Specialists
- no Palace extra/free Specialist slot
- current-run Strong Meta snapshot immutable
- Source Method is automatic slot-free knowledge, future-life only
- Source Method must never be selectable in UI
- ordinary Hard Work remains outside Strong Meta slots
- owned/imported Strong Meta rewards never auto-select
- `palace.true.cap-200` remains a normal Specialist
- Formal Introduction is a normal Specialist, 3 uses/run, max 1/relationship
- first live Formal Introduction consumer is `assassin.handler`
- neutral stage `formal-introduced`
- transition `formal-introduction`
- fact `introduced-at-work`
- no trust/conflict/route/career/ending/resource/stat shortcut
- normal Assassin trust remains reachable from both `introduced` and `formal-introduced`
- Source Method first consumer is School Arcana/Reason Night Study presentation-only variant
- no D49 macro-lore leakage

## Recovery procedure

1. Read this file.
2. Re-query live `main` and authority refs for the first unchecked item.
3. Check the latest accepted source/evidence above.
4. Continue only the first unchecked item.
5. After executable QA passes, mark it checked and advance exactly one item.
