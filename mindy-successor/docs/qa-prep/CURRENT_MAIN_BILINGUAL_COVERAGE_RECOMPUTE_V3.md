# Current-main bilingual coverage recompute v3

Status: COMPLETE / CURRENT_MAIN_PARTIAL_BILINGUAL

Current main:
`3fc5495310e281cf5cbe52da3642000f1cb1fb05`.

This main contains:
- PR51 ordinary-poverty copyedit;
- PR52 legacy root localization;
- PR53 global UI-shell localization.

The queue requested a post-PR51/52 recompute. PR53 merged while this QA wave was executing, so this file uses the newer current main and records the stronger shipped state rather than a stale baseline.

## Root localization bundle

Current root localization:
`540` keys.

Missing RU:
`0`.

Missing EN:
`0`.

Key groups:
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

Every existing root localization entry is bilingual.

That does not mean every visible player-facing surface is already localized.

## Current event coverage

Current root event identities:
`46`.

Fully RU+EN covered using title + every variant body + every choice label + every choice body:
`40 / 46`.

Partially covered:
`0`.

Zero root event-localization coverage:
`6 / 46`.

Remaining zero-coverage current event IDs:
- `ds-lumber.first`;
- `ds-lumber.second`;
- `ds-lumber.done`;
- `lumber-cross.school-management-return`;
- `lumber-cross.activity-forest-return`;
- `lumber.career-first-shift`.

These are root identity/key-presence counts.
Natural reachability is a separate gameplay/path question.

## Current choice coverage

Current root event choices:
`68`.

Bilingual choice labels:
`59 / 68`.

Bilingual choice body/outcome keys:
`59 / 68`.

PR52 materially increased legacy choice coverage.

However current Journal/raw `lastAction.text` persistence still stores source prose.

Therefore root choice-body key coverage is stronger than visible dynamic Journal localization coverage.

## Current root media-alt coverage

Current root pack media IDs:
`64`.

Bilingual `media.<id>.alt`:
`26 / 64`.

Remaining root-media-alt debt:
`38 / 64`.

This does not mean 38 currently visible scenes lack accessible media text.

Many active semantic surfaces resolve through project-owned `presentation.*` static overrides with separate bilingual alt/caption keys.

## Project-owned static coverage

Current active project-owned static semantic mappings:
`80`.

Established current target:
`80 / 80`.

Unique active physical project-owned static sources:
`79`.

The one shared physical source is intentional for two generic School reaction IDs.

PR50 closed the last target gap:
`activity/forest/route/default`.

Route-specific:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`
remain outside the current static target and are not shipped root slots.

## Global UI shell after PR53

The reviewed Chat5 global UI-shell source contained:
`34` stable keys.

Current root presence:
`34 / 34`.

PR53 now consumes the reviewed shell keys for:
- Explore;
- outer Sleep panel;
- Stats;
- Journal shell/empty state;
- Bag/debt shell;
- Legacy/endings shell;
- pre-arrival;
- generic select/close/dismiss controls;
- work recipe labels;
- result-to-lodging bridge.

PR53 exact-head and post-merge renderer tests prove RU↔EN shell switching preserves gameplay Save.

## Current shared Night/lodging debt

The original Chat3 shared Night fixture had:
`20` keys.

After PR53:
- 1 is already shipped/consumed:
  `ui.result.chooseLodging`;
- 3 outer Sleep-panel keys are superseded by shipped `ui.sleep.*` ownership;
- 16 remain additive and relevant to hardcoded Night/lodging transaction seams.

Still-hardcoded current Night/lodging presentation includes:
- Night eyebrow;
- LodgingResolution prompt;
- lodging option labels;
- next-day Energy suffix;
- VoluntaryNightChoice title/prompt/context/button;
- generic Night sequence title;
- town lodging summary;
- housing labels;
- generic `night.sleep` label data.

Gameplay NightFlow remains localized-state neutral.

## Journal/outcome gap

PR52 ships stable bilingual event-choice outcome keys for its legacy slice.

Current Save still uses:
- `historyState.journal: string[]`;
- plain `lastAction.text`.

Current Journal panel after PR53 has localized shell text but renders stored journal strings directly.

Therefore:
- Journal shell: bilingual shipped;
- dynamic historical outcome localization: not yet shipped.

Future solution must use stable locale-neutral event/choice refs and preserve old text-only saves.

## Non-Lumber seasonal scene text

PR48 ships project-owned seasonal static media.

Current root contains:
`0`
of the proposed 36 Chat5 non-Lumber seasonal scene-text keys:
`action.<actionId>.scene.<season>.default.text`.

Thus:
- seasonal media: shipped;
- localized seasonal scene prose: not shipped;
- shared presentation-text consumer: still required.

## Forest route-specific presentation

Generic route/default static:
shipped.

Route-specific normalized localization:
source-ready in Chat3, not root-loaded.

Route-specific presentation slots:
not shipped.

Lead still needs:
- route-state -> presentationId seam;
- Save/RNG/result invariance tests;
- safe asset selection.

The prior old-boundary specific SVG remains too visually specific for automatic activation without revision/approval.

## Remaining direct UI localization debt

Current `app.ts` after PR53 still has player-facing hardcoded content in several areas.

Important remaining groups:
- structured condition explanations;
- character creation;
- event eyebrow/inactive-run copy;
- active Activity progress/endurance/checkpoint line;
- Night/lodging transaction surfaces;
- menu/export/import/restart shell;
- validation/recovery/startup status/error text;
- editor/catalog developer-facing strings;
- Journal outcome rendering.

PR53 closes a major shell slice but not the full application shell.

## Strong shipped bilingual domains

Current main is strong for:
- town/Work baseline;
- School reachable lesson/life slice;
- Forest result presentation;
- ordinary poverty;
- Foreman relationship/Night labels;
- legacy base/gopher/stage event copy;
- project-owned static alt/caption;
- global UI shell from PR53.

## Product-open isolation

Not counted as shipped bilingual completion:
- exact-course teacher gameplay/routing;
- School management/accounting public-result provider;
- School Arcana/Forest public-result provider;
- Hunter Forest route/clue/token semantics;
- Old Boundary acquisition/consume/retain/turn-in;
- deeper route challenge/reward topology;
- deeper relationship stages/housing/endings;
- Secret Debt;
- authored Palace content.

Localization/media source does not authorize gameplay semantics.

## Conclusion

Current product status:
`PARTIAL_BILINGUAL`.

Objective shipped improvements:
- root bilingual keys: 540;
- current fully root-localized events: 40 / 46;
- global UI-shell source: 34 / 34 shipped;
- project-owned static target: 80 / 80.

Largest remaining visible/shared gaps:
- 6 zero-root-localized current events;
- 9 choice labels/bodies without root RU+EN;
- 38 root media-alt IDs without root keys;
- 16 active shared Night/lodging localization keys + wiring;
- Journal/outcome locale-neutral ref consumer;
- 36 non-Lumber seasonal scene strings + consumer;
- route-specific Forest presentation seam;
- remaining hardcoded creation/menu/condition/status UI.
