# CURRENT CHAT6 TASK POINTER

Status: **COMPLETE — READY FOR CHAT2 CONTENT ASSEMBLY**
Owner: Chat 6

Previous v39-v41 bundle is COMPLETE and accepted.
Do not redo v39, v40, or v41.

Current branch:
`chat6/strong-meta-ui-closure-v42`

Complete all tasks below in order without waiting for Leader.
Only stop for a genuine Product/API blocker.

## Task A — v42: Strong Meta player-facing selector closure

Close the v39 P1 finding that the accepted player-facing app has no visible Strong Meta Keystone/Specialist selector.

Requirements:
- UI-only / wiring-only change;
- use existing accepted Strong Meta ownership/selection APIs if available;
- do not change reward ownership semantics;
- do not change engine capacity rules;
- preserve max 1 Keystone and max 2 Specialists;
- `palace.true.cap-200` remains a normal Specialist and consumes a Specialist slot;
- Source Method remains automatic knowledge and must never appear as selectable;
- ordinary Hard Work packages remain outside Strong Meta slots;
- current-run Strong Meta snapshot remains immutable;
- imported/owned rewards never auto-select;
- do not invent a new save schema or a second selection system.

If the current accepted UI/runtime has no legal existing API seam for this selector, STOP and document the exact blocker instead of inventing mechanics.

Add focused tests for the player-facing selector behavior.

Deliver:
`mindy-successor/docs/tasks/CHAT6_STRONG_META_UI_CLOSURE_v42.md`

## Task B — v43: modal accessibility-name closure

Close the v39 P1 finding where generic modal ARIA naming can expose raw internal panel IDs.

Requirements:
- player-facing accessible name must be localized/human-readable;
- no raw internal panel ID may be exposed as the normal ARIA label;
- preserve existing modal routing/behavior;
- no mechanics change;
- add focused accessibility/localization test coverage.

Deliver:
`mindy-successor/docs/tasks/CHAT6_MODAL_ARIA_NAME_CLOSURE_v43.md`

## Task C — v44: exact focused QA + handoff

Run:
- typecheck;
- validate;
- build;
- focused Strong Meta UI tests;
- modal accessibility tests;
- localization parity tests;
- save/reload / Strong Meta snapshot adjacency needed by the touched UI seam.

Do not run full CI.

Create:
`mindy-successor/docs/tasks/CHAT6_STRONG_META_UI_CLOSURE_HANDOFF_v44.md`

Report exact implementation SHA and disposition:
`BUNDLE_COMPLETE — READY_FOR_CHAT2_CONTENT_ASSEMBLY`

Do not merge main.

## Completion record — 2026-10-06

v42, v43, and v44 are complete on this branch. The exact implementation head before report-only commits is `fac645878ebd726f50fd1364ac72414796755a2d`.

Deliverables:
- `mindy-successor/docs/tasks/CHAT6_STRONG_META_UI_CLOSURE_v42.md`
- `mindy-successor/docs/tasks/CHAT6_MODAL_ARIA_NAME_CLOSURE_v43.md`
- `mindy-successor/docs/tasks/CHAT6_STRONG_META_UI_CLOSURE_HANDOFF_v44.md`

No main merge and no forced full CI were performed. Runner execution limitations and the exact focused commands for Chat2 are recorded in the v44 handoff.

`BUNDLE_COMPLETE — READY_FOR_CHAT2_CONTENT_ASSEMBLY`
