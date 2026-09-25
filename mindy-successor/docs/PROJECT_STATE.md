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
- Всего 10 обычных профессий. В начале доступны только 2–3.
- 11-я профессия — мета-разблокировка после получения профессиональной концовки «Упорный труд» на предыдущих профессиях.
- Первые три профессии: лесоруб в артели гномов; служанка в баре сатиров; помощница на ферме у нежити.
- Магазин оригинала на текущем этапе исключён.
- JRPG оригинала не копируется. Позже её место может занять другая крупная подсистема: тесты, головоломки, испытания или сочетание нескольких механик.
- Мини-игры проектируются позднее, но основной движок должен позволять подключать их без переделки жизненного цикла.

## Что пока не решено

- Полный набор характеристик новой героини.
- Остальные 7 обычных профессий и 11-я профессия.
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
