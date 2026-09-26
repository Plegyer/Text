# QA Integration Handoff v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Current context: PR20 merged green, PR21 merged green  
PR20 activation merge evidence: **187/187**  
PR21 final Product Acceptance workflow evidence: **194/194**

> Note: the Queue item text mentions “PR21 green 193/193”. The final successful workflow on commit `0cfe9980...` actually reports **194 tests / 194 pass / 0 fail**. This manifest uses the executable 194/194 evidence.

## Purpose

Deduplicate the accumulated Chat 4 QA artifacts and identify what should move forward after PR20 + PR21.

Categories:

- **MUST_INTEGRATE** — current QA evidence/test that should be brought onto main/release QA because it protects a distinct still-relevant invariant.
- **KEEP_AS_EVIDENCE** — historically/currently useful analysis or source-of-truth context; not required as an executable release gate.
- **SUPERSEDED** — status/readiness artifact whose conclusions were overtaken by PR20/PR21; do not use as current truth.
- **FUTURE_GATE_ONLY** — checklist/matrix to execute at release-candidate or after remaining authoring closes; not a statement of current failure.

Production runtime/UI/content remains outside Chat 4 ownership.

---

# MUST_INTEGRATE

## Current post-PR21 status artifacts

### `PR21_PRODUCT_ACCEPTANCE_LATEST_HEAD_RECHECK_v1.md`

Why:

- current row-by-row shipped/accelerator/open classification;
- verifies first-class School command;
- records honest capability accelerator;
- preserves School public-fact gap;
- locks Hard Work;
- corrects exact CI evidence to **194/194**.

This supersedes earlier row-readiness/status documents.

### `PRODUCT_ACCEPTANCE_MINIMAL_CLOSURE_PLAN_v1.md`

Why:

- smallest remaining implementation plan;
- no invented School threshold;
- no invented token acquisition source;
- separates item runtime primitive from Forest authoring depth;
- preserves Hard Work independence.

### `PRODUCT_ACCEPTANCE_NO_FALSE_GREEN_AUDIT_v1.md`

Why:

- prevents direct worldFact/counter/synthetic-action fixtures from being mislabeled as product passes;
- gives the reporting rule for PR21 and future closure tests.

### `PRODUCT_ACCEPTANCE_SHIPPED_FLOW_SMOKE_v1.md`

Why:

- one explicit boundary between natural shipped flow and accelerator evidence;
- usable immediately for post-merge/manual QA;
- supersedes the older activation smoke wording.

### `RELEASE_CANDIDATE_DELTA_AFTER_PR21_v1.md`

Why:

- current RC delta after both activation and shipped PA evidence;
- identifies the five remaining authoring rows;
- identifies post-merge integration evidence still needed.

### `QA_INTEGRATION_HANDOFF_v1.md`

This manifest itself is the integration pointer.

---

## Executable tests not yet on main

### `qa-product-activation-regression-subset.test.ts`

Status:

**NOT ON MAIN**

Integrate after rebasing to current main.

Keep labels explicit:

- capability path is accelerator;
- 49-shift setup is threshold compression;
- test does not close PA09/PA17.

Distinct value:

- cross-slice exactly-once regression;
- School/Night/Activity/ending transaction chain.

### `qa-shipped-dist-smoke-contract.test.ts`

Status:

**NOT ON MAIN**

Integrate as a post-build test or release CI step.

Distinct value:

- verifies actual `dist/content.json`;
- exact production pack cardinality;
- no synthetic School action;
- exact Hard Work condition/reward;
- built media existence.

Must run after `npm run build`.

---

## Worker checkpoint tests identified as high-value

These are not Chat 4-authored but are part of the Chat 4 integration handoff from:

`WORKER_CHECKPOINT_INTEGRATION_AUDIT_v1.md`.

Integrate/adapt after PR21:

- Chat 3 `lumber-ending-independence.test.ts`;
- Chat 3 `lumber-forest-acceptance-depth.test.ts`;
- Chat 5 `school-typed-state-compat.test.ts`;
- Chat 5 updated `school-full-reload-matrix.test.ts`;
- Chat 5 updated `school-night-choice-catalog.test.ts`;
- Chat 2 updated/consolidated `presentation-activation-acceptance.test.ts`.

Do not merge stale assertions unchanged.

---

# KEEP_AS_EVIDENCE

## Foundational Product Acceptance

### `PRODUCT_ACCEPTANCE_EXECUTION_PLAN_v1.md`

Keep as the procedural PA00–PA26 source.

It predates PR20/PR21 but remains a foundational execution plan, not a status report.

Where its assumptions conflict with the current accepted PR21 row interpretation, the PR21 evidence/recheck is the current status source.

---

## Architecture historical audits

