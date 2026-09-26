# School Release Readiness v1

Status: Chat 5 release-readiness summary.
Scope: accepted School mechanics/data/contracts and activation dependencies. This document does not modify shared runtime/schema/build/UI.

## 1. Paid lessons

Ready/locked:
- exactly eight gameplay course IDs;
- exact tuition for each course;
- exactly 1 current-day Energy per paid lesson;
- exact full stat package per course;
- ordinary paid School does not mutate Lust;
- semantic kebab-case lesson presentation IDs;
- atomic rejection for insufficient tuition/current-day Energy;
- Resolver sees the complete paid package, not per-stat partial writes;
- paid transaction survives save/reload without recharge or stat replay.

Course IDs:
- `school.course.literacy_and_numbers`
- `school.course.arcana`
- `school.course.rhetoric_and_social`
- `school.course.etiquette_and_presentation`
- `school.course.field_craft`
- `school.course.physical_training`
- `school.course.arts_and_performance`
- `school.course.body_confidence`

Current executable isolated API:
- `executeSchoolLesson(input, courseId, catalog, runtime)`.

Activation dependency:
- shared production command/picker wiring for `{type:'schoolLesson', courseId}`;
- shared UI entry is Lead-owned and intentionally not edited by Chat 5.

## 2. Typed School progress

Accepted School-owned track state contract includes:
- `trackId`;
- counters:
  - `lessons_completed`;
  - `night_study_sessions`;
  - reserved `projects_completed`;
  - reserved `exam_attempts`;
- School-owned facts;
- milestones;
- certificates;
- choices.

Locked ownership:
- paid lesson increments only `lessons_completed` by 1;
- Night study increments only `night_study_sessions` by 1;
- reload must not duplicate either;
- Lumber/other domains must not read or write School-private counters directly.

Compatibility ready at fixture/contract level:
- an older schema-4-shaped save missing School progress can default to empty School state;
- careers/quests/relationships/worldFacts remain unchanged;
- malformed track key/trackId mismatch is rejected by compatibility validation;
- unknown School track is rejected;
- duplicate/replayed counter transaction is expected to be idempotent.

Activation dependency:
- shared schema currently has no typed School domain;
- production persistence/defaulting/exactly-once transaction proof must be implemented by Lead-owned activation work.

## 3. Resolver visibility

Ready/locked paid-lesson reaction family:
- `actionCompleted:school`;
- one `statChanged` for every stat in the complete course package;
- `resourceChanged:money`;
- `energyChanged`.

Contract:
- all paid effects are applied before the Resolver boundary;
- downstream career/relationship/Lumber reactions see the full state;
- reactive continuation costs 0 extra School Energy unless another explicit action owns a cost.

Ending eligibility:
- the accepted same-boundary contract allows `endingEligible` to join the same Resolver boundary after production activation registers eligibility from the completed state;
- no ending may be evaluated against a partial School stat package.

Activation dependency:
- shared School command integration must register newly eligible endings at the production boundary before/with reaction resolution as required by the shared engine contract.

## 4. Night study

Ready/locked:
- complete catalog: 24 choices;
- each choice belongs to one of the eight courses/tracks;
- choice stat must be supported by that course package;
- exactly +2 selected supported stat;
- tuition = 0;
- current-day Energy cost = 0;
- next-day Energy delta = -1;
- Night slot consumed;
- no ordinary Lust mutation;
- no automatic milestone/certificate completion;
- `night_study_sessions` separate from `lessons_completed`.

Housing availability:
- normal room: normal School Night study available;
- cheap lodging: normal School Night study available;
- street: normal School Night study unavailable by default.

Stable Night presentation family:
- `school/night-study/<kebab-course-slug>/default`.

Existing NightFlow commands:
- `dispatch(save,{type:'endDay'},catalog)`;
- `dispatch(save,{type:'chooseLodging',id},catalog)`;
- `dispatch(save,{type:'chooseNightChoice',id},catalog)`.

Activation dependency:
- current shared `NightChoiceDefinition` does not encode housing availability; production UI/menu filtering must enforce the locked access contract without changing Night mechanics;
- typed School Night counter persistence awaits School schema activation.

## 5. UI reachability and disabled states

Paid School picker contract is ready for all eight courses.

Normal enabled state requires:
- arrived run;
- enough tuition;
- at least 1 current-day Energy;
- no pending scene;
- no active NightFlow;
- no active Activity.

