# Ending / Action Localization Handoff v2

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `54131488c65302f81b3001abaaa345d21f0281e2` (post-PR59)
Scope: queue items 145–155
Integration mode: selective copy/wiring only; do not wholesale-merge the worker branch.

## ENDING_PATCH_READY

Production patch:
- `prior-work/astra/prototype-m3.2/content/ending-localization-production-v2.fixture.json`

Rebase audit:
- `docs/relationship-prep/POST_PR59_ENDING_ACTION_REBASE_AUDIT_V2.md`

Item 146 contains the exact current 9-ending production delta:
- 9 title keys;
- 9 description keys;
- 18 RU+EN strings total.

Stable key form:

`ending.<endingId>.title`

`ending.<endingId>.description`

No ending conditions, rewards, metaRewards, epilogues or gameplay fields are present.

Current exact ending IDs remain:
- `guild-life`
- `scholar-life`
- `tavern-stay`
- `tavern-guild`
- `tavern-court`
- `lumber-stay`
- `ending.lumber.hard-work`
- `ending.lumber.forewoman`
- `ending.lumber.forest`

## ACTION_RESULT_PATCH_READY

Production patch:
- `prior-work/astra/prototype-m3.2/content/ordinary-action-result-localization-v3.fixture.json`

Current key map:
- `prior-work/astra/prototype-m3.2/content/ordinary-action-result-key-map-v2.fixture.json`

Item 147 contains:
- exact current ordinary action IDs: 16;
- exact current scene ID: `default` for each;
- 16 result title keys;
- 16 result body keys;
- 32 RU+EN strings total.

Stable key form:

`action.<actionId>.label`

`action.<actionId>.scene.<sceneId>.text`

No costs, conditions, effects, RNG or Save fields are present in item 147.

## POST-PR59 COLLISION STATUS

Item 145 rechecked item-136/item-141 source against exact post-PR59 root:

- ADDITIVE: 50
- IDENTICAL: 0
- REUSE_EXISTING: 0
- CONFLICT: 0

PR59 Forest presentation work does not consume or conflict with the ending/action localization namespaces in this wave.

Item 153 also confirms:
- no generic-label/hint namespace collision;
- no legacy event-localization collision;
- no School/Night/relationship namespace collision.

Lead should rerun collision classification on the exact integration head.

## SHARED_CONSUMER_REQUIRED

### Ending cards

Current Legacy panel still renders raw:

- `e.title`
- `e.description`

Consumer map:
- `docs/relationship-prep/ENDING_CURRENT_MAIN_CONSUMER_MAP_V2.md`

Required presentation wiring:

`tr(`ending.${e.id}.title`, e.title)`

`tr(`ending.${e.id}.description`, e.description)`

No ending-order/eligibility changes.

### Ordinary action result screen

Current result UI still falls back to raw:

- `lastAction.title`
- `lastAction.text`

Consumer map:
- `docs/relationship-prep/ORDINARY_ACTION_RESULT_CONSUMER_MAP_V3.md`

For this exact current action set, every mapped action has only the current `default` scene.

Safe current result lookup:
- identity: `actionId + sceneId`;
- title: `action.<id>.label`;
- body: `action.<id>.scene.<sceneId>.text`;
- fallback: stored raw `lastAction.title/text`.

Current `lastAction` does not persist an explicit ordinary-action scene ID. The present one-scene set is unambiguous, but future multi-scene actions require exact locale-neutral selected-scene identity under shared runtime/UI ownership.

PR59 does not change `forest-search` text identity:
- action ID `forest-search`;
- scene ID `default`;
- current presentation ID `activity/forest/route/default`.

This remains separate from Forest Activity route/result prose.

## JOURNAL_REF_LIMITATION

Matrix:
- `docs/relationship-prep/ORDINARY_ACTION_JOURNAL_REF_ELIGIBILITY_MATRIX_V1.md`

Current ordinary action completion rows:
- have stable action identity elsewhere;
- have `journalRef=null`;
- remain RAW_FALLBACK in Journal.

This applies to all 16 item-147 ordinary actions.

Brew success/failure extra rows also have no stable ref.

Existing event-choice rows are different:
- `{kind:'eventChoice',eventId,choiceId}`
- already locale-neutral;
- can rerender through existing event localization.

Do not fuzzy-match or rewrite stored Russian ordinary-action rows.

No new Save schema is proposed in this wave.

## NATURAL-PATH EXPECTATIONS

### Endings

Fixture:
- `prior-work/astra/prototype-m3.2/content/ending-localization-natural-path-v2.fixture.json`

