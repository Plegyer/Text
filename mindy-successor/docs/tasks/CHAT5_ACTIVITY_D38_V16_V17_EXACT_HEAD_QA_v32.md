# Chat 5 — Activity D38 v16 / v17 Exact-Head QA v32

Status: **EXACT-HEAD CLASSIFIED — D38 MECHANICS/CONTENT ACCEPTED WITH REQUIRED v19 BASELINE REPAIR + v36 COPY OVERRIDE**  
Owner: Chat 5  
Branch: `chat5/activity-exact-head-qa-bundle-v31`

No frozen producer was modified.  
No full CI was run.

## Frozen sources

D38 mechanics:

`chat3/activity-ending-family-producer-v16-r1@3cf69d7cb3df1a58d68908159d0acc14736435c4`

Documented v16 implementation head:

`884bc0fb2155af4f7508f69db7aea8fc6dbfcd37`

D38 final content/presentation:

`chat3/activity-ending-content-presentation-v17@df9ef5c3d04cfd8eb582c24838d971854e984218`

Documented v17 implementation head:

`5306fbf4c72caed42291e62f2eecba3e6e348d2c`

Independent comparisons prove:

- v16 implementation -> final frozen v16 adds only `CHAT3_ACTIVITY_ENDING_FAMILY_PRODUCER_v16.md`;
- v17 implementation -> final frozen v17 adds only `CHAT3_ACTIVITY_ENDING_CONTENT_PRESENTATION_v17.md`.

No prototype/runtime/content mutation occurs after either implementation head.

---

# 1. Strict exact-head QA

Workflow:

`Chat 5 Activity v31-v32 exact-head QA`

Run:

`37464942972`

## v16 mechanics job

Job:

`112273514687`

Verified exact checkout:

`3cf69d7cb3df1a58d68908159d0acc14736435c4`

Results:

- exact SHA guard PASS;
- `npm ci` PASS;
- typecheck FAIL;
- later strict steps skipped.

Exact blocker:

`tests/item-capability-activity-closure.test.ts(124,23)`

missing required synthetic option:

`effects: []`

## v17 content/presentation job

Job:

`112273514932`

Verified exact checkout:

`df9ef5c3d04cfd8eb582c24838d971854e984218`

Results:

- exact SHA guard PASS;
- `npm ci` PASS;
- typecheck FAIL;
- later strict steps skipped.

Exact blocker is identical:

`tests/item-capability-activity-closure.test.ts(124,23)`

missing `effects: []`.

This is inherited from the v15 cumulative baseline and is not introduced by v16 or v17.

---

# 2. Diagnostic exact-head QA

A split diagnostic run executed validate/build/focused tests independently of the known typecheck blocker.

Run:

`37465988551`

## v16 diagnostic

Job:

`112277017015`

Exact checkout:

`3cf69d7cb3df1a58d68908159d0acc14736435c4`

Results:

- SHA guard PASS;
- `npm ci` PASS;
- `npm run validate` — FAIL;
- `npm run build` — **PASS**;
- focused selection — **14 PASS / 2 FAIL**.

Validation blocker:

`read worldFact activity.forest-frontier.result.research-grade`

is undeclared in the inherited Forest capability manifest.

The two failed test files are:

- `activity-ending-family-v16.test.ts`;
- `restricted-sites-production-v15.test.ts`.

Both stop at catalog construction on the same manifest error.

The `ending-meta.test.ts` portion executes green inside this selection.

There is no evidence of a D38 eligibility/commit assertion failure after a valid catalog loads; the exact head simply cannot construct that catalog before the accepted repair.

## v17 diagnostic

Job:

`112277016569`

Exact checkout:

`df9ef5c3d04cfd8eb582c24838d971854e984218`

Results:

- SHA guard PASS;
- `npm ci` PASS;
- `npm run validate` — FAIL;
- `npm run build` — **PASS**;
- selected content/presentation bundle — **0 PASS / 4 file-level FAIL**.

