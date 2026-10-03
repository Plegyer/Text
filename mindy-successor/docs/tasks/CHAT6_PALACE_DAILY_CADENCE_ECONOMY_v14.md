# Chat 6 — Palace Daily Cadence + Duty Economy v14

Status: **READY FOR LEADER PRODUCT DECISION**  
Owner: Chat 6 / Palace Producer  
Branch: `chat6/palace-daily-cadence-economy-v14`

Authority preserved:
- D23 Palace entry;
- D29 rich six-stage topology;
- accepted v12 fifteen-duty map;
- D39 non-True rewards;
- D24 Return Home cap-200 reward;
- D19/D30/D32 Secret Debt;
- D35 housing/private-space;
- D36 Large Activity.

Research CSV:
`mindy-successor/research/palace_cadence_economy_v1.csv`

No production runtime/UI/content changes.
No full CI.

---

# 1. Executive recommendation

Recommend a refined **Model C***:

> At most **1 progression-counting Palace structural duty per calendar day**.  
> A structural duty costs **1 Energy**, pays a bounded Palace wage, and does **not** end daytime.  
> The player may also perform at most **1 optional non-counting Palace support/prep daytime action per day**, costing **1 Energy** and paying **0**.  
> Remaining Energy stays available for ordinary work, School, Activity entry, or other legal daytime systems.

Exact recommended authority candidates:

- structural duty Energy cost: **1**;
- max structural Palace duties/day: **1**;
- optional Palace support actions: **yes**;
- support Energy cost: **1**;
- max support actions/day: **1**;
- duty ends daytime: **no**;
- earliest duty 15: **Day 15** after Day-1 invitation;
- structural wage:
  `35 + min(20, floor((Reason + Wits + Manners + Sociability) / 20))`;
- wage range: **35..55 money**;
- structural wage paid once per committed duty;
- support work pays **0**;
- routine progression-stat gain from Palace duty: **none**;
- routine Lust gain: **none**;
- routine negative stat effect: **none**;
- Palace remains legal while Secret-Debt-bound **if access was legitimately opened before or during that life through D23**;
- bound state never changes Palace cadence/wage, but D19 forced Night and next-day Energy -1 still apply;
- no paid progression-counting Palace duty after duty 15;
- post-Outcome Palace daytime content uses non-counting support/review/event surfaces.

This keeps Palace substantial without turning it into either:
- a 5-day Energy burst; or
- fifteen dead calendar days where the player can do nothing else.

---

# 2. Current executable economy grounding

Live baseline from the Leader drift audit / Chat 3 affordability harness:

- starting money: **600**;
- base daily Energy: **3**;
- normal lodging: **100**;
- cheap lodging: **50**;
- street: **0**, with next-day Energy -1 and Grooming -1;
- paid School: **1 Energy**;
- School tuition: **300..500**;
- School direct stat packages: roughly **+6..+10 progression-stat points** per lesson;
- starter ordinary wages at all-1 stats: roughly **14..16**;
- three starter shifts: roughly **46/day** at fresh values;
- ordinary wages at stat cap 100: roughly **75..115**, depending on career;
- D26 ordinary same-career limit remains one shift/day.

This means Palace should not:
- pay like an unlimited late ordinary career;
- become a repeatable 100+ money action;
- provide routine multi-stat gains competitive with School;
- or create a second daily Energy engine.

---

# 3. Cadence model comparison

## Model A — one structural duty/day max

Rules:
- one Palace structural duty/day;
- 1 Energy candidate cost;
- no second structural duty that day.

Earliest duty 15:
**Day 15**.

Strengths:
- prevents burst completion;
- simple;
- preserves six-stage pacing.

Weakness:
- does not define how the accepted v12 route-prep / professional review / optional Palace daytime material coexists with the structural duty.
- If prep is free, Palace loses opportunity-cost clarity.
- If prep consumes whole days, the model can become artificial waiting.

Disposition:
**viable but incomplete**.

---

## Model B — Energy-driven multiple duties/day

Candidate:
- duty cost 1 Energy;
- base Energy 3;
- no daily Palace duty cap.

