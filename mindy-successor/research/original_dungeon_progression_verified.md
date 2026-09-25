# Simply Mindy — verified dungeon access and progression gates

Источник: SWF bytecode SceneEvents_0, SceneEvents_45, SceneEvents_59, SceneEvents_105.

## 1. First dungeon unlock

The main hub has an automatic trigger for the first dungeon introduction.

Actual bytecode condition:
- Strength >= 12
- Durability >= 15
- doneDungeonIntro == false
- not in Finale Mode
- endingSet is still empty

When true, the game switches to scene 45.

SceneEvents_45 immediately sets:
- doneDungeonIntro = true

So the walkthrough's "15 Strength and 15 Durability" is only approximate. The code-level Strength threshold is 12, while Durability is 15.

## 2. Dungeon selection on main

The main dungeon selector uses progression flags rather than player level:

- Dungeon 1 is available after doneDungeonIntro.
- Dungeon 2 is offered after doneDungeon02Intro.
- Dungeon 3 is offered after doneDungeon03Intro.
- Finale uses separate dungeon routing.

Each selected normal dungeon still checks the Stamina entry requirement before switching to its map.

## 3. Dungeon 1 -> Dungeon 2

Inside Dungeon 1 indoor/church scene (SceneEvents_59), an interaction callback checks collision with actor 218 and hotKeyA.

On activation it:
- sets local treasure/open feedback state;
- sets doneDungeon02Intro = true.

A notification renderer in the same scene displays:
"Unlocked DirtFeast! (The second dungeon!)"

So the "red orb/globe unlocks Dungeon 2" walkthrough description corresponds to a direct persistent progression flag in code.

## 4. Dungeon 2 -> Dungeon 3

Inside Dungeon 2 indoor scene (SceneEvents_105), another interaction callback checks actor 243 + hotKeyA.

On activation it:
- sets local treasure/open feedback state;
- sets doneDungeon03Intro = true;
- fades a nearby actor/object as part of the interaction.

The scene's notification layer displays:
"Unlocked Mt. Ruin! (The third dungeon!)"

Again, dungeon progression is a persistent world flag rather than a level requirement.

## 5. Progression architecture

The first dungeon is stat-gated.
Later dungeons are exploration/object-gated.

That gives a clean progression shape:

overworld stat development
-> unlock first dungeon
-> explore Dungeon 1 and find key world object
-> unlock Dungeon 2
-> explore Dungeon 2 and find key world object
-> unlock Dungeon 3

This is why the dungeon system is connected to the life-sim without requiring every later dungeon to demand ever-higher overworld stats.

## 6. Separate route gates inside unlocked dungeons

Unlocking a dungeon does not mean every area inside it is always reachable.

Season, quest flags, coordinates and nextDest are checked independently for sub-area routing. Examples already verified:
- Dungeon 1 northern cave branch uses Darkly-only routing.
- Dungeon 3 Cloud/ChrBeast route uses Megahot-only routing.
- Dungeon 2/3 actor populations and interactables change by season.

So progression has two levels:
1. macro unlock: can enter the dungeon at all;
2. micro gates: which parts/events of that dungeon exist right now.
