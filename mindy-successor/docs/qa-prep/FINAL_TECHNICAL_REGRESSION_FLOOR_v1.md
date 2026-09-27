# Final Technical Regression Floor v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Baseline: current main after PR27

## Purpose

Record the exact merged technical regression floors and the minimum tests that must remain in the release-candidate suite.

No percentages or quality rankings are used.

---

# Merged regression floor sequence

## PR20 — 187 tests

Milestone:

Production activation.

Added/locked:

- target Lumber production activation;
- first-class School command/UI;
- typed School progression;
- production NightFlow controls;
- production Forest Activity visibility;
- semantic presentation persistence;
- target Lumber endings;
- exact Hard Work reward ID.

Evidence:

**187/187 PASS**

This is the first production-activation floor.

---

## PR21 — 194 tests

Milestone:

Shipped Product Acceptance evidence.

Added/locked:

- shipped-catalog Lumber -> milestone -> Foreman path;
- paid School production evidence;
- production lodging/Foreman Night;
- explicit Forest accelerator boundary;
- ending eligibility/commit/completion/New Run evidence;
- first-class `schoolLesson` in PA harness.

Evidence:

**194/194 PASS**

This raises the floor from activation to production-catalog acceptance evidence.

---

## PR22 — 200 tests

Milestone:

Generic item capability + Activity option closure.

Added/locked:

- typed item capability derived from inventory;
- worldFact no longer equivalent to item ownership;
- general Forest entry;
- natural logging-road route;
- capability-gated old-boundary route;
- route/one-shot option persistence;
- pre-option schema4 Activity behavioral compatibility.

Evidence:

**200/200 PASS**

This is the capability/route runtime closure floor.

---

## PR23 — 208 tests

Milestone:

Release-candidate generic QA floor.

Added/locked independent QA contracts for:

- inventory capability semantics;
- multiple providers;
- provider removal;
- unknown capability rejection;
- authored Activity option visibility;
- capability-gated option visibility;
- option one-shot behavior;
- route reload;
- advance/escape continuity.

Evidence:

**208/208 PASS**

This is the first explicit non-redundant RC capability QA floor.

---

## PR24 — 209 tests

Milestone:

One-Save shipped E2E.

Added/locked one long persisted Save across:

```text
Lumber
-> Foreman
-> paid School
-> base.school -> listen
-> NightFlow
-> Forest logging-road
-> Forest success continuation
-> 49/50 Hard Work
-> commit/completion
-> Meta
-> New Run reload
```

The only direct long-threshold accelerator is:

`completed_shifts=49`

before one real 50th shift.

Evidence:

**209/209 PASS**

This is the first one-Save RC integration floor.

---

## PR25 — 218 tests

Milestone:

Final minimal RC acceptance gate.

Added/locked:

- exact Hard Work static contract;
- inventory-derived capability contract inside final gate;
- pre-option schema4 Activity compatibility;
- one-Save RC subset;
- dedicated School blocking-scene compatibility;
- NightFlow blocked until School scene resolution;
- no double tuition/Energy/School progress.

Evidence:

**218/218 PASS**

This is the final pre-closeout technical RC floor used by PR26.

---

# Current post-closeout floor — PR27

PR27 is later than the required 187 -> 194 -> 200 -> 208 -> 209 -> 218 sequence.

Milestone:

Final schema4 hardening.

Added/locked:

- final one-Save state-drift sentinel v2;
- direct schema4 omission of `progression.school`;
- direct schema4 omission of semantic `presentationId`.

Evidence:

**221/221 PASS**

Current technical RC regression floor:

**221 tests green**

PR27 does not alter Product decisions or production runtime/content/UI.

---

# Minimum retained regression set

The full suite remains authoritative.

The following tests are the minimum named release-candidate floor and must not disappear silently.

## Cross-system one-Save

### `release-candidate-shipped-e2e.test.ts`

