# Chat 6 — Palace Non-True Ending Rewards v13

Status: **READY FOR LEADER PRODUCT DECISION**  
Owner: Chat 6 / Palace Producer  
Branch: `chat6/palace-nontrue-ending-rewards-v13`

Accepted Palace authored contract:
- `chat6/palace-authored-content-blueprint-v12@ade2dfa807a0bf8eb063eaa8b2cbf3c8965365ab`

Preserved mechanical authority:
- D23 — permanent ordinary Hard Work 10/10 + current-run active 10/10 remains the sole Palace entry gate;
- D24 — Return Home True Ending reward remains `palace.true.cap-200`, one normal Specialist slot;
- D28 — New Start+ strong Meta capacity remains 0..1 Keystone + 0..2 Specialists;
- D29 — rich six-stage Palace topology;
- D30/D32 — three Secret Debt rewards remain bounded Keystones with locked numeric parameters;
- D36 — Large Activity never substitutes for Palace entry/duties/True readiness.

This packet proposes Product authority for the three **non-True Palace ending rewards only**.

No production runtime/UI/content is changed.

---

# 1. Decision target

v12 deliberately left the permanent reward of these three endings OPEN:

1. Service Life;
2. Court Power;
3. Inner Truth.

v13 closes that Product gap with one concrete future-life reward identity per ending.

The proposed set is intentionally asymmetric in **class**, not in outcome prestige:

- Service Life -> one bounded ordinary-work safety Specialist;
- Court Power -> one bounded professional-network/access Specialist;
- Inner Truth -> automatic knowledge/content, not a selectable strong modifier.

Reason:

the three endings should express three different future-life styles:

- continuity through sustained ordinary work;
- professional influence through relationships/network access;
- understanding through better authored information and source interpretation.

They should not all become:
- money;
- Energy;
- stat carry-over;
- free access;
- or copies of cap-200.

---

# 2. Common Palace non-True eligibility contract

All three endings preserve the same accepted v12 shape.

Common required state before route finalization:

```text
palace.access-granted
AND Palace stage == outcome-ready
AND palace.progression-complete
```

No Prince defeat is required for the three non-True endings.

Prince confrontation remains part of the separate Return Home True path.

No non-True ending may require:

- romance;
- Palace Night;
- a legacy item/capability;
- School;
- Activity;
- a specific Palace relationship;
- a specific ordinary-career knowledge hook.

All of those remain optional authored inputs only.

---

# 3. Route preparation remains non-exclusive

Accepted preparation facts:

```text
palace.prep.service-life
palace.prep.court-power
palace.prep.inner-truth
```

They may coexist.

All three may be present in the same run.

Accepted final-ready facts:

```text
palace.outcome.service-life-ready
palace.outcome.court-power-ready
palace.outcome.inner-truth-ready
```

They may also coexist before ending commit.

Nothing in v13 makes one route erase or invalidate another.

Exclusivity still begins only when the player explicitly commits an ending.

---

# 4. Reward ownership boundary

Permanent reward ownership is granted only after the normal ending completion transaction.

Required conceptual ordering:

```text
route preparation
-> Outcome Ready
-> route finalize scene
-> final-ready fact
-> ending becomes eligible
-> player explicitly commits ending
-> committed current-life resolution scene
-> completeEnding
-> permanent reward/knowledge grant
```

Do not grant permanent Meta at:

- preparation;
- finalization;
- eligibility;
- or mere commit.

This keeps reward grant exactly-once at the existing permanent completion boundary.

Repeating an already-completed ending in a later life:
- does not duplicate ownership;
- does not add a second copy;
- does not auto-select the reward.

A reward earned during a life does **not** activate inside that same life.

It becomes available only to a later New Start+.

---

# 5. Service Life — exact ending contract

Route preparation fact:

`palace.prep.service-life`

Earliest preparation stage:

`trusted-service`

Accepted v12 preparation beats:

1. `palace.outcome-prep.service-life.01-continuity`
2. `palace.outcome-prep.service-life.02-boundaries`

Beat 2 writes:

`palace.prep.service-life`

At Outcome Ready, finalize event:

`palace.outcome-finalize.service-life`

Exact finalize conditions:

```text
palace.access-granted
AND Palace stage == outcome-ready
AND palace.progression-complete
AND palace.prep.service-life
```

Finalize writes:

`palace.outcome.service-life-ready`

Finalize does not commit the ending.

## Ending eligibility

Candidate stable ending ID:

`ending.palace.service-life`

Exact eligibility after finalization:

```text
palace.access-granted
AND Palace stage == outcome-ready
AND palace.progression-complete
AND palace.outcome.service-life-ready
```

No extra romance/Night/item/School/Activity/relationship condition.

## Explicit commit boundary

Player explicitly commits:

`ending.palace.service-life`

Current-life committed scene:

`palace.ending.service-life.committed`

Current-life resolution identity:

the heroine chooses continued ordinary Palace service with sustainable professional boundaries and repeatable responsibility.

Exact long-form epilogue remains content-owned.

Permanent reward grant happens only at `completeEnding`.

---

# 6. Service Life proposed permanent reward

Functional name:

**Steady Practice**

Stable proposed reward ID:

`palace.service-life.steady-practice`

Reward class:

**Specialist**

Activation:

- permanently owned after completed Service Life;
- selectable in later New Start+ lives;
- not automatically active;
- consumes **1 of the normal 2 Specialist slots** under D28;
- no free Palace slot.

