# Chat 6 — Final Player-Facing Release Dry-Run Checklist v68

Status: **COMPLETE — ORDERED FINAL-CANDIDATE CHECKLIST FROZEN**  
Owner: Chat 6  
Date: 2026-10-06

Authority: `CHAT6_FINAL_PLAYER_FACING_RELEASE_EVIDENCE_v67.md` from accepted branch `chat6/final-player-facing-release-evidence-v66`, blob `1e08950b9ac7508d31bb51c5fb36f3dc2eb5f06e`.

Run from `mindy-successor/prior-work/astra/prototype-m3.2`.

This checklist is for the future **fully assembled release candidate only**. All evidence below must name the same frozen candidate SHA. Any command that changes tracked files invalidates the freeze: stop, create a new candidate SHA, and restart the sequence.

## Evidence header — fill before step 1

- candidate branch: `________________`
- frozen candidate SHA: `________________`
- public schema version: `________________`
- content/catalog version: `________________`
- Strong Meta registry version: `________________`
- Activity local version fields: `________________`
- executor/date: `________________`

Initial gate state for every row: **NOT-RUN**. Allowed final states are exactly **PASS / FAIL / NOT-RUN**.

## Ordered dry-run

### 0 — Freeze and identity-check the candidate

Record the exact candidate SHA and the version fields above before executing any final gate. Confirm that the intended production tranches are assembled. Historical producer PASS evidence does not substitute for execution on this SHA.

**Immediate STOP:** candidate SHA changes, final schema epoch is not frozen, or the target is known to be only a producer/research branch.

### 1 — Install once and run package/static integrity first

Run:

`npm ci`

Then run the player-facing golden package/static validator:

`node --experimental-strip-types --test tests/final-player-facing-golden-package-qa-v57.test.ts tests/final-player-facing-golden-manifest-v55.test.ts`

Run the standalone UI/accessibility static smoke:

`node --experimental-strip-types --test tests/final-ui-accessibility-smoke-v61.test.ts`

Run the standalone cross-contract validator:

`node --experimental-strip-types --test tests/final-player-facing-cross-contract-v64.test.ts`

Run save/migration manifest integrity:

`node --experimental-strip-types --test tests/final-historical-fixtures-v55.test.ts tests/final-save-migration-golden-v57.test.ts`

Record these as package/static evidence against the frozen SHA. They validate contracts and fixtures; they do not by themselves close the release.

**Immediate STOP:** any test fails; the save/migration manifest is not exactly 23 cases; frozen authority identity/counts drift; or any referenced v59/v62/v65/v59-save STOP condition triggers.

### 2 — Run strict final-target player-facing gates

Run the golden final-target gate with its required opt-in flag:

`FINAL_PLAYER_FACING_GOLDEN_TARGET=1 node --experimental-strip-types --test tests/final-player-facing-golden-package-qa-v57.test.ts tests/final-player-facing-golden-manifest-v55.test.ts`

Record **player-facing golden = PASS/FAIL** for the frozen SHA.

Run the UI/accessibility final-target gate with its required opt-in flag:

`FINAL_UI_ACCESSIBILITY_SMOKE_TARGET=1 node --experimental-strip-types --test tests/final-ui-accessibility-smoke-v61.test.ts tests/final-player-facing-golden-manifest-v55.test.ts`

Record **UI/accessibility smoke = PASS/FAIL** for the same SHA.

Run the cross-contract combined final gate with its required opt-in flag:

`FINAL_PLAYER_FACING_CROSS_CONTRACT_TARGET=1 node --experimental-strip-types --test tests/final-player-facing-cross-contract-v64.test.ts tests/final-ui-accessibility-smoke-v61.test.ts tests/final-player-facing-golden-manifest-v55.test.ts`

Record **cross-contract = PASS/FAIL** for the same SHA.

**Immediate STOP:** any of the three final-target gates fails. Also STOP if Activity Network is not v36; D42 is not exactly 110 localization / 12 presentation; D48 is not exactly 4 assets / 17 approved Palace replacements; retired Tavern or lumber live surfaces return; required historical compatibility disappears; Strong Meta differs from 1 Keystone / 2 Specialists or automatic knowledge becomes selectable; Palace Return Home becomes automatic/disappears; or accepted player-facing/accessibility copy exposes raw internal IDs.

### 3 — Final build/static prerequisites

Run:

`npm run typecheck`

`npm run validate`

`npm run build`

These commands must execute on the same frozen SHA already used above.

**Immediate STOP:** any prerequisite fails. Do not continue to rendered evidence or migration closure.

### 4 — Rendered RU check on the mounted final UI

Execute the `postIntegrationRenderedChecks` defined by `tests/fixtures/final-ui-accessibility-smoke-v60.json` against the actually mounted final UI in **RU**.

