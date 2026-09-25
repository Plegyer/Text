# Simply Mindy — verified dungeon expedition loop

Источник: пользовательское описание фактического прохождения + SWF bytecode SceneEvents_0, 42, 44, 50, 412 и ActorEvents_304/1283.

## 1. Dungeon — вложенный игровой цикл

Внешний life-sim и dungeon используют разные ПРАВИЛА расхода ресурса.

На overworld:
- для входа код требует как минимум 2 Stamina;
- пользователь подтверждает это как цену входа 2 обычных энергии.

Внутри dungeon:
- обычное перемещение не тратит Stamina по одному очку;
- победа в обычном бою не имеет общего `stamina -= 1` правила;
- проигрыш/неудачный сексуальный исход в основном combat-result handler обычно уменьшает Stamina на 1;
- отдельные специальные противники/исходы могут сразу поставить Stamina в 0;
- плохой ночлег в лагере тоже может снять 1 Stamina;
- хороший ночлег может вернуть 1 Stamina.

Поэтому за одну экспедицию реально возможны многие бои, в том числе значительно больше 3–10.

### Важная техническая оговорка

ActorEvents_304 (HUD staminaGauge) читает именно глобальную переменную `stamina` и показывает состояния 3/2/1/0.

То есть на уровне хранения это не отдельная переменная "dungeonEnergy". Но после входа та же переменная переиспользуется как ресурс экспедиции с другими правилами. Это согласуется с пользовательским описанием "другая энергия" по смыслу, хотя storage остаётся общим.

В просмотренном main clickDungeon handler видна жёсткая проверка `stamina >= 2`, но отдельный literal `stamina -= 2` в этой ветке пока не найден. Игровую цену входа 2 фиксируем по фактическому поведению, а точный внутренний способ её реализации оставляем на трассировку.

## 2. Внутренний dungeon clock: stepCount

Главный таймер экспедиции — глобальный `stepCount`.

SceneEvents_42 каждые 200 ms проверяет движение Mindy. Когда скорость по X или Y пересекает порог ±20:
- `stepCount += 1`
- локальный `_randomWalk += 1`

Таким образом время dungeon продвигается в основном во время перемещения, а не просто по реальным секундам.

## 3. Визуальный clock имеет 9 состояний

ActorEvents_1283 читает `stepCount` и переключает animation dungeonClock:

- 0–50 -> frame 0
- 51–100 -> frame 1
- 101–150 -> frame 2
- 151–200 -> frame 3
- 201–250 -> frame 4
- 251–300 -> frame 5
- 301–350 -> frame 6
- 351–400 -> frame 7
- >400 -> frame 8

То есть пользовательское "утро → день → вечер → ночь" верно как игровая модель, а в коде/индикаторе цикл нарезан ещё мельче на девять визуальных фаз.

При достижении примерно 400 movement ticks SceneEvents_42:
- отключает 4 Way Movement;
- останавливает персонажа;
- показывает shock;
- ставит Stamina = 0;
- рисует "Time for sleep!";
- через 1.5 секунды возвращает на main.

## 4. Camp — реальный overnight/rest loop

Dungeon status scene (SceneEvents_50) имеет отдельную кнопку:
`Camp (A)`

Её описание:
"Remain outdoors overnight. Half the time Mindy will wake up partially refreshed. Buuuut..."

Camp переводит в SceneEvents_412.

Сразу при входе в camp:
- `day += 1`
- `newDay = true`
- `stepCount = 0`

То есть ночёвка прямо переводит глобальный календарь на следующий день и начинает новый dungeon-day.

### Хороший сон

В good-rest branch:
- `stamina += 1`
- `HP += 0.5 * HP Max`
- `MP += 0.5 * MP Max`
- HP/MP затем ограничиваются максимумами.

UI пишет: `Slept well! (D)`

### Плохой сон

В bad-rest branch:
- `stamina -= 1`
- вне Finale Mode выбирается `randomSex = randomInt(0,11)`
- создаётся одна из двенадцати разных scene actors / ночных событий.

UI пишет: `Slept poorly! (D)`

Если Stamina после сна <= 0:
- UI: `Too tired! Head home! (D)`
- при продолжении dungeonX/Y обнуляются, dungeon очищается и игра возвращается на main.

Если Stamina > 0:
- кнопка D возвращает игрока в ту dungeon-area, где он поставил лагерь.

Точная вероятность теперь проверена через реализацию `com.stencyl.behavior.Script.randomInt`: обе границы включаются.

Camp вызывает `randomInt(0,2)` и плохой исход срабатывает только при результате 2.

Следовательно фактическая вероятность:
- bad camp = 1/3;
- good camp = 2/3.

Это расходится с UI-текстом "Half the time". Здесь код однозначнее текста.

При bad camp вне Finale Mode затем вызывается `randomInt(0,11)`: выбирается один из 12 ночных event variants равновероятно. Условная вероятность конкретного варианта = 1/12 среди bad camps, то есть 1/36 на один обычный Camp.

## 5. Random encounters не привязаны к числу дневной Stamina

Локальный `_randomWalk` начинается с 0 при загрузке dungeon map и растёт вместе со `stepCount` во время движения.

SceneEvents_42 battleGo:
- Bracelet of Fuck Off (`fuckOff`) отключает random battles;
- Seductive Perfume (`perfume`) переносит encounter-window примерно к 15–20 movement counts;
- без Perfume окно примерно 30–45.

После боя map загружается заново, поэтому локальный `_randomWalk` снова начинается с 0, тогда как глобальный `stepCount` продолжает хранить время экспедиции.

Это объясняет, как в одном dungeon-day может быть много отдельных боёв.

## 6. Seasons реально меняют dungeon

Dungeon map сам пересчитывает season из глобального cumulative day.

Подтверждено кодом:

- Year boundary: day 41/81/121/161.
- Сезоны повторяются 10-дневными блоками через все 160 обычных дней.
- В dungeon01 один из проходов в caveIndoor разрешён только при `season == darkly`.
- Combat setup в конкретной church-area запускает Judge (monster id 9) только при `season == ghostings` и пока `judgeKill == false`.
- Scene42 содержит сезонные environment branches, включая MegaHot lighting, Ghostings rain layers и Darkly tentacle/darkness state.

Следовательно сезон влияет минимум на:
1. доступность отдельных зон;
2. специальные enemy/boss encounters;
3. визуальное состояние карты.

Это напрямую подтверждает пользовательскую поправку, что dungeon меняется вместе с временем года.

## 7. Архитектурная модель

Overworld loop
-> потратить/зарезервировать входной ресурс
-> войти в expedition

Dungeon-day:
- movement advances stepCount;
- randomWalk creates encounter windows;
- battles/quests/exploration происходят много раз;
- поражения бьют по expedition Stamina;
- season меняет карту/встречи;
- clock идёт к ночи;
- Camp переводит day +1, сбрасывает dungeon clock и частично восстанавливает или ухудшает состояние;
- при полном истощении игрок возвращается в overworld.

Это действительно отдельная "игра внутри игры", а не обычная overworld activity.
