# Forest + Poverty Current-Main Integration Ledger v1

Status: Chat 3 item 148 current-main integration ledger after PR42/PR43.

Current `main` observed at:
`23a8798f77c42e84a7540d71fdffd69d9db9fbfd`.

This ledger records shipped state versus selective-integration work. It does not reopen locked gameplay decisions.

## Forest result bilingual production

Status:
**SHIPPED**.

PR #43:
- merged;
- merge commit `326c7d495720147f17b40056369987f515363899`;
- exact-head CI recorded in current project handoff as 299/299 PASS.

Shipped on current `main`:
- `forest-result-content-bilingual-v2.json`;
- exact success / escape / failure reaction identities;
- RU+EN Forest result localization;
- RU+EN Forest Activity/route labels;
- generic event title/body/choice localization consumption;
- media alt localization consumption;
- unchanged locale-neutral pending gameplay identity.

Exact result boundaries remain:

- `activityResult(lumber.forest, success, lumber.forest.success)`;
- `activityResult(lumber.forest, escape, lumber.forest.escape)`;
- `activityResult(lumber.forest, failure, lumber.forest.failure)`.

Lumber Hard Work remains:
- eligibility ONLY `completed_shifts >= 50`;
- reward `hardWork:lumber`.

Chat 3 item 146 adds a further natural-path regression on the worker branch. It is not yet part of current `main`.

## Remaining Forest authored routes / challenges

### Production-ready or already bounded

`forest.route.logging-road`
- gameplay route ID already shipped;
- route label RU+EN shipped via PR43;
- authored route prose exists on Chat 3 branch;
- safe for further presentation integration without changing mechanics.

`forest.route.old-boundary`
- gameplay route ID already shipped;
- current gate remains `enter_old_boundary`;
- route label RU+EN shipped via PR43;
- authored route prose exists;
- safe only for presentation expansion that does not invent token acquisition/use semantics.

### STAGED

Forest challenge families:
- navigation;
- physical obstacle;
- interpretation/ritual anomaly.

Authored RU+EN content exists, but production challenge IDs, route bindings, checks/effects and rewards are not fully shipped. These remain **STAGED**, not production-complete.

Seasonal Forest topology/content is likewise authored but not a complete production topology.

### PRODUCT-BLOCKED

Hunter trail remains Product-blocked for final:
- production option identity;
- clue/capability identity;
- provider/source;
- threshold/reward where applicable.

Old Boundary Token remains Product-blocked for:
- reachable acquisition source;
- price if any;
- retain/consume/turn-in policy;
- deeper-use semantics.

Do not infer those values from localization or authored prose.

## Ordinary poverty gameplay production

Status:
**SHIPPED**.

PR #37 ordinary-poverty production remains current gameplay authority for:
- street;
- cheap lodging;
- recovery/help;
- pressure/bad-luck.

Six production packs are shipped and ordinary poverty remains independently playable without Secret Debt.

No localization task in items 136–145 changes:
- money;
- Energy;
- housing;
- NightFlow;
- cooldowns;
- choice effects;
- next-day modifiers;
- event history.

## Ordinary poverty RU+EN delta

Current `main` localization status:
**NOT YET SHIPPED**.

Observed current `content/localization.json`:
- ordinary-poverty localization keys: **0**.

Ready on Chat 3 worker branch:
- `content/poverty-localization-main-delta-v1.fixture.json`;
- 82 event text keys;
- 2 current media alt keys;
- 84 total RU+EN entries;
- explicit empty fallback debt;
- no gameplay fields;
- no Secret Debt.

Supporting ready artifacts:
- `tests/poverty-localization-main-delta-v1.test.ts`;
- `content/poverty-event-localization-key-map-v1.fixture.json`;
- `docs/poverty-prep/ORDINARY_POVERTY_UI_COPY_RU_EN_v1.md`;
- `docs/poverty-prep/POVERTY_LOCALIZATION_NATURAL_PATH_REGRESSION_v1.md`;
- `docs/poverty-prep/ORDINARY_POVERTY_LOCALIZATION_INTEGRATION_HANDOFF_v5.md`.

Disposition:
**READY_FOR_SELECTIVE_INTEGRATION**.

## Multi-GIF runtime and assets

Runtime status:
**SHIPPED**.

