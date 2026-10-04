# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — ACTIVITY / SECRET DEBT ENERGY COMPAT AUDIT v19**
Owner: Chat 3

Completed reachability audit:
`chat3/activity-ending-reachability-audit-v18@7ae7a9b273f1806ac04b566c318896783bab6595`

v18 verdict:
- all three D38 endings are structurally reachable in 160 days;
- ~5 Activity entries is a credible mid-prep reference;
- <=10 entries remains healthy;
- Network is naturally later;
- one high integration risk remains: Street Energy penalty + Secret Debt next-day Energy penalty may stack and make the locked 2-Energy Activity entry unavailable while bound.

New branch:
`chat3/activity-secret-debt-energy-compat-audit-v19`

Task:
resolve that risk from repository truth and locked D19/D35/D36/D44 rules.

Determine exactly:
- whether Street next-day Energy -1 and Secret Debt next-day Energy -1 stack;
- minimum Energy a bound player can have on the next day;
- whether a bound player can ever be prevented from entering a normally available 2-Energy Activity solely by the combination;
- whether D19's Activity-availability guarantee requires clamping, sequencing, suppression, or no change;
- exact save/reload and Night-boundary tests needed.

Audit all relevant engine/Night/Secret Debt/Activity seams.
Do not implement runtime.
Do not weaken Street consequences or Secret Debt consequences without explicit Product authority.
Do not change 2-Energy Activity entry.

Deliver:
`mindy-successor/docs/tasks/CHAT3_ACTIVITY_SECRET_DEBT_ENERGY_COMPAT_AUDIT_v19.md`

Report one of:
- `PASS_NO_CHANGE`
- `READY_FOR_PRODUCT_DECISION`
- `RUNTIME_BLOCKER_FOUND`

No full CI.
