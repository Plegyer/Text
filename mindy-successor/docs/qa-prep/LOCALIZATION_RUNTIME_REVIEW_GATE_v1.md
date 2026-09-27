# Localization Runtime Review Gate v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance

## Scope

Independent review gate for the future Lead localization runtime.

Product contract:
- supported locales initially exactly RU + EN;
- Russian is source/fallback locale;
- gameplay/content/save identities are locale-neutral;
- locale affects presentation/text only.

## 1. Supported locale set

Runtime must expose exactly:
- ru
- en

Initial default:
ru unless Product explicitly chooses a different user-preference default.

Unknown locale input:
- must not corrupt state;
- should fall back to ru or a documented safe locale;
- should be QA-visible.

## 2. One resolver for UI and authored content

Prefer one localization resolver/service capable of resolving:
- UI shell keys;
- action/career text;
- event/variant/choice text;
- School text;
- poverty text;
- Forest text;
- Secret Debt text;
- alt/caption text.

Do not build separate incompatible localization engines for UI and content.

## 3. Locale-neutral gameplay IDs

Changing locale must not rewrite or alias:
- action IDs;
- event IDs;
- choice IDs;
- career IDs;
- School IDs;
- Activity IDs;
- ending IDs;
- presentation IDs;
- facts/capabilities/items.

Fail:
LOCALIZED_GAMEPLAY_IDENTITY.

## 4. Russian fallback

Missing EN translation:
- non-fatal;
- resolves RU text;
- emits inspectable QA/migration signal.

Fallback must not be reported as complete EN coverage.

Fail:
SILENT_FALSE_EN_COMPLETE.

## 5. Run/Meta invariance

Capture normalized Run + Meta before locale switch.

Switch:
ru -> en -> ru.

Require no mutation to:
- resources;
- stats;
- inventory;
- counters;
- facts;
- career/relationship/School progression;
- calendar;
- NightFlow;
- Activity;
- pending event;
- ending state;
- Meta rewards/unlocks.

Only locale preference/presentation cache may change outside gameplay state.

Fail:
LOCALE_MUTATES_GAMEPLAY_STATE.

## 6. No gameplay RNG consumption

Capture gameplay RNG state before:
- locale resolve;
- locale switch;
- missing-key fallback.

Require identical gameplay RNG state afterward.

Then execute the same next command under RU and EN and compare mechanical result.

Fail:
LOCALIZATION_CONSUMES_GAMEPLAY_RNG.

## 7. Pending event stability

With a pending event:
- capture eventId;
- variantId;
- choices;
- semantic presentationId.

Switch locale.

Require:
- same eventId;
- same variantId;
- same choice IDs;
- same conditions/effects;
- same presentation identity.

Only title/text/labels/alt may change.

## 8. Activity stability

During active Activity:
- checkpoint unchanged;
- route unchanged;
- progress/endurance unchanged;
- options unchanged;
- Activity RNG unchanged;
- exact result boundary unchanged.

Locale switch must never reroll Activity.

## 9. Ending stability

With ending eligible/committed/completed:
- eligibility unchanged;
- committedEndingId unchanged;
- completion transaction unchanged;
- Meta reward unchanged.

Localized ending title/result copy is presentation-only.

## 10. Multi-GIF compatibility

For one semantic occurrence:
- candidate pool is shared;
- occurrence key is locale-neutral;
- switching RU/EN does not select a different gameplay occurrence;
- preferred deterministic GIF candidate remains stable;
- localized alt/caption changes only text.

Localization must not be part of deterministic media-selection seed.

Fail:
LOCALE_REROLLS_MEDIA.

## 11. Key model

Localization keys must be deterministic from locale-neutral owner identity plus field role.

Examples:
- action.<id>.label
- action.<id>.description
- event.<id>.title
- event.<id>.variant.<variant>.text
- event.<id>.choice.<choice>.label
- media.<id>.alt
- ui.<surface>.<control>

Key generation must not normalize distinct IDs into one key accidentally.

## 12. Missing-key behavior

Missing requested-locale key:
- return RU fallback if RU exists;
- expose fallback status to diagnostics/tests.

Missing RU source key for player-facing surface:
- QA failure;
- runtime still must fail safely where possible.

Missing non-player-facing key:
- may not require localization.

## 13. Duplicate localized events prohibited

Translation storage must attach text to existing gameplay identities.

Forbidden:
- separate English event object;
- duplicate EN action;
- translated ending clone;
- locale-specific content pack used only to duplicate mechanics.

Test catalog count should not double when EN is added.

## 14. Static UI shell

Current UI contains hardcoded Russian strings.

Runtime patch should migrate static shell through the same resolver or a compatible shared localization service.

Review:
- navigation;
- Work/School/Explore/Night;
- creation;
- menu;
- errors/status;
- editor;
- ending/legacy;
- accessibility labels.

## 15. Authored content

Content localization must support:
- definitions;
- pack events;
- variants;
- choices;
- media alt text;
- staged authored libraries.

Do not require gameplay schema duplication for localized text.

## 16. Save backward compatibility

Existing saves created before localization runtime:
- parse unchanged;
- continue with RU fallback;
- do not require migration solely to add EN strings.

If locale preference is stored:
- treat as presentation preference;
- old save absence defaults safely.

## 17. Presentation override compatibility

Existing presentation overrides:
- remain valid;
- text override behavior is documented per locale;
- old monolingual override can fall back without breaking catalog.

No automatic reinterpretation of translated text as gameplay identity.

## 18. Import/export

If localization bundles are importable:
- validate locale exactly ru/en;
- reject key collision;
- reject unknown gameplay identity where strict mode applies;
- preserve locale-neutral semantic slot;
- allow rollback;
- do not mutate Run/Meta.

## 19. Exact-head tests

Required targeted tests:
- supported locale set;
- RU default/fallback;
- EN resolution;
- missing EN fallback signal;
- duplicate key rejection;
- no duplicate event count;
- locale-switch Run/Meta invariance;
- pending event invariance;
- Activity invariance;
- ending invariance;
- no gameplay RNG use;
- multi-GIF occurrence stability;
- old Save parse;
- old presentation override compatibility.

Then:
- typecheck;
- validate;
- build;
- full suite;
- exact-head GitHub Actions;
- post-merge main CI.

## 20. Review dispositions

Use:
- LOCALIZATION_RUNTIME_GREEN
- BLOCKED_LOCALE_SET
- BLOCKED_KEY_COLLISION
- BLOCKED_GAMEPLAY_ID_SPLIT
- BLOCKED_SAVE_MUTATION
- BLOCKED_RNG_MUTATION
- BLOCKED_MEDIA_REROLL
- BLOCKED_FALLBACK
- BLOCKED_COMPATIBILITY
- BLOCKED_CI

No production runtime/UI/content file was modified by Chat 4.
