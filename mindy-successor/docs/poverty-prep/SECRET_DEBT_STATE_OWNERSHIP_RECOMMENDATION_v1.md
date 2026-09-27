# Secret Debt State Ownership Recommendation v1

Status: engineering recommendation memo. This document selects no Product values, policies, thresholds, rewards, School/Activity rules or content identities.

## Question

What is the smallest technically sufficient authoritative state owner for Secret Debt across:
- persistence/migration;
- delayed activation;
- ordinary-career gating;
- forced Night;
- three outcomes;
- external consumers;
- testing?

Options compared:
1. existing career machine + typed facts/choices/counters;
2. dedicated Secret Debt domain state;
3. hybrid authoritative career machine + public-result projection.

## Option 1 — existing career machine only

Authoritative owner:
`progression.careers[secretDebtCareerId]` using existing:
- stage;
- counters;
- facts;
- choices.

### Persistence / migration

Pros:
- already persisted in current save schema;
- no new save domain;
- existing migrations/default behavior already understand absent career state;
- fresh/legacy save can naturally mean route unseen/inactive.

Cons:
- debt-specific values must fit stage/counter/fact/choice semantics cleanly;
- an arbitrary absolute future date is less direct than a dedicated field.

### Delayed activation

Compatible shapes:
- pending stage + `days_pending` counter advanced on authoritative day boundaries;
- pending stage + content facts/counters representing accepted progression.

Pros:
- no schema migration.

Cons:
- daily tick must be implemented without visible/noisy content artifacts;
- absolute target-day inspection is less explicit.

### Job availability gating

Strong fit:
- shared availability helper can read `careerStage(secretDebt) == bound` or equivalent authoritative fact;
- no duplicate global boolean needed.

### Forced Night

Strong fit:
- current Night event conditions already support career stage/fact/counter;
- bound Night event can read authoritative career state directly.

### Outcomes

Strong fit:
- ending conditions already support career stages/counters/facts/choices;
- outcome readiness can be represented without new domain.

### External consumers

Technically possible:
- current condition system can read careerStage/careerFact.

Architectural concern:
- unrelated systems may become coupled to Secret Debt-private progression details if they read internal stages/counters directly.

### Test complexity

Low:
- use existing career state assertions and save/reload helpers;
- no new schema migration tests.

## Option 2 — dedicated Secret Debt domain state

Authoritative owner:
a new run-level typed object such as:
```text
secretDebt: {
  phase,
  acceptedDay / activationDay,
  debt,
  counters/facts/choices,
  resolution
}
```

Exact fields are illustrative, not proposed Product data.

### Persistence / migration

Pros:
- explicit domain ownership;
- direct invariant validation;
- easy absolute activation target storage.

Cons:
- new save schema/migration surface;
- duplicates generic career-machine capabilities;
- requires new conditions/effects/read APIs or adapters;
- larger runtime footprint before Product/content is settled.

### Delayed activation

Strongest direct representation:
- store target day explicitly;
- compare at calendar boundary.

### Job availability gating

Straightforward:
- shared gate reads `secretDebt.phase`.

### Forced Night

Requires new condition/read seam unless projected into existing public state.

### Outcomes

Requires new condition/effect integration or duplicated career progression state.

### External consumers

Clean if full typed API is built, but that expands architecture.

### Test complexity

Highest:
- save migration;
- invalid-state validation;
- new condition/effect semantics;
- compatibility tests.

Assessment:
technically robust, but not the smallest current-compatible option.

## Option 3 — hybrid career authority + public-result projection

Authoritative owner:
- Secret Debt career machine owns lifecycle/progression;
- stable cross-system results are projected as public/world facts only when another system needs them.

Examples of projection categories, not canonical IDs:
- professional lock active;
- dependency resolved;
- takeover completed;
- public School/Activity-facing result if Product later needs one.

### Persistence / migration

Pros:
- career state and world facts already persist;
- no new save schema required;
- old saves remain route-unseen by absence of career/public state.

Risk:
- public projection must be synchronized atomically with authoritative career transitions;
- projection must not become a second independent truth.

### Delayed activation

Same current-compatible options as career owner:
- counter/day boundary;
- bounded technical helper if needed.

Public fact should be emitted at actual bound transition, not used to approximate pending timing.

### Job availability gating

Two technically valid reads:
- shared gate reads authoritative career bound stage directly; or
- shared gate reads an atomically projected public professional-lock fact.

Career-stage read is smaller inside the career/runtime domain.

