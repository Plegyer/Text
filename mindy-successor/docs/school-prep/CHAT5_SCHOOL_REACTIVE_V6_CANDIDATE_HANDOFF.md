# Chat 5 School Reactive Content v6 Candidate Handoff

Date: 2026-09-30
Owner: Chat 5 / School + Text Localization Content Worker
Task: C5-60
Branch: `chat5/school-reactive-depth-v6`
Queue-start baseline: `main@593f9936d72296557b36a0e0ca7d3c7bb780839c`
Required C5-60 refresh base: `main@5f2685f1fde6b4718483febd6f49108eaa4ac873`

## Scope

Candidate for C5-49 through C5-59.

The queue audits the current School reactive-consumer boundary, prepares exact-course RU/EN lesson/teacher response content for all eight existing courses, adds a three-context response matrix for all eight existing teachers, and adds focused parity/stable-ID/collision regression.

No runtime, production pack, root localization, presentation registry, curriculum, threshold, public producer fact, Save field, NightFlow rule, career mechanic or Activity mechanic is changed.

## C5-49 — reactive-consumer capability audit

Added:
- `content/school-reactive-consumer-capability-audit-v1.fixture.json`
- `docs/school-prep/SCHOOL_REACTIVE_CONSUMER_CAPABILITY_AUDIT_V1.md`

Exact-current findings:
- `executeSchoolLesson` receives and returns exact course identity;
- `lastAction.presentationId` preserves exact paid-course presentation identity;
- `lastAction.id` remains generic `school`;
- paid-lesson ReactionFacts emit generic `actionCompleted: school`, stat/resource/Energy changes and eligible endings;
- no paid-lesson ReactionFact carries exact course, track or teacher identity;
- overlapping stat deltas are not a safe proxy for course identity;
- the production teacher pack exposes eight classroom media identities but zero teacher events;
- no teacher reaction fact exists;
- the staged course lesson pack contains authored course-specific variants but no exact-course reactive triggers;
- generic after-school text can safely consume `actionCompleted: school`;
- Night-study has an exact semantic choice ID and can be routed by `nightChoiceCompleted(choice)`.

Safe current seams:
1. direct caller-owned exact course result handling;
2. exact `lastAction.presentationId`;
3. generic after-paid-lesson reaction;
4. exact Night-study choice reaction.

Missing seams:
1. exact paid-course ReactionFact/ReactionTrigger;
2. teacher-specific reactive identity;
3. production exact-course teacher/lesson consumer.

No runtime seam is invented by this candidate.

## C5-50 — Literacy & Numbers reactive depth v2

Added:
- `content/school-literacy-and-numbers-reactive-v2.fixture.json`
- `docs/school-prep/SCHOOL_LITERACY_NUMBERS_REACTIVE_V2.md`

Existing identities only:
- `school.course.literacy_and_numbers`
- `school.track.literacy_and_numbers`
- `school.teacher.mara-fen`

Prepared RU/EN:
- lesson success;
- ordinary repetition;
- Mara Fen feedback;
- transfer reflection.

No milestone, certificate, threshold, public result, career write or runtime consumer is selected.

## C5-51 — Arcana reactive depth v2

Added:
- `content/school-arcana-reactive-v2.fixture.json`
- `docs/school-prep/SCHOOL_ARCANA_REACTIVE_V2.md`

Existing identities:
- `school.course.arcana`
- `school.track.arcana`
- `school.teacher.ilyra-venn`

Prepared RU/EN around testability, repetition, uncertainty and transfer. No Forest/Activity result, research state, threshold or public fact is created.

## C5-52 — Rhetoric & Social reactive depth v2

Added:
- `content/school-rhetoric-and-social-reactive-v2.fixture.json`
- `docs/school-prep/SCHOOL_RHETORIC_SOCIAL_REACTIVE_V2.md`

Existing identities:
- `school.course.rhetoric_and_social`
- `school.track.rhetoric_and_social`
- `school.teacher.cassian-reed`

Prepared RU/EN lesson success, repetition, teacher feedback and transfer context. No relationship/career write or reactive runtime trigger is created.

## C5-53 — Etiquette & Presentation reactive depth v2

Added:
- `content/school-etiquette-and-presentation-reactive-v2.fixture.json`
- `docs/school-prep/SCHOOL_ETIQUETTE_PRESENTATION_REACTIVE_V2.md`

Existing identities:
- `school.course.etiquette_and_presentation`
- `school.track.etiquette_and_presentation`
- `school.teacher.eliane-marrow`

Prepared RU/EN contextual-form, repetition, teacher feedback and transfer text. No status gate, Palace access, threshold or public result is created.

## C5-54 — Field Craft reactive depth v2

Added:
- `content/school-field-craft-reactive-v2.fixture.json`
- `docs/school-prep/SCHOOL_FIELD_CRAFT_REACTIVE_V2.md`

Existing identities:
- `school.course.field_craft`
- `school.track.field_craft`
- `school.teacher.rowan-pike`

Prepared RU/EN around observation, fallback planning, repeated condition changes and transfer. No Activity write, route unlock, entry-condition change or capability item is created.

## C5-55 — Physical Training reactive depth v2

Added:
- `content/school-physical-training-reactive-v2.fixture.json`
- `docs/school-prep/SCHOOL_PHYSICAL_TRAINING_REACTIVE_V2.md`

