# Secret Debt Current-Main Production Inventory v1

Status: exact current-main inventory. **CONTENT_BLOCKED for production Secret Debt identities.**

Current main:
`df0119fd6574b69ab89cf1a99ae77adae3d811f1`.

## Audit result

Exact production Secret Debt gameplay identities currently present:

- Secret Debt event IDs: **0**
- Secret Debt forced-Night event IDs: **0**
- Secret Debt result IDs: **0**
- Secret Debt ending IDs: **0**
- Secret Debt presentation IDs: **0**
- Secret Debt localization keys: **0**
- Secret Debt Journal-ref identities: **0**

No current production pack contains:
- `paid_freedom`;
- `bound_life`;
- `takeover`;
- a lender event;
- a hidden Slave/Secret Debt career event;
- a Secret Debt forced-Night event.

The current production handoff explicitly still lists Secret Debt content authoring and runtime/domain implementation as incomplete.

## Existing generic debt system — NOT Secret Debt

Current `definitions.json` contains generic debt/economy actions:

### `repay`

Purpose:
repay up to 10 coins of the existing generic `debt` metric.

Current condition:
`metric(debt) >= 1`.

Current effect:
`debt -10`.

This is a generic debt action, not the Secret Debt hidden-career route.

### `rent-room`

Purpose:
return to room housing after generic debt reaches zero.

Current conditions include:
- `debt == 0`;
- housing is not `room`.

This is housing/economy recovery, not Secret Debt activation or outcome resolution.

## Current generic debt localization

Exact root key:
`ui.bag.debtLabel`.

RU:
`Долг`.

EN:
`Debt`.

This is a generic metric label only.

It is not a Secret Debt content key.

## Current generic debt consumer seam

Current `src/ui/app.ts` bag panel renders:
- current `run.metrics.debt`;
- action list `['repay','rent-room']`.

There is no Secret Debt-specific consumer seam in the current UI.

## Current Night/event packs

Current packs with `nightPolicy` contain:
- ordinary poverty Night-phase events;
- `lumber-night.foreman-professional`.

None has Secret Debt ownership.

### Foreman Night event

Exact event:
`lumber-night.foreman-professional`.

Trigger:
`nightChoiceCompleted(lumber.foreman.night)`.

Source domain:
`lumber.foreman`.

This is relationship/professional Night content, not Secret Debt.

### Ordinary poverty Night events

The current street/cheap/recovery/pressure packs use ordinary poverty source domain and housing/season/day gates.

They remain separate from Secret Debt.

## Current endings

Current `definitions.json` has no Secret Debt ending identity.

No current ending uses:
- `paid_freedom`;
- `bound_life`;
- `takeover`.

## Current presentation registry

Current root `presentation.json` contains no Secret Debt semantic presentation ID or asset slot.

## Palace separation

Secret Debt is not a current ordinary profession action and is not present in the hardcoded current ten-profession UI roster.

Authoritative Product docs state:
- Palace requires Hard Work on all 10 ordinary professions;
- Secret Debt / hidden careers do not count.

## Inventory conclusion

Current main contains **generic debt mechanics** and **authored Secret Debt design/handoff documentation**, but it does **not** contain exact production Secret Debt event/result/ending/presentation/localization identities suitable for a production localization patch.

Items 295–303 must therefore avoid inventing gameplay IDs and remain CONTENT_BLOCKED where exact production identity is required.
