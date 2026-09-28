# Chat2 Forest route visual QA v1

Status: COMPLETE / ITEMS_292_303_GREEN_SOURCE / NO_ROOT_ACTIVATION

Reviewed Chat2 items 292–303 as currently present on:
`chat2/presentation-replacement-next`.

Worker head during final review:
`de9adc5aed8955a177611500e1f80dd99817ef89`.

Current production main baseline used by worker:
`4223be1f90f15a43938e072bc2171b0de5d2d1aa`.

## Item 292 source audit

Classification:
- shipped neutral default: SAFE;
- old logging-road worker source: REVISE / source history only;
- old old-boundary worker source: DO_NOT_SHIP.

The old old-boundary source has gate/barrier-like geometry.

Replacement work is correct.

## Item 293 logging-road v2

Asset:
`forest-route-logging-road-v2.svg`.

Blob:
`a94f196ef46162eba13962eb7f1555ac01d83bac`.

Observed allowed semantics:
- broad worked road;
- paired wheel ruts;
- cut branches;
- ordinary timber/work marks.

No:
- external resource;
- script;
- token/Hunter/challenge;
- result/reward cue.

Metadata uses exact:
`activity/forest/route/logging-road`.

Classification:
`SAFE`.

## Item 294 old-boundary v3

Asset:
`forest-route-old-boundary-v3.svg`.

Blob:
`97c38b2f08073b2e833289d2ca31fc29841ec4a3`.

Observed:
- narrow old path;
- low/weathered stones;
- old marks;
- no constructed crossbar/gate.

No:
- token/key;
- Hunter;
- challenge;
- reward;
- success/failure;
- magic activation.

Metadata uses exact:
`activity/forest/route/old-boundary`.

Classification:
`SAFE`.

This replacement resolves the earlier gate-like overstatement.

## Item 295 static accessibility localization

Candidate:
`forest-route-static-localization-v4.json`.

Blob:
`62418e03f817209ffa93671f74c69b340ef81a84`.

Provides complete RU+EN:
- logging-road alt/caption;
- old-boundary alt/caption.

Normalized key family:
`presentation.static.forest.route.<route>.alt|caption`.

No slash-form localization keys.

No media/gameplay fields.

Classification:
`GREEN`.

## Item 296 route-specific slot candidate

Candidate:
`forest-route-static-slots-v2.json`.

Blob:
`ef49f3424ca7c32e5176dfdee121c23866cbef97`.

Exact slots:
- logging-road;
- old-boundary.

Each:
- uses local project-owned SVG;
- has normalized altKey;
- falls back to `activity/forest/route/default`.

No gameplay fields.

Classification:
`GREEN_AFTER_ROUTE_SEAM`.

PR57 exact head now supplies the required semantic slots/fallback architecture, but this Chat2 candidate itself is not root-loaded.

## Item 297 static semantics regression

Blob:
`fe2a4da43e7c7c33a2eff21ee840797c4e3189ef`.

Checks:
- slot schema;
- exact IDs;
- local SVGs;
- 1200×675;
- no external scripts/resources;
- normalized alt keys;
- default fallback;
- no old-boundary forbidden semantics;
- presentation-only payload.

Classification:
`GREEN_SOURCE`.

## Item 298 locale invariance regression

Blob:
`fe02308fc3e2d774349108611823dacae78c7d9f`.

Checks same:
- presentationId;
- src;
- kind;
- altKey;
- captionKey;
- fallbackId
across RU and EN.

Only alt/caption text may change.

Locale data contains no src/asset/media/fallback field.

Classification:
`GREEN_SOURCE`.

## Item 299 build-copy audit

Current build recursively copies:
`assets -> dist/assets`.

Expected:
- logging v2 source -> matching dist SVG;
- old-boundary v3 source -> matching dist SVG.

No build-script modification needed.

Classification:
`BUILD_READY`.

Actual integration head must still verify byte-identical source/dist copy.

## Item 300 accessibility review

Both RU+EN pairs are concise and non-spoilery.

No eligibility/token/Hunter/challenge/reward/result leak.

Classification:
`ACCESSIBILITY_READY`.

## Item 301 animation backlog

Defines future:
- 3 logging-road source sequences;
- 3 old-boundary source sequences.

Actual route animation frames:
0.

Actual route GIFs:
0.

No production animation claim.

Classification:
`FUTURE_SOURCE_ONLY`.

## Item 302 selective-copy manifest

Safe set:
- 2 replacement SVGs;
- localization candidate;
- slot candidate;
- 2 tests;
- build-copy audit;
- accessibility review.

Old route assets are explicitly excluded.

Classification:
`SAFE_SELECTIVE_COPY`.

## Item 303 handoff

Final worker classification:
- LOGGING_STATIC_READY;
- OLD_BOUNDARY_STATIC_READY;
- LOCALIZATION_READY;
- BUILD_READY;
- ANIMATION_FUTURE;
- PRODUCT_OPEN_EXCLUDED.

QA agrees with that classification.

## PR57 interaction

PR57 exact head already introduces:
- exact route-specific semantic slots;
- fallback to default;
- route-state -> presentationId seam.

It activates no route-specific assets.

Therefore after PR57 merge, a later visual PR can selectively add the two safe Chat2 SVGs + four static accessibility keys while preserving default fallback.

## Product-open firewall

Visual work must not define:
- token acquisition/consume;
- Hunter route;
- challenge/reward;
- seasonal topology;
- route result.

## Verdict

`ITEMS_292_303_GREEN_SOURCE / NO_ROOT_ACTIVATION`.

Both replacement route SVGs are semantically safe, local-only, normalized and fallback-compatible.

No route-specific visual is currently shipped by Chat2 itself.
