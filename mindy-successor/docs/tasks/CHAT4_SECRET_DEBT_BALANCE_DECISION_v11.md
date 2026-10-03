# Chat 4 — Secret Debt balance decision v11

Status: **PRODUCT / RESEARCH DECISION PACKET — NOT RUNTIME AUTHORITY UNTIL LEADER ACCEPTANCE**  
Owner: Chat 4  
Branch: `chat4/secret-debt-balance-decision-v11`

This packet closes the remaining numeric D19 balance questions requested by the current Chat 4 task pointer.

It makes **no production runtime/UI changes** and does not reopen locked D19/D30/D32 values.

---

## 1. Authority held fixed

The following are treated as locked and are not tuned here:

- unseen eligible Street sleep: 20% lender encounter;
- refusal closes the encounter for the current life;
- acceptance grants exactly +2000 money;
- trap activates exactly 10 days later;
- debt is exactly 20000;
- all ten ordinary careers are locked while bound and their prior progress is preserved;
- School and Activity remain available while bound;
- hidden daytime work is profession-like and costs 1 Energy;
- hidden work does not automatically increase Lust;
- forced Night occurs every bound night;
- forced Night applies next-day Energy -1;
- repayment is one explicit all-at-once 20000 action;
- hidden Hard Work / Bound Life milestone is exactly 50 hidden daytime shifts;
- Secret Debt remains outside ordinary 10/10 Hard Work and Palace qualification;
- owner-kill/control remains an explicit separate player action;
- Takeover keeps the locked minimum of 10 paid School lessons;
- D30/D32 future-run Keystone rewards and exact values remain unchanged.

D19 also keeps a **positive Lust wage input**.  
That is an economy input only. It is not a consent signal.

---

## 2. Current executable economy used for calibration

This packet uses the current live successor scale and the accepted live affordability harness.

Current executable baseline:

| Surface | Live value |
| --- | ---: |
| Fresh money | 600 |
| Base daily Energy | 3 |
| Normal lodging | 100 |
| Cheap lodging | 50 |
| Street lodging | 0 |
| Street next-day Energy | -1 |
| Forced Secret Debt Night next-day Energy | -1 |
| Paid School Energy | 1 |
| Paid School tuition | 300–500 |
| Large Activity entry | 2 Energy |
| Ordinary Hard Work | 50 shifts |
| Calendar | 160 days |

Live ordinary work is compressed:

- early ordinary shifts are commonly around 14–20 money;
- current ordinary wage formulas use base 13–15 plus weighted progression stats;
- at high stats current ordinary wages are still generally in the tens to low hundreds;
- each ordinary shift currently grants about **2 positive progression-stat points** before the D31 negative-season tradeoff;
- D26 limits the same ordinary career to one shift per calendar day.

Accepted affordability harness evidence:

- diversified cheap-lodging play is viable;
- normal lodging costs 50/day more than cheap;
- School remains meaningful at 300–500 tuition;
- the current economy does not justify importing original-game 1.25–1.5 wage multipliers directly.

Therefore Secret Debt hidden work should pay materially more than an ordinary early shift, because the character is locked behind a 20000 obligation and loses one daily Energy, but it must not jump to old prototype/original wage scale.

---

## 3. Representative activation builds

The exact starting Lust value is still Product-open.

The following are **activation snapshots for simulation only**, not starting-character recommendations:

| Build | Endurance | Sexuality | Wits | Lust |
| --- | ---: | ---: | ---: | ---: |
| Low | 10 | 10 | 10 | 5 |
| Mid | 30 | 30 | 30 | 15 |
| Strong | 50 | 50 | 50 | 25 |

All repayment simulations use the favorable case where the accepted +2000 lender money is still held when the 20000 debt activates.

If the player spent part of that +2000 during the 10-day delay, repayment becomes slower. This packet does not compensate for that spending by raising wages.

---

# 4. Hidden-work progression recommendation

## 4.1 Exact per-shift package

Every completed hidden daytime shift:

- **Endurance +1**
- **Sexuality +1**
- **Lust +0**

Seasonal tradeoff:

| Season | Additional effect |
| --- | --- |
| Spring | none |
| Summer | **Reason -1** |
| Autumn | none |
| Winter | **Sociability -1** |

