# Chat 2 stream-error recovery — 2026-10-03

Git is the source of truth.

Read first:
1. `CURRENT_CHAT2_TASK_POINTER.md`
2. `USER_DECISIONS_LOCKED_v1.md`

Current branch:
`chat2/assembly-strong-meta-current-main-20261003-v1`

Latest known assembly head before stream failure:
`acfbfabe59e0a8e8504bc18f401d5f4967886553`

PR:
#277

Focused QA:
#1154 SUCCESS.

Full CI:
#1155 FAILURE.

Do not restart Strong Meta assembly.
Do not weaken schema6 Strong Meta invariants.

Leader diagnosis for #1155 is already in CURRENT_CHAT2_TASK_POINTER.md and PR #277.

Repair only stale tests/fixtures:
- gopher schema5 roundtrip must now expect current schema 6;
- completed-save fixtures in:
  - school-activation-boundary.test.ts
  - school-blocking-scene-compat.test.ts
  - school-body-confidence-lust-d20.test.ts
  - school-engine-adapter.test.ts
  - school-life-content-reload.test.ts
  - school-production-v11-locale-save.test.ts
  - school-target.test.ts
  must contain the canonical empty resolved Strong Meta snapshot.

Do not make parseSave invent snapshots for malformed schema6 completed saves.
Do not infer reward ownership.
Do not restore direct cap-200 setup.

After repair:
1. focused gate;
2. only if green, one full CI rerun;
3. freeze exact head;
4. report READY_FOR_LEADER_MERGE.

Do not merge main.
