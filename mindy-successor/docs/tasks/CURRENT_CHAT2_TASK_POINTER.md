# CURRENT CHAT2 TASK POINTER

Status: **STAGE 2 - PALACE v19 SELECTIVE CONTENT COMPOSITION NOW**
Owner: Chat 2 / sole production assembly + full-CI lane

Work branch:
`chat2/assembly-palace-d39-d48-current-main-v76`

Exact base:
`2bb94f64d3f7236161394c09ed3bbba475155fd8`

This base already contains frozen Palace v15-v18 plus the accepted Chat4 narrow repair and Leader v16 renderer selector compatibility fix. Exact closure source `116b40651610a03c4d720bd8bafc7efbf17bb274` passed typecheck, validate, build and the six focused Palace v8/v15/v16/v18 test files. Evidence: `LEADER1_PALACE_V18_REPAIR_CLOSURE_RESULT_v75.json` on `leader1/palace-v18-repair-closure-v75`.

v19 authority:
`chat6/palace-final-prose-media-v19@6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`

Mechanical base:
`chat6/palace-prince-narrative-producer-v18@67f948d185883d8e706dad522e5010bff8e2bd48`

Read `CHAT6_PALACE_FINAL_PROSE_MEDIA_v19.md` and `LEADER1_FREEZE_PALACE_PROSE_MEDIA_v19_2026-10-04.md`.

Apply ONLY v18 -> v19 authored content/presentation delta. No runtime TypeScript, engine or schema changes.

Selective merge:
- Palace packs: prose/text fields only; preserve all mechanics.
- `palace-outcome-finalize.json` MUST retain repaired reads `palace.outcome.service-life-ready`, `palace.outcome.court-power-ready`, `palace.outcome.inner-truth-ready`.
- `definitions.json`: Palace action/ending text by stable ID only; zero non-Palace changes; no whole-file replacement.
- `localization.json`: Palace v19 keys only; preserve Stage1 Secret Debt/D51 and all non-Palace key/value pairs; no whole-file replacement.
- `presentation.json`: merge exactly 19 Palace v19 slot overrides; preserve all non-Palace mappings; no whole-file replacement.
- Carry `tests/palace-final-prose-media-v19.test.ts` and `mindy-successor/research/palace_missing_media_v1.csv`.
- Do not add D48 assets yet.
- Do not apply D39, Strong Meta UI or D48 in this task.

Preserve locked Palace mechanics: D23; exactly 15 duties; max 1 duty/day; duty cost 1 Energy; support max1/day; Prince readiness all 12 progression stats >=91; Lust excluded; confrontation 0 money/0 Energy, deterministic 4 phases, retryable, no RNG; only phase-4 success writes `palace.prince-defeated`; no automatic ending; explicit Return Home; successor world real; displacement cause unresolved.

Verification:
1. npm ci
2. npm run typecheck
3. npm run validate
4. npm run build
5. focused Palace v8/v15/v16/v18 plus `tests/palace-final-prose-media-v19.test.ts`.

Do NOT run Stage2 full CI yet. If execution is unavailable, do not fabricate green.

Stop at:
`PALACE_V19_READY_FOR_D39`

Report exact head, changed files, proof the three repaired reads remain, zero non-Palace definitions/localization changes, 19 Palace presentation slots, and verification results.
