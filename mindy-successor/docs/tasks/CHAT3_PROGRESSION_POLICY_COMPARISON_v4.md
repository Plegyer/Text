# Chat 3 — Progression Policy Comparison v4

Status: **PRODUCT DECISION PACKET / RESEARCH ONLY / NO PRODUCTION CHANGES**  
Owner: Chat 3  
Current coordination main read from: `2999f202e7e7fcd21f9d3f83b23b404921c41685`  
Frozen harness base: `chat3/progression-balance-harness-v3@e631af2e17675c27309aa1b8bd5a6161a1090ce8`  
Branch: `chat3/progression-policy-comparison-v4`

## 0. Scope

This packet compares progression policies using the frozen v3 successor harness and its live inputs.

No production mechanics/content are changed here.  
No original-game values are used as tuning targets.  
All alternate negative-target results remain **RESEARCH**, not Product authority.

The comparison matrix covers all requested combinations:

- same-career repetition:
  - current Energy-only repetition;
  - max 2 same-career shifts/day;
  - max 1 same-career shift/day;
- starting allocation:
  - base;
  - focused: all 10 creation points in the strongest live work-grown stat;
- negative map:
  - current live seasonal negatives;
  - research alternate map from `progression-negative-targets-v2.json`;
- School:
  - none;
  - one best-overlap targeted paid lesson every 10 days;
- analysis cap:
  - 100.

Cross-career comparison keeps the v3 harness assumption that the target career is available from Day 1. This normalizes progression policy and also represents later-life early-access cases; it is not a first-life unlock claim.

Money below is **gross work income by shift 50**. School tuition and lodging are not subtracted from that column.

## 1. Headline comparison

| Same-career policy | Hard Work=50 | Seasonal breadth before HW | Main pacing read |
|---|---:|---|---|
| Current Energy-only, baseline Energy 3 | Day 17 | Spring + Summer only in a Day-1 rush | Highly compressed |
| Max 2/day | Day 25 | Spring + Summer + part of Autumn | Still compressed |
| Max 1/day | Day 50 | Full 40-day seasonal cycle + next Spring | Career-scale pacing |

A targeted School lesson every 10 days does **not** change these Day-50 values in the tested baseline:
- current still reaches 50 shifts on Day 17;
- max 2 still on Day 25;
- max 1 still on Day 50.

For current repetition the Day-10 lesson consumes one Energy, but the remaining shift cadence still reaches shift 50 on Day 17.

## 2. Full requested matrix

Notation:
- **Reach** = number of the ten ordinary careers whose strongest live work stat reaches 100 by Day 160.
- **D100 E/M/L** = earliest / median / latest day-to-100 among careers that reach 100.
- For the two max-1 + alternate + no-School rows, only 6/10 reach 100; the median/latest therefore describe those six.
- **Neg@50** = realized negative movement / attempted negative movement through the first 50 career shifts, aggregated across all ten careers.
- **Money@50** = median gross work money across careers, with `[min-max]`.

