# School Teacher Presentation Identity Inventory v1

Status: presentation inventory for authored teacher/lesson/life packs. This file feeds future Chat2 multi-GIF work and does not select final art style.

## Teacher / classroom surfaces

Current authored teacher media identities:

| Track | Teacher | Media ID | Current fallback |
|---|---|---|---|
| Literacy & Numbers | Mara Fen | `school/teacher/literacy-and-numbers/classroom` | `assets/stage-school.svg` |
| Arcana | Ilyra Venn | `school/teacher/arcana/classroom` | `assets/stage-school.svg` |
| Rhetoric & Social | Cassian Reed | `school/teacher/rhetoric-and-social/classroom` | `assets/stage-school.svg` |
| Etiquette & Presentation | Eliane Marrow | `school/teacher/etiquette-and-presentation/classroom` | `assets/stage-school.svg` |
| Field Craft | Rowan Pike | `school/teacher/field-craft/classroom` | `assets/stage-school.svg` |
| Physical Training | Tovan Kest | `school/teacher/physical-training/classroom` | `assets/stage-school.svg` |
| Arts & Performance | Nessa Lark | `school/teacher/arts-and-performance/classroom` | `assets/stage-school.svg` |
| Body Confidence | Sera Vey | `school/teacher/body-confidence/classroom` | `assets/stage-school.svg` |

These IDs identify content/presentation surfaces only. They do not change School mechanics or imply relationship state.

## Track lesson surfaces

Current authored lesson media identities:

- `school/literacy-and-numbers/lesson/authored`
- `school/arcana/lesson/authored`
- `school/rhetoric-and-social/lesson/authored`
- `school/etiquette-and-presentation/lesson/authored`
- `school/field-craft/lesson/authored`
- `school/physical-training/lesson/authored`
- `school/arts-and-performance/lesson/authored`
- `school/body-confidence/lesson/authored`

Current fallback for all:
- `assets/stage-school.svg`.

Locked paid gameplay presentation identities remain:
- `school/<course-kebab>/lesson/default`.

The authored media IDs supplement those semantic course identities; they do not rename the paid gameplay presentation IDs.

## Generic lesson context

Current safe generic post-School surface:
- `school/lesson/context/default`
- fallback: `assets/stage-school.svg`.

This exists because the current event reaction surface exposes generic `actionCompleted:school` but does not expose the exact paid course ID to event conditions.

Course-specific authored events therefore remain untriggered library content until production routing has a safe course-specific presentation bridge.

## School-life surfaces

Current milestone-neutral content fallbacks:
- `school/life/classroom/default`
- `school/life/night-study/default`.

Both currently use:
- `assets/stage-school.svg`.

They support:
- classroom arrival;
- teacher feedback;
- peer/context moments;
- post-lesson flavor;
- Night-study flavor.

They assert no certificate, project, exam, milestone, or public-result semantics.

## Night-study presentation

Current authored Night-study flavor surface:
- `school/life/night-study/default`.

The production life pack listens to the 24 exact `school.night_study.*` choice IDs and adds presentation only.

Locked mechanics remain:
- tuition 0;
- current-day Energy 0;
- +2 selected supported stat;
- next-day Energy -1;
- one Night slot;
- `night_study_sessions +1`;
- `lessons_completed +0`.

## Reusable 3–5 GIF pool candidates

Future multi-GIF work can be economical by using a small reusable pool rather than one GIF per text variant.

Candidate pool:

1. **Teacher explanation / classroom gesture**
   - reusable for Mara, Cassian, Eliane, and generic lecture-style scenes;
   - variants can differ in text while reusing the same motion class.

2. **Practice / demonstration loop**
   - reusable for Rowan, Tovan, Sera, and practical lesson scenes;
   - examples: pointing to a route, demonstrating form, deliberate movement.

3. **Arcana observation loop**
   - reusable for Ilyra and Arcana lesson/result scenes;
   - subtle sigil/glass-instrument motion rather than gameplay timing.

4. **Performance / rehearsal loop**
   - reusable for Nessa and Arts & Performance scenes;
   - movement/rhythm/rehearsal emphasis.

5. **Quiet Night-study loop**
   - reusable across all tracks;
   - reading, writing, diagram review, preparation, or low-motion practice.

These are presentation candidates, not final asset assignments.

## Current fallback policy

Every current authored surface has a valid static fallback:
- `assets/stage-school.svg`.

Future conversion should preserve:
- text fallback;
- static fallback;
- optional GIF;
- alt text;
- no gameplay dependency on media timing.

## Semantic identity guardrails

Future Chat2 multi-GIF work must:
- preserve course gameplay IDs;
- preserve locked paid presentation IDs;
- preserve authored media IDs or migrate them deliberately with content updates;
- avoid using GIF completion as a transaction boundary;
- avoid implying unapproved milestone/public-result content;
- keep teacher relationship semantics separate from ordinary paid access.

## Open presentation decisions

Still OPEN:
- final art style;
- final teacher portraits;
- which tracks receive unique classroom art;
- which of the 3–5 reusable GIF pool candidates ship first;
- milestone/certificate/project/exam art;
- management/accounting result art;
- Arcana/Forest result art.
