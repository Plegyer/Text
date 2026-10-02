# Original Simply Mindy — design-pattern synthesis v1

Status: **REFERENCE ONLY.** This is not Product authority and does not ask the successor to copy original values/content 1:1.

## Why this exists

The original SWF is useful mainly as a systems-design reference: how work, School, housing pressure, career progression, endings and New Game+ interact. Current user decisions always override the original.

## Loop at a glance

The useful original loop is systemic rather than numeric:

`small daily action budget -> work / School / larger activity -> money + build changes -> housing pressure -> sleep or street consequence -> next day/season -> career/story milestones -> explicit ending choice -> Meta options for later lives`.

The important lesson is that these systems pressure one another. Money spent on School is money not available for housing; work grows some axes while costing Energy and sometimes other stats; poverty can become a route; endings reshape later runs.

The successor should preserve that kind of interaction without reproducing the original content or exact formulas.

## High-value patterns

### 1. Small daily action economy
- Original baseline Stamina is 3.
- Ordinary work and paid School lessons consume 1 Stamina.
- Some larger activities consume more.
- Ending bonuses can permanently add +1 daily Stamina.

Design lesson: Energy/Stamina is the main daily budget. A +1/day Meta reward is powerful because it changes the number of meaningful actions, not merely a stat number.

### 2. Work is stat shaping, not pure stat inflation
Across the 12 recovered original jobs, seasonal shift packages always mix gains and losses. Excluding the Stamina cost, the net stat movement per shift is either 0 or +1.

Design lesson: work is primarily a way to shape a build while earning money. It should not be the fastest universal stat-growth engine. The successor deliberately uses a softer version (negative tradeoffs in about 2 of 4 seasons), but progression-speed tests should remember that the original had much stronger stat sinks.

### 3. Seasons matter mechanically
The same job changes different stats in different seasons. Seasons therefore affect build direction, not only presentation.

Design lesson: seasonal packages should create meaningful variation without changing the career's identity.

### 4. Wage = baseline income + build value
Original job income uses a random base plus weighted relevant stats. A persistent sexuality-adjacent stat also contributes positively to many wages.

Design lesson: wages feel better when character development changes earning power. Exact original coefficients/randomness are not important; the successor can keep deterministic or differently tuned formulas.

### 5. School is a money-for-growth accelerator
Original School lessons cost one Stamina but grant much larger stat packages than one work shift. Their money cost is high relative to early-job income.

Design lesson: School occupies a distinct niche: sacrifice money and one daily action to accelerate a chosen build. It should not be free routine growth.

### 6. Unlocks have build path + time fallback
Many later original jobs unlock from a stat combination OR simply from reaching Year 2/3.

Design lesson: specialization rewards early access, while the year fallback prevents a poor build from permanently locking content.

### 7. Careers have milestones before the ending
Recovered career visit counters commonly trigger authored events around 15 shifts; richer routes also use 5/10/30 milestones. Around 50 shifts, the career-ending opportunity appears.

Design lesson: do not make 50 shifts a silent counter grind. A profession should change along the way.

### 8. Ending eligibility is not automatic ending
At the 50-shift Prostitute milestone, the original opens a dedicated scene with an explicit yes/no choice. Only the affirmative choice commits the ending selection.

Design lesson: reaching conditions should create an explicit player-controlled ending action. This matches the successor's locked non-terminal eligibility rule.

### 9. Housing/economy is a real pressure system
Original rent can be paid with money or by sacrificing stats. If the chosen payment cannot be made, the heroine sleeps outside. Repeated nonpayment creates a dedicated poverty route and eventually an ending/alternate life state.

Design lesson: housing pressure links money, stats and route selection. The successor does not need stat-paid rent, but it needs enough ongoing sinks that work/School choices remain meaningful.

### 10. Poverty can become content, not a dead fail state
The original street/no-rent path has repeated-night penalties, authored milestones, an alternate-life outcome and a useful New Game+ reward.

