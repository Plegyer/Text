# Simply Mindy — run reset persistence boundary

Compact verification note.

## Normal run reset definitely clears

Core:
- day, year, money, stamina
- all 11 normal stats
- HP/MP and maxima
- staminaBoost
- finaleMode
- finaleBonusCount
- finaleKeyCount
- endingSet

Progress:
- job visit counters
- career trigger flags
- quest state
- dungeon state
- night-partner counters
- many item/combat/run flags
- hundreds of other temporary fields

The inspected reset handler writes 363 unique game-attribute keys.

## Normal run reset does not touch

- individual ending completion flags
- endGot
- titlesList
- activeTitle
- statBoost
- disableRent
- 4ContestBonusStats
- morality

Morality is then rebuilt separately on statChoose.

## Why this matters

The original does not serialize meta progression as one giant "metaLevel" number. It leaves selected persistent structures outside the run reset and reconstructs the next run from them.

For a successor, this suggests a clean data split:

PersistentProfile:
- endings / achievements
- permanent unlocks
- unlocked titles/perks
- permanent rule modifiers
- previous-run snapshot data

RunState:
- day/year
- energy
- money
- stats
- job progress
- current quests/events
- temporary flags
- current run modifiers

Do not copy the original's accidental persistence quirks. The successor should make this boundary explicit in code/data.
