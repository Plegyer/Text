# Balance Simulation Report v1

Дата: 2026-09-25.

Статус: **EXECUTED BALANCE ANALYSIS**.

Основание:
- locked 160-day calendar;
- 3 daily Energy;
- ordinary work cost = 1 Energy;
- `SUCCESSOR_JOB_SEASON_MATRIX_v0.csv`;
- target 12-stat model;
- economy WU framework.

Этот документ фиксирует фактически прогнанные сценарии. Он не превращает тестовые экономические числа в locked balance.

## 1. Что было прогнано

Для каждой из 10 ordinary professions:
- 20 shifts;
- 50 shifts;
- 80 shifts;
- 160 shifts;

при темпе:
- 1 shift/day;
- 2 shifts/day;
- 3 shifts/day.

Season resolver:
- days 1–10 spring;
- 11–20 summer;
- 21–30 autumn;
- 31–40 winter;
- repeat each 40-day year.

Статистический прогон использовал raw deltas без stat cap/floor, чтобы не скрывать перекосы clamp-ом.

После первого прогона была сделана одна tuning iteration:
- field jobs потеряли часть лишних Grooming penalties;
- Artist/Geisha перестала терять Strength почти каждый сезон;
- Satyr Maid/Prostitute получили менее стигматизирующий физический drift.

Результат tuning сохранён как `SUCCESSOR_JOB_SEASON_MATRIX_v1.csv`.

## 2. Главный системный вывод: shifts != elapsed life

При 3 Energy:
- 20 shifts = 7 days при grind 3/day;
- 50 shifts = 17 days;
- 80 shifts = 27 days.

При 1 shift/day:
- 20 shifts = 20 days;
- 50 shifts = 50 days;
- 80 shifts = 80 days.

Следствие:
**career ending нельзя считать полноценной прожитой профессиональной жизнью только по visit/shift counter.**

### 50-shift example

При 1 shift/day 50 смен видят:
- spring 20 shifts;
- summer 10;
- autumn 10;
- winter 10.

При 3 shifts/day:
- spring 30;
- summer 20;
- autumn 0;
- winter 0.

То есть чистый `shifts >= 50` позволяет получить Hard Work ещё до осени первого года.

## 3. Hard Work recommendation after simulation

Для ordinary Hard Work рекомендуется eligibility:

```text
totalShifts >= 50
AND workedSpring >= 5
AND workedSummer >= 5
AND workedAutumn >= 5
AND workedWinter >= 5
AND careerBaseMilestoneComplete
```

Это пока **BALANCE RECOMMENDATION**, не user lock.

Почему:
- заставляет реально прожить почти полный calendar year;
- не требует 10 смен каждого сезона;
- позволяет интенсивную работу;
- сохраняет 50 как знакомый масштаб reference;
- делает Palace 10/10 достижением разных полноценных жизней, а не 10 быстрых grind-runs.

При 3 shifts/day earliest Hard Work всё равно не раньше winter, примерно day 32+.

## 4. 50-shift specialist results after first tuning

Raw delta; 1 shift/day:

| Job | strongest gain | strongest loss | net stat delta |
|---|---:|---:|---:|
| Lumber | Strength +40 | Grooming -30 | +40 |
| Satyr Maid | Grooming/Charm +40 | Strength/Endurance -20 | +90 |
| Undead Farm | Strength +30 | Grooming -30 | +60 |
| Tavern | Sociability +40 | Strength -30 | +60 |
| Hunter | Dexterity +40 | Grooming/Manners -20 | +60 |
| Guard | Strength +30 | Grooming -30 | +50 |
| Artist/Geisha | Creativity +40 | Strength -30 | +120 |
| Assassin | Dexterity/Wits +40 | Charm -30 | +40 |
| Merchant | Wits +40 | Strength -30 | +60 |
| Prostitute | Sexuality/Charm +40 | Strength -20 | +90 |

Это показывает намеренную specialization, но также предупреждает: exact magnitude ещё высока и зависит от будущего stat floor/cap.

## 5. Season concentration is a real strategy

При 3 shifts/day player может сделать до **30 shifts за один 10-day season**.

За четыре года теоретически можно сделать:
- до 120 shifts только в spring;
- избегать пакетов других сезонов.

Это не обязательно exploit; это может быть сознательная build strategy.

Но:
- career/ending breadth должна читать seasonal history;
- сложные endings могут требовать конкретные seasonal milestones;
- annual content нельзя считать гарантированно увиденным только потому, что shifts высокие.

## 6. Grooming findings

Ухоженность действительно работает как high-volatility stat.

До tuning некоторые field careers теряли Grooming в 3 из 4 сезонов, что создавало repair tax.

В v1:
- Lumber loses Grooming in spring/summer;
- Undead Farm loses in spring/summer;
- Hunter loses in summer/autumn;
- Guard loses in spring/summer;
- Satyr Maid and Artist/Geisha are strong positive Grooming anchors;
- Tavern has a smaller positive source;
- Prostitute has seasonal +/- that roughly offsets over a balanced year.

Это лучше повторяет принцип original Cleanliness: часть работ грязнит/снижает stat, часть профессионально его развивает.

## 7. Housing + Grooming result