Design lesson: an economic collapse route can become a deliberate hidden playstyle. This is the useful conceptual precedent for Secret Debt; exact original counts/penalties should not be copied.

### 11. Meta rewards are heterogeneous rule changes
Recovered original ending rewards include:
- fixed starting-stat bonuses;
- starting money;
- +1 daily Stamina;
- starting gear/spells/moves;
- immediate unlocking of later jobs;
- passive daily income;
- disabling rent;
- partial stat inheritance;
- titles/other identity unlocks.

Design lesson: New Game+ is strongest when endings change the next run in different ways, not when every ending is another small stat bundle.

### 12. Career endings often combine “job learned” + bonus
Multiple later-career endings explicitly grant a stat reward and permanently unlock that same job for later runs.

Design lesson: the successor's D21 model — Hard Work permanently makes that profession available from the start and unlocks a selectable profession bonus — is conceptually consistent with the original while still being a new system.

### 13. Failed/odd runs can still progress Meta
The original time-up/failure-type endings can still award future-run bonuses.

Design lesson: avoid making an entire run worthless just because the player did not hit the ideal outcome.

### 14. Careers remember choices, not only shift count
Recovered career flags encode persistent branches such as help/ignore, lover/spurn, accept/reject, kill/plot and continue/decline.

Design lesson: shift milestones should expose decisions whose consequences persist inside the career. Hard Work=50 should be the culmination of a route, not the only meaningful career state.

### 15. Careers can converge into shared storylines
Some original career routing is explicitly shared. The Prostitute/Arm-Candy trigger block, for example, also consumes a common later storyline rather than treating both jobs as sealed silos.

Design lesson: successor cross-career hooks can create authored continuity between professions while keeping ownership boundaries clean. Prefer read-only evidence/capability inputs and career-local consequences over global mutable meters.

### 16. Endings belong to many systems, not only careers
Recovered ending rewards come from career repetition, relationship/NPC arcs, poverty, contests/side systems, combat/story routes and the run deadline.

Design lesson: avoid one canonical “best” ending family. Hard Work can be the dependable profession route while complex alternatives reward different playstyles, choices and builds.

### 17. Stats have broad world utility
The original includes a large recurring "minor crisis" layer where the player chooses a stat to solve an everyday problem. Different choices can succeed in different ways and reward/penalize money, Energy or other stats.

The challenge also scales with time: the recovered crisis system adds a year-dependent random difficulty modifier, roughly 5–15 in Year 1, 15–25 in Year 2, 20–50 in Year 3 and 30–60 from later years.

Design lesson: progression stats should matter outside their home career. Successor random/Activity/cross-system events can give multiple stats recurring utility so a stat is not just an unlock key or wage coefficient. Exact original thresholds/randomness should not be copied.

### 18. The world gets harder as the run advances
Original unlocks become easier through year-based fallbacks, but generic world checks become harder over time.

Design lesson: time progression can simultaneously open content and increase pressure. That creates a useful curve: early specialization gives advantages, while late access prevents lockout but does not make the world trivial.

## Successor implications to test, not auto-lock

- Current approved successor seasonal-tradeoff candidate yields **+1.5 net progression-stat points per ordinary shift on average for all ten careers**. That is roughly +75 summed stat points across 50 shifts, versus about +25 in the recovered original work model. This is a balance-test flag, not a command to copy the original: verify progression speed and cap timing over a full 160-day run, especially with School and NG+.
- School should remain meaningfully expensive relative to ordinary earnings so its large stat packages remain a strategic choice.
- Career event density should prevent Hard Work=50 from feeling like a silent counter.
- New Start+ bonus design should favor distinct playstyle changes and route access, not only additive stats.
- Secret Debt should be judged as a complete alternate route with its own economy and exits, not as a punishment minigame.

## What not to copy automatically

- original stat names or 1:1 mappings;
- original explicit-content framing;
- original exact wages, rent prices, thresholds, or every-season penalties;
- original randomness where successor deterministic systems are cleaner;
- original ending reward magnitudes;
- original persistent Fuckability as a substitute for successor Lust.
