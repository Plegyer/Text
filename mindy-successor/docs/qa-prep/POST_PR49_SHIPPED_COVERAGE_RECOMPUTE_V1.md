# Post-PR49 shipped bilingual/static coverage recompute v1

Status: COMPLETE / CURRENT_MAIN_PARTIAL_BILINGUAL / STATIC_TARGET_NEAR_COMPLETE

Current main:
`d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`
(PR49 merge).

This recompute uses current root files only:
- `content/localization.json`;
- root `content/packs/*.json`;
- root `content/presentation.json`;
- current `assets/presentation/`.

Staged worker fixtures are not counted as shipped.

## 1. Root localization bundle

Current localization keys:
`401`.

Missing RU among existing entries:
`0`.

Missing EN among existing entries:
`0`.

Current key groups:
- `ui.*`: 44;
- `action.*`: 20;
- `activity.*`: 1;
- `activityOption.*`: 2;
- `event.*`: 118;
- `media.*`: 11;
- `school.*`: 16;
- `stat.*`: 12;
- `nightChoice.*`: 1;
- `presentation.*`: 176.

Interpretation:
every existing root localization entry is bilingual, but many player-facing surfaces still have no root localization key/consumer.

## 2. Root event bilingual coverage

Current validator/root packs contain:
`46` events.

QA requires for a fully localized event:
- title;
- every variant body;
- every choice label;
- every choice outcome/body text
to have non-empty RU+EN root entries.

Fully covered:
`23 / 46`.

Partially covered:
`0 / 46`.

Zero root event-localization coverage:
`23 / 46`.

Fully covered current families:
- `base.school`;
- 3 Forest result events;
- 2 Foreman events;
- 14 ordinary-poverty events;
- 3 current reachable School lesson/life events.

Current zero-coverage event IDs:
- `base.arrival`;
- `base.order`;
- `base.bran`;
- `base.invite`;
- `base.workday`;
- `base.winter`;
- `base.shelter`;
- `ds-lumber.first`;
- `ds-lumber.second`;
- `ds-lumber.done`;
- 9 `gopher.*` events;
- `lumber-cross.school-management-return`;
- `lumber-cross.activity-forest-return`;
- `lumber.career-first-shift`;
- `stage.goblin`.

Chat 5 now has a reviewed 109-key source for 17 of these legacy base/gopher/stage events, but it is not root-loaded on current main and is therefore not counted as shipped.

## 3. Choice-label/body coverage and visible outcome debt

Current root events contain:
`68` choices.

RU+EN choice-label keys shipped:
`33 / 68`.

RU+EN choice-body/outcome keys shipped:
`33 / 68`.

However current engine choice resolution still:
- logs embedded `sceneChoice.text`;
- may write embedded `sceneChoice.text` into `lastAction.text`.

Therefore even the 33 shipped choice-body localization keys are not a general locale-aware Journal/lastAction consumer.

Shared visible outcome debt:
- 33 bilingual choice-body keys exist but dynamic Journal/lastAction rendering does not consume them;
- 35 additional current choice bodies lack root RU+EN keys entirely.

This is a shared presentation/runtime debt, separate from gameplay mechanics.

## 4. Root media-alt coverage

Current root pack media identities:
`64`.

Complete root `media.<id>.alt` RU+EN:
`11 / 64`.

No root media-alt key:
`53 / 64`.

The 11 localized root media IDs are the existing base workshop, Forest results, Foreman, current School event media, and generic stage room/outside keys.

Important:
`53` is catalog/root-media localization debt, not 53 necessarily visible broken scenes.

Many current surfaces now resolve through semantic project-owned static overrides with their own `presentation.*` accessibility keys.

## 5. Project-owned static production coverage

Current root `presentation.json` static overrides:
`79`.

All 79 point to:
`assets/presentation/*.svg`.

Therefore current root static override ownership is:
`79 / 79 project-owned`.

Unique mapped project-owned physical sources:
`78`.

Reason for 79 -> 78:
`school-day-study.svg`
is intentionally shared by two still-current generic School reaction slots.

Current `assets/presentation/` physical files:
`88`.

Unmapped retained/superseded first-wave files:
`10`.

Those 10 are retained source history after PR49 refinements and are not active static mappings.

