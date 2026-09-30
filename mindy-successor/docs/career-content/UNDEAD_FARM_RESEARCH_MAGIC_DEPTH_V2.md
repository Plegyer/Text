# Undead Farm Research / Magic Depth v2

Status: C3-30 presentation-only content handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `05fa2d1084a48cab20d42f23885e19ee627d3d09`.
Fixture: `prior-work/astra/prototype-m3.2/content/undead-farm-research-magic-depth-v2.fixture.json`.
Dependency candidate: PR #93 exact head `340ed61e2a7294ecf5ce20632e469caf00e386ab`.

## Scope

C3-30 adds research-adjacent Magic/Reason text to existing Undead Farm seasonal scenes plus two generic result-summary candidates on the existing result presentation.

It does not create a Research route.

## Existing scene attachments

The four scene variants attach only to:
- `spring.default`;
- `summer.default`;
- `autumn.default`;
- `winter.default`.

They describe:
- spring resonance observation;
- summer stabilization of magical overreaction;
- autumn comparison logging;
- winter seal/preservation inspection.

These remain ordinary shift observations.

## Result content

Both result candidates attach to the existing presentation:
`job/undead-farm/result/default`.

They summarize:
- observations retained from the shift;
- work records left more useful.

Neither result writes:
- a research fact;
- a specimen;
- a School milestone;
- a world fact;
- an ending condition.

## Preservation boundary

The existing global item/capability:
- `field_preservation_kit`;
- `preserve_specimen`;

remains unconsumed by Undead Farm.

This bundle does not use the item or create a specimen.

## Integration

All six strings are presentation-only handoff candidates.

No scene selector, result selector or runtime state is added.

Fallback remains:
- C3-19/current source seasonal text;
- current result UI.

## Exact non-scope

No changes to:
- research state;
- item use;
- School;
- Activity;
- world facts;
- wage/stat effects;
- thresholds;
- Save/RNG;
- media.

## C3-30 disposition

Ready:
- four RU/EN research/Magic/Reason scene variants;
- two RU/EN generic result variants;
- exact attachment to current scene/result presentation identities;
- explicit no-research-progression boundary.
