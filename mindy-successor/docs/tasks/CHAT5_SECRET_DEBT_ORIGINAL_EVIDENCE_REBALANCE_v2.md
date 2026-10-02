# Chat 5 — Secret Debt original-evidence rebalance v2

Status: **PROPOSAL ONLY — NOT PRODUCT AUTHORITY**
Owner: Chat 5 / Full-Career Producer C
Branch: `chat5/secret-debt-original-evidence-rebalance-v2`
Research baseline: current `main = 176d879f01edea725a331ffe7fb2fb17fb316889`

This is a docs-only rebalance of the earlier
`CHAT5_SECRET_DEBT_BALANCE_PROPOSAL.md`.

No production runtime/data values are changed here.

The document deliberately separates:
1. **ORIGINAL EVIDENCE** — verified historical mechanics from the original SWF;
2. **SUCCESSOR DESIGN** — current locked successor authority;
3. **PROPOSAL** — new Secret Debt tuning suggestions that remain unapproved.

---

# ORIGINAL EVIDENCE

Historical evidence source:
`docs/ORIGINAL_GAME_MECHANICS_REFERENCE_v1.md`.

These facts are reference evidence only and never override current Product locks.

## OE-1 — original job wages were materially higher and more stat-sensitive

Recovered original formulas use a random base plus large stat multipliers.

Relevant examples:

- Guard:
  `randomInt(25,50) + 1.25×Strength + 1.25×Prowess + 1.0×Fuckability`
- Farmer:
  `randomInt(25,50) + 1.25×Strength + 1.25×Durability + 1.0×Fuckability`
- Gloryhole:
  `randomInt(25,50) + 1.25×Durability + 1.25×Strength + 1.0×Prowess + 1.0×Fuckability`
- Prostitute:
  `randomInt(50,75) + 1.5×Charisma + 1.5×Sociability + 1.0×Fuckability`
- Geisha:
  `randomInt(75,100) + 1.5×Cleanliness + 1.5×Class + 1.5×Charisma + 1.0×Fuckability`

Using the midpoint of the random range and equal relevant stats only for comparison:

| Equal historical relevant stats | Guard/Farmer expected wage | Prostitute expected wage |
| --- | ---: | ---: |
| 20 | ~108 | ~143 |
| 50 | ~213 | ~263 |
| 80 | ~318 | ~383 |
| 100 | ~388 | ~463 |

This is not a one-to-one successor formula. It is evidence that the earlier Secret Debt v1 proposal was conservative relative to the original game's paid-work economy.

The original also used persistent Fuckability as a positive wage input in multiple jobs.

That supports a positive successor Lust wage contribution only as a design analogy. Original Fuckability is **not** the successor Lust stat.

## OE-2 — original work included real stat tradeoffs

Recovered original seasonal work did not simply increase stats.

Examples include:

- Guard / Brimstone: Strength +1, Prowess +1, Intellect -1, Class -1;
- Farmer / Brimstone: Strength +1, Durability +1, Cleanliness -1;
- Prostitute / Brimstone: Charisma +1, Sociability +1, Class -1, Intellect -1;
- Geisha / Brimstone: Class +1, Sociability +1, Charisma +1, Strength -1, Durability -1.

Across all recovered original job methods every season contains at least one negative tradeoff.

This is evidence for meaningful cost, **not** authority to copy the original harsh every-season pattern into the successor.

## OE-3 — original hidden poverty/no-rent route used a 20-count milestone

The original no-rent route:

- increments `noRentCount` each no-rent night/day;
- has an earlier scene at 5;
- reaches its dedicated later route/ending at `noRentCount >= 20`, subject to flags.

This is strong pacing evidence that the original game's poverty-route payoff was not designed as an extremely long 100+ action gate.

It does **not** replace the successor's locked Secret Debt Hard Work requirement of 50 daytime shifts.

## OE-4 — original no-rent NG+ reward was exactly +2000 starting money

The original ending-selection code explicitly gives:

**+2000 starting money**

for the no-rent ending bonus.