No other progression stat changes.

### Why only Endurance + Sexuality

The hidden route must not become the best generic stat-training route.

Current ordinary work typically grants two positive progression points per shift.  
Giving hidden work Strength +1 / Endurance +1 / Sexuality +1 would grant three positive progression points every shift and would make the forced route unusually efficient at broad character development.

The recommended package instead has:

- two positive progression points every shift;
- one negative point in two seasons of four;
- no Lust growth;
- only two positively trained progression stats.

Across an even seasonal mix, the net progression pressure is approximately the same structural envelope as ordinary work:

- +2 positive points per shift;
- -1 in roughly half the shifts;
- average net around +1.5 progression points/shift before cap/floor clipping.

The route is therefore specialized rather than a hidden all-purpose gym.

## 4.2 50-shift pacing comparison

Ordinary career:

- D26 allows at most one shift of the same ordinary career/day;
- ordinary Hard Work cannot occur before Day 50.

Secret Debt hidden work:

- D26 does **not** silently apply to Secret Debt;
- bound paid-lodging day has base 3 Energy -1 forced-Night penalty = **2 usable Energy**;
- two hidden shifts/day are therefore mechanically possible if the player does nothing else;
- 50 hidden shifts can theoretically occur in **25 bound days** with normal/cheap lodging;
- bound Street also applies Street -1, leaving **1 usable Energy**, so 50 shifts require at least **50 bound days**.

This difference is accepted as a hidden-route structural distinction.  
The packet does **not** add an unapproved same-hidden-career daily cap.

---

# 5. Wage-shape comparison

All three shapes below use the recommended progression package for simulation:

- Endurance +1/shift;
- Sexuality +1/shift;
- Lust unchanged by hidden work;
- stats cap at the current progression cap.

The wage is evaluated from current stats before that shift's gains.

## Shape A — bounded flat-ish

```
wage = round(
  60 + min(25,
    0.10 * Endurance
  + 0.10 * Sexuality
  + 0.05 * Lust
  )
)
```

Range:
**60–85**.

Representative starting wages:

| Build | Wage |
| --- | ---: |
| Low | 62 |
| Mid | 67 |
| Strong | 71 |

This shape protects weak builds but reacts too little to progression.

### Outcome

| Build | Shifts to gross 20000, no spending | Cheap repayment | Normal repayment |
| --- | ---: | ---: | ---: |
| Low | 261 | >160 days | >160 days |
| Mid | 254 | >160 days | >160 days |
| Strong | 250 | >160 days | >160 days |

**Reject.**

It makes the debt effectively impossible under paid lodging despite giving the player a seemingly respectable flat wage.

---

## Shape B — bounded relevant-stat scaling

```
wage = round(
  clamp(
    35,
    0.80 * Endurance
  + 0.70 * Sexuality
  + 0.35 * Lust,
    140
  )
)
```

Range:
**35–140**.

Representative starting wages:

| Build | Wage |
| --- | ---: |
| Low | 35 |
| Mid | 50 |
| Strong | 84 |

### Outcome

| Build | Shifts to gross 20000, no spending | Cheap repayment | Normal repayment | Street repayment |
| --- | ---: | ---: | ---: | ---: |
| Low | 179 | Day 100 | Day 128 | >160 |
| Mid | 163 | Day 90 | Day 115 | Day 149 |
| Strong | 151 | Day 83 | Day 106 | Day 137 |

This shape is viable but over-rewards arriving with a strong build and makes the low build disproportionately floor-bound.

**Not recommended.**

The debt route should reward build, but it should not make pre-trap build quality the dominant determinant of whether Paid Freedom is practical.

---

## Shape C — base + bounded stat component

### Exact recommendation

```
wage = round(
  30 + min(
    110,
    0.70 * Endurance
  + 0.60 * Sexuality
  + 0.35 * Lust
  )
)
```

Exact coefficients:

- base = **30**
- Endurance factor = **0.70**
- Sexuality factor = **0.60**
- Lust factor = **0.35**
- weighted component cap = **110**
- absolute wage cap = **140**

Representative starting wages:

| Build | Wage |
| --- | ---: |
| Low | 45 |
| Mid | 74 |
| Strong | 104 |

At extreme stats the formula stops at 140 rather than continuing to scale upward indefinitely.

