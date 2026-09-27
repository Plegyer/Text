# School Routing / Content Handoff v11

Status: selective Lead handoff for Queue items 108–115.

## Safe currently routable content

### Generic paid-School post-lesson pack

Production-oriented staging file:
- `prior-work/astra/prototype-m3.2/content/packs/school-target/school-generic-reachable-v2.json`

Properties:
- strict dot-style pack/content IDs;
- event namespace owned by the pack;
- actual current trigger: `actionCompleted:school`;
- course-agnostic text only;
- no teacher/course claim;
- effect-free choices;
- no tuition/Energy/stat/Lust/progression mutation;
- static fallback `assets/stage-school.svg`.

This is safe under current routing because it needs to know only that a paid School action completed.

### Exact Night-study pack

Production-oriented staging file:
- `prior-work/astra/prototype-m3.2/content/packs/school-target/school-night-exact-v3.json`

Properties:
- strict dot-style pack/content IDs;
- pack-owned event namespace;
- 24 exact existing `nightChoiceCompleted` route identities;
- exact course/stat presentation;
- three authored variants per choice;
- no mechanics effects;
- static fallback per track.

This is safe under current routing because Night choice IDs already identify the exact course/stat pair.

## Routing tests

Queue item 113 adds:
- `prior-work/astra/prototype-m3.2/tests/school-generic-reachable-v2.test.ts`
- `prior-work/astra/prototype-m3.2/tests/school-night-exact-v3.test.ts`

Coverage authored:
- strict pack schema;
- strict pack-owned event namespace through `loadCatalog`;
- real paid School lesson -> generic offer;
- real Night-study choice -> exact matching Night offer;
- no unrelated Night event route;
- no presentation transaction/stat/Lust mutation;
- materialized variant stable across reload;
- resolving the presentation cannot replay School mechanics.

Chat 5 authored these tests but did not run npm/CI here.

## Exact paid-course routing limitation

Inventory:
- `docs/school-prep/SCHOOL_STAGED_LIBRARY_ROUTING_INVENTORY_v1.md`

Current public paid-School reaction:
- `actionCompleted:school`.

Current limitation:
- exact paid `school.course.*` identity is not exposed to authored event routing;
- teacher/course-specific libraries cannot safely choose the matching teacher/course under the generic trigger alone.

Do not infer course identity from:
- statChanged combinations;
- tuition;
- Energy;
- private School counters.

## Staged teacher/course content ready after a routing seam

Teacher staging:
- `content/packs/school-target/school-teachers-v1.json`

Course-specific repeatable lesson staging:
- `content/packs/school-target/school-lesson-content-v1.json`
- `content/packs/school-target/school-lesson-content-v2.json`

Authored prose supporting those packs:
- `SCHOOL_REPEATABLE_LESSON_TEXT_BANK_v1.md`
- `SCHOOL_TEACHER_LESSON_TEXT_BANK_v2.md`
- `SCHOOL_CANONICAL_TEACHER_CONTENT_DRAFT_v1.md`
- `SCHOOL_PEER_CLASSROOM_EVENT_BANK_v1.md`
- `SCHOOL_TEACHER_RELATIONSHIP_SCENES_v1.md`

These remain staged for exact paid-course automatic routing.

## Minimal Lead runtime seam

Proposal:
- `docs/school-prep/SCHOOL_EXACT_COURSE_ROUTING_SEAM_PROPOSAL_v1.md`

Smallest proposed extension:
1. preserve current generic `actionCompleted:school`;
2. emit one additional public reaction fact after a successful paid School transaction;
3. payload contains only the exact existing `school.course.*` ID;
4. add exact course matching to authored reaction triggers;
5. emit once in the same authoritative lesson boundary;
6. do not add a Save field if the existing materialized reaction queue is sufficient.

Conceptual fact:
`{kind:'schoolLessonCompleted', course:<existing SchoolCourseId>}`.

