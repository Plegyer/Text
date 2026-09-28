# GIF Export Determinism Golden Contract v1

Scope:
future real exports from `tools/export-presentation-gif.mjs`.

This contract defines the minimum same-input reproducibility standard before any production GIF pool activation.

## Golden input tuple

A golden export is fully determined by:
1. exact exporter source commit;
2. exact package-lock commit;
3. exact Node version;
4. exact OS/architecture for byte-identity comparison;
5. exact source manifest bytes;
6. exact ordered SVG frame bytes;
7. exact semantic presentationId;
8. exact sequence key;
9. exact output width/height;
10. exact frame duration;
11. exact loop count;
12. exact palette size/quantization mode.

No time, locale, random seed, directory enumeration order, network resource or environment-dependent source discovery may participate.

## Same-input byte-identity acceptance

Two exports from the same golden input tuple must have:
- identical file length;
- identical SHA-256;
- byte-for-byte identical GIF bytes.

Anything else is a determinism failure.

## Golden first-wave geometry

Default expected output:
- width: **640 px**;
- height: **360 px**;
- frame count: **4**;
- palette ceiling: **256 colors**;
- loop count: **0 / infinite**.

Per-pool frame duration comes from the normalized source manifest and must be divisible by 10 ms.

## Golden timing examples

### Lumber spring
- 600 ms/frame;
- 2400 ms total.

### Guard summer
- 700 ms/frame;
- 2800 ms total.

### School Literacy
- 750 ms/frame;
- 3000 ms total.

### Helpful poverty
- 600 ms/frame;
- 2400 ms total.

### Forest success return
- 800 ms/frame;
- 3200 ms total.

### Foreman Night
- 900 ms/frame;
- 3600 ms total.

## GIF metadata expectations

Validator must confirm:
- signature is `GIF87a` or `GIF89a`;
- logical screen width/height match the expected raster;
- image frame count equals 4 for first-wave pools;
- every frame delay matches the expected per-frame duration;
- total duration equals frame count × frame duration;
- loop metadata indicates infinite looping;
- file ends with a valid GIF trailer.

## Palette / encoding expectations

The exporter must:
- rasterize source SVGs in manifest order;
- convert to sRGB RGBA;
- concatenate frame pixels in stable order;
- derive one deterministic global palette from the ordered full-sequence pixel buffer;
- apply the same palette mapping method to every frame;
- encode frames in the exact manifest order.

Per-frame palette selection is outside the golden path unless explicitly re-reviewed.

## Metadata exclusion

Golden output must not embed:
- current timestamp;
- random identifier;
- authoring machine path;
- locale;
- gameplay state;
- Save data.

## Output path

The output path is part of the export command but should not alter GIF bytes.

Re-running identical source/parameters to two different approved local paths should still produce byte-identical GIF bytes on the same pinned environment.

## Cross-platform rule

Do not claim cross-platform byte identity unless demonstrated.

If macOS/Windows native rasterization differs from Ubuntu:
- each platform must still be byte-stable internally;
- dimensions/frame order/timing/loop/source identity must match;
- cross-platform byte differences must be documented.

Production CI golden should use one pinned supported environment as the canonical byte-identity authority.

## File-size acceptance

Preferred:
<=2 MiB per first-wave candidate.

Normal validator ceiling:
5 MiB.

Any output >5 MiB requires optimization/review before production activation.
Any output >8 MiB is rejected by default absent explicit exception.

## Failure conditions

Golden acceptance fails on:
- SHA mismatch for same input/environment;
- size mismatch;
- different frame order;
- different frame delay;
- different loop count;
- different dimensions;
- invalid signature/trailer;
- hidden external resource dependency;
- timestamp/random metadata.

## Golden record

For each accepted production candidate, record:
- semantic ID;
- candidate key;
- source sequence;
- source frame hashes;
- exporter commit;
- lockfile commit;
- Node/platform;
- output SHA-256;
- byte size;
- dimensions;
- frame count;
- delays;
- loop count.

## Current state

Contract:
**READY**.

Golden bytes:
**NONE YET**.

Production acceptance:
**BLOCKED UNTIL REAL EXPORT + VALIDATOR + SAME-INPUT BYTE CHECK**.
