# Chat 6 stream/context-loss recovery — 2026-10-03

Git is the source of truth.

## Current state

Palace runtime producer v15 is frozen and accepted for Chat 2 assembly:
`chat6/palace-rich6-runtime-producer-v15@40623a9de8b5a11ac9493b865c9f3fadd0435e1c`

Palace Player-Facing UI v16 is now also COMPLETE.

Final frozen v16 head:
`chat6/palace-player-facing-ui-v16@65b9e668ff7112c86681905d62f723b6cf95cec0`

Final handoff document:
`mindy-successor/docs/tasks/CHAT6_PALACE_PLAYER_FACING_UI_v16.md`

Its status is:
`READY_FOR_CHAT2_ASSEMBLY`.

Do not restart v16.
Do not make new edits on the frozen v16 head.
Do not rerun full CI.
Chat 6 is a producer worker; Chat 2 owns the full-CI integration lane.

## Recovery steps for a new Chat 6 context

Read, in order:

1. `mindy-successor/docs/tasks/CHAT6_STREAM_ERROR_RECOVERY_2026-10-03.md`
2. `mindy-successor/docs/tasks/CURRENT_CHAT6_TASK_POINTER.md`
3. `mindy-successor/docs/USER_DECISIONS_LOCKED_v1.md`
4. `mindy-successor/docs/tasks/CHAT6_PALACE_PLAYER_FACING_UI_v16.md` at exact ref
   `65b9e668ff7112c86681905d62f723b6cf95cec0`

Then requery the actual branch head:
`chat6/palace-player-facing-ui-v16`.

If the branch head is still `65b9e668...`, treat it as frozen and complete.

If the branch somehow moved after that SHA, inspect the delta before acting; never discard a newer worker commit.

## What v16 completed

The v16 producer added the Palace player-facing UI layer on top of frozen v15, including:
- Palace access/daytime state presentation;
- stage and duty progress;
- one-duty-per-day lock presentation;
- duty Energy cost and bounded wage preview;
- support/prep presentation;
- Service Life / Court Power / Inner Truth route-prep visibility;
- Outcome Ready and Palace ending eligibility;
- explicit D16 commit presentation;
- True Ending presentation gated by Palace completion + all 12 progression stats >=91 + Prince completion, Lust excluded;
- RU/EN localization;
- UI model and renderer focused tests;
- no duplicate Strong Meta UI.

v16 intentionally does not own:
- Strong Meta loadout UI;
- final Prince/lore prose;
- Secret Debt runtime implementation;
- full-CI integration.

## Required handoff after recovery

Do not continue production.

Report to Leader exactly:

`READY_FOR_CHAT2_ASSEMBLY`

with:
- branch: `chat6/palace-player-facing-ui-v16`;
- frozen SHA: `65b9e668ff7112c86681905d62f723b6cf95cec0`;
- handoff doc: `mindy-successor/docs/tasks/CHAT6_PALACE_PLAYER_FACING_UI_v16.md`;
- note that no full CI was run;
- note any focused QA status already recorded in the handoff doc.

Then wait for Leader to assign the next task.
