# Forest Hunter Trail Authoring Packet v1

Status: product-authoring seam for the locked Hunter trail route.

## Authoritative route identity

Authoritative Forest design requires a route context:

**Hunter trail**

Locked design meaning:
- distinct from logging road;
- distinct from old boundary path;
- richer in wildlife/tracking encounters;
- can expose rarer resources;
- requires a Hunter clue or a navigation capability.

This packet does not invent a final runtime option ID.

Authoring key used only by this packet:

`hunter-trail`

Production option ID: **OPEN**.

## Smallest acceptable route seam

The route becomes product-complete only when all of these surfaces exist.

### 1. Route option in Forest Activity

After entering `lumber.forest`, the route list can expose Hunter trail when its gate is satisfied.

Required route effect:
- selecting Hunter trail sets stable route identity `hunter-trail`;
- route selection is persisted in the Activity envelope;
- reload cannot silently switch to logging road or old boundary;
- route selection cannot be re-rolled by reload.

### 2. Gate boundary

Authoritative design permits:
- a Hunter clue; or
- a navigation capability.

Exact public fact ID: **OPEN**.
Exact capability ID: **OPEN** unless Product chooses an already-authoritative navigation capability.
Exact Hunter scene/source: **OPEN**.
Exact threshold: **OPEN**.

Accepted contract shape:

`any(Hunter public clue fact, navigation capability)`

The final implementation should use typed/public ownership:
- Hunter-owned public fact for the clue path; and/or
- actual inventory-derived capability for the capability path.

Do not read Hunter-private counters directly from Forest content.

### 3. Navigation challenge integration

Hunter trail must exercise the navigation challenge family.

Allowed dependency categories:
- Wits;
- Reason;
- Hunter/public knowledge fact;
- navigation capability.

Exact stat threshold/check formula remains OPEN.

At least one route decision must change the next available action or risk/resource path. A pure numeric bonus with identical action-space is insufficient.

### 4. Save/reload checkpoints

Minimum checkpoints:
1. before Hunter trail becomes available;
2. after clue/capability ownership;
3. after route selection;
4. before navigation challenge;
5. after challenge resolution;
6. reload at each boundary.

Required invariants:
- route availability is deterministic from owned fact/capability state;
- selected route survives reload;
- resolved challenge does not reappear;
- RNG/checkpoint state does not re-roll;
- item/capability use follows the generic exactly-once contract if an item option is used.

### 5. Result boundary

Hunter trail remains one route inside `lumber.forest`.

It must preserve the existing Activity result identities:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Hunter trail does not create a fourth terminal outcome.

Route-specific discoveries/rewards may be authored later, but exact lore reward and loot remain OPEN.

## Relationship / public-fact ownership

A Hunter relationship or event may publish the clue, but the exact source is not selected here.

Forest may read:
- one accepted Hunter-owned public fact; or
- one accepted navigation item capability.

Forest must not:
- write Hunter-private progression merely by selecting the route;
- infer a clue from generic visit count;
- invent a Hunter threshold.

## Presentation

Required:
- Hunter trail has a distinct route label/presentation slot;
- challenge presentation is distinguishable from logging road;
- missing optional art may fall back without changing mechanics.

Exact prose, NPC identity, wildlife encounter, and media assets remain OPEN.

## Seasonal integration

Hunter trail must participate in the authoritative season topology contract.

Already-authoritative seasonal intent:
- autumn: animal migration enriches Hunter trail;
- other seasons may alter access/options through the shared Forest season topology authoring.

Exact seasonal event text/reward remains OPEN.

## Non-goals

Do not decide here:
- clue item identity;
- Hunter clue fact ID;
- Hunter scene;
- NPC;
- threshold;
- loot;
- lore;
- consume policy;
- exact runtime option ID.

## Hard Work isolation

Hunter trail is never a Hard Work prerequisite.

Hard Work remains only:

`completed_shifts >= 50`

with exact reward:

`hardWork:lumber`.
