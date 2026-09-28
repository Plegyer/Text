# Current Chat 4 task pointer

Status: ASSIGNED
Owner: Chat 4 / QA + Product Acceptance Gate
Queue: **1–12 QA gate tasks**
Role contract: `mindy-successor/docs/tasks/CHAT4_MANDATORY_ROLE_PROMPT.md`
Freeze protocol: `mindy-successor/docs/tasks/CANDIDATE_QA_FREEZE_PROTOCOL.md`

## Current candidate set

At assignment time the following production candidate PRs are open:

### PR #63 — Foreman semantic localization
- head branch: `chat1-dev/foreman-semantic-localization-v1`
- assignment-time head: `c47bac380febf26322f5e82cfef44c578175890f`
- ownership: Chat 1 Developer selective integration
- expected scope: 8 Foreman RU+EN semantic labels + existing generic relationship-condition presentation wiring + regression

### PR #64 — Chat 2 additional career animation sources 352–363
- head branch: `chat2/additional-career-animation-sources-352-363-r2`
- assignment-time head: `1d8b2a17d24fc7030aec522c12da0694770c818c`
- ownership: Chat 2 Presentation & Media
- expected scope: 36 project-owned SVG frames, validator v5, manifest v4, handoff v11; no GIF bytes

The assignment-time SHA is historical once a PR moves. Always read the live PR head.

## Mandatory moving-head behavior

Do **not** continuously chase a PR whose head changes during QA.

For each PR:
1. record one exact head;
2. treat it as frozen;
3. audit that exact head;
4. if it moves unexpectedly, mark `UNSTABLE / QA PAUSED`;
5. wait for producer/Lead to declare a new frozen exact head;
6. restart the full exact-head gate only on that frozen replacement.

A producer may move the head to fix a concrete CI/QA blocker, but that invalidates the previous gate.

Unrelated role/task/docs commits on `main` do not by themselves require a producer rebase.

## Task 1 — current-main and PR inventory audit

Read exact current `main` and list all open PRs.

Confirm whether #63 and #64 are still open and record their current live head SHAs.

If a head differs from the assignment-time SHA **before** you begin its audit, use the current head and freeze it for that audit.

If it changes **after** you begin its audit, pause that PR under the moving-head rule rather than chasing it.

## Task 2 — PR63 actual-diff scope audit

Inspect the actual PR63 changed files/diff.

Confirm that it contains only:
- reviewed Foreman localization data/fixture;
- existing presentation consumer wiring;
- focused regression coverage.

Flag unrelated gameplay, Save, RNG, content-canon, media or architecture changes.

## Task 3 — PR63 current-main collision/base-drift audit

Re-check the eight `relationship.lumber.foreman.*` keys against exact current `main`.

Confirm whether the PR's ADDITIVE/IDENTICAL/CONFLICT/SUPERSEDED classification remains correct.

Do not demand a rebase merely because unrelated coordination docs landed on `main`.

## Task 4 — PR63 presentation-invariant audit

Verify:
- stable relationship/stage/counter/fact/choice/value IDs unchanged;
- no relationship transitions/effects changed;
- no Save schema/state mutation added;
- no RNG/economy/progression/NightFlow change;
- unknown semantic IDs retain raw-ID fallback;
- no new UI surface was invented solely to consume unused keys.

## Task 5 — PR63 exact-head CI/check audit

Verify repository-required checks for the exact frozen PR63 head.

Distinguish the repository `mindy-successor check` from unrelated Vercel deployment quota failures.

If required repository CI is not verifiably green on the exact head, report BLOCK/PENDING.

## Task 6 — PR63 product-acceptance gate

Record one result:
- PASS;
- PASS-WITH-NOTES;
- BLOCK;
- UNSTABLE / QA PAUSED.

Include:
- exact frozen head SHA;
- actual changed files;
- CI state;
- any invariant concerns;
- whether Lead can safely merge/selectively integrate.

Do not merge the PR yourself unless Lead explicitly asks.

## Task 7 — PR64 asset-inventory scope audit

Inspect the actual frozen PR64 changed files.

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

Verify required repository checks for the exact frozen PR64 head.

If CI fails, record the concrete blocker and return ownership to Chat 2 for a narrow fix.
Do not modify the same media slice yourself unless Lead explicitly transfers that fix.

When Chat 2 reports a new frozen head, restart Tasks 7–10 on that one head.

## Task 11 — cross-PR interference and merge-order audit

Compare PR63 and PR64 against current `main` and against each other.

Determine whether their changed files or semantics overlap.

If they are independent, record that. If current `main` has materially overlapping production changes or an actual conflict, state whether a candidate requires rebase/retest.

Do not treat coordination-only main movement as automatic rebase debt.

## Task 12 — QA gate handoff

Produce a concise QA handoff under:
- `mindy-successor/docs/qa-prep/CURRENT_PR63_PR64_QA_GATE_V1.md`

It must contain:
- current main SHA;
- PR63 frozen exact head + PASS/PASS-WITH-NOTES/BLOCK/PAUSED;
- PR64 frozen exact head + PASS/PASS-WITH-NOTES/BLOCK/PAUSED;
- exact required CI state for each;
- cross-PR overlap result;
- concrete blockers, if any;
- whether a small QA-fix PR was necessary.

Do not push this QA handoff directly to `main` while producer PRs are under active gate. Use a dedicated QA branch/checkpoint unless Lead explicitly requests a main commit.
