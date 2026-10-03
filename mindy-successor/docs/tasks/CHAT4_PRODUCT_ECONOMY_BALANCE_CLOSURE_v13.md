# Chat 4 — Product Economy / Start-Balance Closure v13

Status: **PRODUCT DECISION PACKET — NOT RUNTIME AUTHORITY UNTIL PRODUCT LOCK**  
Owner: Chat 4  
Branch: `chat4/product-economy-balance-closure-v13`  
Base: `main@9d3299627b9fa80460c49422568ce66f93dcdd10`

This packet closes the remaining 1.0 economy/start-balance blockers requested by the v13 task pointer.

It makes **no runtime implementation changes**.

---

# 1. Executive recommendation

Lock the following 1.0 values:

| Blocker | Exact recommendation |
| --- | --- |
| Starting Lust | **5** |
| Ordinary profession wage policy | **existing per-career stat weights unchanged; add +22 to every current ordinary wage base; cap final ordinary shift wage at 120** |
| Later-year lodging escalation | **none** |
| Normal / cheap / street lodging | **100 / 50 / 0 for all 160 days** |
| Paid School tuition | **keep current 300 / 500 / 300 / 400 / 400 / 400 / 500 / 400** |
| Paid School stat gains | **keep current packages unchanged** |
| Body Confidence Lust gain | **keep +2 Lust per paid lesson** |
| School Night Study | **unchanged: +2 supported stat, next-day Energy -1, normal or cheap lodging** |

Recommended ordinary wage formula:

```
ordinary_wage =
  min(
    120,
    round(
      current_career_base
      + 22
      + sum(wage_stat * existing_career_factor)
    )
  )
```

No existing career weight changes.

Therefore the proposed new bases are:

- Lumber: **35** instead of 13;
- all other nine ordinary professions: **37** instead of 15.

---

# 2. Current executable facts

These are current facts, not recommendations.

## 2.1 Life budget

Current executable baseline:

- calendar: **160 days**;
- base daily Energy: **3**;
- fresh money: **600**;
- all 12 progression stats begin at **1**;
- creation grants **10 manual stat-allocation points**;
- progression-stat cap: **100** in a normal run;
- current executable starting Lust: **1**.

D24 can raise only the progression-stat cap to 200 through a selected Specialist.  
It does not multiply current/start values and does not affect Lust.

## 2.2 Lodging

Locked D35 baseline:

| Tier | Price/night | 160-day money cost | Functional value |
| --- | ---: | ---: | --- |
| Normal | 100 | 16,000 | authored private-space capability |
| Cheap | 50 | 8,000 | no private-only access; School Night Study remains legal |
| Street | 0 | 0 | next-day Energy -1 and street consequences |

Normal lodging does not grant universal Energy, money or stat protection.

## 2.3 D26 work cadence

For the ten ordinary professions:

- at most **one shift of the same profession per calendar day**;
- different ordinary professions may still be worked on the same day when Energy and unlocks allow;
- Hard Work remains exactly 50 shifts;
- earliest same-career Hard Work remains Day 50.

D26 does not apply to Secret Debt hidden work or Palace duty cadence.

## 2.4 Current ordinary wages

Current formula:

```
round(base + sum(stat * factor))
```

Current bases are 13 for Lumber and 15 for the other nine professions.

Current all-stat-1 wages:

- Lumber: 14;
- every other ordinary profession: about 16.

With all ten creation points pushed into one strongest wage input, the early selected profession is still only about 19–20.

At all relevant wage stats =100, current wages range roughly 75–115.

This is the live drift that v13 must close.

---

# 3. Current wage formulas and proposed checkpoints

The proposal keeps every existing stat weight.

