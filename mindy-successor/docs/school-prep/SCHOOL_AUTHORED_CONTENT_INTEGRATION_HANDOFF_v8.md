# School Authored Content Integration Handoff v8

Status: selective Lead handoff for Queue items 82–88.

## Teacher draft identities

Proposed CONTENT_DRAFT identities:

- `school.teacher.mara-fen` — Mara Fen — Literacy & Numbers;
- `school.teacher.ilyra-venn` — Ilyra Venn — Arcana;
- `school.teacher.cassian-reed` — Cassian Reed — Rhetoric & Social;
- `school.teacher.eliane-marrow` — Eliane Marrow — Etiquette & Presentation;
- `school.teacher.rowan-pike` — Rowan Pike — Field Craft;
- `school.teacher.tovan-kest` — Tovan Kest — Physical Training;
- `school.teacher.nessa-lark` — Nessa Lark — Arts & Performance;
- `school.teacher.sera-vey` — Sera Vey — Body Confidence.

Authority files:
- `docs/school-prep/SCHOOL_CANONICAL_TEACHER_CONTENT_DRAFT_v1.md`;
- `prior-work/astra/prototype-m3.2/content/school-teacher-identities-v1.fixture.json`.

These identities remain CONTENT_DRAFT until Lead chooses to integrate them into production content.

## Text banks ready for selective integration

### Repeatable paid-lesson copy

`docs/school-prep/SCHOOL_REPEATABLE_LESSON_TEXT_BANK_v1.md`

Contains:
- three short reusable variants for every one of the eight tracks;
- consistent teacher voice;
- no alternate tuition/Energy/stat effects;
- no milestone prerequisite;
- no public-result semantics.

This content can be converted into production presentation data without a new runtime primitive.

### Milestone-neutral School-life scenes

`docs/school-prep/SCHOOL_MILESTONE_NEUTRAL_SCENE_BANK_v1.md`

Contains:
- arrival/classroom moments;
- teacher feedback;
- peer/context moments;
- post-lesson reactions;
- Night-study flavor seeds.

These scenes intentionally avoid unresolved exam/project/certificate/milestone semantics.

## Optional relationship content

`docs/school-prep/SCHOOL_TEACHER_RELATIONSHIP_SEEDS_v1.md`

Contains optional first-impression, repeated-contact, Night/social and career/world reaction seeds for each drafted teacher.

Integration rule:
- relationship content is optional;
- it does not gate ordinary paid lessons;
- relationship state remains relationship-owned;
- durable cross-system progression requires an approved public boundary.

Relationship IDs/routes remain Product/Lead authoring work.

## Presentation briefs

`docs/school-prep/SCHOOL_TEACHER_PRESENTATION_BRIEFS_v1.md`

Contains:
- portrait/static seeds;
- optional lightweight GIF ideas;
- classroom/location motifs;
- semantic School presentation context;
- reuse opportunities;
- alt-text seeds.

Final art style is still OPEN.

Content can ship with text/static fallback before GIF polish.

## Consistency evidence

`docs/school-prep/SCHOOL_AUTHORED_CONTENT_CONSISTENCY_AUDIT_v1.md`

Audit result:
- teacher/course/track mapping consistent;
- locked tuition unchanged;
- Energy unchanged;
- stat packages unchanged;
- no Lust-gain claim;
- paid/Night counters not mixed;
- no teacher prerequisite;
- no management/accounting result selected;
- no Arcana/Forest result selected;
- no milestone/certificate/project/exam completion implied;
- presentation remains mechanic-independent.

The audit is a content review, not an executed runtime test run.

## What remains Product-blocked

Still requires explicit Product/human decision:
- management/accounting School provider;
- management/accounting milestone form/value;
- final management public-result identity/rule;
- whether Arcana/Forest School public result remains in scope;
- Arcana/Forest provider and milestone form/value;
- exact direct Forest consumer if retained;
- whether certificates/projects/exams participate in the minimum authored School path;
- canonical relationship routes for any teacher;
- education-ending/Meta details;
- any final-art priority declared release-blocking.

The drafted teacher identities themselves require Lead acceptance before they become canonical production identities.

## What can ship as content without new runtime

After Lead accepts the proposed teacher identities and converts/includes the content in production data:
- repeatable teacher-led lesson text;
- milestone-neutral classroom moments;
- teacher feedback;
- post-lesson presentation;
- Night-study flavor copy;
- static/text teacher presentation;
- optional non-progression relationship flavor that fits existing scene/relationship surfaces.

These do not require changing tuition, Energy, stat packages, counters, schema, or shared School transaction logic.

## Selective integration file list

Primary content candidates:
1. `docs/school-prep/SCHOOL_CANONICAL_TEACHER_CONTENT_DRAFT_v1.md`
2. `prior-work/astra/prototype-m3.2/content/school-teacher-identities-v1.fixture.json`
3. `docs/school-prep/SCHOOL_REPEATABLE_LESSON_TEXT_BANK_v1.md`
4. `docs/school-prep/SCHOOL_MILESTONE_NEUTRAL_SCENE_BANK_v1.md`
5. `docs/school-prep/SCHOOL_TEACHER_PRESENTATION_BRIEFS_v1.md`

Optional relationship candidate:
6. `docs/school-prep/SCHOOL_TEACHER_RELATIONSHIP_SEEDS_v1.md`

Review evidence:
7. `docs/school-prep/SCHOOL_AUTHORED_CONTENT_CONSISTENCY_AUDIT_v1.md`

Implementation support:
8. `docs/school-prep/SCHOOL_POST_DECISION_IMPLEMENTATION_MAP_v1.md`
9. `docs/school-prep/SCHOOL_PRODUCTION_PACK_FILE_LAYOUT_v1.md`
10. `docs/school-prep/SCHOOL_AUTHORED_PACK_INCLUSION_PLAN_v1.md`

## Recommended integration boundary for Lead review

Integrate selectively rather than copying every Chat 5 planning document.

Suggested production conversion:
- accept/revise teacher IDs first;
- convert only approved teacher and lesson text into explicit School production pack(s);
- attach stable semantic presentation IDs and fallback references;
- keep optional relationship seeds separate;
- do not integrate unresolved public-result/milestone placeholders as production data.

## Locked mechanics preserved

Nothing in this handoff changes:
- eight paid courses;
- current course/track IDs;
- tuition;
- paid Energy;
- stat packages;
- ordinary Lust behavior;
- paid `lessons_completed`;
- Night `night_study_sessions`;
- locked Night-study values;
- blocking School scene sequencing;
- Hard Work independence;
- Palace unlock rules.

## Runtime boundary

No new runtime is required for the authored copy/presentation material in this handoff.

Create runtime/schema work only if later approved Product behavior cannot be represented and a failing integration test demonstrates the missing primitive.
