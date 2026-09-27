# School Presentation Semantic Coverage v3

Baseline: current `main` after PR42/PR43.

Real GIF inventory: **0**.

This audit includes only School identities that are actually reachable now. Teacher/course-specific authored media libraries that are not routed by current production remain **STAGED**.

## Reachable paid-lesson presentation slots

Each paid lesson writes the course's canonical semantic `presentationId` into the visible action result.

| Course | Reachable semantic presentation ID | Static fallback | Real GIFs | Real pool ready | Missing to 3 |
| --- | --- | --- | ---: | --- | ---: |
| Literacy & Numbers | `school/literacy-and-numbers/lesson/default` | `assets/stage-school.svg` | 0 | NO | 3 |
| Arcana | `school/arcana/lesson/default` | `assets/stage-school.svg` | 0 | NO | 3 |
| Rhetoric & Social | `school/rhetoric-and-social/lesson/default` | `assets/stage-school.svg` | 0 | NO | 3 |
| Etiquette & Presentation | `school/etiquette-and-presentation/lesson/default` | `assets/stage-school.svg` | 0 | NO | 3 |
| Field Craft | `school/field-craft/lesson/default` | `assets/stage-school.svg` | 0 | NO | 3 |
| Physical Training | `school/physical-training/lesson/default` | `assets/stage-school.svg` | 0 | NO | 3 |
| Arts & Performance | `school/arts-and-performance/lesson/default` | `assets/stage-school.svg` | 0 | NO | 3 |
| Body Confidence | `school/body-confidence/lesson/default` | `assets/stage-school.svg` | 0 | NO | 3 |

These eight semantic IDs are runtime course result identities. They do **not** imply that the staged teacher-specific media identities are reachable.

## Reachable generic School reaction slots

| Source event | Reachable presentation ID | Routing | Static fallback | Real GIFs | Missing to 3 |
| --- | --- | --- | --- | ---: | ---: |
| `school-lesson-content-v1.after-school` | `location/town/event/school-lesson-content-v1-after-school/default` | generic `actionCompleted: school` | `assets/stage-school.svg` | 0 | 3 |
| `school-life-content-v1.after-paid-lesson` | `location/town/event/school-life-content-v1-after-paid-lesson/default` | generic `actionCompleted: school` | `assets/stage-school.svg` | 0 | 3 |
| `school-life-content-v1.after-night-study` | `location/town/event/school-life-content-v1-after-night-study/default` | exact `school.night_study.*` completion triggers | `assets/stage-school.svg` | 0 | 3 |

## Exact Night-study trigger identities

Current Night study has **24 exact gameplay choice IDs**. They all route to the one reachable generic post-Night presentation slot above; current main does not expose a separate per-choice Night-study `presentationId`.

| Track | Exact Night choice IDs | Presentation surface |
| --- | --- | --- |
| Literacy & Numbers | `school.night_study.literacy_and_numbers.reason`<br>`school.night_study.literacy_and_numbers.wits` | `location/town/event/school-life-content-v1-after-night-study/default` |
| Arcana | `school.night_study.arcana.magic`<br>`school.night_study.arcana.reason`<br>`school.night_study.arcana.creativity` | same generic post-Night slot |
| Rhetoric & Social | `school.night_study.rhetoric_and_social.charm`<br>`school.night_study.rhetoric_and_social.sociability`<br>`school.night_study.rhetoric_and_social.wits` | same generic post-Night slot |
| Etiquette & Presentation | `school.night_study.etiquette_and_presentation.manners`<br>`school.night_study.etiquette_and_presentation.grooming`<br>`school.night_study.etiquette_and_presentation.charm` | same generic post-Night slot |
| Field Craft | `school.night_study.field_craft.dexterity`<br>`school.night_study.field_craft.wits`<br>`school.night_study.field_craft.creativity` | same generic post-Night slot |
| Physical Training | `school.night_study.physical_training.strength`<br>`school.night_study.physical_training.endurance`<br>`school.night_study.physical_training.dexterity` | same generic post-Night slot |
| Arts & Performance | `school.night_study.arts_and_performance.creativity`<br>`school.night_study.arts_and_performance.charm`<br>`school.night_study.arts_and_performance.sociability`<br>`school.night_study.arts_and_performance.dexterity` | same generic post-Night slot |
| Body Confidence | `school.night_study.body_confidence.sexuality`<br>`school.night_study.body_confidence.grooming`<br>`school.night_study.body_confidence.endurance` | same generic post-Night slot |

Media selection must not distinguish or alter the selected Night-study course/stat mechanics. A future media pool may be shared by the post-Night presentation identity without becoming the owner of the 24 gameplay choices.

## Teacher/course-specific media libraries remain STAGED

The following authored media identities remain **STAGED / NOT ROUTED**:
- `school/teacher/literacy-and-numbers/classroom`;
- `school/teacher/arcana/classroom`;
- `school/teacher/rhetoric-and-social/classroom`;
- `school/teacher/etiquette-and-presentation/classroom`;
- `school/teacher/field-craft/classroom`;
- `school/teacher/physical-training/classroom`;
- `school/teacher/arts-and-performance/classroom`;
- `school/teacher/body-confidence/classroom`.

They are not counted as current production slots and no real-GIF readiness claim is made for them.

## Summary

Reachable School presentation slots audited here:
- 8 paid-course lesson/result slots;
- 2 generic paid-School reaction slots;
- 1 generic post-Night-study reaction slot;
- total: **11 reachable presentation slots**.

All 11 have:
- real GIF count: **0**;
- real 3–5 pool readiness: **NO**;
- deficit to minimum pool size: **3 GIF candidates per slot**.

The Night layer has 24 exact gameplay choice identities, but they currently share one reachable post-Night presentation identity. Placeholder GIF paths are not counted.
