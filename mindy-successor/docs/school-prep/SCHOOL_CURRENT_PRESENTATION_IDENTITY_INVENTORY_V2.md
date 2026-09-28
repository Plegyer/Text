# School Current Presentation Identity Inventory v2

Date: 2026-09-28
Owner: Chat 5 / School + Text Localization Content Worker
Exact current-main baseline: `5b22db9bbc2f7c306d25ca4d079e1eda2900b5d4`

## School panel identity

Shared panel identity:
- panel: `school`
- title key: `ui.school.title`
- help key: `ui.school.help`
- lesson button key: `ui.school.lessonButton`
- tuition/current-day Energy key: `ui.school.tuitionEnergy`

Lesson command identity:
- action/runtime identity: `school`
- course selection identity: exact `school.course.*` ID passed to `schoolLesson`

## Exact current eight course tracks

| Course ID | Track ID | Current stat effects | Lesson presentation ID |
|---|---|---|---|
| `school.course.literacy_and_numbers` | `school.track.literacy_and_numbers` | reason +4; wits +2 | `school/literacy-and-numbers/lesson/default` |
| `school.course.arcana` | `school.track.arcana` | magic +4; reason +4; creativity +2 | `school/arcana/lesson/default` |
| `school.course.rhetoric_and_social` | `school.track.rhetoric_and_social` | charm +3; sociability +3; wits +2 | `school/rhetoric-and-social/lesson/default` |
| `school.course.etiquette_and_presentation` | `school.track.etiquette_and_presentation` | manners +3; grooming +3; charm +2 | `school/etiquette-and-presentation/lesson/default` |
| `school.course.field_craft` | `school.track.field_craft` | dexterity +3; wits +3; creativity +2 | `school/field-craft/lesson/default` |
| `school.course.physical_training` | `school.track.physical_training` | strength +3; endurance +3; dexterity +2 | `school/physical-training/lesson/default` |
| `school.course.arts_and_performance` | `school.track.arts_and_performance` | creativity +3; charm +3; sociability +2; dexterity +2 | `school/arts-and-performance/lesson/default` |
| `school.course.body_confidence` | `school.track.body_confidence` | sexuality +3; grooming +3; endurance +2 | `school/body-confidence/lesson/default` |

Each course currently has:
- label key: `<courseId>.label`
- description key: `<courseId>.description`

No teacher identity is part of the current `SchoolCourse` production object.

## Reachable lesson result presentation

After a successful paid lesson, current runtime writes:
- `lastAction.id = school`
- `lastAction.presentationId = course.presentationId`

The result screen resolves:
- title: localized current course label
- body: `ui.school.lessonResult` formatted with localized course label
- media: exact course `presentationId`

Thus the eight course presentation IDs above are the exact current reachable lesson-result presentation identities.

### Course static presentation identities

| Presentation ID | Current static asset | Active alt key |
|---|---|---|
| `school/literacy-and-numbers/lesson/default` | `assets/presentation/school-course-literacy-and-numbers.svg` | `presentation.static.school-course-literacy-and-numbers.alt` |
| `school/arcana/lesson/default` | `assets/presentation/school-course-arcana.svg` | `presentation.static.school-course-arcana.alt` |
| `school/rhetoric-and-social/lesson/default` | `assets/presentation/school-course-rhetoric-and-social.svg` | `presentation.static.school-course-rhetoric-and-social.alt` |
| `school/etiquette-and-presentation/lesson/default` | `assets/presentation/school-course-etiquette-and-presentation.svg` | `presentation.static.school-course-etiquette-and-presentation.alt` |
| `school/field-craft/lesson/default` | `assets/presentation/school-course-field-craft.svg` | `presentation.static.school-course-field-craft.alt` |
| `school/physical-training/lesson/default` | `assets/presentation/school-course-physical-training.svg` | `presentation.static.school-course-physical-training.alt` |
| `school/arts-and-performance/lesson/default` | `assets/presentation/school-course-arts-and-performance.svg` | `presentation.static.school-course-arts-and-performance.alt` |
| `school/body-confidence/lesson/default` | `assets/presentation/school-course-body-confidence.svg` | `presentation.static.school-course-body-confidence.alt` |

## Reachable paid-lesson reaction events

Current production packs contain two nonblocking School reactions to `actionCompleted: school`:

### `school-lesson-content-v1.after-school`
- variant: `default`
- choice: `continue`
- media ID: `school.lesson.context.default`
- generic event presentation identity:
  `location/town/event/school-lesson-content-v1-after-school/default`
- no dedicated presentation slot override; current pack media/fallback remains authoritative

### `school-life-content-v1.after-paid-lesson`
- variant: `default`
- choice: `continue`
- media ID: `school.life.classroom.default`
- generic event presentation identity:
  `location/town/event/school-life-content-v1-after-paid-lesson/default`
- no dedicated presentation slot override; current pack media/fallback remains authoritative

Both event copy sets have current RU+EN localization.

## Exact current School Night-study choice identities

Current Night-study choice IDs are generated only from each course's current stat effects.

### Literacy & Numbers
- `school.night_study.literacy_and_numbers.reason`
- `school.night_study.literacy_and_numbers.wits`

### Arcana
- `school.night_study.arcana.magic`
- `school.night_study.arcana.reason`
- `school.night_study.arcana.creativity`

### Rhetoric & Social
- `school.night_study.rhetoric_and_social.charm`
- `school.night_study.rhetoric_and_social.sociability`
- `school.night_study.rhetoric_and_social.wits`

### Etiquette & Presentation
- `school.night_study.etiquette_and_presentation.manners`
- `school.night_study.etiquette_and_presentation.grooming`
- `school.night_study.etiquette_and_presentation.charm`

### Field Craft
- `school.night_study.field_craft.dexterity`
- `school.night_study.field_craft.wits`
- `school.night_study.field_craft.creativity`

### Physical Training
- `school.night_study.physical_training.strength`
- `school.night_study.physical_training.endurance`
- `school.night_study.physical_training.dexterity`

### Arts & Performance
- `school.night_study.arts_and_performance.creativity`
- `school.night_study.arts_and_performance.charm`
- `school.night_study.arts_and_performance.sociability`
- `school.night_study.arts_and_performance.dexterity`

### Body Confidence
- `school.night_study.body_confidence.sexuality`
- `school.night_study.body_confidence.grooming`
- `school.night_study.body_confidence.endurance`

Total exact current Night-study choices: **24**.

Their visible labels are not separate content identities; current UI composes them from:
- `ui.school.nightStudyChoice`
- localized course label
- localized stat label

## Reachable School Night-study presentation

All 24 exact current Night-study completions can trigger:

Event:
- `school-life-content-v1.after-night-study`

Variant:
- `default`

Choice:
- `continue`

Generic event presentation identity:
- `location/town/event/school-life-content-v1-after-night-study/default`

Current dedicated static:
- `assets/presentation/school-night-study-generic-v2.svg`

Active alt key:
- `presentation.static.school-night-study-generic-v2.alt`

This presentation is intentionally generic and does not claim a course-specific teacher or scene.

## Not promoted

This inventory does not promote:
- teacher staging;
- worker-only exact-course teacher identities;
- new course IDs;
- new presentation IDs;
- new School Night choices.

Only current production identities are recorded.
