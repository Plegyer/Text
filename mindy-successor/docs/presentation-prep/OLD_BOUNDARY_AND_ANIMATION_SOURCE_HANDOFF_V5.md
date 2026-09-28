# Old-Boundary and Animation Source Handoff v5

Scope: corrected queue items **280–290** appended after item 315.

Current-main baseline observed during this work:
`54131488c65302f81b3001abaaa345d21f0281e2`.

Worker branch:
`chat2/presentation-replacement-next`.

## SAFE_STATIC_READY

New corrected old-boundary static source:

`prior-work/astra/prototype-m3.2/assets/presentation/forest-route-old-boundary-safe-v1.svg`.

Semantic target:

`activity/forest/route/old-boundary`.

Allowed visual facts:
- moss-covered/weathered boundary stones;
- old marks;
- narrow stony path;
- low vegetation.

Explicitly excluded:
- constructed entrance/barrier;
- token/key;
- Hunter;
- challenge;
- reward;
- result;
- magic cue.

Validation:

`prior-work/astra/prototype-m3.2/tests/forest-route-old-boundary-safe-static-v1.test.ts`.

Status:
**SAFE_STATIC_READY**.

## ANIMATION_SOURCE_READY — old boundary

Corrected compatible source sequences:

- `forest-route-old-boundary-safe-loop-a`;
- `forest-route-old-boundary-safe-loop-b`;
- `forest-route-old-boundary-safe-loop-c`.

Each:
- 4 ordered SVG frames;
- exact `activity/forest/route/old-boundary` metadata;
- local project-owned source;
- no script/external resource;
- no gameplay/RNG/Save metadata;
- subtle leaves/light/grass/mist/camera drift only.

Compatibility ledger:

`docs/presentation-prep/OLD_BOUNDARY_SAFE_SOURCE_COMPATIBILITY_LEDGER_V1.md`.

Status:
**ANIMATION_SOURCE_READY**.

## Route source manifest

File:

`prior-work/astra/prototype-m3.2/content/presentation-drafts/forest-route-project-owned-source-manifest-v1.json`.

Records:
- current shipped neutral route/default;
- current shipped logging-road static;
- corrected safe old-boundary static;
- current logging-road animation source sequences;
- prior old-boundary sequences as source history;
- corrected safe old-boundary sequences as preferred source;
- zero GIF claims.

## ANIMATION_SOURCE_READY — Merchant spring

Semantic:

`job/merchant/shift/spring/default`.

Three new compatible project-owned sequences:

- `merchant-spring-market-loop-a`;
- `merchant-spring-market-loop-b`;
- `merchant-spring-market-loop-c`.

Each:
- 4 SVG frames;
- market stall/goods/cloth/foliage micro-motion;
- no reward/result/price/gameplay implication;
- static fallback remains:
  `assets/presentation/career-merchant-shift-spring.svg`.

Status:
**ANIMATION_SOURCE_READY**.

## Validator v5

File:

`prior-work/astra/prototype-m3.2/tests/project-owned-animation-frames-v5.test.ts`.

Scope:
- prior v3 animation source manifest: 24 sequences / 96 frames;
- corrected old-boundary safe sources: 3 sequences / 12 frames;
- Merchant spring sources: 3 sequences / 12 frames.

Total validated source target:
- 30 sequences;
- 120 SVG frames;
- 10 semantic identities with >=3 compatible sequences.

Validation includes:
- exact semantic identity;
- 4 ordered frames;
- stable 1200×675 viewBox;
- source-frame distinctness;
- local SVG only;
- no external resources/scripts;
- no gameplay/RNG/Save metadata.

## Exact selective-copy files

### Corrected old-boundary static
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-route-old-boundary-safe-v1.svg`
- `prior-work/astra/prototype-m3.2/tests/forest-route-old-boundary-safe-static-v1.test.ts`

### Corrected old-boundary animation frames
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/forest-route-old-boundary-safe-loop-a-frame-01.svg` through `-04.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/forest-route-old-boundary-safe-loop-b-frame-01.svg` through `-04.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/forest-route-old-boundary-safe-loop-c-frame-01.svg` through `-04.svg`

### Route source metadata
- `docs/presentation-prep/OLD_BOUNDARY_SAFE_SOURCE_COMPATIBILITY_LEDGER_V1.md`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/forest-route-project-owned-source-manifest-v1.json`

### Merchant spring frames
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/merchant-spring-market-loop-a-frame-01.svg` through `-04.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/merchant-spring-market-loop-b-frame-01.svg` through `-04.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/merchant-spring-market-loop-c-frame-01.svg` through `-04.svg`

### Cross-source validation
- `prior-work/astra/prototype-m3.2/tests/project-owned-animation-frames-v5.test.ts`
- this handoff.

## GIF_EXPORT_BLOCKED

Actual GIF bytes created by corrected items 280–291:
**0**.

Production GIF pools:
**0**.

Exporter dependency installation:
**not performed by Chat 2**.

The already proposed exporter dependencies remain Lead-owned.

Status:
**GIF_EXPORT_BLOCKED**.

## PRODUCT_OPEN_EXCLUDED

No corrected item changes:
- Forest Activity route conditions;
- route gameplay selection;
- Hunter/token/challenge mechanics;
- rewards/effects;
- Save state;
- gameplay RNG;
- shared presentation runtime/schema/UI.

The corrected old-boundary semantic remains presentation-source preparation until Lead/Chat3 owns activation on the exact route-specific seam.

Status:
**PRODUCT_OPEN_EXCLUDED**.

## Final state

Corrected old-boundary static:
**SAFE_STATIC_READY**.

Corrected old-boundary three-source group:
**ANIMATION_SOURCE_READY**.

Merchant spring three-source group:
**ANIMATION_SOURCE_READY**.

Actual GIF files:
**0**.

Gameplay/runtime/schema/UI changes:
**0**.
