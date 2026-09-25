# Explicit-Cost Job Unlock Simulation v1

Дата: 2026-09-25.

Статус: **EXECUTED BALANCE ANALYSIS**.

Основание:
- `ACTION_TIME_COST_MODEL_v1.md`;
- `ORDINARY_JOB_UNLOCK_THRESHOLDS_v0.csv`;
- `SUCCESSOR_JOB_SEASON_MATRIX_v1.csv`;
- `SCHOOL_BALANCE_MATRIX_v0.csv`;
- fresh economy candidate;
- only the 3 starting jobs are available before unlock.

## 1. Что считается расходом

В этой симуляции:

- Work = 1 Energy;
- School = 1 Energy + money;
- Large Activity = 2 Energy;
- bad/forced-night penalty = -1 next-day Energy;
- career dialogue = 0 Energy;
- relationship milestone dialogue = 0 Energy;
- job-unlock scene = 0 Energy;
- voluntary normal relationship night = no daytime Energy penalty.

Activity rewards are set to **zero** in this test.

That makes Activity delay conservative: real Activity may return stats/money/items/facts and partially or fully compensate its entry cost.

## 2. Baseline theoretical minima

| Job | No Activity / no bad-night penalty |
|---|---:|
| Tavern | day 10 |
| Guard | day 13 |
| Merchant | day 21 |
| Hunter | day 22 |
| Prostitute | day 31 |
| Assassin | day 32 |
| Artist/Geisha | day 33 |

These are optimization sprints, not expected casual timing.

## 3. Two Large Activity entries before unlock

Exactly 2 Activity entries are required before the job opens.

Cost:
- 4 total Energy.

| Job | Baseline | +2 Activity |
|---|---:|---:|
| Tavern | 10 | 11 |
| Guard | 13 | 17 |
| Merchant | 21 | 25 |
| Hunter | 22 | 24 |
| Prostitute | 31 | 31 |
| Assassin | 32 | 36 |
| Artist/Geisha | 33 | 33 |

Why some jobs do not move:
their optimized path already contains days where money/stat composition, rather than raw Energy, is the binding constraint. Activity can fit into otherwise unused action capacity.

This is useful, not a bug: losing 4 Energy does not have to mean "+2 calendar days" mechanically.

## 4. Five Large Activity entries before unlock

Cost:
- 10 total Energy.

| Job | Baseline | +5 Activity |
|---|---:|---:|
| Tavern | 10 | 14 |
| Guard | 13 | 23 |
| Merchant | 21 | 31 |
| Hunter | 22 | 24 |
| Prostitute | 31 | 32 |
| Assassin | 32 | 39 |
| Artist/Geisha | 33 | 33 |

A player heavily exploring before a stat-gate can noticeably postpone some jobs.

Again, real Activity rewards are excluded here, so this is not the final expected gameplay timing.

## 5. Bad/forced nights

A bad-night token represents one lost Energy on the following day and no compensating reward.

### Two bad nights before unlock

| Job | Baseline | +2 lost Energy |
|---|---:|---:|
| Tavern | 10 | 10 |
| Guard | 13 | 15 |
| Merchant | 21 | 23 |
| Hunter | 22 | 23 |
| Prostitute | 31 | 31 |
| Assassin | 32 | 34 |
| Artist/Geisha | 33 | 33 |

### Five bad nights before unlock

| Job | Baseline | +5 lost Energy |
|---|---:|---:|
| Tavern | 10 | 12 |
| Guard | 13 | 18 |
| Merchant | 21 | 26 |
| Hunter | 22 | 24 |
| Prostitute | 31 | 31 |
| Assassin | 32 | 36 |
| Artist/Geisha | 33 | 33 |

This shows why bad housing/forced-night routes matter without needing every ordinary relationship scene to consume Energy.

## 6. Combined pressure

Five zero-reward Activity entries + five lost-Energy nights:

| Job | Baseline | Combined |
|---|---:|---:|
| Tavern | 10 | 15 |
| Guard | 13 | 28 |
| Merchant | 21 | 33 |
| Hunter | 22 | 26 |
| Prostitute | 31 | 32 |
| Assassin | 32 | 44 |
| Artist/Geisha | 33 | 34 |

Even under this intentionally harsh combination:
- mid jobs remain reachable by stats before Year-2 fallback in a focused build;
- most late jobs remain far before Year-3 fallback;
- Assassin can become meaningfully delayed.

This is acceptable because calendar fallback remains an accessibility guarantee, not the expected optimized route.

## 7. Relationship implication

Relationship-heavy play does not need a synthetic daytime cost.

A player can have:

```text
Work
-> free career scene
-> free relationship dialogue
-> School
-> free reactive scene
-> Work
-> Night relationship
```

and still have spent exactly 3 daytime Energy.

The actual opportunity cost of relationships comes from:
- the triggering Work/School/etc. that may have been required;
- using a Night slot when the relationship scene is nocturnal;
- route-specific explicit costs, if any.

## 8. Simulation rule going forward

Do not write future scenarios as:
`80 Energy for relationships/other life`.

Instead specify:
- N work shifts;
- N School lessons;
- N Activity entries;
- N next-day Energy penalties;
- N scheduled day-ending events;
- relationship/career scenes separately as zero-Energy reactive content unless explicitly overridden.

## 9. Threshold conclusion

The current stat-gate candidates remain usable.

This corrected simulation gives no reason to raise them merely because the game also contains relationships and dialogue.

Exact final thresholds still depend on:
- final School packages/prices;
- final Activity reward rates;
- housing/forced-night balance;
- wage growth.
