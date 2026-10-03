# Chat 3 — Floor-Aware Seasonal Negative Target Map v5

Status: **PRODUCT DECISION PACKET / RESEARCH ONLY / NO PRODUCTION EDITS**  
Owner: Chat 3  
D26 authority base: `main@0c8926049a4b4ee4fda0574cea588d39f39dd14e`  
Accepted predecessor: `chat3/progression-policy-comparison-v4@135efa45c291642fabc52bd49cbafc7111418cd3`  
Frozen harness authority: `chat3/progression-balance-harness-v3@e631af2e17675c27309aa1b8bd5a6161a1090ce8`  
Branch: `chat3/progression-floor-aware-negative-map-v5`

## 0. Locked boundaries

D26 is treated as Product authority:

- each ordinary profession may be worked at most once per calendar day;
- this is not a global work-action cap;
- Hard Work remains exactly 50 completed shifts;
- no broad positive work-stat nerf is authorized by D26.

This packet changes **nothing** in production.

The remaining decision is only which progression stat receives the already-shipped `-1` in each of the already-selected 20 negative profession/season cells.

The proposal preserves:

- exactly two negative seasons out of four per ordinary profession;
- exactly one `modifyStat -1` in each selected negative season;
- exactly 20 negative effects total;
- no Lust negatives;
- no same-season positive/negative cancellation on the same stat;
- every positive seasonal effect unchanged;
- wages, costs, unlocks, Hard Work=50 and D26 cadence unchanged.

No original-game number is used as a target.

---

# 1. Proposal rule

The exact map below follows a simple successor-first rule:

1. **Floor-aware first.** Prefer a target that the same profession grows positively in another season, so repeated `-1` effects keep having something to remove instead of permanently clipping at zero.
2. **Preserve same-season identity.** A target may not also receive a positive effect in that same season.
3. **Wage-aware tie-break.** When two target pairs produce the same realized negative pressure, prefer the pair with the smaller wage-weight burden.
4. **Starter protection.** For Lumber, Satyr Maid and Undead Farm, do not target the harness-selected strongest work-grown stat.
5. **Do not weaken D26 or Hard Work.** This is a target-map decision only.

This makes the map intentionally different from “pick the highest-value stat and punish it.” The target must be mechanically live, but not needlessly punitive when an equally live lower-impact target exists.

---

# 2. Exact proposed 20-cell map

| Profession | Negative season | Current shipped target | Proposed target | Same-career positive replenishment |
|---|---|---|---|---|
| Lumber | Spring | Grooming | **Dexterity** | Autumn +1 |
| Lumber | Winter | Sociability | **Strength** | Spring/Summer/Autumn +1 |
| Satyr Maid | Summer | Grooming | **Sociability** | Spring/Winter +1 |
| Satyr Maid | Autumn | Endurance | **Endurance** *(unchanged)* | Summer +1 |
| Undead Farm | Spring | Grooming | **Reason** | Autumn/Winter +1 |
| Undead Farm | Autumn | Sociability | **Strength** | Summer +1 |
| Tavern | Spring | Grooming | **Reason** | Autumn +1 |
| Tavern | Summer | Endurance | **Wits** | Spring/Autumn/Winter +1 |
| Hunter | Spring | Grooming | **Endurance** | Summer/Autumn/Winter +1 |
| Hunter | Winter | Sociability | **Dexterity** | Spring/Summer/Autumn +1 |
| Guard | Summer | Grooming | **Manners** | Spring/Autumn +1 |
| Guard | Winter | Sociability | **Reason** | Autumn +1 |
| Merchant | Summer | Endurance | **Wits** | Spring/Autumn/Winter +1 |
| Merchant | Winter | Strength | **Manners** | Summer +1 |
| Artist/Geisha | Summer | Endurance | **Manners** | Spring/Autumn +1 |
| Artist/Geisha | Autumn | Reason | **Dexterity** | Summer +1 |
| Assassin | Spring | Grooming | **Reason** | Autumn/Winter +1 |
| Assassin | Winter | Sociability | **Manners** | Summer +1 |
| Prostitute | Summer | Grooming | **Sexuality** | Spring/Autumn +1 |
| Prostitute | Winter | Creativity | **Endurance** | Summer +1 |

Every proposed target is a progression stat that the same career grows in another season.

No proposed target is also positive in its own negative season.

---

# 3. Why this is not just the earlier v2 research map

The v2 research map established that “same-career replenished” targets can recover the intended sink. v5 refines that candidate against the exact D26 base and current wage weights.

