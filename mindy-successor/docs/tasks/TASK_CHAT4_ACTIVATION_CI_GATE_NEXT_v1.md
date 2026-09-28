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


## Queue item 25 — PR22 merged-main recheck

Create:
- `docs/qa-prep/PR22_MERGED_MAIN_RECHECK_v1.md`

Review current main after PR #22 merge.

Confirm:
- typecheck/validate/build/200 tests evidence;
- generic item capability derives from actual inventory definitions;
- old active Activity save behavioral compatibility;
- Forest entry/logging-road direct path;
- capability-gated old-boundary route;
- no invented acquisition/consume semantics;
- Hard Work unchanged.

## Queue item 26 — post-PR22 PA row reclassification audit

Create:
- `docs/qa-prep/PA_POST_PR22_ROW_RECLASSIFICATION_v1.md`

Reclassify PA00–PA26 using merged main only.
Pay special attention to:
- PA09 still authoring-blocked;
- PA14/15/18/19/20 direct shipped evidence;
- PA17 runtime mechanism shipped but ordered product path still depends on acquisition authoring;
- PA16 Forest depth still open.

Do not count seeded inventory as full product reachability.

## Queue item 27 — release-candidate worker integration conflict audit

Create:
- `docs/qa-prep/RC_WORKER_INTEGRATION_CONFLICT_AUDIT_v1.md`

Compare current main against latest Chat2/3/5 branches and identify:
- tests safe to cherry-pick;
- docs/evidence only;
- stale assumptions superseded by PR22;
- files that would conflict with shared runtime ownership;
- redundant duplicates.

Recommend a minimal integration set, not a bulk merge.

## Queue item 28 — authoring decision blocker matrix

Create:
- `docs/qa-prep/AUTHORING_DECISION_BLOCKER_MATRIX_v1.md`

List only decisions that still require human/product authoring rather than code:
- Old Boundary Token source;
- retain/consume;
- hunter-trail clue/capability identity if unresolved;
- School management/accounting threshold/provider;
- School Arcana/Forest threshold/provider;
- Forest content depth.

For each list affected PA rows and whether runtime infrastructure is already ready.

## Queue item 29 — release candidate end-to-end smoke v2

Create:
- `docs/qa-prep/RELEASE_CANDIDATE_E2E_SMOKE_v2.md`
- optional NEW test `prior-work/astra/prototype-m3.2/tests/qa-release-candidate-e2e-v2.test.ts`

Define the longest executable shipped path on current main without pretending authoring gaps are solved:
arrival -> Lumber -> Foreman -> School -> Night -> Forest logging-road -> result -> 49/50 Hard Work -> eligible play -> ending -> reload -> New Run.

Explicitly branch off separate seeded-item evidence for old-boundary route.

## Queue item 30 — final QA integration handoff v2

Create:
- `docs/qa-prep/FINAL_QA_INTEGRATION_HANDOFF_v2.md`

Consolidate Chat 4 items 1–29 into:
- MUST_INTEGRATE_NOW;
- KEEP_AS_EVIDENCE;
- AUTHORING_BLOCKED;
- SUPERSEDED;
- POST_RELEASE_POLISH.

Name exact files and the minimal release-candidate QA subset.

Continue items 25–30 sequentially without waiting for Lead review.


## Queue item 31 — PR24 one-Save E2E review

Create:
- `docs/qa-prep/PR24_ONE_SAVE_E2E_REVIEW_v1.md`

Review current PR #24 shipped one-Save smoke.

Check:
- same Save across Lumber, Foreman, School, Night, Forest and ending;
- only explicit accelerator is completed_shifts=49;
- no School public fact injection;
- no Old Boundary Token injection;
- no Forest success fact injection;
- exact Hard Work condition/reward preserved;
- reload checkpoints are meaningful.

Classify BLOCKER / GREEN / COVERAGE_GAP.

## Queue item 32 — one-Save state drift sentinel

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/qa-one-save-state-drift-sentinel.test.ts`

Build independent sentinels around the PR24 path:
- money delta;
- daytime Energy delta;
- Night day advance;
- School typed progress;
- Foreman typed progress;
- Forest typed/public result;
- ending eligibility;
- Meta reward exactly once.

The sentinel must fail if unrelated subsystems are reset or duplicated.

## Queue item 33 — RC save/reload corruption injection matrix

Create:
- `docs/qa-prep/RC_SAVE_RELOAD_CORRUPTION_MATRIX_v1.md`
- optional NEW test.

Define adversarial checkpoints for:
- pending Lumber milestone;
- pending Foreman scene;
- paid School result;
- Night after lodging;
- Night pending event;
- Activity before route;
- Activity after route;
- Activity after advance;
- ending committed;
- ended RunResult.

State expected parser/runtime behavior for malformed/stale variants.

## Queue item 34 — RC authoring blocker evidence pack

Create:
- `docs/qa-prep/RC_AUTHORING_BLOCKER_EVIDENCE_PACK_v1.md`

For each remaining human/product decision, attach exact evidence that runtime is already ready or partially ready:
- Old Boundary Token source;
- retain/consume;
- hunter-trail capability/clue identity;
- School management/accounting provider/threshold;
- School Arcana/Forest provider/threshold;
- Forest 3-route/3-challenge/season content depth.

Do not propose a preferred product answer.

## Queue item 35 — minimal release-candidate acceptance gate v2

Create:
- `docs/qa-prep/MINIMAL_RC_ACCEPTANCE_GATE_v2.md`
- `prior-work/astra/prototype-m3.2/tests/qa-minimal-rc-acceptance-gate-v2.test.ts`

Define the smallest executable RC acceptance set that can be honestly green before unresolved authoring is decided.

Must include:
- main build/validation;
- one-Save E2E;
- schema4 compatibility;
- item capability;
- Activity route reload;
- School typed progress;
- Night exactly-once;
- Hard Work exact threshold/reward.

## Queue item 36 — final QA RC evidence pack

Create:
- `docs/qa-prep/FINAL_QA_RC_EVIDENCE_PACK_v1.md`

Produce the final minimal handoff:
- MUST_INTEGRATE_TESTS;
- KEEP_AS_EVIDENCE;
- AUTHORING_BLOCKED;
- SUPERSEDED;
- POST_RELEASE_POLISH.

Name exact files and current assumptions. Flag anything stale after PR22/PR23/PR24.

Continue items 31–36 sequentially without waiting for Lead review.


## Queue item 37 — PR25 final-gate live review

Create:
- `docs/qa-prep/PR25_FINAL_GATE_LIVE_REVIEW_v1.md`

Review current PR #25 against merged PR24 main.

Check:
- minimal RC gate uses real `base.school -> listen`;
- School blocking-scene compatibility does not double-charge;
- schema4 pre-option Activity compatibility remains green;
- item capability stays inventory-derived;
- exact Hard Work contract/reward;
- no production runtime/content/UI changes.

## Queue item 38 — final one-Save state-drift sentinel v2

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/qa-one-save-state-drift-sentinel-v2.test.ts`

Rebuild the state-drift sentinel using merged PR24 semantics exactly.

It must resolve:
`base.school` with choice `listen`.

Track:
- money;
- Energy;
- Lumber counters;
- Foreman route;
- School typed counters;
- Night day advance;
- Forest route/result;
- ending transaction;
- Meta;
- New Run reload.

## Queue item 39 — final schema4 compatibility RC matrix

Create:
- `docs/qa-prep/FINAL_SCHEMA4_RC_MATRIX_v1.md`
- optional NEW test.

Cover:
- pre-School typed state;
- pre-presentationId save;
- pre-Activity-option active save;
- NightFlow checkpoints;
- pending School scene;
- committed ending;
- ended RunResult.

Mark executable evidence vs documented expectation.

## Queue item 40 — final authoring-only blocker ledger

Create:
- `docs/qa-prep/FINAL_AUTHORING_ONLY_BLOCKERS_v1.md`

List only blockers that genuinely require product/human decisions after PR24/25.

Do not include runtime issues that are already green.

Expected classes:
- Old Boundary Token source/retain-consume;
- hunter-trail identity;
- School public-result providers/thresholds;
- Forest full content depth;
- presentation asset polish where non-blocking.

## Queue item 41 — release candidate readiness matrix

Create:
- `docs/qa-prep/RELEASE_CANDIDATE_READINESS_MATRIX_v1.md`

Score no percentages. Classify:
- RUNTIME_GREEN;
- QA_GREEN;
- AUTHORING_OPEN;
- CONTENT_DEPTH_OPEN;
- ASSET_POLISH_OPEN.

Cover architecture, save, School, Lumber, Night, Forest, endings, presentation.

## Queue item 42 — final QA evidence pack v3

Create:
- `docs/qa-prep/FINAL_QA_EVIDENCE_PACK_v3.md`

Produce the minimal final QA handoff:
- MUST_INTEGRATE;
- KEEP_AS_EVIDENCE;
- HUMAN_DECISION_REQUIRED;
- CONTENT_DEPTH;
- POST_RELEASE_POLISH;
- SUPERSEDED.

Explicitly supersede the old pre-fix PR24 review where applicable.

Continue items 37–42 sequentially without waiting for Lead review.


## Queue item 43 — PR26 closeout consistency audit

Create:
- `docs/qa-prep/PR26_CLOSEOUT_CONSISTENCY_AUDIT_v1.md`

Review merged PR #26 docs against current main.

Confirm:
- technical RC remains GREEN;
- full authored PA remains PARTIAL;
- human-decision ledger does not select product answers;
- no runtime/content/UI changes were introduced;
- Hard Work remains exact;
- presentation blocking asset count remains zero;
- OPEN School/token/Forest authoring is preserved.

