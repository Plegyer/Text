# Current Main CI and Regression Floor Audit v2

Status: QA / CI evidence
Queue item: Chat 4 item 149
Observed on: 2026-09-27

## Current main

Current `main` SHA:

`23a8798f77c42e84a7540d71fdffd69d9db9fbfd`

Commit message:

`Handoff: record PR43 Forest bilingual production`

## Latest successful current-main workflow

Workflow: `mindy-successor check`

Run number: **56**

Run ID: **36319433141**

Trigger: `push`

Head SHA: `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`

Status: `completed`

Conclusion: **success**

Run URL:

`https://github.com/Plegyer/Text/actions/runs/36319433141`

Created: `2026-09-27T12:34:21Z`

Completed: `2026-09-27T12:35:27Z`

The run has one `check` job and its `Full check` step completed successfully.

## Exact current-main log evidence

The Full check log shows:

`npm run typecheck && npm run validate && npm run build && npm test`

Validator output:

`Content OK: 17 packs, 46 events, 35 actions, 9 endings.`

Build output:

`Built renderer, content catalog and desktop save validator.`

Node test summary:

- tests: **299**
- pass: **299**
- fail: **0**

Therefore the live current-main regression floor is:

**GREEN — 299/299; 17 packs; 46 events; 35 actions; 9 endings.**

These values are taken from the current-main workflow log, not copied forward from an older QA snapshot.

## PR43 exact-head corroboration

PR43 exact head:

`3dc8723deacad0967ee1667edfa32f351ab72a8f`

Workflow run number: **54**

Run ID: **36319312846**

Trigger: `pull_request`

Conclusion: **success**

Run URL:

`https://github.com/Plegyer/Text/actions/runs/36319312846`

Its test summary is also:

- tests: **299**
- pass: **299**
- fail: **0**

PR43 merge SHA is `326c7d495720147f17b40056369987f515363899`. The subsequent current-main run #56 confirms the same floor after the handoff commit at `23a8798…`.

## Recent baseline sequence

For reference, live Actions also shows:

- PR41 head `6890aaa85dbe5a545219e8200560d307dce8f35d`: successful PR run #45;
- PR41 merge `974d6e077ffc511e304a64aef32f2aab81167f41`: successful push run #46;
- PR42 head `41ebf0377c5b50b2ef298009562d5ba9fde56f18`: successful PR run #49;
- PR42 merge `55adc69dcda4c41c71548cd146756896fa5976d0`: successful push run #50;
- PR43 head `3dc8723…`: successful PR run #54;
- PR43 merge `326c7d4…`: successful push run #55;
- current handoff main `23a8798…`: successful push run #56.

Failed intermediate PR runs exist in history, so a generic statement that “CI was green sometime during the PR” is insufficient. Acceptance must bind to the exact reviewed head.

## Minimum CI evidence before next content integration merge

For the next Lead integration PR require all of the following:

1. branch created fresh from the then-current main;
2. exact reviewed PR head SHA recorded;
3. `mindy-successor check` completed successfully on that exact head;
4. `Full check` step green;
5. typecheck green;
6. validator green with explicit pack/event/action/ending counts recorded from the log;
7. build green;
8. test summary recorded with zero failures;
9. domain-specific new tests included for the selected integration;
10. no worker-branch CI substituted for integration-head CI.

After merge require:

1. exact merge/current-main SHA recorded;
2. successful push workflow on that main SHA;
3. same Full check components green;
4. no reduction in tests or validation counts unless the PR intentionally removes covered production content and the removal is separately reviewed.

## Regression floor for queued integrations

At this audit baseline, a normal additive localization/content integration should not regress below:

- **299 passing tests**;
- **17 valid root packs**;
- **46 events**;
- **35 actions**;
- **9 endings**.

Counts may legitimately rise. Any count decrease is a blocking investigation item, not an automatic acceptance.

For pure presentation/localization additions that do not add a root pack/event/action/ending, the validator counts should remain exactly `17 / 46 / 35 / 9`.

## Domain-specific mandatory checks

School localization selective integration must add UI consumption/RU↔EN invariance proof without changing School mechanics.

Ordinary-poverty localization selective integration must prove all 14 PR37 event IDs resolve RU+EN and preserve natural-path state.

Any real-GIF integration must prove 3–5 real repo GIFs, build/distribution presence, static fallback and locale-invariant deterministic candidate selection.

Forest regression must retain exact `activityResult` continuation and PR43 bilingual tests.

Lumber regression must retain Hard Work eligibility only at `completed_shifts >= 50` and reward `hardWork:lumber`.

## Verdict

**CURRENT_MAIN_CI_GREEN**.

The next integration may use `23a8798…` / run #56 as the verified starting floor only while that SHA remains the current main. If main advances, this document becomes a historical baseline and the new main must be rechecked rather than inheriting these numbers by prose.
