# Lumber School Dependency Map v1

Date: 2026-09-29
Owner: Chat 5 / School + Text Localization Content Worker
Task: C5-02
Exact current-main baseline: `95322727dc481b2ac54a9f764d31eb2067343149`
Depends on: `SCHOOL_EXACT_CURRENT_IDENTITY_INVENTORY_V1.md`

## Scope

This map matches the two approved Lumber-facing School needs to existing School content and current runtime/public-result seams. It does not create a course, threshold, milestone, certificate, career state, Forest route, Save field, NightFlow rule, or new public fact.

## Dependency rule

School remains the source owner. Lumber may consume only an existing/publicly published result through the current resolver/public-fact boundary. Lumber must not read School-private counters, milestones, certificates, or choices directly.

## Need A — leadership / accounting / management preparation

### Existing School capability match

Primary existing course:
- course: `school.course.literacy_and_numbers`
- track: `school.track.literacy_and_numbers`
- active paid stat package: reason +4; wits +2
- current authored course description: practical literacy, numeracy, record work, and clear explanation
- reusable drafted teacher identity: `school.teacher.mara-fen`
- reusable authored lesson themes already present in staging: ledger checking, clear notices, budget prioritization

Classification:
- course/track capability: `ACTIVE`
- teacher/lesson authored material: `REUSABLE`
- required School public result producer: `MISSING_PRODUCER` + `BLOCKED_BY_PRODUCT_DECISION`

This is the strongest existing School match for accounting/management preparation. No new management/accounting course is required to represent the conceptual need.

### Complementary existing capability

`school.course.rhetoric_and_social` / `school.track.rhetoric_and_social` is a complementary communication/leadership-support capability because it already trains speaking, listening, social reading, and adaptive delivery. It is not selected as the accounting provider and does not publish the Lumber management result.

Classification:
- complementary capability: `REUSABLE`
- authoritative provider: `NOT_SELECTED`

### Current Lumber consumer seam

Current production listener:
- event: `lumber-cross.school-management-return`
- trigger: `worldFactAdded`
- transport key: `lumber.school.management-ready`
- relationship condition: `lumber.foreman` stage `route-professional`
- downstream Lumber career facts:
  - `management-school-ready`
  - `forewoman-problem-resolved`

Classification:
- listener/consumer: `ACTIVE`
- School-side producer for `lumber.school.management-ready`: `MISSING_PRODUCER`
- provider/milestone/threshold/publication rule: `BLOCKED_BY_PRODUCT_DECISION`

The existing transport key is a current consumer contract. It does not prove which School milestone/provider should publish it.

### Missing design decision

The missing item is not a course. Product/Lead must still select:
1. the School-owned provider category;
2. milestone/result type;
3. threshold/value, if any;
4. authoritative School publication timing/rule;
5. whether the current transport key `lumber.school.management-ready` remains canonical.

Chat 5 must not infer these values from fixture thresholds, legacy `metrics.lessons`, stat gains, or old exam content.

## Need B — forest / knowledge / magic / reasoning preparation

### Existing School capability match

Primary existing course:
- course: `school.course.arcana`
- track: `school.track.arcana`
- active paid stat package: magic +4; reason +4; creativity +2
- current authored course description: observation, magical theory, careful experimentation, and testing hypotheses
- reusable drafted teacher identity: `school.teacher.ilyra-venn`
- reusable authored lesson themes already present in staging: observation before theory, predicting controlled failure, designing a distinguishing test

Classification:
- course/track capability: `ACTIVE`
- teacher/lesson authored material: `REUSABLE`
- durable School Arcana public result: `MISSING_PRODUCER` + `BLOCKED_BY_PRODUCT_DECISION`
- direct Forest consumer: `MISSING_CONSUMER` + `BLOCKED_BY_PRODUCT_DECISION`

No new forest-knowledge or magic-reasoning course is required to represent the conceptual need.

### Supporting existing capabilities

Existing courses that can support the broader Forest fantasy without replacing Arcana as the knowledge/magic match:
- `school.course.field_craft`: dexterity, wits, creativity; observation/routes/tools/improvisation
- `school.course.literacy_and_numbers`: reason/wits; records and clear analysis
- `school.course.physical_training`: strength/endurance/dexterity for physical Lumber/Forest challenges

These are `REUSABLE` supporting capabilities only. C5-02 does not combine them into a new curriculum or choose a compound milestone.

