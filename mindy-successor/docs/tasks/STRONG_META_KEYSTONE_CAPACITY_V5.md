# Strong Meta — Keystone / Specialist Capacity v5

Status: **READY FOR LEADER / PRODUCT DECISION**
Owner: Chat 4
Branch: `chat4/strong-meta-keystone-capacity-v5`
Dispatch base: `main@0c8926049a4b4ee4fda0574cea588d39f39dd14e`
Audited current authority: `main@3982adab8d259106b5c19e06d2eb97549bb30753`
Accepted input: `chat4/strong-meta-nondominance-models-v4@1dda2de690e889fed0ce4d76ebcda1e7f62e37da`

## Decision question

D27 already locks the architecture:

- a new run may activate **at most one Keystone**;
- separately, it may activate a limited number of **Specialists**;
- pure knowledge/content unlocks are automatic;
- ordinary D21-D23 Hard Work packages remain a separate unrestricted earned-subset layer;
- cap-200 is Specialist-class by default;
- +1 daily Energy, No Rent, substantial passive income, extra calendar time and broad stat carry-over are Keystone-class if those rewards are ever approved;
- Secret Debt forced next-day Energy -1 remains effective after any selected Energy modifier;
- no safety/housing effect cancels Secret Debt forced Night;
- no access modifier substitutes for D23 Palace qualification.

The remaining question here is exact Specialist capacity:

**1 vs 2 vs 3**.

No runtime/UI implementation is made in this branch.

---

# 1. Recommendation

## Recommend: **2 Specialists**

The recommended New Start+ strong-Meta shape is:

```text
0..1 Keystone
+
0..2 Specialists
+
automatic knowledge/content unlocks
+
ordinary Hard Work packages: any earned subset, independently
```

Why 2 is the best balance point:

- capacity 1 creates too much competition between a route/build specialist and the Palace cap-200 reward;
- capacity 2 permits a genuine build pair while preserving a meaningful opportunity cost;
- capacity 3 commonly covers three directed systems at once and substantially reduces the need to specialize;
- one-Keystone already contains universal power stacking, so Specialists should provide **direction**, not reconstruct another universal layer through accumulation.

This recommendation is a Product proposal, not yet runtime authority.

---

# 2. Candidate test vocabulary

The following are **test cases**, not approved reward catalog entries.

## Keystone test cases

Broad/run-defining:
- **Busy Crew** — +1 daily Energy.
- **No Rent** — normal lodging costs 0.
- **Network Income** — substantial passive daily income.
- **Capital** — large Day-1 starting money if large enough to bypass multiple core pressures.
- **Extra Time** — extra calendar time such as the old +40-day candidate.
- **Broad Carry-over** — broad previous-run stat carry-over.

D27 already establishes that effects of this breadth are Keystone-class if approved.

## Specialist test cases

Directed/narrow:
- **Researcher** — directed School discount/advantage.
- **Patronage** — one-domain School discount.
- **Trailwise** — first qualifying Large Activity entry each day costs less.
- **Field Kit** — starting Activity tools.
- **Second Wind** — expedition internal-resource recovery.
- **Ghost Step** — selected covert risk/internal-cost reduction.
- **Official Access** — narrow legal/city access.
- **False Identity** — selected alternate legal/covert resolutions.
- **Safe House / Protected**, only if narrowly bounded and unable to cancel D19.
- **cap-200** — Palace True reward, maximum becomes 200 instead of 100; no free starting stats.

Pure knowledge-only candidates such as remembered clues/visibility are outside Specialist capacity.

---

# 3. Evaluation criteria

Each capacity is tested against five goal families:

1. **Work-heavy** — maximum ordinary-career throughput while retaining a build identity.
2. **School-heavy** — tuition/stat-growth focused.
3. **Activity/covert** — expedition/tools/covert safety/access.
4. **Economy** — housing/cash pressure.
5. **Palace cap-200** — a run that intentionally wants over-100 stat growth.

For each capacity, the question is not:
"Can the player become strong?"

Meta progression is intended to make later lives easier.

The question is:
"Does the selection still require a meaningful build choice?"

---

# 4. Capacity 1

## Rule

```text
0..1 Keystone
0..1 Specialist
```

Hard Work packages remain separate and unrestricted.

## Representative loadouts

### Work-heavy

Keystone:
- Busy Crew (+1 Energy).

