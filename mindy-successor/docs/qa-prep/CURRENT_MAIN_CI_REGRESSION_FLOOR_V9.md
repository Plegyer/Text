# Current-main CI regression floor v9

Status: COMPLETE / CURRENT_MAIN_CI_GREEN

Current main:
`6e2a5147603b71eed89a0966af417a33dd28d7a7`
(PR54 journal/outcome stable-ref merge).

## Latest successful main push

Workflow:
- `mindy-successor check`;
- run #97;
- id `36402495113`;
- event: push;
- head SHA: `6e2a5147603b71eed89a0966af417a33dd28d7a7`;
- conclusion: SUCCESS.

Validator:
- packs: 17;
- events: 46;
- actions: 35;
- endings: 9.

Tests:
- 338 total;
- 338 pass;
- 0 fail.

## PR54 exact-head corroboration

Accepted exact head:
`81664ef3cf70e58daaa7b323dd42267971860088`.

Workflow:
- run #96;
- id `36402224927`;
- SUCCESS;
- validator 17 / 46 / 35 / 9;
- 338 / 338 tests.

Relevant new/compatibility tests PASS:
- stable event-choice refs stored beside fallback text;
- old schema-4 save without refs loads with null refs;
- malformed ref alignment rejected;
- existing School reload/result regressions;
- Journal/lastAction RU↔EN stable-ref rendering preserves Save.

## Current localization floor

Root localization:
`540` keys.

Missing RU:
`0`.

Missing EN:
`0`.

Fully root-localized events:
`40 / 46`.

Choice-label coverage:
`59 / 68`.

Choice-body coverage:
`59 / 68`.

## Current static-media floor

Active project-owned static semantic mappings:
`80`.

Unique active project-owned sources:
`79`.

Established target:
`80 / 80`.

Current route-specific Forest slots:
`0`
for logging-road/old-boundary.

This absence is intentional until the reviewed presentation seam ships.

## Current stable-ref compatibility floor

Current main must preserve:
- schemaVersion 4 old-save omission compatibility;
- `journal.length === journalRefs.length`;
- legacy `run.journal=` assignment realignment;
- School direct journal producer realignment;
- no fuzzy prose migration;
- School course result priority;
- locale-only Journal/result rendering with unchanged Save.

## Previous integration floors retained

PR53 global UI shell:
- shipped;
- Save-invariance renderer tests retained.

PR52 legacy root localization:
- shipped;
- production localization regressions retained.

PR51 poverty copyedit:
- shipped;
- natural-path and pending-scene locale invariance retained.

PR50 Forest route/default:
- shipped;
- generic neutral route static and natural-path invariance retained.

## Minimum next-integration floor

Unless intentionally reviewed:
- validator must remain 17 packs / 46 events / 35 actions / 9 endings;
- existing test count must not drop below 338;
- failures must remain 0;
- root localization must not silently lose keys;
- active project-owned static mapping count must remain at least 80;
- static target remains 80/80.

## Locked gameplay invariants

Continue to protect:
- Lumber Hard Work only `completed_shifts >= 50`;
- meta reward `hardWork:lumber`;
- Forest success/escape/failure exact result IDs;
- exact activityResult reactions;
- Old Boundary `enter_old_boundary` gate;
- School locale Save invariance;
- ordinary-poverty natural paths;
- Foreman voluntary Night mechanics;
- Night/lodging exact costs/effects;
- gameplay RNG independent of presentation selection.

## Future shared-UI/presentation work

Shared Night UI:
- only 16 genuinely additive keys after PR53/54 rebase.

Forest route-specific:
- pure presentation seam + 10 additive localization keys;
- no gameplay/result/Hard Work mutation.

Animation exporter:
- dev-only candidate acceptable only after exact dependency/CI approval;
- no real production GIF claim until actual bytes/pools exist.

## Future CI evidence

Require:
- exact head SHA;
- exact successful workflow;
- validator counts;
- total/pass/fail;
- domain regressions;
- successful post-merge main push.

## Verdict

`CURRENT_MAIN_CI_GREEN`.

Authoritative current floor:
`main 6e2a514... / run #97 / 338 of 338 passing / 17 packs, 46 events, 35 actions, 9 endings / static 80 of 80`.
