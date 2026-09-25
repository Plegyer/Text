# Open questions / verification queue

Короткий список реально открытых вопросов. Подтверждённые системы оригинала и уже принятые архитектурные contracts здесь не дублируются.

## Original SWF — только низкоприоритетные хвосты

1. `mazeSucceed`: принимающая D3 scene имеет branch, но direct setter в main ABC не найден.
2. Monster ID 46 пока не идентифицирован по имени; Coax outcome подтверждён как text-only "flat broke".
3. Space-pool IDs 58–59 пока не именованы; отдельного normal Coax loot coverage нет.
4. Изолированные scene-specific time-of-day события искать только при конкретной архитектурной необходимости.
5. Exhaustive atlas chest/tile/fixed actors не нужен без конкретного вопроса.

Эти пункты не блокируют successor architecture.

## Архитектура — закрыто на уровне v1 contracts

Закрыты как target contracts:
- authoritative state ownership;
- Run+Meta atomic envelope;
- declarative Condition/Effect direction;
- typed progression domains;
- Event Resolver semantics;
- Night lifecycle;
- ActivityState boundary;
- save/content migration strategy;
- architecture migration acceptance slice.

Файлы: `SUCCESSOR_SYSTEM_ARCHITECTURE_v1.md` и связанные v1 contracts.

## Открытые DESIGN decisions

Они не должны быть придуманы реализацией самостоятельно:

1. Финальный stat model: проверить рабочую гипотезу 9 progression stats + отдельная Похоть; решить, различаются ли Сексуальность и Похоть, и участвует ли Похоть в стартовом распределении.
1a. Work tradeoff rule: fixed -1 per profession или 2–3 work-style packages, каждый из которых сохраняет +2/+2/-1. Roster-wide pass рекомендует work styles, но это не user lock.
2. Ordinary roster: provisional 10 профессий теперь разведены механически; OPEN только возможное расширение roster сверх 10 и окончательные названия/fantasy framing.
3. Hidden Palace profession: identity зафиксирована как поздняя meta-job; OPEN её конкретный gameplay loop, career/endings и required Hard Work progress.
4. Run length: анализ готов; рабочая рекомендация SOL = 160 days (4x40), допустимый medium вариант = 224 days. Требуется user lock перед numeric balance.
5. Economy: qualitative model + Wage Unit framework drafted; OPEN WU currency scale, exact wages/rent/School prices, starting money, street penalty and scenario simulations after calendar lock.
6. School: draft tracks/progression готовы; OPEN exact curriculum, цены, teachers, certificates, education endings/meta rewards и нужен ли отдельный special-school equivalent.
7. Конкретная replacement large activity вместо original JRPG.
8. Нужна ли отдельная volatile Ухоженность и другие condition meters.
9. Relationship model: только stages/counters или нужны affinity/trust axes.
10. Meta rewards: hierarchy drafted; OPEN automatic / selectable loadout / slots-budget и exact reward catalog for ordinary, Secret Debt and Palace endings.
10a. Meta macro-goal structure drafted; OPEN concrete mystery, knowledge-fragment catalog, required diversity of lives and final late route.
11. Successor Final Mode / late meta mode.
12. Реальные seasonal recurring events/competitions — форма движком поддерживается, content ещё не выбран.
12a. Target UI shell: structure drafted; OPEN visual style, exact navigation/layout, media budgets, Palace discovery UX and editor UX.
12b. Item system: capability model drafted; OPEN inventory capacity, loadout slots, craft scope, vendors and first production item catalog.
12c. Palace: career role/outcome families drafted; OPEN Hard Work count, exact court role, unlock presentation and concrete rewards.
13. Secret Debt/Slave Career: точный шанс внутри 10–20%, точные суммы около 2000/20000, Energy penalty, доступность школы/большой Activity после блокировки jobs и отношение Сексуальности к Похоти.
14. Exact meta rewards трёх обязательных endings и засчитывается ли `bound_life` в общий Hard Work progress для открытия 11-й профессии.
15. Content production budget: ranges drafted; OPEN release-1 exact depth, art/media budget, NPC count and Activity regions.

## Следующий engineering gate

Если начинается реализация архитектуры, сначала выполнять только `ARCHITECTURE_MIGRATION_SLICE_v1.md`.

Не масштабировать jobs/scenes/content до прохождения:
- migration;
- typed career;
- resolver cascade;
- night exactly-once;
- resumable Activity;
- ending/meta exactly-once;
- deterministic save/reload tests.

## Правило исследования

Если гайд и SWF расходятся — механическую истину берём из SWF. Пользовательские наблюдения по прохождению фиксируем отдельно как [User playthrough]. Старый прототип и WIP — evidence/implementation history, а не молчаливое утверждение target design.
