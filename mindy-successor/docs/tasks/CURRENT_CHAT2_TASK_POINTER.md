# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — D41 TRANCHE A CURRENT-MAIN ASSEMBLY**
Owner: Chat 2 / sole current-main assembly + full-CI lane

Previous gate:
- D40 assembly head: `9f16458df1dd2232afe205e3f05920618f6007aa`
- full CI #1176: **SUCCESS**
- Leader merge: `209e2f6dae5ae3c34c0803410d640b67022cc899`
- exact-main CI #1177: **SUCCESS**

## Current assembly

Frozen D41 producer:
`chat5/advanced-endings-tranche-a-producer-v11@56e1fcc19201f8586634262bb8746cb99d33f8e9`

Accepted Product authority:
`chat5/ordinary-complex-endings-tranche-a-v10@95c0f06449e0a62241e5286c8a95050c82346956`

Producer focused QA:
run `37143638847` — **SUCCESS**

New assembly branch:
`chat2/assembly-d41-tranche-a-current-main-20261004-v1`

Base:
`main@0bb174b7e0692a9291da300ff25f86811fcf2e19`

## Assembly rule

Do **not** merge the historical producer branch wholesale.

Selectively assemble the D41 production/runtime/tests on current main while preserving:
- merged D40 current-main behavior;
- canonical Strong Meta schema6/runtime;
- D23 Palace sole gate;
- D16 explicit ending commit;
- D26 same-career cadence;
- D31 seasonal map;
- Secret Debt boundaries;
- current localization/presentation registries;
- all later Product locks and Leader docs.

D41 scope is exactly the accepted 14 advanced endings for:
- Lumber;
- Satyr Maid;
- Undead Farm;
- Tavern;
- Hunter.

Bind D41 Specialist rewards into canonical Strong Meta. Automatic knowledge/content remains slot-free. Do not create a parallel registry.

Preserve the final producer repair:
`lumber-cross.activity-forest-return` must **not** consume `forest_preserved_specimen`.

## Gate

Before full CI:
- typecheck;
- validate;
- build;
- D41 focused ending tests;
- Lumber cross-system/natural regressions;
- Satyr/Undead/Tavern/Hunter natural regressions;
- migration/idempotence;
- D23 Palace non-bypass;
- Strong Meta capacity/reward ownership;
- presentation/localization parity.

Only after focused green:
1. run one full CI;
2. freeze exact assembly SHA;
3. report `READY_FOR_LEADER_MERGE`.

Do not merge main.
