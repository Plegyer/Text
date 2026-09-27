# Secret Debt Bilingual Localization-Key Inventory v1

Status: **AUTHORING_ONLY / NOT ROOT-LOADED PRODUCTION**.

Source fixture:
`prior-work/astra/prototype-m3.2/content/secret-debt-authored-content-ru-en-v1.fixture.json`.

Russian is the source authoring language; English is the full second locale.

This inventory proposes stable presentation localization keys for already-authored Secret Debt copy. It does not activate Secret Debt and does not choose any OPEN gameplay value.

## Key rules

- keys are locale-neutral;
- RU and EN share the same semantic key;
- keys describe presentation only;
- existing authoring IDs are used where available;
- array positions are never part of the proposed key;
- no key creates a gameplay event, career, Night rule, outcome threshold, or reward.

Namespaces:
- `secretDebt.lenderOffer.*`;
- `secretDebt.delayedActivation.*`;
- `secretDebt.hiddenWork.*`;
- `secretDebt.forcedNight.*`;
- `secretDebt.outcome.*`.

## Coverage

- lender-offer surfaces: **30**;
- delayed-activation surfaces: **16**;
- hidden-work surfaces: **30**;
- forced-Night surfaces: **10**;
- outcome surfaces: **12**;
- total authored RU+EN surfaces inventoried: **98**.

Every row below already has non-empty RU and EN in the authoring fixture.

## Stable key inventory