Where two alternatives give the same realized pressure, v5 selects the lower wage-cost version.

Notable refinements:

- Undead Farm: **Spring Reason / Autumn Strength** instead of Spring Strength / Autumn Magic;
- Tavern: **Spring Reason** instead of Manners;
- Guard: **Winter Reason** instead of Strength;
- Merchant: **Winter Manners** instead of Charm;
- Artist/Geisha: **Autumn Dexterity** instead of Charm;
- Assassin: **Winter Manners** instead of Wits;
- Prostitute: **Winter Endurance** instead of Manners.

These changes keep the pressure result but avoid unnecessarily targeting a larger wage coefficient.

---

# 4. Harness method

Results use the frozen v3 harness rules against the live definitions on the D26 authority base.

Common inputs:

- shift policy: **max 1 same-career shift/day**;
- analysis length: 160 days;
- cap: 100;
- target career normalized as available from Day 1 for cross-career comparison;
- base start: all progression stats = 1;
- focused start: base + all 10 creation allocation points into the harness-selected strongest work-grown stat;
- no-School scenario;
- targeted-School scenario: one paid best-overlap lesson every 10 days;
- work wage is calculated from the live wage definition after that shift's seasonal stat effects;
- money below is **gross work income**, not lodging-adjusted net income.

Strongest work-grown stat selected by the harness:

| Profession | Strongest stat |
|---|---|
| Lumber | Endurance |
| Satyr Maid | Charm |
| Undead Farm | Endurance |
| Tavern | Wits |
| Hunter | Endurance *(tie-break over Dexterity; both grow +3 per 4-season cycle)* |
| Guard | Endurance |
| Merchant | Wits |
| Artist/Geisha | Charm |
| Assassin | Dexterity |
| Prostitute | Charm |

---

# 5. Aggregate result — current shipped map vs proposal

## 5.1 By Hard Work=50

Under D26, every row reaches Hard Work on **Day 50**.

“Realized negative” counts how many attempted `-1` effects actually remove a stat point after the floor-at-zero clamp.

| Map | Start | School | Realized / attempted negatives by shift 50 | Realized share | Gross money @50 — median [min-max] |
|---|---|---|---:|---:|---:|
| Current shipped | Base | None | 29 / 250 | **11.6%** | 1445.5 [1191-1547] |
| Current shipped | Base | 1 / 10d | 29 / 250 | **11.6%** | 1570 [1301-1785] |
| Current shipped | Focused | None | 29 / 250 | **11.6%** | 1608.5 [1368-1697] |
| Current shipped | Focused | 1 / 10d | 29 / 250 | **11.6%** | 1731.5 [1477-1908] |
| **Proposed** | Base | None | **205 / 250** | **82.0%** | 1341.5 [1191-1470] |
| **Proposed** | Base | 1 / 10d | **207 / 250** | **82.8%** | 1453 [1301-1710] |
| **Proposed** | Focused | None | **214 / 250** | **85.6%** | 1488 [1368-1641] |
| **Proposed** | Focused | 1 / 10d | **215 / 250** | **86.0%** | 1604.5 [1477-1847] |

The current map loses almost nine out of ten intended negative points to the floor before Hard Work.

The proposal makes roughly five out of six attempted negative points mechanically real by Hard Work.

## 5.2 160-day negative pressure

| Map | Start | School | Realized / attempted negatives over 160 days | Realized share |
|---|---|---|---:|---:|
| Current shipped | Base | None | 89 / 800 | **11.1%** |
| Current shipped | Base | 1 / 10d | 89 / 800 | **11.1%** |
| Current shipped | Focused | None | 89 / 800 | **11.1%** |
| Current shipped | Focused | 1 / 10d | 89 / 800 | **11.1%** |
| **Proposed** | Base | None | **755 / 800** | **94.4%** |
| **Proposed** | Base | 1 / 10d | **757 / 800** | **94.6%** |
| **Proposed** | Focused | None | **764 / 800** | **95.5%** |
| **Proposed** | Focused | 1 / 10d | **765 / 800** | **95.6%** |

The long-run result is the core floor-aware success criterion: the proposal turns the seasonal negatives into persistent pressure rather than one-time fresh-life floor taps.

---

# 6. Realized negative pressure by profession

## 6.1 No School

Values are realized / attempted negatives.

