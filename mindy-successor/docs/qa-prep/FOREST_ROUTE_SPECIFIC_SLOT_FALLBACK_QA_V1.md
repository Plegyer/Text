# Forest route-specific slot/fallback QA v1

Status: COMPLETE / GREEN_EXACT_HEAD / SAFE_NEUTRAL_FALLBACK

PR57 exact head:
`138c9889daf8e63dc280b1868e0e868a638111e1`.

Current shipped neutral fallback:
`activity/forest/route/default`.

Physical fallback asset:
`assets/presentation/forest-route-default-v1.svg`.

## Route-specific semantic slots

PR57 exposes generated catalog slots for:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

For each generated slot:
- `baseMediaIds = []`;
- `fallbackId = activity/forest/route/default`.

No route-specific asset is activated by PR57.

## Resolution behavior

Exact-head regression resolves both route-specific IDs with:
- animations enabled;
- animations disabled.

Until a specific media/static override exists, both resolve to:
- requestedId = route-specific ID;
- selected slot = `activity/forest/route/default`;
- selected src = `assets/presentation/forest-route-default-v1.svg`.

This is the correct presentation fallback chain.

## Missing asset safety

A missing route-specific visual must not:
- throw;
- block Activity actions;
- clear route state;
- change route availability;
- rerun route selection;
- change progress/endurance;
- change result;
- consume RNG.

The requested semantic ID can remain route-specific while the selected physical visual comes from the neutral default.

## Gameplay separation

The fallback mechanism is presentation catalog resolution only.

It cannot authorize:
- Old Boundary entry;
- token acquisition/use;
- Hunter semantics;
- challenge/reward;
- result changes.

Route state remains gameplay-owned.

## Locale invariance

PR57 renderer smoke switches RU -> EN after logging-road selection.

Required/observed:
- requested presentation ID remains route-specific;
- resolved physical slot remains default;
- physical SVG remains default;
- gameplay Save unchanged;
- Activity state unchanged.

Thus locale does not affect fallback selection.

## Future route-specific asset integration

When safe route-specific static assets are integrated:
- keep the same semantic IDs;
- keep `fallbackId = activity/forest/route/default`;
- add project-owned static media only;
- preserve animations-off/static fallback behavior;
- missing/broken specific media must still degrade to neutral default.

No gameplay code should depend on asset presence.

## Exact-head CI

PR57 run #105:
- 351/351;
- validator 17/46/35/9.

Fallback regression PASS:
`route-specific IDs resolve through the shipped neutral default until specific media exists`.

## Verdict

`GREEN_EXACT_HEAD / SAFE_NEUTRAL_FALLBACK`.

Route-specific semantic identity and physical asset availability are correctly decoupled.

Missing route-specific assets cannot break Forest gameplay.
