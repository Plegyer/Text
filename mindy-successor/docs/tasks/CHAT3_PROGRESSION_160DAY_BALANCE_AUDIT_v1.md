# Chat 3 — 160-Day Progression / Career-Milestone Balance Audit v1

Status: **BALANCE AUDIT / PROPOSALS ONLY / NO PRODUCTION CHANGES**  
Owner: Chat 3  
Authority main: `aff3a6de866ea40f8d2d6761d148888b22b73278`  
Approved seasonal-tradeoff producer candidate used for calculations: `d94a6a236a87267221a386406189a93a13615f47`  
Branch: `chat3/progression-160day-balance-audit-v1`

## 0. Scope and authority

This audit uses current successor mechanics as authority.

Read directly from the successor:
- 160-day run = 4 years × 40 days = 4 seasons × 10 days/year;
- 12 progression stats start at 1, plus 10 allocation points;
- normal progression-stat cap at the audited main is 100;
- baseline daily Energy is 3;
- ordinary career shifts cost 1 Energy;
- paid School lessons cost 1 Energy;
- School daytime lessons remain repeatable when tuition/Energy are available;
- Hard Work remains `completed_shifts >= 50` for all ten ordinary careers;
- the approved seasonal tradeoff implementation uses exactly two `-1` progression-stat seasons per career and no Lust negatives.

`ORIGINAL_GAME_DESIGN_PATTERNS_v1.md` is used only as reference for the question “does a career have meaningful authored beats before 50?”, not as numeric authority.

The seasonal-tradeoff candidate is not treated as though it were already merged into this exact main; its frozen approved SHA is used explicitly because the current Chat 2 pointer is assembling that candidate.

No runtime/content tuning is changed by this audit. No full CI is run.

## 1. Key findings

1. **Nominal work growth is +1.5 summed progression-stat points per shift for every ordinary career.** With even seasonal exposure, 50 shifts = +75 raw net points and one shift/day for all 160 days = +240 raw net points.
2. **The nominal -1 tradeoffs are much weaker in real low-stat builds than the raw table implies.** Most negative targets start at 1 and are not replenished by that career, so they hit the floor at 0 after one effective loss. Repeated later negatives become no-ops.
3. In a concrete 50-day one-shift/day cap-oriented build, raw +70/+80 frequently becomes **+98 actually realized total stat growth** after floor clamping. The intended sink is almost completely lost.
4. Work alone can cap a career's strongest stat inside the 160-day run. With all 10 creation points put into that stat, one shift/day reaches 100 around **day 89–119** depending on career; even from stat 1, the strongest career stat reaches 100 around **day 99–129**.
5. School makes specialization substantially faster. One targeted paid lesson every 10 days, combined with one shift/day, reaches 100 around **day 85** from an allocated start of 11 and around **day 92–100** from a start of 1, before considering stronger School spam.
6. Current action economy permits up to three 1-Energy shifts in one day. Therefore Hard Work=50 has a mechanical lower bound of only **17 calendar days**. This can make Hard Work eligible before four-season career breadth and before much authored route content.
7. Authored content inventory is rich for most late careers, but guaranteed shift-milestone cadence is not. **No ordinary career has a direct pre-Hard-Work completed-shift checkpoint in the 31–49 band.**
8. Lumber is the clearest content-density outlier: only 5 owned authored events in the inspected production packs and only the first-shift direct milestone. Artist/Assassin/Prostitute have many route events but only one direct completed-shift checkpoint; their guaranteed pacing depends heavily on seasonal/route reachability.

## 2. Approved 2-of-4 work growth over 50 shifts

### Method

The “balanced 50” column is a normalized expectation: 50 shifts × the four-season average, equivalent to 12.5 shifts of each season. Fractional .5 values are therefore expected values, not a claim that one run can perform half a shift.

Every approved package has two positive progression-stat points per shift and one `-1` effect in exactly two seasons. Therefore:

- positive raw contribution over balanced 50 = +100;
- intended negative raw contribution = -25;
- intended net = **+75**.

