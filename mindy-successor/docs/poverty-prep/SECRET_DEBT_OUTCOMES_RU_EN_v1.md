# Secret Debt Outcomes RU+EN v1

Status: BILINGUAL CONTENT_DRAFT for Chat 3 item 128.

Russian is the source authoring language. English is a full second locale.

Outcome family IDs are locale-neutral and fixed:
- `paid_freedom`;
- `bound_life`;
- `takeover`.

This file authors presentation/narrative only. Exact eligibility thresholds, debt values, progression requirements, external dependency IDs and Meta rewards remain OPEN.

## Shared outcome contract

All three families:
- belong to Secret Debt, not the 10 ordinary careers;
- grant zero ordinary Hard Work credit;
- do not count toward Palace 10/10;
- use the same mechanics in RU and EN;
- require one locale-neutral gameplay identity per scene/ending step;
- may own shared 3–5 media candidates with paired RU/EN alt/captions;
- must preserve generic ending flow: eligible -> explicit commit -> completion -> RunResult.

---

# 1. paid_freedom

Family meaning:
economic resolution of the dependency.

Required semantic meaning:
- dependency resolved through payment/economic settlement;
- Secret Debt professional lock released;
- distinct from `bound_life` and `takeover`;
- no ordinary Hard Work credit.

Exact payment/eligibility:
**OPEN**.

## Approach — count it twice

Presentation key:
`secret-debt/outcome/paid-freedom/approach`

RU:
Ты пересчитываешь деньги один раз. Потом ещё раз. Не потому, что сумма может измениться, а потому, что впервые общий итог означает не только «дожить до завтра».

> Хватит, чтобы завтра перестало быть долгом перед вчерашним днём.

EN:
You count the money once. Then again. Not because the amount might change, but because for the first time the total means more than “make it to tomorrow.”

> Enough to stop owing tomorrow to yesterday.

No numeric amount belongs in either locale.

## Approach — ask for the account

RU:
Ты просишь окончательный расчёт.

Кредитор:

> «Тебе нужна цифра?»

Ты:

> «Мне нужен конец».

EN:
You ask for the final accounting.

Creditor:

> “You want the number?”

You:

> “I want the end.”

Only authoritative configured state may supply an actual number later.

## Approach — arrive prepared

RU:
На встречу ты приходишь уже с тем, чем можно закрыть обязательство. Без просьб и без заранее придуманного торга.

> На этот раз первой что-то кладёшь на стол ты.

EN:
You arrive at the meeting already carrying what can settle the obligation. No pleading and no assumed negotiation.

> This time, you are the one who puts something on the table first.

## Settlement

Presentation key:
`secret-debt/outcome/paid-freedom/settlement`

RU:

Ты:
> «Мы закрываем счёт».

Другая сторона:
> «Полностью?»

Ты:
> «Полностью».

Транзакция должна фиксироваться механикой один раз. Текст не выбирает сумму.

EN:

You:
> “We’re settling it.”

Counterparty:
> “All of it?”

You:
> “All of it.”

The transaction must be committed once by mechanics. The text does not choose the amount.

### Closure beat

RU:
Квитанция, зачёркнутая строка, возвращённый знак, порванная записка или устное подтверждение могут показать завершение. Конкретная форма остаётся CONTENT_DRAFT.

EN:
A receipt, crossed ledger line, returned token, torn note, or spoken confirmation may represent closure. The exact form remains CONTENT_DRAFT.

Required meaning in both locales:
the dependency is genuinely resolved and payment cannot be charged twice.

## Aftermath

Presentation key:
`secret-debt/outcome/paid-freedom/aftermath`

### Silence

RU:
Самое важное изменение — никто не зовёт тебя обратно.

> Улица снаружи выглядит точно так же.
>
> Никто не мешает тебе самой выбрать, куда идти дальше.

EN:
The most important change is that nobody calls you back.

> The street outside looks exactly the same.
>
> Nobody stops you from choosing where to go next.

### Ordinary work returns

RU:
Знакомые места работы снова выглядят просто местами работы. Сцена не записывает героиню ни в одну профессию автоматически: она лишь показывает, что debt-specific lock больше не действует.

EN:
Familiar workplaces look like workplaces again. The scene does not enroll the heroine in any career automatically; it only shows that the debt-specific lock is gone.

### Night without listening

RU:
Ночью ты замечаешь отсутствие привычного ожидания — никто не присылает обязательный вызов.

EN:
At Night you notice the absence of the old expectation—no mandatory summons arrives.

