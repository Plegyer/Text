# Poverty Production Test-Case Inventory v1

Status: executable/future acceptance inventory for ordinary poverty + Secret Debt production.

Classification:
- **EXECUTABLE_NOW** — current main runtime can execute the behavior with existing definitions or synthetic test catalog;
- **CONTENT_BLOCKED** — runtime seam exists but canonical poverty/Secret Debt production content is not authored;
- **DECISION_BLOCKED** — exact expected behavior depends on unresolved Product/balance choice;
- **FUTURE_RUNTIME_WORK** — bounded runtime/domain integration is still required before the case can become production-executable.

Do not fabricate inputs for OPEN Product decisions.

## Ordinary lodging

### P01 normal lodging payment / reload

Status: **EXECUTABLE_NOW**.

Current evidence:
- `night-flow.test.ts` proves normal paid lodging charges once;
- reload after payment does not charge again;
- normal sleep advances one day.

Future production assertion:
- canonical `lodging.normal` uses production balance value;
- no poverty penalty merely from normal housing.

### P02 cheap lodging context

Status: **EXECUTABLE_NOW at runtime / CONTENT_BLOCKED for final authored tradeoff**.

Current evidence:
- `lodging.cheap` exists;
- NightFlow can select cheap housing and persist tier;
- payment is atomic.

Still blocked:
- final price;
- final menu restrictions/penalties/events.

### P03 street lodging fallback

Status: **EXECUTABLE_NOW at current runtime/candidate definitions**.

Current evidence:
- `lodging.street` costs zero;
- current production definitions queue Grooming -1 and next-day Energy -1;
- NightFlow applies queued modifiers once.

Important:
these numeric values remain balance-owned candidates; the execution primitive is proven, not the final tuning.

## Zero-money recovery

### P04 zero-money player reaches next day through street

Status: **EXECUTABLE_NOW**.

Test shape:
- set money to zero;
- enter NightFlow;
- choose street lodging;
- resolve sleep/allowed Night path;
- assert next day begins;
- assert no negative-money state;
- assert calendar advances once.

### P05 zero-money run retains reachable ordinary income path

Status: **CONTENT_BLOCKED / production-roster dependent**.

Needs:
- production starting-job availability definition;
- no mandatory paid-tool prerequisite;
- ordinary income action reachable after recovery day.

Runtime action/job primitives already exist.

## Ordinary street events

### P06 helpful/neutral/bad ordinary street event families

Status: **CONTENT_BLOCKED**.

Runtime-ready seams:
- after-lodging/forced event delivery;
- event history/RNG persistence;
- money/item/public-fact/next-day effects.

Blocked by:
- canonical event IDs;
- weights;
- effects;
- content.

### P07 committed street event survives reload without reroll

Status: **EXECUTABLE_NOW as generic Night/event runtime; CONTENT_BLOCKED for poverty production content**.

Current generic Night tests already prove pending probabilistic forced event reload stability.

Future poverty test must use canonical ordinary street event content.

### P08 bad street event preserves anti-softlock

Status: **CONTENT_BLOCKED + BALANCE/DECISION DEPENDENT**.

Needs:
- canonical bad outcomes;
- accepted recovery portfolio;
- final parameter values.

Do not invent a synthetic 'last money' threshold as Product truth.

## Poverty Night save/reload

### P09 lodging payment exactly once

Status: **EXECUTABLE_NOW**.

Covered by current NightFlow tests.

### P10 street/cheap next-day modifier exactly once

Status: **EXECUTABLE_NOW for current definitions**.

Final expected magnitudes remain balance-owned.

### P11 calendar advances exactly once

Status: **EXECUTABLE_NOW**.

Covered by NightFlow.

### P12 poverty event + lodging + modifier reload chain

Status: **CONTENT_BLOCKED**.

Needs canonical poverty event layered onto current NightFlow primitives.

## Lender offer / Secret Debt encounter

### P13 lender only from eligible street Night

Status: **CONTENT_BLOCKED + FUTURE_RUNTIME_WORK for SecretDebtState integration**.

Fixed expectation:
- no offer from normal/cheap lodging;
- at most one opportunity per run.

Open input:
- exact chance/extra eligibility.

### P14 refusal remains terminal for run

Status: **FUTURE_RUNTIME_WORK**.

Needs persisted Secret Debt encounter phase.

Do not test with generic unrelated boolean as final production state.

### P15 acceptance immediate grant exactly once

Status: **FUTURE_RUNTIME_WORK + DECISION_BLOCKED**.

Runtime needs Secret Debt domain persistence/transaction integration.

Decision-blocked:
- exact principal amount.

Test may later assert symbolic parameter/accepted configured value, not a guessed number.

## Delayed debt activation

### P16 accepted -> pending activation survives reload

Status: **FUTURE_RUNTIME_WORK**.

Needs durable activation state/owner.

### P17 activation occurs exactly once at persisted calendar boundary

Status: **FUTURE_RUNTIME_WORK + DECISION_BLOCKED for interval value**.

Expected behavior can be tested with configured accepted interval after Product/balance decision.

### P18 reload around activation boundary does not shift date or double-activate

