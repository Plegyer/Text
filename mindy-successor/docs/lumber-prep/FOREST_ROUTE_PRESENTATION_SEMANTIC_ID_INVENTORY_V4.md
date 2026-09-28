# Forest Route Presentation Semantic-ID Inventory v4

Status: exact semantic presentation-ID inventory on current main after PR #53.

Current main:
`3fc5495310e281cf5cbe52da3642000f1cb1fb05`.

No new gameplay route is created here.

## Authoritative Activity

Activity ID:
`lumber.forest`.

Authoritative route-state source:
`run.flow.activity.internalState.routeId`.

Presentation must read this existing state only.

## Semantic presentation IDs

| Authoritative route state | Semantic presentation ID | Current status |
| --- | --- | --- |
| `null` / no route selected | `activity/forest/route/default` | shipped root presentation slot |
| `logging-road` | `activity/forest/route/logging-road` | route-specific semantic ID; shared derivation seam still required |
| `old-boundary` | `activity/forest/route/old-boundary` | route-specific semantic ID; shared derivation seam still required |

## Exact gameplay route IDs

Logging road:
`forest.route.logging-road`.

Old boundary:
`forest.route.old-boundary`.

These gameplay option IDs are not presentation IDs.

No third route exists in current production.

## Default presentation

Current root slot:
`activity/forest/route/default`.

Current project-owned static:
`assets/presentation/forest-route-default-v1.svg`.

This is the correct neutral presentation before authoritative route selection and the safe fallback when route-specific visual content is unavailable.

## Logging-road semantic identity

Gameplay option:
`forest.route.logging-road`.

Authoritative selected route state:
`logging-road`.

Presentation ID after selection:
`activity/forest/route/logging-road`.

Presentation may vary in RU/EN text/media, but the semantic ID itself is locale-neutral.

## Old-boundary semantic identity

Gameplay option:
`forest.route.old-boundary`.

Authoritative selected route state:
`old-boundary`.

Presentation ID after selection:
`activity/forest/route/old-boundary`.

Current gate remains gameplay-owned:
`itemCapability(enter_old_boundary) present=true`.

Presentation must not infer token acquisition/use from the route state.

## Derivation boundary

Correct direction:
`authoritative route state -> semantic presentation ID`.

Incorrect directions:
- presentation ID -> gameplay route selection;
- locale -> route state;
- media candidate -> route state;
- visual availability -> route outcome.

## Result boundary

Route presentation does not alter:
- success -> `lumber.forest.success`;
- escape -> `lumber.forest.escape`;
- failure -> `lumber.forest.failure`.

## Inventory conclusion

The exact current semantic set is three presentation identities:
- default;
- logging-road;
- old-boundary.

Only the first is currently root-loaded as an active slot. The route-specific IDs are ready presentation targets once the shared Lead-owned pure derivation seam ships.
