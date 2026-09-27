# School Bilingual Production Handoff v13

Status: Lead selective-integration handoff for Queue items 127–135.
Scope: School RU+EN localization authoring after shared localization runtime/UI lands.

## 1. Localization-key inventory

`docs/school-prep/SCHOOL_LOCALIZATION_KEY_INVENTORY_v1.md`

Defines deterministic locale-neutral keys for:
- eight course labels/descriptions;
- teacher name/role/bio;
- generic post-lesson content;
- exact Night-study content;
- staged exact-course lesson text;
- choice labels/text;
- media alt/captions.

Key rule:
- localization key never contains locale suffix;
- gameplay IDs remain separate and unchanged.

## 2. Migration bundle

`prior-work/astra/prototype-m3.2/content/school-bilingual-migration-v1.fixture.json`

Machine-readable RU+EN migration bundle:
- source locale: RU;
- supported locales: RU + EN;
- one locale-neutral key per semantic text identity;
- explicit coverage status.

Current bundle summary:
- translated: authored RU + EN and reachable/integration-ready at current routing level;
- source-fallback: explicit status for any future missing second-locale content;
- staged-only: RU + EN authored but underlying teacher/course route remains staged.

No mechanics/effects are duplicated by locale.

## 3. Migration contract test

`prior-work/astra/prototype-m3.2/tests/school-localization-migration-v1.test.ts`

Authored checks:
- deterministic locale-neutral localization keys;
- translated entries contain RU + EN;
- coverage status explicit;
- bundle summary matches actual entries;
- no locale payload contains mechanics/effects/rewards;
- staged-only content may be fully translated without being mislabeled production-reachable.

This test file was authored in Chat 5; npm/CI execution is not claimed here.

## 4. Eight-course UI RU+EN fixture

`prior-work/astra/prototype-m3.2/content/school-ui-ru-en-v1.fixture.json`

Provides for all eight paid courses:
- RU + EN course label;
- concise description;
- tuition/Energy wording template;
- exact shared tuition number;
- exact shared Energy cost;
- supported-stat IDs;
- exact stat amounts;
- RU + EN stat display terminology.

Locked course values preserved:
- Literacy & Numbers — 300 / Energy 1 / Reason +4 / Wits +2;
- Arcana — 500 / Energy 1 / Magic +4 / Reason +4 / Creativity +2;
- Rhetoric & Social — 300 / Energy 1 / Charm +3 / Sociability +3 / Wits +2;
- Etiquette & Presentation — 400 / Energy 1 / Manners +3 / Grooming +3 / Charm +2;
- Field Craft — 400 / Energy 1 / Dexterity +3 / Wits +3 / Creativity +2;
- Physical Training — 400 / Energy 1 / Strength +3 / Endurance +3 / Dexterity +2;
- Arts & Performance — 500 / Energy 1 / Creativity +3 / Charm +3 / Sociability +2 / Dexterity +2;
- Body Confidence — 400 / Energy 1 / Sexuality +3 / Grooming +3 / Endurance +2.

## 5. Generic reachable localization bundle v2

`prior-work/astra/prototype-m3.2/content/school-generic-localization-v2.fixture.json`

Maps current naturally reachable generic School event:
- gameplay pack: `school.generic.reachable.v2`;
- event: `school.generic.reachable.v2.after.school`;
- trigger: `actionCompleted:school`.

Contains deterministic keys and RU+EN text for:
- title;
- all generic variants;
- Continue label/text;
- classroom alt/caption.

Status:
- **SAFE_TO_INTEGRATE_AFTER_LOCALIZATION_RUNTIME**.

Reason:
- routing already exists;
- content is course-neutral;
- no exact-course seam required.

## 6. Exact Night localization bundle v2

`prior-work/astra/prototype-m3.2/content/school-night-localization-v2.fixture.json`

Coverage:
- all 24 exact existing Night-study choice identities;
- deterministic title/variant/media localization keys;
- RU+EN text;
- one shared gameplay event/choice identity.

Locked Night mechanics:
- tuition 0;
- current-day Energy 0;
- selected supported stat +2;
- next-day Energy -1;
- `lessons_completed +0`;
- `night_study_sessions +1`.

