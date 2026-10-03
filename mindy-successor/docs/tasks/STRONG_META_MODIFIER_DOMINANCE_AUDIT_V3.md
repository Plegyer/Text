# Strong Meta Modifier Dominance Audit v3

Status: **READY FOR LEADER / PRODUCT DECISION**
Owner: Chat 4
Audit base: current main `75adf92042961be4e4eda51622123214e1c97dce`
Branch: `chat4/strong-meta-dominance-audit-v3`

This is a design/balance audit only.

It does **not**:
- implement a strong-perk loadout;
- choose a final slot count or budget;
- create or port the original Title system;
- change ordinary Hard Work package rules;
- change Palace authored content;
- change Secret Debt runtime.

Ordinary Hard Work packages remain outside the strong-modifier restriction because D22 explicitly permits any earned subset: none, some, or all.

---

## 1. Authority boundary

Current Product authority relevant to this audit:

- D5: strong rule modifiers are selectable in a limited pre-run loadout; exact slots/budget are still open.
- D18/D24: Palace True Ending permanently unlocks an **optional** 200-cap mode for the 12 progression stats. It raises only the maximum; it does not multiply current/start values, Hard Work +5 effects, or the 10 manual creation points.
- D21-D23: ordinary Hard Work packages are a separate New Start+ layer and must not be folded into strong modifier slots.
- D25: do not port the original Plus Mode/job-replacement structure.

Research clarification:
- original ending bonuses were independently toggleable;
- original Titles were a separate mechanic;
- the original +1 daily Stamina/Energy Title is useful as a **dominance warning**, not as a system to copy.

`ORIGINAL_GAME_DESIGN_PATTERNS_v1.md` explicitly warns that a universal +1 daily Energy effect can make a narrow per-night stat Title practically irrelevant.

Therefore this audit treats the successor's strong complex-ending modifiers as their own system and does not create Titles.

---

## 2. Current successor implementation state

Current main has **storage/scaffolding**, not a finished strong-loadout system.

### Meta storage already exists

`src/core/schema.ts` currently contains:
- `meta.ruleModifiers: Record<string, unknown>`;
- `meta.activeLegacyPerks: string[]` with a broad max-16 schema bound.

These are persistence primitives, not a Product-approved slot count.

### Live prototype hooks already exist

Current `src/core/engine.ts` contains:

- `energyMax()`:
  - base 3;
  - adds numeric `meta.ruleModifiers['energy.daily']`;
  - also adds +1 for legacy/demo unlock `vitality`.

- `rent()`:
  - current compatibility base 100;
  - legacy/demo unlock `guild` halves that compatibility rent.

- `freshSave()` on current main:
  - still contains old Hard Work automatic-start logic;
  - includes `satyr-maid.house-credit` +600;
  - includes the now-superseded Merchant Hard Work +600.

The queued D21-D24 shared runtime candidate `c085eda6...` removes the old Merchant Hard Work +600 / automatic Hard Work stat model. Those old Hard Work rewards are **not** strong complex-ending perks and must not be used to infer the future strong loadout.

### Integration warning

A future strong-loadout implementation must not accidentally stack:
- a new +1 Energy perk;
- arbitrary `ruleModifiers['energy.daily']`;
- old `vitality`;

or:
- a new rent modifier;
- old `guild` compatibility behavior.

The future implementation needs one canonical authority per strong effect and explicit migration/alias rules.

---

## 3. 160-day reference frame

Locked ordinary run length:
- 160 days;
- base Energy 3/day;
- baseline theoretical daytime Energy budget = **480 Energy**.

Useful candidate economy reference:
- 1 WU ≈ 50 visible currency;
- starter wage ≈ 1 WU;
- starting money 600 ≈ 12 WU;
- normal lodging candidate 2 WU/night in the explicit-cost economy draft.

Two housing/economy drafts currently imply different full-run rent magnitudes:

1. `ECONOMY_BALANCE_CANDIDATE_v3.md` constant normal room:
   - 160 × 2 WU = **320 WU**.

2. `HOUSING_AND_WAGE_BACKBONE_v1.md` escalating 2/4/6/8 WU by year:
   - 80 + 160 + 240 + 320 = **800 WU**.

Exact economy remains open, so economy-perk dominance must be expressed as a range/formula, not one fake locked number.

---

## 4. Dominance scale used here

### Direct action-equivalent impact
How many daytime Energy/action opportunities can the modifier add or save over 160 days.

### Economic action-equivalent impact
How many work shifts can be avoided because a modifier supplies/saves money.

This depends on wage tier and cannot be one fixed number.

### Access impact
How many authored/stat/item/time gates are bypassed or reached earlier.

### Safety impact
How strongly the modifier removes failure/poverty/risk pressure.

### Build-shaping impact
How strongly the modifier changes which stat/content path is efficient.

