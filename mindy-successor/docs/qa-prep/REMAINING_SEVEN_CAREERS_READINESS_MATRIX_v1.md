# Remaining Seven Careers Readiness Matrix v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Baseline: current main after PR27

## Scope

Audit the seven ordinary careers outside the starter trio:

1. Tavern
2. Hunter
3. Guard
4. Merchant
5. Geisha / Artist
6. Assassin
7. Prostitute

against authoritative design and current production readiness.

No percentage scores are used.

---

# Classification vocabulary

- **LOCKED/STRUCTURED** — career role and baseline structure are established by current authority.
- **DESIGN_DEEP** — a dedicated career draft defines state machine, cross-system hooks and ending families.
- **LEGACY_ONLY** — old prototype action/content exists but does not satisfy the target career architecture.
- **PRODUCTION_PACKAGE_MISSING** — no merged first-class target career package exists.
- **AUTHORING_OPEN** — exact values/IDs/content remain intentionally undecided.
- **SHARED_RUNTIME_READY** — existing generic systems can support the career without reopening green architecture.

---

# Matrix

| Career | Locked structure | Draft depth | Current production | Main missing package | Key dependencies | Presentation readiness |
|---|---|---|---|---|---|---|
| Tavern | **LOCKED/STRUCTURED** | **DESIGN_DEEP** | **LEGACY_ONLY** | target shift + career machine + relationships + endings | housing, rumours, Merchant, Hunter, Guard, Activity | shared runtime ready; career slots/assets missing |
| Hunter | **LOCKED/STRUCTURED** | **DESIGN_DEEP** | **NONE TARGET** | full career package | Activity, items, seasons, Farm, Lumber, Merchant | shared runtime ready |
| Guard | **LOCKED/STRUCTURED** | **DESIGN_DEEP** | **LEGACY ACTION ONLY** | full typed career package | poverty, city events, Tavern, Merchant, Assassin, Palace | shared runtime ready |
| Merchant | **LOCKED/STRUCTURED** | **DESIGN_DEEP** | **NONE TARGET** | full career/economy package | items, producers, seasons, Activity, Guard | shared runtime ready |
| Geisha / Artist | **LOCKED/STRUCTURED** | **DESIGN_DEEP** | **NONE TARGET** | full career/performance package | School, festivals, relationships, Palace | shared runtime ready |
| Assassin | **LOCKED/STRUCTURED** | **DESIGN_DEEP** | **NONE TARGET** | full contract career package | items, Activity, Guard, Tavern, Merchant, Palace | shared runtime ready |
| Prostitute | **LOCKED/STRUCTURED** | **DESIGN_DEEP** | **NONE TARGET** | full voluntary career package | Night, relationships, poverty, housing, School, Secret Debt contrast | shared runtime ready |

---

# Tavern

## Locked structure

Tavern is intentionally separate from Satyr Maid.

System identity:

- travellers;
- rooms/lodging;
- supplies;
- rumours/information;
- hospitality;
- cross-career contact hub.

The design specifically rejects merging it with Satyr Maid.

## Existing draft depth

`CAREER_TAVERN_DRAFT_v0.md` defines:

- 1-Energy repeatable shift;
- seasonal visitor/supply pools;
- career state machine;
- Hard Work;
- Innkeeper;
- Information Broker;
- Sanctuary;
- housing/poverty hooks;
- School;
- items;
- Activity;
- relationships;
- cross-job information flow.

Classification:

**DESIGN_DEEP**

## Current production

Current `definitions.json` contains legacy prototype content:

- action `tavern`;
- action `tavern-talk`;
- endings such as `tavern-stay`, `tavern-guild`, `tavern-court`.

These are historical prototype-style actions/endings.

There is no first-class target Tavern career state machine equivalent to current target Lumber.

Classification:

**LEGACY_ONLY / NOT TARGET PRODUCTION**

## Missing implementation package

Need future package for:

- target repeatable shift ID;
- typed career state machine;
- target relationship(s);
- room/information career facts;
- School hooks;
- item capabilities;
- endings;
- semantic presentation slots;
- save/reload tests.

---

# Hunter

## Locked structure

Hunter is an ordinary career distinct from Lumber and Assassin.

Core identity:

- seasonal contracts;
- tracking;
- preparation;
- tools;
- rare targets;
- strong Activity integration.

## Existing draft depth

`CAREER_HUNTER_DRAFT_v0.md` defines:

- ordinary 1-Energy shifts;
- separate 2-Energy expedition layer;
- seasonal target pools/routes;
- state machine;
- Hard Work;
- Master Hunter;
- Warden;
- Legend;
- strong item/capability use;
- Farm/Lumber/Merchant links;
- School/relationship hooks.

Classification:

**DESIGN_DEEP**

## Current production

No target Hunter action/career/relationship/ending package was found in current production definitions.

Classification:

**PRODUCTION_PACKAGE_MISSING**

## Key dependencies

Especially dependent on:

- full Activity expansion;
- item/tool catalog;
- seasonal route logic;
- Farm/Lumber cross-results;
- Merchant supply/economy.

Shared runtime is already suitable for much of this.

---

# Guard

## Locked structure

Guard is the public/institutional city-order career.

Core identity:

- patrol;
- city incidents;
- authority;
- investigations;
- public-order choices;
- poverty interactions;
- network/corruption alternatives.

## Existing draft depth

`CAREER_GUARD_DRAFT_v0.md` defines:

- 1-Energy patrol shifts;
- season-dependent incident pools;
- career stages;
- Hard Work;
- Officer;
- Reform;
- Network/Corruption;
- Major Case;
- poverty hooks;
- evidence items;
- School;
- relationships;
- Tavern/Merchant/Assassin/Palace links.

