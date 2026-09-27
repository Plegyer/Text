# Bilingual Production QA Baseline v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Product lock: Russian + English
Baseline main: eaae5e5c59f40eb032943c048e99a26af9a688ba

## Core rule

The game ships in two locales:
- RU is source authoring language;
- EN is the full second locale.

Both locales share:
- one gameplay/content identity;
- one semantic presentation ID;
- one set of mechanics;
- one Run/Meta state;
- one RNG outcome;
- one timing model.

Locale changes presentation/text only.

## Locale-neutral identity

Every gameplay owner remains locale-neutral:
- action ID;
- career ID;
- event ID;
- variant ID;
- choice ID;
- School course/track ID;
- relationship ID;
- Activity/route/result ID;
- ending ID;
- presentation ID;
- item/capability/fact ID.

Forbidden:
- action.ru.* versus action.en.*;
- duplicate event objects solely for language;
- locale suffix in authoritative save IDs;
- locale-specific result IDs.

## Player-facing coverage

For every newly authored player-facing surface require RU + EN for:
- titles;
- descriptions;
- scene text;
- choice labels;
- result text;
- UI shell labels;
- media alt/caption text where user-visible.

A surface is not bilingual-complete merely because RU fallback renders when EN is missing.

## Mechanics equivalence

RU and EN must resolve the same:
- conditions;
- costs;
- effects;
- counters;
- facts;
- route availability;
- ending eligibility;
- Meta rewards;
- cooldowns;
- timing;
- RNG results.

Required QA:
same Save + same command in RU and EN -> semantically identical mechanical Save.

## RNG firewall

Locale selection/switching must not:
- consume gameplay RNG;
- reseed gameplay RNG;
- reroll event variants;
- reroll Activity results;
- alter ending availability;
- change multi-GIF candidate selection for the same occurrence.

## Save firewall

Authoritative Save must not split by locale.

Allowed persistence:
- presentation/user preference locale outside authoritative gameplay state, or an explicitly presentation-only preference field if Product/architecture chooses one.

Forbidden:
- locale-specific career/event IDs;
- duplicated pending event state by language;
- translated text persisted as gameplay identity;
- locale-specific completion facts.

## Language switch

RU -> EN -> RU must preserve:
- Run state;
- Meta state;
- pending event identity;
- pending variant identity;
- selected choice availability;
- Activity state;
- ending state;
- semantic presentation ID;
- deterministic media occurrence identity.

Only rendered strings/alt/captions may change.

## Russian fallback

Initial runtime should use RU as fallback when an EN translation is absent.

Fallback is:
- non-fatal;
- QA-visible;
- migration-safe.

Fallback is not:
- proof of EN completeness;
- permission to silently ship a supposedly complete bilingual surface with missing EN.

## Missing translation classifications

Use:
- BILINGUAL_COMPLETE
- RU_FALLBACK_ONLY
- STAGED_BILINGUAL_NOT_ROUTED
- MISSING_PLAYER_FACING_LOCALIZATION
- LOCALE_NEUTRAL_NON_PLAYER_DATA

Do not collapse these into one green status.

## Multi-GIF

GIF/media candidate identity is shared across locales.

For the same semantic occurrence:
- RU and EN use the same gameplay presentation ID;
- same deterministic GIF candidate may be selected;
- alt/caption text localizes;
- locale switch does not reroll the pool.

No separate EN GIF gameplay pool unless the media itself is genuinely locale-specific presentation content and still maps to the same semantic identity.

## Career coverage

For all ten target careers require bilingual coverage for:
- action label;
- action description;
- seasonal scene text;
- result text;
- future milestone/relationship/ending copy.

Mechanics remain one target action per career.

## School coverage

Require bilingual coverage for:
- eight course labels/descriptions;
- teacher identity/presentation text;
- repeatable lesson text;
- School-life follow-up text;
- Night-study presentation;
- future milestone/project/certificate copy.

Tuition, Energy, stats, paid/Night counters and public results remain locale-neutral.

## Ordinary poverty coverage

Require bilingual coverage for:
- street helpful/neutral/pressure events;
- cheap-lodging context;
- recovery/help;
- result/choice text;
- media alt text.

Housing, money, modifiers, cooldown/history and anti-softlock mechanics remain identical.

## Forest coverage

Require bilingual coverage for:
- route text;
- challenge text;
- seasonal context;
- result reactions;
- choice labels;
- media alt text.

Exact activityResult IDs and Activity state remain locale-neutral.

Already committed older worker Forest content requires migration/review rather than duplicate events.

## Secret Debt coverage

Require bilingual coverage for:
- lender offer;
- delayed activation;
- hidden work;
- forced Night;
- three outcome families;
- presentation/alt text.

Unresolved Product mechanics stay OPEN in both locales.
Translation must not accidentally choose a probability, threshold, reward or policy.

## Presentation editor/import

Localization-aware presentation tooling must:
- address locale-neutral semantic slot;
- store localized text under locale-specific presentation data, not duplicated gameplay IDs;
- keep old monolingual presentation overrides readable during migration;
- surface missing EN rather than treating RU fallback as EN content.

## Backward compatibility

Already shipped monolingual content must remain playable during migration.

Acceptable interim behavior:
- requested EN missing -> RU fallback;
- warning/QA debt recorded.

Not acceptable:
- parse failure;
- missing gameplay action;
- broken Save;
- duplicated event;
- changed mechanics.

## CI baseline

Localization CI should eventually check:
- supported locale set exactly ru/en;
- deterministic key uniqueness;
- RU source presence for player-facing keys;
- EN completeness status;
- no locale-specific gameplay IDs;
- no localized duplicate events;
- no Save/RNG mutation on locale switch;
- full existing mechanics suite.

## Current state

Product authority:
LOCKED.

Localization runtime:
not yet detected on current main at this snapshot.

Worker bilingual authoring:
in progress across Chat2/3/5.

Existing older monolingual content:
migration debt, not a gameplay blocker.

## Acceptance summary

One gameplay identity across locales:
REQUIRED.

RU source:
REQUIRED.

EN full locale:
REQUIRED.

Locale-specific mechanics:
FORBIDDEN.

Locale-specific RNG/timing:
FORBIDDEN.

Save identity split:
FORBIDDEN.

Duplicate EN gameplay event:
FORBIDDEN.

RU fallback:
ALLOWED / QA-visible.

Fallback counted as EN complete:
FORBIDDEN.

Shared multi-GIF mechanics:
REQUIRED.

Localized alt/caption:
REQUIRED for bilingual-complete media presentation.

No production runtime/UI/content file was modified by Chat 4.
