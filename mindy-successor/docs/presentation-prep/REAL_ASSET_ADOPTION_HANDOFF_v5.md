# Real Asset Adoption Handoff v5

Baseline audited against current `main`:
`23a8798f77c42e84a7540d71fdffd69d9db9fbfd`.

Scope: Chat 2 items **151–158**, presentation/media only.

## Executive status

PR42 multi-GIF runtime is shipped, but the repository currently contains **0 real `.gif` files**.

Therefore:
- production-ready real multi-GIF pools: **0**;
- no staged placeholder pool may be called shipped;
- existing static SVG/text fallback remains the production-safe presentation path;
- no runtime, gameplay schema, Save migration or UI change is required to begin real asset adoption once GIF files arrive.

## What can ship now

### Existing production behavior

Safe today:
- all existing static SVG fallbacks;
- RU/EN runtime/localization behavior already on main;
- PR42 deterministic pool support;
- PR43 Forest bilingual result/reaction content.

### New artifacts from this wave

The real-asset patch is intentionally a no-op:

`prior-work/astra/prototype-m3.2/content/presentation-drafts/real-asset-only-multigif-v1.json`

It contains no pool because no semantic identity has three real GIF candidates.

Its contract test is:

`prior-work/astra/prototype-m3.2/tests/real-asset-multigif-v1.test.ts`

The test verifies, for every future non-empty entry:
- referenced GIF path exists;
- pool size is 3..5;
- no placeholder/staging marker;
- unique stable candidate keys;
- semantic ID resolves to a production presentation slot;
- no gameplay-owned fields enter the patch.

The empty patch is safe selective-integration evidence, but it is **not new visual content**.

## Current audited deficits

| Domain | Production semantic slots audited | Real GIF candidates | Real-ready pools | Minimum deficit |
| --- | ---: | ---: | ---: | ---: |
| 10 ordinary careers: seasonal shifts + results | 50 | 0 | 0 | 150 candidate assignments |
| reachable School lesson/generic/Night presentation slots | 11 | 0 | 0 | 33 candidate assignments |
| ordinary poverty, excluding Secret Debt | 10 | 0 | 0 | 30 candidate assignments |
| current Forest Activity/return/PR43 reaction slots | 7 | 0 | 0 | 21 candidate assignments |
| **Total** | **78** | **0** | **0** | **234 candidate assignments** |

Candidate-assignment deficit is not the same as unique-file count. Safe reuse can reduce unique production cost while every semantic identity remains separate.

## First real production batch

File:

`docs/presentation-prep/FIRST_REAL_GIF_PRODUCTION_BATCH_MANIFEST_v1.md`

Recommended first batch:
- **30 unique career GIFs**;
- 3 per ordinary career;
- each career trio is season-neutral and reusable across that career's spring/summer/autumn/winter shift IDs;
- expected result: **40 real-ready repeatable shift pools** from 30 files.

This intentionally follows the requested priority order and does not dilute the batch by producing only 1–2 candidates for many pools.

After that:
1. ordinary poverty;
2. reachable School;
3. Forest repeat/result surfaces.

Career result slots can receive a separate result-compatible wave rather than automatically reusing work loops that may imply the wrong moment.

## No-placeholder production rule

A multi-GIF pool is production-ready only if:
1. it has 3–5 candidate entries;
2. every candidate path resolves to a real repository `.gif` blob;
3. no candidate is under a placeholder/staging/non-shipped namespace;
4. candidate keys are stable and locale-neutral;
5. RU and EN alt text is available;
6. a real static fallback remains;
7. semantic `presentationId` already exists in production;
8. media selection cannot affect outcome, reward, effect, timing, eligibility, gameplay RNG or Save state.

A path written in JSON or Markdown is not an asset.

External URLs and `data:image/gif` test values do not satisfy this production rule.

## Coverage documents

- `docs/presentation-prep/EXISTING_GIF_ASSET_INVENTORY_v1.md`
- `docs/presentation-prep/CAREER_PRESENTATION_SEMANTIC_COVERAGE_v3.md`
- `docs/presentation-prep/SCHOOL_PRESENTATION_SEMANTIC_COVERAGE_v3.md`
- `docs/presentation-prep/POVERTY_PRESENTATION_SEMANTIC_COVERAGE_v3.md`
- `docs/presentation-prep/FOREST_PRESENTATION_SEMANTIC_COVERAGE_v3.md`
- `docs/presentation-prep/FIRST_REAL_GIF_PRODUCTION_BATCH_MANIFEST_v1.md`

## Selective integration order for Lead

The worker branch is strongly diverged from current main. **Do not merge the branch wholesale.**

Recommended selective copy order onto a fresh integration branch from current main:

1. `EXISTING_GIF_ASSET_INVENTORY_v1.md` — establishes the zero-real-GIF source-of-truth baseline.
2. `real-asset-only-multigif-v1.json` + `real-asset-multigif-v1.test.ts` — inert honest patch plus enforcement.
3. `CAREER_PRESENTATION_SEMANTIC_COVERAGE_v3.md`.
4. `SCHOOL_PRESENTATION_SEMANTIC_COVERAGE_v3.md`.
5. `POVERTY_PRESENTATION_SEMANTIC_COVERAGE_v3.md`.
6. `FOREST_PRESENTATION_SEMANTIC_COVERAGE_v3.md`.
7. `FIRST_REAL_GIF_PRODUCTION_BATCH_MANIFEST_v1.md`.
8. this handoff.

No shared runtime/schema/UI file from the long-lived worker branch is required for this adoption wave.

## Domain notes

### Careers

All 10 ordinary careers have stable seasonal shift/result semantic IDs, static fallbacks and zero real GIFs.

### School

Reachable core course lesson slots and generic post-lesson/Night reaction slots are audited. The 24 exact `school.night_study.*` gameplay choice IDs currently share the generic post-Night presentation reaction surface.

Teacher/course-specific media libraries remain **STAGED** until exact routing exists. They are not promoted by this handoff.

### Poverty

Only ordinary PR37 poverty is included. Secret Debt is excluded.

### Forest

Current Activity route/returns and PR43 success/escape/failure reactions are included. No Hunter-trail or Old-Boundary presentation semantics are invented.

PR43 result media already has RU+EN localized alt keys. Generic `stage.hunt` Activity media still has legacy static-alt localization debt.

## Adoption procedure once GIFs arrive

For each proposed pool:
1. add real GIF files under a managed `assets/` path;
2. verify the files are repository blobs, not references;
3. assign stable locale-neutral candidate keys;
4. supply RU+EN alt strings/keys;
5. keep static fallback;
6. add the slot override to a real-asset patch;
7. run the real-asset contract test plus PR42 presentation tests;
8. verify animations-off chooses static media;
9. verify same occurrence + RU/EN switch keeps the same candidate;
10. run exact-head CI before merge.

## Final handoff state

Runtime capability: **READY**.

Localization capability: **READY**.

Real GIF inventory: **EMPTY**.

Real dynamic pools shippable now: **NONE**.

Next blocker is concrete media production, starting with the 30-file ordinary-career shift batch.
