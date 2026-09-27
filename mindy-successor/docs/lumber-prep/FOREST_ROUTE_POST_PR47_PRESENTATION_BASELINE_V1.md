# Forest Route Post-PR47 Presentation Baseline v1

Status: exact current-main presentation audit after PR #47.

Current main:
`7f27caca4e3e711799e9c1f235c4a27adbf31026`.

PR #47:
`Lead: activate project-owned static presentation media`.

No Product decision is made in this document.

## Active Forest Activity presentation request

Current shared Activity UI builds its presentation request from the Activity slug.

For `lumber.forest`, current `src/ui/app.ts` requests:

`activity/forest/route/default`.

This request is shared for the whole active Forest Activity and does not change when a route option sets:
- `logging-road`;
- `old-boundary`.

Post-PR47 `content/presentation.json` currently has **no slot** for:
- `activity/forest/route/default`;
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

Therefore PR #47 does not close the active-route presentation gap.

## Current gameplay route identities

Activity:
`lumber.forest`.

Current route options remain exactly:

### Logging road
- option ID: `forest.route.logging-road`;
- route state: `logging-road`;
- conditions: none;
- `progressDelta: 0`;
- `enduranceCost: 0`.

### Old boundary
- option ID: `forest.route.old-boundary`;
- route state: `old-boundary`;
- current gate:
  `itemCapability(enter_old_boundary) present=true`;
- `progressDelta: 0`;
- `enduranceCost: 0`.

No third route is present.

## PR47 result/return static coverage

PR #47 adds project-owned static Forest result presentation in `content/presentation.json`.

### Success

Slots:
- `activity/forest/return/success`;
- `job/lumber/event/forest-result-content-v1-success/default`.

Static asset:
`assets/presentation/forest-result-success.svg`.

Alt key:
`presentation.static.forest.result.success.alt`.

### Escape

Slots:
- `activity/forest/return/escape`;
- `job/lumber/event/forest-result-content-v1-escape/default`.

Static asset:
`assets/presentation/forest-result-escape.svg`.

Alt key:
`presentation.static.forest.result.escape.alt`.

### Failure

Slots:
- `activity/forest/return/failure`;
- `job/lumber/event/forest-result-content-v1-failure/default`.

Static asset:
`assets/presentation/forest-result-failure.svg`.

Alt key:
`presentation.static.forest.result.failure.alt`.

These are real project-owned static assets on current main.

## Existing result reaction pack

The shipped Forest result pack remains:
`content/packs/forest-result-content-bilingual-v2.json`.

Pack ID:
`forest-result-content-v1`.

Exact result reaction triggers remain:
- success -> `activityResult(lumber.forest, success, lumber.forest.success)`;
- escape -> `activityResult(lumber.forest, escape, lumber.forest.escape)`;
- failure -> `activityResult(lumber.forest, failure, lumber.forest.failure)`.

The pack’s embedded media still references the generic:
`assets/stage-forest.svg`.

PR47 presentation slots provide the project-owned static visual coverage at the semantic presentation layer without changing those gameplay/reaction identities.

## Route-specific presentation gap

Still missing on current main:
- route-state -> semantic presentation-ID mapping;
- root slots for logging road;
- root slots for old boundary;
- route-specific localized scene text consumption;
- route-specific alt/caption consumption;
- real route-specific GIF pools.

Safe proposed semantic presentation IDs remain:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

Those are presentation identities only and are not yet root-loaded slots.

## Static fallback boundary

Current real Forest static assets now include:
- `assets/presentation/forest-result-success.svg`;
- `assets/presentation/forest-result-escape.svg`;
- `assets/presentation/forest-result-failure.svg`;
- legacy/generic `assets/stage-forest.svg`.

The three result SVGs are outcome-specific and should not automatically be reused as active route art.

For route staging, `assets/stage-forest.svg` remains the neutral known Forest fallback until Lead adds an authoritative route slot and/or real route art.

## Product-open items unchanged

PR47 does not decide:
- Hunter route identity/gate/provider/reward;
- Old Boundary token acquisition/use semantics;
- challenge thresholds/rewards;
- School Arcana provider/fact;
- seasonal mechanical topology;
- deeper Forest lore outcomes.

## Locked invariants

Lumber Hard Work remains:
- eligibility ONLY `completed_shifts >= 50`;
- reward exactly `hardWork:lumber`.

Forest result identities remain:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

## Baseline conclusion

Post-PR47 current main has strong static coverage for Forest **results/reactions**, but the active Forest **route** still uses one shared unresolved presentation request and has no route-specific presentation slots.

The next safe presentation integration is route-state -> existing semantic presentation ID wiring for the two current route identities only.
