# Chat 3 — Standalone Activity Ending Family v9

Status: **PRODUCT DECISION PACKET / RESEARCH ONLY / NO PRODUCTION CHANGES**  
Owner: Chat 3  
Branch: `chat3/activity-ending-family-v9`  
D36 authority: `main@9e92ffbd0b7b68c0cf333d36dac19551e10465f5`

## 0. Decision target

D36 already locks the standalone Activity ending baseline.

This packet resolves the remaining Product questions:

- three distinct directions under one Activity ending family;
- exact direction-specific eligibility on top of the locked common baseline;
- current-life resolution;
- permanent New Start+ reward;
- reward class under D27/D28;
- Secret Debt and Palace boundaries;
- implementation shape for ending IDs and Meta ownership.

No runtime/content implementation is authorized by this packet.

---

# 1. Locked common eligibility baseline

Every standalone Activity ending direction uses the same D36 base.

The run must have:

1. resolved regional anchors in at least **3 of 4** D36 regions;
2. completed specialized mechanics from at least **2 different mini-game families**;
3. secured at least **1 meaningful extracted capability/evidence/sample result**;
4. resolved at least **1 Activity contact/companion thread**;
5. **no ordinary Hard Work requirement**;
6. **no Palace requirement**.

Eligibility is non-terminal under D16.

The final regional anchor, extracted result or contact resolution may make an ending eligible, but must **not** auto-commit it.

The player continues the life until explicitly committing an ending through the existing ending flow.

No direction below weakens this baseline.

No direction adds an undocumented hidden requirement.

---

# 2. Direction marker model

To keep the three outcomes mechanically distinct without adding a second grind, each resolved regional anchor may publish exactly **one direction-resolution fact** describing *how* that anchor was resolved.

Functional fact families:

- `activity.anchor.<region>.pathfinder`;
- `activity.anchor.<region>.preservation`;
- `activity.anchor.<region>.network`.

These are not extra visits.

They are outcomes of the regional anchor resolution itself.

Example:

`Forest Frontier anchor resolved`
may publish one of:
- Pathfinder emphasis — safe/known route state;
- Preservation emphasis — protected/research state;
- Network emphasis — contact/access/trade state;

where authored choices support that outcome.

Full production should ensure each of the three directions can be supported by at least **3 of the 4 regions**, so no single region becomes a hidden mandatory gate for the entire ending direction.

A single regional anchor publishes at most one direction marker.

Consequences:

- with exactly 3 resolved anchors, normally only one direction can reach the required two matching markers;
- with all 4 anchors resolved, two directions may become eligible at once through a 2+2 split;
- D16 then lets the player explicitly choose which ending to commit.

This prevents the common baseline from trivially unlocking all three endings at once.

---

# 3. Recommended ending-family implementation shape

Use **three separate ending IDs under one presentation family**.

Functional IDs:

- `ending.activity.pathfinder`;
- `ending.activity.preservation`;
- `ending.activity.network`.

Presentation may group all three under one user-facing Activity family.

## Why separate IDs

The current Meta model already records completion by ending ID.

Separate IDs give:

- one unambiguous eligibility rule per direction;
- one unambiguous committed ending;
- one permanent reward ownership source;
- straightforward Ending Atlas entries;
- no extra “completionVariant” persistence contract;
- no ambiguity if two directions are eligible simultaneously.

## Why not one ending ID with three variants

A single ID would require a second piece of permanent state to answer:

- which variant was committed;
- which reward was earned;
- whether another variant was completed in a later life;
- which Ending Atlas entry is complete.

That adds Meta complexity without Product benefit.

## Family completion behavior

One life commits at most the one ending already supported by the normal ending flow.

Across multiple lives the player may eventually permanently complete all three Activity ending IDs and own all three resulting Specialist options.

Ownership does **not** mean all three may be active together.

D28 remains binding:
- active Specialists per new life = **0..2**.

---

# 4. Direction A — Pathfinder / Mapping

Functional ending ID:

`ending.activity.pathfinder`

Identity:

**understand, connect and make routes reliably traversable**.

This is not “visit every node”.

It is the route-mastery / exploration identity.

## 4.1 How the player gets it

