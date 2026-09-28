# Post-PR59 bilingual visible-debt audit v1

Status: COMPLETE / CURRENT_NORMAL_PLAYER_DEBT_RECORDED

Current main:
`54131488c65302f81b3001abaaa345d21f0281e2`.

Scope:
normal-player visible RU-only or mixed-language presentation after PR59.

Excluded:
- debug Event Inspector;
- editor/developer diagnostics unless surfaced as ordinary player errors;
- Product-open content/mechanics;
- staged worker-only text/assets.

## What PR59 improved

PR59 ships:
- logging-road route-specific static;
- route help in RU+EN;
- logging-road alt/caption RU+EN;
- old-boundary alt/caption RU+EN;
- locale-invariant route media behavior.

Root localization now contains:
`664` bilingual keys.

Missing RU:
`0`.

Missing EN:
`0`.

Existing-key completeness does not equal full visible bilingual completion because several player surfaces still consume raw catalog/Save identifiers/text.

## 1. Selected Forest route displays raw persisted routeId

Current Activity status line renders:
`ui.activity.routeLabel`
followed by:
`activity.internalState.routeId`.

Visible values:
- `logging-road`;
- `old-boundary`.

Approved bilingual route-option labels already exist:
- Лесовозная дорога / Logging road;
- Старая межевая тропа / Old boundary path.

Debt:
`SHARED_ROUTE_LABEL_CONSUMER`.

Fix is render-only and must keep persisted routeId unchanged.

## 2. Legacy ending cards remain raw catalog text

Current Legacy panel renders:
- `e.title`;
- `e.description`
directly.

Current 9-ending catalog is mixed-language by source:
- six older ending titles/descriptions are Russian source;
- three Lumber fixture ending titles/descriptions are English source.

Consequences:
- EN locale still shows Russian source on the first six cards;
- RU locale still shows English source on the three Lumber fixture cards.

Chat5 has complete 18-key RU+EN source for all 9 endings.

Debt:
`ENDING_CARD_CONSUMER + ROOT_KEYS`.

## 3. Ending condition values still expose stable raw semantic IDs

PR56 localizes condition grammar, but some values remain intentionally raw:
- career IDs;
- counters;
- career facts;
- relationship IDs;
- relationship stages;
- item capabilities.

Examples on current Lumber endings include:
- `lumber`;
- `completed_shifts`;
- `management-school-ready`;
- `forewoman-problem-resolved`;
- `lumber.foreman`;
- `route-professional`;
- `forest-truth-known`;
- `forest-problem-resolved`.

This is not gameplay drift, but it is mixed technical/player text.

Debt:
`SEMANTIC_NAME_LAYER`.

Do not rename persisted IDs to solve it.

## 4. Legacy ending visit requirements use raw action labels

The `visits` condition display for:
- tavern;
- lumber
derives from current action definitions.

Dedicated bilingual:
- `action.tavern.label`;
- `action.lumber.label`
are not currently root-loaded.

Full EN ending requirement presentation therefore remains incomplete.

Debt:
`LEGACY_ACTION_LABEL_SOURCE/CONSUMER`.

## 5. Ordinary action cards remain RU fallback for the 16 legacy action slice

Current action-list UI calls:
- `action.<id>.label`;
- `action.<id>.description`
with raw catalog fallback.

For the reviewed 16 ordinary/legacy actions:
- root `action.<id>.label` present: 0/16;
- root `action.<id>.description` present: 0/16.

Thus EN Explore/Bag/ordinary-action cards still show Russian catalog fallback for these actions.

Chat5 result source covers:
- 16 bilingual labels;
- 16 bilingual result bodies.

It does not by itself add all action-card descriptions.

Debt:
`ORDINARY_ACTION_LABEL/DESCRIPTION_ROOT_SOURCE`.

## 6. Ordinary action result screen remains raw fallback

Current generic result screen localizes:
- School result via School-specific path;
- event-choice result via PR54 outcomeRef.

Otherwise it renders:
- `lastAction.title`;
- `lastAction.text`.

For the exact 16 ordinary actions in the Chat5 result source, current EN result presentation remains raw Russian fallback.

Chat5 has:
- 16 exact action IDs;
- sceneId `default`;
- 32 complete RU+EN result keys.

Debt:
`ORDINARY_ACTION_RESULT_CONSUMER + ROOT_KEYS`.

## 7. Profession result screen can remain English source in RU

The 10 current career shift action cards have bilingual:
- `action.<shift>.label`;
- `action.<shift>.description`.

But generic post-action result rendering still uses raw stored `lastAction.title/text` unless it is School/event-choice.

Current profession action definitions use English source labels/descriptions.

Therefore an RU career-shift result can still show English raw result text even though the Work card itself is localized.

Seasonal scene-text localization remains a separate prior source/consumer debt.

