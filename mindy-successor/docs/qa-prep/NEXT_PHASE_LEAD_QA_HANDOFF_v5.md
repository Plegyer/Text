# Next-Phase Lead QA Handoff v5

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Current merged technical floor: **221/221 PASS**

## TECHNICAL_GREEN

Current merged main has a stable technical foundation for the next production phase.

Green foundations include:

- typed target Save/state ownership;
- Resolver/reactive progression;
- schema4 compatibility on the exercised surface;
- first-class School lessons;
- NightFlow;
- generic item capabilities;
- Activity routes/options/reload;
- ending / RunResult / Meta exactly-once;
- semantic presentation IDs;
- GIF/static/text fallback;
- one-Save cross-system persistence;
- exact Lumber Hard Work contract.

Merged floor chronology:

```text
187 -> 194 -> 200 -> 208 -> 209 -> 218 -> 221
```

Do not reopen these contracts without a concrete failing requirement.

---

# FULL_SCOPE_PRESERVED

The successor project remains a full life-sim RPG, not a Lumber-only product.

Authoritative scope still preserves:

## Ordinary careers — 10

1. Lumber
2. Satyr Maid
3. Undead Farm
4. Tavern
5. Hunter
6. Guard
7. Geisha / Artist
8. Assassin
9. Merchant
10. Prostitute

## Hidden/meta careers

- Palace
- Secret Debt / Slave

## Major systems

- ordinary poverty / housing;
- School;
- typed relationships;
- Night;
- items/capabilities;
- expedition Activity;
- endings / Meta;
- GIF-first central presentation.

Full-scope audit:

`docs/qa-prep/FULL_PRODUCT_SCOPE_PRESERVATION_AUDIT_v1.md`

---

# PRODUCTION_PACKAGES_NEEDED

## Starter trio

### Lumber

Status:

**current production reference slice**

Already green for:

- repeatable shift;
- seasonal variants;
- career state;
- Foreman relationship;
- Night;
- Forest bridge;
- endings;
- save/reload;
- presentation.

Still incomplete against the full career draft:

- deeper state-machine/content depth;
- School management result;
- broader item/tool catalog;
- richer Forest content.

### Satyr Maid

Status:

**design-ready, production package missing**

Needs target package for:

- repeatable service shift;
- seasonal variants;
- typed career state machine;
- relationship/customer network;
- after-hours/Night content;
- School/economy hooks;
- item capabilities;
- endings;
- presentation;
- QA.

### Undead Farm

Status:

**design-ready, production package missing**

Needs target package for:

- repeatable production shift;
- seasonal resource variants;
- typed career machine;
- research/management/anomaly routes;
- relationships;
- School hooks;
- item/sample capabilities;
- Activity bridge;
- endings;
- presentation;
- QA.

Detailed comparison:

`STARTER_TRIO_READINESS_MATRIX_v1.md`

---

# Remaining seven ordinary careers

All seven have dedicated design drafts but no completed first-class target production package.

## Tavern

Needs:

- target typed career replacing legacy-only prototype assumptions;
- information/room/supply mechanics;
- relationships;
- School/item/Activity links;
- endings;
- presentation;
- save/reload.

## Hunter

Needs:

- ordinary shift package;
- seasonal contract pools;
- strong item/tool catalog;
- expedition integration;
- relationships;
- endings;
- presentation;
- QA.

## Guard

Needs:

- target patrol career;
- city-event/case content;
- evidence/items;
- poverty interaction;
- relationships;
- endings;
- presentation;
- QA.

Legacy `guard` action is not sufficient.

## Merchant

Needs:

- trade/economy career;
- supplier/client graph;
- item/economic opportunities;
- School/Activity/Guard links;
- endings;
- presentation;
- QA.

## Geisha / Artist

Needs:

- final fantasy framing/name;
- performance career;
- School-heavy progression;
- festivals;
- relationships;
- Palace hook;
- endings;
- presentation;
- QA.

## Assassin

Needs:

- contract career;
- preparation/method choices;
- item/access mechanics;
- Guard/Tavern/Merchant/Palace links;
- endings;
- presentation;
- QA.

## Prostitute

Needs:

- voluntary-career package;
- client/boundary progression;
- Night/relationship/economy hooks;
- clear mechanical separation from Secret Debt;
- endings;
- presentation;
- QA.

Detailed matrix:

`REMAINING_SEVEN_CAREERS_READINESS_MATRIX_v1.md`

---

# Poverty / Secret Debt package needed

Current Night/lodging infrastructure is not the full poverty system.

Future production package must preserve:

- zero-money anti-softlock;
- street sleep;
- ordinary poverty event pool;
- one-time lender encounter;
- accept/refuse persistence;
- delayed debt activation;
- ordinary-job blocking only after activation;
- hidden Slave career;
- forced Night obligation;
- Paid Freedom;
- Bound Life;
- Takeover;
- Palace exclusion of hidden career endings.

QA contract:

`POVERTY_SECRET_DEBT_QA_CONTRACT_MAP_v1.md`

Open balance values stay parameterized.

---

# Palace package needed

Locked:

- Palace unlock requires Hard Work on all 10 ordinary careers;
- hidden careers do not count.

Future package needs:

- Palace discovery/entry;
- repeatable work;
- typed career state;
- multiple outcomes;
- School/item/relationship/Activity hooks;
- presentation;
- save/reload;
- Meta interactions.

Do not let ordinary-career production reorder or weaken the 10/10 requirement.

---

# HUMAN_DECISIONS

## Current Lumber/Forest decisions

Still require Product input:

- Old Boundary Token acquisition source;
- retain/consume/turn-in policy;
- hunter-trail final unlock identity;
- full Forest route/challenge/season authoring.

## Current School decisions

Still require Product input:

- management/accounting provider;
- threshold/milestone type;
- public result identity;
- Arcana/Forest provider/threshold if retained.

## Future-career decisions

Each design draft contains open:

- exact thresholds;
- exact wages;
- exact stat packages;
- NPC identities;
- relationship details;
- item identities;
- ending rewards;
- specific content.

QA must not convert draft examples into final Product answers.

## Poverty decisions

Still open:

- exact debt amount;
- lender benefit;
- activation delay if revised;
- Night penalty;
- hidden career progression thresholds;
- ending rewards;
- School/Activity access while locked.

## Presentation/art

Current RC has zero blocking presentation assets.

Future package art choices remain production authoring, not runtime architecture decisions.

---

# CONTENT_DEPTH

## Full careers

A career is not “implemented” merely because:

- a legacy action exists;
- one repeatable shift exists;
- a draft exists;
- generic career runtime exists.

Target production depth expects:

- repeatable work;
- seasonal variation;
- typed career progression;
- cross-system hooks;
- meaningful choices/items;
- relationships where relevant;
- multiple outcome families;
- explicit ending commitment;
- presentation;
- save/reload.

## School

Eight-course runtime is green.

Full School content still requires selected:

- teachers/presentation;
- milestones;
- projects/exams/certificates where chosen;
- public cross-system results.

## Activity

Base Forest runtime is green.

Full product role still expects:

- deeper route topology;
- multiple challenge families;
- seasonal changes;
- item/equipment impact;
- NPC/quest content;
- broader city feedback.

## Poverty

Night/lodging is infrastructure.

Ordinary poverty needs its own content pool and recovery life.

Secret Debt is additional hidden content, not the poverty default.

---

# FUTURE_QA

## Every career package

Must add targeted tests for:

- shift transaction;
- season;
- career progression;
- Resolver;
- relationships;
- School/item/Activity/Night public boundaries;
- ending eligibility/commit/completion;
- save/reload;
- presentation/fallback.

## Full-scope omission protection

Maintain a durable sentinel so future coordination docs cannot silently drop:

- careers;
- Palace;
- poverty;
- Secret Debt;
- School;
- relationships;
- Night;
- items;
- Activity;
- endings/Meta;
- presentation.

## Poverty/Secret Debt

Use the dedicated future QA contract map.

## Presentation

Use:

`GIF_FIRST_FULL_GAME_QA_GUARDRAILS_v1.md`

for every new system.

Key no-regression rule:

mechanics never depend on GIF frame/time/completion.

## Regression floor

Retain current 221-floor tests before adding new product packages.

New production packages should only raise, never silently replace, the current minimum floor.

---

# Recommended next-phase QA operating model

For each future production package:

```text
authoritative design source
-> Product decisions identified
-> bounded production package
-> targeted QA
-> save/reload
-> presentation guardrails
-> full check
-> update scope/readiness matrix
```

Do not:

- use legacy actions as proof of target career completion;
- promote fixture IDs to Product canon;
- reuse Lumber thresholds globally;
- treat generic runtime support as authored content;
- narrow full-game scope because current RC is Lumber-focused.

---

# Current handoff disposition

## Technical foundation

**GREEN — 221/221**

## Full product scope

**PRESERVED**

## Immediate missing work

**PRODUCTION PACKAGES + AUTHORING**

## Current human decisions

**EXPLICITLY OPEN**

## Green runtime contracts

**DO NOT REOPEN WITHOUT EVIDENCE**

No production runtime/UI/content file was modified by Chat 4.
