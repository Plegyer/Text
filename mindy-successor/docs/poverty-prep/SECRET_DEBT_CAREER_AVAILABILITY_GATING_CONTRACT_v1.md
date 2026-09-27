# Secret Debt Career-Availability Gating Contract v1

Status: bounded runtime contract for the already-directed professional lock while Secret Debt is bound.

Product behavior is fixed:
- when bound, the 10 ordinary careers are unavailable;
- Secret Debt/Slave work is available;
- ordinary career progression is preserved, not reset;
- resolving dependency removes only the Secret-Debt-specific lock and normal career gates resume;
- Palace continues to count only ordinary Hard Work.

This document does not decide School/Activity availability.

## Core invariant

Career availability must be authoritative, not presentation-only.

While bound:
```text
ordinaryCareerAvailable(career) = false
secretDebtCareerAvailable = true
```

for exactly the 10 ordinary career identities.

Enforcement must agree across:
- visible/available action enumeration;
- command dispatch;
- reactive career progression/milestone delivery;
- save/reload restoration.

## State source options

### Source A — dedicated SecretDebtState phase

Shape:
- persisted Secret Debt domain exposes `phase = bound` or equivalent.

Compatibility:
- clearest ownership if dedicated domain is introduced;
- requires bounded schema/runtime state extension if not represented through existing career state.

Availability gate reads only the domain phase.

School/Activity remain separate consumers and are not implicitly blocked.

### Source B — Secret Debt career stage/fact

Shape:
- existing persisted career state owns `bound` stage/fact;
- shared availability gate reads that authoritative career state.

Compatibility:
- uses current career-state primitives;
- no new global boolean required.

Risk:
- hidden career definition must exist before helper can read it safely;
- exact stage/fact ID must be canonical content, not QA placeholder.

### Source C — published public/world fact

Shape:
- Secret Debt owner publishes a public fact meaning `professional-lock-active` or equivalent;
- action conditions/helper read that fact.

Compatibility:
- current worldFact conditions/effects already exist.

Boundary:
- fact may be a public projection of Secret Debt state;
- it must not become a second unsynchronized source of truth.

If used, transition into/out of bound state must update it atomically with the domain owner.

## Enforcement option 1 — per-action conditions

Shape:
- every ordinary career action includes a condition requiring Secret Debt professional lock to be absent.

Runtime change:
none if existing conditions suffice.

Advantages:
- content-only;
- command dispatch already evaluates action conditions.

Risks:
- every current/future ordinary-career action must remember the condition;
- easy omission across 10 careers and seasonal/variant actions;
- reactive events/transitions need their own lock condition separately;
- UI/dispatch parity depends on all content authors following the same rule.

Assessment:
**EXISTING-COMPATIBLE but high drift risk**.

Acceptable only if validation automatically proves every ordinary career action/progression path carries the lock.

## Enforcement option 2 — shared ordinary-career availability helper

Shape:
- one predicate evaluates Secret Debt professional lock for ordinary career identity;
- available-action projection and dispatch both invoke it;
- reactive career advancement also checks the same domain rule.

Example contract, not exact API:
```text
isOrdinaryCareerAvailable(save, careerId)
  = !secretDebtProfessionalLockActive(save)
    && existingCareerSpecificGates(save, careerId)
```

Runtime change:
**BOUNDED RUNTIME EXTENSION**.

Advantages:
- one source of professional-lock policy;
- impossible to forget the lock on a new ordinary action if action -> career ownership is explicit;
- UI/dispatch/resolver can share one rule.

Required supporting identity:
- runtime must know which career owns an action/progression path.

If current action IDs are insufficiently explicit, Lead may need one bounded action-to-career mapping or metadata seam rather than hard-coded string-prefix guessing.

Assessment:
**strong centralized option**, but implementation representation remains engineering-owned.

## Enforcement option 3 — public state + per-action conditions

Shape:
- Secret Debt publishes lock fact;
- every ordinary action/event uses `not worldFact(lock)`.

Runtime change:
none.

Advantages:
- simple current condition primitive.

