# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE / C4-124 — WAIT FOR CURRENT GREEN/FROZEN HEAD**
Owner: Chat 4 / QA + Product Acceptance Gate

Context reset prompt:
- `CHAT4_RESTART_PROMPT_2026-10-01.md`

Mandatory current sources:
- `../LEADER1_LIVE_DASHBOARD.md`
- `../LEAD1_CURRENT_STATE_v1.md`
- `CHAT4_OPEN_PR_DISPOSITION_LEDGER_2026-10-01.md`
- `CHAT4_EXECUTABLE_ACCEPTANCE_TRUTH_2026-10-01.md`
- `ACTIVE_TEAM_OWNERSHIP_MATRIX.md`
- `CANDIDATE_QA_FREEZE_PROTOCOL.md`
- `TASK_CHAT4_QA_QUEUE_v12.md`

Completed/merged from queue v12:
- C4-114 through C4-123 backlog disposition/health evidence;
- C4-125 executable acceptance truth;
- PR #148 merged to main as `a30272dc91cab3d5286558a189d5d816f1841db7`.

Current task:
- **C4-124 — gate the first current fresh candidate that is both frozen/stable and exact-head GREEN**.
- Prefer Chat 1 PR #147 because it is shared runtime, **but only if its current head is still the green/frozen head at the moment of QA**.

Eligibility rule:
- candidate must be frozen/stable;
- exact-head full repository CI must be GREEN;
- do not QA-gate a mutable or red producer head;
- do not implement producer fixes.

Latest snapshot while producers are repairing:
- Chat 1 PR #147 current head `c0ebb6034c9714a943f2193b7b16ae7277c10cc4`: CI #467 in progress; PR draft at snapshot;
- Chat 2 PR #151 current head `9d1a6e87d101774bf47d5bf66f4e484be4546090`: CI #470 in progress; #152 is a duplicate/draft repair line;
- Chat 3 PR #146: still red, 539/568;
- Chat 5 PR #150 current head `44412489389615428a8674c6ecb8b8f38a52eefb`: repair committed, no current-head CI visible yet.

Re-query Git before choosing the candidate. Never gate an earlier green head after the producer branch has moved.

Do not self-assign beyond C4-125.
