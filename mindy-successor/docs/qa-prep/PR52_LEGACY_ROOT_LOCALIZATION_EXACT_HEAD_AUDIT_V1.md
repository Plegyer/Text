# PR52 legacy root localization exact-head audit v1

Status: COMPLETE / GREEN_EXACT_HEAD

PR:
- #52 `Lead: integrate legacy root RU EN localization`
- base: `1a2f6e428da41e356f8d48df4a72923a5cc1928c`
- accepted exact head: `eefcdff5f4eb4c0eb4c9f60a91a708b5da49d962`

## Exact source scope

Reviewed production patch:
`legacy-root-localization-production-patch-v2.fixture.json`.

Scope:
- total keys: 109;
- exact current event IDs: 17;
- exact current media IDs: 16;
- complete RU: YES;
- complete EN: YES;
- gameplay fields: 0.

The 17 event identities are current non-School legacy:
- seven `base.*`;
- nine `gopher.*`;
- `stage.goblin`.

## Collision classification

Against the PR52 base:
- additive: 108;
- exact-identical: 1;
- conflicting replacement: 0.

The existing identical key is:
`media.base.workshop.alt`.

Thus PR52 does not overwrite an unrelated current localization value with a third value.

## Exact current identity check

All 17 event IDs exist in current root production.

All 16 media IDs exist in current root production.

No new event/media gameplay identity is invented by localization.

## RU+EN completeness

All 109 values contain:
- non-empty `ru`;
- non-empty `en`.

Keys remain locale-neutral.

Locale is not encoded in:
- event ID;
- choice ID;
- variant ID;
- media ID;
- localization key identity.

## Other-owner exclusion

Production regression excludes overlap with:
- School;
- ordinary poverty;
- Foreman;
- Forest result/route;
- Secret Debt.

The patch is limited to its reviewed legacy root ownership.

## Gameplay isolation

The production patch contains localization data only.

It changes no:
- trigger;
- condition;
- choice effect;
- flag;
- metric;
- reward;
- resolver priority;
- RNG;
- Save schema.

## Initial failed exact head

An earlier PR52 head:
`a47c766725f4b1034aa27c3cb74ce3819dfa4c47`
failed workflow #86.

Failure cause:
the regression referenced a fixture file that had not been copied into the integration branch.

This was a test/integration completeness problem, not a production localization/gameplay mismatch.

That head is not accepted.

## Accepted exact-head CI

Fixed accepted head:
`eefcdff5f4eb4c0eb4c9f60a91a708b5da49d962`.

Workflow:
- run #87
- id `36347164191`
- conclusion: SUCCESS

Validator:
- 17 packs;
- 46 events;
- 35 actions;
- 9 endings.

Tests:
- 329 total;
- 329 pass;
- 0 fail.

Relevant production tests PASS:
- exact current event/media identity coverage;
- complete RU+EN / locale-neutral patch;
- additive/identical/reviewed collision policy;
- localization-only payload;
- excluded other-owner namespaces.

## Verdict

`GREEN_EXACT_HEAD`.

Only the fixed exact head `eefcdff...` is accepted.
