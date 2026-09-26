# RC Authoring Blocker Evidence Pack v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Baseline: current merged main after PR22 + PR23

## Purpose

This pack attaches concrete runtime/test evidence to each remaining human/product authoring decision.

It does **not** recommend a preferred product answer.

The question for each row is only:

> “Is the engine/runtime ready enough to accept an authored decision once product/design supplies it?”

---

# 1. Old Boundary Token acquisition source

## Authoring decision still required

Define a real shipped source for:

`old_boundary_token`.

No source is currently approved.

## Runtime already ready

Current production definitions contain:

```text
old_boundary_token -> enter_old_boundary
```

Current runtime derives item capability from positive inventory count.

Current tests merged through PR23 include:

- `tests/qa-generic-item-capability-contract.test.ts`
- `tests/qa-activity-option-reload.test.ts`
- `tests/item-capability-activity-closure.test.ts`

They prove:

- capability comes from declared inventory item definitions;
- worldFact alone is not equivalent;
- multiple items may provide one capability;
- removing the last provider removes capability;
- capability-gated Activity option visibility changes deterministically.

## Readiness

**RUNTIME READY**

What remains is product acquisition authoring.

Affected PA:

- PA09;
- natural ordered PA17.

---

# 2. Old Boundary Token retain / consume policy

## Authoring decision still required

Decide whether use of the Old Boundary Token:

- retains it;
- consumes it;
- transforms it;
- consumes another resource;
- applies another explicit authored effect.

No preferred answer is selected here.

## Runtime already ready

Inventory add/remove effects exist.

Capability availability is derived dynamically from current inventory.

PR23 generic capability contract proves that when the last provider item is removed, the capability disappears.

PR22 current old-boundary route does not auto-consume the item.

This is intentionally neutral.

## Readiness

**RUNTIME READY**

No engine change is inherently required for a simple explicit add/remove policy.

If the final authored policy needs a more complex transaction, evaluate that policy after it is specified.

Affected PA:

- PA09;
- PA17.

---

# 3. Hunter-trail clue / capability identity

## Authoring decision still required

If the accepted Forest design still includes a third hunter-trail route, define:

- route canonical ID;
- unlock/clue identity;
- whether unlock is:
  - item capability;
  - world/progression fact;
  - relationship condition;
  - School result;
  - another accepted typed condition;
- player-facing meaning.

No canonical identity is currently approved.

## Runtime already ready

PR22 ships:

- generic Activity options;
- route categories;
- typed conditions;
- persistent route ID;
- persistent one-shot option IDs;
- capability-aware option visibility;
- deterministic reload.

PR23 QA contracts independently prove route/option persistence.

Current production already demonstrates two routes:

- logging road;
- old boundary.

## Readiness

**RUNTIME MOSTLY READY**

The current option model can represent another route and many typed conditions.

Only if the approved hunter-trail design requires a new condition/effect primitive would focused runtime work be needed.

Affected PA:

- PA16;
- potentially PA17.

---

# 4. School management/accounting threshold

## Authoring decision still required

Define:

- owning School course/track;
- exact progression threshold;
- whether only paid lessons count;
- canonical milestone identity.

No number is chosen by QA.

## Runtime already ready

School currently has:

- eight first-class courses;
- typed track IDs;
- typed `lessons_completed`;
- separate `night_study_sessions`;
- atomic paid lesson transaction;
- Resolver boundary after School registration;
- schema-4 School compatibility.

PR20/PR21 tests already prove:

- paid lesson exactly once;
- typed progression;
- Resolver sees the committed School state;
- reload does not repeat tuition/Energy/progress.

## Readiness

**RUNTIME MOSTLY READY**

If the accepted authoring can use existing typed conditions/events, content may be sufficient.

If product requires a first-class School-counter condition not currently exposed in generic content conditions, a narrow generic condition primitive may still be required.

Affected PA:

- PA07;
- PA08.

---

# 5. School management/accounting provider

## Authoring decision still required

Define the authoritative School-owned output that represents the accepted management/accounting result.

The consumer seam already exists around the accepted Lumber-facing concept:

`lumber.school.management-ready`

but the production School provider remains absent.

## Runtime already ready

Resolver ordering is correct:

```text
School effects
-> School progress registration
-> reaction facts
-> Resolver
```

Cross-system reactive continuation infrastructure already exists.

The old synthetic:

`school.lumber-management`

is excluded from production and must stay excluded.

## Readiness

**RUNTIME READY / CONTENT PROVIDER MISSING**

Affected PA:

- PA07;
- PA08.

---

# 6. School Arcana / Forest threshold

## Authoring decision still required

If the accepted target still includes a School Arcana -> Forest public result, define:

- exact Arcana progression condition;
- threshold;
- whether Night study contributes;
- whether the result is a milestone, public fact, event or another accepted output.

No threshold is inferred from QA fixtures.

## Runtime already ready

Current main has:

- typed Arcana progression;
- paid lesson and Night-study separation;
- Resolver after School registration;
- generic world/progression fact plumbing;
- Forest route/Activity infrastructure.

## Readiness

**RUNTIME MOSTLY READY**

Final readiness depends on the authored output shape.

Affected PA:

- PA07;
- possibly downstream Forest integration acceptance.

---

# 7. School Arcana / Forest provider identity

## Authoring decision still required

Define canonical provider/result identity and consumer.

No product ID is approved here.

## Runtime already ready

The engine can:

- apply typed progression effects;
- emit public facts through content effects;
- resolve reactive events;
- persist/reload the resulting state.

## Readiness

**RUNTIME READY FOR ORDINARY FACT/EVENT PROVIDER**

If product authoring chooses a new semantic type, reassess then.

---

# 8. Forest 3-route topology

## Authoring decision still required

PR22 production currently has:

1. `forest.route.logging-road`
2. `forest.route.old-boundary`

The accepted deeper target still calls for a third route.

Product/design must define:

- third route identity;
- unlock conditions;
- player-facing meaning;
- interaction with current routes.

## Runtime already ready

PR22/PR23 prove:

- multiple authored route options;
- route selection before `advance`;
- route persistence;
- one-shot route option;
- save/reload stability;
- legacy pre-option Activity compatibility.

## Readiness

**RUNTIME READY FOR THIRD ROUTE**

No generic route-engine change is currently demonstrated as necessary.

Affected PA:

- PA16.

---

# 9. Forest three challenge families

## Authoring decision still required

Define three meaningfully distinct challenge families:

- identity;
- route placement;
- conditions;
- outcomes/effects;
- progression/endurance behavior;
- presentation.

The current simple `counter.v1` advance loop is not itself three challenge families.

## Runtime already ready

Current Activity runtime already supports:

- persistent internal progress/endurance;
- deterministic Activity RNG state;
- authored options;
- typed option conditions;
- option-specific progress/endurance deltas;
- save/reload;
- success/escape/failure results.

## Readiness

**PARTIALLY READY**

Simple challenge families may fit the current option model.

If the approved content needs:

- multi-step challenge substates;
- challenge decks;
- per-family state machines;
- richer branching than current options provide,

a focused Activity adapter/version extension may be required.

That decision cannot be made before the content is authored.

Affected PA:

- PA16.

---

# 10. Forest seasonal difference

## Authoring decision still required

Define one or more real seasonal differences.

Possible dimensions are not selected here.

The accepted difference must be explicit in product content.

## Runtime already ready

The game already has:

- deterministic calendar/season;
- typed seasonal conditions used elsewhere;
- route/option condition evaluation;
- semantic presentation infrastructure.

## Readiness

**RUNTIME MOSTLY READY**

If seasonal difference is expressible as current conditions/options/effects, content-only authoring is sufficient.

If product wants season-specific challenge-state machinery beyond current conditions, reassess after design.

Affected PA:

- PA16.

---

# 11. Evidence that generic capability runtime is already integrated

PR23 merged release-candidate QA contracts only; it did not change production.

Merged QA files include:

- `content/qa-activity-option-reload.fixture.json`
- `tests/qa-activity-option-reload.test.ts`
- `tests/qa-generic-item-capability-contract.test.ts`

Therefore runtime-readiness claims above have independent QA coverage on current main, not only Lead-branch evidence.

---

# 12. Evidence that unresolved authoring is not being fabricated

Current shipped PA tests and PR24 one-Save intent explicitly avoid injecting:

- School management/accounting public fact;
- Old Boundary Token acquisition;
- legacy capability worldFact;
- Forest success fact;
- ending reward.

The only accepted long-threshold accelerator is:

`completed_shifts=49`

immediately before a real 50th Lumber shift.

This keeps authoring blockers visible.

---

# Summary

| Decision | Runtime status | Product answer status |
|---|---|---|
| Old Boundary Token source | ready | **OPEN** |
| token retain/consume | ready | **OPEN** |
| hunter-trail clue/capability identity | mostly ready | **OPEN** |
| School management threshold | mostly ready | **OPEN** |
| School management provider | ready | **OPEN** |
| School Arcana/Forest threshold | mostly ready | **OPEN** |
| School Arcana/Forest provider | ready for ordinary fact/event | **OPEN** |
| third Forest route | ready | **OPEN** |
| three challenge families | partial, design-dependent | **OPEN** |
| seasonal Forest difference | mostly ready | **OPEN** |

No preferred product answer is proposed by this document.

No production runtime/UI/content file was modified by Chat 4.
