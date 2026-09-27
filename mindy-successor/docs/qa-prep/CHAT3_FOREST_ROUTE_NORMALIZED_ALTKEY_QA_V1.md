# Chat3 Forest route normalized-altKey QA v1

Status: COMPLETE / NORMALIZED_SOURCE_GREEN / ROUTE_SEAM_STILL_REQUIRED

Reviewed Chat 3 items:
`224–229`.

Current production main:
`d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`.

## Normalized route media localization

Fixture:
`forest-route-media-localization-normalized-v1.fixture.json`.

Blob:
`2fb69df11863160021927e6675e23977448f3abe`.

Exact normalized keys:
- `presentation.activity.forest.route.logging-road.alt`;
- `presentation.activity.forest.route.logging-road.caption`;
- `presentation.activity.forest.route.old-boundary.alt`;
- `presentation.activity.forest.route.old-boundary.caption`.

Verified:
- lowercase: YES;
- slash characters in localization keys: 0;
- all keys match `^[a-z0-9._-]+$`;
- missing RU: 0;
- missing EN: 0;
- current-root collisions after PR49: 0.

These keys are compatible with the shipped PR47 `altKey` schema.

## Presentation IDs retain slash form

Proposed semantic presentation IDs remain exactly:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

This is correct.

The localization-key schema restriction must not be applied to presentation IDs.

Current root production still has no route-specific slots under either proposed ID.

## Presentation content fixture

Item 226 preserves exact current gameplay route identities:
- `forest.route.logging-road` -> route state `logging-road`;
- `forest.route.old-boundary` -> route state `old-boundary`.

Presentation text/help/alt/caption is additive and locale-neutral by key.

No route is created or selected by localization.

## Static-source compatibility

Chat 3 item 227 reviews Chat 2 route assets.

Classification:
- generic route/default asset: visually safe neutral source;
- logging-road route-specific asset: `VISUALLY_SAFE_IF_SEAM_SHIPS`;
- old-boundary route-specific asset: `TOO_SPECIFIC / NEEDS_GENERIC_FALLBACK`.

The old-boundary source includes a constructed crossbar/post-like feature not established by the safe stones/marks semantics.

Therefore:
- logging-road asset may remain source-only pending the seam;
- old-boundary asset should not be activated without revision/Product approval;
- neutral route/default fallback is preferred meanwhile.

## Locale invariance expected-state fixture

Item 228 keeps the same:
- route option ID;
- route state;
- Activity ID;
- result identities;
- Save fields;
- global RNG;
- Activity RNG.

RU and EN differ only in route text/alt.

Presentation lookup is explicitly marked as:
- no Save write;
- no global RNG advance;
- no Activity RNG advance.

## Current authoritative gameplay invariants

Current main confirms:
- Activity: `lumber.forest`;
- logging road has no condition;
- old boundary requires `itemCapability(enter_old_boundary) present=true`;
- both route options have `progressDelta: 0`;
- both route options have `enduranceCost: 0`.

Results remain:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Exact result reactions remain:
- `activityResult(lumber.forest, success, lumber.forest.success)`;
- `activityResult(lumber.forest, escape, lumber.forest.escape)`;
- `activityResult(lumber.forest, failure, lumber.forest.failure)`.

## Item-229 documentation note

The prose/table intent in the item-229 result-continuation matrix is correct: both routes share the same exact three result identities and reaction triggers.

One failure-row table cell appears to substitute the reaction-trigger string where the exact result value should be `lumber.forest.failure`.

QA uses current production definitions/pack as authority and treats this as a documentation typo, not a gameplay/source change.

Before selectively copying item 229 as authoritative documentation, correct that row.

## Hard Work invariant

Current Lumber Hard Work remains:
- only condition: `completed_shifts >= 50`;
- Meta reward: `hardWork:lumber`.

No route, item, Hunter, School or relationship condition is added.

## Production activation boundary

Route-specific text/media remains:
`SOURCE_ONLY`
until Lead ships and tests a route-state -> presentationId seam.

The normalized localization keys themselves are valid source now.

Do not activate route-specific assets merely because the keys are schema-compatible.

## Verdict

- normalized alt/caption localization: `GREEN_SOURCE`;
- route presentation IDs: `CORRECT_STABLE_FORM`;
- current-root collision: `NONE`;
- route/gameplay/Hard Work invariants: `UNCHANGED`;
- route-specific media activation: `WAITING_FOR_LEAD_SEAM`;
- old-boundary current SVG candidate: `NEEDS_REVISION_OR_PRODUCT_APPROVAL`.
