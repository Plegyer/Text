# GIF Exporter Dependency Security / License Review v1

Reviewed proposal:
- `sharp@0.35.4`;
- `gifenc@1.0.3`;
- dev-only use in `prior-work/astra/prototype-m3.2`.

No dependency is installed by this review.

## sharp 0.35.4

Package role:
repository-local SVG rasterization to fixed-size raw RGBA.

License:
**Apache-2.0**.

Runtime compatibility:
- published sharp 0.35.4 requires Node >=20.9.0;
- project requires Node >=22.18.0;
- compatibility is acceptable for the project Node baseline.

Native/transitive footprint:
- Node-API/native module;
- uses libvips/platform packages;
- therefore increases native/platform-specific lockfile surface compared with pure JavaScript;
- common macOS/Windows/Linux platforms are supported through prebuilt packages.

Install-script behavior:
- sharp 0.35.x has an install lifecycle check/build path (`node install/check.js || npm run build`);
- this means dependency installation executes package code unless npm/package policy blocks scripts;
- future npm install-script policy changes can affect availability of the native binary;
- Lead should explicitly verify `npm ci` behavior on the project's exact Node/npm CI image before approving.

Security considerations:
- native image-processing code increases parser attack surface;
- this exporter must process only repository-local project-authored SVGs;
- network/external images/scripts are rejected before sharp receives source;
- dimensions and frame counts are bounded;
- exporter remains dev-only and is not loaded by the shipped application runtime.

Maintenance:
- actively maintained package;
- exact version should be pinned;
- platform/transitive lockfile changes should be reviewed on upgrades.

Assessment:
**ACCEPTABLE FOR DEV-ONLY USE WITH LEAD APPROVAL**, provided exact lockfile/CI installation is verified.

## gifenc 1.0.3

Package role:
RGBA quantization/palette mapping and GIF encoding.

License:
**MIT**.

Architecture:
- pure JavaScript;
- ESM/CJS-capable;
- no native binary required for encoding.

Published package lifecycle scripts:
- package metadata exposes build/prepublish-related scripts;
- no consumer `install`/ `postinstall` lifecycle script is declared in the reviewed package metadata.

Maintenance:
- version 1.0.3 is mature/older rather than frequently released;
- API is small and should be wrapped only by the checked-in exporter;
- exact pinning protects the initial integration from silent API changes.

Security considerations:
- consumes in-memory project-owned RGBA only;
- no network or file discovery API is needed;
- no runtime application dependency is required.

Assessment:
**ACCEPTABLE FOR DEV-ONLY USE**.

## Transitive / supply-chain policy

If Lead approves:
1. use exact versions, not ranges;
2. generate `package-lock.json` via npm rather than hand-writing integrity fields;
3. review every new lockfile package;
4. run `npm ci` on exact CI head;
5. keep exporter dependencies in `devDependencies`;
6. do not import sharp/gifenc from application runtime code;
7. do not allow exporter input URLs;
8. do not run export automatically on application startup;
9. keep finished GIF bytes as normal static assets once produced.

## Network behavior

Authoring requirement:
- exporter performs no `fetch`;
- frame sources are restricted to `assets/presentation-frames/`;
- output is restricted to `assets/gif/`.

Dependency installation itself uses the configured npm registry/package distribution mechanism as normal `npm ci` behavior; export execution must not need network access.

## License handling

If the dev dependencies are approved:
- record sharp Apache-2.0 notice according to project third-party-notice policy;
- record gifenc MIT notice according to project third-party-notice policy;
- preserve upstream license notices in dependency distribution/cache as required by normal package-manager behavior.

The game/project source license remains unchanged.

## CI portability

Expected CI target:
Ubuntu GitHub runner with Node 22.18.0.

Approval check:
- `npm ci` installs sharp usable on CI;
- a dry-run remains dependency-light;
- one exporter smoke test renders a local SVG to RGBA/GIF;
- no OS-level ImageMagick/ffmpeg provisioning is required.

## Final review state

`gifenc@1.0.3`:
**ACCEPTABLE DEV-ONLY**.

`sharp@0.35.4`:
**ACCEPTABLE DEV-ONLY WITH NATIVE/INSTALL-SCRIPT CI VERIFICATION**.

Combined proposal:
**ACCEPTABLE FOR LEAD REVIEW; NOT AUTHORIZED/INSTALLED BY CHAT 2**.
