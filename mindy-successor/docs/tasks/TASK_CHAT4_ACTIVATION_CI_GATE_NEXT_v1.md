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
