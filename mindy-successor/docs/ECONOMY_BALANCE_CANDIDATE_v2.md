# Economy Balance Candidate v2 — Fresh Hard, Meta Easier

Дата: 2026-09-25.

Статус: **SIMULATION-SUPPORTED BALANCE CANDIDATE**, not final lock.

Основание:
- пользователь: fresh game должна быть сложной, endings progressively make later lives easier;
- original reference: early rent 100, starting money 600, School 300–600, early starter-job wages roughly tens rather than hundreds;
- 3 daily Energy.

## 1. Wage Unit remains

`1 WU = average fresh starter-job shift`.

Но первый v1 candidate ошибочно сделал rent ≈ 1 WU, из-за чего fresh survival оказался слишком лёгким.

## 2. Fresh-profile candidate

```text
starter wage = 1 WU
normal lodging = 2 WU/night
cheap lodging = ~1 WU/night + drawback
street = 0
starting money = 12 WU
basic School = ~6 WU
advanced School = ~8–12 WU
daily Energy = 3
```

Это приблизительно воспроизводит полезные относительные пропорции reference, не копируя обязательные конечные числа.

## 3. Candidate visible scale

Очень естественный первый scale:
**1 WU ≈ 50 currency**.

Тогда:

- starter shift ≈ 50;
- normal room ≈ 100;
- cheap lodging ≈ 50;
- starting money ≈ 600;
- basic School ≈ 300;
- advanced School ≈ 400–600;
- Secret loan 2000 = 40 WU;
- Secret demand 20000 = 400 WU.

Это хорошо стыкуется с уже предложенными пользователем 2000/20000 и с ощущением начала оригинала.

Не означает, что successor обязан оставить знак $ или exact original salaries.

## 4. Fresh 160-day stress test

Без School:

- total rent = 320 WU;
- start money = 12 WU;
- требуется ~308 starter shifts для оплаты normal room весь run;
- это 64% всех 480 Energy.

То есть fresh character действительно много работает.

### With 10 basic lessons

School:
- 10 actions;
- 60 WU.

Finance:
- required work ≈ 368 shifts.

Energy:
- 368 work + 10 School = 378;
- остаётся ~102 Energy на Activity/relationships/other actions.

Это сложно, но playable.

### With 15 basic lessons

Finance:
- work ≈ 398 shifts.

Energy:
- 398 + 15 = 413;
- остаётся ~67 Energy.

То есть heavy education в fresh run требует почти профессиональной жизни вокруг заработка. Это ожидаемо.

## 5. Why strong School gains are necessary

При таких ценах урок не может давать микроскопический +1.

Как и reference, School packages должны быть **сильными за одну Energy**:
- cheap: несколько stat points;
- advanced: крупный multi-stat package.

Игрок платит деньгами именно за ускорение нужного build.

## 6. Cheap lodging

Cheap lodging candidate:
- ~1 WU;
- ограниченные Night options / небольшой stat drawback.

Это реальный poverty strategy:
- экономит деньги;
- позволяет чаще учиться;
- имеет жизненную цену.

Street остаётся fallback:
- free;
- Energy/Grooming/Night consequences.

## 7. Meta profiles

Exact rewards ещё не назначены, поэтому следующие profiles — **simulation fixtures**, не reward catalog.

### Fresh fixture
- Energy 3;
- wage 1 WU;
- rent 2 WU;
- starting money 12 WU;
- School 6 WU.

### Mid-meta fixture
Illustrative accumulated rewards:
- Energy 4;
- effective wage ~1.3 WU;
- rent ~1 WU;
- starting money ~24 WU;
- School ~5 WU.

### Late-meta fixture
Illustrative:
- Energy 5;
- effective wage ~1.6 WU;
- rent disabled;
- starting money ~40 WU;
- School ~4 WU;
- starting stats/items also improved.

These are not meant to be one single perk; they represent accumulated endings.

## 8. Same lifestyle, different profile difficulty

Test lifestyle:
- 20 School lessons;
- 20 Activity entries;
- 80 other **explicitly Energy-costed** actions;
- 160 nights.

Reactive career/relationship dialogue is not part of those 80 actions and normally costs 0 Energy.

### Fresh
Required work for rent + tuition:
~440 shifts.

Energy required for explicit-cost actions:
440 + 20 + 40 + 80 = 580 > 480.

**Not feasible.**

Fresh player must choose: less School, less Activity, cheap lodging, or different goals.

### Mid-meta fixture
Required work:
~136 shifts.

Total Energy:
136 + 20 + 40 + 80 = 276 of 640.

**Comfortably feasible.**

### Late-meta fixture
Rent is gone.
20 lessons cost 80 WU, start money covers 40 WU.
Required work:
~25 shifts.

Total Energy:
25 + 20 + 40 + 80 = 165 of 800.

**Routine survival is almost irrelevant.**

This is the desired meta curve.

## 9. Economy principle

Do not balance every NG+ back to fresh difficulty.

Late profiles are supposed to "break" early survival constraints.

Challenge migrates from:
- rent;
- basic stats;
- basic profession access

toward:
- complex career outcomes;
- Activity;
- Palace;
- macro-meta routes.

## 10. Grooming

No extra Self-care loop is required.

Minimal integration:
- normal lodging: no automatic change;
- cheap/street can apply small Grooming loss;
- suitable jobs and School restore Grooming.

This keeps production cost low and matches the reference-like progression loop.

## 11. Supersedes

This supersedes `ECONOMY_BALANCE_CANDIDATE_v1.md`.
