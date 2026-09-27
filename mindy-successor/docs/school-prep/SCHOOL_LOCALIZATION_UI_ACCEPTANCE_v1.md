# School Localization UI Acceptance v1

Status: UI acceptance plan for RU/EN School presentation after the shared localization runtime/UI lands.

Scope:
- paid School panel;
- paid-course selection/disabled states;
- generic post-lesson presentation;
- Night-study selection/presentation;
- pending School scenes across language switches and reload.

Gameplay mechanics remain locale-neutral and must not change when language changes.

## 1. Paid School panel acceptance

For each of the eight paid courses, verify in RU and EN:
- same course gameplay ID;
- localized course label;
- localized concise description;
- exact same tuition number;
- exact same current-day Energy cost;
- exact same supported stat package;
- same availability/disabled state;
- same semantic presentation identity.

Course matrix:
- Literacy & Numbers — 300; Energy 1; Reason +4; Wits +2;
- Arcana — 500; Energy 1; Magic +4; Reason +4; Creativity +2;
- Rhetoric & Social — 300; Energy 1; Charm +3; Sociability +3; Wits +2;
- Etiquette & Presentation — 400; Energy 1; Manners +3; Grooming +3; Charm +2;
- Field Craft — 400; Energy 1; Dexterity +3; Wits +3; Creativity +2;
- Physical Training — 400; Energy 1; Strength +3; Endurance +3; Dexterity +2;
- Arts & Performance — 500; Energy 1; Creativity +3; Charm +3; Sociability +2; Dexterity +2;
- Body Confidence — 400; Energy 1; Sexuality +3; Grooming +3; Endurance +2.

The UI may localize labels and descriptions only. It must not localize numeric meaning into different values.

## 2. Course stat terminology

Use locale-specific display terms while retaining the exact stat IDs:
- Strength / Сила;
- Endurance / Выносливость;
- Dexterity / Ловкость;
- Reason / Разум;
- Magic / Магия;
- Creativity / Творчество;
- Wits / Смекалка;
- Charm / Обаяние;
- Sociability / Общительность;
- Manners / Манеры;
- Grooming / Ухоженность;
- Sexuality / Сексуальность.

Acceptance:
- translated label changes;
- stat ID does not;
- amount does not;
- sort/order does not change solely from locale unless UI product explicitly defines locale-sensitive display ordering without mechanics effect.

## 3. Tuition / Energy wording

Localized UI templates must render the same numeric state.

RU template:
- `Стоимость: {tuition}. Энергия сегодня: {energy}.`

EN template:
- `Tuition: {tuition}. Energy today: {energy}.`

Acceptance:
- placeholders bind to the same values;
- no locale-specific rounding;
- no translated string hardcodes a different number;
- disabled-state calculation does not parse localized text.

## 4. Paid-course action equivalence

Run every paid course twice from equivalent gameplay state:
- once with RU UI;
- once with EN UI.

Compare post-action School gameplay state:
- money;
- current-day Energy;
- all 12 progression stats;
- Lust;
- typed School progress;
- pending reaction identity;
- public world facts;
- unrelated run state.

Expected:
- gameplay state identical;
- only presentation text/UI locale differs.

Ordinary School must not mutate Lust in either locale.

## 5. Disabled-state equivalence

For each locale verify identical course availability under:
- enough money + enough Energy;
- insufficient money;
- insufficient Energy;
- active Night flow;
- active Activity;
- pending blocking scene where School is not allowed.

Acceptance:
- same enabled/disabled boolean;
- same action rejection semantics;
- localized disabled reason may differ in wording only;
- switching locale cannot enable an otherwise disabled course.

## 6. Generic post-lesson localization

Gameplay event:
- `school.generic.reachable.v2.after.school`.

Localization bundle:
- `school-generic-localization-v2.fixture.json`.

Acceptance:
- same event ID in RU and EN;
- same selected variant ID;
- localized title/text/choice/alt;
- no duplicate locale event;
- same optional/blocking policy;
- same reaction epoch;
- resolving either locale version is effect-free.

## 7. Exact Night-study picker

For all 24 exact Night choices verify:
- same locale-neutral choice ID;
- RU/EN localized course/stat wording;
- same availability;
- same chosen stat;
- same mechanics.

Locked mechanics:
- tuition 0;
- current-day Energy 0;
- selected supported stat +2;
- next-day Energy -1;
- one Night slot;
- `night_study_sessions +1`;
- `lessons_completed +0`.

Language switch must not alter any of them.