## Queue item 44 — final merged-main one-Save sentinel v3

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/qa-one-save-state-drift-sentinel-v3.test.ts`

Rebuild the sentinel directly against merged main after PR26.

Must include:
- real `base.school -> listen`;
- exact School money/Energy/progress deltas;
- Night exactly-once;
- logging-road Forest route;
- exact activityResult continuation;
- 49-not-eligible -> real 50th shift;
- exact hardWork:lumber;
- New Run reload.

No unresolved authoring injection.

## Queue item 45 — human-decision ledger false-closure audit

Create:
- `docs/qa-prep/HUMAN_DECISION_FALSE_CLOSURE_AUDIT_v1.md`

Compare:
- RC_HUMAN_DECISIONS_REQUIRED_v1.md
- subsystem decision packets
- PA row classifications

Flag any place where:
- seeded state;
- fixture placeholder;
- synthetic provider;
- QA-selected threshold;
- optional art polish

is incorrectly represented as an accepted Product decision.

## Queue item 46 — release-candidate docs authority audit

Create:
- `docs/qa-prep/RC_DOC_AUTHORITY_AUDIT_v1.md`

Verify current index/authority points to:
- RC_CLOSEOUT_STATUS_v1.md;
- RC_HUMAN_DECISIONS_REQUIRED_v1.md;
- current Lumber RC matrix;
- current School decision packet;
- current presentation RC evidence.

Identify stale docs that must be marked superseded rather than deleted.

## Queue item 47 — final technical regression floor ledger

Create:
- `docs/qa-prep/FINAL_TECHNICAL_REGRESSION_FLOOR_v1.md`

Record exact merged milestones and test floors:
187 -> 194 -> 200 -> 208 -> 209 -> 218.

Explain what each milestone added and which current tests are the minimum retained regression set.

No percentages/rankings.

## Queue item 48 — QA closeout pack v4

Create:
- `docs/qa-prep/QA_CLOSEOUT_PACK_v4.md`

Consolidate Chat 4 after PR26 into:
- TECHNICAL_GREEN;
- MUST_INTEGRATE_TESTS;
- KEEP_AS_EVIDENCE;
- HUMAN_DECISION_REQUIRED;
- CONTENT_DEPTH_OPEN;
- SUPERSEDED.

Name exact files and keep Product decisions neutral.

Continue items 43–48 sequentially without waiting for Lead review.


## Queue item 49 — full product-scope preservation audit

Create NEW file only:
- `docs/qa-prep/FULL_PRODUCT_SCOPE_PRESERVATION_AUDIT_v1.md`

Audit authoritative docs and verify the live project still explicitly preserves:
- 10 ordinary careers;
- Palace 10/10 Hard Work unlock;
- ordinary poverty/housing;
- Secret Debt/Slave hidden career;
- School;
- typed relationships;
- Night;
- items/capabilities;
- expedition Activity;
- endings/Meta;
- GIF-first central presentation.

Flag any coordination/handoff doc that accidentally narrows the project to Lumber-only.

## Queue item 50 — starter-trio readiness matrix

Create NEW file only:
- `docs/qa-prep/STARTER_TRIO_READINESS_MATRIX_v1.md`

Compare Lumber, Satyr Maid and Undead Farm across:
- repeatable shift;
- seasonal variants;
- career state machine;
- relationship;
- School/item/Activity hooks;
- Night;
- endings;
- presentation;
- save/reload;
- content depth.

Classify evidence without inventing missing implementation.

## Queue item 51 — remaining-seven careers readiness matrix

Create NEW file only:
- `docs/qa-prep/REMAINING_SEVEN_CAREERS_READINESS_MATRIX_v1.md`

Audit Tavern, Hunter, Guard, Merchant, Artist/Geisha, Assassin and Prostitute from design authority to production readiness.

For each identify:
- locked structure;
- existing draft depth;
- missing implementation package;
- missing authoring;
- cross-system dependencies;
- presentation readiness.

No scoring percentages.

## Queue item 52 — poverty/Secret Debt QA contract map

Create NEW file only:
- `docs/qa-prep/POVERTY_SECRET_DEBT_QA_CONTRACT_MAP_v1.md`

Define future QA coverage needed for:
- zero-money anti-softlock;
- street sleep continuation;
- one-time lender encounter;
- accept/refuse persistence;
- delayed activation;
- ordinary-job blocking;
- forced Night obligation;
- three outcome families;
- Palace prerequisite exclusion.

Keep OPEN balance values parameterized.

## Queue item 53 — GIF-first full-game QA guardrails

Create NEW file only:
- `docs/qa-prep/GIF_FIRST_FULL_GAME_QA_GUARDRAILS_v1.md`

Extend current presentation invariants to full-game production:
- GIF remains presentation only;
- mechanics never wait for GIF;
- fallback is non-fatal;
- animation-off is presentation-only;
- semantic identity survives replacement;
- no frame/time in saves;
- reused GIFs cannot merge gameplay identities.

Cover careers, poverty, School, Night, Activity and endings.

## Queue item 54 — next-phase Lead QA handoff v5

Create NEW file only:
- `docs/qa-prep/NEXT_PHASE_LEAD_QA_HANDOFF_v5.md`

Summarize items 49–53 plus current 221/221 technical floor into:
- TECHNICAL_GREEN;
- FULL_SCOPE_PRESERVED;
- PRODUCTION_PACKAGES_NEEDED;
- HUMAN_DECISIONS;
- CONTENT_DEPTH;
- FUTURE_QA.

Do not reopen green runtime contracts.

Continue items 49–54 sequentially without waiting for Lead review.


## Queue item 55 — full-game production package gate checklist

Create NEW file only:
- `docs/qa-prep/FULL_GAME_PRODUCTION_PACKAGE_GATE_v1.md`

Define the QA gate every future career/system production package must satisfy:
- authoritative source identified;
- no locked-rule drift;
- one-file ownership respected;
- save/reload behavior explicit;
- cross-system public boundaries explicit;
- semantic presentation IDs/fallbacks valid;
- no fixture-only authoring promoted to production;
- targeted tests + full check requirement.

Make it reusable for all careers and systems.

## Queue item 56 — product-scope omission sentinel matrix

Create NEW file only:
- `docs/qa-prep/PRODUCT_SCOPE_OMISSION_SENTINEL_MATRIX_v1.md`

Create a durable matrix of product surfaces that must remain represented as production expands:
- all 10 ordinary careers;
- Palace;
- ordinary poverty;
- Secret Debt/Slave;
- School;
- relationships;
- Night;
- items;
- Activity;
- endings/Meta;
- GIF-first presentation.

For each surface record its authority and the evidence needed to detect accidental omission/narrowing.

## Queue item 57 — content-authoring acceptance framework

Create NEW file only:
- `docs/qa-prep/CONTENT_AUTHORING_ACCEPTANCE_FRAMEWORK_v1.md`

Define how QA should distinguish:
- runtime-ready but content-open;
- human-decision-blocked;
- authored but not integrated;
- integrated and tested;
- optional presentation polish.

Apply the framework to career, School, poverty and Activity content without assigning scores or inventing decisions.

Continue items 49–57 sequentially without waiting for Lead review.


## Queue item 58 — worker-queue deliverable verification template

Create NEW file only:
- `docs/qa-prep/WORKER_QUEUE_DELIVERABLE_VERIFICATION_TEMPLATE_v1.md`

Define a reusable Git-verification checklist for Lead when a worker reports completion:
- exact expected files present;
- correct branch;
- no forbidden/shared-file edits;
- task requirements reflected in content;
- locked decisions preserved;
- fixture-only assumptions not promoted to Product truth;
- tests/validation evidence recorded where required;
- integration subset identified.

This is a coordination QA tool, not a new runtime gate.

Continue items 50–58 sequentially without waiting for Lead review.


## Queue item 59 — PR29 poverty production contract review

Create NEW file only:
- `docs/qa-prep/PR29_POVERTY_PRODUCTION_CONTRACT_REVIEW_v1.md`

Review Lead PR #29 against current main and authoritative poverty design.

Verify:
- PR is test-only;
- no exact OPEN lodging price or street penalty is newly locked by the test;
- zero-money street sleep remains a valid anti-softlock path;
- School Night study remains unavailable on street;
- a starting Lumber shift remains reachable afterward;
- Hard Work condition/reward and Forest `activityResult` are untouched;
- the test syntax/assumptions match current `night-flow.test.ts`, `helpers.ts`, `definitions.json` and engine behavior.

Conclude GREEN_FOR_MERGE or BLOCKED with exact reason. Do not change PR29 files.

Continue items 51–59 sequentially without waiting for Lead review.


## Queue item 60 — full-game package CI evidence template

Create NEW file only:
- `docs/qa-prep/FULL_GAME_PACKAGE_CI_EVIDENCE_TEMPLATE_v1.md`

Define the evidence block every future Lead integration PR should record:
- base/head SHAs;
- changed paths;
- ownership check;
- typecheck;
- validate;
- build;
- targeted tests;
- full test count;
- locked-invariant checks;
- Product decisions intentionally left OPEN;
- post-merge smoke if runtime/content changed.

Do not claim evidence that was not actually run.

Continue items 52–60 sequentially without waiting for Lead review.


## Queue item 61 — poverty production false-green sentinel plan

Create NEW file only:
- `docs/qa-prep/POVERTY_PRODUCTION_FALSE_GREEN_SENTINEL_PLAN_v1.md`

Define future QA sentinels that prevent:
- existing lodging primitives being misreported as full authored poverty content;
- fixture-only lender state being counted as reachable Secret Debt;
- guessed lender chance/debt values becoming Product truth;
- a blocked ordinary job losing its saved progression;
- Secret Debt accidentally counting toward Palace 10/10;
- media presence being mistaken for gameplay implementation.

No production code changes.

Continue items 53–61 sequentially without waiting for Lead review.


## Queue item 62 — full-game content pack acceptance checklist

Create NEW file only:
- `docs/qa-prep/FULL_GAME_CONTENT_PACK_ACCEPTANCE_CHECKLIST_v1.md`

Define acceptance checks for future data-driven content packs:
- namespace and ID uniqueness;
- declared read/write capability boundaries;
- authoritative conditions/effects only;
- fallback presentation coverage;
- save/reload stability;
- no accidental cross-domain private-state reads;
- no locked-rule drift;
- no unresolved Product choice encoded as a constant.

Make it usable for career, School, poverty and Activity packs.

Continue items 54–62 sequentially without waiting for Lead review.


## Queue item 63 — production-wave integration review template

Create NEW file only:
- `docs/qa-prep/PRODUCTION_WAVE_INTEGRATION_REVIEW_TEMPLATE_v1.md`

Define a reusable Lead review for integrating completed multi-worker production-prep waves:
- worker expected-files verification;
- cross-worker contradiction check;
- full-scope preservation;
- locked-invariant check;
- minimal authority subset selection;
- superseded-doc identification;
- whether code/runtime changes are actually justified;
- CI/test requirements if any non-doc files are integrated.

Continue items 55–63 sequentially without waiting for Lead review.


## Queue item 64 — full-game release-scope traceability refresh plan

Create NEW file only:
- `docs/qa-prep/FULL_GAME_RELEASE_SCOPE_TRACEABILITY_REFRESH_PLAN_v1.md`

Define how to refresh existing LIFE/product traceability as production packages land:
- source requirement;
- current implementation evidence;
- authored-content evidence;
- presentation evidence;
- save/reload evidence;
- remaining Product decision;
- release inclusion status.

Cover all major systems without converting drafts into locks.

Continue items 56–64 sequentially without waiting for Lead review.


## Queue item 65 — worker-branch stale-base risk checklist

Create NEW file only:
- `docs/qa-prep/WORKER_BRANCH_STALE_BASE_RISK_CHECKLIST_v1.md`

Define Lead checks before integrating long-lived worker branches:
- current main vs merge base;
- changed-path ownership;
- assumptions superseded by newer main;
- stale negative tests;
- duplicate docs/evidence;
- locked invariants unchanged;
- selective-copy vs full-branch merge decision.

The checklist should support the current diverged long-running worker model.

Continue items 57–65 sequentially without waiting for Lead review.


## Queue item 66 — production-authority main-presence audit

Create NEW file only:
- `docs/qa-prep/PRODUCTION_AUTHORITY_MAIN_PRESENCE_AUDIT_v1.md`

Audit current main after PR #28/#30 and verify that the minimum recovery authorities referenced by `CURRENT_PROJECT_HANDOFF_v1.md` actually exist on main rather than only worker branches.

Report missing/stale references and identify which should be integrated or superseded. Do not modify authority docs.

Continue items 58–66 sequentially without waiting for Lead review.


## Queue item 67 — post-merge poverty regression floor plan

Create NEW file only:
- `docs/qa-prep/POST_MERGE_POVERTY_REGRESSION_FLOOR_PLAN_v1.md`

Assuming PR29 is later validated and merged, define the minimal retained regression floor for ordinary poverty:
- lodging ladder structure;
- zero-money street continuation;
- School Night-study street exclusion;
- starting-job recovery;
- save/reload around street lodging.

Do not claim PR29 merged or green unless Git proves it.

Continue items 59–67 sequentially without waiting for Lead review.


## Queue item 68 — unexecuted-PR merge-risk policy

Create NEW file only:
- `docs/qa-prep/UNEXECUTED_PR_MERGE_RISK_POLICY_v1.md`

Define Lead handling when a PR is code-review green but no executable CI/full-check result is available through the connected environment.

Distinguish:
- docs-only PR;
- test-only PR;
- production data PR;
- runtime/schema/UI PR.

For each define what evidence is sufficient to merge versus when the PR must remain open. Never fabricate PASS counts.

Use PR29 as a concrete current example without changing it.

Continue items 60–68 sequentially without waiting for Lead review.


## Queue item 69 — integration evidence by change-class matrix

Create NEW file only:
- `docs/qa-prep/INTEGRATION_EVIDENCE_BY_CHANGE_CLASS_v1.md`

Define required merge evidence by change class:
- docs-only;
- fixtures-only;
- tests-only;
- production content/data;
- runtime/schema;
- UI/presentation runtime;
- build/packaging.

For each specify minimum review, targeted test, full-check and post-merge evidence. Preserve the rule that no PASS count is claimed without execution.

Continue items 61–69 sequentially without waiting for Lead review.


## Queue item 70 — full-game regression-floor growth policy

Create NEW file only:
- `docs/qa-prep/FULL_GAME_REGRESSION_FLOOR_GROWTH_POLICY_v1.md`

Define how the retained regression floor should grow as new careers/systems ship:
- keep architecture/save core;
- add one natural-path smoke per major system;
- add exact locked-invariant sentinels;
- avoid redundant fixture-only duplication;
- distinguish content-depth tests from runtime contracts;
- retire/supersede stale tests without deleting provenance.

No new tests in this task.

Continue items 62–70 sequentially without waiting for Lead review.


## Queue item 71 — production content natural-path evidence rule

Create NEW file only:
- `docs/qa-prep/PRODUCTION_CONTENT_NATURAL_PATH_EVIDENCE_RULE_v1.md`

Define what counts as natural-path acceptance versus accelerator evidence for future careers/systems.

Require:
- natural acquisition/unlock when claiming authored reachability;
- injected counters/items/facts clearly labeled as accelerators;
- no fixture-only setup counted as complete Product path;
- long thresholds may use accelerators only for boundary testing;
- at least one representative no-injection path for each shipped subsystem.

Apply generically to careers, School, poverty and Activity.

Continue items 63–71 sequentially without waiting for Lead review.


## Queue item 72 — human-decision readiness crosscheck v1

Create NEW file only:
- `docs/qa-prep/HUMAN_DECISION_READINESS_CROSSCHECK_v1.md`

Cross-check current authoritative decision packets for:
- Old Boundary Token;
- hunter trail;
- School management/accounting;
- School Arcana/Forest;
- poverty/Secret Debt;
- optional presentation/art priorities.

For each distinguish:
- genuinely human-owned decision;
- already locked and must not be re-asked;
- content authoring that does not need a decision;
- balance value that can remain parameterized;
- technical work that can proceed now.

Goal: minimize the number of questions Lead eventually asks the user.

Continue items 64–72 sequentially without waiting for Lead review.


## Queue item 73 — human-decision packet conflict audit

Create NEW file only:
- `docs/qa-prep/HUMAN_DECISION_PACKET_CONFLICT_AUDIT_v1.md`

Compare current School, Lumber/Forest, poverty/Secret Debt and presentation decision packets against:
- direct locked product decisions;
- `NEW_GAME_SPEC_v1.md`;
- `PROJECT_STATE.md`;
- current runtime constraints.

Flag duplicate questions, already-answered questions, contradictory ranges, and decisions that are actually implementation details rather than Product choices.

Do not resolve conflicts by guessing; state the authoritative side where clear.

Continue items 65–73 sequentially without waiting for Lead review.


## Queue item 74 — current open-PR integration status ledger

Create NEW file only:
- `docs/qa-prep/CURRENT_OPEN_PR_INTEGRATION_STATUS_v1.md`

Record current open Lead PRs from Git and classify each by:
- change class;
- review status;
- executable CI evidence present/missing;
- merge blocker;
- locked-invariant risk;
- next required action.

At authoring time include PR #29 accurately. Do not mark merged/green without Git evidence.

Continue items 66–74 sequentially without waiting for Lead review.


## Queue item 75 — production implementation readiness gate v1

Create NEW file only:
- `docs/qa-prep/PRODUCTION_IMPLEMENTATION_READINESS_GATE_v1.md`

Define a gate for deciding when a preparation/documentation stream has enough evidence to justify actual production code/content work.

Require:
- authoritative behavior identified;
- Product decisions either supplied or parameterized;
- runtime seam known;
- save/reload ownership known;
- presentation fallback known;
- natural-path acceptance defined;
- locked-invariant collision checked;
- one-file ownership clear.

Apply the gate to ordinary poverty, Secret Debt, School public results, Forest depth and GIF production. Do not mark a stream READY unless current evidence supports it.

Continue items 67–75 sequentially without waiting for Lead review.


## Queue item 76 — next implementation candidate ranking by readiness

Create NEW file only:
- `docs/qa-prep/NEXT_IMPLEMENTATION_CANDIDATES_BY_READINESS_v1.md`

Compare current candidate streams by factual readiness only, without scoring or recommending a Product choice:
- ordinary poverty content;
- Secret Debt;
- School authored content/public results;
- Forest depth;
- starter-trio career expansion;
- presentation/GIF production.

For each list:
- decisions still missing;
- runtime seams ready/missing;
- content authority ready/missing;
- tests ready/missing;
- whether bounded implementation can begin now.

Do not rank aesthetics or reopen locked mechanics.

Continue items 68–76 sequentially without waiting for Lead review.


## Queue item 77 — test-only PR validation fallback plan

Create NEW file only:
- `docs/qa-prep/TEST_ONLY_PR_VALIDATION_FALLBACK_PLAN_v1.md`

For a test-only PR such as #29, define acceptable validation routes when GitHub Actions is unavailable:
- exact-head local/full check;
- exact-head targeted test + full existing suite;
- independent environment run;
- why code review alone is or is not sufficient;
- evidence that must be recorded in Git.

Do not claim any route has been executed. Keep production runtime/data PRs under stricter evidence rules.

Continue items 69–77 sequentially without waiting for Lead review.


## Queue item 78 — PR34 starter-trio production review

Create NEW file only:
- `docs/qa-prep/PR34_STARTER_TRIO_PRODUCTION_REVIEW_v1.md`

Review Lead PR #34 (current-main replacement for closed PR #32) against authoritative Satyr Maid / Undead Farm drafts and current runtime.

Verify:
- only target starter shifts/career states + tests are added;
- 1 Energy remains correct;
- no guessed Hard Work threshold/ending/meta reward is added;
- wage/stat values are treated as tunable implementation baseline, not Product locks;
- semantic presentation namespaces are correct;
- existing media reuse does not merge gameplay identity;
- Lumber Hard Work and exact Forest `activityResult` remain untouched;
- test assumptions match engine/presentation behavior.

Use actual CI evidence if available at review time. Conclude GREEN / BLOCKED with exact reason.

Continue items 70–78 sequentially without waiting for Lead review.


## Queue item 79 — starter-trio post-merge regression floor draft

Create NEW file only:
- `docs/qa-prep/STARTER_TRIO_POST_MERGE_REGRESSION_FLOOR_v1.md`

Assuming PR34 eventually passes CI and merges, define the retained regression floor for all three starter careers:
- action availability after arrival;
- 1 Energy shift cost;
- typed completed-shifts progress;
- early career-state transition where shipped;
- seasonal semantic presentation;
- save/reload;
- no guessed Hard Work for Satyr/Farm;
- Lumber Hard Work exact invariant unchanged.

Do not claim PR34 merged or green unless Git proves it.

Continue items 71–79 sequentially without waiting for Lead review.


## Queue item 80 — CI-enabled merge gate audit v1

Create NEW file only:
- `docs/qa-prep/CI_ENABLED_MERGE_GATE_AUDIT_v1.md`

Audit the newly merged `.github/workflows/mindy-successor-check.yml` against project needs.

Verify:
- Node version matches package engines;
- `npm ci` uses the correct lockfile;
- `npm run check` covers typecheck, validate, build, tests;
- PR and main push triggers are scoped correctly;
- exact-head evidence can be associated with PRs;
- no product/runtime semantics changed.

Also record how PR29/PR33 and PR32/PR34 replacement integration policy changes now that CI is available.

Continue items 72–80 sequentially without waiting for Lead review.


## Queue item 81 — PR33 post-merge poverty verification

Create NEW file only:
- `docs/qa-prep/PR33_POST_MERGE_POVERTY_VERIFICATION_v1.md`

Verify Git after PR #33:
- merged SHA;
- exact-head CI result/count;
- old PR #29 superseded/closed;
- test-only scope;
- Lumber/Forest locked invariants unchanged;
- main push CI state if available.

Use Git evidence only.

## Queue item 82 — ordinary poverty production-pack review gate

Create NEW file only:
- `docs/qa-prep/ORDINARY_POVERTY_PRODUCTION_PACK_REVIEW_GATE_v1.md`

Define the concrete review gate for Chat3 items 87–95:
- natural street reachability;
- helpful/neutral/bad content separation;
- no Secret Debt bleed;
- initial tuning not promoted to Product lock;
- save/reload/idempotency;
- anti-softlock;
- presentation fallback;
- one-file ownership;
- exact CI required on Lead integration branch.

## Queue item 83 — starter-trio production scope audit after PR34

Create NEW file only:
- `docs/qa-prep/STARTER_TRIO_PRODUCTION_SCOPE_AUDIT_v1.md`

Once PR34 status is known, compare all three starter careers:
- actual shipped target actions;
- typed career states;
- seasonal presentation;
- save/reload;
- content depth still missing;
- Hard Work state.

Do not invent Satyr/Farm Hard Work thresholds.

## Queue item 84 — production pack namespace collision sentinel

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/production-pack-namespace-collision-sentinel.test.ts`

