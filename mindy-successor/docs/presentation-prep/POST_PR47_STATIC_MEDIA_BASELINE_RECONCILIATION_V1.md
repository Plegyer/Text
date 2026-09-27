# Post-PR47 Static Media Baseline Reconciliation v1

Exact current-main baseline: `4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`.

Current main advanced during this queue through **PR48**:
`Lead: activate seasonal project-owned career media`.

Authority used:
- current root `content/presentation.json`;
- current root `content/localization.json`;
- current-main `assets/presentation/` tree.

## Current shipped state

Current main now contains **61 project-owned SVG files** under `assets/presentation/`:
- 21 files previously shipped by PR47;
- 40 ordinary-career seasonal SVGs shipped by PR48.

Current root `presentation.json` includes:
- 10 ordinary-career result/default static mappings;
- 40 ordinary-career seasonal shift static mappings;
- 11 reachable School static mappings;
- 10 ordinary-poverty static mappings;
- 6 Forest return/reaction static mappings;
- 2 Foreman relationship/Night static mappings.

Current root `localization.json` includes:
- the 42 PR47 `presentation.static.*` keys;
- all 80 seasonal career alt/caption keys from PR48.

## Current production coverage baseline

Target current production static scope:
- ordinary career results: 10;
- ordinary career seasonal shifts: 40;
- reachable School: 11;
- ordinary poverty: 10;
- Forest route/default + returns/reactions: 7;
- Foreman: 2.

Total: **80 semantic presentation IDs**.

Current-main project-owned static coverage:
- career results: 10 / 10;
- career seasonal shifts: 40 / 40;
- reachable School: 11 / 11;
- ordinary poverty: 10 / 10;
- Forest return/reaction: 6 / 6;
- Forest route/default: 0 / 1 project-owned root override;
- Foreman: 2 / 2.

Current-main total:
- **79 UNIQUE_PROJECT_OWNED**;
- **1 GENERIC_EXISTING** — `activity/forest/route/default`;
- **0 MISSING**.

## Consequence for items 221–223

The 40 seasonal mappings were absent immediately after PR47, but they are now already shipped by PR48.

Therefore:
- item 221 remains a 40-row post-PR47 reconciliation manifest, but every row is classified `ALREADY_SHIPPED_CURRENT_MAIN`;
- item 221 is **not** an integration patch against current main;
- item 222 contains **0 new localization keys**, because all 80 seasonal keys are already present in current root localization;
- item 223 must verify identity with current root and reject any overwrite attempt.

## Worker-only refinement still relevant

The later non-career refinements from items 209–216 are still worker-only on this current main:
- 8 course-distinct School lesson SVGs;
- refined generic Night-study SVG;
- 10 event-distinct ordinary-poverty SVGs;
- 6 split Forest return/reaction SVGs;
- 2 refined Foreman SVGs;
- 2 route-specific Forest option SVGs.

Safe current-production refinement set:
**27 exact current semantic IDs**.

Route-option-specific assets remain Product-open because current main still exposes only:
`activity/forest/route/default`.

## Remaining actual static gap

The only targeted current production semantic identity that still lacks a dedicated project-owned root static override is:

`activity/forest/route/default`.

Item 227 addresses that gap with one neutral shared-route fallback.

This reconciliation supersedes the earlier in-queue snapshot taken before PR48 merged.
