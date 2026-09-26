# Product Activation Post-Merge Smoke v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance

## Purpose

Run this smoke sequence on merged `main` after PR20/product activation lands.

The sequence verifies that the activated player-facing routes and the critical persistence boundaries work together.

It is a smoke test, not a substitute for the full PA00–PA26 suite.

## Rules

- Use the shipped production catalog.
- Use the production UI/API route for each normal gameplay step.
- Do not substitute the synthetic action `school.lumber-management`.
- Do not weaken Hard Work: the real boundary remains exactly 50 completed Lumber shifts.
- Do not fake a production item acquisition path. If Forest entry still requires a capability that the shipped product cannot legitimately obtain, mark that smoke step **BLOCKED** rather than injecting a fact in a manual product smoke.
- An automated QA harness may use the already accepted `old_boundary_token` fixture adapter solely to exercise A5 mechanics; that is not proof of product item activation.

---

# Smoke sequence

## 0. Build/startup

From:

`mindy-successor/prior-work/astra/prototype-m3.2`

run the release-candidate check/build first.

Expected:

- app starts;
- production catalog loads;
- no validation error;
- no missing-media fatal error;
- town/creation central presentation renders.

Expected default semantic presentation family:

`location/town/default`

---

## 1. Character creation and arrival

Complete the normal creation allocation and run:

`finishCreation`

Then execute the production arrival action.

Expected:

- `story.arrived=true`;
- run remains active;
- town UI becomes available;
- Work / School / Explore / Night panels are reachable.

Save/reload once here.

Expected reload:

- arrival remains complete;
- no creation reset;
- no duplicate arrival effects.

---

## 2. First target Lumber shift

Open Work.

Required target control:

`lumber.shift`

Do not use legacy `lumber` as the target activation proof.

Execute one shift.

Expected mechanical result:

- current-day Energy -1 exactly once;
- Lumber career exists;
- `completed_shifts=1`;
- first-shift event becomes pending.

Expected shift semantic presentation in spring:

`job/lumber/shift/spring/default`

Expected result semantic presentation:

`job/lumber/result/default`

Expected first pending event:

`lumber.career-first-shift`

Expected event presentation:

`job/lumber/event/lumber-career-first-shift/default`

Save/reload while the milestone scene is pending.

Expected:

- same eventId;
- same variantId;
- same allowed choices;
- same semantic presentationId;
- no reroll.

Resolve the milestone and choose the professional Foreman route.

Expected Foreman opening presentation:

`relationship/lumber-foreman/lumber-foreman-notice/default`

---

## 3. One paid School lesson

Open School.

Expected:

- exactly eight target course controls;
- controls dispatch `schoolLesson`, not generic legacy School action.

Use representative course:

`school.course.arcana`

Before click record:

- money;
- current-day Energy;
- Arcana target stats;
- Arcana `lessons_completed`.

Execute the lesson once.

Expected:

- money -500;
- current-day Energy -1;
- full Arcana stat package once;
- Arcana `lessons_completed +1`;
- `night_study_sessions` unchanged;
- no Lust mutation.

Expected semantic presentation:

`school/arcana/lesson/default`

Save/reload twice after payment.

Expected:

- no second tuition;
- no second Energy charge;
- no repeated stat package;
- no repeated School counter;
- same result presentation identity.

If the School transaction creates a pending Resolver scene, reload must preserve that scene rather than rerun the lesson.

---

## 4. Start NightFlow

From an active non-pending daytime state run:

`endDay`

Expected UI:

Night lodging phase.

Expected presentation:

`night/lodging/default`

Choose a production lodging.

Record money before selection.

Expected:

- selected lodging recorded;
- payment committed once;
- money reduced exactly once if lodging is paid.

Save/reload immediately after lodging payment.

Expected:

- same lodging;
- `lodgingPaymentCommitted=true`;
- no second payment.

---

## 5. School Night study

At voluntary Night choice choose a real production School Night choice supported by Arcana.

Representative:

`school.night_study.arcana.reason`

Expected:

- zero tuition;
- zero current-day Energy charge;
- selected stat +2 once;
- Arcana `night_study_sessions +1`;
- `lessons_completed` unchanged;
- next-day Energy delta -1 queued/applied through the Night lifecycle;
- no Lust mutation.

Expected Night presentation family:

`night/choice/default`

Save/reload after Night completes.

Expected:

- calendar advanced once;
- +2 stat not duplicated;
- Night-study counter not duplicated;
- next-day Energy modifier not duplicated.

---

## 6. Forest entry

Open Explore.

Required target Activity control:

`lumber.forest`

Do not count legacy `forest-search` as the target Activity.

### Product prerequisite gate

The production Activity requires its authored entry condition.

If merged main still has no legitimate player-facing way to obtain the required capability, stop the manual product smoke here and record:

**BLOCKED — Forest capability acquisition is not shipped.**

Do not manually grant the world fact and call the product smoke PASS.

### Automated QA compatibility route

For the automated regression harness only, the accepted test adapter may publish:

`lumber.capability.enter-old-boundary`

from:

`old_boundary_token / enter_old_boundary`.

Then enter:

`lumber.forest`.

Expected:

- daily Energy -2 exactly once;
- active Activity envelope;
- UI shows Activity central screen;
- `advance` and `escape` controls available as appropriate.

Expected presentation:

`activity/forest/route/default`

Save/reload inside Activity.

Expected:

- same progress;
- same endurance;
- same internal RNG;
- same checkpoint;
- entry Energy not charged again;
- UI returns to Activity screen.

---

## 7. Forest result and Lumber continuation

Advance through the current accepted Activity adapter until success.

Expected result:

`lumber.forest.success`

Expected world fact:

`lumber.forest.truth-known`

Expected pending Lumber continuation:

`lumber-cross.activity-forest-return`

Expected presentation:

`job/lumber/event/lumber-cross-activity-forest-return/default`

Save/reload while the continuation is pending.

Expected:

- same pending event;
- no duplicate Activity result effect;
- no duplicate Energy cost.

Resolve the continuation.

Expected Lumber career facts include:

- `forest-truth-known`;
- `forest-problem-resolved`.

Expected complex ending eligibility may include:

`ending.lumber.forest`.

---

## 8. Hard Work 49/50 boundary

A manual smoke should use a prepared valid save generated through gameplay or an approved QA fixture with:

`completed_shifts=49`

Do not change the production ending threshold.

Before the final shift:

- Hard Work must not be eligible.

Execute one real:

`lumber.shift`

Expected:

- `completed_shifts=50`;
- one normal Lumber Energy cost;
- `ending.lumber.hard-work` becomes eligible;
- run remains active until explicit commitment.

Hard Work exact rule must still be:

`careerCounter(lumber, completed_shifts) >= 50`

and nothing else.

---

## 9. Commit Hard Work

Commit:

`ending.lumber.hard-work`

Expected semantic presentation:

`ending/lumber/hard-work`

Expected immediately after commit:

- status `ending_committed`;
- committed ID exact;
- no Hard Work Meta reward yet;
- no completed RunResult yet.

Save/reload before completion.

Expected:

- still committed;
- reward still absent.

---

## 10. Complete ending

Execute explicit completion.

Expected:

- status `ended`;
- one RunResult;
- RunResult ending ID `ending.lumber.hard-work`;
- exact applied reward proof:
  `hardWork:lumber`;
- `meta.hardWorkProgress` contains `lumber`;
- one applied result transaction.

Save/reload twice.

Expected:

- same resultId;
- same transactionId;
- no second `hardWork:lumber`;
- no second `lumber` Hard Work progress entry;
- completed-run count unchanged by reload.

---

# Semantic presentation checklist

During the smoke, representative expected IDs are:

| Boundary | Expected semantic presentation ID |
|---|---|
| town/start | `location/town/default` |
| Lumber spring shift | `job/lumber/shift/spring/default` |
| Lumber result | `job/lumber/result/default` |
| first-shift milestone | `job/lumber/event/lumber-career-first-shift/default` |
| Foreman opening | `relationship/lumber-foreman/lumber-foreman-notice/default` |
| Arcana paid lesson | `school/arcana/lesson/default` |
| lodging | `night/lodging/default` |
| voluntary Night choice UI | `night/choice/default` |
| Forest Activity | `activity/forest/route/default` |
| Forest return | `job/lumber/event/lumber-cross-activity-forest-return/default` |
| Hard Work ending | `ending/lumber/hard-work` |

Persisted pending/result IDs must survive reload exactly when stored.

---

# Exactly-once smoke ledger

The smoke is failed if any reload duplicates:

- Lumber shift Energy/counter;
- School tuition;
- School daytime Energy;
- School stat package;
- School `lessons_completed`;
- lodging payment;
- Night-study stat gain;
- `night_study_sessions`;
- next-day Energy modifier;
- Activity entry Energy;
- Activity result fact;
- Lumber continuation facts;
- Hard Work Meta reward;
- ending result transaction.

---

# Pass criteria

A post-merge smoke result may be called PASS only when:

1. all production-reachable steps execute through shipped UI/catalog;
2. every required save/reload boundary succeeds;
3. semantic presentation IDs match expected stable IDs;
4. exactly-once assertions hold;
5. Hard Work remains exactly the 50-shift ending;
6. `hardWork:lumber` is applied once;
7. any still-unshipped Forest acquisition prerequisite is reported as a blocker rather than bypassed.

No production file was modified by Chat 4.
