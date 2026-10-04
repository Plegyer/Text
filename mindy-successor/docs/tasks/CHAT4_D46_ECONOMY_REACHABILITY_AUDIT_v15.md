# Chat 4 — D46 Economy Reachability Audit v15

Status: **READY_FOR_LEADER_REVIEW**  
Owner: Chat 4  
Branch: `chat4/d46-economy-reachability-audit-v15`

Authority / executable truth:

- frozen D46 producer: `chat4/economy-start-balance-producer-v14@a0c5f855b63d3bb85556f5b2780aaaabb58fbced`;
- D46 locked in `mindy-successor/docs/USER_DECISIONS_LOCKED_v1.md`;
- D43 Palace cadence/economy remains locked;
- D44 Secret Debt hidden-work economy remains locked;
- D32 Strong Meta reward caps remain locked.

This audit makes **no runtime changes** and does **not** reopen D46 values.

---

# 1. Verdict

## Overall

**PASS — no evidence-backed D46 soft-lock or economy exploit requiring retune.**

D46 fixes the pre-v14 executable drift without making the 160-day economy free.

The implemented values preserve meaningful tradeoffs among:

- normal / cheap / street housing;
- ordinary work;
- paid School;
- Large Activity;
- Strong Meta;
- Secret Debt;
- Palace;
- cap-200 late-meta play.

Three edge cases are worth retaining as QA/design watchpoints, but none is a Product blocker:

1. **front-loaded normal-lodging Activity pressure** — 10 consecutive Activity entries from Day 1 are not cashflow-safe on an adversarial fresh low-stat build;
2. **low-build Secret Debt + normal + School/Activity** — repayment remains reachable but the accepted D44 model lands around Day 153, leaving only ~7 days;
3. **early street pure-cash inversion** — street can temporarily beat cheap for raw money before rising wages make the lost Energy more valuable than the 50-money rent saving.

All three have existing intentional counterplay and do not require changing D46.

---

# 2. Audit method

The audit uses frozen v14 values and deliberately conservative assumptions.

## Fixed D46 inputs

- 160 days;
- starting money = **600**;
- base Energy = **3/day**;
- fresh Lust = **5**;
- normal / cheap / street lodging = **100 / 50 / 0**;
- street next-day Energy = **-1**;
- Lumber ordinary wage base = **35**;
- all other ordinary wage bases = **37**;
- ordinary final wage cap = **120**;
- existing per-career wage weights unchanged;
- existing D31 seasonal stat packages unchanged;
- paid School tuition/gains unchanged.

## Conservative fresh allocation

For the low-stat stress model, the ten manual creation points are placed away from the six stats used by the three Day-1 starter wage formulas.

Therefore the three starter wage anchors remain exactly:

- Lumber = **36**;
- Satyr Maid = **38**;
- Undead Farm = **38**.

This is intentionally more pessimistic than a player who allocates points toward their intended work.

## Dynamic work model

Where a 160-day work simulation is quoted:

- wage uses pre-shift stats, matching v14;
- the actual D31 seasonal package is then applied;
- stats respect the normal cap 100 unless the scenario explicitly tests cap-200;
- D26 one-same-career-shift/day is respected;
- only calendar fallback unlocks are credited for later professions:
  - Year 2 / Day 41: Tavern, Hunter, Guard, Merchant;
  - Year 3 / Day 81: Artist/Geisha, Assassin, Prostitute;
- stat-based earlier unlocks are ignored, making the mixed-career model conservative.

## Activity money

Activity is credited with **0 guaranteed direct money**.

That prevents the audit from assuming future/result-specific monetization that is not part of D46.

---

# 3. Fresh low-stat life

## Day-1 sustainability

Fresh all-1 wage anchors:

```
Lumber      36
Satyr Maid  38
Undead Farm 38
----------------
total      112
```

Immediate daily pressure:

| Day-1 plan | Gross work | Lodging | Net before other spending | Energy |
| --- | ---: | ---: | ---: | ---: |
| 1 starter shift + cheap | 36–38 | 50 | -14..-12 | 1 |
| 2 different starter shifts + cheap | 74–76 | 50 | +24..+26 | 2 |
| 3 different starter shifts + normal | 112 | 100 | +12 | 3 |
| 3 different starter shifts + cheap | 112 | 50 | +62 | 3 |

