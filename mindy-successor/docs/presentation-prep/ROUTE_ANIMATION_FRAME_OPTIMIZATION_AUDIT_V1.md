# Route Animation Frame Optimization Audit v1

Exact source set:
`content/presentation-drafts/forest-route-animation-source-manifest-v1.json`.

Scope:
**24 SVG frames**:
- logging-road loops A/B/C: 12;
- old-boundary loops A/B/C: 12.

No destructive optimization is performed by this item.

## Git source-size summary

| Sequence | Frames | Source bytes |
| --- | ---: | ---: |
| `forest-route-logging-road-loop-a` | 4 | 7,626 |
| `forest-route-logging-road-loop-b` | 4 | 5,942 |
| `forest-route-logging-road-loop-c` | 4 | 7,436 |
| `forest-route-old-boundary-loop-a` | 4 | 7,400 |
| `forest-route-old-boundary-loop-b` | 4 | 6,586 |
| `forest-route-old-boundary-loop-c` | 4 | 7,700 |
| **Total** | **24** | **42,690** |

Frame size:
- minimum: **1,481 bytes**;
- maximum: **1,930 bytes**;
- average: **1,778.75 bytes**.

Git blob SHA review:
- 24 frames;
- 24 unique blob SHAs;
- **0 exact byte duplicates**.

## Avoidable repetition

Every frame is a self-contained SVG and therefore repeats:
- root SVG/viewBox/role metadata;
- scene background;
- static forest geometry;
- most route geometry;
- only a small number of motion parameters differ.

This repetition is intentional for simple independent frame authoring and deterministic file ordering.

Possible non-destructive future source optimizations:
- compact whitespace/indentation;
- shorten repeated numeric precision where visually identical;
- remove redundant default SVG attributes;
- normalize equivalent path formatting.

Possible structural optimization:
- generate frames from one checked-in parameterized authoring script/template.

That structural approach would reduce source repetition but would add a source-generation toolchain and should not replace current self-contained SVG evidence without Lead review.

## Why no destructive optimization now

Current source footprint is already tiny:
**42,690 bytes total** for all 24 frames.

Compared with future raster/GIF bytes, SVG-source size is negligible.

Aggressive source minification could:
- reduce review readability;
- complicate metadata inspection;
- introduce accidental visual differences;
- make frame-diff reasoning harder.

Therefore:
**retain current source bytes for first export proof**.

## Visual/semantic preservation constraints

Any future optimization must preserve:
- exact `data-presentation-id`;
- exact sequence/frame metadata;
- `viewBox="0 0 1200 675"`;
- frame ordering;
- route-specific visible cues;
- no external resources/scripts;
- no gameplay/RNG/Save metadata;
- old-boundary non-barrier semantics.

## Audit result

Exact duplicate removal opportunity:
**NONE**.

Whitespace/minification opportunity:
**SMALL / OPTIONAL**.

Template-generation opportunity:
**POSSIBLE BUT NOT NEEDED FOR FIRST EXPORT**.

Destructive optimization recommended:
**NO**.
