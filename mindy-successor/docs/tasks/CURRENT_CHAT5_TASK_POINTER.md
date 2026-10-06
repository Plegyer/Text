# CURRENT CHAT5 TASK POINTER

Status: **START NOW — SECRET DEBT CURRENT-HEAD GAP QA v40-v42**
Owner: Chat 5

Frozen Chat2 head under review:
`a02d4931087e0884756a6888354b8a69e0327b02`

QA branch:
`chat5/qa-secret-debt-current-head-v40`

Do not mutate Chat2's producer/assembly branch.

## v40 — gap audit
Compare the frozen head against accepted Secret Debt v12 + D51 + localization v27 + current pointer.
Identify exactly what is already composed and what remains.

## v41 — exact-head focused QA
Run exact-head guard, npm ci, typecheck, validate, build and focused Secret Debt/D51/Night/save tests where executable.
Classify failures; do not repair production in this lane.

## v42 — unblock handoff
Create:
`mindy-successor/docs/tasks/CHAT5_SECRET_DEBT_CURRENT_HEAD_GAP_QA_v42.md`

Give Chat2 a concise remaining-work list and any exact blockers.

No full CI.

Report:
`BUNDLE_COMPLETE — READY_FOR_CHAT2_REPAIR`.
