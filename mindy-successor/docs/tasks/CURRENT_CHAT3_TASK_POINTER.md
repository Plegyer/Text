# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — ASSASSIN AUTHOR REPAIR FIRST**
Owner: Chat 3 / Assassin producer
Producer PR: #252
Last frozen producer head: `0976b4fefdc4d6b379243cc0f3d3429e0e1a3642`
Chat 2 assembly PR: #255
Failed QA workflow: #1110

## Exact repair

Chat 2 reproduced one real defect on current-main assembly:
- 981 tests total / 980 pass / 1 fail;
- `assassin-natural-acceptance.test.ts`;
- after the natural 50-shift path, `assassin.contract.stage` is still `intel`, expected `closed`.

Known routing cause from Chat 2:
- resolving Assassin intel transitions the quest into `intel`;
- both the concealed-toolset item scene and contract-prep scene become eligible;
- the higher-priority item scene wins the single blocking delivery;
- after it resolves, the original quest-transition trigger is gone;
- contract-prep listens only to that transition, so ordinary shifts never reopen it.

Repair the Assassin-owned lifecycle so the natural contract can continue after this collision **without inventing a new arbitrary shift threshold** and without breaking refusal safety, item flow, School/Activity boundaries, or Hard Work=50.

Run focused/static tests only. Do not trigger producer full CI.
Freeze a new exact producer SHA, update PR #252 evidence, report `READY_FOR_CHAT2`, then stop pushing.

## Secondary queued task after repair

After the repaired Assassin SHA is frozen, begin the ordinary-work negative-stat tradeoff packet from fresh main:
- current production defect: only Lumber has negative seasonal stat effects;
- target direction: roughly **2 seasons of 4 per profession** carry a negative stat tradeoff, not every season;
- prepare exact per-profession mapping for Leader review before runtime changes.

Preserve the already frozen School candidate PR #254 @ `877927cf747ba9f69a53ddccf4373b795561f3a0`.
