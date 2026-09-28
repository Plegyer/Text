# Forest route pure presentation seam QA v3

Status: COMPLETE / GREEN_SOURCE / LEAD_IMPLEMENTATION_REQUIRED

Current production main:
`6e2a5147603b71eed89a0966af417a33dd28d7a7`
(PR54 merged).

Reviewed Chat 3 sources:
- `FOREST_ROUTE_PRESENTATION_SEMANTIC_ID_INVENTORY_V4.md`
  blob `72e6715d3e1e1455f968007262556d513993fe9a`;
- `FOREST_ROUTE_PURE_PRESENTATION_FUNCTION_CONTRACT_V4.md`
  blob `ab649b94b5b24ae8bcaff6f4fb240ff17741b390`;
- `forest-route-presentation-test-vectors-v1.fixture.json`
  blob `784741cb8c262cad71d710d6328e5440edbf309e`;
- `forest-route-presentation-seam-v4.test.ts`
  blob `b0fafbecd5e9123924e05f5b81e8bbe0cafec330`.

No production seam implementation is shipped by these worker artifacts.

## Authoritative input

Current Activity:
`lumber.forest`.

Authoritative presentation input:
`run.flow.activity.internalState.routeId`.

The presentation layer reads this field after gameplay has selected a route.

It must not write it.

## Exact pure mapping

Required mapping:

- `null` -> `activity/forest/route/default`;
- `undefined` -> `activity/forest/route/default`;
- `logging-road` -> `activity/forest/route/logging-road`;
- `old-boundary` -> `activity/forest/route/old-boundary`.

No locale argument is needed.

No RNG argument is needed.

## Invalid-state behavior

Worker test vectors correctly reject inventing route semantics.

For:
- `hunter-trail`;
- `logging-road-ru`;
- empty string

a strict helper may reject, or a safe caller may fall back to:
`activity/forest/route/default`.

It must not manufacture:
- a third gameplay route;
- a locale-suffixed route identity;
- a route-specific gameplay state.

## No Save writes

The mapping must not modify:
- Activity ID;
- route state;
- resolved option IDs;
- checkpoint;
- progress;
- endurance;
- inventory;
- world facts;
- history;
- NightFlow;
- ending state;
- journal refs.

PR54 journal/outcome refs are unrelated to this seam.

## No RNG

The worker regression source snapshots:
- global run RNG;
- Activity RNG.

Deriving the presentation ID is expected to leave both unchanged.

This is the correct contract.

Any future visual candidate selection must use presentation-owned deterministic logic, not gameplay RNG.

## No route mutation

Current exact gameplay options remain:

### Logging road
- option ID `forest.route.logging-road`;
- setRoute `logging-road`;
- no condition;
- progress delta 0;
- endurance cost 0.

### Old boundary
- option ID `forest.route.old-boundary`;
- setRoute `old-boundary`;
- gate remains:
  `itemCapability(enter_old_boundary) present=true`;
- progress delta 0;
- endurance cost 0.

The seam has no authority to:
- satisfy the gate;
- create/consume an item;
- change route availability;
- choose a route.

## Exact result invariance

Current result IDs remain:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Current exact reaction triggers remain:
- `activityResult(lumber.forest, success, lumber.forest.success)`;
- `activityResult(lumber.forest, escape, lumber.forest.escape)`;
- `activityResult(lumber.forest, failure, lumber.forest.failure)`.

The worker seam regression source verifies route-presentation derivation before continuing a successful natural path and checks these exact reaction triggers.

Presentation derivation must never select or alter an Activity result.

## Save/reload stability

The reviewed regression source:
1. enters current `lumber.forest`;
2. chooses an exact current route;
3. derives the expected route-specific presentation ID;
4. asserts serialized state unchanged by derivation;
5. reloads through `parseSave`;
6. requires the same route state and same derived presentation ID.

This is the correct reload contract.

## Locale invariance

For identical route state, RU and EN must derive the same semantic presentation ID.

Locale may change only:
- title;
- body;
- help;
- alt;
- caption.

Locale may not change:
- route state;
- route option identity;
- media semantic identity;
- result continuation;
- Save/RNG.

## Hard Work invariant

Current Lumber Hard Work remains exactly:

Condition:
`completed_shifts >= 50`.

Meta reward:
`hardWork:lumber`.

No Forest route, item, School, relationship or challenge prerequisite is added.

The worker seam regression source explicitly asserts this exact condition/reward pair.

## Fallback

Before route selection:
`activity/forest/route/default`
is already shipped with the neutral project-owned static.

If a route-specific slot/media is missing after route selection, safe fallback may use the neutral default without changing route gameplay state.

## Product-open firewall

The seam does not decide:
- Hunter route;
- Old Boundary token acquisition/consume/retain/turn-in;
- challenge thresholds/rewards;
- School Arcana provider;
- deeper Forest lore.

## Verdict

`GREEN_SOURCE / LEAD_IMPLEMENTATION_REQUIRED`.

The reviewed source defines a correct pure read-only mapping:
`authoritative route state -> locale-neutral presentation ID`
with no Save writes, RNG use, route/result mutation or Hard Work change.
