# School Bilingual Presentation Inventory v1

Product rule:
- RU is source authoring;
- EN is a full second locale;
- School mechanics, IDs, progress and Save are shared;
- locale changes presentation text only.

Authority:
- PR #38 merged;
- generic post-paid-lesson hooks are reachable;
- exact Night-study hook is reachable;
- teacher/course-specific libraries are staged where routing cannot safely identify the paid course.

## 1. Paid lesson result surfaces — REACHABLE_NOW

The eight paid lesson semantic IDs already identify the course directly.

| Track | Semantic presentationId | Status | RU+EN requirement |
| --- | --- | --- | --- |
| literacy-and-numbers | `school/literacy-and-numbers/lesson/default` | REACHABLE_NOW | lesson text/caption RU+EN; 3–5 candidate alt RU+EN; static fallback alt RU+EN |
| arcana | `school/arcana/lesson/default` | REACHABLE_NOW | lesson text/caption RU+EN; 3–5 candidate alt RU+EN; static fallback alt RU+EN |
| rhetoric-and-social | `school/rhetoric-and-social/lesson/default` | REACHABLE_NOW | lesson text/caption RU+EN; 3–5 candidate alt RU+EN; static fallback alt RU+EN |
| etiquette-and-presentation | `school/etiquette-and-presentation/lesson/default` | REACHABLE_NOW | lesson text/caption RU+EN; 3–5 candidate alt RU+EN; static fallback alt RU+EN |
| field-craft | `school/field-craft/lesson/default` | REACHABLE_NOW | lesson text/caption RU+EN; 3–5 candidate alt RU+EN; static fallback alt RU+EN |
| physical-training | `school/physical-training/lesson/default` | REACHABLE_NOW | lesson text/caption RU+EN; 3–5 candidate alt RU+EN; static fallback alt RU+EN |
| arts-and-performance | `school/arts-and-performance/lesson/default` | REACHABLE_NOW | lesson text/caption RU+EN; 3–5 candidate alt RU+EN; static fallback alt RU+EN |
| body-confidence | `school/body-confidence/lesson/default` | REACHABLE_NOW | lesson text/caption RU+EN; 3–5 candidate alt RU+EN; static fallback alt RU+EN |


### Required fields per paid lesson

Localize:
- course-facing lesson label/title if shown;
- scene text/result summary;
- caption if used;
- text-only fallback;
- every GIF/image candidate alt;
- static fallback alt.

Do not localize:
- course ID;
- semantic presentationId;
- candidate stable key;
- media path;
- progress counter name.

## 2. Generic post-paid-lesson hook — REACHABLE_NOW

Event:

`school-lesson-content-v1.after-school`

Semantic presentationId:

`location/town/event/school-lesson-content-v1-after-school/default`

Routing:
`actionCompleted: school`

Required RU+EN:
- event title;
- variant text;
- continue-choice label/text if shown;
- candidate alt for 3–5 GIF pool;
- static fallback alt;
- text fallback.

Current media fallback:
`assets/stage-school.svg`.

Because routing is generic, localization must **not** name a specific teacher or paid course.

## 3. Generic School-life after-paid-lesson hook — REACHABLE_NOW

Event:

`school-life-content-v1.after-paid-lesson`

Semantic presentationId:

`location/town/event/school-life-content-v1-after-paid-lesson/default`

Routing:
`actionCompleted: school`

Required RU+EN:
- event title;
- variant text;
- continue text;
- 3–5 candidate alt;
- static fallback alt.

Current fallback:
`assets/stage-school.svg`.

Same routing rule:
no specific course/teacher claim unless the runtime later supplies exact course identity.

## 4. Exact Night-study hook — REACHABLE_NOW

Event:

`school-life-content-v1.after-night-study`

Semantic presentationId:

`location/town/event/school-life-content-v1-after-night-study/default`

Routing:
24 exact `school.night_study.*` completion choice IDs.

Required RU+EN:
- event title;
- Night-study variant text;
- continue text;
- 3–5 candidate alt;
- static fallback alt;
- any Night-study caption.

Current fallback:
`assets/stage-school.svg`.

### Language invariant

RU/EN switch must not alter:
- selected Night choice;
- selected supported stat;
- `night_study_sessions`;
- next-day Energy modifier;
- current-day Energy;
- tuition;
- GIF candidate selected for the same occurrence.

## 5. Staged teacher presentation libraries

