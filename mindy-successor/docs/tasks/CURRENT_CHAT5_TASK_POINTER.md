# CURRENT CHAT5 TASK POINTER

Status: **ACTIVE — D47 FOCUSED QA v13**
Owner: Chat 5

Frozen producer candidate:
`chat5/hard-work-bonus-mapping-producer-v13@252dc26c514e24f4ab0f0cc0da7694254282e4c4`

Do not mutate the producer candidate.

QA branch:
`chat5/qa-d47-hard-work-mapping-v13`

Base:
`252dc26c514e24f4ab0f0cc0da7694254282e4c4`

Task:
run exact-head focused executable verification for D47.

Required:
- typecheck;
- validate;
- build;
- D47 focused mapping tests;
- ordinary Hard Work package catalog/runtime tests;
- New Start+ UI/presentation tests;
- D23 Palace package-identity tests;
- D24 cap-200 tests;
- Strong Meta capacity/isolation tests;
- Secret Debt and advanced-ending adjacency regressions;
- save/reload/idempotence.

QA branch may add only verification workflow/docs needed to run the checks.
Do not change production behavior to make QA pass unless a real producer bug is found; if so, repair on a new producer-repair branch and report the exact cause.

No full CI.

If green, document exact workflow/run and report:
`READY_FOR_CHAT2_ASSEMBLY`.
