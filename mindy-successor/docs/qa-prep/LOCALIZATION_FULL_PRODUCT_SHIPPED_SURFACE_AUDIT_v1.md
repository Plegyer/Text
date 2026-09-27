# Localization full-product shipped-surface audit v1

Status: COMPLETE / CURRENT_MAIN_PARTIAL_BILINGUAL

Audit point:
- current main: `c0763f9f9fa9887593fe8567165bbedce2b6cd3a` (PR45 merge);
- authoritative `content/localization.json` blob: `d23a3b7a86db460e6dc88bf25d0f34a0559c092b`;
- post-merge main workflow #67 / id `36323485949`: SUCCESS;
- tests: 304/304;
- validator: 17 packs, 46 events, 35 actions, 9 endings.

Classification:
- `SHIPPED_RU_EN`: current main has non-empty RU+EN and production consumes the localization path.
- `RU_FALLBACK_ONLY`: a shipped localization entry lacks EN and relies on RU fallback.
- `MISSING`: player-facing production surface lacks complete current-main RU+EN localization.
- `STAGED`: reviewed bilingual material exists off main but is not production-integrated.

## Current-main bundle facts

Current `localization.json` contains 214 keys:
- `ui.*`: 44
- `action.*`: 20
- `activity.*`: 1
- `activityOption.*`: 2
- `event.*`: 110
- `media.*`: 9
- `school.*`: 16
- `stat.*`: 12

All 214 entries have non-empty English.

Therefore:
`RU_FALLBACK_ONLY = 0`
for entries currently present in the authoritative bundle.

Absent/hardcoded player-facing surfaces are still `MISSING`; fallback rendering does not make them bilingual.

## SHIPPED_RU_EN

### Town / Work

Current main ships the established RU+EN town/Work path:
- localized main town/dock copy where routed through `tr(...)`;
- Work panel and controls;
- all ten ordinary career action labels and descriptions;
- current language/menu strings covered by the bundle.

Gameplay action IDs remain locale-neutral.

### Forest

Current main ships:
- `activity.lumber.forest.label`;
- route labels for `forest.route.logging-road` and `forest.route.old-boundary`;
- RU+EN success/escape/failure result title/body/choice text;
- RU+EN Forest result media alt.

The exact `activityResult` identities remain unchanged.

### School

PR44 is shipped on main.

Current main contains and consumes RU+EN for:
- School panel title/help;
- eight course labels and eight descriptions;
- tuition/current-Energy string;
- paid-lesson button;
- School Night-study button/context/choice formatting;
- paid-lesson result formatting;
- twelve stat labels used by School;
- current School lesson/life event title/body/choice fields;
- School event media alt;
- reachable legacy `base.school` title/body/choice.

Exact-head and post-merge UI tests prove RU/EN switching does not alter the paid-lesson pending Save or active School NightFlow Save.

### Ordinary poverty

PR45 is now shipped on main.

The production bundle contains the exact 84 reviewed ordinary-poverty localization surfaces:
- 82 event title/body/choice keys across the six shipped ordinary-poverty packs;
- 2 shared media alt keys: `media.stage.outside.alt` and `media.stage.room.alt`.

Post-merge main test coverage confirms:
- all 84 required surfaces exist with RU+EN;
- every key remains locale-neutral;
- all six shipped poverty packs have Resolver-driven natural paths;
- representative effects commit once and remain stable after reload;
- RU/EN lookup does not alter pending gameplay state;
- renderer RU↔EN switching preserves gameplay Save;
- Secret Debt markers are absent from the ordinary-poverty localization set.

Classification:
`SHIPPED_RU_EN`.

## MISSING on current main

### Foreman relationship / ordinary relationship Night

Current main still has no localization entries for:
- `lumber.foreman-notice`;
- `lumber-night.foreman-professional`;
- their relationship media;
- `lumber.foreman.night` label.

Chat 5 provides an 11-key RU+EN source fixture.

Ten event/media keys already match generic event/media localization paths. The Night-choice label key still needs generic current UI wiring; School-specific Night localization does not automatically localize Foreman.

Classification:
`MISSING` on main, `STAGED_RU_EN` in Chat 5.

### Other root/legacy authored events

Several current root-loaded event families still rely on embedded fallback text rather than complete RU+EN entries. These include player-facing legacy and career/cross-system event surfaces outside the localized Forest, School and ordinary-poverty subsets.

A pack fallback string is not counted as bilingual merely because it renders.

Classification:
`MISSING`.

### Remaining hardcoded UI shell

Player-facing hardcoded text remains in portions of:
- character creation;
- Explore/Activity descriptive shell;
- generic Night/lodging shell;
- Stats/Journal/Bag/Legacy panels;
- editor/import/export/status/error copy;
- some result/ending/creation presentation.

Unless an exact RU+EN key is present and consumed, classification remains:
`MISSING`.

## STAGED

### Foreman relationship

11 RU+EN worker keys:
`STAGED_RU_EN`.

The Night-choice label specifically remains:
`STAGED_PENDING_UI_WIRING`.

### Real GIF candidate localization

No real production GIF pool exists.

Chat 2 item 177/178 correctly contain zero real candidates and zero fake localization entries.

Classification:
`BLOCKED_BY_REAL_ASSETS`.

## No-false-green rule

All current bundle entries having EN means the existing bundle itself has no RU-only entries. It does not mean the whole product is fully bilingual.

CI/QA must continue to distinguish:
- complete consumed RU+EN key;
- RU-only key;
- missing localization path;
- staged/unmerged bilingual material.

Russian fallback remains a resilience feature, not evidence of English coverage.

## Current full-product conclusion

Current main is `PARTIAL_BILINGUAL`.

Strong shipped bilingual slices now include:
- town/Work and ten ordinary career action copy;
- Forest Activity/result presentation;
- School panel/course/Night/current reachable event presentation;
- all six shipped ordinary-poverty event families.

The next reviewed localization candidate is Foreman relationship event/media content, with the voluntary Night label requiring explicit generic UI wiring.

Full-product bilingual acceptance remains blocked by untranslated legacy/root event families and remaining hardcoded UI surfaces.
