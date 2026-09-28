# Night / Forest Post-Journal-Consumer QA Matrix v1

Status: acceptance matrix to run after the Lead locale-neutral journal/lastAction reference consumer ships.

Current Chat 3 baseline:
`3fc5495310e281cf5cbe52da3642000f1cb1fb05`.

This document does not implement the consumer.

## Scope

Validate together:
- ordinary-poverty localized journal rendering;
- Forest result/reaction localized journal rendering;
- lastAction localized title/text;
- shared Night/lodging localization;
- Forest route presentation identity;
- unchanged gameplay effects, RNG and Save identity.

## Ordinary-poverty journal checks

Expectation source:
`content/poverty-journal-localization-expectation-v2.fixture.json`.

For every current ordinary-poverty resolved choice:
1. resolve the event through the normal gameplay path;
2. capture stable event ID + choice ID/reference;
3. capture effects/resources/stats/items/RNG/Save state;
4. render Journal and lastAction in RU;
5. switch locale to EN;
6. render the same stored resolution in EN;
7. switch back to RU;
8. confirm gameplay state is unchanged.

PASS when:
- RU uses exact `event.<eventId>.choice.<choiceId>.text` RU;
- EN uses the same key EN;
- lastAction title uses `event.<eventId>.title` for active locale;
- selected choice/effects are not replayed;
- event history identity is unchanged.

## Forest journal checks

Expectation source:
`content/forest-journal-localization-expectation-v2.fixture.json`.

Cover:
- success reaction return choice;
- escape reaction return choice;
- failure reaction return choice.

PASS when:
- Journal/lastAction RU and EN use the same stable Forest event/choice identity;
- locale switching changes strings only;
- no duplicate reaction event occurs;
- no extra world fact/effect is applied.

## Forest result continuity

Exact continuations must remain:

Success:
`activityResult(lumber.forest, success, lumber.forest.success)`.

Escape:
`activityResult(lumber.forest, escape, lumber.forest.escape)`.

Failure:
`activityResult(lumber.forest, failure, lumber.forest.failure)`.

PASS when localized journal rendering has no authority over result selection or reaction matching.

## Night/lodging invariance

Expectation sources:
- `content/shared-night-ui-localization-v6.fixture.json`;
- `content/shared-night-ui-consumer-map-v3.fixture.json`;
- `content/shared-night-ui-natural-path-v2.fixture.json`.

Representative paths:
- normal room -> sleep;
- cheap lodging -> sleep;
- street -> sleep.

For each:
1. enter LodgingResolution naturally;
2. capture money, housing, next-day queue, NightFlow state and RNG;
3. render RU;
4. switch to EN;
5. choose the same lodging/nightChoice identity;
6. reload;
7. verify exact authoritative consequence.

PASS when:
- lodging ID is unchanged;
- Night choice ID is unchanged;
- money cost is unchanged;
- housing assignment is unchanged;
- next-day Energy/effects are unchanged;
- locale switch itself writes no gameplay Save field.

## Shared UI-shell overlap check

`ui.result.chooseLodging` is already globally owned on current main and exact-identical to the prior Chat 3 proposal.

PASS when:
- Chat 3 patch does not duplicate/overwrite it;
- the current global shell consumer continues to render it.

For `ui.night.panel.*`, current global shell uses:
- `ui.sleep.title`;
- `ui.sleep.help`;
- `ui.sleep.startButton`.

PASS when integration does not create competing visible strings at the same seam without an explicit Lead choice.

## Forest route presentation QA

Expectation sources:
- `FOREST_ROUTE_PURE_PRESENTATION_FUNCTION_CONTRACT_V4.md`;
- `content/forest-route-presentation-test-vectors-v1.fixture.json`;
- `content/forest-route-localization-delta-v7.fixture.json`.

PASS transitions:
- no route state -> `activity/forest/route/default`;
- `logging-road` -> `activity/forest/route/logging-road`;
- `old-boundary` -> `activity/forest/route/old-boundary`.

For each transition:
- Save before/after presentation lookup unchanged;
- global RNG unchanged;
- Activity RNG unchanged;
- route state unchanged;
- progress/endurance unchanged.

## Route copy / visual QA

Logging road:
- title/body/help/alt/caption match logging-road semantic ID;
- forestry visual source does not imply a gameplay benefit.

Old boundary:
- title/body/help/alt/caption use stones/marks/path-boundary semantics;
- reject any active source with constructed gate/arch/token/Hunter/reward implication.

If route-specific visual is unavailable:
- neutral default fallback renders;
- gameplay continues unchanged.

## lastAction acceptance

After an event choice:
- displayed title comes from stable event title localization;
- displayed text comes from stable choice-text localization;
- mechanical deltas remain from the already-resolved action/event;
- locale switch does not recalculate deltas.

After ordinary non-event actions:
- existing action-result behavior remains unaffected by journal-ref integration.

## RNG invariance

Compare before and after:
- locale switch;
- Journal render;
- lastAction render;
- route presentation-ID derivation.

PASS only if:
- `run.rng` is unchanged;
- active Activity RNG state is unchanged where applicable.

## Save identity

The locale/presentation consumer must not require locale-specific gameplay IDs.

PASS when Save contains the same:
- event IDs;
- choice IDs/references;
- route state;
- lodging ID;
- nightChoice ID;
- results;
- effects/resources;
- journal reference identity

across RU and EN.

## Reload stability

For poverty event, Forest reaction, Night path and active Forest route:
1. save after authoritative gameplay identity is fixed;
2. reload normally;
3. render RU;
4. render EN.

PASS when the same stable references and gameplay state survive.

## Lumber Hard Work firewall

Always recheck:
- ending `ending.lumber.hard-work`;
- eligibility ONLY `completed_shifts >= 50`;
- Meta reward exactly `hardWork:lumber`.

Journal/presentation work must add no route/item/School/relationship/challenge prerequisite.

## Product-open firewall

QA failure must not be “fixed” by inventing:
- Hunter route;
- Old Boundary Token acquisition/use;
- challenge reward;
- seasonal mechanics;
- School Arcana authority;
- deeper Forest lore.

## Acceptance result

The integrated consumer passes when RU/EN presentation can change freely while all previously resolved gameplay identity/effects/RNG/Save/result continuity remain identical.
