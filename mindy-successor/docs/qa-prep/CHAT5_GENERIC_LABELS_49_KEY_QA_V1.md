# Chat5 generic-labels 49-key QA v1

Status: COMPLETE / GREEN_REBASED_SOURCE

Current main:
`4223be1f90f15a43938e072bc2171b0de5d2d1aa`
(post-PR56).

Reviewed Chat 5 item 115:
`generic-labels-localization-v1.fixture.json`.

Blob:
`e7917ea5730ecd49352dbd3276c16f845f94a21a`.

## Exact source count

Fixture keys:
`49`.

Missing RU:
`0`.

Missing EN:
`0`.

Top-level payload is localization/presentation source only.

No condition/effect/reward/economics/RNG/Save field is included.

## Scope

The 49 keys cover:
- 12 current core stat labels;
- 12 stat hints;
- money/Energy labels;
- 7 current item labels;
- target/compatibility housing labels;
- 4 season labels;
- pending-event eyebrow;
- inactive-run accepted/expired headings;
- inactive-run Legacy navigation;
- existing next-life/town-lodging keys for reuse verification.

No gameplay ID is renamed.

## Exact-current-main collision classification

After PR56:

### IDENTICAL — 21

Already root-loaded with exact RU+EN values:
- all 12 `stat.<id>.label` keys;
- `housing.room.label`;
- `housing.hostel.label`;
- `housing.shelter.label`;
- 4 `season.<season>.label` keys;
- `ui.legacy.nextLifeButton`;
- `ui.town.lodgingToday`.

### REUSE_EXISTING — 4

Fixture-domain keys are absent, but exact semantic equivalents already exist:
- `housing.normal.label`;
- `housing.cheap.label`;
- `housing.street.label`;
- `resource.energy.label`.

Lead should either:
- deliberately reuse the current equivalent keys; or
- add a stable domain-specific key only when direct semantic lookup is clearer.

Do not create drifting duplicate translations.

### ADDITIVE — 24

Genuinely additive current candidates:
- 12 `stat.<id>.hint` keys;
- `resource.money.label`;
- 7 item labels;
- `ui.event.eyebrow`;
- `ui.run.endingAccepted`;
- `ui.run.timeExpired`;
- `ui.run.fatesAndNextLife`.

### CONFLICT — 0

No current root key has a different RU+EN value for an identical fixture key.

## PR56 interaction

PR56 already shipped:
- the four season labels;
- broad condition grammar;
- remaining shell localization.

Therefore the old Chat5 baseline classification must not be reused unchanged.

The post-PR56 exact classification is:
- 24 additive;
- 21 identical;
- 4 reuse-existing;
- 0 conflict.

Total:
`49`.

## Labels/hints only

The generic-label fixture provides names/hints/shell labels.

It does not change:
- stat IDs/values;
- resource IDs/balances;
- item IDs/counts/capabilities;
- housing state;
- season/calendar state;
- ending status;
- event identity.

## Verdict

`GREEN_REBASED_SOURCE`.

The 49-key source is complete RU+EN and collision-safe against exact current main, but selective integration must use the post-PR56 24/21/4 classification rather than blindly copying all 49.
