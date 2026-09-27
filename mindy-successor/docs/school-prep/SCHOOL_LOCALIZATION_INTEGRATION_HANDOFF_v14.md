# School Localization Integration Handoff v14

Status: Lead selective-integration handoff for Queue items 137–144.
Target context: current main after PR42 multi-GIF runtime shape.

## 1. Exact current-main localization delta

File:
- `prior-work/astra/prototype-m3.2/content/school-localization-main-delta-v1.fixture.json`

Shape:
- exact `localization.json` bundle structure:
  - `version: 1`;
  - `defaultLocale: "ru"`;
  - `strings`.

Safe included families:
- 8 paid-course labels;
- 8 paid-course descriptions;
- School panel/help/button/tuition-Energy wording;
- generic reachable post-paid-lesson content;
- exact Night-study content;
- shared generic/Night presentation alt/caption keys.

Explicitly excluded:
- teacher-specific exact-course paid-lesson text;
- staged teacher presentation;
- staged repeatable exact-course lesson variants;
- Product-blocked milestone/result families.

Selective integration:
- merge `strings` into current root `content/localization.json`;
- preserve existing current-main keys;
- fail on conflicting duplicate values rather than silently overriding unrelated content.

## 2. Localization delta contract test

File:
- `prior-work/astra/prototype-m3.2/tests/school-localization-main-delta-v1.test.ts`

Authored validation:
- strict current localization bundle schema;
- all 8 course label/description pairs;
- RU + EN on every delta entry;
- unique locale-neutral keys;
- presentation-only string payload;
- staged teacher/exact-course lesson content excluded;
- safe generic/Night/UI families present.

Chat 5 does not claim this test was executed by npm/CI.

## 3. Polished School UI copy

File:
- `docs/school-prep/SCHOOL_UI_COPY_RU_EN_v2.md`

Ready player-facing copy:
- School panel title/help;
- tuition/Energy template;
- paid lesson button;
- Night-study button/context;
- generic post-lesson shell;
- disabled-state terminology guidance.

Mechanics remain shared:
- no locale-specific numbers;
- no locale-specific eligibility;
- no locale-specific School progress.

## 4. Exact Night multi-GIF adoption draft

File:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/school-night-multigif-adoption-v1.json`

Coverage:
- all 24 exact Night-study choice identities;
- exact authored Night event IDs;
- exact event presentation IDs for focused/difficult/insight variants;
- 4 reusable pool families:
  - quiet;
  - practical;
  - Arcana;
  - performance.

PR42 pool contract mirrored:
- pool version;
- ordering;
- selectionPolicy;
- 3 candidate minimum;
- candidate `key/kind/src/alt` shape.

Bilingual presentation:
- locale-neutral media/gameplay identity;
- RU+EN alt localization key metadata.

Important:
- candidate GIF asset paths are **proposed**;
- this file is a presentation draft, not a runtime patch;
- do not enable pool overrides until referenced GIF assets exist or paths are replaced with real assets.

## 5. Generic lesson/post-lesson multi-GIF adoption draft

File:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/school-generic-multigif-adoption-v1.json`

Coverage:
- all 8 current paid School semantic presentation IDs:
  - `school/<course>/lesson/default`;
- 10 generic reachable post-lesson event presentation IDs.

Pool:
- 3 generic classroom candidates:
  - lesson notes;
  - generic lesson practice;
  - lesson wrap-up;
- shared static fallback:
  - `assets/stage-school.svg`.

Teacher-specific surfaces:
- explicitly excluded;
- remain `STAGED_ROUTING_BLOCKED`.

Asset note:
- GIF paths are proposed authoring paths, not claimed current assets.

## 6. Staged exact-course localization promotion gate

File:
- `docs/school-prep/STAGED_EXACT_COURSE_LOCALIZATION_PROMOTION_CHECKLIST_v1.md`

Promotion requires:
- exact paid-course routing seam shipped;
- shared localization runtime shipped;
- generic/exact coexistence policy declared;
- no duplicate School transaction;
- RU+EN complete;
- locale-neutral gameplay IDs;
- stable presentation IDs;
- multi-GIF/static fallback valid;
- exact course-to-teacher mapping;
- paid/Night regression green;
- cross-locale save/reload green;
- explicit production inclusion;
- tests/CI actually green.

Use this gate before moving:
- `school-teachers-v1.json`;
- `school-lesson-content-v1.json`;
- `school-lesson-content-v2.json`;
- `school-teacher-course-localization-v2.fixture.json`

into root production authority.

## 7. Natural-path UI smoke

File:
- `docs/school-prep/SCHOOL_LOCALIZATION_NATURAL_PATH_SMOKE_v1.md`

Natural flow:
1. open RU School panel;
2. buy a paid lesson through normal UI;
3. verify real paid mechanics once;
4. materialize generic authored School follow-up;
5. switch RU -> EN while the same instance is pending;
6. verify event/variant/save state unchanged;
7. continue into ordinary Night flow;
8. choose one exact School Night-study identity naturally;
9. verify exact matching localized Night event;
10. switch EN -> RU;
11. verify localized text changes only;
12. confirm no replay of paid/Night mechanics.

