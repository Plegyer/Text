# Chat 3 — Large Activity / Game-within-the-Game Full Scope v8

Status: **PRODUCT DECISION PACKET / RESEARCH ONLY / NO PRODUCTION CHANGES**  
Owner: Chat 3  
Branch: `chat3/large-activity-full-scope-v8`

## 0. Authority and boundaries

This packet closes the remaining Product gap around the Large Activity as a real second mode.

Locked inputs used:

- D4: 160 days, 4 years, 4 seasons x 10 days;
- D7: Activity umbrella = expedition/exploration/navigation + stat challenges + selected puzzle/tracking/investigation/tactical mechanics;
- D8: field camp is allowed for multi-day expeditions and is distinct from city Night;
- D16: ending eligibility is non-terminal until explicit commit;
- D26: ordinary same-career work is max one shift/day; Activity does not silently replace that rule;
- Secret Debt: Large Activity remains available while bound, but forced Night remains authoritative and ordinary careers stay locked;
- Palace: Activity must never substitute for D23 Palace qualification;
- current lifecycle contract: 2-Energy entry is the established Activity baseline; internal resources are distinct from daily Energy; save/resume must preserve deterministic state.

No production runtime/content changes are made here.

---

# 1. Decision summary

## Recommended 1.0 target: **4 regions**

The recommended full intended 1.0 structure is:

1. **R1 — Forest Frontier** — early;
2. **R2 — Trade Corridor** — early/mid;
3. **R3 — Anomalous Reach** — mid/late;
4. **R4 — Restricted Sites Network** — late.

This is an exact region-count recommendation, not final lore prose.

Why four:

- 3 regions are cheap enough, but force puzzle/anomaly content and infiltration/investigation content into the same late-game region;
- 5 regions create a materially larger content/media/test surface and increase the risk that Activity becomes a second grind competing with careers, School and Night inside a 160-day run;
- 4 regions give the umbrella three genuinely different specialized mini-game families while preserving enough production density per region.

Disposition requested from Product: approve / modify / reject the 4-region target.

---

# 2. 3-region vs 4-region vs 5-region

| Structure | Strength | Main weakness | Estimated regional content units | Minimum presentation slots | 160-day fit |
| --- | --- | --- | ---: | ---: | --- |
| 3 regions | cheapest complete structure | merged late region becomes mechanically overloaded | 54–66 | ~30 | strong |
| **4 regions** | best separation of tracking/logistics/puzzle/infiltration | medium production cost | **72–88** | **~38 total including shared shells** | **strong if visits are bounded** |
| 5 regions | maximum world breadth | high content/test cost; thin regions or grind risk | 90–110 | ~46 | weak-to-medium |

### Why not 3

A 3-region version can cover:
- forest;
- trade/transit;
- one merged late region.

But that last region would have to carry:
- Arcana/research puzzle content;
- Assassin infiltration;
- Guard investigation;
- evidence/extraction;
- Palace-adjacent optional hooks;
- some Secret Debt evidence hooks.

That is too many mechanically different jobs for one region identity.

### Why not 5

The fifth region does not solve an architectural requirement that four cannot already cover.

At 5 regions, either:
- each region becomes thinner;
- more repeat visits become necessary to justify the region count;
- or the game needs ~20–25 additional authored units plus more media/test combinations.

That competes directly with the 160-day life-sim.

---

# 3. What makes this a game inside the game?

The Large Activity feels like a second game mode only if **stateful decisions persist inside the Activity and change future options**.

The target bar is:

1. a navigable route graph rather than a flat list of events;
2. internal resources separate from daily Energy;
3. partial information / uncertainty that the player can reduce;
4. equipment/capabilities that change legal routes and extraction;
5. at least three specialized mechanic families under one umbrella;
6. success / escape / failure with materially different result payloads;
7. persistent discovery/route knowledge across repeated visits in the same life;
8. deterministic save/resume at internal checkpoints;
9. city preparation that changes the next expedition;
10. expedition results that change careers, relationships, School, items or endings.

The mode fails this bar if the dominant loop is:

`choose event -> stat check -> receive reward -> leave`.

The target loop is:

`prepare in city -> choose region/loadout -> navigate -> spend internal time/endurance -> resolve mechanic/encounter -> decide continue/detour/escape/camp -> secure or risk finds -> typed ActivityResult -> city systems react`.

That is the core Product distinction.

---

# 4. Recommended region structure

## R1 — Forest Frontier

