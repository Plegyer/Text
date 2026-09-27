# Ordinary Poverty Localization Coverage Ledger v3

Status: current shipped ordinary-poverty localization coverage ledger for Chat 3 item 151.

Production baseline: six ordinary-poverty packs currently on `main`. Secret Debt is excluded.

Classification:
- **COVERED_RU_EN** — item-140 delta supplies non-empty Russian source + English locale.
- **RU_FALLBACK_ONLY** — Russian exists but English is absent.
- **MISSING** — no usable localization entry exists.
- **NON_PLAYER_FACING** — mechanics/identity fields intentionally not localized.

The ledger uses only actual current Git event/variant/choice/media identities.


## Pack `poverty-street-production`

| Surface | Localization key | Status |
| --- | --- | --- |
| title `poverty-street-production.helpful-summer` | `event.poverty-street-production.helpful-summer.title` | COVERED_RU_EN |
| body `poverty-street-production.helpful-summer/default` | `event.poverty-street-production.helpful-summer.variant.default.text` | COVERED_RU_EN |
| choice label `poverty-street-production.helpful-summer/take-errand` | `event.poverty-street-production.helpful-summer.choice.take-errand.label` | COVERED_RU_EN |
| choice text `poverty-street-production.helpful-summer/take-errand` | `event.poverty-street-production.helpful-summer.choice.take-errand.text` | COVERED_RU_EN |
| choice label `poverty-street-production.helpful-summer/keep-resting` | `event.poverty-street-production.helpful-summer.choice.keep-resting.label` | COVERED_RU_EN |
| choice text `poverty-street-production.helpful-summer/keep-resting` | `event.poverty-street-production.helpful-summer.choice.keep-resting.text` | COVERED_RU_EN |
| title `poverty-street-production.neutral-autumn` | `event.poverty-street-production.neutral-autumn.title` | COVERED_RU_EN |
| body `poverty-street-production.neutral-autumn/default` | `event.poverty-street-production.neutral-autumn.variant.default.text` | COVERED_RU_EN |
| choice label `poverty-street-production.neutral-autumn/settle-in` | `event.poverty-street-production.neutral-autumn.choice.settle-in.label` | COVERED_RU_EN |
| choice text `poverty-street-production.neutral-autumn/settle-in` | `event.poverty-street-production.neutral-autumn.choice.settle-in.text` | COVERED_RU_EN |
| title `poverty-street-production.pressure-winter` | `event.poverty-street-production.pressure-winter.title` | COVERED_RU_EN |
| body `poverty-street-production.pressure-winter/default` | `event.poverty-street-production.pressure-winter.variant.default.text` | COVERED_RU_EN |
| choice label `poverty-street-production.pressure-winter/take-shelter` | `event.poverty-street-production.pressure-winter.choice.take-shelter.label` | COVERED_RU_EN |
| choice text `poverty-street-production.pressure-winter/take-shelter` | `event.poverty-street-production.pressure-winter.choice.take-shelter.text` | COVERED_RU_EN |
| choice label `poverty-street-production.pressure-winter/keep-moving` | `event.poverty-street-production.pressure-winter.choice.keep-moving.label` | COVERED_RU_EN |
| choice text `poverty-street-production.pressure-winter/keep-moving` | `event.poverty-street-production.pressure-winter.choice.keep-moving.text` | COVERED_RU_EN |

## Pack `poverty-street-production-v2`

