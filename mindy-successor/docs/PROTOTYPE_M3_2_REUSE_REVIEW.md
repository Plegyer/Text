# Prototype M3.2 reuse review — SOL side

Дата: 2026-09-25.

Статус: архитектурная сверка, НЕ команда на реализацию и НЕ окончательное ТЗ.

Основание:
- `ASTRA_HANDOFF.md`;
- `prior-work/astra/RECONCILIATION.md`;
- M3.2 architecture/schema/engine/content/persistence;
- M3.2 engine/content/migration tests;
- M3.3 patch только как исторический WIP;
- текущие SOL research/docs.

## Итог

M3.2 не следует выбрасывать и не следует считать целевой архитектурой полной игры.

Правильная стратегия:
**сохранить технически удачный фундамент, расширить его под глубину подтверждённых систем оригинала, заменить устаревшие design assumptions и удалить compatibility debt только через явные migrations.**

---

## 1. Сохранить

### Pure core boundary

M3.2 уже правильно отделяет:
- `src/core`;
- UI;
- Electron/storage;
- content data;
- presentation overrides.

Core не зависит от DOM/Electron/system time. Это соответствует целевой архитектуре и должно сохраняться.

### Declarative conditions

Существующая схема `Condition` уже лучше original listener-spaghetti:
- metric;
- visits;
- flag;
- season;
- housing;
- unlock;
- item;
- all/any/not.

Условия валидируются Zod и не используют eval/JS functions.

Это нужно сохранить как основу, а не заменять `condition(state)` callbacks из раннего SOL architecture v0.

### Whitelisted effects

M3.2 не позволяет content JSON выполнять произвольный код.

Effects ограничены известными типами:
- metric;
- flag;
- item;
- housing.

Подход правильный. Набор effect types нужно расширять, но whitelist оставить.

### Content read/write contracts

Pack declares `reads` / `writes`, loader запрещает неизвестные/неразрешённые flag accesses.

Это полезная защита от скрытой связанности и должно сохраниться.

### Deterministic ordering

Существующий scheduler имеет стабильный tie-break:
1. priority descending;
2. least-recent history;
3. event id.

Это хорошая база для будущего Event Resolver.

### Saved RNG

`run.rng` хранится в save.

Одинаковое действие после save/load даёт одинаковый probabilistic result; это явно покрыто engine test.

Это обязательное свойство будущей игры.

### Pending scene persistence

`run.pending = {eventId, variantId}` сохраняет уже выбранную постановку.

Пока pending открыта:
- другое действие запрещено;
- sleep запрещён;
- повторный выбор после resolution невозможен.

Это хороший transaction boundary.

### Immutable command model

`dispatch` сначала делает `structuredClone(input)`, затем либо возвращает новый Save, либо бросает ошибку.

При нормальном использовании невалидная команда не мутирует исходный save.

Этот command model следует сохранить.

### Atomic Run + Meta envelope

Run и Meta находятся в одном SaveEnvelope.

Accept ending:
- завершает run;
- записывает acceptedEnding;
- добавляет completed;
- выдаёт unlock;
- возвращает одно новое состояние.

Это хороший фундамент для exactly-once meta reward semantics.

### Explicit save migrations

M3.2 содержит явные schema migrations вместо попытки угадать версию по UI/state shape.

Это обязательно сохранить.

### Meta rollback protection

При импорте старого save текущие persistent unlocks/completed merge-ятся с загружаемыми.

Старая запись не должна стирать уже заработанный meta progress.

Подход полезный, хотя правила merge для будущих типов meta state нужно формализовать отдельно.

### Presentation overrides separated from mechanics

Пользовательские замены текста/медиа не могут менять IDs/conditions/effects.

Это хорошая граница modding/presentation и mechanics.

---

## 2. Расширить

### Event Resolver

Текущий M3.2 scheduler делает:

`action trigger -> collect candidates -> sort -> pick first passing chance -> one pending event`.

Этого недостаточно для подтверждённой Simply Mindy-style reactive progression, где:
- школа может открыть career event;
- night может изменить counter;
- large activity может выдать quest fact;
- после resolution одного event другой уже может стать eligible.

