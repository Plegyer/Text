# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — ORDINARY WORK NEGATIVE-STAT TRADEOFF AUDIT / PACKET**
Owner: Chat 3
Preserve frozen School candidate: `chat3/school-body-confidence-lust-v1` @ `877927cf747ba9f69a53ddccf4373b795561f3a0`.
PR #254 remains READY_FOR_CHAT2 and must not move.

New branch: `chat3/work-seasonal-negative-tradeoffs-v1`
Base: fresh current main `04d1c0afff2dbb776fde4842d1fea6041fef4061`

## Verified current defect

Current production audit shows:
- Lumber has seasonal negative stat effects;
- the other nine ordinary profession shifts currently contain only positive stat changes.

User/Product intent is that work has tradeoffs rather than pure stat growth.
Locked direction: **do not add a negative every season**. Target roughly **2 seasons out of 4 per profession** with a negative stat tradeoff, leaving the other seasons without a negative.

## Assignment

Prepare a production-ready packet only:
- inventory all 10 current seasonal stat packages;
- identify sensible negative-stat candidates per profession and season, grounded in profession identity;
- keep Lust separate from the 12 progression stats unless explicitly authorized;
- preserve current wages, unlock gates, counters, Hard Work thresholds and career-specific events;
- flag any balance risk where repeated work could drive an important gate stat down too aggressively;
- propose the exact two negative seasons and negative stat for each profession, with balance rationale;
- provide focused regression/acceptance test plan.

Do not change runtime/content seasonal numbers until Leader accepts the exact per-profession mapping; the 2-of-4 frequency direction is already locked.
No full CI.
Freeze packet SHA and report `READY_FOR_LEADER_DECISION`.
