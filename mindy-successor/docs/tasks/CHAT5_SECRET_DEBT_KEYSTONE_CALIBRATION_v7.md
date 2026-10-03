# Chat 5 — Secret Debt D30 Keystone numeric calibration v7

Status: **READY FOR LEADER / PRODUCT DECISION — NOT RUNTIME AUTHORITY**
Owner: Chat 5 / Full-Career Producer C
Branch: `chat5/secret-debt-keystone-calibration-v7`
Authority base: `main@69eaedb1950e3ea712119388e1734c526a93be21`
Accepted design source: `chat5/secret-debt-ending-meta-rewards-v6@461bfa161e00bea15bbda15baea2c08b2f6aa52a`

This packet calibrates only the still-open numeric parameters of the three D30 Secret Debt Keystones.

No runtime/UI implementation is made.

The calculations use:
- current executable wage formulas;
- current lodging prices;
- current paid School tuition;
- D26 one-shift-per-same-ordinary-career-per-day;
- the frozen Secret Debt balance-harness ordering for bound Energy:
  selected Energy modifier first, then forced Secret Debt next-day `-1`.

Old WU documents and original-game values are comparison/reference only and are not targets.

---

# 1. Current executable baseline

## Fresh run

- starting money = **600**;
- base daily Energy = **3**;
- calendar = **160 days**;
- ordinary Hard Work = **50 same-career shifts**;
- D26 means one ordinary profession can never reach Hard Work before **Day 50**.

## Lodging

- normal = **100/night**;
- cheap = **50/night**;
- street = **0**, with its own next-day Energy penalty.

## Paid School

Current tuition range:
- minimum = **300**;
- maximum = **500**;
- one lesson costs **1 Energy**.

Therefore:
- 500 money = 1 expensive lesson or 1 cheap lesson + remainder;
- 750 money = 1 expensive / 2 cheap lessons;
- 1000 money = 2 expensive / 3 cheap lessons;
- 1500 money = 3 expensive / 5 cheap lessons.

## Current ordinary wage snapshots

Current formulas remain:
`round(base + sum(stat × factor))`.

For calibration, three explicit live snapshots are used.

### Starter

At all-1 stats:
- Lumber = 14;
- Satyr Maid = 16;
- Undead Farm = 16.

One shift in each starter career:
**46/day**.

Representative one-career wage:
**16/day**.

### Mid

Using equal relevant stats ~=30 and the three highest current ordinary wage formulas:
- ~45;
- ~44;
- ~44.

Diversified three-career total:
**133/day**.

Representative one-career wage:
**44/day**.

### Late

Using equal relevant stats ~=80 and the three highest current ordinary wage formulas:
- ~95;
- ~91;
- ~91.

Diversified three-career total:
**277/day**.

Representative one-career wage:
**91/day**.

These are calibration snapshots, not proposed stat defaults.

---

# 2. D30 invariant frame

All three rewards are already locked as Keystones.

Per D28:
- active Keystones = **0..1**;
- active Specialists = **0..2**;
- cap-200 remains a normal Specialist;
- ordinary Hard Work packages remain a separate unrestricted layer.

Therefore these three rewards:
- cannot stack with each other;
- cannot stack with unconditional +1 daily Energy;
- cannot stack with No Rent;
- cannot stack with another substantial passive-income Keystone.

They may coexist with:
- cap-200 as one Specialist;
- one additional Specialist;
- any selected earned ordinary Hard Work packages.

None may:
- change lender discovery;
- alter +2000 / 10-day / 20000 Secret Debt;
- cancel forced Night;
- cancel bound next-day Energy -1;
- unlock ordinary careers while bound;
- count toward Palace D23.

---

# 3. Earned Reserve Match sweep

Locked identity:
- 1:1 match on eligible ordinary-profession wages;
- not bound;
- finite per-run cap;
- no match on hidden work, lender money, repayment, School/Activity/item/passive income.

Swept caps:
**500 / 750 / 1000 / 1500**.

## 3.1 Cap reach day — diversified work-heavy pattern

Assumption:
- spend 3 Energy on 3 different ordinary career shifts;
- D26 remains respected.

