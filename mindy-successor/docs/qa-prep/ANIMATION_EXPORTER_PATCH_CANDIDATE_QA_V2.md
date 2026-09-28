# Animation exporter patch-candidate QA v2

Status: COMPLETE / ACCEPTABLE_FOR_LEAD_INTEGRATION_WITH_NATIVE_CI_CHECK

Current production main:
`6e2a5147603b71eed89a0966af417a33dd28d7a7`.

Reviewed Chat 2 items:
`280–291`
on `chat2/presentation-replacement-next`.

Worker head during review:
`fefbf0693f98dbd65538e814e7d24339202f1005`.

## Dependency patch candidate

Source:
`gif-exporter-dependency-patch-v1.json`
blob `e696960bbc67290084d004a74e82cc21e320355e`.

Proposed exact devDependencies:
- `sharp@0.35.4`;
- `gifenc@1.0.3`.

Proposed npm script:
`media:export-gif = node tools/export-project-owned-gif.mjs`.

Classification:
`DEV_ONLY`.

No runtime dependency is proposed.

## Worker did not mutate package manifests

Worker `package.json` blob:
`91de0847c3ae3b8de394334968307ccf6252820a`.

Current-main `package.json` blob:
`91de0847c3ae3b8de394334968307ccf6252820a`.

Equal:
YES.

Worker `package-lock.json` blob:
`77b325bc6b2115499c475adf92d3bae218bf37a1`.

Current-main `package-lock.json` blob:
`77b325bc6b2115499c475adf92d3bae218bf37a1`.

Equal:
YES.

Therefore Chat 2 correctly supplied a patch candidate/tool source without silently changing the dependency graph.

## Local project-owned input boundary

Exporter source:
`tools/export-project-owned-gif.mjs`
blob `82c26745e3d54b5749930f3d6bb58a275d416ea3`.

The exporter requires:
- manifest under `content/presentation-drafts/`;
- frame paths under `assets/presentation-frames/`;
- SVG source only;
- local static fallback;
- output under `assets/gif/`.

It rejects:
- absolute paths;
- URL/scheme paths;
- backslash path syntax;
- empty/dot/dot-dot segments;
- output outside `assets/gif/`;
- frame source outside the project-owned frame root.

It performs no fetch/download.

## SVG safety checks

Before rasterization, each frame is checked for:
- valid SVG root/text closure;
- exact presentationId metadata;
- exact sequence metadata;
- ordered frame-index metadata;
- no `<script>`;
- no HTTP(S), protocol-relative or data-URL resource reference.

The exporter consumes the already-read SVG bytes with sharp rather than asking sharp to open an arbitrary caller-supplied filesystem/URL path.

This materially reduces the image-parser input surface to reviewed repository-local source.

## CLI determinism

CLI contract fixes/validates:
- semantic presentationId;
- source sequence key;
- ordered manifest frames;
- output path;
- width/height;
- frame delay;
- palette size;
- loop count.

Default production-oriented parameters:
- 640×360;
- palette <=256;
- loop 0/infinite;
- manifest-owned normalized delay.

Default output naming:
`assets/gif/project-owned/<candidateKey>.gif`.

Candidate key syntax is stable lowercase `[a-z0-9._-]`.

No timestamp, random seed, locale or directory enumeration is used for naming or frame order.

## Timing determinism

Frame timing:
- comes from exact manifest `normalizedFrameDelayMs`, unless an explicit valid CLI override is supplied;
- must be an integer;
- 20–5000 ms;
- divisible by 10 ms for exact GIF centiseconds.

Frame order comes from the manifest array only.

The first-wave source sequences are 4 ordered frames each.

## Dry-run validation

Test:
`project-owned-gif-exporter-dry-run-v1.test.ts`
blob `f13395cfb3f3f195291f3ffc0b48a461a81aa2b9`.

It validates without dependency installation:
- CLI defaults;
- exact semantic lookup;
- sequence ownership;
- deterministic default output path;
- unknown semantic rejection;
- mismatched sequence rejection;
- external output URL rejection;
- external frame URL rejection;
- external SVG resource rejection.

The underlying source additionally rejects absolute/traversal paths.

## GIF output validator

Validator:
`validate-project-owned-gif.mjs`
blob `7b2c4b0b4a51af9c98003a078cb8f2c19b4799f4`.

It validates actual future bytes for:
- local `assets/gif/` path;
- non-placeholder/test path;
- project-owned/repository-local provenance note;
- GIF87a/GIF89a signature;
- nonzero dimensions;
- parsed frame count;
- frame delays;
- total duration;
- loop metadata;
- trailer;
- byte budget;
- exact expected metadata.

It rejects external/traversal paths and external/placeholder provenance.

Its regression uses generated in-test GIF fixture bytes only and does not claim production media.

## Security/license review

`gifenc@1.0.3`:
- MIT;
- pure JavaScript;
- no reviewed consumer install/postinstall script;
- acceptable dev-only.

`sharp@0.35.4`:
- Apache-2.0;
- native/libvips platform footprint;
- install lifecycle behavior;
- compatible with current Node >=22.18 baseline per the reviewed package metadata.

Classification:
`ACCEPTABLE_DEV_ONLY_WITH_EXACT_NPM_CI_VERIFICATION`.

Required Lead review:
- generated lockfile diff;
- platform/optional package graph;
- third-party notices;
- install-script behavior on exact CI runner.

No runtime import from shipped application code is allowed.

## CI portability

Current project CI:
- Ubuntu GitHub runner;
- Node 22.18.0;
- `npm ci`;
- `npm run check`.

The proposal does not require an OS-level ImageMagick/ffmpeg install.

Before production approval, exact integration head must prove:
1. `npm ci` installs pinned sharp/gifenc;
2. local exporter smoke can rasterize/encode one project-owned sequence;
3. validator accepts that output;
4. repeated same-platform export is deterministic;
5. full check remains green.

## Reproducibility contract

Same pinned environment requires:
- same source bytes;
- same manifest;
- same exporter script revision;
- same dependency lock;
- same Node/platform;
- same width/height/palette/delay/loop
-> byte-identical output and SHA-256.

Cross-platform output may only be treated as deterministic-equivalent if:
- each platform is internally byte-stable;
- dimensions/frame count/delays/duration/loop/source hashes match;
- differences are explicitly recorded.

No cross-platform equivalence is assumed without evidence.

## Build/runtime boundary

Initial exporter approval does not require changes to:
- shared presentation runtime;
- gameplay;
- Save schema;
- root `presentation.json`;
- root `localization.json`;
- build script;
- CI workflow.

Existing recursive asset build can copy finished GIFs once real files exist.

No placeholder GIF may be committed.

## Current production state

Actual project-owned production GIF bytes:
`0`.

Production GIF pools:
`0`.

Exporter dependencies installed:
NO.

Thus this QA accepts the **patch candidate/tooling design**, not an animation-coverage claim.

## Verdict

`ACCEPTABLE_FOR_LEAD_INTEGRATION_WITH_NATIVE_CI_CHECK`.

The candidate satisfies:
- dev-only dependency boundary;
- no worker manifest mutation;
- local project-owned inputs;
- deterministic names/timing;
- URL/absolute/traversal rejection;
- reasonable security/license/reproducibility controls.

Lead still must explicitly approve and test the exact dependency/lockfile change before real export.
