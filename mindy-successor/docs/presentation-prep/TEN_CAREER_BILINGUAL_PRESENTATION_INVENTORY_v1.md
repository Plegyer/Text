# Ten-Career Bilingual Presentation Inventory v1

Product rule:
- RU is source authoring;
- EN is a full second locale;
- gameplay/content IDs, semantic presentation IDs, media IDs and Save remain locale-neutral.

Current production scope:
- 10 ordinary careers;
- 40 seasonal base shift semantic surfaces;
- 10 stable `result/default` surfaces.

This inventory records localization work. It does not rewrite already-committed monolingual content blindly.

## 1. Base action labels/descriptions

Every base career action label and description shown to the player requires RU + EN.

| Career | Action ID | Current label reference | Current source state | Localization requirement | Current static fallback |
| --- | --- | --- | --- | --- | --- |
| lumber | `lumber.shift` | Lumber shift | mixed/legacy + production English | RU source + EN required | assets/stage-lumber.svg |
| satyr-maid | `satyr-maid.shift` | Satyr Maid shift | current production English | RU source + EN required | assets/stage-tavern.svg |
| undead-farm | `undead-farm.shift` | Undead Farm shift | current production English | RU source + EN required | assets/stage-forest.svg |
| tavern | `tavern.shift` | Tavern shift | current production English | RU source + EN required | assets/stage-tavern.svg |
| hunter | `hunter.shift` | Hunter shift | current production English | RU source + EN required | assets/stage-forest.svg |
| guard | `guard.shift` | Guard patrol | current production English | RU source + EN required | assets/stage-town.svg |
| merchant | `merchant.shift` | Merchant shift | current production English | RU source + EN required | assets/stage-town.svg |
| artist-geisha | `artist-geisha.shift` | Artist House shift | current production English | RU source + EN required | assets/stage-tavern.svg |
| assassin | `assassin.shift` | Assassin shift | current production English | RU source + EN required | assets/stage-town.svg |
| prostitute | `prostitute.shift` | Professional shift | current production English | RU source + EN required | assets/stage-room.svg |


### Migration rule

For currently English-only production strings:
- author/review RU source wording;
- retain/review EN as the full localized value;
- do not rename the action ID;
- do not duplicate the action for locale.

For legacy/mixed Lumber strings:
- inventory each player-facing field individually;
- normalize to reviewed RU source + EN localization;
- keep gameplay semantics unchanged.

## 2. Seasonal scene text

All 40 seasonal shift scenes require bilingual player-facing presentation text.

