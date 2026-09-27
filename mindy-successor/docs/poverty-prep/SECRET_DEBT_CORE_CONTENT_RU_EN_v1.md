# Secret Debt Core Content RU+EN v1

Status: BILINGUAL CONTENT_DRAFT for Chat 3 item 127.

Russian is the source authoring language. English is a full second locale. All keys below are locale-neutral authoring/presentation identities; they do not create separate gameplay events per locale.

## Fixed system boundary

Secret Debt:
- starts from an eligible street Night context;
- is separate from ordinary poverty;
- preserves accept/refuse agency at the one-time lender offer;
- later bound state blocks all 10 ordinary careers while preserving their progress;
- remains outside the 10 ordinary careers and gives zero Palace 10/10 credit;
- has repeatable daytime hidden-career work;
- has forced Night as a separate Night obligation.

Still OPEN and intentionally absent from prose/mechanics here:
- lender encounter probability;
- immediate principal;
- delayed debt amount;
- exact activation delay;
- hidden-career wages/stat gains/thresholds;
- exact forced-Night intercept/lodging policy/next-day penalty;
- School/Activity availability while bound;
- exact outcome thresholds;
- exact Meta rewards.

No localized text may imply a number that Product has not chosen.

---

# 1. Lender offer — one-time street encounter

Canonical lender identity:
**OPEN / role-only**.

Locale-neutral choice family IDs:
- `accept`;
- `refuse`.

## Offer variant: rain

Presentation key:
`secret-debt/lender-offer/rain`

### RU — setup

Дождь давно загнал прохожих под крыши. У края навеса, где ты устроилась на ночь, останавливается человек в сухих перчатках. Он не спрашивает, почему ты спишь на улице. Смотрит на одежду, на закрытые постоялые дворы и кладёт между вами небольшой кошель.

### EN — setup

Rain has already driven most pedestrians indoors. A figure in dry gloves stops at the edge of the awning where you have settled for the night. They do not ask why you are sleeping outside. They look at your clothes, at the closed inns, and place a small purse between you.

### RU — offer

> «Тебе нужно, чтобы сегодняшний вечер превратился в завтрашний день. Я могу сделать это проще».

Кошель подталкивают ближе.

> «Возьми, если хочешь. Остальное уладим позже».

### EN — offer

> “You need tonight to become tomorrow. I can make that easier.”

The purse is nudged closer.

> “Take it if you want it. We can settle the rest later.”

### Accept

RU label:
**Взять деньги**

RU:
Ты сжимаешь кошель в ладони. Незнакомец не улыбается — только кивает, будто завершил простую запись в счёте.

> «Хорошо. Потрать с пользой».

Он уходит раньше, чем ты решаешь, стоит ли спрашивать, что именно значит «позже».

EN label:
**Take the money**

EN:
You close your hand around the purse. The stranger does not smile; they only nod, as though a simple line of bookkeeping has been completed.

> “Good. Use it well.”

They leave before you decide whether to ask what “later” actually means.

### Refuse

RU label:
**Оставить кошель на месте**

RU:
Ты подталкиваешь кошель обратно. На мгновение незнакомец смотрит скорее с любопытством, чем с раздражением.

> «Тогда нам не о чем говорить».

Он забирает деньги и исчезает в дожде.

EN label:
**Leave it where it is**

EN:
You push the purse back. For a moment the stranger looks more curious than annoyed.

> “Then we have nothing to discuss.”

They take the money and disappear into the rain.

Refusal closes the offer for this run; no locale changes that mechanic.

## Offer variant: market-close

Presentation key:
`secret-debt/lender-offer/market-close`

RU:
Последние рыночные фонари гаснут один за другим. Человек, дожидавшийся под крытой галереей, идёт рядом только тогда, когда улица почти пустеет. Его одежда слишком чистая для того, кому тоже некуда идти.

> «Глупая причина легко превращает плохую неделю в плохой месяц».

Он протягивает сложенный мешочек.

> «Это не даст одной плохой неделе решить всё».

EN:
The last market lamps go out one by one. Someone who had been waiting beneath a covered arcade falls into step beside you only when the street is nearly empty. Their clothes are too clean for someone who also has nowhere to go.

> “A stupid reason can turn a bad week into a bad month.”

They hold out a folded pouch.

