# Forest / Secret Debt Bilingual Multi-GIF Map v1

Status: BILINGUAL PRESENTATION-AUTHORING MAP for Chat 3 item 130.

Russian is the source authoring language. English is a full second locale.

This map does not add runtime media-pool support and does not activate any Product-blocked gameplay identity. It defines reusable presentation candidates that Lead/Chat 2 may later bind through the shared presentation system.

## Global media contract

For every row below:

- the media candidate ID is locale-neutral;
- the same GIF/image file is used by RU and EN;
- RU and EN differ only in alt/caption text;
- one semantic gameplay/content identity may own 3–5 candidates;
- candidate selection never changes conditions, choices, effects, RNG, timing, Activity outcome, ending eligibility, rewards or save identity;
- static/text fallback remains valid;
- no locale suffix such as `.ru` or `.en` belongs in a gameplay or media candidate ID.

Where a gameplay identity is still Product-blocked, the media family is planning-only and must not be mistaken for a final production option/event ID.

---

# Forest

## Forest — logging road

Gameplay identity:
- option `forest.route.logging-road`;
- route state `logging-road`.

Presentation family:
`forest/route/logging-road`.

Status:
**REACHABLE_NOW**.

| Candidate ID | RU alt | EN alt | RU caption | EN caption |
| --- | --- | --- | --- | --- |
| `forest.route.logging-road.media.wheel-ruts` | Лесовозная дорога с глубокими свежими колеями. | Logging road with deep fresh wheel ruts. | Свежие колеи ведут дальше между деревьями. | Fresh wheel ruts lead deeper between the trees. |
| `forest.route.logging-road.media.timber-stack` | Просека со штабелями недавно срубленных брёвен. | Clearing with stacks of recently cut timber. | Здесь лес уже превращён в организованную работу. | Here the forest has already been turned into organized work. |
| `forest.route.logging-road.media.work-marks` | Старые меловые и топорные метки на деревьях у дороги. | Old chalk and axe marks on trees beside the road. | Некоторые рабочие решения переживают тех, кто их принял. | Some work decisions outlast the people who made them. |
| `forest.route.logging-road.media.narrowing` | Широкая лесовозная дорога постепенно превращается в тропу. | Wide logging road gradually narrowing into a trail. | Построенная дорога постепенно сдаётся лесу. | The engineered road gradually gives way to the forest. |
| `forest.route.logging-road.media.seasonal` | Лесовозная дорога с выраженным сезонным состоянием — грязь, пыль, листья или снег. | Logging road in a clear seasonal state—mud, dust, leaves, or snow. | Маршрут тот же; сезон меняет его вид, а не identity. | The route is the same; the season changes its appearance, not its identity. |

## Forest — Hunter trail

Authoring key:
`hunter-trail`.

Final production option ID/gate source:
**OPEN**.

Presentation planning family:
`forest/route/hunter-trail`.

Status:
**PRODUCT_BLOCKED final gameplay binding; media authoring may proceed as draft**.

| Candidate ID | RU alt | EN alt | RU caption | EN caption |
| --- | --- | --- | --- | --- |
| `forest.route.hunter-trail.media.overlapping-tracks` | Узкая лесная тропа с пересекающимися звериными и человеческими следами. | Narrow forest trail with overlapping animal and human tracks. | Путь читается по следам, а не по ширине тропы. | The route is read through tracks, not through the width of the path. |
| `forest.route.hunter-trail.media.bark-marks` | Потёртая кора и едва заметные отметки на нескольких деревьях. | Rubbed bark and subtle marks on several trees. | Не каждый знак заметен тому, кто не знает, что искать. | Not every sign is visible to someone who does not know what to look for. |
| `forest.route.hunter-trail.media.migration` | Место, где сходятся многочисленные звериные следы во время миграции. | Place where many animal tracks converge during migration. | Осенью следов становится больше, а читать их — сложнее. | In autumn there are more tracks, and they become harder to read. |
| `forest.route.hunter-trail.media.observation-rise` | Небольшой лесной подъём с открытым обзором между стволами. | Small forest rise with a clear view between the trunks. | Кто-то часто наблюдал отсюда, не оставляя постройки. | Someone often watched from here without building a structure. |
| `forest.route.hunter-trail.media.weathered-signs` | Следы и метки на охотничьей тропе после дождя или снега. | Tracks and marks on the hunter trail after rain or snow. | Погода меняет читаемость знаков, но не решает механику. | Weather changes how readable the signs are, not the mechanics. |

