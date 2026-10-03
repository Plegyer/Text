# Chat 3 — Trade Corridor Production v13

Status: **IMPLEMENTATION CANDIDATE — READY FOR CHAT2 ASSEMBLY**  
Owner: Chat 3  
Branch: `chat3/trade-corridor-production-v13`  
Exact base: `chat3/forest-frontier-production-hardening-v12@d151e4b99378d56bf17397cc0df8aa0fffa9d68a`

> The final frozen branch SHA is reported in the handoff after this document commit. A commit cannot safely contain its own cryptographic SHA.

## Starting gap audit

The accepted Forest v12 base already provided the shared D36 Activity runtime required by Trade Corridor:

- optional finite Field Time in `counter.v1`;
- deterministic save/reload;
- option-local typed effects;
- bounded staged mini-game transitions;
- success / failure / escape;
- 2-Energy entry commit exactly once;
- generic Activity presentation route IDs;
- Field Time and active mini-game UI readout.

There was no executable Trade Corridor Activity on the v13 base.

Therefore v13 does **not** add another Activity engine, XP bar, Night/calendar system, or mini-game family.

Shared runtime files remain unchanged from the frozen Forest v12 base:

- `src/core/schema.ts`
- `src/core/engine.ts`
- `src/core/content.ts`

The Forest production feedback pack also remains exact:

- `content/packs/forest-frontier-production.json`

## New executable Activity

Stable Activity ID:

`trade.corridor`

Core contract:

- adapter: `counter.v1`
- entry Energy: **2**
- Field Time: **6**
- initial internal Endurance: **8**
- ordinary Continue Endurance cost: **2**
- success progress: **6**
- failure floor: **0**
- resume: allowed
- time policy: same-day
- failure policy: exit to day

Typed results:

- `trade.corridor.success`
- `trade.corridor.escape`
- `trade.corridor.failure`

Successful regional result publishes:

`activity.trade-corridor.anchor-secured`

and retains a separate city-facing route fact:

`trade.corridor.route-confirmed`

## Route contexts

### 1. Market Road

Stable route:

`trade.route.market-road`

Open route context.

Meaningful options include:

- flow reading through Wits or Merchant appraisal capability;
- appraisal-scales-backed load verification;
- reason/manifest-backed terms comparison;
- optional existing supplier-contact check.

A prepared Merchant-style path can finish in exactly six Field Time actions:

`route -> read flow -> appraise -> compare terms -> continue -> continue`

### 2. Caravan Spur

Stable route:

`trade.route.caravan-spur`

Available only in:

- spring;
- summer;
- autumn.

This is the region's explicit season-sensitive route edge.

All Caravan-specific options repeat the same season gate. This is intentional because the accepted v12 option adapter allows a route-specific option to set `routeId` directly when no route has yet been selected. Without repeated gating, a challenge button could bypass a closed winter route.

Caravan content includes:

- navigation through Wits or existing Merchant delivery knowledge;
- spring washout challenge;
- optional Tracking Triangulation detour;
- Pathfinder shortcut after successful triangulation.

### 3. Customs Lane

Stable route:

`trade.route.customs-lane`

Access requires at least one current shipped capability:

- `merchant_verify_manifest`;
- `official_guard_access`;
- `guard_sealed_pass`.

Every Customs-specific option repeats this access gate, for the same anti-bypass reason as Caravan Spur.

Distinct hooks:

- Manifest Case verifies the manifest chain;
- Guard Sealed Pass opens the sealed-gate shortcut;
- Appraisal Scales inspect disputed cargo;
- Merchant Sample Kit secures an extracted sample.

## Existing city preparation -> Activity

v13 intentionally reuses shipped producers instead of creating parallel items.

Merchant producers already issue:

- `merchant_appraisal_scales`
  -> `merchant_appraise_goods`;
- `merchant_manifest_case`
  -> `merchant_verify_manifest`;
- `merchant_sample_kit`
  -> `merchant_handle_samples`.

Guard producers already issue:

- `guard_badge`
  -> `official_guard_access`;
- `guard_sealed_pass`
  -> `guard_sealed_pass`.

Forest's Rope Kit capability remains usable for the Caravan spring washout:

`cross_rough_route`

Trade Corridor does not duplicate any of those inventory definitions.

## Tracking Triangulation reuse

v13 reuses the accepted D36 Tracking family.

Region-local stable game ID:

`trade.tracking-triangulation`

Entry:

`trade.detour.tracking-observe`

State path:

- `start -> first-observation`;
- cross-check or information-backed risk choice;
- `first-observation -> second-observation`;
- success / failure / abort terminal.

Success fact:

`trade.corridor.tracking-verified`

Failure fact:

`trade.corridor.tracking-misread`

Pathfinder shortcut:

`trade.shortcut.tracked-turn`

The successful mini-game does not itself auto-complete the region. It enables the route shortcut that contributes regional progress.

No Pattern/Ritual Circuit or Infiltration/Suspicion ownership is introduced here.

## Information / risk choice

Stable option:

`trade.tracking.informed-risk`

Prior information is required from either:

- Merchant `delivery-recorded`; or
- Tavern `rumour-confirmed`.

Exact bounded tradeoff:

- +1 Activity progress;
- -2 internal Endurance;
- -1 Field Time.

The choice is not available without one of those information facts.

## D38 typed seams

Regional anchor:

`activity.trade-corridor.anchor-secured`

Pathfinder marker:

`activity.trade-corridor.mark.pathfinder`

Produced by:

- successful triangulated shortcut; or
- sealed-gate shortcut.

Preservation marker:

`activity.trade-corridor.mark.preservation`

Produced only by the Merchant Sample Kit extraction path.

Extracted result:

`activity.trade-corridor.result.sample-secured`

Verified evidence result:

