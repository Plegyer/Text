# Project-Owned GIF Exporter Handoff v5

Scope: Chat 2 items **280–290**.

Semantic/source baseline used by the exporter proposal:
`main@3fc5495310e281cf5cbe52da3642000f1cb1fb05`.

Worker branch:
`chat2/presentation-replacement-next`.

## Decision package

Recommended exact dev-only dependency pair:
- `sharp@0.35.4`;
- `gifenc@1.0.3`.

Proposed role:
- sharp: repository-local SVG -> fixed RGBA raster;
- gifenc: deterministic palette/index/GIF encoding.

No package manifest or lockfile was modified by Chat 2.

Lead approval is still required before dependency installation.

## Dependency patch candidate

File:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/gif-exporter-dependency-patch-v1.json`.

It specifies:
- exact devDependency versions;
- exact package.json script addition;
- package-lock regeneration command/policy;
- dev-only boundary;
- no runtime/gameplay dependency.

Required package command after approval:

```bash
npm install --save-dev --save-exact sharp@0.35.4 gifenc@1.0.3
```

The generated lockfile must be reviewed rather than manually synthesized.

## CLI contract

File:
`docs/presentation-prep/GIF_EXPORTER_CLI_CONTRACT_V1.md`.

CLI target:
`tools/export-project-owned-gif.mjs`.

Core required selectors:
- source manifest;
- exact semantic presentationId;
- exact source sequence.

Supported deterministic controls:
- output path;
- width;
- height;
- frame delay;
- palette size;
- loop count;
- dry run.

Input restrictions:
- repository-relative local paths;
- project-owned frames under `assets/presentation-frames/`;
- output only under `assets/gif/`;
- no URL/scheme/traversal;
- no external SVG resource/script.

## Exporter script source

File:
`prior-work/astra/prototype-m3.2/tools/export-project-owned-gif.mjs`.

Current source implementation:
- parses/validates CLI arguments;
- loads one exact manifest sequence;
- validates semantic ownership;
- validates frame order/path/SVG metadata;
- validates static fallback;
- derives deterministic default output from candidate key;
- supports dependency-free `--dry-run`;
- dynamically imports sharp/gifenc only for real export;
- rasterizes source SVG frames at fixed dimensions;
- builds one global palette from ordered frame pixels;
- applies that palette deterministically;
- writes ordered frames with explicit delay/loop;
- writes only repository-local GIF output;
- emits SHA-256/byte-size metadata.

Because the dependencies remain uninstalled, real binary export has not been executed or claimed.

## Dry-run regression

File:
`prior-work/astra/prototype-m3.2/tests/project-owned-gif-exporter-dry-run-v1.test.ts`.

Tests without installing sharp/gifenc:
- CLI parsing/defaults;
- manifest lookup;
- exact semantic ID lookup;
- sequence ownership;
- deterministic default output naming;
- source file validation;
- unknown semantic rejection;
- sequence mismatch rejection;
- external URL rejection;
- external SVG resource rejection.

## Security / license review

File:
`docs/presentation-prep/GIF_EXPORTER_DEPENDENCY_SECURITY_LICENSE_REVIEW_V1.md`.

Review result:
- gifenc 1.0.3 / MIT: acceptable dev-only;
- sharp 0.35.4 / Apache-2.0: acceptable dev-only with explicit native/install-script CI verification;
- exact pinning required;
- exporter execution must remain local/no-network;
- dependency lockfile diff must be reviewed;
- neither package is approved as application runtime dependency.

## Reproducibility acceptance

File:
`docs/presentation-prep/GIF_EXPORTER_REPRODUCIBILITY_ACCEPTANCE_V1.md`.

Acceptance levels:

### Same pinned platform
Require byte-identical output:
- same length;
- same SHA-256;
- same bytes.

### Cross-platform if native raster output differs
May be considered deterministic-equivalent only if:
- each platform is internally byte-stable;
- dimensions/frame count/delays/duration/loop/source hashes match;
- differences are documented.

No random/time/locale/filesystem ordering may affect export.

## First-three-pool export plan

File:
`docs/presentation-prep/FIRST_THREE_POOL_EXPORT_PLAN_V2.md`.

First planned real 3-candidate pools:

### Lumber spring
Semantic:
`job/lumber/shift/spring/default`.

Candidates:
- `lumber-spring-loop-a`;
- `lumber-spring-loop-b`;
- `lumber-spring-loop-c`.

Normalized:
2400 ms / 600 ms per frame.

### Guard summer
Semantic:
`job/guard/shift/summer/default`.

Candidates:
- `guard-summer-loop-a`;
- `guard-summer-loop-b`;
- `guard-summer-loop-c`.

Normalized:
2800 ms / 700 ms per frame.

### Tavern autumn
Semantic:
`job/tavern/shift/autumn/default`.

Candidates:
- `tavern-autumn-loop-a`;
- `tavern-autumn-loop-b`;
- `tavern-autumn-loop-c`.

Normalized:
2600 ms / 650 ms per frame.

All:
- 640×360;
- 4 frames;
- infinite loop;
- existing project-owned static fallback retained.

Actual GIF candidates produced:
**0 / 9**.

## Technical budget

File:
`docs/presentation-prep/PROJECT_OWNED_GIF_TECHNICAL_BUDGET_V1.md`.

First-wave target:
- 640×360;
- 4 frames;
- 2.2–3.6 s typical loop;
- <=256 colors;
- <=2 MiB preferred per file;
- 5 MiB normal validator ceiling;
- >8 MiB default hard rejection/review;
- 3–5 candidates per production pool.

## GIF output validator

Source:
`prior-work/astra/prototype-m3.2/tools/validate-project-owned-gif.mjs`.

It validates future actual bytes for:
- repository-local `assets/gif/` path;
- non-placeholder path;
- project-owned/repository-local provenance note;
- GIF87a/GIF89a signature;
- nonzero dimensions;
- parsed frame count;
- parsed Graphic Control frame delays;
- total duration;
- NETSCAPE/ANIMEXT loop count where present;
- byte-size budget;
- expected dimensions/frame count/delay/duration/loop;
- valid trailer.

It requires no image/export dependency.

## GIF validator regression

File:
`prior-work/astra/prototype-m3.2/tests/project-owned-gif-validator-v1.test.ts`.

It uses only safe in-test generated GIF fixture bytes.

It tests:
- valid signature/metadata parsing;
- dimensions/frame count/timing/loop parsing;
- safe local provenance acceptance;
- invalid signature rejection;
- URL/traversal rejection;
- placeholder/external provenance rejection;
- byte budget;
- expected-metadata mismatches;
- validator CLI parsing.

Test fixture bytes are not production media.

## Exact Lead integration checklist

File:
`docs/presentation-prep/GIF_EXPORTER_INTEGRATION_EXACT_FILE_CHECKLIST_V1.md`.

Selective integration requires copying the proposal/tool/test files only.

If Lead approves dependencies, only these existing package files need dependency modifications:
- `prior-work/astra/prototype-m3.2/package.json`;
- `prior-work/astra/prototype-m3.2/package-lock.json`.

No initial exporter approval requires changes to:
- shared presentation runtime;
- gameplay;
- Save;
- root production media mappings;
- root localization;
- build script;
- CI workflow.

## Exact approval decision required from Lead

Decision:

**Approve or reject exact dev-only exporter dependency integration using `sharp@0.35.4` + `gifenc@1.0.3`.**

Approval means:
1. selective-copy Chat 2 exporter source/tests/docs;
2. add exact devDependencies/script to package.json;
3. regenerate package-lock through npm;
4. verify native dependency install through `npm ci`;
5. run dry-run/tests/full check;
6. smoke-export one local source sequence;
7. validate bytes;
8. test reproducibility.

Approval does **not** automatically authorize:
- root presentation pool activation;
- localization candidate activation;
- production animation coverage claim.

Those happen only after real GIF bytes exist and pass technical/provenance/pool/runtime QA.

## Files that remain untouched until real GIF output exists

Do not change merely for exporter approval:
- `content/presentation.json`;
- `content/localization.json`;
- shared `src/core/presentation.ts`;
- gameplay/Save/schema/UI files.

Do not add placeholder/fake GIF files.

## Current production state

Project-owned source sequences:
**READY**.

Exporter implementation source:
**READY FOR LEAD REVIEW**.

Dependency patch:
**PROPOSED / NOT APPLIED**.

Actual GIF bytes:
**0**.

Production PR42 GIF pools:
**0**.

Production animation claim:
**NO**.

Next true production step:
Lead approval + exact-pinned exporter integration, followed by first real project-owned GIF export and validation.
