# Non-Lumber Seasonal Scene Integration Handoff v1

Date: 2026-09-27
Owner: Chat 5
Scope: queue items 49–59
Baseline audited main: `1af3104c1e4c180019b965adac8e87e67de89347`

This packet is for selective Lead integration. Do not wholesale-merge the worker branch.

## SAFE_TEXT_SOURCE

Audit:
- `docs/relationship-prep/NON_LUMBER_SEASONAL_WORK_SCENE_COPY_AUDIT_V1.md`

Career scene banks:
- `docs/relationship-prep/SATYR_MAID_SEASONAL_SCENE_BANK_RU_EN_V1.md`
- `docs/relationship-prep/UNDEAD_FARM_SEASONAL_SCENE_BANK_RU_EN_V1.md`
- `docs/relationship-prep/TAVERN_SEASONAL_SCENE_BANK_RU_EN_V1.md`
- `docs/relationship-prep/HUNTER_ORDINARY_WORK_SEASONAL_SCENE_BANK_RU_EN_V1.md`
- `docs/relationship-prep/GUARD_SEASONAL_SCENE_BANK_RU_EN_V1.md`
- `docs/relationship-prep/MERCHANT_SEASONAL_SCENE_BANK_RU_EN_V1.md`
- `docs/relationship-prep/ARTIST_GEISHA_SEASONAL_SCENE_BANK_RU_EN_V1.md`
- `docs/relationship-prep/ASSASSIN_SEASONAL_SCENE_BANK_RU_EN_V1.md`
- `docs/relationship-prep/PROSTITUTE_SEASONAL_SCENE_BANK_RU_EN_V1.md`

Each bank supplies concise RU-source + full EN copy for the current four seasonal scene identities only.

## Localization fixture

`prior-work/astra/prototype-m3.2/content/non-lumber-seasonal-scene-localization-v1.fixture.json`

The fixture contains exactly 36 entries:
- nine current non-Lumber ordinary career action IDs;
- four current scene IDs per action;
- exact current semantic seasonal presentation IDs;
- stable locale-neutral scene text keys;
- RU+EN text.

Key convention:

`action.<action-id>.scene.<season>.default.text`

Presentation identity convention already implemented by current presentation code:

`job/<career>/shift/<season>/default`

The fixture contains no media file paths and does not duplicate project-owned seasonal asset ownership.

## SHARED_PRESENTATION_CONSUMER_REQUIRED

Current main does not consume dedicated localized seasonal action-scene text keys for these 36 identities.

Lead-owned presentation/UI integration is required if these scene strings are to be rendered directly from localization.

Required consumer behavior:
- resolve the seasonal scene text from the current selected action/scene identity;
- use `action.<action-id>.scene.<scene-id>.text`;
- fall back to the embedded current scene text if the key is absent;
- keep the already-selected semantic presentationId unchanged;
- keep project-owned media selection/path unchanged;
- do not reselect the season, scene or media based on locale;
- do not mutate action, progression, Energy, wage, RNG or Save state.

## PRODUCT_OPEN

No Product decision is required for the text layer itself.

This wave does not choose:
- new careers or relationship routes;
- new scene IDs;
- new seasonal conditions;
- new costs, wages, effects or rewards;
- new media assets or file paths;
- new presentation IDs;
- Hunter Forest/Old Boundary/clue/token/expedition semantics;
- Assassin mission mechanics;
- Prostitute mechanics or explicit content.

Any future decision to add additional seasonal scenes, animations or career-specific mechanics remains Product/open integration work outside this wave.

## Expected Lead / QA invariants

For each of the 36 current seasonal identities:

- RU renders the authored RU text;
- EN renders the corresponding full EN text;
- locale switch does not change `actionId`;
- locale switch does not change `sceneId`;
- locale switch does not change `presentationId`;
- locale switch does not change selected media/static asset;
- no action is dispatched again;
- no additional Energy cost occurs;
- no wage/effect/counter is applied again;
- RNG state is unchanged by localization;
- gameplay Save state is unchanged by locale;
- missing localization falls back to current embedded scene text.

Cross-owner asset invariant:
- Chat2/project-owned seasonal static assets remain authoritative;
- Chat5 text integration must not copy, rename, replace or duplicate their paths.

## Exact selective-copy files

49. `mindy-successor/docs/relationship-prep/NON_LUMBER_SEASONAL_WORK_SCENE_COPY_AUDIT_V1.md`
50. `mindy-successor/docs/relationship-prep/SATYR_MAID_SEASONAL_SCENE_BANK_RU_EN_V1.md`
51. `mindy-successor/docs/relationship-prep/UNDEAD_FARM_SEASONAL_SCENE_BANK_RU_EN_V1.md`
52. `mindy-successor/docs/relationship-prep/TAVERN_SEASONAL_SCENE_BANK_RU_EN_V1.md`
53. `mindy-successor/docs/relationship-prep/HUNTER_ORDINARY_WORK_SEASONAL_SCENE_BANK_RU_EN_V1.md`
54. `mindy-successor/docs/relationship-prep/GUARD_SEASONAL_SCENE_BANK_RU_EN_V1.md`
55. `mindy-successor/docs/relationship-prep/MERCHANT_SEASONAL_SCENE_BANK_RU_EN_V1.md`
56. `mindy-successor/docs/relationship-prep/ARTIST_GEISHA_SEASONAL_SCENE_BANK_RU_EN_V1.md`
57. `mindy-successor/docs/relationship-prep/ASSASSIN_SEASONAL_SCENE_BANK_RU_EN_V1.md`
58. `mindy-successor/docs/relationship-prep/PROSTITUTE_SEASONAL_SCENE_BANK_RU_EN_V1.md`
59. `mindy-successor/prior-work/astra/prototype-m3.2/content/non-lumber-seasonal-scene-localization-v1.fixture.json`
60. `mindy-successor/docs/relationship-prep/NON_LUMBER_SEASONAL_SCENE_INTEGRATION_HANDOFF_V1.md`

## Integration order

1. Re-audit the 36 proposed keys against the current integration head.
2. Copy approved item-59 RU+EN strings into root localization.
3. Add the Lead-owned seasonal scene localization consumer with embedded-text fallback.
4. Keep existing semantic presentation IDs and project-owned asset selection unchanged.
5. Exercise all four seasons across the nine careers with RU↔EN switch invariance.
6. Run exact-head CI under Lead/QA ownership.

## Locked boundaries preserved

- presentation/localization only;
- no Lumber changes;
- no shared runtime/schema edit by Chat 5;
- no media path ownership change;
- no gameplay or Save identity per locale;
- Hunter ordinary work remains separate from Forest/Old Boundary semantics;
- Assassin remains presentation-only;
- Prostitute remains voluntary and non-explicit.
