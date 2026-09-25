# Simply Mindy — verified night resolver and negative night events

Источник: SWF bytecode SceneEvents_0, 12, 15, 92, 99, 101, 138 + walkthrough v3.5.0.

## 1. Ночь — отдельный центральный resolver

Кнопка Sleep на main не всегда ведёт в обычный paid sleep.

В SceneEvents_0 порядок проверок начинается с forced states. Самый явный пример:

- если `sexWhitestWhite == true`, игра СРАЗУ переключается в scene 101 `sleepWhitest`;
- normal rent / partner selection до этого даже не доходит.

Дальше идут Finale-specific sleep branches, landlord/rent branches и только затем обычный sleep/rent flow.

То есть night layer имеет приоритеты. Наличие forced-night flag может полностью заблокировать стандартный выбор ночной активности.

`sexWhitestWhite` проверяется ещё до обычного rent/payment resolver. Поэтому при таком forced night нажатие Sleep уходит в scene 101 раньше стандартной ветки оплаты жилья; в самой scene 101 обычного rent-списания нет.

## 2. Normal paid sleep — scene 15

Scene 15 `sleepPaid` — обычный ночной hub.

При старте она:
- stamina = 3;
- day += 1;
- newDay = true.

Затем интерфейс может предложить доступных ночных партнёров/активности по persistent flags.

Я рекурсивно проверил все callback-методы SceneEvents_15: из обычных выбранных night options запись в `stamina` делает только ветка `book`. Обычные добровольные partner branches сами по себе не имеют общего штрафа к энергии следующего дня. Это важное отличие от forced/negative nights.

Подтверждённые partner/activity flags:
- sexFarmerJohn
- sexFroglord
- sexGaspar
- sexShirley
- sexEmm
- jerrySex
- sexSu
- sexChico
- sexSeu
- sexTaro
- sexJizzBiz
- sexPimpy
- sexSoo
- book, если открыт соответствующий Cosplay progression
- special self/Mindy option после endFinal

Выбранные партнёры затем увеличивают собственные counters: johnSexCount, frogLordSexCount, suSexCount и т. п. Эти счётчики читаются карьерными state machines.

Следовательно ночь — общий shared resource для разных job/story routes.

## 3. Forced Bikini Model night — scene 101 sleepWhitest

Model Scene 04 имеет Yes/No choice.

Если игрок нажимает Yes:
- `sexWhitestWhite = true`.

Это включает forced-night override на main.

Walkthrough также описывает эту ветку как обязательный секс каждую ночь, при котором остальные партнёры становятся недоступны.

Каждый forced night:
- whitestSexCount += 1;
- day += 1;
- newDay = true;
- next-day stamina задаётся напрямую, а не просто уменьшается на один.

Точная эскалация:

- до `doneModelScene05Cont` -> stamina = 2
- после `doneModelScene05Cont`, но до `doneModelScene06Cont` -> stamina = 1
- после `doneModelScene06Cont` -> stamina = 0

То есть сюжет постепенно ухудшает следующий action budget: 2 -> 1 -> 0.

Scene 99 `modelScene06Cont` даёт ещё один Yes/No choice:
- No явно пишет `sexWhitestWhite = false`;
- Yes оставляет forced state активным.

Это подтверждает, что forced-night condition — отдельный persistent route flag, а не разовая сцена.

## 4. Homeless / no-rent sleep — scene 12 noRent

Если player попадает в outdoor/no-rent sleep:

- newDay = true
- noRentCount += 1
- randomPick = randomInt(1,2)
- stamina = 2
- day += 1
- Charisma -= 1
- Cleanliness -= 1
- Class -= 1

UI прямо пишет:
`Poor sleep! -1 Stamina! (D)`

Сцена содержит sex-animation controls (`Squirt (S)`, actor animation cycling) и сезонно/random-зависимое создание Mindy/otherGuys actors.

Поэтому outdoor sleep — не просто денежный штраф:
- следующий день начинается с 2 Stamina;
- теряются три социальных/образных stat;
- часть случайных вариантов сна включает сексуальное событие;
- конкретный actor pool меняется по season/random branch.

Это ещё один отрицательный night-event generator.

## 5. Shirley forced scare — scene 138 sleepScared

Central sleep resolver может направить в scene 138, когда выполнена определённая landlord-haunt progression и `sexShirley == false`.

Scene 138:
- shirleyScareCount += 1
- stamina = 2
- day += 1
- newDay = true

UI:
`Stamina restored! Ish! (D)`

То есть эта forced night тоже съедает одно действие следующего дня.

Пока не называем её сексуальной: bytecode подтверждает forced sleep/haunt penalty, но не подтверждает sexual semantics сцены.

## 6. Ночное обучение

Book option живёт в normal sleepPaid:
- bookRead += 1
- Intellect += 2
- Stamina -= 1 после night reset

Поэтому чтение добровольно превращает следующий день из 3 базовых действий в 2 (до meta/title modifiers).

Механически оно использует тот же канал next-day action budget, что и отрицательные forced nights, но инициируется самим игроком.

Это даёт чёткое разделение оригинала:
- voluntary partner night: обычно без отдельного stamina penalty;
- voluntary study: -1 next-day Stamina;
- forced/negative night: может жёстко задать 2/1/0 Stamina или иным образом ухудшить следующий день.

## 7. Полный census day-transition scenes

Сканирование main ABC на сцены, одновременно работающие с `day`, `newDay` и `stamina`, даёт ключевой набор:

- scene 12 — noRent
- scene 15 — sleepPaid
- scene 101 — sleepWhitest
- scene 138 — sleepScared
- scene 352 — sleepFrog (Finale-specific, отдельно разобрать при Finale)
- scene 412 — campScene (dungeon overnight)

Это практически вся центральная семья day/night transition scenes.

## 8. Архитектурная модель

Sleep button
-> forced-night override?
-> special mode override?
-> lodging/rent result?
-> normal paid sleep partner/activity menu

Night result
-> advances calendar
-> establishes next-day Stamina
-> applies stat changes
-> increments route/partner counters
-> may lock/unlock partner availability
-> may trigger sexual/negative event
-> returns to main

Это означает, что "ночь" — полноценный resolver состояния мира, а не просто восстановление энергии.

## 9. Что важно для successor

Полезный принцип:
- одна ночь = один конкурирующий slot;
- добровольное обучение может стоить next-day energy;
- отношения используют тот же slot;
- некоторые route states могут временно перехватывать slot;
- плохое жильё может генерировать отрицательные события;
- forced events должны иметь ясное состояние/срок/способ выхода, а не быть хаотическим рандомом.

Конкретное содержание оригинальных sexual scenes переносить не нужно; важна связь night-state -> next-day action economy -> career/story progression.