After the common D36 baseline is satisfied, require:

1. at least **2 resolved regional anchors in distinct regions** carrying the Pathfinder direction fact;
2. at least **1 successful Tracking Triangulation specialized encounter** in the current life.

Nothing else is mandatory.

The common extracted-result requirement may be:
- sample;
- evidence;
- capability-bearing find;
- route document;
- other meaningful extracted result.

The common contact/companion thread may be any valid Activity contact thread.

Optional accelerators:
- Hunter route knowledge;
- Field Craft;
- navigation capability;
- Rope Kit or analogous route equipment;
- relationship guide/contact;
- seasonal shortcut.

None is a universal ending gate.

### Exact eligibility shape

Conceptually:

`common_activity_baseline`
AND
`distinct_pathfinder_anchor_regions >= 2`
AND
`tracking_triangulation_successes >= 1`.

No requirement to resolve all four regions.

No requirement for ordinary Hard Work.

No Palace requirement.

## 4.2 Current-life resolution

The protagonist has turned fragmented regional knowledge into a reliable expedition map/access practice.

Mechanically the current life resolves:

- at least two regional anchor states through route/mastery choices;
- a meaningful cross-region exploration identity;
- at least one specialized tracking problem;
- the common extraction and contact obligations.

Final lore remains OPEN:

- exact organization/name of the mapped routes;
- who publicly receives or recognizes the map;
- whether the outcome is personal, civic, professional or semi-secret;
- exact epilogue prose.

The ending should not imply every unknown place in the world has been mapped.

## 4.3 Explicit commit boundary

Once eligible, the Ending flow exposes a functional action:

**Commit Pathfinder / Mapping outcome**.

Commit:
- is explicit;
- is not triggered automatically by the second Pathfinder anchor;
- follows normal D16 ending behavior.

---

# 5. Pathfinder permanent reward

Functional reward name:

**Surveyor's Atlas**

Functional reward ID:

`specialist.activity.surveyors-atlas`

Class:

**Specialist**.

Activation:

- permanently earned by committing `ending.activity.pathfinder`;
- selectable on later New Start+ lives;
- not automatically active;
- consumes **1 of the normal 2 Specialist slots** under D28.

## 5.1 Exact mechanical effect

When active:

For each of the four D36 regions, **once per region per run**:

- the first authored `route survey` / `route discovery` action that normally costs exactly **1 Field Time** may cost **0 Field Time** instead;
- that survey reveals the authored immediate downstream route cost/risk preview that the normal survey would reveal.

Maximum direct resource value:
- **4 Field Time saved per run**;
- at most one saved segment in each region.

It does **not**:

- change Field Time from the D36 baseline of 6 globally;
- reduce the 2 daily Energy entry cost;
- auto-resolve an encounter;
- reveal hidden lore/encounter outcomes that the survey does not normally reveal;
- bypass capability-gated routes;
- bypass seasonal closures;
- unlock a region early;
- resolve a regional anchor;
- count toward ending eligibility by itself.

A region with no legal survey action gives no free substitute benefit.

## 5.2 Why Specialist

The effect is:

- directed entirely at Activity;
- capped to four regional uses;
- not daily/global;
- not a broad economy or Energy rule.

It is materially narrower than a D30/D32 Keystone.

Therefore D27 classifies it naturally as a Specialist.

---

# 6. Direction B — Preservation / Research

Functional ending ID:

`ending.activity.preservation`

Identity:

**secure, understand and preserve meaningful finds/anomalies/evidence instead of treating Activity as extraction-only profit**.

This is the strongest research/sample identity.

It does not require the player to become a School ending character.

## 6.1 How the player gets it

After the common D36 baseline is satisfied, require:

1. at least **2 resolved regional anchors in distinct regions** carrying the Preservation direction fact;
2. at least **1 successful Pattern / Ritual Circuit specialized encounter**;
3. the common required extracted result must be an authored **research-grade secured result**.

A research-grade secured result may functionally be:

- preserved sample;
- contained anomaly;
- protected evidence;
- field record;
- equivalent authored Activity result tagged for research/preservation.

Exact item/lore names remain content-owned.

The requirement is exactly **1** such result.