### Verdict

**PASS.**

D46 achieves the intended fresh-life pressure:

- one shift does not trivialize cheap lodging;
- two different jobs can sustain cheap;
- normal is sustainable only by spending the full fresh 3-Energy day on work at the lowest wage floor.

No fresh-life housing soft-lock remains.

---

# 4. 160-day low-stat work floors

These use only the original three starter professions and actual D31 seasonal gains.

## Cheap / two starter shifts per day

Fixed pair:

- Satyr Maid;
- Undead Farm.

Over 160 days:

- work shifts = **320**;
- work Energy = **320**;
- unused daytime Energy = **160**;
- gross work income = **21,641**;
- cheap rent = **8,000**;
- starting money = **600**;
- end money before other purchases = **14,241**.

Last-day wages in this conservative model rise to roughly:

- Satyr Maid: **82**;
- Undead Farm: **101**.

## Normal / all three starter shifts per day

Over 160 days:

- shifts = **480**;
- all base daytime Energy is spent on work;
- gross work income = **35,595**;
- normal rent = **16,000**;
- starting money = **600**;
- end money before other purchases = **20,195**.

### Verdict

**PASS.**

Even a deliberately poor creation allocation can sustain either:

- cheap with one daytime Energy left for other systems; or
- normal with a work-heavy schedule.

The player is not forced to use later professions merely to remain solvent.

---

# 5. Ordinary mixed-career life

A conservative greedy mixed model selects the best currently calendar-available distinct ordinary professions while ignoring stat-based early unlocks.

## Two work shifts/day + cheap

- ordinary shifts = **320**;
- gross = **24,837**;
- rent = **8,000**;
- starting money = **600**;
- end money = **17,437**;
- average wage = **77.6**.

## Three work shifts/day + normal

- ordinary shifts = **480**;
- gross = **39,239**;
- rent = **16,000**;
- starting money = **600**;
- end money = **23,839**;
- average wage = **81.7**.

### D26

Nothing in D46 changes the same-career cadence.

A single career still cannot reach 50-shift Hard Work before **Day 50**.

Different-career work remains the intended way to use multiple Energy on work in the same day.

### Verdict

**PASS.**

The mixed-career economy improves with progression, but does not bypass D26 or generate an uncapped money loop.

---

# 6. School-heavy life

Representative balanced 20-paid-lesson package:

- Literacy & Numbers ×3;
- Arcana ×2;
- Rhetoric & Social ×3;
- Etiquette & Presentation ×2;
- Field Craft ×3;
- Physical Training ×2;
- Arts & Performance ×2;
- Body Confidence ×3.

Exact tuition:

**7,800 money**.

Energy:

**20 Energy**.

The model:

- performs exactly two ordinary shifts/day;
- takes the next lesson only when cash after work can still cover that night's lodging;
- credits actual School stat gains;
- does not credit stat-based early career unlocks.

## Cheap lodging

- lesson 20 is affordable by **Day 87**;
- minimum observed cash reserve stays non-negative: **2**;
- 160-day gross work = **26,709**;
- final cash after 8,000 rent and 7,800 tuition = **11,509**;
- total modeled Energy spent = 320 work + 20 School = **340**;
- **140 Energy** remains for Activity/other daytime systems.

## Normal lodging

- lesson 20 is affordable by **Day 136**;
- minimum observed cash reserve stays non-negative: **3**;
- gross work = **26,201**;
- final cash after 16,000 rent and 7,800 tuition = **3,001**;
- total modeled Energy = **340**.

## Body Confidence / Lust

Fresh Lust = 5.

Body Confidence remains +2 Lust per paid lesson.

A fresh build relying on that course alone needs:

- 13 Body Confidence lessons to reach Lust 31.

D46 therefore does not trivialize the D44 Lust >=30 Takeover axis.

### Verdict

**PASS.**

School-heavy play is expensive but reachable.

Normal housing noticeably delays a large School package; cheap materially accelerates it, which is an intended housing tradeoff rather than a soft-lock.

No School price/gain retune is justified by the stress result.

---

# 7. Activity-heavy life

