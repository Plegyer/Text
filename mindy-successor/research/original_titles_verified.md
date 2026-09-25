# Simply Mindy — verified Titles system

Источник: SceneEvents_15, SceneEvents_0, SceneEvents_44/369 и title selection scene.

## Главное

Titles — отдельная система от achievement/meta bonuses.

- Глобальная переменная activeTitle хранит ОДИН выбранный title.
- Разблокировки хранятся в titlesList.
- Игрок может переключать активный title в отдельном интерфейсе.
- Achievement bonuses могут существовать параллельно; title — одиночный экипируемый пассив.

## Daily titles

На sleep/new-day слое:

| activeTitle | effect |
|---|---|
| yooHoo | +1 Charisma |
| neatFreak | +1 Cleanliness |
| titsForDays | +1 Fuckability |
| gossipGirl | +1 Sociability |
| lifeParty | +1 Class |
| artiste | +1 Creativity |
| brickShitHouse | +1 Strength |
| stoneWall | +1 Durability |
| slipNSlide | +1 Prowess |
| cleverGirl | +1 Intellect |
| spiritedAway | +1 Spirit |
| busyBee | +1 Stamina tomorrow |

## Derived-stat titles

On main:

### buffAsFuck
- computes bonus = ceil(HP Max × 0.2)
- recalculates HP Max = Strength×3 + Durability×7 + bonus
- fills HP to the new maximum

### mentalist
- computes _HPMPBonus from 20% of HP Max in the observed bytecode
- MP Max = Spirit×2 + Intellect×3 + bonus
- fills MP to the new maximum

Не исправляем потенциальную странность HP Max в формуле mentalist: именно это читает bytecode.

## Combat titles

At combat setup:

- combatVet: +30 to _mindyPhysTotal
- comeAtMe: +30 to _mindyDurTotal
- knifeFighter: +30 to _mindyProwTotal
- wiz: +30 to _mindyIntTotal
- spiritualLeader: +30 to _mindySpirTotal

## Other combat titles found

- immunologist: during combat status cleanup explicitly resets/clears poison, lusty count, chastity count, mute and related status counters.
- blimp: has its own random combat branch. Exact user-facing effect should be decoded only if needed.

## Why this matters structurally

Simply Mindy has at least two distinct persistent-power layers:

1. achievement/ending bonuses that can alter global rules and may stack;
2. one equipped Title that specializes the current run/day/combat.

This creates build choice even after meta progression: owning many bonuses is not the same as having every passive title active simultaneously.