Specialist:
- Official Access or one targeted career/access specialist.

Result:
strong general throughput but only one directed advantage.

### School-heavy

Keystone:
- No Rent or Busy Crew.

Specialist:
- Researcher.

Result:
coherent School strategy.

Problem:
if cap-200 is earned and the player wants an over-100 School build, Researcher and cap-200 directly exclude each other.

### Activity/covert

Keystone:
- Busy Crew or economy Keystone.

Specialist:
- Trailwise **or** Field Kit **or** Ghost Step **or** Second Wind.

Result:
the player gets only one part of an Activity build.

This is strongly restrictive for content whose specialist pieces solve different problems:
- entry cost;
- equipment access;
- internal expedition recovery;
- covert risk.

### Economy

Keystone:
- No Rent / substantial passive income / large Capital.

Specialist:
- one directed access/safety perk.

Result:
economy is contained well.

### Palace cap-200

Keystone:
- any.

Specialist:
- cap-200.

Result:
cap-200 consumes the entire Specialist layer.

The player cannot pair the Palace reward with:
- a School specialist for over-100 stat training;
- an Activity specialist for an explorer build;
- a narrow access modifier.

---

# 5. Capacity-1 strengths

- strongest anti-stack containment;
- simplest UI;
- simplest validation;
- lowest combinatorial QA burden;
- every Specialist selection is visibly consequential.

---

# 6. Capacity-1 weaknesses

## Palace reward crowding

D27 intentionally places cap-200 in Specialist class.

With capacity 1:
- choosing cap-200 removes every other directed specialist;
- not choosing it makes a difficult Palace True reward potentially sit unused in many builds.

That is not inherently invalid, but it makes the optional Palace reward carry an unusually high opportunity cost.

## Directed systems feel incomplete

Activity/covert concepts are naturally decomposed:
- Trailwise = entry economy;
- Field Kit = equipment access;
- Second Wind = expedition recovery;
- Ghost Step = covert safety.

One slot makes these behave more like mutually exclusive sub-classes than combinable route tools.

## Keystone becomes proportionally more dominant

If the player gets:
- one broad Keystone;
- only one Specialist;

then the Keystone determines most of the run's Meta identity.

That weakens the D27 goal of having a separate specialist layer with meaningful build expression.

---

# 7. Capacity-1 dominance result

### Broad-stack containment
Excellent.

+1 Energy cannot stack with:
- No Rent;
- substantial passive income;
- large broad Capital;
- Extra Time;

because those are alternative Keystones.

### Always-correct Specialist
No universal Specialist exists.

But there is a **selection-pressure problem**:
cap-200 is likely to be skipped unless the run is explicitly built around exceeding 100.

Capacity 1 therefore avoids dominance by being highly restrictive, but risks making Specialist unlocks feel mutually cannibalizing.

---

# 8. Capacity 2

## Rule

```text
0..1 Keystone
0..2 Specialists
```

Hard Work packages remain separate and unrestricted.

This is the recommended capacity.

---

# 9. Representative capacity-2 loadouts

## Work-heavy

### W1 — general career throughput

Keystone:
- Busy Crew.

Specialists:
- Official Access;
- one targeted route/build specialist.

Properties:
- strong daily throughput;
- one access accelerator;
- one route identity.

Still missing:
- No Rent;
- passive income;
- Extra Time;
because they compete for Keystone.

### W2 — high-stat work build

Keystone:
- Capital or another approved economy Keystone.

Specialists:
- cap-200;
- one career/School specialist.

Properties:
- can build beyond 100;
- still has one directed growth tool.

This is a meaningful alternative to Busy Crew rather than a strictly worse copy.

---

## School-heavy

### S1 — School + late-stat growth

Keystone:
- No Rent **or** Busy Crew.

Specialists:
- Researcher;
- cap-200.

This is the strongest argument for capacity 2.

Researcher makes School more efficient.
cap-200 makes over-100 training meaningful.

Neither alone reproduces the other.

### S2 — School + access

Keystone:
- large Capital or Busy Crew.

Specialists:
- Researcher;
- Official Access.

Best for a run that wants School plus specific city/legal content but does not care about >100 stats.

The player must give up cap-200 to take both directed benefits.

That is a real opportunity cost.

---

## Activity/covert

### A1 — expedition setup

Keystone:
- Busy Crew or economy Keystone.

Specialists:
- Trailwise;
- Field Kit.

