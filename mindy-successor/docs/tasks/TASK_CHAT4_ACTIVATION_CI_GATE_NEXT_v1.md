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


## Queue item 13 — PR21 Product Acceptance latest-head recheck

Create:
- `docs/qa-prep/PR21_PRODUCT_ACCEPTANCE_LATEST_HEAD_RECHECK_v1.md`

Review current PR #21 `lead/product-acceptance-gate-v1` against current main.

Check:
- harness uses first-class `schoolLesson`;
- shipped Lumber/Foreman/Night/Forest/ending evidence is real production catalog execution;
- capability accelerator is explicitly labeled and is not counted as PA09/PA17 pass;
- School public-fact blocker remains OPEN rather than fabricated;
- Hard Work remains only 50 completed shifts with exact `hardWork:lumber`;
- full CI result and exact test count.

Classify every PA00–PA26 row as:
- SHIPPED_PASS;
- ACCELERATOR_EVIDENCE_ONLY;
- OPEN_AUTHORING_BLOCKED;
- NOT_YET_PROVEN.

Do not patch production files.

## Queue item 14 — Product Acceptance blocker minimal-closure plan

Create:
- `docs/qa-prep/PRODUCT_ACCEPTANCE_MINIMAL_CLOSURE_PLAN_v1.md`

For every row still blocked after PR21, define the smallest product change required to close it without broadening scope.

At minimum distinguish:
- Old Boundary Token acquisition/capability/action-space behavior;
- School management/accounting public fact;
- deeper Forest route/challenge/season depth;
- item-dependent Activity action.

Do not invent unresolved thresholds/acquisition sources.

## Queue item 15 — Product Acceptance shipped-flow smoke script

Create:
- `docs/qa-prep/PRODUCT_ACCEPTANCE_SHIPPED_FLOW_SMOKE_v1.md`
- optional NEW test `prior-work/astra/prototype-m3.2/tests/qa-pa-shipped-flow-smoke.test.ts`

Define an executable smoke using only shipped content:
arrival -> Lumber shift -> milestone -> Foreman -> paid School lesson -> NightFlow normal lodging -> Foreman Night -> Forest entry failure without capability -> accelerated Forest mechanics proof -> Hard Work 49/50 -> commit/completion -> new run.

Clearly label the one accelerator boundary.

## Queue item 16 — Product Acceptance no-false-green audit

Create:
- `docs/qa-prep/PRODUCT_ACCEPTANCE_NO_FALSE_GREEN_AUDIT_v1.md`

Search all current PA/worker fixtures and identify any place where:
- direct worldFact injection;
- direct counter mutation;
- synthetic School action;
- fixture-only item capability;
- direct ending pre-state
could be mistaken for full product pass.

For each, classify whether it is a legitimate threshold accelerator or must remain non-passing evidence.

## Queue item 17 — release-candidate delta after PR21

Create:
- `docs/qa-prep/RELEASE_CANDIDATE_DELTA_AFTER_PR21_v1.md`

Compare the previous release-candidate QA gate to current state after PR20 + PR21 evidence.
Separate:
- closed runtime/integration gates;
- remaining authoring gates;
- remaining asset/polish gates;
- required post-merge test evidence.

## Queue item 18 — QA integration handoff manifest

Create:
- `docs/qa-prep/QA_INTEGRATION_HANDOFF_v1.md`

Deduplicate Chat 4 artifacts into:
- MUST_INTEGRATE;
- KEEP_AS_EVIDENCE;
- SUPERSEDED;
- FUTURE_GATE_ONLY.

Explicitly identify which documents are stale because they predate PR20 green 187/187 or PR21 green 193/193.

Continue items 13–18 sequentially without waiting for Lead review.


## Queue item 19 — PA closure branch live diff audit

Create:
- `docs/qa-prep/PA_CLOSURE_BRANCH_LIVE_DIFF_AUDIT_v1.md`

Review current `lead/product-acceptance-closure-v1` against main.

Focus on any generic item-capability / Activity-option runtime work:
- backward compatibility of schema4 saves;
- no forced item acquisition source;
- no invented consume semantics;
- current Forest content unchanged unless explicitly authored;
- authored options remain deterministic across reload;
- legacy `advance/escape` preserved.

Classify BLOCKER / NON-BLOCKER / AUTHORING-OPEN.

## Queue item 20 — generic item capability QA contract

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/qa-generic-item-capability-contract.test.ts`

Using current accepted contracts/fixtures, assert:
- capability derives from actual inventory item definitions;
- unknown capability rejects validation;
- multiple items may provide one capability;
- no capability exists merely because a worldFact is manually present;
- removing/consuming the item changes capability availability deterministically.

Do not patch shared runtime.

## Queue item 21 — Activity authored-option reload matrix

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/qa-activity-option-reload.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/qa-activity-option-reload.test.ts`

Cover:
- option visible before use;
- capability-gated option hidden without capability;
- option used once;
- reload after option;
- route selection preserved;
- duplicate option use rejected;
- legacy advance/escape remain available.

## Queue item 22 — PA false-green audit after capability runtime

Create:
- `docs/qa-prep/PA_FALSE_GREEN_AFTER_CAPABILITY_RUNTIME_v1.md`

Reassess PA09/PA14–PA20 after generic capability-aware runtime lands.

Important:
- runtime capability support does NOT mean Old Boundary Token acquisition is authored;
- authored Activity options do NOT mean 3-route/3-challenge Forest content exists;
- direct inventory seeding is still accelerator evidence unless the product acquisition path is real.

## Queue item 23 — release-candidate merge gate for PA closure

Create:
- `docs/qa-prep/PA_CLOSURE_RELEASE_GATE_v1.md`

Define exact merge requirements for the closure branch:
- full typecheck/validate/build/tests;
- schema4 backward compatibility;
- generic item capability tests;
- Activity option save/reload;
- no regression to Hard Work, School, Night, presentation;
- honest OPEN authoring ledger.

## Queue item 24 — QA handoff after capability closure

Create:
- `docs/qa-prep/QA_CAPABILITY_CLOSURE_HANDOFF_v1.md`

Deduplicate items 19–23 plus prior Chat4 evidence into:
- MUST_INTEGRATE;
- KEEP_AS_EVIDENCE;
- SUPERSEDED;
- WAIT_FOR_AUTHORING.

Continue items 19–24 sequentially without waiting for Lead review.