| Track | Current EN teacher name | Teacher content ID | Media identity | Status | RU+EN work |
| --- | --- | --- | --- | --- | --- |
| literacy-and-numbers | Mara Fen | `school.teacher.mara-fen` | `school/teacher/literacy-and-numbers/classroom` | STAGED | RU display-name/role approval + EN name/role + RU/EN alt |
| arcana | Ilyra Venn | `school.teacher.ilyra-venn` | `school/teacher/arcana/classroom` | STAGED | RU display-name/role approval + EN name/role + RU/EN alt |
| rhetoric-and-social | Cassian Reed | `school.teacher.cassian-reed` | `school/teacher/rhetoric-and-social/classroom` | STAGED | RU display-name/role approval + EN name/role + RU/EN alt |
| etiquette-and-presentation | Eliane Marrow | `school.teacher.eliane-marrow` | `school/teacher/etiquette-and-presentation/classroom` | STAGED | RU display-name/role approval + EN name/role + RU/EN alt |
| field-craft | Rowan Pike | `school.teacher.rowan-pike` | `school/teacher/field-craft/classroom` | STAGED | RU display-name/role approval + EN name/role + RU/EN alt |
| physical-training | Tovan Kest | `school.teacher.tovan-kest` | `school/teacher/physical-training/classroom` | STAGED | RU display-name/role approval + EN name/role + RU/EN alt |
| arts-and-performance | Nessa Lark | `school.teacher.nessa-lark` | `school/teacher/arts-and-performance/classroom` | STAGED | RU display-name/role approval + EN name/role + RU/EN alt |
| body-confidence | Sera Vey | `school.teacher.sera-vey` | `school/teacher/body-confidence/classroom` | STAGED | RU display-name/role approval + EN name/role + RU/EN alt |


### Teacher names

The current authored EN display names are source content from PR38.

Before bilingual ship:
- Product/content approves the canonical RU display form for each name;
- EN keeps the approved English display form;
- teacher content IDs remain unchanged.

Do not derive gameplay identity from localized teacher name strings.

### Teacher roles

Any player-facing role label such as teacher/instructor/presenter requires:
- RU source role text;
- EN role text.

The role is presentation metadata only.

## 6. Teacher classroom media alt

Every teacher media mapping needs:
- `alt.ru`;
- `alt.en`.

The two alts describe the same visual.

Example structure only:

```text
mediaId: school/teacher/<track>/classroom
alt.ru: <approved Russian description of the teacher/classroom visual>
alt.en: <approved English description of the same visual>
```

Do not encode:
- lesson reward;
- prerequisite;
- relationship stage;
- public-result status

inside alt text.

## 7. Course-specific authored lesson libraries — STAGED

PR38 includes authored course/track-specific lesson libraries.

They are valid content libraries, but generic `actionCompleted: school` does not identify the exact paid course for reaction routing.

Status:
**STAGED_AWAITING_SAFE_ROUTING**.

Bilingual work may proceed for their text banks:
- RU source text;
- EN translation;
- RU/EN alt for candidate media.

But presentation must not claim these event hooks are reachable until routing is safe.

## 8. Multi-GIF pools

### REACHABLE_NOW pools

Ready bilingual pool targets:
- eight `school/<track>/lesson/default` surfaces;
- generic `after-school` hook;
- generic `after-paid-lesson` hook;
- exact `after-night-study` hook.

For every candidate:
- one locale-neutral candidate key;
- one locale-neutral GIF path;
- `alt.ru`;
- `alt.en`.

### STAGED pools

Teacher-specific classroom pools:
- prepare authoring metadata;
- do not activate generic routing.

Course-specific reaction-event pools:
- prepare authoring metadata;
- do not mark reachable until exact course bridge exists.

## 9. Static fallback localization

Current School static:
`assets/stage-school.svg`

is shared across locales.

Each semantic mapping still requires localized accessible text:
- RU alt;
- EN alt.

Do not duplicate the SVG just for locale.

## 10. Public-result and milestone blockers

Still not production-authoritative:
- management/accounting public-result identity;
- Arcana/Forest public-result identity;
- final certificate/project/exam route if retained;
- canonical teacher relationship routes.

Do not invent bilingual presentation IDs for these.

When identities are authored, add RU + EN presentation text beneath the one shared identity.

## 11. Reachability summary

### REACHABLE_NOW
- 8 paid lesson result semantic surfaces;
- generic post-School hook;
- generic School-life post-paid-lesson hook;
- exact Night-study hook.

### STAGED
- 8 teacher classroom libraries;
- course-specific authored reaction-event libraries;
- teacher-specific relationship/presentation routes.

## 12. Acceptance

School bilingual presentation is complete when:
1. every reachable player-facing School string has RU + EN;
2. every reachable media candidate has RU + EN alt;
3. staged libraries are clearly marked and not accidentally routed;
4. localized names do not become content IDs;
5. language switching does not mutate School mechanics or reroll the current GIF candidate.
