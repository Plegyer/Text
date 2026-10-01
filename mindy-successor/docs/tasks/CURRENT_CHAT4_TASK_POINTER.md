# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE / C4-124 PENDING ELIGIBLE CANDIDATE**
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
- **C4-124 — gate the first eligible fresh candidate**.

Eligibility rule:
- candidate must be frozen/stable;
- exact-head full repository CI must be GREEN;
- do not QA-gate a mutable or red producer head;
- do not implement producer fixes.

Snapshot when this pointer was refreshed:
- Chat 1 PR #147: CI in progress;
- Chat 2 PR #151/#152 same candidate head: CI in progress;
- Chat 3 PR #146: red, 539/568;
- Chat 5 PR #150: red during validation (`Недопустимая typed capability: read calendar`).

When more than one green/frozen fresh candidate exists, gate Chat 1 shared-runtime candidate first unless current main/integration order gives a concrete reason not to.

Do not self-assign beyond C4-125.
