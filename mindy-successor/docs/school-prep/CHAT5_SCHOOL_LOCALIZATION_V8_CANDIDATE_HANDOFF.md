# Chat 5 School Localization Queue v8 Candidate Handoff

Owner: Chat 5 / School + Text Localization Content Worker
Queue: C5-73 through C5-84
Candidate branch: `chat5/school-localization-v8`
Refreshed candidate base: `main@beb699637f5326ff74f2a2039d8e3272f0223f13`

## Scope

This candidate adds only School-owned documentation, fixture-local content preparation, and focused School content-side regressions.

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
- curriculum, thresholds, or new teacher identities.

## C5-73 — current-main reachability audit

Current player-facing / consumer-ready School text:
- `school-life-content-v1.after-paid-lesson`;
- `school-lesson-content-v1.after-school`;
- `school-life-content-v1.after-night-study`.

Identity boundaries:
- generic paid-lesson completion knows only `actionCompleted: school`;
- Night-study completion knows the exact choice/course identity but does not emit a teacher actor;
- transfer atlases/fixtures remain preparation-only.

## C5-74 — generic after-School repetition depth v2

Prepared 8 additional generic RU/EN post-lesson variants.

They do not name a specific course/teacher or assert a threshold, certificate, unlock, career result, or extra transaction.

## C5-75 — exact Night-study context depth v2

Prepared RU/EN context text for all 24 current exact `school.night_study.*` choices.

Locked mechanics remain:
- tuition 0;
- current-day Energy 0;
- selected stat +2;
- next-day Energy -1;
- no extra School/career progress;
- no NightFlow change.

## C5-76 — course journal/result consistency v2

All 8 canonical course labels/descriptions remain RU/EN complete.

Current inconsistencies recorded:
- RU Literacy & Numbers presentation wording differs from the canonical course label;
- RU Etiquette & Presentation presentation wording differs from the canonical course label;
- paid-lesson runtime journal remains a raw English template with null localization ref;
- localized lesson-result UI text exists separately.

## C5-77 — teacher identity safety v2

All 8 existing teacher identities remain educator-only.

Safe:
- exact target-library teacher/course mapping;
- remembered teacher method when exact course identity is already known.

Unsafe:
- teacher-specific generic paid-lesson text;
- live Night-study teacher presence/dialogue;
- teacher relationship state;
- invented teacher events.

## C5-78 — starter-career transfer wording v3

Prepared 6 new RU/EN reflections across:
- Lumber;
- Satyr Maid;
- Undead Farm.

Existing School mappings only. Threshold/public-result decisions remain null.

## C5-79 — late-career transfer wording v3

Prepared 1 additional RU/EN reflection for each of:
- Tavern;
- Hunter;
- Guard;
- Merchant;
- Artist-Geisha;
- Assassin;
- ordinary voluntary Prostitute.

No unlock/promotion/economy/relationship/Activity claims. Assassin stays analysis/planning-only; adult-career wording remains non-explicit and separate from consent/Lust mechanics.

## C5-80 — Body Confidence boundary audit v2

Verified current School-owned Body Confidence surfaces:
- no Lust writes/routing;
- no consent rule;
- no adult-career advancement/threshold;
- no public-result production;
- Night-study remains the normal School contract.

No audited boundary violation found.

## C5-81 — localization fallback coverage

Complete:
- 8/8 canonical course label RU/EN pairs;
- 8/8 canonical course description RU/EN pairs;
- 8/8 course presentation alt/caption RU/EN pairs;
- current generic paid-lesson event localization;
- current generic Night-study event localization;
- localized generic Night-study UI template.

Recorded gaps:
- 8 teacher media alts are raw English with no dedicated root RU/EN pair;
- paid-lesson runtime journal is raw English with null localization ref;
- 24 exact Night-study definition labels are English fallbacks;
- 2 RU course presentation captions use alternate terminology.

## C5-82 — RU/EN parity regression v4

Added `tests/school-localization-v8-parity.test.ts`.

It locks:
- current reachability classification;
- 8 generic v2 variants;
- all 24 exact Night-study IDs;
- 8 course identities;
- 8 teacher identities;
- starter + 7 late career IDs/mappings;
- Body Confidence boundaries;
- fallback coverage counts;
- 90 prepared localization keys.

## C5-83 — ownership/collision regression v3

Added:
- `content/school-queue-v8-ownership-collision-regression-v3.fixture.json`;
- `tests/school-localization-v8-ownership.test.ts`.

The contract explicitly excludes runtime, Save, NightFlow, career, Activity, economy, root localization, production packs, media, and producer-state ownership. It verifies mechanic write arrays remain empty and threshold/public-result selections remain null.

## Static pre-PR validation

Revalidated against current main `beb699637f5326ff74f2a2039d8e3272f0223f13`:
- 90 prepared localization keys;
- 90 unique;
- RU/EN non-empty for all;
- zero collision with current root localization;
- all 24 exact Night-study choices still present;
- current generic School completion consumers unchanged;
- transfer thresholds/public-result selections remain null;
- paid-lesson journal still has null localization ref.

Result: **PASS**.

## Explicit routing gaps

Not invented by this candidate:
- exact paid-course identity is still absent from generic `actionCompleted: school`;
- Night-study runtime facts do not emit teacher identity/presence;
- teacher media do not yet have dedicated root RU/EN alt localization;
- paid-lesson journal has no localization reference;
- transfer text has no approved runtime consumer/threshold/public-result producer.

## Candidate rule

Open one focused PR. Freeze only the exact head that passes repository `mindy-successor check`. Do not move the frozen head for unrelated main drift. Any later push requires a concrete CI/QA blocker or explicit Lead request and a full exact-head re-gate.
