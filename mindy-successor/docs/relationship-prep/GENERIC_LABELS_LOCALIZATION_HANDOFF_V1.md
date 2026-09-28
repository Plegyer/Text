# Generic Labels Localization Handoff v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `295e6fc74d235f0b7555794555a18373451e8b7e`
Scope: generic-label queue items 109–119
Integration mode: selective copy/wiring only.

## SAFE_LABEL_KEYS

Primary fixture:
- `prior-work/astra/prototype-m3.2/content/generic-labels-localization-v1.fixture.json`

The fixture contains 49 RU+EN presentation keys sourced from:
- `CORE_STAT_LABELS_HINTS_RU_EN_V2.md`
- `INVENTORY_RESOURCE_LABELS_RU_EN_V1.md`
- `HOUSING_SEASON_GENERIC_LABELS_RU_EN_V1.md`
- `GENERIC_ENCOUNTER_ENDSTATE_SHELL_RU_EN_V1.md`

Coverage:
- 12 current target stat labels;
- 12 current target stat hints;
- money/Energy resource labels;
- 7 current item labels;
- current target + legacy-compatible housing labels;
- 4 season labels;
- generic pending-event eyebrow;
- inactive-run accepted/expired headings;
- inactive-run Legacy navigation;
- existing next-life/town-lodging shell keys for reuse verification.

Collision audit:
- `docs/relationship-prep/GENERIC_LABELS_COLLISION_AUDIT_V1.md`

Against the audited current root:
- ADDITIVE: 28
- IDENTICAL: 17
- REUSE_EXISTING: 4
- CONFLICT: 0

Lead must repeat the check on the exact integration head.

## REUSE_EXISTING

Exact existing keys should remain authoritative:
- all 12 `stat.<id>.label` keys;
- `housing.room.label`
- `housing.hostel.label`
- `housing.shelter.label`
- `ui.legacy.nextLifeButton`
- `ui.town.lodgingToday`

Exact-value reuse candidates:
- `housing.normal.label` ↔ current normal-room lodging/legacy housing wording;
- `housing.cheap.label` ↔ current cheap-lodging/hostel wording;
- `housing.street.label` ↔ current shelter/street wording;
- `resource.energy.label` ↔ `ui.hud.energy`.

Lead may keep domain-specific keys when direct semantic lookup is clearer, but duplicate translations should not drift independently.

## SHARED_UI_WIRING_REQUIRED

Consumer map:
- `docs/relationship-prep/GENERIC_LABELS_CONSUMER_MAP_V1.md`

Current app still directly reads `labels[id]` / `hints[id]` in normal-player surfaces.

Recommended presentation resolvers:
- `stat.<id>.label`
- `stat.<id>.hint`
- `item.<id>.label`
- `resource.<id>.label`
- `season.<id>.label`
- `housing.<id>.label`

Use current dictionary/raw ID only as fallback.

Direct shell wiring is also required for:
- `ui.event.eyebrow`
- `ui.run.endingAccepted`
- `ui.run.timeExpired`
- `ui.run.fatesAndNextLife`.

No gameplay state should depend on localized text.

## REQUIREMENT_PRESENTATION

Audit:
- `docs/relationship-prep/ORDINARY_ACTION_REQUIREMENT_PROSE_AUDIT_V1.md`

Expectation matrix:
- `docs/relationship-prep/LOCALIZED_REQUIREMENT_TEXT_EXPECTATION_MATRIX_V1.md`

Ordinary action requirement debt is presentation-only:
- dictionary labels;
- Russian-only condition grammar;
- generic boolean/logic prose;
- raw stable IDs where no semantic label layer exists.

Exact `Condition` objects, comparison values and eligibility remain unchanged.

The previously authored shared condition sources remain valid dependencies:
- `CONDITION_EXPLANATION_TEMPLATES_RU_EN_V2.md`
- `condition-state-word-localization-v1.fixture.json`

## EXCLUDED_DEBUG

Do not spend this integration on:
- event catalog inspector label/heading;
- serialized inspector JSON;
- developer-only editor/catalog diagnostics;
- test-only schema/error strings.

No debug identifier should be renamed for localization.

## REMAINING_DEBT

Inventory:
- `docs/relationship-prep/POST_GLOBAL_SHELL_VISIBLE_TEXT_DEBT_INVENTORY_V1.md`

After the current Lead global-shell + Night work, remaining normal-player debt includes:

### Source-ready on this generic-label queue
- core stat hints/direct stat-label consumers;
- inventory/resource labels;
- generic housing/season labels;
- encounter eyebrow;
- inactive-run headings/navigation.

### Source-ready from earlier Chat5 shell work but not yet shipped on current main
- character creation;
- generic Activity shell;
- menu shell;
- missing-media fallback;
- confirmations/recovery/startup wrappers;
- condition grammar.

### Source-ready from earlier labels work, intentionally not duplicated here
- legacy metric labels;
- meta-unlock labels.

### Future semantic-label layer
Some career/quest/relationship/stage/counter/fact/choice/world IDs may remain visible as stable raw IDs after grammar localization. That requires a separately reviewed semantic-name layer, not ID mutation.

## Exact selective-copy files

109. `mindy-successor/docs/relationship-prep/GENERIC_LABELS_HINTS_LOCALIZATION_DEBT_AUDIT_V1.md`
110. `mindy-successor/docs/relationship-prep/CORE_STAT_LABELS_HINTS_RU_EN_V2.md`
111. `mindy-successor/docs/relationship-prep/INVENTORY_RESOURCE_LABELS_RU_EN_V1.md`
112. `mindy-successor/docs/relationship-prep/HOUSING_SEASON_GENERIC_LABELS_RU_EN_V1.md`
113. `mindy-successor/docs/relationship-prep/GENERIC_ENCOUNTER_ENDSTATE_SHELL_RU_EN_V1.md`
114. `mindy-successor/docs/relationship-prep/ORDINARY_ACTION_REQUIREMENT_PROSE_AUDIT_V1.md`
115. `mindy-successor/prior-work/astra/prototype-m3.2/content/generic-labels-localization-v1.fixture.json`
116. `mindy-successor/docs/relationship-prep/GENERIC_LABELS_CONSUMER_MAP_V1.md`
117. `mindy-successor/docs/relationship-prep/GENERIC_LABELS_COLLISION_AUDIT_V1.md`
118. `mindy-successor/docs/relationship-prep/LOCALIZED_REQUIREMENT_TEXT_EXPECTATION_MATRIX_V1.md`
119. `mindy-successor/docs/relationship-prep/POST_GLOBAL_SHELL_VISIBLE_TEXT_DEBT_INVENTORY_V1.md`
120. `mindy-successor/docs/relationship-prep/GENERIC_LABELS_LOCALIZATION_HANDOFF_V1.md`

## Recommended Lead order

1. Re-run item-117 collision audit against the exact integration head.
2. Keep exact-identical existing keys.
3. Decide target-housing/resource-Energy semantic reuse versus dedicated domain keys.
4. Merge approved additive item-115 strings.
5. Wire current app consumers per item 116.
6. Validate representative requirements using item 118.
7. Keep condition objects/IDs and all mechanics unchanged.
8. Run exact-head UI/CI acceptance.

## Acceptance invariants

Across RU↔EN switching:
- same stat/item/resource/housing/season IDs;
- same condition objects and eligibility;
- same action/ending availability;
- same inventory/resources;
- same run status;
- same Save identity;
- same RNG evolution.

Only visible/accessibility presentation changes.
