# Non-Lumber Career Content-Depth Handoff v1

Date: 2026-09-27
Owner: Chat 5
Scope: queue items 25–35
Baseline audited main: `c0763f9f9fa9887593fe8567165bbedce2b6cd3a`

This handoff is for selective Lead integration. It does not modify shared runtime/schema/UI, career mechanics, relationships, Forest/Secret Debt content, or QA/CI ownership.

## SAFE_PRESENTATION_COPY

Current-state audit:

- `docs/relationship-prep/NON_LUMBER_CAREER_RESULT_CONTENT_AUDIT_v1.md`

Bilingual presentation-only result banks:

- `docs/relationship-prep/SATYR_MAID_RESULT_COPY_BANK_RU_EN_v1.md`
- `docs/relationship-prep/UNDEAD_FARM_RESULT_COPY_BANK_RU_EN_v1.md`
- `docs/relationship-prep/TAVERN_RESULT_COPY_BANK_RU_EN_v1.md`
- `docs/relationship-prep/HUNTER_ORDINARY_SHIFT_RESULT_COPY_BANK_RU_EN_v1.md`
- `docs/relationship-prep/GUARD_RESULT_COPY_BANK_RU_EN_v1.md`
- `docs/relationship-prep/MERCHANT_RESULT_COPY_BANK_RU_EN_v1.md`
- `docs/relationship-prep/ARTIST_GEISHA_RESULT_COPY_BANK_RU_EN_v1.md`
- `docs/relationship-prep/ASSASSIN_RESULT_COPY_BANK_RU_EN_v1.md`
- `docs/relationship-prep/PROSTITUTE_RESULT_COPY_BANK_RU_EN_v1.md`

Each bank keeps the current action ID, four current seasonal scene IDs, current mechanics and current result presentation identity. RU is source authoring language; EN is complete.

The safe result-body key convention prepared by this wave is:

`action.<action-id>.result.<scene-id>.text`

Existing bilingual action label keys can remain the title source:

`action.<action-id>.label`

## STAGING_ONLY

`prior-work/astra/prototype-m3.2/content/non-lumber-career-result-presentation-v1.fixture.json`

The fixture maps all nine current actions to exact current result presentation identities:

- `job/satyr-maid/result/default`
- `job/undead-farm/result/default`
- `job/tavern/result/default`
- `job/hunter/result/default`
- `job/guard/result/default`
- `job/merchant/result/default`
- `job/artist-geisha/result/default`
- `job/assassin/result/default`
- `job/prostitute/result/default`

It also maps each current seasonal scene to its current media ID and a stable RU+EN result-body key.

The fixture is localization/presentation staging data only. It must not be interpreted as a new content pack or root-loaded gameplay definition.

## PRODUCT_OPEN

This wave deliberately does not choose:

- new career mechanics, wages, costs or stat tuning;
- new career stages, facts or endings;
- new relationship identities for any of the nine careers;
- new seasonal conditions or rewards;
- new Hunter expedition/Forest semantics;
- Hunter clue/token/Old Boundary semantics;
- new Assassin mission mechanics or rewards;
- explicit Prostitute content or altered professional-work rules;
- new media assets or semantic presentation IDs.

Existing action definitions remain authoritative.

## SHARED_UI_REQUIRED

Current main already localizes ordinary career action labels/descriptions in the Work menu, but the ordinary profession result screen renders persisted `lastAction.title` and `lastAction.text` directly.

Therefore adding the staged RU+EN result-body keys alone will not change the visible result screen. Lead-owned shared UI/presentation logic must explicitly resolve the ordinary career result title/body if these strings are integrated.

No new presentation-ID system is required: current target-shaped shift actions already resolve to stable `job/<career>/result/default` identities.

## Generic-copy replacement opportunity

The largest immediate content-depth gain is replacing generic embedded seasonal prose for Tavern, Hunter, Guard, Merchant, Artist/Geisha, Assassin and Prostitute with the authored bilingual copy.

Satyr Maid and Undead Farm already have more career-specific embedded English seasonal prose, but the new banks provide RU source plus full EN and can still be used for localization parity.

## Exact Lead selective-copy list

25. `mindy-successor/docs/relationship-prep/NON_LUMBER_CAREER_RESULT_CONTENT_AUDIT_v1.md`
26. `mindy-successor/docs/relationship-prep/SATYR_MAID_RESULT_COPY_BANK_RU_EN_v1.md`
27. `mindy-successor/docs/relationship-prep/UNDEAD_FARM_RESULT_COPY_BANK_RU_EN_v1.md`
28. `mindy-successor/docs/relationship-prep/TAVERN_RESULT_COPY_BANK_RU_EN_v1.md`
29. `mindy-successor/docs/relationship-prep/HUNTER_ORDINARY_SHIFT_RESULT_COPY_BANK_RU_EN_v1.md`
30. `mindy-successor/docs/relationship-prep/GUARD_RESULT_COPY_BANK_RU_EN_v1.md`
31. `mindy-successor/docs/relationship-prep/MERCHANT_RESULT_COPY_BANK_RU_EN_v1.md`
32. `mindy-successor/docs/relationship-prep/ARTIST_GEISHA_RESULT_COPY_BANK_RU_EN_v1.md`
33. `mindy-successor/docs/relationship-prep/ASSASSIN_RESULT_COPY_BANK_RU_EN_v1.md`
34. `mindy-successor/docs/relationship-prep/PROSTITUTE_RESULT_COPY_BANK_RU_EN_v1.md`
35. `mindy-successor/prior-work/astra/prototype-m3.2/content/non-lumber-career-result-presentation-v1.fixture.json`
36. `mindy-successor/docs/relationship-prep/NON_LUMBER_CAREER_CONTENT_DEPTH_HANDOFF_v1.md`

## Locked boundaries preserved

- no shared runtime/schema/UI edit by Chat 5;
- no duplicate action/event transaction;
- no mechanics or rewards per locale;
- no RNG or Save identity change;
- Hunter ordinary work stays separate from expedition/Forest semantics;
- Prostitute copy stays voluntary and non-explicit;
- Lumber Hard Work remains untouched;
- locale and presentation remain presentation-only.