This is the strongest direct historical evidence now available for successor Secret Debt Meta tuning.

---

# SUCCESSOR DESIGN

These are current Product constraints and are not proposals.

## SD-1 — D19 remains authoritative

Secret Debt keeps:

- 20% eligible street-night lender chance;
- +2000 immediate accepted help;
- activation exactly 10 days later;
- exact 20000 debt;
- all ten ordinary professions domain-locked while bound;
- School available;
- Large Activity available;
- paid hidden daytime work;
- positive Lust wage input;
- forced Night every bound night;
- next-day Energy -1;
- one all-at-once 20000 repayment;
- 50 completed daytime shifts for hidden-route Hard Work;
- no contribution to ordinary Palace 10/10;
- Takeover requires career progress, appropriate build, high Lust, 10 paid School lessons, and explicit player action.

## SD-2 — successor Lust remains distinct

Original Fuckability is not mapped to successor Lust.

Current D20 separately locks:

- Body Confidence paid lesson => Lust +2;
- forced Secret Debt Night => no automatic Lust gain.

Therefore original Fuckability formulas can support the **direction** "Lust helps wage", but not an exact coefficient or Takeover threshold.

## SD-3 — successor work tradeoffs are intentionally softer than original

Current Product direction is roughly:

**2 negative seasons out of 4 per ordinary profession**

rather than the original every-season-negative model.

A Secret Debt proposal should therefore use the original as evidence for tradeoffs while staying inside the successor's softer philosophy.

## SD-4 — current NG+ stat-bonus scale is +5, not the old +3/+3 model

D21–D22 supersede the earlier automatic +3/+3 / Merchant +600 direction.

Current ordinary Hard Work scale is:

- selectable +5 stat packages;
- first five ordinary careers: one +5 target;
- later five ordinary careers: up to two +5 targets;
- Lust bonus, where used, has minimum magnitude +3.

Secret Debt remains outside ordinary Hard Work and Palace 10/10, but these magnitudes are the better current successor comparison point for a hidden-route Meta proposal.

## SD-5 — successor economy is compressed relative to the original

Current shipped ordinary wages are much lower than the historical formulas.

Therefore this rebalance does **not** copy original 1.25–1.5 coefficients literally.

The goal is to move Secret Debt wage materially upward from proposal v1 while still fitting the successor's 20000 debt / 160-day economy.

---

# PROPOSAL

Everything below remains proposal-only.

## P-1 — revised hidden shift stat package

### Previous v1 proposal

Every shift:

- Strength +1;
- Endurance +1;
- Sexuality +1;
- no negative tradeoff.

### Revised v2 proposal

Keep the three core positive gains every shift:

- Strength +1;
- Endurance +1;
- Sexuality +1;
- Lust +0.

Add exactly two seasonal tradeoffs:

| Season | Positive gains | Negative tradeoff |
| --- | --- | --- |
| Spring | Strength +1, Endurance +1, Sexuality +1 | none |
| Summer | Strength +1, Endurance +1, Sexuality +1 | Reason -1 |
| Autumn | Strength +1, Endurance +1, Sexuality +1 | none |
| Winter | Strength +1, Endurance +1, Sexuality +1 | Sociability -1 |

Why:

- the original gives strong evidence that work should have actual opportunity costs;
- two negative seasons follows successor design instead of copying original every-season penalties;
- negatives are kept off Strength / Endurance / Sexuality so Takeover reachability does not become dependent on the calendar date at which the trap activates;
- Lust still never rises from forced work;
- Reason/Sociability are a successor design choice, not claimed mappings of original Intellect/Class.

**PROPOSAL:** replace flat all-positive v1 with the above 2-of-4 seasonal tradeoff package.

## P-2 — revised hidden wage

### Previous v1 proposal

`round(25 + 0.50×Strength + 0.40×Endurance + 0.30×Lust)`

Equal-stat outputs:

- 20 => 49
- 50 => 85
- 80 => 121
- 100 => 145

This is now judged too conservative against the verified original wage evidence.

### Revised v2 proposal

