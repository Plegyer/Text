# Lumber Career Draft v0 — артель гномов

Дата: 2026-09-25.

Статус: **FULL CAREER DESIGN DRAFT / REFERENCE SLICE**, не финальный контент и не баланс.

Покрывает: LIFE-01, LIFE-02, LIFE-03, LIFE-04, LIFE-09, LIFE-11, LIFE-12, LIFE-13, LIFE-14, LIFE-16 частично.

Цель: показать на одной стартовой профессии требуемую глубину до написания массового контента.

## 1. Fantasy / системная роль

Героиня устраивается в артель гномов на физическую работу в лесу.

Профессия должна быть:
- понятной с первого дня;
- стабильным источником денег;
- естественным способом развивать физический build;
- входом в отношения с бригадой;
- мостом к лесной/экспедиционной Activity;
- примером того, как школа и внешний квест продвигают карьеру без дополнительной смены.

## 2. Repeatable shift

Cost:
- 1 Energy.

Кандидатные axes:
- Сила;
- Выносливость.

Точный -1 tradeoff пока НЕ LOCK.

Доход:
- стабильный base;
- профильный build повышает производительность;
- career rank может повышать ставку;
- season меняет часть результата;
- Похоть не штрафует salary.

Смена:
```text
spend Energy
-> choose/resolve shift variant
-> apply work stat/resource package
-> add wage
-> shifts += 1
-> emit WorkCompleted(lumber)
-> Event Resolver
```

## 3. Everyday variant pools

Не писать одну и ту же смену 50 раз.

Варианты выбираются по:
- season;
- career stage;
- history/cooldown;
- stats;
- known NPCs;
- Sexuality/Lust content rules, если применимо;
- specific item/tool.

Типы обычных сцен:
- валка;
- распил;
- перенос;
- сортировка;
- ремонт инструментов;
- работа в связке;
- опасная мелкая ситуация;
- спор о темпе/качестве;
- необычное дерево/следы.

## 4. Seasons

### Spring
- грязь/вода;
- тяжёлый доступ;
- повреждённые дороги;
- новый рост леса;
- возможные экологические/магические признаки.

### Summer
- высокая производительность;
- жара;
- риск пожара;
- дальние делянки.

### Autumn
- высокий спрос;
- сложная логистика;
- подготовка запасов;
- миграция зверей/охотничьи пересечения.

### Winter
- тяжёлые условия;
- замёрзшие пути;
- дорогая древесина;
- высокий риск и высокий доход на части контрактов.

Сезон меняет не только media, но:
- shift variants;
- modifiers;
- external events;
- Activity routes;
- некоторые career opportunities.

## 5. Career state machine

Точные shift counts обозначаются параметрами, а не числами.

### Stage L0 — Newcomer
- доступна ordinary work;
- героиня знакомится с бригадой;
- career-specific choices пока минимальны.

Transition:
`shifts >= MILESTONE_A`.

### Stage L1 — Accepted Hand
Milestone scene:
- реальная производственная проблема;
- игрок выбирает стиль: сила / точность / договорённость / хитрость.

Выбор создаёт career fact, но не закрывает другие routes навсегда.

После сцены:
- открывается первый значимый crew relationship;
- появляются более сложные shift variants.

### Stage L2 — Trusted Worker
Условия:
- shifts >= MILESTONE_B;
- хотя бы один профильный gate или external fact.

На этой стадии появляются три направления:
- стажевая жизнь;
- управление;
- лесная внешняя проблема.

### Stage L3A — Veteran track
Основной progress:
- стаж;
- надёжность;
- несколько обязательных seasonal contexts.

Ведёт к Hard Work ending.

### Stage L3B — Forewoman track
Требует комбинацию:
- career reputation;
- Разум/Манеры/Смекалка в зависимости от final stats;
- school fact типа accounting/leadership;
- решить конфликт/производственную задачу.

Ведёт к leadership outcome.

### Stage L3C — Forest track
Требует:
- найденный world/Activity fact;
- помощь охотника или иной лесной контакт;
- возможный Magic/Reason gate;
- выбор: просто выполнить заказ или разобраться в причине проблемы.

Ведёт к external systemic outcome.

### Stage L4 — Outcome-ready
Несколько endings могут быть eligible одновременно.

Career не завершает run автоматически.

## 6. Career branch A — Hard Work

Смысл:
героиня просто стала своей в артели и выбрала эту жизнь.

Requirements:
- substantial shifts;
- career milestone;
- отсутствие необходимости решать сложный внешний route.

Это не «плохая» концовка.

Reward philosophy:
- умеренная тематическая meta reward;
- НЕ +1 daily Energy за короткий стаж.

Candidate reward types:
- starting tool/gear option;
- небольшое starting Strength/Endurance преимущество;
- early lumber reputation;
- cheaper/expanded physical tool access.

Exact reward OPEN.

## 7. Career branch B — Forewoman / хозяйка делянки

Смысл:
из работницы вырасти в организатора производства.

