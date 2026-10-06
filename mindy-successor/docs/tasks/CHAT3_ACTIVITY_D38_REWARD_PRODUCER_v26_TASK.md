# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — ACTIVITY D38 REWARD PRODUCER v26**
Owner: Chat 3

Accepted preflight:
`chat3/activity-d38-reward-implementation-preflight-v25@1024d8a657f0514f894042936e615364940f5e26`

New branch:
`chat3/activity-d38-reward-producer-v26`

Implement the accepted three D38 Activity permanent rewards using current Strong Meta architecture:

- `specialist.activity.surveyors-atlas`
- `specialist.activity.field-archive`
- `specialist.activity.contact-network`

Follow v25 exactly.

Requirements:
- all three are normal Specialists;
- normal max 2 active Specialist slots;
- no same-life activation after earning;
- completeEnding grants ownership exactly once;
- run-local usage state is persisted and bounded;
- Camp does not reset uses;
- no Secret Debt / Palace / career / region / capability bypass;
- no Activity entry-Energy reduction;
- no baseline Field Time increase;
- no generic unlock-only final ownership;
- no new Product behavior.

Add focused executable tests.
No full CI.

Deliver:
`mindy-successor/docs/tasks/CHAT3_ACTIVITY_D38_REWARD_PRODUCER_v26.md`

Freeze exact SHA and report:
`READY_FOR_CHAT2_ASSEMBLY`.
