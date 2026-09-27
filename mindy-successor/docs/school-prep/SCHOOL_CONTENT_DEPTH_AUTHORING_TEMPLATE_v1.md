# School Content-Depth Authoring Template v1

Status: fill-in Product/authoring template.
Rule: fields marked **OPEN — fill by Product/authoring** must remain blank until an explicit human decision is made.

## A. LOCKED mechanics — do not rewrite here

The following are already locked and are reference-only:

- exactly eight paid courses;
- gameplay course IDs remain `school.course.*`;
- track IDs remain `school.track.*`;
- paid lesson costs exactly 1 current-day Energy;
- tuition/stat packages remain the current locked package;
- ordinary School does not change Lust;
- paid lesson increments only `lessons_completed`;
- Night study increments only `night_study_sessions`;
- Night study costs zero tuition/current-day Energy, gives +2 supported stat, applies next-day Energy -1, and uses one Night slot;
- semantic paid presentation IDs remain `school/<course-kebab>/lesson/default`;
- Night presentation uses the existing semantic Night family;
- School publishes cross-system results only through a public boundary; Lumber/Forest must not read School-private counters directly.

Do not use this template to change those mechanics.

## B. Teacher / presenter authoring per track

Fill only OPEN columns.

| Course / track | LOCKED course role | Teacher/presenter canonical ID | Display name | Role/title | Voice/personality notes | Course assignment notes | Portrait/static/GIF asset | Validation notes |
|---|---|---|---|---|---|---|---|---|
| `school.course.literacy_and_numbers` / `school.track.literacy_and_numbers` | Literacy & Numbers | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** |
| `school.course.arcana` / `school.track.arcana` | Arcana | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** |
| `school.course.rhetoric_and_social` / `school.track.rhetoric_and_social` | Rhetoric & Social | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** |
| `school.course.etiquette_and_presentation` / `school.track.etiquette_and_presentation` | Etiquette & Presentation | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** |
| `school.course.field_craft` / `school.track.field_craft` | Field Craft | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** |
| `school.course.physical_training` / `school.track.physical_training` | Physical Training | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** |
| `school.course.arts_and_performance` / `school.track.arts_and_performance` | Arts & Performance | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** |
| `school.course.body_confidence` / `school.track.body_confidence` | Body Confidence | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** | **OPEN** |

Teacher identity is content depth only. Do not add a new paid-lesson prerequisite solely because a teacher is authored.

## C. Lesson presentation content

For each course that receives authored presentation depth:

- Course ID: **OPEN**
- Existing semantic presentation ID: **fill from locked catalog**
- Teacher/presenter ID: **OPEN**
- Entry copy: **OPEN**
- Lesson/result copy: **OPEN**
- Optional static image: **OPEN**
- Optional GIF: **OPEN**
- Accessibility alt text: **OPEN**
- Choice text, if any: **OPEN**
- Does presentation alter mechanics? **Must be NO unless a separately approved mechanic changes**
- Validation notes: **OPEN**

Acceptance checks:
- gameplay course ID unchanged;
- semantic presentation ID unchanged;
- tuition unchanged;
- Energy cost unchanged;
- stat package unchanged;
- no new Lust mutation;
- reload preserves presentation identity.

## D. Milestone authoring template

Repeat this section for every authored milestone.

- Milestone canonical ID: **OPEN**
- Owning track: **OPEN**
- Human-facing title: **OPEN**
- Milestone type: **OPEN**
- Private eligibility type: **OPEN**
- Private eligibility value(s): **OPEN**
- Does Night study contribute? **OPEN**
- Additional School-owned requirements: **OPEN**
- Presentation hook/semantic ID: **OPEN**
- Scene/copy: **OPEN**
- Public result published? **OPEN**
- If yes, public result ID: **OPEN**
- Publication timing: **OPEN**
- Exactly-once proof/test: **OPEN**
- Downstream consumer(s): **OPEN**
- PA rows affected: **OPEN**
- Validation notes: **OPEN**

Do not copy legacy `metrics.lessons` thresholds into this field.

