# Media Production Readiness Handoff v6

Scope: Chat 2 items **160–170**.

Baseline: current `main` audited at `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`.

## Executive status

The presentation runtime and build path are ready to accept real GIF files, but the repository still contains **0 real GIF assets**.

This wave adds:
- exact source/build/runtime path documentation;
- a machine-readable real-media intake schema;
- a non-runtime byte-signature/file preflight utility;
- preflight tests using generated test-only GIF fixtures;
- concrete producer briefs for ordinary careers, ordinary poverty, reachable School and current Forest;
- a production static-fallback inventory;
- a provenance/replacement ledger contract;
- a hard blocking gate against placeholder-only production adoption.

No shared runtime/schema/UI file was edited.

## Tooling ready for real asset intake

### Intake schema

`prior-work/astra/prototype-m3.2/content/presentation-drafts/real-media-intake-manifest-schema-v1.json`

Defines:
- semantic `presentationId`;
- candidate stable key;
- repo-relative source path;
- GIF media kind;
- RU/EN alt localization keys;
- provenance/source note;
- reuse approval;
- static fallback;
- `INTAKE_ONLY` vs `PRODUCTION_READY`.

It is an intake schema/example, not an active pool.

### Preflight utility

`prior-work/astra/prototype-m3.2/tools/media-asset-preflight.mjs`

Checks:
- referenced files exist;
- paths stay under local `assets/`;
- external/scheme URLs are rejected;
- parent traversal/absolute paths are rejected;
- placeholder/TODO markers are rejected;
- `.gif` candidate bytes begin with `GIF87a` or `GIF89a`;
- candidate keys are unique per semantic pool;
- `PRODUCTION_READY` pools contain 3–5 candidates;
- static fallback exists and uses a supported static image extension.

The utility is presentation production tooling only and is not imported by game runtime.

### Tests

`prior-work/astra/prototype-m3.2/tests/media-asset-preflight.test.ts`

Covers:
- missing file rejection;
- external URL rejection;
- fake `.gif` signature rejection;
- duplicate key rejection;
- two-candidate production pool rejection;
- valid three-candidate test-only fixture acceptance.

Test GIF files are generated in temporary directories at test time and are never production assets.

## Exact source/build/runtime path

Document:

`docs/presentation-prep/MEDIA_ASSET_BUILD_PATH_AUDIT_v1.md`

Current path:

source:
`prior-work/astra/prototype-m3.2/assets/<subpath>`

build:
`scripts/build.mjs` recursively copies `assets` -> `dist/assets`

runtime URL:
`assets/<subpath>`

Electron loads `dist/index.html`; packaged files include `dist/**/*`.

Therefore a future real GIF needs to enter source `assets/`, not generated `dist/`.

## Producer-ready real asset requests

### Ordinary careers

`docs/presentation-prep/FIRST_ORDINARY_CAREER_GIF_PRODUCER_BRIEF_v2.md`

Request:
- 30 real GIFs;
- 3 per each of 10 ordinary careers;
- each career trio is neutral enough for reuse across that career's four seasonal shift semantic IDs;
- potential coverage after acceptance: 40 real 3-candidate shift pools.

All target filenames remain requests until repository blobs exist.

### Ordinary poverty

`docs/presentation-prep/POVERTY_REAL_GIF_PRODUCER_BRIEF_v1.md`

Smallest first pool:
- `location/town/event/poverty-pressure-production-cold-rain/default`;
- 3 requested real GIFs;
- static fallback `assets/stage-outside.svg`;
- Secret Debt excluded.

### Reachable School

`docs/presentation-prep/SCHOOL_REACHABLE_REAL_GIF_PRODUCER_BRIEF_v1.md`

Request:
- 3 shared neutral daytime School GIFs for two generic daytime reaction semantic IDs;
- 3 separate generic Night-study GIFs for the exact post-Night reaction semantic ID;
- total 6 unique requested files can complete 3 reachable generic pools.

Teacher/course-specific media identities remain STAGED.

### Current Forest

`docs/presentation-prep/FOREST_REAL_GIF_PRODUCER_BRIEF_v1.md`

Request:
- 3 success GIFs;
- 3 escape GIFs;
- 3 failure GIFs;
- each outcome trio may be reused across the matching Activity-return and PR43 reaction identity;
- total 9 unique requested files can complete 6 outcome-consistent pools.

No Hunter/Old Boundary semantics are introduced.

## Static fallback state

Document:

`docs/presentation-prep/STATIC_FALLBACK_PRODUCTION_INVENTORY_v2.md`

Audited domains:
- 10 ordinary-career seasonal shifts/results;
- shipped Lumber event surfaces;
- reachable School;
- ordinary poverty;
- current Forest;
- shipped Lumber Foreman relationship/Night.

