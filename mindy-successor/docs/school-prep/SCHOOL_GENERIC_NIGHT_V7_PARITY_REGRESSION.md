# School Generic / Night-Study Parity Regression v1

Task: C5-71
Baseline: `main@871a9a94e76e1df0449fdef513e9173bd9fce009`
Test: `tests/school-generic-night-v7-parity.test.ts`

The focused regression locks C5-61 through C5-70 to current production identities and content-only boundaries.

It verifies:
- exactly two current production generic `actionCompleted: school` consumers;
- exact 24 Night-study semantic choice IDs and exact `nightChoiceCompleted(choice)` routing;
- existing Night-study +2 / next-day Energy −1 / zero tuition/current-day Energy contract;
- no teacher identity emitted by Night-study runtime facts;
- all starter and late ordinary-career transfer reflections use current career/action/course IDs;
- thresholds and public-result selections remain null;
- current School journal has no localization ref and remains English-template backed;
- exactly the two known RU course-name presentation inconsistencies are recorded;
- fixture-local tuition/Energy wording preserves current numeric rules;
- teacher tone v3 covers all eight current educator-only identities;
- 124 prepared queue-v7 localization keys are unique, RU/EN complete and collision-free against current root localization.

No runtime or production localization files are edited by this regression.
