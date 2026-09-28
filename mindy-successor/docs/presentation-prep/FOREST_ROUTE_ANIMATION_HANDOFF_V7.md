# Forest Route Animation Handoff v7

Scope: Chat 2 items **304–314**.

Current-main semantic baseline used for this queue:
`52ddc76148e33836d3161b63bf4c25ffb5c39d02`.

Worker branch:
`chat2/presentation-replacement-next`.

## LOGGING_SOURCE_READY

Semantic presentation ID:

`activity/forest/route/logging-road`.

Exactly three project-owned source sequences now exist:

- `forest-route-logging-road-loop-a`
- `forest-route-logging-road-loop-b`
- `forest-route-logging-road-loop-c`

Each sequence:
- contains 4 ordered SVG frames;
- uses `viewBox="0 0 1200 675"`;
- is repository-local;
- embeds exact semantic/sequence/frame metadata;
- contains no script/external URL;
- contains no gameplay/RNG/Save metadata.

Frame files:

- `assets/presentation-frames/forest-route-logging-road-loop-a-frame-01.svg` through `-04.svg`
- `assets/presentation-frames/forest-route-logging-road-loop-b-frame-01.svg` through `-04.svg`
- `assets/presentation-frames/forest-route-logging-road-loop-c-frame-01.svg` through `-04.svg`

Route-specific static fallback:

`assets/presentation/forest-route-logging-road-v2.svg`.

Shared fallback presentation ID:

`activity/forest/route/default`.

Status:
**LOGGING_SOURCE_READY**.

## OLD_BOUNDARY_SOURCE_READY

Semantic presentation ID:

`activity/forest/route/old-boundary`.

Exactly three project-owned source sequences now exist:

- `forest-route-old-boundary-loop-a`
- `forest-route-old-boundary-loop-b`
- `forest-route-old-boundary-loop-c`

Each sequence:
- contains 4 ordered SVG frames;
- uses the exact route-specific semantic ID;
- remains local/project-owned;
- contains no script/external URL;
- contains no gameplay/RNG/Save metadata;
- contains no Hunter/token/key/gate/arch/challenge/reward/result wording in source metadata/text.

Frame files:

- `assets/presentation-frames/forest-route-old-boundary-loop-a-frame-01.svg` through `-04.svg`
- `assets/presentation-frames/forest-route-old-boundary-loop-b-frame-01.svg` through `-04.svg`
- `assets/presentation-frames/forest-route-old-boundary-loop-c-frame-01.svg` through `-04.svg`

Route-specific static fallback:

`assets/presentation/forest-route-old-boundary-v3.svg`.

Shared fallback presentation ID:

`activity/forest/route/default`.

Status:
**OLD_BOUNDARY_SOURCE_READY**.

## THREE_CANDIDATES_EACH

### Logging road candidate metadata

File:

`prior-work/astra/prototype-m3.2/content/presentation-drafts/forest-logging-road-animation-candidates-v1.json`.

Candidate keys:

- `forest-logging-road-loop-a`
- `forest-logging-road-loop-b`
- `forest-logging-road-loop-c`

Normalized future export timing:
- 2600 ms total;
- 650 ms per frame;
- 4 frames;
- infinite loop;
- 640×360 target;
- palette ceiling 256.

All `gifPath` values:
`null`.

### Old-boundary candidate metadata

File:

`prior-work/astra/prototype-m3.2/content/presentation-drafts/forest-old-boundary-animation-candidates-v1.json`.

Candidate keys:

- `forest-old-boundary-loop-a`
- `forest-old-boundary-loop-b`
- `forest-old-boundary-loop-c`

Normalized future export timing:
- 3200 ms total;
- 800 ms per frame;
- 4 frames;
- infinite loop;
- 640×360 target;
- palette ceiling 256.

All `gifPath` values:
`null`.

Status:
**THREE_CANDIDATES_EACH — SOURCE ONLY**.

## Consolidated source manifest

File:

`prior-work/astra/prototype-m3.2/content/presentation-drafts/forest-route-animation-source-manifest-v1.json`.

Records:
- 2 route identities;
- 6 source sequences;
- 24 SVG frames;
- 3 candidates per route;
- exact semantic presentation IDs;
- route-specific static fallbacks;
- shared default fallback;
- normalized export timing;
- zero actual GIF paths.

Status:
**EXPORT_READY_SOURCE_ONLY_NO_PRODUCTION_GIF**.

## Frame validator

File:

`prior-work/astra/prototype-m3.2/tests/forest-route-animation-frames-v1.test.ts`.

