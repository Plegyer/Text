# RC Document Authority Audit v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Baseline: current main after PR26 + PR27

## Executive result

**AUTHORITY POINTERS ARE CURRENT**

The repository index correctly points the release-candidate reader to the post-PR25/26 closeout documents rather than older Product Acceptance readiness drafts.

PR27 adds QA-only hardening and raises the executable regression floor to 221/221; it does not invalidate the PR26 closeout authority structure.

---

# Current authoritative closeout sources

## Release-candidate status

Current authority:

`docs/qa-prep/RC_CLOSEOUT_STATUS_v1.md`

Use for:

- technical RC GREEN;
- full authored PA PARTIAL / NOT CLOSED;
- green subsystem summary;
- remaining Product decision families;
- zero blocking presentation assets.

## Human/Product decisions

Current authority:

`docs/qa-prep/RC_HUMAN_DECISIONS_REQUIRED_v1.md`

Use for:

- Old Boundary Token source/policy;
- hunter-trail unlock identity;
- School public-result provider/threshold;
- Forest depth;
- optional presentation polish.

This document is neutral and does not choose answers.

## Lumber

Current authority:

`docs/lumber-prep/LUMBER_FINAL_RC_ACCEPTANCE_MATRIX_v1.md`

Use for:

- Lumber-facing PA classification;
- exact Hard Work contract;
- token acquisition status;
- Forest depth status;
- accepted 49-shift accelerator interpretation.

Companion decision-impact source:

`docs/lumber-prep/OLD_BOUNDARY_TOKEN_PRODUCT_DECISION_IMPACT_v1.md`

Use for implementation impact after Product selects source/policy.

## School

Current authority:

`docs/school-prep/SCHOOL_AUTHORING_DECISION_READY_PACKET_v1.md`

Use for:

- management/accounting provider decision;
- threshold/milestone decision;
- Arcana/Forest provider/threshold decision if retained;
- teacher/content/certificate authoring decisions.

It does not replace the locked School runtime contracts.

## Presentation

Current authority:

`docs/presentation-prep/PRESENTATION_RC_EVIDENCE_PACK_v1.md`

Use for:

- current RC presentation evidence;
- semantic coverage;
- fallback safety;
- asset status;
- zero blocking presentation assets.

---

# Index consistency

`DOCUMENT_AUTHORITY_AND_INDEX_v0.md` currently links all required authority points:

- `qa-prep/RC_CLOSEOUT_STATUS_v1.md`;
- `qa-prep/RC_HUMAN_DECISIONS_REQUIRED_v1.md`;
- `lumber-prep/LUMBER_FINAL_RC_ACCEPTANCE_MATRIX_v1.md`;
- `lumber-prep/OLD_BOUNDARY_TOKEN_PRODUCT_DECISION_IMPACT_v1.md`;
- `school-prep/SCHOOL_AUTHORING_DECISION_READY_PACKET_v1.md`;
- `presentation-prep/PRESENTATION_RC_EVIDENCE_PACK_v1.md`.

Classification:

**PASS**

---

# Project-state consistency

`PROJECT_STATE.md` records:

- PR26 docs-only closeout;
- the same six closeout/decision sources;
- PR27 schema4 hardening;
- current 221/221 technical regression floor.

This is compatible with the authority index.

Classification:

**PASS**

---

# Documents that are historical/superseded as current status

These should remain in the repository for provenance and traceability but must not override the current closeout sources.

## `qa-prep/PRODUCT_ACCEPTANCE_GATE_RESULT_v1.md`

Historical PR21 gate.

It contains older PA row classifications and an older 193/193 text snapshot.

Later milestones supersede it:

- PR22 capability closure;
- PR24 one-Save E2E;
- PR25 final gate;
- PR27 schema4 hardening.

Status:

**SUPERSEDED AS CURRENT STATUS / KEEP AS EVIDENCE**

## `qa-prep/PRODUCT_ACCEPTANCE_HARNESS_v1.md`

Historical harness design/skeleton.

Its parameterized future-run framing predates the merged shipped Product Acceptance and one-Save RC tests.

Status:

