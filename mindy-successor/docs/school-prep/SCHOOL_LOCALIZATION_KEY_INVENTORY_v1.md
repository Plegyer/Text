# School Localization Key Inventory v1

Status: deterministic locale-neutral localization-key inventory.
Rule: localization keys are presentation identifiers only. Gameplay IDs, semantic gameplay/content IDs, routing, mechanics, RNG and Save identity remain unchanged.

## Key grammar

- Course label: `school.course.<course>.label`
- Course description: `school.course.<course>.description`
- Teacher name: `school.teacher.<teacher>.name`
- Teacher role: `school.teacher.<teacher>.role`
- Teacher bio: `school.teacher.<teacher>.bio`
- Generic post-lesson title: `school.generic.after_school.title`
- Generic post-lesson variant: `school.generic.after_school.variant.<variant>`
- Generic choice: `school.generic.after_school.choice.continue.label|text`
- Exact Night title: `school.night.<course>.<stat>.title`
- Exact Night variant: `school.night.<course>.<stat>.variant.focused|difficult|insight`
- Shared Night choice: `school.night.choice.continue.label|text`
- Repeatable lesson text: `school.lesson.<course>.repeatable.<variant>.text`
- Teacher media alt/caption: `school.media.teacher.<teacher>.alt|caption`
- Course lesson media alt/caption: `school.media.lesson.<course>.alt|caption`
- Night media alt/caption: `school.media.night.<course>.alt|caption`
- Generic classroom media alt/caption: `school.media.generic.classroom.alt|caption`

Keys never include `.ru` or `.en`. Locale is selected outside the key.

## Course labels and descriptions

| Gameplay course ID | Label key | Description key |
|---|---|---|
| `school.course.literacy_and_numbers` | `school.course.literacy_and_numbers.label` | `school.course.literacy_and_numbers.description` |
| `school.course.arcana` | `school.course.arcana.label` | `school.course.arcana.description` |
| `school.course.rhetoric_and_social` | `school.course.rhetoric_and_social.label` | `school.course.rhetoric_and_social.description` |
| `school.course.etiquette_and_presentation` | `school.course.etiquette_and_presentation.label` | `school.course.etiquette_and_presentation.description` |
| `school.course.field_craft` | `school.course.field_craft.label` | `school.course.field_craft.description` |
| `school.course.physical_training` | `school.course.physical_training.label` | `school.course.physical_training.description` |
| `school.course.arts_and_performance` | `school.course.arts_and_performance.label` | `school.course.arts_and_performance.description` |
| `school.course.body_confidence` | `school.course.body_confidence.label` | `school.course.body_confidence.description` |

## Teacher identities

| Teacher content ID | Track | Name key | Role key | Bio key |
|---|---|---|---|---|
| `school.teacher.mara-fen` | `school.track.literacy_and_numbers` | `school.teacher.mara-fen.name` | `school.teacher.mara-fen.role` | `school.teacher.mara-fen.bio` |
| `school.teacher.ilyra-venn` | `school.track.arcana` | `school.teacher.ilyra-venn.name` | `school.teacher.ilyra-venn.role` | `school.teacher.ilyra-venn.bio` |
| `school.teacher.cassian-reed` | `school.track.rhetoric_and_social` | `school.teacher.cassian-reed.name` | `school.teacher.cassian-reed.role` | `school.teacher.cassian-reed.bio` |
| `school.teacher.eliane-marrow` | `school.track.etiquette_and_presentation` | `school.teacher.eliane-marrow.name` | `school.teacher.eliane-marrow.role` | `school.teacher.eliane-marrow.bio` |
| `school.teacher.rowan-pike` | `school.track.field_craft` | `school.teacher.rowan-pike.name` | `school.teacher.rowan-pike.role` | `school.teacher.rowan-pike.bio` |
| `school.teacher.tovan-kest` | `school.track.physical_training` | `school.teacher.tovan-kest.name` | `school.teacher.tovan-kest.role` | `school.teacher.tovan-kest.bio` |
| `school.teacher.nessa-lark` | `school.track.arts_and_performance` | `school.teacher.nessa-lark.name` | `school.teacher.nessa-lark.role` | `school.teacher.nessa-lark.bio` |
| `school.teacher.sera-vey` | `school.track.body_confidence` | `school.teacher.sera-vey.name` | `school.teacher.sera-vey.role` | `school.teacher.sera-vey.bio` |

