# Chat 3 — Progression Remediation Decision Packet v2

Status: **PRODUCT DECISION PACKET / NO RUNTIME OR CONTENT CHANGES**  
Owner: Chat 3  
Authority main: `68d969c99f710dc5476c1dbea97a438ebeb8a02d`  
Prior numeric audit: `chat3/progression-160day-balance-audit-v1@465c9a2a21bad6188597ca19cbe8ca339ab5ef9d`  
Approved seasonal-tradeoff candidate used as the balance input: `d94a6a236a87267221a386406189a93a13615f47`  
Branch: `chat3/progression-remediation-decision-v2`

## 0. Decision scope

This packet addresses the four remediation questions requested by the current Chat 3 pointer:

1. same-career shift frequency per day;
2. floor-aware seasonal negatives;
3. ordinary-career authored pacing before Hard Work=50;
4. cap timing after a daily-shift policy change.

It does not modify production mechanics or authored content. It does not change Hard Work eligibility: every ordinary profession remains `completed_shifts >= 50`.

The current successor remains authoritative. Original-game material is not used for numeric tuning.

Locked constraints preserved:
- 160-day run;
- 12 progression stats + separate Lust;
- exactly 10 ordinary professions;
- exactly 3 starting ordinary professions: Lumber, Satyr Maid, Undead Farm;
- seasonal work packages, not a universal fixed work formula;
- current approved tradeoff direction: two negative seasons out of four, one `modifyStat -1` each, no Lust negative;
- Hard Work=50;
- ending eligibility remains non-terminal;
- School stays a voluntary paid accelerator;
- Secret Debt and Palace are separate domains.

## 1. Executive decision summary

### Recommended package

For Leader/Product approval, the lowest-risk combined remediation is:

**R1. Max 1 shift per same career per calendar day.**  
This does not cap total work actions per day. With baseline Energy 3, the player may still work three different careers in one day if they are available.

**R2. Retarget the existing two negative stat targets per career toward stats that the same career also replenishes.**  
Do not add a new meter, debt, hidden penalty, or conditional engine subsystem.

**R3. Use a common authored pacing skeleton of shift 1 / early around 8 / mid around 20 / late at 35 / Hard Work at 50.**  
Do not rewrite already-good existing 3/15 milestones just to normalize numbers. Add only missing coverage. For sparse careers, exact missing fallback positions are specified below.

**R4. Do not immediately apply a broad global stat-gain nerf in the same patch.**  
Max-1/day fixes calendar compression; retargeting restores much of the intended negative sink. After those two changes, rerun cap timing. The current numbers prove that max-1/day alone is not enough to make cap 100 late, but they do not justify blindly reducing every positive package before the floor problem is fixed.

If Product instead wants “100 should normally remain unreachable until Year 4 even for a focused work+School build,” then an additional stat-growth reduction will still be required after R1/R2. That target should be locked explicitly before tuning individual positive effects.

---

# 2. Same-career shift frequency per day

## 2.1 Important definition

The policy under discussion is **same-career** repetition, not a global “one job action per day” rule.

For example, under max 1/day:
- Lumber once today: allowed;
- Satyr Maid once today: allowed;
- Undead Farm once today: allowed;
- second Lumber shift on the same day: blocked.

Because all three starting ordinary professions are available from the start, baseline 3 Energy can still be spent on three ordinary work actions per day through diversification.

This distinction preserves much more of the economy than a global work cap would.

## 2.2 Hard Work calendar timing

Baseline daily Energy = 3. Ordinary shift cost = 1 Energy.

Current no-same-career-cap behavior is Energy-limited:
- baseline life: up to 3 same-career shifts/day;
- a later +1 daily Energy modifier can make 4 same-career shifts/day possible if no separate cap exists.

Minimum days to 50 same-career shifts:

