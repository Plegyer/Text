# Forest Route / Challenge RU+EN Bank v1

Status: BILINGUAL CONTENT_DRAFT for Chat 3 item 124.

Russian is the source authoring language. English is a full second locale.

This bank translates currently authored Forest route/challenge presentation content without changing gameplay. Every key below is locale-neutral and must be shared by RU and EN.

## Shared invariants

Authoritative Activity:
`lumber.forest`.

Terminal results remain:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Lumber success continuation remains exact:
`activityResult(lumber.forest, success, lumber.forest.success)`.

Hard Work remains:
- eligibility ONLY `completed_shifts >= 50`;
- reward exactly `hardWork:lumber`.

No text below selects:
- a stat threshold;
- a check formula;
- RNG;
- reward/loot;
- item consumption;
- Hunter clue/capability/source;
- Old Boundary Token acquisition/use semantics;
- School Arcana public fact.

## Authoring format

For every entry:
- **Key** is locale-neutral.
- **RU** is the source text.
- **EN** is the paired English locale.
- Status controls production binding, not translation quality.

---

# Route A — logging road

Production option:
`forest.route.logging-road`.

Route state:
`logging-road`.

Status:
**REACHABLE_NOW**.

## A1 — fresh wheel ruts

Key:
`forest/route/logging-road/wheel-ruts`

RU:

Лесовозная дорога шире троп вокруг, но свежие колеи превратили её середину в две тёмные полосы грязи. По краям лежат обрубленные ветви, которые рабочие оттащили с пути. Здесь легко не потеряться: люди уже заставили лес уступить дороге место.

EN:

The logging road is wider than the paths around it, but fresh wheel ruts have turned its center into two dark channels of mud. Cut branches lie along the edges where crews dragged them aside. It is easy to keep the route here because people have already forced the forest to make room for the road.

## A2 — stacked timber

Key:
`forest/route/logging-road/timber-stack`

RU:

Дорога выводит на просеку со штабелями брёвен. Ровные стволы сложены отдельно, повреждённые — в стороне, кора и щепа втоптаны в землю. Здесь нет ничего таинственного, но место всё равно кажется важным: лес превращён в работу, которую можно пересчитать руками.

EN:

The road opens into a clearing stacked with timber. Straight trunks are kept together, damaged pieces lie to one side, and bark and chips are ground into the soil. Nothing here needs to be mysterious to feel important: the forest has been turned into work that can be counted by hand.

## A3 — abandoned work marks

Key:
`forest/route/logging-road/work-marks`

RU:

На нескольких деревьях у дороги остались старые меловые пометки и зарубки. Одни указывают на уже законченные работы. Другие отмечают деревья, к которым никто так и не вернулся.

Короткая реплика:

> Дорога хранит решения дольше, чем люди, которые их приняли, остаются здесь.

EN:

Old chalk marks and axe cuts remain on several trees beside the road. Some point toward work already completed. Others mark trees nobody returned for.

Short line:

> The road records decisions long after the people who made them have gone home.

## A4 — road narrows

Key:
`forest/route/logging-road/narrowing`

RU:

Построенная дорога постепенно сдаётся лесу. Колеи превращаются в следы от ног, штабеля исчезают, а привычный порядок рабочих участков растворяется. Понять, где здесь когда-то ходили люди, ещё можно — но только потому, что лес не успел окончательно стереть следы.

EN:

The engineered road gradually gives way to the forest. Wheel tracks narrow into footpaths, timber stacks disappear, and the order of the worksite dissolves. It is still possible to tell where people once passed, but only because the forest has not fully erased the evidence yet.

### Logging-road route reaction

Key:
`forest/route/logging-road/reaction`

RU:
«По крайней мере, эту дорогу строили так, чтобы по ней можно было пройти».

EN:
“At least this route was built to be followed.”

---

# Route B — Hunter trail

Authoring key:
`hunter-trail`.

Production option ID:
**OPEN**.

Status:
**PRODUCT_BLOCKED for production binding; bilingual prose is ready**.

