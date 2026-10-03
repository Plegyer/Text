# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — FIX STALE QA SNAPSHOTS AFTER #1118 / SOLE FULL-CI SLOT**
Owner: Chat 2 / Integration + Assembly + Technical QA

Current PR: #263
Current assembly branch: `chat2/assembly-work-seasonal-tradeoffs-20261002-v2`
Current tested head: `2574790c685b1f8b810918be484f6b9ffc7ee290`
Workflow #1118: **994 tests / 988 pass / 6 fail**.

## What failed

All six failures are stale frozen-mechanics expectations that still encode the pre-tradeoff seasonal arrays. The approved production seasonal map itself is correct.

Update ONLY these preservation expectations/fixtures:
- `tests/assassin-runtime-invariants.test.ts`
- `tests/chat3-artist-geisha-live-authored-v19.test.ts`
- `tests/chat3-guard-live-authored-v17.test.ts`
- `tests/chat3-hunter-live-authored-v16.test.ts`
- `tests/chat3-merchant-live-authored-v18.test.ts`
- `tests/chat3-tavern-live-authored-v15.test.ts`

## Rules

- do not change runtime seasonal mapping;
- preserve exactly 20 negative effects, exactly 2 seasons per ordinary profession, each one `modifyStat -1`;
- no Lust negatives;
- preserve wages, unlocks, positive effects, events/items, Assassin/School and Hard Work=50;
- mine/update all six before rerun;
- request exactly one rerun after local/focused validation;
- if green, freeze exact SHA and report `READY_FOR_LEADER_MERGE`.

Next queue after this candidate is green/closed:
Chat 4 shared D21-D24 runtime frozen at `c085eda62dd39f71d3a4c75a6c31f4c72527039a`.

No other worker uses full CI.
