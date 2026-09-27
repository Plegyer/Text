# Bilingual Presentation Text Contract v1

Product rule:
- shipped locales: **Russian (RU) + English (EN)**;
- Russian is the source authoring language;
- English is a full second locale;
- gameplay/content identity, semantic IDs, mechanics, media identity and save-state are shared.

This contract applies to all presentation-layer player-facing text, including:
- scene text;
- labels/descriptions shown in presentation context;
- GIF/image alt text;
- captions;
- text fallback;
- accessibility strings;
- producer-authored presentation examples intended to become player-facing.

## 1. One gameplay/content identity

Do not create separate RU and EN gameplay events.

Correct:

`eventId -> one gameplay event -> localized presentation text`

Incorrect:

`event.ru`
`event.en`

Locale must never become gameplay identity.

## 2. One semantic presentationId

A presentation surface has one locale-neutral semantic ID.

Example:

`job/lumber/shift/spring/default`

Both RU and EN presentation text resolve under that same ID.

Do not create:
- `job/lumber/shift/spring/default/ru`;
- `job/lumber/shift/spring/default/en`;
- locale-specific aliases.

## 3. Locale affects text only

Locale may select:
- player-facing scene text;
- labels/descriptions;
- alt text;
- captions;
- fallback text.

Locale must not select or modify:
- conditions;
- effects;
- rewards;
- eligibility;
- RNG;
- timing;
- cooldowns;
- route availability;
- ending eligibility;
- save identity;
- semantic presentationId;
- media candidate stable key;
- media path.

## 4. Russian source authoring

Every newly authored player-facing presentation string is first approved in RU.

EN then receives a complete translation with equivalent gameplay meaning.

RU source authority does not mean EN may be incomplete at ship time.

Production acceptance requires both locales unless an explicit temporary migration state is documented.

## 5. Required localized fields

For presentation authoring, player-facing text should be represented conceptually as:

```json
{
  "ru": "<Russian source text>",
  "en": "<English localized text>"
}
```

This applies independently to:
- caption;
- alt;
- text fallback;
- scene summary shown to the player.

Do not concatenate both languages into one displayed string.

## 6. Media remains locale-neutral

One GIF/image asset normally serves both locales.

Example:

`assets/presentation/job/lumber/shift/spring/default/a.gif`

The same file may have:

RU alt:
`Работа с древесиной на весенней делянке.`

EN alt:
`Timber work on a spring worksite.`

The asset is not duplicated as:
- `a-ru.gif`;
- `a-en.gif`

unless the image itself contains localized baked-in text and Product explicitly approves separate media files.

Default policy: avoid baked-in language where practical.

## 7. Multi-GIF pools are locale-neutral

A pool has:
- one semantic presentationId;
- one pool version;
- 3–5 candidate stable keys;
- locale-neutral candidate media paths.

Localization belongs to candidate text metadata.

Example candidate:

```text
key: lumber-spring-a
media: <shared GIF>
alt.ru: Работа с брёвнами на влажной весенней делянке.
alt.en: Timber is handled on a damp spring worksite.
```

The candidate key is identical for both locales.

## 8. Language switching must not reroll GIF selection

If the selected candidate is derived from:

`presentationId + occurrenceKey + poolVersion`

locale must **not** participate in that seed.

Correct:
- RU selects candidate B;
- switch to EN;
- same occurrence still shows candidate B;
- only text/alt changes.

Incorrect:
- RU selects candidate B;
- EN switch causes candidate D.

Language switching is presentation text selection, not a new occurrence.

## 9. Language switching must not reroll gameplay

Changing locale must not:
- consume gameplay RNG;
- consume presentation occurrence counters;
- recreate pending events;
- reselect gameplay variant;
- replay costs/effects;
- change action availability;
- change route state;
- alter Night/Activity state.

## 10. Save-state rule

Save should not need a locale-specific gameplay copy.