| Profession | Existing weighted inputs | Current all-1 | Proposed all-1 | Proposed all relevant stats=40 | Proposed all relevant stats=100 |
| --- | --- | ---: | ---: | ---: | ---: |
| Lumber | Strength .50 + Endurance .25 | 14 | **36** | **65** | **110** |
| Satyr Maid | Charm .35 + Sexuality .25 | 16 | **38** | **61** | **97** |
| Undead Farm | Endurance .30 + Magic .30 + Reason .20 | 16 | **38** | **69** | **117** |
| Tavern | Charm .30 + Wits .30 + Manners .20 | 16 | **38** | **69** | **117** |
| Hunter | Dexterity .35 + Endurance .30 + Wits .20 | 16 | **38** | **71** | **120 cap** |
| Guard | Endurance .30 + Manners .25 + Strength .20 + Reason .15 | 16 | **38** | **73** | **120 cap** |
| Merchant | Wits .35 + Charm .25 + Manners .20 + Reason .15 | 16 | **38** | **75** | **120 cap** |
| Artist/Geisha | Manners .30 + Charm .30 + Sexuality .15 + Dexterity .15 | 16 | **38** | **73** | **120 cap** |
| Assassin | Dexterity .35 + Wits .30 + Reason .20 + Manners .10 | 16 | **38** | **75** | **120 cap** |
| Prostitute | Sexuality .35 + Charm .30 + Manners .20 + Endurance .15 | 16 | **38** | **77** | **120 cap** |

Cross-career averages at equal relevant-stat checkpoints:

| Relevant wage stats | Current average | Proposed average | Proposed range |
| --- | ---: | ---: | ---: |
| 1 | 15.8 | **37.8** | 36–38 |
| 10 | 23.2 | **45.2** | 42–47 |
| 25 | 36.2 | **58.2** | 52–62 |
| 40 | 48.8 | **70.8** | 61–77 |
| 50 | 57.2 | **79.2** | 67–87 |
| 75 | 78.4 | **100.4** | 82–112 |
| 100 | 99.8 | **116.1** | 97–120 |
| 200 | 184.8 uncapped | **120** | 120 |

The 200-stat row is why the ordinary wage cap is required.

Without a cap, D24 cap-200 could turn a late Strong Meta build into a repeatable 200+ money ordinary-shift engine.

---

# 4. Why +22 and cap 120

## 4.1 Fresh-life daily pressure

The three Day-1 starter careers are Lumber, Satyr Maid and Undead Farm.

With wage-relevant stats left at 1:

```
Lumber       36
Satyr Maid   38
Undead Farm  38
----------------
three shifts 112
```

This creates the intended Energy/money tension:

| Fresh daytime choice | Gross money | Cheap 50 | Normal 100 |
| --- | ---: | ---: | ---: |
| One starter shift | 36–38 | still short | far short |
| Two different starter shifts | 74–76 | covered, small surplus | still short |
| Three starter shifts | about 112 | covered | covered, tiny surplus |

That is a useful 1.0 baseline.

A fresh player can:

- spend all 3 Energy on diversified work and barely sustain normal lodging;
- work two jobs and sustain cheap lodging while keeping one Energy for something else;
- use starting money as a short-term buffer for School/Activity/private-space choices;
- choose street for money relief but pay the explicit Energy/social cost.

The current 14–16 wages fail this test:

```
14 + 16 + 16 = 46
```

Even spending all three fresh Energy on diversified work does not cover cheap lodging.

## 4.2 Why not raise wages to 50 flat

A flat starter 50 would make:

- one fresh shift exactly pay cheap lodging;
- two shifts exactly pay normal lodging;
- the third Energy become almost entirely discretionary from Day 1.

That removes too much of the fresh-life pressure and weakens D35's 50-money private-space premium.

The proposed 36–38 is deliberately below that.

## 4.3 Why preserve existing weights

Existing weights already encode profession identity.

Changing both base and weights in the same Product closure would:

- reopen progression identity;
- interfere with D31 seasonal pressure evidence;
- make old wage progression comparisons unusable;
- create unnecessary per-career rebalancing.

The problem is primarily the current low base scale, not the identities of the wage stats.

## 4.4 Why cap at 120

120 is high enough that:

- cap-100 late ordinary careers remain materially better than early careers;
- several careers naturally reach the cap near their mature stat profile;
- School and career stat growth still improve earnings.

120 is low enough that:

- D24 cap-200 does not double the economy;
- ordinary work remains below the locked D44 hidden-work hard cap of 140;
- Palace remains a finite authored economy rather than being compared against uncapped 200-stat ordinary work;
- D30/D32 money Keystones remain bounded bonuses rather than multipliers on an already runaway wage scale.

---

# 5. Starting Lust

## 5.1 Recommendation

**Starting Lust = 5.**

Existing active saves must keep their stored Lust.

The value applies to newly created lives only after implementation.

## 5.2 Why 5

Current executable start is 1.

Starting at 5:

