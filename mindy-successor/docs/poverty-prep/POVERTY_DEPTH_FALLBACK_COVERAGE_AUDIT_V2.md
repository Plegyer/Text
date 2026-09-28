# Poverty Depth Fallback Coverage Audit v2

Status: exact-current coverage proof for every ordinary-poverty gameplay event/variant pair.

Current main:
`60753968e28e86d9bb63b7818d39c23fd08fe5fa`.

No gameplay variants are invented.

## Exact coverage

| Event ID | Variant ID | Coverage | Ordered depth keys / core fallback |
| --- | --- | --- | --- |
| `poverty-street-production.helpful-summer` | `default` | **DEPTH_MAPPED** | `presentation.poverty.depth.poverty-street-production-helpful-summer.default.a.text`<br>`presentation.poverty.depth.poverty-street-production-helpful-summer.default.b.text`<br>Safety fallback: `event.poverty-street-production.helpful-summer.variant.default.text` |
| `poverty-street-production.neutral-autumn` | `default` | **CORE_FALLBACK_ONLY** | `event.poverty-street-production.neutral-autumn.variant.default.text` |
| `poverty-street-production.pressure-winter` | `default` | **DEPTH_MAPPED** | `presentation.poverty.depth.poverty-street-production-pressure-winter.default.a.text`<br>`presentation.poverty.depth.poverty-street-production-pressure-winter.default.b.text`<br>Safety fallback: `event.poverty-street-production.pressure-winter.variant.default.text` |
| `poverty-street-production-v2.helpful-summer-shade` | `market-closing` | **DEPTH_MAPPED** | `presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.market-closing.a.text`<br>Safety fallback: `event.poverty-street-production-v2.helpful-summer-shade.variant.market-closing.text` |
| `poverty-street-production-v2.helpful-summer-shade` | `late-shade` | **DEPTH_MAPPED** | `presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.late-shade.b.text`<br>Safety fallback: `event.poverty-street-production-v2.helpful-summer-shade.variant.late-shade.text` |
| `poverty-street-production-v2.neutral-autumn-crossing` | `drizzle` | **CORE_FALLBACK_ONLY** | `event.poverty-street-production-v2.neutral-autumn-crossing.variant.drizzle.text` |
| `poverty-street-production-v2.neutral-autumn-crossing` | `dry-arcade` | **CORE_FALLBACK_ONLY** | `event.poverty-street-production-v2.neutral-autumn-crossing.variant.dry-arcade.text` |
| `poverty-street-production-v2.pressure-winter-wind` | `crosswind` | **DEPTH_MAPPED** | `presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.crosswind.a.text`<br>Safety fallback: `event.poverty-street-production-v2.pressure-winter-wind.variant.crosswind.text` |
| `poverty-street-production-v2.pressure-winter-wind` | `long-gusts` | **DEPTH_MAPPED** | `presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.long-gusts.b.text`<br>Safety fallback: `event.poverty-street-production-v2.pressure-winter-wind.variant.long-gusts.text` |
| `poverty-cheap-production.shared-quiet-autumn` | `default` | **DEPTH_MAPPED** | `presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.a.text`<br>`presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.b.text`<br>Safety fallback: `event.poverty-cheap-production.shared-quiet-autumn.variant.default.text` |
| `poverty-cheap-production-v2.shared-room-seasons` | `spring-window` | **DEPTH_MAPPED** | `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.spring-window.a.text`<br>Safety fallback: `event.poverty-cheap-production-v2.shared-room-seasons.variant.spring-window.text` |
| `poverty-cheap-production-v2.shared-room-seasons` | `summer-heat` | **DEPTH_MAPPED** | `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.summer-heat.b.text`<br>Safety fallback: `event.poverty-cheap-production-v2.shared-room-seasons.variant.summer-heat.text` |
| `poverty-cheap-production-v2.shared-room-seasons` | `winter-stove` | **DEPTH_MAPPED** | `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.winter-stove.c.text`<br>Safety fallback: `event.poverty-cheap-production-v2.shared-room-seasons.variant.winter-stove.text` |
| `poverty-cheap-production-v2.shared-room-seasons` | `shared-room` | **DEPTH_MAPPED** | `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.shared-room.d.text`<br>Safety fallback: `event.poverty-cheap-production-v2.shared-room-seasons.variant.shared-room.text` |
| `poverty-recovery-production.small-coin-help` | `default` | **DEPTH_MAPPED** | `presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.a.text`<br>`presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.b.text`<br>Safety fallback: `event.poverty-recovery-production.small-coin-help.variant.default.text` |
| `poverty-recovery-production.short-cleanup` | `default` | **DEPTH_MAPPED** | `presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.a.text`<br>`presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.b.text`<br>Safety fallback: `event.poverty-recovery-production.short-cleanup.variant.default.text` |
| `poverty-recovery-production.herb-bundle` | `default` | **DEPTH_MAPPED** | `presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.a.text`<br>`presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.b.text`<br>Safety fallback: `event.poverty-recovery-production.herb-bundle.variant.default.text` |
| `poverty-pressure-production.cold-rain` | `default` | **DEPTH_MAPPED** | `presentation.poverty.depth.poverty-pressure-production-cold-rain.default.a.text`<br>`presentation.poverty.depth.poverty-pressure-production-cold-rain.default.b.text`<br>Safety fallback: `event.poverty-pressure-production.cold-rain.variant.default.text` |
| `poverty-pressure-production.noisy-loading` | `default` | **DEPTH_MAPPED** | `presentation.poverty.depth.poverty-pressure-production-noisy-loading.default.a.text`<br>`presentation.poverty.depth.poverty-pressure-production-noisy-loading.default.b.text`<br>Safety fallback: `event.poverty-pressure-production.noisy-loading.variant.default.text` |
| `poverty-pressure-production.muddy-splash` | `default` | **DEPTH_MAPPED** | `presentation.poverty.depth.poverty-pressure-production-muddy-splash.default.a.text`<br>`presentation.poverty.depth.poverty-pressure-production-muddy-splash.default.b.text`<br>Safety fallback: `event.poverty-pressure-production.muddy-splash.variant.default.text` |


## Totals

- current gameplay event/variant pairs: **20**
- pairs with valid depth candidate(s): **17**
- explicit core-fallback-only pairs: **3**
- total covered: **20/20**

## Core fallback contract

For any pair without an approved depth candidate, render:

`event.<eventId>.variant.<variantId>.text`.

For mapped pairs, the same core localization identity remains the safety fallback if:
- the depth lookup is unavailable;
- a mapped key is missing;
- the active locale value is missing;
- presentation-only selection rejects the candidate.

Fallback never rerolls gameplay.

## No invented variants

This audit enumerates only exact current variants from the six production ordinary-poverty packs.

There is no synthetic variant created to improve presentation depth.

## No mechanic coupling

Depth/fallback status does not change:
- event selection;
- gameplay variant selection;
- allowed choices;
- choice effects;
- event chance;
- cooldown/maxShows;
- NightFlow timing;
- lodging;
- gameplay RNG;
- Save identity.

## Journal boundary

Resolved Journal/lastAction identity remains:
`eventChoice(eventId, choiceId)`.

Depth/fallback body selection is pending-scene presentation only.

## Secret Debt exclusion

Only ordinary-poverty current production identities are covered.

Secret Debt remains excluded.

## Conclusion

Every current ordinary-poverty event/variant pair is fully accounted for by either a valid depth mapping or explicit current core localized fallback, with no invented gameplay identity.
