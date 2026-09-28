# Post-PR58 Ordinary Poverty Production Inventory v1

Status: exact current-main inventory after PR #58. Secret Debt is excluded.

Current main:
`52ddc76148e33836d3161b63bf4c25ffb5c39d02`.

## Production packs

Exact shipped ordinary-poverty packs:
- `poverty-street-production`
- `poverty-street-production-v2`
- `poverty-cheap-production`
- `poverty-cheap-production-v2`
- `poverty-recovery-production`
- `poverty-pressure-production`.

Counts:
- packs: **6**;
- events: **14**;
- variants: **20**;
- event choices: **24**.

## Event / presentation inventory

| Pack | Event | Variants | Choices | Trigger | Semantic presentation IDs | Root static coverage |
| --- | --- | ---: | ---: | --- | --- | --- |
| `poverty-street-production` | `poverty-street-production.helpful-summer` | 1 | 2 | `nightPhase(after_lodging)` | `location/town/event/poverty-street-production-helpful-summer/default` | `location/town/event/poverty-street-production-helpful-summer/default` |
| `poverty-street-production` | `poverty-street-production.neutral-autumn` | 1 | 1 | `nightPhase(after_lodging)` | `location/town/event/poverty-street-production-neutral-autumn/default` | `location/town/event/poverty-street-production-neutral-autumn/default` |
| `poverty-street-production` | `poverty-street-production.pressure-winter` | 1 | 2 | `nightPhase(after_lodging)` | `location/town/event/poverty-street-production-pressure-winter/default` | `location/town/event/poverty-street-production-pressure-winter/default` |
| `poverty-street-production-v2` | `poverty-street-production-v2.helpful-summer-shade` | 2 | 2 | `nightPhase(after_lodging)` | `location/town/event/poverty-street-production-v2-helpful-summer-shade/market-closing`<br>`location/town/event/poverty-street-production-v2-helpful-summer-shade/late-shade` | generic/fallback only |
| `poverty-street-production-v2` | `poverty-street-production-v2.neutral-autumn-crossing` | 2 | 1 | `nightPhase(after_lodging)` | `location/town/event/poverty-street-production-v2-neutral-autumn-crossing/drizzle`<br>`location/town/event/poverty-street-production-v2-neutral-autumn-crossing/dry-arcade` | generic/fallback only |
| `poverty-street-production-v2` | `poverty-street-production-v2.pressure-winter-wind` | 2 | 2 | `nightPhase(after_lodging)` | `location/town/event/poverty-street-production-v2-pressure-winter-wind/crosswind`<br>`location/town/event/poverty-street-production-v2-pressure-winter-wind/long-gusts` | generic/fallback only |
| `poverty-cheap-production` | `poverty-cheap-production.shared-quiet-autumn` | 1 | 1 | `nightPhase(after_lodging)` | `location/town/event/poverty-cheap-production-shared-quiet-autumn/default` | `location/town/event/poverty-cheap-production-shared-quiet-autumn/default` |
| `poverty-cheap-production-v2` | `poverty-cheap-production-v2.shared-room-seasons` | 4 | 1 | `nightPhase(after_lodging)` | `location/town/event/poverty-cheap-production-v2-shared-room-seasons/spring-window`<br>`location/town/event/poverty-cheap-production-v2-shared-room-seasons/summer-heat`<br>`location/town/event/poverty-cheap-production-v2-shared-room-seasons/winter-stove`<br>`location/town/event/poverty-cheap-production-v2-shared-room-seasons/shared-room` | generic/fallback only |
| `poverty-recovery-production` | `poverty-recovery-production.small-coin-help` | 1 | 2 | `nightPhase(after_lodging)` | `location/town/event/poverty-recovery-production-small-coin-help/default` | `location/town/event/poverty-recovery-production-small-coin-help/default` |
| `poverty-recovery-production` | `poverty-recovery-production.short-cleanup` | 1 | 2 | `nightPhase(after_lodging)` | `location/town/event/poverty-recovery-production-short-cleanup/default` | `location/town/event/poverty-recovery-production-short-cleanup/default` |
| `poverty-recovery-production` | `poverty-recovery-production.herb-bundle` | 1 | 2 | `nightPhase(after_lodging)` | `location/town/event/poverty-recovery-production-herb-bundle/default` | `location/town/event/poverty-recovery-production-herb-bundle/default` |
| `poverty-pressure-production` | `poverty-pressure-production.cold-rain` | 1 | 2 | `nightPhase(after_lodging)` | `location/town/event/poverty-pressure-production-cold-rain/default` | `location/town/event/poverty-pressure-production-cold-rain/default` |
| `poverty-pressure-production` | `poverty-pressure-production.noisy-loading` | 1 | 2 | `nightPhase(after_lodging)` | `location/town/event/poverty-pressure-production-noisy-loading/default` | `location/town/event/poverty-pressure-production-noisy-loading/default` |
| `poverty-pressure-production` | `poverty-pressure-production.muddy-splash` | 1 | 2 | `nightPhase(after_lodging)` | `location/town/event/poverty-pressure-production-muddy-splash/default` | `location/town/event/poverty-pressure-production-muddy-splash/default` |


Current event presentation identity is derived by shipped `presentationIdForEvent(...)` as:
`location/town/event/<clean-event-id>/<clean-variant-id>`
for poverty source-domain events.

Root route/event-specific static coverage exists for **10** variant presentation IDs. Other exact semantic IDs still resolve through presentation fallback behavior rather than a bespoke event static.

## Ordinary-poverty actions

Current `definitions.json` ordinary-poverty-specific action IDs:
**0**.

Ordinary poverty currently enters through Night-phase reaction events, not through a dedicated poverty action.

Its player decisions are event **choice IDs**, not `definitions.actions` IDs.

## Exact localization inventory

Current root event localization keys under `event.poverty-*`:
**82**.

These cover current:
- event titles;
- variant text;
- choice labels;
- choice outcome text.

Current poverty static-presentation localization keys:
**28**.

Those keys cover alt/caption for current project-owned poverty static sources.

## Journal/outcome coverage

Every current ordinary-poverty resolved choice can use shipped stable:
`{kind:'eventChoice', eventId, choiceId}`
Journal/lastAction refs.

Current resolved-choice count:
**24**.

Journal render keys:
- `event.<eventId>.title`;
- `event.<eventId>.choice.<choiceId>.text`.

## Night ownership

All current ordinary-poverty events use:
`nightPhase(after_lodging)`.

Their source domain is:
`poverty`.

They remain context events around street/cheap lodging and do not become a separate Night choice identity.

## Secret Debt exclusion

This inventory contains no:
- lender/Secret Debt event;
- forced Secret Debt Night;
- bound-career identity;
- `paid_freedom`;
- `bound_life`;
- `takeover`.

Generic debt economy is also outside this ordinary-poverty inventory.

## Inventory conclusion

Post-PR58 ordinary poverty consists of six exact Night-reaction packs, 14 events, 20 authored variants and 24 choice outcomes, with full current event RU+EN localization and partial bespoke static presentation coverage.