## 6.1 Authority-candidate exact effect

When active:

1. Track ordinary careers in the order in which they first reach **8 completed shifts** in the current life.
2. The first **2 distinct ordinary careers** to reach shift 8 become that run's **continuity careers**.
3. For each continuity career, the next **3 D31 seasonal negative progression-stat effects** generated by that career are reduced:
   - from `-1`
   - to `0`.
4. Maximum prevented negative stat loss:
   - **3 points per continuity career**;
   - **6 progression-stat points per run** total.

These values are **Product authority candidates**, not runtime authority until accepted.

## 6.2 What qualifies

Only an already-locked D31 seasonal negative effect from that same ordinary career qualifies.

Examples:

- Lumber Spring Dexterity -1;
- Guard Winter Reason -1;
- Prostitute Winter Endurance -1;

when that profession is one of the two continuity careers and protection charges remain.

## 6.3 What does not qualify

Steady Practice does not prevent:

- positive effects;
- Lust changes;
- School effects;
- Activity losses;
- Secret Debt penalties;
- Palace effects;
- relationship consequences;
- item costs;
- money loss;
- Energy loss;
- any stat loss not explicitly produced by the D31 ordinary seasonal-negative map.

It does not retroactively restore a stat point already lost before the career became a continuity career.

## 6.4 Why the threshold is 8 shifts

The reward is about **continuity**, not first-day immunity.

Requiring the current life to establish at least eight shifts means:

- the player has materially committed to that profession;
- the reward does not erase early pressure universally;
- it supports sustained service rather than casual sampling.

It does not change any career's own stage definitions.

"8 shifts" is only the reward's activation threshold for binding its two continuity careers.

## 6.5 Why max 2 careers / 3 protections each

Candidate maximum:

`2 × 3 = 6 prevented stat points/run`

This is intentionally bounded.

It is:
- materially weaker than broad stat carry-over;
- not a starting bonus;
- not a replacement for Hard Work +5 packages;
- not universal stat protection;
- dependent on actually working the chosen-by-play careers.

The player indirectly chooses the two careers by choosing which careers reach 8 shifts first.

No extra nested New Start+ target-selection UI is required.

## 6.6 D26 / Hard Work behavior

Steady Practice never changes:

- one shift / same ordinary career / day;
- Hard Work = 50 completed shifts;
- career unlock rules;
- wages;
- positive seasonal effects;
- seasonal placement.

Earliest same-career Hard Work remains Day 50.

## 6.7 Why Specialist

This is a directed ordinary-work safety modifier.

It affects:
- at most 2 careers;
- only after 8 shifts;
- at most 6 existing negative stat points.

It does not alter:
- daily Energy;
- money;
- calendar length;
- rent;
- career access;
- Palace access.

That is Specialist breadth under D27.

It is not Keystone-scale.

---

# 7. Service Life abuse / dominance review

## Potential abuse: force preferred careers to reach 8 first

Allowed.

That is the intended build expression:
the player decides which two sustained professions receive continuity protection by play order.

## Potential abuse: combine with Hard Work packages

Allowed.

Example:

```text
selected ordinary Hard Work +5 package
+
Steady Practice seasonal protection
```

These are separate layers.

Steady Practice:
- does not multiply the +5;
- does not grant a package;
- does not count toward active 10/10;
- does not affect D23 qualification.

## Potential abuse: combine with cap-200

Allowed under D28.

Loadout:

```text
Specialist 1 = palace.true.cap-200
Specialist 2 = palace.service-life.steady-practice
```

Valid.

A third Specialist is invalid.

## Dominance limit

Maximum six prevented negative points is small enough that Steady Practice does not replace:

- School;
- career positive seasons;
- Hard Work packages;
- cap-200.

Its value exists only in sustained ordinary work.

---

# 8. Service Life + Secret Debt D30/D32

Any selected D30 Keystone may coexist with Steady Practice.

Examples:

- Earned Reserve Match + Steady Practice;
- Work Rhythm + Steady Practice;
- Network Retainer + Steady Practice.

While actively Secret-Debt-bound:

- ordinary careers remain locked;
- no new ordinary shift can advance a career toward the 8-shift bind point;
- no hidden Secret Debt work consumes or creates Steady Practice charges;
- forced Night unchanged;
- next-day Energy -1 unchanged.

Already-bound continuity-career state and remaining charges are simply preserved until ordinary work is legal again.

Steady Practice never:
- changes debt;
- changes repayment;
- cancels forced Night;
- changes lender chance/grant;
- unlocks ordinary careers while bound.

---

# 9. Service Life + D36 Activity

Steady Practice has **no Activity effect**.

It does not:

- reduce Activity entry Energy;
- add Field Time;
- alter Endurance;
- preserve Activity results;
- reveal routes;
- change regional anchors;
- satisfy Activity ending eligibility.

This keeps it distinct from Activity-focused Specialists.

---

# 10. Court Power — exact ending contract

Route preparation fact:

`palace.prep.court-power`

Earliest preparation stage:

`palace-network`

Accepted v12 preparation beats:

1. `palace.outcome-prep.court-power.01-responsibility`
2. `palace.outcome-prep.court-power.02-network`

Beat 2 writes:

`palace.prep.court-power`

At Outcome Ready:

`palace.outcome-finalize.court-power`

Exact finalize conditions:

```text
palace.access-granted
AND Palace stage == outcome-ready
AND palace.progression-complete
AND palace.prep.court-power
```

