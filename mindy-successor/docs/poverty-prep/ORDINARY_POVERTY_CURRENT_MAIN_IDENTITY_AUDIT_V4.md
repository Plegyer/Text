# Ordinary Poverty Current-Main Identity Audit v4

Status: exact-current identity audit for queue 341.

Current main:
`05ceaeaaaf2c7c42f668c1140d9aaf3d61491148`.

Historical v3 source baseline:
`ORDINARY_POVERTY_DEPTH_HANDOFF_V3.md` on historical branch `chat3/lumber-production-proof-next`.

Secret Debt is excluded.

## Current production pack IDs

- `poverty-street-production`
- `poverty-street-production-v2`
- `poverty-cheap-production`
- `poverty-cheap-production-v2`
- `poverty-recovery-production`
- `poverty-pressure-production`

Pack count: **6**.

## Exact event / variant / choice identities

| Pack | Event | Gameplay variants | Choice IDs | Semantic presentation IDs |
| --- | --- | --- | --- | --- |
| `poverty-street-production` | `poverty-street-production.helpful-summer` | `default` | `take-errand`, `keep-resting` | `location/town/event/poverty-street-production-helpful-summer/default` |
| `poverty-street-production` | `poverty-street-production.neutral-autumn` | `default` | `settle-in` | `location/town/event/poverty-street-production-neutral-autumn/default` |
| `poverty-street-production` | `poverty-street-production.pressure-winter` | `default` | `take-shelter`, `keep-moving` | `location/town/event/poverty-street-production-pressure-winter/default` |
| `poverty-street-production-v2` | `poverty-street-production-v2.helpful-summer-shade` | `market-closing`, `late-shade` | `take-small-task`, `keep-place` | `location/town/event/poverty-street-production-v2-helpful-summer-shade/market-closing`<br>`location/town/event/poverty-street-production-v2-helpful-summer-shade/late-shade` |
| `poverty-street-production-v2` | `poverty-street-production-v2.neutral-autumn-crossing` | `drizzle`, `dry-arcade` | `wait-out-night` | `location/town/event/poverty-street-production-v2-neutral-autumn-crossing/drizzle`<br>`location/town/event/poverty-street-production-v2-neutral-autumn-crossing/dry-arcade` |
| `poverty-street-production-v2` | `poverty-street-production-v2.pressure-winter-wind` | `crosswind`, `long-gusts` | `use-recess`, `keep-walking` | `location/town/event/poverty-street-production-v2-pressure-winter-wind/crosswind`<br>`location/town/event/poverty-street-production-v2-pressure-winter-wind/long-gusts` |
| `poverty-cheap-production` | `poverty-cheap-production.shared-quiet-autumn` | `default` | `settle-quietly` | `location/town/event/poverty-cheap-production-shared-quiet-autumn/default` |
| `poverty-cheap-production-v2` | `poverty-cheap-production-v2.shared-room-seasons` | `spring-window`, `summer-heat`, `winter-stove`, `shared-room` | `settle-in` | `location/town/event/poverty-cheap-production-v2-shared-room-seasons/spring-window`<br>`location/town/event/poverty-cheap-production-v2-shared-room-seasons/summer-heat`<br>`location/town/event/poverty-cheap-production-v2-shared-room-seasons/winter-stove`<br>`location/town/event/poverty-cheap-production-v2-shared-room-seasons/shared-room` |
| `poverty-recovery-production` | `poverty-recovery-production.small-coin-help` | `default` | `take-coins`, `leave-them` | `location/town/event/poverty-recovery-production-small-coin-help/default` |
| `poverty-recovery-production` | `poverty-recovery-production.short-cleanup` | `default` | `do-cleanup`, `keep-resting` | `location/town/event/poverty-recovery-production-short-cleanup/default` |
| `poverty-recovery-production` | `poverty-recovery-production.herb-bundle` | `default` | `take-herb`, `leave-herb` | `location/town/event/poverty-recovery-production-herb-bundle/default` |
| `poverty-pressure-production` | `poverty-pressure-production.cold-rain` | `default` | `take-doorway`, `wait-it-out` | `location/town/event/poverty-pressure-production-cold-rain/default` |
| `poverty-pressure-production` | `poverty-pressure-production.noisy-loading` | `default` | `move-corner`, `stay-put` | `location/town/event/poverty-pressure-production-noisy-loading/default` |
| `poverty-pressure-production` | `poverty-pressure-production.muddy-splash` | `default` | `wipe-down`, `leave-for-morning` | `location/town/event/poverty-pressure-production-muddy-splash/default` |