- is still a low value on a 0–100 axis;
- does not imply sexual consent, relationship state or romance;
- does not satisfy any D44 Takeover Lust requirement;
- gives Body Confidence a meaningful but not absurdly long progression path;
- exactly matches the accepted D44 low-build calibration point.

D44's accepted low hidden-work anchor is:

```
Endurance 10
Sexuality 10
Lust 5
=> hidden wage 45
```

Using Lust 5 as the 1.0 start therefore aligns the new-run baseline with an already accepted Secret Debt balance fixture.

## 5.3 Body Confidence pacing

Body Confidence remains:

- Sexuality +3;
- Grooming +3;
- Endurance +2;
- Lust +2;
- tuition 400;
- Energy 1.

From Lust 5:

| Paid Body Confidence lessons | Lust |
| ---: | ---: |
| 0 | 5 |
| 5 | 15 |
| 10 | 25 |
| 13 | 31 |

D44 Takeover needs Lust >=30.

Therefore a low-Lust build still needs **13 voluntary paid Body Confidence lessons** to cross that axis by this route alone.

No forced Night or hidden work contributes Lust.

---

# 6. School final tuning

## 6.1 Recommendation

**Do not change current paid School tuition or gain packages.**

Exact 1.0 paid School table:

| Course | Tuition | Energy | Direct progression gain | Lust |
| --- | ---: | ---: | --- | ---: |
| Literacy & Numbers | **300** | 1 | Reason +4, Wits +2 | 0 |
| Arcana | **500** | 1 | Magic +4, Reason +4, Creativity +2 | 0 |
| Rhetoric & Social | **300** | 1 | Charm +3, Sociability +3, Wits +2 | 0 |
| Etiquette & Presentation | **400** | 1 | Manners +3, Grooming +3, Charm +2 | 0 |
| Field Craft | **400** | 1 | Dexterity +3, Wits +3, Creativity +2 | 0 |
| Physical Training | **400** | 1 | Strength +3, Endurance +3, Dexterity +2 | 0 |
| Arts & Performance | **500** | 1 | Creativity +3, Charm +3, Sociability +2, Dexterity +2 | 0 |
| Body Confidence | **400** | 1 | Sexuality +3, Grooming +3, Endurance +2 | **+2** |

Night Study remains unchanged:

- no tuition;
- +2 to one supported track stat;
- next-day Energy -1;
- available from normal or cheap lodging under D35.

## 6.2 Why School should not be cut at the same time as wages rise

The proposed ordinary wage uplift already reduces School's effective work cost.

Changing tuition downward in the same Product decision would double-discount School.

It would also disturb D44 Takeover calibration, whose accepted simulations used the current 400-cost Body Confidence and Field Craft lessons.

Current School packages are strong:

- 6–10 direct progression points per paid lesson;
- selected courses cover multiple useful axes;
- Body Confidence additionally provides voluntary Lust.

The gains do not need an increase.

## 6.3 Shift-equivalent affordability under proposed wages

Using representative ordinary wage checkpoints:

| Tuition | Low wage ~38 | Mid wage ~71 | High wage ~116 |
| --- | ---: | ---: | ---: |
| 300 | 7.9 shifts | 4.2 shifts | 2.6 shifts |
| 400 | 10.5 shifts | 5.6 shifts | 3.4 shifts |
| 500 | 13.2 shifts | 7.0 shifts | 4.3 shifts |

This is expensive enough to remain a decision, but no longer absurd relative to work.

Starting money 600 also remains relevant:

- it can fund two basic 300 lessons;
- or one advanced 500 lesson plus a small reserve;
- but spending it immediately increases housing pressure.

---

# 7. Later-year lodging escalation

## 7.1 Recommendation

**No later-year lodging escalation.**

Exact schedule:

| Calendar days | Normal | Cheap | Street |
| --- | ---: | ---: | ---: |
| Day 1–40 | 100 | 50 | 0 |
| Day 41–80 | 100 | 50 | 0 |
| Day 81–120 | 100 | 50 | 0 |
| Day 121–160 | 100 | 50 | 0 |

## 7.2 Why no escalation

D35 already gives normal lodging a persistent non-numeric value:

- explicit private-space Night/relationship access.

That value does not increase by calendar year.

Escalating rent without increasing its authored capability would be an arbitrary late-game tax.

The 160-day fixed costs are already substantial:

- normal: **16,000**;
- cheap: **8,000**.