### Why this shape is preferred

It combines four useful properties:

1. weak activation builds are not trapped behind a very low scaling floor;
2. relevant progression still matters strongly;
3. Lust remains a positive wage input as required by D19 but is not the dominant coefficient;
4. the hard 140 cap prevents a high-Lust/high-stat late build from turning hidden work into an unlimited money printer.

---

# 6. Required repayment simulation

## 6.1 Starting economic state

At trap activation:

- debt obligation = **20000**;
- previously received lender grant = **+2000**;
- repayment requires the player to **hold 20000 at once**;
- no partial repayment.

The main tables assume the full 2000 remains unspent.

## 6.2 Gross 20000 with no spending

Recommended wage formula:

| Build | Starting hidden wage | Shifts to gross 20000 |
| --- | ---: | ---: |
| Low | 45 | **169 shifts** |
| Mid | 74 | **155 shifts** |
| Strong | 104 | **147 shifts** |

This deliberately stays far above the 50-shift Bound Life milestone.

Paid Freedom is an economic endurance exit, not a disguised 50-shift ending.

## 6.3 Realistic lodging-only repayment

The character starts this simulation with 2000 cash and pays lodging until the day enough cash is held for the explicit 20000 repayment.

| Build | Cheap 50 | Normal 100 | Street 0 |
| --- | ---: | ---: | ---: |
| Low | **Day 94 / 188 shifts** | **Day 120 / 240 shifts** | **Day 154 / 154 shifts** |
| Mid | **Day 86 / 172 shifts** | **Day 109 / 218 shifts** | **Day 141 / 141 shifts** |
| Strong | **Day 81 / 162 shifts** | **Day 103 / 206 shifts** | **Day 133 / 133 shifts** |

Interpretation:

- cheap is the fastest repayment housing choice because it preserves 2 usable bound Energy while costing only 50;
- normal remains viable but meaningfully slower;
- Street is not a free repayment exploit because Street -1 stacks with bound next-day -1, reducing the day to 1 usable Energy;
- even Strong + cheap does not make 20000 repayment a short route: Day 81 remains far beyond the 50-shift milestone.

### If the +2000 grant was spent

With **0 of the +2000 retained**:

| Build | Cheap | Normal |
| --- | ---: | ---: |
| Low | Day 103 | Day 131 |
| Mid | Day 95 | Day 120 |
| Strong | Day 90 | Day 114 |

The route remains mathematically possible without silently increasing wages to reimburse prior spending.

---

## 6.4 School + Activity opportunity-cost model

To measure the required cross-system tradeoff, use one concrete mixed plan:

Paid School:
- 5 × Body Confidence;
- 5 × Field Craft;
- tuition = **4000 total**;
- Energy = **10 total**.

Those ten lessons contribute:

- Body Confidence: Endurance +10, Sexuality +15, Lust +10;
- Field Craft: Wits +15;
- other course stats are ignored here because they do not improve the recommended wage.

Activity:
- 5 Large Activity entries;
- 2 Energy each;
- **10 Energy total**;
- current executable result economy is modeled as 0 direct money.

The five Activity sessions are placed on separate days from the ten School lessons.

### Repayment with that mixed plan

| Build | Cheap | Normal |
| --- | ---: | ---: |
| Low | **Day 120 / 220 shifts** | **Day 153 / 286 shifts** |
| Mid | **Day 114 / 208 shifts** | **Day 145 / 270 shifts** |
| Strong | **Day 110 / 200 shifts** | **Day 140 / 260 shifts** |

This is the desired tradeoff:

- School improves build and can prepare Takeover;
- Activity remains available;
- using them costs time and money;
- even Low + normal remains reachable before Day 160;
- neither system becomes "free" because the character is bound.

---

# 7. Effect of the bound Energy penalty

With normal or cheap lodging:

```
base Energy 3
Secret Debt next-day penalty -1
= 2 usable Energy
```

Maximum pure hidden-work throughput:
**2 shifts/day**.

With Street:

```
base Energy 3
Secret Debt next-day penalty -1
Street next-day penalty -1
= 1 usable Energy
```

Maximum pure hidden-work throughput:
**1 shift/day**.

Consequences:

- forced Night removes one third of the normal 3-Energy daytime action budget;
- Street removes another third;
- a 2-Energy Activity consumes the whole paid-lodging bound day;
- a paid 1-Energy School lesson leaves room for at most one hidden shift that day;
- base-Energy Street cannot enter a 2-Energy Activity while both penalties are active.

No lodging price, School tuition, Activity cost or Energy rule is changed by this recommendation.

---

# 8. Owner-kill/control route

## 8.1 Exact recommendation

The explicit Takeover / owner-kill-control action requires all of:

- **hidden completed shifts >= 75**
- **Endurance >= 75**
- **Sexuality >= 75**
- **Wits >= 35**
- **Lust >= 30**
- **paid School lessons >= 10**
- bound Secret Debt state is active;
- the player explicitly chooses the authored Takeover action.

No threshold auto-commits the ending.

## 8.2 Why 75 hidden shifts

Bound Life already owns the exact 50-shift hidden Hard Work milestone.

If Takeover also used only 50 shifts, a Mid/Strong build could satisfy its School package at roughly the same time as Bound Life, making the more powerful control route an almost automatic substitute.

75 shifts creates a clear sequence:

1. 50 shifts: Bound Life structural milestone exists;
2. another 25 hidden shifts: deeper route familiarity/control;
3. Takeover still additionally needs deliberate stat/Lust/School construction.

It does not modify the locked 50-shift Bound Life ending.

## 8.3 Why Endurance 75 + Sexuality 75

These are the two stats hidden work actually trains.

A weak activation snapshot at 10/10 receives +1/+1 per hidden shift:

- after 50 shifts: 60/60;
- after 65 shifts: 75/75;
- after the required 75 shifts: 85/85 before School bonuses.

So the gates are reachable from a weak build without requiring a pre-trap specialized character, but they cannot be accidentally present on a fresh low-stat character.

They also remain professional/progression skills, not consent.

## 8.4 Why Wits 35

Takeover is not only bodily endurance or professional sexual performance.

Wits is the independent planning/control axis.

Hidden work does **not** raise Wits.

Field Craft gives Wits +3 per paid lesson, so School has a real mechanical role rather than existing only as a count checkbox.

## 8.5 Why Lust 30

Lust:

- does not grow from hidden work;
- does not grow from forced Night;
- grows voluntarily through Body Confidence at +2 per paid lesson.

Lust 30 is therefore a deliberate build requirement.

It is not a consent substitute.

Passing Lust 30:

- never accepts a sexual/relationship choice;
- never overrides refusal;
- never changes forced Night semantics;
- never auto-selects Takeover;
- only satisfies one numeric prerequisite for a separate explicit strategic ending action.

The same is true of Sexuality: it is a progression/professional stat, not consent.

---

# 9. Takeover reachability examples

These examples keep the simulation activation snapshots from Section 3.

## Low build

Starts:

- Endurance 10;
- Sexuality 10;
- Wits 10;
- Lust 5.

To reach Wits 35 by School alone:

- 9 Field Craft lessons => +27 Wits => 37.

To reach Lust 30:

- 13 Body Confidence lessons => +26 Lust => 31.

So the weak build needs **22 paid lessons**, not merely the structural minimum 10.

With the recommended wage and paid lodging, a greedy work-funded model reaches all Takeover gates approximately:

- **Cheap: Day 51**, around 80 hidden shifts + 22 lessons;
- **Normal: Day 67**, around 112 hidden shifts + 22 lessons.

The extra work above 75 happens because tuition and lodging must be financed.

## Mid build

Starts Wits 30 / Lust 15.

A minimal targeted ten-lesson package can be:

- 2 Field Craft;
- 8 Body Confidence.

Results:

- Wits 36;
- Lust 31;
- ten paid lessons satisfied.

With 75 hidden shifts, Takeover becomes available at approximately **Day 43** under either paid lodging tier in the modeled case.

## Strong build

Starts Wits 50 / Lust 25.

Only 3 Body Confidence lessons are needed for Lust 30; the other 7 paid lessons may be chosen for other build goals.

The 75-shift gate remains binding.

Modeled availability:
approximately **Day 43** with paid lodging.

## Why this is late but reachable

