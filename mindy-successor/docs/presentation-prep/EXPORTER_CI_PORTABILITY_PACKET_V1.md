# Exporter CI Portability Packet v1

Exact current-main baseline:
`54131488c65302f81b3001abaaa345d21f0281e2`.

Current project package baseline:
- Node engine: `>=22.18.0`;
- lockfileVersion: 3.

Current CI:
- runner: `ubuntu-latest`;
- Node: `22.18.0`;
- install: `npm ci`;
- verification: `npm run check`.

Proposed exporter dependencies:
- `sharp@0.35.4`;
- `gifenc@1.0.3`.

No dependency is installed by this packet.

## Node 22 considerations

The project already pins CI to Node 22.18.0.

Exporter approval must be tested on that exact version first.

The exporter script is Node ESM and uses:
- Node built-ins;
- dynamic import of sharp/gifenc only in real-export mode.

Dry-run validation remains usable without the exporter packages.

## Ubuntu CI / sharp native-install risk

`sharp` introduces the principal portability risk because it uses native/Node-API code and platform packages.

Required CI acceptance:
1. generated lockfile resolves the expected Linux x64/arm-independent package graph for GitHub runner execution;
2. `npm ci` succeeds without manual ImageMagick/ffmpeg/system package setup;
3. `import('sharp')` succeeds on Node 22.18.0;
4. one local SVG frame rasterizes at 640×360;
5. no export-time network access is required.

If sharp falls back to a source build or unsupported native path, treat that as an integration failure until explicitly resolved.

## gifenc portability

`gifenc` is JavaScript and should not add a native install requirement.

Acceptance still requires:
- exact package pin;
- import API smoke;
- deterministic encoder wrapper tests.

## Deterministic export assumptions

Same-environment byte identity assumes identical:
- Node version;
- OS/architecture;
- package-lock/dependency bytes;
- exporter script;
- SVG source bytes/order;
- raster size;
- quantization parameters;
- frame timing;
- loop setting.

Same pinned Ubuntu CI environment should produce byte-identical repeated export before production activation.

Cross-platform output should not be assumed byte-identical unless measured.

## CI smoke after approval

Recommended integration sequence:

```bash
npm ci
node tools/export-project-owned-gif.mjs ... --dry-run
node tools/export-project-owned-gif.mjs ... --output assets/gif/.../smoke.gif
node tools/validate-project-owned-gif.mjs ...
npm run check
```

For CI smoke, use a controlled temporary/local output and clean it unless the byte is intentionally reviewed for commit.

## Existing CI workflow impact

Current workflow already runs:
- `npm ci`;
- `npm run check`.

No workflow edit is required merely to discover dependency-install breakage.

A dedicated exporter smoke may later be added by Lead if continuous exporter reproducibility becomes a required merge gate.

## Rollback path

If the dependency pair is not portable/reproducible:

1. remove `sharp` and `gifenc` from devDependencies;
2. remove `media:export-gif` script if added;
3. regenerate/restore package-lock;
4. keep SVG frame sources;
5. keep static fallbacks;
6. do not activate GIF paths.

No gameplay/Save migration is involved.

## CI portability conclusion

Source authoring:
**PORTABLE NOW**.

Dry-run source validation:
**PORTABLE NOW**.

Real GIF export:
**REQUIRES LEAD-APPROVED DEPENDENCY INSTALL + NODE 22.18 / UBUNTU SMOKE**.

Production GIF activation:
**NOT READY UNTIL THAT SMOKE AND BYTE QA PASS**.