Dominance labels:

- **Universal-dominance risk** — useful for almost every goal and likely beats narrower same-price choices.
- **Conditional-dominance risk** — can dominate inside a common strategy but has meaningful goals where it is weaker.
- **Low direct dominance** — valuable mainly for a specific build/route.
- **Unbounded / cannot price yet** — exact effect is too underspecified to compare safely.

---

## 5. Strong modifier inventory and impact

### 5.1 Busy Crew — +1 daily Energy

Source:
`COMPLEX_ENDING_META_REWARD_CATALOG_v0.md` / Lumber Forewoman.

Class:
**raw power / action economy**

160-day effect:
- baseline 480 Energy;
- +1/day adds up to **160 Energy**;
- total theoretical daytime budget becomes 640;
- broad increase = **+33.3%** versus 3/day baseline.

Dominance:
**Universal-dominance risk.**

Why:
- works for Work;
- School;
- preparation;
- most ordinary actions;
- can fund more income, more stats and more route attempts;
- unlike a route perk, it almost never has a dead run.

Bypass risks:
- compresses ordinary job/stat gates;
- reduces housing/economy pressure by allowing more paid shifts;
- reduces School opportunity cost;
- weakens the practical force of next-day Energy penalties;
- can partly neutralize Secret Debt's locked next-day Energy -1 pressure if stacking semantics are careless.

Important:
Secret Debt's -1 remains a next-day modifier and must still apply. A +1 maximum should not erase or reorder that penalty.

---

### 5.2 Trailwise — first Large Activity entry each day costs 1 instead of 2 Energy

Source:
Lumber Forest Compact.

Class:
**build-shaping / access / narrow action economy**

Impact:
- saves 1 Energy on each qualifying day with a Large Activity entry;
- 20 Activity entries => 20 Energy saved;
- theoretical maximum, if used every day, = 160 Energy;
- practical impact is usage-limited by Activity cadence/content.

Dominance:
**Low-to-conditional dominance.**

Why it does not automatically dominate Busy Crew:
- no value on days without qualifying Activity entry;
- does not fund Work or School directly.

Bypass risks:
- may make 2-Energy Activity available under poverty/Secret Debt states where 1 Energy remains;
- that would materially weaken the locked D19 pressure if the discount is applied after the route's Energy penalty.

Required boundary:
decide whether Secret Debt/street "Activity unavailable at 1 Energy" is intended to remain true even with Trailwise. Do not infer this in runtime.

---

### 5.3 House Credit — +600 starting money candidate

Source:
Satyr Maid House Power.

Class:
**economy / safety / opening acceleration**

Impact at current candidate scale:
- +600 = **12 WU**;
- replaces about 12 starter-wage shifts at 1 WU/shift;
- pays about 6 candidate normal-room nights at 2 WU/night;
- effect is fully front-loaded.

Dominance:
**Low-to-conditional dominance.**

It is much smaller over 160 days than +1 Energy or No Rent, but can be stronger during the first few days because it crosses School/housing/item thresholds immediately.

Bypass risks:
- skips early poverty decisions;
- can finance early School before the intended work/savings loop;
- can reduce chance that player ever needs street/cheap lodging.

This is a complex-ending economy candidate, distinct from the superseded Merchant Hard Work +600.

---

### 5.4 Researcher — School discount or one-milestone-ahead candidate

Source:
Undead Farm Research Farmer.

Class:
**build-shaping / economy / access**

Impact if the loadout uses the `School -25%` simulation form:
- basic School 6 WU => 1.5 WU saved per lesson;
- 20 basic lessons => **30 WU** saved;
- advanced 8–12 WU lessons => 2–3 WU saved each;
- 20 advanced lessons => roughly **40–60 WU** saved.

If instead it begins a School milestone ahead, impact is access/time rather than simple money and needs separate pricing.

Dominance:
**Conditional dominance.**

Strong for School-heavy builds; weak for runs that barely use School.

Bypass risks:
- reaches late stat gates much earlier;
- can trivialize School participation requirements if "one milestone ahead" counts as paid participation rather than only access;
- must not fake Secret Debt's locked requirement of 10 **paid** lessons for its owner-kill route.

---

### 5.5 Stored Harvest — starting recurring or one-time resource package

Source:
Undead Farm Farm Successor.

Class:
**economy / starting capability**

Impact:
unbounded until exact resources and recurrence are defined.

Dominance:
**Unbounded / cannot price yet.**

A one-time small package is likely minor.
A recurring package can become passive income in disguise and must be priced on the 160-day horizon.

Bypass risks:
- item acquisition loops;
- Activity preparation;
- market/supplier routes;
- poverty economy.

---

### 5.6 No Rent — normal lodging costs 0

Source:
Tavern Innkeeper.

Class:
**economy / safety**

