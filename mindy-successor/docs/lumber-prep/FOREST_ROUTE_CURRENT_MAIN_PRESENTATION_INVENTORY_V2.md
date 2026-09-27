# Forest Route Current-Main Presentation Inventory v2

Status: exact current-main audit for the two shipped Forest route identities.

Current-main baseline:
`c0763f9f9fa9887593fe8567165bbedce2b6cd3a`.

Scope:
- `forest.route.logging-road`;
- `forest.route.old-boundary`;
- current Activity envelope;
- current result presentation identities;
- route labels/text/media fallback;
- presentation/localization-only gaps.

No Hunter semantics, token acquisition/use interpretation, challenge mechanics, or deeper lore mechanics are authored here.

## Shipped Activity identity

Activity:
`lumber.forest`.

Current localized activity label:
- key: `activity.lumber.forest.label`;
- RU: `Лесная экспедиция лесоруба`;
- EN: `Lumber Forest Activity`.

Current Activity UI envelope:
`src/ui/app.ts`, `central()`, branch `if(r.flow.activity)`.

Current media request while Activity is active:
`activity/forest/route/default`.

Important:
the UI does **not** currently switch the presentation ID when `activity.internalState.routeId` changes. The route state is printed as technical text in the dialogue line, but the media request stays the same default Activity route presentation identity.

## Shipped route identities

### Logging road

Gameplay option ID:
`forest.route.logging-road`.

Current option payload:
- category: `route`;
- conditions: none;
- `progressDelta: 0`;
- `enduranceCost: 0`;
- `setRoute: logging-road`.

Current localized label:
- key: `activityOption.forest.route.logging-road.label`;
- RU: `Лесовозная дорога`;
- EN: `Logging road`.

Current runtime route-state value after selection:
`logging-road`.

Current route-scene body:
**none**.

Current route-specific media slot:
**none**.

Current semantic route presentation binding:
**none**.

Presentation-only gap:
the option label is localized, but selecting it does not currently bind to a route-specific scene/text/media identity.

### Old boundary

Gameplay option ID:
`forest.route.old-boundary`.

Current option payload:
- category: `route`;
- current gate:
  `itemCapability(enter_old_boundary) present=true`;
- `progressDelta: 0`;
- `enduranceCost: 0`;
- `setRoute: old-boundary`.

Current item definition exposing that capability:
- item ID: `old_boundary_token`;
- capability: `enter_old_boundary`.

This inventory records that current capability relationship only. It does **not** interpret:
- where the token comes from;
- whether it is bought;
- whether it is consumed;
- whether it is retained;
- whether it is turned in;
- whether it has deeper lore meaning.

Current localized label:
- key: `activityOption.forest.route.old-boundary.label`;
- RU: `Старая межевая тропа`;
- EN: `Old boundary path`.

Current runtime route-state value after selection:
`old-boundary`.

Current route-scene body:
**none**.

Current route-specific media slot:
**none**.

Current semantic route presentation binding:
**none**.

Presentation-only gap:
same as logging road—localized option label exists, but route selection is not yet mapped to route-specific authored scene/media presentation.

## Activity envelope gaps

Current Activity UI displays:
- eyebrow: hardcoded `Activity`;
- activity localized title;
- technical progress text:
  - `Прогресс`;
  - `Выносливость`;
  - `checkpoint`;
  - raw `route:` value when present;
- localized option labels.

These envelope gaps are shared UI/presentation concerns:
- eyebrow localization;
- technical progress/checkpoint/route text if intended player-facing;
- route-specific presentation scene binding.

Chat 3 does not edit shared UI here.

## Current result presentation identities

Current result reactions are shipped separately through:
`content/packs/forest-result-content-bilingual-v2.json`.

The pack ID remains:
`forest-result-content-v1`.

Exact result event identities:
- `forest-result-content-v1.success`;
- `forest-result-content-v1.escape`;
- `forest-result-content-v1.failure`.

Exact Activity result identities:
- success -> `lumber.forest.success`;
- escape -> `lumber.forest.escape`;
- failure -> `lumber.forest.failure`.

Exact reaction boundaries:
- `activityResult(lumber.forest, success, lumber.forest.success)`;
- `activityResult(lumber.forest, escape, lumber.forest.escape)`;
- `activityResult(lumber.forest, failure, lumber.forest.failure)`.

Each current result event already has RU+EN localization for:
- title;
- default body;
- return choice label;
- return choice text;
- media alt.

Each result event currently uses:
`assets/stage-forest.svg`.

These result presentations are already distinct from route-scene presentation.

## Current route media fallback

There is no route-specific production media object or presentation slot on current main.

Safe existing static Forest artwork used by shipped Forest result content:
`assets/stage-forest.svg`.

Therefore a future route-specific presentation mapping may safely use that same static asset as fallback **without claiming new art exists**.

No bespoke logging-road or old-boundary GIF is currently claimed by this inventory.

## Current localization status

Already shipped:
- `activity.lumber.forest.label`;
- `activityOption.forest.route.logging-road.label`;
- `activityOption.forest.route.old-boundary.label`;
- Forest result event title/body/choice/media-alt RU+EN.

Missing but presentation-safe:
- route-scene text keys for logging road;
- route-scene text keys for old boundary;
- route reaction text;
- route-specific media alt/caption once real media exists;
- route-specific semantic presentation binding.

## Safe semantic presentation identities

Presentation-only identities that can safely describe the two shipped routes:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

These are not new gameplay route IDs.

They should map only from the already-selected authoritative route state.

## Explicitly not in current production

Not shipped:
- Hunter route option;
- Hunter route state;
- Hunter clue/capability provider;
- challenge gameplay options;
- challenge thresholds;
- challenge rewards;
- seasonal mechanical topology;
- old-boundary acquisition rules;
- old-boundary consume/retain semantics;
- deeper route lore outcomes.

## Lumber Hard Work firewall

Current authoritative ending remains:
- ending ID: `ending.lumber.hard-work`;
- eligibility ONLY `completed_shifts >= 50`;
- reward `hardWork:lumber`.

Route presentation work must not add prerequisites or alter that ending.

## Inventory conclusion

Current main has complete bilingual Activity and route **labels**, plus complete bilingual result reactions.

The exact remaining route gap is presentation-only:
the selected `logging-road` / `old-boundary` route state does not yet bind to authored route-specific scene text/media.

That missing binding is shared presentation/UI integration, not a reason to create new route mechanics.
