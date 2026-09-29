# Forest Entry Content Bundle v1

Status: C3-04 content-side handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `921abfa79f4dba9c0acee4eca6724c3ed122d42f`.
Fixture: `prior-work/astra/prototype-m3.2/content/forest-entry-content-v1.fixture.json`.

## Scope

This bundle adds no Activity option, condition, effect, route, reward, item gate, Save field, RNG use, career fact, relationship fact, ending rule, or media path.

It prepares RU/EN narrative context for the already-shipped Activity `lumber.forest` and its two current production routes:
- `forest.route.logging-road` -> route state `logging-road`;
- `forest.route.old-boundary` -> route state `old-boundary`.

The content is presentation-only.

## Exact contexts

### Neutral entry

Existing presentation identity:
`activity/forest/route/default`.

Candidate localization identity:
`presentation.activity.forest.entry.default.text`.

RU:
> За кромкой леса городской шум быстро стихает. Впереди расходятся знакомая рабочая дорога и более старая линия тропы; прежде чем идти дальше, нужно выбрать путь и держать силы на обратную дорогу.

EN:
> Beyond the forest edge, the town noise fades quickly. Ahead, the familiar work road and an older line of trail pull apart; before going farther, you need to choose a route and keep enough strength for the way back.

This text does not reveal the Old Boundary gate, promise a result, or imply that one route is mechanically better.

### Logging Road entry

Existing option:
`forest.route.logging-road`.

Existing route state:
`logging-road`.

Existing presentation identity:
`activity/forest/route/logging-road`.

Candidate localization identity:
`presentation.activity.forest.entry.logging-road.text`.

RU:
> Лесовозная дорога широкая и легко читается по колеям, свежим срезам веток и меткам на стволах. Здесь путь понятнее, но лес всё равно требует смотреть под ноги и не тратить силы впустую.

EN:
> The logging road is broad and easy to read from wheel ruts, freshly cut branches, and marks on trunks. The route is clearer here, but the forest still rewards careful footing and conserving strength.

This preserves the already-authored Logging Road visual/content language and does not attach new mechanics to the route.

### Old Boundary entry

Existing option:
`forest.route.old-boundary`.

Existing route state:
`old-boundary`.

Existing presentation identity:
`activity/forest/route/old-boundary`.

Existing gate remains:
item capability `enter_old_boundary`.

Candidate localization identity:
`presentation.activity.forest.entry.old-boundary.text`.

RU:
> Старая межевая линия уходит между замшелыми камнями и выветренными знаками, не совпадая с новой лесовозной дорогой. Тропа уже и тише, поэтому ориентироваться приходится по самим старым меткам.

EN:
> The old boundary line runs between moss-covered stones and weathered marks instead of following the newer logging road. The trail is narrower and quieter, so the old markers themselves have to guide the way.

The copy describes only the existing route state. It does not name or expose the item/capability gate in player-facing prose and does not add anomaly, combat, Hunter, Arcana, reward, or ending claims.

## Current-main collision audit

On baseline main:
- `presentation.activity.forest.entry.default.text` is absent;
- `presentation.activity.forest.entry.logging-road.text` is absent;
- `presentation.activity.forest.entry.old-boundary.text` is absent.

The current localization store already contains the Activity label and route label/help keys, but no separate Forest entry narrative namespace.

The new fixture therefore has three additive presentation-localization candidates and does not replace existing route label/help text.

## Challenge boundary

Current production `lumber.forest` has route options plus the shared Activity actions `advance` and `escape`.

There is no current production Forest challenge-specific event ID, option ID, encounter ID, or typed challenge-result identity beyond the terminal Activity results:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Therefore C3-04 does not invent challenge identities. The route-specific entry paragraphs are the deepest safe content hook available on current production identities.

If Lead / Product later approves concrete challenge identities within the existing Activity architecture, Chat 3 can author challenge copy against those exact IDs. Until then, challenge-specific authored text is intentionally deferred.

## Shared UI consumer seam

Current `src/ui/app.ts` Activity rendering already has:
- `activity.activityId`;
- `activity.internalState.routeId`;
- `presentationIdForActivityRoute(...)`;
- existing localization helper `tr(...)`.

The current Activity dialogue renders only progress/endurance/checkpoint/route and action buttons. It has no separate narrative-context text lookup.

Integration owner:
Chat 1 Developer / Lead.

Safe consumer behavior:
- when `activity.activityId === 'lumber.forest'` and `routeId === null`, optionally resolve `presentation.activity.forest.entry.default.text`;
- when route is `logging-road`, optionally resolve `presentation.activity.forest.entry.logging-road.text`;
- when route is `old-boundary`, optionally resolve `presentation.activity.forest.entry.old-boundary.text`;
- if the key is absent, preserve the current Activity UI with no narrative paragraph.

This is a presentation/localization consumer only. It must not alter route selection, Activity progress, endurance, result calculation, Save shape, RNG, or option availability.

Chat 3 does not implement this shared UI change.

## RU/EN parity

All three candidate keys contain both `ru` and `en` values.

The content avoids:
- hidden mechanical numbers beyond what the current UI already exposes;
- new lore facts not represented by current production;
- Secret Debt language;
- School/Arcana claims;
- Hunter Trail claims;
- new reward/ending implications.

## Selective integration

Consume:
- the three entries under `strings` from `forest-entry-content-v1.fixture.json`;
- the exact activity/route mapping under `contexts`;
- the fallback rule: current Activity UI remains valid if the new narrative localization is not consumed.

Do not consume as mechanics:
- fixture metadata;
- `consumerSeam`;
- `invariants`.

Do not change:
- `content/definitions.json`;
- Forest Activity results/options;
- `content/presentation.json` routes/assets;
- shared Activity engine;
- Save/RNG;
- ending logic.

## C3-04 disposition

Prepared:
- neutral Forest entry RU/EN context;
- Logging Road RU/EN entry context;
- Old Boundary RU/EN entry context;
- exact existing identity mapping;
- additive localization IDs;
- fallback behavior;
- shared UI consumer handoff.

Dependency:
the optional narrative paragraph needs shared Activity UI consumption by Chat 1 Developer / Lead. The content itself is ready independently.