| Policy | Baseline Energy 3 | With +1 daily Energy | Can Hard Work precede all four seasons? |
|---|---:|---:|---|
| No same-career cap | 17 days | 13 days | Yes, easily |
| Max 2 / same career / day | 25 days | 25 days | Yes |
| Max 1 / same career / day | 50 days | 50 days | No, if worked continuously: any 50-day span contains a full 40-day seasonal cycle |

Starting on Day 1, minimum seasonal exposure before Hard Work is approximately:

| Policy | Shift distribution before shift 50 |
|---|---|
| No cap, Energy 3 | 30 Spring + 20 Summer |
| No cap, Energy 4 | 40 Spring + 10 Summer |
| Max 2/day | 20 Spring + 20 Summer + 10 Autumn |
| Max 1/day | 10 Spring + 10 Summer + 10 Autumn + 10 Winter + 10 next Spring |

### Product consequence

Only max 1/day guarantees that a continuously worked career naturally crosses all four seasons before its 50th shift.

This aligns much better with careers whose identity/readiness depends on seasonal breadth without adding a new Hard Work gate.

## 2.3 Economy impact

### Lodging-time pressure for a single-career Hard Work rush

Current lodging prices:
- cheap = 50/day;
- normal = 100/day;
- street = 0 money, with its existing penalties.

If a player rushes exactly 50 shifts in one career:

| Policy | Days | Cheap lodging over that time | Normal lodging over that time |
|---|---:|---:|---:|
| No cap, Energy 4 | 13 | 650 | 1300 |
| No cap, Energy 3 | 17 | 850 | 1700 |
| Max 2/day | 25 | 1250 | 2500 |
| Max 1/day | 50 | 2500 | 5000 |

So a same-career cap materially increases calendar-based housing exposure before one profession reaches Hard Work.

However, this does **not** mean max 1/day reduces all possible daily work income to one wage.

### Early wage-throughput envelope

At all progression stats = 1, current ordinary wages are about:
- Lumber: 14/shift;
- the other ordinary careers: about 16/shift.

With all 10 creation points concentrated into the largest wage coefficient, early wages are roughly 19–20/shift.

Approximate maximum early ordinary-career gross if the player chooses to spend all available Energy on work:

| Policy | Same career possible | Total work actions still possible with enough distinct careers | Low-stat gross/day | Focused-start gross/day |
|---|---:|---:|---:|---:|
| No cap, Energy 3 | 3 | 3 | ~42–48 | ~57–60 |
| No cap, Energy 4 | 4 | 4 | ~56–64 | ~76–80 |
| Max 2/day, Energy 3 | 2 | 3 by using another career | ~42–48 total if diversified | ~57–60 total if diversified |
| Max 1/day, Energy 3 | 1 | 3 across Lumber/Satyr/Undead on Day 1 | ~42–48 total if diversified | ~57–60 total if diversified |

Therefore the main economic change from max 1/day is not “ordinary income divided by three.” It is:
- a single profession cannot be farmed three times in one day;
- the player must diversify careers, use School/Activity, or leave Energy unspent;
- one specific Hard Work path accrues more nights/rent before completion.

### Economy risk

Normal lodging at 100/day remains much larger than one early wage. Max 1/day therefore increases pressure on a player who insists on one career only.

Because three starting careers exist, a diversified worker can still use the whole baseline Energy budget on paid work. This makes max 1/day materially safer than a global one-work-action/day cap.

Exact economy remains balance-owned, so a frequency decision should be followed by a short housing/economy simulation before production merge.

---

## 2.4 Option A — keep current unlimited same-career repetition

### Benefits
- zero implementation work;
- zero save migration risk;
- preserves current maximum wage throughput and player freedom;
- no UI explanation needed.

### Costs
- Hard Work=50 remains compressible to 17 baseline days / 13 with +1 daily Energy;
- four-season identity can be skipped before Hard Work;
- same-career grinding dominates calendar pacing;
- authored 8/20/35-style milestones compress to roughly days 3/7/12 at Energy 3;
- strongest stats can cap extremely early in calendar time;
- later daily-Energy Meta makes the compression worse.

