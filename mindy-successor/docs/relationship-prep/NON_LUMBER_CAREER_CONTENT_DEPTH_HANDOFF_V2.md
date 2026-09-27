# Non-Lumber Career Content-Depth Handoff v2

Date: 2026-09-27
Owner: Chat 5
Scope: queue items 37–47
Branch: `chat5/relationships-night-content-next`

This packet is for selective Lead integration. Do not wholesale-merge the worker branch.

## SAFE_TO_COPY_NOW

### Localization delta
`prior-work/astra/prototype-m3.2/content/non-lumber-career-result-localization-v1.fixture.json`

Contains 36 RU+EN result-body entries for the exact nine current non-Lumber ordinary career action/scene identities. At the audited main baseline, all 36 keys were additive.

### Collision guard
`prior-work/astra/prototype-m3.2/tests/non-lumber-career-result-localization-v1.test.ts`

Validates:
- exact nine current action IDs;
- 36 seasonal result keys;
- RU+EN completeness;
- additive or exact-identical root collision policy;
- no gameplay mutation fields;
- no Lumber/Forest/Secret Debt contamination.

### Key map
`prior-work/astra/prototype-m3.2/content/ordinary-career-result-localization-key-map-v1.fixture.json`

Maps all ten ordinary careers to current result presentation identity, title key, seasonal body key and media-alt key. Lumber is explicitly reference-only.

### Acceptance documents
- `docs/relationship-prep/NON_LUMBER_RESULT_LOCALIZATION_NATURAL_PATH_PLAN_V1.md`
- `docs/relationship-prep/NON_LUMBER_RESULT_PRODUCTION_INTEGRATION_CHECKLIST_V1.md`

These define the shortest current production paths and exact RU↔EN invariants without adding test helpers.

## SHARED_UI_REQUIRED

### Result title/body localization consumption

Current ordinary career result rendering still uses stored `lastAction.title` and `lastAction.text` directly.

Lead-owned integration must resolve:
- title via existing `action.<action-id>.label`;
- body via `action.<action-id>.result.<season>.default.text`;
- embedded current strings as fallback.

The UI change must not alter `lastAction`, selected scene/media, actionCounts, deltas, career state, Energy, money, RNG or Save identity.

### UI expected-state fixture

`prior-work/astra/prototype-m3.2/content/non-lumber-career-result-ui-smoke-v1.fixture.json`

Contains exact expected RU/EN titles/bodies, current result presentation IDs, current media IDs and unchanged mechanics references for all nine careers.

Fixture only; UI remains Lead-owned.

## PRESENTATION_ONLY

Original authored banks:
- `docs/relationship-prep/SATYR_MAID_RESULT_COPY_BANK_RU_EN_v1.md`
- `docs/relationship-prep/UNDEAD_FARM_RESULT_COPY_BANK_RU_EN_v1.md`
- `docs/relationship-prep/TAVERN_RESULT_COPY_BANK_RU_EN_v1.md`
- `docs/relationship-prep/HUNTER_ORDINARY_SHIFT_RESULT_COPY_BANK_RU_EN_v1.md`
- `docs/relationship-prep/GUARD_RESULT_COPY_BANK_RU_EN_v1.md`
- `docs/relationship-prep/MERCHANT_RESULT_COPY_BANK_RU_EN_v1.md`
- `docs/relationship-prep/ARTIST_GEISHA_RESULT_COPY_BANK_RU_EN_v1.md`
- `docs/relationship-prep/ASSASSIN_RESULT_COPY_BANK_RU_EN_v1.md`
- `docs/relationship-prep/PROSTITUTE_RESULT_COPY_BANK_RU_EN_v1.md`

Latest normalization/review sources:
- `docs/relationship-prep/TAVERN_HUNTER_GUARD_RESULT_COPY_NORMALIZATION_V2.md`
- `docs/relationship-prep/MERCHANT_ARTIST_GEISHA_RESULT_COPY_NORMALIZATION_V2.md`
- `docs/relationship-prep/ASSASSIN_PROSTITUTE_RESULT_COPY_NORMALIZATION_V2.md`
- `docs/relationship-prep/SATYR_MAID_UNDEAD_FARM_RESULT_PARITY_REVIEW_V2.md`
- `docs/relationship-prep/NON_LUMBER_RESULT_COPY_DUPLICATION_AUDIT_V1.md`

