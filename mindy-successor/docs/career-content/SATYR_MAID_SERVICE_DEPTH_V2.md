# Satyr Maid Service Depth v2

Status: C3-27 incremental content-side handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `05fa2d1084a48cab20d42f23885e19ee627d3d09`.
Fixture: `prior-work/astra/prototype-m3.2/content/satyr-maid-service-depth-v2.fixture.json`.
Dependency candidate: PR #93 exact head `340ed61e2a7294ecf5ce20632e469caf00e386ab`.

## Scope

C3-27 extends the existing Satyr Maid seasonal service surface with eight additional RU/EN presentation variants.

It does not replace C3-16. It adds two variants per existing seasonal `satyr-maid.shift` scene:
- spring: arrival rush, table reset;
- summer: split order, refill rush;
- autumn: queue control, closing reset;
- winter: familiar order, hearth round.

## Exact attachment

Every variant attaches only to an existing scene ID:
- `spring.default`;
- `summer.default`;
- `autumn.default`;
- `winter.default`.

No new action, event, guest, relationship, counter or stage identity is added.

## Guest boundary

All guests in this bundle remain scene-local.

Even when the winter copy describes a familiar patron, it does not create:
- a persistent guest record;
- a relationship stage;
- a future meeting;
- a reputation gain;
- a private Night route.

The current `known-face` career stage remains the only durable recognition signal in production.

## Integration

The eight candidate localization keys are presentation-only handoff material.

A future approved content selector may attach them to the existing seasonal scene IDs. C3-27 does not implement that selector.

Safe fallback:
- C3-16 seasonal service text if integrated;
- otherwise current source scene text.

## Invariants

C3-27 changes no:
- wage;
- stat weights/effects;
- energy cost;
- career transition;
- relationship state;
- flirt/boundary state;
- NightFlow;
- Save/RNG;
- media.

## C3-27 disposition

Ready:
- eight additive RU/EN service/guest depth variants;
- exact scene attachments;
- explicit non-persistent guest semantics.

Blocked as mechanics:
- persistent guest route;
- guest relationship progression;
- guest-specific effects.