Finalize writes:

`palace.outcome.court-power-ready`

No auto-commit.

## Ending eligibility

Candidate stable ending ID:

`ending.palace.court-power`

Exact eligibility:

```text
palace.access-granted
AND Palace stage == outcome-ready
AND palace.progression-complete
AND palace.outcome.court-power-ready
```

No specific Palace relationship is mandatory.

Patron/rival/contact remain optional authored variants.

Romance remains irrelevant.

## Explicit commit

Player explicitly commits:

`ending.palace.court-power`

Committed current-life scene:

`palace.ending.court-power.committed`

Current-life resolution identity:

the heroine accepts a lasting role in professional coordination/influence while keeping responsibility traceable rather than relying on private favor.

Permanent reward grant occurs only at `completeEnding`.

---

# 11. Court Power proposed permanent reward

Functional name:

**Formal Introduction**

Stable proposed reward ID:

`palace.court-power.formal-introduction`

Reward class:

**Specialist**

Activation:

- permanently owned after completed Court Power;
- selectable on later New Start+;
- consumes one normal Specialist slot;
- not automatically active.

## 11.1 Authority-candidate exact effect

When active, the current life receives:

**3 Formal Introduction uses per run.**

Each use may be consumed only in an authored event explicitly tagged:

`formal-introduction-eligible`

The tagged event must belong to an **ordinary-career professional relationship**.

Requirements before use:

1. that ordinary career is already legally unlocked;
2. the player has completed at least **1 shift** in that career in the current life;
3. the target relationship has not already passed its first professional stage;
4. that relationship ID has not already consumed Formal Introduction this run.

On use:

- expose one authored **professional introduction** choice;
- that choice may perform exactly **one transition into the relationship's normal first professional stage**;
- consume one of the 3 uses;
- record that relationship ID as already introduced by this reward.

Maximum:

- **3 relationships/run**;
- **1 use per relationship ID/run**.

The value `3` is a Product authority candidate, not runtime authority until accepted.

## 11.2 What this reward may do

It may accelerate the **first professional introduction only**.

It may let the player establish a professional contact without waiting for that relationship's usual intro event timing, where the content owner explicitly opts in.

It expresses:
- institutional standing;
- a professional reference;
- knowing how to request the correct introduction.

## 11.3 What it may not do

Formal Introduction may not:

- unlock an ordinary career;
- satisfy stat/year unlock requirements;
- count as a shift;
- add Hard Work progress;
- skip career stage thresholds;
- skip School requirements;
- grant an item/capability;
- write downstream career route facts;
- write downstream relationship trust/conflict facts;
- jump past the first professional relationship stage;
- create romance;
- satisfy ending eligibility by itself;
- grant Palace invitation/access;
- advance Palace duty/stage;
- operate inside Activity;
- operate on Secret Debt-owned relationship/ending state.

If an ordinary-career ending later requires additional relationship/career/School/Activity facts, those remain required.

## 11.4 Non-romantic requirement

Only professional relationship transitions may opt in.

A personal/romantic relationship stage is not a valid target for Formal Introduction.

This reward is court/network/power identity, not a romance shortcut.

## 11.5 Why Specialist

Formal Introduction is:

- bounded to 3 uses;
- limited to ordinary-career professional relationship introductions;
- unavailable before legal career access + one shift;
- unable to skip route facts or ending gates.

Directed relationship/access modifiers are explicitly Specialist territory under D27.

It is not broad enough for Keystone.

---

# 12. Court Power abuse / dominance review

## Risk: three free complex-career endings

Prevented.

The reward advances only the **first professional relationship stage**.

It cannot write:

- Lumber management facts;
- Activity route facts;
- School readiness;
- career problem-resolved facts;
- ending-ready facts.

A complex route still needs its own non-introduction requirements.

## Risk: repeated use on the same relationship

Prevented.

At most one Formal Introduction use per relationship ID per run.

## Risk: use before career access

Prevented.

Career must already be legally unlocked and have at least one completed shift.

## Risk: substitute for Palace network

Prevented.

Palace relationships are excluded from the eligible domain.

The reward cannot recursively trivialize the Palace route that earned it.

---

# 13. Court Power + Secret Debt D30/D32

Any one selected D30 Keystone may coexist with Formal Introduction.

While Secret-Debt-bound:

- ordinary career lock remains;
- a locked ordinary career cannot become a legal introduction target;
- Secret Debt relationships/events are not `formal-introduction-eligible`;
- forced Night remains authoritative;
- next-day Energy -1 unchanged;
- debt/repayment unchanged.

Unused introduction charges remain stored.

No catch-up or compensating use is granted because Secret Debt blocked ordinary-career access.

---

# 14. Court Power + ordinary Hard Work packages

Hard Work packages remain separate.

Formal Introduction:

- consumes no package slot;
- activates no package;
- does not require the target career's +5 package to be selected;
- does not count as active 10/10;
- does not affect D23.

A career permanently unlocked by prior Hard Work may still be a target once the current-life one-shift requirement is met.

No +5 effect is changed.

---

# 15. Court Power + D36 Activity

Formal Introduction has **no Activity domain use**.

This is intentional.

D36 already has a research-only Activity reward proposal around network introductions.

Court Power stays distinct:

- city / ordinary-career professional relationship introductions;
- not regional Activity route introductions.

It cannot:

- unlock a region;
- expose an Activity network route;
- alter Activity contacts;
- change Field Time;
- change Activity ending eligibility.

