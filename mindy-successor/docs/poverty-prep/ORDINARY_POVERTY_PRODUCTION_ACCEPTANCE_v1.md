# Ordinary Poverty Production Acceptance v1

Status: worker acceptance evidence for Queue items 87–93.

Evidence head audited:
`10a9a134d1eab01b8a127d7907df35365da725ed`

This document distinguishes executed structural validation from tests/commands that were only authored.

## Artifacts under review

Production packs:
- `content/packs/poverty-street-production.json`;
- `content/packs/poverty-cheap-production.json`.

Targeted tests:
- `tests/poverty-street-production.test.ts`;
- `tests/poverty-street-reload.test.ts`;
- `tests/poverty-street-seasonal.test.ts`;
- `tests/poverty-street-content-anti-softlock.test.ts`;
- `tests/poverty-cheap-production.test.ts`.

Presentation draft:
- `content/presentation-drafts/ordinary-poverty-v1.json`.

Tuning ledger:
- `docs/poverty-prep/ORDINARY_POVERTY_INITIAL_TUNING_LEDGER_v1.md`.

## Validation actually performed in this worker session

### Git/GitHub structural artifact audit

Result:
**PASS**.

Executed checks:
- fetched and JSON-parsed both production packs;
- fetched and JSON-parsed the presentation draft;
- fetched all targeted test sources;
- compared the item-87 baseline commit against the audited head;
- verified no shared engine/schema/definitions file was changed by items 87–93.

Changed files from the item-87 baseline are exactly the new ordinary-poverty files listed by this wave.

### Street pack structure

Result:
**PASS**.

Verified directly from the production JSON:
- three event families exist;
- all event IDs are inside the `poverty-street-production.*` namespace;
- every event uses typed `housingTier=street`;
- every event is triggered from NightFlow `after_lodging`;
- event families are authored as:
  - helpful summer;
  - neutral autumn;
  - winter pressure;
- no Secret Debt/lender content or state reference appears in the pack;
- the negative-pressure family retains a no-effect/free safe resolution;
- only existing target effects are used:
  - `modifyResource`;
  - `addNextDayModifier`.

### Cheap-lodging pack structure

Result:
**PASS**.

Verified:
- one authored cheap-lodging context family exists;
- it uses typed `housingTier=cheap`;
- it uses NightFlow `after_lodging`;
- it contains no Secret Debt/lender content;
- it adds no new numeric penalty or lodging-price change;
- it uses existing `stage.room` media.

### Presentation fallback structure

Result:
**PASS** for static structural mapping.

Verified:
- four presentation slots correspond to the actual item-87/91 event identities;
- street slots use existing shipped `assets/stage-outside.svg`;
- cheap-lodging slot uses existing shipped `assets/stage-room.svg`;
- those asset paths are already referenced by shipped `stage.json` media;
- no `primary` GIF override is present;
- no invented GIF path is present;
- every slot retains `location/town/default` fallback.

### Test-contract source audit

Result:
**PASS as source/contract audit only**.

Verified the authored test sources contain coverage for:
- natural `EndDay -> lodging.street` reachability;
- reload through `parseSave`;
- pending variant stability;
- one calendar advance assertion;
- event history/cooldown persistence;
- spring/summer/autumn/winter seasonal routing coverage;
- zero-money anti-softlock setup;
- real `lumber.shift` recovery action;
- cheap-lodging reload coverage.

This confirms the intended assertions are present in source. It does **not** prove those tests executed successfully.

## Official content validation

`npm run validate`:
**NOT EXECUTED in this worker environment.**

Therefore:
- official loader/content-validation PASS is **not claimed**;
- schema compatibility is currently supported only by source-level structural audit against the fetched current loader/schema contracts.

## Targeted runtime tests

Targeted tests from items 87–91:
**AUTHORED, NOT EXECUTED in this worker environment.**

No runtime PASS is claimed for:
- natural street event execution;
- reload behavior;
- modifier exactly-once behavior;
- seasonal execution;
- anti-softlock execution;
- cheap-lodging execution.

Those remain pending exact-head test execution after selective integration or CI.

## Full check

`npm run check`:
**NOT EXECUTED in this worker environment.**

No full-suite count or PASS is claimed.

## GitHub Actions

Workflow query for audited head:
`10a9a134d1eab01b8a127d7907df35365da725ed`

Result:
**no workflow runs attached to this commit**.

Therefore no CI result is claimed for this worker head.

## Natural reachability acceptance status

Contract authored:
**YES**.

Runtime-executed proof in this worker session:
**NO**.

The production test source reaches street content through:
`EndDay -> chooseLodging(lodging.street) -> pending production street event`

without injecting pending event state.

The cheap-lodging test likewise uses normal NightFlow lodging selection.

Exact runtime confirmation remains pending test execution.

## Reload acceptance status

Contract authored:
**YES**.

Runtime-executed proof in this worker session:
**NO**.

Tests cover:
- pending event/variant reload;
- committed modifier reload;
- event-history persistence;
- cooldown persistence;
- cheap-lodging pending scene reload.

## Anti-softlock acceptance status

Contract authored:
**YES**.

Runtime-executed proof in this worker session:
**NO**.

The test source:
- starts with zero money;
- naturally chooses street lodging;
- selects the most negative authored ordinary street choice by inspecting the pack;
- completes Night;
- requires next-day Energy >= 1;
- dispatches real `lumber.shift`;
- does not require Secret Debt.

This is intentionally aligned with the poverty anti-softlock contract merged on main, but exact-head execution is still required after integration.

## Initial tuning boundary

The following are explicitly **INITIAL_TUNING**, not Product locks:
- helpful money reward;
- winter extra Energy pressure;
- event cooldowns;
- max-show counts;
- within-class priorities;
- seasonal assignment/distribution;
- deterministic occurrence within the current authored season/context;
- cheap-lodging contextual frequency.

See:
`ORDINARY_POVERTY_INITIAL_TUNING_LEDGER_v1.md`.

## Secret Debt boundary

Secret Debt is explicitly absent from this production slice.

Items 87–93 do not add:
- lender offer;
- debt state;
- delayed activation;
- hidden Slave career;
- forced Secret Debt Night;
- Secret Debt outcomes;
- Secret Debt Meta rewards.

## Acceptance conclusion

Current worker evidence supports:
- **STRUCTURAL_AUDIT_PASS** for items 87–93;
- targeted acceptance tests are present in source;
- static presentation fallback mapping is structurally consistent with shipped media.

Current worker evidence does **not** support:
- official content-validator PASS;
- targeted runtime-test PASS;
- full-suite PASS;
- exact-head CI PASS.

Lead should selectively integrate these files onto a fresh branch based on current main and require exact-head CI before treating the production slice as green.