| Policy | Negatives | School | Start | HW day | Reach | D100 E/M/L | Neg@50 | Money@50 |
|---|---|---|---|---:|---:|---|---:|---:|
| Current | Live | None | Base | 17 | 10/10 | 37 / 43 / 53 | 11/270 = **4.1%** | 1532.5 [1206-1650] |
| Current | Live | None | Focus | 17 | 10/10 | 30 / 40 / 40 | 11/270 = **4.1%** | 1682.5 [1382-1775] |
| Current | Live | 1/10d | Base | 17 | 10/10 | 36 / 40 / 40 | 11/271 = **4.1%** | 1554.5 [1229-1702] |
| Current | Live | 1/10d | Focus | 17 | 10/10 | 29 / 38 / 38 | 11/271 = **4.1%** | 1705.5 [1405-1827] |
| Current | Research alt | None | Base | 17 | 10/10 | 37 / 43 / 73 | 125/270 = **46.3%** | 1481 [1206-1650] |
| Current | Research alt | None | Focus | 17 | 10/10 | 30 / 40 / 64 | 135/270 = **50.0%** | 1625 [1382-1775] |
| Current | Research alt | 1/10d | Base | 17 | 10/10 | 36 / 40 / 60 | 137/271 = **50.6%** | 1493.5 [1229-1702] |
| Current | Research alt | 1/10d | Focus | 17 | 10/10 | 29 / 38 / 60 | 147/271 = **54.2%** | 1638 [1405-1827] |
| Max 2 | Live | None | Base | 25 | 10/10 | 50 / 60 / 70 | 23/250 = **9.2%** | 1496 [1186-1635] |
| Max 2 | Live | None | Focus | 25 | 10/10 | 45 / 55 / 65 | 23/250 = **9.2%** | 1657.5 [1362-1760] |
| Max 2 | Live | 1/10d | Base | 25 | 10/10 | 44 / 52 / 61 | 23/250 = **9.2%** | 1542 [1231-1734] |
| Max 2 | Live | 1/10d | Focus | 25 | 10/10 | 40 / 49 / 57 | 23/250 = **9.2%** | 1704 [1407-1859] |
| Max 2 | Research alt | None | Base | 25 | 10/10 | 50 / 65 / 90 | 155/250 = **62.0%** | 1383 [1186-1635] |
| Max 2 | Research alt | None | Focus | 25 | 10/10 | 45 / 60 / 85 | 165/250 = **66.0%** | 1533 [1362-1760] |
| Max 2 | Research alt | 1/10d | Base | 25 | 10/10 | 44 / 56.5 / 79 | 161/250 = **64.4%** | 1436 [1231-1734] |
| Max 2 | Research alt | 1/10d | Focus | 25 | 10/10 | 40 / 49 / 74 | 171/250 = **68.4%** | 1586 [1407-1859] |
| Max 1 | Live | None | Base | 50 | 10/10 | 99 / 129 / 139 | 29/250 = **11.6%** | 1445.5 [1191-1547] |
| Max 1 | Live | None | Focus | 50 | 10/10 | 89 / 119 / 119 | 29/250 = **11.6%** | 1608.5 [1368-1697] |
| Max 1 | Live | 1/10d | Base | 50 | 10/10 | 79 / 92 / 100 | 29/250 = **11.6%** | 1570 [1301-1785] |
| Max 1 | Live | 1/10d | Focus | 50 | 10/10 | 74 / 85 / 92 | 29/250 = **11.6%** | 1731.5 [1477-1908] |
| Max 1 | Research alt | None | Base | 50 | **6/10** | 99 / 129 / 129 | 205/250 = **82.0%** | 1316.5 [1191-1470] |
| Max 1 | Research alt | None | Focus | 50 | **6/10** | 89 / 119 / 119 | 214/250 = **85.6%** | 1479.5 [1368-1611] |
| Max 1 | Research alt | 1/10d | Base | 50 | 10/10 | 79 / 96 / 123 | 208/250 = **83.2%** | 1434.5 [1301-1710] |
| Max 1 | Research alt | 1/10d | Focus | 50 | 10/10 | 74 / 85 / 116 | 216/250 = **86.4%** | 1592.5 [1477-1828] |

## 3. What the matrix says

### 3.1 Current Energy-only repetition

Current repetition is overwhelmingly a **calendar-compression** policy.

Even after replacing the weak floor-saturating negatives with the research alternate map:
- Hard Work remains Day 17;
- all 10 careers still cap their strongest stat by Day 160;
- no-School median D100 remains Day 43 base / Day 40 focus;
- targeted School pushes the median to Day 40 base / Day 38 focus.

The alternate negatives improve pressure dramatically:
- live map realizes only about 4% of attempted negative movement before Hard Work;
- research map realizes roughly 46–54%.

But that extra negative pressure does not fix the calendar problem because the player is still applying 50 work packages in 17 days.

### 3.2 Max 2/day

Max 2 is a meaningful but incomplete pacing intervention.

It moves:
- Hard Work from Day 17 -> Day 25;
- no-School live-map median D100 from 43 -> 60 for base;
- no-School research-map median D100 to 65 base / 60 focus.

