# Localization + Multi-GIF QA Gate v2

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance

## Purpose

Combined acceptance gate for the future state where:
- RU+EN localization runtime is active;
- one semantic presentation slot may own an intentional 3–5 GIF candidate pool.

Both systems must remain presentation-only.

## 1. One semantic identity

A localized multi-GIF surface has:
- one gameplay/content identity;
- one semantic presentation ID;
- one candidate pool;
- localized RU/EN text and alt/caption.

Forbidden:
- separate RU event and EN event;
- separate semantic presentation IDs only because language differs;
- candidate pool selected by locale.

## 2. Candidate selection must ignore locale

Deterministic candidate selector inputs may include:
- presentationId;
- stable occurrenceKey;
- poolVersion;
- presentation-only candidate metadata.

Locale must NOT be part of selection seed.

Required:
same occurrence RU -> EN -> RU keeps the same selected media candidate.

Fail:
LOCALE_REROLLS_MEDIA.

## 3. Alt/caption localization

For one selected candidate:
- media src/key remains stable;
- RU alt/caption resolves under RU;
- EN alt/caption resolves under EN.

Changing alt/caption text must not change:
- candidate key;
- occurrence identity;
- gameplay state.

## 4. Missing translation

If selected media alt/caption lacks EN:
- RU fallback may render;
- candidate stays unchanged;
- QA reports RU_FALLBACK.

Missing EN must not trigger:
- another GIF candidate;
- another semantic fallback;
- gameplay reroll.

## 5. Missing media candidate

If selected GIF fails:
- fallback to another valid media candidate or static fallback according to runtime policy;
- behavior is identical under RU and EN.

Locale must not decide which failure fallback path is used.

## 6. Corrupt candidate

Simulate load/decode error under both locales.

Require:
- same fallback candidate ordering;
- same gameplay scene identity;
- same pending event;
- same Save;
- only localized alt/status text differs.

## 7. Animation Off

With animations disabled:
- GIF pool skipped;
- static/semantic/text fallback works;
- RU/EN text changes correctly;
- gameplay state remains identical.

Animation preference + locale preference are presentation settings and must not modify Run/Meta.

## 8. Save invariance

For a pending scene with selected multi-GIF occurrence:

Capture:
- Run;
- Meta;
- RNG;
- event/variant/choice IDs;
- presentationId;
- deterministic candidate key.

Switch RU -> EN.

Require:
- gameplay Save unchanged;
- candidate key unchanged;
- only locale preference/text output changes.

Reload and repeat.

## 9. Gameplay RNG

Neither:
- locale lookup;
- missing translation fallback;
- multi-GIF candidate selection;
- media failure fallback

may consume gameplay RNG.

Required test:
RNG before == RNG after each presentation-only operation.

## 10. Weighted pools

If pool weights exist:
- weight applies identically under RU/EN;
- localized string length/content cannot affect weight;
- missing translation cannot alter candidate probability.

## 11. Candidate key localization

Candidate key is locale-neutral.

Correct:
presentation.<presentationId>.candidate.<candidateKey>.alt with separate ru/en text values.

Forbidden:
candidateKey = candidate-ru / candidate-en for the same asset role merely to localize text.

## 12. Shared assets

The same GIF asset may be shared across locales.

No duplicated asset is required merely because text language changes.

If a media asset itself contains embedded text and locale-specific files are required:
- they remain presentation variants mapped under one semantic identity;
- gameplay ID remains unchanged;
- selection policy must not change mechanics.

## 13. School smoke

Paid lesson:
- mechanics execute once;
- localized School follow-up text differs RU/EN;
- same event/variant;
- same media candidate;
- tuition/Energy/stats/progress identical.

## 14. Poverty smoke

Natural street event:
- same event/variant/choices;
- same candidate;
- localized text/alt only;
- money/modifier/history identical.

## 15. Forest smoke

Natural Forest result:
- same activityResult;
- same result reaction event;
- same candidate;
- same Activity state/result fact;
- localized reaction text only.

## 16. Career smoke

One target career shift:
- same action ID;
- same Energy/wage/progress;
- same semantic seasonal presentation ID;
- same selected GIF occurrence;
- localized label/description/result copy only.

## 17. Ending smoke

Ending:
- eligibility unchanged;
- commit unchanged;
- completion/Meta exactly once;
- same ending presentation identity;
- same media candidate for same occurrence;
- localized ending copy only.

## 18. Fallback ordering

Document one deterministic fallback order.

Example:
1. selected GIF pool candidate;
2. remaining candidate(s) on media error;
3. static override;
4. catalog static;
5. semantic fallback;
6. text-only stage.

RU/EN must use the same ordering.

## 19. Translation completeness reporting

Media pool can be mechanically green while translation coverage is incomplete.

Report separately:
- pool runtime correctness;
- RU alt/caption coverage;
- EN alt/caption coverage;
- fallback-only keys.

Do not mark bilingual media COMPLETE because RU fallback exists.

## 20. CI requirements

Targeted tests:
- same occurrence RU/EN same candidate;
- missing EN keeps candidate;
- corrupt media fallback same under locales;
- Animation Off same under locales;
- no gameplay RNG;
- Save invariance;
- School;
- poverty;
- Forest;
- career;
- ending.

Then:
- typecheck;
- validate;
- build;
- full suite;
- exact-head CI;
- post-merge main CI.

## Dispositions

Use:
- LOCALIZATION_MULTI_GIF_GREEN
- BLOCKED_LOCALE_REROLL
- BLOCKED_ALT_COVERAGE
- BLOCKED_MEDIA_FALLBACK
- BLOCKED_SAVE_MUTATION
- BLOCKED_RNG_MUTATION
- BLOCKED_GAMEPLAY_ID_SPLIT
- BLOCKED_CI

No art-style or Product mechanics decision is made by this gate.

No production runtime/UI/content file was modified by Chat 4.
