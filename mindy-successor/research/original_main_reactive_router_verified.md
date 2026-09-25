# Simply Mindy — verified main reactive progression router

Источник: [SWF] main ABC, `SceneEvents_0`.

Этот документ описывает не отдельную карьеру, а то, как игра в целом запускает сюжетные события после возврата на main.

## 1. Main is the global reaction point

Scene 0 регистрирует большой набор отдельных `addWhenUpdatedListener`.

В порядке регистрации среди progression handlers идут:
- 26631 — global progression: first dungeon intro, terminal year route, contest ending eligibility;
- 26632 — Shirley/no-rent related chain;
- 26633 — Camwhore/Jerry;
- 26634 — Guard/Wall/Su;
- 26635 — Glory Hole/JizzBiz;
- 26636 — Maid/Froglord;
- 26637 — Cosplayer/Chico;
- 26638 — Farmer/John;
- 26639 — Emm;
- 26640 — Mascot/Gaspar;
- 26641 — Bikini Model/Whitest/ShutterBug;
- 26642 — Cabaresque/Seu;
- 26643 — Geisha/Taro;
- 26644 — Prostitute + Arm Candy / Pimp Wars;
- 26645 — Final Mode day-limit routing.

Поэтому progression event обычно проверяется не в момент выполнения действия, которое изменило stat/flag, а когда управление снова оказывается на main.

Это объясняет уже наблюдавшееся поведение: школа, dungeon, ночь или любой другой subsystem может изменить условие career chain, а нужная job scene запустится при следующем main update.

## 2. Common stop gates

[SWF] Handlers 26632–26644 все читают:
- `finaleMode`;
- `endingSet`.

Normal career/story checks выполняются только при:
- `finaleMode == false`;
- `endingSet == ""`.

Это два глобальных kill-switch:
- Final Mode отключает normal progression machinery;
- после commitment к ending обычные career chains больше не должны перехватывать маршрут к финалу.

Global handler 26631 использует те же gates для normal progression/endings.

## 3. Each storyline is its own reactive state machine

Внутри каждого listener нет общего универсального quest object.

Он напрямую читает global state:
- visit counters;
- stats;
- sex/night counters;
- dungeon items/kill flags;
- countdowns;
- branch flags;
- Sinner's Orb flags;
- external quest results.

Если конкретный набор условий выполнен, handler делает `switchScene(...)`.

Архитектура фактически:
`many global variables -> many independent listeners -> scene transition`.

Это очень гибко для автора, но создаёт сильную связанность между подсистемами.

## 4. There is no explicit central event queue

[SWF] Scene 0 не строит список готовых событий и не выбирает один event через общий priority resolver.

Например, global handler 26631 содержит последовательно независимые checks для:
- first dungeon intro;
- Year-5 terminal route;
- four-distinct-contests route;
- five-wins route;
- six-losses route.

После `switchScene` нет общего `return eventConsumed` или централизованного lock, а следующие checks всё равно присутствуют в том же handler.

Аналогично career chains живут в отдельных update-listeners.

Поэтому код полагается на:
- взаимную исключительность flags;
- изменение scene/engine state;
- фактический порядок выполнения listeners.

[Ограничение] Без отдельной трассировки Stencyl engine loop не следует утверждать, какой именно `switchScene` "победит", если несколько независимых условий истинны в один и тот же frame. Но в game-side code явного arbitration layer нет.

## 5. Why progression can appear to happen "after the wrong activity"

Поскольку career check живёт на main, причинная цепочка может быть:

`school -> stat reaches threshold -> return main -> job listener sees threshold -> career scene`

или:

`dungeon -> quest flag/item -> return main -> job listener -> career scene`.

То есть triggering action и story owner могут принадлежать разным подсистемам.

Это не исключение, а базовая архитектура Simply Mindy.

## 6. Global handler priority inside 26631

Внутри первого global listener порядок checks такой:

1. first-dungeon intro condition;
2. terminal normal-run Year-5 route;
3. all four distinct contests won;
4. total contestsWon >= 5;
5. total contestsLost >= 6.

Contest routes поэтому имеют локальный ordering breadth -> total wins -> total losses.

Однако это ordering внутри одного listener, а не универсальная priority policy для всех сюжетов.

## Architecture takeaway for successor

Полезная идея оригинала:
- после любой активности есть единая "reaction point", где мир может ответить на изменившееся состояние.

Слабая сторона:
- reaction point реализован множеством независимых listeners и десятками global flags без общего arbitration.

Для successor разумнее сохранить реактивность, но сделать явный resolver:

`collect eligible events -> assign priority/category -> choose one -> mark/queue remaining events -> transition`.

Так школа, работа, ночь, крупная активность и сезонные события смогут по-прежнему запускать чужие quest chains, но порядок будет детерминированным и тестируемым.
