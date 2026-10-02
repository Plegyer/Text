# Chat 5 — Secret Debt balance proposal

Status: **PROPOSAL ONLY — NOT PRODUCT AUTHORITY**
Owner: Chat 5 / Full-Career Producer C
Branch: `chat5/secret-debt-complete-reset-v1`
Research baseline: exact `main = 0f232f40157a56166403e31d259d88776b9b6d90`

This document answers the active Chat 5 pointer. None of the numbers below are wired into production. Locked D19 behavior remains unchanged.

## 1. Shipped ordinary-career balance reference

The ten current ordinary shift wages use bases of 13–15 and total stat coefficients from 0.60 to 1.00.

If every wage-relevant stat is held at the same value, the current ordinary-career wage envelope is approximately:

| Equal relevant stats | Lowest ordinary wage | Highest ordinary wage |
| --- | ---: | ---: |
| 20 | 27 | 35 |
| 50 | 45 | 65 |
| 80 | 63 | 95 |
| 100 | 75 | 115 |

Ordinary seasonal shift packages overwhelmingly grant two positive +1 stat gains per shift. Existing late-career entry gates range up to values such as Guard 30 Strength / 30 Endurance, Tavern 45 Charm, and Prostitute 55 Sexuality. Ordinary Hard Work remains 50 completed shifts.

The normal baseline is 3 Energy/day. D19's forced bound Night applies next-day Energy -1, leaving 2 Energy on a paid-lodging day. Street lodging carries its own -1, so Street + forced Night leaves only 1 Energy. Hidden work costs 1 Energy per shift.

## 2. PROPOSAL — hidden daytime shift gains

**Recommended proposal: flat per-shift gains, no seasonal variance:**

- Strength +1;
- Endurance +1;
- Sexuality +1;
- Lust +0.

Rationale:

- D19 already locks all three progression axes as positive hidden-work gains and separately locks Lust as a distinct content axis.
- +1/+1/+1 is only one point above the common ordinary-career two-stat package, compensating partly for the route's global profession lock and forced-night Energy tax.
- Flat gains avoid a season lottery. Fifty shifts can be completed inside roughly one season, so making one Takeover-relevant stat seasonal-only could make the route depend heavily on the date of activation.
- Sexuality remains separate from Lust. The work cannot satisfy the high-Lust gate by itself.

## 3. PROPOSAL — hidden wage formula

**Recommended wage:**

`round(25 + Strength × 0.50 + Endurance × 0.40 + Lust × 0.30)`

Exact proposed fields:

- base = **25**
- Strength factor = **0.50**
- Endurance factor = **0.40**
- Lust factor = **0.30**

At equal relevant stats this yields:

| Strength / Endurance / Lust | Hidden wage | Ordinary shipped envelope |
| --- | ---: | ---: |
| 20 / 20 / 20 | 49 | 27–35 |
| 50 / 50 / 50 | 85 | 45–65 |
| 80 / 80 / 80 | 121 | 63–95 |
| 100 / 100 / 100 | 145 | 75–115 |

The hidden wage is deliberately above ordinary work, but not by enough to trivialize a 20000 all-at-once repayment. Lust matters positively without becoming the dominant coefficient.

## 4. Repayment pacing under the proposed formula

### Static-stat floor calculation

If stats never improved and all 2000 acceptance money were preserved, the player would still need to earn 18000:

| Static relevant stats | Wage | Shifts to add 18000 | Days at 2 shifts/day | Days at 1 shift/day |
| --- | ---: | ---: | ---: | ---: |
| 20 | 49 | 368 | 184 | 368 |
| 50 | 85 | 212 | 106 | 212 |
| 80 | 121 | 149 | 75 | 149 |

This intentionally looks severe. The actual route is faster because each hidden shift raises Strength and Endurance by +1 until capped.

### Rough dynamic route model

Assumptions for this rough model:

- the original +2000 grant is still held when the trap activates;
- the player does only hidden shifts;
- Strength and Endurance rise +1 after each shift, capped at 100;
- Lust is held constant at the scenario value;
- no Activity income, no School tuition, no other purchases;
- paid-lodging cases use the D19 forced-night penalty, so 2 shifts/day are possible;
- Street also applies its own -1 Energy, so only 1 shift/day is possible.

Estimated time to hold 20000 cash:

| Starting S/E/L | Normal room 100/night | Cheap lodging 50/night | Street 0/night |
| --- | ---: | ---: | ---: |
| 20 / 20 / 20 | ~147 days / 294 shifts | ~109 days / 218 shifts | ~173 days / 173 shifts |
| 50 / 50 / 50 | ~120 days / 239 shifts | ~91 days / 182 shifts | ~148 days / 148 shifts |
| 80 / 80 / 80 | ~102 days / 204 shifts | ~80 days / 160 shifts | ~131 days / 131 shifts |

