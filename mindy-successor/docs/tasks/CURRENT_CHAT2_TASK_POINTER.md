# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — D42 FINAL REPAIR AFTER TRIAGE**
Owner: Chat 2 / sole current-main assembly + full-CI lane

Current assembly branch:
`chat2/assembly-d42-night-current-main-20261004-v1`

Current production head before repair:
`3d92dbbe0c5bfa0e8676178fb05765012f41f8e1`

Leader hold/pointer commit after that head is coordination only.

Authoritative triage:
`chat4/d42-full-suite-triage-v20@91464f14cb87c5f7d6185af3a4c7d73ed08099fd`

Triage verdict:
- 8 stale pre-D42 test expectations
- 5 missing D42 localization/accessibility items
- 0 runtime regressions
- 0 unrelated blockers

## Allowed repair

Production content:
- complete all 12 D42 bilingual caption pairs;
- add missing bilingual event.* localization for all 12 D42 after-choice events;
- apply the two already-approved EN private-conversation wording alignments.

Tests only:
- update stale Guard / Merchant / Prostitute counts;
- narrow Tavern historical comparison to allow only the accepted D42 additive Night surface;
- narrow ordinary-Prostitute firewall to allow accepted voluntary after-choice Night while still forbidding Secret Debt semantics;
- allow only the exact D42 Foreman anti-repeat fact condition.

## Forbidden

Do not change:
- Night runtime behavior;
- Night save schema;
- D42 conditions/effects/nightPolicy;
- Secret Debt forced-Night priority;
- private-space housing gates;
- consent semantics;
- calendar ownership;
- Palace;
- D40/D41 mechanics;
- presentation engine.

## Gate

1. apply only the triage-authorized repair;
2. run focused D42/localization/presentation/firewall tests;
3. run typecheck / validate / build;
4. run one full CI;
5. if green, freeze exact SHA and report `READY_FOR_LEADER_MERGE`.

Do not merge main.