160-day impact:
- constant-rent draft: saves **320 WU**;
- escalating-rent backbone: saves **800 WU**.

At the housing-backbone's expected wage/rent ratio, normal lodging costs roughly the value of two expected-tier work shifts per day.
Therefore No Rent can free a very large number of daytime work actions over a full normal-room run.

Dominance:
**Universal-to-conditional dominance risk.**

It may exceed +1 Energy in action-equivalent value for a normal-room economy, but it is weaker when the player:
- intentionally uses cheap/street housing;
- earns far above expected-tier wages;
- prioritizes routes where housing money is not the bottleneck.

Bypass risks:
- destroys ordinary housing pressure;
- reduces incentive to use cheap/street routes;
- can suppress poverty/Street/Secret Debt discovery indirectly if the player is never economically pushed outside;
- can make School funding trivial relative to fresh baseline.

Required design property:
free normal lodging must remain a **choice**, not silently remove the player's ability to choose cheap/street content.

---

### 5.7 Safe House — safer cheap/street recovery, more Night access

Source:
Tavern Sanctuary.

Class:
**safety / access / housing**

Impact:
no fixed daytime Energy gain, but it preserves Night/private/recovery options in states that normally trade access for economy.

Dominance:
**Conditional dominance.**

Bypass risks:
- can erase the intended content cost of poverty;
- can undermine street-specific routes if it turns street into "free room";
- must not suppress/neutralize D19 lender eligibility or forced Secret Debt Night unless Product explicitly says so.

---

### 5.8 Field Kit — Rope Kit + Preservation Kit at start

Source:
Hunter Master Hunter.

Class:
**starting capability / access**

Impact:
one-time acquisition/cost/gate savings; exact action-equivalent depends on how those items are normally earned.

Dominance:
**Low direct dominance.**

Bypass risks:
- skips tool acquisition scenes;
- can make Activity routes available earlier;
- should not count as having completed prerequisite authored decisions unless the content only asks for possession.

---

### 5.9 Warden's Eye — extra safe/knowledge wilderness approach

Source:
Hunter Warden.

Class:
**access / safety**

Impact:
route-specific; no broad action economy.

Dominance:
**Low direct dominance.**

Bypass risks:
- removes risk from wilderness choices;
- could make one Activity solution universally safest unless its reward/route consequences remain distinct.

---

### 5.10 Second Wind — one Activity internal-resource recovery per expedition

Source:
Hunter Legend.

Class:
**safety / build-shaping**

Impact:
one internal-resource recovery per expedition.
It does **not** necessarily equal one daytime Energy.

Dominance:
**Low-to-conditional dominance.**

Strong for expedition-heavy runs, irrelevant outside them.

Bypass risks:
- can invalidate intended expedition attrition;
- can convert high-risk routes into default choices if recovery is large enough.

---

### 5.11 Official Access — legal pass for restricted city content

Source:
Guard Officer.

Class:
**access**

Impact:
skips one or more legal/access gates.

Dominance:
**Low direct dominance**, unless the pass opens many unrelated systems.

Bypass risks:
- item/certificate requirements;
- Guard/city reputation progression;
- calendar/stat gating.

It should open content, not silently mark the underlying career/relationship route as completed.

---

### 5.12 Public Trust — low-cost peaceful/support crisis option

Source:
Guard Reform.

Class:
**access / safety / build-shaping**

Impact:
route-specific; can lower resource/stat costs of selected crises.

Dominance:
**Low direct dominance.**

Bypass risks:
- if "low cost" is always best and outcome-equivalent, it deletes the original crisis decision.
- alternate route should have distinct consequences, not simply be the best button.

---

### 5.13 Inside Line — covert/grey-market contacts earlier

Source:
Guard Network / Corruption.

Class:
**access / economy**

Impact:
earlier access to contacts/suppliers; exact action and money savings unknown.

Dominance:
**Low-to-conditional dominance.**

Bypass risks:
- Merchant/Assassin supplier progression;
- legal/illegal route choice;
- item scarcity.

---

### 5.14 Casebook — selected investigation knowledge carry-over

Source:
Guard Major Case.

Class:
**access / build-shaping / knowledge**

Impact:
can skip investigation discovery steps but should not directly add daytime actions.

Dominance:
**Low direct dominance.**

Bypass risks:
- mystery content;
- evidence collection;
- choice memory.

D5 favors permanent knowledge unlocks outside the scarce strong-modifier budget where they do not change rules broadly.

---

### 5.15 Patronage — Arts / Etiquette School costs reduced

Source:
Artist / Geisha Master Artist.

Class:
**economy / build-shaping**

Impact:
same form as a directed School discount but only for selected School domains.

Dominance:
**Low-to-conditional dominance.**

It is structurally safer than a universal School discount because some builds receive little value.

