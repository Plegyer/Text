# Simply Mindy — verified elemental equipment system

Источник: SceneEvents_50 equipment UI + SceneEvents_44 physical attack / monster elemental attack logic.

## 1. Collected element arrays

Sword elements:
`ItemSwordElements[0..3]`

Mapping:
- 0 wind
- 1 earth
- 2 fire
- 3 water

Armour elements:
`itemArmourElements[0..3]`

Same mapping.

Currently selected elements are stored in:
`equipElements`

- `equipElements[0]` = sword element
- `equipElements[1]` = armour element

## 2. Sword-element selection works

Scene 50 has clickable handlers for the four sword elemental icons.

If the corresponding component has been acquired:
- clicking an element sets `equipElements[0]` to that element;
- clicking the currently equipped element again sets it to `none`.

Only one sword element can therefore be active at a time.

## 3. Sword elemental damage cycle

For physical attack damage:

### 1.5x damage
- water sword vs fire monster
- fire sword vs earth monster
- earth sword vs wind monster
- wind sword vs water monster

### 0.5x damage
- fire sword vs water monster
- earth sword vs fire monster
- wind sword vs earth monster
- water sword vs wind monster

Other combinations have no elemental multiplier in this handler.

The combat UI also sets a weak/not indicator when these relationships trigger.

## 4. Armour-element combat code exists

Incoming monster elemental damage reads `equipElements[1]`.

Verified modifiers:

### 1.5x incoming damage
- water armour vs fire attack
- fire armour vs earth attack
- earth armour vs wind attack
- wind armour vs water attack

### 0.5x incoming damage
- fire armour vs water attack
- earth armour vs fire attack
- wind armour vs earth attack
- water armour vs wind attack

So the armour element was clearly intended to be a defensive elemental choice.

## 5. But armour-element equipping appears broken/unimplemented

Scene 50 correctly:
- displays all four acquired armour elemental components;
- has descriptions for them;
- combat code reads `equipElements[1]`.

However, an exhaustive scan of all main-ABC methods that write into the `equipElements` array finds only:

1. run reset:
   - equipElements[0] = none
   - equipElements[1] = none

2. Scene 50 element-click handler:
   - writes ONLY `equipElements[0]` for the sword.

No runtime setter for `equipElements[1]` was found outside reset.

Therefore in the inspected version, armour elemental effects appear to be present in combat code but unreachable through the normal UI because the armour element is never actually equipped.

This looks like an unfinished/bugged subsystem rather than evidence that armour elements do nothing conceptually.

## 6. Architecture lesson

The original separates:
- permanent acquisition of an elemental component;
- currently equipped element;
- monster's current element;
- outgoing attack multiplier;
- incoming defence multiplier.

For a successor this is a clean data model, but the UI should use one explicit equip path for both weapon and defence elements so half the system cannot silently become unreachable.
