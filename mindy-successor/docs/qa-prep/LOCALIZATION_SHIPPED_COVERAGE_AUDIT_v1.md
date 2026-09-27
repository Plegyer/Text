# Localization Shipped Coverage Audit v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Baseline: current main 974d6e077ffc511e304a64aef32f2aab81167f41

## Classification

Use only:
- SHIPPED_RU_EN
- RU_FALLBACK
- STAGED_RU_EN
- MISSING

Fallback-only never counts as translated.

## Current localization bundle

Current localization.json contains:
- 56 localization keys;
- 0 keys missing EN inside that bundle.

This means the registered first slice is fully RU+EN.

It does NOT mean all player-facing current-main text is registered.

## UI shell

### SHIPPED_RU_EN

Current localized first slice includes:
- language selector;
- menu title;
- town title/eyebrow/prompts;
- main navigation panel labels;
- town panel subtitles;
- Work panel title;
- Work energy/coin/income vocabulary;
- Work buttons;
- result shift/default/return labels;
- HUD day/year/energy/coins/menu basics.

### MISSING

Current app.ts still contains many player-facing hardcoded Russian strings outside the localization resolver.

Examples include parts of:
- creation;
- School panel copy;
- Explore/Activity copy;
- Night/lodging;
- stats/journal/bag/legacy;
- editor/catalog/menu secondary controls;
- confirmations;
- errors/status messages;
- accessibility labels.

Classification:
PARTIAL SHIPPED_RU_EN + MISSING remainder.

No current UI key is RU_FALLBACK inside localization.json because all 56 registered keys have EN.

## Ten ordinary careers

### Action labels/descriptions

All ten target actions have registered RU+EN:
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

Classification:
SHIPPED_RU_EN for Work action label + description.

### Seasonal scene text

Each target action currently has four seasonal scene entries.

Localization keys for those scene texts:
0.

Current scene text remains raw catalog content.

Classification:
MISSING bilingual localization registration.

### Deeper career content

Milestones, relationships, Night, endings and other player-facing career content are not comprehensively covered by the current localization bundle.

Classification:
MISSING unless a specific surface is separately localized.

## School

Current root School packs:
- school-teachers-v1
- school-lesson-content-v1
- school-life-content-v1

Current localization keys that map to those pack/event identities:
0.

Only shell-level keys such as ui.panel.school and town subtitle are localized.

Therefore:

School shell navigation:
SHIPPED_RU_EN.

School authored production event/teacher/lesson text:
MISSING on current main.

Full exact-course libraries under school-target are staging content, but current main does not contain a completed RU+EN localization layer for them.

Classification:
MISSING on current main.

Worker Chat5 bilingual content must not be counted until integrated.

## Ordinary poverty

Current root ordinary-poverty packs:
- poverty-street-production
- poverty-street-production-v2
- poverty-cheap-production
- poverty-cheap-production-v2
- poverty-recovery-production
- poverty-pressure-production

Current localization keys for those production identities:
0.

Classification:
MISSING bilingual localization registration.

The mechanics/content are shipped; localization completeness is separate.

No Secret Debt content is counted in ordinary poverty.

## Forest

Current production Forest:
- Activity identity exists;
- result identities success/escape/failure exist;
- UI Activity shell still contains hardcoded/raw text;
- no current localization keys for Forest/Activity authored identities.

Classification:
MISSING for production Forest player-facing localization.

Chat3 bilingual Forest work on worker branch:
may later become STAGED_RU_EN or integration candidate, but it is not current-main shipped coverage.

## Secret Debt

Current main:
- no Secret Debt production pack/state.

Therefore it is not a shipped player-facing current-main surface.

Worker bilingual authored content must be classified separately from production.

Current-main production classification:
not applicable / absent.

Worker branch content may be STAGED_RU_EN only after both locales exist, but must not count as shipped.

## Media alt/caption

Current localization bundle does not provide a general localized media-alt inventory for the 61 root production media IDs.

Classification:
MISSING for full bilingual media accessibility coverage.

Existing raw alt text may render, but raw monolingual text is not full RU+EN coverage.

## RU_FALLBACK classification

Runtime supports RU_FALLBACK when an EN key is missing.

At this exact current bundle snapshot:
- registered localization keys missing EN: 0.

Therefore current observed registered-key count classified RU_FALLBACK:
0.

Future migrated keys may temporarily use this state.

Raw unregistered content should be classified MISSING, not RU_FALLBACK, unless it is actually routed through localization resolver with a RU source key.

## STAGED_RU_EN classification

Current-main production/staging files do not yet provide enough integrated locale data to classify School/poverty/Forest staged authored content as STAGED_RU_EN based solely on current main.

Worker branches contain active bilingual authoring, but this audit is current-main only.

Therefore current-main STAGED_RU_EN claims should remain explicit per imported artifact rather than assumed.

## Coverage summary

| Surface | Classification |
|---|---|
| localization runtime core | SHIPPED_RU_EN capability |
| first town/menu/HUD/Work UI slice | SHIPPED_RU_EN |
| remaining UI shell | MISSING |
| 10 career action labels/descriptions | SHIPPED_RU_EN |
| 10 career seasonal scene text | MISSING |
| deeper career content | MISSING |
| School shell labels | SHIPPED_RU_EN |
| School authored production text | MISSING |
| ordinary poverty authored text | MISSING |
| Forest authored/UI text | MISSING |
| Secret Debt production | absent, not shipped |
| production media alt/caption localization | MISSING |

## False-green guard

The following statement is false:
"PR41 makes the game fully bilingual."

Correct statement:
"PR41 ships the localization runtime and a first complete RU+EN UI/Work slice; major player-facing content remains to migrate."

## Current executable baseline

PR41:
- exact head 291/291 PASS;
- post-merge main 291/291 PASS.

This proves runtime/first-slice correctness, not full translation completeness.

No production runtime/UI/content file was modified by Chat 4.
