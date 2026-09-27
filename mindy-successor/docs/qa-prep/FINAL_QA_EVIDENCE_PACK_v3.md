# Final QA Evidence Pack v3

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Current main: `6bbf6d5995d7741ce50954ff1c7ae96af7583d98`  
Latest merged final gate: PR25  
Final-gate evidence: **218/218 tests PASS**

## Current technical baseline

Merged release-candidate sequence:

- PR20 — production activation;
- PR21 — shipped Product Acceptance evidence;
- PR22 — generic item-capability / Activity-option closure;
- PR23 — generic RC QA contracts;
- PR24 — one-Save shipped E2E;
- PR25 — final minimal RC gate + School blocking-scene compatibility.

Current merged one-Save semantics include the real School blocking scene:

```text
school.course.arcana
-> base.school
-> reload
-> listen
-> NightFlow
```

The only accepted direct long-threshold accelerator in the shipped E2E remains:

`completed_shifts=49`

followed by one real 50th `lumber.shift`.

No unresolved School public result, Old Boundary acquisition, Forest success fact, ending reward or Meta state is injected.

---

# MUST_INTEGRATE

These are the remaining high-value Chat 4 artifacts not already on current main.

## `tests/qa-one-save-state-drift-sentinel-v2.test.ts`

**MUST INTEGRATE**

This is the final independent drift sentinel aligned exactly to merged PR24 semantics.

It requires:

`base.school -> listen`

and follows one Save through:

- Lumber;
- Foreman;
- School;
- Night;
- Forest logging-road;
- 49/50 Hard Work;
- ending transaction;
- Meta;
- New Run reload.

It independently locks drift-sensitive state:

- money;
- daytime Energy;
- Lumber counters;
- Foreman route/counters;
- School typed counters;
- Night day advance;
- Forest route/result;
- ending transaction identity;
- Meta reward;
- New Run persistence.

The earlier v1 drift sentinel should not be integrated once v2 is available.

## `tests/qa-shipped-dist-smoke-contract.test.ts`

**MUST INTEGRATE AFTER CURRENT-MAIN REBASE**

Still not on main.

Run after build and align any exact content cardinality with current PR22–PR25 production output.

It should protect the built artifact:

- target production definitions;
- current item definitions;
- current Activity options;
- approved production packs exactly once;
- no synthetic School action;
- exact Hard Work condition/reward;
- valid shipped media references.

Do not weaken the contract merely to accommodate stale pre-PR22 expectations.

## Current final docs

Integrate/retain as the compact current QA handoff:

- `docs/qa-prep/PR25_FINAL_GATE_LIVE_REVIEW_v1.md`
- `docs/qa-prep/FINAL_SCHEMA4_RC_MATRIX_v1.md`
- `docs/qa-prep/FINAL_AUTHORING_ONLY_BLOCKERS_v1.md`
- `docs/qa-prep/RELEASE_CANDIDATE_READINESS_MATRIX_v1.md`
- `docs/qa-prep/FINAL_QA_EVIDENCE_PACK_v3.md`

---

# Already integrated on main — mandatory evidence

These do not need another cherry-pick.

## One-Save RC

`tests/release-candidate-shipped-e2e.test.ts`

Merged PR24 evidence:

- one logical Save;
- real `base.school -> listen`;
- natural logging-road;
- Forest continuation;
- 49 not eligible;
- real 50th shift;
- exact ending transaction;
- exactly-once Meta;
- New Run reload.

PR24 merge-ref full check:

**209/209 PASS**

## Final minimal RC gate

`tests/qa-minimal-rc-acceptance-gate-v2.test.ts`

Merged by PR25.

Locks:

- exact Hard Work static contract;
- inventory-derived capability;
- pre-option schema-4 Activity compatibility;
- one-Save School/Night/Forest/ending chain.

## School blocking-scene compatibility

