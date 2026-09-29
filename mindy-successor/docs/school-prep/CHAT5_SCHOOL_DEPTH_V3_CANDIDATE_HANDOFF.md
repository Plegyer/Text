# Chat 5 School Depth v3 Candidate Handoff

Date: 2026-09-29
Owner: Chat 5 / School + Text Localization Content Worker
Task: C5-24
Branch: `chat5/school-depth-v3`
Initial baseline: `main@32f48d15708a543ee26b90b78761da63b3363da2`

## Scope

Candidate for C5-15 through C5-23 only.

It deepens the six existing School courses not covered by the pending PR #85 Literacy/Arcana depth candidate, audits all eight courses, maps current School courses to Satyr Maid and Undead Farm preparation opportunities, and adds focused RU/EN/stable-ID regression coverage.

No new course, teacher identity, milestone threshold, public fact, career state, Activity route, runtime consumer, Save field, NightFlow rule, presentation asset, tuition, Energy rule, or stat package is added.

## C5-15 — whole-School coverage audit

Added:
- `docs/school-prep/SCHOOL_WHOLE_CONTENT_COVERAGE_AUDIT_V1.md`

Current finding:
- all eight courses have active mechanics, RU/EN labels/descriptions, generic School presentation flow, and reusable nested English-only authored lesson seeds;
- exact-course teacher/lesson reactive routing is still absent from the shared runtime;
- Literacy & Numbers / Arcana have depth pending in PR #85;
- the other six courses were the active thin player-facing content set for C5-16..21.

## C5-16 — Rhetoric & Social

Added:
- `content/school-rhetoric-and-social-depth-v1.fixture.json`
- `docs/school-prep/SCHOOL_RHETORIC_SOCIAL_DEPTH_HANDOFF_V1.md`

Existing identities:
- `school.course.rhetoric_and_social`
- `school.track.rhetoric_and_social`
- `school.teacher.cassian-reed`

Prepared RU/EN depth:
- adapting one point to different audiences;
- hearing unstated assumptions;
- recovering from an awkward opening;
- milestone-neutral room-reading feedback.

## C5-17 — Etiquette & Presentation

Added:
- `content/school-etiquette-and-presentation-depth-v1.fixture.json`
- `docs/school-prep/SCHOOL_ETIQUETTE_PRESENTATION_DEPTH_HANDOFF_V1.md`

Existing identities:
- `school.course.etiquette_and_presentation`
- `school.track.etiquette_and_presentation`
- `school.teacher.eliane-marrow`

Prepared RU/EN depth:
- deliberate entry/presence;
- purpose behind social conventions;
- minimal intentional presentation changes;
- milestone-neutral composure after mistakes.

## C5-18 — Field Craft

Added:
- `content/school-field-craft-depth-v1.fixture.json`
- `docs/school-prep/SCHOOL_FIELD_CRAFT_DEPTH_HANDOFF_V1.md`

Existing identities:
- `school.course.field_craft`
- `school.track.field_craft`
- `school.teacher.rowan-pike`

Prepared RU/EN depth:
- noticing change before interpretation;
- solving the task when a familiar tool is missing;
- route choice according to purpose;
- milestone-neutral transferable field notes.

No Activity route, entry rule, result, capability, or mechanic is created.

## C5-19 — Physical Training

Added:
- `content/school-physical-training-depth-v1.fixture.json`
- `docs/school-prep/SCHOOL_PHYSICAL_TRAINING_DEPTH_HANDOFF_V1.md`

Existing identities:
- `school.course.physical_training`
- `school.track.physical_training`
- `school.teacher.tovan-kest`

Prepared RU/EN depth:
- repeatable form;
- pacing;
- alignment before force;
- consistency under fatigue.

No tuition, Energy, Strength/Endurance/Dexterity package, or career mechanics change.

## C5-20 — Arts & Performance

Added:
- `content/school-arts-and-performance-depth-v1.fixture.json`
- `docs/school-prep/SCHOOL_ARTS_PERFORMANCE_DEPTH_HANDOFF_V1.md`

Existing identities:
- `school.course.arts_and_performance`
- `school.track.arts_and_performance`
- `school.teacher.nessa-lark`

Prepared RU/EN depth:
- committing to an intention;
- tempo changing meaning;
- adapting an old performance pattern;
- milestone-neutral partner awareness.

No festival/career/relationship state is authored.

## C5-21 — Body Confidence

Added:
- `content/school-body-confidence-depth-v1.fixture.json`
- `docs/school-prep/SCHOOL_BODY_CONFIDENCE_DEPTH_HANDOFF_V1.md`

Existing identities:
- `school.course.body_confidence`
- `school.track.body_confidence`
- `school.teacher.sera-vey`

