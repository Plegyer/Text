# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — ACTIVITY D38 REWARD IMPLEMENTATION PREFLIGHT v25**
Owner: Chat 3

Previous Activity cumulative preflight v24 is complete and accepted.

New branch:
`chat3/activity-d38-reward-implementation-preflight-v25`

Goal:
prepare the exact current-Strong-Meta implementation packet for the three accepted D38 Activity rewards.

Accepted rewards:
- `specialist.activity.surveyors-atlas`
- `specialist.activity.field-archive`
- `specialist.activity.contact-network`

Task:
- map exact current Strong Meta registry additions;
- define run-local usage counters/state;
- define ending lifecycle binding through normal completeEnding transaction;
- preserve 0..2 Specialist capacity;
- preserve no activation in earning life;
- specify save/reload/profile-merge behavior;
- specify exact files Chat 2 must modify later;
- specify focused tests for all three rewards and cross-system firewalls.

Do not implement production runtime in this preflight.
Do not invent new Product behavior.
Do not run full CI.

Deliver:
`mindy-successor/docs/tasks/CHAT3_ACTIVITY_D38_REWARD_IMPLEMENTATION_PREFLIGHT_v25.md`

Report:
`READY_FOR_ACTIVITY_ASSEMBLY`.
