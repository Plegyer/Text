# Simply Mindy — dungeon season / expedition matrix

Источник: SWF bytecode + фактическое описание пользователя. Здесь отделены подтверждённые кодом случаи от общих наблюдений прохождения.

## Expedition clock

Dungeon использует глобальный `stepCount` как внутренние часы экспедиции.

- stepCount растёт при движении;
- HUD clock имеет 9 визуальных фаз по 50 шагов;
- около 400 movement ticks наступает принудительный конец dungeon-day / "Time for sleep!";
- Camp переводит глобальный `day` на +1, сбрасывает `stepCount=0` и запускает ночной исход.

То есть грубая игровая модель "утро -> день -> вечер -> ночь" реализована более мелкой шкалой.

## Camp / ночь

Подтверждено SceneEvents_412:

Хороший сон:
- Stamina +1
- HP +50% HP Max
- MP +50% MP Max
- возврат в текущую dungeon-area

Плохой сон:
- Stamina -1
- выбирается одна из 12 ночных сцен/event actors
- если после сна Stamina <=0, экспедиция прекращается и Mindy возвращается домой

Ночь поэтому одновременно является:
- переходом календарного дня;
- частичным восстановлением;
- риском потери expedition-resource;
- отдельным event/content slot.

## Random encounters

Внутри карты есть локальный `_randomWalk`, который растёт вместе с движением.

- обычное encounter-window: примерно 30–45 movement counts;
- Seductive Perfume ускоряет encounter-window примерно до 15–20;
- Bracelet of Fuck Off отключает random encounters.

После боя карта перезагружается и локальный `_randomWalk` начинается заново, но глобальный `stepCount` продолжает хранить время dungeon-day. Поэтому одна экспедиция может содержать большое число боёв.

## Сезонные изменения: подтверждённые примеры

### Dungeon 1 — Forest

Ghostings:
- карта включает rain/water visual layers;
- отдельные Ghostings actors/состояния меняются;
- специальный Judge encounter в church-area существует только в Ghostings, пока соответствующий kill-flag не выставлен.

Darkly:
- outdoor map включает отдельный dark/tentacle environmental state;
- пользователь и гайд указывают сезонный доступ к северной cave-area; это совпадает с найденными Darkly-specific branches и переходами, но точный gate-предикат ещё помечен для отдельной трассировки.

Brimstone:
- Earth elemental pedestal/animation доступен только в Brimstone, пока Earth slot не получен.

### Dungeon 2 — Cave

Ghostings:
- outdoor scene имеет крупную отдельную Ghostings-ветку, которая удаляет/заменяет набор actors и меняет rain/water layers;
- Water elemental pedestal доступен только в Ghostings, пока соответствующий elemental slot пуст.

Darkly:
- indoor scene существенно меняет actor population;
- brothel quest actors и связанные события имеют отдельные Darkly branches.

Megahot:
- Fire elemental pedestal доступен только в Megahot;
- часть indoor content проверяет season==megahot отдельно от обычного состояния.

### Dungeon 3 — Mountain

Megahot:
- подтверждён явный route gate: при `nextDest == "chrBeastOut"` переход к ChrBeast/Cloud route разрешается только при `season == "megahot"`; иначе координаты возвращаются на безопасную позицию.

Ghostings:
- outdoor map содержит отдельные rain-layer branches.

Darkly:
- outdoor map содержит отдельную season branch и меняет environmental state.

## Что это означает архитектурно

Сезон в dungeon — не только косметический skin.

Он участвует минимум в четырёх разных слоях:
1. визуальная среда;
2. состав/наличие NPC и специальных противников;
3. доступность отдельных маршрутов/областей;
4. доступность элементальных объектов/quest interactions.

Поэтому одна и та же географическая карта реально имеет несколько сезонных "версий" без создания четырёх полностью независимых карт.


## Время суток и сезон — независимые слои

Карта реагирует сразу на два глобальных состояния:

- `season` меняет доступ, actor population, special encounters и environment set;
- `stepCount` меняет фазу dungeon-day и в нескольких сценах постепенно управляет darkness/background alpha.

То есть конкретное состояние карты можно рассматривать как:

`base map + seasonal variant + time-of-day variant + quest flags`

Это объясняет, почему одна физическая область может ощущаться существенно по-разному без отдельной сцены на каждую комбинацию.


## Generic random encounters: важное уточнение

Проверка SceneEvents_44::init показывает, что обычные random pools задаются по dungeon/region и в самих вызовах randomInt не переключаются по season:

- Dungeon 1: IDs 0–6 / 0–5 / 0–3 в зависимости от subregion;
- Dungeon 2: IDs 12–15;
- Dungeon 3: IDs 31–34.

Seasonal enemy change реализуется поверх этого через fixed actors, quest encounters и route geometry.

Самый наглядный пример Dungeon 2 Ghostings:
- scene metadata: actors 307–313 = rafts, 314–316 = fakeTile blockers;
- в Ghostings fakeTile actors удаляются;
- вне Ghostings удаляются rafts и меняются water/rain layers.

То есть Ghostings открывает физическую конфигурацию маршрута к дополнительному контенту, а не заменяет базовый random(12,15) pool.
