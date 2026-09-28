# Active Team Ownership Matrix

Status: ACTIVE
Repository: `Plegyer/Text`
Owner: Chat 1 / Lead

This file prevents two implementation workers from owning the same production slice at the same time.

## Active ownership

### Chat 1 / Lead
Owns:
- project coordination;
- current `main` truth;
- task pointers/role contracts;
- integration order and merge decisions;
- cross-chat ownership arbitration.

Does not duplicate worker implementation unless a blocker requires direct Lead action.

### Chat 1 Developer
Active slice:
- PR #65 — Foreman semantic localization integration.
- frozen head: `85076aa452ac624340406503b2b6ecf551c72e87`.

Reserved boundary:
- shared production/runtime integration from reviewed worker handoffs.

No other chat may independently implement the same Foreman semantic wiring while PR #65 is active.

### Chat 2
Active slice:
- PR #64 — career animation source preparation for queue 352–363.
- frozen head: `933ee8e0789034e5a64829505a1c9f1071571109`.

Owns:
- presentation/media source assets;
- media manifests/validators.

Does not own School text, poverty text, Foreman semantic runtime wiring or QA.

### Chat 3
Owns:
- Forest / ordinary-poverty / Secret-Debt content-side bundles when assigned;
- authored localization/presentation fixtures;
- content-side validation/handoff sources.

Current next work is a fresh-current-main refresh of the ordinary-poverty depth handoff.
Production runtime/UI integration of that handoff remains Lead/Chat 1 Developer ownership.

### Chat 4
Owns:
- QA / Product Acceptance Gate only;
- current exact-head review of PR #64 and PR #65.

QA review is not duplicate implementation.
Chat 4 must not patch the producer's slice unless Lead explicitly transfers a narrow blocker fix.

### Chat 5
Active queue:
- School residual localization 193–204.

Owns:
- School + assigned text-localization preparation;
- RU/EN fixtures, consumer maps, regression sources and handoffs.

Does not touch Foreman PR #65, Chat 2 media, or Chat 3 poverty/Forest/Secret-Debt ownership.

## Duplicate-work rule

Before starting a new queue or PR, every worker must check this matrix plus its current task pointer.

If two active assignments appear to change the same production behavior/file set:
- stop the newer assignment;
- report the overlap to Lead;
- do not resolve ownership independently.

Review/testing of a producer PR by Chat 4 is expected and is not considered duplicate implementation.