Do not derive any Hunter fact, capability, provider or threshold from this bank.

## B1 — tracks beside tracks

Key:
`forest/route/hunter-trail/tracks`

RU:

Узкая тропа пересекает звериные следы, старые отпечатки сапог и участки, где кто-то нарочно ступал по камням вместо мягкой земли. Путь можно прочитать, но нельзя назвать очевидным.

Короткая реплика:

> Тот, кто знал этот лес, хотел сохранить тропу полезной, но не заметной.

EN:

A narrow trail crosses animal prints, old boot marks, and places where somebody deliberately stepped on stone instead of soft ground. The route can be read, but it is not obvious.

Short line:

> Someone who knew the forest wanted this path to remain useful without becoming easy to find.

## B2 — rubbed bark

Key:
`forest/route/hunter-trail/bark-marks`

RU:

На высоте плеч кора на нескольких деревьях отполирована с одной стороны. Часть следов оставили звери. Часть выглядит намеренной. Разница имеет значение только тогда, когда у героини уже есть авторитетно определённая подсказка или способность, открывающая этот маршрут.

EN:

At shoulder height, bark has been rubbed smooth on one side of several trees. Some marks are animal. Some look deliberate. The difference matters only when the heroine already has an authoritative clue or capability that makes this route available.

## B3 — migration crossing

Key:
`forest/route/hunter-trail/migration-crossing`

RU:

Тропа выходит к месту, где сходятся сразу несколько звериных путей. Земля истоптана в разных направлениях, и один след поверх другого превращает привычное чтение маршрута в задачу. Эта сцена особенно хорошо подходит к уже заданному осеннему контексту миграции, но сама по себе сезонную механику не создаёт.

EN:

The trail approaches a place where several animal paths converge. The ground is disturbed in many directions, and overlapping tracks turn ordinary route-reading into a problem. This scene fits the already-directed autumn migration context especially well, but it does not create seasonal mechanics by itself.

## B4 — quiet observation point

Key:
`forest/route/hunter-trail/observation-point`

RU:

Небольшой подъём даёт хороший обзор между стволами, не выставляя наблюдателя напоказ. Здесь нет лавки, навеса или иной явной постройки — только примятая земля там, где кто-то проводил достаточно времени, чтобы оставить привычку в самом рельефе.

EN:

A small rise gives a clear view through the trunks without exposing the observer. There is no bench, shelter, or obvious structure—only flattened ground where somebody spent enough time to leave a habit in the terrain itself.

### Hunter-trail route reaction

Key:
`forest/route/hunter-trail/reaction`

RU:
«Тропа существует, но ждёт от путника знания того, что здесь считается знаком».

EN:
“The path exists, but it expects the traveler to know what counts as a sign.”

---

# Route C — old boundary

Production option:
`forest.route.old-boundary`.

Route state:
`old-boundary`.

Authoritative gate:
`itemCapability(enter_old_boundary) present=true`.

Locked identities:
- item `old_boundary_token`;
- capability `enter_old_boundary`.

Status:
**REACHABLE_NOW for route presentation / PRODUCT_BLOCKED for natural acquisition and use semantics**.

## C1 — stones in a line

Key:
`forest/route/old-boundary/stones`

RU:

Первый межевой камень почти целиком утонул во мху. Но стоит заметить один — и следующий уже легче отличить от обычных валунов. Камни складываются в линию, которой совершенно безразлично, куда позже проложили лесовозную дорогу.

EN:

The first boundary stone is almost completely hidden under moss. Once one is noticed, the next becomes easier to distinguish from ordinary rock. The stones form a line that ignores the newer logging road entirely.

## C2 — old cut marks

Key:
`forest/route/old-boundary/old-marks`

RU:

На нескольких стволах видны неглубокие зарубки, слишком выветренные для нынешних рабочих. Они повторяются с намеренной регулярностью. Эти следы больше похожи не на метки рубки, а на старое указание о том, где не следовало переходить границу.

