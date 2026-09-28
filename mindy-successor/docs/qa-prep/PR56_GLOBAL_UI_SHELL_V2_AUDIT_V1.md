# PR56 global UI shell v2 audit v1

Status: COMPLETE / GREEN_POST_MERGE_MAIN

PR:
- #56 `Lead: finish remaining global UI shell RU EN wiring`
- base: `295e6fc74d235f0b7555794555a18373451e8b7e`
- accepted exact head: `fb008084613e384582a25a01925d4abdaf6a184d`
- merge SHA: `4223be1f90f15a43938e072bc2171b0de5d2d1aa`

Current main at audit:
`4223be1f90f15a43938e072bc2171b0de5d2d1aa`.

## Exact fixture and root-key delta

Production fixture:
`content/global-ui-shell-localization-production-v2.fixture.json`.

Blob:
`7ea21b3c69c4bd87b1670d950443718fe17001b4`.

Fixture strings:
`108`.

All 108 have:
- non-empty RU;
- non-empty EN.

Against PR56 base root localization:
- fixture keys already present: 34;
- fixture keys newly added: 74;
- changed pre-existing root values: 0.

Root localization count:
- before PR56: 556;
- after PR56: 630.

Therefore PR56 adds exactly:
`74`
new root keys while reusing the 34 already-shipped identical keys.

## Endurance-label reuse

The fixture explicitly declares:
`ui.activity.enduranceLabel -> stat.endurance.label`.

PR56 does not create:
`ui.activity.enduranceLabel`.

Current root retains:
`stat.endurance.label = Выносливость / Endurance`.

Current Activity UI consumes the existing stat key.

This is correct reuse rather than duplicate ownership.

## Visible scope

PR56 localizes presentation for:
- character creation;
- season HUD labels;
- menu/export/import/editor/animation/restart shell;
- confirmation prompts;
- save/import/recovery/startup status/error wrappers;
- generic Activity eyebrow/progress/checkpoint/route labels;
- missing-media fallback;
- structured condition explanation grammar/state words.

The patch does not rename gameplay IDs or condition objects.

## Presentation-only boundary

PR diff changes:
- localization fixture;
- root localization;
- `src/ui/app.ts`;
- localization regression;
- UI regression.

No gameplay pack/definition change.

No engine/Save-schema change.

No condition object/effect/economics/RNG/NightFlow/Activity mechanics change.

Fixture invariants explicitly state:
- presentationOnly = true;
- gameplayIdsIncluded = false;
- mechanicsFieldsIncluded = false;
- changesSaveState = false.

## Exact-head CI

Workflow:
- run #103;
- id `36404317477`;
- SUCCESS.

Validator:
- 17 packs;
- 46 events;
- 35 actions;
- 9 endings.

Tests:
- 347 total;
- 347 pass;
- 0 fail.

Relevant PASS:
- `remaining global UI shell v2 production fixture is fully merged RU EN`;
- `remaining global UI shell v2 wires high-value player-facing consumers`;
- `global UI shell v2 remains presentation-only`;
- `renderer: remaining UI shell v2 localizes creation menu and season without save drift`;
- `renderer: Activity shell v2 localizes labels without gameplay drift`.

## Post-merge CI

Main push:
- run #104;
- id `36404479571`;
- head `4223be1f90f15a43938e072bc2171b0de5d2d1aa`;
- SUCCESS;
- validator 17/46/35/9;
- 347/347 tests.

The same PR56 domain regressions pass post-merge.

## Gameplay / Save invariance

Executable UI smokes prove locale-only switching preserves serialized gameplay Save for:
- creation/menu/season;
- active Forest Activity shell.

Full current suite also retains:
- Activity mechanics;
- typed conditions;
- save/reload;
- NightFlow;
- School;
- poverty;
- journalRefs/outcomeRef
regressions.

No gameplay count drift occurs.

## Verdict

`GREEN_POST_MERGE_MAIN`.

PR56 ships the reviewed 108-key shell fixture as exactly 74 new root keys + 34 reused existing keys, reuses `stat.endurance.label`, and preserves gameplay/Save behavior.
