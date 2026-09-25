# Tavern Career Draft v0 — работница трактира

Дата: 2026-09-25.

Статус: **FULL CAREER DESIGN DRAFT**, не финальный контент и не баланс.

Покрывает: LIFE-01, LIFE-02, LIFE-03, LIFE-04, LIFE-05, LIFE-06, LIFE-09, LIFE-11, LIFE-12, LIFE-13, LIFE-14, LIFE-16.

## 1. Системная роль

Трактир — не дубль бара сатиров.

Это городской/дорожный узел, через который проходят:
- путешественники;
- слухи;
- товары;
- временные жильцы;
- сезонный спрос;
- охотники;
- стража;
- торговцы;
- наёмники.

Главная фантазия:
**из обычной работницы общего дома стать хозяйкой места, информационным посредником или человеком, который определяет, кому здесь дают кров и доступ.**

## 2. Repeatable shift

Cost:
- 1 Energy.

Кандидатные оси:
- Обаяние;
- Смекалка;
- вторично Манеры/Разум.

Exact +2/+2/-1 OPEN.

Типы смен:
- общий зал;
- кухня/запасы;
- комнаты;
- приём путешественников;
- конфликт;
- большой заказ;
- ночной постоялец;
- доставка;
- помощь постоянному гостю;
- слух/информация.

Доход:
- base wage;
- occupancy/season modifier;
- tips;
- career rank;
- occasional service bonuses.

Похоть не входит универсально в оплату.

## 3. Отличие от Satyr Maid

Satyr Maid:
- личное обслуживание;
- recurring guests;
- границы;
- after-hours relationships;
- sexual/social variants.

Tavern:
- поток людей;
- комнаты;
- supply;
- информация;
- посредничество;
- safe-house / neutral-ground choices.

Одна система может пересекаться с другой, но не заменяет её.

## 4. Seasons

### Spring
- дороги снова открываются;
- поток новых путников;
- грязь/ремонт;
- ранние торговые караваны.

### Summer
- максимальный транзит;
- высокая загрузка комнат;
- путешественники и экспедиции.

### Autumn
- торговый пик;
- охотники;
- фестивальные гости;
- supply pressure.

### Winter
- меньше транзита;
- больше stranded guests;
- дефицит;
- дорожные crises;
- ценность крова и информации выше.

Season меняет:
- visitor pools;
- room demand;
- supply events;
- rumours;
- prices/contracts;
- relationship opportunities.

## 5. Career state machine

### T0 — New Hand
Простая работа по залу/комнатам.

### T1 — Trusted Worker
После первого milestone:
- доступ к комнатам/постояльцам;
- owner/manager доверяет мелкие решения;
- появляются recurring travelers.

### T2 — House Node
Героиня уже влияет на поток:
- кого поселить;
- кому доверять;
- чью информацию передать;
- кого защищать;
- какой supply контракт выбрать.

### T3A — Veteran Service
Стаж, надежность, сезонные пики.

### T3B — Innkeeper
Управление хозяйством:
- accounting;
- staff;
- supply;
- occupancy;
- repairs.

### T3C — Information Broker
Слухи и сеть контактов становятся самостоятельной силой.

### T3D — Sanctuary
Трактир превращается в безопасное место для выбранной группы/сети.

### T4 — Outcome-ready
Несколько исходов доступны параллельно.

## 6. Outcome A — Hard Work

Смысл:
героиня остаётся важной постоянной работницей.

Требует:
- substantial shifts;
- several seasonal contexts;
- базовой house reputation.

Reward family:
- early lodging/contact;
- supplier familiarity;
- стартовый service/rumour advantage.

Не давать чрезмерный universal economy bonus.

## 7. Outcome B — Innkeeper

Смысл:
героиня получает контроль над трактиром или долю.

Нужно:
- career reputation;
- School accounting/literacy;
- решить supply или debt crisis;
- management/social gate.

Choices:
- максимальная прибыль;
- стабильность;
- дешёвый кров;
- high-status clientele.

Reward family:
- housing/economy rule option;
- ранний supplier/contact;
- possibly altered lodging access.

## 8. Outcome C — Information Broker

Смысл:
героиня понимает, что главная ценность трактира — не еда, а информация.

Требует:
- recurring traveler facts;
- минимум две внешние профессии/сети;
- choices about confidentiality;
- возможно School literacy/rhetoric.

Может связывать:
- Hunter;
- Guard;
- Assassin;
- Merchant;
- Palace.

Reward:
- meta knowledge/contact;
- early rumours;
- alternate unlock hints.

## 9. Outcome D — Sanctuary

Смысл:
героиня превращает трактир в безопасный дом/убежище.

Это может касаться:
- бедняков;
- путешественников;
- определённой группы;
- союзников.

Требует:
- housing/economy sacrifices;
- relationship support;
- possibly Guard/Merchant hooks.

Это не должна быть «морально правильная» обязательная ветка; это отдельный playstyle.

## 10. Housing / poverty

Tavern — ключевой мост LIFE-05.

Возможные hooks:
- дешёвое временное жильё за работу;
- meal in kind;
- ночлег для знакомых;
- помощь street NPC;
- debt-related information.

Но трактир не должен полностью отменять housing economy.

Secret Debt route:
- может начатьcя независимо;
- после slave lock ordinary Tavern career приостанавливается;
- progress сохраняется.

## 11. Relationship hooks

Major NPC roles:
- хозяин/управляющий;
- recurring traveler;
- supplier;
- permanent lodger.

Relationship может перейти:
- в professional partnership;
- friendship;
- romance;
- patronage;
- conflict over confidentiality.

Не один универсальный любовный интерес.

## 12. School hooks

### Accounting / literacy
Innkeeper route.

### Rhetoric
Conflict mediation / information broker.

### Etiquette
High-status travelers.

### Arcana
Разобрать странный предмет/слух/постояльца.

## 13. Item hooks

### Staff key
Capability:
`access_guest_rooms_staff`.

### Guest ledger
Information object:
- legal/rumour route;
- may become evidence.

### Rare supply contract
Merchant link.

### Sealed pass
Постоялец/Guard/Assassin/Palace cross-hook.

## 14. Activity hooks

Трактир:
- даёт rumors/routes;
- принимает returning expedition NPC;
- может хранить/опознавать finds;
- связывает Hunter/Merchant.

Activity result:
- редкая карта;
- rescued traveler;
- discovered route;
- strange item.

Может открыть Tavern event без новой смены.

## 15. Example cross-system chain

```text
Tavern shift
-> recurring traveler mentions closed road
-> Hunter confirms route
-> Activity finds stranded caravan
-> Merchant offers salvage contract
-> Guard asks for testimony
-> Tavern relationship asks whether to reveal guest identity
-> choice changes Information Broker / Sanctuary route
-> multiple endings become eligible
```

## 16. Acceptance

Career считается полноценной, если:

1. ordinary shift не дублирует Satyr Maid;
2. season меняет visitor/supply pools;
3. rooms/housing реально участвуют;
4. информация является ресурсом/route fact;
5. School продвигает Innkeeper/Broker;
6. item открывает room/access/action;
7. relationship пересекается с confidentiality;
8. Activity возвращает traveler/rumour/result;
9. Hard Work не требует сложной сети;
10. Innkeeper и Broker требуют разных систем;
11. Sanctuary — реальная альтернативная жизнь;
12. multiple endings eligible;
13. commitment separate;
14. save/load pending guest events deterministic.

## 17. Открыто

- exact NPCs;
- exact shifts;
- salary/tips;
- room economy;
- exact supply system;
- endings/meta rewards;
- whether own inn changes housing permanently within run.
