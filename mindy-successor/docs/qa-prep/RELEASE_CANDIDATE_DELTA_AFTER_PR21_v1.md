# Release Candidate Delta After PR21 v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Baseline comparison: previous `RELEASE_CANDIDATE_QA_GATE_v1.md` vs post-PR20 + merged PR21 state  
PR20 merge: `9b427d75dc22021cd3373aa7dd3521782e54152d`  
PR21 merge: `e6c32903516d1ba40b9a3ffbf955d5f04783ac25`  
PR21 evidence head: `58dc20c6c277cb3b3142b5611db6bece83832d34`  
Latest main observed: `7acbce7f8bdf911ce8ab3ed1a4b3e5e0902cd798`

## Executive delta

The previous release-candidate gate was written after PR20 activation but before PR21 shipped Product Acceptance execution.

PR21 materially closes the evidence gap.

The temporary Product Acceptance workflow produced a successful:

- validation: 7 packs / 26 events / 26 actions / 9 endings;
- build: PASS;
- tests: **194/194 PASS**;
- full `npm run check`: PASS.

PR21 then merged.

The remaining release-candidate risk is no longer “is the activated Lumber/School/Night/Activity/ending stack wired?”

That integration is now broadly proven.

The remaining Product Acceptance gaps are concentrated in product authoring/depth plus post-merge QA integration.

---

# 1. Closed runtime/integration gates

## Production catalog activation

**CLOSED**

PR20 shipped:

- target `lumber.shift`;
- typed Lumber career;
- typed Foreman relationship;
- first-class School command;
- production NightFlow content;
- production Forest Activity;
- target endings;
- production semantic presentation persistence;
- UI reachability.

PR21 executes those production paths rather than isolated target catalogs.

---

## School command integration

**CLOSED**

First-class:

`schoolLesson`

is now used by:

- harness command adapters;
- shipped PA execution.

PR21 proves:

- tuition once;
- 1 daytime Energy once;
- full stat package;
- typed `lessons_completed`;
- semantic result presentation;
- reload exactly once.

The earlier School Resolver ordering blocker was fixed before PR21.

---

## Semantic presentation persistence

**CLOSED as activation integration**

PR20 fixed slash-compatible persisted semantic IDs.

PR21 uses real pending/result presentation IDs in shipped flows.

Remaining work is regression integration/fault coverage, not a known production blocker.

---

## Lumber / Foreman shipped route

**CLOSED**

PR21 directly proves:

`lumber.shift -> first-shift milestone -> Foreman notice -> professional route`

with:

- one Work Energy charge;
- zero extra Energy for reactive scenes;
- pending-scene reload.

All four seasonal Lumber variants are directly exercised.

---

## NightFlow shipped route

**CLOSED**

PR21 directly proves:

- `endDay`;
- normal lodging;
- payment exactly once;
- Foreman Night;
- pending event reload;
- calendar advance once.

---

## Forest Activity engine integration

**CLOSED at runtime boundary**

PR21 first proves normal Forest entry is blocked without the missing capability.

After an explicitly labeled capability accelerator it proves the real shipped:

- 2-Energy entry;
- Activity envelope;
- reload;
- advance;
- success;
- escape;
- result -> Resolver;
- Lumber continuation.

This closes the A5/runtime integration gate.

It does not close product item acquisition or Forest depth.

---

## Ending / Meta transaction integration

**CLOSED at runtime boundary**

PR21 uses a pre-threshold accelerator but executes real:

- 50th Lumber shift;
- eligibility calculation;
- continued ordinary play while eligible;
- explicit commitment;
- completion;
- retry/reload;
- New Run.

Exact locked contract remains:

`completed_shifts >= 50`

and:

`hardWork:lumber`.

---

# 2. Remaining authoring gates

The accepted PR21 row classification leaves five Product Acceptance rows open.

## PA07 — School milestone/public result

Needed:

- one authored School milestone/public result;
- School-owned progression condition;
- persisted public result.

Do not use synthetic `school.lumber-management`.

## PA08 — School -> Lumber public fact

Needed:

- authoritative School provider for the accepted management/accounting public fact;
- immediate Resolver continuation into Lumber/Foreman.

Exact threshold remains a product-authoring decision.

## PA09 — meaningful Old Boundary item/capability

Needed:

- real `old_boundary_token` inventory identity;
- acquisition source;
- real capability mapping;
- retain/consume semantics;
- save/reload;
- player-visible capability.

Direct worldFact insertion remains accelerator-only.

## PA16 — deeper Forest product depth

Needed:

- three route contexts;
- three challenge families;
- seasonal difference;
- save/resume over that richer state.

Current `counter.v1` proves architecture, not required product depth.

## PA17 — item-dependent Activity action

Needed:

- actual item/capability-dependent internal action;
- action absent without capability;
- action available with capability;
- meaningful route/action-space change.

Existing `advance/escape` is insufficient.

---

# 3. Accelerator-only rows after PR21

PR21 provides useful production runtime evidence for:

- PA14–PA15;
- PA18–PA26.

These remain accelerator-bounded because:

- PA14–PA20 require direct capability fact insertion;
- PA21–PA26 use direct pre-threshold/complex-route setup.

This is not a runtime defect.

Once PA09/PA16/PA17 close, most Forest/ending accelerator rows can be rerun through the natural product route.

