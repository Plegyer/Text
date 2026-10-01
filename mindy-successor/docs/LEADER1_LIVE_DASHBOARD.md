# Leader 1 — Live Dashboard

Status: **LIVE / MUTABLE**
Snapshot: 2026-10-01
This file is the fastest current orientation for Leader 1. Verify Git before acting.

## Project moment

The project is in **full-game production/integration after a green technical runtime baseline**.

Current main at this snapshot:
`a30272dc91cab3d5286558a189d5d816f1841db7`

Latest fully completed main workflow before the QA-evidence merge:
- `mindy-successor check` run #449 / id `36816070912` on `9d2a528951b472bc76266bf985c1d850589d3f0f`;
- SUCCESS;
- typecheck/validate/build PASS.

Current main `a30272dc...` was created by merging the Chat 4 QA disposition/acceptance evidence. Post-merge main run #459 was still in progress at this snapshot. The last verified product baseline remains **556/556 tests PASS**, validator **17 packs / 46 events / 35 actions / 9 endings** until #459 completes.

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

| Worker | Active assignment | Current Git state | Leader interpretation |
|---|---|---|---|
| Chat 1 Developer | C1D-85..96 | PR #147 open on `chat1/c1d-85-96-late-career-hard-work`; current PR head `987438954cfec9739281a512a1589cb2707095e5`; CI #451 in progress. PR body records an earlier green/frozen head `15d6ee3...`, but the branch moved afterward. | **Do not treat the old freeze as acceptance.** Chat 4 must gate the current exact head after it is green/frozen. |
| Chat 2 Presentation | C2-109..120 | PR #151 open on `chat2/presentation-c2-109-120` at `b4cd3865813b996fcbed7cf8ac952fc2d605b213`; exact-head CI #457/#458 in progress. Duplicate draft PR #152 exists on the same head. | Wait for exact-head green/freeze, then QA one canonical PR and close the duplicate. |
| Chat 3 Forest/Poverty | C3-109..120 | PR #146 open at `e750480404b1270ffbe47ca1dad2cb381bcf29d1`; exact-head CI #436 **FAILED**. | Not QA-eligible. Producer must repair/rebase/re-run before Chat 4 gate. |
| Chat 4 QA | C4-114..125 | PR #148 merged into main as `a30272dc91cab3d5286558a189d5d816f1841db7`. | Backlog disposition ledger and executable acceptance truth are now durable in main. Next QA priority is the first genuinely frozen green fresh candidate. |
| Chat 5 School | C5-109..120 | PR #150 open; current head `fc0751e48c78f260d3516258bd2c33719ab89f33`; exact-head CI #456 **FAILED**. | Not QA-eligible. Producer must repair current head and rerun exact-head CI. |

Authoritative QA context now lives in:
- `docs/tasks/CHAT4_OPEN_PR_DISPOSITION_LEDGER_2026-10-01.md`;
- `docs/tasks/CHAT4_EXECUTABLE_ACCEPTANCE_TRUTH_2026-10-01.md`.

The five current task pointers remain authoritative for queue scope.

## Open PR situation at snapshot

Current fresh-wave candidates:
- #147 — Chat 1 v9 late-career unlock / all-ten Hard Work Meta;
- #151 — Chat 2 v11 full-roster presentation;
- #146 — Chat 3 v11 Forest/poverty production promotion;
- #150 — Chat 5 v11 School production promotion.

Duplicate/current-noise:
- #152 duplicates Chat 2 #151 on the same head and should not become a second QA path.

Older backlog still open at this snapshot:
- #124, #132, #134, #136, #138, #139, #140, #142, #143, #145.

Their current QA dispositions are already recorded in the merged Chat 4 ledger. In short:
- useful/selective live predecessors: #124, #136, #139, #142, #143;
- superseded/stale as whole PRs: #132, #134, #138, #140;
- #145 is newer preparation-only evidence than old Chat 3 candidates.

Do **not** merge old long-lived branches wholesale. Use the Chat 4 ledger and current-main comparison.

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

Current default order:

1. wait for fresh candidates to become exact-head green and frozen;
2. Chat 4 gates the **current** exact head, never an earlier freeze after branch movement;
3. integrate Chat 1 v9 first if accepted, because it supplies shared late-career unlock/Hard-Work/Palace seams;
4. then integrate accepted Chat 3/Chat 5 production-content deltas;
5. integrate Chat 2 presentation after gameplay/ending identities are stable on main;
6. close duplicate/superseded PRs rather than leaving them as fake active work;
7. rerun main CI and update this dashboard;
8. issue the next wave toward **full Satyr Maid career**, then **full Undead Farm career**.

At this snapshot, #146 and #150 are red and must not enter QA acceptance; #147 and #151 are still awaiting current-head CI completion.

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