### Affected systems/files
None.

### Migration risk
None.

### Smallest safe path
Do nothing mechanically. If this option is chosen, career pacing and Hard Work must be authored/balanced against a 13–17 day rush, not against a 50-day career.

### Product assessment
Not recommended if seasons and authored career development are intended to matter before Hard Work.

---

## 2.5 Option B — max 2 shifts per same career per day

### Benefits
- simple rule;
- Hard Work minimum improves from 17 to 25 days;
- +1 daily Energy no longer shortens same-career Hard Work below 25 days;
- still allows two-shift specialization plus one School/other-career action under baseline Energy 3.

### Costs
- 25 days still reaches Hard Work before Winter in a Day-1 rush;
- four-season breadth can still lag behind Hard Work;
- primary stat caps remain early;
- career milestones remain calendar-compressed;
- still strongly rewards repeating the same profession twice every day.

### Affected systems/files
Smallest shared implementation:
- `src/core/schema.ts`: add/resettable current-day same-career shift usage with a default for old saves;
- `src/core/engine.ts`: block ordinary career action when its same-day count reaches 2; increment after a successful shift; reset at StartDay;
- `src/ui/app.ts`: explain/disable with a same-day limit reason;
- focused engine/save/UI tests.

No career content file needs to own the generic rule.

### Migration risk
Low-to-medium.

A pre-update save loaded in the middle of a day cannot perfectly reconstruct how many shifts of that career were already performed that day unless a new field already existed. Safest low-complexity migration is default count 0, creating at most a one-day grace window after update.

### Smallest safe path
Add one generic per-day action/career counter in DayState, default it to empty for migration, enforce only on the ten ordinary `*.shift` actions, and reset atomically on StartDay.

### Product assessment
Better than current behavior but does not solve the main season/pacing issue.

---

## 2.6 Option C — max 1 shift per same career per day

### Benefits
- Hard Work requires at least 50 calendar days;
- any uninterrupted 50-day career necessarily crosses a complete four-season cycle;
- +1 daily Energy cannot accelerate one career's Hard Work;
- makes 1/8/20/35/50 authored pacing meaningful in calendar time;
- preserves up to 3 ordinary work actions/day through the three starting careers;
- encourages breadth rather than same-action spam;
- leaves 2 Energy after one chosen career shift for School, Activity, or other professions.

### Costs
- single-career-only play has more housing nights before Hard Work;
- a player who refuses all other work may have lower daily income;
- cap 100 remains reachable before run end; this rule fixes timing compression, not all stat inflation;
- requires a new same-day usage field/check.

### Affected systems/files
Same generic files as max 2:
- `src/core/schema.ts`;
- `src/core/engine.ts`;
- `src/ui/app.ts`;
- focused engine/save/UI tests.

### Migration risk
Low-to-medium, identical in shape to max 2.

### Smallest safe path
Exactly the same implementation seam as max 2, with limit = 1.

Prefer a named shared constant/rule rather than ten duplicated action conditions.

### Product assessment
**Recommended.**

It is the only option that makes Hard Work=50 naturally span all seasons while preserving total daily work capacity through career diversification.

---

# 3. Floor-aware seasonal negatives

## 3.1 Proven problem

Current approved mapping has exactly two `-1` seasons per career, but many negative targets begin at 1 and are never positively replenished by that same career.

Once such a stat reaches 0, future `-1` effects do nothing.

In the previous 50-day one-shift/day stress case:
- nominal raw work net was +70 or +80 depending on the calendar slice;
- realized total stat growth was commonly **+98** after floor clamping.

The design therefore contains the negative effects syntactically without reliably preserving their intended mechanical sink.

---

## 3.2 Option N1 — keep current negative mapping

### Benefits
- no content churn;
- already assembled/tested direction;
- no risk of changing career identities;
- no new engine semantics.

### Costs
- floor saturation remains;
- many careers behave close to +2 actual stat points/shift in fresh specialized builds;
- negative seasons often become presentation-only after one loss;
- cap timing remains faster than raw spreadsheet estimates.

