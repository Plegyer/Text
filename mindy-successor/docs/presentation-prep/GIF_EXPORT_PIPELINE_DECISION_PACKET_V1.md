# GIF Export Pipeline Decision Packet v1

Source audit:
`docs/presentation-prep/PROJECT_OWNED_GIF_PRODUCTION_CAPABILITY_AUDIT_V1.md`.

## Classification

**NEEDS_SMALL_DEV_DEPENDENCY**

The current repository has enough presentation infrastructure to author SVG frames, distribute finished GIF files, and validate finished GIF files, but it has no declared reproducible SVG rasterizer + animated-GIF encoder.

## Smallest viable project-owned path

Target pipeline:

1. project-owned SVG frame sequence under `assets/presentation-frames/`;
2. deterministic local rasterization at a fixed output size;
3. deterministic frame order and frame delay;
4. animated GIF encoding with infinite loop;
5. output under `assets/gif/`;
6. technical preflight;
7. 3–5 candidate pool mapping;
8. build/runtime regression.

## Required properties of any approved exporter

The eventual tooling must:
- run locally and in CI/dev with locked version(s);
- use only repository-local project-owned frame files;
- avoid network access during export;
- support fixed dimensions;
- support frame delay / loop control;
- create genuine GIF87a/GIF89a bytes;
- preserve transparent/flat-color vector readability acceptably;
- not require gameplay/runtime code changes.

## Dependency decision

No concrete dependency is selected in this packet.

Reason:
adding an image-rendering/GIF-encoding dependency changes the dev dependency and supply-chain surface. The queue explicitly reserves that choice for Product/Lead approval when required.

## Alternatives considered

### Undeclared system ImageMagick or ffmpeg

Rejected as the current production path because it is not pinned or installed by project setup/CI.

### Developer-local Python/Pillow or imageio

Rejected as the current production path because the repo has no locked Python environment or dependency manifest.

### Hand-written GIF encoder in project code

Rejected as disproportionate and security/maintenance-unfriendly for a presentation-production utility.

### External downloaded/hosted GIFs

Rejected for this queue. The target is project-owned animation generated from project-owned source art.

## Export status for item 238

Because the classification is **NEEDS_SMALL_DEV_DEPENDENCY**, item 238 must use its blocker path unless Lead adds/approves a reproducible exporter before that item is executed.

Frame-source production can continue safely now because SVG frames are independent of the later encoding choice.
