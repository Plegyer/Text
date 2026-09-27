# Localization full-product shipped-surface audit v1

Status: COMPLETE / CURRENT_MAIN_PARTIAL_BILINGUAL

Audit point:
- current main: `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`
- authoritative `content/localization.json` blob: `5a2d0fa5f8759fda25cfef538154694e8f321d78`
- PR44 accepted exact head `07912a4870f82472a01f6ff8d0d81f1f67081593` is green but, at this audit point, not yet merged.
- ordinary-poverty localization is still worker-stage/selective-integration source.

Classification:
- `SHIPPED_RU_EN`: current main has non-empty RU+EN and the production renderer consumes the key.
- `RU_FALLBACK_ONLY`: a shipped localization surface relies on RU because EN is absent.
- `MISSING`: player-facing production surface has no complete current-main RU+EN localization path.
- `STAGED`: reviewed bilingual material exists off main or in an unmerged PR.

## Current-main bundle facts

Current `localization.json` contains:
- total keys: 74
- `ui.*`: 36
- `action.*`: 20
- `activity.*`: 1
- `activityOption.*`: 2
- `event.*`: 12
- `media.*`: 3

Every one of the 74 current-main localization entries has non-empty EN.

Therefore:
`RU_FALLBACK_ONLY = 0`
for the entries that actually exist in the authoritative bundle.

This does **not** mean full-product English coverage is complete; absent keys/hardcoded player-facing text are classified `MISSING`, not counted as translated through fallback.

## SHIPPED_RU_EN

### Main Work/town localization slice

The current PR41-era shell provides bilingual keys for the localized town/Work path, including:
- main town headings/prompts/dock labels that are routed through `tr(...)`;
- Work panel copy;
- Work buttons/cost/income copy;
- all ten ordinary career action labels;
- all ten ordinary career action descriptions;
- language-menu controls already covered by the shipped bundle.

The ten career gameplay action IDs remain locale-neutral.

### Forest Activity labels

Current main ships and consumes:
- `activity.lumber.forest.label`;
- `activityOption.forest.route.logging-road.label`;
- `activityOption.forest.route.old-boundary.label`.

These are presentation labels only; the Activity IDs/results are unchanged.

### Forest result authored events

PR43 current main ships RU+EN for all three exact Forest result events:
- success;
- escape;
- failure.

Covered fields include:
- title;
- variant body;
- return choice label/text;
- media alt.

This is 12 `event.*` entries plus 3 Forest-result media alt entries.

The renderer resolves them by stable event/variant/choice/media IDs while pending gameplay identity remains unchanged.

## MISSING on current main

### School internals

Current main has only two School-related localization keys:
- `ui.panel.school`;
- `ui.town.school.subtitle`.

The following current-main player-facing surfaces are not yet bilingual on main:
- School panel title/help;
- eight course labels/descriptions;
- tuition/current-Energy School copy;
- paid-lesson button;
- stat labels as shown specifically in localized School rows;
- School Night-study labels/context/button;
- current reachable School event/media copy.

Classification:
`MISSING` on current main.

PR44 provides reviewed RU+EN coverage and UI consumption for these surfaces, but until merge it is:
`STAGED_GREEN_PR44`.

### Ordinary poverty

Current main has:
`0` localization keys containing ordinary-poverty identities.

The six shipped ordinary-poverty packs therefore remain:
`MISSING`
for bilingual event title/body/choice/media-alt coverage on current main.

Chat 3 item 140 supplies a reviewed 84-key RU+EN delta for the exact current production identities and item 149 supplies natural-path evidence.

Classification:
`STAGED_RU_EN`, not shipped.

### Foreman relationship / ordinary relationship Night

Current main has no `lumber.foreman` event/media localization entries and no generic localized Night-choice label for `lumber.foreman.night`.

Player-facing current production:
- `lumber.foreman-notice`;
- `lumber-night.foreman-professional`;
- their choice copy;
- Foreman relationship media alt;
- voluntary Night choice label

is not fully bilingual from the authoritative main bundle.

Classification:
`MISSING` on main.

Chat 5 provides 11 RU+EN source keys:
- 10 event/media keys are compatible with the existing generic event/media resolver;
- 1 `nightChoice.lumber.foreman.night.label` key still needs a generic current UI lookup to become visible.

Classification:
`STAGED_RU_EN`.

### Other legacy/root authored event content

Current main still includes multiple root-loaded authored/legacy event surfaces whose fallback text lives directly in packs and has no corresponding complete RU+EN bundle entries.

Examples include:
- legacy `base.*` event family;
- Lumber career milestone/Foreman/cross events other than the separately localized Forest result pack;
- ordinary Night/lodging and non-School Night shell text;
- other authored production event families not covered by the existing 12 localized Forest event fields.

These are:
`MISSING`
for full bilingual-product acceptance.

A fallback string in a pack is not counted as complete RU+EN localization merely because the renderer can display it.

### Remaining hardcoded UI shell

The current renderer still contains player-facing hardcoded strings outside the currently keyed Work/town slice, including portions of:
- character creation;
- explore/activity descriptive shell;
- generic Night/lodging screens;
- Stats/Journal/Bag/Legacy panels;
- editor/import/export/error/status text;
- some result/ending/creation copy.

Unless an exact current localization key is present and consumed for a surface, this audit classifies it:
`MISSING`.

## STAGED

### PR44 School

PR44 exact head `07912a4...`:
- full check green 301/301;
- validator remains 17 packs / 46 events / 35 actions / 9 endings;
- School RU/EN UI/event/media coverage verified;
- gameplay Save invariant under locale switch.

Status:
`STAGED_GREEN_PR44`
until actual merge and post-merge main CI.

### Ordinary poverty

Chat 3:
- 84-key RU+EN delta;
- exact current-main event/media identity checks;
- merge collision guard;
- executable natural-path localization invariance.

Status:
`STAGED_RU_EN / READY_FOR_SELECTIVE_PR`.

### Foreman relationship

Chat 5:
- 11-key RU+EN fixture;
- complete RU+EN worker contract;
- existing event/media identities only.

Status:
`STAGED_RU_EN`.

Night-choice label remains staged pending a generic label resolver.

### Real GIF alt/caption

No real production GIF pool exists.

There are therefore no truthful production GIF candidate alt/caption keys to classify as shipped.

Status:
`STAGED/BLOCKED_BY_REAL_ASSETS`.

## RU fallback no-false-green rule

Current bundle has no missing English among its existing 74 entries, but future CI must continue distinguishing:
- key exists with RU+EN;
- key exists with RU only;
- player-facing surface has no localization key;
- reviewed bilingual key exists only in staging.

Russian fallback behavior is a resilience feature, not evidence of English translation coverage.

## Current full-product conclusion

Current main is:
`PARTIAL_BILINGUAL`, not full-product RU+EN complete.

Current strongest shipped bilingual slices are:
- town/Work + ten career action copy;
- Forest Activity labels;
- Forest result events/media.

Next reviewed bilingual candidates are:
1. PR44 School after merge/post-merge CI;
2. ordinary-poverty selective 84-key integration;
3. Foreman event/media localization with explicit Night-choice label wiring if included.

The remaining legacy event/UI shell requires further migration before full-product bilingual acceptance can be claimed.
