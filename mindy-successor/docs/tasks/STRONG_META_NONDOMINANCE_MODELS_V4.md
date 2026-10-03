# Strong Meta Non-Dominance Models v4

Status: **READY FOR LEADER / PRODUCT DECISION**
Owner: Chat 4
Base: fresh main `2999f202e7e7fcd21f9d3f83b23b404921c41685`
Branch: `chat4/strong-meta-nondominance-models-v4`
Input audit: `chat4/strong-meta-dominance-audit-v3@a583549a88f9abf881fe130aec6d07044177eb9e`

This document turns the v3 dominance audit into three concrete pre-run selection models.

It is deliberately **not** runtime authority.

It does not:
- choose the final slot count;
- choose the final point budget;
- lock final passive-income / starting-money / School-discount values;
- create Titles;
- port original Plus Mode;
- restrict ordinary D22 Hard Work packages;
- implement any UI/runtime/save migration.

All numeric budgets below are **illustrative model examples**, not Product locks.

---

## 1. Non-negotiable authority boundaries

### Ordinary Hard Work is a separate layer

D21-D23 ordinary Hard Work packages remain outside all three strong-modifier models.

The player may activate any earned Hard Work subset:
- none;
- some;
- all ten.

No point cost, role lane, Keystone slot, exclusivity family or strong-modifier budget in this document applies to ordinary Hard Work packages.

### Strong modifiers are the D5 layer

D5 says:
- knowledge/content unlocks are automatic;
- strong rule modifiers are selectable in a limited pre-run loadout;
- exact slots/budget are still open.

Therefore a pure knowledge reward such as a Casebook-style remembered clue should not normally have to compete directly with +1 daily Energy.

### No Titles

Original ending bonuses and original Titles were separate systems.

The original Title comparison is used only as a balance warning:
a universal +1 daily Stamina/Energy effect can dominate narrow per-night stat gains.

None of these models creates a Title layer.

### No original Plus Mode

D25 remains authoritative.

Nothing here:
- mutates the ordinary job roster;
- replaces jobs in Plus Mode style;
- changes the Palace True Ending structure.

### Palace cap-200 is cap-only

D24:
- max of the 12 progression stats becomes 200 instead of 100;
- current values are not multiplied;
- starting values are not multiplied;
- Hard Work +5 effects are not multiplied;
- 10 manual creation points are not multiplied;
- Lust is outside the cap reward.

Every model treats cap-200 as an optional strong modifier with **zero immediate free stat points**.

---

## 2. Shared balance facts from v3

Locked 160-day calendar:
- base Energy = 3/day;
- baseline daytime Energy budget = 480;
- +1 daily Energy can add up to **160 Energy**;
- that is +33.3% theoretical action capacity before other constraints.

Candidate economy scale:
- starting 600 ≈ 12 WU;
- starter wage ≈ 1 WU/shift;
- normal lodging candidate ≈ 2 WU/night in the explicit-cost draft.

Candidate full-run normal-rent burden is not yet numerically locked:
- constant-rent model: 320 WU;
- escalating housing backbone: 800 WU.

Therefore:
- +1 Energy is broad action power;
- No Rent is potentially enormous economic power;
- passive income must be priced from its daily rate;
- +600 starting cash is front-loaded but much smaller in total reach;
- targeted School/Activity modifiers are narrower;
- cap-200 is late build-shaping, not opening action economy.

---

# 3. Common modifier classification

Before any model can price a modifier, the production catalog should classify it.

Recommended conceptual fields:

```text
role:
  raw_power
  economy
  access
  safety
  build_shaping

reach:
  universal
  broad
  directed
  narrow

timing:
  opening
  daily
  conditional
  late

knowledgeOnly:
  true | false

secretDebtCollision:
  none
  economy
  energy
  activity_cost
  housing
  route_bypass

palaceCollision:
  none
  access
  stat_cap
  invitation
```

This is a design schema, not a runtime ID contract.

Pure knowledge/content unlocks with `knowledgeOnly=true` are automatic under D5 unless Product explicitly decides that they change a strong rule.

---

# 4. Common precedence rule: Secret Debt Energy penalty

D19 locks:
- forced Night every night while bound;
- next-day Energy -1.

All three models require the same minimum invariant:

```text
base/max Energy after selected Meta modifiers
-> apply locked next-day Energy deltas
-> resulting usable Energy
```

Example with +1 daily Energy:

```text
normal day with perk: 4
Secret Debt next day: 4 - 1 = 3
```

The strong modifier does **not** erase the D19 delta by restoring/flooring Energy back to its enhanced maximum after the penalty.

