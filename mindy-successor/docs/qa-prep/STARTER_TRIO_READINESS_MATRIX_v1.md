# Starter Trio Readiness Matrix v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Baseline: current main after PR27

## Scope

Compare the three intended starter careers:

1. Lumber
2. Satyr Maid
3. Undead Farm

against the same production-readiness dimensions.

Authoritative design sources:

- `JOB_ROSTER_RECONCILIATION_v1.md`
- `CAREER_LUMBER_DRAFT_v0.md`
- `CAREER_SATYR_MAID_DRAFT_v0.md`
- `CAREER_UNDEAD_FARM_DRAFT_v0.md`
- `JOB_SYSTEM_MATRIX_v0.md`
- full-game system contracts.

Current production evidence is taken from merged main, not from fixture-only worker branches.

---

# Classification vocabulary

- **PRODUCTION_GREEN** — merged production content/runtime is directly executable.
- **DESIGN_READY** — authoritative career structure exists but production package is not merged.
- **PARTIAL_INFRASTRUCTURE** — generic shared runtime exists, but career-specific authoring/integration does not.
- **AUTHORING_OPEN** — exact content/threshold/identity is intentionally undecided.
- **NOT_PRODUCTION_READY** — cannot yet be treated as a playable career slice.

---

# Matrix

| Dimension | Lumber | Satyr Maid | Undead Farm |
|---|---|---|---|
| repeatable shift | **PRODUCTION_GREEN** | **DESIGN_READY / NOT PRODUCTION** | **DESIGN_READY / NOT PRODUCTION** |
| seasonal variants | **PRODUCTION_GREEN** | **DESIGN_READY** | **DESIGN_READY** |
| career state machine | **PRODUCTION_GREEN, shallow first slice** | **DESIGN_READY** | **DESIGN_READY** |
| relationship | **PRODUCTION_GREEN first Foreman route** | **DESIGN_READY** | **DESIGN_READY** |
| School hooks | **PARTIAL / one consumer seam, authoring open** | **DESIGN_READY** | **DESIGN_READY** |
| item hooks | **PARTIAL PRODUCTION via Forest capability system** | **DESIGN_READY** | **DESIGN_READY** |
| Activity hooks | **PRODUCTION_GREEN base Forest bridge** | **DESIGN_READY** | **DESIGN_READY** |
| Night | **PRODUCTION_GREEN Foreman Night** | **DESIGN_READY / important to identity** | **DESIGN_READY** |
| endings | **PRODUCTION_GREEN Hard Work + two complex candidates** | **DESIGN_READY** | **DESIGN_READY** |
| presentation | **PRODUCTION_GREEN semantic IDs/fallback** | **PARTIAL_INFRASTRUCTURE** | **PARTIAL_INFRASTRUCTURE** |
| save/reload | **PRODUCTION_GREEN** | **PARTIAL_INFRASTRUCTURE only** | **PARTIAL_INFRASTRUCTURE only** |
| content depth | **PARTIAL: vertical RC, not full draft depth** | **NOT PRODUCTION READY** | **NOT PRODUCTION READY** |

---

# Lumber

## Repeatable shift

**PRODUCTION_GREEN**

Current main ships:

`lumber.shift`

with:

- 1 Energy cost;
- typed `completed_shifts`;
- seasonal stat packages;
- semantic presentation;
- real production save/reload coverage.

Legacy `lumber` remains compatibility content but is not the target shift.

## Seasonal variants

**PRODUCTION_GREEN**

Current target shift has:

- spring;
- summer;
- autumn;
- winter

variants.

Current RC proves all four production variants.

This satisfies a baseline seasonal Work contract.

It does not yet implement every richer seasonal career consequence proposed in the draft.

## Career state machine

**PRODUCTION_GREEN, EARLY DEPTH ONLY**

Current production career:

`lumber`

has:

- `newcomer`;
- `accepted-hand`;
- first transition after one target shift.

The full draft expects deeper:

- trusted worker;
- veteran;
- Forewoman;
- Forest route;
- outcome-ready

career structure.

Some complex outcome facts/endings already exist, but the full career state-machine depth is not yet authored.

## Relationship

**PRODUCTION_GREEN first route**

Current production relationship:

`lumber.foreman`

supports:

- unknown;
- professional;
- route-professional;
- professional Night content.

