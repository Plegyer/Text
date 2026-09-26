# Final QA Integration Handoff v2

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Current merged main: `0450d46eb29c2551c4ecf55f994e0f271e82e3c7`  
PR22 merge: `011572ef1335deda5ac33120c3a7ea7f9849dbbf`

## Current truth

Production activation and capability closure are merged.

Key executable milestones:

- PR20 activation gate: **187/187**
- PR21 shipped Product Acceptance gate: final workflow evidence **194/194**
- PR22 capability/Activity-option closure: latest accepted closure evidence **200/200**

Current Product Acceptance classification after PR22:

- **SHIPPED_PASS:** 16
- **ACCELERATOR_EVIDENCE_ONLY:** 7
- **OPEN_AUTHORING_BLOCKED:** 4
- **NOT_YET_PROVEN:** 0

The remaining blockers are product-authoring decisions, not known core architecture blockers.

---

# MUST_INTEGRATE_NOW

These files add distinct current-main release value and should be integrated/rebased onto the release-candidate branch.

## Executable QA

### `prior-work/astra/prototype-m3.2/tests/qa-generic-item-capability-contract.test.ts`

Integrate after PR22.

It must execute with zero skip and prove:

- capability comes from actual inventory item definitions;
- worldFact alone does not create capability;
- unknown capability validation rejects;
- multiple providers are supported;
- capability identity deduplicates;
- removal of last provider removes capability deterministically.

### `prior-work/astra/prototype-m3.2/content/qa-activity-option-reload.fixture.json`

### `prior-work/astra/prototype-m3.2/tests/qa-activity-option-reload.test.ts`

Integrate together.

They provide a generic, non-Lumber-specific route/option persistence contract:

- open option visible;
- capability option gated;
- real option dispatch;
- one-shot identity;
- route persisted;
- reload stable;
- duplicate use rejected;
- `advance` and `escape` preserved.

### `prior-work/astra/prototype-m3.2/tests/qa-shipped-dist-smoke-contract.test.ts`

Integrate as a post-build gate.

Run after `npm run build`.

It protects the built artifact rather than only source content:

- production catalog reaches `dist/content.json`;
- expected packs appear once;
- synthetic School action absent;
- exact Hard Work contract;
- media assets exist;
- semantic presentation derivation remains valid.

Before integration, update only if PR22 changed any exact expected production-content cardinality/shape.

Do not weaken the contract to make a stale expectation pass.

---

## Current QA status/docs

### `docs/qa-prep/PR22_MERGED_MAIN_RECHECK_v1.md`

Current merged-runtime truth for:

- generic item capabilities;
- schema-4 active Activity compatibility;
- general Forest entry;
- logging-road;
- old-boundary capability route;
- Hard Work unchanged.

### `docs/qa-prep/PA_POST_PR22_ROW_RECLASSIFICATION_v1.md`

Current PA00–PA26 classification.

This is the primary row-status source after PR22.

### `docs/qa-prep/AUTHORING_DECISION_BLOCKER_MATRIX_v1.md`

Primary remaining product-decision ledger.

It prevents unresolved design choices from being silently invented by implementation/QA.

### `docs/qa-prep/RELEASE_CANDIDATE_E2E_SMOKE_v2.md`

Primary current smoke sequence.

It uses the natural logging-road flow and separates seeded Old Boundary Token evidence from natural product reachability.

### `docs/qa-prep/RC_WORKER_INTEGRATION_CONFLICT_AUDIT_v1.md`

Use when integrating remaining Chat 2/3/5 tests.

It explicitly forbids bulk worker merges.

---

# MINIMAL RELEASE-CANDIDATE QA SUBSET

The smallest credible RC subset after PR22 is:

## Existing current-main tests

1. `tests/product-acceptance-shipped-v1.test.ts`
2. `tests/item-capability-activity-closure.test.ts`
3. `tests/qa-architecture-gaps.test.ts`
4. `tests/qa-exactly-once-reload.test.ts`
5. `tests/qa-orphan-stage-gate.test.ts`

## Chat 4 additions to integrate

6. `tests/qa-generic-item-capability-contract.test.ts`
7. `content/qa-activity-option-reload.fixture.json`
8. `tests/qa-activity-option-reload.test.ts`
9. `tests/qa-shipped-dist-smoke-contract.test.ts`

## Selected worker additions after rebase

10. Chat 2 `presentation-activation-acceptance.test.ts`
11. Chat 3 `lumber-ending-independence.test.ts`
12. Chat 5 `school-full-reload-matrix.test.ts`
13. Chat 5 `school-night-choice-catalog.test.ts`
14. Chat 5 `school-typed-state-compat.test.ts`