For Tavern/Hunter/Guard, Merchant/Artist-Geisha, and Assassin/Prostitute, the v2 normalization docs are the preferred final prose source if Lead updates the item-37 strings during integration.

Satyr Maid/Undead Farm parity review identifies the exact eight text-only replacements needed to add RU-source/full-EN result parity while retaining current definitions.

## PRODUCT_OPEN

This wave does not select or alter:
- wages, costs, stat tuning, action effects or career balance;
- new stages, facts, endings or relationships;
- new media assets;
- new semantic presentation IDs;
- Hunter Forest/Old Boundary/clue/token semantics;
- Assassin mechanics/rewards;
- Prostitute mechanics or explicit content;
- any Lumber content.

No Product-open decision is required to integrate the text/localization layer itself.

## Exact selective-copy list for Lead

37. `mindy-successor/prior-work/astra/prototype-m3.2/content/non-lumber-career-result-localization-v1.fixture.json`
38. `mindy-successor/prior-work/astra/prototype-m3.2/tests/non-lumber-career-result-localization-v1.test.ts`
39. `mindy-successor/prior-work/astra/prototype-m3.2/content/non-lumber-career-result-ui-smoke-v1.fixture.json`
40. `mindy-successor/docs/relationship-prep/TAVERN_HUNTER_GUARD_RESULT_COPY_NORMALIZATION_V2.md`
41. `mindy-successor/docs/relationship-prep/MERCHANT_ARTIST_GEISHA_RESULT_COPY_NORMALIZATION_V2.md`
42. `mindy-successor/docs/relationship-prep/ASSASSIN_PROSTITUTE_RESULT_COPY_NORMALIZATION_V2.md`
43. `mindy-successor/docs/relationship-prep/SATYR_MAID_UNDEAD_FARM_RESULT_PARITY_REVIEW_V2.md`
44. `mindy-successor/prior-work/astra/prototype-m3.2/content/ordinary-career-result-localization-key-map-v1.fixture.json`
45. `mindy-successor/docs/relationship-prep/NON_LUMBER_RESULT_COPY_DUPLICATION_AUDIT_V1.md`
46. `mindy-successor/docs/relationship-prep/NON_LUMBER_RESULT_LOCALIZATION_NATURAL_PATH_PLAN_V1.md`
47. `mindy-successor/docs/relationship-prep/NON_LUMBER_RESULT_PRODUCTION_INTEGRATION_CHECKLIST_V1.md`
48. `mindy-successor/docs/relationship-prep/NON_LUMBER_CAREER_CONTENT_DEPTH_HANDOFF_V2.md`

## Integration order

1. Reconcile item 37 strings with the preferred v2 normalized copy in items 40–43.
2. Re-run item 38 collision/completeness guard against the current integration head.
3. Merge approved strings into root localization.
4. Add Lead-owned result title/body localization consumption with fallback.
5. Use item 39 + item 46 for natural-path UI invariance coverage.
6. Run exact-head CI as required by item 47.
7. Keep item 44 as the stable mapping/reference contract.

## Locked invariants

- locale affects text/presentation only;
- same action and scene identity in RU and EN;
- same result presentationId;
- same deltas/actionCounts/career state;
- no repeated wage or Energy transaction;
- no RNG or Save gameplay change;
- Lumber is untouched;
- Hunter ordinary work stays separate from Forest/Old Boundary semantics;
- Prostitute copy remains non-explicit and voluntary;
- Assassin copy remains presentation-only.

## Recommended next work

Only after Lead integrates this wave:
- reconcile any exact-head localization-key changes introduced during integration;
- add or adjust content copy only where Lead/QA natural-path coverage exposes a real presentation gap;
- do not begin another non-Lumber result wave from this handoff alone without a new queued task.