## 6. Audited target static scope

The established production static target scope is:
- 10 ordinary career result IDs;
- 40 ordinary career seasonal shift IDs;
- 11 reachable/current School IDs;
- 10 ordinary-poverty event IDs;
- 6 Forest return/reaction IDs;
- 2 Foreman IDs;
- 1 shared Forest route/default ID.

Total:
`80` semantic IDs.

Current project-owned static override coverage:
`79 / 80`.

Only current target gap:
`activity/forest/route/default`.

Chat 2 item 227/228 supplies a neutral project-owned source for that exact current ID, but it is not shipped on main yet.

## 7. Static refinement status

PR49 refined 27 existing current semantic slots:
- 9 School;
- 10 poverty;
- 6 Forest return/reaction;
- 2 Foreman.

These refinements do not increase the 79-slot count; they replace generic first-wave sources with one-to-one/current-specific project-owned sources.

Route-specific:
- logging-road;
- old-boundary
static assets remain outside root production.

## 8. Current generic static gaps

Within the 80-ID audited target:
- one generic/no-project-owned-root-override gap remains:
  `activity/forest/route/default`.

Outside that target:
legacy root events still rely heavily on generic pack media such as:
- `stage-town.svg`;
- `stage-tavern.svg`;
- `stage-forest.svg`;
- `stage-lumber.svg`;
- `stage-room.svg`;
- `stage-goblin.svg`.

Those are valid existing static fallbacks, but they are not dedicated project-owned per-event refinements.

## 9. Shared Night/lodging visible fallback debt

The finalized 20 shared Night/lodging keys are all absent from current root localization.

Current main still relies on hardcoded/embedded copy for those shared surfaces.

Missing current keys include:
- `ui.night.*`;
- lodging labels;
- housing labels;
- `nightChoice.night.sleep.label`;
- result/town lodging shared text.

This requires a shared UI consumer and root localization integration.

## 10. Non-Lumber seasonal scene text debt

PR48 ships all 40 seasonal career static media.

Current root contains:
`0`
of the proposed 36 non-Lumber seasonal scene-text keys:
`action.<actionId>.scene.<season>.default.text`.

Thus:
- seasonal media: shipped;
- seasonal scene localized prose: not yet shipped;
- shared scene-text consumer: still required.

## 11. Forest route presentation debt

Current root does not contain normalized route-specific alt/caption keys:
- logging-road;
- old-boundary.

Current root does not contain route-specific presentation slots.

Current shared route/default static override is also absent.

Chat 3 normalized route localization is source-ready, but route-specific presentation still requires the Lead-owned route-state -> presentationId seam.

The generic route/default static can ship independently.

## 12. Animation/GIF coverage

Actual project-owned production GIF candidates:
`0`.

No project-owned GIF pool is shipped.

Chat 2 has real project-owned SVG frame sources, but GIF export is blocked by the lack of an approved reproducible exporter.

Static production remains authoritative.

## 13. Product-open surfaces

Still not counted as shipped coverage:
- School exact-course teacher gameplay/routing;
- School management/accounting public-result provider;
- School Arcana/Forest public-result provider;
- Hunter Forest route/clue/token semantics;
- Old Boundary acquisition/consume/turn-in/deeper semantics;
- route challenge/reward topology;
- deeper relationship stages/housing/endings;
- Secret Debt;
- authored Palace content.

Current technical seams/assets do not authorize those mechanics.

## Product conclusion

Current main is:
`PARTIAL_BILINGUAL`.

Strong shipped bilingual/static domains:
- current town/Work slice;
- 10 ordinary career labels/descriptions;
- 50/50 ordinary-career result+seasonal project-owned static media;
- Forest results;
- current School path;
- ordinary poverty;
- Foreman;
- PR49 refined non-career static media.

Largest visible/shared debts now:
- 23 root events with no root event-localization coverage;
- locale-aware Journal/lastAction outcome consumer;
- 20 shared Night/lodging strings + consumer;
- 36 non-Lumber seasonal scene strings + consumer;
- generic Forest route/default static;
- route-specific presentation seam/normalized localization;
- remaining generic root-media alt/localization debt.

Do not interpret `401/401` bilingual existing keys as full-product bilingual completion.
