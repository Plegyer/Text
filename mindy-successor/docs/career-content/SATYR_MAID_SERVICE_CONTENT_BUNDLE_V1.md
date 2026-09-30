# Satyr Maid Service Content Bundle v1

Status: C3-16 content-side handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `32f48d15708a543ee26b90b78761da63b3363da2`.
Fixture: `prior-work/astra/prototype-m3.2/content/satyr-maid-service-content-v1.fixture.json`.

## Scope

This bundle deepens the four existing seasonal `satyr-maid.shift` scene identities and nothing else.

Existing gameplay identities consumed:
- action `satyr-maid.shift`;
- scenes `spring.default`, `summer.default`, `autumn.default`, `winter.default`;
- presentation IDs `job/satyr-maid/shift/<season>/default`;
- current typed stage `known-face` and fact `first-shift-complete` only as already-existing background state.

No guest relationship, flirt state, boundary state, reputation counter, new shift variant, threshold, wage, stat effect, NightFlow hook, item capability, ending or reward is introduced.

## RU/EN service copy

### Spring

Localization candidate:
`action.satyr-maid.shift.scene.spring.default.text`.

RU:
`Весной зал снова заполняют путешественники. Ты принимаешь простой заказ, освобождаешь край стола от мокрых плащей и успеваешь объяснить новому гостю, что сегодня подают быстрее всего. Это обычное обслуживание: короткий разговор заканчивается вместе с заказом.`

EN:
`In spring, travellers fill the room again. You take a simple order, clear wet cloaks from the edge of a table, and tell a new guest what the kitchen can serve fastest today. It is ordinary service: the brief conversation ends with the order.`

Content role:
new travellers + room reset + one-off guest contact.

### Summer

Localization candidate:
`action.satyr-maid.shift.scene.summer.default.text`.

RU:
`Летом подносы почти не успевают опустеть. Ты собираешь большой заказ сразу с двух столов, повторяешь его вслух, чтобы никто не спорил о кружках, и возвращаешься через шумный зал, пока следующая компания уже машет тебе от двери.`

EN:
`In summer, the trays barely have time to empty. You gather one large order from two tables, repeat it back so nobody argues about the mugs, and cross the noisy room again while the next group is already waving from the door.`

Content role:
high-volume service + large order.

### Autumn

Localization candidate:
`action.satyr-maid.shift.scene.autumn.default.text`.

RU:
`Осенний праздник делает обычную смену тесной и громкой. Один стол просит ещё места для блюда, соседний спорит, чей заказ был первым, и тебе приходится спокойно развести поток: переставить посуду, подтвердить очередь и не дать чужой спешке стать твоей ошибкой.`

EN:
`The autumn festival makes an ordinary shift crowded and loud. One table needs room for another dish while the next argues over whose order came first, so you keep the flow orderly: move the dishes, confirm the queue, and refuse to let someone else's rush become your mistake.`

Content role:
festival service + crowd handling + professional control.

### Winter

Localization candidate:
`action.satyr-maid.shift.scene.winter.default.text`.

RU:
`Зимой случайных гостей меньше, зато знакомые лица задерживаются дольше. Ты приносишь привычный заказ без лишней суеты, выслушиваешь пару бытовых замечаний о погоде и дровах и возвращаешься к работе, не превращая узнавание в обещание личной близости.`

EN:
`In winter there are fewer passing guests, but familiar faces stay longer. You bring a usual order without fuss, hear a few ordinary remarks about the weather and firewood, and return to work without turning recognition into a promise of personal closeness.`

Content role:
familiar guests without persistent relationship state.

## Guest boundary

The word “guest” in these scenes is descriptive only.

Current production has no:
- guest relationship ID;
- recurring guest event ID;
- guest counter;
- guest fact;
- guest-specific choice/effect.

Therefore:
- spring “new guest” is one-off flavor;
- summer groups are anonymous customers;
- autumn tables are anonymous service pressure;
- winter familiar faces are recognition flavor only.

No line promises a future meeting, relationship progression or guest persistence.

## Existing recognition stage

Current durable Satyr Maid recognition is only:
`known-face`.

C3-16 does not add a separate reputation mechanic.

The winter copy is compatible with the idea that the heroine may be recognized in the room, but it does not claim a threshold beyond the existing stage contract.

## Localization consumer seam

The current action already carries exact scene IDs.

Candidate keys follow the existing action-scene localization namespace:
`action.<actionId>.scene.<sceneId>.text`.

For this action that yields:
- `action.satyr-maid.shift.scene.spring.default.text`;
- `action.satyr-maid.shift.scene.summer.default.text`;
- `action.satyr-maid.shift.scene.autumn.default.text`;
- `action.satyr-maid.shift.scene.winter.default.text`.

Current shared UI localizes only the narrow single-default-scene path automatically. Multi-scene seasonal action localization consumption remains shared UI/integration work for Chat 1 / Lead.

Chat 3 does not modify that consumer.

Safe fallback:
if the candidate key is not consumed, the current source scene text remains valid.

## Exact non-scope

No changes to:
- `satyr-maid.shift` energy cost;
- wage base or stat weights;
- seasonal stat effects;
- first-shift transition;
- `known-face` stage semantics;
- `first-shift-complete` fact;
- relationships;
- flirt;
- boundary/reputation mechanics;
- NightFlow;
- School;
- media assets/presentation registry;
- Save/RNG;
- endings/rewards.

## C3-16 disposition

Ready for selective integration:
- four RU/EN seasonal service texts;
- exact scene/presentation mapping;
- explicit one-off guest semantics;
- shared localization-consumer handoff.

No gameplay identity is invented.