One specialist reduces repeated Activity entry cost.
The other grants starting equipment/access.

This is a coherent Activity identity.

### A2 — expedition endurance

Keystone:
- No Rent / Busy Crew.

Specialists:
- Trailwise;
- Second Wind.

This chooses repeated entry efficiency + expedition recovery.

It gives up:
- Field Kit;
- Ghost Step;
- cap-200;
- School discount.

### A3 — covert build

Keystone:
- economy Keystone.

Specialists:
- Ghost Step;
- False Identity.

Strong for covert route play, but weak for School and over-cap stat growth.

---

## Economy

Broad economy remains Keystone territory.

### E1 — housing economy

Keystone:
- No Rent.

Specialists:
- Researcher;
- Official Access.

The run gains housing relief plus directed School/access value.

It cannot also take:
- passive income;
- +1 Energy;
- Extra Time;
- another broad Capital Keystone.

### E2 — front-loaded economy

Keystone:
- Capital, **only if its approved amount is broad enough to be Keystone-class**.

Specialists:
- Field Kit;
- Researcher.

This favors Day-1 threshold crossing rather than full-run rent removal.

### Borderline small Capital

If Product later creates a **small** one-time reserve that affects only one narrow opening:
it may be Specialist-class.

But capacity 2 then forces it to compete with other Specialists.

Classification rules are defined below; no amount is locked here.

---

## Palace cap-200

### P1 — Palace True scholar

Keystone:
- No Rent / Busy Crew / other approved Keystone.

Specialists:
- cap-200;
- Researcher.

### P2 — Palace True explorer

Keystone:
- Busy Crew / Capital.

Specialists:
- cap-200;
- Trailwise.

### P3 — Palace True covert

Keystone:
- economy Keystone.

Specialists:
- cap-200;
- Ghost Step.

In all three:
cap-200 is meaningfully selectable without becoming automatic.

Choosing it still costs **half** the Specialist capacity.

That is substantial but not punitive.

---

# 10. Capacity-2 strengths

- preserves a clear Keystone vs specialist identity;
- lets a player combine two complementary narrow effects;
- lets cap-200 pair with one thematic build specialist;
- retains strong opportunity cost because a third specialist remains unavailable;
- blocks broad stacking through the one-Keystone rule;
- manageable UI and QA complexity.

---

# 11. Capacity-2 weaknesses

- some focused Activity builds will want a third piece;
- specialist pairs need pairwise collision tests;
- poorly classified "broad-but-called-directed" effects could become a hidden second Keystone.

This means **classification quality is essential**.

Capacity 2 is not safe if Product lets a near-universal effect masquerade as a Specialist.

---

# 12. Capacity-2 always-correct pair audit

A pair is a problem if it is correct across unrelated goals.

Candidate pairs:

### Researcher + Trailwise
School + Activity.

Not universal:
- weak in pure work/economy runs;
- irrelevant if the player skips School or Large Activity;
- gives no cap >100.

### Researcher + cap-200
School + late ceiling.

Not universal:
- cap-200 has zero value until a stat reaches 100;
- Researcher has low value outside School;
- gives no Activity safety/access.

### Trailwise + Field Kit
Activity entry + equipment.

Strong **inside Activity builds**, but that is desired specialization, not universal dominance.

### Ghost Step + False Identity
Covert safety + resolution access.

Strong **inside covert builds**, but route-specific.

### Official Access + Researcher
city access + School.

Not universal.

### cap-200 + Trailwise
late-stat ceiling + Activity.

Not universal.

## Result

Under D27 classification rules, no obvious two-Specialist pair is always correct across:
- work;
- School;
- Activity;
- economy;
- Palace goals.

Capacity 2 preserves meaningful specialization.

---

# 13. Capacity 3

## Rule

```text
0..1 Keystone
0..3 Specialists
```

Hard Work remains separate.

---

# 14. Representative capacity-3 loadouts

## Work-heavy

Keystone:
- Busy Crew.

Specialists:
- Official Access;
- Researcher;
- cap-200.

This loadout now covers:
- universal daily throughput;
- access;
- School efficiency;
- over-100 ceiling.

Very few non-Activity systems remain outside the loadout.

---

## School-heavy

Keystone:
- No Rent.

Specialists:
- Researcher;
- cap-200;
- Official Access or Patronage.

This gives:
- housing relief;
- School efficiency;
- over-cap growth;
- another School/access benefit.

