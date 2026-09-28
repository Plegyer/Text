# Labels and Condition Localization Handoff v3

Date: 2026-09-28
Owner: Chat 5
Baseline main: `3fc5495310e281cf5cbe52da3642000f1cb1fb05`
Scope: items 109–119
Integration: selective copy/wiring only.

## SAFE_LABELS_HINTS_SOURCE

Sources:
- `docs/relationship-prep/LABELS_DICTIONARY_LOCALIZATION_DEBT_AUDIT_V1.md`
- `docs/relationship-prep/HINTS_DICTIONARY_RU_EN_SOURCE_V1.md`
- `docs/relationship-prep/HOUSING_LABELS_RU_EN_SOURCE_V1.md`
- `docs/relationship-prep/INVENTORY_RESOURCE_LABELS_RU_EN_SOURCE_V1.md`

Fixture:
- `prior-work/astra/prototype-m3.2/content/global-labels-hints-localization-v1.fixture.json`

Item 116 contains 51 additive RU+EN presentation entries:
- 4 season labels;
- 12 target-stat hints;
- 6 housing labels;
- 7 item labels;
- 2 resource labels;
- 13 generic/legacy metric labels;
- 7 meta-unlock labels.

Existing target-stat label keys are reused.

## CONDITION_PRESENTATION_SOURCE_READY

Sources:
- `docs/relationship-prep/CONDITION_EXPLANATION_TEMPLATES_RU_EN_V2.md`
- `prior-work/astra/prototype-m3.2/content/condition-state-word-localization-v1.fixture.json`

Item 114 contains 28 additive presentation entries for condition state words, grammar words, comparison symbols, logical separators and the not-required prefix.

Condition objects, IDs, values and operators remain authoritative.

## UI_SHELL_DELTA_V3

Fixture:
- `prior-work/astra/prototype-m3.2/content/global-ui-shell-localization-v3.fixture.json`

Item 115 rebases item 105 after PR53:
- 34 exact-identical root keys removed;
- `stat.endurance.label` reused for the Activity endurance label;
- condition state/separator words delegated to item 114;
- season/label/hint content delegated to item 116;
- 60 additive UI shell/template entries remain.

## Collision status

Across items 114–116:
- item 114: 28 entries
- item 115: 60 entries
- item 116: 51 entries
- total unique: 139
- cross-fixture duplicate keys: 0
- additive against audited current root: 139
- conflicts: 0

Lead must repeat this check on the exact integration head.

## SHARED_UI_WIRING_REQUIRED

Consumer map:
- `docs/relationship-prep/LABELS_HINTS_CONDITIONS_CONSUMER_MAP_V1.md`

Recommended domain keys:
- stat label → `stat.<id>.label`
- stat hint → `stat.<id>.hint`
- resource → `resource.<id>.label`
- generic/legacy metric → `metric.<id>.label`
- season → `season.<id>.label`
- housing → `housing.<id>.label`
- item → `item.<id>.label`
- meta unlock → `unlock.<id>.label`

Fallback remains current label/hint text or stable ID.

## CONDITION_EXPLAIN_CONSUMER_REQUIRED

Lead presentation wiring should:
1. keep the exact current Condition object;
2. resolve labels from stable domain keys;
3. resolve state words from item 114;
4. format the item-113 template;
5. preserve comparisons and values;
6. recurse through all/any/not without changing the condition tree.

No gameplay ID translation is required.

## ERROR_WRAPPERS_READY

Source:
- `docs/relationship-prep/PLAYER_FACING_ERROR_WRAPPER_LOCALIZATION_V2.md`

Localized wrappers are ready for import, load/recovery, presentation-load and startup errors. Existing diagnostic detail can remain inside the `{error}` placeholder.

## REMAINING_HARDCODED_RU

Source:
- `docs/relationship-prep/REMAINING_HARDCODED_RU_DEBT_CLOSURE_AUDIT_V2.md`

After this wave, the next Chat5-owned shell seams are:
- event eyebrow `Встреча`;
- `Судьба принята`;
- `Срок истёк`;
- `Судьбы и следующая жизнь`;
- town `Ночлег сегодня: ...` prefix.

Night/lodging copy remains other-owner scope.

## Exact selective-copy files

109. `mindy-successor/docs/relationship-prep/LABELS_DICTIONARY_LOCALIZATION_DEBT_AUDIT_V1.md`
110. `mindy-successor/docs/relationship-prep/HINTS_DICTIONARY_RU_EN_SOURCE_V1.md`
111. `mindy-successor/docs/relationship-prep/HOUSING_LABELS_RU_EN_SOURCE_V1.md`
112. `mindy-successor/docs/relationship-prep/INVENTORY_RESOURCE_LABELS_RU_EN_SOURCE_V1.md`
113. `mindy-successor/docs/relationship-prep/CONDITION_EXPLANATION_TEMPLATES_RU_EN_V2.md`
114. `mindy-successor/prior-work/astra/prototype-m3.2/content/condition-state-word-localization-v1.fixture.json`
115. `mindy-successor/prior-work/astra/prototype-m3.2/content/global-ui-shell-localization-v3.fixture.json`
116. `mindy-successor/prior-work/astra/prototype-m3.2/content/global-labels-hints-localization-v1.fixture.json`
117. `mindy-successor/docs/relationship-prep/LABELS_HINTS_CONDITIONS_CONSUMER_MAP_V1.md`
118. `mindy-successor/docs/relationship-prep/PLAYER_FACING_ERROR_WRAPPER_LOCALIZATION_V2.md`
119. `mindy-successor/docs/relationship-prep/REMAINING_HARDCODED_RU_DEBT_CLOSURE_AUDIT_V2.md`
120. `mindy-successor/docs/relationship-prep/LABELS_CONDITIONS_LOCALIZATION_HANDOFF_V3.md`

## Recommended Lead order

1. Recheck items 114–116 against exact current root.
2. Merge additive condition-state words, labels/hints and shell templates.
3. Wire consumers from item 117.
4. Refactor condition explanation presentation only.
5. Wire error wrappers from item 118.
6. Verify item 119 residual debt.
7. Run exact-head UI/CI acceptance.

## Acceptance invariants

Locale switching preserves IDs, conditions, eligibility, resources, housing, inventory, event/choice state, Save and RNG. Only presentation changes.