> “This keeps one bad week from deciding everything.”

RU accept label:
**Принять аванс**

RU resolution:
Ты берёшь мешочек. Срок не называют.

> «Я буду знать, где тебя найти».

EN accept label:
**Accept the advance**

EN resolution:
You take the pouch. No deadline is named.

> “I’ll know where to find you.”

RU refuse label:
**Отказаться от аванса**

RU resolution:
Ты качаешь головой. Мешочек убирают без спора.

> «Тогда веди свой счёт сама».

EN refuse label:
**Refuse the advance**

EN resolution:
You shake your head. The pouch is folded away without argument.

> “Then keep your own account.”

## Offer variant: warm-drink

Presentation key:
`secret-debt/lender-offer/warm-drink`

RU:
Сначала перед тобой появляется стакан с чем-то горячим. Деньги — только потом.

> «На холоде любое решение кажется окончательным».

Рядом со стаканом ложится кошель.

> «А это — нет».

Если спросить, чего от тебя хотят:

> «Не сегодня».

EN:
A cup of something hot appears first. The money comes second.

> “Cold makes every decision look permanent.”

A purse is set beside the cup.

> “This one isn’t.”

If you ask what is expected:

> “Not tonight.”

RU accept label:
**Принять помощь**

RU resolution:
Тепло доходит до пальцев раньше, чем последствия — до мыслей.

> «Потрать, сколько нужно. Мы ещё поговорим».

EN accept label:
**Take the help**

EN resolution:
The warmth reaches your hands before the implications reach your thoughts.

> “Spend what you need. We will speak again.”

RU refuse label:
**Отказаться**

RU resolution:
Ты не тянешься ни к стакану, ни к кошелю.

> «Твой выбор».

EN refuse label:
**Refuse**

EN resolution:
You reach for neither the cup nor the purse.

> “Your choice.”

## Offer variant: no-pity

Presentation key:
`secret-debt/lender-offer/no-pity`

RU:
Незнакомец не предлагает сочувствия. Вместо этого задаёт один практический вопрос:

> «Сколько ещё ты можешь позволить себе решать каждую проблему по одному дню за раз?»

Появляется кошель.

> «Это покупает тебе пространство для выбора».

EN:
The stranger offers no sympathy. Instead, they ask one practical question:

> “How much longer can you afford to solve every problem one day at a time?”

A purse appears.

> “This buys you room to choose.”

RU accept label:
**Купить немного передышки**

RU:
Ты принимаешь деньги.

> «Используй пространство».

EN accept label:
**Buy some breathing room**

EN:
You accept the money.

> “Use the room.”

RU refuse label:
**Оставить долг равным нулю**

RU:
Ты отказываешься.

> «Тогда постарайся так и оставить».

EN refuse label:
**Keep your debt at zero**

EN:
You refuse.

> “Then try to keep it that way.”

This is flavor only; it is not a promise about every other cost/debt system.

## Offer variant: envelope

Presentation key:
`secret-debt/lender-offer/envelope`

RU:
Вместо кошеля тебе протягивают конверт без отметок. Бумага дорогая. Содержимое не показывают до решения.

> «Тебе не обязательно мне доверять. Нужно только решить, поможет ли это сейчас».

Если спросить, что будет потом:

> «Разговор».

EN:
Instead of a purse, you are offered an unmarked envelope. The paper is expensive. The contents are not shown before the choice.

> “You don’t have to trust me. You only have to decide whether this helps now.”

If you ask what comes later:

> “A conversation.”

RU accept label:
**Открыть конверт**

RU:
Ты ломаешь сгиб и забираешь содержимое.

> «Тогда мы друг друга поняли».

EN accept label:
**Open the envelope**

EN:
You break the fold and take what is inside.

> “Then we understand each other.”

RU refuse label:
**Вернуть не открывая**

RU:
Ты возвращаешь конверт.

> «Справедливо».

EN refuse label:
**Hand it back unopened**

EN:
You return the envelope.

> “Fair enough.”

---

# 2. Delayed activation

Exact delay and debt remain OPEN. These presentation keys are locale-neutral.

## Temporary relief

Presentation key:
`secret-debt/pending/relief`

### room-tonight

