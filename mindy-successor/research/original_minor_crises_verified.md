# Simply Mindy — verified minor-crisis layer

Источники: [SWF] main ABC, primarily `SceneEvents_0` and `SceneEvents_249`.

Этот документ фиксирует системную архитектуру minor crises. Полный каталог всех текстовых вариантов не нужен для successor.

## 1. Trigger: optional new-day event

[SWF] На main, только когда:
- `finaleMode == false`;
- `newDay == true`;

код делает inclusive `randomInt(0,1)`.

Если выпадает 1:
- локальный `_minorCrisesBool = true`;
- становится доступен actor 88 — отдельная кнопка/индикатор crisis.

Если выпадает 0:
- actor 88 скрывается.

Нажатие actor 88 при `_minorCrisesBool == true` переводит в Scene 249.

Следовательно:
- шанс предложения minor crisis на новый normal-mode day = 1/2;
- событие не перехватывает день автоматически;
- игрок может его проигнорировать;
- после обычного new-day save callback global `newDay` сбрасывается в false, поэтому предложение относится именно к первому main-entry нового дня.

## 2. Entering the crisis does not spend a normal action

[SWF] Main click-handler, который открывает Scene 249, не уменьшает Stamina и не увеличивает day.

После выбора одного из трёх решений Scene 249 возвращает игрока на main.

То есть crisis — optional pre-action modifier, а не обычная дневная activity:
`new day -> optional crisis -> changed resources/stats -> normal day actions`.

Некоторые outcomes сами могут дать или снять Stamina, поэтому система напрямую меняет action economy, не являясь action cost.

## 3. Reachable ordinary pool

[SWF] Normal Scene 249 init assigns:
`_randomPick = randomInt(0,18)`.

Это 19 обычных runtime events.

Они покрывают бытовые, социальные, магические и мета-шутливые проблемы: hobo, zombie/bagel, leg hair, demon, cleanliness problem, accidental stabbing, directions, con artist, drunken lesbian, running late, parking, groceries, skeleton, plant, microtransactions, teddy bear, wizard, Hellfire, Lil D.

Каждый event показывает три разных stat choices.

Пример ID 0:
- Charisma;
- Cleanliness;
- Fuckability.

Пример ID 1:
- Strength;
- Prowess;
- Fuckability.

Идея системная: разные crises заставляют использовать широкий набор характеристик, а не один универсальный "event stat".

## 4. Resolution is deterministic after a hidden difficulty roll

[SWF] При входе Scene 249 один раз выбирает `_difficultyMod` по году:

- Year 1: random 5–15;
- Year 2: random 15–25;
- Year 3: random 20–50;
- Year 4+: random 30–60.

Каждый из трёх вариантов решения имеет собственный base threshold.

Форма проверки:
`chosenStat >= baseThreshold + difficultyMod`.

Например, у hobo:
- Charisma >= 10 + difficultyMod;
- Cleanliness >= 15 + difficultyMod;
- Fuckability >= 5 + difficultyMod.

После того как difficultyMod уже выбран, отдельного success roll нет. Игрок фактически выбирает, какой частью своего build пройти скрытый порог.

## 5. Outcomes

[SWF] Успехи обычно дают небольшие tactical rewards:
- +1/+2 stats;
- иногда +1 Stamina;
- иногда деньги.

Провалы обычно дают:
- -1/-2 Stamina;
- stat penalties;
- в некоторых events денежный штраф.

Поэтому minor crisis работает как короткая variance layer перед основным дневным циклом.

## 6. Year-0 scaling quirk

[SWF] `_difficultyMod` constructor default = 0.

Init имеет branches только для:
- year == 1;
- year == 2;
- year == 3;
- year >= 4.

Отдельного branch для `year == 0` нет.

Achievement bonus `gasparButlerEnding` может начинать normal run с year=0.

Следовательно, в дополнительном Year 0 minor crises получают:
`difficultyMod = 0`.

Это делает их существенно легче, чем в Year 1. По коду это реальный emergent interaction/oversight, а не заявленная meta-награда.

## 7. Quest-injected special crises

До normal random 0–18 Scene 249 проверяет две специальные ветки.

### randomPick 99

Если:
- `proArmAlly == "soo"`;
- randomInt(0,2) == 0;
- `sooAllyList[4] == "no"`;

обычный event заменяется на crisis про recruitable prostitute.

То есть при выполненных quest conditions шанс special replacement = 1/3.

Успешный stat check ставит:
`sooAllyList[4] = "yes"`.

Таким образом minor-crisis layer может непосредственно продвигать внешний quest.

### randomPick 100

Если предыдущая special branch не сработала и:
- `proArmAlly == "pimpy"`;
- randomInt(0,2) == 0;

появляется mysterious stranger / disguised Soo event.

Успешные resolution paths уменьшают:
`sooGirlsCollected -= 1`.

Это обратная связь random event -> global faction/quest state.

## 8. Unreachable written events: IDs 19–23

[SWF] Scene 249 содержит полноценные UI + resolution branches для дополнительных IDs:

- 19: lost keys;
- 20–22: season-dependent special crises;
- 23: Darkly darkness crisis.

Среди seasonal text есть crossover, underwear shopper, arm wrestling, hot-weather/fire-elemental, ghosts/umbrella/stalker, tentacle/shadow/darkness variants.

Однако exhaustive write scan по `_randomPick` в SceneEvents_249 нашёл только:
- 99;
- 100;
- randomInt(0,18).

Никакого assignment 19–23 нет.

Поэтому в этой SWF-версии эти полностью написанные crisis branches фактически недостижимы через normal Scene 249 init. Это выглядит как off-by-one / unfinished seasonal-pool integration.

Не нужно считать строки 19–23 реальным runtime content только потому, что их code paths существуют.

## 9. Final Mode

[SWF] Main explicitly disables minor-crisis offer generation when `finaleMode == true`.

Это ещё один пример того, что Final Mode не просто меняет числа, а отключает normal-mode system layers.

## Architecture takeaway

Полезная абстракция для successor:

`new-day hook`
-> `optional event offer`
-> `3 build-specific approaches`
-> `hidden/scaled threshold`
-> `small resource/stat consequence`
-> `return to normal day`.

Сильная сторона оригинала: система делает широкий stat build полезным вне jobs/school и иногда связывает случайное событие с внешней quest state machine.

Слабая сторона реализации: difficulty и content-pool logic разнесены вручную по hard-coded branches, из-за чего meta Year 0 случайно ломает scaling, а готовые seasonal events остаются unreachable.
