# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — D41 FULL-CI REPAIR AFTER #1180**
Owner: Chat 2 / sole current-main assembly + full-CI lane

Assembly branch:
`chat2/assembly-d41-tranche-a-current-main-20261004-v1`

Latest checked production head:
`836639de6ae9d654e168f50a8c5e1896b1347d91`

D41 producer:
`chat5/advanced-endings-tranche-a-producer-v11@56e1fcc19201f8586634262bb8746cb99d33f8e9`

Producer focused QA:
`37143638847` — **SUCCESS**

First D41 current-main full CI:
- #1180 / run `37201061717`
- **FAILURE**
- 1081 total / 1059 pass / 22 fail / 0 skipped

## Authoritative triage

Chat 5 completed exact failure-by-failure triage:

`chat5/d41-full-suite-triage-v14@06fd08196d9eabdc1b4f6e3a360794cd64d1e80c`

Document:
`mindy-successor/docs/tasks/CHAT5_D41_FULL_SUITE_TRIAGE_v14.md`

Classification:
- **18 Class A** — stale pre-D41 freeze/negative/accelerator expectations;
- **4 Class B** — retired Tavern legacy identity/presentation-manifest references;
- **0 Class C** — no evidence of a D41 runtime/seam regression.

Use that triage as the repair map.

## Repair rule

Update only the exact stale tests/fixtures/manifests identified by the triage.

Do not repair #1180 by:
- removing D41 Hunter endings or Satyr Personal Network;
- restoring Tavern legacy ending IDs or old rewards;
- removing Warden Signs Forest choice;
- removing `lumber.forest.truth-known` from Tavern confirmation;
- removing `forest-specimen-catalogued` from Forest Compact;
- consuming the preserved Forest specimen;
- weakening Lumber D34 stage gates;
- allowing ending commit while a legitimate blocking scene owns interaction;
- creating Palace coupling;
- changing Secret Debt behavior;
- bypassing canonical Strong Meta.

Specific production hygiene still required:
- remove dead `ending/tavern-stay`, `ending/tavern-court`, `ending/tavern-guild` source-inventory references;
- replace with exactly one canonical source-inventory reference for Innkeeper / Information Broker / Sanctuary;
- preserve neutral Tavern imagery for Information Broker.

After repairs:
1. focused D41 + affected Forest/Hunter/Tavern/UI/one-Save suites;
2. typecheck / validate / build;
3. one full CI;
4. freeze exact green head;
5. report `READY_FOR_LEADER_MERGE`.

Do not merge main.