### Normalized 50-shift stat table

| Career | Positive raw contributions over balanced 50 | Negative raw contributions over balanced 50 | Net |
|---|---|---|---:|
| Lumber | Strength +37.5; Endurance +50; Dexterity +12.5 | Grooming -12.5; Sociability -12.5 | +75 |
| Satyr Maid | Charm +37.5; Sociability +25; Sexuality +12.5; Endurance +12.5; Manners +12.5 | Grooming -12.5; Endurance -12.5 | +75 |
| Undead Farm | Endurance +37.5; Magic +25; Strength +12.5; Reason +25 | Grooming -12.5; Sociability -12.5 | +75 |
| Tavern | Charm +25; Wits +37.5; Manners +25; Reason +12.5 | Grooming -12.5; Endurance -12.5 | +75 |
| Hunter | Dexterity +37.5; Wits +25; Endurance +37.5 | Grooming -12.5; Sociability -12.5 | +75 |
| Guard | Endurance +37.5; Manners +25; Strength +12.5; Reason +12.5; Dexterity +12.5 | Grooming -12.5; Sociability -12.5 | +75 |
| Merchant | Wits +37.5; Charm +25; Manners +12.5; Reason +25 | Endurance -12.5; Strength -12.5 | +75 |
| Artist/Geisha | Manners +25; Charm +37.5; Dexterity +12.5; Sexuality +12.5; Reason +12.5 | Endurance -12.5; Reason -12.5 | +75 |
| Assassin | Dexterity +37.5; Wits +25; Manners +12.5; Reason +25 | Grooming -12.5; Sociability -12.5 | +75 |
| Prostitute | Sexuality +25; Charm +37.5; Endurance +12.5; Manners +25 | Grooming -12.5; Creativity -12.5 | +75 |

The important balance fact is not that all careers have equal total growth; that equality is deliberate. The risk is how easily the negative side stops functioning at the stat floor.

## 3. Floor-clipping makes the approved negatives much softer than -25/50 shifts

Progression stats clamp at 0. A rational fresh build commonly leaves the career's negative axes at their base value 1 while allocating creation points into positive/unlock axes.

For many careers the negative stat is not positively replenished by the same career:
- Lumber: Grooming / Sociability;
- Undead Farm: Grooming / Sociability;
- Hunter: Grooming / Sociability;
- Guard: Grooming / Sociability;
- Assassin: Grooming / Sociability;
- Merchant: Endurance / Strength;
- Prostitute: Grooming / Creativity.

In those cases the first `-1` can matter, then later seasonal negatives usually hit an already-zero stat and contribute no further sink.

### Concrete 50-day scenario

Scenario:
- fresh life;
- all 10 creation points placed into the career's strongest long-run positive stat;
- one shift per day;
- start on Day 1 / spring;
- no School;
- current 0..100 clamping;
- first 50 calendar days = spring/summer/autumn/winter + next spring.

| Career | Raw net from packages | Realized summed stat growth after floor clamp |
|---|---:|---:|
| Lumber | +70 | +98 |
| Satyr Maid | +80 | +89 |
| Undead Farm | +70 | +98 |
| Tavern | +70 | +98 |
| Hunter | +70 | +98 |
| Guard | +80 | +98 |
| Merchant | +80 | +98 |
| Artist/Geisha | +80 | +98 |
| Assassin | +70 | +98 |
| Prostitute | +80 | +98 |

Satyr Maid retains more real tradeoff because Endurance is first grown in summer and can then actually be lost in autumn. Most other mappings lose almost all intended negative pressure.

### Fast-Hard-Work stress case

With baseline Energy 3 and shift cost 1, 50 shifts can be completed in 17 days. Starting at a year boundary, that means approximately:
- 30 spring shifts;
- 20 summer shifts;
- no autumn/winter exposure before Hard Work.

Raw net for that 50-shift rush is:

| Career | Raw net, 30 Spring + 20 Summer |
|---|---:|
| Lumber | +70 |
| Satyr Maid | +80 |
| Undead Farm | +70 |
| Tavern | +50 |
| Hunter | +70 |
| Guard | +80 |
| Merchant | +80 |
| Artist/Geisha | +80 |
| Assassin | +70 |
| Prostitute | +80 |

After floor clamping in the same cap-oriented fresh build, realized summed growth is **+98 or +99 for every career**. Even Tavern's nominal +50 becomes +98 because its Grooming/Endurance losses rapidly bottom out.

**Risk:** the approved mapping satisfies the formal “two negative seasons” contract but often does not create a durable mechanical tradeoff.

## 4. 160-day work-only growth and cap timing

### Exact one-shift/day envelope

One shift every day for all 160 days gives exactly 40 shifts in each season. For every career:
- positive raw progression = +320;
- intended negatives = -80;
- raw net = **+240**.

That is only an envelope for late careers because their year fallback may delay availability, but it is a useful same-rules comparison and is reachable for a stat-early-unlocked or NG+ early-access career.

### Strongest-stat cap timing

The table below applies one shift/day with no School and no other stat source. “Start 11” means all 10 creation allocation points were placed into the listed stat; “Start 1” means none were.

| Career | Strongest work-grown stat | Raw gain over 160 shifts | Reaches 100 from 1 | Reaches 100 from 11 |
|---|---|---:|---:|---:|
| Lumber | Endurance | +160 | Day 99 | Day 89 |
| Satyr Maid | Charm | +120 | Day 129 | Day 119 |
| Undead Farm | Endurance | +120 | Day 129 | Day 109 |
| Tavern | Wits | +120 | Day 129 | Day 119 |
| Hunter | Dexterity | +120 | Day 129 | Day 109 |
| Guard | Endurance | +120 | Day 129 | Day 119 |
| Merchant | Wits | +120 | Day 129 | Day 119 |
| Artist/Geisha | Charm | +120 | Day 129 | Day 119 |
| Assassin | Dexterity | +120 | Day 129 | Day 119 |
| Prostitute | Charm | +120 | Day 129 | Day 119 |

So every ordinary career has at least one work-grown progression stat that reaches 100 before the 160-day deadline under a simple one-shift/day specialization.

At three shifts/day, an allocated strongest stat can reach 100 around **day 30–40** in the same work-only stress test. This is not a theoretical Energy exploit; it follows directly from baseline Energy 3 and 1-Energy shifts.

## 5. Representative diversified 160-day growth

A deliberately diversified reference life was used to distinguish “overall progression is too high” from “specialization is too concentrated.”

Reference schedule:
- Year 1: Undead Farm, one shift/day;
- Year 2: Tavern, one shift/day;
- Year 3: Assassin, one shift/day;
- Year 4: Artist/Geisha, one shift/day;
- 16 paid School lessons, rotating all 8 current courses twice (one full course rotation twice);
- no claim that this tuition schedule is optimal or always affordable under every lodging choice.

Work contributes +240 raw net progression points. Two complete School rotations add +132 progression-stat points and +4 Lust from two Body Confidence lessons. Combined raw progression gain = **+372**.

| Stat | Work | 16 rotating School lessons | Combined raw delta |
|---|---:|---:|---:|
| Strength | +10 | +6 | +16 |
| Endurance | +10 | +10 | +20 |
| Dexterity | +40 | +14 | +54 |
| Reason | +50 | +16 | +66 |
| Magic | +20 | +8 | +28 |
| Creativity | 0 | +14 | +14 |
| Wits | +50 | +14 | +64 |
| Charm | +50 | +16 | +66 |
| Sociability | -20 | +10 | -10 |
| Manners | +50 | +6 | +56 |
| Grooming | -30 | +12 | -18 |
| Sexuality | +10 | +6 | +16 |

Even if all 10 creation points are allocated into Reason or Charm, this diversified raw schedule does not itself reach 100 on a positive axis.

**Conclusion:** the broad 160-day total is not by itself the problem. The cap problem appears when the player repeatedly concentrates work and School into the same few axes.

