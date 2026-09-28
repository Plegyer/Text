# GIF Exporter CLI Contract v1

Tool:
`prior-work/astra/prototype-m3.2/tools/export-project-owned-gif.mjs`.

Purpose:
convert one validated project-owned SVG frame sequence into one local animated GIF candidate after the proposed dev-only exporter dependencies are approved and installed.

The CLI is presentation-authoring only. It must not mutate gameplay/runtime/schema/UI state.

## Invocation

Run from the prototype root:

```bash
node tools/export-project-owned-gif.mjs \
  --manifest content/presentation-drafts/project-owned-animation-source-manifest-v3.json \
  --presentation-id job/lumber/shift/spring/default \
  --sequence lumber-spring-work-loop-a \
  --output assets/gif/careers/lumber/spring-loop-a.gif
```

Dry-run validation requires no exporter dependencies:

```bash
node tools/export-project-owned-gif.mjs \
  --manifest content/presentation-drafts/project-owned-animation-source-manifest-v3.json \
  --presentation-id job/lumber/shift/spring/default \
  --sequence lumber-spring-work-loop-a \
  --dry-run
```

## Required inputs

### `--manifest <path>`

Default:
`content/presentation-drafts/project-owned-animation-source-manifest-v3.json`.

Constraints:
- repository-relative;
- under `content/presentation-drafts/`;
- JSON file;
- no URL/scheme;
- no absolute path;
- no `..` traversal.

### `--presentation-id <id>`

Required.

Must exactly match a current source-manifest `presentationId`.

Unknown IDs are a hard error.

### `--sequence <key>`

Required.

Must exactly match a source-manifest `sequenceKey` owned by the supplied presentationId.

The first implementation exports one sequence per process invocation. Multiple pool candidates are exported through multiple deterministic invocations.

### `--output <path>`

Optional.

When supplied:
- repository-relative;
- must be under `assets/gif/`;
- must end in `.gif`;
- no URL/scheme;
- no absolute path;
- no `..` traversal.

Deterministic default when omitted:

`assets/gif/project-owned/<candidateKey>.gif`

where `candidateKey` comes from the validated source manifest.

### `--width <px>`

Optional.

Default:
`640`.

Allowed:
64–1920.

### `--height <px>`

Optional.

Default:
`360`.

Allowed:
64–1080.

First-wave production target is 640×360.

### `--delay-ms <ms>`

Optional override.

Default:
the manifest's `normalizedFrameDelayMs`.

Constraints:
- positive integer;
- divisible by 10 ms so GIF centisecond timing is exact;
- 20–5000 ms.

### `--palette <count>`

Optional.

Default:
`256`.

Allowed:
2–256.

### `--loop <count>`

Optional.

Default:
`0`.

Meaning follows the encoder contract:
- `0`: repeat forever;
- `-1`: play once;
- positive integer: explicit repeat count.

Production project-owned presentation loops use `0`.

### `--dry-run`

Optional flag.

Behavior:
- parses CLI;
- reads and validates manifest;
- resolves exact semantic ID and sequence;
- verifies all source SVG files exist locally;
- verifies SVG source is local/no scripts/no external resource URL;
- validates output naming/timing/dimensions;
- prints deterministic JSON export plan;
- does **not** import `sharp` or `gifenc`;
- writes no GIF bytes.

## Exporter outputs

Successful dry run prints one JSON object containing:
- manifest path;
- presentationId;
- sequenceKey;
- candidateKey;
- ordered frame paths;
- source loop duration;
- normalized/export frame delay;
- target width/height;
- palette size;
- loop count;
- deterministic output path;
- static fallback;
- dryRun status.

Successful real export additionally records:
- output path;
- byte size;
- SHA-256 of GIF bytes;
- frame count;
- dimensions;
- encoded frame delay;
- loop count.

## Deterministic encoding expectations

With:
- identical SVG source bytes;
- identical exact dependency versions;
- identical Node/platform dependency graph;
- identical width/height;
- identical palette size;
- identical frame delay;
- identical frame order;
- identical loop count;

the exporter must perform:
1. SVG rasterization in manifest order;
2. fixed 640×360-style dimensions or supplied exact dimensions;
3. sRGB RGBA conversion;
4. one deterministic global palette derived from ordered frame pixels;
5. deterministic nearest-palette mapping;
6. ordered GIF frame writes;
7. explicit delay;
8. explicit loop behavior.

No timestamps, random seeds or filesystem-order enumeration may enter output generation.

## Source validation

Every frame must:
- begin under `assets/presentation-frames/`;
- end in `.svg`;
- physically exist;
- contain SVG root markup;
- contain the exact manifest `data-presentation-id`;
- contain the exact manifest `data-sequence-id`;
- contain no `<script>`;
- contain no external `href/src` URL.

The script reads the ordered frame array from the manifest; it must not discover frames by directory order or glob order.

## Hard failures / nonzero exit

The CLI exits nonzero for:
- unknown argument;
- missing required presentationId/sequence;
- unreadable/invalid manifest;
- unknown presentationId;
- sequence not owned by presentationId;
- invalid candidate metadata;
- missing frame;
- external/absolute/traversal source path;
- invalid SVG;
- external resource URL/script inside SVG;
- invalid dimensions;
- delay outside contract or not centisecond-exact;
- invalid palette;
- output outside `assets/gif/`;
- missing exporter dependencies during a real export;
- write failure.

A failure must never leave a claimed successful candidate mapping.

## Network / external media boundary

The exporter:
- accepts no HTTP(S) frame input;
- performs no fetch;
- performs no URL download;
- consumes only project-owned repository-local source SVGs.

## Gameplay boundary

CLI inputs/outputs contain no:
- reward;
- effect;
- eligibility;
- gameplay RNG;
- Save mutation;
- gameplay duration control.

GIF loop time is presentation-only.
