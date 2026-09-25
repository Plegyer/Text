# Hard Work Meta Rewards v1

Дата: 2026-09-25.

Статус: **SIMULATION-SUPPORTED BALANCE CANDIDATE**.

Цель:
каждая простая трудовая ending должна:
- тематически отражать прожитую профессию;
- автоматически облегчать следующие runs;
- помогать progression ladder к следующим ordinary jobs;
- в совокупности 10/10 подготовить профиль к Palace.

## 1. Candidate automatic rewards

| Ordinary profession | Hard Work reward |
|---|---|
| Lumber | +3 starting Strength, +3 starting Endurance |
| Satyr Maid | +3 starting Charm, +3 starting Grooming |
| Undead Farm | +3 starting Reason, +3 starting Magic |
| Tavern | +3 starting Sociability, +3 starting Manners |
| Hunter | +3 starting Dexterity, +3 starting Wits |
| Guard | +3 starting Endurance, +3 starting Manners |
| Merchant | +600 starting money |
| Artist / Geisha | +3 starting Creativity, +3 starting Grooming |
| Assassin | +3 starting Dexterity, +3 starting Wits |
| Prostitute | +3 starting Sexuality, +3 starting Charm |

All are automatic after the ending is earned.

Repeated same Hard Work:
- no second reward;
- no second Palace progress.

## 2. Why these rewards form a ladder

### Starter trio -> mid jobs

Lumber:
- Strength / Endurance -> Guard, Hunter.

Satyr Maid:
- Charm / Grooming -> Tavern, Artist, Prostitute.

Undead Farm:
- Reason / Magic -> Merchant and broader School/Activity access.

### Mid jobs -> late jobs

Tavern:
- Sociability / Manners -> Artist and Prostitute.

Hunter:
- Dexterity / Wits -> Assassin.

Guard:
- extra Endurance / Manners -> advanced institutional/status builds.

Merchant:
- +600 starting money -> earlier School purchases for any late gate.

Thus rewards do not need explicit:
`unlock_job_early=true`.

They accelerate the existing stat/economy system.

## 3. Full 10/10 cumulative starting profile

Before the player's 10 creation points:

- Strength: base 1 +3 = 4
- Endurance: 1 +6 = 7
- Dexterity: 1 +6 = 7
- Reason: 1 +3 = 4
- Magic: 1 +3 = 4
- Creativity: 1 +3 = 4
- Wits: 1 +6 = 7
- Charm: 1 +6 = 7
- Sociability: 1 +3 = 4
- Manners: 1 +6 = 7
- Grooming: 1 +6 = 7
- Sexuality: 1 +3 = 4

Starting money:
- fresh candidate: 600;
- after Merchant Hard Work: 1200.

Then player still distributes 10 creation points.

This makes the Palace-era profile substantially stronger without giving free max stats.

## 4. Relation to School

A +3/+3 Hard Work reward is roughly worth part of one strong School package.

That is intentional:
- one ending saves several early actions/money;
- multiple endings stack;
- School remains useful.

Merchant Hard Work instead saves six normal-rent equivalents at current candidate economy.

## 5. Why automatic

These rewards are:
- small-to-medium;
- cumulative;
- part of visible long-term progression.

They should not consume limited perk/loadout slots.

Strong complex-ending rule changes may still be selectable.

## 6. Complex endings remain stronger

Examples of appropriate complex rewards:
- +1 daily Energy;
- reduced/free rent;
- daily income;
- quarter-stat carryover;
- starting tool/equipment package;
- School discount;
- advanced School access;
- Activity route/equipment;
- alternate start;
- powerful Title/perk.

Exact mapping remains a separate catalog pass.

## 7. Palace

Palace unlock condition remains:
all 10 ordinary Hard Work flags.

At that point the player also owns all automatic rewards above.

Therefore Palace is designed for an already meta-strengthened profile.

## 8. Status

This v1 supersedes the simpler single-stat mapping in
`HARD_WORK_META_REWARDS_v0.md`.

Exact +3 and +600 values remain balance-candidate until the next fresh/mid/late simulation pass.
