# CURRENT CHAT4 TASK POINTER

Status: ASSIGNED
Owner: Chat 4 / QA + Product Acceptance Gate

Mandatory startup:
- `WORKER_CHAT_RECREATION_PROTOCOL_v1.md`
- `ACTIVE_TEAM_OWNERSHIP_MATRIX.md`
- `CANDIDATE_QA_FREEZE_PROTOCOL.md`
- `TASK_CHAT4_QA_QUEUE_v4.md`
- `TASK_CHAT4_QA_QUEUE_v5.md`

Current queue sequence:
- finish any still-open C4-25 through C4-36 items from `TASK_CHAT4_QA_QUEUE_v4.md`;
- continue C4-37 through C4-41 from `TASK_CHAT4_QA_QUEUE_v5.md` without waiting for a new chat instruction.

Immediate work available now:
- C4-37: gate frozen PR #88;
- C4-38: gate frozen PR #90;
- C4-39: current-main integration health gate after merged #84/#85/#89;
- C4-41: gate Chat 3 PR #93, whose exact-head repository CI is green.

C4-40 remains waiting for the next frozen Chat 1 starter-trio candidate.

Primary goal:
- gate current candidates and starter-trio runtime behavior.

Do not restart completed earlier queue items.

Keep technical evidence in Git only. Personal chat output:
- `Задание выполнено`
- `Задания выполнены`

Do not self-assign beyond this queue.