For all 9 exact current endings it records:
- RU/EN title;
- RU/EN description;
- RU/EN acceptance label;
- exact unchanged condition objects;
- exact reward ID;
- exact metaRewards identity.

Locked Hard Work invariant:

`careerCounter(lumber, completed_shifts) >= 50`

No Foreman, School, Forest or other gate is added.

### Ordinary action results

Fixture:
- `prior-work/astra/prototype-m3.2/content/ordinary-action-result-natural-path-v2.fixture.json`

Representative current paths cover:
- forage;
- oddjob;
- repay;
- rent-room;
- arrival;
- forest-search;
- tavern-talk;
- brew gentle success;
- brew bold success;
- brew bold failure.

Each records:
- exact result identity;
- RU/EN expected title/body;
- unchanged representative deltas/state changes;
- no additional RNG from locale switching;
- same Save/gameplay identity across locales.

## REGRESSION SOURCE

Test:
- `prior-work/astra/prototype-m3.2/tests/ending-action-localization-source-v2.test.ts`

Validates:
- exact current ending IDs;
- exact current action/scene IDs;
- complete RU+EN pairs;
- production patches contain presentation fields only;
- no conditions/effects/rewards/RNG/Save/cost/wage fields;
- no current-root collision;
- no cross-owner namespace collision.

Exact-head CI execution remains Lead/QA ownership.

## SELECTIVE COPY

145. `mindy-successor/docs/relationship-prep/POST_PR59_ENDING_ACTION_REBASE_AUDIT_V2.md`
146. `mindy-successor/prior-work/astra/prototype-m3.2/content/ending-localization-production-v2.fixture.json`
147. `mindy-successor/prior-work/astra/prototype-m3.2/content/ordinary-action-result-localization-v3.fixture.json`
148. `mindy-successor/docs/relationship-prep/ENDING_CURRENT_MAIN_CONSUMER_MAP_V2.md`
149. `mindy-successor/docs/relationship-prep/ORDINARY_ACTION_RESULT_CONSUMER_MAP_V3.md`
150. `mindy-successor/docs/relationship-prep/ORDINARY_ACTION_JOURNAL_REF_ELIGIBILITY_MATRIX_V1.md`
151. `mindy-successor/prior-work/astra/prototype-m3.2/content/ending-localization-natural-path-v2.fixture.json`
152. `mindy-successor/prior-work/astra/prototype-m3.2/content/ordinary-action-result-natural-path-v2.fixture.json`
153. `mindy-successor/docs/relationship-prep/ENDING_ACTION_GENERIC_LABEL_OVERLAP_AUDIT_V1.md`
154. `mindy-successor/prior-work/astra/prototype-m3.2/tests/ending-action-localization-source-v2.test.ts`
155. `mindy-successor/docs/relationship-prep/POST_ENDING_ACTION_VISIBLE_DEBT_INVENTORY_V2.md`
156. `mindy-successor/docs/relationship-prep/ENDING_ACTION_LOCALIZATION_HANDOFF_V2.md`

## REMAINING_VISIBLE_DEBT

Inventory:
- `docs/relationship-prep/POST_ENDING_ACTION_VISIBLE_DEBT_INVENTORY_V2.md`

After accounting for items 146/147, remaining normal-player localization debt includes:

1. ending-card shared UI wiring;
2. ordinary-action result shared UI/runtime consumer;
3. ordinary-action Journal refs;
4. ending epilogue/end-state Journal localization;
5. ordinary action descriptions if the earlier source patch is not integrated;
6. bilingual legacy `tavern/lumber` labels for fully natural ending visit requirements;
7. remaining generic direct catalog/dictionary reads such as Work effect tags, Stats profession names and Legacy unlock labels;
8. gameplay runtime semantic error-code localization;
9. future semantic display labels for stable raw career/quest/relationship/fact/stage/counter IDs.

## Recommended Lead integration order

1. Recheck items 146/147 against exact integration-head root.
2. Merge item 146 ending strings.
3. Wire Legacy ending cards using item 148.
4. Merge item 147 ordinary action result strings.
5. Wire/derive exact ordinary action result scene presentation using item 149.
6. Preserve RAW_FALLBACK Journal behavior until an explicit ordinary-action journal-ref task exists.
7. Exercise item 151/152 natural-path expectations.
8. Run item 154 and exact-head project CI.

## Acceptance invariants

RU↔EN switching must preserve:
- ending/action IDs;
- scene IDs;
- ending conditions/eligibility;
- rewards/metaRewards;
- action costs/effects/economics;
- event resolver order;
- Forest Activity ownership/semantics;
- acceptedEnding;
- Save identity;
- RNG evolution.

Only visible/accessibility presentation changes.
