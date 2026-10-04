# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — D41 FULL-CI REPAIR AFTER #1180**
Owner: Chat 2 / sole current-main assembly + full-CI lane

Assembly branch:
`chat2/assembly-d41-tranche-a-current-main-20261004-v1`

Latest checked head:
`836639de6ae9d654e168f50a8c5e1896b1347d91`

D41 producer:
`chat5/advanced-endings-tranche-a-producer-v11@56e1fcc19201f8586634262bb8746cb99d33f8e9`

Producer focused QA:
`37143638847` — **SUCCESS**

First D41 current-main full CI:
- run #1180 / `37201061717`
- result: **FAILURE**
- total failing tests: **22**

## Failure classes

A. **Stale frozen/negative contracts now contradicted by accepted D41**
Examples:
- Forest audit/result identities;
- Hunter producer-mechanics freeze comparisons;
- old Forest default aftermath expectations;
- starter-career collision guards;
- old Tavern route/ending identity assumptions.

B. **Retired legacy presentation semantic still referenced**
- dead semantic: `ending/tavern-court`.
D41 canonical retirement/migration must remain authoritative; do not resurrect the retired semantic merely to satisfy old presentation inventory.

C. **Real current-flow regressions to repair, not mask**
Examples:
- Lumber ending eligibility blocked by a current pending scene/Activity state;
- eligible ending controls remain disabled in UI;
- RC one-Save / release-candidate flows fail to reach/commit expected ending state.

## Repair rule

For every failure classify first as:
1. stale pre-D41 expectation -> update to exact D41 authority while preserving its original safety purpose; or
2. real integration regression -> repair production/runtime seam.

Do not:
- weaken D16 explicit commit;
- auto-clear legitimate pending Night/Activity scenes;
- restore retired Tavern legacy ending IDs/rewards;
- reintroduce old Palace shortcuts;
- change D23 Palace gate;
- bypass canonical Strong Meta;
- modify D31 seasonal rules;
- infer routes from generic readiness.

Priority:
1. fix real blocking-state / ending-control regressions;
2. remove/replace dead retired Tavern presentation references;
3. update stale Forest/Hunter/Tavern freeze expectations to current authoritative identities;
4. rerun focused D41 + affected one-Save/UI suites;
5. only then rerun full CI.

If the repaired exact head is fully green:
- freeze SHA;
- report `READY_FOR_LEADER_MERGE`;
- do not merge main.
