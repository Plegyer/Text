# PA Closure Release Gate v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Closure branch: `lead/product-acceptance-closure-v1`  
Latest reviewed head: `a4fc9b257cd68d7c98b468e888b2be11f05a2a8f`  
Main baseline: `7acbce7f8bdf911ce8ab3ed1a4b3e5e0902cd798`

## Current gate disposition

**BLOCKED**

The branch had a previous green checkpoint:

- head `a08f1d4b25acfc04efdf4ae47234bd51d9518d0e`
- `npm run check`
- **200/200 tests PASS**

The latest head adds an Activity option-model compatibility marker and is currently red.

Latest workflow:

- `Product Acceptance Closure Check`
- run `36264947540`
- conclusion: **failure**
- failure stage: **typecheck**

Exact error:

```text
src/core/engine.ts(811,3): TS2741:
Property 'optionModelVersion' is missing ...
but required in ActivityEnvelope
```

Therefore the earlier 200/200 result cannot be reused as merge evidence for the latest head.

---

# Gate 1 — exact latest-head full check

Required command from:

`mindy-successor/prior-work/astra/prototype-m3.2`

```bash
npm ci
npm run check
```

Required:

- typecheck PASS;
- validate PASS;
- build PASS;
- tests PASS;
- zero failures.

Evidence must name the exact closure head or merge-ref SHA.

The current latest head fails this gate.

---

# Gate 2 — Activity envelope option-model initialization

The latest schema adds:

```ts
optionModelVersion:
  z.number().int().min(0).max(1).default(0)
```

to persisted Activity envelopes.

The runtime uses it to distinguish:

- old pre-option envelopes: version 0;
- new option-aware envelopes: version 1.

This is the correct compatibility direction.

## Required new-entry behavior

A newly entered Activity whose definition contains authored options must persist:

`optionModelVersion=1`.

An Activity without authored options may use the compatible value expected by the accepted runtime.

The constructor and type must agree.

## Current blocker

The latest typecheck shows the constructor does not supply the required property.

Merge is blocked until this is resolved and green.

---

# Gate 3 — schema-4 backward compatibility

Required positive regression:

Take a pre-closure schema-4 active Activity save that lacks:

- `optionModelVersion`;
- `routeId`;
- `resolvedOptionIds`.

Reload it against the closure catalog.

Expected:

- parse succeeds;
- `optionModelVersion` defaults to 0;
- route defaults do not invent a route;
- existing progress/endurance/steps/RNG/checkpoint survive.

## Required behavioral compatibility

For a version-0/pre-option envelope:

- legacy `advance` remains immediately available;
- legacy `escape` remains immediately available;
- no route selection is retroactively required.

This is stronger than “the JSON parses”.

The runtime already contains the intended compatibility branch:

```ts
if(envelope.optionModelVersion===0)
  return [
    {id:'advance',...},
    {id:'escape',...}
  ];
```

and custom actions should reject for option-model 0.

A direct regression must prove it.

---

# Gate 4 — new option-aware Activity behavior

For a new option-aware Forest envelope:

- route selection required before ordinary `advance`;
- `escape` remains available;
- ordinary no-item route visible;
- capability-gated route hidden without capability;
- capability-gated route visible with capability;
- route selection is one-shot;
- duplicate option dispatch rejects;
- selected route survives reload;
- resolved option IDs survive reload;
- `advance` becomes available after route selection.

Required production route assertions:

- logging-road available without item;
- old-boundary route requires `enter_old_boundary`.

---

# Gate 5 — generic item capability contract

Required tests:

`qa-generic-item-capability-contract.test.ts`

plus closure-native capability tests.

Must prove:

1. capabilities derive only from declared item definitions;
2. positive inventory count activates capability;
3. worldFact alone does not activate item capability;
4. unknown capability references fail catalog validation;
5. multiple items may provide one capability;
6. capability result is deduplicated;
7. removing/consuming the last provider item removes capability deterministically;
8. save/reload preserves inventory-driven availability.

Do not implement capability ownership as a hidden special-case for:

`old_boundary_token`.

---

# Gate 6 — Activity authored-option reload matrix

Required test:

`qa-activity-option-reload.test.ts`

or an integrated equivalent.

Must cover:

- open option visible before use;
- capability-gated option hidden without item capability;
- capability-gated option visible with capability;
- option dispatch through real `activityAction`;
- route persisted;
- used-option identity persisted;
- reload after option;
- duplicate option use rejected;
- `advance` after route;
- `escape` preserved;
- removing provider item before option selection hides gated option deterministically.

No direct routeId mutation may substitute for option dispatch.

---

# Gate 7 — production catalog validation

`npm run validate` must pass on the closure candidate.

Catalog validation must prove:

- item definition IDs unique;
- capability IDs per item unique;
- every `itemCapability` condition references a declared capability;
- Activity option IDs unique;
- option conditions valid;
- Activity result success/escape/failure completeness unchanged;
- promoted production packs still valid.

Do not weaken validation to accept undeclared capabilities.

---

# Gate 8 — no forced acquisition source

The closure branch must remain neutral about unresolved Old Boundary Token acquisition unless product authoring explicitly lands in the same change.