`round(30 + 0.75×Strength + 0.75×Endurance + 0.50×Lust)`

Exact proposed fields:

- base = **30**
- Strength factor = **0.75**
- Endurance factor = **0.75**
- Lust factor = **0.50**

Equal-stat outputs:

| Strength / Endurance / Lust | v1 wage | v2 wage |
| --- | ---: | ---: |
| 20 / 20 / 20 | 49 | **70** |
| 50 / 50 / 50 | 85 | **130** |
| 80 / 80 / 80 | 121 | **190** |
| 100 / 100 / 100 | 145 | **230** |

The v2 formula remains substantially below historical Guard/Farmer/Prostitute expected wages at comparable equal stat values, but it restores the original game's design signal that paid work scales strongly with build.

Lust remains useful but is not the dominant coefficient.

### Repayment pacing under v2

Model assumptions:

- the +2000 accepted-help money is still held at activation;
- debt repayment requires holding 20000;
- only hidden work income is counted;
- Strength and Endurance gain +1 after each hidden shift until 100;
- Lust stays fixed at the scenario start value;
- no School tuition, Activity income, purchases or other income are included;
- normal room costs 100/night;
- cheap lodging costs 50/night;
- street costs 0 but adds its existing -1 next-day Energy;
- forced Secret Debt Night adds its locked -1 next-day Energy;
- therefore paid lodging permits roughly 2 hidden shifts/day, while street permits roughly 1.

Estimated time to reach 20000 cash:

| Starting S/E/L | Normal room | Cheap lodging | Street |
| --- | ---: | ---: | ---: |
| 20 / 20 / 20 | ~82 days / 163 shifts | ~70 days / 139 shifts | ~121 days / 121 shifts |
| 50 / 50 / 50 | ~64 days / 128 shifts | ~56 days / 111 shifts | ~98 days / 98 shifts |
| 80 / 80 / 80 | ~54 days / 108 shifts | ~47 days / 94 shifts | ~84 days / 84 shifts |

Interpretation:

- Paid Freedom remains materially slower than the 50-shift Bound Life eligibility;
- unlike v1, a low/mid build is no longer pushed toward near-run-length repayment under ordinary lodging;
- Street is not a free economic shortcut because the extra Energy loss halves daytime work throughput;
- the original no-rent 20-count is treated as pacing evidence that a poverty route should present meaningful outcomes before an extreme grind, while the successor's explicit 50-shift lock remains unchanged.

**PROPOSAL:** use the v2 wage formula above.

## P-3 — revised Takeover thresholds

### Previous v1 proposal

- Strength >= 55
- Endurance >= 55
- Sexuality >= 55
- Lust >= 40
- plus locked 50 shifts + 10 paid School lessons.

### Revised v2 proposal

Keep the locked structural gates and set:

- Strength >= **50**
- Endurance >= **50**
- Sexuality >= **50**
- Lust >= **30**
- completed hidden shifts >= 50;
- paid School lessons >= 10.

Rationale:

1. The original later-job stat gates are mostly in the 15–40 range; 55/40 was comparatively aggressive.
2. The original poverty/no-rent route had a dedicated 20-count payoff. The successor intentionally raises its hidden-work baseline to 50 shifts already, so a second large post-50 grind is unnecessary.
3. Under proposed +1 Strength/+1 Endurance/+1 Sexuality every shift, a character starting near 1 reaches roughly 51 in those axes by the 50-shift milestone. Threshold 50 therefore makes the route internally legible: the work itself can build the required body, while School remains independently required.
4. Lust stays separate. From a default-like Lust 1, Body Confidence +2 would require about 15 paid Body Confidence lessons to reach 30 if that were the only Lust source.
5. That remains above the structural 10-paid-lesson requirement without making the old Lust 40 proposal demand roughly 20 Body Confidence lessons.

This preserves "high Lust" as a meaningful additional build requirement but avoids making Takeover much longer than the already locked 50-shift hidden Hard Work path.

**PROPOSAL:** 50 / 50 / 50 progression thresholds and Lust 30.

## P-4 — revised Meta rewards