| Career | Season | Semantic presentationId | RU+EN fields required | Media policy |
| --- | --- | --- | --- | --- |
| lumber | spring | `job/lumber/shift/spring/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| lumber | summer | `job/lumber/shift/summer/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| lumber | autumn | `job/lumber/shift/autumn/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| lumber | winter | `job/lumber/shift/winter/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| satyr-maid | spring | `job/satyr-maid/shift/spring/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| satyr-maid | summer | `job/satyr-maid/shift/summer/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| satyr-maid | autumn | `job/satyr-maid/shift/autumn/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| satyr-maid | winter | `job/satyr-maid/shift/winter/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| undead-farm | spring | `job/undead-farm/shift/spring/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| undead-farm | summer | `job/undead-farm/shift/summer/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| undead-farm | autumn | `job/undead-farm/shift/autumn/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| undead-farm | winter | `job/undead-farm/shift/winter/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| tavern | spring | `job/tavern/shift/spring/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| tavern | summer | `job/tavern/shift/summer/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| tavern | autumn | `job/tavern/shift/autumn/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| tavern | winter | `job/tavern/shift/winter/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| hunter | spring | `job/hunter/shift/spring/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| hunter | summer | `job/hunter/shift/summer/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| hunter | autumn | `job/hunter/shift/autumn/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| hunter | winter | `job/hunter/shift/winter/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| guard | spring | `job/guard/shift/spring/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| guard | summer | `job/guard/shift/summer/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| guard | autumn | `job/guard/shift/autumn/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| guard | winter | `job/guard/shift/winter/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| merchant | spring | `job/merchant/shift/spring/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| merchant | summer | `job/merchant/shift/summer/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| merchant | autumn | `job/merchant/shift/autumn/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| merchant | winter | `job/merchant/shift/winter/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| artist-geisha | spring | `job/artist-geisha/shift/spring/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| artist-geisha | summer | `job/artist-geisha/shift/summer/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| artist-geisha | autumn | `job/artist-geisha/shift/autumn/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| artist-geisha | winter | `job/artist-geisha/shift/winter/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| assassin | spring | `job/assassin/shift/spring/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| assassin | summer | `job/assassin/shift/summer/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| assassin | autumn | `job/assassin/shift/autumn/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| assassin | winter | `job/assassin/shift/winter/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| prostitute | spring | `job/prostitute/shift/spring/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| prostitute | summer | `job/prostitute/shift/summer/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| prostitute | autumn | `job/prostitute/shift/autumn/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |
| prostitute | winter | `job/prostitute/shift/winter/default` | scene text RU+EN; caption RU+EN if shown; every GIF alt RU+EN | 3–5 candidates, locale-neutral media |


The seasonal semantic ID is shared by RU and EN.

Locale must not appear in:
- scene ID;
- presentationId;
- candidate key;
- media path;
- occurrence key.

## 3. Stable result/default surfaces

Each career already has one stable result semantic identity:

- `job/lumber/result/default`
- `job/satyr-maid/result/default`
- `job/undead-farm/result/default`
- `job/tavern/result/default`
- `job/hunter/result/default`
- `job/guard/result/default`
- `job/merchant/result/default`
- `job/artist-geisha/result/default`
- `job/assassin/result/default`
- `job/prostitute/result/default`

For each result surface localize:
- result heading/label if shown;
- result summary/body text if shown;
- any result caption;
- every candidate GIF/image alt;
- text-only fallback.

The same result presentationId serves both locales across all seasons.

## 4. Multi-GIF alt inventory

Every 3–5 candidate pool needs **two alt values per candidate**:

```text
candidateKey: <locale-neutral>
mediaPath: <locale-neutral>
alt.ru: <Russian source alt>
alt.en: <English alt>
```

### Minimum coverage

For the 40 seasonal shift surfaces:
- at least 3 candidates/surface once multi-GIF ships;
- therefore at least 120 candidate mappings;
- each mapping requires RU + EN alt.

Reuse can reduce the number of unique GIF files but does **not** remove per-semantic localized alt requirements.

## 5. Static fallback alt

Current static fallback files are locale-neutral.

Required localization is their semantic mapping alt/context, not duplicated files.

Fallback families:
- Lumber -> `assets/stage-lumber.svg`;
- Satyr Maid/Tavern/Artist-Geisha -> `assets/stage-tavern.svg`;
- Undead Farm/Hunter -> `assets/stage-forest.svg`;
- Guard/Merchant/Assassin -> `assets/stage-town.svg`;
- Prostitute -> `assets/stage-room.svg`.

Each semantic mapping should expose:
- `alt.ru`;
- `alt.en`.

## 6. Existing Lumber-only authored identities

The following presentation identities already exist and therefore belong in bilingual migration/review:

- `job/lumber/event/lumber-career-first-shift/default`;
- `relationship/lumber-foreman/lumber-foreman-notice/default`;
- `relationship/lumber-foreman/lumber-night-foreman-professional/default`;
- `ending/lumber/hard-work`;
- `ending/lumber/forewoman`;
- `ending/lumber/forest`.

For each existing identity localize:
- visible scene/result text;
- captions;
- alt;
- text fallback;
- ending title/description/epilogue where player-facing.

### Hard Work

Only the existing Lumber Hard Work identity is listed here.

Do **not** create:
- Satyr Maid Hard Work presentation IDs;
- Undead Farm Hard Work presentation IDs;
- Hard Work identities for the remaining seven careers

until their gameplay/content identities actually exist.

## 7. Other future milestones/endings

For the other nine careers, localization work is **CONTENT_IDENTITY_FIRST**.

Once a milestone/relationship/Night/ending semantic identity is authored:
1. keep that one semantic ID for RU + EN;
2. author RU source text;
3. provide EN localization;
4. provide RU + EN candidate alt;
5. do not create locale-specific gameplay copies.

## 8. Bilingual acceptance status

### Ready for localization authoring now
- all 10 base action labels/descriptions;
- all 40 seasonal scene texts;
- all 10 result/default presentation surfaces;
- current static fallback alt mappings;
- all future multi-GIF candidate alt under those 50 shipped surfaces;
- existing Lumber milestone/relationship/ending identities.

### Waiting on content identity
- non-Lumber Hard Work/endings;
- unshipped career milestones;
- unshipped relationship/Night event surfaces;
- cross-system career-specific events not yet authored.

## 9. Language-switch invariant

For every career:
- RU -> EN changes player-facing strings only;
- selected gameplay action stays the same;
- selected seasonal scene stays the same;
- selected GIF candidate stays the same for the same occurrence;
- result/default identity stays the same;
- no reward/progress/RNG/Save value changes.
