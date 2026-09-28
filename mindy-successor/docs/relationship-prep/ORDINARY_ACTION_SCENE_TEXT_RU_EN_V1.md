# Ordinary Action Scene Text RU+EN v1

Date: 2026-09-28
Status: PRESENTATION_ONLY
Baseline main: `4223be1f90f15a43938e072bc2171b0de5d2d1aa`

## Exact current scene identities

| Action ID | Scene ID | RU scene text | EN scene text |
|---|---|---|---|
| `work` | `default` | 30 монет, опыт и знакомства. Занимает одно действие. | 30 coins, practice, and new connections. Takes one action. |
| `forage` | `default` | Две порции трав. В зимнем городе сбор заменяет работа с запасами. | Gather two portions of herbs. In winter, city foraging is replaced by working with stored supplies. |
| `brew` | `default` | Одна трава и один ход. Щадящий нагрев даёт одну микстуру; быстрый — две при мастерстве 3 или наличии весов. | One herb and one action. Gentle heating yields one tonic; the fast method yields two with mastery 3 or a set of scales. |
| `sell` | `default` | Продажа одной готовой микстуры за 24 монеты. | Sell one finished tonic for 24 coins. |
| `scales` | `default` | 60 монет. Открывают быстрый способ приготовления без риска пены. | Costs 60 coins. Unlocks the fast brewing method without the risk of foam. |
| `exam` | `default` | 3 урока, смекалка 7 и мастерство 2. Экзамен стоит 20 монет. | Requires 3 lessons, intelligence 7, and alchemy mastery 2. The exam costs 20 coins. |
| `deliver` | `default` | Передать две микстуры артели: награда 50 монет, доступ к судьбе. | Deliver two tonics to the crew: reward 50 coins and access to a fate. |
| `visit` | `default` | Поговорить с Браном. Линия открывается после первого знакомства. | Talk with Bran. This line opens after your first meeting. |
| `oddjob` | `default` | 10 монет за поручение. Доступна без образования и инструментов. | Earn 10 coins for an errand. Available without education or tools. |
| `repay` | `default` | Вернуть до 10 монет, не больше остатка долга. Долг не исчезает при переезде. | Repay up to 10 coins, never more than the remaining debt. Moving does not erase the debt. |
| `rent-room` | `default` | Снять комнату за 18 монет после погашения старого долга. Ночлег оплачивается отдельно. | Rent a room for 18 coins after clearing the old debt. Night lodging is paid separately. |
| `rest` | `default` | Выбрать ночлег. Оплата монетами, помощь хозяину или бесплатный навес. | Choose lodging: pay with coins, help the host, or use the free shelter. |
| `arrival` | `default` | За белым сусликом — в новую жизнь. | Follow the white gopher into a new life. |
| `forest-search` | `default` | Найти накладную Марека; нужно чутьё 3. Текстовая вылазка на лесной склад. | Find Marek’s delivery note; requires perception 3. A text-based outing to the forest storehouse. |
| `tavern-talk` | `default` | Вернуться с уликой и решить, кому достанется право на праздник. | Return with the clue and decide who receives the right to hold the festival. |
| `landlord` | `default` | Силан расскажет о жилье и предложит чай. Первое знакомство. | Silan will explain the housing arrangement and offer tea. First meeting. |

## Stable key form

`action.<actionId>.scene.<sceneId>.text`

All rows above use the exact current `default` scene identity.

## Exclusions

This file does not author:
- School-course result text;
- poverty-owned text;
- Forest Activity route/result text;
- career `*.shift` seasonal/result text;
- legacy seasonal `tavern/lumber/hunt/guard` scene copy.

`forest-search/default` remains the exact current legacy/tutorial action scene and is not a Forest Activity result.

## Consumer note

Current engine persists selected scene text into `lastAction.text`; current generic result UI renders that stored text directly.

Therefore these strings are source-ready, but visible RU↔EN result switching requires a shared locale-neutral action-result presentation consumer.

## Boundary

Text only. No scene selection, media, action mechanics, conditions, effects, Save or RNG changes.
