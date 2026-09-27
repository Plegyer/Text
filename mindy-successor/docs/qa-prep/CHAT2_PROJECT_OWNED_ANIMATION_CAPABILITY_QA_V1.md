# Chat2 project-owned animation capability QA v1

Status: COMPLETE / FRAME_SOURCE_GREEN / GIF_EXPORT_BLOCKED

Reviewed Chat 2 items:
`232–243`.

Current worker decision:
`NEEDS_SMALL_DEV_DEPENDENCY`.

## Repository export capability

Chat 2 correctly finds that the current declared repo/CI toolchain can:
- author project-owned SVG frames;
- copy finished assets into build output;
- validate real GIF bytes after they exist;
- validate deterministic 3–5 candidate pools.

It cannot reproducibly:
- rasterize SVG frames;
- encode animated GIF bytes
using only the currently declared dependency/toolchain.

No GIF encoder/rasterizer dependency is declared in the prototype package.

No reproducible GIF export step exists in CI.

## Dependency boundary

No dependency was added.

This is correct.

A future exporter requires explicit Lead approval because it changes:
- dev dependency/tool surface;
- supply-chain/security review surface;
- version-pinning/reproducibility contract.

Undeclared system ImageMagick/ffmpeg or developer-local Python is not accepted as reproducible project tooling.

## No external downloaded GIFs

Actual project-owned GIF files created:
`0`.

No external downloaded GIF is substituted.

No `assets/gif/` production directory exists in the worker state.

## Project-owned source frames

Chat 2 created 8 actual original SVG frame files under:
`assets/presentation-frames/`.

Sequences:
1. Lumber spring work loop:
   - semantic ID `job/lumber/shift/spring/default`;
   - 4 frames;
   - declared loop duration 2400 ms.
2. School Arcana rune loop:
   - semantic ID `school/arcana/lesson/default`;
   - 4 frames;
   - declared loop duration 3000 ms.

Frame regression verifies:
- every source exists;
- valid SVG structure;
- same 1200×675 viewBox;
- exact semantic metadata;
- no external URLs/scripts;
- no gameplay metadata.

## No fake GIF files

Item 238 status:
`BLOCKED_BY_GIF_EXPORT`.

The worker explicitly creates no fake GIF header/container.

Technical QA records:
- actual GIF count: 0.

Blocked-state regression requires:
- no GIF files under `assets/gif`;
- no fake candidate strings;
- source frames remain separate from production GIF claims.

## Pool readiness

Item 240:
`first-project-owned-gif-pool-v1.json`.

Status:
`BLOCKED_BY_GIF_EXPORT`.

Target semantic ID:
`job/lumber/shift/spring/default`.

Actual candidates:
`0`.

Production patch:
- slots: empty;
- media: empty.

Current static fallback preserved:
`assets/presentation/career-lumber-shift-spring.svg`.

## 3–5 candidate rule

Production multi-GIF acceptance requires:
`3–5` actual compatible GIF candidates for one current semantic ID.

Current actual count:
`0`.

Therefore no production pool claim is allowed.

## Reproducibility

Current frame sources are reproducible as checked-in project assets.

GIF export is not reproducible until an approved, versioned exporter is integrated.

## Verdict

- project-owned frame authoring: `GREEN`;
- real GIF export: `BLOCKED_BY_EXPORT`;
- external GIF use: `NONE`;
- fake GIF use: `NONE`;
- dependency change: `NONE`;
- production GIF pool: `NONE`.

Do not activate animation from these sources until the exporter gap is approved and at least 3 real compatible GIFs exist.