### Affected systems/files
None beyond the already-approved seasonal candidate.

### Migration risk
None.

### Smallest safe path
No change.

### Product assessment
Not recommended if the negative tradeoff is intended to remain mechanically meaningful.

---

## 3.3 Option N2 — retarget negatives to same-career replenished stats

This option keeps:
- the same two negative seasons for each career;
- exactly one `modifyStat -1` in each negative season;
- all positive effects unchanged;
- no Lust negative;
- no new runtime effect kind.

Only the **negative stat target** changes.

### Exact candidate mapping

| Career | Negative season 1 | Proposed target | Why it can recover | Negative season 2 | Proposed target | Why it can recover |
|---|---|---|---|---|---|---|
| Lumber | Spring | Dexterity -1 | Autumn grows Dexterity | Winter | Strength -1 | Spring/Summer/Autumn grow Strength |
| Satyr Maid | Summer | Sociability -1 | Spring/Winter grow Sociability | Autumn | Endurance -1 | Summer grows Endurance |
| Undead Farm | Spring | Strength -1 | Summer grows Strength | Autumn | Magic -1 | Spring/Winter grow Magic |
| Tavern | Spring | Manners -1 | Summer/Winter grow Manners | Summer | Wits -1 | Spring/Autumn/Winter grow Wits |
| Hunter | Spring | Endurance -1 | Summer/Autumn/Winter grow Endurance | Winter | Dexterity -1 | Spring/Summer/Autumn grow Dexterity |
| Guard | Summer | Manners -1 | Spring/Autumn grow Manners | Winter | Strength -1 | Summer grows Strength |
| Merchant | Summer | Wits -1 | Spring/Autumn/Winter grow Wits | Winter | Charm -1 | Spring/Summer grow Charm |
| Artist/Geisha | Summer | Manners -1 | Spring/Autumn grow Manners | Autumn | Charm -1 | Spring/Summer/Winter grow Charm |
| Assassin | Spring | Reason -1 | Autumn/Winter grow Reason; early stat-unlock builds already value it | Winter | Wits -1 | Spring/Autumn grow Wits |
| Prostitute | Summer | Sexuality -1 | Spring/Autumn grow Sexuality | Winter | Manners -1 | Autumn grows Manners |

This is a balance proposal, not production authority.

### Quantified effect in the same 50-day stress case

Scenario:
- stat base 1;
- all 10 creation points placed into the strongest work-grown stat;
- one shift/day for 50 days;
- current 0..100 clamp;
- same positive packages;
- only negative targets retargeted as above.

| Career | Current mapping realized growth | Retarget candidate realized growth |
|---|---:|---:|
| Lumber | +98 | +79 |
| Satyr Maid | +89 | +80 |
| Undead Farm | +98 | +79 |
| Tavern | +98 | +79 |
| Hunter | +98 | +79 |
| Guard | +98 | +80 |
| Merchant | +98 | +80 |
| Artist/Geisha | +98 | +80 |
| Assassin | +98 | +79 |
| Prostitute | +98 | +80 |

This does not produce the exact raw -25 sink in every first cycle, because a Spring negative can still meet a fresh low stat before that career has replenished it. It does, however, restore most of the intended sink without new engine state.

### Benefits
- content-only change;
- keeps the locked two-of-four / one -1 structure;
- no new meter or hidden debt;
- dramatically reduces floor waste in the measured case;
- easy to explain and test;
- future yearly cycles keep negatives live because the career itself rebuilds their targets.

### Costs
- some first-Spring losses can still floor out, especially starting careers;
- some careers lose stats that contribute directly to their identity/wage build;
- exact thematic targets require Product approval;
- retargeting does not guarantee that the single strongest positive stat stops capping early.

### Affected systems/files
Primary production surface:
- `content/definitions.json` seasonal arrays for the ten ordinary shift actions.

