# Economy + Ordinary Poverty Draft v0

## Current-authority override

Current explicit decisions supersede historical numeric Secret Debt examples in this draft.

Locked:
- ordinary poverty is separate from Secret Debt;
- Secret Debt is extra/hidden and outside the 10 ordinary professions.

OPEN:
- Secret Debt trigger probability;
- offer amount;
- activation delay;
- debt amount;
- penalties/rewards.

Historical examples must not be promoted into production without a new explicit user lock.


Дата: 2026-09-25.

Статус: **PRODUCT DESIGN DRAFT**, без финальных чисел.

Покрывает: LIFE-05, LIFE-07, LIFE-09, LIFE-14 частично.

## 1. Цель экономики

Деньги должны заставлять выбирать:
- работать;
- учиться;
- улучшать жильё;
- готовиться к Activity;
- тратить на route/item;
- рисковать бедностью.

Но отсутствие денег не должно превращаться в softlock.

## 2. Базовый денежный цикл

```text
дневная Energy
-> работа/учёба/Activity
-> доход/расходы
-> night/lodging
-> следующий день
```

Starting jobs:
- всегда доступны без денежной платы за саму смену;
- позволяют восстановиться после бедности;
- не требуют предварительной покупки обязательного инструмента.

Это базовая anti-softlock гарантия.

## 3. Housing ladder

Минимальная продуктовая структура:

### A. Нормальная комната
- обычная nightly payment;
- полный normal Night menu;
- нет poverty penalty;
- может поддерживать relationship visits.

### B. Дешёвое жильё / койка / ночлежка
- дешевле;
- часть night options ограничена;
- возможны шум/соседи/малые penalties/events;
- это не failure-state.

### C. Улица
- бесплатно;
- ухудшает следующий день;
- отдельный street event pool;
- часть обычных ночных действий недоступна;
- именно здесь может один раз за run выпасть secret lender encounter.

Exact housing names/world fiction OPEN.

## 4. Street sleep

Ночёвка на улице должна быть плохой, но играбельной.

Минимально:
- money cost = 0;
- next-day Energy penalty;
- возможный volatile condition penalty, если Ухоженность/аналог будет принят;
- отдельные сезонные варианты;
- chance ordinary street encounter;
- отдельная one-time проверка Secret Debt encounter.

Не делать гарантированную тяжёлую потерю permanent stats каждую ночь: иначе бедный run быстро превращается в необратимую яму.

## 5. Secret lender remains exceptional

Secret Debt route НЕ является стандартным выходом из poverty.

Условия:
- hidden trigger tied to the approved poverty/Secret Debt boundary;
- exact trigger/repeatability policy OPEN;
- exact immediate offer amount OPEN;
- exact activation delay OPEN;
- exact debt amount OPEN;
- hidden forced/debt career remains distinct from ordinary poverty.

Обычная бедность должна работать даже если этот event никогда не выпал или игрок отказался.

## 6. Recovery from poverty

Игрок должен иметь несколько нормальных способов выбраться:

- работать на стартовой профессии;
- выбрать дешёвое жильё вместо комнаты;
- временно отказаться от школы;
- использовать заработанный item/resource;
- получить relationship help/favor;
- выполнить доступный малый paid event;
- продать допустимый resource через economic system, если такой способ утверждён.

Не делать одного NPC «спасателем бедных» обязательным.

## 7. Work / school tension

School = 1 Energy + money.

Экономическая цель:
- один учебный день должен ощущаться как инвестиция;
- если игрок постоянно учится и мало работает, запас денег реально падает;
- если только работает, деньги растут, но build/education routes отстают.

Баланс должен позволять:
- work + school + third action;
- 2–3 work actions в кризисный день;
- Activity entry вместо двух обычных actions.

## 8. Salary tiers

Не копировать original numbers.

Но сохранить принцип:
- starting jobs платят меньше;
- later/high-requirement jobs обычно платят больше;
- профильный build может повышать доход;
- разные jobs имеют разные income shapes.

Пример:
- Lumber: стабильная производительность;
- Satyr Maid: base + tips/reputation variation;
- Farm: base + seasonal production;
- Tavern: base + guest flow;
- Hunter: variable contracts/resources;
- Guard: salary + risk events;
- Geisha: patron/event spikes;
- Assassin: редкие высокие контракты;
- Merchant: variable margin/risk;
- Prostitute: client tier/reputation.

Похоть не штрафует salary.

## 9. Salary formula contract

Data-driven wage formula может использовать:
- base range;
- профильные progression stats;
- career rank;
- season/world modifier;
- event modifier.

Не использовать один global formula для всех jobs.

Sexuality может влиять на доход только тематически подходящих профессий.
Lust, если остаётся отдельным content axis, не обязана входить в salary.

## 10. Money sinks

Обязательные:
- lodging;
- school.

Вероятные:
- Activity preparation/items;
- career-specific purchases;
- gifts/relationship obligations;
- route fees;
- equipment/tools.

Не создавать shop ради самого shop.
Покупка нужна, если предмет меняет действие/route.

## 11. Ordinary poverty content

Street/cheap housing должна иметь:
- repeatable micro-events;
- несколько helpful/neutral/bad outcomes;
- seasonal variants;
- acquaintance hooks;
- route hooks.

Это отдельный content pool, не только Secret Debt.

Возможный самостоятельный outcome family:
**Street Survivor / self-made route** — если пользователь позже захочет полноценную ending за жизнь вне обычного жилья.

Пока НЕ LOCK.

## 12. Economy safety invariants

1. Игрок с 0 money и active run имеет хотя бы один достижимый способ заработать.
2. Starting job не требует money/item для базовой смены.
3. Street sleep всегда позволяет перейти к следующему дню.
4. Poverty penalties не создают mathematically inevitable permanent downward spiral.
5. Secret Debt route не является обязательной.
6. Job lock Slave route имеет собственные способы progress/exit.
7. Meta bonuses не должны полностью отменять money game после одной лёгкой ending.

## 13. Balance targets before numbers

Перед числовым pass определить:

- сколько обычных ночей покрывает starting cash;
- сколько basic lodging стоит относительно одного starting shift;
- сколько урок стоит относительно shift income;
- насколько later jobs ускоряют накопление;
- сколько дней разумно копить на expensive route/item;
- насколько тяжёл долг Secret route относительно обычной экономики.

## 14. Required simulations

До lock чисел прогнать сценарии:

### Poor start
1 work/day + street/cheap housing.

### Balanced
1 work + 1 school + 1 flexible action.

### Grinder
3 work actions/day.

### Activity-focused
Activity 2 Energy + 1 work.

### Education-focused
2 school + 1 work.

### Debt trap
Accept candidate offer -> OPEN activation delay -> OPEN debt obligation.

Смотреть:
- softlocks;
- runaway wealth;
- school starvation;
- trivial rent;
- impossible buyout.

## 15. Открыто

- exact starting money;
- housing prices;
- salary formulas;
- school prices;
- ordinary street Energy penalty;
- cheap lodging penalties;
- sale system;
- ordinary poverty endings;
- exact secret debt numbers.
