# School Bilingual Integration Handoff v12

Status: selective Lead handoff for Queue items 118–125.
Product rule: Russian is source authoring, English is the full second locale, and one locale-neutral gameplay/content identity serves both languages.

## 1. RU+EN authored source files

### Bilingual inventory

`docs/school-prep/SCHOOL_BILINGUAL_SOURCE_INVENTORY_v1.md`

Classifies current School authored surfaces as:
- REACHABLE_NOW;
- STAGED;
- PRODUCT_BLOCKED.

It covers:
- teacher identities;
- repeatable lessons;
- generic post-lesson content;
- exact Night-study content;
- peer/classroom scenes;
- relationship scenes;
- staged exact-course libraries;
- presentation alt text.

### Teacher identities RU+EN

`docs/school-prep/SCHOOL_TEACHER_IDENTITIES_RU_EN_v1.md`

Contains paired RU+EN player-facing identity material for all eight drafted teachers under one locale-neutral ID each:
- `school.teacher.mara-fen`;
- `school.teacher.ilyra-venn`;
- `school.teacher.cassian-reed`;
- `school.teacher.eliane-marrow`;
- `school.teacher.rowan-pike`;
- `school.teacher.tovan-kest`;
- `school.teacher.nessa-lark`;
- `school.teacher.sera-vey`.

Shared across locales:
- course/track assignment;
- gameplay role;
- visual identity;
- semantic content identity.

### Repeatable lesson RU+EN bank

`docs/school-prep/SCHOOL_REPEATABLE_LESSONS_RU_EN_v1.md`

Contains:
- all eight School tracks;
- seven current repeatable lesson variants per track;
- 56 paired RU+EN lesson identities total;
- one shared semantic lesson identity for both locales.

No locale-specific mechanics or milestone requirements are introduced.

## 2. Currently safe bilingual staging payloads

### Generic post-paid-lesson bilingual sidecar

`prior-work/astra/prototype-m3.2/content/packs/school-target/school-generic-reachable-bilingual-v1.json`

Pairs RU+EN presentation payload with the existing locale-neutral gameplay pack:
- `school.generic.reachable.v2`.

Shared gameplay identity:
- event: `school.generic.reachable.v2.after.school`;
- media: `school.generic.reachable.v2.classroom`;
- existing generic trigger: `actionCompleted:school`.

Contains paired RU+EN:
- title;
- 10 variant texts;
- Continue label/text;
- media alt text.

Status:
- **LOCALIZATION_SIDECAR_NOT_RUNTIME_PACK**.

### Exact Night-study bilingual sidecar

`prior-work/astra/prototype-m3.2/content/packs/school-target/school-night-exact-bilingual-v1.json`

Pairs RU+EN presentation payload with:
- `school.night.exact.v3`.

Coverage:
- all 24 existing exact Night-study choice IDs;
- three localized presentation variants per exact route;
- RU+EN title;
- RU+EN choice label/text;
- RU+EN media alt text.

Locked Night mechanics recorded unchanged:
- tuition 0;
- current-day Energy 0;
- selected supported stat +2;
- next-day Energy -1;
- `lessons_completed +0`;
- `night_study_sessions +1`.

Status:
- **LOCALIZATION_SIDECAR_NOT_RUNTIME_PACK**.

## 3. Current runtime/schema localization limitation

Current strict pack schema stores player-facing:
- event `title`;
- variant `text`;
- choice `label`;
- choice `text`;
- media `alt`

as single strings.

There is currently no shared RU/EN locale map represented by the strict pack schema.

Therefore Queue items 121–122 intentionally:
- do not edit shared schema/runtime;
- do not duplicate gameplay events by locale;
- bind paired localization payload to existing locale-neutral event/variant/media IDs;
- remain outside `loadCatalog` until Lead provides a shared localization layer.

This is an authoring limitation, not a School mechanics limitation.

