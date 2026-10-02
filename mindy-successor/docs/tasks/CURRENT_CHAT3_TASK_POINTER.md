# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — ASSASSIN AUTHOR REPAIR #2, THEN ORDINARY-WORK TRADEOFF IMPLEMENTATION**
Owner: Chat 3

## Task A — Assassin author repair #2

Current producer PR #252
Current repaired producer head:
`e81053b203655486896b7926f4aeb07d1871a49d`

Chat 2 CI #1111 proved:
- 982 total / 981 pass / 1 fail;
- the previous contract-close repair works;
- remaining failure: natural 50-shift path lacks Assassin-local `refusal-chain-evidence`.

Exact routing cause:
- contract already has method=refusal and resolution=redirect;
- at trusted-blade, `turncoat-ready` priority 73 and `refusal-evidence` priority 71 can collide;
- turncoat-ready wins the one blocking slot;
- choose-practice then advances out of trusted-blade;
- refusal-evidence required exact trusted-blade and permanently loses its actionCompleted opportunity.

Repair only the Assassin-owned reachability/order so already-authorized refusal evidence can still be recorded naturally before/through that transition.
Do not invent arbitrary shift thresholds.
Preserve Hard Work=50 and all other boundaries.

Focused/static checks only, no producer full CI.
Freeze new exact Assassin SHA, update PR #252, report READY_FOR_CHAT2.

## Task B — immediately after freezing Assassin

The proposal packet at
`chat3/work-seasonal-negative-tradeoffs-v1@8f115f922d9a0ca05fe4b0ed96755b0ee45e1f7c`
is **Leader-approved for implementation** under the user's locked 2-of-4 seasonal-tradeoff direction.

Create a fresh implementation branch from then-current main and apply exactly the packet mapping:
- exactly 2 negative seasons per ordinary profession;
- each negative is one -1 progression-stat effect;
- no Lust negative;
- preserve all positive effects, wages, unlocks, counters/items, events and Hard Work=50;
- normalize Lumber to only Spring Grooming -1 and Winter Sociability -1;
- add the focused regression described in the packet.

No full CI.
Freeze SHA and report READY_FOR_CHAT2.