## 6. School acceleration

Current paid daytime courses:

| Course | Tuition | Progression gain per lesson |
|---|---:|---:|
| Literacy & Numbers | 300 | Reason +4, Wits +2 = +6 |
| Arcana | 500 | Magic +4, Reason +4, Creativity +2 = +10 |
| Rhetoric & Social | 300 | Charm +3, Sociability +3, Wits +2 = +8 |
| Etiquette & Presentation | 400 | Manners +3, Grooming +3, Charm +2 = +8 |
| Field Craft | 400 | Dexterity +3, Wits +3, Creativity +2 = +8 |
| Physical Training | 400 | Strength +3, Endurance +3, Dexterity +2 = +8 |
| Arts & Performance | 500 | Creativity +3, Charm +3, Sociability +2, Dexterity +2 = +10 |
| Body Confidence | 400 | Sexuality +3, Grooming +3, Endurance +2 = +8, plus Lust +2 |

A daytime lesson therefore gives **6–10 progression points for 1 Energy**, compared with an intended work net of 1–2 per shift.

School-only arithmetic before money constraints:
- a +4 course axis reaches 100 from stat 1 in 25 lessons, or from 11 in 23 lessons;
- a +3 course axis reaches 100 from stat 1 in 33 lessons, or from 11 in 30 lessons.

### Combined one-shift/day + targeted lesson every 10 days

Stress schedule:
- one ordinary shift each day;
- one paid lesson targeting the career's strongest work stat every 10 days;
- lesson fits inside the baseline 3-Energy day;
- no other stat-growth source.

Cap timing:

| Career | Target | From stat 1 | From stat 11 |
|---|---|---:|---:|
| Lumber | Strength/Physical Training | Day 92 | Day 85 |
| Satyr Maid | Charm/Rhetoric | Day 100 | Day 85 |
| Undead Farm | Endurance/Physical Training | Day 92 | Day 85 |
| Tavern | Wits/Field Craft | Day 100 | Day 85 |
| Hunter | Dexterity/Field Craft | Day 92 | Day 85 |
| Guard | Endurance/Physical Training | Day 92 | Day 85 |
| Merchant | Wits/Field Craft | Day 100 | Day 85 |
| Artist/Geisha | Charm/Rhetoric | Day 92 | Day 85 |
| Assassin | Dexterity/Field Craft | Day 92 | Day 85 |
| Prostitute | Charm/Rhetoric | Day 92 | Day 85 |

Thus only 8 targeted lessons are needed by Day 85 in an allocated specialization, because work supplies the rest.

A street/no-lodging schedule can make this cadence mechanically feasible despite the School tuition: street reduces next-day Energy to 2, but one shift + the scheduled lesson still fits on lesson days, while work income and the starting 600 money can fund the tested cadence. Street also destroys Grooming over time, so this is a specialized trade rather than a universally superior path.

**Balance reading:** School is doing its intended job as an accelerator, but because work is already fast and work negatives often floor out, School pushes a focused build to cap around the Year-2/Year-3 boundary rather than merely helping it approach high values late in the run.

## 7. Career milestone / authored-event density

### Structural inventory

Counts below are structural production-pack counts, not a promise that every event appears in one natural run. “Shift-reactive” means the event listens directly to that career's `actionCompleted: <career>.shift`.

| Career | Owned authored events inspected | Shift-reactive events | Direct completed-shift checkpoints before 50 |
|---|---:|---:|---|
| Lumber | 5 | 0 | 1 |
| Satyr Maid | 18 | 4 | 1, 3, 8, 15 |
| Undead Farm | 21 | 8 | 1, 8, 20 |
| Tavern | 23 | 6 | 1, 8, 20 |
| Hunter | 25 | 15 | 1, 8, 20 |
| Guard | 26 | 19 | 1, 8, 20 |
| Merchant | 29 | 23 | 1, 3, 8, 20 |
| Artist/Geisha | 30 | 21 | 1; then four-season/route facts |
| Assassin | 41 | 25 | 1; then four-season/contract/route facts |
| Prostitute | 34 | 24 | 1; then four-season/client/route facts |

