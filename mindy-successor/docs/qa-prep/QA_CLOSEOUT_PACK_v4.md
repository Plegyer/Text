# QA Closeout Pack v4

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Current main baseline: post-PR26 closeout + post-PR27 schema4 hardening  
Current technical regression floor: **221/221 PASS**

## TECHNICAL_GREEN

The current merged release-candidate runtime/QA surface is technically green.

Merged milestones:

- PR20 — production activation — 187/187;
- PR21 — shipped PA evidence — 194/194;
- PR22 — item capability / Activity options — 200/200;
- PR23 — generic capability QA floor — 208/208;
- PR24 — one-Save shipped E2E — 209/209;
- PR25 — final minimal RC gate — 218/218;
- PR26 — docs-only closeout;
- PR27 — schema4 omission + drift hardening — 221/221.

Current green technical domains:

- architecture / Resolver;
- schema4 save/load on exercised RC surface;
- typed School progression;
- real `base.school -> listen` blocking boundary;
- NightFlow exactly once;
- Lumber / Foreman;
- Forest logging-road;
- item-capability runtime;
- Activity route/option reload;
- ending / RunResult / Meta;
- exact Hard Work;
- semantic presentation/fallback.

Locked Hard Work remains:

```text
ending.lumber.hard-work
ONLY completed_shifts >= 50
rewardId hardWork:lumber
```

No School, Forest, item, relationship, Night, milestone or season prerequisite may be added.

Presentation RC-blocking missing asset count remains:

**0**

---

# MUST_INTEGRATE_TESTS

These Chat 4 tests are not part of the current merged 221 floor yet and should be integrated only as QA additions.

## `prior-work/astra/prototype-m3.2/tests/qa-one-save-state-drift-sentinel-v3.test.ts`

Purpose:

- independently rebuilds the merged-main one-Save path;
- requires real `base.school -> listen`;
- checks exact School money/Energy/progress;
- checks Night exactly once;
- checks natural logging-road;
- locks exact Forest `activityResult(lumber.forest, success, lumber.forest.success)` continuation;
- checks 49 not eligible -> real 50th shift;
- checks exact `hardWork:lumber`;
- checks New Run reload.

No unresolved authoring state is injected.

If v3 is integrated and green, it may supersede v2 as the preferred drift sentinel, but v2 should not be deleted silently from historical evidence.

## `prior-work/astra/prototype-m3.2/tests/qa-shipped-dist-smoke-contract.test.ts`

Still valuable as a post-build artifact contract.

Before integration, rebase exact expected dist shape to current post-PR22/27 content.

Required behavior:

- built `dist/content.json` matches current production source;
- production packs appear exactly once;
- current item definitions / Forest options ship;
- synthetic School action absent;
- exact Hard Work preserved;
- media references resolve.

Do not weaken a stale expectation merely to make the test pass.

---

# ALREADY_INTEGRATED TECHNICAL FLOOR

The following current-main tests are mandatory regression evidence and require no new Chat 4 integration action.

- `tests/release-candidate-shipped-e2e.test.ts`
- `tests/qa-minimal-rc-acceptance-gate-v2.test.ts`
- `tests/school-blocking-scene-compat.test.ts`
- `tests/qa-one-save-state-drift-sentinel-v2.test.ts`
- `tests/qa-schema4-omission-compat.test.ts`
- `tests/qa-generic-item-capability-contract.test.ts`
- `tests/qa-activity-option-reload.test.ts`
- `tests/item-capability-activity-closure.test.ts`
- `tests/product-acceptance-shipped-v1.test.ts`
- `tests/qa-exactly-once-reload.test.ts`
- `tests/qa-architecture-gaps.test.ts`
- `tests/qa-orphan-stage-gate.test.ts`
- `tests/night-flow.test.ts`
- `tests/ending-meta.test.ts`

The full suite remains authoritative beyond this named floor.

---

# KEEP_AS_EVIDENCE

## Current authority / closeout

- `docs/qa-prep/RC_CLOSEOUT_STATUS_v1.md`
- `docs/qa-prep/RC_HUMAN_DECISIONS_REQUIRED_v1.md`
- `docs/lumber-prep/LUMBER_FINAL_RC_ACCEPTANCE_MATRIX_v1.md`
- `docs/lumber-prep/OLD_BOUNDARY_TOKEN_PRODUCT_DECISION_IMPACT_v1.md`
- `docs/school-prep/SCHOOL_AUTHORING_DECISION_READY_PACKET_v1.md`
- `docs/presentation-prep/PRESENTATION_RC_EVIDENCE_PACK_v1.md`

## Chat 4 current closeout evidence

- `docs/qa-prep/PR26_CLOSEOUT_CONSISTENCY_AUDIT_v1.md`
- `docs/qa-prep/HUMAN_DECISION_FALSE_CLOSURE_AUDIT_v1.md`
- `docs/qa-prep/RC_DOC_AUTHORITY_AUDIT_v1.md`
- `docs/qa-prep/FINAL_TECHNICAL_REGRESSION_FLOOR_v1.md`
- `docs/qa-prep/QA_CLOSEOUT_PACK_v4.md`

## Compatibility / hardening evidence

