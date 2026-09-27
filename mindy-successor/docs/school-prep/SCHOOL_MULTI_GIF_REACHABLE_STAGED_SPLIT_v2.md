# School Multi-GIF Reachable / Staged Split v2

Status: presentation-planning split for Chat2 and Lead. No final art style is selected.

This file separates:
- content naturally reachable with current public routing;
- staged teacher/course libraries that are not naturally reachable yet;
- future exact-course content that becomes reachable only after the proposed routing seam is implemented.

## A. Currently reachable generic paid-lesson content

Current exact trigger:
- `actionCompleted:school`.

Production-oriented pack:
- `content/packs/school-target/school-generic-reachable-v2.json`.

Content identity:
- generic post-paid-lesson reflection;
- no teacher/course claim;
- effect-free;
- save/reload materialized presentation.

Recommended GIF pool:
1. **generic classroom wrap-up**
   - notes closing;
   - students gathering materials;
   - board being cleared;
   - hallway transition.

Reuse:
- all eight paid courses.

Current fallback:
- `assets/stage-school.svg`.

Do not show a course-specific teacher in this pool while exact course identity is unavailable.

## B. Currently reachable exact Night-study content

Current exact trigger:
- `nightChoiceCompleted` with one of 24 exact existing `school.night_study.*` choice IDs.

Production-oriented pack:
- `content/packs/school-target/school-night-exact-v3.json`.

Current text identity:
- exact course;
- exact selected supported stat;
- presentation-only.

Recommended reusable GIF pool:
2. **quiet reading/writing**
   - Literacy & Numbers;
   - Arcana reason/creativity;
   - Rhetoric rehearsal notes;
   - Etiquette preparation.

3. **controlled practical practice**
   - Field Craft;
   - Physical Training;
   - Body Confidence.

4. **Arcana observation**
   - Arcana magic/reason/creativity;
   - subtle diagram/sigil/instrument movement.

5. **arts/performance rehearsal**
   - Arts & Performance;
   - gesture, rhythm, sketch, rehearsal motion.

Current fallback:
- `assets/stage-school.svg`.

Night GIFs must never signal a second mechanics transaction.

## C. Staged teacher/course libraries — not currently natural reachability

Staged teacher pack:
- `content/packs/school-target/school-teachers-v1.json`.

Staged course lesson libraries:
- `content/packs/school-target/school-lesson-content-v1.json`;
- `content/packs/school-target/school-lesson-content-v2.json`.

Reason they are staged:
- generic paid School completion exposes only `actionCompleted:school`;
- exact course identity is not present in the public reaction fact;
- course/teacher routing would otherwise be ambiguous.

Teacher/course presentation should therefore **not** be labeled shipped/naturally reachable.

Current drafted teacher identities:
- Mara Fen — Literacy & Numbers;
- Ilyra Venn — Arcana;
- Cassian Reed — Rhetoric & Social;
- Eliane Marrow — Etiquette & Presentation;
- Rowan Pike — Field Craft;
- Tovan Kest — Physical Training;
- Nessa Lark — Arts & Performance;
- Sera Vey — Body Confidence.

## D. GIF planning for staged teacher/course libraries

Teacher-dedicated candidates:
- Mara Fen: ledger/page-marking;
- Ilyra Venn: sigil/instrument observation;
- Cassian Reed: debate/gesture;
- Eliane Marrow: posture/preparation;
- Rowan Pike: map/knot/tool inspection;
- Tovan Kest: form/breathing demonstration;
- Nessa Lark: rehearsal/rhythm;
- Sera Vey: posture/grooming preparation.

Reuse pools can still reduce asset count:
- classroom explanation: Mara / Cassian / Eliane;
- practical demonstration: Rowan / Tovan / Sera;
- dedicated Arcana observation: Ilyra;
- dedicated rehearsal/performance: Nessa.

These remain staged presentation assets until exact routing exists.

## E. Future exact-course routed events

Proposed seam:
- `SCHOOL_EXACT_COURSE_ROUTING_SEAM_PROPOSAL_v1.md`.

After the seam is implemented:
- each paid lesson emits the exact existing `school.course.*` identity as public reaction data;
- generic `actionCompleted:school` remains;
- course-specific authored events can match only their own course.

Then Chat2 may safely bind:
- teacher portrait/GIF;
- track lesson GIF;
- track classroom still;
- course-specific repeatable text.

## F. Reachability labels for asset planning

### REACHABLE_NOW
- generic post-paid-lesson classroom wrap-up;
- exact Night-study content for all 24 choices.

### STAGED
- eight teacher/classroom libraries;
- v1/v2 course-specific repeatable lesson libraries;
- teacher-specific relationship/presentation scenes that depend on knowing the exact course.

### FUTURE_AFTER_EXACT_COURSE_SEAM
- teacher appears automatically after the matching paid course;
- course-specific repeatable variant selected automatically;
- course-specific GIF/static presentation selected without ambiguity.

## G. Suggested 3–5 pool split

A compact current/future pool can be:

1. generic classroom wrap-up — REACHABLE_NOW;
2. quiet Night study — REACHABLE_NOW;
3. practical Night/lesson demonstration — Night REACHABLE_NOW, course-specific paid content STAGED;
4. Arcana observation — Night REACHABLE_NOW, paid Arcana STAGED;
5. arts/performance rehearsal — Night REACHABLE_NOW, paid Arts STAGED.

This split avoids overproducing art before the exact-course route is available.

## H. Fallback policy

For every category:
- static fallback remains valid;
- text fallback remains valid;
- GIF is optional;
- media timing never controls payment/progress/reaction completion.

Current shared fallback:
- `assets/stage-school.svg`.

## I. Do-not-mislabel rule

Do not describe:
- teacher paid-lesson routing;
- course-specific paid-lesson variants;
- teacher relationship follow-ups

as production-reachable until an exact-course routing bridge is actually integrated and tested.

Night exact-choice routing and generic post-School routing are already representable with current public reaction primitives.
