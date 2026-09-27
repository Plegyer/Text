# Bilingual Migration No-False-Green Audit v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance

## Purpose

Define CI/reporting rules so RU fallback, staged bilingual authoring, and locale-neutral data are not misreported as complete English production coverage.

## Required coverage states

Every localization key/surface must classify as exactly one of:

### BILINGUAL_COMPLETE

Required:
- RU source exists;
- EN translation exists;
- same gameplay/content identity;
- same mechanics;
- production-routed if the report claims production coverage.

This is the only state that counts as complete RU+EN coverage.

### RU_FALLBACK_ONLY

RU exists.
EN is missing.
Runtime may safely display RU while EN is requested.

This is migration-safe but NOT bilingual-complete.

CI/reporting:
- gameplay may remain green;
- localization completeness remains open.

### STAGED_BILINGUAL_NOT_ROUTED

RU and EN authored text both exist, but the content is not naturally reachable from production routing.

Examples:
- staged exact-course School library;
- worker Forest/Secret Debt drafts not root-integrated.

This proves authoring readiness only.

It must not count as:
- shipped production content;
- natural-path bilingual coverage.

### MISSING_PLAYER_FACING_LOCALIZATION

A production-routed player-facing field lacks required RU source and/or EN translation.

This is a localization defect.

Examples:
- production event title missing EN;
- button label hardcoded outside localization resolver after migration claims completion;
- media alt text missing a required locale.

### LOCALE_NEUTRAL_NON_PLAYER_DATA

No translation is required because the field is not player-facing.

Examples:
- IDs;
- counters;
- condition kinds;
- effect kinds;
- numeric tuning;
- RNG state;
- internal capability keys.

Do not inflate localization denominator with these.

## Fallback is not completeness

Critical rule:

If EN lookup falls back to RU:
- runtime availability may PASS;
- EN completeness must remain FAIL/OPEN for that key.

Forbidden CI behavior:
"Rendered text exists, therefore EN is complete."

Required CI behavior:
"Rendered via RU fallback; EN translation missing."

## Staging is not production

A bilingual staged library may be fully translated while still not production-routed.

Report separately:
- authored completeness;
- production reachability.

Example:
School exact-course teacher/lesson library can be:
BILINGUAL_COMPLETE as authored staging
while:
NOT_PRODUCTION_ROUTED.

Do not combine these into SHIPPED bilingual School coverage.

## Production routing is not bilingual completeness

The inverse also matters.

A production event may be naturally reachable while only RU exists.

Report:
- production routing: SHIPPED;
- RU coverage: present;
- EN coverage: RU_FALLBACK_ONLY.

Do not downgrade mechanics truth, but do not call localization complete.

## Duplicate localized gameplay objects

Creating:
- event.ru.*
- event.en.*

must never be accepted as localization completeness.

That is gameplay identity duplication.

CI should fail:
LOCALIZED_GAMEPLAY_DUPLICATION.

Two locale text records attached to one event ID are correct.

## Translation must not change mechanics

CI should compare RU and EN resolved content owner records excluding localized fields.

Require identical:
- conditions;
- effects;
- costs;
- cooldowns;
- priorities;
- blocking/delivery behavior;
- result IDs;
- reward IDs.

If locale changes any mechanical field:
BLOCKED_LOCALE_MECHANICS_DIVERGENCE.

## RNG and timing

Translation/fallback resolution must not:
- consume RNG;
- change event priority;
- change timing;
- change delivery;
- change animation candidate occurrence identity.

A locale switch must not reroll pending content.

## Save identity

Do not count a localized Save migration as required coverage.

Locale-neutral IDs remain in Save.

Translation state/preferences are presentation concerns.

If EN content requires a different pending event ID, the design is wrong.

## Alt/caption coverage

Media asset may be shared.

Localization completeness for media requires player-facing alt/caption coverage where exposed:
- RU alt;
- EN alt.

Same media src does not make alt text bilingual automatically.

If the current product surface does not expose a caption field, do not invent one solely for completeness metrics.

## UI shell

Current UI shell contains hardcoded RU.

Until migrated through localization resolver:
- RU shell coverage: present;
- EN shell coverage: missing;
- bilingual UI shell: NOT COMPLETE.

Do not call runtime bilingual-complete merely because authored packs have EN.

## Careers

For each target career report separately:
- action label RU/EN;
- description RU/EN;
- seasonal scene text RU/EN;
- result text RU/EN;
- production routing.

A career base layer may remain mechanically shipped while localization status is migration debt.

## School

Report separately:
- production generic hooks;
- staged exact-course authored libraries;
- teacher identities;
- Night-study exact production presentation.

RU fallback for production hooks must not count as EN complete.

Staged translated course text must not count as naturally routed.

## Poverty

PR37 ordinary poverty mechanics/content are production shipped.

Localization migration status must be measured independently across:
- event title;
- variant text;
- choice label/text;
- alt text.

No Secret Debt content may inflate ordinary-poverty bilingual counts.

## Forest

Worker Forest authored/result content predates current bilingual rule.

Until migrated:
- authored content readiness exists;
- bilingual production readiness does not.

A translated worker doc is not production reachability evidence.

## Secret Debt

Secret Debt authored content is currently non-production.

Even after RU+EN migration:
- content can be bilingual-ready;
- mechanics remain Product-blocked;
- production inclusion remains absent.

Do not report bilingual content completion as Secret Debt implementation.

## CI output requirements

Localization CI should emit counts by state, for example:

Production player-facing keys:
- BILINGUAL_COMPLETE: N
- RU_FALLBACK_ONLY: N
- MISSING_PLAYER_FACING_LOCALIZATION: N

Staged player-facing keys:
- BILINGUAL_COMPLETE: N
- RU_FALLBACK_ONLY: N

Locale-neutral keys:
- excluded from completion denominator.

Exact numbers should come from runtime/tooling, not manual fixed targets.

## Release gate interpretation

Mechanics release can be technically green while bilingual migration remains incomplete only if Product explicitly permits fallback debt for that milestone.

For a milestone declared "full RU+EN":
- all required production player-facing keys must be BILINGUAL_COMPLETE;
- fallback-only count must be zero or explicitly waived key-by-key.

## Migration tests

Required:
1. request EN for a missing translation;
2. verify RU renders;
3. verify fallback telemetry/status marks missing EN;
4. ensure coverage report does NOT increment EN-complete;
5. add EN translation;
6. verify status becomes BILINGUAL_COMPLETE;
7. mechanics/save remain unchanged in both cases.

## Current snapshot

Product bilingual contract:
LOCKED.

Runtime localization:
not yet present on current main at this audit snapshot.

Therefore current production must not be described as fully bilingual yet.

Worker bilingual authoring:
in progress.

Existing hardcoded RU UI:
migration debt.

Current older Forest/Secret Debt authored text:
requires RU+EN migration/review before production conversion.

## Final false-green rules

RU fallback == playable, not translated.

Staged RU+EN == authored ready, not production routed.

Production-routed RU-only == shipped mechanics/content, not bilingual complete.

Locale-neutral data == excluded, not untranslated.

Duplicated localized gameplay events == failure, not coverage.

No production runtime/UI/content file was modified by Chat 4.
