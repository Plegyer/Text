# PR59 post-merge current-main audit v2

Status: COMPLETE / GREEN_POST_MERGE_MAIN

PR:
- #59 `Lead: activate safe Forest logging-road presentation`
- base: `52ddc76148e33836d3161b63bf4c25ffb5c39d02`
- accepted exact head: `01109fd08cece24308d3d9a64127b08e6fc5d702`
- merge SHA: `54131488c65302f81b3001abaaa345d21f0281e2`

PR59 immediate post-merge main:
`54131488c65302f81b3001abaaa345d21f0281e2`.

Current main later advanced by PR60 to:
`2ad9fb8b0572f8903bbf57d144c8c5938023a440`.

## PR59 shipped scope

PR59 activates one route-specific Forest static:
`activity/forest/route/logging-road`.

Physical source:
`assets/presentation/forest-route-logging-road.svg`.

Current logging-road slot:
- kind: image;
- local project-owned SVG;
- altKey: `presentation.activity.forest.route.logging-road.alt`.

PR59 also adds bilingual:
- logging-road route help;
- old-boundary route help;
- logging-road alt/caption;
- old-boundary alt/caption.

It does not activate an old-boundary route-specific root media slot.

## Current Forest route presentation state

### Neutral default

Current root:
`activity/forest/route/default`
-> `assets/presentation/forest-route-default-v1.svg`.

This remains the neutral fallback.

### Logging road

Current root:
`activity/forest/route/logging-road`
-> `assets/presentation/forest-route-logging-road.svg`.

Animations on/off both resolve the same safe static source because no route GIF pool exists.

### Old boundary

Current root contains no explicit:
`activity/forest/route/old-boundary`
static override.

The generated semantic slot remains available through the shipped PR57 route presentation seam and falls back to:
`activity/forest/route/default`.

Thus old-boundary currently keeps the neutral physical route/default asset.

## Route-state/UI behavior

The current Activity renderer derives presentation identity from the authoritative:
`activity.internalState.routeId`.

Before route choice:
- semantic ID = default;
- physical media = neutral default.

After choosing current logging-road:
- persisted routeId = `logging-road`;
- semantic presentationId = `activity/forest/route/logging-road`;
- physical media = logging-road project-owned SVG.

Locale switching does not write the derived presentationId into gameplay Save.

## Gameplay invariants

PR59 does not change:
- Activity ID;
- route option IDs;
- route conditions;
- route progress/endurance deltas;
- Old Boundary capability gate;
- result IDs;
- activityResult reactions;
- career counters;
- Lumber Hard Work;
- RNG;
- Save schema.

Current exact Old Boundary gate remains:
`itemCapability(enter_old_boundary) present=true`.

Current exact Forest results remain:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Current Lumber Hard Work remains:
- condition only `completed_shifts >= 50`;
- meta reward `hardWork:lumber`.

## Exact-head CI

Workflow:
- run #114;
- id `36407683010`;
- conclusion: SUCCESS.

Validator:
- 17 packs;
- 46 events;
- 35 actions;
- 9 endings.

Tests:
- 360 total;
- 360 pass;
- 0 fail.

Relevant PASS:
- exact Forest route presentation seam IDs;
- safe media or neutral fallback;
- logging-road safe static / old-boundary neutral fallback;
- Forest route localization presentation-only;
- logging-road natural route path;
- exact activityResult boundaries;
- exact 50-shift Lumber Hard Work;
- route-specific renderer RU↔EN Save/RNG invariance.

## Post-merge CI

Main push:
- run #115;
- id `36407870012`;
- head `54131488c65302f81b3001abaaa345d21f0281e2`;
- conclusion: SUCCESS.

Validator:
17 / 46 / 35 / 9.

Tests:
360 / 360 pass / 0 fail.

The same PR59 route-specific and locked gameplay regressions pass post-merge.

## Current root counts

Root localization:
- 664 keys;
- missing RU: 0;
- missing EN: 0.

Project-owned static root mappings:
- 81 semantic mappings;
- 80 unique active physical sources.

Route-specific physical media:
- logging-road: shipped;
- old-boundary: not shipped, neutral fallback.

## Verdict

`GREEN_POST_MERGE_MAIN`.

PR59 is production-accepted on current main.

Logging-road has a safe route-specific static.
Old-boundary deliberately remains on the neutral fallback.


## Superseding current-main note

PR60 subsequently activated the reviewed Old Boundary v3 static and passed:
- exact run #119: 363/363;
- post-merge main run #120: 363/363;
- validator 17/46/35/9.

Therefore the statement “Old Boundary uses neutral physical fallback” is correct for the audited PR59 merge state, but no longer describes latest main.

Latest main now has route-specific physical statics for both logging-road and old-boundary while retaining route/default fallback metadata.

PR59 itself remains fully accepted.
