# Forest Logging Road Seasonal Depth v1

Status: C3-39 content-side handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `8265a6af2bd87b9e69f0bce96e6a20a80a9e852c`.
Fixture: `prior-work/astra/prototype-m3.2/content/forest-logging-road-seasonal-depth-v1.fixture.json`.

## Scope

Adds four RU/EN presentation variants to the existing Logging Road route:
- spring meltwater;
- summer cut branches;
- autumn leaf-filled ruts;
- winter frozen ruts.

Exact current identities:
- Activity `lumber.forest`;
- option `forest.route.logging-road`;
- route `logging-road`;
- presentation `activity/forest/route/logging-road`.

## Boundary

Season is presentation flavor only.

No variant changes:
- route selection;
- progress;
- endurance;
- result probability;
- result identity;
- unlocks;
- Save/RNG;
- media.

## Integration

No selector is implemented by Chat 3.

Safe fallback remains the live Logging Road option help/caption/source route presentation.

## C3-39 disposition

Ready:
- four additive RU/EN seasonal Logging Road variants;
- exact current route attachment;
- no gameplay or unlock change.
