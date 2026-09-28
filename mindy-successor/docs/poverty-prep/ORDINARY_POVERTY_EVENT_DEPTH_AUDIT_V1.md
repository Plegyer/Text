# Ordinary Poverty Event Depth Audit v1

Status: current-main presentation/content-depth audit only. No mechanics changes.

Current main:
`52ddc76148e33836d3161b63bf4c25ffb5c39d02`.

Secret Debt excluded.

## Event-by-event audit

| Event | Depth | Seasonal coverage | RU/EN completeness | Journal | Presentation | Content-only gap |
| --- | --- | --- | --- | --- | --- | --- |
| `poverty-street-production.helpful-summer` | 1 body variant(s), 2 choice(s) | summer | complete RU+EN | stable eventChoice ref for 2 choice(s) | `location/town/event/poverty-street-production-helpful-summer/default` ✓ | single body variant |
| `poverty-street-production.neutral-autumn` | 1 body variant(s), 1 choice(s) | autumn | complete RU+EN | stable eventChoice ref for 1 choice(s) | `location/town/event/poverty-street-production-neutral-autumn/default` ✓ | single body variant; single decision line |
| `poverty-street-production.pressure-winter` | 1 body variant(s), 2 choice(s) | winter | complete RU+EN | stable eventChoice ref for 2 choice(s) | `location/town/event/poverty-street-production-pressure-winter/default` ✓ | single body variant |
| `poverty-street-production-v2.helpful-summer-shade` | 2 body variant(s), 2 choice(s) | summer | complete RU+EN | stable eventChoice ref for 2 choice(s) | `location/town/event/poverty-street-production-v2-helpful-summer-shade/market-closing`<br>`location/town/event/poverty-street-production-v2-helpful-summer-shade/late-shade` | 2 semantic variant(s) lack bespoke root static |
| `poverty-street-production-v2.neutral-autumn-crossing` | 2 body variant(s), 1 choice(s) | autumn | complete RU+EN | stable eventChoice ref for 1 choice(s) | `location/town/event/poverty-street-production-v2-neutral-autumn-crossing/drizzle`<br>`location/town/event/poverty-street-production-v2-neutral-autumn-crossing/dry-arcade` | single decision line; 2 semantic variant(s) lack bespoke root static |
| `poverty-street-production-v2.pressure-winter-wind` | 2 body variant(s), 2 choice(s) | winter | complete RU+EN | stable eventChoice ref for 2 choice(s) | `location/town/event/poverty-street-production-v2-pressure-winter-wind/crosswind`<br>`location/town/event/poverty-street-production-v2-pressure-winter-wind/long-gusts` | 2 semantic variant(s) lack bespoke root static |
| `poverty-cheap-production.shared-quiet-autumn` | 1 body variant(s), 1 choice(s) | autumn | complete RU+EN | stable eventChoice ref for 1 choice(s) | `location/town/event/poverty-cheap-production-shared-quiet-autumn/default` ✓ | single body variant; single decision line |
| `poverty-cheap-production-v2.shared-room-seasons` | 4 body variant(s), 1 choice(s) | spring, summer, winter | complete RU+EN | stable eventChoice ref for 1 choice(s) | `location/town/event/poverty-cheap-production-v2-shared-room-seasons/spring-window`<br>`location/town/event/poverty-cheap-production-v2-shared-room-seasons/summer-heat`<br>`location/town/event/poverty-cheap-production-v2-shared-room-seasons/winter-stove`<br>`location/town/event/poverty-cheap-production-v2-shared-room-seasons/shared-room` | single decision line; 4 semantic variant(s) lack bespoke root static |
| `poverty-recovery-production.small-coin-help` | 1 body variant(s), 2 choice(s) | spring | complete RU+EN | stable eventChoice ref for 2 choice(s) | `location/town/event/poverty-recovery-production-small-coin-help/default` ✓ | single body variant |
| `poverty-recovery-production.short-cleanup` | 1 body variant(s), 2 choice(s) | spring | complete RU+EN | stable eventChoice ref for 2 choice(s) | `location/town/event/poverty-recovery-production-short-cleanup/default` ✓ | single body variant |
| `poverty-recovery-production.herb-bundle` | 1 body variant(s), 2 choice(s) | spring | complete RU+EN | stable eventChoice ref for 2 choice(s) | `location/town/event/poverty-recovery-production-herb-bundle/default` ✓ | single body variant |
| `poverty-pressure-production.cold-rain` | 1 body variant(s), 2 choice(s) | spring | complete RU+EN | stable eventChoice ref for 2 choice(s) | `location/town/event/poverty-pressure-production-cold-rain/default` ✓ | single body variant |
| `poverty-pressure-production.noisy-loading` | 1 body variant(s), 2 choice(s) | spring | complete RU+EN | stable eventChoice ref for 2 choice(s) | `location/town/event/poverty-pressure-production-noisy-loading/default` ✓ | single body variant |
| `poverty-pressure-production.muddy-splash` | 1 body variant(s), 2 choice(s) | spring | complete RU+EN | stable eventChoice ref for 2 choice(s) | `location/town/event/poverty-pressure-production-muddy-splash/default` ✓ | single body variant |


## Coverage summary

All 14 current ordinary-poverty events have:
- localized title;
- localized variant body/bodies;
- localized choice label(s);
- localized choice outcome text;
- shipped stable Journal/lastAction event-choice identity.

Current authored body depth:
- 20 total variants across 14 events.

Current decision depth:
- 24 total choices across 14 events.

## Seasonal shape

Street production covers:
- summer helpful;
- autumn neutral;
- winter pressure.

Street v2 adds narrow day-window variants for:
- summer helpful;
- autumn neutral;
- winter pressure.

Cheap lodging:
- autumn dedicated scene;
- spring/summer/winter shared-room seasonal variants.

Recovery/pressure spring scenes add day-specific content.

This audit records presentation depth only and does not request condition changes.

## RU/EN quality

All exact current event title/body/choice keys reviewed here are non-empty in both RU and EN.

The main remaining copy-depth opportunities are:
- additional presentation-only phrasing/scene variants for single-variant helpful/recovery/pressure identities;
- additional presentation-only scene variants around cheap lodging;
- bespoke static media for semantic variant IDs that currently fall back.

## Journal/outcome coverage

All 24 choices are covered by shipped stable:
`eventId + choiceId`
Journal/lastAction refs.

No new Save identity is needed for more localized presentation text.

## Presentation coverage

Exact semantic presentation IDs are already deterministic for every current event variant.

Bespoke root static exists for a subset of those IDs; missing bespoke static is a media-depth gap, not a gameplay/content identity gap.

## Audit conclusion

Current ordinary poverty has complete bilingual core copy and stable journal identity. Depth work can safely focus on additional RU+EN presentation-only variants and richer semantic presentation coverage while leaving all current event conditions/effects unchanged.
