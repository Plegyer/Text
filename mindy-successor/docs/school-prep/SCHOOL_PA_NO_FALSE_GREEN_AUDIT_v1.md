# School PA No-False-Green Audit v1

Status: Product Acceptance evidence-discipline audit.
Purpose: prevent isolated School fixtures, accelerators, or synthetic cross-system hooks from being mistaken for a full product pass.

## 1. Rule

A fixture is legitimate when it isolates one mechanic or compatibility property and says exactly what it proves.

A fixture is forbidden Product Acceptance pass evidence when it bypasses the player-facing command/content path that the PA row is supposed to accept.

The following never become full PA07/PA08 proof by themselves:
- synthetic public fact injection;
- direct typed counter setup;
- direct School track-state setup;
- fixture-only certificate/milestone placeholder;
- direct `worldFacts` injection.

## 2. Synthetic public facts

### Legitimate isolated evidence

`tests/school-lumber-public-boundary-readiness.test.ts`
- uses fixture-only `school.fixture.public-boundary`;
- directly applies `addWorldFact`;
- proves the shared `worldFacts -> worldFactAdded -> Resolver` transport works.

`content/school-public-fact-preflight.fixture.json`
- uses `school.fixture.public.approved`;
- proves declaration/ownership/exactly-once preflight rules;
- explicitly marks the example fixture-only.

### Forbidden full-PA interpretation

Neither artifact proves:
- an authored School milestone exists;
- the player reached that milestone through School;
- a final management/accounting or Arcana/forest public fact ID exists;
- PA08 is green.

Direct injection tests transport, not authored reachability.

## 3. Direct typed counter setup

### Legitimate isolated evidence

- `content/school-typed-progress-exactly-once.fixture.json`
- `tests/school-typed-progress-exactly-once.test.ts`
- `content/school-course-track-ownership.fixture.json`
- `tests/school-course-track-ownership.test.ts`
- fixture-level progress portions of `school-pa-executable-scenario` and `school-full-reload-chronology`

These prove:
- paid lesson counter ownership;
- Night-study counter ownership;
- no cross-track mutation;
- exactly-once expectations across serialized fixture state.

### Forbidden full-PA interpretation

Directly assigning or incrementing a fixture counter does not prove:
- production shared save integration;
- a real player command incremented the counter;
- an authored milestone fired from the counter;
- the PA School progress UI is visible.

Use runtime-backed School transaction evidence plus integrated typed-progress evidence for a product pass.

## 4. Direct School track-state setup

### Legitimate isolated evidence

- `content/school-typed-state-compat.fixture.json`
- `content/school-schema4-compat.fixture.json`
- `tests/school-schema4-compat.test.ts`
- `tests/school-save-compat-adversarial.test.ts`

These may construct School track maps directly to prove:
- defaulting;
- key/trackId validation;
- unknown-track rejection;
- preservation of unrelated progression domains;
- compatibility/idempotency rules.

### Forbidden full-PA interpretation

A prebuilt track map is not evidence that a player:
- selected a course;
- paid tuition;
- spent Energy;
- saw presentation;
- earned progress through normal play.

## 5. Fixture-only certificate or milestone placeholders

No fixture-only certificate/milestone ID may be promoted to canonical production content merely because a test uses it.

Synthetic examples, when present, may prove:
- Resolver timing;
- ownership boundaries;
- save compatibility.

They may not establish:
- final certificate name;
- final certificate threshold;
- final milestone threshold;
- final public-fact publication content.

Current management/accounting and Arcana/forest authoring slots remain OPEN.

## 6. Direct worldFact injection

### Legitimate isolated evidence

Direct `addWorldFact` or direct fixture `worldFacts` setup may prove:
- parser persistence;
- condition matching;
- `worldFactAdded` reaction routing;
- private/public domain separation.

### Forbidden full-PA interpretation

It cannot prove PA08 unless the fact was produced by the actual authored School progression path under acceptance.

Required PA08 evidence is:

`real School progression -> authored School publication -> persisted public fact -> same-boundary Lumber/relationship continuation`.

## 7. Other accelerators

### Pre-threshold typed state

A deterministic accelerator may place the run immediately before an expensive repetition threshold only if:
- the state validates through the normal parser;
- already-earned state is the only thing pre-established;
- the command/reaction under acceptance is still executed normally.

This follows the Product Acceptance execution plan.

### Synthetic ending / Resolver events

Files such as:
- `content/school-resolver-trigger-matrix.fixture.json`;
- `tests/school-resolver-trigger-matrix.test.ts`

may use synthetic ending/event definitions to prove same-boundary reaction timing.

They are not proof that final School milestone/public-fact content exists.

### Synthetic lodging/media

NightFlow tests may define fixture-only lodging/media solely to satisfy parser/catalog invariants.
They prove mechanics/reload behavior, not production presentation completeness.

## 8. Evidence classification matrix

| Evidence pattern | Legitimate isolated evidence | Forbidden PA pass evidence |
|---|---|---|
| Synthetic School public fact | public transport / Resolver plumbing | final PA07 milestone/public fact or PA08 continuation |
| Direct counter delta | ownership / exactly-once semantics | player-earned production School progress |
| Direct track-state setup | schema/default/reload compatibility | course reachability or progress earning |
| Fixture certificate/milestone | timing/validation only | canonical authoring, threshold, certificate |
| Direct `worldFacts` injection | persistence/condition/reaction transport | authored School publication path |
| Synthetic event/ending | Resolver ordering and boundary behavior | final authored School content |
| Fixture lodging/media | NightFlow parser/reload invariants | production UI/presentation depth |

## 9. Product-green rule

A School PA row may be marked green only when its required player-facing path is exercised without bypassing the behavior being accepted.

For PA07/PA08 specifically:
- the paid lesson transaction must be real;
- School progress must be produced by the accepted production path;
- teacher/presentation requirements must be satisfied by production content;
- the public result must be authored, not fixture-injected;
- Lumber/relationship continuation must consume that real public result;
- reload must preserve the same authoritative state and pending reaction.

Until then, isolated green tests remain QA evidence, not a full product pass.
