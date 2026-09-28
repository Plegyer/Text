# Animation exporter preapproval QA v3

Status: COMPLETE / READY_FOR_LEAD_APPROVAL / INSTALL_AND_CI_PROOF_REQUIRED

Current main:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`.

Reviewed Chat2 packets include:
- `EXPORTER_DEPENDENCY_LICENSE_PACKET_V1.md`
  blob `772bf4c382cea333e8b9f64e730ff5320f7fa08e`;
- `EXPORTER_CI_PORTABILITY_PACKET_V1.md`
  blob `06f57a896d7540e8458ad894fa1f463a376acc9a`;
- prior exact dependency/security/reproducibility/exporter/validator packet.

## Proposed exact dev-only dependencies

- `sharp@0.35.4`;
- `gifenc@1.0.3`.

No semver ranges.

Purpose:
authoring-time repository-local project-owned SVG frames -> GIF export.

Not application runtime.

## Current package integrity

Current main package files are still unchanged from the preapproval baseline:

`package.json` blob:
`91de0847c3ae3b8de394334968307ccf6252820a`.

`package-lock.json` blob:
`77b325bc6b2115499c475adf92d3bae218bf37a1`.

Neither sharp nor gifenc is currently installed.

## License / notice

`sharp@0.35.4`:
Apache-2.0.

Required Lead checks:
- notices;
- generated transitive/platform lockfile surface;
- native/libvips packages;
- install lifecycle behavior.

`gifenc@1.0.3`:
MIT.

Required:
- MIT notice;
- exact pin;
- development-tool inventory as applicable.

Dependency licenses do not change ownership/license of project-authored media.

## CI portability

Project baseline:
- Node >=22.18.0;
- CI Node 22.18.0;
- Ubuntu runner;
- `npm ci`;
- `npm run check`.

Principal risk:
sharp native/prebuilt installation.

Actual approval integration must prove:
1. exact generated lockfile;
2. `npm ci` succeeds;
3. sharp import succeeds;
4. gifenc import succeeds;
5. local project-owned SVG rasterizes;
6. GIF encodes with no export-time network access;
7. validator accepts actual bytes;
8. two same-environment exports are byte/SHA identical;
9. full current CI remains green.

Unexpected native source-build/fallback behavior is blocking until reviewed.

## Input security

Exporter must remain restricted to:
- repository-local inputs;
- `assets/presentation-frames/`;
- project-owned SVG sources.

Reject:
- URLs;
- absolute paths;
- traversal;
- remote art;
- data-resource injection;
- scripts/external SVG resources.

Output remains under:
`assets/gif/`.

## Determinism

Same pinned environment fixes:
- Node/OS/arch;
- package lock;
- exporter revision;
- source frame hashes/order;
- dimensions;
- palette;
- timing;
- loop.

Same exact input must yield byte-identical output.

Cross-platform byte identity is not assumed without evidence.

## Rollback

If dependency/tooling integration fails:
- remove exact devDependencies;
- remove exporter script entry;
- regenerate/restore lockfile;
- retain SVG source frames;
- retain static fallbacks;
- activate no GIF paths.

No gameplay/Save migration is involved.

## Production animation state

Current actual production GIFs:
`0`.

Current production 3–5 candidate GIF pools:
`0`.

Source frame readiness does not count as production animation.

## Verdict

`READY_FOR_LEAD_APPROVAL / INSTALL_AND_CI_PROOF_REQUIRED`.

The proposed dev-only dependency change is ready for an explicit Lead tooling integration attempt.

No production GIF/pool claim is approved.