## Commands/evidence

Run on the exact RC SHA:

```bash
npm ci
npm run check
```

Then ensure the shipped-dist smoke executes after build.

Also execute the manual/scripted flow from:

`RELEASE_CANDIDATE_E2E_SMOKE_v2.md`

---

# KEEP_AS_EVIDENCE

These remain useful for provenance, architecture rationale or specialized future QA, but do not need to be the primary current-status documents.

## Architecture foundation

- `ARCHITECTURE_GATE_AUDIT_v1.md`
- `ARCHITECTURE_GATE_AUDIT_POST_A6_v1.md`
- `ARCHITECTURE_MIGRATION_GATE_FINAL_v1.md`
- `QA_EXECUTABLE_GAP_RESULTS_POST_A6_v1.md`
- `SAVE_RELOAD_ADVERSARIAL_MATRIX_v1.md`

## Product Acceptance foundation

- `PRODUCT_ACCEPTANCE_EXECUTION_PLAN_v1.md`
- `PRODUCT_ACCEPTANCE_NO_FALSE_GREEN_AUDIT_v1.md`
- `PRODUCT_ACCEPTANCE_MINIMAL_CLOSURE_PLAN_v1.md`

The execution plan remains procedural.

The current row truth is the post-PR22 reclassification, not older readiness counts.

## Capability-closure provenance

- `PA_CLOSURE_BRANCH_LIVE_DIFF_AUDIT_v1.md`
- `PA_CLOSURE_RELEASE_GATE_v1.md`
- `PA_FALSE_GREEN_AFTER_CAPABILITY_RUNTIME_v1.md`
- `QA_CAPABILITY_CLOSURE_HANDOFF_v1.md`

They document the path from intermediate closure defects to accepted PR22 behavior.

Their head-specific red/intermediate status must not override merged-main evidence.

## Release / failure planning

- `PRODUCT_ACTIVATION_SAVE_EDGE_MATRIX_v1.md`
- `PRODUCT_ACTIVATION_FAULT_INJECTION_v1.md`
- `RELEASE_CANDIDATE_QA_GATE_v1.md`
- `WINDOWS_RELEASE_CHECKLIST_v1.md`

Use them as focused execution plans where applicable.

## Worker architectural docs

Keep, but do not treat as current product status:

- Chat 2 presentation boundary audit;
- Chat 3 Lumber item-capability audit;
- Chat 5 School progression ownership audit.

---

# AUTHORING_BLOCKED

These are not QA defects and should not be “fixed” by inventing values.

## PA07 / PA08 — School public results

Still requires decisions for:

- management/accounting track/threshold;
- authoritative School-owned provider;
- canonical public fact/event/milestone;
- Arcana/Forest public result if still in scope.

Runtime School progression/Resolver infrastructure already exists.

## PA09 — Old Boundary Token product acquisition

Still requires:

- real acquisition source;
- timing/context;
- final player-facing description;
- retain/consume/transform policy.

Runtime item/capability infrastructure is already merged.

## PA16 — Forest depth

Still requires:

- third route;
- three challenge families;
- seasonal difference;
- final route/challenge content/presentation.

PR22 route infrastructure is ready but content depth is incomplete.

## PA17 — natural item-dependent route

The runtime mechanic is merged.

The ordered product path remains blocked only because PA09 acquisition is not authored.

Seeded inventory remains accelerator evidence.

## Hunter-trail identity

If the third route remains part of the accepted target, authoring must decide:

- clue/capability identity;
- unlock source;
- canonical IDs.

QA must not create these IDs.

---

# SUPERSEDED

Do not integrate these as current truth.

## Pre-PR20 activation status

- `PRODUCT_ACTIVATION_SHIPPED_CATALOG_AUDIT_v1.md`
- `PRODUCT_ACTIVATION_MERGE_GATE_CHECKLIST_v1.md`
- `LEAD_PRODUCT_ACTIVATION_DIFF_REVIEW_v1.md`
- `LEAD_PRODUCT_ACTIVATION_BLOCKER_RECHECK_v1.md`
- `PR20_LATEST_HEAD_RECHECK_v1.md`
- `PRODUCT_ACTIVATION_REGRESSION_RISK_LEDGER_v1.md`

PR20 later merged green.

## Pre-fix presentation status

- `PRESENTATION_SAVE_SCHEMA_COMPAT_AUDIT_v1.md`

Its slash-ID rejection finding was fixed by PR20.

## Pre-PR21 readiness/status

- `PRODUCT_ACCEPTANCE_FINAL_BLOCKERS_v1.md`
- `PRODUCT_ACCEPTANCE_ROW_RUNNER_READINESS_v1.md`
- `PRODUCT_ACCEPTANCE_HARNESS_v1.md`

