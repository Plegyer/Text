# TASK CHAT 4 — Lead Activation Review Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: completed `chat4/activation-regression-next`.
QA-only ownership. Do not patch production runtime/UI/content.

Lead branch under review:
`lead/product-activation-school-lumber-v2`

## Queue item 1 — live Lead activation diff review

Create:
- `docs/qa-prep/LEAD_PRODUCT_ACTIVATION_DIFF_REVIEW_v1.md`

Review the current visible diff of `lead/product-activation-school-lumber-v2` against current main.

Check exact changes for:
- semantic `pendingScene.presentationId` persistence;
- schema-4 backward compatibility when School progression is absent;
- typed School progress counters;
- School command execution ordering / Resolver visibility;
- full stat package atomicity;
- Night-study counter separation;
- target Lumber production definitions activation;
- pack inclusion strategy;
- UI reachability for School, Lumber, Activity and Night;
- Hard Work unchanged: ONLY 50 completed shifts;
- exact `hardWork:lumber`.

For every issue mark BLOCKER / NON-BLOCKER / NOT-YET-IMPLEMENTED and cite exact file/function/test seam. Do not modify production files.

## Queue item 2 — activation sentinel QA test

Create NEW test file only:
- `prior-work/astra/prototype-m3.2/tests/qa-product-activation-sentinels.test.ts`

Using current merged fixtures/contracts only, add invariant sentinels that must remain true when Lead activation lands:
- Hard Work condition exactly one completed-shifts >= 50 condition;
- exact rewardId `hardWork:lumber`;
- School has exactly eight locked courses;
- paid lesson = tuition + 1 current-day Energy;
- Night study counter and paid lesson counter are distinct concepts;
- semantic presentationId validator must accept slash taxonomy without relaxing ordinary gameplay IDs;
- synthetic `school.lumber-management` must never appear in a production-activation allowlist fixture if present;
- target Lumber nested pack set must be explicit rather than accidentally including every fixture subdirectory.

The test must be green on the worker branch by validating accepted contracts/fixtures, not by pretending Lead runtime changes already exist.

After item 1 commit immediately continue to item 2 without waiting for Lead review.