If both a future Activity Contact Network Specialist and Court Power Formal Introduction are eventually accepted, they affect different domains and may coexist subject to D28 capacity.

---

# 16. Inner Truth — exact ending contract

Route preparation fact:

`palace.prep.inner-truth`

Earliest preparation stage:

`crossroads`

Accepted v12 preparation beats:

1. `palace.outcome-prep.inner-truth.01-evidence`
2. `palace.outcome-prep.inner-truth.02-contradiction`

Beat 2 writes:

`palace.prep.inner-truth`

At Outcome Ready:

`palace.outcome-finalize.inner-truth`

Exact finalize conditions:

```text
palace.access-granted
AND Palace stage == outcome-ready
AND palace.progression-complete
AND palace.prep.inner-truth
```

Finalize writes:

`palace.outcome.inner-truth-ready`

No final mystery truth is required or revealed.

## Ending eligibility

Candidate stable ending ID:

`ending.palace.inner-truth`

Exact eligibility:

```text
palace.access-granted
AND Palace stage == outcome-ready
AND palace.progression-complete
AND palace.outcome.inner-truth-ready
```

No required:
- evidence item;
- Activity result;
- School track;
- Palace relationship;
- romance;
- Night.

## Explicit commit

Player explicitly commits:

`ending.palace.inner-truth`

Committed current-life scene:

`palace.ending.inner-truth.committed`

Current-life resolution identity:

the heroine chooses a life organized around checking sources, preserving uncertainty and seeking understanding without claiming the final macro mystery has been solved.

Permanent knowledge grant occurs only at `completeEnding`.

---

# 17. Inner Truth proposed permanent reward

Functional name:

**Source Method**

Stable proposed knowledge/reward ID:

`palace.inner-truth.source-method`

Reward layer:

**automatic knowledge/content**

It is **not**:
- a Specialist;
- a Keystone;
- a Hard Work package.

Activation:

- permanently earned after completed Inner Truth;
- automatically inherited by later New Start+ lives;
- no toggle;
- consumes **0 Keystone slots**;
- consumes **0 Specialist slots**.

## 17.1 Exact effect

While inherited, authored informational scenes may opt in with the condition:

`palace.inner-truth.source-method`

or an equivalent final production knowledge condition.

A scene is eligible only if the baseline scene is already legally reachable.

The knowledge unlock may expose a dedicated authored choice such as:

**Cross-check the source**

That choice may reveal:

- source provenance;
- which observations are direct vs reported;
- an authored contradiction already latent in the scene;
- uncertainty/risk context;
- a comparison note between already-obtained facts.

The choice is **information/content only**.

It may not directly modify:

- money;
- Energy;
- progression stats;
- Lust;
- inventory;
- career counters;
- career stages;
- relationship stages;
- School counters;
- Activity Field Time/Endurance;
- Activity success/failure;
- Palace duties;
- ending eligibility;
- strong-Meta capacity.

## 17.2 Duration / cap

Duration:

**entire future life**

Use cap:

**unlimited on authored eligible scenes**

Reason unlimited is acceptable:

the effect has no direct resource/progression mutation.

The authoring surface itself is the natural cap:
only scenes explicitly written with a Source Method branch expose one.

## 17.3 What Source Method may never do

It may not:

- reveal a scene the player cannot legally reach;
- unlock a career;
- unlock a region;
- bypass an item/capability gate;
- supply a missing physical sample/evidence item;
- turn an Activity failure into success;
- preserve an Activity result from loss;
- expose a restricted Activity route;
- reveal the final mystery truth automatically;
- satisfy a Palace prep/final-ready fact by itself;
- satisfy any ending eligibility condition;
- bypass Prince confrontation;
- activate cap-200.

## 17.4 Why automatic knowledge/content

This is exactly the D27 knowledge layer:

- persistent understanding;
- extra authored interpretation;
- no broad rule power;
- no numeric resource advantage;
- no progression shortcut.

Charging a Specialist slot merely to remember and apply a learned source-checking method would overprice pure knowledge.

Therefore it should be automatic.

---

# 18. Inner Truth abuse / dominance review

## Risk: free hidden-success detector

Prevented.

Source Method reveals only authored information.

It does not reveal:
- RNG results;
- guaranteed "best" choices;
- hidden outcome truth unless the content explicitly provides a bounded source note.

## Risk: automatic Activity research win

Prevented.

It cannot:
- add Field Time;
- secure a result;
- unlock route;
- mark regional anchor;
- count toward Activity ending baseline.

## Risk: automatic Palace True shortcut

Prevented.

It does not:
- add stats;
- satisfy the 12x91 check;
- defeat the Prince;
- write `palace.progression-complete`;
- commit Return Home.

## Why no use cap

A numeric cap would create bookkeeping without balancing a mechanical resource.

The effect's power is authored information density, not repeated stat/resource gain.

---

# 19. Inner Truth + D36 Activity

Source Method may appear in an Activity scene **only after normal legal Activity access**.

Example allowed use:

- an already-obtained field record has two conflicting source notes;
- Source Method exposes an authored provenance comparison before the player chooses what to do.

It may not duplicate the research-only Activity ending reward proposals:

- Surveyor's Atlas -> Field Time savings;
- Field Archive -> result preservation;
- Contact Network -> regional access alternatives.

Source Method provides none of those.

It is information-only.

This keeps Truth/knowledge/exploration identity distinct from Activity mechanical Specialists.