Add a generic catalog-level sentinel covering:
- duplicate production pack IDs;
- duplicate event IDs;
- collision between ordinary poverty and Secret Debt namespaces;
- collision with School/Lumber production namespaces.

Use existing catalog/schema behavior; do not add runtime logic.

## Queue item 85 — CI exact-head evidence smoke

Create NEW file only:
- `docs/qa-prep/CI_EXACT_HEAD_EVIDENCE_SMOKE_v1.md`

Document actual observed CI evidence for PR31/PR32/PR33:
- run IDs;
- head SHAs;
- pass/fail counts where available;
- first PR32 failure and corrected rerun;
- rules for using the evidence.

Do not claim future PR status.

## Queue item 86 — next production integration gate v6

Create NEW file only:
- `docs/qa-prep/NEXT_PRODUCTION_INTEGRATION_GATE_v6.md`

Summarize what Lead may integrate next based on current evidence:
- PR34 starter trio;
- ordinary poverty content wave;
- School authored-content wave;
- GIF/media drafts;
- Secret Debt technical prep.

Separate CI-green, review-ready, Product-blocked and authoring-ready work.

Continue items 78–86 sequentially without waiting for Lead review.


## Queue item 87 — PR36 remaining-seven production review

Create NEW file only:
- `docs/qa-prep/PR36_REMAINING_SEVEN_PRODUCTION_REVIEW_v1.md`

Review PR #36 (current-main replacement for closed PR #35) against all seven authoritative career drafts and current main.

Verify:
- only base target shifts/career initial states + tests;
- 1 Energy each;
- typed `completed_shifts`;
- seasonal semantic presentation coverage;
- no guessed Hard Work thresholds/endings/meta rewards;
- tuning values are not Product locks;
- Lumber exact invariants unchanged;
- exact-head CI evidence.

Conclude GREEN / BLOCKED.

## Queue item 88 — ten-career base-layer completeness audit

Create NEW file only:
- `docs/qa-prep/TEN_CAREER_BASE_LAYER_COMPLETENESS_AUDIT_v1.md`

After PR36 status is known, audit all 10 ordinary careers for:
- production action presence;
- 1-Energy repeatable work;
- typed progress;
- initial stage;
- seasonal presentation identity;
- save/reload coverage;
- Hard Work implementation status.

Distinguish BASE_LAYER_SHIPPED from CONTENT_DEPTH_OPEN.

## Queue item 89 — Chat3 ordinary-poverty pack review v1

Create NEW file only:
- `docs/qa-prep/ORDINARY_POVERTY_PACK_REVIEW_v1.md`

Review Chat3 items 87–104 as they appear:
- production schema validity;
- natural-path reachability;
- content diversity;
- initial tuning labeling;
- anti-softlock;
- reload/idempotency;
- no Secret Debt bleed;
- selective integration readiness.

## Queue item 90 — Chat5 School authored-content review v1

Create NEW file only:
- `docs/qa-prep/SCHOOL_AUTHORED_CONTENT_REVIEW_v1.md`

Review Chat5 items 82–89:
- all eight tracks represented;
- teacher identities do not change mechanics;
- lesson text matches course identities;
- no invented public-result decision;
- no teacher prerequisite;
- presentation briefs are content-only;
- selective integration readiness.

## Queue item 91 — multi-GIF contract QA requirements

Create NEW file only:
- `docs/qa-prep/MULTI_GIF_PRESENTATION_QA_REQUIREMENTS_v1.md`

Define QA for one semantic event owning 3–5 GIF candidates:
- same gameplay outcome/effects;
- no media-driven timing;
- reload semantics;
- animations-off fallback;
- missing/corrupt candidate fallback;
- media pool cannot merge semantic IDs;
- selection distribution is presentation-only.

Do not prescribe art style.

## Queue item 92 — production event content-density acceptance matrix

Create NEW file only:
- `docs/qa-prep/CONTENT_DENSITY_ACCEPTANCE_MATRIX_v1.md`

Define evidence that a repeated gameplay surface has enough authored variation to avoid obvious repetition:
- text variants;
- event variants;
- 3–5 media candidates where appropriate;
- seasonal/context variation;
- reuse limits.

Treat these as production/content targets, not mechanics locks.

## Queue item 93 — stale-worker selective-copy checklist v2

Create NEW file only:
- `docs/qa-prep/STALE_WORKER_SELECTIVE_COPY_CHECKLIST_v2.md`

Specialize integration checks for workers ~75+ commits behind main:
- never merge branch wholesale;
- identify exact deliverable files;
- inspect dependency assumptions;
- recreate on fresh main;
- run exact-head CI;
- compare semantic IDs/namespaces against current main;
- preserve provenance.

## Queue item 94 — production CI floor after PR36

Create NEW file only:
- `docs/qa-prep/PRODUCTION_CI_FLOOR_AFTER_PR36_v1.md`

Record actual CI baseline after PR36 resolves:
- exact head;
- test count;
- main merge SHA if merged;
- post-merge main run;
- newly covered careers;
- still-uncovered production systems.

Use Git evidence only.

## Queue item 95 — next full-game integration gate v7

Create NEW file only:
- `docs/qa-prep/NEXT_FULL_GAME_INTEGRATION_GATE_v7.md`

Summarize current integration readiness for:
- all 10 career base layers;
- ordinary poverty packs;
- School authored content;
- multi-GIF presentation support;
- Secret Debt;
- Forest depth;
- Palace.

Separate SHIPPED / CI_GREEN_READY / CONTENT_READY / PRODUCT_BLOCKED / RUNTIME_EXTENSION_REQUIRED.

Continue items 87–95 sequentially without waiting for Lead review.


## Queue item 96 — PR37 ordinary-poverty post-merge audit