| Cap | Starter 46/day | Mid 133/day | Late 277/day |
| ---: | ---: | ---: | ---: |
| 500 | Day 11 | Day 4 | Day 2 |
| 750 | Day 17 | Day 6 | Day 3 |
| **1000** | **Day 22** | **Day 8** | **Day 4** |
| 1500 | Day 33 | Day 12 | Day 6 |

The reward is intentionally much faster to fill for a diversified work build than for a one-career Hard Work build.

## 3.2 Cap reach day — one-career focus

Assumption:
- one eligible ordinary shift/day;
- remaining Energy may go elsewhere;
- D26 therefore fixes same-career rate at 1/day.

| Cap | Starter 16/day | Mid 44/day | Late 91/day |
| ---: | ---: | ---: | ---: |
| 500 | Day 32 | Day 12 | Day 6 |
| 750 | Day 47 | Day 18 | Day 9 |
| **1000** | **Day 63** | **Day 23** | **Day 11** |
| 1500 | Day 94 | Day 35 | Day 17 |

At Day 50 Hard Work:
- starter one-career focus has earned only **800** eligible wage;
- therefore cap 1000 and 1500 are not yet exhausted;
- cap 500 and 750 already are.

This is an important distinction.

A 1000 cap does not automatically become "free full value before the first Hard Work" for a low-wage focused career.

## 3.3 Value by Day 40 / Hard Work 50 / Day 160

Diversified work-heavy:
- all four caps are fully reached by Day 40 even at starter wages.

Starter one-career focus:
- Day 40:
  - cap 500 => 500;
  - cap 750 => 640;
  - cap 1000 => 640;
  - cap 1500 => 640;
- Day 50:
  - cap 500 => 500;
  - cap 750 => 750;
  - cap 1000 => 800;
  - cap 1500 => 800;
- Day 160:
  - all four caps can eventually fill.

Thus cap size primarily controls:
- how long the Keystone remains economically relevant;
- how much value a diversified multi-career worker can extract.

It does **not** change the per-wage 1:1 rate.

## 3.4 Purchasing-power comparison

| Cap | Normal nights | Cheap nights | Paid School equivalent |
| ---: | ---: | ---: | --- |
| 500 | 5 | 10 | 1 expensive / 1 cheap |
| 750 | 7.5 | 15 | 1 expensive / 2 cheap |
| **1000** | **10** | **20** | **2 expensive / 3 cheap** |
| 1500 | 15 | 30 | 3 expensive / 5 cheap |

## 3.5 Economy-pressure test

At fresh starter diversified work:
- base wages = 46/day;
- with active 1:1 matching before cap = 92/day.

Consequences:
- cheap 50 lodging becomes sustainably payable with surplus;
- normal 100 lodging still exceeds that day's three starter wages + match.

So the Keystone meaningfully improves solvency without making the best lodging free.

Starter one-career focus:
- 16 wage + 16 match = 32/day;
- still below cheap lodging 50.

Thus the reward strongly favors its intended **work-first / diversified labor** identity rather than universally deleting poverty pressure.

## 3.6 Ordinary-career unlock timing

Money does not directly satisfy ordinary stat/year unlock gates.

Indirect acceleration is possible through School:
- 1000 buys only 2–3 current paid lessons;
- that can advance a stat build;
- but the player must first earn the eligible ordinary wages.

1500 buys 3–5 lessons and extends doubled-wage pressure substantially longer.

That is the first cap where the reward begins to look like a broad School-financing package as well as a work-solvency package.

## 3.7 Recommendation

**Recommend Earned Reserve Match cap = 1000.**

Why not 500:
- exhausted too quickly;
- one starter focused career fills it by Day 32;
- weak Keystone identity.

Why not 750:
- starter focused career fills it around Day 47, effectively at first Hard Work;
- less enduring than desired for a run-defining option.

Why 1000:
- work-heavy diversified play reaches it around Day 22;
- low-wage one-career focus does not finish it until after Hard Work 50;
- buys meaningful but bounded School/housing support;
- does not sustain normal lodging from fresh three-job wages by itself.

