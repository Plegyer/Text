# Chat 5 School Generic / Night v7 Candidate Handoff

Date: 2026-09-30
Owner: Chat 5 / School + Text Localization Content Worker
Task: C5-72
Branch: `chat5/school-generic-night-v7`
Refreshed candidate base: `main@32e255f2371e8782c8ad832d7e0811f9afd086da`

## Scope

Candidate for C5-61 through C5-71.

The queue audits the existing generic after-School completion seam, maps every exact Night-study semantic choice, prepares RU/EN generic/Night-study/transfer text, audits journal/localization terminology, normalizes fixture-local tuition/Energy wording, prepares teacher tone consistency guidance, and adds a focused parity/collision regression.

No runtime, Save, NightFlow, career, Activity, economy, relationship, curriculum, threshold, producer fact or presentation/media behavior is changed.

## C5-61 — generic after-School inventory

Added:
- `content/school-generic-after-school-inventory-v1.fixture.json`
- `docs/school-prep/SCHOOL_GENERIC_AFTER_SCHOOL_INVENTORY_V1.md`

Current production has two generic `actionCompleted: school` consumers:
- `school-life-content-v1.after-paid-lesson`;
- `school-lesson-content-v1.after-school`.

Safe generic copy may mention a completed paid lesson, reflection, notes, already-applied tuition/Energy, and returning to the day.

Unsafe without exact course identity:
- course name;
- teacher name/live dialogue;
- stat-specific exercise;
- milestone/career result;
- course inference from stat deltas.

No runtime consumer is selected.

## C5-62 — generic after-School RU/EN depth

Added:
- `content/school-generic-after-school-depth-v1.fixture.json`
- `docs/school-prep/SCHOOL_GENERIC_AFTER_SCHOOL_DEPTH_V1.md`

Prepared six generic RU/EN variants safe for `actionCompleted: school`.

They remain course-neutral and teacher-neutral.

## C5-63 — exact Night-study choice atlas

Added:
- `content/school-exact-night-study-choice-atlas-v1.fixture.json`
- `docs/school-prep/SCHOOL_EXACT_NIGHT_STUDY_CHOICE_ATLAS_V1.md`

Current exact choice count: 24.

Every current School Night-study ID is mapped to:
- exact course;
- exact track;
- current teacher content identity as metadata;
- exact stat;
- +2 stat gain;
- `night_study_sessions`;
- next-day Energy −1;
- exact `nightChoiceCompleted(choiceId)` fact.

Teacher identity is not emitted by the runtime fact.

## C5-64 — exact Night-study RU/EN reactive depth

Added:
- `content/school-exact-night-study-reactive-depth-v1.fixture.json`
- `docs/school-prep/SCHOOL_EXACT_NIGHT_STUDY_REACTIVE_DEPTH_V1.md`

Prepared one RU/EN title/body pair for all 24 exact Night-study choices.

Night contract remains unchanged:
- tuition 0;
- current-day Energy 0;
- selected stat +2;
- next-day Energy −1;
- no extra progress;
- no career progress;
- no NightFlow change.

## C5-65 — Night-study teacher boundary audit

Added:
- `content/school-night-study-teacher-boundary-audit-v1.fixture.json`
- `docs/school-prep/SCHOOL_NIGHT_STUDY_TEACHER_BOUNDARY_AUDIT_V1.md`

Safe:
- record the current teacher as content metadata for the course encoded in the exact Night-study choice;
- use remembered teacher method/tone in private reflection.

Unsafe:
- claim teacher presence;
- live teacher dialogue;
- teacher relationship writes;
- teacher events;
- new NightFlow step.

## C5-66 — starter-career transfer reflection v2

Added:
- `content/school-starter-career-transfer-reflection-v2.fixture.json`
- `docs/school-prep/SCHOOL_STARTER_CAREER_TRANSFER_REFLECTION_V2.md`

Prepared two RU/EN variants each for:
- Lumber;
- Satyr Maid;
- Undead Farm.

Existing School mappings only. Thresholds/public results remain null.

## C5-67 — late-career transfer reflection v2

Added:
- `content/school-late-career-transfer-reflection-v2.fixture.json`
- `docs/school-prep/SCHOOL_LATE_CAREER_TRANSFER_REFLECTION_V2.md`

