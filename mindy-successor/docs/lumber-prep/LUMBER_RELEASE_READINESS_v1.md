# Lumber Release Readiness v1

Status: post-activation Lumber readiness snapshot.
Production baseline: PR #20 merge `9b427d75dc22021cd3373aa7dd3521782e54152d`.
Latest observed main also retains the same production activation contracts.

This document separates shipped production capability from remaining Product Acceptance authoring.

## Executive status

PR #20 ships:

- target Work action `lumber.shift` while legacy `lumber` remains save/runtime compatible;
- Lumber career machine;
- Foreman relationship;
- Forest Activity;
- Lumber endings;
- all three approved Lumber event packs;
- target Work UI;
- explicit NightFlow lodgings and voluntary choices;
- `lumber.foreman.night`;
- Forest Activity entry/action UI;
- typed School progression and `schoolLesson`.

The full Lumber Product Acceptance slice is still **PARTIAL**, because several genuine cross-system authoring dependencies remain OPEN.

Hard Work is **SHIPPED AND LOCKED**. It is not one of those dependencies.

## Area matrix

| Area | Production status | Exact identity / behavior | Remaining dependency |
| --- | --- | --- | --- |
| Lumber Work | **SHIPPED** | `lumber.shift`; 1 daytime Energy; increments `completed_shifts`; seasonal stat packages | none in Lumber content |
| Legacy coexistence | **SHIPPED / COMPATIBLE** | legacy `lumber` and target `lumber.shift` are distinct; schema-4 `actionCounts.lumber` remains parseable | no migration should be invented |
| Career milestone | **SHIPPED** | `lumber.career-first-shift`; reacts to `careerCounterChanged(lumber,completed_shifts)` | none |
| Foreman route | **SHIPPED** | `lumber.foreman-notice`; professional route reaches `route-professional`; no romance prerequisite | none |
| Foreman Night | **SHIPPED** | choice `lumber.foreman.night`; event `lumber-night.foreman-professional`; 0 daytime Energy; one Night slot | none in Night/Lumber identity |
| Normal lodging | **SHIPPED** | `lodging.normal`; cost 100; exactly-once payment contract | none |
| Forest Activity core/UI | **SHIPPED** | `lumber.forest`; 2 Energy entry; save/resume; advance/escape UI | natural entry remains blocked by real item-capability source |
| Forest continuation | **SHIPPED** | exact A5 `activityResult(lumber.forest,success,lumber.forest.success)`; event `lumber-cross.activity-forest-return` | reachable after production entry |
| Hard Work | **SHIPPED / READY** | `ending.lumber.hard-work`; only `completed_shifts >= 50`; reward `hardWork:lumber` | **none** |
| Forewoman ending | **SHIPPED IDENTITY / FLOW PARTIAL** | `ending.lumber.forewoman`; professional Foreman + two Lumber career facts | final School management/accounting public fact/provider/threshold |
| Forest ending | **SHIPPED IDENTITY / FLOW PARTIAL** | `ending.lumber.forest`; Forest continuation facts | production item path + deeper Forest PA authoring |
| School engine/progression | **SHIPPED** | `schoolLesson`; eight courses; typed `lessons_completed` and `night_study_sessions` | specific Lumber management/Arcana public facts and thresholds remain OPEN |
| Presentation/media | **SEMANTIC CONTRACT SHIPPED / ART PARTIAL** | slash semantic IDs; static `stage-lumber.svg` and `stage-forest.svg` packaged | future target GIF paths are missing/non-fatal and must not be labeled shipped |

## Hard Work — closed contract

Hard Work is fully specified.

Ending ID:

`ending.lumber.hard-work`

Only eligibility condition:

`careerCounter(lumber, completed_shifts) >= 50`

A6 reward ID:

`hardWork:lumber`

Forbidden extra prerequisites:

- milestone;
- relationship;
- season;
- Forest;
- School;
- item;
- legacy visit/action count.

Eligibility does not commit the ending or grant Meta.

Commitment alone does not grant the reward.

Completion applies `hardWork:lumber` exactly once, and save/reload cannot duplicate it.

The visible new-life effect remains:

- +3 starting Strength;
- +3 starting Endurance.

## Work / milestone / Foreman

The shipped professional chain is:

1. `lumber.shift`;
2. `completed_shifts +1`;
3. `lumber.career-first-shift`;
4. choice `continue`;
5. career transition `accept-hand`;
6. `lumber.foreman-notice`;
7. choice `professional`;
8. relationship stage `route-professional`.

Reactive scenes cost 0 additional daytime Energy.

No romance condition exists in the professional path.

## Night

Shipped production identities:

- lodging: `lodging.normal`;
- lodging cost: 100;
- Night choice: `lumber.foreman.night`;
- event: `lumber-night.foreman-professional`;
- relationship counter: `night_meetings`;
- relationship fact: `night-followup-complete`;
- semantic presentation: `relationship/lumber-foreman/lumber-night-foreman-professional/default`.

Proven invariants:

- professional-route-only visibility;
- zero daytime Energy;
- one Night slot;
- lodging payment exactly once;
- reload after lodging does not repay;
- reload with pending Night event does not duplicate relationship progress;
- no romance prerequisite.

