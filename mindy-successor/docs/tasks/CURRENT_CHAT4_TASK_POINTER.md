# CURRENT CHAT4 TASK POINTER

Status: ASSIGNED
Owner: Chat 4 / QA + Product Acceptance Gate

Mandatory startup:
- `WORKER_CHAT_RECREATION_PROTOCOL_v1.md`
- `ACTIVE_TEAM_OWNERSHIP_MATRIX.md`
- `CANDIDATE_QA_FREEZE_PROTOCOL.md`
- `TASK_CHAT4_QA_QUEUE_v6.md`
- `TASK_CHAT4_QA_QUEUE_v7.md`

Queue sequence:
- C4-42 through C4-53 are the prior QA wave;
- continue automatically with C4-54 through C4-65 without waiting for a new chat instruction.

Immediate current QA work:
- C4-54 gate PR #106 exact frozen head `58779c2d1b37394d0d2a6c23ad759b67b88e38f6`;
- C4-55 gate PR #109 exact frozen head `946d8b6188ff7aab8b7bf41faabdcbe42faf8445`;
- C4-56 gate PR #108 exact frozen head `66fb6bba3c679e77db36ce68101815d2c54446e7`;
- C4-57 gate PR #105 exact frozen head `cf7112c754ffbf8d174478edcb5cdde585c8e971`.

Then continue C4-58..65 on current main / next frozen integration heads.

Important:
- C4-53 BLOCK on full product acceptance for PR #106 does not pre-decide C4-54. C4-54 separately judges the safety/scope/CI correctness of the selective C1D-48 diff.
- do not implement fixes; record PASS/BLOCK/PASS-WITH-NOTES in Git.

Keep technical evidence in Git only. Personal chat output:
- `Задание выполнено`
- `Задания выполнены`

Do not self-assign beyond C4-65.
