# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — ACTIVITY CAMP PERSISTENCE EXACT-HEAD QA v18**
Owner: Chat 4

Frozen producer:
`chat4/activity-camp-persistence-producer-v17@0cae33dd3518dbda7d6d84e4ea6661b02fe49886`

Do not mutate the frozen producer.

QA branch:
`chat4/qa-activity-camp-persistence-v18`

Task:
run executable exact-head verification of the frozen Camp producer.

Workflow must explicitly checkout:
`0cae33dd3518dbda7d6d84e4ea6661b02fe49886`

Required checks:
- typecheck;
- validate;
- build;
- `activity-camp-persistence-v17.test.ts`;
- Activity save/reload/migration adjacency tests;
- NightFlow exactly-once tests relevant to calendar ownership;
- Activity entry cost / Field Time regressions;
- explicit old-save neutral Camp migration;
- unsupported/partial Camp state rejection;
- 2-night persistence cap;
- exactly-once calendar advance;
- exactly-once Field Time refresh;
- forced before-lodging Night interception.

No full CI.
No production behavior changes on the frozen producer.

If a real producer bug is found, report it and create a separate repair branch; do not silently alter the frozen head.

If green, document exact workflow/run/job IDs and report:
`READY_FOR_CHAT2_ASSEMBLY`.
