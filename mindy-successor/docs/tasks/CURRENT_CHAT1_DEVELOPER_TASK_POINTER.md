# CURRENT CHAT1 DEVELOPER TASK POINTER

Status: ASSIGNED
Owner: Chat 1 Developer / Integration Developer

Mandatory startup:
- `WORKER_CHAT_RECREATION_PROTOCOL_v1.md`
- `ACTIVE_TEAM_OWNERSHIP_MATRIX.md`
- `CANDIDATE_QA_FREEZE_PROTOCOL.md`
- `TASK_CHAT1_DEVELOPER_QUEUE_v6.md`
- `TASK_CHAT1_DEVELOPER_QUEUE_v7.md`
- `TASK_CHAT1_DEVELOPER_QUEUE_v8.md`

Current work:
- finish C1D-49 through C1D-60 on PR #124;
- PR #119 and PR #123 are superseded/closed and must not be used for QA;
- merged PR #125/#126/#127 advanced current main while PR #124 was being repaired;
- even if a moving PR #124 head becomes green, do not freeze it until it is selectively refreshed/revalidated against current main containing #125/#126/#127, with a fresh exact-head green repository run.

Queue sequence:
- after C1D-60 is frozen, continue automatically with C1D-61 through C1D-72;
- after C1D-72 is frozen, continue automatically with C1D-73 through C1D-84 without waiting for a new chat instruction.

At every queue boundary:
- re-read current main and this pointer;
- do not duplicate artifacts already merged while the prior queue was in progress;
- final candidates must be refreshed from then-current main.

Keep technical evidence in Git only. Personal chat output:
- `Задание выполнено`
- `Задания выполнены`

Do not self-assign beyond C1D-84.
