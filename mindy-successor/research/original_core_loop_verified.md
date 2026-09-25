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

Исправление прежней записи: глобальный `day` НЕ сбрасывается в 1 каждый год. Он идёт накопительно через обычный run.

Точные year boundaries, подтверждённые dungeon calendar handler:
- day 1–40 -> Year 1
- day 41 -> Year 2
- day 81 -> Year 3
- day 121 -> Year 4
- day 161 -> Year 5

Сезон также определяется по накопительному day и повторяется каждые 10 дней:
- 1–10, 41–50, 81–90, 121–130 = Brimstone
- 11–20, 51–60, 91–100, 131–140 = Megahot
- 21–30, 61–70, 101–110, 141–150 = Ghostings
- 31–40, 71–80, 111–120, 151–160 = Darkly

Итого обычные четыре года = 160 дней.

## Final Mode

Если finaleMode=true и day >= 100, main переключает игру в scene 400. То есть 100-дневный предел Final Mode существует в коде.

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