Status:
- **SAFE_TO_INTEGRATE_AFTER_LOCALIZATION_RUNTIME**.

No exact paid-course seam is required because Night choice identity is already exact.

## 7. Staged teacher/course localization bundle v2

`prior-work/astra/prototype-m3.2/content/school-teacher-course-localization-v2.fixture.json`

Contains all eight staged paid-course families:
- exact canonical course ID;
- matching track ID;
- one drafted teacher identity;
- teacher RU+EN name/role/bio;
- deterministic teacher localization keys;
- seven RU+EN repeatable lesson variants per course;
- current staged event references;
- lesson media localization-key family.

Status:
- **STAGED_ROUTING_BLOCKED**.

Reason:
- current paid School public reaction exposes generic `actionCompleted:school`;
- exact paid `school.course.*` identity is not yet available to authored reactions;
- automatic teacher/course routing remains ambiguous without the exact-course seam.

Do not promote this bundle as naturally reachable until that seam exists and passes routing acceptance.

## 8. Production-readiness audit

`docs/school-prep/SCHOOL_LOCALIZATION_PRODUCTION_READINESS_v1.md`

Classification summary:

### SHIPPED
- existing locale-neutral School gameplay mechanics only;
- no new RU+EN content bundle is claimed shipped yet.

### SAFE_TO_INTEGRATE
- eight-course RU+EN UI authoring;
- generic post-paid-lesson localization;
- exact Night-study localization;
- generic course-neutral peer/classroom aftermath.

### STAGED_ROUTING_BLOCKED
- teacher identity paid-lesson presentation;
- exact-course repeatable lessons;
- teacher/course alt/captions;
- track-specific peer/classroom content;
- optional teacher relationship scenes;
- final teacher/course GIF routing.

### PRODUCT_BLOCKED
- management/accounting milestone/result;
- Arcana/Forest result;
- certificates/projects/exams;
- education endings/Meta;
- related result art/copy.

## 9. Localization UI acceptance

`docs/school-prep/SCHOOL_LOCALIZATION_UI_ACCEPTANCE_v1.md`

Defines UI acceptance for:
- School panel RU/EN switch;
- all eight paid-course rows;
- stat terminology;
- tuition/Energy wording;
- disabled-state equivalence;
- paid action state equivalence;
- generic post-lesson localization;
- all 24 Night routes;
- cross-locale pending scene behavior;
- RU -> EN and EN -> RU save/reload;
- deterministic variant identity;
- shared media/GIF semantics;
- accessibility/layout.

Core requirement:
language changes presentation only.

## 10. Existing bilingual source assets retained from v12

Related prior assets remain relevant:
- `SCHOOL_BILINGUAL_SOURCE_INVENTORY_v1.md`;
- `SCHOOL_TEACHER_IDENTITIES_RU_EN_v1.md`;
- `SCHOOL_REPEATABLE_LESSONS_RU_EN_v1.md`;
- `school-generic-reachable-bilingual-v1.json`;
- `school-night-exact-bilingual-v1.json`;
- `school-bilingual-content-contract.test.ts`;
- `SCHOOL_BILINGUAL_MULTI_GIF_MAPPING_v1.md`;
- `SCHOOL_EXACT_COURSE_ROUTING_LOCALIZATION_COMPATIBILITY_v1.md`;
- `SCHOOL_BILINGUAL_INTEGRATION_HANDOFF_v12.md`.

v13 does not replace gameplay identity or mechanics from those files; it adds deterministic keying, migration fixtures, readiness classification and UI acceptance.

## 11. Shared localization runtime dependency

Current strict content schema still accepts one string for player-facing:
- event title;
- variant text;
- choice label/text;
- media alt.

Therefore the new RU+EN fixture/bundle files remain authoring/migration inputs until a shared project localization layer lands.

Minimum shared localization behavior:
1. gameplay/event/variant/choice/media identities remain locale-neutral;
2. routing/materialization occurs before locale text lookup;
3. RU/EN lookup resolves by deterministic key;
4. missing required locale is validated explicitly;
5. conditions/effects/rewards are defined once;
6. RNG is locale-independent;
7. Save identity is locale-independent;
8. pending scene may reload under another locale with the same event/variant/choice identity.

Do not create a School-only duplicate localization runtime if a shared project-wide localization layer exists.

