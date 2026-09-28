# Forest Route Static Build-Copy Audit v1

Exact current-main build baseline:
`4223be1f90f15a43938e072bc2171b0de5d2d1aa`.

Current prototype build script:

`prior-work/astra/prototype-m3.2/scripts/build.mjs`

contains:

`await cp('assets','dist/assets',{recursive:true});`

Therefore source assets under `assets/` are copied recursively into `dist/assets/` without route-specific build logic.

## Item 293 — logging road

Source:

`assets/presentation/forest-route-logging-road-v2.svg`

Expected build output:

`dist/assets/presentation/forest-route-logging-road-v2.svg`

Expected relation:
- source bytes copied unchanged by the normal recursive asset copy;
- no transformation;
- no localization-specific duplicate;
- no route/gameplay metadata generation step.

## Item 294 — old boundary

Source:

`assets/presentation/forest-route-old-boundary-v3.svg`

Expected build output:

`dist/assets/presentation/forest-route-old-boundary-v3.svg`

Expected relation:
- source bytes copied unchanged by the normal recursive asset copy;
- no transformation;
- no locale-specific duplicate;
- no runtime-generated media.

## Build-copy readiness

Both route-specific SVGs are stored under:

`prior-work/astra/prototype-m3.2/assets/presentation/`

which is already inside the existing recursive build source tree.

No change is required to:
- `scripts/build.mjs`;
- Electron packaging rules that already include `dist/**/*`;
- application runtime path format.

## Verification expected on Lead integration head

After selective copy and normal build:

1. run `node scripts/build.mjs` or the normal project build/check path;
2. assert both `dist/assets/presentation/*.svg` outputs exist;
3. compare source/dist bytes;
4. run route static semantic/locale regressions;
5. run full `npm run check`;
6. require exact-head CI.

## Audit boundary

This file verifies the **build path contract**.

It does not claim that Chat 2 executed the current-main build or CI for items 293–294.

It does not activate route-specific presentation slots.

## Result

- logging-road source path: **BUILD-COPY READY**;
- old-boundary source path: **BUILD-COPY READY**;
- build-script modification needed: **NO**;
- runtime/gameplay modification needed: **NO**.