These IDs are presentation-planning IDs only. They do not choose the missing Hunter production option, clue fact, capability, provider, threshold or reward.

## Forest — old boundary

Gameplay identity:
- option `forest.route.old-boundary`;
- route state `old-boundary`;
- gate `enter_old_boundary`.

Presentation family:
`forest/route/old-boundary`.

Status:
**REACHABLE_NOW for route presentation; natural token acquisition/use policy remains Product-blocked**.

| Candidate ID | RU alt | EN alt | RU caption | EN caption |
| --- | --- | --- | --- | --- |
| `forest.route.old-boundary.media.moss-stones` | Почти скрытые мхом старые межевые камни. | Old boundary stones almost hidden by moss. | Один замеченный камень помогает увидеть следующий. | Once one stone is noticed, the next becomes easier to see. |
| `forest.route.old-boundary.media.old-marks` | Выветренные старые зарубки на стволах у границы. | Weathered old cuts on trunks near the boundary. | Эти метки старше нынешних лесных работ. | These marks are older than the current logging work. |
| `forest.route.old-boundary.media.clearing-line` | Узкая каменистая полоса между деревьями, отмеченная повторяющимися знаками. | Narrow stony strip between trees marked by repeating signs. | Граница ощущается как повторение камня, метки и просвета. | The boundary is felt through the repetition of stone, mark, and gap. |
| `forest.route.old-boundary.media.deep-markers` | Старые отметки уходят глубже в менее освоенный лес. | Old markers continuing into less-worked forest. | Современные дороги больше не объясняют эти следы. | Modern roads no longer explain these traces. |
| `forest.route.old-boundary.media.seasonal-stones` | Межевые камни, изменённые сезоном: вода, листья, иней или снег. | Boundary stones changed by the season: water, leaves, frost, or snow. | Сезон делает линию заметнее или скрытнее, не меняя route identity. | The season makes the line easier or harder to see without changing route identity. |

No candidate implies how `old_boundary_token` is obtained, retained, consumed or turned in.

## Forest — deep navigation

Presentation family:
`forest/deep-navigation`.

Status:
**STAGED reusable content; not a fourth route**.

| Candidate ID | RU alt | EN alt | RU caption | EN caption |
| --- | --- | --- | --- | --- |
| `forest.deep-navigation.media.closed-canopy` | Плотные кроны скрывают дальние ориентиры. | Dense canopy hides distant landmarks. | Дальше приходится читать лес по мелким признакам. | From here, the forest has to be read through smaller signs. |
| `forest.deep-navigation.media.repeated-landmark` | Похожие расколотые стволы в разных участках леса. | Similar split trunks in different parts of the forest. | Знакомый ориентир может оказаться не тем же самым местом. | A familiar landmark may not be the same place. |
| `forest.deep-navigation.media.water-sound` | Лесной склон и невидимый за деревьями ручей. | Forest slope with a stream hidden behind the trees. | Воду слышно раньше, чем видно. | The water is heard before it is seen. |
| `forest.deep-navigation.media.human-trace` | Старый пень, уголь или ржавый гвоздь среди лесной подстилки. | Old stump, charcoal, or rusted nail among the forest floor. | Кто-то проходил здесь раньше, но след ещё ничего не доказывает. | Someone passed here before, but the trace proves nothing beyond that. |

## Forest — navigation challenge family

Presentation family:
`forest/challenge/navigation`.

Final concrete challenge IDs:
**OPEN**.

Status:
**STAGED**.

| Candidate ID | RU alt | EN alt | RU caption | EN caption |
| --- | --- | --- | --- | --- |
| `forest.challenge.navigation.media.split-trail` | Лесная тропа расходится на два направления. | Forest trail splitting into two directions. | Два пути дают разную информацию, но не готовый ответ. | Two paths provide different information, not a ready answer. |
| `forest.challenge.navigation.media.lost-horizon` | Плотные кроны полностью закрывают горизонт. | Dense canopy completely blocks the horizon. | Ответ приходится собирать из уклона, ветра, мха и памяти. | The answer has to be assembled from slope, wind, moss, and memory. |
| `forest.challenge.navigation.media.crossed-tracks` | Свежие следы пересекают текущую тропу. | Fresh tracks crossing the current trail. | Следы могут помогать — или сбивать с пути. | Tracks may help—or lead you astray. |
| `forest.challenge.navigation.media.washed-markers` | Дождём размыты ветки, камни и следы на мягкой земле. | Rain-washed twigs, stones, and tracks on soft ground. | Самые заметные ориентиры исчезли после дождя. | The clearest markers disappeared after the rain. |
| `forest.challenge.navigation.media.ridge-choice` | Низкая тропа и подъём к обзорному гребню. | Low path and a climb toward a viewing ridge. | Короткий путь и лучший обзор не обязательно совпадают. | The shorter path and the better view are not necessarily the same. |