Availability:
- early;
- available after arrival;
- richer branches unlock through Lumber, Hunter, School and item facts.

Function:
- outdoor route discovery;
- tracking;
- extraction;
- physical traversal;
- first proof that city preparation changes Activity.

Primary systems:
- Lumber;
- Hunter;
- Farm;
- School Field Craft / Arcana;
- guide/contact relationship.

Core route contexts:
- work/logging route;
- hunter/trail route;
- hidden/old-boundary route.

Specialized family emphasis:
- **Tracking Triangulation**.

Regional anchor:
- discover and resolve one persistent frontier problem/objective;
- final lore remains open.

Current `lumber.forest` is the starting vertical slice, not the finished region.

## R2 — Trade Corridor

Availability:
- early/mid;
- intended to come online from city contacts/contracts;
- a Year-2 safety-net path is acceptable so a fresh life cannot permanently miss the region.

Function:
- road/water/cargo routing;
- buyer/supplier objectives;
- escort/protection without requiring a universal combat system;
- witnesses, permits and trade evidence.

Primary systems:
- Merchant;
- Guard;
- Tavern;
- Hunter;
- supplier / caravan / escort relationships.

Mechanical emphasis:
- route planning;
- logistics constraints;
- negotiation/de-escalation;
- risk/reward extraction.

Regional anchor:
- establish or resolve a persistent trade/access route.

## R3 — Anomalous Reach

Availability:
- mid/late;
- requires discovered clue plus School/item preparation;
- should not be a pure calendar unlock.

Function:
- interpretation;
- research;
- unusual route topology;
- preserved samples;
- Magic/Reason-heavy challenge space.

Primary systems:
- School Arcana / Literacy;
- Farm;
- Lumber/Hunter follow-up;
- research/contact relationships.

Specialized family emphasis:
- **Pattern / Ritual Circuit**.

Regional anchor:
- resolve an anomaly/research objective through one of several build approaches.

This region exists so Magic/Reason/puzzle play is not reduced to a single Forest encounter.

## R4 — Restricted Sites Network

Availability:
- late;
- requires career/contact facts plus an access capability;
- no Palace qualification may be bypassed by this region.

Function:
- covert route planning;
- investigation;
- evidence handling;
- extraction;
- restricted social/legal access.

Primary systems:
- Assassin;
- Guard;
- Merchant;
- optional Palace hooks after Palace is already open;
- optional Secret Debt evidence hooks.

Specialized family emphasis:
- **Infiltration / Suspicion**.

Regional anchor:
- secure, expose or redirect a restricted objective/evidence chain.

This is a network of restricted sites, not automatically a single dungeon or Palace location.

---

# 5. 160-day pacing policy

The Activity must not become a second repetition ladder.

## No universal Activity XP

Do not add:
- `activityLevel`;
- `expeditionXP`;
- a 50-run Activity counter.

Progress comes from:
- discovered routes;
- regional anchor facts;
- tools/capabilities;
- city clues;
- contact state;
- completed specialized objectives.

## Visit budget target

Pacing acceptance for a clean reference path:

- no region requires more than **3 successful entries** to resolve its core regional anchor;
- a complex ordinary-career Activity leg should require no more than **3 Activity entries after city preparation is complete**;
- standalone Activity ending eligibility should be reachable with **10 or fewer Activity entries** in one life;
- reference eligibility should be possible by roughly **Day 120**, leaving calendar room for endings/relationships/careers.

Not every life is expected to clear all four regions.

A career-focused life may deeply use only one or two.

---

# 6. Entry Energy policy

Default Activity entry:

- **2 daily Energy**;
- charged once when a new ActivityEnvelope is created;
- resume/reload never charges it again;
- same-day re-entry after an explicit completed exit is a new entry and pays again.

After entry:
- daily Energy is not reused as internal stamina;
- Activity uses internal resources;
- a same-day exit returns to the city with only the daily Energy that was not already spent.

A multi-day continuation does not charge a second 2-Energy entry fee.

---

# 7. Internal resource model

Use two universal resources plus capability-specific consumables.

## A. Field Time

- **6 time segments per field day**;
- movement, major challenges and detours consume segments;
- reaching zero forces return/camp/escape decision.

Purpose:
- makes route topology matter;
- stops unlimited option clicking.

## B. Endurance

- adapter-defined starting range **6–8**, preserving current Forest/Hunter/Assassin slice scale;
- hazards/challenges cost 0–2;
- reaching the failure threshold invokes typed failure policy.

