# Forest Route Exporter Dry-Run Plan v1

Current-main semantic baseline used for source validation:
`52ddc76148e33836d3161b63bf4c25ffb5c39d02`.

Exporter source already prepared by Chat 2:
`prior-work/astra/prototype-m3.2/tools/export-project-owned-gif.mjs`.

Route source manifest:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/forest-route-animation-source-manifest-v1.json`.

This plan does not modify package/dependency files and does not claim production GIF output.

## Precondition

Real export remains blocked until Lead approves the exact dev-only exporter dependency integration already proposed elsewhere.

Dependency-free `--dry-run` validation may be used before that approval.

## Logging-road pool

Semantic presentation ID:

`activity/forest/route/logging-road`.

Source sequences:

- `forest-route-logging-road-loop-a`
- `forest-route-logging-road-loop-b`
- `forest-route-logging-road-loop-c`

Intended candidate keys:

- `forest-logging-road-loop-a`
- `forest-logging-road-loop-b`
- `forest-logging-road-loop-c`

Normalized export timing:
- 2600 ms loop;
- 650 ms per frame;
- 4 frames;
- loop count 0 / infinite;
- 640×360;
- palette ceiling 256.

### Dry-run commands

From the prototype root:

```bash
node tools/export-project-owned-gif.mjs \
  --manifest content/presentation-drafts/forest-route-animation-source-manifest-v1.json \
  --presentation-id activity/forest/route/logging-road \
  --sequence forest-route-logging-road-loop-a \
  --dry-run
```

Repeat with:
- `forest-route-logging-road-loop-b`;
- `forest-route-logging-road-loop-c`.

Dry-run acceptance:
- exact semantic ID resolves;
- exact sequence resolves;
- 4 ordered local SVG frames exist;
- static fallback exists;
- output path is deterministic and under `assets/gif/`;
- normalized 650 ms delay is used;
- no dependency import/write occurs.

## Old-boundary pool

Semantic presentation ID:

`activity/forest/route/old-boundary`.

Source sequences:

- `forest-route-old-boundary-loop-a`
- `forest-route-old-boundary-loop-b`
- `forest-route-old-boundary-loop-c`

Intended candidate keys:

- `forest-old-boundary-loop-a`
- `forest-old-boundary-loop-b`
- `forest-old-boundary-loop-c`

Normalized export timing:
- 3200 ms loop;
- 800 ms per frame;
- 4 frames;
- loop count 0 / infinite;
- 640×360;
- palette ceiling 256.

### Dry-run commands

```bash
node tools/export-project-owned-gif.mjs \
  --manifest content/presentation-drafts/forest-route-animation-source-manifest-v1.json \
  --presentation-id activity/forest/route/old-boundary \
  --sequence forest-route-old-boundary-loop-a \
  --dry-run
```

Repeat with:
- `forest-route-old-boundary-loop-b`;
- `forest-route-old-boundary-loop-c`.

Dry-run acceptance:
- exact old-boundary semantic ID resolves;
- exact sequence resolves;
- 4 ordered local SVG frames exist;
- no source contains external resource/script;
- normalized 800 ms delay is used;
- no production GIF path exists in source metadata.

## Future real export path after dependency approval

Recommended intended outputs:

### Logging road

- `assets/gif/forest/routes/logging-road-loop-a.gif`
- `assets/gif/forest/routes/logging-road-loop-b.gif`
- `assets/gif/forest/routes/logging-road-loop-c.gif`

### Old boundary

- `assets/gif/forest/routes/old-boundary-loop-a.gif`
- `assets/gif/forest/routes/old-boundary-loop-b.gif`
- `assets/gif/forest/routes/old-boundary-loop-c.gif`

Real export commands should pass explicit `--output` for these reviewed paths.

## Real-output validation after export

For each future GIF:

1. validate local `assets/gif/` path;
2. require GIF87a/GIF89a signature;
3. require 640×360 dimensions;
4. require exactly 4 frames;
5. require normalized frame delay;
6. require normalized total duration;
7. require infinite loop metadata;
8. enforce technical byte budget;
9. record project-owned provenance;
10. compare repeated same-environment export under reproducibility acceptance.

## Pool activation acceptance

A route-specific PR42 pool must not be activated until:
- all 3 actual GIF files exist;
- all 3 pass technical validation;
- RU+EN candidate alt/caption localization exists;
- candidate keys remain locale-neutral;
- route-specific static fallback remains available;
- fallback chain to `activity/forest/route/default` remains intact;
- route selection/gameplay RNG/Save state remain unaffected;
- exact-head project checks/CI pass.

## Product boundary

Dry-run/export preparation does not authorize:
- package dependency changes;
- root presentation activation;
- gameplay route plumbing;
- Activity mechanics changes;
- Hunter/token/challenge semantics;
- production animation coverage claims.

Current result:
- logging-road source pool: **DRY-RUN READY**;
- old-boundary source pool: **DRY-RUN READY**;
- actual GIF bytes: **0**.
