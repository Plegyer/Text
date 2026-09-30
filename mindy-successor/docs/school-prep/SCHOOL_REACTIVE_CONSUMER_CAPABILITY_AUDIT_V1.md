# School Reactive-Consumer Capability Audit v1

Task: C5-49  
Baseline: `main@593f9936d72296557b36a0e0ca7d3c7bb780839c`  
Fixture: `content/school-reactive-consumer-capability-audit-v1.fixture.json`

## Exact paid-lesson identity available today

The paid-lesson call itself receives an exact `SchoolCourseId`, and `executeSchoolLesson` returns the exact course object. The current course therefore exists at the direct caller boundary.

The resulting `lastAction` preserves:
- the generic action ID `school`;
- the exact course label;
- the exact course-specific `presentationId`;
- course-specific deltas.

That makes `lastAction.presentationId` a safe exact-course presentation seam for a direct consumer that already owns the completed lesson result.

It does **not** make the generic reaction resolver course-aware.

## Current reaction boundary

`schoolReactionFacts` emits:
- `actionCompleted: school`;
- stat changes;
- money change;
- Energy change;
- newly eligible endings when applicable.

It emits no course ID, track ID or teacher ID.

Therefore:
- generic after-paid-lesson content may safely react to `actionCompleted: school`;
- an exact-course paid-lesson reaction may **not** safely infer the course from that fact;
- stat changes are not a valid substitute because School courses overlap stats.

## Teacher boundary

All eight existing teacher content identities are stable authoring identities, and all eight classroom media identities exist in the production teacher pack.

The production teacher pack has no teacher events. The runtime emits no teacher reaction fact.

Teacher-specific reaction text can therefore be prepared as content, but no production teacher-reactive selector is approved by the current runtime.

## Night-study contrast

Night study already has exact semantic choice IDs:
`school.night_study.<course_slug>.<stat>`.

The reaction vocabulary supports `nightChoiceCompleted(choice)`, so an exact Night-study choice can be routed without guessing. This safe seam does not imply an equivalent paid-lesson course seam.

## Staged course lesson content

`content/packs/school-target/school-lesson-content-v1.json` contains authored course-specific event variants, but those course events have no reactive triggers and remain staging/reference material.

Its generic after-school event uses the safe generic `actionCompleted: school` seam.

## Routing conclusion

Safe now:
1. direct exact-course result handling at the `executeSchoolLesson` caller boundary;
2. exact paid-course presentation via `lastAction.presentationId`;
3. generic after-paid-lesson reaction text;
4. exact Night-study reaction by choice ID.

Missing now:
1. exact-course paid-lesson ReactionFact/ReactionTrigger;
2. teacher-specific reactive identity;
3. production exact-course teacher/lesson event consumer.

C5-50..58 may prepare exact-course and teacher reaction copy with stable IDs, but each fixture must leave `selectedRuntimeConsumerId` null and must not invent a runtime trigger.