## Generic post-lesson event

Gameplay event remains:
- `school.generic.reachable.v2.after.school`.

Localization keys:
- `school.generic.after_school.title`
- `school.generic.after_school.variant.notes`
- `school.generic.after_school.variant.one.point`
- `school.generic.after_school.variant.question`
- `school.generic.after_school.variant.compare.notes`
- `school.generic.after_school.variant.small.correction`
- `school.generic.after_school.variant.shared.confusion`
- `school.generic.after_school.variant.enough.today`
- `school.generic.after_school.variant.hallway`
- `school.generic.after_school.variant.board`
- `school.generic.after_school.variant.reminder`
- `school.generic.after_school.choice.continue.label`
- `school.generic.after_school.choice.continue.text`
- `school.media.generic.classroom.alt`
- `school.media.generic.classroom.caption`

## Exact Night-study events

Night gameplay choice/event identities remain locale-neutral.

| Exact Night gameplay choice | Title key | Focused key | Difficult key | Insight key |
|---|---|---|---|---|
| `school.night_study.literacy_and_numbers.reason` | `school.night.literacy_and_numbers.reason.title` | `school.night.literacy_and_numbers.reason.variant.focused` | `school.night.literacy_and_numbers.reason.variant.difficult` | `school.night.literacy_and_numbers.reason.variant.insight` |
| `school.night_study.literacy_and_numbers.wits` | `school.night.literacy_and_numbers.wits.title` | `school.night.literacy_and_numbers.wits.variant.focused` | `school.night.literacy_and_numbers.wits.variant.difficult` | `school.night.literacy_and_numbers.wits.variant.insight` |
| `school.night_study.arcana.magic` | `school.night.arcana.magic.title` | `school.night.arcana.magic.variant.focused` | `school.night.arcana.magic.variant.difficult` | `school.night.arcana.magic.variant.insight` |
| `school.night_study.arcana.reason` | `school.night.arcana.reason.title` | `school.night.arcana.reason.variant.focused` | `school.night.arcana.reason.variant.difficult` | `school.night.arcana.reason.variant.insight` |
| `school.night_study.arcana.creativity` | `school.night.arcana.creativity.title` | `school.night.arcana.creativity.variant.focused` | `school.night.arcana.creativity.variant.difficult` | `school.night.arcana.creativity.variant.insight` |
| `school.night_study.rhetoric_and_social.charm` | `school.night.rhetoric_and_social.charm.title` | `school.night.rhetoric_and_social.charm.variant.focused` | `school.night.rhetoric_and_social.charm.variant.difficult` | `school.night.rhetoric_and_social.charm.variant.insight` |
| `school.night_study.rhetoric_and_social.sociability` | `school.night.rhetoric_and_social.sociability.title` | `school.night.rhetoric_and_social.sociability.variant.focused` | `school.night.rhetoric_and_social.sociability.variant.difficult` | `school.night.rhetoric_and_social.sociability.variant.insight` |
| `school.night_study.rhetoric_and_social.wits` | `school.night.rhetoric_and_social.wits.title` | `school.night.rhetoric_and_social.wits.variant.focused` | `school.night.rhetoric_and_social.wits.variant.difficult` | `school.night.rhetoric_and_social.wits.variant.insight` |
| `school.night_study.etiquette_and_presentation.manners` | `school.night.etiquette_and_presentation.manners.title` | `school.night.etiquette_and_presentation.manners.variant.focused` | `school.night.etiquette_and_presentation.manners.variant.difficult` | `school.night.etiquette_and_presentation.manners.variant.insight` |
| `school.night_study.etiquette_and_presentation.grooming` | `school.night.etiquette_and_presentation.grooming.title` | `school.night.etiquette_and_presentation.grooming.variant.focused` | `school.night.etiquette_and_presentation.grooming.variant.difficult` | `school.night.etiquette_and_presentation.grooming.variant.insight` |
| `school.night_study.etiquette_and_presentation.charm` | `school.night.etiquette_and_presentation.charm.title` | `school.night.etiquette_and_presentation.charm.variant.focused` | `school.night.etiquette_and_presentation.charm.variant.difficult` | `school.night.etiquette_and_presentation.charm.variant.insight` |
| `school.night_study.field_craft.dexterity` | `school.night.field_craft.dexterity.title` | `school.night.field_craft.dexterity.variant.focused` | `school.night.field_craft.dexterity.variant.difficult` | `school.night.field_craft.dexterity.variant.insight` |
| `school.night_study.field_craft.wits` | `school.night.field_craft.wits.title` | `school.night.field_craft.wits.variant.focused` | `school.night.field_craft.wits.variant.difficult` | `school.night.field_craft.wits.variant.insight` |
| `school.night_study.field_craft.creativity` | `school.night.field_craft.creativity.title` | `school.night.field_craft.creativity.variant.focused` | `school.night.field_craft.creativity.variant.difficult` | `school.night.field_craft.creativity.variant.insight` |
| `school.night_study.physical_training.strength` | `school.night.physical_training.strength.title` | `school.night.physical_training.strength.variant.focused` | `school.night.physical_training.strength.variant.difficult` | `school.night.physical_training.strength.variant.insight` |
| `school.night_study.physical_training.endurance` | `school.night.physical_training.endurance.title` | `school.night.physical_training.endurance.variant.focused` | `school.night.physical_training.endurance.variant.difficult` | `school.night.physical_training.endurance.variant.insight` |
| `school.night_study.physical_training.dexterity` | `school.night.physical_training.dexterity.title` | `school.night.physical_training.dexterity.variant.focused` | `school.night.physical_training.dexterity.variant.difficult` | `school.night.physical_training.dexterity.variant.insight` |
| `school.night_study.arts_and_performance.creativity` | `school.night.arts_and_performance.creativity.title` | `school.night.arts_and_performance.creativity.variant.focused` | `school.night.arts_and_performance.creativity.variant.difficult` | `school.night.arts_and_performance.creativity.variant.insight` |
| `school.night_study.arts_and_performance.charm` | `school.night.arts_and_performance.charm.title` | `school.night.arts_and_performance.charm.variant.focused` | `school.night.arts_and_performance.charm.variant.difficult` | `school.night.arts_and_performance.charm.variant.insight` |
| `school.night_study.arts_and_performance.sociability` | `school.night.arts_and_performance.sociability.title` | `school.night.arts_and_performance.sociability.variant.focused` | `school.night.arts_and_performance.sociability.variant.difficult` | `school.night.arts_and_performance.sociability.variant.insight` |
| `school.night_study.arts_and_performance.dexterity` | `school.night.arts_and_performance.dexterity.title` | `school.night.arts_and_performance.dexterity.variant.focused` | `school.night.arts_and_performance.dexterity.variant.difficult` | `school.night.arts_and_performance.dexterity.variant.insight` |
| `school.night_study.body_confidence.sexuality` | `school.night.body_confidence.sexuality.title` | `school.night.body_confidence.sexuality.variant.focused` | `school.night.body_confidence.sexuality.variant.difficult` | `school.night.body_confidence.sexuality.variant.insight` |
| `school.night_study.body_confidence.grooming` | `school.night.body_confidence.grooming.title` | `school.night.body_confidence.grooming.variant.focused` | `school.night.body_confidence.grooming.variant.difficult` | `school.night.body_confidence.grooming.variant.insight` |
| `school.night_study.body_confidence.endurance` | `school.night.body_confidence.endurance.title` | `school.night.body_confidence.endurance.variant.focused` | `school.night.body_confidence.endurance.variant.difficult` | `school.night.body_confidence.endurance.variant.insight` |

