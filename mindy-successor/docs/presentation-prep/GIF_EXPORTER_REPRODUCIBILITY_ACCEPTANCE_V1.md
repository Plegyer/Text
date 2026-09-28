# GIF Exporter Reproducibility Acceptance v1

Purpose:
define what counts as reproducible project-owned GIF export after Lead approves the proposed exact dev-only exporter dependencies.

Proposed dependency baseline:
- `sharp@0.35.4`;
- `gifenc@1.0.3`;
- project Node baseline >=22.18.0.

## Reproducibility input tuple

An export is defined by the tuple:

1. exact source-manifest JSON bytes;
2. exact ordered source SVG frame bytes;
3. exact sequence key;
4. exact semantic presentationId;
5. exact candidate key;
6. exact width/height;
7. exact normalized per-frame delay;
8. exact palette size/quantization mode;
9. exact loop count;
10. exact exporter script revision;
11. exact dependency versions/lockfile;
12. exact Node major/minor baseline and platform architecture when byte identity is evaluated.

No timestamp, random seed, locale, current date, directory enumeration order or network content may participate.

## Level A — byte-identical acceptance

Required on the same pinned execution environment:
- same operating-system family/architecture;
- same Node version;
- same `package-lock.json`;
- same exporter script commit;
- same source bytes and export arguments.

Two independent exports must produce:
- identical file length;
- identical SHA-256;
- byte-for-byte identical GIF bytes.

This is the preferred CI/dev reproducibility acceptance.

## Level B — deterministic-equivalent acceptance

Cross-platform/native rasterization can theoretically produce small pixel-level differences even when source/dependencies are pinned.

If Lead chooses to support multiple platforms and byte identity is not achievable across them, cross-platform outputs may be accepted only as **deterministic-equivalent** when all of the following match exactly:

- GIF signature family;
- width;
- height;
- frame count;
- ordered frame delays;
- total loop duration;
- repeat/loop setting;
- candidate key / semantic identity;
- source frame SHA-256 set/order;
- no external resources;
- file-size budget.

Additionally:
- each individual platform must still be byte-identical across repeated runs on that same pinned platform;
- any known cross-platform byte difference must be documented rather than silently ignored.

## First-wave expected metadata

Default first-wave export:
- 640×360 px;
- 4 frames;
- 256-color maximum palette;
- infinite loop;
- normalized frame delay from `ANIMATION_TIMING_NORMALIZATION_V1.md`.

## Recording requirements

Every accepted exported candidate should record:
- candidate key;
- semantic presentationId;
- source sequence key;
- source frame SHA-256 values;
- exporter script commit;
- dependency lockfile commit;
- Node version;
- platform/architecture;
- GIF SHA-256;
- byte size;
- width/height;
- frame count;
- per-frame delay;
- total duration;
- loop count.

This record may live in the media provenance/replacement ledger or a dedicated generated export receipt.

## Non-determinism rejection

Reject an exporter/output if identical same-platform input produces:
- different SHA-256;
- different dimensions;
- different frame count/order;
- different delay metadata;
- different loop count;
- variable output caused by timestamps/randomness.

## Source mutation rule

Exporter must never rewrite source frame SVG files or their metadata.

Timing normalization is supplied as export input and remains separate from source-history timing metadata.

## Locale/gameplay invariants

Reproducibility is independent of:
- RU vs EN locale;
- gameplay RNG;
- reward/effect values;
- Save data;
- frame playback time.

Locale switch must never regenerate or reroll a candidate.

## Acceptance command shape

After dependency approval, Lead may use an equivalent deterministic check:

```bash
node tools/export-project-owned-gif.mjs ... --output /tmp/a.gif
node tools/export-project-owned-gif.mjs ... --output /tmp/b.gif
sha256sum /tmp/a.gif /tmp/b.gif
```

For repository-relative enforcement, CI may instead export twice into two approved temporary repository-local output paths and compare them before cleanup.

## Acceptance status before dependency installation

Contract defined:
**YES**.

Byte-identity verified:
**NO — no approved exporter dependencies/GIF bytes yet**.

Production animation claim:
**NO**.
