# School Night-Study Content Depth Handoff v1

Date: 2026-09-29
Owner: Chat 5 / School + Text Localization Content Worker
Task: C5-07
Fixture: `content/school-night-study-content-depth-v1.fixture.json`

## Exact existing choices covered

Literacy & Numbers:
- `school.night_study.literacy_and_numbers.reason`
- `school.night_study.literacy_and_numbers.wits`

Arcana:
- `school.night_study.arcana.magic`
- `school.night_study.arcana.reason`
- `school.night_study.arcana.creativity`

These are existing active Night-study choices. No new Night choice is defined.

## Prepared content

Each exact choice now has one fixture-local RU/EN after-study text variant tied to the skill actually being practiced:
- reason: audit trail / falsifiable reasoning;
- wits: concise readable handoff notes;
- magic: separating expectation from observed magical evidence;
- creativity: finding a genuinely different test.

The copy keeps Night study as part of the School line instead of describing it only as a stat gain.

## Mechanics preserved

The fixture records the existing contract and adds no mechanics:
- tuition: 0;
- current-day Energy: 0;
- supported stat gain: +2;
- next-day Energy: -1;
- no additional School progress beyond the existing `night_study_sessions` increment;
- no NightFlow change.

It reuses the current generic Night-study presentation identity and does not request new media.

## Integration note

Current production has one generic after-Night-study event. The prepared text is keyed by exact existing Night choice IDs for a later selective content consumer. If the current event model cannot safely select exact-choice copy without separate authored event routing, Integration must report that consumer gap rather than changing NightFlow or Save.
