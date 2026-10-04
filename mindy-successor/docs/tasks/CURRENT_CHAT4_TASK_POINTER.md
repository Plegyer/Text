# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — D42 FULL-SUITE FAILURE TRIAGE v20**
Owner: Chat 4

Previous Camp work is complete and accepted:
- executable-green Camp repair candidate:
  `chat4/activity-camp-baseline-repair-v19@efde0a38bf71a8946194402a9fc47abb168f2aff`
- focused gate: typecheck / validate / build PASS
- focused suite: 107/107 PASS
- disposition: READY_FOR_CHAT2_ASSEMBLY

New branch:
`chat4/d42-full-suite-triage-v20`

Target under review:
`chat2/assembly-d42-night-current-main-20261004-v1@3d92dbbe0c5bfa0e8676178fb05765012f41f8e1`

Latest full CI:
- run `37206154367`
- conclusion: FAILURE
- total failing tests: 13

Task:
classify every D42 full-suite failure before Chat 2 changes anything.

For each failure, classify exactly one:
A. stale pre-D42 count/fixture/presentation expectation;
B. missing D42 localization/caption/content closure;
C. real D42 runtime/behavior regression;
D. unrelated pre-existing failure.

Known failing areas include:
- Assassin localization coverage;
- Tavern frozen-mechanics comparison;
- Guard presentation counts/parity;
- Hunter Night caption;
- Merchant presentation counts/parity;
- ordinary Prostitute Secret Debt firewall;
- Prostitute localization count;
- Foreman UI-surface expectation;
- Tavern private-Night caption.

Required output:
- exact 13-test ledger;
- classification for each;
- smallest safe repair;
- explicit list of production changes allowed/forbidden;
- identify any true runtime blocker separately;
- do not modify production runtime;
- do not run full CI.

Preserve D42 accepted semantics:
- exactly 12 Night surfaces;
- three private-space branches require normal lodging;
- voluntary Night never becomes Secret Debt;
- forced Secret Debt Night retains priority;
- refusal/back-out never publishes success;
- one Night advances calendar once;
- no broad affinity system.

Deliver:
`mindy-successor/docs/tasks/CHAT4_D42_FULL_SUITE_TRIAGE_v20.md`

Report:
`READY_FOR_CHAT2_REPAIR`.
