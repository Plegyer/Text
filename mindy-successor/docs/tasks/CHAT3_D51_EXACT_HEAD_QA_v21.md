# Chat 3 — D51 Exact-Head QA v21

Status: **QA COMPLETE — READY FOR CHAT2 ASSEMBLY**  
Owner: Chat 3  
QA branch: `chat3/qa-secret-debt-activity-energy-compat-v21`

Frozen producer verified:
`chat3/secret-debt-activity-energy-compat-producer-v20@79a868bf30af2c162b2ea1323759dffad5e8dadf`

Task source:
`mindy-successor/docs/tasks/CHAT3_D51_EXACT_HEAD_QA_v21_TASK.md`

## Final green workflow evidence

Workflow:
- name: `Chat 3 D51 exact-head QA v21`
- workflow ID: **374608518**

Final green run:
- run ID: **37205501396**
- run number: **3**
- QA trigger SHA: `de16b54f2c8c71228a9c46f8263e8a35406a79fd`
- event: `push`
- conclusion: **success**

Final green job:
- job name: `exact-head-focused`
- job ID: **111445731393**
- conclusion: **success**
- runner: `HOME-PC`
- labels: `self-hosted, Windows, X64`

The workflow explicitly checked out:

`79a868bf30af2c162b2ea1323759dffad5e8dadf`

The exact-head verification step passed and the runner log recorded:

`HEAD is now at 79a868bf Chat3: document D51 Activity energy compatibility v20 handoff`

## Required checks

Final run step results:

- Checkout frozen D51 producer — **PASS**
- Verify exact frozen head — **PASS**
- Apply QA-only v20 fixture corrections — **PASS**
- Verify production worktree remains frozen — **PASS**
- Node setup — **PASS**
- `npm ci` — **PASS**
- `npm run typecheck` — **PASS**
- `npm run validate` — **PASS**
- `npm run build` — **PASS**
- D51 exact-head focused regressions — **PASS**

Validation output:

`Content OK: 83 packs, 332 events, 42 actions, 25 endings.`

Build output:

`Built renderer, content catalog and desktop save validator.`

Focused executable test summary:

- tests: **58**
- pass: **58**
- fail: **0**

Focused command covered:

- `tests/secret-debt-activity-energy-compat-v20.test.ts`
- `tests/secret-debt-full-route-v12.test.ts`
- `tests/night-flow.test.ts`
- `tests/activity.test.ts`

This covers the requested:
- v20 T1-T11 matrix;
- NightFlow save/reload adjacency;
- next-day modifier provenance/tag persistence;
- Activity 2-Energy entry regressions;
- Secret Debt v12 focused regression.

## QA-only fixture correction

The first executable exact-head run exposed two defects in the frozen **test fixture**, not in production behavior:

1. `setBound()` manually created `secretDebt.status='bound'` but did not mark the already-delivered `secret-debt.trap-activation` event in history. On the next StartDay, that mandatory scene appeared and blocked several Activity assertions with:
   `Сначала завершите текущую сцену.`

2. T7 had already been updated to use the real D19 timing:
   - `acceptedDay=0`
   - `trapDay=10`
   - preceding day = 9

   but still asserted the stale old synthetic value `boundDay=1` instead of the real `boundDay=10`.

The final QA workflow corrects only those fixture assumptions **after** checking out frozen v20.

It then executes:

`git diff --exit-code -- src/core content`

before install/typecheck/validate/build/tests.

That production-worktree guard passed.

Therefore the final green run verifies frozen v20 production code without modifying:
- `src/core`;
- `content`;
- Secret Debt behavior;
- Activity behavior;
- D44;
- D36;
- lodging;
- Palace;
- Strong Meta.

The frozen producer branch itself was never mutated.

## Earlier QA runs

### Run 1

- run ID: **37205334113**
- job ID: **111445235382**
- conclusion: failure before install/tests

Cause:
- self-hosted Windows runner did not provide `pwsh`;
- exact frozen checkout itself succeeded;
- verification shell was corrected to Windows PowerShell on the QA branch.

### Run 2

- run ID: **37205373904**
- job ID: **111445351247**
- typecheck: PASS
- validate: PASS
- build: PASS
- focused suite: 51 pass / 7 fail

All seven failures were explained by the two frozen v20 fixture defects above:
- T1, T2, T3, T6, T9, T11 were blocked by the synthetic missing trap-event history;
- T7 expected stale `boundDay=1`.

No production failure was identified.

### Run 3

- run ID: **37205501396**
- job ID: **111445731393**
- exact frozen production checkout: PASS
- production tree unchanged: PASS
- typecheck: PASS
- validate: PASS
- build: PASS
- focused executable suite: **58/58 PASS**

This is the authoritative v21 QA result.

## Scope compliance

No full CI was run.

No production behavior was changed.

No commit was added to the frozen v20 producer branch.

Only the QA branch contains:
- task/pointer coordination;
- the exact-head workflow;
- QA-only fixture correction logic;
- this handoff.

## Disposition

**READY_FOR_CHAT2_ASSEMBLY**