## 8. Night presentation equivalence

Gameplay bundle:
- `school-night-exact-v3.json`.

Localization bundle:
- `school-night-localization-v2.fixture.json`.

For every exact Night event:
- same event ID;
- same choice ID;
- same variant ID under the same materialized state/RNG;
- RU/EN title/text/choice/alt correspond to the same semantic content;
- no second Night effect occurs when the presentation opens/resolves.

## 9. Language switch before action

Scenario:
1. open School UI in RU;
2. inspect course;
3. switch to EN before purchase;
4. buy the same course.

Acceptance:
- selection identity remains the same course;
- price/Energy/stat package remains unchanged;
- no duplicated UI action;
- no state mutation occurs from language switch alone.

Repeat EN -> RU.

## 10. Language switch after paid transaction, before opening post-lesson offer

Scenario:
1. complete paid lesson in RU;
2. generic/exact presentation instance materializes;
3. switch to EN;
4. open the pending presentation.

Acceptance:
- same queued instance ID;
- same event ID;
- same variant ID;
- same allowed choice IDs;
- EN text resolves for the existing instance;
- paid transaction is not repeated.

Repeat EN -> RU.

## 11. Language switch with pending blocking School scene

If a School transaction has already created a pending blocking scene:
- switching RU/EN must preserve the same pending scene gameplay identity;
- allowed choices remain identical;
- localized labels/text change only;
- resolving once commits once;
- reload in the other language does not duplicate the scene or lesson.

## 12. Cross-locale save / reload

Required matrix:
- save RU -> reload RU;
- save RU -> reload EN;
- save EN -> reload EN;
- save EN -> reload RU.

Cover:
- before paid lesson;
- after paid lesson;
- pending generic post-lesson offer;
- pending blocking School scene;
- after resolved School scene;
- Night picker;
- after Night choice;
- pending Night presentation;
- after Night presentation.

Expected:
- gameplay state identical for equivalent scenario;
- language affects presentation only.

## 13. RNG / variant determinism

Once an event variant is materialized:
- switching language cannot reroll it;
- reload cannot reroll it;
- locale lookup occurs after variant identity exists.

Acceptance should compare:
- event ID;
- variant ID;
- reaction epoch/instance ID;
- allowed choices.

Localized prose may differ structurally between RU and EN while retaining the same semantic variant.

## 14. Presentation / GIF acceptance

For RU and EN:
- same semantic media ID;
- same GIF/static asset unless a project-wide localized rendered-text resource is explicitly supported;
- RU alt/caption in RU;
- EN alt/caption in EN;
- text/static fallback always valid;
- missing GIF never disables course/Night action;
- animation completion never triggers payment/progress.

## 15. Exact-course future routing

If Lead implements exact paid-course routing:
- routing uses the same `school.course.*` ID in both locales;
- teacher/course event materializes before locale presentation lookup;
- generic `actionCompleted:school` remains backward-compatible;
- no teacher/course event is duplicated by language.

Acceptance combines:
- `SCHOOL_EXACT_COURSE_ROUTED_CONTENT_ACCEPTANCE_v1.md`;
- `SCHOOL_EXACT_COURSE_ROUTING_LOCALIZATION_COMPATIBILITY_v1.md`.

## 16. Accessibility / layout

UI review should cover:
- RU text expansion/wrapping;
- EN text wrapping;
- course-card height;
- stat rows;
- tuition/Energy line;
- disabled reason;
- Night-choice rows;
- choice buttons;
- alt text availability.

Layout differences are acceptable.
Mechanics or identity differences are not.

No localized string may be truncated in a way that removes required numeric/mechanical information.

## 17. Acceptance evidence

Minimum evidence set:
- screenshots or UI snapshots for all eight course rows in RU and EN;
- exact paid action state comparison for all eight courses;
- all 24 Night choice identity/mechanics comparisons;
- generic post-lesson pending/reload locale-switch proof;
- Night presentation pending/reload locale-switch proof;
- no duplicate locale gameplay events;
- localization-key completeness validation;
- full School regression.

## 18. Pass criteria

School localization UI passes only if:
- every required player-facing School string resolves in RU and EN;
- all gameplay IDs are shared;
- all numeric mechanics match;
- disabled/enabled state matches;
- event/variant/RNG identity matches;
- Save/reload is cross-locale stable;
- no extra effects occur from localized presentation;
- exact paid/Night progression remains once;
- no ordinary Lust mutation appears;
- no locale-specific public-result behavior exists.
