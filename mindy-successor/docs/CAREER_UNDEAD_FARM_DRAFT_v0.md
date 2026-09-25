# Undead Farm Career Draft v0 — помощница на ферме нежити

Дата: 2026-09-25.

Статус: **FULL CAREER DESIGN DRAFT / THIRD STARTING REFERENCE SLICE**, не финальный контент и не баланс.

Покрывает: LIFE-01, LIFE-02, LIFE-03, LIFE-04, LIFE-06, LIFE-09, LIFE-10, LIFE-11, LIFE-12, LIFE-13, LIFE-14, LIFE-16.

## 1. Fantasy / системная роль

Героиня помогает на хозяйстве, где земледелие, переработка и нежить существуют как единая странная технология.

Профессия должна дать стартовому игроку:
- понятную бытовую работу;
- сильную сезонность;
- естественный вход в Магию/Разум;
- производство ингредиентов;
- связь со School;
- связь с Merchant;
- связь с Large Activity;
- возможность пройти жизнь как хозяйственник, исследователь или наследница фермы.

## 2. Repeatable shift

Cost:
- 1 Energy.

Кандидатные axes:
- Выносливость;
- Магия или Разум.

Exact +2/+2/-1 OPEN.

Shift work:
- уход за участком;
- сбор;
- сортировка;
- кормление/обслуживание неживых работников;
- переработка;
- ремонт;
- работа с магическими контейнерами;
- доставка/склад.

Income:
- base wage;
- season/product modifiers;
- career rank;
- special harvest outcomes.

## 3. Production identity

Farm отличается от Lumber тем, что работа создаёт не только деньги, но и **production resources**.

Некоторые смены могут давать:
- обычный товар;
- ingredient;
- specimen;
- spoiled/unstable material;
- trade good;
- quest input.

Не превращать farm в crafting spreadsheet: ресурсы должны иметь конкретные uses.

## 4. Seasons

### Spring
- посадка;
- пробуждение магических культур;
- грязь/вода;
- первые нестабильные ростки.

### Summer
- быстрый рост;
- высокая нагрузка;
- вредители/аномалии;
- максимальный объём обычного урожая.

### Autumn
- сбор;
- переработка;
- дефицит времени;
- торговые контракты;
- редкие зрелые ингредиенты.

### Winter
- хранение;
- ремонт;
- работа с нежитью внутри;
- исследование;
- ограниченный, но ценный зимний продукт.

Сезон меняет ресурсы, задачи, hazards и routes.

## 5. Career state machine

### F0 — New Hand
- простая хозяйственная работа;
- знакомство с владельцем/старшим работником;
- базовые ресурсы.

Transition:
`shifts >= MILESTONE_A`.

### F1 — Reliable Helper
- героине доверяют отдельный участок/процесс;
- появляется первый странный production anomaly;
- открывается relationship with farm NPC.

### F2 — Keeper of the Process
Требует:
- shifts;
- basic production fact;
- один stat or external gate.

Открывает направления:
- veteran farm life;
- research/knowledge;
- ownership/succession;
- external anomaly route.

### F3A — Veteran
Стаж + сезоны + устойчивое производство.

### F3B — Research
School + specimen + experiment/analysis.

### F3C — Successor
Economy/management + relationship/trust + production crisis.

### F3D — External anomaly
Activity/rare ingredient/world fact.

### F4 — Outcome-ready

## 6. Outcome A — Hard Work

Смысл:
героиня остаётся надёжной частью хозяйства.

Требует:
- substantial shifts;
- нескольких seasonal contexts;
- career milestone.

Reward family:
- early farm supplier;
- starting ingredient;
- early reputation;
- small production advantage.

Не давать огромный universal resource bonus.

## 7. Outcome B — Research Farmer

Смысл:
героиня превращает странное хозяйство в область знания.

Требует:
- School Arcana/Reason milestone;
- meaningful specimen;
- `spirit_jar` / preservation capability;
- experiment/research chain.

Result:
- новый production method;
- знание о природе неживого хозяйства;
- possible MetaKnowledge fragment.

Reward:
- research/knowledge unlock;
- early access to magical tool/course/source.

## 8. Outcome C — Farm Successor

Смысл:
героиня принимает управление/долю/наследование хозяйства.

Требует:
- trust/relationship;
- production record;
- accounting/management School fact;
- решить supply/labor crisis.

