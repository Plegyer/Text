# Chat 3 — Forest Product Slice v12 Status

Branch: `chat3/forest-product-slice-v12`
Stack base: PR #146 exact head `8fa771f212190e5ad9ba4145869d5ce0b04d2cf2`

## C3-121 live gap inventory

The v11 candidate had two Forest routes, four declared item capabilities, deterministic counter.v1 save/resume, and terminal result plumbing. It did not have Hunter Trail, natural acquisition paths for the four Forest items, real challenge families, seasonal topology, city preparation reads, or an extracted Forest object consumed by another live subsystem.

## v12 implementation decisions

The slice stays on the existing typed `counter.v1` Activity runtime. Hunter Trail is authored as a third route. Route/challenge availability reads typed stats, calendar seasons, career facts, world facts, and inventory-backed item capabilities. Natural city preparation is provided by Hunter-facing, Lumber-facing, relationship-gated actions plus a real School lesson reaction; School mechanics themselves are unchanged.

A preserved Forest specimen is not granted by prose. Every successful route requires the `preserve_specimen` extraction option mathematically: route challenges can reach progress 4, while success is 6 and generic advances exhaust Endurance before success without the extraction progress. The success result creates `forest_preserved_specimen`; the existing Lumber continuation requires and reads it, then records `forest-specimen-catalogued`. The specimen is intentionally retained because normal blocking choices must preserve the validator's free-exit invariant.

The Activity definition remains version 1 deliberately so existing active schema-v4 envelopes remain loadable. The new terminal thresholds do not make a previously valid active v1 envelope terminal on load.

## Exact small runtime seam for Chat 1

`counter.v1` has no typed `activityRoute` / `resolvedActivityOption` Condition and `availableActivityActions` exposes every eligible custom option while `routeId` is null. Chat 3 therefore cannot enforce a route-first UI phase without editing shared runtime. Each authored challenge carries the same `setRoute` as its route, so selecting a challenge before the explicit route button deterministically commits that route rather than faking progress in text. The smallest shared-runtime improvement is: while an Activity defines category `route` and `routeId === null`, expose only route-category custom options (plus escape); after route selection expose only compatible non-route options. No new Activity engine is needed.

This seam does not affect save determinism: `routeId`, resolved option IDs, checkpoint, and Activity RNG are already persisted in the existing envelope.
