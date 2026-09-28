# PR52 legacy root localization post-merge audit v1

Status: COMPLETE / GREEN_POST_MERGE_MAIN

PR #52:
`Lead: integrate legacy root RU EN localization`.

Accepted exact head:
`eefcdff5f4eb4c0eb4c9f60a91a708b5da49d962`.

Merge SHA:
`5dffefd15703d431a604b4cc9f831c4e55460aed`.

Current main:
`5dffefd15703d431a604b4cc9f831c4e55460aed`.

## Merge evidence

PR state:
`closed`.

Merged:
`true`.

Current `main` points to the exact PR52 merge SHA.

## Post-merge push CI

Workflow:
- `mindy-successor check`
- run #88
- id `36347268518`
- event: push
- head SHA: `5dffefd15703d431a604b4cc9f831c4e55460aed`
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

The PR52 production localization regressions also pass on merged main.

## Current shipped localization result

Current root localization:
`511` keys.

Missing RU:
`0`.

Missing EN:
`0`.

PR52 raises fully root-localized current event coverage to:
`40 / 46`.

Remaining zero-root-localization event IDs:
- `ds-lumber.first`;
- `ds-lumber.second`;
- `ds-lumber.done`;
- `lumber-cross.school-management-return`;
- `lumber-cross.activity-forest-return`;
- `lumber.career-first-shift`.

## Choice/media result

Current root choices:
- total: 68;
- bilingual choice labels: 59;
- bilingual choice outcome/body keys: 59.

Current root media:
- total media IDs: 64;
- bilingual root `media.<id>.alt`: 26;
- remaining root-media-alt debt: 38.

These are root-key presence counts, not reachability claims.

## Gameplay invariance

PR52 does not change:
- event triggers;
- choice effects;
- flags/metrics;
- resolver semantics;
- RNG;
- Save schema;
- Night/Activity mechanics;
- endings.

Validator counts remain unchanged.

## Outcome display caveat

PR52 ships stable bilingual choice-outcome keys for its legacy events, but current Journal/raw lastAction persistence still uses embedded source prose.

This is shared presentation/runtime debt and does not invalidate the root localization merge.

The accepted future direction is stable event/choice identity -> localized render, never locale-selected prose -> Save identity.

## Verdict

`GREEN_POST_MERGE_MAIN`.

PR52 is production-accepted on current main with successful exact-head and post-merge CI.
