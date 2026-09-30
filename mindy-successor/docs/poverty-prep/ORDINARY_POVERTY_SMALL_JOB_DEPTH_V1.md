# Ordinary Poverty Small-Job Depth v1

Status: C3-44 content-side handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `14c59901fce0899aa05c62edf6ebc6c556547d43`.
Fixture: `prior-work/astra/prototype-m3.2/content/ordinary-poverty-small-job-depth-v1.fixture.json`.

## Scope

C3-44 adds six RU/EN variants around existing small-job/help/resource identities:
- summer errand;
- market-closing task;
- late-shade optional task;
- short cleanup;
- anonymous coin help;
- herb bundle.

## Exact effect boundary

The fixture records current positive-choice effects only as read-only compatibility snapshots.

C3-44 changes no money amount, item count, condition, choice, cooldown or NightFlow behavior.

## Persistent-system boundary

No scene creates:
- a profession;
- an employer relationship;
- a recurring contact;
- a patron;
- a debt;
- a recovery milestone.

Each paid task remains one-off.
Anonymous help remains anonymous.
The herb bundle remains the existing `herb` resource.

## Secret Debt separation

Ordinary help and paid tasks are not lender content.

No acceptance in this bundle:
- creates repayment;
- activates hidden debt;
- consumes a Secret Debt offer;
- creates hidden career state.

## Integration

Strings are presentation-only candidates against exact current event/variant/choice IDs.

Existing choices/effects and core fallback remain authoritative.

## C3-44 disposition

Ready:
- six RU/EN small-job/resource/help variants;
- exact current effect snapshots;
- explicit no-persistence/no-Secret-Debt boundary.
