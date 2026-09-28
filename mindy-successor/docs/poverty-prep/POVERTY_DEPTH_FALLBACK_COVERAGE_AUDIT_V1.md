# Poverty Depth Fallback Coverage Audit v1

Status: exact-current coverage audit for every ordinary-poverty gameplay event/variant.

Current-main baseline:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`.

No variants are invented.

## Coverage table

| Event ID | Variant ID | Depth coverage | Fallback |
| --- | --- | --- | --- |
| `poverty-street-production.helpful-summer` | `default` | `presentation.poverty.depth.poverty-street-production-helpful-summer.default.a.text`<br>`presentation.poverty.depth.poverty-street-production-helpful-summer.default.b.text` | core key retained as safety fallback: `event.poverty-street-production.helpful-summer.variant.default.text` |
| `poverty-street-production.neutral-autumn` | `default` | none | **EXPLICIT CORE FALLBACK** → `event.poverty-street-production.neutral-autumn.variant.default.text` |
| `poverty-street-production.pressure-winter` | `default` | `presentation.poverty.depth.poverty-street-production-pressure-winter.default.a.text`<br>`presentation.poverty.depth.poverty-street-production-pressure-winter.default.b.text` | core key retained as safety fallback: `event.poverty-street-production.pressure-winter.variant.default.text` |
| `poverty-street-production-v2.helpful-summer-shade` | `market-closing` | `presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.market-closing.a.text` | core key retained as safety fallback: `event.poverty-street-production-v2.helpful-summer-shade.variant.market-closing.text` |
| `poverty-street-production-v2.helpful-summer-shade` | `late-shade` | `presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.late-shade.b.text` | core key retained as safety fallback: `event.poverty-street-production-v2.helpful-summer-shade.variant.late-shade.text` |
| `poverty-street-production-v2.neutral-autumn-crossing` | `drizzle` | none | **EXPLICIT CORE FALLBACK** → `event.poverty-street-production-v2.neutral-autumn-crossing.variant.drizzle.text` |
| `poverty-street-production-v2.neutral-autumn-crossing` | `dry-arcade` | none | **EXPLICIT CORE FALLBACK** → `event.poverty-street-production-v2.neutral-autumn-crossing.variant.dry-arcade.text` |
| `poverty-street-production-v2.pressure-winter-wind` | `crosswind` | `presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.crosswind.a.text` | core key retained as safety fallback: `event.poverty-street-production-v2.pressure-winter-wind.variant.crosswind.text` |
| `poverty-street-production-v2.pressure-winter-wind` | `long-gusts` | `presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.long-gusts.b.text` | core key retained as safety fallback: `event.poverty-street-production-v2.pressure-winter-wind.variant.long-gusts.text` |
| `poverty-cheap-production.shared-quiet-autumn` | `default` | `presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.a.text`<br>`presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.b.text` | core key retained as safety fallback: `event.poverty-cheap-production.shared-quiet-autumn.variant.default.text` |
| `poverty-cheap-production-v2.shared-room-seasons` | `spring-window` | `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.spring-window.a.text` | core key retained as safety fallback: `event.poverty-cheap-production-v2.shared-room-seasons.variant.spring-window.text` |
| `poverty-cheap-production-v2.shared-room-seasons` | `summer-heat` | `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.summer-heat.b.text` | core key retained as safety fallback: `event.poverty-cheap-production-v2.shared-room-seasons.variant.summer-heat.text` |
| `poverty-cheap-production-v2.shared-room-seasons` | `winter-stove` | `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.winter-stove.c.text` | core key retained as safety fallback: `event.poverty-cheap-production-v2.shared-room-seasons.variant.winter-stove.text` |
| `poverty-cheap-production-v2.shared-room-seasons` | `shared-room` | `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.shared-room.d.text` | core key retained as safety fallback: `event.poverty-cheap-production-v2.shared-room-seasons.variant.shared-room.text` |
| `poverty-recovery-production.small-coin-help` | `default` | `presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.a.text`<br>`presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.b.text` | core key retained as safety fallback: `event.poverty-recovery-production.small-coin-help.variant.default.text` |
| `poverty-recovery-production.short-cleanup` | `default` | `presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.a.text`<br>`presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.b.text` | core key retained as safety fallback: `event.poverty-recovery-production.short-cleanup.variant.default.text` |
| `poverty-recovery-production.herb-bundle` | `default` | `presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.a.text`<br>`presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.b.text` | core key retained as safety fallback: `event.poverty-recovery-production.herb-bundle.variant.default.text` |
| `poverty-pressure-production.cold-rain` | `default` | `presentation.poverty.depth.poverty-pressure-production-cold-rain.default.a.text`<br>`presentation.poverty.depth.poverty-pressure-production-cold-rain.default.b.text` | core key retained as safety fallback: `event.poverty-pressure-production.cold-rain.variant.default.text` |
| `poverty-pressure-production.noisy-loading` | `default` | `presentation.poverty.depth.poverty-pressure-production-noisy-loading.default.a.text`<br>`presentation.poverty.depth.poverty-pressure-production-noisy-loading.default.b.text` | core key retained as safety fallback: `event.poverty-pressure-production.noisy-loading.variant.default.text` |
| `poverty-pressure-production.muddy-splash` | `default` | `presentation.poverty.depth.poverty-pressure-production-muddy-splash.default.a.text`<br>`presentation.poverty.depth.poverty-pressure-production-muddy-splash.default.b.text` | core key retained as safety fallback: `event.poverty-pressure-production.muddy-splash.variant.default.text` |


## Totals

- current gameplay event/variant pairs: **20**
- pairs with mapped depth candidate(s): **17**
- pairs using explicit core fallback only: **3**

Coverage total:
**20/20**.

## Fallback rule

For any pair without depth candidates, render:

`event.<eventId>.variant.<variantId>.text`.

For a mapped pair, the same core key remains the safety fallback if:
- mapped key missing;
- locale value missing;
- consumer unavailable;
- invalid presentation lookup.

## No invented variants

The audit reads only current variants from the six shipped ordinary-poverty packs.

It does not create additional gameplay variant IDs to fill presentation-depth gaps.

## No mechanics coupling

Fallback/depth status does not affect:
- event selection;
- variant selection;
- choice availability;
- choice effects;
- event chance;
- cooldown/maxShows;
- NightFlow;
- RNG;
- Save.

## Secret Debt exclusion

Only current ordinary-poverty pack identities are covered.

Secret Debt is excluded.

## Audit conclusion

Every current ordinary-poverty event/variant pair is explicitly covered by either:
- one or more mapped presentation-depth candidates; or
- the current localized core variant text fallback.
