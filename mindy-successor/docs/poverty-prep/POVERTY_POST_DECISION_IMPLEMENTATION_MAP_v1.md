# Poverty Post-Decision Implementation Map v1

Status: immediate implementation sequence to use after `POVERTY_SECRET_DEBT_HUMAN_DECISION_PACKET_v1.md` is explicitly answered.

This map does not pre-fill any unanswered Product value.

## Step 1 — ordinary poverty content activation

Expected production domains:
- `content/definitions.json` lodging/balance data where owned;
- dedicated poverty content pack(s) for ordinary street/cheap/normal events;
- presentation mapping/content assets through the presentation owner.

Runtime seam:
- existing NightFlow lodging resolution;
- housingTier conditions;
- event/reaction delivery;
- next-day modifiers;
- money/inventory/public-fact effects.

Tests:
- normal/cheap/street lodging production test;
- zero-money street fallback;
- ordinary street event reachability;
- reload/idempotency around lodging/event/modifier;
- anti-softlock regression.

Dependencies:
- approved housing prices/penalties where acceptance asserts exact values;
- ordinary event content batch;
- no Secret Debt implementation required.

Implementation rule:
- activate ordinary poverty independently first;
- Secret Debt remains optional/separate.

## Step 2 — lender event

Expected production domains:
- Secret Debt content pack;
- lender event definition/choices/presentation;
- authoritative Secret Debt state owner.

Runtime seam:
- street housing condition;
- Night/reaction delivery;
- one-off event history/state;
- money transaction.

Tests:
- street-only eligibility;
- no offer on normal/cheap lodging;
- refusal terminal for run;
- acceptance grant exactly once;
- reload no reroll/reoffer.

Dependencies:
- approved encounter probability;
- approved principal amount;
- accepted provider/event identity/content.

Implementation may use parameterized balance data until final production acceptance, but tests must not invent values.

## Step 3 — delayed debt persistence

Expected production domains:
- Secret Debt state/domain implementation;
- calendar/reaction integration;
- optional schema migration only if selected technical shape requires it.

Runtime seam:
- one of the technically accepted delayed-activation shapes from `SECRET_DEBT_DELAYED_ACTIVATION_PERSISTENCE_OPTIONS_v1.md`;
- calendarAdvanced/dayStarted;
- persisted pending -> bound transition.

Tests:
- acceptance state persists;
- one day before target remains pending;
- exact boundary activates once;
- reload before/at/after boundary;
- no duplicate activation/grant;
- near-run-end edge case.

Dependencies:
- approved activation interval/rule;
- engineering choice of persistence representation;
- lender acceptance transaction.

Do not add generic scheduler/schema work unless the selected representation actually needs it.

## Step 4 — bound-career availability gating

Expected production domains:
- shared career/action availability runtime seam if selected;
- Secret Debt career definition/content;
- ordinary career integration validation.

Runtime seam:
- authoritative bound-state source;
- centralized ordinary-career availability predicate or validated equivalent;
- direct dispatch guard;
- reactive progression guard.

Tests:
- all 10 ordinary careers unavailable while bound;
- direct dispatch blocked without mutation;
- ordinary progress preserved;
- reactive ordinary transitions do not advance;
- Secret Debt work available;
- reload parity;
- Palace ordinary-Hard-Work set unchanged.

Dependencies:
- delayed activation state;
- accepted technical gating implementation;
- canonical Secret Debt career identity.

Explicit non-dependency:
- School/Activity policy is not required to implement ordinary-career blocking; leave them untouched until decided.

## Step 5 — forced Night

Expected production domains:
- Secret Debt Night event pack/content;
- Night policy definition;
- next-day modifier data;
- presentation mapping.

Runtime seam:
- existing NightFlow intercepts;
- suppressVoluntaryMenu / consumesNight;
- lodging-payment policy;
- next-day modifiers;
- calendar advance exactly once.

Tests:
- authoritative bound state triggers forced Night;
- selected intercept matches Product decision;
- lodging behavior matches decision;
- voluntary menu suppression;
- penalty/modifier exactly once;
- reload no reroll/duplicate/day double-advance;
- daytime hidden work remains separate.

