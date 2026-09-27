# School Staged vs Reachable Content QA v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Baseline: current main after PR38

## Purpose

Verify PR38's two-layer School content model:

- full authored teacher/course libraries remain preserved in staging;
- root production includes only presentation content that current runtime can trigger safely and truthfully.

This prevents staged authoring from being misreported as naturally reachable gameplay.

## Current shipped production packs

Root production catalog contains:

- content/packs/school-teachers-v1.json
- content/packs/school-lesson-content-v1.json
- content/packs/school-life-content-v1.json

Post-merge validation:
- 16 packs
- 43 events
- 35 actions
- 9 endings

Post-merge full suite:
286/286 PASS.

## Current staged libraries

Full authored libraries remain under:

- content/packs/school-target/school-teachers-v1.json
- content/packs/school-target/school-lesson-content-v1.json
- content/packs/school-target/school-life-content-v1.json

Those nested files are not recursively loaded as root production packs.

If they were recursively loaded, their duplicate pack IDs would conflict with the three root production copies.

Current successful 16-pack validation proves the root loader includes the root production copies, not the nested staging duplicates.

PASS.

## Teacher production/staging split

Root teacher pack:
- 8 media identities;
- 0 events;
- no reads;
- no writes;
- no mechanics effects.

Staged teacher library:
- 8 course/teacher presentation events;
- all have no trigger/reaction trigger;
- all choices are effect-free.

Reason for staging:
current generic paid-School reaction does not expose exact paid course identity.

Therefore course-specific teacher scenes are preserved but not falsely exposed as reachable events.

PASS.

## Lesson production/staging split

Root lesson pack:
- 1 generic event:
  school-lesson-content-v1.after-school
- trigger:
  actionCompleted: school
- effect-free choice.

Staged lesson library:
- 8 course-specific authored event families;
- each course family remains untriggered;
- all eight contain authored lesson variants;
- generic after-school event is also retained in the library.

This is the correct current boundary:
generic paid-School follow-up is reachable;
exact-course authored routing remains staged.

PASS.

## School-life production/staging split

Root School-life pack contains exactly the safely triggerable presentation hooks:

1. school-life-content-v1.after-paid-lesson
   - actionCompleted: school

2. school-life-content-v1.after-night-study
   - exact existing nightChoiceCompleted School IDs

Both are effect-free.

Staged School-life library additionally preserves:
- arrival library;
- teacher feedback library;
- peer/context library;
- post-lesson library;
- Night-study flavor library.

Those generic content libraries have no reaction trigger and therefore remain staging material until a truthful routing surface exists.

PASS.

## No fake exact-course routing

Current production does not attempt to infer exact paid course from:

- stat changes;
- presentation text;
- last media;
- a guessed world fact;
- private School counters.

The generic actionCompleted: school signal is used only for generic safe post-School presentation.

Course-specific content remains staged.

PASS.

## Night-study exact routing

The production after-night-study event uses the existing exact Night-choice IDs.

It covers all currently authored School Night-study choices across the eight tracks, including their supported stats.

This is a truthful public trigger because NightFlow exposes the exact completed choice identity.

PASS.

## Effect-free presentation guarantee

Across root and staged authored School packs reviewed here:

- choice effects are empty;
- presentation content does not charge tuition;
- presentation content does not spend Energy;
- presentation content does not modify stats;
- presentation content does not increment School counters;
- presentation content does not grant career/relationship/public-result facts.

PASS.

## Staged content is not natural-path evidence

QA reporting rule:

The following are NOT naturally reachable merely because they exist under school-target:
- exact teacher presentation events;
- exact course-specific lesson event libraries;
- milestone-neutral arrival/feedback/peer libraries.

Allowed classifications:
- AUTHORED_STAGED
- CONTENT_READY
- NOT_NATURALLY_ROUTED_YET

Do not classify them as:
- SHIPPED_REACHABLE
- PRODUCT_PATH_PROVEN

until a production trigger exists and exact-head tests execute that trigger.

## Root production reachability

Naturally reachable current authored School presentation paths are:

- paid lesson -> generic post-School presentation;
- paid lesson -> School-life after-paid-lesson presentation;
- exact School Night-study choice -> after-night-study presentation.

These hooks are presentation-only and may coexist with the underlying School mechanics without duplicating the transaction.

## Save/reload

Current PR38 tests verify:
- materialized optional School-life content keeps its selected variant across reload;
- resolving the content does not duplicate mechanics;
- Night-study presentation does not own the Night-study transaction.

PASS.

## Future routing gate

Before moving a staged exact-course event to root reachable production, require:

1. a truthful exact-course completion signal;
2. no inference from private state;
3. event trigger uses that public signal;
4. effect-free presentation remains effect-free unless Product explicitly authors a new mechanic;
5. save/reload preserves materialized content identity;
6. exact-head CI.

Do not add a runtime primitive solely to make staged text appear reachable unless the product requirement justifies it.

## Final classification

- full eight-teacher library preserved: PASS
- full eight-course lesson library preserved: PASS
- root production limited to safely triggerable events: PASS
- exact Night-study routing truthful: PASS
- fake exact-course routing introduced: NO
- staged content misreported as reachable: NO
- presentation effects added: NO
- current main CI: 286/286 PASS

No production runtime/UI/content file was modified by Chat 4.