Why not 1500:
- 15 normal / 30 cheap nights;
- 3–5 lessons;
- diversified fresh work remains doubled for roughly one third of the first year;
- starts to compress too many economy pressures at once.

**v7 proposal: `reserveMatchCap = 1000`.**

---

# 4. Work Rhythm sweep

Locked identity:
- ordinary shift today arms +1 usable Energy tomorrow;
- non-stacking;
- finite number of bonus days;
- hidden work / School / Activity do not arm it;
- D26 unchanged;
- Secret Debt forced -1 still applies relative to same unbound loadout.

Swept trigger caps:
**10 / 15 / 20 / 25**.

## 4.1 Maximum extra action economy

Each triggered day supplies exactly one extra usable Energy.

| Trigger cap | Maximum extra Energy/actions |
| ---: | ---: |
| 10 | 10 |
| 15 | 15 |
| **20** | **20** |
| 25 | 25 |

Continuous ordinary work can arm the reward daily.

If the first ordinary shift occurs on Day 1:
- 10-cap last earliest bonus day = Day 11;
- 15 => Day 16;
- 20 => Day 21;
- 25 => Day 26.

## 4.2 Comparison with unconditional +1 daily Energy

Unconditional +1 daily Energy would provide, conceptually:
- 40 extra Energy by Day 40;
- 50 by Hard Work Day 50;
- 160 over the full calendar.

Work Rhythm maximum shares:

| Trigger cap | vs +1 by Day 40 | vs +1 by Day 50 | vs +1 over 160 |
| ---: | ---: | ---: | ---: |
| 10 | 25% | 20% | 6.25% |
| 15 | 37.5% | 30% | 9.4% |
| **20** | **50%** | **40%** | **12.5%** |
| 25 | 62.5% | 50% | 15.6% |

Work Rhythm can resemble unconditional +1 during an early uninterrupted work streak, but its lifetime value remains sharply capped.

That is why it remains a distinct Keystone rather than a disguised permanent +1 Energy.

## 4.3 Work conversion under D26

### Only three starter careers unlocked

Base Energy 3 can already fund:
- one Lumber shift;
- one Satyr shift;
- one Undead shift.

A bonus fourth Energy cannot create a fourth starter-career shift because:
- D26 forbids repeating one of those careers that day.

The bonus instead supports:
- one paid School lesson while preserving the three starter shifts;
- or Activity scheduling;
- or another system action.

This prevents the Keystone from simply multiplying starter-career Hard Work speed.

### Four or more ordinary careers unlocked

A bonus day can fund:
- one additional shift in a **different** ordinary career.

With 20 triggers:
- at most 20 such extra cross-career shifts.

No one career can exceed one shift/day.

## 4.4 Earliest Hard Work

For every trigger cap:

**Earliest same-career Hard Work remains Day 50.**

Reason:
- D26 is the binding rule;
- Work Rhythm supplies Energy, not permission to repeat the same career.

It can accelerate:
- second/third/fourth career progress in parallel;
- School progress while maintaining work;
- Activity participation while maintaining more work.

It cannot make one ordinary Hard Work occur on Day 49.

## 4.5 School conversion

One paid lesson costs 1 Energy.

Energy-wise, the trigger caps can fund at most:
- 10;
- 15;
- 20;
- 25

additional lessons without sacrificing another 1-Energy action.

But current tuition constrains this:

| Bonus days | Tuition needed for all bonus Energy to become lessons |
| ---: | ---: |
| 10 | 3000–5000 |
| 15 | 4500–7500 |
| **20** | **6000–10000** |
| 25 | 7500–12500 |

Thus Work Rhythm does not produce free School progression.

The player still needs a strong economy to turn all bonus Energy into paid lessons.

## 4.6 Activity conversion

Current Large Activity entry uses 2 Energy.

Typical day:
- base 3 => Activity 2 + one 1-Energy action;
- Work Rhythm bonus day 4 => Activity 2 + two 1-Energy actions.

So each Rhythm bonus can preserve one additional work/School action around an Activity day.

Again:
- the reward does not make Activity free;
- it increases schedule flexibility.

## 4.7 Later Secret Debt bind

