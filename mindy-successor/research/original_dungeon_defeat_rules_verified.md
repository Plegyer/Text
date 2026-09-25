# Simply Mindy — verified dungeon defeat / endurance rules

Источник: dungeon01Combat bytecode and dungeon status/camp scenes.

## No universal combat tax

A previous interpretation incorrectly treated combat as costing ordinary daily Stamina.

The inspected combat result handlers show the opposite:
- ordinary victory branches do not share a generic Stamina deduction;
- ordinary defeat/sexual-loss branches usually apply Stamina -= 1;
- special outcomes can set Stamina = 0.

This is why one expedition can contain many fights.

## Generic loss pattern

One central loss handler:
- restores/sets HP to a small survivable value;
- checks monsterRandomPick;
- for a special set of monster IDs, sets Stamina = 0 / routes to special logic;
- otherwise subtracts exactly 1 Stamina.

A second sexual/loss result handler follows the same architecture with additional unique monster-specific routes.

## Special losses

Dedicated quest/boss outcomes can bypass the generic -1 and immediately:
- set Stamina = 0;
- switch into a conversation/story scene;
- or terminate/redirect the current dungeon segment.

Aember-related combat paths are a concrete example: special win/loss route code zeros Stamina before switching into the corresponding conversation flow.

## Panties interaction

The guide describes Panties as allowing random-monster combat to end through sex without losing HP or Stamina.

SWF contains explicit accessory checks for panties around relevant sex-result handling and excludes special monster IDs from the ordinary protection logic.

The guide also reports a bug where Stamina may still be deducted despite Panties. Treat that as an implementation defect, not the intended rule.

## Architectural conclusion

Dungeon Stamina is primarily:
- a buffer against bad outcomes;
- a limiter on how long the player can survive setbacks;
- a value modified by overnight Camp.

It is NOT a per-fight action point meter.
