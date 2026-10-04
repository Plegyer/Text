# CHAT3 CONTEXT RECOVERY — D38 Activity Ending Family v16-r1

Status: **NEW CHAT RECOVERY / CONTINUE WORK**
Owner: Chat 3

Previous Chat 3 conversation reached context limit.

No v16 implementation work was lost:
- old branch `chat3/activity-ending-family-producer-v16` never advanced beyond
  `ab378d68765f7c9bbff43abf3b4b41e24df82e01`;
- that SHA is the frozen completed Restricted Sites v15 head.

Use the replacement branch:
`chat3/activity-ending-family-producer-v16-r1`

Exact base:
`chat3/restricted-sites-production-v15@ab378d68765f7c9bbff43abf3b4b41e24df82e01`

Read in this order:
1. this recovery file;
2. `docs/tasks/CURRENT_CHAT3_TASK_POINTER.md`;
3. D36 and D38 in `docs/USER_DECISIONS_LOCKED_v1.md`;
4. `docs/tasks/CHAT3_RESTRICTED_SITES_PRODUCTION_v15.md`.

Mission:
implement the locked D38 ending family on top of the complete four-region Activity baseline.

Stable endings:
- `ending.activity.pathfinder`;
- `ending.activity.preservation`;
- `ending.activity.network`.

Stable Specialist rewards:
- `specialist.activity.surveyors-atlas`;
- `specialist.activity.field-archive`;
- `specialist.activity.contact-network`.

Do not duplicate current-main Strong Meta runtime on this historical cumulative branch.
Author exact content/runtime seams and tests; Chat 2 binds Specialists into canonical current-main Strong Meta.

No full CI.
Finish with exact SHA + `READY_FOR_CHAT2_ASSEMBLY`.