`activity.trade-corridor.result.manifest-verified`

Contact thread:

`trade.corridor.contact-thread-open`

Network marker:

`activity.trade-corridor.mark.network`

The Network marker is not written by route traversal alone. It requires:

1. an existing accepted `merchant.supplier` utility relationship;
2. use of the supplier contact inside the Activity;
3. a successful Trade Corridor regional result;
4. explicit return sharing in the existing relationship feedback event.

This keeps Network classification tied to a real network-capable contact.

## Activity -> city / career / contact feedback

New pack:

`content/packs/trade-corridor-production.json`

### City

Successful regional return publishes:

`trade.corridor.city-return-recorded`

### Merchant

If Merchant career state already exists, successful Trade Corridor can publish:

`trade-corridor-returned`

This is additive and does not automatically select Merchant House, Speculator/Smuggler, Patron of Routes, or an ending.

### Guard

If Guard career state exists and the field result contains verified manifest or sealed-pass evidence, it can publish:

`trade-corridor-evidence-known`

This does not automatically select a Guard advanced route or ending.

### Supplier contact

Existing relationship:

`merchant.supplier`

An already accepted utility relationship can record:

`trade-corridor-return-shared`

and publish the regional Network marker.

No new relationship machine was created.

## Playability / UI

Trade Corridor is added to the Explore Activity list next to Forest Frontier and Hunter Expedition.

The Activity UI checkpoint label was made generic for authored Activity options rather than Forest-route-only, so Trade route/challenge IDs use their authored labels.

No final lore prose or dedicated final art was authored. Generic semantic Activity presentation fallback remains in use.

## Compatibility

### Forest v12

Machine comparison confirms the following are exact against the frozen base:

- `lumber.forest` definition object;
- `content/packs/forest-frontier-production.json`;
- `src/core/schema.ts`;
- `src/core/engine.ts`.

Therefore current Forest typed consumers remain untouched.

### D23 / Night / Secret Debt

Trade Corridor production content does not read or write:

- `palace.access-granted`;
- `palace.d23-qualified`;
- Secret Debt state;
- NightFlow state;
- lodging/calendar internals.

Activity entry remains exactly 2 global Energy.

### D38 non-premature eligibility

Forest + Trade provide only **2 of 4 regional anchors**.

The accepted D38 common baseline requires **3 of 4** anchors, in addition to mini-game/extraction/contact requirements.

v13 adds no Activity ending implementation and no current ending condition consumes any `activity.trade-corridor.*` marker.

Therefore Forest + Trade alone cannot complete the common D38 baseline on this branch.

## Production files changed from frozen v12

- `content/definitions.json`
  - additive `trade.corridor` definition;
- `content/packs/trade-corridor-production.json`
  - new city/career/contact feedback;
- `src/ui/app.ts`
  - Explore entry + generic authored checkpoint label;
- `tests/trade-corridor-production-v13.test.ts`
  - focused regression contract;
- this handoff document.

No shared Activity runtime source was edited.

## Focused QA contract added

`tests/trade-corridor-production-v13.test.ts`

Coverage includes:

- exact Trade Corridor config;
- three route contexts;
- Explore playability;
- 2-Energy entry exactly once;
- six Field Time save/reload;
- prepared Market Road success;
- regional failure;
- explicit escape;
- seasonal Caravan closure;
- anti-bypass Caravan gating;
- deterministic Tracking state;
- Tracking success / failure family contract;
- information/risk gating;
- Customs capability gating;
- anti-bypass Customs gating;
- Manifest / Sample / Sealed Pass mechanics;
- Pathfinder marker;
- Preservation marker;
- extracted sample/result evidence;
- natural Merchant/Guard producer linkage;
- Merchant career feedback;
- Guard career feedback;
- supplier contact / Network marker;
- Forest v12 compatibility;
- D38 non-premature eligibility;
- Palace / Secret Debt / NightFlow / Activity-XP firewall.

## Machine audits performed through GitHub connector

### Requirement / compatibility audit

Result:

- **35 / 35 PASS**
- **0 failures**

It verifies:

- D36 route/content requirements;
- 2-Energy entry;
- Field Time;
- mini-game reuse;
- D38 marker seams;
- UI playability;
- forbidden-system firewalls;
- no shared-runtime edits;
- exact Forest definition preservation.

### Typed content-validator audit

After fixing one missing typed read declaration, result:

- **123 / 123 PASS**
- **0 failures**

It checks the new pack/activity against the same classes of constraints used by `loadCatalog`:

- event namespace;
- fallback variants;
- free exits;
- Activity result trigger references;
- declared typed career reads/writes;
- declared relationship reads/writes;
- declared worldFact reads/writes;
- known item capabilities;
- known career/relationship machine IDs;
- Tracking start and all three terminal outcomes;
- unique option/result IDs;
- Caravan season-gate parity;
- Customs access-gate parity;
- no Trade marker consumed by a current ending.

## Executable focused commands

No full CI was initiated, per assignment and current Chat 2 ownership.

The GitHub connector available to this worker does not provide a shell/command runner for this private branch. Therefore v13 does **not** claim execution of:

- `typecheck`;
- `validate`;
- `build`;
- Node test runner;
- Forest v12 executable regression suite.

Those commands remain the focused assembly gate for Chat 2.

No PR or full-CI run was opened/consumed by Chat 3.

## Remaining regional seams

After v13:

- Forest Frontier = production candidate region 1;
- Trade Corridor = production candidate region 2;
- Anomalous Reach remains missing;
- Restricted Sites remains missing.

D38 still needs at least one additional regional anchor before its common 3/4 baseline can be satisfied.

Pattern/Ritual and Infiltration/Suspicion remain owned by their intended later regional implementations.

## Disposition

**READY_FOR_CHAT2_ASSEMBLY**
