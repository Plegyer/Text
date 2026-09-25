# PROJECT STATE

Дата фиксации: 2026-09-25.

## Что уже решено

- Новая игра: попаданка в фэнтезийный мир, где другие разумные/волшебные расы представлены мужчинами.
- Это не рескин Simply Mindy. Сохраняются отдельные системные идеи, но сюжет, персонажи, визуал, конкретные события и значительная часть механик будут новыми.
- Базовый ресурс дня: 3 энергии.
- Работа стоит 1 энергию.
- Школа стоит 1 энергию и деньги.
- Крупная мини-игра/активность стоит 2 энергии.
- Ночное обучение даёт прогресс ночью, но отнимает 1 энергию следующего дня.
- Через сложные мета-достижения максимум ежедневной энергии может быть повышен ещё на 2.
- Работы меняют билд: повышают две характеристики и понижают одну.
- Школа повышает характеристики, но служит денежным sink.
- Ночёвка платная и в начале должна заметно давить на экономику, чтобы работа была необходима.
- Похоть — положительный контентный параметр. Высокое значение не штрафует зарплату: оно заменяет/открывает дополнительные версии рабочих событий с участием героини.
- 10 ordinary/public профессий — текущий удобный ориентир roster, а не жёсткий потолок. В начале доступны только 2–3.
- Последняя скрытая/meta-профессия — работа **во дворце**, открываемая через профессиональные концовки «Упорный труд» предыдущих жизней. При текущем roster это 11-я main profession.
- Первые три профессии: лесоруб в артели гномов; служанка в баре сатиров; помощница на ферме у нежити.
- Магазин оригинала на текущем этапе исключён.
- JRPG оригинала не копируется. Позже её место может занять другая крупная подсистема: тесты, головоломки, испытания или сочетание нескольких механик.
- Мини-игры проектируются позднее, но основной движок должен позволять подключать их без переделки жизненного цикла.

## Что пока не решено

- Полный набор характеристик новой героини.
- Точный ordinary roster после трёх стартовых: provisional кандидаты = таверна, охотники, стража, гейша, наёмный убийца, торговец, проститутка; ordinary count можно расширять при необходимости.
- Точный unlock threshold и содержание скрытой дворцовой meta-профессии.
- Точная экономика зарплат/обучения/ночлега.
- Продолжительность одного прохождения.
- Список мета-наград новой игры.
- Замена JRPG.
- Конкретные мини-игры.

## Ближайшая работа

Извлекать из оригинала только то, что помогает новой игре: основной цикл, работы, школа, сон/ночлег, характеристики, открытие контента и мета-изменения правил. Не документировать каждую из 404 сцен ради самой документации.


## Подтверждённые принципы оригинала, которые считаем полезными референсами

- RunState и persistent/meta state в оригинале реально разделены: новый цикл сбрасывает сотни временных флагов, но оставляет окончания/мета-разблокировки.
- Новый обычный run начинается с 11 статов по 1, $600, 3 Stamina и 10 свободных очков распределения.
- Профессия реализована как два слоя: repeatable shift + отдельная reactive career state machine.
- Общий первый карьерный порог всех 12 работ — 15 смен.
- Простые рабочие маршруты имеют отдельный Sinner's Orb / commitment слой: право на концовку, затем фиксация endingSet, затем центральное завершение у Mr. Moe.
- Поздние работы открываются по stat gate раньше или автоматически по году позже.
- Обычная смена имеет зарплату, зависящую от профильных статов, и отдельный Fuckability content gate.
- Школа включает обычные платные stat packages и отдельную 2:1 stat-swap / Title-покупку за 1 Stamina.
- Ending bonuses — настраиваемый pre-run loadout; Titles — отдельный одиночный passive slot.
- В оригинале два ending-бонуса дают по +1 staminaBoost, а ещё +1 может дать экипированный Busy Bee Title.
- Dungeon: для входа требуется 2 обычные дневные Stamina по игровому правилу; внутри та же stamina-переменная переиспользуется как ресурс экспедиции с другими правилами. Время идёт через stepCount во время движения, clock имеет 9 визуальных фаз, а Camp переводит глобальный день +1, сбрасывает stepCount и даёт хороший/плохой ночной исход. Поражения обычно снимают 1 expedition Stamina, обычные победы не имеют общего такого расхода. Сезон реально меняет доступные области, специальные встречи и окружение.

