# CURRENT CHAT4 TASK POINTER

Status: ASSIGNED
Owner: Chat 4 / QA + Product Acceptance Gate

Mandatory startup:
- `WORKER_CHAT_RECREATION_PROTOCOL_v1.md`
- `ACTIVE_TEAM_OWNERSHIP_MATRIX.md`
- `CANDIDATE_QA_FREEZE_PROTOCOL.md`
- `TASK_CHAT4_QA_QUEUE_v9.md`
- `TASK_CHAT4_QA_QUEUE_v10.md`

Completed candidate gates:
- C4-78: PR #118 PASS-WITH-NOTES and merged;
- C4-80: PR #116 PASS and merged;
- C4-81: PR #114 PASS-WITH-NOTES and merged;
- C4-91: PR #125 PASS and merged;
- C4-92: PR #126 PASS-WITH-NOTES and merged;
- C4-93: PR #127 PASS-WITH-NOTES and merged.

Current work:
- C4-79 waits for a current-main-refreshed, exact green/frozen PR #124 head;
- C4-82..89 remain assigned current-main gates;
- C4-90 waits for a future frozen C1D-72 candidate;
- C4-94 post-v7 current-main health gate is now immediately available after merged #125/#126/#127;
- continue C4-95..101 as their dependencies become available.

Do not idle on one blocked candidate while independent assigned QA work exists.
Do not implement production fixes.

Keep technical evidence in Git only. Personal chat output:
- `Задание выполнено`
- `Задания выполнены`

Do not self-assign beyond C4-101.
