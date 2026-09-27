# Legacy Choice-Outcome RU Copy Normalization v1

Date: 2026-09-27
Status: PRESENTATION_ONLY
Baseline main: `d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`

Purpose: normalize the 26 current legacy choice-outcome strings for concise post-choice / journal presentation while preserving exact current event and choice semantics.

## Normalized RU source

| Event ID | Choice ID | Current embedded RU | Normalized RU | Decision |
|---|---|---|---|---|
| `base.arrival` | `introduce` | Вы договорились начать с простого. Орвин убрал инструкцию для големов. | Вы договорились начать с простого. Орвин убрал инструкцию для големов. | KEEP |
| `base.order` | `accept` | Заказ записан. Сварите две микстуры и сдайте их отдельным действием. | Заказ записан. Сварите две микстуры и сдайте их отдельным действием. | KEEP |
| `base.bran` | `friendly` | Теперь Бран узнаёт вас на площади. Чайная открыта для разговоров. | Теперь Бран узнаёт вас на площади. Чайная открыта для разговоров. | KEEP |
| `base.invite` | `yes` | Бран складывает план. Кажется, теперь он действительно может расслабиться. | Бран складывает план. Кажется, теперь он действительно может расслабиться. | KEEP |
| `base.invite` | `no` | Бран принимает ваш ответ и переключается на рассказ о посылке, которая сама сбежала. | Бран принимает ваш ответ и переключается на рассказ о посылке, которая сама сбежала. | KEEP |
| `base.workday` | `steady` | Лавка закрылась вовремя. Это тоже достижение. | Лавка закрылась вовремя. Это тоже достижение. | KEEP |
| `base.winter` | `help` | Метла согласилась на другую сторону улицы. Сосед обещал рассказать о вас хорошее. | Метла согласилась работать на другой стороне улицы. Сосед обещал замолвить за вас слово. | REFINED |
| `base.winter` | `pass` | Вы оставили переговоры специалистам. | Вы оставили переговоры специалистам. | KEEP |
| `base.shelter` | `tell` | Вам уступили место поближе к печке. Здесь тоже можно начинать заново. | Вам уступили место поближе к печке. Здесь тоже можно начинать заново. | KEEP |
| `gopher.arrival` | `home` | Вы решаете искать путь назад, но другие цели остаются открыты. | Вы решаете искать путь назад. Остальные цели остаются открыты. | REFINED |
| `gopher.arrival` | `status` | Внимание можно превратить в связи, доход и самостоятельность. | Внимание можно превратить в связи, доход и самостоятельность. | KEEP |
| `gopher.arrival` | `mystery` | Вы запоминаете странную паузу принца при вопросе о женщинах. | Вы запоминаете странную паузу принца на вопросе о женщинах. | REFINED |
| `gopher.tavern-intro` | `agree` | Марек поддержал ваши условия. Здесь можно работать спокойно. | Марек поддержал ваши условия. Здесь можно работать спокойно. | KEEP |
| `gopher.tavern-quest` | `help` | Поручение открыто: проверить лесной склад. | Поручение открыто: проверить лесной склад. | KEEP |
| `gopher.tavern-quest` | `later` | Марек оставляет папку на полке. Решение можно отложить. | Марек оставляет папку на полке. К разговору можно вернуться позже. | REFINED |
| `gopher.receipt` | `take` | Теперь можно обсудить накладную с Мареком. | Накладная у вас. Теперь её можно обсудить с Мареком. | REFINED |
| `gopher.tavern-resolution` | `guild` | Город сохраняет праздник. Открыта судьба «Праздник без разрешения». | Горожане сохраняют праздник. Открыта судьба «Праздник без разрешения». | REFINED |
| `gopher.tavern-resolution` | `prince` | Принц благодарит вас. Открыта судьба «Приглашение под печатью». | Принц благодарит вас. Открыта судьба «Приглашение под печатью». | KEEP |
| `gopher.tavern-resolution` | `wait` | Документ остаётся у вас. К решению можно вернуться. | Документ остаётся у вас. К решению можно вернуться позже. | REFINED |
| `gopher.tavern-routine` | `finish` | Смена записана в ваш стаж. | Смена завершена и записана в ваш стаж. | REFINED |
| `gopher.woods-intro` | `learn` | Теперь вы знакомы с Бронном. | Теперь вы знакомы с Бронном. | KEEP |
| `gopher.hunt-intro` | `learn` | Вы познакомились с Реном. Сегодня вы проверяете тропы без самостоятельного боя. | Вы познакомились с Реном. Сегодня вы проверяете тропы без самостоятельного боя. | KEEP |
| `gopher.landlord` | `tea` | Силан обещает предупреждать о платежах. Плату за комнату можно внести перед сном. | Силан обещает предупреждать о платежах. Плату за комнату можно внести перед сном. | KEEP |
| `stage.goblin` | `spar` | Вы проводите дружеский поединок деревянными палками. Тик признаёт вашу победу над его самоуверенностью. | Вы проводите дружеский поединок деревянными палками. Тик признаёт поражение своей самоуверенности. | REFINED |
| `stage.goblin` | `flirt` | Вы соглашаетесь на прогулку после работы. Тик мгновенно вспоминает, что обещал закончить доски. Вечером вы вместе идёте к ручью; разговор получается гораздо приятнее спора об инструментах. | Вы соглашаетесь на прогулку после работы. Вечером вы вместе идёте к ручью, и разговор оказывается приятнее спора об инструментах. | REFINED |
| `stage.goblin` | `work` | Вы возвращаетесь к верстаку. Тик решает доказать свою полезность делом. | Вы возвращаетесь к верстаку. Тик решает доказать полезность делом. | REFINED |

## Editing principles

- keep the same immediate narrative consequence;
- keep explicit unlocked fate names where the current copy names them;
- keep tutorial instructions that are still gameplay-relevant;
- remove only avoidable repetition or awkward phrasing;
- do not add new flags, rewards, relationships, route outcomes or implied mechanics;
- keep names and current world facts unchanged.

## Mechanical boundary

These are text-only recommendations. They do not change:
- event/variant/choice IDs;
- choice conditions;
- effects or flags;
- trigger/repeat/cooldown behavior;
- RNG;
- Save schema or gameplay identity.

Final bilingual strings are staged in item 78 after EN parity review.