Status: **FUTURE_RUNTIME_WORK**.

## Ordinary-career blocking

### P19 bound state blocks all 10 ordinary careers

Status: **FUTURE_RUNTIME_WORK**.

Product behavior is already fixed; missing piece is availability gating integration.

### P20 ordinary career progress preserved while bound

Status: **FUTURE_RUNTIME_WORK**.

Test must snapshot stage/counters/facts before activation and compare after blocked period/reload.

### P21 blocked ordinary progression cannot advance reactively

Status: **FUTURE_RUNTIME_WORK**.

Needs resolver/availability seam.

### P22 resolution restores ordinary availability under normal gates

Status: **FUTURE_RUNTIME_WORK**.

Outcome-specific expectation:
- `paid_freedom`: restore debt-specific lock;
- `takeover`: restore debt-specific lock;
- `bound_life`: remains bound during active pre-terminal run; post-ending same-run continuation remains Product-owned.

## Forced Night

### P23 bound state triggers mandatory Secret Debt Night

Status: **FUTURE_RUNTIME_WORK + CONTENT_BLOCKED**.

NightFlow intercept primitives are executable now; Secret Debt eligibility/content is not.

### P24 forced Night suppresses incompatible voluntary menu

Status: **DECISION_BLOCKED for exact intercept/payment policy; fixed suppression requirement once active**.

Generic NightFlow already proves suppression primitives.

### P25 forced Night reload exactly once

Status: **FUTURE_RUNTIME_WORK**.

Must prove:
- event not duplicated;
- penalty not duplicated;
- career/story effect not duplicated;
- calendar advances once.

### P26 forced Night next-day penalty

Status: **DECISION_BLOCKED**.

Exact magnitude and modifier composition remain open.

## Secret Debt outcomes

### P27 `paid_freedom` eligibility / transaction / ending

Status: **FUTURE_RUNTIME_WORK + DECISION_BLOCKED + CONTENT_BLOCKED**.

Fixed assertions later:
- economic solution;
- debt transaction once;
- dependency lock release;
- explicit ending commit;
- stable RunResult;
- Meta only after completion.

Open:
- debt value/threshold;
- exact ending content;
- Meta reward.

### P28 `bound_life` eligibility / ending

Status: **FUTURE_RUNTIME_WORK + DECISION_BLOCKED + CONTENT_BLOCKED**.

Fixed assertions later:
- career/endurance family;
- not generic failure;
- substantial career progress + explicit commitment;
- bound professional lock remains while active pre-terminal run;
- no Palace ordinary Hard Work credit.

Open thresholds/Meta/content.

### P29 `takeover` multi-system eligibility / ending

Status: **FUTURE_RUNTIME_WORK + DECISION_BLOCKED + CONTENT_BLOCKED**.

Fixed assertions later:
- more than shifts;
- at least one external dependency;
- subordinate lock resolves;
- explicit ending transaction;
- no Palace ordinary Hard Work credit.

Open external identity/build/Meta/content.

## Palace exclusion

### P30 Secret Debt outcomes add zero ordinary Hard Work credits

Status: **EXECUTABLE_NOW at existing Meta prerequisite contract / FUTURE integration regression once outcomes exist**.

Current Palace contract already defines prerequisite as all 10 ordinary careers.

Future test:
- complete each Secret Debt outcome in isolation;
- assert ordinary Hard Work set/count unchanged;
- assert Palace prerequisite unchanged.

### P31 `bound_life` cannot substitute for missing ordinary Hard Work

Status: **FUTURE integration regression**.

Needs production Secret Debt ending but Product expectation is already fixed.

## School / Activity while bound

### P32 School availability in bound state

Status: **DECISION_BLOCKED**.

Do not write a pass/fail expectation until Product decides YES/NO/CONDITIONAL.

### P33 Forest/Activity availability in bound state

Status: **DECISION_BLOCKED**.

Whatever later decision is selected must preserve Activity save/resume and existing Forest contracts.

## Test implementation rule

When converting an inventory row into executable production QA:
1. use canonical production definitions/IDs;
2. use accepted configured balance values rather than guessed literals;
3. seed only long-threshold state explicitly labeled as a QA accelerator;
4. never seed a missing content decision and then call the Product path naturally reachable;
5. preserve save/reload around each transaction boundary.

## Current summary

| Area | Current readiness |
| --- | --- |
| generic normal/cheap/street Night mechanics | EXECUTABLE_NOW |
| zero-money street next-day path | EXECUTABLE_NOW |
| canonical ordinary street event content | CONTENT_BLOCKED |
| Secret Debt encounter/state | FUTURE_RUNTIME_WORK + CONTENT |
| delayed activation | FUTURE_RUNTIME_WORK |
| 10-job blocking | FUTURE_RUNTIME_WORK |
| forced Night primitive | EXECUTABLE_NOW generically; Secret Debt integration FUTURE_RUNTIME_WORK |
| outcome ending infrastructure | EXECUTABLE_NOW generically; Secret Debt outcomes blocked |
| Palace exclusion rule | DEFINED NOW; production regression after Secret Debt outcomes exist |
| School/Activity while bound | DECISION_BLOCKED |
