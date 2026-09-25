# Initial Item Catalog v0

Дата: 2026-09-25.

Статус: **SMALL PRODUCT CATALOG DRAFT**, не финальный item roster.

Покрывает: LIFE-10, LIFE-11, LIFE-12, LIFE-16.

Цель: проверить Item System конкретными вещами, а не оставлять только типы.

## 1. Принцип

Каждый item ниже обязан менять хотя бы одно доступное действие/route.

Числовые bonuses вторичны и пока не назначаются.

## 2. Items

### I01 — Reinforced Axe / Усиленный топор

Category:
Tool.

Capabilities:
- `cut_heavy_wood`;
- `lumber_high_risk_shift`.

Sources:
- Merchant;
- Lumber career reward;
- возможно craft later.

Uses:
- новый Lumber shift option;
- obstacle в Forest Activity;
- production solution в Forewoman route.

### I02 — Rope Kit / Верёвочный набор

Category:
Tool / Activity gear.

Capability:
- `cross_rough_route`.

Sources:
- Merchant;
- Hunter contact.

Uses:
- Forest shortcut;
- future rooftops/cliffs/utility routes.

Не даёт generic Dexterity bonus.

### I03 — Field Preservation Kit / Полевой набор сохранения образцов

Category:
Consumable/tool hybrid.

Capability:
- `preserve_specimen`.

Sources:
- School;
- Farm;
- Merchant.

Uses:
- вынести редкий Activity sample;
- передать sample School/Farm;
- открыть Research route.

Consume policy OPEN: charges vs reusable.

### I04 — Old Boundary Token / Старый межевой жетон

Category:
Key/Route item.

Capability:
- `enter_old_boundary`.

Sources:
- Tavern rumour chain + old owner;
- relationship;
- Hunter;
- hidden city event.

Uses:
- hidden Forest route;
- доказательство старых прав/границ в Lumber branch.

Не продаётся как обычный товар.

### I05 — Sealed Pass / Запечатанный пропуск

Category:
Key/Status item.

Capabilities:
- `enter_restricted_district`;
- `prove_official_access`.

Uses:
- Guard legal route;
- Assassin covert route;
- Palace access subroutes;
- Merchant can potentially source a temporary version.

### I06 — Appraisal Scales / Оценочные весы

Category:
Tool.

Capability:
- `merchant_appraisal`.

Uses:
- Merchant определяет поддельный/редкий товар;
- некоторые trade events;
- может помогать оценивать Activity finds.

Не просто +money%.

### I07 — Formal Court Attire / Придворный комплект

Category:
Contextual equipment.

Capability:
- `formal_court_presence`.

Uses:
- Geisha performance/status event;
- Palace ceremony/access;
- relationship/patron meeting.

Не даёт permanent Manners.

### I08 — Spirit Jar / Сосуд для духа

Category:
Tool/Container.

Capability:
- `contain_spirit_sample`.

Sources:
- Farm/School.

Uses:
- Farm supernatural production;
- Forest/other Activity encounter;
- School research.

### I09 — Concealed Toolset / Скрытый набор

Category:
Prep equipment.

Capabilities:
- `bypass_simple_lock`;
- `concealed_entry`.

Uses:
- Assassin preparation;
- certain Activity/investigation routes.

Guard possession consequences possible depending context.

### I10 — Debt Ledger Fragment / Фрагмент долговой книги

Category:
Key/Evidence.

Capability:
- `prove_debt_network`.

Source:
- Secret Debt route only.

Uses:
- takeover/revolt branch;
- Guard/Palace/Assassin cross-hook;
- potential MetaKnowledge source.

Не гарантирует автоматически свободу.

## 3. Cross-system coverage

| Item | Job | Activity | School | Relationship | Palace/Poverty |
|---|---|---|---|---|---|
| Reinforced Axe | Lumber | yes | — | indirect | — |
| Rope Kit | Hunter/Lumber | yes | — | indirect | — |
| Preservation Kit | Farm/Hunter | yes | yes | quest | — |
| Boundary Token | Lumber | yes | — | yes | — |
| Sealed Pass | Guard/Assassin/Merchant | possible | — | patron | yes |
| Appraisal Scales | Merchant | finds | — | — | — |
| Court Attire | Geisha | — | etiquette | patron | Palace |
| Spirit Jar | Farm | yes | magic | quest | — |
| Concealed Toolset | Assassin | yes | — | covert | Palace |
| Debt Ledger | — | possible | literacy | ally | Secret Debt/Palace |

## 4. Acquisition philosophy

Не делать универсальный магазин со всем.

Разные вещи получают через:
- Merchant profession/vendors;
- jobs;
- School;
- relationships;
- Activity;
- secret routes.

Это создаёт world network.

## 5. Meta unlock examples

Meta reward может открыть:
- предмет как стартовый option;
- раннего поставщика;
- рецепт;
- знание источника.

Не переносить сюжетный key item между жизнями без отдельной причины.

## 6. Acceptance

Каталог считается полезным только если production slice реализует минимум:
- один tool, открывающий job option;
- один route item;
- один Activity extraction item;
- один item, участвующий в трёх systems;
- deterministic consume/use across save/load.

## 7. Открыто

- цены;
- stack/charges;
- exact art/media;
- final naming;
- crafting;
- inventory capacity;
- legality/stolen item rules.
