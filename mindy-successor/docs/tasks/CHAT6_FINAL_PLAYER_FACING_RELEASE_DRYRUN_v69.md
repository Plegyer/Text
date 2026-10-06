# Chat 6 — Final Player-Facing Release Dry-Run v69

Status: **BUNDLE_COMPLETE — READY_FOR_FINAL_PLAYER_FACING_RELEASE_DRYRUN**  
Owner: Chat 6  
Date: 2026-10-06  
Branch: `chat6/final-player-facing-release-dryrun-v68`

## Deliverable

Ordered dry-run checklist:

`mindy-successor/docs/tasks/CHAT6_FINAL_PLAYER_FACING_RELEASE_DRYRUN_CHECKLIST_v68.md`

Frozen checklist blob:

`729fe64a668651c9e5142d0424e9db26984689db`

Accepted upstream authority:

`CHAT6_FINAL_PLAYER_FACING_RELEASE_EVIDENCE_v67.md`  
accepted branch `chat6/final-player-facing-release-evidence-v66`  
blob `1e08950b9ac7508d31bb51c5fb36f3dc2eb5f06e`.

The v67 file was not physically present on the newly seeded v68 branch, so it was read from its exact accepted branch/blob rather than reconstructed.

## What v68 freezes

The future fully assembled release candidate must be frozen to one exact SHA before final player-facing closure starts. Every final evidence record must name that same SHA. Any tracked-file mutation invalidates the run and requires a new freeze/restart.

The ordered sequence is:

1. freeze candidate SHA and final version identities;
2. `npm ci` once, then run package/static integrity checks first;
3. run strict player-facing final-target gates with their exact opt-in environment flags;
4. run `typecheck`, `validate`, and `build`;
5. execute rendered RU checks on the actually mounted UI;
6. execute rendered EN checks on the same mounted UI;
7. execute the exact 23-case final save/migration closure;
8. record all 32 D46+D47+legacy mandatory assertions individually;
9. close GO/NO-GO only when every required final row is PASS on the same SHA.

At every step, any command failure or referenced STOP condition aborts the sequence immediately. No later gate may be used to mask an earlier failure.

## Exact strict final-target flags

Player-facing golden:

`FINAL_PLAYER_FACING_GOLDEN_TARGET=1`

UI/accessibility smoke:

`FINAL_UI_ACCESSIBILITY_SMOKE_TARGET=1`

Cross-contract:

`FINAL_PLAYER_FACING_CROSS_CONTRACT_TARGET=1`

The exact commands are preserved verbatim in the v68 checklist from accepted v67.

## Rendered evidence placement

Rendered UI validation occurs only after strict source/static final-target gates and `typecheck/validate/build` are green.

RU is executed first, EN second, against the actually mounted UI on the same frozen candidate SHA.

Both locale rows must independently record **PASS / FAIL / NOT-RUN**, candidate SHA, and a concrete evidence reference. Source/static PASS does not substitute for rendered DOM/focus/accessibility/alt/caption verification.

## Migration and legacy placement

The final 23-case save/migration closure runs after both rendered locale checks are green. It must execute the exact 23 case names frozen by the accepted Chat3 golden contract.

The 32 legacy mandatory assertions are then recorded individually against the same SHA using accepted D46+D47+legacy gate blob:

`dae0b2bf197f66c1b1fe834e643caf541c6ef4c7`.

Any missing, FAIL, or NOT-RUN legacy assertion is immediate NO-GO.

## Final evidence rows

The final candidate must record exactly these closure rows:

- player-facing golden;
- UI/accessibility smoke;
- cross-contract;
- rendered RU;
- rendered EN;
- save/migration 23-case closure;
- legacy 32 mandatory assertions.

Allowed statuses are exactly **PASS / FAIL / NOT-RUN**. Historical producer/QA PASS may remain cited as accepted provenance, but it may not populate a final-candidate PASS row.

## STOP policy

Detailed STOP contracts remain by frozen reference rather than being re-expanded:

- `CHAT6_FINAL_PLAYER_FACING_GOLDEN_QA_v59.md@45b21d3fd19d91f7b2787e3b56930aa2aa3e9af4`;
- `CHAT6_FINAL_UI_ACCESSIBILITY_SMOKE_v62.md@f25be675ae5ba7355f31d02b0c73ca75b18d5a3e`;
- `CHAT6_FINAL_PLAYER_FACING_CROSS_CONTRACT_v65.md@55ae02cbac93430fe6dd6653e031db77b9e7ba71`;
- `CHAT3_FINAL_SAVE_MIGRATION_GOLDEN_MANIFEST_v59.md@5d93d3f5b3ca34e2512d183e83e09404d5072701`;
- v66 release evidence ledger blob `654c2cec9a5ff6ebc8b284c12ce61d8b23011c03`;
- D46+D47+legacy gate blob `dae0b2bf197f66c1b1fe834e643caf541c6ef4c7`.

Critical final invariants remain unchanged: exact 23 migration cases; D42 110/12; D48 4/17; 32 legacy assertions; retired Tavern/lumber live absence with historical compatibility; Strong Meta 1 Keystone / 2 Specialists with automatic knowledge non-selectable; Activity Network v36; explicit Palace Return Home; and no raw internal IDs in accepted player-facing/accessibility UI.

## Work performed in this lane

The v68 checklist was created and connector-read back successfully. Structural spot-check confirms that it contains the 23-case and 32-assertion stages, both RU/EN rendered stages, all three required final-target flags, and the one-frozen-SHA rule.

No final assembled candidate exists in this lane, so final release gates were not executed here. This is dry-run preparation, not a claim of final release PASS.

Production runtime/mechanics/content mutation: **NONE**.  
Full CI: **NOT RUN**.  
`main` merge: **NONE**.

`BUNDLE_COMPLETE — READY_FOR_FINAL_PLAYER_FACING_RELEASE_DRYRUN`