EN:

Several trunks bear shallow marks too weathered to belong to the current crews. They repeat with deliberate regularity. The cuts look less like logging marks than an old instruction about where not to cross.

## C3 — boundary clearing

Key:
`forest/route/old-boundary/clearing`

RU:

Деревья отступают от узкой полосы каменистой земли. Физической преграды нет. Ощущение границы создаёт повторение: камень, знак, просвет, следующий камень. Доступ к маршруту определяет существующий capability gate; этот текст не расходует и не преобразует жетон.

EN:

The trees pull back from a narrow strip of stony ground. Nothing physically blocks the way. The sense of a boundary comes from repetition: stone, mark, gap, another stone. Route access is determined by the existing capability gate; this text does not consume or transform the token.

## C4 — beyond the markers

Key:
`forest/route/old-boundary/beyond-markers`

RU:

За самыми заметными межевыми знаками лес выглядит менее обжитым. Старые следы человеческого присутствия всё ещё встречаются, но современные дороги больше не объясняют, откуда они взялись и куда вели.

EN:

Past the clearest boundary markers, the forest looks less worked. Old traces of human presence remain, but modern roads no longer explain where they came from or where they led.

### Old-boundary route reaction

Key:
`forest/route/old-boundary/reaction`

RU:
«Эти знаки настолько старые, что идти по ним — скорее читать дорогу, чем просто следовать ей».

EN:
“The markers are old enough that following them feels less like taking a road and more like reading one.”

---

# Generic deep-forest navigation

Status:
**STAGED reusable content; not a fourth route identity**.

## D1 — canopy closes

Key:
`forest/deep-navigation/closed-canopy`

RU:

Кроны смыкаются настолько плотно, что дальние ориентиры исчезают. Дальше остаются только запомненное направление, следы маршрута и те способы ориентирования, которые реально разрешит будущая авторская механика. Формула проверки здесь не задаётся.

EN:

The canopy closes tightly enough that distant landmarks disappear. What remains is remembered direction, route evidence, and whatever navigation approaches future authored mechanics actually allow. No check formula is set here.

## D2 — repeated landmarks

Key:
`forest/deep-navigation/repeated-landmark`

RU:

Расколотый ствол появляется во второй раз. Или кажется, что во второй. Героине приходится решить, завернула ли тропа назад, пересекла ли она собственный путь или два дерева просто слишком похожи друг на друга.

EN:

A split trunk appears a second time. Or seems to. The heroine has to decide whether the route curved back, whether she crossed her own path, or whether two trees simply look too much alike.

## D3 — water sound

Key:
`forest/deep-navigation/water-sound`

RU:

Шум воды слышен раньше, чем появляется сам ручей. В одном маршруте такой звук может помочь с направлением, в другом — предупредить о препятствии. Сам по себе текст ничего не открывает и не закрывает.

EN:

Running water can be heard before the stream itself appears. On one route the sound may help establish direction; on another it may warn of an obstacle. The text alone opens or closes nothing.

## D4 — old human trace

Key:
`forest/deep-navigation/human-trace`

RU:

Ржавый гвоздь, старый пень, кусок древесного угля или утоптанная площадка доказывают, что здесь уже бывали люди. Пока отдельный публичный факт или результат не авторизован, находка остаётся только частью сцены.

EN:

A rusted nail, an old stump, a piece of charcoal, or a compacted patch of ground proves that people have been here before. Until a separate public fact or result is authoritatively authored, the discovery remains part of the scene only.

### Deep-forest reaction

Key:
`forest/deep-navigation/reaction`

RU:
«Направление всё ещё можно выбрать. Уверенность — уже нет».

EN:
“Direction is still possible. Certainty is not.”

---

# Challenge family A — navigation

Status:
**STAGED**.

Allowed future dependency categories remain:
Wits, Reason, Hunter-owned public knowledge, navigation capability, season.

No exact check is authored here.

## N1 — split trail

Key:
`forest/challenge/navigation/split-trail`

