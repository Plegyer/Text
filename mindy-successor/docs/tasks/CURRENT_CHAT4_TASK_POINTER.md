# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — HARD WORK NEXT-LIFE META PACKET v2**
Owner: Chat 4
Previous packet head: `a73c6ad3fd87e96fad79898fbe65c9b2abf5ebd0`
New branch: `chat4/hard-work-next-life-meta-packet-v2`
Base: fresh current main `04d1c0afff2dbb776fde4842d1fea6041fef4061`

## New Product authority

Read D21-D24.

Revise the packet to the locked model:
- first five ordinary professions (Lumber, Satyr Maid, Undead Farm, Tavern, Hunter): exactly one +5 stat bonus each;
- later five (Guard, Merchant, Artist/Geisha, Assassin, Prostitute): up to two separate +5 stat bonuses each; prepare a concrete two-stat proposal for each;
- New Start+ may activate any subset of earned profession bonus packages, including none or all ten;
- no single-slot restriction for these profession packages;
- include at least one Lust Hard Work bonus in the mapping; **a Lust bonus must be at least +3 Lust in magnitude**. This is not a requirement that three professions contain Lust. Exact profession placement remains for Product/Leader approval;
- remove/replace the old automatic +3/+3 and Merchant +600 model in the eventual implementation plan;
- Palace eligibility in a life requires all ten ordinary Hard Work achievements earned **and all ten bonus packages active for that life**; when satisfied, an automatic Palace invitation arrives on Day 1 and opens access;
- Palace x2 is **cap-only**: when active, the 12 progression-stat caps are 200 instead of 100. It never multiplies current/start values, +5 bonuses, or the 10 allocation points.

## Deliverable

Produce a revised concrete profession-bonus mapping proposal satisfying the above, including the locked Lust >= +3 magnitude rule, plus:
- generic save/setup representation for arbitrary subset activation;
- exact current-runtime touchpoints;
- migration from old automatic rewards;
- Palace all-ten-active gate integration;
- tests for none/some/all selections;
- explicit collision ordering with Secret Debt domain lock and the Palace all-ten-active -> Day-1 invitation gate.

Do not implement shared runtime yet.
No full CI.
Freeze SHA and report `READY_FOR_LEADER_DECISION`.
