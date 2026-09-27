# Legacy Outcome Natural-Path Expectation Matrix v1

Date: 2026-09-27
Owner: Chat 5
Baseline main: `d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`
Outcome source: `legacy-choice-outcome-localization-v2.fixture.json`

## Identity / path matrix

Each item-78 outcome is identified by the exact current event and choice pair. Where one choice is shared by several current variants, the exact allowed variant set is listed.

| Event ID | Current variant identity/identities | Choice ID | Stable post-choice localization identity | Shortest current natural path | Exact current choice effects |
|---|---|---|---|---|---|
| `base.arrival` | `welcome` | `introduce` | `event.base.arrival.choice.introduce.text` | After arrival → work while alchemy.intro=false. | flag alchemy.intro=true; metric trust+3 |
| `base.order` | `order` | `accept` | `event.base.order.choice.accept.text` | Reach work≥3 → work while alchemy.order=false. | flag alchemy.order=true |
| `base.bran` | `delivery` | `friendly` | `event.base.bran.choice.friendly.text` | Reach work≥2 → work or oddjob while bran.met=false. | flag bran.met=true; metric trust+2 |
| `base.invite` | `tea` | `yes` | `event.base.invite.choice.yes.text` | Resolve base.bran/friendly → visit while Bran route is unresolved. | flag bran.interested=true; flag bran.date=true; metric trust+3 |
| `base.invite` | `tea` | `no` | `event.base.invite.choice.no.text` | Resolve base.bran/friendly → visit while Bran route is unresolved. | flag bran.declined=true |
| `base.workday` | `labels / cat / dust` | `steady` | `event.base.workday.choice.steady.text` | alchemy.intro=true → work when higher-priority work events do not preempt. | metric trust+1 |
| `base.winter` | `snow` | `help` | `event.base.winter.choice.help.text` | Winter → oddjob or forage. | metric empathy+1 |
| `base.winter` | `snow` | `pass` | `event.base.winter.choice.pass.text` | Winter → oddjob or forage. | none |
| `base.shelter` | `bunks` | `tell` | `event.base.shelter.choice.tell.text` | Street housing (legacy shelter) → rest. | metric empathy+1 |
| `gopher.arrival` | `default` | `home` | `event.gopher.arrival.choice.home.text` | Finish creation → arrival. | flag story.arrived=true; flag story.home=true |
| `gopher.arrival` | `default` | `status` | `event.gopher.arrival.choice.status.text` | Finish creation → arrival. | flag story.arrived=true; flag story.status=true |
| `gopher.arrival` | `default` | `mystery` | `event.gopher.arrival.choice.mystery.text` | Finish creation → arrival. | flag story.arrived=true; flag story.mystery=true |
| `gopher.tavern-intro` | `default` | `agree` | `event.gopher.tavern-intro.choice.agree.text` | story.arrived=true → tavern while tavern.met=false. | flag tavern.met=true |
| `gopher.tavern-quest` | `default` | `help` | `event.gopher.tavern-quest.choice.help.text` | tavern.met=true, tavern visits≥5, persuasion≥4 → tavern. | flag tavern.quest=true |
| `gopher.tavern-quest` | `default` | `later` | `event.gopher.tavern-quest.choice.later.text` | tavern.met=true, tavern visits≥5, persuasion≥4 → tavern. | none |
| `gopher.receipt` | `default` | `take` | `event.gopher.receipt.choice.take.text` | Accept tavern quest → meet forest-search requirements → forest-search. | none |
| `gopher.tavern-resolution` | `default` | `guild` | `event.gopher.tavern-resolution.choice.guild.text` | forest.receipt=true → tavern-talk while unresolved. | flag tavern.resolved=true; flag tavern.guild=true; flag guard.recommendation=true |
| `gopher.tavern-resolution` | `default` | `prince` | `event.gopher.tavern-resolution.choice.prince.text` | forest.receipt=true → tavern-talk while unresolved. | flag tavern.resolved=true; flag tavern.prince=true |
| `gopher.tavern-resolution` | `default` | `wait` | `event.gopher.tavern-resolution.choice.wait.text` | forest.receipt=true → tavern-talk while unresolved. | none |
| `gopher.tavern-routine` | `spring / summer / autumn / winter / default` | `finish` | `event.gopher.tavern-routine.choice.finish.text` | tavern.met=true → tavern when higher-priority tavern events do not preempt. | none |
| `gopher.woods-intro` | `default` | `learn` | `event.gopher.woods-intro.choice.learn.text` | story.arrived=true → lumber while woods.met=false. | flag woods.met=true |
| `gopher.hunt-intro` | `default` | `learn` | `event.gopher.hunt-intro.choice.learn.text` | story.arrived=true → hunt while hunt.met=false. | flag hunt.met=true |
| `gopher.landlord` | `default` | `tea` | `event.gopher.landlord.choice.tea.text` | story.arrived=true → landlord while satyr.met=false. | flag satyr.met=true |
| `stage.goblin` | `curious / default` | `spar` | `event.stage.goblin.choice.spar.text` | Resolve woods intro → lumber visits≥2 → lumber. | metric dexterity+1 |
| `stage.goblin` | `curious / default` | `flirt` | `event.stage.goblin.choice.flirt.text` | Resolve woods intro → lumber visits≥2 → lumber. | metric persuasion+1 |
| `stage.goblin` | `curious / default` | `work` | `event.stage.goblin.choice.work.text` | Resolve woods intro → lumber visits≥2 → lumber. | none |

