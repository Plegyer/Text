# Animation exporter preapproval QA v3

Status: COMPLETE / READY_FOR_LEAD_APPROVAL / INSTALL_AND_CI_PROOF_REQUIRED

Current main:
`54131488c65302f81b3001abaaa345d21f0281e2`.

Reviewed current Chat2 exporter packet, including:
- `EXPORTER_DEPENDENCY_LICENSE_PACKET_V1.md`;
- `EXPORTER_CI_PORTABILITY_PACKET_V1.md`;
- prior exact dependency/CLI/security/reproducibility/validator packet.

Latest packet blobs reviewed:
- license packet:
  `772bf4c382cea333e8b9f64e730ff5320f7fa08e`;
- CI portability packet:
  `06f57a896d7540e8458ad894fa1f463a376acc9a`.

## Proposed exact dev-only dependencies

- `sharp@0.35.4`;
- `gifenc@1.0.3`.

No semver ranges.

Purpose:
authoring-time project-owned SVG frame -> GIF export.

Not application runtime.

## Current package integrity

Worker and current main still have identical:
- `package.json` blob
  `91de0847c3ae3b8de394334968307ccf6252820a`;
- `package-lock.json` blob
  `77b325bc6b2115499c475adf92d3bae218bf37a1`.

Therefore Chat2 has not silently installed or committed the proposed dependency change.

This is the correct preapproval state.

## License review

### sharp 0.35.4
License:
Apache-2.0.

Required Lead obligations:
- retain required notices;
- include in development-tool third-party inventory if project policy uses one;
- review transitive/platform packages in generated lockfile;
- review native/libvips distribution surface;
- review install lifecycle behavior.

### gifenc 1.0.3
License:
MIT.

Required:
- retain MIT notice/copyright;
- exact pin;
- third-party development-tool inventory as applicable.

These dependency licenses do not change ownership/license of project-authored frames or exported media.

## CI baseline

Current project:
- Node engine >=22.18.0;
- GitHub runner Ubuntu latest;
- CI Node 22.18.0;
- `npm ci`;
- `npm run check`;
- lockfileVersion 3.

This is a suitable explicit target environment for approval testing.

## Native install risk

Primary risk:
`sharp`.

Approval is conditional on exact current CI proving:
1. generated lockfile resolves supported Linux packages;
2. `npm ci` succeeds without manual ImageMagick/ffmpeg/system provisioning;
3. `import('sharp')` succeeds on Node 22.18.0;
4. one local SVG rasterizes at the required size;
5. no export-time network fetch is required.

Unexpected source build/native fallback:
`BLOCKING_UNTIL_REVIEWED`.

## gifenc portability

Expected JS-only path is lower risk.

Still require:
- import smoke;
- exact API use;
- deterministic wrapper tests;
- exact package pin.

## Input/provenance security

Exporter approval remains constrained to:
- repository-local;
- project-owned SVG frame sources.

Reject:
- external URLs;
- absolute paths;
- traversal;
- remote art;
- data-resource injection;
- scripts/external SVG resources.

No downloaded third-party GIF/media is approved.

## Determinism

Same pinned CI environment must fix:
- Node;
- OS/arch;
- lockfile;
- exporter revision;
- source frame hashes/order;
- dimensions;
- palette/quantization;
- frame delay;
- loop.

Before production media activation:
two repeated exports of the same exact source/config on the approved environment should be byte-identical/SHA-identical.

Cross-platform byte identity is not assumed.

## Rollback

If install/export portability fails:
1. remove exact devDependencies;
2. remove exporter npm script if added;
3. regenerate/restore lockfile;
4. retain project-owned SVG frame sources;
5. retain static fallbacks;
6. activate no GIF paths.

No gameplay/Save migration is involved.

## Current route animation source readiness

Chat2 has route frame/source authoring, but source SVG sequences are not production GIF candidates.

Current actual project-owned production GIFs:
`0`.

Current production 3–5 candidate pools:
`0`.

No GIF path should be added merely because dependency approval is granted.

## Approval classification

The documentation/design packet is sufficient for Lead to decide and attempt the exact dev-only integration.

Therefore:
`READY_FOR_LEAD_APPROVAL`.

But dependency approval is not equivalent to completed toolchain validation.

The actual integration head remains required to prove:
- package/lock diff;
- notices/transitive review;
- npm ci;
- sharp/gifenc import;
- export smoke;
- GIF validator;
- repeated determinism;
- full current CI.

## No production GIF claim

This QA explicitly does not approve:
- any actual GIF bytes;
- any GIF candidate pool;
- any root GIF activation;
- any runtime dependency.

## Verdict

`READY_FOR_LEAD_APPROVAL / INSTALL_AND_CI_PROOF_REQUIRED`.

The proposed dev-only dependency change is ready for Lead approval as a tooling experiment/integration.

Production animation remains unapproved until real project-owned GIF bytes separately pass pool acceptance.
