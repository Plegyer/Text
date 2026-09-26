# PR22 Merged Main Recheck v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
PR: #22 — `Lead: close generic item capability and Forest route infrastructure`  
Merged at: 2026-09-26T19:12:22Z  
Merge commit: `011572ef1335deda5ac33120c3a7ea7f9849dbbf`  
PR final head: `25c52c39318703e51cfd75b9e3413de3534dafac`  
Current main reviewed: `0450d46eb29c2551c4ecf55f994e0f271e82e3c7`

## Executive result

PR22 is merged and its generic item-capability / Activity-option runtime is present on current `main`.

The temporary closure workflow was intentionally removed on the final PR head after a green merge-ref check. The last executable closure candidate carrying the final runtime/tests before workflow removal was:

`424407ecfed0bf0b8998c4f4348a17172c2412fc`

Workflow:

- `Product Acceptance Closure Check`
- run `36265062327`
- typecheck: PASS
- validate: PASS
- validation count: `7 packs, 26 events, 26 actions, 9 endings`
- build: PASS
- tests: **200**
- pass: **200**
- fail: **0**

The final PR commit message also records removal of the temporary workflow after that green **200/200 merge-ref check**.

Current main contains the same accepted runtime/content/test model and later documentation/handoff commits.

---

# 1. Generic item capability derives from actual inventory definitions

**PASS**

Production definitions now contain typed `itemDefinitions`:

- `reinforced_axe -> cut_heavy_wood`
- `rope_kit -> cross_rough_route`
- `field_preservation_kit -> preserve_specimen`
- `old_boundary_token -> enter_old_boundary`

Current engine derives capabilities by iterating:

`cat.definitions.itemDefinitions`

and only includes a capability when the corresponding inventory count is positive.

No capability lookup reads worldFacts.

Therefore:

- actual inventory is the source of truth;
- a worldFact with a similar name does not create an item capability;
- multiple items may provide one capability;
- capability availability disappears when no owned provider remains.

---

# 2. Unknown capability validation

**PASS**

Current catalog validation collects declared capability IDs from:

`definitions.itemDefinitions[].capabilities`

Every authored `itemCapability` condition is checked against that declared set.

PR22 merged regression:

`catalog validation rejects Activity option that references undeclared item capability`

confirms unknown capability references are rejected.

---

# 3. Old active schema-4 Activity behavioral compatibility

**PASS**

The merged Activity envelope has compatibility fields:

- `optionModelVersion` default 0;
- `routeId` default null;
- `resolvedOptionIds` default empty.

New option-aware Activity entries persist:

`optionModelVersion=1`

when the definition has authored options.

Pre-option schema-4 active saves that lack the new fields load as option-model 0.

For option-model 0 the engine returns exactly the legacy action surface:

- `advance`
- `escape`

without retroactively requiring route selection.

Merged regression:

`pre-option schema4 active Activity save preserves immediate legacy advance/escape behavior`

proves behavioral, not merely syntactic, compatibility.

---

# 4. Forest entry and ordinary logging-road path

**PASS**

Merged Forest definition now has:

`entryConditions: []`

and still costs exactly:

`entryEnergyCost: 2`.

A new Forest run enters without Old Boundary Token.

Before ordinary `advance`, the option-aware run requires a route choice.

Without any item capability:

`forest.route.logging-road`

is available.

After selecting logging-road:

- routeId persists as `logging-road`;
- ordinary `advance` becomes available;
- `escape` remains available;
- the existing `counter.v1` success path remains;
- success still emits `lumber.forest.truth-known`;
- the Lumber continuation still opens reactively.

This makes the ordinary Forest path naturally shipped rather than capability-accelerated.

---

# 5. Capability-gated Old Boundary route

**PASS as runtime mechanism**

Merged option:

`forest.route.old-boundary`

requires:

```text
itemCapability(
  capability='enter_old_boundary',
  present=true
)
```

Without a provider item, the route is hidden/unavailable.

