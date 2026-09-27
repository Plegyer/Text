# Forest Route Post-PR49 Baseline v2

Status: exact current-main audit after PR #49.

Current main:
`d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`.

PR #49:
`Lead: refine non-career project-owned static media`.

## Current Forest gameplay identity

Activity:
`lumber.forest`.

Current route gameplay IDs remain exactly:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

### Logging road

Route option:
`forest.route.logging-road`.

Current route state:
`logging-road`.

Current conditions:
none.

Current route option effects:
- `progressDelta: 0`;
- `enduranceCost: 0`;
- `setRoute: logging-road`.

### Old boundary

Route option:
`forest.route.old-boundary`.

Current route state:
`old-boundary`.

Current authoritative gate:
`itemCapability(enter_old_boundary) present=true`.

Current route option effects:
- `progressDelta: 0`;
- `enduranceCost: 0`;
- `setRoute: old-boundary`.

No third route exists.

## Shared active-route presentation request

Current shared UI still requests:

`activity/forest/route/default`.

That request is used for the active Forest Activity envelope and is not currently replaced after route selection by:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

Therefore the route-state -> route-specific presentation seam remains absent.

## Current route-default static state

Exact current `content/presentation.json` contains **no** slot under:
- `activity/forest/route/default`;
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

Exact current-main tree also contains no root-loaded route-default/route-specific Forest SVG under the active presentation registry.

Therefore:
- current `activity/forest/route/default` is still an unresolved presentation request;
- no route-specific static source is active on current main;
- Chat 2 source-branch route assets remain source-only until separately integrated.

## Current result / reaction static state

PR #49 refined the shipped Forest return/reaction static media.

### Success

Return slot:
`activity/forest/return/success`.

Static:
`assets/presentation/forest-return-success-v2.svg`.

Reaction slot:
`job/lumber/event/forest-result-content-v1-success/default`.

Static:
`assets/presentation/forest-reaction-success-v2.svg`.

### Escape

Return slot:
`activity/forest/return/escape`.

Static:
`assets/presentation/forest-return-escape-v2.svg`.

Reaction slot:
`job/lumber/event/forest-result-content-v1-escape/default`.

Static:
`assets/presentation/forest-reaction-escape-v2.svg`.

### Failure

Return slot:
`activity/forest/return/failure`.

Static:
`assets/presentation/forest-return-failure-v2.svg`.

Reaction slot:
`job/lumber/event/forest-result-content-v1-failure/default`.

Static:
`assets/presentation/forest-reaction-failure-v2.svg`.

These result/reaction slots are separate from active-route presentation.

## Exact Forest result identities

Current Activity result IDs remain:
- success -> `lumber.forest.success`;
- escape -> `lumber.forest.escape`;
- failure -> `lumber.forest.failure`.

Current reaction events remain:
- `forest-result-content-v1.success`;
- `forest-result-content-v1.escape`;
- `forest-result-content-v1.failure`.

Exact reaction boundaries remain:

`activityResult(lumber.forest, success, lumber.forest.success)`

`activityResult(lumber.forest, escape, lumber.forest.escape)`

`activityResult(lumber.forest, failure, lumber.forest.failure)`

No route-specific result namespace exists or is needed.

## Route-specific presentation seam gap

Still missing:
1. read already-selected `activity.internalState.routeId`;
2. derive one of:
   - `activity/forest/route/logging-road`;
   - `activity/forest/route/old-boundary`;
3. resolve route-specific text/media presentation;
4. preserve Activity/route gameplay state, Save and RNG.

This is a shared presentation/UI seam, not a gameplay-content gap.

## Safe current content source

Chat 3 post-PR49 route source should remain presentation-only:
- current route IDs unchanged;
- current route states unchanged;
- current labels unchanged;
- route help/text/alt/caption additive only;
- no conditions/effects/rewards.

## Old Boundary firewall

Current production authority stops at:
`itemCapability(enter_old_boundary) present=true`.

This baseline does not define:
- token acquisition;
- price;
- provider;
- consume/retain/turn-in;
- Hunter relationship;
- lore result.

## Lumber Hard Work

Unchanged:
- eligibility ONLY `completed_shifts >= 50`;
- reward exactly `hardWork:lumber`.

No route/item/School/relationship/challenge prerequisite.

## Baseline conclusion

After PR #49:
- Forest result/reaction static media is active and refined;
- active Forest route presentation still has no root slot;
- the UI still asks for shared `activity/forest/route/default`;
- the two current route gameplay identities remain exact;
- the missing work is the route-state -> route-specific presentation seam only.
