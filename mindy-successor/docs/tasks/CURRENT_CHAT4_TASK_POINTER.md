# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — CURRENT-MAIN CLOSEOUT + HUNTER QA v15**
Owner: Chat 4 / QA + Product Acceptance Gate

Current queue:
- `TASK_CHAT4_QA_QUEUE_v15.md`
- C4-149..155

Do now:
1. C4-149 durable closeout on current main `2d16029a6a17e90b7b9b7faacc93ca8a1a4a08a0`, push CI #756 SUCCESS.
2. C4-150 gate frozen Hunter runtime PR #201 @ `8af661de2ce6d73e4db0f61fe4206d3334822998`, CI #734 SUCCESS.
3. C4-151 gate frozen Hunter School PR #199 @ `f04c93db866b1d2603f6917b41297670f86b0bef`, CI #745 SUCCESS.
4. Then gate Chat 2/3 Hunter siblings independently as each freezes; do not wait for a blocked sibling.

Ordering:
- Tavern sibling QA is complete (#187/#185/#191/#200 accepted), but Tavern still integrates before Hunter.
- QA may run Hunter candidate gates in parallel; it must not authorize Hunter to bypass Tavern integration order.
- Do not implement producer fixes.
- Do not mutate frozen producer candidates.

Current producer state:
- Chat 1: Guard runtime v14 assigned, C1D-145..156.
- Chat 2: Hunter presentation v15 assigned, C2-157..168.
- Chat 3: Hunter authored content v16 active, C3-169..180.
- Chat 5: Hunter School #199 frozen; no v16 assigned.

Current project handoff:
- `../LEADER1_HANDOFF_CHECKPOINT_2026-10-01.md`
