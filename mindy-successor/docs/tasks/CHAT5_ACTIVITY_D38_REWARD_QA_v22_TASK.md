# CURRENT CHAT5 TASK POINTER

Status: **ACTIVE — ACTIVITY D38 REWARD EXACT-HEAD QA v22**
Owner: Chat 5

Producer under verification:
`chat3/activity-d38-reward-producer-v26@7770b6bf7f930e8af17331e8b22613523bb2e768`

QA branch:
`chat5/qa-activity-d38-reward-v22`

Task:
run executable exact-head verification of the frozen D38 reward producer.

Workflow must explicitly checkout:
`7770b6bf7f930e8af17331e8b22613523bb2e768`

Required checks:
- typecheck;
- validate;
- build;
- D38 focused reward suite;
- Strong Meta registry/integration;
- ending transaction lifecycle;
- save/reload persistence;
- no generic unlock ownership;
- no extra Specialist slot;
- Secret Debt / Palace / ordinary-career firewalls.

No full CI.
Do not mutate the frozen producer.

If green, document run/job evidence and report:
`READY_FOR_CHAT2_ASSEMBLY`.