Нужно расширить до явной reaction pipeline:

`apply command/effects`
-> `emit domain facts/triggers`
-> `collect eligible events`
-> `stable arbitration`
-> `resolve one blocking event`
-> после resolution повторно проверить очередь.

Нужны:
- стабильное разрешение одинакового priority;
- максимальная глубина cascade;
- защита от event loops;
- политика для оставшихся eligible events;
- сохранение queue/pending state при необходимости.

### Trigger model

Сейчас `event.trigger` — массив action IDs.

Нужно расширить trigger vocabulary, например:
- action completed;
- stat threshold crossed;
- career state changed;
- quest fact added;
- day started;
- night resolved;
- calendar date/season changed;
- activity result returned;
- ending became eligible.

Не превращать это в произвольные callbacks.

### Typed domain state

Текущий `flags: Record<string, boolean>` полезен для прототипа, но недостаточен для десятков длинных career/night/quest chains.

Нужно перейти от общего мешка flags к ownership:

- `careers[jobId]`;
- `quests[questId]`;
- `relationships[npcId]`;
- `worldFacts`;
- `calendarState`;
- `housingState`;
- `endingState`.

Внешние системы читают public facts/conditions, но не должны напрямую переписывать чужой internal stage.

Boolean flags остаются допустимы как небольшой leaf-mechanism, но не основной representation всей progression.

### Effect types

Whitelist расширить typed effects:
- ModifyStat;
- ModifyMoney;
- ModifyEnergy;
- AddNextDayModifier;
- AdvanceCareer;
- AdvanceQuest;
- IncrementCounter;
- AddWorldFact;
- Unlock;
- AddItem;
- SetHousing;
- EmitTrigger/EventFact.

Каждый effect должен иметь owner/domain validation.

### ActivityState

M3.2 не имеет полноценной вложенной large activity.

Нужен отдельный state contract:
- activity id/type;
- internal state;
- resume data;
- result;
- exit/failure reason;
- emitted facts/rewards.

Важно: внутренняя endurance не должна быть той же переменной, что daily Energy.

### Night resolver

M3.2 sleep сразу совмещает payment + night + next day.

Для полной игры этого мало.

Нужно отделить:
- forced night interception;
- lodging/payment;
- voluntary night choice;
- night result;
- next-day modifiers.

Порядок forced night vs rent должен быть отдельным design decision. Оригинал показывает, что forced override может происходить до обычной оплаты.

### Calendar

Технический API календаря сохранить, но сделать конфигурируемым.

Текущие 28-day seasons / 112-day years / 448-or-560 limits — исторический баланс M3.2, не целевой requirement.

Calendar events должны быть data-driven, а не hard-coded по scenes.

### Save content evolution

Schema migration есть, но будущая игра потребует различать:
- save schema version;
- content version;
- migration of IDs/data;
- removal/rename of jobs/quests/events;
- pending scene compatibility.

Нельзя просто отклонять старый save из-за нового content ID без migration policy.

---

## 3. Заменить

### Stat set

M3.2 использует 11 stats:
strength/endurance/dexterity/perception/intelligence/magic/empathy/persuasion/composure/organization/lust.

Это историческая design iteration.

SOL `STAT_SYSTEM_DRAFT_v0` предлагает другую 9-stat модель, но она тоже пока draft.

До job/stat matrix ни одна схема не становится target.

Engine должен позволять заменить stat catalog через migration, а не впекать сегодняшний список в десятки union types навечно.

### Calendar balance

Заменить historical:
- 28 дней в сезоне;
- 448 дней обычный run;
- 560 с calendar unlock.

Целевая длина run пока OPEN.

### Starting jobs/content

Historical M3.2 jobs:
- tavern;
- lumber;
- hunt.

Current accepted start concept:
- лесоруб в артели гномов;
- служанка в баре сатиров;
- помощница на ферме у нежити.

Старый tavern/hunt content не считать автоматически целевым.

### Legacy rewards

M3.2 и WIP M3.3 содержат старые unlocks/rewards вроде guild/scholar/vitality/lumber-strength.

Это не принятый meta design.

Сохранить механизм unlock/reward, но заменить конкретный каталог после design lock.

