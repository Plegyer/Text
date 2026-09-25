# Seasonal Job Stat Model v1

Дата: 2026-09-25.

Статус: **TARGET DESIGN CONTRACT**.

Основание:
- прямое решение пользователя: как в оригинале, работа должна повышать и понижать разные характеристики в разные сезоны;
- SWF-confirmed reference: `original_job_seasons.csv` показывает отдельный stat package для каждой пары job/season, часто не сводимый к одной фиксированной схеме +2/+2/-1.

## 1. Главное правило

Каждая repeatable ordinary job имеет **четыре seasonal stat packages**.

```text
JobDefinition
  seasonalEffects:
    spring: Effect[]
    summer: Effect[]
    autumn: Effect[]
    winter: Effect[]
```

Названия сезонов successor могут быть позже переименованы без изменения механики.

## 2. Не существует универсального fixed package

У профессии нет одного вечного:
`+A +B -C`.

Сезон может менять:
- какие stats растут;
- какие stats падают;
- число затронутых stats;
- величину изменений;
- дополнительные condition/resource consequences.

Примеры допустимой формы:

```text
spring: +1 Strength, +1 Endurance, -1 Grooming
summer: +2 Strength, -1 Grooming
autumn: +1 Strength, +1 Dexterity, -1 Endurance
winter: +1 Strength, +1 Endurance, -1 Sociability
```

Это иллюстрация структуры, не финальный Lumber balance.

## 3. Balance constraints

Для ordinary base shift:
- seasonal package должен оставаться небольшим;
- ни один сезон не должен быть очевидно лучшим по всем направлениям;
- сильный +2 или третий positive stat должен иметь tradeoff;
- negative stat не должен быть моральной оценкой профессии;
- Похоть не используется как routine penalty;
- stat floor не позволяет бесконечно уходить ниже минимального значения.

## 4. Ухоженность особенно подходит для сезонных tradeoffs

Ухоженность может:
- падать на грязных/жарких/полевых работах;
- расти в hotel/service/presentation work;
- меняться сильнее в отдельных сезонах.

Это прямой способ встроить бытовой слой без отдельного cleanliness meter.

## 5. Career stage и seasonal package

По умолчанию season определяет базовый package.

Career stage может:
- добавить вариант;
- заменить отдельный effect;
- открыть player choice;
- дать tool mitigation.

Но stage не должен требовать hard-coded engine branch.

Пример:
`reinforced_axe` может заменить часть Lumber summer penalty или открыть другой shift variant.

## 6. Work content и stat effects разделены

Механический seasonal package не обязан иметь один текстовый variant.

Один package может иметь несколько:
- media variants;
- relationship variants;
- Lust variants;
- cooldown/history variants.

Presentation не повторяет effects.

## 7. Data validation

Loader должен проверять:
- у каждой ordinary job есть package на каждый season;
- неизвестные stat IDs rejected;
- package не пишет Похоть как routine job penalty без explicit special-event exemption;
- impossible/empty package flagged;
- numeric bounds.

## 8. Secret/late careers

Palace и Secret Debt career тоже могут иметь seasonal packages, если это улучшает игру, но не обязаны повторять ordinary roster contract один-к-одному.

Secret Debt forced night остаётся отдельным NightFlow effect и не смешивается с job stat package.

## 9. Original reference — что именно подтверждено

SWF research уже показывает:
- Maid/Hotel каждый сезон повышает Cleanliness, но дополнительные gains/losses меняются;
- Farmer меняет secondary gains/losses по сезонам;
- Guard меняет физические/social gains и Cleanliness/Class/Intellect/Durability penalties;
- поздние jobs также имеют разные seasonal matrices.

Successor сохраняет **архитектурную идею сезонной матрицы**, а не оригинальные конкретные пакеты.

## 10. Next balance deliverable

После target stat catalog v1:
- составить `SUCCESSOR_JOB_SEASON_MATRIX_v0.csv` для 10 ordinary jobs;
- проверить annual net drift;
- проверить stat coverage;
- прогнать 160-day simulations;
- затем lock exact numbers.