RU:
Немедленная помощь решает реальную проблему. На одну ночь не приходится пересчитывать одни и те же монеты дважды. Никто не приходит за ответом, никто ничего не требует.

> «Может, это и правда были просто деньги».

Это мысль героини, а не системная истина.

EN:
The immediate help solves a real problem. For one night you do not have to count the same coins twice. Nobody comes for an answer and nobody makes a demand.

> “Maybe it really was only money.”

This is the heroine’s thought, not system truth.

### ordinary-purchases

RU:
Небольшая покупка больше не выглядит угрозой завтрашнему ночлегу. Впервые за долгое время выбор кажется чуть шире — но только настолько, насколько это реально допускает текущее состояние игры.

EN:
A small purchase no longer looks like a threat to tomorrow’s lodging. For the first time in a while, the range of choices feels a little wider—but only as far as the actual game state allows.

### no-immediate-consequence

RU:
Проходит ещё один день без заметного требования.

> Ничего не произошло.
>
> К вечеру это почти успокаивает.

EN:
Another day passes with no visible demand.

> Nothing happened.
>
> By evening, that almost feels reassuring.

No number of days appears in either locale.

## Ambiguous reminder

Presentation key:
`secret-debt/pending/reminder`

### familiar-handwriting

RU:
Ты находишь сложенную записку. Требований нет. Только одна строка:

> «Я не забыл».

EN:
You find a folded note. There is no demand. Only one line:

> “I haven’t forgotten.”

### distant-observer

RU:
На другой стороне людной улицы мелькает человек, который может быть связан с кредитором. Он не подходит и не следует за тобой.

> Фигура отводит взгляд первой.

EN:
Across a crowded street you glimpse someone who may be connected to the lender. They do not approach and they do not follow.

> The figure looks away first.

### account-language

RU:
Приходит карточка с одной фразой:

> «Твой счёт всё ещё открыт».

EN:
A card arrives with a single phrase:

> “Your account remains open.”

This does not define a numeric ledger, interest, or deadline.

### wrong-moment

RU:
После совершенно обычного дня ты находишь знак или записку.

> День принадлежал тебе ровно до того момента, пока напоминание не заставило вспомнить, что кто-то ещё считает иначе.

EN:
After an otherwise ordinary day, you find a mark or note.

> The day was yours right up until the reminder made you remember that somebody else thinks otherwise.

### suspicious-silence

RU:
Сегодня ничего не приходит.

> Ты ловишь себя на мысли: почему никто ещё не пришёл?

EN:
Nothing arrives today.

> You catch yourself wondering: why has nobody come yet?

## Pre-activation

Presentation key:
`secret-debt/pending/pre-activation`

### soon

RU:
> «Скоро».

EN:
> “Soon.”

### be-available

RU:
> «Будь на месте, когда позовут».

EN:
> “Be available when called.”

### meeting-request

RU:
> «Нужно обсудить остальное».

EN:
> “We need to discuss the rest.”

None of these lines blocks jobs, School, Activity or Night by itself.

## Activation notice

Presentation key:
`secret-debt/activation/notice`

### amount-not-the-point

RU:
Кредитор или посредник возвращается.

> «Аванс больше не главная часть вопроса».

На вопрос, сколько ты должна:

> «Достаточно, чтобы перестать делать вид, будто это была случайная помощь».

EN:
The lender or intermediary returns.

> “The advance is no longer the part that matters.”

When you ask how much you owe:

> “Enough that we are done pretending this was casual.”

### work-instead-of-payment

RU:
> «Если у тебя есть деньги, можно закрыть это деньгами».
>
> «Если нет — есть работа».

EN:
> “If you have the money, this can be settled with money.”
>
> “If not, there is work.”

Whether immediate payoff is truly available remains mechanics-owned.

### professional-lock-reveal

RU:
> «Пока это не закрыто, работать ты будешь здесь».

EN:
> “Until this is settled, your work belongs here.”

Use only at the same authoritative boundary that actually applies the ordinary-career lock.

### quiet-account-change

RU:
> «Ты приняла помощь».
>
> «Теперь меняется сам счёт».

EN:
> “You accepted help.”
>
> “Now the account changes.”

### push-back

RU heroine:
> «Мы об этом не договаривались».

RU response:
> «Это была та часть, которую ты не попросила прочитать».