Do not require:
- a specific School course;
- a School ending;
- a specific ordinary career;
- all four regions.

School Arcana/Literacy, Farm containers, preservation equipment and research contacts remain alternate preparation paths, not hidden gates.

### Exact eligibility shape

Conceptually:

`common_activity_baseline`
AND
`distinct_preservation_anchor_regions >= 2`
AND
`pattern_ritual_successes >= 1`
AND
`research_grade_extracted_results >= 1`.

The research-grade result satisfies the common “meaningful extracted result” requirement; it is not an additional second extraction quota.

## 6.2 Current-life resolution

The protagonist has established a repeatable way to bring dangerous/fragile/important field knowledge back without reducing it to generic loot.

Mechanically the life resolves:

- two regional anchors through preservation/research outcomes;
- at least one Pattern/Ritual Circuit;
- one research-grade extracted result;
- the common Activity contact thread.

Final lore remains OPEN:

- exact research institution/person;
- exact anomaly/sample identity;
- public vs private archive;
- scientific/magical vocabulary;
- final epilogue prose.

## 6.3 Explicit commit boundary

Once eligible:

**Commit Preservation / Research outcome** appears in the Ending flow.

No Pattern/Ritual success or extracted sample auto-commits the run.

---

# 7. Preservation permanent reward

Functional reward name:

**Field Archive Protocol**

Functional reward ID:

`specialist.activity.field-archive`

Class:

**Specialist**.

Activation:
- permanently earned on committed Preservation ending;
- selectable in later New Start+;
- consumes 1 normal Specialist slot;
- never automatically active.

## 7.1 Exact mechanical effect

When active:

For each D36 region, **once per region per run**, after the player has legally obtained an authored result tagged:

`activity-secure-eligible`

the player may mark **one carried result as Secured** at a stable Activity checkpoint.

A Secured result:

- survives a later **escape** from that Activity entry;
- survives a later **failure** from that Activity entry unless that specific authored result explicitly declares itself non-securable before the secure action;
- remains available for the normal typed ActivityResult on exit.

Maximum:
- **1 secured result per region per run**;
- **4 secured results per run**.

The Specialist does **not**:

- create or duplicate a result;
- waive the challenge required to obtain it;
- waive an item/capability gate;
- refund a preservation/containment consumable already spent to create it;
- turn an unsecured item into money;
- preserve ordinary inventory across lives;
- bypass a system-critical key/evidence gate unless that content is explicitly tagged `activity-secure-eligible`.

This opt-in tag is important for Secret Debt and Palace safety.

## 7.2 Why Specialist

The effect changes Activity risk/extraction behavior only.

It grants:
- no starting stat;
- no money;
- no daily Energy;
- no extra calendar days;
- no general inventory persistence.

It is therefore Specialist-scale.

---

# 8. Direction C — Network / Access

Functional ending ID:

`ending.activity.network`

Identity:

**turn isolated routes, contacts and restricted access opportunities into a durable expedition network**.

This is not Merchant House 2.

It is not a generic money/network ending.

Its core object is **Activity access choices**, not trade wealth.

## 8.1 How the player gets it

After the common D36 baseline is satisfied, require:

1. at least **2 resolved regional anchors in distinct regions** carrying the Network direction fact;
2. at least **1 successful Infiltration / Suspicion specialized encounter**;
3. the common Activity contact/companion requirement must resolve through an authored **network-capable contact outcome**.

A network-capable contact outcome means the resolved Activity contact publishes a fact equivalent to:

`activity.contact.networked`.

It may come from:
- guide;
- supplier;
- investigator;
- smuggler/legal access contact;
- caravan/contact chain;
- other authored Activity-facing relationship.

It does not need to be romance.

The contact requirement is still exactly one resolved contact thread; this specializes the common requirement rather than adding a second mandatory relationship.

The common extracted result may be any valid meaningful result.

### Exact eligibility shape

Conceptually:

`common_activity_baseline`
AND
`distinct_network_anchor_regions >= 2`
AND
`infiltration_suspicion_successes >= 1`
AND
`resolved_network_capable_contact_threads >= 1`.

No Merchant Hard Work.

No Assassin Hard Work.

No Guard Hard Work.