Text alone does not alter NightFlow.

## Relationship hooks

Lender/creditor:

RU neutral:
> «Тогда мы закончили».

EN neutral:
> “Then we’re finished.”

RU respect:
> «Не все возвращаются с полным ответом».

EN respect:
> “Not everyone comes back with the whole answer.”

Hidden-career coworker:

RU:
> «Ты правда выбралась».

EN:
> “You really got out.”

Ordinary-career contact:

RU:
> «Давно тебя не было видно».

EN:
> “Haven’t seen you in a while.”

Preserved ordinary-career progress must remain preserved.

## Explicit commit

Draft label pair:

RU:
**Закрыть счёт и уйти свободной**

EN:
**Close the account and walk away free**

Eligibility must already be authoritative before this option appears.

## RunResult copy

Presentation key:
`secret-debt/outcome/paid-freedom/run-result`

RU short:
«Ты выплатила долг и закончила зависимость».

EN short:
“You paid the debt and ended the dependency.”

RU reflective:
«Свобода обошлась дороже, чем когда-то казалась первая помощь, но на этот раз счёт закрывается на твоих условиях».

EN reflective:
“Freedom cost more than the first help ever seemed worth, but this time the account closes on your terms.”

RU minimal:
«Долг закрыт. Зависимость окончена».

EN minimal:
“Debt settled. Dependency ended.”

Exact eligibility and Meta reward remain OPEN.

---

# 2. bound_life

Family meaning:
hidden-career endurance/fate outcome chosen as a terminal life.

Required semantic meaning:
- substantial hidden-career progression precedes eligibility;
- conscious explicit commitment;
- not a generic failure screen;
- ordinary careers remain blocked while the active run is still bound before completion;
- zero ordinary Hard Work credit.

Exact progression threshold:
**OPEN**.

## Approach — the work has become familiar

Presentation key:
`secret-debt/outcome/bound-life/approach`

RU:
Ты заканчиваешь задачу, не спрашивая, где что лежит. Никто не объясняет порядок и не проверяет результат. То, что когда-то казалось временным, обзавелось привычками, короткими путями и ожиданиями.

> Я знаю, как работает это место, потому что слишком долго училась в нём жить.

EN:
You finish a task without asking where anything is kept. Nobody explains the routine and nobody checks the result. What once felt temporary has accumulated habits, shortcuts, and expectations.

> I know how this place works because I have spent too long learning how to live inside it.

The line signals depth narratively, not a numeric threshold.

## Approach — someone asks her

RU:
Новый работник спрашивает тебя, куда отнести вещь, кого лучше не злить, что означает знак или как пережить тяжёлую смену. Ты уже не в начале этой работы.

EN:
A newer worker asks you where something belongs, who to avoid, what a signal means, or how to survive a difficult shift. You are no longer at the beginning of this work.

No mentor identity becomes canonical.

## Approach — offered permanence

RU:
Руководящая фигура говорит:

> «Ты могла бы перестать относиться к этому как к месту, из которого собираешься уйти».

EN:
A supervisor-like figure says:

> “You could stop treating this like somewhere you are leaving.”

This offer is only valid when ending eligibility is actually authoritative.

## Commitment

Presentation key:
`secret-debt/outcome/bound-life/commitment`

The outcome must read as an explicit decision, not an automatic loss.

### Dialogue A

RU:

Ты:
> «Я устала делать вид, что уйду на следующей неделе».

Ответ:
> «Тогда веди себя так, будто тебе здесь место».

EN:

You:
> “I’m done pretending I’m leaving next week.”

Response:
> “Then act like you belong here.”

### Dialogue B

RU:
> «Я знаю работу. Я знаю правила. Я знаю цену».
>
> «И?»
>
> «Я остаюсь».

EN:
> “I know the work. I know the rules. I know the cost.”
>
> “And?”
>
> “I’m staying.”

### Quiet commitment

RU:
Без речи. Ты просто убираешь план ухода, записку, ключ, накопления или другой символ будущего выхода. Конкретный предмет остаётся CONTENT_DRAFT.

EN:
No speech. You simply put away a plan, note, key, savings envelope, or another symbol of a future exit. The exact prop remains CONTENT_DRAFT.

Draft commit labels:

| RU source | EN |
| --- | --- |
| Остаться | Stay |
| Сделать эту жизнь своей | Make this the life you know |
| Перестать планировать выход | Stop planning an exit |
| Принять место, которое ты здесь заняла | Accept the place you have made here |

