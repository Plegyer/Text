# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — D42 POST-REPAIR FAILURE TRIAGE v22**
Owner: Chat 4

Target:
`chat2/assembly-d42-night-current-main-20261004-v1@8e3f854a2607d103d1b22bd5da564089efedfc15`

Latest full CI:
- run `37446088333`
- only **2 failures remain**

Both failures are Guard presentation/source tests:
- expected 29, actual 28;
- expected 29, actual 28.

Task:
- inspect the exact current D42 branch;
- determine why the previous triage repair changed these expectations to 29 while the repaired branch now correctly exposes 28;
- classify whether this is test-only stale expectation or a missing D42 Guard production surface;
- identify the smallest safe repair;
- explicitly state whether any production code/content change is needed.

Do not modify production runtime.
Do not run full CI.

Deliver:
`mindy-successor/docs/tasks/CHAT4_D42_POSTREPAIR_FAILURE_TRIAGE_v22.md`

Report:
`READY_FOR_CHAT2_REPAIR`.