Нужны разные системы:
- shifts/reputation;
- school leadership/accounting fact;
- social/management stat;
- решить supply/crew crisis.

Possible key dilemma:
- максимальная прибыль;
- безопасность бригады;
- долгосрочная устойчивость.

Outcome:
- управление артелью/собственная делянка/доля.

Meta reward type:
- rule-changing professional access;
- economic/logistics advantage;
- ранний доступ к определённым contracts.

Сильнее простой Hard Work reward.

## 8. Career branch C — Forest Compact / master route

Смысл:
лесная проблема оказывается не просто препятствием производству.

Не копировать original dungeon quest.

Возможная структура:
1. shifts дают первые признаки;
2. Hunter/Tavern/Activity даёт информацию;
3. School Arcana или внешний item позволяет понять проблему;
4. Expedition решает ключевой challenge;
5. игрок выбирает эксплуатацию / компромисс / защиту.

Outcome может:
- изменить доступные лесные resources;
- отношения артели с окружением;
- future Activity routes;
- meta world knowledge.

Это сложная multi-system ending family.

## 9. Relationship hook

Major NPC role: **бригадир/старший работник** (имя/раса внутри dwarf crew later).

Relationship начинается профессионально.

Паттерн:
```text
milestone A
-> professional respect
-> optional night/social meeting
-> repeated context-specific interactions
-> NPC personal problem / crew problem
-> external condition
-> relationship/career cross-effect
```

Relationship может иметь:
- professional-only route;
- friendship/partnership;
- voluntary romance route;
- conflict/rivalry.

Не делать romance обязательной для leadership.

## 10. School hooks

### Physical training
Даёт альтернативный ранний gate, но не заменяет смены.

### Accounting/literacy
Нужно для Forewoman route.

### Arcana
Может помочь Forest route.

School completion должен уметь запустить career event сразу через Resolver.

## 11. Item hooks

Минимум два meaningful item patterns:

### Better tool
Меняет available shift option/efficiency, а не просто +2%.

### Forest key item / document
Открывает новый route/Activity point или доказывает проблему.

Possible sources:
- Merchant;
- Activity;
- relationship;
- school project.

## 12. Hunter / Tavern / Merchant hooks

### Hunter
- следы/звери/опасность;
- route information;
- joint Activity branch.

### Tavern
- слух о прошлой делянке;
- traveller clue;
- supply/contact.

### Merchant
- tool/supply contract;
- lumber sales;
- alternate economic solution.

Так профессия действительно живёт в общем мире.

## 13. Sexuality / Lust handling

Lumber не должна становиться adult profession только потому, что в игре есть adult content.

Похоть может:
- менять часть добровольных crew/relationship variants;
- открывать дополнительные choices.

Сексуальность может:
- влиять на отдельные social/body-confidence варианты, если финально утверждена.

Они не входят автоматически в wage.

## 14. Ending interaction

Возможны одновременно:
- Lumber Hard Work;
- Forewoman;
- Forest outcome;
- major relationship ending;
- глобальная/education ending.

UI показывает eligible fates отдельно.

Игрок может продолжить run.

## 15. Example cross-system chain

```text
Lumber shift
-> milestone: странные следы у делянки
-> career fact forest_anomaly_seen
-> Tavern rumor раскрывает старый маршрут
-> Hunter interaction даёт route clue
-> School Arcana даёт identification fact
-> Activity expedition открывает hidden grove
-> result emits forest_truth_known
-> возвращение в town
-> Lumber Event Resolver запускает новую сцену
-> player выбирает способ решить конфликт
-> Forest ending becomes eligible
```

Это пример требуемой плотности системы.

## 16. Content budget hypothesis

До production estimate:

### Repeatable shift pool
- несколько variants на season;
- часть общих, часть stage-specific.

### Career milestones
- ориентировочно 6–10 крупных сцен на профессию;
- плюс малые transition scenes.

### Relationship
- 4–8 meaningful stages/scenes для major NPC, если route major.

### Endings
- минимум 3 distinct outcome completions.

Это только масштабная гипотеза для оценки труда, не quota lock.

## 17. Acceptance

Lumber career готова как vertical content reference только если:

1. ordinary shift остаётся повторяемой;
2. season меняет содержание;
3. shift progress открывает milestone;
4. school может продвинуть career без новой смены;
5. external Activity может продвинуть career;
6. meaningful item меняет option;
7. relationship пересекается с career;
8. Hard Work достижима без сложного route;
9. Forewoman требует отдельный build/system;
10. Forest route требует multi-system chain;
11. минимум две endings могут быть eligible одновременно;
12. commitment отдельный;
13. New Run показывает meta result;
14. save/load на каждом pending boundary deterministic.

## 18. Не зафиксировано

- NPC names;
- exact shift thresholds;
- exact stats/deltas;
- exact salary;
- exact season modifiers;
- exact content;
- romance details;
- exact item names;
- exact endings/meta rewards.

Документ задаёт структуру глубины, а не финальный сценарий.