All three remain hidden-route unlocks:

- never `kind: hardWork`;
- never count toward Palace 10/10;
- preferably selectable at New Start / Meta setup rather than automatically stacked.

### Paid Freedom

**Proposed unlock ID:**
`secret-debt.paid-freedom.reserve`

**Revised effect:**
**+2000 starting money** in a future life when selected.

Change from v1:
- v1 proposed +600;
- v2 proposes +2000.

Grounding:
- this is the exact verified original no-rent NG+ reward;
- the thematic function is also aligned: completing a poverty/debt route gives future economic resilience;
- it is historical evidence plus successor adaptation, not automatic authority.

### Bound Life

**Proposed unlock ID:**
`secret-debt.bound-life.conditioning`

**Revised effect:**
**+5 Endurance** at future-life start when selected.

Change from v1:
- v1 proposed +3 Strength / +3 Endurance;
- v2 uses one +5 axis.

Grounding:
- old +3/+3 is superseded by D21–D22;
- +5 is the current successor ordinary Hard Work package magnitude;
- a single Endurance bonus keeps this simpler 50-shift hidden Hard Work analogue below the breadth of a complex later-career package;
- it still does not create ordinary Hard Work progress.

### Takeover

**Proposed unlock ID:**
`secret-debt.takeover.instinct`

**Revised effect:**
**+5 Wits and +3 Lust** at future-life start when selected.

Change from v1:
- v1 proposed +3 Wits / +3 Sexuality;
- v2 uses current successor scales and preserves Lust as its own axis.

Grounding:
- +5 follows current Hard Work stat-package scale;
- +3 Lust matches the current minimum magnitude for a meaningful Lust bonus under D22;
- Wits represents planning/control;
- Lust rewards the distinct voluntary build demanded by Takeover without pretending Lust is original Fuckability.

This package is intentionally narrower than two +5 progression stats plus another full bonus.

## P-5 — old vs revised proposal summary

| Area | v1 proposal | v2 proposal |
| --- | --- | --- |
| Shift positives | +1 Strength / +1 Endurance / +1 Sexuality every shift | same |
| Shift negatives | none | Summer Reason -1; Winter Sociability -1 |
| Wage | 25 + .50S + .40E + .30L | **30 + .75S + .75E + .50L** |
| Takeover progression gates | 55 / 55 / 55 | **50 / 50 / 50** |
| Takeover Lust | 40 | **30** |
| Paid Freedom Meta | +600 money | **+2000 money** |
| Bound Life Meta | +3 Strength / +3 Endurance | **+5 Endurance** |
| Takeover Meta | +3 Wits / +3 Sexuality | **+5 Wits / +3 Lust** |

## P-6 — why original no-rent 20 does not become Secret Debt 20

The original 20-count is evidence about pacing, not successor authority.

Do **not** change:

- Secret Debt Hard Work from 50 to 20;
- the 20000 debt;
- the 10-day delay;
- the 20% encounter chance;
- the 10 paid School lesson structural Takeover requirement.

The rebalance uses the original 20-count only to argue against stacking unnecessary extra grind on top of the successor's already longer 50-shift hidden route.

## P-7 — recommendation for Leader/Product decision

Recommended v2 package:

- seasonal hidden shift:
  - every shift: Strength +1, Endurance +1, Sexuality +1;
  - Summer: Reason -1;
  - Winter: Sociability -1;
  - no forced-work Lust gain;
- wage:
  **30 + 0.75×Strength + 0.75×Endurance + 0.50×Lust**;
- Takeover:
  **Strength 50 / Endurance 50 / Sexuality 50 / Lust 30**
  plus existing **50 shifts + 10 paid School lessons**;
- Paid Freedom Meta:
  selectable **+2000 starting money**;
- Bound Life Meta:
  selectable **+5 Endurance**;
- Takeover Meta:
  selectable **+5 Wits +3 Lust**.

Everything in this section remains **PROPOSAL** until explicit Leader/Product promotion.

Production runtime must continue to keep the current balance-open constants unresolved until that happens.
