# Chat 5 — Secret Debt successor economy / balance model v3

Status: **PROPOSAL ONLY — NOT PRODUCT AUTHORITY**
Owner: Chat 5 / Full-Career Producer C
Branch: `chat5/secret-debt-successor-balance-model-v3`
Research baseline: exact `main = aff3a6de866ea40f8d2d6761d148888b22b73278`

This document models Secret Debt from the **successor's current economy and locked route rules**.

The original-game reference is used only as system-shape evidence:
- jobs can scale meaningfully with build;
- a poverty route can justify a distinct future-life reward.

No original wage coefficient, threshold, count, or NG+ reward value is copied into this proposal.

No production runtime/data is changed by this document.

---

# LOCKED

The following values are current successor authority and are not balance proposals.

Secret Debt:
- one-time street lender remains 20% per eligible unseen street night;
- accepting help grants exactly +2000 money;
- activation occurs exactly 10 days later;
- activation creates exactly 20000 debt;
- all ten ordinary professions are domain-locked while bound;
- prior ordinary-career progress is preserved;
- School remains available;
- Large Activity remains available;
- hidden daytime work is paid work;
- hidden wage increases with relevant stats and has a positive Lust input;
- forced Night occurs every bound night;
- forced Night applies next-day Energy -1;
- repayment is one all-at-once 20000 action;
- hidden Hard Work is 50 completed daytime shifts;
- Secret Debt does not count toward Palace 10/10;
- Takeover requires:
  - 50 hidden shifts;
  - 10 paid School lessons;
  - relevant progression stats;
  - high Lust;
  - an explicit player action.

D20 also locks:
- paid Body Confidence lesson => Lust +2;
- forced Secret Debt Night => no Lust gain.

Current successor economy used by the model:
- baseline Energy/day = 3;
- normal lodging = 100/night, no additional Energy penalty;
- cheap lodging = 50/night, no additional Energy penalty;
- street = 0/night, next-day Energy -1;
- current Large Activities cost 2 Energy and currently have no direct money payout;
- Physical Training costs 400 and gives Strength +3 / Endurance +3 / Dexterity +2;
- Body Confidence costs 400 and gives Sexuality +3 / Grooming +3 / Endurance +2, plus locked D20 Lust +2;
- ordinary current-main wages at equal relevant stats have median values approximately:
  - stat 10 => 24;
  - stat 30 => 42;
  - stat 50 => 60;
  - stat 80 => 87.

---

# MODEL

## M1 — representative activation builds

Exact Lust starting value is still open, so these are **scenario snapshots at Secret Debt activation**, not proposed character defaults.

| Model build | Strength | Endurance | Sexuality | Lust |
| --- | ---: | ---: | ---: | ---: |
| Low | 10 | 10 | 10 | 5 |
| Mid | 30 | 30 | 30 | 15 |
| High | 50 | 50 | 50 | 25 |

All simulations assume the accepted +2000 is still held when the trap activates.

That is intentionally favorable to repayment. Spending some or all of the 2000 during the ten-day delay makes Paid Freedom slower.

## M2 — proposed hidden shift progression used for simulation

Each completed hidden daytime shift:

- Strength +1;
- Endurance +1;
- Sexuality +1;
- Lust +0.

No negative seasonal package is assumed in v3.

Reason:
- the current Secret Debt implementation seam is a direct three-stat package;
- the route already carries a large opportunity cost through ordinary-career lock and forced-night Energy loss;
- keeping the three locked relevant axes deterministic makes the 50-shift Hard Work milestone legible and prevents activation season from deciding Takeover viability.

## M3 — proposed hidden wage used for simulation

`round(25 + 0.70×Strength + 0.60×Endurance + 0.35×Lust)`

At equal relevant stats:

| S / E / Lust | Proposed hidden wage | Current ordinary median |
| --- | ---: | ---: |
| 10 / 10 / 10 | 42 | 24 |
| 30 / 30 / 30 | 74 | 42 |
| 50 / 50 / 50 | 108 | 60 |
| 80 / 80 / 80 | 157 | 87 |