Public projection is useful if many external consumers need the same stable result.

### Forced Night

Night event may read career stage directly because it is part of Secret Debt behavior.

No public projection is required solely for its own forced Night.

### Outcomes

Ending conditions can read career state plus accepted external public facts.

On resolution, career transition remains authoritative; public result facts can be emitted for other systems.

### External consumers

Best separation:
- internal Secret Debt logic uses career state;
- unrelated systems consume only stable public results when a cross-system boundary is actually needed.

### Test complexity

Moderate-low:
- existing career save/reload tests;
- projection parity tests only for facts that are actually published;
- no general new schema migration.

## Technical comparison

| Criterion | Career machine only | Dedicated domain | Hybrid career + public projection |
| --- | --- | --- | --- |
| new save schema | NO | YES | NO |
| current condition/effect reuse | HIGH | LOW until extended | HIGH |
| delayed activation explicitness | MEDIUM | HIGH | MEDIUM |
| ordinary-job gate | READY with shared helper | READY after new read seam | READY with shared helper |
| forced Night | READY | needs new read/projection | READY |
| endings | READY | needs new integration | READY |
| external system decoupling | MEDIUM | HIGH after API work | HIGH where projections are used |
| migration burden | LOW | HIGH | LOW |
| test burden | LOW | HIGH | LOW-MEDIUM |
| architecture expansion | MINIMAL | LARGEST | SMALL |

## Smallest technically sufficient recommendation

**Use the existing Secret Debt career machine as the authoritative state owner.**

Add **public-result projections only when a real external consumer requires a stable cross-system fact**.

In other words:
```text
authoritative lifecycle/progression = career machine
cross-system publication = derived public fact, only where needed
global ordinary-job blocking = shared availability gate reading authoritative bound state
```

Why this is the smallest sufficient option:
1. current save schema already persists career stage/counters/facts/choices;
2. current conditions already read career state;
3. Night events can condition on career state;
4. endings already accept career state conditions;
5. no dedicated domain migration is required;
6. public projection preserves clean boundaries for unrelated consumers without duplicating all state;
7. the only clear runtime addition remains ordinary-career availability enforcement.

## Delayed activation caveat

The career-machine recommendation does not force one delay implementation.

Lead may:
- use a persisted pending counter/day-start mechanism with current state; or
- add one narrowly scoped activation-day field later if implementation proves the counter shape awkward.

A dedicated full Secret Debt domain is not justified solely by delayed activation.

## Public projection rule

Publish only stable cross-system outcomes, not internal counters.

Good category:
- `professional lock active` if external systems truly need it;
- `dependency resolved`;
- explicit takeover/public result.

Avoid:
- exposing every shift count;
- exposing internal stage-transition bookkeeping;
- duplicating debt amount in both career state and world fact.

One owner, one authoritative value.

## Migration recommendation

With career authority + optional public projection:
- no new Secret Debt save object required;
- existing saves with no Secret Debt career state remain unseen/inactive;
- do not infer route state from street count, money or legacy flags;
- new public facts default absent.

## Test implications

Minimum state-ownership tests:
1. absent career state behaves as unseen;
2. accepted/pending state round-trips through save;
3. bound stage round-trips;
4. shared ordinary-career gate reads same bound state after reload;
5. forced Night eligibility matches bound state;
6. outcome eligibility uses career state;
7. projected public fact, if present, changes atomically with its owning transition;
8. removing/resolving bound state cannot leave stale professional-lock projection.

## When to reconsider dedicated domain state

Reconsider only if implementation proves a concrete need current career state cannot represent safely, such as:
- multiple independent debt ledgers;
- complex payment schedules requiring typed numeric fields not suitable as career counters;
- several concurrent obligations;
- invariants that cannot be validated through career state + public projection;
- broader reuse by non-career systems that makes career ownership semantically wrong.

None of those is currently required by the directed Secret Debt slice.

## Product boundary

This technical recommendation does not choose:
- chance;
- principal/debt;
- activation interval;
- School/Activity availability;
- forced-Night intercept/penalty;
- outcome thresholds;
- external takeover dependency;
- Meta rewards;
- prose/presentation.

## Global firewalls

Preserve:
- Secret Debt outside the 10 ordinary careers;
- Palace prerequisite = all 10 ordinary Hard Work only;
- Lumber Hard Work ONLY `completed_shifts >= 50`;
- exact `hardWork:lumber`;
- exact Lumber Forest `activityResult` continuation.
