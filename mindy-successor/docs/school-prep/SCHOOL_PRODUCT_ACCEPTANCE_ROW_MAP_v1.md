# School Product Acceptance Row Map v1

Status: Chat 5 Product Acceptance mapping contract.
Scope: School commands, gameplay IDs, Night-study choices, Resolver boundaries, and reload checkpoints. No shared runtime/schema/build/UI changes.

## 1. Product Acceptance source rows

Source: `docs/PRODUCT_ACCEPTANCE_SLICE_v0.md`.

| PA location | Requirement | School mapping |
|---|---|---|
| Required player flow, lines 34–35 | School lesson -> School result triggers career/relationship continuation | Paid course transaction -> Resolver in the same action boundary. Current executable seam: `executeSchoolLesson(input, courseId, catalog, runtime)`. Expected production command after activation: `{type:'schoolLesson', courseId}`. |
| UI requirements, lines 58–66 | Energy/money visible; deltas understandable; pending event blocks incompatible actions | Picker contract exposes tuition, Energy cost 1, stat package and disabled states. A pending scene disables paid School selection. |
| Economy requirements, line 72 | At least one School cost | Every paid course has locked tuition and costs exactly 1 current-day Energy. Night study is not a paid daytime lesson. |
| School requirement, lines 80–87 | Track, presentation, progress, at least one milestone/public fact, public result affects Lumber | Eight stable `school.track.*` mappings; semantic lesson presentation IDs; School-owned `lessons_completed` / `night_study_sessions`; public cross-system transport through `worldFacts` / future domain-public equivalent. Final authored public fact IDs remain OPEN. |
| Save checkpoints, lines 149–153 | Deterministic reload, including after lodging before Night choice | `parseSave(...)` checkpoint after `chooseLodging`, before `chooseNightChoice`; additional School tests cover after paid lesson, after Night choice and after day advance. |
| Failure condition, line 162 | School must not require a manual job visit to trigger already-earned progression | Resolver sees the complete paid School package immediately. Relevant Lumber stat/public-fact reactions happen at the same resolver boundary and cost no extra School/Lumber action. |
| Failure condition, line 168 | Reload must not reroll pending event | Pending Night/Resolver checkpoints preserve selected event/choice state across `parseSave`. |

## 2. Paid School command/course mapping

Current isolated executable API:

`executeSchoolLesson(input, courseId, catalog, runtime)`

Production command contract after shared activation:

`{type:'schoolLesson', courseId:<SchoolCourseId>}`

Gameplay course IDs are locked and must not be renamed:

1. `school.course.literacy_and_numbers` -> `school.track.literacy_and_numbers` -> `school/literacy-and-numbers/lesson/default`
2. `school.course.arcana` -> `school.track.arcana` -> `school/arcana/lesson/default`
3. `school.course.rhetoric_and_social` -> `school.track.rhetoric_and_social` -> `school/rhetoric-and-social/lesson/default`
4. `school.course.etiquette_and_presentation` -> `school.track.etiquette_and_presentation` -> `school/etiquette-and-presentation/lesson/default`
5. `school.course.field_craft` -> `school.track.field_craft` -> `school/field-craft/lesson/default`
6. `school.course.physical_training` -> `school.track.physical_training` -> `school/physical-training/lesson/default`
7. `school.course.arts_and_performance` -> `school.track.arts_and_performance` -> `school/arts-and-performance/lesson/default`
8. `school.course.body_confidence` -> `school.track.body_confidence` -> `school/body-confidence/lesson/default`

Paid lesson acceptance invariant:

`tuition + current-day Energy -1 + full stat package + lessons_completed +1 -> Resolver -> save/reload without replay`.

Ordinary paid School never mutates Lust.

## 3. NightFlow command mapping

Existing commands:

1. `dispatch(save, {type:'endDay'}, catalog)`
2. `dispatch(save, {type:'chooseLodging', id:<lodgingId>}, catalog)`
3. `dispatch(save, {type:'chooseNightChoice', id:<SchoolNightChoiceId>}, catalog)`

Locked normal School Night-study catalog (24 choices):

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

Each choice:
- costs zero tuition;
- costs zero current-day Energy;
- gives exactly +2 to its one supported stat;
- queues next-day Energy -1;
- increments School-owned `night_study_sessions`, not `lessons_completed`;
- consumes the Night slot;
- does not mutate Lust.

Locked housing availability contract:
- normal: normal School Night study available;
- cheap: normal School Night study available;
- street: normal School Night study unavailable by default.

Housing filtering remains an activation/UI availability seam because current shared `NightChoiceDefinition` does not carry housing availability.

## 4. Deterministic School reload points

School PA coverage uses these stable checkpoints:

1. after paid lesson, before any later action;
2. after `endDay` + lodging selection, before Night choice — directly satisfies PA save row 152;
3. after School Night choice effects when an after-choice pending event keeps NightFlow open;
4. after Night completion/day advance.

Exactly-once requirements:
- tuition is not charged again;
- paid-lesson current-day Energy is not charged again;
- stat deltas are not replayed;
- `lessons_completed` is not incremented again;
- `night_study_sessions` is not incremented again;
- next-day Energy -1 is consumed exactly once;
- presentation identity remains stable;
- no Lust mutation appears after reload.

## 5. Resolver mapping

Paid School lesson reaction family:
- `actionCompleted:school`;
- one `statChanged` per stat in the complete course package;
- `resourceChanged:money`;
- `energyChanged`;
- same-boundary `endingEligible` when production activation registers a newly eligible ending from the completed state.

There is no per-stat partial Resolver boundary. A triggered Lumber/career/relationship continuation sees the whole paid package.

## 6. Genuine OPEN public-fact authoring

The transport mechanism is not OPEN: durable cross-system facts already have the accepted `worldFacts` / `worldFactAdded` boundary (or a future explicitly typed domain-public equivalent).

What remains genuinely authorial and OPEN:

- the final School-owned management/accounting public fact ID consumed by the Lumber/Forewoman route;
- the final School-owned Arcana/forest public fact ID consumed by the Forest/Lumber route;
- the authored School milestone/project/certificate event that may publish either fact and its final threshold/content, if such a gate is chosen.

Draft placeholders such as `management_school_gate_ready` and `forest_school_gate_ready` are semantic preparation names, not canonical production IDs.

No OPEN authoring may alter:
- the eight course IDs/packages;
- 1-Energy paid lesson cost;
- Night-study +2 / next-day -1 mechanics;
- typed counter ownership;
- Lumber Hard Work eligibility, which remains independent of School.