Эти пункты — референс архитектуры, а не обязательные правила successor.

- Исправлено после повторной проверки main ABC: в normal mode `day` — день внутри года. При `day >= 41` код делает `year += 1` и `day = 1`; сезоны заново идут 1–10 / 11–20 / 21–30 / 31–40. После Year 4 rollover в Year 5 запускается terminal time-up / Sinner's Orb ending route. В Final Mode yearly rollover отключён, поэтому там `day` идёт cumulative до отдельного лимита 100.

- Ночной слой — отдельный priority resolver. Подтверждены forced overrides: sexWhitestWhite полностью обходит normal sleep/rent menu и по мере ветки оставляет на следующий день 2 -> 1 -> 0 Stamina; noRent outdoor sleep всегда оставляет 2 Stamina, снимает по 1 Charisma/Cleanliness/Class и имеет сезонные/random sexual variants; Shirley haunt может отправить в sleepScared с 2 Stamina. Обычный paid sleep остаётся отдельным меню партнёров/обучения.

- Dungeon lifecycle дополнительно подтверждён: hub сбрасывает stepCount; движение продвигает dungeon-time и отдельный encounter meter; обычные поражения обычно снимают 1 expedition Stamina, победы не имеют общего stamina-tax; Camp может продолжать одну экспедицию через несколько глобальных дней; Escape Dungeon явно обнуляет оставшуюся Stamina и возвращает домой; stepCount также влияет на постепенное затемнение некоторых карт.

- Dungeon enemy architecture уточнена: generic random enemy pools задаются по dungeon/region (D1 IDs 0–6, D2 12–15, D3 31–34), а season главным образом добавляет/убирает специальные встречи и меняет topology/actor population. D2 Ghostings буквально удаляет fakeTile blockers и оставляет raft traversal objects; D1 Darkly открывает northern cave; D3 Megahot открывает ChrBeast route.
- Exhaustive stepCount scan не нашёл общей системы "разные random enemies утром/днём/вечером": stepCount отвечает за clock, движение, затемнение и end-of-day; широкая вариативность врагов подтверждена именно по season/region/quest flags.

- Dungeon status/itemScreen — отдельная бесплатная pause/loadout точка: обычное лечение из itemStocks, смена sword/armour/accessories и sword element не меняют stepCount/Stamina/day. Семь базовых HP/MP consumables общие с combat inventory; в бою item-use обычно отдаёт следующий ход монстру.
- В dungeon ровно два accessory slots. Подтверждены Speed Heels, stat amulets, Perfume, Purse, Slimed Clock, Bracelet, Corset, ShroomHeirloom, Panties. Speed Heels обещают x2, но код даёт Speed 40->60 (x1.5). Slimed Clock обещает замедлить dungeon time, но runtime-проверок accessory key clock вне item screen в main ABC не найдено — эффект выглядит незавершённым.
- Element system: sword element реально переключается и даёт x1.5/x0.5 elemental physical damage. Combat также содержит defensive armour-element multipliers через equipElements[1], но exhaustive setter scan не нашёл способа выставить equipElements[1] после reset: armour-element equip UI выглядит незавершённым/сломавшимся в этой версии.

