# Current Chat 1 Developer task pointer

Status: ASSIGNED
Owner: Chat 1 Developer / Integration Developer
Queue: **13–24**
Queue size: **12**
Role contract: `mindy-successor/docs/tasks/CHAT1_DEVELOPER_MANDATORY_ROLE_PROMPT.md`
Ownership matrix: `mindy-successor/docs/tasks/ACTIVE_TEAM_OWNERSHIP_MATRIX.md`
Freeze protocol: `mindy-successor/docs/tasks/CANDIDATE_QA_FREEZE_PROTOCOL.md`

## Baseline

Foreman semantic localization was delivered through merged PR #65.

Next production integration slice:
**School residual accessibility localization**, using the merged Chat 5 handoff from PR #66.

Authoritative handoff:
- `mindy-successor/docs/school-prep/SCHOOL_RESIDUAL_LOCALIZATION_HANDOFF_V1.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-residual-localization-v1.fixture.json`

Expected current scope:
- exactly four existing School accessibility localization keys;
- same-key text corrections only;
- no new keys;
- no runtime/UI change required.

Start a fresh branch from exact current `main`.
Recommended:
- `chat1-dev/school-residual-accessibility-v1`

## 13 — exact-current-main School residual audit

Re-read current `main` and confirm the four handoff keys still exist in root localization and current presentation slots still consume them.

Record any main drift since Chat 5 handoff.

## 14 — exact fixture/value review

Read the merged School residual fixture and verify the four RU+EN pairs against the handoff audits.

Reject any key that no longer matches current consumer identity.

## 15 — current collision classification

Classify the four root keys on exact current `main`:
- SUPERSEDED_REPLACE;
- IDENTICAL_NOW;
- CONFLICT;
- NO_LONGER_CONSUMED.

Do not touch conflicts without Lead review.

## 16 — production root localization patch

Apply only approved same-key RU+EN replacements to:
- `mindy-successor/prior-work/astra/prototype-m3.2/content/localization.json`

No new localization namespace.

## 17 — presentation-slot consumer verification

Verify the four keys remain referenced by exact current School presentation slots and consumed through the existing media alt resolver.

No presentation path/selection edits.

## 18 — no-new-runtime proof

Document/test that this integration needs no:
- UI code change;
- localization runtime change;
- presentation schema change;
- media asset change.

## 19 — production regression adaptation

Add a focused production regression:
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-residual-localization-production-v1.test.ts`

Validate exact root values and exact current consumers.

## 20 — locale and state invariance regression

Verify RU↔EN changes only rendered accessibility text and leaves:
- School gameplay IDs;
- course state;
- Save JSON;
- RNG;
- tuition/Energy/stat values unchanged.

## 21 — ownership regression

Verify this production patch has no overlap with:
- Chat 2 media-source queue 364–375;
- Chat 3 poverty/Forest queue 341–352;
- Chat 5 teacher staging queue 205–216.

## 22 — targeted verification

Run the new production regression plus relevant School/localization/presentation tests.

Record exact commands/results.

## 23 — full exact-head verification

Run:
- `npm run check`

from:
- `mindy-successor/prior-work/astra/prototype-m3.2`

Fix only defects caused by this integration.

## 24 — focused candidate PR

Open a PR against `main`.

PR description must state:
- exact four-key classification;
- exact values changed;
- current consumers;
- no runtime/media changes;
- Save/RNG/gameplay invariants;
- targeted/full check results;
- exact head SHA.

Freeze the candidate after handoff to QA.