D36 target requires standalone Activity ending eligibility with **10 or fewer entries**.

Each new entry costs:

**2 daily Energy**.

The audit gives Activity no direct money.

## Ten-entry stress case

A 10-entry life spends:

- Activity = **20 Energy**.

With a representative two-work-shifts/day baseline:

- non-Activity day: 2 work Energy;
- Activity day: 1 work + 2 Activity Energy.

This still fits well inside the 480-Energy life budget.

## Cheap lodging, ten entries front-loaded

Conservative model:

- work shifts = **310**;
- total Energy = **330**;
- gross work income = **23,612**;
- rent = **8,000**;
- ending cash = **16,212**;
- cash remains non-negative.

## Normal lodging, ten entries front-loaded

If all ten Activity entries are forced into Days 1–10 while the character remains at the weakest wage band:

- Day 10 reaches approximately **-8 money** after rent;
- continuing the front-loaded pattern is temporarily cashflow-invalid.

This is a **real pressure point**, but not a soft-lock.

Using the same low-stat model and simply deferring some entries until work progression creates reserve:

- all 10 Activity entries can be completed by approximately **Day 57**;
- cash remains non-negative;
- D36 reference target is only roughly Day 120.

## Twenty-entry over-stress case

Even doubling the D36 target to 20 entries:

- Activity Energy = **40**;
- representative work count = ~300 shifts;
- cheap lodging remains comfortably solvent.

### Verdict

**PASS with non-blocking scheduling risk.**

Do not raise wages or lower Activity Energy because a player can voluntarily over-front-load expensive normal lodging and Activity on Days 1–10.

Existing solutions are already sufficient:

- use cheap lodging;
- delay some Activity entries;
- work more on non-Activity days;
- improve wage stats.

---

# 8. Housing mix audit

## Fixed full-life costs

| Housing | 160-day direct cost | Energy consequence |
| --- | ---: | --- |
| Normal | 16,000 | none |
| Cheap | 8,000 | none |
| Street | 0 | -1 next-day Energy |
| 80 normal + 80 cheap | 12,000 | none |

Normal's +8,000 premium over cheap remains tied to D35 authored private-space capability.

## Early street pure-cash inversion

At the fresh wage floor:

- cheap can spend 3 Energy on three starter shifts:
  - 112 gross - 50 rent = **+62**;
- after a street night, the next day has 2 usable Energy:
  - two fresh starter shifts gross about 76;
  - no rent;
  - approximately **+76**.

So street can be temporarily better for **raw cash only**.

That is not an infinite exploit.

Using the conservative dynamic model:

- street begins ahead because it pays no rent;
- cheap's third work action becomes more valuable as wages rise;
- cumulative cheap pure-work cash overtakes street at approximately **Day 30**;
- by Day 160 the modeled cheap 3-work strategy is ahead by roughly **7,115**.

Street also gives up:

- the third daytime Energy;
- normal private-space content;
- cheap's full 3-Energy flexibility;
- safety from street-specific consequences;
- while lender unseen, it exposes the D19 20% Secret Debt encounter roll.

### Verdict

**PASS.**

The early cash inversion is bounded and is compensated by Energy/content/risk costs.

It is an intentional poverty tradeoff, not a late-game money exploit.

---

# 9. Strong Meta stress

D27/D28 allow:

- at most 1 Keystone;
- at most 2 Specialists;
- cap-200 is a Specialist;
- the three D32 economy rewards are mutually exclusive Keystones.

## Earned Reserve Match

Maximum money added:

**1,000/run**.

At D46 wages it reaches the cap faster, but never exceeds it.

Examples:

- wage 38 -> cap after about 27 eligible shifts;
- wage 71 -> about 15;
- wage 120 -> about 9.

No compounding exists.

## Network Retainer

Maximum:

- 25/day;
- first 40 eligible days;
- total **1,000**.

Bound Secret Debt days pause payment and missed days are lost.

No D46 multiplier applies.

## Work Rhythm

Maximum:

- +1 Energy;
- max 20 rewarded days;
- total **20 extra Energy/actions**.

If every bonus Energy were converted into an ordinary shift:

- low wage 38 -> at most **760** additional gross;
- cap wage 120 -> theoretical **2,400** additional gross.

