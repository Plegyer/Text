# GIF Exporter Dependency Options Matrix v2

Baseline context:
- project Node runtime requirement: Node >= 22.18.0;
- current CI installs Node 22.18.0 and runs `npm ci`;
- no GIF exporter dependency is currently declared.

Goal: compare small reproducible dev-only paths from repository-local SVG frames to animated GIF.

## Option A — sharp + gifenc

Packages:
- `sharp@0.35.4`;
- `gifenc@1.0.3`.

Architecture:
- `sharp`: Node-API/native prebuilt image-processing module backed by libvips;
- `gifenc`: pure JavaScript GIF encoder/quantizer.

Local-frame path:
1. read repository-local SVG;
2. render with `sharp` at fixed width/height;
3. emit raw RGBA pixel buffer;
4. quantize/map palette with `gifenc`;
5. encode ordered frames with explicit delay and infinite loop.

Reproducibility:
- strong if exact package versions are pinned in `package-lock.json`;
- frame paths, dimensions, frame delays, palette size and loop count can all be explicit in one checked-in Node script;
- no network access is required after dependencies are installed.

CI portability:
- strong for the project's Linux x64 GitHub runner;
- sharp publishes prebuilt platform packages and supports Node >=20.9.0, which includes the project's Node 22.18.0;
- native/platform packages increase lockfile footprint but avoid requiring a separately installed system CLI on standard supported platforms.

Maintenance/license:
- sharp: Apache-2.0;
- gifenc: MIT;
- gifenc is older/stable rather than frequently released, so the integration script should pin the exact API surface and keep its own QA;
- sharp has a larger transitive/native footprint than a pure-JS-only solution.

Can consume only local project-owned SVG:
**YES**.

Straightforward exact pinning:
**YES**.

Overall:
**BEST FIT** for the current repo because it gives direct SVG -> raw RGBA -> GIF in Node without introducing a separate PNG decoder.

## Option B — @resvg/resvg-js + PNG decoder + gifenc

Packages/tools:
- `@resvg/resvg-js@2.6.2`;
- a PNG decoder would still be needed to convert rendered PNG bytes to RGBA;
- `gifenc@1.0.3`.

Architecture:
- resvg-js: Rust/N-API native SVG renderer with prebuilt platform packages, plus a WASM path;
- gifenc: pure JavaScript encoder.

Reproducibility:
- SVG rendering itself is deterministic and package-pinnable;
- however the ordinary Node API returns PNG bytes, so a second raster decode dependency or custom decoder step is required before gifenc can consume raw pixels;
- this makes the practical dependency set larger than Option A.

CI portability:
- good on common Node platforms;
- prebuilt binaries are published across common Linux/macOS/Windows targets;
- no node-gyp/postinstall build is normally needed.

Maintenance/license:
- `@resvg/resvg-js`: MPL-2.0;
- gifenc: MIT;
- adding a PNG decoder adds another maintenance/license surface.

Can consume only local project-owned SVG:
**YES**.

Straightforward exact pinning:
**YES**, but with at least one extra raster decode component.

Overall:
**VIABLE BUT NOT SMALLEST**.

## Option C — ImageMagick CLI

Tool:
- ImageMagick `magick` CLI.

Architecture:
- native system binary;
- can rasterize SVG and encode animated GIF through command-line invocation.

Reproducibility:
- acceptable only if exact ImageMagick version and delegate stack are installed/pinned by project setup or CI;
- current repo/CI does not install it;
- SVG rendering can also depend on delegate configuration available in the installation.

CI portability:
- possible but requires OS-package or downloaded-binary provisioning;
- adds a separate system-level installation path beyond `npm ci`.

Maintenance/license:
- ImageMagick License;
- requires attribution/license compliance if redistributed;
- security/update surface belongs to a native system package plus delegates.

Can consume only local project-owned SVG:
**YES**.

Straightforward exact pinning:
**LESS STRAIGHTFORWARD** than npm-lock pinning.

Overall:
**NOT RECOMMENDED** for this repository unless Lead explicitly prefers a system-tool workflow.

## Option D — ffmpeg CLI plus SVG rasterization step

Tools:
- ffmpeg;
- an SVG rasterizer such as resvg/ImageMagick/browser rendering.

Architecture:
- native system binary;
- ffmpeg can assemble/encode frame sequences, but does not by itself remove the need for a deterministic SVG rasterization path.

Reproducibility:
- requires pinning at least ffmpeg plus another renderer;
- substantially more setup than the lightweight presentation need justifies.

CI portability:
- achievable but depends on binary provisioning and exact codec/build configuration.

Maintenance/license:
- ffmpeg licensing depends on build configuration;
- broader native-code/security surface than necessary for simple 4-frame loops.

Can consume only local project-owned SVG:
**YES**, after a separate local rasterization step.

Straightforward exact pinning:
**NO / more complex**.

Overall:
**OVER-SIZED FOR CURRENT NEED**.

## Recommendation

Preferred smallest viable path:

**`sharp@0.35.4` + `gifenc@1.0.3` as exact devDependencies**.

Why:
- one Node script can perform the full SVG -> RGBA -> GIF flow;
- project Node version is already compatible;
- no separately provisioned OS binary;
- deterministic local-only inputs;
- explicit frame timing/palette/loop settings;
- standard `npm ci` lockfile workflow.

No dependency is installed by this matrix.
