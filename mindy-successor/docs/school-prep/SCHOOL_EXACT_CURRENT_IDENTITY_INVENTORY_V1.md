# School Exact-Current Identity Inventory v1

Date: 2026-09-29
Owner: Chat 5 / School + Text Localization Content Worker
Task: C5-01
Exact inspected `main` baseline: `921abfa79f4dba9c0acee4eca6724c3ed122d42f`
Working branch: `chat5/school-queue-v2`

## Scope

This is an inventory-only task. It does not add player-facing School content, mechanics, progression, facts, courses, teachers, prices, presentation routes, Save fields, NightFlow behavior, career transitions, Forest content, or Lumber transitions.

PR #66 (`Chat 5: School residual localization 193-204`) is treated as `MERGED_HISTORY`. Its merge commit is `58590df8f6f16e87560fa2b845c25ba9f8f50849`; current `main` is a descendant. The PR changed School audit/handoff fixtures/tests, not root `content/localization.json`. C5-01 does not re-author or restart that queue.

## Classification

- `ACTIVE` — loaded/reachable current production identity or current persisted runtime state.
- `MERGED_HISTORY` — already delivered/merged work useful as provenance, not a new task.
- `REUSABLE` — existing authored identity/data that may be reused by later queue items without inventing a parallel system.
- `MISSING_CONSUMER` — an existing producer/content identity has no current production route that consumes or displays it.
- `MISSING_PRODUCER` — a current consumer exists, but no current production School source emits the required result.
- `STALE` — legacy compatibility identity/mechanics still present but not the current first-class School path.
- `BLOCKED_BY_PRODUCT_DECISION` — a missing canonical value/route is explicitly still open and must not be invented by Chat 5.

Classifications can be combined where both statements are true.

## Production loading boundary

`scripts/build.mjs` loads only direct JSON files under `content/packs/*.json`. Nested `content/packs/school-target/*` and `content/packs/lumber-target/*` are not production-loaded by that bootstrap.

Current root School-bearing production packs are:

- `content/packs/base.json` — legacy School event/content; `STALE` compatibility source.
- `content/packs/school-lesson-content-v1.json` — `ACTIVE` generic post-paid-lesson presentation event.
- `content/packs/school-life-content-v1.json` — `ACTIVE` generic paid-lesson and Night-study presentation events.
- `content/packs/school-teachers-v1.json` — current catalog-loaded teacher media only; media identities are present but not routed to a current event/presentation consumer.
- `content/packs/lumber-cross-production.json` — `ACTIVE` downstream Lumber consumer seam for one School management result.

## Current School command/action identities

| Identity | Classification | Exact-current meaning |
|---|---|---|
| `schoolLesson` command | `ACTIVE` | First-class paid School command dispatched by the School UI with an exact course ID. |
| `school` / `SCHOOL_ACTION_ID` | `ACTIVE` | Reaction/action-history identity written by first-class paid School lessons (`actionCompleted: school`, `actionCounts.school`). |
| `definitions.actions[id=school]` | `STALE` | Legacy generic Alchemy lesson: 18 coins, legacy `lessons`/`intelligence`; current School panel does not dispatch it. It shares the string `school` with the active reaction identity and must not be mistaken for the current course mechanics. |
| `definitions.actions[id=exam]` | `STALE` | Legacy exam driven by legacy metrics and `school.exam`; not the typed eight-track milestone system. |

## Exact current courses and tracks

All eight rows are `ACTIVE`. These IDs and mechanics already exist; C5-01 introduces none of them.

| Course ID | Track ID | Tuition | Paid lesson stat effects | Paid result presentation ID |
|---|---|---:|---|---|
| `school.course.literacy_and_numbers` | `school.track.literacy_and_numbers` | 300 | reason +4; wits +2 | `school/literacy-and-numbers/lesson/default` |
| `school.course.arcana` | `school.track.arcana` | 500 | magic +4; reason +4; creativity +2 | `school/arcana/lesson/default` |
| `school.course.rhetoric_and_social` | `school.track.rhetoric_and_social` | 300 | charm +3; sociability +3; wits +2 | `school/rhetoric-and-social/lesson/default` |
| `school.course.etiquette_and_presentation` | `school.track.etiquette_and_presentation` | 400 | manners +3; grooming +3; charm +2 | `school/etiquette-and-presentation/lesson/default` |
| `school.course.field_craft` | `school.track.field_craft` | 400 | dexterity +3; wits +3; creativity +2 | `school/field-craft/lesson/default` |
| `school.course.physical_training` | `school.track.physical_training` | 400 | strength +3; endurance +3; dexterity +2 | `school/physical-training/lesson/default` |
| `school.course.arts_and_performance` | `school.track.arts_and_performance` | 500 | creativity +3; charm +3; sociability +2; dexterity +2 | `school/arts-and-performance/lesson/default` |
| `school.course.body_confidence` | `school.track.body_confidence` | 400 | sexuality +3; grooming +3; endurance +2 | `school/body-confidence/lesson/default` |