Bypass risks:
- targeted Artist/Geisha stat gates;
- School money pressure.

---

### 5.16 Introductions — high-status contacts earlier

Source:
Artist / Geisha Patron Network.

Class:
**access**

Impact:
earlier relationship/social content.

Dominance:
**Low direct dominance.**

Bypass risks:
- relationship introduction milestones;
- status gates.

Should not set relationship trust/route completion automatically.

---

### 5.17 Court Familiarity — shortened/alternate Palace introduction

Source:
Artist / Geisha Court Invitation.

Class:
**access**

Current status:
**stale/conflicting unless tightly reinterpreted under D23.**

D23 now requires:
`10/10 ordinary Hard Work earned + all ten packages active -> automatic Day-1 invitation -> Palace access`.

Therefore Court Familiarity must **not**:
- substitute for all-ten-active;
- shorten the requirement;
- grant Palace access before the invitation;
- replace the invitation item/scene.

If retained, it can only alter authored content **after** the D23 qualification/invitation boundary.

Dominance:
not priceable until re-scoped.

---

### 5.18 Ghost Step — selected covert actions reduced internal cost/risk

Source:
Assassin Ghost.

Class:
**safety / build-shaping / narrow action economy**

Impact:
only covert Activity/contracts.

Dominance:
**Low-to-conditional dominance.**

Bypass risks:
- turns high-risk covert route into default route;
- can undermine item/stat preparation if both cost and risk are reduced too broadly.

---

### 5.19 Network Income — daily passive money

Source:
Assassin Handler Takeover.

Class:
**economy / raw power**

Let passive income be `P WU/day`.

160-day value:
`160 × P WU`.

Examples for scale only:
- P=1 => 160 WU;
- P=2 => 320 WU.

At P=1, the total value exceeds a +600 / 12 WU starting-money perk after 12 days.

At P=2, it equals the full 320 WU constant-rent draft over 160 days.

Dominance:
**Universal-dominance risk** unless P is small, delayed, conditional, or expensive in the loadout.

Bypass risks:
- removes work-for-survival pressure;
- finances School passively;
- reduces housing poverty;
- may make Merchant/economic play redundant;
- can trivialize a 20000-money Secret Debt repayment over long enough time if the income remains active while bound.

Required D19 check:
if passive income is allowed during Secret Debt, simulate time-to-20000. It must not turn the hidden route into waiting for automatic cash.

---

### 5.20 False Identity — extra legal/covert resolution route

Source:
Assassin Turncoat / Refusal.

Class:
**access / safety**

Impact:
route-specific alternate resolution.

Dominance:
**Low direct dominance.**

Bypass risks:
- Guard/legal consequences;
- Palace/contract restrictions;
- authored refusal/consequence routes.

The extra route should not be outcome-equivalent and strictly cheaper than every normal option.

---

### 5.21 Capital — large starting-money bonus

Source:
Merchant House.

Class:
**economy / safety / opening acceleration**

Let bonus be `C WU`.

Action-equivalent at wage `W WU/shift`:
`C / W` avoided earning shifts.

Dominance:
**Conditional dominance**, with strong front-loaded power.

Unlike passive income, it matters immediately on Day 1.
Unlike No Rent, it eventually runs out.

Bypass risks:
- early School;
- early housing security;
- item purchasing;
- poverty/Secret Debt discovery;
- Merchant progression if money itself is a gate.

Exact amount must be set against the early thresholds it crosses, not only full-run value.

---

### 5.22 Black Route — alternate suppliers / grey-market sources

Source:
Merchant Speculator / Smuggler.

Class:
**access / economy**

Impact:
supplier/item access; exact savings unknown.

Dominance:
**Low-to-conditional dominance.**

Bypass risks:
- supplier relationships;
- item scarcity;
- legal route consequences.

---

### 5.23 Open Roads — selected supplier/Activity restrictions removed earlier

Source:
Merchant Patron of Routes.

Class:
**access**

Impact:
time/gate compression, not direct raw actions.

Dominance:
**Low direct dominance** if narrow.

Bypass risks:
- calendar fallback;
- Activity preparation;
- exploration sequence.

---

### 5.24 Private Room — private lodging with strong Night availability and reduced cost

Source:
Prostitute Independent House.

Class:
**economy / access / safety**

If its nightly discount versus normal lodging is `R WU`, full-run maximum money saving is:
`160 × R WU`,
subject to actually using the room.

It also preserves private Night content, so it has more value than a pure discount.

Dominance:
**Conditional-dominance risk.**

Bypass risks:
- cheap/street tradeoffs;
- privacy progression;
- relationship lodging gates;
- poverty pressure.

If its cost reaches 0 while retaining full normal/private benefits, it effectively becomes No Rent plus extra access and likely dominates No Rent.

---

### 5.25 Introduced — high-status client/social content earlier