So the bound player still loses one usable daytime action relative to the same loadout while unbound.

This document does **not** invent a stronger rule such as:
"Secret Debt always forces absolute Energy=2 even with Meta."

That would require new Product authority.

### Activity-discount collision remains separate

Trailwise-like:
`Large Activity entry 2 Energy -> 1`
can still interact strongly with a bound/street Energy state.

Therefore every model requires:
- an explicit D19 collision tag;
- a focused simulation before release;
- either Product acceptance of the interaction or an explicit incompatibility rule.

Do not silently assume the discount bypass is harmless.

---

# 5. Common precedence rule: Secret Debt economy

Passive income, No Rent, starting reserves and housing perks must not make D19's 20000 repayment a trivial wait.

For any passive income candidate `P` currency/WU per day, Product review must show:

```text
time_to_20000_with_modifier
versus
time_to_20000_without_modifier
```

and the full route's:
- bound work;
- housing;
- School;
- Activity;
- forced Night pressure.

A modifier may make the route easier because Meta progression is allowed to be powerful.

It must not accidentally turn the intended hidden route into:
"do nothing until passive money reaches 20000."

---

# 6. Common Palace protections

All three models preserve D23:

```text
10/10 ordinary Hard Work earned
+
all 10 Hard Work packages active this life
->
Day-1 Palace invitation
->
Palace access
```

No strong modifier:
- Official Access;
- False Identity;
- Court Familiarity;
- Black Route;
- Open Roads;
- any "all access" perk

may substitute for the invitation requirement.

Court Familiarity, if retained, can only affect Palace-authored content **after** D23 qualification/invitation.

Cap-200:
- does not help satisfy D23;
- changes stat ceiling only.

---

# 7. Common candidate set for model examples

These examples use already proposed successor strong concepts.

They are not all locked rewards.

### Universal/broad candidates
- Busy Crew: +1 daily Energy.
- No Rent: normal lodging cost 0.
- Network Income: passive daily money, amount still open.
- Capital: large starting money, amount still open.
- Previous-run stat carry-over, exact arithmetic open.
- Extra calendar time / +40 days, concept only and very high reach.

### Directed candidates
- Researcher: School discount / directed School advantage.
- Patronage: Arts/Etiquette School discount.
- Trailwise: first qualifying Large Activity entry each day costs 1 instead of 2.
- Ghost Step: selected covert Activity/contract risk/cost reduction.
- Second Wind: one expedition internal-resource recovery.
- Private Room: reduced-cost private lodging with strong Night access.
- Safe House: poverty recovery/Night safety.
- Protected: selected poverty/street threat alternatives.
- Field Kit: starting Activity tools.

### Access candidates
- Official Access.
- Inside Line.
- Black Route.
- Open Roads.
- False Identity.
- Warden's Eye.

### Late build-shaping
- Palace True cap-200.

### Normally automatic if kept knowledge-only
- Rumour Network visibility.
- Casebook remembered investigation knowledge.
- harmless introductions/contact discovery.
- Underclass Familiarity if it only reveals/introduces content rather than changing route rules.

---

# MODEL A — Weighted Reach Points

## 8. Core rule

Every selectable strong modifier has a point cost based on **systemic reach**, not ending prestige alone.

The pre-run setup has a point budget.

The final budget is Product-open.

For a concrete example only, this document uses an illustrative **4-point budget**.

The 4-point number is not a recommendation or lock; it exists so the model can be tested with real combinations.

---

## 9. Illustrative price bands

### Cost 3 — universal/broad rule breakers

Examples:
- +1 daily Energy;
- No Rent;
- passive income at a rate large enough to matter every day;
- broad stat carry-over;
- extra +40 days.

Why 3 in the example:
one broad modifier consumes most of the illustrative budget, so it cannot trivially stack with another broad modifier.

### Cost 2 — strong directed modifiers

Examples:
- universal School discount;
- materially discounted Private Room with full private Night access;
- cap-200;
- broad Safe House;
- broad Ghost Step if it affects many contracts/Activities.

### Cost 1 — narrow/directed modifiers

Examples:
- Trailwise;
- one-domain Patronage;
- Second Wind;
- Field Kit;
- Official Access when it opens a narrow set of city content;
- Black Route if supplier scope is narrow;
- False Identity if it adds selected resolutions rather than general immunity.

### Cost 0 / automatic

Pure knowledge/content visibility only:
- Casebook knowledge;
- Rumour Network;
- harmless introduction knowledge.

This follows D5.

---

## 10. Variable-price rules

### Passive income

Do not price "daily income" by name.

Price it from:
`160 × P`.

