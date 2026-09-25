# Successor — progression + Condition/Effect contract v1

Дата: 2026-09-25.

Статус: **TARGET ARCHITECTURE CONTRACT**.

Цель: эволюционировать M3.2 declarative conditions/effects так, чтобы поддержать глубокие careers/quests/night/activity без возврата к global flag spaghetti.

## 1. Сохраняем declarative AST

Content не получает JS callbacks, eval или произвольный доступ к Save.

Condition и Effect — сериализуемые данные, валидируемые схемой.

Это позволяет:
- статическую проверку;
- inspector/editor;
- deterministic tests;
- migrations;
- read/write capability checks;
- анализ зависимостей контента.

## 2. Condition v2

Базовые логические узлы M3.2 сохраняются:

```text
all[]
any[]
not
```

Leaf conditions расширяются по typed domains.

### Character/resource

```text
stat(statId, op, value)
conditionMeter(id, op, value)
resource(resourceId, op, value)
item(itemId, op/count)
```

### Calendar

```text
calendar.year(...)
calendar.season(...)
calendar.dayInYear(...)
calendar.elapsedDays(...)
calendar.eventWindow(...)
```

### Job/career

```text
job.available(jobId)
career.stage(jobId, stageId)
career.shifts(jobId, op, value)
career.counter(jobId, counterId, op, value)
career.fact(jobId, factId, present)
career.choice(jobId, choiceId, expected)
```

### Quest

```text
quest.stage(questId, stageId)
quest.counter(...)
quest.fact(...)
quest.choice(...)
```

### Relationship/world/meta

```text
relationship.stage(...)
relationship.value(...)
worldFact(factId, present)
meta.unlock(unlockId)
meta.endingCompleted(endingId)
meta.hardWork(jobId)
```

### Flow/context

Использовать только там, где это действительно content-facing:
```text
night.context(...)
activity.result(...)
trigger.hasFact(...)
```

Content не должен читать внутренние implementation fields Event Resolver.

## 3. Никаких произвольных строковых paths

Запрещён универсальный condition вида:

`{ path: "run.progression.careers.foo.stage", ... }`

Он быстро вернёт скрытую связанность.

Каждый condition kind знает:
- домен;
- допустимые IDs;
- тип значения;
- оператор;
- read capability.

## 4. Domain manifests

Каждый content package объявляет capabilities более типизированно, чем старые `reads/writes flags`.

Пример:

```text
reads:
  stats: [strength, ...]
  careers: [lumber]
  quests: [forest_spirit]
  worldFacts: [...]
writes:
  career: [lumber]
  quest: [forest_spirit]
  worldFacts: [...]
```

Пакет job `lumber` не должен напрямую писать stage другой профессии.

Cross-system interaction идёт через public effects/facts.

## 5. Effect v2

Effects остаются whitelist-only.

### Простые ресурсы

```text
ModifyStat(statId, delta)
ModifyResource(resourceId, delta)
AddItem(itemId, count)
RemoveItem(itemId, count)
SetConditionMeter(id, value/delta)
```

### Day/night

```text
ModifyEnergy(delta)
AddNextDayModifier(modifier)
AddDayTag(tag)
```

`ModifyEnergy` меняет только текущий DayState.
Ночной штраф использует `AddNextDayModifier`, а не пишет Energy будущего дня.

### Career

```text
AdvanceCareer(jobId, transitionId)
IncrementCareerCounter(jobId, counterId, amount)
SetCareerChoice(jobId, choiceId, value)
AddCareerFact(jobId, factId)
```

Контент указывает transitionId, а career definition проверяет, разрешён ли переход из текущего stage.

Нельзя сделать:
`SetCareerStage(jobId, arbitraryString)`
из внешнего пакета.

### Quest

Аналогично:
```text
AdvanceQuest(questId, transitionId)
IncrementQuestCounter(...)
SetQuestChoice(...)
AddQuestFact(...)
```

### Relationship/world

```text
ModifyRelationship(...)
AdvanceRelationship(...)
AddWorldFact(...)
RemoveWorldFact(...)
```