Prepared two RU/EN variants each for:
- Tavern;
- Hunter;
- Guard;
- Merchant;
- Artist-Geisha;
- Assassin;
- voluntary ordinary Prostitute.

Assassin remains capability-only/non-combat. Voluntary Prostitute remains non-explicit and distinct from Lust/consent/Secret Debt.

## C5-68 — journal/localization consistency audit

Added:
- `content/school-journal-localization-consistency-audit-v1.fixture.json`
- `docs/school-prep/SCHOOL_JOURNAL_LOCALIZATION_CONSISTENCY_AUDIT_V1.md`

Recorded current content inconsistencies:
- canonical RU Literacy & Numbers label: `Грамотность и счёт`; presentation caption currently uses `Грамота и числа`;
- canonical RU Etiquette & Presentation label: `Этикет и самопрезентация`; presentation caption currently uses `Этикет и подача`;
- paid-lesson journal entry uses raw English `SchoolCourse.label` and has null journal localization ref;
- paid-lesson lastAction stores raw English fallback text while localized UI result text exists separately;
- RU School mechanics copy currently mixes `Energy` / `Энергия` and `Оплата` / `Стоимость`.

Audit only; no production localization or journal schema edit.

## C5-69 — tuition / Energy wording consistency

Added:
- `content/school-tuition-energy-wording-consistency-v1.fixture.json`
- `docs/school-prep/SCHOOL_TUITION_ENERGY_WORDING_CONSISTENCY_V1.md`

Fixture-local convention:
- RU tuition term: `Стоимость`;
- EN: `Tuition`;
- mechanics resource name: `Energy`;
- current-day versus next-day Energy always stated explicitly.

Numeric behavior copied exactly from current production; no value changes.

## C5-70 — teacher tone consistency matrix v3

Added:
- `content/school-teacher-tone-consistency-matrix-v3.fixture.json`
- `docs/school-prep/SCHOOL_TEACHER_TONE_CONSISTENCY_MATRIX_V3.md`

Preserves all eight existing teacher identities and educator-only roles.

No teacher state, relationship write, threshold, public result or runtime consumer.

## C5-71 — generic / Night-study parity regression

Added:
- `tests/school-generic-night-v7-parity.test.ts`
- `docs/school-prep/SCHOOL_GENERIC_NIGHT_V7_PARITY_REGRESSION.md`

Regression locks:
- exactly two current production generic School-completion consumers;
- all 24 current Night-study exact IDs;
- exact Night-study mechanics invariants;
- no teacher identity emitted by Night-study runtime facts;
- current starter/late career IDs;
- null transfer thresholds/public results;
- exact known journal/localization terminology gaps;
- all eight teacher tone identities;
- RU/EN parity, stable references and collision checks.

## Prepared localization inventory

C5-62, C5-64, C5-66, C5-67, C5-69 and C5-70 prepare:
- 124 unique fixture-local localization keys;
- 124/124 RU non-empty;
- 124/124 EN non-empty;
- zero duplicate prepared keys;
- zero collision with current root localization after current-main revalidation.

Root `content/localization.json` is not modified.

## Current-main refresh

Working queue began on `main@871a9a94e76e1df0449fdef513e9173bd9fce009`.

Before C5-72 candidate handoff, main advanced to `32e255f2371e8782c8ad832d7e0811f9afd086da`.

The candidate branch was rebuilt from that exact current main with only the 22 new C5-61..71 School docs/fixtures/test paths.

Revalidation on refreshed main:
- 124 prepared keys remain collision-free;
- all 24 exact Night-study choices still exist;
- the two production generic School-completion consumers remain unchanged;
- all transfer thresholds/public results remain null.

## Ownership surface

Candidate adds only School-owned:
- docs;
- fixture-local content;
- one focused regression test.

It does not modify:
- `src/`;
- `content/definitions.json`;
- root `content/localization.json`;
- production packs;
- presentation/media assets;
- Save/RNG;
- NightFlow;
- career/relationship/Activity/economy mechanics.

## Explicit routing gaps

Still unresolved and not invented:
- exact paid-course reactive identity for generic School completion;
- teacher identity in Night-study runtime facts;
- teacher-event routing;
- localized runtime journal references.

## Candidate state

Open one focused PR from this refreshed branch. Freeze only the exact head that passes `mindy-successor check`. Record the exact frozen head for Chat 4 QA. Do not move it for unrelated main drift.
