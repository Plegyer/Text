# CURRENT CHAT1 DEVELOPER TASK POINTER

Status: ASSIGNED
Owner: Chat 1 Developer / Integration Developer

Mandatory startup:
- `WORKER_CHAT_RECREATION_PROTOCOL_v1.md`
- `ACTIVE_TEAM_OWNERSHIP_MATRIX.md`
- `CANDIDATE_QA_FREEZE_PROTOCOL.md`
- `TASK_CHAT1_DEVELOPER_QUEUE_v5.md`

Current queue:
- C1D-37 through C1D-48.

Current-main resync rule:
- PR #97, #98, #99, #93, #88, #90 and #100 are now merged into main;
- any working branch created before those merges is stale as a final delivery base;
- do not duplicate-copy merged artifacts;
- before C1D-48 freeze, rebuild/rebase selectively from current main and carry forward only queue-v5 changes that are still absent from main;
- treat C1D-42..47 as revalidation/no-op when their source candidate is already merged, unless an actual current-main consumer gap remains.

Do not restart C1D-01..36 or merge stale worker branches wholesale.

Keep technical evidence in Git only. Personal chat output:
- `Задание выполнено`
- `Задания выполнены`

Do not self-assign beyond C1D-48.