- `content/school-blocking-scene-compat.fixture.json`
- `tests/school-blocking-scene-compat.test.ts`

Merged by PR25.

Locks:

- paid School may open blocking scene;
- NightFlow cannot bypass it;
- pending scene survives reload;
- resolution does not recharge tuition/Energy;
- typed School progress remains single-commit;
- semantic School presentation remains stable.

## Capability / Activity QA

Already on main via PR23 / PR22:

- `tests/qa-generic-item-capability-contract.test.ts`
- `tests/qa-activity-option-reload.test.ts`
- `content/qa-activity-option-reload.fixture.json`
- `tests/item-capability-activity-closure.test.ts`

## Foundational current-main QA

Keep mandatory in full check:

- `tests/product-acceptance-shipped-v1.test.ts`
- `tests/qa-architecture-gaps.test.ts`
- `tests/qa-exactly-once-reload.test.ts`
- `tests/qa-orphan-stage-gate.test.ts`
- NightFlow tests;
- ending/meta tests;
- presentation tests.

PR25 merge-ref full check:

**218/218 PASS**

---

# KEEP_AS_EVIDENCE

These remain useful as provenance, reasoning or future hardening, but are not the minimal current-status authority.

## `PR22_MERGED_MAIN_RECHECK_v1.md`

Keep for the accepted capability/Activity runtime merge history.

## `PA_POST_PR22_ROW_RECLASSIFICATION_v1.md`

Keep for row-level Product Acceptance interpretation until authoring closes the remaining open rows.

## `RC_AUTHORING_BLOCKER_EVIDENCE_PACK_v1.md`

Keep detailed runtime-readiness evidence for each human decision.

The newer:

`FINAL_AUTHORING_ONLY_BLOCKERS_v1.md`

is the compact current ledger.

## `RC_SAVE_RELOAD_CORRUPTION_MATRIX_v1.md`

Keep as the adversarial save/reload campaign.

It identifies additional hardening opportunities beyond the minimal final gate.

## `MINIMAL_RC_ACCEPTANCE_GATE_v2.md`

Keep as the written contract behind the now-merged PR25 executable gate.

## `RELEASE_CANDIDATE_E2E_SMOKE_v2.md`

Keep as the longer manual/scripted companion to the merged one-Save executable smoke.

## Architecture/history

Keep as reference:

- architecture audits;
- migration gate;
- save/reload adversarial matrix;
- activation fault-injection plan;
- presentation Phase B audit;
- worker integration conflict audit.

They are not current final readiness status.

---

# HUMAN_DECISION_REQUIRED

These decisions remain outside QA ownership.

## Old Boundary Token

Need human/product decisions for:

- acquisition source;
- acquisition timing/context;
- retain/consume/transform policy.

Runtime capability mechanics are already green.

## Hunter-trail / third route identity

If still in target scope, product must define:

- route ID;
- clue/capability identity;
- unlock source;
- player-facing meaning.

Generic route runtime is already green.

## School management/accounting result

Need:

- exact School track/course;
- exact threshold;
- authoritative School-owned provider;
- canonical public result/fact/milestone.

Do not promote synthetic `school.lumber-management`.

## School Arcana / Forest result

If still in target scope, need:

- threshold;
- provider identity;
- consumer behavior.

QA must not infer these values.

---

# CONTENT_DEPTH

These are not generic runtime blockers.

## Forest third route

Current production has:

- logging road;
- old boundary.

A third accepted route still needs authored content.

## Three challenge families

Need three meaningfully distinct authored challenge families.

Current `counter.v1` + options infrastructure may support some designs, but final runtime needs cannot be judged until content is specified.

## Seasonal Forest difference

Need at least one accepted authored season-dependent Forest difference.

Calendar/condition infrastructure already exists.

---

# POST_RELEASE_POLISH

Unless explicitly promoted by release ownership, these are not current technical RC blockers.

## Presentation/media