| Surface | Localization key | Status |
| --- | --- | --- |
| title `poverty-street-production-v2.helpful-summer-shade` | `event.poverty-street-production-v2.helpful-summer-shade.title` | COVERED_RU_EN |
| body `poverty-street-production-v2.helpful-summer-shade/market-closing` | `event.poverty-street-production-v2.helpful-summer-shade.variant.market-closing.text` | COVERED_RU_EN |
| body `poverty-street-production-v2.helpful-summer-shade/late-shade` | `event.poverty-street-production-v2.helpful-summer-shade.variant.late-shade.text` | COVERED_RU_EN |
| choice label `poverty-street-production-v2.helpful-summer-shade/take-small-task` | `event.poverty-street-production-v2.helpful-summer-shade.choice.take-small-task.label` | COVERED_RU_EN |
| choice text `poverty-street-production-v2.helpful-summer-shade/take-small-task` | `event.poverty-street-production-v2.helpful-summer-shade.choice.take-small-task.text` | COVERED_RU_EN |
| choice label `poverty-street-production-v2.helpful-summer-shade/keep-place` | `event.poverty-street-production-v2.helpful-summer-shade.choice.keep-place.label` | COVERED_RU_EN |
| choice text `poverty-street-production-v2.helpful-summer-shade/keep-place` | `event.poverty-street-production-v2.helpful-summer-shade.choice.keep-place.text` | COVERED_RU_EN |
| title `poverty-street-production-v2.neutral-autumn-crossing` | `event.poverty-street-production-v2.neutral-autumn-crossing.title` | COVERED_RU_EN |
| body `poverty-street-production-v2.neutral-autumn-crossing/drizzle` | `event.poverty-street-production-v2.neutral-autumn-crossing.variant.drizzle.text` | COVERED_RU_EN |
| body `poverty-street-production-v2.neutral-autumn-crossing/dry-arcade` | `event.poverty-street-production-v2.neutral-autumn-crossing.variant.dry-arcade.text` | COVERED_RU_EN |
| choice label `poverty-street-production-v2.neutral-autumn-crossing/wait-out-night` | `event.poverty-street-production-v2.neutral-autumn-crossing.choice.wait-out-night.label` | COVERED_RU_EN |
| choice text `poverty-street-production-v2.neutral-autumn-crossing/wait-out-night` | `event.poverty-street-production-v2.neutral-autumn-crossing.choice.wait-out-night.text` | COVERED_RU_EN |
| title `poverty-street-production-v2.pressure-winter-wind` | `event.poverty-street-production-v2.pressure-winter-wind.title` | COVERED_RU_EN |
| body `poverty-street-production-v2.pressure-winter-wind/crosswind` | `event.poverty-street-production-v2.pressure-winter-wind.variant.crosswind.text` | COVERED_RU_EN |
| body `poverty-street-production-v2.pressure-winter-wind/long-gusts` | `event.poverty-street-production-v2.pressure-winter-wind.variant.long-gusts.text` | COVERED_RU_EN |
| choice label `poverty-street-production-v2.pressure-winter-wind/use-recess` | `event.poverty-street-production-v2.pressure-winter-wind.choice.use-recess.label` | COVERED_RU_EN |
| choice text `poverty-street-production-v2.pressure-winter-wind/use-recess` | `event.poverty-street-production-v2.pressure-winter-wind.choice.use-recess.text` | COVERED_RU_EN |
| choice label `poverty-street-production-v2.pressure-winter-wind/keep-walking` | `event.poverty-street-production-v2.pressure-winter-wind.choice.keep-walking.label` | COVERED_RU_EN |
| choice text `poverty-street-production-v2.pressure-winter-wind/keep-walking` | `event.poverty-street-production-v2.pressure-winter-wind.choice.keep-walking.text` | COVERED_RU_EN |

## Pack `poverty-cheap-production`

| Surface | Localization key | Status |
| --- | --- | --- |
| title `poverty-cheap-production.shared-quiet-autumn` | `event.poverty-cheap-production.shared-quiet-autumn.title` | COVERED_RU_EN |
| body `poverty-cheap-production.shared-quiet-autumn/default` | `event.poverty-cheap-production.shared-quiet-autumn.variant.default.text` | COVERED_RU_EN |
| choice label `poverty-cheap-production.shared-quiet-autumn/settle-quietly` | `event.poverty-cheap-production.shared-quiet-autumn.choice.settle-quietly.label` | COVERED_RU_EN |
| choice text `poverty-cheap-production.shared-quiet-autumn/settle-quietly` | `event.poverty-cheap-production.shared-quiet-autumn.choice.settle-quietly.text` | COVERED_RU_EN |

## Pack `poverty-cheap-production-v2`

| Surface | Localization key | Status |
| --- | --- | --- |
| title `poverty-cheap-production-v2.shared-room-seasons` | `event.poverty-cheap-production-v2.shared-room-seasons.title` | COVERED_RU_EN |
| body `poverty-cheap-production-v2.shared-room-seasons/spring-window` | `event.poverty-cheap-production-v2.shared-room-seasons.variant.spring-window.text` | COVERED_RU_EN |
| body `poverty-cheap-production-v2.shared-room-seasons/summer-heat` | `event.poverty-cheap-production-v2.shared-room-seasons.variant.summer-heat.text` | COVERED_RU_EN |
| body `poverty-cheap-production-v2.shared-room-seasons/winter-stove` | `event.poverty-cheap-production-v2.shared-room-seasons.variant.winter-stove.text` | COVERED_RU_EN |
| body `poverty-cheap-production-v2.shared-room-seasons/shared-room` | `event.poverty-cheap-production-v2.shared-room-seasons.variant.shared-room.text` | COVERED_RU_EN |
| choice label `poverty-cheap-production-v2.shared-room-seasons/settle-in` | `event.poverty-cheap-production-v2.shared-room-seasons.choice.settle-in.label` | COVERED_RU_EN |
| choice text `poverty-cheap-production-v2.shared-room-seasons/settle-in` | `event.poverty-cheap-production-v2.shared-room-seasons.choice.settle-in.text` | COVERED_RU_EN |