No Palace requirement.

## 8.2 Current-life resolution

The protagonist has transformed isolated expedition opportunities into a reusable web of people/access routes.

Mechanically the current life resolves:

- two anchor outcomes through access/network choices;
- at least one Infiltration/Suspicion mechanic;
- one network-capable Activity contact;
- the common extraction requirement.

Final lore remains OPEN:

- exact organization;
- legal vs informal presentation;
- public vs covert identity;
- exact relationship roles;
- epilogue prose.

The ending does not automatically imply criminality or commercial empire.

## 8.3 Explicit commit boundary

Once eligible:

**Commit Network / Access outcome** appears in the Ending flow.

The network contact itself does not auto-end the run.

---

# 9. Network permanent reward

Functional reward name:

**Expedition Contact Network**

Functional reward ID:

`specialist.activity.contact-network`

Class:

**Specialist**.

Activation:
- earned permanently by committed Network ending;
- selectable on New Start+;
- consumes one normal D28 Specialist slot;
- not automatic.

## 9.1 Exact mechanical effect

When active:

Each D36 region may expose exactly **one authored Meta network route option** tagged:

`activity-network-introduction`.

Rules:

- the region must already be **normally unlocked**;
- the option is not a substitute for region entry conditions;
- the option is a lateral route/contact path, not an automatic success;
- using the option consumes that region's **one Network Introduction for the run**;
- maximum **1 introduction per region per run**;
- maximum **4 introductions per run**.

The introduction route may:
- change route context;
- expose a different contact;
- change known risk/information;
- provide a legal/social/covert alternate approach authored for that region.

It may **not** generically satisfy or bypass:

- career stage;
- ordinary Hard Work;
- relationship stage;
- item capability;
- Palace qualification;
- Palace duty;
- Secret Debt exit/repayment;
- forced Night;
- ending eligibility;
- a region's initial unlock condition.

The route must be authored as a real alternative with its own risk/resource tradeoff.

It must not be a strictly superior “free success” path.

## 9.2 Why Specialist

The effect is:
- Activity-only;
- bounded to four introductions;
- access/options rather than global money;
- unable to bypass major progression domains.

It is too narrow for Keystone and exactly matches D27's directed access/Activity Specialist category.

---

# 10. Automatic knowledge vs selectable mechanical reward

Each committed ending naturally records its completion permanently through the normal Meta ending history.

Pure knowledge/content consequences may be automatic under D27, for example:

- Ending Atlas completion entry;
- known ending epilogue/codex;
- authored non-mechanical retrospective lore.

Those automatic knowledge records consume **no Specialist slot**.

The three mechanical rewards above are separate:

- Surveyor's Atlas;
- Field Archive Protocol;
- Expedition Contact Network.

They are selectable Specialists and are not automatically active.

This distinction avoids charging a Specialist slot merely to remember story knowledge.

---

# 11. D27 / D28 loadout behavior

If the player eventually owns all three Activity ending rewards:

New Start+ still permits:
- **0..2 active Specialists total**.

Examples:

- Pathfinder + Preservation;
- Pathfinder + Network;
- Preservation + Network;
- one Activity Specialist + Palace cap-200;
- no Activity Specialist.

Invalid:
- all three Activity Specialists simultaneously;
- two Activity Specialists + cap-200;
- a hidden/free “Activity Specialist slot”.

This is intentional.

The ending family creates future build choices rather than a permanent stack of every earned rule.

---

# 12. Stacking rules

## Surveyor's Atlas + Field Archive Protocol

Allowed.

They affect different decisions:
- route efficiency/information;
- extraction risk.

## Surveyor's Atlas + Contact Network

Allowed.

However:
- if a Network Introduction route contains a survey/travel action,
- no single action may receive more than **1 total Field Time reduction from Meta**.

The Contact Network itself does not automatically reduce Field Time, so normal implementation should rarely create this collision.

## Field Archive + Contact Network

Allowed.

A result reached through a network route may later be secured if it is explicitly tagged `activity-secure-eligible`.

No duplication occurs.

## Same reward twice

Impossible / no stacking.

Specialist ownership is boolean and each may be activated at most once.

---

# 13. Secret Debt compatibility