| Profession | Current @50 | Proposal @50 Base | Proposal @50 Focused | Proposal @160 Base | Proposal @160 Focused |
|---|---:|---:|---:|---:|---:|
| Lumber | 2 / 30 | **21 / 30** | **21 / 30** | **71 / 80** | **71 / 80** |
| Satyr Maid | 11 / 20 | **20 / 20** | **20 / 20** | **80 / 80** | **80 / 80** |
| Undead Farm | 2 / 30 | **21 / 30** | **21 / 30** | **71 / 80** | **71 / 80** |
| Tavern | 2 / 30 | **21 / 30** | **21 / 30** | **71 / 80** | **71 / 80** |
| Hunter | 2 / 30 | **21 / 30** | **30 / 30** | **71 / 80** | **80 / 80** |
| Guard | 2 / 20 | **20 / 20** | **20 / 20** | **80 / 80** | **80 / 80** |
| Merchant | 2 / 20 | **20 / 20** | **20 / 20** | **80 / 80** | **80 / 80** |
| Artist/Geisha | 2 / 20 | **20 / 20** | **20 / 20** | **80 / 80** | **80 / 80** |
| Assassin | 2 / 30 | **21 / 30** | **21 / 30** | **71 / 80** | **71 / 80** |
| Prostitute | 2 / 20 | **20 / 20** | **20 / 20** | **80 / 80** | **80 / 80** |

Why some careers are 21/30 rather than 30/30 at base start:

- one negative season is Spring;
- the target begins at 1;
- the first Spring can only remove one point before flooring;
- later seasons replenish it;
- the following Spring becomes meaningful.

That is acceptable floor behavior: it is a first-cycle startup effect, not a permanent dead sink.

Hunter focused start is the exception because focused allocation goes into Endurance, which is the proposed Spring negative target, so its first Spring has enough stock to realize the full loss.

## 6.2 School interaction

Targeted School changes negative realization only where the selected course replenishes a proposed negative target.

By shift 50:

- Lumber Base: 21 -> **22**;
- Hunter Base: 21 -> **22**;
- Hunter Focused remains **30/30**;
- other careers are unchanged from the no-School pressure table.

School therefore does not make the proposal's floor behavior unstable; it only gives a few negative targets one extra point to consume.

---

# 7. Strongest-stat cap timing

## 7.1 No School

“—” means the strongest work-grown stat does not reach 100 by Day 160.

| Profession | Current Base | Proposal Base | Current Focused | Proposal Focused |
|---|---:|---:|---:|---:|
| Lumber | 99 | **99** | 89 | **89** |
| Satyr Maid | 129 | **129** | 119 | **119** |
| Undead Farm | 129 | **129** | 109 | **109** |
| Tavern | 129 | **—** | 119 | **—** |
| Hunter | 139 | **—** | 119 | **—** |
| Guard | 129 | **129** | 119 | **119** |
| Merchant | 129 | **—** | 119 | **—** |
| Artist/Geisha | 129 | **129** | 119 | **119** |
| Assassin | 129 | **129** | 119 | **119** |
| Prostitute | 129 | **129** | 119 | **119** |

Aggregate cap reach:

- current: **10/10** careers;
- proposal: **7/10** careers.

The three work-only non-cappers are not accidental:

- Tavern Summer Wits -1 hits its strongest axis;
- Hunter Spring Endurance -1 hits one co-primary and Winter Dexterity -1 hits the other;
- Merchant Summer Wits -1 hits its strongest axis.

This is the largest Product consequence of a pressure-first floor-aware map.

## 7.2 Targeted paid School every 10 days

| Profession | Current Base | Proposal Base | Current Focused | Proposal Focused |
|---|---:|---:|---:|---:|
| Lumber | 79 | **79** | 74 | **74** |
| Satyr Maid | 100 | **100** | 85 | **85** |
| Undead Farm | 92 | **92** | 85 | **85** |
| Tavern | 100 | **123** | 85 | **116** |
| Hunter | 100 | **118** | 92 | **116** |
| Guard | 92 | **92** | 85 | **85** |
| Merchant | 100 | **123** | 85 | **116** |
| Artist/Geisha | 92 | **92** | 85 | **85** |
| Assassin | 92 | **92** | 85 | **85** |
| Prostitute | 92 | **92** | 85 | **85** |

With targeted School, all 10 careers still reach 100 by Day 160.

Aggregate proposal day-to-100:

- Base + School: earliest **79**, median **92**, latest **123**;
- Focused + School: earliest **74**, median **85**, latest **116**.

So the proposal does not make 100 unreachable. It makes work-only specialization less automatic in three careers, while School remains a meaningful accelerator.

---

# 8. Gross money by Hard Work=50

