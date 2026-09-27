# Global UI Shell Localization Handoff v1

Date: 2026-09-27
Owner: Chat 5
Baseline audited main: `f93878b954385a1c61d8a06a0673354207d11d70`
Consumer audited: `src/ui/app.ts` blob `312399d01b211f13c29017c1e17b61f2027d21b3`
Integration mode: selective copy/wiring only.

## SAFE_TEXT_SOURCE

Audit:
- `docs/relationship-prep/GLOBAL_UI_SHELL_HARDCODED_TEXT_AUDIT_V1.md`

Authored RU-source + full EN:
- `docs/relationship-prep/EXPLORE_PANEL_UI_COPY_RU_EN_V1.md`
- `docs/relationship-prep/SLEEP_NIGHT_PANEL_UI_COPY_RU_EN_V1.md`
- `docs/relationship-prep/STATS_PANEL_UI_COPY_RU_EN_V1.md`
- `docs/relationship-prep/JOURNAL_PANEL_UI_COPY_RU_EN_V1.md`
- `docs/relationship-prep/BAG_DEBT_PANEL_UI_COPY_RU_EN_V1.md`
- `docs/relationship-prep/LEGACY_ENDINGS_PANEL_UI_COPY_RU_EN_V1.md`
- `docs/relationship-prep/ARRIVAL_SCREEN_UI_COPY_RU_EN_V1.md`
- `docs/relationship-prep/SHARED_GENERIC_BUTTON_LABELS_RU_EN_V1.md`

Production staging fixture:
- `prior-work/astra/prototype-m3.2/content/global-ui-shell-localization-v1.fixture.json`

Item 94 contains 34 stable RU+EN `ui.*` entries and no gameplay/mechanics fields.

At creation time, five fixture keys were already exact-identical in current root:
- `ui.panel.stats`
- `ui.panel.journal`
- `ui.panel.legacy`
- `ui.town.eyebrow`
- `ui.result.returnTown`

Lead should not duplicate those semantics; reuse the existing keys.

## CHAT3_NIGHT_LODGING_OVERLAP_EXCLUDED

Item 87 only covers the outer Sleep panel before NightFlow begins.

Do not merge Chat5-authored replacement text over Chat3-owned/current Night/lodging presentation for:
- lodging-stage title/body;
- lodging option price / next-day Energy annotations;
- voluntary Night choice stage/body;
- Night choice content;
- generic Night-slot annotations;
- active NightFlow phase presentation;
- lodging/NightFlow mechanics or IDs.

The only queue-local Sleep keys are:
- `ui.sleep.title`
- `ui.sleep.help`
- `ui.sleep.startButton`

They describe the shell entry point, not the NightFlow transaction.

## JOURNAL_OUTCOME_CONSUMER_REQUIRED

Item 89 localizes Journal shell only.

It does not solve stored outcome strings.

Current Journal rendering still prints stored `run.journal` strings directly. Current legacy event choice resolution still persists embedded source choice prose.

Authoritative content contract remains:
- `docs/relationship-prep/LEGACY_JOURNAL_OUTCOME_PRESENTATION_CONTRACT_V1.md`

Choice-outcome RU+EN source is already ready from items 75–80, but visible EN for old/raw journal outcome rows requires a Lead-owned locale-neutral presentation consumer.

Do not rewrite gameplay Save with the active translation.

## SHARED_UI_WIRING_REQUIRED

Consumer map:
- `docs/relationship-prep/GLOBAL_UI_SHELL_CONSUMER_MAP_V1.md`

Current `app.ts` must selectively replace hardcoded shell strings with `tr(key,fallback)` / `fmt(tr(...))`.

Primary seams:

### Explore
Wire:
- `ui.explore.title`
- `ui.explore.activityHelp`
- `ui.explore.entryEnergy`
- `ui.explore.enterButton`
- `ui.explore.errandsSummary`

### Sleep panel
Wire:
- `ui.sleep.title`
- `ui.sleep.help`
- `ui.sleep.startButton`

### Stats
Reuse `ui.panel.stats` for heading and wire:
- `ui.stats.professionsTitle`

Optional insertion-only copy:
- `ui.stats.help`
- `ui.stats.professionsHelp`

### Journal
Reuse `ui.panel.journal` for heading.

Optional:
- `ui.journal.empty`

### Bag
Wire:
- `ui.bag.title`
- `ui.bag.debtLabel`

Optional:
- `ui.bag.empty`

### Legacy/endings
Reuse `ui.panel.legacy`, then wire:
- `ui.legacy.help`
- `ui.legacy.acceptButton`
- `ui.legacy.inheritanceTitle`
- `ui.legacy.emptyInheritance`
- `ui.legacy.nextLifeButton`