## 4. Bilingual authoring contract test

`prior-work/astra/prototype-m3.2/tests/school-bilingual-content-contract.test.ts`

Authoring-level coverage includes:
- all eight teacher identities contain RU + EN authoring;
- 56 repeatable lesson identities have paired RU + EN text;
- generic bilingual sidecar has one shared gameplay event;
- exact Night bilingual sidecar covers the same 24 locale-neutral Night routes;
- RU/EN variant key sets match;
- no locale-specific effects/conditions/rewards appear in the sidecars;
- locked paid-course tuition/Energy/stat packages remain unchanged;
- locked Night mechanics remain unchanged.

Important:
- the test explicitly does **not** claim runtime locale selection exists yet;
- Chat 5 authored the test but did not run npm/CI in this conversation.

## 5. Safe production-ready gameplay surfaces vs localization-ready payload

Gameplay routing already safe today:

### Generic post-paid-lesson
- gameplay pack: `school-generic-reachable-v2.json`;
- route: `actionCompleted:school`;
- generic course-neutral presentation only.

### Exact Night study
- gameplay pack: `school-night-exact-v3.json`;
- route: exact existing `nightChoiceCompleted` IDs;
- 24 exact course/stat identities.

What is not yet runtime-ready:
- RU/EN selection inside the strict content runtime.

After a shared localization layer exists, the new bilingual payloads can be integrated without changing School mechanics or gameplay IDs.

## 6. Staged teacher/course content

Still staged:
- `school-teachers-v1.json`;
- `school-lesson-content-v1.json`;
- `school-lesson-content-v2.json`;
- teacher relationship authored scenes.

Two independent seams remain relevant:

### Exact paid-course routing seam
Needed so a paid School lesson can expose the exact existing `school.course.*` identity to authored presentation routing without guessing from stats/costs.

Proposal:
- `SCHOOL_EXACT_COURSE_ROUTING_SEAM_PROPOSAL_v1.md`.

### Shared localization seam
Needed so one routed gameplay event/variant resolves RU or EN text without duplicating event IDs or effects.

Compatibility review:
- `SCHOOL_EXACT_COURSE_ROUTING_LOCALIZATION_COMPATIBILITY_v1.md`.

The two seams must remain orthogonal:
- gameplay routing selects identity first;
- localization selects presentation text afterward.

## 7. Bilingual multi-GIF mapping

`docs/school-prep/SCHOOL_BILINGUAL_MULTI_GIF_MAPPING_v1.md`

Shared 3–5 GIF candidate pools:
1. generic classroom wrap-up;
2. quiet Night study;
3. practical demonstration / controlled movement;
4. Arcana observation;
5. Arts / performance rehearsal.

For each pool the file provides:
- one shared semantic media identity;
- RU alt text;
- EN alt text;
- RU caption/context;
- EN caption/context;
- one shared static fallback.

Teacher-specific staged visual identities are also mapped with RU+EN alt/caption pairs.

No GIF asset is duplicated solely by language.

## 8. Exact Lead localization seam needed

The smallest acceptable shared localization implementation should:
1. preserve all gameplay/event/variant/choice/media semantic IDs;
2. keep conditions/effects/routing in one locale-neutral definition;
3. resolve RU/EN presentation only after gameplay selection/materialization;
4. provide validation that required RU and EN strings both exist;
5. keep RNG/materialized variant selection locale-independent;
6. keep Save identity locale-independent;
7. allow a Save made in RU to reload in EN at the same School gameplay state, and vice versa;
8. avoid a School-specific localization mechanism if a shared project-wide locale layer exists or is planned.

Possible internal representation is a Lead/runtime decision:
- localization keys + shared locale table;
- centralized localized presentation lookup;
- another shared project-wide method.

Chat 5 does not choose the shared implementation shape.

## 9. Exact-course routing + localization acceptance

When both seams exist, acceptance should prove:

`paid School transaction -> locale-neutral exact course routing -> locale-neutral event/variant materialization -> localized RU/EN presentation`.

Required:
- exact course route same in RU and EN;
- generic `actionCompleted:school` still works;
- same event/variant under identical gameplay state/RNG;
- no locale-specific progress/public-result behavior;
- no Save migration required solely for language;
- resolving localized presentation cannot replay payment/progress.

## 10. Selective integration order

Recommended dependency order:

1. **Run/validate existing safe gameplay packs**
   - `school-generic-reachable-v2.json`;
   - `school-night-exact-v3.json`;
   - their routing/reload tests.

2. **Review bilingual authoring**
   - teacher RU+EN identities;
   - repeatable RU+EN lessons;
   - bilingual source inventory;
   - bilingual contract test.

3. **Implement/choose shared project localization seam**
   - not School-specific if avoidable.

4. **Wire bilingual sidecars into the approved shared locale representation**
   - generic post-lesson first;
   - exact Night second.

5. **Run cross-locale Save/reload acceptance**
   - RU -> EN;
   - EN -> RU;
   - pending scene preserved;
   - same event/variant identity.

6. **Review exact paid-course routing seam**
   - add only if/when Lead wants teacher/course-specific automatic paid-lesson presentation.

7. **Promote staged teacher/course content**
   - convert staged packs to the strict approved localization representation;
   - use exact course identity;
   - preserve one event identity across RU/EN.

8. **Hand bilingual media mapping to Chat2**
   - shared GIF/static identity;
   - localized alt/caption;
   - no duplicate assets per locale.

9. **Run full School regression**
   - all eight paid courses;
   - all 24 Night choices;
   - save/reload;
   - typed progress;
   - no Lust mutation;
   - Hard Work independence;
   - cross-locale identity equivalence.

## 11. Product decisions still OPEN

RU+EN authoring does not resolve:
- management/accounting School provider;
- management/accounting milestone form/value;
- final management public-result identity/rule;
- Arcana/Forest scope;
- Arcana/Forest provider/milestone/value/public result;
- direct Forest consumer if retained;
- certificate/project/exam participation;
- canonical teacher relationship route IDs/stages;
- education ending/Meta content;
- final visual art style;
- final asset priority.

Do not localize an invented answer to an unresolved Product decision.

## 12. Locked mechanics remain shared

Across RU and EN, unchanged:
- eight paid course IDs;
- track IDs;
- tuition;
- one current-day Energy per paid lesson;
- stat packages;
- ordinary Lust behavior;
- paid `lessons_completed`;
- Night `night_study_sessions`;
- Night +2 supported stat;
- Night zero tuition/current-day Energy;
- next-day Energy -1;
- School/Lumber public/private boundary;
- Lumber Hard Work independence;
- Palace unlock policy.

## 13. Queue 118–125 exact file list

1. `docs/school-prep/SCHOOL_BILINGUAL_SOURCE_INVENTORY_v1.md`
2. `docs/school-prep/SCHOOL_TEACHER_IDENTITIES_RU_EN_v1.md`
3. `docs/school-prep/SCHOOL_REPEATABLE_LESSONS_RU_EN_v1.md`
4. `prior-work/astra/prototype-m3.2/content/packs/school-target/school-generic-reachable-bilingual-v1.json`
5. `prior-work/astra/prototype-m3.2/content/packs/school-target/school-night-exact-bilingual-v1.json`
6. `prior-work/astra/prototype-m3.2/tests/school-bilingual-content-contract.test.ts`
7. `docs/school-prep/SCHOOL_BILINGUAL_MULTI_GIF_MAPPING_v1.md`
8. `docs/school-prep/SCHOOL_EXACT_COURSE_ROUTING_LOCALIZATION_COMPATIBILITY_v1.md`

This handoff is item 126 and closes the currently assigned bilingual School batch unless Lead appends additional queue items.
