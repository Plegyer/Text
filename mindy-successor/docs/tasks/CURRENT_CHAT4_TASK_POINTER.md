# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — C4-132 POST-MERGE MAIN GATE**
Owner: Chat 4 / QA + Product Acceptance Gate

Current queue:
- `TASK_CHAT4_QA_QUEUE_v13.md`
- C4-126..137

Completed:
- C4-126 — PR #147: PASS-WITH-NOTES
- C4-127 — PR #151: PASS-WITH-NOTES
- C4-128 — PR #146: PASS-WITH-NOTES
- C4-129 — PR #156: PASS-WITH-NOTES
- C4-130 — integration order/collision review
- C4-131 — post-Chat1 main gate: PASS

Second accepted integration is now merged:
- Lead integration PR #163
- production merge commit: `bdc4fe74f267c4d95b30aedcac9dc2c65751378b`
- source candidate: PR #151 frozen head `463d877009b5ecc1d255d7aa27a91bb7c38016e5`
- integration exact-head CI #543: **SUCCESS**
- the narrow ending-presentation assertion collision was resolved without changing production semantics.

**Do C4-132 now.**

Required C4-132:
1. re-query exact current main and latest main CI;
2. verify the combined Chat 1 + Chat 2 production state, especially:
   - all 18 current ending definitions still map to unique live semantic slots;
   - all-ten Hard Work static/presentation surfaces are reachable;
   - committed-state localization is live RU/EN;
   - Satyr Maid / Undead Farm 3-candidate media pools + static fallback remain valid;
   - animation-off/missing-media safety remains green;
   - Chat 1 gameplay/Meta/Palace assertions remain green;
3. record exact main SHA + exact CI/run evidence;
4. if PASS, continue automatically to C4-133 while Lead advances the accepted Forest/School integrations.

Next Lead integration already prepared:
- PR #167 — accepted Chat 3 #146 over current Chat 2 state; retargeted to main and awaiting fresh combined CI.

Do not implement production fixes.
Do not reuse pre-merge QA evidence as substitute for current-main verification.
