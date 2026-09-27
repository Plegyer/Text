# School Reachable-Hook Media Mapping v2

Authority:
- PR #38 merged;
- current main contains authored School lesson/life/teacher production packs;
- this mapping follows PR38's safe routing model and does not infer unavailable course identity.

## Routing rule

Current reaction facts expose:
- generic `actionCompleted: school`;
- exact `nightChoiceCompleted: school.night_study.*` choice IDs.

Current reaction facts do **not** expose the exact paid course ID to generic post-lesson event conditions.

Therefore:
- generic post-paid-lesson presentation may be reachable now;
- Night-study presentation may route from exact Night choice IDs now;
- teacher/course-specific authored libraries stay staged until a safe course-specific bridge exists.

## Reachable generic post-paid-lesson hook 1

Gameplay/content event:

`school-lesson-content-v1.after-school`

Semantic presentationId:

`location/town/event/school-lesson-content-v1-after-school/default`

Trigger:

`actionCompleted: school`

Current media:

`school.lesson.context.default` -> `assets/stage-school.svg`

### Multi-GIF target

Initial pool: **3 candidates**.

Suggested reusable visual classes:
1. neutral classroom settling after a paid lesson;
2. notes/material review;
3. short generic reflection before leaving.

Constraints:
- no named teacher required;
- no exact track/course claim;
- no extra tuition/Energy/stat/progress meaning;
- candidate selection is presentation-only.

Status:
**REACHABLE_GENERIC**.

## Reachable generic post-paid-lesson hook 2

Gameplay/content event:

`school-life-content-v1.after-paid-lesson`

Semantic presentationId:

`location/town/event/school-life-content-v1-after-paid-lesson/default`

Trigger:

`actionCompleted: school`

Current media:

`school.life.classroom.default` -> `assets/stage-school.svg`

### Multi-GIF target

Initial pool: **3 candidates**.

Suggested reusable visual classes:
1. classroom transition after lesson;
2. quiet peer/context moment;
3. neutral teacher/room feedback without naming a teacher.

Constraints:
- generic only;
- no course-specific visual promise;
- no milestone/certificate/project/public-result implication;
- no mechanics.

Status:
**REACHABLE_GENERIC**.

## Exact Night-study hook

Gameplay/content event:

`school-life-content-v1.after-night-study`

Semantic presentationId:

`location/town/event/school-life-content-v1-after-night-study/default`

Trigger set:
the 24 exact `school.night_study.*` Night choice IDs across the eight tracks and their supported stats.

Current media:

`school.life.night-study.default` -> `assets/stage-school.svg`

### Multi-GIF target

Initial pool: **3–5 candidates**.

Suggested reusable visual classes:
1. quiet reading/writing;
2. diagram or note review;
3. low-motion practical rehearsal;
4. preparation/organization;
5. optional track-neutral contemplative study.

Important:
the exact Night choice ID may be used as an occurrence/context key, but this single authored event remains presentation-only.

The GIF candidate cannot change:
- +2 selected supported stat;
- zero tuition;
- zero current-day Energy;
- next-day Energy -1;
- `night_study_sessions +1`;
- `lessons_completed +0`.

Status:
**REACHABLE_EXACT_NIGHT_HOOK**.

## Shipped paid lesson semantic surfaces

Separate from the event hooks above, the eight shipped paid lesson result IDs remain:

- `school/literacy-and-numbers/lesson/default`
- `school/arcana/lesson/default`
- `school/rhetoric-and-social/lesson/default`
- `school/etiquette-and-presentation/lesson/default`
- `school/field-craft/lesson/default`
- `school/physical-training/lesson/default`
- `school/arts-and-performance/lesson/default`
- `school/body-confidence/lesson/default`

These may receive generic track-aware 3–5-GIF pools because the semantic ID itself already identifies the paid course.

Do not confuse these result surfaces with the generic post-lesson reaction hooks.

## Staged course-specific lesson libraries

PR38 authored course/track-specific lesson content libraries, but safe generic event routing does not carry the exact paid course ID.

Therefore their course-specific event routing remains:

**STAGED_AWAITING_SAFE_ROUTING**.

Presentation may prepare:
- media briefs;
- reusable loop groups;
- static fallbacks;
- alt text.

Presentation must not mark those event IDs as reachable until Lead adds/accepts a course-specific bridge.

## Staged teacher libraries

Current teacher media identities include:

- `school/teacher/literacy-and-numbers/classroom`
- `school/teacher/arcana/classroom`
- `school/teacher/rhetoric-and-social/classroom`
- `school/teacher/etiquette-and-presentation/classroom`
- `school/teacher/field-craft/classroom`
- `school/teacher/physical-training/classroom`
- `school/teacher/arts-and-performance/classroom`
- `school/teacher/body-confidence/classroom`

Current fallback:
`assets/stage-school.svg`.

They are valid authored presentation library identities, but the current teacher pack has no events.

Status:
**STAGED_TEACHER_LIBRARY**.

### Pool preparation allowed

For each teacher library, a future 3-candidate pool can be prepared:
1. explanation/classroom gesture;
2. track-specific practice/demonstration;
3. neutral feedback/presentation moment.

### Routing not allowed yet

Do not make teacher media reachable from generic `actionCompleted: school` alone, because that trigger does not identify which course was paid for.

## What is actually reachable now

| Surface | Semantic presentationId | Routing evidence | Pool status |
| --- | --- | --- | --- |
| generic lesson reflection | `location/town/event/school-lesson-content-v1-after-school/default` | generic `actionCompleted: school` | 3-GIF target ready |
| generic School-life after paid lesson | `location/town/event/school-life-content-v1-after-paid-lesson/default` | generic `actionCompleted: school` | 3-GIF target ready |
| after Night study | `location/town/event/school-life-content-v1-after-night-study/default` | 24 exact Night choice IDs | 3–5-GIF target ready |
| eight paid lesson results | `school/<track>/lesson/default` | direct paid lesson result identity | 3–5 generic/track-aware candidates ready |
| named teacher/course event libraries | staged identities | no safe exact paid-course reaction route | prepare only; do not route |

## Fallback

All current School presentation families retain:
`assets/stage-school.svg`

as a safe static fallback.

Missing/disabled GIFs never change School mechanics.

## Product/content blockers

Still separate and unresolved:
- management/accounting public-result identity;
- Arcana/Forest public-result identity;
- final teacher relationship routes;
- certificate/project/exam participation if retained;
- final art style.

None of these blocks the reachable generic and exact-Night pool targets above.
