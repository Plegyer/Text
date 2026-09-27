# GIF Producer Batch — School / Poverty v1

Purpose: producer-facing briefs for reachable School contexts and ordinary poverty contexts that benefit from 3–5 presentation variants.

No GIF in this batch may alter mechanics, outcomes, Night flow, School progress, poverty choices or save state.

## School — paid lesson result pool

**Semantic family**

`school/<track>/lesson/default`

Eight shipped track surfaces exist.

**Initial pool**

3 candidates per track:
1. classroom/study environment loop;
2. track-specific practice/review loop;
3. neutral post-exercise reflection loop.

**Current fallback**

`assets/stage-school.svg`

**Exclusions**
- no extra tuition;
- no extra Energy use;
- no stat/progress implication beyond the already-completed paid lesson;
- no teacher identity unless that teacher mapping is explicitly approved.

## School — generic after-paid-lesson hook

**Semantic presentationId**

`location/town/event/school-lesson-content-v1-after-school/default`

**Initial pool**

3 candidates:
1. classroom settling after a lesson;
2. notebook/material review;
3. short neutral reflection before leaving.

**Current fallback**

`assets/stage-school.svg`

**Routing**

Reachable from generic `actionCompleted: school`.

Do not visually claim an exact course or teacher.

## School — School-life after-paid-lesson hook

**Semantic presentationId**

`location/town/event/school-life-content-v1-after-paid-lesson/default`

**Initial pool**

3 candidates:
1. quiet classroom transition;
2. generic peer/context moment;
3. neutral feedback/room reset.

**Current fallback**

`assets/stage-school.svg`

This is presentation-only and effect-free.

## School — after Night study

**Semantic presentationId**

`location/town/event/school-life-content-v1-after-night-study/default`

**Initial pool**

5 candidates:
1. reading/writing loop;
2. diagram review;
3. low-motion practical rehearsal;
4. material organization;
5. quiet preparation/closing-study loop.

**Current fallback**

`assets/stage-school.svg`

**Exclusions**
- no paid-lesson identity;
- no extra current-day Energy cost;
- no extra stat gain;
- no additional School progress;
- no milestone/public-result implication.

## School — staged named teachers

Teacher-specific media libraries exist, but exact paid-course routing remains staged.

Producer may prepare concept/loop briefs after approval, but these must not be shipped as generic post-`school` reaction media until course-specific routing is safe.

---

# Poverty — base street sleep context

Current shared gameplay presentation surface:

`night/rest/default`

Current authored action:
`rest` — choose lodging/payment route, including free outside shelter.

Current static presentation:
`stage.school` -> `assets/stage-school.svg`.

Important limitation:
there is not yet a dedicated shipped `street-sleep` semantic action ID separate from the shared rest surface.

### Safe producer pool

Use only as a **shared rest/outside visual class** unless Product/Lead creates a dedicated street-sleep semantic identity.

3 candidates:
1. sheltered outdoor resting place;
2. quiet street-side night preparation;
3. generic overhang/covered resting context.

Do not imply:
- Secret Debt;
- a poverty event outcome;
- extra penalties;
- a specific lodging payment choice after the choice has not been authored into the presentation identity.

## Poverty — cheap lodging

**Semantic presentationId**

`location/town/event/poverty-cheap-production-shared-quiet-autumn/default`

**Initial pool**

3 candidates:
1. cramped shared-room settling;
2. thin-wall / early-quiet room context;
3. belongings arranged for the night.

**Current fallback**

`assets/stage-room.svg`

The GIF candidate does not add or remove cost/penalty.

## Poverty — street helpful summer

**Semantic presentationId**

`location/town/event/poverty-street-production-helpful-summer/default`

**Initial pool**

3 candidates:
1. closing stall and crate;
2. quiet market edge;
3. short anonymous errand setup.

**Current fallback**

`assets/stage-outside.svg`

Do not imply that the player accepted the paid errand; the choice has not yet been made when the scene is presented.

## Poverty — street neutral autumn

**Semantic presentationId**

`location/town/event/poverty-street-production-neutral-autumn/default`

**Initial pool**

3 candidates:
1. shop awning / dry strip of pavement;
2. quiet closed storefront;
3. sheltered autumn street corner.

**Current fallback**

`assets/stage-outside.svg`

No reward or penalty implication.

## Poverty — street winter pressure

**Semantic presentationId**

`location/town/event/poverty-street-production-pressure-winter/default`

**Initial pool**

3 candidates:
1. cold stones beneath overhang;
2. sheltered curb context;
3. moving through winter street.

**Current fallback**

`assets/stage-outside.svg`

Do not visually decide `take-shelter` vs `keep-moving`.

## Poverty — recovery/help cleanup

**Semantic presentationId**

`location/town/event/poverty-recovery-production-short-cleanup/default`

**Initial pool**

3 candidates:
1. stacking stools;
2. sweeping a narrow strip;
3. carrying a bucket toward drain.

**Current fallback**

`assets/stage-outside.svg`

All are visual variants of one authored event. None means the player has chosen `do-cleanup`.

## Poverty — recovery/help herb bundle

**Semantic presentationId**

`location/town/event/poverty-recovery-production-herb-bundle/default`

**Initial pool**

3 candidates:
1. tied herb bundle by crate;
2. quiet market-side found object;
3. close environmental view of ordinary bundle.

The GIF never grants an item.

## Poverty — pressure / cold rain

**Semantic presentationId**

`location/town/event/poverty-pressure-production-cold-rain/default`

**Initial pool**

3 candidates:
1. rain reaching curb;
2. deeper doorway option visible;
3. wet edge of shelter.

The GIF never applies Energy/grooming penalties.

## Poverty — pressure / noisy loading

**Semantic presentationId**

`location/town/event/poverty-pressure-production-noisy-loading/default`

**Initial pool**

3 candidates:
1. pre-dawn carts arriving;
2. crates/wheels at loading area;
3. noisy corner losing its quiet.

The GIF never applies next-day fatigue.

## Poverty — pressure / muddy splash

**Semantic presentationId**

`location/town/event/poverty-pressure-production-muddy-splash/default`

**Initial pool**

3 candidates:
1. cart crossing puddle;
2. splash reaching curb/clothing edge;
3. muddy aftermath context.

The GIF never applies grooming loss.

---

# Shared production rules

## Candidate count

Use 3 candidates by default.

Use 4–5 only when:
- repetition is high;
- the semantic scene remains visually coherent;
- fallback remains stable.

## Fallback

School:
`assets/stage-school.svg`.

Poverty street/recovery/pressure:
`assets/stage-outside.svg`.

Cheap lodging:
`assets/stage-room.svg`.

Shared current rest:
`assets/stage-school.svg`.

## Accessibility

Every candidate needs context-correct alt text.

Alt text describes:
- visible environment;
- visible action;
- visible participants only if approved.

Alt text must not reveal:
- hidden choice outcome;
- reward/penalty;
- secret route;
- Secret Debt;
- unapproved teacher identity.

## Secret Debt exclusion

This batch is ordinary School + ordinary poverty only.

No lender, debt activation, hidden Slave career, forced Secret Debt Night or Secret Debt outcome visual belongs here.
