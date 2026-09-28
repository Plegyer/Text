# Poverty Depth Candidate Ordering Ledger v1

Status: deterministic presentation-only ordering ledger for all mapped ordinary-poverty depth groups.

Current-main baseline:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`.

Source map:
`poverty-depth-key-to-variant-map-v1.fixture.json`.

## Ordering rule

For each exact `eventId + variantId`:
1. collect only keys mapped to that exact pair;
2. sort keys lexicographically;
3. read existing event show count;
4. choose:
   `max(showCount - 1, 0) % candidateCount`.

No gameplay RNG is consumed.

No selected candidate is written to Save.

## Exact mapped groups

| Event ID | Variant ID | Ordered depth candidates | Show sequence |
| --- | --- | --- | --- |
| `poverty-cheap-production-v2.shared-room-seasons` | `shared-room` | `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.shared-room.d.text` | show 1 → `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.shared-room.d.text`<br>show 2 → `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.shared-room.d.text`<br>show 3 → `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.shared-room.d.text`<br>show 4 → `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.shared-room.d.text` |
| `poverty-cheap-production-v2.shared-room-seasons` | `spring-window` | `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.spring-window.a.text` | show 1 → `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.spring-window.a.text`<br>show 2 → `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.spring-window.a.text`<br>show 3 → `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.spring-window.a.text`<br>show 4 → `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.spring-window.a.text` |
| `poverty-cheap-production-v2.shared-room-seasons` | `summer-heat` | `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.summer-heat.b.text` | show 1 → `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.summer-heat.b.text`<br>show 2 → `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.summer-heat.b.text`<br>show 3 → `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.summer-heat.b.text`<br>show 4 → `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.summer-heat.b.text` |
| `poverty-cheap-production-v2.shared-room-seasons` | `winter-stove` | `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.winter-stove.c.text` | show 1 → `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.winter-stove.c.text`<br>show 2 → `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.winter-stove.c.text`<br>show 3 → `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.winter-stove.c.text`<br>show 4 → `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.winter-stove.c.text` |
| `poverty-cheap-production.shared-quiet-autumn` | `default` | `presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.a.text`<br>`presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.b.text` | show 1 → `presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.a.text`<br>show 2 → `presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.b.text`<br>show 3 → `presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.a.text`<br>show 4 → `presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.b.text` |
| `poverty-pressure-production.cold-rain` | `default` | `presentation.poverty.depth.poverty-pressure-production-cold-rain.default.a.text`<br>`presentation.poverty.depth.poverty-pressure-production-cold-rain.default.b.text` | show 1 → `presentation.poverty.depth.poverty-pressure-production-cold-rain.default.a.text`<br>show 2 → `presentation.poverty.depth.poverty-pressure-production-cold-rain.default.b.text`<br>show 3 → `presentation.poverty.depth.poverty-pressure-production-cold-rain.default.a.text`<br>show 4 → `presentation.poverty.depth.poverty-pressure-production-cold-rain.default.b.text` |
| `poverty-pressure-production.muddy-splash` | `default` | `presentation.poverty.depth.poverty-pressure-production-muddy-splash.default.a.text`<br>`presentation.poverty.depth.poverty-pressure-production-muddy-splash.default.b.text` | show 1 → `presentation.poverty.depth.poverty-pressure-production-muddy-splash.default.a.text`<br>show 2 → `presentation.poverty.depth.poverty-pressure-production-muddy-splash.default.b.text`<br>show 3 → `presentation.poverty.depth.poverty-pressure-production-muddy-splash.default.a.text`<br>show 4 → `presentation.poverty.depth.poverty-pressure-production-muddy-splash.default.b.text` |
| `poverty-pressure-production.noisy-loading` | `default` | `presentation.poverty.depth.poverty-pressure-production-noisy-loading.default.a.text`<br>`presentation.poverty.depth.poverty-pressure-production-noisy-loading.default.b.text` | show 1 → `presentation.poverty.depth.poverty-pressure-production-noisy-loading.default.a.text`<br>show 2 → `presentation.poverty.depth.poverty-pressure-production-noisy-loading.default.b.text`<br>show 3 → `presentation.poverty.depth.poverty-pressure-production-noisy-loading.default.a.text`<br>show 4 → `presentation.poverty.depth.poverty-pressure-production-noisy-loading.default.b.text` |
| `poverty-recovery-production.herb-bundle` | `default` | `presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.a.text`<br>`presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.b.text` | show 1 → `presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.a.text`<br>show 2 → `presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.b.text`<br>show 3 → `presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.a.text`<br>show 4 → `presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.b.text` |
| `poverty-recovery-production.short-cleanup` | `default` | `presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.a.text`<br>`presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.b.text` | show 1 → `presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.a.text`<br>show 2 → `presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.b.text`<br>show 3 → `presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.a.text`<br>show 4 → `presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.b.text` |
| `poverty-recovery-production.small-coin-help` | `default` | `presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.a.text`<br>`presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.b.text` | show 1 → `presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.a.text`<br>show 2 → `presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.b.text`<br>show 3 → `presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.a.text`<br>show 4 → `presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.b.text` |
| `poverty-street-production-v2.helpful-summer-shade` | `late-shade` | `presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.late-shade.b.text` | show 1 → `presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.late-shade.b.text`<br>show 2 → `presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.late-shade.b.text`<br>show 3 → `presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.late-shade.b.text`<br>show 4 → `presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.late-shade.b.text` |
| `poverty-street-production-v2.helpful-summer-shade` | `market-closing` | `presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.market-closing.a.text` | show 1 → `presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.market-closing.a.text`<br>show 2 → `presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.market-closing.a.text`<br>show 3 → `presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.market-closing.a.text`<br>show 4 → `presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.market-closing.a.text` |
| `poverty-street-production-v2.pressure-winter-wind` | `crosswind` | `presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.crosswind.a.text` | show 1 → `presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.crosswind.a.text`<br>show 2 → `presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.crosswind.a.text`<br>show 3 → `presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.crosswind.a.text`<br>show 4 → `presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.crosswind.a.text` |
| `poverty-street-production-v2.pressure-winter-wind` | `long-gusts` | `presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.long-gusts.b.text` | show 1 → `presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.long-gusts.b.text`<br>show 2 → `presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.long-gusts.b.text`<br>show 3 → `presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.long-gusts.b.text`<br>show 4 → `presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.long-gusts.b.text` |
| `poverty-street-production.helpful-summer` | `default` | `presentation.poverty.depth.poverty-street-production-helpful-summer.default.a.text`<br>`presentation.poverty.depth.poverty-street-production-helpful-summer.default.b.text` | show 1 → `presentation.poverty.depth.poverty-street-production-helpful-summer.default.a.text`<br>show 2 → `presentation.poverty.depth.poverty-street-production-helpful-summer.default.b.text`<br>show 3 → `presentation.poverty.depth.poverty-street-production-helpful-summer.default.a.text`<br>show 4 → `presentation.poverty.depth.poverty-street-production-helpful-summer.default.b.text` |
| `poverty-street-production.pressure-winter` | `default` | `presentation.poverty.depth.poverty-street-production-pressure-winter.default.a.text`<br>`presentation.poverty.depth.poverty-street-production-pressure-winter.default.b.text` | show 1 → `presentation.poverty.depth.poverty-street-production-pressure-winter.default.a.text`<br>show 2 → `presentation.poverty.depth.poverty-street-production-pressure-winter.default.b.text`<br>show 3 → `presentation.poverty.depth.poverty-street-production-pressure-winter.default.a.text`<br>show 4 → `presentation.poverty.depth.poverty-street-production-pressure-winter.default.b.text` |


Mapped groups:
**17**.

Mapped keys:
**26**.

## One-candidate groups

A one-candidate group renders the same depth key on every show.

This is deterministic and still presentation-only.

## Two-candidate groups

Two-candidate groups alternate:
- first show → first ordered key;
- second show → second ordered key;
- third show → first ordered key;
- fourth show → second ordered key.

## Locale rule

RU and EN use the same ordered key and sequence.

Locale changes only the localized value under that key.

## Fallback

Event/variant groups with no mapped depth key are not listed as candidate groups here.

They explicitly use current core variant text as documented by
`POVERTY_DEPTH_FALLBACK_COVERAGE_AUDIT_V1.md`.

## Invariants

Ordering:
- does not choose an event;
- does not choose a gameplay variant;
- does not alter event history;
- does not alter choices/effects;
- does not use gameplay RNG;
- does not write Save.

## Secret Debt

No Secret Debt identity is included.