Record:
- rendered RU = **PASS / FAIL**;
- candidate SHA;
- concrete evidence reference (run/log/screenshots or other release-lane evidence location).

This is where DOM focus behavior, runtime accessible naming, rendered alt/caption behavior, historical-vs-live distinction, Palace explicit Return Home presentation, and raw-ID absence are verified rather than inferred from source.

**Immediate STOP:** any required RU surface is missing, untranslated, inaccessible, stale, raw-ID-facing, or violates a referenced smoke/golden STOP condition.

### 5 — Rendered EN check on the same mounted final UI

Repeat the exact rendered matrix in **EN** on the same frozen SHA and record:
- rendered EN = **PASS / FAIL**;
- candidate SHA;
- evidence reference.

RU and EN must both be PASS. One locale cannot substitute for the other.

**Immediate STOP:** any RU/EN disagreement against the frozen matrix or any missing accessibility/alt/caption requirement.

### 6 — Execute the final 23-case save/migration closure

Only after steps 1–5 are green, run:

`node --experimental-strip-types --test tests/final-save-migration-closure-v21.test.ts`

The materialized suite must contain and execute the exact **23** case names frozen by the accepted save/migration golden manifest.

Record:
- 23-case save/migration closure = **PASS / FAIL**;
- exact executed case count = `____ / 23`;
- candidate SHA;
- result/evidence reference.

**Immediate STOP:** fewer/more than 23 exact cases execute; any case fails; any exactly-once payment/Energy/calendar/reward/transaction behavior replays; historical reconstruction is treated as a genuine save; Palace completion/defeat is fabricated; old Lust is rewritten to the fresh default; D47 applies retroactively/twice; retired lumber becomes live; or any accepted save/migration STOP condition triggers.

### 7 — Record all 32 legacy mandatory assertions

Against the same frozen SHA, record the accepted Chat4 D46+D47+legacy gate's **32 mandatory assertions** individually as PASS/FAIL. The authoritative contract is the accepted gate blob `dae0b2bf197f66c1b1fe834e643caf541c6ef4c7`, referenced by v67.

Required summary:
- mandatory assertions executed: `____ / 32`;
- PASS: `____`;
- FAIL: `____`;
- legacy 32 mandatory assertions overall = **PASS / FAIL**;
- evidence reference: `________________`.

This evidence must include the retirement/history boundaries: no live `lumber-stay` or live `vitality` acquisition, historical `legacy.lumber-stay.vitality` retained/deduped, +1 Energy once only, no fabricated Hard Work/Palace/Strong Meta credit, and canonical ordinary ending count 40.

**Immediate STOP:** any of the 32 assertions is FAIL or NOT-RUN.

### 8 — Close the evidence ledger and hand off

For the single frozen candidate SHA, all of these final rows must be **PASS**:

| Final evidence row | Status | Candidate SHA | Evidence ref |
| --- | --- | --- | --- |
| player-facing golden | NOT-RUN | | |
| UI/accessibility smoke | NOT-RUN | | |
| cross-contract | NOT-RUN | | |
| rendered RU | NOT-RUN | | |
| rendered EN | NOT-RUN | | |
| save/migration 23-case closure | NOT-RUN | | |
| legacy 32 mandatory assertions | NOT-RUN | | |

Do not convert historical accepted QA into final-candidate PASS. A row becomes PASS only from evidence executed on this frozen candidate SHA.

**GO condition:** every row above is PASS, all exact counts/invariants remain satisfied, and no referenced STOP condition has triggered.

**NO-GO condition:** any row is FAIL or NOT-RUN, evidence points to a different candidate SHA, or any STOP condition has triggered.

## STOP authority references

Apply the detailed STOP conditions by reference rather than duplicating the large manifests:

- `CHAT6_FINAL_PLAYER_FACING_GOLDEN_QA_v59.md@45b21d3fd19d91f7b2787e3b56930aa2aa3e9af4`;
- `CHAT6_FINAL_UI_ACCESSIBILITY_SMOKE_v62.md@f25be675ae5ba7355f31d02b0c73ca75b18d5a3e`;
- `CHAT6_FINAL_PLAYER_FACING_CROSS_CONTRACT_v65.md@55ae02cbac93430fe6dd6653e031db77b9e7ba71`;
- `CHAT3_FINAL_SAVE_MIGRATION_GOLDEN_MANIFEST_v59.md@5d93d3f5b3ca34e2512d183e83e09404d5072701`;
- v66 release evidence ledger blob `654c2cec9a5ff6ebc8b284c12ce61d8b23011c03`;
- accepted D46+D47+legacy gate blob `dae0b2bf197f66c1b1fe834e643caf541c6ef4c7`.

Do not resolve a conflict by chronology, generic last-write-wins, weakening assertions, or wholesale replacement of shared production files.

This v68 artifact changes no production runtime/mechanics/content. It does not run full CI and does not merge `main`.

**v68 COMPLETE**