The third Specialist begins to reduce the tradeoff between:
"build efficiency"
and
"content access."

---

## Activity/covert

Keystone:
- Busy Crew or economy Keystone.

Specialists:
- Trailwise;
- Field Kit;
- Second Wind.

This is a full expedition package:
- entry discount;
- starting tools;
- internal recovery.

For a player intending substantial Activity play, the triple is close to an obvious default.

Alternative covert triple:
- Trailwise;
- Ghost Step;
- False Identity.

Again, much of the Activity/covert specialist space can be covered simultaneously.

---

## Economy

Keystone:
- No Rent / passive income / large Capital.

Specialists:
- Researcher;
- Official Access;
- cap-200.

The Keystone already solves a broad economy axis.
Three Specialists then cover:
- School;
- access;
- late stat ceiling.

This creates an all-purpose late-run package with relatively little remaining opportunity cost.

---

## Palace cap-200

Keystone:
- any approved Keystone.

Specialists:
- cap-200;
- Researcher;
- Trailwise.

The Palace reward consumes only one third of Specialist capacity.

That makes it easy to include almost by default once earned.

The optional reward risks becoming "why not turn it on?" rather than a real build choice.

---

# 15. Capacity-3 strengths

- high build expression;
- many earned rewards can be used simultaneously;
- cap-200 is easy to include;
- Activity/covert packages feel complete;
- less player frustration from mutually exclusive directed perks.

---

# 16. Capacity-3 weaknesses

## Specialist layer starts recreating broad power through composition

Three individually narrow effects can span:
- School;
- Activity;
- access/safety;
- cap ceiling

at the same time.

The one-Keystone rule still prevents broad **resource** stacking, but the Specialist layer becomes a second almost-general layer.

## cap-200 becomes nearly free

Once earned, many builds can take:
- cap-200;
- primary thematic specialist;
- secondary convenience specialist.

The cost of activating Palace True's reward becomes low enough that it approaches default-on behavior for advanced profiles.

D24 says cap-200 is optional.
Optional should still imply a meaningful choice.

## Activity triple risk

A combination such as:
- Trailwise;
- Field Kit;
- Second Wind

can solve:
- entry cost;
- equipment access;
- expedition attrition.

That is not universal across the entire game, but for Activity play it becomes an almost complete always-correct package.

## Generic utility triple risk

A triple such as:
- Researcher;
- Official Access;
- cap-200

is useful across a wide set of advanced runs.

Add a broad Keystone and the remaining weaknesses become increasingly narrow.

---

# 17. Capacity-3 always-correct stack audit

No Specialist triple is mathematically correct for **every** possible goal because directed effects retain dead zones.

But capacity 3 produces multiple **default advanced stacks**:

### General advanced stack
- Researcher;
- Official Access;
- cap-200.

Covers:
- progression efficiency;
- content access;
- late ceiling.

### Activity default stack
- Trailwise;
- Field Kit;
- Second Wind.

Covers three separate Activity costs.

### Covert default stack
- Trailwise;
- Ghost Step;
- False Identity.

Covers entry/cost, safety and resolution access.

These are goal-domain defaults, not universal game defaults.

That is enough to weaken the non-dominance goal:
within a major playstyle, the player can often take nearly every useful Specialist rather than choose between them.

---

# 18. Broad-stack containment across all capacities

D27's **one Keystone** does most of the work.

These candidates are mutually exclusive if approved as broad effects:

- +1 daily Energy;
- No Rent;
- substantial passive income;
- Extra Time;
- broad stat carry-over;
- large enough Capital.

Therefore none of capacity 1/2/3 allows:

```text
+1 Energy
+ No Rent
+ substantial passive income
```

at once.

Specialist capacity does not change that.

The real capacity question is how much directed power may accompany one chosen Keystone.

---

# 19. Starting Capital classification

Starting money is the most important borderline example because a one-time reward can be narrow or broad depending on size.

## Keystone if the amount can routinely bypass multiple core opening pressures

Signals:
- pays several days/weeks of normal lodging;
- pays multiple School lessons;
- buys several important tools/items;
- substantially delays or prevents poverty/street pressure;
- crosses several independent Day-1 thresholds.

Then it is run-defining and should compete with:
- +Energy;
- No Rent;
- passive income;
- Extra Time.

## Specialist if the amount is intentionally small/directed