Create NEW file only:
- `docs/qa-prep/PR37_ORDINARY_POVERTY_POST_MERGE_AUDIT_v1.md`

Verify current main after PR #37:
- merge SHA;
- exact-head 270/270 CI evidence;
- post-merge main CI;
- six production poverty packs actually included by root catalog loading;
- no Secret Debt content;
- no lodging base-price/penalty drift;
- Lumber/Forest locked invariants unchanged.

Use Git evidence only.

## Queue item 97 — PR38 School production integration review

Create NEW file only:
- `docs/qa-prep/PR38_SCHOOL_PRODUCTION_INTEGRATION_REVIEW_v1.md`

Review Lead PR #38 and its reruns.

Verify:
- three School authored packs are included intentionally;
- strict pack media namespace fix is presentation-only;
- all eight teacher/course identities remain represented;
- no tuition/Energy/stat/Lust changes;
- no teacher prerequisite;
- no unapproved public result;
- generic School presentation hooks remain effect-free;
- exact-head CI result.

Conclude GREEN / BLOCKED with exact reason.

## Queue item 98 — multi-GIF runtime implementation review gate

Create NEW file only:
- `docs/qa-prep/MULTI_GIF_RUNTIME_IMPLEMENTATION_REVIEW_GATE_v1.md`

Define concrete review checks for the upcoming Lead shared-runtime patch:
- explicit 3–5 GIF candidate pool;
- old primary/static overrides remain compatible;
- deterministic presentation-only selection;
- no gameplay RNG consumption;
- occurrence stability across reload;
- no frame/time save fields;
- animation-off static fallback;
- missing candidate fallback;
- no semantic-ID merge.

## Queue item 99 — current production-state audit after poverty/School

Create NEW file only:
- `docs/qa-prep/CURRENT_PRODUCTION_STATE_AUDIT_v1.md`

Audit current main after PR37 and PR38 status:
- all 10 ordinary career base layers;
- ordinary poverty production depth;
- School authored production depth;
- Forest/Lumber status;
- Secret Debt state;
- multi-GIF state;
- Palace/Meta state.

Classify each as SHIPPED_BASE / SHIPPED_CONTENT / CONTENT_OPEN / PRODUCT_BLOCKED / RUNTIME_EXTENSION_REQUIRED.

Continue items 91–99 sequentially without waiting for Lead review.


## Queue item 100 — School staged-vs-reachable content QA

Create NEW file only:
- `docs/qa-prep/SCHOOL_STAGED_REACHABLE_CONTENT_QA_v1.md`

Review PR38's integration model:
- full teacher/course libraries preserved in staging;
- root production includes only safely triggerable events;
- no fake course routing;
- Night-study exact triggers remain valid;
- staged content cannot be misreported as naturally reachable.

## Queue item 101 — multi-GIF Lead patch preflight v1

Create NEW file only:
- `docs/qa-prep/MULTI_GIF_LEAD_PATCH_PREFLIGHT_v1.md`

Using Chat2 handoff v2 and current main, list exact preflight requirements before shared presentation runtime change:
- schema compatibility;
- deterministic occurrence key;
- no gameplay RNG;
- no Save migration if avoidable;
- UI fallback behavior;
- existing override compatibility;
- tests required.

## Queue item 102 — post-PR37/38 production namespace audit

Create NEW file only:
- `docs/qa-prep/POST_PR37_PR38_NAMESPACE_AUDIT_v1.md`

Audit production pack/media/event namespaces after poverty and School integrations.

Check:
- pack ownership;
- duplicate IDs;
- semantic presentation namespace separation;
- School staged libraries excluded from root loader;
- ordinary poverty separated from Secret Debt.

## Queue item 103 — current-main full production smoke matrix v1

Create NEW file only:
- `docs/qa-prep/CURRENT_MAIN_PRODUCTION_SMOKE_MATRIX_v1.md`

Define representative natural-path smoke coverage for:
- all 10 career shifts;
- ordinary poverty;
- School paid lesson + safe authored follow-up;
- Night study;
- Forest Activity;
- Lumber continuation;
- ending/meta transaction.

Use actual current-main evidence and identify any path still lacking executable smoke.

Continue items 95–103 sequentially without waiting for Lead review.


## Queue item 104 — PR38 post-merge School verification

Create NEW file only:
- `docs/qa-prep/PR38_POST_MERGE_SCHOOL_VERIFICATION_v1.md`

Verify current main after PR #38:
- merge SHA;
- exact-head 286/286 PASS;
- post-merge main CI;
- production/staging split is preserved;
- no fake exact-course routing;
- no School mechanics drift.

Use Git evidence only.

## Queue item 105 — multi-GIF implementation PR review template

Create NEW file only:
- `docs/qa-prep/MULTI_GIF_IMPLEMENTATION_PR_REVIEW_TEMPLATE_v1.md`

Prepare exact independent review checks for the upcoming Lead multi-GIF runtime PR:
- pool schema 3..5;
- primary+pool ambiguity;
- deterministic selector;
- occurrence key stability;
- no gameplay RNG;
- no Save migration;
- error fallback ordering;
- animation-off behavior;
- old overrides still parse;
- UI call-site occurrence keys.

## Queue item 106 — Forest result production pack QA gate

Create NEW file only:
- `docs/qa-prep/FOREST_RESULT_PRODUCTION_PACK_QA_GATE_v1.md`

Review requirements for Chat3 Forest result pack:
- exact `activityResult` trigger;
- success/escape/failure distinct;
- no Lumber Hard Work dependency;
- no duplicate effect on reload;
- strict pack namespace;
- presentation fallback;
- CI on fresh Lead branch.

## Queue item 107 — Secret Debt authored-content false-green audit

Create NEW file only:
- `docs/qa-prep/SECRET_DEBT_AUTHORED_CONTENT_FALSE_GREEN_AUDIT_v1.md`

Ensure authored lender/work/Night/outcome text is not misreported as implemented mechanics.

Explicitly separate:
- authored content ready;
- probability/debt/delay/penalty/threshold/reward still OPEN;
- runtime state ownership/gating not yet shipped;
- production inclusion not yet present.

Continue items 99–107 sequentially without waiting for Lead review.


## Queue item 108 — PR39 Work UI post-merge audit

Create NEW file only:
- `docs/qa-prep/PR39_WORK_UI_POST_MERGE_AUDIT_v1.md`

Verify after PR #39:
- exact-head CI;
- main merge SHA;
- Work panel exposes exactly the 10 target ordinary career shift IDs;
- legacy `tavern`, `hunt`, `guard` are not used as Work buttons;
- no career mechanics changed.

Use Git evidence only.

## Queue item 109 — Lumber target wage fix QA gate

Create NEW file only:
- `docs/qa-prep/LUMBER_TARGET_WAGE_FIX_QA_GATE_v1.md`

Review the upcoming Lead wage fix for `lumber.shift`.

Require:
- wage is not newly invented if an existing authoritative/compatibility source is reused;
- Work UI click causes money increase;
- target `completed_shifts` increments once;
- 1 Energy cost remains;
- Lumber Hard Work exact invariant unchanged;
- no legacy action-count migration;
- exact-head CI.

## Queue item 110 — starting-career UI availability smoke matrix

Create NEW file only:
- `docs/qa-prep/STARTING_CAREER_UI_AVAILABILITY_SMOKE_MATRIX_v1.md`

Define and, where current tests allow, verify UI smoke for all 10 target ordinary careers immediately after normal arrival/start:
- button present;
- enabled;
- action dispatch succeeds;
- Energy decrements by 1;
- typed counter increments;
- wage is awarded where production action defines wage.

Flag any career lacking wage or UI reachability.

## Queue item 111 — all-ten-career wage parity audit

Create NEW file only:
- `docs/qa-prep/TEN_CAREER_WAGE_PARITY_AUDIT_v1.md`

Audit current target shift actions for:
- presence/absence of `wage`;
- base/weight source provenance;
- obvious legacy-target mismatch;
- whether any target work action can consume Energy without earning money.

Do not rebalance values. Report gaps only.

## Queue item 112 — worker-queue execution-state audit

Create NEW file only:
- `docs/qa-prep/WORKER_QUEUE_EXECUTION_STATE_AUDIT_v1.md`

Audit Chat2/3/5 current task files and deliverables:
- assigned queue range;
- first outstanding item;
- count outstanding;
- whether task-file commits are present;
- whether any deliverable appeared after assignment.

This is coordination evidence, not a new task assignment.

## Queue item 113 — next integration risk gate v8

Create NEW file only:
- `docs/qa-prep/NEXT_INTEGRATION_RISK_GATE_v8.md`

Summarize current integration risk after:
- PR37 poverty;
- PR38 School;
- PR39 Work UI;
- Lumber wage fix status;
- multi-GIF runtime pending;
- Forest content;
- Secret Debt authored-only state.

Separate GREEN_TO_INTEGRATE / NEEDS_CI / PRODUCT_BLOCKED / CONTENT_ONLY / RUNTIME_GAP.

Continue items 105–113 sequentially without waiting for Lead review.


## Cross-cutting Product rule — RU + EN from now on

Effective immediately by direct Product decision:
- the game ships in **Russian and English**;
- Russian is the source authoring language; English is a full second locale;
- one gameplay/content identity, one semantic ID, one set of mechanics and one save-state serve both languages;
- language affects presentation/text only;
- no locale-specific conditions, rewards, timing, RNG, eligibility or save identity;
- QA: new production/content reviews must check RU + EN coverage for newly authored player-facing text and reject locale-specific gameplay divergence.
- if an already-assigned item has player-facing text and is not yet committed, author both locales now;
- if an item was already committed before this rule, do not rewrite it blindly; record it for localization migration/review.

Do not create a second copy of the gameplay event for English.


## Queue item 114 — bilingual production QA baseline v1

Create NEW file only:
- `docs/qa-prep/BILINGUAL_PRODUCTION_QA_BASELINE_v1.md`

Define the QA baseline for the new direct Product decision RU+EN:
- one locale-neutral gameplay/content identity;
- RU and EN player-facing coverage;
- no locale-specific mechanics/conditions/rewards/RNG/timing;
- no duplicated gameplay event per locale;
- language switch cannot reroll gameplay or GIF selection;
- multi-GIF assets shared across locales;
- RU/EN alt text completeness;
- no save identity split by language;
- backward compatibility for already shipped monolingual content during migration.

Apply to career, School, poverty, Forest, Secret Debt and presentation content.

Continue items 106–114 sequentially without waiting for Lead review.


## Queue item 115 — localization runtime review gate v1

Create NEW file only:
- `docs/qa-prep/LOCALIZATION_RUNTIME_REVIEW_GATE_v1.md`

Define review checks for Lead localization runtime:
- supported locales exactly RU+EN initially;
- Russian fallback;
- locale-neutral gameplay/save IDs;
- switching locale cannot mutate Run/Meta state;
- missing translation is non-fatal but QA-visible;
- no gameplay RNG consumption;
- no duplicate localized events;
- static UI and authored content can use one resolver.

## Queue item 116 — localization key collision audit

Create NEW file only:
- `docs/qa-prep/LOCALIZATION_KEY_COLLISION_AUDIT_v1.md`

Define and apply key-collision checks for deterministic keys derived from action/event/choice/presentation IDs.

Cover careers, School, poverty, Forest and UI shell.

## Queue item 117 — bilingual migration no-false-green audit

Create NEW file only:
- `docs/qa-prep/BILINGUAL_MIGRATION_NO_FALSE_GREEN_AUDIT_v1.md`

Define how CI must distinguish:
- translated;
- fallback-only migration debt;
- staged bilingual content not yet production-routed;
- missing player-facing localization;
- locale-neutral non-player-facing data.

Do not let Russian fallback falsely count as complete English coverage.

## Queue item 118 — locale switch save invariance smoke plan

Create NEW file only:
- `docs/qa-prep/LOCALE_SWITCH_SAVE_INVARIANCE_SMOKE_v1.md`

Specify an executable UI smoke:
- start run;
- perform work;
- capture Save;
- switch RU -> EN -> RU;
- Save gameplay state remains byte-equivalent or semantically equivalent excluding presentation preference;
- pending event/presentation/media identity unchanged.

## Queue item 119 — localization integration risk gate v1

Create NEW file only:
- `docs/qa-prep/LOCALIZATION_INTEGRATION_RISK_GATE_v1.md`

Summarize current RU+EN integration readiness after Lead runtime patch status:
- UI shell;
- ten careers;
- School;
- poverty;
- Forest;
- Secret Debt;
- multi-GIF alt/caption coverage.

Continue items 111–119 sequentially without waiting for Lead review.


## Queue item 120 — PR41 localization runtime review

Create NEW file only:
- `docs/qa-prep/PR41_LOCALIZATION_RUNTIME_REVIEW_v1.md`