PR #42:
- merged;
- merge commit `55adc69dcda4c41c71548cd146756896fa5976d0`;
- current handoff records exact-head 295/295 PASS.

Runtime supports:
- 3–5 GIF candidates per semantic presentation slot;
- deterministic presentation-only selection;
- no gameplay RNG;
- reload-stable candidate choice;
- locale switch keeping the same selected candidate;
- static fallback.

Current main asset state:
- `content/presentation.json` has no active slots;
- repository contains no shipped `.gif` files under the prototype asset directory;
- `assets/stage-outside.svg` and `assets/stage-room.svg` are real shipped generic static fallbacks.

Therefore:
- multi-GIF runtime = **SHIPPED**;
- bespoke Forest/poverty GIF art = **NOT SHIPPED**;
- Chat 3 ordinary-poverty multi-GIF fixture = **STAGING_ONLY**;
- placeholder GIF paths must not be counted as real assets.

Candidate-specific RU/EN alt wiring remains a shared presentation/UI integration concern because current pool candidates expose `candidateKey` while current generic media-alt localization resolves catalog `mediaId`.

## Secret Debt

Status:
**AUTHORED_ONLY / PRODUCT-BLOCKED_MECHANICS**.

Ready authored material exists for:
- RU+EN lender/work/Night content;
- RU+EN outcome families;
- machine-readable bilingual fixture;
- bilingual multi-GIF map.

Still OPEN and must not be guessed:
- lender probability;
- principal;
- debt amount;
- activation delay;
- hidden-work tuning;
- forced-Night penalty;
- outcome thresholds;
- exact Meta rewards;
- any unresolved external dependency for takeover.

Locked structural rules remain:
- secret route begins from street context;
- ordinary poverty and Secret Debt are separate;
- bound state blocks 10 ordinary careers while preserving progress;
- Secret Debt is not Palace 10/10;
- outcomes remain `paid_freedom`, `bound_life`, `takeover`.

## Exact next selective-integration order

1. **Ordinary-poverty localization delta**
   - fresh branch from current `main`;
   - merge only item-140 `delta.strings` into `content/localization.json`;
   - collision-check every key.

2. **Ordinary-poverty localization contract**
   - selectively copy item 141 test;
   - use item 143 key map as identity reference;
   - run targeted tests + full check + exact-head CI.

3. **Ordinary-poverty natural-path validation**
   - execute item 145 smoke through real EndDay -> lodging -> event flow;
   - prove RU->EN changes text only.

4. **Forest natural-path regression**
   - selectively copy item 146 test onto current-main integration branch;
   - verify natural success/escape/failure reactions and reload stability.

5. **Shared Night/lodging localization gaps**
   - Lead/Chat 1 localizes remaining shared lodging labels and hardcoded Night UI;
   - no lodging ID, cost, housing tier or NightFlow change.

6. **Real multi-GIF assets**
   - integrate pools only after actual GIF files exist;
   - replace staging placeholders with real files;
   - wire candidate alt localization if required;
   - preserve existing static fallbacks.

7. **Deeper Forest content**
   - logging-road presentation can deepen first;
   - old-boundary presentation can deepen without inventing token semantics;
   - challenge production waits for exact IDs/checks/effects;
   - Hunter waits for Product decisions.

8. **Secret Debt**
   - keep authored artifacts ready;
   - activate only after Product closes each OPEN mechanic/value.

## Branch integration rule

`chat3/lumber-production-proof-next` is a long-lived divergent worker branch.

Do not merge the branch wholesale.

Lead should selectively copy exact reviewed files onto fresh branches based on current `main`, then require current-main validation and exact-head CI.

## Ledger summary

- Forest result bilingual production: **SHIPPED**.
- Forest logging-road/old-boundary presentation: **bounded / presentation-ready**.
- Deeper Forest challenges/seasons: **STAGED**.
- Hunter + Old Boundary Token unresolved semantics: **PRODUCT_BLOCKED**.
- Ordinary poverty gameplay: **SHIPPED**.
- Ordinary poverty RU+EN event/media-alt delta: **READY, NOT YET SHIPPED**.
- Multi-GIF runtime: **SHIPPED**.
- Real Forest/poverty GIF assets: **NOT SHIPPED**.
- Secret Debt: **AUTHORED_ONLY; MECHANICS PRODUCT-BLOCKED**.
