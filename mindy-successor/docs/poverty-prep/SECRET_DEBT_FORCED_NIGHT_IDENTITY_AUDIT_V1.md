# Secret Debt Forced-Night Identity Audit v1

Status: exact production identity audit. **No Secret Debt forced-Night production identity currently exists.**

Current main:
`df0119fd6574b69ab89cf1a99ae77adae3d811f1`.

## Current Night policy identities

A scan of current production event packs finds Night-policy events in:
- ordinary poverty;
- Lumber Foreman relationship Night content.

None belongs to Secret Debt.

## Exact relationship Night event

Event:
`lumber-night.foreman-professional`.

Pack:
`lumber-night`.

Exact trigger:
`nightChoiceCompleted`
with choice:
`lumber.foreman.night`.

Current Night policy:
- intercept: `after_choice`;
- `suppressLodgingPayment: false`;
- `suppressVoluntaryMenu: true`;
- `consumesNight: true`.

Source domain:
`lumber.foreman`.

Condition:
relationship `lumber.foreman` at stage `route-professional`.

This identity is voluntary relationship/professional Night content and must not be reused for Secret Debt.

## Exact ordinary-poverty Night identities

Current ordinary-poverty packs use:
`nightPhase(after_lodging)`
reactions with source domain `poverty`.

Their current policies keep:
- `suppressLodgingPayment: false`;
- `suppressVoluntaryMenu: false`;
- `consumesNight: false`.

These are context events, not Secret Debt forced-Night obligations.

## Secret Debt audit result

Current production contains:
- Secret Debt Night event IDs: **0**
- Secret Debt Night choice IDs: **0**
- Secret Debt relationship IDs: **0**
- Secret Debt NightPolicy definitions: **0**
- Secret Debt activation trigger IDs: **0**

Therefore there is no exact production forced-Night identity that can be localized or patched.

## Runtime contract that exists without Secret Debt content

The generic NightFlow contract supports intercept points:
- `before_lodging`;
- `after_lodging`;
- `after_choice`.

It also supports Night-policy fields such as:
- `suppressLodgingPayment`;
- `suppressVoluntaryMenu`;
- `consumesNight`.

These are generic runtime capabilities.

They are **not** authority to choose a Secret Debt intercept point or policy.

## Do not invent

This audit does not select:
- a new NightFlow phase;
- Secret Debt event ID;
- Secret Debt Night choice ID;
- debt threshold;
- lender/master relationship ID;
- activation delay;
- forced-Night penalty;
- lodging suppression policy.

## Conclusion

Secret Debt forced-Night behavior remains Product/content/runtime-blocked.

Current exact Night identities must retain their existing ownership:
ordinary poverty and Lumber Foreman relationship content only.
