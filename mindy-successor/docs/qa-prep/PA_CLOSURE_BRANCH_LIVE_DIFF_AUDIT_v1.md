# PA Closure Branch Live Diff Audit v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Worker branch: `chat4/activation-ci-gate-next`  
Closure branch reviewed: `lead/product-acceptance-closure-v1` @ `b896963c3c7305418cdead99a0be15b95b548dd2`  
Main baseline: `7acbce7f8bdf911ce8ab3ed1a4b3e5e0902cd798`

## Executive result

The closure branch introduces the intended generic direction:

- typed item definitions with capabilities;
- generic `itemCapability` condition;
- inventory-derived capability lookup;
- authored Activity options;
- route selection persisted in the Activity envelope;
- one-shot option identity persisted;
- capability-gated Old Boundary route;
- legacy `escape` retained;
- legacy `advance` retained after route selection.

However the current reviewed head is **BLOCKED** before merge.

There are source-level type/logic defects in the generic capability implementation, and the schema-4 Activity compatibility test proves parse compatibility but not behavioral compatibility with pre-option active saves.

There is no workflow run attached to the reviewed head.

---

# Finding 1 — capability lookup references the wrong catalog property

**Classification: BLOCKER**

Current schema/catalog authority is:

```ts
definitions.itemDefinitions
```

Current `Definitions` has no `items` property.

But the closure branch implements:

```ts
export function itemCapabilities(s:Save,cat?:Catalog):string[]{
  if(!cat)return [];
  const owned=new Set<string>();
  for(const item of cat.definitions.items){
    ...
  }
}
```

This should read the declared item-definition collection, not a non-existent property.

### Impact

- typecheck should reject the current code;
- runtime capability derivation cannot be relied on;
- every `itemCapability` condition is affected.

### Exact seams

- `src/core/schema.ts -> definitionsSchema.itemDefinitions`
- `src/core/engine.ts -> itemCapabilities()`

---

# Finding 2 — duplicate `itemCapability` Condition definition and duplicate switch case

**Classification: BLOCKER**

The closure branch duplicates the same condition member twice in the TypeScript union:

```ts
| {kind:'itemCapability';capability:string;present:boolean}
| {kind:'itemCapability';capability:string;present:boolean}
```

and twice in `conditionSchema`.

More importantly, `meets()` has two identical switch labels:

```ts
case 'itemCapability':
  return hasItemCapability(s,cat,c.capability)===c.present;

case 'itemCapability':
  return hasItemCapability(s,c.capability,cat)===c.present;
```

The first call has arguments in the wrong order.

Declared API:

```ts
hasItemCapability(
  s:Save,
  capability:string,
  cat?:Catalog
)
```

The first case passes `cat` where the capability string belongs.

The second case is unreachable because the first identical switch case matches first.

### Impact

This is both:

- a typecheck defect;
- a runtime logic defect if emitted/transpiled despite typing.

The generic capability gate cannot be accepted until the duplicate condition/case is removed and the one surviving call uses the correct argument order.

---

# Finding 3 — schema-4 save shape compatibility for new Activity fields

**Classification: NON-BLOCKER for parsing**

The branch adds:

- `internalState.routeId`
- `internalState.resolvedOptionIds`

with defaults:

```ts
routeId:id.nullable().default(null)
resolvedOptionIds:z.array(id).max(128).default([])
```

This allows a pre-option schema-4 Activity envelope that lacks both fields to parse without a schema-version bump.

The branch test:

`item-capability-activity-closure.test.ts`

explicitly deletes both fields and verifies reload defaults them.

This is the right save-schema compatibility direction.

---

# Finding 4 — pre-option active Activity behavioral compatibility

**Classification: BLOCKER**

Although an old schema-4 Activity envelope parses, its behavior changes after reload.

The closure branch defines route options and then globally enforces:

```ts
if(action==='advance' &&
   requiresRouteSelection &&
   !state.routeId)
  throw new Error('Сначала выберите маршрут Activity.');
```

and `availableActivityActions()` omits `advance` while `routeId` is null.

A pre-closure active `lumber.forest` save was created under a definition where:

