# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — ASSASSIN REPAIR CURRENT-MAIN ASSEMBLY / SOLE FULL-CI SLOT**
Owner: Chat 2 / Integration + Assembly + Technical QA

## New producer authority

Repaired Assassin producer PR #252
Frozen repaired head: `e81053b203655486896b7926f4aeb07d1871a49d`

The previous assembly #255 / workflow #1110 proved one real lifecycle defect and is now historical QA evidence. The producer has repaired exactly that defect without a new shift threshold.

## Assignment now

1. build a fresh assembly branch from current main `fe59b931c8f432c8aa6b66c4fc1a699195616065` (do not mutate producer branch);
2. selectively apply/review the repaired Assassin delta;
3. preserve shipped Artist + Prostitute and current coordination authority;
4. open/update one Chat 2 assembly PR;
5. consume the **single full-CI slot** once;
6. if failure occurs, mine all failures before any rerun;
7. if green, freeze exact assembly SHA and report `READY_FOR_LEADER_MERGE`.

After Assassin is accepted, next candidate is School PR #254 frozen at `877927cf747ba9f69a53ddccf4373b795561f3a0`.

No other worker uses full CI.