Paid lessons cost exactly 1 current-day Energy and increment only the owning track's `lessons_completed` counter by 1. That is existing runtime behavior and is recorded here only as identity/progress context.

## Exact current School progress identities

| Progress/state identity | Classification | Producer / visibility |
|---|---|---|
| `run.progression.school.tracks` | `ACTIVE` | Schema-4 persisted map keyed by track ID. |
| `trackId` | `ACTIVE` | Persisted exact `school.track.*` identity. |
| `counters.lessons_completed` | `ACTIVE` | Paid School lesson producer. |
| `counters.night_study_sessions` | `ACTIVE` | School Night-study producer. |
| `facts[]` | `MISSING_PRODUCER` | Persisted field exists, but current School effect vocabulary has no `addSchoolFact` producer. |
| `milestones[]` | `MISSING_PRODUCER` | Persisted field exists, but no current production School milestone producer was found. |
| `certificates[]` | `MISSING_PRODUCER` | Persisted field exists, but no current production School certificate producer was found. |
| `choices{}` | `MISSING_PRODUCER` | Persisted field exists, but no current School choice writer was found. |

No active named School milestone fact/certificate ID is currently produced by the live School path. This is a current-state finding, not permission to invent one.

## Save/reload-visible School state

The following School-related identities survive through existing Save/runtime structures and are therefore `ACTIVE` save/reload-visible state:

- `run.progression.school.tracks[trackId].counters.lessons_completed`;
- `run.progression.school.tracks[trackId].counters.night_study_sessions`;
- `run.historyState.actionCounts.school` after paid lessons;
- `run.flow.lastAction.id = school` and the exact course `lastAction.presentationId` after a paid lesson;
- `run.flow.night.selectedNightChoiceId` while NightFlow persists a selected `school.night_study.*` choice;
- persisted `pendingScene`/reaction state when a School reaction scene is open.

`school` progression defaults to `{tracks:{}}` in schema 4. Legacy-v3 migration also creates an empty typed School map. Existing PR #27 schema-4 omission regressions are `MERGED_HISTORY`; C5-01 does not change Save or migration behavior.

## Exact current Night-study choice IDs

All 24 identities below are `ACTIVE`. Each gives +2 to the named supported stat, increments only `night_study_sessions` for the owning track, costs no tuition/current-day Energy, and carries next-day Energy delta -1 through the existing NightFlow contract.

### Literacy & Numbers

- `school.night_study.literacy_and_numbers.reason`
- `school.night_study.literacy_and_numbers.wits`

### Arcana

- `school.night_study.arcana.magic`
- `school.night_study.arcana.reason`
- `school.night_study.arcana.creativity`

### Rhetoric & Social

- `school.night_study.rhetoric_and_social.charm`
- `school.night_study.rhetoric_and_social.sociability`
- `school.night_study.rhetoric_and_social.wits`

### Etiquette & Presentation

- `school.night_study.etiquette_and_presentation.manners`
- `school.night_study.etiquette_and_presentation.grooming`
- `school.night_study.etiquette_and_presentation.charm`

### Field Craft

- `school.night_study.field_craft.dexterity`
- `school.night_study.field_craft.wits`
- `school.night_study.field_craft.creativity`

### Physical Training

- `school.night_study.physical_training.strength`
- `school.night_study.physical_training.endurance`
- `school.night_study.physical_training.dexterity`

### Arts & Performance

- `school.night_study.arts_and_performance.creativity`
- `school.night_study.arts_and_performance.charm`
- `school.night_study.arts_and_performance.sociability`
- `school.night_study.arts_and_performance.dexterity`

### Body Confidence

- `school.night_study.body_confidence.sexuality`
- `school.night_study.body_confidence.grooming`
- `school.night_study.body_confidence.endurance`

Night-study player-facing labels are composed by the current UI from `ui.school.nightStudyChoice`, the localized course label, and shared `stat.<id>.label`; there are no required per-choice localization keys.

