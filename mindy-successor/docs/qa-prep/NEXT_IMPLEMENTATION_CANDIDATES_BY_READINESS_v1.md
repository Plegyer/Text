# Next Implementation Candidates by Readiness v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Purpose: factual readiness comparison only.

## Scope

Compare:
- ordinary poverty content;
- Secret Debt;
- School authored content/public results;
- Forest depth;
- starter-trio career expansion;
- presentation/GIF production.

No score is assigned.
No Product option is recommended.
No aesthetics are ranked.

---

# Ordinary poverty content

## Decisions still missing

No core structural Product decision blocks basic ordinary-poverty content.

Still open:
- exact balance values;
- exact event identities/prose;
- optional poverty-specific outcomes beyond recovery.

These can remain parameterized/delegated.

## Runtime seams

Ready:
- NightFlow;
- lodging ladder;
- money;
- next-day modifiers;
- starting-job recovery;
- Resolver/event infrastructure;
- save/reload.

## Content authority

Ready enough:
- ordinary poverty must be independently playable;
- street is free but costly;
- zero-money anti-softlock;
- Secret Debt is not required.

## Tests

Existing:
- NightFlow;
- lodging reload;
- PR29 test-only contract branch (not yet executable-green/merged at authoring).

Needed for richer content:
- natural street-event smoke;
- recovery path.

## Bounded implementation

**YES**

A bounded ordinary-poverty content pack can begin now without choosing open Secret Debt rules.

---

# Secret Debt

## Decisions still missing

Material:
- School availability while bound;
- large Activity availability while bound;
- forced Night vs lodging-payment behavior;
- next-day modifier composition.

Balance:
- debt/benefit/delay/penalties;
- thresholds/rewards.

## Runtime seams

Partially ready:
- Night forced-event architecture;
- career/state/ending primitives;
- save/reload framework.

Missing production domain:
- SecretDebtState;
- job availability lock integration;
- full forced Night binding;
- outcome integration.

## Content authority

Strong structural authority exists:
- lender;
- accept/refuse;
- delayed activation;
- hidden career;
- ordinary-job block;
- forced Night;
- three outcomes;
- Palace exclusion.

## Tests

QA contract/sentinel plans exist.
No production Secret Debt suite yet.

## Bounded implementation

**PARTIAL**

Generic state/validation scaffolding can begin.

Complete production behavior cannot be finalized without remaining systemic decisions.

---

# School authored content / public results

## Decisions still missing

Management/accounting:
- provider/milestone category;
- threshold if threshold-based.

Arcana/Forest:
- whether distinct public-result path is retained;
- provider/consumer if retained.

Teacher/art specifics:
- content authoring, not necessarily user decisions.

## Runtime seams

Ready:
- eight courses;
- typed progress;
- Resolver;
- public facts/events;
- Night study;
- save/reload;
- presentation.

## Content authority

Base School content authority is mature.

Public-result decision schemas exist but do not select final providers.

## Tests

Strong current base suite:
- paid lessons;
- typed progression;
- blocking scene;
- reload;
- Night separation.

Missing:
- authored management public-result tests;
- authored Arcana/Forest tests if retained.

## Bounded implementation

**YES for teacher/course/milestone content that does not select open public-result semantics.**

**NO for final management/Arcana public-result path until relevant decision is supplied.**

---

# Forest depth

## Decisions still missing

Open:
- hunter-trail unlock source/provider;
- exact authored content details;
- some seasonal/challenge tuning.

Already established:
- third route concept = hunter trail;
- challenge families expected;
- meaningful seasonal difference required.

## Runtime seams

Ready:
- Activity envelope;
- routes/options;
- typed conditions;
- item capability;
- reload;
- results;
- presentation fallback.

## Content authority

Strong:
- logging road;
- old boundary;
- hunter trail required;
- navigation;
- physical obstacle;
- interpretation/ritual anomaly;
- seasonal depth.

## Tests

Strong base runtime coverage.

Missing:
- final third-route natural path;
- three challenge-family production tests;
- seasonal topology/content test.

## Bounded implementation

**YES**

Can author challenge-family and seasonal content now.

Final hunter-trail unlock remains blocked on its source decision.

---

# Starter-trio career expansion

## Satyr Maid

### Decisions missing
- exact balance;
- exact NPC/content details;
- exact ending rewards;
- some final presentation identity.

### Runtime seams
Ready generically:
career/relationship/Night/School/item/ending/presentation.

### Content authority
Deep draft exists.

### Tests
No target production suite yet.

### Bounded implementation
**YES — production skeleton and bounded career package can begin.**

Do not lock uncertain numeric balance or user-level content choices.

## Undead Farm

### Decisions missing
- exact resources/balance;
- exact NPC/content;
- exact item identities/rewards;
- final ending tuning.

### Runtime seams
Ready generically:
career/School/items/Activity/relationship/ending/presentation.

### Content authority
Deep draft exists.

### Tests
No target production suite yet.

### Bounded implementation
**YES — production skeleton and bounded career package can begin.**

---

# Presentation / GIF production

## Decisions still missing

Optional:
- art direction;
- priority order;
- final GIF choices;
- teacher/route-specific visual identity for unauthored content.

## Runtime seams

Fully ready:
- semantic presentation IDs;
- fallback;
- Animation Off;
- missing media nonfatal;
- editor override;
- save compatibility.

## Content authority

For existing authored semantic slots:
ready.

For unresolved gameplay identities:
wait for content identity.

## Tests

Presentation runtime/semantic/fallback tests already strong.

## Bounded implementation

**YES for existing semantic slots.**

Optional final GIF production can begin without gameplay changes.

---

# Factual comparison matrix

| Stream | Human/Product decision blocker | Runtime seam | Content authority | Test foundation | Bounded work can begin |
|---|---|---|---|---|---|
| ordinary poverty | low / balance mostly parameterizable | ready | ready | base ready | **YES** |
| Secret Debt | several systemic behavior choices | partial | structurally strong | plans only | **PARTIAL** |
| School general authored content | low | ready | ready | strong | **YES** |
| School management public result | provider/threshold | ready | schema only | missing authored path | **NO at final boundary** |
| School Arcana/Forest result | scope/provider | ready | schema only | missing authored path | **NO at final boundary** |
| Forest challenge/season depth | limited | ready | strong | strong base | **YES** |
| Forest hunter unlock | source/provider | ready | route concept fixed | base ready | **NO at unlock boundary** |
| Satyr Maid | mostly authoring/balance | ready generically | deep draft | missing target suite | **YES** |
| Undead Farm | mostly authoring/balance | ready generically | deep draft | missing target suite | **YES** |
| GIF production existing slots | optional art choices | ready | existing slots ready | strong | **YES** |

---

# Interpretation rule

“Can begin now” means:
- a bounded implementation package can be created without guessing a blocked Product choice.

It does not mean:
- full subsystem completion;
- release priority;
- preferred next project.

This document does not choose which stream Lead should implement first.

No production runtime/UI/content file was modified by Chat 4.
