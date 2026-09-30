# CURRENT CHAT1 DEVELOPER TASK POINTER

Status: ASSIGNED
Owner: Chat 1 Developer / Integration Developer

Mandatory startup:
- `WORKER_CHAT_RECREATION_PROTOCOL_v1.md`
- `ACTIVE_TEAM_OWNERSHIP_MATRIX.md`
- `CANDIDATE_QA_FREEZE_PROTOCOL.md`
- `TASK_CHAT1_DEVELOPER_QUEUE_v6.md`
- `TASK_CHAT1_DEVELOPER_QUEUE_v7.md`

Current work:
- finish C1D-49 through C1D-60 on PR #124;
- PR #119 and PR #123 are superseded/closed and must not be used for QA;
- PR #124 exact-head CI is currently red because the candidate tests import missing `src/ui/schoolReactive.ts`; repair only owned integration/test-contract scope, then obtain one new exact green frozen head.

Next queue:
- after C1D-60 is frozen, continue automatically with C1D-61 through C1D-72.

At the queue boundary:
- re-read current main and this pointer;
- do not duplicate artifacts already merged while the prior queue was in progress;
- final candidates must be refreshed from then-current main.

Keep technical evidence in Git only. Personal chat output:
- `Задание выполнено`
- `Задания выполнены`

Do not self-assign beyond C1D-72.
