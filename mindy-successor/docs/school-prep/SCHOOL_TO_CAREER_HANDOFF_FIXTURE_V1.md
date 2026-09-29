# School-to-Career Handoff Fixture v1

Date: 2026-09-29
Owner: Chat 5 / School + Text Localization Content Worker
Task: C5-08
Fixture: `content/school-to-career-handoff-v1.fixture.json`

## Demonstrated seam

C5-08 uses the one current Lumber seam that already has both a public transport identity and a production consumer:
- School source line: `school.course.literacy_and_numbers` / `school.track.literacy_and_numbers`;
- current consumer transport key: `lumber.school.management-ready`;
- Lumber consumer event: `lumber-cross.school-management-return`;
- current downstream career facts: `management-school-ready`, `forewoman-problem-resolved`.

The fixture does not create any of these IDs.

## Ownership flow

The fixture encodes this ownership boundary:

```text
School private progress/result
-> approved School publisher
-> worldFactAdded(lumber.school.management-ready)
-> existing Lumber consumer event
-> player choice
-> Lumber-owned career facts
```

This is the existing public-fact/resolver model and requires no parallel School progression layer.

## Deliberately unresolved School producer

C5-08 does not choose:
- provider type;
- threshold;
- named milestone;
- publisher event ID;
- publication timing;
- whether the current transport key remains the final canonical School publication identity.

Those remain Product/Lead decisions.

The fixture includes the `addWorldFact` effect shape only to show how Integration can use the already-existing consumer transport key after an approved School result commits. It is not a production producer definition.

## Explicitly forbidden

The handoff forbids:
- Lumber reading `run.progression.school.tracks` directly;
- School writing `career:lumber` facts;
- School advancing Lumber career stage;
- shadow counters that duplicate `lessons_completed`;
- promotion of a fixture threshold into production.

## Arcana / Forest note

C5-08 does not fabricate an Arcana handoff because current production has no canonical direct Arcana School public result or direct Forest consumer. The later `lumber-cross.activity-forest-return` path remains an Activity-result consumer, not a School consumer.
