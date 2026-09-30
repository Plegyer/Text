# Chat 5 Whole-School Transfer Atlas v5 Candidate Handoff

Date: 2026-09-30
Owner: Chat 5 / School + Text Localization Content Worker
Task: C5-48
Branch: `chat5/school-transfer-atlas-v5`
Queue initial baseline: `main@8265a6af2bd87b9e69f0bce96e6a20a80a9e852c`
Refreshed candidate base: `main@14c59901fce0899aa05c62edf6ebc6c556547d43`

## Scope

Candidate for C5-37 through C5-47.

The queue consolidates all ten ordinary careers into one current School capability atlas, re-audits the Lumber School text seam after current integration, prepares additional RU/EN reactive School copy across the existing career mappings, locks all eight teacher identities to coherent transfer coverage, and adds focused parity/collision regression.

No new curriculum, teacher, threshold, School producer fact, career state, Save field, NightFlow rule, runtime consumer, Activity rule, economy rule, relationship state, or presentation/media asset is introduced.

## C5-37 — whole-School ordinary-career transfer atlas

Added:
- `content/school-whole-career-transfer-atlas-v1.fixture.json`
- `docs/school-prep/SCHOOL_WHOLE_CAREER_TRANSFER_ATLAS_V1.md`

Exact current ordinary career/action set:
- `lumber` / `lumber.shift`;
- `satyr-maid` / `satyr-maid.shift`;
- `undead-farm` / `undead-farm.shift`;
- `tavern` / `tavern.shift`;
- `hunter` / `hunter.shift`;
- `guard` / `guard.shift`;
- `merchant` / `merchant.shift`;
- `artist-geisha` / `artist-geisha.shift`;
- `assassin` / `assassin.shift`;
- `prostitute` / `prostitute.shift`.

The atlas uses only the eight current School courses and current teacher identities.

All `selectedThreshold` and `selectedProducerPublicFactId` fields remain null.

Lumber records the existing downstream management transport context:
- `lumber.school.management-ready`;
- `lumber-cross.school-management-return`.

It does not claim that School currently produces that fact.

## C5-38 — Lumber School text re-audit

Added:
- `content/school-lumber-text-reaudit-v1.fixture.json`
- `docs/school-prep/SCHOOL_LUMBER_TEXT_REAUDIT_V1.md`

Current-main integration already provides RU/EN coverage for:
- Lumber career/shift labels;
- Foreman relationship;
- stages/endings;
- Forest Activity return;
- presentation accessibility text.

Content-only / semantic gaps retained:
1. `lumber-cross.school-management-return` still relies on embedded English pack text without matching current RU/EN root-localization keys;
2. management provider/milestone/threshold/publication remains open;
3. Arcana direct School-to-Forest public result/consumer remains open.

Existing prepared Mara/Literacy and Ilyra/Arcana content remains sufficient; no new course is needed.

## C5-39 — Satyr Maid reactive depth

Added:
- `content/school-satyr-maid-reactive-depth-v1.fixture.json`
- `docs/school-prep/SCHOOL_SATYR_MAID_REACTIVE_DEPTH_V1.md`

Prepared paired teacher/lesson RU/EN reactions for:
- Rhetoric & Social;
- Literacy & Numbers;
- Arts & Performance;
- Body Confidence;
- Etiquette & Presentation.

No House Power state, career fact, threshold, relationship state or Lust effect is authored.

## C5-40 — Undead Farm reactive depth

Added:
- `content/school-undead-farm-reactive-depth-v1.fixture.json`
- `docs/school-prep/SCHOOL_UNDEAD_FARM_REACTIVE_DEPTH_V1.md`

Prepared paired teacher/lesson RU/EN reactions for:
- Arcana;
- Literacy & Numbers;
- Field Craft;
- Rhetoric & Social;
- supporting Physical Training.

Field Craft remains the existing practical-handling/improvisation course. No repair/craft curriculum, research state, successor state, specimen state or Activity route is created.

## C5-41 — Tavern / Hunter reactive depth

Added:
- `content/school-tavern-hunter-reactive-depth-v1.fixture.json`
- `docs/school-prep/SCHOOL_TAVERN_HUNTER_REACTIVE_DEPTH_V1.md`

Tavern coverage:
- Rhetoric & Social;
- Literacy & Numbers;
- Etiquette & Presentation;
- Arcana.

Hunter coverage:
- Field Craft;
- Arcana;
- Literacy & Numbers;
- Physical Training.

No practical-medicine curriculum, Activity route, preservation mechanic, threshold or career state is added.

## C5-42 — Guard / Merchant reactive depth

Added:
- `content/school-guard-merchant-reactive-depth-v1.fixture.json`
- `docs/school-prep/SCHOOL_GUARD_MERCHANT_REACTIVE_DEPTH_V1.md`

Guard coverage:
- Literacy & Numbers;
- Rhetoric & Social;
- Etiquette & Presentation;
- Physical Training;
- Arcana.

Merchant coverage:
- Literacy & Numbers;
- Rhetoric & Social;
- Etiquette & Presentation;
- Arcana.

No Guard recommendation, Palace access, price/credit/inventory rule, threshold or public result is created.

## C5-43 — Artist-Geisha reactive depth

Added:
- `content/school-artist-geisha-reactive-depth-v1.fixture.json`
- `docs/school-prep/SCHOOL_ARTIST_GEISHA_REACTIVE_DEPTH_V1.md`