Shared Night presentation choice keys:
- `school.night.choice.continue.label`
- `school.night.choice.continue.text`

Track-level Night media keys:
- `school.media.night.literacy_and_numbers.alt`
- `school.media.night.literacy_and_numbers.caption`
- `school.media.night.arcana.alt`
- `school.media.night.arcana.caption`
- `school.media.night.rhetoric_and_social.alt`
- `school.media.night.rhetoric_and_social.caption`
- `school.media.night.etiquette_and_presentation.alt`
- `school.media.night.etiquette_and_presentation.caption`
- `school.media.night.field_craft.alt`
- `school.media.night.field_craft.caption`
- `school.media.night.physical_training.alt`
- `school.media.night.physical_training.caption`
- `school.media.night.arts_and_performance.alt`
- `school.media.night.arts_and_performance.caption`
- `school.media.night.body_confidence.alt`
- `school.media.night.body_confidence.caption`

## Staged exact-course repeatable lesson events

Current exact paid-course gameplay routing is still staged. These localization keys are assigned now so later routing work does not require renaming text identity.

### Literacy & Numbers

Gameplay course: `school.course.literacy_and_numbers`

- `school.lesson.literacy_and_numbers.repeatable.v1-a.text`
- `school.lesson.literacy_and_numbers.repeatable.v1-b.text`
- `school.lesson.literacy_and_numbers.repeatable.v1-c.text`
- `school.lesson.literacy_and_numbers.repeatable.v2-d.text`
- `school.lesson.literacy_and_numbers.repeatable.v2-e.text`
- `school.lesson.literacy_and_numbers.repeatable.v2-f.text`
- `school.lesson.literacy_and_numbers.repeatable.v2-g.text`
- `school.media.lesson.literacy_and_numbers.alt`
- `school.media.lesson.literacy_and_numbers.caption`

