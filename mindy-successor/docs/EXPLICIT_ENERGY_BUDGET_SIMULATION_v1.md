# Explicit Energy Budget Simulation v1

Дата: 2026-09-25.

Статус: **EXECUTED BALANCE CHECK**.

Цель:
проверить 160-day fresh profile только с явными Energy costs.

Не считаются Energy cost:
- relationship dialogue;
- career scenes;
- job unlock scenes;
- minor reactive events.

Считаются:
- Work 1;
- School 1;
- Large Activity entry 2;
- Night study / bad street night через next-day Energy reduction.

## 1. Assumptions

Fresh:
- 160 days;
- base Energy = 3/day = 480;
- starting money = 12 WU;
- work income = 1 WU;
- basic School = 6 WU;
- normal room = 2 WU;
- cheap lodging = 1 WU;
- street = 0 but -1 next-day Energy every street night.

Activity reward is treated as 0 money for conservative capacity test.

## 2. Maximum paid School lessons if everything else is Work/School/Activity

### Normal room

| Activity entries | Energy spent on Activity | Max School lessons |
|---:|---:|---:|
| 0 | 0 | 24 |
| 5 | 10 | 23 |
| 10 | 20 | 21 |
| 20 | 40 | 18 |

At 0 Activity:
- ~452 work shifts;
- 24 lessons;
- only 4 Energy left.

This is an extreme education/survival run, not normal expected play.

### Cheap lodging

| Activity entries | Max School lessons |
|---:|---:|
| 0 | 47 |
| 5 | 46 |
| 10 | 44 |
| 20 | 41 |

Cheap housing roughly doubles fresh School capacity because rent consumes much less earned money.

### Full street run

Assume every night applies next-day Energy -1.

Total daytime Energy becomes approximately 320 instead of 480.

| Activity entries | Max School lessons |
|---:|---:|
| 0 | 47 |
| 5 | 46 |
| 10 | 44 |
| 20 | 41 |

This is the useful result:
**full street and cheap lodging have similar raw School capacity for completely different reasons.**

Cheap:
- pays money;
- keeps 3 Energy/day.

Street:
- pays nothing;
- only has ~2 Energy/day.

Therefore street is not an obvious economic exploit.

## 3. Relationship consequence

None of these tables reserve Energy for relationships.

A run can contain many reactive relationship/career scenes on top of these action counts.

Night relationship meetings also do not change daytime Energy unless the specific event defines a modifier.

## 4. Large Activity consequence

At fresh normal housing:
- 10 Activity entries consume 20 Energy and reduce the extreme School ceiling from 24 to 21 lessons.
- 20 entries reduce it to 18.

This is noticeable, but not catastrophic.

More importantly Activity can return:
- money;
- stat gains;
- items;
- quest facts.

So real net cost may be lower or even strategically profitable.

## 5. Night study

Night study must be simulated separately from paid School because:
- tuition is avoided;
- next-day Energy is lost;
- it uses the Night slot.

It is naturally attractive when money is the bottleneck.

This gives fresh poor players another stat-growth route without pretending dialogue costs Energy.

## 6. Design conclusion

The corrected action economy supports dense days:

```text
up to 3 paid Energy actions
+ several free reactive scenes
+ one Night slot
+ optional new-day/minor event layer
```

This is much closer to the reference density than "3 Energy = 3 total scenes".

## 7. Remaining balance work

Need next:
- exact Night-study stat/progress gain;
- mixed normal/cheap/street housing schedules rather than all-160-night extremes;
- Activity expected rewards;
- scheduled day-ending event frequency.
