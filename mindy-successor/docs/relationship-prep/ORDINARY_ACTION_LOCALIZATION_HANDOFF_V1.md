# Ordinary Action Localization Handoff v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `df0119fd6574b69ab89cf1a99ae77adae3d811f1`
Scope: queue items 121–131
Integration mode: selective copy/wiring only; do not wholesale-merge the worker branch.

## SAFE_ACTION_KEYS

Primary source fixture:
- `prior-work/astra/prototype-m3.2/content/ordinary-action-localization-v1.fixture.json`

Item 125 contains 52 RU+EN presentation keys for exact current ordinary-action identities:
- 16 action labels;
- 16 descriptions;
- 16 current `default` scene text keys;
- 2 existing brew recipe button labels;
- 2 brew recipe journal-outcome source keys.

Audited action IDs:
- `work`
- `forage`
- `brew`
- `sell`
- `scales`
- `exam`
- `deliver`
- `visit`
- `oddjob`
- `repay`
- `rent-room`
- `rest`
- `arrival`
- `forest-search`
- `tavern-talk`
- `landlord`

Source docs:
- `ORDINARY_ACTION_LABELS_DESCRIPTIONS_RU_EN_V1.md`
- `ORDINARY_ACTION_SCENE_TEXT_RU_EN_V1.md`
- `BREW_RECIPE_UI_COPY_RU_EN_V2.md`

## REUSE_EXISTING

Collision audit:
- `docs/relationship-prep/ORDINARY_ACTION_LOCALIZATION_COLLISION_AUDIT_V1.md`

On the audited main:
- ADDITIVE: 50
- IDENTICAL: 2
- REUSE_EXISTING: 0
- CONFLICT: 0

The two IDENTICAL keys are the already-shipped brew recipe buttons:
- `ui.work.recipeReliable`
- `ui.work.recipeFast`

Keep their current root entries; do not replace unnecessarily.

Lead must repeat collision classification on the exact integration head.

## CURRENT DIRECT CONSUMERS

Consumer map:
- `docs/relationship-prep/ORDINARY_ACTION_CONSUMER_MAP_V1.md`

Current normal UI directly lists:
- Explore: `forest-search`, `tavern-talk`, `forage`, `landlord`, `visit`, `oddjob`
- Bag: `repay`, `rent-room`

For these cards, root label/description merge is immediately useful because `actionList()` already resolves:
- `action.<id>.label`
- `action.<id>.description`

Other exact catalog actions in this source are current but do not all have a normal direct panel listing after the latest UI restructuring.

## RESULT_CONSUMER_REQUIRED

Result expectation fixture:
- `prior-work/astra/prototype-m3.2/content/ordinary-action-result-localization-v1.fixture.json`

Item 128 defines expected RU/EN result title/body for all 16 action identities using:
- action ID;
- scene ID;
- current presentation ID;
- stable label/body keys.

Current engine stores:
- stable `lastAction.id`;
- raw `lastAction.title`;
- raw `lastAction.text`;
- media/presentation ID.

Current generic result UI renders raw title/text unless an event outcome ref or School-course special case exists.

Lead-owned result integration should:
1. preserve exact action transaction;
2. retain/derive the exact selected scene identity;
3. render title from `action.<id>.label`;
4. render body from `action.<id>.scene.<sceneId>.text`;
5. fall back to stored raw title/text if no stable key/ref exists;
6. never persist the selected RU/EN translation as gameplay identity.

## JOURNAL_LIMITATION

Source:
- `docs/relationship-prep/ORDINARY_ACTION_JOURNAL_LOCALIZATION_EXPECTATIONS_V1.md`

Ordinary action completion logs currently append raw text with `journalRef=null`.

This includes:
- `<catalog label>. Осталось энергии: <n>.`
- brew success line;
- brew fast-failure line.

Event-choice rows created after an action may have stable event refs and localize independently; the ordinary action log row remains raw.

Do not:
- fuzzy-match old Russian prose;
- infer action IDs from strings;
- rewrite old/current Save rows merely because locale changes.

A future action-journal ref should use stable action/log-kind identity.