### Arcana

Gameplay course: `school.course.arcana`

- `school.lesson.arcana.repeatable.v1-a.text`
- `school.lesson.arcana.repeatable.v1-b.text`
- `school.lesson.arcana.repeatable.v1-c.text`
- `school.lesson.arcana.repeatable.v2-d.text`
- `school.lesson.arcana.repeatable.v2-e.text`
- `school.lesson.arcana.repeatable.v2-f.text`
- `school.lesson.arcana.repeatable.v2-g.text`
- `school.media.lesson.arcana.alt`
- `school.media.lesson.arcana.caption`

### Rhetoric & Social

Gameplay course: `school.course.rhetoric_and_social`

- `school.lesson.rhetoric_and_social.repeatable.v1-a.text`
- `school.lesson.rhetoric_and_social.repeatable.v1-b.text`
- `school.lesson.rhetoric_and_social.repeatable.v1-c.text`
- `school.lesson.rhetoric_and_social.repeatable.v2-d.text`
- `school.lesson.rhetoric_and_social.repeatable.v2-e.text`
- `school.lesson.rhetoric_and_social.repeatable.v2-f.text`
- `school.lesson.rhetoric_and_social.repeatable.v2-g.text`
- `school.media.lesson.rhetoric_and_social.alt`
- `school.media.lesson.rhetoric_and_social.caption`

### Etiquette & Presentation

Gameplay course: `school.course.etiquette_and_presentation`

- `school.lesson.etiquette_and_presentation.repeatable.v1-a.text`
- `school.lesson.etiquette_and_presentation.repeatable.v1-b.text`
- `school.lesson.etiquette_and_presentation.repeatable.v1-c.text`
- `school.lesson.etiquette_and_presentation.repeatable.v2-d.text`
- `school.lesson.etiquette_and_presentation.repeatable.v2-e.text`
- `school.lesson.etiquette_and_presentation.repeatable.v2-f.text`
- `school.lesson.etiquette_and_presentation.repeatable.v2-g.text`
- `school.media.lesson.etiquette_and_presentation.alt`
- `school.media.lesson.etiquette_and_presentation.caption`

### Field Craft

Gameplay course: `school.course.field_craft`

- `school.lesson.field_craft.repeatable.v1-a.text`
- `school.lesson.field_craft.repeatable.v1-b.text`
- `school.lesson.field_craft.repeatable.v1-c.text`
- `school.lesson.field_craft.repeatable.v2-d.text`
- `school.lesson.field_craft.repeatable.v2-e.text`
- `school.lesson.field_craft.repeatable.v2-f.text`
- `school.lesson.field_craft.repeatable.v2-g.text`
- `school.media.lesson.field_craft.alt`
- `school.media.lesson.field_craft.caption`

### Physical Training

Gameplay course: `school.course.physical_training`

