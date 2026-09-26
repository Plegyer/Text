# PA False-Green Audit After Capability Runtime v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Closure branch reviewed: `lead/product-acceptance-closure-v1` @ `a08f1d4b25acfc04efdf4ae47234bd51d9518d0e`  
Main baseline at review: `7acbce7f8bdf911ce8ab3ed1a4b3e5e0902cd798`

## Current closure-runtime evidence

The closure branch now has successful CI:

- workflow: `Product Acceptance Closure Check`
- run: `36264768304`
- validate: `7 packs, 26 events, 26 actions, 9 endings`
- build: PASS
- tests: **200**
- pass: **200**
- fail: **0**

The earlier capability wiring defects seen on an intermediate closure head were corrected before this green run.

The new generic runtime supports:

- item definitions with declared capability IDs;
- inventory-derived capability lookup;
- `itemCapability` conditions;
- Activity-authored options;
- persistent route selection;
- persistent one-shot option IDs;
- capability-gated Activity options;
- ordinary `advance` after route selection;
- always-available `escape`.

This audit reassesses PA09 and PA14–PA20 without turning generic runtime support into product-authoring completion.

---

# Core no-false-green rule

Generic capability support answers:

> “Can the engine derive an item capability from actual inventory and expose an authored Activity option from it?”

It does **not** answer:

> “How does the player obtain the Old Boundary Token in the shipped product?”

Directly setting:

```ts
state.run.resources.inventory.old_boundary_token = 1
```

is still an accelerator unless a real production acquisition command/content path produced that inventory state.

Likewise, adding route options does not create the missing full 3-route / 3-challenge / season Forest design.

---

# PA09 — obtain meaningful item capability

## Status after generic runtime

**STILL OPEN / acquisition-authoring blocked**

The runtime now has the correct generic primitive:

- `old_boundary_token` is a declared item definition;
- its capability is `enter_old_boundary`;
- capability derives from positive inventory count;
- a worldFact alone no longer creates capability;
- multiple items may provide a capability;
- removing the provider item removes capability.

But there is still no shipped production action/event/reward that grants:

`old_boundary_token`.

The closure branch deliberately does not invent one.

It also does not declare final retain/consume semantics as product canon.

## False-green risk

A test that seeds:

```ts
inventory.old_boundary_token=1
```

may prove capability/runtime behavior.

It may not mark PA09 `SHIPPED_PASS`.

## Required natural-pass evidence

A normal production route must:

1. acquire the item through shipped content;
2. show it in inventory;
3. survive save/reload;
4. derive `enter_old_boundary`;
5. expose the resulting product behavior without direct state mutation.

---

# PA14 — enter Forest Activity for 2 Energy

## Status on closure branch

**SHIPPED_PASS candidate after closure merge**

The closure content changes Forest entry from temporary capability-gated entry to general entry:

```json
"entryConditions": []
```

A route must then be selected inside the Activity.

Without any special item, the authored option:

`forest.route.logging-road`

is available.

Therefore PA14 no longer depends on the Old Boundary capability.

Natural sequence:

```text
enterActivity(lumber.forest)
-> 2 Energy paid
-> select logging-road route
```

No inventory accelerator is required.

## False-green rule

Do not continue using the old PR21 statement:

“Forest entry is blocked without capability”

after this closure branch lands.

That statement is superseded by the new authored route model.

---

# PA15 — save/reload inside Forest Activity

## Status on closure branch

**SHIPPED_PASS candidate after closure merge**

Because PA14 can now enter naturally through general Forest entry, the player can reach an active Activity envelope without any item seed.

The branch persists:

- `routeId`;
- `resolvedOptionIds`;
- existing progress/endurance/RNG/checkpoint.

A natural test can:

1. enter Forest;
2. select logging-road;
3. save/reload;
4. continue with `advance`.

No capability accelerator is required.

## Compatibility caveat

Separate from PA15 natural reachability, pre-closure active schema-4 saves still require a deliberate behavioral compatibility decision if they load with no route selected and `advance` is no longer immediately available.

That is a release/save-compatibility gate, not a reason to keep PA15 accelerator-only for new runs.

---

# PA16 — Forest route/challenge/season depth

## Status

**STILL OPEN AUTHORING**

The closure branch adds only two authored route options:

- logging road;
- old boundary.

It does not provide:

- three route contexts;
- three challenge families;
- an authored seasonal difference.

The generic Activity-option runtime is necessary infrastructure but is not the required product depth.

## False-green risk

Counting “two route buttons exist” as PA16 would be false.

Counting generic `category:'route'` support as “three route contexts” would also be false.

PA16 remains OPEN until the actual content exists.

---

# PA17 — item capability changes available Activity action

## Runtime status

**CORE MECHANIC IMPLEMENTED**

The branch now demonstrates a real action-space difference.

Without item capability:

- `forest.route.logging-road` visible;
- `forest.route.old-boundary` hidden.

