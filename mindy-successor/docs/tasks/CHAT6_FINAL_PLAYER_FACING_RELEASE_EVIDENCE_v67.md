# Chat 6 — Final Player-Facing Release Evidence v67

Status: **BUNDLE_COMPLETE — READY_FOR_FINAL_PLAYER_FACING_RELEASE_EVIDENCE**  
Owner: Chat 6  
Date: 2026-10-06  
Branch: `chat6/final-player-facing-release-evidence-v66`

## v66 release evidence ledger

Machine-/human-auditable ledger:

`mindy-successor/prior-work/astra/prototype-m3.2/tests/fixtures/final-player-facing-release-evidence-v66.json`

Frozen ledger blob:

`654c2cec9a5ff6ebc8b284c12ce61d8b23011c03`

The ledger is intentionally compact. It references accepted STOP contracts rather than expanding older giant manifests.

Structural connector audit of the committed ledger: **PASS**.

Verified in the ledger:
- 23 save/migration cases;
- D42 = 110 localization + 12 presentation;
- D48 = 4 dedicated Palace assets + 17 Palace replacements;
- legacy = 32 mandatory assertions;
- retired Tavern and lumber live-surface absence with historical compatibility retention;
- Strong Meta = max 1 Keystone / max 2 Specialists, automatic knowledge non-selectable and slot-free;
- Activity Network final authority = v36;
- Palace Return Home remains explicit and may not auto-commit;
- raw internal IDs are prohibited from replacing accepted player-facing/accessibility copy.

## Exact frozen commands

Run from:

`mindy-successor/prior-work/astra/prototype-m3.2`

Player-facing golden package QA:

`node --experimental-strip-types --test tests/final-player-facing-golden-package-qa-v57.test.ts tests/final-player-facing-golden-manifest-v55.test.ts`

Player-facing golden on the fully assembled release target only:

`FINAL_PLAYER_FACING_GOLDEN_TARGET=1 node --experimental-strip-types --test tests/final-player-facing-golden-package-qa-v57.test.ts tests/final-player-facing-golden-manifest-v55.test.ts`

UI/accessibility standalone smoke:

`node --experimental-strip-types --test tests/final-ui-accessibility-smoke-v61.test.ts`

UI/accessibility on the fully assembled release target only:

`FINAL_UI_ACCESSIBILITY_SMOKE_TARGET=1 node --experimental-strip-types --test tests/final-ui-accessibility-smoke-v61.test.ts tests/final-player-facing-golden-manifest-v55.test.ts`

Cross-contract standalone validator:

`node --experimental-strip-types --test tests/final-player-facing-cross-contract-v64.test.ts`

Cross-contract combined final gate on the fully assembled release target only:

`FINAL_PLAYER_FACING_CROSS_CONTRACT_TARGET=1 node --experimental-strip-types --test tests/final-player-facing-cross-contract-v64.test.ts tests/final-ui-accessibility-smoke-v61.test.ts tests/final-player-facing-golden-manifest-v55.test.ts`

Save/migration manifest integrity:

`npm ci`

`node --experimental-strip-types --test tests/final-historical-fixtures-v55.test.ts tests/final-save-migration-golden-v57.test.ts`

Final save/migration prerequisites after all production tranches are assembled:

`npm ci`

`npm run typecheck`

`npm run validate`

`npm run build`

Final 23-case save/migration closure:

`node --experimental-strip-types --test tests/final-save-migration-closure-v21.test.ts`

Rendered UI/accessibility closure is not represented by a single shell command: execute `postIntegrationRenderedChecks` from `tests/fixtures/final-ui-accessibility-smoke-v60.json` against the actually mounted UI in both RU and EN.

## Final-only evidence slots

The v66 ledger deliberately leaves the fully assembled release-target fields unfilled:

- exact release branch and SHA;
- final public schema version;
- final content/catalog version;
- final Strong Meta registry version;
- final Activity local version fields;
- final player-facing golden result;
- final UI/accessibility smoke result;
- final cross-contract result;
- final 23-case save/migration closure result;
- rendered RU result;
- rendered EN result;
- final report of all 32 legacy mandatory assertions.

Every final gate field uses the explicit state set **PASS / FAIL / NOT-RUN**. At this handoff all final-assembly execution slots are **NOT-RUN**; this is intentional and must not be promoted to PASS from historical producer QA.

