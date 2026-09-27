# Production Implementation Readiness Gate v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance

## Purpose

Decide when a preparation/documentation stream has enough evidence to justify actual production code/content work.

A stream is not READY merely because:
- a draft exists;
- runtime is generic;
- a fixture passes;
- an idea is plausible.

---

# Gate requirements

A stream may be marked **IMPLEMENTATION_READY** only when all applicable gates below are satisfied.

## 1. Authoritative behavior identified

Required:
- current Product/contract source named;
- historical draft separated from current authority;
- target behavior described without relying on prototype quirks.

Fail:
`AUTHORITY_UNCLEAR`

---

## 2. Product decisions supplied or safely parameterized

Every unresolved choice must be classified as:
- supplied/locked;
- delegated content authoring;
- parameterizable balance;
- genuine human decision.

Implementation may proceed only if no unresolved Product choice must be guessed.

Fail:
`HUMAN_DECISION_BLOCKED`

---

## 3. Runtime seam known

Required:
- state owner known;
- commands/conditions/effects known;
- public cross-system boundary known;
- existing generic runtime identified.

If a new runtime primitive is needed:
- accepted authored requirement must demonstrate why.

Fail:
`RUNTIME_SEAM_UNKNOWN`

---

## 4. Save/reload ownership known

Required for stateful work:
- persisted fields owner;
- stable checkpoints;
- exactly-once transaction boundary;
- legacy/migration expectation if schema changes.

Fail:
`PERSISTENCE_CONTRACT_MISSING`

---

## 5. Presentation fallback known

Required:
- semantic presentation family known or derivable;
- valid static/text fallback;
- missing media nonfatal;
- no mechanics tied to GIF timing.

Final art is not required for implementation readiness if fallback is valid.

Fail:
`PRESENTATION_IDENTITY_BLOCKED`

---

## 6. Natural-path acceptance defined

Required:
- start state;
- production commands;
- unlock/acquisition path;
- accelerator boundaries explicitly labeled;
- what proves natural reachability.

Fail:
`NATURAL_PATH_UNDEFINED`

---

## 7. Locked-invariant collision checked

Review impact on:
- Hard Work;
- Palace 10/10;
- hidden-career exclusion;
- School baseline;
- Night exactly-once;
- item capability semantics;
- ending transaction;
- GIF mechanics independence.

Fail:
`LOCKED_RULE_COLLISION`

---

## 8. One-file ownership clear

Before implementation:
- worker/Lead owner known;
- shared files identified;
- parallel ownership conflicts absent.

Fail:
`OWNERSHIP_BLOCKED`

---

# Readiness classes

## IMPLEMENTATION_READY

All required gates pass.

Production code/content can begin within the bounded package.

## BOUNDED_WORK_READY

Some independent implementation can begin, but a named sub-boundary remains blocked by Product decision.

The package must not cross the blocked boundary.

## PREP_ONLY

Useful docs/tests exist, but production work would require guessing.

## TECHNICAL_FOUNDATION_READY

Runtime exists, but authored content/decision is still missing.

---

# Ordinary poverty

## Authority

Current sources define:
- normal/cheap/street housing ladder;
- street continuation;
- zero-money anti-softlock;
- ordinary poverty independent from Secret Debt.

## Product decisions

Exact numeric balance values may remain parameterized.

No human decision is required to preserve:
- free street continuation;
- downside;
- recovery route.

## Runtime seam

Known:
- NightFlow lodging;
- money;
- next-day modifiers;
- starting Work availability.

## Save/reload

Known and already covered for lodging.

## Presentation fallback

Current lodging/Night presentation infrastructure exists.

## Natural path

Defined:
`0 money -> street lodging -> next day -> starting job`

## Readiness

**IMPLEMENTATION_READY for ordinary-poverty content that does not invent new balance locks.**

Street event-pool authoring can proceed using current generic event/runtime seams.

Exact prices/penalties should remain parameterized unless separately locked.

---

# Secret Debt

## Authority

Structural requirements are strong:
- one-time lender;
- accept/refuse;
- delayed trap;
- ordinary-job lock after activation;
- forced Night;
- three outcome families;
- Palace exclusion.

## Product decisions still open

Material behavior:
- School availability while bound;
- large Activity availability while bound;
- forced Night vs lodging payment behavior;
- modifier composition.

Balance:
- debt values;
- delay;
- penalties;
- thresholds/rewards.