- Combat core теперь подтверждён формулами: physical hit uses attacker Prowess/7 vs defender Prowess/20; physical damage scales ~1.5×attack -0.5×defence; elemental magic uses Intellect×5 - Spirit×0.5 with x1.5/x0.5 element cycle.
- Seduction combat — отдельный engine: Tempt lowers all enemy stats, Coax steals once per fight, Flash stuns, Fondle zeros Durability/Spirit temporarily; shared opposed roll = Fuckability+0..50 vs enemy five-stat sum/6+0..50; 3 failed seduction actions trigger sexual-loss route. Several implementation bugs found (Flash increments Tempt counter; Fondle duration uses mismatched count/countdown fields).
- Combat statuses are command-specific: Poison = ceil(10% HP Max) tick; Stun loses turns; Lusty has ~50% chance to consume the action; Mute blocks Magic; Chastity blocks Seduce; Ass/immobilize blocks Attack+Seduce. Immunologist auto-clears most statuses but also unexpectedly clears enemy stun.
- Dungeon quest graph confirms long cross-system chains: recurring Aember teaches/tests Seduction across D1→D2→D3; dungeon items feed Farmer/Jerry routes; Emm connects economy→seasonal dungeon quest→night partner; later quest rewards directly alter encounter/combat rules.
- Original Final Mode documented only as reference: morality>=50 gate, 100-day bespoke ruleset, four-key macro objective, harsher defeat state, Finale-specific sleep/combat/scenes, and finaleBonusCount used by final encounter. Successor Final Mode remains intentionally unconstrained by this structure.


- Coax loot resolver теперь разобран по normal main-combat monster IDs 0–52: rare tiers имеют реальные вероятности 1/11, 1/16, 1/21 и 1/41; common loot обычно поддерживает expedition consumables, rare loot часто даёт equipment; bosses/story enemies в основном дают fixed money или joke outcomes. Blob имеет две UI-string ошибки, а IDs 47–50 делят один $666 branch. `_coaxStoleRare` не имеет найденного persistent/meta consumer вне combat.
- Special dungeon map architecture дополнительно подтверждена: scene transitions используют `nextDest` как route/reason token и destination-side `dungeonX/dungeonY` как spawn state; chests сохраняются через `chestsOpened[]`; сезонные elemental pedestals одновременно выдают sword+armour element components; quest flags могут заменить бой у того же map gate на scripted movement/return event. D3 receiver понимает `mazeFail` и `mazeSucceed`, но прямой main-ABC setter `mazeSucceed` пока не найден.
- Детали зафиксированы в `original_coax_loot_verified.md` и `original_dungeon_special_map_mechanics_verified.md`.


- [User playthrough] Уточнение по обычной границе run: конец последнего года штатно приводит к концовке и завершению игры. Это больше не считается отдельным открытым вопросом.
- Combat ID cleanup: ID 43 = Aember; IDs 47–50 — четыре scaling-варианта Soo, выбираемые по `sooGirlsCollected`; ID 45 не имеет найденного normal `_monsterRandomPick` assignment и считается unused/unassigned slot. Space IDs 58–59 не имеют отдельной Coax-награды в normal resolver.
- `OPEN_QUESTIONS.md` очищен от уже закрытых core/job/school/meta/dungeon вопросов; дальнейший original-analysis должен добавлять новый архитектурный принцип, а не превращаться в exhaustive atlas.


- Seasonal competition layer теперь разобран: festival intro на day 5; recurring contest dates каждого года = day 10/16/28/39; четыре contests используют разные challenge types и по завершении переводят прямо в night transition, не расходуя обычную Stamina.
- Contest progression хранит одновременно `contestWonList[0..3]` (breadth/mastery) и cumulative `contestsWon/contestsLost`. Four distinct wins, five total wins и six total losses дают три отдельные Sinner's Orb/ending routes с разными meta rewards.
- Подробности: `original_seasonal_competitions_verified.md`.


- Minor-crisis layer разобран: каждый новый normal-mode day имеет 1/2 шанс предложить optional Scene 249; вход не стоит Stamina/day, игрок выбирает один из 3 stat approaches, а deterministic check идёт против `baseThreshold + yearly random difficultyMod`. Outcomes меняют stats/money/Stamina и возвращают в обычный дневной цикл.
- Crisis difficulty scales 5–15 / 15–25 / 20–50 / 30–60 for Years 1/2/3/4+. Year 0 не имеет branch и поэтому оставляет difficultyMod=0 — непреднамеренное облегчение meta extra-year.
- Quest-state может inject special crises 99/100 и напрямую менять Pimp Wars flags/counters.
- Найден implementation gap: runtime pool выбирает только IDs 0–18 (plus 99/100), хотя UI/resolver полностью содержит IDs 19–23 и seasonal variants. Writers для 19–23 не найдено, поэтому эти branches считаются unreachable в этой версии.
- Подробности: `original_minor_crises_verified.md`.


