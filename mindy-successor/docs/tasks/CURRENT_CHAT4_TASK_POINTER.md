# CURRENT CHAT4 TASK POINTER

Status: ASSIGNED
Owner: Chat 4 / QA + Product Acceptance Gate

Mandatory startup:
- `WORKER_CHAT_RECREATION_PROTOCOL_v1.md`
- `ACTIVE_TEAM_OWNERSHIP_MATRIX.md`
- `CANDIDATE_QA_FREEZE_PROTOCOL.md`
- `TASK_CHAT4_QA_QUEUE_v10.md`
- `TASK_CHAT4_QA_QUEUE_v11.md`

Immediate QA candidates:
- C4-79: PR #124 exact head `63efb509e4776264af41af72d5ff41d7df8e3bc6`, CI #394 green/frozen;
- C4-104: PR #134 exact head `fac977ba10e16c38f519782c6ce415aa39abba19`, CI #396 green/frozen;
- C4-105: PR #132 exact head `43ea615581cd8614a32434888fcaaf01b6e116dd`, CI #390 green/frozen.

Current work:
- continue available C4-94 through C4-101;
- C4-90 waits for a future frozen C1D-72 candidate;
- use C4-104/C4-105 immediately whenever other v10 tasks are dependency-blocked;
- C4-102 through C4-113 remain preassigned next-wave QA;
- do not idle on one blocked candidate while independent assigned QA work exists.

Do not implement production fixes.

Keep technical evidence in Git only. Personal chat output:
- `Задание выполнено`
- `Задания выполнены`

Do not self-assign beyond C4-113.
