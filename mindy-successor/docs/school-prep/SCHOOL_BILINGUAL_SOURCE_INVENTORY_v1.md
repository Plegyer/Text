# School Bilingual Source Inventory v1

Status: RU+EN localization inventory for all currently authored School player-facing content.
Product rule: Russian is the source authoring language, English is the full second locale, and gameplay/content identity is shared across locales.

Classification:
- **REACHABLE_NOW** — current public routing can naturally reach the authored content.
- **STAGED** — authored content exists but is not yet naturally/production reachable under current routing/inclusion.
- **PRODUCT_BLOCKED** — player-facing content depends on an unresolved Product decision and must not be invented.

## Teacher identities

Source files:
- `SCHOOL_CANONICAL_TEACHER_CONTENT_DRAFT_v1.md`
- `school-teacher-identities-v1.fixture.json`
- `school-teachers-v1.json`
- `SCHOOL_TEACHER_PRESENTATION_BRIEFS_v1.md`
- `SCHOOL_TEACHER_RELATIONSHIP_SEEDS_v1.md`
- `SCHOOL_TEACHER_RELATIONSHIP_SCENES_v1.md`

Current drafted identities:
- `school.teacher.mara-fen` — Mara Fen;
- `school.teacher.ilyra-venn` — Ilyra Venn;
- `school.teacher.cassian-reed` — Cassian Reed;
- `school.teacher.eliane-marrow` — Eliane Marrow;
- `school.teacher.rowan-pike` — Rowan Pike;
- `school.teacher.tovan-kest` — Tovan Kest;
- `school.teacher.nessa-lark` — Nessa Lark;
- `school.teacher.sera-vey` — Sera Vey.

Classification: **STAGED**.

RU+EN required for:
- player-facing name;
- role/short bio;
- teacher presentation title/text;
- relationship/social scenes if promoted;
- teacher media alt text.

Shared across locales:
- teacher content ID;
- course/track assignment;
- relationship hook identity if later approved;
- visual identity;
- gameplay/routing identity.

## Repeatable lesson content

Source files:
- `SCHOOL_REPEATABLE_LESSON_TEXT_BANK_v1.md`
- `SCHOOL_TEACHER_LESSON_TEXT_BANK_v2.md`
- `school-lesson-content-v1.json`
- `school-lesson-content-v2.json`

Coverage:
- 8 tracks;
- 3 v1 variants per track;
- 4 v2 variants per track;
- 56 repeatable authored lesson variants total.

Classification:
- course-specific lesson libraries: **STAGED**;
- generic post-School presentation embedded in v1/v2 packs: **REACHABLE_NOW** where the generic `actionCompleted:school` route is used.

RU+EN required for:
- lesson body text;
- player-visible title where shipped;
- choice label/text;
- media alt text.

Shared across locales:
- event IDs;
- variant IDs;
- course/track IDs;
- triggers;
- conditions;
- effects;
- semantic presentation identity.

## Generic post-lesson content

Source files:
- `SCHOOL_GENERIC_POST_LESSON_CONTENT_BANK_v2.md`
- `school-generic-reachable-v2.json`

Classification: **REACHABLE_NOW**.

Reason:
- current public routing exposes `actionCompleted:school`;
- this content intentionally makes no course-specific teacher/track claim.

RU+EN required for:
- event title;
- 10 generic post-lesson variants;
- Continue label/text;
- media alt text.

Shared:
- `school.generic.reachable.v2.after.school`;
- variant IDs;
- `school.generic.reachable.v2.classroom`;
- trigger/effects/delivery.

## Exact Night-study content

Source files:
- `SCHOOL_NIGHT_STUDY_TEXT_BANK_v2.md`
- `SCHOOL_NIGHT_STUDY_EXACT_ROUTE_CONTENT_V3.md`
- `school-night-content-v2.json`
- `school-night-exact-v3.json`

Classification: **REACHABLE_NOW**.

Reason:
- the existing 24 `school.night_study.<course>.<stat>` identities are exact and locale-neutral;
- current `nightChoiceCompleted` routing can match them directly.

RU+EN required for:
- Night event title where player-visible;
- all Night presentation variants;
- Continue label/text;
- media alt text.

Shared:
- exact Night choice ID;
- event ID;
- variant ID;
- supported stat identity;
- all Night mechanics and effects.

## Peer / classroom scenes

