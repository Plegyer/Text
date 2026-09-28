# Global UI Shell Localization Handoff v2

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `5dffefd15703d431a604b4cc9f831c4e55460aed`
Scope: queue items 97–107
Integration mode: selective copy/wiring only; do not wholesale-merge the worker branch.

## SAFE_TEXT_SOURCE

### Character creation
- `docs/relationship-prep/CHARACTER_CREATION_UI_COPY_RU_EN_V1.md`

Covers:
- creation eyebrow/title/body;
- heroine heading;
- age/free-points sentence;
- stat allocation accessibility labels;
- start-story button.

### HUD/date
- `docs/relationship-prep/HUD_DATE_ENERGY_COINS_RU_EN_AUDIT_V1.md`

Current HUD day/year/of/Energy/coins/menu keys are already shipped.
Only the four season labels are new source:
- `season.spring.label`
- `season.summer.label`
- `season.autumn.label`
- `season.winter.label`

### Menu shell
- `docs/relationship-prep/MENU_SHELL_UI_COPY_RU_EN_V1.md`

Covers export/import, presentation editor label, animation state/toggle, restart label and informational footer.
Event catalog inspector remains debug/internal and excluded.

### Toast/error/accessibility
- `docs/relationship-prep/TOAST_ERROR_ACCESSIBILITY_COPY_RU_EN_V1.md`
- `docs/relationship-prep/PLAYER_FACING_VALIDATION_RECOVERY_COPY_INVENTORY_V1.md`

Covers normal-player confirmations, file validation, import/recovery, startup and visible presentation-editing statuses.

### Activity shell
- `docs/relationship-prep/ACTIVITY_GENERIC_SHELL_UI_COPY_RU_EN_V1.md`

Generic Activity shell only; no Forest-specific route/result mechanics or prose.

### Result shell
- `docs/relationship-prep/RESULT_SCREEN_GENERIC_UI_COPY_RU_EN_V1.md`

Reuses already-shipped generic result keys and adds:
- `ui.result.chooseLodging`
- `ui.media.missing`

No career-result body duplication.

### Condition explanations
- `docs/relationship-prep/ENDING_CONDITION_EXPLANATION_SHELL_AUDIT_V1.md`

Provides presentation templates/state words/separators for current `explain(c)` branches without changing any condition object or eligibility.

## PRODUCTION FIXTURE

Primary staging source:
- `prior-work/astra/prototype-m3.2/content/global-ui-shell-localization-v2.fixture.json`

Item 105 contains 109 RU+EN entries and consolidates:
- safe item-94 strings;
- items 97–104;
- locale-neutral presentation keys only;
- no gameplay/mechanics fields.

## CURRENT_MAIN_CONSUMER_MAP

- `docs/relationship-prep/GLOBAL_UI_SHELL_CONSUMER_MAP_V2.md`

Every item-105 key is mapped to the exact post-PR52 current `src/ui/app.ts` consumer seam/fallback.

Consumer baseline:
- main `5dffefd15703d431a604b4cc9f831c4e55460aed`
- app blob `312399d01b211f13c29017c1e17b61f2027d21b3`

Lead owns the actual `tr()/fmt()` wiring.

## COLLISION / DEDUP STATUS

- `docs/relationship-prep/GLOBAL_UI_SHELL_DUPLICATION_COLLISION_AUDIT_V1.md`

Against post-PR52 root localization:

- 103 ADDITIVE
- 5 IDENTICAL
- 1 REUSE_EXISTING
- 0 CONFLICT

Exact IDENTICAL keys already in root:
- `ui.panel.stats`
- `ui.panel.journal`
- `ui.panel.legacy`
- `ui.town.eyebrow`
- `ui.result.returnTown`

REUSE_EXISTING:
- item-105 `ui.activity.enduranceLabel` matches existing `stat.endurance.label`.

Recommended: reuse `stat.endurance.label` instead of adding the duplicate Activity-specific key unless Lead intentionally wants a separate semantic shell key.

## SHARED_UI_WIRING_REQUIRED

Lead needs to replace current hardcoded shell strings with localized consumers.

High-value seams:
- character creation;
- Explore/Sleep/Stats/Journal/Bag/Legacy shells from item 94;
- menu;
- pre-arrival shell;
- active Activity shell;
- generic result fallback/control;
- confirmation/error/recovery messages;
- ending/eligibility condition explanation templates;
- modal/toast accessibility labels.

Use existing stable keys where already shipped.
Do not duplicate semantic keys just to match a new consumer.

## CONDITION_PRESENTATION_CONSUMER_REQUIRED

The current `explain(c)` function contains Russian grammar directly in code.

