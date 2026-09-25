# Successor — target state ownership v1

Дата: 2026-09-25.

Статус: **TARGET ARCHITECTURE CONTRACT**. Это технический контракт, а не фиксация открытых balance/content решений.

Основание:
- подтверждённые SOL-разборы Simply Mindy;
- `SUCCESSOR_SYSTEM_ARCHITECTURE_v0.md`;
- `PROTOTYPE_M3_2_REUSE_REVIEW.md`;
- существующий M3.2 SaveEnvelope/dispatch/migrations.

## 1. Один authoritative owner для каждого вида состояния

Главное правило: одно игровое значение хранится ровно в одном authoritative месте. UI, selectors и derived calculations могут его читать, но не держат независимую копию.

Особенно:
- текущая Energy хранится в одном месте;
- текущая дата хранится в одном месте;
- career stage хранится у career domain;
- quest stage хранится у quest domain;
- Meta unlock хранится только в MetaState;
- active ActivityState хранится только как часть текущего RunState.

## 2. SaveEnvelope

Целевой save остаётся единым атомарным envelope:

```text
SaveEnvelope
  schemaVersion
  contentVersion
  meta: MetaState
  run: RunState
```

Run + Meta записываются одной транзакцией. Это сохраняет сильную сторону M3.2: принятие концовки и выдача meta reward не могут разъехаться между двумя файлами.

## 3. MetaState

MetaState переживает завершение run.

Минимальные домены:

```text
MetaState
  profileVersion
  completedEndings: Set<EndingId>
  unlocks: Set<UnlockId>
  ruleModifiers: Map<RuleModifierId, value/config>
  hardWorkProgress: Set<JobId>
  persistentChoices: Map<MetaChoiceId, value>
  carryOverSnapshot?: CarryOverSnapshot
  runsStarted
  runsCompleted
```

MetaState НЕ хранит:
- текущие stats;
- деньги текущего run;
- day/year/season;
- текущую Energy;
- job shift counters;
- quest stages текущего run;
- relationship progress текущего run;
- active pending scene/activity/night phase.

MetaState может содержать только явно спроектированные persistent данные.

## 4. RunState

RunState полностью описывает текущее прохождение и должен быть достаточен для точного resume после save/load.

```text
RunState
  id
  status
  calendar: CalendarState
  character: CharacterState
  resources: ResourceState
  day: DayState
  housing: HousingState
  progression: ProgressionState
  endings: EndingState
  flow: FlowState
  rng: RngState
  history: HistoryState
```

## 5. CalendarState

```text
CalendarState
  elapsedDays
  cycle/year
  season/phase
  dayInSeason
  dayInYear
```

Что из этого хранить, а что вычислять — implementation detail. Но authoritative source должен быть один.

Target duration run пока configurable и не фиксируется этим документом.

Calendar rules должны приходить из config/ruleset, а не быть раскиданы по content scenes.

## 6. CharacterState

```text
CharacterState
  stats: Record<StatId, number>
  conditions: Record<ConditionMeterId, number/state>
  creation: CharacterCreationState
```

`stats` — только core build stats.

Не складывать сюда:
- money;
- Energy;
- career visits;
- relationship trust;
- generic work/lessons counters.

Если позже появится volatile Grooming/condition meter, он живёт в `conditions`, а не маскируется под permanent stat.

Конкретный StatId catalog остаётся OPEN до job/stat matrix.

## 7. ResourceState

```text
ResourceState
  money
  inventory
  currencies?: typed records
```

Energy сюда НЕ входит: она принадлежит DayState.

HP/MP или иные ресурсы будущей Activity не добавляются сюда автоматически. Если они существуют только внутри Activity, владельцем остаётся ActivityState.

## 8. DayState — единственный owner текущей Energy

```text
DayState
  energyCurrent
  startModifiersApplied
  temporaryTags
  optionalOfferIds
  scheduledEventIds
```

`energyCurrent` — единственное authoritative текущее значение дневной энергии.

`energyMax` НЕ хранится как вторая изменяемая величина. Он вычисляется:

```text
energyMax =
  baseEnergy
  + activeMetaRuleBonuses
  + runRuleBonuses
  + temporaryDayCapacityModifiers
```

StartDay выставляет:

```text
energyCurrent =
  clamp(energyMax + previousNightEnergyDelta + otherMorningDelta)
```