## Forest — physical challenge family

Presentation family:
`forest/challenge/physical`.

Final concrete challenge IDs:
**OPEN**.

Status:
**STAGED**.

| Candidate ID | RU alt | EN alt | RU caption | EN caption |
| --- | --- | --- | --- | --- |
| `forest.challenge.physical.media.fallen-trunk` | Большой поваленный ствол лежит поперёк маршрута. | Large fallen trunk lying across the route. | Препятствие можно преодолеть только способом, разрешённым механикой. | The obstacle can only be handled through an approach allowed by mechanics. |
| `forest.challenge.physical.media.washed-bank` | Часть тропы обвалилась в неглубокий овраг. | Part of the trail collapsed into a shallow ravine. | Прямой путь исчез, но это ещё не означает провал. | The direct path is gone, but that does not mean failure. |
| `forest.challenge.physical.media.deadfall` | Плотный завал из сломанных ветвей и стволов. | Dense deadfall of broken branches and trunks. | Завал требует осторожности, силы или разрешённой способности. | The deadfall calls for care, strength, or an authorized capability. |
| `forest.challenge.physical.media.slick-stones` | Скользкие камни в мелком лесном ручье. | Slick stones in a shallow forest stream. | Опасность здесь в опоре, а не в глубине воды. | The danger here is footing, not water depth. |
| `forest.challenge.physical.media.root-slope` | Крутой склон с сетью обнажившихся корней. | Steep slope threaded with exposed roots. | Не каждый корень выдержит вес. | Not every root will hold weight. |

## Forest — anomaly challenge family

Presentation family:
`forest/challenge/anomaly`.

Final concrete challenge IDs:
**OPEN**.

Status:
**STAGED**.

| Candidate ID | RU alt | EN alt | RU caption | EN caption |
| --- | --- | --- | --- | --- |
| `forest.challenge.anomaly.media.knot-marks` | Тонкие ветви связаны в повторяющиеся узлы. | Thin branches tied into repeating knots. | Рисунок слишком аккуратен, чтобы быть случайным. | The pattern is too deliberate to be accidental. |
| `forest.challenge.anomaly.media.stone-ring` | Старое кольцо камней среди корней и мха. | Old ring of stones among roots and moss. | Странность в том, что порядок пережил время. | The strange part is that the arrangement survived time. |
| `forest.challenge.anomaly.media.altered-sap` | Необычно блестящая смола на повреждённом дереве. | Unusually shining sap on a damaged tree. | Наблюдение ещё не означает, что образец можно забрать. | Seeing it does not mean a sample may be taken. |
| `forest.challenge.anomaly.media.source-less-sound` | Тёмный лес без видимого источника повторяющегося звука. | Dark forest with no visible source for a repeating sound. | Ровный ритм требует объяснения, но не подсказывает его. | The regular rhythm demands an explanation without providing one. |
| `forest.challenge.anomaly.media.old-symbols` | Скрытые мхом старые символы на камне или коре. | Old symbols hidden under moss on stone or bark. | Структура заметна даже тогда, когда смысл ещё неизвестен. | The structure is visible even when the meaning is unknown. |

## Forest — success result

Activity result:
`lumber.forest.success`.

Reaction event:
`forest-result-content-v1.success`.

Presentation family:
`forest/result/success`.

Status:
**REACHABLE_NOW**.