- Main reactive router дополнительно разобран: Scene 0 является общей reaction point после любых activities, но progression реализована не единым queue/resolver, а серией независимых update-listeners для global progression и отдельных career/story chains. Normal handlers используют `finaleMode == false` + `endingSet == ""` как глобальные stop gates.
- Поэтому внешняя activity может изменить stat/flag, а соответствующая career scene запускается только после возврата на main. Явного общего event arbitration/consumed flag нет; код полагается на flags и listener/engine ordering.
- Для successor полезно сохранить central reaction point, но заменить listener-spaghetti на explicit eligible-event queue + priority + one-event-at-a-time resolution.
- Подробности: `original_main_reactive_router_verified.md`.


## Переход от reverse-engineering к successor architecture

- Создан `docs/SUCCESSOR_SYSTEM_ARCHITECTURE_v0.md`: технический каркас новой игры без фиксации пока открытых content/balance решений.
- Каркас явно разделяет MetaState / RunState / DayState / ActivityState; сохраняет reactive progression, но заменяет original main-listeners на explicit Event Resolver с очередью/priority.
- Work разделён на data-driven repeatable JobDefinition и CareerStateMachine; Night использует отдельный resolver и NextDayModifiers; large activity имеет отдельный state и не переиспользует дневную Energy как внутреннюю endurance.
- Calendar, optional day events, endings и meta rewards проектируются data-driven, чтобы избежать hard-coded scene checks и unreachable branches оригинала.
- Следующий технический milestone для новой игры: минимальный vertical slice с одним полностью реализованным job, school, lodging/night, Event Resolver, ending commitment и одним meta modifier.


## Stat-system design draft

- Создан `docs/STAT_SYSTEM_DRAFT_v0.md` как НЕзафиксированное предложение.
- Рабочая модель сокращает original 11 progression stats до 9 core axes: Сила, Выносливость, Ловкость, Разум, Магия, Смекалка, Обаяние, Манеры, Похоть.
- Original Sociability+Class предлагается объединить в Манеры; Cleanliness не переносить автоматически как permanent stat, а при необходимости сделать volatile Ухоженностью; Morality держать route/faction state, а не покупаемой характеристикой.
- Статы не фиксировать до черновой матрицы всех 10 ordinary jobs: сначала нужны остальные 7 профессий, затем coverage/tradeoff check.


## Astra handoff / M3.2 integration review

- Прочитаны `ASTRA_HANDOFF.md`, `prior-work/astra/RECONCILIATION.md`, M3.2 core/schema/content/persistence/tests, DS-REF-001 и M3.3 patch как исторический WIP.
- M3.2 признан полезным ядром-прототипом, а не выбрасываемым макетом и не target architecture целиком.
- Сохранять: pure core boundary, declarative Condition AST, whitelisted Effects, pack reads/writes, deterministic event ordering, persisted RNG, pending-scene save, immutable dispatch model, unified Run+Meta envelope, explicit migrations, rollback protection for Meta, presentation/mechanics separation.
- Расширять: Event Resolver/cascade, trigger vocabulary, typed career/quest/relationship state, Effect types, ActivityState, Night resolver, configurable calendar и content migrations.
- Заменять: historical stat catalog, 28-day seasons/448-day run, old starter jobs, concrete legacy rewards и общий metrics bag.
- M3.3 автоматически не применять.
- Создан `docs/PROTOTYPE_M3_2_REUSE_REVIEW.md` с таблицей сохранить/расширить/заменить/удалить и корректировками раннего SOL architecture v0.


## Target architecture v1

- После сверки с M3.2 сформирован target architecture baseline v1. `SUCCESSOR_SYSTEM_ARCHITECTURE_v0.md` оставлен как historical draft и больше не является implementation baseline.
- Созданы target contracts:
  - `TARGET_STATE_OWNERSHIP_v1.md`;
  - `PROGRESSION_CONDITION_EFFECT_CONTRACT_v1.md`;
  - `EVENT_RESOLVER_CONTRACT_v1.md`;
  - `NIGHT_AND_ACTIVITY_CONTRACT_v1.md`;
  - `SAVE_AND_MIGRATION_CONTRACT_v1.md`;
  - `SUCCESSOR_SYSTEM_ARCHITECTURE_v1.md`.