## Pack `poverty-recovery-production`

| Surface | Localization key | Status |
| --- | --- | --- |
| title `poverty-recovery-production.small-coin-help` | `event.poverty-recovery-production.small-coin-help.title` | COVERED_RU_EN |
| body `poverty-recovery-production.small-coin-help/default` | `event.poverty-recovery-production.small-coin-help.variant.default.text` | COVERED_RU_EN |
| choice label `poverty-recovery-production.small-coin-help/take-coins` | `event.poverty-recovery-production.small-coin-help.choice.take-coins.label` | COVERED_RU_EN |
| choice text `poverty-recovery-production.small-coin-help/take-coins` | `event.poverty-recovery-production.small-coin-help.choice.take-coins.text` | COVERED_RU_EN |
| choice label `poverty-recovery-production.small-coin-help/leave-them` | `event.poverty-recovery-production.small-coin-help.choice.leave-them.label` | COVERED_RU_EN |
| choice text `poverty-recovery-production.small-coin-help/leave-them` | `event.poverty-recovery-production.small-coin-help.choice.leave-them.text` | COVERED_RU_EN |
| title `poverty-recovery-production.short-cleanup` | `event.poverty-recovery-production.short-cleanup.title` | COVERED_RU_EN |
| body `poverty-recovery-production.short-cleanup/default` | `event.poverty-recovery-production.short-cleanup.variant.default.text` | COVERED_RU_EN |
| choice label `poverty-recovery-production.short-cleanup/do-cleanup` | `event.poverty-recovery-production.short-cleanup.choice.do-cleanup.label` | COVERED_RU_EN |
| choice text `poverty-recovery-production.short-cleanup/do-cleanup` | `event.poverty-recovery-production.short-cleanup.choice.do-cleanup.text` | COVERED_RU_EN |
| choice label `poverty-recovery-production.short-cleanup/keep-resting` | `event.poverty-recovery-production.short-cleanup.choice.keep-resting.label` | COVERED_RU_EN |
| choice text `poverty-recovery-production.short-cleanup/keep-resting` | `event.poverty-recovery-production.short-cleanup.choice.keep-resting.text` | COVERED_RU_EN |
| title `poverty-recovery-production.herb-bundle` | `event.poverty-recovery-production.herb-bundle.title` | COVERED_RU_EN |
| body `poverty-recovery-production.herb-bundle/default` | `event.poverty-recovery-production.herb-bundle.variant.default.text` | COVERED_RU_EN |
| choice label `poverty-recovery-production.herb-bundle/take-herb` | `event.poverty-recovery-production.herb-bundle.choice.take-herb.label` | COVERED_RU_EN |
| choice text `poverty-recovery-production.herb-bundle/take-herb` | `event.poverty-recovery-production.herb-bundle.choice.take-herb.text` | COVERED_RU_EN |
| choice label `poverty-recovery-production.herb-bundle/leave-herb` | `event.poverty-recovery-production.herb-bundle.choice.leave-herb.label` | COVERED_RU_EN |
| choice text `poverty-recovery-production.herb-bundle/leave-herb` | `event.poverty-recovery-production.herb-bundle.choice.leave-herb.text` | COVERED_RU_EN |

## Pack `poverty-pressure-production`