If its full-run value approaches:
- No Rent's housing saving;
- or hundreds of WU;

it belongs in cost 3.

A tiny/conditional income stream can be cost 1-2.

### Capital / starting money

Price against Day-1 thresholds:
- School tuition;
- lodging buffer;
- item gates.

A modest +600 / 12 WU example can be cost 1.
A much larger Capital package can become cost 2-3.

### Private Room

Price both:
- money saved;
- Night/private content retained.

If it becomes:
"free normal lodging + extra private benefits,"
it must cost at least as much as No Rent.

---

## 11. Preventing +1 Energy dominance

With illustrative budget 4:

- Busy Crew (+1 Energy) = 3;
- Trailwise = 1;
- Researcher = 2;
- Field Kit = 1;
- cap-200 = 2.

Choosing +Energy leaves room for only one cost-1 specialist.

A player can instead choose:
- Researcher 2 + cap-200 2;
- Researcher 2 + Trailwise 1 + Field Kit 1;
- Private Room 2 + Ghost Step 1 + False Identity 1.

So the broad modifier is powerful but consumes opportunity value.

---

## 12. Economy non-dominance

No Rent at cost 3 competes directly with +Energy.

Passive income with broad rate also costs 3.

Therefore an illustrative 4-point loadout cannot take:
- +Energy 3 + No Rent 3;
- No Rent 3 + broad passive income 3;
- +Energy 3 + broad passive income 3.

School discount remains cost 1-2 because:
- it is useless in a no-School run;
- it helps a specific build;
- it does not pay housing directly.

Activity discount is cost 1 because it only triggers on qualifying Activity use.

---

## 13. Secret Debt under Model A

+Energy:
- still loses exactly 1 next-day Energy while bound.

No Rent:
- may reduce general housing pressure;
- does not cancel forced Night;
- does not unlock ordinary professions;
- does not repay debt.

Passive income:
- must be priced at 3 if broad enough;
- requires explicit time-to-20000 simulation.

Trailwise:
- remains 1 only if D19 collision test shows its Activity interaction is acceptable;
- otherwise its cost or compatibility changes before Product lock.

---

## 14. Concrete example loadouts — Model A

Illustrative 4-point budget.

### Loadout A1 — General productivity

- Busy Crew / +1 Energy = 3
- Official Access = 1

Total = 4.

Best for:
- Work-heavy;
- mixed School;
- city access;
- general progression.

Weakness:
- still pays full lodging;
- no School tuition relief;
- no cap above 100;
- no expedition-specific safety.

### Loadout A2 — Scholar/explorer

- Researcher = 2
- Trailwise = 1
- Field Kit = 1

Total = 4.

Best for:
- heavy School;
- expedition starts;
- item-gated Activity.

Why it can beat A1:
a run centered on expensive School + Activity gets:
- money savings;
- entry savings;
- immediate tools.

Busy Crew gives more generic actions but not those exact access/item capabilities.

### Loadout A3 — Late stat builder

- cap-200 = 2
- Researcher = 2

Total = 4.

Best for:
- a run intentionally pushing stats beyond 100;
- School-heavy late-meta build.

Busy Crew is not a substitute for the ability to exceed 100.

### Loadout A4 — Housing/security

- No Rent = 3
- Second Wind = 1

Total = 4.

Best for:
- full normal-room use;
- expedition safety.

Under the escalating housing backbone, No Rent can be worth more economic freedom than +Energy for some survival/School strategies.

Therefore +Energy is not always correct.

---

## 15. Save representation — Model A

Conceptual only:

Permanent:
```text
earnedStrongModifierIds[]
```

Pre-run/current-life snapshot:
```text
strongLoadout: {
  model: "weighted_points"
  modelVersion: N
  activeIds[]
  resolvedCosts: {id -> points}
  budgetAtStart
}
```

Why snapshot resolved costs:
if balance changes later, an in-progress run should not become invalid mid-life.

Next new run uses the current catalog/budget.

### Migration

Current scaffolding:
- `meta.activeLegacyPerks`;
- `meta.ruleModifiers`;
- legacy/demo `vitality`;
- legacy/demo `guild`.

Migration principle:
- do not infer permanent unlocks from arbitrary raw `ruleModifiers`;
- recognize only explicitly mapped production IDs;
- preserve current-life compatibility behavior if an old save already depends on it;
- do not convert demo aliases into newly earned production modifiers without Product mapping;
- next new life requires a valid production loadout selection.

---

## 16. UI burden — Model A

Highest of the three.

UI must show:
- total budget;
- each modifier cost;
- remaining points;
- why costs differ;
- automatic knowledge separately;
- Hard Work packages separately.