Preferred behavior:
- user locale is account/UI preference or presentation setting;
- gameplay Save remains locale-neutral.

Do not persist:
- duplicated RU/EN event IDs;
- duplicated RU/EN presentation IDs;
- separate locale-specific progression state.

If locale preference is persisted anywhere, it must not be part of gameplay identity or migration logic.

## 11. Temporary missing-locale fallback

During migration, one locale entry may be temporarily absent.

Required resolution order:

### Requested RU
1. RU text;
2. EN text if RU is temporarily missing;
3. neutral technical fallback only if neither exists.

### Requested EN
1. EN text;
2. RU source text if EN is temporarily missing;
3. neutral technical fallback only if neither exists.

This fallback is for migration/authoring continuity only.

Ship acceptance target:
**no player-facing EN gaps and no player-facing RU gaps.**

Fallback must not duplicate or reroute gameplay.

## 12. Missing alt in one locale

If candidate media exists but requested-locale alt is temporarily missing:
- use the other locale's alt rather than dropping accessibility metadata;
- record localization debt;
- do not reject gameplay.

Final production acceptance still requires both RU and EN alt.

## 13. Text fallback when media fails

If GIF/image media is unavailable:
- semantic presentationId remains unchanged;
- requested locale resolves localized text fallback;
- missing requested locale may temporarily use the other locale;
- gameplay remains unchanged.

The media-failure path must not force a locale switch.

## 14. Event/variant identity

Localized text never substitutes for gameplay variant identity.

Example:

`eventId + variantId -> presentationId -> localized RU/EN text + media pool`

Not:

`RU wording -> variant A`
`EN wording -> variant B`

Both locales describe the same already-selected gameplay variant.

## 15. Translation equivalence

EN does not need literal word-for-word phrasing.

It must preserve:
- visible scene meaning;
- choice meaning;
- outcome meaning;
- tone appropriate to the authored content;
- accessibility information.

It must not introduce:
- extra promises;
- mechanics not present in RU;
- different relationship implications;
- different outcome certainty;
- new named entities.

## 16. Alt-text equivalence

RU and EN alt text should describe the same visible content.

Example:

RU:
`На мокрой весенней делянке переносят срубленные брёвна.`

EN:
`Cut logs are carried across a wet spring worksite.`

Both describe the same candidate.

## 17. Stale translation rejection

When RU source meaning changes materially:
- mark EN as needing re-review;
- do not silently keep stale English text;
- media candidate identity may remain unchanged if the visible scene still matches;
- gameplay identity remains unchanged unless content authority changed it.

## 18. Authoring status

Recommended per localized field:

- `SOURCE_APPROVED_RU`
- `EN_TRANSLATED`
- `EN_REVIEWED`
- `COMPLETE_RU_EN`
- `MIGRATION_GAP`

These statuses are authoring metadata only.

## 19. Migration rule for older presentation artifacts

Artifacts committed before this Product rule may contain EN-only examples or monolingual alt text.

Do not rewrite them blindly.

Instead:
1. inventory player-facing monolingual fields;
2. preserve semantic/media IDs;
3. add RU source + EN localized pair in a reviewed migration;
4. keep mechanics untouched.

## 20. Runtime seam required

Current main has no dedicated localization schema for presentation bundles.

Lead localization infrastructure should provide a small seam that can resolve a localized presentation string by:
- semantic/localization key;
- requested locale;
- fallback locale.

It does not need a gameplay rewrite.

## Acceptance

Bilingual presentation support passes when:
1. one gameplay/content identity serves RU and EN;
2. one semantic presentationId serves RU and EN;
3. media paths/candidate keys are locale-neutral;
4. all shipped player-facing text has RU + EN;
5. language switch changes text only;
6. GIF choice is stable across locale switch;
7. gameplay RNG/state is unchanged by locale;
8. missing-locale migration fallback is safe;
9. final release contains no known player-facing RU/EN gaps.
