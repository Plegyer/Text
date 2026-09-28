# Current Chat 4 task pointer

Status: ASSIGNED
Owner: Chat 4 / QA + Product Acceptance Gate
Queue: **13–24**
Queue size: **12**
Role contract: `mindy-successor/docs/tasks/CHAT4_MANDATORY_ROLE_PROMPT.md`
Ownership matrix: `mindy-successor/docs/tasks/ACTIVE_TEAM_OWNERSHIP_MATRIX.md`
Freeze protocol: `mindy-successor/docs/tasks/CANDIDATE_QA_FREEZE_PROTOCOL.md`

## Baseline

Lead has merged:
- PR #64 — Chat 2 career animation source queue 352–363;
- PR #65 — Foreman semantic localization;
- PR #66 — Chat 5 School residual localization handoff.

This queue is a **post-merge current-main acceptance sweep** plus readiness for the next candidate wave.

Do not re-open or re-audit superseded PR #63 as an active candidate.

## 13 — exact current-main merge provenance audit

Read current `main` and record exact merge SHAs for #64/#65/#66.

Verify all three are actually ancestors of current `main`.

## 14 — current-main workflow/CI audit

Verify latest repository `mindy-successor check` state for current `main` after the three merges.

If current-main CI is missing/pending/failing, record exact status.

## 15 — merged Chat 2 source integrity audit

Verify the merged #64 source package still contains:
- 9 sequences;
- 36 frames;
- manifest v4;
- validator v5;
- handoff v11;
- zero GIF bytes;
- no production activation.

## 16 — merged Foreman semantic acceptance audit

Verify current `main` contains the intended eight Foreman semantic keys and existing generic relationship-condition localization wiring.

Recheck raw-ID fallbacks and no mechanics/Save/RNG change.

## 17 — merged School handoff acceptance audit

Verify #66 is present as worker handoff/data/docs/test material only and has not silently changed production School localization/runtime.

Record the exact four proposed residual accessibility keys for the Developer queue.

## 18 — cross-slice ownership/collision audit

Check merged #64/#65/#66 plus active new pointers for:
- duplicate production ownership;
- changed-file collisions;
- semantic namespace collision.

Expected active boundaries:
- Chat 2 media-source staging;
- Chat 3 poverty/Forest content;
- Chat 5 School teacher staging;
- Chat 1 Developer School residual production integration.

## 19 — localization root consistency audit

Check current root localization after #65 and before the new Developer School patch:
- Foreman keys present;
- School residual four keys still at pre-patch current values;
- no duplicate/invalid locale entries introduced by merged worker handoffs.

## 20 — presentation fallback audit

Verify:
- current production presentation slots retain valid static fallbacks;
- merged Chat 2 source-only frames are not accidentally active;
- School authored/staging identities are not accidentally promoted.

## 21 — invariant smoke audit

Run/review focused current-main regressions for:
- Save identity;
- RNG invariance;
- locale presentation-only behavior;
- Journal stable refs where relevant;
- NightFlow unchanged.

Do not invent new gameplay tests outside current contracts.

## 22 — stale candidate/branch cleanup inventory

Create:
- `mindy-successor/docs/qa-prep/POST_MERGE_STALE_CANDIDATE_INVENTORY_V1.md`

Classify superseded/merged worker branches and closed PRs as:
- SAFE_TO_DELETE_BRANCH;
- KEEP_FOR_ACTIVE_WORK;
- KEEP_FOR_UNMERGED_HANDOFF;
- NEEDS_LEAD_REVIEW.

Do not delete branches yourself.

## 23 — next-wave preflight audit

Read all active task pointers and `ACTIVE_TEAM_OWNERSHIP_MATRIX.md`.

Verify the next queues do not duplicate one production slice:
- Chat 2 364–375;
- Chat 3 341–352;
- Chat 5 205–216;
- Chat 1 Developer 13–24.

Report only concrete overlap/blockers.

## 24 — post-merge QA handoff

Create on a dedicated QA branch:
- `mindy-successor/docs/qa-prep/POST_PR64_PR65_PR66_CURRENT_MAIN_QA_V1.md`

Include:
- exact current main SHA;
- current-main CI state;
- #64/#65/#66 post-merge acceptance;
- ownership/collision result;
- stale branch cleanup candidates;
- next-wave preflight result;
- any blocker requiring Lead action.

Open a focused QA PR only if the handoff itself is worth review; otherwise report exact branch/commit checkpoint to Lead.
