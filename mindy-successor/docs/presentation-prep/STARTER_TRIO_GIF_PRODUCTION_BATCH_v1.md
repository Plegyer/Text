# Starter Trio GIF Production Batch v1

Scope: first concrete media-production batch for already-shipped starter-trio shift/result semantic surfaces.

Source authorities:
- Lumber production slice on current main;
- PR #34 merge `712ab6c7368ab21906f3fcb0184b35d4f3e1411c`;
- PR34 exact-head CI: **227/227 PASS**.

No character appearance or final art style is selected.

## Batch summary

Total semantic slots: **15**

- Lumber: 4 seasonal shift slots + 1 result slot;
- Satyr Maid: 4 seasonal shift slots + 1 result slot;
- Undead Farm: 4 seasonal shift slots + 1 result slot.

All 15 already have safe static presentation on current main.

## Production categories

Use only these media-production categories:

- **SEASONAL_VARIANT** — a season-specific primary GIF can be produced for an existing seasonal semantic slot.
- **REUSABLE_BASE_LOOP** — one approved loop may be reused by several semantic slots while the IDs remain distinct.
- **RESULT_REUSE** — result/default may continue using the currently selected shift/base visual or receive a later dedicated result asset.
- **OPTIONAL_DEDICATED_RESULT** — dedicated result media is optional and never required for mechanics.

These categories describe production organization, not art direction.

---

## Lumber batch

| presentationId | Current fallback | Category | Source authority | Variant count | Alt requirement |
| --- | --- | --- | --- | ---: | --- |
| `job/lumber/shift/spring/default` | `assets/stage-lumber.svg` | SEASONAL_VARIANT / REUSABLE_BASE_LOOP | Lumber production | 4-season family | Describe spring Lumber work context |
| `job/lumber/shift/summer/default` | `assets/stage-lumber.svg` | SEASONAL_VARIANT / REUSABLE_BASE_LOOP | Lumber production | 4-season family | Describe summer Lumber work context |
| `job/lumber/shift/autumn/default` | `assets/stage-lumber.svg` | SEASONAL_VARIANT / REUSABLE_BASE_LOOP | Lumber production | 4-season family | Describe autumn Lumber work context |
| `job/lumber/shift/winter/default` | `assets/stage-lumber.svg` | SEASONAL_VARIANT / REUSABLE_BASE_LOOP | Lumber production | 4-season family | Describe winter Lumber work context |
| `job/lumber/result/default` | selected Lumber seasonal/static candidate; ultimately `assets/stage-lumber.svg` | RESULT_REUSE / OPTIONAL_DEDICATED_RESULT | Lumber production | 1 stable result slot | Describe completed Lumber work result |

### Import / rollback

Import:
- target exact semantic ID;
- GIF primary only;
- retain current static fallback;
- no content/gameplay fields.

Rollback:
- remove the GIF override;
- shipped `assets/stage-lumber.svg` remains usable;
- semantic ID and gameplay state stay unchanged.

---

## Satyr Maid batch

Current PR34 seasonal media IDs:
- `stage.tavern.spring`
- `stage.tavern.summer`
- `stage.tavern.autumn`
- `stage.tavern.winter`

All currently resolve to:
`assets/stage-tavern.svg`.

| presentationId | Current fallback | Category | Source authority | Variant count | Alt requirement |
| --- | --- | --- | --- | ---: | --- |
| `job/satyr-maid/shift/spring/default` | `assets/stage-tavern.svg` | SEASONAL_VARIANT / REUSABLE_BASE_LOOP | PR34 `satyr-maid.shift` | 4-season family | Spring satyr-bar service context |
| `job/satyr-maid/shift/summer/default` | `assets/stage-tavern.svg` | SEASONAL_VARIANT / REUSABLE_BASE_LOOP | PR34 `satyr-maid.shift` | 4-season family | Summer satyr-bar service context |
| `job/satyr-maid/shift/autumn/default` | `assets/stage-tavern.svg` | SEASONAL_VARIANT / REUSABLE_BASE_LOOP | PR34 `satyr-maid.shift` | 4-season family | Autumn/festival service context |
| `job/satyr-maid/shift/winter/default` | `assets/stage-tavern.svg` | SEASONAL_VARIANT / REUSABLE_BASE_LOOP | PR34 `satyr-maid.shift` | 4-season family | Winter/regular-customer service context |
| `job/satyr-maid/result/default` | selected Satyr Maid seasonal/static candidate; ultimately `assets/stage-tavern.svg` | RESULT_REUSE / OPTIONAL_DEDICATED_RESULT | PR34 `satyr-maid.shift` | 1 stable result slot | Completed Satyr Maid shift result |

