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

1. Финальный список core stats.
2. Остальные 7 ordinary jobs.
3. Конкретная 11-я meta profession и required Hard Work progress.
4. Точная длина run / календарные числа successor.
5. Economy: wages, school prices, lodging pressure.
6. School catalog и special-school equivalent.
7. Конкретная replacement large activity вместо original JRPG.
8. Нужна ли отдельная volatile Ухоженность и другие condition meters.
9. Relationship model: только stages/counters или нужны affinity/trust axes.
10. Meta rewards: automatic / selectable loadout / slots-budget.
11. Successor Final Mode / late meta mode.
12. Реальные seasonal recurring events/competitions — форма движком поддерживается, content ещё не выбран.

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
