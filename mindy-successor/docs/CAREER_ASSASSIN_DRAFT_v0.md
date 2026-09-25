# Assassin Career Draft v0 — наёмная убийца

Дата: 2026-09-25.

Статус: **FULL CAREER DESIGN DRAFT**, не финальный контент и не баланс.

Покрывает: LIFE-01, LIFE-02, LIFE-03, LIFE-04, LIFE-09, LIFE-10, LIFE-11, LIFE-12, LIFE-13, LIFE-14, LIFE-16.

## 1. Системная роль

Ассасин — choice-heavy covert profession.

Центр:
- контракты;
- разведка;
- подготовка;
- инструменты;
- несколько способов выполнения;
- отказ/переназначение цели;
- последствия в Guard/Palace/relationships.

Не строить её как обязательный combat job.

## 2. Repeatable shift

Cost:
- 1 Energy.

Обычная смена — это не обязательно убийство.

Pools:
- наблюдение;
- передача;
- слежка;
- подготовка маршрута;
- поиск окна;
- тест инструмента;
- ложная встреча;
- cleanup;
- minor contract.

Кандидатные axes:
- Ловкость;
- Смекалка;
- вторично Разум/Манеры.

Exact +2/+2/-1 OPEN.

## 3. Contract structure

Крупный контракт:
```text
offer
-> intel gathering
-> prep
-> choose method
-> execute / abort / redirect
-> fallout
```

Возможные methods:
- stealth;
- social access;
- staged accident;
- indirect manipulation;
- nonlethal substitution where route supports;
- expose target instead.

Не все контракты должны разрешать все methods.

## 4. Seasons

Season affects:
- crowds;
- visibility;
- travel;
- clothes/disguises;
- routes;
- target routines;
- festival opportunities.

Не только фон.

## 5. Career state machine

### K0 — Runner
Мелкие задания/наблюдение.

### K1 — Operative
Первые самостоятельные contracts.

### K2 — Trusted Blade
Доступ к network-level choices.

### K3A — Veteran
Стаж и успешные contracts.

### K3B — Ghost
Сложные чистые операции/минимум следов.

### K3C — Turncoat
Героиня разрывает/переворачивает сеть.

### K3D — Handler Takeover
Берёт контроль над заказами/контактами.

### K3E — Refusal Chain
Последовательные сознательные срывы ключевых orders формируют отдельную судьбу.

### K4 — Outcome-ready

## 6. Outcome A — Hard Work

Профессионал контрактов.

Требует:
- substantial completed work;
- базовую надёжность;
- несколько типов задач.

Reward:
- early covert contact/tool source;
- prep option.

## 7. Outcome B — Ghost

Требует:
- advanced contracts;
- varied methods;
- low fallout;
- item/prep mastery;
- Activity/infiltration.

Reward:
- strong covert access/start option;
- alternate routes.

## 8. Outcome C — Handler Takeover

Смысл:
не просто быть исполнителем, а контролировать сеть.

Требует:
- знать клиентов;
- компромат/ledger;
- relationship with handler/rival;
- Merchant/Tavern/Palace contacts.

Reward:
- rule-changing network/contact.

## 9. Outcome D — Refusal / Turncoat

Отказ не должен быть только провалом.

Если героиня:
- щадит/предупреждает несколько ключевых целей;
- перенаправляет информацию;
- раскрывает заказчика;
- помогает Guard/Palace/relationship;

то появляется самостоятельный route.

Без Morality stat.

## 10. Items

### Concealed Toolset
`bypass_simple_lock`, `concealed_entry`.

### Sealed Pass
social/legal infiltration.

### Disguise/formal attire
context capability.

### Evidence/document
turncoat/takeover.

### Activity route tool
for field target.

Предметы меняют method.

## 11. Activity

Большая часть сложных contracts может использовать Activity adapter:
- infiltration site;
- remote route;
- target tracking;
- extraction.

Но ordinary shifts remain city-side.

## 12. Guard relation

Guard:
- расследует fallout;
- может быть rival;
- может стать тайным союзником;
- может получить evidence.

Одно событие способно изменить обе career systems через public facts.

## 13. Tavern/Merchant hooks

Tavern:
- rumours;
- target lodging;
- alias.

Merchant:
- tools;
- forged access;
- buyer/client network.

Не делать универсальный black-market shop.

## 14. Palace hooks

Assassin может:
- получить court contract;
- раскрыть дворцовую сеть;
- использовать Palace meta contacts.

Но ordinary Assassin не должна сама открывать Palace.

## 15. Relationships

Roles:
- handler;
- rival operative;
- recurring target/contact;
- informant.

Relationship может быть:
- loyalty;
- manipulation;
- romance/friendship;
- betrayal;
- partnership.

## 16. Example chain

```text
Assassin minor job
-> target alias discovered
-> Tavern confirms lodging
-> Merchant sources concealed tool
-> Guard pressure changes route
-> Activity infiltration finds ledger
-> relationship with handler confronts evidence
-> player completes / aborts / turns contract
-> Ghost / Takeover / Turncoat outcomes diverge
```

## 17. Acceptance

1. ordinary work != combat spam;
2. major contracts have prep/method choice;
3. items alter methods;
4. Guard reacts;
5. Tavern/Merchant provide intel/prep;
6. Activity used selectively;
7. refusal can be progression;
8. no Morality stat;
9. Hard Work independent of elite route;
10. Ghost and Takeover distinct;
11. multiple endings eligible;
12. commitment separate;
13. save/load contract phase deterministic.

## 18. Открыто

- lethal/nonlethal scope;
- combat presence;
- target content;
- network structure;
- exact contract count;
- fallout model;
- rewards.
