# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — CHAT4 D21-D24 SHARED META CURRENT-MAIN ASSEMBLY PREP / SOLE FULL-CI SLOT**
Owner: Chat 2 / Integration + Assembly + Technical QA

Seasonal tradeoffs:
- PR #263 merged;
- merge commit `27f74e230f5e0e52e4120c8b97c99d250b869038`;
- assembly CI #1119 SUCCESS;
- exact-main CI #1120 is the current code gate. Do not consume another full CI until #1120 is green.

## Next candidate

Producer/foundation:
`chat4/hard-work-meta-shared-runtime-v1@c085eda62dd39f71d3a4c75a6c31f4c72527039a`

This branch is historically divergent. **Do not merge/rebase the whole branch into main.**

## Assignment now

While #1120 runs:
1. audit the exact candidate semantic delta against fresh current main;
2. inventory current-main collisions in `engine.ts`, `schema.ts` and legacy Meta/migration tests;
3. create a fresh `chat2/assembly-hard-work-meta-shared-*` branch from current main when safe;
4. selectively reconstruct only locked D21-D24 semantics:
   - permanent Hard Work early-access for the exact profession;
   - arbitrary subset of earned Hard Work packages active on New Start+;
   - centralized package catalog;
   - exactly-once application at creation completion;
   - active package selection frozen for that life;
   - old automatic +3/+3 and Merchant +600 retired for new lives, migration-safe;
   - Secret Debt ordinary-career domain lock outranks inherited early access;
   - shared permanent-10/10 + active-10/10 Palace qualification predicate;
   - progression-stat cap 100/200 where 200 changes only the maximum;
   - Lust unaffected by the 200 cap;
   - no retroactive Palace invitation on migrated saves.
5. preserve seasonal-tradeoff code just merged, Assassin, Prostitute, School D20 and all current-main docs/runtime;
6. run focused/static checks before CI.

After #1120 SUCCESS, open one assembly PR and consume the sole full-CI slot once.
Mine all failures before any rerun.
If green, freeze exact SHA and report `READY_FOR_LEADER_MERGE`.

Queued after this:
1. Chat 4 New Start+ UI `837156277f7329f0187b04442acb8d5258a2e189`;
2. Chat 6 Palace D23 consumer `9dfaab2a7b9e145c9753c0acd8e54d3f903be5fd`.

No other worker uses full CI.