Player-facing explanation must avoid implying:
"3-point ending is narratively better than 1-point ending."

The label should mean:
**systemic loadout cost**, not ending quality.

---

# MODEL B — Role Lanes + Broad-Effect Ceiling

## 17. Core rule

Each strong modifier belongs to one primary lane.

Illustrative lanes:

1. **Tempo** — actions/time.
2. **Economy** — money/housing.
3. **Access & Safety** — route/risk rules.
4. **Build** — directed progression/cap changes.

Selection rule:
- at most one active modifier per lane;
- plus a separate **Broad-effect ceiling**: at most one selected modifier tagged `universal/broad-rule-breaker`.

The number of lanes and whether every lane is available is Product-open.

The four lanes are a concrete model example, not final slot-count authority.

---

## 18. Lane mapping

### Tempo
- +1 daily Energy;
- extra +40 days;
- Trailwise if Product treats it primarily as action economy.

### Economy
- No Rent;
- passive income;
- Capital;
- Private Room if its main power is lodging savings.

### Access & Safety
- Official Access;
- False Identity;
- Ghost Step;
- Safe House;
- Protected;
- Second Wind.

### Build
- School discount;
- Patronage;
- stat carry-over;
- cap-200.

Pure knowledge:
automatic, no lane.

---

## 19. Broad-effect tag

Some modifiers receive:
`broad=true`.

Likely broad candidates:
- +1 Energy;
- +40 days;
- No Rent;
- substantial passive income;
- broad stat carry-over.

Rule:
even though +Energy is Tempo and No Rent is Economy, the same loadout cannot select both if both are tagged broad.

This prevents:
```text
+Energy + No Rent + passive income
```
from deleting both action and economy pressure simply because they occupy nominally different lanes.

---

## 20. Preventing +1 Energy dominance

+Energy does not compete with every narrow perk.

It competes:
- with other Tempo modifiers for the Tempo lane;
- with every `broad=true` modifier for the one broad-effect allowance.

So choosing +Energy means:
- no +40 days;
- no broad No Rent;
- no broad passive income;
- no broad stat carry-over.

But the player can still choose:
- one Access/Safety specialist;
- one Build specialist;
- subject to final Product lane count.

Narrow options are not made irrelevant merely because +Energy exists.

---

## 21. Economy non-dominance

Economy lane contains:
- No Rent;
- passive income;
- Capital;
- Private Room if economy-dominant.

These alternatives are mutually exclusive inside the lane.

They represent distinct timing:

### Capital
front-loaded:
best for immediate thresholds.

### Passive income
slow cumulative:
best for long runs.

### No Rent
housing-specific:
best if using normal lodging.

### Private Room
housing + access:
best for Night/private routes if it retains meaningful cost/limits.

No one economy choice is automatically correct for every run.

---

## 22. School / Activity discounts

School discount belongs Build.

Trailwise belongs Tempo **or** Build/Activity, but must have exactly one primary lane.

If Trailwise is Tempo:
it directly competes with +Energy.

This is a clean fix for the v3 pairwise dominance problem:
the player cannot take both just because Trailwise is narrow.

However, because Trailwise is narrower, Product may decide it deserves an additional benefit or softer lane rule.

That is tuning, not settled here.

Ghost Step/Second Wind remain Access/Safety because their main value is conditional risk reduction rather than daily actions.

---

## 23. Secret Debt under Model B

+Energy:
- bound day remains one Energy lower than same loadout unbound.

Broad-effect ceiling:
- prevents +Energy from stacking with broad No Rent/passive income/carry-over.

This is particularly useful for D19:
the route cannot simultaneously lose:
- its Energy pressure;
- housing pressure;
- economy pressure

to three broad selections.

Narrow safety/access effects still require D19 collision flags.

Protected/Safe House cannot:
- cancel forced Night;
- restore ordinary career access;
- erase debt.

Trailwise's Activity interaction remains an explicit Product collision check.

---

## 24. Concrete example loadouts — Model B

For illustration, assume the setup allows one choice from each shown lane but only one selected choice may carry `broad=true`.

This is an example, not final slot authority.

### Loadout B1 — Momentum build

Tempo:
- +1 Energy — `broad=true`.

Economy:
- Capital — only if Capital is tuned below broad threshold.

Access/Safety:
- False Identity.

Build:
- Patronage.

Why:
general action power plus directed Artist/social build.

Cannot add:
- No Rent if No Rent is broad;
- substantial passive income if broad.

### Loadout B2 — Economic stability

Tempo:
- Trailwise.

Economy:
- No Rent — `broad=true`.

