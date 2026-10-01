# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — FINISH FOREST AUTHORED DEPTH v13**
Owner: Chat 3 / Forest + Poverty Content Worker

Current PR:
- #175 — Forest authored depth v13
- queue: `TASK_CHAT3_CONTENT_QUEUE_v13.md`
- C3-133..144.

Known CI repair:
- v13 introduced calendar-season conditions in `forest-result-content-bilingual-v2.json`;
- the pack must declare `capabilities.reads.calendar: true`;
- do not weaken the typed-capability validator.
- also audit every other v13 pack for calendar conditions without the same declaration.

The previous Forest product slice is already integrated to main; do not wait on PR #162.

Finish C3-144 only when the latest exact head has full repository CI green. Freeze one focused candidate for Chat 4.
