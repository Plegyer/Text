# Shipped bilingual coverage recompute v2

Status: COMPLETE / CURRENT_MAIN_PARTIAL_BILINGUAL

Current production main:
`1af3104c1e4c180019b965adac8e87e67de89347`
(PR46 merge).

Authoritative localization bundle:
- blob: `2ac863974fa76eac1d98debb91ba3d2f78719531`;
- total keys: 225;
- entries missing RU: 0;
- entries missing EN: 0.

Current bundle groups:
- `ui.*`: 44;
- `action.*`: 20;
- `activity.*`: 1;
- `activityOption.*`: 2;
- `event.*`: 118;
- `media.*`: 11;
- `school.*`: 16;
- `stat.*`: 12;
- `nightChoice.*`: 1.

All existing localization entries are complete RU+EN. Remaining debt is primarily missing localization coverage/hardcoded fallback, not RU-only entries.

## Shipped RU+EN families

### Town / Work

Current production ships RU+EN for the established localized town/Work slice and for all ten ordinary-career action labels/descriptions.

The 20 `action.*` keys are:
- label;
- description
for the ten ordinary career shift actions.

Gameplay action IDs remain locale-neutral.

### Forest

Current production ships RU+EN for:
- `lumber.forest` Activity label;
- logging-road label;
- old-boundary label;
- all success/escape/failure result event title/body/choice fields;
- all three Forest result media alt fields.

Exact Forest result IDs remain unchanged.

### School

PR44 production coverage remains shipped:
- School panel/help;
- all eight course labels/descriptions;
- tuition / lesson controls;
- dynamic Night-study formatting;
- twelve School stat labels;
- current reachable School lesson/life events;
- current School event media alt;
- reachable legacy `base.school`.

The 24 School Night-study gameplay choices are not duplicated into 24 locale-specific identities; visible labels are dynamically composed from current course/stat localization.

### Ordinary poverty

PR45 ships the complete reviewed 84-key ordinary-poverty slice:
- 82 event title/body/choice keys;
- `media.stage.outside.alt`;
- `media.stage.room.alt`.

All six ordinary-poverty packs have production natural-path and renderer locale-invariance coverage.

Secret Debt remains outside this slice.

### Foreman relationship / ordinary Night

PR46 is now shipped.

Current main contains all 11 reviewed Foreman keys:
- `lumber.foreman-notice` title/body/choice label/text;
- `lumber.foreman.night` Night-choice label;
- `lumber-night.foreman-professional` title/body/choice label/text;
- two Foreman media alt keys.

Generic Night-choice UI now resolves:
`nightChoice.<choiceId>.label`
for ordinary Night choices while retaining School-specific dynamic formatting.

PR46 exact-head and post-merge regressions prove the Foreman label/event locale switch does not alter gameplay Save.

## Root event coverage recompute

Current validator reports:
`46 events`.

For each root event, QA recomputed the player-facing key set:
- title;
- every variant body;
- every choice label;
- every choice text.

Fully covered current root events:
`23 / 46`.

Fully localized families include:
- `base.school`: 1;
- Forest result events: 3;
- Foreman milestone/Night: 2;
- ordinary poverty: 14;
- current School lesson/life events: 3.

Total:
`23`.

Root events still relying on embedded fallback rather than complete RU+EN event keys:
`23 / 46`.

Those are:
- legacy `base.*` except `base.school`: 7;
- `ds-lumber.*`: 3;
- `gopher.*`: 9;
- `lumber-cross.*`: 2;
- `lumber.career-first-shift`: 1;
- `stage.goblin`: 1.

These are the clearest remaining authored-event localization debt.

## Root media-alt coverage recompute

Across current root pack media definitions, QA counted:
`64` media identities.

Complete root-bundle RU+EN `media.<id>.alt` coverage:
`11 / 64`.

Covered:
- `base.workshop`;
- three Forest result media;
- two Foreman relationship media;
- three current School lesson/life media;
- `stage.room`;
- `stage.outside`.

Remaining media definitions use embedded fallback alt:
`53`.

Important interpretation:
not all 53 are currently reachable player-facing production surfaces.

Examples:
- eight School teacher media identities exist in the root catalog but remain outside current reachable teacher/exact-course production;
- many generic stage/seasonal media are catalog fallbacks reused by current presentation.

Therefore `53` is root-media migration debt, not “53 broken current scenes.”

## Generic stage / seasonal debt

Current presentation still relies heavily on embedded alt/fallback art for:
- career seasonal stage media;
- generic town/tavern/lumber/hunt/guard stage families;
- generic Forest route;
- several legacy event media.

Chat 2 items 184–195 provide 21 new project-owned static assets as selective staging source, but those assets are not yet production-activated on main.

Do not count staging accessibility keys as shipped coverage.

## Other UI fallback debt

Current renderer still has substantial player-facing hardcoded/fallback text outside the localized slices, including portions of:
- character creation;
- Explore/Activity shell;
- generic Night/lodging explanatory UI;
- Stats;
- Journal;
- Bag;
- Legacy/endings shell;
- editor/import/export/status/error surfaces.

These surfaces must be migrated deliberately; the fact that `resolveLocalizedText` has a fallback does not make them bilingual.

## No-false-green rules

`225 / 225` current localization entries having EN means:
- there is no RU-only key in the bundle.

It does not mean:
- every player-facing production string has a key;
- every root event/media surface is bilingual;
- Product-open/staged content is shipped.

Classifications remain separate:
- `SHIPPED_RU_EN`;
- `EMBEDDED_FALLBACK_DEBT`;
- `STAGED_RU_EN`;
- `PRODUCT_OPEN`.

## Current product conclusion

Current main is:
`PARTIAL_BILINGUAL`.

Strong shipped bilingual domains now include:
- town/Work ordinary-career labels;
- Forest Activity/results;
- School current reachable path;
- ordinary poverty;
- Foreman professional relationship/Night.

Largest clear next text-localization debts:
- 23 unlocalized root events;
- hardcoded generic UI/Night/creation/panel shell;
- root media-alt migration where the media is actually reachable.

Project-owned static media staging should be integrated separately from text localization so asset activation cannot be mistaken for gameplay/content promotion.
