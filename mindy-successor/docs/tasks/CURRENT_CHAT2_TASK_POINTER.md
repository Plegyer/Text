# CURRENT CHAT2 TASK POINTER

Status: **STAGE 2 - FOCUSED GATE NOW**
Owner: Chat 2 / sole production assembly + full-CI lane

Work branch:
`chat2/assembly-palace-d39-d48-current-main-v76`

Exact assembled source:
`05a9eb5b9b7293a029ce1d8962207aef3601d145`

## Closed before this gate

Palace v15/v16/v18/v19: accepted.
D39 runtime: accepted.
D39 live consumers: accepted.
Strong Meta UI: accepted.
D48 Palace media overlay: accepted.

D48 closure:
- production D48 source: `e0499c9c93b5d5bfe72ae43013800c6b52785504`
- accepted source after test-only compatibility fixes: `05a9eb5b9b7293a029ce1d8962207aef3601d145`
- Leader run: `37734288135` SUCCESS
- npm ci / typecheck / validate / build: PASS
- D48 + Stage2 adjacency focused bundle: PASS

Do not redo any of those features.

## This task only

Run the **Stage 2 focused gate** on the exact assembled source.

No production/content/media mutation is expected.

Do NOT run Stage2 full CI yet.
Do NOT merge main.

## Required commands

1. `npm ci`
2. `npm run typecheck`
3. `npm run validate`
4. `npm run build`

Then focused Stage 2 coverage including at minimum:

- `tests/palace-rich6-runtime-v15.test.ts`
- `tests/palace-player-facing-ui-v16.test.ts`
- `tests/palace-player-facing-ui-renderer-v16.test.ts`
- `tests/palace-prince-narrative-producer-v18.test.ts`
- `tests/palace-prince-narrative-renderer-v18.test.ts`
- `tests/palace-final-prose-media-v19.test.ts`
- `tests/palace-d48-media-v50.test.ts`
- `tests/palace-d23-consumer-integration-v8.test.ts`
- `tests/palace-d39-reward-producer-v20.test.ts`
- `tests/ending-meta.test.ts`
- `tests/strong-meta-registry-v7.test.ts`
- `tests/strong-meta-engine-integration-v7.test.ts`
- `tests/strong-meta-d30-runtime-v7.test.ts`
- `tests/strong-meta-player-ui-v42.test.ts`
- `tests/strong-meta-ui-localization-v42-v43.test.ts`
- `tests/modal-aria-localization-v43.test.ts`
- `tests/d39-formal-introduction-assassin-v46.test.ts`
- `tests/school-life-content-reload.test.ts`
- Secret Debt/D51 separation smoke tests available on current assembled tree.

If a test failure proves an assertion is stale because it contradicts an already accepted later authority, apply only the minimal test-compatibility repair and re-run exact head. Do not weaken product invariants and do not change production unless there is a concrete product blocker.

## Stop marker

Stop only at:
`STAGE2_FOCUSED_GATE_GREEN_READY_FOR_FULL_CI`

Report exact source SHA, exact commands/tests, pass counts, and any test-only compatibility change.
