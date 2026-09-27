# PR38 School Production Integration Review v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
PR: #38 — Lead: integrate authored School production content
Reviewed head: d3bc471d2f5b92f57da14ba7a15f5932b6113edc
Base: 9c994934152c2195ed17e6a18fdd1a301e27852c

## Final disposition

GREEN on the reviewed exact head.

PR38 is still OPEN / NOT MERGED at review time.

Latest exact-head CI:
- run 36312964559
- conclusion: success
- tests: 286
- pass: 286
- fail: 0
- validation: Content OK: 16 packs, 43 events, 35 actions, 9 endings

## Rerun history

The PR was not green on its first integration attempts.

Observed sequence:

1. Head 953b8691e73773eb90c16cd0c0c4cc2bbeae2484
   - run 36312468112
   - validation failure:
     school-lesson-content-v1.literacy-and-numbers had no trigger.

2. Head aca9435c6741fb9129e179fbf0a434c4c8f0be31
   - run 36312667955
   - validation passed: 16 packs, 43 events, 35 actions, 9 endings
   - tests: 280
   - pass: 276
   - fail: 4

3. Head 223f676995496f88e09ba79af09d7d4b2fdc03fd
   - run 36312707356
   - validation passed
   - tests: 280
   - pass: 278
   - fail: 2
   - remaining issues:
     missing school-typed-progress-exactly-once fixture;
     teacher save test built an incomplete isolated catalog.

4. Head 468403426ca0dbbe2c3216f0c63392af9e5ab858
   - run 36312875637
   - validation passed
   - tests: 286
   - pass: 285
   - fail: 1
   - remaining issue:
     generic lesson fallback test built an incomplete isolated catalog.

5. Head d3bc471d2f5b92f57da14ba7a15f5932b6113edc
   - run 36312964559
   - 286/286 PASS.

Only the latest head is current merge evidence.

## Three authored packs are intentionally included

PR38 adds root production copies:
- content/packs/school-teachers-v1.json
- content/packs/school-lesson-content-v1.json
- content/packs/school-life-content-v1.json

It also retains full authored staging libraries under:
- content/packs/school-target/school-teachers-v1.json
- content/packs/school-target/school-lesson-content-v1.json
- content/packs/school-target/school-life-content-v1.json

The PR commit history explicitly includes each root pack in the production catalog.

Current PR validation reports 16 packs versus the 13-pack post-PR37 baseline, exactly matching three new root production packs.

PASS.

The inclusion fixture still contains older PROPOSED_NOT_INCLUDED wording. Root placement, commit history, and exact-head validation are the current inclusion evidence; the fixture wording is stale documentation and should not override Git/runtime evidence.

## Reachable production vs staged authored library

The PR correctly separates:
- naturally reachable production hooks;
- richer course-specific authored libraries that current routing cannot safely target yet.

Production teacher pack:
- 8 teacher media identities;
- 0 inert teacher events.

Production lesson pack:
- one generic post-School presentation event.

Production life pack:
- post-paid-lesson presentation hook;
- exact Night-study completion presentation hook.

The richer staging libraries preserve:
- all eight teacher presentation identities;
- all eight course-specific lesson families;
- three lesson text variants per track;
- milestone-neutral School-life libraries.

This avoids shipping untriggered course-specific events as if they were naturally reachable.

PASS.

## Eight teacher/course identities

The teacher authored set represents all eight locked School tracks:
- Literacy & Numbers;
- Arcana;
- Rhetoric & Social;
- Etiquette & Presentation;
- Field Craft;
- Physical Training;
- Arts & Performance;
- Body Confidence.

Production teacher media contains eight unique teacher presentation identities.

The staging lesson library contains all eight course-specific authored lesson families.

The latest tests verify those identities against the current School course catalog.

PASS.

## Strict pack media namespace fix

Three earlier fix commits changed media IDs/references from slash-style pack media IDs to strict dot-style media IDs.

The diffs change only:
- media ID strings;
- variant media references using those IDs.

They do not change:
- tuition;
- Energy;
- stats;
- counters;
- conditions;
- effects;
- public results;
- save fields.

Classification:
PRESENTATION_ONLY_FIX.

PASS.

## Locked paid School mechanics

PR38 does not modify src/core/school.ts or the paid-course transaction implementation.

The integrated lesson test asserts the existing eight course contracts, including:
- current tuition;
- current Energy cost = 1;
- current stat packages.

No production authored choice in the three packs writes transaction mechanics.

PASS.

## Paid vs Night progress ownership

The integrated typed-progress fixture and tests assert:

Paid lesson:
- lessons_completed +1
- night_study_sessions +0

Night study:
- lessons_completed +0
- night_study_sessions +1

This is the correct locked ownership.

PASS.

## No ordinary Lust gain

The authored School lesson library contains no ordinary Lust mutation.

The production authored packs are presentation/content only.

PASS.

## No teacher prerequisite

Teacher identity is not added as a paid-lesson condition.

The production teacher pack is media-only and has no event mechanics.

Course-specific teacher scenes remain staged until safe course routing exists.

PASS.

## No unapproved public result

PR38 does not publish:
- management/accounting readiness;
- Arcana/Forest readiness;
- career facts for those unresolved paths;
- new certificate/exam/project result semantics.

The authored content remains milestone/public-result neutral.

PASS.

## Generic School presentation hooks remain effect-free

Root production lesson/life events use existing reaction hooks:
- generic actionCompleted: school;
- exact existing school Night-choice completion IDs.

All authored choices in the reviewed production/staging packs have empty effects.

They do not:
- charge tuition;
- spend Energy;
- modify stats;
- increment School counters;
- grant career/relationship facts.

PASS.

## Save/schema behavior

The teacher production pack adds presentation media only.

The final tests use the full current production catalog when checking save parsing, avoiding false failures from incomplete isolated definitions.

School-life reload tests verify:
- materialized optional content keeps its variant;
- content resolution does not duplicate mechanics;
- Night-study presentation does not own Night-study mechanics.

PASS.

## Current PR status

Exact-head review:
GREEN — 286/286 PASS.

Merge status at review time:
OPEN / NOT MERGED.

Post-merge main evidence:
not yet applicable.

## Final matrix

- three root authored packs intentionally included: PASS
- strict media namespace fix presentation-only: PASS
- all eight teacher/course identities retained: PASS
- tuition unchanged: PASS
- Energy unchanged: PASS
- stat packages unchanged: PASS
- ordinary Lust gain added: NO
- teacher prerequisite added: NO
- unapproved public result added: NO
- generic School presentation effects: NONE
- save/schema mutation from teacher media: NO
- exact-head CI: 286/286 PASS
- merged: NO

PR38 is GREEN on head d3bc471d2f5b92f57da14ba7a15f5932b6113edc and is ready for normal Lead merge handling.

No production runtime/UI/content file was modified by Chat 4.
