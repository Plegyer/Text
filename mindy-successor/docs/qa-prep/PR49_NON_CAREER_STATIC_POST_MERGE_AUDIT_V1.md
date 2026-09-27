# PR49 non-career static post-merge audit v1

Status: COMPLETE / GREEN_POST_MERGE_MAIN

PR:
- #49 `Lead: refine non-career project-owned static media`
- base: `4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`
- exact head: `51e8fba20d5cc0c7d08fa5d7e814a678b4f514ee`
- merge SHA: `d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`

Current main at audit:
`d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`.

## Git merge evidence

PR state:
`closed`.

Merged:
`true`.

Current `main` points to the exact PR49 merge SHA.

## Production mapping set

Current root `content/presentation.json` contains exactly 27 refined current-production non-career mappings in the PR49 scope.

Groups:
- School current lesson/Night surfaces: 9;
- ordinary poverty: 10;
- Forest return/reaction: 6;
- Foreman professional/Night: 2.

Unique refined physical sources:
`27`.

All mappings retain their pre-existing semantic presentation IDs.

## RU+EN accessibility

PR49 adds the reviewed refinement accessibility set:
- 27 alt keys;
- 27 caption keys.

Total:
`54` RU+EN accessibility keys.

Current root localization total after PR49:
`401`.

For every active refined slot, its altKey has:
- non-empty RU;
- non-empty EN.

## Product-open route isolation

Current root presentation contains no:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

Current production asset directory contains no:
- `forest-route-logging-road.svg`;
- `forest-route-old-boundary.svg`.

PR49 regression explicitly requires both route-specific Product-open assets to remain absent from root production presentation.

## Exact-head CI

PR49 exact-head workflow:
- run #78;
- id `36345113971`;
- conclusion: SUCCESS;
- validator: 17 packs, 46 events, 35 actions, 9 endings;
- tests: 317;
- pass: 317;
- fail: 0.

Relevant exact-head regressions:
- `27 safe non-career semantic slots use refined project-owned static assets`;
- `safe non-career refinements preserve semantic identity and animation-mode independence`;
- `route-specific Product-open Forest assets remain absent from root production presentation`.

## Post-merge main CI

Main push workflow:
- run #79;
- id `36345257986`;
- event: push;
- head SHA: `d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`;
- conclusion: SUCCESS.

Validator:
- 17 packs;
- 46 events;
- 35 actions;
- 9 endings.

Tests:
- 317 total;
- 317 pass;
- 0 fail.

The same PR49 domain regressions pass on merged main.

## Gameplay drift

PR49 changes only:
- project-owned SVG assets;
- root presentation mappings;
- root localization;
- presentation/UI tests.

It does not edit:
- gameplay definitions;
- gameplay packs;
- engine command/effect logic;
- Save schema;
- route availability;
- School mechanics;
- poverty mechanics;
- relationship mechanics.

Gameplay validator counts remain unchanged.

## Verdict

`GREEN_POST_MERGE_MAIN`.

PR49 is production-accepted on current main with exact merge and successful post-merge CI evidence.
