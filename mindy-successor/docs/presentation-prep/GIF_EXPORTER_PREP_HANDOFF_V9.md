# GIF Exporter Prep Handoff v9

Scope: Chat 2 items **328–338**.

Worker branch:
`chat2/presentation-replacement-next`.

## EXPORTER_SOURCE_READY

New exporter source:

`prior-work/astra/prototype-m3.2/tools/export-presentation-gif.mjs`.

It provides:
- repository-local manifest/source/output path validation;
- exact presentationId + sequence lookup;
- ordered SVG-frame validation;
- dependency-free dry-run;
- fixed width/height/frame-duration/loop/palette controls;
- dynamic `sharp` + `gifenc` imports only for real export;
- deterministic ordered global-palette flow;
- SHA-256/byte-size reporting;
- no fetch/download/network behavior;
- no gameplay/RNG/Save access.

Reviewed expected dependencies:
- `sharp@0.35.4`;
- `gifenc@1.0.3`.

CLI contract:
`docs/presentation-prep/GIF_EXPORTER_CLI_CONTRACT_V1.md`.

Fixture:
`content/presentation-drafts/gif-exporter-fixture-manifest-v1.json`.

Static source test:
`tests/gif-exporter-source-v1.test.ts`.

Status:
**EXPORTER_SOURCE_READY**.

## DEPENDENCY_PR_REQUIRED

Chat 2 did not modify:
- `package.json`;
- `package-lock.json`.

Lead-owned integration must:
1. add exact devDependencies only;
2. add `media:export-gif` authoring script;
3. regenerate lockfile with npm;
4. pass Node 22.18 / Ubuntu `npm ci`;
5. smoke-export one local source sequence;
6. validate GIF metadata;
7. prove same-input byte identity;
8. run full exact-head checks/CI.

Acceptance packet:

`docs/presentation-prep/GIF_EXPORTER_DEPENDENCY_INTEGRATION_ACCEPTANCE_V1.md`.

Rollback packet:

`docs/presentation-prep/GIF_EXPORTER_ROLLBACK_PACKET_V1.md`.

Status:
**DEPENDENCY_PR_REQUIRED**.

## FIRST_THREE_POOLS_MANIFEST_READY

Three future PR42-compatible pool candidates are prepared.

### Lumber spring
File:
`content/presentation-drafts/lumber-spring-gif-pool-production-candidate-v1.json`.

Semantic:
`job/lumber/shift/spring/default`.

Candidates:
- `lumber-spring-loop-a`;
- `lumber-spring-loop-b`;
- `lumber-spring-loop-c`.

Expected paths:
- `assets/gif/careers/lumber/spring-loop-a.gif`;
- `assets/gif/careers/lumber/spring-loop-b.gif`;
- `assets/gif/careers/lumber/spring-loop-c.gif`.

Static fallback:
`assets/presentation/career-lumber-shift-spring.svg`.

### Guard summer
File:
`content/presentation-drafts/guard-summer-gif-pool-production-candidate-v1.json`.

Semantic:
`job/guard/shift/summer/default`.

Candidates:
- `guard-summer-loop-a`;
- `guard-summer-loop-b`;
- `guard-summer-loop-c`.

Expected paths:
- `assets/gif/careers/guard/summer-loop-a.gif`;
- `assets/gif/careers/guard/summer-loop-b.gif`;
- `assets/gif/careers/guard/summer-loop-c.gif`.

Static fallback:
`assets/presentation/career-guard-shift-summer.svg`.

### School Literacy & Numbers
File:
`content/presentation-drafts/school-literacy-gif-pool-production-candidate-v1.json`.

Semantic:
`school/literacy-and-numbers/lesson/default`.

Candidates:
- `school-literacy-loop-a`;
- `school-literacy-loop-b`;
- `school-literacy-loop-c`.

Expected paths:
- `assets/gif/school/literacy-and-numbers/lesson-loop-a.gif`;
- `assets/gif/school/literacy-and-numbers/lesson-loop-b.gif`;
- `assets/gif/school/literacy-and-numbers/lesson-loop-c.gif`.

Static fallback:
`assets/presentation/school-course-literacy-and-numbers.svg`.

All three files use PR42-compatible:
- `pool.version=1`;
- `ordering="ordered"`;
- `selectionPolicy="unweighted"`;
- exactly 3 `kind:"gif"` candidates;
- project-owned static fallback.

Every expected file is marked:
`NOT_YET_EXPORTED`, `exists:false`.

Status:
**FIRST_THREE_POOLS_MANIFEST_READY**.

## Accessibility plan

File:

`docs/presentation-prep/GIF_ACCESSIBILITY_KEY_PLAN_V1.md`.

Defines:
- exact candidate alt-key families for all 9 future GIF candidates;
- RU+EN parity requirement;
- caption-key families without requiring schema/UI change;
- static fallback accessibility retention;
- locale-neutral candidate/media identity.

No root localization keys were added by this queue.

## PROJECT_OWNED_ONLY

Provenance ledger:

`docs/presentation-prep/PROJECT_OWNED_GIF_PROVENANCE_LEDGER_V1.md`.

Records:
- 9 future candidate keys;
- 9 exact source sequences;
- 36 ordered repository-local project-owned SVG frames;
- zero external provenance;
- zero actual GIF-byte claim.

External/stock/downloaded/unknown media is excluded.

Status:
**PROJECT_OWNED_ONLY**.

## NO_GIF_BYTES_YET

Items 328–339 create:
- exporter source;
- source fixture;
- static exporter test;
- future pool metadata;
- accessibility/provenance/acceptance docs.

They do not create:
- real GIF bytes;
- root production GIF pools;
- runtime dependency changes;
- gameplay/Save changes.

Actual GIF files in first three planned pools:
**0 / 9**.

Production GIF pools activated:
**0 / 3**.

Status:
**NO_GIF_BYTES_YET**.

## Exact selective-copy files

### Exporter source / fixture / test
- `prior-work/astra/prototype-m3.2/tools/export-presentation-gif.mjs`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/gif-exporter-fixture-manifest-v1.json`
- `prior-work/astra/prototype-m3.2/tests/gif-exporter-source-v1.test.ts`

### Exporter docs
- `docs/presentation-prep/GIF_EXPORTER_CLI_CONTRACT_V1.md`
- `docs/presentation-prep/GIF_EXPORTER_ROLLBACK_PACKET_V1.md`
- `docs/presentation-prep/GIF_EXPORTER_DEPENDENCY_INTEGRATION_ACCEPTANCE_V1.md`

### First three pool candidates
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/lumber-spring-gif-pool-production-candidate-v1.json`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/guard-summer-gif-pool-production-candidate-v1.json`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/school-literacy-gif-pool-production-candidate-v1.json`

### Accessibility / provenance
- `docs/presentation-prep/GIF_ACCESSIBILITY_KEY_PLAN_V1.md`
- `docs/presentation-prep/PROJECT_OWNED_GIF_PROVENANCE_LEDGER_V1.md`
- this handoff.

## Lead boundary

Lead owns:
- package/lock dependency integration;
- exact-head npm ci/CI;
- first real exporter smoke;
- production GIF activation after actual bytes exist.

Chat 2 remains presentation-source/media-authoring only.

## Final state

Exporter implementation source:
**EXPORTER_SOURCE_READY**.

Dependency integration:
**DEPENDENCY_PR_REQUIRED**.

First three future PR42 pools:
**FIRST_THREE_POOLS_MANIFEST_READY**.

Actual GIF bytes:
**NO_GIF_BYTES_YET**.

Media provenance:
**PROJECT_OWNED_ONLY**.