Tests:
- seasonal tradeoff invariant test;
- any frozen authored/runtime snapshot that asserts exact seasonal arrays.

No save/schema change required.

### Migration risk
Low.

Current stat values remain valid. Only future shifts use different losses.

### Smallest safe implementation path
Change only the 20 negative `stat` fields, preserve every positive effect and array order otherwise, update exact preservation snapshots, run focused seasonal/static tests.

### Product assessment
**Recommended floor remediation.**

---

## 3.4 Option N3 — conditional fallback loss when the primary negative is already 0

Rule shape:

> Apply the authored negative target if it is above 0; otherwise apply -1 to a predefined same-career fallback stat that the career replenishes.

No persistent penalty meter is stored.

Example:
- Lumber Spring primary Grooming;
- if Grooming is already 0, fallback to Dexterity or Strength.

### Benefits
- preserves existing thematic primary negatives;
- guarantees a real loss more often;
- can keep current 20 target identities visible in content;
- no persistent stat debt.

### Costs
- requires new conditional-effect semantics;
- UI/journal explanation becomes harder;
- one shift's effect depends on current stat floor;
- every career needs primary + fallback authored mapping;
- wider runtime/schema/test surface than simple retargeting.

### Affected systems/files
At minimum:
- `src/core/schema.ts`: new effect shape or generic conditional effect support;
- `src/core/engine.ts`: deterministic fallback application;
- `content/definitions.json`: fallback declarations;
- UI/journal delta presentation tests;
- seasonal invariant tests.

### Migration risk
Low for save data if no persistent state is added, but medium implementation/regression risk because a new core effect semantic is introduced.

### Smallest safe implementation path
If this option is chosen, use one narrowly-scoped generic effect such as “negative stat with fallback”; do not create per-career imperative code.

### Product assessment
Not preferred. N2 recovers most of the lost sink with much less machinery.

---

# 4. Career pacing before Hard Work=50

## 4.1 Common pacing skeleton

Recommended ordinary-career authored coverage:

- **Shift 1 — entry identity:** “this is now a real job/career state”;
- **around Shift 8 — early competence:** the player is no longer brand-new;
- **around Shift 20 — mid-career responsibility:** a meaningful professional problem/choice;
- **Shift 35 — late pre-ending reflection/escalation:** confirms the career has developed before Hard Work;
- **Shift 50 — Hard Work eligibility only:** remains the existing non-terminal ending eligibility.

The implementation should not rewrite a good existing milestone simply because it is at 15 instead of 20.

Coverage rule:
- existing 3/15/route milestones may remain;
- add only missing early/mid/late coverage;
- route-rich careers may use a fallback milestone that appears only if a stronger route-owned beat has not already satisfied that pacing slot.

The critical new common point is **35**. There is currently no direct 31–49 completed-shift checkpoint in any of the ten ordinary careers.

## 4.2 Why 35

Under recommended max 1/day:
- shift 8 ≈ day 8 of that career;
- shift 20 ≈ day 20;
- shift 35 ≈ day 35;
- shift 50 ≈ day 50.

That creates gaps of roughly 7 / 12 / 15 / 15 career-work days.

At shift 35 the player has invested 70% of Hard Work but still has 15 shifts left, so the beat is meaningfully pre-ending rather than an ending notification.

---

## 4.3 Exact proposed coverage by career

