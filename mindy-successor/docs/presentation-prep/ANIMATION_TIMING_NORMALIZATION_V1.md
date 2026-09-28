# Animation Timing Normalization v1

Exact current-main semantic baseline:
`3fc5495310e281cf5cbe52da3642000f1cb1fb05`.

Scope: every current semantic presentation identity that now has at least three compatible project-owned 4-frame source sequences.

Purpose: normalize future export timing without changing source SVG bytes or making a GIF-production claim.

## Normalized timing table

| Semantic presentation ID | Compatible source sequences | Normalized loop | Frames | Normalized per-frame delay |
| --- | ---: | ---: | ---: | ---: |
| `job/lumber/shift/spring/default` | 3 | 2400 ms | 4 | 600 ms |
| `job/guard/shift/summer/default` | 3 | 2800 ms | 4 | 700 ms |
| `job/tavern/shift/autumn/default` | 3 | 2600 ms | 4 | 650 ms |
| `school/literacy-and-numbers/lesson/default` | 3 | 3000 ms | 4 | 750 ms |
| `location/town/event/poverty-street-production-helpful-summer/default` | 3 | 2400 ms | 4 | 600 ms |
| `activity/forest/return/success` | 3 | 3200 ms | 4 | 800 ms |
| `relationship/lumber-foreman/lumber-night-foreman-professional/default` | 3 | 3600 ms | 4 | 900 ms |
| `school/arcana/lesson/default` | 3 | 3000 ms | 4 | 750 ms |

All normalized delays are exact multiples of 10 ms and therefore can be represented by GIF centisecond timing without rounding drift.

## Source-duration handling

Existing frame SVG metadata records the original authored source-loop duration per sequence.

Those source durations remain source-history metadata.

Future GIF export should use the normalized semantic timing above so that:
- three candidate loops for one semantic identity feel comparable;
- deterministic candidate selection does not also produce large timing jumps;
- timing is stable regardless of locale;
- pool QA can compare candidate duration directly.

The exporter should not rewrite source SVG metadata just to normalize export timing.

Instead the export manifest may carry both:
- `sourceLoopDurationMs`;
- `normalizedExportLoopDurationMs`.

## Semantic-specific rationale

### Lumber spring — 2400 ms
A compact work beat with tool/log/foliage motion. Fast enough to read as active work without implying gameplay duration.

### Guard summer — 2800 ms
A slower watch-post idle lets pennant, stance, shield/spear and sun motion remain readable.

### Tavern autumn — 2600 ms
Service-counter motion should feel active but not frantic.

### School Literacy — 3000 ms
Page/token/abacus motion benefits from a calmer study cadence.

### Poverty helpful summer — 2400 ms
Small help/parcel/basket/jug motion should remain brief and event-neutral.

### Forest success return — 3200 ms
Leaf/pack/ambient safe-return motion benefits from a slower resolved-outcome pace.

### Foreman Night — 3600 ms
Fire/ember and calm professional conversation should have the slowest first-wave cadence.

### School Arcana — 3000 ms
Rune/page/mote motion should be readable without suggesting spell-resolution mechanics.

## Loop behavior

Future exported GIF:
- loop count: infinite;
- frame count: 4;
- no gameplay event waits for loop completion;
- no gameplay timer reads animation time;
- no Save field stores frame index/time.

## Reduced motion

Current project-owned static fallback remains authoritative when animation is disabled.

Animation normalization does not alter static fallback selection.

## Production status

Source timing normalized:
**YES**.

GIF bytes:
**0**.

Production candidate pools:
**0**.

No production animation claim is made by this document.
