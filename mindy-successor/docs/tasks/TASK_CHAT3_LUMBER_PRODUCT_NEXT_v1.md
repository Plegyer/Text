# TASK CHAT 3 — Lumber Product Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: current main after PR #19.
Locked constraints remain unchanged:
- Hard Work eligibility = ONLY `completed_shifts >= 50`;
- no milestone/relationship/season/Forest prerequisite for Hard Work;
- A5 return boundary = `activityResult`;
- A6 rewardId = exactly `hardWork:lumber`.

Do not edit Lead-owned shared runtime/schema/build/UI while `lead/product-activation-school-lumber` is active.

## Queue item 1 — production activation manifest

Create NEW files:
- `prior-work/astra/prototype-m3.2/content/lumber-production-activation.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/lumber-production-activation-contract.test.ts`

The manifest must name the exact Lumber target definitions/events that are candidates for shipped activation from current main:
- `lumber.shift`;
- career `lumber`;
- relationship `lumber.foreman`;
- Activity `lumber.forest`;
- Hard Work + Forewoman/Forest ending IDs;
- Lumber milestone, Foreman, Activity-return and Night event IDs;
- semantic presentation IDs.

Explicitly EXCLUDE the synthetic test action `school.lumber-management` from production activation.

Record unresolved dependencies rather than inventing them:
- final School-owned management/public fact ID remains OPEN;
- real item capability source/action if not yet shipped;
- any deeper Forest authoring not already locked.

Test that the manifest cannot accidentally add a second Hard Work prerequisite or alter `hardWork:lumber`.

## Queue item 2 — Forest Activity acceptance-depth suite

Create NEW files only:
- optional isolated fixture `prior-work/astra/prototype-m3.2/content/lumber-forest-acceptance.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/lumber-forest-acceptance-depth.test.ts`

Using current engine-compatible Activity behavior, prove:
- entry costs exactly 2 daytime Energy once;
- save/reload immediately after entry does not charge again;
- at least one intermediate checkpoint survives reload;
- success emits exact `activityResult` with `lumber.forest.success`;
- escape/failure never emit the success result/facts;
- post-success Lumber continuation costs 0 extra Energy;
- reload after result cannot duplicate rewards/progression;
- no School/relationship/ending condition is added to Hard Work.

Do not modify existing merged Lumber fixtures unless Lead explicitly returns ownership. After item 1 commit immediately continue to item 2.