## Already accepted evidence

Player-facing golden QA is accepted at `45b21d3fd19d91f7b2787e3b56930aa2aa3e9af4` against implementation head `62b4da9028c96f7c999a9156d596590ddae74ebd` and fixture blob `bc8617be68825543ed7617e9dd5c7d915f6b0e14`: frozen-authority QA **PASS**, zero discrepancies.

UI/accessibility smoke is accepted at `f25be675ae5ba7355f31d02b0c73ca75b18d5a3e` with fixture blob `62f1b14b1f6890b4641c2acb2cd26860c8b99ed8`: connector-backed static smoke assertions **PASS**.

Final player-facing cross-contract is accepted on `55ae02cbac93430fe6dd6653e031db77b9e7ba71`, handoff blob `3ef543c658a042f4f9e8b4ba39254b4f402f216f`: static cross-check **PASS**, exact contradictions found = 0.

Chat3 final save/migration golden is accepted at `5d93d3f5b3ca34e2512d183e83e09404d5072701`, fixture blob `6ad4ed97ec6058960f90c6b6b80edfda0b9a6279`: manifest structural audit **PASS** with exactly 23 cases. This does not claim final production migration execution.

Chat4 D46+D47+legacy handoff is accepted at `13424ebeefa55c91af7ca39e70a3843b80a75f99`, with operation/gate blobs `17282cf11436d54d49915f44ed84de56a0eebf7c` / `dae0b2bf197f66c1b1fe834e643caf541c6ef4c7`: its contract validator evidence is **PASS**, and the 32 mandatory assertions remain required on the final assembled candidate.

## Required final invariants

The final candidate is NO-GO if any retired Tavern ending returns live, if live `lumber-stay` or live `vitality` acquisition returns, or if their required historical/migration compatibility disappears. The lumber compatibility identity remains `legacy.lumber-stay.vitality` and contributes +1 Energy once only.

Strong Meta remains max 1 Keystone and max 2 Specialists. Automatic inherited knowledge is not selectable, consumes no Strong Meta slot, Hard Work packages remain outside Strong Meta slots, and the current-run snapshot remains engine-owned/immutable.

Activity Network must resolve to v36, never the v17 predecessor. D42 must preserve exactly 110 localization and 12 presentation targets. D48 must contain exactly four dedicated Palace assets and remain restricted to its 17 approved Palace replacement slots.

Palace Return Home remains an explicit D16 commit. Prince success/readiness may not auto-commit Return Home. Accepted player-facing and accessibility UI must use localized human-readable copy; raw panel/internal/stable IDs may not replace visible labels, accessible names, alt/caption copy, or other accepted human-facing text.

## STOP references

Do not duplicate or reinterpret the detailed stop lists. Apply them by exact reference:

- `CHAT6_FINAL_PLAYER_FACING_GOLDEN_QA_v59.md@45b21d3fd19d91f7b2787e3b56930aa2aa3e9af4`;
- `CHAT6_FINAL_UI_ACCESSIBILITY_SMOKE_v62.md@f25be675ae5ba7355f31d02b0c73ca75b18d5a3e`;
- `CHAT6_FINAL_PLAYER_FACING_CROSS_CONTRACT_v65.md@55ae02cbac93430fe6dd6653e031db77b9e7ba71`;
- `CHAT3_FINAL_SAVE_MIGRATION_GOLDEN_MANIFEST_v59.md@5d93d3f5b3ca34e2512d183e83e09404d5072701`.

Do not resolve conflicts by chronology, generic last-write-wins, wholesale replacement of shared files, or weakening accepted assertions.

## Final GO / NO-GO

Player-facing closure is **GO** only when the same frozen final candidate SHA records PASS for player-facing golden, UI/accessibility smoke, cross-contract, all 23 save/migration cases, rendered RU, rendered EN, and all 32 legacy mandatory assertions; all required counts/invariants above must also hold and no referenced STOP condition may trigger.

Any FAIL or NOT-RUN among those final closure slots is **NO-GO**.

No production runtime/mechanics/content file was changed by v66-v67. No full CI was run. `main` was not merged.

`BUNDLE_COMPLETE — READY_FOR_FINAL_PLAYER_FACING_RELEASE_EVIDENCE`
