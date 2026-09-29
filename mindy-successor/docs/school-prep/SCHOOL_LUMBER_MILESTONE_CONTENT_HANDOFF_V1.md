# School-to-Lumber Milestone Content Handoff v1

Date: 2026-09-29
Owner: Chat 5 / School + Text Localization Content Worker
Task: C5-03
Exact current-main baseline: `95322727dc481b2ac54a9f764d31eb2067343149`
Fixture: `content/school-lumber-milestone-handoff-v1.fixture.json`

## Result

C5-03 prepares a non-production content-side fixture that binds the approved Lumber needs to exact existing School course/track identities and exact existing downstream seams without inventing a provider, threshold, certificate, project, exam, career state, or public fact.

The fixture is intentionally decision-incomplete. Null fields are required sentinels for values that Product/Lead has not selected.

## Management handoff shape

Existing School source:
- `school.course.literacy_and_numbers`
- `school.track.literacy_and_numbers`
- reusable teacher content: `school.teacher.mara-fen`
- existing private progress identity: `lessons_completed`

Existing Lumber consumer contract:
- transport key already consumed by production: `lumber.school.management-ready`
- consumer event: `lumber-cross.school-management-return`
- downstream career facts: `management-school-ready`, `forewoman-problem-resolved`

Still deliberately unset:
- School-owned provider type;
- milestone/result type;
- threshold/value;
- publication timing/rule.

The fixture does not assert that `lumber.school.management-ready` is produced by any current School milestone. It records only the already-existing consumer transport key.

## Arcana / Forest handoff shape

Existing School source:
- `school.course.arcana`
- `school.track.arcana`
- reusable teacher content: `school.teacher.ilyra-venn`
- existing private progress identity: `lessons_completed`

Existing later Forest/Lumber result path:
- Activity: `lumber.forest`
- Activity success: `lumber.forest.success`
- Activity-owned public fact: `lumber.forest.truth-known`
- post-Activity consumer: `lumber-cross.activity-forest-return`

Still deliberately unset:
- whether a durable Arcana School result remains in scope;
- School provider/milestone;
- threshold/value;
- final School public result ID;
- exact direct Forest consumer;
- publication timing/rule;
- Night-study contribution.

The existing `lumber.forest.truth-known` fact is recorded as an Activity output only and is not reused as a School result.

## Integration contract

When Product resolves a provider:
1. use the existing School course/track as the source line;
2. evaluate only School-owned private eligibility;
3. commit the School result first;
4. publish exactly one durable public result through the existing public-fact/resolver family;
5. let Lumber/Forest consume that public result;
6. never read `run.progression.school.tracks[*].counters` directly from Lumber content.

No parallel progression layer is defined by this fixture.

## Blocker

Canonical milestone definitions are blocked by explicit Product decisions. This task therefore supplies the exact decision-ready fixture shape and existing IDs while preserving null sentinels for every unresolved canonical value.

This blocker does not prevent C5-04 through C5-07 player-facing text work, which can remain milestone-neutral.
