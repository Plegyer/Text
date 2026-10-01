# School Localization v10 Regression Scope

Baseline: `main@6afc01061646bc52cec824863bf89e8ad8c309d0`
Queue: C5-97 through C5-108

## Exact current identities

- 8 School course IDs;
- 8 existing teacher identities;
- 24 exact `school.night_study.*` choices;
- 10 ordinary careers in the merged School transfer atlas.

## Content-side validation

Focused regressions:
- `tests/school-localization-v10-collision.test.ts`
- `tests/school-localization-v10-ownership.test.ts`
- `tests/school-localization-v10-coverage.test.ts`

They verify:
- stable current IDs and no duplicates;
- 48 prepared C5-100 RU/EN keys are complete, unique and collision-free;
- Night-study preparation maps exactly to current definitions;
- current career/action identities exist;
- thresholds and producer/public-result selections remain null;
- no active gameplay write arrays are introduced;
- runtime, Save, RNG, NightFlow, Energy, progression, career/Activity/economy, root localization and presentation/media ownership remain outside Chat 5;
- accessibility/terminology debt remains audit-only;
- C5-97 through C5-107 all have durable Git evidence before freeze.

## Forbidden changes

- RunState / Save schema;
- RNG;
- NightFlow;
- Energy/stat mechanics;
- career state machine;
- Activity state;
- economy/prices;
- ending logic;
- Forest/Poverty ownership;
- Presentation/Media ownership;
- new curriculum/course/teacher canon;
- producer/public-result state.

C5-108 requires one exact green CI head before freeze.
