# CURRENT CHAT5 TASK POINTER

Status: **ACTIVE — FINAL ENDING ID / MIGRATION AUDIT v15**
Owner: Chat 5

Completed D41 triage:
`chat5/d41-full-suite-triage-v14@06fd08196d9eabdc1b4f6e3a360794cd64d1e80c`

Triage result:
- 18 stale pre-D41 expectations;
- 4 retired legacy identity/presentation references;
- 0 D41 runtime regressions.

New branch:
`chat5/final-ending-id-migration-audit-v15`

Task:
audit the full ordinary-career ending identity surface for 1.0.

Scope:
- 10 Hard Work endings;
- 14 D41 advanced endings;
- 16 D40 advanced endings;
- total expected ordinary-career ending surface = 40 stable endings.

Verify:
- exact stable IDs;
- no duplicate semantic identity;
- retired aliases/legacy IDs and their migration policy;
- completed-old-ending canonicalization;
- uncompleted eligibility/commit cleanup;
- RunResult and transaction identity;
- reward ownership mapping;
- localization/presentation/source-inventory references;
- no dead legacy semantic rows;
- no Palace implication from Tavern legacy IDs;
- no advanced ending auto-commit;
- save/load idempotence.

Research/audit only.
Do not modify runtime or Chat 2 assembly.

Deliver:
`mindy-successor/docs/tasks/CHAT5_FINAL_ENDING_ID_MIGRATION_AUDIT_v15.md`

Report:
`READY_FOR_LEADER_REVIEW`.

No full CI.