- State ownership: текущая Energy имеет одного authoritative owner в DayState; Run+Meta остаются единым атомарным SaveEnvelope; progression разделяется на typed Careers / Quests / Relationships / WorldFacts.
- Condition/Effect v2 остаются декларативными и whitelist-only; произвольные JS callbacks/state paths запрещены. Cross-system progression идёт через public facts/reaction facts и разрешённые domain transitions.
- Event Resolver расширяет M3.2 scheduler: typed triggers, priority classes, reaction epoch, persisted RNG/pending, re-check после choice, cascade protection и delivery policies live/latched/scheduled.
- Night разделён на phases с forced interception до/после lodging; payment, voluntary night и CalendarAdvance имеют exactly-once semantics.
- Large Activity получает отдельный versioned ActivityEnvelope; внутренняя endurance/HP/time не переиспользует daily Energy.
- Save architecture различает schemaVersion и contentVersion; migrations обязаны сохранять resolved randomness/pending flow и exactly-once costs/rewards.
- Создан `ARCHITECTURE_MIGRATION_SLICE_v1.md`: первый engineering gate должен доказать migration M3.2 -> target-shaped state, cross-system resolver, cascade, Night, resumable test Activity и ending/meta exactly-once до масштабирования контента.
- Создан `SOL_ARCHITECTURE_HANDOFF.md` как компактная точка входа для независимого Astra-review через GitHub.


## Hidden Poverty Career — user-directed design

- Уточнено прямым решением пользователя: это **секретная долговая ветка**, а не видимая poverty-career.
- Trigger: во время ночёвки на улице есть одноразовое редкое событие с шансом ориентировочно 10–20%. "Добряк" предлагает около 2000 денег; игрок может принять или отказаться.
- При отказе событие больше не повторяется в текущем run. При принятии деньги выдаются сразу, а через 10 дней активируется требование примерно 20000.
- После активации открывается скрытая профессия "Рабыня"; остальные обычные профессии блокируются, но их progress не стирается.
- Скрытая профессия имеет полноценную career progression по тем же принципам, что обычные jobs.
- Её рабочая смена развивает Силу + Выносливость + Сексуальность. Семантика Сексуальности относительно Похоти пока OPEN.
- Ночная обязательная секс-работа остаётся отдельным forced NightFlow и даёт отрицательный NextDay Energy modifier.
- Минимум три endings остаются обязательными: `paid_freedom`, `bound_life`, `takeover`.
- Исправленный design записан в `docs/POVERTY_HIDDEN_CAREER_DRAFT_v0.md`.
- OPEN: точные 10–20%/2000/20000, Energy penalty, доступность школы/большой Activity после блокировки профессий, отношение Сексуальности к Похоти, exact meta rewards и Hard Work accounting.


## Secret debt clarification

- Пользователь уточнил формулировку входного события: "добряк" не предупреждает о подвохе, процентах или будущей зависимости; он лишь говорит, что деньги нужно будет "вернуть позже".
- Срок 10 дней, долг около 20000, блокировка профессий и скрытая работа заранее игроку не раскрываются.


## Job roster source correction

- Восстановлен первоначальный пользовательский кандидатный список 10 ordinary jobs: таверна, лесорубы, охотники, стража, гейша, служанка, наёмный убийца, торговец, проститутка, дворец.
- Это пользовательское design proposal, а не финальный lock и не список Simply Mindy.
- Старый M3.2 реализовал только таверну / лесорубов / охотников.
- Текущий SOL-каркас стартует с лесоруба у гномов / служанки в баре сатиров / помощницы на ферме нежити.
- Нельзя просто «придумать остальные 7»: бар сатиров неясно соотносится с отдельными старыми архетипами «таверна» и «служанка», а ферма нежити — новый слот вне исходного списка.
- Создан `docs/JOB_CANDIDATE_LINEAGE_v0.md`. Следующий design step — roster reconciliation KEEP / MERGE / REFRAME / REPLACE, затем job/stat matrix.