So the hidden job targets roughly **1.75–1.8× current ordinary median pay** at comparable equal stat levels.

This is successor-derived:
- ordinary work is the baseline;
- Secret Debt imposes a 20000 escape requirement;
- ordinary jobs are unavailable while bound;
- every bound Night taxes next-day Energy.

The formula is intentionally stronger than ordinary work without turning 20000 into a short 50-shift payout.

## M4 — steady-state daily Energy by lodging

After forced Night:

| Lodging | Base run usable daytime Energy | With selectable NG+ +1 daily Energy |
| --- | ---: | ---: |
| Street | 1 | 2 |
| Cheap | 2 | 3 |
| Normal | 2 | 3 |

Street has both:
- Secret Debt forced-night -1;
- street-lodging -1.

Therefore the free lodging option is not the highest-throughput work option.

## M5 — hidden-work-only simulation

Outputs are:
`day to 50 shifts / day cash first reaches 20000`.

### Base Energy

| Build | Street | Cheap | Normal |
| --- | ---: | ---: | ---: |
| Low | 50 / 149 | 25 / 89 | 25 / 110 |
| Mid | 50 / 133 | 25 / 79 | 25 / 97 |
| High | 50 / 120 | 25 / 71 | 25 / 87 |

Important interpretation:

- the 50-shift fate appears substantially before repayment in every case;
- cheap lodging is the best pure repayment choice in this simplified model because it keeps 2 daytime Energy for half the normal-room cost;
- low-build Street is deliberately borderline: under favorable retained-2000 assumptions it needs about 149 bound days;
- this makes pure street survival possible only in a very early trap and rewards upgrading lodging rather than making free lodging the dominant economy.

### With +1 daily Energy

| Build | Street | Cheap | Normal |
| --- | ---: | ---: | ---: |
| Low | 25 / 75 | 17 / 56 | 17 / 63 |
| Mid | 25 / 67 | 17 / 50 | 17 / 56 |
| High | 25 / 60 | 17 / 45 | 17 / 51 |

A +1 daily Energy reward is therefore a **major rule modifier**, not a minor stat bonus.

It roughly halves Street repayment time and cuts paid-lodging repayment by about one third to two fifths.

## M6 — work + School simulation

Model School plan:
- exactly 10 paid lessons;
- 5 Physical Training;
- 5 Body Confidence;
- total tuition = 4000;
- total direct lesson Energy = 10;
- Body Confidence uses locked D20 Lust +2;
- at most one lesson/day in the model;
- a lesson is taken only when tuition plus that night's chosen lodging can already be covered.

This is a balanced Takeover-school plan, not a claim that it is the only valid player plan.

### Base Energy

Outputs:
`day to 50 shifts / day 10th lesson completes / day cash reaches 20000`.

| Build | Street | Cheap | Normal |
| --- | ---: | ---: | ---: |
| Low | 60 / 37 / 170 | 30 / 26 / 102 | 29 / 35 / 126 |
| Mid | 60 / 30 / 156 | 30 / 20 / 93 | 30 / 26 / 114 |
| High | 60 / 26 / 147 | 30 / 17 / 87 | 30 / 21 / 106 |

The mixed School route materially delays repayment because it spends both money and daytime Energy, which is desirable: Takeover preparation should not also be the fastest Paid Freedom strategy.

### With +1 daily Energy

| Build | Street | Cheap | Normal |
| --- | ---: | ---: | ---: |
| Low | 30 / 19 / 85 | 20 / 16 / 64 | 20 / 20 / 73 |
| Mid | 30 / 16 / 78 | 20 / 13 / 59 | 20 / 15 / 66 |
| High | 30 / 14 / 74 | 20 / 11 / 55 | 20 / 13 / 62 |

Again, +1 daily Energy is transformational because it allows School to coexist with substantially more paid work.

