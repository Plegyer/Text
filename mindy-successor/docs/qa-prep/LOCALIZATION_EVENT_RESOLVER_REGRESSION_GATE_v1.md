# Localization Event Resolver Regression Gate v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Baseline: current main after PR43

## Current evidence

PR43:
- merged;
- exact-head 299/299 PASS;
- post-merge 299/299 PASS;
- 17 packs / 46 events.

PR43 extends current UI localization usage across:
- event title;
- event variant text;
- event choice label;
- media alt;
- Activity label;
- Activity option label.

## 1. Russian source fallback remains functional

Core resolver:

requested locale
-> RU entry
-> caller-provided raw fallback.

Localized entry schema requires RU and allows optional EN.

Therefore old Russian/raw production content remains renderable during migration.

PASS.

## 2. Missing EN is non-fatal

If an entry has no EN:
- resolveLocalizedText returns RU.

If key is absent:
- renderer may use the existing raw content fallback supplied by the caller.

This keeps migration non-fatal.

QA must still use missingEnglishKeys/coverage ledgers so RU fallback is not falsely counted as translated.

PASS.

## 3. Event title maps by stable ID

Renderer resolves:

event.<eventId>.title

using the existing gameplay event ID.

No locale-specific event ID is created.

PASS.

## 4. Event body maps by stable event + variant IDs

Renderer resolves:

event.<eventId>.variant.<variantId>.text

after gameplay has already selected the pending event and variant.

Localization does not select or reroll the variant.

PASS.

## 5. Choice label maps by stable event + choice IDs

Renderer resolves:

event.<eventId>.choice.<choiceId>.label

The underlying choice ID remains the gameplay command identity.

Localized label cannot change conditions/effects.

PASS.

## 6. Media alt maps by stable media ID

Renderer chooses presentation/media first.

Then it resolves:

media.<mediaId>.alt

for accessibility text.

The selected media src/candidate key is not derived from localized alt.

Therefore changing RU/EN alt cannot change media selection.

PASS.

## 7. Activity localization

Renderer helpers use:
- activity.<activityId>.label
- activityOption.<optionId>.label

Gameplay Activity IDs/options remain authoritative.

Localization changes labels only.

PASS.

## 8. Pending-state immutability

Rendering a pending event:
- reads run.pending;
- finds current event/variant;
- resolves localized strings;
- renders buttons with the same choice IDs.

The localization helper is pure lookup.

It does not:
- write pending;
- advance reaction epoch;
- dispatch choice;
- mutate Run/Meta;
- consume gameplay RNG.

PASS.

## 9. Locale switch cannot reroll event/media

PR42 occurrence keys exclude locale.

PR43 localization lookup also excludes locale from gameplay/media identity.

Therefore same pending occurrence:
RU -> EN -> RU
must retain:
- event ID;
- variant ID;
- choice IDs;
- presentation ID;
- selected multi-GIF candidate key.

Required regression coverage should remain in combined localization/presentation tests.

## 10. Raw Russian compatibility

Current Forest pack still contains Russian source title/body/choice/alt.

PR43 localization.json overlays RU+EN using stable IDs.

If a localization key is absent, raw Russian remains usable.

This preserves already-shipped monolingual content during migration.

PASS.

## 11. Choice text future compatibility

Current renderer localizes choice labels used on buttons.

If future UI renders separate choice body text, it must use:
event.<eventId>.choice.<choiceId>.text

and keep the same stable choice ID.

Do not create localized choice gameplay clones.

## 12. No locale-specific mechanics

Review any future localization resolver patch for forbidden behavior:
- locale in condition evaluation;
- locale in effect generation;
- locale in RNG seed;
- locale in pending/event selection;
- locale in Save gameplay identity;
- locale in media pool occurrence key.

Any such change:
BLOCKED_LOCALE_GAMEPLAY_DIVERGENCE.

## 13. Required regression tests

Retain/add:
- RU event title/body/choice;
- EN event title/body/choice;
- missing EN -> RU;
- missing key -> raw fallback;
- pending event JSON/state before/after locale switch equal;
- media candidate key stable across locale;
- media alt changes by locale without src/key change;
- Activity ID/option unchanged;
- no gameplay RNG mutation.

## Final disposition

Current PR43 resolver behavior:
GREEN.

Known migration debt:
- many UI shell strings remain hardcoded Russian;
- missing EN fallback remains intentionally non-fatal;
- fallback does not equal translated coverage.

No production runtime/UI/content file was modified by Chat 4.
