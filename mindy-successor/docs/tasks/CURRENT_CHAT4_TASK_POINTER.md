# CURRENT CHAT4 TASK POINTER

Status: ASSIGNED
Owner: Chat 4 / QA + Product Acceptance Gate

Mandatory startup:
- `WORKER_CHAT_RECREATION_PROTOCOL_v1.md`
- `ACTIVE_TEAM_OWNERSHIP_MATRIX.md`
- `CANDIDATE_QA_FREEZE_PROTOCOL.md`
- `TASK_CHAT4_QA_QUEUE_v8.md`
- `TASK_CHAT4_QA_QUEUE_v9.md`
- `TASK_CHAT4_QA_QUEUE_v10.md`

Current candidate state:
- C4-78: PR #118 exact head `dbec65d3607844342a09a79549c0900860d30198` is green/frozen and awaits QA verdict;
- C4-79: use PR #124 as the current Chat 1 C1D-60 candidate; its current exact-head CI failed, so wait for a new green/frozen head; PR #119/#123 are superseded/closed;
- C4-80: PR #116 PASS and merged;
- C4-81: PR #114 PASS-WITH-NOTES and merged;
- C4-82..89 remain assigned independent/current-main gates;
- C4-92 will gate PR #126 or an explicitly refreshed successor after exact-head green freeze.

Queue sequence:
- continue available C4-78..89;
- then continue automatically with C4-90..101;
- do not idle on one blocked candidate while independent assigned QA work exists.

Do not implement production fixes.

Keep technical evidence in Git only. Personal chat output:
- `Задание выполнено`
- `Задания выполнены`

Do not self-assign beyond C4-101.
