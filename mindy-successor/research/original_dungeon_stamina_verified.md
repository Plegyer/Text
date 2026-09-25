# Simply Mindy — verified dungeon Stamina behavior

Источник: SceneEvents_0, dungeon map scenes (42 etc.) and dungeon01Combat (44).

## Entry requirement

Main scene displays:
"Mindy needs two or more Stamina to enter a dungeon!"

The bytecode checks:
- stamina <= 1 -> deny entry;
- stamina > 1 -> switch to the selected dungeon.

There is no Stamina subtraction in the successful dungeon-entry branch.

Therefore dungeon entry itself is NOT a fixed 3-Stamina purchase.

## Inside the dungeon

Combat result handlers in SceneEvents_44 contain:
stamina = stamina - 1

Dungeon map scenes check Stamina against zero.

In dungeon01Brimstone:
- when stamina <= 0, 4 Way Movement is disabled;
- velocity is set to zero;
- a shock animation/state is triggered;
- after 1500 ms, the game switches back to scene 0 (main).

Equivalent stamina-aware logic exists across the later dungeon maps.

## Practical interpretation

With the normal 3-Stamina day:
- player can enter because 3 >= 2;
- dungeon does not consume Stamina just for walking through the entrance;
- relevant combat resolution consumes Stamina;
- exhausting the resource to zero ends the expedition automatically.

This explains why the walkthrough describes a dungeon trip as needing 3 Stamina: in normal play a fresh day gives 3 and an expedition can consume that pool. But the code-level rule is "minimum 2 to enter; Stamina is spent inside", not "pay 3 on entry".

## Successor relevance

For the new game, if a large activity should cost exactly 2 energy, implement that explicitly. Do not inherit this dungeon-specific endurance-pool behavior accidentally.
