# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — D40 FULL-CI SINGLE-FAILURE REPAIR**
Owner: Chat 2 / sole current-main assembly + full-CI lane

Assembly branch:
`chat2/assembly-d40-tranche-b-current-main-20261003-v1`

Latest checked head:
`537bceb9934f2bbdd90b220657a732143949f191`

D40 focused gate:
- #1167 / run `37145143038`
- **SUCCESS**

Full-CI history:
- #1168: FAILURE — initial D40 full-suite drift;
- #1169: CANCELLED by newer repair;
- #1170: FAILURE — reduced repair set;
- #1172 / run `37146771798`: **FAILURE — 1 test only**.

Exact remaining blocker on #1172:

`D40 Merchant School publisher creates literacy readiness at three sessions and persists it before and after career entry`

Assertion:
`D40 readiness may be prepared before first Merchant shift after the normal reaction/day boundary`

Observed:
- expected `true`;
- actual `false`.

All other tests in the full suite passed.

## Repair target

Repair only the Merchant D40 School-readiness timing/consumer seam needed for the accepted D40 contract.

Preserve:
- D40 exact three-session School publisher authority;
- readiness may be prepared before first Merchant shift;
- normal reaction/day-boundary semantics;
- no direct hidden mutation that bypasses normal reaction processing;
- D23 Palace boundary;
- Secret Debt boundaries;
- canonical Strong Meta runtime;
- D31 map;
- D16 explicit ending commit.

Do not weaken the test merely to hide a real publisher/timing gap.

After repair:
1. run focused Merchant/D40 checks;
2. run full CI from the exact repaired assembly head;
3. if green, freeze exact head and report `READY_FOR_LEADER_MERGE`.

Do not merge main.
