# School Localization Integration QA v2

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Reviewed worker branch: chat5/school-pa-gate-next
Current shared localization runtime: PR41 merged / 291/291 PASS

## Disposition

SELECTIVE_INTEGRATION_READY for:
- eight-course UI RU+EN;
- generic reachable post-School localization;
- exact Night-study localization.

STAGED_ROUTING_BLOCKED for:
- teacher-specific paid-lesson presentation;
- exact-course repeatable lesson content;
- teacher/course presentation payload.

PRODUCT_BLOCKED remains for unresolved School public-result families.

Do not merge the long-lived Chat5 branch wholesale.

## Eight paid-course UI

school-ui-ru-en-v1.fixture.json:
- source locale: ru;
- supported locales: ru/en;
- 8 course entries;
- RU+EN label/description authoring;
- shared tuition/Energy/stat identities;
- authoring fixture, not a runtime pack.

The fixture preserves current eight paid-course numbers and does not create locale-specific mechanics.

Status:
SAFE_TO_INTEGRATE into current PR41 localization bundle.

## Generic reachable School content

school-generic-localization-v2.fixture.json:
- status says SAFE_TO_INTEGRATE_AFTER_LOCALIZATION_RUNTIME;
- current runtime dependency is now satisfied by merged PR41;
- gameplay route remains generic actionCompleted:school;
- localization is attached after the locale-neutral route;
- locale-specific conditions/effects/rewards/RNG/save identity are forbidden.

The status wording predates PR41 and is stale metadata only.

Current classification:
SAFE_TO_INTEGRATE_ON_FRESH_MAIN.

## Exact Night-study localization

school-night-localization-v2.fixture.json:
- source locale ru;
- supported locales ru/en;
- 24 exact existing Night-study event/choice identities;
- one locale-neutral gameplay identity per route;
- RU+EN player-facing text;
- no duplicated RU/EN gameplay event.

Locked Night mechanics remain shared:
- tuition 0;
- current-day Energy 0;
- selected supported stat +2;
- next-day Energy -1;
- lessons_completed +0;
- night_study_sessions +1.

Status:
SAFE_TO_INTEGRATE_ON_FRESH_MAIN.

## Staged teacher/course localization

school-teacher-course-localization-v2.fixture.json:
- status: STAGED_ROUTING_BLOCKED;
- 8 course families;
- RU+EN teacher identity/content;
- RU+EN exact-course lesson authoring;
- one shared course/gameplay identity across locales.

The blocker is still exact paid-course routing.

Current generic paid-School reaction does not expose the exact paid course to authored reactions.

Localization does not solve that routing gap.

Status:
KEEP_STAGED.

## No mechanics drift

Reviewed fixtures separate localized text from mechanics and explicitly reject locale-specific:
- conditions;
- effects;
- rewards;
- progress;
- RNG;
- Save identity.

No localization artifact changes:
- paid tuition;
- 1 Energy paid lesson cost;
- stat packages;
- ordinary Lust behavior;
- paid lessons_completed ownership;
- Night night_study_sessions ownership.

PASS.

## No false reachability

Safe production-routed now:
- generic post-School content;
- exact Night-study content.

Not naturally routed:
- exact teacher/course paid-lesson presentation;
- exact-course repeatable lesson scenes.

Do not mark staged teacher/course content SHIPPED until the exact-course public routing seam exists and passes its acceptance test.

PASS.

## Product-blocked families remain outside localization integration

Still independent Product blockers:
- management/accounting provider/result/threshold;
- Arcana/Forest School result semantics;
- certificates/projects/exams where unresolved;
- education ending/Meta rules.

Translation data does not approve these mechanics.

PASS.

## Current-runtime adaptation

Worker metadata saying localization runtime is not implemented is obsolete after PR41.

Lead selective integration should:
1. recreate/copy locale-neutral keys onto current main;
2. use shipped content/localization.json shape;
3. preserve one gameplay identity;
4. integrate UI/generic/Night keys only;
5. retain teacher/course exact-routing content as staged;
6. run School localization + normal School regression on exact head.

## Required current-main tests

Before merge:
- all eight course UI keys resolve RU and EN;
- same course IDs both locales;
- same tuition/Energy/stats;
- generic post-School event identity unchanged by locale;
- all 24 exact Night identities unchanged by locale;
- paid vs Night counters remain separated;
- pending/reload locale switch does not duplicate transaction;
- staged teacher/course content is not root-routed accidentally;
- full npm run check;
- exact-head GitHub Actions.

## Final classification

Eight-course UI:
SAFE_TO_INTEGRATE.

Generic reachable content:
SAFE_TO_INTEGRATE.

Exact Night content:
SAFE_TO_INTEGRATE.

Teacher/course exact content:
STAGED_ROUTING_BLOCKED.

School mechanics drift:
NONE FOUND.

PR41 runtime dependency:
SATISFIED.

Fresh-main selective integration CI:
REQUIRED.

No Chat 4 production runtime/UI/content file was modified.
