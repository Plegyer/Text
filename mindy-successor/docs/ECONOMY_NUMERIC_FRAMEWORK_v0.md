# Economy Numeric Framework v0

Дата: 2026-09-25.

Статус: **BALANCE FRAMEWORK / NOT FINAL NUMBERS**.

Покрывает: LIFE-05, LIFE-06, LIFE-07, LIFE-09, LIFE-16.

## 1. Не начинать с валютных чисел

Сначала балансировать через **Wage Unit (WU)**:

`1 WU = средний доход одной базовой стартовой смены`.

После этого можно выбрать внешний масштаб валюты:
- 100;
- 200;
- 500;
- другое.

Игровой баланс от этого не меняется.

## 2. Цель экономики

Игрок с обычной работой должен:
- иметь возможность оплачивать базовый ночлег;
- но не автоматически позволять себе школу + предметы + лучший дом;
- чувствовать пользу второй рабочей смены;
- иметь причину рисковать Activity/торговлей;
- иногда попадать в бедность из-за собственных решений/неудач;
- не получать softlock при 0 money.

## 3. Base relationship between wage and rent

Кандидатная рамка:

- basic wage: 1.0 WU;
- normal lodging/night: 0.8–1.3 WU;
- cheap lodging: 0.3–0.6 WU + drawback;
- street: 0 WU + stronger next-day consequence.

Почему:
одна смена примерно оплачивает одну обычную ночь, оставляя ещё 2 Energy на:
- вторую работу;
- School;
- другую жизнь.

Если rent = 2–3 WU, игрок вынужден почти весь день grind-ить.
Если rent = 0.1 WU, housing перестаёт быть системой.

## 4. Daily patterns

### Survival day
1 work + other actions.

Доход:
~1 WU.

Расход:
~normal rent.

Почти не накапливает капитал.

### Saving day
2–3 work shifts.

Net:
создаёт запас на School/items.

### School day
1 School + 1–2 work/other actions.

Требует накоплений или дешёвого жилья.

### Activity day
2 Energy Activity + 1 remaining action.

Должен быть экономически рискованнее ordinary work, но давать rare resources/routes.

## 5. School prices

Courses должны различаться по tier.

Framework:
- ordinary lesson: ~1–2 WU;
- advanced lesson/milestone: ~2–5 WU;
- certification/exam: larger one-time cost;
- special course/item may be much higher.

Это заставляет планировать, но не требует десятков дней grind на один урок.

## 6. Housing ladder

### Normal room
- stable;
- no penalty;
- baseline night menu.

### Cheap lodging
- lower cost;
- small drawback / restricted night options;
- still viable long-term poverty lifestyle.

### Street
- free;
- next-day penalty;
- unique event pool;
- secret lender chance;
- no permanent lock by itself.

Street must never be game over.

## 7. Poverty floor

Anti-softlock invariant:

С 0 money и 0 special items player может:
- sleep somewhere;
- get next day;
- access at least one basic earning action;
- eventually recover.

No starter ordinary job may require upfront money for its basic shift.

## 8. Starting money

Не фиксировать пока абсолютное число.

Target:
starting money = примерно **несколько normal nights**, не десятки.

Candidate:
~5–8 normal-lodging equivalents.

Это даёт:
- короткий safety buffer;
- свободу попробовать School/Activity;
- реальный риск потратить всё.

## 9. Wage progression

Salary growth sources:
- profile stats where thematic;
- career rank;
- seasonal demand;
- special contract;
- equipment/capability;
- reputation.

Не использовать Похоть как universal negative modifier.

Growth should be bounded so late-career player still notices expensive School/items.

## 10. Tips / variable income

Satyr Maid / Tavern / Prostitute:
- variable income allowed;
- deterministic or bounded RNG;
- relationship/status can change distribution.

Не строить весь survival на high-variance RNG.

## 11. Merchant

Merchant can outperform base wage, but through:
- tied-up capital;
- risk;
- timing;
- inventory;
- route access.

No infinite buy/sell loop.

Validation/test should detect same-tick arbitrage where possible.

## 12. Secret lender calibration

User vision currently:
- one-time rare street event;
- chance ~10–20%;
- offer ~2000;
- after 10 days demand ~20000.

Before lock compare to WU.

Required design intent:
- offer feels genuinely useful to poor player;
- repayment demand is intentionally trap-scale for an unprepared ordinary run;
- player is not falsely shown a realistic 10-day repayment plan if system intends forced debt progression.

Exact currency depends on chosen WU.

## 13. Secret Debt income lock

After Slave career activates:
- ordinary jobs blocked;
- its own income/debt mechanics take over;
- normal economy still matters for paid_freedom.

Need explicit rules:
- what fraction reaches player;
- what fraction services debt;
- whether external money can pay;
- whether items can be sold.

OPEN.

## 14. Economic endings

Money alone should not buy every ending.

But economy should directly support:
- paid_freedom;
- Innkeeper;
- Merchant House;
- Independent House;
- Farm/Lumber ownership routes.

These require both resources and career/state conditions.

## 15. Simulation metrics

For each scenario record:
- days to first poverty;
- days to recover;
- % Energy spent working;
- School lessons affordable;
- Activity entries;
- ending-ready day;
- cash at run end;
- number of forced street nights.

Target bands chosen after calendar lock.

## 16. Red flags

- optimal play = 3 work every day;
- School always worse than work;
- Street is secretly better than room;
- one high-paying career invalidates all others;
- Merchant infinite arbitrage;
- paid_freedom impossible even with deliberate saving after route begins;
- Secret Debt is accidental unavoidable punishment for ordinary beginners.

## 17. Открыто

- WU currency scale;
- actual wages;
- exact rent;
- exact School prices;
- starting money;
- cheap/street penalty;
- salary formulas;
- Slave income/debt flow;
- inflation/season price multipliers.
