# Chat 4 — Secret Debt Localization Exact-Head QA v24

Status: **GREEN — READY_FOR_CHAT2_CONTENT_ASSEMBLY**  
Owner: Chat 4  
QA branch: `chat4/qa-secret-debt-localization-v24`

Frozen localization producer under verification:

`chat6/secret-debt-ending-localization-producer-v27@b6cc4ca6990936f4d801004806b25e4d920f9abf`

Frozen Secret Debt mechanics adjacency authority:

`chat4/secret-debt-full-route-producer-v12@10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`

No frozen producer was mutated.  
No full CI was run by Chat 4.

## 1. v24 workflow repair

v23 was blocked by self-hosted runner shutdown and used a `pwsh`-specific firewall step.

v24 uses the Windows PowerShell available on HOME-PC:

`shell: powershell`

and executes both exact-source checks sequentially in one self-hosted Windows job, avoiding competition between two QA jobs for the single runner.

Workflow:

`.github/workflows/chat4-secret-debt-localization-exact-head-qa-v24.yml`

Final workflow-only QA commit:

`117dd805779913d61981a635e1010c73c438dda0`

## 2. Green executable evidence

Workflow run:

`37456034960`

Job:

`112243760593`

Conclusion:

**SUCCESS**

Runner:

- self-hosted Windows X64;
- HOME-PC;
- Node `22.18.0`.

Required-check gate:

- v27 exact SHA: **success**
- production firewall: **success**
- v27 npm ci: **success**
- typecheck: **success**
- validate: **success**
- build: **success**
- v27 localization/runtime-key tests: **success**
- v12 exact SHA: **success**
- v12 npm ci: **success**
- v12 route/ordinary-Prostitute tests: **success**

## 3. Exact v27 checkout

The workflow explicitly checked out:

`b6cc4ca6990936f4d801004806b25e4d920f9abf`

Runner log:

`Exact frozen v27 producer: b6cc4ca6990936f4d801004806b25e4d920f9abf`

Exact SHA guard: **PASS**

## 4. v27 production firewall

Compared v27 against its Leader seed:

`24b7bd0f7e6d4b06f606e5983b408e606d6704f2`

Allowed changed files are exactly:

- `mindy-successor/docs/tasks/CHAT6_SECRET_DEBT_ENDING_LOCALIZATION_PRODUCER_v27.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/localization.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/secret-debt-ending-localization-producer-v27.test.ts`

Firewall additionally verifies zero diff in:

- `src/`;
- `content/definitions.json`;
- `content/packs/`;
- `content/presentation.json`.

Result:

**PASS**

Therefore v27 changes no Secret Debt runtime/mechanics, reward/gate logic, economy, definitions, packs, or presentation routing.

## 5. Required build gates on exact v27

`npm ci` — **PASS**

`npm run typecheck` — **PASS**

`npm run validate` — **PASS**

Validation output:

`Content OK: 84 packs, 357 events, 39 actions, 43 endings.`

`npm run build` — **PASS**

Build output:

`Built renderer, content catalog and desktop save validator.`

## 6. v27 localization / runtime-key executable bundle

Executed on the exact v27 SHA:

- `tests/secret-debt-ending-localization-producer-v27.test.ts`
- `tests/localization.test.ts`
- `tests/ending-action-localization-production.test.ts`
- `tests/journal-outcome-localization.test.ts`
- `tests/generic-labels-localization-production-v1.test.ts`

Result:

- tests: **17**
- pass: **17**
- fail: **0**
- skipped: **0**

This proves the three Secret Debt endings have executable bilingual title/description/epilogue coverage through the current localization schema and stable ending runtime-key convention.

## 7. Exact v12 mechanics adjacency

The same QA job then cleanly checked out the frozen Secret Debt mechanics authority:

`10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`

Runner log:

`Exact frozen v12 mechanics authority: 10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`

Exact SHA guard: **PASS**

Executed:

- `tests/secret-debt-full-route-v12.test.ts`
- `tests/prostitute-boundaries.test.ts`

Result:

- tests: **26**
- pass: **26**
- fail: **0**
- skipped: **0**

This covers the frozen Secret Debt route and the ordinary Prostitute separation firewall required by the v24 pointer.

## 8. First v24 attempt and narrow QA correction

Initial v24 run:

`37455310705`

Job:

`112241345693`

The v27 exact-head half was already fully green:

- SHA guard PASS;
- firewall PASS;
- npm ci PASS;
- typecheck PASS;
- validate PASS;
- build PASS;
- v27 test bundle 17/17 PASS.

The v12 command accidentally included one additional historical pre-v12 audit:

`tests/chat3-secret-debt-separation-v2.test.ts`

That test intentionally asserts that Secret Debt production is absent and is therefore incompatible with the exact frozen v12 producer where Secret Debt is present.

In that first run:

- `prostitute-boundaries.test.ts` passed;
- all 21 Secret Debt v12 route tests passed;
- the single failure came from the obsolete pre-v12 absence assertion.

QA-only repair:

`117dd805779913d61981a635e1010c73c438dda0`

removed only that non-required pre-v12 audit from the executable roster.

No production file and no frozen producer changed.

## 9. Scope / release disposition

v24 proves:

- exact frozen v27 checkout;
- localization-only production diff;
- typecheck / validate / build;
- 17/17 localization/runtime-key focused tests;
- exact frozen v12 checkout;
- 26/26 Secret Debt route + ordinary Prostitute separation tests.

No full CI was run.

The frozen v27 localization producer is executable-green for its required scope.

**READY_FOR_CHAT2_CONTENT_ASSEMBLY**