- no weak fresh character can accidentally satisfy the gates;
- a strong character still owes 75 hidden shifts and 10 paid lessons;
- a weak character must make a real School specialization/economy commitment;
- Paid Freedom remains the much later economic route;
- Bound Life remains the earlier 50-shift endurance route.

The three exits therefore retain different identities rather than collapsing into "do 50 shifts and pick the best ending."

---

# 10. Abuse and dominance review

## 10.1 Not the best generic stat-training route

Hidden work:

- positively trains only Endurance and Sexuality;
- gains only two positive points/shift;
- takes two seasonal negative tradeoffs;
- cannot train Wits, Strength, Magic, Reason, Creativity, Charm, Manners, Grooming or Sociability positively;
- never trains Lust.

Ordinary careers remain necessary for broad progression and Palace 10/10.

## 10.2 Not a trivial 20000 farm

Recommended strongest sampled activation case:

- starting wage 104;
- cheap lodging repayment still around Day 81;
- normal around Day 103;
- mixed School/Activity pushes those to about Day 110 / 140.

Wage cap 140 prevents late runaway scaling.

## 10.3 Not mathematically impossible

Recommended weakest sampled activation case:

- cheap repayment around Day 94;
- normal around Day 120;
- Street around Day 154;
- with 10 School + 5 Activity, normal still reaches repayment around Day 153.

Thus the route keeps a narrow but real low-build 160-day completion envelope.

## 10.4 School/Activity remain meaningful

Every School or Activity action competes with hidden work for the reduced bound Energy budget.

School additionally costs 300–500.

The player can prepare Takeover or pursue Activity, but doing so slows Paid Freedom.

## 10.5 Lust does not become a universal power stat

Lust coefficient is 0.35, below Endurance 0.70 and Sexuality 0.60.

The weighted component is capped.

Lust:
- helps hidden pay;
- helps satisfy Takeover at 30;
- does not grow automatically;
- does not represent consent;
- does not substitute for ordinary progression, School count, hidden-shift count or explicit action.

---

# 11. Implementation contract for later producer

This packet recommends data/content constants only.

A later D19 producer should implement exactly:

### Hidden work progression

Every shift:

```
Endurance +1
Sexuality +1
Lust +0
```

Seasonal:

```
Summer: Reason -1
Winter: Sociability -1
```

### Hidden wage

```
round(
  30 + min(
    110,
    0.70 * Endurance
  + 0.60 * Sexuality
  + 0.35 * Lust
  )
)
```

### Takeover gate

```
hidden_shifts >= 75
Endurance >= 75
Sexuality >= 75
Wits >= 35
Lust >= 30
paid_school_lessons >= 10
explicit Takeover action
```

### Must not change

- lender 20%;
- +2000;
- 10-day trap;
- 20000 debt;
- ordinary-career lock;
- School/Activity availability;
- forced Night;
- next-day Energy -1;
- full-only repayment;
- Bound Life 50 hidden shifts;
- Palace exclusion;
- D30/D32 rewards;
- lodging prices;
- School tuition;
- ordinary wage formulas.

---

# 12. Acceptance tests for later implementation

A later producer should prove at minimum:

1. wage at E10 / Sexuality10 / Lust5 = **45**;
2. wage at E30 / Sexuality30 / Lust15 = **74**;
3. wage at E50 / Sexuality50 / Lust25 = **104**;
4. wage never exceeds **140**;
5. Endurance increases exactly +1 per committed hidden shift;
6. Sexuality increases exactly +1 per committed hidden shift;
7. hidden shift never modifies Lust;
8. Summer shift applies Reason -1 exactly once;
9. Winter shift applies Sociability -1 exactly once;
10. Spring/Autumn add no negative package;
11. forced Night still applies next-day Energy -1 exactly once;
12. Street + forced Night leaves one less usable Energy than paid lodging under the same base loadout;
13. Bound Life remains exactly 50 shifts;
14. Takeover is unavailable at 74 shifts;
15. Takeover is unavailable below any of E75 / Sexuality75 / Wits35 / Lust30 / 10 lessons;
16. Takeover becomes available when all gates are met;
17. gate satisfaction never auto-commits Takeover;
18. refusal/consent behavior is unaffected by Sexuality or Lust;
19. repayment requires the full 20000 in one explicit action;
20. D30/D32 Keystone rewards remain unchanged.

