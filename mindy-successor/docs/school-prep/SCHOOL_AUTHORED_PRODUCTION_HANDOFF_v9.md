# School Authored Production Handoff v9

Status: selective Lead handoff for Queue items 90–98.

## Production-authored packs

### Teacher/classroom presentation pack

`prior-work/astra/prototype-m3.2/content/packs/school-target/school-teachers-v1.json`

Contains:
- eight drafted teacher/presenter identities represented through valid current event/media primitives;
- one authored teacher/classroom presentation surface per School track;
- no mechanics effects;
- no lesson prerequisites;
- no management/accounting or Arcana/Forest public-result semantics.

Current-schema limitation:
- the strict pack schema has no teacher-metadata object and the School reaction fact does not expose the exact paid course ID;
- teacher events are therefore authored presentation library content and remain untriggered until Lead chooses a safe production routing bridge;
- no shared schema was changed.

Draft teacher identities:
- `school.teacher.mara-fen` — Mara Fen — Literacy & Numbers;
- `school.teacher.ilyra-venn` — Ilyra Venn — Arcana;
- `school.teacher.cassian-reed` — Cassian Reed — Rhetoric & Social;
- `school.teacher.eliane-marrow` — Eliane Marrow — Etiquette & Presentation;
- `school.teacher.rowan-pike` — Rowan Pike — Field Craft;
- `school.teacher.tovan-kest` — Tovan Kest — Physical Training;
- `school.teacher.nessa-lark` — Nessa Lark — Arts & Performance;
- `school.teacher.sera-vey` — Sera Vey — Body Confidence.

### Repeatable lesson content pack

`prior-work/astra/prototype-m3.2/content/packs/school-target/school-lesson-content-v1.json`

Contains:
- three authored repeatable lesson variants per track;
- eight course/track content libraries;
- static fallback surfaces;
- one safe generic naturally reachable post-School presentation hook on `actionCompleted:school`.

Important routing limit:
- current reaction facts identify only the generic School action, not the exact paid course;
- course-specific authored events remain untriggered rather than risking the wrong teacher/course text after a lesson.

The generic post-School hook is presentation-only and has no effects.

### Milestone-neutral School-life pack

`prior-work/astra/prototype-m3.2/content/packs/school-target/school-life-content-v1.json`

Contains:
- arrival/classroom library;
- teacher feedback library;
- peer/context library;
- post-lesson flavor library;
- Night-study flavor library;
- generic effect-free post-paid-lesson optional presentation;
- exact Night-study presentation hook covering all 24 `school.night_study.*` choice IDs.

It does not assert:
- certificates;
- projects;
- exams;
- milestone completion;
- management/accounting public results;
- Arcana/Forest public results.

## Validation tests

### Teacher pack

`prior-work/astra/prototype-m3.2/tests/school-teachers-v1.test.ts`

Validates:
- strict pack schema;
- all eight locked course identities represented;
- presentation-only/no effects;
- unique teacher media/event identities;
- save state/schema unaffected by loading the authored pack.

### Repeatable lesson content

`prior-work/astra/prototype-m3.2/tests/school-lesson-content-v1.test.ts`

Validates:
- strict pack schema;
- all eight tracks have three authored variants;
- locked tuition/Energy/stat packages remain unchanged;
- paid typed-progress contract remains `lessons_completed +1`, Night remains separate;
- no ordinary Lust content/effect;
- media fallback references resolve;
- course-specific authored libraries stay untriggered under the current generic School reaction boundary.

### School-life reload regression

`prior-work/astra/prototype-m3.2/tests/school-life-content-reload.test.ts`

Covers:
- optional presentation materialization;
- variant stability across save/reload;
- effect-free open/resolve flow;
- no money/Energy/stat/progression mutation;
- exact Night-study completion reaction hook remains presentation-only.

These test files were authored in this branch. This handoff does not claim they were executed by CI/npm in Chat 5.

