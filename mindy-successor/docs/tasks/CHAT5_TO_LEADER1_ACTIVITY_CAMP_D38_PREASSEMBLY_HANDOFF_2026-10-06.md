# CHAT 5 -> LEADER 1 — Activity + Camp + D38 preassembly handoff

Date: 2026-10-06
From: Chat 5
To: Leader 1

Status: **BUNDLE_COMPLETE — READY_FOR_CHAT2_ACTIVITY_ASSEMBLY_PREP**

## Exact handoff

Worker branch:

`chat5/activity-camp-d38-preassembly-v43`

v45 handoff commit:

`a5c0f71c93ef134c4091df4831e03e2487099d76`

Completion pointer commit:

`b313cb44192120c439616b99ca324d0234b71926`

Final handoff document:

`mindy-successor/docs/tasks/CHAT5_ACTIVITY_CAMP_D38_PREASSEMBLY_v45.md`

Supporting evidence:

- `mindy-successor/docs/tasks/CHAT5_ACTIVITY_CAMP_D38_LINEAGE_COLLISION_AUDIT_v43.md`
- `mindy-successor/docs/tasks/CHAT5_ACTIVITY_CAMP_D38_EXACT_HEAD_QA_v44.md`

Live main at final pre-v45 re-query:

`99e52051845ce966a769939521d01687830a3240`

The move from the earlier main checkpoint `1a3b00a...` to `99e520...` was eight worker task/pointer documentation commits only. It did not invalidate the production collision audit.

## Frozen authorities preserved

- Activity v15: `ab378d68765f7c9bbff43abf3b4b41e24df82e01`
- D38 mechanics: `3cf69d7cb3df1a58d68908159d0acc14736435c4`
- D38 content: `df9ef5c3d04cfd8eb582c24838d971854e984218`
- D38 reachability: `7ae7a9b273f1806ac04b566c318896783bab6595`
- Camp repair: `efde0a38bf71a8946194402a9fc47abb168f2aff`

## Exact lineage decision

- Activity v15 is the cumulative four-region baseline.
- D38 v16 -> v17 -> v18 is a strict cumulative chain on Activity v15.
- Camp v19 is a strict cumulative chain on Activity v15, parallel to D38.
- D38-vs-Camp authored deltas relative to Activity v15 have zero direct changed-path intersection.
- Whole historical branch/file composition is nevertheless unsafe because both lanes carry divergent stale snapshots and current main has newer shared-file authority.

Chat2 should use selective semantic assembly only, on its then-current full current-main tree.

Recommended order:

1. Activity cumulative semantic delta;
2. Camp delta;
3. D38 mechanics;
4. D38 content/presentation;
5. v18 reachability evidence;
6. current-main adjacency QA.

## Executable evidence

Camp frozen head is exact-head executable-green:

- run `37206785081`;
- job `111449513323`;
- exact checkout `efde0a38bf71a8946194402a9fc47abb168f2aff`;
- npm ci PASS;
- typecheck PASS;
- validate PASS;
- build PASS;
- focused **107/107 PASS**.

Fresh Chat5 Activity/D38 exact-head execution encountered runner infrastructure availability, not a producer failure.

The Windows attempt proved exact Activity v15 checkout + SHA guard + Node setup + successful npm ci, then was deliberately cancelled while the QA harness was being corrected. GitHub-hosted fallback jobs failed before any step existed. Final Windows run `37503918423` remained queued at handoff.

Do not mark Activity/D38 failed and do not request producer repair from that runner state. Chat2 must execute the v45 focused roster on its actual assembly tree.

## Product firewalls

Preserve:

- Activity entry = 2 Energy;
- Field Time = 6;
- Camp max 2 field nights;
- Camp never suppresses Secret Debt forced Night;
- no universal Activity XP;
- canonical D38 ending/reward identities and accepted reachability;
- D51 floor2 only for the exact Street -1 + bound-Night -1 pair;
- Strong Meta Specialist capacity remains 2.

## Producer repair disposition

**No producer repair blocker identified.**

Chat2 assembly failures, if any, must first be classified as current-main collision/save-migration/test-fixture issues before reopening frozen production.

## Leader action

No Leader merge should be performed from this Chat5 branch.

When the production queue reaches Activity + Camp + D38, hand `CHAT5_ACTIVITY_CAMP_D38_PREASSEMBLY_v45.md` to Chat2 as the selective assembly prep authority, then require Chat2 focused QA + its single full CI before any Leader merge.

**BUNDLE_COMPLETE — READY_FOR_CHAT2_ACTIVITY_ASSEMBLY_PREP**