With the research negative map, 62–68% of attempted negative pressure is realized by shift 50.

However:
- all 10 careers still reach strongest-stat 100 by Day 160;
- focused + targeted School produces a median D100 of Day 49;
- Hard Work still occurs before a full seasonal cycle.

So max 2 is not a stand-alone “slow progression” solution.

### 3.3 Max 1/day

Max 1 is the only tested frequency rule that changes career pacing at the same scale as the 160-day calendar.

With the live negative map:
- Hard Work = Day 50;
- no-School base D100 = 99 / 129 / 139;
- focus = 89 / 119 / 119.

With the research alternate map and no School:
- only **6/10** careers reach 100 at all by Day 160;
- base D100 among those six = 99 / 129 / 129;
- focus = 89 / 119 / 119.

But School remains a strong accelerator:
- max1 + research alt + targeted School returns all 10 careers to cap reachability;
- base D100 = 79 / 96 / 123;
- focus = 74 / 85 / 116.

Therefore max 1 + floor-aware negatives resolves most **work-only** cap pressure, but does not by itself make targeted School a late-run-only path.

## 4. Negative pressure and floor clipping

The current live negative map remains mostly inactive in low-stat builds under every shift-frequency policy.

Realized share before Hard Work:
- current repetition: ~4%;
- max 2: ~9%;
- max 1: ~12%.

The higher percentage under slower policies is not because the live mapping becomes good; it is mainly because seasonal spread gives some negatives a chance to encounter replenished stats. Most orthogonal negative targets still bottom out at 0.

The research alternate map changes the picture materially:
- current repetition: ~46–54% realized by shift 50;
- max 2: ~62–68%;
- max 1: ~82–86%.

This shows two separate knobs:
1. frequency controls **calendar compression**;
2. floor-aware targeting controls whether the intended negative sink actually functions.

They are complementary rather than substitutes.

## 5. Money earned by Hard Work=50

Across the ten careers, gross work money by shift 50 stays in the same broad order of magnitude across policies.

No-School, base allocation median:
- current: **1532.5**;
- max 2: **1496**;
- max 1: **1445.5**.

No-School, focused median:
- current: **1682.5**;
- max 2: **1657.5**;
- max 1: **1608.5**.

The research negative map lowers wages where its negative targets intersect wage-driving stats:
- max1/no-School/base median falls from 1445.5 -> **1316.5**;
- max1/no-School/focus from 1608.5 -> **1479.5**.

Targeted School raises gross wages because the lesson increases relevant stats:
- max1/live/focus median reaches **1731.5**;
- max1/research-alt/focus reaches **1592.5**.

These are **gross career wages only**.

A slower same-career policy increases the number of nights before Hard Work:
- Day 17 vs Day 25 vs Day 50.
So lodging and other calendar costs can make the net economic difference much larger than the gross-wage table suggests.

Conversely, a same-career cap does not have to be a global work cap: the player can still work different careers in one day if Product chooses that implementation.

## 6. Event / milestone density risk

The live authored structure has no direct completed-shift milestone in the 31–49 band for any of the ten ordinary careers.

Current guaranteed numeric skeleton from live content remains approximately:
- Lumber: 1;
- Satyr Maid: 1 / 3 / 8 / 15;
- Undead Farm: 1 / 8 / 20;
- Tavern: 1 / 8 / 20;
- Hunter: 1 / 8 / 20 plus route counters;
- Guard: 1 / 8 / 20 plus duty breadth;
- Merchant: 1 / 3 / 8 / 20 plus trade/route counters;
- Artist/Geisha: 1, then seasonal/route facts;
- Assassin: 1, then seasonal/contract/relationship facts;
- Prostitute: 1, then seasonal/client/relationship facts.

Policy changes how dangerous that structural gap is.

### Current repetition

Approximate earliest calendar placement:
- shift 8: Day 3;
- shift 20: Day 7;
- shift 35: Day 12;
- shift 50: Day 17.

Risk: **very high compression**.

