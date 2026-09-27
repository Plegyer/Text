# School Authoring Batch Plan Template v1

Status: reusable parallel-production plan after Product decisions.
Rule: this template schedules approved work; it does not choose OPEN teachers, thresholds, providers, certificates, projects, exams, or public-result IDs.

## One-file-one-owner rule

Every production batch must declare:
- one owner per file for the duration of the batch;
- exact files created/edited;
- shared dependency files read but not owned;
- merge order when two batches depend on the same public ID or semantic presentation contract.

Do not let two batches independently author the same canonical ID.

## Batch A — Teacher identity batch

Required inputs:
- approved teacher/presenter identity decision;
- track/course assignment;
- world role;
- relationship-hook policy;
- presentation depth target.

Owned files:
- approved School content/presentation pack selected by Lead/Product;
- teacher/presenter data file if Product creates one;
- teacher-specific presentation copy/media metadata.

Read-only dependencies:
- `SCHOOL_EIGHT_TRACK_TEACHER_AUTHORING_MATRIX_v1.md`;
- `SCHOOL_TEACHER_LESSON_VARIANT_TEMPLATE_v1.md`;
- locked School course/track/presentation IDs.

Validation evidence:
- teacher ID is canonical and unique;
- no change to tuition/Energy/stat package;
- no new ordinary-course prerequisite unless explicitly approved;
- semantic presentation ID remains stable;
- fallback presentation works without timing dependency.

Dependencies:
- Product teacher decision.
- Independent from management/Arcana threshold choice unless the teacher is also authored into that milestone.

## Batch B — Repeatable lesson variant batch

Required inputs:
- approved teacher/presenter or narrator model;
- approved lesson-tone/content brief;
- existing course semantic presentation IDs.

Owned files:
- lesson variant content in the selected School content pack;
- presentation copy/media metadata;
- tests specific to variant eligibility/presentation.

Read-only dependencies:
- locked course mechanics;
- teacher identity batch output where applicable;
- `SCHOOL_CONTENT_PRODUCTION_UNIT_TEMPLATE_v1.md`.

Validation evidence:
- all eight course mechanics unchanged;
- scene resolution does not recharge tuition/Energy;
- `lessons_completed` increments once per paid lesson only;
- reload does not reroll/duplicate a committed paid transaction;
- variants do not fabricate milestones/public facts.

Dependencies:
- teacher batch only when the variant names a canonical teacher.
- Can otherwise run independently per course.

## Batch C — Milestone / project / exam batch

Required inputs:
- approved milestone form;
- owning track;
- threshold/value or completion rule;
- Night-study contribution policy;
- certificate/project/exam decision if applicable.

Owned files:
- selected School production authoring definition(s);
- milestone/project/exam presentation content;
- unit-specific tests.

Read-only dependencies:
- `SCHOOL_MILESTONE_TYPE_COMPARISON_PACKET_v1.md`;
- `SCHOOL_BALANCE_PARAMETER_LEDGER_v1.md`;
- locked typed School ownership.

Validation evidence:
- below/at/above eligibility where numeric;
- save/reload before and after completion;
- costs, if any, exactly once;
- no paid/Night counter cross-write;
- completion cannot silently publish a cross-system result unless separately approved.

Dependencies:
- Product milestone/threshold decision.
- May run in parallel across tracks once canonical IDs are assigned.

## Batch D — Public-result publication batch

Required inputs:
- approved School-owned provider;
- canonical stable public-result ID;
- publication timing;
- downstream consumer identity.

Owned files:
- School public-result publication definition;
- exactly-once publication tests;
- public-result presentation copy if any.

Read-only dependencies:
- `SCHOOL_PUBLIC_RESULT_PUBLICATION_CONTRACT_DRAFT_v1.md`;
- management or Arcana/Forest decision schema;
- provider content from Batch C when applicable.

Validation evidence:
- private School result commits first;
- durable public result publishes exactly once;
- reload before publication may publish once later;
- reload after publication cannot duplicate result/reaction;
- no tuition/Energy/progress replay;
- no direct downstream read of School-private counters.

Dependencies:
- provider batch completed or provider contract frozen.
- canonical result ID must be frozen before career consumers are authored.

## Batch E — Career integration batch

Required inputs:
- approved School public result;
- exact downstream career listener/condition;
- career-owned response.

Owned files:
- downstream career content/listener pack;
- career integration tests;
- player-facing continuation copy.

Read-only dependencies:
- `SCHOOL_TO_CAREER_INTEGRATION_INVENTORY_v1.md`;
- `SCHOOL_CAREER_HOOK_VALIDATION_CHECKLIST_v1.md`;
- frozen public-result contract from Batch D;
- authoritative career draft.

Validation evidence:
- career reads public result only;
- no School-private counter leakage;
- save/reload reaction idempotency;
- no duplicate School payment/progress;
- career-owned state changes only in career domain;
- Lumber Hard Work remains unchanged.

Dependencies:
- public-result batch contract frozen.
- Careers with no intended School dependency are excluded.

## Batch F — Presentation / GIF batch

Required inputs:
- approved content unit;
- semantic presentation ID;
- art priority;
- static/GIF/text fallback policy.

Owned files:
- media asset files;
- media registry/metadata in the selected owner pack;
- alt text;
- presentation QA.

Read-only dependencies:
- School content unit and semantic presentation slot catalog.

Validation evidence:
- semantic presentation ID unchanged;
- static fallback valid;
- text fallback valid;
- missing GIF does not affect gameplay;
- media timing never controls transaction/progress;
- reload preserves presentation identity.

Dependencies:
- can run after the relevant content unit has a stable semantic slot.
- Does not need milestone/provider balance decisions for ordinary lesson art.

## Parallelization matrix

| Batch | Can run in parallel with | Must wait for |
|---|---|---|
| Teacher identity | presentation planning, unrelated track teachers | teacher Product decision |
| Repeatable lesson variants | other course variants, presentation/GIF | teacher identity if named |
| Milestone/project/exam | other tracks' authored progression | provider/form/threshold decision |
| Public-result publication | unrelated public-result families | provider + canonical public ID |
| Career integration | different careers using frozen public results | publication contract + consumer decision |
| Presentation/GIF | other assets, lesson variants | stable semantic content unit |

## Batch handoff record

For every batch fill:
- Batch ID: OPEN
- Owner: OPEN
- Files owned: OPEN
- Inputs approved by: OPEN
- Canonical IDs frozen: OPEN
- Tests required: OPEN
- Dependencies satisfied: OPEN
- Ready to merge: OPEN
- Follow-up batch: OPEN

## Global guardrails

Every batch preserves:
- eight paid course IDs;
- locked tuition/Energy/stat packages;
- no ordinary Lust mutation;
- paid `lessons_completed` vs Night `night_study_sessions` separation;
- Night-study locked values;
- public/private ownership boundary;
- save/reload exactly once;
- semantic presentation stability;
- Lumber Hard Work independence.

A batch may request runtime work only after an approved authored behavior produces a concrete failing integration test that current runtime cannot express.
