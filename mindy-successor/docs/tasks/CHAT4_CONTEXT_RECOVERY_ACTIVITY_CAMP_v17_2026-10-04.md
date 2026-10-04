# CHAT4 CONTEXT RECOVERY — Activity Camp Persistence Producer v17

Status: **NEW CHAT RECOVERY / CONTINUE WORK**
Owner: Chat 4

Previous Chat 4 conversation reached context limit after completing:
`chat4/final-save-migration-audit-v16@51ce65c4627d6c9e67bcc7f3d9348861cc75826e`

That audit is authoritative for this recovery and found one P0 release blocker:
**Large Activity multi-day Camp has no persisted runtime state, so deterministic save/resume across camp boundaries is incomplete.**

New branch:
`chat4/activity-camp-persistence-producer-v17`

Base:
`chat3/restricted-sites-production-v15@ab378d68765f7c9bbff43abf3b4b41e24df82e01`

Why this base:
- v15 contains the complete four-region Activity runtime;
- D38 v16/v17 add ending/content layers but do not own Activity engine/schema Camp state;
- this keeps the repair narrow and lets Chat 2 selectively compose it later.

Read strictly in this order:
1. this recovery file;
2. `mindy-successor/docs/tasks/CURRENT_CHAT4_TASK_POINTER.md`;
3. `mindy-successor/docs/tasks/CHAT4_FINAL_SAVE_MIGRATION_AUDIT_v16.md`;
4. D36 in `mindy-successor/docs/USER_DECISIONS_LOCKED_v1.md`;
5. `mindy-successor/docs/tasks/CHAT3_RESTRICTED_SITES_PRODUCTION_v15.md`;
6. Night/Secret Debt locked rules in `USER_DECISIONS_LOCKED_v1.md`.

Mission:
implement explicit persisted Activity Camp state and migration/default behavior required by D36.

Required Camp semantics:
- only explicitly multi-day Activity objectives may camp;
- max 2 camp nights per Activity entry;
- camp replaces city Night for that consumed calendar day;
- city lodging is not charged for that camp night;
- ordinary voluntary city Night does not run;
- each camp advances global calendar exactly once;
- next field day refreshes Field Time, not global daily Energy;
- return from multi-day Activity does not create a second full city workday for the consumed day;
- Secret Debt precedence is absolute: bound Activity may not use camp to suppress/replace forced Debt Night;
- Activity cannot cancel the next-day Secret Debt Energy -1.

Save/migration requirements:
- explicit typed persisted Camp state;
- neutral old-save default;
- deterministic resume before/after camp choice;
- exactly-once calendar advance;
- exactly-once Field Time refresh;
- two-night limit survives save/reload;
- no duplicate lodging/payment/Night processing;
- incompatible active state must fail explicitly rather than infer Camp progress.

Do not:
- change region content/ending eligibility;
- change 2-Energy Activity entry;
- add universal Activity XP;
- alter Palace;
- weaken Secret Debt forced-Night priority;
- duplicate NightFlow.

No full CI.

Deliver:
`mindy-successor/docs/tasks/CHAT4_ACTIVITY_CAMP_PERSISTENCE_PRODUCER_v17.md`

Focused QA must cover pre/post-camp reload boundaries, old-save default, 2-night cap, calendar exactly-once, Field Time refresh, and Secret Debt interception.

Freeze exact SHA and report:
`READY_FOR_CHAT2_ASSEMBLY`.