Even if a future authored shift-35 beat is added, it can land only five days before Hard Work. Four-season route content cannot naturally mature before the ending threshold in a pure rush.

### Max 2/day

Approximate placement:
- shift 8: Day 4;
- shift 20: Day 10;
- shift 35: Day 18;
- shift 50: Day 25.

Risk: **moderate/high compression**.

A shift-35 beat has seven calendar days before Hard Work, but Winter is still absent in a Day-1 rush.

### Max 1/day

Placement:
- shift 8: Day 8;
- shift 20: Day 20;
- shift 35: Day 35;
- shift 50: Day 50.

Risk: **structural late-gap remains, but calendar compression is removed**.

The same authored milestone skeleton now has enough calendar space for seasonal, relationship, contract, School and Activity content to interleave.

## 7. Small coherent policy package A — faster work repetition + compensating controls

This package intentionally preserves a faster career.

### A1. Frequency

**Max 2 same-career shifts/day.**

Why max 2 rather than unlimited:
- keeps a fast 25-day Hard Work;
- prevents future +1 daily Energy from shrinking a single career below 25 days;
- requires only one generic daily same-career counter if implemented.

### A2. Negative pressure

Use a **floor-aware negative-target mapping** of the N2/research-alt shape.

Reason:
- live negatives realize only ~9% before Hard Work at max2;
- research map realizes ~62–68%.

The exact research target table remains proposal-level.

### A3. Repetition-specific stat control

If Product wants fast 25-day Hard Work without Day-40–90 work-stat caps, frequency + N2 is not enough.

Smallest coherent compensator:

> The first same-career shift of the day applies the normal seasonal progression-stat package; the second same-career shift still counts as work, advances career counters/events and pays its normal wage, but does not apply a second copy of the seasonal progression-stat package.

This preserves:
- 2/day Hard Work speed;
- faster wage/career-counter play;
- authored “work twice today” choice.

It removes:
- doubling the same daily stat package purely through repetition.

This requires the same per-day career-use state already needed for max2 enforcement, so it is smaller than a new global diminishing-return framework.

It is **not Product authority**; it is the minimal compensator needed to make a fast-repetition package internally coherent.

### A4. Pacing content

Guarantee a late pre-Hard-Work authored beat around shift 35, with Lumber receiving the stronger 8/20/35 remediation already described in v2.

Under max2, shift35 still occurs around Day18, so the content must be authored as a **fast-career escalation**, not as a multi-season veteran story.

### A5. School

Do not globally nerf School in the same patch.

After first-shift-only daily work stats are modeled, rerun targeted School. If School still dominates cap timing, tune only the specific overlapping axes/courses.

### Benefits
- preserves a fast 25-day career;
- preserves two paid work actions in one career/day;
- stops doubled daily seasonal stat farming;
- makes negative tradeoffs materially functional;
- smaller than redesigning all work values.

### Costs
- a second shift becomes asymmetrical: full wage/career progression, no seasonal stat package;
- requires clear UI/journal explanation;
- 25-day Hard Work still precedes a full seasonal cycle;
- route content that needs four seasons may remain behind Hard Work.

### Main implementation surfaces
- generic same-career/day tracking in schema/engine;
- action execution rule for seasonal package on first same-career shift;
- definitions negative targets;
- career milestone packs;
- focused save/reload/day-reset/stat/wage tests.

## 8. Small coherent policy package B — slower same-career repetition + minimal extra nerfs

This package uses calendar pacing as the primary control.

### B1. Frequency

**Max 1 same-career shift/day.**

Hard Work becomes Day 50 and naturally spans a full four-season cycle.

The rule applies per career, not globally:
- one Lumber + one Satyr Maid + one Undead Farm shift can still consume baseline 3 Energy on the same day if all are available.

### B2. Negative pressure

Use the same **floor-aware N2/research-alt shape**.

At max1 it realizes roughly 82–86% of attempted negative pressure before Hard Work.

### B3. Positive work gains

**No broad positive work-stat nerf in the first implementation slice.**

Reason:
- max1 + research alt + no School already causes 4/10 careers not to cap their strongest stat by Day160;
- the remaining six reach 100 much later than current repetition.