At base Energy 3:
- up to 3 Palace duties/day;
- 15 duties can complete in **5 days**.

While Secret-Debt-bound under base 3 -> forced next-day -1:
- 2 usable Energy;
- 15 duties can still complete in about **8 days** if the player does nothing else.

Problems:

1. Six accepted stages compress too aggressively.
2. Five structural milestone events occur inside a few days.
3. Service/Court/Truth prep windows barely have calendar identity.
4. Palace wage is front-loaded.
5. Player can spend all three Energy on the same ultra-late profession while D26 deliberately prevents same-career ordinary burst.
6. The accepted v12 37-scene authored core becomes much easier to consume as a short burst than intended by D29.

Disposition:
**reject**.

---

## Model C — one structural duty + support work

Base:
- max 1 structural duty/day;
- optional non-counting Palace support available separately.

Refined C* recommendation:

```text
structural Palace duty:
  cost 1 Energy
  max 1/calendar day
  pays bounded wage
  palaceDutyCount +1
  does not end daytime

Palace support/prep:
  cost 1 Energy
  max 1/calendar day
  pays 0
  palaceDutyCount +0
  no routine stats
  does not end daytime
```

At base Energy 3, a Palace day may look like:

```text
Palace duty 1
+ Palace prep/support 1
+ one other 1-Energy action
```

or:

```text
Palace duty 1
+ ordinary shift 1
+ School 1
```

if money/unlocks permit.

Or:

```text
Palace duty 1
+ Large Activity entry 2
```

if Activity is otherwise legal.

Disposition:
**recommend C***.

---

# 4. Structural duty Energy cost

Recommended:

**1 Energy**

Why:

- matches ordinary work and School action granularity;
- lets Palace coexist with other systems;
- does not require a special full-day action;
- still has a hard calendar cap through max one duty/day.

Why not 2:

- turns a 15-day Palace route into 30 Energy minimum;
- heavily crowds out School/ordinary work;
- bound Secret Debt base 2 Energy would make one Palace duty consume the entire daytime budget.

Why not 0:

- makes Palace progression free calendar content;
- weakens opportunity cost and economy.

---

# 5. Max structural duties per day

Recommended:

**1**

This is Palace-specific authority.

It is **not** D26 inheritance.

D26 remains ordinary-career-only.

Palace gets its own one-duty/day rule because:
- D29 deliberately chose a rich six-stage capstone;
- five milestones need authored breathing room;
- 15 structural duties are the entire progression arc.

---

# 6. Optional daytime support

Recommended:

**yes**

Support umbrella includes:
- route-prep beats;
- professional review;
- optional relationship-facing coordination;
- evidence/source review;
- other explicitly authored Palace daytime support.

Rules:

- costs 1 Energy;
- max one support action/day;
- does not increment `palaceDutyCount`;
- pays 0;
- no routine progression-stat gain;
- no routine Lust gain;
- no structural stage transition;
- cannot substitute for a duty;
- may write only its authored route/relationship/fact effects.

Support can occur:
- on a structural-duty day;
- or on a day without structural duty.

---

# 7. Duty does not end daytime

Recommended:

**Palace structural duty consumes Energy only; it does not force end-of-day.**

After the duty transaction and any blocking milestone event are resolved:
- daytime resumes if Energy remains.

This is essential for the 15-day cadence not to become dead waiting.

---

# 8. Earliest duty 15

Day-1 invitation is deterministic under D23.

Assume:
- invitation accepted on Day 1;
- Palace access granted;
- no forced blocking external flow prevents daytime action;
- player performs one structural duty each day.

Then:

```text
Duty 1  = Day 1
Duty 2  = Day 2
...
Duty 15 = Day 15
```

Earliest realistic Outcome Ready:
**Day 15**.

No legal Energy amount can move duty 15 earlier than Day 15.

---

# 9. Reference completion windows

These are reference pacing envelopes, not additional gates.

## Palace-focused life

Reference:
**Day 15**

Pattern:
- Palace duty every day;
- support prep on selected milestone days;
- remaining Energy still usable elsewhere.

## Mixed Palace + ordinary career

Reference:
**Day 19**

Reference duty days:

```text
1,2,3,
5,6,7,
9,10,11,
13,14,15,
17,18,19
```

Four days are deliberately ceded to non-Palace priorities.

On Palace duty days the player can still spend another Energy on ordinary work.

## Palace + School

Reference:
**Day 22**

Reference duty days:

```text
1,2,
4,5,
7,8,
10,11,
13,14,
16,17,
19,20,
22
```

The skipped days model School/economy priority.

This is intentionally a slower reference, not a requirement:
a wealthy player may do Palace duty + School on the same day because each costs 1 Energy.

---

# 10. Why Day15 is not dead waiting

Under C*:

- Palace consumes only 1 of base 3 Energy/day;
- six route-prep beats can fit into six Palace days using a second Energy;
- another Energy remains on those days;
- non-prep days retain 2 Energy after Palace duty.

Across 15 consecutive Palace days:

```text
15 Energy -> structural Palace duties
6 Energy  -> all three route prep pairs
24 Energy -> still available from the 45 base Energy envelope
```

before any Energy modifier/penalty.

So the 15-day structural minimum is a pacing floor, not fifteen full-day locks.

---

# 11. Wage comparison

At least three shapes were evaluated.

## Shape 1 — flat bounded wage

Candidate comparison:
**45 money/duty**

15 duties:
**675 total**

Pros:
- simple;
- bounded;
- easy to test.

Cons:
- professional stats do not matter at all;
- same pay at minimal and True-ready builds.

---

## Shape 2 — ordinary-like direct stat scaling

Comparison formula:

```text
round(
  15
  + Reason * 0.25
  + Wits * 0.25
  + Manners * 0.20
  + Sociability * 0.20
)
```

Equal professional stats:

| Each stat | Wage |
|---:|---:|
| 1 | 16 |
| 25 | 38 |
| 50 | 60 |
| 91 | 97 |
| 100 | 105 |
| 200 | 195 |

Problems:
- at True-ready values Palace approaches high ordinary wage scale;
- cap-200 makes it explode to 195;
- the already-high-stat player gets a large extra economy reward;
- 15 duties at 200 would pay 2925.

Disposition:
**reject unbounded direct scaling**.

---

## Shape 3 — mixed base + bounded stat component

Recommended formula:

```text
Palace wage =
35
+ min(
    20,
    floor(
      (Reason + Wits + Manners + Sociability) / 20
    )
  )
```

Range:
**35..55**

Equal professional stats:

| Each stat | Wage |
|---:|---:|
| 1 | 35 |
| 10 | 37 |
| 25 | 40 |
| 50 | 45 |
| 91 | 53 |
| 100 | 55 |
| 200 | 55 |

15-duty totals:
**525..825**

At all four stats 91:
**795 total**.

At cap-200:
still at most **825 total**.

Disposition:
**recommend**.

---

# 12. Why these wage stats

Use exactly:

- Reason;
- Wits;
- Manners;
- Sociability.

Purpose:
- represent professional judgment, coordination, protocol and communication;
- align with Palace work identity;
- avoid direct Lust dependence;
- avoid using all 12 stats as a wage multiplier;
- avoid rewarding True stat threshold with an economy explosion.

The wage formula is **distinct and bounded**, not the ordinary wage formula.

---

# 13. Economy pressure

Recommended max Palace wage over all structural duties:

**825**

Relative to current economy:

- 16.5 cheap lodging nights;
- 8.25 normal lodging nights;
- 2.75 cheapest 300-money lessons.

At lower professional stats, 15-duty total is 525–675.

Important:
before Day15 starts, a consecutive Palace route crosses 14 lodging decisions.

Cost:
- cheap: 700;
- normal: 1400.

Therefore:

- Palace duty can substantially support cheap lodging;
- it does not automatically finance normal lodging;
- remaining Energy/starting 600/other systems still matter;
- Palace is not an unlimited substitute for ordinary careers.

---

# 14. Optional support pay

Recommended:

**0 money**

Why:
- support/prep is chosen for route/relationship/content value;
- paying it would create a second Palace money loop;
- structural duties already carry wage;
- support can remain available after Outcome Ready without becoming a repeatable farm.

