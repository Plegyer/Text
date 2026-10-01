# Chat 3 Forest + Items Queue v12 — Complete First Forest Product Slice

Status: **PREASSIGNED / START ON STACKED BRANCH NOW**
Owner: Chat 3 / Forest + Poverty Content Worker
Queue: C3-121..132
Base for new stacked branch: frozen PR #146 exact head `8fa771f212190e5ad9ba4145869d5ce0b04d2cf2`

Do **not** mutate PR #146. Create a new branch, e.g. `chat3/forest-product-slice-v12`.

Goal: close the concrete gaps in `FOREST_ACTIVITY_SLICE_v0.md` and `INITIAL_ITEM_CATALOG_v0.md` using existing typed/data-driven mechanics wherever possible.

### C3-121 — stacked branch + live gap inventory
Start from the frozen head and verify what the runtime already supports before authoring. Do not add a second Activity engine.

### C3-122 — Hunter Trail third route
Add the third required route context, `Hunter Trail`.
Natural unlock must come from a real city/Hunter clue producer or an existing navigation-capability path. If a tiny shared-runtime read is missing, document the exact blocker for Chat 1; do not redesign Activity core.

### C3-123 — natural Old Boundary Token acquisition
Implement at least one natural production acquisition path for `old_boundary_token` through an existing city/career/relationship condition from the item catalog. Keep the route capability `enter_old_boundary` unchanged.

### C3-124 — natural Rope Kit acquisition
Implement a natural production source for `rope_kit` using Hunter or Merchant-facing content. Item must materially open a Forest option via `cross_rough_route`.

### C3-125 — natural Preservation Kit acquisition
Implement a natural production source for `field_preservation_kit` through School/Farm/Merchant-facing content and one Activity extraction use.
Do not decide reusable-vs-charges globally; use the currently safe non-destructive policy unless an authoritative contract already fixes consumption.

### C3-126 — natural Reinforced Axe acquisition
Implement a natural production source for `reinforced_axe` through Lumber reward/vendor content and one Forest obstacle option using `cut_heavy_wood`.

### C3-127 — three challenge families
Using the current Activity authoring surface, provide one real example each of:
- navigation/route choice;
- physical obstacle;
- interpretation/ritual anomaly.
At least four character stats/capabilities must matter across them.
If core support is insufficient, isolate the smallest missing runtime seam instead of faking the challenge in prose.

### C3-128 — seasonal topology/options
Spring/Summer/Autumn/Winter must change at least one Forest option/route/challenge availability, not only text/media.

### C3-129 — city preparation feedback
At least three city preparations (career clue, School/knowledge, item/equipment) must change Forest options through typed conditions.

### C3-130 — Activity result leaves the Forest
At least one extracted item/fact from the Forest must be consumed/read by another live subsystem or career reaction.
Do not invent final Forest lore.

### C3-131 — deterministic save/resume acceptance
Add natural save/reload tests after route choice and before/after a challenge. No reload reroll of pending encounter/result.

### C3-132 — candidate freeze
Require exact-head full CI green and freeze one focused PR for Chat 4.

This queue may add Forest/item content and focused data-driven Activity options. It must not modify School mechanics, ending framework, Secret Debt or unrelated shared UI.
