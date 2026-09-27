# Poverty / Secret Debt Production Handoff v1

Status: production-authoring handoff consolidating ordinary poverty + Secret Debt readiness.

## Source authorities

Read in this order for this slice:
1. `USER_DECISIONS_LOCKED_v1.md` — Palace requires Hard Work on all 10 ordinary professions; Secret Debt/hidden careers do not count; Secret Debt is in full public build.
2. `USER_VISION_AND_ACCEPTANCE.md` — full-life product scope, ordinary poverty, hidden-career expectations.
3. `ECONOMY_AND_POVERTY_DRAFT_v0.md` — ordinary poverty structure, anti-softlock invariants, housing ladder, recovery hooks.
4. `POVERTY_HIDDEN_CAREER_DRAFT_v0.md` — user-directed Secret Debt/Slave hidden-career structure and three outcome families.
5. `NIGHT_AND_ACTIVITY_CONTRACT_v1.md` — forced Night interception, lodging resolution, save/reload and Activity lifecycle.
6. `PALACE_HIDDEN_CAREER_DRAFT_v0.md` — Palace 10/10 ordinary Hard Work exclusion rule.
7. `JOB_ROSTER_RECONCILIATION_v1.md` — ordinary roster context and hidden-career separation.
8. `HOUSING_AND_NIGHT_BALANCE_v1.md` — simulation-supported housing candidate; numeric values remain balance candidates unless separately locked.

Current worker packets:
- `ORDINARY_POVERTY_IMPLEMENTATION_READINESS_v1.md`;
- `SECRET_DEBT_STATE_MACHINE_AUTHORING_PACKET_v1.md` + fixture;
- `SECRET_DEBT_CROSS_SYSTEM_DEPENDENCIES_v1.md`;
- `SECRET_DEBT_OUTCOME_ACCEPTANCE_SKELETON_v1.md` + fixture;
- `FOREST_POVERTY_COEXISTENCE_AUDIT_v1.md`.

## Critical scope identity

There are **10 ordinary jobs** for Palace meta progression.

Secret Debt / hidden Slave career is **additional** to those 10.

It does not occupy an ordinary job slot.

It does not count toward:

`completedOrdinaryHardWork contains ALL 10 ordinary job IDs`

Therefore:
- `bound_life` is not ordinary Hard Work credit;
- `paid_freedom` is not ordinary Hard Work credit;
- `takeover` is not ordinary Hard Work credit;
- no Secret Debt outcome may silently reduce the Palace prerequisite below all 10 ordinary professions.

## PRODUCT_STRUCTURE_FIXED

### Ordinary poverty

Fixed structure:
- normal room / cheap lodging / street are distinct ordinary housing contexts;
- street is the zero-money survival fallback;
- street/cheap lodging alter Night/context/recovery shape rather than ending the run;
- ordinary poverty must remain recoverable without Secret Debt;
- starting-job recovery is an anti-softlock guarantee outside the bound hidden career;
- ordinary street event pool is separate from Secret Debt.

### Secret Debt encounter

Fixed structure:
- hidden, exceptional route triggered only from eligible street sleep;
- at most one offer opportunity per run;
- player can refuse or accept;
- refusal closes the route for that run;
- acceptance grants immediate benefit exactly once and creates a delayed hidden obligation;
- delayed activation enters hidden bound career state.

### Hidden career

Fixed structure:
- separate hidden career, not one of the 10 ordinary jobs;
- while bound, all ordinary jobs are unavailable by domain rule;
- their prior progression is preserved;
- bound route has its own repeatable career work/progression;
- mandatory forced Night obligation exists while bound;
- forced Night is distinct from daytime hidden-career shift.

### Outcome families

Fixed:
- `paid_freedom` = economy solution;
- `bound_life` = career/endurance fate;
- `takeover` = multi-system power solution.

They must remain mechanically distinct.

### Palace exclusion

Fixed:
- Palace unlock = Hard Work on all 10 ordinary professions;
- Secret Debt and other hidden careers are excluded.

## BALANCE_OPEN

Do not lock from current drafts/fixtures:
- normal/cheap lodging prices;
- street next-day penalty magnitude;
- cheap-lodging penalties;
- offer probability;
- immediate Secret Debt amount;
- future debt amount;
- delayed activation timing if not separately locked by Product authority;
- forced Night next-day Energy penalty;
- hidden-career stat gain magnitudes;
- outcome thresholds;
- exact buyout/economic requirements;
- exact Meta rewards;
- street-event weights/reward magnitudes.

Candidate numbers in balance documents are inputs for simulation, not automatic Product lock.

## HUMAN_DECISION_REQUIRED

### Ordinary poverty

Still decide where not already locked:
- exact price/penalty package;
- accepted sale/barter economy if used;
- any ordinary poverty ending family beyond the existing recovery system.

### Secret Debt

