# CURRENT CHAT6 TASK POINTER

Status: **ACTIVE — PALACE DECISION / DEPENDENCY PACKET v3**
Owner: Chat 6
Preserve Palace foundation: `chat6/palace-complete-reset-v1` @ `8919a3686c1952d700c4c1377130918e0e181fa3`.
Previous packet head: `719316fa3189a0254b151a27dbf8b0b4c7fdc2d3`
New branch: `chat6/palace-decision-packet-v3`
Base: fresh current main `04d1c0afff2dbb776fde4842d1fea6041fef4061`

## Newly locked Product decisions

- In a given New Start+ life Palace eligibility exists **only if**:
  1. all ten ordinary Hard Work achievements are permanently earned; and
  2. all ten corresponding Hard Work bonus packages are actively selected for that life.
- Permanent 10/10 alone is insufficient if the player leaves any earned bonus package inactive for that run.
- When all ten are active, the player receives an **automatic Palace invitation on Day 1**; that invitation is the authored reveal/entry step and opens Palace access without another random/stat/item gate.
- Secret Debt never substitutes for any of the ten.
- Current 0..100 progression stats are the D18 percentage scale for earning the True Ending.
- Palace True Ending optional x2 is **cap-only**: it raises the cap of each of the 12 progression stats to **200**, and does not multiply current/start values, Hard Work +5 bonuses, or manual allocation points.
- three non-True Palace outcome families may remain completion-only for now; Palace does not need a `hardWork:palace` entry.
- Palace relationships may use generic role-based NPC identities; romance optional/non-required.
- shipped legacy item capabilities may be optional Palace paths but never entry gates.
- Palace may have a voluntary non-forced work-context Night choice.

Still open:
- final Prince confrontation implementation details;
- exact Palace progression topology/content IDs where prior packet only proposed options.

## Assignment

Revise the Palace packet/foundation plan around the all-ten-active per-run gate and cap 200:
- specify the generic gate contract using current-run selected Hard Work packages plus permanent meta ledger;
- show how the gate composes with Secret Debt domain lock;
- update D18 >90 eligibility semantics for a world where x2 can raise cap to 200: distinguish the *unlock-era* 0..100 percentage check from any post-x2 stat representation and identify the safest implementation;
- revise NG+ cap-200 save/UI plan with no stat-value multiplication;
- implement/design the deterministic Day-1 Palace invitation as the reveal/entry step once the all-ten-active gate is satisfied;
- preserve generic-role relationships, optional legacy items, and voluntary Night plan;
- reduce remaining Product questions to the minimum.

Do not mutate shared runtime until Leader assigns the implementation owner after this corrected packet.
No full CI.
Freeze SHA and report `READY_FOR_LEADER_DECISION`.
