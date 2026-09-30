# Night-Study Teacher Boundary Audit v1

Task: C5-65
Baseline: `main@871a9a94e76e1df0449fdef513e9173bd9fce009`
Fixture: `content/school-night-study-teacher-boundary-audit-v1.fixture.json`

Night study has an exact semantic choice identity, so the course can be known safely from the exact `school.night_study.<course>.<stat>` choice ID.

The runtime fact does **not** carry a teacher identity and does not say that a teacher is present.

Safe content use:
- record the current canonical teacher as fixture metadata for that course;
- write a private reflection such as remembering or applying a teacher's method;
- use the teacher's established tone as authoring guidance when the exact choice-to-course mapping is explicit.

Unsafe without a new approved runtime seam:
- live teacher dialogue during Night study;
- claiming the teacher joined the Night scene;
- teacher relationship effects;
- a teacher-specific event trigger;
- a new NightFlow step.

All eight teacher identities remain educator-only content identities. `selectedTeacherRuntimeConsumerId` stays null.
