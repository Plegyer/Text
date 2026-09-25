# Simply Mindy — dungeon entry cost: code-level clarification

Источник: SceneEvents_0 clickDungeon handler + dungeon Escape behavior + user gameplay observation.

## User-facing/gameplay rule

User reports:
- entering a dungeon costs/requires 2 overworld energy;
- with less than 2 the game refuses entry;
- after entering, dungeon uses its own expedition rules.

This is preserved as the correct design-level description.

## Exact bytecode implementation

For Dungeon 1, 2, 3 and Finale entry, SceneEvents_0 performs:

`if stamina <= 1 -> show "Mindy needs two or more Stamina to enter a dungeon!"`

On success it switches scenes and sets coordinates/dungeon routing.

In that click handler there is NO literal:
`stamina -= 2`

This is now exhaustively confirmed from the full handler, not just a partial scan.

## Why the behavior still functions as an outer cost/commitment

The same global `stamina` storage is reused inside dungeon as expedition endurance.

Additionally:
- the player cannot return to normal hub activities mid-expedition as though the remaining actions were untouched;
- voluntary Escape Dungeon explicitly sets stamina = 0 before returning to main;
- forced dungeon-day exhaustion can also zero stamina.

So code-level implementation is closer to:

`require at least 2 outer Stamina -> commit the remaining daily resource to expedition mode`

rather than:

`subtract exactly 2 -> keep leftover overworld actions available`

This can produce the gameplay perception/rule "dungeon costs 2 energy" while avoiding a literal subtraction at entry.

## Successor lesson

For our game, do NOT reuse one variable for both meanings.

Use explicit variables, for example:
- overworldEnergy
- expeditionEndurance
- expeditionTime

Then entry can explicitly cost 2 overworldEnergy while internal failures/rest modify expeditionEndurance. This avoids the ambiguity present in the original code.
