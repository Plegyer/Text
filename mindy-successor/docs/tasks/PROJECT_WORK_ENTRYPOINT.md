# Project Work Entry Point

Status: ACTIVE
Repository: `Plegyer/Text`

## Persistent memory

For future Lead handoff:
- `WHITE_SQUIRREL_CHRONICLES_MASTER_MEMORY.md` — compact project overview and current durable direction.
- `DESIGN_MEMORY_ARCHIVE.md` — historical design memory only; never overrides current locked decisions.
- `../USER_DECISIONS_LOCKED_v1.md` — current explicit locked decisions and still-open values.
- `../USER_VISION_AND_ACCEPTANCE.md` — broader current product vision/acceptance context.

## Source of truth

For active coordination use, in order:

1. current `main`;
2. `ACTIVE_TEAM_OWNERSHIP_MATRIX.md`;
3. `CURRENT_CHAT1_DEVELOPER_TASK_POINTER.md`;
4. `CURRENT_CHAT2_TASK_POINTER.md`;
5. `CURRENT_CHAT3_TASK_POINTER.md`;
6. `CURRENT_CHAT4_TASK_POINTER.md`;
7. `CURRENT_CHAT5_TASK_POINTER.md`;
8. the active queue named by each pointer;
9. exact open PR/head/check evidence.

Old chat prose is not a source of truth.

## Current production focus

Current Lead coordination focus:
- treat merged PR #84, #85, #88, #89, #90, #93, #97, #98 and #99 as current-main history, not open worker work;
- treat PR #100 as the remaining frozen prior-wave content-depth candidate pending Chat 4 QA;
- maintain a valid shipped runtime baseline;
- finish a connected playable Lumber vertical slice;
- integrate School and Forest through existing runtime contracts;
- keep ordinary poverty distinct from Secret Debt;
- keep presentation/localization moving in parallel;
- gate candidates on frozen exact heads.

Locked Lumber rule:
- Hard Work = `completed_shifts >= 50`.

Open Lumber rule:
- exact intermediate progression thresholds are not approved yet and must not be inferred from old drafts.

## Current worker model

Five worker chats execute narrow Git-backed queues under Lead control:
1. Chat 1 Developer / Integration;
2. Chat 2 Presentation & Media;
3. Chat 3 Forest + Poverty Content;
4. Chat 4 QA + Product Acceptance;
5. Chat 5 School + Text Localization.

Detailed worker evidence belongs in Git. Personal chat output is intentionally minimal under `WORKER_CHAT_RECREATION_PROTOCOL_v1.md`.

## Historical documents

The following are historical context only unless referenced by an active task pointer:
- old status snapshots;
- superseded work boards;
- stale queue documents;
- completed handoff documents;
- old design examples whose values are still open in current decision records.

Historical documents must not override current ownership, current user decisions, active task pointers, runtime definitions or tests.

## Integration rule

Existing branches, merged PRs and handoffs must be inspected before creating work.

Do not restart completed queues.

Do not merge stale worker branches wholesale.

Prefer selective integration through existing runtime systems.
