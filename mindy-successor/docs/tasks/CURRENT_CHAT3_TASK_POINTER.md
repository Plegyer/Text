# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — LIVE ECONOMY AFFORDABILITY HARNESS v7**
Owner: Chat 3

Accepted D31 producer candidate:
`chat3/seasonal-negative-target-map-implementation-v6@79ff36c66947a1f1273ab0bde7a3c7f1b797a2a7`

Producer disposition:
- exact D31 content-only target map accepted for later Chat 2 assembly;
- diff is limited to `definitions.json` target stats + seasonal acceptance test;
- no runtime/schema expansion;
- full CI remains Chat 2 responsibility.

New branch:
`chat3/live-economy-affordability-harness-v7`

Read:
- `LEADER_LIVE_ECONOMY_DRIFT_AUDIT_v1.md`;
- `LEADER_HOUSING_SEMANTIC_AUDIT_v1.md`;
- D26, D31, D32 in `USER_DECISIONS_LOCKED_v1.md`.

## Assignment

Build a research-only 160-day affordability/progression harness using the **current executable successor economy**, not old WU candidate assumptions.

No production changes.

Baseline must use current live values:
- fresh money 600;
- base Energy 3;
- lodging normal 100 / cheap 50 / street 0;
- street next-day Energy -1 + Grooming -1;
- current paid School tuition/effects;
- current ordinary wage formulas;
- D26 max one same-career shift/day;
- D31 seasonal negatives;
- Hard Work 50.

Model at least these strategy families:
1. survival-first cheap lodging + diversified starter work;
2. normal-lodging preference;
3. School-investment build;
4. one-career Hard Work focus;
5. diversified multi-career Hard Work;
6. poverty/street fallback;
7. mixed earned Hard Work New Start+ profile.

For each, report at minimum:
- money trajectory at Days 10 / 20 / 40 / 50 / 80 / 120 / 160;
- number of normal / cheap / street nights;
- paid School lessons affordable/completed;
- Energy lost to street;
- Hard Work completion days;
- career unlock timing where applicable;
- whether the run enters a debt spiral solely from ordinary prices;
- effect of D31 wage-readable negative targets;
- how often normal lodging is rationally chosen under current semantics.

Add separate **research comparison** scenarios for D32 Keystones:
- Reserve Match 1000;
- Work Rhythm 20;
- Retainer 25×40.

Do not assume those are already implemented in current runtime; model them as explicit overlays.

Key question:
does the current executable wage/lodging/School ratio support a viable 160-day game without requiring chronic street use or a Meta Keystone?

Produce a reproducible script + focused research tests if practical.
No production definitions/runtime edits.
No full CI.
Freeze SHA and report `READY_FOR_LEADER_PRODUCT_DECISION`.