## Palace / roster correction

- Пользователь напомнил: профессий не обязательно ровно 10; можно делать больше.
- Текущий удобный roster: 10 ordinary/public профессий + последняя скрытая работа во дворце = 11 main professions.
- Palace больше не считается неизвестной «11-й профессией»: её identity как скрытой late/meta job восстановлена.
- Secret Debt / Slave Career остаётся дополнительной hidden career сверх этого roster и не занимает Palace slot.
- Ферма нежити не обязана вытеснять один из старых архетипов.


## Ordinary job roster + stat/school design pass

- Создан `JOB_ROSTER_RECONCILIATION_v1.md`: provisional ordinary roster из 10 механически различимых профессий:
  1. лесоруб у гномов;
  2. служанка в баре сатиров;
  3. помощница на ферме нежити;
  4. работница таверны/трактира;
  5. охотница;
  6. стражница;
  7. гейша/артистка дома искусств;
  8. наёмная убийца;
  9. торговка;
  10. проститутка.
- Palace остаётся 11-й скрытой/meta-профессией; Secret Slave Career — отдельной дополнительной hidden career.
- Tavern и Satyr Maid разведены по системной роли: tavern = информация/поток/экономика; maid = personal service/relationships/night.
- Для каждой ordinary job зафиксированы distinct gameplay loop, cross-system hooks и минимум 3 family outcomes (Hard Work + personal/identity + systemic/mastery).
- Создан `JOB_SYSTEM_MATRIX_v0.md`: проверены связи jobs со школой, poverty, relationships, seasons, items, large Activity и Meta.
- Создан `STAT_COVERAGE_MATRIX_v1.md`. Восемь общих осей хорошо покрываются roster; главный открытый вопрос — Сексуальность vs Похоть.
- Рабочая гипотеза SOL, НЕ lock: 9 progression stats (включая Сексуальность) + отдельная Похоть как content axis. Сексуальность = навык/уверенность; Похоть = внутренний интерес/добровольные content variants.
- Создан `SCHOOL_SYSTEM_DRAFT_v0.md`: школа проектируется как самостоятельная progression system с tracks, преподавателями, milestones/exams, certificates/public facts, night study и собственными education endings. Простая модель pay->+stat считается недостаточной.
- Draft school tracks: грамота/счёт, магические основы, риторика/переговоры, этикет, практическая ловкость/ремесло, физподготовка, сценическое искусство/телесная подача.


## Relationships, large Activity and product traceability

- Создан `RELATIONSHIP_SYSTEM_DRAFT_v0.md`: relationships проектируются как typed per-NPC state/stages/counters, а не универсальная heart bar. Job -> night -> school/item/Activity -> job feedback loop считается ключевым acceptance pattern.
- Создан `LARGE_ACTIVITY_PRODUCT_ROLE_v0.md`: большая Activity обязана быть meaningful second mode с собственной progression, tools/items, seasons, NPC/quests, save/resume и city feedback loops. Test adapter сам по себе не закрывает product requirement.
- Рабочее предложение SOL для large Activity: expedition umbrella с exploration/navigation + varied stat challenges + отдельными puzzle/tactical/investigation encounters; это НЕ user lock.
- Создан `LIFE_REQUIREMENTS_TRACEABILITY_v0.md`, связывающий LIFE-01…18 с текущими contracts/design docs.
- Самые крупные remaining product gaps по traceability: ordinary poverty/economy, target UI shell, одна полностью расписанная career, item system, meta macro-goal и content production budget.


## Economy / poverty / target shell

