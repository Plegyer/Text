# School Production Continuity Pack v7

Status: current production continuity packet for School after Queue items 49–53.

## Technical baseline

Locked and already shipped:
- exactly eight paid courses;
- stable gameplay course IDs and one-to-one School track ownership;
- locked tuition and stat packages;
- exactly 1 current-day Energy per paid lesson;
- no ordinary School Lust mutation;
- paid lesson increments only `lessons_completed`;
- Night study increments only `night_study_sessions`;
- 24 Night-study course/stat choices;
- Night tuition/current-day Energy = 0;
- selected supported stat +2;
- next-day Energy -1;
- blocking School scene compatibility;
- save/reload exactly-once behavior;
- schema-4 missing School state safely defaults to `{tracks:{}}`;
- School-private progress is not a downstream career input.

## Eight-track authoring continuity

Authoring source:
- `SCHOOL_EIGHT_TRACK_TEACHER_AUTHORING_MATRIX_v1.md`.

For every track, teacher/presenter identity, world role, lesson tone, relationship hooks, milestone role and presentation needs remain OPEN until Product/authoring fills them.

Existing course mechanics and semantic lesson IDs remain unchanged.

## Milestone authoring continuity

Comparison source:
- `SCHOOL_MILESTONE_TYPE_COMPARISON_PACKET_v1.md`.

Accepted authored forms:
- lesson-count milestone;
- exam;
- project;
- certificate;
- mixed authored gate.

No form is preferred or selected.

Management/accounting and Arcana/Forest provider/threshold choices remain OPEN.

## Public-result continuity

Contract source:
- `SCHOOL_PUBLIC_RESULT_PUBLICATION_CONTRACT_DRAFT_v1.md`.

Required boundary:
`School private result -> one durable public publication -> downstream Resolver consumer`.

Required properties:
- stable public result identity;
- private trigger remains School-owned;
- exactly-once publication;
- reload idempotency;
- downstream systems consume only public state;
- no direct reads of `lessons_completed`, `night_study_sessions` or other School-private progress.

Management/accounting final result remains OPEN.
Arcana/Forest final result and direct Forest consumer remain OPEN.

## Reusable production unit

Template:
- `SCHOOL_CONTENT_PRODUCTION_UNIT_TEMPLATE_v1.md`.

Use one unit per authored School lesson/milestone/exam/project/certificate/reaction/public-result scene.

Each unit records:
- course/track;
- teacher/presenter;
- trigger;
- text variants;
- semantic presentation ID;
- static/GIF/text fallback;
- public result if approved;
- tests/acceptance.

Do not alter locked mechanics while filling content.

## School-to-career continuity

Inventory:
- `SCHOOL_TO_CAREER_INTEGRATION_INVENTORY_v1.md`.

Current draft landscape:
- Lumber has an explicit production-facing School hook boundary plus unresolved management/Arcana authoring;
- Geisha/Artist, Guard, Hunter, Merchant, adult-service, Satyr Maid, Tavern, Undead Farm and Palace contain draft School hooks that require authored results/conditions;
- Assassin and Secret Debt currently define no School dependency and must not receive one by inference.

Lumber Hard Work remains `completed_shifts >= 50` only.

## OPEN human decisions

Still require Product/authoring:
- management/accounting provider;
- management/accounting milestone type;
- management/accounting threshold/value;
- final management publication identity/rule;
- Arcana/Forest provider;
- Arcana/Forest milestone type;
- Arcana/Forest threshold/value;
- final Arcana/Forest public result;
- exact direct Forest consumer if the path is retained;
- teacher/presenter identities;
- certificate/project/exam inclusion.

No fixture, draft threshold or legacy metric fills these automatically.

## Next production-ready work after decisions

Once a decision is made:
1. fill the relevant decision schema;
2. create one or more School content production units;
3. author production content in the selected School/consumer pack;
4. preserve semantic presentation IDs;
5. add exactly-once public publication where cross-system;
6. add save/reload and no-duplicate tests;
7. verify downstream career consumes only public state;
8. verify Hard Work remains independent;
9. update Product Acceptance evidence using the real authored path.

## Parallel production lanes

After teacher decisions:
- all eight teacher/presentation units can be authored in parallel.

After management decision:
- School provider unit;
- public publication unit;
- Lumber management listener validation;
- PA07/PA08 acceptance evidence.

After Arcana/Forest decision:
- Arcana provider unit;
- public publication unit;
- explicit Forest consumer/option;
- Forest save/reload validation;
- integrated PA route evidence.

After certificate/project/exam decisions:
- content units may be authored per track in parallel as long as shared IDs/thresholds are fixed first.

## Continuity guard

Do not reopen runtime/schema/UI architecture unless a concrete integrated test shows the selected authored behavior cannot be represented by the current surfaces.

Until then, remaining School work is human decision + content authoring + QA.
