# New Game Spec v1 — зафиксированный продуктовый каркас

Дата: 2026-09-25.

Статус: **CURRENT LOCKED PRODUCT BASELINE**.

Этот документ заменяет `NEW_GAME_SPEC_v0.md` там, где решения были уточнены позже.

## 1. Базовый цикл

- Base daily Energy = 3.
- Ordinary work = 1 Energy.
- School = 1 Energy + money.
- Large Activity entry = 2 Energy.
- Night study уменьшает Energy следующего дня на 1.
- Lodging/night завершает день.
- RunState и MetaState разделены.

## 2. Календарь — LOCKED

Обычный run:
- 4 года;
- 40 дней в году;
- 4 сезона;
- 10 дней на сезон;
- всего 160 дней.

Технический calendar остаётся data-driven, но baseline balance строится под 160 дней.

Terminal flow не должен обрывать действие посреди команды:
`time limit -> final fate/ending choice window -> completion`.

## 3. Характеристики — LOCKED DIRECTION

Progression stats — 12:

1. Сила
2. Выносливость
3. Ловкость
4. Разум
5. Магия
6. Творчество
7. Смекалка
8. Обаяние
9. Общительность
10. Манеры
11. Ухоженность
12. Сексуальность

Отдельная content-axis:
- Похоть.

Подробности: `TARGET_STAT_SYSTEM_v1.md`.

## 4. Создание героини

- все 12 progression stats стартуют с 1;
- 10 свободных очков распределяются между 12 progression stats;
- Похоть стартует отдельно и не расходует эти 10 очков;
- exact starting Lust value определяется balance pass.

## 5. Ухоженность

Ухоженность — полноценная характеристика, функционально наследующая полезную системную роль original Cleanliness.

Она:
- может быстро расти и падать;
- участвует в jobs, housing, street, School, relationships, Palace и presentation/status routes;
- не дублируется вторым global cleanliness meter.

Краткосрочные состояния вроде «испачкалась/промокла» при необходимости существуют как named conditions.

## 6. Работа

Каждая ordinary profession имеет:

1. Repeatable shift:
   - cost 1 Energy;
   - salary;
   - seasonal stat package;
   - repeatable presentation/content variants.

2. Career state machine:
   - milestones;
   - stat/external gates;
   - relationships;
   - School/Item/Activity hooks;
   - branch choices.

3. Outcome families:
   - Hard Work;
   - минимум две более сложные/системные судьбы.

## 7. Seasonal work stats — LOCKED PRINCIPLE

Универсального `+2/+2/-1` больше нет.

Одна профессия меняет разные характеристики в разные сезоны.

Пакеты:
- data-driven;
- могут иметь разное число positive/negative effects;
- могут использовать +2 на отдельных stats;
- не обязаны иметь одинаковую сумму каждый сезон.

Подробности: `SEASONAL_JOB_STAT_MODEL_v1.md`.

## 8. Ordinary roster and unlocks — LOCKED STRUCTURE

Текущий baseline ordinary roster — 10:

1. Lumber / артель гномов — **доступна с начала**
2. Satyr Maid / служанка в баре сатиров — **доступна с начала**
3. Undead Farm / помощница на ферме нежити — **доступна с начала**
4. Tavern / трактир
5. Hunter / охотница
6. Guard / стражница
7. Merchant / торговка
8. Artist/Geisha / дом искусств
9. Assassin / наёмная убийца
10. Prostitute / добровольная профессиональная сексуальная работа

На старте доступны **ровно 3 ordinary jobs**.

Остальные 7 открываются по dual-gate:
- раньше при достижении профильных stat requirements;
- либо гарантированно позднее по calendar fallback.

Рабочее деление:
- Year 2 fallback: Tavern, Hunter, Guard, Merchant;
- Year 3 fallback: Artist/Geisha, Assassin, Prostitute.

Exact stat thresholds определяются balance simulation.

School и meta rewards позволяют пробивать stat-gates раньше, поэтому новые жизни естественно открывают профессии быстрее.

Подробности: `ORDINARY_JOB_UNLOCK_MODEL_v1.md`.

Current lock: ordinary roster is exactly 10. Изменение числа ordinary professions требует нового прямого решения пользователя.

## 9. Palace — LOCKED UNLOCK RULE

Palace — скрытая late/meta profession сверх ordinary roster.

Она открывается **только после получения Hard Work outcome на всех 10 ordinary professions**.

Правила:
- считается каждый unique ordinary profession один раз;
- повтор одной и той же Hard Work не помогает;
- Secret Debt `bound_life` не считается;
- другие hidden careers не считаются;
- threshold при текущем roster = 10/10.

Если ordinary roster позже официально расширяется, отдельно решается, входит ли новая профессия в Palace prerequisite; не менять threshold молча.