Must retain:

- real Lumber/Foreman;
- paid School;
- real `base.school -> listen`;
- Night;
- natural Forest logging-road;
- exact Forest continuation;
- 49-not-eligible -> real 50th shift;
- commit/completion;
- exact `hardWork:lumber`;
- New Run reload.

## Final compact RC gate

### `qa-minimal-rc-acceptance-gate-v2.test.ts`

Must retain:

- exact Hard Work condition/reward;
- inventory capability semantics;
- schema4 pre-option Activity compatibility;
- compact one-Save transaction chain.

## State drift

### `qa-one-save-state-drift-sentinel-v2.test.ts`

Must retain independent drift checks across:

- money;
- Energy;
- Lumber;
- Foreman;
- School;
- Night;
- Forest;
- ending transaction;
- Meta;
- New Run.

Chat 4 v3 may supersede v2 only after integration and a green full check.

## Schema4 omission compatibility

### `qa-schema4-omission-compat.test.ts`

Must retain:

- missing `progression.school` -> empty typed School state;
- missing semantic `presentationId` -> mechanical identity unchanged.

## School blocking scene

### `school-blocking-scene-compat.test.ts`

Must retain:

- paid School -> blocking scene;
- NightFlow rejection while scene pending;
- reload;
- scene resolution;
- no duplicate tuition/Energy/progress.

## Generic item capability

### `qa-generic-item-capability-contract.test.ts`

Must retain:

- inventory-derived capability;
- worldFact non-equivalence;
- multiple providers;
- provider removal;
- unknown capability validation.

## Activity authored options

### `qa-activity-option-reload.test.ts`

Must retain:

- gated/open option visibility;
- real option use;
- one-shot identity;
- route persistence;
- reload;
- advance/escape continuity.

### `item-capability-activity-closure.test.ts`

Must retain production-specific:

- logging-road;
- old-boundary capability gate;
- schema4 option-model compatibility;
- current Forest behavior.

## Exactly-once persistence

### `qa-exactly-once-reload.test.ts`

Must retain cross-boundary transaction idempotency.

## Architecture guardrails

### `qa-architecture-gaps.test.ts`

### `qa-orphan-stage-gate.test.ts`

Must retain:

- resolver/validation adversarial coverage;
- unreachable/orphan state rejection.

## Domain lifecycle floors

### `night-flow.test.ts`

Must retain lodging/Night checkpoint exact-once behavior.

### `ending-meta.test.ts`

Must retain ending/RunResult/Meta compatibility and exactly-once behavior.

## Shipped PA evidence

### `product-acceptance-shipped-v1.test.ts`

Must retain production-catalog row evidence and explicit accelerator labeling.

---

# Tests that are evidence, not authority for Product decisions

A test may prove runtime mechanics without closing Product authoring.

Examples:

- seeded `old_boundary_token`;
- capability visibility;
- 49-shift accelerator;
- generic route fixtures.

These tests belong in the regression floor but cannot select:

- acquisition source;
- consume policy;
- School threshold;
- hunter identity;
- Forest content depth.

---

# Floor regression rule

A future change fails the technical RC floor if it removes or weakens any of these locked behaviors without an explicit accepted replacement:

- one-Save coherence;
- schema4 compatibility;
- inventory-derived capability;
- route persistence;
- School transaction exactly once;
- Night exactly once;
- exact Hard Work 50-shift rule;
- exact `hardWork:lumber`;
- RunResult/Meta exactly once;
- New Run Meta persistence.

If a test is replaced by a stronger equivalent:

1. name the replacement explicitly;
2. prove it covers the old invariant;
3. keep historical evidence rather than silently deleting the old contract.

---

# Current floor summary

Required historical sequence:

```text
187
-> 194
-> 200
-> 208
-> 209
-> 218
```

Current post-PR27 floor:

```text
221
```

No production runtime/UI/content file was modified by Chat 4.
