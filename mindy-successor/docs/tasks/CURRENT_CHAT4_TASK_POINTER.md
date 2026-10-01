# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — C4-131 POST-MERGE MAIN GATE**
Owner: Chat 4 / QA + Product Acceptance Gate

Current queue:
- `TASK_CHAT4_QA_QUEUE_v13.md`
- C4-126..137

Completed:
- C4-126 — PR #147: PASS-WITH-NOTES
- C4-127 — PR #151: PASS-WITH-NOTES
- C4-128 — PR #146: PASS-WITH-NOTES
- C4-129 — PR #156: PASS-WITH-NOTES
- C4-130 — integration order/collision review recorded in Git

Lead has now merged the first accepted integration:
- integration PR #160
- new main: `522dbc08b51e23ba33753ad8fa79497896bb078d`

**Do C4-131 now.**

Required C4-131:
1. re-query exact current main and latest main CI;
2. run/review the product-critical acceptance assertions affected by Chat 1 v9:
   - Satyr Maid first + second real shift;
   - Undead Farm first + second real shift;
   - natural 50-shift Hard Work reachability for both;
   - strict generic wrong-stage typed transition still rejects invalid repeat;
   - seven late-career stat/calendar unlocks;
   - all-ten ordinary Hard Work endings / Meta exactly once;
   - derived Palace 10/10 predicate;
3. record exact main SHA + exact CI/run evidence;
4. if PASS, immediately continue to C4-132 after Lead integrates the next candidate; if the next merge has not happened yet, record C4-131 and wait only on that concrete merge.

Do not implement production fixes.
Do not reuse QA evidence from pre-merge heads as substitute for current-main verification.

After C4-131, continue automatically through C4-132..137 as their prerequisites become true.
