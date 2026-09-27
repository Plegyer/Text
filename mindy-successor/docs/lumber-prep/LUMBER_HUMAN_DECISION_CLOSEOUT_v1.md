# Lumber Human Decision Closeout v1

Status: only human/Product decisions still OPEN after merged PR #25.

PR25 technical RC gate is GREEN. The items below are not runtime defects.

## D1 — Old Boundary Token acquisition source

Current locked context:
- item ID `old_boundary_token` is shipped;
- capability `enter_old_boundary` is shipped;
- capability is derived from actual inventory;
- normal Forest entry/logging road does not require the token;
- old-boundary route requires the capability.

Permissible answer shape:
- select one accepted source family or explicitly approve another authored source;
- define one-shot vs repeatable source behavior;
- define any public/relationship/calendar requirement.

Files/systems affected:
- Old Boundary Token decision-ready/impact/vector artifacts;
- content event/action/relationship source;
- inventory grant transaction;
- Activity route availability/UI.

PA rows:
- PA09;
- PA14;
- PA17.

Runtime ready:
**YES.** Generic item/capability/Activity-option runtime is already shipped.

## D2 — Old Boundary Token use/removal policy

Current locked context:
- route eligibility reads current inventory-derived capability;
- removing the last authoritative token removes `enter_old_boundary` unless a separate durable access mechanism is explicitly authored.

Permissible answer shape:
- retained/reusable;
- consume on accepted route use;
- later explicit turn-in;
- optional permanent-access transition only if separately approved.

Files/systems affected:
- item-use/content transaction;
- inventory mutation;
- route availability recomputation;
- save/reload/retry tests;
- inventory/route presentation.

PA rows:
- PA14;
- PA15;
- PA17.

Runtime ready:
**YES.** Existing inventory mutation and capability recomputation seams are sufficient; policy is missing.

## D3 — Old Boundary Token presentation

Current locked context:
- full PA09 cannot be satisfied by a hidden-only capability;
- authoritative ownership remains the visible item/inventory state.

Permissible answer shape:
- visible inventory item with capability hint;
- visible item detail/help plus route requirement hint;
- hidden-vs-disabled old-boundary route presentation choice, while item ownership remains visible.

Files/systems affected:
- inventory UI/presentation;
- Activity route lock presentation;
- semantic presentation/help content.

PA rows:
- PA09;
- PA17.

Runtime ready:
**YES.** This is presentation/content authoring.

## D4 — School -> Lumber management/accounting result

Current locked context:
- School lesson runtime, typed `lessons_completed`, cost/Energy and blocking scene are shipped;
- Lumber listener expects public fact `lumber.school.management-ready`;
- PR24/PR25 prove the fact is not emitted accidentally;
- synthetic `school.lumber-management` is not production.

Permissible answer shape:
- select School provider/course/track;
- select exact `lessons_completed` threshold or accepted milestone/project/exam/certificate boundary;
- publish `lumber.school.management-ready` exactly once through School-owned authoring.

Files/systems affected:
- School production content/progression authoring;
- public-fact publication;
- existing Lumber cross-system listener;
- School/Lumber cross-system QA.

PA rows:
- PA07;
- PA08;
- Forewoman route coverage where management readiness is used.

Runtime ready:
**YES.** The missing piece is Product-owned School authoring.

## D5 — Hunter trail gate identity

Current locked context:
- route identity `hunter-trail` is locked;
- route belongs inside `lumber.forest`;
- navigation family participation is locked;
- gate may use a Hunter public clue fact and/or navigation capability;
- `enter_old_boundary` must not be reused.

Permissible answer shape:
- exact Hunter-owned public fact;
- exact navigation capability;
- explicit OR boundary between accepted fact/capability.

Files/systems affected:
- Hunter trail decision matrix/boundary fixture;
- Forest route option conditions;
- Hunter/public fact or item capability source;
- available Activity actions;
- save/reload QA.

PA rows:
- PA16;
- PA17.

Runtime ready:
**YES.** PR22 generic conditions/options can host the route.

## D6 — Hunter trail source/provider/reward identity

Current locked context:
- no clue source, narrative provider, exact reward/lore, or thresholds are currently authoritative.

Permissible answer shape:
- approved source/provider scene;
- approved route-specific public discovery/item/reward;
- approved navigation check threshold/formula within locked dependency categories.

Files/systems affected:
- Hunter/Forest authored content;
- presentation/media slots;
- route challenge/reward tests;
- event/public-fact ownership.

PA rows:
- PA16;
- conditional PA17/PA18 depending on chosen capability/reward path.

Runtime ready:
**YES.** This is content/product authoring.

## D7 — School Arcana public boundary for Forest anomaly path

Current locked context:
- interpretation/ritual anomaly family may use Reason, Magic, a School Arcana public fact, or an accepted sample/tool capability;
- no Arcana public fact ID or threshold is locked.

Permissible answer shape:
- approve an Arcana public fact and the School-owned rule that emits it;
- or author the anomaly path without requiring a School public fact.

Files/systems affected:
- School authoring if the fact path is chosen;
- Forest anomaly option conditions;
- cross-system save/reload QA.

PA rows:
- PA16;
- PA17 if item/capability action-space is part of the chosen anomaly path.

Runtime ready:
**YES.** Public-fact and Activity-option infrastructure already exists.

## Not human decisions anymore

Do not reopen:
- Hard Work threshold;
- Hard Work reward ID;
- A5 continuation boundary;
- Forest entry Energy cost;
- logging-road normal route;
- old-boundary capability identity;
- legacy Activity save behavior;
- terminal Forest result IDs.

Hard Work remains ONLY:
`completed_shifts >= 50`

Exact reward:
`hardWork:lumber`.
