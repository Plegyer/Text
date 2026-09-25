# Large Activity Product Role v0

Дата: 2026-09-25.

Статус: **PRODUCT ROLE SPEC / DESIGN DRAFT**. Конкретный жанр ещё не выбран.

Основание:
- LIFE-03, LIFE-04, LIFE-10, LIFE-11, LIFE-12, LIFE-15;
- `NIGHT_AND_ACTIVITY_CONTRACT_v1.md`;
- пользовательское требование meaningful second mode и ранний ориентир 2–3 mini-game systems;
- original dungeon используется только как доказательство нужной системной глубины, не как шаблон для копирования.

## 1. Зачем игре большая Activity

Она должна дать второй способ жить и развиваться, а не быть кнопкой ради награды.

Игрок идёт туда ради:
- редких предметов;
- ресурсов;
- знаний;
- NPC;
- внешних условий careers;
- relationship quests;
- отдельных endings;
- части большой межжизненной тайны.

Можно пройти run, пользуясь Activity мало.
Но часть маршрутов должна требовать глубокого участия.

## 2. Необходимый масштаб

Недостаточно:
- одной короткой аркады;
- одного stat check;
- линейной серии из 5 кнопок.

Нужны:
- собственная progression;
- инструменты/equipment;
- несколько типов задач;
- повторяемые и уникальные encounters;
- сезонные изменения;
- NPC/quests;
- save/resume;
- связь с городом.

## 3. Umbrella structure

Предлагаемый product pattern:

**Экспедиции / вылазки за пределы обычной городской жизни**.

Это не означает JRPG combat.

Под umbrella Activity можно разместить 2–3 механических слоя.

### Layer A — Exploration / navigation
- выбор маршрута;
- ограниченный internal resource/time;
- сезонные пути;
- найденные точки/события;
- предметы.

### Layer B — Challenge / test
В зависимости от encounter:
- физическое испытание;
- логическая задача;
- магический ритуал;
- ловушка;
- скрытность;
- переговоры.

Использует общий character build.

### Layer C — Specialized encounter mini-game
Не каждый encounter.
Можно иметь 1–2 отдельные механики:
- tactical challenge;
- puzzle;
- tracking;
- ritual;
- performance/negotiation.

Точный набор OPEN.

Так выполняется ранний запрос на несколько mini-game systems без создания трёх независимых игр.

## 4. Entry / time

Базовый ориентир:
- вход = 2 daily Energy.

После входа daily Energy не превращается во внутреннюю stamina.

Activity имеет собственные:
- endurance/time/moves;
- equipment charges;
- encounter resources.

Global time policy должен быть понятен игроку.

## 5. Camp / rest

Если Activity допускает многодневные expedition:
- camp — отдельный контекст от городского lodging;
- имеет свои события;
- может advance global day;
- не использует обычный городской night partner menu автоматически;
- отдельные expedition NPC могут иметь camp relationship events.

Это сохраняет полезное различие city night vs field camp.

## 6. Shared stat coverage

Activity обязана использовать весь build лучше, чем обычный combat.

Минимальные approach families:

- Сила — force;
- Выносливость — survive/endure;
- Ловкость — precise/stealth;
- Разум — analyse;
- Магия — supernatural interaction;
- Смекалка — improvise/bypass;
- Обаяние — negotiate;
- Манеры — status/cultural interaction;
- Сексуальность/Похоть — только в подходящих adult/social encounters, не как универсальный ключ.

Не каждый encounter должен поддерживать все подходы.

## 7. Equipment/items

Предметы должны менять возможности.

Категории:
- tools;
- navigation;
- protection;
- ritual components;
- consumables;
- disguises;
- keys/documents;
- trophies/quest items.

Пример правильного item:
`rope kit -> opens cliff route`.

Пример слабого item:
`ring -> +2% all rewards`.

Числовые bonuses допустимы, но не должны быть единственной ролью предметов.

## 8. City feedback loops

Activity result может:
- открыть career event;
- завершить NPC request;
- дать товар Merchant;
- ингредиент Farm;
- добычу Hunter;
- улику Guard/Assassin;
- редкий предмет Geisha/Palace;
- деньги;
- school project fact.

Городские действия также должны влиять обратно:
- купить equipment у Merchant;
- изучить Arcana/Field Craft;
- получить информацию в Tavern;
- relationship NPC даёт маршрут/ключ.

## 9. Seasons

Сезоны должны менять:
- маршруты;
- encounters;
- ресурсы;
- NPC availability;
- некоторые hazards;
- special quests.

Не просто background art.

## 10. Progression

Activity progression может включать:
- discovered locations;
- tool tiers;
- route knowledge;
- NPC relationships;
- completed challenges;
- world facts.

Не превращать её в один global dungeonLevel.

## 11. Failure / escape

Failure должна иметь содержательный outcome:
- потеря части rewards;
- forced exit;
- временный condition;
- quest consequence;
- missed window.

Не обязательно game over.

Escape — осознанная команда, с понятной ценой.

## 12. Endings/meta

Activity должна поддерживать:
- минимум одну самостоятельную ending family;
- несколько contributions к job/relationship endings;
- часть long-term/meta mystery.

Она не должна становиться обязательным позвоночником каждой профессии.

## 13. Candidate product directions

До выбора жанра рассматриваются три направления:

### A. Expedition + tests
Наиболее универсально и ближе к системной роли референса без копирования боя.

### B. Investigation network
Локации/улики/переговоры/проникновение; сильнее для mystery, слабее для resource/equipment loop.

### C. Expedition + puzzle/tactical hybrids
Наиболее богатый вариант, но дороже в производстве.

Рабочая рекомендация SOL:
**A как базовый каркас, с отдельными B/C encounters внутри него**, потому что это лучше связывает охоту, предметы, сезоны, магию и отношения.

Это предложение, не пользовательский lock.

## 14. Product acceptance

Большая Activity не считается реализованной, если test adapter просто умеет save/resume.

Нужен playable slice:

1. Вход стоит 2 Energy.
2. Есть минимум несколько маршрутов/точек.
3. Есть internal resource, отличный от daily Energy.
4. Есть минимум два разных типа challenge.
5. Используются минимум несколько разных character axes.
6. Есть meaningful equipment/item route.
7. Есть сезонное изменение.
8. Есть NPC/quest.
9. Result открывает внешний career/relationship event.
10. Городская подготовка меняет Activity options.
11. Save/resume работает внутри.
12. Escape/failure отличается от success.
13. Camp, если используется, отличается от городского lodging.

## 15. Открыто

- финальный жанр;
- 2–3 конкретные mechanics;
- число regions;
- internal resource;
- camp presence;
- equipment depth;
- combat presence/absence;
- Activity endings;
- Meta mystery role.
