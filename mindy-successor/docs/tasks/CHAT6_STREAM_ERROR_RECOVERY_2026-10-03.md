# Chat 6 stream-error recovery — 2026-10-03

Git is the source of truth.

Read:
1. `CURRENT_CHAT6_TASK_POINTER.md`
2. `USER_DECISIONS_LOCKED_v1.md`

Frozen Palace runtime producer:
`chat6/palace-rich6-runtime-producer-v15@40623a9de8b5a11ac9493b865c9f3fadd0435e1c`

Current task:
Palace Player-Facing UI v16.

Branch:
`chat6/palace-player-facing-ui-v16`

Latest known worker head before stream failure:
`957096c4a48d3cfa9d3a67cf4da40b5d3839d474`

Do NOT restart from v15; substantial v16 UI work is already committed.

Recent work includes:
- Palace daytime action labels/localization;
- committed/completed ending UI preservation;
- UI model tests;
- renderer tests;
- paid-duty preview stopping at Outcome Ready;
- ending-eligibility fixture alignment.

The final v16 handoff doc was not yet committed at stream failure.

Continue from fresh head:
- finish CURRENT_CHAT6_TASK_POINTER.md;
- run focused only, no full CI;
- ensure D23/D43 invariants and no duplicate Strong Meta UI;
- create `CHAT6_PALACE_PLAYER_FACING_UI_v16.md`;
- freeze exact SHA;
- report READY_FOR_CHAT2_ASSEMBLY.

Do not merge main.