The 49-shift repetition accelerator may remain as an accepted threshold accelerator if clearly labeled.

---

# 4. Remaining asset/presentation polish gates

## Functional media blocker

**NONE currently identified for the accepted activation slice.**

PR20 deliberately promoted production packs using shipped static SVG fallbacks.

Validation/build are green.

Product Acceptance allows placeholders.

## Remaining polish

Non-functional release polish may still include:

- replacing static placeholder art with final GIF/media;
- final teacher portraits/presentation content;
- richer Forest route/challenge presentation assets;
- authored item/capability icon/description;
- accessibility/alt-text review for final media.

These should not be confused with the five remaining functional Product Acceptance authoring blockers.

If release scope demands final art rather than placeholders, that is a separate asset gate to be explicitly added by release/product ownership.

---

# 5. Previous RC gate items whose status changed

| Previous gate concern | Post-PR21 delta |
|---|---|
| production activation full check | **CLOSED** by PR20 187/187 activation merge evidence; PR21 later reaches 194/194 with PA evidence |
| shipped PA execution missing | **CLOSED/PARTIAL** — shipped rows now execute directly; five authoring rows remain open |
| School command/harness mismatch | **CLOSED** — harness uses first-class `schoolLesson` |
| production Lumber/Foreman evidence | **CLOSED** |
| production Night evidence | **CLOSED** |
| production Forest runtime evidence | **CLOSED with explicit accelerator** |
| ending exactly-once evidence | **CLOSED with explicit threshold/setup accelerator** |
| capability accelerator could be mistaken for pass | **CLOSED as reporting risk** — PR21 labels it and keeps PA09/PA17 open |
| School public fact could be fabricated | **CLOSED as reporting risk** — PR21 asserts it remains absent |
| exact Hard Work contract | **CLOSED/LOCKED** |
| worker checkpoint integration | **STILL OPEN** |
| shipped-dist smoke from Chat 4 branch | **STILL OPEN for integration/execution on main** |
| save-edge/fault-injection execution | **STILL OPEN** |
| natural end-to-end Product Acceptance flow | **STILL OPEN due five authoring rows** |

---

# 6. Required post-merge QA evidence

PR21 is merged, but the release candidate still needs consolidated post-merge QA rather than relying only on temporary PR workflows.

## Full main check

Run on the exact release-candidate main SHA:

`npm ci && npm run check`

Required zero failures.

The PR21 194/194 run is strong merge evidence but predates later main handoff/state commits.

If later commits are documentation/state-only, risk is low; release evidence should still identify the exact tested SHA.

## Shipped dist smoke

Integrate/run:

`qa-shipped-dist-smoke-contract.test.ts`

after build.

Required:

- exact production pack set;
- target definitions;
- no synthetic School action;
- exact Hard Work;
- valid built media.

## Product Activation regression subset

Integrate/rebase:

`qa-product-activation-regression-subset.test.ts`

Keep its capability/threshold accelerators explicitly labeled.

## Save compatibility

Execute the cases from:

`PRODUCT_ACTIVATION_SAVE_EDGE_MATRIX_v1.md`

especially:

- old schema-4 missing School state;
- slash presentation ID;
- paid School reload;
- Night payment checkpoint;
- active Activity;
- committed/completed ending.

## Fault injection

Execute representative cases from:

`PRODUCT_ACTIVATION_FAULT_INJECTION_v1.md`.

## Worker checkpoint integration

Use:

`WORKER_CHECKPOINT_INTEGRATION_AUDIT_v1.md`

to integrate the distinct Chat 2/3/5 regressions without importing stale pre-PR20 assertions.

## Shipped-flow smoke

Use:

`PRODUCT_ACCEPTANCE_SHIPPED_FLOW_SMOKE_v1.md`.

It has one explicit boundary:

- Phase A = shipped natural flow;
- Phase B = accelerator-only evidence.

---

# 7. Release-candidate status after PR21

## Activation runtime/integration

**GREEN**

Supported by:

- PR20 activation;
- PR21 shipped execution;
- 194/194 Product Acceptance workflow.

## Technical regression integration

**NOT YET CONSOLIDATED**

Branch-only Chat 4 and worker tests/checklists still need integration/disposition.

## Full Product Acceptance

**NOT GREEN**

Five rows remain product-authoring blocked:

- PA07;
- PA08;
- PA09;
- PA16;
- PA17.

## Release-candidate interpretation

A release candidate may be technically build/test green before those five product rows close, but it must not be described as:

**Product Acceptance Slice complete**

until all five are naturally executable and the accelerator-only downstream rows are rerun through the completed path.

---

# 8. Superseded prior status assumptions

The following earlier Chat 4 status statements are superseded by PR21:

- “no executable shipped PA row runner”;
- “School harness still uses generic action”;
- “Lumber/Night/Activity not player reachable”;
- “no shipped production PA evidence”;
- pre-PR20 source blocker lists;
- pre-PR21 PA readiness counts.

The current authoritative evidence sequence is:

1. PR20 activation green;
2. PR21 shipped PA gate green at 194/194;
3. PR21 row classification;
4. this delta;
5. remaining minimal closure plan/no-false-green audit.

No production runtime/UI/content file was modified by Chat 4.
