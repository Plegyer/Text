# Forest Route Invalid-State Safety Matrix v1

Status: expected behavior for missing/unsupported Forest route state at the presentation seam.

Current main:
`295e6fc74d235f0b7555794555a18373451e8b7e`.

## Matrix

| Input route state | Strict helper | Safe UI caller | Must never happen |
| --- | --- | --- | --- |
| `null` | accept | `activity/forest/route/default` | invent a selected route |
| `undefined` | accept | `activity/forest/route/default` | invent a selected route |
| `logging-road` | accept | `activity/forest/route/logging-road` | change gameplay state |
| `old-boundary` | accept | `activity/forest/route/old-boundary` | satisfy/consume the Old Boundary gate |
| empty string | reject invalid non-null state | neutral default fallback | build `activity/forest/route/` |
| unknown string | reject unsupported state | neutral default fallback | derive a new route identity |
| locale-suffixed string such as `logging-road-ru` | reject unsupported state | neutral default fallback | create locale-specific gameplay/presentation identity |
| guessed Hunter value | reject unsupported state | neutral default fallback | create `forest.route.hunter*` or matching semantic ID |

## Strict helper rule

The pure helper should have an exact closed mapping for current production:
- no selected route;
- `logging-road`;
- `old-boundary`.

Unsupported non-null values are not current production identities and should be rejected by the strict layer.

## Safe UI fallback rule

The rendering layer may catch/guard unsupported presentation state and use:
`activity/forest/route/default`.

Fallback means:
**presentation fallback only**.

It must not overwrite:
`run.flow.activity.internalState.routeId`.

## No Save mutation

Handling an invalid/missing route state must not:
- write a corrected value into Save;
- delete a route state;
- add an invented route;
- alter resolved option IDs;
- change Activity checkpoint/progress/endurance;
- touch inventory/world facts.

## No RNG

Invalid-state handling uses no:
- global RNG;
- Activity RNG.

## No result mutation

Fallback/rejection cannot change:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

## Old Boundary firewall

An unsupported state must never be “repaired” by:
- granting `enter_old_boundary`;
- adding/removing `old_boundary_token`;
- inventing token consume/retain behavior.

## Hunter firewall

Unknown values must never become a path to shipping a Hunter route accidentally.

No presentation helper may convert guessed strings into gameplay route IDs.

## Acceptance rule

Strict layer:
reject unsupported current route state.

Safe UI layer:
render neutral default.

Gameplay state:
unchanged in either case.