## M7 — work + Activity simulation

Current-main Large Activities:
- cost 2 Energy to enter;
- currently provide no direct money reward in their result effects.

For a concrete mixed-play sensitivity model:
- take 5 Large Activity sessions;
- one planned every 10 bound days;
- all remaining Energy is used for hidden work.

This is an opportunity-cost model, not a proposed Activity cadence.

### Base Energy

Outputs:
`day to 50 shifts / day cash reaches 20000`.

| Build | Street | Cheap | Normal |
| --- | ---: | ---: | ---: |
| Low | unsupported / 149 | 27 / 95 | 27 / 117 |
| Mid | unsupported / 133 | 27 / 85 | 27 / 104 |
| High | unsupported / 120 | 27 / 77 | 27 / 94 |

"Unsupported" means the current 2-Energy Activity entry cannot be paid from the 1 Energy left by Street + forced Night.

The repayment number shown for Street is therefore the work-only control, not a valid mixed Activity route.

### With +1 daily Energy

| Build | Street | Cheap | Normal |
| --- | ---: | ---: | ---: |
| Low | 27 / 80 | 18 / 60 | 18 / 68 |
| Mid | 27 / 72 | 18 / 54 | 18 / 61 |
| High | 27 / 65 | 18 / 48 | 18 / 55 |

With +1 daily Energy, Street can finally afford a 2-Energy Activity day.

This is another reason the +1 Energy Meta role is qualitatively different from a money or stat reward.

## M8 — proposed Takeover threshold calibration

Proposed exact thresholds:

- Strength >= 60;
- Endurance >= 60;
- Sexuality >= 60;
- Lust >= 25;
- plus locked 50 shifts;
- plus locked 10 paid School lessons.

Why 60 / 60 / 60:

A modeled Low activation build is 10 / 10 / 10.

Exactly 50 proposed +1/+1/+1 shifts reach:

- Strength 60;
- Endurance 60;
- Sexuality 60.

Therefore the hidden profession itself can construct the minimum physical/sexual build over its locked Hard Work distance.

School remains independently meaningful instead of repairing an impossible stat requirement.

Why Lust 25:

Lust does not grow from forced work.

Under D20:
- 10 Body Confidence lessons add +20 Lust;
- Low modeled Lust 5 can therefore reach 25 by specializing all ten paid lessons into Body Confidence;
- Mid modeled Lust 15 reaches 25 with five Body Confidence lessons, allowing a balanced 5 Physical / 5 Body plan;
- High modeled Lust 25 already meets the Lust threshold but still owes the locked 10 paid lessons.

This gives low/mid/high builds different School strategies rather than making the School requirement decorative.

### School-plan sensitivity at 50 shifts

Starting from the modeled Low build:

- 50 shifts + 5 Physical / 5 Body =>
  S75 / E85 / Sexuality75 / Lust15 — **fails Lust**;
- 50 shifts + 10 Body Confidence =>
  S60 / E80 / Sexuality90 / Lust25 — **passes proposed Takeover gates**.

Starting from Mid:

- 50 shifts + 5 Physical / 5 Body =>
  S95 / E100 / Sexuality95 / Lust25 — **passes**.

Thus Takeover is possible from a weak activation build, but only with intentional School specialization.

---

# PROPOSAL

## P1 — shift gains

**Propose:**

Every hidden daytime shift:
- Strength +1;
- Endurance +1;
- Sexuality +1;
- Lust +0.

No extra negative stat package in v3.

This keeps the forced route deterministic and uses domain lock + Night Energy tax as its primary cost.

## P2 — wage

**Propose:**

`round(25 + 0.70×Strength + 0.60×Endurance + 0.35×Lust)`

Fields:
- base = **25**;
- Strength factor = **0.70**;
- Endurance factor = **0.60**;
- Lust factor = **0.35**.

