# Chat 5 — Secret Debt bounded parameter sweep / shortlist v5

Status: **RESEARCH ONLY — NOT PRODUCT AUTHORITY**
Owner: Chat 5 / Full-Career Producer C
Branch: `chat5/secret-debt-balance-sweep-v5`
Dependent harness: `chat5/secret-debt-balance-harness-v4@c4352102bb242753ae1429bbadbb6f403d188850`

No Secret Debt production constant or runtime value is changed by this sweep.

The original-game reference is used only as historical shape: paid work can scale with build and hidden poverty routes can justify distinct long-term rewards. **No original-game number is used in the sweep grid, classification, or shortlist.**

## 1. Locked design held fixed

The sweep does not vary:

- acceptance money: +2000;
- activation delay: 10 days;
- debt: 20000;
- forced Night every bound night;
- next-day Energy: -1;
- hidden Hard Work: 50 daytime shifts;
- Takeover structure: at least 10 paid School lessons;
- Lust must contribute positively to wage;
- Secret Debt remains intentionally hard;
- the +1 daily Energy NG+ benefit is expected to make the route substantially more practical.

## 2. Bounded sweep grid

The v5 sweep script imports the frozen v4 harness rather than reimplementing the simulation.

Grid:

| Parameter | Sampled values |
| --- | --- |
| Strength gain / shift | 1, 2 |
| Endurance gain / shift | 1, 2 |
| Sexuality gain / shift | 1, 2 |
| Wage base | 20, 25, 30 |
| Strength wage factor | 0.55, 0.70, 0.85 |
| Endurance wage factor | 0.45, 0.60, 0.75 |
| Lust wage factor | 0.20, 0.35, 0.50 |
| Shared S/E/Sexuality Takeover threshold | 55, 60, 65 |
| Takeover Lust threshold | 20, 25, 30 |

Total tuning sets:

**5,832**

Primary comparison scenario:

- starting money: 2000;
- Cheap lodging;
- School mix: 5 Physical Training + 5 Body Confidence;
- Large Activity attempted every 10 days;
- 160-day horizon;
- low / mid / high activation builds from the v4 harness;
- evaluated both without and with +1 daily Energy.

For Takeover timing, v5 additionally checks bounded targeted School mixes:

- 10 Physical / 0 Body;
- 5 / 5;
- 0 / 10;
- 5 / 10;
- 2 / 13;
- 0 / 15.

The reported Takeover-ready day is the earliest result among those bounded mixes. This deliberately allows a player to take more than the minimum 10 paid lessons when a high Lust threshold demands it.

## 3. Operational research flags

These are sweep diagnostics, **not balance authority**.

### "Trivializes 20000"

Flagged when:

- Mid activation build;
- +1 daily Energy enabled;
- Cheap lodging;
- 5 Physical + 5 Body School plan;
- Activity every 10 days;
- full 20000 repayment by **calendar day 50 or earlier**.

Result:

**54 / 5,832** parameter sets are flagged.

All 54 live at the aggressive upper wage/gain corner. They reduce to six unique gain+wage packages before the nine threshold combinations are applied:

- wage is always base 30 / Strength 0.85 / Endurance 0.75;
- Lust factor is 0.35 or 0.50;
- Strength and/or Endurance gain is 2.

The fastest sampled standard Mid+NG+ repayment is day **49**.

No sampled set repays before its own 50-shift milestone. The flag therefore means "too forgiving for the intended hard secret-route profile", not literal zero-friction repayment.

### "Paid Freedom effectively impossible for low base-energy play"

Flagged when a Low activation build without +1 Energy cannot hold 20000 by day 160 under **both**:

- Street lodging;
- Normal lodging;

with the standard School+Activity load.

Result:

**1,296 / 5,832** tuning sets are flagged.

This flag concerns **Paid Freedom only**. Bound Life or a targeted Takeover can still be possible.

The risk is concentrated at the low wage edge:

- all flagged sets use Strength factor 0.55 or 0.70;
- all use Endurance factor 0.45 or 0.60;
- no set with Strength factor 0.85 or Endurance factor 0.75 falls into this specific two-lodging failure class;
- base 20 is most exposed, but low-factor combinations at base 25 and 30 can still fail.

