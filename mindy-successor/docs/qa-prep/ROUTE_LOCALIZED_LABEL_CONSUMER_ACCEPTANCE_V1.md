# Route localized-label consumer acceptance v1

Status: COMPLETE / ACCEPTANCE_CONTRACT_READY

Current main:
`54131488c65302f81b3001abaaa345d21f0281e2`.

## Current visible debt

The current Activity header/status line localizes the prefix:
`ui.activity.routeLabel`
but renders the persisted raw:
`activity.internalState.routeId`
as visible player text.

Current examples:
- `logging-road`;
- `old-boundary`.

This is stable gameplay state and must remain persisted exactly as-is, but it should not be shown directly to the player when an approved localized label exists.

## Existing approved labels

Current root already contains:

`activityOption.forest.route.logging-road.label`
- RU: `Лесовозная дорога`
- EN: `Logging road`

`activityOption.forest.route.old-boundary.label`
- RU: `Старая межевая тропа`
- EN: `Old boundary path`

Prefix:
`ui.activity.routeLabel`
- RU: `Маршрут`
- EN: `Route`.

No new route-label namespace is required for current Forest routes.

## Required consumer mapping

For an active Activity with routeId:
1. find the current Activity definition;
2. find its exact route option whose `setRoute === routeId`;
3. derive the stable option ID;
4. render:
   `activityOption.<optionId>.label`
   with the current option label as fallback.

For Forest:

`routeId=logging-road`
-> option `forest.route.logging-road`
-> localization key `activityOption.forest.route.logging-road.label`.

`routeId=old-boundary`
-> option `forest.route.old-boundary`
-> localization key `activityOption.forest.route.old-boundary.label`.

## Persisted identity remains unchanged

Localization must never rewrite:
`activity.internalState.routeId`.

Persisted values remain:
- `logging-road`;
- `old-boundary`.

Do not persist:
- `Лесовозная дорога`;
- `Logging road`;
- `Старая межевая тропа`;
- `Old boundary path`.

Localized text is a render-only view.

## Unknown route fallback

If routeId is present but no exact authored option maps to it:
- do not invent a localized semantic identity;
- render the raw routeId only as a safe fallback, or omit the visible route value if Product prefers;
- do not modify Save.

The presentationId seam may separately fall back to neutral route/default media.

Route-label lookup must not change route-media fallback behavior.

## RU↔EN invariant

From the same active Activity Save:
- RU may render `Маршрут: Лесовозная дорога`;
- EN may render `Route: Logging road`.

Require unchanged:
- routeId;
- Activity ID;
- checkpoint;
- progress;
- endurance;
- resolved option IDs;
- accumulated rewards;
- global RNG;
- Activity RNG;
- semantic presentationId;
- physical selected media for the same route occurrence.

Only visible label text may change.

## Save byte equality

A locale-only RU↔EN switch must leave serialized gameplay Save byte-identical.

No localized route label may be written to:
- Activity state;
- Journal;
- lastAction;
- history;
- presentation occurrence identity.

## Route option button consistency

Before route selection, the current route-option buttons already use the same:
`activityOption.<optionId>.label`
lookup.

The post-selection status line should reuse that existing label source so the player sees one semantic label before and after selection.

Do not introduce a second translation with different wording.

## Gameplay firewall

Localized route-label rendering must not:
- choose a route;
- satisfy the Old Boundary capability gate;
- consume an item;
- change progress/endurance;
- change Activity result;
- change activityResult reactions;
- affect Lumber Hard Work;
- consume RNG.

## Executable acceptance

Required renderer smoke:
1. enter current `lumber.forest`;
2. choose logging-road;
3. snapshot full serialized Save;
4. verify RU status line uses localized logging-road label;
5. switch EN;
6. verify EN status line uses the paired label;
7. assert exact same serialized Save;
8. assert routeId remains `logging-road`;
9. assert presentationId/media identity unchanged.

Repeat for Old Boundary using a test state that already legitimately has:
`enter_old_boundary`.

Do not grant the capability as part of localization code.

## Verdict

`ACCEPTANCE_CONTRACT_READY`.

Accept only:
`stable persisted routeId -> existing stable route-option ID -> localized display label`.

Reject:
localized label text becoming persisted route state.