Уже принято:
- baseEnergy = 3;
- Work cost = 1;
- School cost = 1 + money;
- large Activity entry = 2;
- night study даёт -1 к следующему дню;
- meta может дать до +2 к daily Energy.

Эти решения не требуют отдельной копии Energy в RunState root.

## 9. NextDay modifiers

Не мутировать будущий DayState ночью напрямую.

В RunState хранится отдельный накопитель:

```text
nextDayModifiers:
  energyDelta
  statEffects[]
  conditionEffects[]
  tags[]
```

При `StartDay` modifiers применяются атомарно и очищаются/помечаются consumed.

Это делает ночное обучение, плохой ночлег и forced night effects повторяемыми и тестируемыми.

## 10. HousingState

```text
HousingState
  currentOption
  persistentRunUpgrades
  paymentContext
```

HousingState не является NightState.

Жильё описывает доступное/текущее условие проживания. Night flow отдельно решает, будет ли сегодня обычная оплата, forced override или специальная ночь.

## 11. ProgressionState — без общего мешка flags

```text
ProgressionState
  careers: Record<JobId, CareerRunState>
  quests: Record<QuestId, QuestRunState>
  relationships: Record<RelationshipId, RelationshipRunState>
  worldFacts: Set<WorldFactId>
  counters: typed/domain-scoped counters
```

### CareerRunState

```text
stage: CareerStageId
shifts
counters: Record<CareerCounterId, number>
choices: Record<CareerChoiceId, value>
facts: Set<CareerFactId>
```

### QuestRunState

```text
stage: QuestStageId
counters
choices
facts
```

### RelationshipRunState

Минимальная схема зависит от дизайна NPC, но ownership отдельный:
- stage/status;
- affinity/trust если нужны;
- counters;
- route choices.

Другой system не пишет `career.stage` напрямую. Он выдаёт public fact/effect, а Career transition resolver решает переход.

## 12. WorldFacts

WorldFacts — допустимый небольшой набор декларативных истин мира:
- найден объект;
- открыта область;
- NPC спасён;
- глобальный маршрут разрешён.

WorldFacts не должны становиться заменой старых `flags: Record<string, boolean>`.

Правило: если факт имеет собственный lifecycle/stage/counters — ему нужен отдельный domain state, а не boolean.

## 13. EndingState

```text
EndingState
  eligible: Set<EndingId>
  committed?: EndingId
  result?: RunResult
```

Eligibility ≠ commitment ≠ completed result.

Это сохраняет подтверждённую полезную схему оригинала:
conditions -> право -> commitment -> central completion.

## 14. FlowState

FlowState хранит только состояние незавершённой транзакции/перехода:

```text
FlowState
  pendingScene?: PendingScene
  eventQueue?: EventQueueState
  night?: NightFlowState
  activity?: ActivityEnvelope
```

Пока blocking pending существует, команды, которые нарушают transaction boundary, запрещены.

FlowState обязан полностью сохраняться.

## 15. RngState

RNG сохраняется внутри RunState и изменяется только core-функциями.

Никакого `Math.random()` в content/UI.

Один и тот же save + command должен давать тот же результат.

Для сложных activity допускаются отдельные RNG streams, но их seeds/states тоже должны быть persisted и детерминированно производиться из run RNG.

## 16. HistoryState

History — техническая история показа/кулдаунов, а не quest state.

```text
HistoryState
  events[eventId]:
    showCount
    lastShownAt
    variants[]
  actionCounts[actionId]
  auditTail?
```

Не хранить career progression в event history.

## 17. Derived selectors

Разрешённые derived values:
- energyMax;
- current season;
- job availability;
- school price after modifiers;
- ending eligibility preview;
- UI labels.

Derived value не сохраняется, если он однозначно вычисляется из authoritative state и content version.

Исключение — если значение уже было случайно выбрано и должно пережить reload. Тогда сохраняется resolved result, как M3.2 сохраняет pending variant.

## 18. State invariant

После каждой успешной команды:

1. schema valid;
2. domain ownership valid;
3. ни один ресурс не ниже разрешённого минимума;
4. один blocking flow максимум;
5. committed ending не конфликтует с active normal progression;
6. active Activity имеет валидный definition/version;
7. RNG state valid;
8. никакой pending object не ссылается на неизвестный content ID.

Эти invariants должны проверяться тестами и, для импортируемых saves, parser/migration layer.
