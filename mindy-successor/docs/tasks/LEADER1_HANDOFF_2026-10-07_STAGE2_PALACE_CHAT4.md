# LEADER 1 — AUTHORITATIVE HANDOFF — 2026-10-07 — STAGE 2 PALACE / CHAT4

Status: **AUTHORITATIVE NEXT-LEADER RECOVERY POINT**

This file supersedes older active-status prose where it conflicts.
Always re-query live GitHub before mutating branches or claiming worker activity.

## Immediate bootstrap

Read this file first.

Then read:
- `USER_DECISIONS_LOCKED_v1.md`
- `CHAT2_PALACE_V18_FROZEN_HEAD_v72.md`
- `CHAT4_STAGE2_PALACE_V18_NARROW_REPAIR_v73.md`
- `CHAT2_PALACE_LOCALIZATION_UNION_v70.json`
- `CHAT2_PALACE_SHARED_OWNER_COLLISION_MAP_v71.json`

Do not reconstruct Stage 1 again.

## Governance / operating rules

- Leader 1 alone may merge production to `main`.
- Chat 2 is the sole production assembly/full-CI lane.
- GitHub pointer/task updates do **not** activate worker chats.
- User must manually message a worker chat to start it.
- Assigned but not manually launched = **стоит**.
- Do not call a worker `работает` unless the user says the window is active.
- Burn-down decreases only after Leader merge + exact-main CI success.

## Broad burn-down

**4 stages remain.**

1. Stage 2 — Palace + D39 + D48 / Strong Meta UI composition
2. Stage 3 — Activity + Camp + D38
3. Stage 4 — D46 + D47 + legacy ending retirement
4. Stage 5 — final save/migration/UI/localization/presentation/regression closure

## Stage 1 is CLOSED

Stage 1 scope:
- Secret Debt v12
- D51 compatibility
- poverty/Secret Debt regression adaptation
- exact localization recovery

Production tree:
`ff1dfe3ec3554eaecf068de655e7473dd3387b63`

Evidence:
- targeted v63 PASS
- focused v64 PASS
- full CI v65 PASS
- exact-main CI v67 PASS

Exact-main evidence:
`mindy-successor/docs/tasks/STAGE1_EXACT_MAIN_CI_RESULT_v67.json`

Do not reopen Stage 1 unless new executable evidence proves a regression.

## Current main

At handoff time:
`main@09b4c176d2e4d08d8e1d8bcec1c1d10fc7326939`

This is a Leader docs/control-plane head.
The last closed Stage-1 production tree remains `ff1dfe3...`.

Re-query main before acting.

## Stage 2 locked order

1. Palace v15 -> v16 -> v18 cumulative composition on current Stage-1 base
2. Chat4 narrow capability/test-typing repair
3. Palace v19 prose/presentation
4. D39 runtime semantic union
5. D39 live consumers
6. Strong Meta UI
7. D48 overlay
8. focused gate
9. Chat2 full CI
10. Leader merge
11. exact-main CI

Burn-down stays 4 until step 11 is green.

## Chat2 Palace v18 cumulative reconstruction — FROZEN

Chat2 work branch:
`chat2/assembly-palace-d39-d48-current-main-v68`

Frozen exact Palace v18 head:
`ed76c89829541c955e4129d6e0114c0d2fe7e562`

Freeze doc:
`CHAT2_PALACE_V18_FROZEN_HEAD_v72.md`

Accepted cumulative authority:
- v15 runtime/base:
  `chat6/palace-rich6-runtime-producer-v15@40623a9de8b5a11ac9493b865c9f3fadd0435e1c`
- v16 UI:
  `chat6/palace-player-facing-ui-v16@65b9e668ff7112c86681905d62f723b6cf95cec0`
- v18 Prince/D45:
  `chat6/palace-prince-narrative-producer-v18@67f948d185883d8e706dad522e5010bff8e2bd48`