## 8.1 No School

| Profession | Current Base | Proposal Base | Delta | Current Focused | Proposal Focused | Delta |
|---|---:|---:|---:|---:|---:|---:|
| Lumber | 1545 | **1470** | -75 | 1670 | **1590** | -80 |
| Satyr Maid | 1191 | **1191** | 0 | 1368 | **1368** | 0 |
| Undead Farm | 1407 | **1390** | -17 | 1557 | **1540** | -17 |
| Tavern | 1427 | **1321** | -106 | 1577 | **1471** | -106 |
| Hunter | 1547 | **1463** | -84 | 1697 | **1491** | -206 |
| Guard | 1401 | **1291** | -110 | 1551 | **1441** | -110 |
| Merchant | 1464 | **1312** | -152 | 1640 | **1485** | -155 |
| Artist/Geisha | 1425 | **1279** | -146 | 1575 | **1428** | -147 |
| Assassin | 1501 | **1466** | -35 | 1675 | **1641** | -34 |
| Prostitute | 1513 | **1362** | -151 | 1663 | **1512** | -151 |

The map is not economy-neutral because several live wages read stats that now receive meaningful losses.

That is expected from a real tradeoff, but the size must be visible to Product.

## 8.2 Targeted School

| Profession | Current Base | Proposal Base | Current Focused | Proposal Focused |
|---|---:|---:|---:|---:|
| Lumber | 1785 | **1710** | 1908 | **1828** |
| Satyr Maid | 1301 | **1301** | 1477 | **1477** |
| Undead Farm | 1506 | **1479** | 1656 | **1629** |
| Tavern | 1525 | **1419** | 1675 | **1569** |
| Hunter | 1719 | **1618** | 1869 | **1660** |
| Guard | 1558 | **1448** | 1708 | **1598** |
| Merchant | 1582 | **1427** | 1758 | **1601** |
| Artist/Geisha | 1519 | **1373** | 1669 | **1524** |
| Assassin | 1707 | **1672** | 1880 | **1847** |
| Prostitute | 1605 | **1458** | 1755 | **1608** |

Money is gross shift income only. D26 stretches Hard Work to 50 calendar days, so lodging/economy exposure is a separate system-level cost and is not silently netted into this table.

---

# 9. Profession-by-profession rationale

## Lumber — Spring Dexterity / Winter Strength

Live growth:
- Strength: Spring/Summer/Autumn;
- Endurance: Spring/Summer/Winter, with Winter +2;
- Dexterity: Autumn.

Wage:
- Strength ×0.5;
- Endurance ×0.25.

Why:
- Spring Dexterity is non-wage and is rebuilt in Autumn;
- Winter Strength has substantial stock from three prior seasons, so it stays live;
- using Dexterity for both negatives would re-floor it and lose pressure.

Starter risk:
- strongest stat is Endurance and remains untouched;
- work-only cap timing stays 99 / 89;
- money impact is visible but bounded: -75 Base / -80 Focused by shift 50.

This is the strongest starter wage hit and should be a focused regression watch.

## Satyr Maid — Summer Sociability / Autumn Endurance

Live growth:
- Sociability: Spring/Winter;
- Endurance: Summer.

Wage:
- Charm ×0.35;
- Sexuality ×0.25.

Why:
- both proposed negatives are replenished;
- neither is wage-relevant;
- strongest Charm is untouched;
- existing Autumn Endurance already demonstrates the desired gain-then-loss shape.

Starter risk:
- no gross wage loss at shift 50 in the harness;
- strongest-stat cap timing is unchanged;
- full 20/20 negative pressure is realized.

This is the cleanest floor-aware pattern.

## Undead Farm — Spring Reason / Autumn Strength

Live growth:
- Reason: Autumn/Winter;
- Strength: Summer;
- Endurance/Magic also grow strongly.

Wage:
- Endurance ×0.3;
- Magic ×0.3;
- Reason ×0.2.

Why:
- Spring Reason is rebuilt later and uses the smaller wage coefficient;
- Autumn Strength consumes Summer's stock and is not wage-relevant;
- strongest Endurance is untouched;
- this is safer than targeting Autumn Magic while producing the same 21/30 base pressure.

Starter risk:
- cap timing unchanged;
- gross money loss only -17 without School.

## Tavern — Spring Reason / Summer Wits

Live growth:
- Wits: Spring/Autumn/Winter;
- Reason: Autumn;
- Charm/Manners also grow.

Wage:
- Charm ×0.3;
- Wits ×0.3;
- Manners ×0.2.