Validates:
- exactly 3 source sequences per route;
- exactly 4 frames per sequence;
- exactly 24 unique frame paths;
- stable 1200×675 viewBox;
- local SVG-only sources;
- no scripts/external resources;
- exact route-specific semantic IDs;
- source frame distinctness;
- no gameplay/RNG/Save metadata;
- old-boundary forbidden wording absent from source metadata/text.

## Export dry-run plan

File:

`docs/presentation-prep/FOREST_ROUTE_EXPORTER_DRY_RUN_PLAN_V1.md`.

Both pools are ready for dependency-free exporter `--dry-run` validation using:

`tools/export-project-owned-gif.mjs`.

Future intended GIF paths after exporter approval:

### Logging road
- `assets/gif/forest/routes/logging-road-loop-a.gif`
- `assets/gif/forest/routes/logging-road-loop-b.gif`
- `assets/gif/forest/routes/logging-road-loop-c.gif`

### Old boundary
- `assets/gif/forest/routes/old-boundary-loop-a.gif`
- `assets/gif/forest/routes/old-boundary-loop-b.gif`
- `assets/gif/forest/routes/old-boundary-loop-c.gif`

These are future intended outputs only.
They are not present or claimed by source metadata.

## EXPORTER_DEPENDENCY_STILL_LEAD_OWNED

The already-proposed dev-only exporter still requires Lead approval.

Recommended exact packages remain:

- `sharp@0.35.4`;
- `gifenc@1.0.3`.

Chat 2 did not modify:
- `package.json`;
- `package-lock.json`;
- CI dependency setup.

No package change is authorized by this handoff.

Status:
**EXPORTER_DEPENDENCY_STILL_LEAD_OWNED**.

## NO_PRODUCTION_GIF_YET

Actual route-specific GIF files:
**0**.

Actual PR42 route-specific GIF pools:
**0**.

Root production GIF mappings:
**0 added by items 304–315**.

Production animation coverage:
**NOT CLAIMED**.

Status:
**NO_PRODUCTION_GIF_YET**.

## PRODUCT_OPEN_EXCLUDED

Items 304–315 do not modify:
- Forest Activity route selection;
- route entry conditions;
- item capability checks;
- progress/endurance;
- rewards/effects;
- result mechanics;
- Hunter/token/challenge content;
- Save state;
- gameplay RNG;
- shared presentation runtime/schema/UI.

Route-specific source IDs remain presentation-source preparation.

Activation must occur only where Lead/Chat3 owns the exact route-specific presentation seam.

Status:
**PRODUCT_OPEN_EXCLUDED**.

## Exact selective-copy source files

### Logging road frames
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/forest-route-logging-road-loop-a-frame-01.svg`
- `...-02.svg`
- `...-03.svg`
- `...-04.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/forest-route-logging-road-loop-b-frame-01.svg`
- `...-02.svg`
- `...-03.svg`
- `...-04.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/forest-route-logging-road-loop-c-frame-01.svg`
- `...-02.svg`
- `...-03.svg`
- `...-04.svg`

### Old-boundary frames
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/forest-route-old-boundary-loop-a-frame-01.svg`
- `...-02.svg`
- `...-03.svg`
- `...-04.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/forest-route-old-boundary-loop-b-frame-01.svg`
- `...-02.svg`
- `...-03.svg`
- `...-04.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/forest-route-old-boundary-loop-c-frame-01.svg`
- `...-02.svg`
- `...-03.svg`
- `...-04.svg`

### Validation/data/docs
- `prior-work/astra/prototype-m3.2/tests/forest-route-animation-frames-v1.test.ts`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/forest-logging-road-animation-candidates-v1.json`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/forest-old-boundary-animation-candidates-v1.json`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/forest-route-animation-source-manifest-v1.json`
- `docs/presentation-prep/FOREST_ROUTE_EXPORTER_DRY_RUN_PLAN_V1.md`
- this handoff.

## Required static prerequisites

For route-specific animation export/activation, retain the static work from items 292–303:

- `assets/presentation/forest-route-logging-road-v2.svg`;
- `assets/presentation/forest-route-old-boundary-v3.svg`;
- route-specific static localization/slot candidates;
- shared `activity/forest/route/default` fallback.

## Final state

Logging source:
**LOGGING_SOURCE_READY**.

Old-boundary source:
**OLD_BOUNDARY_SOURCE_READY**.

Source candidates:
**3 + 3**.

Total source sequences:
**6**.

Total source frames:
**24**.

Exporter dependencies:
**LEAD OWNED / NOT INSTALLED BY CHAT 2**.

Actual GIF bytes:
**0**.

Production GIF pool activation:
**NO**.

Gameplay/runtime/schema/UI changes:
**0**.
