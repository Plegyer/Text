# Simply Mindy — verified combat-item system

Источник: SWF bytecode SceneEvents_44 item menu, item execution and post-item callbacks.

## 1. Combat has 11 itemStocks

The combat menu uses `itemStocks[0..10]`.

The first seven are the same HP/MP consumables available from the dungeon status screen.

| Index | Effect |
|---:|---|
| 0 | +10% HP Max |
| 1 | +20% HP Max |
| 2 | +40% HP Max |
| 3 | full HP |
| 4 | +20% MP Max |
| 5 | +40% MP Max |
| 6 | full MP |
| 7 | Fleestone: escape normal battle |
| 8 | Snake Oil: probabilistic status cure |
| 9 | Perfectly Panaceic: guaranteed status cure |
| 10 | Bucket of Water: reduces seduction-failure / SexyTimes buildup |

## 2. Healing item math

Indexes 0–6 use the same percentages as the out-of-combat item screen.

Partial heal:
`round(Max * fraction)`

Then clamp to Max and consume one stock.

## 3. Fleestone

If `_bossFight == true`:
- Fleestone is rejected.
- UI explicitly says it cannot be used during boss fights.

Otherwise:
- one Fleestone is consumed;
- combat routes back to the correct current dungeon scene.

Thus it is a normal-encounter escape item, not a universal boss escape.

## 4. Snake Oil

Snake Oil calls inclusive:
`randomInt(0,2)`

Failure occurs only on result 2.

Actual chance:
- cure succeeds: 2/3
- cure fails: 1/3

On success it clears the main negative combat states/counters including:
- poison
- lusty counter
- chastity counter
- mute
- ass-related counter

The item is consumed whether it works or not.

## 5. Perfectly Panaceic

Always clears the same status family and consumes one stock.

It is the reliable counterpart to Snake Oil.

## 6. Bucket of Water

Execution:
`seductionFailCount -= randomInt(1,4)`

Then clamp minimum to 0.

Because Stencyl randomInt is inclusive, this removes 1–4 points.

Consumes one stock.

## 7. Using an item consumes the combat turn

After an ordinary item-use sequence, SceneEvents_44 schedules a callback at roughly 900 ms that sets:
`_monsterAttack = true`

and triggers the monster-attack property handler.

So healing/status-item use is not a free combat action: after the item animation/resolution, the enemy receives its turn.

Fleestone is the obvious exception because successful use exits the battle.

## 8. Strategic role

The same item stock has two contexts:

Outside combat:
- healing/recovery is free in expedition time.

Inside combat:
- it can rescue the current fight immediately,
- but generally gives the enemy the next action.

That makes the item-screen pause and the combat item menu strategically different even though they draw from the same inventory.
