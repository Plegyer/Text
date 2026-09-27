# School Product-Authoring Handoff v6

Status: smallest current-main School handoff after PR #26 / PR #27 reconciliation.
Technical floor: **221/221**.

This handoff separates already-shipped mechanics from QA, human decisions, authored content, and optional presentation polish. It does not choose unresolved providers, thresholds, teachers, certificates, projects, exams, or Forest unlocks.

## LOCKED_AND_SHIPPED

- `mindy-successor/prior-work/astra/prototype-m3.2/src/core/school.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/src/core/schema.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/definitions.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/base.json`
- `mindy-successor/docs/school-prep/SCHOOL_TRACK_DATA_MAP_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_PROGRESSION_STRUCTURE_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_PRESENTATION_SLOT_CATALOG_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_PR27_MAIN_RECONCILIATION_v1.md`

These files/surfaces define the current School baseline:
- eight paid courses;
- locked tuition/Energy/stat packages;
- typed School progression ownership;
- 24 Night-study mechanics;
- blocking School scene compatibility;
- semantic presentation identity;
- schema-4 School default compatibility;
- no ordinary Lust gain.

## TECHNICAL_QA_GREEN

- `mindy-successor/prior-work/astra/prototype-m3.2/tests/qa-minimal-rc-acceptance-gate-v2.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/qa-schema4-omission-compat.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-blocking-scene-compat.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-activation-boundary.test.ts`
- `mindy-successor/docs/qa-prep/RC_CLOSEOUT_STATUS_v1.md`

Current technical QA status is green at **221/221** on the PR #27 floor.

These tests/docs prove the current accepted runtime floor. They do not fill missing Product authoring.

## HUMAN_DECISION_REQUIRED

- `mindy-successor/docs/qa-prep/RC_HUMAN_DECISIONS_REQUIRED_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_AUTHORING_DECISION_READY_PACKET_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_MANAGEMENT_RESULT_DECISION_SCHEMA_v1.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-management-result-decision-schema.fixture.json`
- `mindy-successor/docs/school-prep/SCHOOL_ARCANA_FOREST_RESULT_DECISION_SCHEMA_v1.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-arcana-forest-result-decision-schema.fixture.json`

Human/Product must still decide:
- management/accounting School provider;
- management/accounting milestone/threshold type and value;
- final durable management/accounting publication identity/rule;
- Arcana/Forest School provider;
- Arcana/Forest milestone/threshold type and value;
- whether the durable Arcana/Forest path remains in target scope;
- exact direct Forest consumer/option if retained;
- teacher/presenter identities;
- whether certificates/projects/exams participate in the authored path.

The management and Arcana/Forest decision schemas define acceptable answer shapes only. No preferred option is implied.

## CONTENT_AUTHORING_REQUIRED

- `mindy-successor/docs/school-prep/SCHOOL_CONTENT_DEPTH_AUTHORING_TEMPLATE_v1.md`

After Product decisions, fill the authoring template with:
- teacher identity/role per chosen track;
- lesson/presenter content;
- milestone/certificate/project/exam definitions selected by Product;
- presentation hooks;
- public-result publication points;
- acceptance notes.

Do not alter locked mechanics while filling content fields unless a separate approved mechanics task exists.

## OPTIONAL_PRESENTATION_POLISH

_No canonical current file; this category is intentionally empty until Product/art authors approved assets._

Optional future polish includes:
- teacher portraits;
- course stills;
- lesson/result stills;
- Night-study stills;
- GIF loops;
- milestone/certificate cards.

Semantic presentation routing already exists. These assets are not technical RC blockers while static/text fallback remains valid.

## READY_AFTER_DECISION

- `mindy-successor/docs/school-prep/SCHOOL_POST_DECISION_VERIFICATION_MATRIX_v1.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/lumber-cross-production.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/definitions.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/qa-minimal-rc-acceptance-gate-v2.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-blocking-scene-compat.test.ts`

Once Product makes a decision:
1. author the selected School production content;
2. update the exact downstream consumer only where the decision requires it;
3. run the post-decision verification matrix;
4. extend integrated PA evidence using the real authored path;
5. preserve no-double-charge/no-duplicate-progress behavior;
6. preserve save/reload idempotency and semantic presentation IDs.

Known current consumer surfaces:
- management: `lumber-cross.school-management-return` in `content/packs/lumber-cross-production.json`;
- current post-Forest continuation: `lumber-cross.activity-forest-return`;
- direct Arcana-School-to-Forest consumer remains OPEN.

## SUPERSEDED

- `mindy-successor/docs/school-prep/SCHOOL_INTEGRATION_HANDOFF_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_RELEASE_CANDIDATE_HANDOFF_v2.md`
- `mindy-successor/docs/school-prep/SCHOOL_FINAL_INTEGRATION_HANDOFF_v3.md`
- `mindy-successor/docs/school-prep/SCHOOL_FINAL_DECISION_EVIDENCE_HANDOFF_v4.md`
- `mindy-successor/docs/school-prep/SCHOOL_FINAL_EVIDENCE_PACK_v5.md`
- `mindy-successor/docs/school-prep/SCHOOL_RELEASE_READINESS_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_PA_BLOCKER_BURNDOWN_v1.md`

Superseded documents may remain as historical/regression context. They must not override v6 or the current-main PR #27 reconciliation.

## Minimal Lead/Product reading order

1. `docs/school-prep/SCHOOL_PR27_MAIN_RECONCILIATION_v1.md`
2. `docs/school-prep/SCHOOL_MANAGEMENT_RESULT_DECISION_SCHEMA_v1.md`
3. `docs/school-prep/SCHOOL_ARCANA_FOREST_RESULT_DECISION_SCHEMA_v1.md`
4. `docs/school-prep/SCHOOL_CONTENT_DEPTH_AUTHORING_TEMPLATE_v1.md`
5. `docs/school-prep/SCHOOL_POST_DECISION_VERIFICATION_MATRIX_v1.md`
6. this v6 handoff

## Locked guardrails after a decision

Do not change without separate approved mechanics work:
- exactly eight paid courses;
- exact locked tuition/stat packages;
- one current-day Energy per paid lesson;
- no ordinary Lust mutation;
- paid lesson -> `lessons_completed` only;
- Night study -> `night_study_sessions` only;
- Night +2 supported stat, zero tuition/current-day Energy, next-day Energy -1;
- blocking School scene must resolve before NightFlow;
- save/reload exactly once;
- Lumber/Forest cannot read School-private counters;
- Hard Work cannot gain a School prerequisite;
- stable gameplay and semantic presentation IDs.

## Current unresolved values

Management/accounting:
- provider: **OPEN**;
- milestone type: **OPEN**;
- threshold: **OPEN**;
- final School publication identity/rule: **OPEN**.

Arcana/Forest:
- provider: **OPEN**;
- milestone type: **OPEN**;
- threshold: **OPEN**;
- final School public result: **OPEN**;
- direct Forest consumer/unlock: **OPEN**.

Content depth:
- teachers: **OPEN**;
- certificates: **OPEN**;
- projects: **OPEN**;
- exams: **OPEN unless Product explicitly chooses them**.

No fixture value or legacy threshold fills these fields automatically.
