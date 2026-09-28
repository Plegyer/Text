# Forest route Old Boundary fallback transition QA v1

Status: COMPLETE / TRANSITION_IMPLEMENTED / GREEN_EXACT_HEAD

Current main:
`54131488c65302f81b3001abaaa345d21f0281e2`.

Current state:
- requested semantic ID after selecting Old Boundary:
  `activity/forest/route/old-boundary`;
- persisted routeId:
  `old-boundary`;
- selected physical slot:
  `activity/forest/route/default`;
- selected physical source:
  `assets/presentation/forest-route-default-v1.svg`.

Future target:
replace only the physical selected presentation with the reviewed safe Old Boundary v3 static.

## Identity must not change

Before and after asset activation, the requested semantic presentation ID remains exactly:
`activity/forest/route/old-boundary`.

Persisted gameplay route remains:
`activity.internalState.routeId = old-boundary`.

Do not introduce:
- a new route ID;
- a media-derived route ID;
- a locale-specific route ID.

## Expected presentation transition

### Before activation

Requested:
`activity/forest/route/old-boundary`.

Resolved slot:
`activity/forest/route/default`.

Physical source:
`forest-route-default-v1.svg`.

### After activation

Requested:
`activity/forest/route/old-boundary`.

Resolved slot:
`activity/forest/route/old-boundary`.

Physical source:
`forest-route-old-boundary-v3.svg`.

Fallback remains:
`activity/forest/route/default`.

Only the presentation resolution result changes.

## Accessibility identity

Reuse current PR59 keys:
- `presentation.activity.forest.route.old-boundary.alt`;
- `presentation.activity.forest.route.old-boundary.caption`.

The reviewed v3 source matches these exact RU+EN values.

Do not create a second accessibility namespace.

## Route gate unchanged

Old Boundary remains available only under the exact current condition:
`itemCapability(enter_old_boundary) present=true`.

Static activation must not:
- create the capability;
- grant an item;
- consume an item;
- bypass eligibility;
- expose the route to an ineligible Save.

## Activity state invariance

From the same post-selection Save, before/after media activation require identical:
- activityId;
- routeId;
- checkpoint;
- progress;
- endurance;
- steps;
- resolved option IDs;
- accumulated rewards;
- started day;
- Activity RNG state.

The presentation patch must not write any of these.

## Global Save/RNG invariance

Resolving/rendering the new asset must not change:
- serialized gameplay Save;
- global RNG;
- Activity RNG;
- inventory;
- world facts;
- career/quest/relationship state;
- Journal refs;
- lastAction;
- NightFlow.

## Result identity invariance

Current exact Forest results remain:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Exact activityResult reactions remain unchanged.

A route static must never choose or relabel the gameplay result.

## Lumber Hard Work invariance

Remain exactly:
- `completed_shifts >= 50`;
- meta reward `hardWork:lumber`.

No route-media requirement may enter Hard Work eligibility.

## Locale invariance

For the same old-boundary route occurrence:
- RU and EN select the same v3 physical SVG;
- same requested presentationId;
- same resolved route slot;
- same candidate identity;
- same fallbackId.

Only alt/caption/player text changes.

Locale must not reroll/select different media.

## Animation toggle

No route GIF exists today.

With v3 static activation:
- animations on -> same safe static;
- animations off -> same safe static.

Future GIF integration may add animation candidates, but static v3 remains the route-specific static fallback and route/default remains the next fallback.

## Missing/broken asset recovery

If the old-boundary v3 override is absent/invalid:
- resolution must degrade to neutral route/default;
- route gameplay remains intact.

Media failure must never clear routeId or block action progression.

## Build acceptance

On actual integration head:
- source SVG exists;
- build completes;
- `dist/assets/presentation/forest-route-old-boundary-v3.svg` exists;
- source/dist bytes equal.

## Executable natural-path test

Use a legitimate Save with `enter_old_boundary`.

1. enter `lumber.forest`;
2. choose exact `forest.route.old-boundary`;
3. assert routeId `old-boundary`;
4. snapshot Save and both RNG states;
5. assert requested ID old-boundary;
6. assert v3 physical source;
7. switch RU -> EN;
8. assert same media identity and exact Save/RNG equality;
9. continue to a current result;
10. assert exact current result/activityResult identity.

## Verdict

Accept only:
`same old-boundary gameplay state + same semantic presentationId -> safer route-specific physical static`.

No gameplay identity may move during the fallback transition.


## PR60 transition evidence

PR60 accepted exact head:
`36f933d8c01a249992d84295bc69c3d554bb1f89`.

Run #119:
- SUCCESS;
- 363/363;
- validator 17/46/35/9.

PR60 merged as:
`2ad9fb8b0572f8903bbf57d144c8c5938023a440`.

Current root transition is now real:

Before PR60:
- requested old-boundary semantic ID;
- resolved physical slot route/default.

After PR60:
- same requested old-boundary semantic ID;
- same persisted routeId;
- resolved physical slot old-boundary;
- physical source `forest-route-old-boundary-v3.svg`;
- route/default fallback retained.

Current exact-head regression confirms both routes use reviewed project-owned static media with neutral fallback metadata retained.

The first PR60 head exposed four stale pre-activation tests; Lead updated those expectations without weakening gameplay invariants.

Current classification:
`TRANSITION_IMPLEMENTED / GREEN_EXACT_HEAD`.

Post-merge run #120 remains required for final current-main production acceptance.