Source files:
- `SCHOOL_PEER_CLASSROOM_EVENT_BANK_v1.md`
- `SCHOOL_MILESTONE_NEUTRAL_SCENE_BANK_v1.md`
- peer/context library inside `school-life-content-v1.json`;
- generic peer event inside `school-lesson-content-v2.json`.

Classification:
- generic peer/post-lesson scenes using `actionCompleted:school`: **REACHABLE_NOW**;
- track-specific peer/classroom libraries without exact paid-course routing: **STAGED**.

RU+EN required for every promoted:
- scene text;
- title;
- choice label/text;
- alt text/caption.

No locale-specific relationship or milestone consequence may be added.

## Relationship scenes

Source files:
- `SCHOOL_TEACHER_RELATIONSHIP_SEEDS_v1.md`
- `SCHOOL_TEACHER_RELATIONSHIP_SCENES_v1.md`
- `SCHOOL_TEACHER_RELATIONSHIP_BOUNDARY_TEMPLATE_v1.md`

Classification: **STAGED** for drafted optional content, with route/state details **PRODUCT_BLOCKED**.

Product-blocked fields:
- canonical relationship IDs;
- route/stage labels;
- relationship thresholds;
- romance/friendship/mentor scope;
- ending/Meta relevance.

RU+EN required once promoted:
- first-impression/repeated-contact text;
- trust/friction scenes;
- invitations;
- relationship-owned choices and results.

Shared:
- relationship identity and state machine;
- School teacher identity;
- triggers/conditions/effects;
- Save state.

## Staged exact-course paid-lesson libraries

Source files:
- `school-teachers-v1.json`;
- `school-lesson-content-v1.json`;
- `school-lesson-content-v2.json`;
- `SCHOOL_STAGED_LIBRARY_ROUTING_INVENTORY_v1.md`;
- `SCHOOL_EXACT_COURSE_ROUTING_SEAM_PROPOSAL_v1.md`.

Classification: **STAGED**.

Reason:
- current paid School public reaction is generic `actionCompleted:school`;
- exact `school.course.*` identity is not yet exposed to authored event routing;
- course/teacher-specific routing would otherwise be ambiguous.

Localization rule:
- exact course identity remains locale-neutral;
- localized text is selected only after gameplay routing;
- no RU/EN duplicate event IDs.

## Presentation alt text

Current authored/staged media families requiring RU+EN alt text:
- `school/teacher/<track>/classroom`;
- `school/<track>/lesson/authored`;
- `school/<track>/lesson/v2`;
- `school/lesson/context/default`;
- `school/life/classroom/default`;
- `school/life/night-study/default`;
- `school.generic.reachable.v2.classroom`;
- `school.night.exact.v3.media.<track>`;
- staged Night v2 media surfaces.

Classification:
- alt text attached to currently routable generic/Night surfaces: **REACHABLE_NOW**;
- teacher/course-specific alt text: **STAGED**;
- milestone/certificate/project/exam/public-result alt text: **PRODUCT_BLOCKED** until those authored identities exist.

## Product-blocked authored families

The following player-facing content must stay **PRODUCT_BLOCKED** until Product selects its underlying meaning:
- management/accounting provider/milestone/result scenes;
- Arcana/Forest provider/milestone/result scenes if retained;
- certificate award scenes;
- project scenes;
- exam scenes;
- education-specific endings;
- teacher relationship stage/ending content;
- Palace/Meta School-result scenes not yet decided.

Localization cannot be used to invent these decisions.

## Bilingual identity contract

For every School player-facing authored unit:
- one gameplay/event/content identity;
- one semantic presentation identity;
- RU source text;
- EN equivalent text;
- identical triggers;
- identical conditions;
- identical effects;
- identical RNG/materialized variant identity;
- identical Save identity.

Forbidden:
- `.ru` / `.en` duplicate gameplay event IDs solely for localization;
- locale-specific mechanics;
- locale-specific eligibility;
- locale-specific public-result publication;
- locale-specific School progress.

## Migration priority

1. REACHABLE_NOW generic post-lesson content.
2. REACHABLE_NOW exact Night-study content.
3. STAGED teacher identities/presentation.
4. STAGED repeatable paid-lesson libraries.
5. STAGED peer/relationship content.
6. PRODUCT_BLOCKED milestone/public-result/ending content only after Product decisions.

This inventory changes no mechanics.
