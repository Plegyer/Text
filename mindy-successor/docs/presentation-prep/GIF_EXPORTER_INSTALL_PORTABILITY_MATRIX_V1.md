# GIF Exporter Install Portability Matrix v1

Current-main baseline:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`.

Proposed exact dev-only dependencies:
- `sharp@0.35.4`;
- `gifenc@1.0.3`.

Project Node baseline:
`>=22.18.0`.

This matrix is review documentation only. No package installation is performed here.

## Matrix

| Environment | Expected install shape | Primary risk | Acceptance before use |
| --- | --- | --- | --- |
| Ubuntu CI / Node 22.18 | `npm ci` from lockfile; sharp platform package + gifenc JS | sharp native/platform resolution and lifecycle install behavior | clean `npm ci`, imports succeed, one local raster/export smoke succeeds, full check passes |
| macOS Apple Silicon / Node 22 | npm lock selects darwin-arm64 sharp/libvips packages | platform-specific optional package resolution; developer lock drift if generated on another npm setup | `npm ci` succeeds from committed lock without manual brew/ImageMagick/ffmpeg requirement |
| macOS Intel / Node 22 | darwin-x64 sharp/libvips packages | support/availability of exact sharp platform binary; less common authoring environment | same as above; if unsupported, do not fall back silently to unreviewed local build |
| Windows x64 / Node 22 | win32-x64 sharp platform package + gifenc JS | native package install path, antivirus/path issues, shell quoting differences | `npm ci`, dynamic imports, local smoke export, byte/metadata validation |
| Linux non-CI / Node 22 | platform-specific sharp binary or source fallback | libc/architecture variance; source build toolchain | explicit local smoke; not considered supported merely because Ubuntu CI passes |

## Node 22 considerations

The repository already requires Node >=22.18.0 and CI uses Node 22.18.0.

Lead acceptance should test the exact CI version first.

Do not weaken the Node baseline merely to accommodate exporter dependencies.

## sharp-specific risks

`sharp` is the only proposed native dependency.

Review points:
- Node-API/prebuilt support for the target OS/architecture;
- libvips platform package selection;
- lifecycle/install script execution during npm install/ci;
- optional dependency behavior in the lockfile;
- possible source-build fallback on unsupported systems;
- deterministic raster behavior across platforms.

No system-level ImageMagick or ffmpeg dependency should be introduced by this path.

If a platform requires undocumented manual native setup, classify that environment as unsupported until Lead approves a documented path.

## gifenc-specific risks

`gifenc` is JavaScript-only for the intended use.

Review points:
- exact ESM/CJS import behavior under Node 22;
- expected `GIFEncoder`, `quantize`, `applyPalette` APIs;
- exact version pinning;
- deterministic output from ordered pixel buffers.

No native install risk is expected from gifenc itself.

## Lockfile portability

If approved:
1. update package.json with exact devDependencies;
2. generate package-lock via npm;
3. review all sharp platform/optional package additions;
4. commit package.json + package-lock together;
5. verify `npm ci` on Ubuntu exact-head CI.

Do not hand-delete platform packages from the generated lock merely because the authoring machine does not use them.

## Authoring portability standard

A platform is considered exporter-authoring supported only when:
- `npm ci` succeeds from the committed lock;
- both dynamic imports succeed;
- a repository-local SVG smoke raster/export succeeds;
- validator accepts the GIF;
- repeated same-input export is stable on that platform.

## Determinism caveat

Same-platform repeated output must be byte-identical.

Cross-platform byte identity is desirable but not assumed because native rasterization can differ subtly.

Cross-platform acceptance, if needed, requires identical:
- dimensions;
- frame count/order;
- delays;
- total duration;
- loop metadata;
- source hashes;
- local-only provenance.

## Rollback path

If Ubuntu CI or required authoring platforms fail:
- remove both devDependencies;
- remove the exporter package script;
- restore/regenerate package-lock;
- keep SVG source assets and exporter source draft;
- do not activate production GIF pools.

## Matrix result

Ubuntu CI:
**REQUIRED SUPPORT TARGET**.

Windows x64:
**AUTHORING TARGET / MUST SMOKE BEFORE CLAIM**.

macOS Apple Silicon:
**AUTHORING TARGET / MUST SMOKE BEFORE CLAIM**.

macOS Intel / other Linux:
**BEST-EFFORT UNTIL VERIFIED**.

Package installation performed by Chat 2:
**NO**.