---

# 20. Inner Truth + Secret Debt

Source Method never modifies D30/D32 mechanics.

Default rule:

Secret Debt-critical hidden-route facts/results are **not** treated as Source Method content unless a future Secret Debt owner explicitly authors an opt-in informational branch.

Even if such an informational branch is later authored, Source Method may not:

- reveal lender chance before encounter;
- alter +2000 grant;
- change 10-day activation;
- change 20000 debt;
- cancel forced Night;
- cancel next-day Energy -1;
- unlock ordinary careers;
- satisfy repayment/owner-kill/control conditions.

Automatic knowledge does not weaken Secret Debt precedence.

---

# 21. Reward-class comparison

## Service Life — Specialist

Mechanical:
bounded protection from ordinary-work seasonal attrition.

Why not automatic knowledge:
it directly prevents numeric stat loss.

Why not Keystone:
only 2 careers / max 6 points / sustained-work trigger.

## Court Power — Specialist

Mechanical:
bounded professional relationship introduction access.

Why not automatic knowledge:
it can advance one relationship transition.

Why not Keystone:
max 3 ordinary professional introductions, no career/ending access bypass.

## Inner Truth — automatic knowledge/content

Mechanical resource effect:
none.

Why not Specialist:
its benefit is authored understanding, not a directed numerical/rule modifier.

Why not Keystone:
far too narrow and non-numeric.

---

# 22. D28 loadout consequences

If the player permanently owns:

- Service Life reward;
- Court Power reward;
- Inner Truth knowledge;
- cap-200;

then a future New Start+ behaves as:

```text
automatic knowledge:
  palace.inner-truth.source-method

Specialists: choose 0..2 among:
  palace.service-life.steady-practice
  palace.court-power.formal-introduction
  palace.true.cap-200
  other earned Specialists
```

Valid examples:

```text
Steady Practice + Formal Introduction
Steady Practice + cap-200
Formal Introduction + cap-200
only Steady Practice
only Formal Introduction
only cap-200
none
```

Inner Truth Source Method remains automatic in all of them once earned.

Invalid:

```text
Steady Practice + Formal Introduction + cap-200
```

because that is 3 Specialists.

No free extra Palace Specialist slot exists.

---

# 23. Interaction with D30/D32 Secret Debt Keystones

The three D30 rewards remain Keystone-class:

- `secret-debt.paid-freedom.earned-reserve-match`
- `secret-debt.bound-life.work-rhythm`
- `secret-debt.takeover.network-retainer`

Any **one** may coexist with up to two selected Specialists.

Examples:

```text
Earned Reserve Match Keystone
+ Steady Practice
+ cap-200
+ automatic Source Method
```

valid.

```text
Work Rhythm Keystone
+ Formal Introduction
+ Activity Specialist
+ automatic Source Method
```

valid.

D30/D32 values remain unchanged:
- Reserve Match 1:1, cap 1000/run;
- Work Rhythm max 20 rewarded days;
- Network Retainer 25 × 40, max 1000/run.

No v13 reward:
- changes those caps;
- adds a second Keystone;
- changes Secret Debt ordering.

---

# 24. Interaction with ordinary Hard Work packages

Ordinary Hard Work package selection remains a fully separate layer.

Any earned subset remains selectable.

All ten may be active simultaneously if the player chooses them.

v13 rewards never:

- consume a Hard Work package position;
- add a Hard Work package;
- change package +5 values;
- multiply package values;
- count toward permanent Hard Work 10/10;
- count toward active package 10/10;
- weaken D23.

Steady Practice may protect later current-run seasonal loss in a career that also has a +5 package.

That is allowed because:
- one is starting/package value;
- one is bounded later attrition protection.

No multiplication occurs.

---

# 25. Interaction with Activity D36

## Steady Practice

Activity effect:
none.

## Formal Introduction

Activity effect:
none.

No Activity contacts/routes may be tagged for Court Power Formal Introduction.

## Source Method

May expose authored information-only Activity choices after legal access.

Cannot:
- reduce 2-Energy entry;
- add Field Time;
- change Endurance;
- secure finds;
- add network routes;
- resolve anchors;
- count toward standalone Activity ending eligibility.

Therefore v13 does not pre-empt D36 Activity reward space.

---

# 26. Cross-ending future-life identities

## Service Life

Question for the next life:

> Which ordinary professions will I sustain long enough to become my continuity careers?

Style:
- sustained ordinary work;
- reduced long-run wear in two professions;
- no access/network shortcut.

## Court Power

Question:

> Which professional relationships are worth spending one of my three formal introductions on?

Style:
- city/professional network;
- relationship route planning;
- no work-stat protection;
- no Activity route power.

## Inner Truth

Question:

> What extra source/provenance context appears because this character permanently learned how to cross-check information?

Style:
- exploration;
- information;
- alternate authored understanding;
- no loadout slot or numeric progression bonus.

The three identities are intentionally orthogonal.

---

# 27. Non-dominance comparison

| Axis | Service Life / Steady Practice | Court Power / Formal Introduction | Inner Truth / Source Method |
|---|---|---|---|
| Class | Specialist | Specialist | Automatic knowledge |
| Direct stats | Prevents max 6 existing -1 losses | None | None |
| Money | None | None | None |
| Energy | None | None | None |
| Calendar | None | None | None |
| Ordinary work | Main domain | One-shift prerequisite only | Context only |
| Relationships | No | First professional intro only | Information variants only |
| Activity | None | None | Information variants only |
| Palace access | Never | Never | Never |
| Secret Debt bypass | Never | Never | Never |
| New Start slot cost | 1 Specialist | 1 Specialist | 0 |
| Main limitation | Must sustain careers to 8 shifts; first 2 only | 3 uses, first professional stage only | No direct progression/resource power |

