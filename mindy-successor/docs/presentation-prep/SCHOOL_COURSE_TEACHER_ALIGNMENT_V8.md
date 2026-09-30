# School Course / Teacher Presentation Alignment v8

Status: C2-79 COMPLETE / SCHOOL V7 RESYNCED
Owner: Chat 2 / Presentation & Media
Current baseline main: `f4de3b01a4369417ae9eff4b384f755790f75279`

The audit was re-read after the accepted School generic Night v7 candidate merged to current main.

## Course side

Current paid course semantic presentation slots: **8**.

Each course:
- keeps its existing `school/<course>/lesson/default` semantic ID;
- has an exact project-owned static course source;
- remains independent of teacher text-depth and Night-study content variants.

The School v7 content merge adds content fixtures/docs/tests but does not create new course semantic presentation IDs.

## Teacher side

Current teacher catalog media identities: **8**.

Each course slug still maps one-to-one to:
`school.teacher.<course-slug>.classroom`.

All eight teacher media identities remain current static catalog media.

The merged queue-v7 presentation candidate now supplies active RU/EN `media.<teacher>.alt` and `media.<teacher>.caption` fallback localization for all eight.

## Alignment result

Course-to-teacher identity pairs: **8 / 8**.

Missing course source: **0**.

Missing teacher source: **0**.

Missing teacher RU/EN fallback pair: **0**.

New teacher semantic IDs justified by current School v7 content: **0**.

No School mechanic, curriculum, teacher canon or Save state is changed.
