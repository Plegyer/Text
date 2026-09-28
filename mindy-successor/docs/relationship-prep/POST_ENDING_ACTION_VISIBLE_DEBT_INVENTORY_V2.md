# Post-Ending / Action Visible Debt Inventory v2

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `54131488c65302f81b3001abaaa345d21f0281e2` (post-PR59)

Interpretation: this inventory assumes items 146/147 are available as production localization data, but current shared UI/runtime consumers remain unchanged until Lead integration.

## SHARED_CONSUMER_REQUIRED

### Ending cards

Current Legacy panel still renders:
- `e.title`
- `e.description`

Items 146/148 make all 9 exact current ending title/description pairs source-ready.

Remaining debt:
- shared Legacy-panel `tr()` wiring only.

### Ordinary action result screen

Current result screen still renders ordinary results from:
- raw `lastAction.title`
- raw `lastAction.text`

Items 147/149 provide:
- exact current ordinary action IDs;
- exact current `default` scene identity;
- stable title/body keys;
- fallback mapping.

Remaining debt:
- shared result consumer wiring;
- exact selected-scene identity retention/derivation for future multi-scene safety.

## JOURNAL_REF_LIMITATION

### Ordinary action completion rows

Still stored as raw source strings with `journalRef=null`:

`<catalog action label>. Осталось энергии: <value>.`

### Brew outcome rows

Still raw:
- successful brew;
- failed fast brew.

Item 150 confirms that no current ordinary action completion row is safely rerenderable by locale today.

### Ending / end-state journal prose

Inactive-run end state still displays:

`r.journal.at(-1)`

Current ending epilogue/result journal prose is not localized by item 146.

Remaining debt:
- ending epilogue/result presentation source;
- locale-neutral ending-journal identity if rerendering is desired.

## CONTENT SOURCE STILL NEEDED / PRIOR SOURCE EXISTS

### Ordinary action descriptions

Item 147 intentionally contains result title/body only:
- `action.<id>.label`
- `action.<id>.scene.default.text`

Current action cards also render:
- `action.<id>.description`

These description strings were prepared in the earlier ordinary-action source wave but are not part of the item-147 production result patch.

If not already integrated separately, action-card descriptions remain visible RU fallback.

### Legacy visit-action labels in ending requirements

Ending `visits` requirement display resolves exact legacy action IDs such as:
- `tavern`
- `lumber`

Current main lacks dedicated bilingual `action.tavern.label` / `action.lumber.label` keys.

Until those exist, fully natural EN ending requirement text remains incomplete.

## GENERIC LABEL / UI WIRING DEBT

Current main still has some normal-player direct catalog/dictionary reads despite PR58:

### Work effect tags

`actionList()` uses `labels[e.key]` directly for stat-effect tags.

Expected future behavior:
- reuse current stat/generic label helpers;
- no new gameplay identity.

### Stats profession names

Stats panel renders profession names from raw catalog action labels:

`catalog.definitions.actions.find(...).label`

Current career `*.shift` label localization already exists; consumer should reuse it.

### Legacy inheritance labels

Legacy panel renders:

`state.meta.unlocks.map(k => labels[k])`

Current root still lacks a complete shipped `unlock.*` consumer/source path on this baseline.

### Raw semantic IDs in condition text

Even with localized condition grammar, some values can remain stable raw IDs:
- career;
- quest;
- relationship;
- stage;
- counter;
- fact;
- choice;
- ending;
- item capability.

This is a future semantic-name layer, not a reason to rename gameplay IDs.

## GAMEPLAY RUNTIME ERROR TEXT

`perform()` still exposes raw `Error.message` from gameplay command validation in the normal toast.

Many engine errors remain Russian source strings.

Classification:
- **SEMANTIC_RUNTIME_ERROR_CODE_LAYER_REQUIRED**

Do not machine-translate arbitrary exception payloads or branch mechanics on localized text.

## ENDING EPILOGUES

Item 146 intentionally excludes epilogues.

Current ending epilogues remain catalog source only and should be handled in a separate content/presentation pass.

Do not modify ending rewards/conditions to solve epilogue localization.

## DEBUG_INTERNAL

Excluded from normal-player localization debt:
- Event Inspector button/title;
- serialized event JSON;
- editor/developer-only diagnostics not used by ordinary play.

## OTHER OWNER / EXCLUSIONS

Do not use this debt list to duplicate:
- Chat3 Night/lodging content/mechanics;
- School course content/mechanics;
- Forest Activity route/result authored semantics;
- poverty;
- Foreman relationship mechanics;
- Secret Debt.

`forest-search` remains only the ordinary legacy/tutorial action result source from item 147.

## Closure summary

After items 146/147 are selectively integrated, the major remaining visible localization debt is:

1. ending-card consumer wiring;
2. ordinary-action result consumer wiring;
3. ordinary-action Journal refs;
4. ending epilogue/end-state Journal presentation;
5. ordinary action descriptions if prior source is not yet merged;
6. legacy `tavern/lumber` action labels for ending visit requirements;
7. remaining generic direct dictionary/catalog reads;
8. runtime semantic error-code localization;
9. semantic display labels for stable raw IDs.

No gameplay mechanic change is required for items 1–7 or 9.
