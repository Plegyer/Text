# Locale Switch Save Invariance Smoke v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance

## Purpose

Executable UI smoke plan for the future RU+EN localization runtime.

Goal:
prove locale switching changes presentation only and preserves gameplay/save identity.

## Preconditions

Runtime supports:
- locales ru and en;
- locale resolver/fallback;
- locale switch control or callable presentation preference setter;
- existing production catalog;
- Save export/readback.

Use one current production run, not a synthetic localization-only state.

## Scenario A — work then switch

1. Start normal run.
2. Complete arrival/start.
3. Open Work.
4. Execute one target ordinary shift, preferably lumber.shift.
5. Resolve any blocking production reaction required to return to stable UI.
6. Persist Save.
7. Capture:
   - full Run;
   - full Meta;
   - gameplay RNG state;
   - actionCounts/history;
   - typed career counters;
   - current presentationId;
   - locale-neutral pending state if any.
8. Switch RU -> EN.
9. Capture Save/state again.
10. Switch EN -> RU.
11. Capture again.

Acceptance:
- Run mechanically identical after each switch;
- Meta identical;
- gameplay RNG identical;
- completed_shifts unchanged;
- money/Energy unchanged;
- event history unchanged;
- semantic presentation ID unchanged.

Allowed difference:
- locale/presentation preference stored outside normalized gameplay state.

## Byte-equivalent vs semantic-equivalent

Preferred if locale preference is outside Save:
gameplay Save bytes are identical.

If locale preference is serialized in a clearly presentation-only field:
compare normalized Save excluding that preference.

Do not exclude:
- RNG;
- pending identities;
- progression;
- resources;
- calendar;
- Activity;
- ending;
- Meta.

## Scenario B — pending event

1. Naturally trigger a production event.
2. Stop while event is pending.
3. Capture:
   - eventId;
   - variantId;
   - choice IDs;
   - presentationId;
   - RNG.
4. Switch RU -> EN.
5. Assert same owner IDs.
6. Switch back RU.
7. Resolve one choice.
8. Assert effect commits exactly once.

Locale switch must not:
- reroll variant;
- recreate history entry;
- reorder mechanical choices;
- duplicate effect.

## Scenario C — ordinary poverty pending event

Natural path:
EndDay
-> street or cheap lodging
-> materialized ordinary-poverty event.

Switch locale while pending.

Require:
- same event/variant;
- same cooldown/history identity;
- same NightFlow phase;
- same choice effects;
- no Secret Debt behavior appears.

## Scenario D — School

1. Execute real paid School lesson.
2. Capture tuition/Energy/progress.
3. Switch locale.
4. Resolve safe authored follow-up if present.
5. Switch back.

Require:
- no second tuition charge;
- no second Energy cost;
- lessons_completed unchanged by locale;
- night_study_sessions unchanged;
- exact course/track identity unchanged.

## Scenario E — Night study

1. Enter real NightFlow.
2. Choose lodging.
3. Choose exact School Night-study choice.
4. Capture state before/around authored follow-up.
5. Switch RU/EN.

Require:
- night_study_sessions increments once;
- NightFlow phase unchanged by locale switch;
- next-day modifier unchanged;
- no second choice transaction.

## Scenario F — Forest Activity

1. Enter lumber.forest naturally.
2. Choose logging-road.
3. Advance to an intermediate checkpoint.
4. Save.
5. Switch locale.
6. Reload if useful.
7. Continue.

Require:
- Activity ID unchanged;
- route ID unchanged;
- checkpoint unchanged;
- progress/endurance unchanged;
- local Activity RNG unchanged;
- result identity unchanged.

## Scenario G — ending/Meta

1. Use explicit long-threshold accelerator only to reach Lumber 49 if needed.
2. Perform real 50th lumber.shift.
3. Confirm ending eligible.
4. Switch locale.
5. Confirm eligibility unchanged.
6. Commit ending.
7. Switch locale before completion where UI permits.
8. Complete.
9. Verify hardWork:lumber exactly once.
10. Switch locale again.
11. Start New Life.

Require:
- committed ending identity unchanged;
- Meta reward exactly once;
- New Life Meta unchanged.

## Scenario H — missing EN fallback

1. Select an intentionally untranslated test key.
2. Switch to EN.
3. Verify RU fallback renders.
4. Verify QA diagnostic marks fallback.
5. Capture Save before/after.

Require:
- gameplay Save invariant;
- gameplay RNG invariant;
- missing EN NOT counted as bilingual complete.

## Scenario I — multi-GIF occurrence

Once multi-GIF runtime exists:

1. Materialize one semantic occurrence with a deterministic candidate.
2. Capture selected candidate identity.
3. Switch RU -> EN.
4. Require same candidate.
5. Switch back.
6. Require same candidate.

Localized alt/caption may change.
Media occurrence selection must not reroll because locale changed.

## Automated normalization helper

Recommended test normalization:

- deep clone Save;
- remove only explicit presentation preference field if that field is intentionally stored in Save;
- compare the remaining object deeply.

Do not remove broad UI/presentation branches unless architecture proves they are non-authoritative.

## UI shell assertions

After switch:
- visible navigation labels change locale;
- accessibility labels change locale;
- active panel remains the same where supported;
- no gameplay command fires merely because locale changes.

## Persistence across app reload

1. Select EN.
2. Reload app.
3. Locale preference may remain EN.
4. Gameplay Save must parse identically.
5. Switch RU.
6. No gameplay mutation.

If locale preference is intentionally session-only, safe RU fallback after reload is acceptable if documented.

## Failure classifications

- LOCALE_SWITCH_MUTATES_RUN
- LOCALE_SWITCH_MUTATES_META
- LOCALE_SWITCH_CONSUMES_RNG
- LOCALE_SWITCH_REROLLS_PENDING
- LOCALE_SWITCH_REROLLS_ACTIVITY
- LOCALE_SWITCH_REROLLS_MEDIA
- LOCALE_SWITCH_DUPLICATES_EFFECT
- FALLBACK_FALSE_GREEN
- SAVE_BACKWARD_COMPAT_FAILURE

## CI placement

Add targeted UI/localization smoke to normal check.

Then preserve:
- all current mechanics tests;
- presentation tests;
- poverty;
- School;
- Forest;
- ending/Meta.

Require exact-head GitHub Actions and post-merge main run.

## Current status

This is an executable plan, not current evidence.

Current main at authoring time has the RU+EN Product lock but no detected localization runtime implementation.

No production runtime/UI/content file was modified by Chat 4.
