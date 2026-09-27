# Poverty Presentation Identity Inventory v1

Status: presentation inventory derived from the actual ordinary-poverty production packs authored in Queue items 87–99.

Scope excludes Secret Debt.

## Current semantic convention

For these events, `sourceDomain` is `poverty`, which is not a career/relationship/Forest domain. Under the current presentation resolver their event variants map to:

`location/town/event/<clean-event-id>/<clean-variant-id>`

All current production variants already retain a shipped static catalog fallback:
- street families -> `stage.outside`;
- cheap-lodging families -> `stage.room`.

The semantic IDs below are suitable handoff targets for Chat2 multi-GIF/static specialization. Mechanics do not depend on replacement media.

## Street production v1

### `poverty-street-production.helpful-summer`

Classification:
- repeatable: **YES** (`maxShows=40`, cooldown 2);
- seasonal/context: **summer + housingTier=street**;
- visual-pool candidate: **street / small work / market closing**;
- current fallback: **stage.outside + text**;
- reusable media opportunity: summer street, closed market, short paid errand.

Variant:
- `default`
- presentation ID: `location/town/event/poverty-street-production-helpful-summer/default`

### `poverty-street-production.neutral-autumn`

Classification:
- repeatable: **YES**;
- seasonal/context: **autumn + street**;
- visual-pool candidate: **street / arcade / quiet night**;
- current fallback: **stage.outside + text**;
- reusable media opportunity: autumn street shelter/awning.

Variant:
- `default`
- presentation ID: `location/town/event/poverty-street-production-neutral-autumn/default`

### `poverty-street-production.pressure-winter`

Classification:
- repeatable: **YES**;
- seasonal/context: **winter + street**;
- visual-pool candidate: **street / cold / exposed pavement**;
- current fallback: **stage.outside + text**;
- reusable media opportunity: winter street pressure.

Variant:
- `default`
- presentation ID: `location/town/event/poverty-street-production-pressure-winter/default`

## Street production v2

### `poverty-street-production-v2.helpful-summer-shade`

Classification:
- repeatable: **YES** (`maxShows=30`, cooldown 3);
- seasonal/context: **summer + street + day-in-year 13–14**;
- visual-pool candidate: **summer street / market shade / small task**;
- current fallback: **stage.outside + text**;
- reusable media opportunity: can share a summer market/street pool with v1 helpful event.

Variants:
- `market-closing`
  - `location/town/event/poverty-street-production-v2-helpful-summer-shade/market-closing`
- `late-shade`
  - `location/town/event/poverty-street-production-v2-helpful-summer-shade/late-shade`

### `poverty-street-production-v2.neutral-autumn-crossing`

Classification:
- repeatable: **YES**;
- seasonal/context: **autumn + street + day-in-year 23–24**;
- visual-pool candidate: **autumn arcade / drizzle / dry shelter**;
- current fallback: **stage.outside + text**;
- reusable media opportunity: one arcade scene with dry/rain variants.

Variants:
- `drizzle`
  - `location/town/event/poverty-street-production-v2-neutral-autumn-crossing/drizzle`
- `dry-arcade`
  - `location/town/event/poverty-street-production-v2-neutral-autumn-crossing/dry-arcade`

### `poverty-street-production-v2.pressure-winter-wind`

Classification:
- repeatable: **YES**;
- seasonal/context: **winter + street + day-in-year 33–34**;
- visual-pool candidate: **winter lane / wind / doorway shelter**;
- current fallback: **stage.outside + text**;
- reusable media opportunity: winter pressure pool shared with v1 winter event.

Variants:
- `crosswind`
  - `location/town/event/poverty-street-production-v2-pressure-winter-wind/crosswind`
- `long-gusts`
  - `location/town/event/poverty-street-production-v2-pressure-winter-wind/long-gusts`

## Cheap lodging v1

### `poverty-cheap-production.shared-quiet-autumn`

Classification:
- repeatable: **YES** (`maxShows=30`, cooldown 3);
- seasonal/context: **autumn + housingTier=cheap**;
- visual-pool candidate: **cheap shared room / thin walls / quiet**;
- current fallback: **stage.room + text**;
- reusable media opportunity: generic cheap-room interior.

Variant:
- `default`
- presentation ID: `location/town/event/poverty-cheap-production-shared-quiet-autumn/default`

## Cheap lodging v2

### `poverty-cheap-production-v2.shared-room-seasons`

Classification:
- repeatable: **YES** (`maxShows=40`, cooldown 2);
- seasonal/context: **cheap lodging; spring/summer/winter authored variants**;
- visual-pool candidate: **shared-room seasonal pool**;
- current fallback: **stage.room + text**;
- reusable media opportunity: one room composition with seasonal window/stove/light treatments.