With `enter_old_boundary`:

- old-boundary route becomes visible.

This is materially stronger than the old model where capability only opened the Activity.

## Product Acceptance status

**ACCELERATOR_EVIDENCE_ONLY until PA09 acquisition is real**

Current tests obtain the capability by direct inventory seeding:

```ts
inventory.old_boundary_token=1
```

That proves runtime behavior, not the product acquisition path.

## Consume semantics

The current option does not consume the token.

The test explicitly labels consumption policy as OPEN.

That is correct for generic-runtime QA.

Do not infer “token is permanently retained” as final product design solely from this test.

## Natural-pass requirement

After a real acquisition source is authored:

1. obtain item naturally;
2. enter Forest;
3. compare available actions before/after real capability;
4. use old-boundary option;
5. save/reload;
6. prove route persists.

Only then can PA17 become a natural shipped pass.

---

# PA18 — successful Forest result triggers Lumber continuation

## Status on closure branch

**SHIPPED_PASS candidate after closure merge**

Success is now naturally reachable without item capability:

```text
enter Forest
-> select logging-road
-> advance
-> advance
-> success
```

The existing A5 result:

`lumber.forest.success`

and reactive Lumber event:

`lumber-cross.activity-forest-return`

remain unchanged.

Thus PA18 no longer needs direct capability/worldFact injection once the closure route model lands.

## Evidence requirement

Add/update the production PA runner so this row starts from the natural logging-road route instead of the old capability accelerator.

---

# PA19 — escape branch distinct result

## Status on closure branch

**SHIPPED_PASS candidate after closure merge**

`escape` remains available on Activity entry regardless of capability.

No item seed is needed.

The existing distinct escape result remains:

`lumber.forest.escape`.

Therefore the old accelerator classification can be removed for this row after closure merge.

---

# PA20 — resolve post-Activity Lumber continuation

## Status on closure branch

**SHIPPED_PASS candidate after closure merge**

Because natural logging-road success can reach the real continuation, PA20 can also execute without capability seeding.

Expected path:

```text
general Forest entry
-> logging-road
-> real success
-> lumber-cross.activity-forest-return
-> resolve continuation
```

No direct worldFact/inventory mutation is necessary.

---

# Updated PA14–PA20 table

| PA | Closure-runtime classification | Accelerator still required? |
|---|---|---|
| PA14 | **SHIPPED_PASS candidate** | No |
| PA15 | **SHIPPED_PASS candidate** | No |
| PA16 | **OPEN_AUTHORING_BLOCKED** | Not applicable |
| PA17 | **ACCELERATOR_EVIDENCE_ONLY** | Yes, until real item acquisition exists |
| PA18 | **SHIPPED_PASS candidate** | No |
| PA19 | **SHIPPED_PASS candidate** | No |
| PA20 | **SHIPPED_PASS candidate** | No |

PA09 remains:

**OPEN_AUTHORING_BLOCKED**

despite the generic runtime being green.

---

# WorldFact false-green rule after capability runtime

The old temporary fact:

`lumber.capability.enter-old-boundary`

must no longer be accepted as equivalent to the generic item capability.

After capability runtime lands:

- item capability source of truth = declared item definitions + positive inventory;
- worldFact may exist for old fixture compatibility/history, but does not create item capability.

Any test that pushes the old worldFact and then claims PA17 passed is stale/invalid.

---

# Inventory-seeding rule

Direct inventory mutation is valid for:

- generic capability contract;
- Activity option visibility unit test;
- save/reload capability mechanics;
- multiple-provider capability test;
- removal/consumption behavior.

It is not valid for:

- PA09 natural acquisition;
- fully natural PA17.

Label such tests explicitly as capability-runtime or accelerator evidence.

---

# Authored-option false-green rule

The existence of:

- `forest.route.logging-road`;
- `forest.route.old-boundary`

does not close PA16.

Authored options prove:

- route selection API;
- option persistence;
- capability-gated visibility;
- one-shot behavior.

PA16 still requires actual 3-route / 3-challenge / season content.

---

# Direct route-state mutation

Tests should not set:

- `activity.internalState.routeId`;
- `resolvedOptionIds`

directly to claim route selection/reload passed.

Use real:

`activityAction:<option-id>`

then serialize/reload.

The closure branch's option tests follow this rule.

---

# Current false-green disposition

After generic capability runtime:

## Honest improvements

- PA14 can become natural, because Forest entry is general.
- PA15 can become natural.
- PA18 can become natural via logging-road.
- PA19 can become natural.
- PA20 can become natural.
- PA17 has real capability-dependent action-space mechanics.

## Still not naturally closed

- PA09: no production item acquisition source.
- PA16: insufficient authored Forest depth.
- PA17: natural item-dependent path still waits on PA09.

Generic runtime is therefore a real closure step, but not the end of Product Acceptance authoring.

No production runtime/UI/content file was modified by Chat 4.
