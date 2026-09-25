# Job System Matrix v0

Дата: 2026-09-25.

Статус: **DESIGN DRAFT FOR STAT/ECONOMY COVERAGE**, не финальный stat lock.

Основание: `JOB_ROSTER_RECONCILIATION_v1.md`, `USER_VISION_AND_ACCEPTANCE.md`, job architecture research.

## 1. Зачем эта матрица

Финальный набор характеристик нельзя выбирать по вкусу.

Он должен выдержать сразу:
- 10 ordinary jobs;
- hidden Palace;
- Secret Slave Career;
- школу;
- отношения;
- сезоны;
- предметы;
- большую Activity;
- экономику и бедность.

Поэтому ниже используются **candidate design axes**, а не утверждённые финальные stat IDs.

## 2. Candidate axes

Рабочие оси для проверки покрытия:

- **Сила** — физическая мощь.
- **Выносливость** — длительная нагрузка/устойчивость.
- **Ловкость** — точность, движение, скрытность.
- **Разум** — обучение, анализ, знания.
- **Магия** — взаимодействие с магическим устройством мира.
- **Смекалка** — импровизация, обман, практическая хитрость.
- **Обаяние** — личное социальное воздействие.
- **Манеры** — этикет, статусное поведение, профессиональная социальная дисциплина.
- **Сексуальность / Похоть** — пока **НЕ СЛИТО**: пользователь отдельно назвал Сексуальность в Secret Slave Career, а прежний каркас имеет Похоть как положительный content stat.

До финального lock нужно решить, это:
- одна шкала;
- две разные шкалы;
- permanent stat + content preference/condition.

## 3. Ordinary job matrix

Знаки ниже — **направление дизайна**, не окончательный +2/+2/-1 package.

| Job | Основные развиваемые оси | Возможный tradeoff | Доходная логика | Сезонность | Главный внешний hook | Night/relationship | Item hook |
|---|---|---|---|---|---|---|---|
| Lumber | Сила, Выносливость | Манеры/Разум [проверить] | производительность + стаж | доступность леса, погода, древесина | лес/Activity, охота | бригада | инструменты |
| Satyr Maid | Обаяние, Сексуальность | физ./учебный opportunity cost [OPEN] | обслуживание + репутация | поток гостей/праздники | отношения/слухи | очень сильный | одежда/подарки |
| Undead Farm | Выносливость, Магия/Разум | Обаяние [OPEN] | урожай/переработка | основной seasonal job | школа/Activity | хозяин/работники | ингредиенты |
| Tavern | Обаяние, Смекалка | Магия/физическая ось [OPEN] | поток гостей + услуги | путешественники/поставки | rumours/trade | постояльцы | запасы/ключи |
| Hunter | Ловкость, Выносливость | Манеры [OPEN] | контракты + добыча | критическая зависимость | large Activity | напарники | оружие/приманки |
| Guard | Сила/Выносливость, Манеры | Смекалка/Сексуальность [OPEN] | ранг + опасные смены | типы кризисов | city events | коллеги/граждане | жетон/экипировка |
| Geisha | Манеры, Обаяние | Сила [кандидат] | мастерство + патроны | фестивали/репертуар | школа/дворец | патроны/коллеги | наряды/инструменты |
| Assassin | Ловкость, Смекалка | Обаяние/Манеры [OPEN] | сложность контракта | маршруты/видимость | Activity/стража | handler/targets | инструменты/яды |
| Merchant | Смекалка, Обаяние/Манеры | физическая ось [OPEN] | маржа + сеть | спрос/дефицит | inventory/economy | партнёры/клиенты | центральная роль |
| Prostitute | Обаяние, Сексуальность | Выносливость/другая ось [OPEN] | репутация + клиентский tier | спрос/фестивали | relationships/status | центральная роль | одежда/контракты |

### Важное ограничение

Не назначать tradeoff только ради заполнения таблицы.

Перед финальным +2/+2/-1 каждому отрицательному изменению нужен:
- понятный fantasy/routine reason;
- балансирующая польза профессии;
- отсутствие стигматизирующей семантики.

Например, Prostitute не должна автоматически терять «Манеры» или «Разум» только из-за темы профессии.

## 4. System-role coverage

### Physical
- Lumber
- Hunter
- Guard
- Farm

### Social / relationship
- Satyr Maid
- Tavern
- Geisha
- Prostitute
- Merchant

### Economic
- Merchant
- Tavern
- Farm
- Lumber
- Prostitute

### Magic
Сейчас сильный естественный anchor есть прежде всего у **Undead Farm**.

Это недостаточно для финального stat lock: если Магия остаётся core stat, она должна иметь meaningful use ещё минимум в:
- школе;
- large Activity;
- Palace;
- отдельных routes Hunter/Geisha/Assassin или world systems.

Иначе Магия рискует стать декоративной.

### Dexterity / covert
- Hunter
- Assassin
- часть Guard/Activity.