| Candidate ID | RU alt | EN alt | RU caption | EN caption |
| --- | --- | --- | --- | --- |
| `forest.result.success.media.route-opens` | Лесной маршрут выходит к ясной точке успешного завершения. | Forest route opening into a clear successful endpoint. | Экспедиция дошла до результата. | The expedition reached its result. |
| `forest.result.success.media.clear-evidence` | Успешная находка или ясный ориентир в лесу без конкретного нового лута. | Successful discovery or clear landmark in the forest without implying new loot. | Этого достаточно, чтобы вернуться с уверенностью. | This is enough to return with certainty. |
| `forest.result.success.media.return-path` | Уверенный обратный путь через знакомый участок леса. | Confident return path through a familiar part of the forest. | Результат уже зафиксирован; путь домой его не меняет. | The result is already fixed; the way home does not change it. |
| `forest.result.success.media.quiet-clearing` | Спокойная лесная поляна после успешного разрешения маршрута. | Quiet forest clearing after a successful resolution. | Лес не стал проще, но эта попытка закончилась успехом. | The forest did not become easier, but this attempt ended successfully. |

Exact continuation remains:
`activityResult(lumber.forest, success, lumber.forest.success)`.

## Forest — escape result

Activity result:
`lumber.forest.escape`.

Reaction event:
`forest-result-content-v1.escape`.

Presentation family:
`forest/result/escape`.

Status:
**REACHABLE_NOW**.

| Candidate ID | RU alt | EN alt | RU caption | EN caption |
| --- | --- | --- | --- | --- |
| `forest.result.escape.media.retreat-route` | Героиня отступает по уже известному лесному маршруту. | Heroine retreating along a known forest route. | Уйти вовремя — не то же самое, что добиться успеха. | Leaving in time is not the same as succeeding. |
| `forest.result.escape.media.turn-back-clearing` | Небольшая поляна перед решением повернуть назад. | Small clearing before the decision to turn back. | Маршрут остаётся незавершённым. | The route remains unfinished. |
| `forest.result.escape.media.forest-edge` | Лесная кромка после безопасного выхода без успешной находки. | Forest edge after a safe exit without a successful discovery. | Ты вернулась целой, но без результата успеха. | You returned safely, but without a success result. |
| `forest.result.escape.media.abandoned-obstacle` | Трудный участок оставлен позади после добровольного отступления. | Difficult section left behind after a voluntary retreat. | Отступление сохраняет собственную identity. | Escape keeps its own identity. |

## Forest — failure result

Activity result:
`lumber.forest.failure`.

Reaction event:
`forest-result-content-v1.failure`.

Presentation family:
`forest/result/failure`.

Status:
**REACHABLE_NOW**.

| Candidate ID | RU alt | EN alt | RU caption | EN caption |
| --- | --- | --- | --- | --- |
| `forest.result.failure.media.blocked-route` | Лесной маршрут заканчивается непроходимым участком. | Forest route ending at an impassable section. | Эта попытка закончилась без нужного результата. | This attempt ended without the needed result. |
| `forest.result.failure.media.exhausted-return` | Тяжёлое возвращение после проваленной экспедиции. | Difficult return after a failed expedition. | Поражение зафиксировано отдельно от добровольного отступления. | Failure is recorded separately from voluntary escape. |
| `forest.result.failure.media.closed-path` | Закрытый или потерянный путь в глубоком лесу. | Closed or lost path in the deep forest. | Маршрут не сложился в успех. | The route did not resolve into success. |
| `forest.result.failure.media.edge-after-failure` | Лесная кромка после неудачной попытки. | Forest edge after an unsuccessful attempt. | Возвращение не переписывает провал в escape или success. | Returning does not rewrite failure into escape or success. |

---

# Secret Debt

Secret Debt presentation families below are authoring identities. They do not choose unresolved probability, debt, delay, forced-Night penalty, thresholds, external dependencies or Meta rewards.

## Secret Debt — lender offer

Gameplay authoring identity:
`secret-debt.lender-offer`.

Existing presentation variants:
- `secret-debt/lender-offer/rain`;
- `secret-debt/lender-offer/market-close`;
- `secret-debt/lender-offer/warm-drink`;
- `secret-debt/lender-offer/no-pity`;
- `secret-debt/lender-offer/envelope`.

Shared pool target:
**5 candidates**.