### Current Forest/Lumber seam

Current production identities:
- activity: `lumber.forest`
- success result: `lumber.forest.success`
- Activity-owned world fact: `lumber.forest.truth-known`
- post-Activity listener: `lumber-cross.activity-forest-return`
- downstream Lumber career facts:
  - `forest-truth-known`
  - `forest-problem-resolved`

These are `ACTIVE`, but they occur after Forest Activity success. They are not a School Arcana result and must not be relabeled as one.

There is currently no canonical direct Arcana-School public result and no direct Arcana-School condition/listener on a Forest route, option, challenge, or interpretation step.

### Missing design decision

The missing item is not a course. Product/Lead must still decide:
1. whether a durable Arcana School result remains in target scope;
2. the School-owned provider/milestone category;
3. threshold/value, if any;
4. final public result ID/publication rule;
5. whether Night study contributes;
6. the exact direct Forest consumer/listener/option if retained.

Chat 5 must not invent a Forest unlock ID or repurpose `lumber.forest.truth-known` as a School producer.

## Existing physical Lumber support

The existing cross-system design also names Physical Training as a possible early physical Lumber profile support:
- `school.course.physical_training`
- `school.track.physical_training`
- strength +3; endurance +3; dexterity +2

This capability is `REUSABLE` for stat-based profile checks if Integration/Product already has or later approves such a condition. It does not replace required Lumber shift progression and does not satisfy either missing public-result decision above.

## Exact dependency matrix

| Lumber need | Existing School source | Existing School capability | Current downstream seam | Gap |
|---|---|---|---|---|
| Accounting / management preparation | `school.course.literacy_and_numbers` / `school.track.literacy_and_numbers` | reason +4, wits +2; records, numeracy, planning, clear explanation | `lumber-cross.school-management-return` consuming `lumber.school.management-ready` | School producer/provider/threshold/publication decision missing |
| Leadership communication support | `school.course.rhetoric_and_social` / `school.track.rhetoric_and_social` | charm +3, sociability +3, wits +2 | no separate required Lumber public-result seam selected | complementary only; do not invent another gate |
| Forest knowledge / magic / reasoning | `school.course.arcana` / `school.track.arcana` | magic +4, reason +4, creativity +2; observation and hypothesis testing | no direct School->Forest consumer; later `lumber-cross.activity-forest-return` consumes Activity success only | School producer + direct Forest consumer decision missing |
| Forest practical support | `school.course.field_craft` / `school.track.field_craft` | dexterity +3, wits +3, creativity +2; routes/tools/observation | existing Forest Activity route/options | supporting capability only; no new gate selected |
| Early physical Lumber support | `school.course.physical_training` / `school.track.physical_training` | strength +3, endurance +3, dexterity +2 | current Lumber shift/career runtime | optional stat-support role only; no new transition selected |

## No-course-gap finding

C5-02 finds no true missing course for the two approved conceptual Lumber needs.

The current gap is publication/consumption design:
- management/accounting: existing course capability + existing Lumber consumer, but missing School producer/provider rule;
- Arcana/Forest: existing course capability, but missing School producer and missing direct Forest consumer.

Therefore no new course/curriculum is justified by the current queue.

## Integration-ready facts

Integration can rely on these already-existing identities without inventing parallel progression:
- `school.course.literacy_and_numbers`
- `school.track.literacy_and_numbers`
- `school.course.arcana`
- `school.track.arcana`
- current typed counters `lessons_completed` / `night_study_sessions`
- current public world-fact resolver family
- `lumber-cross.school-management-return`
- current consumer transport key `lumber.school.management-ready`
- `lumber.forest` and `lumber-cross.activity-forest-return` as the existing post-Activity seam

Integration must not treat private School counters as Lumber-owned state.

## Blockers for later queue items

C5-03 cannot author a canonical production management or Arcana milestone fact/threshold until Product/Lead selects the provider/publication values. It can still prepare neutral content-side fixture shapes and handoff contracts using explicit placeholders/non-production fixtures.

C5-04 through C5-07 can proceed independently as player-facing content preparation around the existing Literacy & Numbers and Arcana course paths, provided the text does not claim an unapproved threshold/certificate/result.

C5-08 through C5-11 can proceed with existing consumer seams and explicit unresolved producer placeholders, without changing runtime or Save.
