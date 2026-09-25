# Simply Mindy — verified new-run / meta-start flow

Источник: SceneEvents_73 (statChoose), SceneEvents_72 (achievements) и ActorEvents_545 (run reset).

## 1. Reset before a new cycle

ActorEvents_545 contains a large click-handler that resets the current run and then switches directly to scene 73 (statChoose).

Verified core defaults written by this reset:

- day = 1
- year = 1
- stamina = 3
- money = 600
- Charisma = 1
- Strength = 1
- Durability = 1
- Prowess = 1
- Intellect = 1
- Spirit = 1
- Fuckability = 1
- Cleanliness = 1
- Creativity = 1
- Sociability = 1
- Class = 1
- HP = 0
- HP Max = 0
- MP = 0
- MP Max = 0

The same routine resets hundreds of run-specific quest flags, visit counters, sex counters, job triggers, dungeon states and Finale counters.

Important: it resets staminaBoost = 0, finaleMode = false, finaleBonusCount = 0, finaleKeyCount = 0 and endingSet = "".

## 2. What the reset intentionally does NOT reset

The reset routine does not write to:

- ending flags (endTimesUp, endFarmer, etc.)
- endGot
- titlesList
- activeTitle
- statBoost
- disableRent
- 4ContestBonusStats
- morality

This is the persistence boundary: most run-state is erased, while ending/meta state and selected long-term unlock structures live outside the normal run reset.

Caution: disableRent not being reset may create persistence quirks because it is also toggleable from the achievement bonus screen. Do not assume the behavior is perfectly clean; the code simply confirms it is absent from this reset routine.

## 3. Starting stat allocation

SceneEvents_73 initializes local pointPool = 10.

The Reset Points action sets all eleven normal stats back to 1 and pointPool back to 10.

Each stat button:
- only works while pointPool >= 1;
- spends exactly 1 point;
- adds exactly +1 to that stat.

So before meta bonuses, the player distributes 10 extra points across 11 stats that all begin at 1.

Morality is separate and is not part of this point pool.

## 4. Morality is rebuilt from persistent endings

When statChoose initializes:

- morality is explicitly set to 0;
- selected "good" ending flags add +10 Morality each.

Verified +10 checks include:
- endJohnChemist
- chicoPenitentEnding
- endLandLadyFusion
- endShutterBugBoss
- endJerry
- endTaroSheDevil
- endFrogLordMarry
- endJizzBizHelp
- endSkullyKilledLilD

There is also a combined block involving the simple job endings. This is the mechanism behind Final Mode eligibility.

## 5. Leaving statChoose

When the player confirms the stat allocation:

- if endGot == false -> scene 8 (introScene01);
- if endGot == true -> scene 72 (achievements).

So the achievement/meta-bonus selection screen is skipped on a truly fresh profile and inserted into the flow once endings exist.

## 6. Achievement bonus screen

Scene 72 does not just display endings. Each obtained ending has an enable/disable handler.

When a bonus is enabled, the handler immediately mutates the current run state:
- adds stats or money;
- unlocks Titles/jobs/items/spells;
- changes staminaBoost/year/disableRent/etc.;
- increments finaleBonusCount.

When disabled, the handler reverses the corresponding mutation and decrements finaleBonusCount.

There is an "Enable All Bonuses" control. Its actor is checked as an alternative trigger inside the individual ending handlers, so one click activates every eligible bonus during the same update cycle.

This means meta-progression is explicitly loadout-like: earned bonuses exist persistently, but the player chooses which ones to apply to the upcoming run.

## 7. Final Mode gate

On the achievement screen, pressing Start checks morality.

Bytecode threshold:
- morality >= 50 -> show choice between Finale and Normal;
- morality < 50 -> start a normal run directly.

The UI text says "more than 50", but the actual comparison is >= 50.

Choosing Finale:
- switches to scene 335 (finaleIntro01);
- sets finaleMode = true.

Choosing Normal:
- switches to scene 8 (introScene01).

## 8. Carry-over bonus: Game Theorist

The main scene continuously stores a snapshot array named 4ContestBonusStats.

For ten major stats it writes:

ceil(currentStat / 4)

Verified saved order:
0 Charisma
1 Intellect
2 Strength
3 Durability
4 Prowess
5 Spirit
6 Cleanliness
7 Fuckability
8 Sociability
9 Class
10 Creativity

The Game Theorist achievement bonus (endContest4Win) reads this preserved array and ADDS those stored values to the freshly reset stats.

So the guide's "imports 1/4th of most stats" is accurate, with an important implementation detail: each quarter is rounded upward with Math.ceil.

## 9. Extra-year bonus

gasparButlerEnding bonus text says "Sets the starting year to zero."

The click handler confirms:
- enable -> year = 0
- disable -> year = 1

Since a normal year is 40 days, this effectively adds one full extra year / 40 days to the ordinary run.

## Architectural model

The new-cycle pipeline is:

persistent meta state
-> run reset
-> base stats = 1 / money 600 / stamina 3 / year 1
-> allocate 10 stat points
-> rebuild Morality from endings
-> choose earned achievement bonuses
-> optional Final Mode decision
-> intro / main cycle

This separation is one of the most useful structural ideas in the original: resettable run-state and persistent meta-state are deliberately different layers.