Interpretation:

- an early low-stat bound route is still harsh; Street-only repayment is outside the roughly 150 days remaining after a very early day-10 activation;
- cheap lodging is economically optimal in this simplified model because it preserves 2 Energy while costing half a normal room;
- mid/high builds can repay inside one run, but repayment remains much slower than reaching the 50-shift Bound Life eligibility;
- real School tuition, Activity time, purchases, and imperfect retention of the initial 2000 all slow repayment;
- conversely, pre-activation savings and profitable non-trivial Activities can accelerate it.

**Recommendation:** keep this difficulty profile. It makes Paid Freedom a long economic escape, Bound Life an earlier 50-shift fate, and Takeover a build route rather than three copies of the same timer.

## 5. PROPOSAL — Takeover gates

Keep the already locked structural requirements:

- bound Secret Debt route;
- at least 50 completed hidden daytime shifts;
- at least 10 paid School lessons;
- separate explicit Takeover action.

Add these exact numeric gates:

- Strength >= **55**
- Endurance >= **55**
- Sexuality >= **55**
- Lust >= **40**

Rationale:

- 55 matches the upper end of current shipped ordinary-career entry requirements rather than approaching Palace-style 90+ progression.
- With +1 Strength / +1 Endurance / +1 Sexuality per hidden shift, fifty shifts put a deliberately built character near or above the three 55 gates while still leaving room for School to repair weak starting stats.
- Physical Training is directly useful for Strength/Endurance.
- Body Confidence is directly useful for Sexuality/Endurance and, under locked D20 authority, grants Lust +2 per paid lesson.
- Lust 40 is intentionally not satisfied by the 10-lesson structural minimum from a default Lust 1. If Body Confidence were the only Lust source, reaching 40 would require about 20 paid Body Confidence lessons. That preserves the meaning of "high Lust" instead of making the separate high-Lust requirement redundant.

Sensitivity note: if Product wants exactly ten Body Confidence lessons to satisfy the Lust gate from default Lust 1, the threshold would need to be <=21. I do **not** recommend that because it reads as a participation gate, not a high-Lust gate.

## 6. PROPOSAL — three ending Meta rewards

All three should use `kind: unlock`, never `kind: hardWork`. Secret Debt must remain outside ordinary `hardWorkProgress` and Palace 10/10.

### Paid Freedom

**Unlock ID:** `secret-debt.paid-freedom.reserve`

**Proposed effect:** future lives start with **+600 money**.

Grounding: +600 already exists as the shipped scale for Merchant Hard Work and Satyr Maid house-credit starting-money bonuses. This rewards the economic escape without changing Energy or Palace progress.

### Bound Life

**Unlock ID:** `secret-debt.bound-life.conditioning`

**Proposed effect:** future lives start with **+3 Strength and +3 Endurance**.

Grounding: ordinary Hard Work rewards use +3/+3 starting-stat packages. This gives the hidden Hard Work analogue comparable NG+ value while still not writing ordinary `hardWorkProgress`.

### Takeover

**Unlock ID:** `secret-debt.takeover.instinct`

**Proposed effect:** future lives start with **+3 Wits and +3 Sexuality**.

Grounding: it stays at the same +3/+3 magnitude as ordinary Hard Work rewards, but uses a distinct planning/control + body-confidence pair and does not directly raise Lust.

These are reward proposals only. If approved, each unlock would need an explicit future-run consumer; no consumer should be added before Leader/Product locks the reward package.

## 7. D20 / current-main note

D20 authority locks Body Confidence at Lust +2 per paid lesson. The exact `main` snapshot used for this proposal still shows the pre-D20 School course effect package in `src/core/school.ts`; Chat 5 does not patch that cross-owner implementation here. The Takeover balance calculation treats D20 as Product authority, not as evidence that Chat 5 owns School runtime.

## 8. Recommendation for Leader decision

Recommended package:

- shift gains: **Strength +1 / Endurance +1 / Sexuality +1 every shift**;
- wage: **25 + 0.50×Strength + 0.40×Endurance + 0.30×Lust**;
- Takeover: **Strength 55 / Endurance 55 / Sexuality 55 / Lust 40**, plus existing **50 shifts + 10 paid School lessons**;
- Paid Freedom Meta: **+600 starting money** via `secret-debt.paid-freedom.reserve`;
- Bound Life Meta: **+3 Strength / +3 Endurance** via `secret-debt.bound-life.conditioning`;
- Takeover Meta: **+3 Wits / +3 Sexuality** via `secret-debt.takeover.instinct`.

Everything in this section remains **PROPOSAL** until Leader/Product explicitly promotes it to authority.