All three rewards respect D19/D30/D32.

While bound:

- Large Activity remains available where otherwise legal;
- ordinary careers remain locked;
- forced Secret Debt Night remains authoritative;
- camp cannot replace that forced Night;
- next-day Energy -1 remains real;
- repayment remains exactly 20000 all-at-once;
- no reward changes lender discovery, +2000 grant or 10-day activation.

## Surveyor's Atlas

Does not:
- lower 2-Energy Activity entry;
- add daily Energy;
- create money;
- permit camp through forced Night.

Saving up to one Field Time per region has no effect on the Secret Debt Night precedence.

## Field Archive

A Secret Debt-critical evidence/key result is securable only if that authored result explicitly opts into:

`activity-secure-eligible`.

Therefore the Specialist cannot accidentally turn a fragile debt-network objective into an automatic protected key.

Even when secured:
- it does not repay debt;
- it does not unlock ordinary careers;
- it does not suppress forced Night.

## Contact Network

Network Introduction routes cannot:
- produce repayment;
- end the hidden route;
- cancel forced Night;
- substitute for owner-kill/control requirements;
- unlock ordinary professions while bound.

Secret Debt-specific access must remain independently authored.

---

# 14. Palace compatibility

All three rewards respect D23/D24 and Palace progression authority.

None may:

- grant Palace invitation;
- count toward ordinary 10/10;
- count as an active Hard Work package;
- substitute for current-run active 10/10;
- count as Palace duty;
- bypass Palace progression completion;
- bypass the Palace True 12-stat >=91 condition;
- activate cap-200.

If Palace is already normally open:

- Surveyor's Atlas may affect an optional Activity route associated with an already-open Palace context;
- Field Archive may secure an explicitly eligible optional Palace-adjacent Activity result;
- Contact Network may expose a tagged lateral Activity route only after the relevant region/Palace context is already legally available.

No Activity Specialist is a back door into Palace.

---

# 15. Balance comparison

## 15.1 Versus D30/D32 Keystones

### Earned Reserve Match

Keystone:
- up to **1000 money**;
- acts across eligible ordinary wage income.

Activity Specialists:
- no money generation;
- at most four region-scoped activations/effects.

Conclusion:
Activity rewards are materially narrower.

### Work Rhythm

Keystone:
- up to **20 extra usable Energy/actions** over a run.

Activity Specialists:
- do not add global daily Energy;
- Pathfinder saves at most **4 Field Time**, an internal Activity resource;
- other rewards alter risk/options rather than action count.

Conclusion:
Activity rewards stay below Keystone breadth.

### Network Retainer

Keystone:
- up to **1000 passive money**.

Activity Contact Network:
- despite similar “network” language, pays **0 money**;
- only exposes bounded alternate Activity routes.

The two rewards must remain mechanically and textually distinct.

---

# 16. Versus D24 cap-200 Specialist

Palace cap-200:

- consumes one Specialist slot;
- changes only late progression-stat ceiling;
- provides no free starting stats.

Activity Specialists:

- also consume one normal Specialist slot;
- affect only Activity route/risk/access play;
- provide no raw starting stats.

This is a healthy tradeoff.

A late-stat build may choose cap-200 and only one Activity reward.

An Activity-focused life may choose two Activity rewards and forgo cap-200.

No extra slot is created.

---

# 17. Versus ordinary Hard Work packages

D21/D22 ordinary Hard Work rewards:

- permanently unlock that profession from run start;
- provide selectable +5 stat package(s);
- exist outside Keystone/Specialist limits;
- can be activated as an earned subset;
- are part of D23 Palace qualification.

Activity ending rewards do **not**:

- grant ordinary career access;
- add +5 stats;
- count as Hard Work packages;
- count toward 10/10;
- affect Palace D23.

They can stack with active Hard Work packages because the layers are separate.

That stacking is acceptable:
- Hard Work gives build/access;
- Activity Specialist changes Activity choices.

---

# 18. Versus D36 2-Energy entry

All three rewards preserve:

**new Activity entry = 2 daily Energy**.

No reward:
- discounts entry to 1;
- gives a free first entry;
- refunds entry on success/failure;
- changes resume semantics.

