# Forest Route Presentation ID Seam Contract v3

Status: minimal Lead-owned presentation seam contract for current Forest routes.

Current main baseline:
`5dffefd15703d431a604b4cc9f831c4e55460aed`.

No code change is made by this document.

## Current authoritative gameplay state

Activity:
`lumber.forest`.

Current route states:
- `logging-road`;
- `old-boundary`.

Current gameplay route IDs:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

Current shared presentation request before route selection:
`activity/forest/route/default`.

## Required derivation

Presentation ID must be derived from already-authoritative route state only.

Pseudo-contract:

- route state absent -> `activity/forest/route/default`;
- route state `logging-road` -> `activity/forest/route/logging-road`;
- route state `old-boundary` -> `activity/forest/route/old-boundary`;
- any unknown future route state -> safe shared default or explicit unsupported fallback, never a guessed gameplay route.

The presentation layer must not select or mutate the route.

## Before route selection

Use:
`activity/forest/route/default`.

This slot is now shipped with neutral project-owned static fallback.

The default image must remain semantically neutral and must not imply:
- logging-road selection;
- old-boundary selection;
- Hunter route;
- success/failure.

## After route selection

When authoritative
`run.flow.activity.internalState.routeId`
is already set:

### Logging road
derive:
`activity/forest/route/logging-road`.

### Old boundary
derive:
`activity/forest/route/old-boundary`.

No other gameplay state is needed for the derivation.

## No Save write

The derived presentation ID must not be stored as a new gameplay Save field.

It must be a read-only view of existing authoritative state.

Do not mutate:
- `activityId`;
- `internalState.routeId`;
- `resolvedOptionIds`;
- `progress`;
- `endurance`;
- `checkpoint`;
- inventory;
- world facts;
- event history;
- NightFlow;
- ending state.

## No RNG use

Presentation-ID derivation must consume:
- no global `run.rng`;
- no active Activity `rngState`.

If a future presentation pool needs deterministic visual/text variation, it must use presentation-owned deterministic logic rather than gameplay RNG.

## No route mutation

The seam must not:
- make a route available;
- hide a route;
- satisfy the Old Boundary capability gate;
- consume a token/item;
- rewrite route state;
- add a route result.

Old Boundary availability remains gameplay-owned:
`itemCapability(enter_old_boundary) present=true`.

## No result mutation

The seam must not alter:
- success -> `lumber.forest.success`;
- escape -> `lumber.forest.escape`;
- failure -> `lumber.forest.failure`.

Exact reaction boundaries remain:
- `activityResult(lumber.forest, success, lumber.forest.success)`;
- `activityResult(lumber.forest, escape, lumber.forest.escape)`;
- `activityResult(lumber.forest, failure, lumber.forest.failure)`.

## Locale behavior

RU and EN must share the same derived semantic presentation ID.

Locale changes:
- route text;
- help;
- alt;
- caption.

Locale must not change:
- gameplay route ID;
- route state;
- Save;
- RNG;
- result continuation.

## Fallback behavior

If a route-specific presentation slot is not root-loaded:
- use `activity/forest/route/default` fallback;
- keep route gameplay state unchanged.

Missing presentation assets must never break or reroute gameplay.

## Product-open firewall

The seam is not authority for:
- Hunter route creation;
- Old Boundary Token acquisition/use;
- challenge thresholds/rewards;
- School Arcana provider;
- seasonal topology;
- deeper lore.

## Acceptance summary

The correct seam is a pure mapping:

`authoritative existing route state -> presentation ID`

with zero gameplay side effects.