Access/Safety:
- Second Wind.

Build:
- Researcher.

Why it beats B1 for some goals:
- normal-room School-heavy run can save enormous housing money;
- Trailwise/Second Wind specifically help expeditions;
- +Energy is not selected.

### Loadout B3 — Palace True/stat-growth focus

Tempo:
- Trailwise or no selection.

Economy:
- Capital / no selection.

Access/Safety:
- Official Access / no selection.

Build:
- cap-200.

Why:
cap-200 is uniquely valuable only when intentionally growing beyond 100.

A +1 Energy loadout cannot reproduce that capability.

---

## 25. Save representation — Model B

Conceptual:

```text
strongLoadout: {
  model: "role_lanes"
  modelVersion: N
  activeByLane: {
    tempo?: id
    economy?: id
    accessSafety?: id
    build?: id
  }
  broadActiveId?: id
}
```

Catalog entry concept:
```text
id
lane
broad
collisionTags[]
```

### Migration

If old active IDs map cleanly:
- assign each to its lane.

If two old IDs collide in one lane or both are broad:
- do not silently choose a winner for the next life;
- mark next New Start+ as requiring reselection.

For an already active in-progress legacy life:
- preserve its resolved current-life effects;
- do not retroactively deactivate one mid-run.

Unknown/demo aliases:
preserve as compatibility-only current-life state, not production unlock authority.

---

## 26. UI burden — Model B

Medium.

UI can show four visual sections:
- Tempo;
- Economy;
- Access & Safety;
- Build.

It also needs one clear global message:
**only one broad rule-breaker may be active**.

Benefits:
- player sees why +Energy and No Rent cannot stack;
- no abstract arithmetic for most choices.

Risk:
mixed modifiers need one understandable primary lane.
A perk that is half economy / half access can be confusing.

---

# MODEL C — One Keystone + Specialist Layer

## 27. Core rule

Split strong modifiers by reach rather than by detailed category.

### Keystone
A modifier that broadly changes the whole run.

Examples:
- +1 daily Energy;
- No Rent;
- substantial passive income;
- broad stat carry-over;
- extra +40 days;
- possibly full-strength Private Room if it is effectively No Rent + access.

Rule:
**one active Keystone** in the model.

This one-Keystone rule is a model-defining example, not a final project slot lock.

### Specialists
Directed or narrow strong modifiers.

Examples:
- Researcher;
- Patronage;
- Trailwise;
- Ghost Step;
- Second Wind;
- Field Kit;
- Official Access;
- False Identity;
- cap-200.

Specialists use a separate small capacity rule.

For concrete examples below, use an illustrative allowance of **two Specialists**.

That number is not Product authority.

### Automatic
Pure knowledge/content:
outside both layers.

---

## 28. Why this directly solves the +Energy warning

+Energy does not compete with Trailwise for "the one best slot."

They are different layers:

- +Energy competes with other Keystones:
  - No Rent;
  - passive income;
  - carry-over;
  - extra time.

- Trailwise competes with other Specialists:
  - Researcher;
  - Ghost Step;
  - cap-200;
  - Official Access;
  - etc.

Therefore the presence of a universally useful Keystone does not make narrow rewards feel like wasted unlocks.

The player still gets to express a specialized build.

---

## 29. Keystone tuning

Keystones must be mutually incomparable.

### Busy Crew
Strength:
actions everywhere.

Weakness:
does not pay rent automatically;
does not open routes;
does not lift stat cap.

### No Rent
Strength:
huge housing economy.

Weakness:
low value for intentional cheap/street play;
does not add actions directly;
does not lift cap.

### Passive income
Strength:
flexible money.

Weakness:
slow;
exact rate must stay below "solves everything";
may need D19 tuning.

### Broad carry-over
Strength:
Day-1 build power.

Weakness:
fixed inherited build may be less useful for a different target;
exact carry arithmetic must be constrained.

### Extra time
Strength:
deadline relief.

Weakness:
very high reach; may belong in a special late Keystone class or be removed as a candidate after Product review.

---

## 30. Cap-200 placement

Recommended within Model C:
**Specialist / late-build specialist**, not Keystone by default.

Reason:
- no Day-1 free power;
- zero value until a stat reaches 100;
- uniquely supports over-cap builds;
- does not erase survival/economy.

This placement helps make a Palace True reward usable alongside one broad meta identity without becoming automatic.

Alternative:
Product could make it a Keystone if Palace rewards are intended to force a major choice.

The model does not lock which treatment wins.

---

## 31. Economy non-dominance

Broad economy effects are Keystones:
- No Rent;
- substantial passive income;
- very large Capital if Product makes it run-defining;
- full-strength free Private Room.