## Expected RU / EN presentation

### `event.base.arrival.choice.introduce.text`
RU: Вы договорились начать с простого. Орвин убрал инструкцию для големов.

EN: You agree to start with something simple. Orwin puts away the instructions meant for golems.

### `event.base.order.choice.accept.text`
RU: Заказ записан. Сварите две микстуры и сдайте их отдельным действием.

EN: The order is recorded. Brew two potions and turn them in with the separate delivery action.

### `event.base.bran.choice.friendly.text`
RU: Теперь Бран узнаёт вас на площади. Чайная открыта для разговоров.

EN: Bran now recognizes you in the square. The tea shop is open for conversation.

### `event.base.invite.choice.yes.text`
RU: Бран складывает план. Кажется, теперь он действительно может расслабиться.

EN: Bran folds the map away. It looks as though he can finally relax.

### `event.base.invite.choice.no.text`
RU: Бран принимает ваш ответ и переключается на рассказ о посылке, которая сама сбежала.

EN: Bran accepts your answer and switches to a story about a parcel that ran away on its own.

### `event.base.workday.choice.steady.text`
RU: Лавка закрылась вовремя. Это тоже достижение.

EN: The shop closes on time. That counts as an achievement too.

### `event.base.winter.choice.help.text`
RU: Метла согласилась работать на другой стороне улицы. Сосед обещал замолвить за вас слово.

EN: The broom agrees to work on the other side of the street. The neighbor promises to put in a good word for you.

### `event.base.winter.choice.pass.text`
RU: Вы оставили переговоры специалистам.

EN: You leave the negotiations to the specialists.

### `event.base.shelter.choice.tell.text`
RU: Вам уступили место поближе к печке. Здесь тоже можно начинать заново.

EN: Someone gives you a place closer to the stove. You can make a new start here too.

### `event.gopher.arrival.choice.home.text`
RU: Вы решаете искать путь назад. Остальные цели остаются открыты.

EN: You decide to look for a way back. The other goals remain open.

### `event.gopher.arrival.choice.status.text`
RU: Внимание можно превратить в связи, доход и самостоятельность.

EN: Attention can be turned into connections, income, and independence.

### `event.gopher.arrival.choice.mystery.text`
RU: Вы запоминаете странную паузу принца на вопросе о женщинах.

EN: You remember the prince’s strange pause when asked about women.