**SUPERSEDED AS PRIMARY EXECUTION AUTHORITY / KEEP AS DESIGN EVIDENCE**

## `qa-prep/PRODUCT_ACCEPTANCE_EXECUTION_PLAN_v1.md`

Still useful as the detailed original PA procedure.

However it contains assumptions for the intended full authored slice, including still-open School/item/Forest-depth steps.

It must not override current closeout classification.

Status:

**KEEP AS NORMATIVE PROCEDURAL INTENT / NOT CURRENT STATUS**

## `qa-prep/ARCHITECTURE_GATE_AUDIT_v1.md`

Historical pre-final architecture audit.

Status:

**SUPERSEDED BY FINAL ARCHITECTURE GATE / KEEP AS EVIDENCE**

## `qa-prep/ARCHITECTURE_GATE_AUDIT_POST_A6_v1.md`

Historical gap-discovery audit.

Its FAILED/NOT_COVERED rows were subsequently addressed by the integrated Phase A gate.

Status:

**SUPERSEDED AS CURRENT STATUS / KEEP AS DEFECT PROVENANCE**

## `qa-prep/ARCHITECTURE_MIGRATION_GATE_FINAL_v1.md`

Final Phase A evidence remains valid.

Status:

**KEEP AS EVIDENCE**

It is not an RC closeout authority for current Product decisions.

## `qa-prep/QA_GAPS_AFTER_A4_v1.md`

Pre-A5/A6 gap snapshot.

Status:

**HISTORICAL / SUPERSEDED**

## `qa-prep/QA_EXECUTABLE_GAP_RESULTS_POST_A6_v1.md`

Post-A6 executable evidence history.

Status:

**KEEP AS HISTORICAL QA EVIDENCE**

## `qa-prep/RELEASE_CANDIDATE_SHIPPED_E2E_v1.md`

Useful PR24 one-Save execution evidence.

Status:

**KEEP AS EXECUTION EVIDENCE**

It does not supersede:

- current closeout status;
- human-decision ledger.

## `qa-prep/SAVE_RELOAD_ADVERSARIAL_MATRIX_v1.md`

Still useful hardening plan.

Status:

**KEEP AS FUTURE/REGRESSION EVIDENCE**

## `qa-prep/WINDOWS_RELEASE_CHECKLIST_v1.md`

Independent platform-release checklist.

Status:

**KEEP AS RELEASE OPERATIONS GATE**

It is not Product Acceptance status authority.

---

# PR27 effect on authority

PR27 adds:

- `qa-one-save-state-drift-sentinel-v2.test.ts`;
- `qa-schema4-omission-compat.test.ts`.

It raises the current technical regression floor to:

**221/221**

It does not add Product decisions.

Therefore:

- `RC_CLOSEOUT_STATUS_v1.md` remains the correct Product/RC status authority;
- `RC_HUMAN_DECISIONS_REQUIRED_v1.md` remains the correct decision authority;
- Project State should be used for the newest test-floor number.

No PR26 authority document should be deleted solely because PR27 added QA evidence.

---

# Authority rule for conflicts

If an older QA/product document disagrees with current closeout status:

1. current Git/main executable behavior;
2. `PROJECT_STATE.md` for merged milestone/test-floor chronology;
3. `RC_CLOSEOUT_STATUS_v1.md`;
4. `RC_HUMAN_DECISIONS_REQUIRED_v1.md`;
5. current subsystem authority packet;
6. historical audits/plans.

Older files should be marked/read as superseded, not erased.

---

# Final disposition

| Authority target | Result |
|---|---|
| RC closeout status | **CURRENT / CORRECT** |
| human decisions ledger | **CURRENT / CORRECT** |
| Lumber RC matrix | **CURRENT / CORRECT** |
| School decision packet | **CURRENT / CORRECT** |
| presentation RC evidence | **CURRENT / CORRECT** |
| index links | **CURRENT / CORRECT** |
| PR27 technical floor reflected in Project State | **CURRENT / CORRECT** |
| stale historical docs retained rather than deleted | **CORRECT POLICY** |

No production runtime/UI/content file was modified by Chat 4.
