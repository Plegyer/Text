# Exact Night-Study RU/EN Reactive Depth v1

Task: C5-64
Baseline: `main@871a9a94e76e1df0449fdef513e9173bd9fce009`
Fixture: `content/school-exact-night-study-reactive-depth-v1.fixture.json`

Prepared one RU/EN title/body pair for every one of the 24 current exact School Night-study choice IDs.

Every entry carries its exact existing `nightChoiceCompleted(choiceId)` fact. No entry is attached to a generic paid-lesson fact.

The existing Night-study contract is unchanged:
- tuition 0;
- current-day Energy 0;
- selected supported stat +2;
- next-day Energy -1;
- existing `night_study_sessions` only;
- no career progress;
- no extra School progress;
- no NightFlow change.

Body Confidence choices explicitly keep confidence/sexuality/presentation separate from consent and Lust.

`selectedRuntimeConsumerId` remains null because this task prepares content only; integration may attach entries to exact existing choice identities without adding new trigger vocabulary.
