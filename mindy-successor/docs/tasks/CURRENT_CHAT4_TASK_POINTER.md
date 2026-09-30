# CURRENT CHAT4 TASK POINTER

Status: ASSIGNED
Owner: Chat 4 / QA + Product Acceptance Gate

Mandatory startup:
- `WORKER_CHAT_RECREATION_PROTOCOL_v1.md`
- `ACTIVE_TEAM_OWNERSHIP_MATRIX.md`
- `CANDIDATE_QA_FREEZE_PROTOCOL.md`
- `TASK_CHAT4_QA_QUEUE_v7.md`
- `TASK_CHAT4_QA_QUEUE_v8.md`

Current status:
- C4-54..57 are completed;
- PR #106, #109, #108 and #105 are now merged into current main;
- C4-58 is therefore immediately active now.

Queue rule:
- execute C4-58;
- if C4-59..65 are still dependency-blocked, continue immediately with available C4-66..77 from queue v8;
- return to C4-59..65 as soon as their named queue-v6 worker dependencies are delivered;
- do not report `Задания выполнены` while any assigned v8 task is available.

Current dependent items:
- C4-59 waits for C1D-52/C1D-53 evidence;
- C4-60 waits for C1D-51;
- C4-61 waits for C1D-55/C1D-56;
- C4-62/C4-63 wait for C1D-57/C1D-58;
- C4-64 waits for C2-60;
- C4-65 waits for C1D-60.

Do not implement production fixes.

Keep technical evidence in Git only. Personal chat output:
- `Задание выполнено`
- `Задания выполнены`

Do not self-assign beyond C4-77.