Leader1 static audit on frozen v18 head:
- `src/core/palace.ts`: exact v18 authority semantics
- `src/core/schema.ts`: Palace state delta only; Stage1 Secret Debt schema preserved
- `src/core/engine.ts`: accepted v15 Palace runtime union; Secret Debt/D51 markers preserved
- `assertPalaceProgressionState(s)` is present in save parser
- `content/definitions.json`: exactly 28 Palace stable IDs changed; 0 non-Palace IDs changed
- localization: exact 202 Palace-key union; 0 non-Palace changes
- invitation exact v18
- outcome/progression/confrontation packs exact v18
- `src/ui/palaceUi.ts` exact v18
- `src/ui/app.ts`: Palace UI composed with Stage1 Secret Debt hidden-work UI

Leader1 made one narrow UI repair after Chat2's worker completion:
- commit `ed76c89829541c955e4129d6e0114c0d2fe7e562`
- restored accepted v18 Palace-specific button labels:
  - ordinary Palace action -> `ui.palace.actionButton`
  - `palace.confront-prince` -> `ui.palace.confrontationButton`

Do not use the pre-fix Chat2 head `3b809017...` as the frozen authority.

## Localization large-file rule

For large `content/localization.json`, `fetch_file` may return empty content.

Use:
1. `fetch_file` only to obtain blob SHA
2. `fetch_blob` on that SHA to read full content

This was proven on Stage1 blob:
`c180f641844d0094ebd533d8939d0339469baadf`

Palace localization support:
`CHAT2_PALACE_LOCALIZATION_UNION_v70.json`

Union facts:
- 202 keys total
- 198 added
- 4 modified
- 0 removed
- 0 conflicts with Stage1
- resulting Chat2 blob:
  `0f2a0ef46e68379b654227a0dd35c81417e3795c`
- 202/202 exact Palace values
- 0 changes outside Palace key set

Do not redo Palace v18 localization.

## Current required lane — Chat4 narrow repair

Branch:
`chat4/stage2-palace-v18-narrow-repair-v73`

At handoff time branch head:
`01cfb15f5716adaad7096131e2447664944d476c`

Important:
this head currently contains Leader-created task/pointer control commits on top of the exact frozen Palace base.
It does **not** prove the Chat4 worker has run.

Task:
`CHAT4_STAGE2_PALACE_V18_NARROW_REPAIR_v73.md`

Pointer:
`CURRENT_CHAT4_TASK_POINTER.md`

Expected worker stop:
`PALACE_V18_REPAIR_READY_FOR_CHAT2`

### Chat4 repair A — exactly three capability reads

File:
`content/packs/palace-outcome-finalize.json`

Add exactly to:
`capabilities.reads.worldFacts`

- `palace.outcome.service-life-ready`
- `palace.outcome.court-power-ready`
- `palace.outcome.inner-truth-ready`

Do not change:
- conditions
- effects
- writes
- IDs
- ending eligibility
- mechanics

### Chat4 repair B — strict typing only

Historical Palace tests may need:
- optional `catalog.definitions.careers` narrowing
- optional `catalog.definitions.quests` narrowing
- explicit callback types
- typed access to event `variants`

Allowed:
- narrowing / local explicit types / optional-array normalization / typed helpers

Forbidden:
- changing production Palace behavior
- weakening/deleting assertions
- hiding semantic regressions with broad casts

## REQUIRED NEXT USER ACTION

At this exact handoff, Chat4 is **assigned but not manually launched** unless the user has already activated it after this file was written.

If not active, ask the user to send Chat4:

`Продолжай по текущему указателю в GitHub. Работай на chat4/stage2-palace-v18-narrow-repair-v73 до PALACE_V18_REPAIR_READY_FOR_CHAT2. Не отвечай планом — выполняй узкий repair.`

Do not start Chat3/5/6 peripheral work while this repair is outstanding.

## After Chat4 reports completion

Next Leader must:

1. Re-query exact Chat4 branch head.
2. Verify branch diff against frozen base `ed76c898...`.
3. Confirm production diff contains only:
   - the three capability-read additions
   - no mechanics change
   - test-only strict typing adaptations
4. Read Chat4 handoff/evidence.
5. If executable evidence is unavailable, use Leader push-trigger Actions on the exact repaired SHA.
6. Integrate the narrow repair back into the Chat2 Stage2 assembly lane.
7. Only then continue Palace v19.

Do not merge Stage2 to main at the Chat4-repair point.

## Palace v19 next authority

After Chat4 repair:

`chat6/palace-final-prose-media-v19@6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`

