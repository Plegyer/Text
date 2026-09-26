# School Presentation Slot Catalog v1

Status: isolated School presentation-data preparation for Chat 5.
Scope: stable presentation IDs and fallback categories only; no asset files, teacher canon, or active wiring.
Authority: GIF_CENTRAL_STAGE_CONTRACT_v1.md, SCHOOL_SYSTEM_v2.md, EXECUTABLE_TZ_v1.md.

## 1. Contract

School mechanics emit stable presentation IDs. Presentation data may later map those IDs to GIF, static image, parent fallback, neutral location fallback, or text-only rendering.

No School mechanic depends on an asset filename, GIF duration, animation frame, or teacher identity.

Fallback priority remains:

1. requested GIF;
2. static image for the same presentation;
3. parent/event fallback;
4. neutral School/location fallback;
5. text-only central stage.

All IDs below are reusable slots. They reserve presentation attachment points; they do not assert that a unique asset exists.

## 2. Repeatable lesson slots

Each baseline track has one generic repeatable lesson slot:

| Track ID | Lesson presentation ID | Static fallback category |
|---|---|---|
| school.track.literacy_and_numbers | school/literacy_and_numbers/lesson/default | school.lesson.study |
| school.track.arcana | school/arcana/lesson/default | school.lesson.arcana |
| school.track.rhetoric_and_social | school/rhetoric_and_social/lesson/default | school.lesson.social |
| school.track.etiquette_and_presentation | school/etiquette_and_presentation/lesson/default | school.lesson.presentation |
| school.track.field_craft | school/field_craft/lesson/default | school.lesson.practical |
| school.track.physical_training | school/physical_training/lesson/default | school.lesson.physical |
| school.track.arts_and_performance | school/arts_and_performance/lesson/default | school.lesson.performance |
| school.track.body_confidence | school/body_confidence/lesson/default | school.lesson.body_confidence |

A later content pass may add seasonal, milestone-aware, or authored variants below these IDs. The ordinary lesson action must remain mechanically identical when a more specific presentation is unavailable.

Recommended variant namespace:

- school/<track_slug>/lesson/<variant_id>

The default slot is always the safe presentation fallback for the track.

## 3. Milestone, project, and exam slots

Generic track-level attachment points:

- school/<track_slug>/milestone/<milestone_id>
- school/<track_slug>/project/<project_id>
- school/<track_slug>/exam/<exam_id>
- school/<track_slug>/certificate/<certificate_id>

Because milestone IDs, projects, exams, certificate names, and teacher fiction remain authorial OPEN decisions, this catalog does not invent concrete suffixes.

Reusable fallback categories:

| Slot family | Static fallback category |
|---|---|
| milestone | school.milestone.generic |
| project | school.project.generic |
| exam | school.exam.generic |
| certificate | school.certificate.generic |

A milestone/exam presentation is a media replacement in the central stage. It does not add Energy cost unless the authored mechanic explicitly defines a separate paid action. Reactive milestone scenes after a paid lesson remain 0 additional Energy under the accepted action-cost model.

## 4. Teacher/dialogue placeholder slots

Presentation placeholders may be reserved without defining identity:

- school/<track_slug>/teacher/primary/dialogue
- school/<track_slug>/teacher/secondary/dialogue

Fallback category:
- school.teacher.placeholder

These are content attachment points only. No name, species, appearance, personality, relationship role, or lore is fixed by this prep packet.

## 5. Night-study slots

Night study is represented separately from a daytime paid lesson:

- school/night_study/<track_slug>/default

Fallback category:
- school.night_study.generic

The presentation must not imply that night study is a free daytime lesson. Its accepted mechanical identity is:
- Night slot consumed;
- no normal tuition;
- +2 to one supported stat;
- next-day Energy -1;
- no automatic certificate completion.

## 6. Special stat-conversion service slots

The late correction service uses presentation slots independent of ordinary tracks:

- school/conversion_service/entry
- school/conversion_service/select_source
- school/conversion_service/select_destination
- school/conversion_service/confirm
- school/conversion_service/result

Fallback categories:

| Slot | Static fallback category |
|---|---|
| entry | school.service.conversion.entry |
| selection | school.service.conversion.selection |
| confirm | school.service.conversion.confirm |
| result | school.service.conversion.result |

No final NPC, room, fiction, unlock explanation, or money fee is defined here.

Mechanical presentation assumptions remain limited to the accepted candidate service:
- source and destination are different progression stats;
- Lust is excluded;
- conversion ratio is 2 source points for 1 destination point.

Whether the successor exposes x1/x2/x3 batch controls is not fixed by this catalog.

## 7. Global School fallback categories

Stable fallback categories for incomplete media production:

- school.location.default
- school.lesson.study
- school.lesson.arcana
- school.lesson.social
- school.lesson.presentation
- school.lesson.practical
- school.lesson.physical
- school.lesson.performance
- school.lesson.body_confidence
- school.milestone.generic
- school.project.generic
- school.exam.generic
- school.certificate.generic
- school.teacher.placeholder
- school.night_study.generic
- school.service.conversion.entry
- school.service.conversion.selection
- school.service.conversion.confirm
- school.service.conversion.result

These categories are labels for future presentation mapping, not asset paths.

## 8. Acceptance notes

This catalog is compatible with one persistent central media window:
- a paid School lesson can show its track lesson slot;
- a resolver-triggered milestone can replace that media at 0 additional Energy;
- a teacher or certificate scene can replace it again;
- missing GIF/static media falls back without changing mechanics;
- save/reload of a pending School scene should preserve its resolved presentation ID when the shared presentation contract requires it.
