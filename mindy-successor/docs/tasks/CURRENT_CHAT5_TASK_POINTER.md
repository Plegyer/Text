# CURRENT CHAT5 TASK POINTER

Status: **ACTIVE — WINDOWS RELEASE PREFLIGHT BUNDLE v37-v39**
Owner: Chat 5

Previous cross-tranche readiness bundle v34-v36 is complete and accepted.

Current branch:
`chat5/windows-release-preflight-v37`

Complete all tasks in order without waiting for Leader.

## Task A — v37: packaged Windows release preflight refresh

Create:
`mindy-successor/docs/tasks/CHAT5_WINDOWS_RELEASE_PREFLIGHT_REFRESH_v37.md`

Review the current Windows release checklist and final closure plan.

Cover:
- dist:win;
- installer artifact identity;
- SHA-256;
- installed launch;
- path with spaces/non-ASCII;
- no-source-tree launch;
- offline launch;
- save/reload;
- backup recovery;
- corrupt primary/backup handling;
- compatible installer update;
- media packaging.

Identify missing or duplicate gates.

## Task B — v38: final release evidence ledger template

Create:
`mindy-successor/docs/tasks/CHAT5_FINAL_RELEASE_EVIDENCE_LEDGER_TEMPLATE_v38.md`

Provide one compact fill-in template for:
- each remaining stage candidate SHA;
- focused QA evidence;
- full-CI evidence;
- Leader merge SHA;
- exact-main CI;
- burn-down transition;
- final installer filename/size/hash;
- clean-machine evidence;
- persistence/update/backup smoke;
- manual RU/EN/presentation smoke.

## Task C — v39: final release go/no-go checklist

Create:
`mindy-successor/docs/tasks/CHAT5_FINAL_RELEASE_GO_NO_GO_v39.md`

Define the minimum objective conditions for:
- source-tree release candidate;
- packaged release candidate;
- final 1.0 GO;
- automatic NO-GO conditions.

Do not duplicate obsolete historical blockers.
Do not run full CI.
Do not modify runtime.

After all three:
`BUNDLE_COMPLETE — READY_FOR_LEADER_REVIEW`.