Source:
Prostitute Elite Clientele.

Class:
**access**

Impact:
earlier content; no broad action economy.

Dominance:
**Low direct dominance.**

Bypass risks:
- status/client progression;
- relationship introductions.

---

### 5.26 Protected — softened street/poverty risks and alternatives to selected forced threats

Source:
Prostitute Network / Protection.

Class:
**safety / access**

Impact:
can preserve options/avoid losses in poverty states.

Dominance:
**Conditional dominance.**

Major D19 risk:
must not automatically block, cancel or trivialize the locked Secret Debt route:
- lender encounter rules;
- 10-day activation;
- 20000 debt;
- ordinary-career lock;
- forced Night.

Any Secret Debt exception requires explicit Product authority.

---

### 5.27 Never Again — emergency reserve or alternate lender refusal/payment option

Source:
Secret Debt paid_freedom.

Class:
**safety / economy**

Impact:
depends completely on reserve/payment amount and trigger timing.

Dominance:
**Unbounded / high route-bypass risk.**

It can be a good thematic reward, but an alternate payment/refusal must not accidentally make the hidden route impossible to enter when a player intentionally wants it.

Safer shape conceptually:
player-controlled option at the lender decision, not an invisible permanent cancellation.

Exact implementation remains Product-owned.

---

### 5.28 Underclass Familiarity — poverty contacts/routes earlier

Source:
Secret Debt bound_life.

Class:
**access / knowledge**

Impact:
earlier hidden-route content.

Dominance:
**Low direct dominance.**

Bypass risks:
- surprise/discovery pacing;
- lender encounter sequence;
- route flags.

Should reveal/route content without pretending the debt was accepted or activated.

---

### 5.29 Debt Network — powerful underworld/economic modifier

Source:
Secret Debt takeover.

Class:
**economy / access / raw rule change**

Impact:
not specified enough to price.

Dominance:
**Unbounded / cannot approve for equal-price loadout yet.**

Before Product lock it needs:
- exact money effect;
- exact access effect;
- whether it changes debt rules;
- whether it acts while Secret Debt is active;
- whether it changes supplier/contract routes.

---

### 5.30 Palace True cap-200 option

Source:
D18 + D24, locked effect.

Class:
**build-shaping / late raw ceiling**

Direct 160-day action-economy effect:
**0**.

It gives:
- no starting stat points;
- no extra Energy;
- no money;
- no multiplied Hard Work bonus;
- no multiplied manual allocation.

Its value equals only the stat gains that would otherwise be clipped at 100.

Dominance:
**Low early dominance / potentially very strong late-build value.**

This is a good example of a powerful modifier that does not universally dominate +Energy/economy choices.

Bypass risks:
- any condition written as "percentage of current cap" rather than intended fixed Product threshold;
- stat-based content that was authored assuming 100 is an absolute maximum;
- UI mistakenly saying "stats doubled."

Required invariant:
copy must say **maximum becomes 200**, not "stats are doubled."

---

## 6. Additional strong concepts from Meta Loadout Model v1

These are examples in the loadout draft, not locked rewards.

### 6.1 25% previous-run stat carry-over

Class:
**raw power / build-shaping**

Impact:
semantics are not defined precisely enough to implement.

If interpreted literally as carrying 25% of each prior stat and the prior run had all twelve stats at 100, that represents up to 25 points × 12 = **300 stat-points of carried state**.

That number is only a scale warning; exact carry-over semantics are open.

Dominance:
**Universal-dominance risk.**

Bypass risks:
- ordinary job gates;
- School demand;
- career build identity;
- D18 high-stat challenge if the carried values are allowed into Palace qualification without careful Product intent.

Do not implement until "25% carry-over" has exact arithmetic, cap and timing semantics.

---

### 6.2 Extra year / +40 days

Class:
**raw power / time**

160-day impact:
- +40 days = +25% calendar length;
- at base 3 Energy/day = **+120 Energy** before any Energy modifier;
- also adds 40 more housing nights, events and progression opportunities.

Dominance:
**Very high universal-dominance risk.**

It changes both action economy and deadline pressure.
For many ending goals it can be stronger than a narrow route perk even if it adds no money directly.

Bypass risks:
- any ending intended to be difficult because of 160-day timing;
- 50-shift pacing;
- calendar fallback gates;
- relationship/event cadence;
- annual/seasonal authored structure.

This concept should never be treated as a normal same-price "one slot" peer without explicit high opportunity cost.

---

### 6.3 Generic advanced starting item package

Class:
**starting capability / access**

Impact:
depends on item acquisition path.

Dominance:
usually **low-to-conditional** if thematic and narrow.

Risk:
if an item is the only gate for many Activities/routes, the package becomes a broad access modifier and should be repriced accordingly.

---

### 6.4 Generic special Activity access