Result:
**all audited production semantic surfaces have a real static fallback**, directly or through the current fallback chain.

Notable indirect case:
`job/lumber/event/lumber-cross-school-management-return/default`
-> `location/town/default`
-> `assets/stage-town.svg`.

This keeps gameplay presentation-safe while GIF inventory is empty.

## Provenance and replacement record

Document:

`docs/presentation-prep/MEDIA_PROVENANCE_REPLACEMENT_LEDGER_v1.md`

Before a real asset becomes production-active, record:
- physical asset path;
- SHA-256;
- source/creator;
- license/permission note;
- permission verification;
- semantic owners;
- reuse owners/rationale;
- candidate keys;
- RU/EN alt keys;
- fallback;
- replacement version;
- rollback target;
- introduced/activated commits;
- preflight and acceptance evidence.

Unknown provenance remains `UNKNOWN_PENDING_REVIEW`; it must not be invented or silently treated as permission.

## Blocking gate

Document:

`docs/presentation-prep/REAL_ASSET_ADOPTION_BLOCKING_GATE_v1.md`

A production pool requires all of:
- 3–5 real repository GIFs;
- verified source/build path;
- green file/signature preflight;
- semantic ID on exact current main;
- RU+EN alt coverage;
- real static fallback;
- locale-switch candidate stability;
- zero gameplay fields/coupling;
- gameplay invariance;
- provenance/permission approval;
- rollback target;
- exact-head CI success.

Current G1 state:
**FAIL / BLOCKING — zero real GIF files.**

Therefore no dynamic GIF pool from prior staging manifests should be integrated as production today.

## Files Lead may selectively integrate now

The Chat 2 branch is long-lived and must not be merged wholesale.

Presentation-only files that may be selectively copied to a fresh current-main integration branch:

1. `docs/presentation-prep/MEDIA_ASSET_BUILD_PATH_AUDIT_v1.md`
2. `prior-work/astra/prototype-m3.2/content/presentation-drafts/real-media-intake-manifest-schema-v1.json`
3. `prior-work/astra/prototype-m3.2/tools/media-asset-preflight.mjs`
4. `prior-work/astra/prototype-m3.2/tests/media-asset-preflight.test.ts`
5. `docs/presentation-prep/FIRST_ORDINARY_CAREER_GIF_PRODUCER_BRIEF_v2.md`
6. `docs/presentation-prep/POVERTY_REAL_GIF_PRODUCER_BRIEF_v1.md`
7. `docs/presentation-prep/SCHOOL_REACHABLE_REAL_GIF_PRODUCER_BRIEF_v1.md`
8. `docs/presentation-prep/FOREST_REAL_GIF_PRODUCER_BRIEF_v1.md`
9. `docs/presentation-prep/STATIC_FALLBACK_PRODUCTION_INVENTORY_v2.md`
10. `docs/presentation-prep/MEDIA_PROVENANCE_REPLACEMENT_LEDGER_v1.md`
11. `docs/presentation-prep/REAL_ASSET_ADOPTION_BLOCKING_GATE_v1.md`
12. this handoff.

Lead should validate the utility/test on a fresh current-main branch before merge because this worker branch is intentionally diverged.

## What must wait for real GIF files

Do not activate:
- career dynamic pools;
- poverty dynamic pools;
- School dynamic pools;
- Forest dynamic pools;
- any placeholder/staging path from older manifests.

Activation waits until producer output is:
1. physically added under source `assets/`;
2. accompanied by provenance/permission record;
3. added to a real-media intake manifest;
4. preflight-green;
5. localized with RU+EN alt;
6. mapped to existing semantic IDs;
7. tested with animations on/off and locale switch;
8. exact-head CI green.

## Recommended next work

The next useful presentation work should create or validate **real asset bytes**, not add more placeholder pool manifests.

Highest-value next actions:
1. receive/produce the 30-file ordinary-career batch, or a smaller complete 3-file career trio;
2. run the intake/preflight pipeline on those real files;
3. calculate provenance/checksums;
4. form the first non-empty `real-asset-only` pool patch;
5. run exact-head integration tests.

If no real GIF files are available, documentation can refine producer acceptance, but it must not claim new visual production coverage.

## Final readiness state

PR42 runtime: **READY**.

Build/copy path: **READY**.

Static fallback coverage: **READY for audited surfaces**.

Real-media intake tooling: **READY FOR SELECTIVE INTEGRATION / VALIDATION**.

Producer briefs: **READY**.

Real GIF files: **0**.

Production multi-GIF pool activation: **BLOCKED UNTIL REAL FILES ARRIVE**.
