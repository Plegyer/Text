# CURRENT CHAT5 TASK POINTER

Status: **ACTIVE — RETIRED TAVERN CLEANUP EXACT-HEAD QA v23**
Owner: Chat 5

Previous Activity D38 exact-head QA v22 is green and accepted.

Producer under verification:
`chat6/retired-tavern-localization-cleanup-v31@eb03a847347339ade109b0ec9022b81cd4abadaf`

QA branch:
`chat5/qa-retired-tavern-cleanup-v23`

Task:
run executable exact-head verification of the retired Tavern localization cleanup.

Workflow must explicitly checkout:
`eb03a847347339ade109b0ec9022b81cd4abadaf`

Required checks:
- exact SHA guard;
- production firewall;
- npm ci;
- typecheck;
- validate;
- build;
- v31 cleanup focused test;
- D41 migration/history compatibility tests;
- presentation/source-integrity adjacency;
- verify no live Tavern ending/presentation is reintroduced.

No full CI.
Do not mutate the frozen producer.

If green, document run/job evidence and report:
`READY_FOR_CHAT2_CONTENT_ASSEMBLY`.