| Authored surface | Proposed localization key | RU source | EN |
| --- | --- | --- | --- |
| `lender/rain/setup` | `secretDebt.lenderOffer.rain.setup` | Дождь загнал прохожих под крыши. У навеса, где ты устроилась на ночь, останавливается человек в сухих перчатках и кладёт между вами небольшой кошель. | Rain has driven pedestrians indoors. A figure in dry gloves stops by the awning where you settled for the night and places a small purse between you. |
| `lender/rain/offer` | `secretDebt.lenderOffer.rain.offer` | Тебе нужно, чтобы сегодняшний вечер превратился в завтрашний день. Я могу сделать это проще. Возьми, если хочешь. Остальное уладим позже. | You need tonight to become tomorrow. I can make that easier. Take it if you want it. We can settle the rest later. |
| `lender/rain/accept-label` | `secretDebt.lenderOffer.rain.choice.accept.label` | Взять деньги | Take the money |
| `lender/rain/accept-resolution` | `secretDebt.lenderOffer.rain.choice.accept.resolution` | Ты берёшь кошель. Незнакомец кивает, будто завершил простую запись в счёте, и уходит до того, как ты решаешь спросить, что значит «позже». | You take the purse. The stranger nods as though a simple line of bookkeeping has been completed and leaves before you decide to ask what “later” means. |
| `lender/rain/refuse-label` | `secretDebt.lenderOffer.rain.choice.refuse.label` | Оставить кошель на месте | Leave it where it is |
| `lender/rain/refuse-resolution` | `secretDebt.lenderOffer.rain.choice.refuse.resolution` | Ты подталкиваешь кошель обратно. Незнакомец забирает его и исчезает в дожде. | You push the purse back. The stranger takes it and disappears into the rain. |
| `lender/market-close/setup` | `secretDebt.lenderOffer.market-close.setup` | Последние рыночные фонари гаснут. Человек из-под крытой галереи идёт рядом только тогда, когда улица почти пустеет. | The last market lamps go out. Someone beneath a covered arcade falls into step beside you only when the street is almost empty. |
| `lender/market-close/offer` | `secretDebt.lenderOffer.market-close.offer` | Глупая причина легко превращает плохую неделю в плохой месяц. Это не даст одной плохой неделе решить всё. | A stupid reason can turn a bad week into a bad month. This keeps one bad week from deciding everything. |
| `lender/market-close/accept-label` | `secretDebt.lenderOffer.market-close.choice.accept.label` | Принять аванс | Accept the advance |
| `lender/market-close/accept-resolution` | `secretDebt.lenderOffer.market-close.choice.accept.resolution` | Ты берёшь мешочек. Срок не называют. «Я буду знать, где тебя найти». | You take the pouch. No deadline is named. “I’ll know where to find you.” |
| `lender/market-close/refuse-label` | `secretDebt.lenderOffer.market-close.choice.refuse.label` | Отказаться от аванса | Refuse the advance |
| `lender/market-close/refuse-resolution` | `secretDebt.lenderOffer.market-close.choice.refuse.resolution` | Ты отказываешься. Мешочек убирают без спора. | You refuse. The pouch is put away without argument. |
| `lender/warm-drink/setup` | `secretDebt.lenderOffer.warm-drink.setup` | Сначала появляется стакан с чем-то горячим. Деньги — только потом. | A cup of something hot appears first. The money comes second. |
| `lender/warm-drink/offer` | `secretDebt.lenderOffer.warm-drink.offer` | На холоде любое решение кажется окончательным. А это — нет. Если спросить, чего от тебя хотят: «Не сегодня». | Cold makes every decision look permanent. This one isn’t. If you ask what is expected: “Not tonight.” |
| `lender/warm-drink/accept-label` | `secretDebt.lenderOffer.warm-drink.choice.accept.label` | Принять помощь | Take the help |
| `lender/warm-drink/accept-resolution` | `secretDebt.lenderOffer.warm-drink.choice.accept.resolution` | Тепло доходит до пальцев раньше, чем последствия — до мыслей. «Потрать, сколько нужно. Мы ещё поговорим». | The warmth reaches your hands before the implications reach your thoughts. “Spend what you need. We will speak again.” |
| `lender/warm-drink/refuse-label` | `secretDebt.lenderOffer.warm-drink.choice.refuse.label` | Отказаться | Refuse |
| `lender/warm-drink/refuse-resolution` | `secretDebt.lenderOffer.warm-drink.choice.refuse.resolution` | Ты не тянешься ни к стакану, ни к кошелю. «Твой выбор». | You reach for neither the cup nor the purse. “Your choice.” |
| `lender/no-pity/setup` | `secretDebt.lenderOffer.no-pity.setup` | Незнакомец не предлагает сочувствия и задаёт один практический вопрос о том, сколько ещё можно решать каждую проблему по одному дню. | The stranger offers no sympathy and asks one practical question about how long every problem can keep being solved one day at a time. |
| `lender/no-pity/offer` | `secretDebt.lenderOffer.no-pity.offer` | Это покупает тебе пространство для выбора. | This buys you room to choose. |
| `lender/no-pity/accept-label` | `secretDebt.lenderOffer.no-pity.choice.accept.label` | Купить немного передышки | Buy some breathing room |
| `lender/no-pity/accept-resolution` | `secretDebt.lenderOffer.no-pity.choice.accept.resolution` | Ты принимаешь деньги. «Используй пространство». | You accept the money. “Use the room.” |
| `lender/no-pity/refuse-label` | `secretDebt.lenderOffer.no-pity.choice.refuse.label` | Оставить долг равным нулю | Keep your debt at zero |
| `lender/no-pity/refuse-resolution` | `secretDebt.lenderOffer.no-pity.choice.refuse.resolution` | Ты отказываешься. «Тогда постарайся так и оставить». | You refuse. “Then try to keep it that way.” |
| `lender/envelope/setup` | `secretDebt.lenderOffer.envelope.setup` | Тебе протягивают дорогой конверт без отметок. Содержимое не показывают до решения. | You are offered an expensive unmarked envelope. The contents are not shown before the choice. |
| `lender/envelope/offer` | `secretDebt.lenderOffer.envelope.offer` | Тебе не обязательно мне доверять. Нужно только решить, поможет ли это сейчас. Что будет потом? «Разговор». | You don’t have to trust me. You only have to decide whether this helps now. What comes later? “A conversation.” |
| `lender/envelope/accept-label` | `secretDebt.lenderOffer.envelope.choice.accept.label` | Открыть конверт | Open the envelope |
| `lender/envelope/accept-resolution` | `secretDebt.lenderOffer.envelope.choice.accept.resolution` | Ты открываешь конверт и принимаешь содержимое. «Тогда мы друг друга поняли». | You open the envelope and accept what is inside. “Then we understand each other.” |
| `lender/envelope/refuse-label` | `secretDebt.lenderOffer.envelope.choice.refuse.label` | Вернуть не открывая | Hand it back unopened |
| `lender/envelope/refuse-resolution` | `secretDebt.lenderOffer.envelope.choice.refuse.resolution` | Ты возвращаешь конверт. «Справедливо». | You return the envelope. “Fair enough.” |
| `delayed/temporary-relief/room-tonight` | `secretDebt.delayedActivation.temporary-relief.room-tonight.text` | Немедленная помощь решает реальную проблему. На одну ночь не приходится пересчитывать одни и те же монеты дважды. | The immediate help solves a real problem. For one night you do not have to count the same coins twice. |
| `delayed/temporary-relief/ordinary-purchases` | `secretDebt.delayedActivation.temporary-relief.ordinary-purchases.text` | Небольшая покупка больше не выглядит угрозой завтрашнему ночлегу — в пределах того, что реально допускает текущее состояние игры. | A small purchase no longer looks like a threat to tomorrow’s lodging—within what the actual game state allows. |
| `delayed/temporary-relief/no-immediate-consequence` | `secretDebt.delayedActivation.temporary-relief.no-immediate-consequence.text` | Проходит ещё один день без требования. Ничего не произошло. К вечеру это почти успокаивает. | Another day passes with no demand. Nothing happened. By evening, that almost feels reassuring. |
| `delayed/ambiguous-reminder/familiar-handwriting` | `secretDebt.delayedActivation.ambiguous-reminder.familiar-handwriting.text` | Записка содержит только: «Я не забыл». | A note contains only: “I haven’t forgotten.” |
| `delayed/ambiguous-reminder/distant-observer` | `secretDebt.delayedActivation.ambiguous-reminder.distant-observer.text` | На другой стороне улицы мелькает возможный наблюдатель и первым отводит взгляд. | Across the street, a possible observer appears briefly and looks away first. |
| `delayed/ambiguous-reminder/account-language` | `secretDebt.delayedActivation.ambiguous-reminder.account-language.text` | Карточка сообщает: «Твой счёт всё ещё открыт». | A card says: “Your account remains open.” |
| `delayed/ambiguous-reminder/wrong-moment` | `secretDebt.delayedActivation.ambiguous-reminder.wrong-moment.text` | Обычный день заканчивается напоминанием о том, что кто-то ещё считает твоё время своим вопросом. | An ordinary day ends with a reminder that somebody else considers your time their concern. |
| `delayed/ambiguous-reminder/suspicious-silence` | `secretDebt.delayedActivation.ambiguous-reminder.suspicious-silence.text` | Сегодня ничего не приходит, и именно отсутствие сообщения начинает тревожить. | Nothing arrives today, and the absence itself becomes unsettling. |
| `delayed/pre-activation/soon` | `secretDebt.delayedActivation.pre-activation.soon.text` | Скоро. | Soon. |
| `delayed/pre-activation/be-available` | `secretDebt.delayedActivation.pre-activation.be-available.text` | Будь на месте, когда позовут. | Be available when called. |
| `delayed/pre-activation/meeting-request` | `secretDebt.delayedActivation.pre-activation.meeting-request.text` | Нужно обсудить остальное. | We need to discuss the rest. |
| `delayed/activation-notice/amount-not-the-point` | `secretDebt.delayedActivation.activation-notice.amount-not-the-point.text` | Аванс больше не главная часть вопроса. Достаточно, чтобы перестать делать вид, будто это была случайная помощь. | The advance is no longer the main part of the problem. Enough that we are done pretending this was casual. |
| `delayed/activation-notice/work-instead-of-payment` | `secretDebt.delayedActivation.activation-notice.work-instead-of-payment.text` | Если есть деньги, можно закрыть это деньгами. Если нет — есть работа. | If you have the money, this can be settled with money. If not, there is work. |
| `delayed/activation-notice/professional-lock-reveal` | `secretDebt.delayedActivation.activation-notice.professional-lock-reveal.text` | Пока это не закрыто, работать ты будешь здесь. | Until this is settled, your work belongs here. |
| `delayed/activation-notice/quiet-account-change` | `secretDebt.delayedActivation.activation-notice.quiet-account-change.text` | Ты приняла помощь. Теперь меняется сам счёт. | You accepted help. Now the account changes. |
| `delayed/activation-notice/push-back` | `secretDebt.delayedActivation.activation-notice.push-back.text` | «Мы об этом не договаривались». — «Это была та часть, которую ты не попросила прочитать». | “That wasn’t the agreement.” — “It was the part you didn’t ask to read.” |
| `hidden-work/sorting-carrying/text` | `secretDebt.hiddenWork.sorting-carrying.text` | Ящики прибывают быстрее, чем их успевают подписывать. Перенести отмеченное, сложить остальное, спросить только когда угадать невозможно. | Crates arrive faster than they can be labeled. Move what is marked, stack the rest, ask only when guessing is impossible. |
| `hidden-work/sorting-carrying/compliance` | `secretDebt.hiddenWork.sorting-carrying.choice.compliance` | Войти в ритм и закончить штабель. | Settle into the rhythm and finish the stack. |
| `hidden-work/sorting-carrying/resistance` | `secretDebt.hiddenWork.sorting-carrying.choice.resistance` | Сделать ровно то, что попросили, и ничего сверх. | Do exactly what was asked and nothing beyond it. |
| `hidden-work/cleanup-after-closing/text` | `secretDebt.hiddenWork.cleanup-after-closing.text` | После ухода посетителей остаются грязь, зола, пролитое питьё и всё, что никто не замечал в суете. | After customers leave, mud, ash, spilled drink, and everything nobody noticed in the rush remain. |
| `hidden-work/cleanup-after-closing/compliance` | `secretDebt.hiddenWork.cleanup-after-closing.choice.compliance` | Убирать методично, угол за углом. | Clean methodically, corner by corner. |
| `hidden-work/cleanup-after-closing/resistance` | `secretDebt.hiddenWork.cleanup-after-closing.choice.resistance` | Убирать рабочий беспорядок, но не чужие личные поручения. | Clean the work mess, not somebody else’s personal errands. |
| `hidden-work/supervised-delivery/text` | `secretDebt.hiddenWork.supervised-delivery.text` | Запечатанный пакет нужно отнести через город, пока кто-то следит, что именно ты выполняешь поручение. | A sealed package must cross town while somebody makes sure you are the one carrying it. |
| `hidden-work/supervised-delivery/compliance` | `secretDebt.hiddenWork.supervised-delivery.choice.compliance` | Выбрать кратчайший путь и вернуться с подтверждением. | Take the shortest route and return with proof. |
| `hidden-work/supervised-delivery/resistance` | `secretDebt.hiddenWork.supervised-delivery.choice.resistance` | Запомнить каждый поворот и каждое наблюдающее лицо. | Remember every turn and every watching face. |
| `hidden-work/inventory-count/text` | `secretDebt.hiddenWork.inventory-count.text` | Полки, коробки, книги. Нужно считать чужое имущество и сводить цифры. | Shelves, boxes, ledgers. Count what belongs to somebody else and make the numbers match. |
| `hidden-work/inventory-count/compliance` | `secretDebt.hiddenWork.inventory-count.choice.compliance` | Переписать итоги точно. | Copy the totals exactly. |
| `hidden-work/inventory-count/resistance` | `secretDebt.hiddenWork.inventory-count.choice.resistance` | Переписать точно и запомнить бессмысленные строки. | Copy them exactly and remember the entries that make no sense. |
| `hidden-work/service-under-observation/text` | `secretDebt.hiddenWork.service-under-observation.text` | Задача проста; тяжело только то, что каждую паузу и каждый вопрос замечают. | The task is simple; the difficult part is that every pause and question is noticed. |
| `hidden-work/service-under-observation/compliance` | `secretDebt.hiddenWork.service-under-observation.choice.compliance` | Сохранить нейтральное лицо и закончить чисто. | Keep a neutral expression and finish cleanly. |
| `hidden-work/service-under-observation/resistance` | `secretDebt.hiddenWork.service-under-observation.choice.resistance` | Дать им только ту работу, которую они действительно поручили. | Give them only the work they can prove they asked for. |
| `hidden-work/maintenance/text` | `secretDebt.hiddenWork.maintenance.text` | Что-то забилось, протекло, заклинило или сгнило. Работа достаётся тому, кого проще всего заставить. | Something clogged, leaked, jammed, or rotted. The job goes to whoever is easiest to make do it. |
| `hidden-work/maintenance/compliance` | `secretDebt.hiddenWork.maintenance.choice.compliance` | Устранить проблему и идти дальше. | Fix the problem and move on. |
| `hidden-work/maintenance/resistance` | `secretDebt.hiddenWork.maintenance.choice.resistance` | Сделать ремонт, но не позволить назвать его одолжением. | Make the repair work without letting anyone call it a favor. |
| `hidden-work/records-after-hours/text` | `secretDebt.hiddenWork.records-after-hours.text` | Книга учёта лежит перед тобой так, будто обозначения давно знакомы. Столбцам всё равно, насколько длинным был день. | A ledger lies in front of you as if the notation were already familiar. The columns do not care how long the day has been. |
| `hidden-work/records-after-hours/compliance` | `secretDebt.hiddenWork.records-after-hours.choice.compliance` | Идти строка за строкой, пока страницы не сойдутся. | Work line by line until the pages balance. |
| `hidden-work/records-after-hours/resistance` | `secretDebt.hiddenWork.records-after-hours.choice.resistance` | Работать достаточно внимательно, чтобы увидеть, что раскрывают цифры. | Work carefully enough to see what the numbers reveal. |
| `hidden-work/controlled-errand/text` | `secretDebt.hiddenWork.controlled-errand.text` | Простое поручение начинается с напоминания: «Сначала это». Содержание сцены — в отсутствии выбора. | A simple errand begins with a reminder: “This first.” The content is the lack of choice. |
| `hidden-work/controlled-errand/compliance` | `secretDebt.hiddenWork.controlled-errand.choice.compliance` | Закончить быстро и вернуть себе остаток дня. | Finish quickly and reclaim what remains of the day. |
| `hidden-work/controlled-errand/resistance` | `secretDebt.hiddenWork.controlled-errand.choice.resistance` | Сделать медленнее, но не дать удобного повода. | Do it more slowly without handing them an easy excuse. |
| `hidden-work/heavy-shift/text` | `secretDebt.hiddenWork.heavy-shift.text` | Сегодня перед тобой ставят больше работы, не объявляя, что стандарт изменился. | Today they put more work in front of you without announcing that the standard has changed. |
| `hidden-work/heavy-shift/compliance` | `secretDebt.hiddenWork.heavy-shift.choice.compliance` | Распределить силы и закончить. | Pace yourself and finish. |
| `hidden-work/heavy-shift/resistance` | `secretDebt.hiddenWork.heavy-shift.choice.resistance` | Не позволить усталости выглядеть как благодарность. | Refuse to make exhaustion look like gratitude. |
| `hidden-work/trusted-access/text` | `secretDebt.hiddenWork.trusted-access.text` | Впервые тебя отправляют без наблюдателя. Это не свобода, а узкое полезное доверие. | For the first time you are sent without a watcher. It is not freedom, only narrow useful trust. |
| `hidden-work/trusted-access/compliance` | `secretDebt.hiddenWork.trusted-access.choice.compliance` | Вернуться точно как ожидали. | Return exactly as expected. |
| `hidden-work/trusted-access/resistance` | `secretDebt.hiddenWork.trusted-access.choice.resistance` | Вернуться как ожидали, но знать больше, чем раньше. | Return as expected, but know more than before. |
| `forced-night/late-summons` | `secretDebt.forcedNight.late-summons.text` | До того как ночь становится твоей, приходит короткое сообщение: «Вернись». Ночная задача меньше смены, но вторгается именно в то время, которое должно было быть свободным. | Before the night becomes yours, a short message arrives: “Come back.” The night task is smaller than a shift, but it intrudes on the time that should have been free. |
| `forced-night/inventory` | `secretDebt.forcedNight.inventory.text` | Расхождение в учёте решают проверить прямо сейчас. «Это может подождать до утра». — «Нет. Это можно сделать сегодня». | A discrepancy is checked immediately. “It can wait until morning.” — “No. It can be done tonight.” |
| `forced-night/escort` | `secretDebt.forcedNight.escort.text` | Нужно сопровождать кого-то через ночной город: идти можно почти куда угодно, кроме места, которое выбрала бы сама. | You must escort somebody through the night city: you can walk almost anywhere except where you would have chosen yourself. |
| `forced-night/cleanup` | `secretDebt.forcedNight.cleanup.text` | После ухода важных гостей закрытая днём комната внезапно становится твоей ответственностью. | After important guests leave, a room closed to you during the day suddenly becomes your responsibility. |
| `forced-night/watch` | `secretDebt.forcedNight.watch.text` | Нужно бодрствовать и следить за дверью, телегой, складом, гостем или пакетом. «Если ничего не случилось, значит, ты сделала свою работу». | You must stay awake and watch a door, cart, storeroom, guest, or package. “If nothing happened, you did your job.” |
| `forced-night/private-ledger` | `secretDebt.forcedNight.private-ledger.text` | Ночью появляется вторая книга учёта. Цифры не совпадают, а понимать почему никто не просит. | At night a second ledger appears. The numbers do not match, and nobody asks you to understand why. |
| `forced-night/personal-errand` | `secretDebt.forcedNight.personal-errand.text` | Рабочая обязанность превращается в чьё-то личное удобство. Поручение могло подождать — именно поэтому важно, что ему не позволили. | A work duty turns into somebody’s personal convenience. The errand could have waited—that is exactly why it matters that it did not. |
| `forced-night/correction` | `secretDebt.forcedNight.correction.text` | После спора или сопротивления тебя вызывают для предупреждения. «Ты путаешь терпение с разрешением». | After an argument or resistance, you are called in for a warning. “You are confusing tolerance with permission.” |
| `forced-night/trusted-task` | `secretDebt.forcedNight.trusted-task.text` | Прийти всё ещё обязаны, но теперь задача требует именно твоей компетентности. «Мне нужно, чтобы это сделали правильно». | Attendance is still mandatory, but now the task specifically requires your competence. “I need this done correctly.” |
| `forced-night/ambiguous-kindness` | `secretDebt.forcedNight.ambiguous-kindness.text` | Во время обязательной ночи кто-то оставляет еду или сухую одежду. Помощь реальна и всё равно не отменяет отсутствие выбора. | During a forced Night, somebody leaves food or dry clothes. The help is real and still does not erase the lack of choice. |
| `outcome/paid_freedom/approach` | `secretDebt.outcome.paid_freedom.approach` | Ты пересчитываешь деньги дважды — впервые итог может означать не только выживание до завтра. | You count the money twice—for the first time the total can mean more than surviving until tomorrow. |
| `outcome/paid_freedom/resolution` | `secretDebt.outcome.paid_freedom.resolution` | «Мы закрываем счёт». — «Полностью?» — «Полностью». | “We’re settling it.” — “All of it?” — “All of it.” |
| `outcome/paid_freedom/aftermath` | `secretDebt.outcome.paid_freedom.aftermath` | Улица выглядит так же, но никто не мешает тебе самой выбрать, куда идти дальше. | The street looks the same, but nobody stops you from choosing where to go next. |
| `outcome/paid_freedom/runResult` | `secretDebt.outcome.paid_freedom.runResult` | Ты выплатила долг и закончила зависимость. | You paid the debt and ended the dependency. |
| `outcome/bound_life/approach` | `secretDebt.outcome.bound_life.approach` | Работа перестала быть незнакомой: ты знаешь маршруты, правила и чужие привычки без подсказок. | The work is no longer unfamiliar: you know the routes, rules, and other people’s habits without being told. |
| `outcome/bound_life/commitment` | `secretDebt.outcome.bound_life.commitment` | «Я знаю работу. Я знаю правила. Я знаю цену». — «И?» — «Я остаюсь». | “I know the work. I know the rules. I know the cost.” — “And?” — “I’m staying.” |
| `outcome/bound_life/aftermath` | `secretDebt.outcome.bound_life.aftermath` | Следующее утро начинается уже не как временный день. Тебе не объясняют, с чего начинать. | The next morning no longer begins as a temporary day. Nobody tells you where to start. |
| `outcome/bound_life/runResult` | `secretDebt.outcome.bound_life.runResult` | То, что началось с долга, стало привычкой, умением, историей и выбором остаться. | What began as debt became routine, competence, history, and a choice to remain. |
| `outcome/takeover/preparation` | `secretDebt.outcome.takeover.preparation` | Ловушка перестала выглядеть ловушкой, когда стали видны все её петли и появился внешний рычаг, находящийся вне их контроля. | The trap stopped looking like a trap when all its hinges became visible and external leverage existed outside their control. |
| `outcome/takeover/confrontation` | `secretDebt.outcome.takeover.confrontation` | «Мы больше не обсуждаем, что я вам должна». — «Тогда что?» — «Что произойдёт, когда все узнают, как здесь всё работает». | “We’re not discussing what I owe anymore.” — “Then what?” — “What happens when everyone learns how this place works.” |
| `outcome/takeover/aftermath` | `secretDebt.outcome.takeover.aftermath` | Работа может остаться той же, но направление приказов меняется: прежний контролёр больше не управляет твоей профессиональной свободой тем же способом. | The work may remain the same, but the direction of orders changes: the former controller can no longer command your professional freedom in the same way. |
| `outcome/takeover/runResult` | `secretDebt.outcome.takeover.runResult` | Ты соединила знания скрытой работы с внешним рычагом и взяла управление. | You combined hidden-career knowledge with outside leverage and took control. |

