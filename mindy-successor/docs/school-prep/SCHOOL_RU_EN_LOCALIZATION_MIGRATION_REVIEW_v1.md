# School RU + EN Localization Migration / Review v1

Status: migration/review inventory created after the direct Product rule that the game ships in Russian and English.

Product rule:
- Russian is the source authoring language.
- English is the full second locale.
- Gameplay/content identity, semantic IDs, mechanics, RNG, eligibility, timing and Save identity are shared across locales.
- Language changes presentation/text only.
- Do not create duplicate gameplay events for English.

This file does not rewrite previously committed School authoring blindly. It records English-only / single-locale authored surfaces that predate the rule and must be migrated or reviewed before production inclusion.

## Priority A — production-oriented packs with player-facing text

These files contain player-facing titles, body text, labels and/or alt text and require RU-source + EN-locale migration before production shipping:

1. `prior-work/astra/prototype-m3.2/content/packs/school-target/school-teachers-v1.json`
   - teacher/classroom titles;
   - teacher presentation text;
   - Continue labels/text;
   - image alt text.

2. `prior-work/astra/prototype-m3.2/content/packs/school-target/school-lesson-content-v1.json`
   - repeatable lesson text;
   - event titles;
   - Continue labels/text;
   - image alt text;
   - generic post-School reflection.

3. `prior-work/astra/prototype-m3.2/content/packs/school-target/school-life-content-v1.json`
   - classroom/feedback/peer/post-lesson text;
   - Night-study flavor text;
   - titles;
   - labels;
   - alt text.

4. `prior-work/astra/prototype-m3.2/content/packs/school-target/school-lesson-content-v2.json`
   - v2 repeatable lesson text;
   - peer classroom text;
   - titles/labels;
   - alt text.

5. `prior-work/astra/prototype-m3.2/content/packs/school-target/school-night-content-v2.json`
   - Night-study track/stat presentation text;
   - housing-sensitive text;
   - titles/labels;
   - alt text.

6. `prior-work/astra/prototype-m3.2/content/packs/school-target/school-generic-reachable-v2.json`
   - generic post-paid-lesson text;
   - event title;
   - Continue label/text;
   - alt text.

7. `prior-work/astra/prototype-m3.2/content/packs/school-target/school-night-exact-v3.json`
   - exact 24-route Night-study text;
   - event titles;
   - Continue labels/text;
   - track Night-study alt text.

Migration rule for Priority A:
- preserve every pack/event/media ID;
- preserve every trigger;
- preserve every condition;
- preserve every effect array;
- preserve event priority/delivery;
- replace direct player-facing strings with the approved shared localization representation once Lead defines/uses it;
- RU text becomes source;
- EN text remains full semantic equivalent;
- do not fork events by locale.

## Priority B — authored source text banks

These are source authoring documents and must receive RU-source + EN pairing before their prose is promoted into production:

- `docs/school-prep/SCHOOL_REPEATABLE_LESSON_TEXT_BANK_v1.md`
- `docs/school-prep/SCHOOL_MILESTONE_NEUTRAL_SCENE_BANK_v1.md`
- `docs/school-prep/SCHOOL_TEACHER_LESSON_TEXT_BANK_v2.md`
- `docs/school-prep/SCHOOL_NIGHT_STUDY_TEXT_BANK_v2.md`
- `docs/school-prep/SCHOOL_PEER_CLASSROOM_EVENT_BANK_v1.md`
- `docs/school-prep/SCHOOL_TEACHER_RELATIONSHIP_SCENES_v1.md`
- `docs/school-prep/SCHOOL_GENERIC_POST_LESSON_CONTENT_BANK_v2.md`
- `docs/school-prep/SCHOOL_NIGHT_STUDY_EXACT_ROUTE_CONTENT_V3.md`

For each authored scene:
- add Russian source copy;
- add English counterpart;
- keep one semantic scene/variant identity;
- do not translate IDs;
- do not change mechanics while translating;
- preserve teacher voice and meaning rather than literal word-for-word structure when needed.