Prepared RU/EN depth:
- releasing unnecessary tension;
- self-care without an imagined audience;
- clear boundaries;
- milestone-neutral deliberate presence.

Explicit invariant:
- Body Confidence / Sexuality is not equated with Lust, consent, willingness, or adult-content routing.
- no Lust effect or routing change is authored.

## C5-22 — Satyr Maid School mapping

Added:
- `content/school-satyr-maid-mapping-v1.fixture.json`
- `docs/school-prep/SCHOOL_SATYR_MAID_MAPPING_V1.md`

Current target identities:
- career `satyr-maid`;
- action `satyr-maid.shift`.

Mapped existing School opportunities:
- Rhetoric & Social -> conflict/VIP/negotiation/house-rule context;
- Literacy & Numbers -> supply/payroll/scheduling/management records;
- Arts & Performance -> festival/event/performance-adjacent service;
- Body Confidence -> deliberate service presence and boundaries without Lust equivalence;
- Etiquette & Presentation -> elite/formal guest protocol.

No thresholds, Satyr-facing School facts, House Power transition, or career state is created.

## C5-23 — Undead Farm School mapping

Added:
- `content/school-undead-farm-mapping-v1.fixture.json`
- `docs/school-prep/SCHOOL_UNDEAD_FARM_MAPPING_V1.md`

Current target identities:
- career `undead-farm`;
- action `undead-farm.shift`.

Mapped existing School opportunities:
- Arcana -> anomaly/magical-resource/research preparation;
- Literacy & Numbers -> supply records / production logs / management context;
- Field Craft -> existing practical-tool/improvisation course used as the closest current match to the draft's practical-craft hook;
- Rhetoric & Social -> supplier/Merchant negotiation;
- Physical Training -> supporting-only ordinary physical preparation, not a dedicated Farm gate.

No Research/Successor state, specimen result, Activity route, threshold, or public fact is created.

## C5-24 regression

Added:
- `tests/school-depth-v3-parity.test.ts`

The focused regression locks:
- all six depth fixtures to `formatVersion=1` and `CONTENT_PREP_ONLY`;
- all 48 prepared player-facing keys have non-empty RU + EN;
- prepared keys are unique and stable;
- all six fixtures use exact existing course/track/teacher IDs;
- all six keep effects/world-fact publication empty;
- Body Confidence keeps Lust effects/routing empty;
- Field Craft keeps Activity writes/route unlocks empty;
- Satyr Maid mapping targets shipped `satyr-maid` / `satyr-maid.shift`;
- Undead Farm mapping targets shipped `undead-farm` / `undead-farm.shift`;
- mapping thresholds and public fact IDs remain null.

## Current-main revalidation

Before C5-24 candidate handoff, current main advanced to `b56628a81098146e7a2fc2c70b193e2587b9f025`.

The 29 commits since the branch baseline include Lumber/poverty/shared localization/UI consolidation. Material revalidation for this candidate:
- no School runtime/source file changed;
- no Satyr Maid or Undead Farm career/action identity changed;
- this candidate does not modify root `content/localization.json`, so shared localization movement creates no file conflict;
- all 48 prepared keys were checked against current root localization and have zero collisions;
- all mapped current career/action/course identities still exist.

No semantic overlap requires a rebase solely for base drift under the candidate freeze protocol.

## Pre-PR static checks

PASS:
- 8 new JSON fixtures parse successfully;
- 48 new RU/EN prepared keys;
- 48/48 non-empty RU;
- 48/48 non-empty EN;
- zero duplicate prepared keys;
- zero collisions with current root localization;
- all mapped School course IDs still exist in current School source;
- `satyr-maid`, `satyr-maid.shift`, `undead-farm`, `undead-farm.shift` exist in current definitions;
- all mapping `selectedThreshold` and `selectedPublicFactId` fields remain null.

## Ownership surface

Candidate adds only:
- School-owned docs;
- School-owned content fixtures;
- one School-owned focused test.

It does not modify:
- `src/`;
- root `content/localization.json`;
- root production packs;
- `content/definitions.json`;
- presentation/media assets;
- career/relationship/Activity state machines;
- Save/RNG/NightFlow.

## Open integration dependencies

Exact-course teacher/lesson presentation routing remains a shared Integration concern. Current paid School reaction identity is generic and does not safely identify the exact course for reactive authored text.

These fixtures therefore remain content preparation and stable-ID evidence until a safe existing consumer is selected or a separately approved minimal integration seam is implemented.

Satyr Maid and Undead Farm production designs still need Product/Integration decisions for any real School provider, threshold, durable public result, and career consumer. This candidate intentionally does not choose them.

## Candidate state

The PR opened from this branch must not be declared frozen until exact-head `mindy-successor check` is green. After green CI:
- record the exact head in the PR;
- freeze it for Chat 4;
- do not move the head for unrelated `main` drift.