## Current production School event identities

| Event ID | Classification | Current trigger / role |
|---|---|---|
| `school-lesson-content-v1.after-school` | `ACTIVE` | Nonblocking presentation after `actionCompleted: school`; effect-free choice `continue`. |
| `school-life-content-v1.after-paid-lesson` | `ACTIVE` | Nonblocking presentation after `actionCompleted: school`; effect-free choice `continue`. |
| `school-life-content-v1.after-night-study` | `ACTIVE` | Nonblocking presentation after completion of any of the 24 exact School Night-study IDs; effect-free choice `continue`. |
| `base.school` | `STALE` | Legacy `trigger: [school]` event gated by `school.enrolled`; still root-loaded, but belongs to the old Alchemy/flag path rather than typed eight-track School. |

Two active paid-lesson presentation events currently listen to the same generic `actionCompleted: school` boundary. They do not identify the exact course. C5-01 only records that fact.

## Existing teacher identities and teacher-scene routing

PR #38 and the authored School handoff are `MERGED_HISTORY`; the authored identities are `REUSABLE`. They are not promoted here into new canon/mechanics.

| Track | Existing drafted teacher content ID | Root-loaded teacher media ID | Current classification |
|---|---|---|---|
| Literacy & Numbers | `school.teacher.mara-fen` | `school.teacher.literacy-and-numbers.classroom` | content ID `REUSABLE`/`MERGED_HISTORY`; media `MISSING_CONSUMER` |
| Arcana | `school.teacher.ilyra-venn` | `school.teacher.arcana.classroom` | content ID `REUSABLE`/`MERGED_HISTORY`; media `MISSING_CONSUMER` |
| Rhetoric & Social | `school.teacher.cassian-reed` | `school.teacher.rhetoric-and-social.classroom` | content ID `REUSABLE`/`MERGED_HISTORY`; media `MISSING_CONSUMER` |
| Etiquette & Presentation | `school.teacher.eliane-marrow` | `school.teacher.etiquette-and-presentation.classroom` | content ID `REUSABLE`/`MERGED_HISTORY`; media `MISSING_CONSUMER` |
| Field Craft | `school.teacher.rowan-pike` | `school.teacher.field-craft.classroom` | content ID `REUSABLE`/`MERGED_HISTORY`; media `MISSING_CONSUMER` |
| Physical Training | `school.teacher.tovan-kest` | `school.teacher.physical-training.classroom` | content ID `REUSABLE`/`MERGED_HISTORY`; media `MISSING_CONSUMER` |
| Arts & Performance | `school.teacher.nessa-lark` | `school.teacher.arts-and-performance.classroom` | content ID `REUSABLE`/`MERGED_HISTORY`; media `MISSING_CONSUMER` |
| Body Confidence | `school.teacher.sera-vey` | `school.teacher.body-confidence.classroom` | content ID `REUSABLE`/`MERGED_HISTORY`; media `MISSING_CONSUMER` |

The root `school-teachers-v1.json` pack currently has these eight media records and `events: []`. No current production presentation slot or active event found in the root catalog routes to those teacher media IDs.

The nested non-production `school-target/school-teachers-v1.json` also contains these authored teacher presentation event IDs:

- `school-teachers-v1.literacy-and-numbers.presentation`
- `school-teachers-v1.arcana.presentation`
- `school-teachers-v1.rhetoric-and-social.presentation`
- `school-teachers-v1.etiquette-and-presentation.presentation`
- `school-teachers-v1.field-craft.presentation`
- `school-teachers-v1.physical-training.presentation`
- `school-teachers-v1.arts-and-performance.presentation`
- `school-teachers-v1.body-confidence.presentation`

Those event IDs are `REUSABLE` + `MISSING_CONSUMER`, not `ACTIVE`: the nested pack is not root-loaded and the current reaction boundary does not expose exact paid-course identity for safe teacher routing.

## Existing authored exact-course lesson libraries

The nested non-production `school-target/school-lesson-content-v1.json` contains one authored event library per track with three variants, but current production deliberately keeps them untriggered because the generic `actionCompleted: school` reaction does not expose the exact paid course. These are `REUSABLE` + `MISSING_CONSUMER`:

- `school-lesson-content-v1.literacy-and-numbers`
- `school-lesson-content-v1.arcana`
- `school-lesson-content-v1.rhetoric-and-social`
- `school-lesson-content-v1.etiquette-and-presentation`
- `school-lesson-content-v1.field-craft`
- `school-lesson-content-v1.physical-training`
- `school-lesson-content-v1.arts-and-performance`
- `school-lesson-content-v1.body-confidence`

