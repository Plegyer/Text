# Simply Mindy — verified ending commitment / run-exit flow

Источник: SceneEvents_0, job SinnersOrb scenes (например SceneEvents_86), SceneEvents_65 (orbInsertEnding).

## Career ending is not immediate

The repeatable-job framework has a second common threshold at 50 visits.

Example: Camwhore handler:
- camwhoreVisit >= 50
- doneSceneCamwhoreSinnersOrb == false
-> launches camWhoreSinnersOrb scene.

Equivalent SinnersOrb scenes/flags exist for the profession family.

## The Orb is a commitment token

Inside camWhoreSinnersOrb, the UI explicitly asks:

"Should Mindy accept the Sinner's Orb? (WARNING: Once you accept the orb your ending is locked in!)"

If Yes:
- endingSet = "camWhore"

If No:
- endingSet is not set.

The scene then returns to main.

So a qualifying career state does not itself terminate the run. It offers a commitment object/decision.

## Main reacts to endingSet

SceneEvents_0 checks endingSet.

When endingSet != "":
- a main-screen action is labelled "Meet Mr. Moe";
- several still-unresolved route actions are guarded by endingSet == "", preventing certain competing ending paths from continuing.

The player therefore enters a committed/endgame state before actually ending the run.

## Mr. Moe / judgment scene

Scene 65 (orbInsertEnding) reads endingSet and branches into a judgment sequence.

For example:
- endingSet == "timesUp" -> timeout judgment;
- endingSet == "camWhore" -> Camwhore judgment;
- endingSet == "maid" -> Maid judgment;
- other endingSet values have corresponding branches.

Dialogue explicitly describes the Sinner's Orb as containing/summarizing the run's experiences and Mr. Moe as judging the resulting fate.

## Structural model

The original ending pipeline is roughly:

meet route conditions
-> obtain/accept ending token
-> endingSet locks route
-> return to hub in committed state
-> choose "Meet Mr. Moe"
-> central judgment router reads endingSet
-> ending-specific finale
-> ending achievement/meta state

This is much cleaner than hard-ending directly inside every job quest.

## Why it matters for the successor

The user's new game already needs a place where a run can be deliberately ended.

A useful abstract pattern to preserve is:
- careers/events can unlock a "claimable fate";
- claiming it locks the desired ending;
- the player still chooses when to go to a central run-exit location;
- one centralized ending router handles cleanup, ending award and transition to the next cycle.

The successor should use a different fiction/object/location, but the separation of eligibility, commitment and execution is mechanically strong.
