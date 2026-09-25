# Simply Mindy — verified core day / stamina / lodging loop

Источник: ABC-код SceneEvents_15 (sleepPaid) и SceneEvents_0 (main).

## Новый день

При входе в paid sleep scene:

- stamina = 3
- day += 1
- newDay = true

После возврата в main, когда newDay=true:

- stamina += staminaBoost
- если activeTitle == busyBee: stamina += 1

То есть базовый daily action resource — ровно 3.

## Постоянные +1 Stamina

Проверка всех найденных модификаций staminaBoost показывает:

- Penitent bonus: staminaBoost += 1 при активации, -=1 при отключении.
- Spansexy bonus: staminaBoost += 1 при активации, -=1 при отключении.

Отдельно Busy Bee — active Title, а не staminaBoost: он даёт ещё +1 при старте нового дня только пока выбран.

Практическая формула нового дня до ночного штрафа:

3 + staminaBoost + (Busy Bee ? 1 : 0)

Это объясняет расхождение с гайдом, где три награды описаны одинаково как +1 action/day: две являются постоянным staminaBoost, одна работает через selectable title.

## Ночное обучение

Если night partner == book:

- bookRead += 1
- Intellect += 2
- Stamina -= 1

Поскольку reset Stamina до 3 уже произошёл в sleepPaid, этот -1 фактически съедает действие СЛЕДУЮЩЕГО дня.

После дальнейшего применения meta bonuses эффективный следующий день получается:

2 + staminaBoost + BusyBeeBonus

Это напрямую подтверждает модель, которую пользователь описал для новой игры.

## Календарь

В обычном режиме `day` — это день ВНУТРИ текущего года, а `year` хранится отдельно.

Paid sleep сначала делает:
- `day += 1`;
- `newDay = true`.

Затем на main, если `finaleMode == false` и `day >= 41`, код делает:
- `year += 1`;
- `day = 1`.

После этого season определяется только по текущему `day`:
- day 1–10 -> Brimstone;
- day 11–20 -> Megahot;
- day 21–30 -> Ghostings;
- day 31–40 -> Darkly.

Таким образом обычный год = 40 дней, а календарные даты повторяются каждый год.

Это исправляет прежний ошибочный вывод о накопительном day 1→160.

### Конец обычного run

После завершения Year 4 rollover создаёт состояние `year >= 5, day = 1`. Отдельный main-handler сразу переводит игру в Scene 74 — time-up / Sinner's Orb ending path. Это не полноценный пятый обычный год.

[User playthrough] Пользователь подтверждает практический результат: конец последнего года даёт финальную концовку и завершает run.

### Бонус дополнительного года

`gasparButlerEnding` ставит стартовый `year = 0`.

Поскольку rollover каждый раз происходит после day 40, последовательность становится:
Year 0 -> Year 1 -> Year 2 -> Year 3 -> Year 4 -> terminal Year 5 route.

То есть бонус действительно добавляет ровно 40 обычных календарных дней; максимальный normal-calendar run с ним = 200 дней до terminal route.

## Final Mode

Final Mode использует календарь иначе: normal yearly rollover block пропускается, когда `finaleMode == true`. Поэтому `day` там продолжает расти без сброса на 41.

Если `finaleMode=true` и `day >= 100`, main переключает игру в scene 400. То есть Final Mode имеет отдельный 100-дневный cumulative limit.

## Ночлег

Cash rent по year:

- Year 1: $100
- Year 2: $300
- Year 3: $600
- Year 4: $1000
- Year 5+: $1500

Если денег недостаточно для денежной оплаты, переход идёт в noRent/outdoor sleep.

disableRent=true пропускает стандартную оплату и ведёт прямо в paid-sleep path.

Есть и альтернативная оплата статами. Она меняется по году и сезону, поэтому lodging — не просто money sink, а выбор ресурса.

### Stat-payment schedule

| Year | Brimstone | Megahot | Ghostings | Darkly |
|---|---|---|---|---|
| 1 | -1 Strength | -1 Durability | -1 Charisma | -1 Class |
| 2 | -1 Intellect | -1 Creativity | -1 Prowess | -1 Sociability |
| 3 | -2 Class | -2 Prowess | -2 Fuckability | -2 Spirit |
| 4 | -3 Intellect | -3 Charisma | -3 Sociability | -3 Class |
| 5+ | -4 Fuckability | -4 Sociability | -4 Class | -4 Strength |

## Dungeon

Dungeon использует тот же глобальный `stamina` storage, но внутри у ресурса другой режим работы: это скорее запас экспедиции, а не обычная цена каждого действия. Подробности вынесены в `original_dungeon_stamina_verified.md`.

На main код точно требует `stamina >= 2` для входа. Пользователь подтверждает игровое правило как стоимость входа 2 обычных энергии. В просмотренном click-handler пока не найден отдельный literal `stamina -= 2`, поэтому реализация этого перехода остаётся помеченной для дальнейшей трассировки, а не выдумывается.
