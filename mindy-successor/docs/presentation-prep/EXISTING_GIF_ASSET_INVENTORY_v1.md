# Existing GIF Asset Inventory v1

Status: **AUDITED / ZERO REAL GIF ASSETS**

Audit baseline:
- current `main`: `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`;
- worker branch checked before this item: `8ca8403d8269d19bdddd0002f20ba9cacc52860a`;
- scope: the complete Git tree, not only `mindy-successor/`.

## What counts as a real GIF

A real asset for this inventory is a repository blob whose path ends in `.gif`.

The following do **not** count:
- placeholder/staging paths that do not resolve to a blob;
- `data:image/gif;base64,...` test fixtures;
- external URLs;
- planned filenames in docs/manifests;
- SVG/PNG/JPEG/WebP static fallbacks.

This matches the production rule that placeholder GIF paths are not shipped visual content.

## Inventory result

The recursive Git tree contains **0 real `.gif` files** on current `main`.

The same recursive check of the current long-lived Chat 2 branch also contains **0 real `.gif` files**.

| Repo path | Current semantic use | Existing metadata | Safe reuse | Compatible shipped semantic IDs |
| --- | --- | --- | --- | --- |
| _none_ | _none_ | _n/a_ | _n/a_ | _none_ |

Because no GIF blob exists, there is no dimensions/duration metadata to report from repository metadata.

## Current real-media boundary

Real static fallbacks do exist, including production SVG stage assets such as:
- `assets/stage-lumber.svg`;
- `assets/stage-tavern.svg`;
- `assets/stage-forest.svg`;
- `assets/stage-town.svg`;
- `assets/stage-room.svg`;
- `assets/stage-outside.svg`;
- `assets/stage-school.svg`.

They remain valid animation-off/static fallbacks, but they are **not GIF candidates** and must not increase any multi-GIF pool count.

## Semantic reuse conclusion

There is currently no GIF that can be safely reused for any shipped:
- ordinary-career shift/result semantic ID;
- reachable School presentation ID;
- ordinary-poverty presentation ID;
- Forest Activity/return/reaction presentation ID.

Safe reuse can only be evaluated after an actual GIF blob exists. Reuse may later span multiple semantic IDs only when the visual meaning remains context-correct and gameplay identity stays separate.

## Production consequence

At this baseline:
- real GIF candidate count: **0**;
- production-ready 3–5 GIF pools: **0**;
- every previously authored staging GIF path remains non-shipped;
- static/text fallback remains the only honest production path until real GIF files are added.

No placeholder or external path is promoted by this inventory.
