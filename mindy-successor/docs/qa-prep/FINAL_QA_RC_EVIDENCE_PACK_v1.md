# Final QA RC Evidence Pack v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Current main: `9aa0eaf964735e82b9b964bbdcaf5362c292868a`

## Current release-candidate evidence baseline

Merged milestones:

- PR20 — production activation;
- PR21 — shipped Product Acceptance evidence;
- PR22 — generic item capability + Activity option closure;
- PR23 — release-candidate generic QA contracts;
- PR24 — one-Save shipped E2E smoke.

Current PR24 merge commit records:

`npm run check`

green on merge-ref with:

- typecheck PASS;
- validate PASS;
- build PASS;
- **209/209 tests PASS**.

PR24 one-Save smoke now includes the real first-School blocking scene:

`base.school -> listen`

before NightFlow.

The only direct accelerator in that shipped E2E is:

`completed_shifts=49`

immediately before the real 50th Lumber shift.

No unresolved product-authoring state is injected.

---

# MUST_INTEGRATE_TESTS

## Already on main — keep mandatory in RC suite

### `tests/release-candidate-shipped-e2e.test.ts`

Primary one-Save cross-system evidence.

Current merged path:

```text
Lumber
-> Foreman
-> paid School
-> base.school scene
-> NightFlow
-> normal lodging
-> Foreman Night
-> Forest logging-road
-> Forest success
-> Lumber continuation
-> 49-shift accelerator
-> real 50th Lumber shift
-> Hard Work commit
-> completion
-> reload/retry
-> New Run
-> reload
```

Must remain green.

### `tests/product-acceptance-shipped-v1.test.ts`

Keep as broader row-level shipped evidence.

### `tests/item-capability-activity-closure.test.ts`

Keep as production capability/Activity-option closure evidence.

Critical contracts:

- general Forest entry;
- logging-road without item;
- capability-gated old-boundary route;
- route reload;
- pre-option save compatibility.

### `tests/qa-generic-item-capability-contract.test.ts`

Merged by PR23.

Keep mandatory:

- inventory-derived capability;
- worldFact non-equivalence;
- multiple providers;
- last-provider removal;
- unknown capability validation.

### `tests/qa-activity-option-reload.test.ts`

Merged by PR23.

Keep mandatory generic option/reload coverage.

Paired fixture:

`content/qa-activity-option-reload.fixture.json`.

### `tests/qa-architecture-gaps.test.ts`

Keep architecture regression coverage.

### `tests/qa-exactly-once-reload.test.ts`

Keep persistence/exactly-once regression coverage.

### `tests/qa-orphan-stage-gate.test.ts`

Keep state-machine reachability protection.

---

## Chat 4 tests still to integrate

### `tests/qa-one-save-state-drift-sentinel.test.ts`

**MUST INTEGRATE**

Adds independent cross-domain drift assertions around the PR24 path.

It is specifically intended to fail if later subsystems reset or duplicate:

- money;
- daytime Energy;
- Lumber progression;
- Foreman progression;
- School typed progress;
- Night day advance;
- Forest result;
- ending eligibility;
- Meta transaction.

Before integration, rebase onto current main and replace its optional School pending helper with the now-known exact merged behavior if desired:

`base.school -> listen`.

The test must execute, not skip, on current RC runtime.

### `tests/qa-minimal-rc-acceptance-gate-v2.test.ts`

**MUST INTEGRATE**

Provides compact independent locks for:

- exact Hard Work condition/reward;
- inventory capability semantics;
- schema-4 pre-option Activity compatibility;
- one-Save School/Night/Forest/ending chain.

Rebase onto current main.

Its route/capability feature gate must not cause skips after integration; current main supports those APIs.

### `tests/qa-shipped-dist-smoke-contract.test.ts`

**MUST INTEGRATE AFTER REBASE**

Run after build.

Before merge, update any exact expected dist shape/cardinality that predates PR22/PR23.

Do not weaken semantic checks.

Required built-artifact evidence:

- current production definitions present in `dist/content.json`;
- no synthetic School production action;
- current item definitions/options serialized;
- exact Hard Work contract;
- media paths valid;
- production packs appear exactly once.

---

# KEEP_AS_EVIDENCE

## `PR22_MERGED_MAIN_RECHECK_v1.md`

Keep as the authoritative audit of the PR22 capability/runtime merge.

## `PA_POST_PR22_ROW_RECLASSIFICATION_v1.md`

Keep as the current PA row logic until later authoring closes rows.

Key truth:

- PA14/15/18/19/20 natural shipped;
- PA17 mechanism shipped but natural ordered path still waits on acquisition;
- PA09 and PA16 remain authoring-blocked.

