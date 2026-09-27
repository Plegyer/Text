# Ordinary Poverty Initial-Tuning Ledger v1

Status: tuning ledger for production content introduced by Queue items 87 and 91.

Nothing in this ledger is a Product lock unless separately promoted by Product authority.

## Status vocabulary

- **INITIAL_TUNING** — current production-content value/placement chosen to make the first slice executable and testable.
- **STRUCTURAL_GUARD** — non-negotiable safety/architecture constraint; not a balance value.
- **CONTENT_SEED** — authored identity/text/context that may be rewritten without changing the mechanical contract.

## Structural guards that are NOT tuning

The following remain fixed around the initial values:
- street lodging remains the zero-money fallback;
- ordinary street content does not require Secret Debt;
- every pressure event retains a free/safe resolution where loader validation requires one;
- ordinary poverty must leave a practical next-day recovery path;
- lodging prices/base penalties are unchanged by items 87/91;
- events use existing NightFlow only;
- event effects commit exactly once across reload;
- Secret Debt/lender content is absent.

## Item 87 — street production pack

Production file:
`content/packs/poverty-street-production.json`.

### Helpful summer event

Event:
`poverty-street-production.helpful-summer`

| Choice/value | Status | Rationale | Anti-softlock bound | Safe adjustment direction |
| --- | --- | --- | --- | --- |
| season = `summer` | INITIAL_TUNING / CONTENT_SEED | keeps first production family deterministic and away from the existing day-0 spring poverty baseline | ordinary recovery must not depend on reaching summer | may move/add seasons if baseline reachability and regression expectations are updated |
| money delta = `+10` on `take-errand` | INITIAL_TUNING | proves an authored helpful economy effect using existing resource primitive | helpful reward must never be required for survival | downward toward 0 is mechanically safer; upward requires economy simulation so random help does not dominate work |
| cooldown = `2` days | INITIAL_TUNING | prevents every-night repetition while keeping content visible | no recovery path may depend on cooldown expiry | increasing cooldown reduces reliance/frequency; decreasing requires repetition review |
| maxShows = `40` | INITIAL_TUNING | effectively reusable across a long run without being unlimited | must not become mandatory income | lower is always safer for dependence; higher requires repetition review |
| priority = `30` inside `normal_progression` | INITIAL_TUNING | deterministic ordering within the ordinary event class | must remain below forced/critical class semantics | adjust within class only after collision audit |
| fallback media = `stage.outside` | CONTENT_SEED | reuses shipped static media; no invented asset path | mechanics must work without bespoke media | replace with semantic presentation mapping later; mechanics unchanged |
| anonymous short-paid-task fiction | CONTENT_SEED | provides recovery flavor without canonical NPC ownership | no unique rescuer may become required | prose/provider can change independently |

The `keep-resting` no-effect choice is a **STRUCTURAL_GUARD**, not tuning.

### Neutral autumn event

Event:
`poverty-street-production.neutral-autumn`

| Choice/value | Status | Rationale | Anti-softlock bound | Safe adjustment direction |
| --- | --- | --- | --- | --- |
| season = `autumn` | INITIAL_TUNING / CONTENT_SEED | supplies a distinct deterministic seasonal context | neutral content cannot block recovery | may move/add seasons freely if event ordering remains deterministic |
| economic/stat effect = none | INITIAL_TUNING | proves poverty content can be atmospheric rather than reward/punishment only | zero impact is inherently anti-softlock safe | adding effects requires reclassification and anti-softlock review |
| cooldown = `2` days | INITIAL_TUNING | avoids immediate repetition | no gameplay dependency | increasing is safer for repetition |
| maxShows = `40` | INITIAL_TUNING | keeps family reusable during long runs | no gameplay dependency | lower if repetition becomes noisy |
| priority = `30` | INITIAL_TUNING | matches street-family ordering | must not outrank stronger resolver classes | adjust only within normal progression |
| fallback media = `stage.outside` | CONTENT_SEED | shipped fallback | no mechanical dependency | presentation may specialize later |

### Winter pressure event

Event:
`poverty-street-production.pressure-winter`

