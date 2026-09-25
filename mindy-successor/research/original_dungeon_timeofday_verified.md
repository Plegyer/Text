# Simply Mindy — dungeon time-of-day: verified scope

Источник: exhaustive scan of all main-ABC methods that reference global `stepCount`.

## What stepCount actually controls

Across the inspected normal dungeon scenes, `stepCount` is used for four verified purposes:

1. Dungeon clock HUD
   - 0–50 -> frame 0
   - 51–100 -> frame 1
   - ...
   - 351–400 -> frame 7
   - >400 -> frame 8

2. Movement time
   - walking increments stepCount.

3. End-of-dungeon-day
   - around 400, movement is stopped and the dungeon day is forced to end.

4. Environmental darkness
   - several map scenes derive black/background layer alpha from stepCount, sometimes conditional on season/quest state.

## What was NOT found

The exhaustive main-ABC scan found no ordinary random-enemy table keyed directly to stepCount ranges and no broad "morning enemies / afternoon enemies / night enemies" switch.

The normal enemy selection uses dungeon/region pools.

Therefore current evidence supports this distinction:

- time of day -> clock, lighting, expedition deadline/rest rhythm;
- season -> route geometry, environment, fixed/special enemy availability, NPC/actor population;
- region -> generic random enemy pool;
- quest flags -> additional named/special encounters.

There may still be isolated scene-specific time events elsewhere, but they are not part of the central generic dungeon encounter system.

## Important interpretation

The user's description of a morning/day/evening/night timer is correct as the gameplay rhythm.

But enemy variation should not currently be attributed to time-of-day unless a specific event is separately verified. The confirmed broad enemy/world variation is seasonal.
