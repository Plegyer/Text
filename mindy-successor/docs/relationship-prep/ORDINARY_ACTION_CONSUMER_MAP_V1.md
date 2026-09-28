# Ordinary Action Consumer Map v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `4223be1f90f15a43938e072bc2171b0de5d2d1aa`
Fixture: `content/ordinary-action-localization-v1.fixture.json`

Every one of the 52 item-125 keys is mapped below.

| Localization key | Exact current consumer/data seam | Current fallback/source | Status |
|---|---|---|---|
| `action.arrival.description` | actionList(): tr('action.arrival.description', catalog fallback); catalog action exists but pre-arrival shell uses ui.arrival.* directly | catalog action description | CATALOG_SOURCE_READY |
| `action.arrival.label` | actionList(): tr('action.arrival.label', catalog fallback); catalog action exists but pre-arrival shell uses ui.arrival.* directly | catalog action label | CATALOG_SOURCE_READY |
| `action.arrival.scene.default.text` | engine action dispatch selects scene 'default', stores text in lastAction.text; generic result UI renders lastAction.text directly; arrival may be followed by blocking event flow | catalog scene.default.text | RESULT_CONSUMER_REQUIRED |
| `action.brew.description` | actionList(): tr('action.brew.description', catalog fallback); exact catalog action currently has no direct normal panel listing | catalog action description | CATALOG_SOURCE_READY |
| `action.brew.label` | actionList(): tr('action.brew.label', catalog fallback); exact catalog action currently has no direct normal panel listing | catalog action label | CATALOG_SOURCE_READY |
| `action.brew.recipe.fastFailure.text` | engine action dispatch: failed fast brew log() → journalRef=null | Смесь превратилась в пену… | JOURNAL_REF_REQUIRED |
| `action.brew.recipe.success.text` | engine action dispatch: successful brew log() → journalRef=null | Микстура готова… | JOURNAL_REF_REQUIRED |
| `action.brew.scene.default.text` | engine action dispatch selects scene 'default', stores text in lastAction.text; generic result UI renders lastAction.text directly | catalog scene.default.text | RESULT_CONSUMER_REQUIRED |
| `action.deliver.description` | actionList(): tr('action.deliver.description', catalog fallback); exact catalog action currently has no direct normal panel listing | catalog action description | CATALOG_SOURCE_READY |
| `action.deliver.label` | actionList(): tr('action.deliver.label', catalog fallback); exact catalog action currently has no direct normal panel listing | catalog action label | CATALOG_SOURCE_READY |
| `action.deliver.scene.default.text` | engine action dispatch selects scene 'default', stores text in lastAction.text; generic result UI renders lastAction.text directly | catalog scene.default.text | RESULT_CONSUMER_REQUIRED |
| `action.exam.description` | actionList(): tr('action.exam.description', catalog fallback); exact catalog action currently has no direct normal panel listing | catalog action description | CATALOG_SOURCE_READY |
| `action.exam.label` | actionList(): tr('action.exam.label', catalog fallback); exact catalog action currently has no direct normal panel listing | catalog action label | CATALOG_SOURCE_READY |
| `action.exam.scene.default.text` | engine action dispatch selects scene 'default', stores text in lastAction.text; generic result UI renders lastAction.text directly | catalog scene.default.text | RESULT_CONSUMER_REQUIRED |
| `action.forage.description` | actionList(): tr('action.forage.description', catalog fallback); current Explore ordinary errands | catalog action description | DIRECT_CURRENT_CONSUMER |
| `action.forage.label` | actionList(): tr('action.forage.label', catalog fallback); current Explore ordinary errands | catalog action label | DIRECT_CURRENT_CONSUMER |
| `action.forage.scene.default.text` | engine action dispatch selects scene 'default', stores text in lastAction.text; generic result UI renders lastAction.text directly | catalog scene.default.text | RESULT_CONSUMER_REQUIRED |
| `action.forest-search.description` | actionList(): tr('action.forest-search.description', catalog fallback); current Explore ordinary errands | catalog action description | DIRECT_CURRENT_CONSUMER |
| `action.forest-search.label` | actionList(): tr('action.forest-search.label', catalog fallback); current Explore ordinary errands | catalog action label | DIRECT_CURRENT_CONSUMER |
| `action.forest-search.scene.default.text` | engine action dispatch selects scene 'default', stores text in lastAction.text; generic result UI renders lastAction.text directly | catalog scene.default.text | RESULT_CONSUMER_REQUIRED |
| `action.landlord.description` | actionList(): tr('action.landlord.description', catalog fallback); current Explore ordinary errands | catalog action description | DIRECT_CURRENT_CONSUMER |
| `action.landlord.label` | actionList(): tr('action.landlord.label', catalog fallback); current Explore ordinary errands | catalog action label | DIRECT_CURRENT_CONSUMER |
| `action.landlord.scene.default.text` | engine action dispatch selects scene 'default', stores text in lastAction.text; generic result UI renders lastAction.text directly | catalog scene.default.text | RESULT_CONSUMER_REQUIRED |
| `action.oddjob.description` | actionList(): tr('action.oddjob.description', catalog fallback); current Explore ordinary errands | catalog action description | DIRECT_CURRENT_CONSUMER |
| `action.oddjob.label` | actionList(): tr('action.oddjob.label', catalog fallback); current Explore ordinary errands | catalog action label | DIRECT_CURRENT_CONSUMER |
| `action.oddjob.scene.default.text` | engine action dispatch selects scene 'default', stores text in lastAction.text; generic result UI renders lastAction.text directly | catalog scene.default.text | RESULT_CONSUMER_REQUIRED |
| `action.rent-room.description` | actionList(): tr('action.rent-room.description', catalog fallback); current Bag panel | catalog action description | DIRECT_CURRENT_CONSUMER |
| `action.rent-room.label` | actionList(): tr('action.rent-room.label', catalog fallback); current Bag panel | catalog action label | DIRECT_CURRENT_CONSUMER |
| `action.rent-room.scene.default.text` | engine action dispatch selects scene 'default', stores text in lastAction.text; generic result UI renders lastAction.text directly | catalog scene.default.text | RESULT_CONSUMER_REQUIRED |
| `action.repay.description` | actionList(): tr('action.repay.description', catalog fallback); current Bag panel | catalog action description | DIRECT_CURRENT_CONSUMER |
| `action.repay.label` | actionList(): tr('action.repay.label', catalog fallback); current Bag panel | catalog action label | DIRECT_CURRENT_CONSUMER |
| `action.repay.scene.default.text` | engine action dispatch selects scene 'default', stores text in lastAction.text; generic result UI renders lastAction.text directly | catalog scene.default.text | RESULT_CONSUMER_REQUIRED |
| `action.rest.description` | actionList(): tr('action.rest.description', catalog fallback); exact catalog action currently has no direct normal panel listing | catalog action description | CATALOG_SOURCE_READY |
| `action.rest.label` | actionList(): tr('action.rest.label', catalog fallback); exact catalog action currently has no direct normal panel listing | catalog action label | CATALOG_SOURCE_READY |
| `action.rest.scene.default.text` | engine action dispatch selects scene 'default', stores text in lastAction.text; generic result UI renders lastAction.text directly | catalog scene.default.text | RESULT_CONSUMER_REQUIRED |
| `action.scales.description` | actionList(): tr('action.scales.description', catalog fallback); exact catalog action currently has no direct normal panel listing | catalog action description | CATALOG_SOURCE_READY |
| `action.scales.label` | actionList(): tr('action.scales.label', catalog fallback); exact catalog action currently has no direct normal panel listing | catalog action label | CATALOG_SOURCE_READY |
| `action.scales.scene.default.text` | engine action dispatch selects scene 'default', stores text in lastAction.text; generic result UI renders lastAction.text directly | catalog scene.default.text | RESULT_CONSUMER_REQUIRED |
| `action.sell.description` | actionList(): tr('action.sell.description', catalog fallback); exact catalog action currently has no direct normal panel listing | catalog action description | CATALOG_SOURCE_READY |
| `action.sell.label` | actionList(): tr('action.sell.label', catalog fallback); exact catalog action currently has no direct normal panel listing | catalog action label | CATALOG_SOURCE_READY |
| `action.sell.scene.default.text` | engine action dispatch selects scene 'default', stores text in lastAction.text; generic result UI renders lastAction.text directly | catalog scene.default.text | RESULT_CONSUMER_REQUIRED |
| `action.tavern-talk.description` | actionList(): tr('action.tavern-talk.description', catalog fallback); current Explore ordinary errands | catalog action description | DIRECT_CURRENT_CONSUMER |
| `action.tavern-talk.label` | actionList(): tr('action.tavern-talk.label', catalog fallback); current Explore ordinary errands | catalog action label | DIRECT_CURRENT_CONSUMER |
| `action.tavern-talk.scene.default.text` | engine action dispatch selects scene 'default', stores text in lastAction.text; generic result UI renders lastAction.text directly | catalog scene.default.text | RESULT_CONSUMER_REQUIRED |
| `action.visit.description` | actionList(): tr('action.visit.description', catalog fallback); current Explore ordinary errands | catalog action description | DIRECT_CURRENT_CONSUMER |
| `action.visit.label` | actionList(): tr('action.visit.label', catalog fallback); current Explore ordinary errands | catalog action label | DIRECT_CURRENT_CONSUMER |
| `action.visit.scene.default.text` | engine action dispatch selects scene 'default', stores text in lastAction.text; generic result UI renders lastAction.text directly | catalog scene.default.text | RESULT_CONSUMER_REQUIRED |
| `action.work.description` | actionList(): tr('action.work.description', catalog fallback); exact catalog action currently has no direct normal panel listing | catalog action description | CATALOG_SOURCE_READY |
| `action.work.label` | actionList(): tr('action.work.label', catalog fallback); exact catalog action currently has no direct normal panel listing | catalog action label | CATALOG_SOURCE_READY |
| `action.work.scene.default.text` | engine action dispatch selects scene 'default', stores text in lastAction.text; generic result UI renders lastAction.text directly | catalog scene.default.text | RESULT_CONSUMER_REQUIRED |
| `ui.work.recipeFast` | actionList(): brew/bold button | Быстро | ALREADY_WIRED_ROOT |
| `ui.work.recipeReliable` | actionList(): brew/gentle button | Надёжно | ALREADY_WIRED_ROOT |