No tips/passive payout are implied.

A later explicitly authored one-time reward item/money choice would require separate authority.

---

# 15. Routine progression stats

Recommended:

**Palace structural duties grant no routine progression-stat package.**

Also:
- support actions grant no routine stats;
- no automatic Lust gain.

Reason:

Palace is already a late/meta-gated route.

If every one of 15 duties gave even +2 routine progression points:
- that is 30 points;
- concentrated family packages could materially accelerate 91 thresholds;
- a broad family map risks making Palace the preferred final stat-training engine.

Current School already has clear paid progression identity:
- 1 Energy;
- 300..500 money;
- approximately +6..+10 progression points per lesson.

Ordinary careers also have their own seasonal progression identity.

Palace should provide:
- route progression;
- authored relationships;
- ending access;
- bounded wage;

not a third dominant stat-grind system.

Authored one-time story effects may be considered later, but are not routine duty economy.

---

# 16. Negative duty effects

Recommended:

**none as routine Palace duty economy.**

No:
- seasonal -1 map;
- Lust penalty;
- random stat loss.

Reason:
- 15 duties are a short fixed capstone, unlike 50-shift ordinary careers;
- opportunity cost is already Energy + calendar cadence;
- adding negative stats would work directly against the 12×91 True threshold in an opaque way.

A specific authored scene may have a voluntary consequence later, but v14 does not create routine negatives.

---

# 17. Lodging interaction

Palace daytime work has **no lodging gate**.

## Normal

- daytime duties/support legal;
- D35 private-space branch may exist at Night where explicitly authored.

## Cheap

- daytime duties/support legal;
- no private-space-only Palace branch.

## Street

- daytime duties/support legal if final available Energy permits;
- street next-day Energy effects remain existing system authority;
- no private-space branch.

Palace wage is unchanged by lodging tier.

Palace does not make normal lodging cheaper or free.

---

# 18. Palace Night interaction

Palace Night remains separate from daytime economy.

Rules:
- optional;
- no duty count;
- no wage;
- no daytime Energy refund;
- no routine Palace duty stat package;
- normal Night calendar semantics;
- Secret Debt forced Night wins.

A player never needs Palace Night to:
- reach duty 15;
- prepare any of the three non-True routes;
- reach Prince confrontation;
- Return Home.

---

# 19. Secret Debt recommendation

Product question:
if Palace was already legitimately opened, may the bound character keep doing Palace daytime duties?

Recommendation:

**yes**.

Reason:

D19 explicitly locks the **10 ordinary professions**, not Palace.

Suspending Palace would add a new domain lock not currently implied by Secret Debt authority.

Exact rule:

> If `palace.access-granted` was legitimately obtained through D23 in the current life, becoming Secret-Debt-bound does not remove Palace access or reset Palace progression. Structural Palace duties/support remain legal subject to normal Palace cadence and the character's final available daytime Energy.

Preserved:
- all 10 ordinary careers remain locked;
- forced Night every bound night;
- next-day Energy -1 remains;
- School remains legal;
- Activity remains legal under D36 boundaries;
- debt remains 20000 all-at-once;
- Palace never changes debt/repayment.

---

# 20. Why Palace does not become a debt farm

Under recommended wage:
- absolute maximum all 15 structural duties = **825**;
- 825 / 20000 = **4.125%** of debt.

If some duties were completed before binding, remaining bound Palace earning is lower.

After duty 15:
- there is no paid progression-counting structural Palace duty;
- support pays 0.

Thus Palace cannot be repeated until it pays the 20000 debt.

This is the key condition for allowing Palace while bound.

---

# 21. Secret Debt Energy ordering

D27/D30 ordering remains:

```text
base/max Energy and selected modifiers
-> Secret Debt forced next-day -1
-> final available Energy for daytime actions
-> Palace duty/support spends from that final Energy
```

Example with no Energy Keystone:

unbound:
`3 Energy`

bound:
`2 Energy`

Bound day can still do:
- one Palace duty + one 1-Energy action;
or
- two other legal 1-Energy actions;
or
- one 2-Energy Activity entry if otherwise legal.

