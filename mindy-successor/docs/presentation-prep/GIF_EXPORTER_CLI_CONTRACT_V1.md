# GIF Exporter CLI Contract v1

Current implementation source:

`prior-work/astra/prototype-m3.2/tools/export-presentation-gif.mjs`.

Purpose:
deterministically convert one repository-local project-owned SVG frame sequence into one animated GIF candidate after Lead approves the exact dev-only dependencies.

Expected exact dev dependencies:
- `sharp@0.35.4`;
- `gifenc@1.0.3`.

The exporter is authoring-only and must not touch gameplay/runtime/schema/UI state.

## Exact CLI

Run from the prototype root:

```bash
node tools/export-presentation-gif.mjs \
  --manifest content/presentation-drafts/project-owned-animation-source-manifest-v3.json \
  --presentation-id job/lumber/shift/spring/default \
  --sequence lumber-spring-work-loop-a \
  --output assets/gif/careers/lumber/spring-loop-a.gif \
  --width 640 \
  --height 360 \
  --frame-duration-ms 600 \
  --loop-count 0
```

Dependency-free validation:

```bash
node tools/export-presentation-gif.mjs ... --dry-run
```

## Arguments

### `--manifest <path>`
Required.

Rules:
- repository-relative;
- under `content/presentation-drafts/`;
- JSON only;
- no URL/scheme;
- no absolute path;
- no traversal.

### `--presentation-id <id>`
Required.

Must exactly match a manifest sequence semantic identity.

### `--sequence <key>`
Required.

Must belong to the supplied presentationId.

### `--output <path>`
Required.

Rules:
- repository-relative;
- under `assets/gif/`;
- `.gif` extension;
- no URL/scheme;
- no absolute path;
- no traversal.

### `--width <px>`
Optional. Default: `640`. Allowed: 64–1920.

### `--height <px>`
Optional. Default: `360`. Allowed: 64–1080.

### `--frame-duration-ms <ms>`
Optional only when the manifest provides `normalizedFrameDelayMs`.

Resolution order:
1. CLI override;
2. manifest normalized delay.

Rules:
- integer;
- 20–5000 ms;
- divisible by 10 ms for exact GIF centisecond timing.

### `--loop-count <count>`
Optional. Default: `0`.

Meaning:
- `0`: infinite loop;
- `-1`: play once where encoder semantics allow;
- positive integer: explicit repeat count.

Production presentation target: `0`.

### `--palette <count>`
Optional. Default: 256. Allowed: 2–256.

### `--dry-run`
Validates/prints the resolved plan without importing `sharp` or `gifenc` and without writing bytes.

## Source contract

Every source frame must:
- be under `assets/presentation-frames/`;
- be local `.svg`;
- physically exist;
- carry exact `data-presentation-id`;
- carry exact `data-sequence-id`;
- carry exact ordered `data-frame-index`;
- contain no script;
- contain no external/embedded resource URL.

Frame order comes only from the manifest array.

No directory/glob order is permitted.

## Deterministic encoding contract

Given identical:
- SVG bytes/order;
- exporter revision;
- exact dependency/lockfile bytes;
- Node/platform environment;
- width/height;
- frame duration;
- loop count;
- palette size;

the exporter must:
1. rasterize frames in manifest order;
2. use fixed dimensions;
3. convert to sRGB RGBA;
4. concatenate frame pixels in stable order;
5. derive one global palette deterministically;
6. map every frame using that palette;
7. encode frames in source order;
8. write explicit frame delay/loop;
9. avoid timestamps/randomness/network inputs.

Same pinned environment is expected to produce byte-identical output.

## Dry-run output

Prints:
- manifest;
- presentationId;
- sequenceKey;
- candidateKey;
- ordered frame paths;
- static fallback;
- output path;
- width/height;
- frameDurationMs;
- totalDurationMs;
- loopCount;
- palette;
- dryRun=true.

## Real export output

Adds:
- frameCount;
- byteSize;
- SHA-256.

## Hard failures

Nonzero exit for:
- unknown/missing argument;
- invalid path;
- unknown semantic ID;
- sequence mismatch;
- missing static fallback;
- missing/invalid frame;
- frame metadata mismatch;
- external resource/script;
- invalid dimensions/timing/palette/loop;
- dependency import/API mismatch;
- write failure.

## Network boundary

Exporter contains no fetch/download behavior.

It accepts only repository-local input paths.

## Gameplay boundary

The exporter never reads/writes:
- reward/effect;
- eligibility;
- gameplay RNG;
- Save;
- outcome;
- gameplay duration.

Animation timing is presentation-only.
