# Poverty Production Package Acceptance Plan v1

Status: acceptance plan for the first real ordinary-poverty / Secret Debt production package after required Product decisions are answered.

This plan does not claim that such a package exists yet.

## Entry criteria

A candidate package may enter acceptance only when:
- its exact Product decisions are documented and traceable;
- production definitions/packs are changed explicitly rather than represented only by worker fixtures;
- any runtime extension is bounded to the demonstrated missing seam;
- content validation passes for new IDs/references;
- balance values used by the package are either approved or explicitly parameterized according to package scope.

## 1. Production activation evidence

Acceptance requires actual production files, not only docs/fixtures.

Evidence must identify:
- production definition/pack files changed;
- runtime/schema files changed, if any;
- migration logic changed, if any;
- presentation mapping/assets changed;
- targeted tests added/updated.

Worker-only fixtures cannot be labeled shipped.

## 2. Zero-money anti-softlock

Required natural scenario:
1. enter an active run through normal production flow;
2. reach zero money without editing the save to manufacture eligibility;
3. enter NightFlow;
4. choose naturally reachable zero-money street lodging;
5. reach the next day;
6. retain at least one legal progress/recovery path outside Secret Debt unless the run is already intentionally bound to Secret Debt.

Assertions:
- money never becomes invalid/negative;
- calendar advances once;
- next-day modifiers apply once;
- no paid lodging is required;
- Secret Debt acceptance is not required;
- ordinary recovery does not depend on a lucky helpful event.

Long-path accelerators may be used only where clearly labeled and must not replace proof of the zero-money boundary itself.

## 3. Normal / cheap / street production distinction

Required:
- all implemented housing contexts are production definitions;
- normal/cheap/street produce their accepted distinct cost/context/menu/effect behavior;
- exact approved balance values are asserted from production config;
- direct reload after lodging payment preserves one transaction.

Do not pass acceptance using synthetic test-only lodging IDs if production IDs exist.

## 4. Ordinary street content reachable naturally

Required:
- at least one canonical ordinary street event is reachable through normal street-sleep/NightFlow state;
- event is not injected directly as pending state;
- eligibility uses authoritative housing/calendar/public state;
- event presentation has semantic ID + fallback;
- committed event/variant survives reload.

Anti-softlock:
- bad/neutral event outcomes cannot erase all legal recovery paths;
- helpful event is not mandatory.

Secret Debt separation:
- ordinary street event does not silently set Secret Debt accepted/bound state.

## 5. Lender path optional and one-off

If the first package includes lender content, acceptance requires:
- lender offer only through approved eligible street context;
- approved chance/eligibility from production config;
- at most one offer opportunity per run;
- refusal permanently prevents reoffer in the same run;
- acceptance transaction commits principal once;
- reload cannot reroll a committed offer or replay grant;
- ordinary poverty remains playable when lender never appears or is refused.

If lender content is not included in the first package:
- package must say so explicitly;
- ordinary poverty acceptance must still pass independently.

## 6. Delayed activation exactly once

If included:
- acceptance creates persisted pending activation state;
- approved delay/rule is read from production authority/config;
- save/reload before target preserves same target/progress;
- one boundary before activation remains pending;
- exact activation boundary enters bound once;
- reload at/after activation does not repeat transition or immediate grant.

Do not accept a test that edits state directly from accepted to bound without exercising the production delayed path.

## 7. Ordinary-career progress preservation

If bound-state gating is included:
1. establish real progress in ordinary career(s);
2. enter bound Secret Debt state through accepted production path or a narrowly labeled setup only after the transition itself has independent E2E evidence;
3. assert all 10 ordinary career work paths are unavailable;
4. assert Secret Debt work is available;
5. verify direct dispatch of blocked ordinary work fails without mutation;
6. pass calendar/events while bound;
7. reload;
8. assert ordinary stage/counters/facts unchanged;
9. resolve dependency through an implemented outcome;
10. assert normal ordinary availability returns subject to each career's existing gates.

Reactive progression must also remain blocked while the profession is unavailable.

## 8. School / Activity policy

If Product decision is implemented in the package:
- test the exact approved AVAILABLE/BLOCKED/CONDITIONAL rule;
- use authoritative production state;
- keep ordinary-career blocking independent.

If not implemented:
- package must leave School/Activity behavior untouched;
- acceptance must not infer a policy.

## 9. Forced Night