Не рекомендуется автоматическое:
`normal lodging -> +1 Grooming every night`.

За 160 days это само по себе создаст +160 и уничтожит смысл work effects.

Рекомендуемая интеграция:
- normal lodging unlocks voluntary night action **Self-care**;
- Self-care candidate effect = +2 Grooming;
- action consumes voluntary night opportunity, but not next-day Energy;
- cheap lodging may offer weaker/limited Self-care;
- street gives -1 Grooming and has no normal Self-care;
- relationship/study compete with Self-care for the night.

Это требует одного reusable night family, а не отдельной сцены на каждый stat.

## 8. Stat range consequence

Raw +1-per-shift packages дают большие значения:
- specialist gains +30..+50 by 50 shifts;
- +60..+80 by 80 shifts in primary axes are common.

Поэтому нужен finite stat range.

Working balance recommendation:
- base progression stat range: **0..100**;
- creation starts at 1;
- exact meta cap extension remains separate.

Это снова recommendation, not yet a locked user decision.

Без cap work growth становится бессмысленно большим; при 100 cap specialist naturally reaches mastery during one run.

## 9. Economy simulation assumptions

Тестовые параметры:

```text
1 WU = average starter shift
starting money = 6 WU
normal lodging = 1.0 WU/night
cheap lodging = 0.45 WU/night
basic lesson = 1.5 WU
Activity monetary reward = 0 for conservative test
```

All 160 days were charged lodging.

## 10. Economy scenarios

| Scenario | Work | School | Activity entries | Housing | End money |
|---|---:|---:|---:|---|---:|
| survival | 160 | 0 | 0 | normal | 6 WU |
| balanced | 240 | 40 | 40 | normal | 26 WU |
| school-heavy break-even | 274 | 80 | 20 | normal | 0 WU |
| activity-heavy | 200 | 20 | 80 | normal | 16 WU |
| social-heavy | 190 | 20 | 40 | normal | 6 WU |
| school-heavy cheap | 240 | 80 | 20 | cheap | 54 WU |
| low-work cheap | 80 | 20 | 40 | cheap | -16 WU |

All scenarios use the full theoretical 480 Energy budget.

## 11. Economy conclusions

### One work/day is a strong baseline
160 work shifts exactly pay 160 normal lodging nights.

Player still has 320 Energy for:
- School;
- Activity;
- relationships;
- other actions.

But School needs savings/additional work.

### Normal housing does not force grind
A social-heavy test with:
- 190 work;
- 20 lessons;
- 40 Activity entries;
- 190 other Energy actions

finishes at the original 6 WU reserve.

### School-heavy route is expensive but viable
80 lessons + normal room needs ~274 work shifts to break even under conservative no-Activity-income assumptions.

That is 57% of all Energy.

Cheap lodging makes the same kind of education route much easier, which gives poverty housing an actual strategic role.

### Cheap lodging cannot make work irrelevant
With only 80 work shifts + 20 lessons across the run, even cheap lodging goes negative.

So current band does not create a free low-work economy.

## 12. Candidate external currency scale

The user-directed Secret Debt numbers are roughly:
- loan 2000;
- demand 20000 after 10 days.

Best first calibration from the WU test:
**1 WU ≈ 250 currency**.

Then:
- starter shift ≈ 250;
- normal lodging ≈ 250;
- starting reserve ≈ 1500;
- loan 2000 = 8 WU;
- debt 20000 = 80 WU.

The loan is immediately useful: roughly eight normal nights.

The debt is intentionally trap-scale.

## 13. Secret Debt 10-day stress test

With 1 WU base wage and max 3 shifts/day:
- max gross in 10 days = 30 WU;
- after normal lodging = 20 WU.

Even at a very strong 2 WU/shift:
- max gross = 60 WU;
- after lodging = 50 WU.

At the 250 currency/WU candidate:
- demanded debt = 80 WU.

So an already-poor character cannot brute-force repayment in 10 days even by doing nothing but work.

This matches the intended trap route.

## 14. Poverty recovery

At normal baseline:
- 0 money is not softlock;
- one available work action earns ~1 WU;
- player can pay one normal room that night.

If street sleep reduces next-day Energy from 3 to 2, recovery still works.

To keep street meaningful:
- street should also damage Grooming and/or restrict normal Night options;
- it should not be economically superior to permanent housing.

## 15. What remains before numeric lock

Need next simulation iteration with:
- stat cap/floor 0..100;
- starting allocations;
- exact Grooming Self-care +2 test;
- career milestone thresholds;
- wage growth by career rank/stats;
- Activity expected monetary value;
- cheap/street Night penalties;
- School advanced prices;
- mixed-career schedules.

## 16. Current recommendation set

Strong enough to carry into TЗ as **balance candidates**:
- Hard Work = 50 shifts + seasonal breadth + career milestone;
- normal lodging ≈ 1 starter shift;
- starting reserve ≈ 6 normal nights;
- basic lesson ≈ 1.5 starter shifts;
- currency scale ≈ 250 per WU;
- Grooming Self-care as a Night option, not passive nightly gain;
- stat range candidate 0..100.

Do not mark these numeric values LOCKED until the next clamp/mixed-run pass.
