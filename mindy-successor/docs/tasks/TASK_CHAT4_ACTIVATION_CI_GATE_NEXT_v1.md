# TASK CHAT 4 — Activation CI Gate Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: completed `chat4/lead-activation-review-next`.
QA-only ownership. Do not edit production runtime/UI/content.

Lead branch under review:
`lead/product-activation-school-lumber-v2`

## Queue item 1 — Lead activation executable blocker recheck

Create:
- `docs/qa-prep/LEAD_PRODUCT_ACTIVATION_BLOCKER_RECHECK_v1.md`

Re-read the CURRENT Lead branch and mark every prior issue RESOLVED / STILL_BLOCKING / CHANGED.
Check semantic presentation persistence, schema-4 compatibility, typed School progress, School command/UI, NightFlow, Lumber activation, explicit pack inclusion, Hard Work = only 50 shifts, exact `hardWork:lumber`.

## Queue item 2 — activation CI evidence checklist

Create:
- `docs/qa-prep/PRODUCT_ACTIVATION_CI_EVIDENCE_v1.md`
- optional `prior-work/astra/prototype-m3.2/tests/qa-product-activation-ci-evidence.test.ts`

Define exact evidence needed before merge: typecheck, validate, build, full tests, shipped dist content, save compatibility, School/Night/Forest/Hard Work exactly-once proofs.

## Queue item 3 — shipped dist content audit

Create:
- `docs/qa-prep/PRODUCT_ACTIVATION_DIST_CONTENT_AUDIT_v1.md`
- optional `prior-work/astra/prototype-m3.2/tests/qa-dist-content-contract.test.ts`

Specify exactly what `dist/content.json` must contain after activation:
- target Lumber definitions;
- approved production Lumber packs exactly once;
- no fixture-only School pack;
- target presentation/media references remain valid;
- synthetic `school.lumber-management` absent.

## Queue item 4 — save/reload edge compatibility matrix

Create:
- `docs/qa-prep/PRODUCT_ACTIVATION_SAVE_EDGE_MATRIX_v1.md`
- optional `prior-work/astra/prototype-m3.2/tests/qa-product-save-edge-matrix.test.ts`

Cover:
- old schema-4 save without School state;
- pending semantic presentationId;
- active Activity;
- active NightFlow before/after lodging;
- School lesson committed;
- ending committed;
- completed Hard Work reward transaction.

Name exact invariant and expected parse/reload result.

## Queue item 5 — Product Acceptance regression subset plan

Create:
- `docs/qa-prep/PRODUCT_ACTIVATION_PA_REGRESSION_SUBSET_v1.md`
- `prior-work/astra/prototype-m3.2/tests/qa-product-activation-regression-subset.test.ts`

Build a compact runnable subset spanning Lumber, School, Night, Forest, presentation and endings. Use only existing IDs/contracts; do not fabricate blocked content.

## Queue item 6 — post-merge smoke checklist

Create:
- `docs/qa-prep/PRODUCT_ACTIVATION_POST_MERGE_SMOKE_v1.md`

Define the exact smoke sequence to run on merged main:
startup -> arrival -> Lumber shift -> School paid lesson -> NightFlow -> School Night study -> Forest entry/reload/result -> 49/50 Hard Work boundary -> ending completion -> save/reload.

Include expected semantic presentation IDs and exactly-once checks.

Continue sequentially through items 1–6 without waiting for Lead review.


## Queue item 7 — PR20 latest-head diff recheck

Create:
- `docs/qa-prep/PR20_LATEST_HEAD_RECHECK_v1.md`

Re-review PR #20 after the latest School Resolver/UI fixes. Mark every previous blocker and NOT-YET-IMPLEMENTED item as RESOLVED / STILL_BLOCKING with exact current commit/file evidence.

## Queue item 8 — shipped dist executable smoke contract

Create NEW test:
- `prior-work/astra/prototype-m3.2/tests/qa-shipped-dist-smoke-contract.test.ts`

After build, inspect `dist/content.json` expectations: target Lumber definitions, approved production packs, no synthetic School action, valid media, exact Hard Work rule/reward, Night/Activity definitions.

## Queue item 9 — worker checkpoint integration audit

Create:
- `docs/qa-prep/WORKER_CHECKPOINT_INTEGRATION_AUDIT_v1.md`

Compare current main/PR20 against completed Chat 2/3/5 checkpoint artifacts. Identify which worker tests/docs are still branch-only and which should be integrated after PR20. Avoid duplicative test integration.

## Queue item 10 — PA00–PA26 final blocker list

Create:
- `docs/qa-prep/PRODUCT_ACCEPTANCE_FINAL_BLOCKERS_v1.md`

For every PA row mark PASS_CANDIDATE / BLOCKED_BY_OPEN_AUTHORING / BLOCKED_BY_RUNTIME / NEEDS_LIVE_EVIDENCE. No row may pass solely because a fixture exists.

## Queue item 11 — production activation fault-injection plan

Create:
- `docs/qa-prep/PRODUCT_ACTIVATION_FAULT_INJECTION_v1.md`
- optional NEW QA test.

Cover failures during School payment, Night lodging, save between Night phases, Activity checkpoint, ending commit/completion and missing presentation media. Ensure atomic recovery expectations.

## Queue item 12 — release-candidate QA gate

Create:
- `docs/qa-prep/RELEASE_CANDIDATE_QA_GATE_v1.md`

Define the final exact gate after PR20 merge: full check, shipped smoke, PA regression subset, save compatibility, worker artifact integration, OPEN authoring ledger and post-merge smoke.

Continue items 7–12 sequentially without waiting for Lead review.
