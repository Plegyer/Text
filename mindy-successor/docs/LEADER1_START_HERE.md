# Leader 1 — Start Here

## TAKEOVER CHECKPOINT — 2026-10-02

For the current handoff, read immediately after this file:
- `LEADER1_HANDOFF_CHECKPOINT_2026-10-02.md`

Final successor checkpoint: use the newest `FINAL SUCCESSOR HANDOFF` block inside that file.

Older checkpoints remain historical evidence only. Re-query Git after reading the new checkpoint because worker heads may have moved.

## Exact-head delivery rule

A green workflow or QA verdict applies only to the exact PR head SHA it tested. If a producer branch moves afterward, old green/QA evidence is historical until the new head gets its own full CI and required QA gate.

Workers may continue on a **new stacked branch** while a predecessor candidate is frozen; they must never move the frozen candidate merely to start the next queue.


Status: **MANDATORY LEADER ENTRYPOINT**
Updated: 2026-10-01
Repository: `Plegyer/Text`

This file exists so a replacement Leader 1 can recover the project in minutes without relying on old chat history.

## 1. Thirty-second orientation

White Squirrel Chronicles is **past the architecture/prototype phase**.

The repository contains a runnable, tested TypeScript/HTML/CSS/Electron life-sim runtime with Save/Meta, migrations, deterministic event resolution, NightFlow, School, ordinary poverty/housing, Activity, endings, RU/EN localization and presentation/media pools.

The current project phase is **full-game production and integration**:

- preserve the green runtime;
- turn already-designed careers/content into naturally reachable production gameplay;
- complete all ordinary careers and their outcomes;
- complete School/Forest/items/poverty depth;
- implement Secret Debt and Palace;
- prove natural full-run/NG+ paths;
- leave only GIF/art replacement as the final production backlog.

Lumber is the reference career, not the intended scope of the game.

## 2. Mandatory takeover read order

A new Leader 1 reads, in this order:

1. `docs/LEADER1_START_HERE.md` — this durable operating model.
2. `docs/LEADER1_HANDOFF_CHECKPOINT_2026-10-02.md` — newest takeover snapshot and first unfinished Lead action.
3. `docs/LEADER1_LIVE_DASHBOARD.md` — last known live Git/project snapshot.
4. `docs/LEAD1_CURRENT_STATE_v1.md` — audited product state and main gaps.
5. `docs/USER_DECISIONS_LOCKED_v1.md` — decisions that must not be reopened silently.
6. `docs/EXECUTABLE_TZ_v1.md` — implementation master spec.
7. `docs/tasks/ACTIVE_TEAM_OWNERSHIP_MATRIX.md`.
8. All five `docs/tasks/CURRENT_CHAT*_TASK_POINTER.md` files.
9. Actual current Git state: main HEAD, open PRs, active branch heads and latest workflow results.

**Git beats prose whenever they disagree.**

Do not begin by rereading all historical handoffs or reverse-engineering notes. Read them only when the active task needs their evidence.

## 3. What Leader 1 owns

Leader 1 is the only project coordinator and integration-order owner.

Leader 1 must:

- know the actual current `main` and latest green CI;
- keep the full intended game scope visible;
- keep worker ownership non-overlapping;
- keep workers supplied with useful work instead of filler;
- inspect Git before accepting verbal completion;
- classify old/open PRs instead of blindly merging branch history;
- integrate only reviewed deltas onto current main;
- protect locked invariants and Save compatibility;
- keep current state/dashboard/pointers synchronized after meaningful milestones;
- drive the project toward the product definition of done below.

Leader 1 should **not** spend time producing status documents instead of implementation. These recovery files are infrastructure so future leadership can act immediately.

## 4. Stable worker roles

### Chat 1 — Developer / Integration
Owns shared runtime/UI integration, career/runtime implementation assigned by Lead, migrations and cross-domain integration regressions.

### Chat 2 — Presentation & Media
Owns semantic presentation IDs, media pools, fallbacks, RU/EN presentation metadata and accessibility. It does not own gameplay mechanics.

### Chat 3 — Forest + Poverty Content
Owns Forest/Expedition and ordinary-poverty player-facing content bundles, localization and content-side regressions. It does not own shared runtime.

### Chat 4 — QA + Product Acceptance
Owns exact-head PR/CI gates, scope/collision review and executable acceptance truth. It does not implement production fixes.

### Chat 5 — School + Text Localization
Owns School player-facing authored content/localization and content-side tests. It does not invent shared runtime, curriculum mechanics or unresolved Product decisions.

One file/slice has one active owner.

## 4A. Pipeline / no-idle operating rule

Use a **pipeline**, not a stop-the-world wave.

The worker roles above stay stable, but task queues advance independently. Do **not** wait for every worker to become idle before assigning the next safe scope.

Default model:
- publish one small immutable career/runtime authority contract for the current wave;
- producer siblings (runtime, presentation, authored content, School) should branch from the same frozen product base whenever practical, rather than stacking on one another;
- a worker that freezes an exact-head candidate immediately moves to the next non-conflicting queue on a new branch; it does not wait for QA, Lead integration, or sibling completion;
- Chat 4 gates each frozen/green sibling independently as it becomes eligible;
- Lead integrates the QA-accepted current wave while workers are already producing the next wave;
- the next wave may do contract-independent inventory/copy/preparation before its runtime contract freezes, but must not invent IDs, thresholds, mechanics, rewards, or lore to guess missing authority;
- coordination pointers/queues belong on `main`; avoid contaminating producer candidate branches with Leader-only coordination commits;
- only Lead performs the collision-safe union onto current main, followed by exact-main QA.

