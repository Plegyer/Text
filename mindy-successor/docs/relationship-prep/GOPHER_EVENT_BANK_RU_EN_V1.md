# Gopher Event Bank RU+EN v1

Date: 2026-09-27
Status: PRESENTATION_ONLY
Scope: all current root-loaded `gopher.*` events.

All RU copy preserves the current shipped source semantics. EN is a full presentation translation. No route, trigger, condition, effect, reward, flag or progression identity changes.

## `gopher.arrival`

### Title
RU: Белый суслик и открытый люк  
EN: The white gopher and the open hatch

### Variant `default`
RU: В обычном городе вы замечаете белого суслика с золотой пуговицей в зубах. Он оглядывается так возмущённо, словно опаздываете именно вы. Погоня заканчивается открытым люком — и падением в телегу с сеном под незнакомым небом. Вокруг эльфы, орки и сатиры. Женщин среди них нет: по словам возницы, их не видели уже много поколений. Молодой на вид эльф представляется принцем Элианом и слишком быстро предлагает защиту. Старик-сатир Силан предлагает комнату. «Комната есть. Плата — монетами или помощью по хозяйству». Вам 25 лет, и это определённо не лучший способ сменить адрес.  
EN: In an ordinary city, you spot a white gopher with a gold button in its teeth. It looks back in such outrage that you would think you were the one running late. The chase ends at an open hatch—and with you falling into a hay cart beneath an unfamiliar sky. Elves, orcs, and satyrs surround you. There are no women among them; according to the driver, none have been seen for many generations. A young-looking elf introduces himself as Prince Elian and offers protection a little too quickly. An elderly satyr named Silan offers you a room. “There’s a room. Payment is in coins or help around the house.” You are twenty-five, and this is definitely not the best way to change your address.

### Choice `home`
RU label: Сначала найти дорогу домой  
EN label: First, find a way home

RU text: Вы решаете искать путь назад, но другие цели остаются открыты.  
EN text: You decide to look for a way back, while leaving other goals open.

### Choice `status`
RU label: Для начала устроиться получше  
EN label: First, get established

RU text: Внимание можно превратить в связи, доход и самостоятельность.  
EN text: Attention can be turned into connections, income, and independence.

### Choice `mystery`
RU label: Узнать, что случилось с этим миром  
EN label: Find out what happened to this world

RU text: Вы запоминаете странную паузу принца при вопросе о женщинах.  
EN text: You remember the prince’s strange pause when asked about women.

## `gopher.tavern-intro`

### Title
RU: Кружки прежде легенд  
EN: Mugs before legends

### Variant `default`
RU: Трактирщик Марек, широкоплечий орк тридцати четырёх лет, выдаёт вам фартук. «Гости уже спорят, кто спасёт вас от дракона. Пока пусть спасут мебель от локтей». Вы договариваетесь: комплименты принимаются, хватать персонал нельзя. Первая смена начинается с трёх заказов и одной дуэли за право вымыть пол.  
EN: Marek, a broad-shouldered thirty-four-year-old orc innkeeper, hands you an apron. “The guests are already arguing over who gets to save you from a dragon. For now, they can save the furniture from their elbows.” You set the rules: compliments are fine; grabbing the staff is not. Your first shift begins with three orders and one duel over the right to mop the floor.

### Choice `agree`
RU label: Договориться о правилах  
EN label: Agree on the rules

RU text: Марек поддержал ваши условия. Здесь можно работать спокойно.  
EN text: Marek backs your terms. You can work here in peace.

## `gopher.tavern-quest`

### Title
RU: Пропавшая накладная  
EN: The missing delivery note

### Variant `default`
RU: После пятой смены Марек доверяет вам неприятность: дворец требует право распоряжаться городским праздником. Обещанную независимость подтверждает накладная, затерявшаяся на лесном складе. «Если принц ещё раз назовёт это добровольным подарком, я добровольно подарю ему счёт». Найти документ поможет чутьё не ниже 3. Её развивают охотники или сбор трав.  
EN: After your fifth shift, Marek trusts you with a problem: the palace claims the right to control the town festival. A delivery note lost at the forest storehouse proves the promised independence. “If the prince calls this a voluntary gift one more time, I’ll voluntarily give him the bill.” Finding the document requires Instinct 3 or higher. Hunter work or herb gathering can improve it.

### Choice `help`
RU label: Поискать документ  
EN label: Look for the document

RU text: Поручение открыто: проверить лесной склад.  
EN text: The errand is open: check the forest storehouse.

### Choice `later`
RU label: Вернуться к разговору позже  
EN label: Come back to this later

RU text: Марек оставляет папку на полке. Решение можно отложить.  
EN text: Marek leaves the folder on the shelf. The decision can wait.

## `gopher.receipt`

### Title
RU: Бумага против короны  
EN: Paper against the crown

### Variant `default`
RU: На складе лесорубов вы находите накладную внутри пособия «Как отличить бревно от начальника». Печать подтверждает: праздник принадлежит горожанам. На обороте — распоряжение дворца изъять все копии. Пока это улика о местной политике, а не ответ на тайну мира.  
EN: At the lumber storehouse, you find the delivery note inside a guide called “How to Tell a Log from Your Supervisor.” The seal confirms that the festival belongs to the townspeople. On the back is a palace order to confiscate every copy. For now, this is evidence about local politics, not an answer to the mystery of the world.

### Choice `take`
RU label: Вернуться с находкой  
EN label: Return with the find

RU text: Теперь можно обсудить накладную с Мареком.  
EN text: You can now discuss the delivery note with Marek.

## `gopher.tavern-resolution`

### Title
RU: Кому принадлежит праздник  
EN: Who owns the festival

