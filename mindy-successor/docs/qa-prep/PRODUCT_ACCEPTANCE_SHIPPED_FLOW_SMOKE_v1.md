# Product Acceptance Shipped-Flow Smoke v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Baseline: PR20 production activation + PR21 shipped Product Acceptance evidence

## Purpose

This smoke script exercises the longest honest production path currently available, then crosses **one explicit QA accelerator boundary** for the parts that are not naturally reachable because Product Acceptance authoring is still open.

Everything before the boundary is shipped-flow evidence.

Everything after the boundary is accelerator evidence only.

The smoke must never report the accelerated section as proof that PA09, PA16 or PA17 are complete.

---

# Phase A — shipped flow only

## 1. Startup / arrival

Start from a fresh production save.

Complete creation and arrival through shipped commands/UI.

Expected:

- run active;
- `story.arrived=true`;
- HUD day/season/year visible;
- Energy/money visible;
- central semantic presentation visible.

Save/reload.

Expected:

- no creation replay;
- no arrival replay.

---

## 2. First Lumber shift

Open Work and execute exact target action:

`lumber.shift`

Expected:

- daytime Energy -1;
- `career:lumber` exists;
- `completed_shifts=1`;
- action result presentation:
  `job/lumber/result/default`;
- pending milestone:
  `lumber.career-first-shift`;
- pending presentation:
  `job/lumber/event/lumber-career-first-shift/default`.

Save/reload while pending.

Expected exact pending identity survives.

---

## 3. Milestone -> Foreman professional route

Resolve:

`choice:continue`

Expected next pending event:

`lumber.foreman-notice`

Expected presentation:

`relationship/lumber-foreman/lumber-foreman-notice/default`

Choose:

`professional`

Expected:

- relationship `lumber.foreman`;
- stage `route-professional`;
- route choice `professional`;
- no additional daytime Energy charge.

---

## 4. Paid School lesson

Execute:

`schoolLesson:school.course.arcana`

Record pre-state:

- money;
- current-day Energy;
- Magic;
- Reason;
- Creativity;
- Arcana `lessons_completed`.

Expected after one command:

- money -500;
- current-day Energy -1;
- Magic +4;
- Reason +4;
- Creativity +2;
- Arcana `lessons_completed +1`;
- Arcana `night_study_sessions` unchanged;
- presentation:
  `school/arcana/lesson/default`.

Expected blocker remains visible:

`lumber.school.management-ready`

is still absent.

Save/reload twice.

Expected no replay of tuition/Energy/stats/counter.

---

## 5. NightFlow normal lodging

Execute:

`endDay`

Expected phase:

`LodgingResolution`

Choose:

`lodging.normal`

Expected:

- money -100 exactly once;
- `lodgingPaymentCommitted=true`.

Save/reload immediately.

Expected no second lodging charge.

---

## 6. Foreman Night

Choose shipped Night action:

`lumber.foreman.night`

Expected:

- pending event:
  `lumber-night.foreman-professional`;
- professional relationship route remains;
- daytime Energy unchanged by Night relationship action;
- relationship Night counter increments once.

Save/reload pending event.

Resolve:

`choice:continue`

Expected:

- NightFlow completes;
- calendar advances once;
- next day Energy is initialized exactly once;
- lodging money remains paid once.

---

## 7. Natural Forest entry must fail

Attempt exact shipped command:

`enterActivity:lumber.forest`

without direct state mutation.

Expected:

**REJECTED because the production capability is absent.**

This failure is required smoke evidence.

Record:

- inventory;
- world facts;
- Energy;
- Activity state.

After rejection all remain unchanged.

This is the natural end of the currently reachable Product Acceptance path.

PA09 is still OPEN.

---

# THE ONE QA ACCELERATOR BOUNDARY

From this point onward the run is **ACCELERATOR_EVIDENCE_ONLY**.

The smoke may prepare otherwise repetition- or authoring-blocked state, but every mutation must be listed here.

Allowed QA preparation inside this single boundary:

1. add the existing capability proof fact:
   `lumber.capability.enter-old-boundary`
   solely to enter the real shipped Activity;
2. later set Lumber `completed_shifts=49`
   solely to compress repetition before the real 50th `lumber.shift`;
3. preserve only real complex-ending facts that were produced by the accelerated real Forest mechanics.

No other product fact/ending eligibility/reward may be inserted directly.

This single boundary separates natural product evidence from all accelerated evidence below.

---

# Phase B — accelerator evidence only

## 8. Accelerated Forest entry

After adding only:

`lumber.capability.enter-old-boundary`

execute real:

`enterActivity:lumber.forest`

