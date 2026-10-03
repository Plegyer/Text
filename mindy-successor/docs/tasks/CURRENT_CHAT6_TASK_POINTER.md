# CURRENT CHAT6 TASK POINTER

Status: **ACTIVE — PALACE DAILY CADENCE + DUTY ECONOMY v14**
Owner: Chat 6

Accepted prior Product packet:
`chat6/palace-nontrue-ending-rewards-v13@7673e9f47404468175567d952825cf0b0e981ed3`

Leader authority:
D39 now locks:
- Service Life -> `palace.service-life.steady-practice` Specialist;
- Court Power -> `palace.court-power.formal-introduction` Specialist;
- Inner Truth -> `palace.inner-truth.source-method` automatic knowledge;
- exact reward mechanics/caps from v13;
- no free Palace Specialist slot.

Authority commit:
`main@3116eaef4f5e74b65435f8067fdf628bbdce6be9`

## New assignment

Close the largest remaining mechanical Palace Product blocker:
**exact daily cadence and duty economy**.

New branch:
`chat6/palace-daily-cadence-economy-v14`

Create:
1. `mindy-successor/docs/tasks/CHAT6_PALACE_DAILY_CADENCE_ECONOMY_v14.md`
2. `mindy-successor/research/palace_cadence_economy_v1.csv`

No production runtime/UI/content changes.
No full CI.

## Authority to preserve

- D23: Palace entry only from permanent ordinary 10/10 + active 10/10, deterministic Day-1 invitation for that life;
- D29: six stages and structural duty milestones **2 / 5 / 8 / 12 / 15**;
- exactly 15 structural duties in the accepted v12 authored map;
- no `hardWork:palace`;
- D26 ordinary same-career cadence does **not** silently apply to Palace;
- Palace Night remains optional and loses to Secret Debt forced Night;
- True Ending still needs Outcome Ready + progression-complete + all 12 stats >=91 + Prince defeat + explicit Return Home;
- Lust excluded from True stat gate;
- D39 non-True rewards remain unchanged.

## Required comparison

Compare at minimum these Palace daytime models:

### Model A — one structural duty per calendar day max
A Palace duty consumes Energy but no second structural duty may be completed that day.

### Model B — Energy-driven multiple duties per day
Multiple structural duties may be completed in one day if Energy permits.

### Model C — one structural duty + optional support work
At most one progression-counting structural duty/day, but optional non-counting Palace support/review/social daytime actions may use remaining Energy.

You may recommend a refined variant, but must explicitly compare A/B/C.

## Exact decisions required

Recommend exact values for:

1. Palace structural duty Energy cost;
2. max progression-counting duties per day;
3. whether optional non-counting Palace daytime actions exist;
4. their Energy cost;
5. whether Palace duty itself ends daytime or merely consumes Energy;
6. earliest realistic calendar day for duty 15 after a Day-1 invitation;
7. reference completion windows for:
   - Palace-focused life;
   - mixed Palace + ordinary career life;
   - Palace + School life;
8. how Palace fits 160-day calendar without becoming either trivial burst content or 15-day dead waiting;
9. exact wage/payment model for structural duty;
10. whether optional Palace support work pays;
11. exact stat gain package per duty family OR an explicit decision that duty families do not grant routine progression stats;
12. any negative duty effects, with exact scope if recommended;
13. whether Palace work uses ordinary wage-scaling stats or a distinct bounded formula;
14. how normal/cheap/street lodging interacts with Palace daytime work;
15. Palace Night interaction;
16. Secret Debt next-day Energy -1 ordering;
17. whether a bound Secret Debt character may perform Palace daytime duties after Palace was already legitimately opened — treat this as a Product question and recommend one explicit rule;
18. save/reload boundaries;
19. exactly-once duty-count increment;
20. prevention of duty farming / duplicate progression;
21. how optional route-prep beats coexist with cadence;
22. how Service Life / Court Power / Inner Truth readiness timing stays non-exclusive;
23. exact acceptance-test matrix.

## Economy grounding

Use **current executable economy**, not old WU assumptions.

Read:
- `LEADER_LIVE_ECONOMY_DRIFT_AUDIT_v1.md`;
- Chat 3 live affordability harness v7;
- current lodging prices 100 / 50 / 0;
- current ordinary wage scale;
- current School tuition.

Do not make Palace wages so dominant that ordinary careers become obsolete.
Do not require Palace work to finance a hidden 15-day loss with impossible costs.

Compare at least 3 wage shapes:
- flat bounded Palace wage;
- stat-scaled Palace wage;
- mixed base + bounded stat component.

## Progression-stat caution

Palace is a late/meta-gated career.

Do not casually make its 15 duties the fastest way to raise all 12 stats toward 91.

If duty stat gains exist:
- keep them narrow by duty family;
- quantify total maximum contribution over 15 duties;
- compare against School and ordinary career progression.

Do not increase Lust automatically from Palace duty unless explicitly justified; Lust remains outside the True gate.

## Secret Debt precedence

If you recommend Palace daytime work remains legal while bound:
- ordinary 10 careers stay locked as D19 requires;
- forced Night still occurs;
- next-day Energy -1 remains a real loss;
- Palace cannot become a trivial debt farm.

If you recommend Palace daytime work is suspended while bound:
- explain run-state semantics and how access/progress resumes after release.

Pick one recommendation.

## Final deliverable

End with an exact Russian table:

`Параметр | Рекомендованное значение | Почему | Balance risk | Acceptance test`

Then give one exact reference timeline from Day-1 invitation to duty 15 and all three non-True route readiness windows.

Mark:
`READY_FOR_LEADER_PRODUCT_DECISION`.

Freeze exact SHA.
