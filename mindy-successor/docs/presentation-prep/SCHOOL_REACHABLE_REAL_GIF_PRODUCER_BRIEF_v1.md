# School Reachable Real-GIF Producer Brief v1

Status: **PRODUCER-READY REQUEST / REACHABLE GENERIC SURFACES ONLY**

Current real GIF inventory: **0**.

Teacher/course-specific staged media identities remain **STAGED** and are not production targets in this brief.

## Reachable semantic targets

Daytime generic School reactions:
- `location/town/event/school-lesson-content-v1-after-school/default`;
- `location/town/event/school-life-content-v1-after-paid-lesson/default`.

Exact Night-study post-reaction:
- `location/town/event/school-life-content-v1-after-night-study/default`.

All currently use the real static fallback:

`assets/stage-school.svg`

## Batch A — shared daytime School trio

The same three neutral daytime School GIFs may be reused across both generic daytime semantic IDs because neither file identifies a teacher, track, stat package or gameplay result.

| Target filename | Candidate key | Loop brief — EN / RU | Target semantic IDs | Acceptance boundary |
| --- | --- | --- | --- | --- |
| `assets/gif/school/generic-day-01.gif` | `school-generic-day-01` | Classroom reset: arrange neutral books/materials on a desk and return to a ready position. / Сброс учебного места: разложить нейтральные книги или материалы на столе и вернуться в готовую позицию. | both daytime generic IDs above | No teacher face/identity, no named course, no readable lesson text, no stat/result cue. |
| `assets/gif/school/generic-day-02.gif` | `school-generic-day-02` | Study-work loop: turn a neutral page, make a short note-like hand motion, reset. / Учебный цикл: перелистнуть нейтральную страницу, сделать короткое движение рукой как при записи и вернуться. | both daytime generic IDs above | Any marks on paper must be non-readable decorative shapes; no language-specific text. |
| `assets/gif/school/generic-day-03.gif` | `school-generic-day-03` | Class transition loop: gather one neutral material, set it aside, return to the same composition. / Цикл перехода между учебными действиями: взять один нейтральный материал, отложить и вернуться к исходной композиции. | both daytime generic IDs above | Must not imply which paid course was taken or whether a milestone fired. |

With these 3 real files, both daytime generic semantic IDs can each own a valid 3-candidate pool while staying distinct semantic slots.

## Batch B — Night-study trio

These files target only:

`location/town/event/school-life-content-v1-after-night-study/default`

| Target filename | Candidate key | Loop brief — EN / RU | Acceptance boundary |
| --- | --- | --- | --- |
| `assets/gif/school/generic-night-01.gif` | `school-generic-night-01` | Quiet night study: low-light desk work, page check, neutral reset. / Тихая ночная учёба: работа за столом при слабом освещении, проверка страницы и нейтральный возврат. | No course/stat identity and no next-day Energy penalty visualization. |
| `assets/gif/school/generic-night-02.gif` | `school-generic-night-02` | Night review loop: compare two neutral notes/materials, set them back, reset. / Цикл ночного повторения: сравнить два нейтральных материала или записи, вернуть на место и зациклить. | No readable language, teacher, named track, reward or mechanic cue. |
| `assets/gif/school/generic-night-03.gif` | `school-generic-night-03` | Late-study pause: brief stretch or hand-rest beside study materials, then return to work-ready posture. / Пауза поздней учёбы: коротко размять руки или потянуться рядом с учебными материалами, затем вернуться в рабочую позу. | Fatigue may be atmospheric only; it must not encode an exact gameplay penalty or outcome. |

The 24 exact `school.night_study.*` gameplay choice IDs continue to own their course/stat mechanics. These GIFs serve only the shared post-Night presentation identity.

## RU + EN invariant

All six files are locale-neutral and shared between RU and EN.

Do not include:
- readable Russian/English text;
- course names;
- stat names/numbers;
- tuition;
- Energy values;
- choice labels.

RU/EN alt strings are separate localized text and do not affect candidate selection.

Suggested generic meanings:
- Day RU: «Героиня занимается за учебным столом в школе.»
- Day EN: “The heroine studies at a desk in the school.”
- Night RU: «Героиня продолжает тихую учёбу ночью.»
- Night EN: “The heroine continues quiet study at night.”

## Explicit STAGED exclusions

Not production targets here:
- `school/teacher/literacy-and-numbers/classroom`;
- `school/teacher/arcana/classroom`;
- `school/teacher/rhetoric-and-social/classroom`;
- `school/teacher/etiquette-and-presentation/classroom`;
- `school/teacher/field-craft/classroom`;
- `school/teacher/physical-training/classroom`;
- `school/teacher/arts-and-performance/classroom`;
- `school/teacher/body-confidence/classroom`.

No course-specific teacher routing is inferred or created.

## Production acceptance

A target pool becomes eligible only after all three mapped GIFs:
1. exist as real repository files;
2. pass signature/path preflight;
3. have RU+EN alt keys;
4. preserve `assets/stage-school.svg`;
5. pass animations-off and locale-switch checks;
6. leave School mechanics and Night choice identity untouched.