If included:
- production bound state naturally triggers the selected forced Night policy;
- chosen intercept matches Product decision;
- lodging-payment behavior matches Product decision;
- incompatible voluntary Night action cannot also consume same Night;
- daytime Secret Debt shift remains separate;
- next-day penalty/composition matches approved configuration;
- reload after forced-event selection/resolution cannot duplicate effect;
- calendar advances exactly once.

## 10. Three outcomes

For each outcome included in the package:

`paid_freedom`:
- accepted economic condition;
- payment exactly once;
- dependency-specific job lock released;
- explicit ending commit;
- complete once.

`bound_life`:
- accepted career/endurance condition;
- bound lock remains while active pre-terminal run;
- explicit commitment;
- complete once.

`takeover`:
- accepted multi-system dependency;
- more than shifts alone;
- control/dependency transition once;
- job-lock semantics correct;
- explicit ending transaction.

All outcomes:
- save/reload eligible/uncommitted;
- save/reload committed;
- stable RunResult;
- exact approved Meta only after completion and once.

## 11. Palace prerequisite exclusion

Mandatory regression whenever any Secret Debt ending ships:
- capture ordinary Hard Work Meta set/count before Secret Debt completion;
- complete Secret Debt ending;
- assert no ordinary `hardWork` reward was added;
- assert Secret Debt career is absent from the 10 ordinary-career prerequisite set;
- assert Palace remains locked if any ordinary Hard Work is missing.

Repeat for every shipped Secret Debt outcome.

## 12. Presentation fallback

Every new user-visible poverty/Secret Debt surface must have:
- stable semantic `presentationId`;
- valid presentation mapping where required;
- static fallback;
- text fallback;
- mechanics that work with GIF unavailable.

Targeted acceptance:
- disable/miss optional GIF asset;
- execute same gameplay path;
- assert same mechanics/state/result.

## 13. Save/reload checkpoints

At minimum checkpoint after every irreversible boundary included in package:
- lodging payment;
- ordinary street event selection;
- lender offer selection;
- accept/refuse choice;
- delayed activation pending state;
- bound transition;
- forced Night selection;
- forced Night resolution;
- outcome eligibility;
- ending commitment;
- ending completion.

Reload must preserve transaction identity and prevent duplication.

## 14. Targeted test requirement

Candidate package must include targeted tests for every changed production seam.

Expected families:
- poverty lodging/anti-softlock;
- street event production reachability;
- lender/state persistence if included;
- career gating if included;
- forced Night if included;
- outcomes/Meta if included;
- Palace exclusion;
- presentation parity.

Tests must reference production definitions where practical rather than reconstructing the feature in synthetic catalogs.

## 15. Full regression requirement

Before merge/release evidence:
- typecheck PASS;
- content validation PASS;
- build PASS;
- targeted poverty/Secret Debt tests PASS;
- full repository test suite PASS.

If schema/save changes:
- legacy/current save migration tests PASS;
- unaffected old saves still load;
- no-debt existing saves default to no active Secret Debt state.

## 16. Cross-system regression

Mandatory preserved behavior:
- ordinary jobs outside bound state;
- normal NightFlow;
- School baseline;
- Activity lifecycle/save/reload;
- ending/RunResult exactly-once;
- Meta/New Run;
- Palace 10/10 ordinary Hard Work prerequisite;
- Lumber Forest exact `activityResult` continuation;
- Lumber Hard Work ONLY `completed_shifts >= 50` and reward `hardWork:lumber`.

## 17. Evidence classification

After tests actually run, evidence may classify:
- **SHIPPED_GREEN** only for production paths naturally executable under accepted Product config;
- **DECISION_BLOCKED** for unanswered Product fields;
- **CONTENT_BLOCKED** for un-authored canonical content;
- **RUNTIME_BLOCKED** only for demonstrated missing primitive.

Do not call seeded state, test-only events or synthetic rewards full Product acceptance.

## 18. Acceptance result template

Future Lead evidence should report:
```text
package commit / PR
production files changed
Product decisions consumed
targeted tests + result
full suite result
save migration result
natural E2E paths proven
accelerators used and why
remaining blocked scope
presentation fallback result
Palace exclusion result
cross-system regressions
```

## Final boundary

The first real poverty package is accepted only when its claimed scope exists in production, is naturally reachable, is reload-safe, preserves anti-softlock and Palace exclusion, and passes targeted + full regression.

This plan itself is preparatory evidence, not proof that the production package exists.
