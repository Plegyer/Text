# Project-Owned GIF Production Capability Audit v1

Exact current-main baseline audited: `4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`.

## Repository toolchain

Prototype package:
`prior-work/astra/prototype-m3.2/package.json`

Declared runtime:
- Node >= 22.18.0.

Declared project dependencies:
- `zod`.

Declared dev dependencies:
- `@types/node`;
- `electron`;
- `electron-builder`;
- `esbuild`;
- `jsdom`;
- `typescript`.

No declared GIF encoder, SVG rasterizer, image-processing library, ffmpeg wrapper, ImageMagick wrapper, Pillow/imageio dependency, or equivalent production media-export dependency is present.

## Build path

`scripts/build.mjs`:
- bundles renderer/core;
- copies source `assets/` recursively to `dist/assets/`;
- does not transform SVG to raster;
- does not encode GIF.

Therefore the build can distribute already-created GIF bytes, but cannot create GIF bytes from SVG/frame sources.

## CI path

`.github/workflows/mindy-successor-check.yml`:
- runs on `ubuntu-latest`;
- installs Node 22.18.0;
- runs `npm ci`;
- runs `npm run check`.

The workflow does not:
- install Python packages;
- install ImageMagick;
- install ffmpeg;
- install a GIF encoder;
- execute a media-export step.

Relying on undeclared software that might happen to exist on a hosted runner would not be a reproducible project toolchain contract.

## Existing project tests/tooling

Current presentation tooling can:
- validate paths;
- validate GIF signatures after bytes exist;
- validate build copy/distribution;
- validate 3–5 candidate pool contracts;
- validate deterministic presentation-only selection.

It cannot author binary GIF bytes from SVG frames.

## Reproducibility conclusion

### Node-only current repo

**Cannot reproducibly export animated GIF from SVG/frame sources with declared existing tooling.**

Node built-ins do not provide an SVG renderer or animated-GIF encoder.

### Python path

No repository-managed Python environment or locked Pillow/imageio dependency exists.

A developer machine may have Python/image tools installed, but that is not enough for deterministic repo/CI reproduction.

### System-tool path

ImageMagick/ffmpeg could theoretically provide an export path, but neither is installed/pinned by project setup or CI.

Using them ad hoc would create:
- environment drift;
- version-dependent rendering/quantization;
- untracked security/update surface;
- non-reproducible developer results.

## Extra dependency requirement

A reproducible local SVG-frame -> GIF pipeline needs at least:
1. deterministic SVG rasterization;
2. animated GIF encoding;
3. locked versions;
4. a checked-in export script;
5. CI/dev invocation contract.

This can likely be solved with a small development-only media dependency or a small approved pair of tools, but adding one changes the repository dependency/security surface and is outside this item's ownership.

No dependency is added here.

## License/security implications

Any future exporter must be reviewed for:
- package/tool license compatibility;
- native binary/transitive dependency risk;
- supply-chain footprint;
- reproducible install in CI;
- deterministic output where practical;
- no network access during export;
- no external asset fetching.

Project-authored SVG/frame sources themselves remain project-owned and contain no external media.

## Size implications

The preferred GIF budget remains:
- <= 2 MB preferred per GIF;
- > 5 MB requires optimization before activation.

The exporter should support or be paired with:
- frame-rate control;
- output dimensions;
- palette/quantization control;
- loop flag;
- deterministic input ordering.

## Capability result

Repository today:
- frame authoring: **YES**;
- static SVG distribution: **YES**;
- GIF validation after bytes exist: **YES**;
- reproducible SVG/frame -> animated GIF export: **NO**;
- extra approved dev tooling required: **YES**.

No fake GIF file should be created until that gap is approved and closed.