Later shipped evidence supersedes their readiness conclusions.

## Pre-PR22 row/status behavior

- `PR21_PRODUCT_ACCEPTANCE_LATEST_HEAD_RECHECK_v1.md` as current row authority
- `PRODUCT_ACCEPTANCE_SHIPPED_FLOW_SMOKE_v1.md` as current smoke
- `RELEASE_CANDIDATE_DELTA_AFTER_PR21_v1.md` as current delta

Keep only for historical provenance.

Use instead:

- `PA_POST_PR22_ROW_RECLASSIFICATION_v1.md`
- `RELEASE_CANDIDATE_E2E_SMOKE_v2.md`
- this handoff.

## Old Forest capability assumptions

Any test/doc that says:

- Forest entry itself requires Old Boundary Token;
- worldFact `lumber.capability.enter-old-boundary` is the production capability;
- immediate `advance` is valid in a new option-aware Forest run;
- `old_boundary_token` is absent from typed production item APIs

is superseded by PR22.

---

# SUPERSEDED / DO NOT INTEGRATE UNCHANGED — Chat 4 tests

## `qa-product-acceptance-row-runner-readiness.test.ts`

Pre-activation readiness categories are obsolete.

## `qa-product-activation-sentinels.test.ts`

Most static invariants are now covered by merged production tests and shipped-dist contract.

Integrate only a demonstrably unique assertion, not the file wholesale.

## `qa-product-activation-regression-subset.test.ts`

Do **not** integrate unchanged.

It predates PR22 and uses the old capability/worldFact route before Forest progression.

Its cross-slice goals are now better covered by:

- current-main `product-acceptance-shipped-v1.test.ts`;
- `item-capability-activity-closure.test.ts`;
- E2E smoke v2.

If a unique exactly-once assertion is missing, port that assertion into the current route-aware test rather than reviving the stale flow.

---

# SUPERSEDED / DO NOT INTEGRATE UNCHANGED — worker tests

## Chat 2

Do not integrate unchanged:

- negative slash-ID `presentation-save-boundary.test.ts`;
- historical missing-media-gap test.

## Chat 3

Do not integrate unchanged:

- `lumber-forest-acceptance-depth.test.ts` using worldFact adapter/immediate advance;
- `lumber-item-capability-integration-audit.test.ts` asserting token is not typed production state.

## Chat 5

Do not bulk integrate fixture-only UI/activation manifests when current real UI/runtime tests already cover the same behavior.

---

# POST_RELEASE_POLISH

These items may improve presentation/release quality but are not current core Product Acceptance runtime blockers unless release ownership explicitly promotes them.

## Media/art polish

- replace placeholder/static media with final GIFs/art where desired;
- final teacher portraits;
- richer route/challenge art;
- item icons/descriptions;
- final alt-text/accessibility pass.

## Additional platform polish

- execute `WINDOWS_RELEASE_CHECKLIST_v1.md`;
- packaging/signing/install/uninstall checks;
- backup/recovery UX;
- performance/load-time checks on final media.

## Expanded fault campaign

Run the full:

`PRODUCT_ACTIVATION_FAULT_INJECTION_v1.md`

beyond the minimum RC subset for broader resilience confidence.

---

# Final authority order

When artifacts disagree, use:

1. exact release-candidate executable tests;
2. merged current-main behavior;
3. PR22 green 200/200 closure evidence;
4. `PR22_MERGED_MAIN_RECHECK_v1.md`;
5. `PA_POST_PR22_ROW_RECLASSIFICATION_v1.md`;
6. `AUTHORING_DECISION_BLOCKER_MATRIX_v1.md`;
7. `RELEASE_CANDIDATE_E2E_SMOKE_v2.md`;
8. older architecture/evidence docs.

Never allow a pre-PR22 worldFact/Forest assumption to override current merged behavior.

Never allow seeded item evidence to override the open PA09 acquisition decision.

---

# Release-candidate handoff

## Technical state

PR22 capability/Activity-option infrastructure:

**MERGED / GREEN**

Hard Work:

**UNCHANGED / LOCKED**

Natural Forest logging-road path:

**SHIPPED**

Old-boundary capability mechanism:

**SHIPPED**

Old Boundary Token acquisition:

**AUTHORING BLOCKED**

Full Forest depth:

**AUTHORING BLOCKED**

School public-result authoring:

**AUTHORING BLOCKED**

## Immediate QA action

Integrate the minimal executable subset above, rebase the five selected worker tests, run the full RC check and the E2E smoke v2.

Do not make production changes from Chat 4 to close authoring decisions.

No production runtime/UI/content file was modified by Chat 4.
