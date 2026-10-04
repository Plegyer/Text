# CURRENT CHAT5 TASK POINTER

Status: **ACTIVE — D41 FULL-SUITE FAILURE TRIAGE v14**
Owner: Chat 5

Frozen D47 producer:
`chat5/hard-work-bonus-mapping-producer-v13@252dc26c514e24f4ab0f0cc0da7694254282e4c4`

D47 exact-head QA:
- run `37200203160`
- **SUCCESS**
- typecheck/validate/build PASS
- focused tests **103/103 PASS**

New branch:
`chat5/d41-full-suite-triage-v14`

Task:
support Chat 2 by triaging D41 current-main full CI #1180 / run `37201061717`.

Known state:
- Chat 2 head `836639de6ae9d654e168f50a8c5e1896b1347d91`;
- #1180 has 22 failures.

Classify every failure as:
A. stale pre-D41 freeze/negative expectation;
B. retired legacy presentation/identity reference;
C. real D41 integration regression.

For each failure provide:
- failing test;
- exact expected authority after D41;
- whether test or production seam should change;
- smallest safe repair;
- preserved safety purpose;
- any coupling to Forest/Hunter/Tavern/D16/Strong Meta/Palace.

Do not modify Chat 2 assembly branch.
Do not implement runtime.
Do not run full CI.

Deliver:
`mindy-successor/docs/tasks/CHAT5_D41_FULL_SUITE_TRIAGE_v14.md`

Report:
`READY_FOR_CHAT2_REPAIR`.
