# Successor — system architecture v0

Статус: архитектурный каркас, основанный на подтверждённых сильных/слабых сторонах Simply Mindy.

Этот документ НЕ фиксирует:
- полный список характеристик;
- длительность года/run;
- точные цены и зарплаты;
- семь оставшихся обычных профессий;
- содержание мини-игр;
- конкретные сюжетные сцены;
- финальный режим.

Зафиксированные игровые решения остаются в `NEW_GAME_SPEC_v0.md`.

---

## 1. Главный принцип: state layers должны быть разделены явно

### MetaState — между прохождениями

Хранит только то, что переживает завершение run:
- полученные концовки/достижения;
- meta unlocks;
- открытие 11-й профессии;
- permanent rule upgrades;
- persistent cosmetic/content unlocks;
- при необходимости — данные для carry-over bonus.

MetaState не должен хранить временные job counters, текущий сезон, ночного партнёра или quest-step текущего run.

### RunState — текущее прохождение

Хранит:
- характеристики героини;
- деньги;
- календарь;
- текущую энергию;
- жильё/rent state;
- доступные профессии;
- job progression;
- quest/story flags;
- ending eligibility/commitment;
- текущие world-state unlocks.

Полностью пересоздаётся при New Run, затем поверх него применяются meta rules.

### DayState — один день

Хранит короткоживущие вещи:
- энергия на сегодня;
- modifiers, пришедшие с прошлой ночи;
- использованные/доступные дневные hooks;
- optional daily-event offer;
- scheduled event на текущую дату;
- временные блокировки activity.

DayState не должен превращаться в ещё один persistent quest store.

### ActivityState — только для вложенной активности

Большая мини-игра/экспедиция/испытание получает собственное состояние и lifecycle.

Она не должна переиспользовать обычную Energy-переменную как внутренний HP/endurance, как это делает dungeon оригинала.

Если activity имеет endurance, это отдельное поле:
`activityEndurance`.

---

## 2. Day lifecycle

Предлагаемый lifecycle:

`StartDay`
-> вычислить сегодняшнюю Energy
-> применить previous-night modifiers
-> обновить calendar/world state
-> собрать scheduled/reactive events
-> optional day-start event
-> `DayHub`
-> activities
-> `EndDay request`
-> lodging/night resolver
-> записать next-day modifiers
-> advance calendar
-> следующий `StartDay`.

### Energy

Уже зафиксировано:
- base = 3;
- Work = 1;
- School = 1 + money;
- large activity = 2;
- night study = -1 Energy следующего дня;
- meta может увеличить daily maximum ещё на 2.

Рекомендуемая реализация:

`dailyEnergy = baseEnergy + metaEnergyBonus + temporaryMorningBonus - nightPenalty`.

Не мутировать permanent base внутри ночных сцен.

---

## 3. Explicit Event Resolver вместо listener-spaghetti

Оригинал полезно копировать на уровне идеи:
после любой activity мир должен иметь возможность отреагировать на изменившийся state.

Не копировать реализацию через десятки независимых Scene 0 update-listeners.

### Event candidate

Каждое реактивное событие описывается объектом:

- `eventId`;
- `sourceSystem` — job / quest / calendar / housing / ending / world;
- `condition(state)`;
- `priority`;
- `blocking`;
- `once / repeatable`;
- `cooldown`, если нужен;
- `transition / effect`;
- `onResolved`.

### Reaction point

После завершения любой activity:

`collect eligible events -> sort by priority -> resolve one blocking event -> queue/recheck remaining`.

Это сохраняет сильную сторону Simply Mindy:
школа может выполнить stat gate работы, dungeon/мини-игра может дать quest item, ночь может увеличить counter — и career story отреагирует сразу после возврата.

Но порядок событий становится явным и тестируемым.

### Начальный proposed priority

Это пока техническое предложение, не content decision:

1. terminal / hard forced state;
2. committed ending continuation;
3. mandatory scheduled event;
4. critical quest/career continuation;
5. normal reactive story event;
6. optional daily/world event;
7. non-blocking notifications/unlocks.

Priority хранится данными, а не порядком регистрации кода.

---

## 4. Job architecture

Каждая профессия состоит из двух независимых слоёв.

### JobDefinition — repeatable shift

Data-driven поля:
- `jobId`;
- display data;
- availability rule;
- Energy cost = 1;
- salary formula;
- base stat deltas: +A, +B, -C;
- season/world modifiers;
- Lust content gates;
- shift content pools;
- visit counter key.

Lust не входит отрицательно в salary formula.

Он используется как:
- unlock condition;
- replacement scene pool;
- variant selector;
- progression/content gate.

### CareerStateMachine — сюжет профессии

Отдельно от repeatable shift:
- states/stages;
- conditions;
- counters;
- waits;
- external quest requirements;
- night requirements;
- choices;
- ending eligibility.

Рабочая смена может изменить career state, но career progression не обязана происходить внутри shift scene.

### Availability

Для поздних jobs движок должен поддерживать несколько альтернативных gates:
- stat/build gate;
- calendar/world fallback;
- meta unlock.

Точные правила каждой будущей профессии пока не фиксируются.

### Hard Work family

У каждой обычной профессии может существовать профессиональная концовка типа **«Упорный труд»**.

MetaState считает полученные Hard Work endings.

11-я профессия открывается по отдельному meta rule, использующему этот прогресс.

Точный required count пока не фиксируется.

---

## 5. School

SchoolDefinition должен быть data-driven:

- course id;
- money cost;
- Energy cost = 1;
- stat package;
- availability requirements;
- optional special rule.

Школа — денежный sink и способ целенаправленно исправлять build.

Не связывать school code напрямую с career scenes.
После курса обычный Event Resolver сам обнаружит новые career/quest conditions.

