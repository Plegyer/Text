# Static media RU EN invariance QA v1

Status: COMPLETE / GREEN_PRESENTATION_INVARIANCE_CONTRACT

Reviewed Lead head:
`5ea2a18e214fca6d656a8751ff5c2dd1f4abce31`.

## Core invariant

RU↔EN may change accessibility/presentation text only.

It must not change:
- presentationId;
- physical asset src;
- semantic slot;
- candidate key;
- Save;
- gameplay RNG;
- mechanics.

Lead static overrides store one locale-neutral `src` and one locale-neutral `altKey`.

Renderer localizes only the text resolved from altKey.

## Representative checks

### Career
`job/lumber/result/default`
- src: `assets/presentation/career-lumber-result.svg`
- altKey: `presentation.static.career.lumber.result.alt`

### School
`school/literacy-and-numbers/lesson/default`
- src: `assets/presentation/school-day-study.svg`
- altKey: `presentation.static.school.day.alt`

### Poverty
`location/town/event/poverty-street-production-helpful-summer/default`
- src: `assets/presentation/poverty-street.svg`
- altKey: `presentation.static.poverty.street.alt`

### Forest
`activity/forest/return/success`
- src: `assets/presentation/forest-result-success.svg`
- altKey: `presentation.static.forest.result.success.alt`

### Foreman
`relationship/lumber-foreman/lumber-night-foreman-professional/default`
- src: `assets/presentation/foreman-night-professional.svg`
- altKey: `presentation.static.foreman.night-professional.alt`

For all five families, RU and EN share the exact same slot and source path.

## Accessibility text

Lead root localization contains the exact reviewed RU+EN alt/caption values for all 21 assets.

Missing RU: 0.
Missing EN: 0.

No locale-specific asset path is present.

## Animation behavior

The Lead regression requires each static slot to resolve the same static source with animations enabled and disabled.

For future GIF pools, altKey is metadata only and remains outside deterministic candidate selection.

## Gameplay invariance

Static media resolution has no gameplay-owned fields and no Save write.

Changing locale re-renders localized alt text but does not dispatch a command.

Existing School, poverty and Foreman locale regressions already protect gameplay Save around locale switches on those gameplay surfaces.

## Runtime acceptance requirement

The production PR should retain at least representative browser/runtime assertions that:
- image `src` is unchanged across RU↔EN;
- presentationId/slot remains unchanged;
- rendered alt changes to the expected locale;
- serialized gameplay Save remains unchanged.

## Verdict

`GREEN_PRESENTATION_INVARIANCE_CONTRACT`.

Lead data/schema design is locale-neutral. Exact PR-head runtime/CI remains the final production acceptance layer.
