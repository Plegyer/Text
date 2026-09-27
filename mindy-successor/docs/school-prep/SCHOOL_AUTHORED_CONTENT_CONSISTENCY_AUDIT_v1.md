# School Authored Content Consistency Audit v1

Status: audit of Queue items 82–87 against locked School mechanics and current course IDs.

Audited files:
- `SCHOOL_CANONICAL_TEACHER_CONTENT_DRAFT_v1.md`;
- `school-teacher-identities-v1.fixture.json`;
- `SCHOOL_REPEATABLE_LESSON_TEXT_BANK_v1.md`;
- `SCHOOL_MILESTONE_NEUTRAL_SCENE_BANK_v1.md`;
- `SCHOOL_TEACHER_RELATIONSHIP_SEEDS_v1.md`;
- `SCHOOL_TEACHER_PRESENTATION_BRIEFS_v1.md`.

Reference:
- `school-production-ui.fixture.json`.

## Identity consistency

Eight drafted teachers map one-to-one to the eight locked courses/tracks:
- Mara Fen -> Literacy & Numbers;
- Ilyra Venn -> Arcana;
- Cassian Reed -> Rhetoric & Social;
- Eliane Marrow -> Etiquette & Presentation;
- Rowan Pike -> Field Craft;
- Tovan Kest -> Physical Training;
- Nessa Lark -> Arts & Performance;
- Sera Vey -> Body Confidence.

Teacher fixture IDs, names, course IDs and track IDs match the prose draft.

No course or track ID is renamed.

## Locked paid mechanics

Audit result: PASS.

No authored item changes or contradicts:
- Literacy & Numbers — tuition 300; Reason +4; Wits +2;
- Arcana — tuition 500; Magic +4; Reason +4; Creativity +2;
- Rhetoric & Social — tuition 300; Charm +3; Sociability +3; Wits +2;
- Etiquette & Presentation — tuition 400; Manners +3; Grooming +3; Charm +2;
- Field Craft — tuition 400; Dexterity +3; Wits +3; Creativity +2;
- Physical Training — tuition 400; Strength +3; Endurance +3; Dexterity +2;
- Arts & Performance — tuition 500; Creativity +3; Charm +3; Sociability +2; Dexterity +2;
- Body Confidence — tuition 400; Sexuality +3; Grooming +3; Endurance +2.

All paid courses retain current-day Energy cost 1.

The authored scene/text files do not state alternative tuition, Energy or stat rewards.

## Lust guard

Audit result: PASS.

No item 82–87 scene asserts a Lust gain.

Body Confidence text discusses self-presentation, grooming, boundaries and confidence without converting the locked Sexuality progression stat into a Lust mutation.

## Paid / Night counter separation

Audit result: PASS.

No authored scene claims:
- paid lessons increment `night_study_sessions`;
- Night study increments `lessons_completed`;
- teacher/social scenes increment either counter.

Night-study flavor explicitly preserves the separate locked Night transaction.

## Teacher prerequisite guard

Audit result: PASS.

The teacher draft, text bank, relationship seeds and presentation briefs explicitly keep teacher identity/content outside ordinary paid-lesson availability.

No relationship seed is framed as a paid-course prerequisite.

## Public-result guard

Audit result: PASS.

No authored text selects:
- management/accounting provider or threshold;
- management/accounting public-result semantics;
- Arcana/Forest provider or threshold;
- Arcana/Forest public-result semantics;
- new career route unlock.

Relationship/world reaction hooks are phrased as optional reactions to future approved public results only.

## Milestone neutrality

Audit result: PASS.

The repeatable lesson and neutral scene banks do not:
- award certificates;
- complete projects;
- pass exams;
- cross named milestone thresholds;
- publish results.

The milestone-neutral bank explicitly quarantines those semantics.

## Presentation consistency

Audit result: PASS.

Presentation briefs:
- preserve existing paid semantic IDs;
- keep final art style OPEN;
- require text/static fallback;
- keep GIF optional;
- prohibit media timing from controlling gameplay.

No teacher presentation changes gameplay course IDs.

## Voice consistency

Audit result: PASS.

Across items 82, 84, 85, 86 and 87:
- Mara remains practical and exact;
- Ilyra remains observational and methodical;
- Cassian remains energetic and improvisational;
- Eliane remains controlled and detail-focused;
- Rowan remains concise and practical;
- Tovan remains disciplined and form-focused;
- Nessa remains expressive and intention-focused;
- Sera remains calm and deliberate about self-presentation.

No obvious teacher identity drift was found.

## Rejected implications

The audit found no authored sentence that requires removal for implying:
- different tuition;
- different paid Energy cost;
- different stat gains;
- Lust gain;
- paid/Night counter mixing;
- teacher prerequisite;
- unapproved public result.

## Integration status

Items 82–87 are internally consistent CONTENT_DRAFT material.

They are eligible for selective Lead integration as content/presentation authoring, subject to:
- Lead acceptance of proposed teacher identities;
- production content conversion/inclusion;
- normal content/schema validation;
- no runtime changes unless later authored requirements demonstrate a missing primitive.

This audit does not claim runtime tests were executed.
