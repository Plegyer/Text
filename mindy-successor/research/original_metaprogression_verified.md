# Simply Mindy — structural metaprogression verified from SWF

## 66 selectable ending bonuses

SceneEvents_72 contains exactly 66 independent ending bonus entries. Each obtained ending can be enabled or disabled before starting the next run. Enabling a bonus immediately changes the freshly reset run-state and increments finaleBonusCount; disabling reverses the change.

This is not a single permanent skill tree. It is a configurable pre-run loadout built from endings the player has earned.

## Four layers of persistence

The original separates persistent power into at least four systems:

1. Ending completion flags — permanent proof that an ending has been earned.
2. Achievement bonuses — selectable pre-run modifiers, many can be active together.
3. Titles — unlocked persistently, but only one activeTitle is equipped at once.
4. Special hidden/global upgrades such as statBoost.

## Rule-changing bonuses

Verified high-impact examples:

- chicoPenitentEnding: +1 daily Stamina through staminaBoost.
- endContest5Win: +1 daily Stamina through staminaBoost.
- endShutterBugBoss: unlocks Busy Bee Title; when equipped, Busy Bee adds a separate +1 Stamina at new day.
- endLandLadyJob: disableRent = true.
- endContest4Win: imports ceil(previousStat / 4) from the previous run snapshot.
- gasparButlerEnding: sets starting year to 0 instead of 1, effectively adding 40 days.
- endJizzBizBand: supplies $200 every day.
- endEmmWarrior: starts with all three normal dungeons unlocked.

Therefore the original can reach base 3 + 2 from stackable achievement stamina bonuses + 1 from the equipped Busy Bee title = 6 effective Stamina for a day, before any other temporary effects. The title point is important: the third +1 is not the same kind of permanent bonus as the two staminaBoost endings.

## The "worked a lot" endings form a recognizable family

There are 12 simple profession endings whose bonus descriptions are based on doing the job a lot:

- Camwhore -> endCamWhore
- Maid -> endMaid
- Farmer -> endFarmer
- Guard -> endGuard
- Glory Hole -> endGloryhole
- Cosplayer -> endCosplay
- Bikini Model -> endModel
- Cabaresque -> endCabaresque
- Prostitute -> endProstitute
- Arm Candy -> endArmCandy
- Geisha -> endGeisha
- Mascot -> mascotEnding

For the four early jobs, their bonuses improve stats/equipment because the jobs are already available at the start.

For the eight normally locked jobs, the simple-job ending bonus explicitly unlocks that job at the beginning of future runs:
- Glory Hole
- Cosplayer
- Bikini Model
- Cabaresque
- Prostitute
- Arm Candy
- Geisha
- Mascot

So the user's proposed successor rule "Hard Work endings eventually unlock the 11th profession" is a meaningful evolution of an existing structural idea rather than a direct copy: the original uses simple-work endings mainly to remove future job availability gates one by one.

## Meta power has a cost in Final Mode

Every enabled ending bonus increases finaleBonusCount. Finale combat reads finaleBonusCount and scales some enemy/final-boss behavior with it.

So "enable everything" is not purely free power in the late challenge mode. The same pre-run loadout variable that counts bonuses is also used by the challenge layer.

## Hidden stat-cap route

The endMoeLose entry deliberately claims its bonus "Does... nothing?" The bonus path activates a hidden state used by a later secret chest/event; that event sets statBoost=true. Main stat clamping then raises the cap from 100 to 200.

This upgrade is therefore intentionally indirect:
ending bonus -> hidden condition -> secret interaction -> permanent rule flag.

## Successor relevance

Useful abstractions, without copying rewards verbatim:

- minor ending: starting resources/stat specialization;
- profession ending: future availability change;
- major ending: action economy or time-limit change;
- system ending: carry-over or rule modifier;
- secret ending chain: hidden persistent upgrade;
- optional challenge mode: stronger pre-run loadout can also strengthen the challenge.

The successor does not need 66 bonuses. What matters is preserving the difference between "more numbers" and "different rules".