The generic production event `school-lesson-content-v1.after-school` is the currently reachable effect-free bridge and remains `ACTIVE`.

## Current School presentation consumers

### Paid lesson slots — `ACTIVE`

| Presentation ID | Static asset | Active localization consumer |
|---|---|---|
| `school/literacy-and-numbers/lesson/default` | `assets/presentation/school-course-literacy-and-numbers.svg` | `presentation.static.school-course-literacy-and-numbers.alt` |
| `school/arcana/lesson/default` | `assets/presentation/school-course-arcana.svg` | `presentation.static.school-course-arcana.alt` |
| `school/rhetoric-and-social/lesson/default` | `assets/presentation/school-course-rhetoric-and-social.svg` | `presentation.static.school-course-rhetoric-and-social.alt` |
| `school/etiquette-and-presentation/lesson/default` | `assets/presentation/school-course-etiquette-and-presentation.svg` | `presentation.static.school-course-etiquette-and-presentation.alt` |
| `school/field-craft/lesson/default` | `assets/presentation/school-course-field-craft.svg` | `presentation.static.school-course-field-craft.alt` |
| `school/physical-training/lesson/default` | `assets/presentation/school-course-physical-training.svg` | `presentation.static.school-course-physical-training.alt` |
| `school/arts-and-performance/lesson/default` | `assets/presentation/school-course-arts-and-performance.svg` | `presentation.static.school-course-arts-and-performance.alt` |
| `school/body-confidence/lesson/default` | `assets/presentation/school-course-body-confidence.svg` | `presentation.static.school-course-body-confidence.alt` |

### Event slots — `ACTIVE`

- `location/town/event/school-lesson-content-v1-after-school/default` -> `assets/presentation/school-day-study.svg` -> `presentation.static.school.day.alt`.
- `location/town/event/school-life-content-v1-after-paid-lesson/default` -> `assets/presentation/school-day-study.svg` -> `presentation.static.school.day.alt`.
- `location/town/event/school-life-content-v1-after-night-study/default` -> `assets/presentation/school-night-study-generic-v2.svg` -> `presentation.static.school-night-study-generic-v2.alt`.

The current `mediaHTML()` consumer resolves a selected candidate's `altKey` through localization and writes it to the image `alt` attribute. Current presentation `.caption` localization keys have no renderer consumer and are therefore `MISSING_CONSUMER`. The older `presentation.static.school.night-study.*` pair is also not the current generic-v2 Night-study slot and is `STALE`/unconsumed in the inspected production routing.

## Exact current player-facing School localization identities

Current root localization contains 67 School-specific keys: 10 UI, 16 course, 16 event, 3 pack-media alt, and 22 presentation static keys. RU and EN values exist for all 67 current root keys.

### School UI — `ACTIVE`

- `ui.panel.school`
- `ui.town.school.subtitle`
- `ui.school.title`
- `ui.school.help`
- `ui.school.lessonButton`
- `ui.school.lessonResult`
- `ui.school.tuitionEnergy`
- `ui.school.nightStudyButton`
- `ui.school.nightStudyChoice`
- `ui.school.nightStudyContext`

### Course labels/descriptions — `ACTIVE`

- `school.course.literacy_and_numbers.label`
- `school.course.literacy_and_numbers.description`
- `school.course.arcana.label`
- `school.course.arcana.description`
- `school.course.rhetoric_and_social.label`
- `school.course.rhetoric_and_social.description`
- `school.course.etiquette_and_presentation.label`
- `school.course.etiquette_and_presentation.description`
- `school.course.field_craft.label`
- `school.course.field_craft.description`
- `school.course.physical_training.label`
- `school.course.physical_training.description`
- `school.course.arts_and_performance.label`
- `school.course.arts_and_performance.description`
- `school.course.body_confidence.label`
- `school.course.body_confidence.description`

### Active School event localization — `ACTIVE`