Review PR #41 against the locked bilingual contract:
- localization preference outside Save;
- RU fallback;
- RU+EN Work/town slice;
- 10 action IDs unchanged;
- availability/wages unchanged;
- language switch cannot mutate life Save;
- no duplicate gameplay content;
- exact-head CI evidence.

Conclude GREEN / BLOCKED.

## Queue item 121 — localization shipped-coverage audit v1

Create NEW file only:
- `docs/qa-prep/LOCALIZATION_SHIPPED_COVERAGE_AUDIT_v1.md`

Audit player-facing current-main surfaces and classify:
SHIPPED_RU_EN / RU_FALLBACK / STAGED_RU_EN / MISSING.

Do not count fallback-only as translated.

## Queue item 122 — localized Work gameplay-invariance QA v1

Create NEW file only:
- `docs/qa-prep/LOCALIZED_WORK_GAMEPLAY_INVARIANCE_QA_v1.md`

Verify for all 10 career buttons under RU and EN:
- same action IDs;
- same enabled/disabled state;
- same Energy costs;
- same wage forecast values;
- same dispatch effects/counters;
- only labels/descriptions/UI copy differ.

## Queue item 123 — localization plus multi-GIF QA gate v2

Create NEW file only:
- `docs/qa-prep/LOCALIZATION_MULTI_GIF_QA_GATE_v2.md`

Define combined acceptance for future shared media-pool runtime:
- locale switch keeps selected media key stable;
- alt/caption localize independently;
- candidate failures/fallback independent of locale;
- animation-off remains presentation-only.

## Queue item 124 — next localization integration gate v1

Create NEW file only:
- `docs/qa-prep/NEXT_LOCALIZATION_INTEGRATION_GATE_v1.md`

Summarize safe next localization integrations for School, poverty, Forest and presentation after PR41.

Continue items 116–124 sequentially without waiting for Lead review.


## Queue item 125 — PR42 multi-GIF runtime review

Create NEW file only:
- `docs/qa-prep/PR42_MULTI_GIF_RUNTIME_REVIEW_v1.md`

Review PR #42:
- pool bounds 3..5;
- unique stable candidate keys;
- primary+pool ambiguity rejected;
- deterministic occurrence-key selection;
- no gameplay RNG;
- no Save migration;
- reload stability;
- RU↔EN switch keeps candidate;
- animation-off static fallback;
- old primary/static overrides remain compatible;
- exact-head CI evidence.

Conclude GREEN / BLOCKED.

## Queue item 126 — post-PR42 presentation compatibility audit

Create NEW file only:
- `docs/qa-prep/POST_PR42_PRESENTATION_COMPATIBILITY_AUDIT_v1.md`

After PR42 status is known, audit:
- old presentation.json parses;
- editor still works;
- custom primary replacement replaces pool safely;
- catalog GIF/image/video fallback unchanged;
- missing presentationId safe fallback remains.

## Queue item 127 — School localization integration QA gate v2

Create NEW file only:
- `docs/qa-prep/SCHOOL_LOCALIZATION_INTEGRATION_QA_V2.md`

Review Chat5 128–136 deliverables for selective current-main integration:
- 8 course UI RU+EN;
- generic School content;
- exact Night content;
- staged teacher/course content;
- no mechanics drift;
- staged routing clearly separated.

## Queue item 128 — Forest bilingual production QA gate v2

Create NEW file only:
- `docs/qa-prep/FOREST_BILINGUAL_PRODUCTION_QA_V2.md`

Review Chat3 Forest 131–135 deliverables:
- exact activityResult triggers;
- strict pack ownership;
- RU+EN coverage;
- no Hard Work drift;
- Product-blocked route semantics remain open.

## Queue item 129 — ordinary poverty localization QA gate v1

Create NEW file only:
- `docs/qa-prep/ORDINARY_POVERTY_LOCALIZATION_QA_V1.md`

Review Chat3 136–139:
- production identity mapping;
- RU+EN coverage;
- no Secret Debt bleed;
- no gameplay duplication;
- multi-GIF/media selection presentation-only.

## Queue item 130 — ten-career multi-GIF adoption QA gate v1

Create NEW file only:
- `docs/qa-prep/TEN_CAREER_MULTI_GIF_ADOPTION_QA_V1.md`

Review Chat2 adoption manifests:
- only shipped semantic IDs;
- pool 3..5;
- real-vs-placeholder asset status honest;
- RU+EN alt coverage;
- no gameplay field in media manifest.

## Queue item 131 — localization and presentation combined smoke matrix v1

Create NEW file only:
- `docs/qa-prep/LOCALIZATION_PRESENTATION_COMBINED_SMOKE_MATRIX_v1.md`

Define executable smoke:
- RU career work;
- switch EN;
- same gameplay/save;
- same selected GIF for same occurrence;
- new work occurrence may select different GIF;
- animations off -> static;
- reload -> same selected GIF;
- wage/counters unchanged.

## Queue item 132 — next production integration gate v9

Create NEW file only:
- `docs/qa-prep/NEXT_PRODUCTION_INTEGRATION_GATE_v9.md`

Summarize readiness after PR41/42 for:
- career localization/media;
- School localization;
- poverty localization;
- Forest bilingual content;
- Secret Debt authored-only content.

Continue items 124–132 sequentially without waiting for Lead review.


## Queue item 133 — PR43 Forest bilingual post-merge audit

Create NEW file only:
- `docs/qa-prep/PR43_FOREST_BILINGUAL_POST_MERGE_AUDIT_v1.md`

Verify:
- PR43 merge SHA;
- exact-head 299/299 PASS;
- post-merge main CI;
- 17 packs / 46 events;
- exact activityResult success/escape/failure reaction identities;
- RU/EN renderer path;
- Lumber Hard Work invariant unchanged;
- Product-blocked Hunter/Old Boundary semantics untouched.

## Queue item 134 — School localization delta integration QA gate v3

Create NEW file only:
- `docs/qa-prep/SCHOOL_LOCALIZATION_DELTA_INTEGRATION_QA_V3.md`

Review Chat5 137–145 as files appear:
- exact localization.json delta;
- all 8 courses;
- generic reachable School content;
- exact Night content;
- staged teacher/course exclusion;
- no gameplay fields;
- RU/EN completeness;
- natural-path smoke requirements.

## Queue item 135 — poverty localization delta integration QA gate v2

Create NEW file only:
- `docs/qa-prep/POVERTY_LOCALIZATION_DELTA_INTEGRATION_QA_V2.md`

Review Chat3 140–148:
- exact current-main poverty identity mapping;
- RU/EN completeness;
- no Secret Debt bleed;
- no gameplay duplication;
- natural-path invariance;
- multi-GIF staging remains presentation-only.

## Queue item 136 — real-GIF pool production QA baseline v1

Create NEW file only:
- `docs/qa-prep/REAL_GIF_POOL_PRODUCTION_QA_BASELINE_v1.md`

Define acceptance for production multi-GIF pools:
- 3..5 real repo assets;
- no placeholder/external path;
- stable unique keys;
- valid current semantic ID;
- static fallback;
- RU/EN alt coverage;
- locale switch keeps candidate;
- gameplay untouched.

## Queue item 137 — localization event resolver regression gate v1

Create NEW file only:
- `docs/qa-prep/LOCALIZATION_EVENT_RESOLVER_REGRESSION_GATE_v1.md`

Audit the generic event/activity/media localization resolver introduced by PR43:
- old Russian fallback remains functional;
- missing EN is non-fatal;
- event title/body/choice map by stable IDs;
- media alt mapping cannot affect media choice;
- no pending-state mutation.

## Queue item 138 — next production integration gate v10

Create NEW file only:
- `docs/qa-prep/NEXT_PRODUCTION_INTEGRATION_GATE_v10.md`

Summarize current readiness after PR43 for:
- School localization delta;
- ordinary poverty localization;
- real-GIF multi-pools;
- Forest remaining content;
- Secret Debt authored-only state.

Continue items 130–138 sequentially without waiting for Lead review.


## Queue depth Product rule — 12

Current coordination target:
- keep **12 independent QA tasks** queued/outstanding for Chat 4 whenever practical;
- Chat 4 owns QA / CI / Product acceptance only;
- Chat 4 does **not** dispatch or manage Chat 2/3/5;
- verify worker claims from Git artifacts, never prose reports;
- long-lived worker branches are stale: review/copy selectively, never recommend whole-branch merge.

## Queue item 139 — School localization production patch QA v4

Create NEW file only:
- `docs/qa-prep/SCHOOL_LOCALIZATION_PRODUCTION_PATCH_QA_V4.md`

Review Chat5 items 146–150 against current main after PR43:
- production localization patch;
- patch contract test;
- UI locale smoke fixture;
- reachable-event localization key map;
- exact-course routing staging fixture.

Require:
- RU+EN completeness for safe reachable surfaces;
- no staged teacher/course promotion;
- no gameplay fields;
- no Save/RNG/mechanics divergence;
- selective-copy-only recommendation.

## Queue item 140 — Chat5 completed-wave reconciliation v1

Create NEW file only:
- `docs/qa-prep/CHAT5_COMPLETED_WAVE_RECONCILIATION_v1.md`

Reconcile Chat5 items 137–150 as actually present in Git.
Classify exact files:
- SAFE_TO_INTEGRATE_NOW;
- STAGING_ONLY;
- QA_EVIDENCE_ONLY;
- PRODUCT_BLOCKED;
- SUPERSEDED.

Do not infer completion from worker prose.

## Queue item 141 — poverty localization live-deliverable recheck v3

Create NEW file only:
- `docs/qa-prep/POVERTY_LOCALIZATION_LIVE_DELIVERABLE_RECHECK_V3.md`

Recheck Chat3 items 140–148 from Git because prior QA v2 is now stale as files arrive.
Record exact present/missing artifacts and update integration readiness without changing gameplay.

## Queue item 142 — poverty localization selective-integration QA v3

Create NEW file only:
- `docs/qa-prep/POVERTY_LOCALIZATION_SELECTIVE_INTEGRATION_QA_V3.md`

Once the current Chat3 delta/key-map/tests are present, review:
- current PR37 production identity mapping;
- RU+EN completeness;
- no Secret Debt bleed;
- locale-neutral gameplay IDs;
- natural-path invariance;
- presentation-only multi-GIF staging.

If required files remain missing, mark BLOCKED_BY_MISSING_DELIVERABLES rather than guessing.

## Queue item 143 — real GIF repository asset QA audit v1

Create NEW file only:
- `docs/qa-prep/REAL_GIF_REPOSITORY_ASSET_QA_AUDIT_v1.md`

Review Chat2 real-asset inventory and real-asset-only multi-GIF patch.
Require:
- every production candidate is a real repo GIF;
- 3–5 candidates per pool;
- no placeholder/external/test-only path;
- current semantic presentation IDs only;
- RU+EN alt coverage;
- static fallback;
- gameplay untouched.

## Queue item 144 — real GIF build/distribution path QA v1

Create NEW file only:
- `docs/qa-prep/REAL_GIF_BUILD_DISTRIBUTION_QA_V1.md`

Define acceptance proving real GIF assets referenced by a future production pool are actually shipped by the build/runtime path, not merely present somewhere in Git.

Cover:
- source path;
- build copy/bundle behavior;
- runtime URL resolution;
- static fallback;
- missing-file failure behavior.

No runtime edits.

## Queue item 145 — localized pending-scene invariance gate v1

Create NEW file only:
- `docs/qa-prep/LOCALIZED_PENDING_SCENE_INVARIANCE_GATE_v1.md`

Define executable acceptance for RU↔EN switching while a localized authored event/activity result is pending:
- event/variant/choice IDs unchanged;
- selected GIF key unchanged;
- Save gameplay state unchanged;
- only title/body/choice/alt/caption presentation changes;
- fallback remains non-fatal.

Cover Forest and one School/poverty surface when available.

## Queue item 146 — School selective PR review template v1

Create NEW file only:
- `docs/qa-prep/SCHOOL_LOCALIZATION_SELECTIVE_PR_REVIEW_TEMPLATE_v1.md`

Prepare the exact review checklist for the next Lead School localization PR:
- fresh branch from current main;
- only reviewed safe files;
- no staged exact-course teacher content;
- UI actually consumes localized strings;
- regression coverage;
- exact-head CI;
- post-merge main CI.

## Queue item 147 — localization migration debt sentinel v1

Create NEW file only:
- `docs/qa-prep/LOCALIZATION_MIGRATION_DEBT_SENTINEL_v1.md`

Define a no-false-green classification across current production:
- SHIPPED_RU_EN;
- RU_FALLBACK_ONLY;
- STAGED_RU_EN;
- MISSING_TRANSLATION;
- NON_PLAYER_FACING.

Russian fallback must never count as complete English coverage.

## Queue item 148 — Product-blocked content isolation audit v2

