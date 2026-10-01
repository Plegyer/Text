# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — NEW GREEN WAVE QA + OLD ACCEPTED INTEGRATION FOLLOW-UP**
Owner: Chat 4 / QA + Product Acceptance Gate

Queue:
- `TASK_CHAT4_QA_QUEUE_v14.md`
- C4-138..149

Previous v13 facts:
- C4-135 current-main truth PASS;
- C4-136 PASS-WITH-NOTES for #174, #175, #172;
- C4-137 waits only for Lead to integrate those accepted candidates and then requires final current-main truth.

Do not idle on C4-137. Start v14 gates now.

Gate in this order:
1. PR #178 — Undead runtime
   - `b75e73c0f5e37b19277cb25cf0321587f6444ab4`
   - CI #616 SUCCESS
2. PR #180 — Ordinary Poverty v14
   - `4ba5d50b50d8d263e998d13de4126de3119090f2`
   - CI #624 SUCCESS
3. PR #181 — Undead School
   - `47ce1b83e7ef30a18462833c95df25af4d1e7190`
   - CI #623 SUCCESS
   - depends on frozen #178 runtime
4. PR #182 — Undead presentation
   - `703cabefff9cbf9f681089d1c0f0c1ae70880c2c`
   - CI #626 SUCCESS
   - depends on frozen #178 runtime

A blocker on one candidate does not stop the others.

After Lead integrates accepted #174/#175/#172, perform C4-143/C4-137-equivalent exact-main truth immediately.

Do not implement producer fixes.