## 12. Exact-course routing dependency

Only staged exact paid-course teacher/lesson content depends on the routing seam.

Reference:
- `SCHOOL_EXACT_COURSE_ROUTING_SEAM_PROPOSAL_v1.md`;
- `SCHOOL_EXACT_COURSE_ROUTING_LOCALIZATION_COMPATIBILITY_v1.md`;
- `SCHOOL_EXACT_COURSE_ROUTED_CONTENT_ACCEPTANCE_v1.md`.

Required behavior after Lead implementation:
- exact `school.course.*` identity stays locale-neutral;
- generic `actionCompleted:school` remains backward-compatible;
- exact course routes only matching teacher/course content;
- localized presentation resolves after routing;
- paid transaction remains exactly once.

## 13. Selective integration order after localization runtime lands

Recommended order:

1. **Integrate course UI keys**
   - use `school-ui-ru-en-v1.fixture.json`;
   - preserve exact numeric mechanics.

2. **Integrate generic reachable localization**
   - use `school-generic-localization-v2.fixture.json`;
   - bind keys to the existing generic School event;
   - run generic routing/reload/UI acceptance.

3. **Integrate exact Night localization**
   - use `school-night-localization-v2.fixture.json`;
   - bind keys to all 24 exact Night events;
   - run full Night identity/mechanics/reload matrix.

4. **Integrate shared media alt/caption keys**
   - no duplicated GIF assets per language;
   - preserve static fallback.

5. **Run cross-locale Save/reload tests**
   - RU -> EN;
   - EN -> RU;
   - pending generic/Night scenes;
   - same event/variant IDs.

6. **Review/implement exact paid-course routing seam**
   - only if Lead wants staged teacher/course automatic presentation.

7. **Promote staged teacher/course bundle**
   - strict production content;
   - exact course trigger;
   - one shared gameplay identity;
   - RU/EN key lookup.

8. **Integrate relationship content only after relationship IDs/routes are approved.**

9. **Keep Product-blocked result families absent until decisions are frozen.**

10. **Run full School regression + localization contract/UI acceptance.**

## 14. Product decisions still OPEN

Localization work does not decide:
- management/accounting provider;
- management/accounting threshold/form/value;
- management/accounting public-result ID/rule;
- Arcana/Forest scope/provider/threshold/result/consumer;
- certificate/project/exam participation;
- canonical teacher relationship IDs/stages;
- education-ending/Meta rules;
- final art style;
- final production GIF priority.

No localization key or translated prose should be treated as approval of an unresolved gameplay rule.

## 15. Locked mechanics remain identical in RU and EN

Unchanged:
- eight paid course IDs;
- track IDs;
- tuition;
- one current-day Energy per paid lesson;
- full stat packages;
- ordinary Lust behavior;
- paid `lessons_completed`;
- Night `night_study_sessions`;
- Night +2 selected supported stat;
- Night zero tuition/current-day Energy;
- next-day Energy -1;
- blocking School scene ownership;
- School/Lumber boundary;
- Lumber Hard Work independence;
- Palace unlock policy.

## 16. Queue items 127–135 exact deliverables

127.
- `docs/school-prep/SCHOOL_LOCALIZATION_KEY_INVENTORY_v1.md`

128.
- `prior-work/astra/prototype-m3.2/content/school-bilingual-migration-v1.fixture.json`

129.
- `prior-work/astra/prototype-m3.2/tests/school-localization-migration-v1.test.ts`

130.
- `prior-work/astra/prototype-m3.2/content/school-ui-ru-en-v1.fixture.json`

131.
- `prior-work/astra/prototype-m3.2/content/school-generic-localization-v2.fixture.json`

132.
- `prior-work/astra/prototype-m3.2/content/school-night-localization-v2.fixture.json`

133.
- `prior-work/astra/prototype-m3.2/content/school-teacher-course-localization-v2.fixture.json`

134.
- `docs/school-prep/SCHOOL_LOCALIZATION_PRODUCTION_READINESS_v1.md`

135.
- `docs/school-prep/SCHOOL_LOCALIZATION_UI_ACCEPTANCE_v1.md`

This file is item 136 and closes the requested 129–136 continuation for Lead selective integration after localization runtime lands.