Это management route, не romance shortcut.

Reward:
- economic/logistics meta option;
- supplier/contact;
- possible altered start resource.

## 9. Outcome D — External Anomaly

Смысл:
проблема фермы оказывается связана с внешней областью/ресурсом.

Chain:
- anomaly during shift;
- specimen;
- School identifies partial cause;
- Activity locates source;
- player chooses treatment/use/containment.

Outcome меняет:
- production;
- world fact;
- maybe Activity route.

Это complex multi-system branch.

## 10. Relationship hook

Major NPC candidate:
- хозяин;
- смотритель;
- маг-агроном;
- старший неживой работник с отдельной формой agency.

Identity OPEN.

Relationship archetypes:
- mentor;
- professional partner;
- family-like bond;
- optional romance if NPC appropriate and consensual;
- conflict over treatment/use of undead labor.

Не все branches романтические.

## 11. Ethical/world choices without Morality stat

Farm — хорошее место для route choices:
- efficiency;
- respect for sentient/non-sentient undead;
- experimentation;
- sustainability.

Не нужен stat `Morality`.

Сохранять choices/facts и использовать их в endings/relationships/MetaKnowledge.

## 12. School hooks

### Arcana
- распознать anomaly;
- safely process magical resource.

### Literacy / accounting
- supply records;
- Successor route.

### Practical craft
- repair containers/tools.

### Rhetoric
- Merchant/supplier negotiation.

School может вызвать career continuation через Resolver сразу.

## 13. Item hooks

### Spirit Jar
Capability:
`contain_spirit_sample`.

Открывает безопасный sample route.

### Preservation Kit
Capability:
`preserve_specimen`.

Нужен для School/Activity research chain.

### Farm Seal / Delivery Crate
Capability:
`certified_farm_delivery`.

Открывает Merchant contract/official delivery.

### Protective Gloves / Tool
Capability:
specific hazardous process.

Не просто stat buff.

## 14. Merchant / economy hooks

Farm поставляет:
- food;
- ingredients;
- rare magical goods.

Merchant может:
- дать контракт;
- открыть buyer;
- найти shortage;
- создать speculative temptation.

Choice:
- quick profit;
- stable local supply;
- research reservation.

## 15. Large Activity hooks

Activity source:
- редкие seeds/soil/sample;
- origin of anomaly;
- lost irrigation/ritual site;
- creature affecting harvest.

City preparation through Farm:
- food/supplies;
- preservation;
- containers.

Activity result returns into Farm career.

## 16. Poverty hooks

Farm может давать:
- стабильную еду/низкий cash;
- occasional in-kind reward;
- later cheap lodging/work arrangement.

Но не должна полностью отменять housing economy.

Secret Debt lock:
- ordinary Farm career pauses;
- progress preserved;
- освобождение возвращает access.

## 17. Example cross-system chain

```text
Farm shift
-> unstable crop/anomaly found
-> Spirit Jar allows safe sample
-> School Arcana identifies partial pattern
-> Merchant reveals same material appeared elsewhere
-> Activity finds source
-> player returns with preserved specimen
-> Resolver triggers Farm research scene
-> choose contain / exploit / adapt
-> Research Farmer or External Anomaly ending becomes eligible
```

## 18. Sexuality / Lust

Не центральная ось Farm.

Похоть может менять добровольные relationship content variants.

Сексуальность не должна быть искусственно вставлена в wage/progression только ради coverage.

Это важно для проверки, что adult game не превращает каждую систему в одну тему.

## 19. Acceptance

Career годится как третий reference slice, если:

1. работа создаёт meaningful resources, не только деньги;
2. season меняет production;
3. Магия/Разум реально нужны;
4. School продвигает Research route;
5. item открывает sample path;
6. Merchant связан с production;
7. Activity возвращает result в career;
8. Hard Work не требует сложного research;
9. Successor route отличается от Research;
10. relationship не является обязательным romance;
11. moral/world choices хранятся без Morality stat;
12. multiple endings eligible;
13. commitment separate;
14. save/load resource/item transitions deterministic.

## 20. Не зафиксировано

- exact NPCs;
- exact crops/resources;
- exact +2/+2/-1;
- salary;
- production quantities;
- exact School course names;
- exact ethical lore;
- Activity source;
- ending rewards.
