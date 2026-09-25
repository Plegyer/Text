# Simply Mindy — verified combat status system

Источник: SWF bytecode SceneEvents_44, especially central turn resolver and combat menu renderer.

## Statuses are command-denial + turn-pressure effects

The combat engine tracks several independent negative states:

- _mindyPoisoned
- _mindyStunnedCount
- _mindyLustyCount
- _mindyChastityCount
- _mindyMute
- _mindyAssCount

They are not one generic debuff field. Each blocks or distorts a different part of the command system.

## Poison

When Mindy is poisoned and the poison tick is allowed to fire:

`damage = ceil(HP Max / 10)`

The damage is subtracted directly from HP.

So Poison is a fixed 10% max-HP tick rather than a percentage of current HP.

If it reduces HP to 0 or below, combat enters the normal loss/result path.

## Stun

`_mindyStunnedCount` is decremented by 1 in the central turn resolver.

If Mindy is still stunned:
- normal menu flow is suppressed;
- the enemy attack sequence is triggered.

Flash failure can set:
`_mindyStunnedCount = randomInt(2,4)`

Enemy stun is tracked independently in:
`_monsterStunnedCount`

and is likewise decremented by the central turn logic.

Flash success can set monster stun to 1–3 rounds.

## Lusty

While `_mindyLustyCount >= 1`, the central resolver can interrupt Mindy's turn.

It rolls:
`randomInt(1,2)`

On result 2:
- normal action selection is interrupted;
- a self-fondle/lust animation plays;
- after the sequence, `_monsterAttack = true`.

So Lusty creates roughly a 50% chance to lose the current action to the enemy rather than directly dealing HP damage.

This is a COMBAT status and should not be confused with the overworld Fuckability/Lust-style progression stat.

## Mute

Combat menu rendering checks `_mindyMute`.

When true:
- Magic is replaced by the label "Muted!"
- magic selection is unavailable.

Attack, Item and other commands are handled separately.

Thus Mute is specifically a spell lock.

## Chastity

Combat menu checks:
`_mindyChastityCount >= 1`

When active:
- Seduce is replaced by "Chastened!"
- seduction menu is unavailable.

The count is decremented each central turn.

Thus Chastity is the seduction-command equivalent of Mute.

## Ass / immobilization status

When `_mindyAssCount >= 1`:

Attack label:
- "Can't move! (A)"

Seduce label:
- "Can't move!"

The count is decremented each central turn.

Magic and Item are not blocked by the same menu check.

So this status is effectively a partial physical/seduction immobilize rather than a full stun.

## Status cleanse

### Snake Oil
- 2/3 chance to clear the main negative status family;
- 1/3 failure;
- consumed either way.

### Perfectly Panaceic
- guaranteed clear of the same family.

### Heal/status-cleanse spell
Combat has a dedicated 8-MP cleanse spell path.

## Immunologist Title

At the central turn resolver, if:
`activeTitle == immunologist`

the code immediately clears:
- Poison
- Lusty count
- Chastity count
- Mute
- Ass count

It also clears `_monsterStunnedCount`, which is surprising because that removes a beneficial stun on the enemy as well. This looks like an over-broad implementation choice/bug.

The practical intent is still clear: Immunologist provides automatic status immunity/cleanup.

## Design role

The status family attacks different parts of the player's tactical vocabulary:

- Poison -> HP clock
- Stun -> whole turn
- Lusty -> probabilistic whole-turn loss
- Mute -> Magic
- Chastity -> Seduction
- Ass/immobilize -> Attack + Seduction

This gives enemy design another axis besides raw damage and elemental matchup.
