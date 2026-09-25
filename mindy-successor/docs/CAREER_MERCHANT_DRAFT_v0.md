# Merchant Career Draft v0 — торговка

Дата: 2026-09-25.

Статус: **FULL CAREER DESIGN DRAFT**, не финальный контент и не баланс.

Покрывает: LIFE-01, LIFE-02, LIFE-03, LIFE-04, LIFE-05, LIFE-06, LIFE-09, LIFE-10, LIFE-11, LIFE-12, LIFE-13, LIFE-14, LIFE-16.

## 1. Системная роль

Торговка — не shop UI.

Это профессия про:
- закупку;
- оценку;
- спрос;
- маршруты;
- поставщиков;
- риск;
- сезонные дефициты;
- сеть клиентов;
- предметы как возможности.

Она должна быть центральной экономической профессией игры.

## 2. Repeatable shift

Cost:
- 1 Energy.

Shift pools:
- рынок;
- оценка партии;
- переговоры;
- доставка;
- расчёт;
- поиск покупателя;
- complaint;
- shortage;
- storage;
- посредничество.

Кандидатные axes:
- Смекалка;
- Обаяние/Манеры;
- вторично Разум.

Exact +2/+2/-1 OPEN.

## 3. Economy loop

```text
source
-> acquire/contract
-> choose market/timing
-> sell/barter/use
-> reputation/network
```

Не нужен тяжёлый spreadsheet economy.
Игрок должен принимать понятные решения о:
- риске;
- времени;
- сезонности;
- liquidity;
- relationships.

## 4. Seasons

Spring:
- reopening routes;
- shortages after winter.

Summer:
- high travel;
- perishable goods;
- festival prep.

Autumn:
- harvest abundance;
- speculation;
- storage.

Winter:
- scarcity;
- high margins;
- route closures.

Season must change actual opportunities/prices/contracts.

## 5. Career state machine

### M0 — Stall Hand
Простые продажи/поручения.

### M1 — Independent Trader
Собственные малые сделки.

### M2 — Networked Merchant
Несколько suppliers/markets.

### M3A — Veteran
Стаж/стабильная торговля.

### M3B — Merchant House
Сеть/склад/помощники.

### M3C — Speculator / Smuggler
Высокий риск, дефицит, серые маршруты.

### M3D — Patron of Routes
Связать несколько production systems и открыть устойчивую supply network.

### M4 — Outcome-ready

## 6. Outcome A — Hard Work

Стабильная торговая жизнь.

Reward:
- early supplier;
- appraisal tool option;
- starting trade contact.

## 7. Outcome B — Merchant House

Требует:
- capital/reputation;
- School accounting;
- at least several suppliers;
- solve logistics crisis.

Outcome:
- крупная сеть/дом.

Reward:
- economy/logistics rule option.

## 8. Outcome C — Speculator / Smuggler

Требует:
- seasonal shortages;
- covert contact;
- Guard/Assassin interaction;
- risk acceptance.

Это не автоматически "evil".

Может дать:
- огромную прибыль;
- network;
- legal consequences.

## 9. Outcome D — Patron of Routes

Смысл:
торговка связывает мир, а не просто богатеет.

Требует inputs from:
- Lumber;
- Farm;
- Hunter;
- Activity;
- Tavern.

Outcome:
- new supply network;
- world accessibility;
- possibly Palace contract.

## 10. Poverty

Merchant — профессия, которая должна сильно взаимодействовать с бедностью, но не быть instant escape.

Early constraints:
- нужен минимальный оборот;
- риск потерь;
- дешёвые товары/бартер.

Можно начать через:
- work-for-commission;
- borrowed stock;
- supplier relationship.

Secret Debt route может использовать торговые knowledge/items, но active lock blocks ordinary Merchant work.

## 11. Items

Core tools:
- Appraisal Scales;
- manifests;
- crates/containers;
- permits;
- sample kits.

Merchant может открывать sources других items, но не продавать весь каталог автоматически.

## 12. School

Accounting:
- essential advanced route.

Rhetoric:
- negotiation.

Literacy:
- contracts.

Etiquette:
- elite customers/Palace.

Arcana:
- magical goods appraisal.

## 13. Activity

Activity supplies rare goods/routes.

Merchant preparation gives:
- tools;
- contracts;
- buyers;
- extraction needs.

Activity result becomes economically meaningful.

## 14. Relationships

Roles:
- supplier;
- rival;
- buyer;
- caravan leader;
- lender.

Relationship may change:
- credit;
- exclusivity;
- risk;
- route.

Не generic affinity.

## 15. Cross-jobs

Lumber:
wood/tools.

Farm:
ingredients/food.

Hunter:
rare goods.

Tavern:
buyers/rumours.

Guard:
permits/smuggling.

Geisha:
luxury/art goods.

Assassin:
covert sourcing.

Palace:
high-status contracts.

## 16. Example chain

```text
Merchant shift
-> winter shortage
-> Farm offers limited supply
-> Tavern reports demand
-> Guard restricts route
-> Activity opens alternate route
-> player chooses legal scarcity / smuggling / community contract
-> Merchant House / Speculator / Patron endings diverge
```

## 17. Acceptance

1. trade has decisions beyond click-to-profit;
2. season changes economy;
3. item capabilities central;
4. School matters;
5. at least three producer jobs feed Merchant;
6. Guard affects legal risk;
7. Activity changes routes;
8. poverty not trivialized;
9. Hard Work independent of big network;
10. House/Speculator/Patron distinct;
11. multiple endings eligible;
12. commitment separate;
13. save/load transactions exactly once.

## 18. Открыто

- price model;
- inventory capacity;
- credit/debt;
- illegal goods;
- exact suppliers;
- economy numbers;
- meta rewards.
