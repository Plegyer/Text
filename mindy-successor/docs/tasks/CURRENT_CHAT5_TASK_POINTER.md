# CURRENT CHAT5 TASK POINTER

Status: **ACTIVE — ADVANCED ENDINGS TRANCHE A PRODUCER v11**
Owner: Chat 5

Accepted Product authority:
`chat5/ordinary-complex-endings-tranche-a-v10@95c0f06449e0a62241e5286c8a95050c82346956`

Leader authority:
D41 accepts the frozen packet as exact Product contract for 14 endings across Lumber / Satyr Maid / Undead Farm / Tavern / Hunter.

Authority commit:
`main@0072f07b0f8188d4ff0732fb5ce557fe4f9a8434`

New branch:
`chat5/advanced-endings-tranche-a-producer-v11`

## Assignment

Produce the current-main implementation candidate for D41.

Implement:
- exact stable ending IDs;
- exact stage/shift gates;
- exact route facts/counters;
- mandatory/optional School/Night/Activity/item requirements;
- D16 non-terminal eligibility + explicit commit;
- legacy Tavern ID retirement/migration rules where feasible;
- current executable ending migrations where explicitly accepted;
- automatic knowledge/content reward consumers compatible with current runtime;
- focused tests for all 14 endings.

Frozen strong-Meta producer dependency:
`chat4/strong-meta-runtime-producer-v7@6c3865aec1283055ab0713ca4b2873d379f3ddc6`

Do NOT invent duplicate Specialist infrastructure.
If current main lacks the accepted strong-Meta runtime:
- keep Specialist reward IDs/effects as explicit integration seam/fixture;
- document exact later binding for Chat 2;
- do not silently weaken or replace the D41 reward.

Preserve:
- D33/D34 Lumber authority;
- Hard Work 50 separate;
- Satyr consent/boundary semantics;
- no old Tavern Palace shortcut;
- D38 standalone Activity endings remain distinct from Hunter;
- D23 Palace entry sole gate;
- D26 same-career cadence;
- Secret Debt forced-Night separation.

No full CI.

Focused minimum:
- typecheck;
- validate;
- build;
- all 14 ending tests;
- Lumber D33/D34 tests;
- Satyr/Undead/Tavern/Hunter natural tests;
- explicit commit/overlap behavior;
- legacy migration idempotence;
- Palace non-bypass;
- save/reload eligibility persistence.

Freeze exact SHA and report:
`READY_FOR_CHAT2_ASSEMBLY`.