Existing identities:
- `school.course.physical_training`
- `school.track.physical_training`
- `school.teacher.tovan-kest`

Prepared RU/EN around repeatable form, repetition, controlled stopping and transfer. No Energy-rule, stat-package, shift-cost or career-threshold change is created.

## C5-56 — Arts & Performance reactive depth v2

Added:
- `content/school-arts-and-performance-reactive-v2.fixture.json`
- `docs/school-prep/SCHOOL_ARTS_PERFORMANCE_REACTIVE_V2.md`

Existing identities:
- `school.course.arts_and_performance`
- `school.track.arts_and_performance`
- `school.teacher.nessa-lark`

Prepared RU/EN around intention, repetition, partner response and transfer. No festival, career or relationship mechanic is created.

## C5-57 — Body Confidence reactive depth v2

Added:
- `content/school-body-confidence-reactive-v2.fixture.json`
- `docs/school-prep/SCHOOL_BODY_CONFIDENCE_REACTIVE_V2.md`

Existing identities:
- `school.course.body_confidence`
- `school.track.body_confidence`
- `school.teacher.sera-vey`

Prepared RU/EN around comfortable deliberate presence, repetition, clear boundaries and transfer.

Explicit boundary:
- presentation/confidence is not consent;
- Body Confidence/Sexuality is not Lust;
- no Lust effect, consent rule, relationship write or career state is added.

## C5-58 — teacher response matrix v2

Added:
- `content/school-teacher-response-matrix-v2.fixture.json`
- `docs/school-prep/SCHOOL_TEACHER_RESPONSE_MATRIX_V2.md`

Covers all eight current teachers:
- Mara Fen;
- Ilyra Venn;
- Cassian Reed;
- Eliane Marrow;
- Rowan Pike;
- Tovan Kest;
- Nessa Lark;
- Sera Vey.

Exactly three contexts per teacher:
- lesson success;
- ordinary repetition;
- transfer context.

That produces 24 response variants / 48 RU/EN localization keys.

Teachers remain School educators, not career gates or state writers.

## C5-59 — reactive parity / collision regression

Added:
- `tests/school-reactive-v2-parity.test.ts`
- `docs/school-prep/SCHOOL_REACTIVE_V2_PARITY_REGRESSION.md`

Regression locks:
- safe vs missing reactive seams from C5-49;
- exact eight course/track/teacher tuples;
- four exact response roles in every course fixture;
- three exact contexts in the teacher matrix;
- null runtime-consumer, threshold and public-result selections;
- complete RU/EN parity;
- unique stable keys;
- zero current root-localization collisions;
- Field Craft no Activity/route changes;
- Physical Training no Energy/stat-rule changes;
- Arts & Performance no festival/relationship mechanics;
- Body Confidence no Lust/consent/relationship mechanics.

## Prepared localization inventory

C5-50 through C5-58 prepare:
- 112 unique fixture-local localization keys;
- 112/112 RU non-empty;
- 112/112 EN non-empty;
- zero duplicate prepared keys;
- zero collision with root localization on current-main refresh base.

Root `content/localization.json` is not modified.

## Current-main refresh before C5-60

The v6 queue began from `main@593f9936...`.

Before candidate freeze, main advanced to `5f2685f1fde6b4718483febd6f49108eaa4ac873`, including the merged v5 School transfer-atlas candidate and other worker integrations.

Per the active Chat 5 pointer, the final C5-60 candidate must be refreshed from then-current main and carry forward only new v6 School artifacts.

The refreshed candidate therefore carries exactly the new C5-49..60 docs/fixtures/test listed in this handoff on top of `5f2685f1...`. It does not duplicate or modify merged v5 artifacts.

## Pre-refresh / current-main validation

PASS against `main@5f2685f1fde6b4718483febd6f49108eaa4ac873`:
- 10 v6 JSON fixtures parse;
- all eight source course IDs still exist;
- every course fixture keeps exact current course/track/teacher identities;
- all `selectedRuntimeConsumerId` values remain null;
- all threshold/public-result selections remain null;
- 112 prepared keys scanned;
- 112/112 RU non-empty;
- 112/112 EN non-empty;
- 112/112 unique;
- zero root-localization collisions;
- C5-49 exact-course reaction gap remains present in current runtime.

## Ownership surface

Candidate adds only:
- School-owned docs;
- School-owned fixture-local content;
- one School-owned focused regression test.

It does not modify:
- `src/`;
- production packs;
- `content/definitions.json`;
- root `content/localization.json`;
- presentation/media;
- Save/RNG;
- NightFlow;
- Activity runtime;
- career/relationship mechanics;
- economy/balance.

## Open integration dependency

Exact paid-course reactive routing is still missing from the generic resolver boundary.

Until Integration/Product approves a seam:
- course-specific v2 reaction content must not be attached by guessing from stat deltas;
- teacher-specific content must not invent teacher events;
- generic after-school text may continue to use `actionCompleted: school`;
- direct exact-course presentation may continue to use the existing `lastAction.presentationId`;
- exact Night-study reactions may use exact Night-choice identity.

## Candidate state

After refreshing the branch onto `main@5f2685f1fde6b4718483febd6f49108eaa4ac873` with only these v6 paths:
1. open one focused C5-60 PR;
2. require exact-head `mindy-successor check` green;
3. record the exact frozen head for Chat 4 QA;
4. do not move it for unrelated main drift.
