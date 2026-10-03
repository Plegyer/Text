# Chat 3 — Ordinary Complex Endings Tranche B v10

Status: **PRODUCT DECISION PACKET / RESEARCH ONLY / NO PRODUCTION CHANGES**  
Owner: Chat 3  
Branch: `chat3/ordinary-complex-endings-tranche-b-v10`  
Authority: `main@20553cff531dcbc328df8b786829b7409e5d521f`

Companion matrix:
`mindy-successor/research/ordinary_complex_endings_tranche_b_v1.csv`

## 0. Scope

This packet resolves exactly 16 advanced ordinary-career endings:

- Guard: Officer, Reform, Network/Corruption, Major Case;
- Merchant: Merchant House, Speculator/Smuggler, Patron of Routes;
- Artist/Geisha: Master Artist, Patron Network, Court Invitation;
- Assassin: Ghost, Handler Takeover, Refusal/Turncoat;
- Prostitute: Independent House, Elite Clientele, Network/Protection.

Ordinary Hard Work endings remain unchanged.

No production runtime/UI/content is changed here.

---

# 1. Shared ending shape

## 1.1 Existing topology problem

All five careers already have:

- pre-branch progression;
- route-ready facts;
- branch transitions;
- one common `outcome-ready` stage.

However, after the selected branch advances to the common `outcome-ready` stage, the stage alone no longer records which advanced branch was actually chosen.

Several route-ready facts may coexist.

Therefore an advanced ending must not be authored as:

`careerStage = outcome-ready AND route-ready fact`

because that could make a route eligible that was ready but never selected.

## 1.2 Locked recommendation

Every advanced branch choice must add exactly one persistent selected-route fact.

Pattern:

`ending-route-<route>-selected`

The ending then requires:

1. `careerStage = outcome-ready`;
2. its exact persistent selected-route fact.

The selected-route fact is written atomically in the same branch choice that currently:

- advances the career;
- adds `outcome-ready`.

This is a minimal future producer change.

No new parallel career-stage system is needed.

## 1.3 D16

Eligibility remains non-terminal.

The selected branch + outcome-ready stage makes the corresponding ending eligible.

The run ends only after the player explicitly commits that ending through the existing ending flow.

---

# 2. School publisher rule required by this tranche

Current content already contains consumers such as:

- `school-literacy-ready`;
- `school-etiquette-ready`;
- `school-arts-ready`;
- `school-rhetoric-ready`.

The live School inventories currently mark their producer thresholds as **null / blocked** for Guard, Merchant and Artist/Geisha.

This packet proposes one exact local publisher rule for the facts required by these endings:

For the corresponding School track:

- `lessons_completed >= 3`
  **OR**
- `night_study_sessions >= 3`

publishes that career-local `school-*-ready` fact exactly once.

Properties:

- paid and Night Study progress are alternatives, not summed;
- publisher is career-local;
- it is independent of current career stage;
- no certificate/project/exam subsystem is introduced;
- no global School completion concept is introduced;
- Night Study keeps its normal next-day Energy cost;
- publishing the fact does not auto-select a career route.

This intentionally mirrors the already accepted D33 shape rather than inventing a second School milestone language.

School facts affected in Tranche B:

Guard:
- `school-literacy-ready`;
- `school-etiquette-ready`.

Merchant:
- `school-literacy-ready`.

Artist/Geisha:
- `school-arts-ready`;
- `school-literacy-ready`;
- `school-rhetoric-ready`;
- `school-etiquette-ready`.

Assassin and Prostitute endings in this tranche do not add mandatory School gates.

---

# 3. Stat-threshold policy

This packet adds **no new raw ending-level stat thresholds**.

Reason:

- the careers already have normal stat/year unlock gates;
- route-ready producers already express build identity through School, items, relationships, Activity and authored choices;
- adding a second 50/60-style stat wall at ending eligibility would duplicate progression and risk making advanced endings into hidden Hard Work-lite.

Individual authored scenes may still use local stat choices/checks.

Those local checks must not silently become new global ending gates.

---

# 4. Reward architecture

No Tranche B ending creates a new Keystone.

Rewards use only:

- **automatic knowledge/content unlocks**, or
- **Specialists** under D27/D28.

