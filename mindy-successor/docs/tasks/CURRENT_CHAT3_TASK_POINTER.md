# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — D51 EXACT-HEAD QA v21**
Owner: Chat 3

Frozen producer:
`chat3/secret-debt-activity-energy-compat-producer-v20@79a868bf30af2c162b2ea1323759dffad5e8dadf`

Do not mutate the frozen producer.

QA branch:
`chat3/qa-secret-debt-activity-energy-compat-v21`

Task:
run executable exact-head verification of the frozen D51 producer.

The workflow must explicitly checkout:
`79a868bf30af2c162b2ea1323759dffad5e8dadf`

Required checks:
- typecheck;
- validate;
- build;
- `secret-debt-activity-energy-compat-v20.test.ts`;
- `secret-debt-full-route-v12.test.ts`;
- NightFlow save/reload adjacency;
- next-day modifier provenance/tag persistence;
- Activity 2-Energy entry regressions;
- T1-T11 matrix from the v20 handoff.

No full CI.
No production behavior changes on the frozen producer.

If green, document exact workflow/run/job IDs and report:
`READY_FOR_CHAT2_ASSEMBLY`.