Still decide:
- whether School remains available while bound;
- whether large Activity/Forest remains available while bound;
- exact forced-Night intercept point;
- whether forced Night suppresses lodging payment;
- modifier composition policy when housing and forced Night both affect next day;
- exact career stages/thresholds;
- exact takeover external dependency identity;
- exact outcome Meta rewards;
- any same-run continuation behavior not covered by common ending flow.

Do not infer these from fixtures.

## CONTENT_AUTHORING_REQUIRED

### Ordinary poverty content

Author:
- canonical normal/cheap/street presentation;
- repeatable ordinary street events;
- helpful/neutral/bad outcome variants;
- seasonal variants;
- relationship hooks;
- resource/item hooks;
- cheap-lodging context events;
- anti-softlock-safe outcomes.

### Secret Debt content

Author:
- lender encounter/offer scene;
- refusal/acceptance presentation;
- delayed activation reveal;
- hidden career shifts;
- career milestones/stages;
- forced Night variants;
- lender/master/relationship/story events;
- external hook content;
- outcome-specific scenes for paid freedom, bound life and takeover;
- semantic presentation IDs and fallback assets.

No final lore/NPC names are selected by this handoff.

## RUNTIME_SEAMS

Future implementation packages need these seams:

### SecretDebtState persistence

Typed/domain state equivalent to:
- encounter phase;
- accepted/activation boundary;
- debt/benefit state;
- hidden-career bound/resolved phase;
- shifts/night counters/stages/facts/choices;
- outcome readiness/commit state.

Do not scatter the route across unrelated generic booleans.

### Job availability lock

Runtime must project bound state into:
- all ordinary jobs unavailable;
- hidden career available;
- ordinary progress preserved;
- blocked ordinary reactive progression suppressed;
- lock released on genuine dependency exit.

### Forced Night integration

Use NightFlow forced hooks with persisted phase/idempotency:
- suppression policy explicitly authored;
- next-day modifier exactly once;
- calendar advance exactly once;
- reload no duplicate Night obligation.

### Ending integration

Three hidden-career outcomes enter common ending pipeline:
- eligibility;
- explicit commitment;
- completion;
- stable RunResult;
- Meta only after completion.

### Housing / one-time encounter integration

Street-sleep eligibility must:
- check one-time Secret Debt state;
- persist offer/choice;
- avoid reload reroll/reoffer.

### Activity coexistence

Do not alter Activity primitives.

If Product allows Activity while bound, gate it through explicit authoritative conditions while preserving existing Activity save/resume and result semantics.

## ACCEPTANCE_READY

Acceptance structures are ready to turn into executable tests once implementation starts.

### Ordinary poverty minimum

Prove:
1. normal, cheap and street contexts are distinct;
2. zero-money street path reaches next day;
3. at least one ordinary income recovery remains reachable before Secret Debt bound state;
4. ordinary street events resolve without requiring Secret Debt;
5. save/reload does not duplicate lodging payment/penalty/event.

### Secret Debt state machine

Prove:
1. offer only from eligible street context;
2. at most one offer per run;
3. refusal never reoffers;
4. acceptance grant exactly once;
5. delayed activation survives reload;
6. bound state blocks all 10 ordinary jobs without erasing progress;
7. forced Night is exactly once per eligible Night;
8. School/Activity behavior matches the eventual Product decision;
9. exit unlocks ordinary jobs where the selected outcome actually exits dependency.

### Outcomes

Prove separately:
- `paid_freedom`: economic transaction + dependency exit + exactly-once ending;
- `bound_life`: career/endurance eligibility + continued bound state before terminal completion + exactly-once ending;
- `takeover`: multi-system condition + dependency-control transition + exactly-once ending.

Exact Meta assertions wait for Product reward decisions.

### Palace

Prove:
- Secret Debt outcomes never increment the 10-ordinary-job Palace prerequisite;
- only the 10 ordinary career Hard Work completions count.

## Forest / Lumber coexistence

Keep unchanged:
- Forest entry = 2 daytime Energy;
- Activity save/resume semantics;
- exact Forest success continuation `activityResult(lumber.forest, success, lumber.forest.success)`;
- Lumber Hard Work ONLY `completed_shifts >= 50`;
- exact reward `hardWork:lumber`.

Poverty/Secret Debt sequencing must adapt around these contracts rather than modifying them.

## Production handoff summary

Ready now:
- non-numeric ordinary-poverty structure;
- Secret Debt state-machine shape;
- cross-system dependency classification;
- outcome acceptance shapes;
- Activity/Lumber coexistence constraints.

Still blocking implementation completeness:
- Product answers listed above;
- actual poverty/Secret Debt content authoring;
- domain/runtime implementation seams for SecretDebtState/job lock/forced Night/endings.

Secret Debt remains an additional hidden career outside the 10 ordinary jobs and outside the Palace 10/10 prerequisite.
