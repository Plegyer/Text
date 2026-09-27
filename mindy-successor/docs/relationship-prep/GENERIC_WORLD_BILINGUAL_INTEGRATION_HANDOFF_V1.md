# Generic World Bilingual Integration Handoff v1

Date: 2026-09-27
Owner: Chat 5
Current-main baseline checked: `4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`
Scope: generic-world queue items 61–71
Integration mode: selective copy only.

## SAFE_TO_COPY_NOW

### Audit
- `docs/relationship-prep/GENERIC_WORLD_BILINGUAL_DEBT_AUDIT_V1.md`

### Event localization deltas
- `prior-work/astra/prototype-m3.2/content/base-generic-world-localization-v1.fixture.json`
- `prior-work/astra/prototype-m3.2/content/gopher-early-chain-localization-v1.fixture.json`
- `prior-work/astra/prototype-m3.2/content/gopher-resolution-localization-v1.fixture.json`
- `prior-work/astra/prototype-m3.2/content/gopher-world-hooks-localization-v1.fixture.json`
- `prior-work/astra/prototype-m3.2/content/stage-goblin-localization-v1.fixture.json`

Together these contain complete RU+EN event title / variant body / choice label / choice body entries for exactly 17 current generic-world events.

### Collision guard
- `prior-work/astra/prototype-m3.2/tests/generic-world-localization-collision-v1.test.ts`

Validates exact current event identities, RU+EN completeness, additive/exact-identical collision policy, localization-only shape and excluded-namespace boundaries.

### Natural paths
- `docs/relationship-prep/GENERIC_WORLD_NATURAL_PATH_INVENTORY_V1.md`

Documents current production trigger paths, blocking/live status and repeatability without inventing new behavior.

### Media alt
- `docs/relationship-prep/GENERIC_WORLD_MEDIA_ALT_DEBT_AUDIT_V1.md`
- `prior-work/astra/prototype-m3.2/content/generic-world-media-alt-localization-v1.fixture.json`

Item 70 contains RU+EN alt strings for exactly 16 current player-facing media identities used by the covered events. `media.base.workshop.alt` is exact-identical to root; the remaining covered keys were additive at the audited baseline.

### Acceptance
- `docs/relationship-prep/GENERIC_WORLD_LOCALE_INVARIANCE_ACCEPTANCE_PLAN_V1.md`

## SHARED_UI_OR_MEDIA_REQUIRED

### Event title / selected variant / choice labels

No new shared UI work is required for these pending-scene surfaces. Current generic renderer already consumes:
- `event.<eventId>.title`;
- `event.<eventId>.variant.<variantId>.text`;
- `event.<eventId>.choice.<choiceId>.label`.

### Media alt

No new media-selection or path work is required. Current presentation rendering already supports localization through `media.<mediaId>.alt` when the media candidate exposes its current identity.

Do not rename or duplicate asset paths.

### Choice body / post-choice outcome

Shared presentation work **is required** for fully visible bilingual choice-outcome text.

Current event resolution stores embedded source `choice.text` into journal/last-action state. The pending scene does not render choice bodies through localization.

Requirements for any future consumer:
- do not write the active translation into gameplay Save;
- preserve stable event/choice identity;
- derive localized outcome presentation from locale-neutral identity;
- keep effects exactly once and Save identity locale-neutral.

Until that exists, choice-body keys may be merged safely as localization data but do not by themselves make legacy journal/outcome text bilingual.

## PRODUCT_OPEN

No Product decision is required for the text and alt localization layer.

Remain Product/open or out of scope:
- new events, characters, routes or choices;
- trigger/condition/effect/reward changes;
- balance changes;
- new media assets;
- new semantic presentation IDs;
- new Forest Hunter/Forest Activity semantics;
- Secret Debt content;
- locale-dependent gameplay persistence.

## Exact selective-copy files

61. `mindy-successor/docs/relationship-prep/GENERIC_WORLD_BILINGUAL_DEBT_AUDIT_V1.md`
62. `mindy-successor/prior-work/astra/prototype-m3.2/content/base-generic-world-localization-v1.fixture.json`
63. `mindy-successor/prior-work/astra/prototype-m3.2/content/gopher-early-chain-localization-v1.fixture.json`
64. `mindy-successor/prior-work/astra/prototype-m3.2/content/gopher-resolution-localization-v1.fixture.json`
65. `mindy-successor/prior-work/astra/prototype-m3.2/content/gopher-world-hooks-localization-v1.fixture.json`
66. `mindy-successor/prior-work/astra/prototype-m3.2/content/stage-goblin-localization-v1.fixture.json`
67. `mindy-successor/prior-work/astra/prototype-m3.2/tests/generic-world-localization-collision-v1.test.ts`
68. `mindy-successor/docs/relationship-prep/GENERIC_WORLD_NATURAL_PATH_INVENTORY_V1.md`
69. `mindy-successor/docs/relationship-prep/GENERIC_WORLD_MEDIA_ALT_DEBT_AUDIT_V1.md`
70. `mindy-successor/prior-work/astra/prototype-m3.2/content/generic-world-media-alt-localization-v1.fixture.json`
71. `mindy-successor/docs/relationship-prep/GENERIC_WORLD_LOCALE_INVARIANCE_ACCEPTANCE_PLAN_V1.md`
72. `mindy-successor/docs/relationship-prep/GENERIC_WORLD_BILINGUAL_INTEGRATION_HANDOFF_V1.md`

## Integration order

1. Re-run item 67 against the exact integration head.
2. Merge approved event strings from items 62–66 into root localization.
3. Merge approved media-alt strings from item 70.
4. Exercise item-68 natural paths in RU and EN.
5. Verify item-71 invariants, especially same pending event/variant/choice IDs and same gameplay Save.
6. Treat choice-body visible localization as a separate shared presentation change; do not make Save locale-dependent.
7. Run exact-head CI under Lead/QA ownership.

## Excluded ownership

This handoff does not include:
- `ds-lumber.*`;
- `lumber-cross.*`;
- `lumber.career-first-shift`;
- School / `base.school`;
- poverty;
- Chat3-owned Forest route/result content;
- Secret Debt.

## Result after integration

For the assigned generic-world scope, root localization debt is closed for:
- event titles;
- selected variant bodies;
- choice labels;
- prepared choice-body strings;
- current player-facing media alt.

The remaining presentation debt is the shared locale-neutral consumer for post-choice/journal text.
