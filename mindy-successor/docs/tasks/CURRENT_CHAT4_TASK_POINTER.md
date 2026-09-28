# Current Chat 4 task pointer

Status: ASSIGNED
Owner: Chat 4 / QA + Product Acceptance Gate
Queue: **1–12 QA gate tasks**
Role contract: `mindy-successor/docs/tasks/CHAT4_MANDATORY_ROLE_PROMPT.md`
Freeze protocol: `mindy-successor/docs/tasks/CANDIDATE_QA_FREEZE_PROTOCOL.md`

## Frozen candidate set

### PR #65 — Foreman semantic localization
- producer: Chat 1 Developer
- branch: `chat1-dev/foreman-semantic-localization-v3`
- frozen exact head: `85076aa452ac624340406503b2b6ecf551c72e87`
- changed files: 4
- required workflow run: `36422933185`
- repository `mindy-successor check`: PASS
- PR #63 is CLOSED/SUPERSEDED and must not be audited as a second active candidate

### PR #64 — additional career animation sources 352–363
- producer: Chat 2
- branch: `chat2/additional-career-animation-sources-352-363-r2`
- frozen exact head: `933ee8e0789034e5a64829505a1c9f1071571109`
- changed files: 39
- required workflow run: `36422956497`
- repository `mindy-successor check`: PASS

These two heads are frozen. Do not chase later heads.

If either moves unexpectedly:
- invalidate the old exact-head result;
- mark that candidate `UNSTABLE / QA PAUSED`;
- wait for Lead/producer to declare a replacement frozen SHA;
- restart the exact-head gate once.

Unrelated role/task/coordination docs landing on `main` do not by themselves require a producer rebase.

## Task 1 — inventory and freeze confirmation

Read current `main`, PR #65 and PR #64.

Confirm:
- #65 is still open at `85076aa452ac624340406503b2b6ecf551c72e87`;
- #64 is still open at `933ee8e0789034e5a64829505a1c9f1071571109`;
- #63 remains closed.

If either active head moved, pause that PR rather than following successive revisions.

## Task 2 — PR65 actual-diff scope audit

Inspect the actual PR65 diff.

Confirm it contains only:
- reviewed Foreman semantic RU+EN localization;
- the existing generic relationship-condition presentation wiring;
- focused regression/fixture coverage.

Flag unrelated gameplay, Save, RNG, content-canon, media or architecture changes.

## Task 3 — PR65 current-main collision/base-drift audit

Re-check the eight `relationship.lumber.foreman.*` keys against exact current `main`.

Confirm ADDITIVE / IDENTICAL / CONFLICT / SUPERSEDED classification remains valid.

Do not demand a rebase solely for coordination-doc movement.

## Task 4 — PR65 presentation-invariant audit

Verify:
- stable relationship/stage/counter/fact/choice/value IDs unchanged;
- no relationship transitions/effects changed;
- no Save schema/state mutation added;
- no RNG/economy/progression/NightFlow change;
- unknown semantic IDs retain raw-ID fallback;
- no new UI surface was invented only to consume unused keys.

## Task 5 — PR65 exact-head CI/check audit

Verify repository-required checks on exact frozen head:
`85076aa452ac624340406503b2b6ecf551c72e87`.

Record actual workflow state, not PR prose.

## Task 6 — PR65 product-acceptance gate

Record:
- PASS;
- PASS-WITH-NOTES;
- BLOCK;
- or UNSTABLE / QA PAUSED.

Include exact frozen head, changed files, CI state, invariants and concrete blocker if any.

Do not merge.

## Task 7 — PR64 asset-inventory scope audit

Inspect exact frozen PR64 diff at:
`933ee8e0789034e5a64829505a1c9f1071571109`.

Confirm:
- 9 source sequences;
- 4 SVG frames each;
- 36 total frame files;
- exact three assigned semantic IDs;
- validator v5;
- manifest v4;
- handoff v11.

Flag unrelated runtime/gameplay/localization changes.

## Task 8 — PR64 media semantic-safety audit

Verify:
- local project-owned SVG assets only;
- no external URLs/scripts/data URLs;
- exact semantic presentation IDs;
- consistent frame metadata/viewBox;
- no reward/effect/RNG/Save/gameplay metadata;
- zero actual GIF bytes.

## Task 9 — PR64 manifest/validator coherence audit

Verify manifest v4 and validator v5 agree on:
- sequence keys;
- presentation IDs;
- frame ordering;
- timing;
- static fallbacks;
- 9/36 counts.

Confirm fallbacks point to valid current presentation assets/slots.

## Task 10 — PR64 exact-head CI/check audit

Verify required repository CI on exact frozen head:
`933ee8e0789034e5a64829505a1c9f1071571109`.

The authoritative repository workflow run recorded by Lead is:
- run `36422956497`
- `mindy-successor check`
- PASS.

Independently confirm it from Git before gating.

If a real blocker appears, return it to Chat 2. Do not edit the same media slice unless Lead explicitly transfers that narrow fix.

## Task 11 — cross-PR interference audit

Compare PR #65 and PR #64 with current `main` and with each other.

Determine whether production files/semantic ownership overlap.

QA review of another chat's PR is not duplicate implementation.

Report actual overlap only; coordination-doc drift is not material overlap.

## Task 12 — QA gate handoff

Create/update on a dedicated QA branch:
- `mindy-successor/docs/qa-prep/CURRENT_PR64_PR65_QA_GATE_V1.md`

Record:
- current main SHA;
- PR65 frozen head + gate result;
- PR64 frozen head + gate result;
- exact CI result for both;
- cross-PR overlap result;
- concrete blockers;
- whether any QA-fix ownership transfer was needed.

Do not commit QA handoff directly to `main` while the producer PRs are active unless Lead explicitly requests it.