| Career | Existing guaranteed numeric coverage | Proposed additions | Resulting guaranteed skeleton |
|---|---|---|---|
| Lumber | 1 | **8, 20, 35** | 1 / 8 / 20 / 35 / 50 |
| Satyr Maid | 1, 3, 8, 15 | **35** | 1 / 3 / 8 / 15 / 35 / 50 |
| Undead Farm | 1, 8, 20 | **35** | 1 / 8 / 20 / 35 / 50 |
| Tavern | 1, 8, 20 | **35** | 1 / 8 / 20 / 35 / 50 |
| Hunter | 1, 8, 20 | **35** | 1 / 8 / 20 / 35 / 50 |
| Guard | 1, 8, 20 | **35** | 1 / 8 / 20 / 35 / 50 |
| Merchant | 1, 3, 8, 20 + other counters | **35** | 1 / 3 / 8 / 20 / 35 / 50 |
| Artist/Geisha | 1 + seasonal/route facts | **8, 20, 35 fallback beats** | numeric safety net around route content |
| Assassin | 1 + seasonal/contract/relationship route | **8, 20, 35 fallback beats** | numeric safety net around route content |
| Prostitute | 1 + seasonal/client/relationship route | **8, 20, 35 fallback beats** | numeric safety net around route content |

### Lumber exact authored proposal

Lumber needs the largest remediation because it has the sparsest owned authored density.

Proposed product roles:

**Shift 8 — Crew Rhythm / Ритм бригады**
- first meaningful professional-recognition beat;
- concrete choice about ordinary work method/safety/pace;
- career-local fact only;
- no ending gate.

**Shift 20 — Trusted Hand / Надёжная работница**
- mid-career responsibility;
- authored choice with a persistent Lumber-local consequence;
- can seed later presentation/relationship text;
- no Hard Work requirement change.

**Shift 35 — Seasoned Hand / Опытная работница**
- late reflection/escalation;
- acknowledges sustained career identity;
- may expose a non-terminal optional career scene;
- does not grant or block Hard Work.

Names are proposal-level and may be localized differently; the exact **8 / 20 / 35 positions** are the balance proposal.

### Artist/Assassin/Prostitute fallback rule

These careers already have substantial authored route machinery. The problem is guaranteed cadence, not lack of total authored files.

Preferred implementation:
- add lightweight career-local pacing facts/events at 8/20/35;
- if a stronger authored route beat for that band already occurred, the fallback may resolve silently or use a shorter acknowledgment;
- never advance the main route/stage merely because the numeric fallback fired;
- never make the fallback a requirement for Hard Work.

This prevents a player who ignores optional route branches from experiencing a silent 49-shift counter grind.

---

## 4.4 Affected files and migration

Primary content files:
- Lumber: `content/packs/lumber-production.json`;
- Satyr Maid: `satyr-maid-career.json`;
- Undead Farm: `undead-farm-career.json`;
- Tavern: `tavern-career.json`;
- Hunter: `hunter-career.json`;
- Guard: `guard-career.json`;
- Merchant: `merchant-career.json`;
- Artist/Geisha: `artist-geisha-career.json`;
- Assassin: `assassin-career.json` plus only route facts needed for fallback suppression;
- Prostitute: `prostitute-career.json`.

Also:
- RU/EN localization/presentation for new authored scenes;
- focused natural acceptance tests per career;
- static “Hard Work still 50” firewall.

### Migration risk

Low-to-medium for active saves.

A save already above a newly added threshold may see the new one-shot milestone on its next relevant reaction. That is generally safe but can feel like a backfilled scene.

Smallest safe approach:
- one-shot `maxShows:1`;
- career-local fact marking the beat;
- no economy reward required;
- no new save schema;
- route-rich fallback events should avoid cascades of multiple overdue milestones in one reaction epoch.

---

# 5. Cap timing after daily-shift policy changes

## 5.1 Work-only strongest-stat cap

Exact calendar simulation uses the current positive seasonal packages and no School.

“Start 11” = all 10 creation points placed in the strongest work-grown stat.