## Priority C — teacher identity / relationship authoring

Review these before teacher identities become canonical production content:

- `docs/school-prep/SCHOOL_CANONICAL_TEACHER_CONTENT_DRAFT_v1.md`
- `prior-work/astra/prototype-m3.2/content/school-teacher-identities-v1.fixture.json`
- `docs/school-prep/SCHOOL_TEACHER_RELATIONSHIP_SEEDS_v1.md`
- `docs/school-prep/SCHOOL_TEACHER_PRESENTATION_BRIEFS_v1.md`
- `docs/school-prep/SCHOOL_TEACHER_PRESENTATION_IDENTITY_INVENTORY_v1.md`

Review points:
- teacher canonical IDs stay language-neutral;
- proper names stay the same unless Product explicitly authorizes localized display forms;
- player-facing role labels/descriptions require RU + EN;
- relationship-scene prose requires RU + EN;
- alt-text seeds require RU + EN;
- visual briefs themselves may remain internal English documentation, but any text shipped to the player must be localized.

## Priority D — presentation planning containing player-facing fallback/alt seeds

Review when converted into shipped presentation metadata:

- `docs/school-prep/SCHOOL_MULTI_GIF_CONTENT_DENSITY_MAP_v1.md`
- `docs/school-prep/SCHOOL_MULTI_GIF_REACHABLE_STAGED_SPLIT_v2.md`

The planning prose itself is internal. Only:
- alt text;
- captions;
- fallback text;
- scene labels shown to the player

must enter the locale system.

## Tests / acceptance migration

Existing School tests written before the RU+EN rule should be extended when localized production content is integrated.

Required localization acceptance:
1. the same event ID is used in RU and EN;
2. the same variant ID is used in RU and EN;
3. the same choice ID is used in RU and EN;
4. the same media semantic ID is used in RU and EN unless the presentation layer explicitly supports locale-specific media resources under one semantic content identity;
5. language switching does not change trigger eligibility;
6. language switching does not change RNG/materialized variant selection;
7. language switching does not change tuition, Energy, stats, Lust, School progress, world facts, relationships, careers or Night mechanics;
8. Save/reload keeps gameplay identity independent of locale;
9. a Save created in RU can reload in EN at the same gameplay state, and vice versa;
10. no English duplicate event exists solely to provide English text.

## Routing-specific guard

The exact-course routing proposal remains language-neutral.

If Lead later adds an exact paid-course public reaction trigger:
- exact `school.course.*` identity is shared by RU and EN;
- matching teacher/course event ID is shared;
- localized text is selected only at presentation time;
- generic `actionCompleted:school` remains locale-neutral.

Night-study exact route IDs also remain shared:
- `school.night_study.*` is not localized.

## Mechanics guard

Localization migration must not change:
- the eight paid courses;
- tuition;
- one current-day Energy per paid lesson;
- stat packages;
- ordinary Lust behavior;
- paid `lessons_completed`;
- Night `night_study_sessions`;
- Night +2 supported stat;
- Night zero tuition/current-day Energy;
- next-day Energy -1;
- School/Lumber boundaries;
- Hard Work independence;
- Palace unlock policy.

## Product decisions still OPEN

Localization does not resolve:
- management/accounting provider/threshold/public result;
- Arcana/Forest provider/threshold/public result/scope;
- certificates/projects/exams participation;
- teacher relationship route IDs/stages;
- education ending/Meta details;
- final art style.

## Migration completion definition

Previously committed School player-facing authoring is localization-ready only when:
- every production-facing string has RU source + EN locale representation;
- no gameplay identity is duplicated by language;
- localized content passes strict content validation;
- save/reload and cross-locale state equivalence are covered by tests;
- all locked School mechanics remain unchanged.

Until then, Priority A packs remain staging/selective-integration candidates rather than localization-complete production content.
