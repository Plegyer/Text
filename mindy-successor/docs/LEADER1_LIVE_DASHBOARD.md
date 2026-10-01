# Leader 1 — Live Dashboard

Status: **LIVE / MUTABLE**
Snapshot: 2026-10-01
This file is the fastest current orientation for Leader 1. Verify Git before acting.

## Project moment

The project is in **full-game production/integration after a green technical runtime baseline**.

Current main at this snapshot:
`a30272dc91cab3d5286558a189d5d816f1841db7`

Latest completed green main workflow before the current post-merge run:
- `mindy-successor check` run #449 / id `36816070912` on `9d2a528951b472bc76266bf985c1d850589d3f0f`;
- SUCCESS;
- typecheck/validate/build PASS;
- **556/556 tests PASS**;
- validator: **17 packs / 46 events / 35 actions / 9 endings**.

Current main post-QA merge workflow at this snapshot:
- run #459 / id `36816282846` on `a30272dc91cab3d5286558a189d5d816f1841db7`;
- **IN PROGRESS** at snapshot time.

PR #148 QA disposition/acceptance evidence is now merged into main. Current authoritative QA evidence:
- `docs/tasks/CHAT4_OPEN_PR_DISPOSITION_LEDGER_2026-10-01.md`;
- `docs/tasks/CHAT4_EXECUTABLE_ACCEPTANCE_TRUTH_2026-10-01.md`.

The runtime is not the bottleneck. The bottleneck is completing naturally reachable full-game career/content progression.

## What is already real

- playable Electron/browser runtime;
- Save/Meta/migrations;
- 160-day calendar and Energy economy;
- three starter careers available on Day 1;
- base definitions for all ten ordinary careers;
- Lumber full cross-system reference path;
- Satyr Maid and Undead Farm starter production layers;
- eight paid School courses + Night study;
- Night/lodging;
- ordinary poverty/housing;
- Forest Activity save/resume and current routes;
- endings/commit/Meta framework;
- RU/EN runtime;
- deterministic 3–5 media candidate presentation pools and static fallbacks.

## Main missing product surfaces

- late-career natural unlock runtime is being implemented;
- ordinary Hard Work/Meta coverage beyond Lumber is being implemented;
- Satyr Maid and Undead Farm still need full career lives;
- seven late careers still need full progression/outcomes;
- School needs more naturally reachable authored depth;
- Forest needs complete route/challenge/season depth and natural capability-item acquisition;
- Secret Debt is not yet a complete production hidden career;
- Palace is not yet a playable production career;
- long natural 160-day/NG+/Windows acceptance remains before GIF-only state.

## Current worker activity observed in Git

| Worker | Active assignment | Observed branch/head | Last observed progress | Leader interpretation |
|---|---|---|---|---|
| Chat 1 Developer | C1D-85..96 | `chat1/c1d-85-96-late-career-hard-work` @ `987438954cfec9739281a512a1589cb2707095e5` | `C1D-89: verify all-ten Hard Work Meta rewards` at 04:40Z; branch also contains later queue work | PR #147 is non-draft and exact-head CI run #451 is **GREEN**. It is now the first eligible fresh candidate for Chat 4 C4-124. Do not integrate before independent Chat 4 gate. |
| Chat 2 Presentation | C2-109..120 | `chat2/presentation-c2-109-120` @ `b4cd3865813b996fcbed7cf8ac952fc2d605b213` | `C2-120 prepare focused candidate handoff before exact-head CI` at 04:40Z | PR #151 is open and #152 is a duplicate/draft candidate on the same head. Exact-head CI #458 **FAILED: 554/565 pass, 11 fail**. Failures include static-vs-GIF presentation expectations and a localization consumer assertion. Chat 2 must reconcile/repair before QA; keep only one canonical candidate afterward. |
| Chat 3 Forest/Poverty | C3-109..120 | `chat3/forest-poverty-production-v11` @ `e750480404b1270ffbe47ca1dad2cb381bcf29d1` | v11 production candidate handoff at 04:30Z | PR #146 exact-head CI #436 **FAILED**: 539/568 pass, 29 fail. It is not QA-eligible and must be repaired/refreshed by Chat 3 before gating. |
| Chat 4 QA | C4-114..125 | merged evidence from `chat4/c4-123-125-qa-evidence` | PR #148 merged as `a30272dc91cab3d5286558a189d5d816f1841db7` | Backlog disposition + executable acceptance truth are now on main. C4-124 remains the live task: gate the first **green/frozen** fresh candidate; do not gate red/mutable heads. |
| Chat 5 School | C5-109..120 | `chat5/school-production-v11` @ `fc0751e48c78f260d3516258bd2c33719ab89f33` | C5-119 compatibility-only Night event gate at 04:40Z | PR #150 is open, but exact-head CI #456 **FAILED during validation** with `Недопустимая typed capability: read calendar`. Chat 5 must repair before QA. |

