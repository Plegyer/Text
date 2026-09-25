# Full 160-Day Run Simulation v1

Дата: 2026-09-25.

Статус: **EXECUTED NUMERIC CHECK**.

Uses `CORE_NUMERIC_BASELINE_v1.md`.

Relationship/career dialogue is free reactive content and therefore not reserved as Energy.

Activity reward is conservatively valued at 0 money in these budgets.

## 1. Scenario definitions

### A — Hard Work basic life

Explicit commitments:
- at least 50 shifts in target profession;
- 8 paid School lessons;
- 5 Large Activity entries;
- 10 Night-study nights;
- normal or cheap housing.

School average test price:
- 8 WU.

### B — Career + education life

- at least 50 target-job shifts;
- 15 paid lessons;
- 10 Activity entries;
- 10 Night-study nights.

### C — Activity-heavy life

- at least 50 target-job shifts;
- 10 paid lessons;
- 20 Activity entries;
- 5 Night-study nights.

Other dialogue/relationship/career events may occur on top at 0 Energy.

## 2. Fresh + normal room

Profile:
- 3 Energy/day;
- 12 WU start;
- wage 1 WU;
- rent 2 WU;
- 160 days.

### Scenario A
Economy requires about 372 total work shifts to pay:
- 320 WU rent;
- 64 WU School;
- minus 12 WU start.

Energy after ten study penalties:
- 470.

Explicit Energy:
- 372 work;
- 8 School;
- 10 Activity;
= 390.

Slack:
- **80 Energy**.

Result:
Hard Work + moderate School + 5 expeditions is feasible, but the life is strongly work-dominated.

### Scenario B
Required work:
~428 shifts.

Available Energy after study:
470.

Used:
- 428 work;
- 15 School;
- 20 Activity;
= 463.

Slack:
- **7 Energy**.

Result:
fresh normal-room character can barely combine a full labor life, substantial education and 10 expeditions if Activity gives no money.

This is an intentionally hard edge case.

### Scenario C
Required work:
~388 shifts.

Available Energy after five study nights:
475.

Used:
- 388 work;
- 10 School;
- 40 Activity;
= 438.

Slack:
- **37 Energy**.

Result:
Activity-heavy fresh life is feasible, but requires large work volume to fund rent/School.

## 3. Fresh + cheap lodging

Same income/School, rent 1 WU.

### Scenario A
Required work:
~212.

Energy used:
230 of 470.

Slack:
**240**.

### Scenario B
Required work:
~268.

Energy used:
303 of 470.

Slack:
**167**.

### Scenario C
Required work:
~228.

Energy used:
278 of 475.

Slack:
**197**.

Interpretation:
cheap lodging radically changes opportunity structure.

That is intentional poverty gameplay.

Its cost is lost privacy/Night/storage/social options, not fake dialogue Energy.

## 4. Mid-meta example

Illustrative strong loadout:
- +1 Energy/day;
- No Rent;
- starting money 24 WU equivalent.

Energy:
- 4/day = 640 before Night-study penalties.

### Scenario A
Only the 50 target shifts are economically necessary.

Used:
- 50 work;
- 8 School;
- 10 Activity;
= 68 of 630.

### Scenario B
School costs 120 WU; after 24 start, about 96 work shifts fund it.

Used:
- 96 work;
- 15 School;
- 20 Activity;
= 131 of 630.

### Scenario C
~56 work funds School beyond start.

Used:
106 of 635.

Interpretation:
two powerful endings can already transform the life sim from survival-heavy to choice-heavy.

This is desired.

## 5. Late-meta example

Illustrative:
- all ten Hard Work automatic rewards;
- +1 Energy;
- No Rent;
- School -25%;
- post-Palace third slot exists for another goal-specific perk;
- 24+ WU start before other rewards.

### Scenario B
School cost drops from 120 to 90 WU.

Work needed after starting money:
~66.

Explicit Energy:
- 66 work;
- 15 School;
- 20 Activity;
= 101 of ~630.

More than 500 Energy remain for:
- other professions;
- more Activity;
- Night-study penalties;
- explicit quest actions.

Reactive relationships still occur on top.

## 6. Hard Work timing

50 shifts costs 50 Energy.

Pure grind:
- max 3 shifts/day fresh;
- theoretical 17 days.

This is accepted.

Why it is not free:
- those 50 Energy were not spent on School/Activity/other jobs;
- money may be needed for rent;
- player still must finish/commit the run ending to obtain meta reward.

No seasonal breadth requirement is added.

## 7. Night study role

Ten Night-study nights:
- provide up to +20 directed stat points;
- remove 10 daytime Energy from the run;
- cost no tuition;
- occupy ten Night slots.

Fresh:
useful when money is the bottleneck.

Meta-rich:
paid School often becomes more attractive because money is easier and Energy is valuable for content.

This creates a natural shift in strategy across NG+.

## 8. Stat cap check

With cap 100:
- 50-shift Hard Work normally raises primary work axes by tens, not hundreds;
- School can finish a gate;
- 80–160 repeated shifts can hit cap, which is acceptable for extreme specialization;
- negative seasonal effects cannot push below 0.

No evidence from this pass requires a cap below 100.

## 9. Job unlock compatibility

The current gates remain compatible with these budgets:

- focused fresh work+School can unlock mid jobs in Year 1;
- late jobs can be forced in late Year 1;
- calendar fallback remains useful for non-optimized lives;
- meta profiles reach the same gates dramatically earlier.

Free relationship scenes do not distort this timing.

## 10. Conclusion

The v1 numeric core is internally coherent enough for implementation:

- 160-day run;
- 3 fresh Energy;
- Work 1;
- School 1 + expensive tuition;
- Activity 2;
- normal/cheap/street housing;
- free reactive relationship/career scenes;
- 0..100 stats;
- 50-shift simple Hard Work;
- stat-gated jobs with calendar fallback;
- strong meta easing.

Remaining numbers should be tuned through playable builds, not redesigned in abstraction.
