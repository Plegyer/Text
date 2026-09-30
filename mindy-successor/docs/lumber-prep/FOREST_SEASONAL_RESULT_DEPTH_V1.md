# Forest Seasonal / Result Depth v1

Status: C3-32 content-side handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `05fa2d1084a48cab20d42f23885e19ee627d3d09`.
Fixture: `prior-work/astra/prototype-m3.2/content/forest-seasonal-result-depth-v1.fixture.json`.

## Scope

This task prepares additional RU/EN route/result presentation variants against the exact current Forest Activity identities audited in C3-31.

Existing route identities used:
- `forest.route.logging-road` -> `logging-road`;
- `forest.route.old-boundary` -> `old-boundary`.

Existing terminal result identities used:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Existing terminal result events used:
- `forest-result-content-v1.success`;
- `forest-result-content-v1.escape`;
- `forest-result-content-v1.failure`.

No new encounter/challenge identity is introduced.

## Seasonal route content

Four optional route-depth strings are prepared:
- spring Logging Road;
- summer Logging Road;
- autumn Old Boundary;
- winter Old Boundary.

Season here is presentation flavor only. There is no seasonal Forest mechanic, modifier, probability, route unlock or result change.

Old Boundary still requires its existing `enter_old_boundary` item capability. This bundle does not bypass or restate that gate.

## Result depth

Two optional text variants are prepared for each existing terminal outcome.

Success copy preserves:
- success identity;
- `lumber.forest.truth-known`;
- the existing success-only Lumber continuation.

Escape copy preserves:
- escape as voluntary retreat;
- no success career facts;
- no ending eligibility;
- no penalty/reward invention.

Failure copy preserves:
- failure as distinct from escape;
- no success career facts;
- no ending eligibility;
- no penalty/reward invention.

## Integration boundary

No selector is added by Chat 3.

These strings are safe handoff material only if an existing/shared presentation selector consumes them while keeping current Activity state authoritative.

Fallback remains current route/help/result copy.

## Exact non-scope

No changes to:
- Activity architecture;
- progress/endurance logic;
- route option IDs;
- item capability gates;
- result IDs/effects/world facts;
- Lumber career facts;
- ending conditions;
- Save/RNG;
- media;
- Secret Debt.

## C3-32 disposition

Ready:
- four RU/EN seasonal route variants;
- six RU/EN terminal result variants;
- exact current IDs and presentation attachments;
- explicit success/escape/failure separation.
