# Chat 5 School + Localization Queue v3

Status: ASSIGNED
Owner: Chat 5 / School + Text Localization Content Worker
Queue depth: 12
Start from current main. C5-01..12 are historical completed work.

## Queue

### C5-13 — Repair PR #85 repository CI
Fix only the Chat 5-owned failing tests/fixtures on PR #85. Current failure is in `tests/school-natural-path-lumber-v1.test.ts`: its synthetic catalog fails with `Неизвестное медиа занятия`. Repair the test/catalog fixture without changing shared runtime, gameplay semantics or Chat 2 media ownership.

### C5-14 — Re-freeze PR #85
After the fix, run/observe exact-head repository CI. Update the Git handoff with the new frozen SHA only after `mindy-successor check` is green.

### C5-15 — Whole-School content coverage audit
Audit all eight existing courses and current teachers/content. Identify thin or missing player-facing text coverage without proposing new courses.

Existing courses:
- literacy_and_numbers
- arcana
- rhetoric_and_social
- etiquette_and_presentation
- field_craft
- physical_training
- arts_and_performance
- body_confidence

### C5-16 — Rhetoric & Social depth
Prepare additional RU/EN lesson/teacher/milestone text for the existing Rhetoric & Social course using current School identities only.

### C5-17 — Etiquette & Presentation depth
Prepare additional RU/EN lesson/teacher/milestone text for the existing Etiquette & Presentation course using current identities only.

### C5-18 — Field Craft depth
Prepare additional RU/EN School text for the existing Field Craft course, emphasizing practical exploration preparation without changing Activity mechanics.

### C5-19 — Physical Training depth
Prepare additional RU/EN School text for the existing Physical Training course without changing stat values, tuition or Energy rules.

### C5-20 — Arts & Performance depth
Prepare additional RU/EN School text for the existing Arts & Performance course and teacher-facing variants without changing curriculum mechanics.

### C5-21 — Body Confidence depth
Prepare additional RU/EN content for the existing Body Confidence course. Keep it voluntary, player-facing and distinct from Lust mechanics; do not change stats or consent-related gameplay rules.

### C5-22 — Starter-career School mapping
Map existing School courses to Satyr Maid and Undead Farm preparation opportunities, the same way C5-02 mapped Lumber. Use only existing courses/stats/identities and do not invent thresholds or producer facts.

### C5-23 — Starter-career School handoff fixtures
Prepare content-side handoff fixtures for Satyr Maid and Undead Farm using existing runtime seams where available. Missing producer/consumer identities must be recorded as gaps, not invented.

### C5-24 — School depth candidate
Open one focused candidate PR for the C5-15..23 School depth work with RU/EN parity checks, stable-ID checks and exact handoff. Keep shared runtime/UI, Save, NightFlow and career state outside Chat 5 ownership.

All technical evidence stays in Git. Personal chat output uses only:
- `Задание выполнено`
- `Задания выполнены`

Do not self-assign beyond C5-24.
