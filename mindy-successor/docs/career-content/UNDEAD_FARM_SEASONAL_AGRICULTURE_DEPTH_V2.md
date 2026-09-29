# Undead Farm Seasonal Agriculture Depth v2

Status: C3-29 incremental content-side handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `05fa2d1084a48cab20d42f23885e19ee627d3d09`.
Fixture: `prior-work/astra/prototype-m3.2/content/undead-farm-seasonal-agriculture-depth-v2.fixture.json`.
Dependency candidate: PR #93 exact head `340ed61e2a7294ecf5ce20632e469caf00e386ab`.

## Scope

C3-29 adds eight RU/EN agriculture/work variants on the four existing `undead-farm.shift` seasonal scene identities.

Two variants are provided per season:
- spring: drainage and bed marking;
- summer: irrigation channels and worker routing;
- autumn: harvest flow and storage labels;
- winter: tool repair and cellar inspection.

## Current identity boundary

All content attaches only to:
- `spring.default`;
- `summer.default`;
- `autumn.default`;
- `winter.default`.

No new crop, resource, item, event or shift identity is introduced.

## Agriculture vs research

This task is deliberately work-focused.

The spring bed-marking copy may describe observation, but it does not create a research result or specimen.

C3-30 owns the separate research/magic depth pass.

## Resource boundary

The scenes can describe:
- crates;
- baskets;
- tools;
- water channels;
- storage rows.

Those are environmental/work details only.

They do not create:
- inventory items;
- trade goods;
- crop IDs;
- sale values;
- resource rewards.

## Integration

These eight keys are presentation-only handoff candidates.

No runtime selector is added.

Safe fallback:
1. C3-19 seasonal agriculture/research text if integrated;
2. current source seasonal scene text.

## Exact non-scope

No changes to:
- wage/stat effects;
- career stages/transitions;
- item catalog;
- School;
- research progression;
- Activity hooks;
- relationships;
- endings;
- Save/RNG;
- media.

## C3-29 disposition

Ready:
- eight additional RU/EN seasonal agriculture/work variants;
- exact existing scene attachments;
- explicit no-resource/no-research-state boundary.
