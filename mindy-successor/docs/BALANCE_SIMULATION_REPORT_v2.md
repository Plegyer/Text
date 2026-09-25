# Balance Simulation Report v2 — Corrected Goal

Дата: 2026-09-25.

Статус: **CURRENT BALANCE INTERPRETATION**.

This replaces the design conclusions of `BALANCE_SIMULATION_REPORT_v1.md`.

## What v1 got wrong

V1 optimized toward:
- avoiding School as a repair tool;
- preventing quick labor grind;
- preserving similar economic pressure throughout meta progression.

Those goals conflict with the intended game.

## Correct target

1. Fresh game is intentionally hard.
2. Work is the basic source of money and broad stat drift.
3. School is intentionally where money becomes chosen stats.
4. Awkward seasonal losses are repairable, not automatically bad.
5. A player may grind work at the cost of other content.
6. Endings intentionally make future runs easier.
7. Late-meta profile should trivialize much of early survival.

## Retained findings

Useful from v1:
- seasonal packages matter because 1/2/3 shifts per day see different season mixes;
- all 12 stats need reachability;
- raw per-shift gains need a cap/floor;
- 160-day economy should be tested as a whole.

Withdrawn:
- seasonal breadth as Hard Work requirement;
- "School should not be repair tax" principle;
- attempt to keep rent around one fresh shift;
- Grooming Self-care Night subsystem.

## Fresh economy candidate

Use `ECONOMY_BALANCE_CANDIDATE_v2.md`.

Key relation:
- starter wage 1 WU;
- normal rent ~2 WU;
- starting money ~12 WU;
- School ~6–12 WU.

That intentionally forces work.

## Meta simulation

A generic mid/late profile stress test shows that accumulated benefits such as:
- more Energy;
- starting money;
- rent relief;
- stronger wages/access;
- School discounts

can turn a lifestyle impossible on Fresh into an easy later run.

That is desired.

## Next numeric pass

Next actual balance simulation should focus on:
- exact School gain packages;
- 0..100 stat cap/floor;
- career gate reach times;
- 50-shift Hard Work candidate;
- 10 Hard Work meta rewards and their cumulative effect;
- fresh/mid/late economy side by side.

Do **not** optimize toward equalizing the three profiles.
