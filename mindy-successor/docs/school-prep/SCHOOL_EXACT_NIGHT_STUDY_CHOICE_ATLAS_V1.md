# Exact Night-Study Choice Atlas v1

Task: C5-63
Baseline: `main@871a9a94e76e1df0449fdef513e9173bd9fce009`
Fixture: `content/school-exact-night-study-choice-atlas-v1.fixture.json`

Current production exposes 24 exact School Night-study choice identities across the eight existing courses.

Each identity follows:
`school.night_study.<course_slug>.<stat>`

The existing reaction vocabulary can match every one exactly through:
`nightChoiceCompleted(choiceId)`.

The atlas records for each choice:
- exact current course;
- exact current track;
- current canonical teacher content identity;
- selected stat;
- existing +2 stat gain;
- existing `night_study_sessions` counter;
- existing next-day Energy -1.

The runtime does not emit a separate teacher identity with the Night-study fact. Course identity is semantically encoded in the exact choice ID; teacher identity remains content metadata, not a runtime actor event.

No NightFlow, tuition, Energy, threshold, public-result or teacher-event rule is changed.
