# Satyr Maid Boundary / Reputation Content v1

Status: C3-17 presentation-only content handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `32f48d15708a543ee26b90b78761da63b3363da2`.
Fixture: `prior-work/astra/prototype-m3.2/content/satyr-maid-boundary-reputation-content-v1.fixture.json`.

## Scope

Current production has no Satyr Maid boundary, flirt, guest-relationship or reputation state. C3-17 therefore prepares only RU/EN player-facing variants that can sit on the existing seasonal service identities.

No condition, effect, threshold, relationship, reputation score, NightFlow branch, ending or reward is added.

## Existing attachment surfaces

The bundle attaches only to:
- `spring.default`;
- `summer.default`;
- `autumn.default`;
- `winter.default`;

from the existing action:
`satyr-maid.shift`.

The only durable recognition identity used by the prose is the already-existing career stage:
`known-face`.

It remains a career stage, not a reputation mechanic.

## Professional boundary — spring

Candidate key:
`presentation.satyr-maid.depth.spring.professional-boundary.text`.

RU:
`Новый гость пытается задержать тебя у стола дольше, чем требует заказ. Ты спокойно объясняешь, что сначала обслужишь зал, и оставляешь разговор на уровне обычной вежливости — без ссоры и без обещаний продолжить его позже.`

EN:
`A new guest tries to keep you at the table longer than the order requires. You calmly explain that the room comes first and keep the exchange at ordinary politeness—without a quarrel and without promising to continue it later.`

This is service tone only. It does not write a boundary fact or relationship state.

## Voluntary light flirt — summer

Candidate key:
`presentation.satyr-maid.depth.summer.light-flirt.text`.

RU:
`Кто-то из посетителей отвечает на заказ шутливым комплиментом. Ты можешь поддержать лёгкий тон одной репликой, не меняя правил обслуживания: улыбка остаётся частью этого разговора, а не обещанием личной встречи.`

EN:
`One of the guests answers the order with a playful compliment. You can return the light tone with a single remark without changing the rules of service: the smile belongs to this conversation, not to a promise of a private meeting.`

The copy keeps flirt optional and local to the current scene. It does not create:
- consent state;
- romance state;
- guest persistence;
- private Night event;
- affection/reputation gain.

## Service boundary under pressure — autumn

Candidate key:
`presentation.satyr-maid.depth.autumn.service-boundary.text`.

RU:
`В праздничной толпе один из гостей начинает требовать внимания так, будто его стол важнее остальных. Ты называешь порядок заказов, повторяешь, что будет подано дальше, и возвращаешь разговор к услуге вместо спора о личном расположении.`

EN:
`In the festival crowd, one guest starts demanding attention as if his table matters more than the rest. You state the order of service, repeat what will come next, and bring the conversation back to the job instead of arguing about personal favor.`

This expresses professional control without inventing a boundary counter or House Rules progression.

## Recognition / known face — winter

Candidate key:
`presentation.satyr-maid.depth.winter.known-face.text`.

RU:
`Постоянные посетители уже узнают тебя и иногда обращаются по привычке именно к тебе. Это делает смену проще, но не создаёт отдельного счёта репутации: знакомое лицо остаётся текущим положением в работе, а не новой системой обещаний.`

EN:
`Regular patrons recognize you now and sometimes turn to you out of habit. That makes the shift easier to read, but it does not create a separate reputation score: being a familiar face remains your current place in the job, not a new system of promises.`

This text is compatible with the existing `known-face` stage but does not change stage eligibility or add a stage-conditioned scene selector.

## Flirt boundary

Current `sexuality` wage weighting is not treated as a flirt flag.

C3-17 does not infer:
- flirt success from Sexuality;
- consent from Sexuality;
- romance from Sexuality;
- guest interest from wage calculation;
- a Lust/Sexuality product decision.

The light-flirt copy is only an authored conversational tone variant.

## Reputation boundary

Current production has no:
- reputation metric;
- guest approval score;
- house reputation;
- boundary reputation;
- flirt reputation.

The phrase “known face” maps only to the existing career stage.

No numeric or hidden threshold is chosen.

## Consumer handoff

These four strings are handoff candidates only.

They may be consumed by a future shared presentation/content selector if Lead assigns one, but C3-17 does not add:
- a selector;
- action-scene conditions;
- gameplay RNG;
- event-history identity;
- Save state.

Safe fallback remains the C3-16 seasonal service text or the current source scene text.

## Exact non-scope

No changes to:
- action effects;
- wage/stat weights;
- career stages/transitions;
- relationships;
- NightFlow;
- items/capabilities;
- School;
- endings;
- media;
- shared runtime/UI;
- Save/RNG.

## C3-17 disposition

Ready:
- four RU/EN presentation-only boundary/flirt/recognition variants;
- exact attachment to existing Satyr Maid seasonal service scene IDs;
- explicit no-persistent-state rules.

Blocked as mechanics until exact gameplay identities exist:
- persistent guest route;
- flirt route;
- boundary progression;
- reputation system;
- relationship ending.