## `RC_AUTHORING_BLOCKER_EVIDENCE_PACK_v1.md`

Keep as the current “runtime ready vs human decision still needed” pack.

## `AUTHORING_DECISION_BLOCKER_MATRIX_v1.md`

Keep as compact decision ledger.

The newer evidence pack adds proof detail; this matrix remains useful for ownership tracking.

## `RC_SAVE_RELOAD_CORRUPTION_MATRIX_v1.md`

Keep as adversarial RC/future hardening plan.

Important current parser gaps discovered by the matrix, if not yet automated, should be converted to targeted tests rather than silently accepted.

## `MINIMAL_RC_ACCEPTANCE_GATE_v2.md`

Keep as the technical RC acceptance definition.

## `RELEASE_CANDIDATE_E2E_SMOKE_v2.md`

Keep as the manual/scripted longer-form smoke.

PR24 now provides the executable natural one-Save counterpart.

## `FINAL_QA_INTEGRATION_HANDOFF_v2.md`

Keep for historical consolidation through item 30.

This pack supersedes it for current PR24-era RC evidence.

## Architecture / failure-history evidence

Retain as reference:

- `ARCHITECTURE_GATE_AUDIT_v1.md`
- `ARCHITECTURE_GATE_AUDIT_POST_A6_v1.md`
- `ARCHITECTURE_MIGRATION_GATE_FINAL_v1.md`
- `PRODUCT_ACTIVATION_SAVE_EDGE_MATRIX_v1.md`
- `PRODUCT_ACTIVATION_FAULT_INJECTION_v1.md`
- `SAVE_RELOAD_ADVERSARIAL_MATRIX_v1.md`

They remain useful for regression campaigns but are not current row-status authority.

---

# AUTHORING_BLOCKED

These remain legitimate human/product decisions after PR24.

They are not failures of the 209/209 technical integration gate.

## Old Boundary Token acquisition

Still OPEN:

- real acquisition source;
- timing/context;
- player-facing explanation.

Runtime already supports:

- typed item;
- inventory capability;
- old-boundary route.

Seeded inventory is not natural PA09 evidence.

## Old Boundary Token retain/consume

Still OPEN.

Current route does not auto-consume.

That is not final product canon.

## Hunter-trail clue/capability identity

Still OPEN if third route remains target scope.

Need product decision for:

- canonical route;
- unlock identity;
- clue/capability/provider.

## School management/accounting threshold/provider

Still OPEN.

Need:

- owning track/course;
- exact threshold;
- School-owned provider;
- canonical public result/fact.

Do not restore synthetic `school.lumber-management`.

## School Arcana / Forest threshold/provider

Still OPEN if retained in target scope.

Need explicit accepted product identity/threshold/provider.

## Forest content depth

Still OPEN:

- third route;
- three challenge families;
- seasonal difference.

PR22 route infrastructure is not equivalent to this content depth.

## PA17 natural ordered item path

Runtime action-space mechanism is shipped.

Natural ordered product pass still depends on the PA09 acquisition decision.

---

# SUPERSEDED

## PR24 intermediate red review

### `PR24_ONE_SAVE_E2E_REVIEW_v1.md`

**SUPERSEDED as current status; KEEP only as defect provenance.**

It reviewed head:

`58ea5865...`

and correctly found:

- unhandled `base.school` pending scene;
- missing explicit 49-not-eligible assertion.

PR24 later fixed both:

- `base.school -> listen`;
- explicit 49 boundary;
- New Run reload.

Final PR24 merged with **209/209**.

Do not cite the earlier BLOCKER disposition as current.

---

## Pre-PR22 capability/Forest status

Superseded as current truth:

- `PA_CLOSURE_BRANCH_LIVE_DIFF_AUDIT_v1.md` current-status section;
- pre-PR22 worldFact capability assumptions;
- any document saying Forest entry requires Old Boundary Token.

Current product model:

- Forest entry general;
- logging-road natural;
- old-boundary route capability-gated.

---

## Pre-PR21/22 PA row status

Superseded as current row authority:

- `PRODUCT_ACCEPTANCE_FINAL_BLOCKERS_v1.md`
- `PRODUCT_ACCEPTANCE_ROW_RUNNER_READINESS_v1.md`
- `PR21_PRODUCT_ACCEPTANCE_LATEST_HEAD_RECHECK_v1.md`
- `RELEASE_CANDIDATE_DELTA_AFTER_PR21_v1.md`

Use:

`PA_POST_PR22_ROW_RECLASSIFICATION_v1.md`

plus current PR24 evidence.

---

## Old one-Save / smoke scripts

Superseded as primary RC flow:

- `PRODUCT_ACTIVATION_POST_MERGE_SMOKE_v1.md`
- `PRODUCT_ACCEPTANCE_SHIPPED_FLOW_SMOKE_v1.md`