Locked disabled reasons:
- not arrived;
- insufficient money;
- insufficient Energy;
- pending scene;
- active Night;
- active Activity.

No extra prerequisite may be invented:
- no certificate prerequisite;
- no milestone prerequisite;
- no teacher prerequisite;
- no relationship/career prerequisite;
- no `lessons_completed` threshold merely to take the ordinary paid lesson.

Activation dependency:
- actual shared UI picker rendering/wiring remains Lead-owned.

## 6. Save/reload readiness

Runtime-backed School checkpoints already covered in isolated tests:
- after paid lesson;
- after `endDay`;
- after lodging selection before Night choice;
- after Night choice effects while an after-choice event keeps NightFlow open;
- after Night completion/day advance.

Exactly-once invariants:
- tuition does not replay;
- paid current-day Energy does not replay;
- paid stat package does not replay;
- Night +2 does not replay;
- staged next-day Energy -1 does not duplicate;
- day advances exactly once;
- pending Night event/choice state survives reload;
- no Lust mutation appears due to reload.

Typed-progress compatibility expectations:
- missing School state defaults once;
- existing School state is preserved;
- typed counter increments do not replay;
- other progression domains are untouched.

Known activation seam:
- slash-based semantic School presentation IDs are the accepted presentation contract, but current shared pending-scene save schema still uses the generic ID field; production activation must reconcile semantic presentation persistence without weakening unrelated validation.

## 7. School -> Lumber/public cross-system boundary

Executable now:
- School stat changes can trigger Lumber/career reactions through ordinary `statChanged` facts.

Accepted durable public boundary:
- `run.progression.worldFacts`;
- `worldFact` conditions;
- `addWorldFact` / `removeWorldFact`;
- `worldFactAdded`;
- or a future explicitly typed domain-public equivalent.

Forbidden:
- Lumber directly reading School-private `lessons_completed`;
- Lumber directly reading School-private `night_study_sessions`;
- Lumber writing School counters/stages;
- School directly mutating Lumber internal stage as a shortcut.

Lumber Hard Work remains independent of School:
- complete eligibility gate is 50 completed Lumber shifts;
- no School course/certificate/fact/threshold is a Hard Work prerequisite.

## 8. Product Acceptance mapping

School coverage maps to Product Acceptance:
- required flow: School lesson -> immediate career/relationship continuation;
- economy: visible School cost;
- School requirement: track + presentation + progress + public result;
- deterministic save checkpoint after lodging before Night choice;
- failure rule: no manual Lumber/job visit to notice already-earned School progression;
- failure rule: pending events must not reroll after reload.

Detailed mapping:
- `docs/school-prep/SCHOOL_PRODUCT_ACCEPTANCE_ROW_MAP_v1.md`.

## 9. Remaining genuine OPEN authoring

Still OPEN and must not be invented by implementation/tests:
- final School-owned management/accounting public fact ID;
- final School-owned Arcana/forest public fact ID;
- exact School milestone thresholds;
- exact certificate thresholds;
- final certificate names/effects;
- exact projects/exams tied to those authorial milestones;
- final teachers/teacher fiction;
- authored milestone/certificate scene content;
- exact authorial route that publishes the management/accounting and Arcana/forest public facts.

Draft semantic placeholders are not canonical production IDs.

These OPEN authoring items do not change the locked baseline mechanics.

## 10. Release gate summary

### Ready as Chat 5 contract/data
- eight paid course catalog;
- 24 Night-study catalog;
- gameplay IDs;
- semantic presentation IDs;
- tuition/Energy/stat packages;
- no-Lust baseline;
- typed School ownership shape;
- exactly-once expectations;
- Resolver fact matrix;
- UI disabled-state matrix;
- Night housing availability contract;
- schema-4 compatibility expectations;
- reload chronology;
- School/Lumber public-boundary rules;
- Product Acceptance row mapping.

### Requires Lead/shared activation
- production `schoolLesson` command wiring;
- real shared School progression schema/persistence;
- production typed counter transaction application;
- actual School picker UI;
- Night housing-based choice filtering in shared UI/catalog integration;
- semantic School presentation persistence in shared save/pending scene representation;
- production same-boundary ending registration integration where applicable.

### Authoring OPEN
Only content decisions listed in section 9. No implementation should fill them silently.