## 4. Feasible sampled ranges

Interaction matters more than any single parameter. Every sampled value appears in at least one non-flagged combination.

Therefore the broad **feasible sampled envelope** is:

- Strength gain: **1–2**;
- Endurance gain: **1–2**;
- Sexuality gain: **1–2**;
- wage base: **20–30**;
- Strength factor: **0.55–0.85**;
- Endurance factor: **0.45–0.75**;
- Lust factor: **0.20–0.50**;
- shared Takeover S/E/Sexuality threshold: **55–65**;
- Takeover Lust threshold: **20–30**.

But the corners are not equivalent:

- base 20 + low Strength/Endurance factors is strongly NG+-leaning and can make low-build repayment lodging-sensitive or impossible before 160;
- base 30 + 0.85 Strength + 0.75 Endurance + 0.35–0.50 Lust combined with multiple +2 gains enters the too-forgiving NG+ flag;
- Sexuality +2 does not accelerate wage, but it removes Takeover build pressure quickly;
- Strength/Endurance +2 accelerate both build progression and wage progression and therefore have the largest compounding effect.

For the three shortlisted proposals below, v5 keeps gains at **+1/+1/+1**. This preserves a clean 50-shift progression arc and lets wage/threshold tuning carry the difficulty difference instead of multiplying both income and stats simultaneously.

---

# SHORTLIST

All three proposals are **RESEARCH ONLY**.

Tables use the standard mixed scenario for:

- 50-shift day;
- 10-School-lesson day;
- repayment day.

"Takeover" uses the earliest bounded targeted School mix and shows that mix in parentheses.

Format:

**50 shifts / 10 School / repayment / Takeover**

## Proposal 1 — harsh / NG+-leaning

Parameters:

- gains: Strength +1 / Endurance +1 / Sexuality +1;
- wage: **20 + 0.55×Strength + 0.45×Endurance + 0.20×Lust**;
- Takeover: **65 Strength / 65 Endurance / 65 Sexuality / 30 Lust**.

### Without +1 daily Energy

| Build | Days |
| --- | --- |
| Low | **33 / 36 / 153 / 48** — Takeover mix 0 Physical / 15 Body |
| Mid | **32 / 26 / 141 / 32** — Takeover mix 5 / 10 |
| High | **33 / 23 / 134 / 32** — Takeover mix 0 / 10 |

### With +1 daily Energy

| Build | Days |
| --- | --- |
| Low | **22 / 20 / 88 / 28** — Takeover mix 0 / 15 |
| Mid | **22 / 16 / 83 / 22** — Takeover mix 0 / 10 |
| High | **22 / 14 / 78 / 22** — Takeover mix 5 / 5 |

### Player experience

This version makes the first life feel genuinely trapped.

Paid Freedom is a late-run achievement at base Energy. Low-build players are pushed toward either a specialized Body Confidence takeover plan or accepting Bound Life rather than expecting easy repayment.

The +1 Energy benefit changes the experience dramatically: repayment falls from 134–153 days to 78–88 days across the three modeled builds. That makes NG+ feel like a route-changing advantage rather than a small numeric perk.

Cost: base-run Paid Freedom is highly lodging-sensitive. Low-build Street and Normal standard scenarios do not reach 20000 by day 160, so this proposal intentionally leans hardest on route knowledge and future-life power.

## Proposal 2 — balanced-hard

Parameters:

- gains: Strength +1 / Endurance +1 / Sexuality +1;
- wage: **25 + 0.70×Strength + 0.60×Endurance + 0.35×Lust**;
- Takeover: **60 Strength / 60 Endurance / 60 Sexuality / 25 Lust**.

### Without +1 daily Energy

| Build | Days |
| --- | --- |
| Low | **33 / 28 / 114 / 32** — Takeover mix 0 Physical / 10 Body |
| Mid | **33 / 23 / 104 / 32** — Takeover mix 0 / 10 |
| High | **32 / 17 / 96 / 32** — Takeover mix 10 / 0 |

### With +1 daily Energy

| Build | Days |
| --- | --- |
| Low | **22 / 17 / 68 / 22** — Takeover mix 0 / 10 |
| Mid | **22 / 14 / 63 / 22** — Takeover mix 5 / 5 |
| High | **22 / 12 / 59 / 22** — Takeover mix 10 / 0 |

