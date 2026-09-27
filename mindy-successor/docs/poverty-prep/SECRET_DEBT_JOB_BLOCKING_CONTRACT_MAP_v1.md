# Secret Debt Ordinary-Job Blocking Contract Map v1

Status: Product-contract map for ordinary-career availability while Secret Debt is active.

This document describes behavior boundaries only. It does not prescribe runtime implementation, thresholds or data shape.

## Scope identity

Ordinary professional roster:
**10 ordinary careers**.

Secret Debt / hidden Slave career:
**additional hidden career**, outside the 10 ordinary careers.

Palace prerequisite:
Hard Work Meta from all 10 ordinary careers only.

Secret Debt does not occupy, replace or satisfy an ordinary-career slot for Palace accounting.

## Fixed state boundary

Before Secret Debt activation:
- ordinary careers follow their normal independent availability rules;
- Secret Debt career is hidden/inactive;
- existing ordinary career progress remains owned by each career.

When delayed debt activates and the route becomes `bound`:
- all 10 ordinary careers become unavailable;
- Secret Debt/Slave becomes the available profession;
- existing progress in ordinary careers is preserved;
- ordinary career progression must not advance while that career is unavailable because of the Secret Debt lock;
- the lock is a domain rule, not merely a hidden UI card.

## Fixed behavior: ordinary career availability

### While not bound

Secret Debt imposes no professional lock.

Ordinary careers still apply their own:
- stat conditions;
- calendar/world conditions;
- relationship/public fact conditions;
- career-specific gates.

### While bound

Product-directed rule:

`JobAvailability(ordinaryCareer) = unavailable due to Secret Debt professional lock`

for each of the 10 ordinary careers.

At the same time:

`JobAvailability(secretDebtCareer) = available`

subject only to its own active/bound state and any later accepted hidden-career conditions.

No ordinary career is silently deleted.

## Fixed behavior: progression preservation

While bound:
- prior ordinary-career stage remains preserved;
- counters remain preserved;
- career facts remain preserved;
- relationship/story progress owned elsewhere remains preserved;
- Meta already earned from prior lives is unaffected.

Blocked ordinary career progress must not:
- reset;
- decrement merely because of debt activation;
- gain new shift/progression credit while unavailable;
- fire reactive ordinary-career milestones as if work had continued.

After a genuine dependency exit, preserved state is the same career state becoming available again, not a reconstructed copy.

## Secret Debt career availability

Secret Debt career is:
- hidden before activation;
- available while bound;
- structurally a full hidden career with repeatable work/progression;
- separate from ordinary career count.

Availability of Secret Debt career does not alter the identity or count of the 10 ordinary careers.

## Outcome-dependent professional-lock release

### `paid_freedom`

Fixed direction:
- paying/resolving the debt exits dependency;
- Secret Debt professional lock is removed;
- if the run continues, ordinary careers may again be available according to their normal independent gates.

Do not interpret lock removal as automatic eligibility for every ordinary career; only the Secret Debt-specific block is removed.

### `takeover`

Fixed direction:
- takeover resolves subordinate debt dependence;
- Secret Debt professional lock must not remain accidentally active after the accepted takeover resolution;
- if the run continues, ordinary careers return to their normal independent availability rules.

### `bound_life`

Fixed direction:
- this outcome represents remaining in the dependency as a life/career fate;
- while the run remains active and bound before terminal ending completion, ordinary jobs remain blocked.

After terminal ending completion, common RunResult/New Run behavior applies.

If Product later permits same-run continuation after `bound_life`, whether professional blocking persists must be explicitly decided; do not infer freedom from an outcome whose identity is continued bound life.

## Palace prerequisite accounting

Locked user decision:

`completedOrdinaryHardWork contains ALL 10 ordinary job IDs`

Secret Debt outcomes do not add ordinary Hard Work credit.

Therefore:
- `paid_freedom` adds 0 ordinary-career Palace credits;
- `bound_life` adds 0 ordinary-career Palace credits;
- `takeover` adds 0 ordinary-career Palace credits.

Even if a Secret Debt Meta reward is later authored, it is separate from the 10 ordinary Hard Work prerequisite.

Repeated Secret Debt endings must never substitute for a missing ordinary career in Palace 10/10.

## School availability while bound

Status:
**UNRESOLVED / PRODUCT-OWNED**.

The Secret Debt draft explicitly does not automatically block School.

Do not infer:
- School is always blocked;
- School is always available;
- Night study is automatically blocked/available.

Once Product decides, School availability must be expressed independently of the ordinary-career professional lock.

Ordinary-job blocking alone is not authority to block School.

## Activity availability while bound

Status:
**UNRESOLVED / PRODUCT-OWNED**.

The Secret Debt draft explicitly leaves large Activity/additional action availability open.

Do not infer:
- Forest/Activity is always blocked;
- Forest/Activity is always available.

Any future decision must preserve existing Activity contracts and use an explicit availability rule.

Ordinary-job blocking alone is not authority to block Activity.

## Other daytime actions

Status:
not automatically covered by the ordinary-career lock.

The professional lock applies to ordinary jobs.

School, Activity, relationships, item actions, paid events and other systems each require their own accepted availability rule.

Do not broaden `all ordinary jobs blocked` into `all daytime actions blocked`.

## Save/reload acceptance boundary

Behavioral contract:
- bound state after reload still blocks the same 10 ordinary careers;
- preserved ordinary career progress is identical before/after reload;
- Secret Debt career remains available while bound;
- reload cannot temporarily expose a blocked ordinary job;
- resolving an outcome cannot apply lock removal twice;
- Palace ordinary-Hard-Work accounting is unchanged by save/reload.

## New Run boundary

Secret Debt professional lock is run-level hidden-career state.

Starting a new run follows normal new-run state creation and Meta carryover rules.

Do not persist an active bound professional lock into a fresh run merely because a Secret Debt ending/Meta reward exists.

Any future Meta effect that changes Secret Debt discovery/availability must be separately Product-approved.

## Contract table

| Point | Status | Required behavior |
| --- | --- | --- |
| 10 ordinary jobs unavailable while bound | FIXED | all ordinary careers blocked by debt professional lock |
| Secret Debt career available while bound | FIXED | hidden career replaces ordinary professional choice while bound |
| ordinary progress preserved | FIXED | no reset/delete |
| blocked ordinary progress does not advance | FIXED | no hidden progression through Resolver |
| Palace count | FIXED | only 10 ordinary Hard Work Meta count |
| paid_freedom lock release | FIXED direction | remove debt-specific professional lock on dependency exit |
| takeover lock release | FIXED direction | remove debt-specific professional lock on dependency exit |
| bound_life during active bound run | FIXED | ordinary jobs remain blocked |
| bound_life same-run post-ending continuation | OPEN | Product decision if such continuation exists |
| School while bound | OPEN | Product decision |
| Activity while bound | OPEN | Product decision |
| exact activation/outcome thresholds | OPEN | balance/content decision |

## Explicit non-goals

This map does not choose:
- a runtime representation;
- career IDs beyond already-directed Secret Debt identity;
- thresholds;
- School behavior;
- Activity behavior;
- Meta reward;
- balance numbers.

It only preserves the Product-directed professional lock and its boundaries.
