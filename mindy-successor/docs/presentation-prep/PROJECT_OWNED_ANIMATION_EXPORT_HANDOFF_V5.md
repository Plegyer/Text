# Project-Owned Animation Export Handoff v5

Scope: newly appended queue items **280–290**.

Current-main baseline observed during this queue:
`295e6fc74d235f0b7555794555a18373451e8b7e`.

Worker branch:
`chat2/presentation-replacement-next`.

## Exporter proposal

Minimal proposed dev-only toolchain remains:

- `sharp@0.35.4`;
- `gifenc@1.0.3`.

Proposed package script:

```json
"media:export-gif": "node tools/export-project-owned-gif.mjs"
```

No dependency/package manifest was modified by Chat 2.

Proof-of-concept patch:
`docs/presentation-prep/FIRST_EXPORTER_PROOF_OF_CONCEPT_PATCH_V1.md`.

Reproducibility smoke:
`docs/presentation-prep/GIF_EXPORTER_REPRODUCIBILITY_SMOKE_V1.md`.

Lead approval packet:
`docs/presentation-prep/FIRST_EXPORTER_APPROVAL_PACKET_V1.md`.

## Seven prepared candidate metadata pools

All seven use exact current semantic presentation IDs and contain exactly three project-owned source candidates.

### 1. Lumber spring

File:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/lumber-spring-animation-candidates-v1.json`.

Semantic:
`job/lumber/shift/spring/default`.

Candidates:
- `lumber-spring-loop-a`;
- `lumber-spring-loop-b`;
- `lumber-spring-loop-c`.

### 2. Guard summer

File:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/guard-summer-animation-candidates-v1.json`.

Semantic:
`job/guard/shift/summer/default`.

Candidates:
- `guard-summer-loop-a`;
- `guard-summer-loop-b`;
- `guard-summer-loop-c`.

### 3. Tavern autumn

File:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/tavern-autumn-animation-candidates-v1.json`.

Semantic:
`job/tavern/shift/autumn/default`.

Candidates:
- `tavern-autumn-loop-a`;
- `tavern-autumn-loop-b`;
- `tavern-autumn-loop-c`.

### 4. School Literacy & Numbers

File:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/school-literacy-animation-candidates-v1.json`.

Semantic:
`school/literacy-and-numbers/lesson/default`.

No School mechanics/teacher-routing change.

### 5. Ordinary poverty helpful summer

File:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/poverty-helpful-summer-animation-candidates-v1.json`.

Semantic:
`location/town/event/poverty-street-production-helpful-summer/default`.

Secret Debt excluded.

### 6. Forest success return

File:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/forest-success-return-animation-candidates-v1.json`.

Semantic:
`activity/forest/return/success`.

No route/challenge/result-mechanics change.

### 7. Foreman Night

File:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/foreman-night-animation-candidates-v1.json`.

Semantic:
`relationship/lumber-foreman/lumber-night-foreman-professional/default`.

No relationship/Night mechanics change.

## Candidate metadata contract

Every pool records:
- exact semantic `presentationId`;
- current project-owned static fallback;
- exactly 3 locale-neutral candidate keys;
- exact source sequence key;
- four ordered SVG frame paths per candidate;
- authored source duration;
- normalized future export duration;
- normalized frame delay;
- 640×360 raster target;
- <=256-color palette target;
- infinite-loop target;
- `gifPath: null`.

No actual GIF path is claimed.

## Cross-pool validator

File:
`prior-work/astra/prototype-m3.2/tests/animation-candidate-source-metadata-v1.test.ts`.

It validates:
- 7 metadata pools;
- exactly 3 source candidates per semantic ID;
- exact current semantic presentation IDs;
- real static fallback paths;
- globally unique candidate keys;
- local ordered source frames;
- source frame semantic/sequence/index metadata;
- no GIF path unless real GIF bytes exist;
- no gameplay/reward/effect/RNG/Save fields.

Totals covered by this validator:
- 7 semantic identities;
- 21 future candidates;
- 84 source SVG frames.

## Existing source-manifest readiness

Authority:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-animation-source-manifest-v3.json`.

It remains broader than this seven-pool queue:
- 8 source-ready semantic identities;
- 24 source sequences;
- 96 SVG frames.

The eighth source-ready identity is:
`school/arcana/lesson/default`.

Arcana is intentionally not duplicated into an eighth candidate metadata file because this queue requested seven metadata pools only.

## Exact blocker to real GIF bytes

Still blocked on one Lead decision:

**approve exact dev-only exporter dependencies `sharp@0.35.4` + `gifenc@1.0.3` and the already-authored local exporter script.**

Until that approval:
- package.json remains unchanged;
- package-lock remains unchanged;
- exporter real mode is not dependency-backed;
- no production GIF bytes are claimed.

## Exact selective-copy files for this appended queue

### Docs

- `docs/presentation-prep/FIRST_EXPORTER_PROOF_OF_CONCEPT_PATCH_V1.md`
- `docs/presentation-prep/GIF_EXPORTER_REPRODUCIBILITY_SMOKE_V1.md`
- `docs/presentation-prep/FIRST_EXPORTER_APPROVAL_PACKET_V1.md`
- this handoff.

### Candidate metadata

- `prior-work/astra/prototype-m3.2/content/presentation-drafts/lumber-spring-animation-candidates-v1.json`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/guard-summer-animation-candidates-v1.json`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/tavern-autumn-animation-candidates-v1.json`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/school-literacy-animation-candidates-v1.json`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/poverty-helpful-summer-animation-candidates-v1.json`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/forest-success-return-animation-candidates-v1.json`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/foreman-night-animation-candidates-v1.json`

### Test

- `prior-work/astra/prototype-m3.2/tests/animation-candidate-source-metadata-v1.test.ts`

## Existing exporter files required by the proposal

Already prepared before this appended queue:
- `prior-work/astra/prototype-m3.2/tools/export-project-owned-gif.mjs`;
- `prior-work/astra/prototype-m3.2/tools/validate-project-owned-gif.mjs`;
- `prior-work/astra/prototype-m3.2/tests/project-owned-gif-exporter-dry-run-v1.test.ts`;
- `prior-work/astra/prototype-m3.2/tests/project-owned-gif-validator-v1.test.ts`;
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-animation-source-manifest-v3.json`.

## Lead selective integration boundary

If Lead approves exporter integration:

1. copy the exporter source/tests/source manifest and this queue's metadata/docs;
2. add exact devDependencies only to prototype `package.json`;
3. regenerate `package-lock.json` via npm;
4. run `npm ci`;
5. run dry-run and validator regressions;
6. run one reproducibility smoke export;
7. validate the produced bytes;
8. run full project checks/exact-head CI.

Do not modify root presentation/localization merely to approve the exporter.

Production mapping/localization comes later, after actual GIF bytes exist and pass technical/provenance/pool QA.

## Current state

Seven requested candidate metadata pools:
**READY**.

Source candidates:
**21 / 21 READY**.

Source SVG frames represented:
**84**.

Actual GIF paths in those metadata pools:
**0**.

Actual production GIF files:
**0**.

Production PR42 animation pools:
**0**.

Remaining blocker:
**Lead approval and integration of the exact dev-only exporter dependencies.**
