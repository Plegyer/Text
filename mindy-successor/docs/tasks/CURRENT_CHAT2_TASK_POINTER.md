# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — #1122 FULL FAILURE TRIAGE / REPAIR — SOLE FULL-CI SLOT**
Owner: Chat 2 / Integration + Assembly + Technical QA

PR: #264
Branch: `chat2/assembly-hard-work-meta-shared-20261003-v1`
Current tested head: `df18be22e0bc4677b20dada55f9b9cc8383d2e31`
Workflow #1122: **1009 tests / 992 pass / 17 fail**

## Rule

Do not request another full CI until every one of the 17 failures is locally/focused green.

## Failure groups

### A — 12 shared schema-v5 creation-state failures
All throw:
`Завершённое создание должно иметь зафиксированный Hard Work package state.`

Affected School/save tests:
- school-activation-boundary
- school-blocking-scene-compat x2
- school-body-confidence-lust-d20
- school-engine-adapter
- school-life-content-reload x2
- school-night-study-adapter
- school-production-v11-locale-save x2
- school-target x2

For each test determine:
- legacy completed-save fixture -> migrate/default to a frozen empty/already-applied package state as D21-D24 requires; OR
- invalid schema-v5 fixture -> complete creation via the real current creation path.

Do not weaken the exactly-once/frozen package invariant.

### B — schema version expectation
`gopher.test.ts`: expected 4, actual 5.
Audit/update the stale expectation while preserving migration coverage.

### C — journal schema4 compatibility
Two failures in `journal-outcome-localization.test.ts`.
Treat as possible real migration regression:
- old fallback journal text must survive;
- null refs must remain index-aligned;
- malformed alignment must still be rejected if that is the current compatibility contract.

Fix migration/runtime if needed; do not blindly rewrite expected values.

### D — Lumber reward expectation
`lumber-target-production.test.ts`: expected 4, actual 1.
Audit against D21:
Hard Work completion records the permanent career achievement/early-access eligibility; selectable start-package effects belong to New Start+ selection/application, not the old automatic reward bundle.

### E — UI Palace legacy expectation
`ui.test.ts`: expected "Дворец" legacy unlock label but it is absent.
Audit against D23:
stale permanent `palace` Meta unlock is no longer authoritative; Palace is current-life 10/10-active qualification -> Day-1 invitation.

## Before rerun

Run:
- all 17 failed tests;
- migration/journal tests;
- D21-D24 focused suite;
- School D20 suite;
- current seasonal-tradeoff suite.

Write PR evidence classifying each failure as:
- stale expectation/fixture; or
- actual migration/runtime defect.

Then exactly one full CI rerun.
If green: freeze exact SHA and report `READY_FOR_LEADER_MERGE`.

Queued after #264:
1. Chat 4 New Start+ UI `837156277f7329f0187b04442acb8d5258a2e189`;
2. Chat 6 Palace D23 consumer `9dfaab2a7b9e145c9753c0acd8e54d3f903be5fd`.
