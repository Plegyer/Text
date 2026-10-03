# Original Simply Mindy — Mechanical Reference v1

Status: **REFERENCE ONLY — NEVER OVERRIDES CURRENT PRODUCT AUTHORITY**

Source supplied by the user:
- `Simply_Mindy_360(4)(3).swf`
- Macromedia Flash / SWF v16
- Stencyl build

Purpose:
- recover original-game mechanics and numeric defaults;
- use them as historical balance evidence for still-open tuning;
- never overwrite explicit current Product decisions in `USER_DECISIONS_LOCKED_v1.md`.

## Extraction state

Confirmed embedded Stencyl data assets:

- `assets/data/behaviors.mbs` — 441,119 bytes;
- `assets/data/game.mbs` — 27,151 bytes;
- `assets/data/resources.mbs` — 1,205,549 bytes;
- hundreds of `assets/data/scene-*.mbs` scene-data files.

The original `game.mbs` contains **484 global game attributes**.

ActionScript bytecode has also been decoded far enough to recover concrete School, job-pay, job-stat, unlock and no-rent mechanics below.

## Confirmed original defaults

Calendar / economy:
- `year = 1`;
- `day = 1`;
- `money = 600`;
- `stamina = 3`;
- `staminaBoost = 0`.

The original game exposes twelve global attributes that initialize at **1** and act as its primary stat set:

- `intellect = 1`;
- `prowess = 1`;
- `creativity = 1`;
- `class = 1`;
- `charisma = 1`;
- `morality = 1`;
- `fuckability = 1`;
- `spirit = 1`;
- `strength = 1`;
- `durability = 1`;
- `cleanliness = 1`;
- `sociability = 1`.

Historical evidence only: do **not** map these one-to-one onto the successor's 12-stat model without explicit design mapping.

## Original Lust / Fuckability distinction

There is **no global game attribute named `lust`** in the original `game.mbs`.

The original does have:
- global `fuckability`, starting at 1;
- scene-local `mindyLustyCount`;
- scene-local `lustyGo`.

Further bytecode inspection shows `mindyLustyCount` is initialized/reset to 0 alongside local dungeon/combat statuses such as poison/chastity and is checked as a temporary encounter state. `lustyGo` is also a local scene boolean.

Therefore:
- original `Fuckability` is a persistent main stat;
- the discovered original "lusty" state is **not** evidence of a persistent Lust progression stat;
- the successor project's separate Lust axis is a new design concept and must remain separate unless Product explicitly maps it.

## Original School — exact paid lesson mechanics

Every listed lesson costs **1 Stamina**.

| Original course | Cost | Exact stat gains |
| --- | ---: | --- |
| Fuckin' | 300 | Fuckability +2, Charisma +1 |
| All About Anal | 400 | Fuckability +2, Durability +2 |
| Opinions on Oral | 400 | Fuckability +2, Prowess +2 |
| S&M Fun | 500 | Fuckability +3, Prowess +2, Creativity +2 |
| How to Kick Ass | 500 | Fuckability +1, Strength +3, Durability +3, Prowess +3 |
| How to Kick Ass with Sparkly Things | 600 | Intellect +4, Spirit +4, Fuckability +1 |
| Gettin' Fancy | 600 | Class +3, Sociability +3, Intellect +2, Fuckability +2 |

This confirms the original School frequently increased Fuckability, but that still does not make Fuckability equivalent to the successor's separate Lust stat.

## Original job wage formulas

The original job code computes `moneyEarned` as a random base plus weighted stats.

The formulas below are direct bytecode recovery of the original `randomInt(...)` and stat multipliers:

