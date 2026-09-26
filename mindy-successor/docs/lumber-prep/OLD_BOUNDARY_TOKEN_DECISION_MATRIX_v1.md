# Old Boundary Token Decision Matrix v1

Status: explicit Product decision matrix after PR #22.

PR22 has already shipped the generic runtime seam:
- typed item `old_boundary_token`;
- capability `enter_old_boundary`;
- capability derivation from actual inventory;
- normal Forest entry without the token;
- capability-gated old-boundary route option.

What remains is Product authoring/decision work. This matrix intentionally selects no preferred answer.

## D1 — acquisition source

Question:

**Where does the player obtain Old Boundary Token?**

Authoritative candidate source families already named in the item catalog:
- Tavern rumour chain + old owner;
- relationship;
- Hunter;
- hidden city event.

Decision status: **OPEN**.

No candidate is preferred here.

Affected PA rows:
- PA09 directly;
- PA14 natural old-boundary access;
- PA17 item-driven action-space evidence.

Runtime/content seams:
- content event/action/relationship source;
- typed `addItem old_boundary_token` transaction;
- inventory visibility;
- save/reload immediately after acquisition;
- acquisition presentation.

Must not invent:
- vendor;
- price;
- NPC identity;
- exact event ID before Product selects a source.

## D2 — acquisition timing and requirements

Questions:
- earliest day/season, if constrained?
- prerequisite public fact/relationship stage/clue, if any?
- one route or several alternative routes to acquisition?
- can acquisition happen before the first Forest visit?

Decision status: **OPEN**.

Affected PA rows:
- PA09;
- PA14;
- PA17;
- potentially PA16 if route depth assumes the token can be obtained before a specific Forest sequence.

Runtime/content seams:
- acquisition conditions;
- public fact / relationship / calendar conditions;
- UI action visibility;
- resolver timing;
- save/reload around eligibility.

Do not infer a threshold from legacy visit counts or School progress.

## D3 — retained vs consumed

Question:

**Does selecting/using the old-boundary route keep the token, consume it, or turn it in at another explicit transaction?**

Decision status: **OPEN**.

Possible policy families, without preference:
- retained/reusable;
- consumed on accepted route use;
- consumed/turned in at a later explicit authored boundary.

Affected PA rows:
- PA14 old-boundary route availability;
- PA15 save/resume;
- PA17 item use;
- repeated Forest entry beyond the minimum PA flow.

Runtime/content seams:
- exactly-once item-use transaction;
- inventory mutation;
- capability recomputation;
- route availability after use;
- reload after commit.

PR22 does not select this policy.

## D4 — repeatability

Questions:
- can the player use the token on multiple Forest expeditions?
- is old-boundary access permanent after first proof/use?
- if consumed or turned in, is there another acquisition route?
- is the acquisition transaction one-shot while route access persists by a public fact?

Decision status: **OPEN**.

Affected PA rows:
- PA14;
- PA15;
- PA17;
- regression/replay coverage after the first Forest trip.

Runtime/content seams:
- item count;
- route/public-fact persistence;
- event history/one-shot source;
- exactly-once use identity;
- New Day / later expedition availability.

No permanent access fact is invented here.

## D5 — inventory visibility

Question:

**How explicitly should the token and its capability be shown to the player?**

Minimum accepted requirement from Product Acceptance:
- inventory shows the meaningful item/capability;
- it cannot exist only as a hidden flag.

Decision status:
- **minimum visibility LOCKED**;
- exact label/help/presentation details **OPEN**.

Affected PA rows:
- PA09;
- PA17.

Runtime/content seams:
- inventory UI;
- item label;
- capability explanation;
- disabled/locked old-boundary route presentation.

Do not require final art to close the mechanical decision.

## D6 — capability removal when token leaves inventory

PR22 runtime fact:

`enter_old_boundary` is derived from currently owned inventory item definitions.

Therefore, if `old_boundary_token` count becomes zero, the current inventory-derived capability query stops returning `enter_old_boundary`.

Product decision still required:

**Should normal gameplay ever remove the token after acquisition/use?**

Decision status:
- runtime derivation behavior: **SHIPPED**;
- whether an authored transaction removes the token: **OPEN**.

Affected PA rows:
- PA14;
- PA15;
- PA17.

Runtime/content seams:
- `removeItem old_boundary_token`, if chosen;
- exactly-once use/consume commit;
- recomputed available Activity options;
- reload after removal.

No hidden cached capability should keep the old-boundary route available after authoritative inventory removal unless Product explicitly authors a replacement permanent-access fact/capability.

## D7 — old-boundary route lock presentation

Question:

**Before the capability is owned, should the old-boundary route be hidden or shown disabled with a requirement hint?**

Decision status: **OPEN presentation decision**.

Affected PA rows:
- PA14;
- PA17.

Runtime/content seams:
- `availableActivityActions`;
- Activity UI;
- optional locked-option presentation layer.

The mechanical rule is already locked: the selectable old-boundary option requires `enter_old_boundary`.

## D8 — relationship to other Forest capabilities

Question:

**Does Old Boundary Token interact with rope, axe, preservation kit, Hunter clue, or Arcana path beyond opening old boundary?**

Decision status: **OPEN** unless a later accepted authoring packet explicitly binds an interaction.

Affected PA rows:
- PA16;
- PA17;
- possibly PA18 for final route content.

Runtime/content seams:
- Activity option conditions;
- challenge-family authoring;
- public facts;
- item capability combinations.

Do not make the token a universal Forest key.

## Decision impact summary

| Decision | Status | Primary PA rows | Main seam |
| --- | --- | --- | --- |
| acquisition source | OPEN | PA09, PA14, PA17 | item acquisition content |
| timing/requirements | OPEN | PA09, PA14, PA17 | acquisition conditions/resolver |
| retained vs consumed | OPEN | PA14, PA15, PA17 | exactly-once item use/inventory |
| repeatability | OPEN | PA14, PA15, PA17 | persistence/event history |
| inventory visibility | minimum LOCKED, details OPEN | PA09, PA17 | inventory UI/presentation |
| removal removes capability | runtime behavior SHIPPED; removal policy OPEN | PA14, PA15, PA17 | inventory-derived capability |
| locked-route presentation | OPEN | PA14, PA17 | Activity UI |
| interactions with other capabilities | OPEN | PA16–PA18 | Forest option/challenge authoring |

## What is not a decision anymore

Already shipped:
- Forest entry does not require the token;
- logging road is a normal route;
- `old_boundary_token` owns `enter_old_boundary`;
- old-boundary route requires `enter_old_boundary`;
- capability is derived from actual inventory;
- legacy active Activity saves retain advance/escape compatibility.

Do not reopen those in Product authoring.

## Hard Work firewall

Old Boundary Token decisions have no effect on Hard Work.

Hard Work remains exactly:

`completed_shifts >= 50`

with reward:

`hardWork:lumber`.

No token, Forest-route, School, relationship, season or milestone prerequisite may be added.
