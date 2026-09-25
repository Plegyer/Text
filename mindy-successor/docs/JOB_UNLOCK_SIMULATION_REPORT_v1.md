# Ordinary Job Unlock Simulation v1

Дата: 2026-09-25.

Статус: **EXECUTED BALANCE ANALYSIS / THRESHOLD CANDIDATE**.

Основание:
- `ORDINARY_JOB_UNLOCK_MODEL_v1.md`;
- `SUCCESSOR_JOB_SEASON_MATRIX_v1.csv`;
- `SCHOOL_BALANCE_MATRIX_v0.csv`;
- `ECONOMY_BALANCE_CANDIDATE_v2.md`;
- 3 starting jobs only;
- 160-day calendar.

## 1. Что именно проверялось

Для каждой из 7 закрытых ordinary professions искался **самый ранний теоретически достижимый день**, если игрок специально строит всю жизнь ради этой профессии.

Fresh assumptions:
- только Lumber / Satyr Maid / Undead Farm доступны;
- 12 stats start at 1;
- 10 creation points можно оптимально вложить в gate stats;
- 3 Energy/day;
- starter work = +1 WU;
- normal lodging = 2 WU/night;
- starting money = 12 WU;
- School costs/effects from `SCHOOL_BALANCE_MATRIX_v0.csv`;
- normal rent оплачивается каждую ночь;
- никаких Activity/relationships/other actions;
- unlock проверяется сразу после stat-changing action.

То есть результаты ниже — **теоретический минимум**, а не ожидаемый день обычного игрока.

## 2. Candidate gates

| Job | Early stat gate | Fallback | Fresh earliest |
|---|---|---|---:|
| Tavern | Charm 45 + Sociability 35 | Year 2 | day 10 |
| Guard | Strength 30 + Endurance 30 + Manners 20 | Year 2 | day 13 |
| Merchant | Wits 20 + Reason 20 + Sociability 15 | Year 2 | day 21 |
| Hunter | Dexterity 25 + Endurance 20 + Wits 15 | Year 2 | day 22 |
| Prostitute | Sexuality 55 + Charm 40 + Sociability 35 | Year 3 | day 31 |
| Assassin | Dexterity 30 + Wits 25 + Reason 20 | Year 3 | day 32 |
| Artist/Geisha | Creativity 35 + Manners 25 + Grooming 30 | Year 3 | day 33 |

Точный CSV:
`ORDINARY_JOB_UNLOCK_THRESHOLDS_v0.csv`.

## 3. Что означает fresh earliest

### Tavern — day 10

Оптимальный найденный путь примерно:
- creation: почти всё в Charm;
- 28 Satyr Maid shifts;
- 2 Rhetoric lessons.

За первые 10 дней доступно 30 Energy.
Почти весь первый spring потрачен только на это.

Поэтому day 10 не означает, что Tavern "легко открывается".
Это означает:
**игрок может форсировать её, пожертвовав практически всем остальным.**

### Guard — day 13

Пример оптимального состава:
- creation heavily into Manners;
- ~36 physical starter shifts;
- 3 Etiquette lessons.

Опять же это почти pure progression sprint.

### Merchant — day 21

Требует уже summer:
- много Satyr Maid shifts для денег/social growth;
- несколько Literacy lessons;
- targeted creation.

### Hunter — day 22

Требует:
- очень много Lumber work;
- Field Craft;
- targeted Dexterity/Wits start.

### Late group — day 31–33

Fresh Year-1 unlock технически возможен, но требует почти целиком посвятить первые три сезона подготовке.

Это именно нужная роль:
- возможно для знающего игрока;
- не является casual expectation;
- Year 3 fallback остаётся значимым.

## 4. Why mid jobs still need Year-2 fallback

Теоретический min != normal play.

Нормальный fresh player тратит Energy также на:
- School не только ради одного gate;
- relationships;
- Activity;
- другие jobs;
- quests;
- mistakes;
- poverty.

Поэтому значительная часть игроков не пробьёт все mid-gates в Year 1.

