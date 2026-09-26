# Old Boundary Token Authoring Packet v1

Status: product-authoring seam only. No production implementation is added here.

## Locked identity

The item and capability identities are already locked:

- item: `old_boundary_token`;
- display concept: Old Boundary Token / Старый межевой жетон;
- capability: `enter_old_boundary`;
- Lumber/Forest role: route/key capability, not a percentage-stat trinket.

Current acceptance fixtures prove the gate through a test-only worldFact adapter:

`lumber.capability.enter-old-boundary`

That adapter is evidence, not the final product source.

## Smallest acceptable product seam

A production implementation is acceptable only if all five surfaces exist.

### 1. Obtain the item/capability

Required:

- one real reachable product source awards `old_boundary_token` or its owned `enter_old_boundary` capability;
- acquisition is atomic and saveable;
- reload after acquisition cannot duplicate the item/capability.

Still OPEN:

- exact source;
- NPC/event/vendor/relationship route;
- price, if any;
- exact acquisition command/event ID.

Do not invent a shop purchase merely because the generic inventory can represent items. The locked catalog says this token is not an ordinary commodity.

### 2. Inventory visibility

After acquisition the player must be able to see that the route item/capability exists.

Minimum UI meaning:

- item identity is visible;
- capability meaning is visible: it opens an old-boundary Forest route/action;
- the item is not represented only as an invisible flag.

Exact wording/art remains authoring-owned.

### 3. Change the Forest action/route surface

The capability must change what the player can do.

Before capability:
- old-boundary Forest route/action is unavailable.

After capability:
- the corresponding Forest route/action or entry becomes available.

This must be an availability/action-space change.

A percentage-only effect such as “+10% Forest success” is insufficient.

Current executable evidence uses the capability as the `lumber.forest` entry gate. A future deeper Forest authoring may attach the same capability to a more specific route/action, but the exact route/action ID is OPEN until accepted.

### 4. Save/reload

Required checkpoints:

1. immediately before acquisition;
2. immediately after acquisition;
3. after reload with the capability visible;
4. before capability use/route entry;
5. after capability use/route entry;
6. reload again.

Invariants:

- no duplicate acquisition;
- no duplicate consume/turn-in if the final contract consumes it;
- capability availability is deterministic after reload;
- Forest entry/action availability does not reroll.

### 5. Use semantics

Still OPEN:

- retained/reusable;
- consumed on entry;
- turned in later;
- consumed only by a specific deeper route.

Until product ownership locks this, the acceptance packet must not assume consumption.

## Production ownership boundary

The final implementation needs a typed owner for:

- item identity;
- capability mapping;
- acquisition transaction;
- capability query from Forest;
- persistence;
- UI visibility.

A test-only `addWorldFact(lumber.capability.enter-old-boundary)` setup may continue to prove downstream Activity mechanics, but it must never be counted as PA09/PA17 product completion.

## Non-goals / prohibited shortcuts

Do not:

- invent an acquisition source;
- invent a price;
- invent a consume rule;
- replace `enter_old_boundary` with another capability ID;
- award Forest success directly when the item is acquired;
- make the capability only a numeric/percentage modifier;
- make the item/capability a Hard Work prerequisite.

## Hard Work isolation

Hard Work remains completely independent:

`completed_shifts >= 50`

only, with exact reward:

`hardWork:lumber`

The Old Boundary Token is never required for Hard Work.