The career draft expects broader:

- professional-only;
- friendship/partnership;
- optional romance;
- conflict/rivalry

depending on final authoring.

Therefore runtime proof is green; relationship content depth remains partial.

## School hook

**PARTIAL**

Current Lumber consumer seam exists for:

`lumber.school.management-ready`.

But authoritative School provider/threshold remains a human Product decision.

Do not count the consumer as a complete School -> Lumber chain.

## Item hook

**PARTIAL PRODUCTION**

Generic inventory/capability runtime is green.

Old Boundary Token already changes Forest route availability.

However the real token acquisition/policy remains open.

The Lumber draft also expects other meaningful tool/document patterns beyond this first capability proof.

## Activity hook

**PRODUCTION_GREEN base bridge**

Current production proves:

```text
Lumber
-> Forest
-> logging-road route
-> success
-> activityResult(lumber.forest, success, lumber.forest.success)
-> Lumber continuation
```

Full draft expects richer Forest depth and possible Hunter/Tavern/School hooks.

## Night

**PRODUCTION_GREEN**

Foreman professional Night is shipped and reload-safe.

It proves the Job -> Relationship -> Night bridge.

## Endings

Current production has:

- `ending.lumber.hard-work`;
- `ending.lumber.forewoman`;
- `ending.lumber.forest`.

Hard Work is fully locked and green.

Forewoman remains dependent on open School authoring.

Forest complex ending uses current Forest continuation but broader full-depth Activity remains open.

## Presentation

**PRODUCTION_GREEN**

Stable semantic IDs, central stage and fallback are current release behavior.

## Save/reload

**PRODUCTION_GREEN**

Lumber participates in:

- pending milestone reload;
- Foreman reload;
- one-Save E2E;
- Forest continuation reload;
- ending/Meta reload.

## Content depth

**PARTIAL**

Lumber is the strongest production career and validates the architecture.

It still does not equal the entire draft's eventual content budget.

---

# Satyr Maid

## Repeatable shift

**DESIGN_READY / NOT PRODUCTION**

The career draft defines:

- 1 Energy repeatable service shift;
- wage/tip/reputation behavior;
- variant pools;
- adult/social routing without making consent automatic.

No first-class target Satyr Maid career/action equivalent to `lumber.shift` is present in current production definitions.

The unrelated `satyr.met` landlord compatibility flag is not a Satyr Maid production career.

## Seasonal variants

**DESIGN_READY**

The draft provides meaningful seasonal direction:

- spring outdoor/traveller changes;
- summer peak flow/night events;
- autumn festivals/high-status guests;
- winter regulars/intimate indoor pacing.

No target production seasonal shift package is currently merged.

## Career state machine

**DESIGN_READY**

Draft stages include:

- New Maid;
- Known Face;
- House Regular;
- Veteran Service;
- House Power;
- Personal Network;
- Boundaries/House Rules;
- Outcome-ready.

No target production state machine is currently merged.

## Relationship

**DESIGN_READY**

Relationships are central to this career's identity:

- staff;
- recurring customers;
- performers;
- suppliers;
- management.

The design explicitly avoids requiring romance for career advancement.

No career-specific target relationship machine is currently merged.

## School hooks

**DESIGN_READY**

Potential School links include:

- rhetoric/social;
- accounting/management;
- etiquette/presentation;
- performance-related progression.

Current generic School runtime is ready to support future authoring.

No accepted Satyr-specific public-result package is production.

## Item hooks

**DESIGN_READY / GENERIC RUNTIME READY**

Possible service/house/event items may affect:

- VIP handling;
- supply;
- presentation;
- event options.

Exact item identities are still authoring.

## Activity hooks

**DESIGN READY, SECONDARY**

Satyr Maid is less Activity-centric than Lumber/Hunter/Farm, but the draft allows external supply/social/task links.

No Satyr-specific Activity bridge is production.

## Night

**DESIGN_READY / HIGH IMPORTANCE**

Night/after-hours content is a major differentiator for this career.

The shared NightFlow runtime is green.

Satyr-specific Night choices/events are not production.

## Endings

Draft outcome families include:

- Hard Work;
- House Power;
- Personal Network / Partner;
- professional Boundaries/status route.

No target Satyr Maid endings are production.

## Presentation

Shared semantic presentation runtime is ready.

