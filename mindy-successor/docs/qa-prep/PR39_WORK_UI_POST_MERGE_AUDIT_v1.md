# PR39 Work UI Post-Merge Audit v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
PR: #39 — Lead: expose all ten target careers in Work UI

## Git evidence

PR39 head:
caf0cfdc2c7ae09a2f86c751a2335d93559cd774

Merge SHA:
f880915a8103287f5fd2fff2c537baffeeec7140

Merged:
YES

Exact-head CI:
- run 36313287405
- 287 tests
- 287 pass
- 0 fail
- validation: 16 packs, 43 events, 35 actions, 9 endings

Post-merge main CI:
- run 36316370458
- 287 tests
- 287 pass
- 0 fail
- validation: 16 packs, 43 events, 35 actions, 9 endings

Disposition:
POST_MERGE_GREEN.

## Scope

PR39 changed only:
- src/ui/app.ts
- tests/ui.test.ts

No engine/schema/content-definition file changed.

PASS.

## Work panel target list

Current Work UI professions list contains exactly:

- lumber.shift
- satyr-maid.shift
- undead-farm.shift
- tavern.shift
- hunter.shift
- guard.shift
- merchant.shift
- artist-geisha.shift
- assassin.shift
- prostitute.shift

Count:
10.

PASS.

## Legacy Work buttons removed from Work panel

UI regression explicitly rejects these legacy IDs from the Work target list:

- tavern
- hunt
- guard

Current Work panel uses:
- tavern.shift
- hunter.shift
- guard.shift

instead.

PASS.

## No career mechanics changed

Because the PR changes only app.ts and ui.test.ts:
- target action costs unchanged;
- target wages unchanged at PR39 boundary;
- target typed counters unchanged;
- target career stages unchanged;
- seasonal effects unchanged;
- Hard Work rules unchanged.

PASS.

## Important post-PR39 follow-up

At the PR39 merge boundary, target lumber.shift was visible in Work UI but still lacked a wage.

That was not caused by PR39 UI mechanics.

PR40 later restored the Lumber target wage and merged separately.

Therefore:
- PR39 UI exposure is green;
- wage parity belongs to PR40 evidence.

## Current main note

Main has advanced beyond PR39:
- PR40 merged after PR39;
- current Work UI still exposes the same ten target shift IDs.

## Final audit

- exact-head CI: 287/287 PASS
- post-merge CI: 287/287 PASS
- exactly ten target shift IDs: PASS
- legacy tavern/hunt/guard used as Work buttons: NO
- career mechanics changed by PR39: NO
- UI-only scope: PASS

No production runtime/content mechanics file was modified by Chat 4.