- there were no route options;
- `advance` was immediately valid.

After loading that same schema-4 envelope against the closure catalog:

- `routeId` defaults to null;
- `resolvedOptionIds` defaults empty;
- `advance` is no longer available;
- a direct legacy `advance` command is rejected.

So parse compatibility is present, but behavioral resume compatibility is not.

### Why this matters

Queue item 19 explicitly requires:

- schema-4 backward compatibility;
- legacy `advance/escape` preserved.

A save should not load successfully into a materially different required interaction without an explicit compatibility strategy.

### Required closure direction

Do not silently infer a product route if no route was previously chosen.

One acceptable compatibility strategy would need to distinguish:

- legacy active envelope created before authored options;
- new envelope created under option-aware Activity.

The exact migration/default strategy belongs to Lead/runtime ownership.

Chat 4 does not prescribe a route choice.

---

# Finding 5 — legacy escape

**Classification: NON-BLOCKER**

`activityActionMutable()` still handles:

```ts
if(action==='escape'){
  finalizeActivityMutable(...,'escape');
  return;
}
```

`availableActivityActions()` always appends:

`escape`.

No new item/capability requirement gates escape.

This preserves the legacy safety exit.

---

# Finding 6 — legacy advance after authored route selection

**Classification: NON-BLOCKER for new option-aware runs**

Once a route is selected:

- `advance` becomes available;
- the ordinary `counter.v1` progress/endurance path remains;
- success/failure resolution remains the same A5 result boundary.

The new test:

`logging-road route is usable without any item and preserves ordinary counter.v1 success path`

demonstrates the intended composition.

This does not resolve Finding 4 for already-active old saves.

---

# Finding 7 — capability derives from actual inventory item definition

**Classification: CHANGED / currently blocked by Findings 1–2**

The intended model is correct:

- production `itemDefinitions` declare capabilities;
- positive inventory count activates capabilities;
- multiple definitions may provide the same capability;
- removing the item removes the capability.

The branch test demonstrates the intended generic behavior by assigning:

`enter_old_boundary`

to `reinforced_axe` in a cloned catalog and checking availability.

However this cannot be considered executable evidence until the lookup implementation compiles and uses the correct catalog property.

---

# Finding 8 — unknown capability catalog validation

**Classification: NON-BLOCKER in design**

`loadCatalog()` collects declared capabilities from:

```ts
d.itemDefinitions.flatMap(item=>item.capabilities)
```

and rejects any `itemCapability` condition that references an undeclared capability.

The branch test adds:

`not_declared_anywhere`

to an Activity option and expects catalog validation to reject it.

This is the correct contract.

---

# Finding 9 — worldFact must not create item capability

**Classification: NON-BLOCKER in intended model**

The new capability model is inventory-derived rather than worldFact-derived.

There is no code in `itemCapabilities()` that reads:

`run.progression.worldFacts`.

This is the correct direction and prevents the old QA adapter fact from becoming an implicit production item capability.

The dedicated Chat 4 item-capability contract in Queue item 20 should lock this explicitly.

---

# Finding 10 — no forced Old Boundary Token acquisition source

**Classification: AUTHORING-OPEN / NON-BLOCKER**

The branch adds item definitions for:

- `reinforced_axe`;
- `rope_kit`;
- `field_preservation_kit`;
- `old_boundary_token`.

No production action in the reviewed definitions grants those new items.

No acquisition source is invented.

This is correct for the current closure stage because the acquisition source remains an explicit product-authoring decision.

PA09 is therefore **not closed** merely by landing the generic runtime.

---

# Finding 11 — no invented consume semantics

**Classification: AUTHORING-OPEN / NON-BLOCKER**

Selecting:

`forest.route.old-boundary`

does not automatically remove:

`old_boundary_token`.

The branch test explicitly verifies the count remains 1 and labels consumption as OPEN policy.

This is preferable to inventing a consume rule in generic runtime.

It means:

- runtime capability behavior can land independently;
- PA09 retain/consume semantics remain authoring-open.

Do not relabel the current non-consuming test as the final product policy.

