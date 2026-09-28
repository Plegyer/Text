# Ordinary Action Labels / Descriptions RU+EN v1

Date: 2026-09-28
Status: PRESENTATION_ONLY
Baseline main: `4223be1f90f15a43938e072bc2171b0de5d2d1aa`

| Action ID | RU label | EN label | RU description | EN description |
|---|---|---|---|---|
| `work` | Практика в учебной лавке | Practice in the training shop | 30 монет, опыт и знакомства. Занимает одно действие. | 30 coins, practice, and new connections. Takes one action. |
| `forage` | Собрать травы | Gather herbs | Две порции трав. В зимнем городе сбор заменяет работа с запасами. | Gather two portions of herbs. In winter, city foraging is replaced by working with stored supplies. |
| `brew` | Приготовить микстуру | Brew a tonic | Одна трава и один ход. Щадящий нагрев даёт одну микстуру; быстрый — две при мастерстве 3 или наличии весов. | One herb and one action. Gentle heating yields one tonic; the fast method yields two with mastery 3 or a set of scales. |
| `sell` | Продать микстуру | Sell a tonic | Продажа одной готовой микстуры за 24 монеты. | Sell one finished tonic for 24 coins. |
| `scales` | Купить точные весы | Buy precise scales | 60 монет. Открывают быстрый способ приготовления без риска пены. | Costs 60 coins. Unlocks the fast brewing method without the risk of foam. |
| `exam` | Сдать экзамен | Take the exam | 3 урока, смекалка 7 и мастерство 2. Экзамен стоит 20 монет. | Requires 3 lessons, intelligence 7, and alchemy mastery 2. The exam costs 20 coins. |
| `deliver` | Сдать общий заказ | Deliver the shared order | Передать две микстуры артели: награда 50 монет, доступ к судьбе. | Deliver two tonics to the crew: reward 50 coins and access to a fate. |
| `visit` | Зайти в чайную | Visit the tea shop | Поговорить с Браном. Линия открывается после первого знакомства. | Talk with Bran. This line opens after your first meeting. |
| `oddjob` | Мелкая подработка | Take a small odd job | 10 монет за поручение. Доступна без образования и инструментов. | Earn 10 coins for an errand. Available without education or tools. |
| `repay` | Погасить часть долга | Repay part of the debt | Вернуть до 10 монет, не больше остатка долга. Долг не исчезает при переезде. | Repay up to 10 coins, never more than the remaining debt. Moving does not erase the debt. |
| `rent-room` | Вернуться в комнату | Return to a room | Снять комнату за 18 монет после погашения старого долга. Ночлег оплачивается отдельно. | Rent a room for 18 coins after clearing the old debt. Night lodging is paid separately. |
| `rest` | Отдохнуть | Rest | Выбрать ночлег. Оплата монетами, помощь хозяину или бесплатный навес. | Choose lodging: pay with coins, help the host, or use the free shelter. |
| `arrival` | Пойти за белым сусликом | Follow the white gopher | Начать историю. Это вступление не расходует действие. | Begin the story. This introduction does not consume an action. |
| `forest-search` | Проверить лесной склад | Check the forest storehouse | Найти накладную Марека; нужно чутьё 3. Текстовая вылазка на лесной склад. | Find Marek’s delivery note; requires perception 3. A text-based outing to the forest storehouse. |
| `tavern-talk` | Обсудить накладную с трактирщиком | Discuss the delivery note with the innkeeper | Вернуться с уликой и решить, кому достанется право на праздник. | Return with the clue and decide who receives the right to hold the festival. |
| `landlord` | Навестить хозяина комнаты | Visit the landlord | Силан расскажет о жилье и предложит чай. Первое знакомство. | Silan will explain the housing arrangement and offer tea. First meeting. |

## Stable key forms

For each row:
- label: `action.<actionId>.label`
- description: `action.<actionId>.description`

## Translation constraints

- Numbers, costs, prerequisite facts, rewards and route facts preserve current mechanics.
- `forest-search` remains the legacy/tutorial storehouse action only; no Forest Activity result semantics are added.
- `rest` describes current catalog intent only and does not redefine NightFlow/lodging mechanics.
- `exam` is the exact current legacy action identity, not the School course system.
- No career `*.shift` strings are duplicated here.

## Boundary

Text only. No action IDs, costs, conditions, effects, yields, unlock rules, action counts, Save or RNG changes.
