# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — GATE CURRENT GREEN/FROZEN WAVE**
Owner: Chat 4 / QA + Product Acceptance Gate

Current queue:
- `TASK_CHAT4_QA_QUEUE_v13.md`
- C4-126..137

Start immediately and do not stop after a blocked candidate.

Gate in this order unless current Git invalidates a head:

1. PR #147 — Chat 1
   - head `e9e1c4d5cdafcdf5e8571170cd9b699426536746`
   - CI #483 SUCCESS
2. PR #151 — Chat 2
   - head `463d877009b5ecc1d255d7aa27a91bb7c38016e5`
   - CI #474 SUCCESS
3. PR #146 — Chat 3
   - head `8fa771f212190e5ad9ba4145869d5ce0b04d2cf2`
   - CI #500 SUCCESS
4. PR #156 — Chat 5
   - head `97b659d78ac3a2ccfe72c556344631f7de570507`
   - CI #489 SUCCESS

Before each gate, re-query the PR. If its head moved, old CI/QA evidence is invalid.

For a blocker:
- record exact blocker;
- return it to producer;
- continue to the next still-eligible candidate;
- do not implement the fix yourself.

Mandatory:
- `../LEADER1_LIVE_DASHBOARD.md`
- `CHAT4_OPEN_PR_DISPOSITION_LEDGER_2026-10-01.md`
- `CHAT4_EXECUTABLE_ACCEPTANCE_TRUTH_2026-10-01.md`
- `CANDIDATE_QA_FREEZE_PROTOCOL.md`

Do not self-assign beyond C4-137.