| Career | Strongest work stat | Max 1/day from 1 | Max 1/day from 11 | Max 2/day from 1 | Max 2/day from 11 | Current 3/day from 1 | Current 3/day from 11 |
|---|---|---:|---:|---:|---:|---:|---:|
| Lumber | Endurance | 99 | 89 | 50 | 45 | 37 | 35 |
| Satyr Maid | Charm | 129 | 119 | 70 | 65 | 43 | 40 |
| Undead Farm | Endurance | 129 | 109 | 60 | 55 | 43 | 30 |
| Tavern | Wits | 129 | 119 | 70 | 65 | 43 | 40 |
| Hunter | Dexterity | 129 | 109 | 60 | 55 | 43 | 30 |
| Guard | Endurance | 129 | 119 | 60 | 55 | 43 | 40 |
| Merchant | Wits | 129 | 119 | 70 | 65 | 43 | 40 |
| Artist/Geisha | Charm | 129 | 119 | 60 | 55 | 43 | 40 |
| Assassin | Dexterity | 129 | 119 | 60 | 55 | 43 | 40 |
| Prostitute | Charm | 129 | 119 | 60 | 55 | 43 | 40 |

### Reading

- No cap / 3 per day: cap can occur around days 30–43.
- Max 2/day: cap still occurs around days 45–70.
- Max 1/day: cap moves to roughly days 89–129.

Therefore:
- max 2/day is not enough if early cap is considered a balance problem;
- max 1/day substantially improves calendar pacing;
- max 1/day **still does not make cap 100 an endgame-only event**.

## 5.2 Max 1/day + targeted School

A paid lesson costs 1 Energy, so one shift + one lesson fits comfortably under baseline Energy 3.

Using one lesson every 10 days that grants +3 to the same strongest career stat:

| Career | Max 1/day + School from 1 | Max 1/day + School from 11 |
|---|---:|---:|
| Lumber | 79 | 74 |
| Satyr Maid | 100 | 85 |
| Undead Farm | 92 | 85 |
| Tavern | 100 | 85 |
| Hunter | 92 | 85 |
| Guard | 92 | 85 |
| Merchant | 100 | 85 |
| Artist/Geisha | 92 | 85 |
| Assassin | 92 | 85 |
| Prostitute | 92 | 85 |

This tightens the prior audit: targeting Lumber's actual strongest work-grown axis, Endurance, caps even earlier than the earlier Strength example.

So **max 1/day alone is not enough** if the intended Product target is “focused work + occasional School should not cap a stat before Year 4.”

## 5.3 Effect of the N2 retarget candidate

The exact N2 target mapping restores realized negative pressure and, for careers where the negative target intersects a high-growth axis, materially delays cap.

With max 1/day, work-only, N2 candidate:
- Tavern Wits does not reach 100 by Day 160 from either 1 or 11;
- Merchant Wits does not reach 100 by Day 160;
- Artist Charm does not reach 100 by Day 160;
- Hunter Dexterity reaches roughly Day 149 from 11 and does not reach 100 by Day 160 from 1;
- Lumber / Satyr / Undead / Guard / Assassin / Prostitute still cap their strongest axis around the existing Day 89–129 range because their proposed negatives act on other replenished stats.

With one targeted School lesson every 10 days under N2:
- the slower group generally moves into roughly Day 100–123;
- the unchanged-primary group remains roughly Day 74–100.

### Conclusion

N2 materially improves total realized growth but does not uniformly solve strongest-stat cap timing.

---

# 6. Is an additional stat-growth reduction needed?

The answer depends on the Product target.

## Target T1 — “100 may be reached during a highly focused normal life”

If this is acceptable:
- approve max 1/day;
- approve N2 floor-aware retarget;
- **do not** apply a broad positive-gain nerf yet;
- rerun targeted simulations and tune only clear outliers.

Under T1, reaching 100 around Year 3 through deliberate work+School specialization is acceptable.

## Target T2 — “100 should normally be a Year-4 / extreme-specialization result”

If this is the target:
- **yes, additional stat-growth reduction is still needed after max 1/day**;
- N2 alone is not enough for every career;
- focused work+School still caps several strongest axes around Day 74–100.

### Smallest safe reduction path after R1/R2

Do not divide all work gains globally.

Use this order:

1. max 1 same-career shift/day;
2. N2 floor-aware negative retarget;
3. rerun exact cap simulation;
4. reduce only concentrated outliers that still violate the chosen cap target.