If an ordinary shift has already armed tomorrow's bonus and the trap becomes bound before that morning:

same unbound Work Rhythm day:
- base 3 + Rhythm 1 = 4.

same bound day:
- base 3 + Rhythm 1 + forced Secret Debt -1 = 3.

The bound loadout remains exactly one usable Energy lower.

Once bound:
- ordinary careers are locked;
- hidden Secret Debt work does not arm Work Rhythm;
- School/Activity do not arm it.

Therefore no new Rhythm bonus is generated during the bound period.

Unused trigger capacity remains unused until ordinary work becomes legal again.

## 4.8 Recommendation

**Recommend Work Rhythm maximum triggered bonus days = 20.**

Why not 10:
- only 6.25% of full-calendar unconditional +1;
- can feel like a short opening consumable rather than a labor-rhythm Keystone.

Why not 15:
- credible, but still ends very early in sustained-work runs;
- less room for a multi-week School/Activity hybrid identity.

Why 20:
- 20 extra Energy/actions is clearly meaningful;
- only 12.5% of unconditional +1 across 160 days;
- earliest Hard Work remains Day 50;
- still requires up to 6000–10000 tuition to convert all value into School;
- stops arming completely while Secret Debt-bound.

Why not 25:
- reaches 62.5% of unconditional +1's first-40-day value;
- increasingly close to "permanent +1 for the whole opening season/year" in continuous-work play.

**v7 proposal: `workRhythmMaxBonusDays = 20`.**

---

# 5. Network Retainer sweep

Locked identity:
- fixed payment on eligible early-run days;
- paused while Secret Debt-bound;
- missed bound payments are not banked;
- finite duration/total.

Required total-power envelopes:
~500 / ~750 / ~1000 / ~1500.

## 5.1 Shapes tested

### ~500

- 20 × 25 days = 500;
- 25 × 20 = 500;
- 50 × 10 = 500.

### ~750

- 25 × 30 = 750;
- 30 × 25 = 750;
- 50 × 15 = 750.

### ~1000

- 20 × 50 = 1000;
- **25 × 40 = 1000**;
- 40 × 25 = 1000;
- 50 × 20 = 1000.

### ~1500

- 30 × 50 = 1500;
- 50 × 30 = 1500;
- 75 × 20 = 1500.

## 5.2 Front-loading test

Fresh starter diversified wages = 46/day.

Daily Retainer compared with that wage:

- 20/day = ~43% of starter three-shift income;
- **25/day = ~54%**;
- 30/day = ~65%;
- 40/day = ~87%;
- 50/day = ~109%;
- 75/day = ~163%.

Any shape at 50/day or above:
- equals or exceeds cheap lodging 50;
- equals or exceeds the entire fresh three-starter-shift wage package.

That means:
- cheap lodging can be paid by the Retainer alone during the payment window;
- work becomes optional for basic cheap-housing solvency.

This is too front-loaded for the intended D30 identity.

Therefore 50/day and 75/day shapes are rejected for recommendation even if their total cap is moderate.

## 5.3 Long-tail test

20 × 50:
- daily pressure is mild;
- but passive income persists for 50 days.

30 × 50:
- larger daily pressure;
- total 1500;
- persists through 50 days.

A long passive tail increasingly behaves like a generic income system rather than an early-run network retainer.

The 40-day boundary is cleaner:
- exactly one 40-day game year;
- finite;
- easy for UI and save tests;
- ends before the second-year stretch.

## 5.4 Recommended 25 × 40 profile

Payment:
**25/day for 40 eligible days**.

Maximum:
**1000/run**.

Cumulative value if unbound:

| Eligible unbound payment days | Total |
| ---: | ---: |
| 10 | 250 |
| 20 | 500 |
| 30 | 750 |
| 40 | 1000 |

Purchasing power at full value:
- 10 normal lodging nights;
- 20 cheap lodging nights;
- 2 expensive paid School lessons;
- 3 cheap paid School lessons.

## 5.5 Work-necessity test

Fresh diversified starter work:
- wages = 46/day;
- Retainer = 25/day;
- combined = 71/day.

Result:
- cheap lodging 50 becomes sustainable with some surplus;
- normal lodging 100 is still not sustainable from the daily package alone.