D28 remains exact:

- active Keystones: 0..1;
- active Specialists: 0..2 total;
- Palace cap-200 uses one ordinary Specialist slot;
- no advanced career ending creates a free Specialist slot.

Ordinary Hard Work packages remain a separate unrestricted activation layer.

---

# 5. Guard

Minimum advanced branching point:

`senior-guard`.

Current topology reaches it at:

`completed_shifts >= 8`
plus the existing trusted-ready progression.

## 5.1 Officer

Stable ending ID:

`ending.guard.officer`

Selected-route fact:

`ending-route-officer-selected`

### Existing mandatory readiness

Current `guard.routes.officer-ready` requires:

- `careerStage = senior-guard`;
- `crisis-officer`;
- `school-literacy-ready`;
- `school-etiquette-ready`;
- `duty-report-evidence`;
- `official-access-issued`.

It publishes:

`officer-route-ready`.

### School

Mandatory:
- Literacy & Numbers ready;
- Etiquette & Presentation ready.

Each uses the exact 3-paid OR 3-night-study publisher rule from §2.

### Night / relationship

None mandatory.

Professional/personal Guard Night completeness remains a D37 content requirement, not an Officer ending gate.

### Activity / item

No Activity required.

Existing official access/evidence is sufficient.

### Current-life resolution

The protagonist resolves the formal command/reporting path and takes institutional responsibility.

Final rank title, institution name and epilogue wording remain lore-owned.

### Permanent reward

`unlock.guard.command-briefing`

Class:
**automatic knowledge/content**.

Exact effect:

After Guard is normally available in a future run, expose at most **1 authored `guard-command-briefing` event per run**.

That event may add:
- one formal report/command choice in its own Guard context.

It may not:
- grant Guard access early;
- create money/stats/Energy;
- grant official access outside authored context;
- affect Palace.

### Implementation status

Already live:
- route prerequisites;
- route-ready producer;
- branch stage;
- common outcome-ready transition.

Missing:
- exact School publishers;
- selected-route fact;
- ending ID;
- reward Meta unlock.

---

## 5.2 Reform

Stable ID:

`ending.guard.reform`

Selected fact:

`ending-route-reform-selected`

### Existing readiness

`guard.routes.reform-ready` requires:

- `senior-guard`;
- `crisis-reform`;
- `poverty-relief-choice`;
- `city-dispute-resolved`;
- `relationship-conflict-resolved`.

Publishes:

`reform-route-ready`.

### School

None mandatory.

### Night / relationship

`relationship-conflict-resolved` is mandatory.

No romance mode is required.

### Activity / item

None mandatory.

### Current-life resolution

Concrete Guard procedures/practices are changed through authored case decisions.

No morality meter is introduced.

### Permanent reward

`unlock.guard.reform-practice`

Class:
**automatic knowledge/content**.

Exact effect:

Future runs may expose up to **2 authored `guard-reform-variant` civic choices per run** after those base events are normally available.

No:
- universal trust score;
- stat bonus;
- free access;
- generic safety modifier.

### Implementation status

Route and branch topology live.

Ending/reward/selected fact missing.

---

## 5.3 Network / Corruption

Stable ID:

`ending.guard.network`

Selected fact:

`ending-route-network-selected`

### Existing readiness

Requires:

- `senior-guard`;
- `crisis-network`;
- `cargo-pass-evidence`;
- `sealed-pass-issued`;
- `relationship-conflict-resolved`.

Publishes:

`network-route-ready`.

### School

None.

### Relationship

Resolved Guard relationship conflict mandatory.

The route may represent cooperation, favor-trading or compromised institutional access depending authored choice.

No morality score.

### Reward

`specialist.guard.institutional-favors`

Class:
**Specialist**.

Exact mechanics:

- maximum **2 uses per run**;
- only in an already available scene explicitly tagged `guard-institutional-favor`;
- exposes one authored lateral institutional/contact option.

It does not:
- pay money;
- unlock Guard;
- unlock an Activity region;
- grant Palace access;
- alter Secret Debt.

