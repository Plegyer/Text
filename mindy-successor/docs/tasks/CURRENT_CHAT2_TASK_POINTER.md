# Current Chat 2 task pointer

Status: ASSIGNED
Owner: Chat 2 / Presentation & Media Worker
Queue: **364–375**
Queue size: **12**
Role contract: `mindy-successor/docs/tasks/CHAT2_MANDATORY_ROLE_PROMPT.md`
Ownership matrix: `mindy-successor/docs/tasks/ACTIVE_TEAM_OWNERSHIP_MATRIX.md`
Freeze protocol: `mindy-successor/docs/tasks/CANDIDATE_QA_FREEZE_PROTOCOL.md`

## Baseline

Previous queue 352–363 was delivered through merged PR #64.

Start a fresh branch from exact current `main`.
Recommended:
- `chat2/school-authored-media-sources-364-375`

This queue is **source/preparation only**. It must not promote School teacher staging into production and must not choose final teacher canon, mechanics, relationships, milestone rules or final art style.

Use existing School authored presentation documents as source references:
- `mindy-successor/docs/school-prep/SCHOOL_TEACHER_PRESENTATION_IDENTITY_INVENTORY_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_CANONICAL_TEACHER_CONTENT_DRAFT_v1.md`

Chat 5 owns teacher text/authoring review. Chat 2 owns media-source preparation only.

## 364 — current-main School authored-media identity audit

Create:
- `mindy-successor/docs/presentation-prep/SCHOOL_AUTHORED_MEDIA_IDENTITY_AUDIT_V1.md`

Classify each teacher/classroom, authored lesson, School-life and Night-study presentation identity as:
- PRODUCTION_CURRENT;
- AUTHORED_STAGING;
- GENERIC_FALLBACK_ONLY;
- PRODUCT_OPEN.

Do not activate staging IDs.

## 365 — reusable School motion-class map v1

Create:
- `mindy-successor/docs/presentation-prep/SCHOOL_REUSABLE_MOTION_CLASS_MAP_V1.md`

Map the existing authored surfaces to five reusable source classes:
- teacher explanation/classroom gesture;
- practical demonstration;
- Arcana observation;
- performance/rehearsal;
- quiet Night study.

Keep semantic IDs locale-neutral and mechanics-free.

## 366 — lecture/explanation source sequence v1

Create one original 4-frame SVG source sequence under:
- `mindy-successor/prior-work/astra/prototype-m3.2/assets/presentation-frames/`

Use an existing authored School teacher/classroom staging identity suitable for the lecture/explanation class.

No production activation.

## 367 — practical demonstration source sequence v1

Create one original 4-frame SVG source sequence for an existing practical School authored surface.

No gameplay timing or stat semantics.

## 368 — Arcana observation source sequence v1

Create one original 4-frame SVG source sequence for the existing authored Arcana classroom surface.

Visual motion only. No spell outcome, Forest provider or public-result implication.

## 369 — performance/rehearsal source sequence v1

Create one original 4-frame SVG source sequence for the existing authored Arts & Performance classroom surface.

No new teacher/career/relationship mechanics.

## 370 — quiet Night-study source sequence v1

Create one original 4-frame SVG source sequence for:
- `school/life/night-study/default`

Preserve the existing generic Night-study semantics and static fallback.

## 371 — School authored-media RU accessibility source v1

Create:
- `mindy-successor/docs/presentation-prep/SCHOOL_AUTHORED_MEDIA_ACCESSIBILITY_RU_V1.md`

Provide concise Russian alt/caption candidates for items 366–370 describing visible content only.

## 372 — School authored-media EN parity v1

Create:
- `mindy-successor/docs/presentation-prep/SCHOOL_AUTHORED_MEDIA_ACCESSIBILITY_EN_V1.md`

Provide full English parity for item 371.

## 373 — School authored animation source manifest v1

Create:
- `mindy-successor/prior-work/astra/prototype-m3.2/content/presentation-drafts/school-authored-animation-source-manifest-v1.json`

Include:
- exact staging presentation ID;
- sequence ID;
- ordered frame paths;
- loop timing;
- static fallback;
- accessibility source references;
- `productionActivated=false`.

## 374 — School authored source validator v1

Create:
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-authored-animation-frames-v1.test.ts`

Validate:
- exact existing authored/staging identities only;
- 4 ordered frames per sequence;
- consistent viewBox/metadata;
- no external URLs/scripts;
- no gameplay/RNG/Save fields;
- no production activation;
- no teacher canon promotion.

## 375 — School authored media-source handoff v1 + PR

Create:
- `mindy-successor/docs/presentation-prep/SCHOOL_AUTHORED_MEDIA_SOURCE_HANDOFF_V1.md`

Consolidate 364–374 into:
- SOURCE_READY;
- STAGING_ONLY;
- STATIC_FALLBACK_PRESERVED;
- ACCESSIBILITY_READY;
- PRODUCT_OPEN;
- NO_PRODUCTION_ACTIVATION.

Run focused validator plus relevant presentation/media checks and full `npm run check` if available.

Open a focused worker PR against `main`, report exact head SHA, changed files and actual checks, then freeze the candidate.