Additional meaningful non-`completed_shifts` structure exists:
- Hunter uses four seasonal contract counters and expedition results;
- Guard uses duty breadth and resolved city incidents;
- Merchant uses seasonal trade breadth, records, route inputs and crisis/relationship systems;
- Artist/Geisha uses four-season performance breadth;
- Assassin uses four-season breadth, contract lifecycle, items, Activity and handler route;
- Prostitute uses four-season/client/relationship route facts.

### Early / mid / late read

Audit bands:
- early: shifts 1–10;
- mid: shifts 11–30;
- late pre-Hard-Work: shifts 31–49.

Findings:
- **Lumber:** sparse early after shift 1; no guaranteed direct mid or late beat.
- **Satyr Maid:** strong early cadence (1/3/8) and a mid beat at 15; no guaranteed late beat.
- **Undead Farm / Tavern / Hunter / Guard:** early 1/8 and mid around 20; no guaranteed direct late beat.
- **Merchant:** strongest direct numeric cadence (1/3/8/20 plus other counter systems); no guaranteed direct 31–49 beat.
- **Artist/Geisha / Assassin / Prostitute:** structurally rich optional/authored systems, but numeric shift cadence is only shift 1. Their progression depends on seasonal breadth and route facts.
- **System-wide:** no profession has a direct completed-shift milestone in 31–49 before Hard Work=50.

This matters more because 50 shifts can currently be compressed into 17 calendar days. Four-season breadth cannot naturally exist in that window.

## 8. Risks

### R1 — negative-tradeoff floor saturation — HIGH

The 2-of-4 mapping is formally correct but often mechanically inactive after the first `-1`. Starting stats at 1 make “orthogonal negative stat” mappings especially weak.

Impact:
- actual work progression is closer to +2/shift than +1.5/shift for many fresh specialized builds;
- intended build-shaping pressure disappears;
- work reaches cap faster than the raw balance spreadsheet suggests.

### R2 — repeatable same-day work compresses Hard Work — HIGH

Baseline Energy 3 + 1-Energy work + no per-career daily shift ceiling means 50 shifts can be completed in 17 days.

Impact:
- Hard Work can precede four-season breadth;
- career ending eligibility can arrive before authored identity progression;
- seasonal mapping depends heavily on the season in which the grind occurs;
- wages/stat gains can be front-loaded.

### R3 — primary stat cap before run end — HIGH

One shift/day is enough to cap at least one relevant stat in every ordinary career by day 99–129 from a raw stat 1, or day 89–119 with focused creation allocation.

This means 100 is not a rare endgame ceiling under specialization.

### R4 — School + work pushes cap to ~Day 85 — MEDIUM/HIGH

School's large packages are intentional, but in combination with current work growth they move a focused stat to 100 around early Year 3 with only about eight well-targeted paid lessons from an allocated start.

### R5 — no guaranteed late career beat before shift 50 — MEDIUM

Even content-rich professions rely on optional route systems after the early/mid checkpoints. A player who simply works can encounter a long quiet interval before Hard Work.

### R6 — Lumber authored density — HIGH CONTENT RISK

Lumber is the largest outlier relative to the other nine ordinary careers and relative to the project goal that Hard Work should not be a silent counter grind.

## 9. Proposals for Leader/Product decision

These are proposals only; none are implemented here.

### P1 — decide whether ordinary career work should be limited to one shift per career per day

This is the highest-leverage pacing decision exposed by the audit.

If ordinary work is capped at one shift/day:
- Hard Work needs at least 50 calendar days;
- four-season breadth can naturally happen before Hard Work when starting near a year boundary;
- wages/stat gains cannot be compressed into 17 days;
- the remaining 2 daily Energy still supports School/Activity/Night-adjacent planning.

This would affect economy and career pacing globally, so it needs a dedicated Product decision and follow-up simulation rather than a silent implementation.