---

# Finding 12 — current Forest entry behavior changes

**Classification: CHANGED / explicit closure authoring**

Main before the closure branch gated Forest entry through a temporary capability-worldFact condition.

The closure branch changes:

`lumber.forest.entryConditions`

to empty and introduces authored route options:

- `forest.route.logging-road` — no capability;
- `forest.route.old-boundary` — requires `enter_old_boundary`.

Thus Forest becomes generally enterable while the token changes available route actions.

This is not an accidental runtime side effect; it is explicit production content authoring in `definitions.json`.

It is consistent with the PA17 direction:

item capability changes Activity action space instead of merely opening the Activity.

However it also changes the meaning of the previous PA14 capability boundary.

PR21's older “Forest entry blocked without capability” assertion becomes superseded if this branch lands.

QA reporting must be updated accordingly.

---

# Finding 13 — authored option reload determinism

**Classification: NON-BLOCKER in intended implementation**

The Activity envelope now persists:

- `routeId`;
- `resolvedOptionIds`.

After selecting `forest.route.old-boundary`, the branch test verifies:

- route remains `old-boundary` after parse/reload;
- option remains resolved;
- same one-shot option is not offered again;
- direct duplicate use rejects;
- `advance` and `escape` remain available.

This is the correct deterministic reload contract for new option-aware saves.

Again, current source blockers prevent treating the branch as globally green yet.

---

# Finding 14 — route lock / duplicate option behavior

**Classification: NON-BLOCKER**

After one route sets `routeId`:

- incompatible alternative route options are filtered out;
- a resolved option is filtered out;
- duplicate dispatch is rejected.

This prevents route rerolling after reload.

---

# Finding 15 — Forest depth remains incomplete

**Classification: AUTHORING-OPEN**

The closure branch currently authors only two route options:

1. logging road;
2. old boundary.

It does not provide:

- three route contexts;
- three challenge families;
- authored seasonal difference.

Therefore generic options/capability runtime does **not** close PA16.

The new route support is infrastructure + partial content, not full Forest depth.

---

# Finding 16 — item-dependent action-space behavior

**Classification: PARTIAL / runtime direction correct, authoring still limited**

Without the token:

- logging-road route is available;
- old-boundary route is hidden.

With the token:

- old-boundary route becomes available.

This is a real action-space difference.

It addresses the core PA17 mechanic better than the old entry-worldFact adapter.

But PA17 should not be called fully product-closed until:

- the item is naturally acquired;
- product semantics for retain/consume are authored;
- the final Activity content using that option is approved.

---

# Finding 17 — CI evidence

**Classification: BLOCKER as merge evidence**

No workflow runs are attached to reviewed closure HEAD:

`b896963c3c7305418cdead99a0be15b95b548dd2`.

Because Findings 1–2 are source-level typing/logic defects, this absence is material.

Required before merge:

- typecheck;
- validate;
- build;
- full tests;
- generic item capability contract;
- Activity option reload matrix;
- old schema-4 active Activity compatibility evidence.

---

# Current closure branch disposition

## BLOCKER

1. `itemCapabilities()` reads non-existent `cat.definitions.items` instead of the item-definition collection.
2. duplicate `itemCapability` union/schema entries plus duplicate switch case;
3. first duplicate `meets()` case calls `hasItemCapability` with wrong argument order and masks the correct case;
4. old active schema-4 Activity envelopes parse but lose immediate legacy `advance` behavior;
5. no CI/full-check evidence on the reviewed head.

## NON-BLOCKER / good generic direction

- item capability is intended to derive from positive inventory;
- unknown capabilities are catalog-invalid;
- multiple items can provide one capability;
- option route/resolution state is persisted;
- duplicate option use is rejected;
- `escape` preserved;
- normal `advance` path preserved after route selection;
- no forced acquisition source;
- no invented automatic token consumption.

## AUTHORING-OPEN

- real item acquisition;
- retain/consume final policy;
- full three-route/three-challenge/season Forest depth;
- final content semantics for item-dependent route/action.

No production runtime/UI/content file was modified by Chat 4.