This is distinct from:
- D30 Network Retainer — passive money;
- D38 Activity Contact Network — Activity-region introductions;
- Merchant networks — trade/supplier options;
- Assassin networks — contract intelligence;
- Prostitute protection network — professional safety.

---

## 5.4 Major Case

Stable ID:

`ending.guard.major-case`

Selected fact:

`ending-route-major-case-selected`

### Existing readiness

`guard.routes.major-case-ready` requires:

- `senior-guard`;
- `major-case-thread-ready`;
- `relationship-trust-ready`;
- `poverty-response-recorded`;
- `crisis-resolved`;
- at least one of:
  - `partner-case-support`;
  - `tavern-evidence-known`.

Publishes:

`major-case-ready`.

### School

None mandatory.

### Activity / Palace

Activity evidence may contribute through future authored source facts.

Palace is not mandatory.

This ending may never require Palace access.

### Reward

`unlock.guard.casebook-index`

Class:
**automatic knowledge/content**.

Exact effect:

Up to **3 times per run**, a tagged investigation scene may display one additional evidence-source provenance hint before the decision.

Information only.

It does not satisfy the evidence condition.

---

# 6. Merchant

Minimum advanced branching point:

`networked-merchant`.

Current topology reaches it at:

`completed_shifts >= 8`
plus `independent-ready`.

## 6.1 Merchant House

Stable ID:

`ending.merchant.house`

Selected fact:

`ending-route-merchant-house-selected`

### Existing readiness

`merchant.routes.house-ready` requires:

- `networked-merchant`;
- `supplier-trust-ready`;
- `manifest-verified`;
- capability `merchant_verify_manifest`;
- `school-literacy-ready`;
- `crisis-resolved`.

Publishes:

`merchant-house-ready`.

### School

Mandatory:
Literacy & Numbers ready via exact 3-paid OR 3-night rule.

### Relationship

`supplier-trust-ready` mandatory.

No romance semantics.

### Reward

`unlock.merchant.house-supplier`

Class:
**automatic knowledge/content**.

Exact effect:

After Merchant is normally available, expose **1 authored Merchant House supplier introduction per run**.

It grants no:
- free item;
- blanket discount;
- passive income;
- credit line.

---

## 6.2 Speculator / Smuggler

Stable ID:

`ending.merchant.speculator-smuggler`

Selected fact:

`ending-route-speculator-smuggler-selected`

### Existing readiness

Requires:

- `networked-merchant`;
- `shortage-handled`;
- `risk-accepted`;
- `appraisal-recorded`;
- `crisis-resolved`.

Publishes:

`speculator-route-ready`.

### School / relationship / Activity

None mandatory.

The authored risk/appraisal route itself carries identity.

### Reward

`specialist.merchant.risk-ledger`

Class:
**Specialist**.

Exact mechanics:

Maximum **2 tagged high-risk deals per run**.

Before the atomic deal commit:
- show the authored reward band;
- show the authored downside tag;
- expose an abort choice.

Aborting before commit spends none of the deal's transaction effects.

The reward does not:
- guarantee profit;
- erase legal fallout after commit;
- create passive money;
- bypass Guard/Palace.

---

## 6.3 Patron of Routes

Stable ID:

`ending.merchant.patron-of-routes`

Selected fact:

`ending-route-patron-routes-selected`

### Existing readiness

Current route requires:

- `route_inputs >= 5`;
- `lumber-input-known`;
- `farm-input-known`;
- `hunter-input-known`;
- `tavern-input-known`;
- `guard-input-known`.

Publishes:

`patron-route-ready`.

The existing Lumber/Hunter inputs already consume Activity-derived results:
- Forest truth;
- Hunter expedition return.

So no new extra Activity quota is added.

### Reward

`unlock.merchant.patron-destinations`

Class:
**automatic knowledge/content**.

Exact effect:

Up to **2 authored trade/find contexts per run** may expose one extra recipient/destination option after their base context is already available.

No:
- universal sale multiplier;
- region unlock;
- Palace access;
- passive income.

This is a destination/recipient choice, not D38 Activity route access.

---

# 7. Artist / Geisha

Minimum branching point:

`recognized-artist`.

It requires the existing seasonal-breadth path.

No new numeric shift threshold is added.

## 7.1 Master Artist

