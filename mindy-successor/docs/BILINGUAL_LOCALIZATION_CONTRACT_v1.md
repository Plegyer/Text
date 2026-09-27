# Bilingual Localization Contract v1

Date: 2026-09-27

Status: **PRODUCT LOCK / TARGET CONTRACT**

Direct Product decision:
the successor game is authored and shipped in **Russian + English from the start**.

## 1. Locale set

Required launch locales:
- `ru` — Russian, source authoring language;
- `en` — English, full second locale.

Adding more locales later is allowed but must not change gameplay identity.

## 2. One gameplay identity

Localization MUST NOT duplicate gameplay.

For any action, event, choice, route, course, relationship scene, ending, Activity result or presentation surface:
- gameplay/content ID is locale-neutral;
- semantic `presentationId` is locale-neutral;
- mechanics/conditions/effects/rewards/RNG/timing are shared;
- Save identity is shared;
- only player-facing text and accessibility presentation differ by locale.

Do not create separate Russian and English gameplay events.

## 3. Authoring rule

Russian is the source authoring language.
Every new player-facing authored text must include a full English equivalent before production acceptance unless explicitly marked migration debt from pre-lock content.

Applies to:
- labels and descriptions;
- narrative/event text;
- choice labels;
- result text;
- School/relationship/Night/Activity text;
- ending text;
- UI copy;
- GIF/image alt text and captions.

## 4. Runtime separation

Locale selection belongs to presentation/text only.

Changing locale must never:
- reroll gameplay;
- reroll event variant;
- reroll GIF/media candidate;
- consume gameplay RNG;
- change eligibility;
- change rewards/effects;
- change timing/Energy/money;
- change Save progression identity.

## 5. Save policy

No separate save per locale.

Preferred model:
- locale is UI/presentation preference;
- core run/meta Save remains locale-neutral;
- no Save migration should be required solely to add or switch language.

If locale preference is persisted, it must be outside gameplay identity or an explicitly presentation-only preference field.

## 6. Multi-GIF interaction

The locked presentation model remains:
- one gameplay event / one semantic presentation identity;
- normally 3–5 GIF/media candidates where repetition warrants it;
- GIF/media files are shared across RU and EN;
- each candidate may have localized `alt.ru` / `alt.en` and localized caption/context;
- selecting locale does not select a different gameplay event or outcome.

## 7. Fallback

During migration of already-authored monolingual content:
- missing locale text must not crash gameplay;
- Russian source text is the temporary content fallback;
- missing English coverage is QA-visible migration debt, not a second gameplay path.

New content created after this lock should not rely on fallback as normal production behavior.

## 8. QA minimum

Production QA must be able to verify:
- every new player-facing identity has RU and EN;
- IDs are locale-neutral;
- no locale-specific conditions/effects/rewards/RNG;
- no duplicate RU/EN gameplay events;
- language switch preserves pending scene/gameplay identity;
- multi-GIF choice is stable across locale switch;
- alt text coverage exists for both locales.

## 9. Existing content migration

Do not blindly rewrite all historical content in one monolithic change.

Migrate subsystem-by-subsystem:
1. shared localization runtime/seam;
2. Work / 10 ordinary careers;
3. School;
4. ordinary poverty;
5. Forest / Activity;
6. Secret Debt when mechanics are production-ready;
7. relationships/endings/Palace/remaining UI.

Existing locked mechanics remain authoritative throughout migration.

## 10. Non-goals

This decision does NOT:
- reopen balance;
- alter School mechanics;
- alter Lumber Hard Work;
- choose unresolved Secret Debt values;
- choose final art style;
- require duplicate GIF assets per locale.

Localization is a presentation/content capability layered over the same game.
