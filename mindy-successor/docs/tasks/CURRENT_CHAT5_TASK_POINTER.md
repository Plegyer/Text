# CURRENT CHAT5 TASK POINTER

Status: **ACTIVE — SECRET DEBT / HIDDEN POVERTY ROUTE RESUMED**
Owner: Chat 5 / Full-Career Producer C
Branch: `chat5/secret-debt-complete-reset-v1`
Preserved foundation head before resumed work: `8dd0b12bb2257981f4a6b72bca2017aad9d00e73`

## Authority

Read `USER_DECISIONS_LOCKED_v1.md` D19-D20 and the current-authority override in
`POVERTY_HIDDEN_CAREER_DRAFT_v0.md`.

The old blocker ledger is superseded wherever it conflicts with D19-D20.

Now locked:
- street-night lender chance 20% while unseen;
- refusal closes the route for that life;
- +2000 immediately on acceptance;
- activation exactly 10 days later;
- debt exactly 20000;
- all 10 ordinary professions domain-locked from activation until actual exit, while preserving their progress;
- School available;
- Activity available but not an easy repeatable 20000-money farm;
- hidden daytime work is paid and Lust contributes positively to wage;
- forced Night every bound night, voluntary Night suppressed, next-day Energy -1;
- one all-at-once 20000 repayment action, no partial payments;
- hidden Hard Work = 50 daytime shifts, excluded from Palace 10/10;
- owner-kill/control route requires career progress + stat build + high Lust + 10 paid School lessons + a separate explicit player action;
- Body Confidence Lust +2 is owned by Chat 3; do not duplicate it locally.

## Work now

Continue the profession-owned implementation:
- natural encounter / accept-refuse / deterministic 20% behavior;
- exact 2000 grant and 10-day activation;
- exact 20000 debt and one-shot repayment action;
- ordinary-profession domain lock and clean release;
- paid hidden daytime job using the normal wage system with Lust as one input;
- every-night forced flow and -1 next-day Energy;
- 50-shift Hard Work;
- School/Activity availability policy;
- owner-kill/control route structure and explicit action;
- RU/EN, presentation/fallbacks, save/reload exactly-once, focused tests.

Still open: exact per-shift stat gains, exact wage coefficients, exact owner-kill stat/Lust gates, and ending Meta rewards. Put these behind clear constants/seams; do not invent final numbers.

No producer full CI. When all authorized work is complete, freeze SHA and report remaining Product-open constants. If no blockers remain, report `READY_FOR_CHAT2`.