## Proposed production inclusion manifest

`prior-work/astra/prototype-m3.2/content/school-authored-production-inclusion-v1.fixture.json`

Proposed order:
1. existing `school-production.pack.json`;
2. `school-teachers-v1.json`;
3. `school-lesson-content-v1.json`;
4. `school-life-content-v1.json`.

Status remains:
- **PROPOSED_NOT_INCLUDED**.

No production catalog/bootstrap inclusion is modified by Queue item 97.

Before inclusion:
- run strict content validation/tests;
- resolve/accept the course-specific presentation-routing limitation;
- keep fixture globs excluded;
- keep authored packs effect-free unless a separately approved content mechanic is added.

## Presentation inventory / multi-GIF opportunities

`docs/school-prep/SCHOOL_TEACHER_PRESENTATION_IDENTITY_INVENTORY_v1.md`

Current static fallback:
- `assets/stage-school.svg`.

Reusable 3–5-GIF pool opportunities:
1. teacher explanation/classroom gesture;
2. practical demonstration/practice;
3. Arcana observation;
4. arts/performance rehearsal;
5. quiet Night-study loop.

These are ideal Chat2 presentation follow-ups because a small pool can support many text variants without tying mechanics to animation timing.

## Content now authored

Authored CONTENT_DRAFT/production-oriented material now exists for:
- eight teacher/presenter identities;
- all eight repeatable lesson text banks;
- milestone-neutral classroom/feedback/peer/post-lesson scenes;
- Night-study flavor;
- teacher relationship seeds;
- teacher visual/media briefs;
- production-oriented teacher/lesson/life packs;
- presentation identity inventory.

This meaningfully advances School beyond a pure stat-shop content shell while preserving the locked mechanics.

## Product decisions still OPEN

Still not authored as production authority:
- management/accounting School provider;
- management/accounting milestone form/value;
- final management/accounting public-result identity/rule;
- whether Arcana/Forest School public result remains in scope;
- Arcana/Forest provider;
- Arcana/Forest milestone form/value;
- exact direct Forest consumer if retained;
- certificate/project/exam participation in the minimum School path;
- canonical teacher relationship routes;
- education-ending/Meta details;
- final art style and final asset priority.

Nothing in items 90–98 selects those values.

## Locked mechanics preserved

No authored pack changes:
- eight course IDs;
- track IDs;
- tuition;
- 1 current-day Energy per paid lesson;
- stat packages;
- ordinary Lust behavior;
- paid `lessons_completed`;
- Night `night_study_sessions`;
- Night +2 / zero tuition / zero current-day Energy / next-day Energy -1;
- blocking School scene contract;
- Lumber Hard Work independence;
- Palace unlock rules.

## Selective Lead integration steps

1. Review/accept or revise the eight drafted teacher identities.
2. Run the three new validation tests against the target integration branch.
3. Decide how course-specific paid-lesson presentation receives the exact course identity:
   - use an existing target presentation bridge if available; or
   - request the smallest runtime primitive only if an integration test proves one is missing.
4. Explicitly include approved authored packs in the production bootstrap/catalog; do not include fixtures recursively.
5. Keep the generic post-School hook effect-free.
6. Keep Night presentation tied to exact Night-choice IDs.
7. Send the presentation identity inventory to Chat2 for static/GIF conversion.
8. Leave public-result packs absent until Product resolves the corresponding decisions.
9. Re-run full School regression after inclusion.

## Integration boundary

Recommended immediate integration candidates:
- teacher identity/content drafts;
- repeatable lesson text;
- milestone-neutral School-life content;
- presentation identity inventory;
- production-oriented authored packs after validation.

Do not integrate as production authority:
- fixture-only progression/public facts;
- guessed thresholds;
- guessed management/Arcana providers;
- direct counter setup;
- synthetic cross-system state.

No broad runtime/schema rewrite is requested by this handoff.