First obvious outlier to inspect:
- Lumber Winter currently gives Endurance +2 in one shift, making Lumber the earliest work-only cap.

Then inspect the repeated +3 School overlap on the exact primary career axes before reducing all School courses.

This is safer than a universal “all work gives less” rule because diversified 160-day growth was not the primary problem.

## Target T3 — “100 should be effectively unavailable without special Meta”

This would require a larger redesign and conflicts with current ordinary progression assumptions more strongly. It should not be inferred from this remediation task.

---

# 7. Implementation-risk matrix

| Decision | Production surface | Save migration | Balance coupling | Smallest safe implementation |
|---|---|---|---|---|
| Keep no shift cap | none | none | high ongoing pacing risk | no change |
| Max 2/day | engine + DayState + UI + tests | low-medium | economy/pacing | generic same-day career counter limit=2 |
| Max 1/day | engine + DayState + UI + tests | low-medium | economy/pacing, but promotes breadth | generic same-day career counter limit=1 |
| Keep current negatives | none | none | high floor-saturation risk | no change |
| N2 retarget | definitions + exact seasonal tests | none | career stat identities | change only 20 negative stat targets |
| N3 fallback negative | schema + engine + definitions + tests | low data / medium code | broad effect semantics | one generic fallback effect |
| 1/8/20/35 pacing coverage | career packs + localization + tests | low-medium backfill | authored content workload | one-shot local events/facts |
| Broad stat nerf now | definitions/School + many tests | none | very high | not recommended before R1/R2 rerun |

---

# 8. Recommended implementation order after approval

This packet does not implement anything. If Leader approves the recommended package, the safest producer sequence is:

### Slice A — same-career daily cap
- generic max 1/day rule;
- DayState migration default;
- focused same-day/reset/save-reload tests;
- prove three different starting careers can still be worked on the same day;
- prove Hard Work remains exactly 50.

### Slice B — floor-aware retarget
- change only 20 negative stat targets;
- preserve negative seasons, positive effects, wages, counters/items/events;
- prove exactly 20 negatives, exactly 2 per career, no Lust negative;
- run realized-floor balance harness on base-1 targets.

### Slice C — authored pacing
- Lumber 8/20/35 first;
- add 35 to careers already strong at 1/8/~20;
- add 8/20/35 fallback coverage to Artist/Assassin/Prostitute without changing their route gates;
- localized presentation and natural acceptance tests.

### Slice D — cap recalibration
- rerun max1 + retarget + School simulations;
- only then decide whether positive work/School amounts need targeted reduction.

Do not combine all four slices into one production patch. Separating them makes any economy/stat regression attributable.

---

# 9. Leader/Product decisions requested

Please approve/adjust/reject:

1. **Same-career daily frequency**
   - A: current Energy-only repetition;
   - B: max 2/day;
   - C: **max 1/day — recommended**.

2. **Negative-floor remediation**
   - N1: keep current mapping;
   - N2: **retarget to same-career replenished stats using the exact table in §3.3 — recommended**;
   - N3: conditional fallback effect.

3. **Pacing skeleton**
   - preserve Hard Work=50;
   - use guaranteed career coverage around **1 / 8 / 20 / 35 / 50**;
   - do not normalize away useful existing 3/15 beats;
   - Lumber exact additions **8 / 20 / 35**;
   - add guaranteed late 35 coverage to all careers;
   - Artist/Assassin/Prostitute receive 8/20/35 fallback beats that do not advance their authored routes.

4. **Cap target**
   - T1: focused Year-3 cap is acceptable; no broad gain nerf after R1/R2 unless rerun finds an outlier;
   - T2: 100 should normally be Year 4/extreme; **additional targeted gain reduction will still be required**;
   - T3: reserve 100 for special Meta; requires a larger redesign.

Recommended Product combination:
**C + N2 + pacing skeleton + decide T1 vs T2 before any positive-gain reduction.**

Disposition: **READY_FOR_LEADER_PRODUCT_DECISION**.
