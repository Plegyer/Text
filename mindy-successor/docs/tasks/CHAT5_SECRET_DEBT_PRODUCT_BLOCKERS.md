# Chat 5 — Secret Debt Product blockers

Status: **ACTIVE / NOT COMPLETE**
Owner: Chat 5 / Full-Career Producer C
Branch: `chat5/secret-debt-complete-reset-v1`
Baseline: `9ee5dd227db85b1987acd099e15ed274cb085110`
Authority: current role pointer + `POVERTY_HIDDEN_CAREER_DRAFT_v0.md` + `USER_DECISIONS_LOCKED_v1.md` + `EXECUTABLE_TZ_v1.md`

This ledger records Product decisions that are still required before Secret Debt can be called naturally complete. Historical values such as 2000 / 20000 / 10 days are not authority and are intentionally absent from the implementation.

## SD-PRODUCT-01 — natural lender trigger

OPEN:
- trigger probability;
- exact street-lender eligibility beyond the locked street context.

Implemented around the blocker:
- one-time `secret-debt.lender-encounter`;
- explicit accept/refuse;
- terminal refusal for this run;
- `unseen -> offered` state-machine seam guarded by `encounter-authorized`;
- deterministic pending-scene/save behavior once an offer has actually been authorized.

Blocked:
- production code must not set `encounter-authorized` until Product supplies the trigger policy.
- the encounter therefore must not be described as naturally reachable yet.

## SD-PRODUCT-02 — immediate help amount

OPEN:
- exact amount granted on acceptance.

Implemented around the blocker:
- acceptance is persisted;
- acceptance day is captured exactly;
- no generic legacy `debt` metric is reused.

Blocked:
- acceptance currently grants no invented money/resource amount.

## SD-PRODUCT-03 — delayed trap activation and principal

OPEN:
- activation delay;
- debt/principal amount and resulting payment economics.

Implemented around the blocker:
- acceptance day persists as `accepted_day`;
- `secretDebtActivationDue(save, activationDelayDays)` accepts the future Product value as an explicit parameter and owns no fallback/default;
- `accepted -> bound` exists behind the `activation-authorized` seam;
- Paid Freedom waits for a distinct `debt-cleared` fact instead of reusing the old generic debt surface.

Blocked:
- production code must not set `activation-authorized` or `debt-cleared` from guessed timing/economy values.

## SD-PRODUCT-04 — bound-work numeric progression

OPEN:
- exact Strength / Endurance / Sexuality gains;
- any exact debt reduction, wage, or other per-shift economic value;
- the Product-facing Secret Debt progression-stage ladder beyond the minimum technical lifecycle states needed to represent offer / acceptance / binding / resolution.

Implemented around the blocker:
- the current `unseen / offered / refused / accepted / bound / resolved-*` values are internal lifecycle states only, not a claimed Product progression ladder;
- bound work costs the globally locked Work cost of 1 Energy;
- completed bound shifts are counted;
- ordinary profession shifts are blocked while bound;
- all prior ordinary-profession progress is preserved.

Blocked:
- no Secret Debt stat package or debt-economic effect is applied yet.

## SD-PRODUCT-05 — forced Night Energy consequence

OPEN:
- exact next-day Energy penalty.

Implemented around the blocker:
- forced Night event runs after lodging;
- lodging is committed exactly once;
- voluntary Night choices are suppressed;
- Night is consumed and forced-night work is counted;
- pending Night state survives save/reload.

Blocked:
- no next-day Secret Debt Energy modifier is applied until Product locks the value.

## SD-PRODUCT-06 — outcome gates and rewards

OPEN:
- Bound Life exact tenure/milestone threshold;
- Takeover exact build thresholds;
- exact external-system source/condition for Takeover;
- exact rewards / Meta rewards for Paid Freedom, Bound Life, and Takeover.

Implemented around the blocker:
- Paid Freedom resolves only from `debt-cleared`;
- Bound Life resolves only from `bound-life-ready`;
- Takeover requires both `takeover-route-ready` and `takeover-external-condition-met`, plus the explicit takeover route choice;
- all three produce distinct ending IDs through the common eligible -> commit -> RunResult lifecycle;
- all three currently declare `metaRewards: []`, so no reward is silently invented;
- Secret Debt never contributes to Palace 10/10.

Blocked:
- the facts above must not be generated from guessed thresholds.
- final Meta rewards remain intentionally absent.

## SD-PRODUCT-07 — School and Activity while bound

OPEN in current Secret Debt authority:
- whether School remains available while bound;
- whether Activity remains available while bound.

Implemented around the blocker:
- no shared School/Activity framework was changed;
- the profession-specific ordinary-job lock is independent of these systems.

Blocked:
- Chat 5 will not disable or enable these systems specially until Product resolves the policy.

## Completion rule

Secret Debt is **not COMPLETE** while any blocker above remains OPEN. The current branch may be implementation-complete only for the independent architecture around those decisions; natural playable acceptance still requires the missing Product policy to be supplied and wired without historical-number fallback.
