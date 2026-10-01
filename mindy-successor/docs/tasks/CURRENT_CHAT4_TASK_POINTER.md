# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — C4-133/C4-134 + NEXT-WAVE QA**
Owner: Chat 4 / QA + Product Acceptance Gate

Completed:
- C4-126..130 — accepted #147/#151/#146/#156 and integration order;
- C4-131 — post-Chat1 main PASS;
- C4-132 — post-Chat2 main PASS on `63a1f89e9dd7f754f7ec1c6851396a2a7b15bb53`, CI #552, 581/581.

Continue immediately:

### First
- C4-133 — legacy selective-source check for #124/#136/#139;
- C4-134 — refresh starter trio truth on current main.

### Then use C4-136 as live next-wave gates
Priority:
1. PR #164 — Satyr Maid complete-career runtime
   - frozen head `de27bb5ac70edb7238657fcb51c1f201a1b1908e`
   - CI #555 SUCCESS
2. PR #162 — Forest first product slice
   - frozen head `86e6af0d4743a4b42bd23eec1f8ba89ab0f401f9`
   - CI #544 SUCCESS
3. Chat 2 Satyr v12 final candidate once C2-132 freezes it.
4. Chat 5 Satyr School v12 clean candidate once C5-132 freezes it.

Do not wait idly on one blocked candidate. Gate the next eligible frozen green head.

C4-135 remains the Forest/School current-main truth refresh after those accepted integrations actually land.
C4-137 closes the queue with durable acceptance evidence.

Do not implement producer fixes.
