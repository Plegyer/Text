# GIF Accessibility Key Plan v1

Scope:
the first three future PR42 GIF pools prepared in items 333–335.

Principle:
candidate media identity is locale-neutral; only alt/caption text changes by locale.

Current PR42 candidate schema directly consumes `altKey`.
Caption keys in this plan are presentation-localization companions and must be wired only where the existing UI supports captions; no schema/UI change is authorized by this document.

## Lumber spring

Semantic ID:
`job/lumber/shift/spring/default`.

Candidate keys:
- `lumber-spring-loop-a`;
- `lumber-spring-loop-b`;
- `lumber-spring-loop-c`.

Alt key family:

`presentation.gif.job.lumber.shift.spring.<candidate-key>.alt`

Exact keys:
- `presentation.gif.job.lumber.shift.spring.lumber-spring-loop-a.alt`
- `presentation.gif.job.lumber.shift.spring.lumber-spring-loop-b.alt`
- `presentation.gif.job.lumber.shift.spring.lumber-spring-loop-c.alt`

Caption family:

`presentation.gif.job.lumber.shift.spring.<candidate-key>.caption`

Recommended wording rule:
describe visible spring work motion only; do not repeat reward/outcome/gameplay semantics.

## Guard summer

Semantic ID:
`job/guard/shift/summer/default`.

Alt family:

`presentation.gif.job.guard.shift.summer.<candidate-key>.alt`

Exact keys:
- `presentation.gif.job.guard.shift.summer.guard-summer-loop-a.alt`
- `presentation.gif.job.guard.shift.summer.guard-summer-loop-b.alt`
- `presentation.gif.job.guard.shift.summer.guard-summer-loop-c.alt`

Caption family:

`presentation.gif.job.guard.shift.summer.<candidate-key>.caption`

Recommended wording rule:
describe ordinary watch-post motion only; no success/failure or security-threat implication.

## School Literacy & Numbers

Semantic ID:
`school/literacy-and-numbers/lesson/default`.

Alt family:

`presentation.gif.school.literacy-and-numbers.lesson.<candidate-key>.alt`

Exact keys:
- `presentation.gif.school.literacy-and-numbers.lesson.school-literacy-loop-a.alt`
- `presentation.gif.school.literacy-and-numbers.lesson.school-literacy-loop-b.alt`
- `presentation.gif.school.literacy-and-numbers.lesson.school-literacy-loop-c.alt`

Caption family:

`presentation.gif.school.literacy-and-numbers.lesson.<candidate-key>.caption`

Recommended wording rule:
describe pages/counting/study-material motion only; do not imply teacher identity, stat gain or lesson result.

## RU/EN content guidance

Every future key must have:
- non-empty RU;
- non-empty EN;
- equivalent visible facts;
- no locale-specific candidate selection.

Alt:
- concise visual description;
- mention meaningful motion when it helps distinguish the candidate;
- avoid duplicating the entire static fallback description if only a short motion phrase is needed.

Caption:
- shorter contextual phrase;
- do not duplicate alt verbatim;
- optional in activation until an existing caption consumer is confirmed.

## Static fallback relationship

Static fallback keys remain unchanged:

### Lumber
`presentation.static.career.lumber.shift.spring.alt`

### Guard
`presentation.static.career.guard.shift.summer.alt`

### School
`presentation.static.school-course-literacy-and-numbers.alt`

GIF candidate keys extend, not replace, those static accessibility semantics.

## Locale invariance

Changing RU <-> EN must never alter:
- semantic presentation ID;
- candidate key;
- GIF src;
- candidate ordering;
- deterministic candidate choice;
- static fallback src.

## Activation boundary

Do not merge these keys into root localization until:
1. actual GIF bytes exist;
2. the exact candidate survives technical/provenance QA;
3. the corresponding production pool is being activated.

## Result

First-three-pool alt-key plan:
**READY**.

Caption family plan:
**READY / UI-consumer dependent**.

Root localization changes:
**NONE BY THIS ITEM**.