| Original job | Original wage formula |
| --- | --- |
| Guard | randomInt(25,50) + 1.25×Strength + 1.25×Prowess + 1.0×Fuckability |
| Maid | randomInt(25,50) + 1.5×Cleanliness + 1.0×Fuckability |
| Farmer | randomInt(25,50) + 1.25×Strength + 1.25×Durability + 1.0×Fuckability |
| Camwhore | randomInt(15,30) + 1.25×Charisma + 1.25×Creativity + 1.0×Fuckability |
| Gloryhole | randomInt(25,50) + 1.25×Durability + 1.25×Strength + 1.0×Prowess + 1.0×Fuckability |
| Arm Candy | randomInt(50,75) + 1.5×Class + 1.5×Sociability + 1.0×Fuckability |
| Prostitute | randomInt(50,75) + 1.5×Charisma + 1.5×Sociability + 1.0×Fuckability |
| Cosplay | randomInt(50,75) + 1.5×Class + 1.5×Sociability + 1.0×Fuckability |
| Mascot | randomInt(75,100) + 1.5×Creativity + 1.5×Sociability + 1.5×Cleanliness + 1.0×Fuckability |
| Model | randomInt(45,60) + 1.5×Charisma + 1.5×Durability + 1.0×Fuckability |
| Cabaresque | randomInt(75,100) + 1.5×Prowess + 1.5×Class + 1.5×Charisma + 1.0×Fuckability |
| Geisha | randomInt(75,100) + 1.5×Cleanliness + 1.5×Class + 1.5×Charisma + 1.0×Fuckability |

Important successor-design observation:
- the original paid sexual/presentation jobs used the persistent sexuality-adjacent `Fuckability` directly as a **positive wage input**;
- this supports the user's successor rule that Lust may positively affect hidden-work income, but does not prescribe the successor coefficient.

## Original seasonal work uses both gains and penalties

Recovered original seasonal work code confirms that jobs did **not** simply grow stats.

Examples:
- Guard / Brimstone: Strength +1, Prowess +1, Intellect -1, Class -1;
- Maid / Brimstone: Cleanliness +2, Creativity -1, Class -1;
- Farmer / Brimstone: Strength +1, Durability +1, Cleanliness -1;
- Prostitute / Brimstone: Charisma +1, Sociability +1, Class -1, Intellect -1;
- Geisha / Brimstone: Class +1, Sociability +1, Charisma +1, Strength -1, Durability -1.

Across the recovered twelve original job methods, every season contains at least one negative stat tradeoff; several seasons contain two negatives or a -2.

This is useful historical evidence for the successor's tradeoff design, but current Product authority intentionally uses the softer rule of roughly **2 negative seasons out of 4**, not the original's harsher every-season model.

## Original unlock thresholds

The original `NewJobTriggers` bytecode contains explicit stat-or-year unlocks for eight later jobs.

- Gloryhole: (Strength >=30 AND Durability >=30 AND Prowess >=20) OR Year >=2.
- Prostitute: (Charisma >=30 AND Sociability >=15) OR Year >=2.
- Arm Candy: (Cleanliness >=30 AND Sociability >=15) OR Year >=2.
- Cosplay: (Creativity >=30 AND Sociability >=15) OR Year >=2.
- Mascot: (Cleanliness >=40 AND Sociability >=30 AND Creativity >=30) OR Year >=3.
- Model: (Charisma >=30 AND Prowess >=30 AND Fuckability >=30) OR Year >=3.
- Cabaresque: (Creativity >=30 AND Prowess >=30 AND Class >=20) OR Year >=3.
- Geisha: (Cleanliness >=30 AND Sociability >=30 AND Class >=30) OR Year >=3.

The same trigger block does not gate Camwhore, Farmer, Maid or Guard, consistent with them being base-access jobs in the original.

Again, this is reference only; successor D14 and current ordinary-career gates remain authoritative.

## Original no-rent / street-living route

This is the closest verified original mechanic to the successor's poverty/hidden-route themes.

### Per no-rent night/day

Entering the original no-rent overnight scene:
- increments `noRentCount` by **1**;
- advances the day;
- applies:
  - Charisma -1;
  - Cleanliness -1;
  - Class -1.

### Milestones

The original main event router checks:
- `noRentCount >= 5` for an earlier landlady/no-rent scene;
- `noRentCount >= 20` for the later no-rent scene if its prior flag is still unset.

