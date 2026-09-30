# School Presentation Inventory v1

Status: C2-19 COMPLETE
Owner: Chat 2 / Presentation & Media
Baseline main: `b56628a81098146e7a2fc2c70b193e2587b9f025`

This inventory records current presentation/media identities only. School player-facing prose, teacher writing, curriculum, progression and localization content remain outside Chat 2 ownership.

## Eight existing course presentation IDs

| Course | Presentation ID | Current static source |
| --- | --- | --- |
| Literacy & Numbers | `school/literacy-and-numbers/lesson/default` | `assets/presentation/school-course-literacy-and-numbers.svg` |
| Arcana | `school/arcana/lesson/default` | `assets/presentation/school-course-arcana.svg` |
| Rhetoric & Social | `school/rhetoric-and-social/lesson/default` | `assets/presentation/school-course-rhetoric-and-social.svg` |
| Etiquette & Presentation | `school/etiquette-and-presentation/lesson/default` | `assets/presentation/school-course-etiquette-and-presentation.svg` |
| Field Craft | `school/field-craft/lesson/default` | `assets/presentation/school-course-field-craft.svg` |
| Physical Training | `school/physical-training/lesson/default` | `assets/presentation/school-course-physical-training.svg` |
| Arts & Performance | `school/arts-and-performance/lesson/default` | `assets/presentation/school-course-arts-and-performance.svg` |
| Body Confidence | `school/body-confidence/lesson/default` | `assets/presentation/school-course-body-confidence.svg` |

All eight course slots already use project-owned local static SVGs in `content/presentation.json`. Each current course slot has an existing RU/EN presentation alt/caption localization pair.

## Current School event presentation bindings

Existing event-derived presentation slots already bound in `content/presentation.json`:
- `location/town/event/school-lesson-content-v1-after-school/default` -> `assets/presentation/school-day-study.svg`;
- `location/town/event/school-life-content-v1-after-paid-lesson/default` -> `assets/presentation/school-day-study.svg`;
- `location/town/event/school-life-content-v1-after-night-study/default` -> `assets/presentation/school-night-study-generic-v2.svg`.

These are current catalog identities; Chat 2 does not create or modify their School text.

## Current teacher media surfaces

`school-teachers-v1.json` defines eight existing image media identities:
- `school.teacher.literacy-and-numbers.classroom`;
- `school.teacher.arcana.classroom`;
- `school.teacher.rhetoric-and-social.classroom`;
- `school.teacher.etiquette-and-presentation.classroom`;
- `school.teacher.field-craft.classroom`;
- `school.teacher.physical-training.classroom`;
- `school.teacher.arts-and-performance.classroom`;
- `school.teacher.body-confidence.classroom`.

Each currently points to the project-owned static fallback `assets/stage-school.svg`. These are legacy/catalog media identities, not standalone semantic `presentationId` slots. No new semantic teacher presentation ID is invented by this inventory.

## Missing-slot result

Missing static source among the eight existing course presentation IDs: **0**.

Current teacher media identities also have a valid static image source. Any future distinct teacher semantic presentation slot requires an exact Integration/content identity before Chat 2 can bind it.
