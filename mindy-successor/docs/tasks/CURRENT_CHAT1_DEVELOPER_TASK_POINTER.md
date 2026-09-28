# Current Chat 1 Developer task pointer

Status: ASSIGNED
Owner: Chat 1 Developer / Integration Developer
Queue: **1–12**
Queue size: **12**
Role contract: `mindy-successor/docs/tasks/CHAT1_DEVELOPER_MANDATORY_ROLE_PROMPT.md`

## Assigned production slice

Integrate the completed **Foreman semantic localization** handoff from Chat 5 into exact current `main`.

Historical worker source:
- branch: `chat5/relationships-night-content-next`
- handoff commit: `8d4dbefa8fac47c44ccd61086ddae7c3711fb68e`
- handoff: `mindy-successor/docs/relationship-prep/FOREMAN_SEMANTIC_LOCALIZATION_HANDOFF_V3.md`

The worker branch is a draft source only. **Do not merge it wholesale.**

Create a fresh branch from current `main`, recommended:
- `chat1-dev/foreman-semantic-localization-v1`

## Task 1 — exact-current-main rebase audit

Verify the current `main` after the latest Lead task-file commits.

Re-check the Chat 5 handoff against current production files. Confirm the exact current relationship/stage/counter/fact/choice identities still exist.

Do not trust the historical baseline SHA inside the handoff without revalidation.

## Task 2 — fixture selective import

Selectively copy/recreate the reviewed fixture:
- `mindy-successor/prior-work/astra/prototype-m3.2/content/relationship-foreman-semantic-labels-v1.fixture.json`

Only exact current identities are allowed.

## Task 3 — localization collision classification

Reclassify all 8 proposed `relationship.lumber.foreman.*` keys against the exact current production localization root.

Record:
- ADDITIVE;
- IDENTICAL;
- CONFLICT;
- SUPERSEDED.

Do not overwrite a conflicting current key without Lead review.

## Task 4 — production RU+EN key integration

Integrate only approved additive/identical Foreman semantic labels into the current production localization source.

Do not change relationship/gameplay identity.

## Task 5 — relationship label presentation wiring

Use the existing localization runtime/resolver pattern to render the current Foreman relationship display label where the normal-player generic condition explanation currently exposes the raw relationship ID.

Keep raw-ID fallback for unknown/untranslated relationships.

Do not build a new localization subsystem.

## Task 6 — relationship stage presentation wiring

Localize the exact current Foreman stages:
- `unknown`;
- `professional`;
- `route-professional`.

Preserve the underlying stage values and transition logic unchanged.

## Task 7 — counter and fact presentation wiring

Where the existing generic relationship condition UI renders current counter/fact identities, localize:
- counter `night_meetings`;
- fact `night-followup-complete`.

If either is not actually player-visible on current main, document that fact instead of inventing a new surface.

## Task 8 — route choice/value presentation wiring

Where an existing normal-player presentation surface renders the current relationship route choice/value, localize:
- choice `route`;
- value `professional`.

If no such current consumer exists, keep the keys available and document the absence; do not add UI solely to consume them.

## Task 9 — fallback and locale-invariance regression

Add/adjust focused regression coverage proving:
- unknown relationship semantic IDs still fall back safely;
- RU↔EN changes rendered labels only;
- relationship/stage/counter/fact/choice values remain byte-for-byte identical in state/Save;
- no gameplay/RNG writes occur.

## Task 10 — integrate/adapt Chat 5 regression source

Selectively port/adapt:
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/relationship-foreman-semantic-labels-v1.test.ts`

Make it assert the exact current production integration rather than merely the historical fixture.

Do not preserve stale assumptions just to make the old test pass.

## Task 11 — exact-head verification

Run relevant focused tests and then:
- `npm run check`

from:
- `mindy-successor/prior-work/astra/prototype-m3.2`

Fix only defects caused by this integration slice. Escalate unrelated failures to Lead.

## Task 12 — candidate deliverable PR

Open a focused PR against `main`.

PR description must state:
- exact 8-key classification;
- actual consumer(s) changed;
- any keys intentionally not wired because no current player-visible consumer exists;
- Save/RNG/gameplay invariants;
- targeted test result;
- full check result;
- exact head SHA.

No open PR = queue remains draft/non-deliverable.