### Arrival
Reuse `ui.town.eyebrow`, then wire:
- `ui.arrival.title`
- `ui.arrival.body`
- `ui.arrival.button`

### Shared controls
Wire:
- `ui.generic.selectButton`
- `ui.generic.closeButton`
- `ui.generic.dismissButton`
- `ui.result.chooseLodging`
- `ui.work.recipeReliable`
- `ui.work.recipeFast`

`ui.result.returnTown` is already wired in current main.

UI wiring must not change command/action/ending/panel IDs, eligibility, mechanics, RNG or Save.

## NON_PLAYER_FACING_EXCLUDED

No localization work in this queue for:
- presentation editor;
- event catalog inspector;
- internal/debug inspector labels;
- raw implementation diagnostics where Product has not approved a player-facing surface.

These should not block item-94 integration.

## Remaining hardcoded player-facing debt after this wave

Even after all item-94 keys are wired, current `app.ts` still has separate debt not assigned to items 86–93.

### Character creation shell
Still hardcoded:
- creation eyebrow/title/body;
- heroine heading;
- age/free-points sentence;
- stat increase/decrease aria-labels;
- start-story button.

### Event / inactive-run shell
Still hardcoded:
- `Встреча` eyebrow;
- `Судьба принята`;
- `Срок истёк`;
- `Судьбы и следующая жизнь`;
- town-note `Ночлег сегодня:`.

### Active Activity shell
Still hardcoded:
- `Activity` eyebrow;
- `Прогресс:`;
- `Выносливость:`;
- literal `checkpoint:` and `route:`.

Product/Lead should first decide whether implementation vocabulary is intended player copy.

### Condition explanations
`explain()` still composes Russian-only player-visible requirement text for:
- item capability;
- calendar;
- housing;
- career/quest/relationship/world/meta facts;
- visits;
- negation;
- conjunctions.

This needs a separate structured localization pass.

### Save/menu lifecycle
Still hardcoded:
- export/import;
- animation toggle;
- restart/new heroine;
- confirmations;
- import/recovery messages;
- some operational error text visible to the user.

This is a later global-shell localization wave.

## Exact selective-copy list

85. `mindy-successor/docs/relationship-prep/GLOBAL_UI_SHELL_HARDCODED_TEXT_AUDIT_V1.md`
86. `mindy-successor/docs/relationship-prep/EXPLORE_PANEL_UI_COPY_RU_EN_V1.md`
87. `mindy-successor/docs/relationship-prep/SLEEP_NIGHT_PANEL_UI_COPY_RU_EN_V1.md`
88. `mindy-successor/docs/relationship-prep/STATS_PANEL_UI_COPY_RU_EN_V1.md`
89. `mindy-successor/docs/relationship-prep/JOURNAL_PANEL_UI_COPY_RU_EN_V1.md`
90. `mindy-successor/docs/relationship-prep/BAG_DEBT_PANEL_UI_COPY_RU_EN_V1.md`
91. `mindy-successor/docs/relationship-prep/LEGACY_ENDINGS_PANEL_UI_COPY_RU_EN_V1.md`
92. `mindy-successor/docs/relationship-prep/ARRIVAL_SCREEN_UI_COPY_RU_EN_V1.md`
93. `mindy-successor/docs/relationship-prep/SHARED_GENERIC_BUTTON_LABELS_RU_EN_V1.md`
94. `mindy-successor/prior-work/astra/prototype-m3.2/content/global-ui-shell-localization-v1.fixture.json`
95. `mindy-successor/docs/relationship-prep/GLOBAL_UI_SHELL_CONSUMER_MAP_V1.md`
96. `mindy-successor/docs/relationship-prep/GLOBAL_UI_SHELL_LOCALIZATION_HANDOFF_V1.md`

## Recommended Lead order

1. Recheck item-94 keys against exact integration-head root localization.
2. Merge additive strings; retain exact-identical existing root strings.
3. Wire exact current seams using item 95.
4. Keep Chat3 Night/lodging consumers outside this patch.
5. Do not use Journal shell work to mutate stored outcome prose.
6. Verify RU↔EN switching changes shell presentation only.
7. Run exact-head UI/CI acceptance under Lead/QA ownership.

## Acceptance invariants

Across locale switch:
- same panel;
- same action/Activity/ending IDs;
- same enabled/disabled state;
- same Energy/money/debt/inventory values;
- same NightFlow state;
- same event/choice state;
- same RNG;
- same gameplay Save identity.

Only shell text/aria presentation changes.
