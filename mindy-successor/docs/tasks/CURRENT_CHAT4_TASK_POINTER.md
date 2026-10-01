# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — HUNTER QA v15 / NEW CONTEXT WINDOW**
Owner: Chat 4 / QA + Product Acceptance Gate

Context rule:
- previous Chat 4 context window ended;
- Git is authority; re-read this pointer, `TASK_CHAT4_QA_QUEUE_v15.md`, and `CHAT4_EXECUTABLE_ACCEPTANCE_TRUTH_2026-10-01.md`;
- do not reconstruct old-chat history from memory.

Shipped Tavern baseline:
- exact product main: `8652251051d24b507042b73c4fce4295277c38fe`;
- exact workflow #768 / id `36865274621`: **SUCCESS**;
- validator: 40 packs / 142 events / 39 actions / 22 endings;
- tests: 764/764 pass;
- Tavern runtime + authored + School + presentation are now shipped.

Completed Hunter gates:
- C4-150 runtime #201 @ `8af661de2ce6d73e4db0f61fe4206d3334822998`: PASS-WITH-NOTES, CI #734 SUCCESS.
- C4-151 School #199 @ `f04c93db866b1d2603f6917b41297670f86b0bef`: PASS-WITH-NOTES, CI #745 SUCCESS.

Do now:
1. C4-152: gate Chat 3 Hunter authored candidate immediately when it is frozen exact-head green.
2. C4-153: gate Chat 2 Hunter presentation candidate immediately when it is frozen exact-head green.
3. Do not wait for one sibling if the other is eligible.
4. After all actual Hunter siblings are accepted, execute C4-154 collision ledger against then-current Tavern-shipped main.
5. C4-155 only after Lead integrates the accepted Hunter wave.

Boundaries:
- QA does not implement producer fixes.
- Never mutate frozen candidates.
- Every verdict records exact head SHA, exact workflow run, validator/test evidence.
- Hunter may not be called shipped before C4-155.
- Guard work may proceed in parallel but must not bypass Hunter integration.

Current producer lanes:
- Chat 1: Guard runtime v14 active.
- Chat 2: Hunter presentation v15 active.
- Chat 3: Hunter authored v16 active.
- Chat 5: Guard School v16 active; Hunter School #199 frozen.

Current project handoff:
- `../LEADER1_HANDOFF_CHECKPOINT_2026-10-01.md`