Keep for traceability:

- `ARCHITECTURE_GATE_AUDIT_v1.md`;
- `ARCHITECTURE_GATE_AUDIT_POST_A6_v1.md`;
- `ARCHITECTURE_MIGRATION_GATE_FINAL_v1.md`;
- `QA_EXECUTABLE_GAP_RESULTS_POST_A6_v1.md`.

They explain why A5/A6/typed Resolver boundaries exist.

Do not use their pre-activation coverage counts as current release status.

---

## Phase B presentation audit

### `PHASE_B_PRESENTATION_AUDIT_v1.md`

Keep as architectural evidence for:

- semantic IDs;
- fallback;
- Animation Off;
- editor replacement;
- central stage.

Its cross-PR “PARTIAL” status is historical and superseded by PR20 activation.

### `PRODUCT_ACCEPTANCE_WIRING_REVIEW_v1.md`

Keep only for provenance of originally discovered cross-PR seams.

All “PR16/PR17 not green / not integrated” status is stale.

---

## Schema-4 compatibility reasoning

### `PRODUCT_ACTIVATION_SCHEMA4_COMPAT_MATRIX_v1.md`

Keep as compatibility reasoning.

PR20 fixed several source issues, but its old-save invariants remain useful.

The newer `PRODUCT_ACTIVATION_SAVE_EDGE_MATRIX_v1.md` is the executable future-gate version.

---

## Worker integration audit

### `WORKER_CHECKPOINT_INTEGRATION_AUDIT_v1.md`

Keep because it records:

- which Chat 2/3/5 tests add distinct coverage;
- which tests must be rewritten;
- which tests are duplicative.

After all named worker tests are integrated/dispositioned, this document becomes historical evidence.

---

## Product Activation PA regression plan

### `PRODUCT_ACTIVATION_PA_REGRESSION_SUBSET_v1.md`

Keep beside its executable test as rationale for:

- allowed accelerators;
- explicit exclusions;
- exactly-once boundaries.

The test is the gate; the document is evidence/context.

---

# SUPERSEDED

These documents should **not** be used as current status after PR20 187/187 and/or PR21 194/194.

## Pre-PR20 shipped activation status

### `PRODUCT_ACTIVATION_SHIPPED_CATALOG_AUDIT_v1.md`

Stale because it says target Lumber/School/Night/Forest/endings are not shipped.

PR20 shipped them.

### `PRODUCT_ACTIVATION_MERGE_GATE_CHECKLIST_v1.md`

Pre-merge checklist completed/superseded by PR20 green activation evidence.

Useful historical design only; no need to integrate as current gate.

### `LEAD_PRODUCT_ACTIVATION_DIFF_REVIEW_v1.md`

Stale Lead-source snapshot.

Its School ordering/Night test blockers were fixed before PR20 merge.

### `LEAD_PRODUCT_ACTIVATION_BLOCKER_RECHECK_v1.md`

Stale pre-final PR20 status.

Superseded by PR20 green activation merge and later PR21 evidence.

### `PR20_LATEST_HEAD_RECHECK_v1.md`

Explicitly stale.

It captures an intermediate PR20 state with 17 failing tests.

PR20 later merged green **187/187**.

Do not cite the red intermediate state as current.

### `PRODUCT_ACTIVATION_REGRESSION_RISK_LEDGER_v1.md`

Useful historically, but many risks became resolved facts in PR20.

Current remaining gaps are better represented by:

- PR21 recheck;
- minimal closure plan;
- no-false-green audit.

---

## Pre-fix presentation persistence status

### `PRESENTATION_SAVE_SCHEMA_COMPAT_AUDIT_v1.md`

Stale current-status claim.

It correctly discovered slash semantic ID rejection before the fix.

PR20 introduced slash-compatible semantic presentation persistence.

Keep only if historical defect provenance is needed; otherwise supersede.

---

## Pre-activation PA readiness

### `PRODUCT_ACCEPTANCE_EXECUTABLE_READINESS_v1.md`

Superseded by production activation and PR21 shipped execution.

### `PRODUCT_ACCEPTANCE_ROW_RUNNER_READINESS_v1.md`

Superseded.

Its “only PA00/PA01/PA10 shipped” classification predates PR20/PR21.

### `PRODUCT_ACCEPTANCE_FINAL_BLOCKERS_v1.md`

Superseded by PR21.

It was written immediately after PR20 and before PR21 shipped evidence.

Use:

`PR21_PRODUCT_ACCEPTANCE_LATEST_HEAD_RECHECK_v1.md`

for current PA row status.

### `PRODUCT_ACCEPTANCE_HARNESS_v1.md`

The old harness design document predates the first-class `schoolLesson` update and shipped PR21 runner.

