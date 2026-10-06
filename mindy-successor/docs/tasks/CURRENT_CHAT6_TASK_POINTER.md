# CURRENT CHAT6 TASK POINTER

Status: **ACTIVE — AUTO-CONTINUE FINAL PLAYER-FACING RELEASE AUDIT v39-v41**
Owner: Chat 6

Previous Activity Network copy-fix bundle v36-v38 is complete and accepted.

Current branch:
`chat6/final-player-facing-release-audit-v39`

Complete ALL tasks below in order without waiting for Leader.
Only stop for a real Product/content ambiguity.

## Task A — v39: final player-facing UI localization audit

Create:
`mindy-successor/docs/tasks/CHAT6_FINAL_PLAYER_FACING_UI_LOCALIZATION_AUDIT_v39.md`

Audit accepted live player-facing UI strings beyond ending prose:
- Night;
- Secret Debt;
- Activity;
- Palace;
- School;
- Strong Meta / reward selection;
- save/load/migration notices;
- ending screen;
- generic buttons/status labels;
- presentation alt/captions.

Find:
- raw localization keys visible to player;
- missing RU/EN pairs;
- fallback-only player text;
- stale retired live labels;
- contradictory button/status wording.

Classify findings P0/P1/P2.

## Task B — v40: content-only closure producer if needed

If v39 finds P0/P1 issues that can be fixed only by localization/presentation text:
- fix only those exact keys/rows;
- add focused localization tests;
- change no runtime/mechanics/routing.

If no P0/P1 content-only issue exists:
create:
`mindy-successor/docs/tasks/CHAT6_FINAL_PLAYER_FACING_UI_CLOSURE_NOOP_v40.md`
documenting why no producer is required.

Any runtime/UI-logic issue must be documented for Leader, not changed by Chat 6.

## Task C — v41: final manual copy/presentation smoke matrix

Create:
`mindy-successor/docs/tasks/CHAT6_FINAL_MANUAL_COPY_PRESENTATION_SMOKE_MATRIX_v41.md`

Provide a compact manual release checklist covering:
- all ending families;
- Night surfaces;
- Secret Debt;
- Activity;
- Palace;
- generic ending screen;
- alt/caption accessibility;
- RU/EN switch parity;
- retired-content absence;
- no raw keys/fallback labels.

Include the accepted v36 Activity Network epilogue correction:
RU:
`Контакты связывают разрозненные направления в единое рабочее пространство.`
EN:
`The contacts tie disconnected routes into one practical working network.`

No runtime changes.
No full CI.

After all three tasks are committed, report:
`BUNDLE_COMPLETE — READY_FOR_LEADER_REVIEW`.
