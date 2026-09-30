# Chat 5 School Reactive Content v6 Candidate Handoff

Date: 2026-09-30
Owner: Chat 5 / School + Text Localization Content Worker
Task: C5-60
Branch: `chat5/school-reactive-depth-v6`
Refreshed candidate base: `main@f3a684448b0681c355452b7d24d836e3926cb594`

## Scope

Candidate for C5-49 through C5-59.

The queue audits the exact School reactive-consumer boundary, prepares v2 RU/EN exact-course response depth for all eight existing courses, prepares an eight-teacher response matrix, and adds a focused stable-ID / parity / collision regression.

No runtime, Save, NightFlow, economy, career, Activity, relationship, curriculum, threshold or public-producer state is added.

## C5-49 — reactive-consumer capability audit

Added:
- `content/school-reactive-consumer-capability-audit-v1.fixture.json`
- `docs/school-prep/SCHOOL_REACTIVE_CONSUMER_CAPABILITY_AUDIT_V1.md`

Current safe seams:
- `executeSchoolLesson` receives and returns exact course identity;
- `lastAction.presentationId` preserves exact paid-course presentation identity;
- generic `actionCompleted: school` supports generic after-paid-lesson text;
- Night study exposes exact choice identity through `nightChoiceCompleted(choice)`.

Current missing seams:
- paid-lesson ReactionFact does not carry exact course ID;
- no exact paid-course ReactionTrigger exists;
- no teacher reaction fact exists;
- production teacher pack has no teacher events;
- staged course-specific lesson events remain non-production/reference content without exact reactive triggers.

The audit explicitly rejects inferring paid-course identity from stat deltas because course stat packages overlap.

## C5-50 through C5-57 — exact-course reactive depth v2

Prepared one fixture and one handoff document for each existing course:
- Literacy & Numbers / Mara Fen;
- Arcana / Ilyra Venn;
- Rhetoric & Social / Cassian Reed;
- Etiquette & Presentation / Eliane Marrow;
- Field Craft / Rowan Pike;
- Physical Training / Tovan Kest;
- Arts & Performance / Nessa Lark;
- Body Confidence / Sera Vey.

Each course fixture contains four RU/EN response roles:
1. lesson success;
2. ordinary repetition;
3. teacher feedback;
4. transfer context.

Every course fixture keeps:
- `selectedRuntimeConsumerId: null`;
- `selectedThreshold: null`;
- `selectedPublicFactId: null`;
- empty gameplay effect/career/public-fact arrays.

Course-specific guardrails:
- Field Craft adds no Activity write or route unlock;
- Physical Training adds no Energy rule or stat-package change;
- Arts & Performance adds no festival, career or relationship mechanic;
- Body Confidence adds no Lust effect, consent rule or relationship write.

## C5-58 — teacher response matrix v2

Added:
- `content/school-teacher-response-matrix-v2.fixture.json`
- `docs/school-prep/SCHOOL_TEACHER_RESPONSE_MATRIX_V2.md`

The matrix covers all eight current teachers in exactly three contexts:
- lesson success;
- ordinary repetition;
- transfer context.

It provides 24 teacher response variants and preserves exact current teacher/course/track identities.

Teacher responses remain School content only. They do not select runtime consumers, thresholds, public results, careers or relationships.

Sera Vey copy explicitly preserves Body Confidence != consent/Lust.
Tovan Kest copy changes no Energy rule.
Rowan Pike copy opens no Activity route.

## C5-59 — parity / stable-ID / collision regression

Added:
- `tests/school-reactive-v2-parity.test.ts`
- `docs/school-prep/SCHOOL_REACTIVE_V2_PARITY_REGRESSION.md`

The regression locks:
- exact safe versus missing reactive-routing seams from C5-49;
- exact eight current course/track/teacher triples;
- four exact response roles for every course fixture;
- null runtime-consumer/threshold/public-result selections;
- exact eight-teacher matrix coverage;
- complete fixture-local RU/EN parity;
- stable localization-key references;
- zero duplicate prepared keys;
- zero root-localization collisions;
- mechanics-neutral Field Craft / Physical Training / Arts & Performance / Body Confidence boundaries.

## Localization inventory

Prepared by C5-50 through C5-58:
- 112 unique fixture-local localization keys;
- 112/112 RU non-empty;
- 112/112 EN non-empty;
- zero duplicate prepared keys;
- zero collision against current root localization at pre-candidate validation.

Breakdown:
- 8 course fixtures × 4 variants × 2 strings = 64 keys;
- 8 teachers × 3 contexts × 2 strings = 48 keys;
- total = 112 keys.

Root `content/localization.json` is not modified.

## Candidate refresh

The v6 working branch started on `main@593f9936d72296557b36a0e0ca7d3c7bb780839c`.

Before C5-60 candidate handoff, main advanced and the queue contract required the final candidate to be refreshed from then-current main.

The candidate branch was therefore rebuilt from:
- `main@f3a684448b0681c355452b7d24d836e3926cb594`;

while carrying forward only the 22 new C5-49..59 School docs/fixtures/test paths.

Earlier merged School atlas content from PR #105 remains on main and is not duplicated in this candidate.

## Pre-candidate static validation

PASS:
- 10 v6 JSON fixtures parse;
- all eight course fixture source IDs exist in current School source;
- all eight `selectedRuntimeConsumerId` values remain null;
- all eight thresholds remain null;
- all eight public-result selections remain null;
- reactive audit still records exact-course paid-lesson reaction identity as missing;
- 112 prepared keys;
- 112/112 RU non-empty;
- 112/112 EN non-empty;
- 112/112 unique;
- zero current root-localization collisions.

## Ownership surface

Candidate adds only:
- School-owned docs;
- School-owned fixture-local content;
- one School-owned focused regression test.

It does not modify:
- `src/`;
- `content/definitions.json`;
- root `content/localization.json`;
- production content packs;
- presentation/media assets;
- Save/RNG;
- NightFlow;
- Energy/stat rules;
- career/relationship/Activity mechanics.

## Explicit integration dependency

Exact paid-course reactive routing remains a shared Integration concern.

The current runtime provides exact course identity at the direct `executeSchoolLesson` boundary and exact presentation identity through `lastAction.presentationId`, but the generic reaction resolver receives only `actionCompleted: school` plus non-identity deltas.

Therefore this candidate does not create an exact-course ReactionFact, ReactionTrigger or teacher event. Any future production integration must use an approved exact identity seam rather than guessing from stats.

## Candidate state

Open one focused PR from this refreshed branch. Freeze only the exact PR head that passes `mindy-successor check`. Record that exact head as `CANDIDATE_FROZEN` for Chat 4 QA. Do not move it for unrelated main drift.
