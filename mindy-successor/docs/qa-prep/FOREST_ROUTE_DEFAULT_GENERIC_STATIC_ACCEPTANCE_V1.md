# Forest route/default generic static acceptance v1

Status: COMPLETE / GREEN_SAFE_INDEPENDENT_SOURCE

Reviewed Chat 2 items:
- 227 `forest-route-default-v1.svg`;
- 228 `forest-route-default-static-v1.json`.

Current production main:
`d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`.

## Exact current semantic identity

The record maps only to the already-current shared Forest Activity presentation identity:
`activity/forest/route/default`.

It does not invent:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

Current UI already requests the shared `activity/forest/route/default` during the active Forest route stage.

Therefore this asset can ship independently of any future route-state -> route-specific presentation seam.

## Physical asset

Source:
`assets/presentation/forest-route-default-v1.svg`.

Git blob:
`2405ace23316410db74a82daeb25aacbaf8580fd`.

The SVG is project-owned and local.

It contains:
- 1200×675 viewBox;
- neutral forest-path composition;
- no external media;
- no player-facing baked text.

## Semantic neutrality

The asset intentionally does not encode which current route was selected.

It contains no visual/data claim of:
- logging road;
- Old Boundary;
- Hunter;
- token ownership/use;
- challenge state;
- reward;
- success/escape/failure result.

It is suitable as a generic “route in progress” static fallback.

## RU+EN accessibility

Proposed stable keys:
- `presentation.static.forest.route.default.alt`;
- `presentation.static.forest.route.default.caption`.

Both contain non-empty RU and EN.

Meaning remains route-neutral:
- heroine follows a forest trail;
- no specific route or outcome is stated.

## Presentation-only data

Item 228 declares:
- existing presentationId only;
- one static asset path;
- alt/caption localization;
- no gameplay fields.

It does not add:
- condition;
- effect;
- reward;
- RNG;
- Save field;
- route state;
- Activity result.

## Route/gameplay firewall

Shipping this shared default must not change:
- availability of `forest.route.logging-road`;
- availability/gate of `forest.route.old-boundary`;
- `enter_old_boundary` capability semantics;
- persisted route value;
- Forest result identity;
- exact activityResult reaction;
- Lumber Hard Work.

## Reduced-motion / failure behavior

Because this is a static SVG fallback, it is compatible with animations disabled.

If future route-specific GIF/static media is missing, the shared default may remain the safe visual fallback without changing gameplay.

## Verdict

`GREEN_SAFE_INDEPENDENT_SOURCE`.

The generic project-owned Forest route/default SVG is safe to integrate independently on the exact existing `activity/forest/route/default` semantic slot.

It does not authorize or imply route-specific gameplay.