### Import / rollback

Import must not alter:
- `satyr-maid.shift`;
- typed career progression;
- first-shift transition;
- seasonal mechanics;
- result semantic identity.

Rollback returns to `assets/stage-tavern.svg`.

---

## Undead Farm batch

Current PR34 seasonal media IDs:
- `stage.hunt.spring`
- `stage.hunt.summer`
- `stage.hunt.autumn`
- `stage.hunt.winter`

All currently resolve to:
`assets/stage-forest.svg`.

| presentationId | Current fallback | Category | Source authority | Variant count | Alt requirement |
| --- | --- | --- | --- | ---: | --- |
| `job/undead-farm/shift/spring/default` | `assets/stage-forest.svg` | SEASONAL_VARIANT / REUSABLE_BASE_LOOP | PR34 `undead-farm.shift` | 4-season family | Spring farm-production context |
| `job/undead-farm/shift/summer/default` | `assets/stage-forest.svg` | SEASONAL_VARIANT / REUSABLE_BASE_LOOP | PR34 `undead-farm.shift` | 4-season family | Summer farm-production context |
| `job/undead-farm/shift/autumn/default` | `assets/stage-forest.svg` | SEASONAL_VARIANT / REUSABLE_BASE_LOOP | PR34 `undead-farm.shift` | 4-season family | Autumn harvest/processing context |
| `job/undead-farm/shift/winter/default` | `assets/stage-forest.svg` | SEASONAL_VARIANT / REUSABLE_BASE_LOOP | PR34 `undead-farm.shift` | 4-season family | Winter storage/repair context |
| `job/undead-farm/result/default` | selected Undead Farm seasonal/static candidate; ultimately `assets/stage-forest.svg` | RESULT_REUSE / OPTIONAL_DEDICATED_RESULT | PR34 `undead-farm.shift` | 1 stable result slot | Completed Undead Farm shift result |

### Import / rollback

Import must not alter:
- `undead-farm.shift`;
- typed career progression;
- first-shift transition;
- seasonal mechanics;
- result semantic identity.

Rollback returns to `assets/stage-forest.svg`.

---

## Reuse options

Allowed:
- one career-specific base loop reused across that career's seasonal IDs;
- one result-oriented asset reused by result/default;
- static fallback reused across all seasonal IDs.

Also allowed if explicitly approved:
- one generic motion loop reused across careers.

Even then:
- Lumber stays `job/lumber/...`;
- Satyr Maid stays `job/satyr-maid/...`;
- Undead Farm stays `job/undead-farm/...`.

## Alt-text acceptance

Every imported asset needs context-correct alt/accessibility text.

Alt text must:
- identify visible activity/context, not mechanics;
- match the semantic slot's season;
- avoid claiming un-authored NPC identity;
- remain meaningful if media is reused;
- not encode thresholds, rewards or save behavior.

## Batch acceptance

For each of the 15 slots:
- semantic ID unchanged;
- primary GIF optional;
- current static fallback retained;
- animations-off resolves static media;
- missing GIF is non-fatal;
- save/reload identity unchanged;
- rollback restores prior mapping;
- zero gameplay-state mutation.

## Production status

This batch is **READY_FOR_MEDIA_PRODUCTION**.

No additional Product mechanics decision is needed to produce media for these already-shipped shift/result surfaces.
