# Legacy Choice-Outcome EN Parity Review v1

Date: 2026-09-27
Status: PRESENTATION_ONLY
Source of truth for RU review: item 76

## Final parity review

| Event ID | Choice ID | Normalized RU | Final EN | Parity |
|---|---|---|---|---|
| `base.arrival` | `introduce` | Вы договорились начать с простого. Орвин убрал инструкцию для големов. | You agree to start with something simple. Orwin puts away the instructions meant for golems. | PASS |
| `base.order` | `accept` | Заказ записан. Сварите две микстуры и сдайте их отдельным действием. | The order is recorded. Brew two potions and turn them in with the separate delivery action. | PASS |
| `base.bran` | `friendly` | Теперь Бран узнаёт вас на площади. Чайная открыта для разговоров. | Bran now recognizes you in the square. The tea shop is open for conversation. | PASS |
| `base.invite` | `yes` | Бран складывает план. Кажется, теперь он действительно может расслабиться. | Bran folds the map away. It looks as though he can finally relax. | PASS |
| `base.invite` | `no` | Бран принимает ваш ответ и переключается на рассказ о посылке, которая сама сбежала. | Bran accepts your answer and switches to a story about a parcel that ran away on its own. | PASS |
| `base.workday` | `steady` | Лавка закрылась вовремя. Это тоже достижение. | The shop closes on time. That counts as an achievement too. | PASS |
| `base.winter` | `help` | Метла согласилась работать на другой стороне улицы. Сосед обещал замолвить за вас слово. | The broom agrees to work on the other side of the street. The neighbor promises to put in a good word for you. | PASS |
| `base.winter` | `pass` | Вы оставили переговоры специалистам. | You leave the negotiations to the specialists. | PASS |
| `base.shelter` | `tell` | Вам уступили место поближе к печке. Здесь тоже можно начинать заново. | Someone gives you a place closer to the stove. You can make a new start here too. | PASS |
| `gopher.arrival` | `home` | Вы решаете искать путь назад. Остальные цели остаются открыты. | You decide to look for a way back. The other goals remain open. | PASS |
| `gopher.arrival` | `status` | Внимание можно превратить в связи, доход и самостоятельность. | Attention can be turned into connections, income, and independence. | PASS |
| `gopher.arrival` | `mystery` | Вы запоминаете странную паузу принца на вопросе о женщинах. | You remember the prince’s strange pause when asked about women. | PASS |
| `gopher.tavern-intro` | `agree` | Марек поддержал ваши условия. Здесь можно работать спокойно. | Marek backs your terms. You can work here in peace. | PASS |
| `gopher.tavern-quest` | `help` | Поручение открыто: проверить лесной склад. | The errand is open: check the forest storehouse. | PASS |
| `gopher.tavern-quest` | `later` | Марек оставляет папку на полке. К разговору можно вернуться позже. | Marek leaves the folder on the shelf. You can return to the conversation later. | PASS |
| `gopher.receipt` | `take` | Накладная у вас. Теперь её можно обсудить с Мареком. | You have the delivery note. You can now discuss it with Marek. | PASS |
| `gopher.tavern-resolution` | `guild` | Горожане сохраняют праздник. Открыта судьба «Праздник без разрешения». | The townspeople keep the festival. The fate “Festival Without Permission” is unlocked. | PASS |
| `gopher.tavern-resolution` | `prince` | Принц благодарит вас. Открыта судьба «Приглашение под печатью». | The prince thanks you. The fate “Invitation Under Seal” is unlocked. | PASS |
| `gopher.tavern-resolution` | `wait` | Документ остаётся у вас. К решению можно вернуться позже. | The document stays with you. You can return to the decision later. | PASS |
| `gopher.tavern-routine` | `finish` | Смена завершена и записана в ваш стаж. | The shift is complete and added to your work record. | PASS |
| `gopher.woods-intro` | `learn` | Теперь вы знакомы с Бронном. | You now know Bron. | PASS |
| `gopher.hunt-intro` | `learn` | Вы познакомились с Реном. Сегодня вы проверяете тропы без самостоятельного боя. | You meet Ren. Today you check the trails without fighting on your own. | PASS |
| `gopher.landlord` | `tea` | Силан обещает предупреждать о платежах. Плату за комнату можно внести перед сном. | Silan promises to warn you about payments. The room fee can be paid before sleep. | PASS |
| `stage.goblin` | `spar` | Вы проводите дружеский поединок деревянными палками. Тик признаёт поражение своей самоуверенности. | You have a friendly bout with wooden sticks. Tik concedes that his overconfidence has been defeated. | PASS |
| `stage.goblin` | `flirt` | Вы соглашаетесь на прогулку после работы. Вечером вы вместе идёте к ручью, и разговор оказывается приятнее спора об инструментах. | You agree to a walk after work. That evening you walk to the stream together, and the conversation turns out to be nicer than the argument about tools. | PASS |
| `stage.goblin` | `work` | Вы возвращаетесь к верстаку. Тик решает доказать полезность делом. | You return to the workbench. Tik decides to prove his usefulness by getting the job done. | PASS |

## Review rules

Each EN string was checked against the normalized RU source for:
- same immediate narrative consequence;
- same named characters and objects;
- same tutorial instruction where present;
- same named fate unlock text where present;
- no extra reward, relationship, route, flag, stat or progression implication;
- concise post-choice/journal readability.

All 26 entries pass the parity review.

## Translation decisions

- “накладная” is rendered as “delivery note” consistently with the surrounding gopher quest copy.
- “стаж” is rendered as “work record” to avoid implying a new formal experience-point system.
- named fate labels stay capitalized and quoted, matching the existing EN event bank.
- conversational humor is preserved where it does not alter outcome semantics.

## Integration boundary

Text only. No event/choice identity, effect, flag, condition, RNG, Save or presentation-consumer change.
