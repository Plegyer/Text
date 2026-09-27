# Static media build-distribution QA v2

Status: COMPLETE / GREEN_CONTRACT / EXACT_HEAD_CI_REQUIRED

Reviewed Lead head:
`5ea2a18e214fca6d656a8751ff5c2dd1f4abce31`.

## Source assets

Lead branch contains exactly 21 project-owned SVG files under:
`assets/presentation/`.

All 21 blobs match the reviewed Chat 2 source set.

## Build path

Current build copies:
`assets -> dist/assets`
recursively.

Therefore source:
`assets/presentation/<file>.svg`

must ship as:
`dist/assets/presentation/<file>.svg`.

## Root presentation resolution

Lead activates 39 root static slot overrides.

Every override:
- uses local `assets/presentation/*.svg`;
- refers to one of the 21 copied files;
- uses an existing current semantic presentationId.

No root presentation override points to:
- remote URL;
- staging path;
- missing proposed file;
- data URL.

## Byte-preservation regression

Lead adds `project-owned-static-media-production.test.ts`.

For every activated source it requires:
- source file exists;
- built file exists under `dist/<source>`;
- source is SVG;
- built file bytes equal source bytes.

This is the correct distribution contract.

## CI note

No GitHub Actions run was attached to the raw Lead branch head at the time this item was first audited.

Therefore the build/distribution implementation is:
`GREEN_CONTRACT`

but production merge still requires exact PR-head CI proving:
- build runs before tests;
- all 21 dist files exist;
- byte equality passes;
- full check passes.

## Verdict

`GREEN_CONTRACT / EXACT_HEAD_CI_REQUIRED`.
