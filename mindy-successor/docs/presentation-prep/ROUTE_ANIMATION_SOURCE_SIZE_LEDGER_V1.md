# Route Animation Source-Size Ledger v1

Source authority:
`content/presentation-drafts/forest-route-animation-source-manifest-v1.json`.

Git sizes were read from the worker branch tree for the exact 24 route frame blobs.

## Per-frame byte ledger

| Frame | Bytes |
| --- | ---: |
| `forest-route-logging-road-loop-a-frame-01.svg` | 1,898 |
| `forest-route-logging-road-loop-a-frame-02.svg` | 1,914 |
| `forest-route-logging-road-loop-a-frame-03.svg` | 1,914 |
| `forest-route-logging-road-loop-a-frame-04.svg` | 1,900 |
| `forest-route-logging-road-loop-b-frame-01.svg` | 1,481 |
| `forest-route-logging-road-loop-b-frame-02.svg` | 1,495 |
| `forest-route-logging-road-loop-b-frame-03.svg` | 1,483 |
| `forest-route-logging-road-loop-b-frame-04.svg` | 1,483 |
| `forest-route-logging-road-loop-c-frame-01.svg` | 1,855 |
| `forest-route-logging-road-loop-c-frame-02.svg` | 1,855 |
| `forest-route-logging-road-loop-c-frame-03.svg` | 1,855 |
| `forest-route-logging-road-loop-c-frame-04.svg` | 1,871 |
| `forest-route-old-boundary-loop-a-frame-01.svg` | 1,843 |
| `forest-route-old-boundary-loop-a-frame-02.svg` | 1,857 |
| `forest-route-old-boundary-loop-a-frame-03.svg` | 1,857 |
| `forest-route-old-boundary-loop-a-frame-04.svg` | 1,843 |
| `forest-route-old-boundary-loop-b-frame-01.svg` | 1,641 |
| `forest-route-old-boundary-loop-b-frame-02.svg` | 1,647 |
| `forest-route-old-boundary-loop-b-frame-03.svg` | 1,641 |
| `forest-route-old-boundary-loop-b-frame-04.svg` | 1,657 |
| `forest-route-old-boundary-loop-c-frame-01.svg` | 1,914 |
| `forest-route-old-boundary-loop-c-frame-02.svg` | 1,928 |
| `forest-route-old-boundary-loop-c-frame-03.svg` | 1,928 |
| `forest-route-old-boundary-loop-c-frame-04.svg` | 1,930 |

## Per-sequence totals

| Sequence | Source bytes |
| --- | ---: |
| logging-road A | 7,626 |
| logging-road B | 5,942 |
| logging-road C | 7,436 |
| old-boundary A | 7,400 |
| old-boundary B | 6,586 |
| old-boundary C | 7,700 |
| **Total** | **42,690** |

## Projected raster working envelope

First-wave target:
- 640×360;
- RGBA;
- 4 bytes/pixel;
- 4 frames/candidate.

Raw RGBA per frame:

`640 × 360 × 4 = 921,600 bytes`.

Raw RGBA per 4-frame sequence:

`3,686,400 bytes` (~3.52 MiB).

The exporter should process one candidate sequence at a time; it does not need to keep all six route candidates' raw pixels resident simultaneously.

## Projected GIF envelope

Technical budget authority:
`PROJECT_OWNED_GIF_TECHNICAL_BUDGET_V1.md`.

Per candidate:
- preferred: <=2 MiB;
- normal validator ceiling: 5 MiB;
- >8 MiB: default hard rejection/review.

For six future route candidates:
- preferred combined repository footprint: <=12 MiB;
- actual target should be lower because the art is flat/vector-heavy with only four frames.

## Timing envelope

Logging-road normalized target:
- 4 frames;
- 650 ms/frame;
- 2,600 ms loop.

Old-boundary normalized target:
- 4 frames;
- 800 ms/frame;
- 3,200 ms loop.

Both:
- 640×360 target;
- <=256 palette colors;
- infinite presentation loop.

## Ledger result

SVG source footprint:
**42,690 bytes**.

Source size is not a blocker.

Future optimization priority should focus on:
1. raster dimensions;
2. palette/quantization;
3. GIF byte output;
4. only then optional SVG minification.
