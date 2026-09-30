# Chat 5 School Localization Queue v9 Candidate Handoff

Owner: Chat 5 / School + Text Localization Content Worker
Queue: C5-85 through C5-96
Candidate branch: `chat5/school-localization-v9`
Current-main baseline: `a341303183dc277a26b3e64a61d8ed8e35c5d05f`

## Scope

This candidate contains only new School-owned documentation, fixture-local RU/EN preparation, and focused School content-side regressions absent from current main.

It does not modify:
- runtime/source code;
- Save/RNG;
- NightFlow;
- career or Activity state;
- economy/prices;
- root localization;
- production packs;
- presentation/media assets;
- producer/public-result state;
- curriculum/course/teacher canon;
- thresholds.

## C5-85 — post-v8 reachability audit

Current player-facing School text surfaces:
- `school-life-content-v1.after-paid-lesson`;
- `school-lesson-content-v1.after-school`;
- `school-life-content-v1.after-night-study`;
- paid-lesson journal/history text.

Identity boundaries:
- generic paid-lesson events expose only `actionCompleted: school`;
- Night-study exposes exact choice/course identity across 24 current choices;
- paid-lesson journal uses exact English course label but no localization ref;
- transfer atlases, target authored libraries, and prepared content remain preparation-only.

No current audited surface is classified obsolete.

## C5-86 — generic after-School depth v3

Prepared 8 additional RU/EN generic post-lesson variants.

They remain course/teacher agnostic and add no second charge, hidden progress, milestone, certificate, threshold, or career result.

## C5-87 — exact Night-study depth v3

Prepared one RU/EN title/body pair for all 24 current exact `school.night_study.*` choices.

Each entry uses only its existing `nightChoiceCompleted(choiceId)` identity.

Locked Night-study behavior remains:
- tuition 0;
- current-day Energy 0;
- selected stat +2;
- next-day Energy -1;
- no extra School/career progress;
- no NightFlow change.

## C5-88 — journal/result terminology consistency v3

All 8 canonical course labels/descriptions and all course/teacher presentation metadata have RU/EN localization pairs.

Recorded terminology mismatches:
- canonical `Грамотность и счёт` versus presentation/teacher metadata `Грамота и числа`;
- canonical `Этикет и самопрезентация` versus presentation/teacher metadata `Этикет и подача`.

Paid-lesson journal and lastAction fallback remain raw English; `ui.school.lessonResult` remains localized separately.

## C5-89 — teacher identity safety v3

All 8 current teachers remain educator-only.

Safe exact-identity surfaces:
- teacher media alt/caption localization keyed by exact media ID;
- target authored teacher/course mappings when routed by exact identity;
- remembered teacher method during an exact-course Night-study reflection.

Unsafe:
- teacher-specific wording from generic `actionCompleted: school`;
- claiming live teacher presence from Night-study choice identity;
- teacher relationship writes;
- new teacher events/triggers;
- cross-course teacher attribution.

## C5-90 — starter-career transfer wording v4

Prepared 6 additional RU/EN transfer reflections across:
- Lumber;
- Satyr Maid;
- Undead Farm.

Only existing School mappings are used. All threshold/public-result selections remain null.

## C5-91 — late-career transfer wording v4

Prepared one new RU/EN transfer reflection for each current non-starter ordinary career:
- Tavern;
- Hunter;
- Guard;
- Merchant;
- Artist-Geisha;
- Assassin;
- ordinary voluntary Prostitute.

No unlock, promotion, threshold, economy, relationship, Activity, or public-result claim is added.

Assassin remains planning/analysis-only and non-combat. Adult-career wording remains non-explicit and separate from consent/Lust mechanics.

## C5-92 — Body Confidence boundary audit v3

Verified current Body Confidence surfaces remain distinct from:
- Lust mechanics;
- consent mechanics;
- adult-career progression;
- public-result production;
- NightFlow changes.

Audited current Body Confidence depth/reactive fixtures, teacher tone, exact Night-study choices, and localized presentation metadata.

No boundary violation found.

## C5-93 — fallback/localization audit v2

Current-main complete RU/EN coverage:
- 8 canonical course labels;
- 8 canonical course descriptions;
- 8 course presentation alt pairs;
- 8 course presentation caption pairs;
- 8 teacher media alt pairs;
- 8 teacher media caption pairs;
- both generic paid-lesson events;
- generic Night-study event;
- generic Night-study UI template.

Remaining fallback-only surfaces:
- paid-lesson journal: raw English + null localization ref;
- paid-lesson lastAction fallback: raw English;
- 24 Night-study definition labels: raw English fallback data, with localized UI template available.

No missing or empty RU/EN pair was found in audited localized surfaces.

## C5-94 — RU/EN parity regression v5

Added:
- `tests/school-localization-v9-parity.test.ts`;
- `docs/school-prep/SCHOOL_RU_EN_PARITY_REGRESSION_V5.md`.

The regression locks:
- current player-facing reachability;
- 8 generic v3 variants;
- all 24 exact Night-study IDs;
- all 8 course identities;
- all 8 teacher/media identities;
- current starter and late career/action/course mappings;
- Body Confidence boundaries;
- fallback coverage;
- paid-lesson journal localization gap;
- all 90 prepared queue-v9 localization keys.

## C5-95 — ownership/collision regression v4

Added:
- `content/school-queue-v9-ownership-collision-regression-v4.fixture.json`;
- `tests/school-localization-v9-ownership.test.ts`;
- `docs/school-prep/SCHOOL_OWNERSHIP_COLLISION_REGRESSION_V4.md`.

The contract excludes:
- runtime/source;
- Save/RNG;
- NightFlow;
- career/Activity/economy state;
- root localization;
- production packs;
- presentation/media;
- producer/public-result state;
- curriculum;
- teacher canon.

It also verifies mechanic-write arrays/counts remain empty/zero and runtime-consumer/threshold/public-result decisions remain null.

## Prepared localization inventory

Queue-v9 prepares:
- 90 unique fixture-local localization keys;
- 90/90 RU non-empty;
- 90/90 EN non-empty;
- zero duplicate prepared keys;
- zero collision with current root localization.

Breakdown:
- C5-86 generic depth: 16 keys;
- C5-87 exact Night-study depth: 48 keys;
- C5-90 starter transfer wording: 12 keys;
- C5-91 late transfer wording: 14 keys.

Root `content/localization.json` is not modified.

## Static pre-PR validation

Revalidated against `main@a341303183dc277a26b3e64a61d8ed8e35c5d05f`:
- 90 prepared keys;
- 90 unique;
- all RU/EN pairs non-empty;
- zero current root-localization collisions;
- all 24 exact Night-study choices still present;
- both generic paid-lesson production consumers unchanged;
- all 8 teacher media identities present;
- all 8 teacher media alt/caption RU/EN pairs present;
- transfer thresholds/public-result selections remain null;
- paid-lesson journal still uses null localization ref and raw English fallback;
- paid-lesson lastAction fallback remains raw English.

Result: **PASS**.

## Explicit routing gaps

Not invented by this candidate:
- exact paid-course identity is absent from generic `actionCompleted: school`;
- Night-study facts do not emit teacher presence;
- paid-lesson journal has no localization ref;
- paid-lesson lastAction retains raw English fallback;
- transfer wording has no approved runtime consumer, threshold, or producer/public-result selection.

## Candidate rule

Open one focused PR from this branch. Freeze only the exact head that passes repository `mindy-successor check`. Do not move a frozen head for unrelated main drift. Any later push requires a concrete CI/QA blocker or explicit Lead request and a full exact-head re-gate.