Current expected state:

- item definition exists;
- no production action/event automatically grants the token.

This is **not a failure** of the generic runtime.

It is an honest OPEN-authoring item.

The release/PA result must continue to mark PA09 open until acquisition is real.

---

# Gate 9 — no invented consume semantics

The generic capability layer must not silently remove items.

A capability check is read-only.

An Activity option must consume an item only if explicit authored effects/policy say so.

Current Old Boundary route does not consume the token and tests label consume/retain policy OPEN.

This is acceptable for runtime closure.

Do not convert this default into a claim that “retain forever” is final product canon.

---

# Gate 10 — Product Acceptance row truth after closure

Assuming the closure branch lands green with the current authored route model:

## Natural shipped-pass candidates

- PA14 — general Forest entry costs 2 Energy;
- PA15 — save/reload inside naturally reachable Forest;
- PA18 — logging-road success -> Lumber continuation;
- PA19 — escape distinct;
- PA20 — continuation resolution.

## Still not natural pass

- PA09 — no production token acquisition source;
- PA16 — no 3-route / 3-challenge / season depth;
- PA17 — runtime mechanic exists, but natural item-dependent path still depends on PA09.

Direct inventory seeding must remain accelerator evidence for PA17.

---

# Gate 11 — Hard Work regression

Closure changes must not modify:

```text
ending.lumber.hard-work
careerCounter(lumber, completed_shifts) >= 50
hardWork:lumber
```

Required:

- exact static deep equality;
- 49 unavailable;
- real 50th shift eligible;
- no School/Forest/item/route prerequisite;
- commit no reward;
- completion exactly once;
- reload no duplicate;
- New Run Meta still works.

Generic item capability must never become a hidden Hard Work prerequisite.

---

# Gate 12 — School regression

Required full/targeted checks:

- all eight paid courses remain;
- tuition unchanged;
- 1 daytime Energy;
- typed `lessons_completed`;
- Night-study counter separation;
- School Resolver ordering unchanged;
- semantic School presentation ID persists;
- schema-4 missing School state still defaults safely.

Closure branch item/Activity work must not affect School.

---

# Gate 13 — Night regression

Required:

- explicit `endDay`;
- lodging payment once;
- Foreman Night once;
- School Night-study once;
- reload between phases;
- next-day modifiers once;
- calendar advance once.

New item capability conditions must not alter Night availability accidentally.

---

# Gate 14 — presentation regression

Required:

- slash semantic IDs remain save-compatible;
- pending IDs survive reload;
- result UI consumes persisted presentation ID;
- Activity UI still renders semantic Activity stage;
- route-option rendering does not dispatch mechanics automatically;
- missing media remains presentation-only.

---

# Gate 15 — UI Activity option contract

The production UI must use:

`availableActivityActions(state,catalog)`

for the active Activity.

Required visible behavior:

- new option-aware Activity shows route options;
- no-item logging route visible;
- gated old-boundary route hidden without capability;
- escape visible;
- after route selection ordinary advance appears;
- after reload same route/action state appears.

Do not hard-code Old Boundary Token checks directly in UI.

---

# Gate 16 — shipped dist contract

After build, run the shipped dist smoke.

Required:

- closure `definitions.json` serialized to dist;
- itemDefinitions present as authored;
- Forest options present once;
- no fixture-only duplicate packs;
- Hard Work exact;
- School/Night content unchanged;
- media references valid.

---

# Gate 17 — no-false-green ledger

The closure candidate must preserve explicit status:

## OPEN authoring

- token acquisition source;
- retain/consume final policy;
- PA16 full Forest depth;
- final hunter-trail/route/challenge authoring;
- School public-result authoring still open unless separately closed.

## Accelerator-only

Any direct:

`inventory.old_boundary_token=1`

is runtime QA evidence, not PA09 product pass.

Do not reclassify PA09 merely because the capability runtime is green.

---

# Gate 18 — worker QA integration

Before final release candidate, integrate or disposition:

- `qa-generic-item-capability-contract.test.ts`;
- `qa-activity-option-reload.test.ts`;
- `qa-shipped-dist-smoke-contract.test.ts`;
- `qa-product-activation-regression-subset.test.ts`;
- high-value Chat 2/3/5 regression tests from prior handoff.

Tests may be superseded by stronger named equivalents, but not silently dropped.

---

# Exact merge approval condition

The PA closure branch may be called technically merge-ready only when:

1. latest-head `npm run check` is green;
2. ActivityEnvelope constructor/type mismatch is resolved;
3. old option-model-0 Activity save can still `advance/escape`;
4. new option-model-1 Activity persists route/used options;
5. generic capability tests pass;
6. unknown capability validation passes;
7. no Hard Work/School/Night/presentation regression;
8. shipped dist is valid;
9. PA09/PA16/PA17 authoring status is reported honestly.

## Current status

Latest reviewed head:

`a4fc9b257cd68d7c98b468e888b2be11f05a2a8f`

fails Gate 1 at typecheck because new Activity envelope construction omits required:

`optionModelVersion`.

Therefore:

**NOT MERGE-READY at this exact head.**

No production runtime/UI/content file was modified by Chat 4.