Why:
- Spring Reason is lower-impact than Spring Manners for the same pressure pattern;
- Summer Wits can consume stock created in Spring and remains live all run;
- no same-season cancellation exists.

Risk:
- Wits is the harness-selected strongest stat;
- work-only Wits no longer reaches 100 by Day 160;
- School restores cap at Day 123 Base / 116 Focused.

This is a deliberate high-pressure cell, not a starter-profession risk.

## Hunter — Spring Endurance / Winter Dexterity

Live growth:
- Endurance: Summer/Autumn/Winter;
- Dexterity: Spring/Summer/Autumn;
- Wits: Spring/Winter.

Wage:
- Dexterity ×0.35;
- Endurance ×0.3;
- Wits ×0.2.

Why:
- in Spring, Endurance is the only work-grown target that avoids same-season cancellation;
- in Winter, Dexterity is the only work-grown target that avoids same-season cancellation;
- therefore a genuinely floor-aware Hunter map necessarily hits its two co-primary growth axes.

Risk:
- this is the proposal's highest balance-risk profession;
- focused start realizes the full 30/30 negatives before Hard Work;
- focused gross money drops 1697 -> 1491 without School;
- work-only strongest stat does not cap by Day 160;
- targeted School restores cap at Day 118 Base / 116 Focused.

If Product considers that too punitive, Hunter is the first profession to revisit. Any softer target necessarily accepts more floor clipping or abandons the same-career-replenished rule.

## Guard — Summer Manners / Winter Reason

Live growth:
- Manners: Spring/Autumn;
- Reason: Autumn.

Wage:
- Endurance ×0.3;
- Manners ×0.25;
- Strength ×0.2;
- Reason ×0.15.

Why:
- both targets have stock before their loss season;
- Winter Reason is lower wage-impact than Winter Strength for the same full pressure;
- strongest Endurance is untouched.

Result:
- 20/20 pressure by Hard Work;
- strongest cap timing unchanged;
- gross wage reduction is caused by making two wage-readable secondary stats actually lose points.

## Merchant — Summer Wits / Winter Manners

Live growth:
- Wits: Spring/Autumn/Winter;
- Manners: Summer;
- Charm/Reason also grow.

Wage:
- Wits ×0.35;
- Charm ×0.25;
- Manners ×0.2;
- Reason ×0.15.

Why:
- Summer Wits consumes Spring stock;
- Winter Manners consumes Summer stock;
- Manners is a lower-impact Winter target than Charm for identical pressure.

Risk:
- Wits is the strongest stat;
- work-only cap disappears by Day 160;
- targeted School restores it at Day 123 / 116.

This is the second major primary-axis watch after Hunter.

## Artist/Geisha — Summer Manners / Autumn Dexterity

Live growth:
- Manners: Spring/Autumn;
- Dexterity: Summer;
- Charm: Spring/Summer/Winter;
- Sexuality: Autumn.

Wage:
- Manners ×0.3;
- Charm ×0.3;
- Dexterity ×0.15;
- Sexuality ×0.15.

Why:
- Summer Manners consumes Spring stock;
- Autumn Dexterity consumes Summer stock;
- Dexterity is much less wage-expensive than Autumn Charm for the same 20/20 pressure;
- strongest Charm is untouched.

Result:
- cap timing unchanged;
- negative pressure becomes fully live;
- money falls because both targets are wage-readable, but the strongest Charm axis is preserved.

## Assassin — Spring Reason / Winter Manners

Live growth:
- Reason: Autumn/Winter;
- Manners: Summer;
- Dexterity: Spring/Summer/Winter;
- Wits: Spring/Autumn.

Wage:
- Dexterity ×0.35;
- Wits ×0.3;
- Reason ×0.2;
- Manners ×0.1.

Why:
- Spring Reason is rebuilt later;
- Winter Manners consumes Summer stock;
- Manners is much less wage-expensive than Winter Wits for the same pressure;
- strongest Dexterity remains untouched.

Result:
- 21/30 pressure by Hard Work;
- cap timing unchanged;
- only a small wage reduction.

## Prostitute — Summer Sexuality / Winter Endurance

Live growth:
- Sexuality: Spring/Autumn;
- Endurance: Summer;
- Charm: Spring/Summer/Winter;
- Manners: Autumn/Winter.

Wage:
- Sexuality ×0.35;
- Charm ×0.3;
- Manners ×0.2;
- Endurance ×0.15.