- `event.school-lesson-content-v1.after-school.title`
- `event.school-lesson-content-v1.after-school.variant.default.text`
- `event.school-lesson-content-v1.after-school.choice.continue.label`
- `event.school-lesson-content-v1.after-school.choice.continue.text`
- `event.school-life-content-v1.after-paid-lesson.title`
- `event.school-life-content-v1.after-paid-lesson.variant.default.text`
- `event.school-life-content-v1.after-paid-lesson.choice.continue.label`
- `event.school-life-content-v1.after-paid-lesson.choice.continue.text`
- `event.school-life-content-v1.after-night-study.title`
- `event.school-life-content-v1.after-night-study.variant.default.text`
- `event.school-life-content-v1.after-night-study.choice.continue.label`
- `event.school-life-content-v1.after-night-study.choice.continue.text`

### Legacy base-School localization — `STALE`

- `event.base.school.title`
- `event.base.school.variant.lesson.text`
- `event.base.school.choice.listen.label`
- `event.base.school.choice.listen.text`

### Active pack-media alt localization — `ACTIVE`

- `media.school.lesson.context.default.alt`
- `media.school.life.classroom.default.alt`
- `media.school.life.night-study.default.alt`

### Presentation localization

`ACTIVE` alt consumers:

- `presentation.static.school-course-literacy-and-numbers.alt`
- `presentation.static.school-course-arcana.alt`
- `presentation.static.school-course-rhetoric-and-social.alt`
- `presentation.static.school-course-etiquette-and-presentation.alt`
- `presentation.static.school-course-field-craft.alt`
- `presentation.static.school-course-physical-training.alt`
- `presentation.static.school-course-arts-and-performance.alt`
- `presentation.static.school-course-body-confidence.alt`
- `presentation.static.school-night-study-generic-v2.alt`
- `presentation.static.school.day.alt`

`MISSING_CONSUMER` caption keys under the current renderer:

- `presentation.static.school-course-literacy-and-numbers.caption`
- `presentation.static.school-course-arcana.caption`
- `presentation.static.school-course-rhetoric-and-social.caption`
- `presentation.static.school-course-etiquette-and-presentation.caption`
- `presentation.static.school-course-field-craft.caption`
- `presentation.static.school-course-physical-training.caption`
- `presentation.static.school-course-arts-and-performance.caption`
- `presentation.static.school-course-body-confidence.caption`
- `presentation.static.school-night-study-generic-v2.caption`
- `presentation.static.school.day.caption`

`STALE`/currently unconsumed older Night-study static pair:

- `presentation.static.school.night-study.alt`
- `presentation.static.school.night-study.caption`

Night-study composition also consumes the existing shared localized stat labels `stat.reason.label`, `stat.wits.label`, `stat.magic.label`, `stat.creativity.label`, `stat.charm.label`, `stat.sociability.label`, `stat.manners.label`, `stat.grooming.label`, `stat.dexterity.label`, `stat.strength.label`, `stat.endurance.label`, and `stat.sexuality.label`. These are `ACTIVE` shared localization consumers rather than School-owned keys.

### PR #66 residual note — `MERGED_HISTORY`

PR #66 already prepared/audited corrections for four active accessibility alt identities: Literacy & Numbers RU course-name parity, Arcana EN article, Etiquette & Presentation RU course-name parity + EN article, and Arts & Performance EN article. Its merged files are docs/fixtures/tests; root localization values on the inspected `main` are not rewritten by that PR. C5-01 records the active consumer identities but does not duplicate the 193–204 authoring queue.

## Career-facing School facts and Lumber consumer seams

### Management/leadership seam

| Identity | Classification | Current state |
|---|---|---|
| `lumber.school.management-ready` | `ACTIVE` consumer + `MISSING_PRODUCER` + `BLOCKED_BY_PRODUCT_DECISION` | Root `lumber-cross.school-management-return` listens for `worldFactAdded` and requires the fact plus professional Foreman route. No active root School producer for this world fact was found. Product has not selected the School provider/milestone/threshold/final publication rule. |
| `lumber-cross.school-management-return` | `ACTIVE` | Downstream Lumber event consuming the public world fact. |
| `management-school-ready` | `ACTIVE` downstream career fact | Written to `career:lumber` by choice `apply` after the consumer event opens. |
| `forewoman-problem-resolved` | `ACTIVE` downstream career fact | Written alongside `management-school-ready`. |

A full scan of active root definitions and direct production packs found no `addWorldFact` effect producing a School/Lumber-School fact. Therefore the management seam is an existing consumer with a real missing School-side producer, not a reason to create a new fact during C5-01.

`SCHOOL_MANAGEMENT_RESULT_DECISION_SCHEMA_v1.md` explicitly leaves provider, milestone/result type, threshold/value, and final durable public result identity/rule open. `lumber.school.management-ready` is the current consumer transport key, not proof of a selected School producer.

