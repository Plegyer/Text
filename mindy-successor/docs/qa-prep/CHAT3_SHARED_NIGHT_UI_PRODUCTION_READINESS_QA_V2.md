# Chat3 shared Night UI production-readiness QA v2

Status: COMPLETE / GREEN_REBASED_SOURCE / 3_KEYS_SUPERSEDED

Current production main:
`3fc5495310e281cf5cbe52da3642000f1cb1fb05`
(post-PR53 global UI-shell merge).

Reviewed Chat 3 sources:
- `poverty-shared-ui-localization-v5.fixture.json`
  blob `e061eb89eb92ea0e8820ff58859c6596c0463f8e`;
- `shared-night-lodging-consumer-map-v2.fixture.json`
  blob `58aca29c9121d489d5601e9674c29d04b3e5a094`;
- `shared-night-lodging-ui-invariance-v1.fixture.json`
  blob `018d394d5190fe2496f2c98be5d2bb4596b4c232`;
- final copy review v6.

Current UI blob:
`30626e7fd68e6d92fcd01f0eb3bea1a1605002fb`.

## Exact key rebase after PR53

Original finalized Chat 3 fixture:
`20` keys.

Against current root:
- exact-identical shipped: 1;
- additive and still needed: 16;
- source keys now superseded by another shipped consumer ownership: 3;
- conflicting existing values: 0.

### Exact-identical / already shipped

`ui.result.chooseLodging`

PR53 ships and consumes this key already.

Do not add a second ownership copy.

### Superseded outer Sleep-panel keys

The original Chat 3 fixture proposed:
- `ui.night.panel.title`;
- `ui.night.panel.description`;
- `ui.night.panel.start`.

PR53 now localizes the same outer Sleep-panel seam with the shipped Chat 5 keys:
- `ui.sleep.title`;
- `ui.sleep.help`;
- `ui.sleep.startButton`.

Current app consumes the shipped `ui.sleep.*` keys.

Therefore the three `ui.night.panel.*` source keys are now:
`SUPERSEDED_FOR_THIS_CONSUMER`.

Do not root-load them merely as duplicate aliases.

### Remaining 16 additive keys

Still clean and consumer-relevant:
- `ui.night.eyebrow`;
- `ui.night.lodging.prompt`;
- `ui.night.nextDayEnergy`;
- `ui.night.choice.title`;
- `ui.night.choice.prompt`;
- `ui.night.choice.slot`;
- `ui.night.choice.select`;
- `ui.night.sequence.title`;
- `ui.town.lodgingToday`;
- `lodging.lodging.normal.label`;
- `lodging.lodging.cheap.label`;
- `lodging.lodging.street.label`;
- `housing.room.label`;
- `housing.hostel.label`;
- `housing.shelter.label`;
- `nightChoice.night.sleep.label`.

Missing RU:
`0`.

Missing EN:
`0`.

## Current consumer state

PR53 did not localize the NightFlow transaction surfaces.

Current app still hardcodes:
- `Night` eyebrow in Night stages;
- LodgingResolution heading/prompt/options;
- next-day Energy suffix;
- VoluntaryNightChoice heading/prompt;
- generic Night context/button;
- generic Night sequence heading;
- town lodging summary;
- housing display labels.

The generic Night-choice helper still already supports:
`nightChoice.<id>.label`.

Therefore `nightChoice.night.sleep.label` needs only root localization data, not new label-resolver architecture.

## Existing root keys to reuse

Continue reusing:
- `ui.panel.sleep`;
- `ui.town.sleep.subtitle`;
- `ui.town.noEnergyPrompt`;
- `ui.work.coins`;
- `ui.result.chooseLodging`.

## Mechanics expectations

Representative current Night/lodging expectations remain unchanged.

Normal lodging:
- cost 100;
- housing normal;
- lodging next-day Energy delta 0.

Cheap lodging:
- cost 50;
- housing cheap;
- lodging next-day Energy delta 0.

Street:
- cost 0;
- housing street;
- lodging next-day Energy delta -1;
- grooming -1 next-day effect.

Generic sleep:
- choice ID `night.sleep`;
- next-day Energy delta 0.

Localization must not change any of these.

## Save/RNG invariance

RU↔EN presentation switches must preserve:
- NightFlow phase;
- selected lodging ID;
- payment committed state;
- selected Night choice ID;
- money;
- housing state;
- next-day modifiers;
- RNG;
- serialized gameplay Save.

No locale switch may:
- charge lodging twice;
- apply street penalty twice;
- choose a Night action;
- advance day;
- consume gameplay RNG.

## School/Foreman boundaries

School Night Study remains on its School-specific localization path.

Foreman Night remains on:
`nightChoice.lumber.foreman.night.label`
with its existing mechanics.

Shared Night localization must not take ownership of either.

## Recommended selective Lead patch

Use a fresh current-main branch.

Copy/merge:
- the 16 remaining additive keys;
- no duplicate copy of `ui.result.chooseLodging`;
- no `ui.night.panel.*` aliases.

Wire only the still-hardcoded Night/lodging seams.

Required CI:
- normal/cheap/street RU↔EN;
- exactly-once payment/effects;
- same housing/next-day state;
- generic sleep label;
- School Night regression;
- Foreman Night regression;
- exact Save/RNG invariance;
- full exact-head CI;
- post-merge main CI.

## Verdict

`GREEN_REBASED_SOURCE / 3_KEYS_SUPERSEDED`.

The current production-ready shared Night slice is:
- 16 new keys;
- 1 already-shipped identical key to reuse;
- 3 obsolete-for-consumer keys to omit.
