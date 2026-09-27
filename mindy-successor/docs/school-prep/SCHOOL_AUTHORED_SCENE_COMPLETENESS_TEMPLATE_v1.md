# School Authored-Scene Completeness Template v1

Status: reusable completeness matrix for all eight School tracks.
Rule: locked IDs/mechanics may be prefilled; not-yet-authored content stays OPEN.

## Matrix

| Track | Repeatable lesson variants | Teacher/presenter scenes | Milestone scenes | Relationship/career reaction hooks | Public-result scene | Night-study presentation | Ending/Meta relevance | Semantic presentation coverage | Save/reload acceptance |
|---|---|---|---|---|---|---|---|---|---|
| `school.track.literacy_and_numbers` | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | paid `school/literacy-and-numbers/lesson/default`; Night family locked | OPEN |
| `school.track.arcana` | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | paid `school/arcana/lesson/default`; Night family locked | OPEN |
| `school.track.rhetoric_and_social` | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | paid `school/rhetoric-and-social/lesson/default`; Night family locked | OPEN |
| `school.track.etiquette_and_presentation` | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | paid `school/etiquette-and-presentation/lesson/default`; Night family locked | OPEN |
| `school.track.field_craft` | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | paid `school/field-craft/lesson/default`; Night family locked | OPEN |
| `school.track.physical_training` | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | paid `school/physical-training/lesson/default`; Night family locked | OPEN |
| `school.track.arts_and_performance` | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | paid `school/arts-and-performance/lesson/default`; Night family locked | OPEN |
| `school.track.body_confidence` | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | OPEN | paid `school/body-confidence/lesson/default`; Night family locked | OPEN |

## Column completion rules

### Repeatable lesson variants
Record:
- authored variant IDs;
- conditions;
- text/media coverage;
- whether teacher identity is required.

Base paid mechanics remain outside the variant text layer.

### Teacher / presenter scenes
Record:
- canonical teacher/presenter ID;
- scene IDs;
- relationship hook, if any;
- presentation/media fallback.

If teacher identity is not approved, keep OPEN.

### Milestone scenes
Record:
- provider/milestone ID;
- milestone type;
- threshold/completion rule;
- scene/presentation ID;
- exactly-once completion proof.

Do not infer thresholds from QA fixtures.

### Relationship / career reaction hooks
Record:
- downstream domain;
- approved public result consumed;
- listener/condition ID;
- downstream-owned state change;
- save/reload reaction proof.

Never point a downstream consumer at School-private counters.

### Public-result scene
Record only after Product approves:
- stable public result ID;
- School-owned private provider;
- publication timing;
- first-publication reaction;
- exactly-once proof;
- downstream consumer(s).

Otherwise keep OPEN.

### Night-study presentation
Record:
- authored Night presentation variants;
- teacher/presenter participation if any;
- text/static/GIF fallback.

Night mechanics stay locked:
- zero tuition;
- zero current-day Energy;
- +2 supported stat;
- next-day Energy -1;
- one Night slot;
- `night_study_sessions +1`;
- `lessons_completed +0`.

### Ending / Meta relevance
Record only explicit authored links.

Do not add:
- generic School ending dependency;
- automatic Meta reward;
- Lumber Hard Work prerequisite.

If none is intended, mark NONE rather than inventing one.

### Semantic presentation coverage
Paid presentation IDs above are locked.
For each authored scene additionally record:
- semantic scene/result ID;
- media mapping;
- fallback mapping;
- reload stability.

### Save / reload acceptance
For each authored scene verify:
- pending scene stable across reload;
- no reroll of committed deterministic content;
- no tuition/Energy replay;
- no duplicate paid/Night progress;
- no duplicate milestone/publication;
- presentation ID preserved;
- downstream reaction remains exactly once.

## Track completion summary

For each track, fill only after authoring:

- Base repeatable content complete: OPEN
- Teacher content complete: OPEN
- Milestone content complete: OPEN
- Cross-system hooks complete: OPEN
- Night presentation complete: OPEN
- Public-result content complete or N/A: OPEN
- Presentation coverage complete: OPEN
- Save/reload QA complete: OPEN
- Product sign-off: OPEN

A track may be mechanically shipped while authored-scene completeness remains OPEN. Do not conflate the two.
