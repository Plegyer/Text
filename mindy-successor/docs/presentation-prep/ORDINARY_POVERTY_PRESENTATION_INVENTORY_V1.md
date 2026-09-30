# Ordinary Poverty Presentation Inventory v1

Status: C2-44 COMPLETE
Owner: Chat 2 / Presentation & Media
Baseline main: `8265a6af2bd87b9e69f0bce96e6a20a80a9e852c`

Scope is ordinary poverty presentation only. Secret Debt is intentionally separate and no lender, hidden-career, forced-night, or Secret Debt media identity is invented here.

## Semantic routing

Current ordinary-poverty events use `sourceDomain: poverty`.

Because `poverty` is not a current career, relationship, or Forest domain in the presentation registry, current event variants resolve as:

`location/town/event/<clean-event-id>/<clean-variant-id>`

Every current poverty variant retains catalog fallback media:
- street/recovery/pressure variants -> `stage.outside`;
- cheap-lodging variants -> `stage.room`.

Those catalog sources preserve safe fallback even where a bespoke static override is absent.

## Current production identities

Current ordinary-poverty event variants: **20**.

### Existing exact static overrides: 10

Street v1:
- `location/town/event/poverty-street-production-helpful-summer/default`
- `location/town/event/poverty-street-production-neutral-autumn/default`
- `location/town/event/poverty-street-production-pressure-winter/default`

Cheap lodging v1:
- `location/town/event/poverty-cheap-production-shared-quiet-autumn/default`

Recovery/help:
- `location/town/event/poverty-recovery-production-small-coin-help/default`
- `location/town/event/poverty-recovery-production-short-cleanup/default`
- `location/town/event/poverty-recovery-production-herb-bundle/default`

Pressure:
- `location/town/event/poverty-pressure-production-cold-rain/default`
- `location/town/event/poverty-pressure-production-noisy-loading/default`
- `location/town/event/poverty-pressure-production-muddy-splash/default`

All ten existing exact overrides already have RU/EN presentation alt and caption metadata.

### Current static-depth gaps: 10

Street v2:
- `location/town/event/poverty-street-production-v2-helpful-summer-shade/market-closing`
- `location/town/event/poverty-street-production-v2-helpful-summer-shade/late-shade`
- `location/town/event/poverty-street-production-v2-neutral-autumn-crossing/drizzle`
- `location/town/event/poverty-street-production-v2-neutral-autumn-crossing/dry-arcade`
- `location/town/event/poverty-street-production-v2-pressure-winter-wind/crosswind`
- `location/town/event/poverty-street-production-v2-pressure-winter-wind/long-gusts`

Cheap lodging v2:
- `location/town/event/poverty-cheap-production-v2-shared-room-seasons/spring-window`
- `location/town/event/poverty-cheap-production-v2-shared-room-seasons/summer-heat`
- `location/town/event/poverty-cheap-production-v2-shared-room-seasons/winter-stove`
- `location/town/event/poverty-cheap-production-v2-shared-room-seasons/shared-room`

These ten identities are current gameplay/event identities and have safe catalog fallback, but current `content/presentation.json` has no exact static override or presentation-specific RU/EN alt/caption keys for them.

## Project-owned reusable sources already available

The following existing project-owned sources can close the v2 depth gaps without new gameplay identity:

- helpful summer street: `assets/presentation/poverty-street-helpful-summer.svg`
- neutral autumn street: `assets/presentation/poverty-street-neutral-autumn.svg`
- winter pressure street: `assets/presentation/poverty-street-pressure-winter.svg`
- generic cheap lodging: `assets/presentation/poverty-cheap-lodging.svg`

C2-45 may reuse these sources across distinct semantic slots while preserving separate semantic IDs and separate accessibility metadata.

## Inventory result

Current ordinary-poverty semantic identities: **20**.

Exact bespoke/static presentation overrides before C2-45: **10 / 20**.

Safe catalog fallback before C2-45: **20 / 20**.

Presentation-specific RU/EN alt + caption before C2-45: **10 / 20**.

Secret Debt identities included: **0**.
