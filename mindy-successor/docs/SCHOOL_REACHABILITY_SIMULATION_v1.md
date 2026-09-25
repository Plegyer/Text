# School Reachability Simulation v1

Дата: 2026-09-25.

Статус: **BALANCE CHECK**.

Input:
`SCHOOL_BALANCE_MATRIX_v0.csv`.

Assumptions:
- target stat starts at 1;
- no job gains;
- no creation allocation;
- no meta bonuses.

This is deliberately worst-case School-only reachability.

## Cheapest direct School path

| Stat | To 20 | Cost | To 30 | Cost |
|---|---:|---:|---:|---:|
| Strength | 7 lessons | 56 WU | 10 | 80 WU |
| Endurance | 7 | 56 | 10 | 80 |
| Dexterity | 7 | 56 | 10 | 80 |
| Reason | 5 | 30 | 8 | 48 |
| Magic | 5 | 50 | 8 | 80 |
| Creativity | 7 | 70 | 10 | 100 |
| Wits | 7 | 56 | 10 | 80 |
| Charm | 7 | 42 | 10 | 60 |
| Sociability | 7 | 42 | 10 | 60 |
| Manners | 7 | 56 | 10 | 80 |
| Grooming | 7 | 56 | 10 | 80 |
| Sexuality | 7 | 56 | 10 | 80 |

## Interpretation

This is not the expected real route.

Normally player has:
- +10 creation allocation;
- seasonal job gains;
- possibly prior Hard Work +5;
- later complex meta rewards.

Therefore actual number of lessons is lower.

The table proves:
**no stat is structurally blocked.**

## Fresh example

Need Strength 20.

Fresh with no points:
- 7 Physical Training lessons;
- 56 WU tuition;
- +7 Energy;
- fresh wage 1 WU means up to 56 work shifts to fund it if no other income.

But if creation puts +5 Strength and Lumber work already adds +8:
- start 6;
- work -> 14;
- two Physical lessons -> 20.

So job + School combination is dramatically more efficient than School-only.

## Hard Work meta example

After Lumber Hard Work:
- future Strength starts +5 higher.

A later character can hit the same Strength gate with fewer work/School actions.

This is the intended cumulative easing.

## Advanced-course efficiency

More expensive courses are allowed to give more stat points per Energy.

Money is the limiting resource; Energy efficiency is a reward for affording better education.

This preserves the reference pattern where expensive courses give much larger packages.

## Special swap

2:1 stat conversion guarantees another deterministic fallback:
surplus stat -> needed stat.

It is intentionally inefficient but universal.
