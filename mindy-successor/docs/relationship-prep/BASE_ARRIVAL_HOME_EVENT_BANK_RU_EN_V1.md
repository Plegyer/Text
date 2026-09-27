# Base Arrival/Home Legacy Event Bank RU+EN v1

Date: 2026-09-27
Status: PRESENTATION_ONLY
Scope: current reachable non-School `base.*` arrival/home/town-introduction events.

All RU text below preserves the current embedded source semantics. EN is a full presentation translation. Event IDs, variants, choices, conditions, flags and effects remain unchanged.

## `base.arrival`

### Title
RU: Помощница, а не чайник  
EN: An assistant, not a kettle

### Variant `welcome`
RU: Орвин сверяет накладную. «Значит, вы умеете думать самостоятельно? За эту функцию гильдия обычно доплачивает». Он освобождает вам место у окна.  
EN: Orwin checks the delivery note. “So you can think for yourself? The guild usually charges extra for that feature.” He clears a place for you by the window.

### Choice `introduce`
RU label: Представиться  
EN label: Introduce yourself

RU text: Вы договорились начать с простого. Орвин убрал инструкцию для големов.  
EN text: You agree to start with something simple. Orwin puts away the instructions meant for golems.

## `base.bran`

### Title
RU: Доставка с уточнением  
EN: A delivery with a clarification

### Variant `delivery`
RU: Курьер Бран, 27 лет, приносит посылку и спрашивает, где расписаться. Вы показываете на бланк. «Да, конечно. Я просто проверял, не изменились ли правила».  
EN: Bran, a twenty-seven-year-old courier, brings a parcel and asks where to sign. You point to the form. “Right, of course. I was just checking whether the rules had changed.”

### Choice `friendly`
RU label: Поблагодарить  
EN label: Thank him

RU text: Теперь Бран узнаёт вас на площади. Чайная открыта для разговоров.  
EN text: Bran now recognizes you in the square. The tea shop is open for conversation.

## `base.invite`

### Title
RU: Совершенно случайный чай  
EN: Entirely accidental tea

### Variant `tea`
RU: Бран разворачивает план площади с тремя отмеченными чайными. «Я совершенно случайно подумал, что вам здесь понравится».  
EN: Bran unfolds a map of the square with three tea shops marked on it. “I happened, entirely by accident, to think you might like it here.”

### Choice `yes`
RU label: Предложить свидание  
EN label: Suggest a date

RU text: Бран складывает план. Кажется, теперь он действительно может расслабиться.  
EN text: Bran folds the map away. It looks as though he can finally relax.

### Choice `no`
RU label: Остаться друзьями  
EN label: Stay friends

RU text: Бран принимает ваш ответ и переключается на рассказ о посылке, которая сама сбежала.  
EN text: Bran accepts your answer and switches to a story about a parcel that ran away on its own.

## `base.shelter`

### Title
RU: Место у печки  
EN: A place by the stove

### Variant `bunks`
RU: В приюте спорят, чья очередь рассказывать истории. Вы предлагаете историю о мире, где чайники обычно молчат.  
EN: At the shelter, people are arguing over whose turn it is to tell a story. You offer one about a world where kettles usually stay quiet.

### Choice `tell`
RU label: Рассказать историю  
EN label: Tell a story

RU text: Вам уступили место поближе к печке. Здесь тоже можно начинать заново.  
EN text: Someone gives you a place closer to the stove. You can make a new start here too.

## Integration boundary

Text only. No event identity, trigger, condition, flag, metric, choice effect, cooldown, priority, maxShows, RNG or Save behavior changes.
