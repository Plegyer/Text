# School Prepared Content RU/EN Parity Regression v1

Date: 2026-09-29
Owner: Chat 5 / School + Text Localization Content Worker
Task: C5-10
Test: `tests/school-prepared-content-parity-v1.test.ts`

## Covered fixtures

The regression covers all player-facing text introduced by C5-04 through C5-07:
- `school-leadership-preparation-text-v1.fixture.json`
- `school-forest-knowledge-preparation-text-v1.fixture.json`
- `school-teacher-milestone-depth-v1.fixture.json`
- `school-night-study-content-depth-v1.fixture.json`

## Parity contract

For every prepared localization key the test requires:
- one non-empty RU value;
- one non-empty EN value;
- a valid stable School key shape;
- exact fixture reference coverage;
- no duplicate key across the new fixtures.

If a prepared key is later selectively integrated into root `content/localization.json`, the root value must exactly match the reviewed fixture pair.

## Stable identity contract

The regression locks the prepared content to existing identities only:
- Literacy & Numbers course/track + `school.teacher.mara-fen`;
- Arcana course/track + `school.teacher.ilyra-venn`;
- the five exact existing Night-study choice IDs covered by C5-07.

The test also requires all Product-open milestone/threshold/public-result fields to remain null in these fixtures and verifies the teacher-depth fixture has no mechanics effects or world-fact publication.

## Night-study invariants

The focused check preserves the current Night-study contract:
- no NightFlow change;
- zero tuition;
- zero current-day Energy cost;
- +2 supported stat;
- next-day Energy -1;
- no additional prepared progress effect.

This regression is content-side only and does not change runtime behavior.
