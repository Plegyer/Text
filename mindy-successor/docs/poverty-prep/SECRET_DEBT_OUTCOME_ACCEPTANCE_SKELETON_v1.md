# Secret Debt Outcome Acceptance Skeleton v1

Status: acceptance skeleton for the three user-directed Secret Debt outcome families.

No exact threshold, debt value, Meta reward, NPC, prose or final presentation is locked here.

All three outcomes use the common ending lifecycle:

`eligible -> explicit commit -> completeEnding -> stable RunResult -> Meta exactly once`

Eligibility is not completion.

## Shared acceptance contract

Every Secret Debt outcome must prove:
1. the run is genuinely in the Secret Debt route/state;
2. eligibility is derived from authoritative persisted state;
3. eligibility survives save/reload;
4. explicit ending commitment is separate from eligibility;
5. completion is idempotent;
6. Meta reward, once Product defines it, applies only after completion and exactly once;
7. reload/retry does not duplicate money removal, job-lock release, reward or RunResult;
8. the outcome does not count as one of Palace's 10 ordinary Hard Work completions.

## `paid_freedom`

Mechanical family:
**economy solution**.

### Eligibility data categories

Allowed/required categories:
- Secret Debt career is active/bound;
- authoritative debt obligation state;
- authoritative money/economic state sufficient for the accepted payoff rule;
- any explicitly accepted payoff-choice/fact;
- exact debt amount remains OPEN balance.

Do not replace this with a hidden shift threshold.

### Ending transaction expectations

At the accepted payoff commit boundary:
- debt payment/removal commits exactly once;
- professional ordinary-job lock is released as dependency ends;
- ordinary career progress remains the previously preserved progress;
- ending becomes eligible/committable through the common ending system;
- completion produces one stable RunResult.

Whether the player may continue the same run after becoming eligible/before final ending commitment follows the common ending design; eligibility itself must not silently complete the ending.

### Meta

Meta reward family may be economic, but exact reward ID/effect is **OPEN**.

No QA fixture may invent it.

### Save/reload

Required checkpoints:
- before payoff;
- after payoff transaction but before ending completion if that state is supported;
- after explicit ending commit;
- after completion.

Reload must not:
- charge the debt twice;
- restore paid debt;
- reapply job unlock twice;
- duplicate Meta or RunResult.

### Ordinary jobs after resolution

Dependency exit is explicit.

If the run continues at any point after the payoff/dependency-resolution boundary, ordinary jobs must be available again according to their normal independent gates.

## `bound_life`

Mechanical family:
**career/endurance life fate / Hard-Work analogue for the hidden career**.

This is not a generic failure screen.

### Eligibility data categories

Allowed/required categories:
- Secret Debt career active/bound;
- sufficient hidden-career progress/stage;
- a career milestone/fact where final design requires it;
- explicit/conscious route commitment;
- exact shift count, stage and milestone IDs remain OPEN.

Do not reduce it to a borrowed ordinary-job Hard Work threshold without Product approval.

### Ending transaction expectations

Before explicit ending completion:
- Secret Debt remains bound;
- ordinary-job professional lock remains active;
- forced Night obligations remain active while normal run play continues.

Then:
- explicit ending commit records the chosen fate;
- `completeEnding` produces one stable RunResult;
- Meta applies only after completion.

### Meta

Exact Meta reward is **OPEN**.

`bound_life` does not count toward Palace 10/10 ordinary Hard Work.

### Save/reload

Required checkpoints:
- just before eligibility;
- eligible but uncommitted;
- committed;
- completed.

Reload must preserve:
- bound career progress;
- job lock before ending completion;
- eligibility/commit state;
- exactly-once completion.

### Ordinary jobs after resolution

For the ordinary active-run state before terminal completion: ordinary jobs remain blocked.

After terminal ending completion, the run follows common RunResult/New Run semantics. If Product later allows a same-run continuation for `bound_life`, the professional-lock policy must be explicitly decided; this skeleton does not infer liberation from a fate defined as remaining bound.

## `takeover`

Mechanical family:
**multi-system power solution**.

### Eligibility data categories

Required categories:
- Secret Debt career active/bound;
- sufficient hidden-career progress;
- accepted build/stat condition(s);
- explicit route choice;
- at least one accepted external dependency category such as item, ally/relationship, School public result or Activity result.

Exact stat thresholds, item/fact IDs and external route are **OPEN**.

### Ending transaction expectations

At the accepted takeover resolution boundary:
- external dependency/check is consumed or recorded only according to its own accepted policy;
- owner/master removal/control transition commits exactly once;
- professional dependency lock is released because the heroine no longer remains subordinate;
- ending is committed/completed through the common ending transaction;
- completion creates one stable RunResult.

### Meta

Meta is expected to be stronger/rule-changing than simple tenure according to the draft's qualitative intent, but the exact reward is **OPEN** and this packet does not rank candidate rewards.

### Save/reload

Required checkpoints:
- before external condition is satisfied;
- eligible after multi-system condition;
- after takeover transaction/commit;
- after ending completion.

Reload must not:
- kill/remove the owner twice;
- duplicate acquired control/fact/item;
- re-open the dependency lock;
- duplicate Meta/RunResult.

### Ordinary jobs after resolution

Takeover resolves the subordinate dependency.

If the run continues after that resolution boundary, ordinary jobs must not remain blocked merely because the old debt state had once been bound. Normal independent job gates still apply.

## Outcome separation acceptance

The three families must remain mechanically distinguishable:
- `paid_freedom` = economic resolution;
- `bound_life` = continued career/endurance fate;
- `takeover` = multi-system power resolution.

Do not implement them as:
`low shifts -> paid`, `medium shifts -> bound`, `high shifts -> takeover`.

## Palace exclusion

All Secret Debt outcomes are outside the 10 ordinary-job Palace prerequisite.

`bound_life` is explicitly excluded; the other Secret Debt outcomes also do not add ordinary Hard Work credit.

## OPEN

- exact thresholds;
- exact debt/principal;
- exact external condition identities;
- exact ending choices/scenes;
- exact Meta rewards;
- same-run continuation semantics where not already defined;
- final presentation assets.
