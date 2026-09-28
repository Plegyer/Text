# Chat2 animation exporter proposal QA v1

Status: COMPLETE / TOOLCHAIN_PROPOSAL_ACCEPTABLE_WITH_LEAD_APPROVAL / EXPORT_STILL_BLOCKED

Current production main:
`3fc5495310e281cf5cbe52da3642000f1cb1fb05`.

Reviewed Chat 2 exporter sources:
- `GIF_EXPORTER_DEPENDENCY_OPTIONS_MATRIX_V2.md`
  blob `8b56ca7639bf4e5b857341fa9ddda4104a196f2d`;
- `RECOMMENDED_GIF_EXPORTER_INTEGRATION_PLAN_V2.md`
  blob `603ef948e8b5b04e979d739d635d17f02f4e4163`;
- `PROJECT_OWNED_ANIMATION_EXPORTER_HANDOFF_V3.md`
  blob `94b0793f50ca1de8cc3ffd90ff1458ed0c4e0e0c`;
- current animation source handoff v4;
- current source-readiness ledger.

## Current repository facts

Current production package:
- Node engine: `>=22.18.0`;
- no GIF exporter dependency;
- no `sharp`;
- no `gifenc`;
- no GIF export npm script.

Current CI:
- Ubuntu latest;
- Node 22.18.0;
- `npm ci`;
- `npm run check`.

Current production repo has no `assets/gif/` directory.

Therefore:
- real production GIF files: 0;
- production 3–5 candidate GIF pools: 0.

## Current project-owned source readiness

Chat 2 source layer now contains:
- 8 current semantic presentation identities;
- 24 compatible source sequences;
- 96 project-owned SVG frames;
- exactly 3 source sequences per identity.

First three recommended future pools:
1. `job/lumber/shift/spring/default`;
2. `job/guard/shift/summer/default`;
3. `job/tavern/shift/autumn/default`.

Five more current semantic identities also have three source sequences.

This is source readiness only.

It is not production animation coverage.

## Option review

### Proposed option A — exact-pinned sharp + gifenc

Chat 2 recommendation:
- `sharp@0.35.4`;
- `gifenc@1.0.3`;
- devDependencies only;
- one checked-in Node exporter.

QA classification:
`PREFERRED_PROPOSAL`.

Strengths:
- repository-local Node workflow;
- compatible with current Node 22.18.0 CI model;
- exact package-lock pinning;
- no separate system ImageMagick/ffmpeg provisioning;
- one direct local SVG -> raw RGBA -> GIF path;
- export can stay an explicit authoring command rather than runtime/build startup dependency.

Risks:
- `sharp` adds native/prebuilt platform dependency surface;
- lockfile size/platform packages increase;
- third-party dependency/security/license review is required;
- exact output determinism must be tested rather than assumed;
- exporter API must be pinned by executable regression.

### resvg-js + PNG decoder + gifenc

Classification:
`VIABLE_BUT_LARGER_DEPENDENCY_SURFACE`.

It requires an additional raster decode step before gifenc can consume pixels.

This is more complex than needed for the current flat-vector source frames.

### ImageMagick CLI

Classification:
`NOT_PREFERRED_FOR_CURRENT_REPO`.

Reason:
- system-level provisioning;
- version/delegate variability;
- current CI does not install it;
- harder to express through the existing npm-lock-only dependency path.

### ffmpeg + separate SVG rasterizer

Classification:
`OVER-SIZED_FOR_CURRENT_NEED`.

It introduces at least two native-tool concerns and a wider codec/build configuration surface.

## Reproducibility requirements

If Lead approves the proposed Node exporter, QA requires exact versions in:
- `package.json`;
- `package-lock.json`.

Exporter output must be controlled by checked-in values for:
- source frame order;
- dimensions;
- colorspace;
- alpha/background handling;
- palette target;
- per-frame delay;
- loop mode;
- output path;
- file-size limits.

A CI check should rerun or validate export deterministically enough to catch drift.

Do not rely on an undeclared local binary or a developer machine's global tool installation.

## CI portability gate

Before approval:
1. add exact devDependencies on a fresh main branch;
2. commit lockfile;
3. verify `npm ci` on the same Node 22.18.0 Linux runner;
4. run exporter smoke from repo-local SVG frames;
5. validate produced GIF signature/dimensions/frame count/timing/loop;
6. run full current check.

If a package requires a platform not covered by release authoring needs, document the supported exporter platforms explicitly.

Runtime/gameplay execution must not depend on the exporter being installed in a packaged game.

## Local-only input security

Exporter must accept only checked-in repository-local source frames.

Required rejection:
- absolute paths;
- path traversal;
- URL schemes;
- external image/font/script references;
- network fetch.

Source root should be restricted to:
`assets/presentation-frames/`.

Output root should be restricted to:
`assets/gif/`.

Do not ingest downloaded external GIFs or web assets through this exporter slice.

## Resource-safety controls

Exporter should cap:
- frame count;
- width/height;
- decoded pixel area;
- output bytes;
- sequence count per invocation.

SVG scripts/external resources must not execute.

Failures must be fatal and explicit.

## Production candidate rule

A source sequence is not a GIF candidate.

Before activating one semantic ID:
- export 3–5 actual GIF files;
- validate real GIF signatures;
- validate exact dimensions/frame timing/loop;
- preserve static fallback;
- use stable locale-neutral candidate keys;
- test deterministic locale-independent selection;
- prove no gameplay RNG or Save mutation.

The first future Lumber pool target remains:
`job/lumber/shift/spring/default`.

## Dependency-approval boundary

Chat 2 correctly did not install dependencies on the worker branch.

This QA does not itself authorize dependency installation.

Lead must explicitly own:
- package/lock changes;
- third-party notices/compliance;
- CI/tooling integration;
- exporter test suite.

## Verdict

`TOOLCHAIN_PROPOSAL_ACCEPTABLE_WITH_LEAD_APPROVAL`.

Preferred proposal:
exact-pinned `sharp + gifenc` in a dev-only repo-local exporter.

Current production state remains:
`EXPORT_BLOCKED / 0 REAL GIFS / 0 PRODUCTION GIF POOLS`.

No external asset ingestion is approved.