Current executable harness + PR21 shipped test are authoritative.

---

## Older smoke

### `PRODUCT_ACTIVATION_POST_MERGE_SMOKE_v1.md`

Superseded by:

`PRODUCT_ACCEPTANCE_SHIPPED_FLOW_SMOKE_v1.md`

The new smoke more clearly separates natural shipped flow from one explicit accelerator boundary after PR21.

---

## Branch-only static tests not recommended for integration

### `qa-product-acceptance-row-runner-readiness.test.ts`

Status:

**NOT ON MAIN**

Do not integrate.

Its pre-activation readiness categories are obsolete after PR20/PR21.

### `qa-product-activation-sentinels.test.ts`

Status:

**NOT ON MAIN**

Most useful invariants are now covered by:

- production definitions;
- PR21 shipped static assertions;
- shipped-dist contract;
- Hard Work tests.

Do not integrate as a parallel static source unless one unique assertion is identified during rebase.

---

# FUTURE_GATE_ONLY

These artifacts are still useful, but they should be executed when cutting a release candidate or after the remaining authoring is implemented.

They are not current blocker-status documents.

## `PRODUCT_ACTIVATION_CI_EVIDENCE_v1.md`

Use as evidence-capture template for exact SHA/full check/dist/exactly-once results.

Historic “NOT RUN” lines from the pre-PR20 moment are stale; use the checklist, not the old status.

## `PRODUCT_ACTIVATION_DIST_CONTENT_AUDIT_v1.md`

Use with:

`qa-shipped-dist-smoke-contract.test.ts`

after build.

## `PRODUCT_ACTIVATION_SAVE_EDGE_MATRIX_v1.md`

Use for release regression of:

- old schema-4;
- presentation ID;
- School;
- Night;
- Activity;
- ending committed/completed.

## `PRODUCT_ACTIVATION_FAULT_INJECTION_v1.md`

Use for failure/recovery campaign.

Not all cases have executable evidence yet.

## `RELEASE_CANDIDATE_QA_GATE_v1.md`

Keep as the broad base release gate.

Apply:

`RELEASE_CANDIDATE_DELTA_AFTER_PR21_v1.md`

on top of it.

The old “PR21 not yet executed” portions are superseded by the delta.

## `WINDOWS_RELEASE_CHECKLIST_v1.md`

Independent platform/release gate.

Use when validating the Windows distribution.

It is not a Product Acceptance status artifact.

---

# Already integrated Chat 4 executable tests

The following are already present on current `main` and require no new integration action:

- `qa-architecture-gaps.test.ts`;
- `qa-exactly-once-reload.test.ts`;
- `qa-orphan-stage-gate.test.ts`.

Their continued green status is part of the normal full suite.

---

# Current authority order

When documents disagree, use this precedence for Product Acceptance/activation status:

1. executable current-main / release-candidate tests;
2. final PR21 workflow evidence: **194/194**;
3. `PR21_PRODUCT_ACCEPTANCE_LATEST_HEAD_RECHECK_v1.md`;
4. `PRODUCT_ACCEPTANCE_NO_FALSE_GREEN_AUDIT_v1.md`;
5. `PRODUCT_ACCEPTANCE_MINIMAL_CLOSURE_PLAN_v1.md`;
6. `RELEASE_CANDIDATE_DELTA_AFTER_PR21_v1.md`;
7. foundational execution/spec documents;
8. historical pre-PR20/pre-PR21 audits.

Do not let an older “BLOCKED/NOT SHIPPED” document override later executable green evidence.

Likewise, do not let PR21's accelerator mechanics evidence override the still-open authoring rows.

---

# Minimal integration package

For a compact Lead/release handoff, integrate:

## Documents

- `PR21_PRODUCT_ACCEPTANCE_LATEST_HEAD_RECHECK_v1.md`
- `PRODUCT_ACCEPTANCE_MINIMAL_CLOSURE_PLAN_v1.md`
- `PRODUCT_ACCEPTANCE_NO_FALSE_GREEN_AUDIT_v1.md`
- `PRODUCT_ACCEPTANCE_SHIPPED_FLOW_SMOKE_v1.md`
- `RELEASE_CANDIDATE_DELTA_AFTER_PR21_v1.md`
- `QA_INTEGRATION_HANDOFF_v1.md`

## Tests

- `qa-product-activation-regression-subset.test.ts`
- `qa-shipped-dist-smoke-contract.test.ts`

## Then execute/integrate

- selected distinct Chat 2/3/5 worker regressions;
- save-edge matrix;
- fault-injection subset;
- full `npm run check`;
- shipped-flow smoke.

This package carries current truth without dragging the full historical Chat 4 audit stack into main.

No production runtime/UI/content file was modified by Chat 4.
