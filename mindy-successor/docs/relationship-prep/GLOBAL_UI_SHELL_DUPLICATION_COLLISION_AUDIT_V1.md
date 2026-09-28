# Global UI Shell Duplication / Collision Audit v1

Date: 2026-09-28
Owner: Chat 5
Exact post-PR52 main baseline: `5dffefd15703d431a604b4cc9f831c4e55460aed`
Fixture audited: `content/global-ui-shell-localization-v2.fixture.json`

## Summary

| Classification | Count |
|---|---:|
| ADDITIVE | 103 |
| IDENTICAL | 5 |
| REUSE_EXISTING | 1 |
| CONFLICT | 0 |
| **Total** | **109** |

## Full classification

| Item-105 key | Classification | Reason / existing key |
|---|---|---|
| `season.autumn.label` | ADDITIVE | key absent from root |
| `season.spring.label` | ADDITIVE | key absent from root |
| `season.summer.label` | ADDITIVE | key absent from root |
| `season.winter.label` | ADDITIVE | key absent from root |
| `ui.activity.checkpointLabel` | ADDITIVE | key absent from root |
| `ui.activity.enduranceLabel` | REUSE_EXISTING | exact semantic/value match candidate: `stat.endurance.label` |
| `ui.activity.eyebrow` | ADDITIVE | key absent from root |
| `ui.activity.progressLabel` | ADDITIVE | key absent from root |
| `ui.activity.routeLabel` | ADDITIVE | key absent from root |
| `ui.app.catalogLoadFailed` | ADDITIVE | key absent from root |
| `ui.app.startFailed` | ADDITIVE | key absent from root |
| `ui.arrival.body` | ADDITIVE | key absent from root |
| `ui.arrival.button` | ADDITIVE | key absent from root |
| `ui.arrival.title` | ADDITIVE | key absent from root |
| `ui.bag.debtLabel` | ADDITIVE | key absent from root |
| `ui.bag.empty` | ADDITIVE | key absent from root |
| `ui.bag.title` | ADDITIVE | key absent from root |
| `ui.condition.andSeparator` | ADDITIVE | key absent from root |
| `ui.condition.calendarDayInYear` | ADDITIVE | key absent from root |
| `ui.condition.calendarElapsedDays` | ADDITIVE | key absent from root |
| `ui.condition.calendarYear` | ADDITIVE | key absent from root |
| `ui.condition.careerChoice` | ADDITIVE | key absent from root |
| `ui.condition.careerCounter` | ADDITIVE | key absent from root |
| `ui.condition.careerFact` | ADDITIVE | key absent from root |
| `ui.condition.careerShifts` | ADDITIVE | key absent from root |
| `ui.condition.careerStage` | ADDITIVE | key absent from root |
| `ui.condition.flagFalse` | ADDITIVE | key absent from root |
| `ui.condition.flagTrue` | ADDITIVE | key absent from root |
| `ui.condition.housingTier` | ADDITIVE | key absent from root |
| `ui.condition.itemCapability` | ADDITIVE | key absent from root |
| `ui.condition.metaEndingCompleted` | ADDITIVE | key absent from root |
| `ui.condition.metaHardWork` | ADDITIVE | key absent from root |
| `ui.condition.metaUnlock` | ADDITIVE | key absent from root |
| `ui.condition.not` | ADDITIVE | key absent from root |
| `ui.condition.orSeparator` | ADDITIVE | key absent from root |
| `ui.condition.questChoice` | ADDITIVE | key absent from root |
| `ui.condition.questCounter` | ADDITIVE | key absent from root |
| `ui.condition.questFact` | ADDITIVE | key absent from root |
| `ui.condition.questStage` | ADDITIVE | key absent from root |
| `ui.condition.relationshipChoice` | ADDITIVE | key absent from root |
| `ui.condition.relationshipCounter` | ADDITIVE | key absent from root |
| `ui.condition.relationshipFact` | ADDITIVE | key absent from root |
| `ui.condition.relationshipStage` | ADDITIVE | key absent from root |
| `ui.condition.state.absent` | ADDITIVE | key absent from root |
| `ui.condition.state.completed` | ADDITIVE | key absent from root |
| `ui.condition.state.finished` | ADDITIVE | key absent from root |
| `ui.condition.state.no` | ADDITIVE | key absent from root |
| `ui.condition.state.notCompleted` | ADDITIVE | key absent from root |
| `ui.condition.state.notFinished` | ADDITIVE | key absent from root |
| `ui.condition.state.present` | ADDITIVE | key absent from root |
| `ui.condition.state.yes` | ADDITIVE | key absent from root |
| `ui.condition.visits` | ADDITIVE | key absent from root |
| `ui.condition.worldFact` | ADDITIVE | key absent from root |
| `ui.confirm.acceptEnding` | ADDITIVE | key absent from root |
| `ui.confirm.loadSave` | ADDITIVE | key absent from root |
| `ui.confirm.restart` | ADDITIVE | key absent from root |
| `ui.creation.body` | ADDITIVE | key absent from root |
| `ui.creation.decreaseStatAria` | ADDITIVE | key absent from root |
| `ui.creation.eyebrow` | ADDITIVE | key absent from root |
| `ui.creation.freePoints` | ADDITIVE | key absent from root |
| `ui.creation.heroineTitle` | ADDITIVE | key absent from root |
| `ui.creation.increaseStatAria` | ADDITIVE | key absent from root |
| `ui.creation.startButton` | ADDITIVE | key absent from root |
| `ui.creation.title` | ADDITIVE | key absent from root |
| `ui.explore.activityHelp` | ADDITIVE | key absent from root |
| `ui.explore.enterButton` | ADDITIVE | key absent from root |
| `ui.explore.entryEnergy` | ADDITIVE | key absent from root |
| `ui.explore.errandsSummary` | ADDITIVE | key absent from root |
| `ui.explore.title` | ADDITIVE | key absent from root |
| `ui.generic.closeButton` | ADDITIVE | key absent from root |
| `ui.generic.dismissButton` | ADDITIVE | key absent from root |
| `ui.generic.selectButton` | ADDITIVE | key absent from root |
| `ui.journal.empty` | ADDITIVE | key absent from root |
| `ui.legacy.acceptButton` | ADDITIVE | key absent from root |
| `ui.legacy.emptyInheritance` | ADDITIVE | key absent from root |
| `ui.legacy.help` | ADDITIVE | key absent from root |
| `ui.legacy.inheritanceTitle` | ADDITIVE | key absent from root |
| `ui.legacy.nextLifeButton` | ADDITIVE | key absent from root |
| `ui.media.missing` | ADDITIVE | key absent from root |
| `ui.menu.animationOff` | ADDITIVE | key absent from root |
| `ui.menu.animationOn` | ADDITIVE | key absent from root |
| `ui.menu.animationToggle` | ADDITIVE | key absent from root |
| `ui.menu.editor` | ADDITIVE | key absent from root |
| `ui.menu.exportSave` | ADDITIVE | key absent from root |
| `ui.menu.footer` | ADDITIVE | key absent from root |
| `ui.menu.importSave` | ADDITIVE | key absent from root |
| `ui.menu.restart` | ADDITIVE | key absent from root |
| `ui.panel.journal` | IDENTICAL | same key, exact RU+EN |
| `ui.panel.legacy` | IDENTICAL | same key, exact RU+EN |
| `ui.panel.stats` | IDENTICAL | same key, exact RU+EN |
| `ui.presentation.customLoadFailed` | ADDITIVE | key absent from root |
| `ui.presentation.saved` | ADDITIVE | key absent from root |
| `ui.result.chooseLodging` | ADDITIVE | key absent from root |
| `ui.result.returnTown` | IDENTICAL | same key, exact RU+EN |
| `ui.save.backupRecovered` | ADDITIVE | key absent from root |
| `ui.save.fileTooLarge` | ADDITIVE | key absent from root |
| `ui.save.importFailed` | ADDITIVE | key absent from root |
| `ui.save.loaded` | ADDITIVE | key absent from root |
| `ui.save.loadStopped` | ADDITIVE | key absent from root |
| `ui.save.noHealthyBackup` | ADDITIVE | key absent from root |
| `ui.sleep.help` | ADDITIVE | key absent from root |
| `ui.sleep.startButton` | ADDITIVE | key absent from root |
| `ui.sleep.title` | ADDITIVE | key absent from root |
| `ui.stats.help` | ADDITIVE | key absent from root |
| `ui.stats.professionsHelp` | ADDITIVE | key absent from root |
| `ui.stats.professionsTitle` | ADDITIVE | key absent from root |
| `ui.town.eyebrow` | IDENTICAL | same key, exact RU+EN |
| `ui.work.recipeFast` | ADDITIVE | key absent from root |
| `ui.work.recipeReliable` | ADDITIVE | key absent from root |

## REUSE_EXISTING decision

`ui.activity.enduranceLabel` is absent under that exact key, but its RU+EN pair is exact-identical to existing:

`stat.endurance.label`

Recommended Lead wiring:
- reuse `stat.endurance.label` for the active Activity endurance label;
- do not add `ui.activity.enduranceLabel` unless a separate shell-specific semantic key is intentionally preferred.

This is a presentation-key deduplication only. The Activity endurance gameplay field remains unchanged.

## IDENTICAL policy

The five IDENTICAL keys are already in root under the exact same keys and values. Do not re-add or replace them:
- `ui.panel.stats`
- `ui.panel.journal`
- `ui.panel.legacy`
- `ui.town.eyebrow`
- `ui.result.returnTown`

## ADDITIVE policy

The ADDITIVE keys may be selectively merged after exact-head recheck. They carry only RU+EN presentation strings and placeholders.

## Conflict result

No item-105 key conflicts with root localization on the audited post-PR52 main.

## Boundary

No root file is edited here. No gameplay IDs, mechanics, Save, RNG, condition objects, NightFlow, events, careers or endings are changed.