No reward is a strict superset of another.

---

# 28. Why Service Life does not dominate Court Power

Steady Practice can preserve at most six stat points, but it:

- cannot open a relationship;
- cannot accelerate professional contact;
- cannot help Activity;
- requires 8-shift sustained ordinary work.

Formal Introduction can accelerate three relationship openings, but it:

- cannot prevent stat attrition;
- cannot change work pace;
- cannot change career stage/facts.

The player choosing one slot has a real style choice.

---

# 29. Why Court Power does not dominate Activity network rewards

Court Power is explicitly limited to:

**ordinary-career professional relationships**

It excludes:
- Activity region/contact routes;
- Palace relationships;
- Secret Debt relationships.

A future Activity Contact Network remains field/region-facing.

The two can coexist, but neither substitutes for the other.

---

# 30. Why Inner Truth being free does not dominate the Specialists

Source Method costs no slot because it has no direct state/resource/progression effect.

It cannot:

- preserve stats;
- advance relationships;
- add money/Energy;
- save Activity Field Time;
- secure Activity results;
- satisfy endings.

Its advantage is additional authored information.

Therefore "free" means:
**knowledge is not priced like mechanical power**, not that Inner Truth is the strongest reward.

---

# 31. Rejected Service Life reward shapes

Rejected for v13 recommendation:

## Unconditional +1 daily Energy

Too broad; explicitly Keystone-scale and overlaps rejected generic power.

## Free/discounted lodging

Too broad/economic and competes with D35 housing identity.

## Starting stat carry-over

Broad carry-over is prohibited direction and would overlap Hard Work/cap-200.

## Extra ordinary shift permission

Would undermine D26.

## Permanent work wage multiplier

Overlaps Earned Reserve Match / economy Keystones.

Steady Practice avoids all five.

---

# 32. Rejected Court Power reward shapes

## Passive money/network income

Duplicates Network Retainer / broad economy.

## Bypass ordinary career unlocks

Would undermine progression and could indirectly weaken D23 meaning.

## Free Palace access

Direct D23 violation.

## Universal relationship stage boost

Too broad.

## Activity region access

Overlaps D36 Activity network identity.

Formal Introduction stays bounded and domain-specific.

---

# 33. Rejected Inner Truth reward shapes

## Free School lessons

Economy/progression power rather than knowledge.

## Global stat reveal/optimal-choice oracle

Would turn knowledge into universal answer key.

## Free Activity survey / Field Time

Overlaps Activity Pathfinder reward space.

## Preserve evidence through Activity failure

Overlaps Activity Preservation reward space.

## Automatic mystery answer

Violates current open macro-lore authority.

Source Method remains authored information only.

---

# 34. Stable ID compatibility with strong Meta catalog

Current strong reward stable-ID convention is:

```text
<source>.<outcome-or-scope>.<reward>
```

with three lowercase kebab-case semantic segments.

Proposed mechanical IDs fit:

```text
palace.service-life.steady-practice
palace.court-power.formal-introduction
```

Proposed knowledge ID:

```text
palace.inner-truth.source-method
```

Although Source Method is not a StrongRewardId, using the same semantic three-segment shape keeps registry naming consistent.

Do not add:
- balance numbers;
- class words;
- UI titles

to the permanent ID.

Class can change only by future Product authority without renaming the same mechanical identity.

---

# 35. Ownership and registry model

If accepted:

## Strong Meta ownership

Add these two strong rewards:

```text
palace.service-life.steady-practice
palace.court-power.formal-introduction
```

to strong reward registry/ownership.

Both class:

`specialist`

## Automatic knowledge

Add:

`palace.inner-truth.source-method`

to the automatic knowledge registry.

Do not put Source Method in:
- Keystone selection;
- Specialist selection;
- Hard Work packages.

## Explicit grant bindings

Conceptually:

```text
ending.palace.service-life
  -> palace.service-life.steady-practice

ending.palace.court-power
  -> palace.court-power.formal-introduction

ending.palace.inner-truth
  -> palace.inner-truth.source-method
```

Grant occurs at completed ending transaction.

---

# 36. Save model — Steady Practice

Resolved current-run effect state should contain conceptually:

```text
rewardId: palace.service-life.steady-practice
boundCareerIds: []          // max 2, order of reaching 8 shifts
remainingProtectionsByCareer
usedProtectionsByCareer
```

Rules:

- career binds exactly once when it first reaches shift 8 and fewer than two careers are already bound;
- save/reload preserves binding order;
- each bound career begins with candidate value 3 protection charges;
- a qualifying D31 -1 decrements exactly one charge and applies 0 instead;
- reload cannot double-consume or double-prevent;
- later catalog edits do not rewrite current-run charge totals.

Candidate values `2 careers / 3 charges each` must be snapshotted at life start if Product accepts them.

---

# 37. Save model — Formal Introduction

Resolved run effect state conceptually:

```text
rewardId: palace.court-power.formal-introduction
maxUsesAtStart: 3
usedRelationshipIds: []
remainingUses: 3
```

Rules:

- one relationship ID may appear at most once;
- consume use atomically with the authored professional transition;
- if transition cannot legally apply, do not consume a charge;
- reload around the event cannot duplicate introduction;
- catalog changes do not change an in-progress run's 3-use snapshot.

---

# 38. Save model — Source Method

Permanent state:

`inheritedKnowledgeIds`

contains:

`palace.inner-truth.source-method`

Current-run snapshot includes it in:

`automaticKnowledgeIds`

No use counter is required.

A current life either inherited the knowledge at start or did not.

Earning Inner Truth during the life does not inject it into that same run.

---

# 39. Migration

At the time of v13, Palace non-True production endings/rewards are not shipped as recognized strong-Meta entries.

Therefore migration must not infer ownership from:

- Palace access;
- D23 10/10;
- Outcome Ready;
- prep facts;
- ready facts;
- relationship state;
- arbitrary old `ruleModifiers`;
- arbitrary old `activeLegacyPerks`.

Once accepted and shipped:

- exact ending completion is the grant authority;
- repeating completion is idempotent;
- known ownership survives future catalog retirement.

If a future version introduces these rewards after a version that already shipped the exact stable Palace ending IDs, a migration may backfill ownership **only** from an explicit recognized completed-ending ID, under Product-authorized migration.

Never infer from title text.

---

# 40. Reselection behavior

## Service/Court Specialists

Preferred New Start+ selection remains preference only.

If selected:
- must be permanently owned;
- must still be active/resolvable in registry;
- counts normally against Specialist capacity 2.

If Product later reclassifies a reward:
- current run snapshot unchanged;
- next run validates new class;
- conflict requires explicit reselection;
- no silent drop.

## Source Method

Automatic:
- no preference;
- no toggle;
- no reselection;
- inherited on later runs once owned.

If later retired:
- ownership/history preserved;
- future content exposure follows explicit retirement policy;
- current run snapshot stays immutable.

---

# 41. Strong-Meta composition cases

Assume the player owns:

- one D30 Keystone;
- Steady Practice;
- Formal Introduction;
- Source Method;
- cap-200;
- Activity Specialists.

Valid New Start+ examples:

```text
Keystone: Earned Reserve Match
Specialists:
  Steady Practice
  cap-200
Knowledge:
  Source Method
```

```text
Keystone: Work Rhythm
Specialists:
  Formal Introduction
  Activity Field Archive
Knowledge:
  Source Method
```

```text
Keystone: none
Specialists:
  Steady Practice
  Formal Introduction
Knowledge:
  Source Method
```

Invalid:

```text
Specialists:
  Steady Practice
  Formal Introduction
  cap-200
```

No Palace reward receives a hidden third slot.

---

# 42. Abuse matrix

## Steady Practice + Work Rhythm

Allowed.

Work Rhythm:
- adds bounded Energy after ordinary-work days.

Steady Practice:
- protects bounded D31 attrition after sustained shifts.

Combined:
- does not break D26;
- same-career Hard Work still >= Day 50;
- maximum Service protection remains 6 points.

## Steady Practice + Earned Reserve Match

Allowed.

One improves bounded wage economics.
One reduces bounded ordinary seasonal attrition.

No multiplication:
- protected stat value may indirectly influence later wage as ordinary stat logic already does;
- Reserve Match still matches actual eligible wage under D32;
- Steady Practice does not create a synthetic wage event.

## Formal Introduction + Network Retainer

Allowed.

Retainer:
- bounded passive early money.

Formal Introduction:
- bounded professional relationship access.

No shared counter/effect.

## Formal Introduction + Activity Contact Network

Allowed if the Activity reward is later accepted.

Different domains:
- city ordinary professional relationships;
- Activity regional network introductions.

## Source Method + Activity Field Archive

Allowed if Activity reward later accepted.

A legally obtained Activity result may:
- be secured by Field Archive if tagged;
- later expose Source Method provenance content if separately authored.

Source Method does not itself preserve the result.

---

# 43. Required later regression scenarios if Product accepts v13

## Service Life reward

1. Unowned Steady Practice cannot be selected.
2. Owned Steady Practice consumes one Specialist slot.
3. First ordinary career reaching 8 shifts binds.
4. Second distinct career reaching 8 binds.
5. Third does not bind.
6. Each bound career prevents exactly first 3 qualifying D31 -1 effects after binding.
7. Fourth qualifying -1 applies normally.
8. Losses before shift 8 are not restored.
9. Non-D31 loss is not prevented.
10. Lust is never protected.
11. D26 remains one same-career shift/day.
12. Hard Work remains 50.
13. Secret Debt hidden work does not bind/consume.
14. Save/reload cannot duplicate charges.
15. cap-200 + Steady Practice valid.
16. third Specialist rejected.

## Court Power reward

17. Unowned Formal Introduction cannot be selected.
18. Owned reward consumes one Specialist slot.
19. Exactly 3 successful uses max.
20. Same relationship cannot consume twice.
21. Career locked -> option unavailable.
22. Career unlocked but zero shifts -> option unavailable.
23. One shift + eligible event -> professional-intro option available.
24. Successful option advances only normal first professional stage.
25. Later route facts are not granted.
26. Personal/romantic stage cannot be target.
27. Palace relationship cannot be target.
28. Activity contact cannot be target.
29. Secret Debt relationship cannot be target.
30. Failed/invalid transition does not consume charge.
31. Save/reload cannot duplicate use.

## Inner Truth knowledge

