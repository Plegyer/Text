# PR44 School localization fixed-head acceptance v1

Status: COMPLETE / BLOCKED_ON_EXACT_HEAD_CI

PR:
- #44 `Lead: integrate School RU/EN production localization`
- reviewed exact head: `b7ddb5c64adbaaa5f70ceadbe530652e3c32e6a5`
- base: `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`
- state at review: OPEN / mergeable / not merged.

This is the first post-item-151 head that attempts to fix the School UI regression.

## Exact-head CI

Workflow:
- `mindy-successor check`
- run #60
- run id `36322468342`
- status: completed
- conclusion: FAILURE

Node test summary:
- tests: 301
- pass: 300
- fail: 1

Failing subtest:
`renderer: School RU EN localization preserves course command and pending scene identity`

Failure:
`Cannot read properties of undefined (reading 'school.enrolled')`

Location:
`tests/ui.test.ts:342`

Therefore this exact head is not accepted.

## What the fix corrected

The earlier failed head incorrectly waited for the localized lesson action-result scene immediately after clicking the paid lesson.

The new test correctly recognizes the real current production ordering:
- the paid `schoolLesson` transaction commits;
- current legacy event `base.school` is then pending;
- renderer shows the pending event before the action-result scene.

The revised test now waits for:
- `pendingScene.eventId === 'base.school'`;
- variant `lesson`.

It also verifies before resolving that event:
- money: 2000 -> 1700;
- current-day Energy: 3 -> 2;
- Reason +4;
- Wits +2;
- last action ID remains `school`;
- presentationId remains `school/literacy-and-numbers/lesson/default`;
- localized EN event title/body/choice/media are visible.

Then RU switch is performed while that real pending scene exists, and the serialized life Save is asserted byte-identical across the locale change.

This resolves the original render-order misunderstanding without weakening production School reactions.

## Current failing assertion

After resolving `base.school` choice `listen`, the test parses the raw JSON stored in:
`portal-life.v1`

and then asserts:
`resolved.run.flags['school.enrolled'] === true`.

That is not a valid persisted-JSON path on the current Save schema.

The engine exposes `run.flags` as a compatibility facade attached at runtime. The facade is not an ordinary persisted enumerable field. The actual serialized compatibility data lives under:
`run.legacyCompat.flags`.

Therefore parsing raw localStorage JSON directly produces no enumerable `run.flags`, causing the TypeError seen in run #60.

The production event itself still writes legacy flag:
`school.enrolled=true`
through the existing `flag` effect.

QA-correct test shapes include either:
- assert raw persisted `resolved.run.legacyCompat.flags['school.enrolled'] === true`; or
- pass the serialized save through the normal `parseSave` path and then assert the runtime compatibility facade `parsed.run.flags['school.enrolled']`.

This is a test-state-shape assertion defect, not evidence of a School gameplay failure.

## RU/EN School panel acceptance on this head

The reviewed PR still provides:
- RU/EN School panel title/help;
- all eight current course labels/descriptions;
- localized tuition/Energy string;
- localized paid-lesson button;
- localized stat labels used by courses;
- localized School Night-study labels/context/buttons;
- localized current reachable School event/media keys.

The UI regression preceding the failure demonstrates both RU and EN course panel content for Literacy & Numbers and confirms the exact course ID list remains unchanged across locale.

The separate test:
`renderer: School Night-study labels localize without changing NightFlow save`
passes on this exact head.

## Gameplay / Save invariance review

No new production mechanics change was introduced by the latest fix commit; its changed file is the UI test.

The PR production diff remains localization/presentation-oriented. It does not modify:
- `schoolLesson` dispatch semantics;
- tuition numbers;
- course Energy cost;
- course stat packages;
- typed School counters;
- RNG;
- Save schema;
- NightFlow mechanics;
- School reaction conditions/effects.

The updated failing test itself successfully observes the expected paid-lesson money/Energy/stat transaction before hitting the bad persisted-field assertion.

Locale switch while `base.school` is pending is explicitly checked to leave the serialized Save unchanged.

## Staging exclusion

The reviewed PR does not promote worker-only exact-course teacher routing/events.

No new per-course teacher gameplay transaction is introduced.

## Verdict

`BLOCKED_ON_EXACT_HEAD_CI`.

The attempted fix is directionally correct and resolves the original pending-scene ordering assumption, but exact-head run #60 is still red due to an invalid persisted `run.flags` assertion.

A later PR head must:
1. fix that test assertion against the actual persisted Save boundary;
2. retain the pending `base.school` natural path;
3. pass all School RU/EN invariance assertions;
4. complete exact-head full CI successfully.

Do not merge or declare PR44 green from this head.
