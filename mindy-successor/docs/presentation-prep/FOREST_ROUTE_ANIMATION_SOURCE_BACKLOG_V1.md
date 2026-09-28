# Forest Route Animation Source Backlog v1

Scope:
future project-owned animation-source authoring for the two route-specific Forest presentation identities.

This backlog creates **no GIF files, no GIF paths, and no production animation claim**.

Static semantic anchors:
- `assets/presentation/forest-route-logging-road-v2.svg`;
- `assets/presentation/forest-route-old-boundary-v3.svg`.

Shared reduced-motion fallback chain:
route-specific slot -> `activity/forest/route/default`.

## Logging road

Semantic presentation ID:

`activity/forest/route/logging-road`.

Future source sequences:

### `forest-route-logging-road-loop-a`
Motion concept:
- wheel-rut dust/ground marks shift slightly;
- two cut branch tips settle;
- ambient light changes minimally.

### `forest-route-logging-road-loop-b`
Motion concept:
- small loose leaves cross the road;
- one branch pile settles;
- roadside foliage moves subtly.

### `forest-route-logging-road-loop-c`
Motion concept:
- broad road remains fixed;
- work-mark shadows shift slightly;
- a few wood-chip/leaf details move.

Allowed meaning:
ordinary logging road in progress.

Must not imply:
- success/failure;
- reward;
- route unlock;
- danger outcome;
- Hunter/token/challenge;
- gameplay duration.

Suggested first-wave structure:
- 4 SVG frames per sequence;
- 2.4–3.2 s normalized loop;
- 640×360 future GIF raster;
- infinite presentation loop after real export.

## Old boundary

Semantic presentation ID:

`activity/forest/route/old-boundary`.

Future source sequences:

### `forest-route-old-boundary-loop-a`
Motion concept:
- small leaves/mist drift across narrow path;
- weathered stone shading changes subtly;
- boundary stones remain fixed.

### `forest-route-old-boundary-loop-b`
Motion concept:
- grass and low foliage move;
- one or two loose leaves cross the stone line;
- no constructed structure appears.

### `forest-route-old-boundary-loop-c`
Motion concept:
- narrow path ambient light shifts;
- weathered markings remain visible;
- subtle dust/mist motion.

Allowed meaning:
old narrow boundary path marked by stones and weathering.

Must not depict or imply:
- constructed entrance/barrier;
- Hunter;
- token/key;
- challenge;
- reward;
- route success/failure;
- hidden result.

Suggested first-wave structure:
- 4 SVG frames per sequence;
- 2.8–3.6 s normalized loop;
- 640×360 future GIF raster;
- infinite presentation loop after real export.

## Source naming

Future frame source root:

`assets/presentation-frames/`.

Expected pattern:

`forest-route-<route>-loop-<a|b|c>-frame-<01..04>.svg`.

Each future frame should include:
- exact route-specific `data-presentation-id`;
- exact sequence key;
- frame index/count;
- authored source duration.

## Locale invariant

Frame/GIF identity is locale-neutral.

RU/EN only change:
- alt text;
- caption text.

Locale switch must not select another route or another animation candidate.

## Gameplay boundary

Animation authoring must not encode:
- route eligibility;
- item capability;
- progress/endurance;
- reward/effect;
- outcome;
- gameplay RNG;
- Save state.

## Current status

Logging-road static semantics:
**READY**.

Old-boundary static semantics:
**READY**.

Logging-road animation source sequences:
**FUTURE / 0 created**.

Old-boundary animation source sequences:
**FUTURE / 0 created**.

Actual GIF candidates:
**0**.