Signals:
- solves one thematic purchase;
- pays one/few lessons;
- supplies a short buffer;
- does not broadly suppress housing/poverty.

No exact currency threshold is locked because final economy remains open.

Classification must use **what gates it crosses**, not only the raw number.

---

# 20. Borderline classification rules

An effect is **Keystone** if any of these are true:

1. It provides a resource/benefit every or nearly every day.
2. It changes total calendar length.
3. It removes a whole-run recurring mandatory cost.
4. It broadly carries stats/progression across builds.
5. It affects at least two core loops at meaningful strength:
   - Work;
   - School;
   - Activity;
   - Housing/economy;
   - broad route access.
6. Its one-time opening value routinely bypasses multiple independent core pressures.
7. Combining it with a normal Keystone would feel like having two run-defining rules active.

An effect is **Specialist** if:

1. It targets one domain or route family.
2. It is conditional on actually using that domain.
3. It cannot independently solve broad housing/economy/action pressure.
4. It does not grant broad daily value.
5. Its access bypass is narrow and authored.
6. Its safety effect preserves route identity rather than removing failure/pressure globally.
7. It is a late-build rule like cap-200 with no Day-1 free power.

An effect is **automatic knowledge/content** if:

- it only remembers/reveals knowledge;
- unlocks visibility;
- records contacts/clues;
- does not change costs, caps, resources, risk or broad eligibility.

If classification is ambiguous:
**promote upward**, not downward.

A questionable broad effect should be Keystone until Product proves it is narrow enough to be Specialist.

---

# 21. +1 Energy and Secret Debt

D27 already locks ordering.

With no Energy Keystone:

```text
unbound: 3
bound next day: 2
difference: -1
```

With +1 daily Energy Keystone:

```text
unbound: 4
bound next day: 3
difference: -1
```

The forced penalty remains real.

Prohibited behavior:

```text
4
-> apply debt -1 = 3
-> "restore to selected max 4"
```

That would erase D19.

Specialist capacity 1/2/3 does not alter this rule.

---

# 22. Secret Debt forced Night

No Specialist may cancel forced Night.

Examples that require explicit regression tests:

- Safe House;
- Protected;
- Private lodging access;
- False Identity;
- any "safe route" modifier.

Allowed shape:
- changes a consequence **inside** an authored option if Product approves.

Not allowed by current authority:
- "you have Safe House, therefore forced Night does not happen."

This rule is identical at capacities 1, 2 and 3.

---

# 23. Secret Debt and Activity specialists

The dangerous pair/triple is not +Energy alone.

It is combinations such as:

- Trailwise;
- Field Kit;
- Second Wind.

While bound, these can collectively reduce:
- Activity entry cost;
- equipment preparation;
- expedition attrition.

At capacity 1:
only one can operate.

At capacity 2:
two can combine, but one Activity pressure remains.

At capacity 3:
all three can combine.

Therefore D19 containment is another reason to prefer 2 over 3.

A future Activity implementation must still test whether a Trailwise-like 2->1 Energy discount is valid under bound/street pressure.

No answer is invented here.

---

# 24. Secret Debt economy interactions

One-Keystone means the player can have only one of:
- No Rent;
- substantial passive income;
- +1 Energy;
- broad Capital;
- Extra Time.

This protects D19 from simultaneous broad-economy deletion.

Still required:

## No Rent
Must not:
- cancel forced Night;
- restore ordinary careers;
- prevent a player from intentionally choosing street/cheap content if such choice remains authored.

## Passive income
Must have:
- time-to-20000 repayment simulation;
- test that the route does not become "wait until passive income pays debt."

## Capital
Must be classified Keystone if large enough to substantially suppress the route's opening poverty pressure.

No Secret Debt ending reward is invented in this packet.

---

# 25. cap-200 selectability

D27 classifies cap-200 as Specialist by default.

## Capacity 1

Meaningful but expensive:
- consumes 100% of Specialist capacity.

Risk:
too often skipped in favor of immediately useful directed perks.

## Capacity 2

Meaningful:
- consumes 50% of Specialist capacity;
- pairs with exactly one build identity.

Examples:
- cap-200 + Researcher;
- cap-200 + Trailwise;
- cap-200 + Ghost Step.

This is the best fit for "optional but attractive."

## Capacity 3

Low opportunity cost:
- consumes 33% of Specialist capacity;
- can often be added beside two normal specialists.

