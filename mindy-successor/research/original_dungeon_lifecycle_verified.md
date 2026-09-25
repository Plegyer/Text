# Simply Mindy — verified dungeon expedition lifecycle

Источник: SWF bytecode SceneEvents_0, 42, 44, 50, 104, 105, 205, 206, 412 + dungeon HUD actors.

## 1. Hub -> dungeon

Main requires Stamina > 1 before allowing entry. User-facing behavior is treated as a 2-action entry requirement/cost.

Important implementation nuance: in the inspected main click handler the check is explicit, but the literal subtraction of 2 is not in the same branch. Exact implementation path is still being traced. Do not reinterpret this as "entry is free".

When main/hub initializes, it sets:
- stepCount = 0

Therefore every fresh departure from the hub starts a new dungeon-day clock.

## 2. Dungeon-day clock

The global `stepCount` is the expedition clock.

Walking increases:
- stepCount += 1
- local _randomWalk += 1

Dungeon clock HUD divides stepCount into 9 display phases:
0–50, 51–100, 101–150, 151–200, 201–250, 251–300, 301–350, 351–400, >400.

The player's rough morning/day/evening/night description corresponds to this finer-grained internal clock.

## 3. Time-of-day affects the map itself

Multiple dungeon map handlers compute darkness/fade from stepCount.

Observed pattern in several scenes:
- black/background overlay alpha is derived from a fraction of stepCount, e.g. stepCount / 6 / 100 under specific season/state conditions.

Therefore time inside a dungeon is not only a HUD clock. Walking toward evening/night can gradually alter environmental lighting.

This is separate from seasonal map variants.

## 4. Reaching the end of the dungeon-day

At roughly stepCount >= 400, dungeon maps:
- disable movement;
- stop player velocity;
- show a shock/end-of-day state;
- set Stamina = 0 in the observed forced-timeout branch;
- display "Time for sleep!";
- after about 1.5 s return to main.

Important: this is the forced end of a dungeon-day when the clock is exhausted, not the normal Camp action.

## 5. Camp extends the expedition across global days

Scene 50 dungeon status menu has a dedicated:
`Camp (A)`

Camp switches to scene 412.

Camp scene:
- day += 1
- newDay = true
- stepCount = 0
- preserves location information so the player can return to the same dungeon area if still able to continue.

Good sleep:
- Stamina += 1
- HP += 50% of HP Max
- MP += 50% of MP Max
- clamp HP/MP to maxima
- continue expedition

Bad sleep:
- Stamina -= 1
- in non-Finale mode, pick one of 12 night-event actor variants
- if Stamina <= 0, expedition ends and the player is sent home
- otherwise continue expedition

So Camp is the mechanism that lets a single expedition span several GLOBAL calendar days.

## 6. Voluntary Escape Dungeon

Dungeon status scene has a separate Escape Dungeon action.

Its handler explicitly:
- sets global Stamina = 0
- switches back to scene 0 (main)

Thus voluntarily abandoning the expedition burns the remainder of the current outer-day action resource instead of letting the player leave with leftover actions.

This helps explain why dungeon behaves as a semi-committed activity even though its internal combats do not individually consume normal overworld action points.

## 7. Random encounters use a second movement counter

Each dungeon map has local `_randomWalk`.

Walking advances both:
- global stepCount = dungeon time
- local _randomWalk = current encounter meter

Typical encounter windows:
- normal: about 30–45 movement increments
- with Seductive Perfume: about 15–20
- with Bracelet of Fuck Off: random encounters are disabled

After combat the map reloads:
- _randomWalk starts over
- stepCount persists

Hence many battles can occur in one dungeon-day while the global clock continues to advance.

## 8. Defeat and expedition endurance

Central combat result code shows no universal "every battle costs Stamina" rule.

Ordinary defeat/sexual-loss result:
- generally Stamina -= 1
- HP is often reset to a minimal survivable state such as 1 before returning

Special monster/boss/route outcomes:
- some set Stamina = 0 immediately
- some route to unique story scenes instead of ordinary map return

Observed special monsterRandomPick IDs in zero-Stamina/special handling include several boss/quest encounters rather than the normal random-enemy flow.

Therefore the correct high-level rule is:
- ordinary wins: no universal Stamina cost
- ordinary losses: usually -1 expedition Stamina
- special defeats/story outcomes: may wipe Stamina or force a route transition

## 9. Resource model

Technically SWF reuses the global `stamina` attribute in dungeon HUD and result logic.

Semantically it behaves as two modes:
- overworld: daily action budget
- dungeon: expedition endurance / defeat tolerance

The same storage variable changes meaning when entering the nested game loop.

For a successor implementation, these should probably be separate variables even if the original reused one, to avoid hidden coupling.

## 10. Lifecycle summary

Hub
-> meet/pay dungeon entry requirement
-> stepCount=0 fresh expedition day
-> explore: movement advances time + encounter meter
-> many encounters/quests possible
-> defeats reduce expedition endurance
-> time-of-day gradually changes map lighting
-> choose Camp to advance global day and continue expedition
OR
-> choose Escape to set outer Stamina to zero and return home
OR
-> hit exhaustion/time/forced outcome and return home

This is a self-contained expedition loop nested inside the ordinary life-sim calendar.