## Current direct ordinary-action lists

Current normal UI calls `actionList()` for:
- Explore errands: `forest-search`, `tavern-talk`, `forage`, `landlord`, `visit`, `oddjob`
- Bag/debt: `repay`, `rent-room`

For these, label/description localization works immediately after root-string merge because `actionList()` already uses stable `action.<id>.label/description` keys.

## Catalog actions without a current direct panel listing

Exact catalog actions:
- `work`
- `brew`
- `sell`
- `scales`
- `exam`
- `deliver`
- `rest`

Their source keys are still valid/current, but a normal-player card may not be reachable from the current post-PR56 panel layout.

`arrival` is triggered by the pre-arrival shell, whose visible label/body uses `ui.arrival.*`; its catalog action localization remains useful for engine/journal/result source consistency.

## Result consumer gap

For ordinary actions, engine stores raw catalog scene text in `lastAction.text`. Generic result UI renders that field directly.

Recommended future presentation lookup:
- stable action ID from `lastAction.id`
- stable selected scene ID/ref retained or derived at action resolution
- visible body from `action.<id>.scene.<sceneId>.text`
- title from `action.<id>.label`

Do not store the active locale translation as gameplay identity.

## Journal gap

Ordinary action log entries and brew success/failure logs currently use `journalRef=null`. Item-125 recipe outcome keys cannot rerender old/current journal rows without a stable action-log ref.

No fuzzy prose matching is acceptable.

## Boundary

Consumer wiring must not alter action dispatch, scene selection, costs, effects, conditions, action counts, resolver order, Save or RNG.
