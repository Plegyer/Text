# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — ADVANCED ENDINGS TRANCHE B PRODUCER v11**
Owner: Chat 3

Accepted Product authority:
`chat3/ordinary-complex-endings-tranche-b-v10@7ed4ffbb97c1ab012a0c35a7703600623900fd28`

Leader authority:
D40 accepts the frozen packet as exact Product contract for 16 endings across Guard / Merchant / Artist-Geisha / Assassin / Prostitute.

Authority commit:
`main@0072f07b0f8188d4ff0732fb5ce557fe4f9a8434`

New branch:
`chat3/advanced-endings-tranche-b-producer-v11`

## Assignment

Produce the current-main implementation candidate for the D40 endings.

Implement:
- exact stable ending IDs;
- persistent selected-route facts;
- atomic route-selection writes;
- exact eligibility conditions;
- D16 non-terminal eligibility;
- explicit commit/completion integration;
- accepted School publisher rules;
- automatic knowledge/content reward records and consumers that fit current runtime;
- migration scaffolding that is possible on current main;
- focused tests for all 16 endings and selected-route isolation.

Do NOT invent a second strong-Meta runtime.

Frozen strong-Meta producer dependency:
`chat4/strong-meta-runtime-producer-v7@6c3865aec1283055ab0713ca4b2873d379f3ddc6`

If current main lacks the exact Specialist ownership/loadout infrastructure needed by D40:
- do not reimplement it locally;
- keep Specialist reward IDs/effects in an explicit integration seam/fixture;
- document exactly what Chat 2 must bind after strong-Meta assembly;
- automatic knowledge/content may be wired only through existing compatible mechanisms.

No full CI.

Focused minimum:
- typecheck;
- validate;
- build;
- all new D40 ending tests;
- existing Guard/Merchant/Artist/Assassin/Prostitute natural/runtime tests;
- D16 overlapping-ending preservation;
- D23 Palace non-bypass;
- D26 same-career cadence preservation;
- Secret Debt separation for ordinary Prostitute;
- save/reload selected-route persistence.

Do not merge main.
Freeze exact SHA and report:
`READY_FOR_CHAT2_ASSEMBLY`.
