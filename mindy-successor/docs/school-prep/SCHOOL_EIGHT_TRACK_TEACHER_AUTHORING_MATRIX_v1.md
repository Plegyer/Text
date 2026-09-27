# School Eight-Track Teacher Authoring Matrix v1

Status: structured OPEN authoring matrix for all eight School tracks.

No canonical teacher/presenter identity is selected here. Existing course mechanics, stat packages, IDs and presentation routes remain unchanged.

## Locked mechanics reference

- `school.course.literacy_and_numbers` -> `school.track.literacy_and_numbers`; tuition 300; Energy 1; stats reason +4, wits +2; presentation `school/literacy-and-numbers/lesson/default`.
- `school.course.arcana` -> `school.track.arcana`; tuition 500; Energy 1; stats magic +4, reason +4, creativity +2; presentation `school/arcana/lesson/default`.
- `school.course.rhetoric_and_social` -> `school.track.rhetoric_and_social`; tuition 300; Energy 1; stats charm +3, sociability +3, wits +2; presentation `school/rhetoric-and-social/lesson/default`.
- `school.course.etiquette_and_presentation` -> `school.track.etiquette_and_presentation`; tuition 400; Energy 1; stats manners +3, grooming +3, charm +2; presentation `school/etiquette-and-presentation/lesson/default`.
- `school.course.field_craft` -> `school.track.field_craft`; tuition 400; Energy 1; stats dexterity +3, wits +3, creativity +2; presentation `school/field-craft/lesson/default`.
- `school.course.physical_training` -> `school.track.physical_training`; tuition 400; Energy 1; stats strength +3, endurance +3, dexterity +2; presentation `school/physical-training/lesson/default`.
- `school.course.arts_and_performance` -> `school.track.arts_and_performance`; tuition 500; Energy 1; stats creativity +3, charm +3, sociability +2, dexterity +2; presentation `school/arts-and-performance/lesson/default`.
- `school.course.body_confidence` -> `school.track.body_confidence`; tuition 400; Energy 1; stats sexuality +3, grooming +3, endurance +2; presentation `school/body-confidence/lesson/default`.

## Teacher / presenter authoring matrix

| Track | Course | Teacher / presenter identity | Role in world | Lesson tone | Relationship hooks | Milestone role | Presentation needs |
|---|---|---|---|---|---|---|---|
| `school.track.literacy_and_numbers` | Literacy & Numbers | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** |
| `school.track.arcana` | Arcana | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** |
| `school.track.rhetoric_and_social` | Rhetoric & Social | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** |
| `school.track.etiquette_and_presentation` | Etiquette & Presentation | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** |
| `school.track.field_craft` | Field Craft | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** |
| `school.track.physical_training` | Physical Training | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** |
| `school.track.arts_and_performance` | Arts & Performance | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** |
| `school.track.body_confidence` | Body Confidence | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** |

Every **OPEN** cell is a Product/authoring decision.

## Field guidance

### Teacher / presenter identity

Fill:
- canonical content ID;
- player-facing name;
- whether the same presenter serves more than one track.

Do not create a teacher prerequisite for ordinary paid lessons solely because a teacher is authored.

### Role in world

Examples of acceptable shape:
- School instructor;
- visiting practitioner;
- guild/civic specialist;
- performer/trainer;
- another authored in-world role.

This is a role-shape field, not a preferred answer.

### Lesson tone

Describe authored presentation tone only. It must not silently change tuition, Energy, stat gain, Lust, or typed progress.

### Relationship hooks

Optional. If authored:
- relationship state remains independently owned;
- a relationship may react to School results through public/explicit boundaries;
- ordinary School availability must not gain an unapproved relationship prerequisite.

### Milestone role

Describe whether the teacher/presenter participates in:
- none;
- lesson-count milestone presentation;
- exam;
- project;
- certificate;
- mixed authored gate.

The actual milestone type/threshold remains OPEN until separately decided.

### Presentation needs

Record:
- portrait/static image need;
- lesson still;
- optional GIF;
- text fallback.

Semantic presentation IDs remain the locked course IDs shown above.

## Acceptance guardrails

For every track:
- course ID unchanged;
- track ID unchanged;
- tuition unchanged;
- current-day Energy cost remains 1;
- stat package unchanged;
- ordinary School Lust mutation remains absent;
- paid lesson still increments only `lessons_completed`;
- Night study remains separate;
- semantic presentation ID unchanged;
- missing teacher/media content cannot be misreported as shipped canonical authoring.