Lead may choose final schema spelling.

The seam is observational only and must not:
- charge tuition;
- spend Energy;
- apply stats;
- add paid/Night progress;
- publish management/Arcana results;
- mutate downstream domains.

No shared runtime implementation is included in Chat 5.

## Generic post-lesson content bank

- `docs/school-prep/SCHOOL_GENERIC_POST_LESSON_CONTENT_BANK_v2.md`

Contains course-neutral post-lesson content that is compatible with current generic School routing.

No teacher name or exact course identity is asserted.

## Exact Night content bank

- `docs/school-prep/SCHOOL_NIGHT_STUDY_EXACT_ROUTE_CONTENT_V3.md`

Contains richer authored presentation keyed to every one of the 24 current Night-study choice IDs.

Locked Night mechanics remain unchanged:
- tuition 0;
- current-day Energy 0;
- selected supported stat +2;
- next-day Energy -1;
- one Night slot;
- Night counter only.

## Multi-GIF opportunities

Reachable/staged split:
- `docs/school-prep/SCHOOL_MULTI_GIF_REACHABLE_STAGED_SPLIT_v2.md`

REACHABLE_NOW:
- generic classroom/post-lesson wrap-up;
- exact Night-study content.

STAGED:
- teacher-specific paid-lesson presentation;
- course-specific v1/v2 paid-lesson variants.

FUTURE_AFTER_EXACT_COURSE_SEAM:
- automatic matching teacher after paid course;
- automatic course-specific text/media;
- course-specific paid-lesson GIF/static routing.

Compact 3–5 GIF pool:
1. generic classroom wrap-up;
2. quiet Night study;
3. practical demonstration;
4. Arcana observation;
5. arts/performance rehearsal.

Static/text fallback remains required.

## Selective integration list

Safe staging candidates now:
1. `content/packs/school-target/school-generic-reachable-v2.json`
2. `content/packs/school-target/school-night-exact-v3.json`
3. `tests/school-generic-reachable-v2.test.ts`
4. `tests/school-night-exact-v3.test.ts`
5. `SCHOOL_GENERIC_POST_LESSON_CONTENT_BANK_v2.md`
6. `SCHOOL_NIGHT_STUDY_EXACT_ROUTE_CONTENT_V3.md`
7. `SCHOOL_MULTI_GIF_REACHABLE_STAGED_SPLIT_v2.md`

Lead runtime-review candidate:
8. `SCHOOL_EXACT_COURSE_ROUTING_SEAM_PROPOSAL_v1.md`

Keep staged until exact-course routing is available:
9. `school-teachers-v1.json`
10. `school-lesson-content-v1.json`
11. `school-lesson-content-v2.json`

## Product decisions still OPEN

Nothing in Queue items 108–115 resolves:
- management/accounting provider;
- management/accounting milestone form/value;
- final management public-result identity/rule;
- Arcana/Forest provider/result/scope;
- certificate/project/exam participation;
- canonical teacher relationship routes;
- education ending/Meta details;
- final art style.

## Locked mechanics preserved

No Queue item 108–115 changes:
- eight paid course IDs;
- track IDs;
- tuition;
- paid Energy;
- stat packages;
- ordinary Lust behavior;
- paid `lessons_completed`;
- Night `night_study_sessions`;
- Night +2 / zero tuition / zero current-day Energy / next-day Energy -1;
- blocking School scene contract;
- Lumber Hard Work independence;
- Palace unlock rules.

## Lead next steps

1. Run the two new routing tests and full School regression.
2. Review the strict staging packs for explicit production inclusion.
3. Include generic/Night packs selectively if green.
4. Decide whether to implement the narrow exact-course reaction seam.
5. If seam is approved, convert staged teacher/course packs to strict pack-owned namespaces and attach exact course triggers.
6. Hand reachable/staged GIF split to Chat2.
7. Keep public-result authoring blocked on explicit Product decisions.