Target behavior:
- materially better than ordinary work because the player is trapped behind a 20000 obligation;
- still requires substantially more than 50 shifts for repayment;
- low-build Street remains barely viable only under an early/favorable trap;
- cheap lodging becomes the rational money-efficiency upgrade;
- Lust matters economically without becoming the main wage stat.

## P3 — Takeover gates

**Propose:**

- Strength >= **60**;
- Endurance >= **60**;
- Sexuality >= **60**;
- Lust >= **25**;
- completed hidden shifts >= 50;
- paid School lessons >= 10;
- explicit Takeover action.

The 60 thresholds are tied to the locked 50-shift distance under the proposed +1 stat package.

The Lust threshold is tied to voluntary D20 growth rather than forced work.

## P4 — three distinct future-life Meta reward roles

Secret Debt remains outside ordinary Hard Work / Palace 10/10.

These should be hidden-route selectable modifiers, not ordinary `hardWorkProgress`.

### Paid Freedom — economy opener

**Role:** future-life liquidity / safer early housing.

**Proposed effect:** selectable **+1000 starting money**.

Why:
- current start is 600;
- +1000 funds 10 normal-room nights or 20 cheap-lodging nights;
- it is only 5% of the Secret Debt principal, so it does not trivialize a future 20000 route;
- it does not copy the historical original reward value.

### Bound Life — action-economy build

**Role:** future-life School / Activity / multi-action throughput.

**Proposed effect:** selectable **+1 daily Energy**.

Why:
- modeling shows it is a genuinely different playstyle reward rather than a renamed stat bonus;
- it makes 2-Energy Activity compatible with Street under forced Night;
- it substantially improves School + work coexistence;
- because it is very strong, it should be treated as a strong selectable modifier under the successor Meta loadout direction, never an automatic stack.

### Takeover — Lust-specialist opener

**Role:** future-life high-Lust / Body Confidence / sexual-route acceleration.

**Proposed effect:** selectable **+5 starting Lust**.

Why:
- Lust is intentionally harder to grow;
- +5 matches the current successor's meaningful +5 bonus scale without pretending Lust is an ordinary progression stat;
- it directly rewards the route whose conclusion requires voluntary high Lust;
- it is strategically different from both money and Energy.

## P5 — recommendation matrix

| Decision | v3 proposal |
| --- | --- |
| Shift Strength gain | +1 |
| Shift Endurance gain | +1 |
| Shift Sexuality gain | +1 |
| Forced-work Lust gain | 0 |
| Wage base | 25 |
| Strength wage factor | 0.70 |
| Endurance wage factor | 0.60 |
| Lust wage factor | 0.35 |
| Takeover Strength | 60 |
| Takeover Endurance | 60 |
| Takeover Sexuality | 60 |
| Takeover Lust | 25 |
| Takeover hidden shifts | locked 50 |
| Takeover paid School lessons | locked 10 |
| Paid Freedom Meta | selectable +1000 starting money |
| Bound Life Meta | selectable +1 daily Energy |
| Takeover Meta | selectable +5 starting Lust |

## P6 — modeling caveats

These calculations are comparative balance models, not deterministic player forecasts.

They assume:
- retained +2000 at activation;
- no purchases other than modeled lodging/School;
- no item resale;
- no Activity money because current-main Activity result effects contain no direct money;
- hidden work is always chosen whenever model Energy remains;
- stats cap at 100;
- D20 Body Confidence Lust +2 is treated as locked Product behavior even if a particular current implementation seam is pending integration;
- low/mid/high are synthetic activation snapshots, not proposed starting defaults.

Later economy changes can shift the absolute repayment-day values, but the relative conclusions are stable:
- Street is Energy-poor;
- cheap lodging is efficient for repayment;
- School trades repayment speed for Takeover preparation;
- Activity has a meaningful Energy opportunity cost;
- +1 daily Energy is a major future-run playstyle modifier.

Everything under **PROPOSAL** remains unapproved until Leader/Product explicitly locks it.