A global gain reduction here risks over-correcting diversified/non-School play.

### B4. Pacing content

Use the 1 / ~8 / ~20 / 35 / 50 coverage skeleton:
- preserve existing useful 3/15 beats;
- add missing late 35 coverage;
- prioritize Lumber 8/20/35;
- route-rich careers use fallback beats rather than route advancement.

At max1, those beats map naturally onto Days 1/8/20/35/50.

### B5. School

Treat School as the residual balance question.

Max1 + research alt + targeted School still gives:
- base D100 median Day 96;
- focus median Day 85;
- all 10 careers reach 100 by Day160.

If Product's cap target permits deliberate School specialization to cap in Years 2–3, no extra nerf is needed.

If Product wants normal 100-cap to be mainly Year 4, make the **smallest targeted School adjustment after the frequency/N2 rerun**, rather than nerfing all work and School simultaneously.

### Benefits
- simplest calendar story;
- full seasonal breadth before Hard Work;
- work-only cap pressure substantially reduced;
- no broad positive-stat nerf required initially;
- authored career beats get meaningful calendar spacing.

### Costs
- single-career rush takes 50 nights;
- lodging/economy exposure increases;
- targeted School remains powerful;
- same-career grinder loses the ability to spend all Energy on one profession.

### Main implementation surfaces
- generic same-career/day limit in schema/engine/UI;
- negative-target definitions;
- milestone packs;
- no work positive-value changes in first slice.

## 9. Direct A vs B tradeoff

| Question | Package A: fast | Package B: slow |
|---|---|---|
| Same-career limit | 2/day | 1/day |
| Hard Work minimum | 25 days | 50 days |
| Full season cycle before HW | No | Yes |
| Negative map | Floor-aware N2 shape | Floor-aware N2 shape |
| Extra work-stat control | First shift/day gives seasonal stats; second does not | None initially |
| Late authored beat | Required | Required |
| School follow-up | Rerun after repetition-stat control | Main residual accelerator |
| Implementation complexity | Higher | Lower |
| Preserves same-career grind speed | More | Less |
| Calendar/content breathing room | Less | More |
| Risk of over-nerf | Moderate if compensator too strong | Lower for work-only play |

Neither package is Product authority.

Package A answers: “keep careers fast, but separate career-count/wage repetition from repeated stat farming.”

Package B answers: “make one career advance on a daily cadence, restore intended negative pressure, and leave positive work values alone unless the post-change School rerun proves another reduction is needed.”

## 10. Decision points for Leader/Product

The comparison narrows the unresolved choices to:

1. Is a normal Hard Work career intended to be roughly:
   - **25-day fast**; or
   - **50-day calendar-scale**?

2. Should a second same-career shift, if allowed:
   - repeat the full seasonal stat package; or
   - count/pay without duplicating seasonal stat progression?

3. Is the N2 floor-aware negative-target direction acceptable as a basis for a real Product mapping pass?

4. Is targeted School reaching strongest-stat 100 around:
   - Day 74–123 under max1 + N2
   acceptable as deliberate specialization,
   or should cap 100 normally be pushed toward Year 4?

5. Should every ordinary career receive guaranteed late pre-Hard-Work coverage around shift 35, with Lumber additionally receiving 8/20?

## 11. Bottom line

The matrix does not support treating frequency and negative mapping as interchangeable fixes.

- **Frequency** controls how quickly career progression is compressed into calendar days.
- **Negative targeting** controls whether seasonal tradeoffs survive floor-at-zero.
- **School** remains an independent specialization accelerator.
- **Authored late coverage** is needed under every frequency policy because the current direct 31–49 band is empty.

The two smallest coherent successor packages are therefore:
- **A: max2 + floor-aware negatives + no duplicate seasonal stat package on the second daily same-career shift + late authored beat**;
- **B: max1 + floor-aware negatives + late authored beat + no broad positive-stat nerf until School is rerun**.

Disposition: **READY_FOR_LEADER_PRODUCT_DECISION**.