| Surface | Localization key | Status |
| --- | --- | --- |
| title `poverty-pressure-production.cold-rain` | `event.poverty-pressure-production.cold-rain.title` | COVERED_RU_EN |
| body `poverty-pressure-production.cold-rain/default` | `event.poverty-pressure-production.cold-rain.variant.default.text` | COVERED_RU_EN |
| choice label `poverty-pressure-production.cold-rain/take-doorway` | `event.poverty-pressure-production.cold-rain.choice.take-doorway.label` | COVERED_RU_EN |
| choice text `poverty-pressure-production.cold-rain/take-doorway` | `event.poverty-pressure-production.cold-rain.choice.take-doorway.text` | COVERED_RU_EN |
| choice label `poverty-pressure-production.cold-rain/wait-it-out` | `event.poverty-pressure-production.cold-rain.choice.wait-it-out.label` | COVERED_RU_EN |
| choice text `poverty-pressure-production.cold-rain/wait-it-out` | `event.poverty-pressure-production.cold-rain.choice.wait-it-out.text` | COVERED_RU_EN |
| title `poverty-pressure-production.noisy-loading` | `event.poverty-pressure-production.noisy-loading.title` | COVERED_RU_EN |
| body `poverty-pressure-production.noisy-loading/default` | `event.poverty-pressure-production.noisy-loading.variant.default.text` | COVERED_RU_EN |
| choice label `poverty-pressure-production.noisy-loading/move-corner` | `event.poverty-pressure-production.noisy-loading.choice.move-corner.label` | COVERED_RU_EN |
| choice text `poverty-pressure-production.noisy-loading/move-corner` | `event.poverty-pressure-production.noisy-loading.choice.move-corner.text` | COVERED_RU_EN |
| choice label `poverty-pressure-production.noisy-loading/stay-put` | `event.poverty-pressure-production.noisy-loading.choice.stay-put.label` | COVERED_RU_EN |
| choice text `poverty-pressure-production.noisy-loading/stay-put` | `event.poverty-pressure-production.noisy-loading.choice.stay-put.text` | COVERED_RU_EN |
| title `poverty-pressure-production.muddy-splash` | `event.poverty-pressure-production.muddy-splash.title` | COVERED_RU_EN |
| body `poverty-pressure-production.muddy-splash/default` | `event.poverty-pressure-production.muddy-splash.variant.default.text` | COVERED_RU_EN |
| choice label `poverty-pressure-production.muddy-splash/wipe-down` | `event.poverty-pressure-production.muddy-splash.choice.wipe-down.label` | COVERED_RU_EN |
| choice text `poverty-pressure-production.muddy-splash/wipe-down` | `event.poverty-pressure-production.muddy-splash.choice.wipe-down.text` | COVERED_RU_EN |
| choice label `poverty-pressure-production.muddy-splash/leave-for-morning` | `event.poverty-pressure-production.muddy-splash.choice.leave-for-morning.label` | COVERED_RU_EN |
| choice text `poverty-pressure-production.muddy-splash/leave-for-morning` | `event.poverty-pressure-production.muddy-splash.choice.leave-for-morning.text` | COVERED_RU_EN |

## Shared media `stage.outside`

| Surface | Localization key | Status |
| --- | --- | --- |
| media alt `stage.outside` | `media.stage.outside.alt` | COVERED_RU_EN |

## Shared media `stage.room`

| Surface | Localization key | Status |
| --- | --- | --- |
| media alt `stage.room` | `media.stage.room.alt` | COVERED_RU_EN |

## Coverage totals

- COVERED_RU_EN: **84**
- RU_FALLBACK_ONLY: **0**
- MISSING: **0**
- player-facing surfaces total: **84**

Expected bounded total:
- 14 event titles;
- 20 variant bodies;
- 24 choice labels;
- 24 choice texts;
- 2 shared media alts;
- **84 player-facing surfaces**.

## NON_PLAYER_FACING

The following current production fields are deliberately not localization surfaces:
- event IDs;
- variant IDs;
- choice IDs;
- pack IDs;
- `conditions`;
- `reactionTriggers`;
- `nightPolicy`;
- `priority` / `priorityClass`;
- `chance`;
- `cooldownDays` / `variantCooldownDays` / `maxShows`;
- choice `effects`;
- housing-tier and season/day conditions;
- resource/stat/item effect payloads.

These remain locale-neutral gameplay data.

## Current-main distinction

Current `main` does not yet contain the ordinary-poverty event localization delta. The statuses above describe the complete item-140 selective-integration payload against shipped PR37 identities, not a claim that those 84 keys are already merged to `main`.

Until item 140 is selectively integrated:
- shipped gameplay identities remain correct;
- current English pack strings remain available as pack fallback;
- the RU+EN delta is READY_FOR_SELECTIVE_INTEGRATION.

## Secret Debt firewall

No lender, debt activation, hidden-career, forced-Night, or Secret Debt outcome identity appears in this ledger.