- `docs/qa-prep/FINAL_SCHEMA4_RC_MATRIX_v1.md`
- `docs/qa-prep/RC_SAVE_RELOAD_CORRUPTION_MATRIX_v1.md`
- `docs/qa-prep/SAVE_RELOAD_ADVERSARIAL_MATRIX_v1.md`
- `docs/qa-prep/PRODUCT_ACTIVATION_FAULT_INJECTION_v1.md`

## Historical architecture evidence

Keep for provenance:

- `ARCHITECTURE_GATE_AUDIT_v1.md`
- `ARCHITECTURE_GATE_AUDIT_POST_A6_v1.md`
- `ARCHITECTURE_MIGRATION_GATE_FINAL_v1.md`
- post-A6 executable gap results.

Historical failed/not-covered statuses must not override later green integrated evidence.

---

# HUMAN_DECISION_REQUIRED

These remain genuine Product decisions.

QA must not select among them.

## Old Boundary Token

Need Product decisions for:

- acquisition source;
- timing/requirements;
- repeatability;
- retain vs consume/turn-in;
- permanent-access behavior, if any.

Already technically ready:

- item definition;
- inventory-derived capability;
- gated route;
- reload;
- provider removal semantics.

## Hunter trail

If retained in target scope, Product must decide:

- final route ID;
- clue/capability/unlock identity;
- provider/acquisition rule;
- authored route meaning.

Generic route runtime is already green.

## School management/accounting

Need Product decisions for:

- provider/course/track;
- threshold or alternate milestone type;
- public publication rule;
- canonical result identity.

Synthetic `school.lumber-management` must remain excluded from production.

## School Arcana / Forest

If retained in target scope, Product must decide:

- provider;
- threshold/milestone;
- canonical result identity;
- Forest consumer behavior.

No QA fixture threshold may become canon.

## Presentation polish priorities

Human/art prioritization remains optional because current blocking asset count is zero.

Optional art prioritization is not a technical RC decision.

---

# CONTENT_DEPTH_OPEN

## Forest

Current shipped depth:

- logging road;
- old-boundary capability route;
- generic route/options;
- save/reload;
- success/escape continuation.

Still authored depth required for the accepted full target:

- hunter-trail third route;
- navigation challenge family;
- physical-obstacle challenge family;
- interpretation/ritual-anomaly challenge family;
- meaningful deterministic seasonal topology/availability difference;
- final presentation/content text for those additions.

Runtime should be extended only if the accepted authored content proves the current option model insufficient.

---

# SUPERSEDED

These remain in the repository as provenance but are not current status authority.

## Pre-PR26 / pre-PR27 closeout packs

- `FINAL_QA_EVIDENCE_PACK_v3.md`
- `FINAL_QA_RC_EVIDENCE_PACK_v1.md`
- `FINAL_QA_INTEGRATION_HANDOFF_v2.md`
- `QA_CAPABILITY_CLOSURE_HANDOFF_v1.md`
- `QA_INTEGRATION_HANDOFF_v1.md`

Use this v4 pack plus PR26 authority docs.

## PR24 intermediate red review

- `PR24_ONE_SAVE_E2E_REVIEW_v1.md`

It correctly found the missing `base.school` resolution on an intermediate head.

PR24 later fixed that defect and merged green.

Keep only as defect provenance.

## Pre-PR22 capability assumptions

Any document/test interpretation saying:

- Forest entry requires Old Boundary Token;
- worldFact is production item ownership;
- new option-aware Forest can advance before route selection;
- token is not a production item

is superseded.

## PR21-era PA status

- `PRODUCT_ACCEPTANCE_GATE_RESULT_v1.md`

Historical only.

It predates the current one-Save/closeout/schema4 floors and contains an older test-count snapshot.

## Harness skeleton as current authority

- `PRODUCT_ACCEPTANCE_HARNESS_v1.md`

Keep as design history.

Current shipped E2E/RC gates are stronger executable authority.

## Old architecture gap snapshots

- `QA_GAPS_AFTER_A4_v1.md`
- post-A6 audit FAILED/NOT_COVERED status sections

Keep for historical traceability only.

---

# Current authority order

For current release-candidate QA/status conflicts:

1. current merged `main` executable behavior;
2. current full test/check result;
3. `PROJECT_STATE.md` for merged milestone chronology;
4. `RC_CLOSEOUT_STATUS_v1.md`;
5. `RC_HUMAN_DECISIONS_REQUIRED_v1.md`;
6. current Lumber/School/Presentation subsystem packets;
7. this Chat 4 closeout pack;
8. historical audits/plans.

No historical red snapshot may override a later green merged contract.

No runtime-green result may override an explicitly open Product decision.

---

# Final closeout disposition

## Technical runtime / RC QA

**TECHNICAL_GREEN**

Current merged regression floor:

**221/221**

## Chat 4 remaining integration

Only QA additions:

- one-Save sentinel v3;
- shipped-dist smoke after rebase.

## Product decisions

**HUMAN_DECISION_REQUIRED**

Only for the explicitly listed authoring families.

## Forest authored breadth

**CONTENT_DEPTH_OPEN**

## Presentation

Runtime/QA:

**GREEN**

Blocking assets:

**0**

Optional media/art:

non-blocking Product/art polish.

No production runtime/UI/content file was modified by Chat 4.