This protects Activity's opportunity cost inside the 160-day life-sim.

---

# 19. Versus D36 <=10-entry ending pacing

The direction-specific rules must be achievable inside the existing D36 reference budget.

They do not add:
- another required region;
- another extraction count;
- another contact count;
- a repeatable Activity XP requirement.

Direction markers are produced while resolving regional anchors.

With a reference path of three regional anchors:

- resolve three anchors in <=9 successful entries under the D36 <=3-per-anchor rule;
- obtain two matching direction markers during those resolutions;
- complete the required specialized family as part of those region runs;
- satisfy extraction/contact requirements inside the same route plan.

Therefore standalone eligibility remains compatible with **<=10 Activity entries**.

Rewards apply only to later lives and do not weaken the first completion requirement.

---

# 20. Why keep all three candidate directions

## Pathfinder / Mapping

Keep.

It directly expresses:
- route graph mastery;
- exploration;
- uncertainty reduction.

No ordinary career owns this identity.

Hunter overlaps with tracking but remains a profession about contracts/field expertise; Pathfinder is cross-region Activity mastery.

## Preservation / Research

Keep.

It gives:
- Pattern/Ritual;
- sample/evidence extraction;
- research identity.

School overlaps with learning but School remains city-side stat/education progression.

Preservation is about successfully bringing field truth back from Activity.

## Network / Access

Keep, but define it narrowly around **Activity route access**, not economy.

The weak version would duplicate Merchant:
- suppliers;
- trade empire;
- money.

The accepted version instead focuses on:
- expedition contacts;
- restricted routes;
- alternate access paths;
- cross-region Activity introductions.

This preserves a distinct identity from Merchant House and from Secret Debt Network Retainer.

No replacement direction is needed.

---

# 21. Direction facts and minimal implementation contract

If Product accepts this packet, later implementation should define a small authoritative fact vocabulary.

## Common facts/counters

Equivalent functional state:

- resolved anchor set / count;
- completed specialized mechanic-family set;
- meaningful extracted result count/tag;
- resolved Activity contact threads.

## Direction facts

Per region anchor:
- one Pathfinder fact;
- one Preservation fact;
- one Network fact;
- at most one of the three emitted for the same anchor resolution.

Counters/derived queries:
- distinct Pathfinder anchor regions;
- distinct Preservation anchor regions;
- distinct Network anchor regions.

## Specialized family facts

Need at least:
- Tracking Triangulation completed;
- Pattern/Ritual Circuit completed;
- Infiltration/Suspicion completed.

Exact storage may be world facts, Activity progression state or a dedicated declarative domain.

Do not encode these as arbitrary legacy flags if a typed Activity state is available.

---

# 22. Ending acceptance contract

Focused acceptance should prove:

1. common D36 baseline alone does not make all three directions eligible;
2. fewer than 3 resolved regional anchors makes none eligible;
3. fewer than 2 mechanic families makes none eligible;
4. missing extraction makes none eligible;
5. missing contact thread makes none eligible;
6. Pathfinder needs exactly 2 distinct Pathfinder anchor regions + Tracking success;
7. Preservation needs exactly 2 distinct Preservation anchor regions + Pattern/Ritual success + one research-grade extracted result;
8. Network needs exactly 2 distinct Network anchor regions + Infiltration/Suspicion success + one network-capable resolved contact;
9. all requirements may be satisfied without ordinary Hard Work;
10. all requirements may be satisfied without Palace;
11. eligibility does not commit automatically;
12. two directions may be eligible simultaneously when facts support both;
13. explicit commit chooses one exact ending ID;
14. only the committed ending's Meta reward is earned;
15. completing all three across lives can permanently own all three Specialist options;
16. New Start+ still activates at most 2 Specialists total;
17. cap-200 consumes one of those same two slots;
18. none of the Activity Specialists reduces 2-Energy entry;
19. none substitutes for D23;
20. none suppresses Secret Debt forced Night.

---

# 23. Reward acceptance contract

## Surveyor's Atlas

- at most one free 1-Field-Time survey per region per run;
- max 4 saved Field Time;
- no benefit if no valid survey action exists;
- no route/region gate bypass;
- no repeated save/reload use.

