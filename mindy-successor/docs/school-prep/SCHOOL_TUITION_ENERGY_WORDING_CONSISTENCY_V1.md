# School Tuition / Energy Wording Consistency v1

Task: C5-69
Baseline: `main@871a9a94e76e1df0449fdef513e9173bd9fce009`
Fixture: `content/school-tuition-energy-wording-consistency-v1.fixture.json`

Prepared fixture-local RU/EN wording for paid lesson preview/completion and Night-study preview/completion.

Fixture-local convention:
- RU tuition term: `Стоимость`;
- EN tuition term: `Tuition`;
- the game-resource name is written as `Energy` in both languages;
- current-day and next-day Energy are always distinguished explicitly.

Numeric rules are copied from current production and remain unchanged:
- paid lesson: course tuition + 1 current-day Energy;
- Night study: 0 tuition, 0 current-day Energy, +2 selected stat, −1 next-day Energy.

No production localization or mechanics are changed.