Risk:
advanced profiles activate it by default whenever earned.

### Result

cap-200 is a major reason to choose **2** rather than 1 or 3.

---

# 26. Five-goal comparison table

| Goal | Capacity 1 | Capacity 2 | Capacity 3 |
|---|---|---|---|
| Work-heavy | clear but sparse | strong + one secondary identity | broad coverage |
| School-heavy | School **or** cap-200 | School **+ cap-200** possible | School + cap + convenience |
| Activity/covert | one subsystem advantage | coherent two-part build | near-complete domain package |
| Economy | well-contained by Keystone | contained + two directed tools | contained broad economy, but many directed extras |
| Palace cap-200 | high opportunity cost | meaningful half-capacity choice | close to default inclusion |

---

# 27. Choice-pressure comparison

## Capacity 1

Question:
"Which single directed advantage defines me?"

Very strong specialization.
Too restrictive for systems intentionally made of complementary specialists.

## Capacity 2

Question:
"Which two directed advantages define this run, and which third useful one am I giving up?"

This creates the clearest positive opportunity cost.

## Capacity 3

Question increasingly becomes:
"Which specialist do I leave out?"

For many domains the answer is easy because only 3-4 relevant candidates exist.

That is weaker loadout tension.

---

# 28. Recommended production invariant

If Product accepts capacity 2:

```text
MAX_ACTIVE_KEYSTONES = 1
MAX_ACTIVE_SPECIALISTS = 2
```

These constants should be runtime/catalog authority only **after Product lock**.

Ordinary Hard Work:
not counted.

Automatic knowledge:
not counted.

No hidden extra slot for Palace cap-200.

cap-200 uses one normal Specialist position.

---

# 29. Save model

Regardless of capacity, separate three concepts.

## Permanent unlock history

Conceptual:

```text
earnedStrongModifierIds[]
```

Answers:
"What has this profile earned?"

## Setup preference

Conceptual:

```text
preferredStrongLoadout: {
  keystoneId?: id
  specialistIds[]
}
```

Answers:
"What would the player like selected next time?"

## Current-run resolved snapshot

Conceptual:

```text
resolvedStrongLoadout: {
  model: "keystone_specialists"
  modelVersion
  catalogVersion
  keystoneId?: id
  specialistIds[]
  specialistCapacityAtStart
  resolvedEffectParameters
}
```

Answers:
"What rules did this life actually start with?"

Do not use one field for all three meanings.

---

# 30. Why current-run snapshot is required

Suppose:
- a run starts when capacity is 2;
- Product later changes capacity or reclassifies a modifier.

The current run must not mutate mid-life.

Its snapshot remains:
- same selected IDs;
- same resolved effect values;
- same capacity-at-start metadata.

Only a future New Start+ uses the new catalog/capacity.

This protects save/reload determinism.

---

# 31. Migration rules if capacity changes later

## 1 -> 2

For an existing in-progress run:
- preserve its one selected Specialist exactly;
- do not grant a second Specialist mid-life.

For the next new run:
- existing preference remains valid;
- player may optionally add a second earned Specialist.

## 2 -> 1

In-progress:
- preserve both resolved Specialists for that life.

Next new run:
- preference is invalid because it exceeds capacity;
- require explicit reselection;
- do not silently keep the first;
- do not silently drop the second.

## 2 -> 3

In-progress:
- preserve two; do not auto-fill third.

Next run:
- preference remains valid;
- third remains empty until selected.

## 3 -> 2

In-progress:
- preserve all three for that life.

Next run:
- require explicit reselection if preference has 3;
- no arbitrary pruning.

---

# 32. Migration from current generic Meta scaffolding

Current project has generic fields such as:
- `ruleModifiers`;
- `activeLegacyPerks`.

Production migration should not infer permanent reward ownership from arbitrary keys.

Rules:

1. Map only explicit recognized production IDs.
2. Unknown/demo keys remain compatibility state for the current run if needed.
3. Unknown/demo keys do not become permanently earned Keystone/Specialist rewards.
4. An in-progress old run preserves its effective behavior where compatibility requires.
5. The next New Start+ resolves through the production Keystone/Specialist catalog.
6. If mapped selections exceed capacity, require explicit reselection.
7. Do not silently choose a winner.

---

# 33. Palace migration

cap-200 remains tied to the Palace True reward.

