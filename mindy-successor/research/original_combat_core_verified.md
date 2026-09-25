# Simply Mindy — verified core combat mathematics

Источник: SWF bytecode SceneEvents_44.

## Combat totals

Base combat totals are derived from the five combat stats:
- Strength -> physical attack
- Durability -> physical defence
- Prowess -> hit/evasion
- Intellect -> magic attack
- Spirit -> magic defence

Equipment and Titles then modify these combat totals rather than necessarily changing the persistent base stats.

## Player physical attack — hit check

Player attack roll:
`MindyProwessTotal / 7 + randomInt(1,5)`

Enemy avoidance roll:
`MonsterProwess / 20 + randomInt(1,5)`

If player roll < enemy roll:
- _mindyAttackDamage = 0 (miss)

Otherwise the hit continues.

This heavily favours the attacker's Prowess because the attacker uses /7 and defender uses /20.

## Player physical damage

Before element multiplier:

`round(randomInt(1,20) + MindyPhysicalTotal * 1.5 - round(MonsterDurability * 0.5))`

Then sword-element matchup can multiply:
- advantageous -> x1.5
- disadvantageous -> x0.5

Finally damage is clamped to minimum 1 on a successful hit.

Element cycle:
- water > fire
- fire > earth
- earth > wind
- wind > water

Reverse relationships are resisted.

## Generic monster physical attack — hit check

Monster attack roll:
`MonsterProwess / 7 + randomInt(1,5)`

Mindy avoidance roll:
`MindyProwessTotal / 20 + randomInt(1,5)`

If monster roll < Mindy roll:
- attack damage = 0

Otherwise it hits.

So the same attacker/defender asymmetry is mirrored for monsters.

## Generic monster physical damage

`round(randomInt(1,50) + MonsterStrength * 1.5 - round(MindyDurabilityTotal * 0.5))`

Minimum successful damage is 1.

Individual monsters can use special attack methods instead of this generic path.

## Elemental attack spells

Internal spell picks:
- fire
- water
- earth
- wind

Base magic damage:

`floor(randomInt(1,100) + MindyIntellectTotal * 5 - floor(MonsterSpirit * 0.5))`

Then elemental matchup applies x1.5 / x0.5 using the same cycle as physical sword elements.

Minimum damage = 1.

In Finale Mode, this elemental-spell damage gets an additional x1.5 multiplier in the inspected handler. This is an original Final-Mode rule only and should not be assumed for the successor.

## Morph

Internal `morph` damage:

`floor(randomInt(500,700) + MindyIntellectTotal * 10 - floor(MonsterSpirit * 0.5))`

Minimum = 1.

This confirms Morph is a deliberately oversized late/meta spell rather than another normal elemental attack.

## Gimme

Internal `gimme` damage formula:

`floor(randomInt(1,20) + MindyIntellectTotal * 2 - floor(MonsterSpirit * 0.5))`

The attack then:
- subtracts that amount from monster HP;
- restores Mindy HP by the displayed/processed attack amount;
- restores MP by attack amount / 2.

### Ordering oddity

The monster-health subtraction occurs before the later minimum-1 clamp seen in this handler.

So at very low Intellect versus very high Spirit, a negative raw value could theoretically produce strange behaviour before the display/heal value is clamped. This is treated as an implementation quirk, not a design principle.

## Restore / heal spell

Internal `cure` (UI healing spell) computes:

`round(randomInt(1,200) + MindyIntellectTotal * 5)`

minimum 1, then feeds the healing sequence.

The spell costs 8 MP.

## Barrier

Costs 20 MP.

Casting sets:
- _barrierUp = 4

While active, combat derives temporary defensive boosts equivalent to 75% of the underlying relevant defensive base stats and uses them in incoming attack calculations.

The UI description "raises Durability and Spirit for four rounds" matches the timer structure.

## Chastise

Costs 10 MP.

Its resolved callback reduces:
`seductionFailCount -= randomInt(1,4)`

then clamps the counter to zero.

So Chastise and Bucket of Water both manipulate the same seduction-risk meter.

## Amplify

Costs 30 MP.

Casting:
- multiplies MindyDurTotal by 3
- multiplies MindyPhysTotal by 3
- multiplies MindyProwTotal by 3
- _amplifyUp = 4
- _amplifyGo = true

This matches the UI concept of temporarily tripling physical stats.

### Amplify crash / implementation bug

When the effect expires, the recovery code:
- divides Durability total by 3;
- then contains suspicious cross-assignment between Prowess and Physical totals;
- sets HP directly to 1.

So "crash hard in the aftermath" is literal: HP is forced to 1.

The physical/Prowess restoration code also appears malformed and may corrupt the two totals instead of cleanly restoring both. Do not copy this implementation detail into the successor.

## Spell MP costs — code vs UI

Verified click-handler costs:

| UI/system role | internal key | MP |
|---|---|---:|
| healing spell | cure | 8 |
| status cleanse | heal | 8 |
| Barrier | barrier | 20 |
| Chastise | chastise | 10 |
| fire attack | fire | 10 |
| water attack | water | 10 |
| wind attack | wind | 10 |
| earth attack | earth | 10 |
| Scan | scan | **8** |
| Amplify | amplify | 30 |
| Gimme | gimme | 2 |
| Morph | morph | 40 |

Notable bug/mismatch:
- Scan's UI description says **6 MP**;
- the click handler requires MP > 7 and subtracts **8 MP**.

## Combat is deliberately noisy

Physical:
- low random base, strong stat scaling, can miss.

Elemental magic:
- larger 1–100 random spread, no generic Prowess hit check in the damage handler, uses Intellect vs Spirit.

Seduction:
- very large opposed 0–50 rolls and a separate cumulative failure condition.

The three command families therefore create genuinely different risk profiles instead of sharing one hidden accuracy/damage formula.
