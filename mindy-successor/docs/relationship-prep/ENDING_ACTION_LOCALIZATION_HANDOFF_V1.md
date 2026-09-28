# Ending / Action Localization Handoff v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `52ddc76148e33836d3161b63bf4c25ffb5c39d02` (post-PR58)
Scope: queue items 133–143
Integration mode: selective copy/wiring only; do not wholesale-merge the worker branch.

## ENDING_KEYS_READY

Primary ending fixture:
- `prior-work/astra/prototype-m3.2/content/ending-localization-v1.fixture.json`

Source/review:
- `docs/relationship-prep/CURRENT_MAIN_ENDING_LOCALIZATION_DEBT_AUDIT_V1.md`
- `docs/relationship-prep/ENDING_RU_SOURCE_COPY_POLISH_V1.md`
- `docs/relationship-prep/ENDING_EN_PARITY_REVIEW_V1.md`

Coverage:
- exact current ending IDs: 9
- localized title keys: 9
- localized description keys: 9
- total ending strings: 18
- epilogues: intentionally excluded
- conditions/rewards/metaRewards: not present in localization fixture

Stable key form:

`ending.<endingId>.title`

`ending.<endingId>.description`

The three current Lumber fixture endings receive player-facing RU+EN copy while preserving their exact current condition families and compatibility reward identities.

## ACTION_RESULT_KEYS_READY

Key map:
- `prior-work/astra/prototype-m3.2/content/ordinary-action-result-key-map-v2.fixture.json`

Result text source:
- `prior-work/astra/prototype-m3.2/content/ordinary-action-result-localization-v2.fixture.json`

Coverage:
- exact current ordinary action IDs: 16
- exact current scene ID per action: `default`
- title keys: 16
- body keys: 16
- total action-result strings: 32

Stable result identity:

`actionId + sceneId`

Stable presentation keys:

`action.<actionId>.label`

`action.<actionId>.scene.<sceneId>.text`

Item 140 also records the exact current presentation ID for every mapped ordinary action.

## SHARED_CONSUMER_REQUIRED

### Ending cards

Current Legacy panel still renders raw:
- `e.title`
- `e.description`

Lead wiring should use:

`tr(`ending.${e.id}.title`,e.title)`

`tr(`ending.${e.id}.description`,e.description)`

Consumer map:
- `docs/relationship-prep/ENDING_LOCALIZATION_CONSUMER_MAP_V1.md`

The inactive-run end-state screen currently does not display ending title/description directly, so no second namespace is needed.

### Ordinary action results

Current generic result UI still renders raw:
- `lastAction.title`
- `lastAction.text`

The engine preserves `lastAction.id`, but ordinary result localization also needs the exact selected scene identity retained or safely derived.

Lead presentation behavior should:
1. keep the same action transaction;
2. keep the same selected scene;
3. render title from the item-140 title key;
4. render body from the item-140 body key;
5. fall back to stored raw title/text when stable identity is unavailable;
6. never persist the selected RU/EN translation as gameplay identity.

No Save field is proposed by Chat 5 in item 140/141.

## CONDITION / NATURAL-PATH ACCEPTANCE

Ending requirement expectations:
- `docs/relationship-prep/ENDING_CONDITION_DISPLAY_EXPECTATION_MATRIX_V1.md`

Ending RU↔EN natural-path matrix:
- `docs/relationship-prep/ENDING_NATURAL_PATH_RU_EN_MATRIX_V1.md`

Locked acceptance:
- same condition objects;
- same availableEndings;
- same reward ID;
- same metaRewards;
- same acceptedEnding;
- same Save;
- same RNG.

`ending.lumber.hard-work` remains exact:

`careerCounter(lumber, completed_shifts) >= 50`

No Foreman, School or Forest gate is added to Hard Work.

## COLLISION STATUS

Audit:
- `docs/relationship-prep/ENDING_ACTION_LOCALIZATION_COLLISION_AUDIT_V1.md`

