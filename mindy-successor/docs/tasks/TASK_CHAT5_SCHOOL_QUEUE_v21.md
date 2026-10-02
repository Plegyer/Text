# Chat 5 School Queue v21 — Current School Accessibility Debt Cleanup

Status: **ACTIVE CURRENT-PRODUCT FIX**
Owner: Chat 5 / School + Text Localization
Queue: C5-229..234
Target: four verified active School accessibility localization defects

Start branch:
- `chat5/school-accessibility-debt-v21`
- branch from the exact Lead coordination commit publishing this queue.

Authority:
- `../school-prep/SCHOOL_CURRENT_MAIN_VISIBLE_LOCALIZATION_DEBT_V1.md`
- current exact School course labels and active presentation alt keys.

Scope is intentionally narrow. Fix only the four already-verified active accessibility alt keys:
1. `presentation.static.school-course-literacy-and-numbers.alt`
2. `presentation.static.school-course-etiquette-and-presentation.alt`
3. `presentation.static.school-course-arcana.alt`
4. `presentation.static.school-course-arts-and-performance.alt`

C5-229 — re-query current main and prove the four debts still exist before edit.
C5-230 — correct RU Literacy wording to current course identity and RU Etiquette wording to current course identity.
C5-231 — correct EN article grammar for Etiquette, Arcana and Arts & Performance.
C5-232 — add focused regression proving all four active alt keys resolve in RU/EN with current course identity wording.
C5-233 — prove zero mechanics/course/teacher/media/Save/NightFlow/School producer-authority drift.
C5-234 — exact focused candidate handoff. If required CI still fails before runner steps, hold the exact head unchanged and record infrastructure-blocked status; do not mutate code merely to trigger CI.

No new School content, curriculum, teacher, threshold, producer fact, career state, presentation asset, NightFlow rule or gameplay mechanic.
