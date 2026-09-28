# School Result Text Gap Matrix v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `5b22db9bbc2f7c306d25ca4d079e1eda2900b5d4`

## Paid lesson result screen

All eight current course result identities use the same localized result consumer:

- title source: `schoolCourseLabel(course)` → `<courseId>.label`
- body source: `ui.school.lessonResult` with localized `{course}`
- fallback title: current catalog course label
- fallback body: Russian in-code fallback for `ui.school.lessonResult`

| Presentation ID | Course key | RU source | EN source | Stable localization exists | Raw/fallback debt |
|---|---|---|---|---|---|
| `school/literacy-and-numbers/lesson/default` | `school.course.literacy_and_numbers` | course label + `ui.school.lessonResult` | same keys, EN locale | yes | none |
| `school/arcana/lesson/default` | `school.course.arcana` | course label + `ui.school.lessonResult` | same keys, EN locale | yes | none |
| `school/rhetoric-and-social/lesson/default` | `school.course.rhetoric_and_social` | course label + `ui.school.lessonResult` | same keys, EN locale | yes | none |
| `school/etiquette-and-presentation/lesson/default` | `school.course.etiquette_and_presentation` | course label + `ui.school.lessonResult` | same keys, EN locale | yes | none |
| `school/field-craft/lesson/default` | `school.course.field_craft` | course label + `ui.school.lessonResult` | same keys, EN locale | yes | none |
| `school/physical-training/lesson/default` | `school.course.physical_training` | course label + `ui.school.lessonResult` | same keys, EN locale | yes | none |
| `school/arts-and-performance/lesson/default` | `school.course.arts_and_performance` | course label + `ui.school.lessonResult` | same keys, EN locale | yes | none |
| `school/body-confidence/lesson/default` | `school.course.body_confidence` | course label + `ui.school.lessonResult` | same keys, EN locale | yes | none |

Current runtime stores raw English `lastAction.title/text`, but the reachable School result screen does not render those raw fields when it can match the current course by `lastAction.presentationId`.

Classification: **LOCALIZED_CURRENT**.

## Paid-lesson reaction result events

### `school-lesson-content-v1.after-school`

Current localized keys:
- title: `event.school-lesson-content-v1.after-school.title`
- body: `event.school-lesson-content-v1.after-school.variant.default.text`
- choice label: `event.school-lesson-content-v1.after-school.choice.continue.label`
- choice outcome: `event.school-lesson-content-v1.after-school.choice.continue.text`

All have RU+EN pairs.

Fallback is the exact current pack English source.

Debt: **none**.

### `school-life-content-v1.after-paid-lesson`

Current localized keys:
- title: `event.school-life-content-v1.after-paid-lesson.title`
- body: `event.school-life-content-v1.after-paid-lesson.variant.default.text`
- choice label: `event.school-life-content-v1.after-paid-lesson.choice.continue.label`
- choice outcome: `event.school-life-content-v1.after-paid-lesson.choice.continue.text`

All have RU+EN pairs.

Fallback is the exact current pack English source.

Debt: **none**.

## School Night-study follow-up result

### `school-life-content-v1.after-night-study`

Current localized keys:
- title: `event.school-life-content-v1.after-night-study.title`
- body: `event.school-life-content-v1.after-night-study.variant.default.text`
- choice label: `event.school-life-content-v1.after-night-study.choice.continue.label`
- choice outcome: `event.school-life-content-v1.after-night-study.choice.continue.text`

All have RU+EN pairs.

Fallback is the exact current pack English source.

Debt: **none**.

## Journal note

The paid lesson runtime appends a raw English School journal row with `journalRef=null`:

`School: <course label>. Tuition <n>; Energy -1.`

That is a broader locale-neutral Journal-reference/runtime limitation, not a missing School presentation key in the currently assigned result/presentation surfaces.

This queue does not change Save/runtime journal identity.

## Result

Verified normal-player School result text debt:
- missing RU keys: 0
- missing EN keys: 0
- raw-ID result text: 0
- reachable result fallback-only seams: 0

The only residual School localization correction found by this wave is accessibility alt copy, handled separately in items 197–200.
