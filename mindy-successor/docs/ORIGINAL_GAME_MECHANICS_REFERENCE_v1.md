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

## Confirmed original defaults

Calendar / economy:
- `year = 1`;
- `day = 1`;
- `money = 600`;
- `stamina = 3`;
- `staminaBoost = 0`.

The original game exposes twelve global attributes that initialize at **1** and appear to form its main progression-stat set:

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

This is historical evidence only. Do **not** automatically map these one-to-one onto the current 12-stat model.

## Lust warning

There is **no confirmed global game attribute named `lust`** in the extracted original `game.mbs` attribute table.

The original behavior/string data does contain Lust-related identities such as:
- `mindyLustyCount`;
- `lustyGo`.

It also contains the separate global original attribute:
- `fuckability = 1`.

Do not equate `fuckability` with the current project's separate Lust axis without further behavioral evidence.

## Other confirmed original systems/identities

The behavior/string tables expose original identities including:
- School / `schoolPick`;
- job selection / `jobSet`, `NewJobTriggers`, `killJobs`;
- rent / `rentStat`, `rentAmount`, `noRentCount`;
- money / `moneyEarned`, `moneyMade`;
- Prostitute / `prostituteTrigger`, `prostituteVisit`, `endProstitute`;
- Geisha, Farm, Maid, Guard and Camwhore ending/event families.

These names prove the systems exist in the original but do not by themselves establish exact formulas or thresholds.

## Current extraction priorities

Next passes should recover, in order:
1. job pay/stat-change formulas;
2. School prices/stat changes;
3. rent/economy numbers;
4. Prostitute and poverty-like route thresholds;
5. exact meaning/use of `fuckability`, `mindyLustyCount`, and Lust-related flow;
6. original ending/job unlock thresholds.

Only verified values should be promoted from this reference into current balance proposals.
