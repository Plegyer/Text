# Chat 1 Developer — queue v5 current-main integration handoff

Status: WORKING
Owner: Chat 1 Developer / Integration Developer
Queue: C1D-37..C1D-48
Current-main baseline: `8265a6af2bd87b9e69f0bce96e6a20a80a9e852c`
Branch: `chat1/c1d-v5-current-main-integration`

## C1D-37 — PR #97 revalidation

PR #97 remains the completed C1D-36 candidate source:
- PR: #97
- exact frozen head: `64c696459daf12f95d667df9303548eb1549b0eb`
- exact-head repository CI: run #273 / id `36585307807`, SUCCESS
- QA: C4-40 PASS for the starter-trio availability/command/UI slice at the exact frozen head
- broader C4-36 product gate remains BLOCKED only by C4-34: no approved natural School publisher for `lumber.school.management-ready`

Current-main drift since the PR #97 freeze baseline `05fa2d1084a48cab20d42f23885e19ee627d3d09`:
- current main: `8265a6af2bd87b9e69f0bce96e6a20a80a9e852c`
- ahead by 12 / behind by 0
- changed paths are coordination/task-pointer/queue documents only
- no production/runtime/content overlap with PR #97
- no rebase of frozen PR #97 is justified

Disposition:
- do not move PR #97;
- do not merge its stale branch wholesale into queue v5;
- use only the exact QA-accepted starter availability/runtime/test deltas as selective source material.

## C1D-38 — fresh current-main selective integration plan

Fresh queue-v5 branch starts from current main, not from PR #97.

Selective PR #97 source to reapply:
- `src/core/engine.ts`: central `actionAvailable()` ordinary-career availability contract;
- `src/ui/app.ts`: Work UI consumes that same helper;
- focused starter availability command/UI regressions;
- existing current-main regressions whose assertions still encode the superseded “all ten careers executable on Day 1” expectation.

Not re-imported from PR #97 solely because it existed there:
- old C1D-v4 handoff doc;
- unrelated frozen-branch history;
- any stale branch metadata;
- optional Forest entry-presentation additions that are not required for the QA-accepted C4-40 starter-lock slice.

Merged current-main behavior to preserve:
- PR #84 Lumber consolidation;
- PR #85 repaired School handoff;
- PR #89 selective Chat 2 / Chat 3 integration;
- current Save/RNG/NightFlow/ending semantics.

No late-career threshold, intermediate Lumber threshold, new School publisher, career stage, relationship state or ending is selected.

## C1D-39 — Satyr Maid content consumer inventory

QA-accepted Chat 3 source:
- PR #93 exact head `340ed61e2a7294ecf5ce20632e469caf00e386ab`
- C4-41 verdict: PASS-WITH-NOTES

Existing current runtime/UI seams that may consume approved Satyr Maid content without new gameplay identity:
1. `satyr-maid.shift` already owns exact seasonal scene IDs:
   - `spring.default`
   - `summer.default`
   - `autumn.default`
   - `winter.default`
2. Engine already stores the chosen action-scene prose in `run.lastAction.text`.
3. Result UI already renders `run.lastAction` and can resolve a localization key for the exact existing scene without adding Save fields.
4. Existing presentation IDs already cover each seasonal shift and the result surface.

Approved primary content that can be consumed:
- `satyr-maid-service-content-v1.fixture.json`
- localization key family `action.satyr-maid.shift.scene.<sceneId>.text`

Content that cannot be selected by Integration yet:
- boundary/reputation depth attachment variants from `satyr-maid-boundary-reputation-content-v1.fixture.json`, because the QA note explicitly says they add no selector and current runtime has no guest/flirt/boundary/reputation identity;
- any new recurring guest, relationship, reputation counter, Night hook or ending.

Existing unrelated runtime seam preserved:
- current `satyr-maid.shift` still contains the one-time `first-shift` career transition; later repeatability/progression semantics are not authored by this queue item.

## C1D-40 — Undead Farm content consumer inventory

QA-accepted Chat 3 source:
- PR #93 exact head `340ed61e2a7294ecf5ce20632e469caf00e386ab`
- C4-41 verdict: PASS-WITH-NOTES

Existing current runtime/UI seams that may consume approved Undead Farm content without new systems:
1. `undead-farm.shift` already owns exact seasonal scene IDs:
   - `spring.default`
   - `summer.default`
   - `autumn.default`
   - `winter.default`
2. Engine already stores the chosen action-scene prose in `run.lastAction.text`.
3. Result UI can localize that exact existing scene through the same generic multi-scene action consumer used for Satyr Maid.
4. Existing presentation IDs already cover each seasonal shift and the result surface.

Approved primary content that can be consumed:
- `undead-farm-research-agriculture-content-v1.fixture.json`
- localization key family `action.undead-farm.shift.scene.<sceneId>.text`

Content that cannot be selected by Integration yet:
- successor/external depth attachment variants from `undead-farm-successor-external-content-v1.fixture.json`, because there is no approved selector, successor/trust state, Farm anomaly world fact, Activity hook or ending;
- the global `field_preservation_kit -> preserve_specimen` capability cannot be converted into an Undead Farm research consumer because PR #93 explicitly proves that consumer is absent.

Existing unrelated runtime seam preserved:
- current `undead-farm.shift` still contains the one-time `first-shift` career transition; later repeatability/progression semantics are not invented here.

## Dependency status after C1D-40

QA-accepted and available:
- PR #88 Chat 2 starter/School presentation — C4-37 PASS;
- PR #90 Chat 5 School depth — C4-38 PASS;
- PR #93 Chat 3 starter careers/poverty — C4-41 PASS-WITH-NOTES.

Not QA-accepted at this checkpoint:
- PR #98 Chat 2 late-career presentation;
- PR #99 Chat 5 late-career School;
- PR #100 Chat 3 content-depth (still draft).

Queue rule:
- continue independent current-main tasks;
- do not consume #98/#99/#100 until Chat 4 accepts their exact heads.
