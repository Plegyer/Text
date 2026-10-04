# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — D41 FINAL STALE-ROSTER TEST REPAIR AFTER #1197**
Owner: Chat 2 / sole current-main assembly + full-CI lane

Assembly branch:
`chat2/assembly-d41-tranche-a-current-main-20261004-v1`

Latest exact assembly head:
`3b37b6b61e85488ccd98908db31ddbc8b7b6616e`

Latest full CI:
- #1197 / run `37204067376`
- result: **FAILURE**
- total failures: **1**

Exact remaining failure:

`tests/chat3-starter-poverty-collision-v1.test.ts`

Subtest:
`C3 starter-career collision guard accepts approved Satyr and Undead runtime contracts`

Expected Undead set omitted:
`ending.undead-farm.external-anomaly`

Actual canonical D41 Undead set is:
- `ending.undead-farm.external-anomaly`
- `ending.undead-farm.hard-work`
- `ending.undead-farm.research-farmer`
- `ending.undead-farm.successor`

Authority:
D41 Product packet explicitly defines
`ending.undead-farm.external-anomaly`
as a stable new canonical advanced ending.

## Repair target

Update only the exact Undead expected set in the starter-career collision guard.

Preserve:
- exact-set comparison;
- no loosening to generic contains checks;
- D41 External Anomaly mechanics/reward unchanged;
- Satyr expected set already aligned;
- no production mechanics change.

Then:
1. run the affected focused test;
2. run typecheck / validate / build;
3. run one full CI;
4. if green, freeze exact SHA and report `READY_FOR_LEADER_MERGE`.

Do not merge main.