It cannot spend pre-penalty Energy.

Palace does not refund the penalty.

---

# 22. Save/reload duty transaction

Structural duty must be atomic.

Required transaction:

1. validate active run;
2. validate Palace access;
3. validate `palaceDutyCount < 15`;
4. validate no structural Palace duty already committed on this calendar day;
5. validate Energy >=1;
6. determine exact next authored duty ordinal = current count +1;
7. calculate wage from current pre-duty professional stats;
8. atomically:
   - Energy -1;
   - money + wage;
   - `palaceDutyCount +1`;
   - record current calendar day as structural-duty-used;
   - record committed duty ordinal/ID;
9. apply exact v11 stage transition if count is 2/5/8/12/15;
10. at 15 write `palace.progression-complete`;
11. resolve blocking milestone reaction.

If save occurs after step 8/9 but before milestone resolution:
- Energy is already spent;
- wage already paid;
- count already incremented;
- daily lock already set;
- milestone resumes from pending/latched state.

Reload must not repay or recount.

---

# 23. Exactly-once duty count

A structural duty ID/ordinal may commit only when:

```text
expected ordinal == palaceDutyCount + 1
```

After successful commit:
- that ordinal is no longer legal;
- current day structural slot is closed.

A retry after network/reload cannot:
- increment twice;
- pay twice;
- trigger milestone twice.

Failed validation:
- no Energy spent;
- no wage;
- no count;
- no daily lock.

---

# 24. Duty farming prevention

Recommended invariant:

`palaceDutyCount` structural progression is capped at **15**.

After Outcome Ready:
- the 15 structural mapped duties are complete;
- no 16th progression-counting paid duty exists;
- optional work/review/social daytime content uses the support envelope;
- support pays 0.

This directly prevents:
- repeated Palace wage farming;
- repeated progression-complete emission;
- post-ending duty-count inflation.

---

# 25. Route-prep beats under C*

Route-prep beats are Palace support actions when player-initiated in daytime.

They:
- cost 1 Energy;
- max one Palace support action/day;
- pay 0;
- add no duty count.

Accepted pairs:

Service Life:
- continuity;
- boundaries.

Court Power:
- responsibility;
- network.

Inner Truth:
- evidence;
- contradiction.

They can coexist with daily structural progression.

---

# 26. Focused route-prep timing

With one duty every day:

## Service Life

Duty 5:
Day 5 -> Trusted Service.

Earliest prep:
- Beat 1 Day 5;
- Beat 2 Day 6;
- `palace.prep.service-life` by Day 6.

## Court Power

Duty 8:
Day 8 -> Palace Network.

Earliest prep:
- Beat 1 Day 8;
- Beat 2 Day 9;
- `palace.prep.court-power` by Day 9.

## Inner Truth

Duty 12:
Day 12 -> Crossroads.

Earliest prep:
- Beat 1 Day 12;
- Beat 2 Day 13;
- `palace.prep.inner-truth` by Day 13.

All are ready for Outcome Ready finalization when duty 15 lands on Day 15.

---

# 27. Non-exclusive final readiness timing

At Day15 focused reference:

```text
palace stage = outcome-ready
palace.progression-complete = present
prep.service-life = present
prep.court-power = present
prep.inner-truth = present
```

Then each finalize event may independently write:

```text
palace.outcome.service-life-ready
palace.outcome.court-power-ready
palace.outcome.inner-truth-ready
```

All three may coexist.

No finalize event:
- consumes another route;
- commits an ending;
- requires a new duty day.

Explicit ending commit remains separate.

---

# 28. Exact Day1 -> Day15 reference timeline