EN heroine:
> “That wasn’t the agreement.”

EN response:
> “It was the part you didn’t ask to read.”

This is flavor, not legal canon.

---

# 3. Hidden-career daytime work

All family IDs are locale-neutral. Compliance/resistance are presentation/flavor axes unless later mechanics explicitly own effects.

## sorting-carrying

RU:
Ящики прибывают быстрее, чем кто-либо успевает их подписывать. Инструкции простые: перенести отмеченное, сложить остальное, спросить только тогда, когда угадать уже невозможно. В этой работе нет ничего драматичного. В этом и есть часть давления.

RU compliance:
«Ты входишь в ритм и заканчиваешь штабель, не давая никому повода тебя остановить».

RU resistance:
«Ты делаешь ровно то, что попросили, и ничего из того, что лишь подразумевалось».

EN:
Crates arrive faster than anyone bothers to label them. The instructions are simple: move what is marked, stack the rest, ask only when guessing is impossible. Nothing about the work is dramatic. That is part of the pressure.

EN compliance:
“You settle into the rhythm and finish the stack without giving anyone a reason to stop you.”

EN resistance:
“You do exactly what was asked and nothing that was merely implied.”

## cleanup-after-closing

RU:
Когда посетители и хозяева уходят, помещение выглядит иначе. Остаются пролитое питьё, грязь, зола, обломки упаковки и всё то, чего никто не замечал, пока было людно.

RU compliance:
«Ты методично проходишь помещение угол за углом».

RU resistance:
«Ты убираешь то, что относится к работе, и оставляешь чужие личные поручения нетронутыми».

EN:
Once customers and owners are gone, the room looks different. Spilled drink, mud, ash, broken packing straw, and everything nobody noticed while it was busy remain.

EN compliance:
“You finish methodically, corner by corner.”

EN resistance:
“You clean what belongs to the job and leave personal errands untouched.”

## supervised-delivery

RU:
Запечатанный пакет нужно отнести через город. Маршрут был бы обычным, если бы никто не следил, что именно ты его проходишь.

RU compliance:
«Ты выбираешь кратчайший путь и приносишь подтверждение».

RU resistance:
«Ты запоминаешь каждый поворот и каждое лицо, которое следит за тобой».

EN:
A sealed package has to cross town. The route would be ordinary if nobody were making sure that you were the one carrying it.

EN compliance:
“You take the shortest route and bring back the receipt.”

EN resistance:
“You remember every turn and every face that watches you.”

## inventory-count

RU:
Полки, коробки, книги учёта. Твоя работа — считать чужое имущество и убеждаться, что цифры сходятся.

RU compliance:
«Ты переписываешь итоги точно».

RU resistance:
«Ты переписываешь итоги точно и запоминаешь строки, которые не имеют смысла».

EN:
Shelves, boxes, ledgers. Your job is to count what belongs to someone else and make sure the numbers match.

EN compliance:
“You copy the totals exactly.”

EN resistance:
“You copy the totals exactly and remember which entries make no sense.”

## service-under-observation

RU:
Задача сама по себе простая. Сложно то, что за каждым движением наблюдают. Любая пауза замечена, любой вопрос кажется слишком долгим.

RU compliance:
«Ты сохраняешь нейтральное лицо и заканчиваешь без ошибок».

RU resistance:
«Ты не даёшь им ничего, кроме той работы, которую они действительно поручили».

EN:
The task itself is simple. The difficult part is being watched through every movement. Every pause is noticed; every question seems too long.

EN compliance:
“You keep your expression neutral and finish cleanly.”

EN resistance:
“You give them nothing except the work they can prove they asked for.”

## maintenance

RU:
Что-то забилось, протекло, заклинило или сгнило. Работа достаётся тебе потому, что никто важный не хочет ею заниматься.

RU compliance:
«Ты устраняешь проблему и идёшь дальше».

RU resistance:
«Ты добиваешься, чтобы ремонт работал, но не позволяешь назвать это одолжением».

EN:
Something has clogged, leaked, jammed, or rotted. The job lands with you because nobody important wants it.

EN compliance:
“You solve the immediate problem and move on.”

EN resistance:
“You make sure the repair works, but refuse to let anyone call it a favor.”

## records-after-hours

