# School Content-Depth Handoff v10

Status: selective Lead handoff for Queue items 99–106.

## Additional authored depth

### Teacher lesson text bank v2

`docs/school-prep/SCHOOL_TEACHER_LESSON_TEXT_BANK_v2.md`

Adds:
- 4 new repeatable lesson variants per track;
- 32 new teacher-voiced lesson scenes total;
- no mechanics changes;
- no teacher prerequisite;
- no milestone/public-result semantics.

Combined with v1:
- 7 repeatable authored lesson variants per track;
- 56 across all eight tracks.

### Night-study text bank v2

`docs/school-prep/SCHOOL_NIGHT_STUDY_TEXT_BANK_v2.md`

Adds track-aware Night-study flavor for every supported stat family:
- quiet study;
- difficult session;
- successful insight;
- fatigue context;
- normal/cheap housing-sensitive flavor.

Locked Night mechanics remain unchanged.

### Peer/classroom event bank

`docs/school-prep/SCHOOL_PEER_CLASSROOM_EVENT_BANK_v1.md`

Adds reusable milestone-neutral material for:
- social friction;
- collaboration;
- embarrassment/recovery;
- success;
- teacher intervention;
- track-specific peer seeds.

No event implies relationship progress, milestone completion, public results, or new prerequisites.

### Teacher relationship scenes

`docs/school-prep/SCHOOL_TEACHER_RELATIONSHIP_SCENES_v1.md`

Adds for all eight drafted teachers:
- repeated-contact scenes;
- trust moments;
- friction moments;
- social/Night invitation shapes;
- career/world reaction seeds.

These remain optional relationship content and never gate paid lessons.

## Production-oriented packs

### School lesson content v2

`prior-work/astra/prototype-m3.2/content/packs/school-target/school-lesson-content-v2.json`

Contains:
- 4 additional content variants for each of the eight tracks;
- one milestone-neutral generic post-School peer event using existing `actionCompleted:school`;
- no transaction effects;
- no public-result semantics;
- no teacher prerequisite.

Current routing boundary is intentionally preserved:
- exact paid course identity is not exposed by the generic School reaction fact;
- course-specific track libraries therefore remain inert until a safe routing bridge exists;
- the generic peer presentation is naturally reachable and effect-free.

### School Night content v2

`prior-work/astra/prototype-m3.2/content/packs/school-target/school-night-content-v2.json`

Contains:
- one exact presentation event for every existing Night-study course/stat choice;
- 24 exact Night-choice trigger identities;
- 4 presentation variants per Night choice;
- 96 Night presentation variants total;
- normal/cheap housing-sensitive presentation where current conditions support it;
- static fallback for every track;
- no mechanics effects.

Night mechanics remain owned by the existing Night-study action.

## Validation

### School lesson content v2 test

`prior-work/astra/prototype-m3.2/tests/school-lesson-content-v2.test.ts`

Validates:
- strict pack schema;
- all eight tracks represented;
- no tuition/Energy/stat/Lust mutation;
- no School counter mutation;
- no teacher prerequisite;
- unique event/media identities;
- authored media references resolve;
- generic post-School presentation materializes deterministically across reload.

The test file was authored in Chat 5. This handoff does not claim npm/CI execution.

## Multi-GIF readiness

`docs/school-prep/SCHOOL_MULTI_GIF_CONTENT_DENSITY_MAP_v1.md`

Current authored density:
- 56 repeatable lesson variants across eight tracks;
- 96 Night-study presentation variants across 24 exact Night-choice identities;
- additional School-life, peer, feedback, and teacher relationship content.

Reusable 3–5 GIF pool candidates:
1. classroom explanation / teacher gesture;
2. practical demonstration / movement;
3. Arcana observation;
4. arts/performance rehearsal;
5. quiet Night-study.

Strong dedicated-loop candidates:
- Arcana;
- Arts & Performance;
- Physical Training;
- Field Craft.

Current static fallback:
- `assets/stage-school.svg`.

No GIF is currently required for gameplay.

## Exact selective integration files

Primary new content:
1. `docs/school-prep/SCHOOL_TEACHER_LESSON_TEXT_BANK_v2.md`
2. `docs/school-prep/SCHOOL_NIGHT_STUDY_TEXT_BANK_v2.md`
3. `docs/school-prep/SCHOOL_PEER_CLASSROOM_EVENT_BANK_v1.md`
4. `docs/school-prep/SCHOOL_TEACHER_RELATIONSHIP_SCENES_v1.md`

Production-oriented:
5. `prior-work/astra/prototype-m3.2/content/packs/school-target/school-lesson-content-v2.json`
6. `prior-work/astra/prototype-m3.2/content/packs/school-target/school-night-content-v2.json`

Validation/presentation:
7. `prior-work/astra/prototype-m3.2/tests/school-lesson-content-v2.test.ts`
8. `docs/school-prep/SCHOOL_MULTI_GIF_CONTENT_DENSITY_MAP_v1.md`

Related prior production-oriented files remain:
- `school-teachers-v1.json`;
- `school-lesson-content-v1.json`;
- `school-life-content-v1.json`;
- their validation tests;
- production inclusion proposal v1.

## Public-result decisions still OPEN

Items 99–106 do not resolve:
- management/accounting School provider;
- management/accounting milestone form/value;
- final management public-result identity/rule;
- whether Arcana/Forest School public result remains in scope;
- Arcana/Forest provider;
- Arcana/Forest milestone form/value;
- exact direct Forest consumer;
- certificate/project/exam participation in minimum authored School;
- canonical teacher relationship routes;
- education-ending/Meta details.

No guessed threshold or fixture-only public result was promoted.

## Remaining content gaps

Still incomplete:
- final Product acceptance of drafted teacher identities as canonical production identities;
- course-specific paid-lesson presentation routing using exact course identity;
- final teacher portraits/classroom art;
- final GIF pool/assets;
- milestone/project/exam/certificate scenes after Product decisions;
- management/accounting authored provider/result;
- Arcana/Forest authored provider/result if retained;
- direct downstream consumer content for unresolved public results;
- teacher relationship IDs/stages if relationship routes are adopted;
- education ending/Meta content.

## Locked mechanics preserved

No item 99–106 changes:
- the eight course IDs;
- track IDs;
- tuition;
- 1 current-day Energy per paid lesson;
- stat packages;
- ordinary Lust behavior;
- paid `lessons_completed`;
- Night `night_study_sessions`;
- Night +2 / zero tuition / zero current-day Energy / next-day Energy -1;
- ordinary lesson availability;
- Lumber Hard Work;
- Palace unlock rules.

## Integration sequence

Suggested Lead integration flow:
1. review v2 text depth and teacher relationship scenes;
2. run the v2 content validation test plus prior School regression;
3. decide whether the generic post-School peer presentation should be included immediately;
4. include the exact Night-study presentation pack only after content/schema validation;
5. keep track-specific paid-lesson v2 libraries inert until exact course presentation routing is available;
6. hand the density map to Chat2 for reusable GIF/static production;
7. preserve static/text fallback;
8. keep public-result work blocked on explicit Product decisions;
9. request runtime work only if a concrete approved presentation/content route cannot be represented by current primitives.

## Runtime boundary

No broad runtime/schema rewrite is requested by items 99–106.

The only known limitation remains course-specific paid-lesson presentation routing from the generic `actionCompleted:school` reaction fact. It should be solved with the smallest existing integration bridge available, or with a narrowly demonstrated runtime change only if an integration test proves no existing bridge can represent it.
