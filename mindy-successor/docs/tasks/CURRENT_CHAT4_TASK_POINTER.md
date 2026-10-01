# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — C4-135 CURRENT-MAIN FOREST/SCHOOL TRUTH**
Owner: Chat 4 / QA + Product Acceptance Gate

Completed:
- C4-126..130 — accepted #147/#151/#146/#156 + integration order;
- C4-131 — post-Chat1 main PASS;
- C4-132 — post-Chat2 main PASS;
- C4-133 — legacy selective-source review;
- C4-134 — starter-trio truth refresh;
- C4-136 partial — PR #164 Satyr complete runtime PASS-WITH-NOTES;
- C4-136 partial — PR #162 Forest product slice PASS-WITH-NOTES.

Lead has now completed the prerequisite merges for C4-135:
- Chat 3 v11 Forest/Poverty integration -> main commit `5893ff3fd51aba55962aa2978b7befe92a4167a7`, main CI #567 SUCCESS;
- Chat 5 v11 School integration -> main commit `d3cdb32fc8c49a57ba13f7aa140823602b395995`;
- post-School main CI #569 / id `36824459881` is the required exact-head check. If still running, wait only for this exact run to finish.

**Do C4-135 now as soon as #569 completes.**

Required C4-135 current-main truth:
1. re-query exact current main and #569;
2. verify Forest/Poverty live production promotion remains reachable and does not change mechanics;
3. verify School v11 live production text/teacher/lesson/Night-study content is reachable and locale/save invariant;
4. distinguish natural Forest/item paths already in main from still-unmerged PR #162 product-slice mechanics;
5. distinguish live School v11 content from still-unmerged Chat 5 v12 Satyr School work;
6. update executable truth without counting drafts/prep as shipped.

After C4-135:
- continue C4-136 with the next eligible frozen green Satyr presentation/School candidates;
- PR #164 and PR #162 already have PASS-WITH-NOTES and remain valid only on their frozen exact heads until Lead integrates them;
- do not implement producer fixes.

Do not self-assign beyond C4-137.