Class:
**access**

Impact:
content unlock rather than raw action economy.

Dominance:
low if it opens optional content; higher if that content is a superior universal economy/stat farm.

Any unlocked Activity must be audited for repeatable yield before the access perk is considered narrow.

---

## 7. Pairwise dominance findings

### 7.1 +1 daily Energy versus narrow nightly/stat effects

This is the central warning from the original Title research.

+1 Energy:
- up to +160 meaningful daytime actions;
- funds stats, money, School and routes indirectly.

A narrow "+1 stat after Night" effect:
- helps one axis;
- may cap;
- cannot substitute for money/action access.

If priced identically, +1 Energy is an obvious best choice for most goals.

Conclusion:
do not reproduce an equal-price Title-like layer.

---

### 7.2 Passive income versus one-time starting cash

If passive income is P WU/day and starting cash is 12 WU:

break-even day:
`12 / P`.

At P=1 WU/day:
passive income exceeds +600 after Day 12.

Starting cash still has a legitimate incomparable strength:
it is available **before** Day 1 decisions and can cross an immediate threshold.

Therefore starting cash remains viable only if early threshold access matters enough or passive income costs materially more.

---

### 7.3 No Rent versus passive income

No Rent value equals actual lodging spend avoided.

Passive income can be spent anywhere.

If passive income per day is high enough to cover normal rent, it can strictly dominate No Rent because it can also fund School/items.

Therefore a broad passive-income perk must not be priced the same as No Rent once its daily amount approaches normal lodging cost.

No Rent remains meaningfully distinct if:
- passive income is materially smaller;
- housing has non-money rules;
- No Rent changes lodging access/reliability rather than just cash.

---

### 7.4 No Rent versus Private Room

If Private Room:
- has zero cost;
- preserves full/private Night access;
- adds no meaningful drawback;

then it is No Rent plus extra access and therefore strictly dominates No Rent.

Private Room must either:
- retain a cost;
- differ in content/availability;
- or be priced as the broader effect.

No exact value is chosen here.

---

### 7.5 +1 Energy versus Trailwise

At identical cost:
+1 Energy dominates Trailwise on every non-Activity day and ties its 1-Energy saving on a qualifying Activity day.

Trailwise is only competitive if:
- it is cheaper in the loadout;
- it gives an additional Activity-specific capability;
- or category rules prevent direct same-price comparison.

This is a concrete dominance bug in a flat equal-slot model.

---

### 7.6 +1 Energy versus School discount

+1 Energy is broad.
School discount is targeted.

The old simulation still found both useful, but +1 Energy accelerated every listed late-career target more strongly than School -25% in most cases.

A flat equal-price loadout therefore biases toward +Energy unless the player has a clearly School-heavy target.

---

### 7.7 Extra +40 days versus most narrow perks

+40 days adds:
- +25% run duration;
- +120 baseline Energy;
- more time for every gate.

It is not safely comparable as a normal same-price perk.

It should be considered a very-high-reach modifier requiring either:
- a high budget cost;
- an exclusivity family;
- or exclusion from the ordinary strong-perk pool.

No final treatment is chosen here.

---

### 7.8 Cap 200 versus +1 Energy

Neither strictly dominates the other.

+Energy:
- immediate;
- broad;
- strongest before caps.

Cap 200:
- zero immediate value;
- only matters when a build reaches 100;
- enables stat-growth goals impossible under cap 100.

This is the type of late, goal-specific power that creates a real build choice.

---

## 8. Major route/content bypass matrix

### Ordinary job progression
At risk from:
- +1 Energy;
- stat carry-over;
- School discounts;
- Open Roads / Official Access style gates;
- starting money enabling accelerated School.

Requirement:
strong modifiers may make content earlier, but should not silently mark career milestones/choices as completed.

### Housing / poverty
At risk from:
- No Rent;
- Private Room;
- Safe House;
- passive income;
- large starting capital.

Requirement:
economic easing must not delete the player's ability to intentionally choose cheap/street routes.

### Secret Debt
At risk from:
- passive income;
- Never Again;
- Protected;
- Safe House;
- Trailwise if it defeats the intended Energy pressure;
- Debt Network.

Locked D19 facts must remain authoritative unless later Product decisions explicitly change them.

### Palace
At risk from:
- Court Familiarity;
- Official Access / False Identity if treated as generic "restricted access";
- stat carry-over;
- cap-200 semantic mistakes.

D23 all-ten-active Day-1 invitation cannot be substituted by another access modifier.

D25 forbids using original Plus Mode job mutations as Palace requirements.

### School
At risk from:
- universal School discount;
- Patronage;
- Researcher milestone skip;
- passive income;
- No Rent;
- +Energy.

Paid-lesson requirements must count actual paid lessons when Product says "paid lessons."

