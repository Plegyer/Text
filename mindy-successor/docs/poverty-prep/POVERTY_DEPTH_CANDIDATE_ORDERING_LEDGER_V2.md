# Poverty Depth Candidate Ordering Ledger v2

Status: exact-current refresh of deterministic ordinary-poverty depth candidate ordering.

Current main:
`60753968e28e86d9bb63b7818d39c23fd08fe5fa`.

Historical source map:
`poverty-depth-key-to-variant-map-v1.fixture.json`
from `chat3/lumber-production-proof-next`.

## Current occurrence source

The existing runtime event history remains the read-only occurrence source:

`run.historyState.eventHistory[eventId].count`.

Current engine occurrence source detected:
**YES**.

No new Save field is proposed.

## Selection rule

For the exact current `eventId + variantId` group:

1. collect only mapped depth keys for that exact pair;
2. sort candidate keys lexicographically;
3. read existing event show count;
4. select:

`index = max(showCount - 1, 0) % candidateCount`.

This uses no gameplay RNG.

## Exact current ordered groups

| Event ID | Variant ID | Ordered depth candidate keys | Valid current mapping |
| --- | --- | --- | --- |
| `poverty-cheap-production-v2.shared-room-seasons` | `shared-room` | `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.shared-room.d.text` | YES |
| `poverty-cheap-production-v2.shared-room-seasons` | `spring-window` | `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.spring-window.a.text` | YES |
| `poverty-cheap-production-v2.shared-room-seasons` | `summer-heat` | `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.summer-heat.b.text` | YES |
| `poverty-cheap-production-v2.shared-room-seasons` | `winter-stove` | `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.winter-stove.c.text` | YES |
| `poverty-cheap-production.shared-quiet-autumn` | `default` | `presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.a.text`<br>`presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.b.text` | YES |
| `poverty-pressure-production.cold-rain` | `default` | `presentation.poverty.depth.poverty-pressure-production-cold-rain.default.a.text`<br>`presentation.poverty.depth.poverty-pressure-production-cold-rain.default.b.text` | YES |
| `poverty-pressure-production.muddy-splash` | `default` | `presentation.poverty.depth.poverty-pressure-production-muddy-splash.default.a.text`<br>`presentation.poverty.depth.poverty-pressure-production-muddy-splash.default.b.text` | YES |
| `poverty-pressure-production.noisy-loading` | `default` | `presentation.poverty.depth.poverty-pressure-production-noisy-loading.default.a.text`<br>`presentation.poverty.depth.poverty-pressure-production-noisy-loading.default.b.text` | YES |
| `poverty-recovery-production.herb-bundle` | `default` | `presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.a.text`<br>`presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.b.text` | YES |
| `poverty-recovery-production.short-cleanup` | `default` | `presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.a.text`<br>`presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.b.text` | YES |
| `poverty-recovery-production.small-coin-help` | `default` | `presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.a.text`<br>`presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.b.text` | YES |
| `poverty-street-production-v2.helpful-summer-shade` | `late-shade` | `presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.late-shade.b.text` | YES |
| `poverty-street-production-v2.helpful-summer-shade` | `market-closing` | `presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.market-closing.a.text` | YES |
| `poverty-street-production-v2.pressure-winter-wind` | `crosswind` | `presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.crosswind.a.text` | YES |
| `poverty-street-production-v2.pressure-winter-wind` | `long-gusts` | `presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.long-gusts.b.text` | YES |
| `poverty-street-production.helpful-summer` | `default` | `presentation.poverty.depth.poverty-street-production-helpful-summer.default.a.text`<br>`presentation.poverty.depth.poverty-street-production-helpful-summer.default.b.text` | YES |
| `poverty-street-production.pressure-winter` | `default` | `presentation.poverty.depth.poverty-street-production-pressure-winter.default.a.text`<br>`presentation.poverty.depth.poverty-street-production-pressure-winter.default.b.text` | YES |


Mapped groups:
**17**.

Mapped keys:
**26**.

## Invalid historical mappings

Invalid current mappings:
**0**.

None. Every historical mapped eventId + variantId still exists exactly in current production.

## One-candidate behavior

A one-candidate group always renders the same presentation depth key.

## Multi-candidate behavior

A multi-candidate group rotates only through its own exact current mapped keys using existing event-history count.

Locale is not part of selection.

## No gameplay RNG / Save mutation

The presentation selector must not:
- read or advance `run.rng`;
- read or advance Activity RNG;
- add a selected-depth field to Save;
- mutate event history count;
- change event/variant/choice identity.

## Fallback

If an exact current event/variant group has no valid depth key, item 345 must explicitly map it to current core variant-text fallback.

## Conclusion

All 17 historical mapped groups remain valid on exact current production, with 0 invalid mappings. Candidate ordering remains deterministic, locale-neutral and presentation-only.