Stable ID:

`ending.artist-geisha.master-artist`

Selected fact:

`ending-route-master-artist-selected`

### Existing readiness

Requires:

- `recognized-artist`;
- `performance-breadth-ready`;
- `school-arts-ready`;
- `school-literacy-ready`;
- `performance-kit-issued`;
- capability `artist_performance_ready`.

Publishes:

`master-artist-ready`.

### School

Mandatory:
- Arts & Performance ready;
- Literacy & Numbers ready.

Each uses 3 paid OR 3 Night Study sessions.

### Reward

`unlock.artist.master-repertoire`

Class:
**automatic knowledge/content**.

Exact effect:

After Artist is normally available:
- at most **1 authored master-repertoire performance variant per season**;
- maximum **4 per run**.

No:
- wage multiplier;
- free stats;
- free School.

---

## 7.2 Patron Network

Stable ID:

`ending.artist-geisha.patron-network`

Selected fact:

`ending-route-patron-network-selected`

### Existing readiness

Requires:

- `recognized-artist`;
- `mentor-trust-ready`;
- `school-rhetoric-ready`;
- `social-network-breadth-ready`.

Current social breadth requires:

- mentor trust;
- Satyr network;
- Tavern rumour;
- Merchant material route.

Publishes:

`patron-network-ready`.

### School

Rhetoric & Social ready:
3 paid OR 3 Night Study sessions.

### Relationship

Mentor trust mandatory.

Romance never mandatory.

### Reward

`specialist.artist.salon-introductions`

Class:
**Specialist**.

Exact mechanics:

- maximum **4 uses per run**;
- maximum **1 per season**;
- only in already available Artist/Night social scenes tagged `artist-salon-introduction`;
- adds one authored contact/introduction choice.

No:
- money stipend;
- automatic relationship stage;
- Palace access.

---

## 7.3 Court Invitation

Stable ID:

`ending.artist-geisha.court-invitation`

Selected fact:

`ending-route-court-invitation-selected`

### Existing readiness

Requires:

- `recognized-artist`;
- `school-etiquette-ready`;
- `court-contact-ready`;
- `formal-attire-issued`;
- capability `artist_formal_presence`;
- `winter-window-seen`;
- `guard-event-context-known`;
- `invitation-token-issued`;
- capability `artist_handle_invitation`.

Publishes:

`court-invitation-ready`.

### Palace boundary

This is career-local court context only.

It is **not** Palace access.

### Reward

`unlock.artist.court-context`

Class:
**automatic knowledge/content**.

Exact effect:

Before D23 Palace unlock:
- no gameplay effect.

After D23 Palace access is legitimately open:
- expose **1 alternate Artist-context Palace introduction per run**.

It never:
- creates the Palace invitation;
- substitutes for permanent 10/10 + active 10/10;
- counts as Palace duty.

---

# 8. Assassin

Minimum branching point:

`trusted-blade`.

Current branch selection also requires `veteran-ready`.

No new numeric shift threshold is added.

## 8.1 Ghost

Stable ID:

`ending.assassin.ghost`

Selected fact:

`ending-route-ghost-selected`

### Existing readiness

Requires:

- `trusted-blade`;
- `infiltration-returned`;
- Assassin contract method = `stealth`;
- capability `assassin_concealed_entry`.

Publishes:

`ghost-ready`.

Current infiltration qualification/return remains part of the route.

### Reward

`specialist.assassin.ghost-routes`

Class:
**Specialist**.

Exact mechanics:

Maximum **2 tagged advanced Assassin contracts per run**.

After a contract is already normally available:
- expose one authored covert entry route if the supported Assassin capability is owned.

It does not:
- unlock the contract;
- waive the capability;
- unlock Activity regions;
- unlock Palace;
- auto-resolve the objective.

---

## 8.2 Handler Takeover

Stable ID:

`ending.assassin.handler-takeover`

Selected fact:

`ending-route-handler-takeover-selected`

### Existing readiness

Requires:

- `trusted-blade`;
- `handler-utility-ready`;
- capability `assassin_handle_evidence`;
- at least one:
  - `tavern-intel-known`;
  - `merchant-route-known`;
  - `guard-pressure-known`.

