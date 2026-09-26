# School Presentation Depth Gap v1

Status: Product Acceptance content-depth gap matrix.
Scope: compare the current eight-course School surface with the PA requirement for track / teacher / presentation / progress.

## 1. PA requirement

`docs/PRODUCT_ACCEPTANCE_SLICE_v0.md`, School requirement:
- track;
- teacher/presentation;
- progress;
- at least one milestone/public fact;
- that fact affects Lumber progression.

This document separates structural School surface that already exists from content-depth that is still missing.

## 2. Current eight-course surface

All eight courses already have:
- stable gameplay `courseId`;
- stable `school.track.*` ownership;
- player-facing course label;
- tuition;
- current-day Energy cost;
- locked stat package;
- semantic kebab-case lesson `presentationId`;
- supported Night-study stat set;
- typed School progress contract for `lessons_completed` and `night_study_sessions`.

Therefore the School surface is no longer an anonymous `pay -> +stat` table.

## 3. Gap matrix

| PA dimension | Current status | Evidence | Remaining gap |
|---|---|---|---|
| Track | SHIPPED CONTRACT | eight stable `school.track.*` IDs map 1:1 to eight gameplay courses | none for identity/ownership |
| Teacher | CONTENT-DEPTH GAP | no canonical teacher identity exists in current School course/catalog contract | author final teacher identities, roles, voice and course association |
| Presentation identity | SHIPPED CONTRACT | eight `school/<kebab-course>/lesson/default` IDs plus Night presentation families | none for semantic slot identity |
| Presentation depth | CONTENT-DEPTH GAP | semantic slots exist, but teacher-led authored lesson scenes/copy/media are not locked by Chat 5 | author production presentation content without changing gameplay mechanics |
| Progress | SHIPPED CONTRACT | per-track `lessons_completed`, `night_study_sessions` and reserved School-owned fields are defined in compatibility/exactly-once contracts | shared activation/persistence is Lead-owned; content milestones remain separate |
| Milestone/public fact | AUTHORING GAP | public transport exists; final School public fact IDs and authorial thresholds remain OPEN | author at least one final milestone/public result satisfying PA |
| Lumber effect | BOUNDARY READY / AUTHORING GAP | `statChanged` and `worldFactAdded` boundaries are defined | final authored School public fact consumed by Lumber is still OPEN |

## 4. Teacher gap

Current production School data intentionally does **not** define:
- teacher ID;
- teacher name;
- teacher portrait/media;
- teacher relationship identity;
- teacher-specific prerequisite;
- teacher-specific milestone threshold.

That absence is intentional. Earlier task constraints explicitly kept teachers/lore authorial.

To close the teacher depth gap, content authoring should provide a stable teacher/presenter identity for the required playable School slice. It must not:
- change the eight gameplay course IDs;
- change tuition/Energy/stat packages;
- add an ordinary-course prerequisite;
- invent a milestone threshold merely to justify a teacher scene.

## 5. Presentation depth gap

Semantic presentation routing is already stable:
- paid lesson: `school/<course>/lesson/default`;
- Night study: `school/night-study/<course>/default`.

What is still missing for richer product presentation:
- authored lesson scene text;
- teacher/presenter voice;
- approved media slot content;
- optional course-specific result copy;
- authored milestone/public-fact scene content.

These are content-depth gaps, not reasons to create new gameplay IDs.

## 6. Progress versus milestone content

Progress ownership is already specified:
- paid lesson -> `lessons_completed +1`;
- Night study -> `night_study_sessions +1`;
- exactly-once across reload.

That does not imply any final milestone threshold.

Still OPEN:
- how many lessons, if any, a milestone requires;
- stat combinations;
- project/exam requirements;
- certificate names/effects;
- final management/accounting and Arcana/forest public fact IDs.

## 7. Acceptance closure target

The teacher/presentation dimension is ready for Product Acceptance when:
1. at least one required School slice has approved teacher/presenter content;
2. the semantic presentation slot resolves to authored content;
3. School-owned progress is visible/understandable to the player;
4. at least one authored milestone/public fact is published exactly once;
5. Lumber reacts through the public boundary without a manual job visit.

No teacher identity, milestone threshold, certificate, or public fact ID is chosen by this gap document.
