# Forest Activity Slice v0

Дата: 2026-09-25.

Статус: **CONCRETE PRODUCT SLICE DRAFT**, не финальная большая Activity всей игры.

Покрывает: LIFE-03, LIFE-04, LIFE-10, LIFE-11, LIFE-12, LIFE-16.

Цель: доказать продуктовую роль большой Activity на одном лесном маршруте, связанном с Lumber/Hunter/School/Items.

## 1. Формат

Рабочий формат:
**короткая экспедиция в лесную область за пределами обычного DayHub**.

Entry:
- 2 daily Energy.

После входа daily Energy больше не используется внутри экспедиции.

## 2. Internal resources

Для slice:

```text
ActivityState
  routePosition
  timeSegments
  endurance
  supplies
  discoveredPoints[]
  pendingEncounter?
  carriedFinds[]
  campUsed?
```

`endurance` и `supplies` — activity-only resources.

Их точные числа OPEN.

## 3. Core loop

```text
enter
-> choose route
-> spend internal time/resource
-> encounter/challenge
-> decide continue / detour / return
-> reach objective or escape
-> ActivityResult
-> city Event Resolver
```

## 4. Route structure

Минимум три routes/branches:

### Logging road
- самый понятный;
- меньше риска;
- связан с Lumber facts;
- даёт производственные/документальные находки.

### Hunter trail
- требует Hunter clue или navigation capability;
- больше wildlife/tracking encounters;
- даёт редкие ресурсы.

### Old boundary path
- скрытый;
- требует `old_boundary_token` или другой route capability;
- ведёт к ключевой точке Forest route.

## 5. Encounter mechanics

Slice использует минимум три типа задач.

### A. Route choice / navigation
Игрок выбирает путь с известной частью риска/стоимости.

Stats:
- Смекалка;
- Разум;
- Hunter/knowledge facts.

Items:
- map/navigation tool.

### B. Physical obstacle
Пример: завал/ручей/крутой склон.

Approaches:
- Сила;
- Выносливость;
- Ловкость;
- rope/tool capability.

Не нужен combat.

### C. Interpretation / ritual anomaly
Странный участок леса нельзя решить силой.

Approaches:
- Разум;
- Магия;
- School Arcana fact;
- specific sample/tool.

Это создаёт смысл для магического build.

## 6. Optional specialized mechanic

Для tracking можно использовать отдельную лёгкую mini-mechanic:
- несколько следов/признаков;
- игрок выбирает направление по информации;
- stat/item knowledge уменьшает ambiguity.

Она не должна быть twitch arcade.

Это кандидат, не финальный lock всей Activity.

## 7. Seasons

Forest slice меняется по сезонам.

### Spring
- вода/грязь;
- часть коротких путей закрыта;
- появляются магические ростки/следы.

### Summer
- дальние маршруты доступны;
- пожарный risk/event pool.

### Autumn
- миграция животных;
- Hunter trail богаче;
- высокий промышленный pressure.

### Winter
- часть путей опасна/дороже по endurance;
- замёрзший проход может открыть альтернативный путь.

Сезон меняет topology/options, а не только art.

## 8. City preparation

До входа игрок может:
- купить/получить tool;
- получить clue в Tavern;
- получить Hunter information;
- пройти School Arcana;
- взять relationship request.

Эти действия меняют expedition options.

## 9. Item capabilities in slice

### `rope_kit`
Capability:
`cross_rough_route`.

Открывает shortcut/безопасный обход.

### `field_preservation_kit`
Capability:
`preserve_specimen`.

Позволяет вынести редкий образец как полноценный item вместо generic loot.

### `old_boundary_token`
Capability:
`enter_old_boundary`.

Открывает hidden route.

### `reinforced_axe`
Capability:
`cut_heavy_wood`.

Даёт альтернативу на одном obstacle и связан с Lumber.

## 10. NPC / relationship presence

В slice может присутствовать один expedition contact:
- Hunter guide;
- forest worker;
- supernatural local;
- другой contextual NPC.

Не фиксируем identity.

Foreman не обязан сопровождать игрока; его request может быть причиной похода.

## 11. Objective

Для Lumber Forest route:

```text
forest_anomaly_seen
-> collect clues
-> reach old boundary
-> inspect hidden grove/problem
-> choose what evidence/result to bring back
```

Possible result facts:
- `forest_truth_known`;
- `forest_resource_exploitable`;
- `forest_protection_needed`;
- `forest_evidence_collected`.

Это не фиксирует финальный lore.

## 12. Result and city feedback

Success:
- предметы/finds;
- world facts;
- relationship/career facts;
- maybe money/trade goods.

Escape:
- сохраняет часть discoveries;
- теряет часть carried finds по policy;
- не выдаёт objective result.

Failure:
- forced exit;
- condition/next-day penalty;
- возможно потеря расходников.

После выхода:
`ActivityCompleted -> Event Resolver`.

Если `forest_truth_known`, Lumber career scene должна запускаться без дополнительной смены.

## 13. Camp

Для этого slice camp OPTIONAL.

Если используется:
- только внутри multi-day expedition;
- отличен от городского lodging;
- имеет свои events;
- может advance global day exactly once.

Первый product slice может обойтись без camp, если экспедиция укладывается в один global day.

## 14. Save/resume

Save возможен:
- после route choice;
- перед/после encounter;
- перед objective.

Reload сохраняет:
- resources;
- route;
- resolved encounter;
- RNG;
- carried finds.

Нельзя reroll encounter через reload.

## 15. Acceptance

Slice считается продуктово полезным, если:

1. вход стоит 2 Energy;
2. есть 3 разных route contexts;
3. internal resource отделён от daily Energy;
4. минимум 3 challenge families;
5. минимум 4 stats получают реальные способы применения;
6. минимум 3 meaningful item capabilities;
7. season меняет route/options;
8. city preparation меняет expedition;
9. Activity result запускает Lumber/Relationship progression;
10. escape отличается от success;
11. save/resume deterministic;
12. хотя бы один предмет, вынесенный из Activity, нужен в другой subsystem.

## 16. Открыто

- финальные внутренние ресурсы;
- exact map/region count;
- camp;
- tracking mini-mechanic;
- encounter UI;
- exact lore;
- exact loot;
- whether combat ever exists elsewhere.