They cannot stack with +Energy or one another.

Smaller/front-loaded economy effects can be Specialists only if quantitatively narrow.

Example:
+600/12-WU starting cash might be a Specialist if Product still uses it as a complex reward, because its total value is tiny compared with full No Rent.

---

## 32. School / Activity discounts

Directed School discount:
Specialist.

Trailwise:
Specialist.

Ghost Step:
Specialist.

Second Wind:
Specialist.

Because there is a specialist allowance, the player can construct:
- a School build;
- an Activity build;
- a covert build;
without sacrificing the entire strong-meta layer to +Energy.

The exact number of specialists is still Product-open.

---

## 33. Secret Debt under Model C

Only one Keystone means D19 cannot face:
- +Energy;
- No Rent;
- broad passive income

all at the same time.

That dramatically limits route deletion.

+Energy Keystone:
- forced -1 next-day still subtracts after max calculation.

No Rent Keystone:
- forced Night and career lock remain.

Passive-income Keystone:
- requires time-to-20000 validation.

Specialists:
- Protected/Safe House/Trailwise require explicit D19 collision tests.

If a Specialist is found to undermine D19 too strongly, Product can:
- mark it incompatible while bound;
- move it to Keystone;
- or narrow the effect.

No choice is made here.

---

## 34. Concrete example loadouts — Model C

Illustrative:
- one Keystone;
- two Specialists.

### Loadout C1 — Broad productivity

Keystone:
- +1 daily Energy.

Specialists:
- Official Access;
- Patronage.

Best for:
- broad action throughput;
- city access;
- targeted social/School build.

Not best for:
- cap >100;
- maximum housing savings;
- dedicated expedition safety.

### Loadout C2 — Housing/School

Keystone:
- No Rent.

Specialists:
- Researcher;
- Field Kit.

Best for:
- heavy School;
- full normal-room use;
- prepared Activity starts.

Why +Energy is not automatically better:
under the escalating housing backbone, removing up to 800 WU of lodging can free an enormous amount of work pressure while the School specialist reduces tuition.

### Loadout C3 — Long-run wealth

Keystone:
- Network Income, only after its daily rate is Product-tuned.

Specialists:
- Black Route;
- Ghost Step.

Best for:
- economy + grey-market/covert build.

Risk:
must pass Secret Debt repayment simulation.

### Loadout C4 — Over-cap explorer

Keystone:
- Capital or another opening/economy Keystone.

Specialists:
- cap-200;
- Trailwise.

Best for:
- over-100 stat goal plus expedition use.

+Energy cannot replace cap-200.
No Rent cannot replace Trailwise's Activity-specific effect.

---

## 35. Save representation — Model C

Conceptual:

```text
strongLoadout: {
  model: "keystone_specialists"
  modelVersion: N
  keystoneId?: id
  specialistIds[]
  specialistCapacityAtStart
}
```

Catalog concept:
```text
id
tier: automatic | keystone | specialist
collisionTags[]
```

### Migration

Recognized broad old effects:
map only if Product explicitly maps them to production Keystone IDs.

If more than one broad old effect is active in an in-progress save:
- preserve current-life behavior as compatibility state;
- next new run requires one Keystone selection.

Recognized narrow old effects:
map to Specialists if Product explicitly approves.

Do not use arbitrary `ruleModifiers` keys as proof that a modifier was earned.

---

## 36. UI burden — Model C

Lowest-to-medium.

New Start+ can explain:

1. **Choose one major rule change** — Keystone.
2. **Choose specialist advantages** — capacity shown separately.
3. **Automatic knowledge** — always available.
4. **Hard Work packages** — separate unrestricted section.

This maps closely to player intent:
"What kind of easier life do I want?"
then
"What route am I building around?"

Risk:
classification disputes:
a powerful Private Room or broad School modifier may move between tiers as balance changes.

---

# 37. Cross-model pricing/separation table

| Modifier | Model A: points | Model B: lane | Model C: tier | Main reason |
|---|---|---|---|---|
| +1 daily Energy | high | Tempo + broad | Keystone | universal +160 Energy |
| No Rent | high | Economy + broad | Keystone | 320–800 WU candidate saving |
| substantial passive income | high, rate-based | Economy + broad | Keystone | universal flexible money |
| large Capital | low-high by amount | Economy | Specialist or Keystone by amount | front-loaded thresholds |
| School discount | medium/directed | Build | Specialist | School-only |
| Trailwise | low | Tempo | Specialist | Activity-only |
| Ghost Step | low-medium | Access/Safety | Specialist | covert-only |
| Second Wind | low | Access/Safety | Specialist | expedition-only |
| Private Room | medium-high by cost/access | Economy | Specialist or Keystone | mixed money + Night |
| Official Access | low if narrow | Access/Safety | Specialist | route access |
| cap-200 | medium | Build | Specialist by default | no opening power, unique ceiling |
| extra +40 days | very high | Tempo + broad | Keystone | +25% calendar / +120 base Energy |
| broad stat carry-over | high | Build + broad | Keystone | Day-1 universal build power |
| pure knowledge | automatic | automatic | automatic | D5 knowledge layer |

