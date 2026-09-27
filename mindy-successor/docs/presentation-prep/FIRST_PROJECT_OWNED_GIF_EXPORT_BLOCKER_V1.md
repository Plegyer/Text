# First Project-Owned GIF Export Blocker v1

Status: **BLOCKED_BY_GIF_EXPORT**

Item 233 classification:
**NEEDS_SMALL_DEV_DEPENDENCY**.

Exact blocker:
the repository has no declared, reproducible SVG rasterizer + animated-GIF encoder in its current Node/CI toolchain.

Consequences:
- item 236 frame SVGs are valid project-owned source material;
- no actual GIF bytes are exported by item 238;
- no file is added under `assets/gif/`;
- no external downloaded media is substituted;
- no fake GIF header/container is created.

Unblock condition:
Lead approves and integrates a reproducible development-only export toolchain with locked version(s), local frame input, fixed dimensions/frame delay/loop settings, and CI/dev reproducibility.

Until then, static SVG fallbacks remain production-safe.