## NATURAL-PATH ACCEPTANCE

Source:
- `docs/relationship-prep/ORDINARY_ACTION_LOCALIZATION_NATURAL_PATH_MATRIX_V1.md`

Representative paths cover:
- Explore card without requirements;
- Explore card with requirements;
- Bag debt/housing actions;
- arrival;
- brew recipe branches;
- event-followed ordinary actions.

Across RU↔EN switching:
- same action ID;
- same condition truth;
- same enabled state;
- same cost;
- same scene selection;
- same effects/deltas;
- same action count/slot;
- same event resolver behavior;
- same RNG;
- same Save identity.

## FOREST / SCHOOL / CAREER OWNERSHIP

Excluded from this ordinary-action wave:
- Forest Activity route/result content;
- School course system and School-owned result copy;
- career `*.shift` labels/results already handled in prior streams;
- legacy seasonal career-route copy for `tavern/lumber/hunt/guard`;
- poverty;
- Foreman;
- Secret Debt.

`forest-search` remains only the exact current legacy/tutorial storehouse action.

`exam` remains the exact current legacy action identity and does not modify the current School-course system.

## REMAINING_DEBT

Source:
- `docs/relationship-prep/POST_ACTION_LOCALIZATION_VISIBLE_DEBT_INVENTORY_V1.md`

After this source wave, remaining normal-player localization work includes:
- shared ordinary/career result presentation consumer;
- ordinary-action journal refs;
- remaining direct generic label/hint wiring;
- ending title/description localization;
- gameplay runtime semantic error-code layer;
- semantic display labels for stable raw domain IDs.

## Exact selective-copy files

121. `mindy-successor/docs/relationship-prep/ORDINARY_ACTION_LOCALIZATION_DEBT_AUDIT_V1.md`
122. `mindy-successor/docs/relationship-prep/ORDINARY_ACTION_LABELS_DESCRIPTIONS_RU_EN_V1.md`
123. `mindy-successor/docs/relationship-prep/ORDINARY_ACTION_SCENE_TEXT_RU_EN_V1.md`
124. `mindy-successor/docs/relationship-prep/BREW_RECIPE_UI_COPY_RU_EN_V2.md`
125. `mindy-successor/prior-work/astra/prototype-m3.2/content/ordinary-action-localization-v1.fixture.json`
126. `mindy-successor/docs/relationship-prep/ORDINARY_ACTION_CONSUMER_MAP_V1.md`
127. `mindy-successor/docs/relationship-prep/ORDINARY_ACTION_LOCALIZATION_COLLISION_AUDIT_V1.md`
128. `mindy-successor/prior-work/astra/prototype-m3.2/content/ordinary-action-result-localization-v1.fixture.json`
129. `mindy-successor/docs/relationship-prep/ORDINARY_ACTION_JOURNAL_LOCALIZATION_EXPECTATIONS_V1.md`
130. `mindy-successor/docs/relationship-prep/ORDINARY_ACTION_LOCALIZATION_NATURAL_PATH_MATRIX_V1.md`
131. `mindy-successor/docs/relationship-prep/POST_ACTION_LOCALIZATION_VISIBLE_DEBT_INVENTORY_V1.md`
132. `mindy-successor/docs/relationship-prep/ORDINARY_ACTION_LOCALIZATION_HANDOFF_V1.md`

## Recommended Lead order

1. Recheck item 125 against exact integration-head root localization.
2. Keep exact-identical brew button keys.
3. Merge approved additive ordinary action labels/descriptions/scenes.
4. Verify direct Explore/Bag cards in RU and EN.
5. Implement a locale-neutral result presentation consumer using item 128 if/when shared UI ownership permits.
6. Keep raw journal fallback behavior until stable ordinary-action journal refs exist.
7. Exercise item-130 natural paths.
8. Run exact-head UI/CI acceptance.

## Acceptance invariants

Localization changes presentation only:
- same action/scene IDs;
- same costs/economics;
- same conditions;
- same effects/yields;
- same event resolver order;
- same action counts;
- same Save identity;
- same RNG evolution.
