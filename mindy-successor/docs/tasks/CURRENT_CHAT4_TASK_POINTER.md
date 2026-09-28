# Current Chat 4 task pointer

Status: ASSIGNED
Owner: Chat 4 / QA + Product Acceptance Gate
Queue: **1–12 QA gate tasks**
Role contract: `mindy-successor/docs/tasks/CHAT4_MANDATORY_ROLE_PROMPT.md`

## Current candidate set

At assignment time the following production candidate PRs are open:

### PR #63 — Foreman semantic localization
- head branch: `chat1-dev/foreman-semantic-localization-v1`
- exact head: `c47bac380febf26322f5e82cfef44c578175890f`
- base recorded by PR: `9f1ad3a40f50eb92eb7bd1ae9096018b9823563a`
- changed files: 4
- ownership: Chat 1 Developer selective integration
- expected scope: 8 Foreman RU+EN semantic labels + existing generic relationship-condition presentation wiring + regression

### PR #64 — Chat 2 additional career animation sources 352–363
- head branch: `chat2/additional-career-animation-sources-352-363-r2`
- exact head: `1d8b2a17d24fc7030aec522c12da0694770c818c`
- base recorded by PR: `9f1ad3a40f50eb92eb7bd1ae9096018b9823563a`
- changed files: 39
- ownership: Chat 2 Presentation & Media
- expected scope: 36 project-owned SVG frames, validator v5, manifest v4, handoff v11; no GIF bytes

Current `main` may move after this pointer is committed. Re-read `main` before every gate decision.

## Task 1 — current-main and PR inventory audit

Read exact current `main` and list all open PRs.

Confirm whether #63 and #64 are still open and whether either head SHA moved.

If a head moved, use the new exact head and record that fact before continuing.

## Task 2 — PR63 actual-diff scope audit

Inspect the actual PR63 changed files/diff.

Confirm that it contains only:
- reviewed Foreman localization data/fixture;
- existing presentation consumer wiring;
- focused regression coverage.

Flag unrelated gameplay, Save, RNG, content-canon, media or architecture changes.

## Task 3 — PR63 current-main collision/base-drift audit

Re-check the eight `relationship.lumber.foreman.*` keys against exact current `main`.

Confirm whether the PR's ADDITIVE/IDENTICAL/CONFLICT/SUPERSEDED classification remains correct after any Lead task-file commits or other main movement.

Do not accept stale classification solely because the PR description says it passed.

## Task 4 — PR63 presentation-invariant audit

Verify:
- stable relationship/stage/counter/fact/choice/value IDs unchanged;
- no relationship transitions/effects changed;
- no Save schema/state mutation added;
- no RNG/economy/progression/NightFlow change;
- unknown semantic IDs retain raw-ID fallback;
- no new UI surface was invented solely to consume unused keys.

## Task 5 — PR63 exact-head CI/check audit

Verify repository-required checks for the exact PR63 head.

Distinguish the repository `mindy-successor check` from unrelated Vercel deployment quota failures.

If required repository CI is not verifiably green on the exact head, report BLOCK/PENDING.

## Task 6 — PR63 product-acceptance gate

Record one result:
- PASS;
- PASS-WITH-NOTES;
- BLOCK.

Include:
- exact head SHA;
- actual changed files;
- CI state;
- any invariant concerns;
- whether Lead can safely merge/selectively integrate.

Do not merge the PR yourself unless Lead explicitly asks.

## Task 7 — PR64 asset-inventory scope audit

Inspect the actual PR64 changed files.

Confirm the claimed inventory:
- 9 source sequences;
- 4 SVG frames each;
- 36 total frame files;
- exact three assigned semantic IDs;
- validator v5;
- manifest v4;
- handoff v11.

Flag unexpected source/runtime/gameplay/localization changes.

## Task 8 — PR64 media semantic-safety audit

Verify the SVG/source package is presentation-only:
- project-owned local assets;
- no external URLs/scripts/data URLs;
- exact semantic presentation IDs;
- consistent frame metadata/viewBox per sequence;
- no reward/effect/RNG/Save/gameplay metadata;
- no GIF byte claim.

## Task 9 — PR64 manifest/validator coherence audit

Verify manifest v4 and validator v5 agree on:
- sequence keys;
- presentation IDs;
- frame ordering;
- timing;
- static fallback paths;
- 9/36 counts.

Confirm fallback paths refer to valid current presentation assets/slots.

## Task 10 — PR64 exact-head CI/check audit

Verify required repository checks for the exact PR64 head.

Do not treat Vercel free-tier deployment quota as a repository-code failure unless the project's required acceptance contract says deployment success is mandatory.

If the required GitHub Actions check is pending/failing/unknown, record it accurately.

## Task 11 — cross-PR interference and merge-order audit

Compare PR63 and PR64 against current `main` and against each other.

Determine whether their changed files or semantics overlap.

If they are independent, record that. If main has advanced, state whether either candidate needs rebase/retest before merge.

Recommend merge/retest order based on factual dependency only; do not become dispatcher for worker queues.

## Task 12 — QA gate handoff

Produce a concise QA handoff in Git under:
- `mindy-successor/docs/qa-prep/CURRENT_PR63_PR64_QA_GATE_V1.md`

It must contain:
- current main SHA;
- PR63 exact head + PASS/PASS-WITH-NOTES/BLOCK;
- PR64 exact head + PASS/PASS-WITH-NOTES/BLOCK;
- exact required CI state for each;
- cross-PR overlap result;
- concrete blockers, if any;
- whether a small QA-fix PR was necessary.

If you create any QA-fix code/test change, use a fresh branch from current `main` and open a focused PR. Otherwise the QA handoff commit itself is a Lead checkpoint, not a production deliverable PR.
