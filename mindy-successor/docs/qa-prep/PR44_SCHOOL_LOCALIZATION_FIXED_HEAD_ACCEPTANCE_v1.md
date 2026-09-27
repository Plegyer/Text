# PR44 School localization fixed-head acceptance v1

Status: COMPLETE / GREEN_EXACT_HEAD

PR:
- #44 `Lead: integrate School RU/EN production localization`
- accepted exact head: `07912a4870f82472a01f6ff8d0d81f1f67081593`
- base: `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`
- state at acceptance review: OPEN / mergeable / not yet merged.

## Fix progression

The original failing head `657398c...` assumed the localized paid-lesson action result rendered immediately, while current production can present `base.school` first.

The next attempted fix head `b7ddb5c...` correctly followed the real pending `base.school` path but failed exact-head run #60 because its test parsed raw persisted JSON and read the runtime-only compatibility facade `run.flags`.

The accepted head `07912a4...` fixes that final test-only assertion to the actual persisted path:
`run.legacyCompat.flags['school.enrolled']`.

The latest commit changes only `tests/ui.test.ts`; it does not alter production mechanics.

## Exact-head CI evidence

Workflow:
- `mindy-successor check`
- run #61
- run id `36322746998`
- job id `108629601836`
- conclusion: SUCCESS

Full check evidence:
- validation: `Content OK: 17 packs, 46 events, 35 actions, 9 endings.`
- build: PASS
- tests: 301
- pass: 301
- fail: 0

Relevant renderer tests:
- #299 Forest result RU/EN pending-state localization: PASS
- #300 School RU/EN localization preserves course command and pending scene identity: PASS
- #301 School Night-study labels localize without changing NightFlow save: PASS

This evidence is bound to exact PR head `07912a4870f82472a01f6ff8d0d81f1f67081593`.

## School panel and eight-course surface

GREEN.

The PR localizes:
- School panel title/help;
- paid-lesson button;
- tuition/current-Energy text;
- all eight current course labels;
- all eight course descriptions;
- stat labels used in the School course rows.

The UI regression compares the stable `data-school-course` ID list across RU and EN. Locale changes text only; course command identities are unchanged.

Representative Literacy & Numbers checks pass in both languages.

## Paid-lesson gameplay invariance

GREEN.

The exact-head UI test starts with:
- money 2000;
- current-day Energy 3.

After the real Literacy & Numbers `schoolLesson`, it verifies:
- money 1700;
- current-day Energy 2;
- Reason +4;
- Wits +2;
- lastAction id `school`;
- lastAction presentationId `school/literacy-and-numbers/lesson/default`.

No alternate locale-specific School command is introduced.

## Current reachable School event localization

GREEN.

The test follows current production behavior rather than bypassing it.

After the paid lesson, pending identity is:
- event: `base.school`;
- variant: `lesson`.

In EN it verifies localized:
- title `The Steady Boil Class`;
- body;
- choice `listen`;
- workshop media alt.

While that scene is pending, switching EN -> RU keeps the serialized life Save byte-identical, then renders the RU title/body/choice.

Resolving the real `listen` choice clears the pending scene and persists:
`legacyCompat.flags['school.enrolled'] = true`.

The localized paid-lesson result surface then remains available without duplicating the gameplay transaction.

## Night-study localization

GREEN.

The separate exact-head Night UI test reaches the real NightFlow choice:
`school.night_study.literacy_and_numbers.reason`

and verifies:
- RU localized course/stat label and context;
- EN localized course/stat label and context;
- localized Night-study button;
- language switch leaves the NightFlow Save unchanged.

The PR does not change:
- tuition;
- current-day Energy;
- selected stat gain;
- next-day Energy penalty;
- School typed progress.

## Save / RNG / presentation boundary

GREEN for reviewed scope.

Locale remains presentation preference outside gameplay Save.

The accepted renderer tests explicitly preserve the serialized life Save during locale switches on:
- pending School event;
- active School Night-study choice screen.

No gameplay RNG, Save schema, event ID, variant ID, course ID or Night choice ID is localized or duplicated.

## Staging exclusion

GREEN.

The PR does not promote:
- worker-only exact-course teacher events;
- teacher routing staging;
- unresolved management/accounting public result;
- unresolved Arcana/Forest public result.

Current reachable production School identities are localized selectively.

## Mechanics diff check

GREEN.

The production PR changes are localization/presentation UI integration and localization data. The fix sequence after the initial failure modifies tests only.

No reviewed change alters:
- School dispatcher/engine transaction;
- course tuition;
- Energy costs;
- stat packages;
- typed School counters;
- NightFlow mechanics;
- Resolver gameplay conditions/effects;
- Save schema;
- RNG.

## Verdict

`GREEN_EXACT_HEAD`.

PR44 head `07912a4870f82472a01f6ff8d0d81f1f67081593` satisfies the requested fixed-head acceptance with successful exact-head full CI at 301/301.

Merge acceptance is still separate: item 153 must verify the actual merge SHA and successful post-merge main workflow before marking the post-merge gate green.