Night/lodging wiring is no longer an OPEN production dependency after PR #20.

## Forest

Shipped:

- Activity `lumber.forest`;
- UI entry button;
- Activity advance/escape controls;
- entry cost 2 daytime Energy;
- checkpoint/resume envelope;
- result IDs:
  - `lumber.forest.success`;
  - `lumber.forest.escape`;
  - `lumber.forest.failure`;
- exact `activityResult` success continuation;
- immediate Lumber continuation without another shift.

Still OPEN:

### Old Boundary Token production acquisition/use

Locked identities:

- item `old_boundary_token`;
- capability `enter_old_boundary`.

The current worldFact bridge demonstrates the gate, but a natural production acquisition/use source and retain/consume semantics are still not locked.

Do not invent:

- vendor;
- price;
- acquisition event;
- consume rule;
- replacement capability ID.

### Deeper Forest authoring

The shipped counter-style Activity proves architecture and reload behavior.

The full Product Acceptance depth requirement still calls for richer route/challenge/season authoring. Exact encounters, deeper balance and lore remain OPEN.

Do not replace the three locked result IDs.

## School cross-system boundary

PR #20 ships:

- all eight School courses;
- `schoolLesson`;
- typed School-owned `lessons_completed`;
- typed `night_study_sessions`;
- paid-lesson and Night-study UI.

Still OPEN for Lumber cross-system progression:

1. final School management/accounting public fact ID;
2. provider/course/milestone/certificate threshold for that fact;
3. final Arcana/Forest School public fact ID/provider/threshold if activated.

The event pack contains the fixture-shaped Lumber return hook, but synthetic action:

`school.lumber-management`

is **not shipped** and must not become the production provider.

No management/certificate threshold may be inferred from legacy School content.

## Endings

### Hard Work

**SHIPPED / READY.**

Only `completed_shifts >= 50`.
Exact reward `hardWork:lumber`.

### Forewoman

**SHIPPED IDENTITY / PRODUCT FLOW PARTIAL.**

Conditions:

- `management-school-ready`;
- `forewoman-problem-resolved`;
- Foreman stage `route-professional`.

No Meta reward.

Blocker: final School-owned public fact/provider/threshold.

### Forest

**SHIPPED IDENTITY / PRODUCT FLOW PARTIAL.**

Conditions:

- `forest-truth-known`;
- `forest-problem-resolved`.

No Meta reward.

Blockers: natural item capability route and deeper full-PA Forest authoring.

## Media

Pack-declared target GIF paths under `assets/lumber/*.gif` are not packaged on the audited tree.

Therefore they are future/missing media, not shipped files.

Packaged static assets include:

- `assets/stage-lumber.svg`;
- `assets/stage-forest.svg`.

Missing future GIFs are non-fatal to the presentation contract. Semantic presentation IDs are slash-based and remain separate from dotted media asset IDs.

## PA00–PA26

`LUMBER_PRODUCT_ACCEPTANCE_ROW_MAP_v1.md` maps every PA00–PA26 row to current production IDs/APIs.

Rows now directly backed by PR #20 include:

- target Work;
- School command/progression infrastructure;
- target NightFlow lodging;
- Foreman Night choice;
- Forest UI entry/actions;
- target endings.

Rows still PARTIAL/OPEN are those requiring:

- a real item acquisition/use path;
- School-to-Lumber public fact authoring;
- deeper Forest content depth.

## Release checklist

### Shipped / closed

- [x] target `lumber.shift`;
- [x] legacy `lumber` coexistence;
- [x] schema-4 legacy save compatibility;
- [x] target `completed_shifts`;
- [x] first-shift milestone;
- [x] professional Foreman route;
- [x] normal lodging `lodging.normal`;
- [x] Foreman Night choice `lumber.foreman.night`;
- [x] Forest Activity UI entry/actions;
- [x] exact A5 `activityResult` continuation;
- [x] Hard Work = ONLY `completed_shifts >= 50`;
- [x] exact reward `hardWork:lumber`;
- [x] Hard Work exactly-once save/reload behavior;
- [x] Forewoman / Forest ending identities;
- [x] typed School progression and `schoolLesson`;
- [x] PA00–PA26 Lumber row mapping;
- [x] semantic presentation identity contracts.

### Genuine remaining blockers for full PA

- [ ] real `old_boundary_token -> enter_old_boundary` acquisition/use path;
- [ ] final School management/accounting public fact/provider/threshold;
- [ ] final Arcana/Forest School public fact/provider/threshold if used;
- [ ] deeper Forest route/challenge/season authoring required by full PA depth.

### Non-blocking art gap

- [ ] future Lumber GIF assets may be added later; missing paths are not labeled shipped and static fallback material exists.

## Overall readiness

The Lumber **production activation and Hard Work path are shipped**.

The full Lumber Product Acceptance slice remains **PARTIAL**, specifically because item-capability acquisition/use, School public-fact authoring and deeper Forest content depth remain unresolved.

Those remaining dependencies are isolated from Hard Work. Hard Work remains closed, shipped, and governed by exactly one eligibility condition with exact reward ID `hardWork:lumber`.