One starter-career shift:
- ~16 wage +25 =41;
- still below cheap lodging.

Two ~16 starter shifts:
- ~32 +25 =57;
- enough for cheap lodging.

Therefore the Retainer reduces the minimum labor needed for cheap housing:
- from roughly three fresh starter shifts/day to roughly two.

It does **not** make basic work unnecessary.

This is exactly why the effect remains Keystone-class:
it broadly changes economy pressure even though it does not erase it.

## 5.6 School affordability

25/day does not create a Day-1 lesson by itself.

Accumulation:
- after 10 eligible days: 250;
- after 20: 500;
- after 30: 750;
- after 40: 1000.

So the passive reward:
- finances School gradually;
- does not front-load several 300–500 lessons immediately.

## 5.7 Secret Debt bind during payment window

Payments pause while actively bound.

Missed days:
- are lost;
- never bank;
- never repay after release.

For the recommended shape:

- 10 eligible unbound days before/during the window => 250 total received;
- 20 => 500;
- 30 => 750;
- 40 => full 1000.

An early bind therefore sharply reduces the reward's realized value.

This protects:
- the 20000 repayment tension;
- forced-work economy;
- the route's trap identity.

The Retainer never directly pays during the bound period.

## 5.8 Recommendation

**Recommend Network Retainer = 25/day × 40 eligible calendar days = 1000 maximum.**

Why not ~500:
- materially weaker than the other D30 Keystone identities;
- 500 is only 5 normal nights / about one expensive School lesson.

Why not ~750:
- viable conservative alternative;
- but shorter/less distinctive relative to Earned Reserve Match.

Why 1000:
- same total ceiling as Reserve Match but radically different acquisition:
  - Reserve = earned by ordinary work;
  - Retainer = passive, gradual, pausable;
- 25/day remains below cheap lodging and below fresh three-career wage total;
- 40 days is one game year and clearly finite;
- early Secret Debt bind can reduce realized value well below 1000.

Why not 1500:
- 15 normal / 30 cheap nights;
- 3–5 paid lessons;
- every sampled 1500 shape either lasts 50 days or needs a highly front-loaded 50–75/day rate;
- too close to a dominant broad economy Keystone.

**v7 proposal: `networkRetainerDaily = 25`, `duration = 40`, `totalCap = 1000`.**

---

# 6. Cross-reward calibration

Recommended exact set:

| Ending | Keystone | Proposed exact numeric parameter |
| --- | --- | --- |
| Paid Freedom | Earned Reserve Match | **1:1, cap 1000/run** |
| Bound Life | Work Rhythm | **max 20 triggered +1-Energy days/run** |
| Takeover | Network Retainer | **25/day × 40 eligible days, max 1000/run** |

These Keystones remain mutually exclusive by D28.

## Why equal 1000 money ceilings do not make Reserve and Retainer duplicates

Reserve Match:
- requires legitimate ordinary work;
- can reach cap quickly in diversified labor;
- does nothing while bound;
- stronger for work-heavy players.

Network Retainer:
- requires no action;
- arrives gradually;
- may lose most of its theoretical value if bound early;
- stronger for School/lodging/item opening flexibility.

Same maximum money:
different timing, conditions and player behavior.

## Work Rhythm relative power

20 Energy is not translated into a fixed money equivalent because:
- early starter extra work may be blocked by D26 + only three available careers;
- School conversion costs tuition;
- Activity conversion changes schedule flexibility;
- late extra shifts can be worth far more than early shifts.

The cap is therefore better balanced in **action count**, not coin equivalence.

---

# 7. Required system interactions

## 160-day calendar

All recommendations are finite well before or within the 160-day run:
- Reserve cap is finite at 1000;
- Work Rhythm max =20 bonus days;
- Retainer ends after 40 eligible calendar days.

No reward extends the calendar.

## D26

None changes:
- one shift / same ordinary career / day.

Work Rhythm supplies Energy only.

Reserve Match rewards ordinary wages but does not permit extra same-career shifts.

Retainer supplies money only.

## Hard Work = 50

Earliest same-career Hard Work remains Day 50 under all three.