- `school.lesson.physical_training.repeatable.v1-a.text`
- `school.lesson.physical_training.repeatable.v1-b.text`
- `school.lesson.physical_training.repeatable.v1-c.text`
- `school.lesson.physical_training.repeatable.v2-d.text`
- `school.lesson.physical_training.repeatable.v2-e.text`
- `school.lesson.physical_training.repeatable.v2-f.text`
- `school.lesson.physical_training.repeatable.v2-g.text`
- `school.media.lesson.physical_training.alt`
- `school.media.lesson.physical_training.caption`

### Arts & Performance

Gameplay course: `school.course.arts_and_performance`

- `school.lesson.arts_and_performance.repeatable.v1-a.text`
- `school.lesson.arts_and_performance.repeatable.v1-b.text`
- `school.lesson.arts_and_performance.repeatable.v1-c.text`
- `school.lesson.arts_and_performance.repeatable.v2-d.text`
- `school.lesson.arts_and_performance.repeatable.v2-e.text`
- `school.lesson.arts_and_performance.repeatable.v2-f.text`
- `school.lesson.arts_and_performance.repeatable.v2-g.text`
- `school.media.lesson.arts_and_performance.alt`
- `school.media.lesson.arts_and_performance.caption`

### Body Confidence

Gameplay course: `school.course.body_confidence`

- `school.lesson.body_confidence.repeatable.v1-a.text`
- `school.lesson.body_confidence.repeatable.v1-b.text`
- `school.lesson.body_confidence.repeatable.v1-c.text`
- `school.lesson.body_confidence.repeatable.v2-d.text`
- `school.lesson.body_confidence.repeatable.v2-e.text`
- `school.lesson.body_confidence.repeatable.v2-f.text`
- `school.lesson.body_confidence.repeatable.v2-g.text`
- `school.media.lesson.body_confidence.alt`
- `school.media.lesson.body_confidence.caption`

## Staged teacher presentation media

- `school.media.teacher.mara-fen.alt`
- `school.media.teacher.mara-fen.caption`
- `school.media.teacher.ilyra-venn.alt`
- `school.media.teacher.ilyra-venn.caption`
- `school.media.teacher.cassian-reed.alt`
- `school.media.teacher.cassian-reed.caption`
- `school.media.teacher.eliane-marrow.alt`
- `school.media.teacher.eliane-marrow.caption`
- `school.media.teacher.rowan-pike.alt`
- `school.media.teacher.rowan-pike.caption`
- `school.media.teacher.tovan-kest.alt`
- `school.media.teacher.tovan-kest.caption`
- `school.media.teacher.nessa-lark.alt`
- `school.media.teacher.nessa-lark.caption`
- `school.media.teacher.sera-vey.alt`
- `school.media.teacher.sera-vey.caption`

## Choice and presentation-caption rules

Choice localization keys identify player-facing presentation only. Choice gameplay IDs remain unchanged.

Current shared generic choice gameplay ID:
- `continue`

Current exact Night shared presentation choice gameplay ID:
- `continue`

If later exact-course teacher/lesson events use the same gameplay choice ID, their player-facing label/text may reuse a shared School continue key or receive a deterministic event-specific key. Reuse must not change gameplay choice identity.

Captions:
- are presentation-only;
- share the same semantic media identity across RU and EN;
- do not encode mechanics, eligibility, progress, or public-result state.

## Determinism / collision rules

A localization key:
- maps to one semantic piece of player-facing text;
- is stable once production-integrated;
- contains no locale suffix;
- contains no translated words;
- uses the canonical locale-neutral content/gameplay slug;
- must not be reused for a different semantic meaning.

Changing text does not require changing the localization key when the underlying meaning is unchanged.

## Gameplay-ID separation

Examples:
- gameplay course: `school.course.arcana`
- localization label key: `school.course.arcana.label`

- gameplay Night choice: `school.night_study.arcana.reason`
- localization title key: `school.night.arcana.reason.title`

- gameplay event: `school.generic.reachable.v2.after.school`
- localization title key: `school.generic.after_school.title`

Localization keys never replace gameplay IDs in School state, triggers, effects, RNG or Save data.

## Product-blocked key families

Do not assign final semantic keys yet for unresolved:
- management/accounting milestone/result scenes;
- Arcana/Forest public-result scenes;
- certificates;
- projects;
- exams;
- education endings;
- teacher relationship stages/endings;
- Palace/Meta School-result scenes.

Assign them only after Product freezes the underlying semantic identity.