### Generic metrics bag

`metrics` сейчас смешивает:
- core stats;
- money;
- energy;
- health/stress/debt;
- work/lessons/alchemy/trust.

Для полной игры лучше разделить:
- stats;
- resources;
- skill/progression domains;
- relationship/career state.

Иначе новый общий "metrics" станет тем же global bag, от которого мы пытаемся уйти.

---

## 4. Удалить/не переносить автоматически

### slot as compatibility field

M3.2 уже перестал использовать slot как реальный limiter; Energy — единственный дневной бюджет.

В target schema slot не нужен, если никакой UI/logic больше от него не зависит.

Удалять только через migration.

### Obsolete compatibility health/stress fields

README/architecture прямо отмечает, что health/stress — compatibility fields и новый content не должен ими пользоваться.

Если целевая игра не вернёт осмысленную health/stress систему, не тащить эти поля дальше бесконечно.

### Old balance constants

Не переносить:
- rents;
- wages;
- stat gains;
- 24/48 shift thresholds;
- старые starter money;
- old energy unlocks;

только потому, что они уже реализованы.

### WIP M3.3 as a patch set

Не применять `wip-m3.3/changes.patch` автоматически.

Отдельные идеи/изменения можно cherry-pick концептуально только после сверки с target design.

---

## 5. Коррекция SOL architecture v0

После просмотра M3.2 ранний `SUCCESSOR_SYSTEM_ARCHITECTURE_v0.md` нужно считать полезным conceptual draft, но не implementation baseline.

Особенно:

### Energy ownership

Не хранить независимые копии Energy в RunState и DayState.

Должен быть один authoritative value.

Практичный вариант:
- Energy хранится внутри текущего run/day substate;
- UI и selectors только читают его;
- `energyMax` вычисляется из base + meta + temporary modifiers.

### Conditions

Заменить формулировку `condition(state)` на declarative condition AST, расширяя существующий M3.2 `Condition`.

### Effects

Использовать typed declarative effects на основе существующего M3.2 effect whitelist.

### Event resolver

Не писать новый resolver с нуля, а эволюционировать существующие:
- deterministic sorting;
- saved RNG;
- pending scene;
- cooldown/history;
- variant resolution.

### Run/Meta atomicity

Сохранить единый SaveEnvelope и exactly-once semantics существующего accept ending.

### Save migrations

Migration compatibility должна войти в target architecture с самого начала, а не добавляться после vertical slice.

---

## 6. M3.2 tests as executable specification fragments

Текущие тесты уже закрепляют полезные invariants:

- 10 распределяемых стартовых очков;
- action transaction rollback on failure;
- Energy как единственный day action budget;
- sleep отдельно меняет день;
- pending event blocks concurrent actions;
- pending variant survives reload;
- ending reward выдаётся только принятой ending;
- current Meta не стирается старым imported save;
- RNG deterministic across reload;
- cooldown/history survive reload;
- invalid/incompatible saves rejected;
- declarative all/any/not conditions compose;
- pack validation rejects duplicate IDs, undeclared writes, contradictory thresholds, missing fallback/free exit/media.

Не все эти gameplay numbers останутся, но сами invariant classes полезны для target tests.

---

## 7. DS-REF-001

DS-REF-001 принят и проверен как набор 12 арифметических reference cases.

Он полезен как historical evidence/fixture для подтверждённых формул оригинала:
- HP;
- MP;
- dungeon gate;
- Farmer gate;
- early job gate.

Он НЕ является тестом successor engine и не должен задавать target balance/stat formulas.

Повторно выполнять его нет смысла.

---

## 8. Следующий архитектурный шаг

До исполнительного ТЗ не нужно продолжать feature development M3.2.

Нужно сначала зафиксировать target contracts:

1. authoritative state ownership;
2. typed progression domains;
3. declarative Condition/Effect v2;
4. Event Resolver semantics;
5. Night lifecycle;
6. ActivityState interface;
7. save/content migration strategy.

После этого можно составить migration plan:
`M3.2 schema -> target schema`

и только затем продолжать vertical slice.

Это позволит использовать уже работающий фундамент без наследования старого дизайна и без нового rewrite-from-zero.
