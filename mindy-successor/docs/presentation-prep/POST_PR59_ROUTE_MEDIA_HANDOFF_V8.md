# Post-PR59 Route Media Handoff v8

Scope: Chat 2 items **316–326**.

Exact current-main baseline:
`54131488c65302f81b3001abaaa345d21f0281e2`.

PR59 current-main state:
- `activity/forest/route/default` shipped;
- `activity/forest/route/logging-road` shipped;
- `activity/forest/route/old-boundary` root slot absent;
- RU+EN old-boundary accessibility keys already present on current main.

## OLD_BOUNDARY_STATIC_READY

Selected post-PR59 activation source:

`assets/presentation/forest-route-old-boundary-v3.svg`.

Activation candidate:

`content/presentation-drafts/old-boundary-v3-current-main-activation-v1.json`.

Exact semantic ID:

`activity/forest/route/old-boundary`.

Fallback:

`activity/forest/route/default`.

Accessibility fixture:

`content/old-boundary-v3-accessibility-v1.fixture.json`.

Keys match current-main RU+EN strings:

- `presentation.activity.forest.route.old-boundary.alt`;
- `presentation.activity.forest.route.old-boundary.caption`.

Regression:

`tests/old-boundary-v3-current-main-activation-v1.test.ts`.

It checks:
- no current root old-boundary ID collision;
- local v3 SVG;
- recursive asset build-copy contract;
- current-root localization identity;
- locale-neutral media identity;
- shared default fallback retention;
- forbidden route-result semantics absent;
- no gameplay fields.

Status:
**OLD_BOUNDARY_STATIC_READY**.

## ROUTE_ANIMATION_SOURCE_READY

Current route animation source authority:

`content/presentation-drafts/forest-route-animation-source-manifest-v1.json`.

Source set:
- logging-road: 3 sequences / 12 frames;
- old-boundary: 3 sequences / 12 frames;
- total: 6 sequences / 24 SVG frames.

No actual GIF paths are present.

Source-size audit:
- total 24-frame SVG bytes: **42,690**;
- minimum frame: **1,481 bytes**;
- maximum frame: **1,930 bytes**;
- exact Git byte duplicates: **0**.

Optimization conclusion:
- current SVG source footprint is negligible;
- no destructive source optimization is recommended before first export;
- future optimization should focus on raster/palette/GIF bytes.

Files:
- `docs/presentation-prep/ROUTE_ANIMATION_FRAME_OPTIMIZATION_AUDIT_V1.md`;
- `docs/presentation-prep/ROUTE_ANIMATION_SOURCE_SIZE_LEDGER_V1.md`.

Status:
**ROUTE_ANIMATION_SOURCE_READY**.

## Static supersession / retention

Ledger:

`docs/presentation-prep/SHIPPED_FOREST_STATIC_SUPERSESSION_LEDGER_V2.md`.

Current classifications:

### SHIPPED_CURRENT
- `forest-route-default-v1.svg`;
- `forest-route-logging-road.svg`.

### READY_REPLACEMENT
- `forest-route-old-boundary-v3.svg`;
- `forest-route-old-boundary-safe-v1.svg` as reviewed alternative source.

### SUPERSEDED_SOURCE_HISTORY
- `forest-route-logging-road-v2.svg`;
- older `forest-route-old-boundary.svg`.

### ANIMATION_SOURCE_ONLY
- current logging-road route frames;
- current old-boundary route frames;
- corrected safe old-boundary alternative frames.

No file deletion is authorized.

## EXPORTER_APPROVAL_READY

Dependency license packet:

`docs/presentation-prep/EXPORTER_DEPENDENCY_LICENSE_PACKET_V1.md`.

CI portability packet:

`docs/presentation-prep/EXPORTER_CI_PORTABILITY_PACKET_V1.md`.

Proposed exact dev-only dependencies remain:

- `sharp@0.35.4` — Apache-2.0;
- `gifenc@1.0.3` — MIT.

Current CI baseline:
- Ubuntu latest;
- Node 22.18.0;
- `npm ci`;
- `npm run check`.

Approval still requires:
1. exact package/lock integration by Lead;
2. Node 22.18 / Ubuntu install smoke;
3. local exporter smoke;
4. same-environment reproducibility check;
5. GIF validator pass.

No package file is changed by items 316–327.

Status:
**EXPORTER_APPROVAL_READY**.

## First route GIF dry-run expected outputs

Manifest:

`content/presentation-drafts/forest-route-gif-dry-run-expected-v1.json`.

Expected future outputs only:

### Logging road
- `assets/gif/forest/routes/logging-road-loop-a.gif`;
- `assets/gif/forest/routes/logging-road-loop-b.gif`;
- `assets/gif/forest/routes/logging-road-loop-c.gif`.

Target:
- 4 frames;
- 650 ms/frame;
- 2,600 ms loop;
- 640×360;
- infinite loop.

Static fallback:
`assets/presentation/forest-route-logging-road.svg`.

### Old boundary
- `assets/gif/forest/routes/old-boundary-loop-a.gif`;
- `assets/gif/forest/routes/old-boundary-loop-b.gif`;
- `assets/gif/forest/routes/old-boundary-loop-c.gif`.

Target:
- 4 frames;
- 800 ms/frame;
- 3,200 ms loop;
- 640×360;
- infinite loop.

Static fallback:
`assets/presentation/forest-route-old-boundary-v3.svg`.

All six entries:
- use `expectedGifPath`, not `gifPath`;
- explicitly record `exists:false`;
- make no production file claim.

## Current-main collision guard

Test:

`tests/forest-route-media-current-main-collision-v1.test.ts`.

Checks:
- current root default/logging slots exist;
- old-boundary candidate root ID is absent before activation;
- no gameplay fields;
- all source assets are repository-local;
- expected future GIF paths do not exist;
- no fake `gifPath` field;
- old-boundary accessibility remains locale-neutral media metadata.

## NO_PRODUCTION_GIF

Actual Forest route GIF files:
**0**.

Actual route GIF production pools:
**0**.

Root GIF media activation:
**0**.

Animation production coverage claim:
**NO**.

Status:
**NO_PRODUCTION_GIF**.

## PRODUCT_OPEN_EXCLUDED

Items 316–327 do not modify:
- Forest route gameplay conditions;
- Activity progress/endurance;
- Hunter/token/key/challenge mechanics;
- rewards/effects/results;
- Save state;
- gameplay RNG;
- shared presentation runtime/schema/UI.

No Product-open gameplay inference is encoded in static/art/animation-source metadata.

Status:
**PRODUCT_OPEN_EXCLUDED**.

## Exact selective-copy files — items 316–326

### Post-PR59 audit / old-boundary activation
- `docs/presentation-prep/POST_PR59_FOREST_ROUTE_MEDIA_REBASE_AUDIT_V1.md`
- `content/presentation-drafts/old-boundary-v3-current-main-activation-v1.json`
- `content/old-boundary-v3-accessibility-v1.fixture.json`
- `tests/old-boundary-v3-current-main-activation-v1.test.ts`

### Supersession / source-size audit
- `docs/presentation-prep/SHIPPED_FOREST_STATIC_SUPERSESSION_LEDGER_V2.md`
- `docs/presentation-prep/ROUTE_ANIMATION_FRAME_OPTIMIZATION_AUDIT_V1.md`
- `docs/presentation-prep/ROUTE_ANIMATION_SOURCE_SIZE_LEDGER_V1.md`

### Exporter approval packets
- `docs/presentation-prep/EXPORTER_DEPENDENCY_LICENSE_PACKET_V1.md`
- `docs/presentation-prep/EXPORTER_CI_PORTABILITY_PACKET_V1.md`

### Dry-run expected outputs / guard
- `content/presentation-drafts/forest-route-gif-dry-run-expected-v1.json`
- `tests/forest-route-media-current-main-collision-v1.test.ts`

### This handoff
- `docs/presentation-prep/POST_PR59_ROUTE_MEDIA_HANDOFF_V8.md`

## Lead integration boundary

On a fresh branch from exact current main:

1. selectively copy the item-317 activation candidate, v3 SVG prerequisite and regression;
2. do not duplicate old-boundary localization when current root already contains identical keys;
3. activate only the old-boundary static slot with shared default fallback;
4. retain current shipped logging-road/default slots;
5. keep animation sources source-only;
6. review exporter license/CI packets;
7. approve dependencies separately if desired;
8. run targeted route regressions;
9. run normal build/full check;
10. require exact-head CI.

## Final state

Old-boundary static:
**OLD_BOUNDARY_STATIC_READY**.

Route animation sources:
**ROUTE_ANIMATION_SOURCE_READY**.

Exporter approval package:
**EXPORTER_APPROVAL_READY**.

Actual GIF bytes:
**NO_PRODUCTION_GIF**.

Gameplay/runtime/schema/UI delta:
**PRODUCT_OPEN_EXCLUDED / NONE BY CHAT 2**.
