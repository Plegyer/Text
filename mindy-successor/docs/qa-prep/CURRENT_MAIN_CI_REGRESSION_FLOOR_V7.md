# Current-main CI regression floor v7

Status: COMPLETE / CURRENT_MAIN_CI_GREEN

Current main:
`5dffefd15703d431a604b4cc9f831c4e55460aed`
(PR52 legacy root RU+EN localization merge).

## Latest successful main push

Workflow:
- `mindy-successor check`
- run #88
- id `36347268518`
- event: push
- head SHA: `5dffefd15703d431a604b4cc9f831c4e55460aed`
- conclusion: SUCCESS

Validator:
- packs: 17;
- events: 46;
- actions: 35;
- endings: 9.

Tests:
- 329 total;
- 329 pass;
- 0 fail.

## PR52 exact-head binding

Accepted PR52 head:
`eefcdff5f4eb4c0eb4c9f60a91a708b5da49d962`.

Run #87:
- id `36347164191`;
- SUCCESS;
- validator 17 / 46 / 35 / 9;
- 329 / 329 tests.

The earlier PR52 head:
`a47c766725f4b1034aa27c3cb74ce3819dfa4c47`
failed run #86 because the production regression referenced a missing fixture file.

That failed head is not accepted.

## PR51 floor retained

PR51 poverty copyedit remains shipped beneath current main.

PR51 merge:
`1a2f6e428da41e356f8d48df4a72923a5cc1928c`.

Its post-merge run #85:
- 323 / 323;
- validator 17 / 46 / 35 / 9.

Current 329-test suite retains:
- exact 33-key poverty text-only regressions;
- six-pack poverty natural-path invariance;
- poverty RU↔EN pending-scene Save invariance.

## PR50 floor retained

PR50 generic Forest route/default static remains shipped.

Its post-merge run #82:
- 320 / 320;
- validator 17 / 46 / 35 / 9.

Current main still contains:
- exact `activity/forest/route/default`;
- project-owned neutral fallback;
- route/default RU+EN accessibility;
- natural-path Save-invariance regression.

## Current localization/media floor

Root localization:
- 511 total keys;
- missing RU: 0;
- missing EN: 0.

Active project-owned static semantic mappings:
`80`.

Unique active project-owned physical sources:
`79`.

Established project-owned static target:
`80 / 80`.

Current app blob:
`312399d01b211f13c29017c1e17b61f2027d21b3`.

Current presentation blob:
`0bed8e1a4a88358b7e1e8ef22d787f5bcee323f4`.

## Current event-localization floor

After PR52:
- fully root-localized events: 40 / 46;
- partially localized events: 0;
- zero-root-localization events: 6.

Remaining zero-coverage event IDs:
- `ds-lumber.first`;
- `ds-lumber.second`;
- `ds-lumber.done`;
- `lumber-cross.school-management-return`;
- `lumber-cross.activity-forest-return`;
- `lumber.career-first-shift`.

Current choice coverage:
- total choices: 68;
- RU+EN choice-label keys: 59;
- RU+EN choice-body keys: 59.

Current root media-alt coverage:
- localized media IDs: 26 / 64;
- remaining root media-alt debt: 38 / 64.

These counts describe root localization presence, not reachability.

## Minimum next integration floor

For the next localization/presentation-only integration, unexpected drift from:
- 17 packs;
- 46 events;
- 35 actions;
- 9 endings
is blocking unless separately reviewed.

Existing test count must not drop below:
`329`
without an explicit reviewed reason.

For text-only work:
- project-owned static mappings must remain at least 80;
- static target must remain 80 / 80.

## Locked invariants

Continue to protect:
- Lumber Hard Work only `completed_shifts >= 50`;
- Meta reward `hardWork:lumber`;
- Forest exact result IDs and exact activityResult reactions;
- Old Boundary `enter_old_boundary` gate;
- generic route/default no route-specific semantic effect;
- School locale Save invariance;
- PR51 poverty natural paths/text-only scope;
- PR52 legacy localization-only scope;
- Foreman voluntary Night mechanics;
- generic Night-choice stable-ID localization;
- deterministic presentation selection outside gameplay RNG;
- static identity across RU↔EN.

## Future PR evidence

Require:
- exact PR head SHA;
- successful full-check run;
- validator counts;
- total/pass/fail tests;
- domain-specific regressions;
- successful post-merge main push.

## Verdict

`CURRENT_MAIN_CI_GREEN`.

Current floor:
`main 5dffefd... / run #88 / 329 of 329 passing / 17 packs, 46 events, 35 actions, 9 endings`.
