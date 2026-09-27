# Localization Integration Risk Gate v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Current main: 974d6e077ffc511e304a64aef32f2aab81167f41
Reviewed PR: #41 — Lead: add RU/EN localization runtime and first UI slice

## Current runtime status

PR41:
MERGED.

Head:
6890aaa85dbe5a545219e8200560d307dce8f35d

Merge:
974d6e077ffc511e304a64aef32f2aab81167f41

Exact-head CI:
- run 36318054330
- 291 tests
- 291 pass
- 0 fail
- validation: 16 packs, 43 events, 35 actions, 9 endings

Post-merge main CI:
- run 36318168058
- 291 tests
- 291 pass
- 0 fail
- validation: 16 packs, 43 events, 35 actions, 9 endings

Classification:
LOCALIZATION_RUNTIME_BASE_GREEN.

## Runtime shipped in PR41

New core localization module provides:
- supported locales exactly ru/en;
- default locale ru;
- unknown locale normalization to ru;
- localized entry schema with required RU and optional EN;
- RU fallback when EN missing;
- missing-English key inventory.

This matches the Product-level fallback model for migration.

## First localization bundle

Current localization.json contains:
- language selector labels;
- first UI/menu/town/HUD/Work strings;
- all ten target career action labels;
- all ten target career action descriptions.

Those entries currently include both RU and EN.

This is a first slice, not full-game bilingual completion.

## UI switch

Merged UI test:
renderer: locale switch changes presentation only and preserves Work gameplay state

It verifies:
- initial document language ru;
- locale toggle switches to en;
- locale preference persists in localStorage;
- ten target Work buttons remain enabled;
- switch returns to ru.

This is real UI runtime evidence.

## Save/gameplay invariance evidence

PR41 test name and implementation prove the locale switch preserves Work gameplay state for the covered UI slice.

Current core resolver itself is text-only and has no engine/RNG dependency.

However this does not yet prove every complex state family:
- pending event;
- NightFlow;
- Activity;
- ending/Meta;
- multi-GIF occurrence.

Classification:
BASE_INVARIANCE_GREEN / DEEP_CROSS_SYSTEM_SMOKE_OPEN.

Use LOCALE_SWITCH_SAVE_INVARIANCE_SMOKE_v1.md for the deeper gate.

## Key schema and collision risk

Current runtime uses explicit string keys.

Current QA preflight found:
- 457 derived player-facing candidate keys;
- 0 exact duplicate candidates;
- 175 scanned current identities;
- 0 collisions under an aggressive normalization stress check.

Current localization.json is explicit rather than display-text-derived.

Classification:
KEY_BASE_GREEN.

Still required as the bundle expands:
- automated owner-qualified collision validation;
- missing RU/EN reporting;
- no choice/variant owner loss.

## Russian fallback

Runtime behavior:
EN missing -> RU fallback.

Core test verifies this.

This is correct migration behavior.

Important:
fallback must not be counted as complete English coverage.

Classification:
FALLBACK_RUNTIME_GREEN / COMPLETENESS_REPORTING_STILL_REQUIRED.

## UI shell readiness

Status:
PARTIAL_BILINGUAL.

Localized in first slice:
- language control;
- menu title;
- town title/eyebrow/prompts;
- primary panel labels;
- town subtitles;
- Work title/cost vocabulary/buttons;
- result labels;
- HUD basics.

Still visible hardcoded Russian remains in app.ts outside this first slice, including parts of:
- creation;
- School panel;
- Explore/Activity copy;
- Night/lodging copy;
- stats/journal/bag/legacy;
- catalog/editor/menu details;
- error/status messages;
- confirmations;
- accessibility labels.

Therefore UI shell is not yet full RU+EN.

## Ten careers

Status:
BILINGUAL_BASE_READY for Work action label/description.

Current localization bundle includes RU+EN for all ten target action labels/descriptions.

Still migration work:
- seasonal scene text;
- result text beyond generic UI wrappers;
- milestone/relationship/Night/ending content;
- media alt/caption where applicable.

Mechanics remain locale-neutral.