Publishes:

`handler-takeover-ready`.

### Relationship

Handler utility is mandatory.

Romance is not relevant.

### Reward

`specialist.assassin.contract-ledger`

Class:
**Specialist**.

Exact mechanics:

Maximum **2 advanced contracts per run**.

Before method commit:
- reveal authored sponsor tag;
- reveal authored fallout tag;
- expose one authored reroute/contact option when present.

No:
- passive money;
- Guard authority;
- Palace access;
- automatic contract success.

This remains distinct from D30 Network Retainer because it is contract information/choice, not income.

---

## 8.3 Refusal / Turncoat

Stable ID:

`ending.assassin.refusal-turncoat`

Selected fact:

`ending-route-refusal-turncoat-selected`

This one ending accepts either of the current functional branches:

- `turncoat`;
- `refusal-chain`.

They are variants of the same player-facing ending family direction.

### Turncoat route

Current `turncoat-ready` requires:

- trusted-blade;
- contract resolution `redirect` OR `abort`;
- capability `assassin_handle_evidence`.

### Refusal route producer gap

Current content has:
- `refusal-chain-evidence`;
- a consumer expecting `refusal-chain-ready`;
- no producer for `refusal-chain-ready`.

Exact proposed producer:

requires:

- `careerStage = trusted-blade`;
- `veteran-ready`;
- `refusal-chain-evidence`;
- `contract-cycle-complete`;
- relationship fact `assassin.handler/refusal-respected`.

Then publish exactly once:

`refusal-chain-ready`.

This permits a principled refusal route without requiring the evidence tool used by Turncoat.

### Reward

`unlock.assassin.refusal-protocol`

Class:
**automatic knowledge/content**.

Exact effect:

Once per run, the first tagged advanced Assassin contract may expose an authored refuse/redirect exit **before method lock**.

It does not:
- grant contract reward;
- mark the contract successful;
- create evidence;
- help Guard automatically;
- unlock Palace.

---

# 9. Prostitute

This is the ordinary profession only.

It never inherits Secret Debt forced-route semantics.

Minimum branching point:

`established`.

It requires existing seasonal breadth.

No new numeric shift threshold.

## 9.1 Independent House

Stable ID:

`ending.prostitute.independent-house`

Selected fact:

`ending-route-independent-house-selected`

### Existing readiness

Requires:

- `established`;
- capability `prostitute_private_room_access`;
- `housing-context-reviewed`;
- `merchant-business-context-known`.

Publishes:

`independent-house-ready`.

### Housing boundary

The private-room career capability is not the same thing as the player's D35 lodging tier.

This ending does not require normal personal lodging.

It does not make cheap/street satisfy D35 private-space conditions.

### School

No mandatory School gate.

Literacy/Rhetoric remain optional preparation.

### Reward

`specialist.prostitute.housebook`

Class:
**Specialist**.

Exact mechanics:

Maximum **2 tagged professional bookings per run**.

Before the appointment/Night commit:
- display authored terms/risk;
- expose decline or renegotiate choice.

It does not:
- create private-space access;
- reduce lodging price;
- refund action costs already paid;
- affect Secret Debt forced Night.

---

## 9.2 Elite Clientele

Stable ID:

`ending.prostitute.elite-clientele`

Selected fact:

`ending-route-elite-clientele-selected`

### Existing readiness

Requires:

- `established`;
- capability `prostitute_formal_presence`;
- capability `prostitute_client_token`;
- `recurring-client-trust-ready`.

Publishes:

`elite-clientele-ready`.

### Relationship / Night

Professional trust is mandatory.

Professional-only, friendship or romance relationship modes are all valid.

Romance is never required.

### Reward

`unlock.prostitute.elite-protocol`

Class:
**automatic knowledge/content**.

Exact effect:

After the ordinary profession is normally available:
- expose **1 authored high-status professional introduction per run**.

No:
- Palace access;
- free money;
- stat bonus;
- forced romance.

---

## 9.3 Network / Protection

Stable ID:

`ending.prostitute.network-protection`

Selected fact:

`ending-route-network-protection-selected`

### Existing readiness

Requires:

