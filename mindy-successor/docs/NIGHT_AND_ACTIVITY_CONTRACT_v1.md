# Successor — Night + Activity lifecycle contract v1

Дата: 2026-09-25.

Статус: **TARGET ARCHITECTURE CONTRACT**.

## Part A. Night lifecycle

### 1. Night — отдельный flow

Night не является просто командой "sleep = pay rent + day++".

Подтверждённый оригинал показывает, что night может:
- быть forced;
- обходить обычное меню;
- менять Energy следующего дня;
- продолжать career/relationship chains;
- зависеть от жилья;
- иметь добровольные partner/activity choices.

Поэтому Night имеет собственный `NightFlowState`.

### 2. Target phases

```text
EndDayRequested
-> PreLodgingForcedCheck
-> LodgingResolution
-> PostLodgingForcedCheck
-> VoluntaryNightChoice
-> NightEventResolution
-> NextDayModifiersFinalized
-> CalendarAdvance
-> StartDay
```

Наличие двух forced hooks — сознательно.

Так target content сможет решить:
- forced event полностью заменяет обычную ночь и rent;
- либо событие происходит после оплаты/выбора жилья.

Это не должно определяться случайным порядком handlers.

### 3. Forced night policy

Night event definition указывает intercept point:
- `before_lodging`;
- `after_lodging`;
- `after_choice`.

Также указывает:
- suppressLodgingPayment;
- suppressVoluntaryMenu;
- consumesNight;
- nextDay effects.

Это решает проблему, отмеченную в RECONCILIATION: нельзя автоматически списывать rent, если forced route должен перехватить ночь раньше.

### 4. LodgingResolution

Lodging resolver:
- перечисляет доступные варианты;
- проверяет cost/conditions;
- применяет payment atomically;
- выбирает housing context для ночи;
- может дать fallback outside sleep.

Плата не означает автоматически календарный advance.

### 5. Voluntary night activities

Примеры типов:
- обычный сон;
- night study;
- partner/relationship scene;
- специальная добровольная activity.

Night study:
- применяет свой immediate progress;
- добавляет `NextDayModifier.energyDelta = -1`;
- не мутирует завтрашнюю Energy напрямую.

### 6. Calendar advance exactly once

Одна завершённая ночь вызывает CalendarAdvance ровно один раз.

Forced event, lodging payment и voluntary choice не должны каждый отдельно увеличивать день.

NightFlowState хранит phase и `calendarAdvanceCommitted`/эквивалент invariant для idempotency.

### 7. Save/load

Save допустим в любой устойчивой night phase:
- перед выбором lodging;
- с pending forced scene;
- после оплаты, до voluntary choice;
- с pending partner scene.

После reload:
- payment не повторяется;
- RNG не перебрасывается;
- day не увеличивается повторно.

## Part B. Activity lifecycle

### 8. ActivityDefinition

Core не знает, будет ли replacement JRPG экспедицией, puzzle-system или чем-то ещё.

Он знает контракт:

```text
ActivityDefinition
  id
  entryConditions
  entryCost
  resumePolicy
  timePolicy
  failurePolicy
  resultSchema
  adapter/version
```

Уже принято: крупная activity ориентировочно использует 2 daily Energy на entry.

### 9. ActivityEnvelope

```text
ActivityEnvelope
  activityId
  definitionVersion
  status
  startedAtCalendar
  internalState
  rngState?/rngStream
  checkpoint
  pendingScene?
  accumulatedRewards
  emittedFacts
```

`internalState` валидируется adapter-specific schema.

### 10. Energy separation

Daily Energy списывается по entry contract.

Если activity имеет:
- endurance;
- moves;
- HP;
- mana;
- attempts;
- clock;

они принадлежат ActivityState и не являются aliases дневной Energy.

Это прямое исправление архитектурной неоднозначности dungeon оригинала.

### 11. Global time policy

ActivityDefinition явно указывает одно из:
- `same_day`;
- `advances_calendar_on_exit`;
- `can_advance_days_internally`;
- другой заранее поддержанный policy.

Если activity может длиться несколько глобальных дней, только Activity adapter создаёт запросы на CalendarAdvance через core lifecycle. Он не пишет day напрямую.

### 12. Activity result

Выход возвращает typed `ActivityResult`:

```text
outcome
rewards/effects
worldFacts
questFacts
careerFacts
relationshipFacts
calendarEffects
failure/escape reason
```

Core атомарно применяет result и запускает Event Resolver.

### 13. Pause/resume

Если activity разрешает resume:
- ActivityEnvelope сохраняется полностью;
- UI закрытие не означает escape;
- reload возвращает в activity;
- content version compatibility проверяется.

Если resume запрещён, это explicit policy и save command может быть ограничен только стабильными checkpoints.

### 14. Failure

Failure не должен быть "произвольной сценой".

Definition задаёт:
- terminal;
- exit to day;
- exit to night;
- loss of activity resource;
- world/career effects.

Так новая большая система сможет иметь собственную драматургию без загрязнения core.

### 15. Минимальный adapter для vertical slice

До выбора настоящей replacement system нужен test Activity:
- entry cost 2 Energy;
- internal counter/endurance;
- один choice;
- save внутри;
- resume;
- success result;
- failure/escape result;
- emitted fact, открывающий внешний career/quest event.

Это проверяет границы архитектуры, не фиксируя будущую JRPG/мини-игру.