If repeatable same-day work is intentional, then Hard Work=50 and milestone density need to be balanced against a 17-day minimum, not a 50-day mental model.

### P2 — preserve “2 negative seasons of 4”, but make the negative mapping floor-aware

Preferred direction: negative targets should usually be stats that the same career also replenishes somewhere else, so a later `-1` remains meaningful instead of permanently bottoming out at zero.

Satyr Maid's Endurance pattern is the clearest existing example: gain in one season, loss in another.

Do not add a global penalty meter or hidden stat debt merely to force losses below zero. A mapping-level fix is smaller and preserves the locked stat model.

### P3 — define a cap-timing acceptance target

Recommended balance target for ordinary 100-cap lives:

> A normal specialized build using roughly one work shift/day plus occasional paid School should generally approach, but not hit, 100 before Year 4; hitting 100 in Year 2/early Year 3 should require an explicit cap-rush tradeoff.

Current audited specialized path hits 100 around day 85, so it fails that proposed target.

This target should be decided before changing individual School packages or work gains.

### P4 — do not nerf School in isolation yet

School is correctly differentiated as a money-for-growth accelerator. The audit shows that work growth/floor clipping is already enough to cap stats before run end.

First resolve:
1. same-day work repeatability;
2. floor-aware negative mapping;
3. then rerun School cap timing.

Only if cap timing remains too fast should School amounts/cadence be retuned.

### P5 — require one guaranteed late pre-Hard-Work authored beat per ordinary career

Target band: approximately shift 30–40, or a route-equivalent beat that is guaranteed to become reachable through ordinary work without optional cross-career dependencies.

This does not gate Hard Work and does not change 50.

Highest priority:
1. Lumber — needs both stronger mid-career and late-career authored progression;
2. Artist/Geisha, Assassin, Prostitute — need a guaranteed fallback beat if optional/four-season route content has not resolved;
3. Satyr Maid / Undead Farm / Tavern / Hunter / Guard / Merchant — add or guarantee one late beat after their current 15/20-ish milestone.

The exact number need not copy the original game's 30-shift pattern; the reference only demonstrates the value of a pre-ending authored beat.

### P6 — acceptance tests for the next tuning pass

After Leader chooses P1/P2/P3, rerun these focused balance checks:

- 50 shifts with all negative targets starting at 1: measure **realized**, not raw, stat delta;
- 50 shifts with negative targets starting at 20/50 to verify tradeoff behavior at non-floor builds;
- fastest legal Hard Work path in calendar days;
- one-shift/day cap timing from stat 1 and stat 11;
- one-shift/day + one targeted School lesson/10 days;
- diversified 160-day life with rotating careers/courses;
- no career has an authored quiet band longer than ~15–20 ordinary shifts before Hard Work unless route content is guaranteed to fill it.

## 10. Decision summary

### Numeric conclusions

- Approved nominal work rate: **+1.5 net progression points/shift**.
- Nominal balanced 50 shifts: **+75**.
- Realized low-negative-stat 50-day work growth: commonly **+98**, because the `-1` sinks floor out.
- One shift/day for 160 days: **+240 raw net** per career, with a strongest stat receiving +120 in nine careers and +160 Endurance in Lumber.
- Work-only strongest-stat cap: **Day 99–129 from stat 1**, **Day 89–119 from stat 11**.
- Work + targeted School every 10 days: **Day 92–100 from stat 1**, **Day 85 from stat 11**.
- Fastest current Hard Work=50 with Energy 3: **17 days**.
- Direct late (31–49) completed-shift milestones: **0/10 careers**.

### Leader decisions most needed

1. Is repeated ordinary work up to 3 shifts/day intentional, or should ordinary career work be once/day?
2. May the approved negative-stat **targets** be remapped while preserving exactly 2 negative seasons × one -1 each?
3. What cap-timing target should define “too easy” for a normal 100-cap life?
4. Should every ordinary career receive a guaranteed late authored beat before Hard Work=50?

Disposition: **READY_FOR_LEADER_BALANCE_DECISION**.
