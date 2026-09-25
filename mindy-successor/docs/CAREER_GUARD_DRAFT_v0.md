# Guard Career Draft v0 — стражница

Дата: 2026-09-25.

Статус: **FULL CAREER DESIGN DRAFT**, не финальный контент и не баланс.

Покрывает: LIFE-01, LIFE-02, LIFE-03, LIFE-04, LIFE-05, LIFE-06, LIFE-09, LIFE-11, LIFE-12, LIFE-13, LIFE-14, LIFE-16.

## 1. Системная роль

Стража — ordinary profession про публичную власть, повседневные городские кризисы и выбор того, как применять правила.

Она должна сделать minor-event слой частью career, а не отдельными случайными карточками.

Главный вопрос:
**становится ли героиня надёжным исполнителем, офицером, реформатором, коррумпированным посредником или человеком, способным закрыть большое дело.**

Никакого отдельного Morality stat.

## 2. Repeatable shift

Cost:
- 1 Energy.

Кандидатные axes:
- Выносливость;
- Манеры;
- вторично Сила/Ловкость/Разум.

Exact +2/+2/-1 OPEN.

Shift pools:
- патруль;
- gate duty;
- рынок;
- dispute;
- escort;
- paperwork;
- missing person;
- tavern incident;
- street poverty encounter;
- suspicious cargo;
- festival duty.

## 3. City-event integration

Guard должна использовать общий daily/minor event framework.

Разница:
- обычный игрок может увидеть optional crisis;
- Guard может получить professional version;
- тот же world event даёт career progress/fact;
- решение зависит от полномочий/доступа.

Не копировать оригинальный crisis pool буквально.

## 4. Seasons/calendar

### Spring
- восстановление дорог;
- миграция/приток;
- property disputes.

### Summer
- фестивали;
- высокая уличная нагрузка;
- пожары/толпы.

### Autumn
- торговый поток;
- контрабанда;
- урожайные конфликты.

### Winter
- ночлег/бедность;
- дефицит;
- stranded travelers;
- закрытые районы.

Season меняет crisis pool и priorities.

## 5. Career state machine

### G0 — Recruit
Простые патрули.

### G1 — Trusted Guard
Открываются:
- reports;
- access;
- recurring city NPCs;
- discretionary choices.

### G2 — Senior
Героиня участвует в более сложных делах.

### G3A — Veteran
Стаж/надежность/разные duties.

### G3B — Officer
Management/command/legal knowledge.

### G3C — Reform / Order Route
Героиня меняет практику стражи.

### G3D — Network / Corruption Route
Использует полномочия как ресурс.

### G3E — Major Case
Multi-system investigation/operation.

### G4 — Outcome-ready

## 6. Outcome A — Hard Work

Смысл:
ветеран стражи.

Требует:
- substantial patrols;
- several duty types;
- basic record.

Reward:
- early official contact;
- access token;
- starting authority option.

Не должен автоматически давать free immunity to law.

## 7. Outcome B — Officer

Требует:
- strong career record;
- School literacy/etiquette/rhetoric;
- solve staff/crisis management issue;
- leadership gate.

Outcome:
- rank/command.

Reward:
- institutional access;
- early restricted-area option;
- possibly cheaper/legal access to permits.

## 8. Outcome C — Reform

Без Morality meter.

Route формируется конкретными choices:
- street treatment;
- corruption handling;
- lodging/poverty response;
- use of force;
- transparency.

Требует support/allies.

Outcome:
- изменённые правила/практика участка.

Reward:
- future city event variants;
- public trust/contact.

## 9. Outcome D — Network / Corruption

Не делать карикатурной "evil route".

Героиня может:
- продавать доступ;
- покрывать контрабанду;
- обменивать услуги;
- строить свою сеть.

Требует:
- Merchant/Tavern/Assassin contacts;
- choices;
- risk.

Outcome:
- shadow influence inside institution.

Reward:
- alternate access/contact/meta option.

## 10. Outcome E — Major Case

Сложная multi-system chain.

Possible ingredients:
- Tavern guest ledger;
- Merchant cargo;
- Sealed Pass;
- Assassin clue;
- Activity location;
- Palace connection.

Не фиксировать конкретное преступление.

## 11. Poverty hooks

Guard — одна из ключевых профессий LIFE-05.

Street events могут:
- штрафовать/гонять бедняков;
- помогать;
- предлагать shelter contacts;
- раскрывать debt network;
- создавать rivalries.

Это choices/facts, не morality score.

Secret Debt:
- Guard может позже найти evidence;
- Debt Ledger Fragment может открыть route;
- но Guard profession недоступна во время active slave lock.

## 12. Item hooks

### Badge / official token
Capability:
`official_guard_access`.

### Sealed Pass
Legal access.

### Guest/cargo ledger
Evidence.

### Restraint/protection tool
Specific crisis options.

### Debt Ledger Fragment
Major poverty/network evidence.

## 13. School hooks

### Literacy
Reports/evidence.

### Rhetoric
De-escalation/interrogation.

### Etiquette
High-status cases/Palace.

### Physical training
Dangerous duty.

### Arcana
Magical crimes/anomalies.

## 14. Relationship hooks

Archetypes:
- partner;
- superior;
- informant;
- recurring civilian;
- rival officer.

Possible routes:
- professional loyalty;
- friendship/romance;
- rivalry;
- corruption alliance;
- whistleblower alliance.

Не один affinity bar.

## 15. Cross-job hooks

### Tavern
Incidents, witnesses, ledger.

### Merchant
Cargo/licensing/smuggling.

### Assassin
Cat-and-mouse or collaboration.

### Prostitute
Clients, protection, exploitation/confidentiality issues.

### Palace
Official escort/access/high-status cases.

### Poverty
Street events/debt network.

## 16. Example chain

```text
Guard patrol
-> suspicious pass/cargo
-> Tavern guest ledger confirms alias
-> Merchant identifies supplier
-> optional relationship informant gives route
-> Activity/field visit finds cache
-> Debt Ledger or sealed document links wider network
-> Resolver triggers Major Case scene
-> player chooses official prosecution / reform leverage / personal network
-> different outcomes eligible
```

## 17. Ending interaction

Possible:
- Guard Hard Work;
- Officer;
- Reform;
- Network/Corruption;
- Major Case;
- major relationship;
- Palace route.

Несколько могут быть eligible одновременно.

## 18. Acceptance

1. patrol shifts have variety;
2. city crises feed career;
3. season changes event pools;
4. poverty choices matter without Morality stat;
5. School opens Officer/alternative solutions;
6. item/evidence changes case route;
7. Tavern/Merchant/Assassin hooks concrete;
8. Hard Work independent of major case;
9. Reform and Network are distinct choices, not good/evil meter;
10. Major Case requires multiple systems;
11. relationship can alter access/info;
12. multiple endings eligible;
13. commitment separate;
14. save/load evidence/pending event deterministic.

## 19. Открыто

- city law/factions;
- exact authority limits;
- use-of-force mechanics;
- exact crisis catalog;
- exact corruption consequences;
- endings/meta rewards.