Why:
- Summer Sexuality consumes Spring stock;
- Winter Endurance consumes Summer stock;
- Endurance is a lower-wage Winter target than Manners;
- strongest Charm remains untouched.

Result:
- full 20/20 pressure;
- cap timing unchanged;
- a meaningful wage tradeoff remains because Sexuality is wage-relevant.

---

# 10. Dominance and over-punishment audit

## Starter professions

### Lumber

Watch, but not a cap-path over-punish:
- strongest Endurance is untouched;
- cap timing is unchanged;
- the Winter Strength target reduces gross money by about 5% by Hard Work.

### Satyr Maid

No over-punish signal:
- strongest Charm untouched;
- wage inputs Charm/Sexuality untouched;
- gross money unchanged;
- full negative pressure still exists through Sociability/Endurance.

### Undead Farm

No over-punish signal:
- strongest Endurance untouched;
- only Reason among proposed negatives is wage-readable, at ×0.2;
- gross money changes by about 1%;
- cap timing unchanged.

**Conclusion for the three starters:** no proposal cell creates a strongest-stat trap, and no starter loses access to a Day-160 work-only cap that existed under the current map.

## Later-career watch cells

Three careers intentionally receive strongest/co-primary pressure:

- Tavern Summer Wits;
- Hunter Spring Endurance + Winter Dexterity;
- Merchant Summer Wits.

These are not hidden side effects; they are the main cost of maximizing real negative pressure.

They create differentiated work-only cap behavior:
- 7/10 careers cap work-only;
- Tavern/Hunter/Merchant do not;
- targeted School restores 10/10 cap reach.

No proposal produces an obvious dominant career build:
- every career has much more realized negative pressure than the shipped map;
- Satyr Maid has the lightest wage impact, but also remains the lowest-money career in the base/no-School money table;
- the proposal removes, rather than creates, the exploit where leaving orthogonal negative stats at 1 makes most future losses free.

Product should explicitly decide whether the Tavern/Hunter/Merchant primary-axis behavior is desirable. The exact proposal is still coherent if accepted; it is not presented as already-authoritative tuning.

---

# 11. Minimal producer regression contract

If Leader/Product approves this exact map, the smallest later implementation should be a content-only target replacement.

## 11.1 Exact static invariants

Focused tests must prove:

1. ordinary roster remains exactly the same 10 careers;
2. each ordinary career still has exactly four seasonal packages;
3. each career still has exactly two negative seasons;
4. total ordinary negative effects remain exactly **20**;
5. every negative remains exactly `modifyStat -1`;
6. no negative targets Lust;
7. negative seasons themselves are unchanged;
8. all positive seasonal effects are byte/structure-equivalent to pre-change values;
9. wages and shift costs are unchanged;
10. unlock/availability conditions are unchanged;
11. Hard Work stays exactly 50 completed shifts;
12. D26 one-same-career-shift/day semantics are unchanged;
13. no proposed target is also positive in the same season;
14. all 20 target cells exactly match the §2 table;
15. every proposed target is positively replenished by that same career in at least one *other* season.

## 11.2 No schema/runtime expansion

Implementation should not add:
- a stat-debt meter;
- deferred penalties;
- fallback-negative engine semantics;
- a new global balance system;
- per-career imperative runtime code.

Only the negative `stat` fields in the existing seasonal definition cells should need to change, plus exact snapshot/invariant expectations that assert those fields.

## 11.3 Harness regression snapshot

Run the frozen progression harness under D26 after implementation.

Minimum expected research checks:

- Day to Hard Work remains **50** for all ten careers;
- aggregate realized negative pressure by shift 50 remains in the proposal envelope:
  - Base/no School: **205/250**;
  - Focused/no School: **214/250**;
  - Base/School-10d: **207/250**;
  - Focused/School-10d: **215/250**;
- starter strongest-stat cap timing stays:
  - Lumber 99/89 no School, 79/74 with School;
  - Satyr Maid 129/119 no School, 100/85 with School;
  - Undead Farm 129/109 no School, 92/85 with School;
- no production test should encode an alternate research map as authority before Product approval.

The balance snapshot is a regression check for an approved producer, not a reason to change unrelated mechanics until the map itself is approved.

---

# 12. Product decision requested

Approve, modify, or reject the exact §2 20-cell target map.

If approved, the implementation lane is intentionally small:
- 20 target-field replacements;
- preservation/snapshot updates;
- focused seasonal/D26/harness checks;
- no other tuning bundled into the same producer.

No production changes were made by this packet.

Disposition: **READY_FOR_LEADER_PRODUCT_DECISION**.
