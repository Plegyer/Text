# LEADER STATE — ONE NOTEBOOK

This is the single current operational notebook for Leader 1.

Rule: read this file, then re-query live GitHub refs before acting. Exact source SHA + executable evidence outrank prose. Old handoffs/checkpoints remain archive only.

## Human checklist

### Stage 1
- [x] Stage 1 production merged
- [x] exact-main CI green
  - production SHA: `ff1dfe3ec3554eaecf068de655e7473dd3387b63`
  - exact-main evidence: `STAGE1_EXACT_MAIN_CI_RESULT_v67.json`

### Stage 2 — current
- [x] Palace v15 -> v16 -> v18 composition
- [x] Chat4 Palace v18 narrow repair
- [x] Palace v19 prose/presentation
  - accepted source: `7031ebc99af5410a7f515429c3773c2e975f20d2`
  - run: `37644658481` SUCCESS
  - evidence: `LEADER1_PALACE_V19_CLOSURE_RESULT_v82.json`
- [x] D39 runtime semantic union
  - accepted source: `68f762ae6e87083e37badc418f9c903f7617419a`
  - run: `37648362110` SUCCESS
  - typecheck / validate / build / focused D39+Palace: PASS
  - evidence: `LEADER1_D39_RUNTIME_CLOSURE_RESULT_v86.json`
- [ ] **D39 live consumers — CURRENT ITEM**
- [ ] Strong Meta UI composition
- [ ] D48 Palace media overlay
- [ ] Stage 2 focused gate
- [ ] Chat2 Stage 2 full CI
- [ ] Leader production merge to `main`
- [ ] exact-main CI
- [ ] only then decrement burn-down 4 -> 3

### Remaining broad stages
- [ ] Stage 3 — Activity + Camp + D38
- [ ] Stage 4 — D46 + D47 + legacy ending retirement
- [ ] Stage 5 — final save/migration/UI/localization/presentation/regression closure

Current broad burn-down: **4**

## Current assembly lane

Chat2 is the sole production assembly/full-CI lane.

Branch:
`chat2/assembly-palace-d39-d48-current-main-v76`

Accepted production source before current item:
`68f762ae6e87083e37badc418f9c903f7617419a`

Current control-plane tip after assigning D39 live consumers:
`365a150c92376dfbde79fdaf907a07bc8f071563`

Worker status at notebook creation:
- Chat2: task assigned, requires explicit/manual user resume before calling it active
- Chat3: stands
- Chat4: done / stands
- Chat5: stands
- Chat6: stands

Never say a worker is active only because a pointer exists.

## Current item — D39 live consumers

Frozen production authority:
`chat3/d39-consumer-producer-v45@090f36174cbc4ae9db46ae0bdbc9b1e4a2ce1386`

The live Chat3 branch is docs-only ahead at:
`c1c3f0ae9275b6e76c872733df0195bf73366ac1`

Use `090f361...` as production authority.

Selective consumer delta only:
- `content/definitions.json`
- `content/localization.json`
- `content/packs/assassin-relationship.json`
- `content/packs/school-life-content-v1.json`
- `tests/d39-formal-introduction-assassin-v46.test.ts`
- `tests/school-life-content-reload.test.ts`

Do not re-import producer runtime files.

Stop marker:
`D39_LIVE_CONSUMERS_READY_FOR_STRONG_META_UI`

## Locked next authorities

Strong Meta UI:
`chat6/strong-meta-ui-closure-v42@fac645878ebd726f50fd1364ac72414796755a2d`

D48:
`chat6/palace-d48-media-producer-v48@e0277dc302df178e73184bf1623d0e91e5237b45`

Do not apply either before D39 live consumers are accepted.

## Governance that must not drift

- Leader 1 alone merges production to `main`.
- Chat2 is the sole production assembly/full-CI lane.
- Worker pointers do not activate workers; the user manually launches/resumes them.
- Burn-down decrements only after Leader merge + exact-main CI green.
- Never fabricate green when executable evidence is unavailable.
- Semantic union shared owners; do not wholesale replace newer shared files from old producer branches.
- Preserve Stage1 Secret Debt/D51, Palace v15-v19, Night/Activity and all already accepted current-main behavior.
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

## D39 product locks

- Strong Meta: max 1 Keystone, max 2 Specialists
- no Palace extra/free Specialist slot
- current-run Strong Meta snapshot immutable
- Source Method is automatic slot-free knowledge, future-life only
- Formal Introduction is a normal Specialist, 3 uses/run, max 1/relationship
- first live Formal Introduction consumer is `assassin.handler`
- neutral stage `formal-introduced`
- transition `formal-introduction`
- fact `introduced-at-work`
- no trust/conflict/route/career/ending/resource/stat shortcut
- normal Assassin trust remains reachable
- Source Method first consumer is School Arcana/Reason Night Study presentation-only variant
- no D49 macro-lore leakage

## Recovery procedure

1. Read this file.
2. Re-query live `main`, Chat2 assembly branch, and any authority branch needed for the current item.
3. Check the latest accepted source/evidence above.
4. Continue only the first unchecked item.
5. After it passes executable QA, mark it checked and advance exactly one item.