Classification:

**DESIGN_DEEP**

## Current production

Current definitions contain a legacy action:

`guard`.

No first-class typed target Guard career machine/relationship/ending package exists.

Classification:

**LEGACY ACTION ONLY / NOT TARGET PRODUCTION**

## Missing package

Need:

- target patrol action;
- career machine;
- incident/case content;
- evidence facts/items;
- School/relationship routes;
- endings;
- presentation;
- save/reload suite.

---

# Merchant

## Locked structure

Merchant is the economy/item-network ordinary career.

It must be more than a shop UI.

Core identity:

- appraisal;
- buying/selling;
- supply;
- demand;
- routes;
- risk;
- seasonal scarcity;
- supplier/client network.

## Existing draft depth

`CAREER_MERCHANT_DRAFT_v0.md` defines:

- repeatable work;
- seasonal economy;
- Merchant House;
- Speculator/Smuggler;
- Patron of Routes;
- poverty/credit interaction;
- strong item system;
- School;
- Activity;
- relationships;
- broad producer-job links.

Classification:

**DESIGN_DEEP**

## Current production

No target Merchant career package is present in production definitions.

Classification:

**PRODUCTION_PACKAGE_MISSING**

## Dependencies

Needs explicit authoring for:

- economic opportunities;
- supplier graph;
- price/contract model;
- items;
- legal/covert routes;
- cross-job facts.

Shared transaction/item/state infrastructure is largely reusable.

---

# Geisha / Artist

## Locked structure

This ordinary career is the art/status/etiquette path.

Final fantasy naming remains open, but the systemic role is distinct.

It must not collapse into Prostitute.

## Existing draft depth

`CAREER_GEISHA_ARTIST_DRAFT_v0.md` defines:

- 1-Energy performance/service work;
- School-heavy progression;
- seasonal festivals;
- Master Artist;
- Patron Network;
- Court Invitation;
- Night competition with study/social opportunities;
- costume/instrument/access items;
- Palace hook that does not bypass 10/10 Hard Work.

Classification:

**DESIGN_DEEP**

## Current production

No target Artist/Geisha career package exists.

Classification:

**PRODUCTION_PACKAGE_MISSING**

## Authoring still open

- final career name/framing;
- exact art disciplines;
- contest mechanics;
- NPCs;
- exact School prerequisites;
- endings/meta rewards.

These are Product/content choices, not QA assumptions.

---

# Assassin

## Locked structure

Assassin is a choice/preparation-heavy covert career, distinct from Hunter and Guard.

Core identity:

- contracts;
- reconnaissance;
- method choice;
- items/access;
- refusal/turncoat routes;
- consequences across Guard/Palace/relationships.

## Existing draft depth

`CAREER_ASSASSIN_DRAFT_v0.md` defines:

- ordinary 1-Energy covert work;
- major contract structure;
- seasonal route changes;
- Hard Work;
- Ghost;
- Handler Takeover;
- Refusal/Turncoat;
- items;
- Activity/infiltration;
- Guard/Tavern/Merchant/Palace links;
- relationships.

Classification:

**DESIGN_DEEP**

## Current production

No target Assassin career package exists.

Classification:

**PRODUCTION_PACKAGE_MISSING**

## Authoring still open

- lethal/nonlethal scope;
- combat presence;
- target content;
- contract network;
- fallout model;
- exact rewards.

Do not implement a morality meter unless separately approved; the draft explicitly avoids requiring one.

---

# Prostitute

## Locked structure

This is a voluntary ordinary career.

It is explicitly distinct from Secret Debt / Slave.

Core identity:

- professional agency;
- client network;
- boundaries;
- reputation;
- optional Night crossover;
- independent business/status routes.

## Existing draft depth

`CAREER_PROSTITUTE_DRAFT_v0.md` defines:

- 1-Energy ordinary work;
- seasonal client pools;
- Known Professional / Established progression;
- Hard Work;
- Independent House;
- Elite Clientele;
- Network/Protection;
- relationships;
- Night;
- items;
- School;
- poverty;
- cross-job hooks.

Classification:

**DESIGN_DEEP**

## Current production

No target Prostitute career package exists.

Classification:

**PRODUCTION_PACKAGE_MISSING**

## Secret Debt separation

Future QA must ensure this ordinary career preserves:

- voluntary entry;
- ability to leave;
- normal career availability;
- player control of work/clients.

Secret Debt is separate and may:

- block ordinary careers;
- force Night obligations;
- create debt-specific outcomes.

The two systems must never be merged for implementation convenience.

---

# Cross-system readiness

## Shared runtime already available

Future career packages can reuse:

- typed career state machines;
- typed relationships;
- Resolver;
- School progression;
- NightFlow;
- items/capabilities;
- Activity envelope/options;
- ending/Meta transaction;
- semantic presentation;
- schema4 save/reload.

This does not mean content is implemented.

## Common missing package structure

Each future career needs at minimum:

1. target repeatable action;
2. typed career definition;
3. seasonal variants;
4. milestone/event pack;
5. career-specific public facts/choices;
6. relationship package where applicable;
7. School/item/Activity/Night boundaries;
8. endings;
9. presentation slots/assets/fallbacks;
10. save/reload + exactly-once tests;
11. full-check evidence.

---

# Priority-neutral production conclusion

All seven careers remain preserved in design authority.

None is currently production-complete under the target architecture.

Tavern and Guard have legacy prototype actions, but those must not be mistaken for completed target careers.

No ordering among the seven is selected by this QA document.

No production runtime/UI/content file was modified by Chat 4.
