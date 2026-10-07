# Chat 4 — Stage 2 Palace v18 Narrow Repair v73

Status: **START NOW — EXACT FROZEN HEAD REPAIR ONLY**
Owner: Chat 4

## Exact base

Work from exact frozen Chat2 Palace v18 head:

`ed76c89829541c955e4129d6e0114c0d2fe7e562`

Chat4 branch:

`chat4/stage2-palace-v18-narrow-repair-v73`

Do not rebase onto current main.
Do not merge main.
Do not apply Palace v19, D39, Strong Meta UI or D48.

Read:

- `CHAT2_PALACE_V18_FROZEN_HEAD_v72.md`
- historical authority `CHAT4_PALACE_CUMULATIVE_EXACT_HEAD_QA_v46.md`

## Repair A — exact capability metadata only

File:

`content/packs/palace-outcome-finalize.json`

Current `capabilities.reads.worldFacts` already contains:

- `palace.access-granted`
- `palace.progression-complete`
- `palace.prep.service-life`
- `palace.prep.court-power`
- `palace.prep.inner-truth`

Add exactly these three existing facts:

- `palace.outcome.service-life-ready`
- `palace.outcome.court-power-ready`
- `palace.outcome.inner-truth-ready`

Do not change:
- event IDs
- event conditions
- effects
- writes
- ending eligibility
- readiness meaning
- any Palace mechanics

No unrelated reads/writes may be added.

## Repair B — historical strict typing only

Adapt only Palace tests currently present on the frozen head as required by current strict TypeScript/catalog typing.

Primary known debt:

- `tests/palace-rich6-runtime-v15.test.ts`
  - optional `catalog.definitions.careers` access must be narrowed/normalized safely
- `tests/palace-prince-narrative-producer-v18.test.ts`
  - optional `catalog.definitions.quests` access
  - implicit-any callbacks
  - inferred `{}` access to event `variants`
- v16 Palace UI/model/renderer tests if current typecheck proves equivalent historical typing debt

Allowed:
- explicit narrowing
- local explicit types
- safe optional-array normalization
- typed helper extraction

Forbidden:
- weakening assertions
- deleting assertions
- changing Palace production mechanics
- changing accepted IDs/thresholds/costs
- hiding a real semantic regression behind casts

## Verification

If executable environment is available, run:

1. `npm ci`
2. `npm run typecheck`
3. `npm run validate`
4. `npm run build`
5. focused:
   - `tests/palace-d23-consumer-integration-v8.test.ts`
   - `tests/palace-rich6-runtime-v15.test.ts`
   - `tests/palace-player-facing-ui-v16.test.ts`
   - `tests/palace-player-facing-ui-renderer-v16.test.ts`
   - `tests/palace-prince-narrative-producer-v18.test.ts`
   - `tests/palace-prince-narrative-renderer-v18.test.ts`

If runner/checkout is unavailable, do not fabricate green evidence. Freeze exact repair SHA and report which executable checks remain for Leader1.

## Stop condition

Stop after the two narrow repairs.

Report:

`PALACE_V18_REPAIR_READY_FOR_CHAT2`

Include:
- exact repair head SHA
- files changed
- exact three capability reads added
- tests changed for typing
- executable results, or explicit environment limitation

Do not continue into Palace v19 or D39.