Variants:
- `spring-window`
  - `location/town/event/poverty-cheap-production-v2-shared-room-seasons/spring-window`
- `summer-heat`
  - `location/town/event/poverty-cheap-production-v2-shared-room-seasons/summer-heat`
- `winter-stove`
  - `location/town/event/poverty-cheap-production-v2-shared-room-seasons/winter-stove`
- `shared-room`
  - `location/town/event/poverty-cheap-production-v2-shared-room-seasons/shared-room`

## Recovery/help production

### `poverty-recovery-production.small-coin-help`

Classification:
- repeatable: **YES** (`maxShows=20`, cooldown 4);
- seasonal/context: **spring + street + day-in-year 2**;
- visual-pool candidate: **street / anonymous small help / bread parcel**;
- current fallback: **stage.outside + text**;
- reusable media opportunity: anonymous help still-life; no NPC face required.

Variant:
- `default`
- presentation ID: `location/town/event/poverty-recovery-production-small-coin-help/default`

### `poverty-recovery-production.short-cleanup`

Classification:
- repeatable: **YES**;
- seasonal/context: **spring + street + day-in-year 4**;
- visual-pool candidate: **market close / cleanup / stools and bucket**;
- current fallback: **stage.outside + text**;
- reusable media opportunity: small-work street pool shared with helpful-summer events.

Variant:
- `default`
- presentation ID: `location/town/event/poverty-recovery-production-short-cleanup/default`

### `poverty-recovery-production.herb-bundle`

Classification:
- repeatable: **YES**;
- seasonal/context: **spring + street + day-in-year 6**;
- visual-pool candidate: **found resource / market crate / herb bundle**;
- current fallback: **stage.outside + text**;
- reusable media opportunity: item still-life; can reuse generic street-market background.

Variant:
- `default`
- presentation ID: `location/town/event/poverty-recovery-production-herb-bundle/default`

## Bad-luck pressure production

### `poverty-pressure-production.cold-rain`

Classification:
- repeatable: **YES** (`maxShows=20`, cooldown 4);
- seasonal/context: **spring + street + day-in-year 7**;
- visual-pool candidate: **cold rain / curb / doorway**;
- current fallback: **stage.outside + text**;
- reusable media opportunity: rain/street weather pool.

Variant:
- `default`
- presentation ID: `location/town/event/poverty-pressure-production-cold-rain/default`

### `poverty-pressure-production.noisy-loading`

Classification:
- repeatable: **YES**;
- seasonal/context: **spring + street + day-in-year 8**;
- visual-pool candidate: **pre-dawn loading carts / crates**;
- current fallback: **stage.outside + text**;
- reusable media opportunity: market/loading pool.

Variant:
- `default`
- presentation ID: `location/town/event/poverty-pressure-production-noisy-loading/default`

### `poverty-pressure-production.muddy-splash`

Classification:
- repeatable: **YES**;
- seasonal/context: **spring + street + day-in-year 9**;
- visual-pool candidate: **cart / puddle / mud**;
- current fallback: **stage.outside + text**;
- reusable media opportunity: weather/street cart pool.

Variant:
- `default`
- presentation ID: `location/town/event/poverty-pressure-production-muddy-splash/default`

## Inventory counts

Actual authored identities through item 99:
- production packs: **6**;
- event identities: **14**;
- event variant identities: **20**;
- street variants using `stage.outside`: **15**;
- cheap-lodging variants using `stage.room`: **5**.

## Recommended reusable media pools for Chat2

These are media-production opportunities, not mechanics requirements:

1. **Street / generic outside**
   - fallback for every street event.
2. **Summer market / short work**
   - v1 helpful summer;
   - v2 summer shade;
   - recovery short cleanup.
3. **Autumn arcade / shelter**
   - v1 neutral autumn;
   - v2 drizzle/dry arcade.
4. **Winter street pressure**
   - v1 cold pavement;
   - v2 crosswind/long gusts.
5. **Spring rain / mud / loading**
   - pressure pack families.
6. **Found/help still-life**
   - coins/bread;
   - herb bundle.
7. **Cheap shared room**
   - v1 autumn quiet;
   - v2 spring/summer/winter shared-room variants.

A single media asset may serve several semantic slots when visually appropriate; semantic IDs should remain distinct.

## Static/text fallback requirement

All 20 identities already have:
- authored event text;
- `stage.outside` or `stage.room` catalog media fallback.

Therefore:
- GIF/media expansion is optional presentation depth;
- missing bespoke media must not block gameplay;
- replacing media must not alter conditions/effects/event identity.

## Secret Debt boundary

No identity in this inventory belongs to:
- lender;
- Secret Debt;
- hidden Slave career;
- forced Secret Debt Night;
- Secret Debt endings.

Those require separate Product/runtime/content authority.
