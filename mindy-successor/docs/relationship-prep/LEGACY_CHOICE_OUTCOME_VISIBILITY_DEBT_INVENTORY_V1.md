# Legacy Choice-Outcome Visibility Debt Inventory v1

Date: 2026-09-27
Owner: Chat 5
Exact current-main baseline: `d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`

## Current runtime behavior

On current main, resolving a pending event choice:

1. selects the exact current `sceneChoice`;
2. applies its current effects;
3. appends embedded `sceneChoice.text` to `run.historyState.journal`;
4. if `run.flow.lastAction` exists, copies the same embedded source text into `lastAction.text`;
5. clears the pending scene and continues resolver flow.

The generic pending-scene UI localizes title, selected variant body and choice labels, but it does not localize the resolved choice body. The Journal panel renders stored journal strings directly. Non-School last-action result rendering also uses stored `lastAction.text` directly.

Therefore visible EN for choice outcomes remains blocked by shared presentation/runtime even if the prepared `event.<eventId>.choice.<choiceId>.text` root strings are merged.

## Exact current choice-outcome inventory

All 26 current choice outcomes below are affected.

| Event ID | Choice ID | Current embedded source text | Persisted / surfaced | Visible EN status |
|---|---|---|---|---|
| `base.arrival` | `introduce` | Вы договорились начать с простого. Орвин убрал инструкцию для големов. | journal always; lastAction when present | BLOCKED |
| `base.order` | `accept` | Заказ записан. Сварите две микстуры и сдайте их отдельным действием. | journal always; lastAction when present | BLOCKED |
| `base.bran` | `friendly` | Теперь Бран узнаёт вас на площади. Чайная открыта для разговоров. | journal always; lastAction when present | BLOCKED |
| `base.invite` | `yes` | Бран складывает план. Кажется, теперь он действительно может расслабиться. | journal always; lastAction when present | BLOCKED |
| `base.invite` | `no` | Бран принимает ваш ответ и переключается на рассказ о посылке, которая сама сбежала. | journal always; lastAction when present | BLOCKED |
| `base.workday` | `steady` | Лавка закрылась вовремя. Это тоже достижение. | journal always; lastAction when present | BLOCKED |
| `base.winter` | `help` | Метла согласилась на другую сторону улицы. Сосед обещал рассказать о вас хорошее. | journal always; lastAction when present | BLOCKED |
| `base.winter` | `pass` | Вы оставили переговоры специалистам. | journal always; lastAction when present | BLOCKED |
| `base.shelter` | `tell` | Вам уступили место поближе к печке. Здесь тоже можно начинать заново. | journal always; lastAction when present | BLOCKED |
| `gopher.arrival` | `home` | Вы решаете искать путь назад, но другие цели остаются открыты. | journal always; lastAction when present | BLOCKED |
| `gopher.arrival` | `status` | Внимание можно превратить в связи, доход и самостоятельность. | journal always; lastAction when present | BLOCKED |
| `gopher.arrival` | `mystery` | Вы запоминаете странную паузу принца при вопросе о женщинах. | journal always; lastAction when present | BLOCKED |
| `gopher.tavern-intro` | `agree` | Марек поддержал ваши условия. Здесь можно работать спокойно. | journal always; lastAction when present | BLOCKED |
| `gopher.tavern-quest` | `help` | Поручение открыто: проверить лесной склад. | journal always; lastAction when present | BLOCKED |
| `gopher.tavern-quest` | `later` | Марек оставляет папку на полке. Решение можно отложить. | journal always; lastAction when present | BLOCKED |
| `gopher.receipt` | `take` | Теперь можно обсудить накладную с Мареком. | journal always; lastAction when present | BLOCKED |
| `gopher.tavern-resolution` | `guild` | Город сохраняет праздник. Открыта судьба «Праздник без разрешения». | journal always; lastAction when present | BLOCKED |
| `gopher.tavern-resolution` | `prince` | Принц благодарит вас. Открыта судьба «Приглашение под печатью». | journal always; lastAction when present | BLOCKED |
| `gopher.tavern-resolution` | `wait` | Документ остаётся у вас. К решению можно вернуться. | journal always; lastAction when present | BLOCKED |
| `gopher.tavern-routine` | `finish` | Смена записана в ваш стаж. | journal always; lastAction when present | BLOCKED |
| `gopher.woods-intro` | `learn` | Теперь вы знакомы с Бронном. | journal always; lastAction when present | BLOCKED |
| `gopher.hunt-intro` | `learn` | Вы познакомились с Реном. Сегодня вы проверяете тропы без самостоятельного боя. | journal always; lastAction when present | BLOCKED |
| `gopher.landlord` | `tea` | Силан обещает предупреждать о платежах. Плату за комнату можно внести перед сном. | journal always; lastAction when present | BLOCKED |
| `stage.goblin` | `spar` | Вы проводите дружеский поединок деревянными палками. Тик признаёт вашу победу над его самоуверенностью. | journal always; lastAction when present | BLOCKED |
| `stage.goblin` | `flirt` | Вы соглашаетесь на прогулку после работы. Тик мгновенно вспоминает, что обещал закончить доски. Вечером вы вместе идёте к ручью; разговор получается гораздо приятнее спора об инструментах. | journal always; lastAction when present | BLOCKED |
| `stage.goblin` | `work` | Вы возвращаетесь к верстаку. Тик решает доказать свою полезность делом. | journal always; lastAction when present | BLOCKED |

## Persistence / visibility detail

### Journal

Every resolved choice body is persisted as plain embedded source prose in `run.historyState.journal`. The Journal panel renders these strings directly. Locale switching cannot reconstruct an EN version from stable identity because the stored entry contains no event/choice reference.

### lastAction

When a current `lastAction` exists at choice resolution, engine code overwrites:
- `lastAction.title` with embedded event title;
- `lastAction.text` with embedded choice text;
- optional `lastAction.media` if the choice supplies media.

For the ordinary action-triggered natural paths in this inventory, `lastAction` is typically present. Non-School result rendering uses the stored text directly, so EN remains blocked there as well.

### Pending scene

Before resolution, choice buttons use localized choice labels through:

`event.<eventId>.choice.<choiceId>.label`

The outcome/body key is not consumed by the pending scene.

## Required shared presentation fix

Content is source-ready, but a future Lead consumer needs a locale-neutral post-choice identity such as the exact event/choice pair. Visible text should then resolve:

`event.<eventId>.choice.<choiceId>.text`

without writing the selected RU or EN prose into gameplay identity.

## Invariants

Any future fix must preserve:
- exact current event ID;
- exact current choice ID;
- existing allowed-choice snapshot;
- existing effect application exactly once;
- resolver ordering and RNG behavior;
- locale-neutral Save identity;
- current gameplay journal semantics unless Lead explicitly migrates the journal representation.

No runtime/UI edit is part of this item.