An additional rent escalation would also collide with:

- expensive School;
- Activity opportunity cost;
- 20,000 Secret Debt repayment;
- D26 work cadence;
- finite Palace pay.

The ordinary wage uplift solves the early executable drift without requiring a second compensating lodging system.

---

# 8. 160-day affordability checkpoints

These are static checkpoint models, not claims that a character's wage stays constant for all 160 days.

Actual work raises stats, so a normal life should move from the low band toward mid/high bands.

Assumptions:

- starting money = 600;
- 160 days;
- 3 Energy/day = 480 base daytime Energy;
- ten paid School lessons = representative **4000 money / 10 Energy**;
- twenty Large Activity entries = **40 Energy**;
- Activity is assigned no guaranteed money in this affordability table.

Representative wage bands use proposed cross-career averages:

- Low: 37.8;
- Mid: 70.8;
- High: 116.1.

## 8.1 Ten School lessons + 20 Activity entries

Money required after starting 600:

- normal: 16,000 lodging + 4,000 School - 600 = **19,400**;
- cheap: 8,000 lodging + 4,000 School - 600 = **11,400**.

| Profile | Normal work shifts | Normal total daytime Energy | Cheap work shifts | Cheap total daytime Energy |
| --- | ---: | ---: | ---: | ---: |
| Low checkpoint | 514 | 564 | 302 | 352 |
| Mid checkpoint | 275 | 325 | 162 | 212 |
| High checkpoint | 168 | 218 | 99 | 149 |

Interpretation:

- a character who somehow stayed at fresh low wages all life cannot combine normal lodging + this School/Activity package;
- the same low checkpoint is viable with cheap lodging;
- normal becomes viable once career progression raises wage into the mid band;
- high builds have substantial room for Activity and non-economic choices.

This is desirable pressure, not a soft-lock.

## 8.2 Twenty School lessons + 20 Activity entries

Representative School cost = 8000.

| Profile | Normal work shifts | Normal total Energy | Cheap work shifts | Cheap total Energy |
| --- | ---: | ---: | ---: | ---: |
| Low checkpoint | 620 | 680 | 408 | 468 |
| Mid checkpoint | 331 | 391 | 218 | 278 |
| High checkpoint | 202 | 262 | 133 | 193 |

A very School-heavy fresh low-wage life must use cheap/street housing, improve wages, reduce Activity, or consume starting/meta resources.

That is appropriate for a 160-day life-sim.

---

# 9. Multi-career play

The wage proposal intentionally works with D26 rather than against it.

Fresh Day-1 example:

- Lumber 36;
- Satyr Maid 38;
- Undead Farm 38.

The player can spend:

- 1 Energy: one shift, still cannot pay cheap;
- 2 Energy: two different shifts, cheap becomes sustainable;
- 3 Energy: three different shifts, normal becomes barely sustainable.

Thus D26 encourages multi-career diversification without allowing repeated same-career Hard Work acceleration.

As later professions unlock by stats/year, the player gains more legal daily work combinations but not more total base Energy.

No new daily work rule is required.

---

# 10. Secret Debt interaction

D44 remains fully locked.

Hidden work remains:

```
round(
  30 + min(
    110,
    0.70*Endurance
  + 0.60*Sexuality
  + 0.35*Lust
  )
)
```

with cap 140.

## 10.1 No repayment farming loophole

While bound:

- all ten ordinary professions are locked;
- therefore the proposed ordinary wage increase cannot be used to farm the 20,000 repayment;
- Secret Debt uses its own D44 wage;
- School and Activity remain available;
- forced Night and next-day Energy -1 remain unchanged.

The ordinary economy closure therefore does not shorten Paid Freedom directly.

## 10.2 Starting Lust effect

Changing new-run Lust 1 -> 5 changes the D44 hidden-work Lust input by only:

```
0.35 * 4 = 1.4
```

money before rounding at the same Endurance/Sexuality.

It does not materially destabilize the route.

More importantly, it aligns with the already accepted low D44 calibration fixture.

## 10.3 School preservation

Keeping School tuition/gains unchanged preserves D44 Takeover cost assumptions.

The packet does not make the required 10 paid lessons cheaper.

A weak build still needs more than ten lessons if it must independently build Wits and Lust.

---

# 11. Palace interaction

D43 remains fully locked.

Palace structural duty wage:

```
35 + min(
  20,
  floor((Reason + Wits + Manners + Sociability)/20)
)
```

Range:

- 35–55;
- max 15 duties;
- maximum total structural Palace wage = **825**.

The ordinary wage change does not alter Palace.

This is safe because Palace is not intended to be a repeatable money engine.

If Palace access already exists and Secret Debt later binds:

- Palace remains accessible;
- remaining total Palace structural pay is still finite;
- even the theoretical full 825 is only 4.125% of the 20,000 debt.

No Palace debt-farming loop is created.

---

# 12. Strong Meta economy interaction

D30/D32 caps remain unchanged.

## Earned Reserve Match

- 1:1 eligible ordinary wage match;
- max bonus **1000/run**.

With proposed wages, the cap is reached sooner, but total value is unchanged.

Approximate eligible shifts to exhaust the 1000 cap:

- wage 38: 27 shifts;
- wage 71: 15 shifts;
- wage 120: 9 shifts.

The reward remains exactly 1000:

- 10 normal nights;
- 20 cheap nights.

It cannot scale beyond that.

## Work Rhythm

- max 20 rewarded days;
- +1 usable Energy on a rewarded next day.

No money value changes.

It does not remove D26.

## Network Retainer

- 25/day;
- first 40 eligible days;
- max 1000;
- pauses while bound;
- lost payments are not banked.

No change.

## D24 cap-200

The proposed ordinary wage cap of 120 is specifically required to keep cap-200 from becoming an economy multiplier.

At relevant wage stats=200, every ordinary profession still pays at most 120.

---

# 13. Starting money

Recommendation:

**keep starting money = 600.**

The task did not ask to reopen it, and the wage correction makes 600 useful again as an actual buffer rather than a temporary patch over impossible wages.

600 represents:

- 6 normal nights;
- 12 cheap nights;
- 1–2 paid School lessons depending on course;
- meaningful optionality without solving the 160-day economy.

No starting-money increase is needed.

---

# 14. Major exploit / soft-lock review

| Risk | Result under recommendation |
| --- | --- |
| Fresh character cannot afford any housing | **No** — two starter shifts cover cheap; three cover normal |
| One fresh shift trivializes cheap lodging | **No** — 36–38 < 50 |
| Two fresh shifts trivialize normal lodging | **No** — 74–76 < 100 |
| Normal lodging loses strategic premium | **No** — still costs +50 and carries D35 private-space value |
| Later rent inflation creates late soft-lock | **Avoided** — no escalation |
| School becomes free after wage buff | **No** — 300–500 remains multiple shifts even at mid stats |
| School remains impossibly expensive | **No** — mid/high shift equivalents fall into 2.6–7 range |
| Body Confidence trivially opens D44 Lust 30 | **No** — Lust 5 still needs 13 paid lessons if built only there |
| Ordinary wages farm Secret Debt | **No** — ordinary careers locked while bound |
| Palace farms Secret Debt | **No** — structural Palace wage is finite, max 825 |
| Strong Meta money rewards explode with wage | **No** — D32 money rewards remain capped at 1000 |
| cap-200 makes ordinary wage infinite | **No** — ordinary wage cap 120 |
| D26 Hard Work timing changes | **No** |
| D31 seasonal stat pressure changes | **No** — weights/gains/negative map unchanged |
| D35 housing semantics change | **No** |
| School Night Study becomes housing-gated differently | **No** |

---

# 15. Implementation notes for later producer

This packet is research only.

A later implementation should use the smallest existing seams.

## 15.1 Starting Lust

Change new-life creation default:

```
lust: 1
```

to:

```
lust: 5
```

Migration rule:

- never rewrite Lust on an existing/in-progress save;
- the new value applies only when a new run is created.

## 15.2 Ordinary wages

Keep every current `wage.weights` array unchanged.

Increase ordinary bases only:

- Lumber 13 -> **35**;
- other nine 15 -> **37**.

Add one shared ordinary-wage final cap:

```
min(120, computedOrdinaryWage)
```

Do not copy the cap into ten bespoke career handlers.

The cap applies only to the ten ordinary profession shift wages.

It does not change:

- Secret Debt hidden wage;
- Palace wage;
- Activity rewards;
- School;
- item sale value;
- Strong Meta reward constants.

## 15.3 Lodging

No runtime change.

Keep:

- normal 100;
- cheap 50;
- street 0.

