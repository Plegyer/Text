# CURRENT CHAT5 TASK POINTER

Status: **ACTIVE — SECRET DEBT PARAMETRIC BALANCE HARNESS v4**
Owner: Chat 5

Completed balance model:
`chat5/secret-debt-successor-balance-model-v3@5d72d625ddef0bd3ba8125bcb07f94dcf7ed88b7`

Its numbers remain PROPOSAL, not Product authority.

Create:
`chat5/secret-debt-balance-harness-v4`
from fresh main.

## Assignment

Build an isolated research/test harness that can evaluate Secret Debt tuning without wiring proposal values into production runtime.

Parameter inputs:
- per-shift Strength / Endurance / Sexuality gains;
- wage base;
- Strength / Endurance / Lust wage factors;
- Takeover Strength / Endurance / Sexuality / Lust thresholds;
- lodging choice;
- +1 daily Energy on/off;
- School lesson mix;
- Activity cadence.

Outputs:
- day to 50 hidden shifts;
- day to 10 School lessons;
- day to full 20000 repayment;
- day Takeover first becomes eligible;
- money/energy trajectory;
- whether the route is impossible before day 160.

Include at least three presets:
- conservative/harsh;
- current v3 proposal;
- more forgiving.

The harness must label all presets as research only.
Do not modify Secret Debt production constants/runtime.
No full CI.
Freeze SHA and report `READY_FOR_LEADER_BALANCE_TOOL`.