---

## 6. Housing + Night

Это два связанных, но разных слоя.

### Lodging resolver

Определяет:
- где героиня ночует;
- стоимость;
- альтернативную цену/penalty;
- housing upgrades/meta rules;
- forced fallback при невозможности оплаты.

### Night resolver

После выбора/определения lodging собирает night events.

Нужен явный priority resolver, потому что original показывает ценность forced overrides.

Предлагаемые категории:
1. forced story/night consequence;
2. committed/critical route;
3. chosen partner/activity;
4. night study;
5. ordinary sleep.

Night result формирует `NextDayModifiers`, а не напрямую хаотично переписывает DayState следующего дня.

Пример:
`energyDeltaNextDay = -1`.

---

## 7. Calendar / world cycle

Exact run length пока OPEN.

Но Calendar API должен сразу поддерживать:
- day;
- season/world phase;
- year/cycle;
- scheduled dates;
- repeating annual/seasonal events;
- phase-based job modifiers;
- phase-based map/content availability.

Не hard-code checks вида `if day == 10` по десяткам scenes.

Использовать:
`CalendarEventDefinition { phase, dayInPhase/year, repeatRule, eventId }`.

Это позволит позже добавить successor-аналог competitions/festivals, если он нужен, без переписывания core loop.

---

## 8. Optional day-start events

Minor-crisis layer оригинала показывает полезную форму, но не обязателен как конкретный контент.

Engine стоит поддержать generic optional day event:

`chance/eligibility -> offer -> multiple approaches -> consequence -> return to DayHub`.

Если такая система войдёт в successor:
- она не расходует обычную action Energy по умолчанию;
- consequence может менять Energy;
- thresholds должны приходить из data/config;
- difficulty curve должна использовать общий calendar/run progression function;
- meta extra-time/year не должен случайно обходить scaling.

Seasonal pools должны реально подключаться через data, а не существовать unreachable branches.

---

## 9. Large Activity interface

Конкретная замена JRPG пока OPEN.

Core engine знает только контракт:

- entry eligibility;
- Energy commitment = 2;
- собственный ActivityState;
- pause/resume policy;
- rewards;
- failure outcome;
- global time interaction;
- exit result;
- emitted quest/events.

Так можно позже подключить:
- expedition;
- puzzle chain;
- tests;
- tactical challenge;
- другую mini-game;

без изменения Day lifecycle.

---

## 10. Ending architecture

Сохранить сильный паттерн оригинала:

`requirements met`
-> `ending becomes eligible`
-> `player commitment/choice`
-> `central run-ending location/event`
-> `RunResult`
-> `MetaState update`.

Не завершать run случайно в середине обычной activity только потому, что последний stat threshold достигнут.

### RunResult

Единый объект должен содержать:
- endingId;
- profession/source;
- meta unlocks awarded;
- statistics;
- optional carry-over snapshot;
- completed Hard Work marker;
- flags needed by New Run.

---

## 11. Meta progression

Разделять как минимум:

### Unlocks
Открывают новую возможность:
- 11-я профессия;
- activity;
- route;
- title/perk equivalent.

### Rule modifiers
Меняют правила:
- +daily Energy;
- housing rule;
- stat cap;
- extra time;
- alternative start.

### Starting resources
Деньги/stats/items.

### Carry-over
Часть предыдущего build.

Нужно решить позднее, являются ли earned modifiers:
- все автоматическими;
- selectable pre-run loadout;
- ограниченными slots/budget.

Архитектура должна позволять любой из трёх вариантов.

---

## 12. State changes through effects, not direct global writes

Чтобы избежать Simply Mindy-style hidden coupling, gameplay systems должны возвращать typed effects:

- `ModifyStat(stat, delta)`;
- `ModifyMoney(delta)`;
- `ModifyEnergy(delta)`;
- `SetQuestState(...)`;
- `IncrementCounter(...)`;
- `Unlock(...)`;
- `AddNextDayModifier(...)`;
- `EmitEventTag(...)`.

Event Resolver после применения effects повторно проверяет relevant conditions.

Это позволяет логировать причинность:
"School raised Charisma -> Maid career stage became eligible".

---

## 13. Data/content separation

Код движка не должен знать конкретные профессии, NPC и сцены.

Data:
- jobs;
- courses;
- calendar events;
- career graphs;
- endings;
- meta rewards;
- daily events;
- activity definitions.

Code:
- Energy lifecycle;
- calendar;
- effect application;
- condition evaluation;
- event arbitration;
- save/load;
- state transitions.

Это позволит менять мир/контент без клонирования структуры Simply Mindy scene-for-scene.

---

## 14. Minimum vertical slice

До проектирования всех 10+1 jobs достаточно собрать один slice:

1. StartDay с 3 Energy.
2. Три стартовые профессии видны, полностью реализована только одна.
3. Одна repeatable shift: salary +2/-1 stats.
4. Один School course.
5. Lodging payment.
6. Night study с -1 next-day Energy.
7. Одна career chain с внешним stat gate.
8. Explicit Event Resolver.
9. Один ending eligibility -> commitment -> central ending flow.
10. New Run с одним meta rule modifier.

После этого проверять, работает ли архитектура, и только затем масштабировать контент.

---

## 15. Что мы сознательно НЕ копируем из оригинала

- глобальную россыпь сотен напрямую связанных flags;
- десятки независимых main update-listeners без общего arbitration;
- переиспользование одной переменной Energy/Stamina для другой вложенной механики;
- hard-coded calendar checks по сценам;
- unreachable content branches;
- UI и reward logic, расходящиеся друг с другом;
- сломанные half-implemented equipment paths.

Сохраняем системные формы, а не технический долг оригинала.