No direct School-counter/world-fact injection is allowed for the smoke.

## 8. Coverage ledger

File:
- `docs/school-prep/SCHOOL_LOCALIZATION_COVERAGE_LEDGER_v2.md`

Current classifications:

### SHIPPED_RU_EN
- current town/dock School label;
- current town School subtitle.

### SAFE_DELTA_READY
- internal School panel title/help;
- paid lesson button;
- tuition/Energy line;
- 8 course labels/descriptions;
- supported-stat terminology authoring;
- generic post-paid-lesson content;
- generic classroom alt/caption;
- exact Night-study localized text;
- exact Night alt/caption;
- generic/Night multi-GIF mapping drafts.

### STAGED_ROUTING_BLOCKED
- teacher names/roles/bios as automatic paid-lesson presentation;
- exact-course repeatable paid-lesson content;
- teacher/course presentation assets;
- track-specific peer/classroom content;
- teacher relationship/reaction content.

### PRODUCT_BLOCKED
- management/accounting result;
- Arcana/Forest result;
- certificates/projects/exams;
- teacher relationship route/stage finalization;
- education endings/Meta;
- related final result art.

## 9. Current-main integration sequence

Recommended selective order after the shared localization runtime is available:

1. Run:
   - `school-localization-main-delta-v1.test.ts`;
   - existing localization tests.

2. Merge School `strings` delta into:
   - `content/localization.json`.

3. Wire current School panel/list UI to:
   - `ui.school.*`;
   - `school.course.*.label`;
   - `school.course.*.description`;
   - shared stat localization.

4. Integrate generic reachable School localization:
   - gameplay identity stays `school.generic.reachable.v2.after.school`;
   - use current generic routing `actionCompleted:school`.

5. Integrate exact Night localization:
   - keep all 24 exact `school.night_study.*` IDs;
   - no Night mechanics changes.

6. Keep proposed multi-GIF drafts disabled until:
   - referenced GIF assets exist;
   - static fallback verified;
   - PR42 presentation-pool validation passes.

7. Run:
   - bilingual content/migration contracts;
   - generic routing/reload tests;
   - exact Night routing/reload tests;
   - localization UI acceptance;
   - natural-path smoke;
   - full School regression.

8. Only then classify integrated safe families as `SHIPPED_RU_EN`.

9. Keep staged exact-course teacher/lesson content out of root production until the promotion checklist is green.

## 10. Exact-course routing remains separate

Exact paid-course teacher/lesson localization still depends on:
- `SCHOOL_EXACT_COURSE_ROUTING_SEAM_PROPOSAL_v1.md`;
- `SCHOOL_EXACT_COURSE_ROUTING_LOCALIZATION_COMPATIBILITY_v1.md`;
- `SCHOOL_EXACT_COURSE_ROUTED_CONTENT_ACCEPTANCE_v1.md`.

Do not:
- infer course from stat changes;
- infer course from tuition;
- infer course from Energy;
- read private School counters downstream;
- duplicate gameplay events for RU/EN.

## 11. Product decisions remain OPEN

Items 137–144 do not decide:
- management/accounting provider/form/value/result;
- Arcana/Forest scope/provider/value/result/consumer;
- certificates/projects/exams;
- relationship route/stage IDs;
- education endings/Meta;
- final art direction.

Localization must not convert an unresolved semantic decision into de facto production authority.

## 12. Locked mechanics remain unchanged

Across RU and EN:
- 8 paid courses;
- same course/track IDs;
- same tuition;
- paid Energy = 1;
- same stat packages;
- no ordinary Lust mutation;
- paid `lessons_completed +1`;
- paid `night_study_sessions +0`;
- Night tuition/current-day Energy = 0;
- Night selected supported stat +2;
- next-day Energy -1;
- Night `night_study_sessions +1`;
- Night `lessons_completed +0`;
- School/Lumber boundary unchanged;
- Lumber Hard Work independent;
- Palace unlock policy unchanged.

## 13. Queue 137–144 exact deliverables

137.
- `content/school-localization-main-delta-v1.fixture.json`

138.
- `tests/school-localization-main-delta-v1.test.ts`

139.
- `docs/school-prep/SCHOOL_UI_COPY_RU_EN_v2.md`

140.
- `content/presentation-drafts/school-night-multigif-adoption-v1.json`

141.
- `content/presentation-drafts/school-generic-multigif-adoption-v1.json`

142.
- `docs/school-prep/STAGED_EXACT_COURSE_LOCALIZATION_PROMOTION_CHECKLIST_v1.md`

143.
- `docs/school-prep/SCHOOL_LOCALIZATION_NATURAL_PATH_SMOKE_v1.md`

144.
- `docs/school-prep/SCHOOL_LOCALIZATION_COVERAGE_LEDGER_v2.md`

This file is Queue item 145.

## 14. Execution-status truth

Files/tests in this handoff are committed authoring and test artifacts.

Chat 5 has **not** executed npm/CI for these newly authored tests in this conversation. Lead should treat green execution as a separate integration requirement, not as implied by this handoff.
