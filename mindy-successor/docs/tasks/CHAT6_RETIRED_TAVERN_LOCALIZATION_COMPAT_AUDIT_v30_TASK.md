# CURRENT CHAT6 TASK POINTER

Status: **ACTIVE — RETIRED TAVERN LOCALIZATION COMPAT AUDIT v30**
Owner: Chat 6

Previous global caption closure v29 is complete.

New branch:
`chat6/retired-tavern-localization-compat-audit-v30`

v28 identified six stale retired Tavern presentation-localization rows as cleanup candidates.

Audit whether these six rows can be safely removed from the final 1.0 assembled target:
- tavern-stay alt/caption
- tavern-guild alt/caption
- tavern-court alt/caption

Check:
- live presentation consumers;
- migration/history display consumers;
- old RunResult/ending compatibility;
- unlock-label consumers;
- localization fallback paths.

Separate:
- safe-to-delete rows;
- must-keep compatibility rows;
- rows that require final assembled-head verification.

Do not delete anything in this audit.
Do not change runtime.
Do not run full CI.

Deliver:
`mindy-successor/docs/tasks/CHAT6_RETIRED_TAVERN_LOCALIZATION_COMPAT_AUDIT_v30.md`

Report:
`READY_FOR_LEADER_REVIEW`.
