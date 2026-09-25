# Open questions / verification queue

Короткий список того, что важно проверить непосредственно в SWF, а не доверять гайду или памяти.

## Приоритет A — основной цикл

1. Точная формула Stamina на новый день:
   - базовое значение;
   - staminaBoost;
   - Busy Bee;
   - ночное обучение;
   - возможный cap.
2. Сколько ежедневных +1 Stamina бонусов реально могут складываться.
3. Где и как увеличивается год/сезон/день.
4. Что именно происходит на 160-м дне без концовки.
5. Как работает продление цикла на +40 дней.

## Приоритет A — профессии

6. Универсально ли правило «15 смен -> запуск квеста», или это только большинство работ.
7. Для каждой из 12 оригинальных профессий:
   - initial availability;
   - stat gate;
   - year fallback;
   - work counter;
   - quest trigger;
   - simple-work-ending trigger;
   - meta unlock.
8. Сколько работ можно выполнить за один день и есть ли отдельные ограничения кроме Stamina.
9. Какие события заменяют обычную смену, а какие происходят после неё.
10. Как сезон меняет stat gains профессии.

## Приоритет B — школа

11. Проверить точные stat gains семи курсов.
12. Проверить восьмой «swap / titles» как отдельный механизм.
13. Проверить ночное обучение: стоимость следующего дня и точный gain.

## Приоритет B — meta

14. Точная реализация statBoost 100 -> 200.
15. Точная реализация импорта 1/4 статов.
16. Как активные/неактивные achievement bonuses применяются к New Game.
17. Как Final Mode меняет обычные правила школы/работ/смерти.

## Правило работы

Если гайд и SWF расходятся — источником истины для механики считаем SWF. Гайд используем как карту того, что искать.


## Dungeon — статус после дополнительной проверки

Подтверждено:
- stepCount = внутренние часы dungeon-day, растут при движении;
- clock HUD имеет 9 фаз;
- около 400 movement ticks наступает "Time for sleep";
- Camp делает day+1 и stepCount=0;
- хороший Camp: +1 Stamina, +50% HP/MP;
- плохой Camp: -1 Stamina + случайная ночная сцена;
- обычные победы не имеют общего stamina-cost, поражения обычно снимают 1;
- random encounters используют отдельный локальный randomWalk;
- season реально меняет environment, actors, special encounters и некоторые route gates.

Осталось:
- найти точное место реализации пользовательски наблюдаемого списания 2 внешних Stamina при входе;
- подтвердить точный Darkly gate северной cave-area Dungeon 1;
- при необходимости составить полный enemy-pool по сезонам, а не только специальные встречи.


## Dungeon — новые закрытые вопросы

Подтверждено дополнительно:
- первый dungeon intro открывается при Strength >= 12 и Durability >= 15 (гайд округлял/упрощал до 15/15);
- Dungeon 2 unlock = doneDungeon02Intro, выставляется интеракцией с ключевым объектом в Scene 59;
- Dungeon 3 unlock = doneDungeon03Intro, выставляется интеракцией с ключевым объектом в Scene 105;
- fresh hub entry сбрасывает stepCount, Camp же продолжает expedition через новый глобальный day.

Осталось:
- dungeon entry implementation resolved: click handler only enforces stamina >= 2 and does not subtract 2; outer resource is then committed/reused as expedition endurance, while Escape zeros it. Keep user-facing rule as a 2-energy entry commitment, but do not invent a missing subtraction.
- полный random-enemy pool по dungeon/season, если понадобится детальный combat atlas;
- все time-of-day event gates, если они влияют не только на lighting/clock.

- time-of-day generic enemy pools: exhaustive stepCount scan found none; treat time-of-day as clock/lighting/deadline unless a scene-specific exception is later found.


## Dungeon — низкоприоритетные хвосты после loot/map pass

Системно закрыто:
- Coax steal/loot policy для normal main combat IDs 0–52;
- persistent chest model;
- `nextDest + dungeonX/Y` transition handshake;
- seasonal elemental pedestal pickups;
- пример quest-gated смены fight -> scripted map event.

Не требуется для архитектуры successor, но можно добить при необходимости exhaustive atlas:
- где именно создаётся `mazeSucceed` token: receiver подтверждён, прямой setter в main ABC не найден;
- точная идентификация monster ID 45 и имён IDs 47–49;
- нужен ли отдельный Coax resolver/эквивалент для space-pool IDs 58–59.
