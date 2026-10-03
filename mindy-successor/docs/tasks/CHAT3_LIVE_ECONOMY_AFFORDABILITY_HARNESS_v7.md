# Chat 3 — Live Economy Affordability Harness v7

Status: **RESEARCH ONLY / NO PRODUCTION CHANGES**  
Branch: `chat3/live-economy-affordability-harness-v7`

## Scope

The harness reads the current executable successor economy and applies D26/D31/D32 only as explicit research authority overlays.

Live baseline:
- fresh money 600;
- base Energy 3;
- normal lodging 100;
- cheap lodging 50;
- street 0, next-day Energy -1, Grooming -1;
- current paid School catalog;
- current ordinary wage formulas;
- D26 max one same-career shift/day;
- Hard Work 50.

The dispatch branch still contains pre-assembly negative target stats, so D31 is applied **in memory only**. Production definitions are not edited.

A 160-day run has **159 lodging decisions** because the runtime expires the run before opening another lodging flow after the final playable day.

## Reproduce

From `mindy-successor/prior-work/astra/prototype-m3.2`:

```bash
node --experimental-strip-types scripts/live-economy-affordability-harness.ts --format=summary
node --experimental-strip-types scripts/live-economy-affordability-harness.ts --format=json
node --experimental-strip-types --test tests/live-economy-affordability-harness.test.ts
```

No full CI.

## Strategy results

Money is measured at end of Day N, after lodging where a lodging night exists.

| Strategy | D10 | D20 | D40 | D50 | D80 | D120 | D160 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Survival-first cheap + starter work | 715 | 1080 | 2260 | 3074 | 6368 | 11826 | **18452** |
| Normal preference | 215 | 80 | 260 | 574 | 2368 | 5826 | **10502** |
| School investment | 370 | 394 | 903 | 1568 | 4578 | 9619 | **15636** |
| One-career Lumber focus | 330 | 135 | 40 | 20 | 180 | 1040 | **2389** |
| Multi-career Hard Work | 715 | 1080 | 2260 | 3074 | 6044 | 11404 | **19162** |
| Poverty/street fallback | 1005 | 1505 | 2744 | 3462 | 5749 | 10109 | **15377** |
| Mixed earned Hard Work New Start+ | 960 | 1604 | 3687 | 5147 | 6951 | 11970 | **20078** |

## Lodging / street

| Strategy | Normal | Cheap | Street | Forced street | Street Energy lost |
| --- | ---: | ---: | ---: | ---: | ---: |
| Survival-first | 0 | 159 | 0 | 0 | 0 |
| Normal preference | 159 | 0 | 0 | 0 | 0 |
| School investment | 0 | 159 | 0 | 0 | 0 |
| One-career Lumber | 0 | 155 | 4 | **4** | 4 |
| Multi-career Hard Work | 0 | 159 | 0 | 0 | 0 |
| Poverty/street | 0 | 0 | 159 | 0 (chosen) | **159** |
| Mixed New Start+ | 0 | 159 | 0 | 0 | 0 |

No modeled ordinary scenario creates literal negative-money debt. The research spiral rule is seven consecutive forced street nights; none of the paid-lodging strategies crosses it.

## School investment

The School strategy uses Rhetoric & Social every 10 days:
- 16 opportunities;
- 16 money-affordable;
- 16 completed;
- tuition paid: 4800;
- cheap nights: 159;
- street nights: 0;
- final money: 15636.

Therefore a 300-cost paid School cadence is viable without a Keystone when backed by regular ordinary work.

## Hard Work timing

Survival-first:
- Lumber Day 50;
- Satyr Maid Day 50;
- Undead Farm Day 50.

One-career focus:
- Lumber Day 50.

Sequential multi-career Hard Work:
- starter trio Day 50;
- Tavern / Hunter / Guard Day 100;
- Merchant / Artist-Geisha / Assassin Day 150;
- remaining career has 10 shifts at Day 160.

Street fallback loses enough Energy that completion slows:
- Lumber / Satyr Maid Day 50;
- Undead Farm Day 99;
- Tavern Day 100;
- Hunter Day 149;
- Guard Day 150.

## Unlock timing

Fresh profiles:
- starter trio Day 1;
- Tavern / Hunter / Guard / Merchant by Day 41 via Year-2 fallback;
- Artist-Geisha / Assassin / Prostitute by Day 81 via Year-3 fallback.

Mixed earned profile uses earned Hard Work for inherited access:
- Hunter Day 1;
- Merchant Day 1;
- Assassin Day 1.

## Current normal-room semantics

Normal and cheap currently have the same:
- availability;
- immediate effects;
- next-day effects;
- next-day Energy delta.

Normal costs 50 more.

So mechanically rational normal choices under current semantics = **0**.

The normal-preference strategy can afford 159 normal nights, but pays:
- 159 × 50 = **7950** extra versus cheap.

That exactly explains the final-money gap:
- cheap starter-work profile: 18452;
- normal preference: 10502.

Affordability does not remove the normal-room dominance problem.

## D31 wage effect

D31 makes negative pressure hit work-grown and sometimes wage-readable stats.

Gross ordinary wage delta versus the pre-D31 shipped target map:

| Strategy | D31 wage delta | Street-night delta |
| --- | ---: | ---: |
| Survival-first | **-2012** | 0 |
| Normal preference | **-2012** | 0 |
| School investment | **-3250** | 0 |
| One-career Lumber | **-890** | +1 |
| Multi-career Hard Work | **-4149** | 0 |
| Poverty/street | **-960** | 0 |
| Mixed New Start+ | **-2439** | 0 |

D31 has a real economic cost, but diversified cheap-lodging strategies remain solvent.

## D32 research overlays

All overlays use the same mixed New Start+ profile.

Baseline mixed profile final money: **20078**.

### Reserve Match 1000
- matched bonus paid: 1000;
- final money: **21078**.

### Work Rhythm 20
- extra Energy granted: 20;
- extra Energy converted into modeled actions: 20;
- final money: **21735**;
- Lumber Hard Work moves Day 100 -> Day 80;
- Tavern moves Day 150 -> Day 130;
- Guard stat gate appears Day 29 instead of waiting for Day 41 fallback.

D26 remains binding; no same-career Hard Work occurs before Day 50.

### Retainer 25×40
- total paid: 1000;
- final money: **21078**.

This ordinary baseline has no active bound state, so all first 40 payment days are eligible.

## Key question

Does the current executable wage/lodging/School ratio support a viable 160-day run without chronic street use or a Meta Keystone?

**Research answer: yes, conditionally.**

Evidence:
- survival-first: 0 street, final 18452;
- School investment: 16/16 paid lessons, 0 street, final 15636;
- multi-Hard-Work: 9 Hard Works, 0 street, final 19162;
- mixed New Start+: 0 street, final 20078.

But the result does not mean the economy is fully balanced:
- normal lodging remains strictly dominated by cheap;
- one-career play has early affordability failures;
- D31 materially lowers wages;
- street is cash-rich but costs 159 Energy over the run;
- current viability assumes fairly strong daily action utilization.

The harness does **not** recommend wage compensation or any production-number change.

Disposition: **READY_FOR_LEADER_PRODUCT_DECISION**.
