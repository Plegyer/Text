# School Accessibility Text Parity Audit v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `5b22db9bbc2f7c306d25ca4d079e1eda2900b5d4`

## Consumer rule

Current `mediaHTML()` resolves the selected media candidate alt as:

`m.altKey ? tr(m.altKey, m.alt) : mediaAlt(...)`

Current caption localization keys are **not rendered** by `mediaHTML()`.

Therefore:
- active alt keys are normal-player accessibility text;
- caption-only wording is NOT_PLAYER_VISIBLE on current main and is not a production-debt patch target in this queue.

## Active eight course alts

| Course presentation | Alt key | RU parity | EN parity | Action |
|---|---|---|---|---|
| Literacy & Numbers | `presentation.static.school-course-literacy-and-numbers.alt` | stale course name `Грамота и числа` | current meaning correct | correct RU course identity |
| Arcana | `presentation.static.school-course-arcana.alt` | correct | grammar `A Arcana` | correct EN article |
| Rhetoric & Social | `presentation.static.school-course-rhetoric-and-social.alt` | correct | correct | none |
| Etiquette & Presentation | `presentation.static.school-course-etiquette-and-presentation.alt` | stale course name `Этикет и подача` | grammar `A Etiquette` | correct RU identity + EN article |
| Field Craft | `presentation.static.school-course-field-craft.alt` | correct | correct | none |
| Physical Training | `presentation.static.school-course-physical-training.alt` | correct | correct | none |
| Arts & Performance | `presentation.static.school-course-arts-and-performance.alt` | correct | grammar `A Arts & Performance` | correct EN article |
| Body Confidence | `presentation.static.school-course-body-confidence.alt` | correct | correct | none |

## Approved corrected strings

### `presentation.static.school-course-literacy-and-numbers.alt`

RU:
`Учебная сцена курса «Грамотность и счёт» с характерными материалами и без изображения преподавателя.`

EN remains:
`A Literacy & Numbers lesson scene with course-specific materials and no depicted teacher.`

### `presentation.static.school-course-arcana.alt`

RU remains:
`Учебная сцена курса «Аркана» с характерными материалами и без изображения преподавателя.`

EN:
`An Arcana lesson scene with course-specific materials and no depicted teacher.`

### `presentation.static.school-course-etiquette-and-presentation.alt`

RU:
`Учебная сцена курса «Этикет и самопрезентация» с характерными материалами и без изображения преподавателя.`

EN:
`An Etiquette & Presentation lesson scene with course-specific materials and no depicted teacher.`

### `presentation.static.school-course-arts-and-performance.alt`

RU remains:
`Учебная сцена курса «Искусство и выступление» с характерными материалами и без изображения преподавателя.`

EN:
`An Arts & Performance lesson scene with course-specific materials and no depicted teacher.`

## Active generic Night-study alt

Presentation:
`location/town/event/school-life-content-v1-after-night-study/default`

Alt key:
`presentation.static.school-night-study-generic-v2.alt`

Current RU/EN are semantically aligned and require no change.

## Pack-media fallback alts

Current localized media alts:
- `media.school.lesson.context.default.alt`
- `media.school.life.classroom.default.alt`
- `media.school.life.night-study.default.alt`

All have RU+EN and no verified identity mismatch requiring this residual patch.

## Caption keys

Course and Night-study caption keys exist in root localization, but current `mediaHTML()` does not consume captions.

Classification:
- **NOT_PLAYER_VISIBLE**
- no residual production patch in this queue

This avoids creating changes that have no current consumer.

## Asset ownership

No media path, SVG, GIF, presentation slot, fallback media ID, or media selection is changed.

Chat 2 remains authoritative for asset production.

## Result

Verified residual active accessibility debt:
- 4 localization keys
- 2 RU corrections
- 3 EN corrections
- 0 media asset changes
- 0 new presentation identities
