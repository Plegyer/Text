# Economy Balance Candidate v3 — Explicit-Cost Model

Дата: 2026-09-25.

Статус: **SIMULATION-SUPPORTED BALANCE CANDIDATE**, not final lock.

Основание:
- fresh profile hardest;
- 3 daily Energy;
- Work 1 Energy;
- School 1 Energy + money;
- Large Activity 2 Energy;
- reactive relationships/career dialogue cost 0 Energy;
- night relationship uses Night slot, not daytime Energy.

This supersedes the scenario accounting in `ECONOMY_BALANCE_CANDIDATE_v2.md`, which still contained a generic "other Energy actions" bucket.

## 1. Candidate fresh ratios remain

```text
starter wage = 1 WU
normal lodging = 2 WU/night
cheap lodging = ~1 WU/night + drawback
street = 0
starting money = 12 WU
basic School = ~6 WU
advanced School = ~8–12 WU
daily Energy = 3
```

Candidate visible scale:
`1 WU ≈ 50 currency`.

So approximately:
- starter shift 50;
- normal lodging 100;
- starting money 600;
- School 300–600;
- Secret loan 2000;
- Secret demand 20000.

## 2. Fresh 160-day baseline

Total normal lodging:
- 160 nights × 2 WU = 320 WU.

Starting money:
- 12 WU.

If Activity and School give no money:
- pure survival needs about 308 starter shifts over the run.

Energy:
- 308 / 480.

This intentionally makes fresh life work-heavy.

## 3. Explicit lifestyle tests

### A. 10 basic School lessons + 20 Activity entries

School:
- 10 Energy;
- 60 WU.

Activity:
- 40 Energy.

Money needed:
- rent 320 + School 60 - starting 12 = 368 WU;
- therefore ~368 starter shifts.

Total Energy:
- 368 Work + 10 School + 40 Activity = **418 / 480**.

Remaining:
- 62 Energy for additional explicit actions.

Reactive relationships/career scenes are layered on top and do not consume this remainder.

### B. 20 basic School lessons + 10 Activity entries

School:
- 20 Energy;
- 120 WU.

Activity:
- 20 Energy.

Required starter work:
- 320 + 120 - 12 = 428 shifts.

Total:
- 428 + 20 + 20 = **468 / 480**.

Possible, but extremely tight.

### C. 20 basic School lessons + 20 Activity entries

Required work:
- 428.

Energy:
- 428 + 20 + 40 = **488 / 480**.

Not feasible with normal lodging and starter wage if Activity returns no money.

Therefore fresh player must alter at least one dimension:
- cheaper housing;
- fewer lessons;
- fewer expeditions;
- better-paying unlocked work;
- Activity profit;
- meta bonus.

That is the intended first-life pressure.

## 4. Relationships do not make these scenarios more expensive

A character can still experience:
- many career milestones;
- daytime reactive conversations;
- relationship scenes;
- Night partner meetings

inside the same financial/action budget.

The scarce resources are attached to the actions that generate progress, not every piece of presentation/content.

## 5. Mid-meta fixture

Illustrative only:

```text
Energy = 4/day
effective wage = 1.3 WU
rent = 1 WU
starting money = 24 WU
basic School = 5 WU
```

For 20 School + 20 Activity:
- rent = 160 WU;
- School = 100 WU;
- net after start = 236 WU;
- work ≈ 182 shifts;
- Energy = 182 + 20 + 40 = 242 / 640.

Comfortably feasible.

## 6. Late-meta fixture

Illustrative:

```text
Energy = 5/day
effective wage = 1.6 WU
rent = 0
starting money = 40 WU
School = 4 WU
```

20 School:
- 80 WU;
- after starting cash, only 40 WU must be earned;
- ~25 work shifts.

20 Activity:
- 40 Energy.

Total:
- 25 Work + 20 School + 40 Activity = **85 / 800**.

Routine survival is almost irrelevant.

This is intentional late-meta behavior.

## 7. Cheap lodging

Cheap lodging remains strategically important because it changes money, not daytime Energy directly.

Candidate:
- ~1 WU/night;
- worse privacy/Night access;
- selected Grooming/housing consequences;
- does not charge a fake daytime action.

This can free substantial money for School.

## 8. Street

Street:
- 0 money;
- explicit next-day Energy penalty;
- Grooming/social consequences;
- restricted Night menu;
- street event pool.

Its cost is represented by actual Night/next-day rules, not a hidden daily Energy fee.

## 9. Balance rule

When evaluating a route, write out its real cost vector:

```text
daytime Energy
money
Night slot
next-day Energy modifier
calendar/day ending
Activity internal resources
```

Do not collapse them into a generic "action cost".

## 10. Still open

- wage growth by profession/rank/stats;
- Activity expected monetary return;
- exact cheap/street penalties;
- final School prices/gains;
- Secret Debt economic flow;
- later-job wage tiers.

These matter more now than any generic relationship-energy assumption.
