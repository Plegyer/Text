# Chat 5 School Localization Queue v10 Candidate Handoff

Owner: Chat 5 / School + Text Localization Content Worker
Queue: C5-97 through C5-108
Baseline: `main@6afc01061646bc52cec824863bf89e8ad8c309d0`
Branch: `chat5/school-localization-v10`

## Scope

Queue-v10 is content-side only. It adds School audits, one exact-current Night-study RU/EN preparation fixture, handoff metadata, and focused content-side regressions.

It does not modify:
- runtime/source code;
- Save/RNG;
- NightFlow or Energy rules;
- career or Activity state;
- economy/prices;
- root localization;
- production packs;
- presentation/media assets;
- producer/public-result state;
- curriculum/course/teacher canon;
- progression thresholds.

## C5-97 — School content reachability audit

Added:
- `content/school-localization-v10-reachability-audit.fixture.json`
- `docs/school-prep/SCHOOL_LOCALIZATION_V10_REACHABILITY_AUDIT.md`

Current player-facing/consumer-ready School surfaces are classified explicitly. No current audited School identity is marked obsolete.

## C5-98 — School localization parity v10

Added:
- `content/school-localization-parity-v10-audit.fixture.json`
- `docs/school-prep/SCHOOL_LOCALIZATION_PARITY_V10_AUDIT.md`

Validated current RU/EN pair coverage for canonical courses, teacher media, generic School events, lesson result UI, and Night-study UI. Raw English runtime fallbacks remain documented rather than patched.

## C5-99 — teacher and milestone text audit

Added:
- `content/school-teacher-milestone-text-audit-v10.fixture.json`
- `docs/school-prep/SCHOOL_TEACHER_MILESTONE_TEXT_AUDIT_V10.md`

All eight teacher identities remain educator-only. Existing milestone-depth text remains limited to Mara Fen / Literacy & Numbers and Ilyra Venn / Arcana, with no selected milestone identity or threshold.

## C5-100 — Night-study text preparation v10

Added:
- `content/school-night-study-text-preparation-v10.fixture.json`
- `docs/school-prep/SCHOOL_NIGHT_STUDY_TEXT_PREPARATION_V10.md`

Prepared one RU/EN title/body pair for each of the 24 current exact Night-study identities.

Prepared localization inventory:
- 48 unique fixture-local keys;
- 48/48 RU non-empty;
- 48/48 EN non-empty;
- zero root-localization collision at candidate validation.

Locked Night-study behavior remains:
- tuition 0;
- current-day Energy 0;
- selected stat +2;
- `night_study_sessions` +1;
- next-day Energy -1;
- no extra School/career progress;
- no NightFlow change.

## C5-101 — School-to-career handoff audit

Added:
- `content/school-to-career-handoff-audit-v10.fixture.json`
- `docs/school-prep/SCHOOL_TO_CAREER_HANDOFF_AUDIT_V10.md`

The audit covers all ten current ordinary careers and current career action IDs from the merged whole-career atlas. All School mapping thresholds and producer/public-result selections remain null. Lumber's existing consumer seam is recorded without inventing a School producer.

## C5-102 — terminology consistency audit

Added:
- `content/school-terminology-consistency-audit-v10.fixture.json`
- `docs/school-prep/SCHOOL_TERMINOLOGY_CONSISTENCY_AUDIT_V10.md`

Recorded current terminology/accessibility debt without editing root localization or presentation/media:
- canonical RU `Грамотность и счёт` vs presentation/teacher `Грамота и числа`;
- canonical RU `Этикет и самопрезентация` vs presentation/teacher `Этикет и подача`;
- English article debt for Arcana, Etiquette & Presentation, and Arts & Performance course alts.

## C5-103 — fixture collision regression

Added:
- `content/school-localization-v10-fixture-collision-contract.fixture.json`
- `tests/school-localization-v10-collision.test.ts`
- `docs/school-prep/SCHOOL_FIXTURE_COLLISION_REGRESSION_V10.md`

Locks:
- 8 exact course IDs;
- 8 exact teacher IDs;
- 24 exact Night-study IDs;
- 10 ordinary-career IDs;
- 48 prepared localization keys;
- no duplicate Night-study or prepared localization identity;
- no root-localization collision.

## C5-104 — ownership boundary regression

Added:
- `content/school-localization-v10-ownership-boundary-contract.fixture.json`
- `tests/school-localization-v10-ownership.test.ts`
- `docs/school-prep/SCHOOL_OWNERSHIP_BOUNDARY_REGRESSION_V10.md`

The regression excludes runtime/source, production packs, root localization, presentation/media, Save/RNG, NightFlow, Energy rules, career/Activity/economy state, producer facts, curriculum and teacher canon.

## C5-105 — accessibility text parity

Added:
- `content/school-accessibility-text-parity-audit-v10.fixture.json`
- `docs/school-prep/SCHOOL_ACCESSIBILITY_TEXT_PARITY_AUDIT_V10.md`

Current audited localized accessibility metadata is RU/EN complete:
- 8 course presentation alt pairs;
- 8 teacher media alt pairs;
- 8 teacher media caption pairs;
- generic Night-study alt.

Four active course-alt keys retain documented semantic/grammar debt. No media asset or presentation registry is changed.

## C5-106 — handoff refresh

Added:
- `content/school-localization-v10-handoff-refresh.fixture.json`
- `docs/school-prep/SCHOOL_LOCALIZATION_V10_HANDOFF_REFRESH.md`

The refresh is based on exact current main, not stale worker branches. It records 8 courses, 8 teachers, 24 Night-study choices, 10 ordinary careers, exact current consumers, and open integration dependencies.

## C5-107 — regression fixture coverage

Added:
- `content/school-localization-v10-regression-coverage.fixture.json`
- `tests/school-localization-v10-coverage.test.ts`
- `docs/school-prep/SCHOOL_REGRESSION_FIXTURE_COVERAGE_V10.md`
- `docs/school-prep/SCHOOL_LOCALIZATION_V10_REGRESSION_SCOPE.md`

The coverage regression requires evidence for every assigned pre-freeze task and locks identity counts, Night-study invariants, terminology/accessibility debt, and null runtime-consumer/threshold/producer selections.

## Static candidate validation

Pre-freeze validation on the queue-v10 branch records:
- current main baseline unchanged from queue start;
- 24 exact Night-study identities;
- 48 prepared localization keys;
- 48 unique keys;
- RU/EN complete;
- zero root-localization collisions;
- 8 current teacher identities/media entries;
- 10 current ordinary-career mappings;
- all transfer thresholds/public producer selections remain null;
- no runtime/Save/NightFlow/progression ownership.

## Explicit dependencies not invented

Still outside Chat 5:
- exact paid-course/teacher reaction identity;
- Night-study teacher-presence signal;
- paid-lesson journal localization reference;
- School-to-career thresholds;
- School producer/public-result publication;
- root localization fixes for audited terminology/accessibility debt;
- presentation/media changes.

## C5-108 candidate rule

PR #143 is the single focused candidate. Freeze only the exact head that passes repository `mindy-successor check`. Any later head movement requires a concrete CI/QA blocker or explicit Lead request and a complete exact-head re-gate.