These are relative placements, not final production costs.

---

# 38. Which model best resists specific dominance failures?

## +1 Energy versus Trailwise

### Model A
+Energy costs most of the budget; Trailwise is cheap.

Result:
Trailwise can be combined with multiple specialists.

### Model B
both occupy Tempo.

Result:
direct mutually exclusive choice.

### Model C
+Energy is Keystone; Trailwise is Specialist.

Result:
they do not compete for the same reward space and may coexist if Product permits.

All three solve the original "same one-slot price" failure differently.

---

## 39. No Rent + passive income stacking

### Model A
both high point cost; typical illustrative budget cannot hold both.

### Model B
same Economy lane; cannot hold both.

### Model C
both Keystone; cannot hold both.

All three prevent the most obvious economy deletion.

---

## 40. +Energy + No Rent stacking

### Model A
both high cost; illustrative budget blocks pair.

### Model B
different lanes but both `broad=true`; broad ceiling blocks pair.

### Model C
both Keystone; pair blocked.

This pair should be a required regression scenario whichever model is selected.

---

## 41. School discount + No Rent

This combination is intentionally less obviously forbidden.

It is a strong School/economy build.

### Model A
No Rent high + School discount medium may exceed budget depending final numbers.

### Model B
Economy + Build can coexist, but broad ceiling does not block directed School discount.

### Model C
No Rent Keystone + School Specialist can coexist.

This is a good Product tuning lever:
if the combo is too strong, adjust School modifier breadth/cost rather than making every strong modifier identical.

---

## 42. Cap-200 + +Energy

Neither universally dominates.

### Model A
may or may not fit depending final points.

### Model B
Tempo + Build can coexist unless Product tags cap-200 broad.

### Model C
+Energy Keystone + cap-200 Specialist can coexist by default.

This is a useful late-meta combination because:
- +Energy supplies more opportunities;
- cap-200 supplies new headroom;
- neither multiplies starting values.

---

# 43. Secret Debt scenario comparison

Consider a player bound by D19.

### Without strong Energy
base 3 -> forced -1 -> 2 usable Energy.

### With +1 Energy
base/max 4 -> forced -1 -> 3 usable Energy.

The penalty remains:
the same loadout loses one Energy every bound day.

The run is easier because Meta is allowed to make later lives easier.

What must not happen:
```text
apply -1
then "restore to selected max"
=> 4 again
```

That would erase D19.

### Model-specific containment

Model A:
+Energy consumes most of the point budget, limiting simultaneous economy deletion.

Model B:
+Energy uses Tempo and the broad-effect allowance.

Model C:
+Energy consumes the Keystone position.

Thus all models preserve the penalty while limiting broad stacking.

---

# 44. Migration principles common to all models

Current main has generic scaffolding:
- `meta.ruleModifiers`;
- `meta.activeLegacyPerks`;
- demo/compatibility hooks like `energy.daily`, `vitality`, `guild`.

A production migration must distinguish:

### Earned history
Which ending permanently unlocked which strong modifier.

### Setup preference
What the player selected for the next run.

### Current-run resolved snapshot
What effects this existing run actually started with.

Do not overload one array to mean all three.

Recommended conceptual separation:

```text
Permanent Meta:
earnedStrongModifierIds[]

Setup preference:
preferredStrongLoadout

Current run:
resolvedStrongLoadoutSnapshot
```

Names are illustrative.

### Current-life preservation

If an old save already has a compatibility effect active:
- preserve its current-life result;
- do not silently change stats/Energy/money mid-run.

### Future-life cleanup

On the next new run:
- only recognized production modifier IDs participate;
- unknown/demo aliases do not become permanent earned rewards;
- invalid old combinations trigger reselection rather than silent winner selection.

### Catalog versioning

Every model needs:
- model ID;
- model version;
- modifier catalog version.

An in-progress life uses its resolved snapshot.
A new life uses current Product pricing/classification.

This prevents balance patches from invalidating a running life.

---

# 45. UI burden comparison

## Model A — Weighted points

Burden: **high**.

