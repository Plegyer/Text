# Ordinary Poverty Recovery / Contact Depth v1

Status: C3-34 incremental content-side handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `05fa2d1084a48cab20d42f23885e19ee627d3d09`.
Fixture: `prior-work/astra/prototype-m3.2/content/ordinary-poverty-recovery-contact-depth-v1.fixture.json`.

## Scope

C3-34 expands existing ordinary-poverty recovery/help/small-work content without inventing persistent contacts or a recovery state machine.

Exact current identities used:
- `poverty-recovery-production.small-coin-help / default`;
- `poverty-recovery-production.short-cleanup / default`;
- `poverty-recovery-production.herb-bundle / default`;
- `poverty-street-production.helpful-summer / default`;
- `poverty-street-production-v2.helpful-summer-shade / market-closing`;
- `poverty-street-production-v2.helpful-summer-shade / late-shade`.

## Current-effect boundary

The fixture records current positive-choice effects only as compatibility snapshots:
- existing money gains on the paid work/help choices;
- existing `herb` item addition on the herb bundle.

C3-34 does not change those effects or promote the numbers into new Product decisions.

## Contact boundary

Every human interaction remains one-off.

No scene creates:
- a contact list;
- a recurring helper;
- a patron;
- an employer relationship;
- a career fact;
- a relationship fact;
- a guaranteed future opportunity.

Anonymous coin help remains anonymous.

## Recovery boundary

The bundle does not create:
- `recovered`;
- `stabilized`;
- permanent housing;
- guaranteed future income;
- a poverty ending.

The content represents small current opportunities only. Existing money/items and future NightFlow lodging choices remain authoritative.

## Secret Debt boundary

No scene:
- names or implies a lender;
- creates repayment terms;
- activates hidden debt;
- makes ordinary help conditional on future obligation.

Ordinary poverty remains independent from Secret Debt.

## Integration

These six keys are append-only candidates for the existing poverty-depth presentation selector.

Integration must preserve:
- exact event/variant selection;
- exact current choice effects;
- deterministic presentation rotation;
- core fallback.

No new runtime capability is requested.

## Exact non-scope

No changes to:
- effects/rewards;
- relationship/career state;
- lodging/NightFlow;
- Save/RNG;
- media;
- Secret Debt runtime.

## C3-34 disposition

Ready:
- six additive RU/EN recovery/contact depth variants;
- exact event/variant/choice mappings;
- exact current-effect snapshots;
- explicit no-persistence/no-Secret-Debt boundary.