Create NEW file only:
- `docs/qa-prep/PRODUCT_BLOCKED_CONTENT_ISOLATION_AUDIT_V2.md`

Verify current integration work does not accidentally promote unresolved mechanics/content:
- Secret Debt mechanics/rewards;
- School management/accounting public result;
- School Arcana/Forest public result;
- Hunter/Old Boundary unresolved route semantics;
- Palace unresolved content.

Localization/presentation authoring may exist, but Product-blocked gameplay must remain unshipped.

## Queue item 149 — current-main CI and regression floor audit v2

Create NEW file only:
- `docs/qa-prep/CURRENT_MAIN_CI_REGRESSION_FLOOR_V2.md`

Record current main SHA, latest successful workflow, test count, pack/event/action/ending validation counts where evidenced, and the minimum CI evidence required before the next content integration merge.

Do not copy stale historical counts forward without Git/workflow evidence.

## Queue item 150 — next production integration gate v11

Create NEW file only:
- `docs/qa-prep/NEXT_PRODUCTION_INTEGRATION_GATE_v11.md`

Summarize current readiness after items 139–149 for:
- School localization selective integration;
- ordinary poverty localization;
- Forest remaining bilingual/content depth;
- real-GIF production pools;
- Secret Debt authored-only/Product-blocked state.

Separate:
- GREEN_TO_INTEGRATE;
- NEEDS_FRESH_MAIN_CI;
- WAITING_FOR_WORKER_DELIVERABLE;
- STAGING_ONLY;
- PRODUCT_BLOCKED.

Continue items 139–150 sequentially without waiting for Lead review.


## Queue item 151 — PR44 School localization exact-head failure audit v1
Create NEW file only:
- `docs/qa-prep/PR44_SCHOOL_LOCALIZATION_FAILURE_AUDIT_v1.md`

Review PR #44 exact-head CI failure from actual Actions evidence. Identify the precise failing assertion/render boundary and verify the Lead fix does not change School mechanics.

## Queue item 152 — PR44 School localization fixed-head acceptance v1
Create NEW file only:
- `docs/qa-prep/PR44_SCHOOL_LOCALIZATION_FIXED_HEAD_ACCEPTANCE_v1.md`

After Lead pushes a fix, review exact PR head: RU/EN School panel, eight courses, Night-study labels, current reachable School event/media localization, gameplay/save invariance, and exact-head CI.

## Queue item 153 — PR44 post-merge main audit v1
Create NEW file only:
- `docs/qa-prep/PR44_SCHOOL_LOCALIZATION_POST_MERGE_AUDIT_v1.md`

Only after merge, verify current main SHA and post-merge CI. Mark NOT_YET_MERGED until Git proves otherwise.

## Queue item 154 — poverty executable natural-path test QA v4
Create NEW file only:
- `docs/qa-prep/POVERTY_EXECUTABLE_NATURAL_PATH_TEST_QA_V4.md`

Review Chat3 item 149 against current main identities and item-140 localization delta. Require real natural path, RU/EN invariance, one-time effects, reload stability, Secret Debt exclusion.

## Queue item 155 — poverty selective PR acceptance template v2
Create NEW file only:
- `docs/qa-prep/POVERTY_SELECTIVE_PR_ACCEPTANCE_TEMPLATE_v2.md`

Prepare the exact gate for the next Lead ordinary-poverty localization PR: collision-free 84-key merge, current IDs only, executable smoke, exact-head CI, post-merge CI.

## Queue item 156 — Chat2 real GIF sourcing/provenance QA v2
Create NEW file only:
- `docs/qa-prep/REAL_GIF_SOURCING_PROVENANCE_QA_V2.md`

Review Chat2 items 172+ as they appear. Require explicit redistributable provenance; uncertain rights = DO_NOT_SHIP. Generic GIF-host availability is not a license.

## Queue item 157 — first imported real GIF pool QA v1
Create NEW file only:
- `docs/qa-prep/FIRST_IMPORTED_REAL_GIF_POOL_QA_V1.md`

If Chat2 imports assets, verify actual repo GIF signature/files, 3–5 compatible candidates, current semantic presentationId, RU+EN alt, static fallback and locale-neutral selection. If none exist, record BLOCKED_BY_REAL_ASSETS.

## Queue item 158 — relationship/Night current-main boundary QA v1
Create NEW file only:
- `docs/qa-prep/RELATIONSHIP_NIGHT_CURRENT_MAIN_BOUNDARY_QA_V1.md`

Review new Chat5 stream against current main. Ensure it stays content/localization-only, typed relationship identity, voluntary Night semantics, no Secret Debt bleed, no Hard Work drift, and no invented canonical roster.

## Queue item 159 — Foreman relationship localization readiness QA v1
Create NEW file only:
- `docs/qa-prep/FOREMAN_RELATIONSHIP_LOCALIZATION_READINESS_QA_V1.md`

Review Chat5 Foreman RU+EN payload/tests when present against exact current-main `lumber.foreman` identities and Night choice.

## Queue item 160 — localization full-product shipped-surface audit v1
Create NEW file only:
- `docs/qa-prep/LOCALIZATION_FULL_PRODUCT_SHIPPED_SURFACE_AUDIT_v1.md`

Recompute current-main shipped player-facing localization coverage after PR44 status and before poverty integration. Distinguish SHIPPED_RU_EN / RU_FALLBACK_ONLY / MISSING / STAGED.

## Queue item 161 — current Product-open isolation audit v3
Create NEW file only:
- `docs/qa-prep/CURRENT_PRODUCT_OPEN_ISOLATION_AUDIT_V3.md`

Recheck School exact-course, Hunter trail, Old Boundary unresolved semantics, Secret Debt mechanics/rewards and Palace unresolved content remain unpromoted through current integration work.

## Queue item 162 — next production integration gate v12
Create NEW file only:
- `docs/qa-prep/NEXT_PRODUCTION_INTEGRATION_GATE_v12.md`

Summarize readiness after items 151–161 for School PR44, ordinary poverty localization, real GIF assets, Relationships/Night, Forest staged depth and Secret Debt boundaries.

Continue items 151–162 sequentially without waiting for Lead review.


## Queue item 163 — PR45 poverty post-merge main audit v1
Create NEW file only:
- `docs/qa-prep/PR45_POVERTY_POST_MERGE_MAIN_AUDIT_v1.md`

Verify PR45 merged state, exact merge SHA, current main, 84-key RU+EN poverty coverage, Secret Debt exclusion, and any available post-merge main workflow. Distinguish exact-head success from post-merge push evidence.

## Queue item 164 — PR46 Foreman bilingual exact-head audit v1
Create NEW file only:
- `docs/qa-prep/PR46_FOREMAN_BILINGUAL_EXACT_HEAD_AUDIT_v1.md`

Review PR46 exact head against current main. Require only additive localization + generic Night-choice presentation wiring; no relationship/Night/Hard Work/Forest mechanic drift.

## Queue item 165 — generic Night-choice localization regression gate v1
Create NEW file only:
- `docs/qa-prep/GENERIC_NIGHT_CHOICE_LOCALIZATION_REGRESSION_GATE_v1.md`

Verify generic stable-ID Night-choice localization does not break School Night-study dynamic formatting and does not put locale into gameplay Save.

## Queue item 166 — Foreman pending-scene locale invariance QA v1
Create NEW file only:
- `docs/qa-prep/FOREMAN_PENDING_SCENE_LOCALE_INVARIANCE_QA_v1.md`

Verify voluntary Foreman Night choice and its blocking event preserve pending event/variant, relationship counters, next-day Energy delta, RNG and Save across RU↔EN switch.

## Queue item 167 — Chat2 static-media production audit v1
Create NEW file only:
- `docs/qa-prep/PROJECT_OWNED_STATIC_MEDIA_PRODUCTION_AUDIT_v1.md`

Review Chat2 items 184–195 as they appear. Require actual project-owned repo assets, no external URLs, semantic IDs from current production, build distribution, RU+EN alt keys, and no gameplay fields.

## Queue item 168 — project-owned static media accessibility QA v1
Create NEW file only:
- `docs/qa-prep/PROJECT_OWNED_STATIC_MEDIA_ACCESSIBILITY_QA_v1.md`

Audit actual static assets/manifests for distinct meaningful RU+EN alt text, fallback coverage, no empty decorative claims, and no locale-specific asset identity duplication.

## Queue item 169 — Forest route-presentation binding acceptance contract v1
Create NEW file only:
- `docs/qa-prep/FOREST_ROUTE_PRESENTATION_BINDING_ACCEPTANCE_v1.md`

Define acceptance for a future Lead binding of existing logging-road / old-boundary route state to presentation IDs: no new route IDs, no Old Boundary token reinterpretation, no Hunter semantics, locale/presentation only.

## Queue item 170 — Chat5 relationship depth isolation QA v2
Create NEW file only:
- `docs/qa-prep/CHAT5_RELATIONSHIP_DEPTH_ISOLATION_QA_V2.md`

Review Chat5 items 13–24 actual Git. Separate safe current Foreman presentation content from broader CONTENT_DRAFT/Product-open roster/housing/cross-system proposals.

## Queue item 171 — shipped bilingual coverage recompute v2
Create NEW file only:
- `docs/qa-prep/SHIPPED_BILINGUAL_COVERAGE_RECOMPUTE_V2.md`

Recompute current-main player-facing RU+EN coverage after PR45 and PR46 status. Classify exact shipped surface families and remaining fallback debt.

## Queue item 172 — current-main CI regression floor v3
Create NEW file only:
- `docs/qa-prep/CURRENT_MAIN_CI_REGRESSION_FLOOR_V3.md`

Record exact current main SHA, validator counts, test count, latest successful relevant workflow evidence, and explicitly note when no post-merge push run exists.

## Queue item 173 — Product-open isolation audit v4
Create NEW file only:
- `docs/qa-prep/PRODUCT_OPEN_ISOLATION_AUDIT_V4.md`

Recheck School exact-course/teacher, Forest Hunter/Old Boundary deeper semantics, Secret Debt mechanics/rewards, Palace authored content, and broader relationship roster remain unpromoted.

## Queue item 174 — next production integration gate v13
Create NEW file only:
- `docs/qa-prep/NEXT_PRODUCTION_INTEGRATION_GATE_v13.md`

Summarize readiness after items 163–173 for poverty post-merge, Foreman PR46, project-owned static media, Forest route presentation, relationship depth, Secret Debt and Product-open content.

Continue items 163–174 sequentially without waiting for Lead review.


## Queue item 175 — static-media Lead branch pre-PR audit v1
Create NEW file only:
- `docs/qa-prep/PROJECT_OWNED_STATIC_MEDIA_LEAD_BRANCH_AUDIT_V1.md`

Review `lead/project-owned-static-media-v1` against current main. Require selective copy only, real local project-owned assets, current semantic IDs, no gameplay fields, RU+EN accessibility, no external media dependency.

## Queue item 176 — presentation altKey schema compatibility QA v1
Create NEW file only:
- `docs/qa-prep/PRESENTATION_ALTKEY_SCHEMA_COMPATIBILITY_QA_V1.md`

Review optional media `altKey` support for backward compatibility with existing presentation overrides/pools/editor. Locale must change alt text only, never selected media identity/RNG/Save.

## Queue item 177 — project-owned static slot-mapping QA v1
Create NEW file only:
- `docs/qa-prep/PROJECT_OWNED_STATIC_SLOT_MAPPING_QA_V1.md`

Verify activated Chat2 mappings against exact current `presentationSlots(catalog)`; reject unknown IDs, Product-open identities, or route/lore overreach.

## Queue item 178 — project-owned static build/runtime acceptance v1
Create NEW file only:
- `docs/qa-prep/PROJECT_OWNED_STATIC_BUILD_RUNTIME_ACCEPTANCE_V1.md`

Require source assets, build copy, runtime resolution, animations-off static fallback, future GIF coexistence, and locale switch preserving src/candidate identity.

## Queue item 179 — project-owned static accessibility runtime QA v1
Create NEW file only:
- `docs/qa-prep/PROJECT_OWNED_STATIC_ACCESSIBILITY_RUNTIME_QA_V1.md`

Verify RU+EN alt keys are actually consumed by renderer, not merely present in localization, while the same physical asset remains selected.

## Queue item 180 — Chat2 seasonal static selective-source QA v1
Create NEW file only:
- `docs/qa-prep/CHAT2_SEASONAL_STATIC_MEDIA_SELECTIVE_SOURCE_QA_V1.md`

Review Chat2 items 196–207 actual Git: 40 current seasonal career identities, actual project-owned SVGs, current semantic IDs, build distribution, RU+EN alt coverage, no gameplay fields.

## Queue item 181 — Chat2 non-career static wave QA v1
Create NEW file only:
- `docs/qa-prep/CHAT2_NON_CAREER_STATIC_WAVE_QA_V1.md`

