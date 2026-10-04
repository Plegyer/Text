# CHAT2 CONTEXT RECOVERY — D41 Current-Main Assembly Repair

Status: **NEW CHAT RECOVERY / CONTINUE EXISTING ASSEMBLY**
Owner: Chat 2

The previous Chat 2 conversation is no longer reliable because the UI stream repeatedly failed.

Do not restart D41 from scratch.

Existing assembly branch:
`chat2/assembly-d41-tranche-a-current-main-20261004-v1`

Current branch head includes Leader coordination only:
`8dd70d4da08beb526a1538f0e67959917872f65e`

Last Chat-2-authored production head:
`836639de6ae9d654e168f50a8c5e1896b1347d91`

Frozen D41 producer:
`chat5/advanced-endings-tranche-a-producer-v11@56e1fcc19201f8586634262bb8746cb99d33f8e9`

Accepted Product authority:
`chat5/ordinary-complex-endings-tranche-a-v10@95c0f06449e0a62241e5286c8a95050c82346956`

Producer focused QA:
run `37143638847` — SUCCESS.

## Current CI state

Full CI #1180 / run `37201061717`:
- 1081 total;
- 1059 pass;
- 22 fail.

Full CI #1184 / run `37202702469`:
- repeated the exact same 22 failures;
- this run happened after Leader pointer/triage synchronization only;
- no D41 production repair had been committed between #1180 and #1184.

Therefore #1184 is not new evidence. Treat it as a duplicate failure run on unchanged production behavior.

## Authoritative failure triage

Read:
`mindy-successor/docs/tasks/CHAT5_D41_FULL_SUITE_TRIAGE_v14.md`

Frozen triage:
`chat5/d41-full-suite-triage-v14@06fd08196d9eabdc1b4f6e3a360794cd64d1e80c`

Classification:
- 18 Class A — stale pre-D41 freeze/negative/accelerator expectations;
- 4 Class B — retired Tavern legacy identity/presentation-manifest references;
- 0 Class C — no D41 runtime/seam regression identified.

Use the failure-by-failure triage as the repair checklist.

## Repair mission

Repair only stale tests/fixtures/manifests identified by the triage.

Important live hygiene:
- remove dead source-inventory semantics:
  - `ending/tavern-stay`;
  - `ending/tavern-court`;
  - `ending/tavern-guild`;
- replace them with canonical:
  - `ending/tavern.innkeeper`;
  - `ending/tavern.information-broker`;
  - `ending/tavern.sanctuary`;
- preserve neutral Tavern imagery for Information Broker.

Do not:
- remove D41 Hunter endings;
- remove Satyr Personal Network;
- restore legacy Tavern endings/rewards;
- remove Warden Signs Forest choice;
- remove `lumber.forest.truth-known` from Tavern confirmation;
- remove `forest-specimen-catalogued` from Forest Compact;
- consume the preserved specimen;
- weaken Lumber D34 stages;
- allow ending commit while a legitimate blocking scene owns interaction;
- create Palace coupling;
- change Secret Debt;
- bypass canonical Strong Meta.

## Gate

After repair commits:
1. run focused D41 + affected Forest/Hunter/Tavern/UI/one-Save suites;
2. typecheck;
3. validate;
4. build;
5. run one full CI;
6. if green, freeze exact SHA and report `READY_FOR_LEADER_MERGE`.

Do not merge main.
