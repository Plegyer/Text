# Current Content Reachability Inventory v1

Status: C3-61 current-main inventory.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `871a9a94e76e1df0449fdef513e9173bd9fce009`.
Fixture: `prior-work/astra/prototype-m3.2/content/chat3-current-content-reachability-v1.fixture.json`.

## Forest

Player-facing now:
- Forest entry body for default / Logging Road / Old Boundary;
- route option label/help/presentation surfaces;
- terminal success / escape / failure event copy;
- success-only Lumber continuation.

The Forest entry body is live through the current `activityNarrative(activityId, routeId)` consumer.

Preparation-only:
- `forest.logging-road-depth.v2`;
- `forest.old-boundary-depth.v2`;
- `forest.success-aftermath-depth.v2`;
- `forest.escape-failure-aftermath-depth.v2`;
- earlier `forest.seasonal-result-depth.v1`.

Those fixture strings are not selected by a current route/aftermath content consumer.

## Ordinary poverty

Player-facing now:
- production event/variant core copy from the existing poverty packs;
- the current poverty-depth rotation selected by `povertyPendingLocalizationKey()`.

Current `povertyDepth.ts` references 42 depth localization keys, and all 42 are present in root localization.

Consumer-ready:
- `ordinary-poverty.housing-depth.v2`;
- `ordinary-poverty.small-job-depth.v2`;
- `ordinary-poverty.contact-recovery-depth.v2`.

These three bundles already map to exact existing event/variant identities and can be selectively consumed by appending their keys to root localization and the existing poverty-depth lookup. They require no new gameplay/runtime capability.

## Classification rule

A merged fixture is not player-facing merely because it exists in Git.

- **PLAYER_FACING** means the current production consumer selects production localization/event content.
- **CONSUMER_READY** means exact existing identities and an existing consumer seam are sufficient, but the candidate keys are not yet published/selected.
- **PREPARATION_ONLY** means a content selector/consumer does not currently exist for that fixture family.

## C3-61 disposition

Forest v2 depth remains preparation-only.

Ordinary-poverty v2 depth is consumer-ready against the existing poverty-depth selector.

No runtime/UI/localization change is made by C3-61.