Debt:
`CAREER_ACTION_RESULT_CONSUMER / SEASONAL_SCENE_TEXT`.

## 8. Ordinary action Journal rows remain raw stored prose

PR54 Journal refs localize event-choice rows only.

Current ordinary action completion logging uses:
`journalRef = null`.

The stored row is raw source prose.

Brew success/failure extra rows also have no stable ref.

Consequences:
- locale switch cannot safely rerender these historical rows;
- old/current raw rows remain in their source language.

Debt:
`ORDINARY_ACTION_JOURNAL_REF_LAYER`.

Do not fuzzy-match prose.

## 9. Ending epilogue/end-state Journal prose remains raw

Current inactive-run screen shows:
`r.journal.at(-1)`.

Ending title/description source does not localize:
- ending epilogues;
- acceptance/completion Journal prose.

Debt:
`ENDING_EPILOGUE/JOURNAL_PRESENTATION`.

Do not alter ending eligibility/reward to solve it.

## 10. Stats profession names use raw catalog action labels

Current Stats panel profession summary uses:
`catalog.definitions.actions.find(...).label`
directly.

The 10 profession source labels in definitions are English.

Even though bilingual action label keys already exist for these professions, Stats does not use them.

RU Stats can therefore show English profession names.

Debt:
`GENERIC_ACTION_LABEL_CONSUMER`.

## 11. Work effect tags use raw RU label dictionary

Current Work action effect tags use:
`labels[e.key]`
directly rather than the shipped stat label helper.

In EN, these stat-effect tags can remain Russian.

Debt:
`STAT_LABEL_CONSUMER_REUSE`.

No new stat localization source is needed; PR58 already ships stat labels.

## 12. Legacy inheritance names use raw label dictionary

Current Legacy inheritance row uses:
`state.meta.unlocks.map(k => labels[k])`.

This remains dictionary/raw-source presentation and lacks a complete stable bilingual unlock-name consumer.

Debt:
`META_UNLOCK_DISPLAY_LABELS`.

Meta unlock identity must not be renamed.

## 13. Generic Night fallback exposes machine phase text

Known LodgingResolution and VoluntaryNightChoice screens are localized.

The generic Night fallback still renders:
`night.phase`
directly.

If reached visibly, the player can see a machine phase identifier.

Debt:
`NIGHT_PHASE_DISPLAY_LABEL`.

This is render text only; NightFlow phase persistence must remain unchanged.

## 14. Runtime gameplay error payloads

Ordinary command failures can surface raw:
`Error.message`
inside the player toast.

Some engine messages remain source-language strings.

A proper future solution needs stable semantic error codes/parameters.

Debt:
`RUNTIME_ERROR_PRESENTATION_LAYER`.

Do not branch mechanics on translated error text.

## 15. Event localization coverage remains incomplete

Current root event coverage from the post-PR52/PR58 baseline remains:
- fully root-localized: 40/46;
- zero root event-localization: 6/46.

Remaining IDs:
- `ds-lumber.first`;
- `ds-lumber.second`;
- `ds-lumber.done`;
- `lumber-cross.school-management-return`;
- `lumber-cross.activity-forest-return`;
- `lumber.career-first-shift`.

PR59 does not add event title/body/choice localization for these.

Reachability varies; this audit does not equate all six with the same current player frequency.

## 16. Root media-alt key debt remains

Current root pack-media bilingual alt coverage remains incomplete.

Project-owned semantic static accessibility is much stronger and PR59 adds route accessibility, but generic pack media still has untranslated-root-key debt.

Do not count Product-open/catalog-only media as normal-player blockers without reachability proof.

## Already closed normal-player slices

Do not reopen:
- creation shell;
- menu primary shell;
- season HUD;
- global UI shell;
- shared Night/lodging primary screens;
- Stats stat labels/hints;
- Bag item labels;
- pending event eyebrow;
- event-choice Journal/lastAction refs;
- School result localization;
- logging-road route help/media accessibility.

## Product-open exclusions

This debt audit does not request localization/activation of:
- Hunter Forest token/clue mechanics;
- Old Boundary token lifecycle;
- route challenge/reward topology;
- teacher routing;
- Secret Debt;
- Palace authored content;
- deeper relationship/endings not in current definitions.

## Priority closure order

Highest-value current normal-player fixes:

1. selected route label consumer;
2. ending card title/description integration;
3. ordinary action result integration;
4. ordinary action card title/description integration;
5. Stats profession/effect-tag helper reuse;
6. ordinary action Journal identity/ref design;
7. ending epilogue/end-state Journal source;
8. semantic display names for stable IDs/runtime errors.

## Verdict

Current product remains:
`PARTIAL_BILINGUAL`.

PR59 closes route media/accessibility for logging-road, but raw identity/result/history consumers remain the dominant normal-player mixed-language debt.