| Candidate ID | Suggested variant use | RU alt | EN alt | RU caption | EN caption |
| --- | --- | --- | --- | --- | --- |
| `secret-debt.lender.media.rain-awning` | rain | Сухие перчатки и небольшой кошель под дождливым уличным навесом. | Dry gloves and a small purse beneath a rainy street awning. | Помощь появляется именно тогда, когда ночь кажется слишком дорогой. | Help appears exactly when the night feels too expensive. |
| `secret-debt.lender.media.closed-market` | market-close | Пустеющий рынок, гаснущие фонари и фигура с денежным мешочком. | Emptying market, dying lamps, and a figure holding a money pouch. | Плохой вечер предлагается исправить чужими деньгами. | A bad evening is offered a solution paid for with somebody else’s money. |
| `secret-debt.lender.media.warm-cup` | warm-drink | Горячий стакан рядом с предложенным кошелём. | Hot cup beside an offered purse. | Сначала приходит тепло, условия — позже. | Warmth comes first; terms come later. |
| `secret-debt.lender.media.no-pity` | no-pity | Практичный незнакомец протягивает деньги без жеста сочувствия. | Practical stranger offering money without a gesture of pity. | Предложение продаёт пространство для выбора. | The offer sells room to choose. |
| `secret-debt.lender.media.envelope` | envelope | Качественный конверт без отметок в руке незнакомца. | High-quality unmarked envelope in a stranger’s hand. | Содержимое может помочь сейчас; остальное обещают обсудить потом. | The contents may help now; the rest is promised for later. |

The same accept/refuse mechanics serve every locale and candidate.

## Secret Debt — hidden-career daytime work

Gameplay authoring identity:
`secret-debt.hidden-career-work`.

The ten authored work families may reuse a shared visual pool. Family-specific text remains locale-aware; candidate media remains shared.

Shared pool target:
**5 candidates**.

| Candidate ID | Compatible work families | RU alt | EN alt | RU caption | EN caption |
| --- | --- | --- | --- | --- | --- |
| `secret-debt.work.media.storage-labor` | sorting-carrying, heavy-shift, inventory-count | Ящики, штабели и тесное складское помещение во время тяжёлой работы. | Crates, stacks, and a cramped storage area during heavy work. | Работа может быть обычной; отсутствие профессиональной свободы — нет. | The work can be ordinary; the lack of professional freedom is not. |
| `secret-debt.work.media.backroom-cleanup` | cleanup-after-closing, maintenance | Пустой подсобный зал после закрытия, оставленный для уборки и ремонта. | Empty back room after closing, left for cleaning and repairs. | То, что остальные перестали замечать, остаётся твоей задачей. | What everyone else stopped noticing remains your task. |
| `secret-debt.work.media.street-delivery` | supervised-delivery, controlled-errand | Ночная или вечерняя улица с запечатанным пакетом в руках героини. | Evening or night street with a sealed package in the heroine’s hands. | Маршрут знакомый, но выбор маршрута принадлежит не тебе. | The route is familiar, but choosing it is not yours. |
| `secret-debt.work.media.ledger-desk` | inventory-count, records-after-hours | Стол с книгами учёта, списками и подсчётами. | Desk covered with ledgers, lists, and calculations. | Цифры могут быть скучными и всё равно многое раскрывать. | Numbers can be tedious and still reveal a great deal. |
| `secret-debt.work.media.watched-service` | service-under-observation, trusted-access | Рабочее пространство, где героиня выполняет задачу под наблюдением или впервые без него. | Work area where the heroine performs a task under observation or, later, without it. | Разница между надзором и доверием становится частью истории работы. | The difference between surveillance and trust becomes part of the work story. |

No candidate grants debt reduction, stats, stage progress or takeover leverage by itself.

## Secret Debt — forced Night

Gameplay authoring identity:
`secret-debt.forced-night`.

Forced Night remains separate from daytime hidden-career work.

Shared pool target:
**5 candidates**.

