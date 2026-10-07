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
- [x] D39 live consumers
  - accepted source: `c58ea7e64f1f1b08ca9d5e70384fe41a0d9dff38`
  - run: `37657002423` SUCCESS
  - npm ci / typecheck / validate / build: PASS
  - focused D39 live-consumer bundle: 114/114 PASS
  - evidence: `LEADER1_D39_LIVE_CONSUMER_CLOSURE_RESULT_v91.json`
- [ ] **Strong Meta UI composition — CURRENT ITEM**
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
`c58ea7e64f1f1b08ca9d5e70384fe41a0d9dff38`

Current control-plane tip after assigning Strong Meta UI:
`76b86819ce92781633aa7a83fe9c59b2b86be698`

Current worker status:
- Chat2: Strong Meta UI assigned; requires explicit/manual user resume before calling it active
- Chat3: stands
- Chat4: done / stands
- Chat5: stands
- Chat6: producer work complete / stands

Never say a worker is active only because a pointer exists.

## Current item — Strong Meta UI composition

Frozen implementation authority:
`chat6/strong-meta-ui-closure-v42@fac645878ebd726f50fd1364ac72414796755a2d`

Implementation boundary before v42/v43 code:
`ce6753d482968581b0c2945f4b7c05b41a5d6e58`

Selective implementation delta only:
- `src/ui/app.ts`
- `content/localization.json`
- `tests/strong-meta-player-ui-v42.test.ts`
- `tests/modal-aria-localization-v43.test.ts`
- `tests/strong-meta-ui-localization-v42-v43.test.ts`

Semantic union only. Never wholesale replace current `src/ui/app.ts` or `content/localization.json`.

Stop marker:
`STRONG_META_UI_READY_FOR_D48`

## Locked next authority

D48:
`chat6/palace-d48-media-producer-v48@e0277dc302df178e73184bf1623d0e91e5237b45`

Do not apply D48 before Strong Meta UI is accepted.

## Governance that must not drift

- Leader 1 alone merges production to `main`.
- Chat2 is the sole production assembly/full-CI lane.
- Worker pointers do not activate workers; the user manually launches/resumes them.
- Burn-down decrements only after Leader merge + exact-main CI green.
- Never fabricate green when executable evidence is unavailable.
- Semantic union shared owners; do not wholesale replace newer shared files from old producer branches.
- Preserve Stage1 Secret Debt/D51, Palace v15-v19, Night/Activity, D39 runtime/live consumers, and all already accepted current-main behavior.
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
2. Re-query live `main`, Chat2 assembly branch, and any authority branch needed for the current item.
3. Check the latest accepted source/evidence above.
4. Continue only the first unchecked item.
5. After it passes executable QA, mark it checked and advance exactly one item.
