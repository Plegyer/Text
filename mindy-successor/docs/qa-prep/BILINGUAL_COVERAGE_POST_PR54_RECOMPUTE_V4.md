# Bilingual coverage post-PR54 recompute v4

Status: COMPLETE / CURRENT_MAIN_PARTIAL_BILINGUAL

PR54 baseline is shipped, and PR55 merged while this QA wave was executing.

Current main:
`295e6fc74d235f0b7555794555a18373451e8b7e`
(PR55 shared Night/lodging localization merge).

This is the actual current-main recompute rather than a stale PR54-only snapshot.

## Root localization

Current localization blob:
`f90a8cae4e0d8c9b0ad46e762d0947c9d3ececf0`.

Total keys:
`556`.

Missing RU:
`0`.

Missing EN:
`0`.

Top-level groups:
- `ui.*`: 82;
- `action.*`: 20;
- `activity.*`: 1;
- `activityOption.*`: 2;
- `event.*`: 211;
- `media.*`: 26;
- `school.*`: 16;
- `stat.*`: 12;
- `nightChoice.*`: 2;
- `presentation.*`: 178;
- `lodging.*`: 3;
- `housing.*`: 3.

## Event coverage

Current events:
`46`.

Fully root-localized:
`40 / 46`.

Partially localized:
`0`.

Zero root-localization:
`6 / 46`.

Remaining:
- `ds-lumber.first`;
- `ds-lumber.second`;
- `ds-lumber.done`;
- `lumber-cross.school-management-return`;
- `lumber-cross.activity-forest-return`;
- `lumber.career-first-shift`.

## Choice coverage

Current event choices:
`68`.

Bilingual choice labels:
`59 / 68`.

Bilingual choice bodies:
`59 / 68`.

PR54 stable refs now allow newly resolved ref-backed event choices to render localized Journal/lastAction text without rewriting gameplay Save.

Old text-only history remains fallback text.

## Root media-alt coverage

Current media IDs:
`64`.

Bilingual root media-alt keys:
`26 / 64`.

Remaining root-media-alt key debt:
`38 / 64`.

Presentation-specific accessibility remains broader through `presentation.*`.

## Static coverage

Current presentation blob:
`0bed8e1a4a88358b7e1e8ef22d787f5bcee323f4`.

Active project-owned static mappings:
`80`.

Unique active project-owned sources:
`79`.

Established static target:
`80 / 80`.

Route-specific logging-road/old-boundary root slots remain absent.

## PR53 global UI shell

Still shipped/green:
- Explore;
- outer Sleep shell;
- Stats;
- Journal shell;
- Bag/debt;
- Legacy/endings;
- arrival;
- shared controls.

## PR55 shared Night/lodging

PR55 ships the exact rebased 16-key slice:
- Night stage eyebrow;
- lodging prompt;
- next-day Energy formatter;
- voluntary Night shell;
- generic Night sequence title;
- town lodging summary;
- 3 lodging labels;
- 3 housing labels;
- generic sleep Night-choice label.

It reuses:
`ui.result.chooseLodging`.

It does not add the superseded outer Sleep aliases.

Exact/post-merge CI:
- run #98: 342/342;
- run #99: 342/342.

NightFlow mechanics remain unchanged.

## Direct hardcoded RU-bearing app debt

Current app blob:
`8bc496f8678640e7134730dda943e326a9379fb1`.

Current Cyrillic-bearing source lines:
`64`.

Using the reproducible rule:
count only lines with direct hardcoded visible/status Cyrillic text, excluding lines whose Cyrillic occurs only as `tr(...)` fallback.

Remaining direct hardcoded RU-bearing source lines:
`43`.

### Structured condition explanations — 26

Direct `explain()` output remains for:
- capabilities;
- calendar requirements;
- housing;
- career/quest/relationship facts/stages/counters/choices;
- world facts;
- Meta conditions;
- visits;
- flags;
- not/all/any composition.

### Missing-media fallback — 1

Direct:
`Сцена доступна без медиа`.

### Character creation — 1

Compact creation template still contains direct RU copy/aria labels.

### Event/inactive-run shell — 2

Still direct:
- event eyebrow;
- ended/expired run shell.

### Active Activity presentation — 1

Direct progress/endurance/checkpoint/route line remains.

### Event inspector — 1

Developer-facing inspector heading remains direct.

### Menu/save/status/error group — 11

Direct source remains for:
- export/import/editor/animation/restart menu items and explanatory copy;
- ending confirmation;
- restart confirmation;
- import size/confirm/success;
- editor save status;
- catalog/presentation load errors;
- storage/backup recovery;
- stopped-load/startup errors.

Total:
26 + 1 + 1 + 2 + 1 + 1 + 11 = `43`.

## Night-specific visible debt after PR55

The 16-key shared Night UI slice is no longer a localization-key gap.

One residual presentation-quality issue remains outside the 16-key patch:
the generic fallback still renders raw `night.phase` machine text in the dialogue body.

That is not a gameplay defect, but it remains player-language debt.

## Forest route-specific presentation

Chat3 source remains ready:
- pure route-state -> presentationId mapping;
- 10 additive RU+EN route keys;
- zero current-root collision.

No route-specific root slot is shipped yet.

## Non-Lumber seasonal scene prose

Proposed 36 scene-text keys remain not root-loaded.

Seasonal static media is shipped; localized scene prose remains a future shared consumer/data slice.

## Animation/GIF

Real production GIFs:
`0`.

Production GIF pools:
`0`.

Exporter patch candidate is review-ready but not integrated into package manifests.

## Product-open isolation

Still open/isolated:
- School teacher routing and unresolved providers;
- Hunter Forest route/clue/token semantics;
- Old Boundary token lifecycle;
- Forest challenge/reward topology;
- deeper relationship/endings;
- Secret Debt;
- authored Palace content.

## Conclusion

Current full-product status:
`PARTIAL_BILINGUAL`.

Current measurable floor:
- 556 bilingual root keys;
- 40/46 fully root-localized events;
- 59/68 bilingual choice bodies;
- PR54 stable-ref dynamic outcome rendering;
- PR53 global UI shell shipped;
- PR55 shared Night/lodging shipped;
- 80/80 static target;
- 43 remaining direct hardcoded RU-bearing app source lines under the stated rule.
