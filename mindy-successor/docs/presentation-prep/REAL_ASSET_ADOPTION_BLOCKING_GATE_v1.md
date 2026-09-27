# Real Asset Adoption Blocking Gate v1

Status: **MANDATORY PRODUCTION GATE**

This gate applies before Lead integrates any production multi-GIF pool.

## Hard stop rule

If the repository contains **0 real GIF files**, production multi-GIF pool integration is blocked.

A placeholder path, external URL, data-URL test value, planned filename, or producer brief is not a real asset.

## Required gate

A production pool is eligible for integration only when every condition below is true.

| Gate | Requirement | Evidence |
| --- | --- | --- |
| G1 — real files | Pool contains **3–5 real GIF repository files**. | Git tree + file preflight. |
| G2 — source/build path | Every GIF is under prototype source `assets/`, and normal build copies it to `dist/assets/`. | Build-path audit + build output check. |
| G3 — signature/path preflight | Every candidate exists, uses an internal relative path, passes GIF87a/GIF89a signature validation, has no placeholder/TODO marker, and candidate keys are unique. | `tools/media-asset-preflight.mjs` green. |
| G4 — semantic target | Every target `presentationId` exists on the exact current-main production catalog. | Current-main semantic-slot check/test. |
| G5 — RU+EN alt | Every candidate has complete RU and EN alt localization keys/values. | Localization bundle/test. |
| G6 — static fallback | A real SVG/PNG/JPEG/WebP fallback exists and resolves when animation is disabled or GIF loading fails. | Static fallback inventory + presentation test. |
| G7 — locale stability | Switching RU↔EN keeps the same semantic ID and selected candidate for the same occurrence. | Locale-switch + PR42 selector regression. |
| G8 — presentation-only payload | Pool contains no conditions, effects, rewards, eligibility, gameplay RNG, Energy, save-state or outcome fields. | Schema/contract test. |
| G9 — gameplay invariance | Candidate selection/failure cannot choose or modify gameplay event/outcome/choice/reward/timing. | Resolver/flow regression. |
| G10 — provenance | Source/provenance and permission/license note are recorded and approved for production use. | Media provenance ledger. |
| G11 — rollback | Previous/static mapping is recorded and can be restored without changing gameplay identity. | Replacement ledger/rollback evidence. |
| G12 — exact-head CI | Exact integration head passes the normal project check/CI after real files and mappings are present. | GitHub exact-head workflow result. |

All twelve gates are conjunctive. Passing eleven does not make the pool production-ready.

## Preflight utility

Use:

`prior-work/astra/prototype-m3.2/tools/media-asset-preflight.mjs`

Expected checks include:
- repository file exists;
- internal `assets/` path only;
- GIF byte signature is genuine;
- no placeholder/TODO path/source note;
- unique candidate keys within the semantic pool;
- `PRODUCTION_READY` pool has 3–5 candidates;
- static fallback file resolves.

A green preflight proves technical file intake only. It does not prove semantic, localization, provenance or CI acceptance by itself.

## Build/runtime verification

Current build path is:

source:
`assets/<subpath>.gif`

-> build copy:
`dist/assets/<subpath>.gif`

-> runtime URL:
`assets/<subpath>.gif`

Do not activate an asset copied only into `dist/`; source `assets/` is the durable repository input.

## Semantic/current-main verification

Before mapping a pool:
1. re-read exact current main;
2. confirm target semantic `presentationId` still exists;
3. confirm the gameplay/content identity was not superseded;
4. confirm reuse does not merge separate semantic IDs;
5. reject stale worker-branch assumptions rather than guessing a replacement identity.

## RU + EN verification

The media file is locale-neutral.

Required:
- RU alt exists;
- EN alt exists;
- localized caption/text, if present, remains text-only;
- locale is not included in candidate key, media path, pool version or occurrence key;
- locale switch does not reroll candidate selection.

## Static fallback verification

Animations-off must never depend on a GIF.

Before activation:
- verify the static path is a real production repository file;
- verify renderer selects static/catalog media with animations disabled;
- verify a broken GIF falls through without changing gameplay;
- verify fallback chain terminates safely.

## Gameplay-field rejection

A production media-pool patch must not contain:
- conditions;
- effects;
- rewards;
- cost/Energy;
- eligibility;
- gameplay RNG;
- outcome selectors;
- event-choice selectors;
- save-state ownership;
- animation timing that controls gameplay.

The pool may contain presentation-only ordering/weight metadata already supported by PR42.

## Exact-head integration sequence

Recommended Lead sequence:

1. branch from exact current `main`;
2. add real GIF files and provenance records;
3. add RU+EN alt localization;
4. add reviewed semantic pool mapping;
5. run `media-asset-preflight.mjs`;
6. run targeted presentation/localization tests;
7. run full `npm run check`;
8. require exact-head GitHub CI success;
9. only then classify the pool as production-active.

## Current gate state

At the current audited baseline:
- real GIF files: **0**;
- G1: **FAIL / BLOCKING**;
- production multi-GIF pools eligible for integration: **0**.

The shipped PR42 runtime remains ready. The gate blocks only false production activation without real assets; it does not block static-backed gameplay.
