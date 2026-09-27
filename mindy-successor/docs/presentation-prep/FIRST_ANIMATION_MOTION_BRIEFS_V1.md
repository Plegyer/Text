# First Animation Motion Briefs v1

Source priority:
`docs/presentation-prep/FIRST_ANIMATION_SEMANTIC_PRIORITY_LIST_V2.md`.

All concepts are lightweight presentation loops built from project-owned art.

## 1 — Lumber spring shift

Semantic ID:
`job/lumber/shift/spring/default`.

Target loop:
**2.4 seconds**, 4 key frames.

Frame concept:
1. neutral work pose; axe/saw at rest angle; leaves low;
2. tool shifts into work angle; two nearby leaves lift;
3. tool crosses the work beat; small wood-chip/leaf displacement;
4. tool returns near starting angle; foliage settles.

Must remain stable:
- same lumber work scene;
- same season;
- no success/failure signal;
- no reward/coin/Energy indicator;
- no implied exact number of logs completed.

Reduced motion:
`career-lumber-shift-spring.svg`.

## 2 — School Arcana lesson

Semantic ID:
`school/arcana/lesson/default`.

Target loop:
**3.0 seconds**, 4 key frames.

Frame concept:
1. neutral study composition; central rune dim;
2. rune ring brightens; small motes rise;
3. rune triangle/center reaches peak glow; one page/marker shifts;
4. glow falls toward neutral; motes settle.

Must remain stable:
- ordinary Arcana lesson;
- no spell success/failure;
- no stat gain/value shown;
- no teacher-specific identity;
- no hidden course result implied.

Reduced motion:
course-specific static `school-course-arcana.svg` when that refinement is active; otherwise current School static fallback remains valid.

## 3 — Poverty cold rain

Semantic ID:
`location/town/event/poverty-pressure-production-cold-rain/default`.

Target loop:
**2.0 seconds**, 5 key frames.

Frame concept:
- rain streak positions advance;
- puddle ripple expands then resets;
- small clothing/hair edge shifts;
- background remains fixed.

Must remain stable:
- same already-selected cold-rain pressure event;
- no exact penalty;
- no rescue/reward;
- no new lodging or debt implication.

Reduced motion:
`poverty-pressure-cold-rain.svg` after refinement integration, otherwise current shipped poverty-pressure static fallback.

## 4 — Forest return success

Semantic ID:
`activity/forest/return/success`.

Target loop:
**3.2 seconds**, 4 key frames.

Frame concept:
- leaf cluster drifts;
- heroine idle/breathing silhouette shifts by a few pixels;
- bag/branch settles;
- warm light subtly pulses once.

Must remain stable:
- outcome remains success;
- no reward amount;
- no new Forest route identity;
- no Hunter/token/challenge implication.

Reduced motion:
`forest-return-success-v2.svg` after refinement integration, otherwise current shipped success static fallback.

## 5 — Foreman professional Night follow-up

Semantic ID:
`relationship/lumber-foreman/lumber-night-foreman-professional/default`.

Target loop:
**3.6 seconds**, 6 key frames.

Frame concept:
- fire changes shape/brightness;
- two or three embers rise;
- small shoulder/head idle shift;
- background remains fixed.

Must remain stable:
- professional/voluntary conversation only;
- no romance/route-stage change;
- no relationship-score visualization;
- no gameplay outcome selection.

Reduced motion:
`foreman-night-voluntary-v2.svg` after refinement integration, otherwise current shipped Foreman Night static fallback.

## 6 — Merchant summer shift

Semantic ID:
`job/merchant/shift/summer/default`.

Target loop:
**2.8 seconds**, 4 key frames.

Frame concept:
- awning edge or hanging cloth shifts;
- one hand/goods arrangement moves slightly;
- sunlight glint changes;
- market stall remains stable.

Must remain stable:
- ordinary summer merchant shift;
- no sale success/failure;
- no money/reward value;
- no inventory mutation implied.

Reduced motion:
`career-merchant-shift-summer.svg`.

## Shared production limits

All first-wave loops:
- 3–8 source frames;
- 2–4 seconds;
- infinite presentation loop if exported;
- no baked-in text;
- no external media;
- no gameplay fields;
- no locale-specific frame files;
- no frame/timing persisted to Save.