Review items 208–219 as they appear: reachable School, ordinary poverty, current Forest routes/results and current Foreman only. Secret Debt/Product-open identities must remain excluded.

## Queue item 182 — non-Lumber result localization source QA v1
Create NEW file only:
- `docs/qa-prep/NON_LUMBER_RESULT_LOCALIZATION_SOURCE_QA_V1.md`

Review Chat5 items 37–48 actual Git. Validate exact nine current non-Lumber careers, RU+EN completeness, additive collision policy and separation from Lumber/Forest/Secret Debt.

## Queue item 183 — non-Lumber result UI consumer acceptance v1
Create NEW file only:
- `docs/qa-prep/NON_LUMBER_RESULT_UI_CONSUMER_ACCEPTANCE_V1.md`

Define Lead acceptance for localized result title/body consumption with unchanged lastAction, deltas, actionCounts, career state, RNG, Save and presentationId.

## Queue item 184 — Forest route presentation Lead-seam QA v1
Create NEW file only:
- `docs/qa-prep/FOREST_ROUTE_PRESENTATION_LEAD_SEAM_QA_V1.md`

Review future Lead route-state -> presentationId binding using only logging-road and old-boundary. No Hunter route, token reinterpretation, challenge mechanics or RNG/Save mutation.

## Queue item 185 — current-main localization/media debt recompute v3
Create NEW file only:
- `docs/qa-prep/CURRENT_MAIN_LOCALIZATION_MEDIA_DEBT_RECOMPUTE_V3.md`

Recompute exact shipped RU+EN event/media coverage after PR46 and current static-media integration status. Separate reachable debt from catalog-only/Product-open debt.

## Queue item 186 — next production integration gate v14
Create NEW file only:
- `docs/qa-prep/NEXT_PRODUCTION_INTEGRATION_GATE_V14.md`

Summarize readiness after items 175–185 for static media, non-Lumber result localization, Forest route presentation, Chat2 non-career assets, and current Product-open boundaries.

Continue items 175–186 sequentially without waiting for Lead review.


## Queue item 175 — project-owned static Lead branch source audit v2
Create NEW file only:
- `docs/qa-prep/PROJECT_OWNED_STATIC_LEAD_BRANCH_SOURCE_AUDIT_V2.md`

Review Lead branch `lead/project-owned-static-media-v1` against current main and Chat2 items 184–195.
Require selective copy only, actual 21 project-owned SVGs, current semantic IDs, no external media, no gameplay drift.

## Queue item 176 — presentation altKey schema compatibility QA v1
Create NEW file only:
- `docs/qa-prep/PRESENTATION_ALTKEY_SCHEMA_COMPATIBILITY_QA_V1.md`

Review any Lead addition of optional media `altKey`:
- optional/backward-compatible;
- locale-neutral asset/candidate identity;
- no Save field;
- no gameplay RNG input;
- editor/custom override compatibility;
- GIF candidate selection unchanged.

## Queue item 177 — static presentation slot mapping QA v1
Create NEW file only:
- `docs/qa-prep/STATIC_PRESENTATION_SLOT_MAPPING_QA_V1.md`

Validate every production static override uses an existing current semantic presentationId and correct intended asset family. Reject staged/Product-open IDs.

## Queue item 178 — static media build-distribution QA v2
Create NEW file only:
- `docs/qa-prep/STATIC_MEDIA_BUILD_DISTRIBUTION_QA_V2.md`

Verify all selectively integrated SVG files ship into `dist/assets/presentation`, preserve bytes, and every root presentation path resolves.

## Queue item 179 — static media RU EN invariance QA v1
Create NEW file only:
- `docs/qa-prep/STATIC_MEDIA_RU_EN_INVARIANCE_QA_V1.md`

Require same physical asset/source/semantic slot across RU↔EN; only alt/caption text may change. Check representative career, School, poverty, Forest and Foreman surfaces.

## Queue item 180 — Chat2 seasonal static source QA v1
Create NEW file only:
- `docs/qa-prep/CHAT2_SEASONAL_STATIC_SOURCE_QA_V1.md`

Review Chat2 items 196–207: 40 seasonal career SVGs, exact current semantic IDs, 50/50 claimed result+seasonal coverage, accessibility and build tests. Worker branch remains selective-copy only.

## Queue item 181 — Chat2 non-career static wave QA v1
Create NEW file only:
- `docs/qa-prep/CHAT2_NON_CAREER_STATIC_WAVE_QA_V1.md`

Review items 208–219 as they appear. Separate current shipped School/poverty/Forest/Foreman identities from Product-open/staged surfaces.

## Queue item 182 — Chat3 post-PR45 text and Forest route QA v1
Create NEW file only:
- `docs/qa-prep/CHAT3_POST_PR45_FOREST_ROUTE_QA_V1.md`

Review Chat3 items 185–208 actual Git:
- poverty text-only patch;
- shared Night/lodging presentation strings;
- current two Forest route presentation sources;
- Product-open isolation.
No gameplay approval.

## Queue item 183 — Chat5 seasonal content QA v1
Create NEW file only:
- `docs/qa-prep/CHAT5_NON_LUMBER_SEASONAL_CONTENT_QA_V1.md`

Review Chat5 items 49–60 as they appear. Require exact nine non-Lumber current seasonal presentation identities, RU+EN text-only content, no mechanic/Forest-route bleed.

## Queue item 184 — static media production PR acceptance v1
Create NEW file only:
- `docs/qa-prep/STATIC_MEDIA_PRODUCTION_PR_ACCEPTANCE_V1.md`

For the forthcoming Lead static-media PR, require:
- exact-head CI;
- presentation validator/schema compatibility;
- build distribution;
- RU↔EN alt invariance;
- same selected asset identity;
- no gameplay/state drift;
- post-merge main CI.

## Queue item 185 — current-main regression floor v4
Create NEW file only:
- `docs/qa-prep/CURRENT_MAIN_CI_REGRESSION_FLOOR_V4.md`

Record exact current main SHA, latest successful push run, validator counts/test counts, and later update only with fresh evidence after static-media merge if it occurs during this wave.

## Queue item 186 — next production integration gate v14
Create NEW file only:
- `docs/qa-prep/NEXT_PRODUCTION_INTEGRATION_GATE_V14.md`

Summarize items 175–185:
- static-media Lead readiness;
- seasonal career source readiness;
- non-career static source readiness;
- poverty/Forest route text readiness;
- non-Lumber seasonal text readiness;
- Product-open isolation.

Continue items 175–186 sequentially without waiting for Lead review.


## Queue item 187 — PR48 seasonal static exact-head audit v1
Create NEW file only:
- `docs/qa-prep/PR48_SEASONAL_STATIC_EXACT_HEAD_AUDIT_V1.md`

Review PR #48 exact head against current main:
- 40 project-owned seasonal SVGs;
- 40 exact current semantic IDs;
- 80 RU+EN alt/caption keys;
- no runtime/gameplay changes;
- same asset identity across locales;
- exact-head CI evidence.

## Queue item 188 — PR48 post-merge main audit v1
Create NEW file only:
- `docs/qa-prep/PR48_SEASONAL_STATIC_POST_MERGE_AUDIT_V1.md`

Only after Git proves merge, verify exact merge SHA, current main and post-merge CI.
Until then mark NOT_YET_MERGED.

## Queue item 189 — seasonal static RU EN identity QA v2
Create NEW file only:
- `docs/qa-prep/SEASONAL_STATIC_RU_EN_IDENTITY_QA_V2.md`

Verify representative and full-set seasonal media:
- same presentationId;
- same physical SVG;
- same selected media identity;
- locale changes only alt/caption;
- no Save/RNG/action-result drift.

## Queue item 190 — Chat2 non-career safe subset acceptance v2
Create NEW file only:
- `docs/qa-prep/CHAT2_NON_CAREER_SAFE_SUBSET_ACCEPTANCE_V2.md`

Review Chat2 post-PR47 items 220–231 as they appear.
Require current-production-only School/poverty/Forest-result/Foreman mappings.
Reject Product-open route-specific assets from production activation.

## Queue item 191 — poverty 33-key copyedit production QA v1
Create NEW file only:
- `docs/qa-prep/POVERTY_33_KEY_COPYEDIT_PRODUCTION_QA_V1.md`

Review Chat3 post-PR47 final poverty text delta against exact current main.
Require existing keys only, RU+EN parity, no shared-media over-specialization, no mechanics/Secret Debt changes.

## Queue item 192 — shared Night/lodging consumer QA contract v1
Create NEW file only:
- `docs/qa-prep/SHARED_NIGHT_LODGING_CONSUMER_QA_CONTRACT_V1.md`

Define acceptance for future Lead UI wiring of the 20-key shared Night/lodging fixture:
- text-only;
- stable lodging/Night IDs;
- same costs/Energy/housing/commands/Save;
- locale switch invariance;
- no visible internal NightFlow terminology.

## Queue item 193 — non-Lumber seasonal text consumer QA contract v1
Create NEW file only:
- `docs/qa-prep/NON_LUMBER_SEASONAL_TEXT_CONSUMER_QA_CONTRACT_V1.md`

Define acceptance for consuming Chat5 36 seasonal RU+EN scene entries:
- exact nine non-Lumber careers × four seasons;
- same action/result/media identity;
- same deltas/actionCounts/RNG/Save;
- Lumber untouched;
- Hunter ordinary-work only.

## Queue item 194 — Forest route altKey normalization QA v1
Create NEW file only:
- `docs/qa-prep/FOREST_ROUTE_ALTKEY_NORMALIZATION_QA_V1.md`

Review Chat3 route-media localization keys against shipped PR47 altKey schema.
Require normalized key names without slash characters while preserving locale-neutral presentation IDs and exact RU+EN meaning.

## Queue item 195 — Forest route presentation seam invariance gate v2
Create NEW file only:
- `docs/qa-prep/FOREST_ROUTE_PRESENTATION_SEAM_INVARIANCE_GATE_V2.md`

Define executable acceptance for future route-state -> presentationId binding:
- logging-road / old-boundary exact route IDs;
- no route availability change;
- no RNG advance;
- no Save change;
- no result identity change;
- exact activityResult continuation;
- Hard Work 50-shift rule untouched.

## Queue item 196 — Chat5 legacy root bilingual wave QA v1
Create NEW file only:
- `docs/qa-prep/CHAT5_LEGACY_ROOT_BILINGUAL_WAVE_QA_V1.md`

Review Chat5 items 61–72 as they appear.
Require exact current root event/media IDs, RU+EN completeness, additive/identical localization only, and no overlap with School/poverty/Foreman/Forest/Secret Debt ownership.

## Queue item 197 — current-main CI regression floor v5
Create NEW file only:
- `docs/qa-prep/CURRENT_MAIN_CI_REGRESSION_FLOOR_V5.md`

Record exact current main SHA, latest successful push workflow, pack/event/action/ending validation counts and test count after PR48 status is known.
Never carry stale counts forward without evidence.

## Queue item 198 — next production integration gate v15
Create NEW file only:
- `docs/qa-prep/NEXT_PRODUCTION_INTEGRATION_GATE_V15.md`

Summarize items 187–197:
- PR48 seasonal media;
- Chat2 non-career safe subset;
- poverty copyedit;
- shared Night/lodging;
- non-Lumber seasonal text;
- Forest route presentation;
- Chat5 legacy root localization;
- Product-open isolation.

Continue items 187–198 sequentially without waiting for Lead review.


## Queue item 199 — PR49 post-merge main audit v1
Create NEW file only:
- `docs/qa-prep/PR49_NON_CAREER_STATIC_POST_MERGE_AUDIT_V1.md`

Verify from actual Git:
- PR49 merged;
- exact merge SHA;
- current main SHA;
- 27 refined current-production mappings;
- 54 RU+EN accessibility keys;
- Product-open route-specific assets remain absent;
- latest post-merge main workflow evidence.

## Queue item 200 — PR49 static refinement identity QA v1
Create NEW file only:
- `docs/qa-prep/PR49_STATIC_REFINEMENT_IDENTITY_QA_V1.md`

Verify the refined School/poverty/Forest-return/Foreman assets preserve:
- same semantic presentationId;
- same gameplay/event identity;
- same selected static source across RU↔EN;
- same Save/RNG/effects/counters;
- only accessibility/presentation text changes.

## Queue item 201 — Forest route/default generic static acceptance v1
Create NEW file only:
- `docs/qa-prep/FOREST_ROUTE_DEFAULT_GENERIC_STATIC_ACCEPTANCE_V1.md`

Review Chat2 item 227/228:
- exact existing `activity/forest/route/default`;
- asset visually neutral between logging-road / old-boundary;
- no Hunter/token/challenge semantic leak;
- RU+EN alt/caption;
- presentation-only;
- safe to ship independently of route-specific seam.