### Unlock/meta

Run content не должен свободно мутировать MetaState.

Meta effects разрешены только через контролируемые операции:
- CompleteRunResult;
- AwardMetaReward;
- NewRun initialization.

Это обеспечивает exactly-once.

### Trigger/fact emission

```text
EmitReactionFact(factType, payload)
```

Используется, когда action/activity/night должен сообщить resolver о произошедшем факте без прямого изменения чужого domain state.

Пример:
`ActivityCompleted(activityId, resultTag)`.

## 6. State-machine transitions

Career/Quest definitions должны содержать список разрешённых transitions:

```text
Transition
  id
  from: StageId | StageId[]
  to: StageId
  conditions[]
  effects[]
  emits[]
```

Core валидирует:
- текущий stage входит в `from`;
- conditions выполнены;
- transition принадлежит domain;
- to известен.

Это лучше сотен boolean combinations.

## 7. Public facts вместо чужих внутренних стадий

Пример неправильной связи:

`Farmer career читает quest.internalStage == 7`.

Правильно:

Dungeon/quest после нужного результата публикует:
`worldFact: obtained_zombie_brain`
или domain-specific public fact.

Farmer career condition читает public fact.

Если факт должен быть consumable/owned — это item/worldFact, а не знание внутренней стадии чужого quest.

## 8. Counters

Counter обязан иметь owner.

Не использовать глобальные:
`sexCount`, `visitCount`, `fooCount`.

Использовать:
- `career[lumber].counters.nightMeetings`;
- `quest[aember].counters.testsPassed`;
- `relationship[satyr_barkeep].counters.nights`.

Generic actionCounts допустимы только как техническая аналитика/простые условия посещений, но длинная progression не должна от них полностью зависеть.

## 9. Conditions on transitions vs events

Разделение:

- transition conditions отвечают: может ли domain state перейти;
- event conditions отвечают: можно ли сейчас показать эту сцену;
- action conditions отвечают: доступна ли activity;
- ending conditions отвечают: стало ли окончание eligible.

Не объединять всё в один огромный event condition.

## 10. Effect transaction

Одна command/event choice применяется атомарно:

1. validate command;
2. resolve costs;
3. validate all effects against preconditions;
4. clone state;
5. apply effects in defined order;
6. run domain transitions;
7. emit reaction facts;
8. validate invariants;
9. commit new state.

Если любой шаг падает, исходный state остаётся неизменным.

## 11. Effect ordering

Для одного effect batch порядок должен быть документирован.

Предлагаемый технический порядок:
1. explicit costs/removals;
2. resources/stats/items;
3. domain-local counters/choices/facts;
4. domain transitions;
5. day/next-day modifiers;
6. emitted reaction facts;
7. eligibility/reaction pass.

Content author не должен зависеть от случайного порядка массива для конфликтующих writes.

Validator должен запрещать очевидно конфликтующие effects в одном batch.

## 12. M3.2 compatibility

Можно сохранить legacy mapping:

- `metric` -> Stat/Resource effect;
- `flag` -> migration-mapped domain fact;
- `visits` -> action history или career shifts;
- `housing` -> Housing effect.

Но target content после migration не должен продолжать создавать новые generic flags/metrics.

## 13. Validation requirements

Loader обязан находить:
- неизвестные IDs;
- незаконное cross-domain write;
- transition из невозможного stage;
- contradictory simple thresholds;
- duplicate IDs;
- event без fallback variant, если fallback обязателен;
- choice без выхода, если event design требует safe exit;
- orphan stage;
- unreachable transition по статически очевидным причинам;
- циклы без cooldown/termination там, где они могут создать resolver loop.

Не всё можно доказать статически, поэтому нужны scenario tests.

## 14. Auditability

Каждый применённый typed effect может формировать debug/audit запись:

`School.magic_course -> ModifyStat(intellect,+4)`

`ModifyStat -> career.maid transition became eligible`

Это критично для тестирования реактивной системы.
