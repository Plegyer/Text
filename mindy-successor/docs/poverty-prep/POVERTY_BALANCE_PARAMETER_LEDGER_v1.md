# Poverty Balance Parameter Ledger v1

Status: inventory of poverty / Secret Debt numeric parameters that remain balance-owned rather than structurally locked.

Rule: current placeholder/range values are evidence for simulation only. They are **not** promoted to final Product numbers by this ledger.

## Classification

- **BALANCE_DATA** — existing structures can accept a different numeric value without new behavior.
- **CONTENT_ONLY** — value sits in authored content/event definition, no generic runtime change expected.
- **RUNTIME_REASSESSMENT_ONLY_IF_SHAPE_CHANGES** — numeric tuning alone is data/content; runtime changes only if Product changes the behavior model, not just the number.

## Ordinary lodging costs

### Normal room nightly cost

Source:
`HOUSING_AND_NIGHT_BALANCE_v1.md`

Current candidate:
`2 WU/night`.

Authority status:
simulation-supported candidate, not locked.

Systems affected:
- lodging affordability;
- work/school tension;
- anti-softlock frequency;
- housing choice distribution.

Required simulations:
- poor start;
- balanced work + school;
- grinder;
- education-focused;
- lodging affordability across starting cash/wage assumptions.

Change type:
**BALANCE_DATA**.

### Cheap lodging nightly cost

Source:
`HOUSING_AND_NIGHT_BALANCE_v1.md`

Current candidate:
`1 WU/night`.

Authority status:
candidate, not locked.

Systems affected:
- cheap-vs-normal tradeoff;
- School affordability;
- frequency of street sleep.

Required simulations:
- same housing/economy scenarios as normal room;
- ensure cheap lodging is useful but not strictly dominant.

Change type:
**BALANCE_DATA**.

### Street monetary cost

Source:
`ECONOMY_AND_POVERTY_DRAFT_v0.md`, `HOUSING_AND_NIGHT_BALANCE_v1.md`.

Current structural candidate:
`0` money.

Authority status:
street is directed as the zero-money fallback; exact currency model remains broader balance work.

Systems affected:
- anti-softlock;
- street frequency;
- poverty event exposure.

Required simulations:
- zero-money survival;
- repeated street use;
- compare against cheap lodging.

Change type:
**BALANCE_DATA**, but removing zero-cost fallback would require Product-level anti-softlock reassessment.

## Street penalties

### Next-day Energy penalty

Sources:
`ECONOMY_AND_POVERTY_DRAFT_v0.md`, `HOUSING_AND_NIGHT_BALANCE_v1.md`.

Current candidate:
`-1` next-day Energy in housing balance candidate.

Authority status:
exact magnitude OPEN.

Systems affected:
- next-day action budget;
- work recovery;
- School reachability;
- Activity reachability;
- probability of poverty spiral.

Required simulations:
- poor start;
- repeated street nights;
- work-only recovery;
- Activity-focused day after street;
- combination with forced Secret Debt Night if applicable.

Change type:
**BALANCE_DATA**.

### Grooming / condition pressure

Source:
`HOUSING_AND_NIGHT_BALANCE_v1.md`.

Current candidate:
`Grooming -1` per street night.

Authority status:
candidate; exact penalty/content OPEN.

Systems affected:
- social/relationship access;
- presentation/social progression;
- recovery item/event demand.

Required simulations:
- repeated street use;
- recovery availability;
- relationship gating sensitivity.

Change type:
**BALANCE_DATA** if the same stat is used; **CONTENT_ONLY** if final design uses contextual statuses instead of a universal penalty.

## Broader poverty economy candidates

These affect poverty simulations but are not locked by the poverty structure:

### Starter wage

Source:
`HOUSING_AND_NIGHT_BALANCE_v1.md` candidate.

Current placeholder:
`1 WU`.

Required simulations:
- all housing affordability scenarios;
- school/work tradeoff;
- recovery speed.

Change type:
**BALANCE_DATA**.

### Starting money

Source:
`HOUSING_AND_NIGHT_BALANCE_v1.md` candidate.