v19 is a direct descendant of v18.
Its delta is authored Palace prose/localization/presentation only; no runtime TypeScript owner change.

Selective composition only:
- no whole-file replacement of diverged shared owners
- establish accepted Palace v19 presentation family before D48

## D39 authorities after Palace v19

Runtime/reward producer:
`chat5/palace-d39-reward-producer-v20@b5ab23a88ee0e18c6250251de15818ff799ff3f6`

Live consumer implementation:
`chat3/d39-consumer-producer-v45@090f36174cbc4ae9db46ae0bdbc9b1e4a2ce1386`

D39 locked semantics:

Formal Introduction:
- reward ID `palace.court-power.formal-introduction`
- Specialist
- Assassin handler first live consumer
- neutral stage `formal-introduced`
- transition `formal-introduction`
- fact `introduced-at-work`
- no trust/approval/conflict/route/career/ending/resource/stat shortcut
- normal trust remains reachable

Source Method:
- reward ID `palace.inner-truth.source-method`
- automatic knowledge, slot-free
- School Arcana/Reason Night Study information-only variant
- no mechanics delta
- no D49 macro-lore leak

Strong Meta capacities remain:
- max 1 Keystone
- max 2 Specialists
- `palace.true.cap-200` uses Specialist slot
- automatic knowledge slot-free
- ordinary Hard Work packages outside slots
- current-run Strong Meta snapshot immutable

## Strong Meta UI authority

Accepted implementation:
`chat6/strong-meta-ui-closure-v42@fac645878ebd726f50fd1364ac72414796755a2d`

Must be surgically unioned with current:
- Palace UI
- Secret Debt/D51 UI
- Night/Activity UI
- modal accessibility
- current shared UI

Never whole-file replace `src/ui/app.ts`.

## D48 authority

Implementation:
`chat6/palace-d48-media-producer-v48@e0277dc302df178e73184bf1623d0e91e5237b45`

Exactly four Palace SVG masters:
- `palace-custodian-audience.svg`
- `palace-threshold-archive.svg`
- `palace-return-home-threshold.svg`
- `palace-service-interior.svg`

Final Palace presentation arithmetic:
- 19 v19 Palace slots total
- 17 D48 overlays
- 2 invitation slots remain neutral `assets/stage-town.svg`

No D48 runtime/mechanics changes.

## Locked Palace product rules

Preserve:
- D23 gate = all 10 ordinary Hard Work permanent completions + all 10 current-life packages
- explicit invitation acceptance
- exactly 15 structural duties
- max 1 structural duty/day
- duty cost 1 Energy
- support max 1/day
- Prince readiness = all 12 progression stats >=91
- Lust excluded
- confrontation cost = 0 money / 0 Energy
- deterministic 4 phases
- retryable
- no RNG
- only phase-4 success writes `palace.prince-defeated`
- no automatic ending commit
- Return Home explicit
- successor world remains real
- original displacement cause remains unknown

## Runner / CI execution path

Self-hosted runner:
`C:\Users\SashOliVov\actions-runner`

User launches with:
`cd C:\Users\SashOliVov\actions-runner`
`.\run.cmd`

Keep PowerShell window open during jobs.

Connector may not expose push-trigger workflow runs directly.
Proven Leader execution route:
- create QA branch from exact candidate
- add branch-scoped push workflow
- checkout exact pre-workflow/source SHA
- run Node 22.18.0
- publish evidence JSON/logs back to QA branch
- evidence commit must not retrigger workflow

Do not claim green without published evidence.

## Worker status at handoff

- Chat2: **стоит / frozen handoff complete** at `ed76c898...`
- Chat4: **стоит with task assigned** unless user manually launches it
- Chat3: **стоит**
- Chat5: **стоит**
- Chat6: **стоит**

Do not wake Chat3/5/6 merely to keep them busy.

## Final next-leader instruction

The next Leader 1 should do exactly this first:

1. Re-query `main`, Chat2 frozen branch, and Chat4 repair branch.
2. Ask whether user has manually launched Chat4.
3. If not, give the one-line Chat4 start instruction above.
4. Wait for `PALACE_V18_REPAIR_READY_FOR_CHAT2`.
5. Validate that exact repair.
6. Resume Stage2 locked order from Palace v19.

Broad burn-down remains **4**.
