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



## Original 12-job milestone scan — exact counter evidence

A direct scan of the original main career router confirms that **all twelve ordinary original jobs use a 50-visit/work milestone for their Sinner's Orb career-ending opportunity**:

- Camwhore: `camwhoreVisit >= 50`;
- Guard: `wallVisits >= 50`;
- Gloryhole: `gloryHoleVisit >= 50`;
- Maid: `hotelVisit >= 50`;
- Cosplay: `cosplayVisit >= 50`;
- Farmer: `zombieVisit >= 50`;
- Mascot: `mascotVisit >= 50`;
- Model: `modelVisit >= 50`;
- Cabaresque: `cabaresqueVisit >= 50`;
- Geisha: `geishaVisit >= 50`;
- Prostitute: `prostituteVisit >= 50`;
- Arm Candy: `armCandyVisit >= 50`.

The same router confirms a broad intermediate-pacing pattern:

- Camwhore: 15 before 50;
- Guard: 15 and an additional 30-visit check before 50;
- Gloryhole: 15 before 50;
- Maid: 15 before 50;
- Cosplay: 5, 10 and 15 checks before 50;
- Farmer: 15 before 50;
- Mascot: 15 before 50;
- Model: 15 before 50;
- Cabaresque: 5, 10 and 15 checks before 50;
- Geisha: 15 before 50;
- Prostitute: 15 before 50;
- Arm Candy: 15 before 50.

These counters do not mean every milestone is a guaranteed standalone scene; route flags and other conditions can also gate the event. They do establish the original pacing skeleton.

Historical design implication only:
- 50 is a final career anchor;
- authored progress before 50 is intentional;
- successor Hard Work=50 remains Product authority for its own reasons, not because the original used the same number.

## Original ending / Meta reward examples — exact historical evidence

The original ending/bonus selection data confirms several distinct reward families.

Representative exact reward shapes:

### Ordinary/repeat-career style

- Prostitute career ending: **+5 Fuckability + unlock Prostitute job**.
- Arm Candy career ending: **+5 Sociability + unlock Arm Candy job**.
- Geisha career ending: **+5 Class + unlock Geisha job**.
- Mascot career ending: **+5 Creativity + unlock Mascot job**.
- Cosplay career ending: **+5 Creativity + unlock Cosplay job**.
- Cabaresque career ending: **+5 Fuckability + unlock Cabaresque job**.
- Modeling career ending: **+3 Charisma +3 Durability + unlock Modeling job**.
- Gloryhole career ending: **+5 Fuckability + unlock Gloryhole job**.

### Stronger rule-changing/story rewards

Verified examples include:

- **+1 daily Stamina**;
- **+$2,000 / +$4,000 / +$6,666 starting money** depending on ending;
- **+$200 automatic daily income**;
- **disable rent payments**;
- **import 1/4 of most stats from previous game**;
- start with specific equipment;
- start with specific spells/moves;
- start with all three dungeons unlocked;
- set starting year to zero;
- large one-time stat packages such as +20 to most stats.

This is historical design evidence only. It supports separating:
- dependable career-completion rewards;
- stronger route/rule-changing rewards.

It does **not** authorize any exact successor reward magnitude.

### Selectable activation evidence

User clarification about the original: **all earned ending bonuses can be toggled on/off independently** for the new run.

Recovered per-bonus code is consistent with that model. For example:
- selecting the original Prostitute reward applies its stat bonus, sets its early-job unlock trigger, and increments the active-bonus counter;
- deselecting it reverses the stat bonus, clears the early-job trigger, and decrements the active-bonus counter.

This ending-bonus selection layer is **not the same thing as Titles**.

The successor's exact New Start+ rules are still governed by current Product authority; D22 independently allows any subset of earned ordinary Hard Work packages.

## Original late-game sink / stat-swap evidence

Recovered Carla/Title-shop presentation confirms:

Purchasable basic Titles:
- Yoo-Hoo: +1 Charisma after apartment sleep — 15,000;
- Neat Freak: +1 Cleanliness after apartment sleep — 15,000;
- Tits for Days: +1 Fuckability after apartment sleep — 20,000;
- Gossip Girl: +1 Sociability after apartment sleep — 15,000;
- Life of the Party: +1 Class after apartment sleep — 15,000;
- Artiste: +1 Creativity after apartment sleep — 15,000.

The same service provides a lossy stat exchange:
- ratio explicitly stated as 2:1;
- UI offers 1 / 2 / 3 points received for 2 / 4 / 6 points spent;
- minimum-source-stat checks correspond to those 2 / 4 / 6 costs.

Historical implication only: the original has substantial late-game money/stat sinks that help explain why its raw job wages can be much higher than successor values.

## Original Title effect catalog — balance reference

Recovered Title descriptions confirm a separate one-active-Title system.

Apartment-sleep stat Titles:
- +1 Charisma;
- +1 Cleanliness;
- +1 Fuckability;
- +1 Sociability;
- +1 Class;
- +1 Creativity;
- +1 Strength;
- +1 Durability;
- +1 Prowess;
- +1 Intellect;
- +1 Spirit.

Broader/specialized Titles:
- Busy Bee: +1 to the daily Stamina pool;
- Buff as Fuck: +20% total HP;
- Mentalist: +20% total MP;
- Combat Vet: +30 Strength while in combat;
- Come At Me: +30 Durability while in combat;
- Knife Fighter: +30 Prowess while in combat;
- The Wiz: +30 Intellect while in combat;
- Spiritual Leader: +30 Spirit while in combat;
- Blimp Enthusiast: chance to summon a guardian spirit at combat start;
- Immunologist: total immunity to status ailments.

This exact list reinforces the user's balance criticism: +1 daily Stamina is broadly useful across almost every day/system, while most alternatives are conditional or narrow.

Do not port these Titles as a successor feature by default.

### Exact Stamina stacking evidence

Direct bytecode from the original new-day flow confirms the two layers stack:

1. daily Stamina is first set/raised using the persistent `staminaBoost` value from selected ending bonuses;
2. the flow then separately checks `activeTitle == "busyBee"`;
3. Busy Bee adds another **+1 Stamina**.

So an enabled +1-daily-Stamina ending reward and the Busy Bee Title can both contribute in the same run.

Direct bytecode from the apartment/home sleep scene separately checks one `activeTitle` identity and applies +1 to the corresponding stat (Charisma/Cleanliness/Fuckability/Sociability/Class/Creativity/Strength/Durability/Prowess/Intellect/Spirit).

This is historical evidence of a balance hazard, not a system to port.

## Original Plus Mode and Titles — user clarification

This section records user-provided clarification about the original game's structure; it is not a successor implementation requirement.

- The original has a separate **Plus Mode** where jobs/progression change and the route leads toward the original true ending.
- The successor is not currently porting that structure; Palace is the successor True Ending path.
- All earned original ending bonuses can be independently enabled/disabled for a new run.
- **Titles are separate** from those ending bonuses.
- Title examples include narrow nightly stat growth and a much stronger +1 daily Stamina/Energy effect.
- The user identifies the obvious balance failure: +1 daily Energy is broadly superior to many narrow Titles, making those alternatives unattractive.

Research implication: if the successor later creates any title-like strong-modifier layer, do not reproduce a set where one universal action-economy option trivially dominates the rest.

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