| Candidate ID | Compatible Night families | RU alt | EN alt | RU caption | EN caption |
| --- | --- | --- | --- | --- | --- |
| `secret-debt.night.media.summons-door` | late-summons, correction | Тёмный дверной проём и короткое ночное сообщение с требованием вернуться. | Dark doorway and a short night message demanding a return. | Ночь перестаёт принадлежать тебе ещё до начала задачи. | The night stops belonging to you before the task even begins. |
| `secret-debt.night.media.midnight-ledger` | inventory, private-ledger | Книги учёта и полки под тусклым ночным светом. | Ledgers and shelves under dim night light. | То, что могло ждать утра, решено делать сейчас. | What could have waited until morning is being done now. |
| `secret-debt.night.media.city-escort` | escort, personal-errand | Поздняя городская улица во время чужого поручения. | Late city street during somebody else’s errand. | Двигаться можно свободно только в заданном направлении. | You can move freely only in the direction you were assigned. |
| `secret-debt.night.media.watch-post` | watch | Дверь, телега или склад под долгим ночным наблюдением. | Door, cart, or storeroom under a long night watch. | Иногда задача состоит в том, чтобы ничего не произошло. | Sometimes the task is for nothing to happen. |
| `secret-debt.night.media.trusted-late-task` | trusted-task, ambiguous-kindness, cleanup | Тихое рабочее помещение поздно ночью, где важна компетентность героини. | Quiet workplace late at night where the heroine’s competence matters. | Принуждение может сосуществовать с доверием или добрым жестом, не отменяя его природы. | Coercion can coexist with trust or kindness without ceasing to be coercion. |

No candidate chooses NightFlow intercept, lodging payment, next-day penalty or modifier composition.

## Secret Debt — paid_freedom

Outcome identity:
`paid_freedom`.

Presentation families:
- `secret-debt/outcome/paid-freedom/approach`;
- `.../settlement`;
- `.../aftermath`;
- `.../run-result`.

Shared pool target:
**4 candidates**.

| Candidate ID | RU alt | EN alt | RU caption | EN caption |
| --- | --- | --- | --- | --- |
| `secret-debt.outcome.paid-freedom.media.counting` | Деньги аккуратно пересчитываются перед окончательным расчётом. | Money being carefully counted before final settlement. | Впервые итог может означать конец обязательства. | For the first time, the total can mean the end of the obligation. |
| `secret-debt.outcome.paid-freedom.media.settlement-table` | Стол с деньгами и книгой учёта во время закрытия счёта. | Table with money and ledger during account settlement. | Закрытие должно произойти один раз и на авторитетной механической границе. | Closure must happen once at the authoritative mechanical boundary. |
| `secret-debt.outcome.paid-freedom.media.closed-account` | Зачёркнутая строка счёта или нейтральный символ закрытого обязательства. | Crossed ledger line or neutral symbol of a closed obligation. | Конкретная форма подтверждения может измениться; смысл закрытия — нет. | The form of confirmation may change; the meaning of closure does not. |
| `secret-debt.outcome.paid-freedom.media.free-street` | Обычная городская улица после снятия долговой профессиональной блокировки. | Ordinary city street after the debt-specific professional lock is removed. | Мир выглядит так же; выбор работы снова принадлежит обычным правилам. | The world looks the same; work choices return to their ordinary rules. |

No candidate implies the exact debt/payment threshold or Meta reward.

## Secret Debt — bound_life

Outcome identity:
`bound_life`.

Presentation families:
- `secret-debt/outcome/bound-life/approach`;
- `.../commitment`;
- `.../aftermath`;
- `.../run-result`.

Shared pool target:
**4 candidates**.

| Candidate ID | RU alt | EN alt | RU caption | EN caption |
| --- | --- | --- | --- | --- |
| `secret-debt.outcome.bound-life.media.familiar-work` | Знакомое рабочее место, где героиня действует без подсказок. | Familiar workplace where the heroine acts without instructions. | Временная работа успела стать знанием и привычкой. | Temporary work has had time to become knowledge and habit. |
| `secret-debt.outcome.bound-life.media.new-worker` | Новый работник обращается к героине за практическим советом. | New worker asking the heroine for practical advice. | Она уже не в начале этого пути. | She is no longer at the beginning of this path. |
| `secret-debt.outcome.bound-life.media.explicit-stay` | Спокойный момент явного решения остаться. | Quiet moment of an explicit decision to stay. | Это ending commitment, а не автоматический проигрыш. | This is an ending commitment, not an automatic loss. |
| `secret-debt.outcome.bound-life.media.morning-routine` | Утро на знакомом рабочем месте после принятого решения. | Morning in a familiar workplace after the commitment. | Никому больше не нужно объяснять, с чего начинается день. | Nobody needs to explain where the day begins anymore. |

No candidate sets the substantial-progress threshold or Meta reward.

## Secret Debt — takeover

Outcome identity:
`takeover`.

Presentation families:
- `secret-debt/outcome/takeover/preparation`;
- `.../confrontation`;
- `.../control-transfer`;
- `.../aftermath`;
- `.../run-result`.

Shared pool target:
**5 candidates**.

