# Relationship System Draft v0

Дата: 2026-09-25.

Статус: **PRODUCT DESIGN DRAFT**.

Основание:
- LIFE-07, LIFE-08, LIFE-12, LIFE-13, LIFE-14;
- target typed progression architecture;
- подтверждённый референсный принцип: рабочая линия может перейти в повторяемые ночные встречи и затем снова влиять на career.

## 1. Что отношения НЕ должны быть

Не делать универсальную систему:
`NPC affection = 0..100 -> heart scenes`.

Причины:
- разные персонажи требуют разных форм прогресса;
- часть связей начинается на работе, часть ночью, часть в школе/Activity;
- один числовой affinity плохо выражает доверие, обязательство, конфликт, профессиональную связь и романтический интерес одновременно.

## 2. Базовая модель

Каждый значимый NPC имеет typed RelationshipState:

```text
RelationshipState
  stage
  facts[]
  choices{}
  counters{}
  optionalMeters{}
  lastInteraction
  cooldowns
```

### Stage
Качественная стадия:
- незнакомы;
- знакомы;
- устойчивый контакт;
- близкая/конфликтная ветка;
- committed route;
- resolved.

Точные stage IDs индивидуальны для NPC.

### Counters
Только если конкретной линии нужен повтор:
- nightsTogether;
- jobsHelped;
- lessonsTaken;
- giftsAccepted;
- conflictsResolved.

Нет универсального обязательного sexCount для всех.

### Optional meters
Разрешены только когда реально полезны конкретному NPC:
- trust;
- respect;
- attraction;
- debt/favor.

Не каждый NPC обязан иметь все четыре.

## 3. Relationship Definition

```text
RelationshipDefinition
  npcId
  entryContexts[]
  stages[]
  transitions[]
  publicFacts[]
  nightEvents[]
  jobHooks[]
  schoolHooks[]
  activityHooks[]
  endingHooks[]
```

Переходы декларативны, не arbitrary flags.

## 4. Entry contexts

Отношение может начаться через:
- работу;
- школу;
- случайное city event;
- ночь;
- housing;
- большую Activity;
- предмет/доставку;
- другую relationship introduction.

Одного NPC не нужно искусственно дублировать как отдельные персонажи для разных систем.

## 5. Job -> Relationship -> Job loop

Примерный паттерн:

```text
работа знакомит с NPC
-> career scene создаёт relationship fact
-> ночью появляется добровольная встреча
-> повторные встречи/choice меняют RelationshipState
-> NPC просит внешний предмет/курс/Activity result
-> выполнение запроса меняет relationship stage
-> Event Resolver открывает новую career branch
```

Это обязательный тип межсистемной цепи для полной игры.

## 6. Night meetings

Night Resolver собирает доступные добровольные встречи после forced events/lodging.

Встреча:
- не обязана стоить дополнительную дневную Energy;
- может занять ночь;
- может дать NextDayModifier;
- имеет cooldown/history;
- может зависеть от сезона, жилья, career stage и relationship stage.

Не использовать один и тот же универсальный счётчик для всех NPC.

## 7. Consent / content routing

Для добровольных романтических/сексуальных routes:

- stat/content gate только открывает вариант;
- выбор остаётся отдельной player command;
- высокая Похоть может добавить/заменить добровольные варианты;
- Сексуальность, если станет progression stat, может влиять на уверенность/способ действия, но не означает автоматическое согласие.

Forced Secret Slave Career — отдельный системный контекст и не используется как модель обычных relationships.

## 8. Relationship archetypes

Полной игре нужны разные типы отношений:

### Professional mentor
Работа/школа -> обучение -> рекомендация -> career/status.

### Peer/partner
Совместная работа/Activity -> повторные встречи -> взаимный route.

### Patron/client
Status/economy -> обязательства -> выбор зависимости или самостоятельности.

### Rival
Конкуренция -> уважение/вражда -> альтернативные career outcomes.

### Quest relationship
NPC нуждается в предмете/информации/Activity result.

### Casual/repeatable night contact
Может остаться небольшим route и не обязан иметь ending.

Это предотвращает превращение каждого мужчины в одинаковый romance pipeline.

## 9. Relationship endings

Не каждый relationship должен иметь отдельную ending.

Для major NPC допустимы:
- совместная жизнь;
- профессиональное партнёрство;
- конфликт/разрыв с отдельным результатом;
- route-specific ending;
- contribution to job ending.

Ending eligibility остаётся отдельной от RelationshipState stage.

## 10. Cross-system requirements

Минимум для full release:

- каждая ordinary job знакомит хотя бы с одним значимым NPC;
- не менее нескольких NPC имеют night continuation;
- не менее нескольких требуют school/item/Activity hook;
- хотя бы один NPC связывает две разные профессии;
- хотя бы один relationship меняет housing/economy;
- хотя бы один relationship влияет на Palace/meta route.

Точные квоты — после content scope estimate.

## 11. Items and favors

Подарок не должен быть generic:
`gift -> +5 affection`.

Предмет может:
- решить конкретную проблему;
- открыть meeting;
- изменить route;
- быть отклонён;
- создать долг/обязательство;
- перейти в другой subsystem.

## 12. Seasons

Сезоны могут менять:
- место встречи;
- доступность NPC;
- варианты сцен;
- просьбы/задачи;
- праздники;
- relationship pacing.

Не требуется четыре полностью уникальных линии.

## 13. Failure / rejection

Отказ не обязательно уничтожает relationship.

Возможны:
- professional-only route;
- cooldown;
- rival route;
- friendship;
- окончательное закрытие конкретной ветки.

Это повышает replay value без необходимости делать каждый выбор «правильным».

## 14. Save/load

RelationshipState сохраняется полностью.

Pending meeting:
- выбранный variant не перебрасывается;
- cost/favor не дублируется;
- cooldown не сбрасывается.

## 15. Acceptance

Система отношений не считается готовой, если:
- есть только affinity number;
- romance progress возможен только через одну кнопку «флирт»;
- работа и отношения не влияют друг на друга.

Минимальный acceptance chain:

1. NPC встречается через job.
2. Career action открывает relationship.
3. Night meeting появляется через Resolver.
4. Choice меняет typed RelationshipState.
5. NPC просит внешний school/item/Activity condition.
6. Выполнение условия открывает следующую стадию без дополнительной обязательной смены.
7. Relationship меняет career outcome.
8. Отказ ведёт к альтернативному, а не обязательно сломанному пути.
9. Save/load сохраняет stage/pending/cooldown.

## 16. Открыто

- нужен ли общий UI показатель отношений;
- какие optional meters разрешить;
- список major NPC;
- relationship quotas по профессиям;
- точные ending families;
- какие relationships переживают run только как Meta knowledge/unlock.
