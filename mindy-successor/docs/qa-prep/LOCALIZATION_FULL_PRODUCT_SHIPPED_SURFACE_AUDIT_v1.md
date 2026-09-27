# Localization full-product shipped-surface audit v1

Status: COMPLETE / CURRENT_MAIN_PARTIAL_BILINGUAL

Audit point:
- current main: `ab53da4059e348734703c2de490e43e94c02b057` (PR44 merge);
- authoritative `content/localization.json` blob: `58960889c3559870b17bb4076889ca4c36c4d3f8`;
- post-merge main workflow #62: SUCCESS, 301/301 tests;
- ordinary-poverty localization remains a reviewed worker/selective-integration source and is not yet in main.

Classification:
- `SHIPPED_RU_EN`: current main has non-empty RU+EN and production consumes the localization path.
- `RU_FALLBACK_ONLY`: a shipped localization entry lacks EN and relies on RU fallback.
- `MISSING`: player-facing production surface lacks complete current-main RU+EN localization.
- `STAGED`: reviewed bilingual material exists off main but is not production-integrated.

## Current-main bundle facts

Current `localization.json` contains 130 keys:
- `ui.*`: 44
- `action.*`: 20
- `activity.*`: 1
- `activityOption.*`: 2
- `event.*`: 28
- `media.*`: 7
- `school.*`: 16
- `stat.*`: 12

All 130 entries have non-empty English.

Therefore:
`RU_FALLBACK_ONLY = 0`
for entries currently present in the authoritative bundle.

Absent/hardcoded player-facing surfaces are still `MISSING`; fallback rendering does not make them bilingual.

## SHIPPED_RU_EN

### Town / Work slice

Current main ships the established RU+EN town/Work path:
- localized main town/dock copy where routed through `tr(...)`;
- Work panel and controls;
- all ten ordinary career action labels and descriptions;
- existing language/menu strings covered by the bundle.

Gameplay action IDs remain locale-neutral.

### Forest

Current main ships:
- `activity.lumber.forest.label`;
- route labels for `forest.route.logging-road` and `forest.route.old-boundary`;
- RU+EN success/escape/failure result title/body/choice text;
- RU+EN Forest result media alt.

The exact `activityResult` identities remain unchanged.

### School after PR44

PR44 is now shipped on main.

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
- the reachable legacy `base.school` title/body/choice surface.

PR44 added 56 localization keys relative to the prior 74-key main baseline, for a current total of 130.

Exact-head and post-merge UI tests prove RU/EN switching does not alter the paid-lesson pending Save or active School NightFlow Save.

Classification:
`SHIPPED_RU_EN`.

## MISSING on current main

### Ordinary poverty

Current main still contains zero localization keys with ordinary-poverty identities.

The six shipped ordinary-poverty packs therefore remain `MISSING` for bilingual event title/body/choice/media-alt coverage on main.

Chat 3 provides:
- reviewed 84-key RU+EN delta;
- current-ID collision guard;
- executable natural-path RU/EN invariance.

Classification:
`STAGED_RU_EN / READY_FOR_SELECTIVE_PR`.

### Foreman relationship / ordinary relationship Night

Current main has no localization entries for:
- `lumber.foreman-notice`;
- `lumber-night.foreman-professional`;
- their relationship media;
- `lumber.foreman.night` label.

Chat 5 provides an 11-key RU+EN source fixture.

Ten event/media keys already match generic event/media localization paths. The Night-choice label key still needs generic current UI wiring; current School-specific Night localization does not automatically localize Foreman.

Classification:
`MISSING` on main, `STAGED_RU_EN` in Chat 5.

### Other root/legacy authored events

Several current root-loaded event families still rely on embedded fallback text rather than complete RU+EN entries. These include player-facing legacy and career/cross-system event surfaces outside the now-localized Forest and School subsets.

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

### Ordinary poverty

84 RU+EN keys plus executable/collision tests:
`STAGED_RU_EN / NEXT_SELECTIVE_CANDIDATE`.

### Foreman relationship

11 RU+EN worker keys:
`STAGED_RU_EN`.

The Night-choice label specifically remains:
`STAGED_PENDING_UI_WIRING`.

### Real GIF candidate localization

No real production GIF pool exists.

Item 177/178 correctly contain zero real candidates and zero fake localization entries.

Classification:
`BLOCKED_BY_REAL_ASSETS`.

## No-false-green rule

All current bundle entries having EN means the existing bundle itself has no RU-only entries. It does not mean the whole product is fully bilingual.

CI/QA must continue to distinguish:
- complete consumed RU+EN key;
- RU-only key;
- missing localization path;
- staged/unmerged bilingual material.

## Current full-product conclusion

Current main is `PARTIAL_BILINGUAL`.

Strong shipped bilingual slices now include:
- town/Work and ten ordinary career action copy;
- Forest Activity/result presentation;
- School panel/course/Night/current reachable event presentation after PR44.

The next clean reviewed localization candidate is ordinary poverty. Foreman event/media localization is also viable selectively, with the voluntary Night label requiring explicit UI wiring.

Full-product bilingual acceptance remains blocked by untranslated legacy/root event families and remaining hardcoded UI surfaces.
