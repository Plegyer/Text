# TASK CHAT 3 — Lumber PA Scenario Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: completed `chat3/lumber-integration-prep-next`.
Previous checkpoint is frozen for Lead review.

Locked:
- Hard Work eligibility = ONLY `completed_shifts >= 50`;
- rewardId exactly `hardWork:lumber`;
- A5 continuation boundary = `activityResult`;
- no invented School management/certificate threshold.

Do not edit Lead-owned shared runtime/schema/build/UI.

## Queue item 1 — full Lumber PA scenario fixture

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/lumber-pa-scenario.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/lumber-pa-scenario-contract.test.ts`

Represent the Product Acceptance chain as an ordered scenario contract:
Lumber shift -> reactive milestone -> Foreman professional route -> School boundary -> optional Foreman Night -> Forest Activity -> activityResult continuation -> Hard Work + separate complex ending family.

For each step name:
- exact command/API;
- exact content IDs;
- Energy cost owner;
- save/reload checkpoint;
- expected reaction fact;
- semantic presentationId.

Where a production dependency is still OPEN, mark it explicitly as blocked; do not fabricate a fact ID or acquisition source.

## Queue item 2 — production-definition merge safety test

Create NEW test file only:
- `prior-work/astra/prototype-m3.2/tests/lumber-production-definition-merge-safety.test.ts`

Starting from current `content/definitions.json` + target Lumber definitions fixture, test a pure data merge helper local to the test that proves:
- `lumber.shift`, career, relationship, Activity and Lumber endings can be added without duplicate IDs;
- synthetic `school.lumber-management` is excluded;
- legacy `lumber` action collision is detected rather than silently overwritten;
- Hard Work condition/meta reward survive byte-for-meaning equality;
- existing unrelated definitions remain unchanged.

Do not implement the production merge in shared files. After item 1 commit immediately continue to item 2.
