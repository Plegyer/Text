# Satyr Maid / Undead Farm Result Parity Review v2

Date: 2026-09-27
Status: TEXT-ONLY PARITY REVIEW
Baseline: current main `c0763f9f9fa9887593fe8567165bbedce2b6cd3a`

## Finding

Both careers already have career-specific embedded English seasonal scene prose, but current root localization has only action label/description keys. There are no RU+EN result-body keys for their seasonal result scenes.

For RU-source/EN parity, keep the current action IDs, scene IDs, conditions, media, cost, effects, wage and seasonal mechanics unchanged. Add the eight result-body localization entries below.

## Satyr Maid — `satyr-maid.shift`

### `action.satyr-maid.shift.result.spring.default.text`
Current embedded EN: Spring shift at the satyr bar: new travellers and the first busy tables of the season.  
Target RU: Весенняя смена в баре сатиров начинается с новых путников и первых по-настоящему занятых столов сезона. Приходится быстро запоминать лица, заказы и ритм зала.  
Target EN: The spring shift at the satyr bar brings new travelers and the first truly busy tables of the season. You have to learn faces, orders, and the room’s rhythm quickly.

### `action.satyr-maid.shift.result.summer.default.text`
Current embedded EN: Summer shift at the satyr bar: the room stays loud late into the evening and service never really slows down.  
Target RU: Летом зал остаётся шумным допоздна. Поток гостей почти не ослабевает, и хорошая смена зависит от темпа, памяти и умения не теряться в разговорах.  
Target EN: In summer the room stays loud late into the evening. The flow of guests barely slows, and a good shift depends on pace, memory, and staying composed in conversation.

### `action.satyr-maid.shift.result.autumn.default.text`
Current embedded EN: Autumn shift at the satyr bar: festival traffic and demanding guests turn routine service into crowd management.  
Target RU: Осенняя смена проходит на фоне праздничного движения. Обычная подача превращается в управление очередями, просьбами и постоянно меняющимися столами.  
Target EN: The autumn shift runs through festival traffic. Ordinary service turns into managing queues, requests, and tables that keep changing.

### `action.satyr-maid.shift.result.winter.default.text`
Current embedded EN: Winter shift at the satyr bar: fewer strangers, more regulars, and longer conversations around warm tables.  
Target RU: Зимой незнакомцев меньше, зато постоянные гости задерживаются дольше. Работа становится спокойнее по темпу, но требует больше внимания к привычкам и разговорам.  
Target EN: Winter brings fewer strangers, but regulars stay longer. The pace is calmer, while the work asks for more attention to habits and conversation.

## Undead Farm — `undead-farm.shift`

### `action.undead-farm.shift.result.spring.default.text`
Current embedded EN: Spring farm shift: wet ground, fresh growth, and the first unstable magical shoots need constant attention.  
Target RU: Весенняя смена проходит на мокрой земле среди свежих всходов и нестабильной магии. Приходится постоянно проверять грядки, инструменты и тех, кто работает рядом.  
Target EN: The spring shift runs across wet ground among fresh growth and unstable magic. You constantly check the beds, the tools, and the workers beside you.

### `action.undead-farm.shift.result.summer.default.text`
Current embedded EN: Summer farm shift: fast growth and heavy maintenance keep both living crops and undead workers busy.  
Target RU: Летом всё растёт слишком быстро, поэтому обслуживание не заканчивается ни на минуту. Живые культуры и нежить требуют разного внимания, но общий порядок должен держаться.  
Target EN: In summer everything grows too quickly, so maintenance never really stops. Living crops and undead workers need different attention, while the whole routine still has to hold together.

### `action.undead-farm.shift.result.autumn.default.text`
Current embedded EN: Autumn farm shift: harvest, sorting, and processing compete for every hour before storage closes.  
Target RU: Осенняя смена занята сбором, сортировкой и подготовкой запасов. Каждый час приходится решать, что убрать первым и что ещё может подождать.  
Target EN: The autumn shift is filled with harvesting, sorting, and preparing stores. Every hour means deciding what must be handled first and what can still wait.

### `action.undead-farm.shift.result.winter.default.text`
Current embedded EN: Winter farm shift: storage, repair, and careful work with the strangest preserved materials move indoors.  
Target RU: Зимой работа уходит в помещения: ремонт, хранение и осторожное обращение со странными сохранёнными материалами требуют терпения больше, чем скорости.  
Target EN: In winter the work moves indoors: repairs, storage, and careful handling of strange preserved materials demand patience more than speed.

## Exact replacement boundary

These are localization text replacements only. Existing embedded English remains a fallback until shared UI consumes the new result-body keys. No scene or mechanic definition needs to be duplicated per locale.