A Lead implementation should:
- keep the exact current `Condition` object;
- select a presentation template by condition kind;
- keep comparison operators/values authoritative;
- localize only the surrounding grammar/state words;
- resolve season labels from stable season identities;
- avoid translating fact/stage/counter IDs as gameplay identity.

This is presentation wiring, not a condition-schema change.

## JOURNAL_OUTCOME_CONSUMER_REQUIRED

This wave still does not change raw stored Journal entries.

The authoritative prior contract remains:
- `docs/relationship-prep/LEGACY_JOURNAL_OUTCOME_PRESENTATION_CONTRACT_V1.md`

Do not make gameplay Save locale-dependent by replacing stored outcome identity with translated prose.

## CHAT3_NIGHT_LODGING_OVERLAP_EXCLUDED

Keep prior item-96 boundary:
- Night/lodging stage text;
- lodging option costs/deltas;
- voluntary Night choice shell;
- Night-slot annotations;
- active NightFlow phase;
- NightFlow mechanics.

This wave does not claim those consumers.

## NON_PLAYER_FACING_EXCLUDED

Do not spend localization scope on:
- event catalog inspector;
- serialized inspector JSON;
- internal debug-only diagnostics;
- developer/test-only messages.

The presentation editor menu label/status is included because it is currently exposed in the normal menu, but editor internals remain excluded.

## Remaining player-facing hardcoded debt after item-105 integration

After wiring item 105, the main remaining visible debt is outside this queue:

### Night/lodging owned elsewhere
Chat3-owned/current Night shell remains separate.

### Journal entry payloads
Stored legacy journal prose still needs the locale-neutral outcome consumer from item 80.

### Labels not yet fully locale-aware
Some generic `labels[...]/hints[...]/catalog label` consumers outside the specific season/stat paths in this wave may still be Russian-only.

### Dynamic error payloads
The wrapper can be localized, but raw underlying `{error}` text may still originate from internal validators in one language. This handoff intentionally does not translate exception payload identity.

### Debug/editor internals
Excluded by design.

## Exact selective-copy list

97. `mindy-successor/docs/relationship-prep/CHARACTER_CREATION_UI_COPY_RU_EN_V1.md`
98. `mindy-successor/docs/relationship-prep/HUD_DATE_ENERGY_COINS_RU_EN_AUDIT_V1.md`
99. `mindy-successor/docs/relationship-prep/MENU_SHELL_UI_COPY_RU_EN_V1.md`
100. `mindy-successor/docs/relationship-prep/TOAST_ERROR_ACCESSIBILITY_COPY_RU_EN_V1.md`
101. `mindy-successor/docs/relationship-prep/ACTIVITY_GENERIC_SHELL_UI_COPY_RU_EN_V1.md`
102. `mindy-successor/docs/relationship-prep/RESULT_SCREEN_GENERIC_UI_COPY_RU_EN_V1.md`
103. `mindy-successor/docs/relationship-prep/ENDING_CONDITION_EXPLANATION_SHELL_AUDIT_V1.md`
104. `mindy-successor/docs/relationship-prep/PLAYER_FACING_VALIDATION_RECOVERY_COPY_INVENTORY_V1.md`
105. `mindy-successor/prior-work/astra/prototype-m3.2/content/global-ui-shell-localization-v2.fixture.json`
106. `mindy-successor/docs/relationship-prep/GLOBAL_UI_SHELL_CONSUMER_MAP_V2.md`
107. `mindy-successor/docs/relationship-prep/GLOBAL_UI_SHELL_DUPLICATION_COLLISION_AUDIT_V1.md`
108. `mindy-successor/docs/relationship-prep/GLOBAL_UI_SHELL_LOCALIZATION_HANDOFF_V2.md`

## Recommended Lead integration order

1. Re-audit item 105 against the exact integration-head root localization.
2. Skip exact-identical entries already shipped.
3. Reuse `stat.endurance.label` for Activity endurance unless a separate UI semantic key is intentionally retained.
4. Selectively merge additive item-105 strings.
5. Wire current app consumers exactly per item 106.
6. Keep Chat3 Night/lodging and item-80 journal outcome boundaries intact.
7. Verify RU↔EN switch changes text/aria only.
8. Run exact-head UI/CI acceptance.

## Acceptance invariants

Across locale switching:
- same screen/panel;
- same command/action/Activity/ending IDs;
- same conditions and enabled state;
- same resources/debt/inventory;
- same creation allocation;
- same NightFlow state;
- same event/choice state;
- same RNG evolution;
- same gameplay Save identity.

Only visible/accessibility presentation changes.