### Status / etiquette
- Geisha
- Guard
- Merchant
- Palace.

### Sexual-content axis
- Satyr Maid
- Prostitute
- Secret Slave Career;
- плюс content variants любой другой работы, если высокий stat это разрешает.

Это должно оставаться content-routing, а не универсальным salary penalty.

## 5. Cross-system dependency matrix

| Job | School | Housing/poverty | Relationships | Large Activity | Calendar/season | Meta |
|---|---|---|---|---|---|---|
| Lumber | техника/счёт/лидерство | обычное давление | бригада | лесная цепь | сильная | forewoman/forest unlock |
| Satyr Maid | social/performance | tips помогают выйти из бедности | очень сильная | слабая/точечная | средняя | bar influence |
| Farm | magic/agriculture | продукты/дешёвый быт | средняя | ингредиенты/quest | очень сильная | farm knowledge |
| Tavern | accounting/cooking/social | жильё/комнаты | сильная | rumours from expeditions | сильная | information network |
| Hunter | tracking/craft | добыча как survival | средняя | очень сильная | очень сильная | route knowledge |
| Guard | law/tactics | street poverty events | сильная | city/field missions | средняя | authority |
| Geisha | центральная зависимость | статус уменьшает давление | сильная | редкие cultural quests | очень сильная | court access/status |
| Assassin | planning/poisons | высокая оплата vs риск | точечная | сильная | средняя | covert contacts |
| Merchant | accounting/negotiation | центральная | средняя | supply routes | очень сильная | starting trade access |
| Prostitute | social/health/finance if defined | сильная альтернатива бедности | центральная | точечная | сильная | clientele/independence |

## 6. Poverty and Secret Slave distinction

Poverty не обязана вести в Secret Debt route.

Ночёвка на улице:
- имеет обычные последствия/события;
- только один раз может предложить secret loan encounter с шансом 10–20%.

Если debt trap активирован:
- ordinary jobs блокируются;
- hidden Slave career становится единственной job;
- её progress отдельный.

Это не должно превращать любую бедную игру в обязательную slave route.

## 7. Palace coverage

Palace должен быть местом, где ранее развитые оси получают late-game применение.

Минимально Palace должен уметь различать несколько build archetypes:
- physical/security;
- social/etiquette;
- economic/network;
- covert/information;
- magic/knowledge.

Это аргумент против дворца как одной линейной ветки.

## 8. Предварительная availability structure

Без чисел:

- Start: Lumber / Satyr Maid / Undead Farm.
- Early unlock: Tavern / Hunter / Merchant.
- Mid unlock: Guard / Prostitute.
- Late unlock: Geisha / Assassin.
- Meta unlock: Palace.
- Secret conditional: Slave.

Для ordinary non-start jobs:
`build gate OR calendar fallback`.

Так игрок может:
- специализироваться и открыть нужную карьеру раньше;
- либо получить её позже, не сломав run из-за неоптимального build.

## 9. Ending coverage requirement

Каждый ordinary job обязан иметь минимум:

1. **Hard Work** — прямой стажевый профессиональный исход.
2. **Personal/relationship or identity outcome** — не сводится к стажу.
3. **Systemic/mastery outcome** — требует внешней системы, предмета, школы, сезона, Activity или сложной цепи.

Некоторые jobs могут иметь 4+.

Это minimum architecture/content target, не требование писать все сцены сейчас.

## 10. Meta reward philosophy

Hard Work rewards:
- умеренные;
- тематические;
- не должны ломать базовую экономику.

Complex outcomes:
- могут менять правила;
- открывать новые старты/контент/items;
- менять доступность профессий;
- усиливать Palace/late meta route.

Не выдавать одинаковый тип «+N stat» всем профессиям.

## 11. Что матрица уже выявила

1. 10-job roster механически различим без forced merge.
2. Отдельная Tavern оправдана рядом с Satyr Maid.
3. Undead Farm добавляет важный magic/item bridge.
4. Hunter нужен как natural connector к large Activity.
5. Merchant нужен, чтобы предметы/экономика были игровой системой, а не отдельным shop UI.
6. Guard даёт дому для recurring city crises.
7. Geisha даёт школе/сезонным фестивалям/status routes постоянную роль.
8. Assassin даёт подготовительным items/информации/choice-heavy gameplay отдельную карьеру.
9. Prostitute нужна как добровольная сексуальная career и контраст Secret Slave route.
10. Palace должен собирать результаты разных жизненных билдов, а не требовать одну универсальную характеристику.

## 12. Что матрица НЕ позволяет пока зафиксировать

Пока рано утверждать:
- 9 ли core stats;
- являются ли Похоть и Сексуальность одной шкалой;
- окончательные +2/+2/-1 packages;
- exact salary formulas;
- exact unlock thresholds;
- exact Hard Work count для Palace.

Следующий полезный design шаг:
**Stat Coverage Matrix v1 + School Curriculum Draft**, потому что теперь известны реальные функции профессий, которые эти stats должны обслуживать.
