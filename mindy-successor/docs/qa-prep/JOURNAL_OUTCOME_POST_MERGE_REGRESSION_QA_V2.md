# Journal/outcome post-merge regression QA v2

Status: COMPLETE / GREEN_CURRENT_MAIN

Previous reviewed main:
`4223be1f90f15a43938e072bc2171b0de5d2d1aa`.

PR57 reviewed main:
`df0119fd6574b69ab89cf1a99ae77adae3d811f1`.

Current main:
`52ddc76148e33836d3161b63bf4c25ffb5c39d02`
(PR58 generic-label merge).

PR56 does not edit core journal/outcome persistence.

Current blobs:
- engine `0fd8975f82ee8fc65457b9e6e5730b2b91943793`;
- PR56 app `505ab4fbe0467067eba2748aa9ef01fbbab99b6e`;
- current app `548b4d4de9ec95e43b58bc153827e32176b79b59`.

## Stable ref write path

Resolving a current event choice:
- applies exact current effects once;
- persists source choice text as fallback;
- appends locale-neutral:
  `{kind:'eventChoice', eventId, choiceId}`
  beside the journal text;
- stores the same ref in `lastAction.outcomeRef` when applicable.

Locale is not part of the ref.

## Journal/ref alignment

Current common journal logger appends:
- one text;
- one matching ref/null ref;
then slices both arrays to the same 160-entry window.

Legacy `run.journal=` compatibility setter:
- replaces journal text;
- rebuilds refs to same length;
- preserves matching-index refs when available;
- uses null otherwise.

Current parser rejects explicit misaligned arrays.

## Schema-4 omission compatibility

Existing schema-4 save without `journalRefs` remains accepted.

Parser normalizes missing refs to same-length null refs.

Old text-only journal history remains readable.

No fuzzy prose-to-ID inference exists.

## lastAction compatibility

Event-choice ref-backed lastAction:
- title localizes from stable event ID;
- body localizes from event+choice ID;
- stored fallback text remains available.

School result branch retains priority:
recognized School course result uses existing School-specific course/result localization before event-choice ref logic.

Ordinary action result behavior is unchanged when no outcomeRef exists.

## RU↔EN Save invariance

Current renderer regression:
`renderer: journal and lastAction choice outcome localize from stable refs`
PASS on current main run #104.

It verifies:
- stable ref identity;
- RU rendered outcome;
- EN rendered outcome;
- unchanged serialized gameplay Save across locale switch.

Locale lookup is read-only.

## Current CI evidence

Post-PR56 run #104:
- id `36404479571`;
- SUCCESS;
- 347/347 tests;
- validator 17/46/35/9.

Relevant PASS:
- `resolved event choice stores locale-neutral outcome refs beside fallback text`;
- `schema4 save without journal refs loads with null refs and keeps old text fallback`;
- `journal refs must stay index-aligned with fallback journal text`;
- `renderer: journal and lastAction choice outcome localize from stable refs`;
- School locale/result regressions.

## PR56 interaction

PR56 changes:
- localization;
- UI shell text consumers;
- UI tests.

It does not change:
- engine event-choice dispatch;
- journalRefs schema;
- outcomeRef schema;
- ref alignment;
- Save migration.

Therefore PR54 compatibility remains intact.

## Exactly-once rule

Locale switch does not:
- reapply choice effects;
- append Journal entries;
- change ref;
- mutate lastAction;
- run resolver;
- consume RNG.

## Verdict

`GREEN_CURRENT_MAIN`.

Current main retains PR54 stable-ref behavior, schema-4 omission compatibility, School priority and RU↔EN Save invariance after PR56.


## PR57 compatibility refresh

PR57 changes only the presentation route helper/generated semantic slots and current Activity media request. It does not edit event-choice dispatch, `journalRefs`, `outcomeRef`, Save schema/migration or Journal rendering.

Post-merge main run #106 / id `36405622065`:
- SUCCESS;
- 351 / 351 tests;
- validator 17 / 46 / 35 / 9.

Retained PASS includes schema-4 no-ref fallback, Journal ref alignment, localized Journal/lastAction stable-ref rendering, exact Forest activityResult and Lumber Hard Work regressions.

Current verdict remains:
`GREEN_CURRENT_MAIN`.


## PR58 compatibility refresh

PR58 changes localization and generic display-label consumers only. It does not edit event-choice ref persistence or Save migration.

Post-merge run #109 / id `36406510233`:
- SUCCESS;
- 356 / 356 tests;
- validator 17 / 46 / 35 / 9.

The ref-backed Journal/lastAction renderer regression and schema-4 no-ref compatibility remain PASS.

Current classification remains:
`GREEN_CURRENT_MAIN`.