- Создан `ECONOMY_AND_POVERTY_DRAFT_v0.md`: обычная бедность отделена от Secret Debt route. Минимальный housing ladder = normal room / cheap lodging / street; street всегда позволяет продолжить run, но даёт next-day penalty и отдельный event pool.
- Anti-softlock rule: стартовые работы не требуют денег/обязательного предмета для базовой смены; игрок с 0 money должен иметь достижимый способ заработать.
- Secret lender остаётся редким one-time street event и не является стандартным poverty exit.
- Economy до числового lock должна пройти simulations poor/balanced/grinder/activity/education/debt-trap.
- Создан `TARGET_GAME_SHELL_v0.md`: основной UI остаётся media-first central stage с persistent HUD day/season/year/Energy/money, compact navigation и сменой media/text внутри того же центрального окна.
- Secret jobs не спойлерятся UI; pending scenes блокируют обычные действия; school/activity/night имеют отдельные режимы, но не превращают игру в dashboard.
- Product shell acceptance отделён от технического Architecture Migration Slice.


## First full career reference slice

- Создан `CAREER_LUMBER_DRAFT_v0.md` как первый полный product-level career reference.
- Lumber описан как repeatable shift + seasonal variants + typed career stages + major relationship + school/item/Hunter/Tavern/Merchant/Activity hooks.
- Минимум три distinct outcomes: Hard Work, Forewoman/leadership, Forest multi-system route; relationship/global endings могут существовать параллельно.
- Exact thresholds/stats/salary/NPC/text/meta rewards пока не фиксированы.
- Документ служит проверкой LIFE-01/02/03/04/09/11/12/13/14/16 и эталоном требуемой глубины для остальных jobs.


## Item / Palace / meta macro-goal design

- Создан `ITEM_SYSTEM_DRAFT_v0.md`: предметы должны в первую очередь открывать capabilities/actions/routes, а не быть набором пассивных процентов. Определены tools, key/route items, consumables, contextual equipment/loadout, trade goods и relationship items.
- Inventory остаётся run-state; meta может открывать стартовый item/source/recipe, но не превращает профиль в бесконечный persistent inventory.
- Создан `PALACE_HIDDEN_CAREER_DRAFT_v0.md`: Дворец проектируется как полноценная late/meta career, а не просто дорогая работа. Unlock идёт через несколько уникальных Hard Work achievements; exact required count остаётся OPEN.
- Palace должен реально использовать legacy прошлых профессий и иметь минимум три outcome families: Palace Hard Work, Court Power, Inner Truth/world route.
- Создан `META_MACRO_GOAL_DRAFT_v0.md`: meta разделён на utility unlocks и persistent knowledge/world facts. Большая цель строится через комбинацию разных жизненных перспектив, а не через один mystery-percent и не требует автоматически пройти все jobs.
- Palace — convergence point, но не единственный источник global mystery.
- `LIFE_REQUIREMENTS_TRACEABILITY_v0.md` обновлён: LIFE-11, LIFE-14 и LIFE-15 теперь имеют сильные design drafts, но ещё требуют playable content proof.


## Concrete Lumber cross-system product slice

- Создан `LUMBER_RELATIONSHIP_CHAIN_v0.md`: concrete major-NPC chain для бригадира с professional / close / rival routes. Relationship начинается через career, продолжается добровольной night opportunity, требует внешнего School/Tavern/Hunter/Item/Activity input и затем меняет Lumber career.
- Создан `FOREST_ACTIVITY_SLICE_v0.md`: конкретный лесной product slice большой Activity. Entry = 2 daily Energy; внутри отдельные endurance/supplies/time, три route contexts, navigation/physical/magical challenge families, seasonal topology и city-preparation feedback.
- Создан `INITIAL_ITEM_CATALOG_v0.md`: 10 конкретных capability-based предметов, включая Reinforced Axe, Rope Kit, Preservation Kit, Boundary Token, Sealed Pass, Court Attire и Debt Ledger. Предметы открывают actions/routes, а не существуют только как проценты.
- Сквозная acceptance chain теперь описана: Lumber milestone -> Foreman relationship -> night meeting -> external fact/item -> Forest Activity -> result fact -> Resolver -> career/relationship branch -> multiple endings.
- Это первый продуктовый пример, который одновременно проверяет LIFE-10/11/12 поверх уже существующего Lumber career draft.


## Three starting career reference drafts