RU:

Тропа расходится вокруг молодого подлеска. Слева — старые следы, мягкая земля и признаки недавнего движения. Справа — более твёрдая почва, меньше отпечатков и линия, которая, кажется, не теряет высоту. Когда механика будет авторизована, выбор должен оставаться реальным решением по маршруту или информации.

EN:

The route divides around a stand of young trees. To the left are older footprints, softer ground, and signs of recent passage. To the right the footing is firmer, tracks are fewer, and the line appears to keep elevation. When mechanics are authored, the choice should remain a genuine route or information decision.

## N2 — lost horizon

Key:
`forest/challenge/navigation/lost-horizon`

RU:

Кроны закрывают дальний обзор. Ориентироваться приходится по мелким признакам: уклону, ветру, мху, шуму воды и памяти о предыдущих поворотах.

Короткая реплика:

> Лес не спрятал дорогу. Он просто раздробил ответ на детали.

EN:

The canopy blocks any long view. Navigation has to rely on smaller evidence: slope, wind, moss, water sound, and memory of earlier turns.

Short line:

> The forest has not hidden the way. It has reduced the answer to details.

## N3 — crossed tracks

Key:
`forest/challenge/navigation/crossed-tracks`

RU:

Свежие следы пересекают текущий путь. Они могут принадлежать рабочим, охотникам, зверям или самой героине с предыдущего участка маршрута. Задача здесь — разобраться в информации о пути, а не вступить в бой.

EN:

Fresh tracks cross the current path. They may belong to workers, hunters, animals, or the heroine herself from an earlier part of the route. The challenge is to interpret route information, not to enter combat.

## N4 — washed markers

Key:
`forest/challenge/navigation/washed-markers`

RU:

Дождь и сток смыли самые заметные следы. Остались только обломанная линия веток, сдвинутые камни, царапина на коре и утрамбованная грязь. Этого может быть достаточно — если будущая проверка действительно разрешает такой способ чтения маршрута.

EN:

Rain and runoff have erased the clearest signs. Only a broken line of twigs, disturbed stones, a bark scrape, and compacted mud remain. That may be enough—if the future authored check actually allows the route to be read this way.

## N5 — ridge choice

Key:
`forest/challenge/navigation/ridge-choice`

RU:

Один путь поднимается на гребень и обещает лучший обзор. Другой остаётся ниже и выглядит короче. Позже им можно назначить разные риски или затраты, но этот текст не задаёт ни одного числового значения.

EN:

One path climbs toward a ridge and promises a better view. The other stays lower and looks shorter. Different risks or costs may be authored later, but this text assigns no numeric value.

### Navigation approach labels

| Neutral label key | RU source | EN |
| --- | --- | --- |
| `read-ground` | Читать следы на земле | Read the ground |
| `climb-for-view` | Подняться выше ради обзора | Climb for a better view |
| `follow-water` | Ориентироваться по воде | Follow the water |
| `trust-marked-route` | Довериться отмеченному пути | Trust the marked route |
| `use-trail-knowledge` | Использовать знание этой тропы | Use what you know about the trail |

A gated label does not create its own condition.

---

# Challenge family B — physical obstacle

Status:
**STAGED**.

Allowed future dependency categories remain:
Strength, Endurance, Dexterity, `cross_rough_route`, `cut_heavy_wood`, season.

## P1 — fallen trunk

Key:
`forest/challenge/physical/fallen-trunk`

RU:

Большой ствол лёг поперёк пути под неудобным углом. Будущие подходы могут включать перелезание, обход, расчистку при наличии авторизованной способности или поиск более безопасного места перехода. Сам текст не выбирает проверку.

EN:

A large trunk lies across the route at an awkward angle. Future approaches may include climbing over it, going around, clearing it with an authoritative capability, or finding a safer crossing point. The text itself chooses no check.

## P2 — washed bank

Key:
`forest/challenge/physical/washed-bank`

RU:

Часть тропы обвалилась в неглубокий овраг. Противоположный край достижим, но просто пройти вперёд уже нельзя. Позже могут быть разрешены спуск и подъём, верёвка, обход или отступление — только если это подтвердит механика.

EN:

Part of the path has collapsed into a shallow ravine. The opposite edge is reachable, but walking straight ahead is no longer possible. Descending and climbing, using a rope, detouring, or retreating may be allowed later only if mechanics authorize them.

## P3 — tangled deadfall

Key:
`forest/challenge/physical/deadfall`

RU:

Сломанные ветви и поваленные стволы образовали плотный завал. Здесь помогают рычаг, осторожная постановка ног, авторизованная способность к расчистке и терпение. Величина эффекта не задаётся.

EN:

Broken branches and fallen trunks have formed a dense barrier. Leverage, careful footing, an authoritative clearing capability, and patience may all matter here. No effect magnitude is set.

## P4 — slick stones

Key:
`forest/challenge/physical/slick-stones`

RU:

Ручей неглубокий, но камни под ногами ненадёжны. Проблема не в глубине воды, а в опоре. Будущая механика может учитывать ловкость, верёвку или знание обходного пути, но ни одно условие здесь не фиксируется.

EN:

The stream is shallow, but the stones underfoot are unreliable. The problem is not the depth of the water; it is footing. Future mechanics may use Dexterity, a rope, or knowledge of an alternate route, but no condition is fixed here.

## P5 — steep root slope

Key:
`forest/challenge/physical/root-slope`

RU:

Крутой склон весь прошит обнажившимися корнями. Одни выдержат вес, другие — нет. Возможные будущие подходы: идти прямо вверх, закрепить путь или выбрать длинный обход.

EN:

A steep slope is threaded with exposed roots. Some will hold weight and some will not. Possible future approaches include climbing directly, securing a route, or taking a longer detour.

### Physical approach labels

| Neutral label key | RU source | EN |
| --- | --- | --- |
| `climb-carefully` | Осторожно перелезть | Climb carefully |
| `clear-way` | Расчистить путь | Clear a way |
| `use-rope` | Использовать верёвку | Use the rope |
| `long-detour` | Пойти длинным обходом | Take the longer detour |
| `test-footholds` | Проверять каждую опору | Test each foothold |

No label implies consumption.

---

# Challenge family C — interpretation / ritual anomaly

Status:
**STAGED**.

Allowed future dependency categories remain:
Reason, Magic, accepted School Arcana public fact, `preserve_specimen`, accepted sample/tool capability, season.

## R1 — repeated knot marks

Key:
`forest/challenge/anomaly/knot-marks`

RU:

Тонкие ветви связаны в повторяющиеся узлы. Для случайного повреждения рисунок слишком аккуратен. Это могут быть метки, предупреждения, остатки ритуала или практические указатели. Сначала важно понять, что перед героиней, и только потом действовать.

EN:

Thin branches have been tied into repeating knots. The pattern is too deliberate to be random damage. They may be markers, warnings, ritual remnants, or practical trail signs. The important thing is to interpret them before acting.

## R2 — ring of stones

Key:
`forest/challenge/anomaly/stone-ring`

RU:

Кольцо камней лежит там, где корни давно должны были его раздвинуть. Ничего не движется и не угрожает героине напрямую. Странность — в том, что порядок сохранился вопреки времени.

EN:

A ring of stones sits where roots should have disturbed it years ago. Nothing moves, and nothing threatens the heroine directly. The anomaly is that the arrangement has endured despite time.

## R3 — altered sap

Key:
`forest/challenge/anomaly/altered-sap`

RU:

Из повреждённого дерева выступает смола с необычным блеском. Будущие подходы могут включать наблюдение, сравнение, сохранение образца при наличии авторизованной способности или решение ничего не трогать. Этот черновик не выдаёт предмет и не назначает награду.

EN:

A damaged tree leaks sap with an unusual sheen. Future approaches may include observing it, comparing it, preserving a sample with an authoritative capability, or leaving it untouched. This draft grants no item and assigns no reward.

