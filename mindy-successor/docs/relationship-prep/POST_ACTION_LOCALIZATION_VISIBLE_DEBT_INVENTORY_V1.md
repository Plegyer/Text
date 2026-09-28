# Post-Action-Localization Visible Debt Inventory v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `4223be1f90f15a43938e072bc2171b0de5d2d1aa`

Interpretation: this inventory assumes generic-label source from items 109–120 and ordinary-action source from items 121–130 are available for selective integration.

## RESULT_CONSUMER_REQUIRED

### Ordinary action results
Current generic result UI still renders raw `lastAction.title` and `lastAction.text`.

Items 123/128 provide stable source identity and RU+EN expected presentation, but current Save lacks an explicit selected ordinary-action scene ID/ref.

Remaining work:
- Lead-owned stable result presentation lookup using action ID + selected scene identity;
- no locale-selected prose written as gameplay identity.

### Career result presentation
Current `*.shift` action cards already have root RU+EN label/description keys, but generic result rendering still relies on raw stored `lastAction.title/text`.

Earlier Chat5 career result/seasonal localization fixtures remain the source for that separate result consumer.

## JOURNAL_LIMITATION

### Ordinary action completion rows
Still raw and locale-insensitive:
`<catalog label>. Осталось энергии: <n>.`

### Brew outcome rows
Still raw:
- success;
- fast-method foam failure.

### Initial/fallback journal prose
Fresh-save and miscellaneous engine logs without stable refs remain source-language strings.

Event-choice rows with stable `journalRefs` are a different case and can already rerender through event choice localization.

No fuzzy text migration should be used for raw rows.

## LABEL_CONSUMER_WIRING

If item-115 generic label source is merged but direct app consumers are not rewired, current UI still exposes raw dictionary values in:
- creation stat labels/hints;
- Stats panel;
- Bag item names;
- generic result deltas;
- HUD season;
- some requirement labels.

This is wiring debt, not missing source.

## STATS_PROFESSIONS_LIST

Stats panel currently renders profession names from raw catalog action labels:

`catalog.definitions.actions.find(...).label`

The corresponding current career action labels already exist under `action.<career>.shift.label`.

Remaining work is consumer reuse; no new career copy is needed.

## ENDING_CONTENT_LOCALIZATION

Legacy panel currently renders:
- `ending.title`
- `ending.description`

directly from catalog source.

Current root has no general `ending.*` title/description localization layer.

This is a separate content-localization wave and is not solved by ordinary-action keys.

## CONDITION SEMANTIC-ID FALLBACK

After generic condition grammar is localized, some visible values may still be stable raw IDs:
- career;
- quest;
- relationship;
- stage/counter/fact/choice;
- world fact;
- ending;
- item capability.

This is a future semantic-name localization layer, not a reason to rename gameplay IDs.

## ENGINE/RUNTIME PLAYER-FACING ERRORS

Action dispatch and several engine validation paths can surface raw Russian `Error.message` text through the generic toast when a command fails.

The global shell wave localized wrappers for import/recovery/startup, but gameplay command errors still lack stable semantic error codes.

Classify as:
- **RUNTIME_ERROR_CODE_LAYER_REQUIRED**
- do not machine-translate arbitrary exception strings.

## NIGHT / OTHER OWNER

Current PR55 Night/lodging shell localization is already wired.

Do not duplicate:
- lodging/NightFlow mechanics/content;
- Forest Activity route/result authored content;
- School course copy;
- poverty;
- Foreman;
- Secret Debt.

## DEBUG_INTERNAL

Excluded:
- event catalog inspector;
- serialized debug JSON;
- editor-only internal diagnostics.

## Remaining debt summary

After generic-label + ordinary-action source is integrated, the largest remaining normal-player localization gaps are:

1. stable result presentation consumer for ordinary/career actions;
2. locale-neutral refs for ordinary action journal logs;
3. direct label/hint consumer rewiring;
4. ending title/description localization;
5. gameplay runtime error-code localization;
6. semantic labels for currently exposed raw domain IDs.

No gameplay mechanics need to change to close these presentation gaps.