This is larger than the 1,000-money Keystones at the absolute late-game cap, but:

- it consumes daytime action opportunity;
- D26 still applies;
- the player must have another distinct ordinary profession available to spend a fourth work Energy on a fully work-saturated day;
- Work Rhythm is the one selected Keystone and cannot stack with Reserve Match or Retainer.

### Verdict

**PASS.**

D46 increases the rate at which bounded rewards deliver value, not their caps.

No Strong Meta infinite or multiplicative money loop appears.

---

# 10. Secret Debt pressure

D46 ordinary wages cannot directly farm repayment because all ten ordinary careers are locked while bound.

D44 hidden-work wage remains separate and capped at **140**.

Fresh Lust 5 exactly matches the accepted D44 low-build anchor.

Therefore the accepted D44 repayment stress remains valid.

## Lodging-only repayment

From the accepted D44 model:

| Build | Cheap | Normal | Street |
| --- | ---: | ---: | ---: |
| Low | Day 94 / 188 hidden shifts | Day 120 / 240 | Day 154 / 154 |
| Mid | Day 86 / 172 | Day 109 / 218 | Day 141 / 141 |
| Strong | Day 81 / 162 | Day 103 / 206 | Day 133 / 133 |

## If the +2000 grant was spent

| Build | Cheap | Normal |
| --- | ---: | ---: |
| Low | Day 103 | Day 131 |
| Mid | Day 95 | Day 120 |
| Strong | Day 90 | Day 114 |

## School + Activity stress

Accepted mixed stress package:

- 10 paid lessons;
- 5 Activity entries;
- 20 total non-hidden-work Energy;
- 4,000 School tuition.

Repayment:

| Build | Cheap | Normal |
| --- | ---: | ---: |
| Low | Day 120 | **Day 153** |
| Mid | Day 114 | Day 145 |
| Strong | Day 110 | Day 140 |

### Tightest edge

Low build + normal + School/Activity reaches repayment around **Day 153**.

That is only ~7 days before the 160-day end.

This is a genuine narrow margin, but it is **not a D46 blocker** because:

- D46 ordinary wages are unavailable while bound and therefore are not the cause;
- cheap improves the same scenario to Day 120;
- repayment is not the only Secret Debt exit;
- Bound Life remains 50 hidden shifts;
- Takeover remains a separate route;
- the lender route is optional before acceptance.

### Verdict

**PASS with known narrow D44 margin.**

Do not reopen D46 numbers.

---

# 11. Palace finite-pay interaction

D43 structural duty:

- max one/day;
- cost 1 Energy;
- max 15 duties;
- wage 35..55;
- max total structural pay = **825**.

## Normal lodging

Fifteen normal nights cost:

**1,500**.

Therefore Palace duty alone cannot self-fund 15 normal nights:

- min Palace total = 525;
- max Palace total = 825;
- normal rent = 1,500.

This is not a soft-lock because one Palace duty consumes only 1 of 3 daytime Energy.

A character may still use remaining Energy for ordinary work or other systems.

At the fresh D46 floor, a full work-saturated Palace day can combine:

- Palace minimum 35;
- Lumber 36;
- Satyr/Undead ~38;

for roughly **109** gross across the 3 Energy budget, enough to pay normal lodging but with almost no surplus.

## Secret Debt interaction

If Palace access already exists and the character becomes bound:

- Palace remains available;
- ordinary careers are locked;
- remaining Palace pay stays finite;
- even the theoretical full 825 is only **4.125%** of the 20,000 debt.

No Palace repayment farm exists.

### Verdict

**PASS.**

Palace remains finite support money, not a replacement ordinary economy.

---

# 12. cap-200 late-meta stress

D24 changes only the progression-stat ceiling.

It does not multiply:

- starting values;
- Hard Work bonuses;
- creation allocation;
- Lust.

D46 ordinary wage cap remains **120**.

## Absolute ordinary-work upper bounds

Without Work Rhythm:

- base life Energy = 160 × 3 = **480**;
- theoretical all-work ceiling = 480 × 120 = **57,600 gross**.

With Work Rhythm Keystone:

- at most 20 extra Energy;
- absolute theoretical ceiling = 500 × 120 = **60,000 gross**.

With Reserve Match instead:

- ordinary gross ceiling = 57,600;
- Reserve cap = 1,000;
- combined theoretical money = **58,600** before lodging.

With Network Retainer instead:

- same 1,000 money cap;
- theoretical = **58,600** before lodging.

These are intentionally extreme upper bounds that assume:

- enough distinct ordinary professions to satisfy D26 every day;
- every usable Energy is converted to work;
- the character is already at wage cap;
- no School, Activity, Palace support, or other daytime action is taken.

A real cap-200 run must first build stats; the cap itself grants no stats.

### Counterfactual without the 120 cap

At relevant stats 200, uncapped D46-base ordinary formulas would rise far beyond the intended economy.

The implemented cap blocks exactly that failure mode.

### Verdict

**PASS.**

cap-200 does not create an unbounded wage engine.

---

# 13. Earliest critical milestones

| Milestone | Stress-audit result |
| --- | --- |
| Cheap self-sustaining fresh work | **Day 1** with two different starter shifts |
| Normal self-sustaining fresh work | **Day 1** with all three starter shifts |
| Same-career Hard Work | never before **Day 50** under D26 |
| Year-2 fallback careers | **Day 41** |
| Year-3 fallback careers | **Day 81** |
| 20 balanced paid lessons, cheap + 2 work/day | about **Day 87** |
| 20 balanced paid lessons, normal + 2 work/day | about **Day 136** |
| 10 Activity entries, low build + normal, non-negative cash | conservative schedule about **Day 57** |
| Palace 15 structural duties | earliest **Day 15** if access already exists |
| Secret Debt Bound Life | exactly **50 hidden shifts** |
| Secret Debt Takeover | >=75 hidden shifts + full D44 stat/Lust/School gates |
| Low Secret Debt Paid Freedom + cheap | about **Day 94** |
| Low Secret Debt Paid Freedom + normal | about **Day 120** |
| Tight low D44 School/Activity + normal repayment | about **Day 153** |

---

# 14. Exploit / soft-lock findings

| Finding | Severity | Evidence | D46 action |
| --- | --- | --- | --- |
| Fresh work cannot cover housing | none | 2 starter shifts cover cheap; 3 cover normal on Day 1 | none |
| Low-stat full-life insolvency | none | dynamic starter-only models end strongly positive | none |
| School-heavy life soft-lock | none | 20 lessons reachable Day 87 cheap / Day 136 normal with non-negative cash | none |
| Activity-heavy normal front-load pressure | **RISK, non-blocking** | 10 consecutive Day-1..10 entries dip below zero around Day 10 | none; schedule/lodging choice solves |
| Street early pure-cash advantage | **RISK, bounded** | street can lead early; cheap catches around Day 30 and dominates later | none |
| Strong Meta multiplier exploit | none | 1 Keystone; 1000/1000/20 caps remain binding | none |
| Secret Debt repayment impossible | none | all accepted D44 representative builds remain <=160 days | none |
| Secret Debt tight low/normal mixed path | **RISK, known** | repayment about Day 153 | none; D44 alternatives exist |
| Palace debt farm | none | total structural pay <=825 | none |
| cap-200 ordinary wage runaway | none | wage hard cap 120 | none |
| D26 bypass via higher wages | none | same-career/day rule unchanged | none |
| Lodging late-year soft-lock | none | no escalation, prices fixed 100/50/0 | none |

---

# 15. Final recommendation

**Keep D46 unchanged.**

No audit evidence justifies reopening:

- starting Lust 5;
- ordinary bases 35/37;
- ordinary cap 120;
- lodging 100/50/0;
- no escalation;
- current School tuition/gains;
- starting money 600;
- base Energy 3.

The three observed risks are scheduling/build tradeoffs, not systemic blockers:

1. do not front-load a large Activity plan under normal lodging before building reserve;
2. street is temporarily cash-efficient but loses Energy/content and is overtaken economically as wages rise;
3. low-build Secret Debt repayment with normal lodging plus School/Activity is intentionally narrow but still reachable and has alternative exits.

No runtime patch is recommended from v15.

**READY_FOR_LEADER_REVIEW**