Migration must not:
- grant cap-200 merely because Palace access existed;
- grant it from 10/10 Hard Work alone;
- infer it from stat values >100 without explicit legacy authority.

If a known legacy/current-run save already has the authorized cap-200 effect active:
- preserve it in that current-run snapshot.

Future lives:
- cap-200 appears as earned Specialist only when permanent reward authority says it was earned.

D23 Palace invitation remains separate.

---

# 34. UI burden — capacity 1

Simplest.

Suggested mental model:

```text
Keystone: 0/1
Specialist: 0/1
Automatic knowledge
Hard Work packages
```

Pros:
- very clear;
- little visual density.

Cons:
- cap-200 fights every directed reward;
- the Specialist section can feel like a second Keystone slot rather than a build layer.

---

# 35. UI burden — capacity 2

Recommended.

Mental model:

```text
Keystone: 0/1
Specialists: 0/2
Automatic knowledge
Hard Work packages
```

UI needs:
- selected count;
- two visible selected positions/chips or a 0/2 counter;
- clear whole-card toggles;
- explanation that Hard Work does not consume these positions;
- cap-200 shown as a normal Specialist, not a bonus "free slot."

This remains easy to explain without point arithmetic.

---

# 36. UI burden — capacity 3

Still feasible but denser.

```text
Keystone: 0/1
Specialists: 0/3
```

Problems:
- more selected-state scanning;
- many advanced profiles can leave three toggles permanently on;
- UI starts feeling like "enable most of my good stuff" instead of build selection.

This is not a technical blocker, but it reflects the weaker opportunity cost.

---

# 37. UI wording rule

Do not use:
- "best";
- "strongest";
- "rare";
- ending prestige language

as the reason for Keystone/Specialist class.

Use functional language:

### Keystone
"Major rule change for this life. Choose at most one."

### Specialist
"Directed advantage for a specific build or route."

### Automatic knowledge
"Permanent knowledge/content unlock; does not consume a loadout position."

### Hard Work
"Profession package selection; separate from strong Meta capacity."

---

# 38. Acceptance scenarios — common

Whichever capacity Product locks:

1. Fresh profile cannot select unearned modifier IDs.
2. 0 Keystone is valid.
3. 1 Keystone is valid.
4. 2 Keystones is rejected.
5. Automatic knowledge consumes no capacity.
6. Hard Work packages consume no Keystone/Specialist capacity.
7. Hard Work still allows any earned subset.
8. cap-200 is Specialist-class.
9. cap-200 changes max only.
10. access modifier cannot substitute for D23 Palace invitation.
11. Secret Debt forced Night cannot be cancelled.
12. Secret Debt next-day Energy -1 remains one lower than same unbound loadout.
13. save/reload preserves exact resolved current-run selection.
14. changing catalog/capacity does not rewrite an in-progress run.
15. invalid future preference triggers reselection, not arbitrary pruning.
16. no Title system appears.
17. no original Plus Mode job replacement appears.

---

# 39. Acceptance scenarios — capacity 1

If Product chooses 1:

- selecting second Specialist must fail;
- cap-200 + Researcher cannot coexist;
- cap-200 + Trailwise cannot coexist;
- Activity triple cannot occur;
- preference with two Specialists requires reselection on next life.

This is easy to test but confirms the high cap-200 opportunity cost.

---

# 40. Acceptance scenarios — capacity 2

If Product chooses 2:

- any two earned Specialists may coexist unless a separate Product incompatibility exists;
- third selection fails deterministically;
- cap-200 + Researcher is valid;
- cap-200 + Trailwise is valid;
- Trailwise + Field Kit is valid;
- Trailwise + Field Kit + Second Wind is rejected;
- Researcher + Official Access + cap-200 is rejected;
- Hard Work all-ten can still be active simultaneously with one Keystone + two Specialists;
- D23 Palace qualification still depends only on Hard Work earned/active, not strong-Meta positions.

These are the recommended regression contracts.

---

# 41. Acceptance scenarios — capacity 3

If Product chooses 3:

- fourth Specialist fails;
- Activity triple is valid;
- Researcher + Official Access + cap-200 is valid;
- cap-200 can commonly coexist with two other specialists.

This model requires stronger pair/triple balance review for every new Specialist because a new entry can complete a broad default trio.

---

# 42. Regression matrix for broad candidate Keystones

For each capacity, test each candidate Keystone independently with max Specialists.

