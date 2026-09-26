# Product Acceptance Minimal Closure Plan v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Baseline: PR21 latest-head evidence, production activation already merged

## Goal

Close only the Product Acceptance gaps that remain after PR21, with the smallest product/runtime changes that satisfy the written gate.

This plan does not invent:

- School milestone/certificate thresholds;
- the source that awards `old_boundary_token`;
- consume/retain semantics for that item;
- new Forest balance numbers;
- additional Hard Work prerequisites.

The locked Hard Work contract remains untouched.

---

# 1. PA07 / PA08 — School management/accounting public result

## Current state

Production School already has:

- eight first-class paid courses;
- typed School tracks;
- `lessons_completed`;
- `night_study_sessions`;
- one atomic School command boundary;
- Resolver execution after registration.

Production Lumber already has a listener for world fact:

`lumber.school.management-ready`

but authoritative School does not emit it.

The synthetic fixture action:

`school.lumber-management`

must remain non-production.

## Smallest closure

### Product authoring decision required

Author exactly one accepted milestone/public-result rule that answers:

- which existing School track represents the management/accounting route;
- what exact authored condition makes the public result true.

The threshold/condition is currently OPEN and must be supplied by product/design. QA must not choose it.

### Smallest runtime/schema support if the authored rule depends on School progress

Current generic conditions do not expose School track counters directly.

Add one data-driven condition primitive sufficient to read School progression, for example the conceptual shape:

```text
schoolCounter(track, counter, op, value)
```

or an equivalent School-owned milestone/fact condition.

Do not special-case Lumber in core.

### Smallest content hook

Add a normal reaction/event driven by the authored School milestone that applies:

`addWorldFact('lumber.school.management-ready')`

or another approved public fact consumed by the existing Lumber listener.

The public fact should be emitted once through normal resolver/content rules.

## Closure evidence

PA07 closes when a real shipped School lesson:

1. pays normal tuition/Energy;
2. increments typed School progression;
3. reaches the authored milestone;
4. persists/reloads the public School result exactly once.

PA08 closes when the same School command boundary immediately lets Resolver open the shipped Lumber/Foreman continuation, with no manual Work visit and no synthetic action.

---

# 2. PA09 — Old Boundary Token acquisition and capability

## Current state

Locked identity:

- item: `old_boundary_token`;
- capability: `enter_old_boundary`.

Current production schema item enum contains only legacy items such as:

- `herb`;
- `tonic`;
- `scales`.

Forest entry currently reads world fact:

`lumber.capability.enter-old-boundary`.

QA fixtures directly inject that fact.

That is not product acquisition.

## Smallest closure

### Runtime/data primitive

Promote `old_boundary_token` to a real typed inventory item or extend the item registry so content can hold it without a test-only adapter.

Add the smallest shared capability mapping that can answer:

```text
inventory contains old_boundary_token
=> capability enter_old_boundary is available
```

The Activity gate should consume the derived capability, not require QA to push a world fact manually.

A compatibility world fact may still be derived internally if existing Activity conditions require it, but the source of truth must be the real item/capability state.

### Product authoring decision required

Define the legitimate acquisition source.

This plan does not choose:

- Foreman reward;
- Forest pickup;
- shop purchase;
- quest reward;
- starting inventory.

One source must be authored before PA09 can pass.

### Retain/consume decision required

Product/design must explicitly choose whether entering/using the Old Boundary capability:

- retains the token;
- consumes it;
- consumes another resource while retaining the token.

QA must not infer this.

## Closure evidence

A normal shipped player path must:

1. obtain the item;
2. show it in inventory;
3. expose/explain capability `enter_old_boundary`;
4. save/reload;
5. preserve item + capability;
6. allow Forest entry without direct worldFact mutation.

---

# 3. PA14 / PA15 / PA18–PA20 — remove the capability accelerator dependency

These rows already have real production Activity/Resolver mechanics.

They become naturally reachable once PA09 is closed.

## Smallest closure

No separate A5 engine rewrite is needed for these rows.

After real item/capability integration:

- replace direct QA worldFact injection with the normal acquired item state;
- run the same production `enterActivity('lumber.forest')`;
- retain the existing 2-Energy entry cost;
- retain save/reload envelope;
- retain success/escape/result IDs;
- retain reactive Lumber continuation.

## Closure evidence

The existing PR21 accelerator test should remain as lower-level regression evidence.

Add one production-flow test that reaches the same boundary through inventory/capability instead of direct fact insertion.

---

# 4. PA16 — Forest route/challenge/season depth

## Current state

Production Forest uses:

`counter.v1`

with:

- one progress counter;
- one endurance resource;
- one advance action;
- escape;
- success/failure thresholds.

This cannot express the Product Acceptance requirement by content authoring alone:

- 3 route contexts;
- 3 challenge families;
- season difference.

## Smallest closure

Introduce one focused next Activity adapter/version for the Forest slice rather than broadening the global engine with Forest-specific branches.

Minimum adapter contract should support authored:

- exactly three route/context IDs;
- challenge-family ID per challenge;
- deterministic choice/transition between route contexts;
- season-dependent challenge/route variant selection;
- the existing separate internal endurance/resource;
- save/resume of route/challenge state;
- success/escape/failure result envelope.

Do not invent route names, challenge names or balance values in QA.

Those are product-authoring inputs.

## Product authoring required

Provide:

- 3 route contexts;
- 3 challenge families;
- at least one concrete seasonal difference;
- texts/presentation IDs for those authored contexts.

## Closure evidence

A table-driven test must visit all three route contexts and all three challenge families across the authored cases and prove:

- deterministic reload;
- no internal daily Energy charge;
- at least one season changes a route/challenge outcome or available challenge;
- success and escape remain distinct.

---

# 5. PA17 — item-dependent Activity action-space change

## Current state

The Activity command union currently supports only:

- `advance`;
- `escape`.

Possessing the QA capability only permits entry.

It does not change the available actions inside Activity.

## Smallest closure

Extend the focused Forest Activity adapter introduced for PA16 with one capability-gated action descriptor.

The engine/API should expose the adapter's available action IDs rather than hard-code a product-specific item branch in core.

Conceptually the adapter needs:

```text
availableActions(activityState, capabilities)
```

and dispatch of an authored action ID.

At least one authored action must require the real `enter_old_boundary` or another approved Old Boundary Token capability.

Using that action must change the action space or route outcome, not merely add a numeric percentage.

## Product authoring required

Define:

- the action's player-facing meaning;
- whether the token is retained/consumed;
- what route/challenge transition/result it enables.

QA must not choose these values.

## Closure evidence

A test must compare the same Activity state:

### Without item capability

The item action is absent/unavailable.

### With item capability

The action becomes available.

After save/reload, availability remains correct.

Executing it causes the authored route/action-space change and is not equivalent to ordinary `advance`.

---

# 6. PA21–PA26 — remove threshold/setup accelerator classification

PR21 correctly proves the actual 49 -> 50 Hard Work boundary with one real shift.

The threshold accelerator itself is legitimate repetition compression.

These rows do not require 50 manual UI clicks to be considered mechanically proven.

However the full Product Acceptance ordered flow still depends on the natural complex-ending route.

## Smallest closure

Once PA09/PA14/PA16/PA17 are closed:

- use the real Forest route to establish the complex-ending facts;
- retain only the 49-shift repetition accelerator;
- execute the real 50th shift;
- prove simultaneous eligibility;
- continue play;
- commit;
- complete;
- reload;
- new run.

The 49-shift accelerator may remain labeled as a threshold accelerator because it does not fabricate the condition under test.

No Hard Work product change is required.

---

# 7. No change required to Hard Work

Do not touch:

```text
careerCounter(lumber, completed_shifts) >= 50
```

Do not add:

- School prerequisite;
- Forest prerequisite;
- Foreman prerequisite;
- item prerequisite;
- season prerequisite.

Do not change reward ID:

`hardWork:lumber`.

All remaining Product Acceptance closure work must compose around this independent ending.

---

# 8. Minimal implementation order

The narrowest dependency order is:

1. author the School management/accounting milestone rule;
2. add the minimal School-progress condition/milestone hook needed to emit its public fact;
3. integrate real `old_boundary_token` inventory identity;
4. add a generic capability lookup from real item state;
5. author one legitimate token acquisition source and retain/consume rule;
6. replace Forest direct worldFact dependency with the real capability path;
7. add the focused Forest adapter/version for route/challenge/season state;
8. expose one item-dependent Forest action through that adapter;
9. author the 3 route contexts / 3 challenge families / seasonal variation;
10. rerun the natural PA07–PA20 path, then the accelerated 49/50 ending boundary.

This closes the remaining slice without expanding into unrelated careers or broad engine redesign.

---

# 9. Required QA after closure

The first closure PR must include executable evidence for:

- School public fact emitted only at the authored milestone;
- immediate School -> Lumber Resolver continuation;
- Old Boundary Token acquisition/save/reload;
- capability derived from actual inventory;
- Forest entry without direct fact injection;
- three routes/challenge families/season variation;
- item-gated Activity action absent/present comparison;
- Activity save/reload with item action;
- natural Forest continuation;
- simultaneous complex + Hard Work ending eligibility;
- exact `hardWork:lumber` completion once.

Do not delete the PR21 accelerator tests. Keep them as lower-level regression tests while adding the natural product path above them.

No production runtime/UI/content file was modified by Chat 4.