Scene 145 sets:
- `endNoRent = true`.

So the original no-rent route reaches its dedicated ending after the 20-count milestone, subject to its event flags.

### Original NG+ reward

The original ending-selection text explicitly describes the no-rent ending as:

- **+$2,000 starting money**.

The selection code also directly adds **2000** to the new-life money value when that ending bonus is chosen.

This is highly relevant historical evidence for successor Meta-reward tuning:
- original poverty/no-rent completion rewarded future economic resilience;
- the successor's current Secret Debt values/Hard Work=50 remain Product-owned and are not replaced by the original 20-count rule;
- any successor ending reward should still be separately approved before implementation.

## Prostitute historical reference

Confirmed original facts useful for successor balance comparison:

- unlock: Charisma >=30 + Sociability >=15, or Year >=2;
- wage: randomInt(50,75) + 1.5×Charisma + 1.5×Sociability + 1.0×Fuckability;
- Brimstone work tradeoff: Charisma +1, Sociability +1, Class -1, Intellect -1;
- Megahot work tradeoff: Charisma +2, Cleanliness -2;
- Ghostings: Charisma +1, Intellect +1, Class -1, Strength -1;
- Darkly: Charisma +1, Strength +1, Class -2.

This shows the original sexual-work economy paid strongly while also carrying substantial stat tradeoffs.


## Original Prostitute career routing — exact bytecode evidence

The full Stencyl ActionScript bytecode has now been decoded far enough to trace the original Prostitute route directly rather than infer it from scene names.

Verified career counters / gates:

- a normal Prostitute shift increments `prostituteVisit` by 1;
- `prostituteVisit >= 15`, combined with route flags, opens an intermediate Prostitute career scene;
- persistent `fuckability >= 30`, combined with prior-route flags, opens another Prostitute scene;
- `strength >= 40 AND durability >= 40`, after the preceding Prostitute scene, opens a later route scene;
- `prostituteVisit >= 50 AND doneProstituteSinnersOrb == false` switches to the dedicated Prostitute Sinner's Orb scene.

### Exact 50-shift ending-choice behavior

The dedicated 50-shift scene sets `doneProstituteSinnersOrb = true` on entry, then later presents explicit **Yes / No** buttons.

The scene copy explicitly warns that accepting the orb locks in the ending.

Runtime behavior:

- pressing **Yes** writes `endingSet = "prostitute"`;
- pressing **No** does not write that ending selection;
- both branches return to the ordinary game flow afterward;
- because the scene's one-time flag was already set on entry, declining does not simply re-offer the same orb scene on the next shift.

This is strong historical evidence for a two-step career-ending model:

`reach career milestone -> receive explicit ending opportunity -> player commits or declines`

It is **not** authority to copy the original one-shot-decline behavior. Successor Product authority separately decides whether a declined opportunity remains available later.

### Cross-career routing

The original main event router interleaves Prostitute and Arm Candy conditions in the same trigger block. Some scenes depend on flags from the other career.

This confirms that original careers were not always isolated silos: progress/choices in one profession could influence authored opportunities in another.

## Authority rule for using this reference

When original and successor authority conflict:
1. explicit current user/Product decision wins;
2. current locked successor docs win;
3. original mechanics are only a tuning/reference input.

Examples:
- successor Secret Debt remains 20% / 2000 help / 10-day activation / 20000 debt because the user locked those values;
- successor hidden Hard Work remains 50 shifts;
- successor work negatives remain roughly 2 seasons out of 4;
- successor Lust remains separate from Sexuality/Fuckability.

## Next extraction priorities

1. exact original rent/payment amounts and housing flow;
2. more ending/NG+ rewards;
3. original Prostitute/poverty event thresholds beyond the basic unlock/no-rent route;
4. original job ending thresholds and repeat-work counters;
5. any original economy sinks that explain the much higher historical job wage scale.

Only verified values should be promoted into this reference.
