# Chat 5 — Secret Debt remaining Product blockers

Status: **ACTIVE / D19 AUTHORIZED WORK IMPLEMENTED / BALANCE BLOCKED**
Owner: Chat 5 / Full-Career Producer C
Branch: `chat5/secret-debt-complete-reset-v1`
Preserved resumed-work foundation: `8dd0b12bb2257981f4a6b72bca2017aad9d00e73`

Authority:
- `CURRENT_CHAT5_TASK_POINTER.md`;
- `USER_DECISIONS_LOCKED_v1.md` D19-D20;
- current-authority override in `POVERTY_HIDDEN_CAREER_DRAFT_v0.md`.

The former non-numeric blocker ledger is superseded. The values below are now locked and implemented as production authority, not historical examples:

- lender chance: **20%** on each eligible unseen street night;
- acceptance grant: **2000**;
- activation delay: **10 days** after acceptance;
- activated debt: **20000**;
- forced bound Night next-day Energy: **-1**;
- all-at-once repayment: **20000**;
- hidden Hard Work / Bound Life baseline: **50 daytime shifts**;
- Takeover School requirement: **10 paid lessons**;
- School remains available while bound;
- Large Activity remains available while bound;
- Secret Debt remains outside ordinary 10 / Palace 10-of-10.

## Implemented value-independent and D19-locked behavior

- natural RNG lender encounter with flat 20% chance and one-life refusal closure;
- exact +2000 acceptance grant and persisted `accepted_day`;
- automatic `accepted -> bound` transition on the morning exactly 10 elapsed days after acceptance;
- exact `debt_current = 20000` activation state, independent from legacy generic `debt`;
- domain lock for all ten ordinary careers:
  - shift actions unavailable;
  - ordinary-career state writes suppressed;
  - ordinary-career resolver source domains and queued events suppressed while bound;
  - ordinary-career ending commit blocked while bound;
  - stored progression and pre-existing ending eligibility are preserved for release;
- School remains executable while bound;
- Large Activity entry remains executable while bound;
- forced Night after lodging on every bound night, voluntary Night suppressed, next-day Energy -1 exactly once;
- explicit all-at-once repayment action at 20000, with clean release and Paid Freedom eligibility;
- Bound Life eligibility at 50 completed daytime shifts without releasing the lock before ending commit;
- explicit Takeover action structure with 50-shift + 10-paid-School structural gates plus separate numeric build/Lust seams;
- Paid Freedom / Bound Life / Takeover remain distinct ending IDs using the common eligible -> commit -> RunResult lifecycle;
- all Secret Debt endings currently use `metaRewards: []`, preventing invented rewards;
- RU/EN presentation and fallback identities;
- save/reload coverage for chance outcome, pending encounter, acceptance anchor, activation, forced Night, repayment and ending lifecycle.

## SD-BALANCE-01 — exact daytime shift stat gains

Locked semantic axes:
- Strength increases;
- Endurance increases;
- Sexuality increases;
- Sexuality is not Lust.

Still OPEN:
- exact per-shift/seasonal numeric deltas.

Current seam:
- `SECRET_DEBT_SHIFT_STAT_GAINS = { strength: null, endurance: null, sexuality: null }`;
- production shift does not invent a seasonal/stat package until these values are locked.

## SD-BALANCE-02 — hidden-work wage coefficients

Locked semantics:
- hidden daytime work is paid;
- it uses the normal action wage system;
- income scales upward with relevant stats;
- Lust is a positive wage input.

Still OPEN:
- base wage;
- Strength factor;
- Endurance factor;
- Lust factor.

Current seam:
- `SECRET_DEBT_WAGE_INPUTS = ['strength','endurance','lust']`;
- `SECRET_DEBT_WAGE_POLICY` keeps all four numbers `null`;
- `secretDebtWagePolicyReady()` requires every stat factor, including Lust, to be strictly positive;
- `secretDebtWageDefinition()` produces the normal `Action.wage` shape only after those values are locked;
- production shift therefore does not silently choose a wage.

This blocker means the daytime shift is not yet economically final and Secret Debt must not be called COMPLETE.

## SD-BALANCE-03 — Takeover build and high-Lust thresholds

Already locked and implemented:
- bound route;
- career progress gate uses the locked 50-shift baseline;
- exactly 10 paid School lessons;
- separate explicit player action;
- Takeover is distinct from repayment and Bound Life.

Still OPEN:
- which exact stat thresholds constitute the required build;
- exact high-Lust threshold.

Current seam:
- explicit `takeover-build-authorized` and `takeover-lust-authorized` career facts;
- `SECRET_DEBT_TAKEOVER_GATES` remains null;
- the Takeover action cannot become naturally available until both numeric policies are supplied.

## SD-BALANCE-04 — ending Meta rewards

Still OPEN:
- exact Meta reward for Paid Freedom;
- exact Meta reward for Bound Life;
- exact Meta reward for Takeover.

Current behavior:
- all three endings explicitly declare `metaRewards: []`;
- Secret Debt never writes ordinary `hardWorkProgress` and never contributes to Palace 10/10.

## Cross-owner D20 note

Body Confidence `Lust +2` per paid lesson is locked by D20 but owned by Chat 3 according to the current Chat 5 pointer. Chat 5 does **not** duplicate or patch that shared School-owned effect locally.

The Takeover School requirement counts paid School lessons through the existing `actionCounts['school']` runtime proof, so it remains compatible with the D20 implementation when integrated.

## Completion rule

Secret Debt is **not COMPLETE** while SD-BALANCE-01 through SD-BALANCE-04 remain unresolved.

No early PR should be opened from this branch. Once Product locks the remaining constants, wire them into the existing seams, run focused regressions, freeze the exact head, and hand the candidate to Chat 2 according to the team flow.
