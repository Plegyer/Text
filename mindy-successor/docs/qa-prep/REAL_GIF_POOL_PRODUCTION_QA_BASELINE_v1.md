# Real GIF Pool Production QA Baseline v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance

## Purpose

Define the production acceptance floor for PR42-compatible 3–5 GIF pools.

A valid runtime pool is not enough.

Production adoption must use real repository assets and preserve gameplay/localization invariants.

## 1. Pool size

Every production pool:
- minimum 3 GIF candidates;
- maximum 5 GIF candidates.

Reject:
- 0/1/2 candidates;
- more than 5;
- fake duplicate entries used to reach the minimum.

## 2. Real repository assets

Every candidate src must resolve to a real shipped repository asset.

Reject as production:
- placeholder path;
- TODO path;
- external URL;
- missing file;
- test-only asset;
- branch-only asset not included in build.

Staging manifests may reference placeholders only when clearly marked staging-only.

## 3. Stable unique candidate keys

Candidate keys must:
- be non-empty;
- be unique within the pool;
- remain locale-neutral;
- remain stable when alt/caption text changes.

Do not derive candidate identity from localized text.

## 4. Valid semantic presentation ID

Pool owner must be an existing current semantic presentation ID.

The pool may not invent a second gameplay identity for RU or EN.

One semantic slot:
one gameplay/presentation identity;
multiple media candidates.

## 5. Static fallback

Every production pool must retain a valid static fallback.

Animation Off:
- ignores GIF pool;
- renders static/fallback;
- gameplay remains usable.

All GIF candidates failing:
- static/fallback still renders;
- gameplay remains usable.

## 6. RU + EN alt coverage

Every real candidate needs localized alt coverage:
- RU;
- EN.

Keys are locale-neutral.

Missing EN:
- runtime may fall back to RU;
- QA must report fallback debt;
- fallback does not count as fully bilingual production acceptance.

## 7. Locale switch stability

For the same gameplay occurrence:

RU
-> selected candidate key K
-> switch EN
-> candidate key remains K
-> switch RU
-> candidate key remains K.

Locale may change:
- alt;
- caption;
- UI text.

Locale must not change:
- candidate selection;
- gameplay event;
- outcome;
- Save identity.

## 8. Reload stability

Same occurrence:
- candidate selected;
- save/reload;
- same occurrence key reconstructed;
- same candidate key selected.

No candidate key/frame/time is stored in authoritative gameplay Save solely for presentation.

## 9. Gameplay invariance

Pool selection must not change:
- Energy;
- money;
- stats;
- career counters;
- School progress;
- event conditions/effects;
- Activity outcome;
- ending eligibility/reward;
- RNG state.

Required representative normalized Save comparison.

## 10. Gameplay RNG

PR42 selector is deterministic from presentation identity/occurrence key/pool version.

Production manifests must not replace this with:
- Math.random;
- Resolver RNG;
- Activity RNG;
- locale-dependent seed.

## 11. Failure ordering

If selected GIF fails:
- advance to remaining pool candidates;
- then static/catalog/fallback.

Media failure must not:
- reroll gameplay;
- dismiss pending scene;
- auto-select a choice;
- duplicate an effect.

## 12. Asset reuse

The same real GIF may be reused across semantic slots when visually appropriate.

Reuse does not merge semantic IDs.

QA records reuse honestly.

## 13. Placeholder honesty

Each adoption manifest should classify candidate:
- REAL_REPO_ASSET;
- PLACEHOLDER_STAGING_ONLY.

Only REAL_REPO_ASSET candidates count toward production pool size.

A 3-candidate manifest with 2 placeholders is not a valid production 3-GIF pool.

## 14. Build inclusion

Verify each candidate asset appears in built/shipped media output where the current build requires explicit asset inclusion.

Repository existence alone is insufficient if packaging excludes it.

## 15. Current-runtime compatibility

Production pools must parse under current PR42 schema:
- pool 3..5;
- unique key;
- GIF kind/source;
- alt;
- optional positive finite weight;
- no simultaneous primary + pool ambiguity.

## 16. Required production smoke

For one representative pool:
1. render RU;
2. capture candidate key;
3. switch EN;
4. same key;
5. reload;
6. same key;
7. disable animation;
8. static fallback;
9. re-enable;
10. break selected GIF;
11. safe fallback;
12. compare gameplay Save/mechanics.

## Final acceptance

Use:
- REAL_GIF_POOL_GREEN
- BLOCKED_PLACEHOLDER_ASSETS
- BLOCKED_MISSING_ASSET
- BLOCKED_ALT_TRANSLATION
- BLOCKED_LOCALE_REROLL
- BLOCKED_RELOAD_REROLL
- BLOCKED_GAMEPLAY_DRIFT
- BLOCKED_PACKAGING
- BLOCKED_SCHEMA

No art style or priority is chosen by this baseline.

No production runtime/UI/content file was modified by Chat 4.
