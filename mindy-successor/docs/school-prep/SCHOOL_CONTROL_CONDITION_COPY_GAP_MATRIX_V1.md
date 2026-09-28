# School Controls and Condition-Copy Gap Matrix v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `5b22db9bbc2f7c306d25ca4d079e1eda2900b5d4`

## Current School panel controls

| Surface | Current stable key / source | RU+EN status | Residual debt |
|---|---|---|---|
| town School button | `ui.panel.school` | complete | none |
| town School subtitle | `ui.town.school.subtitle` | complete | none |
| School panel title | `ui.school.title` | complete | none |
| School panel help | `ui.school.help` | complete | none |
| course title | `school.course.<id>.label` | complete for all 8 | none |
| course description | `school.course.<id>.description` | complete for all 8 | none |
| stat gain labels | shipped `stat.<id>.label` | complete | none |
| tuition/Energy line | `ui.school.tuitionEnergy` | complete | none |
| lesson button | `ui.school.lessonButton` | complete | none |
| lesson result | `ui.school.lessonResult` | complete | none |
| Night-study choice label | `ui.school.nightStudyChoice` + course/stat labels | complete | none |
| Night-study context/help | `ui.school.nightStudyContext` | complete | none |
| Night-study button | `ui.school.nightStudyButton` | complete | none |

## Paid lesson eligibility

Current School lesson button is disabled by exact runtime state:
- active run;
- creation complete;
- arrival complete;
- no pending scene;
- no active Night flow;
- no active Activity;
- money >= exact course tuition;
- current-day Energy >= 1.

The current School card does **not** render a separate textual unmet-condition list for these checks.

Therefore:
- there is no player-facing missing School condition string to localize;
- creating tuition/arrival/pending-scene condition keys solely for this panel would invent a new surface.

Classification: **NO_NEW_UI / ZERO_DEBT**.

## Night-study eligibility

Current exact-course Night-study choices are filtered by their existing housing condition:
- `housingTier normal` OR
- `housingTier cheap`.

The Night-choice list only shows eligible choices; it does not render the unmet housing condition text on the School Night-study card.

If a shared condition surface renders that condition elsewhere, the already-shipped generic keys are semantically correct:
- `ui.condition.housingTier`
- `ui.condition.orSeparator`
- current `housing.*.label` keys.

Do not duplicate School-specific housing condition strings.

## Generic Night shell reused by School

Current shared Night shell already localizes:
- Night title/prompt;
- lodging;
- next-day Energy annotation;
- generic choice flow.

School adds only:
- `ui.school.nightStudyChoice`
- `ui.school.nightStudyContext`
- `ui.school.nightStudyButton`

All are complete RU+EN.

## Runtime error text

School runtime validation throws English diagnostic errors such as insufficient tuition/current Energy.

Those messages can surface through the generic command error toast, but they belong to the broader shared semantic runtime-error-code layer rather than a School control-copy key.

This queue does not translate arbitrary exception payloads or change runtime behavior.

## Result

Verified School controls/condition-copy residual keys needed: **0**.

All current School-specific normal-player controls are localized, and generic condition/UI keys should be reused rather than duplicated.