Use current:

- merged `release-candidate-shipped-e2e.test.ts`;
- `RELEASE_CANDIDATE_E2E_SMOKE_v2.md`.

---

## Stale Chat 4 executable tests

Do not integrate unchanged:

### `qa-product-activation-regression-subset.test.ts`

Predates PR22 route model and uses the old capability/worldFact flow.

Port unique assertions only.

### `qa-product-acceptance-row-runner-readiness.test.ts`

Pre-activation readiness classification is obsolete.

### `qa-product-activation-sentinels.test.ts`

Mostly redundant with current merged production/static/dist contracts.

Integrate only any demonstrably unique assertion.

---

## Stale worker assumptions

Do not integrate unchanged:

- Chat 2 slash-ID rejection test;
- Chat 2 historical missing-media-gap test;
- Chat 3 worldFact capability Forest test;
- Chat 3 item-capability audit claiming token is not typed production state.

Rebase only the previously selected distinct worker breadth.

---

# POST_RELEASE_POLISH

These are valuable but not blockers for the current technical RC unless release ownership explicitly promotes them.

## Full corruption/fault campaign

Automate more rows from:

- `RC_SAVE_RELOAD_CORRUPTION_MATRIX_v1.md`;
- `PRODUCT_ACTIVATION_FAULT_INJECTION_v1.md`.

Especially useful future hardening:

- route/option logical corruption validation;
- stale content option removal;
- additional Night intercept corruption;
- media load fault simulation.

## Presentation/media polish

- final GIF/art replacement where desired;
- final item icons/descriptions;
- teacher/Forest route art;
- accessibility/alt-text audit;
- Animation Off final UX review.

## Platform release polish

- Windows packaging/install/uninstall;
- signing;
- backup/recovery UX;
- final asset size/load-time;
- release deployment verification.

PR24 had a Vercel deployment comment caused by provider daily deployment quota. That is an external deployment/ops concern, not evidence of a game-test regression.

---

# CURRENT ASSUMPTIONS

These assumptions are authoritative for this pack.

1. Main includes PR22 generic capability/Activity-option runtime.
2. Main includes PR23 generic QA contracts.
3. Main includes PR24 corrected one-Save shipped E2E.
4. PR24 merge-ref full check passed **209/209**.
5. The real School one-Save path includes:
   `base.school -> listen`
   before NightFlow.
6. Forest entry is general and costs 2 Energy.
7. Logging-road requires no item.
8. Old-boundary route requires inventory-derived `enter_old_boundary`.
9. No production acquisition source for `old_boundary_token` is approved.
10. No final token retain/consume policy is approved.
11. Hard Work remains only:
    `completed_shifts >= 50`.
12. Exact Hard Work Meta reward remains:
    `hardWork:lumber`.
13. The accepted repetition accelerator is:
    `completed_shifts=49`
    followed by a real 50th shift.
14. Full Forest 3-route / 3-challenge / season authoring is not complete.
15. School management/accounting public-result authoring is not complete.

If any assumption changes, rerun/revise the affected RC evidence rather than carrying this pack forward unchanged.

---

# Minimal current RC evidence set

For a compact release handoff, require:

## Current-main executable tests

- `release-candidate-shipped-e2e.test.ts`
- `product-acceptance-shipped-v1.test.ts`
- `item-capability-activity-closure.test.ts`
- `qa-generic-item-capability-contract.test.ts`
- `qa-activity-option-reload.test.ts`
- `qa-architecture-gaps.test.ts`
- `qa-exactly-once-reload.test.ts`
- `qa-orphan-stage-gate.test.ts`

## Chat 4 additions to integrate

- `qa-one-save-state-drift-sentinel.test.ts`
- `qa-minimal-rc-acceptance-gate-v2.test.ts`
- `qa-shipped-dist-smoke-contract.test.ts`

## Evidence docs

- `PA_POST_PR22_ROW_RECLASSIFICATION_v1.md`
- `RC_AUTHORING_BLOCKER_EVIDENCE_PACK_v1.md`
- `RC_SAVE_RELOAD_CORRUPTION_MATRIX_v1.md`
- `MINIMAL_RC_ACCEPTANCE_GATE_v2.md`
- this `FINAL_QA_RC_EVIDENCE_PACK_v1.md`

---

# Final technical disposition

Current merged release-candidate integration through PR24:

**TECHNICALLY GREEN — 209/209 merge-ref evidence**

Full Product Acceptance authoring:

**NOT CLOSED**

Remaining work is explicitly represented in the AUTHORING_BLOCKED section and must not be fabricated by QA.

No production runtime/UI/content file was modified by Chat 4.
