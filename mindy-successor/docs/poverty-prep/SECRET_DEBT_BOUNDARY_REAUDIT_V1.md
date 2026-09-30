# Secret Debt Boundary Re-audit v1

Status: C3-35 current-main content boundary audit.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `05fa2d1084a48cab20d42f23885e19ee627d3d09`.
Fixture: `prior-work/astra/prototype-m3.2/content/secret-debt-boundary-audit-v1.fixture.json`.

## Result

Current ordinary poverty and planned Secret Debt remain separate systems.

The six production ordinary-poverty packs do not:
- write the generic `debt` metric;
- create a lender;
- create a hidden career;
- contain Secret Debt offer/activation content;
- create Secret Debt endings.

Current ordinary-poverty recovery/help/small-work content therefore remains independently usable without Secret Debt.

## Legacy generic debt

Current production still contains a separate legacy/general debt surface:
- metric key `debt`;
- action `repay`;
- action `rent-room`;
- generic debt UI/localization.

This is not the Secret Debt hidden-career state contract.

Classification:
`NAMESPACE_STATE_COLLISION_RISK`.

Rule:
future Secret Debt implementation must not silently treat the generic debt metric/actions as the full hidden route state.

## Ordinary anonymous help

Current event:
`poverty-recovery-production.small-coin-help`.

It remains ordinary anonymous assistance.

It must not become:
- lender offer;
- debt acceptance;
- hidden obligation;
- recurring patron.

C3-34 copy explicitly preserves the no-obligation boundary.

## Ordinary small work

Current small-work events:
- `poverty-street-production.helpful-summer`;
- `poverty-street-production-v2.helpful-summer-shade`.

They remain ordinary paid opportunities.

Accepting those choices must not:
- create debt;
- create lender state;
- create a hidden career;
- consume a Secret Debt one-time offer.

## Shared street NightFlow seam

Ordinary street events use:
- `nightPhase: after_lodging`;
- `housingTier: street`.

A future Secret Debt offer may also need to originate from eligible street sleep, but no production Secret Debt event currently exists.

Classification:
`FUTURE_RESOLVER_ORDERING_DEPENDENCY`.

Any future implementation needs explicit approved:
- one-time state;
- offer eligibility;
- refusal/accept persistence;
- resolver priority/order;
- reload idempotency.

Chat 3 does not implement that runtime/state work.

## Product-open values

C3-35 does not choose:
- offer probability;
- offer amount;
- activation delay;
- future debt amount;
- forced Night penalty;
- hidden-career stat gains;
- career/outcome thresholds;
- buyout requirements;
- Meta rewards;
- School availability while bound;
- Activity availability while bound.

Historical draft examples remain non-authoritative.

## Current collision disposition

Active Secret Debt production collision:
`NONE`.

Risks that remain:
- generic debt namespace/state confusion;
- anonymous help semantic confusion;
- ordinary small-work semantic confusion;
- future resolver ordering on the street after-lodging seam.

These are boundaries to preserve, not permissions to add mechanics.

## Exact non-scope

No changes to:
- runtime/state model;
- Save schema;
- RNG;
- NightFlow;
- job availability;
- career state machine;
- endings;
- School;
- Activity;
- Product-open values.

## C3-35 disposition

Ordinary poverty remains independent and recoverable without Secret Debt.

Secret Debt remains design/handoff-only on current main. Any future implementation requires approved Product values and runtime/state identities outside Chat 3 ownership.
