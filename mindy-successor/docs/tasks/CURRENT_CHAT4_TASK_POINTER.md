# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — C4-135 + NEXT-WAVE GATES**
Owner: Chat 4 / QA + Product Acceptance Gate

Current main:
- `a44d0f765fffd9f8b74307d116bf5f15e7688590`
- main CI #591 / id `36825365041`: **SUCCESS**
- includes:
  - Forest/Poverty v11 integration;
  - School v11 integration;
  - Satyr Maid complete career runtime;
  - Forest first product slice.

Completed:
- C4-126..130;
- C4-131 post-Chat1 PASS;
- C4-132 post-Chat2 PASS;
- C4-133 legacy selective-source review;
- C4-134 starter-trio truth refresh;
- C4-136 gate PR #164 PASS-WITH-NOTES;
- C4-136 gate PR #162 PASS-WITH-NOTES.

## Do now

### C4-135 — current-main Forest/School/Satyr truth
Run this on exact current main `a44d0f765fffd9f8b74307d116bf5f15e7688590`.

Verify:
- Forest/Poverty v11 remains reachable;
- School v11 remains reachable and locale/save invariant;
- Satyr complete-career runtime is actually shipped on main;
- Forest v12 natural item acquisition, 3 routes/challenge families, seasonal topology, extraction -> Lumber and save/resume are actually shipped on main;
- do not count unmerged presentation/School-v12/authored-depth work as shipped.

Record exact main SHA and CI #591.

### Then continue C4-136 immediately

Next eligible frozen green candidate:
1. PR #174 — Chat 2 Satyr complete-career presentation
   - frozen exact head `56ca78ccb0210225136aeca1c68978296ba7d61d`
   - CI #582 SUCCESS, 616/616
   - gate presentation reachability, static fallbacks, animation-off/missing-GIF safety, RU/EN/accessibility, no gameplay drift.

Then gate PR #172 only after Chat 5 explicitly freezes its current clean head with C5-132 and exact-head green CI.

Do not QA:
- PR #178 while its current head is red;
- PR #175 until its latest exact-head CI is green/frozen.

If one candidate is blocked, continue to the next eligible frozen green candidate.
Do not implement producer fixes.
