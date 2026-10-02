# Chat 2 — School D20 Technical QA / Current-Main Assembly

Status: **STATIC TECHNICAL QA PASS / ASSEMBLY CI PENDING**
Date: 2026-10-02
Owner: Chat 2 / Integration + Assembly + Technical QA

## Exact authority
- producer PR #254
- frozen producer head: `877927cf747ba9f69a53ddccf4373b795561f3a0`
- assigned producer baseline: `6a6029df8e9c007227da0173eb499d59ba51648e`
- fresh assembly base/current main: `223135d62b41c0add3cd621f756d8fad63072b39`
- producer head was not moved.

## Current-main collision analysis
PR #254 changes exactly 6 School-owned files.

From producer baseline to current main:
- current-main production overlap with those six files: **0**
- all intervening changes are reference/decision/task-pointer documentation
- pointer baseline `426ec9146716e1246d6b7bfdd4a570ef2fcb0a54` -> current main is task-pointer-only.

Therefore this assembly overlays the exact six frozen producer blobs onto current main with no semantic merge or hand-edit.

## Locked Product authority
Current `USER_DECISIONS_LOCKED_v1.md` D20 requires:
- existing Body Confidence paid lesson grants **Lust +2**
- existing progression-stat package remains
- Lust is separate from Sexuality
- effect applies exactly once per paid lesson
- save/reload preserves the committed value without duplication
- forced Secret Debt Night does not automatically increase Lust.

## Technical QA
`src/core/school.ts`:
- introduces `SCHOOL_BODY_CONFIDENCE_LUST_GAIN=2`
- only `school.course.body_confidence` has `lustGain`
- `schoolDirectCoverage()` still derives progression Stats only; Lust is not added as a Stat
- `schoolLessonEffects()` appends the already-supported `metric: lust` effect inside the same paid School transaction
- tuition, 1 Energy cost, existing progression-stat effects and `lessons_completed` remain in that transaction
- no engine change and no Save schema/migration change
- `schoolNightStudyChoice()` remains exactly supported-stat +2 and `night_study_sessions`; it contains no Lust metric effect.

Localization:
- exactly one existing key changes: `school.course.body_confidence.description`
- RU/EN copy explicitly states paid lesson Lust +2 and that Lust remains separate from Sexuality.

Save/reload fixture:
- adds a Body Confidence committed transaction case
- explicitly requires Lust +2 exactly once with no duplicate Lust, tuition, Energy, stat gain or lesson counter after reload
- explicitly records the Night Study boundary.

Focused D20 tests cover:
1. Body Confidence paid lesson adds Lust +2 in the same transaction;
2. repeated save/reload does not duplicate it;
3. existing Lust cap of 100 is respected without changing the progression-stat package;
4. other paid courses receive no Lust;
5. Body Confidence Night Study receives no Lust.

Existing School adapter/target regressions were updated to preserve exact tuition/Energy/stat packages and verify only Body Confidence adds Lust.

## Scope boundaries
- no Secret Debt runtime touched
- no profession runtime touched
- no NightFlow engine change
- no RNG/Meta/ending changes
- no new Save field/schema/migration
- no current shipped career file modified.

## Assembly construction
Assembly = current main + exact Git blobs for all six frozen producer files + this QA evidence file.

Next gate: exactly one full CI run on the assembly PR.
If green, freeze exact assembly SHA and report `READY_FOR_LEADER_MERGE`.
Chat 2 does not merge main.