## School

Status:
RUNTIME_READY / CONTENT_MIGRATION_IN_PROGRESS.

PR38 production School content remains mechanically shipped.

Current main localization bundle does not yet provide complete School authored content translation.

Chat5 bilingual School worker queue is active.

Important distinctions:
- runtime can support localized keys;
- School bilingual authored staging may exist on worker branch;
- production School cannot yet be called fully bilingual.

## Ordinary poverty

Status:
RUNTIME_READY / CONTENT_MIGRATION_OPEN.

PR37 ordinary-poverty content is shipped.

Current main localization bundle does not yet cover the full poverty event/choice/alt inventory.

Chat2 presentation inventories and broader worker authoring can support migration.

Do not count RU fallback as EN completeness.

## Forest

Status:
RUNTIME_READY / WORKER_BILINGUAL_MIGRATION_IN_PROGRESS / PRODUCTION_RESULT_PACK_NOT_YET_INTEGRATED.

Current production Forest mechanics remain shipped at base level.

Chat3 is now assigned a bilingual Forest production wave.

The older Forest result pack must still:
- be adapted from stale worker fixture to current main;
- carry RU + EN player-facing text;
- run exact-head CI on fresh Lead branch.

No locale-specific Activity/result identity should be introduced.

## Secret Debt

Status:
CONTENT_ONLY + PRODUCT_BLOCKED + BILINGUAL_MIGRATION_IN_PROGRESS.

Localization runtime does not make Secret Debt mechanics shipped.

Current main still has no production Secret Debt state/pack.

Worker content must be RU+EN before production conversion.

Unresolved Product mechanics remain independent blockers.

## Multi-GIF

Status:
RUNTIME_GAP for deliberate 3–5 GIF pool selection.

Localization runtime should integrate cleanly with future multi-GIF because:
- locale keys are presentation-only;
- media candidates should remain shared;
- candidate selection seed must not include locale;
- alt/caption should localize.

Current PR41 does not implement multi-GIF pool logic.

Required future combined smoke:
same occurrence RU -> EN -> RU keeps selected media candidate.

## Missing-English visibility

Core exposes:
missingEnglishKeys(bundle).

This is a useful primitive for no-false-green reporting.

Current validation/release reporting should build on it rather than treating fallback render success as EN completion.

## Backward compatibility

Current localization schema requires RU for every registered localized entry and permits EN to be missing.

This supports incremental migration.

Existing gameplay IDs and current content catalog counts remain unchanged:
- 16 packs
- 43 events
- 35 actions
- 9 endings.

No duplicated EN gameplay catalog appears.

PASS.

## Risk matrix

| Surface | Runtime readiness | Content localization | Main remaining risk |
|---|---|---|---|
| localization core | GREEN | n/a | expand tests/reporting |
| first UI slice | GREEN | RU+EN present | much shell still hardcoded RU |
| ten career Work labels/descriptions | GREEN | RU+EN present | seasonal/results/deeper career text |
| School | GREEN runtime | migration in progress | production coverage incomplete |
| ordinary poverty | GREEN runtime | migration open | event/choice/alt EN coverage |
| Forest | GREEN runtime | worker migration active | result pack fresh-main integration |
| Secret Debt | GREEN runtime only | worker migration active | mechanics Product-blocked |
| multi-GIF | compatible conceptually | alt/caption future | pool runtime not implemented |

## Required next QA

1. full UI-shell localization inventory;
2. automated translation completeness report;
3. locale-switch pending-event smoke;
4. locale-switch NightFlow smoke;
5. locale-switch Activity smoke;
6. locale-switch ending/Meta smoke;
7. bilingual production content migration for School/poverty/Forest;
8. multi-GIF locale-stability test when that runtime lands.

## Current conclusion

Localization runtime base:
GREEN / MERGED / 291/291 exact head and post merge.

Full RU+EN game:
NOT YET COMPLETE.

Current blockers are primarily migration/coverage, plus independent Product-blocked systems such as Secret Debt.

No production runtime/UI/content file was modified by Chat 4.
