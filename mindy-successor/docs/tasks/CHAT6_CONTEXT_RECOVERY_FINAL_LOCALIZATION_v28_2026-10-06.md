# CHAT6 CONTEXT RECOVERY — FINAL LOCALIZATION/PRESENTATION v28

Status: **NEW CHAT RECOVERY — START HERE**
Owner: Chat 6

The previous Chat 6 conversation exhausted its context.
Do not reconstruct history from chat memory. Use GitHub as the source of truth.

## Repository

`Plegyer/Text`

## Read order

1. `mindy-successor/docs/tasks/CHAT6_CONTEXT_RECOVERY_FINAL_LOCALIZATION_v28_2026-10-06.md`
2. `mindy-successor/docs/tasks/CURRENT_CHAT6_TASK_POINTER.md`
3. `mindy-successor/docs/tasks/CHAT6_FINAL_LOCALIZATION_PRESENTATION_CLOSURE_v28_TASK.md`
4. `mindy-successor/docs/tasks/CHAT6_SECRET_DEBT_ENDING_LOCALIZATION_PRODUCER_v27.md`
5. `mindy-successor/docs/tasks/CHAT6_ENDING_LOCALIZATION_CLOSURE_PRODUCER_v26.md`
6. `mindy-successor/docs/tasks/CHAT6_FINAL_LOCALIZATION_CLOSURE_AUDIT_v25.md`

## Completed Chat 6 work

### v26 ordinary ending localization
Branch:
`chat6/ending-localization-closure-producer-v26`

Accepted result:
- all 40 canonical ordinary-career endings have bilingual title/description/epilogue coverage;
- D40 final copy closed;
- Hard Work epilogues closed;
- D41 epilogues closed;
- guild-life/scholar-life epilogues closed;
- Merchant parity repaired;
- focused QA green;
- no runtime change.

### v27 Secret Debt ending localization
Branch:
`chat6/secret-debt-ending-localization-producer-v27`

Final handoff head:
`b6cc4ca6990936f4d801004806b25e4d920f9abf`

Accepted result:
- Paid Freedom, Bound Life, Takeover all have bilingual title/description/epilogue runtime coverage;
- mechanics/rewards/gates untouched;
- ready for Chat 2 content assembly.

## Current task

Branch:
`chat6/final-localization-presentation-closure-v28`

Task:
perform the final 1.0 localization/presentation closure audit over all accepted/frozen content and the current D42 assembly state.

Check:
- missing RU/EN live keys;
- ending copy coverage;
- D42 Night event/caption coverage;
- Secret Debt v27;
- Palace v19;
- Activity D38 v17;
- global presentation v23;
- retired Tavern/lumber-stay stale live surfaces;
- missing alt/caption pairs;
- live consumers relying only on fallback text;
- dead localization whose consumer no longer exists.

Classify findings:
- P0 release blocker;
- P1 required closure;
- P2 cleanup/polish.

Do not change runtime.
Do not change mechanics.
Do not run full CI.

Deliver:
`mindy-successor/docs/tasks/CHAT6_FINAL_LOCALIZATION_PRESENTATION_CLOSURE_v28.md`

Report:
`READY_FOR_LEADER_REVIEW`.

## Important ownership boundaries

- D42 runtime belongs to Chat 2.
- Secret Debt mechanics belong to its frozen v12 + D51 assembly path.
- Palace mechanics/rewards are separate.
- Activity mechanics/rewards are separate.
- lumber-stay retirement is already owned by Chat 5's accepted v17 work.
- Chat 6 may identify localization/presentation gaps but must not invent mechanics to solve them.