### Large Activity
At risk from:
- Trailwise;
- Second Wind;
- Ghost Step;
- Field Kit;
- Open Roads;
- Warden's Eye.

Need combined-cost tests so multiple perks do not accidentally reduce a designed challenge to zero cost/zero risk.

### Relationship / authored choice consequences
At risk from:
- Clear Terms;
- Public Trust;
- False Identity;
- Protected.

An extra safe choice should have authored identity/consequences; it should not simply be a free best outcome.

---

## 9. Classification summary

### Raw power / universal action economy
Highest dominance concern:
- +1 daily Energy;
- extra +40 days;
- literal broad stat carry-over;
- sufficiently large passive income.

### Economy
Potentially huge but strategy-sensitive:
- No Rent;
- passive income;
- Capital;
- House Credit;
- Private Room discount;
- Never Again reserve;
- School discounts.

### Access
Usually safe if narrow:
- Official Access;
- Inside Line;
- Introductions;
- Black Route;
- Open Roads;
- Warden's Eye;
- False Identity;
- Underclass Familiarity;
- specific starting items.

### Safety
Can erase authored pressure if too broad:
- Safe House;
- Second Wind;
- Ghost Step;
- Protected;
- Never Again.

### Build-shaping
Best source of incomparable choices:
- cap 200;
- targeted School discount;
- Trailwise;
- specialized Activity recovery;
- thematic items;
- narrow route options.

---

## 10. What should be automatic versus scarce

D5 already distinguishes:
- knowledge/content unlocks: automatic;
- strong rule modifiers: selectable in limited pre-run loadout.

Therefore the audit recommends preserving this semantic split.

Good automatic candidates, if they are truly knowledge/content only:
- Rumour Network visibility;
- Casebook knowledge;
- Introductions/contact visibility;
- Underclass Familiarity;
- narrow route knowledge.

Candidates that should **not** become automatic without another balance pass:
- +1 daily Energy;
- No Rent;
- passive income;
- large Capital;
- broad School discount;
- stat carry-over;
- extra calendar time;
- Private Room if it combines major discount + full access;
- Debt Network;
- cap 200 remains optional by D24.

This is a classification recommendation, not final Product lock.

---

# 11. Viable loadout model A — role-separated category budget

Core idea:
strong perks are not all interchangeable "one slot."

Assign each selectable strong modifier one primary role:
- action/time power;
- economy/housing;
- access/safety;
- build-shaping.

The loadout has a Product-defined budget/capacity later.

Anti-dominance rule:
broad universal modifiers consume more of their role's capacity than narrow modifiers, and the UI makes category use visible.

Examples:
- +1 Energy = high-cost action/time;
- extra +40 days = very-high-cost action/time;
- No Rent = high-cost economy/housing;
- passive income = cost determined by P WU/day;
- Trailwise = lower-cost build/activity;
- cap 200 = late build-shaping;
- narrow route access = low-cost or automatic if it is knowledge/content.

Advantages:
- preserves heterogeneous rewards;
- does not need fake numerical nerfs;
- ordinary Hard Work packages remain outside the budget;
- avoids treating Trailwise and +1 Energy as equal-price peers.

Risks:
- UI is more complex than flat slots;
- category labels need clear Product language;
- exact budget remains open.

This model does **not** choose a final slot/budget count.

---

# 12. Viable loadout model B — impact-weighted opportunity-cost points

Core idea:
price each strong modifier by estimated 160-day systemic reach.

Reference dimensions:
- action Energy added/saved;
- WU added/saved;
- number/breadth of route gates bypassed;
- whether effect is universal or conditional;
- whether it also removes safety pressure.

Illustrative relative pricing logic, not numeric prices:
- extra +40 days > +1 daily Energy in reach;
- +1 daily Energy > Trailwise;
- passive income cost rises with P;
- No Rent cost tracks actual housing backbone;
- +600 starting cash is much cheaper than daily income;
- targeted School discount cheaper than universal School discount;
- narrow access perks cheap or automatic;
- cap 200 priced for late build identity, not early action equivalence.

Advantages:
- directly attacks dominance;
- easy to retune when economy numbers lock;
- multiple narrow perks can compete with one broad perk.

Risks:
- requires balance data;
- point values can look arbitrary if UI does not explain them;
- route-access value is harder to convert to one scalar.

Budget total remains Product-open.

---

# 13. Viable loadout model C — exclusivity families plus automatic knowledge

Core idea:
avoid a universal point system; define only the combinations that are strategically dangerous.

Automatic:
- pure knowledge;
- harmless contacts;
- visibility;
- content discovery.

Selectable strong families:

### Action/time family
Examples:
- +1 daily Energy;
- extra calendar time;
- broad stat carry-over if approved.

### Economy/housing family
Examples:
- No Rent;
- daily passive income;
- large Capital;
- full-strength Private Room.

