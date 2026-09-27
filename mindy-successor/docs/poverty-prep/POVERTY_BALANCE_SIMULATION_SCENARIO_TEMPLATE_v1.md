# Poverty Balance Simulation Scenario Template v1

Status: reusable scenario template for future numeric balancing of ordinary poverty + Secret Debt.

Rule: every numeric value below is an input parameter, never a Product decision made by the simulation template.

## Common input vector

Use named parameters rather than hard-coded values:
- starting money;
- starting Energy/condition/Grooming;
- starter-job wage;
- normal-room cost;
- cheap-lodging cost;
- street next-day Energy penalty;
- street Grooming/condition penalty;
- cheap-lodging penalty/event parameters;
- School price/frequency where scenario includes School;
- ordinary street-event weights/effect magnitudes;
- recovery/help-event frequency/value;
- lender encounter chance;
- Secret Debt immediate principal;
- delayed debt amount;
- activation delay;
- forced-Night Energy penalty;
- hidden-career wage/debt effect/stat gains;
- ending thresholds/payoff/build requirements where relevant.

Optional random-seed input:
- fixed seed per run;
- repeated seed set for Monte Carlo distribution;
- seed must be reported with outputs for reproducibility.

## Common outputs

Record at minimum:
- days survived without softlock;
- days to first zero-money state;
- days from zero money to positive stable buffer;
- number of street nights;
- number of cheap-lodging nights;
- number of normal-room nights;
- total work actions;
- total School actions where relevant;
- missed/blocked action opportunities;
- total money earned/spent;
- lowest money balance;
- average next-day Energy;
- fraction of days with reduced Energy;
- Grooming/condition trajectory where used;
- recovery-source usage counts;
- ordinary street-event counts by helpful/neutral/bad family;
- Secret Debt offer seen/accepted/refused;
- activation day if accepted;
- days bound;
- time to each Secret Debt outcome if reachable;
- whether any state has zero legal progress actions.

## Common metrics

### Anti-softlock

Measure:
- `softlockRate` = runs with no legal progress/recovery action / total runs;
- `zeroMoneyNextDaySuccessRate`;
- `medianRecoveryDaysFromZero`;
- `p95RecoveryDaysFromZero`.

Acceptance direction:
- ordinary poverty should remain recoverable without Secret Debt;
- simulation should reveal, not hide, parameter sets that create unavoidable downward spirals.

### Housing choice pressure

Measure:
- lodging distribution;
- money saved by cheap vs normal;
- frequency street becomes forced rather than chosen;
- average days between normal-room stays.

Goal:
- reveal dominance or irrelevance of any housing tier.

### Work / School tension

Measure:
- fraction of earned money consumed by housing;
- School affordability rate;
- work actions needed per paid School action;
- days where School becomes unreachable solely due to housing pressure.

### Energy pressure

Measure:
- average Energy by housing context;
- consecutive reduced-Energy days;
- rate of inability to afford desired daytime action;
- modifier stacking cases.

### Secret Debt discoverability and trap severity

Measure:
- probability offer appears over realistic street exposure;
- acceptance-rate input/behavioral branch if modeled;
- money buffer after principal;
- value spent before activation;
- severity at activation;
- time/feasibility of paid freedom;
- bound progression viability.

Do not optimize toward a particular acceptance rate without Product direction.

## Scenario S1 — zero-money recovery

Purpose:
stress-test absolute anti-softlock floor.

Initial state:
- money = 0;
- no optional recovery item assumed;
- no relationship helper assumed;
- Secret Debt disabled for baseline run;
- starting-job recovery path available according to ordinary rules.

Actions/policy:
- choose street when paid lodging is unaffordable;
- choose deterministic legal income action when available;
- avoid optional School spending until stable buffer if policy requires.

Outputs of interest:
- can next day always be reached?
- first day positive money returns;
- days to afford cheap lodging;
- days to afford normal lodging;
- Energy/condition trajectory;
- whether any day has no legal recovery action.

Compare parameter sweeps:
- starter wage;
- street penalty;
- lodging costs.

Do not set their final values here.

## Scenario S2 — poor but stable

Purpose:
measure a low-buffer life that alternates work, housing and occasional optional spending.

Initial state:
- small positive money buffer;
- no Secret Debt;
- ordinary starter/mid work path;
- normal/cheap/street all potentially reachable.

Policy examples:
- choose cheap lodging below a configurable money buffer;
- choose normal lodging above a configurable buffer;
- one optional non-work action every N days as scenario input.