Do not add year multipliers.

## 15.4 School

No runtime/content change.

Keep all current:

- tuition;
- Energy cost;
- stat gains;
- Body Confidence Lust +2;
- Night Study values.

---

# 16. Acceptance targets for later implementation

A producer implementing this Product lock should prove at minimum:

1. new fresh life starts at Lust **5**;
2. migrated existing save preserves its stored Lust exactly;
3. fresh all-1 Lumber wage = **36**;
4. fresh all-1 Satyr Maid wage = **38**;
5. fresh all-1 Undead Farm wage = **38**;
6. three starter all-1 shifts gross **112**;
7. all ordinary shift wages are <= **120**;
8. cap-200 stat loadout still cannot exceed ordinary wage 120;
9. existing per-career wage stat weights are unchanged;
10. D26 same-career daily lock is unchanged;
11. normal lodging remains **100** on Day 1, 41, 81 and 121;
12. cheap remains **50** on the same checkpoints;
13. street remains **0**;
14. all eight paid School tuition values are unchanged;
15. all eight School direct stat packages are unchanged;
16. Body Confidence still grants exactly Lust +2;
17. School Night Study remains unchanged;
18. Secret Debt hidden wage anchors/cap are unchanged;
19. ordinary work remains unavailable while Secret Debt-bound;
20. Palace duty wage/cap/15-duty ceiling are unchanged;
21. D32 Earned Reserve Match max remains 1000;
22. D32 Network Retainer max remains 1000;
23. D32 Work Rhythm remains max 20 bonus days;
24. no new lodging escalation system exists.

---

# 17. Final Product lock table

| Parameter | Current executable | Exact 1.0 recommendation | Reason |
| --- | ---: | ---: | --- |
| Starting Lust | 1 | **5** | Low but meaningful; aligns accepted D44 low fixture; still requires deliberate voluntary Lust growth |
| Lumber wage base | 13 | **35** | Restores fresh economy without making one shift pay cheap lodging |
| Other ordinary wage base | 15 | **37** | Same |
| Ordinary wage weights | current per-career values | **unchanged** | Preserve profession identity and D31 evidence |
| Ordinary wage cap | none for cap-200 case | **120** | Prevent D24 late-meta money explosion |
| Normal lodging | 100 | **100 all 160 days** | D35 private-space value already justifies premium |
| Cheap lodging | 50 | **50 all 160 days** | Core affordability valve |
| Street lodging | 0 | **0 all 160 days** | Cost remains explicit Energy/social consequences |
| Later-year lodging escalation | none | **none** | Avoid arbitrary late tax / soft-lock |
| Literacy tuition/gain | 300 / +4 Reason +2 Wits | **unchanged** | Affordable after wage correction; useful targeted accelerator |
| Arcana | 500 / +4 Magic +4 Reason +2 Creativity | **unchanged** | Strong 10-point advanced package |
| Rhetoric & Social | 300 / +3 Charm +3 Sociability +2 Wits | **unchanged** | Strong basic package |
| Etiquette & Presentation | 400 / +3 Manners +3 Grooming +2 Charm | **unchanged** | Correct mid-tier cost |
| Field Craft | 400 / +3 Dexterity +3 Wits +2 Creativity | **unchanged** | Preserves D44/D31 calibration |
| Physical Training | 400 / +3 Strength +3 Endurance +2 Dexterity | **unchanged** | Preserves progression pacing |
| Arts & Performance | 500 / +3 Creativity +3 Charm +2 Sociability +2 Dexterity | **unchanged** | 10-point advanced package |
| Body Confidence | 400 / +3 Sexuality +3 Grooming +2 Endurance +2 Lust | **unchanged** | Preserves voluntary Lust and D44 Takeover pacing |
| Starting money | 600 | **unchanged** | Becomes a useful buffer once wages are corrected |
| Base Energy | 3 | **unchanged** | Locked life/action budget |
| D26 cadence | one same-career shift/day | **unchanged** | Multi-career pressure preserved |
| D43 Palace wage | 35..55, finite 15 duties | **unchanged** | No Palace farming |
| D44 hidden wage | accepted formula, cap 140 | **unchanged** | Ordinary wage closure cannot subsidize Debt |
| D32 money caps | 1000 / 1000 | **unchanged** | Strong Meta stays bounded |

---

**READY_FOR_PRODUCT_LOCK**
