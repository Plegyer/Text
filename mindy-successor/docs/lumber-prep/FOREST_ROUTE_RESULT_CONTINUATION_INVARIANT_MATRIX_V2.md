# Forest Route Result-Continuation Invariant Matrix v2

Status: exact current-main invariant matrix for the two shipped Forest routes and all three Activity outcomes.

Current main:
`4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`.

This document records existing continuation identities only. It does not add challenge, reward, route, token, Hunter or result semantics.

## Activity identity

Forest Activity:
`lumber.forest`.

Current route options:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

Current route-state values:
- logging road -> `logging-road`;
- old boundary -> `old-boundary`.

## Exact route invariants

| Route option ID | Route state | Current gate | Result map |
| --- | --- | --- | --- |
| `forest.route.logging-road` | `logging-road` | none | success / escape / failure use the same exact Forest Activity result identities |
| `forest.route.old-boundary` | `old-boundary` | `itemCapability(enter_old_boundary) present=true` | success / escape / failure use the same exact Forest Activity result identities |

Route selection does not create a route-specific result namespace.

## Success continuation

Activity result:
`lumber.forest.success`.

Exact reaction trigger:
`activityResult(lumber.forest, success, lumber.forest.success)`.

Reaction event:
`forest-result-content-v1.success`.

Matrix:

| Route | Activity | Outcome | Exact result | Exact reaction identity |
| --- | --- | --- | --- | --- |
| `forest.route.logging-road` | `lumber.forest` | `success` | `lumber.forest.success` | `activityResult(lumber.forest, success, lumber.forest.success)` |
| `forest.route.old-boundary` | `lumber.forest` | `success` | `lumber.forest.success` | `activityResult(lumber.forest, success, lumber.forest.success)` |

No route-specific success result may replace this identity.

## Escape continuation

Activity result:
`lumber.forest.escape`.

Exact reaction trigger:
`activityResult(lumber.forest, escape, lumber.forest.escape)`.

Reaction event:
`forest-result-content-v1.escape`.

Matrix:

| Route | Activity | Outcome | Exact result | Exact reaction identity |
| --- | --- | --- | --- | --- |
| `forest.route.logging-road` | `lumber.forest` | `escape` | `lumber.forest.escape` | `activityResult(lumber.forest, escape, lumber.forest.escape)` |
| `forest.route.old-boundary` | `lumber.forest` | `escape` | `lumber.forest.escape` | `activityResult(lumber.forest, escape, lumber.forest.escape)` |

No route-specific escape result may replace this identity.

## Failure continuation

Activity result:
`lumber.forest.failure`.

Exact reaction trigger:
`activityResult(lumber.forest, failure, lumber.forest.failure)`.

Reaction event:
`forest-result-content-v1.failure`.

Matrix:

| Route | Activity | Outcome | Exact result | Exact reaction identity |
| --- | --- | --- | --- | --- |
| `forest.route.logging-road` | `lumber.forest` | `failure` | `lumber.forest.failure` | `activityResult(lumber.forest, failure, lumber.forest.failure)` |
| `forest.route.old-boundary` | `lumber.forest` | `failure` | `activityResult(lumber.forest, failure, lumber.forest.failure)` |

No route-specific failure result may replace this identity.

## Presentation seam rule

Future route presentation may map:
- `logging-road` -> `activity/forest/route/logging-road`;
- `old-boundary` -> `activity/forest/route/old-boundary`.

That mapping is presentation-only.

It must not:
- alter the Activity ID;
- alter the route state;
- rename a result;
- change outcome selection;
- suppress a result reaction;
- create a route-specific result event;
- advance gameplay RNG;
- mutate Save.

## Reload rule

After route selection and save/reload:
- selected route option identity must remain the same;
- route state must remain the same;
- available Activity continuation must remain the same;
- eventual success/escape/failure result identity must remain the same;
- presentation locale/media must not change the result path.

## Route-specific prose/media rule

Route text, alt/caption, static fallback or future GIF selection may differ between:
- logging road;
- old boundary;
- RU;
- EN.

The result continuation must not differ because of those presentation differences.

## Old Boundary firewall

The current old-boundary gate is recorded only as:
`itemCapability(enter_old_boundary) present=true`.

This matrix does not define:
- token acquisition;
- price;
- consumption;
- retention;
- turn-in;
- deeper Forest use;
- Hunter relation;
- lore result.

## Hunter/challenge firewall

No Hunter route or challenge is added.

Any future Hunter/challenge mechanics must not be inferred from this result matrix.

## Lumber Hard Work invariant

Unchanged:
- eligibility ONLY `completed_shifts >= 50`;
- reward exactly `hardWork:lumber`.

No Forest route/result is added as a Lumber Hard Work prerequisite.

## Acceptance invariant

For both shipped routes, all three outcomes must continue through the exact same established result namespace:

- success -> `lumber.forest.success`;
- escape -> `lumber.forest.escape`;
- failure -> `lumber.forest.failure`.

Only presentation may vary.