Dependencies:
- approved intercept point;
- approved lodging-payment behavior;
- approved penalty/composition policy;
- authored forced-Night variants.

## Step 6 — three outcomes

Expected production domains:
- Secret Debt ending definitions;
- outcome-specific content/events;
- economy/public/relationship/item/School/Activity hooks selected by Product;
- Meta definitions after exact reward decisions.

Runtime seam:
- existing ending eligibility/commit/completion/RunResult;
- debt transaction for `paid_freedom`;
- career progression for `bound_life`;
- external typed/public dependency for `takeover`;
- professional-lock release where outcome resolves dependency.

Tests:
- one dedicated production test per outcome;
- eligible vs uncommitted reload;
- commit reload;
- complete exactly once;
- RunResult stable;
- job-lock post-resolution semantics;
- Meta exact once after decision;
- zero Palace ordinary-Hard-Work credit.

Dependencies:
- approved exact eligibility/thresholds;
- approved takeover external dependency;
- approved Meta reward IDs/effects;
- authored ending content.

Do not use temporary QA thresholds as production conditions.

## Step 7 — presentation / GIF follow-up

Expected production domains:
- semantic presentation mappings;
- static fallback assets;
- optional GIF/media pack.

Runtime seam:
- existing presentationId and central stage;
- no mechanics change expected.

Tests:
- every new poverty/Secret Debt semantic surface resolves to presentation;
- static/text fallback when GIF absent;
- media replacement does not change mechanics;
- no orphan presentation IDs.

Dependencies:
- stable authored event/action/ending identities from steps 1–6;
- art priority decisions.

Do not block mechanical production on optional GIF polish when fallback is valid.

## Step 8 — acceptance / regression

Expected production domains:
- targeted QA tests;
- full production regression suite;
- Product acceptance evidence docs only after actual execution.

Runtime seam:
none new; this step validates the integrated package.

Targeted tests:
- lodging + zero-money recovery;
- ordinary street events;
- lender one-off flow;
- delayed activation;
- 10-job block/preservation/unlock;
- forced Night;
- all three outcomes;
- Palace exclusion;
- presentation fallback;
- School/Activity policy if decisions have been implemented.

Full regression:
- typecheck;
- content validation;
- build;
- full test suite;
- save migration/legacy compatibility where schema changed.

Cross-system regressions:
- ordinary career progression outside Secret Debt;
- NightFlow normal behavior;
- Activity/Forest save/resume;
- ending/Meta exactly-once;
- Palace 10/10 prerequisite;
- Lumber Hard Work/A5 locks.

Dependencies:
- steps 1–7 merged into an integration branch;
- all Product decisions used by the implemented slice traceable to authority.

## File-domain ownership map

| Implementation step | Expected owner/file domain |
| --- | --- |
| ordinary poverty | poverty content + lodging balance definitions |
| lender event | Secret Debt content/event pack |
| delayed activation | Secret Debt state/calendar runtime seam |
| career blocking | career/action availability runtime + Secret Debt state |
| forced Night | Secret Debt Night content + Night policy |
| outcomes | Secret Debt endings/content + selected external systems |
| presentation | presentation/content asset owner |
| acceptance | QA/test owner + Lead integration evidence |

## Dependency ordering

Minimal dependency graph:
```text
ordinary poverty ───────────────┐
                               ├─> integrated acceptance
lender -> delayed activation -> bound gating -> forced Night ─┐
                                      └──────> outcomes ──────┤
stable authored identities -> presentation follow-up ─────────┘
```

Forced Night and outcome content can proceed in parallel after bound-state ownership/gating is stable, provided file ownership does not overlap.

## Decision substitution ban

Until a Product answer exists, keep placeholders symbolic/config-driven.

Do not pre-fill:
- prices;
- penalties;
- chance;
- principal/debt;
- delay;
- School/Activity policy;
- outcome thresholds;
- Meta rewards.

## Global regression firewalls

Implementation must preserve:
- Secret Debt excluded from Palace 10 ordinary Hard Work prerequisite;
- Lumber Hard Work ONLY `completed_shifts >= 50`;
- exact `hardWork:lumber`;
- exact Lumber Forest `activityResult(lumber.forest, success, lumber.forest.success)`.
