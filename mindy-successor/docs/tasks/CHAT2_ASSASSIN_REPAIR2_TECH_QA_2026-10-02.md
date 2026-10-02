# Chat 2 — Assassin Repair #2 Technical QA / Current-Main Assembly

Status: **STATIC RE-GATE PASS / ASSEMBLY CI PENDING**
Date: 2026-10-02
Owner: Chat 2 / Integration + Assembly + Technical QA

## Exact authority
- producer PR #252
- frozen repaired head: `000d00faeb04f9b54ea60b7891f16e6d7d644c5a`
- previous repaired head tested by #1111: `e81053b203655486896b7926f4aeb07d1871a49d`
- fresh assembly base/current main: `f957e4901fd6d52594316f71117b1fc164e1b67c`
- producer branch was not moved by Chat 2.

## Historical evidence
Assembly #257 / workflow #1111:
- 982 tests / 981 pass / 1 fail
- #1110 contract-close defect confirmed fixed
- only remaining failure was missing Assassin-local `refusal-chain-evidence`.

The routing cause was `turncoat-ready` priority 73 winning the ordinary-shift boundary before `refusal-evidence` priority 71, then `choose-practice` moving the career out of `trusted-blade`.

## Producer repair #2
Compared with the #1111 producer head, the frozen repaired head changes exactly two Assassin-owned files:
- `content/packs/assassin-routes.json`: +5 lines
- `tests/assassin-boundaries.test.ts`: focused ordering/retrigger invariant.

Production repair:
- preserves `turncoat-ready` priority 73
- preserves `refusal-evidence` priority 71
- preserves `choose-practice` priority 58
- adds only `careerFactAdded: assassin / turncoat-ready` as an additional trigger for `assassin.routes.refusal-evidence`
- keeps exact `trusted-blade` condition
- adds no `careerCounter` or `completed_shifts` threshold
- adds no `refusal-chain-ready` producer
- adds no advanced ending ID/reward and no shared resolver behavior.

Intended natural order:
`turncoat-ready (73) -> refusal-evidence (71) -> choose-practice (58)`.

## Current-main preservation
From previous Assassin production base `04d1c0afff2dbb776fde4842d1fea6041fef4061` through current main `f957e4901fd6d52594316f71117b1fc164e1b67c`, intervening drift is documentation/reference/task-pointer only. No production file changed.

PR #252 changes 17 files:
- 14 non-shared files use exact blobs from frozen repaired producer head
- three shared files reuse the already verified Assassin+Prostitute collision-safe merges:
  - definitions `33506bc6f035a65051c1b7a453daf1116403d567`
  - localization `1257d6bb6b5e1033de2c571103b08d0f19ad4e25`
  - schema `da2f2be43e7abde0e4d094cb136487e82b018a98`

Repairs #1/#2 did not modify these three shared deltas.

## Scope boundaries
- Hard Work remains 50 completed shifts / `hardWork:assassin`
- Product-open `refusal-chain-ready` remains unproduced
- no advanced public Assassin ending/reward
- no Morality/crime/black-market/global network/Palace/Secret Debt ownership
- shipped Artist + Prostitute production preserved
- no Save schema, RNG, Meta, NightFlow or engine changes.

## Gate
Assembly = fresh current main + 14 exact repaired producer blobs + verified shared merges + this QA evidence.
Next step: exactly one full CI run.
If green, freeze exact assembly SHA and report `READY_FOR_LEADER_MERGE`.
Chat 2 does not merge main.
