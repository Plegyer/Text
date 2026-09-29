# School Leadership Preparation Text Handoff v1

Date: 2026-09-29
Owner: Chat 5 / School + Text Localization Content Worker
Task: C5-04
Fixture: `content/school-leadership-preparation-text-v1.fixture.json`

## Existing path

All copy is anchored to the existing Literacy & Numbers line:
- `school.course.literacy_and_numbers`
- `school.track.literacy_and_numbers`
- existing drafted teacher: `school.teacher.mara-fen`

No management/accounting course is created.

## Prepared copy

The fixture contains complete RU/EN text for four content variants:
- ledger discrepancy / audit trail;
- budget prioritization under insufficient resources;
- an auditable handoff note for the next worker;
- a milestone-neutral result scene in which Mara recognizes that the work can be used by someone else.

The scenes deepen School as a standalone learning line: they focus on records, planning, explanation, transfer of responsibility, and decisions under constraints rather than simply naming stat gains.

## Milestone neutrality

The result copy explicitly avoids claiming:
- an exam;
- a certificate;
- a lesson-count threshold;
- a management title;
- a Lumber transition;
- publication of `lumber.school.management-ready`.

`selectedMilestoneId` and `selectedThreshold` remain null in the fixture.

After Product/Lead chooses the School provider, Integration may attach the milestone-neutral result text to that approved School-owned boundary without changing the course curriculum.

## Localization

All fixture keys contain both `ru` and `en` values. They are fixture-local preparation keys and are not added to root production localization by C5-04.

C5-10 will validate parity and stable IDs across all new School content fixtures.
