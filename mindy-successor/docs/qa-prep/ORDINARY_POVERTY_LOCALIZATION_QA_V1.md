# Ordinary Poverty Localization QA v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Reviewed branch: chat3/lumber-production-proof-next
Reviewed wave: items 136–139

## Disposition

LOCALIZATION_DATA_READY / SELECTIVE_INTEGRATION_READY.

Current ordinary-poverty mechanics remain unchanged.

Bespoke multi-GIF assets are not yet real production files and must not be reported as shipped media.

Fresh-main integration + CI is still required.

## Production identity mapping

Item 136 inventories the six PR37 production packs:
- poverty-street-production
- poverty-street-production-v2
- poverty-cheap-production
- poverty-cheap-production-v2
- poverty-recovery-production
- poverty-pressure-production

Production event identities:
14.

Localized player-facing fields:
82.

Deterministic key convention:
- event.<eventId>.title
- event.<eventId>.variant.<variantId>.text
- event.<eventId>.choice.<choiceId>.label
- event.<eventId>.choice.<choiceId>.text

No locale suffix is added to gameplay IDs.

PASS.

## RU + EN migration bundle

poverty-localization-migration-v1.fixture.json contains:
- default locale ru;
- 82 localization entries;
- RU text for every required field;
- EN text for every required field.

Missing RU/EN pairs:
0.

The source inventory records the pre-migration state correctly:
- existing PR37 content was EN-ready;
- Russian source was migration debt.

Item 137 closes that authoring debt in the migration fixture.

PASS as authoring/migration data.

## No gameplay duplication

The migration contract test requires:
- 14 source event IDs;
- 14 unique event IDs;
- no ru/en token in pack/event/variant/choice IDs;
- localized RU projection retains the same 14 events;
- localized EN projection retains the same 14 events.

No second localized gameplay event is created.

PASS.

## Mechanics equivalence

The worker test builds a mechanics projection excluding only localized text.

It compares RU vs EN and preserves:
- sourceDomain;
- triggers/reactionTriggers;
- priority/delivery;
- Night policy;
- chance;
- cooldown/maxShows;
- event conditions;
- variant conditions;
- choice conditions;
- choice effects.

RU mechanics projection == EN mechanics projection.

Both also equal the original PR37 mechanics projection.

PASS.

## Secret Debt firewall

The migration bundle contains no Secret Debt/lender namespace.

The contract test explicitly requires localization keys not to contain secret-debt.

Item 139 multi-GIF adoption map also excludes:
- lender;
- hidden Secret Debt work;
- forced Secret Debt Night;
- Secret Debt outcomes.

PASS.

## Multi-GIF adoption

Item 139 maps all 20 current PR37 semantic variant presentation identities.

Coverage:
20 / 20.

The mapping uses shared presentation-only pools with:
- locale-neutral candidate identity;
- RU alt;
- EN alt;
- existing static fallback;
- no conditions/effects/rewards.

Locale switch is specified to keep the same selected candidate.

PASS as authoring/adoption plan.

## Asset truth

Current real shipped fallback media:
- stage.outside -> assets/stage-outside.svg
- stage.room -> assets/stage-room.svg

Those files are real runtime fallbacks but generic stage art.

Proposed bespoke GIF candidates:
NOT_YET_AUTHORED_MEDIA.

This status is explicit and honest.

Therefore:
- localization/media mapping is ready;
- bespoke animation assets are not shipped;
- missing GIFs do not block gameplay because static fallback exists.

PASS for false-green asset reporting.

## Presentation-only selection

The adoption map does not change:
- event identity;
- event variant selection;
- conditions;
- effects;
- initial tuning;
- RNG;
- cooldown/history;
- NightFlow;
- Save identity.

Candidate selection belongs to the shared PR42 presentation runtime, not poverty gameplay.

PASS.

## Current shared runtime status

PR41 localization runtime is merged.

PR42 deterministic multi-GIF runtime is merged after exact-head 295/295 PASS.

Therefore the shared technical seams now exist.

The worker migration/adoption data still needs selective adaptation to current-main localization/presentation bundle shapes.

## Remaining accessibility debt

The ordinary-poverty event text migration is fully paired RU+EN in item 137.

Shared static media alt strings in existing stage media are a separate presentation/localization migration concern.

Do not count generic Russian stage alt as polished full bilingual bespoke poverty media.

## Fresh-main gate

Before production integration:
1. copy/recreate the 82-key localization bundle into current localization shape;
2. preserve all 14 gameplay event IDs;
3. validate no Secret Debt key/content is included;
4. keep PR37 mechanics projection byte/structurally equivalent excluding text;
5. integrate only real media paths;
6. keep proposed GIF candidates staged until assets exist;
7. run poverty localization migration tests on fresh main;
8. run full npm check;
9. exact-head CI;
10. post-merge CI.

## Final classification

Production identity mapping:
PASS.

RU+EN 82/82:
PASS.

Gameplay duplication:
NONE.

Mechanics divergence:
NONE.

Secret Debt bleed:
NONE.

20/20 semantic media mapping:
PASS.

Bespoke GIF assets shipped:
NO.

Static fallback:
SHIPPED.

Selective localization integration:
READY WITH FRESH-MAIN CI.

No Chat 4 production runtime/UI/content file was modified.