Current placeholder:
`12 WU`.

Required simulations:
- number of nights before poverty pressure;
- school affordability;
- poor-start variance.

Change type:
**BALANCE_DATA**.

### Basic School price

Source:
`HOUSING_AND_NIGHT_BALANCE_v1.md` candidate.

Current placeholder:
`6 WU`.

Required simulations:
- work + school + housing loop;
- cheap lodging incentive;
- education starvation.

Change type:
**BALANCE_DATA** under School balance ownership.

## Secret Debt offer chance

Sources:
`ECONOMY_AND_POVERTY_DRAFT_v0.md`, `POVERTY_HIDDEN_CAREER_DRAFT_v0.md`.

Current placeholder/range:
`10–20%` per eligible one-time street check, with at most one offer opportunity per run.

Authority status:
chance inside the range is OPEN balance.

Systems affected:
- discoverability;
- proportion of runs exposed to route;
- street-sleep incentive/risk.

Required simulations:
- probability of seeing offer across realistic street-use counts;
- refusal/acceptance route frequency;
- ensure Secret Debt remains secret/exceptional rather than mandatory poverty tutorial.

Change type:
**BALANCE_DATA / CONTENT_ONLY event parameter**.

## Secret Debt principal / immediate help

Sources:
`ECONOMY_AND_POVERTY_DRAFT_v0.md`, `POVERTY_HIDDEN_CAREER_DRAFT_v0.md`.

Current placeholder:
`~2000` money.

Authority status:
OPEN exact amount.

Systems affected:
- attractiveness of offer;
- immediate escape from poverty;
- School/lodging/item affordability;
- debt-route temptation.

Required simulations:
- poor start before/after acceptance;
- immediate spending patterns;
- compare to wages/lodging/School/item costs.

Change type:
**BALANCE_DATA**.

## Delayed debt amount

Sources:
`ECONOMY_AND_POVERTY_DRAFT_v0.md`, `POVERTY_HIDDEN_CAREER_DRAFT_v0.md`.

Current placeholder:
`~20000` future obligation.

Authority status:
OPEN exact amount.

Systems affected:
- paid_freedom feasibility;
- severity of trap;
- ordinary economy vs hidden-career activation.

Required simulations:
- debt trap scenario;
- grinder income;
- high-income late jobs where reachable before binding;
- paid_freedom accumulation;
- avoid impossible/trivial buyout.

Change type:
**BALANCE_DATA**.

## Activation delay

Source:
`POVERTY_HIDDEN_CAREER_DRAFT_v0.md` current directed draft describes activation around day +10.

Current placeholder:
`10 days` in the draft.

Authority status:
treat as balance-owned unless a later Product lock explicitly fixes it; `USER_DECISIONS_LOCKED_v1.md` leaves exact Secret Debt numbers/penalties/rewards open.

Systems affected:
- time to spend/prepare/save;
- likelihood of reaching another career milestone before binding;
- debt feasibility;
- seasonal/calendar interactions.

Required simulations:
- accept at different calendar positions;
- poor/balanced/grinder lives during delay;
- save/reload across activation boundary;
- ensure activation timing is neither trivial nor unfairly abrupt.

Change type:
**BALANCE_DATA** so long as delayed-activation semantics stay unchanged.

## Forced-Night Energy penalty

Source:
`POVERTY_HIDDEN_CAREER_DRAFT_v0.md`.

Current placeholder:
negative next-day Energy modifier; exact magnitude not specified.

Authority status:
OPEN.

Systems affected:
- bound-career daytime action budget;
- School/Activity feasibility if allowed;
- recovery/spiral severity;
- interaction with street/cheap lodging modifiers.

Required simulations:
- repeated bound nights;
- composition with each housing context;
- work progression under penalty;
- Activity/School coexistence if Product allows them.

Change type:
**BALANCE_DATA** after modifier-composition policy is defined. Composition policy itself is Product/content behavior, not a mere number.

## Secret Debt career stat gains

Source:
`POVERTY_HIDDEN_CAREER_DRAFT_v0.md`.