With a real declared provider item in inventory, the route becomes available.

Selecting it:

- sets routeId to `old-boundary`;
- persists the resolved option ID;
- survives reload;
- cannot be reused;
- does not hide `escape`;
- allows normal `advance` after route selection.

This is a real production action-space change driven by typed item capability.

---

# 6. No invented Old Boundary Token acquisition

**PASS / authoring intentionally open**

Current production definitions declare:

`old_boundary_token`

and its capability.

They do **not** add a production action/event/reward that grants it.

Therefore PR22 does not fabricate the unresolved acquisition source.

PA09 remains authoring-blocked.

Direct test seeding such as:

```ts
inventory.old_boundary_token=1
```

is runtime/capability evidence only.

It is not natural product reachability.

---

# 7. No invented consume semantics

**PASS / authoring intentionally open**

Using:

`forest.route.old-boundary`

does not automatically consume the token.

The generic capability layer is read-only unless explicit authored item-removal effects occur.

Merged tests explicitly preserve the item count during route use.

This is correctly treated as OPEN policy, not final canon.

Product/design must still choose retain/consume behavior if needed.

---

# 8. Deterministic authored-option reload

**PASS**

Merged runtime persists:

- `routeId`;
- `resolvedOptionIds`;
- Activity checkpoint;
- existing progress/endurance/RNG state.

Merged tests prove:

- capability-gated option visibility;
- one-shot route use;
- selected route persists through `parseSave`;
- duplicate option use rejects;
- incompatible alternate route disappears after selection;
- `advance` and `escape` remain deterministic after reload.

---

# 9. Hard Work unchanged

**PASS**

Current merged production definition remains:

`ending.lumber.hard-work`

with exactly one eligibility condition:

```json
{
  "kind":"careerCounter",
  "career":"lumber",
  "counter":"completed_shifts",
  "op":"gte",
  "value":50
}
```

Exact Meta reward remains:

```json
{
  "kind":"hardWork",
  "rewardId":"hardWork:lumber",
  "career":"lumber"
}
```

No item, Forest route, School, relationship or season prerequisite was added.

PR22 capability/runtime changes do not alter the locked Hard Work contract.

---

# 10. School / Night / presentation regressions

**PASS at PR22 merge gate**

The green 200/200 closure run includes the existing production suites.

PR22 does not change School or Night product rules.

Presentation remains semantic-ID based.

Activity UI now renders the action list returned by:

`availableActivityActions(state,catalog)`

rather than hard-coding Old Boundary Token logic.

No known post-merge regression was introduced in those domains.

---

# 11. Product Acceptance effect of PR22

## Newly direct shipped evidence

After PR22:

- PA14 — Forest entry for 2 Energy is natural;
- PA15 — Forest save/reload is natural;
- PA18 — ordinary logging-road success -> Lumber continuation is natural;
- PA19 — escape is natural and distinct;
- PA20 — Lumber continuation resolution is natural.

## Runtime mechanism shipped, ordered path still open

PA17 now has a real capability-dependent Activity option mechanism.

However the product path to the capability is still blocked by PA09 acquisition authoring.

Therefore PA17 is not yet a fully natural ordered-product pass.

## Still authoring-open

- PA09 — Old Boundary Token acquisition / final policy;
- PA16 — required 3-route / 3-challenge / seasonal Forest depth;
- School public-result authoring remains separate and open.

---

# 12. Current merged-main disposition

PR22 generic capability / Activity-option closure:

**MERGED / TECHNICALLY GREEN**

Executable evidence:

**200/200**

Current main contains:

- inventory-derived item capabilities;
- unknown-capability validation;
- old schema-4 active Activity compatibility;
- general Forest entry;
- ordinary logging-road route;
- capability-gated old-boundary route;
- deterministic route/option reload;
- unchanged Hard Work rule/reward.

No false completion claim is made for acquisition or content-depth authoring.

No production runtime/UI/content file was modified by Chat 4.