## R4 — sound without source

Key:
`forest/challenge/anomaly/source-less-sound`

RU:

Между деревьями повторяется низкий звук. Ритм слишком ровный, чтобы его легко списать на случайность. Это может оказаться природным циклом, механизмом, ритуальным сигналом или особенностью эха — но текст не выбирает истинный ответ.

EN:

A low sound repeats through the trees. Its rhythm is regular enough that it is hard to dismiss as random. It could be a natural cycle, machinery, a ritual signal, or a terrain echo—but the text does not choose which answer is true.

## R5 — old symbols under moss

Key:
`forest/challenge/anomaly/old-symbols`

RU:

Мох скрывает вырезанные знаки на камне или коре. Даже без понимания смысла видно, что они расположены не случайно. Позже интерпретация может зависеть от Reason, Magic или авторизованного результата School Arcana; точная история и порог остаются открытыми.

EN:

Moss hides carved symbols on stone or bark. Even without understanding their meaning, it is clear that they are arranged deliberately. Interpretation may later depend on Reason, Magic, or an authoritative School Arcana result; the exact lore and threshold remain open.

### Interpretation approach labels

| Neutral label key | RU source | EN |
| --- | --- | --- |
| `study-pattern` | Изучить рисунок | Study the pattern |
| `compare-marks` | Сравнить знаки | Compare the marks |
| `preserve-sample` | Сохранить образец | Preserve a sample |
| `use-arcana` | Применить знания Арканы | Use Arcana knowledge |
| `leave-undisturbed` | Оставить всё как есть | Leave it undisturbed |

A label that eventually depends on a fact/capability must use accepted typed/public ownership; the translation itself never supplies the missing ID.

---

# Route-binding guidance

This section is descriptive only and creates no new route/challenge mechanics.

## Logging road

Safe content pairings:
- `forest/challenge/physical/fallen-trunk`;
- `forest/challenge/physical/washed-bank`;
- `forest/challenge/navigation/crossed-tracks`;
- `forest/challenge/anomaly/old-symbols` near abandoned work marks.

## Hunter trail

Only after its production identity/gate is accepted.

Good authored pairings:
- crossed tracks;
- lost horizon;
- migration navigation;
- subtle markers.

No Hunter clue/capability is authored here.

## Old boundary

Safe presentation pairings:
- old symbols;
- stone ring;
- knot marks;
- altered sap.

Route access remains gated by `enter_old_boundary`. Challenge text does not consume the token.

## Generic deep forest

Any of the three challenge families may be presented when ownership under an authoritative route is explicit.

---

# Bilingual save/presentation contract

When these entries become production presentation:
- route/challenge IDs stay locale-neutral;
- the same persisted route/challenge state serves RU and EN;
- switching locale changes text only;
- resolved mechanics are not rerolled by locale change;
- media candidates remain shared;
- RU and EN alt/caption strings describe the same media candidate;
- no locale field becomes a gameplay condition.

## Product-blocked boundaries preserved

Still OPEN:
- Hunter production option ID;
- Hunter clue/public fact ID;
- Hunter capability/source/provider;
- Hunter threshold/reward;
- Old Boundary Token natural acquisition source;
- Old Boundary Token price if any;
- retained/consumed/turn-in semantics;
- final concrete challenge IDs;
- check formulas/thresholds;
- item consumption rules;
- School Arcana result ID/threshold;
- loot/lore/sample rewards.

## Item 124 completion boundary

This file supplies paired RU+EN source copy for:
- 4 logging-road scenes + reaction;
- 4 Hunter-trail scenes + reaction, without production activation;
- 4 old-boundary scenes + reaction;
- 4 generic deep-navigation scenes + reaction;
- 5 navigation challenge scenes + 5 approach labels;
- 5 physical challenge scenes + 5 approach labels;
- 5 anomaly challenge scenes + 5 approach labels.

All gameplay identity, mechanics and save semantics remain shared across locales.