### Route/safety family
Examples:
- broad Protected;
- Debt Network;
- unusually broad access modifiers.

### Build specialist family
Examples:
- cap 200;
- Trailwise;
- targeted School/Activity perks.

Anti-dominance mechanism:
effects in the same high-overlap family can be mutually exclusive or consume the same family allowance.

Advantages:
- easy mental model;
- prevents stacking "No Rent + high passive income + huge Capital" into one automatic economy deletion;
- preserves narrow thematic modifiers.

Risks:
- family boundaries can feel arbitrary;
- cross-family combinations can still create emergent dominance;
- requires explicit pairwise regression tests.

Exact number of families active at once and exact capacity are **not chosen here**.

---

## 14. Model comparison

| Model | Best property | Main weakness | Good fit if Product wants |
|---|---|---|---|
| A — category budget | clear roles, adjustable breadth | more UI rules | visible strategic loadout construction |
| B — impact points | most tunable against dominance | balancing overhead | quantitative long-term balancing |
| C — exclusivity families | simplest anti-stack rule | family edge cases | low-complexity player-facing choices |

All three can satisfy D5.

None require Titles.

None restrict ordinary D22 Hard Work package selection.

---

## 15. Required future simulations before runtime implementation

Whatever model Product chooses, simulate at least:

### Fresh-equivalent strong-perk comparison
Compare one modifier at a time against:
- 480 baseline Energy;
- current housing/economy backbone;
- 10 / 20 School lessons;
- 10 / 20 Activity entries;
- starter/mid/late job access.

### Common pair combinations
At minimum:
- +Energy + No Rent;
- +Energy + passive income;
- No Rent + passive income;
- No Rent + Private Room;
- +Energy + Trailwise;
- School discount + No Rent;
- stat carry-over + +Energy;
- cap 200 + stat carry-over.

### Secret Debt collision simulation
Measure:
- days to 20000 with passive income;
- whether 1-Energy Activity becomes possible under route penalties with Trailwise;
- whether housing perks prevent route discovery;
- whether Protected/Never Again silently disable the route.

### Palace collision simulation
Verify:
- no access perk substitutes for D23 all-ten-active;
- cap 200 does not alter D23;
- cap 200 does not multiply starting/package values;
- Court Familiarity, if retained, acts only after invitation qualification.

### Content-preservation simulation
For each strong modifier:
- list scenes/routes that become unreachable;
- verify the player can opt out before the run;
- verify selecting the modifier does not silently erase earned history.

---

## 16. Product decisions still required

This audit intentionally does not decide:

- final strong-loadout slot count;
- final point budget;
- which of models A/B/C is chosen;
- exact +1 Energy reward ownership/name;
- exact passive-income amount/timing;
- exact Capital amount;
- exact No Rent implementation against final housing economy;
- exact Private Room discount/access shape;
- exact Researcher/Patronage School discount;
- exact stat carry-over arithmetic;
- whether extra +40 days remains a candidate at all;
- exact Debt Network effect;
- final classification of mixed access/safety perks as automatic vs selectable;
- how the optional cap-200 reward consumes strong-loadout capacity.

---

## 17. Leader/Product decision packet

The key findings are:

1. A flat equal-slot model is unsafe.
   - +1 daily Energy can add 160 Energy.
   - Trailwise only saves Energy on qualifying Activity days.
   - making both "one slot" creates a predictable broad-wins problem.

2. No Rent is at least as dangerous as +Energy, not a minor economy perk.
   - candidate full-run housing saving ranges from 320 to 800 WU depending which economy backbone is ultimately locked.

3. Daily passive income must be priced from its rate.
   - at 1 WU/day it yields 160 WU and beats a +600/12-WU start bonus in total value after Day 12.

4. Extra +40 days and broad stat carry-over are extreme-reach concepts.
   - they should not be casually priced alongside narrow route perks.

5. D24 cap 200 is powerful but naturally non-dominant early.
   - it is a useful build-shaping option because it adds headroom, not free actions.

6. Pure knowledge/content access should generally remain outside scarce strong-power competition under D5.
   - charging scarce capacity for a Rumour/Casebook-style knowledge unlock while +Energy costs the same would make the knowledge reward unattractive.

7. Secret Debt and Palace need explicit hard boundaries.
   - economy/safety perks cannot silently dissolve D19;
   - access perks cannot substitute for D23.

8. Ordinary Hard Work packages remain completely separate.
   - no slot/budget restriction from this audit applies to D22.

9. Do not create Titles.
   - the original Title system is only a research warning about dominance.

---

## 18. Handoff status

This document is ready for Leader/Product to choose:
- loadout structure;
- which mixed candidates are automatic knowledge versus strong selectable rules;
- later exact slot/budget numbers.

No runtime implementation should begin until those decisions are locked.