- `established`;
- capability `prostitute_handle_evidence`;
- at least one:
  - `satyr-network-known`;
  - `tavern-information-known`;
  - `guard-safety-context-known`;
  - `merchant-business-context-known`.

Publishes:

`network-protection-ready`.

### Secret Debt separation

Secret Debt knowledge may appear as optional authored context.

It is never mandatory.

The ordinary profession:
- does not inherit forced Night;
- does not inherit debt;
- does not gain a Secret Debt escape.

### Reward

`specialist.prostitute.mutual-aid-roster`

Class:
**Specialist**.

Exact mechanics:

Maximum **2 tagged ordinary Prostitute professional-risk scenes per run**.

Adds one authored:
- safe-exit;
- request-help;
- contact-support

choice.

It may avoid that scene's **extra authored penalty**.

It never:
- refunds the normal shift/Night cost already committed;
- suppresses Secret Debt forced Night;
- pays money;
- grants Guard authority.

This is distinct from Guard Institutional Favors because it is a narrow ordinary-profession safety/contact option.

---

# 10. Reward-class summary

## Automatic knowledge/content

- Guard Officer — Command Briefing;
- Guard Reform — Reform Practice;
- Guard Major Case — Casebook Index;
- Merchant House — House Supplier;
- Merchant Patron of Routes — Patron Destinations;
- Artist Master Artist — Master Repertoire;
- Artist Court Invitation — Court Context;
- Assassin Refusal/Turncoat — Refusal Protocol;
- Prostitute Elite Clientele — Elite Protocol.

These do not consume Specialist capacity.

They are authored content/knowledge options with no generic raw stat/money/Energy benefit.

## Specialists

- Guard Network — Institutional Favors;
- Merchant Speculator/Smuggler — Risk Ledger;
- Artist Patron Network — Salon Introductions;
- Assassin Ghost — Ghost Routes;
- Assassin Handler Takeover — Contract Ledger;
- Prostitute Independent House — Housebook;
- Prostitute Network/Protection — Mutual Aid Roster.

Each consumes one of the normal D28 0..2 Specialist slots when selected.

No new Specialist capacity is created.

---

# 11. Cross-reward network distinction

The project now contains several rewards with a “network” theme.

They must remain mechanically different.

## D30 Network Retainer

- Keystone;
- 25 money for first 40 eligible days;
- max 1000;
- income identity.

## D38 Expedition Contact Network

- Activity Specialist;
- max one lateral introduction per D36 region;
- Activity route/access identity.

## Guard Institutional Favors

- Guard Specialist;
- max 2 civic/institutional authored uses;
- official/institutional context identity.

## Merchant Patron Destinations

- automatic content unlock;
- max 2 extra recipient/destination options;
- trade-distribution identity.

## Assassin Contract Ledger

- Assassin Specialist;
- max 2 contracts;
- sponsor/fallout/reroute intelligence identity.

## Prostitute Mutual Aid Roster

- Prostitute Specialist;
- max 2 ordinary professional-risk scenes;
- safe-exit/contact-support identity.

None is a generic reusable “network currency”.

---

# 12. Save / migration

## 12.1 Selected-route facts

New selected-route facts are run-local career facts.

Write them atomically with the branch choice.

They are not Meta.

Save/reload after route choice must preserve them.

## 12.2 Existing saves already past branch selection

A migration cannot infer the selected route merely from every route-ready fact because several can coexist.

Safe migration order:

1. if current career stage is a specific advanced branch, derive the matching selected-route fact;
2. if current career stage is already `outcome-ready` and no selected-route fact exists, do **not** guess from multiple route-ready facts;
3. use an explicit one-time migration/repair prompt or preserved event/choice history if such history is authoritative;
4. never silently award multiple advanced endings.

## 12.3 Meta rewards

Automatic unlock ownership is boolean and permanent.

Specialist ownership is boolean and permanent.

Current-run Specialist loadout is snapshotted at run creation under D28.

Later catalog changes must not rewrite the loadout of an in-progress life.

---

# 13. Implementation status by career

## Guard

Live:
- stage topology;
- route readiness;
- multi-system facts;
- relationship surface.

Blocked/missing:
- Officer School publishers;
- advanced ending IDs;
- selected-route facts;
- Meta rewards.