### Variant `default`
RU: Марек предлагает огласить документ на площади. Посланник принца предлагает вам личное приглашение во дворец за оригинал. Оба уверены, что действуют исключительно ради вашего блага. Суслик за окном крадёт печенье с куда более честным выражением морды.  
EN: Marek suggests reading the document aloud in the square. The prince’s messenger offers you a personal invitation to the palace in exchange for the original. Both insist they are acting entirely for your benefit. Outside the window, the gopher steals a biscuit with a far more honest expression.

### Choice `guild`
RU label: Оставить документ горожанам  
EN label: Leave the document with the townspeople

RU text: Город сохраняет праздник. Открыта судьба «Праздник без разрешения».  
EN text: The town keeps the festival. The fate “Festival Without Permission” is unlocked.

### Choice `prince`
RU label: Принять предложение дворца  
EN label: Accept the palace offer

RU text: Принц благодарит вас. Открыта судьба «Приглашение под печатью».  
EN text: The prince thanks you. The fate “Invitation Under Seal” is unlocked.

### Choice `wait`
RU label: Пока сохранить документ у себя  
EN label: Keep the document for now

RU text: Документ остаётся у вас. К решению можно вернуться.  
EN text: The document stays with you. You can return to the decision later.

## `gopher.tavern-routine`

### Title
RU: Обычная смена, необычные гости  
EN: An ordinary shift, unusual guests

### Variant `spring`
RU: Гости заказывают настой первоцвета. Марек просит уточнять, нужен напиток или свидание с цветочным духом.  
EN: Guests order primrose infusion. Marek asks you to clarify whether they want a drink or a date with a flower spirit.

### Variant `summer`
RU: Жара превращает спор о холодном квасе в городской совет. Вы добиваетесь перемирия одним дополнительным кувшином.  
EN: The heat turns an argument over cold kvass into a town council. You secure a truce with one extra pitcher.

### Variant `autumn`
RU: Посетители благодарят вас корзинами грибов. Марек сначала проверяет, не баллотируется ли какой-нибудь гриб в мэры.  
EN: Patrons thank you with baskets of mushrooms. Marek first checks whether any of the mushrooms are running for mayor.

### Variant `winter`
RU: У камина тесно. Один эльф предлагает вам свой плащ, второй — родовой замок. Вы пока выбираете горячий чай.  
EN: It is crowded by the fireplace. One elf offers you his cloak, another his ancestral castle. For now, you choose hot tea.

### Variant `default`
RU: Вы проводите смену без происшествий. Марек записывает это как подозрительное происшествие.  
EN: You get through the shift without incident. Marek records that as a suspicious incident.

### Choice `finish`
RU label: Закончить смену  
EN label: Finish the shift

RU text: Смена записана в ваш стаж.  
EN text: The shift is added to your work record.

## `gopher.woods-intro`

### Title
RU: Дерево возражает  
EN: The tree objects

### Variant `default`
RU: Бригадир Бронн, гном шестидесяти лет, вручает вам рабочие перчатки. «Если дерево заговорит, сначала слушаем. В прошлый раз срубили казначея». Ваше появление вызывает столько внимания, что Бронн назначает перерыв на любопытство и обещает вычесть его из собственной зарплаты.  
EN: Bron, a sixty-year-old dwarf foreman, hands you work gloves. “If a tree starts talking, we listen first. Last time, they cut down the treasurer.” Your arrival attracts so much attention that Bron calls a curiosity break and promises to deduct it from his own pay.

### Choice `learn`
RU label: Изучить правила артели  
EN label: Learn the crew rules

RU text: Теперь вы знакомы с Бронном.  
EN text: You now know Bron.

## `gopher.hunt-intro`

### Title
RU: Лицензия на здравый смысл  
EN: A license for common sense

### Variant `default`
RU: Следопыт Рен, эльф, проверяет ваши сапоги. «Редкость — не профессия. Следы читать всё равно придётся». Он показывает безопасную тропу и учит отличать волчий след от отпечатка сапога особенно драматичного оборотня.  
EN: Ren, an elven tracker, checks your boots. “Being unusual is not a profession. You still have to learn to read tracks.” He shows you a safe trail and teaches you to tell a wolf print from the boot mark of an especially dramatic werewolf.

### Choice `learn`
RU label: Пройти инструктаж  
EN label: Take the briefing

RU text: Вы познакомились с Реном. Сегодня вы проверяете тропы без самостоятельного боя.  
EN text: You meet Ren. Today you check the trails without fighting on your own.

## `gopher.landlord`

### Title
RU: Комната с видом на чужие планы  
EN: A room with a view of other people’s plans

### Variant `default`
RU: Силан, сатир ста двенадцати лет, приносит чай и два экземпляра договора. «Этот для тебя. Этот для меня. Третий украл суслик, так что нотариус уже в курсе». Он объясняет, где учатся, кто нанимает работников и почему дворцовые подарки стоит читать с оборота.  
EN: Silan, a one-hundred-and-twelve-year-old satyr, brings tea and two copies of the agreement. “This one is yours. This one is mine. The gopher stole the third, so the notary already knows.” He explains where people study, who is hiring, and why palace gifts are worth reading on the reverse side.

### Choice `tea`
RU label: Поблагодарить за помощь  
EN label: Thank him for the help

RU text: Силан обещает предупреждать о платежах. Плату за комнату можно внести перед сном.  
EN text: Silan promises to warn you about payments. The room fee can be paid before sleep.

## Integration boundary

- exact current `gopher.*` event/variant/choice identities only;
- no new gopher route;
- no trigger, effect, reward, flag, counter, cooldown, RNG or Save changes;
- `gopher.receipt` remains the current tutorial/local-politics event and does not redefine Forest route/result ownership;
- `gopher.hunt-intro` remains the current tutorial text and does not introduce Forest Hunter route semantics.
