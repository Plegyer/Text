# Current Product Decision Blockers

Status: ACTIVE
Owner: Lead / Product coordination
Scope: decisions that currently block completion of the connected Lumber product slice.

This file is not permission to invent values. It records only the minimum unresolved decisions that must be made before Integration may implement them.

## 1. Natural School -> Lumber management publisher

### Existing downstream contract

Already present and tested:
- transport fact: `lumber.school.management-ready`;
- Lumber reaction event: `lumber-cross.school-management-return`;
- required Foreman relationship stage: `route-professional`;
- Lumber apply choice writes:
  - `management-school-ready`;
  - `forewoman-problem-resolved`.

Current tests prove this downstream seam works only after test-only injection of `lumber.school.management-ready`.

### Current School preparation

The existing handoff references:
- course: `school.course.literacy_and_numbers`;
- track: `school.track.literacy_and_numbers`;
- private counter: `lessons_completed`.

But the following remain deliberately null/open:
- selected provider type;
- threshold or named milestone;
- School publisher event/identity;
- publication timing;
- whether `lumber.school.management-ready` is the final canonical transport identity.

### Product decisions required

Before production implementation, Product/Lead must explicitly choose:
1. which existing School source authorizes the management result;
2. whether eligibility is a lesson-count threshold, named milestone, stat condition, or another existing supported condition;
3. the exact condition/value if numeric;
4. when the public result is published;
5. whether the current world-fact transport identity is canonical.

### Forbidden until resolved

Do not:
- guess a lesson count;
- infer a threshold from old drafts;
- treat one Literacy & Numbers lesson as the production milestone;
- publish the world fact directly from generic School completion;
- make Lumber inspect private School track state directly;
- create a second School progression system.

## 2. Intermediate Lumber progression

### Current production state

Current runtime has the minimal career progression:
- `newcomer`;
- `accepted-hand`;
- transition `accept-hand` after the existing first-shift flow.

Locked ending rule:
- Hard Work eligibility is exactly `completed_shifts >= 50`.

### Current approved product vocabulary

The following Lumber progression identities exist in current coordination/product vocabulary:
- `trusted-worker`;
- `veteran`;
- `forewoman-ready`;
- `forest-ready`;
- `outcome-ready`.

They are not permission to infer numeric gates or a linear topology.

### Product decisions required

Before production transitions are added, Product/Lead must explicitly choose:
1. which of these identities are true career stages versus route/readiness markers;
2. their transition topology from `accepted-hand`;
3. exact eligibility conditions for each transition;
4. whether any route-readiness state belongs in career stages or existing facts/relationships instead;
5. how route readiness interacts with Forewoman/Forest endings without changing Hard Work = 50.

### Forbidden until resolved

Do not:
- restore historical 10/25/30 shift thresholds;
- derive intermediate gates by dividing the 50-shift Hard Work rule;
- treat `forewoman-ready`, `forest-ready`, and `outcome-ready` as automatically linear;
- add a parallel career state system;
- weaken or move the fixed Hard Work 50 rule.

## 3. Open but not blocking the current Lumber slice

These remain open product/balance decisions but are not excuses to block unrelated accepted work:
- exact stat thresholds for the seven late ordinary careers;
- exact calendar fallback values if retained in the final unlock model;
- exact Secret Debt probability, amounts, activation delay, penalties and rewards;
- exact intermediate progression for Satyr Maid and Undead Farm;
- production art/media budget.

## 4. Worker handling

Chat 1 / Integration:
- may implement only after a current decision locks the missing contract;
- otherwise preserve existing seams and record BLOCK/no-op.

Chat 5 / School:
- may prepare text/mappings/fixtures;
- must not choose the School management provider/threshold/publication contract.

Chat 4 / QA:
- must keep the missing natural School publisher and missing approved intermediate Lumber contract visible as product blockers;
- must not repair them itself.

Chat 2 / Chat 3:
- continue presentation/content work that does not require these decisions.

## 5. Acceptance rule

A future integrated Lumber candidate may only claim these blockers resolved when:
- the chosen product decision is recorded in the current locked-decision source;
- implementation exists on one frozen exact head;
- repository CI is green;
- Chat 4 verifies natural reachability and no invented thresholds/state.