- final GIFs;
- portraits;
- Forest art;
- item icons;
- final accessibility/alt text;
- final Animation Off UX polish.

Presentation runtime itself is green.

## Additional save corruption hardening

Potential future direct tests from the final schema/corruption matrices:

- schema-4 save missing entire School property;
- schema-4 pending/action save missing presentationId;
- route/option logical corruption;
- stale removed Activity option.

These are targeted robustness improvements, not currently known release-blocking failures.

## Platform/ops

- Windows packaging;
- install/uninstall;
- signing;
- backup/recovery UX;
- final performance/asset-load checks;
- deployment provider quota/ops verification.

---

# SUPERSEDED

## Pre-fix PR24 review

`PR24_ONE_SAVE_E2E_REVIEW_v1.md`

**SUPERSEDED AS CURRENT STATUS**

It correctly reviewed an intermediate red PR24 head and found:

- unhandled `base.school` pending scene;
- missing explicit 49-not-eligible assertion.

PR24 later fixed both, added New Run reload evidence and merged green at **209/209**.

Keep the review only as defect-discovery provenance.

Do not report its BLOCKER conclusion as current.

## One-Save drift sentinel v1

`tests/qa-one-save-state-drift-sentinel.test.ts`

**SUPERSEDED BY V2**

The v2 sentinel uses merged PR24 semantics exactly:

`base.school -> listen`

and additionally carries drift checks through New Run reload.

Integrate v2 only.

## Earlier final packs / handoffs

Superseded as final current authority:

- `FINAL_QA_RC_EVIDENCE_PACK_v1.md`
- `FINAL_QA_INTEGRATION_HANDOFF_v2.md`
- `QA_CAPABILITY_CLOSURE_HANDOFF_v1.md`
- `QA_INTEGRATION_HANDOFF_v1.md`

Keep only if historical sequencing is needed.

Use this v3 pack for current handoff.

## Pre-PR22 Forest/capability assumptions

Any current-status claim that:

- Forest entry requires Old Boundary Token;
- worldFact is the production item capability;
- new Forest runs may immediately `advance` before route selection;
- Old Boundary Token is not a typed production item

is superseded.

## Pre-PR20/21 activation/readiness status

Earlier red/not-shipped/readiness documents are historical only.

They must not override:

- merged main;
- PR24 one-Save E2E;
- PR25 218/218 final-gate evidence.

---

# Current release-candidate assumptions

1. PR25 is merged.
2. Final PR25 merge-ref check passed **218/218**.
3. PR24 one-Save smoke is merged and green.
4. Real first paid Arcana flow may open:
   `base.school`.
5. That scene resolves through:
   `listen`.
6. Resolving it does not repeat School payment/Energy/progress.
7. Forest general entry/logging-road is natural.
8. Old-boundary route remains inventory-capability gated.
9. Old Boundary Token acquisition remains unauthored.
10. Hard Work remains only 50 completed Lumber shifts.
11. Exact reward remains:
    `hardWork:lumber`.
12. The accepted long-threshold accelerator remains:
    `completed_shifts=49`
    followed by a real 50th shift.
13. Full Forest content depth remains open.
14. School public-result authoring remains open.
15. PR25 introduced no production runtime/content/UI changes.

If any assumption changes, rerun the relevant final gate rather than carrying this pack forward unchanged.

---

# Final readiness statement

## Technical runtime

**RUNTIME_GREEN**

## Current release QA

**QA_GREEN — 218/218 final-gate evidence**

## Human product decisions

**HUMAN_DECISION_REQUIRED**

for the explicit authoring ledger only.

## Forest breadth

**CONTENT_DEPTH OPEN**

## Presentation/art

**POST_RELEASE_POLISH / ASSET POLISH OPEN**

unless release ownership promotes it to a blocking requirement.

This pack is the current minimal Chat 4 QA handoff after PR25.

No production runtime/UI/content file was modified by Chat 4.
