# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — 1.0 SAVE / MIGRATION CLOSURE AUDIT v16**
Owner: Chat 4

Previous result:
`chat4/d46-economy-reachability-audit-v15@bb79be1f39c55e6297287cd071e1e8268005148a`
— **PASS**, no evidence-backed D46 retune blocker.

New branch:
`chat4/final-save-migration-audit-v16`

Base:
`main@209e2f6dae5ae3c34c0803410d640b67022cc899` (D40 production merge)

Task:
build the final pre-1.0 save/migration acceptance matrix across all queued systems.

Audit:
- schema evolution and old-save defaults;
- Strong Meta schema6/current-run snapshot immutability;
- D40/D41 selected-route facts and ambiguous legacy outcome-ready cases;
- Night state;
- Secret Debt bound/repayment/ending state;
- Palace access/duty/confrontation state;
- Activity route/mini-game/camp/suspicion state;
- D46 fresh Lust vs existing-save Lust preservation;
- D47 active Hard Work package snapshot and no double-application.

For each system specify:
- old-save input shape;
- required migrated/default state;
- idempotence expectation;
- forbidden inference;
- save/reload checkpoint;
- exact regression test needed before 1.0.

Research/audit only. Do not change runtime.
No full CI.

Deliver:
`mindy-successor/docs/tasks/CHAT4_FINAL_SAVE_MIGRATION_AUDIT_v16.md`

Report:
`READY_FOR_LEADER_REVIEW`.
