# Chat 3 — Advanced Endings Tranche B Producer v11

Status: **IMPLEMENTATION CANDIDATE / NO FULL CI**  
Owner: Chat 3  
Branch: `chat3/advanced-endings-tranche-b-producer-v11`  
Product authority: D40 / `chat3/ordinary-complex-endings-tranche-b-v10@7ed4ffbb97c1ab012a0c35a7703600623900fd28`  
Strong-Meta dependency: `chat4/strong-meta-runtime-producer-v7@6c3865aec1283055ab0713ca4b2873d379f3ddc6`

## Implemented on current main

- 16 exact D40 stable ending IDs in `content/definitions.json`;
- each advanced ending requires:
  - its career at `outcome-ready`;
  - its exact persistent `ending-route-*-selected` fact;
- existing branch choices atomically add the selected-route fact with the already-existing branch transition + `outcome-ready` fact;
- Turncoat and Refusal Chain both select `ending-route-refusal-turncoat-selected`;
- D16 remains the existing engine flow:
  eligibility -> explicit `commitEnding` -> explicit `completeEnding`;
- 9 automatic knowledge/content rewards use current compatible `metaRewards.kind=unlock`;
- 7 Specialist endings explicitly use `metaRewards: []` on this branch so current main cannot mis-grant them as ordinary unlocks;
- 7 School readiness publishers implement D40's exact rule:
  **3 paid lessons OR 3 Night Study sessions in the same track**;
- paid + Night Study do not sum;
- missing `assassin.routes.refusal-chain-ready` producer is added;
- current-runtime automatic knowledge consumers are added as bounded authored optional events;
- Court Context consumer additionally requires existing `palace.access-granted`, preserving D23;
- safe save repair restores selected-route facts only from unambiguous advanced career stages.

## Selected-route migration

Current schema remains version 5.

On load, if a career is still at a specific advanced branch stage, the parser can safely infer the selected-route fact:

- Guard: officer / reform-order / network / major-case;
- Merchant: merchant-house / speculator-smuggler / patron-of-routes;
- Artist-Geisha: master-artist / patron-network / court-invitation;
- Assassin: ghost / handler-takeover / turncoat / refusal-chain;
- Prostitute: independent-house / elite-clientele / network-protection.

If an old save is already at common `outcome-ready` and has no selected-route fact, v11 **does not guess** from route-ready facts because multiple routes can have been ready at selection time.

Chat 2 must either:
- use authoritative choice/event history if present, or
- expose an explicit one-time repair selection.

Never award multiple advanced endings from ambiguous ready facts.

## Current automatic reward records

The following are live current-main `meta.unlocks` after first committed completion:

- `unlock.guard.command-briefing`;
- `unlock.guard.reform-practice`;
- `unlock.guard.casebook-index`;
- `unlock.merchant.house-supplier`;
- `unlock.merchant.patron-destinations`;
- `unlock.artist.master-repertoire`;
- `unlock.artist.court-context`;
- `unlock.assassin.refusal-protocol`;
- `unlock.prostitute.elite-protocol`.

Consumers are deliberately bounded and knowledge/content-only.

No current consumer:
- grants raw stats;
- grants daily Energy;
- grants passive money;
- grants Palace access;
- suppresses Secret Debt Night;
- changes ordinary Hard Work.

## Specialist integration seam

Current main's `MetaReward` schema supports only:
- `unlock`;
- `hardWork`.

The frozen Chat 4 strong-Meta runtime owns Specialist ownership/selection and keeps capacity at exactly 2.

Therefore v11 does **not** recreate strong-Meta.

Exact integration fixture:

`content/d40-tranche-b-strong-meta-seam.fixture.json`

It contains seven D40 Specialists:

1. `specialist.guard.institutional-favors`;
2. `specialist.merchant.risk-ledger`;
3. `specialist.artist.salon-introductions`;
4. `specialist.assassin.ghost-routes`;
5. `specialist.assassin.contract-ledger`;
6. `specialist.prostitute.housebook`;
7. `specialist.prostitute.mutual-aid-roster`.

### Chat 2 binding after strong-Meta assembly

Chat 2 must:

1. extend the assembled strong-Meta registry with these exact seven IDs;
2. add the D40 Specialist effect schemas from the fixture;
3. preserve Specialist capacity = 2;
4. on first completion of the source ending, grant strong-Meta ownership;
5. do not mirror the Specialist as ordinary `meta.unlock`;
6. snapshot selected Specialists at New Start+ creation using the assembled strong-Meta flow;
7. preserve in-progress run selection if the registry later changes;
8. keep Palace cap-200 in the same two-Specialist capacity;
9. keep D30 Keystones in the separate one-Keystone capacity.

Until that assembly binding exists, the seven current D40 Specialist endings correctly record:
- committed/completed ending;
- first-completion state;
- **no fake current-main strong reward**.

## Focused tests added

`tests/d40-advanced-endings-tranche-b-v11.test.ts`

Coverage:

- all 16 exact ending IDs;
- exact route-selected isolation;
- route-ready alone is insufficient;
- overlapping eligibility remains non-terminal until explicit D16 commit;
- automatic unlock reward exactly once;
- Specialist no-fake-unlock behavior;
- all 17 branch choice selected-route writes;
- all 7 School publishers at 3 paid OR 3 Night Study;
- 2 paid + 1 Night does not satisfy;
- Refusal Chain producer;
- exact 7-Specialist seam;
- Court Context cannot bypass D23;
- ordinary Prostitute remains separate from Secret Debt forced-route semantics;
- unambiguous save migration;
- ambiguous outcome-ready save is not guessed;
- selected-route save/reload persistence.

## Static machine audit performed through the GitHub connector

Verified on branch content:

- D40 endings: **16**;
- automatic rewards: **9**;
- Specialist seam entries: **7**;
- School publishers: **7**;
- automatic consumer events: **12** (Master Repertoire is one per season);
- selected-route branch writes: **17**;
- Refusal Chain producer: present.

No full CI was initiated.

Disposition after focused runner/assembly verification: **READY_FOR_CHAT2_ASSEMBLY**.