All four selected files stop at catalog construction on the same inherited missing Forest read:

- `activity-ending-content-presentation-v17.test.ts`;
- `activity-ending-family-v16.test.ts`;
- `presentation-ending-parity-v9.test.ts`;
- `presentation-source-integrity-v9.test.ts`.

This is one upstream catalog blocker, not four independent D38 content regressions.

---

# 3. Accepted baseline repair

Required repair authority:

`chat4/activity-camp-baseline-repair-v19@efde0a38bf71a8946194402a9fc47abb168f2aff`

Green evidence:

- run `37206785081`;
- job `111449513323`;
- exact SHA guard PASS;
- typecheck PASS;
- validate PASS;
- build PASS;
- focused cumulative Activity/Camp/migration/region/NightFlow **107/107 PASS**.

v19 fixes exactly the inherited baseline classes exposed by v31/v32:

- missing `effects: []` in the synthetic capability test;
- missing Forest capability-manifest reads, including:
  - `activity.forest-frontier.result.research-grade`;
  - subsequently exposed `forest.frontier.school-reflection-recorded`;
- stale cumulative test fixtures/expectations.

v19 handoff explicitly states no Activity runtime semantic rewrite.

Therefore final D38 assembly must compose v16/v17 over the executable-green v19 baseline repair.

Do not edit the frozen v16/v17 heads merely to make their historical branch independently green.

---

# 4. D38 mechanics verified from frozen v16

Stable ending IDs:

- `ending.activity.pathfinder`
- `ending.activity.preservation`
- `ending.activity.network`

Stable Specialist IDs:

- `specialist.activity.surveyors-atlas`
- `specialist.activity.field-archive`
- `specialist.activity.contact-network`

## Common eligibility

All three require the accepted D38 baseline:

- at least 3 of 4 regional anchors;
- at least 2 distinct specialized mini-game families;
- at least one meaningful extracted Activity result;
- at least one resolved Activity contact/network thread.

Ending-specific classification counts pair:

`same-region anchor + same-region marker`

before counting that region.

A marker without its regional anchor cannot satisfy the threshold.

## Explicit ending lifecycle

The frozen v16 authored test explicitly asserts:

1. D38 conditions can become eligible;
2. run remains `active`;
3. no ending is committed automatically;
4. `commitEnding` moves to `ending_committed`;
5. a competing ending cannot be committed afterward;
6. `completeEnding` performs central completion.

This is the accepted D16 explicit-commit contract.

The historical v16 branch records reward ownership through stable unlock IDs because it predates canonical final Strong Meta assembly.

Final Activity assembly must use the later accepted v26 canonical Strong Meta binding, not preserve generic unlock ownership as a second permanent reward path.

## Firewalls

Frozen v16 asserts:

- all four Activity entries remain exactly 2 Energy;
- no D38 ending reads Palace state;
- no Activity-only Specialist bonus slot;
- normal Specialist capacity remains 2;
- rewards are selectable, not automatic.

There is no Palace substitution.

---

# 5. Final v17 content / presentation contract

v17 does not change D38 mechanics.

The v16 -> v17 production delta is limited to:

- D38 fallback title/description/epilogue fields;
- localization;
- three presentation slots;
- missing-dedicated-asset manifest;
- localized ended-screen epilogue consumer;
- focused test.

No core engine/schema/Hard Work/presentation runtime change is introduced.

## Final presentation slots

- `ending/activity/pathfinder`
- `ending/activity/preservation`
- `ending/activity/network`

Accepted safe reuse:

- Pathfinder -> `assets/presentation/forest-route-default-v1.svg`
- Preservation -> `assets/stage-town.svg`
- Network -> `assets/stage-town.svg`

Dedicated ending art remains optional/missing and must not become a mechanics blocker.

## RU / EN

v17 provides bilingual:

- title;
- description;
- epilogue;
- Specialist label/functional description;
- presentation alt/caption.

The accepted UI seam renders completed-ending body via localized:

`ending.<stable-ending-id>.epilogue`

with definition epilogue only as fallback.

Chat 2 must preserve this seam when composing later app.ts changes.

---

# 6. Activity Network epilogue is superseded by Chat 6 v36

The v17 Network epilogue contains an unconditional claim about connecting four directions.

Chat 6 v35 correctly classified that as stronger than the accepted Network mechanics, which can complete on a 3-of-4 common baseline.

Accepted correction producer:

`2f8f291a7e03bcf1677d6f51feaec28fe98e29ba`

Final Chat 6 bundle head:

`chat6/activity-network-copy-fix-v36@750999ce1ab17b6e0f1ed1083349fcb8350548ed`

The producer changes exactly one localization key:

`ending.ending.activity.network.epilogue`

Final authoritative RU:

`Контакты связывают разрозненные направления в единое рабочее пространство.`

Final authoritative EN:

`The contacts tie disconnected routes into one practical working network.`

No key is added or removed.

No mechanics, definitions, reward, gate or presentation object changes.

The v36 focused test fingerprints the frozen Network mechanics and requires them unchanged.

Assembly order:

1. v16 mechanics;
2. v17 content/presentation;
3. v36 one-key Network epilogue correction.

Do not reintroduce the v17 predecessor Network epilogue after v36.

---

# 7. What v32 does and does not prove

It proves exact provenance and classifies the historical branch failures.

It does **not** claim v16/v17 are independently executable-green.

They are not, because their cumulative v15 base predates the accepted v19 repairs.

The source-specific D38 mechanics/content are still accepted because:

- implementation->final boundaries are docs-only;
- build succeeds on both exact heads;
- failures occur before D38 assertions at the same inherited catalog blocker;
- v19 later makes the cumulative baseline typecheck/validate/build/focused green without Activity runtime semantic changes;
- v16/v17 have independent static audits from their producer handoffs;
- final assembly already requires v19 before D38.

Chat 2 must execute the v16/v17 focused tests again on the **assembled repaired baseline**.

---

# 8. Required Chat 2 focused re-run

After composing:

- v15 region source;
- v19 baseline repair;
- v16 mechanics;
- v17 content/presentation;
- v26 canonical reward runtime;
- v27 tags;
- v36 Network copy fix;

run at minimum:

- `activity-ending-family-v16.test.ts`;
- `activity-ending-content-presentation-v17.test.ts`;
- `activity-network-copy-fix-v36.test.ts`;
- current presentation ending parity/source-integrity tests;
- D38 v26 canonical Strong Meta suite.

All must pass on one assembled catalog.

---

# 9. Stop conditions

Stop final Activity assembly if:

- a D38 ending auto-commits;
- common 3-of-4 / two-mini-game / extraction / contact baseline drifts;
- marked-anchor pairing is weakened;
- Palace/Hard Work/Secret Debt becomes a D38 requirement or substitute;
- any Activity entry cost changes from 2 Energy;
- a free Activity-only Specialist slot appears;
- generic historical v16 unlock ownership remains beside canonical v26 Strong Meta ownership;
- v17 presentation changes mechanics;
- localized ended-screen epilogue seam is lost;
- v17 four-direction Network epilogue overwrites v36;
- v36 changes anything except the one localization value;
- final assembled typecheck/validate/build or v16/v17/v36 focused checks fail.

---

# 10. Disposition

Frozen v16/v17 exact heads are historically blocked by the same pre-existing v15 baseline defects already repaired by accepted v19.

No D38-specific regression was discovered by the independent exact-head review.

The accepted D38 mechanics/content remain valid for selective assembly with:

- v19 baseline repair;
- v26 canonical reward binding;
- v36 final Network epilogue correction.

**READY FOR CHAT2 ASSEMBLY ON THE REPAIRED BASELINE**