Production should choose one explicit action; localization does not decide mechanics.

## Not a failure ending

Forbidden framing in either locale:
- “you lost”;
- “you failed to escape”;
- “game over because debt”.

Required tone:
competence + accumulated history + conscious commitment inside constraint.

## Aftermath

Presentation key:
`secret-debt/outcome/bound-life/aftermath`

### Morning routine

RU:
Следующее утро начинается уже не как ещё один временный день.

> Тебе не нужно объяснять, с чего начинать.

EN:
The next morning no longer begins as another temporary day.

> Nobody needs to tell you where to begin.

### Responsibility

RU:
Тебе могут доверить узкую ответственность, доступ или расписание. Это остаётся narrative status, пока отдельная механика не выдаёт факт/capability.

EN:
You may be given narrow responsibility, access, or scheduling authority. This remains narrative status until explicit mechanics grant a fact or capability.

### Social recognition

RU:
> «Значит, ты правда остаёшься».
>
> «Похоже на то».

EN:
> “So you’re really staying.”
>
> “Looks like it.”

## RunResult copy

Presentation key:
`secret-debt/outcome/bound-life/run-result`

RU short:
«Ты перестала считать скрытую работу временной и построила жизнь внутри неё».

EN short:
“You stopped treating the hidden career as temporary and made a life inside it.”

RU reflective:
«То, что началось с долга, стало привычкой, умением, историей — и наконец выбором остаться».

EN reflective:
“What began as a debt became routine, competence, history, and finally a choice to remain.”

RU minimal:
«Связанная жизнь принята».

EN minimal:
“Bound life accepted.”

“Accepted” refers to the ending commitment, not approval of every prior condition.

Exact eligibility and Meta reward remain OPEN.

---

# 3. takeover

Family meaning:
multi-system power resolution.

Required semantic meaning:
- hidden-career knowledge/progression;
- at least one authoritative external dependency/source of leverage;
- more than shifts alone;
- old controlling relationship ended or inverted;
- meaningful control transferred to the heroine;
- zero ordinary Hard Work credit.

Exact build, external dependency and threshold:
**OPEN**.

## Progression context

Presentation keys use the `secret-debt/outcome/takeover/*` family.

Useful prior narrative material may include:
records, inventory, trusted deliveries, private ledgers, hidden routes, keys/access, relationships, School/Activity/item/world facts selected later.

No one source is mandatory until Product decides it.

## Approach — the system is visible

Presentation key:
`secret-debt/outcome/takeover/preparation`

RU:
В начале скрытой работы всё это казалось стеной. Теперь ты видишь, кто действительно отдаёт приказы, кто лишь повторяет их, где движутся деньги, какие привычки зависят от одного человека и какие двери заперты только потому, что все привыкли считать их закрытыми.

> Ловушка перестала выглядеть ловушкой, когда стали видны все её петли.

EN:
At the beginning of the hidden career, the whole institution felt like a wall. Now you can see who actually gives orders, who only repeats them, where money moves, which routines depend on one person, and which doors are locked only because everybody assumes they will stay locked.

> The trap stopped looking like a trap when all its hinges became visible.

## Approach — leverage exists

RU:
У тебя есть одна важная вещь, которая находится вне их контроля. Что именно — пока OPEN: предмет, союзник, результат School, Activity, world fact или другой типизированный публичный результат.

> Впервые важная часть решения принадлежит не им.

EN:
You have one important piece of leverage that exists outside their control. What it is remains OPEN: an item, ally, School result, Activity result, world fact, or another typed/public result.

> For the first time, an important part of the solution does not belong to them.

## Commitment labels

| RU source | EN |
| --- | --- |
| Взять управление | Take control |
| Развернуть счёт против них | Turn the account around |
| Использовать всё, что ты узнала | Use what you know |
| Закончить это на своих условиях | End this on your terms |

These labels do not define eligibility.

## Preparation — verify the weakness

RU:
Перед действием ты проверяешь, что рычаг настоящий: сверяешь записи, подтверждаешь союзника, получаешь нужный предмет или убеждаешься, что публичный факт уже существует в авторитетном состоянии.

EN:
Before acting, you verify that the leverage is real: compare records, confirm an ally, retrieve an item, or make sure the public fact already exists in authoritative state.

## Preparation — choose who knows

RU:
Ты решаешь, кто будет знать о плане: никто, один доверенный коллега, внешний союзник или публичный контакт. Каноническая личность остаётся OPEN.

