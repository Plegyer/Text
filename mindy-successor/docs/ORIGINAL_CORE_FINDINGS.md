# Simply Mindy — core findings from SWF

Рабочая выборка прямых находок из основного ABC и Stencyl-данных.

## Масштаб

- Stencyl 3.4.0 / Haxe, Box2D.
- 404 сцены в восстановленном индексе.
- В основном ABC сохранены имена SceneEvents_*, ActorEvents_*, Design_* и пути к исходным .hx.
- Есть отдельные сцены life-sim части, школы, сна, профессий, достижений, конкурсов, dungeon/exploration, боёв, предметов и больших мини-игр.

## Основной интерфейс

SceneEvents_0 прямо содержит действия: Go to Work, Go to School, Sleep, Go to Dungeon, Gallery, Quest Log, Stats, Items.

Подсказка Stamina в SWF говорит, что каждое действие требует очко Stamina, а сон восстанавливает ресурс.

## Основные характеристики оригинала

Charisma, Strength, Durability, Prowess, Intellect, Spirit, Fuckability, Cleanliness, Creativity, Sociability, Class, Morality.

Отдельно существуют HP/MP и максимумы, money, year, Stamina, Title и другие системные переменные.

## Работа зависит от мирового цикла

В основном классе присутствуют четыре состояния: Brimstone, MegaHot, Ghostings, Darkly. Для каждой профессии есть четыре разных набора изменений характеристик.

Пример Farmer:
- Brimstone: +1 Strength, +1 Durability, -1 Cleanliness
- MegaHot: +1 Strength, +1 Charisma, -1 Cleanliness
- Ghostings: +1 Strength, +1 Prowess, -1 Durability
- Darkly: +2 Strength, -1 Intellect

То есть одна профессия в оригинале механически меняется вместе с циклом мира.

В рабочем меню подтверждены 12 профессий: Camwhore, Farmer, Maid, Guard, Glory Hole, Prostitute, Arm Candy, Cosplayer, Mascot, Bikini Model, Cabaresque, Geisha. Часть открывается мета-наградами прошлых прохождений.

## Школа

В основном классе лежат восемь вариантов обучения. Семь имеют цену от $300 до $600, один отмечен как Free! Kinda!. Есть отдельная проверка нехватки денег. Школа одновременно развивает характеристики и сжигает деньги.

## Сон / ночной слой

Сцена sleepPaid (SceneEvents_15) содержит восстановление Stamina, ежедневные бонусы Titles, Busy Bee -> +1 Stamina tomorrow, Read all night -> +2 Intellect и отдельные ночные персонажные ветки. Сон — самостоятельная точка применения бонусов и ночного контента.

## Ночлег

В основном классе есть выбор оплаты rent. В строках присутствуют уровни $100, $300, $600, $1,000, $1,500 и альтернативы оплаты потерей характеристик. Есть глобальный disableRent.

## Мета-прогрессия

Глобальные переменные включают staminaBoost, statBoost, endingSet, finaleBonusCount, finaleKeyCount, disableRent и множество end* флагов.

Тексты достижений подтверждают награды, меняющие правила следующего прохождения: daily Stamina, starting money, ежедневный доход, перенос части статов, стартовые предметы/заклинания, открытие профессий, отключение rent, изменение стартового года и крупные стартовые прибавки.

## Вложенные игры

Индекс сцен подтверждает dungeon-карты и отдельный combat scene, item/equipment слой, quizContest, modelContest, overheatContest, wetTContest и sooMiniGame со своим управлением и состоянием.
