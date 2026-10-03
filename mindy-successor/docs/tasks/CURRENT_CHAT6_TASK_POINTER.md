# CURRENT CHAT6 TASK POINTER

Status: **ACTIVE — PALACE D23 CONSUMER INTEGRATION v8 ON FROZEN CHAT4 SEAM**
Owner: Chat 6

Completed v7:
`chat6/palace-natural-10of10-acceptance-v7@c9125e7acc6639b90be36693707fde95382a8a71`

Dependency now exists on frozen Chat 4 runtime:
`chat4/hard-work-meta-shared-runtime-v1@c085eda62dd39f71d3a4c75a6c31f4c72527039a`

Create dependent branch from that exact Chat 4 head:
`chat6/palace-d23-consumer-integration-v8`

## Assignment

Wire Palace-owned logic to the existing shared D23 API without modifying Chat 4's generic semantics.

Use the actual shared predicate:
`palaceNewStartQualified({ earnedHardWork, activePackages })`

Implement/verify Palace-local consumer behavior:
- permanent 10/10 + active 10/10 at New Start+ creation -> deterministic Day-1 invitation eligibility;
- any 9/10 or inactive package -> no invitation;
- duplicates/Secret Debt/Palace cannot substitute;
- invitation arrival is exactly once and reload-safe;
- acceptance writes run-local `palace.access-granted`;
- access persists in the same run only;
- next life must qualify again;
- no random/stat/item alternative entry gate;
- no retroactive invitation on migrated old save;
- use existing v4-v7 authored invitation/reveal content and RU/EN presentation;
- preserve fixed True readiness all 12 progression stats >=91;
- cap 200 remains shared-rule output only; Palace does not multiply values.

Do not choose Prince mechanics or 3-vs-6 topology.
Do not alter shared New Start+/Meta package semantics.
Focused/static tests only, no full CI.
Freeze SHA and report `READY_FOR_CHAT2_AFTER_CHAT4`.
