# QA Capability Closure Handoff v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Capability closure branch: `lead/product-acceptance-closure-v1`  
Latest observed closure head: `424407ecfed0bf0b8998c4f4348a17172c2412fc`  
Main baseline at handoff: `7acbce7f8bdf911ce8ab3ed1a4b3e5e0902cd798`

## Current closure-branch state

The closure branch has advanced during Chat 4 review.

Important sequence:

1. intermediate head exposed generic-capability wiring/type defects;
2. head `a08f1d4...` fixed capability registry wiring and passed **200/200**;
3. head `a4fc9b2...` introduced explicit Activity option-model compatibility but failed typecheck because new envelopes omitted `optionModelVersion`;
4. latest observed head `424407ec...` now:
   - writes `optionModelVersion` on new Activity envelopes;
   - defaults old schema-4 envelopes to option-model 0;
   - adds explicit regression:
     `pre-option schema4 active Activity save preserves immediate legacy advance/escape behavior`.

At the instant this handoff is written, the latest `424407ec...` workflow is still running.

Therefore the previous green 200/200 is evidence for the earlier capability implementation, but **final merge approval still requires a green run on the latest head/merge-ref**.

---

# MUST_INTEGRATE

These are the smallest current Chat 4 capability-closure QA artifacts that should move forward.

## Executable — `qa-generic-item-capability-contract.test.ts`

Why:

- locks inventory-derived capability semantics;
- proves worldFact alone does not create item capability;
- proves multiple providers may expose one capability;
- proves capability deduplication;
- proves removal/consumption of the last provider removes capability;
- locks unknown-capability validation.

Current Chat 4 test is future-compatible and intentionally skips before the generic runtime exists.

After closure integration it must execute, not skip.

---

## Executable — `qa-activity-option-reload.test.ts`

Paired fixture:

`content/qa-activity-option-reload.fixture.json`

Why:

- isolates generic option behavior from Lumber product content;
- open option visible;
- capability option gated;
- option use through real Activity command;
- route persisted;
- used-option identity persisted;
- reload stable;
- duplicate option rejected;
- legacy `advance` and `escape` usable after route selection;
- capability disappearance before selection changes visibility deterministically.

After closure integration this test must execute, not skip.

---

## `PA_FALSE_GREEN_AFTER_CAPABILITY_RUNTIME_v1.md`

Why:

It is the current reporting rule after the capability runtime.

It prevents these false promotions:

- generic capability runtime => PA09 pass;
- seeded token inventory => natural acquisition pass;
- two route options => PA16 pass;
- capability option exists => natural PA17 pass.

It also records the important new natural-flow delta:

- PA14 natural;
- PA15 natural;
- PA18 natural;
- PA19 natural;
- PA20 natural

through the ordinary logging-road route.

---

## `PA_CLOSURE_RELEASE_GATE_v1.md`

Why:

It is the exact technical merge/release gate for the closure work.

Keep its requirements even if the specific latest-head typecheck blocker is fixed:

- exact latest-head full check;
- option-model initialization;
- pre-option schema-4 behavior;
- generic capability contract;
- option reload matrix;
- catalog validation;
- Hard Work regression;
- School/Night/presentation regression;
- honest authoring ledger.

When the latest closure head becomes green, update the status paragraph rather than discarding the gate.

---

## `QA_CAPABILITY_CLOSURE_HANDOFF_v1.md`

Use this manifest as the current integration pointer.

---

# KEEP_AS_EVIDENCE

## `PA_CLOSURE_BRANCH_LIVE_DIFF_AUDIT_v1.md`

Keep as defect-discovery provenance.

It caught real intermediate defects:

- wrong catalog property in capability lookup;
- duplicated itemCapability handling;
- wrong argument order;
- pre-option Activity behavior risk.

Those defects triggered/followed real Lead corrections.

However its original current-head BLOCKER list is no longer authoritative because later closure commits fixed those seams.

Use it as historical review evidence only.

---

## `PRODUCT_ACCEPTANCE_MINIMAL_CLOSURE_PLAN_v1.md`

Keep for the remaining authoring architecture.

Its generic capability-runtime section is now being implemented by the closure branch.

Its still-relevant authoring sections remain:

- acquisition source;
- consume/retain policy;
- School public result;
- full Forest depth.

Do not treat the entire plan as “still unimplemented”.

---

## `PRODUCT_ACCEPTANCE_NO_FALSE_GREEN_AUDIT_v1.md`

Keep as the broad pre-capability accelerator policy.

The newer:

`PA_FALSE_GREEN_AFTER_CAPABILITY_RUNTIME_v1.md`

is authoritative for PA09/14–20 after the closure runtime.

The older audit is still useful for:

- synthetic School action;
- threshold accelerators;
- ending pre-state;
- Night/creation helpers.

---

## `PR21_PRODUCT_ACCEPTANCE_LATEST_HEAD_RECHECK_v1.md`

Keep as the pre-capability shipped Product Acceptance baseline.

It documents why PR21 used capability acceleration honestly.

After closure merge, its PA14–20 classifications become historical.

Its School and Hard Work evidence remain relevant.

---

## `RELEASE_CANDIDATE_DELTA_AFTER_PR21_v1.md`

Keep as the bridge between PR20/PR21 and capability closure.

After closure merge, apply this capability handoff plus the closure release gate on top of it.

---

## Closure-native `item-capability-activity-closure.test.ts`

Lead-owned, not a Chat 4 artifact, but it should remain in the merged closure work.

Distinct current value:

- actual production Forest route behavior;
- real item definition/capability wiring;
- production reload;
- unknown-capability validation;
- multiple-provider behavior;
- pre-option schema-4 legacy `advance/escape`.

Chat 4 generic tests complement it with isolated QA contracts.

---

# SUPERSEDED

## Initial current-status portion of `PA_CLOSURE_BRANCH_LIVE_DIFF_AUDIT_v1.md`

Its findings about:

- `cat.definitions.items`;
- duplicate itemCapability switch handling;
- wrong hasItemCapability argument order

were valid on the reviewed intermediate head.

They were fixed by later closure commits.

Do not report those as current blockers after the fixed head.

The document itself remains KEEP_AS_EVIDENCE; its original “current disposition” is superseded.

---

## PR21 “Forest entry blocked without capability” behavior

PR21 correctly asserted this under the pre-closure product model.

The closure branch explicitly changes the model:

- Forest entry becomes general;
- logging-road is normal;
- Old Boundary Token changes route/action availability.

After closure merge, the old entry-blocked expectation must not remain in Product Acceptance tests.

Replace it with:

- general entry costs 2 Energy;
- logging-road visible without token;
- old-boundary route hidden without capability.

---

## Direct worldFact capability adapter as primary Forest PA evidence

After generic capability closure, this old mechanism is superseded for product/runtime capability tests:

`lumber.capability.enter-old-boundary`

A worldFact can remain in old fixtures/history, but it no longer represents production item capability ownership.

New capability QA must seed/use real inventory item definitions instead.

---

## Pre-option parse-only compatibility assertion

A test that merely deletes:

- routeId;
- resolvedOptionIds

and proves parse succeeds is no longer enough.

The latest closure model introduces:

`optionModelVersion`

and the required regression is behavioral:

- old option-model-0 save loads;
- `advance` still immediately available;
- `escape` still immediately available.

Use the latest behavior test.

---

# WAIT_FOR_AUTHORING

These are intentionally not QA/runtime closure failures.

## PA09 — Old Boundary Token acquisition

Runtime now understands real inventory-derived capabilities.

Still missing product decision/content:

- acquisition source;
- when it becomes obtainable;
- player-facing description/context.

Do not invent this in QA.

---

## Old Boundary Token retain/consume policy

Generic runtime currently performs capability reads only.

The old-boundary route test deliberately does not consume the token.

That is not final product canon.

Product/design must choose:

- retained;
- consumed;
- replaced/converted;
- another explicit authored effect.

Until then, keep policy OPEN.

---

## PA16 — full Forest depth

Still required:

- three route contexts;
- three challenge families;
- at least one authored seasonal difference.

The closure branch currently provides generic option support and two route choices.

That does not satisfy PA16.

---

## PA17 — natural item-dependent Activity route

The core mechanic now exists:

item capability changes available route actions.

Natural Product Acceptance still waits for PA09 acquisition.

Direct:

`inventory.old_boundary_token=1`

remains accelerator evidence.

Once acquisition is authored, rerun PA17 through the real player path.

---

## School PA07/PA08 public result

Capability closure does not address the School management/accounting milestone/public fact.

Still waiting for product authoring:

- exact School milestone condition;
- exact public fact provider;
- immediate School -> Lumber continuation path.

Do not let capability closure make these rows disappear from the open ledger.

---

## Additional Forest content identities

The closure gate/result mentions remaining product authoring such as the third/hunter-trail route and richer challenge topology.

Exact names/rules remain authoring-owned unless separately approved.

QA should test accepted authored IDs after they land, not create them.

---

# Required integration order after closure branch becomes green

1. merge/rebase closure runtime/content/tests;
2. confirm latest-head/merge-ref `npm run check` green;
3. integrate `qa-generic-item-capability-contract.test.ts`;
4. require it to execute with zero skip;
5. integrate fixture + `qa-activity-option-reload.test.ts`;
6. require it to execute with zero skip;
7. run shipped dist contract;
8. run old schema-4 save matrix;
9. run Hard Work/School/Night/presentation regressions;
10. update Product Acceptance runner:
    - PA14/15/18/19/20 natural logging-road;
    - PA17 seeded-inventory accelerator until acquisition is authored;
11. keep PA09/PA16/PA17-natural/School public-result items in OPEN authoring ledger.

---

# Capability closure truth table

| Capability-closure outcome | Current truth |
|---|---|
| item capability derives from inventory | runtime closure target |
| worldFact alone creates capability | **must be false** |
| multiple items can provide capability | supported generic behavior |
| removing last provider removes capability | required |
| Forest general entry | closure authored behavior |
| logging-road no item | natural |
| old-boundary route needs capability | capability-runtime behavior |
| old active save keeps legacy advance/escape | mandatory compatibility |
| token acquisition source | **WAIT_FOR_AUTHORING** |
| token consume/retain canon | **WAIT_FOR_AUTHORING** |
| 3 routes / 3 challenges / season depth | **WAIT_FOR_AUTHORING** |
| School management public fact | **WAIT_FOR_AUTHORING** |
| Hard Work changes | **none allowed** |

---

# Current handoff status

Latest observed closure head:

`424407ecfed0bf0b8998c4f4348a17172c2412fc`

contains fixes for the prior latest-head typecheck compatibility issue and adds explicit pre-option behavioral regression.

Its CI run:

`Product Acceptance Closure Check #14`

was **in progress** at the instant this manifest was prepared.

Therefore final technical merge disposition remains:

**WAIT FOR LATEST-HEAD CI RESULT.**

A prior 200/200 run is not sufficient for a newer head, even though it is strong evidence for the generic capability layer.

No production runtime/UI/content file was modified by Chat 4.
