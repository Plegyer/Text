# Simply Mindy — verified job execution flow

Источник: SceneEvents_0 + базовые job scenes.

## Один рабочий клик

1. На main игрок нажимает иконку работы.
2. Click handler проверяет доступность и Stamina.
3. Stamina уменьшается на 1.
4. Игра переключается в базовую рабочую сцену профессии.
5. Базовая сцена:
   - увеличивает visit counter;
   - применяет сезонный пакет статов;
   - рассчитывает зарплату;
   - прибавляет зарплату к money;
   - проверяет Fuckability и выбирает normal/alternative actor-animation pool.
6. После завершения сцены игрок возвращается в main.

## Карьерный сюжет — отдельный reactive layer

На main постоянно работают отдельные handlers каждой профессии. Они не являются частью кнопки «работать».

Пример Farmer handler проверяет независимо:
- zombieVisit >= 50 и SinnersOrb state;
- zombieVisit >= 15 и doneFarmScene02=false;
- Intellect >=20 + Sociability >=20 после Scene02;
- brainGo после Scene03;
- sexFarmerJohn;
- johnSexCount;
- mushroomGot;
- johnSpurnCountdown;
- поздние stat gates и branch flags.

Когда условие становится истинным, handler сам переключает игру в нужную сюжетную сцену.

Следствие: после первой рабочей активации дальнейший карьерный эпизод может быть вызван НЕ новой сменой, а любым другим действием, которое изменило нужный stat/flag/timer. Например, школа может довести stat до порога, возвращение в main увидит условие и немедленно продолжит job story.

## Архитектурная модель

Job состоит из двух независимых слоёв:

A. Repeatable shift engine
- action cost
- stat mutation
- pay
- visit counter
- everyday content pool

B. Career state machine
- threshold checks
- quest flags
- waits/countdowns
- night-partner counters
- external subsystem flags
- branch decisions
- endings

Это одна из причин плотной связанности Simply Mindy: карьерная state machine читает состояние всего проекта, а не только данные своей профессии.
