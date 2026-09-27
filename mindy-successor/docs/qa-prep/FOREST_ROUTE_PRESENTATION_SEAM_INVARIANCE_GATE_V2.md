# Forest route presentation seam invariance gate v2

Status: COMPLETE / EXECUTABLE_ACCEPTANCE_CONTRACT

Current main:
`4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`.

Purpose:
accept a future Lead route-state -> presentationId seam without changing Forest gameplay.

## Authoritative current identities

Activity:
`lumber.forest`.

Route option IDs:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

Persisted route state:
- `logging-road`;
- `old-boundary`.

Current shared presentation request:
`activity/forest/route/default`.

Proposed route-specific presentation IDs:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

Those presentation IDs may be derived only after authoritative route selection.

## Route availability invariance

Logging road availability remains exactly current behavior.

Old Boundary current gate remains:
`itemCapability(enter_old_boundary) present=true`.

Presentation wiring must not:
- grant the capability;
- remove the capability;
- create/consume an item;
- change ordering/availability;
- bypass conditions.

## Save invariance

After current route selection writes route state:
1. snapshot serialized gameplay Save;
2. resolve the presentation ID;
3. resolve RU text/media;
4. switch to EN;
5. resolve EN text/media.

The serialized gameplay Save must remain identical throughout presentation lookup.

No presentation code may write:
- route state;
- Activity progress;
- endurance;
- inventory;
- facts;
- counters;
- result;
- NightFlow;
- history.

## RNG invariance

Snapshot:
- global run RNG;
- active Activity RNG state.

Route presentation resolution in RU/EN must not advance either.

If future media variation is deterministic, use presentation-owned deterministic selection, never gameplay RNG.

## Result identity invariance

Exact Activity results remain:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Presentation must not create route-specific result IDs.

## Exact activityResult continuation

Success reaction remains exactly:
`activityResult(lumber.forest, success, lumber.forest.success)`.

Escape and failure likewise remain bound to their exact current Activity/result IDs.

A route presentation ID has no authority over reaction selection.

## Hard Work invariant

Lumber Hard Work remains:
- ending ID `ending.lumber.hard-work`;
- only eligibility condition `completed_shifts >= 50`;
- reward `hardWork:lumber`.

Reject any route presentation patch that adds Forest/item/route/School/relationship prerequisite to Hard Work.

## Locale invariance

For the same persisted route state:
- RU and EN must resolve the same semantic presentationId;
- same physical static/media candidate;
- same candidate key;
- only route text/alt/caption may change.

Use normalized PR47-compatible altKeys:
- `presentation.activity.forest.route.logging-road.alt`;
- `presentation.activity.forest.route.old-boundary.alt`;
and matching caption keys.

## Logging-road executable path

1. enter `lumber.forest`;
2. choose exact `forest.route.logging-road`;
3. assert route state `logging-road`;
4. snapshot Save/RNG;
5. resolve `activity/forest/route/logging-road`;
6. switch RU↔EN;
7. assert Save/RNG/route state unchanged;
8. continue Activity;
9. assert same result for same gameplay path.

## Old-boundary executable path

1. prepare existing `enter_old_boundary` capability through valid test setup;
2. enter `lumber.forest`;
3. choose exact `forest.route.old-boundary`;
4. assert route state `old-boundary`;
5. snapshot item/capability/Save/RNG;
6. resolve `activity/forest/route/old-boundary`;
7. switch RU↔EN;
8. assert token/capability/Save/RNG unchanged;
9. continue Activity;
10. assert same result for same gameplay path.

Also verify a player without the capability still cannot choose old-boundary.

## Reload stability

After route selection:
- save;
- reload through normal parser;
- resolve route presentation again.

Require:
- same route state;
- same presentationId;
- same gameplay options/progress/endurance;
- no duplicated effect;
- no result drift.

## Static fallback

The current shared route/default presentation may receive neutral project-owned fallback art independently.

Route-specific missing media must not block the Activity.

Fallback behavior cannot change gameplay.

## Product-open firewall

Do not add through this seam:
- Hunter route;
- Old Boundary acquisition/consume/turn-in rules;
- challenge thresholds/rewards;
- School Arcana provider/result;
- seasonal route mechanics;
- deeper lore outcome.

## CI acceptance

Require on exact PR head:
- typecheck;
- validate;
- build;
- full tests;
- both route identity tests;
- Save/RNG invariance;
- Forest result regression;
- Hard Work regression.

Then require successful post-merge main push.

## Verdict

Allowed:
`existing persisted route state -> presentation-only semantic ID`.

Forbidden:
`presentation request -> new route/mechanic/result`.
