# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — ACTIVITY CAMP PERSISTENCE PRODUCER v17 / NEW CHAT**
Owner: Chat 4

Context recovery:
`mindy-successor/docs/tasks/CHAT4_CONTEXT_RECOVERY_ACTIVITY_CAMP_v17_2026-10-04.md`

Completed previous audit:
`chat4/final-save-migration-audit-v16@51ce65c4627d6c9e67bcc7f3d9348861cc75826e`

Audit verdict:
**RISK — one concrete pre-1.0 blocker: Activity Camp state is not persisted.**

New branch:
`chat4/activity-camp-persistence-producer-v17`

Base:
`chat3/restricted-sites-production-v15@ab378d68765f7c9bbff43abf3b4b41e24df82e01`

Task:
implement explicit persisted multi-day Activity Camp state and migration/default behavior required by D36.

Required:
- max 2 camp nights per Activity entry;
- camp replaces city Night for that day;
- no city lodging charge for camp night;
- no voluntary city Night menu;
- one calendar advance exactly once per camp;
- next field day refreshes Field Time, not global Energy;
- no duplicate full city workday on return;
- Secret Debt forced Night has absolute precedence and blocks camp continuation across that boundary;
- preserve next-day Debt Energy -1.

Save contract:
- typed Camp state;
- neutral old-save default;
- deterministic resume;
- exactly-once calendar/Field Time transitions;
- persisted 2-night count;
- explicit rejection of incompatible active state rather than inferred Camp progress.

Preserve all four Activity regions, 2-Energy entry, no Activity XP, Palace firewall, Night ownership, Secret Debt semantics.

No full CI.

Deliver:
`mindy-successor/docs/tasks/CHAT4_ACTIVITY_CAMP_PERSISTENCE_PRODUCER_v17.md`

Focused QA required.
Freeze exact SHA and report:
`READY_FOR_CHAT2_ASSEMBLY`.