RU:
Перед тобой кладут книгу учёта с инструкциями, будто обозначения тебе уже знакомы. Столбцам всё равно, насколько длинным был день.

RU compliance:
«Ты идёшь строка за строкой, пока страницы не сходятся».

RU resistance:
«Ты работаешь достаточно внимательно, чтобы заметить, что именно раскрывают цифры».

EN:
A ledger is placed in front of you with instructions that assume you already know the notation. The columns do not care how long the day has been.

EN compliance:
“You work line by line until the pages balance.”

EN resistance:
“You work carefully enough to notice what the numbers reveal.”

## controlled-errand

RU:
Кому-то другому понадобилось бы несколько минут. Для тебя поручение начинается с напоминания:

> «Сначала это».

Опасности нет. Содержание сцены — в отсутствии выбора.

RU compliance:
«Ты быстро заканчиваешь и возвращаешь себе остаток дня».

RU resistance:
«Ты делаешь это достаточно медленно, чтобы показать отношение, но не настолько, чтобы дать удобный повод».

EN:
It would take anyone else a few minutes. For you, the errand begins with a reminder:

> “This first.”

There is no danger. The content of the scene is the lack of choice.

EN compliance:
“You finish quickly and reclaim what remains of the day.”

EN resistance:
“You do it slowly enough to make the point, but not slowly enough to hand them an excuse.”

## heavy-shift

RU:
Сегодня работа тяжелее прежней. Никто не объявляет, что правила изменились. Перед тобой просто ставят больше.

RU compliance:
«Ты распределяешь силы и заканчиваешь».

RU resistance:
«Ты не позволяешь усталости выглядеть как благодарность».

EN:
Today’s work is heavier than before. Nobody announces that the rules have changed. They simply put more in front of you.

EN compliance:
“You pace yourself and finish.”

EN resistance:
“You refuse to make exhaustion look like gratitude.”

## trusted-access

RU:
Впервые тебя отправляют туда, где никто не стоит за спиной. Это не свобода. Это узкое, полезное доверие.

RU compliance:
«Ты возвращаешься точно тогда и так, как ожидали».

RU resistance:
«Ты возвращаешься точно так, как ожидали, но знаешь больше, чем до выхода».

EN:
For the first time you are sent somewhere without somebody standing over your shoulder. It is not freedom. It is trust of a narrow, useful kind.

EN compliance:
“You return exactly as expected.”

EN resistance:
“You return exactly as expected, carrying more knowledge than you left with.”

---

# 4. Forced Night scene bank

Forced Night remains mechanically separate from daytime work. Exact penalty/intercept is OPEN.

## late-summons

Presentation key:
`secret-debt/forced-night/late-summons`

RU:
День уже закончен. До того, как ночь становится твоей, приходит сообщение:

> «Вернись».

Ночная задача меньше дневной смены и всё равно ощущается сильнее — потому что появляется в то время, которое должно было принадлежать тебе.

EN:
The day is already over. Before the night becomes yours, a message arrives:

> “Come back.”

The night task is smaller than a daytime shift and still feels more intrusive because it arrives in time that should have been yours.

## inventory

Presentation key:
`secret-debt/forced-night/inventory`

RU:
В учёте обнаружилось расхождение, и кто-то решил проверить его немедленно. Полки пересчитываются при тусклом свете, когда остальное здание уже спит.

> «Это может подождать до утра».
>
> «Нет. Это можно сделать сегодня».

EN:
A discrepancy has appeared in the records, and somebody decides it must be checked immediately. Shelves are recounted under dim light while the rest of the building has already gone quiet.

> “It can wait until morning.”
>
> “No. It can be done tonight.”

## escort

Presentation key:
`secret-debt/forced-night/escort`

RU:
Кому-то важному нужно пройти через город поздно вечером. Тебе велят сопровождать, нести вещь или просто оставаться рядом. Ночной город знаком — и от этого только хуже: ты можешь идти куда угодно, кроме того места, которое выбрала бы сама.

EN:
Someone important needs to cross town late. You are told to accompany them, carry something, or simply stay close. The night city is familiar in the wrong way: you can walk almost anywhere except where you would have chosen yourself.

## cleanup

Presentation key:
`secret-debt/forced-night/cleanup`