EN:
You decide who will know about the plan: nobody, one trusted coworker, an outside ally, or a public contact. The canonical identity remains OPEN.

## Confrontation

Presentation key:
`secret-debt/outcome/takeover/confrontation`

RU:

> «Мы больше не обсуждаем, что я вам должна».
>
> «Тогда что мы обсуждаем?»
>
> «Что произойдёт, когда все узнают, как на самом деле работает это место».

EN:

> “We’re not discussing what I owe anymore.”
>
> “Then what are we discussing?”
>
> “What happens when everyone learns how this place actually works.”

Adapt to the selected leverage type; never make the text claim a fact the state does not contain.

### Practical inversion

RU:
> «Вам нужны маршруты, записи и люди, которые умеют поддерживать работу».
>
> «Все три теперь зависят от меня».

EN:
> “You need the routes, the records, and the people who know how to keep this running.”
>
> “All three depend on me now.”

Use only if authoritative production state supports the claim.

### Quiet takeover

RU:
Драматический разговор необязателен. Контролирующая фигура может понять всё слишком поздно: доступ уже перешёл, записи больше не подчиняются одному хозяину, люди выполняют другой план, а внешний рычаг уже сработал.

> Когда они понимают, что решение принято, оно уже давно стало фактом.

EN:
A dramatic confrontation is optional. The controlling figure may understand too late: access has shifted, records no longer answer to one owner, people are following another plan, and the external leverage has already been triggered.

> By the time they realize the decision has been made, the decision is old news.

## Control transfer

Presentation key:
`secret-debt/outcome/takeover/control-transfer`

RU:
Символический объект может перейти из рук в руки: ключи, книга учёта, печать, кабинет, расписание или знак полномочий. Конкретный предмет остаётся OPEN.

EN:
A symbolic object may change hands: keys, ledger, seal, office, schedule, or a token of authority. The exact object remains OPEN.

Required meaning:
the old controller cannot reassert the same debt-specific professional lock.

## Aftermath

Presentation key:
`secret-debt/outcome/takeover/aftermath`

### Work continues differently

RU:
Здание и работа могут остаться теми же. Меняется направление приказов: теперь героиня выбирает приоритеты, а прежний контролёр больше не управляет её профессиональной свободой тем же способом.

EN:
The building and work may remain the same. What changes is the direction of orders: the heroine chooses priorities, and the former controller can no longer command her professional freedom in the same way.

### Outside recognition

RU:
> «Так с кем мне теперь иметь дело?»
>
> «Со мной».

EN:
> “So who am I dealing with now?”
>
> “Me.”

Use only if external/public state supports recognition.

### Coworker challenge

RU:
> «Скажи, что мы не просто поменяли одного хозяина на другого».

EN:
> “Tell me we didn’t just trade one owner for another.”

This opens character conflict without creating a morality score.

## Explicit commit

RU label:
**Взять управление**

EN label:
**Take control**

RU confirmation:
> Это не выводит тебя наружу.
>
> Это заставляет место отвечать тебе.

EN confirmation:
> This does not get you out.
>
> It makes the place answer to you.

## RunResult copy

Presentation key:
`secret-debt/outcome/takeover/run-result`

RU short:
«Ты использовала знания скрытой работы, соединила их с внешним рычагом и взяла управление».

EN short:
“You used what the hidden career taught you, combined it with outside leverage, and took control.”

RU reflective:
«Долг должен был превратить твои решения в чужую собственность. Ты выучила систему достаточно хорошо, чтобы развернуть направление контроля».

EN reflective:
“The debt was meant to turn your choices into someone else’s property. You learned the system well enough to reverse the direction of control.”

RU minimal:
«Управление перешло».

EN minimal:
“Control transferred.”

Exact eligibility, external dependency and Meta reward remain OPEN.

---

# Cross-locale mechanics firewall

Localization must never:
- add or remove ending eligibility;
- turn `bound_life` into automatic failure;
- allow shifts alone to satisfy `takeover`;
- invent the `takeover` external dependency;
- choose a payment amount for `paid_freedom`;
- choose Meta reward IDs/effects;
- create locale-specific ending IDs;
- alter ordinary-career preserved progress;
- add Palace credit.

## Multi-GIF rule

Each semantic scene family above may own 3–5 shared media candidates.

Every media candidate must have:
- locale-neutral media ID;
- RU alt;
- EN alt;
- RU caption if used;
- EN caption if used.

Media selection never changes ending mechanics, commitment, save-state, timing or reward.
