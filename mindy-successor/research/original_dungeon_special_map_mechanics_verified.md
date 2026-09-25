# Simply Mindy — verified special dungeon map mechanics

Источники: [SWF] main ABC, primarily `SceneEvents_42`, `SceneEvents_59`, `SceneEvents_104`, `SceneEvents_105`, `SceneEvents_205`, `SceneEvents_206` and adjacent destination-scene init handlers.

Этот документ фиксирует архитектуру специальных картовых механик, а не полный каталог каждого тайла/актора.

## 1. Transition handshake: nextDest + dungeonX/Y

[SWF] Переход между dungeon scenes часто состоит из двух частей:

1. исходная сцена записывает глобальный строковый token `nextDest`;
2. принимающая сцена в init читает token, очищает его и выставляет `dungeonX` / `dungeonY` для точки появления, а при необходимости запускает дополнительную логику.

То есть `nextDest` — не просто имя следующей карты. Он переносит семантику маршрута/причины возврата.

Concrete D3 indoor example from `SceneEvents_206` init (method 28467):
- `dungeon03OutdoorInkStairs` -> отдельная spawn point;
- `mazeFail` и `mazeSucceed` -> один return spawn;
- `smackdownKnock` -> отдельный scripted-return branch.

Это позволяет одной destination scene принимать игрока из разных логических состояний без отдельных копий карты.

## 2. Maze return protocol

[SWF] Maze/boss subscene init (adjacent D3 scene, method 28504) задаёт:
- `dungeon = "dungeon03Indoor"`;
- default return token `nextDest = "mazeFail"`.

[SWF] Принимающая D3 indoor scene отдельно распознаёт и `mazeFail`, и `mazeSucceed`, после чего возвращает игрока в одну и ту же map-area.

[Гипотеза/не закрыто] Прямой runtime setter строки `mazeSucceed` в main ABC не найден. Сам receiver branch подтверждён, но точный producer успешного token может находиться в generic behavior/scene data, а не в сгенерированном SceneEvents-коде.

Поэтому архитектура fail/success return подтверждена, но не нужно выдумывать отсутствующий setter.

## 3. Persistent treasure state

[SWF] Chests используют persistent/global array `chestsOpened[]`.

Типичный handler:
- проверяет collision + `hotKeyA`;
- проверяет `chestsOpened[index] == "no"`;
- меняет animation сундука;
- выдаёт награду;
- пишет `chestsOpened[index] = "yes"`;
- ставит локальные `_treasureOpened` / `_treasureOpen` для UI feedback.

Пример в Dungeon 1 выдаёт $500 и фиксирует соответствующий индекс как открытый.

Архитектурно это разделение:
- persistent world state = `chestsOpened[]`;
- scene presentation = actor animation;
- transient feedback = local treasure fields.

## 4. Seasonal elemental pedestals grant both weapon and armour components

[SWF] Четыре сезонных pedestal pickups пишут ОДНОВРЕМЕННО в обе коллекции:
- `ItemSwordElements[index]`;
- `itemArmourElements[index]`.

Verified pickups:
- D1 Brimstone -> earth, index 1;
- D1 Darkly cave -> wind, index 0;
- D2 Ghostings -> water, index 3;
- D2 Megahot -> fire, index 2.

Pickup также выставляет treasure feedback и убирает/fades pedestal actor.

Это уточняет `original_element_system_verified.md`: acquisition weapon/armour components связана в одном world pickup, хотя runtime setter для equipped armour element `equipElements[1]` по-прежнему не найден и defensive equip path выглядит незавершённым.

## 5. Quest state can replace a fight with a scripted map event

[SWF] Lord SmackDown-related bridge interaction показывает важный паттерн.

До нужного quest flag:
- interaction переводит в combat scene;
- `nextDest = "smackdownFight"`.

После `cherryDungeon03Scene03 == true`:
- 4 Way Movement временно отключается;
- запускается animation/scripted movement;
- `cherrySmackdownKnock = true`;
- `nextDest = "smackdownKnock"`;
- destination init имеет отдельный return branch.

То есть тот же физический map gate меняет тип взаимодействия по persistent quest state: сначала бой, затем scripted traversal/knockback state.

## 6. Seasonal topology is distributed scene logic

Уже отдельно подтверждено в `original_dungeon_season_gates_verified.md`:

- blockers могут заменяться traversal objects;
- целые NPC populations могут появляться/исчезать;
- transition может разрешаться только в конкретный season;
- fixed boss encounter может напрямую читать season.

Special-map logic поэтому не является одной dungeon manager state machine. Глобальные flags/season читаются локально разными scene handlers.

## Architecture takeaway

Полезная модель dungeon-карт оригинала:

`persistent world flags / quest flags / collected arrays`
+
`nextDest transition token`
+
`destination spawn coordinates`
+
`scene-local actors, collision and scripted movement`.

Такой слой позволяет менять topology и смысл одной точки карты без дублирования всей карты. Для successor это полезнее, чем копировать конкретные maze/bridge/pedestal события.
