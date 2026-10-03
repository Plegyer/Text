# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — NEW START+ HARD WORK PACKAGE UI / PRESENTATION v2**
Owner: Chat 4

Shared D21-D24 runtime is frozen and ready for integration:
`chat4/hard-work-meta-shared-runtime-v1@c085eda62dd39f71d3a4c75a6c31f4c72527039a`

Preserve that runtime branch. Do not move it.

Create a dependent presentation branch from the frozen runtime head:
`chat4/hard-work-meta-newstart-ui-v2`

## Assignment

Implement the New Start+ presentation/selection layer that consumes the existing shared runtime API without changing its semantics:

- show all earned ordinary Hard Work packages;
- each package has independent selected/unselected control;
- player may select none, some, or all;
- selection is whole-package, not individual effects;
- clearly show profession early-access benefit separately from selected stat/Lust package effects;
- show locked package definitions from the centralized catalog;
- make Prostitute package clearly show Sexuality +5, Charm +5, Lust +3;
- accessible selected/unselected state;
- RU/EN labels/help;
- explicit explanation that Palace invitation requires all ten earned packages to be active in that new life;
- cap-200 option wording must say "maximum becomes 200", never "stats are doubled";
- do not introduce a one-slot limit for Hard Work packages;
- do not mix strong complex-ending modifier slots into this UI yet.

Add focused presentation/state tests.
Do not change Palace authored content or Secret Debt runtime.
No full CI.
Freeze exact SHA and report `READY_FOR_CHAT2_AFTER_SHARED_RUNTIME`.
