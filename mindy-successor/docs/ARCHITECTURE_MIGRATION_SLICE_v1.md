# Architecture Migration Slice v1

Дата: 2026-09-25.

Статус: **IMPLEMENTATION GATE SPEC**, но не команда автоматически менять stable M3.2. Этот slice определяет, что должен доказать первый архитектурный переход после отдельного решения начать кодовую миграцию.

Основание: target architecture v1 contracts.

## 1. Цель

Не добавить контент, а доказать, что M3.2 можно эволюционировать в target architecture без rewrite-from-zero.

Slice считается успешным только если одновременно работают:
- typed state ownership;
- declarative v2 conditions/effects;
- reactive resolver cascade;
- night phases;
- resumable ActivityState;
- ending/meta exactly-once;
- save migrations.

## 2. Scope

Использовать минимальный synthetic/test content.

Не переносить массово:
- старые jobs;
- M3.3 seasonal text;
- баланс;
- новые 7 профессий;
- полный stat redesign;
- реальную JRPG replacement.

## 3. Target test state

Минимум:

```text
SaveEnvelope
  MetaState
  RunState
    CharacterState
    ResourceState
    DayState
    ProgressionState
      careers.test_job
      quests.test_quest
    EndingState
    FlowState
    RNG
```

Test Career имеет stages:
`new -> introduced -> ready -> completed`.

## 4. Migration from M3.2

Нужен явный development migration fixture из schema 3 M3.2.

Проверить:
- stats/resources не смешиваются после migration;
- Energy переносится в единственный DayState owner;
- known legacy flags переводятся в test typed facts;
- pending M3.2 event сохраняет выбранный variant;
- RNG сохраняется;
- Meta completed/unlocks не теряются;
- legacy fields, которым нет target owner, либо mapped, либо documented dropped compatibility field.

Не пытаться автоматически решить реальный будущий stat mapping.

## 5. Condition/Effect v2 proof

Test content использует:
- stat condition;
- career stage;
- career counter;
- quest fact;
- meta unlock;
- all/any/not.

Effects:
- ModifyStat;
- ModifyEnergy;
- IncrementCareerCounter;
- AdvanceCareer;
- AddQuestFact;
- AddNextDayModifier;
- EmitReactionFact.

Ни одного нового generic boolean flag для progression slice.

## 6. Cross-system progression test

Scenario:

1. Career `test_job` находится в stage `introduced`.
2. Для transition в `ready` нужен stat threshold.
3. School action повышает stat.
4. School не вызывает career code напрямую.
5. Effect создаёт StatChanged/reaction facts.
6. Resolver видит career event.
7. Pending career scene появляется сразу после school resolution.
8. Choice переводит career в `ready`.

Это обязательный proof замены original main-listener behavior.

## 7. Cascade test

Choice первой career scene:
- добавляет QuestFact;
- этот факт делает eligible второй event;
- после resolution первого события Resolver автоматически запускает второй blocking event;
- никакой новой обычной action команды между ними не требуется.

Проверить deterministic order.

## 8. RNG/reload test

До probabilistic candidate:
- сохранить state;
- выполнить command;
- сохранить pending result.

Отдельно:
- загрузить исходный state;
- выполнить тот же command.

Оба результата идентичны.

Reload уже pending state не перебрасывает:
- chance;
- variant;
- choices snapshot, если он фиксируется.

## 9. Night tests

### A. forced before lodging

- EndDayRequested;
- forced event eligible at `before_lodging`;
- rent не списывается;
- voluntary menu не показывается;
- event добавляет NextDayModifier;
- calendar advances once.

### B. normal paid night

- forced event отсутствует;
- lodging payment списывается один раз;
- игрок выбирает night study;
- immediate study effect применяется;
- next-day Energy delta -1;
- calendar advances once;
- StartDay применяет modifier.

Save/reload проверить:
- после payment до night choice;
- с pending forced scene.

Никаких повторных расходов.

## 10. Activity test adapter

Synthetic Activity:
- entry cost = 2 daily Energy;
- internal endurance = 3;
- внутреннее действие уменьшает endurance, не daily Energy;
- save/resume внутри;
- success возвращает QuestFact;
- escape возвращает другой result;
- result запускает Event Resolver.

Проверить, что Activity internal state versioned.

## 11. Ending test

Scenario:

1. Conditions выполнены.
2. Ending регистрируется eligible.
3. Run остаётся active.
4. Player commits ending.
5. Normal progression больше не перехватывает flow.
6. Central completion создаёт RunResult.
7. RunResult выдаёт meta reward ровно один раз.
8. Reload до/после completion не дублирует reward.
9. New Run сохраняет Meta и сбрасывает Run domains.

## 12. Event priority tests

Покрыть одновременно eligible:
- terminal;
- forced;
- critical progression;
- optional.

Проверить class ordering.

Внутри одного class:
- numeric priority;
- stable tie-break.

## 13. Cascade loop protection

Synthetic A -> B -> A chain должна:
- остановиться по technical cap/loop detection;
- вернуть diagnostic trace;
- не сохранить частично повреждённый state как успешную command.

## 14. Content validation tests

Reject:
- illegal cross-domain write;
- unknown stage/transition;
- generic arbitrary state path;
- orphan stage;
- missing referenced content ID;
- duplicate IDs;
- impossible simple threshold contradiction;
- activity result unknown to adapter;
- migration alias collision.

## 15. Out of scope

Этот slice НЕ определяет:
- реальные профессии;
- реальный список статов;
- balance;
- новый Final Mode;
- production UI;
- полноценный event editor;
- финальную структуру всех NPC relationships.

## 16. Acceptance gate

До масштабирования content должны пройти все категории:

- schema/state ownership;
- migration;
- transaction rollback;
- deterministic RNG;
- Event Resolver;
- cascade;
- night exactly-once;
- Activity save/resume;
- ending/meta exactly-once;
- validation.

Если для прохождения slice приходится добавлять generic escape hatch вроде arbitrary path writes или JS callbacks, target contract считается нарушенным, а не "временно упрощённым".
