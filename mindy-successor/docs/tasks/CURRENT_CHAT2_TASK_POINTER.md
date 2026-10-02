# CURRENT CHAT2 TASK POINTER

Status: **IDLE / WAITING FOR NEXT CANDIDATE**
Owner: Chat 2 / Integration + Assembly + Technical QA

Artist/Geisha package is complete and shipped.

Verified closeout:
- assembly PR #250 merged;
- merge commit / current shipped Artist main: `a3afe650a05a4a27be5953b4f3965db0a420573c`;
- exact-current-main workflow #1089 / run `37013091326`: **SUCCESS**;
- assembly exact-head workflow #1088 / run `37011925908`: **SUCCESS**, 953/953.

Do not continue Artist work unless Leader 1 identifies a concrete regression.

Current role:
- wait for the next producer candidate from Chat 3, 4, 5 or 6;
- when a candidate is frozen, re-query current main, exact head, CI and diff before QA;
- perform independent technical QA, collision/base-drift analysis and current-main assembly;
- do not merge main; hand merge-ready evidence to Leader 1.
