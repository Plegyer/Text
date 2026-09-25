# LIFE Requirements Traceability v0

Дата: 2026-09-25.

Статус: **PRODUCT TRACEABILITY MATRIX**.

Источник требований: `USER_VISION_AND_ACCEPTANCE.md`.

Цель: не считать технический контракт доказательством полноценной игры. Для каждого LIFE-* указано:
- что уже покрывает требование;
- чего ещё не хватает;
- какой deliverable должен закрыть пробел.

| ID | Требование | Текущее покрытие | Статус | Что ещё нужно |
|---|---|---|---|---|
| LIFE-01 | Профессия = повторяемый труд + самостоятельная разветвлённая жизнь | Job architecture + full drafts for all 10 ordinary careers | STRONG DESIGN | implementation/content proof |
| LIFE-02 | Простая трудовая судьба + сложные ветки | Hard Work + 3+ outcome families across all 10 career drafts | STRONG DRAFT | common threshold/reward hierarchy pass |
| LIFE-03 | Статы работают в нескольких системах | `TARGET_STAT_SYSTEM_v1.md`; `STAT_COVERAGE_MATRIX_v2.md`; School v1; jobs; Activity | STRONG DESIGN | exact seasonal/check numbers + implementation proof |
| LIFE-04 | Сезоны меняют игру | locked 160-day calendar + `SEASONAL_JOB_STAT_MODEL_v1.md` + career/Activity season rules | STRONG DESIGN | tune season matrix + implementation |
| LIFE-05 | Бедность = иной образ жизни | Secret Debt route + ordinary housing ladder + economy framework + career hooks | STRONG DRAFT | numeric tuning + playable poverty proof |
| LIFE-06 | Школа самостоятельная | `SCHOOL_SYSTEM_DRAFT_v1.md` with 8 tracks covering 12 stats | STRONG DRAFT | teachers, exact milestones/prices/endings + implementation |
| LIFE-07 | Ночь = выбор и последствия | Night contract + Secret Slave forced nights | STRONG DRAFT | concrete ordinary night catalog/lodging economy |
| LIFE-08 | Ночные встречи развивают линии | Relationship Draft + Satyr Maid/Lumber concrete patterns | STRONG DRAFT | concrete NPC production specs + implementation proof |
| LIFE-09 | Малые решения накапливаются | typed counters/facts; career drafts; production budget; repeat/cooldown policy | STRONG DRAFT | production implementation + tuning |
| LIFE-10 | Дополнительные занятия meaningful | Large Activity Product Role v0 + `FOREST_ACTIVITY_SLICE_v0.md` | STRONG DRAFT | implement/playtest the slice; decide full Activity scope |
| LIFE-11 | Предметы открывают возможности | `ITEM_SYSTEM_DRAFT_v0.md` + `INITIAL_ITEM_CATALOG_v0.md` + Forest/Lumber chain | STRONG DRAFT | implement/playtest capability chain |
| LIFE-12 | Отношения пересекаются с жизнью | Relationship System Draft v0 + `LUMBER_RELATIONSHIP_CHAIN_v0.md` | STRONG DRAFT | second contrasting relationship slice + implementation proof |
| LIFE-13 | Ending eligibility != immediate run end | Ending architecture v1 | STRONG | product example with multiple simultaneously eligible endings |
| LIFE-14 | NG+ меняет возможности | Meta architecture; `META_MACRO_GOAL_DRAFT_v0.md`; Palace legacy hooks | STRONG DRAFT | exact reward catalog/loadout rule + playable examples |
| LIFE-15 | Большая межжизненная цель | `META_MACRO_GOAL_DRAFT_v0.md`; `PALACE_HIDDEN_CAREER_DRAFT_v0.md` | STRONG DRAFT | concrete mystery/fragment catalog + playable late route |
| LIFE-16 | Насыщенность, но производимость | reusable systems + `CONTENT_PRODUCTION_BUDGET_DRAFT_v0.md` + staged scope | STRONG DRAFT | user release-scope lock + production tracking |
| LIFE-17 | Понятная игровая оболочка | `TARGET_GAME_SHELL_v0.md` + `PRODUCT_ACCEPTANCE_SLICE_v0.md` | STRONG DRAFT | implementation/visual validation |
| LIFE-18 | Заменяемый контент/media | M3.2 overrides + `MEDIA_PRESENTATION_CONTRACT_v0.md` | STRONG DESIGN | implementation/editor validation |

## 1. Самые крупные оставшиеся продуктовые пробелы

### A. Economy + ordinary poverty
Secret Debt route уже интересна, но LIFE-05 шире.
Нужна обычная жизнь при нехватке денег:
- улица;
- дешёвое жильё;
- временные работы/решения;
- ограничения;
- способы выбраться;
- знакомства, не связанные с секретным займом.

### D. Meta macro-goal — structural draft готов
`META_MACRO_GOAL_DRAFT_v0.md` задаёт utility-meta + persistent knowledge, fragments и Palace convergence. Осталось определить конкретную тайну, fragment catalog и финальный late route.

### E. Content production budget
Нужны квоты:
- repeatable variants per job/season;
- career milestone scenes;
- relationship stages;
- night variants;
- Activity encounter pools.

Иначе дизайн может стать непроизводимым.

## 2. Ближайшая последовательность design work

1. Seasonal stat matrix simulation/tuning.
2. Economy numeric simulation under locked 160-day calendar.
3. Exact School production table and prices.
4. Meta reward/loadout numeric catalog.
5. Relationship/NPC production roster.
6. Activity region/mechanics scope.
7. Macro knowledge fragments/lore lock.
8. Assemble full executable TЗ v1.

## 3. Acceptance discipline

Каждый следующий design document должен указывать, какие LIFE IDs он закрывает.

Перед кодовым масштабированием не достаточно иметь:
- schema;
- tests;
- synthetic adapter.

Нужно иметь хотя бы один сквозной playable content slice, где требования LIFE-01, 03, 06, 07, 10, 12, 13, 14, 17, 18 видны в реальном пользовательском потоке.
