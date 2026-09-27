# School Staged Library Routing Inventory v1

Status: routing inventory for teacher/course-specific authored events in the v1/v2 staged School packs.

Current limitation:
- paid School runtime emits the generic reaction fact `actionCompleted:school`;
- that fact does not carry the exact paid course ID;
- current reaction trigger schema has no School-course-specific trigger;
- therefore a teacher/course-specific authored event cannot be made naturally reachable without ambiguity using current public reaction primitives.

This inventory does **not** invent a trigger kind and does not modify shared runtime.

## Exact routing identity required

For every staged teacher/course event below, natural routing requires the paid lesson completion signal to expose the exact canonical course ID already known by the School transaction.

Required identity shape, conceptually:
- generic School action completion remains available for backward compatibility;
- exact paid course identity is additionally available to authored reaction routing;
- the identity value is the existing `school.course.*` ID;
- no new private School counter/state needs to be exposed.

No schema spelling is selected here.

## Teacher presentation events — `school-teachers-v1.json`

| Staged event | Draft teacher | Exact course identity required |
|---|---|---|
| `school-teacher.literacy-and-numbers.presentation` | Mara Fen | `school.course.literacy_and_numbers` |
| `school-teacher.arcana.presentation` | Ilyra Venn | `school.course.arcana` |
| `school-teacher.rhetoric-and-social.presentation` | Cassian Reed | `school.course.rhetoric_and_social` |
| `school-teacher.etiquette-and-presentation.presentation` | Eliane Marrow | `school.course.etiquette_and_presentation` |
| `school-teacher.field-craft.presentation` | Rowan Pike | `school.course.field_craft` |
| `school-teacher.physical-training.presentation` | Tovan Kest | `school.course.physical_training` |
| `school-teacher.arts-and-performance.presentation` | Nessa Lark | `school.course.arts_and_performance` |
| `school-teacher.body-confidence.presentation` | Sera Vey | `school.course.body_confidence` |

Current status:
- staged/inert;
- no reaction trigger;
- content/presentation only.

## Repeatable lesson library v1 — `school-lesson-content-v1.json`

| Staged event | Exact course identity required |
|---|---|
| `school.lesson-content.literacy-and-numbers` | `school.course.literacy_and_numbers` |
| `school.lesson-content.arcana` | `school.course.arcana` |
| `school.lesson-content.rhetoric-and-social` | `school.course.rhetoric_and_social` |
| `school.lesson-content.etiquette-and-presentation` | `school.course.etiquette_and_presentation` |
| `school.lesson-content.field-craft` | `school.course.field_craft` |
| `school.lesson-content.physical-training` | `school.course.physical_training` |
| `school.lesson-content.arts-and-performance` | `school.course.arts_and_performance` |
| `school.lesson-content.body-confidence` | `school.course.body_confidence` |

Not course-specific:
- `school.lesson-content.after-school` uses generic `actionCompleted:school` and is naturally routable today.

## Repeatable lesson library v2 — `school-lesson-content-v2.json`

| Staged event | Exact course identity required |
|---|---|
| `school.lesson-v2.literacy-and-numbers` | `school.course.literacy_and_numbers` |
| `school.lesson-v2.arcana` | `school.course.arcana` |
| `school.lesson-v2.rhetoric-and-social` | `school.course.rhetoric_and_social` |
| `school.lesson-v2.etiquette-and-presentation` | `school.course.etiquette_and_presentation` |
| `school.lesson-v2.field-craft` | `school.course.field_craft` |
| `school.lesson-v2.physical-training` | `school.course.physical_training` |
| `school.lesson-v2.arts-and-performance` | `school.course.arts_and_performance` |
| `school.lesson-v2.body-confidence` | `school.course.body_confidence` |

Not course-specific:
- `school.lesson-v2.after-school-peer` uses generic `actionCompleted:school` and is naturally routable today.

## Milestone-neutral School-life pack

`school-life-content-v1.json` contains staged libraries such as arrival, feedback, peer/context, post-lesson, and Night-study libraries.

They are not uniquely tied to one course and therefore do not require exact paid-course identity.

Naturally routable surfaces already present:
- generic after-paid-lesson presentation via `actionCompleted:school`;
- Night-study presentation via exact existing `nightChoiceCompleted` choice IDs.

## Night-study packs

Night-study routing does **not** have the same ambiguity.

Current exact Night choice IDs already include:
- course;
- selected supported stat.

Example:
- `school.night_study.arcana.reason`.

Therefore Night authored events can route exactly today through the existing `nightChoiceCompleted` trigger.

## Why stat-change inference is not an acceptable substitute

Do not infer course identity from:
- individual `statChanged` facts;
- combinations of stat values;
- tuition amount;
- current Energy change;
- School-private typed counter reads.

Reasons:
- several courses share stats;
- Resolver sees multiple stat changes in one lesson;
- future balance/content changes would make such inference brittle;
- it would duplicate School transaction knowledge outside School.

## Minimum routing requirement

The smallest useful future seam is:
1. preserve the existing generic `actionCompleted:school`;
2. expose the exact existing paid `courseId` as public reaction identity;
3. allow authored events to match that exact value;
4. emit it once in the same reaction epoch as the paid lesson;
5. add no Save field unless the normal materialized reaction queue already persists the selected event.

That requirement is documented only. Shared runtime is not changed here.
