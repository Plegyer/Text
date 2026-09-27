# Forest route-presentation binding acceptance v1

Status: READY_FOR_FUTURE_LEAD_BINDING

Purpose:
define the QA contract for a future presentation-only binding between the already-persisted Forest route state and route-specific presentation IDs.

Current production authority:
- Activity: `lumber.forest`;
- neutral current route presentation slot: `activity/forest/route/default`;
- gameplay route option IDs:
  - `forest.route.logging-road`;
  - `forest.route.old-boundary`;
- persisted `internalState.routeId` values:
  - `logging-road`;
  - `old-boundary`.

## Allowed presentation binding

A future UI/presentation change may select a route-specific presentation identity from the existing persisted route state.

Recommended presentation-only identities:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

Before route selection, and as a safe fallback:
- `activity/forest/route/default`.

These are presentation identities only. They must not become new gameplay route IDs.

## No new gameplay route identity

The authoritative option IDs remain exactly:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

The authoritative persisted route values remain exactly:
- `logging-road`;
- `old-boundary`.

Reject any integration that creates a second gameplay route merely to obtain different art, for example:
- locale-specific route IDs;
- `forest.route.logging-road.v2`;
- `forest.route.old-boundary.presentation`;
- a separate Hunter-owned copy of either route.

Presentation routing must read existing state; it must not own state.

## Old Boundary capability boundary

Current Old Boundary option eligibility is:
`itemCapability(enter_old_boundary, present=true)`.

Current technical item seam:
- item: `old_boundary_token`;
- capability: `enter_old_boundary`.

A route-presentation patch must not decide or change:
- how the token is acquired;
- whether it is consumed;
- whether it is retained;
- whether it is turned in;
- any reward/lore progression attached to it.

Choosing or rendering old-boundary art must not itself consume or mutate the token.

The presentation layer may only observe the already-authoritative `routeId='old-boundary'`.

## No Hunter semantics

The ordinary `hunter.shift` career exists, but Hunter/Forest deeper semantics remain Product-open.

A Forest route presentation patch must not:
- add Hunter conditions;
- add Hunter facts/counters;
- rename the route as a Hunter route;
- create Hunter-specific result identities;
- infer a Hunter clue or token acquisition path.

Visual atmosphere cannot be used to promote unresolved Hunter mechanics.

## Save and RNG invariance

After the existing route-selection command has legitimately written `internalState.routeId`, choosing media from that value must not perform another gameplay command.

For the same serialized Activity state:
- repeated render => same route presentation ID;
- RU and EN => same route presentation ID;
- save/reload => same route presentation ID;
- animations on/off => same route semantic identity, with only media candidate/fallback differences.

Presentation lookup must not change:
- Activity progress;
- endurance;
- checkpoint;
- routeId;
- resources;
- items/capabilities;
- world facts;
- RNG state;
- history;
- result eligibility.

If deterministic media candidate selection is later used, it must use presentation occurrence identity rather than gameplay RNG.

## Forest result invariants

Route-specific art must not change result ownership.

Keep exact Activity results:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Keep exact Lumber continuation:
`activityResult(lumber.forest, success, lumber.forest.success)`.

A route presentation ID must never substitute for or derive a new Activity result.

## Presentation-slot contract

If route-specific slots are added to `presentationSlots(catalog)`:
- each slot must have a unique semantic presentation ID;
- fallback chain must remain acyclic;
- safe fallback should ultimately reach `activity/forest/route/default` or an existing town/static fallback;
- slot media must be local repository media;
- no gameplay fields may be added to presentation overrides.

Route-specific static assets can be integrated independently from future 3–5 GIF pools.

## Localization/accessibility

RU+EN may change only:
- alt text;
- caption/presentation copy.

RU+EN must not change:
- route selection;
- route ID;
- media asset identity;
- candidate key;
- Activity result;
- token capability.

Asset paths and presentation IDs remain locale-neutral.

## Required executable acceptance

A future Lead PR must cover both routes through current commands:

### Logging road
1. enter `lumber.forest`;
2. choose existing `forest.route.logging-road`;
3. verify persisted `routeId='logging-road'`;
4. verify route-specific presentation ID;
5. switch RU↔EN and assert serialized gameplay Save unchanged;
6. save/reload and verify same route presentation selection.

### Old Boundary
1. provide the already-existing capability through a valid test setup;
2. choose existing `forest.route.old-boundary`;
3. verify persisted `routeId='old-boundary'`;
4. verify route-specific presentation ID;
5. assert token count/capability is not modified by rendering;
6. switch RU↔EN and reload with gameplay state unchanged.

Also require regression that a player without `enter_old_boundary` still cannot choose the existing old-boundary option. Presentation code must not bypass eligibility.

## CI gate

Production acceptance requires:
- exact PR head;
- typecheck;
- validate;
- build;
- full tests;
- route-specific regression tests;
- unchanged gameplay content counts unless separately reviewed;
- post-merge main push success.

## Verdict

This contract permits route-specific Forest presentation while keeping the gameplay model fixed.

Allowed:
`existing route state -> presentation identity`.

Not allowed:
`presentation request -> new route mechanics/Product semantics`.