RU:
Комната, куда днём тебя не пускали, становится твоей заботой после ухода всех важных людей. На столах остаются стаканы, зола, клочки бумаги и беспорядок, который легко не замечать, когда знаешь, что его уберёт кто-то другой.

EN:
A room you were not allowed into during the day becomes your responsibility after everyone important has left. Glasses, ash, scraps of paper, and the kind of mess that is easy to ignore when you know somebody else will clean it remain behind.

## watch

Presentation key:
`secret-debt/forced-night/watch`

RU:
Тебе велят не спать и следить за дверью, телегой, складом, гостем или пакетом. Может не произойти вообще ничего.

> «Если ничего не случилось, значит, ты сделала свою работу».

EN:
You are told to stay awake and watch a door, a cart, a storeroom, a guest, or a package. Nothing may happen at all.

> “If nothing happened, you did your job.”

## private-ledger

Presentation key:
`secret-debt/forced-night/private-ledger`

RU:
Дневная книга оказывается не единственной. Ночью тебе дают вторую и требуют переписать или сверить её.

Цифры не совпадают.

Никто не просит тебя понимать почему.

EN:
The daytime ledger is not the only ledger. At night you are handed a second one and told to copy or reconcile it.

The numbers do not match.

Nobody asks you to understand why.

## personal-errand

Presentation key:
`secret-debt/forced-night/personal-errand`

RU:
Рабочая обязанность превращается в чьё-то личное удобство: принести еду, забрать плащ, отнести письмо, подождать у дома.

> Поручение могло подождать.
>
> Именно поэтому важно, что ждать ему не позволили.

EN:
A work obligation turns into somebody’s personal convenience: fetch food, retrieve a coat, carry a letter, wait outside a residence.

> The task could have waited.
>
> That is exactly why it matters that it did not.

## correction

Presentation key:
`secret-debt/forced-night/correction`

RU:
Тебя вызывают после спора, опоздания, вопроса или слишком заметного сопротивления дневному приказу. Сцена держится на контроле и предупреждении, а не на обязательном физическом насилии.

> «Ты путаешь терпение с разрешением».

EN:
You are called in after an argument, a delay, a question, or resistance that became too visible during the day. The scene focuses on control and warning rather than mandatory physical violence.

> “You are confusing tolerance with permission.”

## trusted-task

Presentation key:
`secret-debt/forced-night/trusted-task`

RU:
Позднее содержание может изменить оттенок принуждения. Прийти всё ещё обязаны, но теперь задача требует именно твоей компетентности.

> «Мне нужно, чтобы это сделали правильно».

Впервые вторая часть фразы весит больше первой.

EN:
Later content may change the tone of the coercion. You are still required to attend, but now the task specifically depends on your competence.

> “I need this done correctly.”

For once, the second half of the sentence matters more than the first.

## ambiguous-kindness

Presentation key:
`secret-debt/forced-night/ambiguous-kindness`

RU:
Кто-то, связанный со скрытой работой, оставляет тебе еду, сухую одежду или другое небольшое удобство во время обязательной ночи. Жест действительно помогает. Он не отменяет того, что прийти сюда ты не выбирала.

EN:
Someone connected to the hidden career leaves food, dry clothes, or another small comfort during the forced Night. The gesture genuinely helps. It does not erase the fact that you did not choose to be here.

---

# Bilingual content rules

For every production conversion:
- gameplay event ID remains locale-neutral;
- presentation/media candidate identity remains locale-neutral;
- RU and EN use the same conditions/effects;
- save/reload stores gameplay state, not locale-specific event identity;
- 3–5 shared media candidates may serve one semantic event;
- every actual media candidate needs paired RU/EN alt and caption;
- media choice never changes mechanics.

## Prohibited inference

This bank does not choose:
- encounter probability;
- money values;
- delay;
- debt amount;
- exact bound-state activation timing;
- hidden-career action cost;
- wages/stat effects;
- forced-Night penalty;
- School/Forest availability while bound;
- outcome requirements;
- Meta rewards;
- canonical lender/employer NPC identity.

## Palace / ordinary-career firewall

Secret Debt:
- is not ordinary poverty;
- is not one of the 10 ordinary careers;
- blocks ordinary careers only while authoritative bound state is active;
- preserves their progress;
- grants zero ordinary Hard Work credit;
- never counts toward Palace 10/10.
