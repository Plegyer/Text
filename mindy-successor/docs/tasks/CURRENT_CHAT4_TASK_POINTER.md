# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — NIGHT CONTENT GAP PRODUCER v10**
Owner: Chat 4

Accepted implementation authority:
`chat4/night-content-gap-blueprint-v9@1c52123c3e05b5d2ba2bfcf6f6b12e3291fd11e7`

Leader authority:
D42 accepts all 12 stable Night surface contracts.

Authority commit:
`main@0072f07b0f8188d4ff0732fb5ce557fe4f9a8434`

New branch:
`chat4/night-content-gap-producer-v10`

## Assignment

Implement all 12 D42 Night surfaces on fresh current main.

Required:
- exact stable IDs from v9;
- exact housing conditions;
- exactly three D35 private-space branches with `housingTier=normal`;
- relationship/career facts and counters exactly as accepted;
- refusal/back-out semantics;
- no hidden progression gate;
- presentation/localization bindings;
- save/reload safety;
- exactly-one calendar advance through shared NightFlow.

Preserve:
- cheap keeps School Night Study and public/workplace Night;
- no forced romance;
- confidence/Lust/Sexuality never imply consent;
- ordinary Prostitute never inherits Secret Debt forced semantics;
- Secret Debt forced Night suppresses voluntary/private-space Night;
- no broad affinity system.

If a relationship stage/counter referenced by the accepted blueprint is missing on current main:
- add only the minimal typed state/content extension needed for that exact surface;
- do not redesign the relationship system.

No full CI.

Focused minimum:
- typecheck;
- validate;
- build;
- all 12 new Night surfaces;
- D35 exact normal-only count = 3;
- cheap/street rejection for private branches;
- School Night Study preservation;
- reload at pending Night boundary;
- one calendar advance;
- existing Night regression suite.

Freeze exact SHA and report:
`READY_FOR_CHAT2_ASSEMBLY`.
