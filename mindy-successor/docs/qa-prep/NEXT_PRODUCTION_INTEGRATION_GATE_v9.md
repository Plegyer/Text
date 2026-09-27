# Next Production Integration Gate v9

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Baseline after PR41/PR42, with current-state note through PR43.

## Merged runtime baseline

PR41 localization runtime:
- merged;
- exact-head 291/291 PASS;
- post-merge 291/291 PASS;
- locales exactly RU + EN;
- RU fallback;
- locale preference outside gameplay Save;
- ten Work action IDs unchanged;
- no duplicate localized gameplay content.

PR42 multi-GIF runtime:
- merged;
- exact-head 295/295 PASS;
- post-merge 295/295 PASS;
- explicit pool bounds 3..5;
- stable unique candidate keys;
- primary+pool ambiguity rejected;
- deterministic occurrence-key selector;
- no gameplay RNG;
- no Save migration;
- RU/EN switch keeps selected candidate;
- Animation Off uses static fallback;
- old primary/static overrides remain compatible.

These two shared-runtime seams are GREEN.

## Career localization / media

Current status:
SHIPPED_RU_EN for the initial Work/town slice.

All ten target Work actions keep the same gameplay IDs and mechanics across locales.

Current localization includes RU+EN Work labels/descriptions and shared UI vocabulary.

Multi-GIF runtime is available, but real per-career 3–5 GIF asset pools remain a separate content/adoption task.

Classification:
- localization runtime: GREEN;
- ten-career Work RU+EN slice: GREEN;
- real multi-GIF career asset adoption: CONTENT/ASSET OPEN.

## School localization

Current safe authored delta from Chat5 covers:
- School panel/help;
- all 8 paid course labels/descriptions;
- tuition/Energy wording;
- generic reachable post-lesson content;
- exact Night-study content;
- reachable School media alt/caption keys.

Exact-course teacher/lesson content remains staged because paid-course-specific routing is not shipped.

Classification:
SAFE_TO_INTEGRATE for generic/currently routed School localization.
STAGED_ROUTING_BLOCKED for exact-course teacher/lesson localization.
PRODUCT_BLOCKED for unresolved management/accounting and Arcana/Forest result semantics.

Required integration evidence:
- selective current-main copy;
- localization delta contract test;
- UI wiring;
- natural-path paid-lesson/Night smoke;
- exact-head CI.

## Ordinary poverty localization

Gameplay production is already shipped from PR37.

Chat3 has an earlier bilingual migration fixture, but the exact current-main localization delta/key map/natural-path bundle requested in items 140–148 is not yet complete at this gate snapshot.

Classification:
GAMEPLAY_SHIPPED / LOCALIZATION_DELTA_NOT_YET_READY.

Do not treat RU fallback as complete EN coverage.

## Forest bilingual content

At the PR41/42 gate boundary:
- runtime localization and multi-GIF support are available;
- Chat3 Forest result bilingual authoring exists as a selective-integration candidate.

Current-state note:
PR43 subsequently integrated the bilingual Forest result production slice and passed 299/299 exact-head and post-merge CI.

Therefore the Forest result reaction slice has moved from READY/NEEDS_CI to SHIPPED.

Remaining Forest authoring:
- deeper routes/challenges/seasons;
- hunter-trail unlock source;
- Old Boundary Token source/policy.

The latter two remain Product-blocked.

## Secret Debt

Current status:
CONTENT_ONLY + PRODUCT_BLOCKED.

Authored RU/EN migration work may proceed, but production mechanics still lack accepted values/behavior for:
- encounter probability;
- principal/debt/delay;
- hidden-career cost/wage/stages;
- School/Activity availability while bound;
- forced-Night/lodging/penalty composition;
- outcome thresholds;
- Meta rewards.

No production Secret Debt state/gating should be invented by localization work.

## Real GIF adoption

PR42 makes deterministic pools technically available.

Production pool acceptance still requires:
- 3–5 real repo GIF assets;
- unique stable candidate keys;
- current semantic presentation ID;
- static fallback;
- RU+EN alt coverage;
- no placeholder/external paths;
- locale switch/reload keeps the same selected candidate;
- gameplay unchanged.

Until real assets exist, adoption manifests are staging/content evidence only.

## Integration classes

| Stream | Status |
|---|---|
| localization runtime | GREEN / SHIPPED |
| multi-GIF runtime | GREEN / SHIPPED |
| 10-career Work RU+EN slice | GREEN / SHIPPED |
| 10-career real GIF pools | CONTENT/ASSET OPEN |
| School safe localization delta | SAFE_TO_INTEGRATE |
| School exact-course localization | STAGED_ROUTING_BLOCKED |
| poverty gameplay | SHIPPED |
| poverty exact current-main RU+EN delta | NOT YET READY at snapshot |
| Forest result bilingual slice | SHIPPED after PR43 |
| Forest deeper route authoring | CONTENT OPEN |
| hunter/token route semantics | PRODUCT_BLOCKED |
| Secret Debt authored content | CONTENT_ONLY |
| Secret Debt mechanics | PRODUCT_BLOCKED |

## Firewalls

Preserve:
- one locale-neutral gameplay identity;
- RU/EN presentation only;
- no locale-specific conditions/effects/rewards/RNG/save state;
- selected multi-GIF candidate independent of locale;
- Lumber Hard Work remains completed_shifts >= 50 only;
- hardWork:lumber unchanged;
- Palace remains all ten ordinary Hard Work careers;
- Secret Debt contributes zero ordinary Hard Work.

No production runtime/UI/content file was modified by Chat 4.
