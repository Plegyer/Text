# Simply Mindy — verified dungeon status / inventory / equipment loop

Источник: SWF bytecode SceneEvents_50 (itemScreen), SceneEvents_44 combat init/result logic, dungeon movement scripts.

## 1. Status screen is a free expedition pause

Scene 50 is the dungeon `itemScreen`.

It displays:
- current HP / HP Max
- current MP / MP Max
- 7 basic consumable stock counts
- weapons, armour, elemental components and accessories
- Back (S)
- Camp (A)
- Escape Dungeon

Important: the normal item-use/equipment handlers in Scene 50 do NOT write to:
- stamina
- stepCount
- day
- money

Only the dedicated Escape handler writes stamina=0, and Camp routes to the separate overnight scene.

Therefore healing, changing sword/armour/accessories and inspecting gear are effectively free with respect to dungeon time and expedition endurance.

This is a major reason one expedition can support many battles: the player can pause between encounters, heal from inventory and reconfigure equipment without advancing the dungeon clock.

## 2. Seven out-of-combat HP/MP consumables

`itemStocks[0..6]`:

| Index | Item | Effect |
|---:|---|---|
| 0 | Lil D Patented Brew | restore 10% HP Max |
| 1 | Perk-Me-Up | restore 20% HP Max |
| 2 | Relatively Restorative | restore 40% HP Max |
| 3 | Get Gud | restore full HP |
| 4 | Mental Dribble | restore 20% MP Max |
| 5 | Brawny Brain | restore 40% MP Max |
| 6 | Full of Stars | restore full MP |

Partial restoration uses `round(Max * fraction)`, then clamps to Max.

Use consumes exactly one stock item.

The UI refuses use when:
- stock <= 0;
- relevant HP/MP is already full.

## 3. Weapons

Global `itemSword`:

- 0: no sword
- 1: Bronze Sword -> +30 combat Strength
- 2: Jade Sword -> +60 combat Strength
- 3: Gold Sword -> +90 combat Strength

Scene 44 confirms these are added to the combat physical-total rather than permanently modifying the underlying Strength stat.

The item screen lets the player change the equipped sword during an expedition without consuming stepCount/Stamina.

## 4. Armour

Global `itemArmour`:

- 0: none
- 1: Leather Armour -> +20 combat Durability
- 2: Steel Armour -> +40 combat Durability
- 3: Gold Armour -> +60 combat Durability

Again, these modify combat totals rather than the permanent base stat.

Armour can also be changed in the dungeon item screen with no expedition-time cost.

## 5. Exactly two accessory slots

The two equipped slots are:
- `accessory01`
- `accessory02`

The equip handler alternates target slot using `_accessoryFlip`.

It also prevents the same accessory from occupying both slots simultaneously.

So accessory choice is an actual two-slot build system, not a collection of passive effects that are all active at once.

## 6. Accessory catalogue and verified effects

### 0 — Speed Heels
UI description claims:
"Doubles Mindy's walking speed in dungeons."

Actual movement code:
- no heels: Speed = 40
- heels equipped: Speed = 60
- animation duration also changes 100 -> 75

So actual movement speed is 1.5x, not 2x. This is a text/code mismatch.

### 1 — Amulet of Muscles
+30 combat Strength.

### 2 — Pendant of Hips
+30 combat Prowess.

### 3 — Necklace of Abs
+30 combat Durability.

### 4 — Crown of Brain Cells
+20 combat Intellect
+20 combat Spirit.

### 5 — Seductive Perfume
UI: triples monster encounter rate.

Map encounter code moves the encounter window from roughly 30–45 movement counts to roughly 15–20. In practice it substantially increases encounter frequency.

### 6 — Purse of Many Things
Combat reward code checks either accessory slot and performs:
`moneyMade *= 2`

before adding the result to global money.

### 7 — Slimed Clock
UI claims:
"Slows the passage of time in dungeons."

An exhaustive scan of the main ABC finds the literal accessory key `clock` only in Scene 50 display/equip code. No runtime dungeon method checks `clock`, and no `clock + stepCount` behavior exists in the inspected ABC.

Therefore the promised time-slow effect appears unimplemented in this version.

### 8 — Bracelet of Fuck Off
Disables normal random encounters.

### 9 — Corset of Cheating
+30 to all five combat stats:
- Strength
- Durability
- Prowess
- Intellect
- Spirit

### 10 — ShroomHeirloom
+10 to the same five combat stats.

Its description also hints at a maze-specific function; that role should be treated separately from the combat stat bonus.

### 11 — Panties of SexyTimes
Intended effect:
- allow immediate sex outcome with normal enemies
- without losing HP or Stamina

Combat code contains dedicated panties checks and excludes special/boss IDs from ordinary handling.

The walkthrough reports a bug where Stamina can still be lost despite the item, so intended rule and actual buggy edge case should be kept separate.

## 7. Build consequences

Between battles the player can freely:
- heal HP/MP if stock remains;
- switch sword;
- switch armour;
- swap two accessories;
- change sword element.

This makes inventory stock and loadout choice part of expedition endurance even though the item-screen interaction itself does not consume dungeon time.

The dungeon therefore has at least three independent attrition axes:
1. expedition Stamina lost mainly through bad outcomes;
2. HP/MP consumed during fights and recoverable via finite item stocks/Camp;
3. stepCount as the expedition-day deadline.