| Choice/value | Status | Rationale | Anti-softlock bound | Safe adjustment direction |
| --- | --- | --- | --- | --- |
| season = `winter` | INITIAL_TUNING / CONTENT_SEED | gives the bad-pressure family a clear environmental context | winter must still permit zero-money recovery | reassign/add contexts only with seasonal regression |
| additional next-day Energy delta = `-1` on `keep-moving` | INITIAL_TUNING | exercises negative next-day modifier composition without adding a new runtime primitive | combined street pressure must still leave a starter-job action executable next day | toward 0 is always safer; more negative requires explicit anti-softlock simulation/regression |
| modifier tag = `poverty.street.initial-pressure` | CONTENT_SEED | traceable source identity for current modifier | tag must not change semantics by itself | may rename only with migration/test updates if persisted mid-Night |
| cooldown = `2` days | INITIAL_TUNING | avoids pressure firing every winter night | player must not require cooldown luck to recover | increasing is safer; decreasing requires spiral-risk simulation |
| maxShows = `40` | INITIAL_TUNING | reusable pressure family | must not create an unavoidable repeated spiral | lowering reduces pressure exposure |
| priority = `30` | INITIAL_TUNING | deterministic normal-progression ordering | cannot supersede forced/critical semantics | adjust within class only |
| fallback media = `stage.outside` | CONTENT_SEED | shipped fallback | media failure cannot affect mechanics | specialize later |

The `take-shelter` no-effect choice is a **STRUCTURAL_GUARD** and must remain available unless an equally safe/free production exit replaces it.

## Seasonal distribution introduced by item 87

Current production seed:
- spring — no blocking ordinary street event from this pack;
- summer — helpful family;
- autumn — neutral family;
- winter — pressure family.

Status:
**INITIAL_TUNING / CONTENT_SEED**.

Rationale:
- creates deterministic coverage across three event families;
- preserves the existing spring/day-0 zero-money street baseline used by the merged poverty anti-softlock contract.

Safe adjustment:
- adding spring content is allowed later, but any blocking spring event must preserve the natural street-sleep baseline and corresponding regression;
- families may gain seasonal variants without changing their structural purpose.

## Deterministic event chance

Item 87 events currently have no `chance` field.

Status:
**INITIAL_TUNING**.

Meaning:
- when season/housing/cooldown conditions are satisfied, the event is deterministic.

Rationale:
- gives the first production slice reliable natural reachability without locking a final probability.

Safe adjustment:
- later probability may be added only as balance/content tuning;
- tests must stop asserting unconditional occurrence and instead use deterministic seeded/configured acceptance;
- zero-money recovery must not depend on a successful roll.

## Item 91 — cheap-lodging production pack

Production file:
`content/packs/poverty-cheap-production.json`.

Event:
`poverty-cheap-production.shared-quiet-autumn`

| Choice/value | Status | Rationale | Anti-softlock bound | Safe adjustment direction |
| --- | --- | --- | --- | --- |
| season = `autumn` | INITIAL_TUNING / CONTENT_SEED | adds visible cheap-lodging context without changing price/base penalty | cheap lodging remains optional and non-terminal | may add/move seasons if no existing baseline is broken |
| economic/stat effect = none | INITIAL_TUNING | distinguishes cheap lodging through context rather than another penalty | no new poverty spiral from item 91 | adding effects requires explicit balance/anti-softlock review |
| cooldown = `3` days | INITIAL_TUNING | makes the shared-room scene occasional | no recovery dependency | increasing reduces repetition; decreasing requires content-repetition review |
| maxShows = `30` | INITIAL_TUNING | permits repeatable context without unlimited noise | no gameplay dependency | lower if repetition becomes noisy |
| priority = `20` inside `normal_progression` | INITIAL_TUNING | keeps cheap context below the street family's current in-class priority, though housing conditions are disjoint | must not outrank forced/critical semantics | adjust within class after collision audit |
| fallback media = `stage.room` | CONTENT_SEED | uses existing shipped room visual | mechanics independent of asset | replace through presentation mapping later |
| anonymous shared-room fiction | CONTENT_SEED | avoids canonical NPC dependency | no helper/provider lock | prose may change freely |

The `settle-quietly` free no-effect resolution is part of the safe authored shape.

## Values intentionally NOT changed

Items 87/91 do not change:
- `lodging.normal.moneyCost`;
- `lodging.cheap.moneyCost`;
- `lodging.street.moneyCost`;
- base street next-day Energy penalty;
- base street stat effects;
- normal/cheap base lodging effects;
- starting-job wage;
- School price;
- any Secret Debt amount/probability/threshold/reward.

Those remain under their existing authorities.

## Adjustment protocol

When tuning any INITIAL_TUNING value:
1. change the production pack value, not a test-only duplicate;
2. tests should read the current pack/config where exact magnitude is not structurally locked;
3. rerun targeted street/cheap/reload/seasonal/anti-softlock tests;
4. rerun the full check before integration;
5. record the new candidate as tuning, not Product truth, unless Product explicitly promotes it.

## Product-lock boundary

No value or seasonal assignment in this ledger becomes locked merely because it ships in the first content slice.

Structural rules remain separate from tuning.