Stats/items should primarily:
- reduce cost;
- reveal safer options;
- change route;
- improve result quality.

They should not turn Endurance into a second daily Energy alias.

## C. Supplies / charges

Not a universal third bar.

Use when relevant:
- preservation charges;
- rope/tool durability;
- ritual components;
- camp supply;
- disguise/evidence consumables.

---

# 8. Exploration / navigation layer

Each region needs an actual route graph.

Minimum per region:

- 3 route contexts;
- at least one shortcut;
- at least one route that requires a capability/fact;
- at least one season-dependent edge;
- at least one route choice where known information changes the player's risk estimate.

Player-facing route state should distinguish:
- unknown;
- discovered;
- known-safe / known-risky;
- temporarily blocked;
- capability-gated.

Discovery persists for the current life.

The player should not need a literal graphical map in first implementation; the state model is the requirement.

---

# 9. Challenge / stat / equipment layer

Major encounters should normally offer 2–4 approaches.

Examples:
- Strength / Endurance for force or survival;
- Dexterity for precision/stealth;
- Reason / Wits for analysis and improvisation;
- Magic for anomalous interaction;
- Charm / Manners for social/status access;
- Sexuality/Lust only in contextually appropriate adult/social encounters.

Equipment should change the option set.

Preferred pattern:
`rope capability -> new route`

Not:
`rope -> +2% success`.

At least **2 meaningful capability hooks per region** should exist in production.

---

# 10. Three specialized mini-game families

These are not separate games with unrelated infrastructure. They share the Activity envelope.

## Family A — Tracking Triangulation

Used strongly in R1 and sometimes R2.

Loop:
- inspect signs;
- decide which clues are reliable;
- choose next route/target;
- spend Time to reduce uncertainty or move immediately.

Build hooks:
- Wits;
- Reason;
- Dexterity;
- Hunter/guide facts;
- Field Craft;
- navigation items.

Failure mode:
- lose Time / follow wrong branch / degrade extraction opportunity.

No twitch requirement.

## Family B — Pattern / Ritual Circuit

Used strongly in R3.

Loop:
- inspect state;
- manipulate 2–4 linked elements;
- infer sequence/pattern;
- choose whether to spend consumable or attempt a stat-backed shortcut.

Build hooks:
- Reason;
- Magic;
- Wits;
- Arcana/Literacy;
- sample/container capabilities.

Failure mode:
- consume Time/Endurance/component;
- alter the later encounter state rather than simply say “failed check”.

## Family C — Infiltration / Suspicion

Used strongly in R4 and selected R2 contracts.

Internal state:
- access route;
- suspicion / exposure pressure;
- evidence/objective state;
- fallback exit route.

Build hooks:
- Dexterity;
- Wits;
- Charm;
- Manners;
- sealed pass / disguise / concealed tools;
- Guard/Assassin/Merchant contacts.

Failure mode:
- suspicion reaches threshold;
- forced exit or altered evidence outcome.

This is not a universal combat system.

---

# 11. Save / resume / deterministic reload

Stable checkpoints:

- after region entry/loadout;
- after route choice;
- immediately before a specialized encounter;
- immediately after an encounter result;
- before camp decision;
- after camp calendar advance;
- before regional anchor resolution.

Reload invariants:

- Time/Endurance identical;
- route identical;
- discovered points identical;
- consumed charges identical;
- secured/unsecured finds identical;
- specialized mini-game state identical;
- RNG stream/checkpoint identical;
- no reroll by reload;
- no duplicate reward/effect publication.

Adapter version is saved in ActivityEnvelope.

Incompatible versions must fail safely or use an explicit migration.

---

# 12. Success / escape / failure

## Success

- applies objective result;
- publishes typed world/career/relationship/School facts;
- secured and normally carried finds return;
- may unlock a regional anchor.

## Escape

Intentional player command.

- preserves discovered route knowledge;
- preserves secured items;
- loses or downgrades unsecured finds according to region policy;
- does not publish the main objective success fact.

## Failure

- forced exit;
- no arbitrary game over;
- consumed resources remain consumed;
- unsecured finds may be lost;
- may apply one bounded next-day/route consequence;
- may close a seasonal window or change a future encounter.

Failure should create a different next decision, not just a red message.

---

# 13. Seasonal differences

Every region must have at least:

- one seasonal route/topology change;
- one seasonal encounter-pool change.

Examples by function:

R1:
- flooded/muddy spring routes;
- long summer access;
- autumn tracking abundance;
- winter frozen shortcut / endurance hazard.

R2:
- spring road conditions;
- summer traffic/trade density;
- autumn cargo/contract shifts;
- winter access/logistics hazards.

R3:
- seasonal anomaly pattern;
- resource/sample availability;
- route opening/closure.

R4:
- access timing;
- staffing/guard/public-event context;
- evidence windows.

Do not duplicate the entire region four times.

---

# 14. City preparation -> Activity

City actions must change expedition choices.

Minimum prep families:

- Merchant: tools, containers, buyers, access;
- School: Field Craft, Arcana, Literacy, Rhetoric/Etiquette facts;
- Tavern: rumours, target/contact information;
- ordinary careers: professional route facts;
- relationships: guide/contact/permit/request;
- items: capability-based loadout.

A normal room/private-space scene may help planning where authored, but housing must not become a universal Activity gate.

---

# 15. Activity result -> careers / relationships / School

Required outward publishers:

- career fact/counter;
- relationship request/companion/contact fact;
- School sample/research/project fact;
- item/trade good/evidence;
- world route knowledge.

Examples:

- Lumber Forest receives a frontier truth/result;
- Hunter receives track/sample/return facts;
- Merchant receives buyer/supplier/find value;
- Guard receives witness/evidence;
- Assassin receives access/evidence/extraction result;
- School receives preserved sample or anomaly record.

External continuation must be resolver-driven and should not require an extra profession shift solely to notice the result.

---

# 16. Item / capability hooks

Minimum full-scope capability coverage should reuse current patterns:

- `cross_rough_route`;
- `preserve_specimen`;
- `enter_old_boundary`;
- `merchant_appraisal`;
- official/sealed access;
- concealed entry;
- context disguise;
- spirit/sample containment.

Guidelines:

- condition on capabilities where possible, not a single item ID;
- at least 2 meaningful capability hooks per region;
- at least one capability must work in more than one region;
- extraction tools should change what survives exit, not merely reward percentage.

---

# 17. Relationship companion / contact hooks

Every region:
- at least one meaningful contact hook.

At least two regions:
- support an optional companion/contact presence during Activity.

Companion/contact effects may:
- reveal a route;
- reduce uncertainty;
- alter specialized mechanic information;
- enable an extraction;
- add a camp scene;
- publish a relationship fact.

Do not build a universal combat party.

Relationship participation:
- may deepen routes/endings;
- must not be required for ordinary Hard Work;
- should not be a generic affinity bonus.

---

# 18. Camp policy

Camp exists only for explicitly multi-day Activity objectives.

Full-scope target:

- maximum **2 field camp nights** per single Activity entry;
- camp replaces city Night for that calendar day;
- city lodging is not paid for a camp night;
- ordinary voluntary city Night menu does not run;
- camp may have its own contact/relationship events;
- each camp advances global calendar exactly once;
- next field day refreshes Field Time, not global city Energy;
- after a multi-day return, the Activity day is considered consumed; do not grant a second full city workday.

Single-day regional runs need no camp.

This keeps camp meaningful without making a second survival game.

---

# 19. Secret Debt compatibility

Locked D19 remains stronger than Activity convenience.

While bound:

- Activity remains enterable;
- ordinary careers remain locked;
- Activity repeatable direct money must not become an easy 20000 repayment farm;
- forced Secret Debt Night remains every night;
- field camp **cannot suppress or replace** the forced Secret Debt Night;
- therefore a bound Activity may complete/escape before Night, but cannot continue through a camp boundary past the forced Night intercept;
- Activity cannot remove next-day Secret Debt Energy -1.

Secret Debt evidence may appear in R4, but:
- it does not auto-repay;
- it does not unlock ordinary careers;
- it does not change lender timing/chance.

---

# 20. Palace compatibility

Activity never substitutes for D23.

No Activity:
- grants Palace invitation;
- counts as one of ordinary 10/10;
- substitutes for active 10/10 packages;
- counts as Palace duty;
- bypasses the 12-stat True requirement.

After Palace access exists:
- R4 may host optional Palace-related contracts/evidence;
- Activity results may modify optional Palace authored routes;
- Palace Night remains subordinate to forced Secret Debt Night.

Activity ending eligibility remains separate from Palace endings.

---

# 21. Standalone Activity ending family

1.0 requires at least one ending family whose primary progression is Activity, not an ordinary career.

Working functional family: **Expedition Network / Pathfinder**.