| Day | Structural duty | Resulting stage / milestone | Optional Palace support | Remaining base Energy after shown Palace actions |
|---:|---|---|---|---:|
| 1 | Duty 1 — Service Rotation | Entered Service | none | 2 |
| 2 | Duty 2 — Logistics Support | Working Rhythm / milestone-02 | none | 2 |
| 3 | Duty 3 — Records Review | Working Rhythm | none | 2 |
| 4 | Duty 4 — Service Rotation | Working Rhythm | none | 2 |
| 5 | Duty 5 — Logistics Support | Trusted Service / milestone-05 | Service Life prep 1 | 1 |
| 6 | Duty 6 — Coordination | Trusted Service | Service Life prep 2 -> prep fact | 1 |
| 7 | Duty 7 — Records Review | Trusted Service | none | 2 |
| 8 | Duty 8 — Service Rotation | Palace Network / milestone-08 | Court Power prep 1 | 1 |
| 9 | Duty 9 — Formal Interface | Palace Network | Court Power prep 2 -> prep fact | 1 |
| 10 | Duty 10 — Coordination | Palace Network | none | 2 |
| 11 | Duty 11 — Logistics Support | Palace Network | none | 2 |
| 12 | Duty 12 — Records Review | Crossroads / milestone-12 | Inner Truth prep 1 | 1 |
| 13 | Duty 13 — Evidence Review | Crossroads | Inner Truth prep 2 -> prep fact | 1 |
| 14 | Duty 14 — Formal Interface | Crossroads | none | 2 |
| 15 | Duty 15 — Coordination | Outcome Ready / progression-complete / milestone-15 | route finalization may follow as non-Energy event flow | 2 |

Earliest focused final-ready timing:
- Service Life preparation complete: **Day 6**;
- Court Power preparation complete: **Day 9**;
- Inner Truth preparation complete: **Day 13**;
- all three non-True final-ready conditions can coexist from **Day 15** after finalization.

---

# 29. Acceptance matrix

## Cadence

V14-A01 — D23 remains the only Palace entry gate.  
V14-A02 — Structural duty costs exactly 1 Energy.  
V14-A03 — At most one structural Palace duty can commit per calendar day.  
V14-A04 — Extra Energy cannot allow a second structural duty that day.  
V14-A05 — Duty does not end daytime.  
V14-A06 — Earliest duty 15 from Day-1 access is Day 15.  
V14-A07 — D26 ordinary-career rule is not reused as the implementation authority for Palace.

## Support

V14-A08 — At most one Palace support daytime action/day.  
V14-A09 — Support costs 1 Energy.  
V14-A10 — Support pays 0.  
V14-A11 — Support increments no Palace duty counter.  
V14-A12 — Route prep can occur on same day as structural duty if Energy remains.

## Wage

V14-A13 — Wage formula candidate is `35 + min(20,floor((R+W+M+S)/20))`.  
V14-A14 — Wage never falls below 35.  
V14-A15 — Wage never exceeds 55, including cap-200 stats.  
V14-A16 — Four stats at 91 produce wage 53.  
V14-A17 — Wage paid exactly once per committed structural duty.  
V14-A18 — Total structural Palace wage cannot exceed 825/run.  
V14-A19 — Support never pays Palace wage.

## Stats

V14-A20 — Structural duty grants no routine progression stats.  
V14-A21 — Support grants no routine progression stats.  
V14-A22 — Palace duty/support grants no automatic Lust.  
V14-A23 — No routine Palace negative stat map exists.

## Lodging / Night

V14-A24 — Normal/cheap/street do not gate Palace daytime duty.  
V14-A25 — D35 private-space remains Night/content-only.  
V14-A26 — Palace Night gives no duty count/wage.  
V14-A27 — Secret Debt forced Night suppresses Palace voluntary Night.

## Secret Debt

V14-A28 — Legitimately opened Palace remains accessible while bound.  
V14-A29 — All ten ordinary careers remain locked while bound.  
V14-A30 — Bound same-loadout available Energy remains exactly one below unbound under D19 ordering.  
V14-A31 — Palace cannot change debt, repayment, lender chance or forced Night.  
V14-A32 — Maximum all-15 Palace wage is 825, not a repeatable debt farm.  
V14-A33 — No paid structural duty exists after duty 15.

## Save/reload

V14-A34 — Failed duty validation changes no Energy/money/count/day lock.  
V14-A35 — Successful duty atomically spends 1 Energy, pays wage, increments once and records daily lock.  
V14-A36 — Reload after transaction cannot pay/increment again.  
V14-A37 — Milestones 2/5/8/12/15 remain exactly-once.  
V14-A38 — `palace.progression-complete` remains exactly-once at duty 15.