## E. Certificate authoring template

Use only if Product decides certificates ship.

- Certificate canonical ID: **OPEN**
- Owning track: **OPEN**
- Display name: **OPEN**
- Eligibility: **OPEN**
- Mechanical effect, if any: **OPEN**
- Presentation ID/card: **OPEN**
- Public result published? **OPEN**
- Public result ID, if any: **OPEN**
- Repeatable? **OPEN**
- Save/reload proof: **OPEN**
- Downstream consumer: **OPEN**
- Validation notes: **OPEN**

No certificate is required for Lumber Hard Work.

## F. Project authoring template

Use only if Product decides projects ship.

- Project canonical ID: **OPEN**
- Owning track: **OPEN**
- Display name: **OPEN**
- Entry conditions: **OPEN**
- Completion conditions: **OPEN**
- Cost/Energy policy: **OPEN**
- Completion effect: **OPEN**
- Presentation hook: **OPEN**
- Public result published? **OPEN**
- Public result ID, if any: **OPEN**
- Reload/checkpoint behavior: **OPEN**
- Validation notes: **OPEN**

## G. Exam authoring template

Use only if Product decides exams ship.

- Exam canonical ID: **OPEN**
- Owning track: **OPEN**
- Display name: **OPEN**
- Eligibility: **OPEN**
- Cost/Energy policy: **OPEN**
- Pass/fail behavior: **OPEN**
- Completion effect: **OPEN**
- Presentation hook: **OPEN**
- Certificate granted, if any: **OPEN**
- Public result published, if any: **OPEN**
- Reload behavior: **OPEN**
- Validation notes: **OPEN**

The old prototype exam threshold is not a default or recommendation.

## H. Management/accounting public-result authoring point

Complete only after Product chooses the result.

- Provider type: **OPEN**
- Provider canonical ID: **OPEN**
- Owning track: **OPEN**
- Private milestone/threshold type: **OPEN**
- Threshold/value: **OPEN**
- Does Night study contribute? **OPEN**
- Durable public result ID: **OPEN**
- Publication timing: **OPEN**
- Existing Lumber listener compatibility: **OPEN**
- Exactly-once/reload proof: **OPEN**
- Presentation hook: **OPEN**
- PA07/PA08 validation notes: **OPEN**

Reference decision schema:
`docs/school-prep/SCHOOL_MANAGEMENT_RESULT_DECISION_SCHEMA_v1.md`.

## I. Arcana / Forest public-result authoring point

Complete only after Product chooses the result.

- Provider/milestone category: **OPEN**
- Provider canonical ID: **OPEN**
- Private threshold/value category: **OPEN**
- Threshold/value: **OPEN**
- Does Night study contribute? **OPEN**
- Durable public result ID: **OPEN**
- Publication boundary: **OPEN**
- Exact Forest consumer/listener/option: **OPEN**
- Route/challenge effect: **OPEN**
- Exactly-once/reload proof: **OPEN**
- Presentation hook: **OPEN**
- PA/Forest validation notes: **OPEN**

Reference decision schema:
`docs/school-prep/SCHOOL_ARCANA_FOREST_RESULT_DECISION_SCHEMA_v1.md`.

## J. Validation / acceptance checklist for every authored addition

Before marking authored content complete:

- [ ] No locked course ID changed.
- [ ] No locked track ID changed.
- [ ] Paid tuition/Energy/stat package unchanged unless a separately approved mechanics task says otherwise.
- [ ] Paid lesson still increments only `lessons_completed`.
- [ ] Night study still increments only `night_study_sessions`.
- [ ] No ordinary School Lust mutation added.
- [ ] Blocking School scene sequencing remains valid.
- [ ] Save/reload does not replay payment, Energy, progress, milestone, certificate, project, exam, or public-result publication.
- [ ] Cross-system consumer reads only public result/state.
- [ ] Hard Work remains independent of School.
- [ ] Semantic presentation IDs remain stable.
- [ ] Missing media still has valid static/text fallback unless Product explicitly changes the presentation requirement.
- [ ] Human/Product decision source is recorded.
