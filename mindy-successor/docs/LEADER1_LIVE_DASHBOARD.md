# Leader 1 — Live Dashboard

Status: **LIVE / MUTABLE**
Snapshot: 2026-10-01
This file is the fastest current orientation for Leader 1. Verify Git before acting.

## Project moment

The project is in **full-game production/integration after a green technical runtime baseline**.

Current main at this snapshot:
`6f0e8803ea327b55c5079afb137b5aa016f614ec`

Latest main workflow:
- `mindy-successor check` run #435 / id `36814269258`;
- SUCCESS;
- typecheck/validate/build PASS;
- **556/556 tests PASS**;
- validator: **17 packs / 46 events / 35 actions / 9 endings**.

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
| Chat 1 Developer | C1D-85..96 | `chat1/c1d-85-96-late-career-hard-work` @ `8257571da18d24009f23d4e342dd494398536fbc` | `C1D-95: add Hard Work and Palace Meta smoke` at 2026-10-01 04:31Z | Candidate PR #147 is open as a draft on this exact observed head; verify exact-head CI/freeze and Chat 4 disposition before integration. |
| Chat 2 Presentation | C2-109..120 | `chat2/presentation-c2-109-120` @ `89b33daa9378b8591e31309234edfcc3f8a95cb9` | `C2-114 bind Hard Work ending accessibility keys` at 04:34Z | Active mid-queue progress. |
| Chat 3 Forest/Poverty | C3-109..120 | `chat3/forest-poverty-production-v11` @ `e750480404b1270ffbe47ca1dad2cb381bcf29d1` | v11 production candidate handoff at 04:30Z | Candidate PR #146 is open; ready for QA once CI/freeze evidence is confirmed. |
| Chat 4 QA | C4-114..125 | `chat4/c4-123-125-qa-evidence` @ `cdf3ccea0bb2045e325cd324adc6a042cde97848` | PR #148 `QA disposition ledger and acceptance evidence` observed at 04:35Z | QA work is now visible in Git; inspect PR #148 for the latest backlog dispositions/acceptance truth. |
| Chat 5 School | C5-109..120 | `chat5/school-production-v11` @ `54f1267d4d283d1af55822335a8fbf41d14282a9` | `Document SCHOOL_PRODUCTION_V11_MANIFEST_HANDOFF` at 04:34Z | Deep in queue / handoff material present; verify whether candidate freeze/PR has appeared. |

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
- #146 — Chat 3 v11 production promotion candidate;
- #147 — Chat 1 v9 late-career unlock / all-ten Hard Work Meta candidate (draft at snapshot);
- #148 — Chat 4 QA disposition ledger / acceptance evidence.

Do **not** assume this list is still complete after the snapshot.

Chat 4's immediate responsibility is to classify old candidates against current main as:
- useful current delta;
- selective source / partially superseded;
- fully superseded/stale.

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

1. get Chat 4 disposition for old PRs and close/merge/selectively integrate them;
2. QA and integrate Chat 1 v9 shared career runtime;
3. QA/integrate Chat 3 v11 production content;
4. QA/integrate safe Chat 5 v11 School production content;
5. integrate Chat 2 v11 presentation coverage where it matches merged gameplay identities;
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