A healthy steady state therefore looks like:

`Lead integrates career N` while `Chats 1/2/3/5 produce career N+1`, and `Chat 4 gates frozen candidates from either wave as they become eligible`.

Reassign **tasks incrementally when a lane becomes free**. Do not reshuffle stable worker roles merely because one candidate is waiting on CI/QA. Waiting on one sibling must not idle unrelated lanes.

## 5. How to recover after a Leader context loss

Before changing anything:

1. Read the live dashboard.
2. Fetch current main HEAD.
3. Check latest main workflow result and test/catalog counts.
4. List open PRs.
5. Inspect the head/date/last commit of each currently assigned worker branch.
6. Read all five current task pointers.
7. Compare the above with the dashboard.
8. If Git moved, update the dashboard before making coordination decisions.
9. Identify:
   - candidates ready for QA;
   - QA-accepted deltas ready for integration;
   - stale/superseded PRs;
   - blocked workers;
   - workers with empty queues.
10. Continue the current critical path; do not invent a new roadmap unless the existing product target became invalid.

A worker saying "done" is not sufficient. Delivery states are:
`branch -> candidate PR/frozen head -> QA accepted -> merged main`.

## 6. Current product target

The intended final state before GIF-only polish is:

- all 10 ordinary careers naturally unlock and are playable as complete career lives;
- Palace is a playable hidden/meta career after the required ordinary-career Meta progress;
- Secret Debt is a playable separate hidden/forced route;
- School has functioning progression depth, not just stat-buy buttons;
- Forest/Activity has the required meaningful route/challenge/season depth;
- items/capabilities have natural acquisition paths and change available actions;
- Night, poverty, relationships, careers, School and Activity feed one another;
- endings can become eligible without forcing immediate run termination;
- ending commit/completion and Meta rewards are exactly-once;
- 160-day runs and NG+ are naturally playable without state injection;
- RU/EN, Save/reload, accessibility and Windows packaging are verified;
- every missing visual has a stable presentation identity plus usable static/text fallback.

Only after that state is true may the remaining backlog be described as "GIF animations remain."

## 7. Critical-path philosophy

Prioritize **playable missing systems/content**, not another layer of planning.

Default order unless Git proves a different dependency:

1. close shared runtime gaps needed by multiple careers;
2. make prepared content genuinely player-reachable;
3. complete Satyr Maid, then Undead Farm as full starter careers;
4. complete the seven later ordinary careers;
5. finish School/Forest/item acquisition loops;
6. implement Secret Debt;
7. implement Palace after 10/10 ordinary progress is naturally possible;
8. run natural long-run/NG+/packaging acceptance;
9. finish remaining GIF/media assets.

Architecture that is already green is reopened only for a demonstrated implementation blocker or defect.

## 8. Invariants to protect

At minimum, never silently change these currently locked rules:

- exactly three Day-1 ordinary careers: Lumber, Satyr Maid, Undead Farm;
- 10 ordinary careers total;
- Palace is outside those 10 and depends on all 10 ordinary Hard Work achievements;
- Secret Debt is separate and does not count toward Palace 10/10;
- Palace True Ending requires all 12 progression stats strictly above 90%, victory over the Prince, returns the heroine to her original world, and unlocks an optional x2-to-all-12-progression-stats New Game+ reward; Lust is separate and excluded from the >90 check;
- 160-day run: 4 years × 40 days;
- 3 baseline daily Energy;
- Lumber Hard Work eligibility is **only** `completed_shifts >= 50`;
- Lumber Hard Work reward ID is `hardWork:lumber`;
- Forest -> Lumber continuation uses exact `activityResult`;
- ending eligibility is non-terminal; explicit commit remains separate;
- RU/EN language is presentation-only and must not fork gameplay/Save/RNG;
- media candidate selection is presentation-only and must not consume gameplay RNG;
- prepared fixtures/docs do not count as shipped player-facing content.

For any other exact number or Product choice, consult the authority documents rather than extrapolating.

## 9. Integration rules

When a worker candidate arrives:

- compare it against **current main**, not its old base;
- inspect changed files and ownership;
- require exact-head CI for code/content integration;
- use Chat 4 for independent QA acceptance;
- selectively integrate useful current deltas if the branch contains stale history;
- never merge a long-lived worker branch merely because its PR is green;
- rerun main CI after merge;
- then update the live dashboard and affected task pointer.

Old open PRs are not automatically technical debt to merge. They may be historical/superseded evidence.

## 10. Maintaining leadership continuity

Update `LEADER1_LIVE_DASHBOARD.md` after any material event:

- main merge that changes product/runtime/content status;
- worker queue replacement;
- new frozen candidate;
- QA disposition of a meaningful PR;
- Product decision that changes scope/order;
- worker context reset;
- change to the first real critical-path objective.

Do not rewrite old handoff history. Put the current truth in the dashboard and current pointers.

When handing leadership to another Leader 1, the successor should be able to answer these four questions from Git in under five minutes:

1. **Where is the project now?**
2. **What is the next product-critical result?**
3. **What is each worker doing right now?**
4. **Which PR/branch/decision is blocking the next merge?**