---

# 13. Final exact recommendation

| Параметр | Exact recommendation | Почему | Reachability | Abuse risk | Acceptance test |
| --- | --- | --- | --- | --- | --- |
| Hidden-work base wage | **30** | Поднимает trapped work выше ранней ordinary work, но не копирует старую WU/original шкалу | Low build начинает с 45 | Слишком высокий base сделал бы build неважным | E10/Sex10/L5 => wage 45 |
| Endurance wage factor | **0.70** | Выносливость — главный устойчивый профессиональный input | Растёт естественно через hidden work | Не должна одна тащить всю зарплату | E30/Sex30/L15 участвует в wage 74 |
| Sexuality wage factor | **0.60** | Профессиональная сексуальная подача важна, но не равна согласию | Растёт +1/shift | Не использовать как consent gate | Sex contribution считается только в wage/route stat |
| Lust wage factor | **0.35** | D19 требует положительный Lust input, но Lust не должен доминировать | Добровольно растёт через Body Confidence | High Lust не должен превращаться в универсальный money stat | При равных прочих higher Lust повышает wage; Lust +0 от hidden work |
| Weighted wage cap | **110** | Ограничивает runaway scaling | Даёт absolute wage cap 140 | Без cap late build слишком быстро печатает деньги | Любые stats => wage <=140 |
| Hidden shift positive stats | **Endurance +1; Sexuality +1** | Ровно 2 positive points, как ordinary-work baseline | За 50 shifts weak 10/10 становится 60/60 до School | Не становится лучшим all-stat training | Одна committed shift даёт только эти +1/+1 |
| Hidden seasonal negatives | **Summer Reason -1; Winter Sociability -1** | Сохраняет обычный 2-of-4 tradeoff и снижает training dominance | Не режет Takeover route stats | Не добавлять другие negatives | Только Summer/Winter дают ровно один -1 |
| Hidden Lust gain | **0** | Forced work/Night не должен создавать Lust | Lust строится добровольно | Иначе forced route сама открывает high-Lust gate | 50 hidden shifts не меняют Lust |
| Bound Life milestone | **50 hidden shifts — без изменений** | Уже locked D19 | Paid lodging theoretical floor 25 bound days | Не считать ordinary Hard Work | Ending gate остаётся 50 |
| Takeover hidden progress | **75 hidden shifts** | Отделяет control route от 50-shift Bound Life | Mid/Strong с 10 lessons ~Day 43 после bind-model start | Слишком низкий count сделал бы Takeover очевидным upgrade | 74 fail; 75 may pass only with all other gates |
| Takeover Endurance | **>=75** | Route-owned resilience axis | Low hidden work достигает самостоятельно к глубокой стадии | Не использовать для consent | E74 fail / E75 pass-condition |
| Takeover Sexuality | **>=75** | Professional control axis, не consent | Low hidden work достигает самостоятельно | Не открывает intimacy/romance автоматически | Sex74 fail / Sex75 pass-condition |
| Takeover Wits | **>=35** | Независимая планирующая/control ось | Field Craft +3 даёт целевой School путь | Hidden work не должна сама выдавать весь Takeover build | Wits34 fail /35 pass-condition |
| Takeover Lust | **>=30** | Делает high-Lust требование добровольным и заметным | Body Confidence +2: Mid 15 требует 8 занятий; Low 5 требует 13 | Lust не означает согласие и не auto-commit | Lust29 fail /30 pass-condition |
| Takeover School | **>=10 paid lessons — без изменений** | Locked D19; сохраняет cross-system cost | Mid может закрыть 8 Body +2 Field | Не считать Night Study как paid lessons | 9 paid fail /10 paid satisfies only this gate |
| Repayment | **20000 full explicit action — без изменений** | Сохраняет экономический exit | Recommended Low: cheap ~94d, normal ~120d; mixed normal ~153d | Partial payment упростил бы trap | 19999 fail; 20000 allows explicit repay |
| Bound Energy penalty | **next-day -1 — без изменений** | Главная action-economy цена маршрута | Paid lodging оставляет 2 Energy; Street 1 | Meta/housing не должны отменять penalty | Same loadout bound = one usable Energy less than unbound |

---

**READY_FOR_LEADER_PRODUCT_DECISION**
