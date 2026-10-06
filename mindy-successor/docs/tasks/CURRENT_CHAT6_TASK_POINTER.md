# CURRENT CHAT6 TASK POINTER

Status: **ACTIVE — FINAL LOCALIZATION/PRESENTATION CLOSURE v28**
Owner: Chat 6

This task is intended for a fresh Chat 6 context.

Completed and accepted:
- v25 localization/accessibility audit;
- v26 ordinary-ending localization closure;
- v27 Secret Debt ending localization closure.

New branch:
`chat6/final-localization-presentation-closure-v28`

Goal:
perform one final 1.0 localization/presentation closure audit over all accepted/frozen content layers and current D42 assembly state.

Check:
- RU/EN missing keys;
- ending title/description/epilogue coverage;
- D42 Night event/caption coverage;
- Secret Debt v27 coverage;
- Palace v19 copy/media/accessibility;
- Activity D38 v17 copy/presentation;
- global presentation v23 mappings;
- retired Tavern/lumber-stay stale live surfaces;
- missing alt/caption pairs;
- localization keys whose live consumer no longer exists;
- live consumers with only fallback text.

Do not change runtime.
Do not change mechanics.
Do not run full CI.

If only content/localization repairs are needed, list them exactly and separate them into:
- P0 release blocker;
- P1 required closure;
- P2 polish/cleanup.

Deliver:
`mindy-successor/docs/tasks/CHAT6_FINAL_LOCALIZATION_PRESENTATION_CLOSURE_v28.md`

Report:
`READY_FOR_LEADER_REVIEW`.
