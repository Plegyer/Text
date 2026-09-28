# Animation exporter approval QA v2

Status: COMPLETE / APPROVABLE_DEV_TOOLCHAIN_CHANGE / NO_PRODUCTION_GIF_CLAIM

Current production main:
`4223be1f90f15a43938e072bc2171b0de5d2d1aa`.

Reviewed Chat2 exporter packet:
- dependency options/decision;
- exact dependency patch candidate;
- CLI contract;
- exporter source;
- dry-run regression;
- security/license review;
- reproducibility contract;
- technical budgets;
- actual-GIF validator;
- exact integration checklist/handoff.

## Dependency pinning

Proposed dev-only packages:
- `sharp@0.35.4`;
- `gifenc@1.0.3`.

Exact versions, no ranges.

Current worker and current main still share identical:
- `package.json` blob `91de0847c3ae3b8de394334968307ccf6252820a`;
- `package-lock.json` blob `77b325bc6b2115499c475adf92d3bae218bf37a1`.

Therefore no dependency was silently installed by the worker.

Lead must add the packages on a fresh branch and commit the generated lockfile.

## License/security

Reviewed:
- gifenc 1.0.3: MIT;
- sharp 0.35.4: Apache-2.0 with native/libvips distribution footprint.

Required Lead integration checks:
- exact lockfile graph;
- install/postinstall behavior;
- third-party notices;
- native optional/platform packages;
- `npm ci` on the actual CI runner.

Exporter is dev-only and must never be imported by gameplay/runtime code.

## Input security

Exporter accepts repository-local project-owned SVG frames only.

Required/implemented path controls:
- reject absolute paths;
- reject URL/scheme paths;
- reject traversal/dot segments;
- input rooted under `assets/presentation-frames/`;
- output rooted under `assets/gif/`.

SVG checks reject:
- scripts;
- external HTTP(S);
- protocol-relative/data resources.

No network download is part of the tool.

## Deterministic export controls

Deterministic inputs include:
- exact manifest frame order;
- exact source bytes;
- pinned exporter revision;
- pinned package lock;
- width/height;
- palette target;
- per-frame delay;
- loop mode;
- output path.

No locale or gameplay RNG is used.

Default timing requires 10 ms divisibility for exact GIF centiseconds.

## Reproducibility acceptance

Same pinned platform/environment must produce byte-identical output and SHA-256 on repeated export.

Cross-platform byte identity is not assumed.

If multiple authoring platforms are supported:
- each platform must be internally byte-stable;
- dimensions/frame count/delay/duration/loop/source hashes must match;
- any byte difference must be documented.

## CI portability

Current CI:
- Ubuntu;
- Node 22.18.0;
- `npm ci`;
- `npm run check`.

Approval requires a fresh integration head to prove:
1. exact devDependency install succeeds;
2. exporter can rasterize/encode a project-owned source;
3. validator accepts actual GIF bytes;
4. repeated same-platform export is reproducible;
5. full current suite remains green.

No system ImageMagick/ffmpeg provisioning should be required.

## Rollback

Safe rollback boundary:
- remove exporter npm script;
- remove exact devDependencies;
- regenerate lockfile;
- remove exporter-only tooling/tests if abandoning the tool.

Existing static assets/presentation/runtime/gameplay must remain unaffected.

Exported GIF assets are a separate production review surface and should not be activated merely because exporter tooling is approved.

## GIF validator

Future actual GIF must be checked for:
- GIF87a/GIF89a signature;
- dimensions;
- frame count;
- delays/duration;
- loop;
- trailer;
- byte budget;
- project-owned local provenance.

Test fixture bytes do not count as production GIFs.

## Current production state

Real project-owned production GIFs:
`0`.

Production 3–5 GIF pools:
`0`.

No `assets/gif/` production claim is approved.

## Verdict

`APPROVABLE_DEV_TOOLCHAIN_CHANGE`.

QA approves the tooling design for Lead integration subject to exact native `npm ci`, lockfile/security/license and reproducibility verification.

This is explicitly not approval of any production GIF/pool.