32. Completing Inner Truth grants knowledge once.
33. Future life auto-inherits it.
34. It consumes no strong-Meta capacity.
35. Eligible baseline scene may expose cross-check content.
36. Legally unreachable scene remains unreachable.
37. Cross-check choice changes no resource/stat/counter/stage/ending eligibility.
38. Activity Field Time unchanged.
39. Activity result security unchanged.
40. Secret Debt state unchanged.
41. Palace True requirements unchanged.

## Common grant lifecycle

42. Finalize does not grant reward.
43. Eligibility does not grant reward.
44. Commit alone does not permanently grant reward before completeEnding.
45. completeEnding grants exactly once.
46. Repeated ending completion does not duplicate ownership.
47. Earned reward does not activate in the life that earned it.
48. Current-run resolved snapshot remains immutable after catalog changes.

---

# 44. Authority-candidate values

These are the **recommended exact Product values**, but are not runtime authority until Leader/Product records them:

| Reward | Candidate exact value |
|---|---|
| Steady Practice | first 2 ordinary careers to reach 8 shifts; 3 prevented D31 -1 effects per bound career; max 6 points/run |
| Formal Introduction | 3 successful ordinary-professional introductions/run; max 1 per relationship ID |
| Source Method | automatic for whole run; unlimited authored eligible information-only uses |

No implementation should hard-code these values merely because they appear in v13.

---

# 45. Required final table

| Ending | Как получить | Explicit commit | Что происходит | Permanent reward | Reward class | Exact mechanics | Main tradeoff |
|---|---|---|---|---|---|---|---|
| **Service Life** | `palace.prep.service-life` -> Outcome Ready -> `palace.outcome-finalize.service-life` -> `palace.outcome.service-life-ready`; no romance/Night/item/School/Activity/relationship requirement | Player explicitly commits `ending.palace.service-life`; permanent grant only at `completeEnding` | Current life continues as bounded sustainable Palace service; exact epilogue copy remains content-owned | **Steady Practice** — `palace.service-life.steady-practice` | **Specialist** | Candidate: first 2 ordinary careers to reach 8 shifts bind; in each, next 3 D31 seasonal `-1` effects become `0`; max 6 prevented points/run | Uses 1 of 2 Specialist slots; requires sustained work; no help for relationships/Activity; protection starts only after shift 8 |
| **Court Power** | `palace.prep.court-power` -> Outcome Ready -> `palace.outcome-finalize.court-power` -> `palace.outcome.court-power-ready`; patron/rival/contact optional | Player explicitly commits `ending.palace.court-power`; permanent grant only at `completeEnding` | Current life resolves toward accountable professional influence/network responsibility | **Formal Introduction** — `palace.court-power.formal-introduction` | **Specialist** | Candidate: 3 uses/run; after career legal unlock + at least 1 shift, an opted-in ordinary professional relationship event may advance exactly once into its normal first professional stage; max 1 use/relationship | Uses 1 of 2 Specialist slots; cannot skip career/route/ending facts; no Activity/Palace/Secret-Debt relationship use |
| **Inner Truth** | `palace.prep.inner-truth` -> Outcome Ready -> `palace.outcome-finalize.inner-truth` -> `palace.outcome.inner-truth-ready`; no evidence item/Activity/School requirement | Player explicitly commits `ending.palace.inner-truth`; permanent knowledge grant only at `completeEnding` | Current life resolves toward source-checking/understanding without declaring final macro mystery truth | **Source Method** — `palace.inner-truth.source-method` | **Automatic knowledge/content** | Candidate: automatically inherited in future lives; authored legally-reachable scenes may expose source/provenance/contradiction cross-check content; unlimited eligible uses; no direct resource/stat/counter/stage/ending effect | No slot cost, but also no direct mechanical progression power; value exists only where authored knowledge branches are present |

---

# 46. Recommended Product lock

If Leader/Product accepts v13, recommended decision text:

> The three non-True Palace endings permanently grant three distinct future-life identities. Service Life earns `palace.service-life.steady-practice`, a Specialist that binds the first two ordinary careers to reach 8 shifts in a life and prevents the next three locked D31 seasonal -1 progression-stat effects in each, for at most six prevented points per run. Court Power earns `palace.court-power.formal-introduction`, a Specialist with three uses per run that, after legal career access and one completed shift, may use an explicitly authored eligible event to advance an ordinary professional relationship exactly into its normal first professional stage, at most once per relationship. Inner Truth earns automatic knowledge `palace.inner-truth.source-method`, inherited without loadout cost; it exposes authored source/provenance/contradiction cross-check content in already-legal scenes but directly changes no resources, stats, counters, stages or ending eligibility. Service/Court consume normal D28 Specialist slots; there is no free Palace slot. All three preserve D23, D24, D26, D29, D30/D32, D35 and D36 boundaries.

This paragraph is a recommendation only until Product records it.

---

# 47. Explicit non-goals

v13 does not:

- implement the rewards;
- change strong-Meta runtime/catalog;
- change D24 cap-200;
- change D28 capacities;
- change Secret Debt rewards or numeric parameters;
- change Hard Work packages;
- change D23 Palace entry;
- change Palace duties/topology;
- select a Prince confrontation model;
- name the Prince;
- define final macro mystery truth;
- change Activity D36 mechanics;
- grant a free loadout slot;
- implement UI.

No full CI is requested.

Freeze exact SHA and report:

`READY_FOR_LEADER_PRODUCT_DECISION`
