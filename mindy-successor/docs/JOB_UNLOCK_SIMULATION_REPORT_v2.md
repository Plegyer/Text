# Job Unlock Simulation Report v2 — explicit-cost model

Дата: 2026-09-25.

Статус: **CURRENT BALANCE INTERPRETATION**.

Основание:
- `ACTION_TIME_COST_MODEL_v1.md`;
- `ORDINARY_JOB_UNLOCK_THRESHOLDS_v0.csv`;
- 3 starting jobs;
- Work 1 Energy;
- School 1 Energy + money;
- Large Activity entry 2 Energy;
- relationship/career reactive scenes normally 0 Energy.

## 1. Correction

Previous mixed-life test reserved a generic 1 Energy every day for relationships / Activity / other life. That was wrong.

These are not one cost category.

### 0-Energy by default
- relationship milestone dialogue;
- career dialogue;
- job unlock scene;
- minor reactive/city event.

### Night-slot, not daily Energy
- voluntary relationship meeting.

### Explicit Energy
- Work = 1;
- School = 1;
- Large Activity = 2.

Therefore relationship-heavy play does **not** automatically delay stat-gated job unlocks through daytime Energy loss.

## 2. What remains valid from v1

The focused theoretical minima remain useful because they only spend explicit Work/School Energy:
- Tavern ~day 10;
- Guard ~day 13;
- Merchant ~day 21;
- Hunter ~day 22;
- Prostitute ~day 31;
- Assassin ~day 32;
- Artist/Geisha ~day 33.

These are still extreme specialized routes.

Relationship scenes triggered along the way can occur in addition to them without paying another Energy.

## 3. What actually delays unlocks

Unlock timing is delayed by:
- choosing other work;
- School aimed at other stats;
- entering Large Activity;
- Night study lowering next-day Energy;
- forced bad nights / Secret Debt;
- scheduled events that explicitly end the day;
- poverty/housing consequences;
- spending money on things other than School.

It is **not** delayed merely because dialogue occurred.

## 4. Activity-specific simulation policy

Future mixed-run tests must specify Activity frequency explicitly.

Example:
- 0 Activity entries before unlock;
- 2 Activity entries before unlock = 4 Energy committed;
- 5 Activity entries = 10 Energy committed.

Activity can also return stats, money, items and facts, so its net effect cannot be represented as a generic fixed penalty.

## 5. Relationships and progression speed

Relationships can even accelerate a route without Energy cost if a milestone gives a stat, item, School access, route fact or career fact.

That is intentional cross-system density.

## 6. Normal-life interpretation

A normal player is not expected to lose one Energy per day to life.

Example full day:

```text
Work (1)
-> free career dialogue
-> School (1)
-> free relationship milestone
-> Work (1)
-> free minor event / hub reactions
-> Night relationship slot
-> next day
```

Only the two Work actions and School lesson spend daytime Energy.

## 7. Calendar fallback remains important

Even with free reactive scenes, players may not optimize every Energy toward one stat gate. They can diversify jobs, enter Activity, study other tracks, suffer bad nights and pursue other endings.

So Year-2 / Year-3 fallback remains useful, but it must not be justified by a fake relationship tax.

## 8. Balance next step

Keep current candidate gates until:
- explicit Activity-frequency simulations;
- exact School final numbers;
- exact housing/forced-night penalties.

Do not use `MIXED_LIFE_UNLOCK_SIMULATION_v1.md` for future tuning.