Against the exact audited post-PR58 root:
- ADDITIVE: 50
- IDENTICAL: 0
- REUSE_EXISTING: 0
- CONFLICT: 0

Lead must rerun this classification against the exact integration head before root merge.

## REGRESSION SOURCE

Test:
- `prior-work/astra/prototype-m3.2/tests/ending-action-localization-source-v1.test.ts`

It validates:
- exact current ending IDs;
- exact current ordinary action IDs and scene IDs;
- item-140 ↔ item-141 key-map agreement;
- complete RU+EN pairs;
- ending localization has no conditions/rewards/metaRewards;
- action result fixture has no conditions/effects/rewards/RNG/Save/cost/wage fields.

Exact-head CI remains Lead/QA ownership.

## SELECTIVE_COPY

133. `mindy-successor/docs/relationship-prep/CURRENT_MAIN_ENDING_LOCALIZATION_DEBT_AUDIT_V1.md`
134. `mindy-successor/docs/relationship-prep/ENDING_RU_SOURCE_COPY_POLISH_V1.md`
135. `mindy-successor/docs/relationship-prep/ENDING_EN_PARITY_REVIEW_V1.md`
136. `mindy-successor/prior-work/astra/prototype-m3.2/content/ending-localization-v1.fixture.json`
137. `mindy-successor/docs/relationship-prep/ENDING_LOCALIZATION_CONSUMER_MAP_V1.md`
138. `mindy-successor/docs/relationship-prep/ENDING_CONDITION_DISPLAY_EXPECTATION_MATRIX_V1.md`
139. `mindy-successor/docs/relationship-prep/ENDING_NATURAL_PATH_RU_EN_MATRIX_V1.md`
140. `mindy-successor/prior-work/astra/prototype-m3.2/content/ordinary-action-result-key-map-v2.fixture.json`
141. `mindy-successor/prior-work/astra/prototype-m3.2/content/ordinary-action-result-localization-v2.fixture.json`
142. `mindy-successor/docs/relationship-prep/ENDING_ACTION_LOCALIZATION_COLLISION_AUDIT_V1.md`
143. `mindy-successor/prior-work/astra/prototype-m3.2/tests/ending-action-localization-source-v1.test.ts`
144. `mindy-successor/docs/relationship-prep/ENDING_ACTION_LOCALIZATION_HANDOFF_V1.md`

## Recommended Lead order

1. Recheck item 136 and item 141 against exact integration-head root localization.
2. Merge approved ending title/description strings.
3. Wire ending cards through item-137 keys.
4. Merge approved ordinary action result title/body strings.
5. Add/retain locale-neutral ordinary action result scene identity under Lead shared-runtime/UI ownership if needed.
6. Exercise item-138/139 ending acceptance invariants.
7. Run item-143 plus exact-head project CI.

## REMAINING_DEBT

After this wave, normal-player localization debt still includes:

### Ending epilogues / accepted-ending journal line
Item 136 does not localize epilogues. Current inactive-run end-state shows the last journal line, so ending epilogue presentation is a separate source/consumer wave.

### Ordinary action journal refs
Ordinary action completion and brew outcome rows still use raw journal fallback without stable action-log refs.

### Career/other result consumer
The shared generic result consumer also affects current career results; earlier Chat5 career-result source remains separate.

### Requirement semantic names
Some career/quest/relationship/fact/stage/counter IDs can remain visible after grammar localization until a reviewed semantic-name layer exists.

### Legacy visit-action labels
Ending `visits` display for exact legacy action IDs such as `tavern` / `lumber` still needs bilingual legacy action-name presentation if Lead wants fully natural EN requirement text.

## Ownership exclusions

Do not use this handoff to change:
- School mechanics/content;
- poverty;
- Forest Activity route/result semantics;
- Foreman relationship mechanics;
- Secret Debt;
- ending conditions/rewards/metaRewards;
- ordinary action economics/effects;
- RNG/Save semantics.
