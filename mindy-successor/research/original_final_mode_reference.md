# Simply Mindy — Final Mode reference only

Purpose: understand how the original mutates its base systems. The successor's Final Mode/endgame will be redesigned completely and should NOT inherit this structure automatically.

Sources:
- SWF bytecode
- scene index
- walkthrough v3.5.0 for user-facing route sequence where noted

## Entry gate

[SWF]
The achievement/meta screen checks:
- morality >= 50

If true it offers:
- Finale
- Normal

Choosing Finale:
- finaleMode = true
- switches into finaleIntro01 (scene 335)

The UI says "more than 50 Morality", but bytecode comparison is >= 50.

Morality itself is rebuilt from persistent ending flags before this screen.

## Intro establishes a new ruleset

Scene index:
- 335–344 = finaleIntro01..10
- 347 = dungeon04Indoor
- 350+ = route-specific Finale scenes
- 369 = finalBattle
- 370 = gameOver
- 400 = moonEnding
- 401–408 = finaleEnding01..08

Scene 344 dialogue explicitly establishes:
- four keys/barriers
- 100 days
- no normal seasonal changes in the new desert scenario

This is important architecturally: Final Mode is not "continue normal game with a harder boss". It enters a bespoke state machine and partly replaces the normal world rules.

## 100-day deadline

[SWF]
Normal main logic has a Finale deadline path at day >= 100, routing to the failure/end scene.

The walkthrough likewise states that the player has 100 days.

Because normal mode uses a 160-day four-year structure, Finale is a different calendar contract.

## Four-key macro objective

[SWF]
Persistent fields:
- finaleKeys
- finaleKeyCount

Finale dungeon/route scenes repeatedly read/update these.

Scene 344 dialogue explicitly says four barriers require four keys.

Several later scenes increment finaleKeyCount or mutate finaleKeys when route objectives resolve.

Thus Final Mode replaces the normal "pick an ending route / Sinner's Orb" progression with a single macro-objective composed of four quest lines.

## Route-specific use of old systems

The scene index shows a sequence of bespoke Finale versions of familiar character/job routes:

- finaleCamwhoreIntro
- finaleGloryholeIntro
- finaleMaidIntro
- finaleArmCandyIntro
- finaleCosplayIntro
- finaleModelIntro
- finaleCabaresqueIntro
- finaleGeishaIntro
- finaleShirleyGaspar*
- finaleJohnJizzBiz*
- finaleSooChico*
- finaleSkullyPimpy*
- finaleTaroFight / finaleTaroAfter

So Final Mode reuses known characters/professions as ingredients in a new chain instead of simply replaying their normal career state machines.

This is a useful structural idea even if all content is replaced:
late mode can remix already-learned systems/characters under new constraints.

## Defeat becomes much harsher

[Guide]
Walkthrough states any combat defeat means Game Over.

[SWF]
The central combat code contains Finale-specific result branches, and scene 370 is explicitly named `gameOver`.

This is consistent with the guide, although the exact routing varies by special battle.

The design change is what matters:
normal dungeon treats defeat as endurance/resource loss;
Finale promotes defeat to run-level failure.

## Meta bonuses become difficulty input

[SWF]
Every enabled ending bonus increments:
- finaleBonusCount

Final battle code (SceneEvents_369) repeatedly reads finaleBonusCount when constructing/scaling the encounter.

Therefore the pre-run meta loadout is not only power for the player: its SIZE is also visible to the endgame difficulty system.

This prevents "enable every bonus" from being a completely one-directional choice in the challenge mode.

## Combat rules are also overridden

[SWF]
Normal combat SceneEvents_44 contains explicit `finaleMode` branches.

One verified example:
- elemental player spell damage receives an additional x1.5 in Finale Mode.

There are other Finale-specific battle branches as well.

Again, Final Mode is a ruleset mutation, not merely stronger enemy numbers.

## Finale-specific sleep

Scene index:
- 351 finaleFrogLordSleep
- 352 sleepFrog

Scene 352:
- advances day
- sets newDay
- restores/handles stamina
- reads finaleKeyCount
- applies title/daily style effects

So even Sleep gets its own Finale-specific implementation rather than blindly reusing normal sleepPaid.

## Dungeon04 / desert as bespoke challenge space

Scene 347 = dungeon04Indoor.

It contains:
- finaleDungeonScenes state array
- stamina logic
- finaleKeyCount updates
- many separate interaction callbacks
- its own routing/progression state

This behaves more like a scenario board/hub for the Finale quest than a normal seasonal dungeon.

## Final battle

Scene 369 = finalBattle.

It has its own large combat implementation rather than simply calling the ordinary SceneEvents_44 battle untouched.

It reads:
- finaleBonusCount
- Finale-specific combat state
- its own controls/items/spells

That means the original author considered the end battle different enough to duplicate/specialize major combat logic.

## Guide route summary — NOT independently fully verified step-by-step

The walkthrough describes a route through:
- Farm
- Wall
- Alley/other job routes
- Mascot
- desert dungeon
- Space
- multiple bosses
- ultimate boss

It also says normal school restrictions change in Final Mode and stats become more dependent on work.

Treat this detailed order as Guide-derived until each stage is individually traced in SWF.

## What is worth learning for the successor

Not the keys, desert, old characters, or boss sequence.

The useful concepts are:

1. Gate the late mode through persistent meta accomplishments.
2. Enter a clearly different ruleset.
3. Recontextualize systems the player already understands.
4. Give the mode a single visible macro objective.
5. Change failure conditions, not just enemy HP.
6. Let meta loadout influence challenge tuning.
7. Use bespoke scenes/state where the base loop no longer fits cleanly.

The successor can use those principles while having a completely different Final Mode premise and mechanics.
