# Simply Mindy — verified Seduction combat engine

Источник: SWF bytecode SceneEvents_44, methods 32118/32119, 32338–32367, 32407.

## Seduction is a parallel combat engine

Combat has four seduction actions:

1. Tempt
2. Coax
3. Flash
4. Fondle

They are not cosmetic alternatives to Attack. They alter enemy stats, control turns, steal items and feed a separate failure meter that can produce a sexual-loss combat outcome.

Against Mr. Moe (monster ID 42), all four are overridden to `moeFail`; the normal seduction action is not resolved.

## Shared seduction contest

For the ordinary success checks used by the four actions:

Player side:
`Fuckability + randomInt(0,50)`

Enemy side:
`(Strength + Durability + Prowess + Intellect + Spirit) / 6 + randomInt(0,50)`

Success requires player side > enemy side.

Important quirk: five enemy stats are summed but the code divides by **6**, not 5.

Therefore:
- Fuckability is the player's main seduction combat stat;
- weakening any enemy stats also makes later seduction actions easier;
- randomness remains large because both sides add 0–50.

## Global failure pressure

Failed seduction attempts increment:
`_seductionFailCount`

Central post-action resolvers check it against 3.

- failCount < 3 -> combat normally continues and the enemy gets its response;
- failCount >= 3 -> `_sexSeduction = true` and the sexual-loss sequence is entered.

So three accumulated seduction failures are the generic danger threshold.

This makes Bucket of Water mechanically meaningful: it reduces seductionFailCount by random 1–4, clamped to zero.

## Tempt

UI description:
"Mindy tantalizes her foe with her posterior, lowering all of their stats by a small amount."

Verified success:
- _seductionTemptCount += 1
- enemy Strength -3
- enemy Durability -3
- enemy Prowess -3
- enemy Intellect -3
- enemy Spirit -3

Verified failure:
- seductionFailCount += 1
- all five enemy stats +3

Overuse:
- if _seductionTemptCount >= 4, the normal contest is skipped;
- the action goes directly through a failure-style branch:
  - failCount +1
  - all five enemy stats +3

So Tempt can be a strong setup tool, but repeated use eventually reverses the benefit.

## Coax

UI description:
"Mindy sexily persuades her foe to hand over a gift."

First successful Coax:
- _seductionCoaxed = true
- _coaxStole = true
- stolen-item resolution follows.

If Coax is attempted again after _coaxStole is already true:
- the normal success contest is skipped;
- giftFail/coaxFail is shown;
- seductionFailCount += 1.

So a successful Coax is effectively a one-time steal/gift attempt per battle; trying again is guaranteed failure.

The later steal resolver has enemy-specific common/rare rewards and a separate `_coaxStoleRare` path. This is a real loot subsystem, not merely flavour text.

## Flash

UI description:
"Mindy flashes her foe, stunning them for up to three rounds..."

Success:
- enemy is put into damage/reaction animation;
- _monsterStunnedCount = randomInt(1,3);
- enemy turn resolver is invoked, with stun counter controlling skipped actions.

Failure:
- seductionFailCount += 1
- _mindyStunnedCount = randomInt(2,4)
- Flash-failure animation/state.

Therefore Flash is asymmetric crowd control:
- success: enemy disabled for 1–3 rounds;
- failure: Mindy is disabled for 2–4 rounds and also moves toward sexual defeat.

### Implementation bug / oddity

On Flash success, the code increments **_seductionTemptCount**, not _seductionFlashCount.

An exhaustive field scan finds `_seductionFlashCount` initialized but no normal runtime writes.

This means successful Flash can accidentally advance Tempt's 4-use cap, while its dedicated Flash counter is effectively dead in this version.

## Fondle

UI description:
"Mindy pleasures herself in an attempt to make her foe temporarily drop their guard."

On success:
- _seductionFondleCount = randomInt(2,4)
- current enemy Durability = 0
- current enemy Spirit = 0

The original Durability/Spirit are saved at combat setup in:
- _monsterFondleDur
- _monsterFondleSpir

Central turn processing contains restoration code using:
- _seductionFondleCountdown

when that countdown expires.

### Suspicious implementation mismatch

The success handler writes `_seductionFondleCount`, while the restore timer reads/decrements `_seductionFondleCountdown`.

An exhaustive scan did not find a clear runtime assignment that copies the rolled count into the countdown.

Also, the action's initial overuse check tests `_seductionFondleCount >= 4`.

So the intended design is clearly "temporarily set physical/magic defence to zero", but the duration plumbing appears inconsistent/bug-prone in this build.

Failure/overuse branch:
- seductionFailCount += 1
- enemy Strength +15
- enemy Intellect +15

Fondle therefore has the harshest visible failed setup penalty: the target becomes much more dangerous offensively.

## Tactical relationships

The four actions form a real sequence system:

- Tempt lowers every enemy stat, simultaneously improving future seduction odds.
- Coax converts a successful seduction check into loot, but only once.
- Flash buys free/safer turns through stun.
- Fondle deletes Durability + Spirit temporarily, setting up both physical and magical burst damage.
- Every failed setup pushes the player toward a three-failure sexual-loss state.

This is why Seduction is best understood as a second combat engine layered alongside HP damage, rather than a single "sex attack" command.
