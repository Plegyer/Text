# School Natural-Path Matrix v1

Date: 2026-09-29
Owner: Chat 5 / School + Text Localization Content Worker
Task: C5-09
Test: `tests/school-natural-path-lumber-v1.test.ts`
Exact current-main baseline: `95322727dc481b2ac54a9f764d31eb2067343149`

## Current first-class path

The current first-class School path has no separate typed enrollment object. School availability is gated by an active run, completed character creation, `story.arrived`, enough tuition, enough current-day Energy, and no conflicting active flow.

The legacy `school.enrolled` flag is not used as the first-class eight-course enrollment identity and is excluded from this matrix.

## Management natural-path matrix

| Step | Current identity | Status | Expected behavior |
|---|---|---|---|
| School available | `school.course.literacy_and_numbers` | ACTIVE | Literacy & Numbers is selectable in the current School path |
| Paid lesson | `schoolLesson` + exact course ID | ACTIVE | tuition 300 and current-day Energy 1 are charged once |
| Private School progress | `school.track.literacy_and_numbers.counters.lessons_completed` | ACTIVE | increments by 1 |
| School-owned management milestone/provider | not selected | BLOCKED_BY_PRODUCT_DECISION | no threshold or named milestone may be inferred |
| Durable public publication | current consumer key `lumber.school.management-ready`; School publisher missing | MISSING_PRODUCER | paid lesson must not emit it today |
| Resolver handoff | `worldFactAdded(lumber.school.management-ready)` | ACTIVE boundary family | once an approved publisher exists, current resolver can notify Lumber |
| Lumber consumer | `lumber-cross.school-management-return` | ACTIVE | opens on the public fact when Foreman route is professional |
| Player application | choice `apply` | ACTIVE | no extra paid School or Lumber action |
| Career-visible consequence | `management-school-ready`, `forewoman-problem-resolved` | ACTIVE Lumber-owned facts | written by Lumber, not School |

## Focused regression strategy

The regression has two explicit halves so it cannot create a false green.

First, it establishes the current professional Foreman route and completes one real `school.course.literacy_and_numbers` paid lesson through `schoolLesson`. It verifies that `lessons_completed` increments once, the normal School transaction applies, no extra Lumber shift occurs, and neither `lumber.school.management-ready` nor the downstream Lumber career facts appear. It also verifies that the C5-08 handoff fixture still has null provider, threshold, and publisher fields.

Second, it uses one explicitly labelled test-only injection of the already-existing public consumer transport key and invokes the existing `worldFactAdded` resolver boundary. It then verifies that `lumber-cross.school-management-return` opens, no extra money/Energy/School progress/Lumber shifts are charged, and choice `apply` writes the two current Lumber-owned career facts.

The injection demonstrates the already-existing downstream seam only. It is not a production School milestone or publisher.

## Arcana / Forest natural-path matrix

| Step | Current identity | Status |
|---|---|---|
| Paid Arcana lesson | `school.course.arcana` | ACTIVE |
| Private Arcana progress | `school.track.arcana.counters.lessons_completed` | ACTIVE |
| School Arcana milestone/provider | not selected | BLOCKED_BY_PRODUCT_DECISION |
| Durable Arcana public result | not selected | MISSING_PRODUCER / BLOCKED_BY_PRODUCT_DECISION |
| Direct Forest consumer | not selected | MISSING_CONSUMER / BLOCKED_BY_PRODUCT_DECISION |
| Forest Activity | `lumber.forest` | ACTIVE |
| Post-Activity success | `lumber.forest.success` -> `lumber.forest.truth-known` | ACTIVE |
| Lumber post-Activity consumer | `lumber-cross.activity-forest-return` | ACTIVE |

The later Activity result is intentionally not presented as the missing School Arcana result.

## Integration conclusion

The current architecture already provides:
- a real School lesson/private-progress segment;
- a real public world-fact/resolver boundary;
- a real Lumber consumer/career-consequence segment.

The missing management link is exactly one approved School-owned milestone/publication producer. No parallel progression state is required.
