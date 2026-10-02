# C2-189 — Merchant cross-system and advanced-route presentation preparation

Status: COMPLETE FOR PRE-FREEZE PREPARATION
Owner: Chat 2 / Presentation & Media
Published runtime contract observed: `chat1/merchant-complete-v15@4276e52f9f6d588ea0efc1bbd9b00eb1e7a67273`
Final authority: exact frozen Merchant runtime required by C2-192.

## Published cross-system seams

Current Merchant runtime contract publishes these exact Merchant event identities:
- Lumber: `merchant.cross.lumber-route`
- Undead Farm: `merchant.cross.farm-sample`
- Hunter: `merchant.cross.hunter-return`
- Tavern: `merchant.cross.tavern-rumour`
- Guard: `merchant.cross.guard-pass`

Published consumer facts:
- `lumber-input-known`
- `farm-input-known`
- `hunter-input-known`
- `tavern-input-known`
- `guard-input-known`

No future-career or Palace seam is authorized.

## Activity boundary

The contract does not publish a separate Merchant Activity event.

Merchant may consume the already shipped Hunter chain:
- `hunter.expedition`
- `hunter.expedition.success`
- `hunter.expedition-returned`

Presentation therefore must not reserve `merchant.cross.activity*` or any new Activity identity. Activity state remains owned by the existing Hunter/Activity system.

## Advanced readiness facts

Prepared qualitative state surfaces are limited to exact published facts:
- `veteran-ready`
- `crisis-resolved`
- `merchant-house-ready`
- `speculator-route-ready`
- `patron-route-ready`
- `outcome-ready`

Semantic identity:
- `job/merchant/state/<state>`

A surface materializes only when the live runtime contains the backing fact.

These are readiness/status cards, not ending cards.

## Crisis

Published crisis event:
- `merchant.crisis.delivery-pressure`

Its runtime-local resolution families may use records, supplier rerouting, or narrow risk acceptance. Presentation may distinguish those qualitative choices only after exact live event/variant/choice identities are present.

It must not imply a global market, law/crime, debt, inventory-capacity, or price engine.

## Patron route

Patron readiness must remain visibly tied to multiple real shipped inputs. Presentation must not collapse Patron of Routes into:
- a single Merchant shift counter;
- generic “network” flavor;
- a Palace contract;
- a future Artist/Assassin/Prostitute seam.

## Freeze rule

The final candidate will bind exact event overrides only after the frozen runtime catalog proves the identities are live. Preparation constants do not authorize absent production events.

No gameplay fact production, Activity state, cross-career mechanics, economy, Save/RNG, ending eligibility, or Meta is changed here.