No final lore name is locked.

Eligibility baseline:

- resolve regional anchors in at least **3 of 4 regions**;
- complete specialized mechanics from at least **2 different mini-game families**;
- secure at least one meaningful extracted capability/evidence/sample result;
- resolve at least one Activity contact/companion thread;
- no ordinary Hard Work requirement;
- no Palace requirement.

The family should support at least three mechanically different outcome directions, for example:

- discovery/mapping emphasis;
- preservation/research emphasis;
- trade/network/access emphasis.

Ending eligibility is non-terminal under D16.

---

# 22. Contribution to complex ordinary-career endings

Activity may be required for selected complex outcomes.

Recommended strong hooks:

- Lumber Forest outcome: R1/R3;
- Hunter Legend/Warden: R1 plus optional R3;
- Assassin Ghost/Turncoat/advanced contract: R4;
- Guard Major Case/network route: R2/R4;
- Merchant rare-network/logistics outcome: R2 plus optional R1/R4.

But:

- ordinary Hard Work remains independent;
- not every advanced career ending must require Activity;
- no career should need repeated Activity grind just to remain economically viable;
- once city preparation is complete, a career-specific Activity leg should fit in <=3 entries.

---

# 23. Production content budget per region

Target **18–22 authored content units per region**, not counting lightweight text variants.

Minimum region package:

- 3 route contexts;
- 6 repeatable/season-aware route or hazard encounters;
- 4 authored anchor/milestone encounters;
- 2 specialized mini-game scenarios;
- 1 contact chain with ~3 meaningful beats;
- 2+ meaningful capability hooks;
- 3+ outward result publishers;
- success / escape / failure treatment;
- seasonal topology/pool variants.

Four regions therefore target roughly **72–88 regional content units**, plus shared shells/tutorial/results.

This is large enough to feel systemic without requiring five-region breadth.

---

# 24. Minimum presentation / media budget

Media slot != unique commissioned art.

Minimum stable presentation budget:

Per region:
- 1 region overview;
- 3 route-context presentations;
- 2 specialized-mechanic state presentations;
- 1 contact/camp presentation;
- 1 outcome/result presentation.

= **8 stable presentation IDs per region**.

Four regions:
- **32 regional IDs**.

Shared:
- 3 specialized mini-game UI/presentation shells;
- 3 generic success/escape/failure shells.

Minimum full target:
- **~38 stable presentation IDs**.

Minimum unique environmental media target:
- 1 reusable environment base per region = **4**;
- seasonal differences may use overlays/variants/reused composition rather than 16 unique commissioned backgrounds.

Character/contact media is budgeted separately and may reuse existing career/relationship portraits.

---

# 25. Audit of current executable activities

## `lumber.forest`

Classification: **VERTICAL SLICE**.

Evidence:

- entry Energy 2;
- resume allowed;
- same-day lifecycle;
- 3 routes;
- 15 options;
- 5 categories:
  - route;
  - navigation;
  - physical obstacle;
  - extraction;
  - interpretation/ritual;
- calendar-season conditions are already present;
- heavy item-capability use;
- stat checks;
- School/world/career hooks;
- success / escape / failure publish different facts/results.

Why not production-ready:

- still uses generic `counter.v1`;
- no Field Time layer;
- no specialized tracking/puzzle state;
- no region progression shell;
- no camp/multi-day path;
- only one regional objective.

This is the best existing proof of Product direction.

## `hunter.expedition`

Classification: **VERTICAL SLICE**.

Evidence:

- entry Energy 2;
- career-stage + qualification gate;
- 3 routes;
- 10 options;
- tracking/study/route-support/extraction/interpretation categories;
- School facts and item capabilities;
- successful expedition counter and return fact.

Missing depth:

- no executable seasonal conditions in the current activity options;
- escape/failure result payloads are empty;
- tracking remains a choice category, not a specialized internal-state mechanic;
- no companion/camp;
- generic counter adapter.

It proves Hunter integration, not final expedition depth.

## `assassin.infiltration`

Classification: **INFRASTRUCTURE ONLY**.

Evidence:

- entry Energy 2;
- save/resume lifecycle;
- 4 access routes;
- capability-gated concealed/sealed/disguise entries;
- evidence option.

Why this remains infrastructure:

- no stat conditions;
- no seasonal conditions;
- no School conditions;
- no relationship conditions;
- no suspicion/exposure state;
- success is generic progress threshold;
- escape/failure effects are empty;
- no investigation/evidence branching after extraction.

