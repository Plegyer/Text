# Post-PR54 Forest Route Integration Baseline v11

Status: exact current-main route/presentation baseline after PR #54 journal/outcome localization.

Current main:
`295e6fc74d235f0b7555794555a18373451e8b7e`.

PR #54 adds locale-neutral Journal/lastAction event-choice refs. It does not change Forest route gameplay.

## Current Forest Activity

Activity ID:
`lumber.forest`.

Current route gameplay IDs:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

Route states:
- `logging-road`;
- `old-boundary`.

No third route is present.

## Current old-boundary gate

Exact:
`itemCapability(enter_old_boundary) present=true`.

No acquisition/use semantics are selected by current production.

## Generic route/default presentation

Current shared Activity UI still requests:
`activity/forest/route/default`.

Current root presentation slot exists for:
`activity/forest/route/default`.

Current project-owned static:
`assets/presentation/forest-route-default-v1.svg`.

Current default localization:
- alt key: `presentation.static.forest.route.default.alt`;
- caption key: `presentation.static.forest.route.default.caption`.

## Route-specific seam

Current shared UI does **not** yet derive:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`

from:
`run.flow.activity.internalState.routeId`.

Therefore the route-specific presentation seam is still absent.

## Result continuation invariants

Exact Activity results:
- success -> `lumber.forest.success`;
- escape -> `lumber.forest.escape`;
- failure -> `lumber.forest.failure`.

Exact reactions:
- `activityResult(lumber.forest, success, lumber.forest.success)`;
- `activityResult(lumber.forest, escape, lumber.forest.escape)`;
- `activityResult(lumber.forest, failure, lumber.forest.failure)`.

PR #54 Journal refs do not alter these identities.

## Current localization state

Already shipped:
- `activity.lumber.forest.label`;
- `activityOption.forest.route.logging-road.label`;
- `activityOption.forest.route.old-boundary.label`;
- Forest result event title/body/choice RU+EN;
- neutral default route static alt/caption RU+EN.

Still additive/not root-loaded:
- route-specific logging-road title/body/help/alt/caption;
- route-specific old-boundary title/body/help/alt/caption.

## Journal/outcome localization

Merged PR #54 now stores stable event-choice presentation refs for resolved event outcomes and renders Journal/lastAction from localization at read time.

This affects presentation only and does not create route-specific result identities.

## Lumber Hard Work

Unchanged:
- ending `ending.lumber.hard-work`;
- eligibility ONLY `completed_shifts >= 50`;
- Meta reward exactly `hardWork:lumber`.

## Baseline conclusion

Post-PR54:
- route gameplay is unchanged;
- neutral default route presentation is shipped;
- route-specific seam remains absent;
- result continuation remains exact;
- route-specific localization can be integrated independently as additive presentation data.
