# Leader 1 — Start Here

## MANDATORY FIRST STEP — KNOWLEDGE LIBRARY (2026-10-08)

> **Read [LEADER1_KNOWLEDGE_LIBRARY_CURRENT.md](LEADER1_KNOWLEDGE_LIBRARY_CURRENT.md) fully before using any of the historical sections below.** This is the single current cumulative knowledge library, not the 2026-10-01/02 checkpoints. Then inspect `docs/tasks/CURRENT_LEADER1_CHECKPOINT.md`, `LEADER_STATE.md`, live GitHub main/CI/PRs and current worker pointers.

**Current corrected truth:** Stage1–5 integration CLOSED; engine/platform functionally implemented, including all ten ordinary careers, Palace, Secret Debt, School/Night, and **four** target D36 Activity regions. **Public full 1.0 NOT complete.** Next work = whole game product finishing, player journeys, story/lore, visual UX and Windows installer. Do not re-open core architecture or repeat implemented production from obsolete baselines. No worker may restart archived tasks just because old paragraphs below say "now".

**Continuity requirement:** on every major merge/decision/context handoff, reconcile live evidence against the canonical knowledge library and update **that file in place**, plus checkpoint/worker pointers. Git CI facts and user-locked decisions outrank operational prose. Only manually activated chats perform new assignments.

---


## TEAM TOPOLOGY RESET — 2026-10-02

This block supersedes the older Chat 1..5 specialization model below.

Active topology:
- **Leader 1** is the sole project coordinator, scope owner, final QA authority and merge-order owner. Leader 1 is not a worker lane.
- **Worker Chat 1 is retired.** Do not create new Chat 1 assignments, branches or queues. Historical Chat 1 branches/PRs/files remain evidence only.
- **Chat 2 = Integration / Assembly + Technical QA.** It reviews exact-head candidates, detects collisions/base drift, prepares current-main integration branches when needed, performs narrow integration fixes, and hands merge-ready evidence to Leader 1. It does not originate a full career unless Leader explicitly reassigns it.
- **Chats 3, 4, 5 and 6 = four independent Full-Career Producer lanes.** Each owns exactly one Lead-assigned profession at a time, end-to-end inside that profession: career-specific runtime/data, authored events/text, presentation/localization, School/Night/cross-system hooks, focused tests and natural acceptance.
- A producer may touch shared registry files only for its assigned profession. Any framework-wide/shared semantic change requires Leader approval and usually Chat 2 integration ownership.
- Producer chats never merge to main. Chat 2 prepares/QA-checks; Leader 1 decides final acceptance and merge.
- New Chats 2..6 start from current main and from their current role prompt + task pointer. Old chat transcripts and old specialization prompts are historical only.

Reset rule:
- the previously assigned but not-started Palace queues are superseded by this topology reset;
- their branches are preserved and must not be deleted or repurposed;
- existing frozen/valuable product candidates remain valid artifacts and are not discarded merely because worker roles changed;
- Artist #229/#237 exact heads already have executable self-hosted SUCCESS and transfer to new Chat 2 as the first technical-QA/integration package.

CI rule for the reset:
- GitHub remains source of truth;
- self-hosted Windows runners are replaceable compute hosts, not project identity;
- runner machine names such as SOLV/SOLV2 are operational details, while workflow labels `self-hosted, Windows, X64` are the durable contract;
- coordination-only docs/pointers do not run the full product CI.

## TAKEOVER CHECKPOINT — 2026-10-02

For the current handoff, read immediately after this file:
- `LEADER1_HANDOFF_CHECKPOINT_2026-10-02.md`

Final successor checkpoint: use the newest `FINAL SUCCESSOR HANDOFF` block inside that file.

Older checkpoints remain historical evidence only. Re-query Git after reading the new checkpoint because worker heads may have moved.

## Exact-head delivery rule

A green workflow or QA verdict applies only to the exact PR head SHA it tested. If a producer branch moves afterward, old green/QA evidence is historical until the new head gets its own full CI and required QA gate.

Workers may continue on a **new stacked branch** while a predecessor candidate is frozen; they must never move the frozen candidate merely to start the next queue.


