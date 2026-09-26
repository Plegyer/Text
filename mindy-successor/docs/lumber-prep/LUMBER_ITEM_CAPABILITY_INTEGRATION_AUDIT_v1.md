# Lumber Item-Capability Integration Audit v1

Status: Chat 3 integration-prep audit.
Branch: `chat3/lumber-integration-prep-next`.
Compared against: current `main` at audit time.

## Locked design

`INITIAL_ITEM_CATALOG_v0.md` defines:

- item: `old_boundary_token` / Old Boundary Token;
- category: Key/Route item;
- capability: `enter_old_boundary`;
- intended uses: hidden Forest route and evidence of old rights/boundaries in the Lumber branch;
- it is not sold as an ordinary commodity.

The catalog lists possible source families (Tavern rumour chain + old owner, relationship, Hunter, hidden city event). Those are design sources, not proof that a production acquisition action is currently shipped.

`FOREST_ACTIVITY_SLICE_v0.md` also names `old_boundary_token -> enter_old_boundary` as the capability that opens the hidden route.

No acquisition price, consume rule, or exact shipped acquisition action is locked by the current executable content. This audit does not invent one.

## Current executable boundary on main

### Production-ready generic item mechanics

The shared schema/runtime has a working inventory model for the current typed item enum:

`herb`, `tonic`, `scales`.

For those typed items, the runtime supports:

- inventory counts in `run.resources.inventory`;
- typed `itemCount` conditions;
- typed `addItem` and `removeItem` effects;
- atomic rejection when removal exceeds inventory;
- legacy item effects/conditions used by existing M3.2 actions.

Existing active content demonstrates acquisition/consumption patterns for the legacy typed items (for example forage/sell/scales actions). This proves the generic count/effect mechanism, not the Old Boundary Token integration.

### Lumber test adapter

`content/lumber-item-capabilities.fixture.json` is explicitly marked:

`TEST_ADAPTER_UNTIL_SHARED_ITEM_CAPABILITY_SCHEMA`.

It maps:

`old_boundary_token / enter_old_boundary`
to the typed test world fact:

`lumber.capability.enter-old-boundary`.

This adapter is valid isolated acceptance evidence. It is not a production ItemDefinition or acquisition implementation.

### Forest Activity entry

The current `lumber.forest` Activity uses one entry condition:

`worldFact(lumber.capability.enter-old-boundary) == present`.

Entry costs exactly 2 daytime Energy. The Activity therefore already has an executable capability-shaped gate, but the gate is currently supplied through the Lumber test adapter rather than a real inventory capability resolver.

## What is not production-ready

### 1. `old_boundary_token` is not in the typed item enum

The shared `items` enum is still only:

`herb | tonic | scales`.

Therefore current target schemas reject:

- `itemCount(old_boundary_token)`;
- `addItem(old_boundary_token)`;
- `removeItem(old_boundary_token)`.

Promoting the token requires an explicit shared item-definition/capability integration, not a Lumber-only silent enum bypass.

### 2. No executable item capability registry/resolver exists

Pack capabilities currently describe pack read/write ownership over inventory/domains. They do not define gameplay item capabilities such as:

`old_boundary_token -> enter_old_boundary`.

There is no shipped shared API that asks whether inventory grants a named gameplay capability and resolves that capability into the Forest entry condition.

### 3. Draft item commands are not shipped as shared commands

`ITEM_SYSTEM_DRAFT_v0.md` proposes core operations:

- acquire;
- consume/use;
- equip/assign to context;
- transfer/turn-in;
- sell/barter.

The current engine command boundary does not expose these as general typed item commands. Existing item movement happens through authored action/effect flows and legacy special cases.

### 4. No production acquisition action/source for the token is shipped

The locked catalog names source families, but current executable content does not contain a real production acquisition action/event that grants `old_boundary_token` or `enter_old_boundary`.

This remains blocked on product integration/authoring ownership.

### 5. Consumption/pricing must remain OPEN

The locked catalog says the token is not an ordinary commodity. It does not lock:

- a money price;
- whether Forest entry consumes the token;
- whether the token is permanent, turned in later, or reusable;
- exact acquisition timing.

No such rule should be inferred from the test worldFact adapter.

## Production integration gap

The minimum production integration needs all of the following to land under shared/item ownership:

1. a typed production definition for `old_boundary_token`;
2. a capability mapping `old_boundary_token -> enter_old_boundary`;
3. a shared way for gameplay conditions to query named item capabilities, or an explicitly owned bridge from inventory to the capability fact;
4. at least one real, reachable acquisition source/action/event;
5. explicit consume/retain semantics at the point of use;
6. save/reload tests proving acquisition/use cannot duplicate or consume twice.

Only after those pieces exist should the Lumber Forest entry move from the test worldFact adapter to the real item-capability path.

## Integration classification

| Area | Status | Evidence |
| --- | --- | --- |
| Generic inventory counts | READY | shared inventory + typed item conditions/effects |
| Generic typed add/remove for current enum | READY | `addItem`, `removeItem`, `itemCount` |
| Locked token identity | READY AS DESIGN | `old_boundary_token` in locked item catalog |
| Locked capability identity | READY AS DESIGN | `enter_old_boundary` |
| Lumber Forest capability-shaped gate | READY AS FIXTURE | worldFact entry condition |
| Lumber adapter | TEST-ONLY | explicitly marked test adapter |
| Token in production item enum | BLOCKED | not present |
| Shared item capability resolver | BLOCKED | no executable gameplay capability registry/API |
| Real token acquisition source/action | BLOCKED | none shipped |
| Consume/retain rule | OPEN | not locked |
| Price | OPEN / NOT APPLICABLE BY DEFAULT | catalog says not ordinary commodity; no price locked |

## Hard Work isolation

This audit does not change ending rules.

Lumber Hard Work remains:

`completed_shifts >= 50` only.

It has no item, Forest, relationship, School, milestone, or season prerequisite, and its A6 reward remains exactly:

`hardWork:lumber`.
