# Shared Night UI 16-key rebase QA v3

Status: COMPLETE / SHIPPED_GREEN

Current main:
`6e2a5147603b71eed89a0966af417a33dd28d7a7`
(PR54 merged).

Reviewed Chat 3 source:
`shared-night-ui-localization-v6.fixture.json`
blob `7d18d4c0cd03838c03a03169c00ea2981728e670`.

Consumer map:
`shared-night-ui-consumer-map-v3.fixture.json`
blob `f0fc13db4dc53d45db20ad2fc29154da68097084`.

Current app blob:
`7f8845d6515466ad7c5daeecf3c8fca7f470b1ed`.

## Source status

The worker fixture contains 19 keys after already excluding:
`ui.result.chooseLodging`.

Against current PR54 main:
- root collisions among the 19: 0;
- missing RU: 0;
- missing EN: 0.

However three of those 19 no longer have an active direct consumer because PR53 already owns the outer Sleep-panel shell.

## Omit superseded outer Sleep aliases

Do not integrate as duplicate aliases:
- `ui.night.panel.title`;
- `ui.night.panel.description`;
- `ui.night.panel.start`.

Current shipped consumers are:
- `ui.sleep.title`;
- `ui.sleep.help`;
- `ui.sleep.startButton`.

Those PR53 keys are authoritative for the outer pre-Night panel.

Adding parallel `ui.night.panel.*` aliases would create duplicate ownership with no active consumer.

## Reuse shipped result-to-lodging key

Do not copy a second ownership value for:
`ui.result.chooseLodging`.

It is already shipped by PR53 and consumed by the result screen.

The Chat3 source correctly lists it as reuse-only.

## Exact 16-key production slice

The genuinely additive, currently consumer-relevant keys are:

1. `ui.night.eyebrow`
2. `ui.night.lodging.prompt`
3. `ui.night.nextDayEnergy`
4. `ui.night.choice.title`
5. `ui.night.choice.prompt`
6. `ui.night.choice.slot`
7. `ui.night.choice.select`
8. `ui.night.sequence.title`
9. `ui.town.lodgingToday`
10. `lodging.lodging.normal.label`
11. `lodging.lodging.cheap.label`
12. `lodging.lodging.street.label`
13. `housing.room.label`
14. `housing.hostel.label`
15. `housing.shelter.label`
16. `nightChoice.night.sleep.label`

All 16 are absent from current root localization and therefore genuinely additive.

All 16 have non-empty RU and EN in the reviewed source.

## Consumer readiness

These keys map to still-hardcoded current seams:
- LodgingResolution stage/prompt/options;
- next-day Energy annotation;
- VoluntaryNightChoice stage/prompt/context/button;
- generic Night sequence title;
- town lodging summary;
- housing display labels;
- generic `night.sleep` label.

PR54 changes Journal/lastAction handling only and does not alter those Night consumers.

## Existing shared keys to reuse

Continue reusing:
- `ui.panel.sleep`;
- `ui.town.sleep.subtitle`;
- `ui.town.noEnergyPrompt`;
- `ui.work.coins`;
- `ui.result.chooseLodging`.

## NightFlow mechanics firewall

The localization slice must not change:
- NightFlow phase IDs/order;
- `chooseLodging` command;
- `chooseNightChoice` command;
- lodging IDs;
- lodging costs;
- housing values;
- payment-committed state;
- next-day Energy/effects;
- Night choice effects;
- RNG;
- Save schema.

## Current authoritative lodging mechanics

`lodging.normal`:
- cost 100;
- housing `normal`;
- next-day Energy delta 0;
- no next-day effects.

`lodging.cheap`:
- cost 50;
- housing `cheap`;
- next-day Energy delta 0;
- no next-day effects.

`lodging.street`:
- cost 0;
- housing `street`;
- next-day Energy delta -1;
- next-day grooming -1.

`night.sleep`:
- no immediate effect;
- next-day Energy delta 0.

These remain gameplay-owned and locale-neutral.

## School/Foreman ownership

School Night Study stays on the existing School-specific localization path.

Foreman Night stays on:
`nightChoice.lumber.foreman.night.label`
with its current relationship counter effect.

The 16-key shared slice does not replace either.

## Recommended selective integration

Fresh current-main branch only.

Copy:
- the 16 keys above.

Omit:
- 3 superseded `ui.night.panel.*` aliases;
- shipped `ui.result.chooseLodging`.

Then wire only the still-hardcoded Night/lodging consumers.

## Verdict

`GREEN_REBASED_16_KEY_SOURCE`.

The production-ready Chat3 Night/lodging localization payload is exactly 16 new keys with zero current-root collision and no NightFlow mechanic change.


## Subsequent production integration

Lead integrated this exact 16-key rebased slice as PR #55:
`Lead: localize shared Night and lodging UI`.

Base:
`6e2a5147603b71eed89a0966af417a33dd28d7a7`.

Accepted exact head:
`724ab70a5a83424fb8a576c3deb082b60256ffc0`.

Exact-head run #98:
- id `36402925719`;
- SUCCESS;
- validator 17 packs / 46 events / 35 actions / 9 endings;
- 342 / 342 tests.

PR55 production regression confirms:
- exactly 16 additive RU+EN keys;
- stable localization consumers;
- presentation-only payload.

Merged as:
`295e6fc74d235f0b7555794555a18373451e8b7e`.

Post-merge main run #99:
- id `36403132544`;
- SUCCESS;
- 342 / 342;
- validator 17 / 46 / 35 / 9.

Current classification:
`SHIPPED_GREEN`.
