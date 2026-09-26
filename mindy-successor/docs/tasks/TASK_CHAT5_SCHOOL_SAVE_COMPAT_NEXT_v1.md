# TASK CHAT 5 — School Save Compatibility Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: completed `chat5/school-activation-prep-next`.
Previous checkpoint is frozen for Lead review.

Locked School mechanics remain unchanged.
Do not edit Lead-owned shared runtime/schema/build/UI.

## Queue item 1 — School typed-state compatibility fixture

Create NEW files:
- `prior-work/astra/prototype-m3.2/content/school-typed-state-compat.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-typed-state-compat.test.ts`

Model the accepted School-owned track state shape:
- trackId;
- counters including `lessons_completed` and `night_study_sessions`;
- facts;
- milestones;
- certificates;
- choices.

Prove with fixture-level validation:
- missing School progression in an older schema-4-shaped save can be defaulted without altering other progression domains;
- eight course gameplay IDs map to stable track IDs;
- paid lesson and Night study counters remain separate;
- no final milestone/certificate thresholds are invented.

Do not patch schema.

## Queue item 2 — School activation end-to-end expectation matrix

Create NEW files:
- `prior-work/astra/prototype-m3.2/content/school-activation-expectations.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-activation-expectations.test.ts`

For all eight paid courses and representative Night-study choices, define and verify expected production behavior:
- command/course ID;
- tuition;
- current-day Energy;
- stat deltas;
- School-owned counter delta;
- reaction fact family;
- semantic presentationId;
- save/reload exactly-once expectation;
- no Lust mutation.

This is an expectation/contract fixture only; do not implement shared runtime/UI.

After item 1 commit immediately continue to item 2.
