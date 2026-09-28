# School Residual Localization Consumer Map v1

Date: 2026-09-28
Owner: Chat 5 / School + Text Localization Content Worker
Exact current-main baseline: `5b22db9bbc2f7c306d25ca4d079e1eda2900b5d4`
Fixture: `content/school-residual-localization-v1.fixture.json`

## Existing current consumer

Current `src/ui/app.ts` function `mediaHTML(presentationId)` resolves accessibility text from the selected presentation candidate:

`const alt = m.altKey ? tr(m.altKey, m.alt) : mediaAlt(m.mediaId, m.alt)`

For image candidates the resolved text is written to the existing `img alt` attribute.

No new UI or resolver is needed.

## Exact item-200 key mapping

| Residual key | Exact current presentation ID | Existing asset | Existing consumer |
|---|---|---|---|
| `presentation.static.school-course-literacy-and-numbers.alt` | `school/literacy-and-numbers/lesson/default` | `assets/presentation/school-course-literacy-and-numbers.svg` | `mediaHTML()` → candidate `altKey` → localized `img alt` |
| `presentation.static.school-course-arcana.alt` | `school/arcana/lesson/default` | `assets/presentation/school-course-arcana.svg` | `mediaHTML()` → candidate `altKey` → localized `img alt` |
| `presentation.static.school-course-etiquette-and-presentation.alt` | `school/etiquette-and-presentation/lesson/default` | `assets/presentation/school-course-etiquette-and-presentation.svg` | `mediaHTML()` → candidate `altKey` → localized `img alt` |
| `presentation.static.school-course-arts-and-performance.alt` | `school/arts-and-performance/lesson/default` | `assets/presentation/school-course-arts-and-performance.svg` | `mediaHTML()` → candidate `altKey` → localized `img alt` |

All four presentation IDs are exact current `SchoolCourse.presentationId` values.

## Fallback behavior

Each current presentation slot already carries an embedded Russian `alt` fallback.

The localization patch only changes the root localized value resolved through the existing `altKey`.

No fallback identity or behavior changes.

## No-new-UI proof

Every item-200 key:
1. already exists in current root localization;
2. is already referenced by an active current School presentation slot;
3. is already consumed by `mediaHTML()`;
4. is already rendered into an existing accessibility attribute.

Therefore:
- no proposed key lacks a current consumer;
- no new UI surface is required;
- no consumer should be invented.

## Caption exclusion

Current caption localization keys are not consumed by `mediaHTML()`.

They are intentionally absent from item 200.

This queue does not add a caption renderer solely to consume existing caption strings.

## Other School text

Course labels/descriptions, panel controls, lesson result copy, Night-study labels/help, and event copy already have current consumers and complete RU+EN coverage.

They are not duplicated in the residual patch.

## Integration boundary

Consumer code does not need to change for item 200.

Only the four current localization values require selective production integration after exact-head revalidation.
