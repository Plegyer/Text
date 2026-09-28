# Bilingual coverage post-PR54 recompute v4

Status: COMPLETE / CURRENT_MAIN_PARTIAL_BILINGUAL

Current main:
`6e2a5147603b71eed89a0966af417a33dd28d7a7`
(PR54 merge).

This recompute uses actual current-main root files.

## Root localization

Current `content/localization.json` blob:
`76c1e66cb051bbd4652e6c40c6c486ff4e3e1705`.

Total root localization keys:
`540`.

Missing RU:
`0`.

Missing EN:
`0`.

Current top-level key groups:
- `ui.*`: 73;
- `action.*`: 20;
- `activity.*`: 1;
- `activityOption.*`: 2;
- `event.*`: 211;
- `media.*`: 26;
- `school.*`: 16;
- `stat.*`: 12;
- `nightChoice.*`: 1;
- `presentation.*`: 178.

PR54 adds no localization keys; it adds stable presentation refs/consumers for existing event-choice strings.

## Current event coverage

Current root events:
`46`.

Fully covered by bilingual:
- event title;
- every variant body;
- every choice label;
- every choice body

= `40 / 46`.

Partially covered:
`0`.

Zero root event-localization coverage:
`6 / 46`.

Remaining zero-coverage event IDs:
- `ds-lumber.first`;
- `ds-lumber.second`;
- `ds-lumber.done`;
- `lumber-cross.school-management-return`;
- `lumber-cross.activity-forest-return`;
- `lumber.career-first-shift`.

## Current choice coverage

Current event choices:
`68`.

Bilingual choice-label keys:
`59 / 68`.

Bilingual choice-body/outcome keys:
`59 / 68`.

## PR54 visible outcome effect

PR54 now stores locale-neutral:
`eventId + choiceId`
presentation refs for newly resolved event choices.

For ref-backed entries:
- lastAction can resolve localized event title/outcome;
- Journal can resolve localized choice outcome at render time;
- RU↔EN does not rewrite gameplay Save.

Therefore the 59 choices with bilingual body keys can now participate in dynamic RU/EN outcome rendering when resolved through the new ref path.

The remaining 9 choices without root bilingual body keys still fall back to embedded source text.

Old pre-feature text-only Journal entries remain stored fallback text because PR54 deliberately does not infer identity from prose.

## Root media-alt coverage

Current root pack media identities:
`64`.

Bilingual `media.<id>.alt`:
`26 / 64`.

Remaining root media-alt debt:
`38 / 64`.

This is root-media-key presence only.

Many active semantic surfaces have separate project-owned `presentation.*` accessibility keys.

## Project-owned static coverage

Current `content/presentation.json` blob:
`0bed8e1a4a88358b7e1e8ef22d787f5bcee323f4`.

Active project-owned static semantic mappings:
`80`.

Unique active physical project-owned sources:
`79`.

Established target:
`80 / 80`.

Route-specific:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`
are still absent from root presentation.

Generic:
`activity/forest/route/default`
remains shipped.

## Global UI shell

PR53 remains shipped.

Reviewed global UI-shell keys:
`34 / 34`
present/consumed in the approved shell slice.

Current app after PR54:
blob `7f8845d6515466ad7c5daeecf3c8fca7f470b1ed`.

PR54 changes Journal/result outcome rendering but does not regress PR53 shell localization.

## Direct hardcoded player-facing/source debt recompute

Reproducible source rule:
count a source line only when it contains direct Cyrillic-bearing visible/status text not fully wrapped as a localization fallback through `tr(...)`.

Current `app.ts` Cyrillic-bearing source lines:
`64`.

Lines that are localization-helper fallbacks only:
`16`.

Remaining direct hardcoded Cyrillic-bearing source occurrences by line:
`48`.

### Structured condition explanations — 26

`explain()` still emits direct Russian for:
- item capability;
- calendar year/day/elapsed days;
- housing tier;
- career stage/counters/facts/choices;
- quest stage/counters/facts/choices;
- relationship stage/counters/facts/choices;
- world facts;
- Meta unlock/ending/Hard Work;
- visits;
- flags;
- item/not/all/any connectors.

These are visible in requirements/ending conditions.

### Shared Night/lodging — 5

Still direct:
- generic Night-choice context/button line;
- LodgingResolution;
- VoluntaryNightChoice;
- generic Night sequence fallback;
- town lodging summary.

The reviewed 16-key Chat3 rebase is intended for these active Night/lodging seams.

### Character creation — 1

The compact creation template still contains multiple direct RU strings on one source line.

### Active Activity presentation — 1

Progress/endurance/checkpoint/route display still uses direct implementation-heavy copy.

### Event/inactive-run shell — 2

Still direct:
- event eyebrow;
- ended/expired life presentation + Legacy shortcut.

### Missing-media fallback — 1

`Сцена доступна без медиа`
is still direct.

### Menu/save/status/error/developer surfaces — 11

Still direct on current source lines:
- menu export/import/editor/animation/restart/descriptive text;
- ending confirmation;
- restart confirmation;
- import validation/confirm/success;
- editor save status;
- content load error;
- presentation load error;
- storage recovery;
- backup recovery/error;
- stopped-load error;
- startup error.

### Event inspector developer surface — 1

`Инспектор событий`
remains direct.

Total:
26 + 5 + 1 + 1 + 2 + 1 + 11 + 1 = `48`.

This count is line-based because the compact UI source often contains multiple strings per line.

## Shared Night/lodging readiness after PR54

Current production-ready source:
- 16 genuinely additive keys;
- one shipped result-to-lodging key reused;
- three obsolete `ui.night.panel.*` aliases omitted.

Current NightFlow mechanics remain unchanged.

## Forest route-specific localization

Chat3 route delta:
- 10 keys;
- complete RU+EN;
- current-root collisions after PR54: 0.

Not root-loaded yet.

Route-specific seam still requires Lead implementation.

## Non-Lumber seasonal scene prose

Current root still has no proposed 36 non-Lumber seasonal scene-text keys.

Project-owned seasonal static media is shipped, but scene prose localization remains a shared-consumer gap.

## Animation/GIF

Real production GIF candidates:
`0`.

Production GIF pools:
`0`.

Project-owned frame/source authoring exists, but real export remains pending explicit toolchain integration.

## Product-open isolation

Still not counted as shipped:
- School exact-course teacher gameplay/routing;
- management/accounting public-result provider;
- Arcana/Forest provider/result;
- Hunter route/clue/token semantics;
- Old Boundary token lifecycle;
- Forest challenge/reward topology;
- deeper relationship/endings;
- Secret Debt;
- authored Palace content.

## Product conclusion

Current full-product status:
`PARTIAL_BILINGUAL`.

Strong shipped state:
- 540/540 existing localization entries bilingual;
- 40/46 current events fully root-localized;
- 59/68 choice outcomes have bilingual keys;
- PR54 makes stable-ref Journal/lastAction outcome localization real for new ref-backed choices;
- 34/34 approved global UI-shell keys shipped;
- 80/80 established project-owned static target shipped.

Largest remaining visible/shared debt:
- 6 zero-localized current events;
- 9 choices without bilingual label/body coverage;
- 38 root media IDs without root alt keys;
- 16 shared Night/lodging keys + wiring;
- 48 direct hardcoded RU-bearing app source lines under the stated counting rule;
- route-specific Forest presentation seam/localization;
- 36 non-Lumber seasonal scene-text keys + consumer;
- real GIF export/pools.