Risks:
- same duplication/drift as option 1;
- published fact synchronization must be exact;
- does not automatically protect reactive progression.

Assessment:
**technically compatible, not sufficient by itself to guarantee global invariants unless validation is exhaustive**.

## Enforcement option 4 — catalog/action transformation at load time

Shape:
- loader injects Secret Debt lock condition into all known ordinary career actions.

Assessment:
**NOT PREFERRED AS A CONTRACT SHAPE**.

Reasons:
- mutates authored semantics implicitly;
- action-to-career ownership still must be known;
- harder to audit source content;
- risks surprising content authors.

Use only if Lead explicitly chooses a generated-content pipeline with transparent validation.

## Required career ownership seam

Central gating needs a reliable mapping:
`action/progression path -> ordinary career ID`.

Technically compatible shapes include:
- explicit action metadata `careerId` (bounded schema/content addition);
- authoritative catalog mapping generated from career pack ownership;
- existing stable action ID mapping if every ordinary career has a canonical rule and validation enforces it.

Do not rely on fuzzy labels or translated text.

## Dispatch contract

A blocked ordinary career action must fail even if called directly.

UI hiding alone is insufficient.

Expected behavior:
- availability list excludes blocked ordinary career work;
- direct dispatch returns unavailable-condition error;
- no cost/effect/counter mutation occurs;
- no reaction facts pretending the action completed are emitted.

## Reactive progression contract

While bound, ordinary careers preserve their current state.

Reactive transitions/events must not advance merely because unrelated stats/facts happen to satisfy their normal conditions.

Implementation choices:
- shared professional-lock predicate participates in career transition eligibility for ordinary careers; or
- every ordinary career transition/event receives an explicit lock condition with exhaustive validation.

Again, one centralized invariant is safer than repeated manual conditions, but final engineering shape is Lead-owned.

## Hidden Secret Debt career

Secret Debt work is separate.

Availability rule:
- hidden before activation;
- available while authoritative state is bound;
- unavailable/resolved according to its own outcome state.

It is not inserted into the 10 ordinary-career list.

## Lock release

`paid_freedom` and `takeover`:
- resolving dependency removes debt-specific professional lock;
- ordinary careers then evaluate their existing normal gates.

`bound_life`:
- while active run remains bound before terminal completion, professional lock remains;
- same-run post-ending continuation remains Product-owned if ever supported.

Lock release must not:
- reset counters;
- regrant milestones;
- duplicate facts;
- mark careers as newly completed.

## Palace accounting

Use the existing 10 ordinary career set for Palace prerequisite.

Never:
- add Secret Debt career to `ordinaryHardWorkCareers`;
- grant ordinary `hardWork` Meta for Secret Debt;
- let lock/unlock transitions change completed Hard Work history.

## School boundary

School is **outside** this career-availability gate.

Product decision remains OPEN:
- allowed;
- blocked;
- conditional.

No shared helper named generically like `allDayActionsAvailable` should accidentally include School.

## Activity boundary

Activity/Forest is **outside** this career-availability gate.

Product decision remains OPEN.

Do not derive Activity availability from ordinary-career professional lock.

## Save/reload acceptance

Future implementation must prove:
1. preserve progress in at least two ordinary careers;
2. enter bound state;
3. all 10 ordinary career work paths unavailable;
4. direct dispatch of blocked ordinary action fails without mutation;
5. unrelated stat/public changes do not advance blocked ordinary career transitions;
6. reload;
7. same lock/progress remains;
8. resolve `paid_freedom` or `takeover`;
9. normal career availability returns subject to ordinary gates;
10. preserved progress is unchanged;
11. Palace Hard Work set unchanged by Secret Debt.

## Contract conclusion

Current conditions can express the lock manually.

A production-safe implementation should provide either:
- centralized ordinary-career availability enforcement; or
- exhaustive generated/validated conditions that are demonstrably equivalent.

The state source may be a dedicated Secret Debt domain, existing career state, or synchronized public projection.

School/Activity blocking is not part of this contract.