Expected:

- Energy -2 exactly once;
- real production Activity envelope;
- checkpoint `entry`;
- UI/central Activity state;
- advance/escape controls.

Save/reload.

Expected:

- no second Energy charge;
- internal state/RNG/checkpoint survive.

---

## 9. Accelerated Forest success path

Execute real:

`activityAction:advance`

through the current shipped adapter to success.

Expected:

- Activity closes;
- world fact:
  `lumber.forest.truth-known`;
- pending event:
  `lumber-cross.activity-forest-return`;
- semantic presentation:
  `job/lumber/event/lumber-cross-activity-forest-return/default`.

Save/reload pending continuation.

Resolve:

`choice:continue`

Expected Lumber career facts:

- `forest-truth-known`;
- `forest-problem-resolved`.

No extra daytime Energy charge.

Important:

This proves real A5/result->Resolver mechanics only.

It does not prove:

- token acquisition;
- three Forest routes;
- three challenge families;
- item-dependent Activity action.

---

## 10. Hard Work 49/50 boundary

Inside the already declared QA accelerator boundary, prepare only:

`completed_shifts=49`

while keeping the real Forest-derived complex-ending facts from the previous step.

Before the final Work command:

- Hard Work not eligible.

Execute one real shipped:

`lumber.shift`

Expected:

- Energy -1;
- `completed_shifts=50`;
- `ending.lumber.hard-work` eligible;
- complex Forest ending eligible from real Forest continuation state;
- run remains active;
- no Meta reward.

Exact Hard Work condition must still be:

`careerCounter(lumber, completed_shifts) >= 50`

and nothing else.

---

## 11. Continue while endings are eligible

If Energy/state allows, execute one normal shipped action such as another:

`lumber.shift`

Expected:

- run still active before commitment;
- eligible endings remain eligible;
- no `hardWork:lumber` reward.

This proves eligibility != completion.

---

## 12. Commit Hard Work

Execute:

`commitEnding:ending.lumber.hard-work`

Expected:

- status `ending_committed`;
- exact committed ID;
- semantic presentation:
  `ending/lumber/hard-work`;
- no RunResult yet;
- no Hard Work Meta reward yet.

Save/reload.

Expected same committed state.

---

## 13. Complete Hard Work

Execute:

`completeEnding`

Expected:

- status `ended`;
- one RunResult;
- ending ID exact;
- `appliedMetaRewardIds=['hardWork:lumber']`;
- one transaction proof;
- `meta.hardWorkProgress=['lumber']` or one unique Lumber entry.

Save/reload twice.

Expected no duplication.

---

## 14. New Run

Execute:

`newLife`

Expected:

- new run state;
- Meta preserved;
- visible Lumber Hard Work next-run stat difference;
- starting Strength/Endurance reflect the existing Hard Work Meta rule;
- transaction/reward still unique.

Save/reload once.

---

# Result classification

## May be recorded as SHIPPED smoke PASS

Only Phase A:

- startup/arrival;
- target Lumber;
- milestone;
- Foreman professional route;
- paid School;
- normal lodging;
- Foreman Night;
- exact natural Forest-entry rejection without capability.

## Must be recorded as ACCELERATOR evidence

All Phase B steps:

- Forest entry/reload/result;
- Forest continuation;
- 49/50 Hard Work;
- simultaneous endings;
- commit/completion;
- new run.

Those mechanics are real shipped mechanics, but the ordered path crosses the explicit accelerator boundary.

---

# Required smoke evidence capture

For every save/reload boundary record:

- save schema version;
- day/calendar;
- Energy/money;
- pending event/variant/presentationId;
- Night phase where applicable;
- Activity envelope/checkpoint where applicable;
- Lumber career counter/facts;
- School track counters;
- eligible/committed ending IDs;
- RunResult transaction ID;
- Meta reward proof.

No screenshot or visual observation may substitute for state assertions on exactly-once transactions.

---

# Smoke failure rules

Fail the shipped phase if:

- target Lumber button executes legacy `lumber`;
- School uses generic action instead of `schoolLesson`;
- lodging reload pays again;
- Foreman Night spends daytime Energy;
- natural Forest entry succeeds without a legitimate capability;
- any direct QA mutation occurs before the accelerator boundary.

Fail the accelerator phase if:

- Forest entry charges Energy twice;
- Activity reload rerolls internal state;
- result continuation repeats;
- Hard Work is eligible at 49;
- Hard Work needs any extra prerequisite at 50;
- commit grants Meta;
- completion grants `hardWork:lumber` more than once;
- new run loses the Meta result.

No production runtime/UI/content file was modified by Chat 4.
