# School Localization Delta Integration QA Gate v3

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Reviewed worker branch: chat5/school-pa-gate-next

## Disposition

SELECTIVE_INTEGRATION_READY / NEEDS_FRESH_MAIN_CI.

Do not merge the long-lived Chat5 branch wholesale.

Observed divergence from current main:
- status: diverged
- ahead: 212
- behind: 176
- merge base: 88a0f7526bc43493d2415a0e7859296408e7b564

PR41 localization runtime and PR42 multi-GIF runtime are already merged, so the shared runtime prerequisites for the safe School delta now exist on main.

## Items 137–145 deliverable presence

All requested files are present on Chat5:

137:
- content/school-localization-main-delta-v1.fixture.json

138:
- tests/school-localization-main-delta-v1.test.ts

139:
- docs/school-prep/SCHOOL_UI_COPY_RU_EN_v2.md

140:
- content/presentation-drafts/school-night-multigif-adoption-v1.json

141:
- content/presentation-drafts/school-generic-multigif-adoption-v1.json

142:
- docs/school-prep/STAGED_EXACT_COURSE_LOCALIZATION_PROMOTION_CHECKLIST_v1.md

143:
- docs/school-prep/SCHOOL_LOCALIZATION_NATURAL_PATH_SMOKE_v1.md

144:
- docs/school-prep/SCHOOL_LOCALIZATION_COVERAGE_LEDGER_v2.md

145:
- docs/school-prep/SCHOOL_LOCALIZATION_INTEGRATION_HANDOFF_v14.md

## Localization delta

The delta uses the shipped PR41 localization bundle shape:
- version 1;
- defaultLocale ru;
- strings map;
- each entry contains RU + EN only.

It covers:
- School panel title/help;
- lesson button;
- tuition/Energy text template;
- Night-study button/context;
- all 8 paid course labels;
- all 8 paid course descriptions;
- generic reachable post-lesson copy;
- exact Night-study copy;
- reachable School media alt/caption keys.

PASS.

## Eight courses

The delta explicitly covers:
- literacy_and_numbers
- arcana
- rhetoric_and_social
- etiquette_and_presentation
- field_craft
- physical_training
- arts_and_performance
- body_confidence

The authored test requires RU and EN label/description keys for every course.

PASS.

## Locale-neutral keys

The authored test rejects keys containing locale segments such as .ru. or .en.

It also requires unique keys and presentation-only value payloads.

No gameplay ID is duplicated per locale.

PASS.

## Generic reachable School content

The safe generic School families are included because current production already has truthful generic routing:
- actionCompleted: school;
- generic post-paid-lesson content.

No exact paid-course identity is inferred.

PASS.

## Exact Night content

The delta includes exact Night-study localized identities based on existing school.night_study.* choice IDs.

This is safe because NightFlow exposes the exact completed choice identity.

PASS.

## Staged teacher/course exclusion

The delta test explicitly rejects:
- school.teacher.* keys;
- repeatable exact-course staged authoring;
- drafted teacher names.

Teacher/course-specific exact paid-lesson content remains STAGED_ROUTING_BLOCKED until exact-course routing is shipped.

PASS.

## Mechanics firewall

The localization delta contains no gameplay fields.

It does not alter:
- tuition;
- current-day Energy;
- stat packages;
- paid lessons_completed;
- Night night_study_sessions;
- next-day Night penalty;
- eligibility;
- public results;
- School/Lumber boundaries.

PASS.

## Multi-GIF drafts

Night and generic School adoption drafts are compatible with PR42 pool shape.

But their GIF paths are authoring/proposed paths, not proof that real assets currently ship.

Before production pool integration require:
- every referenced GIF exists in repo;
- 3–5 valid candidates;
- static fallback;
- RU/EN alt keys;
- same selected candidate across locale switch/reload.

Classification:
PRESENTATION_STAGING_READY / REAL_ASSET_VERIFICATION_REQUIRED.

## Natural-path smoke requirement

Before marking the delta SHIPPED_RU_EN, run the authored natural path on fresh main:

RU School panel
-> real paid lesson
-> real generic authored follow-up
-> switch EN
-> same event/variant/save
-> continue to Night
-> real exact School Night-study choice
-> localized exact Night presentation
-> switch RU
-> no gameplay replay/drift.

No direct School counter/worldFact injection.

## Execution truth

Chat5 authored the test but did not provide current-main npm/CI execution evidence for items 137–145.

Therefore:
- authored contract: READY;
- selective files: READY;
- executable integration: NOT YET PROVEN.

## Integration order

1. Fresh Lead branch from current main.
2. Run school-localization-main-delta-v1.test.ts.
3. Merge the delta strings into current content/localization.json.
4. Wire School panel/list text to keys.
5. Integrate generic reachable and exact Night localization only.
6. Keep exact-course teacher/lesson content staged.
7. Keep proposed GIF pools disabled until real assets exist.
8. Run School targeted tests + localization tests + full npm run check.
9. Require exact-head GitHub Actions.
10. Run natural-path RU/EN smoke.

## Final status

- all 8 courses RU+EN: PASS
- generic reachable RU+EN: PASS
- exact Night RU+EN: PASS
- staged teacher content excluded: PASS
- gameplay fields in delta: NONE
- multi-GIF drafts mechanically safe: PASS
- real GIF assets proven: NOT YET
- fresh-main exact-head CI: REQUIRED
- selective integration: READY
- wholesale worker-branch merge: BLOCKED

No production runtime/UI/content file was modified by Chat 4.