## Route prep / endings

V14-A39 — Service prep may complete by Day6 focused reference.  
V14-A40 — Court prep may complete by Day9 focused reference.  
V14-A41 — Inner Truth prep may complete by Day13 focused reference.  
V14-A42 — All three final-ready facts may coexist after Outcome Ready.  
V14-A43 — No route prep/finalize auto-commits an ending.  
V14-A44 — D39 rewards are unchanged.  
V14-A45 — True Ending still requires Outcome Ready + progression-complete + 12x91 + Prince defeat + explicit Return Home.  
V14-A46 — Lust remains excluded from True stat gate.

---

# 30. Balance risks

## Risk — Palace wage too high

Mitigation:
- hard cap 55;
- only 15 paid structural duties;
- no paid repeatable structural work after 15.

## Risk — Palace too low-income

Mitigation:
- base 35 is above fresh single starter shift;
- remaining daytime Energy allows ordinary work;
- starting money 600 remains available;
- high professional build reaches 53–55.

## Risk — one-duty/day feels slow

Mitigation:
- duty consumes only 1/3 base Energy;
- support and other systems remain usable;
- all prep can fit inside the same 15-day window.

## Risk — Palace becomes final stat grind

Mitigation:
- routine Palace stat gain = 0;
- School and ordinary careers retain stat-progression identity.

## Risk — bound Secret Debt player farms Palace

Mitigation:
- finite 15 paid duties;
- max 825 total;
- post-15 support pays 0;
- forced Night/Energy penalty unchanged.

---

# 31. Recommended Product lock text

> Palace uses a one-structural-duty-per-calendar-day cadence independent of D26. A structural Palace duty costs 1 Energy, does not end daytime, increments the accepted fifteen-duty Palace progression exactly once, and pays `35 + min(20, floor((Reason + Wits + Manners + Sociability)/20))` money, bounded to 35–55. At most one optional non-counting Palace support/preparation daytime action may also be taken per day; it costs 1 Energy, pays 0 and grants no routine progression stats. Palace duties/support grant no automatic Lust and have no routine negative-stat package. No paid progression-counting structural duty exists after duty 15. Normal/cheap/street lodging do not gate daytime Palace work; Palace Night remains optional and Secret Debt forced Night wins. If Palace access was legitimately opened under D23, Secret-Debt binding does not suspend Palace daytime access, but all ten ordinary careers remain locked and the forced next-day Energy -1 is applied before Palace action costs. Duty commit is atomic and reload-safe. Route-preparation facts remain non-exclusive and all three non-True Palace endings may be ready simultaneously at Outcome Ready before explicit ending commit.

This is a recommendation until Product records it.

---

# 32. Exact final table