## Gameplay identity boundary

The following authored semantic/gameplay concepts remain separate from localization keys:
- lender offer;
- pending-to-bound transition;
- hidden-career work;
- forced Secret Debt Night;
- `paid_freedom`;
- `bound_life`;
- `takeover`.

Localization keys do not make those concepts root-loaded or runnable.

## OPEN mechanics explicitly excluded

This inventory selects none of:
- encounter probability;
- immediate principal;
- delayed debt amount;
- activation delay;
- hidden-career production ID;
- hidden-career Energy cost;
- wage;
- stat gains;
- career thresholds;
- School availability while bound;
- Activity availability while bound;
- forced-Night intercept;
- lodging policy;
- forced-Night next-day penalty;
- next-day modifier composition;
- outcome eligibility thresholds;
- takeover external dependency;
- Meta reward IDs/effects.

The authoring fixture keeps those values `OPEN` / `null`.

## Ordinary-poverty isolation

No proposed key uses an ordinary-poverty event namespace. Secret Debt stays separate from:
- `poverty-street-production.*`;
- `poverty-street-production-v2.*`;
- `poverty-cheap-production.*`;
- `poverty-cheap-production-v2.*`;
- `poverty-recovery-production.*`;
- `poverty-pressure-production.*`.

## Palace / Hard Work firewall

Secret Debt is not an ordinary Hard Work career and does not count toward Palace 10/10.

This inventory does not create a `hardWork:*` reward or add a Secret Debt career to the ordinary-career set.

## Integration disposition

The 98 keys are suitable for future localization-bundle generation **only after** Lead/Product supplies authoritative production identities and mechanics. Until then they remain an authoring inventory, not a current-main localization delta.