### Forest/knowledge/magic seam

Existing current Forest/Lumber result identities are:

- activity `lumber.forest` — `ACTIVE`;
- success result `lumber.forest.success` — `ACTIVE`;
- world fact `lumber.forest.truth-known` — `ACTIVE` Activity result output;
- event `lumber-cross.activity-forest-return` — `ACTIVE` post-Activity Lumber consumer;
- downstream career facts `forest-truth-known` and `forest-problem-resolved` — `ACTIVE` outputs of that Lumber event.

There is no current canonical direct Arcana-School public-result ID and no current direct Arcana-School-to-Forest consumer. That School handoff is `MISSING_CONSUMER` + `BLOCKED_BY_PRODUCT_DECISION`. The Arcana decision schema explicitly leaves provider/milestone, threshold, final public result ID, Night-study contribution, and direct Forest consumer/open option undecided.

Conceptual mapping from the existing cross-system design draft is `REUSABLE` only: Literacy & Numbers is the existing School capability family for accounting/leadership-style preparation; Arcana is the existing knowledge/magic/reasoning family for Forest interpretation. This does not create a new course, fact, threshold, or route.

## Fixture-only / historical School-to-career identities

The nested `school-target/school-production.pack.json` contains a fixture event `school-production.arcana-package-observer` and synthetic career `school.fixture.career`, with fixture career fact `qualified_by_school`. These are `MERGED_HISTORY`/`REUSABLE` test evidence for the generic cross-system observation pattern, not production Lumber identities.

No fixture-only School fact or threshold is promoted by this inventory.

## Legacy School identities still present in current root content

| Identity | Classification | Reason |
|---|---|---|
| `school.enrolled` | `STALE` | Legacy base event flag; not typed eight-track progression. |
| `school.exam` | `STALE` | Legacy exam/ending flag; not a current School milestone fact. |
| `exam` action | `STALE` | Legacy metrics-based School exam. |
| `scholar-life` ending dependency on `school.exam` | `STALE` | Legacy ending path retained in root content; does not define a current School milestone provider. |
| legacy generic `school` action mechanics | `STALE` | 18-coin Alchemy/legacy intelligence path; quarantined from current School UI. |

These identities remain compatibility/history concerns. C5-01 does not remove or rewrite them.

## C5-01 conclusions

1. Current first-class School is one existing eight-course/eight-track runtime path with two persisted counters per track family: `lessons_completed` and `night_study_sessions`.
2. All 24 Night-study identities are already active and routed through current NightFlow definitions.
3. Generic paid-lesson and Night-study presentation events are active; exact-course authored lesson/teacher libraries exist but currently lack a safe exact-course reaction consumer.
4. Teacher content IDs/media already exist. Root teacher media is loaded but unconsumed; nested teacher events are authored/reusable but not production-routed.
5. The Save schema can persist School facts/milestones/certificates/choices, but current production School has no writer for those fields.
6. The current Lumber management seam is real and already consumes `lumber.school.management-ready`, but no active School producer exists. Selecting the provider/milestone/threshold/publication remains a Product decision.
7. The Arcana/Forest School handoff has neither a final public producer identity nor a direct consumer; both are explicitly Product-open.
8. Legacy Alchemy School flags/actions/events remain in root content and must not be confused with current typed School progression.
9. PR #66 / queue 193–204 remains merged history and is not restarted.

## Inputs inspected

- `src/core/school.ts`
- `src/core/schema.ts`
- `src/core/engine.ts`
- `src/ui/app.ts`
- `scripts/build.mjs`
- `content/definitions.json`
- `content/localization.json`
- `content/presentation.json`
- root `content/packs/*.json` production bootstrap set
- nested `content/packs/school-target/*` historical/staging content
- `SCHOOL_AUTHORED_PRODUCTION_HANDOFF_v9.md`
- `SCHOOL_CURRENT_PRESENTATION_IDENTITY_INVENTORY_V2.md`
- `SCHOOL_RESIDUAL_LOCALIZATION_CONSUMER_MAP_V1.md`
- `SCHOOL_MANAGEMENT_RESULT_DECISION_SCHEMA_v1.md`
- `SCHOOL_ARCANA_FOREST_RESULT_DECISION_SCHEMA_v1.md`
- `LUMBER_CROSS_SYSTEM_HOOKS_v1.md`
- merged PR #66 changed-file set and ancestry against current `main`.