| Параметр | Рекомендованное значение | Почему | Balance risk | Acceptance test |
|---|---|---|---|---|
| Модель cadence | **C\***: 1 structural duty/day + optional support | сохраняет rich-six pacing и оставляет дневной budget для других систем | слишком медленно, если duty завершает день | V14-A03/A05/A06 |
| Energy structural duty | **1** | совпадает с ordinary work/School granularity | 0 было бы free progression; 2 слишком давит bound/School play | V14-A02 |
| Max structural duties/day | **1** | не даёт 5-day burst Model B | artificial waiting | V14-A03/A04 |
| Optional daytime support | **да, max 1/day** | route prep/relationships не должны вытеснять duty-day | content spam | V14-A08 |
| Support Energy | **1** | реальный opportunity cost | может конкурировать с School | V14-A09 |
| Support pay | **0** | не создаёт второй money loop | может восприниматься как unpaid work | V14-A10/A19 |
| Duty ends daytime | **нет** | 15 дней не становятся 15 full-day locks | возможна плотная комбинация систем | V14-A05 |
| Earliest duty 15 | **Day 15** | один structural duty/day от Day1 | Palace всё ещё короткий при полном фокусе | V14-A06 |
| Palace-focused reference | **Day 15** | ежедневная duty cadence | быстрый authored consumption | timeline |
| Mixed Palace+ordinary reference | **Day 19** | четыре дня отданы другим приоритетам | только reference, не gate | reference CSV |
| Palace+School reference | **Day 22** | семь приоритетных School/economy дней | tuition может замедлить иначе | reference CSV |
| Structural wage | **35 + min(20,floor((Reason+Wits+Manners+Sociability)/20))** | modest professional scaling без cap-200 explosion | формула новая/отдельная | V14-A13 |
| Wage range | **35..55** | ниже late ordinary upper envelope, но выше fresh single starter shift | base 35 всё ещё полезнее starter shift | V14-A14/A15 |
| Wage at 91×4 | **53** | True-ready build не получает 100+ Palace wage | может быть консервативно | V14-A16 |
| Max 15-duty Palace pay | **825** | finite late-route economy | может финансировать cheap lodging, но не debt | V14-A18/A32 |
| Routine duty stats | **нет** | Palace не становится fastest 12×91 training engine | меньше numerical reward per duty | V14-A20 |
| Routine support stats | **нет** | support остаётся content investment | то же | V14-A21 |
| Automatic Lust | **нет** | Lust не связан с Palace duty и вне True gate | none | V14-A22 |
| Routine negative stats | **нет** | 15-duty capstone не должен тайно отталкивать от 91 gate | Palace мягче ordinary careers | V14-A23 |
| Wage scaling system | **distinct bounded Palace formula** | ordinary-style direct scaling слишком разгоняется при 91/200 | новый formula path | V14-A13/A15 |
| Normal lodging | daytime Palace legal | D35 private-space только authored Night branch | normal всё ещё дороже | V14-A24/A25 |
| Cheap lodging | daytime Palace legal | no global housing work gate | private branch unavailable | V14-A24 |
| Street | daytime Palace legal при Energy | housing не отменяет access | street -1 Energy снижает дневной budget | V14-A24 |
| Palace Night | optional, 0 duty, 0 wage | отдельный Night layer | forced Night collision | V14-A26/A27 |
| Secret Debt Energy order | modifiers -> forced -1 -> action spending | сохраняет D19/D30 invariant | bound schedule tighter | V14-A30 |
| Palace while Secret-Debt-bound | **legal if D23 access already legitimate** | D19 locks ordinary 10, не Palace | debt farm | V14-A28/A32/A33 |
| Post-duty15 paid work | **нет** | anti-farm / exact 15 authored duties | меньше long-tail economy | V14-A33 |
| Save/reload boundary | atomic Energy+wage+count+day-lock before reactions | no duplicate progression/pay | transaction complexity | V14-A34-A38 |
| Route prep cadence | support action, 1 Energy, no duty count/pay | помещается внутри 15-day route | may consume School/work Energy | V14-A12 |
| Service Life prep | Day5 start / Day6 fact / Day15 final-ready earliest | D29 Trusted Service | none | V14-A39 |
| Court Power prep | Day8 start / Day9 fact / Day15 final-ready earliest | D29 Palace Network | none | V14-A40 |
| Inner Truth prep | Day12 start / Day13 fact / Day15 final-ready earliest | D29 Crossroads | none | V14-A41 |
| Non-exclusive readiness | all 3 may coexist Day15 | preserves D29/v12 | UI needs clear explicit commit | V14-A42/A43 |
| True Ending handoff | unchanged: Outcome Ready + progression-complete + 12x91 + Prince defeat + explicit Return Home | v14 is cadence/economy only | none | V14-A45/A46 |

---

## Exact reference endpoint

Focused reference:
- Day 1: invitation accepted + duty 1;
- Day 5: Trusted Service;
- Day 6: Service Life prep complete;
- Day 8: Palace Network;
- Day 9: Court Power prep complete;
- Day 12: Crossroads;
- Day 13: Inner Truth prep complete;
- Day 15: duty 15 -> Outcome Ready + `palace.progression-complete`;
- Day 15 after milestone/finalize flow: Service Life, Court Power and Inner Truth may all be final-ready simultaneously;
- explicit ending commit remains separate;
- Prince/Return Home path remains separate.

**READY_FOR_LEADER PRODUCT DECISION**
