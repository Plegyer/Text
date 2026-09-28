# Shipped Forest Static Supersession Ledger v2

Exact current-main baseline:
`54131488c65302f81b3001abaaa345d21f0281e2`.

Policy:
**do not delete project-owned Forest route sources in this queue**.

## Static sources

| Source | Classification | Current role |
| --- | --- | --- |
| `assets/presentation/forest-route-default-v1.svg` | **SHIPPED_CURRENT** | Current neutral shared `activity/forest/route/default` fallback. |
| `assets/presentation/forest-route-logging-road.svg` | **SHIPPED_CURRENT** | PR59 current `activity/forest/route/logging-road` static. |
| `assets/presentation/forest-route-logging-road-v2.svg` | **SUPERSEDED_SOURCE_HISTORY** | Safe worker refinement; PR59 shipped the earlier reviewed logging-road source instead. Retain for history. |
| `assets/presentation/forest-route-old-boundary-v3.svg` | **READY_REPLACEMENT** | Selected post-PR59 activation candidate for `activity/forest/route/old-boundary`. |
| `assets/presentation/forest-route-old-boundary-safe-v1.svg` | **READY_REPLACEMENT** | Corrected safe alternative source; not the item-317 selected activation file. Retain as reviewed alternative/history. |
| `assets/presentation/forest-route-old-boundary.svg` | **SUPERSEDED_SOURCE_HISTORY** | Older barrier-like composition; do not activate. Retain only as source history. |

## Animation source groups

| Source group | Files | Classification | Note |
| --- | ---: | --- | --- |
| `forest-route-logging-road-loop-a/b/c` | 12 SVG frames | **ANIMATION_SOURCE_ONLY** | Current 24-frame route source manifest logging-road half. |
| `forest-route-old-boundary-loop-a/b/c` | 12 SVG frames | **ANIMATION_SOURCE_ONLY** | Current 24-frame route source manifest old-boundary half. |
| `forest-route-old-boundary-safe-loop-a/b/c` | 12 SVG frames | **ANIMATION_SOURCE_ONLY** | Corrected safe alternative source sequences; no GIF claim. |

No animation frame is a production GIF or root presentation mapping.

## PRODUCT_OPEN_EXCLUDED

No physical route static file is classified as `PRODUCT_OPEN_EXCLUDED` in this ledger.

The excluded **semantics** remain:
- Hunter/token/key/challenge media;
- route result/reward cues;
- gameplay route-condition/progress/endurance media not explicitly owned by presentation.

Those are outside Chat 2 scope and must not be inferred from any Forest route source.

## Supersession rule

A source becomes `SUPERSEDED_SOURCE_HISTORY` when:
1. a safer/current replacement exists or another source was selected for shipment;
2. root production no longer needs that source for the selected slot;
3. retaining the file is useful for rollback/audit/source history.

This ledger authorizes **retention, not deletion**.

## Current activation path

Current main:
- shared default: shipped;
- logging road: shipped;
- old boundary: no root slot.

Next reviewed old-boundary activation source:
`assets/presentation/forest-route-old-boundary-v3.svg`.

Fallback remains:
`activity/forest/route/default`.
