# Forest route presentationId seam QA v1

Status: COMPLETE / GREEN_EXACT_HEAD / POST_MERGE_PENDING

Current production main at audit:
`4223be1f90f15a43938e072bc2171b0de5d2d1aa`.

Live Lead PR:
- #57 `Lead: add Forest route-specific presentation seam`
- base `4223be1f90f15a43938e072bc2171b0de5d2d1aa`
- exact head `138c9889daf8e63dc280b1868e0e868a638111e1`
- state: OPEN / NOT_MERGED.

## Pure presentation helper

PR57 adds:
`presentationIdForActivityRoute(cat, activityId, routeId)`.

For current `lumber.forest` it derives from the already-authored Activity option `setRoute` values.

Required/observed mapping:

- route absent/null -> `activity/forest/route/default`;
- `logging-road` -> `activity/forest/route/logging-road`;
- `old-boundary` -> `activity/forest/route/old-boundary`;
- unknown route -> safe `activity/forest/route/default`.

This uses current route definitions as authority rather than a new gameplay routing table.

## Unknown-state safety

The helper returns the neutral default when:
- activity is missing;
- route is absent;
- route value is not declared by a current Activity option.

It does not manufacture:
- Hunter route;
- locale-specific route;
- third gameplay route.

## Read-only behavior

The helper:
- reads catalog Activity options;
- returns a semantic presentation ID;
- does not receive Save as mutable input;
- does not write route state;
- does not call RNG;
- does not apply effects/rewards;
- does not resolve an Activity result.

Production regression serializes catalog before/after and requires no mutation.

## UI consumer

Active Activity rendering now calls the helper with:
`activity.internalState.routeId`.

Before route selection:
generic default.

After current route selection:
route-specific semantic ID.

The renderer does not persist the derived presentation ID into gameplay Save.

## Exact-head executable natural path

PR57 UI regression:
`renderer: Forest route presentation seam follows route state without save drift`.

It:
1. enters Explore;
2. enters `lumber.forest`;
3. confirms default presentation before route choice;
4. selects exact `forest.route.logging-road`;
5. confirms persisted route state `logging-road`;
6. confirms requested presentation becomes `activity/forest/route/logging-road`;
7. confirms current media still resolves through default fallback;
8. switches RU -> EN;
9. requires byte-identical gameplay Save and deep-equal Activity state.

## Exact current route gameplay

Route options remain:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

Old Boundary gate remains:
`itemCapability(enter_old_boundary) present=true`.

No PR57 diff changes:
- route conditions;
- option effects;
- progress;
- endurance;
- inventory/capability;
- Activity result.

## Result continuation invariance

Exact results remain:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Existing Forest production regression continues to pass exact `activityResult` boundaries.

No route-specific result ID is introduced.

## Hard Work invariance

Existing regression remains PASS:
Lumber Hard Work is false at 49 and eligible at exactly 50 completed shifts with no milestone, season, relationship or Forest prerequisite.

Locked reward remains:
`hardWork:lumber`.

## Exact-head CI

PR57 run #105:
- id `36405377265`;
- SUCCESS;
- validator 17 packs / 46 events / 35 actions / 9 endings;
- 351 / 351 tests.

Relevant PASS:
- `Forest route presentation seam exposes exact specific IDs with neutral fallback`;
- `route-specific IDs resolve through the shipped neutral default until specific media exists`;
- route helper presentation-only regression;
- `renderer: Forest route presentation seam follows route state without save drift`;
- existing Forest result/Hard Work regressions.

## Verdict

`GREEN_EXACT_HEAD / POST_MERGE_PENDING`.

The PR57 exact head implements the required safe pure mapping:
authoritative route state -> locale-neutral semantic presentation ID,
with unknown/absent route -> neutral default and no Save/RNG/result mutation.

Do not mark shipped until merge + successful main push CI.
