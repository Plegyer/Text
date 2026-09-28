# Post-Global-Shell Visible Text Debt Inventory v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `295e6fc74d235f0b7555794555a18373451e8b7e`
Current app blob: `8bc496f8678640e7134730dda943e326a9379fb1`

Context:
- PR53 shipped the first global UI-shell localization wave.
- PR55 shipped shared Night/lodging UI localization.
- This inventory recomputes only normal-player-visible debt on the resulting current main.

## SHIP_WITH_GENERIC_LABELS_QUEUE

### Direct labels/hints dictionary reads

Still locale-insensitive on current main:
- creation stat labels;
- creation stat hint tooltips;
- creation stat aria-label interpolation;
- Stats panel stat labels/hints;
- generic result delta labels;
- Bag item labels;
- HUD season label;
- generic requirement labels.

Items 109–117 provide current source/fixture/consumer mapping for core stats/hints, inventory/resources, housing/seasons and generic shell keys.

### Pending encounter eyebrow

Current hardcoded:
`Встреча`

Source-ready:
`ui.event.eyebrow`

### Inactive-run headings/navigation

Current hardcoded:
- `Судьба принята`
- `Срок истёк`
- `Судьбы и следующая жизнь`

Source-ready:
- `ui.run.endingAccepted`
- `ui.run.timeExpired`
- `ui.run.fatesAndNextLife`

## SOURCE_READY_ON_CHAT5_BRANCH, NOT YET SHIPPED ON CURRENT MAIN

These normal-player seams remain hardcoded on current main, but source already exists in the earlier Chat5 global-shell wave:

### Character creation
Still hardcoded:
- `До первого шага`
- `Кем вы войдёте в этот мир?`
- `Новый город ещё ничего о вас не знает.`
- `Ваша героиня`
- age/free-points sentence
- stat increment/decrement aria labels
- `Начать историю`

Prepared in:
- `global-ui-shell-localization-v3.fixture.json`

### Active Activity shell
Still hardcoded:
- `Activity`
- `Прогресс:`
- `Выносливость:`
- `checkpoint:`
- `route:`

Prepared in the same v3 fixture, with generic player-facing wording.

### Missing-media fallback
Still hardcoded:
- `Сцена доступна без медиа`

Prepared:
- `ui.media.missing`

### Menu shell
Still hardcoded:
- export/import labels;
- presentation-editor menu label;
- GIF animation label/state;
- restart label;
- informational footer.

Prepared in the earlier v3 shell fixture.

### Confirmations / recovery / startup
Still hardcoded:
- ending acceptance confirmation;
- restart confirmation;
- import confirmation;
- file-too-large;
- load success;
- raw import failure;
- backup restore/no-backup;
- presentation save/load failure;
- catalog/startup/load-stop messages.

Prepared in:
- `global-ui-shell-localization-v3.fixture.json`
- `PLAYER_FACING_ERROR_WRAPPER_LOCALIZATION_V2.md`

### Condition grammar
`explain(c)` still contains Russian-only grammar/state words for:
- item capability;
- calendar;
- housing;
- career/quest/relationship;
- world/meta;
- visits;
- flag prose;
- NOT;
- AND/OR.

Prepared in:
- `CONDITION_EXPLANATION_TEMPLATES_RU_EN_V2.md`
- `condition-state-word-localization-v1.fixture.json`

## PREPARED PRIOR LABEL SOURCE, NOT INCLUDED IN SECOND GENERIC FIXTURE

Current normal-player UI can still expose:
- legacy metric labels such as perception/intelligence/composure;
- Legacy-panel meta-unlock labels.

Those RU+EN strings already exist on the Chat5 branch in:
- `global-labels-hints-localization-v1.fixture.json`

They are not duplicated into item-115 `generic-labels-localization-v1.fixture.json`.

## ALREADY LOCALIZED / ACCEPTABLE FALLBACK

### Night/lodging
PR55 current main now uses stable localized keys for:
- Night eyebrow;
- lodging prompt;
- Night choice shell;
- next-day Energy annotation;
- lodging labels;
- shared Night-choice select label.

RU text inside those `tr(key, fallback)` calls is an acceptable fallback, not unresolved localization debt.

### Town lodging sentence
Current main already uses:
`ui.town.lodgingToday`

### Existing global shell
Explore/Sleep/Stats/Journal/Bag/Legacy/Arrival/shared generic controls from PR53 are localized through stable keys.

## OTHER_OWNER

No Chat5 duplicate work should be added for:
- Forest route/result authored semantics;
- School-owned course/content strings;
- poverty-owned content;
- Foreman content;
- Secret Debt mechanics/content.

## DEBUG_INTERNAL

Excluded:
- `Инспектор событий` button/heading;
- raw serialized event JSON;
- internal editor/catalog diagnostics not part of ordinary play.

The presentation editor is reachable from the normal menu, so its menu label and player-visible save/load status are normal shell debt; its internal editing controls remain excluded.

## ACCEPTABLE RAW-ID FALLBACK

Even after localized condition grammar, stable IDs can still appear for:
- career/quest/relationship names;
- stage/counter/fact/choice IDs;
- world facts;
- item capabilities;
- ending IDs.

This is acceptable until a separate semantic-name localization layer is explicitly queued.

## Closure view

Current-main normal-player hardcoded RU is no longer dominated by Night/global panel shell. The remaining debt is concentrated in:
1. direct generic labels/hints;
2. character creation/menu/Activity/recovery strings already source-ready on Chat5;
3. condition grammar;
4. a few generic encounter/end-state strings;
5. legacy metric/unlock labels.

No gameplay behavior change is required to close these presentation seams.
