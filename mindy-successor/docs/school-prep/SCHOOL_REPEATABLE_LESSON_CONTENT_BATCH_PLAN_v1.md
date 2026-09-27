# School Repeatable-Lesson Content Batch Plan v1

Status: production planning values only. This document does not set final prose quotas or change School mechanics.

## Planning convention

For parallel authoring, use a bounded initial batch per track:

- **3 reusable text variants** per paid course as a planning target;
- **1 optional static/GIF presentation slot** per track for the initial art pass;
- text fallback is required for every variant;
- more/fewer variants may be approved later by Product/content review.

The number 3 is a production planning value, not a locked Product requirement.

## Per-track plan

| Track | Initial planning batch | Teacher dependency | Semantic presentation reuse | Mechanics validation | Relationship/career hooks |
|---|---|---|---|---|---|
| Literacy & Numbers | 3 reusable paid-lesson text variants; optional 1 media slot | OPEN teacher; variants may use narrator until approved | reuse `school/literacy-and-numbers/lesson/default` family | tuition 300; Energy 1; Reason +4; Wits +2 unchanged | outside base transaction unless explicitly authored |
| Arcana | 3 reusable paid-lesson text variants; optional 1 media slot | OPEN teacher; variants may use narrator until approved | reuse `school/arcana/lesson/default` family | tuition 500; Energy 1; Magic +4; Reason +4; Creativity +2 unchanged | outside base transaction unless explicitly authored |
| Rhetoric & Social | 3 reusable paid-lesson text variants; optional 1 media slot | OPEN teacher | reuse `school/rhetoric-and-social/lesson/default` family | tuition 300; Energy 1; Charm +3; Sociability +3; Wits +2 unchanged | outside base transaction unless explicitly authored |
| Etiquette & Presentation | 3 reusable paid-lesson text variants; optional 1 media slot | OPEN teacher | reuse `school/etiquette-and-presentation/lesson/default` family | tuition 400; Energy 1; Manners +3; Grooming +3; Charm +2 unchanged | outside base transaction unless explicitly authored |
| Field Craft | 3 reusable paid-lesson text variants; optional 1 media slot | OPEN teacher | reuse `school/field-craft/lesson/default` family | tuition 400; Energy 1; Dexterity +3; Wits +3; Creativity +2 unchanged | outside base transaction unless explicitly authored |
| Physical Training | 3 reusable paid-lesson text variants; optional 1 media slot | OPEN teacher | reuse `school/physical-training/lesson/default` family | tuition 400; Energy 1; Strength +3; Endurance +3; Dexterity +2 unchanged | outside base transaction unless explicitly authored |
| Arts & Performance | 3 reusable paid-lesson text variants; optional 1 media slot | OPEN teacher | reuse `school/arts-and-performance/lesson/default` family | tuition 500; Energy 1; Creativity +3; Charm +3; Sociability +2; Dexterity +2 unchanged | outside base transaction unless explicitly authored |
| Body Confidence | 3 reusable paid-lesson text variants; optional 1 media slot | OPEN teacher | reuse `school/body-confidence/lesson/default` family | tuition 400; Energy 1; Sexuality +3; Grooming +3; Endurance +2 unchanged | outside base transaction unless explicitly authored |

## Variant types inside the initial batch

Recommended production mix, not Product lock:

1. **Routine instruction variant**
   - establishes the track fantasy;
   - no new progression gate;
   - uses normal paid transaction.

2. **Practice/application variant**
   - different prose/media emphasis;
   - same paid mechanics;
   - may reference already-visible world context without creating a new prerequisite.

3. **Reflection/result variant**
   - acknowledges improvement or application;
   - does not fabricate milestone/certificate/public result;
   - remains repeatable unless separately authored otherwise.

A track may replace this mix if Product/content direction calls for another bounded set.

## Teacher dependency

Until canonical teachers are approved:
- variants may remain narrator/presenter-neutral;
- do not invent teacher names;
- do not make a teacher relationship a paid-course prerequisite.

After teacher approval:
- teacher identity may be inserted into the same content slots;
- mechanics and presentation IDs remain stable;
- teacher-specific conditional variants must remain presentation/content conditions unless a separate authored progression hook is approved.

## Semantic presentation reuse

Base repeatable paid lessons reuse the stable course presentation family.

Do not create a new gameplay course ID for each prose variant.

Variant-specific semantic IDs, if needed, should remain under the existing course namespace and must be stable across reload.

## Validation for every authored variant

- [ ] course ID unchanged
- [ ] track ID unchanged
- [ ] tuition unchanged
- [ ] current-day Energy = 1
- [ ] full stat package unchanged
- [ ] no ordinary Lust mutation added
- [ ] exactly one `lessons_completed` increment per paid lesson
- [ ] `night_study_sessions` unchanged
- [ ] no duplicated payment/progress on scene resolution
- [ ] pending scene reload deterministic
- [ ] presentation ID stable
- [ ] static/GIF/text fallback works
- [ ] media timing does not control mechanics
- [ ] variant does not fabricate milestone/certificate/public result

## Relationship / career reactions

Keep relationship/career reaction hooks **outside the base paid transaction** unless Product explicitly authors a reaction.

When a hook is approved:
- paid School transaction commits first;
- public/explicit reaction boundary follows;
- downstream domain owns its own state mutation;
- downstream never reads private School counters.

## Parallel production split

Suggested production lanes:
- Lane 1: Literacy & Numbers + Arcana
- Lane 2: Rhetoric & Social + Etiquette & Presentation
- Lane 3: Field Craft + Physical Training
- Lane 4: Arts & Performance + Body Confidence

Each lane owns only its track content files during the batch.

Shared semantic IDs and teacher identities must be frozen before parallel authors edit the same shared registry.

## Batch exit criteria

Initial content batch is complete when:
- bounded planning variants exist for every targeted track;
- all variants pass locked mechanics checks;
- no OPEN teacher/milestone/public-result choice has been silently filled;
- presentation fallback is valid;
- content owner records whether another authoring batch is desired.

Future variant count remains a Product/content planning decision.
