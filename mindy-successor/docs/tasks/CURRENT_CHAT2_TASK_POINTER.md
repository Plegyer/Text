# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — PALACE D23 CONSUMER QA + D31 CURRENT-MAIN PREFLIGHT**
Owner: Chat 2 / sole full-CI integration lane

## Priority A — Palace D23 consumer

### #1133 diagnosis — TEST-ONLY REPAIR REQUIRED

Focused workflow #1133 completed FAILURE on QA head:
`0ea782b4439167350add1ec6cef798d6d92aa124`.

The only failure class:
- 12 × TypeScript `TS7006` implicit-any errors in
  `tests/palace-d23-consumer-integration-v8.test.ts`,
  around lines 187–219;
- affected callback parameters: `event`, `condition`, `variant`, `choice`, `effect`.

Everything else passed:
- validate: 82 packs / 329 events / 39 actions / 22 endings;
- build PASS;
- Palace consumer: 12/12;
- shared D21-D24: 35/35;
- creation/migration: 16/16;
- New Start+ UI: 43/43;
- School D20: 21/21;
- seasonal + Assassin + Prostitute: 51/51.

Therefore:
1. repair **only test typing/helpers**;
2. no production/content/runtime semantic changes;
3. run typecheck locally/focused first;
4. after local green, push one new QA head;
5. allow one focused rerun;
6. no rerun unchanged head.


Current focused QA PR:
#268 `Chat 2 QA: focused Palace D23 consumer integration`

QA branch:
`chat2/qa-palace-d23-consumer-20261003-v1`

Exact feature candidate parent:
`ef6eec1cbac89e2e7cc30392f6058222d2022b78`

QA head:
`0ea782b4439167350add1ec6cef798d6d92aa124`

Frozen producer authority:
`9dfaab2a7b9e145c9753c0acd8e54d3f903be5fd`

Focused workflow #1133 is currently queued. Do not mutate production merely to provoke the runner.

Critical preservation:
- do **not** copy frozen producer `engine.ts` wholesale;
- current-main removal of `ensurePalaceUnlock(s.meta)` must survive;
- legitimate engine delta is only import + one `markPalaceCreationQualification(s)` hook after creation/package freeze;
- no permanent `meta.unlocks['palace']`;
- D23 remains permanent ordinary 10/10 + active 10/10 -> deterministic Day-1 invitation.

If #1133 succeeds:
1. close QA PR #268 unmerged;
2. publish exact production candidate without QA workflow files to a fresh assembly branch;
3. open real current-main assembly PR;
4. run exactly one full CI on that exact assembly head;
5. freeze SHA and report `READY_FOR_LEADER_MERGE`.

If #1133 fails:
- mine the complete failure set;
- distinguish test/fixture drift from product defect;
- no rerun unchanged head.

## Priority B — while #1133 is queued: D31 integration preflight

Use a separate docs-only branch:
`chat2/preflight-d31-current-main-20261003-v1`.

Frozen D31 producer:
`chat3/seasonal-negative-target-map-implementation-v6@79ff36c66947a1f1273ab0bde7a3c7f1b797a2a7`.

Prepare a current-main reconstruction ledger only:
- exact producer dependency base;
- exact `definitions.json` semantic delta;
- exact affected seasonal regression delta;
- verify current main has no unrelated target-map change;
- identify collisions introduced by New Start+ UI / Palace consumer / D35 docs;
- prove D31 remains content-only target replacement;
- list focused suites needed after reconstruction.

Do not put D31 production changes on main or consume full CI before Palace D23 merge + exact-main green.

## Queued integration order after Palace

1. D31 seasonal target map `79ff36c...`;
2. accepted strong-Meta runtime candidate after Leader technical acceptance of Chat 4 v7;
3. later Palace rich-six production slices after their producer freezes.

Chat 2 remains the only worker allowed full CI.
Do not merge main.
