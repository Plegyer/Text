# School Save/Reload Expectation Matrix v1

Date: 2026-09-29
Owner: Chat 5 / School + Text Localization Content Worker
Task: C5-11
Fixture: `content/school-save-reload-expectations-v1.fixture.json`
Exact current-main baseline: `95322727dc481b2ac54a9f764d31eb2067343149`

## Existing persisted School state

The current schema already persists School private progression under:
- `run.progression.school.tracks`;
- per-track `counters`, `facts`, `milestones`, `certificates`, and `choices`.

Current production actually writes only the counter identities:
- `lessons_completed`;
- `night_study_sessions`.

The current Save also persists public world facts, pending scenes/reaction state, last-action presentation identity, resources, stats, and Lumber-owned career facts.

## Expected reload behavior

| Boundary | Existing persisted state | Required expectation |
|---|---|---|
| Paid lesson committed | money, current-day Energy, stat gains, `lessons_completed`, action count, lastAction/presentation | reload never charges/applies progress twice |
| Night study committed | selected Night state while active, +2 supported stat, `night_study_sessions`, next-day consequence | reload never duplicates stat/progress/next-day penalty |
| Private milestone eligibility reached | selected School-owned provider state | reload before publication may allow one later publication |
| Durable public result committed | `run.progression.worldFacts` | reload after publication must not duplicate fact or reaction |
| Lumber consumer resolved | Lumber career facts | reload preserves career result without rewriting School state |
| School scene pending | pending scene + reaction epoch state | reload resumes the same scene without replaying lesson transaction |
| RU/EN/presentation-only content | no gameplay state | locale/presentation changes must not mutate Save |

## Runtime gaps found

### No typed School counter condition

Current `conditionSchema` has conditions for career/quest/relationship counters and facts, but no `schoolCounter`, `schoolFact`, or `schoolMilestone` condition.

Therefore, if Product chooses a `lessons_completed` threshold as the authoritative milestone provider, current authored pack conditions cannot read that typed School counter directly.

Chat 5 does not add a condition primitive.

### No School fact/milestone writer

Current `effectSchema` has `incrementSchoolCounter`, but no:
- `addSchoolFact`;
- `addSchoolMilestone`;
- `addSchoolCertificate`;
- `setSchoolChoice`.

The Save fields exist, but current content cannot authoritatively populate them through the ordinary effect vocabulary.

Chat 5 does not add effect primitives or Save fields.

### Provider/publication remains unresolved

Even if the runtime primitives existed, Product/Lead still has not selected:
- management provider/milestone/threshold/publication rule;
- Arcana provider/public result/direct Forest consumer.

No fixture value may fill those decisions.

### Exact-course reactive routing gap

Paid School lessons emit generic `actionCompleted: school`. The reaction boundary does not carry the exact paid course ID, so exact-course teacher/lesson reactive content cannot safely route from that fact alone.

This is a consumer/routing gap, not a reason to change Save.

## Integration guidance

If Product selects a provider that current primitives can already represent (for example, an explicitly approved stat-based condition), Integration can use the existing Save/public-world-fact boundary without a new Save field.

If Product selects a typed School counter/fact/milestone provider, Integration needs the smallest approved runtime primitive required to read/write the already-existing School progression structure. It must not create a parallel career-owned mirror of School progress.

C5-11 therefore identifies runtime gaps for Integration/QA and leaves runtime/schema unchanged.
