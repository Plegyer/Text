# Localization Migration Debt Sentinel v1

Status: QA no-false-green sentinel
Queue item: Chat 4 item 147
Baseline snapshot: current main `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`

## Classification vocabulary

Every player-facing production surface must have exactly one current classification.

**SHIPPED_RU_EN**

Use only when the current production runtime actually consumes a locale-neutral key and both RU and EN values exist on current main for that surface. Worker authoring, fallback text and staged files do not qualify.

**RU_FALLBACK_ONLY**

Use when the current production resolver has a valid Russian source entry but the requested English entry is absent and runtime deliberately falls back to Russian. This is functional fallback debt, not bilingual completion.

Russian fallback must never be counted as complete English coverage.

**STAGED_RU_EN**

Use when both RU and EN are authored in Git but are not current production: for example worker localization delta, staged routing-dependent content or a fixture not merged/wired to current runtime.

**MISSING_TRANSLATION**

Use when a player-facing current-production surface has no complete localization entry for its actual runtime identity. Hard-coded text and legacy catalog fallback do not become bilingual merely because the application does not crash.

**NON_PLAYER_FACING**

Use only for identity/mechanics/control data that is not rendered as player-facing copy: semantic IDs, event/variant/choice IDs, conditions, effects, rewards, trigger kinds, counters, Save fields and RNG state. Do not hide player-facing fallback text in this category.

## Evidence rule

A surface is `SHIPPED_RU_EN` only if all of these are true on the reviewed main SHA:

1. exact production identity exists;
2. runtime lookup path for that surface exists;
3. locale-neutral localization key resolves from that identity;
4. both `ru` and `en` are present;
5. UI/renderer actually uses the lookup rather than a hard-coded string;
6. locale switch changes presentation only;
7. tests or exact-head evidence cover the surface family.

A worker doc saying “ready” or “translated” is insufficient.

## Current-main snapshot

Current `content/localization.json` has 74 keys.

### SHIPPED_RU_EN examples on current main

The following exact keyed families have current RU+EN localization entries and runtime consumption:

- locale/menu/town/HUD keys that are actually called through `tr(...)`;
- Work panel shared labels;
- all 10 ordinary career action labels and descriptions;
- Forest Activity label;
- Forest route-option labels already exposed by the current Activity UI;
- PR43 Forest result success/escape/failure title, body, return-choice label/text;
- PR43 Forest success/escape/failure media alt.

This classification is per keyed surface, not a claim that every adjacent screen string is translated.

### School

Current main contains only these School-specific localization keys:

- `ui.panel.school`;
- `ui.town.school.subtitle`.

Those two dock/town surfaces are `SHIPPED_RU_EN`.

Current internal School panel title/help, course list labels/stat-cost rows, lesson button and Night-study UI remain hard-coded/current catalog text in `src/ui/app.ts`. They are **MISSING_TRANSLATION** on current main.

Chat5 RU+EN copy/deltas for those surfaces are **STAGED_RU_EN** until selectively mapped/wired on a fresh current-main branch.

Worker-only `school.generic.reachable.v2.*` and `school.night.exact.v3.*` event families are not current-main production identities and remain **STAGED_RU_EN**, not shipped.

### Ordinary poverty

Current main has zero localization keys containing `poverty`.

The PR37 poverty events themselves are production gameplay/content, but their player-facing title/body/choice/media fallback text is not a complete current-main RU+EN localization layer. Therefore current ordinary-poverty localized presentation is **MISSING_TRANSLATION**.

Chat3's reviewed 84-key RU+EN delta and exact 14-event key map are **STAGED_RU_EN** until selectively integrated and exact-head tested.

Do not count legacy authored event text—regardless of its source language—as bilingual localization.

### Forest

The exact PR43 result surfaces for:

- `forest-result-content-v1.success`;
- `forest-result-content-v1.escape`;
- `forest-result-content-v1.failure`

are **SHIPPED_RU_EN** for the title/body/return choice/media-alt keys present in current `localization.json`.

Other Forest authored/staged depth must be classified independently. A translated draft route/challenge that is not production-routed is **STAGED_RU_EN**, not shipped.

### Multi-GIF

Current repo contains zero real GIF blobs. Therefore there is no current production real-GIF pool whose RU+EN alt/caption coverage can be classified as shipped.

Authored RU+EN alt/caption data attached only to placeholder/proposed candidate paths is **STAGED_RU_EN**.

Existing localized static Forest alt entries may be `SHIPPED_RU_EN` independently of multi-GIF readiness.

### Product-blocked authored content

RU+EN authoring for Secret Debt, unresolved School result families, Hunter/Old Boundary route semantics or Palace material does not change the underlying product state.

If player-facing bilingual text exists only as authoring/staging, classify it **STAGED_RU_EN** and separately preserve the Product-blocked gameplay status. Never convert authoring completeness into gameplay acceptance.

## Required CI sentinel

For each integration PR, produce a machine-readable or test-derived coverage list from the actual merged localization bundle and actual production identities.

Fail the no-false-green gate if:

- a current player-facing identity has neither bilingual localization nor an explicitly recorded debt class;
- English is missing but the surface is counted as bilingual because Russian fallback works;
- a worker/staging localization key is counted as shipped without current runtime identity/consumption;
- a hard-coded string is called localized because another nearby UI label has a key;
- a placeholder GIF alt entry is counted as shipped real-media coverage;
- locale-specific gameplay/event identity appears.

## Promotion rules

`STAGED_RU_EN → SHIPPED_RU_EN` requires selective integration, runtime consumption, both locales and exact-head/post-merge evidence.

`MISSING_TRANSLATION → SHIPPED_RU_EN` requires an actual locale-neutral key plus both values and UI/renderer consumption.

`RU_FALLBACK_ONLY → SHIPPED_RU_EN` requires a real English entry; successful Russian fallback is not enough.

`NON_PLAYER_FACING` never needs translation unless the field becomes rendered player-facing copy.

## Invariance rule

No localization-debt cleanup may change gameplay conditions, effects, rewards, eligibility, timing, RNG, Save identity, event/variant/choice identity or deterministic media candidate selection.
