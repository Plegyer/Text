# CURRENT CHAT5 TASK POINTER

Status: **ACTIVE — PALACE D39 REWARD EXACT-HEAD QA v24**
Owner: Chat 5

Previous retired Tavern cleanup exact-head QA v23 is complete and green.

Producer under verification:
`chat5/palace-d39-reward-producer-v20@b5ab23a88ee0e18c6250251de15818ff799ff3f6`

QA branch:
`chat5/qa-palace-d39-reward-v24`

Task:
run independent exact-head executable verification of the frozen Palace D39 reward producer.

Workflow must explicitly checkout the frozen producer implementation head documented by v20 and verify:
- exact SHA guard;
- production firewall;
- npm ci;
- typecheck;
- validate;
- build;
- D39 reward lifecycle tests;
- Strong Meta registry/integration;
- Palace D23 adjacency;
- Secret Debt isolation;
- save/load defaults and future-life activation;
- Source Method remains automatic knowledge, not Specialist/Keystone.

No full CI.
Do not mutate the frozen producer.

If green, document exact run/job evidence and report:
`READY_FOR_CHAT2_ASSEMBLY`.
