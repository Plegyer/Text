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
| LIFE-01 | Профессия = повторяемый труд + самостоятельная разветвлённая жизнь | Job architecture v1; roster; per-job loops/outcome families | PARTIAL | хотя бы одна полная career spec с stages/conditions/scenes |
| LIFE-02 | Простая трудовая судьба + сложные ветки | Hard Work rule; 3+ outcome families per job | PARTIAL | thresholds/reward hierarchy + full example |
| LIFE-03 | Статы работают в нескольких системах | Stat Coverage Matrix; School; Activity; jobs | PARTIAL | final stat lock + concrete checks/deltas |
| LIFE-04 | Сезоны меняют игру | Calendar architecture; job matrix; Activity role | PARTIAL | seasonal content rules + economy/calendar numbers |
| LIFE-05 | Бедность = иной образ жизни | Secret Debt/Slave route; housing/night architecture | PARTIAL | ordinary non-secret poverty loop + economy model |
| LIFE-06 | Школа самостоятельная | School System Draft v0 | PARTIAL | curriculum/numbers/NPCs/endings |
| LIFE-07 | Ночь = выбор и последствия | Night contract + Secret Slave forced nights | STRONG DRAFT | concrete ordinary night catalog/lodging economy |
| LIFE-08 | Ночные встречи развивают линии | Relationship Draft + Night resolver | PARTIAL | major NPC specs and examples |
| LIFE-09 | Малые решения накапливаются | typed counters/facts, repeatable job/events, relationships | PARTIAL | micro-event content policy/quotas |
| LIFE-10 | Дополнительные занятия meaningful | Large Activity Product Role v0 | PARTIAL | choose actual mechanics and playable product slice |
| LIFE-11 | Предметы открывают возможности | Activity item rules; job hooks | PARTIAL | item system/catalog contract + concrete cross-system examples |
| LIFE-12 | Отношения пересекаются с жизнью | Relationship System Draft v0 | PARTIAL | concrete multi-system relationship chain |
| LIFE-13 | Ending eligibility != immediate run end | Ending architecture v1 | STRONG | product example with multiple simultaneously eligible endings |
| LIFE-14 | NG+ меняет возможности | Meta architecture + reward philosophy | PARTIAL | meta catalog/loadout rule + examples |
| LIFE-15 | Большая межжизненная цель | Palace + Activity/meta hooks | EARLY | define meta macro-goal |
| LIFE-16 | Насыщенность, но производимость | reusable variants/history/cooldowns/data-driven | PARTIAL | content budget/quotas and production plan |
| LIFE-17 | Понятная игровая оболочка | M3.2 shell precedent + vision | WEAK/PARTIAL | explicit target UI flow + product acceptance slice |
| LIFE-18 | Заменяемый контент/media | M3.2 presentation overrides + target architecture | STRONG FOUNDATION | target media slot contract/versioning |

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

### B. Concrete first career
Есть roster и architecture, но ещё нет одной профессии, расписанной достаточно глубоко для content production.

Лучший кандидат для первой полной spec:
**лесоруб у гномов**, потому что:
- стартовый;
- физически понятный;
- уже есть исторический prototype content, который можно использовать только как implementation reference;
- легко проверить season/item/relationship/Activity hooks.

### C. Target UI shell
Техническое ядро не доказывает LIFE-17.
Нужен отдельный документ:
- main scene;
- HUD;
- work/school/activity/night access;
- pending scene presentation;
- media swaps;
- stats/journal/inventory;
- ending commitment.

### D. Meta macro-goal
Palace — хороший late job, но ещё не является всей LIFE-15.
Нужно решить, что несколько жизней в итоге позволяют сделать/понять/изменить.

### E. Content production budget
Нужны квоты:
- repeatable variants per job/season;
- career milestone scenes;
- relationship stages;
- night variants;
- Activity encounter pools.

Иначе дизайн может стать непроизводимым.

## 2. Ближайшая последовательность design work

1. Economy + ordinary poverty.
2. Target UI/game shell.
3. One full career spec (Lumber recommended).
4. Item system.
5. Concrete relationship chain attached to that career.
6. Concrete Activity slice attached to same chain.
7. Meta reward catalog / macro-goal.
8. Calendar/economy numerical pass.
9. Content budget and full executable TЗ.

## 3. Acceptance discipline

Каждый следующий design document должен указывать, какие LIFE IDs он закрывает.

Перед кодовым масштабированием не достаточно иметь:
- schema;
- tests;
- synthetic adapter.

Нужно иметь хотя бы один сквозной playable content slice, где требования LIFE-01, 03, 06, 07, 10, 12, 13, 14, 17, 18 видны в реальном пользовательском потоке.
