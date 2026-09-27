# School Exact-Course Routing Seam Proposal v1

Status: proposal only. Shared runtime/schema are **not** modified by this task.

## Problem

The paid School transaction already knows the exact canonical course ID, for example:
- `school.course.arcana`;
- `school.course.field_craft`.

After the transaction, Resolver currently receives the generic fact:
- `{kind:'actionCompleted', action:'school'}`.

That fact is intentionally useful for generic School reactions, but it cannot safely distinguish which paid course completed.

As a result:
- generic post-School content is naturally reachable today;
- exact Night-study content is naturally reachable today through exact Night choice IDs;
- teacher/course-specific paid-lesson libraries remain staged.

## Smallest proposed public seam

Add one public reaction fact/trigger carrying only the exact existing paid course ID.

Proposed conceptual shape:

```ts
{ kind: 'schoolLessonCompleted', course: SchoolCourseId }
```

The final schema spelling may be adjusted by Lead, but the payload should contain only:
- reaction kind;
- canonical existing `school.course.*` ID.

Do not expose:
- School-private counters;
- School milestones/certificates/projects;
- tuition internals;
- private track state;
- relationship/career state.

## Emission point

Emit the exact-course public fact from the existing authoritative paid School transaction:
- after tuition/Energy/stat effects and typed paid progress have committed;
- in the same reaction boundary/epoch as the existing paid lesson completion facts;
- exactly once per successful `executeSchoolLesson`;
- never on an atomic rejection for money/Energy/flow state.

The existing:
- `actionCompleted:school`

must remain emitted for backward compatibility.

## Resolver trigger

Add the matching authored-event trigger form conceptually:

```ts
{ kind: 'schoolLessonCompleted', course: 'school.course.arcana' }
```

Matching is exact course-ID equality.

No wildcard is required for the first seam because generic School content already has:
- `actionCompleted:school`.

## No duplicate lesson progress

The new reaction fact is observational only.

It must not:
- apply tuition;
- spend Energy;
- apply stats;
- increment `lessons_completed`;
- increment `night_study_sessions`;
- publish a management/Arcana world fact;
- mutate relationships/careers.

Teacher/course content reacting to this fact remains presentation-only unless another separately approved authored mechanic exists.

## Backward compatibility

Existing content continues to work:
- generic School listeners keep using `actionCompleted:school`;
- Night-study listeners keep using `nightChoiceCompleted`;
- existing Save files require no data rewrite;
- existing paid School semantic presentation IDs remain unchanged.

New exact-course events opt in to the new trigger.

## Save migration

A Save migration should be avoidable.

Reason:
- reaction facts are ephemeral transaction inputs;
- once an exact-course event is selected/materialized, the current reaction queue already stores:
  - event ID;
  - variant ID;
  - allowed choices;
  - reaction epoch ID.

Therefore reload after materialization does not need to reconstruct the original exact-course reaction fact.

## Exactly-once behavior

Required tests:
1. insufficient money -> no exact-course fact;
2. insufficient Energy -> no exact-course fact;
3. active Night/Activity/pending scene rejection -> no fact;
4. successful paid lesson -> exactly one exact-course fact;
5. generic `actionCompleted:school` still emitted once;
6. exact course listener matches only its course;
7. generic listener and exact listener can coexist in one Resolver epoch;
8. reload after event materialization preserves selected event/variant without re-emitting the fact;
9. resolving teacher/course presentation cannot replay the paid transaction;
10. paid progress remains exactly once.

## Intended staged-content unlock

After this seam exists, the staged course-specific libraries can be converted to strict pack-owned namespaces and attached safely:
- teacher presentation per course;
- repeatable lesson variants v1/v2;
- course-specific classroom/feedback content.

Each exact event should react only to its matching `school.course.*` identity.

## Scope exclusion

This seam does not solve or select:
- management/accounting milestone/public-result semantics;
- Arcana/Forest public-result semantics;
- teacher relationship progression;
- certificate/project/exam rules;
- final art/GIF style.

It is routing only.

## Lead implementation boundary

Expected shared-runtime touch points, if Lead approves:
- reaction fact/trigger type/schema;
- trigger matcher;
- paid School lesson reaction-fact emission;
- narrow regression tests.

Expected not to change:
- Save schema;
- course transaction effects;
- School progression ownership;
- Night-study routing;
- Lumber/Forest ownership.