## Runtime seam

Partially known but production domain state is not yet merged:
- SecretDebtState needed;
- job availability lock;
- forced Night integration;
- outcomes.

## Readiness

**BOUNDED_WORK_READY for generic state/validation scaffolding only.**

**PREP_ONLY for complete production behavior** until the remaining systemic Product choices are supplied.

Do not guess availability/payment-composition behavior.

---

# School public results

## Base runtime

Green:
- paid lessons;
- typed progress;
- Resolver;
- durable facts/events;
- save/reload.

## Management/accounting

Open:
- provider category;
- milestone type;
- threshold if threshold-based.

## Arcana/Forest

Open:
- whether distinct path is retained;
- provider if retained;
- consumer identity.

## Readiness

**TECHNICAL_FOUNDATION_READY**

Teacher/content authoring independent of these public-result decisions may proceed.

Management/Arcana public-result production implementation is **HUMAN_DECISION_BLOCKED** at its provider/scope boundary.

No new School runtime primitive is currently justified.

---

# Forest depth

## Runtime

Green:
- Activity state;
- routes/options;
- persistence;
- logging-road;
- old-boundary gate;
- results;
- presentation fallback.

## Content authority

Required depth known:
- hunter-trail third route;
- navigation challenge;
- physical-obstacle challenge;
- interpretation/ritual-anomaly challenge;
- meaningful seasonal difference.

## Open Product decisions

- hunter-trail unlock source/provider;
- some exact challenge/content identities.

## Readiness

**BOUNDED_WORK_READY**

Can proceed now:
- challenge-family content using already-locked families;
- seasonal content structures where exact behavior does not guess an open Product decision;
- presentation fallback slots.

Blocked:
- final hunter-trail unlock implementation until its source family is chosen.

---

# GIF / presentation production

## Runtime

Green globally:
- semantic IDs;
- central stage;
- fallback;
- Animation Off;
- no timing coupling.

## Product/content dependency

For already-authored scenes:
- final GIF production can begin without mechanics work.

For unauthored scenes:
- final route/challenge/teacher art should wait for content identity.

## Readiness

**IMPLEMENTATION_READY for optional assets on existing semantic slots.**

**BOUNDED_WORK_READY for future slots whose gameplay identity is already authored.**

No presentation runtime rewrite is justified.

---

# Starter-trio expansion

## Lumber

Already integrated current slice.

Further depth:
**BOUNDED_WORK_READY** where authoring is clear.

## Satyr Maid

Authority:
deep career draft.

Runtime seams:
career, relationships, Night, School, items, endings, presentation all exist generically.

Open:
exact content/balance/NPC specifics.

## Undead Farm

Authority:
deep career draft.

Runtime seams:
career, School, items, Activity, relationships, endings exist generically.

Open:
exact content/balance/NPC specifics.

## Readiness

For both Satyr Maid and Undead Farm:

**BOUNDED_WORK_READY for a production skeleton/package using delegated content authoring and parameterized balance.**

A package should not lock uncertain numbers or final NPC/art choices without authority.

---

# Gate summary

| Stream | Current readiness |
|---|---|
| ordinary poverty | **IMPLEMENTATION_READY** |
| Secret Debt full behavior | **PREP_ONLY / HUMAN_DECISION_BLOCKED** |
| Secret Debt generic state scaffolding | **BOUNDED_WORK_READY** |
| School base authored content | **IMPLEMENTATION_READY** |
| School management public result | **HUMAN_DECISION_BLOCKED** |
| School Arcana/Forest public result | **HUMAN_DECISION_BLOCKED** |
| Forest challenge/season depth | **BOUNDED_WORK_READY** |
| Forest hunter unlock | **HUMAN_DECISION_BLOCKED** |
| GIFs for existing slots | **IMPLEMENTATION_READY** |
| Satyr Maid production skeleton | **BOUNDED_WORK_READY** |
| Undead Farm production skeleton | **BOUNDED_WORK_READY** |

---

# Implementation start rule

Before opening a production PR, copy the relevant gate result into the package handoff:

```text
Authority:
Decisions:
Runtime seam:
Persistence:
Presentation fallback:
Natural path:
Locked collisions:
Ownership:
Readiness:
Blocked boundary:
```

Production work must stay inside the proven-ready boundary.

No production runtime/UI/content file was modified by Chat 4.
