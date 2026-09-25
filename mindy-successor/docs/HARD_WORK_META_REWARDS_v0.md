# Hard Work Meta Rewards Candidate v0

Дата: 2026-09-25.

Статус: **SUPERSEDED BALANCE CANDIDATE**. Current mapping: `HARD_WORK_META_REWARDS_v1.md`.

Цель: каждая ordinary Hard Work ending должна сразу делать следующую жизнь немного легче, а сбор всех 10 одновременно открывает Palace.

## Candidate rewards

| Profession | Automatic starting bonus |
|---|---|
| Lumber | +5 Strength |
| Satyr Maid | +5 Grooming |
| Undead Farm | +5 Magic |
| Tavern | +5 Sociability |
| Hunter | +5 Dexterity |
| Guard | +5 Endurance |
| Artist/Geisha | +5 Creativity |
| Assassin | +5 Wits |
| Merchant | +5 Reason |
| Prostitute | +5 Sexuality |

Это намеренно простые награды, близкие по функции к трудовым ending-бонусам reference.

## Why automatic

Hard Work rewards:
- небольшие;
- тематические;
- должны ощущаться сразу;
- являются лестницей к Palace 10/10.

Поэтому candidate policy:
**эти +5 применяются автоматически к старту каждой следующей жизни**.

Сильные rule-changing rewards от сложных endings всё ещё могут использовать selectable loadout.

## Cumulative effect

После всех 10 Hard Work before allocation:

- Strength 6
- Endurance 6
- Dexterity 6
- Reason 6
- Magic 6
- Creativity 6
- Wits 6
- Sociability 6
- Grooming 6
- Sexuality 6

Charm и Manners остаются 1, если не получены из других endings/meta rewards.

Игрок всё ещё получает 10 creation points.

Это означает:
- многие early gates достигаются быстрее;
- School требует меньше уроков;
- Palace profile ощутимо сильнее fresh profile;
- basic life-sim friction не исчезает только от Hard Work bonuses alone.

## Complex endings

Complex outcomes должны раздавать более сильные типы наград:

Candidate pool:
- +1 daily Energy;
- +starting money;
- daily income;
- rent reduction/disable;
- quarter-stat carryover;
- starting item/tool;
- School discount;
- Activity access/equipment;
- alternate start;
- strong Title/perk.

Именно они создают большие скачки сложности вниз.

## Palace progression

Hard Work completion also records:
`ordinaryHardWorkCompleted[jobId] = true`.

Palace unlock:
all 10 true.

Repeated same Hard Work:
- no second +5;
- no extra Palace progress.

## Status

Exact mapping +5 bonuses can still be tuned if a profession's identity changes, but the **meta philosophy is current target**:
each Hard Work makes later runs easier.
