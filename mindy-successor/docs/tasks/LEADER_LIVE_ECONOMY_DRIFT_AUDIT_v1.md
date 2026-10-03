# Leader live economy drift audit v1

Status: **RESEARCH / NOT PRODUCT AUTHORITY**

Purpose: separate current executable successor economy from older balance-candidate documents and original-game reference.

## 1. Current executable baseline

Fresh life:
- 600 starting money;
- 3 base daily Energy;
- all 12 progression stats start at 1 before 10 manual allocation points.

Current lodging definitions:
- normal = 100;
- cheap = 50;
- street = 0, next-day Energy -1, Grooming -1.

Current `rent(s)` compatibility path:
- flat 100;
- legacy `guild` perk halves it;
- no year scaling exists in live runtime.

Current paid School:
- 1 Energy;
- tuition 300 / 500 / 300 / 400 / 400 / 400 / 500 / 400;
- direct progression packages total roughly +6 to +10 stat points;
- Body Confidence additionally grants Lust +2.

## 2. Current live ordinary wage scale

Wage uses:
`Math.round(base + sum(stat * factor))`.

Starter-career fresh values are roughly:
- Lumber: ~14 at all-1 stats; ~19 with all 10 allocation points focused into its strongest wage input;
- Satyr Maid: ~16 -> ~19;
- Undead Farm: ~16 -> ~19.

Therefore:
- one early shift does **not** pay for cheap lodging;
- three mixed starter shifts yield roughly 46 at all-1 stats and about 50+ with wage-relevant allocation;
- three early shifts approximately cover one cheap night but remain well below one normal night.

At progression-stat cap 100, ordinary wages still top out only around ~75–115 depending on career, rather than the 150–200 late-tier values implied by older WU candidate docs.

## 3. Drift from current balance candidates

`ECONOMY_BALANCE_CANDIDATE_v3.md` models:
- 1 WU ~= 50;
- starter wage ~= 50;
- normal lodging = 100;
- cheap lodging = 50;
- paid School = 300–600;
- later-year/career wages grow toward multiple WU.

The executable prototype currently keeps the lodging/School/starting-money scale but not the intended wage scale.

So the economic pressure in live code is materially harsher than the candidate model.

## 4. Original-game comparison — context only

The original also starts around 600 money / 3 Stamina and has expensive School/housing pressure, but its base-job wages are much higher relative to School:
- early original base jobs commonly average roughly 25–50+ per shift before meaningful stat growth;
- original lessons at 300–600 therefore cost materially fewer ordinary shifts than successor live lessons.

This is **not** an instruction to copy original wages. It is evidence that the current successor wage/tuition ratio is unusually harsh even relative to the historical reference.

## 5. Daily-shift-policy implication

A global "only one work action per day" policy is economically unsafe under current live numbers.

A much safer research option is:
- at most one shift **per same career per day**;
- player may still spend remaining Energy on different jobs, School, or other actions.

With the three locked Day-1 careers, one shift in each can still produce roughly one cheap-lodging payment per day while preventing a single career from reaching Hard Work=50 in ~17 calendar days.

This remains a Product decision, not a lock.

## 6. Housing-value gap to audit

Design docs say normal lodging should provide stronger privacy/relationship/storage access than cheap lodging.

Live evidence:
- School Night Study explicitly allows normal OR cheap;
- cheap has its own authored seasonal context;
- street has its own event pool and penalties;
- many career/relationship Night choices have no housing condition at all;
- the generic Night engine does not add a separate "street blocks ordinary/private Night choices" filter.

This does not prove every such choice is incorrectly available on street because some can fictionally occur at work/public locations. It does prove that normal-vs-cheap-vs-street access should receive an explicit semantic acceptance audit.

## 7. Do not fix piecemeal

Before changing production numbers:
1. run a 160-day economy simulation using **live** wages, lodging, School and Energy;
2. compare current live scale vs candidate WU scale;
3. include affordability, not only stat-cap timing;
4. test fresh / mixed-Hard-Work / strong-NG+ profiles;
5. separately decide:
   - same-career daily repetition policy;
   - wage scale;
   - whether lodging prices should escalate by year;
   - actual normal-room access value;
   - School tuition/gain ratio.

Do not copy original numbers 1:1 and do not silently promote old balance-candidate documents to runtime authority.
