# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — D40 ADVANCED ENDINGS TRANCHE B CURRENT-MAIN ASSEMBLY**
Owner: Chat 2 / sole full-CI integration lane

Strong Meta assembly:
- PR #277 merged;
- frozen assembly head `22ea03a5028d8c5c1818f802f836f67b2b640fdb`;
- merge commit `47f778500e21c738e6bf8a08b25db255b1103620`;
- focused #1154 SUCCESS;
- repair QA #1156 SUCCESS;
- full CI #1157 SUCCESS.

Exact-main post-merge CI:
- #1164 / run `37143007698`
- currently IN PROGRESS at dispatch time.

Do not consume another full CI until #1164 is SUCCESS.

## New assembly

Frozen D40 producer candidate:
`chat3/advanced-endings-tranche-b-producer-v11@4dbf89f612eb16fb8c3cd103f0a7864e0e97858e`

D40 Product authority:
16 advanced endings across Guard / Merchant / Artist-Geisha / Assassin / Prostitute.

New branch:
`chat2/assembly-d40-tranche-b-current-main-20261003-v1`

Base:
fresh current main after Strong Meta merge + docs-only coordination drift.

## Assembly strategy

Do NOT merge the old producer branch wholesale.

Reconstruct/selectively merge D40 on current main.

Preserve:
- current Strong Meta schema6/runtime;
- D23 Palace run-local sole gate;
- D31 seasonal map;
- New Start+ UI;
- D16 explicit ending commits;
- D26 same-career cadence;
- D28 0..1 Keystone + 0..2 Specialists;
- Secret Debt separation;
- all later docs-only Product locks.

## D40 exact ending scope

Guard:
- Officer
- Reform
- Network / Corruption
- Major Case

Merchant:
- Merchant House
- Speculator / Smuggler
- Patron of Routes

Artist/Geisha:
- Master Artist
- Patron Network
- Court Invitation

Assassin:
- Ghost
- Handler Takeover
- Refusal / Turncoat

Prostitute:
- Independent House
- Elite Clientele
- Network / Protection

Keep exact stable ending IDs and exact selected-route facts from the frozen D40 producer.

## Strong Meta binding

Unlike the old producer base, current main now contains the accepted Strong Meta runtime.

Therefore:
- bind D40 Specialist reward IDs into the canonical Strong Meta registry;
- keep automatic knowledge/content rewards automatic and slot-free;
- do not create a second registry or compatibility shim;
- all Specialists consume normal D28 capacity;
- no reward may create free Palace access, free slots, Energy bypass, forced-Night cancellation or extra time.

If frozen v11 documented an integration seam, resolve that seam into current Strong Meta rather than preserving it as a dead placeholder.

## Migration / save repair

Preserve the accepted D40 rule:
- selected advanced branch writes one persistent `ending-route-...-selected` fact atomically with outcome-ready;
- eligibility requires outcome-ready + exact selected route fact;
- old save repair may infer selected route only from unambiguous pre-outcome branch stages;
- ambiguous old `outcome-ready` must not be guessed.

## Focused gate

Before any full CI:
- typecheck;
- validate;
- build;
- all 16 D40 ending tests;
- selected-route coexistence/negative matrix;
- migration/idempotence;
- Guard/Merchant/Artist School readiness;
- Assassin/Prostitute natural route regressions;
- D23 Palace non-bypass;
- Strong Meta registry/capacity;
- reward ownership exactly once;
- save/reload eligibility persistence;
- D31 regressions.

Wait for exact-main #1164 to be SUCCESS.

Only when:
1. #1164 is green;
2. D40 focused gate is green;

then:
- open assembly PR;
- run one full CI;
- freeze exact head;
- report `READY_FOR_LEADER_MERGE`.

Do not merge main.