### `event.gopher.tavern-intro.choice.agree.text`
RU: Марек поддержал ваши условия. Здесь можно работать спокойно.

EN: Marek backs your terms. You can work here in peace.

### `event.gopher.tavern-quest.choice.help.text`
RU: Поручение открыто: проверить лесной склад.

EN: The errand is open: check the forest storehouse.

### `event.gopher.tavern-quest.choice.later.text`
RU: Марек оставляет папку на полке. К разговору можно вернуться позже.

EN: Marek leaves the folder on the shelf. You can return to the conversation later.

### `event.gopher.receipt.choice.take.text`
RU: Накладная у вас. Теперь её можно обсудить с Мареком.

EN: You have the delivery note. You can now discuss it with Marek.

### `event.gopher.tavern-resolution.choice.guild.text`
RU: Горожане сохраняют праздник. Открыта судьба «Праздник без разрешения».

EN: The townspeople keep the festival. The fate “Festival Without Permission” is unlocked.

### `event.gopher.tavern-resolution.choice.prince.text`
RU: Принц благодарит вас. Открыта судьба «Приглашение под печатью».

EN: The prince thanks you. The fate “Invitation Under Seal” is unlocked.

### `event.gopher.tavern-resolution.choice.wait.text`
RU: Документ остаётся у вас. К решению можно вернуться позже.

EN: The document stays with you. You can return to the decision later.

### `event.gopher.tavern-routine.choice.finish.text`
RU: Смена завершена и записана в ваш стаж.

EN: The shift is complete and added to your work record.

### `event.gopher.woods-intro.choice.learn.text`
RU: Теперь вы знакомы с Бронном.

EN: You now know Bron.

### `event.gopher.hunt-intro.choice.learn.text`
RU: Вы познакомились с Реном. Сегодня вы проверяете тропы без самостоятельного боя.

EN: You meet Ren. Today you check the trails without fighting on your own.

### `event.gopher.landlord.choice.tea.text`
RU: Силан обещает предупреждать о платежах. Плату за комнату можно внести перед сном.

EN: Silan promises to warn you about payments. The room fee can be paid before sleep.

### `event.stage.goblin.choice.spar.text`
RU: Вы проводите дружеский поединок деревянными палками. Тик признаёт поражение своей самоуверенности.

EN: You have a friendly bout with wooden sticks. Tik concedes that his overconfidence has been defeated.

### `event.stage.goblin.choice.flirt.text`
RU: Вы соглашаетесь на прогулку после работы. Вечером вы вместе идёте к ручью, и разговор оказывается приятнее спора об инструментах.

EN: You agree to a walk after work. That evening you walk to the stream together, and the conversation turns out to be nicer than the argument about tools.

### `event.stage.goblin.choice.work.text`
RU: Вы возвращаетесь к верстаку. Тик решает доказать полезность делом.

EN: You return to the workbench. Tik decides to prove his usefulness by getting the job done.

## Invariants for every row

From equivalent pre-choice gameplay state in RU and EN:

- the same pending event ID is resolved;
- the same selected variant ID remains the source scene identity;
- the same exact choice ID is used;
- the same current effect list above is applied exactly once;
- the same flags, metrics, resources and progression result;
- the same resolver boundaries are executed;
- RNG evolution is identical for equivalent pre-state and choice;
- locale does not add an RNG draw;
- Save identity remains locale-neutral;
- visible post-choice text, when a future consumer exists, is derived from the stable `event.<eventId>.choice.<choiceId>.text` identity;
- the active RU or EN prose is never used as the gameplay identity.

## Current visibility caveat

Current main still writes embedded source choice text directly into journal and conditional `lastAction.text`. Therefore these expected RU/EN outcome strings are content-ready but EN visibility remains blocked until the shared presentation consumer described in item 80 exists.

## Ownership boundary

No new trigger, route, choice, effect, reward, Forest-result semantic, School, poverty, Foreman or Secret Debt behavior is introduced by this matrix.
