# Chat 3 C3-97 Reachability Audit v10

Status: complete
Worker: Chat 3 / Forest + Poverty Content Bundles
Baseline main: `6afc01061646bc52cec824863bf89e8ad8c309d0`

## Scope

Current-main content-side reachability audit before queue-v10 depth work. No runtime, UI, Save, RNG, Activity mechanics, School, media or ending ownership changes.

## Forest findings

Current source-of-truth identities remain:
- Activity `lumber.forest`;
- route option `forest.route.logging-road` -> route `logging-road`;
- route option `forest.route.old-boundary` -> route `old-boundary`;
- Old Boundary capability `enter_old_boundary`;
- results `lumber.forest.success`, `lumber.forest.escape`, `lumber.forest.failure`;
- terminal events `forest-result-content-v1.success|escape|failure`;
- success-only Lumber continuation `lumber-cross.activity-forest-return`.

No new Activity, route, result, reward, penalty, progress/endurance, world/career fact or ending identity is required.

## Ordinary poverty findings

Current ordinary-poverty production packs remain independent from Secret Debt.

The existing poverty-depth selector consumes current production depth keys. New content may map to existing event/variant identities only; ambiguous variant-specific result prose remains preparation-only where the result screen cannot distinguish `variantId`.

## Reachability classification

- **Player-facing:** existing production content selected by current consumers.
- **Consumer-ready:** exact existing event/variant identities plus an already-existing selector seam.
- **Preparation-only:** fixture/localization prose with no exact current consumer selector.
- **Blocked by identity:** content that requires a distinction the persisted/current result identity does not expose.

## Integration boundary

Any missing shared consumer capability remains Chat 1 Developer / Integration ownership.

C3-98+ must preserve the current identity contract and ordinary-poverty / Secret-Debt separation.
