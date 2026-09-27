# Legacy root 109-key production patch QA v2

Status: COMPLETE / GREEN_POST_MERGE_MAIN

Current main:
`5dffefd15703d431a604b4cc9f831c4e55460aed`
(PR52 legacy root localization merge, on top of PR51).

Source:
`legacy-root-localization-production-patch-v2.fixture.json`.

Blob:
`2e7fb18cb1f85f25d0afcb6f34d7be5250967ea4`.

## Exact scope

Total keys:
`109`.

Exact current event identities:
`17`.

Exact current media identities:
`16`.

Missing current event IDs:
`0`.

Missing current media IDs:
`0`.

The event scope remains the reviewed non-School legacy:
- seven `base.*` events;
- nine `gopher.*` events;
- `stage.goblin`.

## Choice outcomes

Final choice-outcome source contains:
`26`
stable keys.

All 26 are present in the 109-key production patch.

Stable form:
`event.<eventId>.choice.<choiceId>.text`.

Locale is not part of identity.

## RU+EN completeness

Patch missing RU:
`0`.

Patch missing EN:
`0`.

Every payload value contains only:
- `ru`;
- `en`.

## Current-root collision policy

Against exact current main after PR51:
- root collisions: 1;
- non-identical collisions: 0.

The one existing key is exact-identical:
`media.base.workshop.alt`.

Therefore current classification remains:
- additive: 108;
- identical: 1;
- conflicting: 0.

No reviewed text replacement against an existing different root value is required.

## Media-alt source

The 16 media keys use exact current media IDs.

Post-PR49/50 media-alt refinement avoids claiming event-specific details absent from generic current assets.

No media path or ID is changed by the localization fixture.

## Other-owner exclusion

No key overlaps:
- School;
- ordinary poverty;
- Foreman;
- Forest result;
- Forest route;
- Secret Debt.

No other-owner production namespace is claimed.

## Gameplay payload

Top-level patch fields:
- `version`;
- `defaultLocale`;
- `strings`.

No gameplay field exists.

The patch does not modify:
- trigger;
- condition;
- effect;
- flag;
- metric;
- reward;
- RNG;
- Save;
- event identity;
- choice identity.

## Current visibility caveat

Title, selected variant body, choice label and media alt can use the current generic event localization helpers after root integration.

Choice-outcome keys are content-ready, but current Journal/raw `lastAction.text` still store/render embedded source prose.

Do not write selected locale prose into gameplay Save to solve this.

That requires the separate shared consumer gate.

## Production gate

Lead selective integration must:
1. recheck 109 keys on exact integration head;
2. merge only approved root strings;
3. run item-83 regression;
4. exercise representative/all natural paths;
5. preserve pending IDs/effects/RNG/Save across locale;
6. run full exact-head CI;
7. run post-merge main CI.

## Verdict

`GREEN_SELECTIVE_LOCALIZATION_SOURCE`.

The 109-key legacy root patch is clean against current main and contains only current-ID bilingual presentation text.


## PR52 integration history

PR #52:
`Lead: integrate legacy root RU EN localization`.

Base:
`1a2f6e428da41e356f8d48df4a72923a5cc1928c`.

### Failed first exact head

Head:
`a47c766725f4b1034aa27c3cb74ce3819dfa4c47`.

Run #86:
- id `36347027713`;
- FAILURE;
- validator: 17 packs / 46 events / 35 actions / 9 endings;
- tests: 325;
- pass: 324;
- fail: 1.

Failure:
`tests/legacy-root-localization-production-v1.test.ts`
attempted to open missing:
`content/legacy-root-localization-production-patch-v2.fixture.json`.

This was an integration-copy/test-fixture completeness failure, not a localization/gameplay failure.

### Accepted fixed exact head

Fixed head:
`eefcdff5f4eb4c0eb4c9f60a91a708b5da49d962`.

Run #87:
- id `36347164191`;
- SUCCESS;
- validator: 17 / 46 / 35 / 9;
- tests: 329;
- pass: 329;
- fail: 0.

Relevant tests PASS:
- `production legacy patch covers exact current event and media identities`;
- `production legacy patch is complete RU EN and locale-neutral`;
- `production root collision policy is additive, identical, or explicitly reviewed replacement`;
- `production legacy patch contains localization only`;
- `production legacy patch excludes other-owner namespaces`.

### Merge + current main

PR52 merged as:
`5dffefd15703d431a604b4cc9f831c4e55460aed`.

Post-merge main run #88:
- id `36347268518`;
- SUCCESS;
- validator: 17 / 46 / 35 / 9;
- tests: 329;
- pass: 329;
- fail: 0.

The same legacy production regressions pass on merged main.

## Shipped root effect

Current root localization now contains:
`511` keys.

Missing RU:
`0`.

Missing EN:
`0`.

The patch adds/retains bilingual current event/media strings only; no gameplay count changes occur.

## Final verdict

`GREEN_POST_MERGE_MAIN`.

The 109-key legacy root localization integration is shipped on current main.
