# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — SECRET DEBT v12 + D51 ASSEMBLY PREFLIGHT v22**
Owner: Chat 3

Completed D51 QA:
- frozen producer: `chat3/secret-debt-activity-energy-compat-producer-v20@79a868bf30af2c162b2ea1323759dffad5e8dadf`
- exact-head QA: run `37205501396`
- typecheck / validate / build PASS
- focused **58/58 PASS**
- production tree unchanged
- disposition: `READY_FOR_CHAT2_ASSEMBLY`

Next integration after current D42 lane:
Secret Debt v12 + D51 compatibility.

New branch:
`chat3/secret-debt-d51-assembly-preflight-v22`

Current production reference:
`main@f36de067ae2e82518360dbe045f71c700e200805`
(D41 production merge; D42 is still being assembled separately by Chat 2.)

Frozen sources:
- Secret Debt v12:
  `chat4/secret-debt-full-route-producer-v12@10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`
- D51:
  `chat3/secret-debt-activity-energy-compat-producer-v20@79a868bf30af2c162b2ea1323759dffad5e8dadf`

Task:
prepare the exact selective-assembly preflight for Chat 2's next lane after D42.

Produce:
- exact production files changed by v12;
- exact production files changed by D51;
- overlap/conflict matrix between v12 and D51;
- expected overlap with current D42 Night ownership;
- files that must be selectively composed rather than wholesale copied;
- tests/fixtures that are source-specific vs current-main authoritative;
- exact focused test bundle Chat 2 should run;
- required migration/save checks;
- Night priority checks;
- D51 provenance checks;
- D44 wage/threshold non-regression;
- Activity 2-Energy availability;
- Palace / Strong Meta / ordinary-career isolation;
- expected current-main conflict hotspots.

Important:
D42 is not merged yet. Do not fabricate its future exact SHA.
Use D42 Product authority and frozen Night producer only to identify semantic ownership/conflict risk.

Research/preflight only.
Do not modify runtime.
Do not run full CI.

Deliver:
`mindy-successor/docs/tasks/CHAT3_SECRET_DEBT_D51_ASSEMBLY_PREFLIGHT_v22.md`

Report:
`READY_FOR_CHAT2_PREFLIGHT`.
