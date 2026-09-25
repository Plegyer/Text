# Item System Draft v0

Дата: 2026-09-25.

Статус: **PRODUCT DESIGN DRAFT**, не финальный каталог и не баланс.

Покрывает: LIFE-03, LIFE-10, LIFE-11, LIFE-12, LIFE-16, LIFE-18.

Основание:
- `USER_VISION_AND_ACCEPTANCE.md`;
- `JOB_SYSTEM_MATRIX_v0.md`;
- `CAREER_LUMBER_DRAFT_v0.md`;
- `LARGE_ACTIVITY_PRODUCT_ROLE_v0.md`;
- target architecture v1.

## 1. Главный принцип

Предмет существует не ради пассивного `+2%`.

Хороший предмет должен делать хотя бы одно из:
- открыть действие;
- открыть альтернативный способ решения;
- изменить cost/risk;
- разрешить маршрут;
- стать доказательством/ключом;
- позволить сохранить результат Activity;
- изменить доступную постановку/встречу;
- дать новую экономическую возможность.

Чистые stat bonuses допустимы как вторичный слой, но не должны быть ядром системы.

## 2. Категории

### Tools
Многоразовые инструменты.

Примеры ролей:
- улучшенный топор открывает более сложную операцию у лесорубов;
- набор отмычек позволяет covert approach;
- торговые весы дают отдельный способ оценки товара;
- сценический костюм открывает конкретный performance option.

Tool не обязан экипироваться в слот; важна capability.

### Key / Route Items
Предметы, меняющие доступный путь:
- документ;
- ключ;
- карта;
- жетон;
- доказательство;
- редкий ингредиент;
- пропуск.

Они должны иметь устойчивые IDs и понятный owner/source.

### Consumables
Одноразовые ресурсы:
- лечение/восстановление внутри Activity;
- временный bonus к конкретному check;
- снятие condition;
- расходник для craft/quest.

Не использовать consumables как основной способ исправить экономику daily Energy.

### Equipment / Loadout
Нужно только там, где оно создаёт реальный выбор.

Например большая Activity может иметь ограниченные tool/loadout slots. Тогда разные предметы дают разные capabilities, а не линейную лестницу +1/+2/+3.

### Trade Goods
Товары для Merchant/economy:
- сезонный спрос;
- supply chains;
- контракты;
- barter.

Часть trade goods одновременно может быть quest/resource item.

### Gifts / Relationship Items
Предмет не должен просто давать универсальный +affinity.
Он может:
- показать знание NPC;
- открыть встречу;
- решить его проблему;
- изменить route choice.

## 3. ItemDefinition

Целевой shape:

```text
ItemDefinition
  id
  category
  stackPolicy
  tags[]
  sourceTags[]
  capabilities[]
  useContexts[]
  consumePolicy
  presentationId
  valueModel?
```

Content effects остаются декларативными.

## 4. Capabilities

Вместо проверки конкретного item ID там, где возможно:

```text
capability:
  cut_heavy_wood
  prove_ownership
  enter_locked_route
  preserve_specimen
  perform_stage_costume
  concealed_weapon
  merchant_appraisal
```

Это позволяет нескольким предметам решать одну задачу разными способами и не связывает career code с одной вещью.

В уникальных сюжетных случаях item ID condition допустим.

## 5. Ownership

Inventory хранится в RunState/Resource domain.

Permanent meta items не должны автоматически лежать в обычном inventory.

Meta reward может:
- открыть item в стартовом выборе;
- открыть supplier;
- разрешить рецепт;
- добавить start option.

Так NG+ расширяет возможности, но не превращает inventory в вечный склад всех прошлых жизней.

## 6. Equipment / loadout

Не вводить глобальную сложную экипировку только потому, что она была в оригинале.

Loadout вводится по системам:
- Activity adapter может иметь свои slots;
- Assassin/Hunter могут использовать prep slots;
- performance/social professions могут иметь outfit requirement/capability.

Если предмет не меняет решение игрока, отдельный slot ему не нужен.

## 7. Cross-system examples

### Lumber
`reinforced_axe`:
- открывает dangerous/high-yield shift option;
- может уменьшить риск injury/failed outcome;
- нужен для одного Forewoman production solution.

Это не просто +Strength.

### Farm
`spirit_jar`:
- позволяет безопасно сохранить магический образец;
- образец можно отнести в School или Activity;
- возвращённый результат открывает Research Farmer route.

### Hunter
`preservation_kit`:
- сохраняет редкую добычу;
- без него после выхода остаётся только обычный ресурс;
- с ним предмет становится quest/trade input.

### Guard / Assassin
Один и тот же `sealed_pass`:
- Guard использует легально;
- Assassin может украсть/подделать;
- Merchant может достать через контакт.

### Poverty / Secret Debt
Meaningful item для takeover route может быть:
- ключ;
- документ;
- weapon/tool;
- компромат.

Конкретный item пока OPEN.

## 8. Item acquisition

Источники:
- покупка;
- job reward;
- school project/certificate;
- relationship;
- Activity;
- seasonal event;
- barter;
- theft/covert path, если route разрешает.

Shop как отдельная копия Simply Mindy не обязателен.

Merchant profession и world vendors могут давать экономический доступ без отдельной универсальной "лавки оригинала".

## 9. Item use and effects

Core команды:
- acquire;
- consume/use;
- equip/assign to context;
- transfer/turn-in;
- sell/barter.

Каждая операция атомарна.

Если item уже списан при входе в pending scene, reload не должен списывать его снова.

## 10. Discovery and UI

Inventory UI должен показывать:
- что это;
- где применимо в общих терминах;
- stack/count;
- assigned/equipped status;
- known capabilities.

Не показывать скрытые сюжетные применения до их открытия, если это спойлер.

## 11. Content validation

Loader проверяет:
- неизвестные item IDs;
- неизвестные capabilities;
- illegal item effect;
- negative stack;
- route condition на item, который невозможно получить в текущем content graph — по возможности статическим lint/test;
- orphan equipment slot.

## 12. Acceptance slice

LIFE-11 не считается закрытой, пока нет playable chain:

```text
получить предмет
-> увидеть новую доступную option
-> использовать предмет
-> изменить результат другой системы
-> сохранить/загрузить без дублирования расхода
```

Минимум один такой chain должен пересекать Job + Activity/School/Relationship.

## 13. Открыто

- точный inventory capacity;
- нужны ли weight/encumbrance;
- конкретные equipment slots;
- craft system;
- exact vendors;
- exact item catalog;
- какие meta rewards открывают стартовые items.