Prepared RU/EN reactions for:
- Arts & Performance;
- Etiquette & Presentation;
- Rhetoric & Social;
- Body Confidence;
- Literacy & Numbers.

No specialized history/music/dance/craft curriculum, relationship state, Palace access or advanced career gate is created.

## C5-44 — Assassin reactive depth

Added:
- `content/school-assassin-reactive-depth-v1.fixture.json`
- `docs/school-prep/SCHOOL_ASSASSIN_REACTIVE_DEPTH_V1.md`

Current Assassin design still has no explicit School dependency section, so mappings remain `CAPABILITY_MATCH_ONLY`.

Prepared content remains non-combat:
- route/fallback planning;
- neutral questioning;
- context-appropriate presentation;
- evidence/timeline gaps;
- controlled movement.

No combat curriculum, target, contract state, lethal/nonlethal rule, Activity route or career state is created.

## C5-45 — voluntary Prostitute reactive depth

Added:
- `content/school-prostitute-reactive-depth-v1.fixture.json`
- `docs/school-prep/SCHOOL_PROSTITUTE_REACTIVE_DEPTH_V1.md`

Prepared non-explicit RU/EN reactions for:
- Rhetoric & Social;
- Literacy & Numbers;
- Etiquette & Presentation;
- Arts & Performance;
- Body Confidence.

Locked boundaries:
- voluntary ordinary career;
- presentation/confidence != consent;
- Body Confidence/Sexuality != Lust;
- no Secret Debt write;
- no NightFlow change;
- no client state or relationship write.

## C5-46 — all-teacher transfer coverage

Added:
- `content/school-teacher-transfer-coverage-v2.fixture.json`
- `docs/school-prep/SCHOOL_TEACHER_TRANSFER_COVERAGE_V2.md`

Prepared one atlas-level RU/EN transfer reaction for all eight current teachers:
- Mara Fen;
- Ilyra Venn;
- Cassian Reed;
- Eliane Marrow;
- Rowan Pike;
- Tovan Kest;
- Nessa Lark;
- Sera Vey.

Each entry lists only careers whose atlas mappings actually use that teacher's current course.

Teachers remain educators, not career gatekeepers or state writers.

## C5-47 — stable-ID / RU-EN parity / collision regression

Added:
- `tests/school-transfer-atlas-parity-v1.test.ts`
- `docs/school-prep/SCHOOL_TRANSFER_ATLAS_PARITY_REGRESSION_V1.md`

Focused test locks:
- exact ten current ordinary career/action pairs;
- existing School course IDs only;
- null threshold/producer decisions;
- exact current Lumber downstream consumer transport context;
- stable localization refs;
- complete RU/EN parity;
- zero current root-localization collisions;
- exact eight teacher IDs/course identities;
- mechanics-neutral fixtures;
- Assassin non-combat boundary;
- voluntary Prostitute non-explicit/Lust/consent/Secret-Debt/NightFlow boundary.

## Prepared localization inventory

C5-39 through C5-46 prepare:
- 120 unique localization keys;
- 120/120 RU non-empty;
- 120/120 EN non-empty;
- zero duplicate prepared keys;
- zero collision with current root localization at pre-PR revalidation.

Prepared strings remain fixture-local. Root `content/localization.json` is not modified.

## Current-main refresh before freeze

The queue started on `8265a6af...`.

Before C5-48 freeze, current main advanced to `14c59901...` and the current Chat 5 pointer explicitly required a fresh-current-main candidate carrying forward only new queue-v5 School docs/fixtures/tests.

The candidate branch was therefore rebuilt on `14c59901fce0899aa05c62edf6ebc6c556547d43` with exactly the 23 new C5-37..48 paths. Earlier branch history was not carried into the refreshed candidate.

Current main already contains the merged School depth and late-career preparation sources from PR #90 / PR #99. This queue does not duplicate or modify those merged paths.

Revalidation on the refreshed base found:
- all ten career IDs still exist;
- all ten `.shift` action IDs still exist;
- all mapped School course IDs still exist;
- all threshold / producer fields remain null;
- all 120 new localization keys remain collision-free against current root localization.

The refreshed candidate now satisfies the pointer resync rule before exact-head CI / QA freeze.

## Pre-PR static validation

PASS:
- 10 new JSON fixture files parse;
- 10/10 target careers exist;
- 10/10 target `.shift` actions exist;
- every mapped course exists in current School source;
- 120 prepared reactive/transfer keys;
- 120/120 RU non-empty;
- 120/120 EN non-empty;
- 120/120 unique;
- zero current root-localization collisions;
- zero selected School thresholds;
- zero selected School producer public facts.

## Ownership surface

Candidate adds only:
- School-owned docs;
- School-owned fixture-local content;
- one School-owned focused regression test.

It does not modify:
- `src/`;
- `content/definitions.json`;
- root `content/localization.json`;
- production packs;
- career/relationship state;
- Activity runtime;
- Save/RNG;
- NightFlow;
- economy/balance;
- presentation/media assets.

## Open integration dependencies

This candidate does not invent a runtime producer/consumer.

Future selective integration still requires approved identities for:
- School provider/milestone;
- threshold, if any;
- durable public result;
- publication timing;
- career consumer.

Exact paid-course reactive routing remains a shared Integration concern because the current School lesson reaction fact is generic `actionCompleted: school` rather than exact-course-specific.

## Candidate state

Open one focused PR from this branch. The exact PR head must pass `mindy-successor check`. After green CI, record that exact head in the PR as `CANDIDATE_FROZEN` for Chat 4 QA. Do not move it for unrelated main drift.