No reward changes the 50-shift threshold.

## Secret Debt +2000 / 10-day / 20000

Unchanged.

Reserve:
- lender +2000 does not match;
- hidden wage does not match while bound.

Rhythm:
- hidden work does not arm it.

Retainer:
- pauses while bound;
- missed payments lost.

## Forced Night / next-day Energy -1

Unchanged.

If Work Rhythm has one previously armed bonus:
- unbound same loadout = base+1;
- bound same loadout = base+1-1.

The D19 penalty remains visible.

## cap-200 Specialist

May coexist with exactly one selected D30 Keystone under D28:
- it occupies one of two Specialist slots;
- no D30 Keystone changes cap or grants free >100 stats.

## Other Keystones

A D30 Keystone cannot stack with:
- unconditional +1 daily Energy;
- No Rent;
- another substantial passive-income Keystone;
- another D30 Keystone.

This is a major part of the calibration.

## Ordinary Hard Work packages

Remain a separate unrestricted selected layer.

No D30 Keystone consumes, disables or substitutes for those packages.

## Palace D23

Unchanged.

No D30 reward:
- writes ordinary `hardWorkProgress`;
- counts as one of the ten active ordinary packages;
- emits the Palace invitation.

---

# 8. Regression / acceptance packet for later implementation

## Earned Reserve Match 1000

1. only eligible ordinary wage increments matched progress;
2. exact 1:1 bonus;
3. total bonus never exceeds 1000;
4. overflow wage after cap earns no extra match;
5. lender +2000 excluded;
6. hidden bound wage excluded;
7. School/Activity/item/passive money excluded;
8. repayment excluded;
9. save/reload cannot double-pay;
10. D26 unchanged;
11. same-career Hard Work cannot occur before Day 50;
12. selecting another Keystone is rejected.

## Work Rhythm 20

1. ordinary shift arms exactly one next-day bonus;
2. multiple ordinary shifts same day do not stack;
3. maximum 20 bonus days;
4. day 21 is the earliest last bonus day under uninterrupted Day-1 work;
5. School/Activity/hidden work do not arm it;
6. D26 unchanged;
7. same-career Hard Work remains >=Day 50;
8. bound next-day Energy remains one lower than same unbound loadout;
9. no new triggers while ordinary careers are locked;
10. save/reload around day transition does not duplicate bonus;
11. selecting unconditional +1 Energy Keystone simultaneously is rejected.

## Network Retainer 25 × 40

1. exactly 25 paid once per eligible unbound day;
2. no more than 40 eligible payment days;
3. total no more than 1000;
4. bound days pay 0;
5. bound-day misses are never banked;
6. no catch-up payment after release;
7. save/reload at morning boundary cannot duplicate 25;
8. no payment after duration exhausted;
9. lender/debt/repayment unchanged;
10. forced Night/domain lock unchanged;
11. selecting another Keystone simultaneously is rejected.

## Cross-Meta

1. 0 or 1 D30 Keystone valid;
2. 2 D30 Keystones invalid;
3. D30 Keystone + cap-200 Specialist valid;
4. D30 Keystone + cap-200 + one other Specialist valid;
5. third Specialist invalid under D28;
6. any earned subset of ordinary Hard Work packages remains valid simultaneously;
7. current-run resolved loadout remains snapshotted across catalog changes.

---

# 9. Final recommendation

For Leader/Product decision:

- **Earned Reserve Match: cap 1000**
- **Work Rhythm: 20 triggered bonus days**
- **Network Retainer: 25/day for 40 eligible days; total cap 1000**

These values preserve three different future-run identities:

- Paid Freedom => **earn more by working**;
- Bound Life => **schedule more by maintaining a work rhythm**;
- Takeover => **receive bounded passive network capital**.

All three are strong enough to justify a Keystone slot under the current harsh live economy, but none independently:
- removes normal lodging pressure completely;
- removes the need to work;
- bypasses D26;
- speeds one same-career Hard Work below Day 50;
- suppresses Secret Debt;
- substitutes for Palace D23.

This packet is **READY_FOR_LEADER_PRODUCT_DECISION**, not authority.
