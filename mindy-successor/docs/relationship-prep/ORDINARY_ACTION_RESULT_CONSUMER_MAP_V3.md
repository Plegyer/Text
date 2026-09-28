# Ordinary Action Result Consumer Map v3

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `54131488c65302f81b3001abaaa345d21f0281e2`
Current UI: `src/ui/app.ts`
Current engine: `src/core/engine.ts`
Production source: `content/ordinary-action-result-localization-v3.fixture.json`

## Exact current map

| Action ID | Scene ID | Title key | Body key | Current presentation ID | Current identity seam |
|---|---|---|---|---|---|
| `work` | `default` | `action.work.label` | `action.work.scene.default.text` | `location/town/work/default` | current `lastAction.id` + catalog single `default` scene; UI currently renders raw `lastAction.title/text` |
| `forage` | `default` | `action.forage.label` | `action.forage.scene.default.text` | `location/town/forage/default` | current `lastAction.id` + catalog single `default` scene; UI currently renders raw `lastAction.title/text` |
| `brew` | `default` | `action.brew.label` | `action.brew.scene.default.text` | `location/town/brew/default` | current `lastAction.id` + catalog single `default` scene; UI currently renders raw `lastAction.title/text` |
| `sell` | `default` | `action.sell.label` | `action.sell.scene.default.text` | `location/town/sell/default` | current `lastAction.id` + catalog single `default` scene; UI currently renders raw `lastAction.title/text` |
| `scales` | `default` | `action.scales.label` | `action.scales.scene.default.text` | `location/town/scales/default` | current `lastAction.id` + catalog single `default` scene; UI currently renders raw `lastAction.title/text` |
| `exam` | `default` | `action.exam.label` | `action.exam.scene.default.text` | `location/town/exam/default` | current `lastAction.id` + catalog single `default` scene; UI currently renders raw `lastAction.title/text` |
| `deliver` | `default` | `action.deliver.label` | `action.deliver.scene.default.text` | `location/town/deliver/default` | current `lastAction.id` + catalog single `default` scene; UI currently renders raw `lastAction.title/text` |
| `visit` | `default` | `action.visit.label` | `action.visit.scene.default.text` | `location/town/visit/default` | current `lastAction.id` + catalog single `default` scene; UI currently renders raw `lastAction.title/text` |
| `oddjob` | `default` | `action.oddjob.label` | `action.oddjob.scene.default.text` | `location/town/oddjob/default` | current `lastAction.id` + catalog single `default` scene; UI currently renders raw `lastAction.title/text` |
| `repay` | `default` | `action.repay.label` | `action.repay.scene.default.text` | `location/town/repay/default` | current `lastAction.id` + catalog single `default` scene; UI currently renders raw `lastAction.title/text` |
| `rent-room` | `default` | `action.rent-room.label` | `action.rent-room.scene.default.text` | `night/rent-room/default` | current `lastAction.id` + catalog single `default` scene; UI currently renders raw `lastAction.title/text` |
| `rest` | `default` | `action.rest.label` | `action.rest.scene.default.text` | `night/rest/default` | current `lastAction.id` + catalog single `default` scene; UI currently renders raw `lastAction.title/text` |
| `arrival` | `default` | `action.arrival.label` | `action.arrival.scene.default.text` | `location/town/arrival/default` | current `lastAction.id` + catalog single `default` scene; UI currently renders raw `lastAction.title/text` |
| `forest-search` | `default` | `action.forest-search.label` | `action.forest-search.scene.default.text` | `activity/forest/route/default` | current `lastAction.id` + catalog single `default` scene; UI currently renders raw `lastAction.title/text` |
| `tavern-talk` | `default` | `action.tavern-talk.label` | `action.tavern-talk.scene.default.text` | `location/town/tavern-talk/default` | current `lastAction.id` + catalog single `default` scene; UI currently renders raw `lastAction.title/text` |
| `landlord` | `default` | `action.landlord.label` | `action.landlord.scene.default.text` | `location/town/landlord/default` | current `lastAction.id` + catalog single `default` scene; UI currently renders raw `lastAction.title/text` |

## Current engine result shape

Ordinary action resolution currently writes:

- `lastAction.id = action.id`
- raw `lastAction.title = action.label`
- raw `lastAction.text = selectedScene.text ?? action.description`
- `lastAction.media`
- locale-neutral `lastAction.presentationId`
- numeric `lastAction.deltas`

It does **not** write an explicit ordinary-action `sceneId`.

For this exact current item-147 set, every mapped action has exactly the current `default` scene, so `actionId + default` is unambiguous against the audited catalog.

## Current UI seam

Generic result screen currently chooses:

- School special case → School localization;
- event `outcomeRef` → event-choice localization;
- otherwise → raw `lastAction.title` / `lastAction.text`.

Therefore item-147 keys are not yet consumed for ordinary results.

## Safe current lookup

For an ordinary result whose `lastAction.id` is in item 147:

1. find current catalog action by `lastAction.id`;
2. resolve the exact current selected scene identity;
3. for the present one-scene set, use `default`;
4. title → `action.<id>.label`;
5. body → `action.<id>.scene.<sceneId>.text`;
6. fallback → existing stored `lastAction.title/text`.

The existing `presentationId` remains authoritative for media and must not be repurposed as translated text identity.

## PR59 Forest note

`forest-search` remains the legacy ordinary action with:
- scene ID `default`;
- result key `action.forest-search.scene.default.text`;
- current presentation ID `activity/forest/route/default`.

PR59’s Forest route-specific presentation work does not change this ordinary-action text identity or grant ownership over Forest Activity result prose.

## Future multi-scene caution

If an ordinary action later gains multiple eligible scenes, inferring `default` from action ID alone is no longer sufficient. Shared runtime/UI would then need exact selected-scene identity retained or deterministically recoverable without locale dependence.

## Invariants

No engine/UI edits in this item. Any later consumer must preserve costs, conditions, effects, scene selection, event resolver behavior, presentation ID, deltas, Save, and RNG.
