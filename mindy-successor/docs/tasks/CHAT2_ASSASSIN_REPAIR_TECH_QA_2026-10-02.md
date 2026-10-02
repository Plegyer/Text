# Chat 2 — Assassin Repair Technical QA / Current-Main Assembly

Status: **STATIC RE-GATE PASS / ASSEMBLY CI PENDING**
Date: 2026-10-02
Owner: Chat 2 / Integration + Assembly + Technical QA

## Exact authority

Repaired producer PR #252:
- frozen repaired head: `e81053b203655486896b7926f4aeb07d1871a49d`
- old frozen head tested by failed assembly #255: `0976b4fefdc4d6b379243cc0f3d3429e0e1a3642`
- producer branch was not rebased or otherwise moved by Chat 2.

Fresh assembly base:
- current main: `0f232f40157a56166403e31d259d88776b9b6d90`

Pointer baseline `fe59b931c8f432c8aa6b66c4fc1a699195616065` -> current main `0f232f40157a56166403e31d259d88776b9b6d90` changes only current task-pointer coordination files.
Previous assembly base `04d1c0afff2dbb776fde4842d1fea6041fef4061` -> current main changes only `USER_DECISIONS_LOCKED_v1.md` plus current task-pointer coordination files.
No intervening production drift exists.

## Historical QA defect

Previous assembly #255 / workflow #1110 on exact head `c51d37e2a9d30cd7fc94bf9154203ca4ceefc2f8`:
- validator/build succeeded: 81 packs / 327 events / 39 actions / 22 endings;
- tests: 981 total / 980 pass / 1 fail;
- only failure: natural Assassin contract remained at `intel` instead of closing by the ordinary 50-shift Hard Work path.

Root cause was deterministic routing starvation:
- transition `offered -> intel` made both Toolset and prep eligible;
- Toolset priority 87 beat prep priority 85 for the single live blocking slot;
- prep listened only to the consumed `questTransition`;
- the quest therefore stalled at `intel`.

## Repaired producer delta

Compared with the old frozen producer head, repaired `e81053b203655486896b7926f4aeb07d1871a49d` changes exactly three Assassin-owned files:
- `content/packs/assassin-contract.json`: +4 lines;
- `tests/assassin-natural-acceptance.test.ts`: focused collision/reachability regression;
- `tests/assassin-runtime-invariants.test.ts`: focused no-threshold/priority invariant.

Production repair is narrow:
- `assassin.contract.prep` still listens to `questTransition assassin.contract`;
- it now also listens to `actionCompleted: assassin.shift`;
- condition remains persisted `questStage: assassin.contract = intel`;
- prep priority remains 85;
- Concealed Toolset priority remains 87, so the item still wins the original transition collision;
- prep contains no `careerCounter` or `completed_shifts` threshold;
- Hard Work remains exactly 50 shifts;
- no resolver/engine, School, Activity, refusal authority, ending authority, item semantics, or other-profession runtime changed.

Focused producer regression explicitly proves:
1. Toolset still wins the intel collision;
2. consumed transition is not assumed to remain live;
3. next ordinary Assassin shift reopens prep from persisted intel stage;
4. contract closes;
5. natural path still reaches exact Hard Work authority.

## Current-main collision preservation

PR #252 still changes 17 files.

Shared files with shipped Prostitute remain:
- `content/definitions.json`
- `content/localization.json`
- `src/core/schema.ts`

The repaired producer does not modify any of these relative to the previously reviewed frozen head.
Therefore this fresh assembly reuses the already statically verified collision-safe shared blobs from assembly #255:
- Assassin vs Prostitute definitions semantic-ID intersection: 0;
- Assassin vs Prostitute localization key intersection: 0;
- schema merge is additive union of four Assassin + four Prostitute item IDs;
- shipped Artist + Prostitute production stays intact.

All other **14** producer files are exact Git blobs from repaired frozen head `e81053b203655486896b7926f4aeb07d1871a49d`.

## Gate

This branch is current main + repaired Assassin exact non-shared blobs + previously verified shared collision merges + this evidence file.
Next step: exactly one full CI run on the fresh assembly PR.
If green, freeze exact assembly SHA and report `READY_FOR_LEADER_MERGE`.
Chat 2 does not merge main.
