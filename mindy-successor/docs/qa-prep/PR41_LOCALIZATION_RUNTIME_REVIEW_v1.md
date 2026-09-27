# PR41 Localization Runtime Review v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
PR: #41 — Lead: add RU/EN localization runtime and first UI slice

## Final disposition

GREEN / MERGED.

PR head:
6890aaa85dbe5a545219e8200560d307dce8f35d

Merge SHA:
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

## 1. Localization preference stays outside gameplay Save

Current UI stores locale preference in:
portal-life.locale

The locale switch test exercises the UI language toggle and checks the locale preference separately from the life Save.

The localization runtime module itself does not import or mutate engine Save/Meta state.

PASS.

## 2. Supported locales

Core runtime exports exactly:
- ru
- en

Unknown/null locale normalization returns:
ru

Default locale is:
ru

PASS.

## 3. Russian fallback

Localized entry schema requires:
- ru string
- optional en string

Resolution order:
requested locale
-> RU
-> caller fallback.

Core test verifies:
- RU direct resolution;
- EN direct resolution;
- missing EN falls back to RU;
- missing key can use legacy fallback.

PASS.

Important:
missing-English fallback is migration behavior, not proof of translated coverage.

## 4. First RU+EN UI slice

Current localization bundle includes RU+EN for:
- language selector;
- town title/eyebrow/prompts;
- primary navigation panels;
- town subtitles;
- Work title;
- Work energy/coin/income vocabulary;
- Work/Work-again buttons;
- result labels;
- HUD basics.

PASS for the shipped first slice.

The full UI shell is not yet localized; that is coverage debt, not a PR41 runtime blocker.

## 5. Ten career Work identities

Current localization bundle contains RU+EN:
- label
- description

for all ten target Work actions:
- lumber.shift
- satyr-maid.shift
- undead-farm.shift
- tavern.shift
- hunter.shift
- guard.shift
- merchant.shift
- artist-geisha.shift
- assassin.shift
- prostitute.shift

Gameplay action IDs are unchanged.

No localized action clone exists.

PASS.

## 6. Availability/wages unchanged

PR41 changed localization runtime/UI/build/validation/tests, not target career definitions.

It does not modify:
- action Energy costs;
- wage formulas;
- typed completed_shifts;
- career stage;
- Hard Work;
- Work availability rules.

Current main still inherits PR40:
- all ten target Work buttons available after normal start;
- all ten target shifts have wage definitions;
- Lumber target wage uses the existing compatibility formula.

PASS.

## 7. Locale switch does not mutate life Save

Merged UI test:
renderer: locale switch changes presentation only and preserves Work gameplay state

It checks:
- initial RU;
- switch to EN;
- ten Work buttons remain enabled;
- locale preference saved separately;
- switch back to RU.

The runtime resolver is pure text lookup and does not touch engine state.

PASS for the covered Work UI slice.

Deeper pending-event/Night/Activity/ending save-invariance remains a future cross-system smoke target.

## 8. No duplicate gameplay content

PR41 adds:
content/localization.json

It does not add:
- duplicate EN actions;
- duplicate EN events;
- duplicate EN endings;
- locale-specific packs.

Catalog validation remains:
- 16 packs
- 43 events
- 35 actions
- 9 endings

The counts do not double.

PASS.

## 9. Gameplay RNG

Core localization module contains:
- locale normalization;
- string resolution;
- missing-English inventory.

It has no gameplay RNG dependency.

PR41 does not change engine RNG code.

PASS.

## 10. Build/validation integration

PR41 changes:
- build script;
- validate script;
- localization bundle;
- localization core;
- UI;
- localization/UI tests.

Exact-head and post-merge CI are both green.

PASS.

## 11. Migration visibility

Runtime exposes:
missingEnglishKeys(bundle)

This is the correct primitive for distinguishing:
- translated;
- fallback-only.

PASS as runtime capability.

Release/coverage reporting still needs to use it consistently.

## 12. Compatibility

Existing gameplay/save identities are unchanged.

Old monolingual content can continue rendering through existing raw/fallback paths while migration proceeds.

No Save schema bump was introduced by PR41.

PASS.

## 13. Current limitations after merge

Not blockers for PR41, but still open:
- full UI shell localization;
- career seasonal/result/deeper content localization;
- School production/staging migration;
- poverty migration;
- Forest migration;
- Secret Debt bilingual authoring/integration;
- localized alt/caption completeness;
- combined locale + future multi-GIF occurrence stability;
- deeper locale-switch Save smokes across pending event/Night/Activity/ending.

## Final matrix

- locales exactly RU+EN: PASS
- RU default/fallback: PASS
- locale preference outside gameplay Save: PASS
- ten action IDs unchanged: PASS
- Work availability unchanged: PASS
- wages unchanged: PASS
- locale switch preserves covered life state: PASS
- duplicate gameplay content: NONE
- gameplay RNG consumption: NONE FOUND
- exact-head CI: 291/291 PASS
- post-merge CI: 291/291 PASS
- merged: YES

Final:
GREEN.

No production runtime/UI/content file was modified by Chat 4.
