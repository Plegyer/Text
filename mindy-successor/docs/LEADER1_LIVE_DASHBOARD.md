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
| Chat 1 Developer | C1D-85..96 | `chat1/c1d-85-96-late-career-hard-work` @ `ddbe20a6527cea752befd530dbd29f1d4d33b019` | `C1D-94: add all-ten career availability smoke` at 2026-10-01 04:30Z | Actively deep in queue; candidate PR not yet observed at snapshot. |
| Chat 2 Presentation | C2-109..120 | `chat2/presentation-c2-109-120` @ `3a3138211859370605b8a4f841afdf36f4f686a4` | `C2-111 document late-career visible accessibility states` at 04:27Z | Queue started; early/mid progress. |
| Chat 3 Forest/Poverty | C3-109..120 | `chat3/forest-poverty-production-v11` @ `e750480404b1270ffbe47ca1dad2cb381bcf29d1` | v11 production candidate handoff at 04:30Z | Candidate PR #146 is open; ready for QA once CI/freeze evidence is confirmed. |
| Chat 4 QA | C4-114..125 | last observed legacy branch `chat4/activation-ci-gate-next` @ `92e20a6a27691707528d6c8e6a68e1cb9b852890` | no fresh post-reset commit visible at snapshot | Assigned to backlog disposition. Verify immediately whether a new branch/commits appeared after this snapshot. |
| Chat 5 School | C5-109..120 | `chat5/school-production-v11` @ `c3e12b248dec2c90196ecfad2ce27b97ee45a58b` | `C5-110-C5-115 promote reachable School RU EN text` at 04:30Z | Actively progressing; no v11 candidate PR observed yet. |

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
- #146 — Chat 3 v11 production promotion candidate.

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