Outputs:
- long-run money trend;
- lodging mix;
- street frequency;
- average Energy;
- recovery-event dependence;
- variance across seeds.

Success signal:
- low-buffer life can remain playable without either free prosperity or inevitable collapse.

## Scenario S3 — work + cheap lodging

Purpose:
test whether cheap lodging forms a meaningful sustainable tradeoff.

Inputs:
- work frequency;
- cheap price;
- cheap penalty/restriction parameters;
- wage.

Outputs:
- net money/week;
- average Energy/condition;
- number of actions preserved vs normal lodging;
- number of social/School opportunities lost if cheap housing restricts them;
- transition frequency back to normal room/street.

Compare:
- cheap lodging must neither be strictly dominated nor automatically dominate normal room across all plausible parameters.

## Scenario S4 — work + School pressure

Purpose:
measure tension between advancement spending and basic survival.

Inputs:
- School price/frequency;
- wage;
- lodging prices;
- Energy costs;
- any housing restriction on study.

Policy:
- alternate work and School under configurable priority;
- use cheap/street fallback only according to legal affordability.

Outputs:
- lessons/course progress over time;
- money buffer;
- housing distribution;
- street frequency;
- number of days School becomes unaffordable;
- time to recover after School spend.

Do not infer a final School price from this scenario alone.

## Scenario S5 — repeated street sleep

Purpose:
stress-test poverty spiral risk.

Initial state:
- force or strongly bias street selection for a configurable run length;
- Secret Debt disabled in baseline subcase.

Inputs:
- street Energy penalty;
- condition/Grooming penalty;
- street-event distribution;
- wage/recovery sources.

Outputs:
- Energy trajectory;
- consecutive degraded days;
- money recovery rate;
- relationship/social access loss if modeled;
- softlock rate;
- time to escape street cycle.

Required subcase:
- no helpful random event, to verify baseline recovery does not depend on luck.

## Scenario S6 — Secret Debt accepted

Purpose:
measure temptation, delay window and bound-route viability without choosing numbers.

Initial condition:
- reach eligible street context;
- force acceptance branch after offer for deterministic scenario;
- use parameterized lender chance only in discoverability subruns.

Inputs:
- principal;
- debt amount;
- activation delay;
- spending policy before activation;
- forced-Night penalty;
- hidden-career progression parameters;
- outcome thresholds if supplied by Product.

Outputs:
- money immediately after acceptance;
- amount spent before activation;
- money at activation;
- time bound;
- average Energy while bound;
- hidden-career progression rate;
- paid-freedom feasibility/time;
- takeover/bound-life reachability if their dependencies are configured;
- any day with no legal progress path.

Important:
- School/Activity availability must be passed as scenario input only after Product decides it;
- do not assume either policy.

## Scenario S7 — Secret Debt refused

Purpose:
prove ordinary poverty remains viable after declining the hidden route.

Initial condition:
- eligible street context;
- offer occurs deterministically for scenario;
- choose refusal;
- lender cannot reoffer during same run.

Outputs:
- ordinary recovery time;
- street frequency after refusal;
- whether run remains playable;
- whether any later offer incorrectly appears;
- reliance on work/cheap lodging/help events.

Compare against S1/S2:
- refusal should not turn ordinary poverty into a dead end.

## Monte Carlo protocol

For stochastic parameters:
- run a declared seed set;
- record sample count;
- record parameter vector;
- report median/p10/p90/p95 where relevant;
- report softlock and extreme-tail cases separately;
- preserve failing seeds for deterministic regression reproduction.

Do not average away softlocks.

## Parameter sweep protocol

Vary one or two parameter families at a time where practical:
- housing prices;
- wage;
- street penalty;
- lender chance;
- principal/debt ratio;
- activation delay;
- forced-Night penalty.

Keep all other inputs explicit in the result artifact.

## Output report shape

Each simulation report should include:
```text
scenarioId
parameterVector
policyAssumptions
seed / seedSet
sampleCount
summaryMetrics
tailFailures
softlockCases
dominantStrategySignals
decisionNotes
```

`decisionNotes` summarize tradeoffs only. They do not select final Product values.

## Runtime vs balance separation

If a parameter sweep changes only outcomes numerically, keep it in balance/content data.

Escalate to runtime only when the simulation exposes a missing behavior primitive, such as:
- no way to compose accepted next-day modifiers;
- no durable delayed activation owner;
- no job-availability gate for bound state;
- no exactly-once transaction boundary.

Poor numeric tuning is not automatically a runtime defect.
