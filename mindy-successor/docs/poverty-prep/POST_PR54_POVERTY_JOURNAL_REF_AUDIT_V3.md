# Post-PR54 Poverty Journal Ref Audit v3

Status: exact audit against merged PR #54 locale-neutral journal/outcome refs.

Current main:
`295e6fc74d235f0b7555794555a18373451e8b7e`.

PR #54 behavior:
- resolving an event choice creates `outcomeRef={kind:'eventChoice',eventId,choiceId}`;
- the same ref is appended to `historyState.journalRefs`;
- the same ref is attached to `lastAction.outcomeRef`;
- Journal renders `event.<eventId>.choice.<choiceId>.text`;
- lastAction renders localized event title and choice text from the stable ref;
- stored raw text remains fallback/compatibility data.

## Ordinary-poverty coverage

| Pack | Event ID | Choice ID | Title key | Choice label key | Choice text key |
| --- | --- | --- | --- | --- | --- |
| `poverty-street-production` | `poverty-street-production.helpful-summer` | `take-errand` | `event.poverty-street-production.helpful-summer.title` | `event.poverty-street-production.helpful-summer.choice.take-errand.label` | `event.poverty-street-production.helpful-summer.choice.take-errand.text` |
| `poverty-street-production` | `poverty-street-production.helpful-summer` | `keep-resting` | `event.poverty-street-production.helpful-summer.title` | `event.poverty-street-production.helpful-summer.choice.keep-resting.label` | `event.poverty-street-production.helpful-summer.choice.keep-resting.text` |
| `poverty-street-production` | `poverty-street-production.neutral-autumn` | `settle-in` | `event.poverty-street-production.neutral-autumn.title` | `event.poverty-street-production.neutral-autumn.choice.settle-in.label` | `event.poverty-street-production.neutral-autumn.choice.settle-in.text` |
| `poverty-street-production` | `poverty-street-production.pressure-winter` | `take-shelter` | `event.poverty-street-production.pressure-winter.title` | `event.poverty-street-production.pressure-winter.choice.take-shelter.label` | `event.poverty-street-production.pressure-winter.choice.take-shelter.text` |
| `poverty-street-production` | `poverty-street-production.pressure-winter` | `keep-moving` | `event.poverty-street-production.pressure-winter.title` | `event.poverty-street-production.pressure-winter.choice.keep-moving.label` | `event.poverty-street-production.pressure-winter.choice.keep-moving.text` |
| `poverty-street-production-v2` | `poverty-street-production-v2.helpful-summer-shade` | `take-small-task` | `event.poverty-street-production-v2.helpful-summer-shade.title` | `event.poverty-street-production-v2.helpful-summer-shade.choice.take-small-task.label` | `event.poverty-street-production-v2.helpful-summer-shade.choice.take-small-task.text` |
| `poverty-street-production-v2` | `poverty-street-production-v2.helpful-summer-shade` | `keep-place` | `event.poverty-street-production-v2.helpful-summer-shade.title` | `event.poverty-street-production-v2.helpful-summer-shade.choice.keep-place.label` | `event.poverty-street-production-v2.helpful-summer-shade.choice.keep-place.text` |
| `poverty-street-production-v2` | `poverty-street-production-v2.neutral-autumn-crossing` | `wait-out-night` | `event.poverty-street-production-v2.neutral-autumn-crossing.title` | `event.poverty-street-production-v2.neutral-autumn-crossing.choice.wait-out-night.label` | `event.poverty-street-production-v2.neutral-autumn-crossing.choice.wait-out-night.text` |
| `poverty-street-production-v2` | `poverty-street-production-v2.pressure-winter-wind` | `use-recess` | `event.poverty-street-production-v2.pressure-winter-wind.title` | `event.poverty-street-production-v2.pressure-winter-wind.choice.use-recess.label` | `event.poverty-street-production-v2.pressure-winter-wind.choice.use-recess.text` |
| `poverty-street-production-v2` | `poverty-street-production-v2.pressure-winter-wind` | `keep-walking` | `event.poverty-street-production-v2.pressure-winter-wind.title` | `event.poverty-street-production-v2.pressure-winter-wind.choice.keep-walking.label` | `event.poverty-street-production-v2.pressure-winter-wind.choice.keep-walking.text` |
| `poverty-cheap-production` | `poverty-cheap-production.shared-quiet-autumn` | `settle-quietly` | `event.poverty-cheap-production.shared-quiet-autumn.title` | `event.poverty-cheap-production.shared-quiet-autumn.choice.settle-quietly.label` | `event.poverty-cheap-production.shared-quiet-autumn.choice.settle-quietly.text` |
| `poverty-cheap-production-v2` | `poverty-cheap-production-v2.shared-room-seasons` | `settle-in` | `event.poverty-cheap-production-v2.shared-room-seasons.title` | `event.poverty-cheap-production-v2.shared-room-seasons.choice.settle-in.label` | `event.poverty-cheap-production-v2.shared-room-seasons.choice.settle-in.text` |
| `poverty-recovery-production` | `poverty-recovery-production.small-coin-help` | `take-coins` | `event.poverty-recovery-production.small-coin-help.title` | `event.poverty-recovery-production.small-coin-help.choice.take-coins.label` | `event.poverty-recovery-production.small-coin-help.choice.take-coins.text` |
| `poverty-recovery-production` | `poverty-recovery-production.small-coin-help` | `leave-them` | `event.poverty-recovery-production.small-coin-help.title` | `event.poverty-recovery-production.small-coin-help.choice.leave-them.label` | `event.poverty-recovery-production.small-coin-help.choice.leave-them.text` |
| `poverty-recovery-production` | `poverty-recovery-production.short-cleanup` | `do-cleanup` | `event.poverty-recovery-production.short-cleanup.title` | `event.poverty-recovery-production.short-cleanup.choice.do-cleanup.label` | `event.poverty-recovery-production.short-cleanup.choice.do-cleanup.text` |
| `poverty-recovery-production` | `poverty-recovery-production.short-cleanup` | `keep-resting` | `event.poverty-recovery-production.short-cleanup.title` | `event.poverty-recovery-production.short-cleanup.choice.keep-resting.label` | `event.poverty-recovery-production.short-cleanup.choice.keep-resting.text` |
| `poverty-recovery-production` | `poverty-recovery-production.herb-bundle` | `take-herb` | `event.poverty-recovery-production.herb-bundle.title` | `event.poverty-recovery-production.herb-bundle.choice.take-herb.label` | `event.poverty-recovery-production.herb-bundle.choice.take-herb.text` |
| `poverty-recovery-production` | `poverty-recovery-production.herb-bundle` | `leave-herb` | `event.poverty-recovery-production.herb-bundle.title` | `event.poverty-recovery-production.herb-bundle.choice.leave-herb.label` | `event.poverty-recovery-production.herb-bundle.choice.leave-herb.text` |
| `poverty-pressure-production` | `poverty-pressure-production.cold-rain` | `take-doorway` | `event.poverty-pressure-production.cold-rain.title` | `event.poverty-pressure-production.cold-rain.choice.take-doorway.label` | `event.poverty-pressure-production.cold-rain.choice.take-doorway.text` |
| `poverty-pressure-production` | `poverty-pressure-production.cold-rain` | `wait-it-out` | `event.poverty-pressure-production.cold-rain.title` | `event.poverty-pressure-production.cold-rain.choice.wait-it-out.label` | `event.poverty-pressure-production.cold-rain.choice.wait-it-out.text` |
| `poverty-pressure-production` | `poverty-pressure-production.noisy-loading` | `move-corner` | `event.poverty-pressure-production.noisy-loading.title` | `event.poverty-pressure-production.noisy-loading.choice.move-corner.label` | `event.poverty-pressure-production.noisy-loading.choice.move-corner.text` |
| `poverty-pressure-production` | `poverty-pressure-production.noisy-loading` | `stay-put` | `event.poverty-pressure-production.noisy-loading.title` | `event.poverty-pressure-production.noisy-loading.choice.stay-put.label` | `event.poverty-pressure-production.noisy-loading.choice.stay-put.text` |
| `poverty-pressure-production` | `poverty-pressure-production.muddy-splash` | `wipe-down` | `event.poverty-pressure-production.muddy-splash.title` | `event.poverty-pressure-production.muddy-splash.choice.wipe-down.label` | `event.poverty-pressure-production.muddy-splash.choice.wipe-down.text` |
| `poverty-pressure-production` | `poverty-pressure-production.muddy-splash` | `leave-for-morning` | `event.poverty-pressure-production.muddy-splash.title` | `event.poverty-pressure-production.muddy-splash.choice.leave-for-morning.label` | `event.poverty-pressure-production.muddy-splash.choice.leave-for-morning.text` |

Reviewed resolved choices: **24**.

Every listed title/label/text key exists in current root localization with both RU and EN.

## Ref invariance

For every resolved ordinary-poverty choice:
- stable ref identity is exactly `eventId + choiceId`;
- locale changes only rendering;
- effects are applied once before the ref is logged;
- switching locale does not replay effects;
- Journal refs remain aligned with Journal entries;
- lastAction ref remains the same stable event/choice identity.

## Secret Debt exclusion

No event in this audit belongs to Secret Debt.

The six audited production packs are only:
- `poverty-street-production`
- `poverty-street-production-v2`
- `poverty-cheap-production`
- `poverty-cheap-production-v2`
- `poverty-recovery-production`
- `poverty-pressure-production`.

No lender/forced-Night/career-block/`paid_freedom`/`bound_life`/`takeover` identity is included.

## Conclusion

Merged PR #54 provides the correct locale-neutral Journal + lastAction reference path for all current ordinary-poverty resolved choices without changing their mechanics.