Current structural direction:
shift grows Strength, Endurance and Sexuality design axis.

Current numeric placeholder:
none.

Authority status:
exact gains OPEN.

Systems affected:
- career progression speed;
- takeover/build reachability;
- broader stat economy.

Required simulations:
- repeated shifts;
- compare hidden-career growth to ordinary careers;
- ensure forced Night penalties do not make progression mathematically nonviable.

Change type:
**BALANCE_DATA** once final stat mapping is authoritative.

## Career progression thresholds

Source:
`POVERTY_HIDDEN_CAREER_DRAFT_v0.md`.

Current placeholder:
none.

Authority status:
OPEN.

Includes:
- stage thresholds;
- milestone timing;
- bound_life eligibility progression;
- takeover career-progress requirement.

Required simulations:
- minimum/typical days to each stage;
- outcome reachability;
- avoid one-dimensional shift-count ladder.

Change type:
**BALANCE_DATA / CONTENT_ONLY conditions**.

## Outcome economic / build thresholds

### `paid_freedom`

Numeric driver:
debt payoff amount and any accepted payment condition.

Current placeholder:
derived from the open delayed debt amount.

Change type:
**BALANCE_DATA**.

### `bound_life`

Numeric driver:
career progress/stage threshold if Product chooses numeric gating.

Current placeholder:
none.

Change type:
**BALANCE_DATA / CONTENT_ONLY**.

### `takeover`

Numeric drivers:
- career progress;
- selected stat/build thresholds;
- any item/resource requirement.

Current placeholder:
none.

Change type:
**BALANCE_DATA / CONTENT_ONLY** after Product chooses dependency identities.

## Outcome Meta rewards

Source:
`POVERTY_HIDDEN_CAREER_DRAFT_v0.md`.

Current placeholder:
none; all exact rewards OPEN.

Qualitative notes only:
- paid_freedom: economy-type family suggested;
- bound_life: Hard-Work-analogue family suggested;
- takeover: stronger/rule-changing qualitative intent documented.

Required simulations:
- compare to ordinary Hard Work Meta;
- avoid trivializing economy after one easy ending;
- verify Palace prerequisite remains ordinary-only.

Change type:
**CONTENT_ONLY / META_BALANCE_DATA** after Product selects exact rewards.

Runtime work:
not required merely to change numeric reward magnitude if chosen reward fits existing Meta primitives.

## Summary table

| Parameter | Placeholder/range | Final? | Default change type |
| --- | --- | --- | --- |
| normal room cost | 2 WU | NO | BALANCE_DATA |
| cheap lodging cost | 1 WU | NO | BALANCE_DATA |
| street cost | 0 | structural fallback, broader economy still open | BALANCE_DATA |
| street Energy penalty | -1 candidate | NO | BALANCE_DATA |
| street Grooming penalty | -1 candidate | NO | BALANCE_DATA/content |
| starter wage | 1 WU candidate | NO | BALANCE_DATA |
| starting money | 12 WU candidate | NO | BALANCE_DATA |
| basic School price | 6 WU candidate | NO | BALANCE_DATA under School |
| lender chance | 10–20% candidate range | NO | BALANCE_DATA/content |
| immediate principal | ~2000 | NO | BALANCE_DATA |
| delayed debt | ~20000 | NO | BALANCE_DATA |
| activation delay | 10 days draft placeholder | treat OPEN pending lock | BALANCE_DATA |
| forced-Night Energy penalty | negative, magnitude unspecified | NO | BALANCE_DATA after composition decision |
| career stat gains | no numbers | NO | BALANCE_DATA |
| stage/outcome thresholds | none | NO | BALANCE_DATA/content |
| exact Meta rewards | none | NO | CONTENT/META balance |

## Runtime escalation rule

Changing any number above does **not** by itself justify runtime/schema work.

Runtime work is justified only if Product changes the behavior shape, for example:
- introduces a new persistent resource/state;
- requires a modifier-composition primitive not expressible today;
- chooses a threshold/check type not supported by current condition/effect model.

Numeric tuning stays in balance/content data whenever possible.