## 9A. Palace True Ending / Return Home — LOCKED

Palace имеет отдельную **истинную концовку** сверх своих обычных outcome families.

Eligibility:
- Palace уже открыт через Hard Work на всех 10 ordinary professions;
- все **12 progression stats строго выше 90%**;
- Lust/Похоть не входит в эту проверку, потому что остаётся отдельной content-axis;
- финальный Palace confrontation с Принцем завершён победой героини.

Completion:
- героиня возвращается в свой исходный мир.

Meta / New Game+ reward:
- навсегда открывается опция **x2 ко всем 12 progression stats** при старте New Game+.

True Ending:
- не заменяет и не сокращает Palace 10/10 prerequisite;
- является отдельной +1 концовкой сверх Palace Hard Work / Court Power / Inner Truth;
- не отменяет другие одновременно eligible Palace outcomes.

Exact encounter implementation, Prince lore/name, reward application order relative to other Meta modifiers, cap behavior, IDs and presentation remain implementation-owned/open until отдельного lock.

При текущем minimum catalog это повышает явный нижний предел planned outcome families с **46 до 47**:
- 40 ordinary-career families;
- 3 Secret Debt;
- минимум 3 ordinary Palace families;
- 1 Palace True Ending.

## 10. Secret Debt / Slave Career

Отдельная hidden career сверх ordinary roster и Palace.

Зафиксировано:
- secret street-lender entry;
- delayed debt trap;
- ordinary jobs block после активации;
- forced NightFlow;
- next-day Energy penalty;
- минимум три outcomes:
  - paid_freedom;
  - bound_life;
  - takeover.

Она не является Palace Hard Work requirement.

## 11. School

School — самостоятельная progression system:
- tracks;
- teachers;
- milestones;
- certificates/public facts;
- career/relationship unlocks;
- night study.

Не просто магазин статов.

## 12. Relationships

Typed per-NPC progression:
- stages;
- counters/facts only where useful;
- optional meters only where justified;
- no universal heart bar.

Work -> Night -> School/Item/Activity -> Work feedback loops обязательны для major relationships.

## 13. Activity

Target direction:
**Expedition umbrella**.

Содержит:
- exploration/navigation;
- stat challenges;
- item/tool use;
- puzzle/tracking/investigation/tactical encounters where useful;
- own internal resources;
- save/resume;
- city feedback.

Camp допускается для multi-day expeditions и остаётся отдельным от city lodging/night.

## 14. Items

Capability-based:
- открывают actions/routes;
- меняют risk/cost/method;
- являются evidence/keys/tools/resources.

Не строить систему вокруг пассивных процентов.

## 15. Meta

Knowledge/content unlocks:
- persistent/automatic.

Сильные rule-changing perks:
- pre-run selectable loadout с ограничением, exact budget/slots определяется позже.

Hard Work:
- даёт умеренную thematic reward;
- также отмечает конкретную ordinary profession как завершённую для Palace 10/10.

## 16. Public release strategy

Разработка идёт staged internal playable milestones.

Публичный полноценный 1.0 должен включать заявленные системные pillars, включая:
- ordinary poverty;
- Secret Debt route;
- Palace/meta progression;
- meaningful Activity;
- career/relationship depth.

Внутренние slices не считаются публичной полнотой игры.

## 17. Не копируем автоматически

- original characters/dialogue/assets;
- original JRPG;
- original Final Mode;
- original numeric balance;
- original exact seasonal stat packages.

Используем архитектурные принципы, подтверждённые reverse engineering.


## 18. Кривая сложности / Meta easing — LOCKED PRINCIPLE

Fresh profile — самая трудная обычная версия игры.

Нормально, что в начале:
- приходится много работать;
- школа дорогая;
- rent заметно давит;
- приходится выбирать между учёбой, Activity, отношениями и накоплением денег.

При этом любой progression stat должен оставаться достижим через обычную петлю:
`работа -> деньги -> школа -> нужный stat`.

School — намеренный build-correction инструмент:
- все 12 progression stats имеют repeatable paid source;
- дорогие multi-stat lessons могут быть заметно эффективнее по Energy;
- отдельный special correction service может конвертировать surplus stat в нужный stat с потерей, candidate 2:1.

Endings/Meta намеренно делают последующие жизни проще:
- starting stats/money;
- +Energy;
- rent relief;
- stat carry-over;
- daily income;
- School improvements;
- starting items;
- profession/content unlocks;
- другие rule changes.

Не балансировать NG+ обратно к сложности fresh profile.

Подробности:
- `PROGRESSION_AND_DIFFICULTY_PHILOSOPHY_v1.md`
- `SCHOOL_SYSTEM_v2.md`
- `META_REWARD_PHILOSOPHY_v1.md`.
