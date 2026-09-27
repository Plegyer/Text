# Forest Presentation Semantic Coverage v3

Baseline: current `main` after PR43 Forest bilingual production.

Real GIF inventory: **0**.

This audit covers only semantic identities that exist on current main. It does not invent Hunter-trail or Old-Boundary presentation semantics.

## Current Forest presentation slots

| Surface | Current semantic presentation ID | Current real/static media | Real GIFs | Missing to 3 | RU+EN alt key status |
| --- | --- | --- | ---: | ---: | --- |
| Activity route | `activity/forest/route/default` | `assets/stage-forest.svg` via `stage.hunt` | 0 | 3 | no dedicated `media.stage.hunt.alt` locale entry on current main; legacy RU catalog alt is fallback |
| Activity return: success | `activity/forest/return/success` | `assets/stage-forest.svg` via `stage.hunt` | 0 | 3 | same legacy `stage.hunt` fallback status |
| Activity return: escape | `activity/forest/return/escape` | `assets/stage-forest.svg` via `stage.hunt` | 0 | 3 | same legacy `stage.hunt` fallback status |
| Activity return: failure | `activity/forest/return/failure` | `assets/stage-forest.svg` via `stage.hunt` | 0 | 3 | same legacy `stage.hunt` fallback status |
| PR43 reaction: success | `job/lumber/event/forest-result-content-v1-success/default` | `assets/stage-forest.svg` | 0 | 3 | `media.forest-result-content-v1.success.alt` — RU+EN present |
| PR43 reaction: escape | `job/lumber/event/forest-result-content-v1-escape/default` | `assets/stage-forest.svg` | 0 | 3 | `media.forest-result-content-v1.escape.alt` — RU+EN present |
| PR43 reaction: failure | `job/lumber/event/forest-result-content-v1-failure/default` | `assets/stage-forest.svg` | 0 | 3 | `media.forest-result-content-v1.failure.alt` — RU+EN present |

The PR43 reaction IDs are under the shipped Lumber source domain because those events use `sourceDomain: "lumber"`. That does not turn the GIF into gameplay ownership; it only determines the semantic presentation namespace.

## PR43 localized reaction alt keys

Current localization contains both `ru` and `en` values for:
- `media.forest-result-content-v1.success.alt`;
- `media.forest-result-content-v1.escape.alt`;
- `media.forest-result-content-v1.failure.alt`.

The generic Activity route/return surfaces still rely on catalog media `stage.hunt`, whose current alt is a legacy catalog string rather than a dedicated RU+EN localization entry. That is localization debt, not a reason to invent new semantic IDs.

## Reuse

There is no real GIF to reuse now.

The real static fallback `assets/stage-forest.svg` is safely reused across the current Forest route, return and reaction surfaces because the semantic identity remains carried by the presentation slot/event, not by the filename.

Future GIF reuse is allowed only when the loop does not falsely imply a different Activity outcome. In particular:
- a neutral traversal/forest ambience loop can potentially be reused across compatible route/repeat surfaces;
- success, escape and failure reaction loops should remain outcome-compatible even if a neutral background asset is shared;
- candidate selection must never choose or rewrite the Activity outcome.

## Pool deficit

All seven current Forest presentation surfaces have:
- real GIF count: **0**;
- real multi-GIF readiness: **NO**;
- minimum deficit: **3 candidates each**.

Minimum candidate-assignment deficit across the seven slots: **21**.

Safe reuse may reduce the number of unique GIF files required, but it cannot collapse the seven semantic identities.

## Explicit exclusions

No new semantic presentation ID is created for:
- `forest.route.old-boundary`;
- any Hunter trail;
- any Product-blocked Forest route/challenge.

`forest.route.old-boundary` remains an existing Activity option identity/label, not a new media semantic slot in this audit.
