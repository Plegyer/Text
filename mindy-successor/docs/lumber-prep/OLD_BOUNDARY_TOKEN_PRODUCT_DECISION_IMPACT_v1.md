# Old Boundary Token Product Decision Impact v1

Status: post-PR24 Product decision impact matrix.

This document does not select a preferred Old Boundary Token policy.

Already shipped:
- item ID `old_boundary_token`;
- capability `enter_old_boundary`;
- inventory-derived capability ownership;
- old-boundary route gating;
- normal logging-road route;
- generic Activity option runtime.

## Acquisition source

Decision: choose a source family.

Runtime impact:
- no new generic runtime required;
- use existing item/effect transaction support.

Content impact:
- author source event/action/relationship chain;
- add exact `old_boundary_token` grant.

Save/migration impact:
- source completion/history must survive reload;
- grant must be exactly once per authored policy;
- no migration from old worldFact adapter.

UI/inventory impact:
- source availability/requirement must be visible;
- acquisition result must expose the item in inventory.

PA rows:
- PA09;
- PA14;
- PA17.

Test changes:
- natural acquisition E2E;
- reload immediately before/after acquisition;
- duplicate-grant negative case.

## Acquisition timing / requirements

Runtime impact:
- existing condition system should be used;
- no hidden timer/threshold path.

Content impact:
- author accepted public/relationship/calendar/clue conditions.

Save/migration impact:
- eligibility must derive from persisted public state;
- reload must not change eligibility unexpectedly.

UI/inventory impact:
- unavailable source should be absent or visibly gated according to Product decision.

PA rows:
- PA09;
- PA14;
- PA17;
- conditional PA16.

Test changes:
- boundary just before/after requirement becomes true;
- reload at both sides of boundary.

## Retained vs consumed / turn-in

Runtime impact:
- retained path uses existing ownership;
- consumed path uses explicit `removeItem` at one accepted commit boundary;
- later turn-in requires a separate explicit transaction.

Content impact:
- author the chosen use/removal moment.

Save/migration impact:
- consumed item cannot reappear on reload;
- repeated command cannot double-consume;
- retained item remains present deterministically.

UI/inventory impact:
- route/item availability must recompute after inventory mutation;
- presentation should explain disappearance if removal is authored.

PA rows:
- PA14;
- PA15;
- PA17.

Test changes:
- exactly-once use/removal;
- reload after commit;
- retry after reload;
- retained-item control case.

## Repeatability

Runtime impact:
- no new runtime if repeatability is represented through inventory/event history/public state;
- permanent access after consumption would require an explicitly accepted durable access state.

Content impact:
- source/event repeatability;
- repeat expedition policy;
- optional reacquisition path.

Save/migration impact:
- source/use/access state must remain stable across later days and later Forest trips.

UI/inventory impact:
- route availability must match current authoritative access state.

PA rows:
- PA14;
- PA15;
- PA17;
- later regression/replay.

Test changes:
- second Forest expedition;
- second acquisition attempt when relevant;
- permanent-access reload only if selected.

## Inventory visibility

Runtime impact:
- item already exists in typed inventory model.

Content impact:
- item label/help/capability explanation.

Save/migration impact:
- no state migration for text-only changes.

UI/inventory impact:
- item cannot be hidden-only state;
- capability meaning must be discoverable;
- route requirement presentation must stay consistent.

PA rows:
- PA09;
- PA17.

Test changes:
- inventory projection;
- route option availability vs item count.

## Capability removal behavior

Runtime impact:
- current runtime already removes capability when authoritative item ownership becomes zero;
- no cached hidden capability should survive inventory removal.

Content impact:
- only needed if Product selects a removal/turn-in transaction.

Save/migration impact:
- post-removal reload must preserve absence;
- permanent-access replacement, if selected, needs an explicit durable state transition.

UI/inventory impact:
- old-boundary option must disappear/disable after capability loss unless permanent access is explicitly authored.

PA rows:
- PA14;
- PA15;
- PA17.

Test changes:
- remove item -> recompute capability/options;
- reload after removal;
- optional permanent-access branch if selected.

## Locked-route presentation

Runtime impact:
- no eligibility-rule change.

Content impact:
- choose hidden vs disabled-with-hint presentation policy.

Save/migration impact:
- none beyond deterministic UI derivation.

UI/inventory impact:
- Activity route list presentation only.

PA rows:
- PA14;
- PA17.

Test changes:
- UI projection / available-action parity.

## Other capability interaction

Runtime impact:
- generic condition composition already exists.

Content impact:
- author explicit AND/OR combinations only if Product accepts them.

Save/migration impact:
- all inputs must be persisted authoritative state.

UI/inventory impact:
- composed requirement should be explainable to the player.

PA rows:
- PA16;
- PA17;
- conditional PA18.

Test changes:
- condition-composition positive/negative cases;
- reload with mixed capability state.

## No decision changes Hard Work

Hard Work remains only:

`completed_shifts >= 50`

Exact reward:

`hardWork:lumber`

No token decision may add an eligibility condition.