## Queue item 202 — Chat2 animation capability QA v1
Create NEW file only:
- `docs/qa-prep/CHAT2_PROJECT_OWNED_ANIMATION_CAPABILITY_QA_V1.md`

Review Chat2 items 232–243 as they appear.
Require:
- no external downloaded GIFs;
- project-owned source frames;
- reproducible export path;
- no fake GIF files;
- no new dependency without explicit approval;
- 3–5 actual compatible candidates before any production pool claim.

## Queue item 203 — project-owned GIF deterministic-selection QA v1
Create NEW file only:
- `docs/qa-prep/PROJECT_OWNED_GIF_DETERMINISTIC_SELECTION_QA_V1.md`

If Chat2 produces an actual pool, define/check:
- current semantic presentationId only;
- stable locale-neutral candidate keys;
- locale switch does not change candidate;
- gameplay RNG and Save untouched;
- static fallback preserved;
- animations-off path remains deterministic.

If no real pool exists, classify BLOCKED_BY_EXPORT rather than green.

## Queue item 204 — Chat3 post-PR48 poverty text QA v1
Create NEW file only:
- `docs/qa-prep/CHAT3_POST_PR48_POVERTY_TEXT_QA_V1.md`

Review Chat3 items 221–223:
- exact current-main existing keys only;
- RU+EN parity;
- no static-media key edits;
- no Secret Debt;
- natural-path expectations match current production IDs.

## Queue item 205 — Chat3 Forest route normalized-altKey QA v1
Create NEW file only:
- `docs/qa-prep/CHAT3_FOREST_ROUTE_NORMALIZED_ALTKEY_QA_V1.md`

Review items 224–229:
- normalized alt/caption keys satisfy shipped PR47 schema;
- presentation IDs retain slash form;
- no root localization collisions;
- route/result/activityResult/Hard Work invariants unchanged;
- route-specific assets remain source-only until Lead seam.

## Queue item 206 — Chat5 post-PR49 legacy outcome QA v1
Create NEW file only:
- `docs/qa-prep/CHAT5_POST_PR49_LEGACY_OUTCOME_QA_V1.md`

Review Chat5 items 73–84 as they appear:
- exact current legacy root event/choice/media IDs;
- RU+EN complete;
- outcome strings derived from stable identity;
- no locale-selected prose written into gameplay Save;
- ownership exclusions preserved.

## Queue item 207 — localized journal/outcome consumer acceptance contract v1
Create NEW file only:
- `docs/qa-prep/LOCALIZED_JOURNAL_OUTCOME_CONSUMER_ACCEPTANCE_V1.md`

Define acceptance for any future Lead shared consumer that localizes post-choice/journal outcome text:
- Save remains locale-neutral;
- stable event/choice identity drives presentation;
- locale switch changes only rendered text;
- historical gameplay semantics/effects remain identical;
- old saves remain readable.

## Queue item 208 — post-PR49 shipped bilingual/static coverage recompute v1
Create NEW file only:
- `docs/qa-prep/POST_PR49_SHIPPED_COVERAGE_RECOMPUTE_V1.md`

Recompute exact current-main:
- player-facing RU+EN shipped coverage;
- project-owned static coverage;
- generic static gaps;
- visible RU fallback debt;
- shared-consumer debt;
- Product-open surfaces.

Use actual current root files, not previous gate counts.

## Queue item 209 — current-main CI regression floor v6
Create NEW file only:
- `docs/qa-prep/CURRENT_MAIN_CI_REGRESSION_FLOOR_V6.md`

Record exact current main SHA, latest successful push workflow, validator counts and test count after PR49 merge.
If no post-merge run exists yet, state that explicitly and do not substitute PR exact-head evidence.

## Queue item 210 — next production integration gate v16
Create NEW file only:
- `docs/qa-prep/NEXT_PRODUCTION_INTEGRATION_GATE_V16.md`

Summarize items 199–209:
- PR49 post-merge;
- generic Forest route/default static;
- Chat2 animation pipeline;
- Chat3 poverty/Forest route readiness;
- Chat5 legacy outcome localization;
- journal/outcome shared consumer;
- remaining static/media/localization gaps;
- Product-open isolation.

Continue items 199–210 sequentially without waiting for Lead review.


## Queue item 211 — PR50 exact-head Forest route/default static audit v1
Create NEW file only:
- `docs/qa-prep/PR50_FOREST_ROUTE_DEFAULT_EXACT_HEAD_AUDIT_V1.md`

Review PR50 exact head:
- one generic project-owned route/default SVG;
- exact existing `activity/forest/route/default`;
- RU+EN alt/caption;
- no route-specific semantics;
- no gameplay/runtime/schema changes;
- exact-head CI evidence.

## Queue item 212 — PR50 post-merge main audit v1
Create NEW file only:
- `docs/qa-prep/PR50_FOREST_ROUTE_DEFAULT_POST_MERGE_AUDIT_V1.md`

Only after Git proves merge, record exact merge SHA, current main and post-merge push CI.
Until then mark NOT_YET_MERGED.

## Queue item 213 — Forest route/default natural-path UI QA v1
Create NEW file only:
- `docs/qa-prep/FOREST_ROUTE_DEFAULT_NATURAL_PATH_UI_QA_V1.md`

Verify natural Explore -> enter `lumber.forest` path shows the generic static fallback and RU↔EN switch preserves the exact Activity envelope, route state, RNG and Save.

## Queue item 214 — poverty 33-key final integration QA v2
Create NEW file only:
- `docs/qa-prep/POVERTY_33_KEY_FINAL_INTEGRATION_QA_V2.md`

Review the current post-PR49/50 33-key Chat3 patch before Lead merge:
existing keys only, complete RU+EN, no media keys, no Secret Debt, no gameplay fields, natural-path identity preserved.

## Queue item 215 — legacy root 109-key production patch QA v2
Create NEW file only:
- `docs/qa-prep/LEGACY_ROOT_109_KEY_PRODUCTION_PATCH_QA_V2.md`

Review Chat5 item 82 against exact current main:
- 17 current event IDs;
- 16 current media IDs;
- 26 choice-outcome keys;
- complete RU+EN;
- additive/identical/reviewed text-only;
- no other-owner overlap;
- no gameplay fields.

## Queue item 216 — legacy pending-scene localization acceptance v1
Create NEW file only:
- `docs/qa-prep/LEGACY_PENDING_SCENE_LOCALIZATION_ACCEPTANCE_V1.md`

Define/verify RU↔EN acceptance for representative legacy root pending scenes:
same event/variant/choice IDs, same effects/RNG/Save, localized title/body/choice label/media alt only.

## Queue item 217 — journal/outcome locale-neutral Save migration QA v2
Create NEW file only:
- `docs/qa-prep/JOURNAL_OUTCOME_LOCALE_NEUTRAL_SAVE_MIGRATION_QA_V2.md`

Refine acceptance for a future shared consumer:
- never persist selected locale prose as gameplay identity;
- old text-only saves remain readable;
- no fuzzy prose-to-ID migration;
- stable event/choice identity when available;
- locale switch presentation-only.

## Queue item 218 — global UI-shell localization source QA v1
Create NEW file only:
- `docs/qa-prep/GLOBAL_UI_SHELL_LOCALIZATION_SOURCE_QA_V1.md`

Review Chat5 next-wave UI-shell source as it appears.
Require text-only stable keys for Explore/Sleep/Stats/Journal/Bag/Legacy/Arrival/shared buttons and no mechanics/state changes.

## Queue item 219 — hardcoded player-facing text debt recompute v1
Create NEW file only:
- `docs/qa-prep/HARDCODED_PLAYER_FACING_TEXT_DEBT_RECOMPUTE_V1.md`

Audit exact current `src/ui/app.ts` after PR50 status.
Count/classify remaining player-facing hardcoded RU strings:
- SHARED_UI_SHELL;
- NIGHT_LODGING;
- ACTIVITY;
- ENDING_LEGACY;
- DEBUG_INTERNAL;
- NON_PLAYER_FACING.

## Queue item 220 — post-PR50 static coverage closure QA v1
Create NEW file only:
- `docs/qa-prep/POST_PR50_STATIC_COVERAGE_CLOSURE_QA_V1.md`

If PR50 merges, recompute established 80-ID project-owned static target:
- exact root mappings;
- exact physical project-owned sources;
- remaining gaps.
Do not count Product-open route-specific slots.

## Queue item 221 — current-main CI regression floor v7
Create NEW file only:
- `docs/qa-prep/CURRENT_MAIN_CI_REGRESSION_FLOOR_V7.md`

Record exact current main SHA, latest successful push run, validator counts and test count after PR50 status is known.

## Queue item 222 — next production integration gate v17
Create NEW file only:
- `docs/qa-prep/NEXT_PRODUCTION_INTEGRATION_GATE_V17.md`

Summarize items 211–221:
- PR50;
- poverty 33-key text patch;
- legacy 109-key patch;
- journal/outcome consumer;
- global UI shell localization;
- remaining hardcoded text;
- static coverage closure;
- Product-open isolation.

Continue items 211–222 sequentially without waiting for Lead review.


## Queue item 223 — PR51 post-merge poverty audit v1
Create NEW file only:
- `docs/qa-prep/PR51_POVERTY_COPYEDIT_POST_MERGE_AUDIT_V1.md`

Verify PR51 merge SHA, current main, 33 existing-key replacements, no media/Secret Debt/gameplay drift, and post-merge CI.

## Queue item 224 — PR52 exact-head legacy localization audit v1
Create NEW file only:
- `docs/qa-prep/PR52_LEGACY_ROOT_LOCALIZATION_EXACT_HEAD_AUDIT_V1.md`

Verify 109-key scope, 108 additive + 1 identical, exact legacy event/media IDs, RU+EN completeness and exact-head CI.

## Queue item 225 — PR52 post-merge legacy localization audit v1
Create NEW file only:
- `docs/qa-prep/PR52_LEGACY_ROOT_LOCALIZATION_POST_MERGE_AUDIT_V1.md`

Verify actual merge SHA/current main/post-merge push CI.

## Queue item 226 — locale-neutral journal ref schema QA v1
Create NEW file only:
- `docs/qa-prep/LOCALE_NEUTRAL_JOURNAL_REF_SCHEMA_QA_V1.md`

Review the forthcoming Lead journal/outcome design:
old text-only saves remain valid, refs are optional/backward-compatible, no fuzzy prose migration, no gameplay identity changes.

## Queue item 227 — localized lastAction outcome QA v1
Create NEW file only:
- `docs/qa-prep/LOCALIZED_LASTACTION_OUTCOME_QA_V1.md`

Require stable event/choice-derived localization for choice outcomes while existing action/school results remain unaffected.

## Queue item 228 — journal RU EN switch invariance QA v1
Create NEW file only:
- `docs/qa-prep/JOURNAL_RU_EN_SWITCH_INVARIANCE_QA_V1.md`

Acceptance: locale switch changes rendered journal text only; serialized gameplay state/ref identity remains byte-stable where expected.

## Queue item 229 — Chat5 global UI shell production-readiness QA v2
Create NEW file only:
- `docs/qa-prep/CHAT5_GLOBAL_UI_SHELL_PRODUCTION_READINESS_QA_V2.md`

Review items 85–96 against current post-PR52 main and classify exact keys/consumers safe for Lead wiring.

## Queue item 230 — Chat3 shared Night UI production-readiness QA v2
Create NEW file only:
- `docs/qa-prep/CHAT3_SHARED_NIGHT_UI_PRODUCTION_READINESS_QA_V2.md`

Review Chat3 current shared Night/lodging fixture and consumer map against current main.

## Queue item 231 — Chat2 animation exporter proposal QA v1
Create NEW file only:
- `docs/qa-prep/CHAT2_ANIMATION_EXPORTER_PROPOSAL_QA_V1.md`

Review exporter options/recommendation for reproducibility, dependency risk, CI portability and no external asset ingestion.

## Queue item 232 — current-main bilingual coverage recompute v3
Create NEW file only:
- `docs/qa-prep/CURRENT_MAIN_BILINGUAL_COVERAGE_RECOMPUTE_V3.md`

Recompute shipped RU+EN coverage after PR51/52 from actual root localization and reachable player-facing surfaces.

## Queue item 233 — current-main CI regression floor v8
Create NEW file only:
- `docs/qa-prep/CURRENT_MAIN_CI_REGRESSION_FLOOR_V8.md`

Record exact current main SHA, latest successful push run, validator and test counts.

## Queue item 234 — next production integration gate v18
Create NEW file only:
- `docs/qa-prep/NEXT_PRODUCTION_INTEGRATION_GATE_V18.md`

Summarize items 223–233 and classify next Lead slices: journal/outcome consumer, global UI shell, shared Night UI, route-specific presentation seam, animation exporter.

Continue items 223–234 sequentially without waiting for Lead review.
