# Chat 6 — Final Player-Facing Golden Manifest v56

Status: **BUNDLE_COMPLETE — READY_FOR_FINAL_PLAYER_FACING_GOLDEN_GATE**
Owner: Chat 6
Date: 2026-10-06

## Exact deliverables

- Golden fixture: `mindy-successor/prior-work/astra/prototype-m3.2/tests/fixtures/final-player-facing-golden-v54.json`
- Human manifest: `mindy-successor/docs/tasks/CHAT6_FINAL_PLAYER_FACING_GOLDEN_MANIFEST_v54.md`
- Validator: `mindy-successor/prior-work/astra/prototype-m3.2/tests/final-player-facing-golden-manifest-v55.test.ts`
- Validator notes: `mindy-successor/docs/tasks/CHAT6_FINAL_PLAYER_FACING_GOLDEN_VALIDATOR_v55.md`
- This handoff: `mindy-successor/docs/tasks/CHAT6_FINAL_PLAYER_FACING_GOLDEN_MANIFEST_v56.md`

## Frozen source authorities

The fixture embeds exact authority metadata. Principal frozen sources are v26 `b355f08650cc1cdbb0d08e07529382c1afb0605c`; v27 `80c1bf3e41c31ca57e7837c3b73c0d6f7e8a66ae`; D42 localization/presentation `9281d3880d01c54f352effa5e372ad5393cc3eaa` / `e800d2b16f2bc868273e39d45718dcd0c7fe74a5`; Activity v17 localization/presentation `4449ca46ad6580ca5f36adf140e9e1e14a007b64` / `b6cc4cbce0dd0482cc41eeaf3df90708cb4c5432`; Activity v36 `d631544c96c724375ac48d3c563dd1c1865bb5b5`; Palace v19 localization/presentation `64922de3b6aab606f9b2932853e6bbd686766b6a` / `02c9a19eee0366131f793ed9e141b33a93f213b3`; global v23 presentation `defe52fe665831a7194e4b7d0df99ae28588207c`; v29 captions `75df2ed68b5cbf0a451e33d81e060ee5a3360d10`; v31 Tavern cleanup `d95d3e16b64d60e246f5923e2d0fc7840ddc8c04`; v40 `4626e55203cda0d841a04eaf781db7879781138c`; v42/v43 localization/app `bb8143eb836ca7be3a841ad6aeac8a106f751e28` / `43a3fdcd7a3a4cabb2ab84777feb9bb826cbdeb7`; D48 localization/presentation `ddbc1b465a06d4cb27b38276d9ca622779ecd6b5` / `195c6ac6b64d21c474a9d06528b3eb6849dcbe30`; lumber retirement verified target `39912e7435c3707d98f96fe550d697c20ac0bedb` with localization blob `b2b3681d298d1c5c307d3031cdcc3b728b8ae7fd`.

## Frozen final state

The final target must have 343 exact required localization rows with 344 ordered operations, 17 localization deletions, 9 retained Tavern history rows, 127 exact presentation targets, 17 Palace D48 replacements, one lumber presentation deletion, three retired Tavern ending slots absent, exactly four D48 Palace assets, seven Strong Meta/modal semantic hunks, and the full D42 Night preservation set of 110 localization rows plus 12 presentation slots.

Activity Network v36 is the final authority. Retired Tavern surfaces must not return. Live lumber-stay/vitality surfaces must not return, while historical compatibility remains. RU/EN parity and required alt/caption pairs are mandatory. D48 must never leak to non-Palace slots.

## Executable-now versus post-integration

The fixture was reconstructed and statically audited against frozen GitHub source authorities in this connector lane. The validator source is authored. No npm/Node run and no full CI are claimed here.

The current Chat 6 branch is not a fully assembled release candidate, so strict final-target execution is intentionally a post-integration requirement rather than a false product failure. On the fully assembled target, enable the gate explicitly with `FINAL_PLAYER_FACING_GOLDEN_TARGET=1` and run the v55 test, then run the retained focused v53 roster plus final integration build/static gates.

## STOP / third-value policy

STOP if any replacement target is neither its frozen predecessor nor frozen final value; if an ADD target exists with a different value/object; if Activity Network is not v36-final; if any D48 target has a non-v19/non-D48 object; if a D48 asset appears outside the 17 allowed Palace slots; if either Palace invitation leaves neutral town without new Product authority; if any retired Tavern/lumber live surface returns; if historical compatibility disappears; if any required RU/EN or alt/caption pair is missing; if raw modal IDs return; if D42 Night surfaces disappear; or if resolving a conflict would require wholesale replacement of shared JSON/UI/runtime files.

Do not use chronology or generic last-write-wins. Return the exact key/slot/hunk conflict to its owner.

## Selective guidance for Chat2/final closure

Consume operations, not producer snapshots. Merge localization by exact key and presentation by exact slot. Apply the seven Strong Meta/modal behaviors as semantic hunks on the actual assembled `src/ui/app.ts`. Add the four D48 assets directly only if byte-equivalent to the frozen producer; apply their 17 slot replacements only after Palace v19 semantics exist. Enforce the deletion/retirement fence after older additive layers. Preserve D42 Night, D46/D47/legacy runtime behavior, Activity/Palace owner mechanics, and every unrelated assembled surface.

No runtime/mechanics change is contributed by this bundle. No full CI was run. Main was not merged.

`BUNDLE_COMPLETE — READY_FOR_FINAL_PLAYER_FACING_GOLDEN_GATE`
