# Progression Accessibility Simulation v1

Дата: 2026-09-25.

Статус: **EXECUTED SYSTEM CHECK**.

Question:
Can a fresh character reach any progression stat through ordinary work and School without needing a rare route?

Answer:
**Yes, structurally, with the current target model.**

## 1. Positive work sources

Count below is the number of positive seasonal job packages in `SUCCESSOR_JOB_SEASON_MATRIX_v1.csv`.

| Stat | Positive seasonal packages | Ordinary jobs providing it |
|---|---:|---|
| Strength | 8 | Lumber, Undead Farm, Hunter, Guard |
| Endurance | 11 | Lumber, Undead Farm, Hunter, Guard, Assassin, Prostitute |
| Dexterity | 11 | Lumber, Undead Farm, Hunter, Guard, Artist, Assassin, Merchant |
| Reason | 7 | Undead Farm, Tavern, Guard, Artist, Assassin, Merchant |
| Magic | 4 | Undead Farm, Hunter, Artist |
| Creativity | 5 | Satyr Maid, Undead Farm, Artist |
| Wits | 10 | Tavern, Hunter, Assassin, Merchant |
| Charm | 13 | Satyr Maid, Tavern, Guard, Artist, Merchant, Prostitute |
| Sociability | 8 | Satyr Maid, Tavern, Artist, Merchant, Prostitute |
| Manners | 10 | Satyr Maid, Tavern, Guard, Artist, Assassin, Merchant, Prostitute |
| Grooming | 8 | Satyr Maid, Tavern, Artist, Prostitute |
| Sexuality | 6 | Satyr Maid, Artist, Prostitute |

Every progression stat has multiple normal work sources.

No progression stat requires Palace/Secret Debt/rare Activity merely to increase.

## 2. School accessibility

`SCHOOL_SYSTEM_v2.md` covers all 12 through repeatable paid packages:

- Strength -> Physical Training
- Endurance -> Physical Training / Body Confidence secondary
- Dexterity -> Field Craft / Physical Training / Arts
- Reason -> Literacy & Numbers / Arcana
- Magic -> Arcana
- Creativity -> Arcana / Field Craft / Arts
- Wits -> Literacy / Rhetoric / Field Craft
- Charm -> Rhetoric / Etiquette / Arts / Body Confidence
- Sociability -> Rhetoric / Arts
- Manners -> Literacy secondary / Etiquette
- Grooming -> Etiquette / Body Confidence
- Sexuality -> Body Confidence

Thus money can always be converted into target-stat growth.

## 3. Universal correction

Target School v2 also reserves a special inefficient conversion service:
- any progression stat -> any other progression stat;
- candidate ratio 2:1.

Even if seasonal work produces an awkward build, player has a deterministic correction path.

## 4. Correct interpretation of seasonal losses

A negative seasonal effect is not a design failure merely because School later repairs it.

That is part of the economy:

```text
work
-> gain money and some stats
-> lose/neglect other stats
-> pay School to redirect build
-> reach desired gate
```

The first simulation incorrectly treated this as something to minimize.

## 5. Hard Work correction

The previous report recommended seasonal-breadth requirements for Hard Work because 50 shifts can be grinded quickly.

That recommendation is **withdrawn**.

A simple labor fate is allowed to reward exactly what it says: doing a lot of work.

Working 3 shifts/day is itself a player choice that sacrifices:
- School;
- Activity;
- relationships;
- other careers.

Current candidate returns to a simple visit threshold model, with career story requirements only if a specific profession needs them.

50 remains a useful reference candidate, not yet a locked successor threshold.

## 6. Difficulty curve check

Fresh:
- can reach every stat;
- doing so costs time/money;
- specialization mistakes are recoverable;
- cannot comfortably do everything in one run.

Mid-meta:
- endings reduce survival costs and accelerate stat acquisition.

Late-meta:
- basic stat access is easy;
- challenge moves to complex routes and Palace.

This matches the intended progression.

## 7. Result

The current 12-stat catalog does **not** require adding twelve separate systems.

Required production additions are limited to:
- seasonal work effect data;
- multi-stat School packages;
- stat labels/checks;
- a generic stat-conversion UI/service.

The same career scenes can test different stats without one bespoke story line per stat.