The task pointers remain authoritative for queue scope.

## Open PR situation at snapshot

Current open PRs include:

- #124 — old Chat 1 v6 current-main cross-domain candidate;
- #132 — old Chat 5 School v8;
- #134 — old Chat 3 Forest/poverty v8;
- #136 — old Chat 2 presentation candidate;
- #138 — Chat 3 Forest/poverty v9;
- #139 — Chat 1 v7 runtime/UI candidate;
- #140 — Chat 5 School v9;
- #142 — Chat 1 v8 regression candidate;
- #143 — Chat 5 v10 candidate;
- #145 — Chat 3 v10 candidate;
- #146 — Chat 3 v11 production promotion candidate — **red CI** at snapshot;
- #147 — Chat 1 v9 late-career unlock / all-ten Hard Work Meta candidate — **GREEN exact-head CI**, next fresh QA candidate;
- #150 — Chat 5 v11 School production candidate — **red validation** at snapshot;
- #151 — Chat 2 v11 presentation candidate — **red CI, 554/565**;
- #152 — duplicate/draft Chat 2 candidate on same head as #151.

PR #148 is no longer open: its QA ledger/acceptance truth was merged into main.

Do **not** assume this list is still complete after the snapshot.

Chat 4 completed the old-candidate classification and it is merged on main. Important result: #124/#136/#139 each contain distinct useful shared UI/localization/runtime deltas and **must not be merged independently in arbitrary order**; #132/#134/#138/#140 are superseded as whole-PR candidates; #142 is regression/selective-source; #143/#145 remain preparation/evidence, not shipped content.

Chat 4's immediate remaining responsibility is C4-124: gate the first fresh candidate that is both frozen and green.

## Current critical path

### A. Shared career runtime
Chat 1 is currently implementing the most important shared dependency:
- seven late-career derived unlocks;
- ordinary Hard Work/Meta coverage;
- Palace 10/10 unlock seam;
- save/availability/ending regressions.

This work enables natural progression across the whole ordinary roster.

### B. QA backlog
Chat 4 must prevent old frozen PRs from accumulating indefinitely. It should clear/disposition the backlog while also gating new production candidates.

### C. Production content
In parallel:
- Chat 2 supplies full-roster presentation/ending surfaces;
- Chat 3 promotes safe Forest/poverty text from prep into live production;
- Chat 5 promotes safe School material into live production.

The goal is fewer "prepared-only" assets and more actual player-facing content.

## Next Leader integration decisions

When the current worker wave finishes, the default order is:

1. use the merged Chat 4 disposition ledger to close superseded PRs and selectively integrate the distinct #124/#136/#139 deltas on current main rather than wholesale;
2. have Chat 4 gate **PR #147 first** now that its exact-head CI is green;
3. integrate Chat 1 v9 shared career runtime only if that QA gate accepts it;
4. repair then QA/integrate Chat 3 v11 and Chat 5 v11 production content;
5. QA/integrate Chat 2 v11 presentation coverage where it matches merged gameplay identities;
6. refresh main CI and this dashboard;
7. assign the next product wave toward **full Satyr Maid career** and **full Undead Farm career**, not another generic audit wave.

## First product result after this wave

The next major playable milestone should be:

**Satyr Maid — Complete Career Slice**

From a clean run, the player should be able to:
- work Satyr Maid naturally;
- progress through career stages;
- experience meaningful relationship/Night and at least one School/item/cross-system hook;
- reach Hard Work independently;
- reach at least one complex outcome;
- have multiple outcomes eligible without forced immediate termination where applicable;
- explicitly commit/complete;
- carry the correct Meta result into New Run;
- do all of this without direct state injection in the acceptance path.

Then repeat the full-career production pattern for Undead Farm.

## Definition of "do not drift"

A future Leader should resist these failure modes:

- treating green architecture as the work target instead of finishing the game;
- confusing fixtures/docs with live content;
- keeping workers busy with repetitive audits when production work is possible;
- narrowing the project to Lumber;
- inventing unresolved Product lore/numbers to unblock code;
- merging long-lived branches wholesale;
- letting old PRs accumulate without disposition;
- declaring "only GIFs remain" before all required routes/careers/endings are naturally playable.

## First actions for the next Leader 1

On takeover:

1. verify current `main` and latest main CI;
2. list open PRs;
3. inspect the five active worker branch heads;
4. read the five current pointers;
5. compare with this dashboard;
6. update stale rows;
7. identify the next candidate needing Chat 4 or Lead integration;
8. continue the critical path above.

If those eight steps are done, no previous chat transcript is required to lead the project.