It proves routing/capability plumbing but not the intended infiltration mini-game.

## Production-ready

**None of the three is production-ready at the full 1.0 bar.**

That is expected: infrastructure existence is not full-scope completion.

---

# 26. Acceptance tests for the recommended target

## Static / schema

1. exactly 4 production regions;
2. each region has at least 3 route contexts;
3. each region has at least 2 meaningful capability hooks;
4. entry Energy default remains 2 unless an explicit region exception is approved;
5. internal Time/Endurance are not aliases of daily Energy;
6. no universal combat dependency;
7. no region condition substitutes for D23 Palace qualification.

## Lifecycle

8. entering charges Energy exactly once;
9. save/reload never recharges entry;
10. save/reload preserves route/resource/specialized state/RNG;
11. consumed items do not reappear on reload;
12. success effects publish exactly once;
13. escape and failure do not accidentally publish success;
14. same-day Activity does not advance calendar unless policy says so;
15. each camp advances calendar exactly once;
16. max two camp nights per entry is enforced;
17. camp never also charges city lodging.

## Secret Debt

18. bound player can enter valid same-day Activity;
19. forced Secret Debt Night prevents camp continuation across that Night;
20. Activity does not unlock ordinary careers while bound;
21. Activity direct repeatable cash cannot trivially farm 20000 debt.

## Palace

22. Activity cannot generate Palace invitation;
23. Activity cannot satisfy permanent/active 10/10;
24. Activity cannot count as Palace duty;
25. Palace Activity hooks require Palace already open.

## Pacing

26. no region requires >3 successful entries for its anchor in the reference path;
27. standalone Activity ending reference path uses <=10 entries;
28. reference standalone eligibility can occur by ~Day120;
29. complex ordinary-career Activity legs can be completed in <=3 entries after prep;
30. Hard Work endings remain reachable without Activity.

## Content bar

31. all 4 seasons change at least one route or encounter pool in every region;
32. at least 3 specialized mechanic families are present across the umbrella;
33. at least 2 regions have optional companion/contact Activity presence;
34. Activity results publish to at least career + relationship + School/item systems across full scope;
35. at least one standalone Activity ending family exists.

---

# 27. Milestone plan

## M0 — Product lock

Approve:
- 4 regions;
- region functions;
- internal resource semantics;
- three mini-game families;
- camp rules;
- pacing limits.

No runtime work before this lock is needed.

## M1 — Activity envelope v2

Add only missing shared mechanics:
- Field Time;
- route graph state;
- specialized adapter state;
- deterministic checkpoints.

Focused lifecycle tests first.

## M2 — R1 productionization

Promote `lumber.forest` from vertical slice to first production region:

- preserve its 3 route identity;
- add Time;
- promote tracking state;
- complete seasonal/result/relationship loop.

## M3 — R2 Trade Corridor vertical slice

Prove:
- Merchant/Guard prep;
- logistics/negotiation;
- one contact;
- one seasonal route change.

## M4 — R3 Anomalous Reach vertical slice

Prove:
- Pattern/Ritual Circuit;
- Arcana/Farm/sample hooks;
- deterministic puzzle reload.

## M5 — R4 Restricted Sites vertical slice

Replace Assassin counter-only prep with:
- suspicion/exposure state;
- evidence objective;
- Guard/Merchant alternate routes.

## M6 — Cross-system integration

Add:
- standalone Activity ending family;
- career result publishers;
- relationship companions/contacts;
- School/result hooks;
- Secret Debt/Palace regression coverage.

## M7 — 1.0 content fill

Fill per-region content/media budgets without adding a fifth region unless Product explicitly reopens scope.

---

# 28. Final Product recommendation

Adopt **4 regions** for intended 1.0.

The Large Activity should be treated as one coherent expedition/infiltration umbrella with:

- route graph;
- Field Time + Endurance;
- capabilities/loadout;
- Tracking Triangulation;
- Pattern/Ritual Circuit;
- Infiltration/Suspicion;
- deterministic save/resume;
- selected multi-day camp;
- strong city feedback;
- one standalone ending family.

Do **not** add a universal combat system just to make the mode feel game-like.

The game-within-the-game feeling should come from:
- persistent internal state;
- uncertainty;
- route planning;
- resource pressure;
- specialized mechanics;
- equipment capability;
- consequential extraction/results.

No production changes were made by this packet.

Disposition: **READY_FOR_LEADER_PRODUCT_DECISION**.