## +1 daily Energy

Expected:
- only Keystone selected;
- cannot combine with No Rent/passive income/Extra Time/broad Capital;
- Secret Debt bound day remains one Energy below same unbound selection.

## No Rent

Expected:
- cannot combine with +Energy/passive income/Extra Time/broad Capital;
- does not cancel forced Secret Debt Night;
- does not unlock ordinary professions;
- does not substitute for Palace invitation.

## substantial passive income

Expected:
- mutually exclusive with other Keystones;
- dedicated D19 time-to-20000 simulation required;
- does not auto-pay debt unless Product explicitly creates such mechanic.

## broad Capital

Expected:
- mutually exclusive with other Keystones;
- Day-1 effect only;
- does not create a second economy Keystone through a Specialist alias.

## Extra Time

Expected:
- mutually exclusive with other Keystones;
- does not multiply daily Energy;
- merely adds authored calendar days if ever approved;
- must re-evaluate deadline-sensitive content.

These are candidate tests, not approvals.

---

# 43. Specialist pair regression matrix for recommended capacity 2

Required future balance checks:

### Researcher + cap-200
- School advantage applies;
- cap becomes 200 only if selected/earned;
- no free stats.

### Trailwise + Field Kit
- entry discount and tools coexist;
- no extra Energy created outside the Activity rule.

### Trailwise + Second Wind
- entry discount and internal recovery coexist;
- D19 Activity collision explicitly checked.

### Ghost Step + False Identity
- covert risk/access coexist;
- does not bypass Palace invitation;
- does not erase ordinary legal consequences outside scoped content.

### Safe House/Protected + any Activity specialist
- forced Secret Debt Night remains;
- ordinary career lock remains.

### Official Access + cap-200
- city access and stat ceiling remain separate;
- no Palace access implication.

---

# 44. Why capacity 2 is not "two free strong bonuses"

The strong Meta stack still has hard structure:

```text
one Keystone
+
two directed Specialists
```

A Specialist is not allowed to be:
- another +Energy;
- another No Rent;
- another substantial passive income;
- another broad carry-over;
- another Extra Time.

If a modifier reaches that breadth, classification promotes it to Keystone.

Therefore capacity 2 does not mean:
"one Keystone plus two hidden Keystones."

Classification is part of the balance contract.

---

# 45. Recommendation confidence and open dependencies

## High-confidence recommendation

**2 Specialists** is the strongest current balance candidate because it solves both key failure modes:

- capacity 1 over-penalizes cap-200 and complementary route builds;
- capacity 3 under-prices multi-domain coverage.

## Still Product-open

This packet does not settle:
- final exact reward catalog;
- exact School discount;
- exact Trailwise implementation;
- exact Capital amount;
- passive-income rate;
- Private Room classification;
- Safe House/Protected scope;
- any Secret Debt ending rewards;
- whether some future Specialist pairs need explicit incompatibility;
- production IDs/names.

Those should be locked after the capacity decision.

---

# 46. Recommended Product lock text if accepted

Proposed wording for a future decision record:

> A New Start+ life may activate at most one earned Keystone and at most two earned Specialists. Pure knowledge/content unlocks remain automatic and consume neither capacity. Ordinary Hard Work profession packages remain a separate layer and may still activate any earned subset. The Palace True cap-200 reward is a normal Specialist and consumes one of the two Specialist positions when active. Broad run-defining effects must be Keystone-class rather than disguised as Specialists. Current-run resolved selections are snapshotted and are not changed by later catalog/capacity revisions.

This paragraph is a recommendation for Leader/Product review, not a lock created by Chat 4.

---

# 47. Final comparison

| Capacity | Non-dominance | Build expression | cap-200 usability | D19 containment | UI/QA burden |
|---|---|---|---|---|---|
| 1 | Very high | Low | Too costly | Strongest | Lowest |
| **2** | **High** | **High** | **Meaningful** | **Strong** | **Moderate** |
| 3 | Medium | Very high | Near-default | Weaker for specialist stacks | Higher |

## Final recommendation

**Lock Specialist capacity at 2.**

It preserves:
- one major Keystone choice;
- two directed build choices;
- meaningful cap-200 opportunity cost;
- meaningful omissions inside Activity/School/access builds;
- strong Secret Debt containment;
- manageable save/UI/testing complexity.

Do not implement until Leader/Product records the capacity decision.