Needs:
- point values;
- total budget;
- remaining budget;
- explanation of why effects have different costs.

Best for:
players comfortable with loadout optimization.

Risk:
looks gamey/accounting-heavy.

---

## Model B — Role lanes

Burden: **medium**.

Needs:
- clear lane headings;
- one choice per lane;
- broad-effect warning.

Best for:
explaining distinct roles.

Risk:
a mixed modifier can feel miscategorized.

---

## Model C — Keystone + Specialists

Burden: **low-medium**.

Needs:
- one strong headline choice;
- specialist capacity;
- automatic unlock section.

Best for:
clear player mental model.

Risk:
Product must decide which borderline effects are Keystone.

---

# 46. Concrete "no always-correct choice" demonstration

Use four goals.

## Goal 1 — maximum general daily throughput

Likely preference:
+1 Energy.

Why:
broad 160-day action gain.

But it does not:
- remove rent;
- lift stat cap;
- provide items/access.

---

## Goal 2 — heavy normal-room + School strategy

Likely preference:
No Rent plus a School-directed specialist, where model permits.

Why:
candidate rent savings can be 320–800 WU before School savings.

This can beat +Energy in economic pressure.

---

## Goal 3 — over-100 stat build after Palace True

Required unique value:
cap-200.

No amount of +Energy, rent relief or passive money lets a stat exceed 100 if the cap remains 100.

Therefore cap-200 is not dominated for this goal.

---

## Goal 4 — Activity/covert route

Likely preference:
Trailwise / Field Kit / Ghost Step / Second Wind combinations.

Why:
they may open or safely complete Activity routes that generic Energy cannot reproduce.

A single extra Energy does not automatically grant:
- required tool possession;
- alternate route access;
- internal expedition recovery;
- covert resolution options.

---

## Conclusion

There is no single modifier that is mathematically best for all four goals **if** broad effects are prevented from consuming the same cheap selection space as narrow specialists.

That is the core non-dominance requirement.

---

# 47. Product choice matrix

## Choose Model A if Product wants:
- one universal currency;
- fine tuning;
- quantitative balance flexibility;
- willingness to accept a more complex UI.

Key decision later:
final budget and costs.

---

## Choose Model B if Product wants:
- explicit playstyle categories;
- low arithmetic;
- hard prevention of same-role stacking.

Key decision later:
final lanes and broad-tag list.

---

## Choose Model C if Product wants:
- clearest player mental model;
- one defining major rule change;
- separate room for thematic specialists.

Key decision later:
Keystone boundary and specialist capacity.

---

# 48. Minimum acceptance criteria whichever model wins

1. Fresh profile has no unearned strong modifier.
2. Ordinary Hard Work packages remain unrestricted by strong loadout.
3. Pure knowledge/content unlocks do not waste scarce strong-power capacity.
4. +1 daily Energy never shares a cheap equal-price choice with narrow effects.
5. +1 daily Energy cannot stack freely with every broad economy/time modifier.
6. Secret Debt forced next-day -1 applies after Meta max calculation and always removes one Energy from the same loadout's unbound day.
7. Secret Debt forced Night is not cancelled by housing/safety perks.
8. Passive income has a D19 time-to-20000 regression.
9. No Rent does not remove the option to choose cheap/street content.
10. Palace access modifiers cannot substitute for D23 all-ten-active invitation.
11. cap-200 changes maximum only.
12. cap-200 does not multiply starting stats, Hard Work packages or manual creation points.
13. save/reload preserves the exact current-run resolved loadout.
14. catalog repricing does not rewrite an in-progress life.
15. invalid legacy combinations require reselection on a future New Start+, not silent arbitrary pruning.
16. no original Title system is created.
17. no original Plus Mode job replacement is created.

---

# 49. Recommended next Product decision packet

Leader/Product only needs to answer the architecture question first:

### A — Weighted Reach Points
Do strong modifiers spend a shared weighted budget?

### B — Role Lanes
Do strong modifiers occupy playstyle lanes with a broad-effect ceiling?

### C — Keystone + Specialists
Does the player choose one broad Keystone plus a separate specialist layer?

After that choice, a second pass can lock:
- final budget/capacity;
- exact modifier catalog membership;
- passive-income rate;
- Capital amount;
- No Rent/Private Room semantics;
- School discount;
- Trailwise collision with D19;
- cap-200 loadout treatment;
- migration IDs.

No runtime should be written before those decisions are locked.

---

# 50. Handoff status

The v4 deliverable is complete when this branch remains docs-only and frozen.

Expected handoff:
`READY_FOR_LEADER_PRODUCT_DECISION`.
