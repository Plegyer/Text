# Ordinary Poverty Seasonal Survival Depth v1

Status: C3-33 incremental content-side handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `05fa2d1084a48cab20d42f23885e19ee627d3d09`.
Fixture: `prior-work/astra/prototype-m3.2/content/ordinary-poverty-seasonal-survival-depth-v1.fixture.json`.

## Scope

This task adds ten RU/EN presentation variants to existing ordinary-poverty event/variant identities.

Coverage:
- spring street pressure;
- spring cheap shared-room context;
- summer small paid work;
- summer rest-or-task context;
- summer cheap shared-room heat;
- autumn neutral street shelter;
- autumn cheap shared-room quiet;
- winter street cold pressure;
- winter street wind pressure;
- winter cheap shared-room heat.

## Exact identity boundary

Every entry uses an existing production `eventId` and `variantId`.

No event, variant, choice, lodging tier, condition or effect is created.

The two small-work entries keep their exact existing positive-choice effects as read-only evidence:
- `take-errand` on `poverty-street-production.helpful-summer`;
- `take-small-task` on `poverty-street-production-v2.helpful-summer-shade`.

## Ordinary poverty independence

The content remains ordinary poverty.

No string:
- names a lender;
- creates debt;
- activates a hidden career;
- promises a Secret Debt route;
- turns low money or street lodging into automatic Secret Debt.

Street, cheap lodging, small work and ordinary survival remain independently readable.

## Housing boundary

Cheap/shared-room content describes one night of shelter only.

It does not create:
- a lease;
- permanent housing;
- a guaranteed room tomorrow;
- a recovery milestone.

Existing NightFlow lodging cost/state remains authoritative.

## Integration

The ten keys are append-only candidates for the existing poverty-depth presentation selector.

Integration must preserve:
- exact production event selection;
- exact production variant selection;
- current occurrence-count rotation;
- core event-text fallback;
- all existing choice effects.

No runtime capability is requested.

## Exact non-scope

No changes to:
- event conditions;
- choice effects;
- lodging costs;
- NightFlow;
- Save/RNG;
- media;
- Secret Debt state.

## C3-33 disposition

Ready:
- ten additive RU/EN seasonal survival variants;
- exact event/variant mappings;
- exact current-effect snapshots where money is involved;
- explicit ordinary-poverty/Secret-Debt separation.