## Merchant

Live:
- stage topology;
- three route-ready consumers;
- route_inputs cross-system publishers;
- supplier relationship.

Blocked/missing:
- Merchant House School publisher;
- ending IDs;
- selected-route facts;
- rewards.

## Artist/Geisha

Live:
- stage topology;
- route-ready consumers;
- social breadth/cross-system facts;
- items and Night content.

Blocked/missing:
- required School fact publishers;
- ending IDs;
- selected-route facts;
- rewards.

## Assassin

Live:
- trusted-blade topology;
- Ghost/Turncoat/Handler route producers;
- infiltration infrastructure;
- handler relationship.

Blocked/missing:
- `refusal-chain-ready` producer;
- ending IDs;
- selected-route facts;
- rewards.

## Prostitute

Live:
- established topology;
- all three route-ready producers;
- recurring-client relationship;
- item/cross-system facts.

Missing:
- ending IDs;
- selected-route facts;
- rewards.

No Secret Debt semantics need to be copied into this career.

---

# 14. Focused acceptance contract for later implementation

1. exactly 16 new advanced ending IDs are added;
2. no Hard Work ending is changed;
3. each new ending requires `outcome-ready` plus exactly its selected-route fact;
4. route-ready alone cannot make an ending eligible;
5. choosing one branch writes exactly one selected-route fact;
6. deferring writes none;
7. eligibility does not commit automatically;
8. explicit commit awards only that ending's permanent reward;
9. automatic content unlocks consume no Specialist slot;
10. every Specialist consumes exactly one normal slot;
11. max active Specialists remains 2;
12. Palace cap-200 competes for the same two slots;
13. no Tranche B reward is a Keystone;
14. no reward lowers Activity 2-Energy entry;
15. no reward bypasses D23;
16. no reward cancels Secret Debt forced Night;
17. ordinary Prostitute Night remains ordinary voluntary Night;
18. Court Invitation has zero Palace-access effect before D23 is satisfied;
19. Network Retainer remains the only D30 passive-income network reward;
20. save/reload cannot duplicate a bounded reward use;
21. route-choice migration never guesses from multiple ready facts;
22. School ready facts publish exactly once at 3 paid OR 3 night-study sessions;
23. paid and Night Study counts do not sum together for the threshold;
24. no new universal morality/reputation/network currency is introduced.

---

# 15. User-facing Ending Atlas table