Career-specific slots/assets/content are not production-integrated.

## Save/reload

Generic framework is green.

There is no target Satyr Maid persisted career/relationship/Night E2E to accept yet.

## Content depth

**NOT PRODUCTION READY**

The design is structurally rich enough for a production package, but current main does not contain that package.

---

# Undead Farm

## Repeatable shift

**DESIGN_READY / NOT PRODUCTION**

The draft defines a 1-Energy farm-work loop with:

- production/resources;
- magical/biological anomalies;
- seasonal tasks;
- item/research hooks.

No first-class target Undead Farm action/career is present in current production definitions.

## Seasonal variants

**DESIGN_READY**

Draft season roles are materially different:

- spring preparation/new growth;
- summer production/maintenance;
- autumn harvest/processing/contracts;
- winter storage/repair/research.

No target seasonal farm package is merged.

## Career state machine

**DESIGN_READY**

Draft stages include:

- New Hand;
- Reliable Helper;
- Keeper of the Process;
- Veteran;
- Research;
- Successor;
- External Anomaly;
- Outcome-ready.

No target production machine is merged.

## Relationship

**DESIGN_READY**

Possible major NPC roles include:

- owner;
- caretaker;
- mage-agronomist;
- senior undead worker.

Professional/mentor/partner/conflict routes are expected.

No farm relationship machine is production.

## School hooks

**DESIGN_READY / STRONG**

Draft explicitly uses:

- Arcana;
- literacy/accounting;
- practical craft;
- rhetoric

for distinct career consequences.

Current School runtime can support this future package.

Exact provider/result content remains authoring.

## Item hooks

**DESIGN_READY / STRONG**

Named draft examples include:

- Spirit Jar;
- Preservation Kit;
- Farm Seal / Delivery Crate;
- protective tools.

The generic capability runtime is already suitable for meaningful item-gated options.

Exact production catalog remains open.

## Activity hooks

**DESIGN_READY / STRONG**

Farm is intended to exchange:

- rare samples;
- ingredients;
- anomaly origins;
- environmental results

with the large Activity.

The current Forest framework provides reusable architecture but no Farm-specific bridge.

## Night

**DESIGN_READY**

Farm can intersect:

- low-cash/in-kind survival;
- relationship Night;
- poverty/lodging arrangements.

No farm Night package is production.

## Endings

Draft outcome families:

- Hard Work;
- Research Farmer;
- Farm Successor;
- External Anomaly.

No production endings are merged.

## Presentation

Shared runtime ready.

Farm-specific semantic slot catalog/assets/content need a package.

## Save/reload

Generic typed state and transaction infrastructure is ready.

No target Farm cross-system E2E exists.

## Content depth

**NOT PRODUCTION READY**

The draft is suitable for a future production package but requires substantial authoring/integration.

---

# Starter-trio comparative conclusion

## Lumber

Current role:

**PRODUCTION REFERENCE SLICE**

Strongest evidence:

- repeatable Work;
- seasonal variants;
- typed career;
- relationship;
- Night;
- School consumer;
- Activity;
- item capability;
- endings;
- presentation;
- one-Save reload.

Remaining work is mainly authored depth and still-open cross-system Product decisions.

## Satyr Maid

Current role:

**DESIGN REFERENCE SLICE / PRODUCTION PACKAGE NEEDED**

The career design is rich and deliberately social/Night-heavy.

Generic runtime is largely reusable.

Missing work is primarily:

- production action;
- career state machine;
- relationships;
- Night/event authoring;
- endings;
- presentation/content;
- targeted QA.

## Undead Farm

Current role:

**DESIGN REFERENCE SLICE / PRODUCTION PACKAGE NEEDED**

The career design is strong for:

- School;
- items;
- Activity;
- production economy;
- unusual resources.

Missing work is primarily:

- production action;
- career state machine;
- resource/content authoring;
- relationships;
- item catalog;
- Activity bridge;
- endings;
- presentation/content;
- targeted QA.

---

# Required next-package principle

Starter careers must not be considered equivalent merely because all cost 1 Energy.

Each must preserve its distinct product role:

- Lumber = physical crew / Forest bridge;
- Satyr Maid = social service / Night / boundaries / house influence;
- Undead Farm = magical production / research / items / economy.

No production runtime/UI/content file was modified by Chat 4.