| Candidate ID | RU alt | EN alt | RU caption | EN caption |
| --- | --- | --- | --- | --- |
| `secret-debt.outcome.takeover.media.system-map` | Записи, ключи и маршруты собраны в понятную картину работы системы. | Records, keys, and routes assembled into a readable picture of the system. | Ловушка становится уязвимой только после понимания её устройства. | The trap becomes vulnerable only after its structure is understood. |
| `secret-debt.outcome.takeover.media.external-leverage` | Нейтральный символ внешнего рычага без указания его канонического типа. | Neutral symbol of outside leverage without specifying its canonical type. | Важная часть решения существует вне контроля скрытой работы. | An important part of the solution exists outside the hidden career’s control. |
| `secret-debt.outcome.takeover.media.confrontation` | Напряжённая встреча, где прежний контролёр больше не задаёт все условия. | Tense meeting where the former controller no longer sets every term. | Разговор меняется только потому, что авторитетное состояние уже даёт рычаг. | The conversation changes only because authoritative state already provides leverage. |
| `secret-debt.outcome.takeover.media.control-transfer` | Ключи, книга или другой нейтральный символ перехода управления. | Keys, ledger, or another neutral symbol of control changing hands. | Конкретный символ открыт; смысл перехода контроля фиксирован. | The exact symbol is open; the meaning of control transfer is fixed. |
| `secret-debt.outcome.takeover.media.new-order` | То же рабочее место после изменения направления приказов. | Same workplace after the direction of authority has changed. | Это не выход из системы, а изменение того, кому она отвечает. | This is not leaving the system; it is changing whom the system answers to. |

No candidate selects the external dependency, thresholds, controller identity or Meta reward.

---

# Reuse matrix

Underlying files may be reused across semantic IDs only when the visual meaning stays compatible.

Safe reusable visual buckets:
- Forest route overview;
- tracks/markers close-up;
- mud/water/ice obstacle;
- deadfall/tree obstacle;
- anomaly/detail close-up;
- Forest edge/return;
- Secret Debt money/accounting;
- Secret Debt storage/back-room labor;
- Secret Debt street errand;
- Secret Debt ledger/records;
- Secret Debt late-night interior;
- Secret Debt authority/control-transfer.

A reused file still keeps separate semantic candidate mappings and paired locale text where the meanings differ.

## Candidate selection and save boundary

Presentation candidate selection is not gameplay outcome selection.

Required invariants:
- no candidate changes route/challenge availability;
- no candidate changes `activityResult`;
- no candidate changes Secret Debt state;
- no candidate changes outcome eligibility;
- no candidate changes money/debt;
- no candidate changes next-day modifiers;
- no candidate grants facts/items/capabilities;
- no animation frame/time is required in gameplay save state;
- locale change never creates a new gameplay history entry.

If the Lead-owned presentation runtime persists or deterministically selects a media candidate, both locales must resolve the same candidate identity for the same presentation state unless the presentation contract deliberately allows non-gameplay reroll. Either behavior must remain mechanically inert.

## Exact Product-blocked bindings

Do not finalize these from this map:
- Hunter route production option/gate/source;
- Old Boundary Token acquisition or consume/retain semantics;
- concrete Forest challenge IDs/checks/rewards;
- seasonal topology IDs/costs;
- Secret Debt lender probability/principal/debt/delay;
- Secret Debt hidden-career numbers/thresholds;
- Secret Debt forced-Night intercept/lodging/penalty;
- Secret Debt outcome thresholds;
- `takeover` external dependency;
- Secret Debt Meta rewards.

## Locked firewalls

Forest:
- Lumber Hard Work eligibility remains ONLY `completed_shifts >= 50`;
- reward remains exactly `hardWork:lumber`;
- success continuation remains exact `activityResult(lumber.forest, success, lumber.forest.success)`.

Secret Debt:
- remains separate from ordinary poverty;
- remains outside the 10 ordinary careers;
- bound state blocks those 10 ordinary careers while preserving their progress;
- contributes zero to Palace 10/10;
- outcome identities remain `paid_freedom`, `bound_life`, `takeover`.

## Item 130 conclusion

The bilingual authored content now has a concrete 3–5 candidate presentation plan with shared locale-neutral media identities and paired RU/EN alt/captions.

This file is integration-ready as presentation authoring data, not as a shared runtime/schema change.
