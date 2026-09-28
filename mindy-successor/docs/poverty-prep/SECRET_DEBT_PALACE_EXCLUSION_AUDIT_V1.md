# Secret Debt / Palace Exclusion Audit v1

Status: exact current-content + authoritative-product audit.

Current main:
`df0119fd6574b69ab89cf1a99ae77adae3d811f1`.

## Palace rule authority

`USER_DECISIONS_LOCKED_v1.md` states:
- Palace unlock requires Hard Work on **all 10 ordinary professions**;
- Secret Debt / hidden careers do not count.

`PALACE_HIDDEN_CAREER_DRAFT_v0.md` repeats:
`completedOrdinaryHardWork contains ALL 10 ordinary job IDs`
and explicitly excludes Secret Debt / `bound_life` and other hidden careers.

## Current ordinary profession roster

Current `src/ui/app.ts` exact work roster contains ten IDs:

1. `lumber.shift`
2. `satyr-maid.shift`
3. `undead-farm.shift`
4. `tavern.shift`
5. `hunter.shift`
6. `guard.shift`
7. `merchant.shift`
8. `artist-geisha.shift`
9. `assassin.shift`
10. `prostitute.shift`

No Secret Debt/Slave action ID appears in this ordinary-profession list.

## Roster authority

`JOB_ROSTER_RECONCILIATION_v1.md` defines:
- the ten ordinary careers;
- Palace as hidden/meta job;
- Slave/Secret Debt career as an **extra hidden career**;
- the hidden debt career does not occupy an ordinary slot and does not replace Palace.

It also explicitly distinguishes voluntary `prostitute.shift` from the forced Secret Debt route.

## Current production endings

Current `definitions.json` contains no Secret Debt ending identity:
- no `paid_freedom`;
- no `bound_life`;
- no `takeover`.

Therefore there is currently no Secret Debt completion path capable of incrementing ordinary Hard Work progression through an exact production ending.

## Current production actions/activities

Current production has generic debt actions:
- `repay`;
- `rent-room`.

Neither is in the ten-profession roster.

No Secret Debt hidden-career shift exists in current `definitions.json`.

## Exclusion result

Secret Debt currently:
- is **not** an ordinary career;
- occupies **0** ordinary profession slots;
- supplies **0** current ordinary Hard Work endings;
- supplies **0** Palace 10/10 credits;
- does not replace `prostitute.shift`;
- does not replace Palace.

## Future acceptance

Any future Secret Debt production patch must prove:
- its hidden-career work is not appended to the ordinary ten as an eleventh Palace prerequisite;
- its outcomes do not write ordinary Hard Work credits;
- Palace still requires all ten existing ordinary-career Hard Work completions.

## Conclusion

Exact current content and locked Product authority agree:
Secret Debt is excluded from Palace 10/10 ordinary-career progression and remains a separate hidden route/career.
