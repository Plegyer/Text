# Route localized-label consumer acceptance v1

Status: COMPLETE / ACCEPTANCE_CONTRACT_SATISFIED_BY_PR62

Current main:
`1b0ea9dc3c10a8acb24df2ca2edd0e5f609dd515`.

## Required mapping

Persisted Forest route state remains:
- `logging-road`;
- `old-boundary`.

Player-visible selected-route text must resolve through the exact current option label:
- `logging-road` -> `activityOption.forest.route.logging-road.label`;
- `old-boundary` -> `activityOption.forest.route.old-boundary.label`.

Localized text must never replace the persisted routeId.

## PR62 implementation

PR #62:
`Lead: localize profession unlock and Forest route display labels`.

Accepted exact head:
`0b8c7e4b010426188a196decbc9a40cf58b64fc2`.

Merge:
`1b0ea9dc3c10a8acb24df2ca2edd0e5f609dd515`.

The Activity status now renders:
`activityOptionLabel('forest.route.' + activity.internalState.routeId, activity.internalState.routeId)`.

It also localizes a route checkpoint when the persisted checkpoint itself is a current `forest.route.*` option ID.

No route state is rewritten.

## RU↔EN acceptance

Current renderer regression proves for logging-road:
- RU shows `Маршрут: Лесовозная дорога`;
- EN shows `Route: Logging road`;
- raw `logging-road` is absent from visible dialogue;
- persisted routeId remains `logging-road`;
- media source remains the same;
- Activity RNG remains the same;
- run RNG remains the same;
- serialized gameplay Save remains byte-identical.

The same lookup contract applies to old-boundary through its existing bilingual option label.

## Gameplay/media firewall

PR62 does not change:
- Activity ID;
- route option IDs;
- route availability;
- Old Boundary gate;
- checkpoint persistence;
- progress/endurance;
- accumulated rewards;
- presentationId derivation;
- route static assets;
- Forest result identities;
- RNG;
- Save.

Current media remains:
- logging-road -> reviewed specific static;
- old-boundary -> reviewed v3 specific static;
- route/default -> neutral fallback.

## CI evidence

Exact-head run #125 / id `36411878494`:
- SUCCESS;
- validator 17 / 46 / 35 / 9;
- 375 / 375 tests.

Post-merge run #126 / id `36412267106`:
- SUCCESS;
- validator 17 / 46 / 35 / 9;
- 375 / 375 tests.

Relevant PASS:
- Forest persisted route IDs have bilingual display labels;
- route-specific renderer locale/Save/RNG invariance;
- all prior Forest route/result/Hard Work regressions.

## Verdict

`ACCEPTANCE_CONTRACT_SATISFIED_BY_PR62`.

Selected-route display is now localized from stable option identity while persisted routeId remains unchanged.
