# School Exact-Course Routed Content Acceptance v1

Status: future acceptance plan only.
Assumption: Lead later adds a backward-compatible public reaction seam that exposes the exact paid `school.course.*` identity.

This document does not implement or require any specific schema spelling for that seam.

## 1. Exact route correctness

For each of the eight paid courses, acceptance requires:
- the successful paid School transaction emits the exact canonical course identity once;
- only teacher/course-specific authored content for that exact course becomes eligible from the exact-course trigger;
- another course's staged content does not become eligible from the same fact;
- no course identity is inferred from stat changes, tuition, Energy, or private School counters.

Required matrix:
- Literacy & Numbers -> Mara Fen / Literacy content only;
- Arcana -> Ilyra Venn / Arcana content only;
- Rhetoric & Social -> Cassian Reed / Rhetoric content only;
- Etiquette & Presentation -> Eliane Marrow / Etiquette content only;
- Field Craft -> Rowan Pike / Field Craft content only;
- Physical Training -> Tovan Kest / Physical Training content only;
- Arts & Performance -> Nessa Lark / Arts content only;
- Body Confidence -> Sera Vey / Body Confidence content only.

## 2. Generic School routing remains backward-compatible

The existing generic:
- `actionCompleted:school`

must continue to work.

Existing generic consumers may remain generic and must not be forced to migrate merely because exact-course routing exists.

Acceptance:
- generic post-lesson event still materializes when configured;
- exact-course event may materialize in the same reaction epoch;
- trigger matching remains deterministic.

## 3. Generic + exact event coexistence policy

The runtime seam must not accidentally produce duplicate presentation of the same semantic content.

Before production inclusion, every generic/exact pair must declare one of:

### INTENDED_BOTH
Use when:
- generic reflection and exact teacher/course scene are distinct authored beats;
- both are intentionally allowed in the same lesson aftermath.

### EXACT_SUPERSEDES_GENERIC
Use when:
- exact course-specific presentation replaces the generic fallback;
- generic content is disabled/suppressed by content/inclusion policy, not by replaying or undoing the transaction.

### GENERIC_ONLY
Use when:
- exact content is not yet integrated for that course.

Acceptance rejects an undeclared state where generic and exact scenes duplicate the same text/meaning by accident.

## 4. Paid transaction remains exactly once

Exact-course routed presentation is observational only.

For every paid course verify:
- tuition charged once;
- current-day Energy reduced once;
- full locked stat package applied once;
- `lessons_completed` increments once where typed School progress is active;
- `night_study_sessions` does not increment;
- ordinary Lust does not change;
- opening/resolving exact teacher/course content performs none of those operations again.

## 5. No extra mechanics from authored content

Teacher/course-specific routed packs must have:
- no transaction effects;
- no tuition write;
- no Energy write;
- no stat write;
- no Lust write;
- no School-counter write;
- no public-result publication unless a separately approved authored result explicitly owns that behavior.

Ordinary paid lesson availability remains independent from teacher relationship state.

## 6. Save / reload stability

Acceptance scenarios:

### Reload after lesson, before opening optional exact content
- paid transaction remains committed once;
- exact event instance remains queued;
- selected variant remains stable;
- generic event instance, if intentionally present, remains stable;
- no new exact-course fact needs reconstruction from Save.

### Reload with exact teacher/course scene pending
- event ID unchanged;
- variant ID unchanged;
- allowed choices unchanged;
- presentation/media identity unchanged;
- resolving scene cannot replay School transaction.

### Reload after routed scene resolution
- event history remains committed;
- no duplicate materialization from reload alone;
- no extra tuition/Energy/stat/progress.

## 7. Exact presentation identity

Every exact routed event must map to the intended semantic presentation surface.

At minimum verify:
- teacher/classroom identity matches course;
- course lesson presentation identity matches course;
- static fallback resolves;
- optional GIF belongs to the same teacher/course family;
- saved materialized scene preserves its semantic presentation identity after reload.

Do not use animation completion as a gameplay boundary.

## 8. Multi-GIF acceptance

For each exact routed course:
- assigned GIF/static asset is either dedicated or an explicitly approved reusable pool;
- reuse never changes the represented teacher/course incorrectly;
- text fallback remains valid;
- missing GIF leaves gameplay and scene resolution intact.

Reachable/staged planning source:
- `SCHOOL_MULTI_GIF_REACHABLE_STAGED_SPLIT_v2.md`.

## 9. Staged pack promotion requirements

Before promoting staged teacher/course content:
1. convert event IDs to strict pack-owned namespaces where needed;
2. use valid dot content/media IDs;
3. attach exact-course reaction trigger;
4. run strict `loadCatalog` validation;
5. run exact course routing matrix;
6. run generic compatibility test;
7. run save/reload matrix;
8. run full School regression;
9. confirm no public-result semantics were added by content conversion;
10. include pack explicitly in production bootstrap/catalog.

Do not recursively include fixture files.

## 10. Negative routing matrix

Every exact course must explicitly reject the other seven teacher/course events.

Example:
- Arcana completion must not route Literacy, Rhetoric, Etiquette, Field Craft, Physical Training, Arts & Performance, or Body Confidence teacher content.

Repeat for all eight courses.

This is required even when multiple courses share one or more stats.

## 11. Interaction with generic post-lesson content

Current safe generic staging pack:
- `school-generic-reachable-v2.json`.

After exact routing is available, Lead may:
- keep generic reflection plus exact teacher content;
- retain generic as fallback only;
- remove generic from production inclusion.

Whichever policy is chosen must be explicit and tested.

## 12. Interaction with Night study

Exact paid-course routing must not affect Night-study routing.

Night keeps:
- exact `nightChoiceCompleted` identity;
- existing 24 course/stat choices;
- zero tuition/current-day Energy;
- +2 selected supported stat;
- next-day Energy -1;
- `night_study_sessions +1`;
- `lessons_completed +0`.

Paid exact-course events must not listen to Night choice facts unless separately authored.

## 13. Full acceptance checklist

- [ ] exact paid course fact emitted once
- [ ] generic `actionCompleted:school` still emitted
- [ ] matching teacher/course content only
- [ ] all seven non-matching course events rejected
- [ ] duplicate generic/exact policy declared
- [ ] tuition exactly once
- [ ] Energy exactly once
- [ ] stat package exactly once
- [ ] no ordinary Lust mutation
- [ ] paid progress exactly once
- [ ] no Night counter cross-write
- [ ] reload before opening routed scene stable
- [ ] reload with pending scene stable
- [ ] reload after resolution stable
- [ ] static/text fallback valid
- [ ] GIF optional and mechanic-independent
- [ ] strict pack namespace/content IDs
- [ ] production inclusion explicit
- [ ] full School regression green

## 14. Runtime boundary

This file is an acceptance contract only.

No shared runtime seam is implemented here.