## Field Archive Protocol

- at most one secured result per region per run;
- max 4;
- result must already have been legally obtained;
- result must be tagged secure-eligible;
- no duplication;
- escape/failure preserves only the secured eligible result according to the contract;
- save/reload does not grant another secure charge.

## Expedition Contact Network

- at most one Network Introduction per region per run;
- max 4;
- only authored `activity-network-introduction` options consume it;
- region must already be normally unlocked;
- does not generically satisfy arbitrary conditions;
- no Palace/Secret Debt/ending gate bypass;
- save/reload does not restore a spent introduction.

---

# 24. User-facing Ending Atlas contract

The future Ending Atlas should present all three as members of one Activity family, but as separately completable endings.

Functional user-facing names remain provisional.

| Направление | Как получить | Что происходит | Что даёт навсегда | Reward class | Что ещё OPEN |
| --- | --- | --- | --- | --- | --- |
| **Pathfinder / Mapping** | Общая база D36: якоря минимум 3/4 регионов, минимум 2 mini-game family, минимум 1 meaningful extraction, минимум 1 resolved Activity contact; дополнительно минимум **2 Pathfinder-якоря в разных регионах** и минимум **1 успешный Tracking Triangulation** | Героиня связывает разрозненные маршруты в устойчивую систему исследования/доступа; точная организация и lore не фиксируются | **Surveyor's Atlas**: при выборе в New Start+ один survey/discovery с обычной ценой 1 Field Time в каждом регионе может стоить 0; максимум **4 Field Time за run**, без снижения entry Energy и без обхода route gates | **Specialist**, selectable, 1 из 2 slots | финальное название, lore/эпилог, точные presentation IDs и какие authored actions помечены как survey |
| **Preservation / Research** | Общая база D36; дополнительно минимум **2 Preservation-якоря в разных регионах**, минимум **1 успешный Pattern/Ritual Circuit**, а обязательный meaningful extraction должен быть **1 research-grade secured result** | Героиня сохраняет и возвращает значимое полевое знание/образец/доказательство вместо превращения его в generic loot | **Field Archive Protocol**: по одному уже законно полученному `activity-secure-eligible` результату на регион можно закрепить так, чтобы он пережил последующий escape/failure; максимум **4 secured results за run**; ничего не дублирует и не обходит capability gate | **Specialist**, selectable, 1 из 2 slots | финальное название, lore/эпилог, точные типы secure-eligible результатов |
| **Network / Access** | Общая база D36; дополнительно минимум **2 Network-якоря в разных регионах**, минимум **1 успешный Infiltration/Suspicion**, а обязательный Activity contact должен завершиться как **1 network-capable contact** | Героиня создаёт устойчивую сеть экспедиционных контактов и альтернативных путей доступа; это не Merchant empire и не пассивный доход | **Expedition Contact Network**: после обычного unlock региона доступен максимум **1 authored Network Introduction route на регион за run**; всего максимум **4**; route является lateral option и не может обходить region/Palace/Secret Debt/career/item/ending gates | **Specialist**, selectable, 1 из 2 slots | финальное название, lore/эпилог, точные network-introduction routes и contacts |

---

# 25. Final recommendation

Lock the standalone Activity ending family as:

- **three separate ending IDs**;
- one common D36 baseline;
- two same-direction regional anchor resolutions per direction;
- one direction-defining specialized mini-game requirement;
- no Hard Work / Palace gate;
- explicit D16 commit;
- one distinct selectable Activity Specialist reward per committed ending.

Reward package:

1. Pathfinder -> **Surveyor's Atlas** Specialist;
2. Preservation -> **Field Archive Protocol** Specialist;
3. Network -> **Expedition Contact Network** Specialist.

All three:

- preserve Activity entry at 2 Energy;
- preserve D36 <=10-entry reference pacing;
- respect D28 2-Specialist capacity;
- do not create a free slot;
- do not become Keystones;
- do not bypass D23;
- do not bypass Secret Debt forced Night;
- do not grant generic raw stats/money/Energy/calendar time.

No production changes were made by this packet.

Disposition: **READY_FOR_LEADER_PRODUCT_DECISION**.