| Ending | Как получить | Что происходит | Что даёт навсегда | Reward class | Exact numbers | OPEN |
| --- | --- | --- | --- | --- | --- | --- |
| **Guard — Officer** | Senior Guard; `crisis-officer`; School Literacy ready + Etiquette ready; duty report; official access; выбрать Officer branch; дойти до outcome-ready | Формальная командная/отчётная ветка доведена до результата | Command Briefing: после обычного открытия Guard появляется отдельный authored command/report вариант | Automatic content | School: 3 paid **или** 3 night-study в каждом из 2 tracks; briefing max 1/run | финальный ранг, учреждение, эпилог |
| **Guard — Reform** | Senior Guard; crisis-reform; poverty response; city dispute; resolved Guard relationship conflict; выбрать Reform | Практика участка/службы изменена конкретными решениями без morality meter | Reform Practice: дополнительные authored civic reform choices | Automatic content | max 2 reform variants/run | конкретные civic incidents/lore |
| **Guard — Network / Corruption** | Senior Guard; crisis-network; cargo evidence; sealed pass; resolved relationship conflict; выбрать Network | Построена институциональная сеть доступа/услуг | Institutional Favors | Specialist | max 2 tagged uses/run | точный тон corruption/network lore |
| **Guard — Major Case** | Senior Guard; major-case thread; relationship trust; poverty response; crisis resolved; partner support **или** Tavern evidence; выбрать Major Case | Multi-system расследование доведено до решения | Casebook Index: дополнительные hints происхождения evidence | Automatic content | max 3 hints/run | преступление/виновник/фракция |
| **Merchant — Merchant House** | Networked Merchant; supplier trust; verified manifest; manifest capability; Literacy ready; crisis resolved; выбрать House | Создан устойчивый торговый дом/сеть поставщика | House Supplier introduction | Automatic content | School 3 paid **или** 3 night-study; 1 supplier intro/run | идентичность дома/поставщика |
| **Merchant — Speculator / Smuggler** | Networked Merchant; shortage handled; risk accepted; appraisal recorded; crisis resolved; выбрать route | Высокорисковая торговая практика оформлена в самостоятельный outcome | Risk Ledger | Specialist | max 2 high-risk deals/run | товары, legal fallout |
| **Merchant — Patron of Routes** | Networked Merchant; все 5 route inputs: Lumber/Farm/Hunter/Tavern/Guard; выбрать Patron | Связана пятиисточниковая supply/access сеть | Patron Destinations | Automatic content | route_inputs=5; max 2 extra destination contexts/run | lore сети и получателей |
| **Artist — Master Artist** | Recognized Artist; performance breadth; Arts ready + Literacy ready; performance kit; выбрать Master Artist | Профессиональное мастерство/репертуар оформлены как outcome | Master Repertoire | Automatic content | 2 School tracks по 3 paid **или** 3 night; max 1 variant/season = 4/run | дисциплины, финальный title |
| **Artist — Patron Network** | Recognized Artist; mentor trust; Rhetoric ready; social breadth через mentor+Satyr+Tavern+Merchant; выбрать Patron Network | Создана устойчивая культурная сеть контактов | Salon Introductions | Specialist | School 3 paid **или** 3 night; max 1/season = 4/run | патроны/салоны |
| **Artist — Court Invitation** | Recognized Artist; Etiquette ready; court contact; formal attire; winter context; Guard context; invitation token; выбрать Court Invitation | Получено career-local придворное приглашение, **не Palace unlock** | Court Context | Automatic content | School 3 paid **или** 3 night; 1 alternate Palace intro/run **только после D23** | двор/ивент/текст |
| **Assassin — Ghost** | Trusted Blade + veteran-ready; successful infiltration return; stealth method; concealed-entry capability; выбрать Ghost | Скрытная профессиональная практика доведена до результата | Ghost Routes | Specialist | max 2 advanced contracts/run | цели и covert routes |
| **Assassin — Handler Takeover** | Trusted Blade + veteran-ready; handler utility; evidence capability; Tavern **или** Merchant **или** Guard intel; выбрать Takeover | Контроль контрактной сети переходит к героине | Contract Ledger | Specialist | max 2 contracts/run | handler/client lore |
| **Assassin — Refusal / Turncoat** | Trusted Blade + veteran-ready; Turncoat через redirect/abort+evidence **или** Refusal через refusal evidence + respected refusal + closed contract; выбрать соответствующую branch | Контрактная система осознанно перенаправлена/отвергнута | Refusal Protocol | Automatic content | refusal option max 1 tagged advanced contract/run | конкретный exposed client/эпилог |
| **Prostitute — Independent House** | Established; private-room career capability; housing context reviewed; Merchant business context; выбрать House | Создана независимая профессиональная база и собственные условия работы | Housebook | Specialist | max 2 booking previews/run | помещение, staff, presentation |
| **Prostitute — Elite Clientele** | Established; formal presence; client token; recurring-client trust; выбрать Elite | Сформирован high-status профессиональный круг клиентов без обязательной romance | Elite Protocol | Automatic content | 1 high-status intro/run | клиенты/статус-сцены |
| **Prostitute — Network / Protection** | Established; evidence capability; минимум 1 из Satyr/Tavern/Guard/Merchant support contexts; выбрать Network | Создана сеть взаимопомощи/защиты для ordinary professional work | Mutual Aid Roster | Specialist | max 2 tagged professional-risk scenes/run | состав сети/конкретные risk scenes |

---

# 16. Product decision requested

Approve / modify / reject:

1. exact 16 ending IDs;
2. selected-route persistence model;
3. School publisher rule = 3 paid OR 3 Night Study;
4. seven Specialist rewards and nine automatic content rewards;
5. exact bounded reward mechanics;
6. Refusal/Turncoat merged player-facing ending with two functional branch variants.

No production changes were made.

Disposition: **READY_FOR_LEADER_PRODUCT_DECISION**.