- Создан `CAREER_SATYR_MAID_DRAFT_v0.md` как второй full career reference: social/night focus, recurring guests, boundaries, tips/reputation, strong relationship and School integration. Outcome families: Hard Work, House Power, Personal Network и House Rules/Boundary Mastery.
- Создан `CAREER_UNDEAD_FARM_DRAFT_v0.md` как третий full career reference: seasonal production, meaningful ingredients/items, Magic/Reason, School research, Merchant и Activity feedback. Outcome families: Hard Work, Research Farmer, Farm Successor, External Anomaly.
- Теперь три стартовые профессии покрывают разные ядра: physical/expedition, social/night, magical/production.
- На этой базе создан `STAT_MODEL_RECOMMENDATION_v2.md`: рабочая рекомендация — 9 progression stats с Сексуальностью + отдельная Похоть как content axis.
- Это НЕ lock: особенно OPEN стартовое распределение — все 10 параметров / только 9 stats / отдельный Lust choice. SOL предпочитает вариант 9 stats + separate Lust, но требуется решение пользователя из-за прежнего требования стартовых 10 очков.


## Full ordinary career roster drafted

- Все 10 ordinary/public professions теперь имеют full career design drafts:
  - `CAREER_LUMBER_DRAFT_v0.md`
  - `CAREER_SATYR_MAID_DRAFT_v0.md`
  - `CAREER_UNDEAD_FARM_DRAFT_v0.md`
  - `CAREER_TAVERN_DRAFT_v0.md`
  - `CAREER_HUNTER_DRAFT_v0.md`
  - `CAREER_GUARD_DRAFT_v0.md`
  - `CAREER_GEISHA_ARTIST_DRAFT_v0.md`
  - `CAREER_ASSASSIN_DRAFT_v0.md`
  - `CAREER_MERCHANT_DRAFT_v0.md`
  - `CAREER_PROSTITUTE_DRAFT_v0.md`
- Tavern отделён от Satyr Maid: information/housing/supply hub против personal service/night relationship focus.
- Hunter отделён от Assassin: seasonal resource/field profession против covert contract/preparation profession.
- Geisha/Artist отделена от Prostitute: art/etiquette/status/patronage против voluntary sexual work/client-network/independence.
- Guard использует city crisis layer как профессиональную систему без Morality stat.
- Merchant — экономика/предметы/supply network, не shop UI.
- Все 10 сохраняют общий принцип repeatable work + reactive career progression + Hard Work + 2+ более сложных outcome families.
- Следующий общий design pass: job stat tradeoffs, meta reward hierarchy и content production budget.


## Roster-wide tradeoff / rewards / production pass

- Создан `JOB_STAT_TRADEOFF_PASS_v0.md`. Он проверяет правило +2/+2/-1 на всём roster и показывает, что фиксированный permanent -1 естественен не для всех профессий. Самые проблемные: Prostitute, Undead Farm, Tavern, частично Satyr Maid.
- Предложение SOL, НЕ lock: сохранить пользовательское правило +2/+2/-1, но дать каждой профессии 2–3 work styles с разными tradeoffs. Так отрицательная ось становится выбором специализации, а не моральной/стереотипной оценкой всей профессии.
- Создан `META_REWARD_HIERARCHY_DRAFT_v0.md`: Hard Work rewards должны быть умеренными и тематическими; branch mastery сильнее и уже; cross-system endings дают rule/route/knowledge unlocks; Palace/meta rewards относятся к позднему уровню. +daily Energy не использовать как лёгкую стажевую награду.
- Для Secret Debt rewards определены только families: paid_freedom = economic resilience/debt knowledge; bound_life = hidden-system familiarity; takeover = сильный network/status/rule-changing reward. Exact rewards OPEN.
- Создан `CONTENT_PRODUCTION_BUDGET_DRAFT_v0.md`: ориентир обычной профессии = 8–16 repeatable variants, 6–10 major career milestones, 3–5 ending families, 1 major relationship chain и 1–3 external hooks. Это budget hypothesis, не quota lock.
- При среднем объёме 10 ordinary careers дают порядка ~290 крупных/средних content units ещё до общих School/Activity/night/calendar systems; поэтому обязательны placeholders, reusable variant rules и bounded production packages.
