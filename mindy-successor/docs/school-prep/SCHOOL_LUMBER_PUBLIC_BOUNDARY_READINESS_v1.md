# School -> Lumber Public-Boundary Readiness v1

Status: readiness contract only. This document does not activate shared School/Lumber runtime, does not define final School public fact IDs, and does not change Hard Work eligibility.

## 1. Boundary rule

School and Lumber keep ownership of their own internal progression.

School may affect Lumber in two supported ways:

1. **Authoritative stat changes.** A paid School course applies its locked Character stat package. The shared Resolver already exposes those mutations as normal `statChanged` reaction facts. Lumber may react when its ordinary stat/profile conditions become true.
2. **Durable public facts.** If authored School progression later produces a durable cross-system result, it must cross through the existing public `worldFacts` mechanism or a future explicitly typed domain-public equivalent. Lumber must not read or mutate School-private counters/stages directly.

The reverse is also true: School-owned `lessons_completed`, `night_study_sessions`, facts, milestones, certificates, and choices remain School-owned. Lumber cannot increment or rewrite them.

## 2. What is executable today

### Physical School -> Lumber through stats

Physical Training already has the locked paid package:
- Strength +3;
- Endurance +3;
- Dexterity +2.

The current School runtime emits `statChanged` facts after the complete paid lesson package is applied. The shared Resolver supports `statChanged` triggers. Therefore a Lumber event/profile condition can react immediately to the new authoritative stats without another Lumber shift.

This is an already executable public boundary. It does not require a School certificate or School-specific Lumber fact.

### Durable public facts

The shared target runtime already persists:
- `run.progression.worldFacts`.

It already supports:
- condition: `worldFact`;
- effects: `addWorldFact` / `removeWorldFact`;
- reaction fact: `worldFactAdded`;
- pack read/write capability declarations for `worldFacts`.

This is the existing durable cross-domain channel. A future typed domain-public fact mechanism may refine it, but no private School save path should become a Lumber dependency.

## 3. School-owned progression remains private to School

The accepted School progression shape owns:
- per-track `lessons_completed`;
- per-track `night_study_sessions`;
- School facts;
- milestones;
- certificates;
- optional choices.

These values may contribute to School's decision to publish a public result, but Lumber should consume only the published boundary, not the private counter itself.

Examples of forbidden coupling:
- Lumber condition directly reading `school.track.arcana.counters.lessons_completed`;
- Lumber effect incrementing a School counter;
- School effect directly changing Lumber career stage merely because a lesson completed.

## 4. Management/accounting public fact remains OPEN

The Lumber prep describes an accounting/leadership School result that can support the Forewoman management/supply/legal route.

Draft semantic placeholders appear in preparation material, including `management_school_gate_ready`, and older isolated fixture data may contain fixture-only names. These are not a final canonical School-owned public fact ID.

The final management/accounting School public fact ID remains **OPEN**.

Also OPEN:
- whether the public result is a project, milestone, certificate, or other School-owned fact before publication;
- its exact School threshold;
- its exact stat requirements;
- its exact certificate name/effect, if a certificate is used.

No threshold is locked by this readiness contract.

## 5. Arcana/forest public fact remains OPEN

The Lumber prep supports Arcana/Reason/Magic as a possible interpretation path for the Forest chain.

Draft semantic placeholders such as `forest_school_gate_ready` describe intent only. They do not establish the final School-owned public fact ID.

The final Arcana/forest School public fact ID remains **OPEN**, as do:
- exact Arcana/Reason/Magic gate values;
- whether a milestone/project/certificate produces the public result;
- which Forest clue subset is required.

Normal Arcana stat changes can still trigger stat-based conditions today without waiting for a public fact.

## 6. No certificate or milestone threshold is locked here

School prep explicitly leaves milestone thresholds, certificate requirements, certificate names, and certificate effects open.

This contract therefore forbids silently turning any of these into production authority:
- legacy `metrics.lessons >= 3`;
- a new `lessons_completed >= N` management threshold;
- a new Arcana certificate threshold;
- a Lumber shift count plus School certificate conjunction for Hard Work.

A fixture may use a clearly fixture-scoped fact solely to prove the public transport mechanism, but it must not present that fact as the final School/Lumber content ID.

## 7. Hard Work remains completely independent of School

The locked Lumber Hard Work gate is:

`career.shifts(lumber) >= 50`

and this is the complete eligibility gate.

Not required:
- School certificate;
- School public fact;
- School course;
- management/accounting School progress;
- Arcana/forest School progress;
- Forest Activity completion;
- Foreman relationship.

School can improve stats that make ordinary Lumber play easier, but it cannot become an eligibility prerequisite for `ending.lumber.hard-work`.

## 8. Activation readiness summary

| Boundary | Status | Contract |
|---|---|---|
| School physical/stat change -> Lumber reaction | executable now | normal `statChanged` facts |
| School private progress -> Lumber direct read/write | forbidden | keep School-owned |
| School durable cross-system result -> Lumber | transport executable now | `worldFacts` / `worldFactAdded`; final School fact IDs OPEN |
| Management/accounting final School fact | OPEN | do not canonize draft placeholder |
| Arcana/forest final School fact | OPEN | do not canonize draft placeholder |
| Management/certificate thresholds | OPEN | do not invent |
| Lumber Hard Work eligibility | locked | 50 completed Lumber shifts only; no School prerequisite |