## Self-hosted CI / cost-control operating model — 2026-10-02

GitHub remains the **source of truth** for branches, PRs, exact SHAs, comments, workflow state and merge history. The repository now also has a private Windows self-hosted runner(s) with labels `self-hosted`, `Windows`, `X64`.

Operating rule:
- use GitHub for coordination, diffs, PR/branch state, QA ledgers and integration decisions exactly as before;
- use the connected self-hosted Windows runner only as compute for executable Actions jobs;
- a self-hosted SUCCESS is valid CI evidence when the workflow actually executes on the required exact candidate head;
- `steps=null` / no runner / no logs remains infrastructure evidence, never a code verdict;
- do not mutate frozen producer heads merely to create a CI event;
- old workflow reruns preserve the workflow definition from that historical run, so a historical `ubuntu-latest` run does **not** become self-hosted merely because main changed later;
- for legacy frozen heads, use a collision-free validation base/PR or another mechanism that preserves the exact producer head while executing the current self-hosted workflow;
- keep a runner window open only when executable CI is wanted; GitHub coordination work continues while `SOLV` is offline.

Cost/time control:
- full CI should trigger only for changes under the real executable prototype tree `mindy-successor/prior-work/astra/prototype-m3.2/**` or for the workflow file itself;
- Leader dashboards, handoffs, task pointers and other coordination-only Markdown outside that prototype tree must not launch a full six-minute product check;
- concurrency cancels an older in-progress run for the same PR/ref when a newer head supersedes it;
- one connected self-hosted runner means jobs execute serially; this is expected and is not evidence that the PC is slow.

Verified recovery evidence on 2026-10-02:
- main `53b80a10aa017761390d2060a00ebd95a2213314`, run #1084 attempt 2: executable self-hosted **SUCCESS**;
- Artist authored exact head `75664819e824187ea23531e39f6cf5cd952b1047`, validation run #1085 / `37005612313`: executable **SUCCESS**;
- Artist presentation exact head `ef9cc2df1edaf428ed44c34ba9832ff3a88032b4`, validation run #1086 / `37005617406`: executable **SUCCESS**.



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
8. All five current worker pointers: `CURRENT_CHAT2_TASK_POINTER.md` through `CURRENT_CHAT6_TASK_POINTER.md`.
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

### Chat 2 — Integration / Assembly + Technical QA
Owns exact-head technical QA, collision/base-drift review, selective assembly onto current main, narrow integration repairs and merge-ready evidence. Leader 1 remains final acceptance and merge authority.

### Chat 3 — Full-Career Producer A
Owns one Lead-assigned profession end-to-end until frozen candidate delivery.

### Chat 4 — Full-Career Producer B
Owns one Lead-assigned profession end-to-end until frozen candidate delivery.

### Chat 5 — Full-Career Producer C
Owns one Lead-assigned profession end-to-end until frozen candidate delivery.

### Chat 6 — Full-Career Producer D
Owns one Lead-assigned profession end-to-end until frozen candidate delivery.

Worker Chat 1 is retired. Historical Chat 1 material is evidence only.

One profession has one active producer owner. Shared-framework changes are not producer-owned unless Leader explicitly transfers them.

## 4A. Pipeline / no-idle operating rule

Default production flow:
- Leader 1 assigns one whole profession to each free producer lane among Chats 3..6;
- each producer branches from fresh current main and works without opening a PR until the candidate is actually ready, unless Lead explicitly requests early review;
- candidate delivery is one focused PR with a frozen exact head;
- exact-head executable CI runs only at candidate stage and again only after a concrete blocker fix;
- Chat 2 independently reviews the frozen candidate, checks collisions/base drift and prepares a current-main integration branch if necessary;
- Leader 1 gives final acceptance and controls merge order;
- after merge, run exact-current-main CI;
- a producer that freezes a candidate may receive the next non-conflicting profession on a new branch while Chat 2/Leader process the previous candidate.

Do not split one profession across runtime/presentation/authored/School worker chats by default. Split ownership only when Leader documents a concrete dependency reason.

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
- use Chat 2 for independent technical QA/integration review; Leader 1 retains final acceptance;
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