### Player experience

This keeps all three exits meaningfully distinct.

Bound Life arrives first through the 50-shift milestone. Takeover becomes a deliberate School specialization choice around the same broad career phase. Paid Freedom stays much later at roughly day 96–114 without NG+.

The low build can reach Takeover by specializing ten paid lessons into Body Confidence; the mid build can use either a Body-heavy or balanced plan; the high build can afford to use Physical Training because its Lust is already sufficient.

With +1 Energy, repayment drops to 59–68 days. That is a large improvement but still leaves a substantial bound period after the 22-day 50-shift milestone.

This is the cleanest middle of the sampled envelope.

## Proposal 3 — forgiving-but-still-secret

Parameters:

- gains: Strength +1 / Endurance +1 / Sexuality +1;
- wage: **30 + 0.80×Strength + 0.70×Endurance + 0.45×Lust**;
- Takeover: **55 Strength / 55 Endurance / 55 Sexuality / 20 Lust**.

### Without +1 daily Energy

| Build | Days |
| --- | --- |
| Low | **31 / 23 / 95 / 32** — Takeover mix 0 Physical / 10 Body |
| Mid | **33 / 19 / 88 / 32** — Takeover mix 0 / 10 |
| High | **33 / 16 / 82 / 33** — Takeover mix 10 / 0 |

### With +1 daily Energy

| Build | Days |
| --- | --- |
| Low | **22 / 15 / 59 / 22** — Takeover mix 0 / 10 |
| Mid | **22 / 13 / 54 / 22** — Takeover mix 5 / 5 |
| High | **22 / 10 / 51 / 22** — Takeover mix 10 / 0 |

### Player experience

This proposal keeps the route oppressive in structure but reduces grind.

The player still loses ordinary careers, still pays the forced-Night Energy tax, still owes 20000, and still cannot simply buy freedom near the 50-shift milestone. Base repayment remains day 82–95 in the modeled mixed route.

Takeover thresholds are more permissive, so School choice feels like optimization rather than rescue from an unreachable build.

With +1 Energy, the high-build case reaches repayment around day 51. This is close to the sweep's "too forgiving" boundary but does **not** cross the v5 Mid-build day-50 trivialization flag. It is therefore the upper edge recommended for consideration, not a suggestion to increase wages further.

---

## 5. Lodging sensitivity for Low build

Standard 5/5 School + Activity-every-10 route.

### No +1 daily Energy — repayment day

| Proposal | Street | Cheap | Normal |
| --- | ---: | ---: | ---: |
| Harsh / NG+-leaning | impossible by 160 | 153 | impossible by 160 |
| Balanced-hard | impossible by 160 | 114 | 145 |
| Forgiving-but-still-secret | 140 | 95 | 111 |

### With +1 daily Energy — repayment day

| Proposal | Street | Cheap | Normal |
| --- | ---: | ---: | ---: |
| Harsh / NG+-leaning | 116 | 88 | 107 |
| Balanced-hard | 93 | 68 | 78 |
| Forgiving-but-still-secret | 76 | 59 | 62 |

This is the clearest evidence that the locked +1 Energy benefit does what the design expects: it converts multiple low-build lodging cases from borderline/impossible into practical same-run repayment paths.

## 6. Recommendation

For Leader/Product consideration:

1. **Harsh / NG+-leaning** if the intended first-life fantasy is "the debt is a real trap; mastery and NG+ radically change it."
2. **Balanced-hard** if all three endings should be realistically pursuable in the first run while Paid Freedom remains the slow economic exit.
3. **Forgiving-but-still-secret** if the route should be oppressive through lock/forced Night/story structure but not through very long repayment grind.

The sweep does **not** choose among these. All three remain proposals.

The bounded result suggests avoiding:

- lower wage combinations that make low-build Paid Freedom fail across multiple lodging strategies without NG+;
- the sampled maximum wage corner combined with multiple +2 gains, because it pushes Mid+NG+ repayment to day 49–50 under a mixed School+Activity load.

No value in this document should be wired into production until Leader/Product explicitly promotes it to authority.