Totals:
- events: **14**;
- gameplay variants: **20**;
- choices: **24**.

## Current localization namespaces

Current ordinary-poverty core event localization:
- namespace: `event.poverty-*`;
- exact root key count: **82**.

Current poverty static accessibility localization:
- namespace: `presentation.static.poverty*`;
- exact root key count: **28**.

Current root depth namespace:
- `presentation.poverty.depth.*`;
- exact root key count: **0**.

Current root therefore still has **no shipped poverty depth keys**.

## Active poverty presentation/static identities

Current active event-specific poverty presentation slots:
**10**.

- `location/town/event/poverty-street-production-helpful-summer/default` -> `assets/presentation/poverty-street-helpful-summer.svg`, alt `presentation.static.poverty-street-helpful-summer.alt`
- `location/town/event/poverty-street-production-neutral-autumn/default` -> `assets/presentation/poverty-street-neutral-autumn.svg`, alt `presentation.static.poverty-street-neutral-autumn.alt`
- `location/town/event/poverty-street-production-pressure-winter/default` -> `assets/presentation/poverty-street-pressure-winter.svg`, alt `presentation.static.poverty-street-pressure-winter.alt`
- `location/town/event/poverty-cheap-production-shared-quiet-autumn/default` -> `assets/presentation/poverty-cheap-shared-quiet-autumn.svg`, alt `presentation.static.poverty-cheap-shared-quiet-autumn.alt`
- `location/town/event/poverty-recovery-production-small-coin-help/default` -> `assets/presentation/poverty-recovery-small-coin-help.svg`, alt `presentation.static.poverty-recovery-small-coin-help.alt`
- `location/town/event/poverty-recovery-production-short-cleanup/default` -> `assets/presentation/poverty-recovery-short-cleanup.svg`, alt `presentation.static.poverty-recovery-short-cleanup.alt`
- `location/town/event/poverty-recovery-production-herb-bundle/default` -> `assets/presentation/poverty-recovery-herb-bundle.svg`, alt `presentation.static.poverty-recovery-herb-bundle.alt`
- `location/town/event/poverty-pressure-production-cold-rain/default` -> `assets/presentation/poverty-pressure-cold-rain.svg`, alt `presentation.static.poverty-pressure-cold-rain.alt`
- `location/town/event/poverty-pressure-production-noisy-loading/default` -> `assets/presentation/poverty-pressure-noisy-loading.svg`, alt `presentation.static.poverty-pressure-noisy-loading.alt`
- `location/town/event/poverty-pressure-production-muddy-splash/default` -> `assets/presentation/poverty-pressure-muddy-splash.svg`, alt `presentation.static.poverty-pressure-muddy-splash.alt`

Semantic event presentation identity remains:
`location/town/event/<clean-event-id>/<clean-variant-id>`.

Current gameplay variants without a bespoke event-specific root slot continue to rely on the existing presentation fallback chain.

## Historical v3 baseline comparison

Historical v3 handoff recorded:
- 6 packs;
- 14 events;
- 20 gameplay variants;
- 24 choices;
- 26 proposed depth keys;
- 10 active event-specific poverty static slots.

Exact current-main comparison:
- pack count: **UNCHANGED**;
- event identities: **UNCHANGED**;
- gameplay variant identities: **UNCHANGED**;
- choice identities: **UNCHANGED**;
- active event-specific poverty static slot count: **UNCHANGED** at 10;
- proposed historical depth namespace remains **UNSHIPPED** in root localization.

The important delta is not gameplay identity drift. The v3 worker baseline SHA is stale, and current `main` now includes newer coordination/other-team work. Every old artifact must therefore be selectively revalidated before reuse.

## Ownership check

No current ordinary-poverty identity in this audit belongs to:
- Secret Debt;
- School;
- Foreman PR #65;
- Chat 2 media-source authoring.

Chat 3 remains content-side owner for this refresh only.

## Conclusion

The ordinary-poverty gameplay/content identity set is stable versus the historical v3 handoff. The refresh can reuse exact identities, but all proposed depth/accessibility artifacts require current-main collision/target revalidation before candidate PR handoff.