На старте Year 2 calendar fallback гарантирует:
- Tavern;
- Hunter;
- Guard;
- Merchant.

Это не награда за ожидание, а accessibility insurance.

## 5. Why late jobs use Year-3 fallback

Fresh speedrun может открыть late job около day 31–33.

Но это extreme specialization.

Casual/mixed run может не открыть ни одну из них по stats в первый год.

На старте Year 3:
- Artist/Geisha;
- Assassin;
- Prostitute

становятся доступными независимо от build.

Таким образом stat mastery покупает **время**, а не эксклюзивный доступ навсегда.

## 6. Meta profiles

Для проверки кривой использованы два illustrative fixtures.

Они НЕ являются final reward catalog.

### Starter-3 Hard Work only

Automatic candidate +5 rewards:
- Lumber -> Strength;
- Satyr Maid -> Grooming;
- Farm -> Magic.

Результат:
почти не ускоряет большинство unlocks.

Это нормально:
простые +5 тематические bonuses помогают выборочно.

### Mid-meta fixture

Illustrative accumulated state:
- starter + mid Hard Work stat bonuses;
- Energy 4;
- starting money 24 WU;
- rent 1 WU;
- School slightly cheaper.

Earliest:

| Job | Fresh | Mid-meta |
|---|---:|---:|
| Tavern | 10 | 6 |
| Guard | 13 | 6 |
| Merchant | 21 | 4 |
| Hunter | 22 | 5 |
| Prostitute | 31 | 16 |
| Assassin | 32 | 13 |
| Artist/Geisha | 33 | 24 |

Это сильное ускорение без отдельного `unlockProfessionEarly` perk.

### Late-meta fixture

Illustrative:
- all candidate Hard Work stat bonuses;
- Energy 5;
- rent disabled;
- more starting money;
- cheaper School.

Earliest:
- Tavern day 3;
- Hunter day 2;
- Guard day 3;
- Merchant day 2;
- Assassin day 2;
- Prostitute day 10;
- Artist day 12.

К этому моменту обычные job gates почти перестают быть препятствием.

Это соответствует пользовательской цели:
**после многих концовок игра всё легче и легче.**

## 7. Important result

Не нужен отдельный meta system:
`job unlocks earlier after ending`.

Обычная meta progression уже естественно делает это:

```text
starting stats
+ more Energy
+ more money
+ cheaper School / less rent
=> gate reached earlier
```

Так системы усиливают друг друга без специального исключения.

## 8. Gate axis review

### Tavern
Charm + Sociability:
хорошо читается и естественно растёт через Satyr Maid / Rhetoric.

### Hunter
Dexterity + Endurance + Wits:
требует смешать physical work и targeted School.

### Guard
Strength + Endurance + Manners:
не открывается одним только физическим grind без formal training.

### Merchant
Wits + Reason + Sociability:
требует практического, умственного и network слоя.

### Artist/Geisha
Creativity + Manners + Grooming:
сильный late social/status gate.

### Assassin
Dexterity + Wits + Reason:
covert build без моральных/сексуальных условий.

### Prostitute
Sexuality + Charm + Sociability:
профессиональный gate.
Lust намеренно отсутствует.

## 9. Threshold scale

Часть чисел выше original thresholds, особенно:
- Tavern 45/35;
- Prostitute Sexuality 55.

Это не случайная инфляция.

В successor:
- 10 creation points;
- до 3 shifts/day;
- multi-stat School;
- 0..100 candidate range;
- meta bonuses.

Если использовать original-like 20–30 thresholds буквально, некоторые jobs открываются за 3–7 дней.

Higher gate numbers сохраняют original **timing function**, а не копируют original numeric values.

## 10. Recommended status

Текущие seven gates достаточно хороши как:
**BALANCE_CANDIDATE for executable TЗ**.

Перед final lock прогнать ещё:
- exact final Hard Work rewards;
- exact School prices/gains;
- cheap/street housing;
- mixed-life human-like schedules.

Но менять саму структуру:
`3 start -> stat gate OR Year-2/Year-3 fallback`
оснований сейчас нет.
