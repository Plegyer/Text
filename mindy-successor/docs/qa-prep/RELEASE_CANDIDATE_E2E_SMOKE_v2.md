# Release Candidate E2E Smoke v2

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Baseline: merged main after PR22

## Purpose

This is the longest honest release-candidate smoke that can execute on current merged production content without pretending the remaining authoring gaps are solved.

The primary path is natural shipped behavior.

The Old Boundary Token route is tested separately as seeded-item runtime evidence and must not be mixed into the natural product path.

---

# Primary natural shipped path

## 0. Startup / clean run

Start from a fresh production save.

Expected:

- schema version 4;
- run active;
- no pending scene;
- no NightFlow;
- no Activity;
- empty ending commitment/result;
- production catalog loads.

Perform one save/reload.

Expected no mutation.

---

## 1. Character creation and arrival

Complete normal creation.

Finish creation and execute the normal arrival flow.

Expected:

- creation complete;
- `story.arrived=true`;
- town navigation available;
- Work / School / Explore / Night reachable.

Save/reload.

Expected:

- arrival remains complete;
- no command replay;
- semantic town presentation remains valid.

---

## 2. First Lumber shift

Open Work and execute:

`lumber.shift`

Expected:

- Energy -1 exactly once;
- Lumber career initialized;
- `completed_shifts=1`;
- result semantic ID:
  `job/lumber/result/default`;
- pending:
  `lumber.career-first-shift`.

Expected pending semantic ID:

`job/lumber/event/lumber-career-first-shift/default`

Save/reload while pending.

Expected exact:

- eventId;
- variantId;
- presentationId;
- allowed choice IDs.

No reroll.

---

## 3. Foreman professional route

Resolve first-shift milestone.

Expected next event:

`lumber.foreman-notice`

Expected semantic ID:

`relationship/lumber-foreman/lumber-foreman-notice/default`

Choose:

`professional`

Expected:

- relationship `lumber.foreman`;
- professional route/stage;
- no extra daytime Energy for reactive scenes.

---

## 4. Paid School lesson

Choose representative real course:

`school.course.arcana`

Before execution record:

- money;
- Energy;
- affected stats;
- Arcana `lessons_completed`;
- Arcana `night_study_sessions`.

Expected one paid lesson:

- money -500;
- Energy -1;
- exact Arcana stat package once;
- `lessons_completed +1`;
- Night-study counter unchanged;
- semantic presentation:
  `school/arcana/lesson/default`.

Save/reload twice.

Expected no duplicate:

- tuition;
- Energy;
- stats;
- lesson counter;
- Resolver scene.

## Authoring-open assertion

After the lesson do **not** expect the unresolved School management/accounting public fact.

Its absence is not an E2E failure while PA07/PA08 remain authoring-open.

Do not inject a synthetic School action/fact.

---

## 5. NightFlow / normal lodging

Run:

`endDay`

Expected:

`LodgingResolution`

Choose:

`lodging.normal`

Expected:

- normal lodging selected;
- money -100 once;
- payment committed once.

Save/reload immediately.

Expected no second lodging payment.

---

## 6. Foreman Night

Choose:

`lumber.foreman.night`

Expected:

- pending Foreman Night event;
- relationship Night counter changes once;
- no daytime Energy cost.

Save/reload pending event.

Resolve it.

Expected:

- NightFlow completes;
- calendar advances once;
- next day initialized once.

---

# 7. Natural Forest entry after PR22

Open Explore and enter:

`lumber.forest`

No item is required to enter.

Expected:

- Energy -2 exactly once;
- active Activity envelope;
- option-model-aware state;
- routeId null before route selection.

Available actions must include:

- `forest.route.logging-road`;
- `escape`.

Without seeded inventory, available actions must **not** include:

`forest.route.old-boundary`.

Before route selection ordinary:

`advance`

must not be available.

---

## 8. Logging-road route

Execute:

`activityAction:forest.route.logging-road`

Expected:

- routeId:
  `logging-road`;
- route option recorded as resolved once;
- ordinary `advance` becomes available;
- `escape` remains available;
- old-boundary route is no longer an alternate route.

Save/reload now.

Expected exact preservation:

- routeId;
- resolved option IDs;
- progress;
- endurance;
- steps;
- RNG state;
- checkpoint.

Entry Energy must not be charged again.

---

## 9. Natural Forest success

Execute real ordinary Activity progression:

`advance`

until the current production success threshold is reached.

Expected:

- Activity closes;
- result:
  `lumber.forest.success`;
- world fact:
  `lumber.forest.truth-known`;
- reactive pending event:
  `lumber-cross.activity-forest-return`.

Expected semantic presentation:

`job/lumber/event/lumber-cross-activity-forest-return/default`

Save/reload pending continuation.

Expected:

- same event/variant/presentation;
- no duplicate Activity reward/result;
- no second entry Energy.

Resolve continuation.

Expected Lumber facts include:

- `forest-truth-known`;
- `forest-problem-resolved`.

No extra daytime Energy.

This is natural shipped PA18/PA20 evidence after PR22.

---

# 10. Hard Work repetition accelerator boundary

The natural product path is complete through the Forest continuation.

The remaining 50-shift ending threshold may use a clearly labeled repetition accelerator:

prepare a valid state with:

`completed_shifts=49`

while preserving the real Forest-derived complex-ending facts already earned above.

This accelerator compresses repeated identical Lumber shifts only.

It must not:

- insert Hard Work into eligible endings;
- commit an ending;
- add Meta;
- fabricate the Forest continuation facts.

Before the real final shift:

`ending.lumber.hard-work`

must not be eligible.

---

## 11. Real 50th Lumber shift

Execute one real:

`lumber.shift`

Expected:

- normal Work Energy cost;
- `completed_shifts=50`;
- Hard Work becomes eligible;
- complex Lumber/Forest ending remains independently eligible if its real facts are satisfied;
- run remains active;
- no Meta reward.

Locked condition remains exactly:

`careerCounter(lumber, completed_shifts) >= 50`.

---

## 12. Eligible play remains playable

Before commitment, execute one allowed normal action if current Energy/flow permits.

Preferred:

another `lumber.shift`

or another harmless eligible ordinary action.

Expected:

- run remains active;
- ending eligibility does not force completion;
- no `hardWork:lumber` reward;
- committed ending remains null.

If current Energy is insufficient, use a valid save prepared at the same eligibility boundary with enough normal daily Energy; do not mutate ending state.

---

## 13. Commit Hard Work

Execute:

`commitEnding:ending.lumber.hard-work`

Expected:

- status:
  `ending_committed`;
- committed ending exact;
- semantic presentation:
  `ending/lumber/hard-work`;
- RunResult still null;
- no Meta reward yet.

Save/reload.

Expected same committed state.

---

## 14. Complete Hard Work

Execute:

`completeEnding`

Expected:

- run status ended;
- one RunResult;
- ending:
  `ending.lumber.hard-work`;
- exact applied reward:
  `hardWork:lumber`;
- one applied result transaction;
- one Lumber Hard Work Meta progress entry.

Save/reload twice.

Expected:

- same result ID;
- same transaction ID;
- no duplicate Meta;
- no duplicate reward;
- completed-run count not incremented by reload.

---

## 15. New Run

Execute:

`newLife`

Expected:

- new run;
- Meta preserved;
- prior ending transaction remains unique;
- Lumber Hard Work starting bonus visible in new-run state;
- starting Strength/Endurance reflect the existing Hard Work Meta effect.

Save/reload once.

Expected Meta/new-run state stable.

---

# Separate seeded-item evidence branch

This branch is **not part of the natural E2E pass**.

Use a separate fresh valid Forest-entry state.

Directly seed for QA only:

`inventory.old_boundary_token=1`

This mutation must be labeled:

**SEEDED ITEM / ACQUISITION NOT PROVEN**

Then enter Forest naturally.

Expected before route selection:

- logging-road visible;
- old-boundary route visible;
- escape visible;
- advance hidden.

Select:

`forest.route.old-boundary`

Expected:

- routeId `old-boundary`;
- option recorded once;
- reload preserves route;
- duplicate use rejects;
- advance becomes available;
- escape remains available.

## What this branch proves

- typed inventory capability;
- capability-aware action-space;
- route selection;
- reload stability.

## What it does not prove

- PA09 acquisition;
- final retain/consume product policy;
- full PA17 ordered natural path.

---

# Separate no-item comparison

For the same Activity entry state without token:

Expected:

`forest.route.old-boundary`

absent.

A manually present legacy worldFact must not make the route appear.

This proves PR22 capability ownership is actual inventory-derived state.

---

# Authoring gaps intentionally outside this smoke

Do not fail the current technical smoke solely because these authoring decisions remain open:

- School management/accounting threshold/provider;
- School Arcana/Forest provider if still in scope;
- Old Boundary Token acquisition source;
- token retain/consume final policy;
- third/hunter Forest route;
- three challenge families;
- seasonal Forest difference.

Do not invent them to make the smoke “complete”.

---

# Smoke pass classes

## Natural shipped smoke PASS

Requires successful natural sequence through:

```text
arrival
-> Lumber
-> Foreman
-> paid School
-> Night
-> Forest logging-road
-> Forest result
-> Lumber continuation
```

with every declared reload/exactly-once assertion passing.

## Threshold-accelerated ending PASS

Requires:

- only the 49-shift repetition setup is accelerated;
- real 50th shift;
- real eligibility;
- real continued play;
- real commit;
- real completion;
- real reload;
- real New Run.

## Seeded-item capability PASS

Separate result only.

It may state:

**item capability runtime works**

It may not state:

**Old Boundary Token product acquisition works**.

---

# Release-candidate failure conditions

Fail if any of these occur:

- Lumber uses legacy action instead of `lumber.shift`;
- paid School charge/effects replay after reload;
- lodging pays twice;
- Foreman Night spends daytime Energy;
- Forest costs entry Energy twice;
- logging-road unavailable without item;
- advance is allowed before route selection on new option-aware Activity;
- route is lost on reload;
- Forest result/continuation repeats;
- Hard Work eligible at 49;
- Hard Work gains an extra prerequisite;
- commit grants Meta before completion;
- completion grants `hardWork:lumber` twice;
- New Run loses Meta;
- seeded token evidence is reported as natural PA09 acquisition.

No production runtime/UI/content file was modified by Chat 4.
