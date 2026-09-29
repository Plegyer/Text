# Chat 1 Developer — C1D v4 current-main starter integration handoff

Status: WORKING
Owner: Chat 1 Developer / Integration Developer
Queue: C1D-25..C1D-36
Fresh baseline: `05fa2d1084a48cab20d42f23885e19ee627d3d09`
Fresh branch: `chat1/c1d-v4-starter-current-main`

Historical selective source only:
- closed/superseded PR #96 / `chat1/starter-trio-availability-c1d25-36`.
- Current pointer explicitly forbids merging that stale worker branch wholesale.
- C1D-25..29 and C1D-31..34 are recorded as completed on the worker handoff; this branch reapplies only still-needed runtime/test deltas required by C1D-35.

## C1D-30 — repaired School handoff revalidation

Current main already contains merged repaired PR #85 at accepted worker head `35c42c04a59a1c58d54d1bf0d331c7e734883318`.

Exact current-main evidence:
- `content/school-to-career-handoff-v1.fixture.json` is present.
- Existing management source identities remain:
  - `school.course.literacy_and_numbers`
  - `school.track.literacy_and_numbers`
  - existing consumer transport key `lumber.school.management-ready`
  - existing Lumber consumer `lumber-cross.school-management-return`
- The accepted fixture leaves all of the following explicitly unresolved/null:
  - provider type
  - threshold or named milestone
  - School publisher event
  - publication timing
  - transport-key canonicality
- `tests/school-natural-path-lumber-v1.test.ts` on current main proves:
  - a real Literacy & Numbers lesson increments School progress;
  - it does **not** publish `lumber.school.management-ready`;
  - it does **not** produce downstream Lumber management/Forewoman facts;
  - the existing Lumber consumer works only after explicitly test-only public-boundary injection.

C1D-30 disposition:
- selective integration is a **current-main no-op**;
- all accepted handoff/negative-boundary evidence is already merged;
- there is no approved production School publisher/runtime seam to add;
- no course, provider, milestone, threshold, publication rule, or transport identity is invented here.

## C1D-35 — fresh current-main candidate composition

Selective reapplication from the stale worker branch:

Production runtime/UI:
- `src/core/engine.ts`
  - `starterCareerIds = lumber / satyr-maid / undead-farm`;
  - one central `actionAvailable()` contract;
  - non-starter ordinary career shifts with zero authored conditions are unavailable;
  - once approved action conditions are authored, the existing condition evaluator is the unlock seam.
- `src/ui/app.ts`
  - Work buttons consume the same `actionAvailable()` helper;
  - no duplicate starter/late-career thresholds exist in UI;
  - approved Forest entry content is rendered from existing `lumber.forest` Activity route state.
- `content/localization.json`
  - only the three QA-approved Chat 3 Forest entry handoff strings are promoted:
    - `presentation.activity.forest.entry.default.text`
    - `presentation.activity.forest.entry.logging-road.text`
    - `presentation.activity.forest.entry.old-boundary.text`

Focused regressions:
- `tests/starter-trio-availability.test.ts`
- `tests/starter-trio-availability-ui.test.ts`
- `tests/forest-entry-consumer.test.ts`

No production definitions, career stages, career transitions, endings, School packs, Forest mechanics, Save schema, RNG, NightFlow, media registry, or asset bytes are changed.

## Already integrated dependencies

- repaired Chat 5 PR #85: merged on current main; C1D-30 verified as handoff-only/no approved publisher;
- repaired Chat 3 PR #82: QA-accepted and selectively integrated through Lead PR #89;
- Chat 2 PR #79: QA-accepted and selectively integrated through Lead PR #89;
- prior Chat 1 PR #84: merged.

No historical candidate branch is re-imported wholesale.

## Open product decisions preserved

- all late ordinary-career stat/calendar/year unlock values remain OPEN;
- intermediate Lumber progression thresholds remain OPEN;
- natural School management publisher/provider/milestone/threshold remain OPEN;
- Satyr Maid and Undead Farm post-first-stage progression remains unapproved;
- the previously inventoried Satyr Maid / Undead Farm repeatability seam remains an explicit future integration issue and is not silently redesigned here.

## C1D-35 / C1D-36 gate

C1D-35 is complete only after full repository CI is green on the exact PR head.

C1D-36 requires:
- one focused non-draft candidate PR;
- exact green head frozen under `CANDIDATE_QA_FREEZE_PROTOCOL.md`;
- exact files/checks/open decisions recorded in Git;
- no movement of the frozen head except for a concrete CI/QA blocker or explicit Lead request.
